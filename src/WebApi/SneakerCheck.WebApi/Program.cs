using Hellang.Middleware.ProblemDetails;

using SneakerCheck.WebApi.Authentication;
using SneakerCheck.WebApi.Cors;
using SneakerCheck.WebApi.Data;
using SneakerCheck.WebApi.Errors;
using SneakerCheck.WebApi.Logging;
using SneakerCheck.WebApi.Services;
using SneakerCheck.WebApi.Swagger;

var builder = WebApplication.CreateBuilder(args);
var environment = builder.Environment;
var configuration = builder.Configuration;

var services = builder.Services;
{
    services.AddServerData(configuration);
    services.AddServerServices();
    services.AddServerCors(environment);
    services.AddServerAuthentication();
    services.AddServerProblemDetails();
    services.AddServerSwagger();
    services.AddServerLogging(configuration);
    services.AddEndpointsApiExplorer();
    services.AddControllers();
}

var app = builder.Build();
{
    app.UseProblemDetails();
    app.UseCors();

    if (app.Environment.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI();
    }
    else
    {
        app.UseExceptionHandler("/error");
    }

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();
}

app.MigrateDatabase();
app.Run();
