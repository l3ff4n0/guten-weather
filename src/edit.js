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
import { Panel, PanelBody, SelectControl } from '@wordpress/components';
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

	const { attributes: { country, city, weatherType, numberDays, airQuality, weatherAlert, languageData }, setAttributes } = props;

	const onChangeCountry = ( newCountryName ) => {
		setAttributes( { country: newCountryName } );
		fetch(world_cities).then(response => response.json()).then(data => {
			all_cities = data[newCountryName];
			if(newCountryName != 'select your country') {
				all_cities_options.length = 1;
				for (let index = 0; index < all_cities.length; index++) {
					all_cities_options.push({label: all_cities[index], value: all_cities[index]} );
				};
			}
		});
	};

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

	function getWeather() {
		fetch(weather_api).then(response => response.json()).then(data => {
			if(document.getElementsByClassName('widget-weather-container')[0]){
				var tpl = '<div class="condition"><div class="text">'+ data.current.condition.text +'</div><img src="'+ data.current.condition.icon +'"></div><div class="temp">'+ data.current.temp_c +'&deg;</div><div class="feels-like">Feels like '+ data.current.feelslike_c +'&deg;</div><div class="wind">Wind '+ data.current.wind_kph +' km/h</div><div class="humidity">Humidity '+ data.current.humidity +'%</div><div class="visibility">Visibility '+ data.current.vis_km +' km</div><div class="pressure">Pressure '+ data.current.pressure_mb +' mb</div><div class="precipitation">Precipitation '+ data.current.precip_mm +' mm</div><div class="clouds">Clouds '+ data.current.cloud +'%</div><div class="last-update">Last update '+ data.current.last_updated +'</div>' + '<div class="location">'+ data.location.name +'</div>';
				document.getElementsByClassName('widget-weather-container')[0].innerHTML = tpl;
			}
		}).catch(error => {
			console.log('My Errorrrr',error);
		});
	}

	if(weather_api_key != '' && city !== 'select your city'){
		getWeather();
	}
	
	return (
		<div{ ...useBlockProps() }>
		<InspectorControls key="setting">
			<PanelBody title={ __( 'Guten weather settings', 'guten-weather' ) }>
			<fieldset>
				<legend className="blocks-base-control__label">
					{ __( 'Country', 'guten-weather' ) }
				</legend>
				<SelectControl
					label="Select your country"
					value={ country }
					options = {all_countries_options}
					onChange={ onChangeCountry }
				/>
			</fieldset>	
			<fieldset>
					<legend className="blocks-base-control__label">
						{ __( 'City', 'guten-weather' ) }
					</legend>
					<SelectControl
						label="Select your city"
            			value={ city }
						options = {all_cities_options}
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
			<div class="widget-weather-container"></div>
		</div>
		</div>
	);
}
