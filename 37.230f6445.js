exports.ids = [37];
exports.modules = {

/***/ 309:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var useThemeConfig_1 = __webpack_require__(324);

Object.defineProperty(exports, "useThemeConfig", {
  enumerable: true,
  get: function get() {
    return useThemeConfig_1.useThemeConfig;
  }
});

var searchUtils_1 = __webpack_require__(328);

Object.defineProperty(exports, "docVersionSearchTag", {
  enumerable: true,
  get: function get() {
    return searchUtils_1.docVersionSearchTag;
  }
});
Object.defineProperty(exports, "DEFAULT_SEARCH_TAG", {
  enumerable: true,
  get: function get() {
    return searchUtils_1.DEFAULT_SEARCH_TAG;
  }
});

var docsUtils_1 = __webpack_require__(325);

Object.defineProperty(exports, "isDocsPluginEnabled", {
  enumerable: true,
  get: function get() {
    return docsUtils_1.isDocsPluginEnabled;
  }
});

var pathUtils_1 = __webpack_require__(332);

Object.defineProperty(exports, "isSamePath", {
  enumerable: true,
  get: function get() {
    return pathUtils_1.isSamePath;
  }
});

var generalUtils_1 = __webpack_require__(333);

Object.defineProperty(exports, "useTitleFormatter", {
  enumerable: true,
  get: function get() {
    return generalUtils_1.useTitleFormatter;
  }
});

var useDocsPreferredVersion_1 = __webpack_require__(334);

Object.defineProperty(exports, "useDocsPreferredVersion", {
  enumerable: true,
  get: function get() {
    return useDocsPreferredVersion_1.useDocsPreferredVersion;
  }
});
Object.defineProperty(exports, "useDocsPreferredVersionByPluginId", {
  enumerable: true,
  get: function get() {
    return useDocsPreferredVersion_1.useDocsPreferredVersionByPluginId;
  }
});

var DocsPreferredVersionProvider_1 = __webpack_require__(326);

Object.defineProperty(exports, "DocsPreferredVersionContextProvider", {
  enumerable: true,
  get: function get() {
    return DocsPreferredVersionProvider_1.DocsPreferredVersionContextProvider;
  }
});

/***/ }),

/***/ 314:
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
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

module.exports = _extends;

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function toVal(mix) {
	var k, y, str='';

	if (typeof mix === 'string' || typeof mix === 'number') {
		str += mix;
	} else if (typeof mix === 'object') {
		if (Array.isArray(mix)) {
			for (k=0; k < mix.length; k++) {
				if (mix[k]) {
					if (y = toVal(mix[k])) {
						str && (str += ' ');
						str += y;
					}
				}
			}
		} else {
			for (k in mix) {
				if (mix[k]) {
					str && (str += ' ');
					str += k;
				}
			}
		}
	}

	return str;
}

/* harmony default export */ __webpack_exports__["a"] = (function () {
	var i=0, tmp, x, str='';
	while (i < arguments.length) {
		if (tmp = arguments[i++]) {
			if (x = toVal(tmp)) {
				str && (str += ' ');
				str += x
			}
		}
	}
	return str;
});


/***/ }),

/***/ 316:
/***/ (function(module, exports, __webpack_require__) {

var objectWithoutPropertiesLoose = __webpack_require__(339);

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
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

module.exports = _objectWithoutProperties;

/***/ }),

/***/ 317:
/***/ (function(module, exports) {

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

module.exports = _defineProperty;

/***/ }),

/***/ 318:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// See https://github.com/facebook/docusaurus/issues/3360
// TODO find a better solution, this shouldn't be needed
// TODO this is not ideal and produce a warning!
// see https://github.com/webpack/webpack/issues/7713#issuecomment-467888437
// note: warning can be filtered: https://github.com/facebook/docusaurus/pull/3382#issuecomment-684966924
try {
  module.exports = __webpack_require__(329);
} catch (e) {
  module.exports = {};
}
/*
throw new Error(
  "The docs plugin is not used, so you can't require the useDocs hooks. ",
);
 */

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MemoryRouter", function() { return react_router_dom__WEBPACK_IMPORTED_MODULE_0__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Prompt", function() { return react_router_dom__WEBPACK_IMPORTED_MODULE_0__["f"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Redirect", function() { return react_router_dom__WEBPACK_IMPORTED_MODULE_0__["g"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return react_router_dom__WEBPACK_IMPORTED_MODULE_0__["h"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return react_router_dom__WEBPACK_IMPORTED_MODULE_0__["i"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StaticRouter", function() { return react_router_dom__WEBPACK_IMPORTED_MODULE_0__["j"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Switch", function() { return react_router_dom__WEBPACK_IMPORTED_MODULE_0__["k"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generatePath", function() { return react_router_dom__WEBPACK_IMPORTED_MODULE_0__["l"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "matchPath", function() { return react_router_dom__WEBPACK_IMPORTED_MODULE_0__["m"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useHistory", function() { return react_router_dom__WEBPACK_IMPORTED_MODULE_0__["n"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLocation", function() { return react_router_dom__WEBPACK_IMPORTED_MODULE_0__["o"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useParams", function() { return react_router_dom__WEBPACK_IMPORTED_MODULE_0__["p"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useRouteMatch", function() { return react_router_dom__WEBPACK_IMPORTED_MODULE_0__["q"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withRouter", function() { return react_router_dom__WEBPACK_IMPORTED_MODULE_0__["r"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BrowserRouter", function() { return react_router_dom__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HashRouter", function() { return react_router_dom__WEBPACK_IMPORTED_MODULE_0__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return react_router_dom__WEBPACK_IMPORTED_MODULE_0__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavLink", function() { return react_router_dom__WEBPACK_IMPORTED_MODULE_0__["e"]; });

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return useBaseUrlUtils; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return useBaseUrl; });
/* harmony import */ var _useDocusaurusContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(66);
/* harmony import */ var _isInternalUrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(323);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



function addBaseUrl(siteUrl, baseUrl, url) {
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$forcePrependBase = _ref.forcePrependBaseUrl,
      forcePrependBaseUrl = _ref$forcePrependBase === void 0 ? false : _ref$forcePrependBase,
      _ref$absolute = _ref.absolute,
      absolute = _ref$absolute === void 0 ? false : _ref$absolute;

  if (!url) {
    return url;
  } // it never makes sense to add a base url to a local anchor url


  if (url.startsWith('#')) {
    return url;
  } // it never makes sense to add a base url to an url with a protocol


  if (Object(_isInternalUrl__WEBPACK_IMPORTED_MODULE_1__[/* hasProtocol */ "b"])(url)) {
    return url;
  }

  if (forcePrependBaseUrl) {
    return baseUrl + url;
  } // We should avoid adding the baseurl twice if it's already there


  var shouldAddBaseUrl = !url.startsWith(baseUrl);
  var basePath = shouldAddBaseUrl ? baseUrl + url.replace(/^\//, '') : url;
  return absolute ? siteUrl + basePath : basePath;
}

function useBaseUrlUtils() {
  var _useDocusaurusContext = Object(_useDocusaurusContext__WEBPACK_IMPORTED_MODULE_0__["default"])(),
      _useDocusaurusContext2 = _useDocusaurusContext.siteConfig;

  _useDocusaurusContext2 = _useDocusaurusContext2 === void 0 ? {} : _useDocusaurusContext2;
  var _useDocusaurusContext3 = _useDocusaurusContext2.baseUrl,
      baseUrl = _useDocusaurusContext3 === void 0 ? '/' : _useDocusaurusContext3,
      siteUrl = _useDocusaurusContext2.url;
  return {
    withBaseUrl: function withBaseUrl(url, options) {
      return addBaseUrl(siteUrl, baseUrl, url, options);
    }
  };
}
function useBaseUrl(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _useBaseUrlUtils = useBaseUrlUtils(),
      withBaseUrl = _useBaseUrlUtils.withBaseUrl;

  return withBaseUrl(url, options);
}

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67);
/* harmony import */ var _isInternalUrl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(323);
/* harmony import */ var _ExecutionEnvironment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(68);
/* harmony import */ var _LinksCollector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(43);
/* harmony import */ var _useBaseUrl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(320);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};






 // TODO all this wouldn't be necessary if we used ReactRouter basename feature
// We don't automatically add base urls to all links,
// only the "safe" ones, starting with / (like /docs/introduction)
// this is because useBaseUrl() actually transforms relative links
// like "introduction" to "/baseUrl/introduction" => bad behavior to fix

var shouldAddBaseUrlAutomatically = function shouldAddBaseUrlAutomatically(to) {
  return to.startsWith('/');
};

function Link(_a) {
  var _b;

  var isNavLink = _a.isNavLink,
      to = _a.to,
      href = _a.href,
      activeClassName = _a.activeClassName,
      isActive = _a.isActive,
      noBrokenLinkCheck = _a['data-noBrokenLinkCheck'],
      _a$autoAddBaseUrl = _a.autoAddBaseUrl,
      autoAddBaseUrl = _a$autoAddBaseUrl === void 0 ? true : _a$autoAddBaseUrl,
      props = __rest(_a, ["isNavLink", "to", "href", "activeClassName", "isActive", 'data-noBrokenLinkCheck', "autoAddBaseUrl"]);

  var _useBaseUrlUtils = Object(_useBaseUrl__WEBPACK_IMPORTED_MODULE_5__[/* useBaseUrlUtils */ "b"])(),
      withBaseUrl = _useBaseUrlUtils.withBaseUrl;

  var linksCollector = Object(_LinksCollector__WEBPACK_IMPORTED_MODULE_4__[/* useLinksCollector */ "c"])(); // IMPORTANT: using to or href should not change anything
  // For example, MDX links will ALWAYS give us the href props
  // Using one prop or the other should not be used to distinguish
  // internal links (/docs/myDoc) from external links (https://github.com)

  var targetLinkUnprefixed = to || href;

  function maybeAddBaseUrl(str) {
    return autoAddBaseUrl && shouldAddBaseUrlAutomatically(str) ? withBaseUrl(str) : str;
  }

  var isInternal = Object(_isInternalUrl__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(targetLinkUnprefixed); // pathname:// is a special "protocol" we use to tell Docusaurus link
  // that a link is not "internal" and that we shouldn't use history.push()
  // this is not ideal but a good enough escape hatch for now
  // see https://github.com/facebook/docusaurus/issues/3309
  // note: we want baseUrl to be appended (see issue for details)
  // TODO read routes and automatically detect internal/external links?

  var targetLinkWithoutPathnameProtocol = targetLinkUnprefixed === null || targetLinkUnprefixed === void 0 ? void 0 : targetLinkUnprefixed.replace('pathname://', ''); // TODO we should use ReactRouter basename feature instead!
  // Automatically apply base url in links that start with /

  var targetLink = typeof targetLinkWithoutPathnameProtocol !== 'undefined' ? maybeAddBaseUrl(targetLinkWithoutPathnameProtocol) : undefined;
  var preloaded = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(false);
  var LinkComponent = isNavLink ? react_router_dom__WEBPACK_IMPORTED_MODULE_1__[/* NavLink */ "e"] : react_router_dom__WEBPACK_IMPORTED_MODULE_1__[/* Link */ "c"];
  var IOSupported = _ExecutionEnvironment__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].canUseIntersectionObserver;
  var io;

  var handleIntersection = function handleIntersection(el, cb) {
    io = new window.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (el === entry.target) {
          // If element is in viewport, stop listening/observing and run callback.
          // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            io.unobserve(el);
            io.disconnect();
            cb();
          }
        }
      });
    }); // Add element to the observer.

    io.observe(el);
  };

  var handleRef = function handleRef(ref) {
    if (IOSupported && ref && isInternal) {
      // If IO supported and element reference found, setup Observer functionality.
      handleIntersection(ref, function () {
        window.docusaurus.prefetch(targetLink);
      });
    }
  };

  var onMouseEnter = function onMouseEnter() {
    if (!preloaded.current) {
      window.docusaurus.preload(targetLink);
      preloaded.current = true;
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    // If IO is not supported. We prefetch by default (only once).
    if (!IOSupported && isInternal) {
      window.docusaurus.prefetch(targetLink);
    } // When unmounting, stop intersection observer from watching.


    return function () {
      if (IOSupported && io) {
        io.disconnect();
      }
    };
  }, [targetLink, IOSupported, isInternal]);
  var isAnchorLink = (_b = targetLink === null || targetLink === void 0 ? void 0 : targetLink.startsWith('#')) !== null && _b !== void 0 ? _b : false;
  var isRegularHtmlLink = !targetLink || !isInternal || isAnchorLink;

  if (targetLink && isInternal && !isAnchorLink && !noBrokenLinkCheck) {
    linksCollector.collectLink(targetLink);
  }

  return isRegularHtmlLink ?
  /*#__PURE__*/
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", Object.assign({
    href: targetLink
  }, targetLinkUnprefixed && !isInternal && {
    target: '_blank',
    rel: 'noopener noreferrer'
  }, props)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LinkComponent, Object.assign({}, props, {
    onMouseEnter: onMouseEnter,
    innerRef: handleRef,
    to: targetLink || ''
  }, isNavLink && {
    isActive: isActive,
    activeClassName: activeClassName
  }));
}

/* harmony default export */ __webpack_exports__["a"] = (Link);

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(340);
/* harmony import */ var _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(316);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(315);
/* harmony import */ var _docusaurus_Link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(321);
/* harmony import */ var _docusaurus_useBaseUrl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(320);
/* harmony import */ var _docusaurus_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(319);
/* harmony import */ var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(309);
/* harmony import */ var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_9__);





/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */







