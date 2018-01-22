using System;
using System.Threading.Tasks;
using Core.Akka.ActorAutostart;
using Core.Application.Actors;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.Users;
using JobFinder.Domain.Users;
using JobFinder.Domain.Users.Entities;
namespace JobFinder.Application.Users
{
  [AutostartActor (DispatcherActorsNames.UserCommandActor)]
  public class UserCommandActor : BaseActor
  {
    private readonly IPasswordCryptoService _passwordCryptoService;
    public UserCommandActor (IActorBootstraper actorBootstraper,
      IPasswordCryptoService passwordCryptoService) : base (actorBootstraper)
    {
      _passwordCryptoService = passwordCryptoService;
      ReceiveAsync<RegisterUserCommand> (Handle);
    }
    private async Task Handle (RegisterUserCommand command)
    {
      await HandleCommand (command, async uow =>
      {
        var userRepository = uow.GetRepository<User> ();
        var salt = _passwordCryptoService.GenerateSalt ();
        var passwordHash = _passwordCryptoService.HashPassword (command.Password, salt);
        var user = User.Create (Guid.NewGuid (), command.Name, command.Surname, command.Email, passwordHash, salt, (UserType)Enum.Parse(typeof(UserType), command.UserType));
        userRepository.Add (user);
        await userRepository.SaveChangesAsync ();
      });
    }
  }
}
