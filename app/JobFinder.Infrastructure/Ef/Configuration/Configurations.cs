using JobFinder.Domain.CVs.Entities;
using JobFinder.Domain.Users.Entities;
using JobFinder.Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace JobFinder.Infrastructure.Ef.Configurations
{
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
  public class UserConfiguratinon : EntityMappingConfiguration<User>
  {
    public override void Map(EntityTypeBuilder<User> builder)
    {
      builder.ToTable(nameof(User), SchemaName.JobFinder);
    }
  }
  #endregion
}
