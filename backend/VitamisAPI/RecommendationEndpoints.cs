using System.Security.Claims;
using VitamisAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace VitamisAPI;

public static class RecommendationEndpoints
{
    public static void MapRecommendationEndpoints(this WebApplication app)
    {
        var recommendationsMapGroup = app.MapGroup("/recommendations");
        
        recommendationsMapGroup.MapGet("/vitamins", async (VitamisDbContext db, HttpContext httpContext) =>
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

                if (user.DateOfBirth == null)
                {
                    return Results.NotFound("User must register their date of birth and gender.");
                }
                
                // Calculate age
                var today = DateTime.Today;
                var age = today.Year - user.DateOfBirth?.Year ?? 0;
                if (user.DateOfBirth?.Date > today.AddYears(-age)) age--;

                var genderString = user.Gender.HasValue ? user.Gender.Value.ToString() : string.Empty;

                // Determine the VitaminReferenceGroup based on age and gender
                var groupName = DetermineGroupName(age, genderString);
                
                var group = await db.VitaminReferenceGroups
                    .Where(g => g.GroupName == groupName)
                    .FirstOrDefaultAsync();
                
                if (group == null)
                {
                    return Results.NotFound($"Vitamin reference group '{groupName}' not found.");
                }

                // Fetch the recommended vitamins for the group
                var recommendedVitamins = await db.VitaminReferenceValues
                    .Where(v => v.GroupID == group.GroupID)
                    .Include(v => v.Vitamin) // Include the Vitamin details
                    .Select(v => new 
                    {
                        VitaminName = v.Vitamin.Name,
                        Amount = v.Amount,
                        Unit = v.Unit
                    })
                    .ToListAsync();

                return Results.Ok(new
                {
                    GroupName = groupName,
                    RecommendedVitamins = recommendedVitamins
                });
            })
            .RequireAuthorization();
    }
    
    public static string DetermineGroupName(int age, string gender)
    {
        string genderInTurkish = gender switch
        {
            "Male" => "Erkek",
            "Female" => "Kadın",
            _ => string.Empty
        };

        if (age < 5)
        {
            return $"Çocuk {age}";
        }
        if (age <= 18)
        {
            return $"{genderInTurkish} {age}";
        }
        string range = age switch
        {
            <= 50 => "19-50",
            <= 64 => "51-64",
            <= 70 => "65-70",
            _ => "\u226570"
        };
        return $"{genderInTurkish} {range}";
    }
}
