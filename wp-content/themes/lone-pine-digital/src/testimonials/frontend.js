import Swiper from 'swiper/bundle';

document.addEventListener("DOMContentLoaded", () => {
    const sliders = document.querySelectorAll(".swiper-testimonials");

    sliders.forEach((slider) => {
        new Swiper(slider, {
            a11y: true,
            slidesPerView: 1,
            spaceBetween: 48,
            centerInsufficientSlides: true,
            /*pagination: {
                el: slider.querySelector(".swiper-pagination"),
                clickable: true,
                renderBullet(index, className) {
                    const svg = `
                        <svg width="20" height="20">
                            <g transform="matrix(1,0,0,1,-2437.06242,-1176.853406)">
                                <g transform="matrix(0.895516,0,0,0.869752,3470.691803,1268.007846)">
                                    <g transform="matrix(0.786869,0,0,0.810177,-1225.560721,-2388.3682)">
                                        <path d="M134.412,2841.458C99.623,2869.03 72.893,2902.006 105.211,2978.998C120.028,3014.295 171.472,3032.257 184.171,3031.44C209.876,3029.788 281.082,3041.108 306.615,2935.142C310.411,2919.388 299.528,2847.463 239.191,2828.291C204.605,2817.3 175.123,2809.191 134.412,2841.458Z" style="fill:rgb(23,48,30);"/>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    `;
                    return `<span class="${className}">${svg}</span>`;
                }
            },*/
            navigation: {
                prevEl: slider.querySelector(".swiper-button-prev"),
                nextEl: slider.querySelector(".swiper-button-next")
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 4 }
            }
        });
    });
});
