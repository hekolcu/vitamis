using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitamisAPI.Data;
using VitamisAPI.Data.Tracking;

namespace VitamisAPI;

public static class ReportEndpoints
{
    public static void MapReportEndpoints(this WebApplication app)
    {
        var reportMapGroup = app.MapGroup("/report");

        reportMapGroup.MapPost("/generate/mock",
            async (VitamisDbContext db, HttpContext httpContext, [FromBody] ReportRequest request) =>
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

                if (user.DateOfBirth == null)
                {
                    return Results.NotFound("User must register their date of birth");
                }
                
                var records = await db.FoodIntakeRecords
                    .Where(r => r.User.UserId == user.UserId && r.Date >= request.StartDate && r.Date <= request.EndDate)
                    .Include(r => r.Food).ThenInclude(f => f.FoodVitamins).ThenInclude(fv => fv.Vitamin)
                    .ToListAsync();

                var vitaminSummaries = IntakeReport.CalculateVitaminSummaryFromFoodIntakeRecords(records);
                
                return Results.Ok(new ReportResponse
                {
                    StartDate = request.StartDate,
                    EndDate = request.EndDate,
                    VitaminSummaries = vitaminSummaries
                });
            }).RequireAuthorization();
    }

    public class ReportResponse
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<IntakeReport.VitaminSummary> VitaminSummaries { get; set; }
    }
    
    public class ReportRequest
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}