using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

using SneakerCheck.WebApi.Authentication.Constants;
using SneakerCheck.WebApi.Authentication.Schemes;
using SneakerCheck.WebApi.Controllers.Common;
using SneakerCheck.WebApi.Data;
using SneakerCheck.WebApi.Models;
using SneakerCheck.WebApi.Services.Interfaces;

namespace SneakerCheck.WebApi.Controllers;

[Route(Routes.AuthenticationController.Prefix)]
public class AuthenticationController(SneakerCheckDbContext context, IJwtProvider jwtProvider) : ApiController
{
    private readonly SneakerCheckDbContext _context = context;
    private readonly IJwtProvider _jwtProvider = jwtProvider;

    [HttpPost(Routes.AuthenticationController.GoogleGetToken)]
    [Authorize(AuthenticationSchemes = GoogleJwtScheme.SchemeName)]
    public async Task<ActionResult<string>> GoogleGetToken(CancellationToken cancellationToken)
    {
        var googleId = User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
        var googleName = User.Identity?.Name;

        var handler = new JwtSecurityTokenHandler();

        var user = _context.UserModels.FirstOrDefault(x => x.GoogleId == googleId);

        if (user is null)
        {
            user = new UserModel
            {
                Name = googleName!,
                GoogleId = googleId!,
                Role = UserRole.Customer
            };

            _context.Add(user);
            await _context.SaveChangesAsync(cancellationToken);
        }

        var token = _jwtProvider.GenerateToken(user);
        return Ok(token);
    }
}