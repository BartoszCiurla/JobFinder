using System;
using Core.Application.Api.Messages;

namespace JobFinder.Application.Api.Professions.Queries
{
  public class GetProposedSkillsQuery : Query
  {
    public Guid ProfessionCategoryId { get; set; }
    public Guid ProfessionId { get; set; }
  }
}
