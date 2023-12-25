using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Dto.ShopDto;

public record ShopCreateDto(
    string Name,
    string City,
    string Address,
    string Description,
    ImageCreateDto Icon,
    List<ShopUrl> ShopUrls)
{
    public Shop ToModel(Guid iconId, Guid sellerId)
    {
        return new Shop
        {
            Name = Name,
            City = City,
            Address = Address,
            Description = Description,
            IconId = iconId,
            ShopUrls = ShopUrls,
            Rate = 0,
            SellerId = sellerId
        };
    }
}