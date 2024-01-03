using System.Security.Claims;
using VitamisAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace VitamisAPI;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this WebApplication app)
    {
        app.MapGroup("/user")
            .MapGet("/details", async (VitamisDbContext db, HttpContext httpContext) =>
            {
                // Extract the user's identifier (e.g., username or email) from the JWT token
                var userEmail = httpContext.User.FindFirst(ClaimTypes.Email)?.Value;

                if (string.IsNullOrEmpty(userEmail))
                {
                    return Results.Unauthorized();
                }

                // Fetch user details from the database
                var user = await db.Users
                    .Where(u => u.Email == userEmail)
                    .Select(u => new { u.Email, u.Gender, u.DateOfBirth })
                    .FirstOrDefaultAsync();

                if (user == null)
                {
                    return Results.NotFound("User not found.");
                }

                return Results.Ok(user);
            })
            .RequireAuthorization();
    }
}