using System;
using Core.Domain.Ddd;
using JobFinder.Domain.Professions.Entities;
namespace JobFinder.Domain.Offers.Entities
{
  public class Offer : AggregateRoot
  {
    public Profession Profession { get; private set; }
    protected Offer() : base(Guid.Empty)
    { }
    protected Offer(Guid id, Profession profession) : base(id)
    {
      Profession = profession;
    }
    public static Offer Create(Guid id, Profession profession)
    {
      return new Offer(id, profession);
    }
  }
}
