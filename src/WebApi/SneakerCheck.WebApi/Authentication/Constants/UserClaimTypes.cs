using System.Security.Claims;

namespace SneakerCheck.WebApi.Authentication.Constants;

public static class UserClaimTypes
{
    public const string Id = ClaimTypes.NameIdentifier;
    public const string Name = ClaimTypes.Name;
    public const string Role = ClaimTypes.Role;
}