function NavLink(_ref) {
  var activeBasePath = _ref.activeBasePath,
      activeBaseRegex = _ref.activeBaseRegex,
      to = _ref.to,
      href = _ref.href,
      label = _ref.label,
      _ref$activeClassName = _ref.activeClassName,
      activeClassName = _ref$activeClassName === void 0 ? 'navbar__link--active' : _ref$activeClassName,
      prependBaseUrlToHref = _ref.prependBaseUrlToHref,
      props = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3___default()(_ref, ["activeBasePath", "activeBaseRegex", "to", "href", "label", "activeClassName", "prependBaseUrlToHref"]);

  // TODO all this seems hacky
  // {to: 'version'} should probably be forbidden, in favor of {to: '/version'}
  var toUrl = Object(_docusaurus_useBaseUrl__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(to);
  var activeBaseUrl = Object(_docusaurus_useBaseUrl__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(activeBasePath);
  var normalizedHref = Object(_docusaurus_useBaseUrl__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(href, {
    forcePrependBaseUrl: true
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_docusaurus_Link__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, href ? {
    target: '_blank',
    rel: 'noopener noreferrer',
    href: prependBaseUrlToHref ? normalizedHref : href
  } : _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_2___default()({
    isNavLink: true,
    activeClassName: activeClassName,
    to: toUrl
  }, activeBasePath || activeBaseRegex ? {
    isActive: function isActive(_match, location) {
      return activeBaseRegex ? new RegExp(activeBaseRegex).test(location.pathname) : location.pathname.startsWith(activeBaseUrl);
    }
  } : null), props), label);
}

function NavItemDesktop(_ref2) {
  var items = _ref2.items,
      position = _ref2.position,
      className = _ref2.className,
      props = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3___default()(_ref2, ["items", "position", "className"]);

  var dropdownRef = Object(react__WEBPACK_IMPORTED_MODULE_4__["useRef"])(null);
  var dropdownMenuRef = Object(react__WEBPACK_IMPORTED_MODULE_4__["useRef"])(null);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      showDropdown = _useState2[0],
      setShowDropdown = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    var handleClickOutside = function handleClickOutside(event) {
      if (!dropdownRef.current || dropdownRef.current.contains(event.target)) {
        return;
      }

      setShowDropdown(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return function () {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [dropdownRef]);

  var navLinkClassNames = function navLinkClassNames(extraClassName) {
    var isDropdownItem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return Object(clsx__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])({
      'navbar__item navbar__link': !isDropdownItem,
      dropdown__link: isDropdownItem
    }, extraClassName);
  };

  if (!items) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(NavLink, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({
      className: navLinkClassNames(className)
    }, props));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    ref: dropdownRef,
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])('navbar__item', 'dropdown', 'dropdown--hoverable', {
      'dropdown--left': position === 'left',
      'dropdown--right': position === 'right',
      'dropdown--show': showDropdown
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(NavLink, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({
    className: navLinkClassNames(className)
  }, props, {
    onClick: props.to ? undefined : function (e) {
      return e.preventDefault();
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        setShowDropdown(!showDropdown);
      }
    }
  }), props.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("ul", {
    ref: dropdownMenuRef,
    className: "dropdown__menu"
  }, items.map(function (_ref3, i) {
    var childItemClassName = _ref3.className,
        childItemProps = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3___default()(_ref3, ["className"]);

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("li", {
      key: i
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(NavLink, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({
      onKeyDown: function onKeyDown(e) {
        if (i === items.length - 1 && e.key === 'Tab') {
          e.preventDefault();
          setShowDropdown(false);
          var nextNavbarItem = dropdownRef.current.nextElementSibling;

          if (nextNavbarItem) {
            nextNavbarItem.focus();
          }
        }
      },
      activeClassName: "dropdown__link--active",
      className: navLinkClassNames(childItemClassName, true)
    }, childItemProps)));
  })));
}

function NavItemMobile(_ref4) {
  var _menuListRef$current, _menuListRef$current2;

  var items = _ref4.items,
      className = _ref4.className,
      _position = _ref4.position,
      props = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3___default()(_ref4, ["items", "className", "position"]);

  var menuListRef = Object(react__WEBPACK_IMPORTED_MODULE_4__["useRef"])(null);

  var _useLocation = Object(_docusaurus_router__WEBPACK_IMPORTED_MODULE_8__["useLocation"])(),
      pathname = _useLocation.pathname;

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(function () {
    var _items$some;

    return (_items$some = !(items !== null && items !== void 0 && items.some(function (item) {
      return Object(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_9__["isSamePath"])(item.to, pathname);
    }))) !== null && _items$some !== void 0 ? _items$some : true;
  }),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),
      collapsed = _useState4[0],
      setCollapsed = _useState4[1];

  var navLinkClassNames = function navLinkClassNames(extraClassName) {
    var isSubList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return Object(clsx__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])('menu__link', {
      'menu__link--sublist': isSubList
    }, extraClassName);
  };

  if (!items) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("li", {
      className: "menu__list-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(NavLink, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({
      className: navLinkClassNames(className)
    }, props)));
  }

  var menuListHeight = (_menuListRef$current = menuListRef.current) !== null && _menuListRef$current !== void 0 && _menuListRef$current.scrollHeight ? "".concat((_menuListRef$current2 = menuListRef.current) === null || _menuListRef$current2 === void 0 ? void 0 : _menuListRef$current2.scrollHeight, "px") : undefined;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("li", {
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])('menu__list-item', {
      'menu__list-item--collapsed': collapsed
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(NavLink, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({
    role: "button",
    className: navLinkClassNames(className, true)
  }, props, {
    onClick: function onClick() {
      setCollapsed(function (state) {
        return !state;
      });
    }
  }), props.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("ul", {
    className: "menu__list",
    ref: menuListRef,
    style: {
      height: !collapsed ? menuListHeight : undefined
    }
  }, items.map(function (_ref5, i) {
    var childItemClassName = _ref5.className,
        childItemProps = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3___default()(_ref5, ["className"]);

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("li", {
      className: "menu__list-item",
      key: i
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(NavLink, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({
      activeClassName: "menu__link--active",
      className: navLinkClassNames(childItemClassName)
    }, childItemProps, {
      onClick: props.onClick
    })));
  })));
}

function DefaultNavbarItem(_ref6) {
  var _ref6$mobile = _ref6.mobile,
      mobile = _ref6$mobile === void 0 ? false : _ref6$mobile,
      props = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3___default()(_ref6, ["mobile"]);

  var Comp = mobile ? NavItemMobile : NavItemDesktop;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Comp, props);
}

/* harmony default export */ __webpack_exports__["a"] = (DefaultNavbarItem);

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hasProtocol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isInternalUrl; });
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function hasProtocol(url) {
  return /^(\w*:|\/\/)/.test(url) === true;
}
function isInternalUrl(url) {
  return typeof url !== 'undefined' && !hasProtocol(url);
}

/***/ }),

/***/ 324:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useThemeConfig = void 0;
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var useDocusaurusContext_1 = __importDefault(__webpack_require__(66));

function useThemeConfig() {
  return useDocusaurusContext_1["default"]().siteConfig.themeConfig;
}

exports.useThemeConfig = useThemeConfig;

/***/ }),

/***/ 325:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDocsPluginEnabled = void 0;

var useDocs_1 = __webpack_require__(318); // TODO not ideal, see also "useDocs"


exports.isDocsPluginEnabled = !!useDocs_1.useAllDocsData;

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(317);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);





var __createBinding = undefined && undefined.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = undefined && undefined.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = undefined && undefined.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = undefined && undefined.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDocsPreferredVersionContext = exports.DocsPreferredVersionContextProvider = void 0;
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var react_1 = __importStar(__webpack_require__(0));

var useThemeConfig_1 = __webpack_require__(324);

var docsUtils_1 = __webpack_require__(325);

var useDocs_1 = __webpack_require__(318);

var DocsPreferredVersionStorage_1 = __importDefault(__webpack_require__(335)); // Initial state is always null as we can't read localstorage from node SSR


function getInitialState(pluginIds) {
  var initialState = {};
  pluginIds.forEach(function (pluginId) {
    initialState[pluginId] = {
      preferredVersionName: null
    };
  });
  return initialState;
} // Read storage for all docs plugins
// Assign to each doc plugin a preferred version (if found)


function readStorageState(_ref) {
  var pluginIds = _ref.pluginIds,
      versionPersistence = _ref.versionPersistence,
      allDocsData = _ref.allDocsData;

  // The storage value we read might be stale,
  // and belong to a version that does not exist in the site anymore
  // In such case, we remove the storage value to avoid downstream errors
  function restorePluginState(pluginId) {
    var preferredVersionNameUnsafe = DocsPreferredVersionStorage_1["default"].read(pluginId, versionPersistence);
    var pluginData = allDocsData[pluginId];
    var versionExists = pluginData.versions.some(function (version) {
      return version.name === preferredVersionNameUnsafe;
    });

    if (versionExists) {
      return {
        preferredVersionName: preferredVersionNameUnsafe
      };
    } else {
      DocsPreferredVersionStorage_1["default"].clear(pluginId, versionPersistence);
      return {
        preferredVersionName: null
      };
    }
  }

  var initialState = {};
  pluginIds.forEach(function (pluginId) {
    initialState[pluginId] = restorePluginState(pluginId);
  });
  return initialState;
}

function useVersionPersistence() {
  return useThemeConfig_1.useThemeConfig().docs.versionPersistence;
} // Value that  will be accessible through context: [state,api]


function useContextValue() {
  var allDocsData = useDocs_1.useAllDocsData();
  var versionPersistence = useVersionPersistence();
  var pluginIds = react_1.useMemo(function () {
    return Object.keys(allDocsData);
  }, [allDocsData]); // Initial state is empty, as  we can't read browser storage in node/SSR

  var _react_1$useState = react_1.useState(function () {
    return getInitialState(pluginIds);
  }),
      _react_1$useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_react_1$useState, 2),
      state = _react_1$useState2[0],
      setState = _react_1$useState2[1]; // On mount, we set the state read from browser storage


  react_1.useEffect(function () {
    setState(readStorageState({
      allDocsData: allDocsData,
      versionPersistence: versionPersistence,
      pluginIds: pluginIds
    }));
  }, [allDocsData, versionPersistence, pluginIds]); // The API that we expose to consumer hooks (memo for constant object)

  var api = react_1.useMemo(function () {
    function savePreferredVersion(pluginId, versionName) {
      DocsPreferredVersionStorage_1["default"].save(pluginId, versionPersistence, versionName);
      setState(function (s) {
        return Object.assign(Object.assign({}, s), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, pluginId, {
          preferredVersionName: versionName
        }));
      });
    }

    return {
      savePreferredVersion: savePreferredVersion
    };
  }, [setState]);
  return [state, api];
}

var Context = react_1.createContext(null);

function DocsPreferredVersionContextProvider(_ref2) {
  var children = _ref2.children;

  if (docsUtils_1.isDocsPluginEnabled) {
    return react_1["default"].createElement(DocsPreferredVersionContextProviderUnsafe, null, children);
  } else {
    return react_1["default"].createElement(react_1["default"].Fragment, null, children);
  }
}

exports.DocsPreferredVersionContextProvider = DocsPreferredVersionContextProvider;

function DocsPreferredVersionContextProviderUnsafe(_ref3) {
  var children = _ref3.children;
  var contextValue = useContextValue();
  return react_1["default"].createElement(Context.Provider, {
    value: contextValue
  }, children);
}

function useDocsPreferredVersionContext() {
  var value = react_1.useContext(Context);

  if (!value) {
    throw new Error("Can't find docs preferred context, maybe you forgot to use the DocsPreferredVersionContextProvider ?");
  }

  return value;
}

exports.useDocsPreferredVersionContext = useDocsPreferredVersionContext;

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _theme_ThemeContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(338);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



function useThemeContext() {
  var context = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_theme_ThemeContext__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);

  if (context == null) {
    throw new Error('`useThemeContext` is used outside of `Layout` Component. See https://v2.docusaurus.io/docs/theme-classic#usethemecontext.');
  }

  return context;
}

/* harmony default export */ __webpack_exports__["a"] = (useThemeContext);

/***/ }),

/***/ 328:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.docVersionSearchTag = exports.DEFAULT_SEARCH_TAG = void 0;
exports.DEFAULT_SEARCH_TAG = 'default';

function docVersionSearchTag(pluginId, versionName) {
  return "docs-".concat(pluginId, "-").concat(versionName);
}

exports.docVersionSearchTag = docVersionSearchTag;

/***/ }),

/***/ 329:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDocVersionSuggestions = exports.useActiveDocContext = exports.useActiveVersion = exports.useLatestVersion = exports.useVersions = exports.useActivePluginAndVersion = exports.useActivePlugin = exports.useDocsData = exports.useAllDocsData = void 0;

var router_1 = __webpack_require__(319);

var useGlobalData_1 = __webpack_require__(330);

var docsClientUtils_1 = __webpack_require__(331);

exports.useAllDocsData = function () {
  return useGlobalData_1.useAllPluginInstancesData('docusaurus-plugin-content-docs');
};

exports.useDocsData = function (pluginId) {
  return useGlobalData_1.usePluginData('docusaurus-plugin-content-docs', pluginId);
};

exports.useActivePlugin = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var data = exports.useAllDocsData();

  var _router_1$useLocation = router_1.useLocation(),
      pathname = _router_1$useLocation.pathname;

  return docsClientUtils_1.getActivePlugin(data, pathname, options);
};

