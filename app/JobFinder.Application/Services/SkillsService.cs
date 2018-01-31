using System;
using System.Collections.Generic;
using System.Linq;
using Core.Application.Exceptions;
using JobFinder.Application.Api.Common.Dtos;
using JobFinder.Domain.JobApplications.Entities;
using JobFinder.Domain.Professions.Entities;
namespace JobFinder.Application.Services
{
    public class SkillsService
    {
        public static IEnumerable<JobApplicationSkill> Create(Guid jobApplicationId, Profession profession, IEnumerable<SkillDto> skills)
        {
            foreach (var skill in skills)
            {
                var proposedSkill = profession.ProposedSkills.FirstOrDefault(ps => ps.Description == skill.Description);
                if (proposedSkill == null)
                {
                    throw new NotFoundApplicationException($"Umiejętność nie istnieje {skill.Description}");
                }
                yield return JobApplicationSkill.Create(Guid.NewGuid(), jobApplicationId, proposedSkill, skill.Level);
            }
        }
    }
}
