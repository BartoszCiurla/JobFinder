using System.Collections.Generic;
using JobFinder.Application.Api.Common.Dtos;
using Core.Application.Api.Messages;

namespace JobFinder.Application.Api.Users.Queries
{
  public class GetUsersResult: QueryResult
  {
    public List<UserDetailsDto> Users { get; private set; }
    public GetUsersResult(List<UserDetailsDto> users)
    {
        Users = users;
    }
  }
}
