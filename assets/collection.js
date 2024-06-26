/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 4558:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AmyrisTheme": function() { return /* binding */ AmyrisTheme; },
/* harmony export */   "AmyrisThemeSettings": function() { return /* binding */ AmyrisThemeSettings; },
/* harmony export */   "AmyrisThemeStrings": function() { return /* binding */ AmyrisThemeStrings; },
/* harmony export */   "_ThemeEvent": function() { return /* binding */ _ThemeEvent; }
/* harmony export */ });
const AmyrisTheme = window.spratlyTheme || {};
const AmyrisThemeSettings = window.spratlyThemeSettings || {};
const AmyrisThemeStrings = window.spratlyThemeStrings || {};
const _ThemeEvent = window._ThemeEvent || {};

/***/ }),

/***/ 6295:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mdn_polyfills_Node_prototype_append_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2422);
/* harmony import */ var mdn_polyfills_Node_prototype_append_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mdn_polyfills_Node_prototype_append_js__WEBPACK_IMPORTED_MODULE_0__);


class JSX {
  constructor() {
    this.component = this.component.bind(this);
    return this.component;
  }

  component(tagName, attrs, ...children) {
    if (typeof tagName === 'function') {
      // Override children
      return tagName({ ...attrs,
        children
      });
    }

    if (children) {
      children = children.filter(val => val !== null);
    }

    if (attrs) {
      if (attrs.class) {
        attrs.className = attrs.class;
      }

      delete attrs.children;
    } // Normal DOM node tagName


    function createWithAttrs(tagName, attrs) {
      attrs = attrs || {};
      let elem = document.createElement(tagName);

      try {
        elem = Object.assign(elem, attrs);
      } catch {
        const attrKeys = Object.keys(attrs);

        for (let i = 0; i < attrKeys.length; i++) {
          if (attrs[i] !== 'dataSet') {
            elem.setAttribute(attrKeys[i], attrs[attrKeys[i]]);
          }
        }
      }

      return elem;
    }

    let elem = tagName !== 'fragment' ? createWithAttrs(tagName, attrs) : document.createDocumentFragment(); // Evaluate SVG DOM node tagName
    // All svg inner tags: https://developer.mozilla.org/en-US/docs/Web/SVG/Element

    const svgInnerTags = ['svg', 'path', 'rect', 'text', 'circle', 'g'];

    if (svgInnerTags.indexOf(tagName) !== -1) {
      elem = document.createElementNS('http://www.w3.org/2000/svg', tagName);

      for (const key in attrs) {
        const attrName = key === 'className' ? 'class' : key;
        elem.setAttribute(attrName, attrs[key]);
      }
    } // Populate children to created DOM Node


    for (const child of children) {
      if (Array.isArray(child)) {
        elem.append(...child);
      } else {
        elem.append(child);
      }
    } // After elements are created


    if (attrs !== null && attrs !== void 0 && attrs.dataSet) {
      for (const key in attrs.dataSet) {
        if (Object.prototype.hasOwnProperty.call(attrs.dataSet, key)) {
          elem.dataset[key] = attrs.dataSet[key];
        }
      }
    }

    if (attrs && !window.__aleartedJSXData) {
      if (Object.keys(attrs).find(key => key.match(/^data-/))) {
        console.trace(`Your "${tagName}" component uses a data-* attribute! Use dataSet instead!!`);
        alert('Do not use data-* in your JSX component! Use dataSet instead!! - Check the console.trace for more info');
        window.__aleartedJSXData = true;
      }
    }

    if (attrs !== null && attrs !== void 0 && attrs.ref) {
      // Create a custom reference to DOM node
      if (typeof attrs.ref === 'function') {
        attrs.ref(elem);
      } else {
        attrs.ref = elem;
      }
    }

    if (attrs !== null && attrs !== void 0 && attrs.on) {
      Object.entries(attrs.on).forEach(([event, handler]) => {
        elem.addEventListener(event, handler);
      });
    } // Append style attributes to created DOM node


    if (attrs !== null && attrs !== void 0 && attrs.style) {
      Object.entries(attrs.style).forEach(([property, value]) => {
        elem.style.setProperty(property, value);
      }); // Object.assign(elem.style, attrs.style);
    }

    return elem;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (new JSX());

/***/ }),