exports.useActivePluginAndVersion = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var activePlugin = exports.useActivePlugin(options);

  var _router_1$useLocation2 = router_1.useLocation(),
      pathname = _router_1$useLocation2.pathname;

  if (activePlugin) {
    var activeVersion = docsClientUtils_1.getActiveVersion(activePlugin.pluginData, pathname);
    return {
      activePlugin: activePlugin,
      activeVersion: activeVersion
    };
  }

  return undefined;
}; // versions are returned ordered (most recent first)


exports.useVersions = function (pluginId) {
  var data = exports.useDocsData(pluginId);
  return data.versions;
};

exports.useLatestVersion = function (pluginId) {
  var data = exports.useDocsData(pluginId);
  return docsClientUtils_1.getLatestVersion(data);
}; // Note: return undefined on doc-unrelated pages,
// because there's no version currently considered as active


exports.useActiveVersion = function (pluginId) {
  var data = exports.useDocsData(pluginId);

  var _router_1$useLocation3 = router_1.useLocation(),
      pathname = _router_1$useLocation3.pathname;

  return docsClientUtils_1.getActiveVersion(data, pathname);
};

exports.useActiveDocContext = function (pluginId) {
  var data = exports.useDocsData(pluginId);

  var _router_1$useLocation4 = router_1.useLocation(),
      pathname = _router_1$useLocation4.pathname;

  return docsClientUtils_1.getActiveDocContext(data, pathname);
}; // Useful to say "hey, you are not on the latest docs version, please switch"


exports.useDocVersionSuggestions = function (pluginId) {
  var data = exports.useDocsData(pluginId);

  var _router_1$useLocation5 = router_1.useLocation(),
      pathname = _router_1$useLocation5.pathname;

  return docsClientUtils_1.getDocVersionSuggestions(data, pathname);
};

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useGlobalData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useAllPluginInstancesData", function() { return useAllPluginInstancesData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "usePluginData", function() { return usePluginData; });
/* harmony import */ var _useDocusaurusContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(66);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
 // TODO annoying constant duplication
// if we import something from outside the /client folder,
// the tsc directory structure is affected
// import {DEFAULT_PLUGIN_ID} from '../../constants';

var DEFAULT_PLUGIN_ID = 'default';
function useGlobalData() {
  var _useDocusaurusContext = Object(_useDocusaurusContext__WEBPACK_IMPORTED_MODULE_0__["default"])(),
      globalData = _useDocusaurusContext.globalData;

  if (!globalData) {
    throw new Error('Docusaurus global data not found');
  }

  return globalData;
}
function useAllPluginInstancesData(pluginName) {
  var globalData = useGlobalData();
  var pluginGlobalData = globalData[pluginName];

  if (!pluginGlobalData) {
    throw new Error("Docusaurus plugin global data not found for pluginName=".concat(pluginName));
  }

  return pluginGlobalData;
}
function usePluginData(pluginName) {
  var pluginId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_PLUGIN_ID;
  var pluginGlobalData = useAllPluginInstancesData(pluginName);
  var pluginInstanceGlobalData = pluginGlobalData[pluginId];

  if (!pluginInstanceGlobalData) {
    throw new Error("Docusaurus plugin global data not found for pluginName=".concat(pluginName, " and pluginId=").concat(pluginId));
  }

  return pluginInstanceGlobalData;
}

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDocVersionSuggestions = exports.getActiveDocContext = exports.getActiveVersion = exports.getLatestVersion = exports.getActivePlugin = void 0;

var router_1 = __webpack_require__(319);

function getActivePlugin(allPluginDatas, pathname) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var activeEntry = Object.entries(allPluginDatas).find(function (_ref) {
    var _ref2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_ref, 2),
        _id = _ref2[0],
        pluginData = _ref2[1];

    return !!router_1.matchPath(pathname, {
      path: pluginData.path,
      exact: false,
      strict: false
    });
  });
  var activePlugin = activeEntry ? {
    pluginId: activeEntry[0],
    pluginData: activeEntry[1]
  } : undefined;

  if (!activePlugin && options.failfast) {
    throw new Error("Can't find active docs plugin for pathname=".concat(pathname, ", while it was expected to be found. Maybe you tried to use a docs feature that can only be used on a docs-related page? Existing docs plugin paths are: ").concat(Object.values(allPluginDatas).map(function (plugin) {
      return plugin.path;
    }).join(', ')));
  }

  return activePlugin;
}

exports.getActivePlugin = getActivePlugin;

exports.getLatestVersion = function (data) {
  return data.versions.find(function (version) {
    return version.isLast;
  });
}; // Note: return undefined on doc-unrelated pages,
// because there's no version currently considered as active


exports.getActiveVersion = function (data, pathname) {
  var lastVersion = exports.getLatestVersion(data); // Last version is a route like /docs/*,
  // we need to try to match it last or it would match /docs/version-1.0/* as well

  var orderedVersionsMetadata = [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(data.versions.filter(function (version) {
    return version !== lastVersion;
  })), [lastVersion]);
  return orderedVersionsMetadata.find(function (version) {
    return !!router_1.matchPath(pathname, {
      path: version.path,
      exact: false,
      strict: false
    });
  });
};

exports.getActiveDocContext = function (data, pathname) {
  var activeVersion = exports.getActiveVersion(data, pathname);
  var activeDoc = activeVersion === null || activeVersion === void 0 ? void 0 : activeVersion.docs.find(function (doc) {
    return !!router_1.matchPath(pathname, {
      path: doc.path,
      exact: true,
      strict: false
    });
  });

  function getAlternateVersionDocs(docId) {
    var result = {};
    data.versions.forEach(function (version) {
      version.docs.forEach(function (doc) {
        if (doc.id === docId) {
          result[version.name] = doc;
        }
      });
    });
    return result;
  }

  var alternateVersionDocs = activeDoc ? getAlternateVersionDocs(activeDoc.id) : {};
  return {
    activeVersion: activeVersion,
    activeDoc: activeDoc,
    alternateDocVersions: alternateVersionDocs
  };
};

exports.getDocVersionSuggestions = function (data, pathname) {
  var latestVersion = exports.getLatestVersion(data);
  var activeDocContext = exports.getActiveDocContext(data, pathname); // We only suggest another doc/version if user is not using the latest version

  var isNotOnLatestVersion = activeDocContext.activeVersion !== latestVersion;
  var latestDocSuggestion = isNotOnLatestVersion ? activeDocContext === null || activeDocContext === void 0 ? void 0 : activeDocContext.alternateDocVersions[latestVersion.name] : undefined;
  var latestVersionSuggestion = isNotOnLatestVersion ? latestVersion : undefined;
  return {
    latestDocSuggestion: latestDocSuggestion,
    latestVersionSuggestion: latestVersionSuggestion
  };
};

/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSamePath = void 0; // Compare the 2 paths, ignoring trailing /

exports.isSamePath = function (path1, path2) {
  var normalize = function normalize(pathname) {
    return !pathname || (pathname === null || pathname === void 0 ? void 0 : pathname.endsWith('/')) ? pathname : "".concat(pathname, "/");
  };

  return normalize(path1) === normalize(path2);
};

/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTitleFormatter = void 0;
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var useDocusaurusContext_1 = __importDefault(__webpack_require__(66));

exports.useTitleFormatter = function (title) {
  var _useDocusaurusContext = useDocusaurusContext_1["default"](),
      _useDocusaurusContext2 = _useDocusaurusContext.siteConfig,
      siteConfig = _useDocusaurusContext2 === void 0 ? {} : _useDocusaurusContext2;

  var siteTitle = siteConfig.title,
      _siteConfig$titleDeli = siteConfig.titleDelimiter,
      titleDelimiter = _siteConfig$titleDeli === void 0 ? '|' : _siteConfig$titleDeli;
  return title && title.trim().length ? "".concat(title.trim(), " ").concat(titleDelimiter, " ").concat(siteTitle) : siteTitle;
};

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDocsPreferredVersionByPluginId = exports.useDocsPreferredVersion = void 0;
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var react_1 = __webpack_require__(0);

var DocsPreferredVersionProvider_1 = __webpack_require__(326);

var useDocs_1 = __webpack_require__(318);

var constants_1 = __webpack_require__(336); // TODO improve typing
// Note, the preferredVersion attribute will always be null before mount


function useDocsPreferredVersion() {
  var pluginId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : constants_1.DEFAULT_PLUGIN_ID;
  var docsData = useDocs_1.useDocsData(pluginId);

  var _DocsPreferredVersion = DocsPreferredVersionProvider_1.useDocsPreferredVersionContext(),
      _DocsPreferredVersion2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_DocsPreferredVersion, 2),
      state = _DocsPreferredVersion2[0],
      api = _DocsPreferredVersion2[1];

  var preferredVersionName = state[pluginId].preferredVersionName;
  var preferredVersion = preferredVersionName ? docsData.versions.find(function (version) {
    return version.name === preferredVersionName;
  }) : null;
  var savePreferredVersionName = react_1.useCallback(function (versionName) {
    api.savePreferredVersion(pluginId, versionName);
  }, [api]);
  return {
    preferredVersion: preferredVersion,
    savePreferredVersionName: savePreferredVersionName
  };
}

exports.useDocsPreferredVersion = useDocsPreferredVersion;

function useDocsPreferredVersionByPluginId() {
  var allDocsData = useDocs_1.useAllDocsData();

  var _DocsPreferredVersion3 = DocsPreferredVersionProvider_1.useDocsPreferredVersionContext(),
      _DocsPreferredVersion4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_DocsPreferredVersion3, 1),
      state = _DocsPreferredVersion4[0];

  function getPluginIdPreferredVersion(pluginId) {
    var docsData = allDocsData[pluginId];
    var preferredVersionName = state[pluginId].preferredVersionName;
    return preferredVersionName ? docsData.versions.find(function (version) {
      return version.name === preferredVersionName;
    }) : null;
  }

  var pluginIds = Object.keys(allDocsData);
  var result = {};
  pluginIds.forEach(function (pluginId) {
    result[pluginId] = getPluginIdPreferredVersion(pluginId);
  });
  return result;
}

exports.useDocsPreferredVersionByPluginId = useDocsPreferredVersionByPluginId;

/***/ }),

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var storageKey = function storageKey(pluginId) {
  return "docs-preferred-version-".concat(pluginId);
};

var DocsPreferredVersionStorage = {
  save: function save(pluginId, persistence, versionName) {
    if (persistence === 'none') {// noop
    } else {
      window.localStorage.setItem(storageKey(pluginId), versionName);
    }
  },
  read: function read(pluginId, persistence) {
    if (persistence === 'none') {
      return null;
    } else {
      return window.localStorage.getItem(storageKey(pluginId));
    }
  },
  clear: function clear(pluginId, persistence) {
    if (persistence === 'none') {// noop
    } else {
      window.localStorage.removeItem(storageKey(pluginId));
    }
  }
};
exports["default"] = DocsPreferredVersionStorage;

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_PLUGIN_ID", function() { return DEFAULT_PLUGIN_ID; });
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
// eslint-disable-next-line no-restricted-imports
export {
  // constants were only available on node
  // this makes some useful constants available to frontend/themes too
  // import {DEFAULT_PLUGIN_ID} '@docusaurus/constants'
  DEFAULT_PLUGIN_ID,
} from '../../constants';
 */
// Not duplicating the constants seems to produce
// weird TS compilation side-effects
var DEFAULT_PLUGIN_ID = 'default';

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var UserPreferencesContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])(undefined);
/* harmony default export */ __webpack_exports__["a"] = (UserPreferencesContext);

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ThemeContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext(undefined);
/* harmony default export */ __webpack_exports__["a"] = (ThemeContext);

/***/ }),

/***/ 339:
/***/ (function(module, exports) {

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

module.exports = _objectWithoutPropertiesLoose;

/***/ }),

/***/ 340:
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(317);

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
        defineProperty(target, key, source[key]);
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

module.exports = _objectSpread2;

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _theme_UserPreferencesContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(337);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



function useUserPreferencesContext() {
  var context = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_theme_UserPreferencesContext__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);

  if (context == null) {
    throw new Error('`useUserPreferencesContext` is used outside of `Layout` Component.');
  }

  return context;
}

/* harmony default export */ __webpack_exports__["a"] = (useUserPreferencesContext);

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _docusaurus_ExecutionEnvironment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68);


/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var getScrollPosition = function getScrollPosition() {
  return {
    scrollX: _docusaurus_ExecutionEnvironment__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].canUseDOM ? window.pageXOffset : 0,
    scrollY: _docusaurus_ExecutionEnvironment__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].canUseDOM ? window.pageYOffset : 0
  };
};

var useScrollPosition = function useScrollPosition(effect) {
  var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(getScrollPosition()),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      scrollPosition = _useState2[0],
      setScrollPosition = _useState2[1];

  var handleScroll = function handleScroll() {
    var currentScrollPosition = getScrollPosition();
    setScrollPosition(currentScrollPosition);

    if (effect) {
      effect(currentScrollPosition);
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var opts = {
      passive: true
    };
    window.addEventListener('scroll', handleScroll, opts);
    return function () {
      return window.removeEventListener('scroll', handleScroll, opts);
    };
  }, deps);
  return scrollPosition;
};

/* harmony default export */ __webpack_exports__["a"] = (useScrollPosition);

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


function useLockBodyScroll() {
  var lock = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    document.body.style.overflow = lock ? 'hidden' : 'visible';
    return function () {
      document.body.style.overflow = 'visible';
    };
  }, [lock]);
}

/* harmony default export */ __webpack_exports__["a"] = (useLockBodyScroll);

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return windowSizes; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var desktopThresholdWidth = 996;
var windowSizes = {
  desktop: 'desktop',
  mobile: 'mobile'
};

