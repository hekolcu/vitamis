namespace VitamisAPI.Data;

using Microsoft.EntityFrameworkCore;

public class VitamisDbContext: DbContext
{
    public VitamisDbContext(DbContextOptions<VitamisDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Vitamin> Vitamins { get; set; }
    public DbSet<VitaminReferenceGroup> VitaminReferenceGroups { get; set; }
    public DbSet<VitaminReferenceValue> VitaminReferenceValues { get; set; }

}