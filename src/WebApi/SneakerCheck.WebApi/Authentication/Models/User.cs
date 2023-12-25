namespace SneakerCheck.WebApi.Authentication.Models;

public record class User(Guid Id, string Name, string Role);