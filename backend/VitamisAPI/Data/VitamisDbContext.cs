using VitamisAPI.Data.Tracking;

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

        modelBuilder.Entity<Food>()
            .HasIndex(v => v.Name)
            .IsUnique();
        
        modelBuilder.Entity<Nutrient>()
            .HasIndex(v => v.Name)
            .IsUnique();
        
        modelBuilder.Entity<IntakeReportFoodIntakeRecord>()
            .HasKey(irfir => new
            {
                irfir.IntakeReportId, irfir.FoodIntakeRecordId
            });

        modelBuilder.Entity<IntakeReportFoodIntakeRecord>()
            .HasOne(irfir => irfir.IntakeReport)
            .WithMany(ir => ir.IntakeReportFoodIntakeRecords)
            .HasForeignKey(irfir => irfir.IntakeReportId);

        modelBuilder.Entity<IntakeReportFoodIntakeRecord>()
            .HasOne(irfir => irfir.FoodIntakeRecord)
            .WithMany(fir => fir.IntakeReportFoodIntakeRecords)
            .HasForeignKey(irfir => irfir.FoodIntakeRecordId);
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Vitamin> Vitamins { get; set; }
    public DbSet<DietitianDetails> DietitianDetails { get; set; }
    public DbSet<VitaminReferenceGroup> VitaminReferenceGroups { get; set; }
    public DbSet<VitaminReferenceValue> VitaminReferenceValues { get; set; }
    public DbSet<Food> Foods { get; set; }
    public DbSet<Nutrient> Nutrients { get; set; }
    public DbSet<FoodNutrition> FoodNutritions { get; set; }
    public DbSet<FoodVitamin> FoodVitamins { get; set; }
    public DbSet<FoodIntakeRecord> FoodIntakeRecords { get; set; }
    public DbSet<IntakeReport> IntakeReports { get; set; }
    public DbSet<IntakeReportFoodIntakeRecord> IntakeReportFoodIntakeRecords { get; set; }
    public DbSet<PendingFood> PendingFoods { get; set; }
    public DbSet<PendingFoodVitamin> PendingFoodVitamins { get; set; }
}