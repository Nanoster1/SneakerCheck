using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Dto;

public record ImageCreateDto(byte[] Bytes, string Format)
{
    public ImageModel ToModel()
    {
        return new ImageModel
        {
            Bytes = Bytes,
            Format = Format
        };
    }
}