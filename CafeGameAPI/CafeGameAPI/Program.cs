using CafeGameAPI.Data;
using CafeGameAPI.Data.Repositories;
using CafeGameAPI.Filters;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});

builder.Services.AddControllers(options =>
{
    options.Filters.Add(new ValidateModelAttribute());
});

builder.Services.AddDbContext<CafeGameDbContext>();
builder.Services.AddTransient<IInternetCafesRepository, InternetCafesRepository>();
builder.Services.AddTransient<IComputersRepository, ComputersRepository>();
builder.Services.AddTransient<IReservationsRepository, ReservationsRepository>();


var app = builder.Build();

app.UseRouting();
app.MapControllers();

app.Run();
