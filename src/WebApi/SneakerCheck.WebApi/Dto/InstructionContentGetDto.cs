using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Dto;

public record InstructionContentGetDto(
    string OriginalImageUrl,
    string FakeImageUrl,
    string ImageDescription)
{
    public static InstructionContentGetDto FromModel(
        InstructionContent model,
        string originalImageUrl,
        string fakeImageUrl)
    {
        return new InstructionContentGetDto(
            originalImageUrl,
            fakeImageUrl,
            model.ImageDescription);
    }
}