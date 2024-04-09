using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
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

            DietitianMapGroup.MapPost("/upload_DietitianFile", async (IFormFile file, VitamisDbContext db, HttpContext context) =>
            {
                if (file.ContentType == "application/pdf" ||
                    file.ContentType == "image/jpeg" ||
                    file.ContentType == "image/png")
                {

                    var filePath = Path.Combine("DietitianDocuments", file.FileName);
                    using var stream = File.OpenWrite(filePath);
                    await file.CopyToAsync(stream);

                    var userEmail = context.User.FindFirst(ClaimTypes.Email)?.Value;

                    var user = await db.Users.FirstOrDefaultAsync(d => d.Email == userEmail);

                    if (user != null 
                    /*&& user.UserType == UserType.Dietitian*/)
                    {
                        // Update the database with filename and IsUploaded property set to true
                        var newFileEntry = new FileNames
                        {
                            FileName = file.FileName,
                            IsUploaded = true
                        };
                        db.DietitianFileNames.Add(newFileEntry);
                        await db.SaveChangesAsync();
                    }
                    else
                    {
                        return Results.BadRequest("User is not a dietitian.");
                    }

                    return Results.Ok(new { FileName = file.FileName, IsUploaded = true });
                }
                else
                {
                    return Results.BadRequest("File must be a PDF, JPEG, or PNG.");
                }
            }).DisableAntiforgery();

        }
    }
}
