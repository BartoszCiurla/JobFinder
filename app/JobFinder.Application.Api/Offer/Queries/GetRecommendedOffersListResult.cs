using System;
using System.Collections.Generic;
using Core.Application.Api.Messages;
using JobFinder.Application.Api.Common.Dtos;

namespace JobFinder.Application.Api.Offer.Queries
{
  public class GetRecommendedOffersListResult : QueryResult
  {
    public IEnumerable<RecommendedOfferDto> RecommendedOffers { get; set; }
    public GetRecommendedOffersListResult(IEnumerable<RecommendedOfferDto> recommendedOffers)
    {
      RecommendedOffers = recommendedOffers;
    }
    public class RecommendedOfferDto
    {
      public Guid Id { get; set; }
      public string Profession { get; set; }
      public string ProfessionCategory { get; set; }
      public string CompanyName { get; set; }
      public double Score { get; set; }
      public bool CertificatesWillBeAnAdvantage { get; set; }
      public IEnumerable<SkillDto> RequiredSkills { get; set; }
      public IEnumerable<SkillDto> WelcomeSkills { get; set; }
      public IEnumerable<LanguageDto> Languages { get; set; }

      public RecommendedOfferDto(Guid id,
        string profession,
        string professionCategory,
        string companyName,
        double score,
        bool certificatesWillBeAnAdvantage,
        IEnumerable<SkillDto> requiredSkills,
        IEnumerable<SkillDto> welcomeSkills,
        IEnumerable<LanguageDto> languages)
      {
        Id = id;
        Profession = profession;
        ProfessionCategory = professionCategory;
        CompanyName = companyName;
        Score = score;
        CertificatesWillBeAnAdvantage = certificatesWillBeAnAdvantage;
        RequiredSkills= requiredSkills;
        WelcomeSkills = welcomeSkills;
        Languages = languages;
      }
    }
  }
}
