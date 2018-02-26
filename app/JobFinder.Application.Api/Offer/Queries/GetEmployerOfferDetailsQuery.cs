using System;
using Core.Application.Api.Messages;
namespace JobFinder.Application.Api.Offer.Queries
{
    public class GetEmployerOfferDetailsQuery : Query
    {
        public Guid OfferId { get; set; }
    }
}
