using System;
using System.Collections.Generic;
using System.Linq;
using Core.Application.Exceptions;
using JobFinder.Application.Api.Common.Dtos;
using JobFinder.Domain.JobApplications.Entities;
using JobFinder.Domain.Professions.Entities;
namespace JobFinder.Application.Services
{
    public class CertificatesService
    {
        public static IEnumerable<JobApplicationCertificate> Create(Guid jobApplicationId, ProfessionCategory professionCategory, IEnumerable<CertificateDto> certificates)
        {
            foreach (var certificate in certificates)
            {
                var proposedCertificate = professionCategory.ProposedCertificates.FirstOrDefault(pc => pc.Title == certificate.Title);
                if (proposedCertificate == null)
                {
                    throw new NotFoundApplicationException($"Certifikat nie istnieje {certificate.Title}");
                }
                yield return JobApplicationCertificate.Create(Guid.NewGuid(), jobApplicationId, proposedCertificate);
            }
        }
    }
}
