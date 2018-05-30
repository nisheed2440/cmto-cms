<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CMTO | CMS</title>
    <?php wp_head(); ?>
</head>
<body <?php body_class('cmto-cms'); ?>>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 text-center">
               <img class="cmto-logo" width="150" src="<?php echo get_theme_custom_logo(); ?>" alt="<?php echo get_bloginfo('name'); ?>">
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h1 class="cmto-title text-center text-white text-uppercase"><?php echo get_bloginfo('name'); ?></h1>
                <p class="cmto-tagline text-center text-white text-uppercase"><?php echo get_bloginfo('description'); ?></p>
            </div>
        </div>
    </div>
    <?php wp_footer(); ?>
</body>
</html>