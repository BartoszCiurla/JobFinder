using System;
using System.Collections.Generic;
using Core.Domain.Ddd;

namespace JobFinder.Domain.Professions.Entities
{
  public class ProfessionCategory : AggregateRoot
  {
    public string Name { get; set; }
    protected ProfessionCategory() : base(Guid.Empty)
    {

    }

    protected ProfessionCategory(Guid id,
                                string name) : base(id)
    {
      Name = name;
    }

    public static ProfessionCategory Create(Guid id, string name)
    {
      return new ProfessionCategory(id, name);
    }
  }
}
