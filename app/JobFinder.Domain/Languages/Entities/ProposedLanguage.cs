using System;
using Core.Domain.Ddd;
namespace JobFinder.Domain.Languages.Entities
{
    public class ProposedLanguage : AggregateRoot
    {
        public string Description { get; private set; }
        protected ProposedLanguage() : base(Guid.Empty) { }
        protected ProposedLanguage(Guid id, string description) : base(id)
        {
            Description = description;
        }
        public static ProposedLanguage Create(Guid id, string description)
            => new ProposedLanguage(id, description);
    }
}
