using System;
using System.IO;
using System.Reflection;
using JobFinder.Infrastructure.Ef;
using JobFinder.Infrastructure.Ef.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
namespace JobFinder.DbMigration
{
    public class JobFinderContextFactory : IDesignTimeDbContextFactory<JobFinderContext>
    {
        public JobFinderContext CreateDbContext(string[] arg)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", true, true)
                .Build();

            var options = new DbContextOptionsBuilder<JobFinderContext>()
                .UseSqlServer(configuration.GetConnectionString(PlatformConfiguration.GetRuntimeInformation()),
                    b => b.MigrationsAssembly("JobFinder.DbMigration")).Options;

            return new JobFinderContext(options);
        }
    }
}
