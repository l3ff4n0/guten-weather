<?php
/**
 * Plugin Name:       Guten weather
 * Description:       This is a guten weather block to display weather and forecast
 * Requires at least: 6.2
 * Requires PHP:      7.0
 * Version:           0.2.0
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
    wp_register_script('swiper-js', '//cdnjs.cloudflare.com/ajax/libs/Swiper/10.0.4/swiper-bundle.min.js');
    $api_key = get_option('weather_api_key');
    if(!empty($api_key)){
        register_block_type( __DIR__, array(
            'view_script' => 'swiper-js',
            'editor_script' => 'swiper-js'
        ));
    }
}
add_action( 'init', 'guten_weather_guten_weather_block_init' );

/**
 * Register Options page for plugins
*/

function guten_weather_menu() {
	add_menu_page( 'Guten Weather Options', 'Guten Weather', 'manage_options', 'guten_weather_options', 'guten_weather_options_page', 'dashicons-cloud' );
    add_submenu_page( 'guten_weather_options', 'Guten Weather API', 'Guten Weather API', 'manage_options', 'guten_weather_api_documentation', 'gutern_weather_api_documentation');
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

function gutern_weather_api_documentation(){ ?>
    <div class="wrap">
        <div class="weather-logo">
            <img loading="lazy" src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png" />
        </div>
        <h1>
            <?php _e('Guten Weather API Documentation','guten-weather'); ?>
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

add_action( 'admin_menu', 'guten_weather_menu' );

add_action('admin_enqueue_scripts', 'guten_weather_plugin_admin_assets');

function guten_weather_plugin_admin_assets(){
    wp_enqueue_style('boot_css', plugins_url('admin/admin.css',__FILE__ ));
}

function guten_weather_print_scripts() { ?>
	<script type="text/javascript">
		var weather_api_key = <?php echo json_encode(esc_attr( get_option('weather_api_key') )); ?>;
        var plugin_path = <?php echo json_encode(plugin_dir_url( __FILE__ )); ?>;
	</script>
	<?php
}
add_action('wp_print_scripts', 'guten_weather_print_scripts');
