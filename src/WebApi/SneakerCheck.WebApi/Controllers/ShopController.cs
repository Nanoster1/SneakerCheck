using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using SneakerCheck.WebApi.Controllers.Common;
using SneakerCheck.WebApi.Data;
using SneakerCheck.WebApi.Dto;
using SneakerCheck.WebApi.Models;

using Throw;

namespace SneakerCheck.WebApi.Controllers;

[Route(Routes.ShopController.Prefix)]
public class ShopController(SneakerCheckDbContext context) : ApiController
{
    private readonly SneakerCheckDbContext _context = context;

    [ProducesResponseType(StatusCodes.Status201Created)]
    [HttpPost]
    public async Task<ActionResult<ShopGetDto>> Create([FromBody] ShopCreateDto dto, CancellationToken cancellationToken)
    {
        var user = GetUser();
        if (user is null) return Unauthorized();

        var icon = new ImageModel
        {
            Bytes = dto.Icon.Bytes,
            Format = dto.Icon.Format
        };

        _context.ImageModels.Add(icon);
        await _context.SaveChangesAsync(cancellationToken);

        var shop = dto.ToModel(icon.Id, user.Id);

        _context.Shops.Add(shop);
        await _context.SaveChangesAsync(cancellationToken);

        var shopGetDto = ShopGetDto.FromModel(shop, GetIconUrl(icon.Id));
        return Created(Url.ActionLink(nameof(GetById), null, shop.Id), shopGetDto);
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [HttpGet(Routes.ShopController.GetAll)]
    public async Task<ActionResult<List<ShopGetDto>>> GetAll(CancellationToken ct)
    {
        var shopGetDtos = (await _context.Shops
            .ToListAsync(ct))
            .Select(x => ShopGetDto.FromModel(x, GetIconUrl(x.IconId)));
        return Ok(shopGetDtos);
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [HttpGet(Routes.ShopController.GetById)]
    public async Task<ActionResult<ShopGetDto?>> GetById(Guid shopId, CancellationToken ct)
    {
        var shop = await _context.Shops.FirstOrDefaultAsync(shop => shop.Id == shopId, ct);
        if (shop is null) return NotFound();
        var iconUrl = GetIconUrl(shop.IconId);
        return ShopGetDto.FromModel(shop, iconUrl);
    }

    private string GetIconUrl(Guid iconId)
    {
        return Url.ActionLink(
            action: nameof(ImageModelController.GetById),
            controller: nameof(ImageModelController).Replace(nameof(Controller), string.Empty),
            values: new { imageId = iconId }).ThrowIfNull();
    }
}