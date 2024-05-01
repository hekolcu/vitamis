using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using VitamisAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace VitamisAPI;

public static class FoodEndpoints
{
    public static void MapFoodEndpoints(this WebApplication app)
    {
        var foodMapGroup = app.MapGroup("/food");

        foodMapGroup.MapGet("/search", async (VitamisDbContext db,
            [FromQuery(Name = "q")]
            [Required(ErrorMessage = "Query is required")]
            [StringLength(128, MinimumLength = 3, ErrorMessage = "Query string must be longer than 3 and shorter than 128")]
            string query,
            [Range(1, 50, ErrorMessage = "Page size must be between 1 and 50")]
            int pageSize = 25,
            [Range(1, int.MaxValue, ErrorMessage = "Page must be positive")]
            int page = 1) =>
        {
            Validator.ValidateObject(query, new ValidationContext(query), validateAllProperties: true);
            
            var foods = await db.Foods
                .Where(f => f.Name.Contains(query) || f.Category.Contains(query))
                .Include(f => f.FoodVitamins).ThenInclude(fv => fv.Vitamin)
                .Include(f => f.FoodNutritions).ThenInclude(fn => fn.Nutrient)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var foodDtOs = foods.Select(f => new FoodSearchResult 
            {
                FoodId = f.FoodID,
                Name = f.Name,
                Category = f.Category,
                Vitamins = f.FoodVitamins.Select(fv => new VitaminInfo
                {
                    Name = fv.Vitamin.Name,
                    Average = fv.Average,
                    Unit = fv.Unit,
                    Minimum = fv.Minimum,
                    Maximum = fv.Maximum
                }).ToList()
            }).ToList();

            return Results.Ok(new {
                Results = foodDtOs,
                TotalItems = await db.Foods.CountAsync(f => f.Name.Contains(query) || f.Category.Contains(query)),
                CurrentPage = page,
                PageSize = pageSize
            });
        })
        .ProducesValidationProblem()
        .Produces<List<FoodSearchResult>>();

        foodMapGroup.MapPost("/add", async (VitamisDbContext db, HttpContext context, [FromBody] AddFoodRequest request) =>
        {
            var userEmail = context.User.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(userEmail))
            {
                return Results.Unauthorized();
            }

            var user = await db.Users
                .Where(u => u.Email == userEmail)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return Results.NotFound("User not found.");
            }
            
            if (user.UserType != UserType.Dietitian || user.UserType != UserType.AcademicianDietitian || user.UserType != UserType.Admin)
            {
                return Results.Unauthorized();
            }
            
            var containsInvalidVitamins = request.Vitamins.Any(v => db.Vitamins.All(vit => vit.Name != v.Name));
            
            if (containsInvalidVitamins)
            {
                return Results.BadRequest("One or more vitamins are invalid.");
            }
            
            var pendingFood = new PendingFood
            {
                Name = request.Name,
                Category = request.Category
            };
            
            db.PendingFoods.Add(pendingFood);
            await db.SaveChangesAsync();
            
            var pendingFoodId = pendingFood.PendingFoodId;
            
            pendingFood.PendingFoodVitamins = request.Vitamins.Select(v =>
            {
                var vitamin = db.Vitamins.FirstOrDefault(vit => vit.Name == v.Name);
                
                return new PendingFoodVitamin
                {
                    PendingFoodId = pendingFoodId,
                    VitaminId = vitamin!.VitaminID,
                    Average = ParseDouble(v.Average),
                    Unit = v.Unit,
                    Minimum = ParseDouble(v.Minimum),
                    Maximum = ParseDouble(v.Maximum)
                };
            }).ToList();
            
            db.PendingFoodVitamins.AddRange(pendingFood.PendingFoodVitamins);
            
            await db.SaveChangesAsync();

            return Results.Ok();

        }).RequireAuthorization();

        var pendingMapGroup = foodMapGroup.MapGroup("/pending");
        
        pendingMapGroup.MapGet("/confirm", async (VitamisDbContext db, HttpContext context, [FromQuery] int pendingFoodId) =>
        {
            var userEmail = context.User.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(userEmail))
            {
                return Results.Unauthorized();
            }

            var user = await db.Users
                .Where(u => u.Email == userEmail)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return Results.NotFound("User not found.");
            }
            
            if (user.UserType != UserType.Admin)
            {
                return Results.Unauthorized();
            }

            var pendingFood = await db.PendingFoods
                .Include(pf => pf.PendingFoodVitamins)
                .FirstOrDefaultAsync(pf => pf.PendingFoodId == pendingFoodId);

            if (pendingFood == null)
            {
                return Results.NotFound("Pending food not found.");
            }

            var food = new Food
            {
                Name = pendingFood.Name,
                Category = pendingFood.Category
            };

            db.Foods.Add(food);
            await db.SaveChangesAsync();

            var foodId = food.FoodID;

            food.FoodVitamins = pendingFood.PendingFoodVitamins.Select(pfv => new FoodVitamin
            {
                FoodID = foodId,
                VitaminID = pfv.VitaminId,
                Average = pfv.Average,
                Unit = pfv.Unit,
                Minimum = pfv.Minimum,
                Maximum = pfv.Maximum
            }).ToList();

            db.FoodVitamins.AddRange(food.FoodVitamins);
            db.PendingFoods.Remove(pendingFood);
            db.PendingFoodVitamins.RemoveRange(pendingFood.PendingFoodVitamins);
            await db.SaveChangesAsync();

            return Results.Ok();
        }).RequireAuthorization();
        
        pendingMapGroup.MapGet("/list", async (VitamisDbContext db, HttpContext context) =>
        {
            var userEmail = context.User.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(userEmail))
            {
                return Results.Unauthorized();
            }

            var user = await db.Users
                .Where(u => u.Email == userEmail)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return Results.NotFound("User not found.");
            }
            
            if (user.UserType != UserType.Admin)
            {
                return Results.Unauthorized();
            }

            var pendingFoods = await db.PendingFoods
                .Include(pf => pf.PendingFoodVitamins).ThenInclude(pfv => pfv.Vitamin)
                .ToListAsync();

            return Results.Ok(pendingFoods.Select(pf => new FoodSearchResult
            {
                FoodId = pf.PendingFoodId,
                Name = pf.Name,
                Category = pf.Category,
                Vitamins = pf.PendingFoodVitamins.Select(pfv => new VitaminInfo
                {
                    Name = pfv.Vitamin.Name,
                    Average = pfv.Average,
                    Unit = pfv.Unit,
                    Minimum = pfv.Minimum,
                    Maximum = pfv.Maximum
                }).ToList()
            }));
        }).RequireAuthorization();
        
        pendingMapGroup.MapGet("/reject", async (VitamisDbContext db, HttpContext context, [FromQuery] int pendingFoodId) =>
        {
            var userEmail = context.User.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(userEmail))
            {
                return Results.Unauthorized();
            }

            var user = await db.Users
                .Where(u => u.Email == userEmail)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return Results.NotFound("User not found.");
            }
            
            if (user.UserType != UserType.Admin)
            {
                return Results.Unauthorized();
            }

            var pendingFood = await db.PendingFoods
                .Include(pf => pf.PendingFoodVitamins)
                .FirstOrDefaultAsync(pf => pf.PendingFoodId == pendingFoodId);

            if (pendingFood == null)
            {
                return Results.NotFound("Pending food not found.");
            }

            db.PendingFoods.Remove(pendingFood);
            db.PendingFoodVitamins.RemoveRange(pendingFood.PendingFoodVitamins);
            await db.SaveChangesAsync();

            return Results.Ok();
        }).RequireAuthorization();
    }
    
    private static string ParseDouble(double value)
    {
        return value.ToString("0.00000", new CultureInfo("tr-TR"));
    }
    
    public class FoodSearchResult
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public List<VitaminInfo> Vitamins { get; set; }
        
        public int FoodId { get; set; }
    }

    public class VitaminInfo 
    {
        public string Name { get; set; }
        public string Average { get; set; }
        public string Unit { get; set; }
        public string Minimum { get; set; }
        public string Maximum { get; set; }
    }
    
    public class AddFoodRequest
    {
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
        
        [Required(ErrorMessage = "Category is required")]
        public string Category { get; set; }
        
        [Required(ErrorMessage = "Vitamins are required")]
        public List<VitaminInfoAdd> Vitamins { get; set; }
        
        public class VitaminInfoAdd
        {
            [Required(ErrorMessage = "Name is required")]
            public string Name { get; set; }

            [Required(ErrorMessage = "Average is required")]
            public double Average { get; set; }
            
            [Required(ErrorMessage = "Unit is required")]
            public string Unit { get; set; }
            
            [Required(ErrorMessage = "Minimum is required")]
            public double Minimum { get; set; }
            
            [Required(ErrorMessage = "Maximum is required")]
            public double Maximum { get; set; }
        }
    }
}