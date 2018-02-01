﻿// <auto-generated />
using JobFinder.Domain.Users;
using JobFinder.Infrastructure.Ef;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace JobFinder.DbMigration.Migrations
{
    [DbContext(typeof(JobFinderContext))]
    partial class JobFinderContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.0-rtm-26452")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("JobFinder.Domain.Applications.Entities.JobApplication", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("ProfessionId");

                    b.Property<Guid?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("ProfessionId");

                    b.HasIndex("UserId");

                    b.ToTable("JobApplication","JobFinder");
                });

            modelBuilder.Entity("JobFinder.Domain.JobApplications.Entities.JobApplicationLanguage", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("JobApplicationId");

                    b.Property<Guid?>("LanguageId");

                    b.Property<int>("Level");

                    b.HasKey("Id");

                    b.HasIndex("JobApplicationId");

                    b.HasIndex("LanguageId");

                    b.ToTable("JobApplicationLanguage","JobFinder");
                });

            modelBuilder.Entity("JobFinder.Domain.JobApplications.Entities.JobApplicationSkill", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("JobApplicationId");

                    b.Property<int>("Level");

                    b.Property<Guid?>("SkillId");

                    b.HasKey("Id");

                    b.HasIndex("JobApplicationId");

                    b.HasIndex("SkillId");

                    b.ToTable("JobApplicationSkill","JobFinder");
                });

            modelBuilder.Entity("JobFinder.Domain.Languages.Entities.ProposedLanguage", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("ProposedLanguage","JobFinder");
                });

            modelBuilder.Entity("JobFinder.Domain.Offers.Entities.Offer", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("ProfessionId");

                    b.Property<Guid?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("ProfessionId");

                    b.HasIndex("UserId");

                    b.ToTable("Offer","JobFinder");
                });

            modelBuilder.Entity("JobFinder.Domain.Professions.Entities.Profession", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("CategoryId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Profession","JobFinder");
                });

            modelBuilder.Entity("JobFinder.Domain.Professions.Entities.ProfessionCategory", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("ProfessionCategory","JobFinder");
                });

            modelBuilder.Entity("JobFinder.Domain.Professions.Entities.ProposedSkill", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<Guid>("ProfessionId");

                    b.HasKey("Id");

                    b.HasIndex("ProfessionId");

                    b.ToTable("ProposedSkill","JobFinder");
                });

            modelBuilder.Entity("JobFinder.Domain.Users.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<string>("Email");

                    b.Property<DateTime>("LastLoginDate");

                    b.Property<string>("Name");

                    b.Property<string>("Password");

                    b.Property<string>("Salt");

                    b.Property<string>("Surname");

                    b.Property<int>("UserType");

                    b.HasKey("Id");

                    b.ToTable("User","JobFinder");
                });

            modelBuilder.Entity("JobFinder.Domain.Applications.Entities.JobApplication", b =>
                {
                    b.HasOne("JobFinder.Domain.Professions.Entities.Profession", "Profession")
                        .WithMany()
                        .HasForeignKey("ProfessionId");

                    b.HasOne("JobFinder.Domain.Users.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("JobFinder.Domain.JobApplications.Entities.JobApplicationLanguage", b =>
                {
                    b.HasOne("JobFinder.Domain.Applications.Entities.JobApplication")
                        .WithMany("Languages")
                        .HasForeignKey("JobApplicationId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("JobFinder.Domain.Languages.Entities.ProposedLanguage", "Language")
                        .WithMany()
                        .HasForeignKey("LanguageId");
                });

            modelBuilder.Entity("JobFinder.Domain.JobApplications.Entities.JobApplicationSkill", b =>
                {
                    b.HasOne("JobFinder.Domain.Applications.Entities.JobApplication")
                        .WithMany("Skills")
                        .HasForeignKey("JobApplicationId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("JobFinder.Domain.Professions.Entities.ProposedSkill", "Skill")
                        .WithMany()
                        .HasForeignKey("SkillId");
                });

            modelBuilder.Entity("JobFinder.Domain.Offers.Entities.Offer", b =>
                {
                    b.HasOne("JobFinder.Domain.Professions.Entities.Profession", "Profession")
                        .WithMany()
                        .HasForeignKey("ProfessionId");

                    b.HasOne("JobFinder.Domain.Users.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("JobFinder.Domain.Professions.Entities.Profession", b =>
                {
                    b.HasOne("JobFinder.Domain.Professions.Entities.ProfessionCategory", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");
                });

            modelBuilder.Entity("JobFinder.Domain.Professions.Entities.ProposedSkill", b =>
                {
                    b.HasOne("JobFinder.Domain.Professions.Entities.Profession")
                        .WithMany("ProposedSkills")
                        .HasForeignKey("ProfessionId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
