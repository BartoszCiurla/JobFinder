using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace JobFinder.DbMigration.Migrations
{
    public partial class change_language_column_name : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                schema: "JobFinder",
                table: "ProposedLanguage");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                schema: "JobFinder",
                table: "ProposedLanguage",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                schema: "JobFinder",
                table: "ProposedLanguage");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                schema: "JobFinder",
                table: "ProposedLanguage",
                nullable: true);
        }
    }
}
