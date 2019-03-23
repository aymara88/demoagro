function carrusel() {
  if ($('.Carrusel ul').length > 0) {
    $('.Carrusel ul').slick({
      arrows: true,
      infinite: true,
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      touchMove: true,
      responsive: [{
          breakpoint: 1023,
          settings: {
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            touchMove: true,
            dots: false,
            arrows: true
          }
        },
        {
          breakpoint: 767,
          settings: {
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            touchMove: true,
            dots: false,
            arrows: true
          }
        }
      ]
    });
  }
}

$(document).ready(function () {
  carrusel();
});