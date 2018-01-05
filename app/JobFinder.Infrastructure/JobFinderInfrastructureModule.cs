using Autofac;
using Microsoft.EntityFrameworkCore;
using Serilog.AspNetCore;

using JobFinder.Infrastructure.Ef;
using Serilog;
using System.IO;
using Microsoft.Extensions.Configuration;

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
                                 .WriteTo.RollingFile(Path.Combine("Logs","JobFinder-{Date}.txt"))
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
               var connectionString = configuration.GetConnectionString("JobFinderDatabase");

               var options = new DbContextOptionsBuilder<JobFinderContext>()
                .UseInMemoryDatabase(databaseName: "JustTest")
                .Options;

               return new JobFinderContext(options);
             })
             .As<DbContext>()
             .InstancePerDependency();
    }
  }
}
