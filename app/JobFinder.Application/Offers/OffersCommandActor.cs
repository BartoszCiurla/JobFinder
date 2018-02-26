using System;
using Core.Akka.ActorAutostart;
using Core.Application.Actors;
using Core.Application.Exceptions;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.Common.Dtos;
using JobFinder.Application.Api.Offer.Commands;
using JobFinder.Application.Services;
using JobFinder.Domain.Languages.Entities;
using JobFinder.Domain.Offers.Entities;
using JobFinder.Domain.Professions.Entities;
using JobFinder.Domain.Users.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobFinder.Domain.Common;

namespace JobFinder.Application.Offers
{
  [AutostartActor(DispatcherActorsNames.OfferCommandActor)]
  public class OffersCommandActor : BaseActor
  {
    public OffersCommandActor(IActorBootstraper actorBootstraper) : base(actorBootstraper)
    {
      ReceiveAsync<CreateOfferCommand>(Handle);
      ReceiveAsync<DeleteOfferCommand>(Handle);
    }

    private async Task Handle(DeleteOfferCommand command)
    {
      await HandleCommand(command, async uow =>
      {
        var offerRepository = uow.GetRepository<Offer>();
        await offerRepository.Remove(command.OfferId);
        await offerRepository.SaveChangesAsync();
      });
    }

    private async Task Handle(CreateOfferCommand command)
    {
      await HandleCommand(command, async uow =>
     {
       var userRepository = uow.GetRepository<User>();
       var professionCategoryRepository = uow.GetRepository<ProfessionCategory>();
       var professionRepository = uow.GetRepository<Profession>();
       var languageRepository = uow.GetRepository<ProposedLanguage>();
       var offerRepository = uow.GetRepository<Offer>();

       var user = UserService.Get(command.UserId, userRepository.Query());

       ProfessionCategory professionCategory = ProfessionCategoryService.GetOrCreate(command.Category.Id, command.Category.Name, new List<CertificateDto>(), professionCategoryRepository);

       Profession profession = ProfessionService.GetOrCreate(command.Profession.Id, command.Profession.Name, professionRepository, professionCategory, command.WelcomeSkills.Concat(command.RequiredSkills));

       var offerId = Guid.NewGuid();

       Offer offer = Offer
         .Create(offerId,
           user,
           profession,
           command.CertificatesWillBeAnAdvantage,
           LanguageService.Create<OfferLanguage>(
             offerId,
             LanguageService.GetOrCreate(languageRepository, command.Languages),
             command.Languages).ToList(),
           SkillsService.Create<OfferRequiredSkill>(offerId, profession, command.RequiredSkills).ToList(),
           SkillsService.Create<OfferWelcomeSkill>(offerId, profession, command.WelcomeSkills).ToList());

       offerRepository.Add(offer);

       await professionCategoryRepository.SaveChangesAsync();
       await professionRepository.SaveChangesAsync();
       await languageRepository.SaveChangesAsync();
       await offerRepository.SaveChangesAsync();

       return offer.Id;
     });
    }
  }
}
