
using Newtonsoft.Json;

namespace JobFinder.Application.Api.Users.Queries
{
    public class GetActiveUserResult
    {
        public GetActiveUserResult(string token, string email, string userType)
        {
            Token = token;
            Email = email;
            UserType = userType;
        }
        [JsonProperty(PropertyName = "token")]
        public string Token { get; set; }
        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }
        [JsonProperty(PropertyName = "userType")]
        public string UserType { get; set; }
    }
}
