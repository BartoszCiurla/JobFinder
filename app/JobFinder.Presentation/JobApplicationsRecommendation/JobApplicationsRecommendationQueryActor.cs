using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using Core.Akka.ActorAutostart;
using Core.Presentation.Actors;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.JobApplications.Queries;
using JobFinder.Domain.Applications.Entities;
using JobFinder.Domain.Offers.Entities;
using Microsoft.EntityFrameworkCore;

namespace JobFinder.Presentation.JobApplicationsRecommendation
{
  [AutostartActor(DispatcherActorsNames.JobApplicationsRecommendationQueryActor)]
  public class JobApplicationsRecommendationQueryActor : BaseActor
  {
    public JobApplicationsRecommendationQueryActor(IActorBootstraper actorBootstraper) : base(actorBootstraper)
    {
      ReceiveAsync<GetRecommendedApplicationListQuery>(Handle);
    }

    private async Task Handle(GetRecommendedApplicationListQuery query)
    {
      await HandleQuery(query, uow =>
      {
        var offerReadOnlyRepository = uow.GetRepository<Offer>();
        var jobApplicationReadOnlyRepository = uow.GetRepository<JobApplication>();

        var offer = offerReadOnlyRepository
            .Query()
            .Include(o => o.Profession).ThenInclude(p => p.Category)
            .Include(o => o.Languages).ThenInclude(l => l.Language)
            .Include(o => o.RequiredSkills).ThenInclude(rs => rs.Skill)
            .Include(o => o.WelcomeSkills).ThenInclude(ws => ws.Skill)
            .FirstOrDefault(o => o.Id == query.OfferId);

        var selectedJobApplications = jobApplicationReadOnlyRepository
            .Query()
            .Include(ja => ja.Profession).ThenInclude(p => p.Category)
            .Where(ja => ja.Profession.Id == offer.Profession.Id);

        return new GetRecommendedApplicationListResult();
      });
    }
  }
}
