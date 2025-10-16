export function swiperProgressbarInit(swiper, {currentSlide, totalSlides, progressBar}) {
    const realSlidesCount = swiper.el.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length
    totalSlides.textContent = String(realSlidesCount).padStart(2, "0");
    currentSlide.textContent = String(swiper.realIndex + 1).padStart(2, "0");

    const progress = ((swiper.realIndex + 1)/ realSlidesCount) * 100;
    progressBar.style.width = `${progress}%`;
}

export function swiperProgressbarChangeSlide(swiper, {currentSlide, progressBar}) {
    currentSlide.textContent = String(swiper.realIndex + 1).padStart(2, "0");

    const realSlidesCount = swiper.el.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length
    const progress = ((swiper.realIndex + 1)/ realSlidesCount) * 100;
    progressBar.style.width = `${progress}%`;
}