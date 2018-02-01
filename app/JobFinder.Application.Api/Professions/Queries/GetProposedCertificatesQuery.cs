using System;
using Core.Application.Api.Messages;

namespace JobFinder.Application.Api.Professions.Queries
{
  public class GetProposedCertificatesQuery : Query
  {
    public Guid ProfessionCategoryId { get; set; }
  }
}
