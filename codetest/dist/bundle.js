/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/normalize.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/normalize.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "/*! normalize.css 2012-01-31T16:06 UTC - http://github.com/necolas/normalize.css */\r\n\r\n/* =============================================================================\r\n   HTML5 display definitions\r\n   ========================================================================== */\r\n\r\n/*\r\n * Corrects block display not defined in IE6/7/8/9 & FF3\r\n */\r\n\r\narticle,\r\naside,\r\ndetails,\r\nfigcaption,\r\nfigure,\r\nfooter,\r\nheader,\r\nhgroup,\r\nnav,\r\nsection {\r\n    display: block;\r\n}\r\n\r\n/*\r\n * Corrects inline-block display not defined in IE6/7/8/9 & FF3\r\n */\r\n\r\naudio,\r\ncanvas,\r\nvideo {\r\n    display: inline-block;\r\n    *display: inline;\r\n    *zoom: 1;\r\n}\r\n\r\n/*\r\n * Prevents modern browsers from displaying 'audio' without controls\r\n */\r\n\r\naudio:not([controls]) {\r\n    display: none;\r\n}\r\n\r\n/*\r\n * Addresses styling for 'hidden' attribute not present in IE7/8/9, FF3, S4\r\n * Known issue: no IE6 support\r\n */\r\n\r\n[hidden] {\r\n    display: none;\r\n}\r\n\r\n\r\n/* =============================================================================\r\n   Base\r\n   ========================================================================== */\r\n\r\n/*\r\n * 1. Corrects text resizing oddly in IE6/7 when body font-size is set using em units\r\n *    http://clagnut.com/blog/348/#c790\r\n * 2. Prevents iOS text size adjust after orientation change, without disabling user zoom\r\n *    www.456bereastreet.com/archive/201012/controlling_text_size_in_safari_for_ios_without_disabling_user_zoom/\r\n */\r\n\r\nhtml {\r\n    font-size: 100%; /* 1 */\r\n    -webkit-text-size-adjust: 100%; /* 2 */\r\n    -ms-text-size-adjust: 100%; /* 2 */\r\n}\r\n\r\n/* \r\n * Addresses font-family inconsistency between 'textarea' and other form elements.\r\n */\r\n\r\nhtml,\r\nbutton,\r\ninput,\r\nselect,\r\ntextarea {\r\n    font-family: sans-serif;\r\n}\r\n\r\n/*\r\n * Addresses margins handled incorrectly in IE6/7\r\n */\r\n\r\nbody {\r\n    margin: 0;\r\n}\r\n\r\n\r\n/* =============================================================================\r\n   Links\r\n   ========================================================================== */\r\n\r\n/*\r\n * Addresses outline displayed oddly in Chrome\r\n */\r\n\r\na:focus {\r\n    outline: thin dotted;\r\n}\r\n\r\n/*\r\n * Improves readability when focused and also mouse hovered in all browsers\r\n * people.opera.com/patrickl/experiments/keyboard/test\r\n */\r\n\r\na:hover,\r\na:active {\r\n    outline: 0;\r\n}\r\n\r\n\r\n/* =============================================================================\r\n   Typography\r\n   ========================================================================== */\r\n\r\n/*\r\n * Neutralise smaller font-size in 'section' and 'article' in FF4+, Chrome, S5\r\n * Fix IE6/7 heading font-size not being relative to the root font-size\r\n */\r\n\r\nh1 {\r\n    font-size: 2em;\r\n    margin: 0.67em 0;\r\n}\r\n\r\nh2 {\r\n    font-size: 1.5em;\r\n    margin: 0.83em 0;\r\n}\r\n\r\nh3 {\r\n    font-size: 1.17em;\r\n    margin: 1em 0;\r\n}\r\n\r\nh4 {\r\n    font-size: 1em;\r\n    margin: 1.33em 0;\r\n}\r\n\r\nh5 {\r\n    font-size: 0.83em;\r\n    margin: 1.67em 0;\r\n}\r\n\r\nh6 {\r\n    font-size: 0.75em;\r\n    margin: 2.33em 0;\r\n}\r\n\r\n/*\r\n * Addresses styling not present in IE7/8/9, S5, Chrome\r\n */\r\n\r\nabbr[title] {\r\n    border-bottom: 1px dotted;\r\n}\r\n\r\n/*\r\n * Addresses style set to 'bolder' in FF3+, S4/5, Chrome\r\n*/\r\n\r\nb, \r\nstrong { \r\n    font-weight: bold; \r\n}\r\n\r\nblockquote {\r\n    margin: 1em 40px;\r\n}\r\n\r\n/*\r\n * Addresses styling not present in S5, Chrome\r\n */\r\n\r\ndfn {\r\n    font-style: italic;\r\n}\r\n\r\n/*\r\n * Addresses styling not present in IE6/7/8/9\r\n */\r\n\r\nmark {\r\n    background: #ff0;\r\n    color: #000;\r\n}\r\n\r\n/*\r\n * Corrects font family set oddly in IE6, S4/5, Chrome\r\n * en.wikipedia.org/wiki/User:Davidgothberg/Test59\r\n */\r\n\r\npre,\r\ncode,\r\nkbd,\r\nsamp {\r\n    font-family: monospace, serif;\r\n    _font-family: 'courier new', monospace;\r\n    font-size: 1em;\r\n}\r\n\r\n/*\r\n * Improves readability of pre-formatted text in all browsers\r\n */\r\n\r\npre {\r\n    white-space: pre;\r\n    white-space: pre-wrap;\r\n    word-wrap: break-word;\r\n}\r\n\r\n/*\r\n * 1. Addresses CSS quotes not supported in IE6/7\r\n * 2. Addresses quote property not supported in S4\r\n */\r\n\r\n/* 1 */\r\n\r\nq {\r\n    quotes: none;\r\n}\r\n\r\n/* 2 */\r\n\r\nq:before,\r\nq:after {\r\n    content: '';\r\n    content: none;\r\n}\r\n\r\nsmall {\r\n    font-size: 75%;\r\n}\r\n\r\n/*\r\n * Prevents sub and sup affecting line-height in all browsers\r\n * gist.github.com/413930\r\n */\r\n\r\nsub,\r\nsup {\r\n    font-size: 75%;\r\n    line-height: 0;\r\n    position: relative;\r\n    vertical-align: baseline;\r\n}\r\n\r\nsup {\r\n    top: -0.5em;\r\n}\r\n\r\nsub {\r\n    bottom: -0.25em;\r\n}\r\n\r\n\r\n/* =============================================================================\r\n   Lists\r\n   ========================================================================== */\r\n\r\nul,\r\nol {\r\n    margin-left: 0;\r\n    padding: 0 0 0 40px;\r\n}\r\n\r\ndd {\r\n    margin: 0 0 0 40px;\r\n}\r\n\r\nnav ul,\r\nnav ol {\r\n    list-style: none;\r\n    list-style-image: none;\r\n}\r\n\r\n\r\n/* =============================================================================\r\n   Embedded content\r\n   ========================================================================== */\r\n\r\n/*\r\n * 1. Removes border when inside 'a' element in IE6/7/8/9, FF3\r\n * 2. Improves image quality when scaled in IE7\r\n *    code.flickr.com/blog/2008/11/12/on-ui-quality-the-little-things-client-side-image-resizing/\r\n */\r\n\r\nimg {\r\n    border: 0; /* 1 */\r\n    -ms-interpolation-mode: bicubic; /* 2 */\r\n}\r\n\r\n/*\r\n * Corrects overflow displayed oddly in IE9 \r\n */\r\n\r\nsvg:not(:root) {\r\n    overflow: hidden;\r\n}\r\n\r\n\r\n/* =============================================================================\r\n   Figures\r\n   ========================================================================== */\r\n\r\n/*\r\n * Addresses margin not present in IE6/7/8/9, S5, O11\r\n */\r\n\r\nfigure {\r\n    margin: 0;\r\n}\r\n\r\n\r\n/* =============================================================================\r\n   Forms\r\n   ========================================================================== */\r\n\r\n/*\r\n * Corrects margin displayed oddly in IE6/7\r\n */\r\n\r\nform {\r\n    margin: 0;\r\n}\r\n\r\n/*\r\n * Define consistent border, margin, and padding\r\n */\r\n\r\nfieldset {\r\n    border: 1px solid #c0c0c0;\r\n    margin: 0 2px;\r\n    padding: 0.35em 0.625em 0.75em;\r\n}\r\n\r\n/*\r\n * 1. Corrects color not being inherited in IE6/7/8/9\r\n * 2. Corrects text not wrapping in FF3 \r\n * 3. Corrects alignment displayed oddly in IE6/7\r\n */\r\n\r\nlegend {\r\n    border: 0; /* 1 */\r\n    padding: 0;\r\n    white-space: normal; /* 2 */\r\n    *margin-left: -7px; /* 3 */\r\n}\r\n\r\n/*\r\n * 1. Corrects font size not being inherited in all browsers\r\n * 2. Addresses margins set differently in IE6/7, FF3+, S5, Chrome\r\n * 3. Improves appearance and consistency in all browsers\r\n */\r\n\r\nbutton,\r\ninput,\r\nselect,\r\ntextarea {\r\n    font-size: 100%; /* 1 */\r\n    margin: 0; /* 2 */\r\n    vertical-align: baseline; /* 3 */\r\n    *vertical-align: middle; /* 3 */\r\n}\r\n\r\n/*\r\n * Addresses FF3/4 setting line-height on 'input' using !important in the UA stylesheet\r\n */\r\n\r\nbutton,\r\ninput {\r\n    line-height: normal; /* 1 */\r\n}\r\n\r\n/*\r\n * 1. Improves usability and consistency of cursor style between image-type 'input' and others\r\n * 2. Corrects inability to style clickable 'input' types in iOS\r\n * 3. Removes inner spacing in IE7 without affecting normal text inputs\r\n *    Known issue: inner spacing remains in IE6\r\n */\r\n\r\nbutton,\r\ninput[type=\"button\"], \r\ninput[type=\"reset\"], \r\ninput[type=\"submit\"] {\r\n    cursor: pointer; /* 1 */\r\n    -webkit-appearance: button; /* 2 */\r\n    *overflow: visible;  /* 3 */\r\n}\r\n\r\n/*\r\n * Re-set default cursor for disabled elements\r\n */\r\n\r\nbutton[disabled],\r\ninput[disabled] {\r\n    cursor: default;\r\n}\r\n\r\n/*\r\n * 1. Addresses box sizing set to content-box in IE8/9\r\n * 2. Removes excess padding in IE8/9\r\n * 3. Removes excess padding in IE7\r\n      Known issue: excess padding remains in IE6\r\n */\r\n\r\ninput[type=\"checkbox\"],\r\ninput[type=\"radio\"] {\r\n    box-sizing: border-box; /* 1 */\r\n    padding: 0; /* 2 */\r\n    *height: 13px; /* 3 */\r\n    *width: 13px; /* 3 */\r\n}\r\n\r\n/*\r\n * 1. Addresses appearance set to searchfield in S5, Chrome\r\n * 2. Addresses box-sizing set to border-box in S5, Chrome (include -moz to future-proof)\r\n */\r\n\r\ninput[type=\"search\"] {\r\n    -webkit-appearance: textfield; /* 1 */\r\n    -moz-box-sizing: content-box;\r\n    -webkit-box-sizing: content-box; /* 2 */\r\n    box-sizing: content-box;\r\n}\r\n\r\n/*\r\n * Removes inner padding and search cancel button in S5, Chrome on OS X\r\n */\r\n\r\ninput[type=\"search\"]::-webkit-search-decoration,\r\ninput[type=\"search\"]::-webkit-search-cancel-button {\r\n    -webkit-appearance: none;\r\n}\r\n\r\n/*\r\n * Removes inner padding and border in FF3+\r\n * www.sitepen.com/blog/2008/05/14/the-devils-in-the-details-fixing-dojos-toolbar-buttons/\r\n */\r\n\r\nbutton::-moz-focus-inner,\r\ninput::-moz-focus-inner {\r\n    border: 0;\r\n    padding: 0;\r\n}\r\n\r\n/*\r\n * 1. Removes default vertical scrollbar in IE6/7/8/9\r\n * 2. Improves readability and alignment in all browsers\r\n */\r\n\r\ntextarea {\r\n    overflow: auto; /* 1 */\r\n    vertical-align: top; /* 2 */\r\n}\r\n\r\n\r\n/* =============================================================================\r\n   Tables\r\n   ========================================================================== */\r\n\r\n/* \r\n * Remove most spacing between table cells\r\n */\r\n\r\ntable {\r\n    border-collapse: collapse;\r\n    border-spacing: 0;\r\n}\r\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "/*\r\n * base styles \r\n * \r\n */\r\n\r\nhtml{\r\n\theight: 100%;\r\n}\r\n\r\nbody{\r\n\tbackground: rgb(167,199,220); /* Old browsers */\r\n\tbackground: -moz-linear-gradient(top,  rgba(167,199,220,1) 0%, rgba(133,178,211,1) 100%); /* FF3.6+ */\r\n\tbackground: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(167,199,220,1)), color-stop(100%,rgba(133,178,211,1))); /* Chrome,Safari4+ */\r\n\tbackground: -webkit-linear-gradient(top,  rgba(167,199,220,1) 0%,rgba(133,178,211,1) 100%); /* Chrome10+,Safari5.1+ */\r\n\tbackground: -o-linear-gradient(top,  rgba(167,199,220,1) 0%,rgba(133,178,211,1) 100%); /* Opera 11.10+ */\r\n\tbackground: -ms-linear-gradient(top,  rgba(167,199,220,1) 0%,rgba(133,178,211,1) 100%); /* IE10+ */\r\n\tbackground: linear-gradient(top,  rgba(167,199,220,1) 0%,rgba(133,178,211,1) 100%); /* W3C */\r\n\tfilter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a7c7dc', endColorstr='#85b2d3',GradientType=0 ); /* IE6-9 */\r\n\r\n\t\r\n\tfont-size: 13px;\r\n\tmin-width: 800px;\r\n\t\r\n}\r\n\r\nbr {\r\n\tclear: left;\r\n}\r\n\r\nhr {\r\n\tmargin: .25em;\r\n}\r\n\r\nh1 {\r\n\tmargin-top: 7px;\r\n\tmargin-bottom: 28px;\r\n\tfont-size: 1.2em\r\n}\r\n\r\nh2, h3 {\r\n\tdisplay: inline-block;\r\n\tpadding: 0;\r\n\tmargin: 0;\r\n}\r\n\r\nh2 {\r\n\tfont-size: 1em;\r\n\tfont-weight: normal;\r\n}\r\n\r\nh3 {\r\n\tfont-weight: bold;\r\n\tcolor: #0279c9;\r\n\tfont-size: 1em;\r\n}\r\n\r\n\r\n#header{\r\n\tbackground: rgba( 0, 0, 0, 0.7);\r\n\tpadding: 10px 5px;\r\n\tbox-shadow: 0px 1px 5px #fff;\r\n\theight: 40px;\r\n}\r\n\r\nfooter p {\r\n\ttext-align: center;\r\n}\r\n\r\n\r\n/*logo in header*/\r\n#logo{\r\n\tdisplay: inline-block;\r\n\tfloat: left;\r\n}\r\n\r\n/*search in header*/\r\n\r\n#search{\r\n\r\n\tdisplay: inline;\r\n    float: left;\r\n    left: 50%;\r\n    margin-left: -25%;\r\n    position: relative;\r\n    width: 300px;\r\n    margin-top: 1em;\r\n}\r\n#search input[name=\"terms\"]{\r\n\tdisplay: inline-block;\r\n\twidth: 250px;\r\n\tpadding: 2px 3px;\r\n\tfont-size: 1.2em;\r\n\tborder: 2px solid #A2C4DA;\r\n}\r\n#search input[name=\"terms\"]:focus {\t\r\n\tbox-shadow: 0px 0px 15px rgba(255,255,255,.5);\r\n}\r\n#search input[type=\"submit\"]{\r\n\twidth: 30px;\r\n\tpadding: 4px;\r\n\tvertical-align: top;\r\n\tfont-weight: bold;\r\n\ttext-shadow: 1px 1px 1px #fff;\r\n\tborder: 1px solid #6FD6F7;\r\n\tbackground: -moz-linear-gradient(top, rgba(114,215,255,1) 0%, rgba(19,155,212,1) 100%);\r\n\tbackground: -webkit-linear-gradient(top, rgba(114,215,255,1) 0%, rgba(19,155,212,1) 100%);\r\n}\r\n\r\n#search input[type=\"submit\"]:hover{\r\n\tbackground: -moz-linear-gradient(top,  rgba(19,155,212,1) 0%, rgba(114,215,255,1) 100%);\r\n\tbackground: -webkit-linear-gradient(top,  rgba(19,155,212,1) 0%,rgba(114,215,255,1) 100%);\r\n}\r\n\r\n\r\n/*page content*/\r\n\r\n#page {\r\n\twidth: 800px;\r\n\t\r\n\t/*background: rgba( 255, 255, 255, 0.3 );\r\n\tborder: 1px solid #ffffff;*/\r\n\tmargin: 10px auto 0px;\r\n\tpadding: 1em 2em;\r\n}\r\n\r\n.panel {\r\n\tbackground-color: #f7f7f7;\r\n\tborder-radius: 5px;\r\n\tdisplay: block;\r\n}\r\n\r\n.panel-content {\r\n\tpadding: 5px;\r\n}\r\n.profile-pic {\r\n\tmargin: 0 15px 0 0;\r\n\tdisplay: inline-block;\r\n}\r\n.profile-pic img {\r\n\twidth: 50px;\r\n}\r\n\r\n.floatright {\r\n\tfloat: right;\r\n}\r\n.floatleft {\r\n\tfloat: right;\r\n}\r\n.button {\r\n\tdisplay: inline-block;\r\n\tmargin: 5px;\r\n\tpadding: 4px;\r\n\tvertical-align: top;\r\n\tfont-weight: bold;\r\n\ttext-shadow: 1px 1px 1px #fff;\r\n\tborder: 1px solid #aaa;\r\n\tcolor: #111;\r\n\tbackground-color: #ccc;\r\n\ttext-decoration: none;\r\n}\r\n\r\n.button.button-primary {\r\n\tborder: 1px solid #6FD6F7;\r\n\tbackground: -moz-linear-gradient(top, rgba(114,215,255,1) 0%, rgba(19,155,212,1) 100%);\r\n\tbackground: -webkit-linear-gradient(top, rgba(114,215,255,1) 0%, rgba(19,155,212,1) 100%);\r\n}\r\n.button:hover {\r\n\tbackground-color: #ddd;\r\n\t\r\n}\r\n.button.button-primary:hover {\r\n\tbackground: -moz-linear-gradient(top, rgba(19,155,212,1) 0%, rgba(114,215,255,1) 100%);\r\n\tbackground: -webkit-linear-gradient(top, rgba(19,155,212,1) 0%, rgba(114,215,255,1) 100%);\r\n}\r\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stylesInDom = {};

