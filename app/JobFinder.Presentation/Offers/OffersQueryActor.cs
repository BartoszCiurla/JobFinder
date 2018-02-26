using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Akka.ActorAutostart;
using Core.Application.Exceptions;
using Core.Presentation.Actors;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.Common.Dtos;
using JobFinder.Application.Api.Offer.Queries;
using JobFinder.Domain.Offers.Entities;
using Microsoft.EntityFrameworkCore;
namespace JobFinder.Presentation.Offers
{
  [AutostartActor (DispatcherActorsNames.OfferQueryActor)]
  public class OffersQueryActor : BaseActor
  {
    public OffersQueryActor (IActorBootstraper actorBootstraper) : base (actorBootstraper)
    {
      ReceiveAsync<GetEmployerOffersListQuery> (Handle);
      ReceiveAsync<GetEmployerOfferDetailsQuery> (Handle);
    }
    private async Task Handle (GetEmployerOfferDetailsQuery query)
    {
      await HandleQuery (query, uow =>
      {
        var offerReadOnlyRepository = uow.GetRepository<Offer> ();
        var offer = offerReadOnlyRepository.Query ()
          .Include (o => o.Profession).ThenInclude (p => p.Category)
          .Include (o => o.Languages).ThenInclude (l => l.Language)
          .Include (o => o.RequiredSkills).ThenInclude (rs => rs.Skill)
          .Include (o => o.WelcomeSkills).ThenInclude (ws => ws.Skill)
          .FirstOrDefault (o => o.Id == query.OfferId);

        if (offer == null)
        {
          throw new NotFoundApplicationException ($"Wskazana oferta nie istnieje {query.OfferId}");
        }

        return new GetEmployerOfferDetailsResult (offer.Profession.Name,
          offer.Profession.Category.Name,
          offer.Salary,
          offer.CertificatesWillBeAnAdvantage,
          offer.RequiredSkills.Select(rs => new SkillDto(rs.Id,rs.Skill.ProfessionId,rs.Skill.Description,rs.Level)),
          offer.WelcomeSkills.Select(ws => new SkillDto(ws.Id,ws.Skill.ProfessionId,ws.Skill.Description,ws.Level)),
          offer.Languages.Select (l => new LanguageDto(l.Id,l.Language.Name,l.Level)));
      });
    }
    private async Task Handle (GetEmployerOffersListQuery query)
    {
      await HandleQuery (query, uow =>
      {
        var offerReadOnlyRepository = uow.GetRepository<Offer> ();
        return new GetEmployerOffersListResult (offerReadOnlyRepository
          .Query ()
          .Where (x => x.User.Id == query.UserId)
          .Select (x =>
            new GetEmployerOffersListResult.OfferDto (x.Id, x.Profession.Name, x.Profession.Category.Name)));
      });
    }
  }
}
