using System;
using JobFinder.Domain.Users;
using JobFinder.Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;

namespace JobFinder.Infrastructure.Ef.Extensions
{
  public static class DbContextExtensions
  {
    public static void EnsureSeedData(this JobFinderContext JobFinderContext, IPasswordCryptoService passwordCryptoService)
    {
      var users = JobFinderContext.Set<User>();

      if (!users.AnyAsync(bu => bu.UserType == UserType.Admin).Result)
      {
        SeedUser("Admin", "Admin", "admin@gmail.com", "admin1234", UserType.Admin, passwordCryptoService, JobFinderContext);
      }

      if (!users.AnyAsync(bu => bu.UserType == UserType.Employer).Result)
      {
        SeedUser("Employer", "Employer", "Employer@gmail.com", "Employer1234", UserType.Employer, passwordCryptoService, JobFinderContext);
      }

      if (!users.AnyAsync(bu => bu.UserType == UserType.Employee).Result)
      {
        SeedUser("Employee", "Employee", "Employee@gmail.com", "Employee1234", UserType.Employee, passwordCryptoService, JobFinderContext);
      }

      JobFinderContext.SaveChangesAsync();
    }

    private static async void SeedUser(string name,
                               string surname,
                               string email,
                               string password,
                               UserType userType,
                               IPasswordCryptoService passwordCryptoService,
                               JobFinderContext JobFinderContext)
    {
      var salt = passwordCryptoService.GenerateSalt();
      var passwordHash = passwordCryptoService.HashPassword(password, salt);
      var user = User.Create(Guid.NewGuid(), name, surname, email, passwordHash, salt, userType);
      await JobFinderContext.Set<User>().AddAsync(user);
    }
  }
}
