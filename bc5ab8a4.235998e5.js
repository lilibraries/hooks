exports.ids = [25];
exports.modules = {

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "frontMatter", function() { return /* binding */ frontMatter; });
__webpack_require__.d(__webpack_exports__, "metadata", function() { return /* binding */ metadata; });
__webpack_require__.d(__webpack_exports__, "toc", function() { return /* binding */ toc; });
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ MDXContent; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(308);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/@mdx-js/react/dist/esm.js
var esm = __webpack_require__(307);

// EXTERNAL MODULE: ./examples/ExampleBox.tsx
var ExampleBox = __webpack_require__(310);

// EXTERNAL MODULE: ./src/index.ts + 36 modules
var src = __webpack_require__(313);

// CONCATENATED MODULE: ./examples/UseRerenderExample.tsx


var count = 0;

function Example() {
  var rerender = Object(src["k" /* useRerender */])();

  function handleClick() {
    count++;
    rerender();
  }

  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("button", {
    onClick: handleClick
  }, "+1"), " ", count);
}

/* harmony default export */ var UseRerenderExample = (Example);
// CONCATENATED MODULE: ./docs/useRerender.mdx
const frontMatter={};const metadata={"unversionedId":"useRerender","id":"useRerender","isDocsHomePage":false,"title":"useRerender","description":"This hook returns a function that you can use to rerender the component. It is usually used to rerender mutable data.","source":"@site/docs/useRerender.mdx","slug":"/useRerender","permalink":"/hooks/useRerender","version":"current","sidebar":"docs","previous":{"title":"useCreate","permalink":"/hooks/useCreate"}};/* @jsxRuntime classic */ /* @jsx mdx */const toc=[{value:'Usage',id:'usage',children:[]},{value:'Example',id:'example',children:[]}];const layoutProps={toc};const MDXLayout="wrapper";function MDXContent({components,...props}){return Object(esm["b" /* mdx */])(MDXLayout,Object(esm_extends["a" /* default */])({},layoutProps,props,{components:components,mdxType:"MDXLayout"}),Object(esm["b" /* mdx */])("p",null,`This hook returns a function that you can use to rerender the component. It is usually used to rerender mutable data.`),Object(esm["b" /* mdx */])("h2",{"id":"usage"},`Usage`),Object(esm["b" /* mdx */])("pre",null,Object(esm["b" /* mdx */])("code",{parentName:"pre","className":"language-ts"},`function useRerender(): () => void;
`)),Object(esm["b" /* mdx */])("h2",{"id":"example"},`Example`),Object(esm["b" /* mdx */])(ExampleBox["a" /* default */],{mdxType:"ExampleBox"},Object(esm["b" /* mdx */])(UseRerenderExample,{mdxType:"UseRerenderExample"})),Object(esm["b" /* mdx */])("pre",null,Object(esm["b" /* mdx */])("code",{parentName:"pre","className":"language-tsx"},`import React from "react";
import { useRerender } from "@lilib/hooks";

let count = 0;

function Example() {
  const rerender = useRerender();

  function handleClick() {
    count++;
    rerender();
  }

  return (
    <>
      <button onClick={handleClick}>+1</button> {count}
    </>
  );
}

export default Example;
`)));};MDXContent.isMDXComponent=true;

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MDXContext */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MDXProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createElement; });
/* unused harmony export useMDXComponents */
/* unused harmony export withMDXComponents */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var isFunction = function isFunction(obj) {
  return typeof obj === 'function';
};

var MDXContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({});
var withMDXComponents = function withMDXComponents(Component) {
  return function (props) {
    var allComponents = useMDXComponents(props.components);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, _extends({}, props, {
      components: allComponents
    }));
  };
};
var useMDXComponents = function useMDXComponents(components) {
  var contextComponents = react__WEBPACK_IMPORTED_MODULE_0___default.a.useContext(MDXContext);
  var allComponents = contextComponents;

  if (components) {
    allComponents = isFunction(components) ? components(contextComponents) : _objectSpread2(_objectSpread2({}, contextComponents), components);
  }

  return allComponents;
};
var MDXProvider = function MDXProvider(props) {
  var allComponents = useMDXComponents(props.components);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MDXContext.Provider, {
    value: allComponents
  }, props.children);
};

