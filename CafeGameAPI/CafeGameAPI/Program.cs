using CafeGameAPI.Auth.Models;
using CafeGameAPI.Data;
using CafeGameAPI.Data.Repositories;
using CafeGameAPI.Filters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});

builder.Services.AddControllers(options =>
{
    options.Filters.Add(new ValidateModelAttribute());
});

builder.Services.AddIdentity<CafeGameUser, IdentityRole>()
    .AddEntityFrameworkStores<CafeGameDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddDbContext<CafeGameDbContext>();

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters.ValidAudience = builder.Configuration["JWT:ValidAudience"];
        options.TokenValidationParameters.ValidIssuer = builder.Configuration["JWT:ValidIssuer"];
        options.TokenValidationParameters.IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]));
    });

builder.Services.AddTransient<IInternetCafesRepository, InternetCafesRepository>();
builder.Services.AddTransient<IComputersRepository, ComputersRepository>();
builder.Services.AddTransient<IReservationsRepository, ReservationsRepository>();

var app = builder.Build();

app.UseRouting();
app.MapControllers();
app.UseAuthentication();
app.UseAuthorization();

app.Run();
