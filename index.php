<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="<?php echo get_template_directory_uri() ?>/xt/build/manifest.json">
    <link rel="shortcut icon" href="/favicon.ico">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <title><?php echo get_bloginfo('name'); ?></title>
    <script src="//cdn.polyfill.io/v2/polyfill.min.js"></script>
    <?php wp_head(); ?>
</head>
<body <?php body_class('cmto-cms'); ?>>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <?php wp_footer(); ?>
</body>
</html>