<?php
/**
 * Plugin Name:       Cloud Weather
 * Description:       This is a gutenberg weather block to display weather and forecast
 * Requires at least: 6.2
 * Requires PHP:      7.0
 * Version:           0.3.2
 * Author:            Stefano Frasson Pianizzola
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       cloud-weather
 *
 * @package           cloud-weather
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function cloud_weather_block_init() {

    register_block_type( __DIR__, array(
        'render_callback' => 'cloud_weather_block_render_callback',
    ));
}
add_action( 'init', 'cloud_weather_block_init' );

function cloud_weather_block_render_callback($attributes){
    $api_key = get_option('weather_api_key');
    $location = $attributes['city'];
    $weatherType = $attributes['weatherType'];

    if(!empty($api_key)){
        $url = 'http://api.weatherapi.com/v1/'. $weatherType .'.json?key='.$api_key.'&q='.$location;

        if($weatherType == 'forecast'){
            $url .= '&days='. $attributes['numberDays'];
        }

        if($attributes['languageData'] !== 'select your language'){
            $url .= '&lang='. $attributes['languageData'];
        }

        $response = wp_remote_get($url);

        if ( is_wp_error( $response ) ) {
            $error_message = $response->get_error_message();
            return "Something went wrong: $error_message";
        } else {
            if(!empty($location) && $location != 'city name'){
                $data = json_decode(wp_remote_retrieve_body($response));

                $weather_code = $data->current->condition->code;
                $weather_icon = addhttp(str_replace('//', '',$data->current->condition->icon));
                $weather_animated_icon = explode('/',$weather_icon);
                $weather_animated_icon = array_slice($weather_animated_icon, -2);
                $weather_icon_url  = $attributes['layoutModel'] === 'animated_icons' ? plugin_dir_url( __FILE__ ) . 'animated-icons/'. $weather_animated_icon[0] . '/'. str_replace('.png','.svg',$weather_animated_icon[1]) : $weather_icon;

                $weather_text = $data->current->condition->text;
                $weather_loc_temp_c = $data->current->temp_c;
                $weather_loc_name = $data->location->name;
                $weather_loc_country = $data->location->country;
                $weather_loc_coordinates = $data->location->lat .','. $data->location->lon;
                $weather_loc_localtime = $data->location->localtime;
                $weather_loc_feelslike = $data->current->feelslike_c;
                $weather_loc_humidity = $data->current->humidity;
                $weather_loc_wind_direction = $data->current->wind_dir;
                $weather_loc_wind_kph = $data->current->wind_kph;
                $weather_loc_pressure = $data->current->pressure_mb;

                $borderRadius = $attributes['borderRadius'] != 0 ?  $attributes['borderRadius'] .'px' : 0;

                $content = '<div class="widget-weather-container"  style="background:' . $attributes['WidgetBgColor'] . '; color: ' . $attributes['WidgetColor'] .'; border-radius:' . $borderRadius .'">';

                    $content .= '<div class="weather-icon icon-' . $weather_code . '">
                                    <div class="weather-temperature">'.$weather_loc_temp_c .'°</div>
                                        <img loading="lazy" src="'. $weather_icon_url .'" alt="'. $weather_text .'" />
                                    </div>
                                    <div class="weather-text-content">
                                        <div class="weather-text">'. $weather_text. '</div>
                                        <div class="weather-loc-name"><span class="weather-label">'. __( 'Location', 'cloud-weather').'</span>'. $weather_loc_name.' - '. $weather_loc_country.'</div>
                                        <div class="weather-loc-coords"><span class="weather-label">'. __( 'Coordinates', 'cloud-weather').'</span>'. $weather_loc_coordinates.'</div>
                                        <div class="weather-loc-feelslike"><span class="weather-label">'. __( 'Feelslike', 'cloud-weather').'</span>'. $weather_loc_feelslike.'°</div>
                                        <div class="weather-loc-humidity"><span class="weather-label">'. __( 'Humidity', 'cloud-weather').'</span>'. $weather_loc_humidity.'%</div>
                                        <div class="weather-loc-wind"><span class="weather-label">'. __( 'Wind', 'cloud-weather').'</span>'. $weather_loc_wind_kph.' km/h - '. $weather_loc_wind_direction.'</div>
                                        <div class="weather-loc-pressure"><span class="weather-label">'. __( 'Pressure', 'cloud-weather').'</span>'. $weather_loc_pressure.' mbar</div>
                                    </div>';

                // Forecast                
                if($attributes['weatherType'] == 'forecast'){
                    $weather_forecast = $data->forecast->forecastday;
                    
                    if(is_array($weather_forecast)){
                        $content .= '<div class="weather-forecast-container">';
                        foreach( $weather_forecast as $key => $forecast){
                            $day_data = $forecast->day;
                            $hour_data = $forecast->hour;
                            $weather_icon = addhttp(str_replace('//', '',$day_data->condition->icon));
                            $weather_animated_icon = explode('/',$weather_icon);
                            $weather_animated_icon = array_slice($weather_animated_icon, -2);
                            $weather_icon_url  = $attributes['layoutModel'] === 'animated_icons' ? plugin_dir_url( __FILE__ ) . 'animated-icons/'. $weather_animated_icon[0] . '/'. str_replace('.png','.svg',$weather_animated_icon[1]) : $weather_icon;
                            $content .= '<div id="weather-forecast-day-'. $key .'" class="weather-forecast-day-container">
                                             <div class="weather-forecast-day-main-title">'. __( 'Date', 'cloud-weather' ) . ' ' . $forecast->date . '</div>
                                                 <div class="weather-day-container">
                                                     <div class="weather-day-condition">
                                                         <div class="weather-icon icon-'. $day_data->condition->code . '">
                                                             <img loading="lazy" src="' . $weather_icon_url  . '" alt="'. $day_data->condition->text . '" />
                                                         </div>
                                                     <div class="weather-day-content">
                                                     <div class="weather-text">'. $day_data->condition->text .'</div>
                                                     <div class="weather-mintemp_c"><span class="weather-label">' . __( 'Min temperature', 'cloud-weather' ) .' </span>' . $day_data->mintemp_c. '°</div>
                                                     <div class="weather-maxtemp_c"><span class="weather-label">'. __( 'Max temperature', 'cloud-weather' ) .'</span>'. $day_data->maxtemp_c . '°</div>
                                                     <div class="weather-mintemp_c"><span class="weather-label">' . __( 'Humidity', 'cloud-weather' ) .'</span>'. $day_data->avghumidity . '%</div>
                                                     <div class="weather-maxtemp_c"><span class="weather-label">'. __( 'Total precipitation', 'cloud-weather' ) .'</span>'. $day_data->totalprecip_mm .'mm</div>
                                                 </div>
                                             </div>
                                         </div>
                                         <div class="weather-hour-wrapper">
                                             <div class="weather-hour-container">
                                                 <div class="weather-carousel-wrapper">'; 
                                                 foreach( $hour_data as $hour_key => $hour_value){
                                                    $hour_condition = $hour_value->condition;
                                                    $hour_date = date('H:i', $hour_value->time_epoch);
                                            
                                                    $weather_icon = addhttp(str_replace('//', '',$hour_condition->icon));
                                                    $weather_animated_icon = explode('/',$weather_icon);
                                                    $weather_animated_icon = array_slice($weather_animated_icon, -2);
                                                    $weather_icon_url  = $attributes['layoutModel'] === 'animated_icons' ? plugin_dir_url( __FILE__ ) . 'animated-icons/'. $weather_animated_icon[0] . '/'. str_replace('.png','.svg',$weather_animated_icon[1]) : $weather_icon;

                                                    $content .= '<div id="weather-forecast-hour-'. $hour_key . '" class="weather-carousel-slide weather-hour-content">
                                                                     <div class="weather-hour-depoint">' . $hour_date . '</div>
                                                                     <div class="weather-hour-condition">
                                                                     <div class="weather-icon icon-'. $hour_condition->code .'">
                                                                         <img loading="lazy" src="'. $weather_icon_url . '" alt="' . $hour_condition->text .'" />
                                                                     </div>
                                                                     </div>
                                                                     <div class="weather-hour-humidity"><span class="weather-label">' . __( 'Humidity', 'cloud-weather' ) . '</span>'. $hour_value->humidity .'%</div>
                                                                     <div class="weather-hour-precip_mm"><span class="weather-label">'. __( 'Rainfall', 'cloud-weather' ) . '</span>' . $hour_value->precip_mm . 'mm</div>
                                                                     <div class="weather-hour-temp_c"><span class="weather-label">'. __( 'Temperature', 'cloud-weather' ) . '</span>'. $hour_value->temp_c . '°</div>
                                                                     <div class="weather-hour-wind-content">
                                                                     <div class="weather-hour-wind-degree"><span class="weather-label">' . __( 'Wind degree', 'cloud-weather' ) . '</span>' . $hour_value->wind_degree .'°</div>
                                                                     <div class="weather-hour-wind-dir"><span class="weather-label">'. __( 'Wind direction', 'cloud-weather' ) .'</span>'. $hour_value->wind_dir .'</div>
                                                                     <div class="weather-hour-wind-kph"><span class="weather-label">' . __( 'Wind speed', 'cloud-weather' ) . '</span>'. $hour_value->wind_kph .'</div>
                                                                     <div class="weather-hour-windchill_c"><span class="weather-label">' . __( 'Wind chill', 'cloud-weather' ) . '</span>'. $hour_value->windchill_c .'°</div>
                                                                     </div>
                                                                 </div>';
                                                }
                                                $content .= '</div>
                                                             </div>
                                                             </div>
                                                             </div>';
                        }
                        $content .= '</div>';
                    }
                }                    

                $content .= '</div>';
                
                return $content; ?>
            <?php } else {
                $borderRadius = $attributes['borderRadius'] != 0 ?  $attributes['borderRadius'] .'px' : 0;
                $content = '<div class="widget-weather-container"  style="background:' . $attributes['WidgetBgColor'] . '; color: ' . $attributes['WidgetColor'] .'; border-radius:' . $borderRadius .'">';
                $content .= __('Please add a Location to display the weather widget','cloud-weather');
                $content .= '</div>';

                return $content;

            }
        }
    }
}

if(!function_exists('addhttp')){
    function addhttp($url) {
        if (!preg_match("~^(?:f|ht)tps?://~i", $url)) {
        $url = "http://" . $url;
        }
        return $url;
       }
}

/**
 * Register Options page for plugins
*/

