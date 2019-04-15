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
    paginadoProductos(2);
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
        if (element.productName) {
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
    cantProd.innerHTML = arrProd.length;
    paginadoProductos(2);
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

function cantOfProductsToShow() {
    let pageSizeSelect = document.getElementById("selectProductPerPage").value;

    switch (pageSizeSelect) {
        case "6":
            paginadoProductos(6);
            break;
        case "9":
            paginadoProductos(9);
            break;
        case "12":
            paginadoProductos(12);
            break;
        case "15":
            paginadoProductos(15);
            break;
        case "all":
            paginadoProductos('all');
            break;
        default:
            paginadoProductos(2);
    }
}

/**********Paginado***********/
function paginadoProductos(pageSizeSelect) {

    if (pageSizeSelect !== 'all') {
        pageSize = pageSizeSelect;
    } else if (pageSizeSelect == 'all') {
        pageSize = $('.laminas').length;
    }

    pagesCount = $(".laminas").length;
    var currentPage = 1;

    /////////// PREPARE NAV ///////////////
    var nav = '';

    console.log($(".numeros"));
    console.log($(".numeros").length);

    if ($(".numeros").length > 0) {
        var lis = document.querySelectorAll('.pagination .numeros');
        for (var i = 0; li = lis[i]; i++) {
            li.parentNode.removeChild(li);
        }
    }

    var totalPages = Math.ceil(pagesCount / pageSize);
    for (var s = 0; s < totalPages; s++) {
        nav += '<li class="numeros"><a href="#">' + (s + 1) + '</a></li>';
    }
    $(".pag_prev").after(nav);
    $(".numeros").first().addClass("active");
    //////////////////////////////////////

    showPage = function () {
        $(".laminas").hide().each(function (n) {
            if (n >= pageSize * (currentPage - 1) && n < pageSize * currentPage)
                $(this).show();
        });
    }
    showPage();


    $(".pagination li.numeros").click(function () {
        $(".pagination li").removeClass("active");
        $(this).addClass("active");
        currentPage = parseInt($(this).text());
        showPage();
    });

    $(".pagination li.pag_prev").click(function () {
        if ($(this).next().is('.active')) return;
        $('.numeros.active').removeClass('active').prev().addClass('active');
        currentPage = currentPage > 1 ? (currentPage - 1) : 1;
        showPage();
    });

    $(".pagination li.pag_next").click(function () {
        if ($(this).prev().is('.active')) return;
        $('.numeros.active').removeClass('active').next().addClass('active');
        currentPage = currentPage < totalPages ? (currentPage + 1) : totalPages;
        showPage();
    });
}
/**********Paginado***********/