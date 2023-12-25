using Microsoft.EntityFrameworkCore;

namespace SneakerCheck.WebApi.Data;

public static class Module
{
    public static IServiceCollection AddServerData(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString(SneakerCheckDbContext.ConnectionStringName);
        if (connectionString is null) throw new NullReferenceException("asd");

        services.AddDbContext<SneakerCheckDbContext>(options =>
        {
            options.UseSqlite(connectionString);
        });

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