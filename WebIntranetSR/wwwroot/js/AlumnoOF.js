

function getUsuario(id, action) {
    $.ajax({
        type: "POST",
        url: action,
        data: { id },
        success: function (response) {
            //console.log(response)
            mostrarUsuario(response);
        }
    });
}