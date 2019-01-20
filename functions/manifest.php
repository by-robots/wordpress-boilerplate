<?php

/**
 * Gets the current version of a file from the manifest.json file.
 *
 * @param String $filename The non-hashed filename (e.g. style.css).
 * @param String $manifestPath Full path to the manifest file. If not set,
 *                             assumes the file is located in
 *                             ../dist/manifest.json.
 *
 * @return String|\WP_Error The path to the current corresonding file
 *                          (e.g. /wp-content/themes/your-theme/style.12345.css).
 *                          In the event of a failure, an instance of \WP_Error
 *                          will be returned with more details.
 */
function get_manifest_file( $filename, $manifestPath = null ) {
	// Set the default path if one isn't provided.
	if ( is_null( $manifestPath ) ) {
		$manifestPath = __DIR__ . '/../dist/manifest.json';
	}

	// Check the file exists before we try to load it.
	if ( ! file_exists( $manifestPath ) ) {
		return new \WP_Error( 'manifest', 'The Manifest file can not be found.', $manifestPath );
	}

	$manifest = json_decode( file_get_contents( $manifestPath ), true );

	// Attempt to match the requested file.
	if ( ! array_key_exists( $filename, $manifest ) ) {
		return new \WP_Error( 'manifest', 'The requested file could not be matched.', $filename );
	}

	return $manifest[$filename];
}
