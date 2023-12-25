using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using SneakerCheck.WebApi.Controllers.Common;
using SneakerCheck.WebApi.Data;
using SneakerCheck.WebApi.Dto;
using SneakerCheck.WebApi.Dto.ProductDto;
using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Controllers;

[Route(Routes.ProductController.Prefix)]
public class ProductController(SneakerCheckDbContext context) : ApiController
{
    private readonly SneakerCheckDbContext _context = context;

    [ProducesResponseType(StatusCodes.Status201Created)]
    [HttpPost]
    public async Task<ActionResult<Product>> Create([FromBody] ProductCreateDto dto, CancellationToken ct)
    {
        var user = GetUser();
        if (user is null) return Unauthorized();

        var product = dto.ToModel();

        _context.Products.Add(product);
        await _context.SaveChangesAsync(ct);

        var productGetDto = ProductGetDto.FromModel(product);
        return Created(Url.ActionLink(nameof(GetById), null, product.Id), productGetDto);
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetAll(CancellationToken ct)
    {
        var productGetDtos = (await _context.Products
                .ToListAsync(ct))
                .Select(ProductGetDto.FromModel);
        return Ok(productGetDtos);
    }
    
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [HttpGet(Routes.ProductController.GetById)]
    public async Task<ActionResult<ProductGetDto?>> GetById(Guid productId, CancellationToken ct)
    {
        var product = await _context.Products.FirstOrDefaultAsync(product => product.Id == productId, ct);
        if (product is null) return NotFound();
        return ProductGetDto.FromModel(product);
    }
}