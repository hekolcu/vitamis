using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VitamisAPI.Data
{
    public class VitaminReferenceValue
    {
        [Key]
        public int ValueID { get; set; }

        [Required]
        [ForeignKey("Vitamin")]
        public int VitaminID { get; set; }
        public Vitamin Vitamin { get; set; }

        [Required]
        [ForeignKey("VitaminReferenceGroup")]
        public int GroupID { get; set; }
        public VitaminReferenceGroup VitaminReferenceGroup { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        [StringLength(50)]
        public string Unit { get; set; }
    }
}