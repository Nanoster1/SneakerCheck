using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Dto;

public record UserGetDto(
    Guid Id,
    string Name,
    UserRole Role,
    string? City
)
{
    public static UserGetDto FromModel(UserModel model)
    {
        return new UserGetDto(
            model.Id,
            model.Name,
            model.Role,
            model.City);
    }
}