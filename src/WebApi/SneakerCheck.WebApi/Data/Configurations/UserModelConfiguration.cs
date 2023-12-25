using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Data.Configurations;

public class UserModelConfiguration : IEntityTypeConfiguration<UserModel>
{
    public void Configure(EntityTypeBuilder<UserModel> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id).ValueGeneratedOnAdd();
        builder.Property(x => x.GoogleId).IsRequired();
        builder.Property(x => x.Name).IsRequired();
        builder.Property(x => x.Role).IsRequired();

        builder.HasIndex(x => x.GoogleId).IsUnique();
    }
}