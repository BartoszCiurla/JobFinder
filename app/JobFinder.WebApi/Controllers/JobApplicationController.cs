using System.Threading.Tasks;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.JobApplications.Commands;
using JobFinder.Application.Api.JobApplications.Queries;
using JobFinder.Application.Api.Offer.Queries;
using JobFinder.WebApi.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace JobFinder.WebApi.Controllers
{
    [Authorize (Roles = "Employee")]
    [Route ("api/[controller]")]
    public class JobApplicationController : BaseController
    {
        public JobApplicationController (ControllerBootstraper controllerBootstraper) : base (controllerBootstraper) { }
        [Route ("Create")]
        [HttpPost]
        public async Task<IActionResult> Create ([FromBody] CreateJobApplicationCommand command)
        {
            return await SendCommand (DispatcherActorsNames.JobApplicationCommandActor, command);
        }
        [Route ("GetEmployeeJobApplicationList")]
        [HttpGet]
        public async Task<IActionResult> GetEmployeeJobApplicationList ([FromQuery] GetEmployeeJobApplicationListQuery query)
        {
            return await SendQuery (DispatcherActorsNames.JobApplicationQueryActor, query);
        }
        [Route ("GetRecommendedOfferList")]
        [HttpGet]
        public async Task<IActionResult> GetRecommendedOfferList ([FromQuery] GetRecommendedOffersListQuery query)
        {
            return await SendQuery (DispatcherActorsNames.OffersRecommendationQueryActor, query);
        }
    }
}
