using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        List<ImageModel> fakeImages = new(dto.Content.Count);
        List<ImageModel> originalImages = new(dto.Content.Count);
        List<string> descriptions = new(dto.Content.Count);
        List<InstructionContent> content = new(dto.Content.Count);

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

        var instructionContentGetDtos = instruction.Content
            .Select(x => InstructionContentGetDto.FromModel(x, GetIconUrl(x.OriginalImageId), GetIconUrl(x.FakeImageId)))
            .ToList();

        var getDto = InstructionGetDto.FromModel(
            instruction,
            GetIconUrl(previewImage.Id),
            instructionContentGetDtos);

        return Ok();
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [HttpGet(Routes.InstructionController.GetAll)]
    public async Task<ActionResult<List<InstructionGetDto>>> GetAll(CancellationToken cancellationToken)
    {
        var instructions = await _context.Instructions.ToListAsync(cancellationToken);
        List<InstructionGetDto> instructionGetDtos = new(instructions.Count);

        foreach (var instruction in instructions)
        {
            var instructionContentGetDtos = instruction.Content
                .Select(x => InstructionContentGetDto.FromModel(x, GetIconUrl(x.OriginalImageId), GetIconUrl(x.FakeImageId)))
                .ToList();

            instructionGetDtos.Add(InstructionGetDto.FromModel(
                instruction,
                GetIconUrl(instruction.PreviewImageId),
                instructionContentGetDtos
            ));
        }

        return Ok(instructionGetDtos);
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [HttpGet(Routes.InstructionController.GetById)]
    public async Task<ActionResult<InstructionGetDto>> GetById(Guid instructionId, CancellationToken cancellationToken)
    {
        var instruction = await _context.Instructions.FirstOrDefaultAsync(x => x.Id == instructionId, cancellationToken);
        if (instruction is null) return NotFound();

        var instructionContentGetDtos = instruction.Content
                .Select(x => InstructionContentGetDto.FromModel(x, GetIconUrl(x.OriginalImageId), GetIconUrl(x.FakeImageId)))
                .ToList();

        return InstructionGetDto.FromModel(
            instruction,
            GetIconUrl(instruction.PreviewImageId),
            instructionContentGetDtos
        );
    }
}