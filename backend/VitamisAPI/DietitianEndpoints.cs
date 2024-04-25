using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using VitamisAPI.Data;

namespace VitamisAPI;

public static class DietitianEndpoints
{
    public static void MapDietitianEndpoints(this WebApplication app)
    {
        var dietitianMapGroup = app.MapGroup("/dietitian");

        dietitianMapGroup.MapPost("/upload-certificate",
                async (IFormFile file, VitamisDbContext db, HttpContext context) =>
                {
                    if (file.ContentType == "application/pdf" ||
                        file.ContentType == "image/jpeg" ||
                        file.ContentType == "image/png")
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
                        
                        // if (user.UserType == UserType.Dietitian)
                        // {
                        //     return Results.BadRequest("User is already a dietitian. Cannot upload certificate again.");
                        // }
                        
                        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
                        
                        var filePath = Path.Combine("Data", "DieticianDocuments", fileName);
                        await using var stream = File.OpenWrite(filePath);
                        await file.CopyToAsync(stream);
                        
                        user.UserType = UserType.Dietitian;

                        db.DietitianDetails.Add(new DietitianDetails
                        {
                            User = user,
                            DietitianFileName = fileName,
                            IsConfirmed = false,
                        });
                        
                        await db.SaveChangesAsync();

                        return Results.Ok();
                    }

                    return Results.BadRequest("File must be a PDF, JPEG or PNG.");
                }
            )
            .DisableAntiforgery()
            .RequireAuthorization();
        
        dietitianMapGroup.MapGet("/get-certificate",
            async (VitamisDbContext db, HttpContext context) =>
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

                var dietitianDetails = await db.DietitianDetails
                    .Where(d => d.UserId == user.UserId)
                    .FirstOrDefaultAsync();

                if (dietitianDetails == null)
                {
                    return Results.NotFound("Dietitian details not found.");
                }

                var filePath = Path.Combine("Data", "DieticianDocuments", dietitianDetails.DietitianFileName);
                var stream = File.OpenRead(filePath);

                return Results.File(stream, "application/pdf");
            })
            .RequireAuthorization();
    }
}