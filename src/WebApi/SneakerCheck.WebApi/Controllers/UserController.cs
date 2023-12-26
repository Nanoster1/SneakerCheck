using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using SneakerCheck.WebApi.Controllers.Common;
using SneakerCheck.WebApi.Data;
using SneakerCheck.WebApi.Dto;

namespace SneakerCheck.WebApi.Controllers;

[Route(Routes.UserController.Prefix)]
public class UserController(SneakerCheckDbContext context) : ApiController
{
    private readonly SneakerCheckDbContext _context = context;

    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [HttpGet(Routes.UserController.GetUserInfo)]
    public async Task<ActionResult<UserGetDto>> GetUserInfo(CancellationToken cancellationToken)
    {
        var user = GetUser();
        var userModel = await _context.UserModels.FirstOrDefaultAsync(x => x.Id == user.Id, cancellationToken);
        if (userModel is null) return BadRequest();
        return Ok(UserGetDto.FromModel(userModel));
    }

    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [HttpPatch(Routes.UserController.ChangeCity)]
    public async Task<ActionResult> ChangeCity([FromBody] ChangeCityDto dto, CancellationToken cancellationToken)
    {
        var user = GetUser();
        var userModel = await _context.UserModels.FirstOrDefaultAsync(x => x.Id == user.Id, cancellationToken);
        if (userModel is null) return BadRequest();
        userModel.City = dto.NewCity;
        await _context.SaveChangesAsync(cancellationToken);
        return NoContent();
    }
}