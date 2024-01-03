namespace VitamisAPI.Data;

using Microsoft.EntityFrameworkCore;

public class VitamisDbContext: DbContext
{
    public VitamisDbContext(DbContextOptions<VitamisDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Enforce uniqueness on the Name property of the Vitamin entity
        modelBuilder.Entity<Vitamin>()
            .HasIndex(v => v.Name)
            .IsUnique();
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Vitamin> Vitamins { get; set; }
    public DbSet<VitaminReferenceGroup> VitaminReferenceGroups { get; set; }
    public DbSet<VitaminReferenceValue> VitaminReferenceValues { get; set; }

}