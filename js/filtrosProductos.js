function filtrosDeProductos(catId) {
    var data;

    if (catId == 23) {
        $.ajax({
                url: "https://demoagro.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&O=OrderByNameASC&fq=C:/23/"
            })
            .done(function (responseData) {
                data = responseData;
                filtrosSubCategorias(data);
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
                 <input type="radio" name="categoria" checked='checked' value="${arrCategoriasUnique[0].categoryId}"/>
                 <span class="checkmark"></span>
              </label>
            `;

    } else if (arrCategoriasUnique.length > 1) {
        html += "<label class='container'>SIN FILTROS<input type='radio' checked='checked' name='categoria' /><span class='checkmark'></span></label>";
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
    console.log(container);
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