var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

function listToStyles(list, options) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}

function addStylesToDom(styles, options) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    var j = 0;

    if (domStyle) {
      domStyle.refs++;

      for (; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }

      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j], options));
      }
    } else {
      var parts = [];

      for (; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j], options));
      }

      stylesInDom[item.id] = {
        id: item.id,
        refs: 1,
        parts: parts
      };
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');

  if (typeof options.attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      options.attributes.nonce = nonce;
    }
  }

  Object.keys(options.attributes).forEach(function (key) {
    style.setAttribute(key, options.attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  var styles = listToStyles(list, options);
  addStylesToDom(styles, options);
  return function update(newList) {
    var mayRemove = [];

    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];

      if (domStyle) {
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
    }

    if (newList) {
      var newStyles = listToStyles(newList, options);
      addStylesToDom(newStyles, options);
    }

    for (var _i = 0; _i < mayRemove.length; _i++) {
      var _domStyle = mayRemove[_i];

      if (_domStyle.refs === 0) {
        for (var j = 0; j < _domStyle.parts.length; j++) {
          _domStyle.parts[j]();
        }

        delete stylesInDom[_domStyle.id];
      }
    }
  };
};

/***/ }),

/***/ "./src/components/base-component.js":
/*!******************************************!*\
  !*** ./src/components/base-component.js ***!
  \******************************************/
