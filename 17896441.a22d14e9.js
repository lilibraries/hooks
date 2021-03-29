exports.ids = [4];
exports.modules = {

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(317);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/Head.js
var Head = __webpack_require__(69);

// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-common/lib/index.js
var lib = __webpack_require__(309);

// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/useDocusaurusContext.js
var useDocusaurusContext = __webpack_require__(66);

// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/useBaseUrl.js
var useBaseUrl = __webpack_require__(320);

// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/Link.js
var Link = __webpack_require__(321);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/DocPaginator/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



function DocPaginator(props) {
  var metadata = props.metadata;
  return /*#__PURE__*/react_default.a.createElement("nav", {
    className: "pagination-nav",
    "aria-label": "Blog list page navigation"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "pagination-nav__item"
  }, metadata.previous && /*#__PURE__*/react_default.a.createElement(Link["a" /* default */], {
    className: "pagination-nav__link",
    to: metadata.previous.permalink
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "pagination-nav__sublabel"
  }, "Previous"), /*#__PURE__*/react_default.a.createElement("div", {
    className: "pagination-nav__label"
  }, "\xAB ", metadata.previous.title))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "pagination-nav__item pagination-nav__item--next"
  }, metadata.next && /*#__PURE__*/react_default.a.createElement(Link["a" /* default */], {
    className: "pagination-nav__link",
    to: metadata.next.permalink
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "pagination-nav__sublabel"
  }, "Next"), /*#__PURE__*/react_default.a.createElement("div", {
    className: "pagination-nav__label"
  }, metadata.next.title, " \xBB"))));
}

/* harmony default export */ var theme_DocPaginator = (DocPaginator);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/hooks/useDocs.js
var useDocs = __webpack_require__(318);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/DocVersionSuggestions/index.js
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

function DocVersionSuggestions() {
  var _useDocusaurusContext = Object(useDocusaurusContext["default"])(),
      siteTitle = _useDocusaurusContext.siteConfig.title;

  var _useActivePlugin = Object(useDocs["useActivePlugin"])({
    failfast: true
  }),
      pluginId = _useActivePlugin.pluginId;

  var _useDocsPreferredVers = Object(lib["useDocsPreferredVersion"])(pluginId),
      savePreferredVersionName = _useDocsPreferredVers.savePreferredVersionName;

  var activeVersion = Object(useDocs["useActiveVersion"])(pluginId);

  var _useDocVersionSuggest = Object(useDocs["useDocVersionSuggestions"])(pluginId),
      latestDocSuggestion = _useDocVersionSuggest.latestDocSuggestion,
      latestVersionSuggestion = _useDocVersionSuggest.latestVersionSuggestion; // No suggestion to be made


  if (!latestVersionSuggestion) {
    return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
  } // try to link to same doc in latest version (not always possible)
  // fallback to main doc of latest version


  var latestVersionSuggestedDoc = latestDocSuggestion !== null && latestDocSuggestion !== void 0 ? latestDocSuggestion : getVersionMainDoc(latestVersionSuggestion);
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "alert alert--warning margin-bottom--md",
    role: "alert"
  }, // TODO need refactoring
  activeVersion.name === 'current' ? /*#__PURE__*/react_default.a.createElement("div", null, "This is unreleased documentation for ", siteTitle, ' ', /*#__PURE__*/react_default.a.createElement("strong", null, activeVersion.label), " version.") : /*#__PURE__*/react_default.a.createElement("div", null, "This is documentation for ", siteTitle, ' ', /*#__PURE__*/react_default.a.createElement("strong", null, activeVersion.label), ", which is no longer actively maintained."), /*#__PURE__*/react_default.a.createElement("div", {
    className: "margin-top--md"
  }, "For up-to-date documentation, see the", ' ', /*#__PURE__*/react_default.a.createElement("strong", null, /*#__PURE__*/react_default.a.createElement(Link["a" /* default */], {
    to: latestVersionSuggestedDoc.path,
    onClick: function onClick() {
      return savePreferredVersionName(latestVersionSuggestion.name);
    }
  }, "latest version")), ' ', "(", latestVersionSuggestion.label, ")."));
}

