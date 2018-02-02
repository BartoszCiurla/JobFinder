using System;
using Core.Domain.Ddd;
using JobFinder.Domain.Professions.Entities;
namespace JobFinder.Domain.JobApplications.Entities
{
    public class JobApplicationCertificate : Entity
    {
        public Guid JobApplicationId { get; set; }
        public ProposedCertificate Certificate { get; set; }
        protected JobApplicationCertificate() : base(Guid.Empty) { }
        protected JobApplicationCertificate(Guid id,
            Guid jobApplicationId,
            ProposedCertificate certificate) : base(id)
        {
            JobApplicationId = jobApplicationId;
            Certificate = certificate;
        }
        public static JobApplicationCertificate Create(Guid id,
            Guid jobApplicationId,
            ProposedCertificate certificate)
        {
            return new JobApplicationCertificate(id, jobApplicationId, certificate);
        }
    }
}
