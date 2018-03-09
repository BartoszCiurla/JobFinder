using System.IO;
using System.Runtime.InteropServices;
using Autofac;
using JobFinder.Infrastructure.Ef;
using JobFinder.Infrastructure.Ef.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Serilog;
using Serilog.AspNetCore;
namespace JobFinder.Infrastructure
{
  public class JobFinderInfrastructureModule : Module
  {
    protected override void Load(ContainerBuilder builder)
    {
      builder.RegisterAssemblyTypes(ThisAssembly)
        .AsImplementedInterfaces()
        .PreserveExistingDefaults();
      RegisterDatabaseAndRepositories(builder);
      RegisterLogger(builder);
    }
    private static void RegisterLogger(ContainerBuilder builder)
    {
      builder.Register(ctx => new LoggerConfiguration()
          .MinimumLevel.Debug()
          .WriteTo.RollingFile(Path.Combine("Logs", "JobFinder-{Date}.txt"))
          .WriteTo.Trace()
          .WriteTo.Console()
          .CreateLogger())
        .As<ILogger>()
        .SingleInstance();
    }
    private static void RegisterDatabaseAndRepositories(ContainerBuilder builder)
    {
      builder.Register(ctx =>
        {
          var configuration = ctx.Resolve<IConfiguration>();
          var connectionString = configuration.GetConnectionString(PlatformConfiguration.GetRuntimeInformation());
          var options = new DbContextOptionsBuilder<JobFinderContext>()
            .UseSqlServer(connectionString, b => b.MigrationsAssembly("JobFinder.DbMigration"))
            .Options;
          return new JobFinderContext(options);
        })
        .As<DbContext>()
        .InstancePerDependency();
    }
  }
}
