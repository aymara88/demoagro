window.onload = function () {
    carouselProductDetail();
}

function carouselProductDetail() {
    $('.thumbs').slick({
        dots: false,
        infinite: false,
        autoplay:true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
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
    /* document.getElementsByClassName("slick-dots")[0].innerHTML = ""; */
}