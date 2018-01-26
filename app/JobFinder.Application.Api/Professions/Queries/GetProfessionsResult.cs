using System;
using System.Collections.Generic;
using Core.Application.Api.Messages;

namespace JobFinder.Application.Api.Professions.Queries
{
  public class GetProfessionsResult : QueryResult
  {
    public IEnumerable<ProfessionCategoryDto> ProfessionCategories { get; set; }
    public GetProfessionsResult()
    {

    }
    public GetProfessionsResult(IEnumerable<ProfessionCategoryDto> professionCategories)
    {
      ProfessionCategories = professionCategories;
    }

    public class ProfessionCategoryDto
    {
      public Guid Id { get; set; }
      public string Name { get; set; }
      public IEnumerable<ProfessionDto> ProfessionNames { get; set; }
      public ProfessionCategoryDto(Guid id, string name, IEnumerable<ProfessionDto> professionNames)
      {
        Id = id;
        Name = name;
        ProfessionNames = professionNames;
      }
    }
    public class ProfessionDto
    {
      public Guid Id { get; set; }
      public string Name { get; set; }
      public ProfessionDto(Guid id, string name)
      {
        Id = id;
        Name = name;
      }
    }
  }

}
