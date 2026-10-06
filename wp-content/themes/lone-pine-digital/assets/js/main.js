
document.addEventListener("DOMContentLoaded", () => {
    // Simple scroll-trigger animation observer
    const animatedElements = document.querySelectorAll("[class*='fade-in']");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("faded-in");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    animatedElements.forEach(el => observer.observe(el));

});

document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname.replace(/\/$/, ""); // remove trailing slash

    document.querySelectorAll(".menu-item a, .dropdown-item a").forEach(link => {
        const linkPath = link.getAttribute("href").replace(/\/$/, "");

        if (linkPath === currentPath) {
            // Add active class to the <li>
            link.closest("li").classList.add("active");

            // If it's inside a dropdown, also mark the parent menu-item
            const parentDropdown = link.closest(".dropdown");
            if (parentDropdown) {
                parentDropdown.classList.add("active");
            }
        }
    });
});



jQuery(function ($) {

    function initDropdownBehavior() {
        const isMobile = window.matchMedia("(max-width: 1023px)").matches;

        // Reset all states
        $('.dropdown-wrapper').hide();
        $('.dropdown, .menu-item-wrapper').removeClass('open');

        // Remove previous handlers
        $('.mobile-menu .dropdown').off('click');
        $('.desktop-menu .menu-item-wrapper').off('mouseenter mouseleave');

        if (isMobile) {
            /* -------------------------
               MOBILE DROPDOWN BEHAVIOUR
            -------------------------- */

            $('.mobile-menu .dropdown').on('click', function (e) {
                e.stopPropagation();

                const $item = $(this);

                if ($item.hasClass('open')) {
                    $item.removeClass('open');
                    $item.find('.dropdown-list').slideUp();
                    return;
                }

                // Close any other open dropdowns
                $('.mobile-menu .dropdown.open')
                    .removeClass('open')
                    .find('.dropdown-list')
                    .slideUp();

                $item.addClass('open');
                $item.find('.dropdown-list').slideDown();
            });

        } else {
            /* -------------------------
               DESKTOP DROPDOWN BEHAVIOUR
            -------------------------- */

            $('.desktop-menu .menu-item-wrapper').on('mouseenter', function () {
                const $wrap = $(this);

                $('.desktop-menu .menu-item-wrapper.open')
                    .not($wrap)
                    .removeClass('open')
                    .find('.dropdown-wrapper')
                    .stop(true, true)
                    .slideUp();

                $wrap.addClass('open');
                $wrap.find('.dropdown-wrapper')
                    .stop(true, true)
                    .slideDown();
            });

            $('.desktop-menu .menu-item-wrapper').on('mouseleave', function () {
                $(this)
                    .removeClass('open')
                    .find('.dropdown-wrapper')
                    .stop(true, true)
                    .slideUp();
            });
        }
    }

    // Run on load
    initDropdownBehavior();

    // Re-run on resize (debounced)
    let resizeTimer;
    $(window).on('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initDropdownBehavior, 200);
    });

    /* -------------------------
       MOBILE MENU TOGGLE
    -------------------------- */

    $('.mobile-menu').hide();

    $('.open').hide();

    $('.hamburger').on('click', function () {
        $('.open').toggle();
        $('.closed').toggle();
        $('.mobile-menu').slideToggle();
    });

    $(document).on('scroll', () => {
        $('.header').toggleClass('scrolled', $(document).scrollTop() > 50);
    });


});

document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth <= 767) {
    const sliders = document.querySelectorAll(".swiper-mobile");

    sliders.forEach((slider) => {

        console.log("Sliders found:", sliders.length);

        new Swiper(slider, {
            a11y: true,
            slidesPerView: 1,
            spaceBetween: 48,
            navigation: {
                prevEl: slider.querySelector(".swiper-button-prev"),
                nextEl: slider.querySelector(".swiper-button-next")
            }
        });

        console.log(`Swiper instance ${i}:`, swiper, slider.swiper);
    });
  }
});