using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SneakerCheck.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddedUserCity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "city",
                table: "user_models",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "city",
                table: "user_models");
        }
    }
}
