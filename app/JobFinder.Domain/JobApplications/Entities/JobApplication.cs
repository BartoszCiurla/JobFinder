using System;
using System.Collections.Generic;
using Core.Domain.Ddd;
using JobFinder.Domain.JobApplications.Entities;
using JobFinder.Domain.Professions.Entities;
using JobFinder.Domain.Users.Entities;
namespace JobFinder.Domain.Applications.Entities
{
  public class JobApplication : AggregateRoot
  {
    public User User { get; private set; }
    public Profession Profession { get; private set; }
    public virtual ICollection<JobApplicationSkill> Skills { get; private set; }
    public virtual ICollection<JobApplicationLanguage> Languages { get; private set; }
    protected JobApplication() : base(Guid.Empty) { }
    protected JobApplication(Guid id,
      User user,
      Profession profession,
      ICollection<JobApplicationSkill> skills,
      ICollection<JobApplicationLanguage> languages) : base(id)
    {
      Profession = profession;
      User = user;
      Skills = skills;
      Languages = languages;
    }
    public static JobApplication Create(Guid id,
      User user,
      Profession profession,
      ICollection<JobApplicationSkill> skills,
      ICollection<JobApplicationLanguage> languages)
    {
      return new JobApplication(id, user, profession, skills, languages);
    }
  }
}
