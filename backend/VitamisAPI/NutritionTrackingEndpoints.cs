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
                    string vitaminNameInCode = IntakeReport.vitaminNameMap[fv.Vitamin.Name];
                    string unitInCode = IntakeReport.unitMap[fv.Unit];
                    double averageInStandardUnit = IntakeReport.ConvertToStandardUnit(average, unitInCode, vitaminNameInCode);

                    double averageForAmount = averageInStandardUnit * amount / 100.0;
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
                            string vitaminNameInCode = IntakeReport.vitaminNameMap[fv.Vitamin.Name];
                            string unitInCode = IntakeReport.unitMap[fv.Unit];
                            double averageInStandardUnit = IntakeReport.ConvertToStandardUnit(average, unitInCode, vitaminNameInCode);

                            double averageForAmount = averageInStandardUnit * r.Amount / 100.0;
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

            var allVitaminPercentages = recommendedVitamins.Select(rv =>
            {
                var consumed = vitaminSummaries.FirstOrDefault(vs => vs.Name == rv.Vitamin.Name);
                double consumedInStandardUnit = 0;
                string vitaminNameInCode = "";
                if (consumed != null)
                {
                    vitaminNameInCode = IntakeReport.vitaminNameMap[rv.Vitamin.Name];
                    string unitInCode = IntakeReport.unitMap[consumed.Unit];
                    consumedInStandardUnit = IntakeReport.ConvertToStandardUnit(consumed.TotalAmount, unitInCode, vitaminNameInCode);
                }

                string recommendedUnitInCode = IntakeReport.unitMap[rv.Unit];
                double recommendedInStandardUnit = IntakeReport.ConvertToStandardUnit(double.Parse(rv.Amount), recommendedUnitInCode, vitaminNameInCode);

                var percentage = consumed != null ? (consumedInStandardUnit / recommendedInStandardUnit) * 100 : 0;

                return new
                {
                    VitaminName = rv.Vitamin.Name,
                    ConsumedAmount = consumed?.TotalAmount ?? 0,
                    ConsumedUnit = consumed?.Unit ?? "",
                    RecommendedAmount = rv.Amount,
                    RecommendedUnit = rv.Unit,
                    Percentage = percentage
                };
            }).ToList();

            return Results.Ok(allVitaminPercentages);
        }).RequireAuthorization();

        trackingMapGroup.MapGet("/twoWeeksReport", async (VitamisDbContext db, HttpContext httpContext) =>
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

            var twoWeeksAgo = DateTime.Today.AddDays(-14);
            var records = await db.FoodIntakeRecords
                .Where(r => r.User.UserId == user.UserId && r.Date.Date >= twoWeeksAgo)
                .Include(r => r.Food).ThenInclude(f => f.FoodVitamins).ThenInclude(fv => fv.Vitamin)
                .ToListAsync();

            var dailyReports = new List<object>();
            for (var date = twoWeeksAgo; date <= DateTime.Today; date = date.AddDays(1))
            {
                var dailyRecords = records.Where(r => r.Date.Date == date).ToList();
                var vitaminSummaries = IntakeReport.CalculateVitaminSummaryFromFoodIntakeRecords(dailyRecords);

                var age = DateTime.Today.Year - user.DateOfBirth?.Year ?? 0;
                if (user.DateOfBirth?.Date > DateTime.Today.AddYears(-age)) age--;

                var genderString = user.Gender.HasValue ? user.Gender.Value.ToString() : string.Empty;

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

                var totalPercentage = 0.0;
                foreach (var rv in recommendedVitamins)
                {
                    var consumed = vitaminSummaries.FirstOrDefault(vs => vs.Name == rv.Vitamin.Name);
                    double consumedInStandardUnit = 0;
                    string vitaminNameInCode = "";
                    string unitInCode = "";
                    if (consumed != null)
                    {
                        vitaminNameInCode = IntakeReport.vitaminNameMap[rv.Vitamin.Name];
                        unitInCode = IntakeReport.unitMap[consumed.Unit];
                        consumedInStandardUnit = IntakeReport.ConvertToStandardUnit(consumed.TotalAmount, unitInCode, vitaminNameInCode);
                    }

                    string recommendedUnitInCode = IntakeReport.unitMap[rv.Unit];
                    double recommendedInStandardUnit = IntakeReport.ConvertToStandardUnit(double.Parse(rv.Amount), recommendedUnitInCode, vitaminNameInCode);

                    var percentage = consumed != null ? (consumedInStandardUnit / recommendedInStandardUnit) * 100 : 0;
                    totalPercentage += Math.Min(percentage, 100.0);
                }

                var averagePercentage = totalPercentage / recommendedVitamins.Count;

                dailyReports.Add(new
                {
                    Date = date,
                    GoalAchievementPercentage = averagePercentage
                });
            }

            return Results.Ok(dailyReports);
        }).RequireAuthorization();

        trackingMapGroup.MapGet("/dailyFoodGroups", async (VitamisDbContext db, HttpContext context) =>
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
                
                var today = DateTime.Today;
                var records = await db.FoodIntakeRecords
                    .Where(r => r.User.UserId == user.UserId && r.Date.Date == today)
                    .Include(r => r.Food)
                    .ToListAsync();
                
                var categoryMap = new Dictionary<string, string>
                {
                    { "Meyve ve meyve ürünleri", "Meyve" },
                    { "Sebze ve sebze ürünleri", "Sebze" },
                    { "Yumurta ve yumurta ürünleri", "Diğer" },
                    { "Et ve et ürünleri", "Diğer" },
                    { "Balık ve su ürünleri", "Diğer" },
                    { "Sıvı ve katı yağlar", "Diğer" },
                    { "Tahıl ve tahıl ürünleri", "Diğer" },
                    { "Yağlı tohumlar ve kuru baklagiller", "Diğer" },
                    { "İçecekler", "Diğer" },
                    { "Muhtelif gıda", "Diğer" },
                    { "Geleneksel gıdalar", "Diğer" },
                    { "Süt ve süt ürünleri", "Diğer" },
                    { "Özel beslenme amaçlı gıdalar", "Diğer" }
                };
                
                // Initialize a dictionary with the new categories and their values set to 0
                var foodGroupPercentages = new Dictionary<string, double>
                {
                    { "Meyve", 0 },
                    { "Sebze", 0 },
                    { "Diğer", 0 }
                };

                // group the food intakes by the new categories
                var foodGroups = records.GroupBy(r => categoryMap[r.Food.Category]);

                // calculate the total percentage of each food group based on grams consumed
                var totalGrams = records.Sum(r => r.Amount);
                foreach (var group in foodGroups)
                {
                    var totalGroupGrams = group.Sum(r => r.Amount);
                    var percentage = totalGroupGrams / totalGrams * 100;
                    foodGroupPercentages[group.Key] = percentage;
                }

                return Results.Ok(foodGroupPercentages);
            })
            .RequireAuthorization();
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