/* harmony default export */ var theme_DocVersionSuggestions = (DocVersionSuggestions);
// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.m.js
var clsx_m = __webpack_require__(315);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(65);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/hooks/useTOCHighlight.js


/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


function useTOCHighlight(linkClassName, linkActiveClassName, topOffset) {
  var _useState = Object(react["useState"])(undefined),
      _useState2 = slicedToArray_default()(_useState, 2),
      lastActiveLink = _useState2[0],
      setLastActiveLink = _useState2[1];

  Object(react["useEffect"])(function () {
    function setActiveLink() {
      function getActiveHeaderAnchor() {
        var headersAnchors = Array.from(document.getElementsByClassName('anchor'));
        var firstAnchorUnderViewportTop = headersAnchors.find(function (anchor) {
          var _anchor$getBoundingCl = anchor.getBoundingClientRect(),
              top = _anchor$getBoundingCl.top;

          return top >= topOffset;
        });

        if (firstAnchorUnderViewportTop) {
          // If first anchor in viewport is under a certain threshold, we consider it's not the active anchor.
          // In such case, the active anchor is the previous one (if it exists), that may be above the viewport
          if (firstAnchorUnderViewportTop.getBoundingClientRect().top >= topOffset) {
            var previousAnchor = headersAnchors[headersAnchors.indexOf(firstAnchorUnderViewportTop) - 1];
            return previousAnchor !== null && previousAnchor !== void 0 ? previousAnchor : firstAnchorUnderViewportTop;
          } // If the anchor is at the top of the viewport, we consider it's the first anchor
          else {
              return firstAnchorUnderViewportTop;
            }
        } // no anchor under viewport top? (ie we are at the bottom of the page)
        else {
            // highlight the last anchor found
            return headersAnchors[headersAnchors.length - 1];
          }
      }

      var activeHeaderAnchor = getActiveHeaderAnchor();

      if (activeHeaderAnchor) {
        var index = 0;
        var itemHighlighted = false; // @ts-expect-error: Must be <a> tags.

        var links = document.getElementsByClassName(linkClassName);

        while (index < links.length && !itemHighlighted) {
          var link = links[index];
          var href = link.href;
          var anchorValue = decodeURIComponent(href.substring(href.indexOf('#') + 1));

          if (activeHeaderAnchor.id === anchorValue) {
            if (lastActiveLink) {
              lastActiveLink.classList.remove(linkActiveClassName);
            }

            link.classList.add(linkActiveClassName);
            setLastActiveLink(link);
            itemHighlighted = true;
          }

          index += 1;
        }
      }
    }

    document.addEventListener('scroll', setActiveLink);
    document.addEventListener('resize', setActiveLink);
    setActiveLink();
    return function () {
      document.removeEventListener('scroll', setActiveLink);
      document.removeEventListener('resize', setActiveLink);
    };
  });
}

/* harmony default export */ var hooks_useTOCHighlight = (useTOCHighlight);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/TOC/styles.module.css
var styles_module = __webpack_require__(365);
var styles_module_default = /*#__PURE__*/__webpack_require__.n(styles_module);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/TOC/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */




var LINK_CLASS_NAME = 'table-of-contents__link';
var ACTIVE_LINK_CLASS_NAME = 'table-of-contents__link--active';
var TOP_OFFSET = 100;
/* eslint-disable jsx-a11y/control-has-associated-label */

