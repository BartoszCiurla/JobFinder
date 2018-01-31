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
        SeedProfessionHappyPath(jobFinderContext);
        // SeedProfession(jobFinderContext, "IT", new string[]
        // {
        //   "Administrator",
        //   "Grafik",
        //   "Konsultant ds. Wdrożeń",
        //   "Programista",
        //   "Programista baz danych",
        //   "Projektant IT"
        // });
        SeedProfession(jobFinderContext, "Administracja", new string[]
        {
          "Administrator danych osobowych",
          "Analityk systemów",
          "Asystentka zarządu",
          "Dyrektor ds.Administracyjnych",
          "Pracownik biurowy",
          "Programista PLC",
          "Specjalista ds. ofertowania"
        });
        SeedProfession(jobFinderContext, "Produkcja", new string[]
        {
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
        SeedProfession(jobFinderContext, "Turystyka", new string[]
        {
          "Pilot wycieczek",
          "Specjalista ds. turystyki"
        });
        SeedProfession(jobFinderContext, "Nauka", new string[]
        {
          "Lektor",
          "Nauczyciel",
          "Pedagog",
          "Trener"
        });
      }
      jobFinderContext.SaveChangesAsync();
    }

    private static async void SeedProfessionHappyPath(JobFinderContext jobFinderContext)
    {
      string professionCategory = "IT";
      Dictionary<string, string[]> professionNames = new Dictionary<string, string[]>(){
        {"Administrator", new string[]{
          "znajomość zagadnień związanych z administracją określonymi zasobami informatycznymi (fizyczne sieci internetowe, serwery, systemy informatyczne)",
          "ogólna wiedza na temat standardów informatycznych",
          "znajomość języków programowania",
          "znajomość narzędzi administracyjnych (panele administracyjne serwerów, programów do zarządzani ruchem w sieci, konta administracyjne systemów)"
        }},
        {
          "Grafik",new string[]{
            "doskonała znajomość środowisk i programów graficznych do obróbki (Corel, Photoshop, Gimp)",
            "znajomość Flash i Action Script",
            "wiedza z zakresu tworzenia wizualizacji (grafika 3D)",
            "umiejętność przygotowywania grafiki na potrzeby różnych form wykorzystania (grafika WWW, DTP)",
            "zdolności artystyczne",
            "znajomość zagadnień związanych z prawami autorskimi",
            "znajomość formalnych aspektów dotyczących np. projektowania znaku graficznego (Księga Znaku)"
          }
        },
        {
          "Konsultant ds. Wdrożeń", new string[]{
            "znajomość zagadnień związanych z administracją określonymi zasobami informatycznymi (fizyczne sieci internetowe, serwery, systemy informatyczne)",
            "ogólna wiedza na temat standardów informatycznych",
            "znajomość języków programowania",
            "znajomość narzędzi administracyjnych (panele administracyjne serwerów, programów do zarządzani ruchem w sieci, konta administracyjne systemów)",
          }
        },
        {
          "Programista",new string[]{
            "znajomość języków programowania (np. Java, PHP, C/C++/C#, Python, Perl)",
            "znajomość standardów oraz środowisk programistycznych",
            "wiedza z zakresu inżynierii oprogramowania",
            "znajomość zagadnień takich jak bazy danych i systemy operacyjne",
            "metodyka prowadzenia projektów informatycznych"
          }
        },
        {
          "Programista baz danych",new string[]{
            "znajomość baz danych (MySQL, PostgreSQL, Oracle, Access, Microsoft SQL Serwer)",
            "znajomość zagadnień związanych z relacyjnością, obiektowością, operacyjnością",
            "znajomość języka programowania baz danych (SQL)",
            "wiedza z zakresu inżynierii oprogramowania",
            "znajomość zagadnień związanych z administrowaniem serwerami baz danych",
            "znajomość zagadnień związanych z bezpieczeństwem informacji"
          }
        },
        {
          "Projektant IT", new string[]{
            "znajomość architektury systemów, metod projektowania systemów informatycznych",
            "umiejętność opracowywania projektów i modeli rozwiązań informatycznych",
            "znajomość oprogramowania wspierającego (prototypowanie)",
            "znajomość UML oraz programów UML (np. MS Visio)",
            "znajomość wzorców projektowych",
            "znajomość języków programowania, znajomość standardów oraz środowisk programistycznych",
            "wiedza z zakresu inżynierii oprogramowania",
            "znajomość zagadnień takich jak bazy danych i systemy operacyjne",
            "metodyka prowadzenia projektów informatycznych"
          }
        }
      };

      var category = ProfessionCategory.Create(Guid.NewGuid(), professionCategory);
      await jobFinderContext.Set<ProfessionCategory>().AddAsync(category);

      List<Profession> items = new List<Profession>();
      foreach (var item in professionNames)
      {
        var professionId = Guid.NewGuid();
        var proposedSkills = item.Value.Select(x => ProposedSkill.Create(Guid.NewGuid(), professionId, x));
        items.Add(Profession.Create(professionId, item.Key, category, proposedSkills.ToList()));
      }
      await jobFinderContext.Set<Profession>().AddRangeAsync(items);

    }
    private static async void SeedProfession(JobFinderContext jobFinderContext, string professionCategory, string[] professions)
    {
      var category = ProfessionCategory.Create(Guid.NewGuid(), professionCategory);
      await jobFinderContext.Set<ProfessionCategory>().AddAsync(category);

      var items = professions.Select(x => Profession.Create(Guid.NewGuid(), x, category, new List<ProposedSkill>()));
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
