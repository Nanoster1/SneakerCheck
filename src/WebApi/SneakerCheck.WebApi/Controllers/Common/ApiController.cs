using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using SneakerCheck.WebApi.Authentication.Constants;
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
            claims.First(cl => cl.ValueType == UserClaimTypes.Id).Value,
            claims.First(cl => cl.ValueType == UserClaimTypes.Name).Value,
            claims.First(cl => cl.ValueType == UserClaimTypes.Role).Value);
    }
}