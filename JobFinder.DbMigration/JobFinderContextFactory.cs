using System.Runtime.InteropServices;
using JobFinder.Infrastructure.Ef;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
namespace JobFinder.DbMigration
{
    public class JobFinderContextFactory : IDesignTimeDbContextFactory<JobFinderContext>
    {
        public JobFinderContext CreateDbContext(string[] arg)
        {
            var options = new DbContextOptionsBuilder<JobFinderContext>();
            options.UseSqlServer(GetConnectionStringForOperatingSystem(),
                b => b.MigrationsAssembly("JobFinder.DbMigration"));
            return new JobFinderContext(options.Options);
        }

        //todo i got big problem here, because this project run only when i made migration so i don't have access to configuration ...
        private static string GetConnectionStringForOperatingSystem()
        {
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                return "Server = localhost\\SQLEXPRESS; Database = JobFinder; Trusted_Connection = True;";
            }
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            {
                return "Data Source=localhost;Database=JobFinder;User Id=SA;Password=Pa$$word;";
            }
            return "";
        }
    }
}
