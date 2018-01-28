using System;
using System.Collections.Generic;
using Core.Application.Api.Messages;
namespace JobFinder.Application.Api.JobApplications.Queries
{
    public class GetEmployeeJobApplicationListResult : QueryResult
    {
        public IEnumerable<JobApplicationDto> Offers { get; set; }
        public GetEmployeeJobApplicationListResult(IEnumerable<JobApplicationDto> offers)
        {
            Offers = offers;
        }
        public class JobApplicationDto
        {
            public JobApplicationDto(Guid id, string profession, string professionCategory)
            {
                this.Id = id;
                this.Profession = profession;
                this.ProfessionCategory = professionCategory;
            }
            public Guid Id { get; set; }
            public string Profession { get; set; }
            public string ProfessionCategory { get; set; }
        }
    }
}