var TYPE_PROP_NAME = 'mdxType';
var DEFAULTS = {
  inlineCode: 'code',
  wrapper: function wrapper(_ref) {
    var children = _ref.children;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {}, children);
  }
};
var MDXCreateElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(function (props, ref) {
  var propComponents = props.components,
      mdxType = props.mdxType,
      originalType = props.originalType,
      parentName = props.parentName,
      etc = _objectWithoutProperties(props, ["components", "mdxType", "originalType", "parentName"]);

  var components = useMDXComponents(propComponents);
  var type = mdxType;
  var Component = components["".concat(parentName, ".").concat(type)] || components[type] || DEFAULTS[type] || originalType;

  if (propComponents) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, _objectSpread2(_objectSpread2({
      ref: ref
    }, etc), {}, {
      components: propComponents
    }));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, _objectSpread2({
    ref: ref
  }, etc));
});
MDXCreateElement.displayName = 'MDXCreateElement';
function createElement (type, props) {
  var args = arguments;
  var mdxType = props && props.mdxType;

  if (typeof type === 'string' || mdxType) {
    var argsLength = args.length;
    var createElementArgArray = new Array(argsLength);
    createElementArgArray[0] = MDXCreateElement;
    var newProps = {};

    for (var key in props) {
      if (hasOwnProperty.call(props, key)) {
        newProps[key] = props[key];
      }
    }

    newProps.originalType = type;
    newProps[TYPE_PROP_NAME] = typeof type === 'string' ? type : mdxType;
    createElementArgArray[1] = newProps;

    for (var i = 2; i < argsLength; i++) {
      createElementArgArray[i] = args[i];
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement.apply(null, createElementArgArray);
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement.apply(null, args);
}




/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _extends; });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ExampleBox_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(311);
/* harmony import */ var _ExampleBox_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ExampleBox_module_css__WEBPACK_IMPORTED_MODULE_1__);



var ExampleBox = function ExampleBox(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _ExampleBox_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.exampleBox
  }, children);
};

/* harmony default export */ __webpack_exports__["a"] = (ExampleBox);

/***/ }),

/***/ 311:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"exampleBox": "exampleBox_3he9"
};


/***/ }),

/***/ 312:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (true) {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "r", function() { return /* reexport */ src_useUpdate; });
__webpack_require__.d(__webpack_exports__, "q", function() { return /* reexport */ src_useToggle; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* reexport */ src_useDebounced; });
__webpack_require__.d(__webpack_exports__, "n", function() { return /* reexport */ src_useThrottled; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* reexport */ src_useDebounce; });
__webpack_require__.d(__webpack_exports__, "m", function() { return /* reexport */ src_useThrottle; });
__webpack_require__.d(__webpack_exports__, "o", function() { return /* reexport */ src_useTimeout; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* reexport */ src_useInterval; });
__webpack_require__.d(__webpack_exports__, "h", function() { return /* reexport */ src_useNextFrame; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ src_useAnimation; });
__webpack_require__.d(__webpack_exports__, "p", function() { return /* reexport */ src_useTitle; });
__webpack_require__.d(__webpack_exports__, "i", function() { return /* reexport */ src_useOnline; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* reexport */ useDarkMode; });
__webpack_require__.d(__webpack_exports__, "s", function() { return /* reexport */ src_useWindowSize; });
__webpack_require__.d(__webpack_exports__, "j", function() { return /* reexport */ src_usePageVisible; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ src_useCookie; });
__webpack_require__.d(__webpack_exports__, "g", function() { return /* reexport */ src_useLocalStorage; });
__webpack_require__.d(__webpack_exports__, "l", function() { return /* reexport */ src_useSessionStorage; });
__webpack_require__.d(__webpack_exports__, "k", function() { return /* reexport */ src_useRerender; });

// UNUSED EXPORTS: useMount, useUnmount, useUpdateLayoutEffect, useIsomorphicLayoutEffect, usePersist, useRaf, useIdle, useMounted, useLastest, usePrevious, useFavicon, useEventListener, useCreate

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);

// CONCATENATED MODULE: ./src/useMount.ts


function useMount(effect) {
  Object(react["useEffect"])(function () {
    effect();
  }, [] // eslint-disable-line
  );
}

/* harmony default export */ var src_useMount = (useMount);
// CONCATENATED MODULE: ./src/useUpdate.ts


