using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text;

namespace VitamisAPI.Data.LoadData
{
    public class FoodVitaminAndNutritionalDataLoader
    {
        private readonly VitamisDbContext _dbContext;
        
        public FoodVitaminAndNutritionalDataLoader(VitamisDbContext dbContext)
        {
            _dbContext = dbContext;
            // _dbContext.FoodNutritions.RemoveRange(_dbContext.FoodNutritions);
            // _dbContext.SaveChanges();
            
            // _dbContext.FoodVitamins.RemoveRange(_dbContext.FoodVitamins);
            // _dbContext.SaveChanges();
            
            // _dbContext.Foods.RemoveRange(_dbContext.Foods);
            // _dbContext.SaveChanges();
        }

        public void LoadFoodData()
        {
            PrepareFoodVitaminData("Data/LoadData/food_vitamin_values_modified.json");
            PrepareFoodNutritionalData("Data/LoadData/food_nutritional_values_modified.json");
        }
        
        private void PrepareFoodVitaminData(string jsonFilePath)
        {
            var jsonData = File.ReadAllText(jsonFilePath, Encoding.UTF8); // UTF8 for Turkish characters
            var foodVitamins = JsonSerializer.Deserialize<List<FoodVitaminDataModel>>(jsonData);

            if (foodVitamins == null) return;

            foreach (var item in foodVitamins)
            {
                if (item.Average == null) 
                {
                    continue;
                }
                
                var food = _dbContext.Foods.FirstOrDefault(f => f.Name == item.FoodName && f.Category == item.FoodGroup);
                if (food == null)
                {
                    food = new Food { Name = item.FoodName, Category = item.FoodGroup };
                    _dbContext.Foods.Add(food);
                    _dbContext.SaveChanges(); // Save to get FoodID immediately
                }
        
                // Check if vitamin exists
                var vitamin = _dbContext.Vitamins.FirstOrDefault(v => v.Name == item.Vitamin);
                if (vitamin == null)
                {
                    vitamin = new Vitamin { Name = item.Vitamin };
                    _dbContext.Vitamins.Add(vitamin);
                    _dbContext.SaveChanges(); // Save to get VitaminID immediately
                }
        
                // Add association if it doesn't exist
                if (!_dbContext.FoodVitamins.Any(fv => fv.FoodID == food.FoodID && fv.VitaminID == vitamin.VitaminID))
                {
                    _dbContext.FoodVitamins.Add(new FoodVitamin
                    {
                        Food = food,
                        Vitamin = vitamin,
                        Average = item.Average,
                        Minimum = item.Minimum,
                        Maximum = item.Maximum,
                        Unit = item.Unit
                    });
                }
            }

            _dbContext.SaveChanges();
        }

        private void PrepareFoodNutritionalData(string jsonFilePath)
        {
            var jsonData = File.ReadAllText(jsonFilePath, Encoding.UTF8); // UTF8 for Turkish characters
            var foodVitamins = JsonSerializer.Deserialize<List<FoodNutritionalDataModel>>(jsonData);

            if (foodVitamins == null) return;

            foreach (var item in foodVitamins)
            {
                if (item.Average == null) 
                {
                    continue;
                }
                
                var food = _dbContext.Foods.FirstOrDefault(f => f.Name == item.FoodName && f.Category == item.FoodGroup);
                if (food == null)
                {
                    food = new Food { Name = item.FoodName, Category = item.FoodGroup };
                    _dbContext.Foods.Add(food);
                    _dbContext.SaveChanges(); // Save to get FoodID immediately
                }
        
                // Check if vitamin exists
                var nutrient = _dbContext.Nutrients.FirstOrDefault(v => v.Name == item.Nutrient);
                if (nutrient == null)
                {
                    nutrient = new Nutrient { Name = item.Nutrient };
                    _dbContext.Nutrients.Add(nutrient);
                    _dbContext.SaveChanges(); // Save to get VitaminID immediately
                }
        
                // Add association if it doesn't exist
                if (!_dbContext.FoodNutritions.Any(fn => fn.FoodID == food.FoodID && fn.NutrientID == nutrient.NutrientID))
                {
                    _dbContext.FoodNutritions.Add(new FoodNutrition
                    {
                        Food = food,
                        Nutrient = nutrient,
                        Average = item.Average,
                        Minimum = item.Minimum,
                        Maximum = item.Maximum,
                        Unit = item.Unit
                    });
                }
            }

            _dbContext.SaveChanges();
        }

        public class FoodVitaminDataModel
        {
            [JsonPropertyName("gida")]
            public string FoodName { get; set; }
    
            [JsonPropertyName("grup")]
            public string FoodGroup { get; set; }
    
            [JsonPropertyName("bilesen")]
            public string Vitamin { get; set; } 
    
            [JsonPropertyName("birim")]
            public string? Unit { get; set; }
    
            [JsonPropertyName("ortalama")]
            public string? Average { get; set; }
    
            [JsonPropertyName("minimum")]
            public string? Minimum { get; set; }
    
            [JsonPropertyName("maksimin")]
            public string? Maximum { get; set; }
        }
        
        private class FoodNutritionalDataModel()
        {
            [JsonPropertyName("gida")]
            public string FoodName { get; set; }
    
            [JsonPropertyName("grup")]
            public string FoodGroup { get; set; }
    
            [JsonPropertyName("bilesen")]
            public string Nutrient { get; set; } 
    
            [JsonPropertyName("birim")]
            public string? Unit { get; set; }
    
            [JsonPropertyName("ortalama")]
            public string? Average { get; set; }
    
            [JsonPropertyName("minimum")]
            public string? Minimum { get; set; }
    
            [JsonPropertyName("maksimin")]
            public string? Maximum { get; set; }
        }
    }
}