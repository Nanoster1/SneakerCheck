namespace SneakerCheck.WebApi.Models;

public class UserModel
{
    public Guid Id { get; set; } = default;
    public required string GoogleId { get; set; }
    public required string Name { get; set; }
    public required UserRole Role { get; set; }
}