function Headings(_ref) {
  var toc = _ref.toc,
      isChild = _ref.isChild;

  if (!toc.length) {
    return null;
  }

  return /*#__PURE__*/react_default.a.createElement("ul", {
    className: isChild ? '' : 'table-of-contents table-of-contents__left-border'
  }, toc.map(function (heading) {
    return /*#__PURE__*/react_default.a.createElement("li", {
      key: heading.id
    }, /*#__PURE__*/react_default.a.createElement("a", {
      href: "#".concat(heading.id),
      className: LINK_CLASS_NAME // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      ,
      dangerouslySetInnerHTML: {
        __html: heading.value
      }
    }), /*#__PURE__*/react_default.a.createElement(Headings, {
      isChild: true,
      toc: heading.children
    }));
  }));
}

function TOC(_ref2) {
  var toc = _ref2.toc;
  hooks_useTOCHighlight(LINK_CLASS_NAME, ACTIVE_LINK_CLASS_NAME, TOP_OFFSET);
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: Object(clsx_m["a" /* default */])(styles_module_default.a.tableOfContents, 'thin-scrollbar')
  }, /*#__PURE__*/react_default.a.createElement(Headings, {
    toc: toc
  }));
}

/* harmony default export */ var theme_TOC = (TOC);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/extends.js
var helpers_extends = __webpack_require__(314);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(316);
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/IconEdit/styles.module.css
var IconEdit_styles_module = __webpack_require__(366);
var IconEdit_styles_module_default = /*#__PURE__*/__webpack_require__.n(IconEdit_styles_module);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/IconEdit/index.js



/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */




var IconEdit_IconEdit = function IconEdit(_ref) {
  var className = _ref.className,
      restProps = objectWithoutProperties_default()(_ref, ["className"]);

  return /*#__PURE__*/react_default.a.createElement("svg", extends_default()({
    fill: "currentColor",
    height: "1.2em",
    width: "1.2em",
    preserveAspectRatio: "xMidYMid meet",
    role: "img",
    viewBox: "0 0 40 40",
    className: Object(clsx_m["a" /* default */])(IconEdit_styles_module_default.a.iconEdit, className)
  }, restProps), /*#__PURE__*/react_default.a.createElement("g", null, /*#__PURE__*/react_default.a.createElement("path", {
    d: "m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"
  })));
};

/* harmony default export */ var theme_IconEdit = (IconEdit_IconEdit);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/DocItem/styles.module.css
var DocItem_styles_module = __webpack_require__(367);
var DocItem_styles_module_default = /*#__PURE__*/__webpack_require__.n(DocItem_styles_module);

// CONCATENATED MODULE: ./node_modules/@docusaurus/theme-classic/lib-next/theme/DocItem/index.js


/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */













