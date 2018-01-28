using System;
using Core.Application.Api.Messages;
using JobFinder.Application.Api.Common.Dtos;

namespace JobFinder.Application.Api.Offer.Commands
{
  public class CreateOfferCommand : Command
  {
    public Guid UserId { get; set; }
    public CategoryDto Category { get; set; }
    public ProfessionDto Profession { get; set; }
  }
}
