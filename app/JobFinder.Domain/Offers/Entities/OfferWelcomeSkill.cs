using System;
using Core.Domain.Ddd;
using JobFinder.Domain.Professions.Entities;

namespace JobFinder.Domain.Offers.Entities
{
  public class OfferWelcomeSkill : Entity
  {
    public Guid OfferId { get; set; }
    public ProposedSkill Skill { get; set; }
    public int Level { get; set; }
    protected OfferWelcomeSkill() : base(Guid.Empty)
    {

    }
    protected OfferWelcomeSkill(Guid id, Guid offerId, ProposedSkill skill, int level) : base(id)
    {
      OfferId = offerId;
      Skill = skill;
      Level = level;
    }

    public static OfferWelcomeSkill Create(Guid id, Guid offerId, ProposedSkill skill, int level)
    {
      return new OfferWelcomeSkill(id, offerId, skill, level);
    }
  }
}
