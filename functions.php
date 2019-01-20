<?php

/**
 * Autoloads all PHP files in the functions/ folder.
 */
foreach ( glob( __DIR__ . '/functions/*.php' ) as $filename ) {
	include_once $filename;
}

/**
 * Misc bits and bobs.
 */

// Enable excerpts on pages
add_post_type_support( 'page', 'excerpt' );

// Reply to comments are broken by Yoast. This fixes it.
add_filter( 'wpseo_remove_reply_to_com', function () {
	return false;
} );

// Include feed links automatically, and remove comment RSS feeds.
add_action( 'after_setup_theme', 'feeds' );
add_filter( 'post_comments_feed_link', 'remove_comments_rss' );

function feeds() {
    add_theme_support( 'automatic-feed-links' );
}

function remove_comments_rss() {
	return;
}
