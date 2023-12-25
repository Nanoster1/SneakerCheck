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
        builder.Property(x => x.ProductName).IsRequired();

        builder.HasIndex(x => x.ProductName);

        builder.HasOne<Shop>()
            .WithMany()
            .HasForeignKey(x => x.ShopId)
            .IsRequired();

        builder.HasOne<ImageModel>()
            .WithOne()
            .HasForeignKey<Instruction>(x => x.PreviewImageId)
            .IsRequired();

        builder.HasMany(x => x.Content)
            .WithOne();

        builder.Navigation(x => x.Content).AutoInclude();
    }
}