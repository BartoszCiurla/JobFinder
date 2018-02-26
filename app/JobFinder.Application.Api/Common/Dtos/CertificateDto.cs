using System;

namespace JobFinder.Application.Api.Common.Dtos
{
    public class CertificateDto
    {
        public Guid Id { get; set; }
        public Guid ProfessionCategoryId { get; set; }
        public string Title { get; set; }
        public CertificateDto()
        {

        }
        public CertificateDto(Guid id, Guid professionCategoryId, string title)
        {
            Id = id;
            ProfessionCategoryId = professionCategoryId;
            Title = title;

        }
    }
}
