/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");


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

  const weather_api = 'http://api.weatherapi.com/v1/forecast.json?';
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

  if (languageData !== 'select your language' && languageData !== 'undefined') {
    language = "&lang=" + languageData;
  }

  weatherType === 'forecast' ? weather_endpoint = weather_api + apiKey + cityName + days + language : weather_endpoint = weather_api + apiKey + cityName + language;

  if (weather_api_key != '' && city !== 'select your city') {
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
      props.attributes.WeatherTpl += '<div class="weather-temperature">' + weather_loc_temperature + '°' + '</div>';
      props.attributes.WeatherTpl += '<img src="' + weather_icon_url + '" alt="' + weather_text + '" />';
      props.attributes.WeatherTpl += '</div>';
      props.attributes.WeatherTpl += '<div class="weather-text-content">';
      props.attributes.WeatherTpl += '<div class="weather-text">' + weather_text + '</div>';
      props.attributes.WeatherTpl += '<div class="weather-loc-name"><span class="weather-label">' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Location', 'guten-weather') + '</span>' + weather_loc_name + ' - ' + weather_loc_country + '</div>';
      props.attributes.WeatherTpl += '<div class="weather-loc-coords"><span class="weather-label">' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Coordinates', 'guten-weather') + '</span>' + weather_loc_coordinates + '</div>';
      props.attributes.WeatherTpl += '<div class="weather-loc-feelslike"><span class="weather-label">' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Feelslike', 'guten-weather') + '</span>' + weather_loc_feelslike + '°' + '</div>';
      props.attributes.WeatherTpl += '<div class="weather-loc-humidity"><span class="weather-label">' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Humidity', 'guten-weather') + '</span>' + weather_loc_humidity + '%' + '</div>';
      props.attributes.WeatherTpl += '<div class="weather-loc-wind"><span class="weather-label">' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Wind', 'guten-weather') + '</span>' + weather_loc_wind_kph + ' km/h' + ' - ' + weather_loc_wind_direction + '</div>';
      props.attributes.WeatherTpl += '<div class="weather-loc-pressure"><span class="weather-label">' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pressure', 'guten-weather') + '</span>' + weather_loc_pressure + ' mbar' + '</div>';
      props.attributes.WeatherTpl += '</div>';

      if (weatherType === 'forecast') {
        const weather_forecast = data.forecast.forecastday;

        if (weather_forecast.length > 0) {
          props.attributes.WeatherTpl += '<div class="weather-forecast-container">';
          weather_forecast.map(function (key, value) {
            const day_data = key.day,
                  hour_data = key.hour;
            matches = regex.exec(day_data.condition.icon);
            weather_icon_url = layoutModel === 'animated_icons' ? plugin_path + 'animated-icons/' + matches[1] + '/' + matches[2] + '.svg' : day_data.condition.icon;
            props.attributes.WeatherTpl += '<div id="weather-forecast-day-' + value + '" class="weather-forecast-day-container">';
            props.attributes.WeatherTpl += '<div class="weather-forecast-day-main-title">' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Date', 'guten-weather') + ' ' + key.date + '</div>';
            props.attributes.WeatherTpl += '<div class="weather-day-container">';
            props.attributes.WeatherTpl += '<div class="weather-day-condition">';
            props.attributes.WeatherTpl += '<div class="weather-icon icon-' + day_data.condition.code + '">';
            props.attributes.WeatherTpl += '<img src="' + weather_icon_url + '" alt="' + day_data.condition.text + '" />';
            props.attributes.WeatherTpl += '</div>';
            props.attributes.WeatherTpl += '<div class="weather-day-content">';
            props.attributes.WeatherTpl += '<div class="weather-text">' + day_data.condition.text + '</div>';
            props.attributes.WeatherTpl += '<div class="weather-mintemp_c"><span class="weather-label">' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Min temperature', 'guten-weather') + '</span>' + day_data.mintemp_c + '°' + '</div>';
            props.attributes.WeatherTpl += '<div class="weather-maxtemp_c"><span class="weather-label">' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Max temperature', 'guten-weather') + '</span>' + day_data.maxtemp_c + '°' + '</div>';
            props.attributes.WeatherTpl += '<div class="weather-mintemp_c"><span class="weather-label">' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Humidity', 'guten-weather') + '</span>' + day_data.avghumidity + '%' + '</div>';
            props.attributes.WeatherTpl += '<div class="weather-maxtemp_c"><span class="weather-label">' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Total precipitation', 'guten-weather') + '</span>' + day_data.totalprecip_mm + 'mm' + '</div>';
            props.attributes.WeatherTpl += '</div>';
            props.attributes.WeatherTpl += '</div>';
            props.attributes.WeatherTpl += '</div>';
            props.attributes.WeatherTpl += '<div class="weather-hour-wrapper">';
            props.attributes.WeatherTpl += '<div class="swiper weather-hour-container">';
            props.attributes.WeatherTpl += '<div class="swiper-wrapper">';
            hour_data.map(function (hour_key, hour_value) {
              const hour_condition = hour_key.condition;
              const date = new Date(hour_key.time_epoch * 1000);
              var hours = date.getHours() <= 9 ? "0" + date.getHours() : date.getHours();
              var minutes = "0" + date.getMinutes();
              var formattedTime = hours + ':' + minutes;
              matches = regex.exec(hour_condition.icon);
              weather_icon_url = layoutModel === 'animated_icons' ? plugin_path + 'animated-icons/' + matches[1] + '/' + matches[2] + '.svg' : hour_condition.icon;
              props.attributes.WeatherTpl += '<div id="weather-forecast-hour-' + hour_value + '" class="swiper-slide weather-hour-content">';
              props.attributes.WeatherTpl += '<div clss="weather-hour-depoint">' + formattedTime + '</div>';
              props.attributes.WeatherTpl += '<div class="weather-hour-condition"><div weather-icon icon-' + hour_condition.code + '"><img src="' + weather_icon_url + '" alt="' + hour_condition.text + '" /></div></div>';
              props.attributes.WeatherTpl += '<div clss="weather-hour-humidity"><span class="weather-label">' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Humidity', 'guten-weather') + '</span>' + hour_key.humidity + '%' + '</div>';
              props.attributes.WeatherTpl += '<div clss="weather-hour-precip_mm"><span class="weather-label">' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Rainfall', 'guten-weather') + '</span>' + hour_key.precip_mm + 'mm' + '</div>';
              props.attributes.WeatherTpl += '<div clss="weather-hour-temp_c"><span class="weather-label">' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Temperature', 'guten-weather') + '</span>' + hour_key.temp_c + '°' + '</div>';
              props.attributes.WeatherTpl += '<div clss="weather-hour-wind-content">';
              props.attributes.WeatherTpl += '<div clss="weather-hour-wind-degree"><span class="weather-label">' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Wind degree', 'guten-weather') + '</span>' + hour_key.wind_degree + '°' + '</div>';
              props.attributes.WeatherTpl += '<div clss="weather-hour-wind-dir"><span class="weather-label">' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Wind direction', 'guten-weather') + '</span>' + hour_key.wind_dir + '</div>';
              props.attributes.WeatherTpl += '<div clss="weather-hour-wind-kph"><span class="weather-label">' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Wind speed', 'guten-weather') + '</span>' + hour_key.wind_kph + '</div>';
              props.attributes.WeatherTpl += '<div clss="weather-hour-windchill_c"><span class="weather-label">' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Wind chill', 'guten-weather') + '</span>' + hour_key.windchill_c + '°' + '</div>';
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
              prevEl: '.swiper-button-prev'
            }
          });
        });
      }
    }).catch(error => {
      console.log('error >>>', error);
    });
  }

  function createWeatherContent() {
    return {
      __html: props.attributes.WeatherTpl
    };
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
    key: "setting"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Guten weather settings', 'guten-weather')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", {
    className: "blocks-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('City', 'guten-weather')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: "Write the name of your city",
    value: city,
    onChange: onChangeCity
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", {
    className: "blocks-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Weather type', 'guten-weather')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
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
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Number of days of weather forecast', 'guten-weather')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
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
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Language data', 'guten-weather')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
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
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Layout weather', 'guten-weather')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: "Choose your layout",
    value: layoutModel,
    options: [{
      label: 'Select your layout',
      value: 'select_your_layout'
    }, {
      label: 'Light',
      value: 'light'
    }, {
      label: 'Dark',
      value: 'dark'
    }, {
      label: 'Animated icons',
      value: 'animated_icons'
    }],
    onChange: onChangeLayoutModel
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "widget-weather-container layout--" + layoutModel,
    dangerouslySetInnerHTML: createWeatherContent()
  })));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ save; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);


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
      WeatherTpl
    },
    setAttributes
  } = props;

  function createWeatherContent() {
    return {
      __html: props.attributes.WeatherTpl
    };
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "widget-weather-container layout--" + layoutModel,
    dangerouslySetInnerHTML: createWeatherContent()
  }));
}

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

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
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
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
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
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
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
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
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
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
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkguten_weather"] = self["webpackChunkguten_weather"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map