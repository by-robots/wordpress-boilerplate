<?php get_header();

if ( have_posts() ) {
	while ( have_posts() ) {
		the_post();
		// TODO: Single page mark-up.
	}
}

get_footer(); ?>
