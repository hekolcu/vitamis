using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
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
                    var dietitians = await db.Dietitians
                        .Select(d => new { d.Id, d.Name })
                        .ToListAsync();

                    return Results.Ok(dietitians);
                });

            DietitianMapGroup
                .MapPost("/create", async (VitamisDbContext db, HttpContext httpContext, DietitianCreateModel createModel) =>
                {
                    var dietitian = new Dietitian { Name = createModel.Name };

                    await db.Dietitians.AddAsync(dietitian);
                    await db.SaveChangesAsync();

                    return Results.Created($"/Dietitian/details/{dietitian.Id}", dietitian);
                });


            DietitianMapGroup
                .MapPut("/update/{id}", async (VitamisDbContext db, HttpContext httpContext, int id, DietitianUpdateModel updateModel) =>
                {
                    var dietitian = await db.Dietitians.FindAsync(id);

                    if (dietitian == null)
                    {
                        return Results.NotFound("Dietitian not found.");
                    }

                    dietitian.Name = updateModel.Name;

                    db.Dietitians.Update(dietitian);
                    await db.SaveChangesAsync();

                    return Results.Ok("Dietitian details updated successfully.");
                });
        }

        public class DietitianCreateModel
        {
            public string Name { get; set; }
        }

        public class DietitianUpdateModel
        {
            public string Name { get; set; }
        }
    }
}