/***/ 2422:
/***/ (function() {

!function () {
  function t() {
    var e = Array.prototype.slice.call(arguments),
        n = document.createDocumentFragment();
    e.forEach(function (e) {
      var t = e instanceof Node;
      n.appendChild(t ? e : document.createTextNode(String(e)));
    }), this.appendChild(n);
  }

  [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach(function (e) {
    e.hasOwnProperty("append") || Object.defineProperty(e, "append", {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: t
    });
  });
}();

/***/ }),

/***/ 643:
/***/ (function(module) {

var COMPLETE = 'complete',
    CANCELED = 'canceled';

function raf(task) {
  if ('requestAnimationFrame' in window) {
    return window.requestAnimationFrame(task);
  }

  setTimeout(task, 16);
}

function setElementScroll(element, x, y) {
  Math.max(0, x);
  Math.max(0, y);

  if (element.self === element) {
    element.scrollTo(x, y);
  } else {
    element.scrollLeft = x;
    element.scrollTop = y;
  }
}

function getTargetScrollLocation(scrollSettings, parent) {
  var align = scrollSettings.align,
      target = scrollSettings.target,
      targetPosition = target.getBoundingClientRect(),
      parentPosition,
      x,
      y,
      differenceX,
      differenceY,
      targetWidth,
      targetHeight,
      leftAlign = align && align.left != null ? align.left : 0.5,
      topAlign = align && align.top != null ? align.top : 0.5,
      leftOffset = align && align.leftOffset != null ? align.leftOffset : 0,
      topOffset = align && align.topOffset != null ? align.topOffset : 0,
      leftScalar = leftAlign,
      topScalar = topAlign;

  if (scrollSettings.isWindow(parent)) {
    targetWidth = Math.min(targetPosition.width, parent.innerWidth);
    targetHeight = Math.min(targetPosition.height, parent.innerHeight);
    x = targetPosition.left + parent.pageXOffset - parent.innerWidth * leftScalar + targetWidth * leftScalar;
    y = targetPosition.top + parent.pageYOffset - parent.innerHeight * topScalar + targetHeight * topScalar;
    x -= leftOffset;
    y -= topOffset;
    x = scrollSettings.align.lockX ? parent.pageXOffset : x;
    y = scrollSettings.align.lockY ? parent.pageYOffset : y;
    differenceX = x - parent.pageXOffset;
    differenceY = y - parent.pageYOffset;
  } else {
    targetWidth = targetPosition.width;
    targetHeight = targetPosition.height;
    parentPosition = parent.getBoundingClientRect();
    var offsetLeft = targetPosition.left - (parentPosition.left - parent.scrollLeft);
    var offsetTop = targetPosition.top - (parentPosition.top - parent.scrollTop);
    x = offsetLeft + targetWidth * leftScalar - parent.clientWidth * leftScalar;
    y = offsetTop + targetHeight * topScalar - parent.clientHeight * topScalar;
    x -= leftOffset;
    y -= topOffset;
    x = Math.max(Math.min(x, parent.scrollWidth - parent.clientWidth), 0);
    y = Math.max(Math.min(y, parent.scrollHeight - parent.clientHeight), 0);
    x = scrollSettings.align.lockX ? parent.scrollLeft : x;
    y = scrollSettings.align.lockY ? parent.scrollTop : y;
    differenceX = x - parent.scrollLeft;
    differenceY = y - parent.scrollTop;
  }

  return {
    x: x,
    y: y,
    differenceX: differenceX,
    differenceY: differenceY
  };
}

function animate(parent) {
  var scrollSettings = parent._scrollSettings;

  if (!scrollSettings) {
    return;
  }

  var maxSynchronousAlignments = scrollSettings.maxSynchronousAlignments;
  var location = getTargetScrollLocation(scrollSettings, parent),
      time = Date.now() - scrollSettings.startTime,
      timeValue = Math.min(1 / scrollSettings.time * time, 1);

  if (scrollSettings.endIterations >= maxSynchronousAlignments) {
    setElementScroll(parent, location.x, location.y);
    parent._scrollSettings = null;
    return scrollSettings.end(COMPLETE);
  }

  var easeValue = 1 - scrollSettings.ease(timeValue);
  setElementScroll(parent, location.x - location.differenceX * easeValue, location.y - location.differenceY * easeValue);

  if (time >= scrollSettings.time) {
    scrollSettings.endIterations++; // Align ancestor synchronously

    scrollSettings.scrollAncestor && animate(scrollSettings.scrollAncestor);
    animate(parent);
    return;
  }

  raf(animate.bind(null, parent));
}

function defaultIsWindow(target) {
  return target.self === target;
}

function transitionScrollTo(target, parent, settings, scrollAncestor, callback) {
  var idle = !parent._scrollSettings,
      lastSettings = parent._scrollSettings,
      now = Date.now(),
      cancelHandler,
      passiveOptions = {
    passive: true
  };

  if (lastSettings) {
    lastSettings.end(CANCELED);
  }

  function end(endType) {
    parent._scrollSettings = null;

    if (parent.parentElement && parent.parentElement._scrollSettings) {
      parent.parentElement._scrollSettings.end(endType);
    }

    if (settings.debug) {
      console.log('Scrolling ended with type', endType, 'for', parent);
    }

    callback(endType);

    if (cancelHandler) {
      parent.removeEventListener('touchstart', cancelHandler, passiveOptions);
      parent.removeEventListener('wheel', cancelHandler, passiveOptions);
    }
  }

  var maxSynchronousAlignments = settings.maxSynchronousAlignments;

  if (maxSynchronousAlignments == null) {
    maxSynchronousAlignments = 3;
  }

  parent._scrollSettings = {
    startTime: now,
    endIterations: 0,
    target: target,
    time: settings.time,
    ease: settings.ease,
    align: settings.align,
    isWindow: settings.isWindow || defaultIsWindow,
    maxSynchronousAlignments: maxSynchronousAlignments,
    end: end,
    scrollAncestor
  };

  if (!('cancellable' in settings) || settings.cancellable) {
    cancelHandler = end.bind(null, CANCELED);
    parent.addEventListener('touchstart', cancelHandler, passiveOptions);
    parent.addEventListener('wheel', cancelHandler, passiveOptions);
  }

  if (idle) {
    animate(parent);
  }

  return cancelHandler;
}

function defaultIsScrollable(element) {
  return 'pageXOffset' in element || (element.scrollHeight !== element.clientHeight || element.scrollWidth !== element.clientWidth) && getComputedStyle(element).overflow !== 'hidden';
}

function defaultValidTarget() {
  return true;
}

function findParentElement(el) {
  if (el.assignedSlot) {
    return findParentElement(el.assignedSlot);
  }

  if (el.parentElement) {
    if (el.parentElement.tagName === 'BODY') {
      return el.parentElement.ownerDocument.defaultView || el.parentElement.ownerDocument.ownerWindow;
    }

    return el.parentElement;
  }

  if (el.getRootNode) {
    var parent = el.getRootNode();

    if (parent.nodeType === 11) {
      return parent.host;
    }
  }
}

module.exports = function (target, settings, callback) {
  if (!target) {
    return;
  }

  if (typeof settings === 'function') {
    callback = settings;
    settings = null;
  }

  if (!settings) {
    settings = {};
  }

  settings.time = isNaN(settings.time) ? 1000 : settings.time;

  settings.ease = settings.ease || function (v) {
    return 1 - Math.pow(1 - v, v / 2);
  };

  settings.align = settings.align || {};
  var parent = findParentElement(target),
      parents = 1;

  function done(endType) {
    parents--;

    if (!parents) {
      callback && callback(endType);
    }
  }

  var validTarget = settings.validTarget || defaultValidTarget;
  var isScrollable = settings.isScrollable;

  if (settings.debug) {
    console.log('About to scroll to', target);

    if (!parent) {
      console.error('Target did not have a parent, is it mounted in the DOM?');
    }
  }

  var scrollingElements = [];

  while (parent) {
    if (settings.debug) {
      console.log('Scrolling parent node', parent);
    }

    if (validTarget(parent, parents) && (isScrollable ? isScrollable(parent, defaultIsScrollable) : defaultIsScrollable(parent))) {
      parents++;
      scrollingElements.push(parent);
    }

    parent = findParentElement(parent);

    if (!parent) {
      done(COMPLETE);
      break;
    }
  }

  return scrollingElements.reduce((cancel, parent, index) => transitionScrollTo(target, parent, settings, scrollingElements[index + 1], done), null);
};

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
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
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
;// CONCATENATED MODULE: ./src/js/utilities/debounce.js
function debounce(fn, wait = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}
;// CONCATENATED MODULE: ./src/js/utilities/events.js
const events_addEventDelegate = ({
  context = document.documentElement,
  event = 'click',
  selector,
  handler,
  capture = false
}) => {
  const listener = function (e) {
    // loop parent nodes from the target to the delegation node
    for (let target = e.target; target && target !== this; target = target.parentNode) {
      if (target.matches(selector)) {
        handler.call(target, e, target);
        break;
      }
    }
  };

  context.addEventListener(event, listener, capture);
  return () => {
    context.removeEventListener(event, listener, capture);
  };
};
class events_Event {
  constructor() {
    this.events = {};
  }

  get evts() {
    return Object.keys(this.events);
  }

  subscribe(event, handler) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(handler);
    return () => this.unSubscribe(event, handler);
  }

  unSubscribe(event, handler) {
    const handlers = this.events[event];

    if (handlers && Array.isArray(handlers)) {
      for (let i = 0; i < handlers.length; i++) {
        if (handlers[i] === handler) {
          handlers.splice(i, 1);
          break;
        }
      }
    }
  }

  emit(event, ...args) {
    console.groupCollapsed(`Event emitted: ${event}`);
    console.trace();
    console.groupEnd();
    (this.events[event] || []).forEach(handler => {
      handler(...args);
    });
  }

}
;// CONCATENATED MODULE: ./src/js/utilities/fetch.js
/* provided dependency */ var createElement = __webpack_require__(6295)["default"];
const requestDefaultConfigs = {
  mode: 'same-origin',
  credentials: 'same-origin',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
};
function getRequestDefaultConfigs() {
  return JSON.parse(JSON.stringify(requestDefaultConfigs));
}
const fetchJSON = (url, config = getRequestDefaultConfigs()) => {
  return fetch(url, config).then(function (response) {
    if (!response.ok) {
      throw response;
    }

    return response.json();
  });
};
const cache = new Map();
const fetchCache = (url, config = getRequestDefaultConfigs()) => {
  return new Promise((resolve, reject) => {
    let cached = cache.get(url);
    if (cached) return resolve(cached);
    fetch(url, config).then(res => {
      cached = res.text();
      cache.set(url, cached);
      resolve(cached);
    }).catch(reject);
  });
};
const sectionCache = new Map();
const fetchSection = (sectionId, fetchFromCache = false, params = {}) => {
  return new Promise((resolve, reject) => {
    const url = new URL(window.location.href);
    url.searchParams.set('section_id', sectionId);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

    if (fetchFromCache) {
      const cached = sectionCache.get(url);
      if (cached) return resolve(cached);
    }

    fetch(url, getRequestDefaultConfigs()).then(res => res.text()).then(html => {
      const div = createElement("div", null);
      div.innerHTML = html;
      sectionCache.set(url, div);
      resolve(div);
    }).catch(reject);
  });
};
const cache2 = new Map();
const fetchJsonCache = (url, config = requestDefaultConfigs) => {
  return new Promise((resolve, reject) => {
    if (cache2.get(url)) {
      return resolve(cache2.get(url));
    }

    fetch(url, config).then(res => {
      if (res.ok) {
        const json = res.json();
        resolve(json);
        cache2.set(url, json);
        return json;
      } else {
        reject(res);
      }
    }).catch(reject);
  });
};
// EXTERNAL MODULE: ./node_modules/scroll-into-view/scrollIntoView.js
var scroll_into_view_scrollIntoView = __webpack_require__(643);
;// CONCATENATED MODULE: ./src/js/utilities/load-assets.js
function load_assets_loadJS(src, target = document.body, async = true, defer = false) {
  return new Promise((resolve, reject) => {
    const doc = target.ownerDocument;
    const currScript = doc.querySelector(`script[src="${src}"]`);

    if (currScript) {
      if (currScript.dataset.loaded) return resolve(true);
      currScript.addEventListener("load", () => {
        currScript.dataset.loaded = true;
        resolve(true);
      });
      return;
    }

    const script = doc.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;
    script.addEventListener("load", () => {
      script.dataset.loaded = true;
      resolve(true);
    });
    script.onerror = reject;
    target.appendChild(script);
  });
}
function load_assets_loadCSS(href, target = document.head) {
  return new Promise((resolve, reject) => {
    const doc = target.ownerDocument;
    const currLink = doc.querySelector(`link[href="${href}"]`);

    if (currLink) {
      if (currLink.dataset.loaded) return resolve(true);
      currLink.addEventListener("load", () => {
        currLink.dataset.loaded = true;
        resolve(true);
      });
      return;
    }

    const link = doc.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.addEventListener("load", () => {
      link.dataset.loaded = true;
      resolve(true);
    });
    link.onerror = reject;
    target.appendChild(link);
  });
}
const {
  themeScriptURLs,
  themeStyleURLs
} = window;
if (!themeScriptURLs || !themeStyleURLs) console.warn("Missing Assest URLs source");
const themeAssets = {
  'js': {
    urls: themeScriptURLs,
    load: load_assets_loadJS
  },
  'css': {
    urls: themeStyleURLs,
    load: load_assets_loadCSS
  }
};

function log(asset) {
  console.groupCollapsed('%c Asset loaded: ', '#f7a046', asset);
  console.trace();
  console.groupEnd();
}

function load_assets_loadAssets(param) {
  return new Promise((resolve, reject) => {
    const files = typeof param === "string" ? [param] : param;
    Promise.all(files.map(async file => {
      try {
        const [, name, type] = file.match(/(.*)\.(js|css)$/) || [, file, 'js'];
        const {
          urls: {
            [name]: {
              url
            }
          },
          load
        } = themeAssets[type];
        await load(url);
        log(`${name}.${type}`);
      } catch (err) {
        console.warn(`Failed to load asset: ${file}.`, err);
      }
    })).then(resolve).catch(reject);
  });
}
;// CONCATENATED MODULE: ./src/js/utilities/index.js
/* provided dependency */ var utilities_createElement = __webpack_require__(6295)["default"];






window.__getSectionInstanceByType = type => window.Shopify.theme.sections.instances.find(inst => inst.type === type);

function productFormCheck(form) {
  const fieldSelectors = '[data-theme-fields] [name][required]:not([hidden]):not([type="hidden"])';
  const requiredFields = form.querySelectorAll(fieldSelectors);
  const missingFields = [];
  requiredFields.forEach(field => {
    if (field.type === 'radio') {
      const raidoButtons = form.querySelectorAll(`input[name="${field.name}"]`);
      const selected = Array.from(raidoButtons).some(btn => btn.checked);

      if (!selected) {
        missingFields.push(field);
      }
    } else if (!field.value) {
      missingFields.push(field);
    }
  });
  return missingFields;
}
function queryDomNodes(selectors = {}, context = document) {
  const domNodes = Object.entries(selectors).reduce((acc, [name, selector]) => {
    var _context$queryMethod;

    const findOne = typeof selector === 'string';
    const queryMethod = findOne ? 'querySelector' : 'querySelectorAll';
    const sl = findOne ? selector : selector[0];
    acc[name] = context === null || context === void 0 ? void 0 : (_context$queryMethod = context[queryMethod]) === null || _context$queryMethod === void 0 ? void 0 : _context$queryMethod.call(context, sl);

    if (!findOne && acc[name]) {
      acc[name] = [...acc[name]];
    }

    return acc;
  }, {});
  return domNodes;
}
const camelCaseToSnakeCase = str => str.replace(/[A-Z]/g, $1 => `_${$1.toLowerCase()}`);
function animateReplace(oldNode, newNode) {
  if (!oldNode || !newNode) {
    return;
  }

  oldNode.classList.add('ar__old-node');
  newNode.classList.add('ar__new-node');
  oldNode.style.opacity = 0;
  oldNode.replaceWith(newNode);
  setTimeout(() => newNode.style.opacity = 1);
}
function createSearchLink(query) {
  const searchParams = new URLSearchParams({
    type: 'product',
    ['options[unavailable_products]']: 'last',
    ['options[prefix]']: 'last',
    q: query
  });
  return `${PredictiveSearch.SEARCH_PATH}?${searchParams.toString()}`;
}
function isInViewport(elem) {
  const rect = elem.getBoundingClientRect(); // NOTE: not accuracy in all cases but we only need this

  return rect.top > 0 && rect.top < (window.innerHeight || document.documentElement.clientHeight);
}

function loadStyles() {
  const {
    themeStyleURLs = {}
  } = window;
  Object.values(themeStyleURLs).forEach(style => {
    const {
      url,
      required,
      afterWindowLoaded
    } = style;

    if (url && required) {
      var _window;

      if (!afterWindowLoaded || (_window = window) !== null && _window !== void 0 && _window.__sfWindowLoaded) {
        loadCSS(url);
      } else {
        window.addEventListener("load", () => loadCSS(url));
      }
    }
  });
}

function loadScripts() {
  const {
    themeScriptURLs = {}
  } = window;
  Object.values(themeScriptURLs).forEach(script => {
    const {
      url,
      required,
      afterWindowLoaded
    } = script;

    if (url && required) {
      var _window2;

      if (!afterWindowLoaded || (_window2 = window) !== null && _window2 !== void 0 && _window2.__sfWindowLoaded) {
        loadJS(url);
      } else {
        window.addEventListener("load", () => loadJS(url));
      }
    }
  });
}

function addCustomerFormHandlers() {
  addEventDelegate({
    selector: '.sf-customer__forms',
    handler: (e, form) => {
      if (e.target.classList.contains('sf-customer__reset-password-btn')) {
        form.classList.add('show-recover-password-form');
        return;
      }

      if (e.target.classList.contains('sf-customer__cancel-reset')) {
        form.classList.remove('show-recover-password-form');
        return;
      }
    }
  });

  if (document.querySelector('.sf-customer__recover-form-posted')) {
    var _document$querySelect, _document$querySelect2;

    (_document$querySelect = document.querySelector('.sf-customer__forms')) === null || _document$querySelect === void 0 ? void 0 : (_document$querySelect2 = _document$querySelect.classList) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.add('show-recover-password-form');
  }
}

function getVideoURL(id, host) {
  if (host === 'youtube') {
    return `https://www.youtube.com/watch?v=${id}&gl=true`;
  }

  if (host === 'vimeo') {
    return `https://vimeo.com/${id}`;
  }

  return '';
}

function showCookieConsent() {
  const {
    show_cookie_consent
  } = window.adminThemeSettings;
  const cookieAccepted = getCookie('cookieconsent_status');

  if (show_cookie_consent && !cookieAccepted) {
    loadAssets(['cookieConsent.css', 'cookieConsent.js']);
  }
}

function initTermsCheckbox() {
  addEventDelegate({
    selector: '.agree-terms [name="agree_terms"]',
    event: 'change',
    handler: (e, target) => {
      const button = target.closest('.agree-terms').nextElementSibling;

      if (button && button.hasAttributes('data-terms-action')) {
        if (target.checked) {
          button.removeAttribute('disabled');
        } else {
          button.setAttribute('disabled', true);
        }
      }
    }
  });
}

const scrollToTopTarget = document.querySelector('#scroll-to-top-target');
function scrollToTop(callback) {
  scrollIntoView(scrollToTopTarget, callback);
}

function initScrollTop() {
  const scrollTopButton = document.querySelector('#scroll-to-top-button');

  if (scrollTopButton) {
    scrollTopButton.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', function () {
      const method = window.scrollY > 100 ? 'add' : 'remove';
      scrollTopButton.classList[method]('opacity-100');
    });
  }
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}
function getCookie(cname) {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
}
function addRecentViewedProduct(handle) {
  let max = 20;
  const saveKey = 'sf-recent-viewed-products';
  const products = getCookie(saveKey) ? JSON.parse(getCookie(saveKey)) : [];
  if (handle && !products.includes(handle)) products.push(handle);
  setCookie(saveKey, JSON.stringify(products.filter((x, i) => {
    return i <= max - 1;
  })));
}
const generateDomFromString = value => {
  const d = utilities_createElement("div", null);
  d.innerHTML = value;
  return d;
};
function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function updateParam(key, value) {
  var {
    location
  } = window;
  var baseUrl = [location.protocol, '//', location.host, location.pathname].join('');
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  if (urlParams.has(key)) {
    if (value !== '' && value !== 'undefined') {
      urlParams.set(key, value);
    }

    if (value === '' || value === 'undefined') {
      urlParams.delete(key);
    }
  } else {
    if (value) urlParams.append(key, value);
  }

  window.history.replaceState({}, "", baseUrl + '?' + urlParams.toString());
  return false;
}
function getParams() {
  let params = {};
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  for (const entry of urlParams.entries()) {
    params[entry[0]] = entry[1];
  }

  return params;
}
function runHelpers() {
  try {
    loadScripts();
    loadStyles(); ////////////////////

    showCookieConsent();
    initTermsCheckbox();
    initLocalization();
    addCustomerFormHandlers();
    initScrollTop();
  } catch (err) {
    console.error('Failed to run helpers.', err);
  }
}
;// CONCATENATED MODULE: ./src/js/utilities/select.js
function initCustomSelect(container) {
  let x, i, j, l, ll, selElmnt, a, b, c, ar, at;
  x = container.getElementsByClassName("sf__custom-select");
  l = x.length;

  if (x.length > 0) {
    for (i = 0; i < l; i++) {
      var _selElmnt$options$sel;

      selElmnt = x[i].getElementsByTagName("select")[0];
      ll = selElmnt.length;
      /*for each element, create a new DIV that will act as the selected item:*/

      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      at = document.createElement("SPAN");
      at.innerHTML = (_selElmnt$options$sel = selElmnt.options[selElmnt.selectedIndex]) === null || _selElmnt$options$sel === void 0 ? void 0 : _selElmnt$options$sel.innerHTML;
      x[i].appendChild(a);
      a.appendChild(at);
      ar = document.createElement("SPAN");
      ar.innerHTML = `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"/></svg>`;
      ar.setAttribute("class", "select-arrow");
      a.appendChild(ar);
      /*for each element, create a new DIV that will contain the option list:*/

      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");

      for (j = 0; j < ll; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;

        if (selElmnt.options[j].getAttribute('selected')) {
          c.setAttribute("class", "same-as-selected");
        }

        c.addEventListener("click", function (e) {
          /*when an item is clicked, update the original select box,
          and the selected item:*/
          let y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;

          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.childNodes[0].innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;

              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }

              this.setAttribute("class", "same-as-selected");
              break;
            }
          }

          s.dispatchEvent(new Event('change'));
          s.dispatchEvent(new Event('click'));
          h.click();
        });
        b.appendChild(c);
      }

      x[i].appendChild(b);
      a.addEventListener("click", function (e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }
  }
}

