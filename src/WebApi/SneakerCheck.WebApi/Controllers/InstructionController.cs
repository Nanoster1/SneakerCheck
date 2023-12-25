using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using SneakerCheck.WebApi.Controllers.Common;
using SneakerCheck.WebApi.Data;
using SneakerCheck.WebApi.Dto;
using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Controllers;

[Route(Routes.InstructionController.Prefix)]
public class InstructionController(SneakerCheckDbContext context) : ApiController
{
    private readonly SneakerCheckDbContext _context = context;

    [ProducesResponseType(StatusCodes.Status200OK)]
    [HttpPost(Routes.InstructionController.Create)]
    [Authorize(Roles = nameof(UserRole.Seller))]
    public async Task<ActionResult<InstructionGetDto>> Create([FromBody] InstructionCreateDto dto, CancellationToken cancellationToken)
    {
        List<ImageModel> fakeImages = [];
        List<ImageModel> originalImages = [];
        List<string> descriptions = [];
        List<InstructionContent> content = [];

        foreach (var c in dto.Content)
        {
            var fakeImage = c.FakeImage.ToModel();
            var originalImage = c.OriginalImage.ToModel();
            var description = c.ImageDescription;

            fakeImages.Add(fakeImage);
            originalImages.Add(originalImage);
            descriptions.Add(description);
        }

        var previewImage = dto.PreviewImage.ToModel();

        _context.ImageModels.AddRange(fakeImages);
        _context.ImageModels.AddRange(originalImages);
        _context.ImageModels.Add(previewImage);

        await _context.SaveChangesAsync(cancellationToken);

        for (var i = 0; i < dto.Content.Count; i++)
        {
            content.Add(new InstructionContent
            {
                FakeImageId = fakeImages[i].Id,
                OriginalImageId = originalImages[i].Id,
                ImageDescription = descriptions[i]
            });
        }

        var instruction = dto.ToModel(content, previewImage.Id);
        _context.Instructions.Add(instruction);
        await _context.SaveChangesAsync(cancellationToken);

        var instructionGetDtos = instruction.Content
            .Select(x => InstructionContentGetDto.FromModel(x, GetIconUrl(x.OriginalImageId), GetIconUrl(x.FakeImageId)))
            .ToList();

        var getDto = InstructionGetDto.FromModel(
            instruction,
            GetIconUrl(previewImage.Id),
            instructionGetDtos);

        return Ok();
    }
}