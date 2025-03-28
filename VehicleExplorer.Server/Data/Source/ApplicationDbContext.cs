using Microsoft.EntityFrameworkCore;
using VehicleExplorer.Server.Data.Models;

namespace VehicleExplorer.Server.Data.Source
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<Vehicle> Vehicles => Set<Vehicle>();
        public DbSet<Manufacturer> Manufacturers => Set<Manufacturer>();
    }
}