using System;
using Core.Application.Api.Messages;

namespace JobFinder.Application.Api.Offer.Commands
{
  public class DeleteOfferCommand : Command
  {
    public Guid OfferId { get; set; }
  }
}
