/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, SelectControl,TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

export default function Edit(props) {

	const { attributes: { city, weatherType, numberDays, languageData, layoutModel, WeatherTpl }, setAttributes } = props;

	const onChangeCity = ( newCityName ) => {
		setAttributes( { city: newCityName } );

	};

	const onChangeWeatherType = ( newweatherType ) => {
		setAttributes( { weatherType: newweatherType } );
	};

	const onChangeNumberDays = ( newDay ) => {
		setAttributes( { numberDays: newDay } );
	};

	const onChangeLanguageData = ( newLanguageData ) => {
		setAttributes( { languageData: newLanguageData } );
	};

	const onChangeLayoutModel = ( newLayoutModel ) => {
		setAttributes( { layoutModel: newLayoutModel } );
	};

	const weather_api = 'http://api.weatherapi.com/v1/'+ weatherType +'.json?';

	const regex = /\/(\w+)\/(\w+)\.(\w+)$/;

	let weather_endpoint,
	apiKey,
	cityName = "&q=",
	days= "&days=" + numberDays,
	language;

	if(weather_api_key != ''){
		apiKey = 'key=' + weather_api_key; 
	}

	if(city !== 'select your city'){
		cityName = "&q=" + city;
	}

	if(languageData !== 'select your language' && languageData !== 'undefined'){
		language = "&lang=" + languageData;
	}

	if(weather_api_key == ''){
		props.attributes.WeatherTpl = __('Please create an API KEY and put it inside the Guten Weather settings plugin','guten-weather');
	} else {
		if(city == 'select your city'|| city == ''){
			props.attributes.WeatherTpl = __('Please add a Location to display the weather widget','guten-weather');
		} else{
			(weatherType === 'forecast') ? weather_endpoint = weather_api + apiKey + cityName + days + language : weather_endpoint = weather_api + apiKey + cityName + language;
				console.log('Weather endpoint',weather_endpoint);
				fetch(weather_endpoint).then(response => response.json()).then(data => {
					let weather_code,
					weather_icon,
					weather_icon_url,
					weather_text,
					weather_loc_temperature,
					 weather_loc_name,
					weather_loc_country,
					weather_loc_coordinates,
					weather_loc_localtime,
					weather_loc_feelslike,
					weather_loc_humidity,
					weather_loc_wind_direction,
					weather_loc_wind_kph,
					weather_loc_pressure;
		
					weather_code = data.current.condition.code;
					weather_icon = data.current.condition.icon;
					weather_text = data.current.condition.text;
					weather_loc_temperature = data.current.temp_c;
					weather_loc_name = data.location.name;
					weather_loc_country = data.location.country;
					weather_loc_coordinates = data.location.lat + "," + data.location.lon;
					weather_loc_localtime = data.location.localtime;
					weather_loc_feelslike = data.current.feelslike_c;
					weather_loc_humidity = data.current.humidity;
					weather_loc_wind_direction = data.current.wind_dir;
					weather_loc_wind_kph = data.current.wind_kph;
					weather_loc_pressure = data.current.pressure_mb;
		
					let matches = regex.exec(weather_icon);
		
					weather_icon_url  = (layoutModel === 'animated_icons') ? plugin_path + 'animated-icons/'+ matches[1] + '/'+ matches[2] + '.svg' : weather_icon;
		
					props.attributes.WeatherTpl = '<div class="weather-icon icon-' + weather_code + '">';
					props.attributes.WeatherTpl += '<div class="weather-temperature">' + weather_loc_temperature + '°' + '</div>';
					props.attributes.WeatherTpl +=  '<img loading="lazy" src="' + weather_icon_url + '" alt="' + weather_text + '" />';
					props.attributes.WeatherTpl += '</div>';
					props.attributes.WeatherTpl += '<div class="weather-text-content">';
					props.attributes.WeatherTpl += '<div class="weather-text">' + weather_text +'</div>';
					props.attributes.WeatherTpl += '<div class="weather-loc-name"><span class="weather-label">' + __( 'Location', 'guten-weather' ) + '</span>' + weather_loc_name + ' - ' + weather_loc_country +'</div>';
					props.attributes.WeatherTpl += '<div class="weather-loc-coords"><span class="weather-label">' + __( 'Coordinates', 'guten-weather' ) + '</span>' + weather_loc_coordinates +'</div>';
					props.attributes.WeatherTpl += '<div class="weather-loc-feelslike"><span class="weather-label">' + __( 'Feelslike', 'guten-weather' ) + '</span>'+ weather_loc_feelslike + '°' + '</div>';
					props.attributes.WeatherTpl += '<div class="weather-loc-humidity"><span class="weather-label">' + __( 'Humidity', 'guten-weather' ) + '</span>' + weather_loc_humidity + '%' + '</div>';
					props.attributes.WeatherTpl += '<div class="weather-loc-wind"><span class="weather-label">' + __( 'Wind', 'guten-weather' ) + '</span>' + weather_loc_wind_kph + ' km/h' + ' - ' + weather_loc_wind_direction + '</div>';
					props.attributes.WeatherTpl += '<div class="weather-loc-pressure"><span class="weather-label">' + __( 'Pressure', 'guten-weather' ) + '</span>' + weather_loc_pressure + ' mbar' + '</div>';
					props.attributes.WeatherTpl += '</div>';							
		
					if(weatherType === 'forecast'){
						const weather_forecast = data.forecast.forecastday;
					
						if(weather_forecast.length > 0){
							props.attributes.WeatherTpl += '<div class="weather-forecast-container">';
							weather_forecast.map(function(key, value){
								const day_data = key.day,
									hour_data = key.hour;
									
									matches = regex.exec(day_data.condition.icon);
									
									weather_icon_url  = (layoutModel === 'animated_icons') ? plugin_path + 'animated-icons/'+ matches[1] + '/'+ matches[2] + '.svg' : day_data.condition.icon;
		
									props.attributes.WeatherTpl += '<div id="weather-forecast-day-'+ value +'" class="weather-forecast-day-container">';
									props.attributes.WeatherTpl += '<div class="weather-forecast-day-main-title">' + __( 'Date', 'guten-weather' ) + ' ' + key.date + '</div>';
									props.attributes.WeatherTpl += '<div class="weather-day-container">';
									props.attributes.WeatherTpl += '<div class="weather-day-condition">';
									props.attributes.WeatherTpl += '<div class="weather-icon icon-'+ day_data.condition.code +'">';
									props.attributes.WeatherTpl += '<img loading="lazy" src="'+ weather_icon_url +'" alt="'+ day_data.condition.text +'" />';
									props.attributes.WeatherTpl += '</div>';
									props.attributes.WeatherTpl += '<div class="weather-day-content">';
									props.attributes.WeatherTpl += '<div class="weather-text">'+ day_data.condition.text +'</div>';
									props.attributes.WeatherTpl += '<div class="weather-mintemp_c"><span class="weather-label">'+ __( 'Min temperature', 'guten-weather' ) + '</span>' +  day_data.mintemp_c + '°' + '</div>';
									props.attributes.WeatherTpl += '<div class="weather-maxtemp_c"><span class="weather-label">'+ __( 'Max temperature', 'guten-weather' ) + '</span>' +  day_data.maxtemp_c + '°' + '</div>';
									props.attributes.WeatherTpl += '<div class="weather-mintemp_c"><span class="weather-label">'+ __( 'Humidity', 'guten-weather' ) + '</span>' + day_data.avghumidity + '%' + '</div>';
									props.attributes.WeatherTpl += '<div class="weather-maxtemp_c"><span class="weather-label">'+ __( 'Total precipitation', 'guten-weather' ) + '</span>' + day_data.totalprecip_mm + 'mm' + '</div>';
									props.attributes.WeatherTpl += '</div>';
									props.attributes.WeatherTpl += '</div>';
									props.attributes.WeatherTpl += '</div>';
									props.attributes.WeatherTpl += '<div class="weather-hour-wrapper">';
									props.attributes.WeatherTpl += '<div class="swiper weather-hour-container">';
									props.attributes.WeatherTpl += '<div class="swiper-wrapper">';
									hour_data.map(function(hour_key, hour_value){
										const hour_condition = hour_key.condition;
										const date = new Date(hour_key.time_epoch * 1000);
										var hours = (date.getHours()<= 9) ? "0" + date.getHours() : date.getHours();
										var minutes = "0" + date.getMinutes();
										var formattedTime = hours + ':' + minutes;
		
										matches = regex.exec(hour_condition.icon);
										weather_icon_url  = (layoutModel === 'animated_icons') ? plugin_path + 'animated-icons/'+ matches[1] + '/'+ matches[2] + '.svg' : hour_condition.icon;
		
										props.attributes.WeatherTpl += '<div id="weather-forecast-hour-'+ hour_value +'" class="swiper-slide weather-hour-content">';
										props.attributes.WeatherTpl += '<div clss="weather-hour-depoint">'+ formattedTime + '</div>';
										props.attributes.WeatherTpl += '<div class="weather-hour-condition"><div class="weather-icon icon-'+ hour_condition.code +'"><img loading="lazy" src="'+ weather_icon_url +'" alt="'+ hour_condition.text +
									'" /></div></div>';
										props.attributes.WeatherTpl += '<div clss="weather-hour-humidity"><span class="weather-label">'+ __( 'Humidity', 'guten-weather' ) + '</span>' + hour_key.humidity + '%' + '</div>';
										props.attributes.WeatherTpl += '<div clss="weather-hour-precip_mm"><span class="weather-label">'+ __( 'Rainfall', 'guten-weather' ) + '</span>' + hour_key.precip_mm + 'mm' + '</div>';
										props.attributes.WeatherTpl += '<div clss="weather-hour-temp_c"><span class="weather-label">'+ __( 'Temperature', 'guten-weather' ) + '</span>' + hour_key.temp_c + '°' + '</div>';
										props.attributes.WeatherTpl += '<div clss="weather-hour-wind-content">';
										props.attributes.WeatherTpl += '<div clss="weather-hour-wind-degree"><span class="weather-label">'+ __( 'Wind degree', 'guten-weather' ) + '</span>' + hour_key.wind_degree + '°' +'</div>';
										props.attributes.WeatherTpl += '<div clss="weather-hour-wind-dir"><span class="weather-label">'+ __( 'Wind direction', 'guten-weather' ) + '</span>' + hour_key.wind_dir +'</div>';
										props.attributes.WeatherTpl += '<div clss="weather-hour-wind-kph"><span class="weather-label">'+ __( 'Wind speed', 'guten-weather' ) + '</span>' + hour_key.wind_kph +'</div>';
										props.attributes.WeatherTpl += '<div clss="weather-hour-windchill_c"><span class="weather-label">'+ __( 'Wind chill', 'guten-weather' ) + '</span>' + hour_key.windchill_c + '°' +'</div>';
										props.attributes.WeatherTpl += '</div>';
										props.attributes.WeatherTpl += '</div>';
									});
									props.attributes.WeatherTpl += '</div>';
									props.attributes.WeatherTpl += '<div class="swiper-button-prev"></div>';
									props.attributes.WeatherTpl += '<div class="swiper-button-next"></div>';
									props.attributes.WeatherTpl += '</div>';
									props.attributes.WeatherTpl += '</div>';
									props.attributes.WeatherTpl += '</div>';
							});
							props.attributes.WeatherTpl += '</div>';
						}
						jQuery(document).ready(function ($) {
							const swiper = new Swiper('.swiper', {
								//loop: true,
								slidesPerView: 3,
								navigation: {
									nextEl: '.swiper-button-next',
									prevEl: '.swiper-button-prev',
								},
							});
						});
					}
				}
				).catch(error => {
					console.log('error >>>',error);
				});
		}
		
	}
	
	

	function createWeatherContent() {
		return {__html: props.attributes.WeatherTpl};
	}
	
	return (
		<div{ ...useBlockProps() }>
		<InspectorControls key="setting">
			<PanelBody title={ __( 'Guten weather settings', 'guten-weather' ) }>	
			<fieldset>
				<legend className="blocks-base-control__label">
					{ __( 'City', 'guten-weather' ) }
				</legend>
				<TextControl
					label="Write the name of your city"
					value={ city }
					onChange={ onChangeCity }
				/>
			</fieldset>
			<fieldset>
				<legend className="blocks-base-control__label">
					{ __( 'Weather type', 'guten-weather' ) }
				</legend>
				<SelectControl
					label="Select the weather type"
					value={ weatherType }
					options={
						[
							{ label: 'Current', value: 'current' },
							{ label: 'Forecast', value: 'forecast' },
						] }
					onChange={ onChangeWeatherType }

				/>
			</fieldset>
			<fieldset>
				<legend className="blocks-base-control__label">
					{ __( 'Number of days of weather forecast', 'guten-weather' ) }
				</legend>
				<SelectControl
					label=" Select the number of days"
					value={ numberDays }
					options={
						[
							{ label: '1', value: '1' },
							{ label: '2', value: '2' },
							{ label: '3', value: '3' },
							{ label: '4', value: '4' },
							{ label: '5', value: '5' },
							{ label: '6', value: '6' },
							{ label: '7', value: '7' },
							{ label: '8', value: '8' },
							{ label: '9', value: '9' },
							{ label: '10', value: '10' },
						] }
					onChange={ onChangeNumberDays }
				/>
			</fieldset>
			<fieldset>
				<legend className="blocks-base-control__label">
					{ __( 'Language data', 'guten-weather' ) }
				</legend>
				<SelectControl
					label="Choose the language"
					value={ languageData }
					options={
						[
							{ label: 'Select your language', value: 'select your language' },
							{ label: 'Arabic', value: 'ar' },
							{ label: 'Bengali', value: 'bn' },
							{ label: 'Bulgarian', value: 'bg' },
							{ label: 'Chinese Simplified', value: 'zh' },
							{ label: 'Chinese Traditional', value: 'zh_tw' },
							{ label: 'Czech', value: 'cs' },
							{ label: 'Danish', value: 'da' },
							{ label: 'Dutch', value: 'nl' },
							{ label: 'Finnish', value: 'fi' },
							{ label: 'French', value: 'fr' },
							{ label: 'German', value: 'de' },
							{ label: 'Greek', value: 'el' },
							{ label: 'Hindi', value: 'hi' },
							{ label: 'Hungarian', value: 'hu' },
							{ label: 'Italian', value: 'it' },
							{ label: 'Japanese', value: 'ja' },
							{ label: 'Javanese', value: 'jv' },
							{ label: 'Korean', value: 'ko' },
							{ label: 'Mandarin', value: 'zh_cmn' },
							{ label: 'Marathi', value: 'mr' },
							{ label: 'Polish', value: 'pl' },
							{ label: 'Portuguese', value: 'pt' },
							{ label: 'Punjabi', value: 'pa' },
							{ label: 'Romanian', value: 'ro' },
							{ label: 'Russian', value: 'ru' },
							{ label: 'Serbian', value: 'sr' },
							{ label: 'Sinhalese', value: 'si' },
							{ label: 'Slovak', value: 'sk' },
							{ label: 'Spanish', value: 'es' },
							{ label: 'Swedish', value: 'sv' },
							{ label: 'Tamil', value: 'ta' },
							{ label: 'Telugu', value: 'te' },
							{ label: 'Turkish', value: 'tr' },
							{ label: 'Ukrainian', value: 'uk' },
							{ label: 'Urdu', value: 'ur' },
							{ label: 'Vietnamese', value: 'vi' },
							{ label: 'Wu (Shanghainese)', value: 'zh_wuu' },
							{ label: 'Xiang', value: 'zh_hsn' },
							{ label: 'Yue (Cantonese)', value: 'zh_yue' },
							{ label: 'Zulu', value: 'zu' },
						] }
					onChange={ onChangeLanguageData }
				/>
			</fieldset>
			<fieldset>
				<legend className="blocks-base-control__label">
						{ __( 'Layout weather', 'guten-weather' ) }
				</legend>
				<SelectControl
					label="Choose your layout"
					value={layoutModel}
					options={
						[
							{ label: 'Select your layout', value: 'select_your_layout', },
							{ label: 'Light', value: 'light', },
							{ label: 'Dark', value: 'dark', },
							{ label: 'Animated icons', value: 'animated_icons', },
						]
					}
					onChange={onChangeLayoutModel}
					 />
			</fieldset>
   			</PanelBody>
		</InspectorControls>

		<div { ...useBlockProps() }>
			<div className={"widget-weather-container layout--" + layoutModel} dangerouslySetInnerHTML={createWeatherContent()} />
		</div>
		</div>
	);
}