function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x,
      y,
      i,
      xl,
      yl,
      arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;

  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }

  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/


document.addEventListener("click", closeAllSelect);
;// CONCATENATED MODULE: ./src/js/utilities/accordion.js




class Accordion {
  constructor(container, options = this.defaultOptions) {
    _defineProperty(this, "defaultOptions", {
      presetContentHeight: false,
      duration: 300,
      callback: () => {}
    });

    _defineProperty(this, "selectors", {
      items: ['.sf__accordion-item'],
      buttons: ['.sf__accordion-button'],
      contents: ['.sf__accordion-content']
    });

    _defineProperty(this, "openClass", 'open');

    _defineProperty(this, "initClass", 'acc-initialized');

    _defineProperty(this, "removeEvents", null);

    _defineProperty(this, "destroy", () => {
      this.removeEvents();
      window.removeEventListener("resize", this.debouncedSetContentHeight);
    });

    _defineProperty(this, "setContentOpacity", () => {
      this.domNodes.contents.forEach(cont => cont.style.opacity = 1);
    });

    _defineProperty(this, "setItemOverflowState", () => {
      var _this$domNodes, _this$domNodes$items;

      (_this$domNodes = this.domNodes) === null || _this$domNodes === void 0 ? void 0 : (_this$domNodes$items = _this$domNodes.items) === null || _this$domNodes$items === void 0 ? void 0 : _this$domNodes$items.forEach((item, index) => {
        var _this$domNodes2, _this$domNodes2$conte, _item$classList, _item$classList$conta, _contents$classList, _contents$classList$m;

        let contents = (_this$domNodes2 = this.domNodes) === null || _this$domNodes2 === void 0 ? void 0 : (_this$domNodes2$conte = _this$domNodes2.contents) === null || _this$domNodes2$conte === void 0 ? void 0 : _this$domNodes2$conte[index];
        const method = item !== null && item !== void 0 && (_item$classList = item.classList) !== null && _item$classList !== void 0 && (_item$classList$conta = _item$classList.contains) !== null && _item$classList$conta !== void 0 && _item$classList$conta.call(_item$classList, this.openClass) ? 'remove' : 'add';
        contents === null || contents === void 0 ? void 0 : (_contents$classList = contents.classList) === null || _contents$classList === void 0 ? void 0 : (_contents$classList$m = _contents$classList[method]) === null || _contents$classList$m === void 0 ? void 0 : _contents$classList$m.call(_contents$classList, 'overflow-hidden');
      });
    });

    _defineProperty(this, "setContentHeight", () => {
      this.domNodes = queryDomNodes(this.selectors, this.container);
      const {
        items,
        contents
      } = this.domNodes;
      items.forEach((item, index) => {
        var _contents$index2, _contents$index2$clas;

        if (item !== null && item !== void 0 && item.classList.contains(this.openClass)) {
          var _item$style, _contents$index, _item$style2;

          item === null || item === void 0 ? void 0 : (_item$style = item.style) === null || _item$style === void 0 ? void 0 : _item$style.setProperty('--content-max-height', `auto`);
          const maxHeight = contents === null || contents === void 0 ? void 0 : (_contents$index = contents[index]) === null || _contents$index === void 0 ? void 0 : _contents$index.scrollHeight;
          item === null || item === void 0 ? void 0 : (_item$style2 = item.style) === null || _item$style2 === void 0 ? void 0 : _item$style2.setProperty('--content-max-height', `${maxHeight}px`);
        } else {
          var _item$style3;

          item === null || item === void 0 ? void 0 : (_item$style3 = item.style) === null || _item$style3 === void 0 ? void 0 : _item$style3.setProperty('--content-max-height', 0);
        }

        contents === null || contents === void 0 ? void 0 : (_contents$index2 = contents[index]) === null || _contents$index2 === void 0 ? void 0 : (_contents$index2$clas = _contents$index2.classList) === null || _contents$index2$clas === void 0 ? void 0 : _contents$index2$clas.add('max-height-set');
      });
      this.setItemOverflowState();
      this.setContentOpacity();
    });

    _defineProperty(this, "toggle", index => {
      var _this$domNodes3, _this$domNodes3$items, _this$domNodes4, _this$domNodes4$conte, _accItem$classList, _accItem$classList2, _this$domNodes5, _this$domNodes5$conte, _this$domNodes5$conte2;

      const accItem = (_this$domNodes3 = this.domNodes) === null || _this$domNodes3 === void 0 ? void 0 : (_this$domNodes3$items = _this$domNodes3.items) === null || _this$domNodes3$items === void 0 ? void 0 : _this$domNodes3$items[index];
      const accContent = (_this$domNodes4 = this.domNodes) === null || _this$domNodes4 === void 0 ? void 0 : (_this$domNodes4$conte = _this$domNodes4.contents) === null || _this$domNodes4$conte === void 0 ? void 0 : _this$domNodes4$conte[index];
      const isOpen = accItem === null || accItem === void 0 ? void 0 : (_accItem$classList = accItem.classList) === null || _accItem$classList === void 0 ? void 0 : _accItem$classList.contains(this.openClass);
      accItem === null || accItem === void 0 ? void 0 : (_accItem$classList2 = accItem.classList) === null || _accItem$classList2 === void 0 ? void 0 : _accItem$classList2.toggle(this.openClass);
      const maxHeight = isOpen ? 0 : (_this$domNodes5 = this.domNodes) === null || _this$domNodes5 === void 0 ? void 0 : (_this$domNodes5$conte = _this$domNodes5.contents) === null || _this$domNodes5$conte === void 0 ? void 0 : (_this$domNodes5$conte2 = _this$domNodes5$conte[index]) === null || _this$domNodes5$conte2 === void 0 ? void 0 : _this$domNodes5$conte2.scrollHeight;
      accItem === null || accItem === void 0 ? void 0 : accItem.style.setProperty('--content-max-height', `${maxHeight}px`);

      if (isOpen) {
        var _accContent$classList;

        accContent === null || accContent === void 0 ? void 0 : (_accContent$classList = accContent.classList) === null || _accContent$classList === void 0 ? void 0 : _accContent$classList.add('overflow-hidden');
      } else {
        setTimeout(() => {
          var _accContent$classList2;

          accContent === null || accContent === void 0 ? void 0 : (_accContent$classList2 = accContent.classList) === null || _accContent$classList2 === void 0 ? void 0 : _accContent$classList2.remove('overflow-hidden');
        }, 350);
      }
    });

    if (!container || container.classList.contains(this.initClass)) return;
    this.container = container;
    this.domNodes = queryDomNodes(this.selectors, this.container);
    this.options = Object.assign({}, this.defaultOptions, options);
    this.debouncedSetContentHeight = debounce(this.setContentHeight.bind(this), 300);
    this.init();
  }

