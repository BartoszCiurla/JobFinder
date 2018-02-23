using System.Threading.Tasks;
using Core.Akka.ActorAutostart;
using Core.Presentation.Actors;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.Offer.Queries;
namespace JobFinder.Presentation.OffersRecommendation
{
    [AutostartActor (DispatcherActorsNames.OffersRecommendationQueryActor)]
    public class OffersRecommendationQueryActor : BaseActor
    {
        public OffersRecommendationQueryActor (IActorBootstraper actorBootstraper) : base (actorBootstraper)
        {
            ReceiveAsync<GetRecommendedOffersListQuery> (Handle);
        }
        private async Task Handle (GetRecommendedOffersListQuery query)
        {
            await HandleQuery (query, uow =>
            {
                return new GetRecommendedOffersListResult();
            });
        }
    }
}
