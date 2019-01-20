<?php

function register_my_menus() {
	register_nav_menus([
		'main-menu' => __( 'Main Menu' ),
	]);
 }

 add_action( 'init', 'register_my_menus' );
