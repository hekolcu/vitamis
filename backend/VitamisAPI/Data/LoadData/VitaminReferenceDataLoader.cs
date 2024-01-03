using System.Text.Json;
using System.Text.Json.Serialization;

namespace VitamisAPI.Data.LoadData
{
    public class VitaminReferenceDataLoader
    {
        private readonly VitamisDbContext _dbContext;

        public VitaminReferenceDataLoader(VitamisDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public void LoadVitaminData()
        {
            var vitamins = new List<Vitamin>
            {
                new() { Name = "A vitamini" },
                new() { Name = "B6 vitamini" },
                new() { Name = "B12 vitamini" },
                new() { Name = "C vitamini"},
                new() { Name = "D vitamini"},
                new() { Name = "E vitamini"},
                new() { Name = "K vitamini"},
                new() { Name = "Folat"},
                new() { Name = "Niasin"},
                new() { Name = "Tiamin"},
                new() { Name = "Riboflavin"},
                new() { Name = "Biotin"},
                new() { Name = "Pantotenik asit"}
            };
            
            _dbContext.Vitamins.AddRange(vitamins);
            _dbContext.SaveChanges();
            
            Console.WriteLine("Finished inserting vitamins. Starting Reference Tables.");
            
            ReferenceVitaminData("Data/LoadData/vitaminReferences.json");
        }
        
        private void ReferenceVitaminData(string jsonFilePath)
        {
            var jsonData = File.ReadAllText(jsonFilePath);
            var vitaminData = JsonSerializer.Deserialize<List<VitaminDataModel>>(jsonData);

            if (vitaminData == null) return;

            // Assuming Vitamin and VitaminReferenceGroup tables are already populated
            // If not, they should be populated here or beforehand

            foreach (var item in vitaminData)
            {
                // Skip the header row in the JSON data
                if (item.AgeAndGender == "Referans değer") continue;

                var group = _dbContext.VitaminReferenceGroups
                    .FirstOrDefault(g => g.GroupName == item.AgeAndGender)
                    ?? new VitaminReferenceGroup { GroupName = item.AgeAndGender };

                Console.WriteLine(group.GroupID);
                if (group.GroupID == 0)
                {
                    _dbContext.VitaminReferenceGroups.Add(group);
                    _dbContext.SaveChanges(); // Save to get GroupID
                }

                // Extract and add vitamin values for each vitamin
                AddVitaminReferenceValues(item, group.GroupID);
            }

            _dbContext.SaveChanges();
        }

        private void AddVitaminReferenceValues(VitaminDataModel item, int groupId)
        {
            var vitamins = _dbContext.Vitamins.ToList();

            foreach (var vitamin in vitamins)
            {
                var (amount, unit) = GetAmountAndUnitForVitamin(item, vitamin.Name);

                var referenceValue = new VitaminReferenceValue
                {
                    GroupID = groupId,
                    VitaminID = vitamin.VitaminID,
                    Amount = amount,
                    Unit = unit
                };

                _dbContext.VitaminReferenceValues.Add(referenceValue);
            }
        }

        private (string amount, string unit) GetAmountAndUnitForVitamin(VitaminDataModel item, string vitaminName)
        {
            // Implement logic to return the correct amount and unit based on the vitamin name
            // Example:
            string default_value = "0";
            switch (vitaminName)
            {
                case "A vitamini":
                    return (item.AVitamin ?? default_value, "mcg");
                case "B6 vitamini":
                    return (item.B6Vitamin ?? default_value, "mg");
                case "B12 vitamini":
                    return (item.B12Vitamin ?? default_value, "mcg");
                case "C vitamini":
                    return (item.CVitamin ?? default_value, "mg");
                case "D vitamini":
                    return (item.DVitamin ?? default_value, "mcg");
                case "E vitamini":
                    return (item.EVitamin ?? default_value, "mg");
                case "K vitamini":
                    return (item.KVitamin ?? default_value, "mcg");
                case "Folat":
                    return (item.Folat ?? default_value, "mcg");
                case "Niasin":
                    return (item.Niasin ?? default_value, "mg/1000kkal");
                case "Tiamin":
                    return (item.Tiamin ?? default_value, "mg/1000kkal");
                case "Riboflavin":
                    return (item.Riboflavin ?? default_value, "mg");
                case "Biotin":
                    return (item.Biotin ?? default_value, "mcg");
                case "Pantotenik asit":
                    return (item.PantotenikAsit ?? default_value, "mg");
                default:
                    return (default_value, "");
            }
        }

        private class VitaminDataModel
        {
            [JsonPropertyName("Yaş (yıl) ve Cinsiyet")]
            public string AgeAndGender { get; set; }

            [JsonPropertyName("A vitamini (mcg)")]
            public string? AVitamin { get; set; }

            [JsonPropertyName("B6 vitamini (mg)")]
            public string? B6Vitamin { get; set; }

            [JsonPropertyName("B12 vitamini (mcg)")]
            public string? B12Vitamin { get; set; }

            [JsonPropertyName("C vitamini (mg)")]
            public string? CVitamin { get; set; }

            [JsonPropertyName("D vitamini (mcg)")]
            public string? DVitamin { get; set; }

            [JsonPropertyName("E vitamini (mg)")]
            public string? EVitamin { get; set; }

            [JsonPropertyName("K vitamini (mcg)")]
            public string? KVitamin { get; set; }

            [JsonPropertyName("Folat (mcg)")]
            public string? Folat { get; set; }

            [JsonPropertyName("Niasin (mg/1000kkal)")]
            public string? Niasin { get; set; }

            [JsonPropertyName("Tiamin (mg)/1000kkal")]
            public string? Tiamin { get; set; }

            [JsonPropertyName("Riboflavin (mg)")]
            public string? Riboflavin { get; set; }

            [JsonPropertyName("Biotin (mcg)")]
            public string? Biotin { get; set; }

            [JsonPropertyName("Pantotenik asit (mg)")]
            public string? PantotenikAsit { get; set; }
        }
    }
}