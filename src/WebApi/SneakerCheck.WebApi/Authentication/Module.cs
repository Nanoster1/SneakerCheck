using SneakerCheck.WebApi.Authentication.Schemes;

namespace SneakerCheck.WebApi.Authentication;

public static class Module
{
    public static IServiceCollection AddServerAuthentication(this IServiceCollection services)
    {
        services.AddAuthentication(JwtScheme.SchemeName)
            .AddJwtScheme()
            .AddGoogleJwtScheme();

        return services;
    }
}