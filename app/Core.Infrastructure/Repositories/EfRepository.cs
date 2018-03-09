using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Domain.Ddd;
using Microsoft.EntityFrameworkCore;
namespace Core.Infrastructure.Repositories
{
  public class EfRepository<TAggregate> where TAggregate : class
  {
    private DbContext _context;
    private DbSet<TAggregate> _set;
    public EfRepository(DbContext context)
    {
      _context = context;
      _set = _context.Set<TAggregate>();
    }
    public void Add(TAggregate aggregate) => _set.Add(aggregate);

    public void Update(TAggregate aggregate) => _set.Update(aggregate);

    public async Task Remove(Guid id) => _set.Remove(await _set.FindAsync(id));

    public void Remove(TAggregate aggregate) => _set.Remove(aggregate);

    public IQueryable<TAggregate> Query() => _set.AsQueryable();

    public IQueryable<TAggregate> ReadOnlyQuery() => _set.AsNoTracking();

    public async Task<TAggregate> FindById(Guid id) => await _set.FindAsync(id);
    public async Task SaveChangesAsync() => await _context.SaveChangesAsync();
  }
}
