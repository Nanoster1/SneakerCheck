namespace SneakerCheck.WebApi.Models;

public class ImageModel
{
    public required Guid Id { get; set; }
    public required byte[] Bytes { get; set; }
    public required string Format { get; set; }
}