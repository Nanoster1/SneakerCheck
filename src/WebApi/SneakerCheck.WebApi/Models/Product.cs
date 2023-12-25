namespace SneakerCheck.WebApi.Models;

public class Product
{
    public Guid Id { get; set; } = default;
    public required string Name { get; set; }
    public required Guid ImageId { get; set; }
}