using System.Linq;
using System.Threading.Tasks;
using Core.Akka.ActorAutostart;
using Core.Presentation.Actors;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.Professions.Queries;
using JobFinder.Domain.Professions.Entities;

namespace JobFinder.Presentation.Professions
{

  [AutostartActor(DispatcherActorsNames.ProfessionQueryActor)]
  public class ProfessionQueryActor : BaseActor
  {
    public ProfessionQueryActor(IActorBootstraper actorBootstraper) : base(actorBootstraper)
    {
      ReceiveAsync<GetProfessionsQuery>(Handle);
    }

    private async Task Handle(GetProfessionsQuery query)
    {
      await HandleQuery(query, (uow) =>
      {
        var professionReadOnlyRepository = uow.GetRepository<Profession>();

        return new GetProfessionsResult(professionReadOnlyRepository
            .Query()
            .GroupBy(p => p.Category.Name,
                p => p, (categoryId, profession) =>
                    new GetProfessionsResult.ProfessionCategoryDto(
                        profession.FirstOrDefault().Category.Id,
                        categoryId,
                        profession.Select(x =>
                            new GetProfessionsResult.ProfessionDto(x.Id, x.Name)))));
      });
    }
  }
}
