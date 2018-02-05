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
                var jobApplicationReadOnlyRepository = uow.GetRepository<JobApplication>();

                return new GetEmployeeJobApplicationListResult(jobApplicationReadOnlyRepository
                    .Query()
                    .Where(ja => ja.User.Id == query.UserId)
                    .Include(ja => ja.User)
                    .Include(ja => ja.Languages).ThenInclude(jal => jal.Language)
                    .Include(ja => ja.Profession).ThenInclude(jap => jap.Category)
                    .Include(ja => ja.Skills).ThenInclude(jas => jas.Skill)
                    .Include(ja => ja.Certificates).ThenInclude(jac => jac.Certificate)
                    .Select(ja => new GetEmployeeJobApplicationListResult.JobApplicationDto(ja.Id, ja.Profession.Name, ja.Profession.Category.Name,
                        ja.Skills.Select(s => new GetEmployeeJobApplicationListResult.JobApplicationSkillDto(s.Id, s.Skill.Description, s.Level)),
                        ja.Languages.Select(l => new GetEmployeeJobApplicationListResult.JobApplicationLanguageDto(l.Id, l.Language.Name, l.Level)),
                        ja.Certificates.Select(c => new GetEmployeeJobApplicationListResult.JobApplicationCertificateDto(c.Id, c.Certificate.Title)))));
            });
        }
    }
}
