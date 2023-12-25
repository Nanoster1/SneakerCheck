using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Dto;

public record ShopGetDto(
    Guid Id,
    Guid SellerId,
    string Name,
    string City,
    string Address,
    string Description,
    string IconUrl,
    List<ShopUrl> ShopUrls,
    double Rate)
{
    public static ShopGetDto FromModel(Shop shop, string iconUrl)
    {
        return new ShopGetDto(
            shop.Id,
            shop.SellerId,
            shop.Name,
            shop.City,
            shop.Address,
            shop.Description,
            iconUrl,
            shop.ShopUrls,
            shop.Rate);
    }
}