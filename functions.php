<?php
// Auto install the plugins using TGM plugin activation
include_once dirname(__FILE__) . '/xt/build/manifest.php';

// Return 200 ok for 404 status
add_action( 'wp_head', 'status_check_404');
function status_check_404(){
    if( is_404() ) {
        status_header(200);
    }
}

// Add theme support for logo
add_action('after_setup_theme', 'register_theme_logo');

function register_theme_logo()
{
    $defaults = array(
        'height' => 400,
        'width' => 400,
        'flex-height' => true,
        'flex-width' => true,
        'header-text' => array(
            'site-title',
            'site-description'
        )
    );
    add_theme_support('custom-logo', $defaults);
}

// Register style sheet.
add_action('wp_head', 'add_theme_styles');
add_action('wp_enqueue_scripts', 'register_theme_scripts');
add_action('wp_enqueue_scripts', 'lazy_load_fonts');

function add_theme_styles()
{
    $mainCSS = file_get_contents(get_template_directory() . '/xt/build/' . $GLOBALS["REACT_ASSETS"]['mainCss']);
    echo "<style>". $mainCSS ."</style>";
}

function lazy_load_fonts(){
    $themeFont = "(function(d){
        var x = d.createElement(\"link\");
        var y = d.getElementsByTagName(\"script\")[0];
        x.rel = \"stylesheet\";
        x.href = \"". get_template_directory_uri() . '/xt/build/fonts/stylesheet.css' ."\";
        y.parentNode.insertBefore(x, y);
    })(document);";

    $iconsFont = "(function(d){
        var x = d.createElement(\"link\");
        var y = d.getElementsByTagName(\"script\")[0];
        x.rel = \"stylesheet\";
        x.href = \"https://fonts.googleapis.com/icon?family=Material+Icons\";
        y.parentNode.insertBefore(x, y);
    })(document);";

    
    wp_add_inline_script('cmto_wnin_js', $themeFont);
    wp_add_inline_script('cmto_wnin_js', $iconsFont);
}

function register_theme_scripts()
{
    $url  = trailingslashit(home_url());
    wp_register_script('cmto_wnin_js', get_template_directory_uri() . '/xt/build/' . $GLOBALS["REACT_ASSETS"]['mainJs'], array(), null, true);
    wp_enqueue_script('cmto_wnin_js');
    wp_add_inline_script('cmto_wnin_js', sprintf('window.CMTOu = window.CMTOu || {};  window.CMTOu.wnin = %s;', wp_json_encode(array(
        'title' => get_bloginfo('name', 'display'),
        'urls' => array(
            'api' => esc_url_raw(get_rest_url(null, '/cmto/v1')),
            'root' => esc_url_raw($url)
        ),
    ))), 'before');
}

function get_theme_custom_logo()
{
    $custom_logo_id = get_theme_mod('custom_logo');
    $image          = wp_get_attachment_image_src($custom_logo_id, 'full');
    return $image[0];
}

function manifest_rewrite() {
    add_rewrite_rule('(manifest\.json)', 'wp-content/themes/cmto/xt/build/manifest.json', 'top');
}
add_action('init', 'manifest_rewrite', 10, 0);

// Auto install the plugins using TGM plugin activation
require_once dirname(__FILE__) . '/includes/activate-plugins.php';

// API Registration
require_once dirname(__FILE__) . '/includes/api.php';
?>