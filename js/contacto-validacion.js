function NumText(string) {
    var out = '';
    var filtro = 'abcdefghijklmnÃ±opqrstuvwxyzABCDEFGHIJKLMNÃ‘OPQRSTUVWXYZ1234567890Ã¡Ã©Ã­Ã³ÃºÃÃ‰ÃÃ“Ãš@.Â¡!Â¿? ';
    for (var i = 0; i < string.length; i++)
        if (filtro.indexOf(string.charAt(i)) != -1)
            out += string.charAt(i);
    return out;
}

function validarContact() {
    let nameContact = document.getElementById("nameContact");
    let emailContact = document.getElementById("emailContact");
    let affairContact = document.getElementById("affairContact");
    let messageContact = document.getElementById("messageContact");
    let campoVacio = "Este campo es obligatorio";
    if (nameContact.value == "") {
        nameContact.style.border = "2px solid darkgreen";
        nameContact.placeholder = campoVacio;
    } else {
        nameContact.style.border = "1px solid rgb(130, 207, 85)";
    }
    if (emailContact.value == "") {
        emailContact.style.border = "2px solid darkgreen";
        emailContact.placeholder = campoVacio;
    } else {
        emailContact.style.border = "1px solid rgb(130, 207, 85)";
    }
    if (affairContact.value == "") {
        affairContact.style.border = "2px solid darkgreen";
        affairContact.placeholder = campoVacio;
    } else {
        affairContact.style.border = "1px solid rgb(130, 207, 85)";
    }
    if (messageContact.value == "") {
        messageContact.style.border = "2px solid darkgreen";
        messageContact.placeholder = campoVacio;
    } else {
        messageContact.style.border = "1px solid rgb(130, 207, 85)";
    }
    let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(emailContact.value)) {
        emailContact.style.border = "2px solid darkgreen";
        emailContact.value = "";
        emailContact.placeholder = "El email no es válido";
        emailContact.style.border = "2px solid darkgreen";
    } else if (regex.test(emailContact.value) && nameContact.value != "" && emailContact.value != "" && affairContact.value != "" && messageContact.value != "") {
        emailContact.style.border = "1px solid rgb(130, 207, 85)";
        var frmData = new Object();
        frmData.nombre = nameContact.value;
        frmData.email = emailContact.value;
        frmData.asunto = affairContact.value;
        frmData.mensaje = messageContact.value;;
        var data = JSON.stringify(frmData);
        let http_request = configHttpRequest.getConfig();
        http_request.open("PATCH", "http://api.vtex.com/tesselar/dataentities/CO/documents", true);
        http_request.setRequestHeader("Content-type", "application/json");
        http_request.setRequestHeader("x-vtex-api-appKey", "vtexappkey-tesselar-PLDWZC");
        http_request.setRequestHeader("x-vtex-api-appToken", "GLURZCESHTOYXIGUGHHYGSKWUSEBAHFRDELYHNGRSUQRVAXLZMTEDADOAYWHYCRZOWUTXINSBQFMCSATUSCOOANDBXXJQYSPDQDYFEORZADNUQLHXDNGADLOJQSAKDBC");
        http_request.send(data);
        document.getElementById("frmContact").reset();
        let container = document.getElementById("mensaje_exito");
        container.innerHTML = "Hemos recibido su comentario y le daremos respuesta lo antes posible.";
        return false;
    }
}