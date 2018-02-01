using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Domain.Ddd;
using JobFinder.Application.Api.Common.Dtos;
using JobFinder.Application.Api.Offer.Commands;
using JobFinder.Domain.Professions.Entities;
using Microsoft.EntityFrameworkCore;
namespace JobFinder.Application.Services
{
  public class ProfessionService
  {
    public static Profession GetOrCreate(Guid id,
      string name,
      IRepository<Profession> repository,
      ProfessionCategory category,
      IEnumerable<SkillDto> skills)
    {
      Profession profession = id == Guid.Empty ? null : repository.Query().Include(x => x.ProposedSkills).FirstOrDefault(x => x.Id == id);
      if (profession == null)
      {
        var professionId = Guid.NewGuid();
        profession = Profession.Create(professionId, name, category,
          skills.Select(x => ProposedSkill.Create(Guid.NewGuid(), professionId, x.Description)).ToList());
        repository.Add(profession);
        return profession;
      }
      foreach (var proposedSkill in skills.Where(x => x.ProfessionId == Guid.Empty)
          .Select(x => ProposedSkill.Create(Guid.NewGuid(), profession.Id, x.Description)))
      {
        profession.AddProposedSkill(proposedSkill);
      }
      repository.Update(profession);
      return profession;
    }
  }
}
