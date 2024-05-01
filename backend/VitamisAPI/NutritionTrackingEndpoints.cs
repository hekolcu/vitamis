using System.Globalization;
using VitamisAPI.Data;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using VitamisAPI.Data.Tracking;

namespace VitamisAPI;

public static class NutritionTrackingEndpoints
{
    public static void MapTrackingEndpoints(this WebApplication app)
    {
        var trackingMapGroup = app.MapGroup("/tracking");

        trackingMapGroup.MapGet("/add", (VitamisDbContext db, HttpContext httpContext, int foodId, double amount) =>
        {
            var userEmail = httpContext.User.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(userEmail))
            {
                return Results.Unauthorized();
            }

            var user = db.Users.FirstOrDefault(u => u.Email == userEmail);

            if (user == null)
            {
                return Results.NotFound("User not found.");
            }

            var food = db.Foods
                .Include(f => f.FoodVitamins).ThenInclude(foodVitamin => foodVitamin.Vitamin)
                .FirstOrDefault(f => f.FoodID == foodId);

            if (food == null)
            {
                return Results.NotFound("Food not found.");
            }

            var record = db.FoodIntakeRecords.Add(new FoodIntakeRecord()
            {
                User = user,
                Food = food,
                Date = DateTime.Now,
                Amount = amount
            });

            db.SaveChanges();

            var foodVitamins = food.FoodVitamins.Select(fv =>
            {
                bool success = double.TryParse(
                    fv.Average,
                    NumberStyles.Any,
                    new CultureInfo("tr-TR"),
                    out var average);

                if (success)
                {
                    double averageForAmount = average * amount / 100.0;
                    return new FoodEndpoints.VitaminInfo
                    {
                        Name = fv.Vitamin.Name,
                        Average = averageForAmount.ToString("F"),
                        Unit = fv.Unit
                    };
                }

                return new FoodEndpoints.VitaminInfo
                {
                    Name = fv.Vitamin.Name,
                    Average = fv.Average,
                    Unit = fv.Unit
                };
            }).ToList();

            return Results.Ok(
                new FoodIntakeRecordDto()
                {
                    FoodIntakeId = record.Entity.FoodIntakeId,
                    UserId = record.Entity.UserId,
                    FoodId = record.Entity.FoodId,
                    Food = new FoodEndpoints.FoodSearchResult
                    {
                        Category = record.Entity.Food.Category,
                        Name = record.Entity.Food.Name,
                        FoodId = record.Entity.Food.FoodID,
                        Vitamins = foodVitamins
                    },
                    Amount = record.Entity.Amount,
                    Date = record.Entity.Date
                });
        }).RequireAuthorization();

