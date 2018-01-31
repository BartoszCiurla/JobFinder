using System;
using Core.Domain.Ddd;

namespace JobFinder.Domain.Professions.Entities
{
  public class ProposedSkill : Entity
  {
    public Guid ProfessionId { get; set; }
    public string Description { get; set; }
    protected ProposedSkill() : base(Guid.Empty)
    {

    }
    protected ProposedSkill(Guid id, Guid professionId, string description) : base(id)
    {
      Description = description;
      ProfessionId = professionId;
    }

    public static ProposedSkill Create(Guid id, Guid professionId, string description)
    {
      return new ProposedSkill(id, professionId, description);
    }
  }
}
