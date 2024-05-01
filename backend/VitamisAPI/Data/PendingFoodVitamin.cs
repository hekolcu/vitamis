using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VitamisAPI.Data;

public class PendingFoodVitamin
{
    [Key]
    public int PendingFoodVitaminID { get; set; }

    [Required]
    [ForeignKey("PendingFood")]
    public int PendingFoodId { get; set; }
    public PendingFood PendingFood { get; set; }

    [Required]
    [ForeignKey("Vitamin")]
    public int VitaminId { get; set; }
    public Vitamin Vitamin { get; set; }

    public string Average { get; set; }
    public string Unit { get; set; }
    public string Minimum { get; set; }
    public string Maximum { get; set; }
}