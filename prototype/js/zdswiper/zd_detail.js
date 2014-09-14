/*test.phtml swiper*/
$(function(){
  var gallery = $('.swiper-container-galley').swiper({
    // slidesPerView:'auto',
    watchActiveIndex: true,
    centeredSlides: true,
    pagination:'.pagination',
    paginationClickable: true,
    resizeReInit: false,
    keyboardControl: true,

  })

})
$(function(){
    var gallery = $('.activity-container').swiper({
      slidesPerView:'auto',
      watchActiveIndex: true,
      // centeredSlides: true,
      paginationClickable: true,
      resizeReInit: false,
      keyboardControl: true,
      // slidesPerView: 3,
    })
  })
