using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using VitamisAPI.Data;
using VitamisAPI.Data.Tracking;

namespace VitamisAPI;

public static class DietitianEndpoints
{
    public static void MapDietitianEndpoints(this WebApplication app)
    {
        var dietitianMapGroup = app.MapGroup("/dietitian");

        dietitianMapGroup.MapPost("/upload-certificate",
                async (IFormFile file, VitamisDbContext db, HttpContext context) =>
                {
                    if (file.ContentType == "application/pdf" ||
                        file.ContentType == "image/jpeg" ||
                        file.ContentType == "image/png")
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

                        // if (user.UserType == UserType.Dietitian)
                        // {
                        //     return Results.BadRequest("User is already a dietitian. Cannot upload certificate again.");
                        // }

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
            .DisableAntiforgery()
            .RequireAuthorization();

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
                    .FirstOrDefaultAsync();

                if (relation == null) return Results.NotFound("Relation not found.");

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
            })
            .RequireAuthorization();
    }

    public class AdviseeRequest
    {
        public int UserId { get; set; }
    }
}