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
            public string Name { get; set; }
            public LanguageDto(Guid id, string name)
            {
                Id = id;
                Name = name;
            }
        }
    }
}
