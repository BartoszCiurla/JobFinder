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
      var JobFinderUsers = JobFinderContext.Set<JobFinderUser>();

      if (!JobFinderUsers.AnyAsync(bu => bu.UserType == UserType.Admin).Result)
      {
        SeedUser("Admin", "Admin", "admin@gmail.com", "admin1234", UserType.Admin, passwordCryptoService, JobFinderContext);
      }

      if (!JobFinderUsers.AnyAsync(bu => bu.UserType == UserType.Client).Result)
      {
        SeedUser("Clinet", "Client", "client@gmail.com", "client1234", UserType.Client, passwordCryptoService, JobFinderContext);
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
      var user = JobFinderUser.Create(Guid.NewGuid(), name, surname, email, passwordHash, salt, userType);
      await JobFinderContext.Set<JobFinderUser>().AddAsync(user);
    }
  }
}
