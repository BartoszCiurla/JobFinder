using System;
using System.Collections.Generic;
using Core.Application.Api.Messages;
using JobFinder.Application.Api.Common.Dtos;

namespace JobFinder.Application.Api.Offer.Commands
{
  public class CreateOfferCommand : Command
  {
    public Guid UserId { get; set; }
    public CategoryDto Category { get; set; }
    public ProfessionDto Profession { get; set; }
    public decimal Salary { get; set; }
    public bool CertificatesWillBeAnAdvantage { get; set; }
    public IEnumerable<SkillDto> RequiredSkills { get; set; }
    public IEnumerable<SkillDto> WelcomeSkills { get; set; }
    public IEnumerable<LanguageDto> Languages { get; set; }
  }
}
