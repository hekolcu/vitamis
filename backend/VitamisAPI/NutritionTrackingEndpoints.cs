using VitamisAPI.Data;
using System.Security.Claims;
using VitamisAPI.Data.Tracking;

namespace VitamisAPI;

public static class NutritionTrackingEndpoints
{
    public static void MapTrackingEndpoints(this WebApplication app)
    {
        var trackingMapGroup = app.MapGroup("/tracking");

        trackingMapGroup.MapGet("/add", (VitamisDbContext db, HttpContext httpContext, int FoodId) =>
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
            
            var food = db.Foods.FirstOrDefault(f => f.FoodID == FoodId);

            if (food == null)
            {
                return Results.NotFound("Food not found.");
            }
            
            db.FoodIntakeRecords.Add(new FoodIntakeRecord()
            {
                User = user,
                FoodId = FoodId,
                Date = DateTime.Now,
                Amount = 100
            });

            return Results.Ok(new { });
        }).RequireAuthorization();
    }
}