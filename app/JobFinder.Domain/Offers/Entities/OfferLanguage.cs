using System;
using Core.Domain.Ddd;
using JobFinder.Domain.Languages.Entities;

namespace JobFinder.Domain.Offers.Entities
{
  public class OfferLanguage : Entity
  {
    public Guid OfferId { get; set; }
    public ProposedLanguage Language { get; set; }
    public int Level { get; set; }
    protected OfferLanguage() : base(Guid.Empty) { }
    protected OfferLanguage(Guid id, Guid offerId, ProposedLanguage language, int level) : base(id)
    {
      OfferId = offerId;
      Language = language;
      Level = level;
    }
    public static OfferLanguage Create(Guid id, Guid offerId, ProposedLanguage language, int level)
      => new OfferLanguage(id, offerId, language, level);
  }
}
