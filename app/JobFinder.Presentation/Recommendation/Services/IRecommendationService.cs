using System;
using JobFinder.Domain.Applications.Entities;
using JobFinder.Domain.Offers.Entities;

namespace JobFinder.Presentation.Recommendation.Services
{
  public interface IRecommendationService
  {
    double CalculateRecommendation(Offer offer, JobApplication jobApplication);
  }
}
