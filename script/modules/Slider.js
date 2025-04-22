const homeSliderBanner = new Swiper("#home-slider-banner", {
  loop: true,
  autoplay: {
    delay: 3000,
    pauseOnMouseEnter: true,
  },
  slidesPerView: 1,
  centeredSlides: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
const homeSliderBannerBrands = new Swiper("#home-slider-banner-brands", {
  loop: true,
  autoplay: {
    delay: 2500,
    pauseOnMouseEnter: true,
  },
  centeredSlides: true,
  breakpoints: {
    0: {slidesPerView: 1, spaceBetween: 20},
    576: {slidesPerView: 2, spaceBetween: 20},
    768: {slidesPerView: 1},
  },
});
const homeSliderSale = new Swiper("#home-slider-sale", {
  slidesPerView: 4,
  spaceBetween: 3,
  breakpoints: {
    0: {
      slidesPerView: 3,
    },
    576: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 6,
    },
    1200: {
      slidesPerView: 7,
    },
  },
});
const blogCate = new Swiper("#blog-cate", {
  loop: true,
  autoplay: {
    delay: 2000,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    prevEl: ".btn-swiper-next",
    nextEl: ".btn-swiper-prev",
  },
  spaceBetween: 10,
  centeredSlides: true,
  breakpoints: {
    0: {
      slidesPerView: 3,
    },
    350: {
      slidesPerView: 5,
    },
    576: {
      slidesPerView: 6,
    },
  },
});
const homeBrands = new Swiper("#home-slider-brands", {
  loop: true,
  slidesPerView: 5,
});
export {homeSliderBanner, homeSliderBannerBrands, homeSliderSale, homeBrands, blogCate};
