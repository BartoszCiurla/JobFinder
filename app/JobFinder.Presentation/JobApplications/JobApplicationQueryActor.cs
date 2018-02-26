using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Akka.ActorAutostart;
using Core.Application.Exceptions;
using Core.Presentation.Actors;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.Common.Dtos;
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
            ReceiveAsync<GetEmployeeJobApplicationDetailsQuery>(Handle);
        }

        private async Task Handle(GetEmployeeJobApplicationDetailsQuery query)
        {
            await HandleQuery(query, uow =>
            {
                var jobApplicationReadOnlyRepository = uow.GetRepository<JobApplication>();
                var jobApplication = jobApplicationReadOnlyRepository.Query()
                    .Include(ja => ja.User)
                    .Include(ja => ja.Profession).ThenInclude(p => p.Category)
                    .Include(ja => ja.Languages).ThenInclude(l => l.Language)
                    .Include(ja => ja.Certificates).ThenInclude(c => c.Certificate)
                    .Include(ja => ja.Skills).ThenInclude(s => s.Skill)
                    .FirstOrDefault(ja => ja.Id == query.JobApplicationId);

                if (jobApplication == null)
                {
                    throw new NotFoundApplicationException($"Wskazana aplikacja nie istnieje {query.JobApplicationId}");
                }

                return new GetEmployeeJobApplicationDetailsResult(jobApplication.Profession.Name,
                    jobApplication.Profession.Category.Name,
                    jobApplication.Skills.Select(s => new SkillDto(s.Id, s.Skill.ProfessionId, s.Skill.Description, s.Level)),
                    jobApplication.Languages.Select(l => new LanguageDto(l.Id, l.Language.Description, l.Level)),
                    jobApplication.Certificates.Select(c => new CertificateDto(c.Id, c.Certificate.ProfessionCategoryId, c.Certificate.Title)));
            });
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
                        ja.Languages.Select(l => new GetEmployeeJobApplicationListResult.JobApplicationLanguageDto(l.Id, l.Language.Description, l.Level)),
                        ja.Certificates.Select(c => new GetEmployeeJobApplicationListResult.JobApplicationCertificateDto(c.Id, c.Certificate.Title)))));
            });
        }
    }
}
