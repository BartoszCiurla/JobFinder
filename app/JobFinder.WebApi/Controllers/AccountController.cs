using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Domain.Ddd;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.Users;
using JobFinder.Application.Api.Users.Queries;
using JobFinder.Application.Users;
using JobFinder.Domain.Users;
using JobFinder.Domain.Users.Entities;
using JobFinder.WebApi.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace JobFinder.WebApi.Controllers
{
  [Route("api/[controller]")]
  public class AccountController : BaseController
  {
    public AccountController(ControllerBootstraper controllerBootstraper) : base(controllerBootstraper)
    { }
    [Route("RegisterUser")]
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> RegisterUser([FromBody] RegisterUserCommand command)
    {
      return await SendCommand(DispatcherActorsNames.UserCommandActor, command);
    }
    [Route("GetUsers")]
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
      return await SendQuery(DispatcherActorsNames.UserQueryActor, new GetUsersQuery());
    }
    [Route("GetUserTypes")]
    [HttpGet]
    [AllowAnonymous]
    public IActionResult GetUserTypes()
    {
      return Ok(new {UserTypes = Enum.GetNames(typeof(UserType)).ToList().Where(x => x != "Admin")});
    }
  }
}