  init() {
    var _this$container, _this$container$style;

    (_this$container = this.container) === null || _this$container === void 0 ? void 0 : (_this$container$style = _this$container.style) === null || _this$container$style === void 0 ? void 0 : _this$container$style.setProperty('--duration', ` ${this.options.duration}ms`);
    this.removeEvents = events_addEventDelegate({
      context: this.container,
      selector: this.selectors.buttons[0],
      handler: (e, btn) => {
        btn.classList.add('pointer-events-none');
        const index = this.domNodes.buttons.indexOf(btn);
        this.toggle(index);
        setTimeout(() => {
          btn.classList.remove('pointer-events-none');
        }, 350);
      }
    });

    if (this.options.presetContentHeight) {
      window.requestAnimationFrame(this.setContentHeight);
    } else {
      this.setItemOverflowState();
      this.setContentOpacity();
    }

    window.addEventListener("resize", this.debouncedSetContentHeight);
    if (typeof this.options.callback === "function") this.options.callback();
    this.container.classList.add(this.initClass);
  }

}
;// CONCATENATED MODULE: ./src/js/pages/collection/index.js
/* provided dependency */ var AmyrisThemeSettings = __webpack_require__(4558)["AmyrisThemeSettings"];
/* provided dependency */ var AmyrisTheme = __webpack_require__(4558)["AmyrisTheme"];









