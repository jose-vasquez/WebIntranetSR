using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebIntranetSR.Data;
using WebIntranetSR.Models;

namespace WebIntranetSR.ModelsClass
{
    public class AlumnoModels
    {
        private ApplicationDbContext context;

        public AlumnoModels(ApplicationDbContext context)
        {
            this.context = context;
            filtrarDatos(1, "47266593");

        }

        public  List<IdentityError> guardarAlumno(
            string nombre ,string apellPa,
        string apellMa,string dni,string grado,
        string seccion ,int edad,string direccion,
        int ubigeo,int estado)
        {

            var errorList = new List<IdentityError>();
            var alumno = new Alumno
            {
                Nombre = nombre,
                ApellPa =apellPa,
                ApellMa = apellMa,
                DNI = dni,
                Grado = grado,
                Seccion = seccion,
                Edad = edad,
                Direccion = direccion,
                Ubigeo = ubigeo,
                Estado = estado

            };
            context.Add(alumno);
            context.SaveChangesAsync();
            errorList.Add(new IdentityError
            {
                Code = "Save",
                Description = "Save"
            });

            return errorList;
        }



        public List<object[]> filtrarDatos(int numPagina, string valor)
        {
            int count = 0, cant, numRegistro = 0, inicio = 0, reg_por_pagina = 1;
            int can_paginas, pagina;
            string dataFilter = "", paginador = "", Estado = null;
            List<object[]> data = new List<object[]>();
            IEnumerable<Alumno> query;
            var alumno = context.Alumno.OrderBy(c => c.Nombre).ToList();
            numRegistro = alumno.Count;
            inicio = (numPagina - 1) * reg_por_pagina;
            can_paginas = (numRegistro / reg_por_pagina);

            if(valor == "null")
            {

                query = alumno.Skip(inicio).Take(reg_por_pagina);


            }
            else
            {
                query = alumno.Where(c => c.Nombre.StartsWith(valor) || c.DNI.StartsWith(valor))
                .Skip(inicio).Take(reg_por_pagina);
                
            }
            cant = query.Count();
            foreach (var item in query)
            {
                if (item.Estado == 1)
                {
                    Estado = "<a  class='btn  btn-success'>Activo</a>";
                }
                else
                {
                    Estado = "<a class ='btn btn-success'>No Activo</a>";

                }


                dataFilter += "<tr>" + 
                    "<td>" + item.Nombre + "</td>" + 
                    "<td>" + item.ApellPa + "</td>" +
                    "<td>" + item.ApellMa + "</td>" +
                    "<td>" + item.DNI + "</td>" +
                    "<td>" + item.Grado + "</td>" +
                    "<td>" + item.Seccion + "</td>" +
                    "<td>" + item.Edad + "</td>" +
                    "<td>" + item.Direccion + "</td>" +
                    "<td>" + item.Ubigeo + "</td>" +
                    "<td>" + item.Ubigeo + "</td>" +
                    "<td>" + Estado + "  </td>" + 
                    "<td>" + "<a  data-toggle='modal'  data-target='#myModal'  class='btn  btn-success'>Edit</a>|" + 
                    "<a  data-toggle='modal'  data-target='#myModal3'  class='btnbtn-danger'  >Delete</a>" + "</td>" + 
                    "</tr>";
            }
            object[] dataObj = { dataFilter, paginador };
            data.Add(dataObj);


            return data;
        }

            

        }

}

