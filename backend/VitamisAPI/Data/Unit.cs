using System.ComponentModel.DataAnnotations;

namespace VitamisAPI.Data;

public class Unit
{
    [Key]
    public int UnitID { get; set; }

    [StringLength(64)]
    public string Name { get; set; }

    [Required]
    [StringLength(16)]
    public string? Abbreviation { get; set; }
    
    [Required]
    public double Converstion { get; set; }
}