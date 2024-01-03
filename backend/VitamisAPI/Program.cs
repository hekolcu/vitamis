using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using VitamisAPI;
using VitamisAPI.Data;
using VitamisAPI.Data.LoadData;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;
var jwtKey = configuration["Jwt:Key"] ?? "3TpEoLQix6jIwu7plzczjXj6eGni+Wlcq6ojcSsm4kg=";

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Test API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

builder.Services.AddDbContext<VitamisDbContext>(
    options => options.UseMySql(
        configuration.GetConnectionString("DefaultConnection"), 
        ServerVersion.AutoDetect(configuration.GetConnectionString("DefaultConnection"))));

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = configuration["Jwt:Issuer"],
            ValidAudience = configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdviseePolicy", policy =>
        policy.RequireAssertion(context =>
            context.User.HasClaim(c => 
                c.Type == "UserType" && c.Value == UserType.Advisee.ToString())));
});

// Uncomment below line if inserting vitamin reference data for the first time.
// builder.Services.AddScoped<VitaminReferenceDataLoader>();

var app = builder.Build();

// Uncomment below line if inserting vitamin reference data for the first time.
// using (var scope = app.Services.CreateScope())
// {
//     try
//     {
//         scope.ServiceProvider.GetRequiredService<VitaminReferenceDataLoader>()
//             .LoadVitaminData();
//     }
//     catch (Exception ex)
//     {
//         Console.WriteLine(ex.ToString());
//     }
// }

app.UseAuthentication();
app.UseAuthorization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapAuthEndpoints(configuration, jwtKey);
app.MapUserEndpoints();

app.Run();