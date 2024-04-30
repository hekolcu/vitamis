using System.ComponentModel;
using System.Security.Claims;
using VitamisAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace VitamisAPI;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this WebApplication app)
    {
        var userMapGroup = app.MapGroup("/user");

        userMapGroup
            .MapGet("/details", async (VitamisDbContext db, HttpContext httpContext) =>
            {
                var userEmail = httpContext.User.FindFirst(ClaimTypes.Email)?.Value;

                if (string.IsNullOrEmpty(userEmail))
                {
                    return Results.Unauthorized();
                }

                var user = await db.Users
                    .Where(u => u.Email == userEmail)
                    .Select(u => new
                    {
                        u.Fullname,
                        u.Email,
                        Gender = u.Gender.HasValue ? u.Gender.Value.ToString() : "Unknown",
                        u.DateOfBirth,
                        u.Height,
                        u.Weight,
                        u.Disease,
                        Smoking = u.Smoking.HasValue ? (u.Smoking.Value ? "Yes" : "No") : "Unknown",
                        SunExposure = u.SunExposure.HasValue ? u.SunExposure.Value.ToString() : "Unknown"
                    })
                    .FirstOrDefaultAsync();

                if (user == null)
                {
                    return Results.NotFound("User not found.");
                }

                return Results.Ok(user);
            })
            .RequireAuthorization();

        userMapGroup
            .MapPost("/details", async (VitamisDbContext db, HttpContext httpContext, UserUpdateModel updateModel) =>
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

                // Updating the user details
                if (Enum.TryParse<Gender>(updateModel.Gender, true, out var genderEnum))
                {
                    user.Gender = genderEnum;
                }

                if (Enum.TryParse<SunExposure>(updateModel.SunExposure, true, out var sunExposureEnum))
                {
                    user.SunExposure = sunExposureEnum;
                }

                user.DateOfBirth = updateModel.DateOfBirth;
                user.Height = updateModel.Height;
                user.Weight = updateModel.Weight;
                user.Disease = updateModel.Disease;
                user.Smoking = updateModel.Smoking;

                db.Users.Update(user);
                await db.SaveChangesAsync();

                return Results.Ok("User details updated successfully.");
            })
            .RequireAuthorization();

<<<<<<< HEAD
        userMapGroup
               .MapDelete("/delete", async (VitamisDbContext db, HttpContext httpContext) =>
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

                   db.Users.Remove(user);
                   await db.SaveChangesAsync();

                   return Results.Ok("User account deleted successfully.");
               })
               .RequireAuthorization();
=======
        userMapGroup.MapDelete("", async (VitamisDbContext db, HttpContext context) =>
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
            
            db.Users.Remove(user);
            await db.SaveChangesAsync();
            
            return Results.Ok($"User \"{user.Fullname}\" deleted successfully.");
        }).RequireAuthorization();
>>>>>>> main
    }
}

    public class UserUpdateModel
    {
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public double Height { get; set; }
        public double Weight { get; set; }
        public string? Disease { get; set; }
        public string? SunExposure { get; set; }
        public bool? Smoking { get; set; }
    }
