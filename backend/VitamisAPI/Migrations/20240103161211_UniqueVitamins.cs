using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VitamisAPI.Migrations
{
    /// <inheritdoc />
    public partial class UniqueVitamins : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Vitamins_Name",
                table: "Vitamins",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Vitamins_Name",
                table: "Vitamins");
        }
    }
}
