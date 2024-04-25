using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VitamisAPI.Data.Tracking;

public class FoodIntakeRecord
{
    [Key]
    public int FoodIntakeId { get; set; }

    [Required]
    [ForeignKey("User")]
    public int UserId { get; set; }
    public User User { get; set; }

    [Required]
    [ForeignKey("Food")]
    public int FoodId { get; set; }
    public Food Food { get; set; }
    
    // [Required]
    // [DefaultValue(1)]
    // [Range(0.01, double.MaxValue, ErrorMessage = "Portion must be positive")]
    // public double Portion { get; set; }
    // use amount in grams instead of portion
    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be positive")]
    public double Amount { get; set; }

    [Required]
    public DateTime Date { get; set; } 
}