using System.Linq;
using System.Threading.Tasks;
using Core.Akka.ActorAutostart;
using Core.Presentation.Actors;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.JobApplications.Queries;
using JobFinder.Domain.Applications.Entities;
using Microsoft.EntityFrameworkCore;
namespace JobFinder.Presentation.JobApplications
{
    [AutostartActor(DispatcherActorsNames.JobApplicationQueryActor)]
    public class JobApplicationQueryActor : BaseActor
    {
        public JobApplicationQueryActor(IActorBootstraper actorBootstraper) : base(actorBootstraper)
        {
            ReceiveAsync<GetEmployeeJobApplicationListQuery>(Handle);
        }
        private async Task Handle(GetEmployeeJobApplicationListQuery query)
        {
            await HandleQuery(query, uow =>
            {
                var offerReadOnlyRepository = uow.GetRepository<JobApplication>();

                return new GetEmployeeJobApplicationListResult(offerReadOnlyRepository
                    .Query()
                    .Where(x => x.User.Id == query.UserId)
                    .Include(x => x.User)
                    .Include(x => x.Profession).ThenInclude(x => x.Category)
                    .Include(x => x.Skills).ThenInclude(x => x.Skill)
                    .Select(x => new GetEmployeeJobApplicationListResult.JobApplicationDto(x.Id, x.Profession.Name, x.Profession.Category.Name, x.Skills
                        .Select(y => new GetEmployeeJobApplicationListResult.JobApplicationSkillDto(y.Id, y.Skill.Description, y.Level)))));
            });
        }
    }
}
