using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Domain.Ddd;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.Professions.Queries;
using JobFinder.Domain.Common;
using JobFinder.WebApi.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobFinder.WebApi.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  public class ProfessionController : BaseController
  {
    public ProfessionController(ControllerBootstraper controllerBootstraper) : base(controllerBootstraper)
    { }

    [Route("GetProfessions")]
    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetProfessions()
    {
      return await SendQuery(DispatcherActorsNames.ProfessionQueryActor, new GetProfessionsQuery());
    }

    [Route("GetProposedSkills")]
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> GetProposedSkills([FromBody]GetProposedSkillsQuery query)
    {
      return await SendQuery(DispatcherActorsNames.ProfessionQueryActor, query);
    }
  }
}
