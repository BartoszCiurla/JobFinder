using System;
using Core.Application.Api.Messages;
using JobFinder.Application.Api.Common.Dtos;
namespace JobFinder.Application.Api.JobApplications.Commands
{
    public class CreateJobApplicationCommand : Command
    {
        public Guid UserId { get; set; }
        public CategoryDto Category { get; set; }
        public ProfessionDto Profession { get; set; }
    }
}
