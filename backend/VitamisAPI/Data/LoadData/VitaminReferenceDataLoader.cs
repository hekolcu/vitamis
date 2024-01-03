using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Text.Json.Serialization;
using VitamisAPI.Data;

namespace VitamisAPI.Data.LoadData
{
    public static class VitaminReferenceDataLoader
    {
        public static void LoadVitaminData(VitamisDbContext dbContext, string jsonFilePath)
        {
            var vitamins = new List<Vitamin>
            {
                new Vitamin { Name = "A vitamini" },
                new Vitamin { Name = "B6 vitamini" },
                
            };

            dbContext.Vitamins.AddRange(vitamins);
            dbContext.SaveChanges();
        }
    }

    public class VitaminJsonModel
    {
        [JsonPropertyName("Ya\u015f (y\u0131l) ve Cinsiyet")]
        public string AgeAndGender { get; set; }

        [JsonPropertyName("A vitamini1 (mcg)")]
        public double AVitamin1 { get; set; }

        [JsonPropertyName("B6 vitamini (mg)")]
        public double B6Vitamin { get; set; }

        [JsonPropertyName("B12 vitamini (mcg)")]
        public double B12Vitamin { get; set; }

        [JsonPropertyName("C vitamini (mg)")]
        public double CVitamin { get; set; }

        [JsonPropertyName("D vitamini2 (mcg)")]
        public double DVitamin2 { get; set; }

        [JsonPropertyName("E vitamini3 (mg)")]
        public double EVitamin3 { get; set; }

        [JsonPropertyName("K vitamini (mcg)")]
        public double KVitamin { get; set; }

        [JsonPropertyName("Folat4 (mcg)")]
        public double Folat4 { get; set; }

        [JsonPropertyName("Niasin5 (mg/1000kkal)")]
        public double Niasin5 { get; set; }

        [JsonPropertyName("Tiamin (mg)/1000kkal")]
        public double Tiamin { get; set; }

        [JsonPropertyName("Riboflavin (mg)")]
        public double Riboflavin { get; set; }

        [JsonPropertyName("Biotin (mcg)")]
        public double Biotin { get; set; }

        [JsonPropertyName("Pantotenik asit (mg)")]
        public double PantotenikAsit { get; set; }
    }
}
