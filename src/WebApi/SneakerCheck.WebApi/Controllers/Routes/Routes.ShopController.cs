namespace SneakerCheck.WebApi.Controllers;

public static partial class Routes
{
    public static class ShopController
    {
        public const string Prefix = "/shop";
        public const string Create = Prefix;
        public const string GetAll = $"{Prefix}/all";
        public const string GetById = $"{Prefix}/{{shopId:guid}}";
        public const string GetBySellerId = $"{Prefix}/seller/{{sellerId:guid}}";
    }
}