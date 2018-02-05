using JobFinder.Domain.Applications.Entities;
using JobFinder.Domain.JobApplications.Entities;
using JobFinder.Domain.Languages.Entities;
using JobFinder.Domain.Offers.Entities;
using JobFinder.Domain.Professions.Entities;
using JobFinder.Domain.Users.Entities;
using JobFinder.Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace JobFinder.Infrastructure.Ef.Configurations
{
  public class OfferWelcomeSkillCertificateConfiguration : EntityMappingConfiguration<OfferWelcomeSkill>
  {
    public override void Map(EntityTypeBuilder<OfferWelcomeSkill> builder)
    {
      builder.ToTable(nameof(OfferWelcomeSkill), SchemaName.JobFinder);
    }
  }
  public class OfferRequiredSkillCertificateConfiguration : EntityMappingConfiguration<OfferRequiredSkill>
  {
    public override void Map(EntityTypeBuilder<OfferRequiredSkill> builder)
    {
      builder.ToTable(nameof(OfferRequiredSkill), SchemaName.JobFinder);
    }
  }
  public class OfferLanguageCertificateConfiguration : EntityMappingConfiguration<OfferLanguage>
  {
    public override void Map(EntityTypeBuilder<OfferLanguage> builder)
    {
      builder.ToTable(nameof(OfferLanguage), SchemaName.JobFinder);
    }
  }
  public class JobApplicationCertificateConfiguration : EntityMappingConfiguration<JobApplicationCertificate>
  {
    public override void Map(EntityTypeBuilder<JobApplicationCertificate> builder)
    {
      builder.ToTable(nameof(JobApplicationCertificate), SchemaName.JobFinder);
    }
  }
  public class ProposedCertificateConfiguration : EntityMappingConfiguration<ProposedCertificate>
  {
    public override void Map(EntityTypeBuilder<ProposedCertificate> builder)
    {
      builder.ToTable(nameof(ProposedCertificate), SchemaName.JobFinder);
    }
  }
  public class JobApplicationLanguageConfiguration : EntityMappingConfiguration<JobApplicationLanguage>
  {
    public override void Map(EntityTypeBuilder<JobApplicationLanguage> builder)
    {
      builder.ToTable(nameof(JobApplicationLanguage), SchemaName.JobFinder);
    }
  }
  public class ProposedLanguageConfiguration : EntityMappingConfiguration<ProposedLanguage>
  {
    public override void Map(EntityTypeBuilder<ProposedLanguage> builder)
    {
      builder.ToTable(nameof(ProposedLanguage), SchemaName.JobFinder);
    }
  }
  public class JobApplicationSkillConfiguration : EntityMappingConfiguration<JobApplicationSkill>
  {
    public override void Map(EntityTypeBuilder<JobApplicationSkill> builder)
    {
      builder.ToTable(nameof(JobApplicationSkill), SchemaName.JobFinder);
    }
  }
  public class ProposedSkillConfiguration : EntityMappingConfiguration<ProposedSkill>
  {
    public override void Map(EntityTypeBuilder<ProposedSkill> builder)
    {
      builder.ToTable(nameof(ProposedSkill), SchemaName.JobFinder);
    }
  }
  public class JobApplicationConfiguration : EntityMappingConfiguration<JobApplication>
  {
    public override void Map(EntityTypeBuilder<JobApplication> builder)
    {
      builder.ToTable(nameof(JobApplication), SchemaName.JobFinder);
    }
  }
  public class OfferConfiguration : EntityMappingConfiguration<Offer>
  {
    public override void Map(EntityTypeBuilder<Offer> builder)
    {
      builder.ToTable(nameof(Offer), SchemaName.JobFinder);
    }
  }
  public class ProfessionConfiguration : EntityMappingConfiguration<Profession>
  {
    public override void Map(EntityTypeBuilder<Profession> builder)
    {
      builder.ToTable(nameof(Profession), SchemaName.JobFinder);
    }
  }
  public class ProfessionCategoryConfiguration : EntityMappingConfiguration<ProfessionCategory>
  {
    public override void Map(EntityTypeBuilder<ProfessionCategory> builder)
    {
      builder.ToTable(nameof(ProfessionCategory), SchemaName.JobFinder);
    }
  }
  public class UserConfiguration : EntityMappingConfiguration<User>
  {
    public override void Map(EntityTypeBuilder<User> builder)
    {
      builder.ToTable(nameof(User), SchemaName.JobFinder);
    }
  }
}
