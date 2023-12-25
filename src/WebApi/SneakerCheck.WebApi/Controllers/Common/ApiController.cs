using System.Security.Claims;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using SneakerCheck.WebApi.Authentication.Models;

namespace SneakerCheck.WebApi.Controllers.Common;

[Authorize]
[ApiController]
public abstract class ApiController : ControllerBase
{
    protected User GetUser()
    {
        var claims = User.Claims;
        return new User(
            claims.First(cl => cl.Type == ClaimTypes.NameIdentifier).Value,
            User.Identity?.Name ?? throw new NullReferenceException(nameof(User.Identity)),
            claims.First(cl => cl.Type == ClaimTypes.Role).Value);
    }
}