using SneakerCheck.WebApi.Services.Interfaces;

namespace SneakerCheck.WebApi.Services;

public static class Module
{
    public static IServiceCollection AddServerServices(this IServiceCollection services)
    {
        services.AddScoped<IJwtProvider, JwtProvider>();
        return services;
    }
}