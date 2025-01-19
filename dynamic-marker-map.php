<?php
/**
 * Plugin Name:       Dynamic Marker Map
 * Description:       Create an Image Map with configurable Markers.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dynamic-marker-map
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_dynamic_marker_map_block_init() {
	register_block_type( __DIR__ . '/build/dynamic-marker-map' );
}
add_action( 'init', 'create_block_dynamic_marker_map_block_init' );
