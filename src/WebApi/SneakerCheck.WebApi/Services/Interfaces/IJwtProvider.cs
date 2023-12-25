using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Services.Interfaces;

public interface IJwtProvider
{
    string GenerateToken(UserModel user);
}