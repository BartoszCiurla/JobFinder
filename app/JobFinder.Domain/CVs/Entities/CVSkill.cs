using System;
using Core.Domain.Ddd;
using JobFinder.Domain.Common;
namespace JobFinder.Domain.CVs.Entities
{
    public class CVSkill : Entity
    {
        public Guid CVId { get; private set; }
        public string Skill { get; private set; }
        public SkillLevel SkillLevel { get; private set; }
        protected CVSkill() : base(Guid.Empty) { }
        protected CVSkill(Guid id, Guid cVId, string skill, SkillLevel skillLevel) : base(id)
        {
            CVId = cVId;
            Skill = skill;
            SkillLevel = skillLevel;
        }
        public static CVSkill Create(Guid id, Guid cVId, string skill, SkillLevel skillLevel)
        {
            return new CVSkill(id, cVId, skill, skillLevel);
        }
    }
}
