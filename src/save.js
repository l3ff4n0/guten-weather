import domReady from '@wordpress/dom-ready';
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
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {
	const { attributes: {city, weatherType, numberDays, languageData,layoutModel, borderRadius, WidgetBgColor, WidgetColor, WeatherTpl}, setAttributes } = props;

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

	language = (languageData !== 'select your language') ? "&lang=" + languageData : "";

	if(weather_api_key == ''){
		props.attributes.WeatherTpl = __('Please create an API KEY and put it inside the Guten Weather settings plugin','guten-weather');
	} else {
		if(city == 'select your city'|| city == ''){
			props.attributes.WeatherTpl = __('Please add a Location to display the weather widget','guten-weather');
		} else{
			(weatherType === 'forecast') ? weather_endpoint = weather_api + apiKey + cityName + days + language : weather_endpoint = weather_api + apiKey + cityName + language;
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
					props.attributes.WeatherTpl += `<div class="weather-temperature">${weather_loc_temperature}°</div>
													<img loading="lazy" src="${weather_icon_url}" alt="${weather_text}" />
													</div>
													<div class="weather-text-content">
														<div class="weather-text">${weather_text}</div>
														<div class="weather-loc-name"><span class="weather-label">${__( 'Location', 'guten-weather')}</span>${weather_loc_name} - ${weather_loc_country}</div>
														<div class="weather-loc-coords"><span class="weather-label">${__( 'Coordinates', 'guten-weather')}</span>${weather_loc_coordinates}</div>
														<div class="weather-loc-feelslike"><span class="weather-label">${__( 'Feelslike', 'guten-weather')}</span>${weather_loc_feelslike}°</div>
														<div class="weather-loc-humidity"><span class="weather-label">${__( 'Humidity', 'guten-weather')}</span>${weather_loc_humidity}%</div>
														<div class="weather-loc-wind"><span class="weather-label">${__( 'Wind', 'guten-weather')}</span>${weather_loc_wind_kph} km/h - ${weather_loc_wind_direction}</div>
														<div class="weather-loc-pressure"><span class="weather-label">${__( 'Pressure', 'guten-weather')}</span>${weather_loc_pressure} mbar</div>
													</div>
													`;					
		
					if(weatherType === 'forecast'){
						const weather_forecast = data.forecast.forecastday;
					
						if(weather_forecast.length > 0){
							props.attributes.WeatherTpl += '<div class="weather-forecast-container">';
							weather_forecast.map(function(key, value){
								const day_data = key.day,
									hour_data = key.hour;
									
									matches = regex.exec(day_data.condition.icon);
									
									weather_icon_url  = (layoutModel === 'animated_icons') ? plugin_path + 'animated-icons/'+ matches[1] + '/'+ matches[2] + '.svg' : day_data.condition.icon;
		
									props.attributes.WeatherTpl += `<div id="weather-forecast-day-${value}" class="weather-forecast-day-container">
																		<div class="weather-forecast-day-main-title">${__( 'Date', 'guten-weather' )} ${key.date}</div>
																		<div class="weather-day-container">
																		<div class="weather-day-condition">
																			<div class="weather-icon icon-${day_data.condition.code}">
																			<img loading="lazy" src="${weather_icon_url}" alt="${day_data.condition.text}" />
																			</div>
																			<div class="weather-day-content">
																			<div class="weather-text">${day_data.condition.text}</div>
																			<div class="weather-mintemp_c"><span class="weather-label">${__( 'Min temperature', 'guten-weather' )}</span>${day_data.mintemp_c}°</div>
																			<div class="weather-maxtemp_c"><span class="weather-label">${__( 'Max temperature', 'guten-weather' )}</span>${day_data.maxtemp_c}°</div>
																			<div class="weather-mintemp_c"><span class="weather-label">${__( 'Humidity', 'guten-weather' )}</span>${day_data.avghumidity}%</div>
																			<div class="weather-maxtemp_c"><span class="weather-label">${__( 'Total precipitation', 'guten-weather' )}</span>${day_data.totalprecip_mm}mm</div>
																			</div>
																		</div>
																		</div>
																		<div class="weather-hour-wrapper">
																		<div class="swiper weather-hour-container">
																			<div class="swiper-wrapper">
																	`;
									hour_data.map(function(hour_key, hour_value){
										const hour_condition = hour_key.condition;
										const date = new Date(hour_key.time_epoch * 1000);
										var hours = (date.getHours()<= 9) ? "0" + date.getHours() : date.getHours();
										var minutes = "0" + date.getMinutes();
										var formattedTime = hours + ':' + minutes;
		
										matches = regex.exec(hour_condition.icon);
										weather_icon_url  = (layoutModel === 'animated_icons') ? plugin_path + 'animated-icons/'+ matches[1] + '/'+ matches[2] + '.svg' : hour_condition.icon;
		
										props.attributes.WeatherTpl += `<div id="weather-forecast-hour-${hour_value}" class="swiper-slide weather-hour-content">
																			<div class="weather-hour-depoint">${formattedTime}</div>
																			<div class="weather-hour-condition">
																			<div class="weather-icon icon-${hour_condition.code}">
																				<img loading="lazy" src="${weather_icon_url}" alt="${hour_condition.text}" />
																			</div>
																			</div>
																			<div class="weather-hour-humidity"><span class="weather-label">${__( 'Humidity', 'guten-weather' )}</span>${hour_key.humidity}%</div>
																			<div class="weather-hour-precip_mm"><span class="weather-label">${__( 'Rainfall', 'guten-weather' )}</span>${hour_key.precip_mm}mm</div>
																			<div class="weather-hour-temp_c"><span class="weather-label">${__( 'Temperature', 'guten-weather' )}</span>${hour_key.temp_c}°</div>
																			<div class="weather-hour-wind-content">
																			<div class="weather-hour-wind-degree"><span class="weather-label">${__( 'Wind degree', 'guten-weather' )}</span>${hour_key.wind_degree}°</div>
																			<div class="weather-hour-wind-dir"><span class="weather-label">${__( 'Wind direction', 'guten-weather' )}</span>${hour_key.wind_dir}</div>
																			<div class="weather-hour-wind-kph"><span class="weather-label">${__( 'Wind speed', 'guten-weather' )}</span>${hour_key.wind_kph}</div>
																			<div class="weather-hour-windchill_c"><span class="weather-label">${__( 'Wind chill', 'guten-weather' )}</span>${hour_key.windchill_c}°</div>
																			</div>
																		</div>`;
									});
									props.attributes.WeatherTpl += `</div>
																	<div class="swiper-button-prev"></div>
																	<div class="swiper-button-next"></div>
																	</div>
																	</div>
																	</div>
																	`;
							});
							props.attributes.WeatherTpl += '</div>';
						}
						domReady( function () {
							const swiper = new Swiper('.swiper', {
								slidesPerView: 3,
								navigation: {
									nextEl: '.swiper-button-next',
									prevEl: '.swiper-button-prev',
								},
							});
						} );
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
		<div { ...useBlockProps.save() }>
			<div className={"widget-weather-container"} style={{ background: WidgetBgColor, color: WidgetColor, borderRadius: borderRadius }} dangerouslySetInnerHTML={createWeatherContent()} />
		</div>
	);
}