function useWindowSize() {
  var isClient = typeof window !== 'undefined';

  function getSize() {
    if (!isClient) {
      return undefined;
    }

    return window.innerWidth > desktopThresholdWidth ? windowSizes.desktop : windowSizes.mobile;
  }

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(getSize),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      windowSize = _useState2[0],
      setWindowSize = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    if (!isClient) {
      return undefined;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return function () {
      return window.removeEventListener('resize', handleResize);
    };
  }, []);
  return windowSize;
}


/* harmony default export */ __webpack_exports__["a"] = (useWindowSize);

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(314);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(316);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var IconMenu = function IconMenu(_ref) {
  var _ref$width = _ref.width,
      width = _ref$width === void 0 ? 30 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 30 : _ref$height,
      className = _ref.className,
      restProps = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["width", "height", "className"]);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("svg", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    "aria-label": "Menu",
    className: className,
    width: width,
    height: height,
    viewBox: "0 0 30 30",
    role: "img",
    focusable: "false"
  }, restProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("title", null, "Menu"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("path", {
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeMiterlimit: "10",
    strokeWidth: "2",
    d: "M4 7h22M4 15h22M4 23h22"
  }));
};

/* harmony default export */ __webpack_exports__["a"] = (IconMenu);

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.m.js
var clsx_m = __webpack_require__(315);

// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/SkipToContent/styles.module.css
var styles_module = __webpack_require__(348);
var styles_module_default = /*#__PURE__*/__webpack_require__.n(styles_module);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/SkipToContent/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



function SkipToContent() {
  var handleSkip = function handleSkip(e) {
    if (e.keyCode !== 13) {
      return;
    }

    document.activeElement.blur();
    var firstMainElement = document.querySelector('main:first-of-type');

    if (firstMainElement) {
      firstMainElement.scrollIntoView();
    }
  };

  return /*#__PURE__*/react_default.a.createElement("nav", {
    "aria-label": "Skip navigation links"
  }, /*#__PURE__*/react_default.a.createElement("button", {
    type: "button",
    tabIndex: 0,
    className: styles_module_default.a.skipToContent,
    onKeyDown: handleSkip
  }, "Skip to main content"));
}

/* harmony default export */ var theme_SkipToContent = (SkipToContent);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(317);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-common/lib/index.js
var lib = __webpack_require__(309);

// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/hooks/useUserPreferencesContext.js
var useUserPreferencesContext = __webpack_require__(341);

// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/AnnouncementBar/styles.module.css
var AnnouncementBar_styles_module = __webpack_require__(349);
var AnnouncementBar_styles_module_default = /*#__PURE__*/__webpack_require__.n(AnnouncementBar_styles_module);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/AnnouncementBar/index.js


/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */






function AnnouncementBar() {
  var _useUserPreferencesCo = Object(useUserPreferencesContext["a" /* default */])(),
      isAnnouncementBarClosed = _useUserPreferencesCo.isAnnouncementBarClosed,
      closeAnnouncementBar = _useUserPreferencesCo.closeAnnouncementBar;

  var _useThemeConfig = Object(lib["useThemeConfig"])(),
      announcementBar = _useThemeConfig.announcementBar;

  if (!announcementBar) {
    return null;
  }

  var content = announcementBar.content,
      backgroundColor = announcementBar.backgroundColor,
      textColor = announcementBar.textColor,
      isCloseable = announcementBar.isCloseable;

  if (!content || isCloseable && isAnnouncementBarClosed) {
    return null;
  }

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: AnnouncementBar_styles_module_default.a.announcementBar,
    style: {
      backgroundColor: backgroundColor,
      color: textColor
    },
    role: "banner"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: Object(clsx_m["a" /* default */])(AnnouncementBar_styles_module_default.a.announcementBarContent, defineProperty_default()({}, AnnouncementBar_styles_module_default.a.announcementBarCloseable, isCloseable)) // Developer provided the HTML, so assume it's safe.
    // eslint-disable-next-line react/no-danger
    ,
    dangerouslySetInnerHTML: {
      __html: content
    }
  }), isCloseable ? /*#__PURE__*/react_default.a.createElement("button", {
    type: "button",
    className: AnnouncementBar_styles_module_default.a.announcementBarClose,
    onClick: closeAnnouncementBar,
    "aria-label": "Close"
  }, /*#__PURE__*/react_default.a.createElement("span", {
    "aria-hidden": "true"
  }, "\xD7")) : null);
}

/* harmony default export */ var theme_AnnouncementBar = (AnnouncementBar);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/extends.js
var helpers_extends = __webpack_require__(314);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(65);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// CONCATENATED MODULE: ./node_modules/@docusaurus/core/lib/client/exports/Noop.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* harmony default export */ var Noop = (function () {
  return null;
});
// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/SearchBar.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// EXTERNAL MODULE: ./node_modules/react-toggle/dist/component/index.js
var component = __webpack_require__(350);
var component_default = /*#__PURE__*/__webpack_require__.n(component);

// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/useDocusaurusContext.js
var useDocusaurusContext = __webpack_require__(66);

// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/Toggle/styles.module.css
var Toggle_styles_module = __webpack_require__(355);
var Toggle_styles_module_default = /*#__PURE__*/__webpack_require__.n(Toggle_styles_module);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/Toggle/index.js


/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */







var Toggle_Dark = function Dark(_ref) {
  var icon = _ref.icon,
      style = _ref.style;
  return /*#__PURE__*/react_default.a.createElement("span", {
    className: Object(clsx_m["a" /* default */])(Toggle_styles_module_default.a.toggle, Toggle_styles_module_default.a.dark),
    style: style
  }, icon);
};

var Toggle_Light = function Light(_ref2) {
  var icon = _ref2.icon,
      style = _ref2.style;
  return /*#__PURE__*/react_default.a.createElement("span", {
    className: Object(clsx_m["a" /* default */])(Toggle_styles_module_default.a.toggle, Toggle_styles_module_default.a.light),
    style: style
  }, icon);
};

/* harmony default export */ var Toggle = (function (props) {
  var _useThemeConfig = Object(lib["useThemeConfig"])(),
      _useThemeConfig$color = _useThemeConfig.colorMode.switchConfig,
      darkIcon = _useThemeConfig$color.darkIcon,
      darkIconStyle = _useThemeConfig$color.darkIconStyle,
      lightIcon = _useThemeConfig$color.lightIcon,
      lightIconStyle = _useThemeConfig$color.lightIconStyle;

  var _useDocusaurusContext = Object(useDocusaurusContext["default"])(),
      isClient = _useDocusaurusContext.isClient;

  return /*#__PURE__*/react_default.a.createElement(component_default.a, extends_default()({
    disabled: !isClient,
    icons: {
      checked: /*#__PURE__*/react_default.a.createElement(Toggle_Dark, {
        icon: darkIcon,
        style: darkIconStyle
      }),
      unchecked: /*#__PURE__*/react_default.a.createElement(Toggle_Light, {
        icon: lightIcon,
        style: lightIconStyle
      })
    }
  }, props));
});
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/hooks/useThemeContext.js
var useThemeContext = __webpack_require__(327);

// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/router.js
var router = __webpack_require__(319);

// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/hooks/useScrollPosition.js
var useScrollPosition = __webpack_require__(342);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/hooks/useHideableNavbar.js


/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */




var useHideableNavbar_useHideableNavbar = function useHideableNavbar(hideOnScroll) {
  var location = Object(router["useLocation"])();

  var _useState = Object(react["useState"])(!hideOnScroll),
      _useState2 = slicedToArray_default()(_useState, 2),
      isNavbarVisible = _useState2[0],
      setIsNavbarVisible = _useState2[1];

  var isFocusedAnchor = Object(react["useRef"])(false);

  var _useState3 = Object(react["useState"])(0),
      _useState4 = slicedToArray_default()(_useState3, 2),
      lastScrollTop = _useState4[0],
      setLastScrollTop = _useState4[1];

  var _useState5 = Object(react["useState"])(0),
      _useState6 = slicedToArray_default()(_useState5, 2),
      navbarHeight = _useState6[0],
      setNavbarHeight = _useState6[1];

  var navbarRef = Object(react["useCallback"])(function (node) {
    if (node !== null) {
      setNavbarHeight(node.getBoundingClientRect().height);
    }
  }, []);
  Object(useScrollPosition["a" /* default */])(function (_ref) {
    var scrollTop = _ref.scrollY;

    if (!hideOnScroll) {
      return;
    }

    if (scrollTop < navbarHeight) {
      return;
    }

    if (isFocusedAnchor.current) {
      isFocusedAnchor.current = false;
      setIsNavbarVisible(false);
      setLastScrollTop(scrollTop);
      return;
    }

    if (lastScrollTop && scrollTop === 0) {
      setIsNavbarVisible(true);
    }

    var documentHeight = document.documentElement.scrollHeight - navbarHeight;
    var windowHeight = window.innerHeight;

    if (lastScrollTop && scrollTop >= lastScrollTop) {
      setIsNavbarVisible(false);
    } else if (scrollTop + windowHeight < documentHeight) {
      setIsNavbarVisible(true);
    }

    setLastScrollTop(scrollTop);
  }, [lastScrollTop, navbarHeight, isFocusedAnchor]);
  Object(react["useEffect"])(function () {
    if (!hideOnScroll) {
      return;
    }

    if (!lastScrollTop) {
      return;
    }

    setIsNavbarVisible(true);
  }, [location.pathname]);
  Object(react["useEffect"])(function () {
    if (!hideOnScroll) {
      return;
    }

    isFocusedAnchor.current = true;
  }, [location.hash]);
  return {
    navbarRef: navbarRef,
    isNavbarVisible: isNavbarVisible
  };
};

/* harmony default export */ var hooks_useHideableNavbar = (useHideableNavbar_useHideableNavbar);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/hooks/useLockBodyScroll.js
var useLockBodyScroll = __webpack_require__(343);

// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/hooks/useWindowSize.js
var useWindowSize = __webpack_require__(344);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(316);
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/NavbarItem/DefaultNavbarItem.js
var DefaultNavbarItem = __webpack_require__(322);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/NavbarItem/LocaleDropdownNavbarItem.js



/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */




function LocaleDropdownNavbarItem(_ref) {
  var mobile = _ref.mobile,
      props = objectWithoutProperties_default()(_ref, ["mobile"]);

  var _useDocusaurusContext = Object(useDocusaurusContext["default"])(),
      baseUrl = _useDocusaurusContext.siteConfig.baseUrl,
      _useDocusaurusContext2 = _useDocusaurusContext.i18n,
      defaultLocale = _useDocusaurusContext2.defaultLocale,
      currentLocale = _useDocusaurusContext2.currentLocale,
      locales = _useDocusaurusContext2.locales,
      localeConfigs = _useDocusaurusContext2.localeConfigs;

  var _useLocation = Object(router["useLocation"])(),
      pathname = _useLocation.pathname;

  function getLocaleLabel(locale) {
    return localeConfigs[locale].label;
  } //  TODO Docusaurus expose this unlocalized baseUrl more reliably


  var baseUrlUnlocalized = currentLocale === defaultLocale ? baseUrl : baseUrl.replace("/".concat(currentLocale, "/"), '/');
  var pathnameSuffix = pathname.replace(baseUrl, '');

  function getLocalizedBaseUrl(locale) {
    return locale === defaultLocale ? "".concat(baseUrlUnlocalized) : "".concat(baseUrlUnlocalized).concat(locale, "/");
  }

  var items = locales.map(function (locale) {
    var to = "".concat(getLocalizedBaseUrl(locale)).concat(pathnameSuffix);
    return {
      isNavLink: true,
      label: getLocaleLabel(locale),
      to: "pathname://".concat(to),
      target: '_self',
      autoAddBaseUrl: false,
      className: locale === currentLocale ? 'dropdown__link--active' : ''
    };
  }); // Mobile is handled a bit differently

  var dropdownLabel = mobile ? 'Languages' : getLocaleLabel(currentLocale);
  return /*#__PURE__*/react_default.a.createElement(DefaultNavbarItem["a" /* default */], extends_default()({}, props, {
    mobile: mobile,
    label: dropdownLabel,
    items: items
  }));
}
// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/NavbarItem/index.js


/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var NavbarItemComponents = {
  "default": function _default() {
    return DefaultNavbarItem["a" /* default */];
  },
  localeDropdown: function localeDropdown() {
    return LocaleDropdownNavbarItem;
  },
  // Need to lazy load these items as we don't know for sure the docs plugin is loaded
  // See https://github.com/facebook/docusaurus/issues/3360
  docsVersion: function docsVersion() {
    return (// eslint-disable-next-line @typescript-eslint/no-var-requires
      __webpack_require__(356)["default"]
    );
  },
  docsVersionDropdown: function docsVersionDropdown() {
    return (// eslint-disable-next-line @typescript-eslint/no-var-requires
      __webpack_require__(357)["default"]
    );
  },
  doc: function doc() {
    return (// eslint-disable-next-line @typescript-eslint/no-var-requires
      __webpack_require__(358)["default"]
    );
  }
};

var getNavbarItemComponent = function getNavbarItemComponent() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
  var navbarItemComponent = NavbarItemComponents[type];

  if (!navbarItemComponent) {
    throw new Error("No NavbarItem component found for type=".concat(type, "."));
  }

  return navbarItemComponent();
};

function NavbarItem(_ref) {
  var type = _ref.type,
      props = objectWithoutProperties_default()(_ref, ["type"]);

  var NavbarItemComponent = getNavbarItemComponent(type);
  return /*#__PURE__*/react_default.a.createElement(NavbarItemComponent, props);
}
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/Logo/index.js + 1 modules
var Logo = __webpack_require__(347);

// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/IconMenu/index.js
var IconMenu = __webpack_require__(345);

// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/Navbar/styles.module.css
var Navbar_styles_module = __webpack_require__(360);
var Navbar_styles_module_default = /*#__PURE__*/__webpack_require__.n(Navbar_styles_module);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/Navbar/index.js




/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */












 // retrocompatible with v1

var DefaultNavItemPosition = 'right'; // If split links by left/right
// if position is unspecified, fallback to right (as v1)

function splitNavItemsByPosition(items) {
  var leftItems = items.filter(function (item) {
    var _item$position;

    return ((_item$position = item.position) !== null && _item$position !== void 0 ? _item$position : DefaultNavItemPosition) === 'left';
  });
  var rightItems = items.filter(function (item) {
    var _item$position2;

    return ((_item$position2 = item.position) !== null && _item$position2 !== void 0 ? _item$position2 : DefaultNavItemPosition) === 'right';
  });
  return {
    leftItems: leftItems,
    rightItems: rightItems
  };
}

function Navbar() {
  var _clsx;

  var _useThemeConfig = Object(lib["useThemeConfig"])(),
      _useThemeConfig$navba = _useThemeConfig.navbar,
      items = _useThemeConfig$navba.items,
      hideOnScroll = _useThemeConfig$navba.hideOnScroll,
      style = _useThemeConfig$navba.style,
      disableColorModeSwitch = _useThemeConfig.colorMode.disableSwitch;

  var _useState = Object(react["useState"])(false),
      _useState2 = slicedToArray_default()(_useState, 2),
      sidebarShown = _useState2[0],
      setSidebarShown = _useState2[1];

  var _useState3 = Object(react["useState"])(false),
      _useState4 = slicedToArray_default()(_useState3, 2),
      isSearchBarExpanded = _useState4[0],
      setIsSearchBarExpanded = _useState4[1];

  var _useThemeContext = Object(useThemeContext["a" /* default */])(),
      isDarkTheme = _useThemeContext.isDarkTheme,
      setLightTheme = _useThemeContext.setLightTheme,
      setDarkTheme = _useThemeContext.setDarkTheme;

  var _useHideableNavbar = hooks_useHideableNavbar(hideOnScroll),
      navbarRef = _useHideableNavbar.navbarRef,
      isNavbarVisible = _useHideableNavbar.isNavbarVisible;

  Object(useLockBodyScroll["a" /* default */])(sidebarShown);
  var showSidebar = Object(react["useCallback"])(function () {
    setSidebarShown(true);
  }, [setSidebarShown]);
  var hideSidebar = Object(react["useCallback"])(function () {
    setSidebarShown(false);
  }, [setSidebarShown]);
  var onToggleChange = Object(react["useCallback"])(function (e) {
    return e.target.checked ? setDarkTheme() : setLightTheme();
  }, [setLightTheme, setDarkTheme]);
  var windowSize = Object(useWindowSize["a" /* default */])();
  Object(react["useEffect"])(function () {
    if (windowSize === useWindowSize["b" /* windowSizes */].desktop) {
      setSidebarShown(false);
    }
  }, [windowSize]);

  var _splitNavItemsByPosit = splitNavItemsByPosition(items),
      leftItems = _splitNavItemsByPosit.leftItems,
      rightItems = _splitNavItemsByPosit.rightItems;

  return /*#__PURE__*/react_default.a.createElement("nav", {
    ref: navbarRef,
    className: Object(clsx_m["a" /* default */])('navbar', 'navbar--fixed-top', (_clsx = {
      'navbar--dark': style === 'dark',
      'navbar--primary': style === 'primary',
      'navbar-sidebar--show': sidebarShown
    }, defineProperty_default()(_clsx, Navbar_styles_module_default.a.navbarHideable, hideOnScroll), defineProperty_default()(_clsx, Navbar_styles_module_default.a.navbarHidden, !isNavbarVisible), _clsx))
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "navbar__inner"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "navbar__items"
  }, items != null && items.length !== 0 && /*#__PURE__*/react_default.a.createElement("div", {
    "aria-label": "Navigation bar toggle",
    className: "navbar__toggle",
    role: "button",
    tabIndex: 0,
    onClick: showSidebar,
    onKeyDown: showSidebar
  }, /*#__PURE__*/react_default.a.createElement(IconMenu["a" /* default */], null)), /*#__PURE__*/react_default.a.createElement(Logo["a" /* default */], {
    className: "navbar__brand",
    imageClassName: "navbar__logo",
    titleClassName: Object(clsx_m["a" /* default */])('navbar__title', defineProperty_default()({}, Navbar_styles_module_default.a.hideLogoText, isSearchBarExpanded))
  }), leftItems.map(function (item, i) {
    return /*#__PURE__*/react_default.a.createElement(NavbarItem, extends_default()({}, item, {
      key: i
    }));
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "navbar__items navbar__items--right"
  }, rightItems.map(function (item, i) {
    return /*#__PURE__*/react_default.a.createElement(NavbarItem, extends_default()({}, item, {
      key: i
    }));
  }), !disableColorModeSwitch && /*#__PURE__*/react_default.a.createElement(Toggle, {
    className: Navbar_styles_module_default.a.displayOnlyInLargeViewport,
    "aria-label": "Dark mode toggle",
    checked: isDarkTheme,
    onChange: onToggleChange
  }), /*#__PURE__*/react_default.a.createElement(Noop, {
    handleSearchBarToggle: setIsSearchBarExpanded,
    isSearchBarExpanded: isSearchBarExpanded
  }))), /*#__PURE__*/react_default.a.createElement("div", {
    role: "presentation",
    className: "navbar-sidebar__backdrop",
    onClick: hideSidebar
  }), /*#__PURE__*/react_default.a.createElement("div", {
    className: "navbar-sidebar"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "navbar-sidebar__brand"
  }, /*#__PURE__*/react_default.a.createElement(Logo["a" /* default */], {
    className: "navbar__brand",
    imageClassName: "navbar__logo",
    titleClassName: "navbar__title",
    onClick: hideSidebar
  }), !disableColorModeSwitch && sidebarShown && /*#__PURE__*/react_default.a.createElement(Toggle, {
    "aria-label": "Dark mode toggle in sidebar",
    checked: isDarkTheme,
    onChange: onToggleChange
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "navbar-sidebar__items"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "menu"
  }, /*#__PURE__*/react_default.a.createElement("ul", {
    className: "menu__list"
  }, items.map(function (item, i) {
    return /*#__PURE__*/react_default.a.createElement(NavbarItem, extends_default()({
      mobile: true
    }, item, {
      onClick: hideSidebar,
      key: i
    }));
  }))))));
}

/* harmony default export */ var theme_Navbar = (Navbar);
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/Link.js
var Link = __webpack_require__(321);

// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/useBaseUrl.js
var useBaseUrl = __webpack_require__(320);

// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/Footer/styles.module.css
var Footer_styles_module = __webpack_require__(361);
var Footer_styles_module_default = /*#__PURE__*/__webpack_require__.n(Footer_styles_module);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/Footer/index.js



/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */







function FooterLink(_ref) {
  var to = _ref.to,
      href = _ref.href,
      label = _ref.label,
      prependBaseUrlToHref = _ref.prependBaseUrlToHref,
      props = objectWithoutProperties_default()(_ref, ["to", "href", "label", "prependBaseUrlToHref"]);

  var toUrl = Object(useBaseUrl["a" /* default */])(to);
  var normalizedHref = Object(useBaseUrl["a" /* default */])(href, {
    forcePrependBaseUrl: true
  });
  return /*#__PURE__*/react_default.a.createElement(Link["a" /* default */], extends_default()({
    className: "footer__link-item"
  }, href ? {
    target: '_blank',
    rel: 'noopener noreferrer',
    href: prependBaseUrlToHref ? normalizedHref : href
  } : {
    to: toUrl
  }, props), label);
}

var Footer_FooterLogo = function FooterLogo(_ref2) {
  var url = _ref2.url,
      alt = _ref2.alt;
  return /*#__PURE__*/react_default.a.createElement("img", {
    className: "footer__logo",
    alt: alt,
    src: url
  });
};

function Footer() {
  var _useThemeConfig = Object(lib["useThemeConfig"])(),
      footer = _useThemeConfig.footer;

  var _ref3 = footer || {},
      copyright = _ref3.copyright,
      _ref3$links = _ref3.links,
      links = _ref3$links === void 0 ? [] : _ref3$links,
      _ref3$logo = _ref3.logo,
      logo = _ref3$logo === void 0 ? {} : _ref3$logo;

  var logoUrl = Object(useBaseUrl["a" /* default */])(logo.src);

  if (!footer) {
    return null;
  }

  return /*#__PURE__*/react_default.a.createElement("footer", {
    className: Object(clsx_m["a" /* default */])('footer', {
      'footer--dark': footer.style === 'dark'
    })
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "container"
  }, links && links.length > 0 && /*#__PURE__*/react_default.a.createElement("div", {
    className: "row footer__links"
  }, links.map(function (linkItem, i) {
    return /*#__PURE__*/react_default.a.createElement("div", {
      key: i,
      className: "col footer__col"
    }, linkItem.title != null ? /*#__PURE__*/react_default.a.createElement("h4", {
      className: "footer__title"
    }, linkItem.title) : null, linkItem.items != null && Array.isArray(linkItem.items) && linkItem.items.length > 0 ? /*#__PURE__*/react_default.a.createElement("ul", {
      className: "footer__items"
    }, linkItem.items.map(function (item, key) {
      return item.html ? /*#__PURE__*/react_default.a.createElement("li", {
        key: key,
        className: "footer__item" // Developer provided the HTML, so assume it's safe.
        // eslint-disable-next-line react/no-danger
        ,
        dangerouslySetInnerHTML: {
          __html: item.html
        }
      }) : /*#__PURE__*/react_default.a.createElement("li", {
        key: item.href || item.to,
        className: "footer__item"
      }, /*#__PURE__*/react_default.a.createElement(FooterLink, item));
    })) : null);
  })), (logo || copyright) && /*#__PURE__*/react_default.a.createElement("div", {
    className: "footer__bottom text--center"
  }, logo && logo.src && /*#__PURE__*/react_default.a.createElement("div", {
    className: "margin-bottom--sm"
  }, logo.href ? /*#__PURE__*/react_default.a.createElement("a", {
    href: logo.href,
    target: "_blank",
    rel: "noopener noreferrer",
    className: Footer_styles_module_default.a.footerLogoLink
  }, /*#__PURE__*/react_default.a.createElement(Footer_FooterLogo, {
    alt: logo.alt,
    url: logoUrl
  })) : /*#__PURE__*/react_default.a.createElement(Footer_FooterLogo, {
    alt: logo.alt,
    url: logoUrl
  })), copyright ? /*#__PURE__*/react_default.a.createElement("div", {
    className: "footer__copyright" // Developer provided the HTML, so assume it's safe.
    // eslint-disable-next-line react/no-danger
    ,
    dangerouslySetInnerHTML: {
      __html: copyright
    }
  }) : null)));
}

/* harmony default export */ var theme_Footer = (Footer);
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/ExecutionEnvironment.js
var ExecutionEnvironment = __webpack_require__(68);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/hooks/useTheme.js


/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var themes = {
  light: 'light',
  dark: 'dark'
}; // Ensure to always return a valid theme even if input is invalid

var coerceToTheme = function coerceToTheme(theme) {
  return theme === themes.dark ? themes.dark : themes.light;
};

var useTheme_getInitialTheme = function getInitialTheme() {
  if (!ExecutionEnvironment["a" /* default */].canUseDOM) {
    return themes.light; // SSR: we don't care
  }

  return coerceToTheme(document.documentElement.getAttribute('data-theme'));
};

var storeTheme = function storeTheme(newTheme) {
  try {
    localStorage.setItem('theme', coerceToTheme(newTheme));
  } catch (err) {
    console.error(err);
  }
};

var useTheme_useTheme = function useTheme() {
  var _useThemeConfig = Object(lib["useThemeConfig"])(),
      _useThemeConfig$color = _useThemeConfig.colorMode,
      disableSwitch = _useThemeConfig$color.disableSwitch,
      respectPrefersColorScheme = _useThemeConfig$color.respectPrefersColorScheme;

  var _useState = Object(react["useState"])(useTheme_getInitialTheme),
      _useState2 = slicedToArray_default()(_useState, 2),
      theme = _useState2[0],
      setTheme = _useState2[1];

  var setLightTheme = Object(react["useCallback"])(function () {
    setTheme(themes.light);
    storeTheme(themes.light);
  }, []);
  var setDarkTheme = Object(react["useCallback"])(function () {
    setTheme(themes.dark);
    storeTheme(themes.dark);
  }, []);
  Object(react["useEffect"])(function () {
    document.documentElement.setAttribute('data-theme', coerceToTheme(theme));
  }, [theme]);
  Object(react["useEffect"])(function () {
    if (disableSwitch) {
      return;
    }

    try {
      var localStorageTheme = localStorage.getItem('theme');

      if (localStorageTheme !== null) {
        setTheme(coerceToTheme(localStorageTheme));
      }
    } catch (err) {
      console.error(err);
    }
  }, [setTheme]);
  Object(react["useEffect"])(function () {
    if (disableSwitch && !respectPrefersColorScheme) {
      return;
    }

    window.matchMedia('(prefers-color-scheme: dark)').addListener(function (_ref) {
      var matches = _ref.matches;
      setTheme(matches ? themes.dark : themes.light);
    });
  }, []);
  return {
    isDarkTheme: theme === themes.dark,
    setLightTheme: setLightTheme,
    setDarkTheme: setDarkTheme
  };
};

