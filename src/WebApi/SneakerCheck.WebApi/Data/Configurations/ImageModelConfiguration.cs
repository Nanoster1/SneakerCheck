using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Data.Configurations;

public class ImageModelConfiguration : IEntityTypeConfiguration<ImageModel>
{
    public void Configure(EntityTypeBuilder<ImageModel> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id).ValueGeneratedOnAdd();
        builder.Property(x => x.Bytes).IsRequired();
        builder.Property(x => x.Format).IsRequired();
    }
}