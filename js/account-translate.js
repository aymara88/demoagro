$(document).ready(function () {
    // textos del menu lateral
    if (document.querySelector("a[href='#/cards']")) {
        document.querySelector("a[href='#/cards']").innerText = "Tarjetas de Crédito";
    }
    if (document.querySelector("a[href='#/profile']")) {
        document.querySelector("a[href='#/profile']").innerText = "Mi Perfil";
    }
    if (document.querySelector("a[href='#/addresses']")) {
        document.querySelector("a[href='#/addresses']").innerText = "Direcciones";
    }
    if (document.querySelector("a[href='#/orders']")) {
        document.querySelector("a[href='#/orders']").innerText = "Mis Pedidos";
    }
    if (document.querySelector("a.pointer span")) {
        document.querySelector("a.pointer span").innerText = "Cerrar Sesión";
    }

  /* 
    var myVar = setInterval(myTimer, 1000);

    function myTimer() {
        if($('div.vtex-account__password-box span:contains("You do not have a password defined yet.")')){
            $('label:contains("First name")').text('Nombre');
            $('label:contains("Last name")').text('Apellidos');
            $('label:contains("E-mail")').text('Correo Electrónico');
            $('label:contains("Gender")').text('Sexo');
            $('label:contains("Password")').text('Contraseña');
            $('label:contains("Birth date")').text('Fecha de Nacimiento');
            $('label:contains("Home phone")').text('Teléfono');
            $('button div span:contains("Edit")').text('Editar');
            $('button div span:contains("Set password")').text('Establecer contraseña');
            $('div.vtex-account__password-box span:contains("You do not have a password defined yet.")').text('Aún no tiene una contraseña definida.');
            clearInterval(myVar);
        }
    }
 */
});