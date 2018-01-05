using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using JobFinder.Domain.Users;

namespace JobFinder.Infrastructure.Authorization
{
  public class PasswordCryptoService : IPasswordCryptoService
  {
    public async Task<bool> IsCorrectAsync(string password, string passwordHash, string salt)
    {
      return await Task.Run(() =>
      {
        return HashPassword(password, salt) == passwordHash;
      });
    }

    public string GenerateSalt()
    {
      return Guid.NewGuid().ToString().Substring(0, 31);
    }

    public string HashPassword(string password, string salt)
    {
      var saltedPassword = password + salt;
      var hashProvider = SHA512.Create();

      var hash = Encoding.UTF8.GetBytes(saltedPassword);
      var digest = hashProvider.ComputeHash(hash);

      for (int i = 1; i < 5000; i++)
      {
        var temp = new byte[digest.Length + hash.Length];
        digest.CopyTo(temp, 0);
        hash.CopyTo(temp, digest.Length);
        digest = hashProvider.ComputeHash(temp);
      }

      return Convert.ToBase64String(digest);
    }
  }
}
