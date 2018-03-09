using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Domain.Ddd;
using JobFinder.Application.Api.Common;
using JobFinder.Application.Api.JobApplications.Queries;
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
    public OfferController(ControllerBootstraper controllerBootstraper) : base(controllerBootstraper) { }

    [Route("Create")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateOfferCommand command)
    {
      return await SendCommand(DispatcherActorsNames.OfferCommandActor, command);
    }

    [Route("GetEmployerOfferDetails")]
    [HttpGet]
    public async Task<IActionResult> GetEmployerOfferDetails([FromQuery] GetEmployerOfferDetailsQuery query)
    {
      return await SendQuery(DispatcherActorsNames.OfferQueryActor, query);
    }

    [Route("GetEmployerOffersList")]
    [HttpGet]
    public async Task<IActionResult> GetEmployerOffersList([FromQuery] GetEmployerOffersListQuery query)
    {
      return await SendQuery(DispatcherActorsNames.OfferQueryActor, query);
    }

    [Route("DeleteOffer")]
    [HttpDelete]
    public async Task<IActionResult> DeleteOffer([FromQuery] DeleteOfferCommand command)
    {
      return await SendCommand(DispatcherActorsNames.OfferCommandActor, command);
    }

    [Route("GetRecommendedApplicationList")]
    [HttpGet]
    public async Task<IActionResult> GetRecommendedApplicationList([FromQuery] GetRecommendedApplicationListQuery query)
    {
      return await SendQuery(DispatcherActorsNames.RecommendationQueryActor, query);
    }
  }
}
