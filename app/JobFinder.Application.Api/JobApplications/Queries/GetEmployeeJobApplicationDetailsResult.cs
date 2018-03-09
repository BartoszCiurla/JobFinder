using System.Collections.Generic;
using Core.Application.Api.Messages;
using JobFinder.Application.Api.Common.Dtos;

namespace JobFinder.Application.Api.JobApplications.Queries
{
    public class GetEmployeeJobApplicationDetailsResult : QueryResult
    {
        public string Profession { get; private set; }
        public string ProfessionCategory { get; private set; }
        public IEnumerable<SkillDto> Skills { get; private set; }
        public IEnumerable<LanguageDto> Languages { get; private set; }
        public IEnumerable<CertificateDto> Certifcates { get; private set; }
        public GetEmployeeJobApplicationDetailsResult(string profession,
            string professionCategory,
            IEnumerable<SkillDto> skills,
            IEnumerable<LanguageDto> languages,
            IEnumerable<CertificateDto> certificates)
        {
            Profession = profession;
            ProfessionCategory = professionCategory;
            Skills = skills;
            Languages = languages;
            Certifcates = certificates;
        }
    }
}
