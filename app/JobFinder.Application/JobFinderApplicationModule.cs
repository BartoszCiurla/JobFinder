using Akka.Actor;
using Autofac;
namespace JobFinder.Application
{
  public class JobFinderApplicationModule : Module
  {
    protected override void Load (ContainerBuilder builder)
    {
      builder.RegisterAssemblyTypes (ThisAssembly)
        .Where (t => t.IsAssignableTo<ReceiveActor> ())
        .AsSelf ();
      builder.RegisterAssemblyTypes (ThisAssembly)
        .AsImplementedInterfaces ()
        .PreserveExistingDefaults ();
    }
  }
}
