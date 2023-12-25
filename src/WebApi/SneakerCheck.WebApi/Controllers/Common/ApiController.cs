using System.Security.Claims;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using SneakerCheck.WebApi.Authentication.Models;

using Throw;

namespace SneakerCheck.WebApi.Controllers.Common;

[Authorize]
[ApiController]
public abstract class ApiController : ControllerBase
{
    protected User GetUser()
    {
        var claims = User.Claims;

        var id = Guid.Parse(claims.First(cl => cl.Type == ClaimTypes.NameIdentifier).Value);
        var name = User.Identity?.Name;
        var role = claims.First(cl => cl.Type == ClaimTypes.Role).Value;

        return new User(id, name.ThrowIfNull(), role);
    }

    protected string GetIconUrl(Guid iconId)
    {
        return Url.ActionLink(
            action: nameof(ImageModelController.GetById),
            controller: nameof(ImageModelController).Replace(nameof(Controller), string.Empty),
            values: new { imageId = iconId }).ThrowIfNull();
    }
}