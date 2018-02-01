using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobFinder.Domain.Languages.Entities;
using JobFinder.Domain.Professions.Entities;
using JobFinder.Domain.Users;
using JobFinder.Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;
namespace JobFinder.Infrastructure.Ef.Extensions
{
  public static class DbContextExtensions
  {
    public static async void EnsureSeedData(this JobFinderContext jobFinderContext, IPasswordCryptoService passwordCryptoService)
    {
      var professionDbSet = jobFinderContext.Set<Profession>();
      var professionCategoryDbSet = jobFinderContext.Set<ProfessionCategory>();
      var userDbSet = jobFinderContext.Set<User>();
      var languageDbSet = jobFinderContext.Set<ProposedLanguage>();
      await SeedLanguages(languageDbSet);
      await SeedUsers(userDbSet, passwordCryptoService);
      await SeedProfessions(professionDbSet, professionCategoryDbSet);
      await jobFinderContext.SaveChangesAsync();
    }
    private static async Task SeedProfessions(DbSet<Profession> professionDbSet, DbSet<ProfessionCategory> professionCategoryDbSet)
    {
      if (!professionDbSet.AnyAsync().Result)
      {
        await SeedProfessionHappyPath(professionDbSet, professionCategoryDbSet);
        // SeedProfession(jobFinderContext, "IT", new string[]
        // {
        //   "Administrator",
        //   "Grafik",
        //   "Konsultant ds. Wdrożeń",
        //   "Programista",
        //   "Programista baz danych",
        //   "Projektant IT"
        // });
        await SeedProfession(professionCategoryDbSet, professionDbSet, "Administracja", new string[]
        {
          "Administrator danych osobowych",
          "Analityk systemów",
          "Asystentka zarządu",
          "Dyrektor ds.Administracyjnych",
          "Pracownik biurowy",
          "Programista PLC",
          "Specjalista ds. ofertowania"
        });
        await SeedProfession(professionCategoryDbSet, professionDbSet, "Produkcja", new string[]
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
        await SeedProfession(professionCategoryDbSet, professionDbSet, "Turystyka", new string[]
        {
          "Pilot wycieczek",
          "Specjalista ds. turystyki"
        });
        await SeedProfession(professionCategoryDbSet, professionDbSet, "Nauka", new string[]
        {
          "Lektor",
          "Nauczyciel",
          "Pedagog",
          "Trener"
        });
      }
    }
    private static async Task SeedProfessionHappyPath(DbSet<Profession> professionDbSet, DbSet<ProfessionCategory> professionCategoryDbSet)
    {
      string professionCategory = "IT";
      string[] proposedCertificates = {
        "Microsoft Certified Professional (MCP)",
        "Microsoft Certified Desktop Technician (MCDST)",
        "Microsoft Certified Systems Administrator (MCSA)",
        "Microsoft Certified Systems Engineer (MCSE)",
        "Microsoft Certified Database Administrator (MCDBA)",
        "Microsoft Certified Application Developer (MCAD)",
        "Microsoft Certified Solution Developer (MCSD)"
      };
      Dictionary<string, string[]> professionNames = new Dictionary<string, string[]>()
      {
        {
        "Administrator",
        new string []
        {
        "znajomość zagadnień związanych z administracją określonymi zasobami informatycznymi (fizyczne sieci internetowe, serwery, systemy informatyczne)",
        "ogólna wiedza na temat standardów informatycznych",
        "znajomość języków programowania",
        "znajomość narzędzi administracyjnych (panele administracyjne serwerów, programów do zarządzani ruchem w sieci, konta administracyjne systemów)"
        }
        },
        {
        "Grafik",
        new string []
        {
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
        "Konsultant ds. Wdrożeń",
        new string []
        {
        "znajomość zagadnień związanych z administracją określonymi zasobami informatycznymi (fizyczne sieci internetowe, serwery, systemy informatyczne)",
        "ogólna wiedza na temat standardów informatycznych",
        "znajomość języków programowania",
        "znajomość narzędzi administracyjnych (panele administracyjne serwerów, programów do zarządzani ruchem w sieci, konta administracyjne systemów)",
        }
        },
        {
        "Programista",
        new string []
        {
        "znajomość języków programowania (np. Java, PHP, C/C++/C#, Python, Perl)",
        "znajomość standardów oraz środowisk programistycznych",
        "wiedza z zakresu inżynierii oprogramowania",
        "znajomość zagadnień takich jak bazy danych i systemy operacyjne",
        "metodyka prowadzenia projektów informatycznych"
        }
        },
        {
        "Programista baz danych",
        new string []
        {
        "znajomość baz danych (MySQL, PostgreSQL, Oracle, Access, Microsoft SQL Serwer)",
        "znajomość zagadnień związanych z relacyjnością, obiektowością, operacyjnością",
        "znajomość języka programowania baz danych (SQL)",
        "wiedza z zakresu inżynierii oprogramowania",
        "znajomość zagadnień związanych z administrowaniem serwerami baz danych",
        "znajomość zagadnień związanych z bezpieczeństwem informacji"
        }
        },
        {
        "Projektant IT",
        new string []
        {
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
      var categoryId = Guid.NewGuid();
      var category = ProfessionCategory
        .Create(categoryId, professionCategory, proposedCertificates
          .Select(x => ProposedCertificate.Create(Guid.NewGuid(), categoryId, x)).ToList());

      await professionCategoryDbSet.AddAsync(category);
      List<Profession> items = new List<Profession>();
      foreach (var item in professionNames)
      {
        var professionId = Guid.NewGuid();
        var proposedSkills = item.Value.Select(x => ProposedSkill.Create(Guid.NewGuid(), professionId, x));
        items.Add(Profession.Create(professionId, item.Key, category, proposedSkills.ToList()));
      }
      await professionDbSet.AddRangeAsync(items);
    }
    private static async Task SeedProfession(DbSet<ProfessionCategory> professionCategoryDbSet, DbSet<Profession> professionDbSet, string professionCategory, string[] professions)
    {
      var category = ProfessionCategory.Create(Guid.NewGuid(), professionCategory, new List<ProposedCertificate>());
      await professionCategoryDbSet.AddAsync(category);
      var items = professions.Select(x => Profession.Create(Guid.NewGuid(), x, category, new List<ProposedSkill>()));
      await professionDbSet.AddRangeAsync(items);
    }
    private static async Task SeedUsers(DbSet<User> userDbSet, IPasswordCryptoService passwordCryptoService)
    {
      if (!userDbSet.AnyAsync(bu => bu.UserType == UserType.Admin).Result)
      {
        await SeedUser(userDbSet, "Admin", "Admin", "admin@gmail.com", "admin1234", UserType.Admin, passwordCryptoService);
      }
      if (!userDbSet.AnyAsync(bu => bu.UserType == UserType.Employer).Result)
      {
        await SeedUser(userDbSet, "Employer", "Employer", "Employer@gmail.com", "Employer1234", UserType.Employer, passwordCryptoService);
      }
      if (!userDbSet.AnyAsync(bu => bu.UserType == UserType.Employee).Result)
      {
        await SeedUser(userDbSet, "Employee", "Employee", "Employee@gmail.com", "Employee1234", UserType.Employee, passwordCryptoService);
      }
    }
    private static async Task SeedUser(DbSet<User> userDbSet, string name,
      string surname,
      string email,
      string password,
      UserType userType,
      IPasswordCryptoService passwordCryptoService)
    {
      var salt = passwordCryptoService.GenerateSalt();
      var passwordHash = passwordCryptoService.HashPassword(password, salt);
      var user = User.Create(Guid.NewGuid(), name, surname, email, passwordHash, salt, userType);
      await userDbSet.AddAsync(user);
    }
    private static async Task SeedLanguages(DbSet<ProposedLanguage> languageDbSet)
    {
      if (!languageDbSet.AnyAsync().Result)
      {
        var english = ProposedLanguage.Create(Guid.NewGuid(), "Angielski");
        var german = ProposedLanguage.Create(Guid.NewGuid(), "Niemiecki");
        await languageDbSet.AddRangeAsync(new[] { english, german });
      }
    }
  }
}
