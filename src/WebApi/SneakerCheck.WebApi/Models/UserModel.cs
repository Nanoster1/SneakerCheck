namespace SneakerCheck.WebApi.Models;

public class UserModel
{
    public string Id { get; set; } = string.Empty;
    public required string GoogleId { get; set; }
    public required string Name { get; set; }
    public required UserRole Role { get; set; }
}