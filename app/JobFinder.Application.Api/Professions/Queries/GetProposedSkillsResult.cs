using System;
using System.Collections.Generic;
using Core.Application.Api.Messages;

namespace JobFinder.Application.Api.Professions.Queries
{
  public class GetProposedSkillsResult : QueryResult
  {
    public IEnumerable<ProposedSkillDto> ProposedSkills { get; set; }

    public GetProposedSkillsResult() { }

    public GetProposedSkillsResult(IEnumerable<ProposedSkillDto> proposedSkills)
    {
      ProposedSkills = proposedSkills;
    }

    public class ProposedSkillDto
    {
      public Guid Id { get; set; }
      public string Description { get; set; }
      public ProposedSkillDto(Guid id, string description)
      {
        Id = id;
        Description = description;
      }
    }
  }
}
