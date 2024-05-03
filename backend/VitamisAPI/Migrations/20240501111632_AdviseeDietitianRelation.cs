using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VitamisAPI.Migrations
{
    /// <inheritdoc />
    public partial class AdviseeDietitianRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdviseeDietitianRelations",
                columns: table => new
                {
                    AdviseeId = table.Column<int>(type: "int", nullable: false),
                    DietitianId = table.Column<int>(type: "int", nullable: false),
                    AdviseeDietitianRelationId = table.Column<int>(type: "int", nullable: false),
                    IsAccepted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    TimeStamp = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdviseeDietitianRelations", x => new { x.AdviseeId, x.DietitianId });
                    table.ForeignKey(
                        name: "FK_AdviseeDietitianRelations_Users_AdviseeId",
                        column: x => x.AdviseeId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AdviseeDietitianRelations_Users_DietitianId",
                        column: x => x.DietitianId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_AdviseeDietitianRelations_DietitianId",
                table: "AdviseeDietitianRelations",
                column: "DietitianId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdviseeDietitianRelations");
        }
    }
}
