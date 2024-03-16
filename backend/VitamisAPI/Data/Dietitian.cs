using System.ComponentModel.DataAnnotations;

namespace VitamisAPI.Data
{
    public class Dietitian
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
