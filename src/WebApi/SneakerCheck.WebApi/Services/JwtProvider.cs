using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using Microsoft.IdentityModel.Tokens;

using SneakerCheck.WebApi.Authentication.Schemes;
using SneakerCheck.WebApi.Models;
using SneakerCheck.WebApi.Services.Interfaces;

namespace SneakerCheck.WebApi.Services;

public class JwtProvider : IJwtProvider
{
    public string GenerateToken(UserModel user)
    {
        var currentTime = DateTime.UtcNow;
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.Name),
            new(ClaimTypes.Role, user.Role.ToString()),
        };

        var identity = new ClaimsIdentity(claims, JwtScheme.SchemeName, ClaimTypes.Name, ClaimTypes.Role);

        var jwt = new JwtSecurityToken(
                issuer: "http://localhost",
                audience: "http://localhost",
                notBefore: currentTime,
                claims: identity.Claims,
                expires: currentTime.Add(TimeSpan.FromMinutes(10)),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mysupersecret_secretkey!123asdasdasdasd")), SecurityAlgorithms.HmacSha256));

        return new JwtSecurityTokenHandler().WriteToken(jwt);
    }
}