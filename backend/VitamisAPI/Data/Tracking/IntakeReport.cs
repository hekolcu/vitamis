using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace VitamisAPI.Data.Tracking;

public class IntakeReport
{
    [Key]
    public int IntakeReportId { get; set; }

    [Required]
    [ForeignKey("User")]
    public int UserId { get; set; }
    public User User { get; set; }

    [Required]
    public DateTime StartDate { get; set; }
    [Required]
    public DateTime EndDate { get; set; }
    
    public virtual ICollection<IntakeReportFoodIntakeRecord> IntakeReportFoodIntakeRecords { get; set; }
    
    public List<VitaminSummary> GetVitaminSummary()
    {
        var intakeReportFoodIntakeRecords = IntakeReportFoodIntakeRecords.ToList();
        var foodIntakeRecords = intakeReportFoodIntakeRecords
            .Select(irfir => irfir.FoodIntakeRecord).ToList();
        return CalculateVitaminSummaryFromFoodIntakeRecords(foodIntakeRecords);
    }
    
    public static List<VitaminSummary> CalculateVitaminSummaryFromFoodIntakeRecords(List<FoodIntakeRecord> foodIntakeRecords)
    {
        var vitaminSummaryList = new List<VitaminSummary>();

        foreach (var record in foodIntakeRecords)
        {
            
            foreach (var foodVitamin in record.Food.FoodVitamins)
            {
                var vitaminSummary = vitaminSummaryList.FirstOrDefault(vs => vs.Name == foodVitamin.Vitamin.Name);

                if (vitaminSummary == null)
                {
                    vitaminSummary = new VitaminSummary
                    {
                        Name = foodVitamin.Vitamin.Name,
                        TotalAmount = 0,
                        Unit = foodVitamin.Unit
                    };
                    vitaminSummaryList.Add(vitaminSummary);
                }
                double average = double.Parse(
                    foodVitamin.Average,
                    NumberStyles.Any,
                    new CultureInfo("tr-TR"));

                vitaminSummary.TotalAmount += average * record.Amount / 100.0;
            }
        }

        return vitaminSummaryList;
    }
    
    public class VitaminSummary
    {
        public string Name { get; set; }
        public double TotalAmount { get; set; }
        public string Unit { get; set; }
    }
}