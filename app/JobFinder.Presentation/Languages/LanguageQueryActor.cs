using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Akka.ActorAutostart;
using Core.Presentation.Actors;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.Languages.Queries;
using JobFinder.Domain.Languages.Entities;
namespace JobFinder.Presentation.Languages
{
    [AutostartActor(DispatcherActorsNames.LanguageQueryActor)]
    public class LanguageQueryActor : BaseActor
    {
        public LanguageQueryActor(IActorBootstraper actorBootstraper) : base(actorBootstraper)
        {
            ReceiveAsync<GetLanguagesListQuery>(Handle);
        }
        private async Task Handle(GetLanguagesListQuery query)
        {
            await HandleQuery(query, (uow) =>
            {
                return new GetLanguagesListResult(uow.GetRepository<ProposedLanguage>()
                    .Query()
                    .Select(x => new GetLanguagesListResult.LanguageDto(x.Id, x.Name)));
            });
        }
    }
}
