using System.Runtime.Serialization;
using Core.Application.Api.Messages;

namespace JobFinder.Application.Api.Users
{
  public class RegisterUserCommand : Command
  {
    public string Surname { get; set; }
    public string Name { get; set; }
    public string UserType {get;set;}
    public string Email { get; set; }
    public string Password { get; set; }
  }
}
