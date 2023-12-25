using Serilog;

namespace SneakerCheck.WebApi.Logging;

public static class Module
{
    public static IServiceCollection AddServerLogging(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddLogging(builder =>
        {
            builder.ClearProviders();

            builder.ClearProviders();
            builder.AddSerilog(configuration);
        });
        return services;
    }

    private static ILoggingBuilder AddSerilog(this ILoggingBuilder builder, IConfiguration config)
    {
        var serilogLogger = new LoggerConfiguration()
            .ReadFrom.Configuration(config)
            .Enrich.FromLogContext()
            .CreateLogger();

        builder.AddSerilog(serilogLogger);
        return builder;
    }
}