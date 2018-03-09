using System;
using System.Collections.Generic;
using Core.Domain.Ddd;
namespace JobFinder.Domain.Users.Entities
{
  public class User : AggregateRoot
  {
    public string Name { get; private set; }
    public string Surname { get; private set; }
    public string Email { get; private set; }
    public string Password { get; private set; }
    public DateTime Created { get; private set; }
    public DateTime LastLoginDate { get; private set; }
    public string Salt { get; private set; }
    public UserType UserType { get; set; }
    protected User() : base(Guid.Empty) { }
    protected User(Guid id,
      string name,
      string surname,
      string email,
      string password,
      string salt,
      UserType userType) : base(id)
    {
      Name = name;
      Surname = surname;
      Email = email;
      Password = password;
      Salt = salt;
      UserType = userType;
    }
    public void UpdateLastLoginDate() => LastLoginDate = DateTime.Now;
    public static User Create(Guid id,
      string name,
      string surname,
      string email,
      string password,
      string salt,
      UserType userType) => new User(id, name, surname, email, password, salt, userType);
  }
}
