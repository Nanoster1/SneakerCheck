namespace SneakerCheck.WebApi.Controllers;

public static partial class Routes
{
    public static class ProductController
    {
        public const string Prefix = "/product";
        public const string GetAll = $"{Prefix}/all";
        public const string GetById = $"{Prefix}/{{productId:guid}}";
    }
}