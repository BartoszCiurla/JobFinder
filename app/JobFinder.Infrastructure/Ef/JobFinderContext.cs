using Microsoft.EntityFrameworkCore;

using JobFinder.Infrastructure.Extensions;
using JobFinder.Domain.Users.Entities;
using System;
using JobFinder.Domain.Users;
using System.Collections.Generic;

namespace JobFinder.Infrastructure.Ef
{
  public class JobFinderContext : DbContext
  {
    public JobFinderContext(DbContextOptions<JobFinderContext> options)
      : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.AddEntityConfigurationsFromAssembly(GetType().Assembly);
    }
  }
}
