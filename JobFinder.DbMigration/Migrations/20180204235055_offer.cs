using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace JobFinder.DbMigration.Migrations
{
    public partial class offer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "CertificatesWillBeAnAdvantage",
                schema: "JobFinder",
                table: "Offer",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "OfferLanguage",
                schema: "JobFinder",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LanguageId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Level = table.Column<int>(type: "int", nullable: false),
                    OfferId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OfferLanguage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OfferLanguage_ProposedLanguage_LanguageId",
                        column: x => x.LanguageId,
                        principalSchema: "JobFinder",
                        principalTable: "ProposedLanguage",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OfferLanguage_Offer_OfferId",
                        column: x => x.OfferId,
                        principalSchema: "JobFinder",
                        principalTable: "Offer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OfferRequiredSkill",
                schema: "JobFinder",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    OfferId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SkillId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OfferRequiredSkill", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OfferRequiredSkill_Offer_OfferId",
                        column: x => x.OfferId,
                        principalSchema: "JobFinder",
                        principalTable: "Offer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OfferRequiredSkill_ProposedSkill_SkillId",
                        column: x => x.SkillId,
                        principalSchema: "JobFinder",
                        principalTable: "ProposedSkill",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OfferWelcomeSkill",
                schema: "JobFinder",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    OfferId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SkillId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OfferWelcomeSkill", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OfferWelcomeSkill_Offer_OfferId",
                        column: x => x.OfferId,
                        principalSchema: "JobFinder",
                        principalTable: "Offer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OfferWelcomeSkill_ProposedSkill_SkillId",
                        column: x => x.SkillId,
                        principalSchema: "JobFinder",
                        principalTable: "ProposedSkill",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OfferLanguage_LanguageId",
                schema: "JobFinder",
                table: "OfferLanguage",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_OfferLanguage_OfferId",
                schema: "JobFinder",
                table: "OfferLanguage",
                column: "OfferId");

            migrationBuilder.CreateIndex(
                name: "IX_OfferRequiredSkill_OfferId",
                schema: "JobFinder",
                table: "OfferRequiredSkill",
                column: "OfferId");

            migrationBuilder.CreateIndex(
                name: "IX_OfferRequiredSkill_SkillId",
                schema: "JobFinder",
                table: "OfferRequiredSkill",
                column: "SkillId");

            migrationBuilder.CreateIndex(
                name: "IX_OfferWelcomeSkill_OfferId",
                schema: "JobFinder",
                table: "OfferWelcomeSkill",
                column: "OfferId");

            migrationBuilder.CreateIndex(
                name: "IX_OfferWelcomeSkill_SkillId",
                schema: "JobFinder",
                table: "OfferWelcomeSkill",
                column: "SkillId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OfferLanguage",
                schema: "JobFinder");

            migrationBuilder.DropTable(
                name: "OfferRequiredSkill",
                schema: "JobFinder");

            migrationBuilder.DropTable(
                name: "OfferWelcomeSkill",
                schema: "JobFinder");

            migrationBuilder.DropColumn(
                name: "CertificatesWillBeAnAdvantage",
                schema: "JobFinder",
                table: "Offer");
        }
    }
}
