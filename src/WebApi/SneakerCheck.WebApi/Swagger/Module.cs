using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

using SneakerCheck.WebApi.Authentication.Schemes;

using Swashbuckle.AspNetCore.SwaggerGen;

namespace SneakerCheck.WebApi.Swagger;

public static class Module
{
    public static IServiceCollection AddServerSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(options =>
        {
            AddSecurityDefinition(options);
            options.SupportNonNullableReferenceTypes();
        });

        return services;
    }

    private static void AddSecurityDefinition(SwaggerGenOptions options)
    {
        options.AddSecurityDefinition(JwtScheme.SchemeName, new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Description = "Enter token",
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            BearerFormat = "JWT",
            Scheme = JwtBearerDefaults.AuthenticationScheme
        });

        options.AddSecurityDefinition(GoogleJwtScheme.SchemeName, new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Description = "Enter token",
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            BearerFormat = "JWT",
            Scheme = JwtBearerDefaults.AuthenticationScheme
        });

        options.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Name = JwtScheme.SchemeName,
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = JwtScheme.SchemeName
                    }
                },
                Array.Empty<string>()
            },
            {
                new OpenApiSecurityScheme
                {
                    Name = GoogleJwtScheme.SchemeName,
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = GoogleJwtScheme.SchemeName
                    }
                },
                Array.Empty<string>()
            }
        });
    }
}