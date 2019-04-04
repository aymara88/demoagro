$(document).ready(function () {

    var data;

    $.ajax({
            url: "https://demoagro.myvtex.com/api/catalog_system/pub/products/search/?fq=productClusterIds:140?fq=specificationFilter_79:1"
        })
        .done(function (responseData) {
            data = responseData;
            renderData();
        });

    function renderData() {

        console.log(data);

        var container = document.getElementById('mas-vendidos-carrusel');
        var html;

        for (let i = 0; i < data.length; i++) {
            const element = data[i];

            var imgDomElmt = '<img class="productImg" src="' + element.items[0].images[0].imageUrl + '"/>';
            var lamName = '<p class="nameLamina">' + element.productName + '</p>';
            var lamActPrice = '<p class="actualPrice">$' + element.items[0].sellers[0].commertialOffer.Price + ' MXN </p>';
            var lamButtom = '<a href="' + element.link + '" class="productButton" style="cursor:pointer">AÑADIR A LA BOLSA</a>';

            html += '<div class="laminas">' +
                imgDomElmt + lamName + lamActPrice + lamButtom;
            html += '</div>';
        }

        container.innerHTML = html;
    }
});