        trackingMapGroup.MapGet("/list", (VitamisDbContext db, HttpContext httpContext) =>
        {
            var userEmail = httpContext.User.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(userEmail))
            {
                return Results.Unauthorized();
            }

            var user = db.Users.FirstOrDefault(u => u.Email == userEmail);

            if (user == null)
            {
                return Results.NotFound("User not found.");
            }

            var records = db.FoodIntakeRecords
                .Where(r => r.UserId == user.UserId)
                .Include(r => r.Food).ThenInclude(food => food.FoodVitamins)
                .ThenInclude(foodVitamin => foodVitamin.Vitamin)
                .ToList();

            return Results.Ok(records.Select(r =>
            {
                var foodSearchResult = new FoodEndpoints.FoodSearchResult
                {
                    Category = r.Food.Category,
                    Name = r.Food.Name,
                    FoodId = r.Food.FoodID,
                    Vitamins = r.Food.FoodVitamins.Select(fv =>
                    {
                        bool success = double.TryParse(
                            fv.Average,
                            NumberStyles.Any,
                            new CultureInfo("tr-TR"),
                            out var average);

                        if (success)
                        {
                            double averageForAmount = average * r.Amount / 100.0;
                            app.Logger.Log(LogLevel.Information, average.ToString("F"));
                            return new FoodEndpoints.VitaminInfo
                            {
                                Name = fv.Vitamin.Name,
                                Average = averageForAmount.ToString("F"),
                                Unit = fv.Unit
                            };
                        }

                        return new FoodEndpoints.VitaminInfo
                        {
                            Name = fv.Vitamin.Name,
                            Average = fv.Average,
                            Unit = fv.Unit
                        };
                    }).ToList()
                };

                return new FoodIntakeRecordDto()
                {
                    FoodIntakeId = r.FoodIntakeId,
                    UserId = r.UserId,
                    FoodId = r.FoodId,
                    Food = foodSearchResult,
                    Amount = r.Amount,
                    Date = r.Date
                };
            }));
        }).RequireAuthorization();

        trackingMapGroup.MapGet("/dailyReport", async (VitamisDbContext db, HttpContext httpContext) =>
        {
            var userEmail = httpContext.User.FindFirst(ClaimTypes.Email)?.Value;

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

            var today = DateTime.Today;
            var records = await db.FoodIntakeRecords
                .Where(r => r.User.UserId == user.UserId && r.Date.Date == today)
                .Include(r => r.Food).ThenInclude(f => f.FoodVitamins).ThenInclude(fv => fv.Vitamin)
                .ToListAsync();

            var vitaminSummaries = IntakeReport.CalculateVitaminSummaryFromFoodIntakeRecords(records);

            if (user.DateOfBirth == null)
            {
                return Results.NotFound("User must register their date of birth");
            }
            
            var age = today.Year - user.DateOfBirth?.Year ?? 0;
            if (user.DateOfBirth?.Date > today.AddYears(-age)) age--;

            var genderString = user.Gender.HasValue ? user.Gender.Value.ToString() : string.Empty;
            
            if (string.IsNullOrEmpty(genderString))
            {
                return Results.NotFound("User must register their gender");
            }
            
            var groupName = RecommendationEndpoints.DetermineGroupName(age, genderString);

            var group = await db.VitaminReferenceGroups
                .Where(g => g.GroupName == groupName)
                .FirstOrDefaultAsync();

            if (group == null)
            {
                return Results.NotFound($"Vitamin reference group '{groupName}' not found.");
            }

            var recommendedVitamins = await db.VitaminReferenceValues
                .Where(v => v.GroupID == group.GroupID)
                .Include(v => v.Vitamin)
                .ToListAsync();

            var vitaminPercentages = vitaminSummaries.Select(vs =>
            {
                var recommended = recommendedVitamins.FirstOrDefault(rv => rv.Vitamin.Name == vs.Name);
                var percentage = recommended != null ? (vs.TotalAmount / double.Parse(recommended.Amount)) * 100 : 0;

                return new
                {
                    VitaminName = vs.Name,
                    ConsumedAmount = vs.TotalAmount,
                    RecommendedAmount = recommended?.Amount,
                    Percentage = percentage
                };
            }).ToList();
            
            var allVitaminPercentages = recommendedVitamins.Select(rv =>
            {
                var consumed = vitaminSummaries.FirstOrDefault(vs => vs.Name == rv.Vitamin.Name);
                var percentage = consumed != null ? (consumed.TotalAmount / double.Parse(rv.Amount)) * 100 : 0;

                return new
                {
                    VitaminName = rv.Vitamin.Name,
                    ConsumedAmount = consumed?.TotalAmount ?? 0,
                    RecommendedAmount = rv.Amount,
                    Percentage = percentage
                };
            }).ToList();

            return Results.Ok(allVitaminPercentages);
        }).RequireAuthorization();
    }

    private class FoodIntakeRecordDto
    {
        public int FoodIntakeId { get; set; }
        public int UserId { get; set; }
        public int FoodId { get; set; }
        public FoodEndpoints.FoodSearchResult Food { get; set; }
        public double Amount { get; set; }
        public DateTime Date { get; set; }
    }
}