function cloud_weather_menu() {
	add_menu_page( 'Cloud Weather Options', 'Cloud Weather', 'manage_options', 'cloud_weather_options', 'cloud_weather_options_page', 'dashicons-cloud' );
    add_submenu_page( 'cloud_weather_options', 'Cloud Weather API', 'Cloud Weather API', 'manage_options', 'cloud_weather_api_documentation', 'cloud_weather_api_documentation');
}

function cloud_weather_options_settings() {
	//register our settings
	register_setting( 'cloud-weather-settings-group', 'weather_api_key' );
}

add_action( 'admin_init', 'cloud_weather_options_settings' );

function cloud_weather_options_page(){ ?>
<div class="wrap">
    <h1><?php _e('Cloud Weather','cloud-weather'); ?></h1>

    <form method="post" action="options.php">
        <?php settings_fields( 'cloud-weather-settings-group' ); ?>
        <?php do_settings_sections( 'cloud-weather-settings-group' ); ?>
        <table class="form-table">
            <tr valign="top">
            <th scope="row"><?php _e('Weather API Key','cloud-weather'); ?></th>
            <td><input type="text" name="weather_api_key" value="<?php echo esc_attr( get_option('weather_api_key') ); ?>" size="50" /></td>
            </tr>
        </table>
        <?php submit_button(); ?>
    </form>
</div>
<?php }

