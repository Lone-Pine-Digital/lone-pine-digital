<?php

/**
 * ---------------------------------------------------------
 * FRONTEND ASSETS
 * ---------------------------------------------------------
 */
add_action('wp_enqueue_scripts', function() {

    // Main stylesheet
    wp_enqueue_style(
        'lone-pine-digital-global',
        get_stylesheet_directory_uri() . '/style.css',
        [],
        filemtime( get_stylesheet_directory() . '/style.css' )
        //time() //for development only, to prevent caching
    );

    // Main JS
    wp_enqueue_script('jquery');

    wp_enqueue_script(
        'lone-pine-digital-js',
        get_stylesheet_directory_uri() . '/assets/js/main.js',
        ['jquery'], // <-- ensures jQuery loads first
        filemtime( get_stylesheet_directory() . '/assets/js/main.js' ),
        //time(), //for development only, to prevent caching
        true
    );

    // Swiper
    wp_enqueue_style('swiper', 'https://unpkg.com/swiper/swiper-bundle.min.css');
    wp_enqueue_script('swiper', 'https://unpkg.com/swiper/swiper-bundle.min.js', [], null, true);

    // Disable default block styles
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('classic-theme-styles');
});


/**
 * --------------------------------------------------------
 * 
 * HELPER: Get WPForms Lite forms
 * ---------------------------------------------------------
 */
function cjs_get_wpforms_list() {

    $forms = get_posts([
        'post_type'      => 'wpforms',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
    ]);

    $form_list = [];

    foreach ($forms as $form) {
        $form_list[] = [
            'id'    => $form->ID,
            'title' => $form->post_title,
        ];
    }

    return $form_list;
}


/**
 * ---------------------------------------------------------
 * REGISTER BLOCKS
 * ---------------------------------------------------------
 */
function cjs_register_blocks() {

    
    register_block_type(__DIR__ . '/build/banner-image');
    register_block_type(__DIR__ . '/build/contact-form');
    register_block_type(__DIR__ . '/build/cta-banner');
    register_block_type(__DIR__ . '/build/faqs');
    register_block_type(__DIR__ . '/build/hero-simple');
    register_block_type(__DIR__ . '/build/hero-home');
    //register_block_type(__DIR__ . '/build/gallery');
    register_block_type(__DIR__ . '/build/icons');
    register_block_type(__DIR__ . '/build/logos');
    //register_block_type(__DIR__ . '/build/map');
    register_block_type(__DIR__ . '/build/numbered-list');
    register_block_type(__DIR__ . '/build/plain-text');
    register_block_type(__DIR__ . '/build/text-with-image');
    register_block_type(__DIR__ . '/build/testimonials');
    

}
add_action('init', 'cjs_register_blocks', 20);

/**
 * ---------------------------------------------------------
 * LOCALIZE WPForms DATA FOR THE EDITOR
 * ---------------------------------------------------------
 */
add_action('enqueue_block_editor_assets', function() {
    wp_localize_script(
        'wp-block-editor',
        'CJSFormsData',
        [
            'forms' => cjs_get_wpforms_list()
        ]
    );
});

