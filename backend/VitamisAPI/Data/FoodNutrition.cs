using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VitamisAPI.Data
{
    public class FoodNutrition
    {
        [Key]
        public int FoodNutritionID { get; set; }

        [Required]
        [ForeignKey("Food")]
        public int FoodID { get; set; }
        public Food Food { get; set; }

        [Required]
        [ForeignKey("Nutrient")]
        public int NutrientID { get; set; }
        public Nutrient Nutrient { get; set; }

        public string Average { get; set; }
        public string Unit { get; set; }
        public string Minimum { get; set; }
        public string Maximum { get; set; }
    }
}