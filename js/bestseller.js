$(document).ready(function () {
    var data;

    $.ajax({
            url: "https://demoagro.myvtex.com/api/catalog_system/pub/products/search/?fq=productClusterIds:140?fq=specificationFilter_79:1"
        })
        .done(function (responseData) {
            data = responseData;
            renderData();
        });

    function renderData() {

        (function lamProducts() {
            console.log(data);
            var container = document.getElementById('mas-vendidos-carrusel');
            var html;
            for (let i = 0; i < data.length; i++) {
                const element = data[i];

                var imgDomElmt = '<a href="' + element.link + '" style="cursor:pointer"><img class="productImg" src="' + element.items[0].images[0].imageUrl + '"/></a>';
                var lamName = '<a href="' + element.link + '" style="cursor:pointer"><p class="nameLamina">' + element.productName + '</p></a>';
                var lamActPrice = '<a href="' + element.link + '" style="cursor:pointer"><p class="actualPrice">$' + element.items[0].sellers[0].commertialOffer.Price + ' MXN </p></a>';
                var lamButtom = '<a href="' + element.items[0].sellers[0].addToCartLink + '" class="productButton" style="cursor:pointer">AÑADIR A LA BOLSA</a>';

                html += '<div class="laminas">' +
                    imgDomElmt + lamName + lamActPrice + lamButtom;
                html += '</div>';
            }

            container.innerHTML = html;

            if ((container) && ($('#mas-vendidos-carrusel').length > 0)) {
                $('#mas-vendidos-carrusel').slick({
                    dots: false,
                    infinite: false,
                    speed: 300,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    responsive: [{
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                infinite: true,
                                dots: false
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 576,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            }
        })();

        $("#mas-vendidos-carrusel").contents().filter(function () {
            return this.nodeType === 3;
        }).remove();
    }
});