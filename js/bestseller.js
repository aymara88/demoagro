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
            var container = document.getElementById('mas-vendidos-carrusel');
            if (container) {
                console.log('container exist');
            }
            console.log('data funcion lam');
            console.log(data);
            var html;
            for (let i = 0; i < data.length; i++) {
                const element = data[i];

                var imgDomElmt = '<img class="productImg" src="' + element.items[0].images[0].imageUrl + '"/>';
                var lamName = '<p class="nameLamina">' + element.productName + '</p>';
                var lamActPrice = '<p class="actualPrice">$' + element.items[0].sellers[0].commertialOffer.Price + ' MXN </p>';
                var lamButtom = '<a href="' + element.link + '" class="productButton" style="cursor:pointer">AÑADIR A LA BOLSA</a>';

                html += '<div class="laminas">' +
                    imgDomElmt + lamName + lamActPrice + lamButtom;
                html += '</div>';
            }

            container.innerHTML = html;

            console.log(container);
            
            if ((container) && ($('#mas-vendidos-carrusel').length > 0)) {
                console.log($('#mas-vendidos-carrusel').length);
                $('#mas-vendidos-carrusel').slick({
                    dots: true,
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
                                dots: true
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            }
        })();
    }
});