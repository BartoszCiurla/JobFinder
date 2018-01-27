using System;
using System.Collections.Generic;
using Core.Application.Api.Messages;

namespace JobFinder.Application.Api.Offer.Queries
{
  public class GetEmployerOffersListResult : QueryResult
  {
    public IEnumerable<OfferDto> Offers { get; set; }

    public GetEmployerOffersListResult(IEnumerable<OfferDto> offers)
    {
      Offers = offers;
    }
    public class OfferDto
    {
      public OfferDto(Guid id, string profession, string professionCategory)
      {
        this.Id = id;
        this.Profession = profession;
        this.ProfessionCategory = professionCategory;

      }
      public Guid Id { get; set; }
      public string Profession { get; set; }
      public string ProfessionCategory { get; set; }

    }
  }
}
