<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1">

    <title><?php is_home() ? single_post_title() : the_title(); ?> - <?php bloginfo( 'name' ); ?></title>

    <?php if ( ! WP_DEBUG and file_exists( __DIR__ . '/dist/webapp.html' ) ) {
		echo file_get_contents( __DIR__ . '/dist/webapp.html' );
	}

	wp_head(); ?>
</head>
<body <?php body_class(); ?>>
