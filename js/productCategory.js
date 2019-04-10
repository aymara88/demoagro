function productCategory(category, categoryLink) {
    console.log(category);
    console.log(categoryLink);
    var data;

    $.ajax({
            url: "https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/"
        })
        .done(function (responseData) {
            data = responseData;
            console.log(data);
            lamProductIdCategory();
        });

    function lamProductIdCategory() {
        /*let container = document.getElementById('productos-categoria');
        console.log(container);*/
        let html;
        for (var i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.categoryId == category) {
                var imgDomElmt = '<a href="' + element.link + '" style="cursor:pointer"><img class="productImg" src="' + element.items[0].images[0].imageUrl + '"/></a>';
                var lamName = '<a href="' + element.link + '" style="cursor:pointer"><p class="nameLamina">' + element.productName + '</p></a>';
                var lamActPrice = '<a href="' + element.link + '" style="cursor:pointer"><p class="actualPrice">$' + element.items[0].sellers[0].commertialOffer.Price + ' MXN </p></a>';
                var lamButtom = '<a href="' + element.items[0].sellers[0].addToCartLink + '" class="productButton" style="cursor:pointer">AÑADIR A LA BOLSA</a>';

                html += '<div class="laminas">' +
                    imgDomElmt + lamName + lamActPrice + lamButtom;
                html += '</div>';
                console.log(html);
            }
        }

        return html;
        /* var myWindow = window.open('https://demoagro.myvtex.com/agro-categorias/' + categoryLink + '', "_self");
        myWindow.document.write(html); */

        /*container.innerHTML = html;+/

    }

}