/*! exports provided: BaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseComponent", function() { return BaseComponent; });
/* harmony import */ var _shadowCSS_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shadowCSS.js */ "./src/shadowCSS.js");


class BaseComponent extends HTMLElement {	
	
	get html(){
		return ``;
	}
	
	get style(){
		return ``;
	}

	constructor(){
		super();
		this.attachShadow({mode: "open"});
        this.shadowRoot.adoptedStyleSheets = [_shadowCSS_js__WEBPACK_IMPORTED_MODULE_0__["mainCSS"]];
	}

	ReadAttributes(){
		
	}
	
	Render(){
		this.shadowRoot.innerHTML = this.style + this.html;
	}
	
	AttachEvents(){
		
	}
		
	connectedCallback(){
		this.ReadAttributes();
		this.Render();
		this.AttachEvents();
	}	
	
	querySelector(query){
		return this.shadowRoot.querySelector(query);
	}
}

customElements.define('base-component', BaseComponent);

/***/ }),

/***/ "./src/components/modal-confirm-content.js":
/*!*************************************************!*\
  !*** ./src/components/modal-confirm-content.js ***!
  \*************************************************/
/*! exports provided: ModalConfirmContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalConfirmContent", function() { return ModalConfirmContent; });
/* harmony import */ var _base_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component.js */ "./src/components/base-component.js");


class ModalConfirmContent extends _base_component_js__WEBPACK_IMPORTED_MODULE_0__["BaseComponent"] {	

	get html(){
		return `
			<div id='wrapper'>
				<p>${this.question}</p> 
				<hr />
				${this.content} 
				<hr />
				<a href="javascript:void(0);" class='confirm button button-primary floatright'>${this.confirmText}</a> 
				<a href="javascript:void(0);" class="close-modal button floatright">${this.cancelText}</a>				
			</div>`;
	}

	get style(){
		return `
		<style>
		#wrapper hr {
			border: none;
			height: 1px;
			background-color: #d8d8d8;
			margin: .5em -.2em;
		}
		</style>`;
	}
	
	ReadAttributes(){	
		this.question = this.getAttribute("data-question");
		this.content = this.getAttribute("data-content");
		this.confirmText = this.getAttribute("data-confirm-text");
		this.cancelText = this.getAttribute("data-cancel-text");
		
		if(this.content.length > 100){
			this.content = this.content.substr(0, 100) + "...";
		}
	}
	
	Render(){
		this.shadowRoot.innerHTML = this.style + this.html;
	}
	
	AttachEvents(){		

	}

	
	
}

customElements.define('modal-confirm-content', ModalConfirmContent);

/***/ }),

/***/ "./src/components/page-menu.js":
/*!*************************************!*\
  !*** ./src/components/page-menu.js ***!
  \*************************************/
/*! exports provided: PageMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageMenu", function() { return PageMenu; });
/* harmony import */ var _base_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component.js */ "./src/components/base-component.js");
/* harmony import */ var _user_profile_pic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-profile-pic.js */ "./src/components/user-profile-pic.js");
/* harmony import */ var _post_form_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./post-form.js */ "./src/components/post-form.js");
/* harmony import */ var _page_modal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page-modal.js */ "./src/components/page-modal.js");





class PageMenu extends _base_component_js__WEBPACK_IMPORTED_MODULE_0__["BaseComponent"] {	

	get style(){
		return `			
			<style>				
				#menu {
					float: right;
					margin: 0 24px 0 0;
				}

				#menu ul {	
					list-style-type: none;
					display: table;
				}

				#menu ul li {
					display: table-cell;
					padding: 0 10px;
					vertical-align: middle;
				}

				#menu a {
					color: white;
					text-decoration: none;
					font-size: 1.2em;
					display: block;
				}

				#menu a img {
					border: none;
					width: 25px;
					height: 25px;
				}
			</style>`;
	}

