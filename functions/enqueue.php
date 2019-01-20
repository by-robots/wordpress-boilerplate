<?php

/**
 * Include JavaScript files.
 */
function enqueue_js() {
	// Include files only when in dev mode.
	if ( WP_DEBUG ) {
		wp_enqueue_script( 'site', 'http://localhost:8080/site.js', [], '1.0.0', true );
	}

	// Include files only when in live mode.
	if ( ! WP_DEBUG ) {
		wp_enqueue_script( 'site', get_manifest_file( 'site.js' ), [], '1.0.0', true );
	}

	// Always include these files.
	// ...
}

/**
 * Enqueue CSS files.
 */
function enqueue_css() {
	// Include files only when in dev mode. Our CSS will be served via
	// JavaScript so it's not necessary to enqueue that here.
	if ( WP_DEBUG ) {
		//
	}

	// Include files only when in live mode.
	if ( ! WP_DEBUG ) {
		wp_enqueue_style( 'styles', get_manifest_file( 'styles.css' ), [], '1.0.0' );
	}

	// Always include these files.
	// ...
}

/**
 * Add the enqueue functions to their respective actions.
 */
add_action( 'wp_enqueue_scripts', 'enqueue_js' );
add_action( 'wp_enqueue_scripts', 'enqueue_css' );
