using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Dto;

public record InstructionCreateDto(
    Guid Id,
    Category Category,
    Guid ShopId,
    string ProductName,
    ImageCreateDto PreviewImage,
    string Description,
    List<InstructionContentCreateDto> Content,
    int Likes,
    int Dislikes)
{
    public Instruction ToModel(List<InstructionContent> content, Guid previewImageId)
    {
        return new Instruction
        {
            Category = Category,
            ShopId = ShopId,
            ProductName = ProductName,
            PreviewImageId = previewImageId,
            Description = Description,
            Content = content,
            Likes = Likes,
            Dislikes = Dislikes
        };
    }
}