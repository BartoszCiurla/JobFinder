using System;
using Core.Domain.Ddd;
using JobFinder.Domain.Languages.Entities;
namespace JobFinder.Domain.JobApplications.Entities
{
    public class JobApplicationLanguage : Entity
    {
        public Guid JobApplicationId { get; set; }
        public ProposedLanguage Language { get; set; }
        public int Level { get; set; }
        protected JobApplicationLanguage() : base(Guid.Empty) { }
        protected JobApplicationLanguage(Guid id, Guid jobApplicationId, ProposedLanguage language, int level) : base(id)
        {
            JobApplicationId = jobApplicationId;
            Language = language;
            Level = level;
        }
        public static JobApplicationLanguage Create(Guid id, Guid jobApplicationId, ProposedLanguage language, int level)
        {
            return new JobApplicationLanguage(id, jobApplicationId, language, level);
        }
    }
}
