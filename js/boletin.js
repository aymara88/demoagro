function suscripcionBoletin() {
    let mailIdModal = document.getElementById("emailModal");
    let emailModal = mailIdModal.value;
    let mensajeUsuarioModal = document.getElementById("mensajeModal");
    let isNewsletterOptInModal = document.getElementById("isNewsletterOptInModal").value;
    console.log(isNewsletterOptInModal);

    if (emailModal == "") {
        mensajeUsuarioModal.classList.remove("mensajeOk");
        mensajeUsuarioModal.classList.add("mensajeError");
        mensajeUsuarioModal.innerHTML = "Necesita introducir su correo para suscribirse.";
        return false;
    }

    let regexModal = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regexModal.test(emailModal)) {
        mensajeUsuarioModal.classList.remove("mensajeOk");
        mensajeUsuarioModal.classList.add("mensajeError");
        mensajeUsuarioModal.innerHTML = "El email introducido no es válido.";
        return false;
    } else {
        mensajeUsuarioModal.classList.add("mensajeOk");
        mensajeUsuarioModal.classList.remove("mensajeError");
        let newsLetterModalVar = {
            "email": emailModal,
            "boletin": isNewsletterOptInModal
        }
        let newsLetterModalData = JSON.stringify(newsLetterModalVar);
        fetch('http://api.vtex.com/tesselar/dataentities/CL/documents', {
                method: 'PATCH',
                body: newsLetterModalData,
                headers: {
                    "Content-type": "application/json",
                    "x-vtex-api-appKey": "vtexappkey-tesselar-PLDWZC",
                    "x-vtex-api-appToken": "GLURZCESHTOYXIGUGHHYGSKWUSEBAHFRDELYHNGRSUQRVAXLZMTEDADOAYWHYCRZOWUTXINSBQFMCSATUSCOOANDBXXJQYSPDQDYFEORZADNUQLHXDNGADLOJQSAKDBC",
                    "Accept": "application/vnd.vtex.ds.v10+json"
                }
            })
            .then(response => response.json())
            .then(json => {
                mensajeUsuarioModal.innerHTML = 'Gracias por suscribirte a nuestro boletín de noticias.';
            })
            .catch(function () {
                mensajeUsuarioModal.innerHTML = 'Usted ya se encuentra registrado a nuestro boletín de noticias.';
            })
        return false;
    }
}