	get html(){
		return `
			<div id="menu">
				<ul>
					<li><a href='/' onclick="">Home</a></li>
					<li>
						<a href='javascript:void(0);' id="postAnUpdate">
							Post an update							
						</a>
					</li>
					<li><a href='javascript:void(0)' onclick=""><user-profile-pic width="25px" src="${this.user_pic}" /></a></li>
				</ul>
			</div>		
		`;
	}	
	ReadAttributes(){	
		this.user_id = this.getAttribute("data-user-id");
		this.user_pic = this.getAttribute("data-user-pic");
	}
	
	Render(){
		this.shadowRoot.innerHTML = this.style + this.html;
	}
	
	AttachEvents(){		
		var $this = this;			
		var postLink = this.shadowRoot.querySelector("#postAnUpdate");
		postLink.addEventListener("click", function(e){			
			var modal = document.createElement("page-modal");
			modal.setAttribute("data-title", "Post an Update");			

			var postForm = document.createElement("post-form");
			postForm.setAttribute("data-placeholder", "post an update");
			postForm.setAttribute("data-button-text", "Post");			
			modal.appendChild(postForm);			
			
			document.body.appendChild(modal);	
		});
	}
	
}

customElements.define('page-menu', PageMenu);

/***/ }),

/***/ "./src/components/page-modal.js":
/*!**************************************!*\
  !*** ./src/components/page-modal.js ***!
  \**************************************/
/*! exports provided: PageModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageModal", function() { return PageModal; });
/* harmony import */ var _base_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component.js */ "./src/components/base-component.js");


class PageModal extends _base_component_js__WEBPACK_IMPORTED_MODULE_0__["BaseComponent"] {	
	get html(){
		return `
			<div id="target" class="modal">
				<div class="modal-wrapper">
					<div class='modal-header'>
						${this.title}
					</div>
					<div class='modal-content'>
						<slot></slot>
					</div>
				</div>
			</div>
		`;		
	}
	
	get style(){
		return `
			<style>								
			.modal {
				display: none;
			}
			.modal.modal-active {
				display: block;
				position: fixed;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				margin: auto;
				width: 100%;
				height: 100%;
				background-color: rgba(255, 255, 255, .5);
				z-index: 99999;
			}

			.modal .modal-wrapper {
				display: block;
				position: fixed;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;		
				margin: auto;
				width: 400px;
				height: 200px;
				background-color: rgb(247, 247, 247);
				border-radius: 5px;
				z-index: 99999;
				box-shadow: 0 0 5px rgba(0, 0, 0, .2);
			}

			.modal .modal-header {
				font-size: 1.1em;
				padding: 10px;
				text-align: center;
				border-bottom: 2px solid #eee;
				color: #222;
			}

			.modal .modal-content {
				padding: 10px;
			}
			</style>`;
	}
	
	ReadAttributes(){	
		this.title = this.getAttribute("data-title");			
	}
	
	Render(){
		this.shadowRoot.innerHTML = this.style + this.html;
	}
	
	AttachEvents(){		
		var $this = this;
		
		this.triggerElement = this.shadowRoot.host.parentNode;
		this.targetElement = this.shadowRoot.querySelector("#target");
		
		this.triggerElement.addEventListener("click", function(e){
			if(e.path[0] != $this.targetElement){
				$this.openModal();
			}
		});
		
		var downTarget = null;
		this.targetElement.addEventListener("mousedown", function(e){		
			downTarget = e.path[0];		
		});
		this.targetElement.addEventListener("click", function(e){					
			if(downTarget == $this.targetElement){
				$this.closeModal();
			}
		});		
		
				
		var closeTriggers = this.targetElement.querySelectorAll(".close-modal");		
		if(typeof closeTriggers != "undefined"){
			for(var k = 0; k < closeTriggers.length; k++){
				closeTriggers[k].addEventListener("click", function(e){
					$this.closeModal();
				});
			}
		}		
		
		this.shadowRoot.addEventListener("form-submit", function(e){			 
			$this.closeModal();						
		});
	}	

	openModal(){
		this.targetElement.classList.add("modal-active");
	}
	closeModal(){
		var elem = this.shadowRoot.host;
		elem.parentNode.removeChild(elem);
	}
}

customElements.define('page-modal', PageModal);

/***/ }),

/***/ "./src/components/post-form.js":
/*!*************************************!*\
  !*** ./src/components/post-form.js ***!
  \*************************************/
/*! exports provided: PostForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostForm", function() { return PostForm; });
/* harmony import */ var _base_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component.js */ "./src/components/base-component.js");
/* harmony import */ var _js_CurrentUser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/CurrentUser.js */ "./src/js/CurrentUser.js");
/* harmony import */ var _js_PostsController_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/PostsController.js */ "./src/js/PostsController.js");




class PostForm extends _base_component_js__WEBPACK_IMPORTED_MODULE_0__["BaseComponent"] {	
	
	get html(){
		return `
			<form method="get" action="#">
				<textarea rows="5" type="text" name="post-text" placeholder="${this.placeholder}" autofocus maxlength="${this.maxLength}"></textarea>
				<p class='errorText'></p>
				<input type="submit" class='close-modal button button-primary' value="${this.button_text}"/>
			</form>
		`;
	}
	
	get style(){
		return `
			<style>
			textarea {
				width: 98%;		
				background-color: #fefefe;
				border-color: #ddd;
				color: #333;
			}
			input[type=submit] {
				float: right;
				margin-top: 1em;
			}
			.errorText { color: #33d; float: left; }
			.errorText.error { color: red; }
			.errorText.valid { color: green;}
			</style>`;
	}
	ReadAttributes(){	
		this.CurrentUser = Object(_js_CurrentUser_js__WEBPACK_IMPORTED_MODULE_1__["GetCurrentUser"])();
		this.placeholder = this.getAttribute("data-placeholder");
		this.button_text = this.getAttribute("data-button-text");		
		this.maxLength = 256;
		this.minLength = 1;
	}
	
	Render(){
		this.shadowRoot.innerHTML = this.style + this.html;
	}
	
	AttachEvents(){		
		var $this = this;	
		
		this.form = this.shadowRoot.querySelector("form");
		this.textarea = this.shadowRoot.querySelector("textarea");
		this.errorText = this.shadowRoot.querySelector(".errorText");
		setTimeout(function(){ $this.textarea.focus(); }, 0);
		var $this = this;
		var submitForm = function(e){
			$this.errorText.innerHTML = "";
			e.preventDefault();	
			console.log("submitted");
			var content = $this.form["post-text"].value;
			if(content.length >= $this.minLength && content.length <= $this.maxLength){				
				_js_PostsController_js__WEBPACK_IMPORTED_MODULE_2__["postsController"].AddPost($this.CurrentUser.id, content);
				$this.textarea.value = "";
				var event = new Event("submit");
				$this.dispatchEvent(new CustomEvent('form-submit', {
					bubbles: true,
					composed: true,
					detail: "composed"
				}));
			} else {
				$this.errorText.classList.remove("valid");
				$this.errorText.classList.add("error");
				$this.errorText.innerHTML = "Post must be between " + $this.minLength + " and " + $this.maxLength + " characters";
				e.cancelBubble = true;
			}
			return false;
		}
		
		this.textarea.addEventListener("keydown", function(e){		
			if(e.code == "Enter" || e.code == "NumpadEnter"){
				e.preventDefault();
			}
		});
		this.textarea.addEventListener("keyup", function(e){					
			if(e.code == "Enter" || e.code == "NumpadEnter"){
				e.preventDefault();
				submitForm(e);
			} else {
				var charsLeft = ($this.maxLength - this.value.length);
				if(this.value.length < $this.minLength){
					$this.errorText.classList.remove("valid");
					$this.errorText.classList.remove("error");
					$this.errorText.innerHTML = "Be excellent!";
				} else if(charsLeft > 0){
					$this.errorText.classList.add("valid");
					$this.errorText.innerHTML = charsLeft + " characters available";
				} else if(charsLeft == 0){
					$this.errorText.classList.remove("valid");
					$this.errorText.innerHTML = "Maximum size reached";
				} else {
					$this.errorText.classList.remove("valid");
					$this.errorText.classList.add("error");
					$this.errorText.innerHTML = -charsLeft + " too many characters";
				}
			}
		});
		
		this.form.onsubmit = function(e){
			console.log("form submit");
			e.preventDefault();
			submitForm(e);
		}
		
		
	}	
}

