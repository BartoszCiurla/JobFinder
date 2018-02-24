using System;
using System.Collections.Generic;
using Core.Application.Api.Messages;

namespace JobFinder.Application.Api.JobApplications.Queries
{
  public class GetRecommendedApplicationListResult : QueryResult
  {
    public IEnumerable<RecommendedJobApplicationDto> RecommendedJobApplications { get; set; }
    public GetRecommendedApplicationListResult(IEnumerable<RecommendedJobApplicationDto> recommendedJobApplications)
    {
      RecommendedJobApplications = recommendedJobApplications;
    }
    public class RecommendedJobApplicationDto
    {
      public Guid Id { get; set; }
      public string Profession { get; set; }
      public string ProfessionCategory { get; set; }
      public double Score { get; set; }
      public RecommendedJobApplicationDto(Guid id,
               string profession,
               string professionCategory)
      {
        Id = id;
        Profession = profession;
        ProfessionCategory = professionCategory;
      }
    }
  }
}
