using JobFinder.Domain.CVs.Entities;
using JobFinder.Domain.Offers.Entities;
using JobFinder.Domain.Professions.Entities;
using JobFinder.Domain.Users.Entities;
using JobFinder.Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace JobFinder.Infrastructure.Ef.Configurations
{
  #region
  public class OfferConfiguration : EntityMappingConfiguration<Offer>
  {
    public override void Map(EntityTypeBuilder<Offer> builder)
    {
      builder.ToTable(nameof(Offer), SchemaName.JobFinder);
    }
  }
  #endregion
  #region
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


  #endregion
  #region CVs
  public class CVsConfiguration : EntityMappingConfiguration<CV>
  {
    public override void Map(EntityTypeBuilder<CV> builder)
    {
      builder.ToTable(nameof(CV), SchemaName.JobFinder);
    }
  }
  #endregion
  #region Users
  public class UserConfiguration : EntityMappingConfiguration<User>
  {
    public override void Map(EntityTypeBuilder<User> builder)
    {
      builder.ToTable(nameof(User), SchemaName.JobFinder);
    }
  }
  #endregion
}