/* harmony default export */ var hooks_useTheme = (useTheme_useTheme);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/ThemeContext.js
var ThemeContext = __webpack_require__(338);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/ThemeProvider/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */




function ThemeProvider(props) {
  var _useTheme = hooks_useTheme(),
      isDarkTheme = _useTheme.isDarkTheme,
      setLightTheme = _useTheme.setLightTheme,
      setDarkTheme = _useTheme.setDarkTheme;

  return /*#__PURE__*/react_default.a.createElement(ThemeContext["a" /* default */].Provider, {
    value: {
      isDarkTheme: isDarkTheme,
      setLightTheme: setLightTheme,
      setDarkTheme: setDarkTheme
    }
  }, props.children);
}

/* harmony default export */ var theme_ThemeProvider = (ThemeProvider);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectSpread2.js
var objectSpread2 = __webpack_require__(340);
var objectSpread2_default = /*#__PURE__*/__webpack_require__.n(objectSpread2);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/hooks/useTabGroupChoice.js




/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var TAB_CHOICE_PREFIX = 'docusaurus.tab.';

var useTabGroupChoice_useTabGroupChoice = function useTabGroupChoice() {
  var _useState = Object(react["useState"])({}),
      _useState2 = slicedToArray_default()(_useState, 2),
      tabGroupChoices = _useState2[0],
      setChoices = _useState2[1];

  var setChoiceSyncWithLocalStorage = Object(react["useCallback"])(function (groupId, newChoice) {
    try {
      localStorage.setItem("".concat(TAB_CHOICE_PREFIX).concat(groupId), newChoice);
    } catch (err) {
      console.error(err);
    }
  }, []);
  Object(react["useEffect"])(function () {
    try {
      var localStorageChoices = {};

      for (var i = 0; i < localStorage.length; i += 1) {
        var storageKey = localStorage.key(i);

        if (storageKey.startsWith(TAB_CHOICE_PREFIX)) {
          var groupId = storageKey.substring(TAB_CHOICE_PREFIX.length);
          localStorageChoices[groupId] = localStorage.getItem(storageKey);
        }
      }

      setChoices(localStorageChoices);
    } catch (err) {
      console.error(err);
    }
  }, []);
  return {
    tabGroupChoices: tabGroupChoices,
    setTabGroupChoices: function setTabGroupChoices(groupId, newChoice) {
      setChoices(function (oldChoices) {
        return objectSpread2_default()(objectSpread2_default()({}, oldChoices), {}, defineProperty_default()({}, groupId, newChoice));
      });
      setChoiceSyncWithLocalStorage(groupId, newChoice);
    }
  };
};

/* harmony default export */ var hooks_useTabGroupChoice = (useTabGroupChoice_useTabGroupChoice);
// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/hooks/useAnnouncementBar.js


/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var STORAGE_DISMISS_KEY = 'docusaurus.announcement.dismiss';
var STORAGE_ID_KEY = 'docusaurus.announcement.id';

var useAnnouncementBar_useAnnouncementBar = function useAnnouncementBar() {
  var _useThemeConfig = Object(lib["useThemeConfig"])(),
      announcementBar = _useThemeConfig.announcementBar;

  var _useState = Object(react["useState"])(true),
      _useState2 = slicedToArray_default()(_useState, 2),
      isClosed = _useState2[0],
      setClosed = _useState2[1];

  var handleClose = Object(react["useCallback"])(function () {
    localStorage.setItem(STORAGE_DISMISS_KEY, 'true');
    setClosed(true);
  }, []);
  Object(react["useEffect"])(function () {
    if (!announcementBar) {
      return;
    }

    var id = announcementBar.id;
    var viewedId = localStorage.getItem(STORAGE_ID_KEY); // retrocompatibility due to spelling mistake of default id
    // see https://github.com/facebook/docusaurus/issues/3338

    if (viewedId === 'annoucement-bar') {
      viewedId = 'announcement-bar';
    }

    var isNewAnnouncement = id !== viewedId;
    localStorage.setItem(STORAGE_ID_KEY, id);

    if (isNewAnnouncement) {
      localStorage.setItem(STORAGE_DISMISS_KEY, 'false');
    }

    if (isNewAnnouncement || localStorage.getItem(STORAGE_DISMISS_KEY) === 'false') {
      setClosed(false);
    }
  }, []);
  return {
    isAnnouncementBarClosed: isClosed,
    closeAnnouncementBar: handleClose
  };
};

/* harmony default export */ var hooks_useAnnouncementBar = (useAnnouncementBar_useAnnouncementBar);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/UserPreferencesContext.js
var UserPreferencesContext = __webpack_require__(337);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/UserPreferencesProvider/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





function UserPreferencesProvider(props) {
  var _useTabGroupChoice = hooks_useTabGroupChoice(),
      tabGroupChoices = _useTabGroupChoice.tabGroupChoices,
      setTabGroupChoices = _useTabGroupChoice.setTabGroupChoices;

  var _useAnnouncementBar = hooks_useAnnouncementBar(),
      isAnnouncementBarClosed = _useAnnouncementBar.isAnnouncementBarClosed,
      closeAnnouncementBar = _useAnnouncementBar.closeAnnouncementBar;

  return /*#__PURE__*/react_default.a.createElement(UserPreferencesContext["a" /* default */].Provider, {
    value: {
      tabGroupChoices: tabGroupChoices,
      setTabGroupChoices: setTabGroupChoices,
      isAnnouncementBarClosed: isAnnouncementBarClosed,
      closeAnnouncementBar: closeAnnouncementBar
    }
  }, props.children);
}

/* harmony default export */ var theme_UserPreferencesProvider = (UserPreferencesProvider);
// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/LayoutProviders/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */




function LayoutProviders(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/react_default.a.createElement(theme_ThemeProvider, null, /*#__PURE__*/react_default.a.createElement(theme_UserPreferencesProvider, null, /*#__PURE__*/react_default.a.createElement(lib["DocsPreferredVersionContextProvider"], null, children)));
}
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/Head.js
var Head = __webpack_require__(69);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/SearchMetadatas/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

 // Note: we don't couple this to Algolia/DocSearch on purpose
// We may want to support other search engine plugins too
// Search plugins should swizzle/override this comp to add their behavior

function SearchMetadatas(_ref) {
  var locale = _ref.locale,
      version = _ref.version,
      tag = _ref.tag;
  return /*#__PURE__*/react_default.a.createElement(Head["a" /* default */], null, locale && /*#__PURE__*/react_default.a.createElement("meta", {
    name: "docusaurus_locale",
    content: "".concat(locale)
  }), version && /*#__PURE__*/react_default.a.createElement("meta", {
    name: "docusaurus_version",
    content: version
  }), tag && /*#__PURE__*/react_default.a.createElement("meta", {
    name: "docusaurus_tag",
    content: tag
  }));
}
// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/LayoutHead/index.js


/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */






function LayoutHead(props) {
  var _useDocusaurusContext = Object(useDocusaurusContext["default"])(),
      siteConfig = _useDocusaurusContext.siteConfig,
      currentLocale = _useDocusaurusContext.i18n.currentLocale;

  var favicon = siteConfig.favicon,
      _siteConfig$themeConf = siteConfig.themeConfig,
      defaultImage = _siteConfig$themeConf.image,
      metadatas = _siteConfig$themeConf.metadatas,
      siteUrl = siteConfig.url;
  var title = props.title,
      description = props.description,
      image = props.image,
      keywords = props.keywords,
      permalink = props.permalink,
      searchMetadatas = props.searchMetadatas;
  var metaTitle = Object(lib["useTitleFormatter"])(title);
  var metaImage = image || defaultImage;
  var metaImageUrl = Object(useBaseUrl["a" /* default */])(metaImage, {
    absolute: true
  });
  var faviconUrl = Object(useBaseUrl["a" /* default */])(favicon);
  var htmlLang = currentLocale.split('-')[0];
  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(Head["a" /* default */], null, /*#__PURE__*/react_default.a.createElement("html", {
    lang: htmlLang
  }), metaTitle && /*#__PURE__*/react_default.a.createElement("title", null, metaTitle), metaTitle && /*#__PURE__*/react_default.a.createElement("meta", {
    property: "og:title",
    content: metaTitle
  }), favicon && /*#__PURE__*/react_default.a.createElement("link", {
    rel: "shortcut icon",
    href: faviconUrl
  }), description && /*#__PURE__*/react_default.a.createElement("meta", {
    name: "description",
    content: description
  }), description && /*#__PURE__*/react_default.a.createElement("meta", {
    property: "og:description",
    content: description
  }), keywords && keywords.length && /*#__PURE__*/react_default.a.createElement("meta", {
    name: "keywords",
    content: keywords.join(',')
  }), metaImage && /*#__PURE__*/react_default.a.createElement("meta", {
    property: "og:image",
    content: metaImageUrl
  }), metaImage && /*#__PURE__*/react_default.a.createElement("meta", {
    name: "twitter:image",
    content: metaImageUrl
  }), metaImage && /*#__PURE__*/react_default.a.createElement("meta", {
    name: "twitter:image:alt",
    content: "Image for ".concat(metaTitle)
  }), permalink && /*#__PURE__*/react_default.a.createElement("meta", {
    property: "og:url",
    content: siteUrl + permalink
  }), permalink && /*#__PURE__*/react_default.a.createElement("link", {
    rel: "canonical",
    href: siteUrl + permalink
  }), /*#__PURE__*/react_default.a.createElement("meta", {
    name: "twitter:card",
    content: "summary_large_image"
  })), /*#__PURE__*/react_default.a.createElement(SearchMetadatas, extends_default()({
    tag: lib["DEFAULT_SEARCH_TAG"],
    locale: currentLocale
  }, searchMetadatas)), /*#__PURE__*/react_default.a.createElement(Head["a" /* default */] // it's important to have an additional <Head> element here,
  // as it allows react-helmet to override values set in previous <Head>
  // ie we can override default metadatas such as "twitter:card"
  // In same Head, the same meta would appear twice instead of overriding
  // See react-helmet doc
  , null, metadatas.map(function (metadata, i) {
    return /*#__PURE__*/react_default.a.createElement("meta", extends_default()({
      key: "metadata_".concat(i)
    }, metadata));
  })));
}
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/hooks/styles.css
var styles = __webpack_require__(362);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/hooks/useKeyboardNavigation.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

 // This hook detect keyboard focus indicator to not show outline for mouse users
// Inspired by https://hackernoon.com/removing-that-ugly-focus-ring-and-keeping-it-too-6c8727fefcd2

function useKeyboardNavigation() {
  Object(react["useEffect"])(function () {
    var keyboardFocusedClassName = 'navigation-with-keyboard';

    function handleOutlineStyles(e) {
      if (e.type === 'keydown' && e.key === 'Tab') {
        document.body.classList.add(keyboardFocusedClassName);
      }

      if (e.type === 'mousedown') {
        document.body.classList.remove(keyboardFocusedClassName);
      }
    }

    document.addEventListener('keydown', handleOutlineStyles);
    document.addEventListener('mousedown', handleOutlineStyles);
    return function () {
      document.body.classList.remove(keyboardFocusedClassName);
      document.removeEventListener('keydown', handleOutlineStyles);
      document.removeEventListener('mousedown', handleOutlineStyles);
    };
  }, []);
}

/* harmony default export */ var hooks_useKeyboardNavigation = (useKeyboardNavigation);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/Layout/styles.css
var Layout_styles = __webpack_require__(363);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/Layout/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */











function Layout(props) {
  var children = props.children,
      noFooter = props.noFooter,
      wrapperClassName = props.wrapperClassName;
  hooks_useKeyboardNavigation();
  return /*#__PURE__*/react_default.a.createElement(LayoutProviders, null, /*#__PURE__*/react_default.a.createElement(LayoutHead, props), /*#__PURE__*/react_default.a.createElement(theme_SkipToContent, null), /*#__PURE__*/react_default.a.createElement(theme_AnnouncementBar, null), /*#__PURE__*/react_default.a.createElement(theme_Navbar, null), /*#__PURE__*/react_default.a.createElement("div", {
    className: Object(clsx_m["a" /* default */])('main-wrapper', wrapperClassName)
  }, children), !noFooter && /*#__PURE__*/react_default.a.createElement(theme_Footer, null));
}

/* harmony default export */ var theme_Layout = __webpack_exports__["a"] = (Layout);

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/extends.js
var helpers_extends = __webpack_require__(314);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(316);
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/Link.js
var Link = __webpack_require__(321);

// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.m.js
var clsx_m = __webpack_require__(315);

// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/useDocusaurusContext.js
var useDocusaurusContext = __webpack_require__(66);

// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/hooks/useThemeContext.js
var useThemeContext = __webpack_require__(327);

// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/ThemedImage/styles.module.css
var styles_module = __webpack_require__(359);
var styles_module_default = /*#__PURE__*/__webpack_require__.n(styles_module);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/ThemedImage/index.js



/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */






var ThemedImage_ThemedImage = function ThemedImage(props) {
  var _useDocusaurusContext = Object(useDocusaurusContext["default"])(),
      isClient = _useDocusaurusContext.isClient;

  var _useThemeContext = Object(useThemeContext["a" /* default */])(),
      isDarkTheme = _useThemeContext.isDarkTheme;

  var sources = props.sources,
      className = props.className,
      _props$alt = props.alt,
      alt = _props$alt === void 0 ? '' : _props$alt,
      propsRest = objectWithoutProperties_default()(props, ["sources", "className", "alt"]);

  var renderedSourceNames = isClient ? isDarkTheme ? ['dark'] : ['light'] : // We need to render both images on the server to avoid flash
  // See https://github.com/facebook/docusaurus/pull/3730
  ['light', 'dark'];
  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, renderedSourceNames.map(function (sourceName) {
    return /*#__PURE__*/react_default.a.createElement("img", extends_default()({
      key: sourceName,
      src: sources[sourceName],
      alt: alt,
      className: Object(clsx_m["a" /* default */])(styles_module_default.a.themedImage, styles_module_default.a["themedImage--".concat(sourceName)], className)
    }, propsRest));
  }));
};

