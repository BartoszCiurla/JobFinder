using System;
using JobFinder.Domain.Applications.Entities;
using JobFinder.Domain.Offers.Entities;

namespace JobFinder.Presentation.Recommendation.Services
{
    public interface IRecommendationService
    {
        (double score, bool acceptanceOfSalary) CalculateRecommendation(Offer offer, JobApplication jobApplication);
    }
}
