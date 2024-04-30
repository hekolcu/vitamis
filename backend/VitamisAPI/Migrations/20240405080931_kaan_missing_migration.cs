using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VitamisAPI.Migrations
{
    /// <inheritdoc />
    public partial class kaan_missing_migration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DietitianFileName",
                table: "Users",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "DietitianUserId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Users",
                type: "varchar(13)",
                maxLength: 13,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<bool>(
                name: "IsUploaded",
                table: "Users",
                type: "tinyint(1)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "FoodIntakeRecords",
                columns: table => new
                {
                    FoodIntakeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    FoodId = table.Column<int>(type: "int", nullable: false),
                    Portion = table.Column<double>(type: "double", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodIntakeRecords", x => x.FoodIntakeId);
                    table.ForeignKey(
                        name: "FK_FoodIntakeRecords_Foods_FoodId",
                        column: x => x.FoodId,
                        principalTable: "Foods",
                        principalColumn: "FoodID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FoodIntakeRecords_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Users_DietitianUserId",
                table: "Users",
                column: "DietitianUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserId1",
                table: "Users",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_FoodIntakeRecords_FoodId",
                table: "FoodIntakeRecords",
                column: "FoodId");

            migrationBuilder.CreateIndex(
                name: "IX_FoodIntakeRecords_UserId",
                table: "FoodIntakeRecords",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Users_DietitianUserId",
                table: "Users",
                column: "DietitianUserId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Users_UserId1",
                table: "Users",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Users_DietitianUserId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Users_UserId1",
                table: "Users");

            migrationBuilder.DropTable(
                name: "FoodIntakeRecords");

            migrationBuilder.DropIndex(
                name: "IX_Users_DietitianUserId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_UserId1",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DietitianFileName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DietitianUserId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsUploaded",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Users");
        }
    }
}
