namespace SneakerCheck.WebApi.Models;

public class ImageModel
{
    public Guid Id { get; set; } = default;
    public required byte[] Bytes { get; set; }
    public required string Format { get; set; }
}