using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VitamisAPI.Data
{
    public enum UserType
    {
        Advisee,
        Dietitian,
        AcademicianDietitian,
        Admin
    }

    public enum Gender
    {
        Male,
        Female
    }

    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [StringLength(50)]
        public string Username { get; set; }

        [Required]
        [StringLength(255)]
        public string Password { get; set; }

        [Required]
        public UserType UserType { get; set; }

        [Required]
        [StringLength(100)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public Gender Gender { get; set; }

        [Required]
        [Column(TypeName = "date")]
        public DateTime DateOfBirth { get; set; }

        public string HealthConditions { get; set; }

        // Additional logic or methods
    }
}
