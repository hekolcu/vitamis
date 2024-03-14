using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VitamisAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedUserWithPersonalDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Username",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "Disease",
                table: "Users",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Fullname",
                table: "Users",
                type: "varchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<double>(
                name: "Height",
                table: "Users",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<bool>(
                name: "Smoking",
                table: "Users",
                type: "tinyint(1)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SunExposure",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Weight",
                table: "Users",
                type: "double",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Disease",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Fullname",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Height",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Smoking",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SunExposure",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Users",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
