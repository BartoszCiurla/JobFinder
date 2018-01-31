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
                name: "CV",
                schema: "JobFinder",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AboutYou = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RoleTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CV", x => x.Id);
                });

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
                name: "CVCertificate",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CVId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CertificateName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FinishDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CVCertificate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CVCertificate_CV_CVId",
                        column: x => x.CVId,
                        principalSchema: "JobFinder",
                        principalTable: "CV",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CVEducation",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CVId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FinishDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SchoolName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CVEducation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CVEducation_CV_CVId",
                        column: x => x.CVId,
                        principalSchema: "JobFinder",
                        principalTable: "CV",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CVExperience",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CVId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Company = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FinishDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CVExperience", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CVExperience_CV_CVId",
                        column: x => x.CVId,
                        principalSchema: "JobFinder",
                        principalTable: "CV",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CVSkill",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CVId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Skill = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SkillLevel = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CVSkill", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CVSkill_CV_CVId",
                        column: x => x.CVId,
                        principalSchema: "JobFinder",
                        principalTable: "CV",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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

            migrationBuilder.CreateIndex(
                name: "IX_CVCertificate_CVId",
                table: "CVCertificate",
                column: "CVId");

            migrationBuilder.CreateIndex(
                name: "IX_CVEducation_CVId",
                table: "CVEducation",
                column: "CVId");

            migrationBuilder.CreateIndex(
                name: "IX_CVExperience_CVId",
                table: "CVExperience",
                column: "CVId");

            migrationBuilder.CreateIndex(
                name: "IX_CVSkill_CVId",
                table: "CVSkill",
                column: "CVId");

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
                name: "CVCertificate");

            migrationBuilder.DropTable(
                name: "CVEducation");

            migrationBuilder.DropTable(
                name: "CVExperience");

            migrationBuilder.DropTable(
                name: "CVSkill");

            migrationBuilder.DropTable(
                name: "JobApplication",
                schema: "JobFinder");

            migrationBuilder.DropTable(
                name: "Offer",
                schema: "JobFinder");

            migrationBuilder.DropTable(
                name: "ProposedSkill",
                schema: "JobFinder");

            migrationBuilder.DropTable(
                name: "CV",
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
