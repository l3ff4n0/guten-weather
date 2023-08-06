<?php
    $weather_api_key = get_option('weather_api_key');
    $weather_endpoint = '';
    $weatherWidget = '';

    if(empty($weather_api_key)){
        $content = __('Please create an API KEY and put it inside the Guten Weather settings plugin','guten-weather');
    } else {
        if($attributes['city'] == 'select your city' || empty($attributes['city'])){
            $content = __('Please add a Location to display the weather widget','guten-weather');
        } else{
            $weather_api = 'http://api.weatherapi.com/v1/' . $attributes['weatherType'] . '.json';
            $weather_params = [
            'key' => $weather_api_key,
            'q' => $attributes['city'],
            ];

            if ($attributes['weatherType'] === 'forecast' && isset($attributes['numberDays'])) {
            $weather_params['days'] = $attributes['numberDays'];
            }

            if ($attributes['languageData'] !== 'select your language') {
            $weather_params['lang'] = $attributes['languageData'];
            }

            $weather_endpoint = $weather_api . '?' . http_build_query($weather_params);

            $curl = curl_init();
            curl_setopt_array($curl, [
            CURLOPT_URL => $weather_endpoint,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 10,
            ]);

            $response = curl_exec($curl);

            if ($response === false) {

            $error = curl_error($curl);
            
            $weather_data = ['error' => $error];

            } else{
                $weather_data = json_decode($response, true);

                if(is_array($weather_data)){
                    if($weather_data['location']['name'] == 'Select'){
                        $content = __('Please add a Location to display the weather widget','guten-weather');
                    } else {
                        $weather_code = $weather_data['current']['condition']['code'];
                        $weather_icon = $weather_data['current']['condition']['icon'];
                        $weather_animated_icon = explode('/',$weather_icon);
                        $weather_animated_icon = array_slice($weather_animated_icon, -2);
                        $weather_icon_url  = ($attributes['layoutModel'] === 'animated_icons') ? plugin_dir_url( __FILE__ ) . 'animated-icons/'. $weather_animated_icon[0] . '/'. str_replace('.png','.svg',$weather_animated_icon[1]) : $weather_icon;

                        $weather_text = $weather_data['current']['condition']['text'];
                        $weather_loc_temp_c = $weather_data['current']['temp_c'];
                        $weather_loc_name = $weather_data['location']['name'];
                        $weather_loc_country = $weather_data['location']['country'];
                        $weather_loc_coordinates = $weather_data['location']['lat'].','.$weather_data['location']['lon'];
                        $weather_loc_localtime = $weather_data['location']['localtime'];
                        $weather_loc_feelslike = $weather_data['current']['feelslike_c'];
                        $weather_loc_humidity = $weather_data['current']['humidity'];
                        $weather_loc_wind_direction = $weather_data['current']['wind_dir'];
                        $weather_loc_wind_kph = $weather_data['current']['wind_kph'];
                        $weather_loc_pressure = $weather_data['current']['pressure_mb'];

                        $borderRadius = ( $attributes['borderRadius'] != 0) ?  $attributes['borderRadius'] .'px' : 0;

                        $content = '<div class="widget-weather-container"  style="background:' . $attributes['WidgetBgColor'] . '; color: ' . $attributes['WidgetColor'] .'; border-radius:' . $borderRadius .'">';

                        $content .= '<div class="weather-icon icon-' . $weather_code . '">
                                        <div class="weather-temperature">'.$weather_loc_temp_c .'°</div>
                                            <img loading="lazy" src="'. $weather_icon_url .'" alt="'. $weather_text .'" />
                                        </div>
                                        <div class="weather-text-content">
                                            <div class="weather-text">'. $weather_text. '</div>
                                            <div class="weather-loc-name"><span class="weather-label">'. __( 'Location', 'guten-weather').'</span>'. $weather_loc_name.' - '. $weather_loc_country.'</div>
                                            <div class="weather-loc-coords"><span class="weather-label">'. __( 'Coordinates', 'guten-weather').'</span>'. $weather_loc_coordinates.'</div>
                                            <div class="weather-loc-feelslike"><span class="weather-label">'. __( 'Feelslike', 'guten-weather').'</span>'. $weather_loc_feelslike.'°</div>
                                            <div class="weather-loc-humidity"><span class="weather-label">'. __( 'Humidity', 'guten-weather').'</span>'. $weather_loc_humidity.'%</div>
                                            <div class="weather-loc-wind"><span class="weather-label">'. __( 'Wind', 'guten-weather').'</span>'. $weather_loc_wind_kph.' km/h - '. $weather_loc_wind_direction.'</div>
                                            <div class="weather-loc-pressure"><span class="weather-label">'. __( 'Pressure', 'guten-weather').'</span>'. $weather_loc_pressure.' mbar</div>
                                        </div>';
                        // Forecast                
                        if($attributes['weatherType'] == 'forecast'){
                            $weather_forecast = $weather_data['forecast']['forecastday'];
                            if(is_array($weather_forecast)){
                                $content .= '<div class="weather-forecast-container">';
                                foreach( $weather_forecast as $key => $forecast){
                                    $day_data = $forecast['day'];
                                    $hour_data = $forecast['hour'];
                                    $weather_icon = $day_data['condition']['icon'];
                                    $weather_animated_icon = explode('/',$weather_icon);
                                    $weather_animated_icon = array_slice($weather_animated_icon, -2);
                                    $weather_icon_url  = ($attributes['layoutModel'] === 'animated_icons') ? plugin_dir_url( __FILE__ ) . 'animated-icons/'. $weather_animated_icon[0] . '/'. str_replace('.png','.svg',$weather_animated_icon[1]) : $weather_icon;
                                    $content .= '<div id="weather-forecast-day-'. $key .'" class="weather-forecast-day-container">
		 											<div class="weather-forecast-day-main-title">'. __( 'Date', 'guten-weather' ) . ' ' . $forecast['date'] . '</div>
		 											    <div class="weather-day-container">
		 													<div class="weather-day-condition">
		 													    <div class="weather-icon icon-'. $day_data['condition']['code'] . '">
		 														    <img loading="lazy" src="' . $weather_icon_url  . '" alt="'. $day_data['condition']['text'] . '" />
		 														</div>
		 													<div class="weather-day-content">
		 													<div class="weather-text">'. $day_data['condition']['text'] .'</div>
		 													<div class="weather-mintemp_c"><span class="weather-label">' . __( 'Min temperature', 'guten-weather' ) .' </span>' . $day_data['mintemp_c']. '°</div>
		 													<div class="weather-maxtemp_c"><span class="weather-label">'. __( 'Max temperature', 'guten-weather' ) .'</span>'. $day_data['maxtemp_c'] . '°</div>
		 													<div class="weather-mintemp_c"><span class="weather-label">' . __( 'Humidity', 'guten-weather' ) .'</span>'. $day_data['avghumidity']. '%</div>
		 													<div class="weather-maxtemp_c"><span class="weather-label">'. __( 'Total precipitation', 'guten-weather' ) .'</span>'. $day_data['totalprecip_mm'].'mm</div>
		 												</div>
		 											</div>
		 										</div>
		 										<div class="weather-hour-wrapper">
		 										    <div class="swiper weather-hour-container">
		 											    <div class="swiper-wrapper">'; 
                                                         foreach( $hour_data as $hour_key => $hour_value){
                                                            $hour_condition = $hour_value['condition'];
                                                            $hour_date = date('H:i', $hour_value['time_epoch']);
                                                    
                                                            $weather_icon = $hour_condition['icon'];
                                                            $weather_animated_icon = explode('/',$weather_icon);
                                                            $weather_animated_icon = array_slice($weather_animated_icon, -2);
                                                            $weather_icon_url  = ($attributes['layoutModel'] === 'animated_icons') ? plugin_dir_url( __FILE__ ) . 'animated-icons/'. $weather_animated_icon[0] . '/'. str_replace('.png','.svg',$weather_animated_icon[1]) : $weather_icon;

                                                            $content .= '<div id="weather-forecast-hour-'. $hour_key . '" class="swiper-slide weather-hour-content">
		 																	<div class="weather-hour-depoint">' . $hour_date . '</div>
		 																	<div class="weather-hour-condition">
		 																	<div class="weather-icon icon-'. $hour_condition['code'] .'">
		 																		<img loading="lazy" src="'. $weather_icon_url . '" alt="' . $hour_condition['text'] .'" />
		 																	</div>
		 																	</div>
		 																	<div class="weather-hour-humidity"><span class="weather-label">' . __( 'Humidity', 'guten-weather' ) . '</span>'. $hour_value['humidity'] .'%</div>
		 																	<div class="weather-hour-precip_mm"><span class="weather-label">'. __( 'Rainfall', 'guten-weather' ) . '</span>' . $hour_value['precip_mm'] . 'mm</div>
		 																	<div class="weather-hour-temp_c"><span class="weather-label">'. __( 'Temperature', 'guten-weather' ) . '</span>'. $hour_value['temp_c'] . '°</div>
		 																	<div class="weather-hour-wind-content">
		 																	<div class="weather-hour-wind-degree"><span class="weather-label">' . __( 'Wind degree', 'guten-weather' ) . '</span>' . $hour_value['wind_degree'] .'°</div>
		 																	<div class="weather-hour-wind-dir"><span class="weather-label">'. __( 'Wind direction', 'guten-weather' ) .'</span>'. $hour_value['wind_dir'] .'</div>
		 																	<div class="weather-hour-wind-kph"><span class="weather-label">' . __( 'Wind speed', 'guten-weather' ) . '</span>'. $hour_value['wind_kph'] .'</div>
		 																	<div class="weather-hour-windchill_c"><span class="weather-label">' . __( 'Wind chill', 'guten-weather' ) . '</span>'. $hour_value['windchill_c'] .'°</div>
		 																	</div>
		 																</div>';
                                                        }
                                                        $content .= '</div><div class="swiper-button-prev"></div>
		 															<div class="swiper-button-next"></div>
		 															</div>
		 															</div>
		 															</div>';
                                }
                                $content .= '</div>';
                            }
                        }
                        $content .= '</div>';
                    }
                }
            }
            curl_close($curl);
        }


    }
    echo $content;