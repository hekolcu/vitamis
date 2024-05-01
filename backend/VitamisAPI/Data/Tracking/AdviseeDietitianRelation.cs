using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VitamisAPI.Data.Tracking;

public class AdviseeDietitianRelation
{
    [Key]
    public int AdviseeDietitianRelationId { get; set; }
    
    [ForeignKey("User")]
    public int AdviseeId { get; set; }
    public User Advisee { get; set; }
    
    [ForeignKey("User")]
    public int DietitianId { get; set; }
    public User Dietitian { get; set; }
    
    public bool IsAccepted { get; set; }
    
    public DateTime TimeStamp { get; set; }
}