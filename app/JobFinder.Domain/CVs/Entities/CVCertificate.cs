using System;
using Core.Domain.Ddd;
namespace JobFinder.Domain.CVs.Entities
{
    public class CVCertificate : Entity
    {
        public Guid CVId { get; private set; }
        public string CertificateName { get; private set; }
        public DateTime FinishDate { get; private set; }
        protected CVCertificate() : base(Guid.Empty) { }
        protected CVCertificate(Guid id, Guid cVId, string certificateName, DateTime finishDate) : base(id)
        {
            CVId = cVId;
            CertificateName = certificateName;
            FinishDate = finishDate;
        }
        public static CVCertificate Create(Guid id, Guid cVId, string certificateName, DateTime finishDate)
        {
            return new CVCertificate(id, cVId, certificateName, finishDate);
        }
    }
}
