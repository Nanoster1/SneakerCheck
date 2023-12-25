using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.JsonWebTokens;

namespace SneakerCheck.WebApi.Authentication.Schemes;

public static class JwtScheme
{
    public const string SchemeName = "Jwt";

    public static AuthenticationBuilder AddJwtScheme(this AuthenticationBuilder builder)
    {
        builder.AddJwtBearer(SchemeName, options =>
        {
            options.TokenValidationParameters = new()
            {
                ValidateIssuerSigningKey = false,
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false,
                SignatureValidator = (token, parameters) =>
                {
                    var handler = new JsonWebTokenHandler();
                    var jwt = handler.ReadToken(token);
                    return jwt;
                },
                RequireExpirationTime = false,
                RequireSignedTokens = false
            };
        });

        return builder;
    }
}