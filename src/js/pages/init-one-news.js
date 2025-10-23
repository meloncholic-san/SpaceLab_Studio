import Swiper from "swiper";
import 'swiper/css';

export function initOneNews() {
    return new  Swiper('.one-news-latest__swiper', {
    loop: true,
    grabCursor: true,
    speed: 800,

    breakpoints:{
        0:{
            slidesPerView: 1.192,
            spaceBetween: 26
        },

        376:{
            slidesPerView: 1.715,
            spaceBetween: 20
        },

        576:{
            slidesPerView: 1.72,
            spaceBetween: 20
        },

        769:{
            slidesPerView: 2.718,
            spaceBetween: 40
        },

        1025:{
            slidesPerView: 3.49,
            spaceBetween: 48
        },
        // 1441:{
        //     slidesPerView: 4.8,
        //     spaceBetween: 48
        // }
    },
})
}
