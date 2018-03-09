using System;
using Core.Domain.Ddd;

namespace JobFinder.Domain.Professions.Entities
{
  public class ProposedSkill : Entity
  {
    public Guid ProfessionId { get; private set; }
    public string Description { get; private set; }
    protected ProposedSkill() : base(Guid.Empty){}
    protected ProposedSkill(Guid id, Guid professionId, string description) : base(id)
    {
      Description = description;
      ProfessionId = professionId;
    }

    public static ProposedSkill Create(Guid id, Guid professionId, string description)
      => new ProposedSkill(id, professionId, description);
  }
}
