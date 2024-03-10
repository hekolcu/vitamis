using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VitamisAPI.Data
{
    public class Food
    {
        [Key]
        public int FoodID { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        public string Category { get; set; } 

        public virtual ICollection<FoodVitamin> FoodVitamins { get; set; }
        public virtual ICollection<FoodNutrition> FoodNutritions { get; set; }
    }
}