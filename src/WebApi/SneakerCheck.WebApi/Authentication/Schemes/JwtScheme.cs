using Microsoft.AspNetCore.Authentication;

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
                ValidateActor = false,
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = false,
                ValidateLifetime = false,
                ValidateSignatureLast = false,
                ValidateTokenReplay = false,
                ValidateWithLKG = false
            };
        });

        return builder;
    }
}