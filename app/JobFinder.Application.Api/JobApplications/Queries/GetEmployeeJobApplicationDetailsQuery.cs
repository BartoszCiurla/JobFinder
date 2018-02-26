using System;
using Core.Application.Api.Messages;

namespace JobFinder.Application.Api.JobApplications.Queries
{
    public class GetEmployeeJobApplicationDetailsQuery:Query
    {
        public Guid JobApplicationId { get; set; }
    }
}
