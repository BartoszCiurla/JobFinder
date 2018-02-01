using System;
using Core.Domain.Ddd;

namespace JobFinder.Domain.Professions.Entities
{
  public class ProposedCertificate : Entity
  {
    public Guid ProfessionCategoryId { get; set; }
    public string Title { set; get; }
    protected ProposedCertificate() : base(Guid.Empty)
    {
    }
    protected ProposedCertificate(Guid id, Guid professionCategoryId, string title) : base(id)
    {
      Title = title;
      ProfessionCategoryId = professionCategoryId;
    }

    public static ProposedCertificate Create(Guid id, Guid professionCategoryId, string title)
    {
      return new ProposedCertificate(id, professionCategoryId, title);
    }
  }
}
