using System;
using Core.Domain.Ddd;
using JobFinder.Domain.Professions.Entities;
using JobFinder.Domain.Users.Entities;
namespace JobFinder.Domain.Offers.Entities
{
  public class Offer : AggregateRoot
  {
    public User User { get; private set; }
    public Profession Profession { get; private set; }
    protected Offer() : base(Guid.Empty) { }
    protected Offer(Guid id, User user, Profession profession) : base(id)
    {
      User = user;
      Profession = profession;
    }
    public static Offer Create(Guid id, User user, Profession profession)
    {
      return new Offer(id, user, profession);
    }
  }
}
