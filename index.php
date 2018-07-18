<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <meta property="og:url" content="https://wnin.info/"/>
    <meta property="og:type" content="article"/>
    <meta property="og:title" content="<?php echo get_bloginfo('name'); ?>"/>
    <meta property="og:image" content="<?php echo get_template_directory_uri() ?>/xt/build/wnin.jpg"/>
    <meta property="og:description" content="<?php echo get_bloginfo('description'); ?>"/>
    <meta property="twitter:card" content="summary_large_image"/>
    <meta property="twitter:title" content="<?php echo get_bloginfo('name'); ?>"/>
    <meta property="twitter:image" content="<?php echo get_template_directory_uri() ?>/xt/build/wnin.jpg"/>
    <meta property="twitter:description" content="<?php echo get_bloginfo('description'); ?>"/>
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri() ?>/xt/build/favicon.ico">
    <title><?php echo get_bloginfo('name'); ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class('cmto-cms'); ?>>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script src="//cdn.polyfill.io/v2/polyfill.min.js"></script>
    <?php wp_footer(); ?>
</body>
</html>