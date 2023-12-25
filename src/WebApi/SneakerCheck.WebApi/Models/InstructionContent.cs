namespace SneakerCheck.WebApi.Models;

public class InstructionContent
{
    public int Id { get; set; } = default;
    public required Guid OriginalImageId { get; set; }
    public required Guid FakeImageId { get; set; }
    public required string ImageDescription { get; set; }
}