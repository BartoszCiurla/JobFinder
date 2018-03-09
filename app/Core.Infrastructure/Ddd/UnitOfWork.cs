using Core.Domain.Ddd;
using Core.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
namespace Core.Infrastructure.Ddd
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly DbContext _context;
    public UnitOfWork(DbContext context)
    {
      _context = context;
    }
    public IRepository<TAggregate> GetRepository<TAggregate>() where TAggregate : AggregateRoot
      => new Repository<TAggregate>(new EfRepository<TAggregate>(_context));

    public void Dispose() => _context?.Dispose();
  }
}
