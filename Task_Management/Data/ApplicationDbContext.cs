using Microsoft.EntityFrameworkCore;

namespace Task_Management.Data;


public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
   public DbSet<Models.Task> Tasks { get; }

   protected override void OnModelCreating(ModelBuilder modelBuilder)
   {
      modelBuilder.Entity<Models.Task>().HasKey(e => e.Id);
   }
}