/* harmony default export */ var theme_ThemedImage = (ThemedImage_ThemedImage);
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/useBaseUrl.js
var useBaseUrl = __webpack_require__(320);

// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-common/lib/index.js
var lib = __webpack_require__(309);

// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/isInternalUrl.js
var isInternalUrl = __webpack_require__(323);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/Logo/index.js



/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */








var Logo_Logo = function Logo(props) {
  var _useDocusaurusContext = Object(useDocusaurusContext["default"])(),
      isClient = _useDocusaurusContext.isClient;

  var _useThemeConfig = Object(lib["useThemeConfig"])(),
      _useThemeConfig$navba = _useThemeConfig.navbar,
      title = _useThemeConfig$navba.title,
      _useThemeConfig$navba2 = _useThemeConfig$navba.logo,
      logo = _useThemeConfig$navba2 === void 0 ? {
    src: ''
  } : _useThemeConfig$navba2;

  var imageClassName = props.imageClassName,
      titleClassName = props.titleClassName,
      propsRest = objectWithoutProperties_default()(props, ["imageClassName", "titleClassName"]);

  var logoLink = Object(useBaseUrl["a" /* default */])(logo.href || '/');
  var logoLinkProps = logo.target ? {
    target: logo.target
  } : !Object(isInternalUrl["a" /* default */])(logoLink) ? {
    rel: 'noopener noreferrer',
    target: '_blank'
  } : {};
  var sources = {
    light: Object(useBaseUrl["a" /* default */])(logo.src),
    dark: Object(useBaseUrl["a" /* default */])(logo.srcDark || logo.src)
  };
  return /*#__PURE__*/react_default.a.createElement(Link["a" /* default */], extends_default()({
    to: logoLink
  }, propsRest, logoLinkProps), logo.src && /*#__PURE__*/react_default.a.createElement(theme_ThemedImage, {
    key: isClient,
    className: imageClassName,
    sources: sources,
    alt: logo.alt || title || 'Logo'
  }), title != null && /*#__PURE__*/react_default.a.createElement("strong", {
    className: titleClassName
  }, title));
};

/* harmony default export */ var theme_Logo = __webpack_exports__["a"] = (Logo_Logo);

/***/ }),

/***/ 348:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"skipToContent": "skipToContent_11B0"
};


/***/ }),

/***/ 349:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"announcementBar": "announcementBar_1JSk",
	"announcementBarClose": "announcementBarClose_1-Um",
	"announcementBarContent": "announcementBarContent_2EqR",
	"announcementBarCloseable": "announcementBarCloseable_3bpQ"
};


/***/ }),

/***/ 350:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(351);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _check = __webpack_require__(352);

var _check2 = _interopRequireDefault(_check);

var _x = __webpack_require__(353);

var _x2 = _interopRequireDefault(_x);

var _util = __webpack_require__(354);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toggle = function (_PureComponent) {
  _inherits(Toggle, _PureComponent);

  function Toggle(props) {
    _classCallCheck(this, Toggle);

    var _this = _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleTouchStart = _this.handleTouchStart.bind(_this);
    _this.handleTouchMove = _this.handleTouchMove.bind(_this);
    _this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    _this.previouslyChecked = !!(props.checked || props.defaultChecked);
    _this.state = {
      checked: !!(props.checked || props.defaultChecked),
      hasFocus: false
    };
    return _this;
  }

  _createClass(Toggle, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.checked !== this.props.checked) {
        // Disable linting rule here since this usage of setState inside
        // componentDidUpdate is OK; see
        // https://reactjs.org/docs/react-component.html#componentdidupdate
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ checked: !!this.props.checked });
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      if (this.props.disabled) {
        return;
      }
      var checkbox = this.input;
      if (event.target !== checkbox && !this.moved) {
        this.previouslyChecked = checkbox.checked;
        event.preventDefault();
        checkbox.focus();
        checkbox.click();
        return;
      }

      var checked = this.props.hasOwnProperty('checked') ? this.props.checked : checkbox.checked;

      this.setState({ checked: checked });
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(event) {
      if (this.props.disabled) {
        return;
      }
      this.startX = (0, _util.pointerCoord)(event).x;
      this.activated = true;
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(event) {
      if (!this.activated) return;
      this.moved = true;

      if (this.startX) {
        var currentX = (0, _util.pointerCoord)(event).x;
        if (this.state.checked && currentX + 15 < this.startX) {
          this.setState({ checked: false });
          this.startX = currentX;
          this.activated = true;
        } else if (currentX - 15 > this.startX) {
          this.setState({ checked: true });
          this.startX = currentX;
          this.activated = currentX < this.startX + 5;
        }
      }
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(event) {
      if (!this.moved) return;
      var checkbox = this.input;
      event.preventDefault();

      if (this.startX) {
        var endX = (0, _util.pointerCoord)(event).x;
        if (this.previouslyChecked === true && this.startX + 4 > endX) {
          if (this.previouslyChecked !== this.state.checked) {
            this.setState({ checked: false });
            this.previouslyChecked = this.state.checked;
            checkbox.click();
          }
        } else if (this.startX - 4 < endX) {
          if (this.previouslyChecked !== this.state.checked) {
            this.setState({ checked: true });
            this.previouslyChecked = this.state.checked;
            checkbox.click();
          }
        }

        this.activated = false;
        this.startX = null;
        this.moved = false;
      }
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus(event) {
      var onFocus = this.props.onFocus;


      if (onFocus) {
        onFocus(event);
      }

      this.setState({ hasFocus: true });
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(event) {
      var onBlur = this.props.onBlur;


      if (onBlur) {
        onBlur(event);
      }

      this.setState({ hasFocus: false });
    }
  }, {
    key: 'getIcon',
    value: function getIcon(type) {
      var icons = this.props.icons;

      if (!icons) {
        return null;
      }
      return icons[type] === undefined ? Toggle.defaultProps.icons[type] : icons[type];
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          _icons = _props.icons,
          inputProps = _objectWithoutProperties(_props, ['className', 'icons']);

      var classes = (0, _classnames2.default)('react-toggle', {
        'react-toggle--checked': this.state.checked,
        'react-toggle--focus': this.state.hasFocus,
        'react-toggle--disabled': this.props.disabled
      }, className);

      return _react2.default.createElement(
        'div',
        { className: classes,
          onClick: this.handleClick,
          onTouchStart: this.handleTouchStart,
          onTouchMove: this.handleTouchMove,
          onTouchEnd: this.handleTouchEnd },
        _react2.default.createElement(
          'div',
          { className: 'react-toggle-track' },
          _react2.default.createElement(
            'div',
            { className: 'react-toggle-track-check' },
            this.getIcon('checked')
          ),
          _react2.default.createElement(
            'div',
            { className: 'react-toggle-track-x' },
            this.getIcon('unchecked')
          )
        ),
        _react2.default.createElement('div', { className: 'react-toggle-thumb' }),
        _react2.default.createElement('input', _extends({}, inputProps, {
          ref: function ref(_ref) {
            _this2.input = _ref;
          },
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          className: 'react-toggle-screenreader-only',
          type: 'checkbox' }))
      );
    }
  }]);

  return Toggle;
}(_react.PureComponent);

exports.default = Toggle;


Toggle.displayName = 'Toggle';

Toggle.defaultProps = {
  icons: {
    checked: _react2.default.createElement(_check2.default, null),
    unchecked: _react2.default.createElement(_x2.default, null)
  }
};

Toggle.propTypes = {
  checked: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  defaultChecked: _propTypes2.default.bool,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  className: _propTypes2.default.string,
  name: _propTypes2.default.string,
  value: _propTypes2.default.string,
  id: _propTypes2.default.string,
  'aria-labelledby': _propTypes2.default.string,
  'aria-label': _propTypes2.default.string,
  icons: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.shape({
    checked: _propTypes2.default.node,
    unchecked: _propTypes2.default.node
  })])
};

/***/ }),

/***/ 351:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ 352:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    'svg',
    { width: '14', height: '11', viewBox: '0 0 14 11' },
    _react2.default.createElement('path', { d: 'M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0', fill: '#fff', fillRule: 'evenodd' })
  );
};

/***/ }),

/***/ 353:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    'svg',
    { width: '10', height: '10', viewBox: '0 0 10 10' },
    _react2.default.createElement('path', { d: 'M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12', fill: '#fff', fillRule: 'evenodd' })
  );
};

/***/ }),

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pointerCoord = pointerCoord;
// Copyright 2015-present Drifty Co.
// http://drifty.com/
// from: https://github.com/driftyco/ionic/blob/master/src/util/dom.ts

function pointerCoord(event) {
  // get coordinates for either a mouse click
  // or a touch depending on the given event
  if (event) {
    var changedTouches = event.changedTouches;
    if (changedTouches && changedTouches.length > 0) {
      var touch = changedTouches[0];
      return { x: touch.clientX, y: touch.clientY };
    }
    var pageX = event.pageX;
    if (pageX !== undefined) {
      return { x: pageX, y: event.pageY };
    }
  }
  return { x: 0, y: 0 };
}

/***/ }),

/***/ 355:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"toggle": "toggle_3NWk"
};


/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DocsVersionNavbarItem; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(314);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(316);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DefaultNavbarItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(322);
/* harmony import */ var _theme_hooks_useDocs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(318);
/* harmony import */ var _theme_hooks_useDocs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_theme_hooks_useDocs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(309);
/* harmony import */ var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_5__);



/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





var getVersionMainDoc = function getVersionMainDoc(version) {
  return version.docs.find(function (doc) {
    return doc.id === version.mainDocId;
  });
};

function DocsVersionNavbarItem(_ref) {
  var _ref2;

  var staticLabel = _ref.label,
      staticTo = _ref.to,
      docsPluginId = _ref.docsPluginId,
      props = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["label", "to", "docsPluginId"]);

  var activeVersion = Object(_theme_hooks_useDocs__WEBPACK_IMPORTED_MODULE_4__["useActiveVersion"])(docsPluginId);

  var _useDocsPreferredVers = Object(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_5__["useDocsPreferredVersion"])(docsPluginId),
      preferredVersion = _useDocsPreferredVers.preferredVersion;

  var latestVersion = Object(_theme_hooks_useDocs__WEBPACK_IMPORTED_MODULE_4__["useLatestVersion"])(docsPluginId);
  var version = (_ref2 = activeVersion !== null && activeVersion !== void 0 ? activeVersion : preferredVersion) !== null && _ref2 !== void 0 ? _ref2 : latestVersion;
  var label = staticLabel !== null && staticLabel !== void 0 ? staticLabel : version.label;
  var path = staticTo !== null && staticTo !== void 0 ? staticTo : getVersionMainDoc(version).path;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_DefaultNavbarItem__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
    label: label,
    to: path
  }));
}

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DocsVersionDropdownNavbarItem; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(314);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(316);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _DefaultNavbarItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(322);
/* harmony import */ var _theme_hooks_useDocs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(318);
/* harmony import */ var _theme_hooks_useDocs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_theme_hooks_useDocs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(309);
/* harmony import */ var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_6__);




/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





var getVersionMainDoc = function getVersionMainDoc(version) {
  return version.docs.find(function (doc) {
    return doc.id === version.mainDocId;
  });
};

function DocsVersionDropdownNavbarItem(_ref) {
  var _ref2, _activeDocContext$act;

  var mobile = _ref.mobile,
      docsPluginId = _ref.docsPluginId,
      dropdownActiveClassDisabled = _ref.dropdownActiveClassDisabled,
      dropdownItemsBefore = _ref.dropdownItemsBefore,
      dropdownItemsAfter = _ref.dropdownItemsAfter,
      props = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default()(_ref, ["mobile", "docsPluginId", "dropdownActiveClassDisabled", "dropdownItemsBefore", "dropdownItemsAfter"]);

  var activeDocContext = Object(_theme_hooks_useDocs__WEBPACK_IMPORTED_MODULE_5__["useActiveDocContext"])(docsPluginId);
  var versions = Object(_theme_hooks_useDocs__WEBPACK_IMPORTED_MODULE_5__["useVersions"])(docsPluginId);
  var latestVersion = Object(_theme_hooks_useDocs__WEBPACK_IMPORTED_MODULE_5__["useLatestVersion"])(docsPluginId);

  var _useDocsPreferredVers = Object(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_6__["useDocsPreferredVersion"])(docsPluginId),
      preferredVersion = _useDocsPreferredVers.preferredVersion,
      savePreferredVersionName = _useDocsPreferredVers.savePreferredVersionName;

  function getItems() {
    var versionLinks = versions.map(function (version) {
      // We try to link to the same doc, in another version
      // When not possible, fallback to the "main doc" of the version
      var versionDoc = (activeDocContext === null || activeDocContext === void 0 ? void 0 : activeDocContext.alternateDocVersions[version.name]) || getVersionMainDoc(version);
      return {
        isNavLink: true,
        label: version.label,
        to: versionDoc.path,
        isActive: function isActive() {
          return version === (activeDocContext === null || activeDocContext === void 0 ? void 0 : activeDocContext.activeVersion);
        },
        onClick: function onClick() {
          savePreferredVersionName(version.name);
        }
      };
    });
    var items = [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(dropdownItemsBefore), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(versionLinks), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(dropdownItemsAfter)); // We don't want to render a version dropdown with 0 or 1 item
    // If we build the site with a single docs version (onlyIncludeVersions: ['1.0.0'])
    // We'd rather render a button instead of a dropdown

    if (items.length <= 1) {
      return undefined;
    }

    return items;
  }

  var dropdownVersion = (_ref2 = (_activeDocContext$act = activeDocContext.activeVersion) !== null && _activeDocContext$act !== void 0 ? _activeDocContext$act : preferredVersion) !== null && _ref2 !== void 0 ? _ref2 : latestVersion; // Mobile is handled a bit differently

  var dropdownLabel = mobile ? 'Versions' : dropdownVersion.label;
  var dropdownTo = mobile ? undefined : getVersionMainDoc(dropdownVersion).path;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_DefaultNavbarItem__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
    mobile: mobile,
    label: dropdownLabel,
    to: dropdownTo,
    items: getItems(),
    isActive: dropdownActiveClassDisabled ? function () {
      return false;
    } : undefined
  }));
}

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DocNavbarItem; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(314);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(317);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(316);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _DefaultNavbarItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(322);
/* harmony import */ var _theme_hooks_useDocs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(318);
/* harmony import */ var _theme_hooks_useDocs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_theme_hooks_useDocs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(315);
/* harmony import */ var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(309);
/* harmony import */ var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_7__);




