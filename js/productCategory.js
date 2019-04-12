/* funcion para la creacion de las laminas de productos*/
function lamProductIdCategory(data, category) {
    let container = document.getElementById('productos-categoria');
    let cantProd = document.getElementById('cantProd');
    let count = 0;
    let html = "<div>";
    for (var i = 0; i < data.length; i++) {
        const element = data[i];
        if (element.categoryId == category) {
            count++;
            html +=
                `<div class="laminas">
                <a href="${element.link}" style="cursor:pointer"><img class="productImg" src="${element.items[0].images[0].imageUrl}"/></a>
                <a href="${element.link}" style="cursor:pointer"><p class="nameLamina">${element.productName}</p></a>
                <a href="${element.link}" style="cursor:pointer"><p class="actualPrice">$ ${element.items[0].sellers[0].commertialOffer.Price} MXN </p></a>
                <a href="${element.items[0].sellers[0].addToCartLink}" class="productButton" style="cursor:pointer">AÑADIR A LA BOLSA</a>
            </div>`;
        }
    }
    html += "</div>";
    container.innerHTML = html;
    cantProd.innerHTML = count;
}

/* funcion para la creacion de las laminas de productos cuando estan ordenadas por mas o mejor vendidos*/
function lamProductIdCategoryBestSeller(data, category) {
    let container = document.getElementById('productos-categoria');
    let cantProd = document.getElementById('cantProd');
    let html = "<div>";
    let arrProd = [];
    for (var i = 0; i < data.length; i++) {
        const element = data[i];
        if (element.categoryId == category) {
            if (element['Más Vendido'] == '1') {
                arrProd.unshift(element);
            } else {
                arrProd.push(element);
            }
        }
    }
    for (var i = 0; i < arrProd.length; i++) {
        const element = arrProd[i];
        html +=
            `<div class="laminas">
                <a href="${element.link}" style="cursor:pointer"><img class="productImg" src="${element.items[0].images[0].imageUrl}"/></a>
                <a href="${element.link}" style="cursor:pointer"><p class="nameLamina">${element.productName}</p></a>
                <a href="${element.link}" style="cursor:pointer"><p class="actualPrice">$ ${element.items[0].sellers[0].commertialOffer.Price} MXN </p></a>
                <a href="${element.items[0].sellers[0].addToCartLink}" class="productButton" style="cursor:pointer">AÑADIR A LA BOLSA</a>
            </div>`;
    }
    html += "</div>";
    container.innerHTML = html;
    cantProd.innerHTML = arrProd.length;
}

/* funcion de llamada a la API de VTEX para obtener los productos segun un Ordenamiento*/
function productCategoryASC(category) {
    var data;

    $.ajax({
            url: "https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/"
        })
        .done(function (responseData) {
            data = responseData;
            lamProductIdCategory(data, category);
        });
}

/* funcion de llamada a la API de VTEX para obtener los productos segun un Ordenamiento*/
function productCategoryDESC(category) {
    var data;

    $.ajax({
            url: "https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameDESC&fq=C:/23/"
        })
        .done(function (responseData) {
            data = responseData;
            lamProductIdCategory(data, category);
        });
}

/* funcion de llamada a la API de VTEX para obtener los productos segun un Ordenamiento*/
function productCategoryBestRate(category) {
    var data;

    $.ajax({
            url: "https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByReviewRateDESC&fq=C:/23/"
        })
        .done(function (responseData) {
            data = responseData;
            lamProductIdCategory(data, category);
        });
}

/* funcion de llamada a la API de VTEX para obtener los productos segun un Ordenamiento*/
function productCategoryReleaseDate(category) {
    var data;

    $.ajax({
            url: "https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByReleaseDateDESC&fq=C:/23/"
        })
        .done(function (responseData) {
            data = responseData;
            lamProductIdCategory(data, category);
        });
}

/* funcion de llamada a la API de VTEX para obtener los productos segun un Ordenamiento*/
function productCategoryBestSeller(category) {
    var data;

    $.ajax({
            url: "https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByTopSaleDESC&fq=C:/23/"
        })
        .done(function (responseData) {
            data = responseData;
            lamProductIdCategoryBestSeller(data, category);
        });
}

/* se llama a esta funcion al acceder a la pagina Categorias para obtener el ID de categoria que paso por un query url*/
function getParameterByName(catId) {
    catId = catId.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + catId + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/* se llama a esta funcion en el onchange() del select del SORT BY*/
function myOrderOfProducts(catId) {
    let typeOfOrder = document.getElementById("selectOrder").value;

    switch (typeOfOrder) {
        case "asc":
            productCategoryASC(catId);
            break;
        case "desc":
            productCategoryDESC(catId);
            break;
        case "bestrate":
            productCategoryBestRate(catId);
            break;
        case "releasedate":
            productCategoryReleaseDate(catId);
            break;
        case "bestseller":
            productCategoryBestSeller(catId);
            break;
        default:
            productCategoryASC(catId);
    }
}