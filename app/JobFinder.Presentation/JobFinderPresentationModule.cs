using Akka.Actor;
using Autofac;
using Core.Presentation.Actors;

namespace JobFinder.Presentation
{
    public class JobFinderPresentationModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(ThisAssembly)
                   .Where(t => t.IsAssignableTo<ReceiveActor>())
                   .AsSelf();

            builder.RegisterAssemblyTypes(ThisAssembly)
                   .AsImplementedInterfaces()
                   .PreserveExistingDefaults();
        }
    }
}
