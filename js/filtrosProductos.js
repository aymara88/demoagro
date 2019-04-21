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

    let arrCategoriasUnique = getUnique(arrCategorias, 'categoriaId');
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
        for (var i = 0; i < arrCategoriasUnique.length; i++) {
            const element = arrCategoriasUnique[i];
            if (element.categoriaNombre.length > 4 && element.categoriaNombre[3] != "" && catId == 25) {
                html +=
                    ` <label class="container">${element.categoriaNombre[3]}
                    <input type="radio" name="categoria" value="${element.categoriaId}"/>
                    <span class="checkmark"></span>
                  </label>
                `;
            } else if (element.categoriaNombre.length <= 4 && catId != 25) {
                if (element.categoriaNombre[2] == "Alimentos Libres de Azúcar") {
                    html +=
                        ` <label class="container">${element.categoriaNombre[2]}
                        <input type="radio" name="categoria" value="25"/>
                        <span class="checkmark"></span>
                      </label>
                    `;
                } else {
                    html +=
                        ` <label class="container">${element.categoriaNombre[2]}
                        <input type="radio" name="categoria" value="${element.categoriaId}"/>
                        <span class="checkmark"></span>
                      </label>
                    `;
                }
            }
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

function lamProductByFilter(data) {
    console.log(data);
    console.log(data.length);
    let container = document.getElementById('productos-categoria');
    let cantProd = document.getElementById('cantProd');
    let count = 0;
    let html = "<div>";
    if (data.length > 0) {
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
        paginadoProductos(2);
    } else {
        html +=
            `<h1>No existen productos para mostrar con los filtros seleccionados</h1>`;
        html += "</div>";
        container.innerHTML = html;
        cantProd.innerHTML = '0';
    }
}

function ajaxCallEspecification(especificacion, catIdRadio, catIdUrl) {
    let espAjax;
    if (especificacion == 0) {
        if (catIdUrl == 23 && catIdRadio == catIdUrl) {
            $.ajax({
                    url: "https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/"
                })
                .done(function (responseData) {
                    data = responseData;
                    console.log(data);
                    lamProductByFilter(data);
                });
        } else if (catIdRadio == 25 && (catIdUrl == 23 || catIdUrl == 25)) {
            $.ajax({
                    url: "https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/25/"
                })
                .done(function (responseData) {
                    data = responseData;
                    console.log(data);
                    lamProductByFilter(data);
                });
        } else if (catIdUrl != 23 && catIdRadio != 25 && catIdRadio != catIdUrl) {
            $.ajax({
                    url: ("https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/" + catIdUrl + "/" + catIdRadio)
                })
                .done(function (responseData) {
                    data = responseData;
                    console.log(data);
                    lamProductByFilter(data);
                });
        } else if (catIdUrl != 23 && catIdRadio != 25 && catIdRadio == catIdUrl) {
            $.ajax({
                    url: ("https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/" + catIdUrl)
                })
                .done(function (responseData) {
                    data = responseData;
                    console.log(data);
                    lamProductByFilter(data);
                });
        } else if (catIdUrl == 23 && catIdRadio != catIdUrl) {
            $.ajax({
                    url: ("https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/" + catIdRadio)
                })
                .done(function (responseData) {
                    data = responseData;
                    console.log(data);
                    lamProductByFilter(data);
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
                    lamProductByFilter(data);
                });
        } else if (catIdRadio == 25 && (catIdUrl == 23 || catIdUrl == 25)) {
            $.ajax({
                    url: ("https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/25/&fq=specificationFilter_" + espAjax + ":1")
                })
                .done(function (responseData) {
                    data = responseData;
                    console.log(data);
                    lamProductByFilter(data);
                });
        } else if (catIdUrl != 23 && catIdRadio != 25 && catIdRadio != catIdUrl) {
            $.ajax({
                    url: ("https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/" + catIdUrl + "/" + catIdRadio + "/&fq=specificationFilter_" + espAjax + ":1")
                })
                .done(function (responseData) {
                    data = responseData;
                    console.log(data);
                    lamProductByFilter(data);
                });
        } else if (catIdUrl != 23 && catIdRadio != 25 && catIdRadio == catIdUrl) {
            $.ajax({
                    url: ("https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/" + catIdUrl + "/&fq=specificationFilter_" + espAjax + ":1")
                })
                .done(function (responseData) {
                    data = responseData;
                    console.log(data);
                    lamProductByFilter(data);
                });
        } else if (catIdUrl == 23 && catIdRadio != catIdUrl) {
            $.ajax({
                    url: ("https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/" + catIdRadio + "&fq=specificationFilter_" + espAjax + ":1")
                })
                .done(function (responseData) {
                    data = responseData;
                    console.log(data);
                    lamProductByFilter(data);
                });
        }

    }
    console.log(espAjax);
}