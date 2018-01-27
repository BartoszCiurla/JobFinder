using System.Threading.Tasks;
using Core.Akka.ActorAutostart;
using Core.Presentation.Actors;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.Offer.Queries;
using JobFinder.Domain.Offers.Entities;
using System.Linq;

namespace JobFinder.Presentation.Offers
{
  [AutostartActor(DispatcherActorsNames.OfferQueryActor)]
  public class OffersQueryActor : BaseActor
  {
    public OffersQueryActor(IActorBootstraper actorBootstraper) : base(actorBootstraper)
    {
      ReceiveAsync<GetEmployerOffersListQuery>(Handle);
    }

    private async Task Handle(GetEmployerOffersListQuery query)
    {
      await HandleQuery(query, uow =>
      {
        var offerReadOnlyRepository = uow.GetRepository<Offer>();

        return new GetEmployerOffersListResult(offerReadOnlyRepository
            .Query()
            .Select(x =>
            new GetEmployerOffersListResult.OfferDto(x.Id, x.Profession.Name, x.Profession.Category.Name)));
      });
    }
  }
}
