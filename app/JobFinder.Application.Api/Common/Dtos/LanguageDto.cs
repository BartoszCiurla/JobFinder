using System;

namespace JobFinder.Application.Api.Common.Dtos
{
    public class LanguageDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
    }
}
