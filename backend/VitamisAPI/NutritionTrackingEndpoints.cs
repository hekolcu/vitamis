using VitamisAPI.Data;
using System.Security.Claims;

namespace VitamisAPI;

public class NutritionTrackingEndpoints
{
    public static void MapTrackingEndpoints(this WebApplication app)
    {
        var trackingMapGroup = app.MapGroup("/tracking");

        trackingMapGroup.MapGet("/add/{id}", (VitamisDbContext db, HttpContext httpContext) =>
        {
            var userEmail = httpContext.User.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(userEmail))
            {
                return Results.Unauthorized();
            }
            
            

            return Results.Ok(new { });
        }).RequireAuthorization();
    }
}