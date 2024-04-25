using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VitamisAPI.Data
{
    public class DietitianDetails
    {
        [Key]
        public int DietitianDetailsId { get; set; }
        
        public string  DietitianFileName { get; set; }
        
        [DefaultValue(false)]
        public bool IsConfirmed { get; set; }
        
        public List<User> Advisees { get; set; }
        
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
