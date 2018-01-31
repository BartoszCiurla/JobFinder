using System;

namespace JobFinder.Application.Api.Common.Dtos
{
  public class SkillDto
  {
    public Guid Id { get; set; }
    public Guid ProfessionId { get; set; }
    public string Description { get; set; }
    public int Level { get; set; }
  }
}
