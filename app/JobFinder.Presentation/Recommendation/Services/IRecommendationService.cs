using JobFinder.Domain.Applications.Entities;
using JobFinder.Domain.Offers.Entities;

namespace JobFinder.Presentation.Recommendation.Services
{
    public interface IRecommendationService
    {
        double CalculateScore(Offer offer, JobApplication jobApplication);
    }
}
