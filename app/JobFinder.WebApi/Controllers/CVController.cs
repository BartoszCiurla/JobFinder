using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Domain.Ddd;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.CVs.Commands;
using JobFinder.WebApi.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace JobFinder.WebApi.Controllers
{
  [Authorize(Roles = "Employee")]
  [Route("api/[controller]")]
  public class CVController : BaseController
  {
    public CVController(ControllerBootstraper controllerBootstraper) : base(controllerBootstraper) { }
    [Route("Create")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCVCommand command)
    {
      return await SendCommand(DispatcherActorsNames.CVCommandActor, command);
    }
  }
}
