$('#home-carrusel').slick({
  arrows: true,
  dots: true,
  autoplay: true,
  draggable: true,
  fade: true,
  lazyLoad: 'progressive',
  infinite: true,
  autoplaySpeed: 4000,
  speed: 2000,
}).slick("slickPause");
let initialDelay = 5000;
setTimeout(function () {
  $('#home-carrusel').slick("slickPlay");
}, initialDelay);

$('#alianzas-carrusel').slick({
  arrows: true,
  autoplay: true,
  draggable: true,
  fade: true,
  lazyLoad: 'progressive',
  infinite: true,
  autoplayspeed: 3000,
  prevArrow: '<div class="slick-prev slick-arrow"><i class=" fas fa-chevron-left"></i></div>',
  nextArrow: '<div class="slick-next slick-arrow"><i class=" fas fa-chevron-right"></i></div>',
});

$('#clientes-carrusel').slick({
  dots: true,
  autoplay: true,
  draggable: true,
  fade: true,
  lazyLoad: 'progressive',
  infinite: true,
  autoplayspeed: 3000,
  slidesPerRow: 8,
  rows: 2,
  responsive: [{
    breakpoint: 478,
    settings: {
      slidesPerRow: 4,
      rows: 2,
    }
  }]
});

$('#testimonios-carrusel').slick({
  arrows: true,
  autoplay: false,
  draggable: true,
  fade: false,
  infinite: true,
  autoplayspeed: 3000,
  centerMode: true,
  centerPadding: '300px',
  slidesToShow: 1,
  dots: false,
  prevArrow: '<div class="slick-prev slick-arrow"><i class=" fas fa-chevron-left"></i></div>',
  nextArrow: '<div class="slick-next slick-arrow"><i class=" fas fa-chevron-right"></i></div>',
  responsive: [{
    breakpoint: 1600,
    settings: {
      centerPadding: '200px',
    }
  }]
});

$('#casos-carrusel').slick({
  arrows: true,
  dots: false,
  autoplay: true,
  draggable: true,
  fade: true,
  lazyLoad: 'progressive',
  infinite: true,
  autoplaySpeed: 4000,
  speed: 2000,
  prevArrow: '<div class="slick-prev slick-arrow"><i class=" fas fa-chevron-left"></i></div>',
  nextArrow: '<div class="slick-next slick-arrow"><i class=" fas fa-chevron-right"></i></div>',
})