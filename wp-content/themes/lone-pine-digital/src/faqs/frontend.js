jQuery(function ($) {

    $('.faq-answer').hide();

    $('.faq-question').on('click', function () {

        const $clicked = $(this).parent();

        // If this item is already open, close it
        if ($clicked.hasClass('open')) {
            $clicked.removeClass('open');
            $clicked.find('.faq-answer').slideUp();
            $clicked.find('.icon').removeClass('open');
            return;
        }

        // Close all other items
        $('.faq.open')
            .removeClass('open')
            .find('.faq-answer')
            .slideUp();

        // Open the clicked item
        $clicked.addClass('open');
        $clicked.find('.faq-answer').slideDown();
        $clicked.find('.icon').addClass('open');
    });

});