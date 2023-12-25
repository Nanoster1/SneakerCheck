using Microsoft.EntityFrameworkCore;

namespace SneakerCheck.WebApi.Data;

public static class Module
{
    public static IServiceCollection AddServerData(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<SneakerCheckDbContext>(options => SneakerCheckDbContext.Configure(options, configuration));
        return services;
    }

    public static WebApplication MigrateDatabase(this WebApplication host)
    {
        using var scope = host.Services.CreateScope();
        var context = scope.ServiceProvider.GetService<SneakerCheckDbContext>();
        if (context is null) throw new NullReferenceException(nameof(SneakerCheckDbContext));
        context.Database.Migrate();
        return host;
    }
}