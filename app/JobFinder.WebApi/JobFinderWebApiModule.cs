using Autofac;

using Core.Domain;
using Core.Infrastructure;
using Core.Presentation;
using JobFinder.Infrastructure;
using JobFinder.WebApi.Authorization;
using JobFinder.Application;
using JobFinder.WebApi.Core;
using Core.Akka;
using Core.Akka.ActorSystem;
using Core.Application;
using JobFinder.Presentation;

namespace JobFinder.WebApi
{
  public class JobFinderWebApiModule : Module
  {
    protected override void Load(ContainerBuilder builder)
    {
      builder.RegisterModule<CoreInfrastructureModule>();
      builder.RegisterModule<CoreApplicationModule>();
      builder.RegisterModule<CoreDomainModule>();
      builder.RegisterModule<CorePresentationModule>();
      builder.RegisterModule<JobFinderPresentationModule>();
      builder.RegisterModule<JobFinderInfrastructureModule>();
      builder.RegisterModule<JobFinderApplicationModule>();
      builder.RegisterModule<CoreAkkaModule>();

      builder.RegisterAssemblyTypes(ThisAssembly)
             .AsImplementedInterfaces()
             .PreserveExistingDefaults();

      builder.RegisterType<ControllerBootstraper>().AsSelf();
      builder.RegisterType<JwtTokenGenerator>().SingleInstance();
      builder.RegisterType<JwtTokenMiddleware>().SingleInstance();
    }
  }
}
