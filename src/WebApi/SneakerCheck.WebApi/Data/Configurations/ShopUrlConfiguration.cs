using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Data.Configurations;

public class ShopUrlConfiguration : IEntityTypeConfiguration<ShopUrl>
{
    public void Configure(EntityTypeBuilder<ShopUrl> builder)
    {
        builder.HasKey(x => x.Name);

        builder.Property(x => x.Name).ValueGeneratedNever();
        builder.Property(x => x.Url).IsRequired();
    }
}