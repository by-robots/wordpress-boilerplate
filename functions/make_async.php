<?php

/**
 * Interrupt <script ...> tag outputs and add the async attribute.
 *
 * See: https://matthewhorne.me/defer-async-wordpress-scripts/
 */
 function add_async_attribute( $tag, $handle ) {
	 // If it's not our JS don't interfere.
	 if ( 'site' !== $handle ) {
		 return $tag;
	 }

	 return str_replace( ' src', ' async="async" src', $tag );
 }

add_filter( 'script_loader_tag', 'add_async_attribute', 10, 2 );
