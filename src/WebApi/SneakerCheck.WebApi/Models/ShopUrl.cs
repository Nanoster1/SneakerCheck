namespace SneakerCheck.WebApi.Models;

public class ShopUrl
{
    public int Id { get; set; } = default;
    public required string Name { get; set; }
    public required string Url { get; set; }
}