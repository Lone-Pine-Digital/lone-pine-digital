document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.swiper-image-carousel');

    carousels.forEach((carousel) => {
        new Swiper(carousel, {
            slidesPerView: 1.5,
            spaceBetween: 20,
            pagination: {
                el: carousel.querySelector('.swiper-pagination'),
                clickable: true
            },
            navigation: {
                nextEl: carousel.parentElement.querySelector('.swiper-button-next'),
                prevEl: carousel.parentElement.querySelector('.swiper-button-prev')
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3
                }
            },
            on: {
              slideChange() {
                if (carousel.swiper.activeIndex === carousel.swiper.slides.length - 1) {
                    carousel.swiper.wrapperEl.style.marginLeft = '0';
                    carousel.swiper.wrapperEl.style.marginRight= '70px';
                } else {
                    if(screen.width <= 768) {
                        carousel.swiper.wrapperEl.style.marginLeft = '70px';
                        carousel.swiper.wrapperEl.style.marginRight= '0';
                    }
                }
              }
            }
        });
    });

});