using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using VitamisAPI.Data;
using VitamisAPI.Data.Tracking;
using HttpContext = Microsoft.AspNetCore.Http.HttpContext;

namespace VitamisAPI;

public static class DietitianEndpoints
{
    public static void MapDietitianEndpoints(this WebApplication app)
    {
        var dietitianMapGroup = app.MapGroup("/dietitian");

        dietitianMapGroup.MapPost("/upload-certificate",
                async (VitamisDbContext db, HttpContext context, IFormFile file, [FromQuery] string email) =>
                {
                    if (file.Length > 5 * 1024 * 1024)
                    {
                        return Results.BadRequest("File size must be less than 5MB.");
                    }

                    if (file.ContentType == "application/pdf" ||
                        file.ContentType == "image/jpeg" ||
                        file.ContentType == "image/png")
                    {
                        var userEmail = email;

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

                        if (user.UserType == UserType.Admin || user.UserType == UserType.AcademicianDietitian ||
                            user.UserType == UserType.Dietitian)
                        {
                            return Results.BadRequest("User must be a normal user.");
                        }

                        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

                        var filePath = Path.Combine("Data", "DieticianDocuments", fileName);
                        await using var stream = File.OpenWrite(filePath);
                        await file.CopyToAsync(stream);

                        // user.UserType = UserType.Dietitian;

                        db.DietitianDetails.Add(new DietitianDetails
                        {
                            User = user,
                            DietitianFileName = fileName,
                            IsConfirmed = false,
                        });

                        await db.SaveChangesAsync();

                        return Results.Ok();
                    }

                    return Results.BadRequest("File must be a PDF, JPEG or PNG.");
                }
            )
            .DisableAntiforgery();

        dietitianMapGroup.MapGet("/get-certificate",
                async (VitamisDbContext db, HttpContext context) =>
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

                    var dietitianDetails = await db.DietitianDetails
                        .Where(d => d.UserId == user.UserId)
                        .FirstOrDefaultAsync();

                    if (dietitianDetails == null)
                    {
                        return Results.NotFound("Dietitian details not found.");
                    }

                    var filePath = Path.Combine("Data", "DieticianDocuments", dietitianDetails.DietitianFileName);
                    var stream = File.OpenRead(filePath);

                    return Results.File(stream, "application/pdf");
                })
            .RequireAuthorization();

        dietitianMapGroup.MapGet("/search",
            async (VitamisDbContext db, HttpContext context, [FromQuery] string query) =>
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

                var dietitians = await db.Users
                    .Where(u => u.UserType == UserType.Dietitian && u.Fullname.Contains(query))
                    .Select(u => new
                    {
                        u.UserId,
                        u.Fullname,
                    })
                    .ToListAsync();

                return Results.Ok(dietitians);
            }).RequireAuthorization();

        var adviseeManagementMapGroup = dietitianMapGroup.MapGroup("/advisee");

        adviseeManagementMapGroup.MapPost("/add",
            async (VitamisDbContext db, HttpContext context, [FromBody] AdviseeRequest request) =>
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

                if (user.UserType != UserType.Dietitian && user.UserType != UserType.AcademicianDietitian)
                {
                    return Results.Unauthorized();
                }

                var advisee = await db.Users
                    .Where(u => u.UserId == request.UserId)
                    .FirstOrDefaultAsync();

                if (advisee == null)
                {
                    return Results.NotFound("Advisee not found.");
                }

                db.AdviseeDietitianRelations.Add(new AdviseeDietitianRelation
                {
                    Advisee = advisee,
                    Dietitian = user,
                    IsAccepted =
                        true, // for now. Will change in the future as the user data should only be shared once the user accepts
                    TimeStamp = DateTime.Now,
                });

                await db.SaveChangesAsync();

                return Results.Ok("Advisee added successfully.");
            }).RequireAuthorization();

        adviseeManagementMapGroup.MapGet("/list", async (VitamisDbContext db, HttpContext context) =>
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

                if (user.UserType != UserType.Dietitian && user.UserType != UserType.AcademicianDietitian)
                {
                    return Results.Unauthorized();
                }

                var advisees = await db.AdviseeDietitianRelations
                    .Where(r => r.Dietitian.UserId == user.UserId)
                    .Select(r => new
                    {
                        r.Advisee.UserId,
                        r.Advisee.Fullname,
                    })
                    .ToListAsync();

                return Results.Ok(advisees);
            })
            .RequireAuthorization();

        adviseeManagementMapGroup.MapGet("/remove",
                async (VitamisDbContext db, HttpContext context, [FromQuery] int userId) =>
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

                    if (user.UserType != UserType.Dietitian && user.UserType != UserType.AcademicianDietitian)
                    {
                        return Results.Unauthorized();
                    }

                    var relation = await db.AdviseeDietitianRelations
                        .Where(r => r.Dietitian.UserId == user.UserId && r.Advisee.UserId == userId)
                        .FirstOrDefaultAsync();

                    if (relation == null)
                    {
                        return Results.NotFound("Relation not found.");
                    }

                    db.AdviseeDietitianRelations.Remove(relation);
                    await db.SaveChangesAsync();

                    return Results.Ok("Relation removed successfully.");
                })
            .RequireAuthorization();

        adviseeManagementMapGroup
            .MapGet("/dailyReport", async (VitamisDbContext db, HttpContext context, [FromQuery] int userId) =>
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

                if (user.UserType != UserType.Dietitian && user.UserType != UserType.AcademicianDietitian)
                {
                    return Results.Unauthorized();
                }

                var relation = await db.AdviseeDietitianRelations
                    .Where(r => r.Dietitian.UserId == user.UserId && r.Advisee.UserId == userId)
                    .Include(r => r.Advisee)
                    .FirstOrDefaultAsync();

                if (relation == null) return Results.NotFound("Relation not found. Please add the advisee first.");

                var today = DateTime.Today;
                var records = await db.FoodIntakeRecords
                    .Where(r => r.User.UserId == relation.Advisee.UserId && r.Date.Date == today)
                    .Include(r => r.Food).ThenInclude(f => f.FoodVitamins).ThenInclude(fv => fv.Vitamin)
                    .ToListAsync();

                var vitaminSummaries = IntakeReport.CalculateVitaminSummaryFromFoodIntakeRecords(records);

                if (relation.Advisee.DateOfBirth == null)
                {
                    return Results.NotFound("Advisee must register their date of birth");
                }

                var age = today.Year - relation.Advisee.DateOfBirth?.Year ?? 0;
                if (relation.Advisee.DateOfBirth?.Date > today.AddYears(-age)) age--;

                var genderString = relation.Advisee.Gender.HasValue ? relation.Advisee.Gender.Value.ToString() : string.Empty;

                if (string.IsNullOrEmpty(genderString))
                {
                    return Results.NotFound("Advisee must register their gender");
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
                        consumedInStandardUnit =
                            IntakeReport.ConvertToStandardUnit(consumed.TotalAmount, unitInCode, vitaminNameInCode);
                    }

                    string recommendedUnitInCode = IntakeReport.unitMap[rv.Unit];
                    double recommendedInStandardUnit = IntakeReport.ConvertToStandardUnit(double.Parse(rv.Amount),
                        recommendedUnitInCode, vitaminNameInCode);

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
            })
            .RequireAuthorization();
    }

    public class AdviseeRequest
    {
        public int UserId { get; set; }
    }
}