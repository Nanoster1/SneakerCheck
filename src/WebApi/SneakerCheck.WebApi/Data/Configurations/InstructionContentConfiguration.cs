using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Data.Configurations;

public class InstructionContentConfiguration : IEntityTypeConfiguration<InstructionContent>
{
    public void Configure(EntityTypeBuilder<InstructionContent> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id).ValueGeneratedOnAdd();
        builder.Property(x => x.ImageDescription).IsRequired();

        builder.HasOne<ImageModel>()
                .WithOne()
                .HasForeignKey<InstructionContent>(x => x.OriginalImageId)
                .IsRequired();

        builder.HasOne<ImageModel>()
            .WithOne()
            .HasForeignKey<InstructionContent>(x => x.FakeImageId)
            .IsRequired();
    }
}