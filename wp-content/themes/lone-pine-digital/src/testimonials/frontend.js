window.addEventListener('load', () => {
    const swiper = new Swiper('.swiper-testimonials', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 32,
        speed: 12000,
        freeMode: true,
        freeModeMomentum: false,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        breakpoints: {
            768: { spaceBetween: 64 }
        }
    });

});