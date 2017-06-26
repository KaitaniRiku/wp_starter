(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _domSelect = require('dom-select');

var _domSelect2 = _interopRequireDefault(_domSelect);

var _domClasses = require('dom-classes');

var _domClasses2 = _interopRequireDefault(_domClasses);

var _prefix = require('prefix');

var _prefix2 = _interopRequireDefault(_prefix);

var _sniffer = require('sniffer');

var _sniffer2 = _interopRequireDefault(_sniffer);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var config = {

	$html: (0, _domSelect2.default)('html'),
	$body: document.body,

	width: window.innerWidth,
	height: window.innerHeight,

	isMobile: _sniffer2.default.isPhone,

	prefix: (0, _prefix2.default)('transform'),
	transition: (0, _prefix2.default)('transition')
};

exports.default = config;

},{"dom-classes":4,"dom-select":6,"prefix":8,"sniffer":9}],2:[function(require,module,exports){
'use strict';

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _domEvents = require('dom-events');

var _domEvents2 = _interopRequireDefault(_domEvents);

var _domClasses = require('dom-classes');

var _domClasses2 = _interopRequireDefault(_domClasses);

var _sniffer = require('sniffer');

var _sniffer2 = _interopRequireDefault(_sniffer);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_sniffer2.default.addClasses(document.documentElement);

_config2.default.isMobile && _domEvents2.default.on(_config2.default.$body, 'touchmove', function (e) {
  return e.preventDefault();
});

},{"./config":1,"dom-classes":4,"dom-events":5,"sniffer":9}],3:[function(require,module,exports){
/*!
 * dashify <https://github.com/jonschlinkert/dashify>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function dashify(str) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }
  str = str.replace(/([a-z])([A-Z])/g, '$1-$2');
  str = str.replace(/[ \t\W]/g, '-');
  str = str.replace(/^-+|-+$/g, '');
  return str.toLowerCase();
};

},{}],4:[function(require,module,exports){
/**
 * Module dependencies.
 */

var index = require('indexof');

/**
 * Whitespace regexp.
 */

var whitespaceRe = /\s+/;

/**
 * toString reference.
 */

var toString = Object.prototype.toString;

module.exports = classes;
module.exports.add = add;
module.exports.contains = has;
module.exports.has = has;
module.exports.toggle = toggle;
module.exports.remove = remove;
module.exports.removeMatching = removeMatching;

function classes (el) {
  if (el.classList) {
    return el.classList;
  }

  var str = el.className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(whitespaceRe);
  if ('' === arr[0]) arr.shift();
  return arr;
}

function add (el, name) {
  // classList
  if (el.classList) {
    el.classList.add(name);
    return;
  }

  // fallback
  var arr = classes(el);
  var i = index(arr, name);
  if (!~i) arr.push(name);
  el.className = arr.join(' ');
}

function has (el, name) {
  return el.classList
    ? el.classList.contains(name)
    : !! ~index(classes(el), name);
}

function remove (el, name) {
  if ('[object RegExp]' == toString.call(name)) {
    return removeMatching(el, name);
  }

  // classList
  if (el.classList) {
    el.classList.remove(name);
    return;
  }

  // fallback
  var arr = classes(el);
  var i = index(arr, name);
  if (~i) arr.splice(i, 1);
  el.className = arr.join(' ');
}

function removeMatching (el, re, ref) {
  var arr = Array.prototype.slice.call(classes(el));
  for (var i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      remove(el, arr[i]);
    }
  }
}

function toggle (el, name) {
  // classList
  if (el.classList) {
    return el.classList.toggle(name);
  }

  // fallback
  if (has(el, name)) {
    remove(el, name);
  } else {
    add(el, name);
  }
}

},{"indexof":7}],5:[function(require,module,exports){

var synth = require('synthetic-dom-events');

var on = function(element, name, fn, capture) {
    return element.addEventListener(name, fn, capture || false);
};

var off = function(element, name, fn, capture) {
    return element.removeEventListener(name, fn, capture || false);
};

var once = function (element, name, fn, capture) {
    function tmp (ev) {
        off(element, name, tmp, capture);
        fn(ev);
    }
    on(element, name, tmp, capture);
};

var emit = function(element, name, opt) {
    var ev = synth(name, opt);
    element.dispatchEvent(ev);
};

if (!document.addEventListener) {
    on = function(element, name, fn) {
        return element.attachEvent('on' + name, fn);
    };
}

if (!document.removeEventListener) {
    off = function(element, name, fn) {
        return element.detachEvent('on' + name, fn);
    };
}

if (!document.dispatchEvent) {
    emit = function(element, name, opt) {
        var ev = synth(name, opt);
        return element.fireEvent('on' + ev.type, ev);
    };
}

module.exports = {
    on: on,
    off: off,
    once: once,
    emit: emit
};

},{"synthetic-dom-events":10}],6:[function(require,module,exports){
module.exports = one;
module.exports.all = all;

function one (selector, parent) {
  parent || (parent = document);
  return parent.querySelector(selector);
}

function all (selector, parent) {
  parent || (parent = document);
  var selection = parent.querySelectorAll(selector);
  return  Array.prototype.slice.call(selection);
}

},{}],7:[function(require,module,exports){

var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
},{}],8:[function(require,module,exports){
// check document first so it doesn't error in node.js
var style = typeof document != 'undefined'
  ? document.createElement('p').style
  : {}

var prefixes = ['O', 'ms', 'Moz', 'Webkit']
var upper = /([A-Z])/g
var memo = {}

/**
 * prefix `key`
 *
 *   prefix('transform') // => WebkitTransform
 *
 * @param {String} key
 * @return {String}
 * @api public
 */
function prefix(key){
  // Camel case
  key = key.replace(/-([a-z])/g, function(_, char){
    return char.toUpperCase()
  })

  // Without prefix
  if (style[key] !== undefined) return key

  // With prefix
  var Key = key.charAt(0).toUpperCase() + key.slice(1)
  var i = prefixes.length
  while (i--) {
    var name = prefixes[i] + Key
    if (style[name] !== undefined) return name
  }

  return key
}

/**
 * Memoized version of `prefix`
 *
 * @param {String} key
 * @return {String}
 * @api public
 */
function prefixMemozied(key){
  return key in memo
    ? memo[key]
    : memo[key] = prefix(key)
}

/**
 * Create a dashed prefix
 *
 * @param {String} key
 * @return {String}
 * @api public
 */
function prefixDashed(key){
  key = prefix(key)
  if (upper.test(key)) {
    key = '-' + key.replace(upper, '-$1')
    upper.lastIndex = 0
  }
  return key.toLowerCase()
}

module.exports = prefixMemozied
module.exports.dash = prefixDashed

},{}],9:[function(require,module,exports){
'use strict';

var dashify = require('dashify');

module.exports = new Sniffer();

function Sniffer() {
    var ua = navigator.userAgent.toLowerCase();
    var av = navigator.appVersion.toLowerCase();

    var isWindowsPhone = /windows phone|iemobile|wpdesktop/.test(ua);

    var isDroidPhone = !isWindowsPhone && /android.*mobile/.test(ua);
    var isDroidTablet = !isWindowsPhone && !isDroidPhone && (/android/i).test(ua);
    var isDroid = isDroidPhone || isDroidTablet;

    var isIos = !isWindowsPhone && (/ip(hone|od|ad)/i).test(ua) && !window.MSStream;
    var isIpad = !isWindowsPhone && (/ipad/i).test(ua) && isIos;

    var isTablet = isDroidTablet || isIpad;
    var isPhone = isDroidPhone || (isIos && !isIpad) || isWindowsPhone;
    var isDevice = isPhone || isTablet;

    var isFirefox = ua.indexOf('firefox') > -1;
    var isSafari = !!ua.match(/version\/[\d\.]+.*safari/);
    var isOpera = ua.indexOf('opr') > -1;
    var isIE11 = !(window.ActiveXObject) && "ActiveXObject" in window;
    var isIE = av.indexOf('msie') > -1 || isIE11 || av.indexOf('edge') > -1;
    var isEdge = ua.indexOf('edge') > -1;
    var isChrome = window.chrome !== null && window.chrome !== undefined && navigator.vendor.toLowerCase() == 'google inc.' && !isOpera && !isEdge;

    this.infos = {
        isDroid: isDroid,
        isDroidPhone: isDroidPhone,
        isDroidTablet: isDroidTablet,
        isWindowsPhone: isWindowsPhone,
        isIos: isIos,
        isIpad: isIpad,
        isDevice: isDevice,
        isEdge: isEdge,
        isIE: isIE,
        isIE11: isIE11,
        isPhone: isPhone,
        isTablet: isTablet,
        isFirefox: isFirefox,
        isSafari: isSafari,
        isOpera: isOpera,
        isChrome: isChrome,
        isDesktop: !isPhone && !isTablet
    };

    Object.keys(this.infos).forEach(function(info) {
        Object.defineProperty(this, info, {
            get: function () {
                return this.infos[info];
            }
        });
    }, this);

    Object.freeze(this);

    // TODO: add getVersion() to get IE/Safari/... version
}

Sniffer.prototype.addClasses = function(el) {
    Object.keys(this.infos).forEach(function(info) {
        if (this.infos[info]) addClass(el, dashify(info));
    }, this);
};

Sniffer.prototype.getInfos = function() {
    return clone(this.infos);
};

function addClass(el, className) {
    if (el.addClass) el.addClass(className);
    else if (el.classList) el.classList.add(className);
    else el.className += ' ' + className;
}

function clone(source) {
    return JSON.parse(JSON.stringify(source));
}
},{"dashify":3}],10:[function(require,module,exports){

// for compression
var win = window;
var doc = document || {};
var root = doc.documentElement || {};

// detect if we need to use firefox KeyEvents vs KeyboardEvents
var use_key_event = true;
try {
    doc.createEvent('KeyEvents');
}
catch (err) {
    use_key_event = false;
}

// Workaround for https://bugs.webkit.org/show_bug.cgi?id=16735
function check_kb(ev, opts) {
    if (ev.ctrlKey != (opts.ctrlKey || false) ||
        ev.altKey != (opts.altKey || false) ||
        ev.shiftKey != (opts.shiftKey || false) ||
        ev.metaKey != (opts.metaKey || false) ||
        ev.keyCode != (opts.keyCode || 0) ||
        ev.charCode != (opts.charCode || 0)) {

        ev = document.createEvent('Event');
        ev.initEvent(opts.type, opts.bubbles, opts.cancelable);
        ev.ctrlKey  = opts.ctrlKey || false;
        ev.altKey   = opts.altKey || false;
        ev.shiftKey = opts.shiftKey || false;
        ev.metaKey  = opts.metaKey || false;
        ev.keyCode  = opts.keyCode || 0;
        ev.charCode = opts.charCode || 0;
    }

    return ev;
}

// modern browsers, do a proper dispatchEvent()
var modern = function(type, opts) {
    opts = opts || {};

    // which init fn do we use
    var family = typeOf(type);
    var init_fam = family;
    if (family === 'KeyboardEvent' && use_key_event) {
        family = 'KeyEvents';
        init_fam = 'KeyEvent';
    }

    var ev = doc.createEvent(family);
    var init_fn = 'init' + init_fam;
    var init = typeof ev[init_fn] === 'function' ? init_fn : 'initEvent';

    var sig = initSignatures[init];
    var args = [];
    var used = {};

    opts.type = type;
    for (var i = 0; i < sig.length; ++i) {
        var key = sig[i];
        var val = opts[key];
        // if no user specified value, then use event default
        if (val === undefined) {
            val = ev[key];
        }
        used[key] = true;
        args.push(val);
    }
    ev[init].apply(ev, args);

    // webkit key event issue workaround
    if (family === 'KeyboardEvent') {
        ev = check_kb(ev, opts);
    }

    // attach remaining unused options to the object
    for (var key in opts) {
        if (!used[key]) {
            ev[key] = opts[key];
        }
    }

    return ev;
};

var legacy = function (type, opts) {
    opts = opts || {};
    var ev = doc.createEventObject();

    ev.type = type;
    for (var key in opts) {
        if (opts[key] !== undefined) {
            ev[key] = opts[key];
        }
    }

    return ev;
};

// expose either the modern version of event generation or legacy
// depending on what we support
// avoids if statements in the code later
module.exports = doc.createEvent ? modern : legacy;

var initSignatures = require('./init.json');
var types = require('./types.json');
var typeOf = (function () {
    var typs = {};
    for (var key in types) {
        var ts = types[key];
        for (var i = 0; i < ts.length; i++) {
            typs[ts[i]] = key;
        }
    }

    return function (name) {
        return typs[name] || 'Event';
    };
})();

},{"./init.json":11,"./types.json":12}],11:[function(require,module,exports){
module.exports={
  "initEvent" : [
    "type",
    "bubbles",
    "cancelable"
  ],
  "initUIEvent" : [
    "type",
    "bubbles",
    "cancelable",
    "view",
    "detail"
  ],
  "initMouseEvent" : [
    "type",
    "bubbles",
    "cancelable",
    "view",
    "detail",
    "screenX",
    "screenY",
    "clientX",
    "clientY",
    "ctrlKey",
    "altKey",
    "shiftKey",
    "metaKey",
    "button",
    "relatedTarget"
  ],
  "initMutationEvent" : [
    "type",
    "bubbles",
    "cancelable",
    "relatedNode",
    "prevValue",
    "newValue",
    "attrName",
    "attrChange"
  ],
  "initKeyboardEvent" : [
    "type",
    "bubbles",
    "cancelable",
    "view",
    "ctrlKey",
    "altKey",
    "shiftKey",
    "metaKey",
    "keyCode",
    "charCode"
  ],
  "initKeyEvent" : [
    "type",
    "bubbles",
    "cancelable",
    "view",
    "ctrlKey",
    "altKey",
    "shiftKey",
    "metaKey",
    "keyCode",
    "charCode"
  ]
}

},{}],12:[function(require,module,exports){
module.exports={
  "MouseEvent" : [
    "click",
    "mousedown",
    "mouseup",
    "mouseover",
    "mousemove",
    "mouseout"
  ],
  "KeyboardEvent" : [
    "keydown",
    "keyup",
    "keypress"
  ],
  "MutationEvent" : [
    "DOMSubtreeModified",
    "DOMNodeInserted",
    "DOMNodeRemoved",
    "DOMNodeRemovedFromDocument",
    "DOMNodeInsertedIntoDocument",
    "DOMAttrModified",
    "DOMCharacterDataModified"
  ],
  "HTMLEvents" : [
    "load",
    "unload",
    "abort",
    "error",
    "select",
    "change",
    "submit",
    "reset",
    "focus",
    "blur",
    "resize",
    "scroll"
  ],
  "UIEvent" : [
    "DOMFocusIn",
    "DOMFocusOut",
    "DOMActivate"
  ]
}

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvY29uZmlnLmpzIiwiYXNzZXRzL2pzL21haW4uanMiLCJub2RlX21vZHVsZXMvZGFzaGlmeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kb20tY2xhc3Nlcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kb20tZXZlbnRzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2RvbS1zZWxlY3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvaW5kZXhvZi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcmVmaXgvaW5kZXguanMiLCJub2RlX21vZHVsZXMvc25pZmZlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zeW50aGV0aWMtZG9tLWV2ZW50cy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zeW50aGV0aWMtZG9tLWV2ZW50cy9pbml0Lmpzb24iLCJub2RlX21vZHVsZXMvc3ludGhldGljLWRvbS1ldmVudHMvdHlwZXMuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU07O1FBRUUseUJBRk8sQUFFUCxBQUFVLEFBQ2pCO1FBQU8sU0FITyxBQUdFLEFBRWhCOztRQUFPLE9BTE8sQUFLQSxBQUNkO1NBQVEsT0FOTSxBQU1DLEFBR2Y7O1dBQVUsa0JBVEksQUFTSSxBQUVsQjs7U0FBUSxzQkFYTSxBQVdOLEFBQU8sQUFDZjthQUFZLHNCQVpiLEFBQWUsQUFZRixBQUFPO0FBWkwsQUFFZDs7a0IsQUFhYzs7Ozs7QUNwQmY7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsa0JBQUEsQUFBUSxXQUFXLFNBQW5CLEFBQTRCOztBQUU1QixpQkFBQSxBQUFPLGdDQUFZLEFBQU0sR0FBRyxpQkFBVCxBQUFnQixPQUFoQixBQUF1QixhQUFhLFVBQUEsQUFBQyxHQUFEO1NBQU8sRUFBUCxBQUFPLEFBQUU7QUFBaEUsQUFBbUIsQ0FBQTs7O0FDUm5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgZG9tc2VsZWN0IGZyb20gJ2RvbS1zZWxlY3QnXG5pbXBvcnQgY2xhc3NlcyBmcm9tICdkb20tY2xhc3NlcydcbmltcG9ydCBwcmVmaXggZnJvbSAncHJlZml4J1xuaW1wb3J0IHNuaWZmZXIgZnJvbSAnc25pZmZlcidcblxuY29uc3QgY29uZmlnID0ge1xuXG5cdCRodG1sOiBkb21zZWxlY3QoJ2h0bWwnKSxcblx0JGJvZHk6IGRvY3VtZW50LmJvZHksXG5cdFxuXHR3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG5cdGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuXHRcblx0XG5cdGlzTW9iaWxlOiBzbmlmZmVyLmlzUGhvbmUsXG5cdFxuXHRwcmVmaXg6IHByZWZpeCgndHJhbnNmb3JtJyksXG5cdHRyYW5zaXRpb246IHByZWZpeCgndHJhbnNpdGlvbicpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZyIsImltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnXG5cbmltcG9ydCBldmVudCBmcm9tICdkb20tZXZlbnRzJ1xuaW1wb3J0IGNsYXNzZXMgZnJvbSAnZG9tLWNsYXNzZXMnXG5pbXBvcnQgc25pZmZlciBmcm9tICdzbmlmZmVyJ1xuXG5zbmlmZmVyLmFkZENsYXNzZXMoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KVxuXG5jb25maWcuaXNNb2JpbGUgJiYgZXZlbnQub24oY29uZmlnLiRib2R5LCAndG91Y2htb3ZlJywgKGUpID0+IGUucHJldmVudERlZmF1bHQoKSlcblxuXG4iLCIvKiFcbiAqIGRhc2hpZnkgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L2Rhc2hpZnk+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IEpvbiBTY2hsaW5rZXJ0LlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkYXNoaWZ5KHN0cikge1xuICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleHBlY3RlZCBhIHN0cmluZycpO1xuICB9XG4gIHN0ciA9IHN0ci5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKTtcbiAgc3RyID0gc3RyLnJlcGxhY2UoL1sgXFx0XFxXXS9nLCAnLScpO1xuICBzdHIgPSBzdHIucmVwbGFjZSgvXi0rfC0rJC9nLCAnJyk7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKTtcbn07XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGluZGV4ID0gcmVxdWlyZSgnaW5kZXhvZicpO1xuXG4vKipcbiAqIFdoaXRlc3BhY2UgcmVnZXhwLlxuICovXG5cbnZhciB3aGl0ZXNwYWNlUmUgPSAvXFxzKy87XG5cbi8qKlxuICogdG9TdHJpbmcgcmVmZXJlbmNlLlxuICovXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3Nlcztcbm1vZHVsZS5leHBvcnRzLmFkZCA9IGFkZDtcbm1vZHVsZS5leHBvcnRzLmNvbnRhaW5zID0gaGFzO1xubW9kdWxlLmV4cG9ydHMuaGFzID0gaGFzO1xubW9kdWxlLmV4cG9ydHMudG9nZ2xlID0gdG9nZ2xlO1xubW9kdWxlLmV4cG9ydHMucmVtb3ZlID0gcmVtb3ZlO1xubW9kdWxlLmV4cG9ydHMucmVtb3ZlTWF0Y2hpbmcgPSByZW1vdmVNYXRjaGluZztcblxuZnVuY3Rpb24gY2xhc3NlcyAoZWwpIHtcbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIHJldHVybiBlbC5jbGFzc0xpc3Q7XG4gIH1cblxuICB2YXIgc3RyID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgdmFyIGFyciA9IHN0ci5zcGxpdCh3aGl0ZXNwYWNlUmUpO1xuICBpZiAoJycgPT09IGFyclswXSkgYXJyLnNoaWZ0KCk7XG4gIHJldHVybiBhcnI7XG59XG5cbmZ1bmN0aW9uIGFkZCAoZWwsIG5hbWUpIHtcbiAgLy8gY2xhc3NMaXN0XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGZhbGxiYWNrXG4gIHZhciBhcnIgPSBjbGFzc2VzKGVsKTtcbiAgdmFyIGkgPSBpbmRleChhcnIsIG5hbWUpO1xuICBpZiAoIX5pKSBhcnIucHVzaChuYW1lKTtcbiAgZWwuY2xhc3NOYW1lID0gYXJyLmpvaW4oJyAnKTtcbn1cblxuZnVuY3Rpb24gaGFzIChlbCwgbmFtZSkge1xuICByZXR1cm4gZWwuY2xhc3NMaXN0XG4gICAgPyBlbC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSlcbiAgICA6ICEhIH5pbmRleChjbGFzc2VzKGVsKSwgbmFtZSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZSAoZWwsIG5hbWUpIHtcbiAgaWYgKCdbb2JqZWN0IFJlZ0V4cF0nID09IHRvU3RyaW5nLmNhbGwobmFtZSkpIHtcbiAgICByZXR1cm4gcmVtb3ZlTWF0Y2hpbmcoZWwsIG5hbWUpO1xuICB9XG5cbiAgLy8gY2xhc3NMaXN0XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGZhbGxiYWNrXG4gIHZhciBhcnIgPSBjbGFzc2VzKGVsKTtcbiAgdmFyIGkgPSBpbmRleChhcnIsIG5hbWUpO1xuICBpZiAofmkpIGFyci5zcGxpY2UoaSwgMSk7XG4gIGVsLmNsYXNzTmFtZSA9IGFyci5qb2luKCcgJyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZU1hdGNoaW5nIChlbCwgcmUsIHJlZikge1xuICB2YXIgYXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoY2xhc3NlcyhlbCkpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChyZS50ZXN0KGFycltpXSkpIHtcbiAgICAgIHJlbW92ZShlbCwgYXJyW2ldKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdG9nZ2xlIChlbCwgbmFtZSkge1xuICAvLyBjbGFzc0xpc3RcbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIHJldHVybiBlbC5jbGFzc0xpc3QudG9nZ2xlKG5hbWUpO1xuICB9XG5cbiAgLy8gZmFsbGJhY2tcbiAgaWYgKGhhcyhlbCwgbmFtZSkpIHtcbiAgICByZW1vdmUoZWwsIG5hbWUpO1xuICB9IGVsc2Uge1xuICAgIGFkZChlbCwgbmFtZSk7XG4gIH1cbn1cbiIsIlxudmFyIHN5bnRoID0gcmVxdWlyZSgnc3ludGhldGljLWRvbS1ldmVudHMnKTtcblxudmFyIG9uID0gZnVuY3Rpb24oZWxlbWVudCwgbmFtZSwgZm4sIGNhcHR1cmUpIHtcbiAgICByZXR1cm4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGZuLCBjYXB0dXJlIHx8IGZhbHNlKTtcbn07XG5cbnZhciBvZmYgPSBmdW5jdGlvbihlbGVtZW50LCBuYW1lLCBmbiwgY2FwdHVyZSkge1xuICAgIHJldHVybiBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgZm4sIGNhcHR1cmUgfHwgZmFsc2UpO1xufTtcblxudmFyIG9uY2UgPSBmdW5jdGlvbiAoZWxlbWVudCwgbmFtZSwgZm4sIGNhcHR1cmUpIHtcbiAgICBmdW5jdGlvbiB0bXAgKGV2KSB7XG4gICAgICAgIG9mZihlbGVtZW50LCBuYW1lLCB0bXAsIGNhcHR1cmUpO1xuICAgICAgICBmbihldik7XG4gICAgfVxuICAgIG9uKGVsZW1lbnQsIG5hbWUsIHRtcCwgY2FwdHVyZSk7XG59O1xuXG52YXIgZW1pdCA9IGZ1bmN0aW9uKGVsZW1lbnQsIG5hbWUsIG9wdCkge1xuICAgIHZhciBldiA9IHN5bnRoKG5hbWUsIG9wdCk7XG4gICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2KTtcbn07XG5cbmlmICghZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIG9uID0gZnVuY3Rpb24oZWxlbWVudCwgbmFtZSwgZm4pIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuYXR0YWNoRXZlbnQoJ29uJyArIG5hbWUsIGZuKTtcbiAgICB9O1xufVxuXG5pZiAoIWRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICBvZmYgPSBmdW5jdGlvbihlbGVtZW50LCBuYW1lLCBmbikge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5kZXRhY2hFdmVudCgnb24nICsgbmFtZSwgZm4pO1xuICAgIH07XG59XG5cbmlmICghZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCkge1xuICAgIGVtaXQgPSBmdW5jdGlvbihlbGVtZW50LCBuYW1lLCBvcHQpIHtcbiAgICAgICAgdmFyIGV2ID0gc3ludGgobmFtZSwgb3B0KTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuZmlyZUV2ZW50KCdvbicgKyBldi50eXBlLCBldik7XG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgb246IG9uLFxuICAgIG9mZjogb2ZmLFxuICAgIG9uY2U6IG9uY2UsXG4gICAgZW1pdDogZW1pdFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gb25lO1xubW9kdWxlLmV4cG9ydHMuYWxsID0gYWxsO1xuXG5mdW5jdGlvbiBvbmUgKHNlbGVjdG9yLCBwYXJlbnQpIHtcbiAgcGFyZW50IHx8IChwYXJlbnQgPSBkb2N1bWVudCk7XG4gIHJldHVybiBwYXJlbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG59XG5cbmZ1bmN0aW9uIGFsbCAoc2VsZWN0b3IsIHBhcmVudCkge1xuICBwYXJlbnQgfHwgKHBhcmVudCA9IGRvY3VtZW50KTtcbiAgdmFyIHNlbGVjdGlvbiA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgcmV0dXJuICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChzZWxlY3Rpb24pO1xufVxuIiwiXG52YXIgaW5kZXhPZiA9IFtdLmluZGV4T2Y7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXJyLCBvYmope1xuICBpZiAoaW5kZXhPZikgcmV0dXJuIGFyci5pbmRleE9mKG9iaik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKGFycltpXSA9PT0gb2JqKSByZXR1cm4gaTtcbiAgfVxuICByZXR1cm4gLTE7XG59OyIsIi8vIGNoZWNrIGRvY3VtZW50IGZpcnN0IHNvIGl0IGRvZXNuJ3QgZXJyb3IgaW4gbm9kZS5qc1xudmFyIHN0eWxlID0gdHlwZW9mIGRvY3VtZW50ICE9ICd1bmRlZmluZWQnXG4gID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpLnN0eWxlXG4gIDoge31cblxudmFyIHByZWZpeGVzID0gWydPJywgJ21zJywgJ01veicsICdXZWJraXQnXVxudmFyIHVwcGVyID0gLyhbQS1aXSkvZ1xudmFyIG1lbW8gPSB7fVxuXG4vKipcbiAqIHByZWZpeCBga2V5YFxuICpcbiAqICAgcHJlZml4KCd0cmFuc2Zvcm0nKSAvLyA9PiBXZWJraXRUcmFuc2Zvcm1cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBwcmVmaXgoa2V5KXtcbiAgLy8gQ2FtZWwgY2FzZVxuICBrZXkgPSBrZXkucmVwbGFjZSgvLShbYS16XSkvZywgZnVuY3Rpb24oXywgY2hhcil7XG4gICAgcmV0dXJuIGNoYXIudG9VcHBlckNhc2UoKVxuICB9KVxuXG4gIC8vIFdpdGhvdXQgcHJlZml4XG4gIGlmIChzdHlsZVtrZXldICE9PSB1bmRlZmluZWQpIHJldHVybiBrZXlcblxuICAvLyBXaXRoIHByZWZpeFxuICB2YXIgS2V5ID0ga2V5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsga2V5LnNsaWNlKDEpXG4gIHZhciBpID0gcHJlZml4ZXMubGVuZ3RoXG4gIHdoaWxlIChpLS0pIHtcbiAgICB2YXIgbmFtZSA9IHByZWZpeGVzW2ldICsgS2V5XG4gICAgaWYgKHN0eWxlW25hbWVdICE9PSB1bmRlZmluZWQpIHJldHVybiBuYW1lXG4gIH1cblxuICByZXR1cm4ga2V5XG59XG5cbi8qKlxuICogTWVtb2l6ZWQgdmVyc2lvbiBvZiBgcHJlZml4YFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIHByZWZpeE1lbW96aWVkKGtleSl7XG4gIHJldHVybiBrZXkgaW4gbWVtb1xuICAgID8gbWVtb1trZXldXG4gICAgOiBtZW1vW2tleV0gPSBwcmVmaXgoa2V5KVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRhc2hlZCBwcmVmaXhcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBwcmVmaXhEYXNoZWQoa2V5KXtcbiAga2V5ID0gcHJlZml4KGtleSlcbiAgaWYgKHVwcGVyLnRlc3Qoa2V5KSkge1xuICAgIGtleSA9ICctJyArIGtleS5yZXBsYWNlKHVwcGVyLCAnLSQxJylcbiAgICB1cHBlci5sYXN0SW5kZXggPSAwXG4gIH1cbiAgcmV0dXJuIGtleS50b0xvd2VyQ2FzZSgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJlZml4TWVtb3ppZWRcbm1vZHVsZS5leHBvcnRzLmRhc2ggPSBwcmVmaXhEYXNoZWRcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRhc2hpZnkgPSByZXF1aXJlKCdkYXNoaWZ5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNuaWZmZXIoKTtcblxuZnVuY3Rpb24gU25pZmZlcigpIHtcbiAgICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIGF2ID0gbmF2aWdhdG9yLmFwcFZlcnNpb24udG9Mb3dlckNhc2UoKTtcblxuICAgIHZhciBpc1dpbmRvd3NQaG9uZSA9IC93aW5kb3dzIHBob25lfGllbW9iaWxlfHdwZGVza3RvcC8udGVzdCh1YSk7XG5cbiAgICB2YXIgaXNEcm9pZFBob25lID0gIWlzV2luZG93c1Bob25lICYmIC9hbmRyb2lkLiptb2JpbGUvLnRlc3QodWEpO1xuICAgIHZhciBpc0Ryb2lkVGFibGV0ID0gIWlzV2luZG93c1Bob25lICYmICFpc0Ryb2lkUGhvbmUgJiYgKC9hbmRyb2lkL2kpLnRlc3QodWEpO1xuICAgIHZhciBpc0Ryb2lkID0gaXNEcm9pZFBob25lIHx8IGlzRHJvaWRUYWJsZXQ7XG5cbiAgICB2YXIgaXNJb3MgPSAhaXNXaW5kb3dzUGhvbmUgJiYgKC9pcChob25lfG9kfGFkKS9pKS50ZXN0KHVhKSAmJiAhd2luZG93Lk1TU3RyZWFtO1xuICAgIHZhciBpc0lwYWQgPSAhaXNXaW5kb3dzUGhvbmUgJiYgKC9pcGFkL2kpLnRlc3QodWEpICYmIGlzSW9zO1xuXG4gICAgdmFyIGlzVGFibGV0ID0gaXNEcm9pZFRhYmxldCB8fCBpc0lwYWQ7XG4gICAgdmFyIGlzUGhvbmUgPSBpc0Ryb2lkUGhvbmUgfHwgKGlzSW9zICYmICFpc0lwYWQpIHx8IGlzV2luZG93c1Bob25lO1xuICAgIHZhciBpc0RldmljZSA9IGlzUGhvbmUgfHwgaXNUYWJsZXQ7XG5cbiAgICB2YXIgaXNGaXJlZm94ID0gdWEuaW5kZXhPZignZmlyZWZveCcpID4gLTE7XG4gICAgdmFyIGlzU2FmYXJpID0gISF1YS5tYXRjaCgvdmVyc2lvblxcL1tcXGRcXC5dKy4qc2FmYXJpLyk7XG4gICAgdmFyIGlzT3BlcmEgPSB1YS5pbmRleE9mKCdvcHInKSA+IC0xO1xuICAgIHZhciBpc0lFMTEgPSAhKHdpbmRvdy5BY3RpdmVYT2JqZWN0KSAmJiBcIkFjdGl2ZVhPYmplY3RcIiBpbiB3aW5kb3c7XG4gICAgdmFyIGlzSUUgPSBhdi5pbmRleE9mKCdtc2llJykgPiAtMSB8fCBpc0lFMTEgfHwgYXYuaW5kZXhPZignZWRnZScpID4gLTE7XG4gICAgdmFyIGlzRWRnZSA9IHVhLmluZGV4T2YoJ2VkZ2UnKSA+IC0xO1xuICAgIHZhciBpc0Nocm9tZSA9IHdpbmRvdy5jaHJvbWUgIT09IG51bGwgJiYgd2luZG93LmNocm9tZSAhPT0gdW5kZWZpbmVkICYmIG5hdmlnYXRvci52ZW5kb3IudG9Mb3dlckNhc2UoKSA9PSAnZ29vZ2xlIGluYy4nICYmICFpc09wZXJhICYmICFpc0VkZ2U7XG5cbiAgICB0aGlzLmluZm9zID0ge1xuICAgICAgICBpc0Ryb2lkOiBpc0Ryb2lkLFxuICAgICAgICBpc0Ryb2lkUGhvbmU6IGlzRHJvaWRQaG9uZSxcbiAgICAgICAgaXNEcm9pZFRhYmxldDogaXNEcm9pZFRhYmxldCxcbiAgICAgICAgaXNXaW5kb3dzUGhvbmU6IGlzV2luZG93c1Bob25lLFxuICAgICAgICBpc0lvczogaXNJb3MsXG4gICAgICAgIGlzSXBhZDogaXNJcGFkLFxuICAgICAgICBpc0RldmljZTogaXNEZXZpY2UsXG4gICAgICAgIGlzRWRnZTogaXNFZGdlLFxuICAgICAgICBpc0lFOiBpc0lFLFxuICAgICAgICBpc0lFMTE6IGlzSUUxMSxcbiAgICAgICAgaXNQaG9uZTogaXNQaG9uZSxcbiAgICAgICAgaXNUYWJsZXQ6IGlzVGFibGV0LFxuICAgICAgICBpc0ZpcmVmb3g6IGlzRmlyZWZveCxcbiAgICAgICAgaXNTYWZhcmk6IGlzU2FmYXJpLFxuICAgICAgICBpc09wZXJhOiBpc09wZXJhLFxuICAgICAgICBpc0Nocm9tZTogaXNDaHJvbWUsXG4gICAgICAgIGlzRGVza3RvcDogIWlzUGhvbmUgJiYgIWlzVGFibGV0XG4gICAgfTtcblxuICAgIE9iamVjdC5rZXlzKHRoaXMuaW5mb3MpLmZvckVhY2goZnVuY3Rpb24oaW5mbykge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgaW5mbywge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5mb3NbaW5mb107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcblxuICAgIC8vIFRPRE86IGFkZCBnZXRWZXJzaW9uKCkgdG8gZ2V0IElFL1NhZmFyaS8uLi4gdmVyc2lvblxufVxuXG5TbmlmZmVyLnByb3RvdHlwZS5hZGRDbGFzc2VzID0gZnVuY3Rpb24oZWwpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmluZm9zKS5mb3JFYWNoKGZ1bmN0aW9uKGluZm8pIHtcbiAgICAgICAgaWYgKHRoaXMuaW5mb3NbaW5mb10pIGFkZENsYXNzKGVsLCBkYXNoaWZ5KGluZm8pKTtcbiAgICB9LCB0aGlzKTtcbn07XG5cblNuaWZmZXIucHJvdG90eXBlLmdldEluZm9zID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNsb25lKHRoaXMuaW5mb3MpO1xufTtcblxuZnVuY3Rpb24gYWRkQ2xhc3MoZWwsIGNsYXNzTmFtZSkge1xuICAgIGlmIChlbC5hZGRDbGFzcykgZWwuYWRkQ2xhc3MoY2xhc3NOYW1lKTtcbiAgICBlbHNlIGlmIChlbC5jbGFzc0xpc3QpIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICBlbHNlIGVsLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XG59XG5cbmZ1bmN0aW9uIGNsb25lKHNvdXJjZSkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNvdXJjZSkpO1xufSIsIlxuLy8gZm9yIGNvbXByZXNzaW9uXG52YXIgd2luID0gd2luZG93O1xudmFyIGRvYyA9IGRvY3VtZW50IHx8IHt9O1xudmFyIHJvb3QgPSBkb2MuZG9jdW1lbnRFbGVtZW50IHx8IHt9O1xuXG4vLyBkZXRlY3QgaWYgd2UgbmVlZCB0byB1c2UgZmlyZWZveCBLZXlFdmVudHMgdnMgS2V5Ym9hcmRFdmVudHNcbnZhciB1c2Vfa2V5X2V2ZW50ID0gdHJ1ZTtcbnRyeSB7XG4gICAgZG9jLmNyZWF0ZUV2ZW50KCdLZXlFdmVudHMnKTtcbn1cbmNhdGNoIChlcnIpIHtcbiAgICB1c2Vfa2V5X2V2ZW50ID0gZmFsc2U7XG59XG5cbi8vIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNjczNVxuZnVuY3Rpb24gY2hlY2tfa2IoZXYsIG9wdHMpIHtcbiAgICBpZiAoZXYuY3RybEtleSAhPSAob3B0cy5jdHJsS2V5IHx8IGZhbHNlKSB8fFxuICAgICAgICBldi5hbHRLZXkgIT0gKG9wdHMuYWx0S2V5IHx8IGZhbHNlKSB8fFxuICAgICAgICBldi5zaGlmdEtleSAhPSAob3B0cy5zaGlmdEtleSB8fCBmYWxzZSkgfHxcbiAgICAgICAgZXYubWV0YUtleSAhPSAob3B0cy5tZXRhS2V5IHx8IGZhbHNlKSB8fFxuICAgICAgICBldi5rZXlDb2RlICE9IChvcHRzLmtleUNvZGUgfHwgMCkgfHxcbiAgICAgICAgZXYuY2hhckNvZGUgIT0gKG9wdHMuY2hhckNvZGUgfHwgMCkpIHtcblxuICAgICAgICBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgICBldi5pbml0RXZlbnQob3B0cy50eXBlLCBvcHRzLmJ1YmJsZXMsIG9wdHMuY2FuY2VsYWJsZSk7XG4gICAgICAgIGV2LmN0cmxLZXkgID0gb3B0cy5jdHJsS2V5IHx8IGZhbHNlO1xuICAgICAgICBldi5hbHRLZXkgICA9IG9wdHMuYWx0S2V5IHx8IGZhbHNlO1xuICAgICAgICBldi5zaGlmdEtleSA9IG9wdHMuc2hpZnRLZXkgfHwgZmFsc2U7XG4gICAgICAgIGV2Lm1ldGFLZXkgID0gb3B0cy5tZXRhS2V5IHx8IGZhbHNlO1xuICAgICAgICBldi5rZXlDb2RlICA9IG9wdHMua2V5Q29kZSB8fCAwO1xuICAgICAgICBldi5jaGFyQ29kZSA9IG9wdHMuY2hhckNvZGUgfHwgMDtcbiAgICB9XG5cbiAgICByZXR1cm4gZXY7XG59XG5cbi8vIG1vZGVybiBicm93c2VycywgZG8gYSBwcm9wZXIgZGlzcGF0Y2hFdmVudCgpXG52YXIgbW9kZXJuID0gZnVuY3Rpb24odHlwZSwgb3B0cykge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gICAgLy8gd2hpY2ggaW5pdCBmbiBkbyB3ZSB1c2VcbiAgICB2YXIgZmFtaWx5ID0gdHlwZU9mKHR5cGUpO1xuICAgIHZhciBpbml0X2ZhbSA9IGZhbWlseTtcbiAgICBpZiAoZmFtaWx5ID09PSAnS2V5Ym9hcmRFdmVudCcgJiYgdXNlX2tleV9ldmVudCkge1xuICAgICAgICBmYW1pbHkgPSAnS2V5RXZlbnRzJztcbiAgICAgICAgaW5pdF9mYW0gPSAnS2V5RXZlbnQnO1xuICAgIH1cblxuICAgIHZhciBldiA9IGRvYy5jcmVhdGVFdmVudChmYW1pbHkpO1xuICAgIHZhciBpbml0X2ZuID0gJ2luaXQnICsgaW5pdF9mYW07XG4gICAgdmFyIGluaXQgPSB0eXBlb2YgZXZbaW5pdF9mbl0gPT09ICdmdW5jdGlvbicgPyBpbml0X2ZuIDogJ2luaXRFdmVudCc7XG5cbiAgICB2YXIgc2lnID0gaW5pdFNpZ25hdHVyZXNbaW5pdF07XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIgdXNlZCA9IHt9O1xuXG4gICAgb3B0cy50eXBlID0gdHlwZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gc2lnW2ldO1xuICAgICAgICB2YXIgdmFsID0gb3B0c1trZXldO1xuICAgICAgICAvLyBpZiBubyB1c2VyIHNwZWNpZmllZCB2YWx1ZSwgdGhlbiB1c2UgZXZlbnQgZGVmYXVsdFxuICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhbCA9IGV2W2tleV07XG4gICAgICAgIH1cbiAgICAgICAgdXNlZFtrZXldID0gdHJ1ZTtcbiAgICAgICAgYXJncy5wdXNoKHZhbCk7XG4gICAgfVxuICAgIGV2W2luaXRdLmFwcGx5KGV2LCBhcmdzKTtcblxuICAgIC8vIHdlYmtpdCBrZXkgZXZlbnQgaXNzdWUgd29ya2Fyb3VuZFxuICAgIGlmIChmYW1pbHkgPT09ICdLZXlib2FyZEV2ZW50Jykge1xuICAgICAgICBldiA9IGNoZWNrX2tiKGV2LCBvcHRzKTtcbiAgICB9XG5cbiAgICAvLyBhdHRhY2ggcmVtYWluaW5nIHVudXNlZCBvcHRpb25zIHRvIHRoZSBvYmplY3RcbiAgICBmb3IgKHZhciBrZXkgaW4gb3B0cykge1xuICAgICAgICBpZiAoIXVzZWRba2V5XSkge1xuICAgICAgICAgICAgZXZba2V5XSA9IG9wdHNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBldjtcbn07XG5cbnZhciBsZWdhY3kgPSBmdW5jdGlvbiAodHlwZSwgb3B0cykge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIHZhciBldiA9IGRvYy5jcmVhdGVFdmVudE9iamVjdCgpO1xuXG4gICAgZXYudHlwZSA9IHR5cGU7XG4gICAgZm9yICh2YXIga2V5IGluIG9wdHMpIHtcbiAgICAgICAgaWYgKG9wdHNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBldltrZXldID0gb3B0c1trZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGV2O1xufTtcblxuLy8gZXhwb3NlIGVpdGhlciB0aGUgbW9kZXJuIHZlcnNpb24gb2YgZXZlbnQgZ2VuZXJhdGlvbiBvciBsZWdhY3lcbi8vIGRlcGVuZGluZyBvbiB3aGF0IHdlIHN1cHBvcnRcbi8vIGF2b2lkcyBpZiBzdGF0ZW1lbnRzIGluIHRoZSBjb2RlIGxhdGVyXG5tb2R1bGUuZXhwb3J0cyA9IGRvYy5jcmVhdGVFdmVudCA/IG1vZGVybiA6IGxlZ2FjeTtcblxudmFyIGluaXRTaWduYXR1cmVzID0gcmVxdWlyZSgnLi9pbml0Lmpzb24nKTtcbnZhciB0eXBlcyA9IHJlcXVpcmUoJy4vdHlwZXMuanNvbicpO1xudmFyIHR5cGVPZiA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHR5cHMgPSB7fTtcbiAgICBmb3IgKHZhciBrZXkgaW4gdHlwZXMpIHtcbiAgICAgICAgdmFyIHRzID0gdHlwZXNba2V5XTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdHlwc1t0c1tpXV0gPSBrZXk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cHNbbmFtZV0gfHwgJ0V2ZW50JztcbiAgICB9O1xufSkoKTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJpbml0RXZlbnRcIiA6IFtcbiAgICBcInR5cGVcIixcbiAgICBcImJ1YmJsZXNcIixcbiAgICBcImNhbmNlbGFibGVcIlxuICBdLFxuICBcImluaXRVSUV2ZW50XCIgOiBbXG4gICAgXCJ0eXBlXCIsXG4gICAgXCJidWJibGVzXCIsXG4gICAgXCJjYW5jZWxhYmxlXCIsXG4gICAgXCJ2aWV3XCIsXG4gICAgXCJkZXRhaWxcIlxuICBdLFxuICBcImluaXRNb3VzZUV2ZW50XCIgOiBbXG4gICAgXCJ0eXBlXCIsXG4gICAgXCJidWJibGVzXCIsXG4gICAgXCJjYW5jZWxhYmxlXCIsXG4gICAgXCJ2aWV3XCIsXG4gICAgXCJkZXRhaWxcIixcbiAgICBcInNjcmVlblhcIixcbiAgICBcInNjcmVlbllcIixcbiAgICBcImNsaWVudFhcIixcbiAgICBcImNsaWVudFlcIixcbiAgICBcImN0cmxLZXlcIixcbiAgICBcImFsdEtleVwiLFxuICAgIFwic2hpZnRLZXlcIixcbiAgICBcIm1ldGFLZXlcIixcbiAgICBcImJ1dHRvblwiLFxuICAgIFwicmVsYXRlZFRhcmdldFwiXG4gIF0sXG4gIFwiaW5pdE11dGF0aW9uRXZlbnRcIiA6IFtcbiAgICBcInR5cGVcIixcbiAgICBcImJ1YmJsZXNcIixcbiAgICBcImNhbmNlbGFibGVcIixcbiAgICBcInJlbGF0ZWROb2RlXCIsXG4gICAgXCJwcmV2VmFsdWVcIixcbiAgICBcIm5ld1ZhbHVlXCIsXG4gICAgXCJhdHRyTmFtZVwiLFxuICAgIFwiYXR0ckNoYW5nZVwiXG4gIF0sXG4gIFwiaW5pdEtleWJvYXJkRXZlbnRcIiA6IFtcbiAgICBcInR5cGVcIixcbiAgICBcImJ1YmJsZXNcIixcbiAgICBcImNhbmNlbGFibGVcIixcbiAgICBcInZpZXdcIixcbiAgICBcImN0cmxLZXlcIixcbiAgICBcImFsdEtleVwiLFxuICAgIFwic2hpZnRLZXlcIixcbiAgICBcIm1ldGFLZXlcIixcbiAgICBcImtleUNvZGVcIixcbiAgICBcImNoYXJDb2RlXCJcbiAgXSxcbiAgXCJpbml0S2V5RXZlbnRcIiA6IFtcbiAgICBcInR5cGVcIixcbiAgICBcImJ1YmJsZXNcIixcbiAgICBcImNhbmNlbGFibGVcIixcbiAgICBcInZpZXdcIixcbiAgICBcImN0cmxLZXlcIixcbiAgICBcImFsdEtleVwiLFxuICAgIFwic2hpZnRLZXlcIixcbiAgICBcIm1ldGFLZXlcIixcbiAgICBcImtleUNvZGVcIixcbiAgICBcImNoYXJDb2RlXCJcbiAgXVxufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIk1vdXNlRXZlbnRcIiA6IFtcbiAgICBcImNsaWNrXCIsXG4gICAgXCJtb3VzZWRvd25cIixcbiAgICBcIm1vdXNldXBcIixcbiAgICBcIm1vdXNlb3ZlclwiLFxuICAgIFwibW91c2Vtb3ZlXCIsXG4gICAgXCJtb3VzZW91dFwiXG4gIF0sXG4gIFwiS2V5Ym9hcmRFdmVudFwiIDogW1xuICAgIFwia2V5ZG93blwiLFxuICAgIFwia2V5dXBcIixcbiAgICBcImtleXByZXNzXCJcbiAgXSxcbiAgXCJNdXRhdGlvbkV2ZW50XCIgOiBbXG4gICAgXCJET01TdWJ0cmVlTW9kaWZpZWRcIixcbiAgICBcIkRPTU5vZGVJbnNlcnRlZFwiLFxuICAgIFwiRE9NTm9kZVJlbW92ZWRcIixcbiAgICBcIkRPTU5vZGVSZW1vdmVkRnJvbURvY3VtZW50XCIsXG4gICAgXCJET01Ob2RlSW5zZXJ0ZWRJbnRvRG9jdW1lbnRcIixcbiAgICBcIkRPTUF0dHJNb2RpZmllZFwiLFxuICAgIFwiRE9NQ2hhcmFjdGVyRGF0YU1vZGlmaWVkXCJcbiAgXSxcbiAgXCJIVE1MRXZlbnRzXCIgOiBbXG4gICAgXCJsb2FkXCIsXG4gICAgXCJ1bmxvYWRcIixcbiAgICBcImFib3J0XCIsXG4gICAgXCJlcnJvclwiLFxuICAgIFwic2VsZWN0XCIsXG4gICAgXCJjaGFuZ2VcIixcbiAgICBcInN1Ym1pdFwiLFxuICAgIFwicmVzZXRcIixcbiAgICBcImZvY3VzXCIsXG4gICAgXCJibHVyXCIsXG4gICAgXCJyZXNpemVcIixcbiAgICBcInNjcm9sbFwiXG4gIF0sXG4gIFwiVUlFdmVudFwiIDogW1xuICAgIFwiRE9NRm9jdXNJblwiLFxuICAgIFwiRE9NRm9jdXNPdXRcIixcbiAgICBcIkRPTUFjdGl2YXRlXCJcbiAgXVxufVxuIl19
