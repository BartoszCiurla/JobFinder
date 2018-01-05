using System.Linq;
using System.Threading.Tasks;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.Common.Dtos;
using JobFinder.Application.Api.Users.Queries;
using JobFinder.Domain.Users.Entities;
using Core.Akka.ActorAutostart;
using Core.Presentation.Actors;
namespace JobFinder.Presentation.Users
{
  [AutostartActor (DispatcherActorsNames.UserQueryActor)]
  public class UserQueryActor : BaseActor
  {
    public UserQueryActor (IActorBootstraper actorBootstraper) : base (actorBootstraper)
    {
      ReceiveAsync<GetUsersQuery> (Handle);
    }
    private async Task Handle (GetUsersQuery query)
    {
      await HandleQuery (query, (uow) =>
      {
        var userReadOnlyRepository = uow.GetRepository<JobFinderUser> ();
        return new GetUsersResult (userReadOnlyRepository.Query ().Select (uror => new UserDetailsDto (uror.Name, uror.Email)).ToList ());
      });
    }
  }
}
