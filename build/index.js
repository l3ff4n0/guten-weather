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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/server-side-render */ "@wordpress/server-side-render");
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");

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
      borderRadius,
      WidgetBgColor,
      WidgetColor
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
  const onChangeBorderRadius = newborderRadius => {
    setAttributes({
      borderRadius: newborderRadius
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
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)()
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
    key: "setting"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cloud weather settings', 'cloud-weather')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", {
    className: "blocks-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('City', 'cloud-weather')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Write the name of your city', 'cloud-weather'),
    value: city,
    onChange: onChangeCity
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", {
    className: "blocks-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Weather type', 'cloud-weather')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select the weather type', 'cloud-weather'),
    value: weatherType,
    options: [{
      label: 'Current',
      value: 'current'
    }, {
      label: 'Forecast',
      value: 'forecast'
    }],
    onChange: onChangeWeatherType
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", {
    className: "blocks-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Number of days of weather forecast', 'cloud-weather')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select the number of days', 'cloud-weather'),
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
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", {
    className: "blocks-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Language data', 'cloud-weather')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Choose the language', 'cloud-weather'),
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
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", {
    className: "blocks-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Layout weather', 'cloud-weather')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Choose your layout', 'cloud-weather'),
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
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", {
    className: "blocks-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Border radius', 'cloud-weather')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Choose your border radius', 'cloud-weather'),
    value: borderRadius,
    onChange: onChangeBorderRadius,
    initialPosition: 0,
    min: 0,
    max: 30,
    step: 5
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", {
    className: "blocks-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background color', 'cloud-weather')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPalette, {
    colors: Backgroundcolors,
    value: WidgetBgColor,
    enableAlpha: "true",
    onChange: onChangeSetBgColor
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", {
    className: "blocks-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Color', 'cloud-weather')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPalette, {
    colors: colors,
    value: WidgetColor,
    enableAlpha: "true",
    onChange: onChangeSetColor
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)((_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_3___default()), {
    block: "cloud-weather/cloud-weather",
    attributes: props.attributes,
    className: "widget-weather-wrapper"
  }));
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
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('cloud-weather/cloud-weather', {
  title: 'Cloud Weather',
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
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
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
      borderRadius,
      WidgetBgColor,
      WidgetColor
    },
    setAttributes
  } = props;
  return null;
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

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = window["React"];

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

/***/ }),

/***/ "@wordpress/server-side-render":
/*!******************************************!*\
  !*** external ["wp","serverSideRender"] ***!
  \******************************************/
/***/ (function(module) {

module.exports = window["wp"]["serverSideRender"];

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
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcloud_weather"] = self["webpackChunkcloud_weather"] || [];
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