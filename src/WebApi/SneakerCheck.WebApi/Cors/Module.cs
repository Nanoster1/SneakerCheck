namespace SneakerCheck.WebApi.Cors;

public static class Module
{
    private static readonly string[] DevelopOrigins = [
        "http://localhost:5000",
        "https://localhost:8080"
    ];

    public static IServiceCollection AddServerCors(this IServiceCollection services, IWebHostEnvironment environment)
    {
        services.AddCors(options =>
        {
            if (environment.IsDevelopment())
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.AllowAnyHeader()
                        .AllowCredentials()
                        .WithOrigins(DevelopOrigins)
                        .AllowAnyMethod();
                });
            }
        });

        return services;
    }
}