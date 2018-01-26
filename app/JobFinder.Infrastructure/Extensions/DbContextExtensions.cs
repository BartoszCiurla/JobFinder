using System;
using System.Collections.Generic;
using System.Linq;
using JobFinder.Domain.Professions.Entities;
using JobFinder.Domain.Users;
using JobFinder.Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;

namespace JobFinder.Infrastructure.Ef.Extensions
{
  public static class DbContextExtensions
  {
    public static void EnsureSeedData(this JobFinderContext jobFinderContext, IPasswordCryptoService passwordCryptoService)
    {
      SeedUsers(jobFinderContext, passwordCryptoService);
      SeedProfessions(jobFinderContext);
    }

    private static void SeedProfessions(JobFinderContext jobFinderContext)
    {
      var professions = jobFinderContext.Set<Profession>();

      if (!professions.AnyAsync().Result)
      {
        SeedProfession(jobFinderContext, "IT", new string[]{
          "Administrator",
          "Grafik",
          "Konsultant ds. Wdrożeń",
          "Programista",
          "Programista baz danych",
          "Projektant IT"
        });

        SeedProfession(jobFinderContext, "Administracja", new string[]{
          "Administrator danych osobowych",
          "Analityk systemów",
          "Asystentka zarządu",
          "Dyrektor ds.Administracyjnych",
          "Pracownik biurowy",
          "Programista PLC",
          "Specjalista ds. ofertowania"
        });

        SeedProfession(jobFinderContext, "Produkcja", new string[]{
          "Automatyk",
          "Dyrektor ds. Produkcji",
          "Dyrektor ds. Rozwoju",
          "Inżynier ds. Wdrażania Produkcji",
          "Kierownik Magazynu",
          "Konstruktor",
          "Pełnomocnik ds. Jakości",
          "Projektant wzornictwa",
          "Specjalista ds. badań i rozwoju",
          "Specjalista ds. planowania produkcji",
          "Technolog"
        });

        SeedProfession(jobFinderContext, "Turystyka", new string[]{
          "Pilot wycieczek",
          "Specjalista ds. turystyki"
        });

        SeedProfession(jobFinderContext, "Nauka", new string[]{
          "Lektor",
          "Nauczyciel",
          "Pedagog",
          "Trener"
        });
      }

      jobFinderContext.SaveChangesAsync();
    }

    private static async void SeedProfession(JobFinderContext jobFinderContext, string professionCategory, string[] professions)
    {
      var category = ProfessionCategory.Create(Guid.NewGuid(), professionCategory);

      await jobFinderContext.Set<ProfessionCategory>().AddAsync(category);

      List<Profession> items = new List<Profession>();
      foreach (var item in professions)
      {
        items.Add(Profession.Create(Guid.NewGuid(), item, category));
      }

      await jobFinderContext.Set<Profession>().AddRangeAsync(items);
    }

    private static void SeedUsers(JobFinderContext jobFinderContext, IPasswordCryptoService passwordCryptoService)
    {
      var users = jobFinderContext.Set<User>();

      if (!users.AnyAsync(bu => bu.UserType == UserType.Admin).Result)
      {
        SeedUser("Admin", "Admin", "admin@gmail.com", "admin1234", UserType.Admin, passwordCryptoService, jobFinderContext);
      }

      if (!users.AnyAsync(bu => bu.UserType == UserType.Employer).Result)
      {
        SeedUser("Employer", "Employer", "Employer@gmail.com", "Employer1234", UserType.Employer, passwordCryptoService, jobFinderContext);
      }

      if (!users.AnyAsync(bu => bu.UserType == UserType.Employee).Result)
      {
        SeedUser("Employee", "Employee", "Employee@gmail.com", "Employee1234", UserType.Employee, passwordCryptoService, jobFinderContext);
      }

      jobFinderContext.SaveChangesAsync();
    }

    private static async void SeedUser(string name,
                               string surname,
                               string email,
                               string password,
                               UserType userType,
                               IPasswordCryptoService passwordCryptoService,
                               JobFinderContext jobFinderContext)
    {
      var salt = passwordCryptoService.GenerateSalt();
      var passwordHash = passwordCryptoService.HashPassword(password, salt);
      var user = User.Create(Guid.NewGuid(), name, surname, email, passwordHash, salt, userType);
      await jobFinderContext.Set<User>().AddAsync(user);
    }
  }
}
