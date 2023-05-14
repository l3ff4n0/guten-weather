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

	const { attributes: { city, weatherType, numberDays, airQuality, weatherAlert, languageData, layoutModel, WeatherTpl }, setAttributes } = props;

	const onChangeCity = ( newCityName ) => {
		setAttributes( { city: newCityName } );

	};

	const onChangeWeatherType = ( newweatherType ) => {
		setAttributes( { weatherType: newweatherType } );
	};

	const onChangeNumberDays = ( newDay ) => {
		setAttributes( { numberDays: newDay } );
	};

	const onChangeAirQuality = ( newAirQuality ) => {
		setAttributes( { airQuality: newAirQuality } );
	};

	const onChangeWeatherAlert = ( newWeatherAlert ) => {
		setAttributes( { weatherAlert: newWeatherAlert } );
	};

	const onChangeLanguageData = ( newLanguageData ) => {
		setAttributes( { languageData: newLanguageData } );
	};

	const onChangeLayoutModel = ( newLayoutModel ) => {
		setAttributes( { layoutModel: newLayoutModel } );
	};

	const weather_api = 'http://api.weatherapi.com/v1/forecast.json?';

	let weather_endpoint,
	apiKey,
	cityName = "&q=",
	airQualityData = "&aqi=" + airQuality,
	WeatherAlertData = "&alerts=" + weatherAlert,
	days= "&days=" + numberDays,
	language;

	if(weather_api_key != ''){
		apiKey = 'key=' + weather_api_key; 
	}

	if(city !== 'select your city'){
		cityName = "&q=" + city;
	}

	if(languageData !== 'select your language' && languageData !== undefined){
		language = "&lang=" + languageData;
	}

	(weatherType === 'forecast') ? weather_endpoint = weather_api + apiKey + cityName + days + airQualityData + WeatherAlertData + language : weather_endpoint = weather_api + apiKey + cityName + airQualityData + language;

	if(weather_api_key != '' && city !== 'select your city'){
		fetch(weather_endpoint).then(response => response.json()).then(data => {
			let weather_code,
			weather_icon,
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
			weather_loc_pressure,
			weather_loc_air_quality;

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
			weather_loc_air_quality = data.current.air_quality;

			props.attributes.WeatherTpl = '<div class="weather-icon icon-' + weather_code + '">';
			props.attributes.WeatherTpl += '<div class="weather-temperature">' + weather_loc_temperature + '°' + '</div>';
			props.attributes.WeatherTpl += '<img src="' + weather_icon + '" alt="' + weather_text + '" />';
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

			if(typeof weather_loc_air_quality !== 'undefined'){
				let us_epa_index = __( 'means Good', 'guten-weather' );

				switch (weather_loc_air_quality['us-epa-index']) {
				case 2:
					us_epa_index = __( 'means Moderate', 'guten-weather' )
					break;
				case 3:
					us_epa_index = __( 'means Unhealthy for sensitive group', 'guten-weather' );
					break;
				case 4:
					us_epa_index = __( 'means Unhealthy', 'guten-weather' );
					break;
				case 5:
					us_epa_index = __( 'means Very Unhealthy', 'guten-weather' );
					break;
				case 6:
					us_epa_index = __( 'means Hazardous', 'guten-weather' );
					break;		
				default:
					us_epa_index;
				}

				let gb_defra_index = __( 'Low', 'guten-weather' );

				switch (weather_loc_air_quality['gb-defra-index	']) {
				case 2:
				case 3:
					gb_defra_index;
					break;
				case 4:
				case 5:
				case 6:
					gb_defra_index = __( 'Moderate', 'guten-weather' );
					break;
				case 7:
				case 8:
				case 9:
					gb_defra_index = __( 'High', 'guten-weather' );
					break;
				case 10:
					gb_defra_index = __( 'Very high', 'guten-weather' );
					break;				
				default:
					gb_defra_index;
				}


				props.attributes.WeatherTpl += '<div class="weather-air-quality-container">';
				props.attributes.WeatherTpl += '<div class="weather-air-quality-main-title">'+ __( 'Air quality', 'guten-weather' )+'</div>';
				props.attributes.WeatherTpl += '<div class="weather-carbon-monoxide"><span class="weather-label">'+ __( 'Carbon monoxide', 'guten-weather' )+'</span>'+ weather_loc_air_quality.co + ' µg/m³' +'</div>';
				props.attributes.WeatherTpl += '<div class="weather-uk-defra-index"><span class="weather-label">'+ __( 'UK Defra Index', 'guten-weather' )+'</span>'+ gb_defra_index +'</div>';
				props.attributes.WeatherTpl += '<div class="weather-nitrogen-dioxide"><span class="weather-label">'+ __( 'Nitrogen dioxide', 'guten-weather' )+'</span>'+ weather_loc_air_quality.no2 + ' µg/m³' +'</div>';
				props.attributes.WeatherTpl += '<div class="weather-ozone"><span class="weather-label">'+ __( 'Ozone', 'guten-weather' )+'</span>'+ weather_loc_air_quality.o3 + ' µg/m³' +'</div>';
				props.attributes.WeatherTpl += '<div class="weather-pm2-5"><span class="weather-label">'+ __( 'PM2.5', 'guten-weather' )+'</span>'+ weather_loc_air_quality.pm2_5 + ' µg/m³' +'</div>';
				props.attributes.WeatherTpl += '<div class="weather-pm10"><span class="weather-label">'+ __( 'PM10', 'guten-weather' )+'</span>'+ weather_loc_air_quality.pm10 + ' µg/m³' +'</div>';
				props.attributes.WeatherTpl += '<div class="weather-sulphur-dioxide"><span class="weather-label">'+ __( 'Sulphur dioxide', 'guten-weather' )+'</span>'+ weather_loc_air_quality.so2 + ' µg/m³' +'</div>';
				props.attributes.WeatherTpl += '<div class="weather-us-epa-index"><span class="weather-label">'+ __( 'US - EPA index', 'guten-weather' )+'</span>'+ us_epa_index +'</div>';
				props.attributes.WeatherTpl += '</div>';
			}								

			if(weatherType === 'forecast'){
				const weather_forecast = data.forecast.forecastday;
			
				if(weather_forecast.length > 0){
					props.attributes.WeatherTpl += '<div class="weather-forecast-container">';
					weather_forecast.map(function(key, value){
						const astro_data = key.astro,
							day_data = key.day,
							hour_data = key.hour;	
						
							props.attributes.WeatherTpl += '<div id="weather-forecast-day-'+ value +'" class="weather-forecast-container">';
							props.attributes.WeatherTpl += '<div class="weather-astro-container">';
							props.attributes.WeatherTpl += '<div class="astro-phase">' + astro_data.moon_phase + '</div>';
							props.attributes.WeatherTpl += '<div class="astro-moonrise">' + astro_data.moonrise + '</div>';
							props.attributes.WeatherTpl += '<div class="astro-moonset">' + astro_data.moonset + '</div>';
							props.attributes.WeatherTpl += '<div class="astro-sunrise">' + astro_data.sunrise + '</div>';
							props.attributes.WeatherTpl += '<div class="astro-sunset">' + astro_data.sunset + '</div>';
							props.attributes.WeatherTpl += '</div>';
							props.attributes.WeatherTpl += '<div class="weather-day-container">';
							props.attributes.WeatherTpl += '<div class="weather-day-condition"><div weather-icon icon-'+ day_data.condition.code +'"><img src="'+ day_data.condition.icon +'" alt="'+ day_data.condition.text +
							'" /><div class="weather-text">'+ day_data.condition.text +
							'</div></div></div>';
							props.attributes.WeatherTpl += '</div>';
							props.attributes.WeatherTpl += '<div class="weather-hour-container">';
							hour_data.map(function(hour_key, hour_value){
								const hour_condition = hour_key.condition;
								props.attributes.WeatherTpl += '<div id="weather-forecast-hour-'+ hour_value +'" class="weather-hour-content">';
								props.attributes.WeatherTpl += '<div class="weather-hour-condition"><div weather-icon icon-'+ hour_condition.code +'"><img src="'+ hour_condition.icon +'" alt="'+ hour_condition.text +
							'" /><div class="weather-text">'+ hour_condition.text +
							'</div></div></div>';
								props.attributes.WeatherTpl += '<div clss="weather-hour-depoint">'+ hour_key.dewpoint_f + '</div>';
								props.attributes.WeatherTpl += '<div clss="weather-hour-humidity">'+ hour_key.humidity + '</div>';
								props.attributes.WeatherTpl += '<div clss="weather-hour-precip_mm">'+ hour_key.precip_mm + '</div>';
								props.attributes.WeatherTpl += '<div clss="weather-hour-temp_f">'+ hour_key.temp_f + '</div>';
								props.attributes.WeatherTpl += '<div clss="weather-hour-time">'+ hour_key.time + '</div>';
								props.attributes.WeatherTpl += '<div clss="weather-hour-wind-content">';
								props.attributes.WeatherTpl += '<div clss="weather-hour-wind-degree">'+ hour_key.wind_degree +'</div>';
								props.attributes.WeatherTpl += '<div clss="weather-hour-wind-dir">'+ hour_key.wind_dir +'</div>';
								props.attributes.WeatherTpl += '<div clss="weather-hour-wind-kph">'+ hour_key.wind_kph +'</div>';
								props.attributes.WeatherTpl += '<div clss="weather-hour-wind-mph">'+ hour_key.wind_mph +'</div>';
								props.attributes.WeatherTpl += '<div clss="weather-hour-windchill_c">'+ hour_key.windchill_c +'</div>';
								props.attributes.WeatherTpl += '<div clss="weather-hour-windchill_f">'+ hour_key.windchill_f +'</div>';
								props.attributes.WeatherTpl += '</div>';
								props.attributes.WeatherTpl += '</div>';
							});
							props.attributes.WeatherTpl += '</div>';
							props.attributes.WeatherTpl += '</div>';
					});
					props.attributes.WeatherTpl += '</div>';
				}
			}
		}
		).catch(error => {
			console.log('error >>>',error);
		});
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
					{ __( 'Air quality data', 'guten-weather' ) }
				</legend>
				<SelectControl
					label="Enable the air quality data"
					value={ airQuality }
					options={
						[
							{ label: 'No', value: 'no' },
							{ label: 'Yes', value: 'yes' },
						] }
					onChange={ onChangeAirQuality }
				/>
			</fieldset>
			<fieldset>
				<legend className="blocks-base-control__label">
					{ __( 'Weather alert data', 'guten-weather' ) }
				</legend>
				<SelectControl
					label="Enable the weather alert data"
					value={ weatherAlert }
					options={
						[
							{ label: 'No', value: 'no' },
							{ label: 'Yes', value: 'yes' },
						] }
					onChange={ onChangeWeatherAlert }
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
