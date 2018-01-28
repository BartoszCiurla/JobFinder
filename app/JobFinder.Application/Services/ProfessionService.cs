using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Domain.Ddd;
using JobFinder.Application.Api.Offer.Commands;
using JobFinder.Domain.Professions.Entities;
namespace JobFinder.Application.Services
{
    public class ProfessionService
    {
        public static async Task<Profession> GetOrCreate(Guid id, string name, IRepository<Profession> repository, ProfessionCategory category)
        {
            Profession profession = id == Guid.Empty? null : repository.Query().FirstOrDefault(x => x.Id == id);
            if (profession == null)
            {
                profession = Profession.Create(Guid.NewGuid(), name, category);
                repository.Add(profession);
                await repository.SaveChangesAsync();
            }
            return profession;
        }
    }
}