function useUpdate(effect, deps) {
  var mountedRef = Object(react["useRef"])(false);
  Object(react["useEffect"])(function () {
    if (mountedRef.current) {
      return effect();
    } else {
      mountedRef.current = true;
    }
  }, deps // eslint-disable-line
  );
}

/* harmony default export */ var src_useUpdate = (useUpdate);
// CONCATENATED MODULE: ./src/useUnmount.ts


function useUnmount(effect) {
  var effectRef = Object(react["useRef"])(effect);
  effectRef.current = effect;
  Object(react["useEffect"])(function () {
    return function () {
      effectRef.current();
    };
  }, []);
}

/* harmony default export */ var src_useUnmount = (useUnmount);
// CONCATENATED MODULE: ./src/useIsomorphicLayoutEffect.ts

var useIsomorphicLayoutEffect = typeof window !== "undefined" && typeof document !== "undefined" ? react["useLayoutEffect"] : react["useEffect"];
/* harmony default export */ var src_useIsomorphicLayoutEffect = (useIsomorphicLayoutEffect);
// CONCATENATED MODULE: ./src/useUpdateLayoutEffect.ts



function useUpdateLayoutEffect(effect, deps) {
  var mountedRef = Object(react["useRef"])(false);
  src_useIsomorphicLayoutEffect(function () {
    if (mountedRef.current) {
      return effect();
    } else {
      mountedRef.current = true;
    }
  }, deps // eslint-disable-line
  );
}

/* harmony default export */ var src_useUpdateLayoutEffect = (useUpdateLayoutEffect);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(65);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// CONCATENATED MODULE: ./src/useToggle.ts



