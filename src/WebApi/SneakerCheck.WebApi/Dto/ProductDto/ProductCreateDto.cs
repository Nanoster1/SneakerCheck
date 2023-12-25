using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Dto.ProductDto;

public record ProductCreateDto(
    string Name,
    Guid ImageId)
{
    public Product ToModel()
    {
        return new Product
        {
            Name = Name,
            ImageId = ImageId
        };
    }
}