customElements.define('post-form', PostForm);

/***/ }),

/***/ "./src/components/posts-page.js":
/*!**************************************!*\
  !*** ./src/components/posts-page.js ***!
  \**************************************/
/*! exports provided: PostsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostsPage", function() { return PostsPage; });
/* harmony import */ var _base_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component.js */ "./src/components/base-component.js");
/* harmony import */ var _js_PostsController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/PostsController.js */ "./src/js/PostsController.js");
/* harmony import */ var _js_DataStore_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/DataStore.js */ "./src/js/DataStore.js");
/* harmony import */ var _user_account_panel_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user-account-panel.js */ "./src/components/user-account-panel.js");
/* harmony import */ var _user_post_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user-post.js */ "./src/components/user-post.js");







class PostsPage extends _base_component_js__WEBPACK_IMPORTED_MODULE_0__["BaseComponent"] {	

	get html(){
		return 	`
			<div id='wrapper'>				
				<user-account-panel data-user-id="${this.user_id}"  data-user-pic="${this.user_pic}"  data-user-name="${this.user_name}"></user-account-panel>				
				<div id="postPanel" class="panel">				
					<div class="panel-content">					
						<h1>Updates</h1>
						<div id='sortByWrapper'>
							sort by 
							<select id='sortBy'>
								<option value='old'>old</option>
								<option value='new'>new</option>
							</select>
						</div>
						<div class="post-list">
							${this.posts}
						</div>
					</div>
				</div>
			</div>
		`;	
	}
	
	get style(){
		return `
			<style>				
				#wrapper {
					display: flex;
					justify-content: space-between;
					align-items:flex-start;
					align-content:flex-start;
				}
				#postPanel {	
					width: 525px;
					min-height: 200px;
				}	

				#wrapper h1 {
					margin-bottom: 28px;
					float: left;
				}
				
				#sortByWrapper {
					float: right;
				}
				
				.post-list {
					clear: both;
				}

			</style>`;
	}
	ReadAttributes(){
		_js_PostsController_js__WEBPACK_IMPORTED_MODULE_1__["postsController"].PostsPage = this;
		this.user_id = this.getAttribute("data-user-id");
		this.user_pic = this.getAttribute("data-user-pic");
		this.user_name = this.getAttribute("data-user-name");		
		this.sortBy = null;
	}
	
	Render(){
		this.RenderPosts();
		this.shadowRoot.innerHTML = this.style + this.html;		
		
	}
	
	AttachEvents(){		
		var $this = this;
		this.sortBy = this.shadowRoot.querySelector("#sortBy");
		this.sortBy.addEventListener("change", function(e){			
			$this.RenderPosts();
			$this.postContainer.innerHTML = $this.posts;
			$this.SetPostArray();
		});
		
		this.postContainer = this.shadowRoot.querySelector("#postPanel .post-list");
		this.SetPostArray();
	}
	
	//store posts for later access
	SetPostArray(){
		let renderedPosts = this.postContainer.querySelectorAll("user-post");
		for(let post of renderedPosts){
			this.postArray[post.post_id] = post;
		}
	}
	
	RenderPosts(){
		this.postArray = [];
		this.posts = "";	
		var PostData = _js_DataStore_js__WEBPACK_IMPORTED_MODULE_2__["dataStore"].GetTableData("Posts");
		if(PostData != null){
			for(var i = 0; i < PostData.length; i++){
				var postData = PostData[i];
				if(postData != null){
					var userData = _js_DataStore_js__WEBPACK_IMPORTED_MODULE_2__["dataStore"].GetDataById("Users", postData.userId);
					var newPost = document.createElement("user-post");
					newPost.setAttribute("data-user-id", postData.userId);
					newPost.setAttribute("data-post-id", postData.id);
					newPost.setAttribute("data-user-name", userData.username);
					newPost.setAttribute("data-user-pic", userData.pic);
					newPost.innerHTML = postData.content;	
						
					if(this.sortBy == null || this.sortBy.value == 'old'){
						this.posts = this.posts + newPost.outerHTML;
					} else if(this.sortBy.value == 'new'){
						this.posts = newPost.outerHTML + this.posts;
					}
				}
			}	
		}			
	}

	AddPost(postData) {		
		var userData = _js_DataStore_js__WEBPACK_IMPORTED_MODULE_2__["dataStore"].GetDataById("Users", postData.userId);
		var newPost = document.createElement("user-post");
		newPost.setAttribute("data-user-id", postData.userId);
		newPost.setAttribute("data-post-id", postData.id);
		newPost.setAttribute("data-user-name", userData.username);
		newPost.setAttribute("data-user-pic", userData.pic);
		newPost.innerHTML = postData.content;
		if(this.sortBy == null || this.sortBy.value == 'old'){
			this.postContainer.appendChild(newPost);
		} else if(this.sortBy.value == 'new'){
			this.postContainer.insertBefore(newPost,this.postContainer.firstChild);
		}
		this.SetPostArray();
	}
	
	OnCommentAdded(commentData){
		if(this.postArray[commentData.postId]){
			this.postArray[commentData.postId].OnCommentAdded(commentData);
		}
	}
}

customElements.define('posts-page', PostsPage);

/***/ }),

/***/ "./src/components/user-account-panel.js":
/*!**********************************************!*\
  !*** ./src/components/user-account-panel.js ***!
  \**********************************************/
/*! exports provided: UserAccountPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserAccountPanel", function() { return UserAccountPanel; });
/* harmony import */ var _base_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component.js */ "./src/components/base-component.js");
/* harmony import */ var _user_profile_pic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-profile-pic.js */ "./src/components/user-profile-pic.js");



class UserAccountPanel extends _base_component_js__WEBPACK_IMPORTED_MODULE_0__["BaseComponent"] {	

	get style(){
		return `			
			<style>
				#accountPanel {
					width: 250px;
					height: auto;
				}

				#accountPanel .profile-pic {
					margin: 0 5px 0 0;
				}
			</style>`;
	}

	get html(){
		return `
			<div id="accountPanel" class="panel">
				<div class="panel-content">
					<div class="profile-pic">
						<user-profile-pic width="50px" src="${this.user_pic}" />
					</div>
					<h2 class="profile-name">
						${this.user_name}
					</h2>
				</div>
			</div>			
		`;
	}	
	ReadAttributes(){
		this.user_id = this.getAttribute("data-user-id");
		this.user_pic = this.getAttribute("data-user-pic");
		this.user_name = this.getAttribute("data-user-name");	
	}
	
	Render(){
		this.shadowRoot.innerHTML = this.style + this.html;
	}
	
	AttachEvents(){
		
	}
}

customElements.define('user-account-panel', UserAccountPanel);

/***/ }),

/***/ "./src/components/user-post-leave-comment.js":
/*!***************************************************!*\
  !*** ./src/components/user-post-leave-comment.js ***!
  \***************************************************/
/*! exports provided: UserPostLeaveComment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserPostLeaveComment", function() { return UserPostLeaveComment; });
/* harmony import */ var _base_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component.js */ "./src/components/base-component.js");
/* harmony import */ var _user_profile_pic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-profile-pic.js */ "./src/components/user-profile-pic.js");
/* harmony import */ var _js_PostsController_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/PostsController.js */ "./src/js/PostsController.js");
/* harmony import */ var _js_CurrentUser_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/CurrentUser.js */ "./src/js/CurrentUser.js");





class UserPostLeaveComment extends _base_component_js__WEBPACK_IMPORTED_MODULE_0__["BaseComponent"] {	

	get html(){
		return `
			<div id="wrapper">
				<div id='profilePicWrap'>
					<user-profile-pic width="25px" src="${this.CurrentUser.pic}"></user-profile-pic>
				</div>
				<input id="commentInput" type="text" placeholder="post a comment" />
			</div>
		`;
	}
	
