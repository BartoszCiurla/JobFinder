using System;
using System.Collections.Generic;
using Core.Application.Api.Messages;
using JobFinder.Application.Api.Common.Dtos;
namespace JobFinder.Application.Api.JobApplications.Commands
{
  public class CreateJobApplicationCommand : Command
  {
    public Guid UserId { get; set; }
    public CategoryDto Category { get; set; }
    public ProfessionDto Profession { get; set; }
    public IEnumerable<SkillDto> Skills { get; set; }
    public IEnumerable<LanguageDto> Languages { get; set; }
  }
}
