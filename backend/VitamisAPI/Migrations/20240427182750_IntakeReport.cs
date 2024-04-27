using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VitamisAPI.Migrations
{
    /// <inheritdoc />
    public partial class IntakeReport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IntakeReportId",
                table: "FoodIntakeRecords",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "IntakeReports",
                columns: table => new
                {
                    IntakeReportId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IntakeReports", x => x.IntakeReportId);
                    table.ForeignKey(
                        name: "FK_IntakeReports_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "IntakeReportFoodIntakeRecords",
                columns: table => new
                {
                    IntakeReportId = table.Column<int>(type: "int", nullable: false),
                    FoodIntakeRecordId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IntakeReportFoodIntakeRecords", x => new { x.IntakeReportId, x.FoodIntakeRecordId });
                    table.ForeignKey(
                        name: "FK_IntakeReportFoodIntakeRecords_FoodIntakeRecords_FoodIntakeRe~",
                        column: x => x.FoodIntakeRecordId,
                        principalTable: "FoodIntakeRecords",
                        principalColumn: "FoodIntakeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_IntakeReportFoodIntakeRecords_IntakeReports_IntakeReportId",
                        column: x => x.IntakeReportId,
                        principalTable: "IntakeReports",
                        principalColumn: "IntakeReportId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_FoodIntakeRecords_IntakeReportId",
                table: "FoodIntakeRecords",
                column: "IntakeReportId");

            migrationBuilder.CreateIndex(
                name: "IX_IntakeReportFoodIntakeRecords_FoodIntakeRecordId",
                table: "IntakeReportFoodIntakeRecords",
                column: "FoodIntakeRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_IntakeReports_UserId",
                table: "IntakeReports",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_FoodIntakeRecords_IntakeReports_IntakeReportId",
                table: "FoodIntakeRecords",
                column: "IntakeReportId",
                principalTable: "IntakeReports",
                principalColumn: "IntakeReportId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FoodIntakeRecords_IntakeReports_IntakeReportId",
                table: "FoodIntakeRecords");

            migrationBuilder.DropTable(
                name: "IntakeReportFoodIntakeRecords");

            migrationBuilder.DropTable(
                name: "IntakeReports");

            migrationBuilder.DropIndex(
                name: "IX_FoodIntakeRecords_IntakeReportId",
                table: "FoodIntakeRecords");

            migrationBuilder.DropColumn(
                name: "IntakeReportId",
                table: "FoodIntakeRecords");
        }
    }
}
