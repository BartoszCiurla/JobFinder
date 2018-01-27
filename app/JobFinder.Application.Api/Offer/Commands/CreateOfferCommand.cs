using System;
using Core.Application.Api.Messages;

namespace JobFinder.Application.Api.Offer.Commands
{
  public class CreateOfferCommand : Command
  {
    public Guid UserId { get; set; }
    public string Category { get; set; }
    public string Profession { get; set; }
  }
}
