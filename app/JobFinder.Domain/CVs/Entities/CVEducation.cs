using System;
using Core.Domain.Ddd;
namespace JobFinder.Domain.CVs.Entities
{
    public class CVEducation : Entity
    {
        public Guid CVId { get; private set; }
        public string SchoolName { get; private set; }
        public string Description { get; private set; }
        public DateTime StartDate { get; private set; }
        public DateTime FinishDate { get; private set; }
        protected CVEducation() : base(Guid.Empty) { }
        protected CVEducation(Guid id,
            Guid cVId,
            string schoolName,
            string description,
            DateTime startDate,
            DateTime finishDate) : base(id)
        {
            CVId = cVId;
            SchoolName = schoolName;
            Description = description;
            StartDate = startDate;
            FinishDate = finishDate;
        }
        public static CVEducation Create(Guid id,
            Guid cVId,
            string schoolName,
            string description,
            DateTime startDate,
            DateTime finishDate)
        {
            return new CVEducation(id, cVId, schoolName, description, startDate, finishDate);
        }
    }
}
