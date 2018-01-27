using System;
using Core.Application.Api.Messages;

namespace JobFinder.Application.Api.Offer.Queries
{
  public class GetEmployerOffersListQuery : Query
  {
    public Guid UserId { get; set; }
  }
}
