namespace SneakerCheck.WebApi.Controllers;

public static partial class Routes
{
    public static class ImageModelController
    {
        public const string Prefix = "/image";
        public const string GetById = $"{Prefix}/{{imageId:guid}}";
    }
}