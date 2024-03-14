using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VitamisAPI.Migrations
{
    /// <inheritdoc />
    public partial class FoodVitaminAndNutritionalData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Foods",
                columns: table => new
                {
                    FoodID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Category = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Foods", x => x.FoodID);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Nutrients",
                columns: table => new
                {
                    NutrientID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nutrients", x => x.NutrientID);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FoodVitamins",
                columns: table => new
                {
                    FoodVitaminID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FoodID = table.Column<int>(type: "int", nullable: false),
                    VitaminID = table.Column<int>(type: "int", nullable: false),
                    Average = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Unit = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Minimum = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Maximum = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodVitamins", x => x.FoodVitaminID);
                    table.ForeignKey(
                        name: "FK_FoodVitamins_Foods_FoodID",
                        column: x => x.FoodID,
                        principalTable: "Foods",
                        principalColumn: "FoodID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FoodVitamins_Vitamins_VitaminID",
                        column: x => x.VitaminID,
                        principalTable: "Vitamins",
                        principalColumn: "VitaminID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FoodNutritions",
                columns: table => new
                {
                    FoodNutritionID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FoodID = table.Column<int>(type: "int", nullable: false),
                    NutrientID = table.Column<int>(type: "int", nullable: false),
                    Average = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Unit = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Minimum = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Maximum = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodNutritions", x => x.FoodNutritionID);
                    table.ForeignKey(
                        name: "FK_FoodNutritions_Foods_FoodID",
                        column: x => x.FoodID,
                        principalTable: "Foods",
                        principalColumn: "FoodID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FoodNutritions_Nutrients_NutrientID",
                        column: x => x.NutrientID,
                        principalTable: "Nutrients",
                        principalColumn: "NutrientID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_FoodNutritions_FoodID",
                table: "FoodNutritions",
                column: "FoodID");

            migrationBuilder.CreateIndex(
                name: "IX_FoodNutritions_NutrientID",
                table: "FoodNutritions",
                column: "NutrientID");

            migrationBuilder.CreateIndex(
                name: "IX_FoodVitamins_FoodID",
                table: "FoodVitamins",
                column: "FoodID");

            migrationBuilder.CreateIndex(
                name: "IX_FoodVitamins_VitaminID",
                table: "FoodVitamins",
                column: "VitaminID");

            migrationBuilder.CreateIndex(
                name: "IX_Foods_Name",
                table: "Foods",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Nutrients_Name",
                table: "Nutrients",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FoodNutritions");

            migrationBuilder.DropTable(
                name: "FoodVitamins");

            migrationBuilder.DropTable(
                name: "Nutrients");

            migrationBuilder.DropTable(
                name: "Foods");
        }
    }
}
