/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");


/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */




/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

function Edit(props) {
  const {
    attributes: {
      city,
      weatherType,
      numberDays,
      languageData,
      layoutModel,
      WidgetBgColor,
      WidgetColor,
      WeatherTpl
    },
    setAttributes
  } = props;
  const onChangeCity = newCityName => {
    setAttributes({
      city: newCityName
    });
  };
  const onChangeWeatherType = newweatherType => {
    setAttributes({
      weatherType: newweatherType
    });
  };
  const onChangeNumberDays = newDay => {
    setAttributes({
      numberDays: newDay
    });
  };
  const onChangeLanguageData = newLanguageData => {
    setAttributes({
      languageData: newLanguageData
    });
  };
  const onChangeLayoutModel = newLayoutModel => {
    setAttributes({
      layoutModel: newLayoutModel
    });
  };
  const onChangeSetBgColor = newBgColor => {
    setAttributes({
      WidgetBgColor: newBgColor
    });
  };
  const onChangeSetColor = newColor => {
    setAttributes({
      WidgetColor: newColor
    });
  };
  const Backgroundcolors = [{
    name: 'White',
    color: '#fff'
  }, {
    name: 'Black',
    color: '#000'
  }, {
    name: 'Orange',
    color: '#FFA500'
  }, {
    name: 'Pink Illusion',
    color: '#D0A7F5'
  }, {
    name: 'Baby Blue Eyes',
    color: '#AFC6F5'
  }, {
    name: 'Rose Bonbon',
    color: '#F542A3'
  }, {
    name: 'Fuchsia Red',
    color: '#A83674'
  }, {
    name: 'Pastel Maybe Maui',
    color: '#F5D38C'
  }, {
    name: 'Machine Green',
    color: '#9EA83E'
  }, {
    name: 'Python Blue',
    color: '#387CA9'
  }, {
    name: 'California Poppy',
    color: '#A83F3E'
  }, {
    name: 'Pastel Pale Pear',
    color: '#F4D66C'
  }];
  const colors = [{
    name: 'White',
    color: '#fff'
  }, {
    name: 'Black',
    color: '#000'
  }, {
    name: 'Soulstone Blue',
    color: '#0049A6'
  }, {
    name: 'Lush Greenery',
    color: '#E3ED39'
  }, {
    name: 'Pastel Triforce Yellow',
    color: '#E6F20A'
  }, {
    name: 'Free Speech Green',
    color: '#12F20A'
  }, {
    name: 'Aquamentus Green',
    color: '#06A600'
  }, {
    name: 'Y7 K Blue',
    color: '#0A5CF2'
  }, {
    name: 'Electric Violet',
    color: '#8E0AF2'
  }, {
    name: 'Cheddar',
    color: '#F2930A'
  }, {
    name: 'Mike Wazowski Green',
    color: '#0AF253'
  }, {
    name: 'Rich Blue',
    color: '#0A1FF2'
  }];
  const weather_api = 'http://api.weatherapi.com/v1/' + weatherType + '.json?';
  const regex = /\/(\w+)\/(\w+)\.(\w+)$/;
  let weather_endpoint,
    apiKey,
    cityName = "&q=",
    days = "&days=" + numberDays,
    language;
  if (weather_api_key != '') {
    apiKey = 'key=' + weather_api_key;
  }
  if (city !== 'select your city') {
    cityName = "&q=" + city;
  }
  language = languageData !== 'select your language' ? "&lang=" + languageData : "";
  if (weather_api_key == '') {
    props.attributes.WeatherTpl = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Please create an API KEY and put it inside the Guten Weather settings plugin', 'guten-weather');
  } else {
    if (city == 'select your city' || city == '') {
      props.attributes.WeatherTpl = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Please add a Location to display the weather widget', 'guten-weather');
    } else {
      weatherType === 'forecast' ? weather_endpoint = weather_api + apiKey + cityName + days + language : weather_endpoint = weather_api + apiKey + cityName + language;
      fetch(weather_endpoint).then(response => response.json()).then(data => {
        let weather_code, weather_icon, weather_icon_url, weather_text, weather_loc_temperature, weather_loc_name, weather_loc_country, weather_loc_coordinates, weather_loc_localtime, weather_loc_feelslike, weather_loc_humidity, weather_loc_wind_direction, weather_loc_wind_kph, weather_loc_pressure;
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
        weather_icon_url = layoutModel === 'animated_icons' ? plugin_path + 'animated-icons/' + matches[1] + '/' + matches[2] + '.svg' : weather_icon;
        props.attributes.WeatherTpl = '<div class="weather-icon icon-' + weather_code + '">';
        props.attributes.WeatherTpl += `<div class="weather-temperature">${weather_loc_temperature}°</div>
													<img loading="lazy" src="${weather_icon_url}" alt="${weather_text}" />
													</div>
													<div class="weather-text-content">
														<div class="weather-text">${weather_text}</div>
														<div class="weather-loc-name"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Location', 'guten-weather')}</span>${weather_loc_name} - ${weather_loc_country}</div>
														<div class="weather-loc-coords"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Coordinates', 'guten-weather')}</span>${weather_loc_coordinates}</div>
														<div class="weather-loc-feelslike"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Feelslike', 'guten-weather')}</span>${weather_loc_feelslike}°</div>
														<div class="weather-loc-humidity"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Humidity', 'guten-weather')}</span>${weather_loc_humidity}%</div>
														<div class="weather-loc-wind"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wind', 'guten-weather')}</span>${weather_loc_wind_kph} km/h - ${weather_loc_wind_direction}</div>
														<div class="weather-loc-pressure"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pressure', 'guten-weather')}</span>${weather_loc_pressure} mbar</div>
													</div>
													`;
        if (weatherType === 'forecast') {
          const weather_forecast = data.forecast.forecastday;
          if (weather_forecast.length > 0) {
            props.attributes.WeatherTpl += '<div class="weather-forecast-container">';
            weather_forecast.map(function (key, value) {
              const day_data = key.day,
                hour_data = key.hour;
              matches = regex.exec(day_data.condition.icon);
              weather_icon_url = layoutModel === 'animated_icons' ? plugin_path + 'animated-icons/' + matches[1] + '/' + matches[2] + '.svg' : day_data.condition.icon;
              props.attributes.WeatherTpl += `<div id="weather-forecast-day-${value}" class="weather-forecast-day-container">
																		<div class="weather-forecast-day-main-title">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Date', 'guten-weather')} ${key.date}</div>
																		<div class="weather-day-container">
																		<div class="weather-day-condition">
																			<div class="weather-icon icon-${day_data.condition.code}">
																			<img loading="lazy" src="${weather_icon_url}" alt="${day_data.condition.text}" />
																			</div>
																			<div class="weather-day-content">
																			<div class="weather-text">${day_data.condition.text}</div>
																			<div class="weather-mintemp_c"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Min temperature', 'guten-weather')}</span>${day_data.mintemp_c}°</div>
																			<div class="weather-maxtemp_c"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Max temperature', 'guten-weather')}</span>${day_data.maxtemp_c}°</div>
																			<div class="weather-mintemp_c"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Humidity', 'guten-weather')}</span>${day_data.avghumidity}%</div>
																			<div class="weather-maxtemp_c"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Total precipitation', 'guten-weather')}</span>${day_data.totalprecip_mm}mm</div>
																			</div>
																		</div>
																		</div>
																		<div class="weather-hour-wrapper">
																		<div class="swiper weather-hour-container">
																			<div class="swiper-wrapper">
																	`;
              hour_data.map(function (hour_key, hour_value) {
                const hour_condition = hour_key.condition;
                const date = new Date(hour_key.time_epoch * 1000);
                var hours = date.getHours() <= 9 ? "0" + date.getHours() : date.getHours();
                var minutes = "0" + date.getMinutes();
                var formattedTime = hours + ':' + minutes;
                matches = regex.exec(hour_condition.icon);
                weather_icon_url = layoutModel === 'animated_icons' ? plugin_path + 'animated-icons/' + matches[1] + '/' + matches[2] + '.svg' : hour_condition.icon;
                props.attributes.WeatherTpl += `<div id="weather-forecast-hour-${hour_value}" class="swiper-slide weather-hour-content">
																			<div class="weather-hour-depoint">${formattedTime}</div>
																			<div class="weather-hour-condition">
																			<div class="weather-icon icon-${hour_condition.code}">
																				<img loading="lazy" src="${weather_icon_url}" alt="${hour_condition.text}" />
																			</div>
																			</div>
																			<div class="weather-hour-humidity"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Humidity', 'guten-weather')}</span>${hour_key.humidity}%</div>
																			<div class="weather-hour-precip_mm"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Rainfall', 'guten-weather')}</span>${hour_key.precip_mm}mm</div>
																			<div class="weather-hour-temp_c"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Temperature', 'guten-weather')}</span>${hour_key.temp_c}°</div>
																			<div class="weather-hour-wind-content">
																			<div class="weather-hour-wind-degree"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wind degree', 'guten-weather')}</span>${hour_key.wind_degree}°</div>
																			<div class="weather-hour-wind-dir"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wind direction', 'guten-weather')}</span>${hour_key.wind_dir}</div>
																			<div class="weather-hour-wind-kph"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wind speed', 'guten-weather')}</span>${hour_key.wind_kph}</div>
																			<div class="weather-hour-windchill_c"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wind chill', 'guten-weather')}</span>${hour_key.windchill_c}°</div>
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
          _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default()(function () {
            const swiper = new Swiper('.swiper', {
              slidesPerView: 3,
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              }
            });
          });
        }
      }).catch(error => {
        console.log('error >>>', error);
      });
    }
  }
  function createWeatherContent() {
    return {
      __html: props.attributes.WeatherTpl
    };
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)()
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, {
    key: "setting"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Guten weather settings', 'guten-weather')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", {
    className: "blocks-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('City', 'guten-weather')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    label: "Write the name of your city",
    value: city,
    onChange: onChangeCity
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", {
    className: "blocks-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Weather type', 'guten-weather')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    label: "Select the weather type",
    value: weatherType,
    options: [{
      label: 'Current',
      value: 'current'
    }, {
      label: 'Forecast',
      value: 'forecast'
    }],
    onChange: onChangeWeatherType
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", {
    className: "blocks-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Number of days of weather forecast', 'guten-weather')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    label: " Select the number of days",
    value: numberDays,
    options: [{
      label: '1',
      value: '1'
    }, {
      label: '2',
      value: '2'
    }, {
      label: '3',
      value: '3'
    }, {
      label: '4',
      value: '4'
    }, {
      label: '5',
      value: '5'
    }, {
      label: '6',
      value: '6'
    }, {
      label: '7',
      value: '7'
    }, {
      label: '8',
      value: '8'
    }, {
      label: '9',
      value: '9'
    }, {
      label: '10',
      value: '10'
    }],
    onChange: onChangeNumberDays
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", {
    className: "blocks-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Language data', 'guten-weather')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    label: "Choose the language",
    value: languageData,
    options: [{
      label: 'Select your language',
      value: 'select your language'
    }, {
      label: 'Arabic',
      value: 'ar'
    }, {
      label: 'Bengali',
      value: 'bn'
    }, {
      label: 'Bulgarian',
      value: 'bg'
    }, {
      label: 'Chinese Simplified',
      value: 'zh'
    }, {
      label: 'Chinese Traditional',
      value: 'zh_tw'
    }, {
      label: 'Czech',
      value: 'cs'
    }, {
      label: 'Danish',
      value: 'da'
    }, {
      label: 'Dutch',
      value: 'nl'
    }, {
      label: 'Finnish',
      value: 'fi'
    }, {
      label: 'French',
      value: 'fr'
    }, {
      label: 'German',
      value: 'de'
    }, {
      label: 'Greek',
      value: 'el'
    }, {
      label: 'Hindi',
      value: 'hi'
    }, {
      label: 'Hungarian',
      value: 'hu'
    }, {
      label: 'Italian',
      value: 'it'
    }, {
      label: 'Japanese',
      value: 'ja'
    }, {
      label: 'Javanese',
      value: 'jv'
    }, {
      label: 'Korean',
      value: 'ko'
    }, {
      label: 'Mandarin',
      value: 'zh_cmn'
    }, {
      label: 'Marathi',
      value: 'mr'
    }, {
      label: 'Polish',
      value: 'pl'
    }, {
      label: 'Portuguese',
      value: 'pt'
    }, {
      label: 'Punjabi',
      value: 'pa'
    }, {
      label: 'Romanian',
      value: 'ro'
    }, {
      label: 'Russian',
      value: 'ru'
    }, {
      label: 'Serbian',
      value: 'sr'
    }, {
      label: 'Sinhalese',
      value: 'si'
    }, {
      label: 'Slovak',
      value: 'sk'
    }, {
      label: 'Spanish',
      value: 'es'
    }, {
      label: 'Swedish',
      value: 'sv'
    }, {
      label: 'Tamil',
      value: 'ta'
    }, {
      label: 'Telugu',
      value: 'te'
    }, {
      label: 'Turkish',
      value: 'tr'
    }, {
      label: 'Ukrainian',
      value: 'uk'
    }, {
      label: 'Urdu',
      value: 'ur'
    }, {
      label: 'Vietnamese',
      value: 'vi'
    }, {
      label: 'Wu (Shanghainese)',
      value: 'zh_wuu'
    }, {
      label: 'Xiang',
      value: 'zh_hsn'
    }, {
      label: 'Yue (Cantonese)',
      value: 'zh_yue'
    }, {
      label: 'Zulu',
      value: 'zu'
    }],
    onChange: onChangeLanguageData
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", {
    className: "blocks-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Layout weather', 'guten-weather')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    label: "Choose your layout",
    value: layoutModel,
    options: [{
      label: 'Select your layout',
      value: 'select_your_layout'
    }, {
      label: 'Static icons',
      value: 'static_icons'
    }, {
      label: 'Animated icons',
      value: 'animated_icons'
    }],
    onChange: onChangeLayoutModel
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", {
    className: "blocks-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Background color', 'guten-weather')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPalette, {
    colors: Backgroundcolors,
    value: WidgetBgColor,
    enableAlpha: "true",
    onChange: onChangeSetBgColor
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", {
    className: "blocks-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Color', 'guten-weather')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPalette, {
    colors: colors,
    value: WidgetColor,
    enableAlpha: "true",
    onChange: onChangeSetColor
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)()
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "widget-weather-container",
    style: {
      background: WidgetBgColor,
      color: WidgetColor
    },
    dangerouslySetInnerHTML: createWeatherContent()
  })));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/save.js");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */



/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('guten-weather/guten-weather', {
  title: 'Guten Weather',
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});
window.addEventListener("load", function () {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
});

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);


/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
function save(props) {
  const {
    attributes: {
      city,
      weatherType,
      numberDays,
      languageData,
      layoutModel,
      WidgetBgColor,
      WidgetColor,
      WeatherTpl
    },
    setAttributes
  } = props;
  const weather_api = 'http://api.weatherapi.com/v1/' + weatherType + '.json?';
  const regex = /\/(\w+)\/(\w+)\.(\w+)$/;
  let weather_endpoint,
    apiKey,
    cityName = "&q=",
    days = "&days=" + numberDays,
    language;
  if (weather_api_key != '') {
    apiKey = 'key=' + weather_api_key;
  }
  if (city !== 'select your city') {
    cityName = "&q=" + city;
  }
  language = languageData !== 'select your language' ? "&lang=" + languageData : "";
  if (weather_api_key == '') {
    props.attributes.WeatherTpl = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Please create an API KEY and put it inside the Guten Weather settings plugin', 'guten-weather');
  } else {
    if (city == 'select your city' || city == '') {
      props.attributes.WeatherTpl = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Please add a Location to display the weather widget', 'guten-weather');
    } else {
      weatherType === 'forecast' ? weather_endpoint = weather_api + apiKey + cityName + days + language : weather_endpoint = weather_api + apiKey + cityName + language;
      fetch(weather_endpoint).then(response => response.json()).then(data => {
        let weather_code, weather_icon, weather_icon_url, weather_text, weather_loc_temperature, weather_loc_name, weather_loc_country, weather_loc_coordinates, weather_loc_localtime, weather_loc_feelslike, weather_loc_humidity, weather_loc_wind_direction, weather_loc_wind_kph, weather_loc_pressure;
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
        weather_icon_url = layoutModel === 'animated_icons' ? plugin_path + 'animated-icons/' + matches[1] + '/' + matches[2] + '.svg' : weather_icon;
        props.attributes.WeatherTpl = '<div class="weather-icon icon-' + weather_code + '">';
        props.attributes.WeatherTpl += `<div class="weather-temperature">${weather_loc_temperature}°</div>
													<img loading="lazy" src="${weather_icon_url}" alt="${weather_text}" />
													</div>
													<div class="weather-text-content">
														<div class="weather-text">${weather_text}</div>
														<div class="weather-loc-name"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Location', 'guten-weather')}</span>${weather_loc_name} - ${weather_loc_country}</div>
														<div class="weather-loc-coords"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Coordinates', 'guten-weather')}</span>${weather_loc_coordinates}</div>
														<div class="weather-loc-feelslike"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Feelslike', 'guten-weather')}</span>${weather_loc_feelslike}°</div>
														<div class="weather-loc-humidity"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Humidity', 'guten-weather')}</span>${weather_loc_humidity}%</div>
														<div class="weather-loc-wind"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wind', 'guten-weather')}</span>${weather_loc_wind_kph} km/h - ${weather_loc_wind_direction}</div>
														<div class="weather-loc-pressure"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pressure', 'guten-weather')}</span>${weather_loc_pressure} mbar</div>
													</div>
													`;
        if (weatherType === 'forecast') {
          const weather_forecast = data.forecast.forecastday;
          if (weather_forecast.length > 0) {
            props.attributes.WeatherTpl += '<div class="weather-forecast-container">';
            weather_forecast.map(function (key, value) {
              const day_data = key.day,
                hour_data = key.hour;
              matches = regex.exec(day_data.condition.icon);
              weather_icon_url = layoutModel === 'animated_icons' ? plugin_path + 'animated-icons/' + matches[1] + '/' + matches[2] + '.svg' : day_data.condition.icon;
              props.attributes.WeatherTpl += `<div id="weather-forecast-day-${value}" class="weather-forecast-day-container">
																		<div class="weather-forecast-day-main-title">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Date', 'guten-weather')} ${key.date}</div>
																		<div class="weather-day-container">
																		<div class="weather-day-condition">
																			<div class="weather-icon icon-${day_data.condition.code}">
																			<img loading="lazy" src="${weather_icon_url}" alt="${day_data.condition.text}" />
																			</div>
																			<div class="weather-day-content">
																			<div class="weather-text">${day_data.condition.text}</div>
																			<div class="weather-mintemp_c"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Min temperature', 'guten-weather')}</span>${day_data.mintemp_c}°</div>
																			<div class="weather-maxtemp_c"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Max temperature', 'guten-weather')}</span>${day_data.maxtemp_c}°</div>
																			<div class="weather-mintemp_c"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Humidity', 'guten-weather')}</span>${day_data.avghumidity}%</div>
																			<div class="weather-maxtemp_c"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Total precipitation', 'guten-weather')}</span>${day_data.totalprecip_mm}mm</div>
																			</div>
																		</div>
																		</div>
																		<div class="weather-hour-wrapper">
																		<div class="swiper weather-hour-container">
																			<div class="swiper-wrapper">
																	`;
              hour_data.map(function (hour_key, hour_value) {
                const hour_condition = hour_key.condition;
                const date = new Date(hour_key.time_epoch * 1000);
                var hours = date.getHours() <= 9 ? "0" + date.getHours() : date.getHours();
                var minutes = "0" + date.getMinutes();
                var formattedTime = hours + ':' + minutes;
                matches = regex.exec(hour_condition.icon);
                weather_icon_url = layoutModel === 'animated_icons' ? plugin_path + 'animated-icons/' + matches[1] + '/' + matches[2] + '.svg' : hour_condition.icon;
                props.attributes.WeatherTpl += `<div id="weather-forecast-hour-${hour_value}" class="swiper-slide weather-hour-content">
																			<div class="weather-hour-depoint">${formattedTime}</div>
																			<div class="weather-hour-condition">
																			<div class="weather-icon icon-${hour_condition.code}">
																				<img loading="lazy" src="${weather_icon_url}" alt="${hour_condition.text}" />
																			</div>
																			</div>
																			<div class="weather-hour-humidity"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Humidity', 'guten-weather')}</span>${hour_key.humidity}%</div>
																			<div class="weather-hour-precip_mm"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Rainfall', 'guten-weather')}</span>${hour_key.precip_mm}mm</div>
																			<div class="weather-hour-temp_c"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Temperature', 'guten-weather')}</span>${hour_key.temp_c}°</div>
																			<div class="weather-hour-wind-content">
																			<div class="weather-hour-wind-degree"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wind degree', 'guten-weather')}</span>${hour_key.wind_degree}°</div>
																			<div class="weather-hour-wind-dir"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wind direction', 'guten-weather')}</span>${hour_key.wind_dir}</div>
																			<div class="weather-hour-wind-kph"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wind speed', 'guten-weather')}</span>${hour_key.wind_kph}</div>
																			<div class="weather-hour-windchill_c"><span class="weather-label">${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wind chill', 'guten-weather')}</span>${hour_key.windchill_c}°</div>
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
          _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default()(function () {
            const swiper = new Swiper('.swiper', {
              slidesPerView: 3,
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              }
            });
          });
        }
      }).catch(error => {
        console.log('error >>>', error);
      });
    }
  }
  function createWeatherContent() {
    return {
      __html: props.attributes.WeatherTpl
    };
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps.save()
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "widget-weather-container",
    style: {
      background: WidgetBgColor,
      color: WidgetColor
    },
    dangerouslySetInnerHTML: createWeatherContent()
  }));
}

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkguten_weather"] = self["webpackChunkguten_weather"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map