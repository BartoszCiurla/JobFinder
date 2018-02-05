using System;
using Core.Domain.Ddd;
using JobFinder.Domain.Common;
using JobFinder.Domain.Professions.Entities;

namespace JobFinder.Domain.Offers.Entities
{
  public class OfferRequiredSkill : Entity
  {
    public Guid OfferId { get; set; }
    public ProposedSkill Skill { get; set; }
    public int Level { get; set; }
    protected OfferRequiredSkill() : base(Guid.Empty)
    {

    }
    protected OfferRequiredSkill(Guid id, Guid offerId, ProposedSkill skill, int level) : base(id)
    {
      OfferId = offerId;
      Skill = skill;
      Level = level;
    }

    public static OfferRequiredSkill Create(Guid id, Guid offerId, ProposedSkill skill, int level)
    {
      return new OfferRequiredSkill(id, offerId, skill, level);
    }
  }
}
