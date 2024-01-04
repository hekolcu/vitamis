using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VitamisAPI.Migrations
{
    /// <inheritdoc />
    public partial class VitaminReferenceTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VitaminReferenceGroups",
                columns: table => new
                {
                    GroupID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    GroupName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VitaminReferenceGroups", x => x.GroupID);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Vitamins",
                columns: table => new
                {
                    VitaminID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vitamins", x => x.VitaminID);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "VitaminReferenceValues",
                columns: table => new
                {
                    ValueID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    VitaminID = table.Column<int>(type: "int", nullable: false),
                    GroupID = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<double>(type: "double", nullable: false),
                    Unit = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VitaminReferenceValues", x => x.ValueID);
                    table.ForeignKey(
                        name: "FK_VitaminReferenceValues_VitaminReferenceGroups_GroupID",
                        column: x => x.GroupID,
                        principalTable: "VitaminReferenceGroups",
                        principalColumn: "GroupID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VitaminReferenceValues_Vitamins_VitaminID",
                        column: x => x.VitaminID,
                        principalTable: "Vitamins",
                        principalColumn: "VitaminID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_VitaminReferenceValues_GroupID",
                table: "VitaminReferenceValues",
                column: "GroupID");

            migrationBuilder.CreateIndex(
                name: "IX_VitaminReferenceValues_VitaminID",
                table: "VitaminReferenceValues",
                column: "VitaminID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VitaminReferenceValues");

            migrationBuilder.DropTable(
                name: "VitaminReferenceGroups");

            migrationBuilder.DropTable(
                name: "Vitamins");
        }
    }
}
