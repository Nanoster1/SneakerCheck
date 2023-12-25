using System.Security.Claims;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using SneakerCheck.WebApi.Authentication.Models;

namespace SneakerCheck.WebApi.Controllers.Common;

[Authorize]
[ApiController]
public abstract class ApiController : ControllerBase
{
    protected User? GetUser()
    {
        var claims = User.Claims;

        var id = claims.FirstOrDefault(cl => cl.Type == ClaimTypes.NameIdentifier)?.Value;
        var name = User.Identity?.Name;
        var role = claims.FirstOrDefault(cl => cl.Type == ClaimTypes.Role)?.Value;

        return id is null || name is null || role is null ? null : new User(id, name, role);
    }
}