function useToggle() {
  var initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var _useState = Object(react["useState"])(!!initialValue),
      _useState2 = slicedToArray_default()(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var toggle = Object(react["useCallback"])(function (newValue) {
    if (newValue !== undefined) {
      setValue(!!newValue);
    } else {
      setValue(function (value) {
        return !value;
      });
    }
  }, []);
  var toggleOn = Object(react["useCallback"])(function () {
    setValue(true);
  }, []);
  var toggleOff = Object(react["useCallback"])(function () {
    setValue(false);
  }, []);
  return [value, {
    toggle: toggle,
    toggleOn: toggleOn,
    toggleOff: toggleOff
  }];
}

/* harmony default export */ var src_useToggle = (useToggle);
// CONCATENATED MODULE: ./src/utils.ts
var is = Object.is || // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#polyfill
function (x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y; // eslint-disable-line
  }
};
function areDepsEqual(prevDeps, nextDeps) {
  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (is(nextDeps[i], prevDeps[i])) {
      continue;
    }

    return false;
  }

  return true;
}
function extname(url) {
  if (typeof url === "string" && url !== "") {
    var blocks = url.split(/[#?]/);

    if (blocks.length) {
      var pathname = blocks[0];
      var chunks = pathname.split(".");

      if (chunks.length > 1) {
        return chunks.pop().trim().toLowerCase();
      }
    }
  }

  return "";
}
// CONCATENATED MODULE: ./src/useLastest.ts


function useLastest(value) {
  var valueRef = Object(react["useRef"])(value);
  valueRef.current = value;
  return valueRef;
}

/* harmony default export */ var src_useLastest = (useLastest);
// CONCATENATED MODULE: ./src/usePersist.ts



function usePersist(callback) {
  var lastestCallbackRef = src_useLastest(callback);
  var persistedCallbackRef = Object(react["useRef"])();

  if (persistedCallbackRef.current === undefined) {
    persistedCallbackRef.current = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return lastestCallbackRef.current.apply(this, args);
    };
  }

  return persistedCallbackRef.current;
}

/* harmony default export */ var src_usePersist = (usePersist);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(42);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// CONCATENATED MODULE: ./src/createDebounceHook.ts





function createDebounceHook() {
  var throttle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return function (callback, options) {
    var wait;
    var leading = false;
    var trailing = true;

    if (typeof options === "number") {
      wait = options;
    } else if (typeof_default()(options) === "object" && options) {
      if ("wait" in options) {
        wait = +options.wait;
      }

      if ("leading" in options) {
        leading = !!options.leading;
      }

      if ("trailing" in options) {
        trailing = !!options.trailing;
      }
    }

    var thisRef = Object(react["useRef"])();
    var argsRef = Object(react["useRef"])();
    var resultRef = Object(react["useRef"])();
    var timerRef = Object(react["useRef"])();
    var lastCallTimeRef = Object(react["useRef"])();
    var lastExecuteTimeRef = Object(react["useRef"])();
    var handler = src_usePersist(function () {
      var now = Date.now();
      var lastCallTime = lastCallTimeRef.current;
      var lastExecuteTime = lastExecuteTimeRef.current;
      var sinceLastCall = now - lastCallTime;
      var sinceLastExecute = now - lastExecuteTime;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (sinceLastCall >= wait || throttle && sinceLastExecute >= wait) {
        timerRef.current = undefined;
        lastCallTimeRef.current = undefined;

        if (trailing && argsRef.current) {
          lastExecuteTimeRef.current = now;
          resultRef.current = callback.apply(thisRef.current, argsRef.current);
        }
      } else {
        var lastCallRemaining = wait - sinceLastCall;
        var lastExecuteRemaining = wait - sinceLastExecute;
        var remaining = throttle ? Math.min(lastCallRemaining, lastExecuteRemaining) : lastCallRemaining;
        timerRef.current = setTimeout(handler, remaining);
      }
    });
    var debounced = src_usePersist(function () {
      var now = Date.now();
      var lastCallTime = lastCallTimeRef.current; // @ts-ignore

      thisRef.current = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      argsRef.current = args;
      lastCallTimeRef.current = now;

      if ((lastCallTime === undefined || now - lastCallTime >= wait) && timerRef.current === undefined) {
        lastExecuteTimeRef.current = now;
        timerRef.current = setTimeout(handler, wait);

        if (leading) {
          resultRef.current = callback.apply(thisRef.current, argsRef.current);
        }
      }

      return resultRef.current;
    });
    var cancel = Object(react["useCallback"])(function () {
      if (timerRef.current !== undefined) {
        clearTimeout(timerRef.current);
        timerRef.current = undefined;
      }

      thisRef.current = undefined;
      argsRef.current = undefined;
      lastCallTimeRef.current = undefined;
      lastExecuteTimeRef.current = undefined;
    }, []);
    var flush = src_usePersist(function () {
      if (timerRef.current !== undefined && argsRef.current) {
        resultRef.current = callback.apply(thisRef.current, argsRef.current);
        cancel();
      }

      return resultRef.current;
    });
    src_useUnmount(cancel);
    return [debounced, {
      flush: flush,
      cancel: cancel
    }];
  };
}

/* harmony default export */ var src_createDebounceHook = (createDebounceHook);
// CONCATENATED MODULE: ./src/createDebouncedHook.ts








function createDebouncedValueHook() {
  var throttle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var useDebounce = src_createDebounceHook(throttle);
  return function (value, options) {
    var valueRef = src_useLastest(value);

    var _useState = Object(react["useState"])(value),
        _useState2 = slicedToArray_default()(_useState, 2),
        debouncedValue = _useState2[0],
        setDebouncedValue = _useState2[1];

    var debouncedValueRef = Object(react["useRef"])(debouncedValue);

    function changeValue(newValue) {
      if (!is(debouncedValueRef.current, newValue)) {
        debouncedValueRef.current = newValue;
        setDebouncedValue(newValue);
      }
    }

    var _useDebounce = useDebounce(changeValue, options),
        _useDebounce2 = slicedToArray_default()(_useDebounce, 2),
        changeDelay = _useDebounce2[0],
        cancel = _useDebounce2[1].cancel;

    var flush = src_usePersist(function (finalValue) {
      cancel();

      if (arguments.length > 0) {
        changeValue(finalValue);
      } else {
        changeValue(valueRef.current);
      }
    });
    src_useUpdate(function () {
      changeDelay(value);
    }, [value] // eslint-disable-line
    );
    return [debouncedValue, {
      flush: flush,
      cancel: cancel
    }];
  };
}

/* harmony default export */ var createDebouncedHook = (createDebouncedValueHook);
// CONCATENATED MODULE: ./src/useDebounced.ts

var useDebounced = createDebouncedHook(false);
/* harmony default export */ var src_useDebounced = (useDebounced);
// CONCATENATED MODULE: ./src/useThrottled.ts

var useThrottled = createDebouncedHook(true);
/* harmony default export */ var src_useThrottled = (useThrottled);
// CONCATENATED MODULE: ./src/useDebounce.ts

var useDebounce_useDebounce = src_createDebounceHook(false);
/* harmony default export */ var src_useDebounce = (useDebounce_useDebounce);
// CONCATENATED MODULE: ./src/useThrottle.ts

var useThrottle = src_createDebounceHook(true);
/* harmony default export */ var src_useThrottle = (useThrottle);
// CONCATENATED MODULE: ./src/useTimeout.ts





function useTimeout(callback, ms) {
  var handler = src_usePersist(callback);
  var timerRef = Object(react["useRef"])();
  var cancel = Object(react["useCallback"])(function () {
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);
  var start = src_usePersist(function () {
    cancel();
    timerRef.current = setTimeout(handler, ms);
  });
  src_useUpdate(function () {
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(handler, ms);
    }
  }, [ms] // eslint-disable-line
  );
  src_useUnmount(cancel);
  return [start, cancel];
}

/* harmony default export */ var src_useTimeout = (useTimeout);
// CONCATENATED MODULE: ./src/useInterval.ts



function useInterval(callback, ms) {
  var _useTimeout = src_useTimeout(function () {
    callback();
    start();
  }, ms),
      _useTimeout2 = slicedToArray_default()(_useTimeout, 2),
      start = _useTimeout2[0],
      cancel = _useTimeout2[1];

  return [start, cancel];
}

/* harmony default export */ var src_useInterval = (useInterval);
// CONCATENATED MODULE: ./src/useRaf.ts




function useRaf(callback) {
  var timerRef = Object(react["useRef"])();
  var handler = src_usePersist(callback);
  var cancel = Object(react["useCallback"])(function () {
    if (timerRef.current !== undefined) {
      cancelAnimationFrame(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);
  var start = src_usePersist(function () {
    cancel();
    timerRef.current = requestAnimationFrame(function () {
      handler();
    });
  });
  src_useUnmount(cancel);
  return [start, cancel];
}

/* harmony default export */ var src_useRaf = (useRaf);
// CONCATENATED MODULE: ./src/useIdle.ts




function requestIdleCallbackPolyfill(callback) {
  return setTimeout(callback, 1);
}

function cancelIdleCallbackPolyfill(id) {
  clearTimeout(id);
}

var requestIdleCallback = window.requestIdleCallback || requestIdleCallbackPolyfill;
var cancelIdleCallback = window.cancelIdleCallback || cancelIdleCallbackPolyfill;

function useIdle(callback) {
  var timerRef = Object(react["useRef"])();
  var handler = src_usePersist(callback);
  var cancel = Object(react["useCallback"])(function () {
    if (timerRef.current !== undefined) {
      cancelIdleCallback(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);
  var start = src_usePersist(function () {
    cancel();
    timerRef.current = requestIdleCallback(function () {
      handler();
    });
  });
  src_useUnmount(cancel);
  return [start, cancel];
}

/* harmony default export */ var src_useIdle = (useIdle);
// CONCATENATED MODULE: ./src/useNextFrame.ts




function useNextFrame(callback) {
  var timerRef = Object(react["useRef"])();
  var handler = src_usePersist(callback);
  var cancel = Object(react["useCallback"])(function () {
    if (timerRef.current !== undefined) {
      cancelAnimationFrame(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);
  var start = src_usePersist(function () {
    cancel(); // Use `requestAnimationFrame` twice to ensure the `callback` is invoked
    // after the current painting in all browsers.
    // See: https://github.com/whatwg/html/issues/2569

    timerRef.current = requestAnimationFrame(function () {
      timerRef.current = requestAnimationFrame(handler);
    });
  });
  src_useUnmount(cancel);
  return [start, cancel];
}

/* harmony default export */ var src_useNextFrame = (useNextFrame);
// CONCATENATED MODULE: ./src/useAnimation.ts





function useAnimation(callback, options) {
  var duration;
  var algorithm;

  if (typeof options === "number") {
    duration = options;
  } else if (typeof_default()(options) === "object" && options !== null) {
    if ("duration" in options) {
      duration = +options.duration;
    }

    if (typeof options.algorithm === "function") {
      algorithm = options.algorithm;
    }
  }

  var timerRef = Object(react["useRef"])();
  var startTimeRef = Object(react["useRef"])();
  var handler = src_usePersist(callback);
  var step = src_usePersist(function (timestamp) {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = timestamp;
    }

    var elapsed = timestamp - startTimeRef.current;
    var percent = duration > 0 ? elapsed / duration : 1;
    if (percent < 0) percent = 0;
    if (percent > 1) percent = 1;

    if (percent < 1) {
      timerRef.current = requestAnimationFrame(step);
    }

    if (algorithm) {
      handler(algorithm(percent));
    } else {
      handler(percent);
    }
  });
  var cancel = Object(react["useCallback"])(function () {
    if (timerRef.current !== undefined) {
      cancelAnimationFrame(timerRef.current);
      timerRef.current = undefined;
    }

    startTimeRef.current = undefined;
  }, []);
  var start = src_usePersist(function () {
    cancel();
    timerRef.current = requestAnimationFrame(step);
  });
  src_useUnmount(cancel);
  return [start, cancel];
}

/* harmony default export */ var src_useAnimation = (useAnimation);
// CONCATENATED MODULE: ./src/useMounted.ts



function useMounted() {
  var mounted = Object(react["useRef"])(false);
  src_useMount(function () {
    mounted.current = true;
  });
  return mounted;
}

/* harmony default export */ var src_useMounted = (useMounted);
// CONCATENATED MODULE: ./src/usePrevious.ts


function usePrevious(value) {
  var lastestRef = Object(react["useRef"])(value);
  var previousRef = Object(react["useRef"])(value);
  previousRef.current = lastestRef.current;
  lastestRef.current = value;
  return previousRef;
}

/* harmony default export */ var src_usePrevious = (usePrevious);
// CONCATENATED MODULE: ./src/useTitle.ts





function useTitle(title, options) {
  var mountedRef = src_useMounted();
  var oldTitleRef = Object(react["useRef"])(document.title);
  var previousTitleRef = src_usePrevious(title);

  if (!mountedRef.current || previousTitleRef.current !== title) {
    document.title = title;
  }

  src_useUnmount(function () {
    if (options && options.restore) {
      document.title = oldTitleRef.current;
    }
  });
}

var useNoop = function useNoop() {};

/* harmony default export */ var src_useTitle = (typeof document !== "undefined" ? useTitle : useNoop);
// CONCATENATED MODULE: ./src/useEventListener.ts




function useEventListener(target, type, listener, options) {
  var capture;
  var once;
  var passive;

  if (typeof options === "boolean") {
    capture = options;
  } else if (typeof_default()(options) === "object" && options !== null) {
    if ("capture" in options) capture = !!options.capture;
    if ("once" in options) once = !!options.once;
    if ("passive" in options) passive = !!options.passive;
  }

  var handler = src_usePersist(listener);
  Object(react["useEffect"])(function () {
    if (target && target.addEventListener && target.removeEventListener) {
      target.addEventListener(type, handler, {
        capture: capture,
        once: once,
        passive: passive
      });
      return function () {
        target.removeEventListener(type, handler, {
          capture: capture
        });
      };
    }
  }, [target, type, handler, capture, once, passive]);
}

/* harmony default export */ var src_useEventListener = (useEventListener);
// CONCATENATED MODULE: ./src/useOnline.ts




function useOnline() {
  var _useState = Object(react["useState"])(window.navigator.onLine),
      _useState2 = slicedToArray_default()(_useState, 2),
      online = _useState2[0],
      setOnline = _useState2[1];

  var listener = function listener() {
    return setOnline(window.navigator.onLine);
  };

  src_useEventListener(window, "online", listener);
  src_useEventListener(window, "offline", listener);
  return online;
}

var env = typeof window !== "undefined" && typeof window.navigator !== "undefined" && typeof window.navigator.onLine !== "undefined";
/* harmony default export */ var src_useOnline = (env ? useOnline : function () {
  return true;
});
// CONCATENATED MODULE: ./src/useCreate.ts





function useCreate(create) {
  var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var mountedRef = src_useMounted();
  var previousDepsRef = src_usePrevious(deps);
  var valueRef = Object(react["useRef"])();

  if (!mountedRef.current || !areDepsEqual(previousDepsRef.current, deps)) {
    valueRef.current = create();
  }

  return valueRef.current;
}

/* harmony default export */ var src_useCreate = (useCreate);
// CONCATENATED MODULE: ./src/useFavicon.ts





var mimes = {
  ico: "image/x-icon",
  png: "image/png",
  gif: "image/gif"
};

function useFavicon(href, options) {
  var restore = options ? !!options.restore : false;
  var head = src_useCreate(function () {
    return document.getElementsByTagName("head")[0];
  });
  var oldIconData = src_useCreate(function () {
    var link = document.querySelector("link[rel*='icon']");
    if (link) return {
      type: link.type,
      rel: link.rel,
      href: link.href
    };
  });
  var link = document.querySelector("link[rel*='icon']") || document.createElement("link");
  var mountedRef = src_useMounted();
  var previousHrefRef = src_usePrevious(href);

  if (!mountedRef.current || previousHrefRef.current !== href) {
    link.href = href;
    link.rel = "shortcut icon";
    link.type = mimes[extname(href)] || mimes.ico;

    if (!document.querySelector("link[rel*='icon']")) {
      head.appendChild(link);
    }
  }

  src_useUnmount(function () {
    if (restore) {
      if (oldIconData === undefined) {
        head.removeChild(link);
      } else {
        link.type = oldIconData.type;
        link.rel = oldIconData.rel;
        link.href = oldIconData.href;
      }
    }
  });
}

var useFavicon_useNoop = function useNoop() {};

/* harmony default export */ var src_useFavicon = (typeof document !== "undefined" ? useFavicon : useFavicon_useNoop);
// CONCATENATED MODULE: ./src/useDarkMode.ts




var query = "(prefers-color-scheme: dark)";

function useDarkTheme() {
  var media = src_useCreate(function () {
    return window.matchMedia(query);
  });

  var _useState = Object(react["useState"])(media.matches),
      _useState2 = slicedToArray_default()(_useState, 2),
      dark = _useState2[0],
      setDark = _useState2[1];

  src_useEventListener(media, "change", function (event) {
    setDark(event.matches);
  });
  return dark;
}

var useDarkMode_env = typeof window !== "undefined" && typeof window.matchMedia !== "undefined";
/* harmony default export */ var useDarkMode = (useDarkMode_env ? useDarkTheme : function () {
  return false;
});
// CONCATENATED MODULE: ./src/useWindowSize.ts




function useWindowSize() {
  var _useState = Object(react["useState"])({
    width: window.innerWidth,
    height: window.innerHeight
  }),
      _useState2 = slicedToArray_default()(_useState, 2),
      _useState2$ = _useState2[0],
      width = _useState2$.width,
      height = _useState2$.height,
      setState = _useState2[1];

  function listener() {
    setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  src_useEventListener(window, "resize", listener);
  src_useEventListener(window, "orientationchange", listener);
  return {
    width: width,
    height: height
  };
}

/* harmony default export */ var src_useWindowSize = (typeof window !== "undefined" ? useWindowSize : function () {
  return {
    width: 0,
    height: 0
  };
});
// CONCATENATED MODULE: ./src/usePageVisible.ts




function usePageVisible() {
  var _useState = Object(react["useState"])(!document.hidden),
      _useState2 = slicedToArray_default()(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  src_useEventListener(document, "visibilitychange", function () {
    setVisible(!document.hidden);
  });
  return visible;
}

/* harmony default export */ var src_usePageVisible = (typeof document !== "undefined" ? usePageVisible : function () {
  return true;
});
// EXTERNAL MODULE: ./node_modules/js-cookie/src/js.cookie.js
var js_cookie = __webpack_require__(312);
var js_cookie_default = /*#__PURE__*/__webpack_require__.n(js_cookie);

// CONCATENATED MODULE: ./src/useCookie.ts






function useCookie(name, defaultValue, options) {
  var getCookie = src_usePersist(function () {
    var value = js_cookie_default.a.get(name);
    return value !== undefined ? value : defaultValue;
  });

  var _useState = Object(react["useState"])(getCookie()),
      _useState2 = slicedToArray_default()(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var set = src_usePersist(function (newValue) {
    js_cookie_default.a.set(name, newValue, options);
    setValue(newValue);
  });
  var remove = src_usePersist(function () {
    js_cookie_default.a.remove(name, options);
    setValue(getCookie());
  });
  src_useUpdate(function () {
    setValue(getCookie());
  }, [name] // eslint-disable-line
  );
  src_useUpdate(function () {
    if (js_cookie_default.a.get(name) === undefined) {
      setValue(defaultValue);
    }
  }, [defaultValue] // eslint-disable-line
  );
  return [value, {
    set: set,
    remove: remove
  }];
}

/* harmony default export */ var src_useCookie = (useCookie);
// CONCATENATED MODULE: ./src/createStorageHook.ts






function createStorageHook(storage) {
  if (!storage) {
    return createStorageHook_useNoop;
  }

  function useStorage(key, defaultValue, options) {
    var serialize = options && options.serialize ? options.serialize : JSON.stringify;
    var deserialize = options && options.deserialize ? options.deserialize : JSON.parse;
    var getItem = src_usePersist(function () {
      try {
        var _raw = storage.getItem(key);

        return _raw !== null ? deserialize(_raw) : defaultValue;
      } catch (error) {
        return defaultValue;
      }
    });
    var setItem = src_usePersist(function (value) {
      try {
        storage.setItem(key, serialize(value));
      } catch (error) {}
    });
    var removeItem = src_usePersist(function () {
      storage.removeItem(key);
    });

    var _useState = Object(react["useState"])(getItem()),
        _useState2 = slicedToArray_default()(_useState, 2),
        value = _useState2[0],
        setValue = _useState2[1];

    var set = src_usePersist(function (newValue) {
      setItem(newValue);
      setValue(newValue);
    });
    var remove = src_usePersist(function () {
      removeItem();
      setValue(getItem());
    });
    src_useUpdate(function () {
      setValue(getItem());
    }, [key] // eslint-disable-line
    );
    src_useUpdate(function () {
      if (storage.getItem(key) === null) {
        setValue(defaultValue);
      }
    }, [defaultValue] // eslint-disable-line
    );
    Object(react["useEffect"])(function () {
      function listener(event) {
        if (event.storageArea === storage && event.key === key) {
          setValue(getItem());
        }
      }

      if ((typeof window === "undefined" ? "undefined" : typeof_default()(window)) !== undefined) {
        window.addEventListener("storage", listener);
        return function () {
          return window.removeEventListener("storage", listener);
        };
      }
    }, [key] // eslint-disable-line
    );
    return [value, {
      set: set,
      remove: remove
    }];
  }

  return useStorage;
}

function createStorageHook_useNoop(key, defaultValue) {
  var storageRef = Object(react["useRef"])();

  var _useState3 = Object(react["useState"])(defaultValue),
      _useState4 = slicedToArray_default()(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var set = src_usePersist(function (newValue) {
    storageRef.current = newValue;
    setValue(newValue);
  });
  var remove = src_usePersist(function () {
    setValue(defaultValue);
  });
  src_useUpdate(function () {
    storageRef.current = undefined;
    setValue(defaultValue);
  }, [key] // eslint-disable-line
  );
  src_useUpdate(function () {
    if (storageRef.current === undefined) {
      setValue(defaultValue);
    }
  }, [defaultValue]);
  return [value, {
    set: set,
    remove: remove
  }];
}

/* harmony default export */ var src_createStorageHook = (createStorageHook);
// CONCATENATED MODULE: ./src/useLocalStorage.ts

var useLocalStorage = src_createStorageHook(typeof localStorage !== "undefined" ? localStorage : null);
/* harmony default export */ var src_useLocalStorage = (useLocalStorage);
// CONCATENATED MODULE: ./src/useSessionStorage.ts

var useSessionStorage = src_createStorageHook(typeof sessionStorage !== "undefined" ? sessionStorage : null);
/* harmony default export */ var src_useSessionStorage = (useSessionStorage);
// CONCATENATED MODULE: ./src/useRerender.ts



function useRerender() {
  var _useState = Object(react["useState"])({}),
      _useState2 = slicedToArray_default()(_useState, 2),
      setSignal = _useState2[1];

  var rerender = Object(react["useCallback"])(function () {
    setSignal({});
  }, []);
  return rerender;
}

/* harmony default export */ var src_useRerender = (useRerender);
// CONCATENATED MODULE: ./src/index.ts
// Lifecycles




 // States



 // Callbacks









 // Refs



 // BOM and DOM










 // Utils




/***/ })

};;