using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VitamisAPI.Migrations
{
    /// <inheritdoc />
    public partial class FixIntakeReport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FoodIntakeRecords_IntakeReports_IntakeReportId",
                table: "FoodIntakeRecords");

            migrationBuilder.DropIndex(
                name: "IX_FoodIntakeRecords_IntakeReportId",
                table: "FoodIntakeRecords");

            migrationBuilder.DropColumn(
                name: "IntakeReportId",
                table: "FoodIntakeRecords");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IntakeReportId",
                table: "FoodIntakeRecords",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FoodIntakeRecords_IntakeReportId",
                table: "FoodIntakeRecords",
                column: "IntakeReportId");

            migrationBuilder.AddForeignKey(
                name: "FK_FoodIntakeRecords_IntakeReports_IntakeReportId",
                table: "FoodIntakeRecords",
                column: "IntakeReportId",
                principalTable: "IntakeReports",
                principalColumn: "IntakeReportId");
        }
    }
}
