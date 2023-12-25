using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Dto;

public class ShopCreateDto
{
    public required string Name { get; set; }
    public required string City { get; set; }
    public required string Address { get; set; }
    public required string Description { get; set; }
    public required ImageCreateDto Icon { get; set; }
    public required List<ShopUrl> ShopUrls { get; set; }
}