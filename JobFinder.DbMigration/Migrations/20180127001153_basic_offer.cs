using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace JobFinder.DbMigration.Migrations
{
    public partial class basic_offer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Offer",
                schema: "JobFinder",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProfessionCategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ProfessionId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Offer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Offer_ProfessionCategory_ProfessionCategoryId",
                        column: x => x.ProfessionCategoryId,
                        principalSchema: "JobFinder",
                        principalTable: "ProfessionCategory",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Offer_Profession_ProfessionId",
                        column: x => x.ProfessionId,
                        principalSchema: "JobFinder",
                        principalTable: "Profession",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Offer_ProfessionCategoryId",
                schema: "JobFinder",
                table: "Offer",
                column: "ProfessionCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Offer_ProfessionId",
                schema: "JobFinder",
                table: "Offer",
                column: "ProfessionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Offer",
                schema: "JobFinder");
        }
    }
}
