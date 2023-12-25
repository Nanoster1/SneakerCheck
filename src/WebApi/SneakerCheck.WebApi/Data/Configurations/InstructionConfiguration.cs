using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Data.Configurations;

public class InstructionConfiguration : IEntityTypeConfiguration<Instruction>
{
    public void Configure(EntityTypeBuilder<Instruction> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id).ValueGeneratedOnAdd();
        builder.Property(x => x.Category).IsRequired();
        builder.Property(x => x.Description).IsRequired();
        builder.Property(x => x.Likes).IsRequired();
        builder.Property(x => x.Dislikes).IsRequired();

        builder.HasOne<Shop>()
            .WithMany()
            .HasForeignKey(x => x.ShopId)
            .IsRequired();

        builder.HasOne<Product>()
            .WithMany()
            .HasForeignKey(x => x.ProductId)
            .IsRequired();

        builder.HasOne<ImageModel>()
            .WithOne()
            .HasForeignKey<Instruction>(x => x.PreviewImageId)
            .IsRequired();

        builder.OwnsMany(x => x.Content, b =>
        {
            b.Property(x => x.OriginalImageId).IsRequired();
            b.Property(x => x.FakeImageId).IsRequired();
            b.Property(x => x.ImageDescription).IsRequired();
        });
    }
}