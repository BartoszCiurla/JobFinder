using System;
using Core.Application.Api.Messages;

namespace JobFinder.Application.Api.JobApplications.Queries
{
  public class GetRecommendedApplicationListQuery : Query
  {
    public Guid OfferId { get; set; }
  }
}
