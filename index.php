<?php get_header(); ?>

<main>
	<header>
		<h1><?php the_title(); ?>
	</header>

	<?php if ( have_posts() ) {
		while ( have_posts() ) {
			the_post();
			// TODO: Individual posts for the blogroll go here.
		} ?>

		<footer>
			<?php the_posts_pagination(); ?>
		</footer>
	<?php } else {
		// TODO: What to do when there are no posts?
	} ?>
</main>

<?php get_footer(); ?>
