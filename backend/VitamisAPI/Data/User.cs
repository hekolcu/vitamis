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

    // New enum for Sun Exposure
    public enum SunExposure
    {
        Low,
        Moderate,
        High
    }

    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [StringLength(100)]
        public string Fullname { get; set; }

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
        
        public double? Height { get; set; }
        
        public double? Weight { get; set; }

        [StringLength(100)]
        public string? Disease { get; set; }

        public SunExposure? SunExposure { get; set; }

        public bool? Smoking { get; set; }
    }
}