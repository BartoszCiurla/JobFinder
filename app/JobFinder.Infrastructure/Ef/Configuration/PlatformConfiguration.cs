using System.Runtime.InteropServices;
namespace JobFinder.Infrastructure.Ef.Configuration
{
    public class PlatformConfiguration
    {
        public static string GetRuntimeInformation() => RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ?
            "JobFinderDbWindows" :
            "JobFinderDbLinux";
    }
}
