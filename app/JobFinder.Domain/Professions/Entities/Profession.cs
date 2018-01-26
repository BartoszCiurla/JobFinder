using System;
using Core.Domain.Ddd;

namespace JobFinder.Domain.Professions.Entities
{
  public class Profession : Entity
  {
    public string Name { get; set; }
    public ProfessionCategory Category { get; set; }
    protected Profession() : base(Guid.Empty)
    {
    }

    protected Profession(Guid id, string name, ProfessionCategory category) : base(id)
    {
      Name = name;
      Category = category;
    }

    public static Profession Create(Guid id, string name, ProfessionCategory category)
    {
      return new Profession(id, name, category);
    }
  }
}
