using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebIntranetSR.Models
{
    public class Alumno
    {
        public int AlumnoID { get; set; }
        public string Nombre { get; set; }
        public string ApellPa { get; set; }
        public string ApellMa { get; set; }
        public string DNI { get; set; }
        public string Grado { get; set; }
        public string Seccion { get; set; }
        public int Edad { get; set; }
        public string Direccion { get; set; }
        public int Ubigeo { get; set; }
        public int Estado { get; set; }


    }
}