class Collection {
  // "paginate" | "loadmore" | "infinite"
  // "storefront_filters" | "tags_filter"
  // "leftColumn" | "rightColumn" | "fixed"
  constructor() {
    _defineProperty(this, "selectors", {
      section: 'section[data-section-type="collection-template"]',
      toolbar: '.sf__collection-toolbar',
      cols: ['.sf__gridColumn-view button'],
      productContainer: '[data-product-container]',
      loadMoreBtn: '[data-load-more]',
      // Sidebar filters selectors
      sidebar: '.sf__sidebar',
      sidebarContent: '.sf__sidebar-content',
      openSidebar: '.sf__sidebar-open',
      closeSidebar: '.sf__sidebar-close',
      filtersWrapper: '.sf__filter-wrapper',
      modalFilter: '.sf__modal-filter',
      openModal: '.sf__filter-open',
      closeModal: '.sf__filter-close',
    });

    _defineProperty(this, "mobileSortingSelectors", {
      openSorting: '.sf__sortmb-icon',
      closeSorting: '.sf__hidden-sortmb',
      sortingWrapper: '.sf__collection-sortmb',
      sortingList: '.sf__sortmb-list'
    });

    _defineProperty(this, "sectionId", void 0);

    _defineProperty(this, "isDesignMode", AmyrisThemeSettings.design_mode);

    _defineProperty(this, "currentPage", 1);

    _defineProperty(this, "paginationType", void 0);

    _defineProperty(this, "totalPages", void 0);

    _defineProperty(this, "totalProducts", void 0);

    _defineProperty(this, "infiniteLoadingObserver", void 0);

    _defineProperty(this, "showColSwitchers", void 0);

    _defineProperty(this, "cachedCol", void 0);

    _defineProperty(this, "initialCol", void 0);

    _defineProperty(this, "activeCol", void 0);

    _defineProperty(this, "STORAGE_KEY", 'gridColumnViews');

    _defineProperty(this, "MAX_COL_BY_SCREEN_SIZE", {
      'mobile': 2,
      'tablet': 4,
      'desktop': 5
    });

    _defineProperty(this, "enableFilters", void 0);

    _defineProperty(this, "enableSorting", void 0);

    _defineProperty(this, "filtersType", void 0);

    _defineProperty(this, "filtersPosition", void 0);

    _defineProperty(this, "accordions", void 0);

    _defineProperty(this, "sideEffectEventsAdded", false);

    _defineProperty(this, "init", () => {
      this.domNodes = queryDomNodes(this.selectors);
      this.mbSortingNodes = queryDomNodes(this.mobileSortingSelectors);
      this.setData();

      if (this.productCount) {
        this.initGridView();
        this.initFilters();
        this.initMobileSorting();
        this.initProducts();
      }
    });

    _defineProperty(this, "setData", () => {
      var _productContainer$dat;

      const {
        section,
        productContainer,
        modalFilter,
      } = this.domNodes; // Grid view data

      this.sectionId = section.dataset.sectionId;
      this.paginationType = section.dataset.paginationType;
      this.productCount = Number(section.dataset.productCount);
      this.totalPages = Number(productContainer === null || productContainer === void 0 ? void 0 : (_productContainer$dat = productContainer.dataset) === null || _productContainer$dat === void 0 ? void 0 : _productContainer$dat.totalPages); // TODO: get from URL Search Params

      this.activeCol = null;
      this.currentPage = 1;
      this.initialCol = Number(section.dataset.initialColumn);
      this.cachedCol = Number(window.localStorage.getItem(this.STORAGE_KEY));
      this.showColSwitchers = section.dataset.showColSwitchers === "true"; // Filters data

      this.enableFilters = section.dataset.enableFilters === "true";
      this.enableSorting = section.dataset.enableSorting === "true";
      this.filtersType = section.dataset.filtersType;
      this.filtersPosition = section.dataset.filtersPosition;
     
      if (window.innerWidth <= 991) {
        var modalFilterMobile = document.querySelector('.sf__modal-filter');
        if (modalFilterMobile && !document.querySelector('body > .sf__modal-filter')) {
          modalFilterMobile.style.cssText = 'position:fixed;overflow: scroll;width:100%;z-index:100;display:none;';
          document.body.appendChild(modalFilterMobile);
        }

        const removeLeftovers = document.querySelectorAll('main .sf__modal-filter');
        removeLeftovers.forEach(e => e.remove());
      }
      
      const closeParent = document.querySelectorAll('.sf__filter-close');
      const openParent = document.querySelectorAll('.sf__filter-open');

      closeParent.forEach(closeChild => closeChild.addEventListener('click', this.closeModalFilter));
      openParent.forEach(openChild => openChild.addEventListener('click', this.openModalFilter));

      // Close filter when clicking outside the modal
      document.querySelector('body').addEventListener('click', event => {
        if(
            !event.target.closest('.sf__modal-filter') &&
            !event.target.classList.contains('sf__modal-filter') &&
            !event.target.closest('.sf__filter-open') &&
            !event.target.classList.contains('sf__filter-open')
        ) {
          this.closeModalFilter();
        }
      });
    });

    _defineProperty(this, "initGridView", () => {
      initCustomSelect(this.domNodes.section);
      this.toggleView(this.isDesignMode ? this.initialCol : this.cachedCol);
      this.updateViewByScreen();
      events_addEventDelegate({
        selector: this.selectors.cols[0],
        context: this.domNodes.toolbar,
        handler: (e, colNode) => this.toggleView(Number(colNode.dataset.column))
      });
      this.initLoadMore();

      if (!this.sideEffectEventsAdded) {
        window.addEventListener('resize', debounce(this.updateViewByScreen, 500));
      }
    });

    _defineProperty(this, "initFilters", () => {
      if (!this.enableFilters) return;
      const {
        sidebar,
        openSidebar,
        closeSidebar,
      } = this.domNodes;
      window.requestAnimationFrame(this.initAccordions);
      openSidebar.addEventListener('click', this.openSidebarFilter);
      closeSidebar.addEventListener('click', this.closeSidebarFilter);
      sidebar.addEventListener('click', e => e.target === sidebar && this.closeSidebarFilter());
    });

    _defineProperty(this, "initMobileSorting", () => {
      if (!this.enableSorting) return;
      const {
        openSorting,
        closeSorting,
        sortingWrapper
      } = this.mbSortingNodes;
      openSorting.addEventListener("click", this.openMobileSorting);
      closeSorting.addEventListener("click", this.closeMobileSorting);
      sortingWrapper.addEventListener("click", e => e.target === sortingWrapper && this.closeMobileSorting());
    });

    _defineProperty(this, "openMobileSorting", () => {
      const {
        sortingWrapper,
        sortingList
      } = this.mbSortingNodes;
      sortingWrapper.style.display = "block";
      window.requestAnimationFrame(() => {
        sortingWrapper.style.setProperty('--tw-bg-opacity', '0.5');
        sortingList.style.setProperty('--tw-translate-y', '0');
      });
    });

    _defineProperty(this, "closeMobileSorting", e => {
      const {
        sortingWrapper,
        sortingList
      } = this.mbSortingNodes;
      sortingWrapper.style.setProperty('--tw-bg-opacity', '0');
      sortingList.style.setProperty('--tw-translate-y', '100%');
      document.querySelector('.sf__collection-sortmb').style.display = 'none';
    });

    _defineProperty(this, "initAccordions", () => {
      var _this$accordions, _this$accordions$dest;

      (_this$accordions = this.accordions) === null || _this$accordions === void 0 ? void 0 : (_this$accordions$dest = _this$accordions.destroy) === null || _this$accordions$dest === void 0 ? void 0 : _this$accordions$dest.call(_this$accordions);
      const {
        filtersWrapper
      } = this.domNodes;
      filtersWrapper.classList.remove('acc-initialized');
      this.accordions = new Accordion(filtersWrapper, {
        presetContentHeight: window.innerWidth > 1280 && this.filtersPosition !== "fixed",
        callback: () => filtersWrapper.classList.add('opacity-100')
      });
    });

    _defineProperty(this, "openSidebarFilter", () => {
      const {
        sidebar,
        sidebarContent,
        section
      } = this.domNodes;
      sidebar.style.display = "block";
      window.requestAnimationFrame(() => {
        var _this$accordions2, _this$accordions2$set;

        sidebar.style.setProperty('--tw-bg-opacity', '0.5');
        sidebarContent.style.setProperty('--tw-translate-x', '0');
        (_this$accordions2 = this.accordions) === null || _this$accordions2 === void 0 ? void 0 : (_this$accordions2$set = _this$accordions2.setContentHeight) === null || _this$accordions2$set === void 0 ? void 0 : _this$accordions2$set.call(_this$accordions2);
      });
      section.classList.add('sidebar-open');
    });

    _defineProperty(this, "closeSidebarFilter", () => {
      const {
        sidebar,
        sidebarContent,
        section
      } = this.domNodes;
      section.classList.remove('sidebar-open');

      if (window.innerWidth < 1280 || sidebar.dataset.type === 'fixed') {
        sidebarContent.style.setProperty('--tw-translate-x', '-100%');
        sidebar.style.removeProperty('--tw-bg-opacity');
        setTimeout(() => sidebar.style.removeProperty('display'), 300);
      }
    });

    _defineProperty(this, "closeModalFilter", () => {
      const {
        modalFilter,
        section
      } = this.domNodes;
       if (modalFilter) {modalFilter.style.display = 'none';}
    });

    _defineProperty(this, "openModalFilter", () => {
      const {
        modalFilter,
        section
      } = this.domNodes;
      modalFilter.style.display = 'flex';

      if (window.innerWidth <= 991){
        modalFilter.style.display = 'block';      
      }
    });

    _defineProperty(this, "toggleView", col => {
      if (!col) return;
      const {
        cols,
        productContainer
      } = this.domNodes;
      const activeCol = this.activeCol || this.initialCol;

      if (this.showColSwitchers) {
        cols[activeCol - 1].classList.remove('active');
        cols[col - 1].classList.add('active');
      }

      productContainer.classList.remove(`sf__col-${activeCol}`);
      productContainer.classList.add(`sf__col-${col}`);
      window.localStorage.setItem(this.STORAGE_KEY, col);
      this.activeCol = col;
    });

    _defineProperty(this, "updateViewByScreen", () => {
      if (this.activeCol === 1) return; // List layout

      const device = this.getDeviceByScreenSize();
      const maxCol = this.MAX_COL_BY_SCREEN_SIZE[device];
      if (maxCol < this.activeCol) this.toggleView(maxCol);
    });

    _defineProperty(this, "getDeviceByScreenSize", () => {
      if (window.innerWidth < 768) return 'mobile';
      if (window.innerWidth < 1024) return 'tablet';
      return 'desktop';
    });

    _defineProperty(this, "initLoadMore", () => {
      if (this.paginationType === "paginate" || this.totalPages <= 1) return;
      const {
        loadMoreBtn
      } = this.domNodes;
      loadMoreBtn.addEventListener("click", this.loadMoreProducts);

      if (this.paginationType === "infinite") {
        this.infiniteLoadingObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.intersectionRatio === 1) this.loadMoreProducts();
          });
        }, {
          threshold: 1
        });
        this.infiniteLoadingObserver.observe(loadMoreBtn);
      }
    });

    _defineProperty(this, "loadMoreProducts", () => {
      const nextPage = this.currentPage + 1;
      if (nextPage > this.totalPages) return;
      const {
        productContainer,
        loadMoreBtn
      } = this.domNodes;
      this.toggleLoading(true);
      fetchSection(this.sectionId, true, {
        page: nextPage
      }).then(productGridHTML => {
        const productNodes = productGridHTML.querySelectorAll('[data-product-container] .sf__col-item');
        productNodes.forEach(prodNode => productContainer.firstElementChild.appendChild(prodNode));
        this.initProducts();
      }).catch(err => console.error(`Failed to load more products.`, err)).finally(() => {
        this.toggleLoading(false);
        this.currentPage = nextPage;

        if (nextPage >= this.totalPages) {
          var _this$infiniteLoading, _this$infiniteLoading2;

          loadMoreBtn.parentNode.remove();
          (_this$infiniteLoading = this.infiniteLoadingObserver) === null || _this$infiniteLoading === void 0 ? void 0 : (_this$infiniteLoading2 = _this$infiniteLoading.unobserve) === null || _this$infiniteLoading2 === void 0 ? void 0 : _this$infiniteLoading2.call(_this$infiniteLoading, loadMoreBtn);
        }
      });
    });

    _defineProperty(this, "initProducts", () => {
      AmyrisTheme.Products.initProductForms({
        context: this.domNodes.section
      }).then(() => {
        var _AmyrisTheme$Compare, _AmyrisTheme$Compare2, _AmyrisTheme$Wishlis, _AmyrisTheme$Wishlis2;

        (_AmyrisTheme$Compare = AmyrisTheme.CompareProduct) === null || _AmyrisTheme$Compare === void 0 ? void 0 : (_AmyrisTheme$Compare2 = _AmyrisTheme$Compare.setCompareButtonsState) === null || _AmyrisTheme$Compare2 === void 0 ? void 0 : _AmyrisTheme$Compare2.call(_AmyrisTheme$Compare);
        (_AmyrisTheme$Wishlis = AmyrisTheme.Wishlist) === null || _AmyrisTheme$Wishlis === void 0 ? void 0 : (_AmyrisTheme$Wishlis2 = _AmyrisTheme$Wishlis.setWishlistButtonsState) === null || _AmyrisTheme$Wishlis2 === void 0 ? void 0 : _AmyrisTheme$Wishlis2.call(_AmyrisTheme$Wishlis);
      }).catch(console.error);
    });

    _defineProperty(this, "toggleLoading", loading => {
      const {
        loadMoreBtn
      } = this.domNodes;

      if (loadMoreBtn) {
        const method = loading ? 'add' : 'remove';
        loadMoreBtn.classList[method]('sf-spinner-loading');
      }
    });

    this.init();
    this.sideEffectEventsAdded = true;
  }

}

