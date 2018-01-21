using System;
using Core.Domain.Ddd;
namespace JobFinder.Domain.CVs.Entities
{
    public class CVExperience : Entity
    {
        public Guid CVId { get; set; }
        public string Company { get; private set; }
        public string Role { get; private set; }
        public string Description { get; private set; }
        public DateTime StartDate { get; private set; }
        public DateTime FinishDate { get; private set; }
        protected CVExperience() : base(Guid.Empty)
        { }
        protected CVExperience(Guid id,
            Guid cVId,
            string company,
            string role,
            string description,
            DateTime startDate,
            DateTime finishDate) : base(id)
        {
            CVId = cVId;
            Company = company;
            Role = role;
            Description = description;
            StartDate = startDate;
            FinishDate = finishDate;
        }
        public static CVExperience Create(Guid id,
            Guid cVId,
            string company,
            string role,
            string description,
            DateTime startDate,
            DateTime finishDate)
        {
            return new CVExperience(id, cVId, company, role, description, startDate, finishDate);
        }
    }
}
