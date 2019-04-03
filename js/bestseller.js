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
    console.log(data[0].items[0].images[0].imageUrl);
    console.log(data[0].items);
    console.log(data[0].items[0].images);
    console.log(data[0].items[0].sellers[0].commertialOffer.Price);
    console.log(data[0].link);

    var container = document.getElementById('cards-productos-mas-vendidos');
    var html = "<div>";

    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        var imgDomElmt = '<img class="productImg" src="' + element.items[0].images[0].imageUrl + '"/>';
        var lamName = '<p class="nameLamina">' + element.productName + '</p>';
        var lamActPrice = '<p class="actualprice">$' + element.items[0].sellers[0].commertialOffer.Price + ' </p>';
        var lamButtom = '<a href="' + element.link + '" class="productButton" style="cursor:pointer">VER MÁS</a>';

        html += '<div class="laminas">' +
            imgDomElmt + lamName + lamActPrice + lamButtom;
        html += '</div>';
    }

    html += "</div>";

    container.innerHTML = html;
}