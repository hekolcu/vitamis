namespace VitamisAPI.Data;

using Microsoft.EntityFrameworkCore;

public class VitamisDbContext: DbContext
{
    public VitamisDbContext(DbContextOptions<VitamisDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
}