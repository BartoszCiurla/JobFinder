using System;
using System.Threading.Tasks;
using Core.Akka.ActorAutostart;
using Core.Application.Actors;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.JobApplications.Commands;
using JobFinder.Application.Services;
using JobFinder.Domain.Applications.Entities;
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
        }
        private async Task Handle(CreateJobApplicationCommand command)
        {
            await HandleCommand(command, async uow =>
            {
                var userRepository = uow.GetRepository<User>();
                var user = UserService.Get(command.UserId, userRepository.Query());

                var professionCategoryRepository = uow.GetRepository<ProfessionCategory>();
                var professionRepository = uow.GetRepository<Profession>();
                var jobApplicationRepository = uow.GetRepository<JobApplication>();

                ProfessionCategory professionCategory = await ProfessionCategoryService.GetOrCreate(command.Category.Id, command.Category.Name, professionCategoryRepository);

                Profession profession = await ProfessionService.GetOrCreate(command.Profession.Id, command.Profession.Name, professionRepository, professionCategory);

                JobApplication application = JobApplication.Create(Guid.NewGuid(), user, profession);

                jobApplicationRepository.Add(application);
                await jobApplicationRepository.SaveChangesAsync();
                return application.Id;
            });
        }
    }
}
