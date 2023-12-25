using Hellang.Middleware.ProblemDetails;

namespace SneakerCheck.WebApi.Errors;

public static class Module
{
    public static IServiceCollection AddServerProblemDetails(this IServiceCollection services)
    {
        ProblemDetailsExtensions.AddProblemDetails(services);
        return services;
    }
}