function lamProductIdCategory(data, category) {
    let container = document.getElementById('productos-categoria');
    let html;
    for (var i = 0; i < data.length; i++) {
        const element = data[i];
        if (element.categoryId == category) {
            html +=
                `<div class="laminas">
                <a href="${element.link}" style="cursor:pointer"><img class="productImg" src="${element.items[0].images[0].imageUrl}"/></a>
                <a href="${element.link}" style="cursor:pointer"><p class="nameLamina">${element.productName}</p></a>
                <a href="${element.link}" style="cursor:pointer"><p class="actualPrice">$ ${element.items[0].sellers[0].commertialOffer.Price} MXN </p></a>
                <a href="${element.items[0].sellers[0].addToCartLink}" class="productButton" style="cursor:pointer">AÑADIR A LA BOLSA</a>
            </div>`;
        }
    }
    container.innerHTML = html;
}

function productCategoryASC(category) {
    var data;

    $.ajax({
            url: "https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/"
        })
        .done(function (responseData) {
            data = responseData;
            console.log(data);
            lamProductIdCategory(data, category);
        });
}

function productCategoryDESC(category) {
    var data;

    $.ajax({
            url: "https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameDESC&fq=C:/23/"
        })
        .done(function (responseData) {
            data = responseData;
            console.log(data);
            lamProductIdCategory(data, category);
        });
}

function productCategoryBestRate(category) {
    var data;

    $.ajax({
            url: "https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByReviewRateDESC&fq=C:/23/"
        })
        .done(function (responseData) {
            data = responseData;
            console.log(data);
            lamProductIdCategory(data, category);
        });
}

function productCategoryReleaseDate(category) {
    var data;

    $.ajax({
            url: "https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByReleaseDateDESC&fq=C:/23/"
        })
        .done(function (responseData) {
            data = responseData;
            console.log(data);
            lamProductIdCategory(data, category);
        });
}

function getParameterByName(catId) {
    catId = catId.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + catId + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function myOrderOfProducts(catId) {
    let typeOfOrder = document.getElementById("selectOrder").value;
    console.log(catId);

    if (typeOfOrder == 'asc') {
        productCategoryASC(catId);
    } else if (typeOfOrder == 'desc') {
        productCategoryDESC(catId);
    } else if (typeOfOrder == 'bestrate') {
        productCategoryBestRate(catId);
    } else if (typeOfOrder == 'releasedate') {
        productCategoryReleaseDate(catId);
    }
}