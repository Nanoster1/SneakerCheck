using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Dto;

public record InstructionGetDto(
    Guid Id,
    Category Category,
    Guid ShopId,
    string ProductName,
    string PreviewImageUrl,
    string Description,
    List<InstructionContentGetDto> Content,
    int Likes,
    int Dislikes)
{
    public static InstructionGetDto FromModel(
        Instruction instruction,
        string previewImageUrl,
        List<InstructionContentGetDto> instructionGetDtos)
    {
        return new InstructionGetDto(
            instruction.Id,
            instruction.Category,
            instruction.ShopId,
            instruction.ProductName,
            previewImageUrl,
            instruction.Description,
            instructionGetDtos,
            instruction.Likes,
            instruction.Dislikes);
    }
}