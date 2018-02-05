using System;
using Core.Application.Exceptions;
using Core.Domain.Ddd;
using JobFinder.Application.Api.Common.Dtos;
using JobFinder.Domain.JobApplications.Entities;
using JobFinder.Domain.Professions.Entities;
using System.Collections.Generic;
using System.Linq;
namespace JobFinder.Application.Services
{
    public class SkillsService
    {
        public static IEnumerable<T> Create<T> (Guid foreignKeyId, Profession profession, IEnumerable<SkillDto> skills) where T : Entity
        {
            foreach (var skill in skills)
            {
                var proposedSkill = profession.ProposedSkills.FirstOrDefault (ps => ps.Description == skill.Description);
                if (proposedSkill == null)
                {
                    throw new NotFoundApplicationException ($"Umiejętność nie istnieje {skill.Description}");
                }
                yield return (T)typeof(T).GetMethod("Create").Invoke (null, new object [] { Guid.NewGuid (), foreignKeyId, proposedSkill, skill.Level });
            }
        }
    }
}
