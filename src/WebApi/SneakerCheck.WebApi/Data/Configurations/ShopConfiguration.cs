using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Data.Configurations;

public class ShopConfiguration : IEntityTypeConfiguration<Shop>
{
    public void Configure(EntityTypeBuilder<Shop> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id).ValueGeneratedOnAdd();
        builder.Property(x => x.Name).IsRequired();
        builder.Property(x => x.City).IsRequired();
        builder.Property(x => x.Address).IsRequired();
        builder.Property(x => x.Description).IsRequired();
        builder.Property(x => x.Rate).IsRequired();

        builder.HasOne<ImageModel>()
            .WithOne()
            .HasForeignKey<Shop>(x => x.IconId)
            .IsRequired();

        builder.HasOne<UserModel>()
            .WithMany()
            .HasForeignKey(x => x.SellerId)
            .IsRequired();

        builder.HasMany(x => x.ShopUrls)
            .WithOne();
    }
}