	get style(){
		return `
			<style>					
				#wrapper {
					padding: 2px;
				}
				#wrapper input {
					width: 453px;
					display: inline-block;
					vertical-align: top;
					border: 1px solid #ddd;
					margin: 0px;
					padding: 3px 2px;
					border-radius: 3px;
				}	
				#wrapper input:focus {
					width: 425px;
				}
				#wrapper input.valid {
					outline-color: green;
				}
				#wrapper input.invalid {
					outline-color: red;
				}
				#profilePicWrap {
					display:none;					
				}
				#profilePicWrap.active {
					display:inline-block;
					vertical-align: top;
				}
				.delete-post {
					float: right;
					color: #ddd;
					text-decoration: none;
					position: absolute;
					right: 5px;
					top: 0;		
					display: block;
				}
				.delete-post:hover { color: red; }
				
			</style>`;
	}

	ReadAttributes(){
		this.CurrentUser = Object(_js_CurrentUser_js__WEBPACK_IMPORTED_MODULE_3__["GetCurrentUser"])();		
		this.post_id = this.getAttribute("data-post-id");
		this.minLength = 1;
		this.maxLength = 256;
	}
	
	Render(){	
	
		this.shadowRoot.innerHTML = this.style + this.html;
	}

	

	
	AttachEvents(){
		var $this = this;
		//leave-a-comment text input
		this.wrapper = this.shadowRoot.querySelector("#wrapper");	
		this.commentInput = this.shadowRoot.querySelector("#commentInput");	
		//popup profile pic when typing comment		
		this.commentInputProfilePic = this.shadowRoot.querySelector("#profilePicWrap");	
		
		
		//Attach Events to controls
		if(this.commentInput != null){
			this.commentInput.addEventListener("keyup", function(e){
				if($this.Validate(this)){
					if(e.code == "Enter" || e.code == "NumpadEnter"){
						$this.SubmitComment(this.value);
						this.value = "";
					}
				}
			});
			
			this.commentInput.addEventListener("focus", function(e){
				$this.commentInputProfilePic.classList.add("active");
				$this.commentInput.setAttribute("placeholder", "start typing and hit enter to submit");
			});
			this.commentInput.addEventListener("focusout", function(e){
				$this.commentInputProfilePic.classList.remove("active");
				$this.commentInput.setAttribute("placeholder", "post a comment");
			});
		}
		
		
		
	}
	
	Validate(input){
		let result = false;		 
		if(input.value.length < this.minLength){
			input.classList.remove("valid");
			input.classList.add("invalid");
		} else if(input.value.length > this.maxLength){
			input.classList.remove("valid");	
			input.classList.add("invalid");
			input.value = input.value.substr(0, this.maxLength);
		} else {	
			result = true;
			input.classList.add("valid");
			input.classList.remove("invalid");	
		}
		if(input.value.length == 0){			
			input.classList.remove("valid");	
			input.classList.remove("invalid");	
		}
		return result;
	}
	
	SubmitComment(comment){
		_js_PostsController_js__WEBPACK_IMPORTED_MODULE_2__["postsController"].AddComment(this.CurrentUser.id, this.post_id, comment);
	}

	
}

customElements.define('user-post-leave-comment', UserPostLeaveComment);

/***/ }),

/***/ "./src/components/user-post.js":
/*!*************************************!*\
  !*** ./src/components/user-post.js ***!
  \*************************************/
/*! exports provided: UserPost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserPost", function() { return UserPost; });
/* harmony import */ var _base_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component.js */ "./src/components/base-component.js");
/* harmony import */ var _user_profile_pic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-profile-pic.js */ "./src/components/user-profile-pic.js");
/* harmony import */ var _modal_confirm_content_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal-confirm-content.js */ "./src/components/modal-confirm-content.js");
/* harmony import */ var _page_modal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page-modal.js */ "./src/components/page-modal.js");
/* harmony import */ var _js_DataStore_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../js/DataStore.js */ "./src/js/DataStore.js");
/* harmony import */ var _js_PostsController_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../js/PostsController.js */ "./src/js/PostsController.js");
/* harmony import */ var _js_CurrentUser_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../js/CurrentUser.js */ "./src/js/CurrentUser.js");
/* harmony import */ var _user_post_leave_comment_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./user-post-leave-comment.js */ "./src/components/user-post-leave-comment.js");









class UserPost extends _base_component_js__WEBPACK_IMPORTED_MODULE_0__["BaseComponent"] {	

	get html(){
		return `<div class="post ${this.isComment}">
					<div class='post-content'>
						<div class="profile-pic">
							<user-profile-pic src="${this.user_pic}" width="${this.picWidth}" />			
						</div>
						<h3 class="profile-name">
							${this.user_name}
						</h3>
						<p class="post-text">
							<slot></slot>
						</p>
						${this.delete_control}
					</div>
					<div class="comments">
						<div class="comments-list">
							${this.comments}
						</div>
						${this.leave_comment}				
					</div>
					${this.hr}
				</div>
		`;
	}
	
	get style(){
		return `
			<style>	
				
				.post {
					position: relative;
					margin-top: 23px;
				}
				.post h3 {
					display: block;
					position: relative;
					top: 1px;
				}
				.post-content {
					min-height: 50px;
				}

				.post .profile-pic {
					float: left;
				}

				.post .post-text {
					margin: 2px 0px 3px 0px;
					display: block;
					float: right;
					width: 450px;					
				}

				
				.comments {	
					margin: 0 0 0 55px;
					background-color: #ededed;
					padding: 1px;
					clear: both;
				}
		
				.post hr {
					border: none;
					height: 1px;
					background-color: #d8d8d8;
					margin: 6px -4px 0;
				}
				
				.comment.post {
					min-height: 50px;
					padding: 6px 6px 4px;					
					margin-top: 10px;
					clear: both;
				}

				.comment .profile-pic {
					margin: 0 10px 0 0;
				}
				.comment .post-text {
					width: 411px;
				}
				.leave-comment {
					padding: 2px;
				}
				.leave-comment input {
					width: 443px;
					display: inline-block;
					vertical-align: top;
					height: 19px;
					border: 1px solid #ddd;
					margin: 2px;
					padding: .2em;
				}	
				.leave-comment input:focus {
					width: 414px;
					border: 1px solid #ddd;
				}
				#profilePicWrap {
					display:none;					
				}
				#profilePicWrap.active {
					display:inline-block;
					vertical-align: top;
				}
				.delete-post {
					float: right;
					color: #ddd;
					text-decoration: none;
					position: absolute;
					right: 5px;
					top: 0;		
					display: block;
				}
				.delete-post:hover { color: red; }
				
			</style>`;
	}

	ReadAttributes(){
		this.CurrentUser = Object(_js_CurrentUser_js__WEBPACK_IMPORTED_MODULE_6__["GetCurrentUser"])();		
		this.user_id = this.getAttribute("data-user-id");
		this.post_id = this.getAttribute("data-post-id");
		this.comment_id = this.getAttribute("data-comment-id");
		this.user_pic = this.getAttribute("data-user-pic");
		this.user_name = this.getAttribute("data-user-name");	
		this.isComment = "";
		this.leave_comment = "";
		this.comments = "";
		this.picWidth = "50px";
		this.delete_control = ``;
		this.hr = ``;
	}
	
	Render(){	

		this.RenderControls();
		//this is a parent post, not a comment
		if(this.comment_id == null){
			//render comments of this post
			this.RenderComments();
			this.RenderLeaveCommentForm();
		} else {
			//this is a comment of a post
			this.isComment = "comment";
			this.picWidth = "25px";
			this.hr = `<hr />`;
		}
		
		this.shadowRoot.innerHTML = this.style + this.html;
	}
	
	RenderComments(){
		var postData = _js_DataStore_js__WEBPACK_IMPORTED_MODULE_4__["dataStore"].GetDataById("Posts", this.post_id);
		for(var i = 0; i < postData.comments.length; i++){
			var commentData = postData.comments[i];
			var userData = _js_DataStore_js__WEBPACK_IMPORTED_MODULE_4__["dataStore"].GetDataById("Users",commentData.userId);
			var newPost = document.createElement("user-post");
			newPost.setAttribute("data-user-id", userData.id);
			newPost.setAttribute("data-user-name", userData.username);
			newPost.setAttribute("data-user-pic", userData.pic);
			newPost.setAttribute("data-post-id", this.post_id);
			newPost.setAttribute("data-comment-id", commentData.id);
			newPost.innerHTML = commentData.content;
			this.comments = this.comments + newPost.outerHTML;
			this.comments = this.comments;
		}	
	}
	
