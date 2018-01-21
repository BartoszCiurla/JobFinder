using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Akka.ActorAutostart;
using Core.Application.Actors;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.CVs.Commands;
using JobFinder.Domain.Common;
using JobFinder.Domain.CVs.Entities;
namespace JobFinder.Application.CVs
{
    [AutostartActor(DispatcherActorsNames.CVCommandActor)]
    public class CVsCommandActor : BaseActor
    {
        public CVsCommandActor(IActorBootstraper actorBootstraper) : base(actorBootstraper)
        {
            ReceiveAsync<CreateCVCommand>(Handle);
        }
        private async Task Handle(CreateCVCommand command)
        {
            await HandleCommand(command, async uow =>
            {
                var cVRepository = uow.GetRepository<CV> ();

                Guid cVId = Guid.NewGuid();
                var educations = command.Educations
                    .Select(e =>
                        CVEducation.Create(Guid.NewGuid(), cVId, e.SchoolName, e.Description, e.StartDate, e.FinishDate)).ToList();
                var experience = command.WorkExperience
                    .Select(e =>
                        CVExperience.Create(Guid.NewGuid(), cVId, e.Company, e.Role, e.Description, e.StartDate, e.FinishDate)).ToList();
                var skills = command.Skills
                    .Select(s =>
                        CVSkill.Create(Guid.NewGuid(), cVId, s.Skill, (SkillLevel) Enum.Parse(typeof(SkillLevel), s.SkillLevel))).ToList();
                var certifications = command.Certifications
                    .Select(c =>
                        CVCertificate.Create(Guid.NewGuid(), cVId, c.CertificateName, c.FinishDate)).ToList();
                var cv = CV.Create(cVId, command.UserId, command.RoleTitle, command.AboutYou, command.Email, command.PhoneNumber, educations, experience, skills, certifications);

                cVRepository.Add(cv);
                await cVRepository.SaveChangesAsync();

                return cVId;
            });
        }
    }
}
