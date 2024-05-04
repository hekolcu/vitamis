using System.ComponentModel;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
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
                        SunExposure = u.SunExposure.HasValue ? u.SunExposure.Value.ToString() : "Unknown",
                        UserType = u.UserType.ToString(),
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
                if(Enum.TryParse<Gender>(updateModel.Gender, true, out var genderEnum)) 
                {
                    user.Gender = genderEnum;
                }

                if(Enum.TryParse<SunExposure>(updateModel.SunExposure, true, out var sunExposureEnum)) 
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

        userMapGroup.MapGet("/search", async (VitamisDbContext db, HttpContext context, [FromQuery] string q) =>
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
                
                if (user.UserType != UserType.Dietitian && user.UserType != UserType.AcademicianDietitian && user.UserType != UserType.Admin)
                {
                    return Results.Unauthorized();
                }
                
                var users = await db.Users
                    .Where(u => u.Fullname.Contains(q))
                    .Select(u => new
                    {
                        u.UserId,
                        u.Fullname,
                        u.Email,
                    })
                    .ToListAsync();
                
                return Results.Ok(users);
            })
            .RequireAuthorization();

        userMapGroup.MapGet("/dietitians", async (VitamisDbContext db, HttpContext context) =>
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
            
            var dietitianRelations = await db.AdviseeDietitianRelations
                .Where(adr => adr.AdviseeId == user.UserId && adr.IsAccepted)
                .Include(adr => adr.Dietitian)
                .Select(adr => new
                {
                    adr.Dietitian.UserId,
                    adr.Dietitian.Fullname,
                })
                .ToListAsync();
            
            return Results.Ok(dietitianRelations);
        }).RequireAuthorization();
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
}
