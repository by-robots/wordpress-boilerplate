<?php get_header(); ?>

<main>
	<?php if ( have_posts() ) {
		while ( have_posts() ) {
			the_post();
			// TODO: A single post's mark-up.
		}
	} ?>
</main>

<?php get_footer();