AmyrisTheme.Collection = new Collection();
}();
/******/ })()
;


//Product items count in Mobile - KEEPING IT FOR POST-LAUNCH
// const productCount = document.querySelectorAll('.sf__pcard').length;
// if(productCount == 0){
//   document.querySelector('.sf__collection-product-count').style.display = "none";
// }
// else if ( productCount == 1) {
//   document.querySelector('.sf__collection-product-count').innerText = productCount + " Item";
// } 
// else {
//   document.querySelector('.sf__collection-product-count').innerText = productCount + " Items";
// }



//sort mobile
if(document.querySelector('.sf__collection-sortmb') !== null ){
document.querySelector('.sf__collection-sortmb').style.display = 'none';
let openSortMobile = document.querySelectorAll('.sf__custom-sort-by .select-box__input-text');

if (window.innerWidth <= 991) {
 for (let i = 0; i < openSortMobile.length; i++) {
  openSortMobile[i].addEventListener('click', () => {
    document.querySelector('.sf__collection-sortmb').style.display = 'block';
  });
 }
}

let closeSortMobile = document.querySelector('.sf__hidden-sortmb svg');
closeSortMobile.addEventListener('click', () => {
  document.querySelector('.sf__collection-sortmb').style.display = 'none';
});
}


//Help testing:
window.onclick = e => {
  console.log(e.target);
} 