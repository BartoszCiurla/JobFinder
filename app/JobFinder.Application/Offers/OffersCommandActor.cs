using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Akka.ActorAutostart;
using Core.Application.Actors;
using Core.Application.Exceptions;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.Offer.Commands;
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
       var professionCategoryRepository = uow.GetRepository<ProfessionCategory>();
       var professionRepository = uow.GetRepository<Profession>();
       var offerRepository = uow.GetRepository<Offer>();

       if (userRepository.Query().FirstOrDefault(x => x.Id == command.UserId) == null)
       {
         throw new NotFoundApplicationException("Użytkownik nie istnieje");
       }

       ProfessionCategory professionCategory = professionCategoryRepository
       .Query()
       .FirstOrDefault(x => x.Name == command.Category);
       if (professionCategory == null)
       {
         professionCategory = ProfessionCategory.Create(Guid.NewGuid(), command.Category);
         professionCategoryRepository.Add(professionCategory);
         await professionCategoryRepository.SaveChangesAsync();
       }

       Profession profession = professionRepository
        .Query()
        .FirstOrDefault(x => x.Name == command.Profession && x.Category.Name == command.Category);
       if (profession == null)
       {
         profession = Profession.Create(Guid.NewGuid(), command.Profession, professionCategory);
         professionRepository.Add(profession);
         await professionRepository.SaveChangesAsync();
       }

       Offer offer = Offer.Create(Guid.NewGuid(), profession);
       offerRepository.Add(offer);
       await offerRepository.SaveChangesAsync();

       return offer.Id;
     });
    }
  }
}
