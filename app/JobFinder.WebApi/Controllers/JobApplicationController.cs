using System.Threading.Tasks;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.JobApplications.Commands;
using JobFinder.Application.Api.JobApplications.Queries;
using JobFinder.WebApi.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace JobFinder.WebApi.Controllers
{
    [Authorize(Roles = "Employee")]
    [Route("api/[controller]")]
    public class JobApplicationController : BaseController
    {
        public JobApplicationController(ControllerBootstraper controllerBootstraper) : base(controllerBootstraper) { }
        [Route("Create")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateJobApplicationCommand command)
        {
            return await SendCommand(DispatcherActorsNames.JobApplicationCommandActor, command);
        }
        [Route("GetEmployeeJobApplicationList")]
        [HttpPost]
        public async Task<IActionResult> GetEmployeeJobApplicationList([FromBody] GetEmployeeJobApplicationListQuery query)
        {
            return await SendQuery(DispatcherActorsNames.JobApplicationQueryActor, query);
        }
    }
}
