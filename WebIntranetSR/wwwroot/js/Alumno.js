
class Alumno {
    constructor(nombre, 
                apellPa, 
                apellMa, 
                dni, 
                grado, 
                seccion,
                edad, 
                direccion, 
                ubigeo, 
                estado, 
                action)
    {
        this.nombre = nombre;
        this.apellPa = apellPa;
        this.apellMa = apellMa;
        this.dni = dni;
        this.grado = grado;
        this.seccion = seccion;
        this.edad = edad;
        this.direccion = direccion;
        this.ubigeo = ubigeo;
        this.estado = estado;
        this.action = action;

    }
    saludo()
    {
        console.log('Hola, la clase alumno funciona correctamente');
    }
    
    filtrarDatos(numPagina)
    {
        var valor = this.nombre;
        var action = this.action;
        console.log('action' + action);
        if (valor == "")
        {
            valor = null;

        }

        $.ajax({
            type: "POST",
            url: action,
            data: { valor, numPagina },
            success: (response) => {
                console.log(response);

                $.each(response,(index, val) => {
                    $("#resultSearch").html(val[0]);
                    $("#paginado").html(val[1]);
                });
            }
        });

    }
    restablecer()
    {
        document.getElementById("Nombre").value = "";
        document.getElementById("ApellPa").value = "";
        document.getElementById("ApellMa").value = "";
        document.getElementById("DNI").value = "";
        document.getElementById("Grado").value = "";
        document.getElementById("Seccion").value = "";
        document.getElementById("Edad").value = 0;
        document.getElementById("Direccion").value = "";
        document.getElementById("Ubigeo").value = 0;
        document.getElementById("Estado").value = 0;

        $('#modalAalumno').modal('hide');
        filtrarDatos(1);
    }
    agregarAlumno() {
        if (this.nombre == "") {
            document.getElementById("Nombre").focus();


        } else         {
            if (this.apellPa == "") {
                document.getElementById("ApellPa").focus();


            } else
            {
                if (this.apellMa == "") {
                    document.getElementById("ApellMa").focus();


                } else
                {
                    if (this.dni == "") {
                        document.getElementById("DNI").focus();


                    } else
                    {
                        if (this.edad == "") {
                            document.getElementById("Edad").focus();


                        } else
                        {
                            
                            var nombre = this.nombre;
                            var apellPa = this.apellPa;
                            var apellMa = this.apellMa;
                            var dni = this.dni;
                            var grado = this.grado;
                            var seccion = this.seccion;
                            var edad = this.edad;
                            var direccion = this.direccion;
                            var ubigeo = this.ubigeo;
                            var estado = this.estado;
                            var action = this.action;
                            var mensaje = '';
                            $.ajax({
                                type: "POST",
                                url: action,
                                data: {
                                    nombre, apellPa,apellMa,
                                    dni, grado, seccion, edad, direccion,
                                    ubigeo, estado

                                },
                                success: (response) => {

                                    $.each(response, (index, val) => {
                                        mensaje = val.code;
                                        console.log(mensaje);
                                    });
                                    if (mensaje == "Save") {
                                        this.restablecer();
                                        

                                    } else {

                                        document.getElementById("mensaje").innerHTML= "No se puede guardar el Alumno"
                                    }

                                   // console.log(response);

                                }


                            });

                        }

                    }

                }

            }
        }
      

    }

}
