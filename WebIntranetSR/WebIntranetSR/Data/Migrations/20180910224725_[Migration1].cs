using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace WebIntranetSR.Data.Migrations
{
    public partial class Migration1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Alumno",
                columns: table => new
                {
                    AlumnoID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ApellMa = table.Column<string>(nullable: true),
                    ApellPa = table.Column<string>(nullable: true),
                    DNI = table.Column<string>(nullable: true),
                    Edad = table.Column<int>(nullable: false),
                    Estado = table.Column<int>(nullable: false),
                    Grado = table.Column<string>(nullable: true),
                    Nombre = table.Column<string>(nullable: true),
                    Seccion = table.Column<string>(nullable: true),
                    Ubigeo = table.Column<int>(nullable: false),
                    direccion = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alumno", x => x.AlumnoID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Alumno");
        }
    }
}
