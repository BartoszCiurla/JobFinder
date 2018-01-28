using System;
using Core.Domain.Ddd;
using JobFinder.Domain.Professions.Entities;
using JobFinder.Domain.Users.Entities;
namespace JobFinder.Domain.Applications.Entities
{
    public class JobApplication : AggregateRoot
    {
        public User User { get; private set; }
        public Profession Profession { get; private set; }
        protected JobApplication() : base(Guid.Empty) { }
        protected JobApplication(Guid id, User user, Profession profession) : base(id)
        {
            Profession = profession;
            User = user;
        }
        public static JobApplication Create(Guid id, User user, Profession profession)
        {
            return new JobApplication(id, user, profession);
        }
    }
}
