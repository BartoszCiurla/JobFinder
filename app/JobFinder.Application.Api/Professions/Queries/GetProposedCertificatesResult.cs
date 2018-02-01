using System;
using System.Collections.Generic;
using System.Linq;
using Core.Application.Api.Messages;

namespace JobFinder.Application.Api.Professions.Queries
{
  public class GetProposedCertificatesResult : QueryResult
  {
    public IEnumerable<ProposedCertificateDto> ProposedCertificates { get; set; }
    public GetProposedCertificatesResult()
    {
      ProposedCertificates = Enumerable.Empty<ProposedCertificateDto>();
    }
    public GetProposedCertificatesResult(IEnumerable<ProposedCertificateDto> proposedCertificates)
    {
      ProposedCertificates = proposedCertificates;
    }
    public class ProposedCertificateDto
    {
      public Guid Id { get; set; }
      public Guid ProfessionCategoryId { get; set; }
      public string Title { get; set; }
      public ProposedCertificateDto(Guid id, Guid professionCategoryId, string title)
      {
          Id = id;
          ProfessionCategoryId = professionCategoryId;
          Title = title;
      }
    }
  }
}
