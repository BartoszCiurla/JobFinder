using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Domain.Ddd;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.Employees.Commands;
using JobFinder.WebApi.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobFinder.WebApi.Controllers
{
  [Authorize(Roles = "Employee")]
  [Route("api/[controller]")]
  public class EmployeeController : BaseController
  {
    public EmployeeController(ControllerBootstraper controllerBootstraper) : base(controllerBootstraper)
    { }

    [Route("CreateCV")]
    [HttpPost]
    public async Task<IActionResult> CreateCV([FromBody] CreateCVCommand command)
    {
      return Ok(new {test = "sfsdf"});
    }
  }
}
