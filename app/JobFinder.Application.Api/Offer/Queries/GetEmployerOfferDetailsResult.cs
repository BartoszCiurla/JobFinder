using System.Collections.Generic;
using Core.Application.Api.Messages;
using JobFinder.Application.Api.Common.Dtos;
namespace JobFinder.Application.Api.Offer.Queries
{
    public class GetEmployerOfferDetailsResult : QueryResult
    {
        public string Profession { get; set; }
        public string ProfessionCategory { get; set; }
        public bool CertificatesWillBeAnAdvantage { get; set; }
        public IEnumerable<SkillDto> RequiredSkills { get; set; }
        public IEnumerable<SkillDto> WelcomeSkills { get; set; }
        public IEnumerable<LanguageDto> Languages { get; set; }
        public GetEmployerOfferDetailsResult (string profession,
            string professionCategory,
            bool certificatesWillBeAnAdvantage,
            IEnumerable<SkillDto> requriedSkills,
            IEnumerable<SkillDto> welcomeSkills,
            IEnumerable<LanguageDto> languages)
        {
            Profession = profession;
            ProfessionCategory = professionCategory;
            CertificatesWillBeAnAdvantage = certificatesWillBeAnAdvantage;
            RequiredSkills = requriedSkills;
            WelcomeSkills = welcomeSkills;
            Languages = languages;
        }
    }
}
