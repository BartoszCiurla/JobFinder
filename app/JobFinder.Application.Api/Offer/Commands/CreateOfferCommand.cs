using System;
using Core.Application.Api.Messages;
namespace JobFinder.Application.Api.Offer.Commands
{
  public class CreateOfferCommand : Command
  {
    public Guid UserId { get; set; }
    public CategoryDto Category { get; set; }
    public ProfessionDto Profession { get; set; }
  }
  public class CategoryDto
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
  }
  public class ProfessionDto
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
  }
}
