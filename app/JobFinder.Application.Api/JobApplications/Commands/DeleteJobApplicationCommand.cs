using System;
using Core.Application.Api.Messages;

namespace JobFinder.Application.Api.JobApplications.Commands
{
  public class DeleteJobApplicationCommand : Command
  {
    public Guid JobApplicationId { get; set; }
  }
}
