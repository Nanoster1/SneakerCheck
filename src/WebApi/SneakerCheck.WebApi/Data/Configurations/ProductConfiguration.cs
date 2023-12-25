using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Data.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id).ValueGeneratedOnAdd();
        builder.Property(x => x.Name).IsRequired();

        builder.HasOne<ImageModel>()
            .WithOne()
            .HasForeignKey<Product>(x => x.ImageId);
    }
}