using System;
using System.Collections.Generic;
using Core.Application.Api.Messages;
namespace JobFinder.Application.Api.JobApplications.Queries
{
    public class GetEmployeeJobApplicationListResult : QueryResult
    {
        public IEnumerable<JobApplicationDto> Offers { get; set; }
        public GetEmployeeJobApplicationListResult(IEnumerable<JobApplicationDto> offers)
        {
            Offers = offers;
        }
        public class JobApplicationDto
        {
            public Guid Id { get; set; }
            public string Profession { get; set; }
            public string ProfessionCategory { get; set; }
            public IEnumerable<JobApplicationSkillDto> Skills { get; set; }
            public IEnumerable<JobApplicationLanguageDto> Languages { get; set; }
            public JobApplicationDto(Guid id,
            string profession,
            string professionCategory,
            IEnumerable<JobApplicationSkillDto> skills,
            IEnumerable<JobApplicationLanguageDto> languages)
            {
                Id = id;
                Profession = profession;
                ProfessionCategory = professionCategory;
                Skills = skills;
                Languages = languages;
            }
        }
        public class JobApplicationSkillDto
        {
            public Guid Id { get; set; }
            public string Description { get; set; }
            public int Level { get; set; }
            public JobApplicationSkillDto(Guid id, string description, int level)
            {
                Id = id;
                Description = description;
                Level = level;
            }
        }
        public class JobApplicationLanguageDto
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public int Level { get; set; }
            public JobApplicationLanguageDto(Guid id, string name, int level)
            {
                Id = id;
                Name = name;
                Level = level;
            }
        }
    }
}
