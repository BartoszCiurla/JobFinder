using System;
using Core.Application.Api.Messages;
namespace JobFinder.Application.Api.JobApplications.Queries
{
    public class GetEmployeeJobApplicationListQuery : Query
    {
        public Guid UserId { get; set; }
    }
}
