namespace SneakerCheck.WebApi.Controllers;

public static partial class Routes
{
    public static class InstructionController
    {
        public const string Prefix = "/instruction";
        public const string Create = Prefix;
        public const string GetAll = $"{Prefix}/all";
        public const string GetById = $"{Prefix}/{{instructionId:guid}}";
    }
}