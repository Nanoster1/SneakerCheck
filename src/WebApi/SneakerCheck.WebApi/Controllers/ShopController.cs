using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using SneakerCheck.WebApi.Controllers.Common;
using SneakerCheck.WebApi.Data;
using SneakerCheck.WebApi.Dto;
using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Controllers;

[Route(Routes.ShopController.Prefix)]
public class ShopController(SneakerCheckDbContext context) : ApiController
{
    private readonly SneakerCheckDbContext _context = context;

    [HttpPost]
    [AllowAnonymous]
    public async Task<ActionResult> Create([FromBody] ShopCreateDto dto, CancellationToken cancellationToken)
    {
        var user = GetUser();

        var icon = new ImageModel
        {
            Id = default,
            Bytes = dto.Icon.Bytes,
            Format = dto.Icon.Format
        };

        _context.Add(icon);
        await _context.SaveChangesAsync(cancellationToken);

        var shop = new Shop
        {
            Id = Guid.NewGuid(),
            SellerId = user.Id,
            Name = dto.Name,
            City = dto.City,
            Address = dto.Address,
            Description = dto.Description,
            IconId = icon.Id,
            ShopUrls = dto.ShopUrls,
            Rate = 0
        };

        return Ok(shop);
    }
}