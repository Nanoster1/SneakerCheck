namespace SneakerCheck.WebApi.Models;

public class Product
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public required Guid ImageId { get; set; }
}