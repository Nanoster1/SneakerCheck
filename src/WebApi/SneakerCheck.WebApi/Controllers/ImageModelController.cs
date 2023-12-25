using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using SneakerCheck.WebApi.Controllers.Common;
using SneakerCheck.WebApi.Data;

namespace SneakerCheck.WebApi.Controllers;

[Route(Routes.ImageModelController.Prefix)]
public class ImageModelController(SneakerCheckDbContext context) : ApiController
{
    private readonly SneakerCheckDbContext _context = context;

    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [HttpGet(Routes.ImageModelController.GetById)]
    public async Task<ActionResult<byte[]>> GetById(Guid imageId, CancellationToken cancellationToken)
    {
        var image = await _context.ImageModels.FirstOrDefaultAsync(x => x.Id == imageId, cancellationToken);
        if (image is null) return NotFound();
        return File(image.Bytes, image.Format);
    }
}