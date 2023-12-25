namespace SneakerCheck.WebApi.Controllers;

public static partial class Routes
{
    public static class AuthenticationController
    {
        public const string Prefix = "/auth";
        public const string GoogleGetToken = $"{Prefix}/google";
    }
}