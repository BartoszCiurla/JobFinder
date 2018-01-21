using System;
using System.Collections.Generic;
using System.Linq;
using Core.Domain.Ddd;
namespace JobFinder.Domain.CVs.Entities
{
    public class CV : AggregateRoot
    {
        public Guid UserId { get; private set; }
        public string Name { get; private set; }
        public string RoleTitle { get; private set; }
        public string AboutYou { get; private set; }
        public string Email { get; private set; }
        public string PhoneNumber { get; private set; }
        public virtual ICollection<CVEducation> Educations { get; private set; }
        public virtual ICollection<CVExperience> Experience { get; private set; }
        public virtual ICollection<CVSkill> Skills { get; private set; }
        public virtual ICollection<CVCertificate> Certifications { get; private set; }
        protected CV() : base(Guid.Empty) { }
        protected CV(Guid id,
            Guid userId,
            string roleTitle,
            string aboutYou,
            string email,
            string phoneNumber,
            ICollection<CVEducation> educations,
            ICollection<CVExperience> experience,
            ICollection<CVSkill> skills,
            ICollection<CVCertificate> certifications) : base(id)
        {
            UserId = userId;
            RoleTitle = roleTitle;
            AboutYou = aboutYou;
            Email = email;
            PhoneNumber = phoneNumber;
            Educations = educations;
            Experience = experience;
            Skills = skills;
            Certifications = certifications;
        }
        public static CV Create(Guid id,
            Guid userId,
            string roleTitle,
            string aboutYou,
            string email,
            string phoneNumber,
            ICollection<CVEducation> educations,
            ICollection<CVExperience> experience,
            ICollection<CVSkill> skills,
            ICollection<CVCertificate> certifications)
        {
            return new CV(id, userId, roleTitle, aboutYou, email, phoneNumber, educations, experience, skills, certifications);
        }
    }
}