	RenderLeaveCommentForm(){
		//render leave-comment form
		this.leave_comment = `
			<user-post-leave-comment data-post-id="${this.post_id}"></user-post-leave-comment>
		`;
	}
	
	RenderControls(){
		if(this.user_id == this.CurrentUser.id){
			this.delete_control = `
			<a class="delete-post" href="javascript:void(0);">
				delete
			</a>`;
		}
	}
	
	AttachEvents(){
		var $this = this;
		//list of comments
		this.commentContainer = this.shadowRoot.querySelector(".comments-list");		
		//delete post button (only available if logged in user matches)
		this.deletePostControl = this.shadowRoot.querySelector(".delete-post");


		
		if(this.deletePostControl != null){
			this.deletePostControl.addEventListener("click", function(e){
				e.preventDefault();
				
				var confirmModal = document.createElement("page-modal");
				confirmModal.setAttribute("data-title", "Are you sure you want to delete this?");			
				
				var postConfirmDelete = document.createElement("modal-confirm-content");
				postConfirmDelete.setAttribute("data-question", "Are you sure you want to delete this comment?");
				postConfirmDelete.setAttribute("data-content", $this.innerHTML);
				postConfirmDelete.setAttribute("data-confirm-text", "Delete");
				postConfirmDelete.setAttribute("data-cancel-text", "Cancel");
				confirmModal.appendChild(postConfirmDelete);
				
				document.body.appendChild(confirmModal);
				
				var closeModal = postConfirmDelete.querySelector(".close-modal");
				closeModal.addEventListener("click", function(e){
					confirmModal.closeModal();
					e.preventDefault();
					e.stopPropagation();
				});
				
				var confirmButton = postConfirmDelete.querySelector(".confirm");
				confirmButton.addEventListener("click", function(e){
					$this.DeletePost();
					confirmModal.closeModal();
					e.preventDefault();
					e.stopPropagation();
				});
				confirmModal.openModal();
			});
		}
		
	}

	
	DeletePost(){
		if(this.comment_id == null){	
			_js_PostsController_js__WEBPACK_IMPORTED_MODULE_5__["postsController"].DeletePost(this.post_id, this);			
		} else {
			_js_PostsController_js__WEBPACK_IMPORTED_MODULE_5__["postsController"].DeleteComment(this.post_id, this.comment_id, this);					
		}
	}
	
	OnCommentAdded(commentData){
		var userData = _js_DataStore_js__WEBPACK_IMPORTED_MODULE_4__["dataStore"].GetDataById("Users", commentData.userId);
		var newComment = document.createElement("user-post");
		newComment.setAttribute("data-user-id", userData.id);
		newComment.setAttribute("data-user-name", userData.username);
		newComment.setAttribute("data-user-pic", userData.pic);
		newComment.setAttribute("data-post-id", this.post_id);
		newComment.setAttribute("data-comment-id", commentData.id);
		newComment.innerHTML = commentData.content;
		
		this.commentContainer = this.shadowRoot.querySelector(".comments-list");
		this.commentContainer.innerHTML = this.commentContainer.innerHTML + newComment.outerHTML;
	}
	
	OnDeleted(){
		var elem = this.shadowRoot.host;
		elem.parentNode.removeChild(elem);
	}
}

customElements.define('user-post', UserPost);

/***/ }),

/***/ "./src/components/user-profile-pic.js":
/*!********************************************!*\
  !*** ./src/components/user-profile-pic.js ***!
  \********************************************/
/*! exports provided: UserProfilePic */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProfilePic", function() { return UserProfilePic; });
/* harmony import */ var _base_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component.js */ "./src/components/base-component.js");


class UserProfilePic extends _base_component_js__WEBPACK_IMPORTED_MODULE_0__["BaseComponent"] {	

	get html(){
		return `
			<div id='wrapper'>
				<img src="${this.src}">
					<slot></slot>
				</img>
			</div>`;
	}

	get style(){
		return `<style>	
				#wrapper {
					display: block;
					width: ${this.width};
					height: ${this.width};
				}
				img {
					border: none;
					width: ${this.width};
					height: ${this.width};
				}
			</style>			
		`;
	}
	
	ReadAttributes(){
		this.src = this.getAttribute("src") || "#";
		this.width = this.getAttribute("width");		
	}
	
	Render(){
		this.shadowRoot.innerHTML = this.style + this.html;
	}
	
	AttachEvents(){
		
	}

	
}

customElements.define('user-profile-pic', UserProfilePic);

/***/ }),

/***/ "./src/data/posts.json":
/*!*****************************!*\
  !*** ./src/data/posts.json ***!
  \*****************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"id\":1,\"userId\":1,\"date\":\"\",\"content\":\"Love wine? Love food? Love to win an iPad 2 with gift certificates to your favorite IA winery & Dine IA restaurant. http://bit.ly/xQ4Ls8\",\"comments\":[{\"id\":13,\"postId\":1,\"userId\":3,\"date\":\"\",\"content\":\"Would you happen to know were Capone is? Since you are a secret agent and all\"}]},{\"id\":2,\"userId\":3,\"date\":\"\",\"content\":\"Day 2 of house sitting...awww my firends really do Trust me!\",\"comments\":[]},{\"id\":3,\"userId\":4,\"date\":\"\",\"content\":\"Just got doing some sword fighting with Connor! THERE CAN BE ONLY ONE!\",\"comments\":[{\"id\":10,\"postId\":3,\"userId\":1,\"date\":\"\",\"content\":\"Let me know when you're going to be going at it again, I would love to join\"},{\"id\":11,\"postId\":3,\"userId\":4,\"date\":\"\",\"content\":\"sure thing\"}]},{\"id\":4,\"userId\":2,\"date\":\"\",\"content\":\"How do I even have friends?! Oh wait.... I don't. Glad I have internet firends! I'd be screwed without them... #LameTweetIsLame #hobit #somereallylonghashtag #longcomment #eggs #stuff\",\"comments\":[]},{\"id\":5,\"userId\":3,\"date\":\"\",\"content\":\"I want to thank ALL MY FIRENDS BOTH OLD AND NEW FOR THE ENCOURAGING WORDS....LOVE YOU GUYS!!!!!\",\"comments\":[]},{\"id\":6,\"userId\":1,\"date\":\"\",\"content\":\"Just got back from the moon, they have sharks with lazers on their heads\",\"comments\":[{\"id\":12,\"postId\":6,\"userId\":2,\"date\":\"\",\"content\":\"Hey, what else was there? I want to write a book on it\"}]}]");

/***/ }),

/***/ "./src/data/users.json":
/*!*****************************!*\
  !*** ./src/data/users.json ***!
  \*****************************/
/*! exports provided: 0, 1, 2, 3, 4, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"id\":1,\"username\":\"James Bond\",\"pic\":\"images/profile/Sean-Connery-as-James-Bond.jpg\",\"about\":\"Secret Agent, for MI6 code name 007, need I say more?\"},{\"id\":2,\"username\":\"William Forrester\",\"pic\":\"images/profile/2001_finding_forrester_008.png\",\"about\":\"I make better writers out of high school kids\"},{\"id\":3,\"username\":\"Jim Malone\",\"pic\":\"images/profile/sean_connery_the_untouchables.jpg\",\"about\":\" I picked the men out for Ness's crew from the police academy to go after Capone  \"},{\"id\":4,\"username\":\"Juan Sanchez Villalobos Ramirez\",\"pic\":\"images/profile/Sean_Connery_as_Ramirez_in_Highlander.jpg\",\"about\":\"Trained Connor in the art of sword fighting\"},{\"id\":5,\"username\":\"Daniel Craig\",\"pic\":\"images/profile/daniel-craig.jpg\",\"about\":\"James Bond reloaded\"}]");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _normalize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./normalize.css */ "./src/normalize.css");
/* harmony import */ var _normalize_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_normalize_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _js_DataStore_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/DataStore.js */ "./src/js/DataStore.js");
/* harmony import */ var _js_PostsController_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/PostsController.js */ "./src/js/PostsController.js");
/* harmony import */ var _components_posts_page_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/posts-page.js */ "./src/components/posts-page.js");
/* harmony import */ var _components_page_menu_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/page-menu.js */ "./src/components/page-menu.js");
/* harmony import */ var _js_CurrentUser_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/CurrentUser.js */ "./src/js/CurrentUser.js");
/* harmony import */ var _data_users_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./data/users.json */ "./src/data/users.json");
var _data_users_json__WEBPACK_IMPORTED_MODULE_7___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./data/users.json */ "./src/data/users.json", 1);
/* harmony import */ var _data_posts_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./data/posts.json */ "./src/data/posts.json");
var _data_posts_json__WEBPACK_IMPORTED_MODULE_8___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./data/posts.json */ "./src/data/posts.json", 1);











