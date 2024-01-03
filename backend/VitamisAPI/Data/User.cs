using System;
using System.ComponentModel;
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
        [StringLength(64)]
        public string Password { get; set; }

        [Required]
        [DefaultValue(UserType.Advisee)]
        public UserType UserType { get; set; }

        [Required]
        [StringLength(256)]
        [EmailAddress]
        public string Email { get; set; }

        public Gender? Gender { get; set; }

        [Column(TypeName = "date")]
        public DateTime? DateOfBirth { get; set; }

        // Additional logic or methods
    }
}
