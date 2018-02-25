using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace JobFinder.DbMigration.Migrations
{
    public partial class salary : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Salary",
                schema: "JobFinder",
                table: "Offer",
                type: "decimal(18, 2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Salary",
                schema: "JobFinder",
                table: "JobApplication",
                type: "decimal(18, 2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Salary",
                schema: "JobFinder",
                table: "Offer");

            migrationBuilder.DropColumn(
                name: "Salary",
                schema: "JobFinder",
                table: "JobApplication");
        }
    }
}
