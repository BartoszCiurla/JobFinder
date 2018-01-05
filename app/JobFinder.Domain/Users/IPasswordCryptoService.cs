using System.Threading.Tasks;
namespace JobFinder.Domain.Users
{
  public interface IPasswordCryptoService
  {
    Task<bool> IsCorrectAsync (string password, string passwordHash, string salt);
    string GenerateSalt ();
    string HashPassword (string password, string salt);
  }
}
