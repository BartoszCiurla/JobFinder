using JobFinder.Infrastructure.Ef;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
namespace JobFinder.DbMigration
{
    public class JobFinderContextFactory : IDesignTimeDbContextFactory<JobFinderContext>
    {
        public JobFinderContext CreateDbContext(string[] arg)
        {
            var options = new DbContextOptionsBuilder<JobFinderContext>();
            options.UseSqlServer("Data Source=localhost;Database=JobFinderDatabase;User Id=SA;Password=Pa$$word;",
                b => b.MigrationsAssembly("JobFinder.DbMigration"));
            return new JobFinderContext(options.Options);
        }
    }
}