function cloud_weather_api_documentation(){ ?>
    <div class="wrap">
        <div class="weather-logo">
            <img loading="lazy" src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png" />
        </div>
        <h1>
            <?php _e('Cloud Weather API Documentation','cloud-weather'); ?>
        </h1>
        <div class="warning-wrap">
            <div class="warning">
                <span class="icon">&#9888;</span>At moment this plugin block use only the request base url API "current" and "forecast" without Weather Alerts and Air Quality Data
            </div>
        </div>
        <div class="weather-api-container">
            <h2 class="docs-heading">Different plans</h1>
            <section class="docs-intro plans-section">
                <div class="table-responsive">
                    <table class="table table-bordered table-correct">
                        <thead>
                        <tr>
                            <th scope="col">
                                
                            </th>                        
                            <th scope="col">
                                <div class="plan-header text-center">
                                    <h3 class="plan-title">Free</h3>
                                    <div class="plan-cost">
                                        <div class="plan-cost-monthly">
                                            <span class="currency">$</span>
                                            <span class="number">0</span>
                                            <div class="unit">per month</div>
                                        </div>
                                    </div>
                                    <!--//plan-cost-->
                                    <div class="plan-cta">
                                        <a class="btn-primary btn" href="https://www.weatherapi.com/signup.aspx" target="_blank">Get Started</a>
                                    </div>
                                </div>
                                <!--//plan-header-->
                            </th>
                            <th scope="col">
                                <div class="plan-header text-center">
                                    <h3 class="plan-title">Developer</h3>
                                    <div class="plan-cost">
                                        <div class="plan-cost-monthly">
                                            <span class="currency">$</span>
                                            <span class="number">4</span>
                                            <div class="unit">per month</div>
                                        </div>
                                    </div>
                                    <!--//plan-cost-->
                                    <div class="plan-cta">
                                        <a class="btn-primary btn" href="https://www.weatherapi.com/signup.aspx" target="_blank">14-Day Trial</a>
                                    </div>
                                </div>
                            </th>
                            <th scope="col">
                                <div class="plan-header text-center">
                                    <h3 class="plan-title">Starter</h3>
                                    <div class="plan-cost">
                                        <div class="plan-cost-monthly">
                                            <span class="currency">$</span>
                                            <span class="number">7</span>
                                            <div class="unit">per month</div>
                                        </div>
                                    </div>
                                    <!--//plan-cost-->
                                    <div class="plan-cta">
                                        <a class="btn-primary btn" href="https://www.weatherapi.com/signup.aspx">14-Day Trial</a>
                                    </div>
                                </div>
                            </th>
                            <th scope="col">
                                <div class="card-header bg-success text-light text-center rounded">Most Popular</div>
                                <div class="plan-header text-center">
                                    <h3 class="plan-title">Pro+</h3>
                                    <div class="plan-cost">
                                        <div class="plan-cost-monthly">
                                            <span class="currency">$</span>
                                            <span class="number">35</span>
                                            <div class="unit">per month</div>
                                        </div>
                                    </div>
                                    <!--//plan-cost-->
                                    <div class="plan-cta">
                                        <a class="btn-primary btn" href="https://www.weatherapi.com/signup.aspx">14-Day Trial</a>
                                    </div>
                                </div>
                                <!--//plan-header-->
                            </th>
                            <th scope="col">
                                <div class="plan-header text-center">
                                    <h3 class="plan-title">Business</h3>
                                    <div class="plan-cost">
                                        <div class="plan-cost-monthly">
                                            <span class="currency">$</span>
                                            <span class="number">65</span>
                                            <div class="unit">per month</div>
                                        </div>
                                    </div>
                                    <!--//plan-cost-->
                                    <div class="plan-cta">
                                        <a class="btn-primary btn" href="https://www.weatherapi.com/signup.aspx">14-Day Trial</a>
                                    </div>
                                </div>
                                <!--//plan-header-->
                            </th>
                            <th scope="col">
                                <div class="plan-header text-center">
                                    <h3 class="plan-title">Custom</h3>
                                    <div class="plan-cost"></div>
                                    <!--//plan-cost-->
                                    <div class="plan-cta">
                                        <a class="btn-primary btn" href="https://www.weatherapi.com/signup.aspx">Contact Us</a>
                                    </div>
                                </div>
                                <!--//plan-header-->
                            </th>
                        </tr>
                            </thead>
                        <tbody>
                        <tr>
                            <th scope="row">Calls per month</th>
                            <td>1 Million</td>
                            <td>2 Million</td>                        
                            <td>3 Million</td>                        
                            <td>5 Million</td>
                            <td>10 Million</td>
                            <td>Custom</td>
                        </tr>
                        <tr>
                            <th scope="row">Realtime weather</th>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <th scope="row">Forecast Days</th>
                            <td>3 Day</td>
                            <td>5 Day</td>
                            <td>7 Day</td>
                            <td>14 Day</td>
                            <td>14 day</td>
                            <td>14 Day</td>
                        </tr>                        
                        <tr>
                            <th scope="row">Forecast Interval</th>
                            <td>Daily and Hourly</td>
                            <td>Daily and Hourly</td>
                            <td>Daily and Hourly</td>
                            <td>Daily and Hourly</td>
                            <td>Daily and Hourly</td>
                            <td>Daily, Hourly and 15 min <span class="badge badge-pill badge-danger">New</span></td>
                        </tr>
                        <tr>
                            <th scope="row">Marine Weather <span class="badge badge-pill badge-danger">New</span></th>
                            <td>1 Day. No Tide Data</td>
                            <td>2 Day. No Tide Data</td>
                            <td>3 Day. No Tide Data</td>
                            <td>5 Day + Tide Data</td>
                            <td>7 Day + Tide Data</td>
                            <td>7 Day + Tide Data</td>
                        </tr>
                        <tr>
                            <th scope="row">Marine Weather Interval</th>
                            <td>Daily only</td>
                            <td>Daily only</td>
                            <td>Daily only</td>
                            <td>Daily and Hourly</td>
                            <td>Daily and Hourly</td>
                            <td>Daily, Hourly and 15 min</td>
                        </tr>
                        <tr>
                            <th scope="row">Historical Weather</th>
                            <td>Last 7 days</td>
                            <td>Last 7 days</td>
                            <td>Last 7 days</td>
                            <td>Last 365 days</td>
                            <td>1st Jan 2010 onwards</td>
                            <td>1st Jan 2010 onwards</td>
                        </tr>
                        <tr>
                            <th scope="row">Future Weather <span class="badge badge-pill badge-danger">New</span></th>
                            <td>No</td>
                            <td>No</td>                        
                            <td>No</td>
                            <td>300 days ahead</td>
                            <td>300 days ahead</td>
                            <td>365 days ahead</td>
                        </tr>
                        <tr>
                            <th scope="row">Weather Alerts</th>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <th scope="row">Air Quality(AQI)</th>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <th scope="row">Search API</th>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <th scope="row">Astronomy API</th>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <th scope="row">IP Lookup</th>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <th scope="row">Sports API</th>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <th scope="row">SSL</th>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <th scope="row">Uptime</th>
                            <td>95.5%</td>
                            <td>97.5%</td>
                            <td>99%</td>
                            <td>99%</td>
                            <td>99.9%</td>
                            <td>100%</td>
                        </tr>
                        <tr>
                            <th scope="row">Bulk Request <span class="badge badge-pill badge-danger">New</span></th>
                            <td>No</td>
                            <td>No</td>
                            <td>No</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <th scope="row">IP Blocking</th>
                            <td>No</td>
                            <td>No</td>
                            <td>No</td>
                            <td>No</td>
                            <td>Yes</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <th scope="row">Commercial Use</th>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <th scope="row">Non-Commercial Use</th>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                            <td>Yes</td>
                        </tr>
                            <tr>
                                <th scope="row">Yearly Payment</th>
                                <td>Yes</td>
                                <td>Yes</td>
                                <td>Yes</td>
                                <td>Yes</td>
                                <td>Yes</td>
                                <td>Yes</td>
                            </tr>                       
                        </tbody>
                    </table>
                </div>
            </section>
            <h2 class="docs-heading">Introduction</h1>
            <section class="docs-intro">
                <p>WeatherAPI.com provides access to free weather and geo data via a JSON/XML restful API. It allows developers to create desktop, web and mobile applications using this data very easy.</p>
                <p>We provide following data through our API:</p>
                <ul class="doc-list">
                    <li>Real-time weather</li>
                    <li>14 day weather forecast</li>
                    <li>Historical weather</li>
                    <li>Marine Weather and Tide Data <span class="badge badge-pill badge-danger">New</span></li>
                    <li>Future Weather (Upto 300 days ahead) <span class="badge badge-pill badge-danger">New</span></li>
                    <li>Daily and hourly intervals</li>
                    <li>15 min interval<span class="badge badge-pill badge-danger">New</span> (Enterprise only)</li> 
                    <li>Astronomy</li>
                    <li>Time zone</li>
                    <li>Sports</li>
                    <li>Location data</li>
                    <li>Search or Autocomplete API</li>
                    <li>Weather Alerts <span class="badge badge-pill badge-danger">New</span></li>
                    <li>Air Quality Data <span class="badge badge-pill badge-danger">New</span></li>
                    <li>Bulk Request <span class="badge badge-pill badge-danger">New</span></li>
                </ul>
            </section>
            <section class="docs-section" id="intro-getting-started">
                <h2 class="section-heading">Getting Started</h2>
                <p>
                    You need to <a href="https://www.weatherapi.com/signup.aspx" target="_blank">signup</a> and then you can find your API key under <a href="https://www.weatherapi.com/login.aspx" target="_blank">your account</a>, and
                start using API right away!
                </p>
                <p>Try our weather API by using interactive <a href="https://www.weatherapi.com/api-explorer.aspx" target="_blank">API Explorer</a>.</p>
            </section>
            <section class="docs-section" id="intro-request">
                        <h2 class="section-heading">Request</h2>
                        <h5>Request URL</h5>
                        <p>
                            Request to WeatherAPI.com API consists of base url and API method. You can make both
                    HTTP or HTTPS request to our API.
                        </p>
                        <p>Base URL: <a href="#">http://api.weatherapi.com/v1</a></p>
                        <div class="table-responsive">
                            <table class="table table-bordered table-correct">
                                <tbody><tr>
                                    <th>API</th>
                                    <th>API Method</th>
                                </tr>
                                <tr>
                                    <td>Current weather</td>
                                    <td>/current.json or /current.xml</td>
                                </tr>
                                <tr>
                                    <td>Forecast</td>
                                    <td>/forecast.json or /forecast.xml</td>
                                </tr>
                                <tr>
                                    <td>Search or Autocomplete</td>
                                    <td>/search.json or /search.xml</td>
                                </tr>
                                <tr>
                                    <td>History</td>
                                    <td>/history.json or /history.xml</td>
                                </tr>
                                <tr>
                                    <td>Marine</td>
                                    <td>/marine.json or /marine.xml</td>
                                </tr>
                                <tr>
                                    <td>Future</td>
                                    <td>/future.json or /future.xml</td>
                                </tr>
                                <tr>
                                    <td>Time Zone</td>
                                    <td>/timezone.json or /timezone.xml</td>
                                </tr>
                                <tr>
                                    <td>Sports</td>
                                    <td>/sports.json or /sports.xml</td>
                                </tr>
                                <tr>
                                    <td>Astronomy</td>
                                    <td>/astronomy.json or /astronomy.xml</td>
                                </tr>
                                <tr>
                                    <td>IP Lookup</td>
                                    <td>/ip.json or /ip.xml</td>
                                </tr>
                                
                                
                                
                            </tbody></table>
                        </div>
                        <h4 class="doc-tit-text">Request Parameters</h4>
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <tbody><tr>
                                    <th>Parameter</th>
                                    <th></th>
                                    <th>Description</th>
                                </tr>
                                <tr>
                                    <td>key</td>
                                    <td>Required</td>
                                    <td>API Key</td>
                                </tr>
                                <tr>
                                    <td>q</td>
                                    <td>Required</td>
                                    <td>
                                        <p>
                                            Query parameter based on which
                                    data is sent back. It could be
                                    following:
                                        </p>
                                        <ul>
                                            <li>Latitude and Longitude (Decimal degree) e.g:
                                        q=48.8567,2.3508</li>
                                            <li>city name e.g.: q=Paris</li>
                                            <li>US zip e.g.: q=10001</li>
                                            <li>UK postcode e.g: q=SW1</li>
                                            <li>Canada postal code e.g: q=G2J</li>
                                            <li>metar:&lt;metar code&gt; e.g:
                                        q=metar:EGLL</li>
                                            <li>iata:&lt;3 digit airport code&gt; e.g:
                                        q=iata:DXB</li>
                                            <li>auto:ip IP lookup e.g: q=auto:ip</li>
                                            <li>IP address (IPv4 and IPv6 supported) e.g: q=100.0.0.1</li>
                                            <li>bulk  <span class="badge badge-pill badge-danger">New</span></li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>days</td>
                                    <td>Required only with forecast API method.</td>
                                    <td>
                                        <p>
                                            Number of days of forecast
                                required.
                                        </p>
                                        <p>
                                            days parameter value ranges
                                between 1 and 14. e.g: days=5
                                        </p>
                                        <p>
                                            If no days parameter is provided
                                then only today's weather is
                                returned.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>dt (Required for History and Future API)</td>
                                    <td>Restrict date output for Forecast and History API method.</td>
                                    <td>
                                        <p>For history API 'dt' should be on or after 1st Jan, 2010 in yyyy-MM-dd format (i.e. dt=2010-01-01)</p>
                                        <p>For forecast API 'dt' should be between today and next 14 day in yyyy-MM-dd format (i.e. dt=2010-01-01)</p>
                                        <p>For future API 'dt' should be between 14 days and 300 days from today in the future in yyyy-MM-dd format (i.e. dt=2023-01-01)</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>(Optional) unixdt</td>
                                    <td>Unix Timestamp used by Forecast and History API method.</td>
                                    <td>
                                        <p>unixdt has same restriction as 'dt' parameter. Please either pass 'dt' or 'unixdt' and not both in same request. e.g.: unixdt=1490227200</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>(Optional) end_dt (Available for History API)</td>
                                    <td>Restrict date output for History API method.</td>
                                    <td>
                                        <p>For history API 'end_dt' should be on or after 1st Jan, 2010 in yyyy-MM-dd format (i.e. dt=2010-01-01)</p>
                                        <p>'end_dt' should be greater than 'dt' parameter and difference should not be more than 30 days between the two dates.</p>
                                        <p><b>Only works for API on Pro plan and above.</b></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>(Optional) unixend_dt</td>
                                    <td>Unix Timestamp used by History API method.</td>
                                    <td>
                                        <p>unixend_dt has same restriction as 'end_dt' parameter. Please either pass 'end_dt' or 'unixend_dt' and not both in same request. e.g.: unixend_dt=1490227200</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>(Optional) hour</td>
                                    <td>Restricting forecast or history output to a specific hour in a given day.</td>
                                    <td>
                                        <p>Must be in 24 hour. For example 5 pm should be hour=17, 6 am as hour=6</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>(Optional) alerts <span class="badge badge-pill badge-danger">New</span></td>
                                    <td>Disable alerts in forecast API output</td>
                                    <td>
                                        <p>alerts=yes or alerts=no</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>(Optional) aqi <span class="badge badge-pill badge-danger">New</span></td>
                                    <td>Enable/Disable Air Quality data in forecast API output</td>
                                    <td>
                                        <p>aqi=yes or aqi=no</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>(Optional) tides <span class="badge badge-pill badge-danger">New</span></td>
                                    <td>Enable/Disable Tide data in Marine API output</td>
                                    <td>
                                        <p>tides=yes or tides=no</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>(Optional) tp <span class="badge badge-pill badge-danger">New</span></td>
                                    <td>Get 15 min interval data for Forecast and History API. Available for Enterprise clients only.</td>
                                    <td>
                                        <p>tp=15</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>(Optional) lang</td>
                                    <td>Returns 'condition:text' field in API in the desired language</td>
                                    <td>
                                        <p>Please pass 'lang code' from below table. e.g.: lang=fr</p>
                                        <table class="table table-striped table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th>Language</th>
                                                    <th>lang code</th>
                                                </tr>
                                                <tr>
                                                    <td>Arabic</td>
                                                    <td>ar</td>
                                                </tr>
                                                <tr>
                                                    <td>Bengali</td>
                                                    <td>bn</td>
                                                </tr>
                                                <tr>
                                                    <td>Bulgarian</td>
                                                    <td>bg</td>
                                                </tr>
                                                <tr>
                                                    <td>Chinese Simplified</td>
                                                    <td>zh</td>
                                                </tr>
                                                <tr>
                                                    <td>Chinese Traditional</td>
                                                    <td>zh_tw</td>
                                                </tr>
                                                <tr>
                                                    <td>Czech</td>
                                                    <td>cs</td>
                                                </tr>
                                                <tr>
                                                    <td>Danish</td>
                                                    <td>da</td>
                                                </tr>
                                                <tr>
                                                    <td>Dutch</td>
                                                    <td>nl</td>
                                                </tr>
                                                <tr>
                                                    <td>Finnish</td>
                                                    <td >fi</td>
                                                </tr>
                                                <tr>
                                                    <td>French</td>
                                                    <td>fr</td>
                                                </tr>
                                                <tr>
                                                    <td>German</td>
                                                    <td>de</td>
                                                </tr>
                                                <tr>
                                                    <td>Greek</td>
                                                    <td>el</td>
                                                </tr>
                                                <tr>
                                                    <td>Hindi</td>
                                                    <td>hi</td>
                                                </tr>
                                                <tr>
                                                    <td>Hungarian</td>
                                                    <td>hu</td>
                                                </tr>
                                                <tr>
                                                    <td>Italian</td>
                                                    <td>it</td>
                                                </tr>
                                                <tr>
                                                    <td>Japanese</td>
                                                    <td>ja</td>
                                                </tr>
                                                <tr>
                                                    <td>Javanese</td>
                                                    <td>jv</td>
                                                </tr>
                                                <tr>
                                                    <td>Korean</td>
                                                    <td>ko</td>
                                                </tr>
                                                <tr>
                                                    <td>Mandarin</td>
                                                    <td>zh_cmn</td>
                                                </tr>
                                                <tr>
                                                    <td>Marathi</td>
                                                    <td>mr</td>
                                                </tr>
                                                <tr>
                                                    <td>Polish</td>
                                                    <td>pl</td>
                                                </tr>
                                                <tr>
                                                    <td>Portuguese</td>
                                                    <td>pt</td>
                                                </tr>
                                                <tr>
                                                    <td>Punjabi</td>
                                                    <td>pa</td>
                                                </tr>
                                                <tr>
                                                    <td>Romanian</td>
                                                    <td>ro</td>
                                                </tr>
                                                <tr>
                                                    <td>Russian</td>
                                                    <td>ru</td>
                                                </tr>
                                                <tr>
                                                    <td>Serbian</td>
                                                    <td>sr</td>
                                                </tr>
                                                <tr>
                                                    <td>Sinhalese</td>
                                                    <td>si</td>
                                                </tr>
                                                <tr>
                                                    <td>Slovak</td>
                                                    <td>sk</td>
                                                </tr>
                                                <tr>
                                                    <td>Spanish</td>
                                                    <td>es</td>
                                                </tr>
                                                <tr>
                                                    <td>Swedish</td>
                                                    <td>sv</td>
                                                </tr>
                                                <tr>
                                                    <td>Tamil</td>
                                                    <td>ta</td>
                                                </tr>
                                                <tr>
                                                    <td>Telugu</td>
                                                    <td>te</td>
                                                </tr>
                                                <tr>
                                                    <td>Turkish</td>
                                                    <td>tr</td>
                                                </tr>
                                                <tr>
                                                    <td>Ukrainian</td>
                                                    <td>uk</td>
                                                </tr>
                                                <tr>
                                                    <td>Urdu</td>
                                                    <td>ur</td>
                                                </tr>
                                                <tr>
                                                    <td>Vietnamese</td>
                                                    <td>vi</td>
                                                </tr>
                                                <tr>
                                                    <td>Wu (Shanghainese)</td>
                                                    <td>zh_wuu</td>
                                                </tr>
                                                <tr>
                                                    <td>Xiang</td>
                                                    <td>zh_hsn</td>
                                                </tr>
                                                <tr>
                                                    <td>Yue (Cantonese)</td>
                                                    <td>zh_yue</td>
                                                </tr>
                                                <tr>
                                                    <td>Zulu</td>
                                                    <td>zu</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <section class="docs-section" id="intro-location">
                        <h2 class="section-heading">Location Object</h2>

                        <p>
                            Location object is returned with each API response. It is actually the matched
                    location for which the information has been returned.
                        </p>
                        <br>

                        <p>
                            It returns information about the location including geo points, name, region,
                    country and time zone information as well.
                        </p>
                        <br>

                        <p>
                            <i>When using <a href="#apis-search">Search or Autocomplete API</a> following fields are NOT returned
                    tz_id, localtime_epoch and localtime.</i>
                        </p>
                        <br>
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <tbody><tr>
                                    <th>Field</th>
                                    <th>Data Type</th>
                                    <th>Description</th>
                                </tr>
                                <tr>
                                    <td>lat</td>
                                    <td>decimal</td>
                                    <td>Latitude in decimal degree</td>
                                </tr>
                                <tr>
                                    <td>lon</td>
                                    <td>decimal</td>
                                    <td>Longitude in decimal degree</td>
                                </tr>
                                <tr>
                                    <td>name</td>
                                    <td>string</td>
                                    <td>Location name</td>
                                </tr>
                                <tr>
                                    <td>region</td>
                                    <td>string</td>
                                    <td>Region or state of the location, if availa</td>
                                </tr>
                                <tr>
                                    <td>country</td>
                                    <td>string</td>
                                    <td>Location country</td>
                                </tr>
                                <tr>
                                    <td>tz_id</td>
                                    <td>string</td>
                                    <td>Time zone name</td>
                                </tr>
                                <tr>
                                    <td>localtime_epoch</td>
                                    <td>int</td>
                                    <td>Local date and time in unix time</td>
                                </tr>
                                <tr>
                                    <td>localtime</td>
                                    <td>string</td>
                                    <td>Local date and time</td>
                                </tr>
                            </tbody></table>
                        </div>
                    </section>
                    <section class="docs-section" id="intro-error-codes">
                        <h2 class="section-heading">API Error Codes</h2>

                        <p>If there is an error, API response contains error message including error code for following 4xx HTTP Status codes.</p>

                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <tbody><tr>
                                    <th>HTTP Status Code</th>
                                    <th>Error code</th>
                                    <th>Description</th>
                                </tr>
                                <tr>
                                    <td>401</td>
                                    <td>1002</td>
                                    <td>API key not provided.</td>
                                </tr>
                                <tr>
                                    <td>400</td>
                                    <td>1003</td>
                                    <td>Parameter 'q' not provided.</td>
                                </tr>
                                <tr>
                                    <td>400</td>
                                    <td>1005</td>
                                    <td>API request url is invalid</td>
                                </tr>
                                <tr>
                                    <td>400</td>
                                    <td>1006</td>
                                    <td>No location found matching parameter 'q'</td>
                                </tr>
                                <tr>
                                    <td>401</td>
                                    <td>2006</td>
                                    <td>API key provided is invalid</td>
                                </tr>
                                <tr>
                                    <td>403</td>
                                    <td>2007</td>
                                    <td>API key has exceeded calls per month quota.</td>
                                </tr>
                                <tr>
                                    <td>403</td>
                                    <td>2008</td>
                                    <td>API key has been disabled.</td>
                                </tr>
                                <tr>
                                    <td>403</td>
                                    <td>2009</td>
                                    <td>API key does not have access to the resource. Please check pricing page for what is allowed in your API subscription plan.</td>
                                </tr>
                                <tr>
                                    <td>400</td>
                                    <td>9000</td>
                                    <td>Json body passed in bulk request is invalid. Please make sure it is valid json with utf-8 encoding.</td>
                                </tr>
                                <tr>
                                    <td>400</td>
                                    <td>9001</td>
                                    <td>Json body contains too many locations for bulk request. Please keep it below 50 in a single request.</td>
                                </tr>
                                <tr>
                                    <td>400</td>
                                    <td>9999</td>
                                    <td>Internal application error.</td>
                                </tr>
                            </tbody></table>
                        </div>

                    </section>
        </div>
    </div>
<?php }

add_action( 'admin_menu', 'cloud_weather_menu' );

add_action('admin_enqueue_scripts', 'cloud_weather_plugin_admin_assets');

function cloud_weather_plugin_admin_assets(){
    wp_enqueue_style('cloud_weather_admin', plugins_url('admin/admin.css',__FILE__ ));
}

function cloud_weather_print_scripts() { ?>
	<script type="text/javascript">
		var weather_api_key = <?php echo json_encode(esc_attr( get_option('weather_api_key') )); ?>;
        var plugin_path = <?php echo json_encode(plugin_dir_url( __FILE__ )); ?>;
	</script>
	<?php
}
add_action('wp_print_scripts', 'cloud_weather_print_scripts');
