import Swiper from "swiper";
import {Navigation} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import { swiperProgressbarChangeSlide, swiperProgressbarInit } from "../components/swiper-pagination.js";
import { initGallery } from "../components/gallery.js";

function heroSwiper() {
    const swiperHeroMain = new Swiper(".hero__swiper", {
    modules: [Navigation],
    loop: true,
    grabCursor: true,
    speed: 800,
    spaceBetween: 0,
    breakpoints:{
      0:{
          slidesPerView: 1.193,
      },

      768:{
           slidesPerView: 1.148,
      },

      1024:{
          slidesPerView: 1.185,
      },

      1440:{
          slidesPerView: 1.1616,
      },
    },


    navigation: {
        nextEl: '.swiper-navigation__hero .swiper-navigation__arrow_right',
        prevEl: '.swiper-navigation__hero .swiper-navigation__arrow_left',
    },
    on: {
      init(swiper){
          swiperProgressbarInit(swiper, {
              currentSlide:  document.querySelector('.swiper-navigation__hero .swiper-navigation__slide-current'),
              totalSlides: document.querySelector('.swiper-navigation__hero .swiper-navigation__slide-total'),
              progressBar: document.querySelector('.swiper-navigation__hero .swiper-navigation__fill-progressbar')
          })
      },

      slideChange(swiper){
         swiperProgressbarChangeSlide(swiper, {
             currentSlide:  document.querySelector('.swiper-navigation__hero .swiper-navigation__slide-current'),
             progressBar: document.querySelector('.swiper-navigation__hero .swiper-navigation__fill-progressbar')
         })
      }
    }
    })


    return () => swiperHeroMain.destroy(true, true);
}


export function initMain() {

    const images = [
    'img/gallery/gallery-photo1.png',
    'img/gallery/gallery-photo2.png',
    'img/gallery/gallery-photo3.png',
    'img/gallery/gallery-photo4.png',
    'img/gallery/gallery-photo5.png',
    ];



    heroSwiper();
    initGallery('.gallery__main', images);

}