namespace VitamisAPI.Data.Tracking;

public class IntakeReportFoodIntakeRecord
{
    public int IntakeReportId { get; set; }
    public IntakeReport IntakeReport { get; set; }

    public int FoodIntakeRecordId { get; set; }
    public FoodIntakeRecord FoodIntakeRecord { get; set; }
}