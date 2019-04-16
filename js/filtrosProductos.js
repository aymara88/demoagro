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
                filtrosSubCategorias(data);
            });
    }
}

function filtrosSubCategorias(data) {
    let container = document.getElementById('prueba_radios_categorias');
    console.log(container);
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
    console.log(arrCategoriasUnique);

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