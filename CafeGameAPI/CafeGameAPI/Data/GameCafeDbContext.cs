using CafeGameAPI.Auth.Models;
using CafeGameAPI.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CafeGameAPI.Data
{
    public class CafeGameDbContext : IdentityDbContext<CafeGameUser>
    {
        public DbSet<InternetCafe> InternetCafes { get; set; }
        public DbSet<Computer> Computers { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB; Initial Catalog=InternetCafeDb");
        }
    }
}
