using System;
using System.Collections.Generic;
using Core.Domain.Ddd;
using JobFinder.Domain.Common;
using JobFinder.Domain.Professions.Entities;
using JobFinder.Domain.Users.Entities;
namespace JobFinder.Domain.Offers.Entities
{
  public class Offer : AggregateRoot
  {
    public User User { get; private set; }
    public Profession Profession { get; private set; }
    public bool CertificatesWillBeAnAdvantage { get; private set; }
    public string CompanyName { get; private set; }
    public virtual ICollection<OfferLanguage> Languages { get; private set; }
    public virtual ICollection<OfferRequiredSkill> RequiredSkills { get; private set; }
    public virtual ICollection<OfferWelcomeSkill> WelcomeSkills { get; private set; }
    protected Offer() : base(Guid.Empty) { }
    protected Offer(Guid id,
      User user,
      Profession profession,
      bool certificatesWillBeAnAdvantage,
      string companyName,
      ICollection<OfferLanguage> languages,
      ICollection<OfferRequiredSkill> requiredSkills,
      ICollection<OfferWelcomeSkill> welcomeSkills) : base(id)
    {
      User = user;
      Profession = profession;
      CertificatesWillBeAnAdvantage = certificatesWillBeAnAdvantage;
      CompanyName = companyName;
      Languages = languages;
      RequiredSkills = requiredSkills;
      WelcomeSkills = welcomeSkills;
    }
    public static Offer Create(Guid id,
      User user,
      Profession profession,
      bool certificatesWillBeAnAdvantage,
      string companyName,
      ICollection<OfferLanguage> languages,
      ICollection<OfferRequiredSkill> requiredSkills,
      ICollection<OfferWelcomeSkill> welcomeSkills)
    {
      return new Offer(id,
        user,
        profession,
        certificatesWillBeAnAdvantage,
        companyName,
        languages,
        requiredSkills,
        welcomeSkills);
    }
  }
}
