namespace SneakerCheck.WebApi.Models;

public class UserModel
{
    public required string Id { get; set; }
    public required string GoogleId { get; set; }
    public required string Name { get; set; }
    public required UserRole Role { get; set; }
}