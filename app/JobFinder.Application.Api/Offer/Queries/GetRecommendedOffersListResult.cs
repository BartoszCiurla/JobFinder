using System;
using System.Collections.Generic;
using Core.Application.Api.Messages;
namespace JobFinder.Application.Api.Offer.Queries
{
  public class GetRecommendedOffersListResult : QueryResult
  {
    public IEnumerable<RecommendedOfferDto> RecommendedOffers { get; set; }
    public GetRecommendedOffersListResult (IEnumerable<RecommendedOfferDto> recommendedOffers)
    {
      RecommendedOffers = recommendedOffers;
    }
    public class RecommendedOfferDto
    {
      public Guid Id { get; set; }
      public string Profession { get; set; }
      public string ProfessionCategory { get; set; }
      public double Score { get; set; }
      public bool AcceptanceOfSalary { get; set; }
      public RecommendedOfferDto (Guid id,
        string profession,
        string professionCategory,
        (double score, bool acceptanceOfSalary) recommendation)
      {
        Id = id;
        Profession = profession;
        ProfessionCategory = professionCategory;
        Score = recommendation.score;
        AcceptanceOfSalary = recommendation.acceptanceOfSalary;
      }
    }
  }
}
