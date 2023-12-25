namespace SneakerCheck.WebApi.Dto;

public record InstructionContentCreateDto(
    ImageCreateDto OriginalImage,
    ImageCreateDto FakeImage,
    string ImageDescription);