using System;
using Core.Domain.Ddd;
namespace JobFinder.Domain.Languages.Entities
{
    public class Language : AggregateRoot
    {
        public string Name { get; set; }
        protected Language() : base(Guid.Empty) { }
        protected Language(Guid id, string name) : base(id)
        {
            Name = name;
        }
        public static Language Create(Guid id, string name)
        {
            return new Language(id, name);
        }
    }
}
