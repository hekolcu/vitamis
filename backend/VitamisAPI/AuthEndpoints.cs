using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using VitamisAPI.Data;

namespace VitamisAPI;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app, ConfigurationManager configuration, String jwtKey)
    {
        var authMapGroup = app.MapGroup("/auth");
        
        authMapGroup.MapPost("/register", async (VitamisDbContext db, RegistrationRequest request) =>
        {
            var newUser = new User
            {
                Fullname = request.Fullname,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Email = request.Email
            };

            db.Users.Add(newUser);
            await db.SaveChangesAsync();
            return Results.Ok();
        });
        
        authMapGroup.MapPost("/login", async (VitamisDbContext db, LoginRequest request) =>
        {
            var user = await db.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return Results.Unauthorized();
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Fullname),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.UserType.ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials);

            return Results.Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
        });

        authMapGroup.MapPatch("password", async (VitamisDbContext db, ChangePasswordRequest request) =>
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            // Check if user exists and the current password is correct
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.CurrentPassword, user.Password))
            {
                return Results.Unauthorized();
            }

            // Update to new password
            user.Password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            db.Users.Update(user);
            await db.SaveChangesAsync();

            return Results.Ok("Password successfully updated.");
        });

    }
    
    private class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set;  }
    }
    
    private class RegistrationRequest
    {
        [Required]
        [StringLength(100)]
        public string Fullname { get; set; }

        [Required]
        [StringLength(255)]
        public string Password { get; set; }

        [Required]
        [StringLength(100)]
        [EmailAddress]
        public string Email { get; set; }
    }
    
    private class ChangePasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string CurrentPassword { get; set; }

        [Required]
        public string NewPassword { get; set; }
    }
}