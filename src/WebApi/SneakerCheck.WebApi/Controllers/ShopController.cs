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
    public async Task<ActionResult<Shop>> Create([FromBody] ShopCreateDto dto, CancellationToken cancellationToken)
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

        var shop = new Shop
        {
            SellerId = Guid.Parse(user.Id),
            Name = dto.Name,
            City = dto.City,
            Address = dto.Address,
            Description = dto.Description,
            IconId = icon.Id,
            ShopUrls = dto.ShopUrls,
            Rate = 0
        };

        _context.Shops.Add(shop);
        await _context.SaveChangesAsync(cancellationToken);

        return Created(Url.Action(nameof(GetById), shop.Id), shop);
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [HttpGet(Routes.ShopController.GetAll)]
    public async Task<ActionResult<List<ShopGetDto>>> GetAll(CancellationToken ct)
    {
        var shops = await _context.Shops.ToListAsync(ct);
        return Ok(shops);
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [HttpGet(Routes.ShopController.GetById)]
    public async Task<ActionResult<ShopGetDto?>> GetById(Guid shopId, CancellationToken ct)
    {
        var shop = await _context.Shops.FirstOrDefaultAsync(shop => shop.Id == shopId, ct);
        if (shop is null) return NotFound();

        var iconUrl = Url.ActionLink(
            action: nameof(ImageModelController.GetById),
            controller: nameof(ImageModelController).Replace(nameof(Controller), string.Empty),
            values: new { imageId = shop.IconId });

        if (iconUrl is null) return NotFound();
        return ShopGetDto.FromModel(shop, iconUrl);
    }
}