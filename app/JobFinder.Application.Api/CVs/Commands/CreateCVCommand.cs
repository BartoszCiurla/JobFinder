using System;
using System.Collections.Immutable;
using Core.Application.Api.Messages;

namespace JobFinder.Application.Api.CVs.Commands
{
    public class CreateCVCommand: Command
    {
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string RoleTitle { get; set; }
        public string AboutYou { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public ImmutableArray<EducationDto> Educations { get; set; }
        public ImmutableArray<ExperienceDto> WorkExperience { get; set; }
        public ImmutableArray<SkillDto> Skills { get; set; }
        public ImmutableArray<CertificateDto> Certifications { get; set; }
        public class EducationDto
        {
            public string SchoolName { get; set; }
            public string Description { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime FinishDate { get; set; }
        }

        public class ExperienceDto
        {
            public string Company { get; set; }
            public string Role { get; set; }
            public string Description { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime FinishDate { get; set; }
        }

        public class SkillDto
        {
            public string Skill { get; set; }
            public string SkillLevel { get; set; }
        }

        public class CertificateDto
        {
            public string CertificateName { get; set; }
            public DateTime FinishDate { get; set; }
        }
    }
}
