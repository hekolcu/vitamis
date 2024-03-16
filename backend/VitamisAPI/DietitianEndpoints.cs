using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using VitamisAPI.Data;

namespace VitamisAPI
{
    public static class DietitianEndpoints
    {
        public static void MapDietitianEndpoints(this WebApplication app)
        {
            var DietitianMapGroup = app.MapGroup("/Dietitian");

            DietitianMapGroup
                .MapGet("/details", async (VitamisDbContext db, HttpContext httpContext) =>
                {
                    var DietitianName = httpContext.User.FindFirst(ClaimTypes.Name)?.Value;

                    if (string.IsNullOrEmpty(DietitianName))
                    {
                        return Results.Unauthorized();
                    }

                    var Dietitian = await db.Dietitians
                        .Where(u => u.Name == DietitianName)
                        .Select(u => new
                        {
                            u.Name
                        })
                        .FirstOrDefaultAsync();

                    if (Dietitian == null)
                    {
                        return Results.NotFound("Dietitian not found.");
                    }

                    return Results.Ok(Dietitian);
                })
                .RequireAuthorization();

            DietitianMapGroup
                .MapPost("/details", async (VitamisDbContext db, HttpContext httpContext, DietitianUpdateModel updateModel) =>
                {
                    var DietitianName = httpContext.User.FindFirst(ClaimTypes.Name)?.Value;

                    if (string.IsNullOrEmpty(DietitianName))
                    {
                        return Results.Unauthorized();
                    }

                    var Dietitian = await db.Dietitians
                        .Where(u => u.Name == DietitianName)
                        .FirstOrDefaultAsync();

                    if (Dietitian == null)
                    {
                        return Results.NotFound("Dietitian not found.");
                    }
                    
                    Dietitian.Name = updateModel.Name;

                    db.Dietitians.Update(Dietitian);
                    await db.SaveChangesAsync();

                    return Results.Ok("Dietitian details updated successfully.");
                })
                .RequireAuthorization();
        }

        public class DietitianUpdateModel
        {
            public string Name { get; set; }
        }
    }
}