/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





function DocNavbarItem(_ref) {
  var _ref2;

  var docId = _ref.docId,
      activeSidebarClassName = _ref.activeSidebarClassName,
      staticLabel = _ref.label,
      docsPluginId = _ref.docsPluginId,
      props = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default()(_ref, ["docId", "activeSidebarClassName", "label", "docsPluginId"]);

  var _useActiveDocContext = Object(_theme_hooks_useDocs__WEBPACK_IMPORTED_MODULE_5__["useActiveDocContext"])(docsPluginId),
      activeVersion = _useActiveDocContext.activeVersion,
      activeDoc = _useActiveDocContext.activeDoc;

  var _useDocsPreferredVers = Object(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_7__["useDocsPreferredVersion"])(docsPluginId),
      preferredVersion = _useDocsPreferredVers.preferredVersion;

  var latestVersion = Object(_theme_hooks_useDocs__WEBPACK_IMPORTED_MODULE_5__["useLatestVersion"])(docsPluginId);
  var version = (_ref2 = activeVersion !== null && activeVersion !== void 0 ? activeVersion : preferredVersion) !== null && _ref2 !== void 0 ? _ref2 : latestVersion;
  var doc = version.docs.find(function (versionDoc) {
    return versionDoc.id === docId;
  });

  if (!doc) {
    throw new Error("DocNavbarItem: couldn't find any doc with id=".concat(docId, " in version ").concat(version.name, ".\nAvailable docIds=\n- ").concat(version.docs.join('\n- ')));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_DefaultNavbarItem__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    exact: true
  }, props, {
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(props.className, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, activeSidebarClassName, activeDoc && activeDoc.sidebar === doc.sidebar)),
    label: staticLabel !== null && staticLabel !== void 0 ? staticLabel : doc.id,
    to: doc.path
  }));
}

/***/ }),

/***/ 359:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"themedImage": "themedImage_YANc",
	"themedImage--light": "themedImage--light_3CMI",
	"themedImage--dark": "themedImage--dark_3ARp"
};


/***/ }),

/***/ 360:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"displayOnlyInLargeViewport": "displayOnlyInLargeViewport_2N3Q",
	"hideLogoText": "hideLogoText_2jLQ",
	"navbarHideable": "navbarHideable_17Wu",
	"navbarHidden": "navbarHidden_19ww"
};


/***/ }),

/***/ 361:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"footerLogoLink": "footerLogoLink_31Aa"
};


/***/ }),

/***/ 362:
/***/ (function(module, exports) {



/***/ }),

/***/ 363:
/***/ (function(module, exports) {



/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _theme_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(346);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



function NotFound() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_theme_Layout__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    title: "Page Not Found"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
    className: "container margin-vert--xl"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col col--6 col--offset-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "hero__title"
  }, "Page Not Found"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "We could not find what you were looking for."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Please contact the owner of the site that linked you to the original URL and let them know their link is broken.")))));
}

/* harmony default export */ __webpack_exports__["default"] = (NotFound);

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "d", function() { return /* reexport */ react_router["a" /* MemoryRouter */]; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* reexport */ react_router["b" /* Prompt */]; });
__webpack_require__.d(__webpack_exports__, "g", function() { return /* reexport */ react_router["c" /* Redirect */]; });
__webpack_require__.d(__webpack_exports__, "h", function() { return /* reexport */ react_router["d" /* Route */]; });
__webpack_require__.d(__webpack_exports__, "i", function() { return /* reexport */ react_router["e" /* Router */]; });
__webpack_require__.d(__webpack_exports__, "j", function() { return /* reexport */ react_router["f" /* StaticRouter */]; });
__webpack_require__.d(__webpack_exports__, "k", function() { return /* reexport */ react_router["g" /* Switch */]; });
__webpack_require__.d(__webpack_exports__, "l", function() { return /* reexport */ react_router["i" /* generatePath */]; });
__webpack_require__.d(__webpack_exports__, "m", function() { return /* reexport */ react_router["j" /* matchPath */]; });
__webpack_require__.d(__webpack_exports__, "n", function() { return /* reexport */ react_router["k" /* useHistory */]; });
__webpack_require__.d(__webpack_exports__, "o", function() { return /* reexport */ react_router["l" /* useLocation */]; });
__webpack_require__.d(__webpack_exports__, "p", function() { return /* reexport */ react_router["m" /* useParams */]; });
__webpack_require__.d(__webpack_exports__, "q", function() { return /* reexport */ react_router["n" /* useRouteMatch */]; });
__webpack_require__.d(__webpack_exports__, "r", function() { return /* reexport */ react_router["o" /* withRouter */]; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ react_router_dom_BrowserRouter; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ react_router_dom_HashRouter; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ Link; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* binding */ NavLink; });

// EXTERNAL MODULE: ./node_modules/react-router/esm/react-router.js + 7 modules
var react_router = __webpack_require__(18);

// CONCATENATED MODULE: ./node_modules/react-router-dom/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
// CONCATENATED MODULE: ./node_modules/react-router-dom/node_modules/@babel/runtime/helpers/esm/inheritsLoose.js

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/history/esm/history.js + 3 modules
var esm_history = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/react-router-dom/node_modules/@babel/runtime/helpers/esm/extends.js
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
// CONCATENATED MODULE: ./node_modules/react-router-dom/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
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
// EXTERNAL MODULE: ./node_modules/tiny-invariant/dist/tiny-invariant.esm.js
var tiny_invariant_esm = __webpack_require__(10);

// CONCATENATED MODULE: ./node_modules/react-router-dom/esm/react-router-dom.js











/**
 * The public API for a <Router> that uses HTML5 history.
 */

var react_router_dom_BrowserRouter =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(BrowserRouter, _React$Component);

  function BrowserRouter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = Object(esm_history["a" /* createBrowserHistory */])(_this.props);
    return _this;
  }

  var _proto = BrowserRouter.prototype;

  _proto.render = function render() {
    return react_default.a.createElement(react_router["e" /* Router */], {
      history: this.history,
      children: this.props.children
    });
  };

  return BrowserRouter;
}(react_default.a.Component);

if (false) {}

/**
 * The public API for a <Router> that uses window.location.hash.
 */

var react_router_dom_HashRouter =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(HashRouter, _React$Component);

  function HashRouter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = Object(esm_history["b" /* createHashHistory */])(_this.props);
    return _this;
  }

  var _proto = HashRouter.prototype;

  _proto.render = function render() {
    return react_default.a.createElement(react_router["e" /* Router */], {
      history: this.history,
      children: this.props.children
    });
  };

  return HashRouter;
}(react_default.a.Component);

if (false) {}

var resolveToLocation = function resolveToLocation(to, currentLocation) {
  return typeof to === "function" ? to(currentLocation) : to;
};
var react_router_dom_normalizeToLocation = function normalizeToLocation(to, currentLocation) {
  return typeof to === "string" ? Object(esm_history["c" /* createLocation */])(to, null, null, currentLocation) : to;
};

var forwardRefShim = function forwardRefShim(C) {
  return C;
};

var forwardRef = react_default.a.forwardRef;

if (typeof forwardRef === "undefined") {
  forwardRef = forwardRefShim;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

var LinkAnchor = forwardRef(function (_ref, forwardedRef) {
  var innerRef = _ref.innerRef,
      navigate = _ref.navigate,
      _onClick = _ref.onClick,
      rest = _objectWithoutPropertiesLoose(_ref, ["innerRef", "navigate", "onClick"]);

  var target = rest.target;

  var props = _extends({}, rest, {
    onClick: function onClick(event) {
      try {
        if (_onClick) _onClick(event);
      } catch (ex) {
        event.preventDefault();
        throw ex;
      }

      if (!event.defaultPrevented && // onClick prevented default
      event.button === 0 && ( // ignore everything but left clicks
      !target || target === "_self") && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
          event.preventDefault();
          navigate();
        }
    }
  }); // React 15 compat


  if (forwardRefShim !== forwardRef) {
    props.ref = forwardedRef || innerRef;
  } else {
    props.ref = innerRef;
  }
  /* eslint-disable-next-line jsx-a11y/anchor-has-content */


  return react_default.a.createElement("a", props);
});

if (false) {}
/**
 * The public API for rendering a history-aware <a>.
 */


var Link = forwardRef(function (_ref2, forwardedRef) {
  var _ref2$component = _ref2.component,
      component = _ref2$component === void 0 ? LinkAnchor : _ref2$component,
      replace = _ref2.replace,
      to = _ref2.to,
      innerRef = _ref2.innerRef,
      rest = _objectWithoutPropertiesLoose(_ref2, ["component", "replace", "to", "innerRef"]);

  return react_default.a.createElement(react_router["h" /* __RouterContext */].Consumer, null, function (context) {
    !context ?  false ? undefined : Object(tiny_invariant_esm["a" /* default */])(false) : void 0;
    var history = context.history;
    var location = react_router_dom_normalizeToLocation(resolveToLocation(to, context.location), context.location);
    var href = location ? history.createHref(location) : "";

    var props = _extends({}, rest, {
      href: href,
      navigate: function navigate() {
        var location = resolveToLocation(to, context.location);
        var method = replace ? history.replace : history.push;
        method(location);
      }
    }); // React 15 compat


    if (forwardRefShim !== forwardRef) {
      props.ref = forwardedRef || innerRef;
    } else {
      props.innerRef = innerRef;
    }

    return react_default.a.createElement(component, props);
  });
});

if (false) { var refType, toType; }

var forwardRefShim$1 = function forwardRefShim(C) {
  return C;
};

var forwardRef$1 = react_default.a.forwardRef;

if (typeof forwardRef$1 === "undefined") {
  forwardRef$1 = forwardRefShim$1;
}

function joinClassnames() {
  for (var _len = arguments.length, classnames = new Array(_len), _key = 0; _key < _len; _key++) {
    classnames[_key] = arguments[_key];
  }

  return classnames.filter(function (i) {
    return i;
  }).join(" ");
}
/**
 * A <Link> wrapper that knows if it's "active" or not.
 */


var NavLink = forwardRef$1(function (_ref, forwardedRef) {
  var _ref$ariaCurrent = _ref["aria-current"],
      ariaCurrent = _ref$ariaCurrent === void 0 ? "page" : _ref$ariaCurrent,
      _ref$activeClassName = _ref.activeClassName,
      activeClassName = _ref$activeClassName === void 0 ? "active" : _ref$activeClassName,
      activeStyle = _ref.activeStyle,
      classNameProp = _ref.className,
      exact = _ref.exact,
      isActiveProp = _ref.isActive,
      locationProp = _ref.location,
      sensitive = _ref.sensitive,
      strict = _ref.strict,
      styleProp = _ref.style,
      to = _ref.to,
      innerRef = _ref.innerRef,
      rest = _objectWithoutPropertiesLoose(_ref, ["aria-current", "activeClassName", "activeStyle", "className", "exact", "isActive", "location", "sensitive", "strict", "style", "to", "innerRef"]);

  return react_default.a.createElement(react_router["h" /* __RouterContext */].Consumer, null, function (context) {
    !context ?  false ? undefined : Object(tiny_invariant_esm["a" /* default */])(false) : void 0;
    var currentLocation = locationProp || context.location;
    var toLocation = react_router_dom_normalizeToLocation(resolveToLocation(to, currentLocation), currentLocation);
    var path = toLocation.pathname; // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202

    var escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    var match = escapedPath ? Object(react_router["j" /* matchPath */])(currentLocation.pathname, {
      path: escapedPath,
      exact: exact,
      sensitive: sensitive,
      strict: strict
    }) : null;
    var isActive = !!(isActiveProp ? isActiveProp(match, currentLocation) : match);
    var className = isActive ? joinClassnames(classNameProp, activeClassName) : classNameProp;
    var style = isActive ? _extends({}, styleProp, {}, activeStyle) : styleProp;

    var props = _extends({
      "aria-current": isActive && ariaCurrent || null,
      className: className,
      style: style,
      to: toLocation
    }, rest); // React 15 compat


    if (forwardRefShim$1 !== forwardRef$1) {
      props.ref = forwardedRef || innerRef;
    } else {
      props.innerRef = innerRef;
    }

    return react_default.a.createElement(Link, props);
  });
});

if (false) { var ariaCurrentType; }


//# sourceMappingURL=react-router-dom.js.map


/***/ })

};;