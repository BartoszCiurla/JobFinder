using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Akka.ActorAutostart;
using Core.Application.Actors;
using Core.Application.Exceptions;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.Common.Dtos;
using JobFinder.Application.Api.Offer.Commands;
using JobFinder.Application.Services;
using JobFinder.Domain.Offers.Entities;
using JobFinder.Domain.Professions.Entities;
using JobFinder.Domain.Users.Entities;
namespace JobFinder.Application.Offers
{
  [AutostartActor(DispatcherActorsNames.OfferCommandActor)]
  public class OffersCommandActor : BaseActor
  {
    public OffersCommandActor(IActorBootstraper actorBootstraper) : base(actorBootstraper)
    {
      ReceiveAsync<CreateOfferCommand>(Handle);
    }
    private async Task Handle(CreateOfferCommand command)
    {
      await HandleCommand(command, async uow =>
      {
        var userRepository = uow.GetRepository<User>();
        var user = UserService.Get(command.UserId, userRepository.Query());

        var professionCategoryRepository = uow.GetRepository<ProfessionCategory>();
        var professionRepository = uow.GetRepository<Profession>();
        var offerRepository = uow.GetRepository<Offer>();

        ProfessionCategory professionCategory = ProfessionCategoryService.GetOrCreate(command.Category.Id, command.Category.Name, professionCategoryRepository);

        Profession profession = ProfessionService.GetOrCreate(command.Profession.Id, command.Profession.Name, professionRepository, professionCategory, new List<SkillDto>());

        Offer offer = Offer.Create(Guid.NewGuid(), user, profession);

        offerRepository.Add(offer);
        await professionCategoryRepository.SaveChangesAsync();
        await professionRepository.SaveChangesAsync();
        await offerRepository.SaveChangesAsync();

        return offer.Id;
      });
    }
  }
}
