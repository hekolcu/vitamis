using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VitamisAPI.Migrations
{
    /// <inheritdoc />
    public partial class PendingFoodAndPendingFoodVitamin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PendingFoods",
                columns: table => new
                {
                    PendingFoodId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Category = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PendingFoods", x => x.PendingFoodId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PendingFoodVitamins",
                columns: table => new
                {
                    PendingFoodVitaminID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PendingFoodId = table.Column<int>(type: "int", nullable: false),
                    VitaminId = table.Column<int>(type: "int", nullable: false),
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
                    table.PrimaryKey("PK_PendingFoodVitamins", x => x.PendingFoodVitaminID);
                    table.ForeignKey(
                        name: "FK_PendingFoodVitamins_PendingFoods_PendingFoodId",
                        column: x => x.PendingFoodId,
                        principalTable: "PendingFoods",
                        principalColumn: "PendingFoodId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PendingFoodVitamins_Vitamins_VitaminId",
                        column: x => x.VitaminId,
                        principalTable: "Vitamins",
                        principalColumn: "VitaminID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_PendingFoodVitamins_PendingFoodId",
                table: "PendingFoodVitamins",
                column: "PendingFoodId");

            migrationBuilder.CreateIndex(
                name: "IX_PendingFoodVitamins_VitaminId",
                table: "PendingFoodVitamins",
                column: "VitaminId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PendingFoodVitamins");

            migrationBuilder.DropTable(
                name: "PendingFoods");
        }
    }
}
