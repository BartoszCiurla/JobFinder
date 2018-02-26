using System;
namespace JobFinder.Application.Api.Common.Dtos
{
    public class LanguageDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public LanguageDto ()
        { }
        public LanguageDto (Guid id, string name, int level)
        {
            Id = id;
            Name = name;
            Level = level;
        }
    }
}
