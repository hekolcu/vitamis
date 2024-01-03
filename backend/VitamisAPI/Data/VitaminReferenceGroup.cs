using System.ComponentModel.DataAnnotations;

namespace VitamisAPI.Data
{
    public class VitaminReferenceGroup
    {
        [Key]
        public int GroupID { get; set; }
        
        [Required]
        [StringLength(100)]
        public string GroupName { get; set; }
    }
}