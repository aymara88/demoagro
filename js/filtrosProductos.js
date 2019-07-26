function filtrosDeProductos(catId) {
    var data;

    if (catId == 23) {
        $.ajax({
                url: "https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/"
            })
            .done(function (responseData) {
                data = responseData;
                filtrosSubCategorias(data, catId);
            });
    } else {
        $.ajax({
                url: ("https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/" + catId)
            })
            .done(function (responseData) {
                data = responseData;
                filtrosSubCategorias(data, catId);
            });
    }
}

function filtrosSubCategorias(data, catId) {
    let container = document.getElementById('radio-categoria');
    let arrCategorias = [];

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let products = {
            categoriaId: element.categoryId,
            categoriaNombre: element.categories[0].split('/')
        };
        arrCategorias.push(products);
    }
    console.log(data);
    console.log(arrCategorias);
    let arrCategoriasUnique = getUnique(arrCategorias, 'categoriaId');
    console.log(arrCategoriasUnique);
    let html = "<h2 class='filtroh2'>Categorías</h2>";

    if (arrCategoriasUnique.length == 1) {
        html +=
            ` <label class="container">${arrCategoriasUnique[0].categoriaNombre[2]}
                 <input type="radio" name="categoria" checked='checked' value="${arrCategoriasUnique[0].categoriaId}"/>
                 <span class="checkmark"></span>
              </label>
            `;

    } else if (arrCategoriasUnique.length > 1) {
        html += "<label class='container'>SIN FILTROS<input type='radio' checked='checked' name='categoria' value='" + catId + "'  /><span class='checkmark'></span></label>";
        let arrFiltros = [];
        if (catId == 23) {
            for (let i = 0; i < arrCategoriasUnique.length; i++) {
                const element = arrCategoriasUnique[i];
                let products = {
                    categoriaId: element.categoriaId,
                    categoriaNombre: element.categoriaNombre[2]
                };
                arrFiltros.push(products);
            }
        } else {
            for (let i = 0; i < arrCategoriasUnique.length; i++) {
                const element = arrCategoriasUnique[i];
                if (element.categoriaNombre[3] != "") {
                    let products = {
                        categoriaId: element.categoriaId,
                        categoriaNombre: element.categoriaNombre[3]
                    };
                    arrFiltros.push(products);
                }
            }
        }
        console.log(arrFiltros);
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
        let catIdUrl = catId;
        let especificacion = document.querySelector('input[name="especificacion"]:checked').value;
        console.log(catIdRadio);
        console.log(catIdUrl);
        console.log(especificacion);
        ajaxCallEspecification(especificacion, catIdRadio, catIdUrl);
    });

    $("input[name='especificacion']").on("change", function () {
        let especificacion = this.value;
        let catIdUrl = catId;
        let catIdRadio = document.querySelector('input[name="categoria"]:checked').value;
        console.log(catIdRadio);
        console.log(catIdUrl);
        console.log(especificacion);
        ajaxCallEspecification(especificacion, catIdRadio, catIdUrl);
    });
}

function getUnique(arr, comp) {
    const unique = arr
        .map(e => e[comp])
        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)
        // eliminate the dead keys & store unique objects
        .filter(e => arr[e]).map(e => arr[e]);
    return unique;
}

function lamProductByFilter(data, priceI, priceF) {
    console.log(data);
    console.log(data.length);
    console.log(priceI);
    console.log(priceF);
    let container = document.getElementById('productos-categoria');
    let cantProd = document.getElementById('cantProd');
    let count = 0;
    let countWithPrice = 0;
    let html = "<div>";
    if (data.length > 0) {
        if (priceI && priceF) {
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                if ((element.items[0].sellers[0].commertialOffer.Price <= precioF) && (element.items[0].sellers[0].commertialOffer.Price >= precioI)) {
                    count++;
                    countWithPrice++;
                    html +=
                    `<div class="laminas">
                    <a href="${element.link}" style="cursor:pointer"><img class="productImg" src="${element.items[0].images[0].imageUrl}"/></a>
                    <a href="${element.link}" style="cursor:pointer"><p class="nameLamina">${element.productName}</p></a>
                    <a href="${element.link}" style="cursor:pointer"><p class="actualPrice">$ ${element.items[0].sellers[0].commertialOffer.Price} MXN </p></a>
                    <a href="${element.items[0].sellers[0].addToCartLink}" class="productButton" style="cursor:pointer">AÑADIR A LA BOLSA</a>
                    </div>`;
                }
            }
            console.log(countWithPrice);
            if (countWithPrice == 0) {
                html +=
                `<h1>No existen productos para mostrar con los filtros seleccionados</h1>`;
                html += "</div>";
                container.innerHTML = html;
                cantProd.innerHTML = '0';
            }
        } else {
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
        }

        html += "</div>";
        container.innerHTML = html;
        cantProd.innerHTML = count;
        paginadoProductos(3);
    } else {
        html +=
            `<h1>No existen productos para mostrar con los filtros seleccionados</h1>`;
        html += "</div>";
        container.innerHTML = html;
        cantProd.innerHTML = '0';
    }
}

