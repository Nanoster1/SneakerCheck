using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Dto.ProductDto;

public record ProductGetDto(
    Guid Id,
    string Name,
    Guid ImageId)
{
    public static ProductGetDto FromModel(Product product)
    {
        return new ProductGetDto(
            product.Id,
            product.Name,
            product.ImageId);
    }
}