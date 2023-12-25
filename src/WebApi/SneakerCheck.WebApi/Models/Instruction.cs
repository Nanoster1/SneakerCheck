namespace SneakerCheck.WebApi.Models;

public class Instruction
{
    public required Guid Id { get; set; }
    public required Category Category { get; set; }
    public required Guid ShopId { get; set; }
    public required Guid ProductId { get; set; }
    public required Guid PreviewImageId { get; set; }
    public required string Description { get; set; }
    public required List<InstructionContent> Content { get; set; }
    public required int Likes { get; set; }
    public required int Dislikes { get; set; }
}