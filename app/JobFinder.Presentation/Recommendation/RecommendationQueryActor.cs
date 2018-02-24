using System;
using System.Threading.Tasks;
using Core.Akka.ActorAutostart;
using Core.Presentation.Actors;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.JobApplications.Queries;
using JobFinder.Application.Api.Offer.Queries;
using JobFinder.Domain.Applications.Entities;
using System.Linq;
using JobFinder.Domain.Offers.Entities;
using Microsoft.EntityFrameworkCore;

namespace JobFinder.Presentation.Recommendation
{
  [AutostartActor(DispatcherActorsNames.RecommendationQueryActor)]
  public class RecommendationQueryActor : BaseActor
  {
    public RecommendationQueryActor(IActorBootstraper actorBootstraper) : base(actorBootstraper)
    {
      ReceiveAsync<GetRecommendedApplicationListQuery>(Handle);
      ReceiveAsync<GetRecommendedOffersListQuery>(Handle);
    }
    private async Task Handle(GetRecommendedOffersListQuery query)
    {
      await HandleQuery(query, uow =>
      {
        var jobApplicationReadOnlyRepository = uow.GetRepository<JobApplication>();
        var offerReadOnlyRepository = uow.GetRepository<Offer>();
        var jobApplication = IncludeJobApplicationRelations(jobApplicationReadOnlyRepository.Query())
          .FirstOrDefault(ja => ja.Id == query.JobApplicationId);

        var recommendedOffers = IncludeOfferRelations(offerReadOnlyRepository.Query())
            .Where(o => o.Profession.Id == jobApplication.Profession.Id &&
              o.Profession.Category.Id == jobApplication.Profession.Category.Id).ToList();


        return new GetRecommendedOffersListResult(recommendedOffers
          .Select(x => new GetRecommendedOffersListResult.RecommendedOfferDto(x.Id, x.Profession.Name, x.Profession.Category.Name)));
      });
    }
    private async Task Handle(GetRecommendedApplicationListQuery query)
    {
      await HandleQuery(query, uow =>
      {
        var offerReadOnlyRepository = uow.GetRepository<Offer>();
        var jobApplicationReadOnlyRepository = uow.GetRepository<JobApplication>();

        var offer = IncludeOfferRelations(offerReadOnlyRepository.Query())
            .FirstOrDefault(o => o.Id == query.OfferId);

        var selectedJobApplications = IncludeJobApplicationRelations(jobApplicationReadOnlyRepository.Query())
            .Where(ja => ja.Profession.Id == offer.Profession.Id &&
              ja.Profession.Category.Id == offer.Profession.Category.Id).ToList();

        return new GetRecommendedApplicationListResult(selectedJobApplications
          .Select(x => new GetRecommendedApplicationListResult.RecommendedJobApplicationDto(x.Id, x.Profession.Name, x.Profession.Category.Name)));
      });
    }

    private IQueryable<Offer> IncludeOfferRelations(IQueryable<Offer> offerQuery)
      => offerQuery
        .Include(o => o.Profession).ThenInclude(p => p.Category)
        .Include(o => o.Languages).ThenInclude(l => l.Language)
        .Include(o => o.RequiredSkills).ThenInclude(rs => rs.Skill)
        .Include(o => o.WelcomeSkills).ThenInclude(ws => ws.Skill);

    private IQueryable<JobApplication> IncludeJobApplicationRelations(IQueryable<JobApplication> jobApplicationQuery)
      => jobApplicationQuery
        .Include(ja => ja.Profession).ThenInclude(p => p.Category)
        .Include(ja => ja.Languages).ThenInclude(l => l.Language)
        .Include(ja => ja.Certificates).ThenInclude(c => c.Certificate)
        .Include(ja => ja.Skills).ThenInclude(s => s.Skill);
  }
}
