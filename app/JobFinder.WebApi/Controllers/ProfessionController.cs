using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Domain.Ddd;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.Languages.Queries;
using JobFinder.Application.Api.Professions.Queries;
using JobFinder.Domain.Common;
using JobFinder.WebApi.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace JobFinder.WebApi.Controllers
{
  [Route ("api/[controller]")]
  public class ProfessionController : BaseController
  {
    public ProfessionController (ControllerBootstraper controllerBootstraper) : base (controllerBootstraper) { }
    [Route ("GetProfessions")]
    [HttpGet]
    public async Task<IActionResult> GetProfessions ()
    {
      return await SendQuery (DispatcherActorsNames.ProfessionQueryActor, new GetProfessionsQuery ());
    }
    [Route ("GetProposedSkills")]
    [HttpGet]
    public async Task<IActionResult> GetProposedSkills ([FromQuery] GetProposedSkillsQuery query)
    {
      return await SendQuery (DispatcherActorsNames.ProfessionQueryActor, query);
    }
    [Route ("GetLanguages")]
    [HttpGet]
    public async Task<IActionResult> GetLanguages ()
    {
      return await SendQuery (DispatcherActorsNames.ProfessionQueryActor, new GetLanguagesListQuery ());
    }
    [Route ("GetProposedCertificates")]
    [HttpGet]
    public async Task<IActionResult> GetProposedCertificates ([FromQuery] GetProposedCertificatesQuery query)
    {
      return await SendQuery (DispatcherActorsNames.ProfessionQueryActor, query);
    }
  }
}
