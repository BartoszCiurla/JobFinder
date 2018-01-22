﻿using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace JobFinder.DbMigration.Migrations
{
    public partial class Init : Migration
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
                name: "JobFinderUser",
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
                    table.PrimaryKey("PK_JobFinderUser", x => x.Id);
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
                name: "JobFinderUser",
                schema: "JobFinder");

            migrationBuilder.DropTable(
                name: "CV",
                schema: "JobFinder");
        }
    }
}
