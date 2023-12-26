namespace SneakerCheck.WebApi.Controllers;

public static partial class Routes
{
    public static class UserController
    {
        public const string Prefix = "/user";
        public const string ChangeCity = $"{Prefix}/change-city";
        public const string GetUserInfo = $"{Prefix}/info";
    }
}