using System.Threading.Tasks;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.Languages.Queries;
using JobFinder.WebApi.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace JobFinder.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class LanguageController : BaseController
    {
        public LanguageController(ControllerBootstraper controllerBootstraper) : base(controllerBootstraper)
        {
        }

        [Route("GetLanguages")]
        [HttpGet]
        public async Task<IActionResult> GetLanguages()
        {
            return await SendQuery(DispatcherActorsNames.LanguageQueryActor, new GetLanguagesListQuery());
        }
    }
}
