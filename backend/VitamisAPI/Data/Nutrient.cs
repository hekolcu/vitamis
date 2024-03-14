using System.ComponentModel.DataAnnotations;

namespace VitamisAPI.Data
{
    public class Nutrient
    {
        [Key]
        public int NutrientID { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
    }
}