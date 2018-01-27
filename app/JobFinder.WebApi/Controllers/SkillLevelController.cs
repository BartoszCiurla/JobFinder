using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Domain.Ddd;
using JobFinder.Application.Api.Common;
using JobFinder.Domain.Common;
using JobFinder.WebApi.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobFinder.WebApi.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  public class SkillLevelController : BaseController
  {
    public SkillLevelController(ControllerBootstraper controllerBootstraper) : base(controllerBootstraper)
    { }

    [Route("GetSkillLevels")]
    [HttpGet]
    public IActionResult GetSkillLevels()
    {
      return Ok(new {SkillLevels = Enum.GetNames(typeof(SkillLevel)).ToList()});
    }
  }
}
