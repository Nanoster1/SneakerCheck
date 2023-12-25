using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SneakerCheck.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "image_models",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "TEXT", nullable: false),
                    bytes = table.Column<byte[]>(type: "BLOB", nullable: false),
                    format = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_image_models", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "user_models",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "TEXT", nullable: false),
                    google_id = table.Column<string>(type: "TEXT", nullable: false),
                    name = table.Column<string>(type: "TEXT", nullable: false),
                    role = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_models", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "shops",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "TEXT", nullable: false),
                    seller_id = table.Column<Guid>(type: "TEXT", nullable: false),
                    name = table.Column<string>(type: "TEXT", nullable: false),
                    city = table.Column<string>(type: "TEXT", nullable: false),
                    address = table.Column<string>(type: "TEXT", nullable: false),
                    description = table.Column<string>(type: "TEXT", nullable: false),
                    icon_id = table.Column<Guid>(type: "TEXT", nullable: false),
                    rate = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_shops", x => x.id);
                    table.ForeignKey(
                        name: "fk_shops_image_models_icon_id",
                        column: x => x.icon_id,
                        principalTable: "image_models",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_shops_user_models_seller_id",
                        column: x => x.seller_id,
                        principalTable: "user_models",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "instructions",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "TEXT", nullable: false),
                    category = table.Column<int>(type: "INTEGER", nullable: false),
                    shop_id = table.Column<Guid>(type: "TEXT", nullable: false),
                    product_name = table.Column<string>(type: "TEXT", nullable: false),
                    preview_image_id = table.Column<Guid>(type: "TEXT", nullable: false),
                    description = table.Column<string>(type: "TEXT", nullable: false),
                    likes = table.Column<int>(type: "INTEGER", nullable: false),
                    dislikes = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_instructions", x => x.id);
                    table.ForeignKey(
                        name: "fk_instructions_image_models_preview_image_id",
                        column: x => x.preview_image_id,
                        principalTable: "image_models",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_instructions_shops_shop_id",
                        column: x => x.shop_id,
                        principalTable: "shops",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "shop_url",
                columns: table => new
                {
                    name = table.Column<string>(type: "TEXT", nullable: false),
                    url = table.Column<string>(type: "TEXT", nullable: false),
                    shop_id = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_shop_url", x => x.name);
                    table.ForeignKey(
                        name: "fk_shop_url_shops_shop_id",
                        column: x => x.shop_id,
                        principalTable: "shops",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "instruction_content",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    original_image_id = table.Column<Guid>(type: "TEXT", nullable: false),
                    fake_image_id = table.Column<Guid>(type: "TEXT", nullable: false),
                    image_description = table.Column<string>(type: "TEXT", nullable: false),
                    instruction_id = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_instruction_content", x => x.id);
                    table.ForeignKey(
                        name: "fk_instruction_content_image_models_fake_image_id",
                        column: x => x.fake_image_id,
                        principalTable: "image_models",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_instruction_content_image_models_original_image_id",
                        column: x => x.original_image_id,
                        principalTable: "image_models",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_instruction_content_instructions_instruction_id",
                        column: x => x.instruction_id,
                        principalTable: "instructions",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "ix_instruction_content_fake_image_id",
                table: "instruction_content",
                column: "fake_image_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_instruction_content_instruction_id",
                table: "instruction_content",
                column: "instruction_id");

            migrationBuilder.CreateIndex(
                name: "ix_instruction_content_original_image_id",
                table: "instruction_content",
                column: "original_image_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_instructions_preview_image_id",
                table: "instructions",
                column: "preview_image_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_instructions_product_name",
                table: "instructions",
                column: "product_name");

            migrationBuilder.CreateIndex(
                name: "ix_instructions_shop_id",
                table: "instructions",
                column: "shop_id");

            migrationBuilder.CreateIndex(
                name: "ix_shop_url_shop_id",
                table: "shop_url",
                column: "shop_id");

            migrationBuilder.CreateIndex(
                name: "ix_shops_icon_id",
                table: "shops",
                column: "icon_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_shops_seller_id",
                table: "shops",
                column: "seller_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_models_google_id",
                table: "user_models",
                column: "google_id",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "instruction_content");

            migrationBuilder.DropTable(
                name: "shop_url");

            migrationBuilder.DropTable(
                name: "instructions");

            migrationBuilder.DropTable(
                name: "shops");

            migrationBuilder.DropTable(
                name: "image_models");

            migrationBuilder.DropTable(
                name: "user_models");
        }
    }
}
