using System;
using Core.Application.Api.Messages;

namespace JobFinder.Application.Api.Offer.Queries
{
    public class GetRecommendedOffersListQuery:Query
    {
        public Guid OfferId { get; set; }
    }
}
