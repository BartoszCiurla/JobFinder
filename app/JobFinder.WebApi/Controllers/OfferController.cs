using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Domain.Ddd;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.Offer.Commands;
using JobFinder.Application.Api.Offer.Queries;
using JobFinder.WebApi.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobFinder.WebApi.Controllers
{
  [Authorize(Roles = "Employer")]
  [Route("api/[controller]")]
  public class OfferController : BaseController
  {
    public OfferController(ControllerBootstraper controllerBootstraper) : base(controllerBootstraper)
    {

    }

    [Route("Create")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateOfferCommand command)
    {
      return await SendCommand(DispatcherActorsNames.OfferCommandActor, command);
    }

    [Route("GetEmployerOffersList")]
    [HttpPost]
    public async Task<IActionResult> GetEmployerOffersList([FromBody]GetEmployerOffersListQuery query)
    {
      return await SendQuery(DispatcherActorsNames.OfferQueryActor, query);
    }
  }
}
