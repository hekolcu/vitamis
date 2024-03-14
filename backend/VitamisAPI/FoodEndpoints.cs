using System.ComponentModel.DataAnnotations;
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
                Name = f.Name,
                Category = f.Category,
                Vitamins = f.FoodVitamins.Select(fv => new VitaminInfo
                {
                    Name = fv.Vitamin.Name,
                    Average = fv.Average,
                    Unit = fv.Unit
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
    }
    
    private class FoodSearchResult
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public List<VitaminInfo> Vitamins { get; set; }
        // ...
    }

    private class VitaminInfo 
    {
        public string Name { get; set; }
        public string Average { get; set; }
        public string Unit { get; set; }
    }
}