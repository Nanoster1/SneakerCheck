using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

    [ProducesResponseType(StatusCodes.Status200OK)]
    [HttpPatch(Routes.AuthenticationController.RequestSellerRole)]
    [Authorize(Roles = nameof(UserRole.Customer))]
    public async Task<ActionResult<string>> RequestSellerRole(CancellationToken cancellationToken)
    {
        var user = GetUser();
        var userModel = await _context.UserModels.FirstOrDefaultAsync(x => x.Id == user.Id, cancellationToken);
        if (userModel is null) return NotFound();
        userModel.Role = UserRole.Seller;
        await _context.SaveChangesAsync(cancellationToken);
        var token = _jwtProvider.GenerateToken(userModel);
        return Ok(token);
    }
}