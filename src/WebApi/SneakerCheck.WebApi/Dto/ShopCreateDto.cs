using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Dto;

public record ShopCreateDto(
    string Name,
    string City,
    string Address,
    string Description,
    ImageCreateDto Icon,
    List<ShopUrl> ShopUrls)
{
    public static Shop ToModel(ShopCreateDto dto, Guid iconId, Guid sellerId)
    {
        return new Shop
        {
            Name = dto.Name,
            City = dto.City,
            Address = dto.Address,
            Description = dto.Description,
            IconId = iconId,
            ShopUrls = dto.ShopUrls,
            Rate = 0,
            SellerId = sellerId
        };
    }
}