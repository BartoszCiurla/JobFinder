using System;
namespace JobFinder.Application.Api.Common.Dtos
{
    public class LanguageDto
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public int Level { get; set; }
        public LanguageDto ()
        { }
        public LanguageDto (Guid id, string description, int level)
        {
            Id = id;
            Description = description;
            Level = level;
        }
    }
}
