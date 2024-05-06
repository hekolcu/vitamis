using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace VitamisAPI.Data.Tracking;

public class IntakeReport
{
    [Key]
    public int IntakeReportId { get; set; }

    [Required]
    [ForeignKey("User")]
    public int UserId { get; set; }
    public User User { get; set; }

    [Required]
    public DateTime StartDate { get; set; }
    [Required]
    public DateTime EndDate { get; set; }
    
    public virtual ICollection<IntakeReportFoodIntakeRecord> IntakeReportFoodIntakeRecords { get; set; }
    
    public List<VitaminSummary> GetVitaminSummary()
    {
        var intakeReportFoodIntakeRecords = IntakeReportFoodIntakeRecords.ToList();
        var foodIntakeRecords = intakeReportFoodIntakeRecords
            .Select(irfir => irfir.FoodIntakeRecord).ToList();
        return CalculateVitaminSummaryFromFoodIntakeRecords(foodIntakeRecords);
    }
    
    public static List<VitaminSummary> CalculateVitaminSummaryFromFoodIntakeRecords(List<FoodIntakeRecord> foodIntakeRecords)
    {
        var vitaminSummaryList = new List<VitaminSummary>();

        foreach (var record in foodIntakeRecords)
        {
            
            foreach (var foodVitamin in record.Food.FoodVitamins)
            {
                var vitaminSummary = vitaminSummaryList.FirstOrDefault(vs => vs.Name == foodVitamin.Vitamin.Name);

                if (vitaminSummary == null)
                {
                    vitaminSummary = new VitaminSummary
                    {
                        Name = foodVitamin.Vitamin.Name,
                        TotalAmount = 0,
                        Unit = "µg"
                    };
                    vitaminSummaryList.Add(vitaminSummary);
                }
                double average = double.Parse(
                    foodVitamin.Average,
                    NumberStyles.Any,
                    new CultureInfo("tr-TR"));
                
                string vitaminNameInCode = vitaminNameMap[foodVitamin.Vitamin.Name];
                string unitInCode = unitMap[foodVitamin.Unit];

                double averageInStandardUnit = ConvertToStandardUnit(average, unitInCode, vitaminNameInCode);

                vitaminSummary.TotalAmount += averageInStandardUnit * record.Amount / 100.0;
            }
        }

        return vitaminSummaryList;
    }
    
    public static double ConvertToStandardUnit(double amount, string unit, string vitaminName)
    {
        switch (unit.ToLower())
        {
            case "mg/1000kkal":
            case "mg":
                return amount * 1000; // convert to micrograms
            case "g":
                return amount * 1000000; // convert to micrograms
            case "mcg":
            case "µg":
                return amount; // already in micrograms
            case "iu":
                return ConvertFromIuToMcg(amount, vitaminName);
            case "re":
                return ConvertFromReToMcg(amount, vitaminName);
            case "α-te":
                return ConvertFromAlphaTeToMcg(amount, vitaminName);
            default:
                throw new ArgumentException($"Unknown unit: {unit}");
        }
    }

    public static double ConvertFromIuToMcg(double amount, string vitaminName)
    {
        // Conversion rates from IU to µg for Vitamin D and E
        var conversionRates = new Dictionary<string, double>
        {
            { "vitamin a", 0.3 }, // 1 IU of Vitamin A is equivalent to 0.3 µg
            { "vitamin d", 0.025 }, // 1 IU of Vitamin D is equivalent to 0.025 µg
            { "vitamin d3", 0.025 }, // 1 IU of Vitamin D3 is equivalent to 0.025 µg
            { "vitamin e", 0.667 }, // 1 IU of Vitamin E is equivalent to 0.667 µg of alpha-tocopherol
        };

        if (!conversionRates.TryGetValue(vitaminName.ToLower(), out var conversionRate))
        {
            throw new ArgumentException($"No conversion rate from IU to µg for vitamin: {vitaminName}");
        }

        return amount * conversionRate;
    }

    public static double ConvertFromReToMcg(double amount, string vitaminName)
    {
        // Conversion rates from RE to µg for Vitamin A
        var conversionRates = new Dictionary<string, double>
        {
            { "vitamin a", 1 }
        };

        if (!conversionRates.TryGetValue(vitaminName.ToLower(), out var conversionRate))
        {
            throw new ArgumentException($"No conversion rate from RE to µg for vitamin: {vitaminName}");
        }

        return amount * conversionRate;
    }

    public static double ConvertFromAlphaTeToMcg(double amount, string vitaminName)
    {
        // Conversion rates from α-TE to µg for Vitamin E
        var conversionRates = new Dictionary<string, double>
        {
            { "vitamin e", 1000 }
        };

        if (!conversionRates.TryGetValue(vitaminName.ToLower(), out var conversionRate))
        {
            throw new ArgumentException($"No conversion rate from α-TE to µg for vitamin: {vitaminName}");
        }

        return amount * conversionRate;
    }
    
    public static Dictionary<string, string> vitaminNameMap = new Dictionary<string, string>
    {
        { "A vitamini", "vitamin a" },
        { "B12 vitamini", "vitamin b12" },
        { "B6 vitamini", "vitamin b6" },
        { "Biotin", "biotin" },
        { "C vitamini", "vitamin c" },
        { "D vitamini", "vitamin d" },
        { "D3 vitamini (kolekalsiferol)", "vitamin d3" },
        { "E vitamini", "vitamin e" },
        { "Folat", "folate" },
        { "K vitamini", "vitamin k" },
        { "K1 vitamini", "vitamin k1" },
        { "K2 vitamini", "vitamin k2" },
        { "Niasin", "niacin" },
        { "Pantotenik asit", "pantothenic acid" },
        { "Riboflavin", "riboflavin" },
        { "Tiamin", "thiamin" }
    };

    public static Dictionary<string, string> unitMap = new Dictionary<string, string>
    {
        { "mg", "mg" },
        { "RE", "re" },
        { "α-TE", "α-te" },
        { "IU", "iu" },
        { "µg", "µg" },
        { "mcg", "µg" },
        { "g", "g" },
        { "mg/1000kkal", "mg/1000kkal" }
    };
    
    public class VitaminSummary
    {
        public string Name { get; set; }
        public double TotalAmount { get; set; }
        public string Unit { get; set; }
    }
}