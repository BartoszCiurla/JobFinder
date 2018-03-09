using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Akka.ActorAutostart;
using Core.Presentation.Actors;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.Languages.Queries;
using JobFinder.Application.Api.Professions.Queries;
using JobFinder.Domain.Languages.Entities;
using JobFinder.Domain.Professions.Entities;

namespace JobFinder.Presentation.Professions
{

  [AutostartActor(DispatcherActorsNames.ProfessionQueryActor)]
  public class ProfessionQueryActor : BaseActor
  {
    public ProfessionQueryActor(IActorBootstraper actorBootstraper) : base(actorBootstraper)
    {
      ReceiveAsync<GetProfessionsQuery>(Handle);
      ReceiveAsync<GetProposedSkillsQuery>(Handle);
      ReceiveAsync<GetLanguagesListQuery>(Handle);
      ReceiveAsync<GetProposedCertificatesQuery>(Handle);
    }

    private async Task Handle(GetProfessionsQuery query)
    {
      await HandleQuery(query, (uow) =>
      {
        var professionReadOnlyRepository = uow.GetRepository<Profession>();

        return new GetProfessionsResult(professionReadOnlyRepository
          .Query()
          .GroupBy(p => p.Category.Name,
            p => p, (categoryId, profession) =>
            new GetProfessionsResult.ProfessionCategoryDto(
              profession.FirstOrDefault().Category.Id,
              categoryId,
              profession.Select(x =>
                new GetProfessionsResult.ProfessionDto(x.Id, x.Name)))));
      });
    }

    private async Task Handle(GetProposedSkillsQuery query)
    {
      await HandleQuery(query, (uow) =>
      {
        if (query.ProfessionCategoryId == Guid.Empty)
        {
          return new GetProposedSkillsResult();
        }

        var professionReadOnlyRepository = uow.GetRepository<Profession>().Query().Where(x => x.Category.Id == query.ProfessionCategoryId);

        if (query.ProfessionId != Guid.Empty)
        {
          professionReadOnlyRepository = professionReadOnlyRepository.Where(x => x.Id == query.ProfessionId);
        }

        return new GetProposedSkillsResult(professionReadOnlyRepository
          .SelectMany(x => x.ProposedSkills)
          .GroupBy(x => x.Description)
          .Select(x => x.First())
          .Select(p => new GetProposedSkillsResult.ProposedSkillDto(p.Id, p.ProfessionId, p.Description)));
      });
    }

    private async Task Handle(GetLanguagesListQuery query)
    {
      await HandleQuery(query, (uow) =>
      {
        return new GetLanguagesListResult(uow.GetRepository<ProposedLanguage>()
          .Query()
          .Select(x => new GetLanguagesListResult.LanguageDto(x.Id, x.Description)));
      });
    }

    private async Task Handle(GetProposedCertificatesQuery query)
    {
      await HandleQuery(query, (uow) =>
      {
        var professionCategoryReadOnlyRepository = uow.GetRepository<ProfessionCategory>()
          .Query()
          .Where(x => x.Id == query.ProfessionCategoryId);

        return new GetProposedCertificatesResult(professionCategoryReadOnlyRepository
          .SelectMany(x => x.ProposedCertificates)
          .GroupBy(x => x.Title)
          .Select(x => x.First())
          .Select(p =>
            new GetProposedCertificatesResult.ProposedCertificateDto(p.Id,
              p.ProfessionCategoryId,
              p.Title)));
      });
    }

  }
}
