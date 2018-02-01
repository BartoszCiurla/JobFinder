using System;
using System.Collections.Generic;
using System.Linq;
using Core.Application.Api.Messages;

namespace JobFinder.Application.Api.Professions.Queries
{
  public class GetProposedSkillsResult : QueryResult
  {
    public IEnumerable<ProposedSkillDto> ProposedSkills { get; set; }

    public GetProposedSkillsResult()
    {
        ProposedSkills = Enumerable.Empty<ProposedSkillDto>();
    }

    public GetProposedSkillsResult(IEnumerable<ProposedSkillDto> proposedSkills)
    {
      ProposedSkills = proposedSkills;
    }

    public class ProposedSkillDto
    {
      public Guid Id { get; set; }
      public Guid ProfessionId { get; set; }
      public string Description { get; set; }
      public ProposedSkillDto(Guid id, Guid professionId, string description)
      {
        Id = id;
        ProfessionId = professionId;
        Description = description;
      }
    }
  }
}
