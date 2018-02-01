using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace JobFinder.DbMigration.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "JobFinder");

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
                name: "ProposedLanguage",
                schema: "JobFinder",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProposedLanguage", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                schema: "JobFinder",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastLoginDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Salt = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
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

            migrationBuilder.CreateTable(
                name: "JobApplication",
                schema: "JobFinder",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProfessionId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobApplication", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobApplication_Profession_ProfessionId",
                        column: x => x.ProfessionId,
                        principalSchema: "JobFinder",
                        principalTable: "Profession",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_JobApplication_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "JobFinder",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Offer",
                schema: "JobFinder",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProfessionId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Offer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Offer_Profession_ProfessionId",
                        column: x => x.ProfessionId,
                        principalSchema: "JobFinder",
                        principalTable: "Profession",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Offer_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "JobFinder",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProposedSkill",
                schema: "JobFinder",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProfessionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProposedSkill", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProposedSkill_Profession_ProfessionId",
                        column: x => x.ProfessionId,
                        principalSchema: "JobFinder",
                        principalTable: "Profession",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobApplicationLanguage",
                schema: "JobFinder",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    JobApplicationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LanguageId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Level = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobApplicationLanguage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobApplicationLanguage_JobApplication_JobApplicationId",
                        column: x => x.JobApplicationId,
                        principalSchema: "JobFinder",
                        principalTable: "JobApplication",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobApplicationLanguage_ProposedLanguage_LanguageId",
                        column: x => x.LanguageId,
                        principalSchema: "JobFinder",
                        principalTable: "ProposedLanguage",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "JobApplicationSkill",
                schema: "JobFinder",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    JobApplicationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    SkillId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobApplicationSkill", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobApplicationSkill_JobApplication_JobApplicationId",
                        column: x => x.JobApplicationId,
                        principalSchema: "JobFinder",
                        principalTable: "JobApplication",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobApplicationSkill_ProposedSkill_SkillId",
                        column: x => x.SkillId,
                        principalSchema: "JobFinder",
                        principalTable: "ProposedSkill",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_JobApplication_ProfessionId",
                schema: "JobFinder",
                table: "JobApplication",
                column: "ProfessionId");

            migrationBuilder.CreateIndex(
                name: "IX_JobApplication_UserId",
                schema: "JobFinder",
                table: "JobApplication",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_JobApplicationLanguage_JobApplicationId",
                schema: "JobFinder",
                table: "JobApplicationLanguage",
                column: "JobApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_JobApplicationLanguage_LanguageId",
                schema: "JobFinder",
                table: "JobApplicationLanguage",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_JobApplicationSkill_JobApplicationId",
                schema: "JobFinder",
                table: "JobApplicationSkill",
                column: "JobApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_JobApplicationSkill_SkillId",
                schema: "JobFinder",
                table: "JobApplicationSkill",
                column: "SkillId");

            migrationBuilder.CreateIndex(
                name: "IX_Offer_ProfessionId",
                schema: "JobFinder",
                table: "Offer",
                column: "ProfessionId");

            migrationBuilder.CreateIndex(
                name: "IX_Offer_UserId",
                schema: "JobFinder",
                table: "Offer",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Profession_CategoryId",
                schema: "JobFinder",
                table: "Profession",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ProposedSkill_ProfessionId",
                schema: "JobFinder",
                table: "ProposedSkill",
                column: "ProfessionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobApplicationLanguage",
                schema: "JobFinder");

            migrationBuilder.DropTable(
                name: "JobApplicationSkill",
                schema: "JobFinder");

            migrationBuilder.DropTable(
                name: "Offer",
                schema: "JobFinder");

            migrationBuilder.DropTable(
                name: "ProposedLanguage",
                schema: "JobFinder");

            migrationBuilder.DropTable(
                name: "JobApplication",
                schema: "JobFinder");

            migrationBuilder.DropTable(
                name: "ProposedSkill",
                schema: "JobFinder");

            migrationBuilder.DropTable(
                name: "User",
                schema: "JobFinder");

            migrationBuilder.DropTable(
                name: "Profession",
                schema: "JobFinder");

            migrationBuilder.DropTable(
                name: "ProfessionCategory",
                schema: "JobFinder");
        }
    }
}
