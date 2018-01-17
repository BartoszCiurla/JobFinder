using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Domain.Ddd;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.JobOffer.Commands;
using JobFinder.WebApi.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobFinder.WebApi.Controllers
{
  [Authorize(Roles = "Employer")]
  [Route("api/[controller]")]
  public class JobOfferController : BaseController
  {
    public JobOfferController(ControllerBootstraper controllerBootstraper) : base(controllerBootstraper)
    { }

    [Route("CreateJobOffer")]
    [HttpPost]
    public async Task<IActionResult> CreateJobOffer([FromBody] CreateJobOfferCommand command)
    {
      return Ok(new {test = "sfsdf"});
    }
  }
}
