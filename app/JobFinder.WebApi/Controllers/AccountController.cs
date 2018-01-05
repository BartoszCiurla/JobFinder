using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using JobFinder.Application.Api.Users;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Users;
using JobFinder.Domain.Users.Entities;
using JobFinder.WebApi.Core;
using Core.Domain.Ddd;
using Microsoft.AspNetCore.Authorization;
using JobFinder.Application.Api.Users.Queries;

namespace JobFinder.WebApi.Controllers
{
  [Authorize(Roles = "Admin")]
  [Route("api/[controller]")]
  public class AccountController : BaseController
  {

    public AccountController(ControllerBootstraper controllerBootstraper) : base(controllerBootstraper)
    {
    }

    [Route("RegisterUser")]
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> RegisterUser([FromForm]RegisterUserCommand command)
    {
      return await SendCommand(DispatcherActorsNames.UserCommandActor, command);
    }

    [Route("GetUsers")]
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
      return await SendQuery(DispatcherActorsNames.UserQueryActor, new GetUsersQuery());
    }
  }
}
