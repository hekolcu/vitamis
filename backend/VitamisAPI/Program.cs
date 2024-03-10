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
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "VitamisApi", Version = "v0.2" });
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

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(corsPolicyBuilder =>
    {
        corsPolicyBuilder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(8080);  // Listen on port 8080 on any IP address
});

// Uncomment below lines if inserting data for the first time.
// builder.Services.AddScoped<VitaminReferenceDataLoader>();
// builder.Services.AddScoped<FoodVitaminAndNutritionalDataLoader>();

var app = builder.Build();

// Uncomment below lines if inserting data for the first time.
// using (var scope = app.Services.CreateScope())
// {
//     try
//     {
//         scope.ServiceProvider.GetRequiredService<VitaminReferenceDataLoader>()
//             .LoadVitaminData();
//
//         scope.ServiceProvider.GetRequiredService<FoodVitaminAndNutritionalDataLoader>()
//             .LoadFoodData();
//     }
//     catch (Exception ex)
//     {
//         Console.WriteLine(ex.ToString());
//     }
// }

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.MapGet("/health", () => Results.Json(new { Message="healthy" }));

app.MapAuthEndpoints(configuration, jwtKey);
app.MapUserEndpoints();
app.MapRecommendationEndpoints();

app.Run();