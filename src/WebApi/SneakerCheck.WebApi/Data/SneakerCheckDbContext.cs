using Microsoft.EntityFrameworkCore;

using SneakerCheck.WebApi.Models;

namespace SneakerCheck.WebApi.Data;

public class SneakerCheckDbContext(DbContextOptions<SneakerCheckDbContext> options) : DbContext(options)
{
    public const string ConnectionStringName = "SneakerCheck";

    public static void Configure(DbContextOptionsBuilder options, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString(SneakerCheckDbContext.ConnectionStringName);
        if (connectionString is null) throw new NullReferenceException(nameof(connectionString));
        options.UseSqlite(connectionString).UseSnakeCaseNamingConvention();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(SneakerCheckDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }

    public DbSet<Shop> Shops { get; set; }
    public DbSet<ImageModel> ImageModels { get; set; }
    public DbSet<Instruction> Instructions { get; set; }
    public DbSet<UserModel> UserModels { get; set; }
}