function DocItem(props) {
  var _useDocusaurusContext = Object(useDocusaurusContext["default"])(),
      siteConfig = _useDocusaurusContext.siteConfig;

  var siteUrl = siteConfig.url;
  var DocContent = props.content;
  var metadata = DocContent.metadata,
      _DocContent$frontMatt = DocContent.frontMatter,
      metaImage = _DocContent$frontMatt.image,
      keywords = _DocContent$frontMatt.keywords,
      hideTitle = _DocContent$frontMatt.hide_title,
      hideTableOfContents = _DocContent$frontMatt.hide_table_of_contents;
  var description = metadata.description,
      title = metadata.title,
      permalink = metadata.permalink,
      editUrl = metadata.editUrl,
      lastUpdatedAt = metadata.lastUpdatedAt,
      lastUpdatedBy = metadata.lastUpdatedBy;

  var _useActivePlugin = Object(useDocs["useActivePlugin"])({
    failfast: true
  }),
      pluginId = _useActivePlugin.pluginId;

  var versions = Object(useDocs["useVersions"])(pluginId);
  var version = Object(useDocs["useActiveVersion"])(pluginId); // If site is not versioned or only one version is included
  // we don't show the version badge
  // See https://github.com/facebook/docusaurus/issues/3362

  var showVersionBadge = versions.length > 1;
  var metaTitle = Object(lib["useTitleFormatter"])(title);
  var metaImageUrl = Object(useBaseUrl["a" /* default */])(metaImage, {
    absolute: true
  });
  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(Head["a" /* default */], null, /*#__PURE__*/react_default.a.createElement("title", null, metaTitle), /*#__PURE__*/react_default.a.createElement("meta", {
    property: "og:title",
    content: metaTitle
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
    content: "Image for ".concat(title)
  }), permalink && /*#__PURE__*/react_default.a.createElement("meta", {
    property: "og:url",
    content: siteUrl + permalink
  }), permalink && /*#__PURE__*/react_default.a.createElement("link", {
    rel: "canonical",
    href: siteUrl + permalink
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: Object(clsx_m["a" /* default */])('col', defineProperty_default()({}, DocItem_styles_module_default.a.docItemCol, !hideTableOfContents))
  }, /*#__PURE__*/react_default.a.createElement(theme_DocVersionSuggestions, null), /*#__PURE__*/react_default.a.createElement("div", {
    className: DocItem_styles_module_default.a.docItemContainer
  }, /*#__PURE__*/react_default.a.createElement("article", null, showVersionBadge && /*#__PURE__*/react_default.a.createElement("div", null, /*#__PURE__*/react_default.a.createElement("span", {
    className: "badge badge--secondary"
  }, "Version: ", version.label)), !hideTitle && /*#__PURE__*/react_default.a.createElement("header", null, /*#__PURE__*/react_default.a.createElement("h1", {
    className: DocItem_styles_module_default.a.docTitle
  }, title)), /*#__PURE__*/react_default.a.createElement("div", {
    className: "markdown"
  }, /*#__PURE__*/react_default.a.createElement(DocContent, null))), (editUrl || lastUpdatedAt || lastUpdatedBy) && /*#__PURE__*/react_default.a.createElement("div", {
    className: "margin-vert--xl"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "col"
  }, editUrl && /*#__PURE__*/react_default.a.createElement("a", {
    href: editUrl,
    target: "_blank",
    rel: "noreferrer noopener"
  }, /*#__PURE__*/react_default.a.createElement(theme_IconEdit, null), "Edit this page")), (lastUpdatedAt || lastUpdatedBy) && /*#__PURE__*/react_default.a.createElement("div", {
    className: "col text--right"
  }, /*#__PURE__*/react_default.a.createElement("em", null, /*#__PURE__*/react_default.a.createElement("small", null, "Last updated", ' ', lastUpdatedAt && /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, "on", ' ', /*#__PURE__*/react_default.a.createElement("time", {
    dateTime: new Date(lastUpdatedAt * 1000).toISOString(),
    className: DocItem_styles_module_default.a.docLastUpdatedAt
  }, new Date(lastUpdatedAt * 1000).toLocaleDateString()), lastUpdatedBy && ' '), lastUpdatedBy && /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, "by ", /*#__PURE__*/react_default.a.createElement("strong", null, lastUpdatedBy)),  false && /*#__PURE__*/false))))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "margin-vert--lg"
  }, /*#__PURE__*/react_default.a.createElement(theme_DocPaginator, {
    metadata: metadata
  })))), !hideTableOfContents && DocContent.toc && /*#__PURE__*/react_default.a.createElement("div", {
    className: "col col--3"
  }, /*#__PURE__*/react_default.a.createElement(theme_TOC, {
    toc: DocContent.toc
  }))));
}

/* harmony default export */ var theme_DocItem = __webpack_exports__["default"] = (DocItem);

/***/ }),

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

/***/ 365:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"tableOfContents": "tableOfContents_2xL-",
	"docItemContainer": "docItemContainer_1Kik"
};


/***/ }),

/***/ 366:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"iconEdit": "iconEdit_2LL7"
};


/***/ }),

/***/ 367:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"docTitle": "docTitle_Oumm",
	"docItemContainer": "docItemContainer_a7m4",
	"docItemCol": "docItemCol_U38p",
	"docLastUpdatedAt": "docLastUpdatedAt_1Qna"
};


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