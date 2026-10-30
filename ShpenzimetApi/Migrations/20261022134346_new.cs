using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ShpenzimetApi.Migrations
{
    /// <inheritdoc />
    public partial class @new : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Kategorite",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Ngjyra = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kategorite", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Shpenzimet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Pershkrimi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Shuma = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Data = table.Column<DateTime>(type: "datetime2", nullable: false),
                    KategoriaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shpenzimet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Shpenzimet_Kategorite_KategoriaId",
                        column: x => x.KategoriaId,
                        principalTable: "Kategorite",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Kategorite",
                columns: new[] { "Id", "Emri", "Ngjyra" },
                values: new object[,]
                {
                    { 1, "Ushqim", "#4CAF50" },
                    { 2, "Transport", "#2196F3" },
                    { 3, "Argëtim", "#FF9800" },
                    { 4, "Fatura", "#F44336" },
                    { 5, "Tjetër", "#9E9E9E" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Kategorite_Emri",
                table: "Kategorite",
                column: "Emri",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Shpenzimet_KategoriaId",
                table: "Shpenzimet",
                column: "KategoriaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Shpenzimet");

            migrationBuilder.DropTable(
                name: "Kategorite");
        }
    }
}
