using Microsoft.EntityFrameworkCore;

namespace Task_Management.Data;


public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
   public DbSet<Models.Task> Tasks { get; set; }

   protected override void OnModelCreating(ModelBuilder modelBuilder)
   {
      modelBuilder.Entity<Models.Task>().HasKey(x => x.Id);
      modelBuilder.Entity<Models.Task>().Property(t => t.Priority).HasConversion<string>();

   }
}