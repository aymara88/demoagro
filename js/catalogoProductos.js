/* se llama a esta funcion al acceder a la pagina Categorias para obtener el ID de categoria que paso por un query url*/
function getParameterByName(catId) {
    catId = catId.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + catId + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/* funcion de llamada a la API de VTEX para obtener los productos segun un Ordenamiento*/
function productCategoryGet(catIdUrl) {
    console.log("categoryId", catIdUrl);
    var data;

    if (catIdUrl == 23) {
        $.ajax({
                url: "https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/"
            })
            .done(function (responseData) {
                data = responseData;
                lamAllProducts(data);
                filtrosSubCategorias(data, catIdUrl);
            });
    } else {
        $.ajax({
                url: ("https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/" + catIdUrl)
            })
            .done(function (responseData) {
                data = responseData;
                lamProductsByCatId(data, catIdUrl);
                filtrosSubCategorias(data, catIdUrl);
            });
    }
}

/* funcion para laminar todos los productos sin importar sus subcategorias */
function lamAllProducts(data) {
    console.log("productos: ", data);
    let container = document.getElementById('productos-categoria');
    let cantProd = document.getElementById('cantProd');
    let count = 0;
    let html = "<div>";
    for (var i = 0; i < data.length; i++) {
        const element = data[i];
        count++;
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
    cantProd.innerHTML = count;
    paginadoProductos(3);
}

/* funcion para la creacion de las laminas de productos*/
function lamProductsByCatId(data, catIdUrl) {
    console.log("productos: ", data);
    let container = document.getElementById('productos-categoria');
    let cantProd = document.getElementById('cantProd');
    let count = 0;
    let html = "<div>";
    for (var i = 0; i < data.length; i++) {
        const element = data[i];
        if (element.categoryId == catIdUrl) {
            count++;
            html +=
                `<div class="laminas">
                <a href="${element.link}" style="cursor:pointer"><img class="productImg" src="${element.items[0].images[0].imageUrl}"/></a>
                <a href="${element.link}" style="cursor:pointer"><p class="nameLamina">${element.productName}</p></a>
                <a href="${element.link}" style="cursor:pointer"><p class="actualPrice">$ ${element.items[0].sellers[0].commertialOffer.Price} MXN </p></a>
                <a href="${element.items[0].sellers[0].addToCartLink}" class="productButton" style="cursor:pointer">AÑADIR A LA BOLSA</a>
            </div>`;
        } else if ((catIdUrl == 25) && (element.categoryId == 31 || element.categoryId == 32)) {
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
    paginadoProductos(3);
}

/* funcion para la creacion del filtro por subcategorias*/
function filtrosSubCategorias(data, catIdUrl) {
    let container = document.getElementById('radio-categoria');
    let arrProductsCategories = [];
    //forEach para recorrer los productos mostrados y reservar sus categorias y las de su padre
    data.forEach(item => {
        let productCategory = {
            categoryId: item.categoryId,
            categoryNames: item.categories[0].split('/'),
            categoriesIds: item.categoriesIds[0].split('/')
        }
        arrProductsCategories.push(productCategory);
    });
    //aca va el eliminar elementos duplicados basandome en su categoryId del arrProductsCategories y tambien se limpian de vacios los array dentro de los productos de categoryNames and Ids
    arrProductsCategories = getUnique(arrProductsCategories, 'categoryId');
    arrProductsCategories.forEach(element => {
        element.categoryNames = element.categoryNames.filter(function (e) {
            return e
        });
        element.categoriesIds = element.categoriesIds.filter(function (e) {
            return e
        });
    });
    console.log("arrProductsCategories eliminando elementos vacios de categoryNames and Ids", arrProductsCategories);

    let html = "<h2 class='filtroh2'>Categorías</h2>";

    if (arrProductsCategories.length == 1) {
        console.log(arrProductsCategories[0].categoryNames.length);
        console.log(arrProductsCategories[0].categoryNames.length - 1);
        html +=
            ` <label class="container">${arrProductsCategories[0].categoryNames[arrProductsCategories[0].categoryNames.length-1]}
                 <input type="radio" name="categoria" checked='checked' value="${arrProductsCategories[0].categoryId}"/>
                 <span class="checkmark"></span>
              </label>
            `;
    } else if (arrProductsCategories.length > 1) {
        html += "<label class='container'>SIN FILTROS<input type='radio' checked='checked' name='categoria' value='" + catIdUrl + "'  /><span class='checkmark'></span></label>";
        let arrFiltros = [];
        if (catIdUrl == 23) {
            for (let i = 0; i < arrProductsCategories.length; i++) {
                const element = arrProductsCategories[i];
                let products;
                if(element.categoriesIds.length > 2 && element.categoryNames.length > 2){
                    products = {
                        categoriaId: element.categoryId,
                        categoriaNombre: element.categoryNames[1],
                        categoriaIdPadre: element.categoriesIds[1]
                    };
                } else {
                    products = {
                        categoriaId: element.categoryId,
                        categoriaNombre: element.categoryNames[1]
                    };
                }                
                arrFiltros.push(products);
            }
        } else {
            for (let i = 0; i < arrProductsCategories.length; i++) {
                const element = arrProductsCategories[i];
                if (element.categoryNames[2] != "" && element.categoriesIds[1] === catIdUrl) {
                    let products = {
                        categoriaId: element.categoryId,
                        categoriaNombre: element.categoryNames[2],
                        categoriaIdPadre: element.categoriesIds[1]
                    };
                    arrFiltros.push(products);
                }
            }
        }

        console.log("arreglo ya mas preparado",arrFiltros);

        let arrCategoriasUniqueFiltrado = getUnique(arrFiltros, 'categoriaNombre');
        for (let i = 0; i < arrCategoriasUniqueFiltrado.length; i++) {
            const element = arrCategoriasUniqueFiltrado[i];
            html +=
                ` <label class="container">${element.categoriaNombre}
                 <input type="radio" name="categoria" value="${element.categoriaId}"/>
                 <span class="checkmark"></span>
              </label>
            `;
        }
    }
    container.innerHTML = html;

    $("input[name='categoria']").on("change", function () {
        let catIdRadio = this.value;
        let catIdUrl = catIdUrl;
        let especificacion = document.querySelector('input[name="especificacion"]:checked').value;
        console.log(catIdRadio);
        console.log(catIdUrl);
        console.log(especificacion);
        ajaxCallEspecification(especificacion, catIdRadio, catIdUrl);
    });

    $("input[name='especificacion']").on("change", function () {
        let especificacion = this.value;
        let catIdUrl = catIdUrl;
        let catIdRadio = document.querySelector('input[name="categoria"]:checked').value;
        console.log(catIdRadio);
        console.log(catIdUrl);
        console.log(especificacion);
        ajaxCallEspecification(especificacion, catIdRadio, catIdUrl);
    });
}

/* funcion para obtener el unico */
function getUnique(arr, comp) {
    const unique = arr
        .map(e => e[comp])
        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)
        // eliminate the dead keys & store unique objects
        .filter(e => arr[e]).map(e => arr[e]);
    return unique;
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