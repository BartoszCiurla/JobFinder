using System;
using Core.Domain.Ddd;
using JobFinder.Application.Api.Common.Dtos;
using JobFinder.Application.Api.Offer.Commands;
using JobFinder.Domain.Professions.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace JobFinder.Application.Services
{
  public class ProfessionCategoryService
  {
    public static ProfessionCategory GetOrCreate (Guid id, string name, IEnumerable<CertificateDto> certificates, IRepository<ProfessionCategory> repository)
    {
      ProfessionCategory professionCategory = id == Guid.Empty ? null : repository
        .Query ()
        .Include (x => x.ProposedCertificates)
        .FirstOrDefault (x => x.Id == id);
      if (professionCategory == null)
      {
        var professionCategoryId = Guid.NewGuid ();
        professionCategory = ProfessionCategory
          .Create (professionCategoryId, name,
            certificates.Select (c => ProposedCertificate
              .Create (Guid.NewGuid (), professionCategoryId, c.Title)).ToList ());

        AddOrUpdateCertificates(professionCategory,certificates);

        repository.Add (professionCategory);

        return professionCategory;

      }

      AddOrUpdateCertificates(professionCategory,certificates);

      repository.Update (professionCategory);

      return professionCategory;
    }
    private static void AddOrUpdateCertificates (ProfessionCategory professionCategory, IEnumerable<CertificateDto> certificates)
    {
      foreach (var proposedCertificate in certificates.Where (c => c.ProfessionCategoryId == Guid.Empty)
          .Select (c => ProposedCertificate.Create (Guid.NewGuid (), professionCategory.Id, c.Title)))
      {
        professionCategory.AddProposedCertificate (proposedCertificate);
      }
    }
  }
}