class PostsApp {
	constructor(target){
		this.CurrentUser = null;
		this.targetElement = target;
		this.LoadData();
		this.SetUser();
		this.Render();	
	}
	
	LoadData(){		

		var ls = window.localStorage;		
		if (ls.getItem('Users') == null) {
			ls.setItem("Users", JSON.stringify(_data_users_json__WEBPACK_IMPORTED_MODULE_7__));
		}
		if (ls.getItem('Posts') == null) {
			ls.setItem("Posts", JSON.stringify(_data_posts_json__WEBPACK_IMPORTED_MODULE_8__));
		}	
	}

	SetUser(){	
		this.CurrentUser = Object(_js_CurrentUser_js__WEBPACK_IMPORTED_MODULE_6__["GetCurrentUser"])();
	}

	Render(){	
		this.RenderPage();
		this.RenderHeader();		
	}

	RenderPage(){	
		var attributes = [];	
		attributes["data-user-id"] = this.CurrentUser.id;	
		attributes["data-user-name"] = this.CurrentUser.username;
		attributes["data-user-pic"] = this.CurrentUser.pic;	
		
		this.RenderElement(this.targetElement, "posts-page", attributes);
	}

	RenderHeader(){		
		var attributes = [];	
		attributes["data-user-id"] = this.CurrentUser.id;	
		attributes["data-user-pic"] = this.CurrentUser.pic;	
		
		this.RenderElement("#header", "page-menu", attributes);
	}

	RenderElement(containerSelector, elementTag, attributes){
		var container = document.querySelector(containerSelector);
		var elem = document.createElement(elementTag);

		var keys = Object.keys(attributes);
		for (let key of keys) {
			elem.setAttribute(key, attributes[key]);			
		}
		
		container.appendChild(elem);
	}
}




window.onload = function(e){
	var postsApp = new PostsApp("#page");
	
}

/***/ }),

/***/ "./src/js/CurrentUser.js":
/*!*******************************!*\
  !*** ./src/js/CurrentUser.js ***!
  \*******************************/
/*! exports provided: GetCurrentUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetCurrentUser", function() { return GetCurrentUser; });
/* harmony import */ var _js_DataStore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/DataStore.js */ "./src/js/DataStore.js");



var currentUser = null;
const currentUserId = 5;

function GetCurrentUser() {
	if(currentUser == null) {
		currentUser = _js_DataStore_js__WEBPACK_IMPORTED_MODULE_0__["dataStore"].GetDataById("Users", currentUserId);
	}
	return currentUser;			
}

/***/ }),

/***/ "./src/js/DataStore.js":
/*!*****************************!*\
  !*** ./src/js/DataStore.js ***!
  \*****************************/
/*! exports provided: dataStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataStore", function() { return dataStore; });
class DataStore {
	
	constructor(){
		this.ls = window.localStorage;
	}
	
	AddData(table, row){
		var tableData = this.ls.getItem(table);
		if (tableData == null) {	
			row.id = 1;
			tableData = [row];
		} else {
			tableData = JSON.parse(tableData);			
			row.id = tableData.length + 1;
			tableData.push(row);
		}		
		this.ls.setItem(table, JSON.stringify(tableData));			
	}
	
	GetDataById(table, id){
		var tableData = this.ls.getItem(table);
		if (tableData != null) {		
			tableData = JSON.parse(tableData);			
			return tableData[id-1];
		}
		return null;
	}
	
	GetTableData(table){
		var tableData = this.ls.getItem(table);
		if (tableData != null) {		
			tableData = JSON.parse(tableData);			
			return tableData;
		}
		return null;
	}
	
	SaveTableData(table, data){
		this.ls.setItem(table, JSON.stringify(data));
	}		
}

const dataStore = new DataStore();

/***/ }),

/***/ "./src/js/PostsController.js":
/*!***********************************!*\
  !*** ./src/js/PostsController.js ***!
  \***********************************/
/*! exports provided: postsController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postsController", function() { return postsController; });
/* harmony import */ var _DataStore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DataStore.js */ "./src/js/DataStore.js");


class PostsController {
	constructor(){
		this.ls = window.localStorage;
		this.PostsPage = null;
	}
	
	AddPost(userId, content) {
		var post = {
			"id" : 0,
			"userId": userId,
			"date" : Date.now(),
			"content": content,
			"comments" : []			
		}	
		
		_DataStore_js__WEBPACK_IMPORTED_MODULE_0__["dataStore"].AddData("Posts", post);
		if(this.PostsPage != null) {
			this.PostsPage.AddPost(post);
		}				
	}	
	
	AddComment(userId, postId, content){
		var comment = {
			"id" : 0,
			"userId": userId,
			"postId": postId,
			"date" : Date.now(),
			"content": content			
		}	
		
		var PostsData = _DataStore_js__WEBPACK_IMPORTED_MODULE_0__["dataStore"].GetTableData("Posts");
		
		if(PostsData != null && PostsData[postId - 1] != null){
			comment.id = PostsData[postId - 1].comments.length;
			PostsData[postId - 1].comments.push(comment);		
			_DataStore_js__WEBPACK_IMPORTED_MODULE_0__["dataStore"].SaveTableData("Posts", PostsData);			
			this.PostsPage.OnCommentAdded(comment);
		}							
	}
	DeletePost(postId, UserPostElement){
		
		var PostsData = _DataStore_js__WEBPACK_IMPORTED_MODULE_0__["dataStore"].GetTableData("Posts");
		
		if(PostsData != null && PostsData[postId - 1] != null){
			PostsData = this.DeleteFromArray(PostsData, postId - 1);
			_DataStore_js__WEBPACK_IMPORTED_MODULE_0__["dataStore"].SaveTableData("Posts", PostsData);			
			UserPostElement.OnDeleted();
		}							
	}
	
	DeleteComment(postId, commentId, UserCommentElement){
		var PostsData = _DataStore_js__WEBPACK_IMPORTED_MODULE_0__["dataStore"].GetTableData("Posts");
		
		if(PostsData != null && PostsData[postId - 1] != null){
			for(var i = 0; i < PostsData[postId-1].comments.length; i++){
				if(PostsData[postId-1].comments[i].id == commentId){
					PostsData[postId-1].comments.splice(i, 1);
				}
			}			
			_DataStore_js__WEBPACK_IMPORTED_MODULE_0__["dataStore"].SaveTableData("Posts", PostsData);			
			UserCommentElement.OnDeleted();
		}							
	}
	
	DeleteFromArray(dataSet, index){
		if(index == dataSet.length - 1){
			dataSet.splice(index, 1);
		} else {
			dataSet[index] = null;
		}
		return dataSet;
	}	
}

const postsController = new PostsController();

/***/ }),

/***/ "./src/normalize.css":
/*!***************************!*\
  !*** ./src/normalize.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./normalize.css */ "./node_modules/css-loader/dist/cjs.js!./src/normalize.css");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),

/***/ "./src/shadowCSS.js":
/*!**************************!*\
  !*** ./src/shadowCSS.js ***!
  \**************************/
/*! exports provided: mainCSS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mainCSS", function() { return mainCSS; });

const mainCSS = new CSSStyleSheet();

mainCSS.replace( "@import url( normalize.css ); @import url( styles.css );" );

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map