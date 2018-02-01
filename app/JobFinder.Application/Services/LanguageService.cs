using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Application.Exceptions;
using Core.Domain.Ddd;
using JobFinder.Application.Api.Common.Dtos;
using JobFinder.Domain.JobApplications.Entities;
using JobFinder.Domain.Languages.Entities;
namespace JobFinder.Application.Services
{
    public class LanguageService
    {
        public static async Task<List<ProposedLanguage>> GetOrCreate(IRepository<ProposedLanguage> repository, IEnumerable<LanguageDto> languages)
        {
            List<ProposedLanguage> proposedLanguages = new List<ProposedLanguage>();
            foreach (var language in languages)
            {
                if (language.Id == Guid.Empty)
                {
                    var proposedLanguage = ProposedLanguage.Create(Guid.NewGuid(), language.Name);
                    repository.Add(proposedLanguage);
                    proposedLanguages.Add(proposedLanguage);
                    await repository.SaveChangesAsync();
                }
                proposedLanguages.Add(await repository.FindById(language.Id));
            }
            return proposedLanguages;
        }
        public static IEnumerable<JobApplicationLanguage> Create(Guid jobApplicationId, IEnumerable<ProposedLanguage> proposedLanguages, IEnumerable<LanguageDto> languages)
        {
            foreach (var language in languages)
            {
                var proposedLanguage = proposedLanguages.FirstOrDefault(x => x.Name == language.Name);
                if (proposedLanguage == null)
                {
                    throw new NotFoundApplicationException($"Język nie istnieje {language.Name}");
                }
                yield return JobApplicationLanguage.Create(Guid.NewGuid(), jobApplicationId, proposedLanguage, language.Level);
            }
        }
    }
}
