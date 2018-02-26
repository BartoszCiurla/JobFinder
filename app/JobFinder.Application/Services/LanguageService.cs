using System;
using Core.Application.Exceptions;
using Core.Domain.Ddd;
using JobFinder.Application.Api.Common.Dtos;
using JobFinder.Domain.JobApplications.Entities;
using JobFinder.Domain.Languages.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace JobFinder.Application.Services
{
    public class LanguageService
    {
        public static IEnumerable<ProposedLanguage> GetOrCreate (IRepository<ProposedLanguage> repository, IEnumerable<LanguageDto> languages)
        {
            foreach (var language in languages)
            {
                var proposedLanguage = repository.Query ().FirstOrDefault (x => x.Description == language.Description);
                if (proposedLanguage == null)
                {
                    proposedLanguage = ProposedLanguage.Create (Guid.NewGuid (), language.Description);
                    repository.Add (proposedLanguage);
                }
                yield return proposedLanguage;
            }
        }
        public static IEnumerable<T> Create<T> (Guid foreignKeyId, IEnumerable<ProposedLanguage> proposedLanguages, IEnumerable<LanguageDto> languages) where T : Entity
        {
            foreach (var language in languages)
            {
                var proposedLanguage = proposedLanguages.FirstOrDefault (x => x.Description == language.Description);
                if (proposedLanguage == null)
                {
                    throw new NotFoundApplicationException ($"Język nie istnieje {language.Description}");
                }
                yield return (T) typeof (T).GetMethod ("Create").Invoke (null, new object [] { Guid.NewGuid (), foreignKeyId, proposedLanguage, language.Level });
            }
        }
    }
}
