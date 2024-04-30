using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using VitamisAPI.Data;

namespace VitamisAPI;

public static class VitaminEndpoints
{
    public static void MapVitaminEndpoints(this WebApplication app)
    {
        var vitaminMapGroup = app.MapGroup("/vitamin");

        vitaminMapGroup.MapGet("/list", async (VitamisDbContext db, HttpContext context) =>
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
            
            var vitamins = await db.Vitamins
                .Select(v => v.Name)
                .ToListAsync();
            
            return Results.Ok(vitamins);
        }).RequireAuthorization();
    }
}