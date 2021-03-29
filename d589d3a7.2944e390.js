exports.ids = [30];
exports.modules = {

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frontMatter", function() { return frontMatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "metadata", function() { return metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toc", function() { return toc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MDXContent; });
/* harmony import */ var _Users_liweisheng_Projects_lilib_hooks_node_modules_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(308);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mdx_js_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(307);
const frontMatter={title:'Getting Started',slug:'/'};const metadata={"unversionedId":"getting-started","id":"getting-started","isDocsHomePage":false,"title":"Getting Started","description":"@lilib/hooks is a React hooks library.","source":"@site/docs/getting-started.md","slug":"/","permalink":"/hooks/","version":"current","sidebar":"docs","next":{"title":"useMount","permalink":"/hooks/useMount"}};/* @jsxRuntime classic */ /* @jsx mdx */const toc=[{value:'Install',id:'install',children:[]},{value:'Example',id:'example',children:[]},{value:'Hooks',id:'hooks',children:[]},{value:'License',id:'license',children:[]}];const layoutProps={toc};const MDXLayout="wrapper";function MDXContent({components,...props}){return Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])(MDXLayout,Object(_Users_liweisheng_Projects_lilib_hooks_node_modules_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({},layoutProps,props,{components:components,mdxType:"MDXLayout"}),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("p",null,`@lilib/hooks is a React hooks library.`),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("h2",{"id":"install"},`Install`),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("pre",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("code",{parentName:"pre","className":"language-shell"},`npm install --save @lilib/hooks
# Or
yarn add @lilib/hooks
`)),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("h2",{"id":"example"},`Example`),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("pre",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("code",{parentName:"pre","className":"language-tsx"},`import React from "react";
import { useMount } from "@lilib/hooks";

function Example() {
  useMount(() => {
    console.log("Component is mounted");
  });
  ...
}
`)),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("h2",{"id":"hooks"},`Hooks`),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("table",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("thead",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("th",null,"Category"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("th",null,"Hook"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("th",null,"Description"))),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tbody",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",{rowspan:"5"},"Lifecycles"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useMount"},"useMount")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Run effect after the component is mounted")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useUpdate"},"useUpdate")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Run effect on the component or the deps update")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useUnmount"},"useUnmount")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Run effect on the component unmount")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useUpdateLayoutEffect"},"useUpdateLayoutEffect")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"It's similar to useUpdate")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useIsomorphicLayoutEffect"},"useIsomorphicLayoutEffect")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Isomorphic layout effect")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",{rowspan:"3"},"States"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useToggle"},"useToggle")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Use boolean value")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useDebounced"},"useDebounced")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Debounce a value")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useThrottled"},"useThrottled")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Throttle a value")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",{rowspan:"9"},"Callbacks"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./usePersist"},"usePersist")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Returns the same function no matter whether the callback param changes")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useDebounce"},"useDebounce")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Use debounced callback")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useThrottle"},"useThrottle")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Use throttled callback")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useTimeout"},"useTimeout")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Delay running callback")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useInterval"},"useInterval")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Loop run callback")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useRaf"},"useRaf")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Use requestAnimationFrame to invoke the callback before the browser repainting")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useIdle"},"useIdle")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Invoke the callback when the browser is idle")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useNextFrame"},"useNextFrame")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Ensure the callback is invoked after the current paiting")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useAnimation"},"useAnimation")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Use this hook to perform JavaScript animation")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",{rowspan:"3"},"Refs"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useMounted"},"useMounted")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Returns a ref object to track if the component is mounted")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useLastest"},"useLastest")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Returns a ref object whose ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("code",null,".current")," property is assigned to lastest updated value")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./usePrevious"},"usePrevious")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Returns a ref object whose ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("code",null,".current")," property is assigned to previous updated value")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",{rowspan:"10"},"Refs"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useTitle"},"useTitle")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Set document title")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useFavicon"},"useFavicon")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Set document favicon")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useOnline"},"useOnline")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Detect whether the network is online")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useDarkMode"},"useDarkMode")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Detect whether the system prefers color schema is dark")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./usePageVisible"},"usePageVisible")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Detect whether the page is visible")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useWindowSize"},"useWindowSize")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Returns window width and height")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useEventListener"},"useEventListener")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Sets up the event listener to the target")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useCookie"},"useCookie")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Get or set cookie")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useLocalStorage"},"useLocalStorage")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Get or set localStorage")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useSessionStorage"},"useSessionStorage")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Get or set sessionStorage")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",{rowspan:"2"},"Utils"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useTitle"},"useCreate")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"It's similar to React.useMemo")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("tr",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("a",{href:"./useRerender"},"useRerender")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("td",null,"Returns a function that you can use to rerender the component")))),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("h2",{"id":"license"},`License`),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__[/* mdx */ "b"])("p",null,`Code licensed MIT, docs CC BY 3.0.`));};MDXContent.isMDXComponent=true;

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

/***/ })

};;