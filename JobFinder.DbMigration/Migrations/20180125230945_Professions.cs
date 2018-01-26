using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace JobFinder.DbMigration.Migrations
{
    public partial class Professions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProfessionCategory",
                schema: "JobFinder",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfessionCategory", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Profession",
                schema: "JobFinder",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profession", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Profession_ProfessionCategory_CategoryId",
                        column: x => x.CategoryId,
                        principalSchema: "JobFinder",
                        principalTable: "ProfessionCategory",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Profession_CategoryId",
                schema: "JobFinder",
                table: "Profession",
                column: "CategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Profession",
                schema: "JobFinder");

            migrationBuilder.DropTable(
                name: "ProfessionCategory",
                schema: "JobFinder");
        }
    }
}
