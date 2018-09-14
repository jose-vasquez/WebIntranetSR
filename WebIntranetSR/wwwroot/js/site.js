// Write your JavaScript code.
$('#modalEditar').on('shown.bs.modal', function () {
    $('#myInput').focus()
})

$('#modalAalumno').on('shown.bs.modal', function () {
    $('#Nombre').focus()
})

function getUsuario(id, action)
{
    $.ajax({
        type: "POST",
        url: action,
        data: { id },
        success: function (response)
        {
            //console.log(response)
            mostrarUsuario(response);
        }
    });
}

var items;
var j = 0;

var id;
var userName;
var email;
var phoneNumber;
var role;
var selectRole;

//
var accessFailedCount;
var concurrencyStamp;
var emailConfirmed;
var lockoutEnabled;
var lockoutEnd;
var normalizedUserName;
var normalizedEmail;
var passwordHash;
var phoneNumberConfirmed;
var securityStamp;
var twoFactorEnabled;
//
var nombreA;
var apellidoPaA;
var apellidoMaA;
var dniA;
var gradoA;
var seccionA;
var edadA;
var direccionAA;
var ubigeoA;
var estadoA;


function mostrarUsuario(response)
{
    items = response;
    j = 0;
    for (var i = 0; i < 3; i++)
    {
        var x = document.getElementById('Select');
        x.remove(i);

    }


    $.each(items,function(index,val)
    {
        $('input[name=Id]').val(val.id);
        $('input[name=UserName]').val(val.userName);
        $('input[name=Email]').val(val.email);
        $('input[name=PhoneNumber]').val(val.phoneNumber);
        document.getElementById('Select').options[0] = new Option(val.role, val.rolId);

        $("#dEmail").text(val.email);
        $("#dUserName").text(val.userName);
        $("#dPhoneNumber").text(val.phoneNumber);
        $("#dRole").text(val.role);

        $("#eUsuario").text(val.email);
        $('input[name=EIdUsuario]').val(val.id);
    });

}

function getRoles(action)
{
    $.ajax({
        type: "POST",
        url: action,
        data: {},
        success: function (response)
        {
            if (j == 0)
            {
                for (var i = 0; i < response.length; i++)
                {
                    document.getElementById('Select').options[i] = new Option(response[i].text, response[i].value);
                    document.getElementById('SelectNuevo').options[i] = new Option(response[i].text, response[i].value);

                }
                j = 1;
            }
        }

    });


}


function editarUsuario(action)
{
    id = $('input[name=Id]')[0].value;
    email = $('input[name=Email]')[0].value;
    phoneNumber = $('input[name=PhoneNumber]')[0].value;
    role = document.getElementById('Select');
    selectRole = role.options[role.selectedIndex].text;

    $.each(items, function (index, val)
    {
        accessFailedCount = val.accessFailedCount;
        concurrencyStamp = val.concurrencyStamp;
        emailConfirmed = val.emailConfirmed;
        lockoutEnabled = val.lockoutEnabled;
        lockoutEnd = val.lockoutEnd;
        userName = val.userName;
        normalizedUserName = val.normalizedUserName;
        normalizedEmail = val.normalizedEmail;
        passwordHash = val.passwordHash;
        phoneNumberConfirmed = val.phoneNumberConfirmed;
        securityStamp = val.securityStamp;
        twoFactorEnabled = val.twoFactorEnabled;

    });

    $.ajax({
        type: "POST",
        url: action,
        data: {
            id, userName, email, phoneNumber, accessFailedCount, concurrencyStamp,
            emailConfirmed, lockoutEnabled, lockoutEnd, normalizedEmail, normalizedUserName,
            passwordHash, phoneNumberConfirmed, securityStamp, twoFactorEnabled,
            selectRole
        },

        success: function (response) {
            if (response === "Save") {
                window.location.href = "Usuarios";
            }
            else {
                alert("No se puede Editar los datos del usuario");
            }
        }

    });

}

function ocultarDetalleUsuario()
{
    $("#modalDetalle").modal("hide");
}


function eliminarUsuario(action) {
    var id = $('input[name=EIdUsuario]')[0].value;
    $.ajax({
        type: "POST",
        url: action,
        data: { id },
        success: function (response) {
            if (response === "Delete") {
                window.location.href = "Usuarios";
            }
            else {
                alert("No se puede Eliminar el registro");
            }
        }
    });
}


function crearUsuario(action) {

    email = $('input[name=EmailNuevo]')[0].value;
    phoneNumber = $('input[name=PhoneNumberNuevo]')[0].value;
    passwordHash = $('input[name=PasswordHashNuevo]')[0].value;
    role = document.getElementById('SelectNuevo');
    selectRole = role.options[role.selectedIndex].text;
    respuesta = "";

    if (email == "") {
        $('#EmailNuevo').focus();
        alert("Ingrese  el  email  del  usuario");

    }
    else
    {
        if (passwordHash == "") {
            $('#PasswordHashNuevo').focus();
            alert("Ingrese  el  Password  del  usuario");
        } else
        {
            $.ajax({
                type: "POST",
                url: action,
                data: {
                    email, phoneNumber, passwordHash, selectRole
                },
                success: function (response) {
                    if (response === "Save") {
                        window.location.href = "Usuarios";
                    } else
                    {
                        $('#mensajenuevo').html("No  se  puede  guardar  el  usuario.  <br/>Seleccione  un  rol.  <br/>  Ingrese  un  email  correcto.  <br/>  El  password  debe  tener  de  6-100  caracteres,  al  menos  un  caracter  especial,  una  letra  mayúscula  y  un  número");
                    }
                }
            });

        }

    }

}

$().ready(()=> {
    document.getElementById("filtrar").focus();
    filtrarDatos(1);

});


///sadasdasdasdasdasdasdasdasdsad
var agregarAlumno = () =>
{
    var nombre = document.getElementById("Nombre").value;
    var apellPa = document.getElementById("ApellPa").value;
    var apellMa = document.getElementById("ApellMa").value;
    var dni = document.getElementById("DNI").value;
    var grado = document.getElementById("Grado").value;
    var seccion = document.getElementById("Seccion").value;
    var edad = document.getElementById("Edad").value;
    var direccion = document.getElementById("Direccion").value;
    var ubigeo = document.getElementById("Ubigeo").value;
    var estado = document.getElementById("Estado").value;
    var action = 'Alumnoes/guardarAlumno';


    var alumno = new Alumno(nombre, apellPa, apellMa, dni,
        grado, seccion, edad, direccion, ubigeo, estado,
        action);

    alumno.agregarAlumno();




}

var filtrarDatos = (numPagina) =>
{
    var valor = document.getElementById("filtrar").value;
    var action = 'Alumnoes/filtrarDatos';
    var alumno = new Alumno('nombre', 
                            'apellPa', 
                            'apellMa', 
                            'dni', 
                            'grado', 
                            'seccion',
                            'edad', 
                            'direccion', 
                            'ubigeo', 
                            'estado', 
                            action);
    console.log('Objeto:  ' + Object.values(alumno));
    
    alumno.filtrarDatos(numPagina);
    //alumno.saludo();

}














