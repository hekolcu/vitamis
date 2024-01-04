using System.ComponentModel.DataAnnotations;

namespace VitamisAPI.Data
{
    public class Vitamin
    {
        [Key]
        public int VitaminID { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
    }
}