using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Akka.ActorAutostart;
using Core.Application.Actors;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.JobApplications.Commands;
using JobFinder.Application.Services;
using JobFinder.Domain.Applications.Entities;
using JobFinder.Domain.JobApplications.Entities;
using JobFinder.Domain.Languages.Entities;
using JobFinder.Domain.Professions.Entities;
using JobFinder.Domain.Users.Entities;
namespace JobFinder.Application.JobApplications
{
  [AutostartActor(DispatcherActorsNames.JobApplicationCommandActor)]
  public class JobApplicationsCommandActor : BaseActor
  {
    public JobApplicationsCommandActor(IActorBootstraper actorBootstraper) : base(actorBootstraper)
    {
      ReceiveAsync<CreateJobApplicationCommand>(Handle);
      ReceiveAsync<DeleteJobApplicationCommand>(Handle);
    }
    private async Task Handle(CreateJobApplicationCommand command)
    {
      await HandleCommand(command, async uow =>
      {
        var userRepository = uow.GetRepository<User>();
        var professionCategoryRepository = uow.GetRepository<ProfessionCategory>();
        var professionRepository = uow.GetRepository<Profession>();
        var jobApplicationRepository = uow.GetRepository<JobApplication>();
        var languageRepository = uow.GetRepository<ProposedLanguage>();

        var user = UserService.Get(command.UserId, userRepository.Query());

        ProfessionCategory professionCategory = ProfessionCategoryService
          .GetOrCreate(command.Category.Id, command.Category.Name, command.Certificates, professionCategoryRepository);

        Profession profession = ProfessionService
          .GetOrCreate(command.Profession.Id, command.Profession.Name, professionRepository, professionCategory, command.Skills);

        var applicationId = Guid.NewGuid();

        JobApplication application = JobApplication
          .Create(applicationId,
            user,
            profession,
            SkillsService.Create<JobApplicationSkill>(
              applicationId,
              profession,
              command.Skills).ToList(),
            LanguageService.Create<JobApplicationLanguage>(
              applicationId,
              LanguageService.GetOrCreate(languageRepository, command.Languages),
              command.Languages).ToList(),
            CertificatesService.Create(
              applicationId,
              professionCategory,
              command.Certificates).ToList());

        jobApplicationRepository.Add(application);

        await professionCategoryRepository.SaveChangesAsync();
        await professionRepository.SaveChangesAsync();
        await languageRepository.SaveChangesAsync();
        await jobApplicationRepository.SaveChangesAsync();

        return application.Id;
      });
    }

    private async Task Handle(DeleteJobApplicationCommand command)
    {
      await HandleCommand(command, async uow =>
      {
        var jobApplicationRepository = uow.GetRepository<JobApplication>();

        await jobApplicationRepository.Remove(command.JobApplicationId);
        await jobApplicationRepository.SaveChangesAsync();
      });
    }
  }
}
