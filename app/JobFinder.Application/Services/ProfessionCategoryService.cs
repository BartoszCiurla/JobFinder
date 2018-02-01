using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Domain.Ddd;
using JobFinder.Application.Api.Offer.Commands;
using JobFinder.Domain.Professions.Entities;
namespace JobFinder.Application.Services
{
    public class ProfessionCategoryService
    {
        public static ProfessionCategory GetOrCreate(Guid id, string name, IRepository<ProfessionCategory> repository)
        {
            ProfessionCategory professionCategory = id == Guid.Empty? null : repository
                .Query()
                .FirstOrDefault(x => x.Id == id);
            if (professionCategory == null)
            {
                professionCategory = ProfessionCategory.Create(Guid.NewGuid(), name, new List<ProposedCertificate>());
                repository.Add(professionCategory);
            }
            return professionCategory;
        }
    }
}
