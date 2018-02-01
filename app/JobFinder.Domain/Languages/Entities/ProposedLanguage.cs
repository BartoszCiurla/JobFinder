using System;
using Core.Domain.Ddd;
namespace JobFinder.Domain.Languages.Entities
{
    public class ProposedLanguage : AggregateRoot
    {
        public string Name { get; set; }
        protected ProposedLanguage() : base(Guid.Empty) { }
        protected ProposedLanguage(Guid id, string name) : base(id)
        {
            Name = name;
        }
        public static ProposedLanguage Create(Guid id, string name)
        {
            return new ProposedLanguage(id, name);
        }
    }
}
