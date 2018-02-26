using System;
using System.Collections.Generic;
using Core.Application.Api.Messages;
namespace JobFinder.Application.Api.Languages.Queries
{
    public class GetLanguagesListResult : QueryResult
    {
        public IEnumerable<LanguageDto> Languages { set; get; }
        public GetLanguagesListResult(IEnumerable<LanguageDto> languages)
        {
            Languages = languages;
        }
        public class LanguageDto
        {
            public Guid Id { get; set; }
            public string Description { get; set; }
            public LanguageDto(Guid id, string description)
            {
                Id = id;
                Description = description;
            }
        }
    }
}
