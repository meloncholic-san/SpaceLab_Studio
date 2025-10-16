import Swiper from "swiper";
import {Navigation} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import { swiperProgressbarChangeSlide, swiperProgressbarInit } from "../components/swiper-pagination.js";

export function initSwiperAbout() {
  return new Swiper(".about-about__swiper", {
      modules : [Navigation],
      loop : true,
      grabCursor: true,
      speed: 800,
      spaceBetween: 12,
        slidesPerView: 'auto',

      navigation: {
          nextEl: '.swiper-navigation__about .swiper-navigation__arrow_right',
          prevEl: '.swiper-navigation__about .swiper-navigation__arrow_left', 
      },

      on: {
          init(swiper){
              swiperProgressbarInit(swiper, {
                  currentSlide:  document.querySelector('.swiper-navigation__about .swiper-navigation__slide-current'),
                  totalSlides: document.querySelector('.swiper-navigation__about .swiper-navigation__slide-total'),
                  progressBar: document.querySelector('.swiper-navigation__about .swiper-navigation__fill-progressbar')
              })
          },
          slideChange(swiper){
              swiperProgressbarChangeSlide(swiper, {
                  currentSlide:  document.querySelector('.swiper-navigation__about .swiper-navigation__slide-current'),
                  progressBar: document.querySelector('.swiper-navigation__about .swiper-navigation__fill-progressbar')
              })
          }
      }
  });
}
