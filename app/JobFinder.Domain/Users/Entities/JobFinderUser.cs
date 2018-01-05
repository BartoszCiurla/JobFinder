using System;
using System.Collections.Generic;
using Core.Domain.Ddd;
namespace JobFinder.Domain.Users.Entities
{
  public class JobFinderUser : AggregateRoot
  {
    public string Name { get; private set; }
    public string Surname { get; private set; }
    public string Email { get; private set; }
    public string Password { get; private set; }
    public DateTime Created { get; private set; }
    public DateTime LastLoginDate { get; private set; }
    public string Salt { get; private set; }
    public UserType UserType { get; set; }
    protected JobFinderUser () : base (Guid.Empty) { }
    protected JobFinderUser (Guid id,
      string name,
      string surname,
      string email,
      string password,
      string salt,
      UserType userType) : base (id)
    {
      Name = name;
      Surname = surname;
      Email = email;
      Password = password;
      Salt = salt;
      UserType = userType;
    }
    public void UpdateLastLoginDate () => LastLoginDate = DateTime.Now;
    #region Factory methods
    public static JobFinderUser Create (Guid id,
      string name,
      string surname,
      string email,
      string password,
      string salt,
      UserType userType)
    {
      return new JobFinderUser (id, name, surname, email, password, salt, userType);
    }
    #endregion
  }
}
