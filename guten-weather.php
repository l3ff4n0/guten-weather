<?php
/**
 * Plugin Name:       Guten weather
 * Description:       This is a guten weather block to display weather and forecast
 * Requires at least: 6.0
 * Requires PHP:      7.0
 * Version:           0.1.3
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
    wp_register_script('swiper-js', '//cdnjs.cloudflare.com/ajax/libs/Swiper/9.4.1/swiper-bundle.min.js');
    wp_register_style('swiper-css', '//cdnjs.cloudflare.com/ajax/libs/Swiper/9.4.1/swiper-bundle.min.css');
	register_block_type( __DIR__, array(
        'view_script' => 'swiper-js',
        'editor_script' => 'swiper-js'
    ));
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
        <h1><?php _e('Guten Weather API Documentation','guten-weather'); ?></h1>
        <div class="weather-api-container">
            <h2 class="docs-heading">Introduction</h1>
            <section class="docs-intro">
                <p class="mob-vers6">WeatherAPI.com provides access to free weather and geo data via a JSON/XML restful API. It allows developers to create desktop, web and mobile applications using this data very easy.</p>
                <p class="tit-list">We provide following data through our API:</p>
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
                        <h5 class="doc-tit-text">Request URL</h5>
                        <p class="mob-vers8">
                            Request to WeatherAPI.com API consists of base url and API method. You can make both
                    HTTP or HTTPS request to our API.
                        </p>
                        <p class="mob-vers8">Base URL: <a href="#">http://api.weatherapi.com/v1</a></p>
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
                        <h4 class="doc-tit-text mob-vers7">Request Parameters</h4>
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
                                            <tbody><tr>
                                                <th>Language</th>
                                                <th>lang code</th>
                                            </tr>
                                            <tr class="whiterow">
                                                <td>Arabic</td>
                                                <td class="last">ar</td>
                                            </tr>
                                            <tr class="grayrow">
                                                <td>Bengali</td>
                                                <td class="last">bn</td>
                                            </tr>
                                            <tr class="whiterow">
                                                <td>Bulgarian</td>
                                                <td class="last">bg</td>
                                            </tr>
                                            <tr class="grayrow">
                                                <td>Chinese Simplified</td>
                                                <td class="last">zh</td>
                                            </tr>
                                            <tr class="whiterow">
                                                <td>Chinese Traditional</td>
                                                <td class="last">zh_tw</td>
                                            </tr>
                                            <tr class="grayrow">
                                                <td>Czech</td>
                                                <td class="last">cs</td>
                                            </tr>
                                            <tr class="whiterow">
                                                <td>Danish</td>
                                                <td class="last">da</td>
                                            </tr>
                                            <tr class="grayrow">
                                                <td>Dutch</td>
                                                <td class="last">nl</td>
                                            </tr>
                                            <tr class="whiterow">
                                                <td>Finnish</td>
                                                <td class="last">fi</td>
                                            </tr>
                                            <tr class="grayrow">
                                                <td>French</td>
                                                <td class="last">fr</td>
                                            </tr>
                                            <tr class="whiterow">
                                                <td>German</td>
                                                <td class="last">de</td>
                                            </tr>
                                            <tr class="grayrow">
                                                <td>Greek</td>
                                                <td class="last">el</td>
                                            </tr>
                                            <tr class="whiterow">
                                                <td>Hindi</td>
                                                <td class="last">hi</td>
                                            </tr>
                                            <tr class="grayrow">
                                                <td>Hungarian</td>
                                                <td class="last">hu</td>
                                            </tr>
                                            <tr class="whiterow">
                                                <td>Italian</td>
                                                <td class="last">it</td>
                                            </tr>
                                            <tr class="grayrow">
                                                <td>Japanese</td>
                                                <td class="last">ja</td>
                                            </tr>
                                            <tr class="whiterow">
                                                <td>Javanese</td>
                                                <td class="last">jv</td>
                                            </tr>
                                            <tr class="grayrow">
                                                <td>Korean</td>
                                                <td class="last">ko</td>
                                            </tr>
                                            <tr class="whiterow">
                                                <td>Mandarin</td>
                                                <td class="last">zh_cmn</td>
                                            </tr>
                                            <tr class="grayrow">
                                                <td>Marathi</td>
                                                <td class="last">mr</td>
                                            </tr>
                                            <tr class="whiterow">
                                                <td>Polish</td>
                                                <td class="last">pl</td>
                                            </tr>
                                            <tr class="grayrow">
                                                <td>Portuguese</td>
                                                <td class="last">pt</td>
                                            </tr>
                                            <tr class="whiterow">
                                                <td>Punjabi</td>
                                                <td class="last">pa</td>
                                            </tr>
                                            <tr class="grayrow">
                                                <td>Romanian</td>
                                                <td class="last">ro</td>
                                            </tr>
                                            <tr class="whiterow">
                                                <td>Russian</td>
                                                <td class="last">ru</td>
                                            </tr>
                                            <tr class="grayrow">
                                                <td>Serbian</td>
                                                <td class="last">sr</td>
                                            </tr>
                                            <tr class="whiterow">
                                                <td>Sinhalese</td>
                                                <td class="last">si</td>
                                            </tr>
                                            <tr class="grayrow">
                                                <td>Slovak</td>
                                                <td class="last">sk</td>
                                            </tr>
                                            <tr class="whiterow">
                                                <td>Spanish</td>
                                                <td class="last">es</td>
                                            </tr>
                                            <tr class="grayrow">
                                                <td>Swedish</td>
                                                <td class="last">sv</td>
                                            </tr>
                                            <tr class="whiterow">
                                                <td>Tamil</td>
                                                <td class="last">ta</td>
                                            </tr>
                                            <tr class="grayrow">
                                                <td>Telugu</td>
                                                <td class="last">te</td>
                                            </tr>
                                            <tr class="whiterow">
                                                <td>Turkish</td>
                                                <td class="last">tr</td>
                                            </tr>
                                            <tr class="grayrow">
                                                <td>Ukrainian</td>
                                                <td class="last">uk</td>
                                            </tr>
                                            <tr class="whiterow">
                                                <td>Urdu</td>
                                                <td class="last">ur</td>
                                            </tr>
                                            <tr class="grayrow">
                                                <td>Vietnamese</td>
                                                <td class="last">vi</td>
                                            </tr>
                                            <tr class="whiterow">
                                                <td>Wu (Shanghainese)</td>
                                                <td class="last">zh_wuu</td>
                                            </tr>
                                            <tr class="grayrow">
                                                <td>Xiang</td>
                                                <td class="last">zh_hsn</td>
                                            </tr>
                                            <tr class="whiterow">
                                                <td>Yue (Cantonese)</td>
                                                <td class="last">zh_yue</td>
                                            </tr>
                                            <tr class="grayrow">
                                                <td>Zulu</td>
                                                <td class="last">zu</td>
                                            </tr>


                                        </tbody></table>


                                    </td>
                                </tr>
                            </tbody></table>
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
                    <section class="docs-section" id="intro-alerts">
                        <h2 class="section-heading">Weather Alerts</h2>

                        <p>
                            <a href="#apis-forecast">Forecast API</a> returns alerts and warnings issued by government agencies (USA, UK, Europe and Rest of the World) as an array if available for the location provided through the <a href="#apis-forecast">Forecast API</a>.
                        </p>

                        <p>
                            By default alerts are not returned. To get alerts back in the response from <a href="#apis-forecast">Forecast API</a>, pass the parameter <b>alerts=yes</b>.
                        </p>
                        <p>
                            Note: Some of the alerts may be in local language of the location.
                        </p>

                        <div class="table-responsive">
                            <table class="table table-bordered table-correct">
                                <tbody><tr>
                                    <th>Field</th>
                                    <th class="new-width">Data Type</th>
                                    <th>Description</th>
                                </tr>
                                <tr>
                                    <td>headline</td>
                                    <td>string</td>
                                    <td>Alert headline</td>
                                </tr>
                                <tr>
                                    <td>msgType</td>
                                    <td>string</td>
                                    <td>Type of alert</td>
                                </tr>
                                <tr>
                                    <td>severity</td>
                                    <td>string</td>
                                    <td>Severity of alert</td>
                                </tr>
                                <tr>
                                    <td>urgency</td>
                                    <td>string</td>
                                    <td>Urgency</td>
                                </tr>
                                <tr>
                                    <td>areas</td>
                                    <td>string</td>
                                    <td>Areas covered</td>
                                </tr>
                                <tr>
                                    <td>category</td>
                                    <td>string</td>
                                    <td>Category</td>
                                </tr>
                                <tr>
                                    <td>certainty</td>
                                    <td>string</td>
                                    <td>Certainty</td>
                                </tr>
                                <tr>
                                    <td>event</td>
                                    <td>string</td>
                                    <td>Event</td>
                                </tr>

                                <tr>
                                    <td>note</td>
                                    <td>string</td>
                                    <td>Note</td>
                                </tr>
                                <tr>
                                    <td>effective</td>
                                    <td>date</td>
                                    <td>Effective</td>
                                </tr>
                                <tr>
                                    <td>expires</td>
                                    <td>string</td>
                                    <td>Expires</td>
                                </tr>
                                <tr>
                                    <td>desc</td>
                                    <td>string</td>
                                    <td>Description</td>
                                </tr>
                                <tr>
                                    <td>instruction</td>
                                    <td>string</td>
                                    <td>Instruction</td>
                                </tr>

                            </tbody></table>
                        </div>

                        <h4>Example response of alerts</h4>
                        <pre class="rounded">                            <code class="json hljs"><span class="hljs-string">"alerts"</span>:{
    <span class="hljs-attr">"alert"</span>:[
        {
        <span class="hljs-attr">"headline"</span>:<span class="hljs-string">"Flood Warning issued January 05 at 9:47PM EST until January 07 at 6:15AM EST by NWS"</span>,
        <span class="hljs-attr">"msgtype"</span>:<span class="hljs-string">"Alert"</span>,
        <span class="hljs-attr">"severity"</span>:<span class="hljs-string">"Moderate"</span>,
        <span class="hljs-attr">"urgency"</span>:<span class="hljs-string">"Expected"</span>,
        <span class="hljs-attr">"areas"</span>:<span class="hljs-string">"Calhoun; Lexington; Richland"</span>,
        <span class="hljs-attr">"category"</span>:<span class="hljs-string">"Met"</span>,
        <span class="hljs-attr">"certainty"</span>:<span class="hljs-string">"Likely"</span>,
        <span class="hljs-attr">"event"</span>:<span class="hljs-string">"Flood Warning"</span>,
        <span class="hljs-attr">"note"</span>:<span class="hljs-string">"Alert for Calhoun; Lexington; Richland (South Carolina) Issued by the National Weather Service"</span>,
        <span class="hljs-attr">"effective"</span>:<span class="hljs-string">"2021-01-05T21:47:00-05:00"</span>,
        <span class="hljs-attr">"expires"</span>:<span class="hljs-string">"2021-01-07T06:15:00-05:00"</span>,
        <span class="hljs-attr">"desc"</span>:<span class="hljs-string">"...The Flood Warning continues for the following rivers in South\nCarolina...\nCongaree River At Carolina Eastman affecting Richland, Calhoun\nand Lexington Counties.\nCongaree River At Congaree National Park-Gadsden affecting\nCalhoun and Richland Counties.\nNorth Fork Edisto River At Orangeburg affecting Orangeburg County.\n...The Flood Warning is now in effect until Thursday morning...\nThe Flood Warning continues for\nthe Congaree River At Carolina Eastman.\n* Until Thursday morning.\n* At 9:28 PM EST Tuesday the stage was 115.6 feet.\n* Flood stage is 115.0 feet.\n* Minor flooding is occurring and minor flooding is forecast.\n* Recent Activity...The maximum river stage in the 24 hours ending\nat 9:28 PM EST Tuesday was 118.2 feet.\n* Forecast...The river will rise to 115.7 feet just after midnight\ntonight. It will then fall below flood stage tomorrow morning to\n114.2 feet and begin rising again tomorrow evening. It will rise\nto 114.3 feet early Thursday morning. It will then fall again and\nremain below flood stage.\n* Impact...At 115.0 feet, Flooding occurs in low lying areas of the\nCarolina Eastman Facility and at the Congaree National Park.\n* Flood History...This crest compares to a previous crest of 116.3\nfeet on 12/03/2020.\n&amp;&amp;"</span>,
        <span class="hljs-attr">"instruction"</span>:<span class="hljs-string">"A Flood Warning means that flooding is imminent or occurring. All\ninterested parties should take necessary precautions immediately.\nMotorists should not attempt to drive around barricades or drive\ncars through flooded areas.\nCaution is urged when walking near riverbanks.\nAdditional information is available at www.weather.gov.\nThe next statement will be issued Wednesday morning at 1000 AM EST."</span>
        },
        {
        <span class="hljs-attr">"headline"</span>:<span class="hljs-string">"Flood Warning issued January 05 at 9:47PM EST until January 09 at 4:00AM EST by NWS"</span>,
        <span class="hljs-attr">"msgtype"</span>:<span class="hljs-string">"Alert"</span>,
        <span class="hljs-attr">"severity"</span>:<span class="hljs-string">"Moderate"</span>,
        <span class="hljs-attr">"urgency"</span>:<span class="hljs-string">"Expected"</span>,
        <span class="hljs-attr">"areas"</span>:<span class="hljs-string">"Calhoun; Richland"</span>,
        <span class="hljs-attr">"category"</span>:<span class="hljs-string">"Met"</span>,
        <span class="hljs-attr">"certainty"</span>:<span class="hljs-string">"Likely"</span>,
        <span class="hljs-attr">"event"</span>:<span class="hljs-string">"Flood Warning"</span>,
        <span class="hljs-attr">"note"</span>:<span class="hljs-string">"Alert for Calhoun; Richland (South Carolina) Issued by the National Weather Service"</span>,
        <span class="hljs-attr">"effective"</span>:<span class="hljs-string">"2021-01-05T21:47:00-05:00"</span>,
        <span class="hljs-attr">"expires"</span>:<span class="hljs-string">"2021-01-09T04:00:00-05:00"</span>,
        <span class="hljs-attr">"desc"</span>:<span class="hljs-string">"...The Flood Warning continues for the following rivers in South\nCarolina...\nCongaree River At Carolina Eastman affecting Richland, Calhoun\nand Lexington Counties.\nCongaree River At Congaree National Park-Gadsden affecting\nCalhoun and Richland Counties.\nNorth Fork Edisto River At Orangeburg affecting Orangeburg County.\n...The Flood Warning is now in effect until early Saturday morning...\nThe Flood Warning continues for\nthe Congaree River At Congaree National Park-Gadsden.\n* Until late Friday night.\n* At 9:00 PM EST Tuesday the stage was 16.5 feet.\n* Flood stage is 15.0 feet.\n* Minor flooding is occurring and minor flooding is forecast.\n* Recent Activity...The maximum river stage in the 24 hours ending\nat 9:00 PM EST Tuesday was 17.2 feet.\n* Forecast...The river is expected to fall below flood stage early\nFriday morning and continue falling to 12.4 feet Sunday evening.\n* Impact...At 15.0 feet, Flooding begins in the Congaree National\nPark. This will begin to produce flooding of portions of the lower\nboardwalk.\n* Impact...At 17.0 feet, The access road to the Sandy Run\nsubdivision becomes flooded. The lower boardwalk in the Congaree\nNational Park becomes flooded by Cedar Creek.\n* Impact...At 18.0 feet, Several homes in the Sandy Run subdivision\nalong the river become flooded. At 18 feet the river covers the\nWeston Lake overlook in the Congaree National Park. Between 18 and\n18.5 feet the river begins to cover sections of the elevated\nboardwalk.\n* Flood History...This crest compares to a previous crest of 16.3\nfeet on 12/03/2020.\n&amp;&amp;"</span>,
        <span class="hljs-attr">"instruction"</span>:<span class="hljs-string">"A Flood Warning means that flooding is imminent or occurring. All\ninterested parties should take necessary precautions immediately.\nMotorists should not attempt to drive around barricades or drive\ncars through flooded areas.\nCaution is urged when walking near riverbanks.\nAdditional information is available at www.weather.gov.\nThe next statement will be issued Wednesday morning at 1000 AM EST."</span>
        }
    ]
}
                            </code>
                        </pre>
                    </section>
                    <section class="docs-section" id="intro-aqi">
                        <h2 class="section-heading">Air Quality Data</h2>

                        <p>
                            Air Quality data is returned in the <a href="#apis-forecast">Forecast API</a> and <a href="#apis-realtime">Realtime API</a> response. Depending upon your subscription plan we provide current and 3 day air quality data for the given location in json and xml.
                        </p>

                        <p>
                            It provides air quality index (see below) data on major pollutant gases like Carbon monoxide (CO), Ozone (O3), Nitrogen dioxide (NO2), Sulphur dioxide (SO2), PM 2.5 and PM 10.
                        </p>

                        <p>
                            By default air quality data is not returned. To get air quality data back in the response from <a href="#apis-forecast">Forecast API</a> and <a href="#apis-realtime">Realtime API</a>, pass the parameter <b>aqi=yes</b>.
                        </p>

                        <div class="table-responsive">
                            <table class="table table-bordered table-correct">
                                <tbody><tr>
                                    <th>Field</th>
                                    <th class="new-width">Data Type</th>
                                    <th>Description</th>
                                </tr>
                                <tr>
                                    <td>co</td>
                                    <td>float</td>
                                    <td>Carbon Monoxide (μg/m3)</td>
                                </tr>
                                <tr>
                                    <td>o3</td>
                                    <td>float</td>
                                    <td>Ozone (μg/m3)</td>
                                </tr>
                                
                                <tr>
                                    <td>no2</td>
                                    <td>float</td>
                                    <td>Nitrogen dioxide (μg/m3)</td>
                                </tr>
                                <tr>
                                    <td>so2</td>
                                    <td>float</td>
                                    <td>Sulphur dioxide (μg/m3)</td>
                                </tr>
                                
                                <tr>
                                    <td>pm2_5</td>
                                    <td>float</td>
                                    <td>PM2.5 (μg/m3)</td>
                                </tr>
                                <tr>
                                    <td>pm10</td>
                                    <td>float</td>
                                    <td>PM10 (μg/m3)</td>
                                </tr>
                                <tr>
                                    <td>us-epa-index</td>
                                    <td>integer</td>
                                    <td>US - EPA standard.
                                        <ul>
                                            <li>1 means Good</li>
                                            <li>2 means Moderate</li>
                                            <li>3 means Unhealthy for sensitive group</li>
                                            <li>4 means Unhealthy</li>
                                            <li>5 means Very Unhealthy</li>
                                            <li>6 means Hazardous</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>gb-defra-index</td>
                                    <td>integer</td>
                                    <td>UK Defra Index (See table below)
                                    </td>
                                </tr>
                            </tbody></table>

                            <p>
                            </p>
                            <h4>UK DEFRA INDEX Table</h4>
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Index</th>
                                        <th>1</th>
                                        <th>2</th>
                                        <th>3</th>
                                        <th>4</th>
                                        <th>5</th>
                                        <th>6</th>
                                        <th>7</th>
                                        <th>8</th>
                                        <th>9</th>
                                        <th>10</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Band</th>
                                        <td class="bg_low1">Low</td>
                                        <td class="bg_low2">Low</td>
                                        <td class="bg_low3">Low</td>
                                        <td class="bg_moderate4">Moderate</td>
                                        <td class="bg_moderate5">Moderate</td>
                                        <td class="bg_moderate6">Moderate</td>
                                        <td class="bg_high7">High</td>
                                        <td class="bg_high8">High</td>
                                        <td class="bg_high9">High</td>
                                        <td class="bg_very_high10">Very High</td>
                                    </tr>
                                    <tr>
                                        <th>µgm<sup>-3</sup></th>
                                        <td class="bg_low1">0-11</td>
                                        <td class="bg_low2">12-23</td>
                                        <td class="bg_low3">24-35</td>
                                        <td class="bg_moderate4">36-41</td>
                                        <td class="bg_moderate5">42-47</td>
                                        <td class="bg_moderate6">48-53</td>
                                        <td class="bg_high7">54-58</td>
                                        <td class="bg_high8">59-64</td>
                                        <td class="bg_high9">65-70</td>
                                        <td class="bg_very_high10">71 or more</td>
                                    </tr>
                                </tbody>
                            </table>
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

function guten_weather_print_scripts() { ?>
	<script type="text/javascript">
		var weather_api_key = <?php echo json_encode(esc_attr( get_option('weather_api_key') )); ?>;
        var plugin_path = <?php echo json_encode(plugin_dir_url( __FILE__ )); ?>;
	</script>
	<?php
}
add_action('wp_print_scripts', 'guten_weather_print_scripts');
