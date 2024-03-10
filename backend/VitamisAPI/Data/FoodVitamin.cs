using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VitamisAPI.Data
{
    public class FoodVitamin
    {
        [Key]
        public int FoodVitaminID { get; set; }

        [Required]
        [ForeignKey("Food")]
        public int FoodID { get; set; }
        public Food Food { get; set; }

        [Required]
        [ForeignKey("Vitamin")]
        public int VitaminID { get; set; }
        public Vitamin Vitamin { get; set; }

        public string Average { get; set; }
        public string Unit { get; set; }
        public string Minimum { get; set; }
        public string Maximum { get; set; }
    }
}