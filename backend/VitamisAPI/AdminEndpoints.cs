using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using VitamisAPI.Data;

namespace VitamisAPI;

public static class AdminEndpoints
{
    public static void MapAdminEndpoints(this WebApplication app)
    {
        var adminMapGroup = app.MapGroup("/admin");

        var dietitianManagementMapGroup = adminMapGroup.MapGroup("/dietitian");
        
        dietitianManagementMapGroup.MapGet("/list", async (VitamisDbContext db, HttpContext context) =>
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

            if (user.UserType != UserType.Admin)
            {
                return Results.Forbid();
            }
            
            var dietitianDetails = await db.DietitianDetails
                .Where(d => !d.IsConfirmed)
                .Select(d => new
                {
                    d.UserId,
                    d.User.Fullname,
                    d.User.Email,
                    d.DietitianFileName
                })
                .ToListAsync();
            
            return Results.Ok(dietitianDetails);
        }).RequireAuthorization();
        
        dietitianManagementMapGroup.MapPost("/confirm", async (VitamisDbContext db, HttpContext context, [FromBody] ConfirmDietitianRequest request) =>
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

            if (user.UserType != UserType.Admin)
            {
                return Results.Forbid();
            }

            var dietitian = await db.Users
                .Where(u => u.Email == request.Email)
                .FirstOrDefaultAsync();

            if (dietitian == null)
            {
                return Results.NotFound("Dietitian not found.");
            }

            if (dietitian.UserType == UserType.Dietitian)
            {
                return Results.BadRequest("User is already a dietitian.");
            }
            
            dietitian.UserType = UserType.Dietitian;

            var dietitianDetails = await db.DietitianDetails
                .Where(d => d.UserId == dietitian.UserId)
                .FirstOrDefaultAsync();

            if (dietitianDetails != null) dietitianDetails.IsConfirmed = true;
            else return Results.NotFound("Dietitian details not found.");

            await db.SaveChangesAsync();

            return Results.Ok();
        }).RequireAuthorization();

        dietitianManagementMapGroup.MapPost("/reject", async (VitamisDbContext db, HttpContext context, [FromBody] ConfirmDietitianRequest request) =>
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

            if (user.UserType != UserType.Admin)
            {
                return Results.Forbid();
            }
            
            var dietitian = await db.Users
                .Where(u => u.Email == request.Email)
                .FirstOrDefaultAsync();

            if (dietitian == null)
            {
                return Results.NotFound("Dietitian not found.");
            }
            
            var dietitianDetails = await db.DietitianDetails
                .Where(d => d.UserId == dietitian.UserId)
                .FirstOrDefaultAsync();

            if (dietitianDetails != null)
            {
                try 
                {
                    var filePath = Path.Combine("Data", "DieticianDocuments", dietitianDetails.DietitianFileName);
                    if (File.Exists(filePath))
                    {
                        File.Delete(filePath);
                    }
                }
                catch (Exception e)
                {
                    return Results.BadRequest("Failed to delete dietitian certificate.");
                }
                db.DietitianDetails.Remove(dietitianDetails);
            }
            else return Results.NotFound("Dietitian details not found.");
            
            await db.SaveChangesAsync();
            
            return Results.Ok();
        }).RequireAuthorization();

        dietitianManagementMapGroup.MapGet("getCertificate", async (VitamisDbContext db, HttpContext context, [FromQuery] int userId) =>
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

            if (user.UserType != UserType.Admin)
            {
                return Results.Forbid();
            }
            
            var dietitianDetails = await db.DietitianDetails
                .Where(d => d.UserId == userId)
                .FirstOrDefaultAsync();

            if (dietitianDetails == null)
            {
                return Results.NotFound("Dietitian details not found.");
            }
            
            var filePath = Path.Combine("Data", "DieticianDocuments", dietitianDetails.DietitianFileName);
            
            if (!File.Exists(filePath))
            {
                return Results.NotFound("Certificate not found.");
            }
            
            var fileStream = File.OpenRead(filePath);

            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(filePath, out var contentType))
            {
                contentType = "application/octet-stream";
            }
    
            return Results.File(fileStream, contentType);
        }).RequireAuthorization();

    }

    private class ConfirmDietitianRequest
    {
        public string Email { get; set; }
    }
}