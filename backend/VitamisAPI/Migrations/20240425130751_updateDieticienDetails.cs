using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VitamisAPI.Migrations
{
    /// <inheritdoc />
    public partial class updateDieticienDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Users_DietitianUserId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Users_UserId1",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_DietitianUserId",
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

            migrationBuilder.RenameColumn(
                name: "UserId1",
                table: "Users",
                newName: "DietitianDetailsId");

            migrationBuilder.RenameIndex(
                name: "IX_Users_UserId1",
                table: "Users",
                newName: "IX_Users_DietitianDetailsId");

            migrationBuilder.RenameColumn(
                name: "Portion",
                table: "FoodIntakeRecords",
                newName: "Amount");

            migrationBuilder.CreateTable(
                name: "DietitianDetails",
                columns: table => new
                {
                    DietitianDetailsId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DietitianFileName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsConfirmed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DietitianDetails", x => x.DietitianDetailsId);
                    table.ForeignKey(
                        name: "FK_DietitianDetails_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_DietitianDetails_UserId",
                table: "DietitianDetails",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_DietitianDetails_DietitianDetailsId",
                table: "Users",
                column: "DietitianDetailsId",
                principalTable: "DietitianDetails",
                principalColumn: "DietitianDetailsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_DietitianDetails_DietitianDetailsId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "DietitianDetails");

            migrationBuilder.RenameColumn(
                name: "DietitianDetailsId",
                table: "Users",
                newName: "UserId1");

            migrationBuilder.RenameIndex(
                name: "IX_Users_DietitianDetailsId",
                table: "Users",
                newName: "IX_Users_UserId1");

            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "FoodIntakeRecords",
                newName: "Portion");

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

            migrationBuilder.CreateIndex(
                name: "IX_Users_DietitianUserId",
                table: "Users",
                column: "DietitianUserId");

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
    }
}
