<?php
/**
 * Plugin Name:       Guten weather
 * Description:       This is a guten weather block to display weather and forecast
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Stefano Frasson Pianizzola
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       guten-weather
 *
 * @package           guten-weather
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function guten_weather_guten_weather_block_init() {
	register_block_type( __DIR__ );
}
add_action( 'init', 'guten_weather_guten_weather_block_init' );

/**
 * Register Options page for plugins
*/

function guten_weather_menu() {
	add_options_page( 'Guten Weather Options', 'Guten Weather', 'administrator', 'guten_weather_options', 'guten_weather_options_page' );
}

function guten_weather_options_settings() {
	//register our settings
	register_setting( 'guten-weather-settings-group', 'weather_api_key' );
}

add_action( 'admin_init', 'guten_weather_options_settings' );

function guten_weather_options_page(){ ?>
<div class="wrap">
    <h1><?php _e('Guten Weather','guten-weather'); ?></h1>

    <form method="post" action="options.php">
        <?php settings_fields( 'guten-weather-settings-group' ); ?>
        <?php do_settings_sections( 'guten-weather-settings-group' ); ?>
        <table class="form-table">
            <tr valign="top">
            <th scope="row"><?php _e('Weather API Key','guten-weather'); ?></th>
            <td><input type="text" name="weather_api_key" value="<?php echo esc_attr( get_option('weather_api_key') ); ?>" size="50" /></td>
            </tr>
        </table>
        <?php submit_button(); ?>
    </form>
</div>
<?php }

add_action( 'admin_menu', 'guten_weather_menu' );

function guten_weather_print_scripts() { ?>
	<script type="text/javascript">
		var weather_api_key = <?php echo json_encode(esc_attr( get_option('weather_api_key') )); ?>;
	</script>
	<?php
}
add_action('wp_print_scripts', 'guten_weather_print_scripts');
