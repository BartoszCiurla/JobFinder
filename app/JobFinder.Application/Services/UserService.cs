using System;
using System.Linq;
using Core.Application.Exceptions;
using Core.Domain.Ddd;
using JobFinder.Domain.Users.Entities;
namespace JobFinder.Application.Services
{
    public class UserService
    {
        public static User Get(Guid id, IQueryable<User> users)
        {
            var user = users.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                throw new NotFoundApplicationException("Użytkownik nie istnieje");
            }
            return user;
        }
    }
}
