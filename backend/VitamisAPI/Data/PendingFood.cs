using System.ComponentModel.DataAnnotations;

namespace VitamisAPI.Data;

public class PendingFood
{
    [Key]
    public int PendingFoodId { get; set; }
    
    [Required]
    [StringLength(100)]
    public string Name { get; set; }

    [Required]
    public string Category { get; set; }

    public virtual ICollection<PendingFoodVitamin> PendingFoodVitamins { get; set; }
}