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

	const { attributes: { city, weatherType, numberDays, airQuality, weatherAlert, languageData, WeatherTpl }, setAttributes } = props;

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

	let weather_api,
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

	if(weatherType === 'forecast'){
		weather_api = "http://api.weatherapi.com/v1/forecast.json?"+ apiKey + cityName + days + airQualityData + WeatherAlertData + language;
	} else{
		weather_api = "http://api.weatherapi.com/v1/current.json?" + apiKey + cityName + airQualityData + language;
	}

	if(weather_api_key != '' && city !== 'select your city'){
		fetch(weather_api,{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => response.json()).then(data => {
			console.log('data >>>',data);
			let weather_code,
			weather_icon,
	 		weather_text,
	 		weather_loc_name,
			weather_loc_coordinates,
			weather_loc_localtime;

			weather_code = data.current.condition.code;
	 			weather_icon = data.current.condition.icon;
	 			weather_text = data.current.condition.text;
	 			weather_loc_name = data.location.name;
	 			weather_loc_coordinates = data.location.lat + "," + data.location.lon;
				weather_loc_localtime = data.location.localtime;

				props.attributes.WeatherTpl = '<div class="weather-icon icon-'+ weather_code +
	 											'"><img src="'+ weather_icon +'" alt="'+ weather_text +
	 											'" /></div><div class="weather-text">'+ weather_text +
	 											'</div><div class="weather-loc-name">'+ weather_loc_name +
	 											'</div><div class="weahter-loc-coords">'+ weather_loc_coordinates +
	 											'</div><div class="weather-loc-timezone">'+ weather_loc_localtime +'</div>';

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
								console.log('hour key >', hour_key);
								console.log('hour value >', hour_value);
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
   			</PanelBody>
		</InspectorControls>

		<div { ...useBlockProps() }>
			<div class="widget-weather-container" dangerouslySetInnerHTML={createWeatherContent()} />
		</div>
		</div>
	);
}
