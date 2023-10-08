using CafeGameAPI.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace CafeGameAPI.Data
{
    public class CafeGameDbContext : DbContext
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