function ajaxCallEspecification(especificacion, catIdRadio, catIdUrl, priceI, priceF) {
    let espAjax;
    console.log(priceI);
    console.log(priceF);
    if (especificacion == 0) {
        if (catIdUrl == 23 && catIdRadio == catIdUrl) {
            $.ajax({
                    url: "https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/"
                })
                .done(function (responseData) {
                    data = responseData;
                    console.log(data);
                    lamProductByFilter(data, priceI, priceF);
                });
        } else if (catIdRadio == 25 && (catIdUrl == 23 || catIdUrl == 25)) {
            $.ajax({
                    url: "https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/25/"
                })
                .done(function (responseData) {
                    data = responseData;
                    console.log(data);
                    lamProductByFilter(data, priceI, priceF);
                });
        } else if (catIdUrl != 23 && catIdRadio != 25 && catIdRadio != catIdUrl) {
            $.ajax({
                    url: ("https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/" + catIdUrl + "/" + catIdRadio)
                })
                .done(function (responseData) {
                    data = responseData;
                    console.log(data);
                    lamProductByFilter(data, priceI, priceF);
                });
        } else if (catIdUrl != 23 && catIdRadio != 25 && catIdRadio == catIdUrl) {
            $.ajax({
                    url: ("https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/" + catIdUrl)
                })
                .done(function (responseData) {
                    data = responseData;
                    console.log(data);
                    lamProductByFilter(data, priceI, priceF);
                });
        } else if (catIdUrl == 23 && catIdRadio != catIdUrl) {
            $.ajax({
                    url: ("https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/" + catIdRadio)
                })
                .done(function (responseData) {
                    data = responseData;
                    console.log(data);
                    lamProductByFilter(data, priceI, priceF);
                });
        }
    } else {
        if (especificacion == 1) {
            espAjax = 78;
        } else if (especificacion == 2) {
            espAjax = 79;
        }

        if (catIdUrl == 23 && catIdRadio == catIdUrl) {
            $.ajax({
                    url: ("https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/&fq=specificationFilter_" + espAjax + ":1")
                })
                .done(function (responseData) {
                    data = responseData;
                    console.log(data);
                    lamProductByFilter(data, priceI, priceF);
                });
        } else if (catIdRadio == 25 && (catIdUrl == 23 || catIdUrl == 25)) {
            $.ajax({
                    url: ("https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/25/&fq=specificationFilter_" + espAjax + ":1")
                })
                .done(function (responseData) {
                    data = responseData;
                    console.log(data);
                    lamProductByFilter(data, priceI, priceF);
                });
        } else if (catIdUrl != 23 && catIdRadio != 25 && catIdRadio != catIdUrl) {
            $.ajax({
                    url: ("https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/" + catIdUrl + "/" + catIdRadio + "/&fq=specificationFilter_" + espAjax + ":1")
                })
                .done(function (responseData) {
                    data = responseData;
                    console.log(data);
                    lamProductByFilter(data, priceI, priceF);
                });
        } else if (catIdUrl != 23 && catIdRadio != 25 && catIdRadio == catIdUrl) {
            $.ajax({
                    url: ("https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/" + catIdUrl + "/&fq=specificationFilter_" + espAjax + ":1")
                })
                .done(function (responseData) {
                    data = responseData;
                    console.log(data);
                    lamProductByFilter(data, priceI, priceF);
                });
        } else if (catIdUrl == 23 && catIdRadio != catIdUrl) {
            $.ajax({
                    url: ("https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/" + catIdRadio + "&fq=specificationFilter_" + espAjax + ":1")
                })
                .done(function (responseData) {
                    data = responseData;
                    console.log(data);
                    lamProductByFilter(data, priceI, priceF);
                });
        }

    }
}