<?php 

// Add theme support for logo
add_action( 'after_setup_theme', 'register_theme_logo' );

function register_theme_logo() {
    $defaults = array(
        'height'      => 400,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
        'header-text' => array( 'site-title', 'site-description' ),
    );
    add_theme_support( 'custom-logo', $defaults );
}

// Register style sheet.
add_action( 'wp_enqueue_scripts', 'register_theme_styles' );

function register_theme_styles() {
    
    wp_register_style( 'bootstrap', get_template_directory_uri() . '/assets/css/bootstrap.min.css');
    wp_enqueue_style( 'bootstrap' );
    
    wp_register_style( 'theme', get_stylesheet_uri());
    wp_enqueue_style( 'theme' );
}

function get_theme_custom_logo() {
    $custom_logo_id = get_theme_mod( 'custom_logo' );
    $image = wp_get_attachment_image_src( $custom_logo_id , 'full' );
    return $image[0];
}

// Auto install the plugins using TGM plugin activation
require_once dirname( __FILE__ ) . '/includes/activate-plugins.php';

// API Registration
require_once dirname( __FILE__ ) . '/includes/api.php';
?>