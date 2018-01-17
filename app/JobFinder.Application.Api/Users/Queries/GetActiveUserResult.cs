
using System;
using Newtonsoft.Json;

namespace JobFinder.Application.Api.Users.Queries
{
    public class GetActiveUserResult
    {
        public GetActiveUserResult(Guid id, string token, string email, string userType)
        {
            Id = id;
            Token = token;
            Email = email;
            UserType = userType;
        }

        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }

        [JsonProperty(PropertyName = "token")]
        public string Token { get; set; }

        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "userType")]
        public string UserType { get; set; }
    }
}
