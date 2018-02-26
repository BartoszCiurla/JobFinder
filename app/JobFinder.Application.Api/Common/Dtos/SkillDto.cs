using System;
namespace JobFinder.Application.Api.Common.Dtos
{
  public class SkillDto
  {
    public Guid Id { get; set; }
    public Guid ProfessionId { get; set; }
    public string Description { get; set; }
    public int Level { get; set; }
    public SkillDto ()
    {
    }
    public SkillDto (Guid id, Guid professionId, string description, int level)
    {
      Id = id;
      ProfessionId = professionId;
      Description = description;
      Level = level;
    }
  }
}
