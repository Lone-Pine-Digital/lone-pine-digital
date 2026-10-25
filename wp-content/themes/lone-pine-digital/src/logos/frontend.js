import Swiper from 'swiper/bundle';

document.addEventListener('DOMContentLoaded', () => {

    const swiper = new Swiper('.swiper-logo', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 32,
        speed: 10000,
        freeMode: true,
        freeModeMomentum: false,
        centerInsufficientSlides: true,
        autoplay: {
            delay: 0,
        },
        breakpoints: {
            768: { spaceBetween: 64 }
        }
    });

});