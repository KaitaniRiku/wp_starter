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

},{"dom-classes":6,"dom-select":8,"prefix":12,"sniffer":15}],2:[function(require,module,exports){
'use strict';

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _slider = require('./slider');

var _slider2 = _interopRequireDefault(_slider);

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

_slider2.default.init();

},{"./config":1,"./slider":3,"dom-classes":6,"dom-events":7,"sniffer":15}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sliderManager = require('slider-manager');

var _sliderManager2 = _interopRequireDefault(_sliderManager);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var slides = document.querySelectorAll('.is_slide');

var slider = new _sliderManager2.default({
  length: slides.length - 1,
  loop: true,
  direction: 'y',
  limitInertia: true,
  callback: function callback(e) {

    console.log(e);
    slider.animating = true;

    slides.forEach(function (slide, i) {

      slide.addEventListener('transitionend', function () {
        slider.animating = false;
      });

      slide.style.transform = i === e.current ? 'none' : i > e.current ? 'translateY(100%)' : 'translateY(-100%)';
    });
  }
});

exports.default = slider;

},{"slider-manager":13}],4:[function(require,module,exports){
'use strict';

var toString = Object.prototype.toString,
    hasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = function(object) {
    if(!object) return console.warn('bindAll requires at least one argument.');

    var functions = Array.prototype.slice.call(arguments, 1);

    if (functions.length === 0) {

        for (var method in object) {
            if(hasOwnProperty.call(object, method)) {
                if(typeof object[method] == 'function' && toString.call(object[method]) == "[object Function]") {
                    functions.push(method);
                }
            }
        }
    }

    for(var i = 0; i < functions.length; i++) {
        var f = functions[i];
        object[f] = bind(object[f], object);
    }
};

/*
    Faster bind without specific-case checking. (see https://coderwall.com/p/oi3j3w).
    bindAll is only needed for events binding so no need to make slow fixes for constructor
    or partial application.
*/
function bind(func, context) {
  return function() {
    return func.apply(context, arguments);
  };
}
},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{"indexof":9}],7:[function(require,module,exports){

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

},{"synthetic-dom-events":16}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){

var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
},{}],10:[function(require,module,exports){
// Generated by CoffeeScript 1.9.2
(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.Lethargy = (function() {
    function Lethargy(stability, sensitivity, tolerance, delay) {
      this.stability = stability != null ? Math.abs(stability) : 8;
      this.sensitivity = sensitivity != null ? 1 + Math.abs(sensitivity) : 100;
      this.tolerance = tolerance != null ? 1 + Math.abs(tolerance) : 1.1;
      this.delay = delay != null ? delay : 150;
      this.lastUpDeltas = (function() {
        var i, ref, results;
        results = [];
        for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
          results.push(null);
        }
        return results;
      }).call(this);
      this.lastDownDeltas = (function() {
        var i, ref, results;
        results = [];
        for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
          results.push(null);
        }
        return results;
      }).call(this);
      this.deltasTimestamp = (function() {
        var i, ref, results;
        results = [];
        for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
          results.push(null);
        }
        return results;
      }).call(this);
    }

    Lethargy.prototype.check = function(e) {
      var lastDelta;
      e = e.originalEvent || e;
      if (e.wheelDelta != null) {
        lastDelta = e.wheelDelta;
      } else if (e.deltaY != null) {
        lastDelta = e.deltaY * -40;
      } else if ((e.detail != null) || e.detail === 0) {
        lastDelta = e.detail * -40;
      }
      this.deltasTimestamp.push(Date.now());
      this.deltasTimestamp.shift();
      if (lastDelta > 0) {
        this.lastUpDeltas.push(lastDelta);
        this.lastUpDeltas.shift();
        return this.isInertia(1);
      } else {
        this.lastDownDeltas.push(lastDelta);
        this.lastDownDeltas.shift();
        return this.isInertia(-1);
      }
      return false;
    };

    Lethargy.prototype.isInertia = function(direction) {
      var lastDeltas, lastDeltasNew, lastDeltasOld, newAverage, newSum, oldAverage, oldSum;
      lastDeltas = direction === -1 ? this.lastDownDeltas : this.lastUpDeltas;
      if (lastDeltas[0] === null) {
        return direction;
      }
      if (this.deltasTimestamp[(this.stability * 2) - 2] + this.delay > Date.now() && lastDeltas[0] === lastDeltas[(this.stability * 2) - 1]) {
        return false;
      }
      lastDeltasOld = lastDeltas.slice(0, this.stability);
      lastDeltasNew = lastDeltas.slice(this.stability, this.stability * 2);
      oldSum = lastDeltasOld.reduce(function(t, s) {
        return t + s;
      });
      newSum = lastDeltasNew.reduce(function(t, s) {
        return t + s;
      });
      oldAverage = oldSum / lastDeltasOld.length;
      newAverage = newSum / lastDeltasNew.length;
      if (Math.abs(oldAverage) < Math.abs(newAverage * this.tolerance) && (this.sensitivity < Math.abs(newAverage))) {
        return direction;
      } else {
        return false;
      }
    };

    Lethargy.prototype.showLastUpDeltas = function() {
      return this.lastUpDeltas;
    };

    Lethargy.prototype.showLastDownDeltas = function() {
      return this.lastDownDeltas;
    };

    return Lethargy;

  })();

}).call(this);

},{}],11:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _virtualScroll = require('virtual-scroll');

var _virtualScroll2 = _interopRequireDefault(_virtualScroll);

var _sniffer = require('sniffer');

var _sniffer2 = _interopRequireDefault(_sniffer);

var _domEvent = require('dom-event');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Manager = function () {
    function Manager() {
        var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Manager);

        if (!opt.callback) console.error('You need to provide a callback function in the options');

        this.el = opt.el || document.body;
        this.animating = false;

        this.index = 0;
        this.length = opt.length;

        this.options = {
            direction: opt.direction || 'y',
            loop: opt.loop || false,
            delta: opt.delta || 1,
            callback: opt.callback,
            limitInertia: opt.limitInertia || false
        };

        this.vs = null;

        this.onScroll = this.onScroll.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    _createClass(Manager, [{
        key: 'init',
        value: function init() {

            this.vs = new _virtualScroll2.default({ limitInertia: this.options.limitInertia });
            this.vs.on(this.onScroll);

            if (_sniffer2.default.isDesktop) {
                (0, _domEvent.on)(document, 'keydown', this.onKeyDown);
            }
        }
    }, {
        key: 'destroy',
        value: function destroy() {

            this.vs.off(this.onScroll);
            this.vs.destroy();
            this.vs = null;

            if (_sniffer2.default.isDesktop) {
                (0, _domEvent.off)(document, 'keydown', this.onKeyDown);
            }
        }
    }, {
        key: 'getNext',
        value: function getNext(delta) {

            var next = delta >= this.options.delta ? this.index + 1 : this.index - 1;

            return this.checkLoop(next);
        }
    }, {
        key: 'checkLoop',
        value: function checkLoop(next) {

            return next < 0 ? this.options.loop ? this.length : 0 : next > this.length ? this.options.loop ? 0 : this.length : next;
        }
    }, {
        key: 'getEvent',
        value: function getEvent(index) {

            var prev = this.options.direction == 'y' ? 'up' : 'left';
            var next = this.options.direction == 'y' ? 'down' : 'right';

            var direction = index > this.index ? next : prev;
            if (this.options.loop) {
                if (this.index == 0 && index == this.length) direction = prev;
                if (this.index == this.length && index == 0) direction = next;
            }

            return {
                current: index,
                previous: this.index,
                direction: direction
            };
        }
    }, {
        key: 'onScroll',
        value: function onScroll(event) {
            var deltaX = event.deltaX,
                deltaY = event.deltaY;

            var norm = this.options.direction == 'y' ? deltaY - deltaY * 2 : deltaX - deltaX * 2;

            if (this.animating || norm > -this.options.delta && norm < this.options.delta) return;
            this.animating = true;

            this.callback(norm);
        }
    }, {
        key: 'onKeyDown',
        value: function onKeyDown(e) {

            var prev = this.options.direction == 'y' ? '38' : '37';
            var next = this.options.direction == 'y' ? '40' : '39';

            if (this.animating || e.keyCode != prev && e.keyCode != next) return;
            this.animating = true;

            this.callback(e.keyCode == next ? this.options.delta + 1 : -(this.options.delta + 1));
        }
    }, {
        key: 'goTo',
        value: function goTo(index) {

            var check = this.checkLoop(index);
            var event = this.getEvent(check);

            this.index = check;
            this.options.callback(event);
        }
    }, {
        key: 'callback',
        value: function callback(delta) {

            var index = this.getNext(delta);
            var event = this.getEvent(index);

            this.index = index;
            this.options.callback(event);
        }
    }]);

    return Manager;
}();

exports.default = Manager;

},{"dom-event":14,"sniffer":15,"virtual-scroll":21}],14:[function(require,module,exports){
module.exports = on;
module.exports.on = on;
module.exports.off = off;

function on (element, event, callback, capture) {
  !element.addEventListener && (event = 'on' + event);
  (element.addEventListener || element.attachEvent).call(element, event, callback, capture);
  return callback;
}

function off (element, event, callback, capture) {
  !element.removeEventListener && (event = 'on' + event);
  (element.removeEventListener || element.detachEvent).call(element, event, callback, capture);
  return callback;
}

},{}],15:[function(require,module,exports){
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
},{"dashify":5}],16:[function(require,module,exports){

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

},{"./init.json":17,"./types.json":18}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;

},{}],20:[function(require,module,exports){
'use strict';

module.exports = function(source) {
    return JSON.parse(JSON.stringify(source));
};
},{}],21:[function(require,module,exports){
'use strict';

var objectAssign = require('object-assign');
var Emitter = require('tiny-emitter');
var Lethargy = require('lethargy').Lethargy;
var support = require('./support');
var clone = require('./clone');
var bindAll = require('bindall-standalone');
var EVT_ID = 'virtualscroll';

module.exports = VirtualScroll;

var keyCodes = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32
};

function VirtualScroll(options) {
    bindAll(this, '_onWheel', '_onMouseWheel', '_onTouchStart', '_onTouchMove', '_onKeyDown');

    this.el = window;
    if (options && options.el) {
        this.el = options.el;
        delete options.el;
    }
    this.options = objectAssign({
        mouseMultiplier: 1,
        touchMultiplier: 2,
        firefoxMultiplier: 15,
        keyStep: 120,
        preventTouch: false,
        unpreventTouchClass: 'vs-touchmove-allowed',
        limitInertia: false
    }, options);

    if (this.options.limitInertia) this._lethargy = new Lethargy();

    this._emitter = new Emitter();
    this._event = {
        y: 0,
        x: 0,
        deltaX: 0,
        deltaY: 0
    };
    this.touchStartX = null;
    this.touchStartY = null;
    this.bodyTouchAction = null;
}

VirtualScroll.prototype._notify = function(e) {
    var evt = this._event;
    evt.x += evt.deltaX;
    evt.y += evt.deltaY;

   this._emitter.emit(EVT_ID, {
        x: evt.x,
        y: evt.y,
        deltaX: evt.deltaX,
        deltaY: evt.deltaY,
        originalEvent: e
   });
};

VirtualScroll.prototype._onWheel = function(e) {
    var options = this.options;
    if (this._lethargy && this._lethargy.check(e) === false) return;
    var evt = this._event;

    // In Chrome and in Firefox (at least the new one)
    evt.deltaX = e.wheelDeltaX || e.deltaX * -1;
    evt.deltaY = e.wheelDeltaY || e.deltaY * -1;

    // for our purpose deltamode = 1 means user is on a wheel mouse, not touch pad
    // real meaning: https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
    if(support.isFirefox && e.deltaMode == 1) {
        evt.deltaX *= options.firefoxMultiplier;
        evt.deltaY *= options.firefoxMultiplier;
    }

    evt.deltaX *= options.mouseMultiplier;
    evt.deltaY *= options.mouseMultiplier;

    this._notify(e);
};

VirtualScroll.prototype._onMouseWheel = function(e) {
    if (this.options.limitInertia && this._lethargy.check(e) === false) return;

    var evt = this._event;

    // In Safari, IE and in Chrome if 'wheel' isn't defined
    evt.deltaX = (e.wheelDeltaX) ? e.wheelDeltaX : 0;
    evt.deltaY = (e.wheelDeltaY) ? e.wheelDeltaY : e.wheelDelta;

    this._notify(e);
};

VirtualScroll.prototype._onTouchStart = function(e) {
    var t = (e.targetTouches) ? e.targetTouches[0] : e;
    this.touchStartX = t.pageX;
    this.touchStartY = t.pageY;
};

VirtualScroll.prototype._onTouchMove = function(e) {
    var options = this.options;
    if(options.preventTouch
        && !e.target.classList.contains(options.unpreventTouchClass)) {
        e.preventDefault();
    }

    var evt = this._event;

    var t = (e.targetTouches) ? e.targetTouches[0] : e;

    evt.deltaX = (t.pageX - this.touchStartX) * options.touchMultiplier;
    evt.deltaY = (t.pageY - this.touchStartY) * options.touchMultiplier;

    this.touchStartX = t.pageX;
    this.touchStartY = t.pageY;

    this._notify(e);
};

VirtualScroll.prototype._onKeyDown = function(e) {
    var evt = this._event;
    evt.deltaX = evt.deltaY = 0;
    var windowHeight = window.innerHeight - 40

    switch(e.keyCode) {
        case keyCodes.LEFT:
        case keyCodes.UP:
            evt.deltaY = this.options.keyStep;
            break;

        case keyCodes.RIGHT:
        case keyCodes.DOWN:
            evt.deltaY = - this.options.keyStep;
            break;
        case keyCodes.SPACE && e.shiftKey:
            evt.deltaY = windowHeight;
            break;
        case keyCodes.SPACE:
            evt.deltaY = - windowHeight;
            break;
        default:
            return;
    }

    this._notify(e);
};

VirtualScroll.prototype._bind = function() {
    if(support.hasWheelEvent) this.el.addEventListener('wheel', this._onWheel);
    if(support.hasMouseWheelEvent) this.el.addEventListener('mousewheel', this._onMouseWheel);

    if(support.hasTouch) {
        this.el.addEventListener('touchstart', this._onTouchStart);
        this.el.addEventListener('touchmove', this._onTouchMove);
    }

    if(support.hasPointer && support.hasTouchWin) {
        this.bodyTouchAction = document.body.style.msTouchAction;
        document.body.style.msTouchAction = 'none';
        this.el.addEventListener('MSPointerDown', this._onTouchStart, true);
        this.el.addEventListener('MSPointerMove', this._onTouchMove, true);
    }

    if(support.hasKeyDown) document.addEventListener('keydown', this._onKeyDown);
};

VirtualScroll.prototype._unbind = function() {
    if(support.hasWheelEvent) this.el.removeEventListener('wheel', this._onWheel);
    if(support.hasMouseWheelEvent) this.el.removeEventListener('mousewheel', this._onMouseWheel);

    if(support.hasTouch) {
        this.el.removeEventListener('touchstart', this._onTouchStart);
        this.el.removeEventListener('touchmove', this._onTouchMove);
    }

    if(support.hasPointer && support.hasTouchWin) {
        document.body.style.msTouchAction = this.bodyTouchAction;
        this.el.removeEventListener('MSPointerDown', this._onTouchStart, true);
        this.el.removeEventListener('MSPointerMove', this._onTouchMove, true);
    }

    if(support.hasKeyDown) document.removeEventListener('keydown', this._onKeyDown);
};

VirtualScroll.prototype.on = function(cb, ctx) {
  this._emitter.on(EVT_ID, cb, ctx);

  var events = this._emitter.e;
  if (events && events[EVT_ID] && events[EVT_ID].length === 1) this._bind();
};

VirtualScroll.prototype.off = function(cb, ctx) {
  this._emitter.off(EVT_ID, cb, ctx);

  var events = this._emitter.e;
  if (!events[EVT_ID] || events[EVT_ID].length <= 0) this._unbind();
};

VirtualScroll.prototype.reset = function() {
    var evt = this._event;
    evt.x = 0;
    evt.y = 0;
};

VirtualScroll.prototype.destroy = function() {
    this._emitter.off();
    this._unbind();
};

},{"./clone":20,"./support":22,"bindall-standalone":4,"lethargy":10,"object-assign":11,"tiny-emitter":19}],22:[function(require,module,exports){
'use strict';

module.exports = (function getSupport() {
    return {
        hasWheelEvent: 'onwheel' in document,
        hasMouseWheelEvent: 'onmousewheel' in document,
        hasTouch: 'ontouchstart' in document,
        hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
        hasPointer: !!window.navigator.msPointerEnabled,
        hasKeyDown: 'onkeydown' in document,
        isFirefox: navigator.userAgent.indexOf('Firefox') > -1
    };
})();

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvY29uZmlnLmpzIiwiYXNzZXRzL2pzL21haW4uanMiLCJhc3NldHMvanMvc2xpZGVyLmpzIiwibm9kZV9tb2R1bGVzL2JpbmRhbGwtc3RhbmRhbG9uZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kYXNoaWZ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2RvbS1jbGFzc2VzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2RvbS1ldmVudHMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZG9tLXNlbGVjdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9pbmRleG9mL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xldGhhcmd5L2xldGhhcmd5LmpzIiwibm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvcHJlZml4L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3NsaWRlci1tYW5hZ2VyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3NsaWRlci1tYW5hZ2VyL25vZGVfbW9kdWxlcy9kb20tZXZlbnQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvc25pZmZlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zeW50aGV0aWMtZG9tLWV2ZW50cy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zeW50aGV0aWMtZG9tLWV2ZW50cy9pbml0Lmpzb24iLCJub2RlX21vZHVsZXMvc3ludGhldGljLWRvbS1ldmVudHMvdHlwZXMuanNvbiIsIm5vZGVfbW9kdWxlcy90aW55LWVtaXR0ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvdmlydHVhbC1zY3JvbGwvc3JjL2Nsb25lLmpzIiwibm9kZV9tb2R1bGVzL3ZpcnR1YWwtc2Nyb2xsL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy92aXJ0dWFsLXNjcm9sbC9zcmMvc3VwcG9ydC5qcyJdLCJuYW1lcyI6W10sIm1h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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3JFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQixPO0FBRWpCLHVCQUFzQjtBQUFBLFlBQVYsR0FBVSx1RUFBSixFQUFJOztBQUFBOztBQUVsQixZQUFHLENBQUMsSUFBSSxRQUFSLEVBQ0ksUUFBUSxLQUFSLENBQWMsd0RBQWQ7O0FBRUos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QUFMLENBQWEsUUFBYixDQUFzQixLQUF0QjtBQUNIOzs7Ozs7a0JBcEhnQixPOzs7QUNKckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgZG9tc2VsZWN0IGZyb20gJ2RvbS1zZWxlY3QnXG5pbXBvcnQgY2xhc3NlcyBmcm9tICdkb20tY2xhc3NlcydcbmltcG9ydCBwcmVmaXggZnJvbSAncHJlZml4J1xuaW1wb3J0IHNuaWZmZXIgZnJvbSAnc25pZmZlcidcblxuY29uc3QgY29uZmlnID0ge1xuXG5cdCRodG1sOiBkb21zZWxlY3QoJ2h0bWwnKSxcblx0JGJvZHk6IGRvY3VtZW50LmJvZHksXG5cdFxuXHR3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG5cdGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuXHRcblx0XG5cdGlzTW9iaWxlOiBzbmlmZmVyLmlzUGhvbmUsXG5cdFxuXHRwcmVmaXg6IHByZWZpeCgndHJhbnNmb3JtJyksXG5cdHRyYW5zaXRpb246IHByZWZpeCgndHJhbnNpdGlvbicpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZyIsImltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgc2xpZGVyIGZyb20gJy4vc2xpZGVyJ1xuaW1wb3J0IGV2ZW50IGZyb20gJ2RvbS1ldmVudHMnXG5pbXBvcnQgY2xhc3NlcyBmcm9tICdkb20tY2xhc3NlcydcbmltcG9ydCBzbmlmZmVyIGZyb20gJ3NuaWZmZXInXG5cbnNuaWZmZXIuYWRkQ2xhc3Nlcyhkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpXG5cbmNvbmZpZy5pc01vYmlsZSAmJiBldmVudC5vbihjb25maWcuJGJvZHksICd0b3VjaG1vdmUnLCAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKVxuXG5zbGlkZXIuaW5pdCgpIiwiaW1wb3J0IE1hbmFnZXIgZnJvbSAnc2xpZGVyLW1hbmFnZXInXG5cbmNvbnN0IHNsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pc19zbGlkZScpXG5cbmNvbnN0IHNsaWRlciA9IG5ldyBNYW5hZ2VyKHtcbiAgbGVuZ3RoOiBzbGlkZXMubGVuZ3RoIC0gMSxcbiAgbG9vcDogdHJ1ZSxcbiAgZGlyZWN0aW9uOiAneScsXG4gIGxpbWl0SW5lcnRpYTogdHJ1ZSxcbiAgY2FsbGJhY2s6IChlKSA9PiB7XG5cbiAgICBjb25zb2xlLmxvZyhlKVxuICAgIHNsaWRlci5hbmltYXRpbmcgPSB0cnVlXG5cbiAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcblxuICAgICAgc2xpZGUuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsICgpID0+IHtcbiAgICAgICAgc2xpZGVyLmFuaW1hdGluZyA9IGZhbHNlXG4gICAgICB9KVxuXG4gICAgICBzbGlkZS5zdHlsZS50cmFuc2Zvcm0gPSBpID09PSBlLmN1cnJlbnQgPyAnbm9uZScgOiBpID4gZS5jdXJyZW50ID8gJ3RyYW5zbGF0ZVkoMTAwJSknIDogJ3RyYW5zbGF0ZVkoLTEwMCUpJ1xuICAgIH0pXG4gIH1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IHNsaWRlciIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyxcbiAgICBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgaWYoIW9iamVjdCkgcmV0dXJuIGNvbnNvbGUud2FybignYmluZEFsbCByZXF1aXJlcyBhdCBsZWFzdCBvbmUgYXJndW1lbnQuJyk7XG5cbiAgICB2YXIgZnVuY3Rpb25zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICAgIGlmIChmdW5jdGlvbnMubGVuZ3RoID09PSAwKSB7XG5cbiAgICAgICAgZm9yICh2YXIgbWV0aG9kIGluIG9iamVjdCkge1xuICAgICAgICAgICAgaWYoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIG1ldGhvZCkpIHtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2Ygb2JqZWN0W21ldGhvZF0gPT0gJ2Z1bmN0aW9uJyAmJiB0b1N0cmluZy5jYWxsKG9iamVjdFttZXRob2RdKSA9PSBcIltvYmplY3QgRnVuY3Rpb25dXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb25zLnB1c2gobWV0aG9kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgZnVuY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBmID0gZnVuY3Rpb25zW2ldO1xuICAgICAgICBvYmplY3RbZl0gPSBiaW5kKG9iamVjdFtmXSwgb2JqZWN0KTtcbiAgICB9XG59O1xuXG4vKlxuICAgIEZhc3RlciBiaW5kIHdpdGhvdXQgc3BlY2lmaWMtY2FzZSBjaGVja2luZy4gKHNlZSBodHRwczovL2NvZGVyd2FsbC5jb20vcC9vaTNqM3cpLlxuICAgIGJpbmRBbGwgaXMgb25seSBuZWVkZWQgZm9yIGV2ZW50cyBiaW5kaW5nIHNvIG5vIG5lZWQgdG8gbWFrZSBzbG93IGZpeGVzIGZvciBjb25zdHJ1Y3RvclxuICAgIG9yIHBhcnRpYWwgYXBwbGljYXRpb24uXG4qL1xuZnVuY3Rpb24gYmluZChmdW5jLCBjb250ZXh0KSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuYy5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xuICB9O1xufSIsIi8qIVxuICogZGFzaGlmeSA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvZGFzaGlmeT5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgSm9uIFNjaGxpbmtlcnQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRhc2hpZnkoc3RyKSB7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4cGVjdGVkIGEgc3RyaW5nJyk7XG4gIH1cbiAgc3RyID0gc3RyLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpO1xuICBzdHIgPSBzdHIucmVwbGFjZSgvWyBcXHRcXFddL2csICctJyk7XG4gIHN0ciA9IHN0ci5yZXBsYWNlKC9eLSt8LSskL2csICcnKTtcbiAgcmV0dXJuIHN0ci50b0xvd2VyQ2FzZSgpO1xufTtcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgaW5kZXggPSByZXF1aXJlKCdpbmRleG9mJyk7XG5cbi8qKlxuICogV2hpdGVzcGFjZSByZWdleHAuXG4gKi9cblxudmFyIHdoaXRlc3BhY2VSZSA9IC9cXHMrLztcblxuLyoqXG4gKiB0b1N0cmluZyByZWZlcmVuY2UuXG4gKi9cblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzc2VzO1xubW9kdWxlLmV4cG9ydHMuYWRkID0gYWRkO1xubW9kdWxlLmV4cG9ydHMuY29udGFpbnMgPSBoYXM7XG5tb2R1bGUuZXhwb3J0cy5oYXMgPSBoYXM7XG5tb2R1bGUuZXhwb3J0cy50b2dnbGUgPSB0b2dnbGU7XG5tb2R1bGUuZXhwb3J0cy5yZW1vdmUgPSByZW1vdmU7XG5tb2R1bGUuZXhwb3J0cy5yZW1vdmVNYXRjaGluZyA9IHJlbW92ZU1hdGNoaW5nO1xuXG5mdW5jdGlvbiBjbGFzc2VzIChlbCkge1xuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTGlzdDtcbiAgfVxuXG4gIHZhciBzdHIgPSBlbC5jbGFzc05hbWUucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICB2YXIgYXJyID0gc3RyLnNwbGl0KHdoaXRlc3BhY2VSZSk7XG4gIGlmICgnJyA9PT0gYXJyWzBdKSBhcnIuc2hpZnQoKTtcbiAgcmV0dXJuIGFycjtcbn1cblxuZnVuY3Rpb24gYWRkIChlbCwgbmFtZSkge1xuICAvLyBjbGFzc0xpc3RcbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gZmFsbGJhY2tcbiAgdmFyIGFyciA9IGNsYXNzZXMoZWwpO1xuICB2YXIgaSA9IGluZGV4KGFyciwgbmFtZSk7XG4gIGlmICghfmkpIGFyci5wdXNoKG5hbWUpO1xuICBlbC5jbGFzc05hbWUgPSBhcnIuam9pbignICcpO1xufVxuXG5mdW5jdGlvbiBoYXMgKGVsLCBuYW1lKSB7XG4gIHJldHVybiBlbC5jbGFzc0xpc3RcbiAgICA/IGVsLmNsYXNzTGlzdC5jb250YWlucyhuYW1lKVxuICAgIDogISEgfmluZGV4KGNsYXNzZXMoZWwpLCBuYW1lKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlIChlbCwgbmFtZSkge1xuICBpZiAoJ1tvYmplY3QgUmVnRXhwXScgPT0gdG9TdHJpbmcuY2FsbChuYW1lKSkge1xuICAgIHJldHVybiByZW1vdmVNYXRjaGluZyhlbCwgbmFtZSk7XG4gIH1cblxuICAvLyBjbGFzc0xpc3RcbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gZmFsbGJhY2tcbiAgdmFyIGFyciA9IGNsYXNzZXMoZWwpO1xuICB2YXIgaSA9IGluZGV4KGFyciwgbmFtZSk7XG4gIGlmICh+aSkgYXJyLnNwbGljZShpLCAxKTtcbiAgZWwuY2xhc3NOYW1lID0gYXJyLmpvaW4oJyAnKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTWF0Y2hpbmcgKGVsLCByZSwgcmVmKSB7XG4gIHZhciBhcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChjbGFzc2VzKGVsKSk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHJlLnRlc3QoYXJyW2ldKSkge1xuICAgICAgcmVtb3ZlKGVsLCBhcnJbaV0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB0b2dnbGUgKGVsLCBuYW1lKSB7XG4gIC8vIGNsYXNzTGlzdFxuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTGlzdC50b2dnbGUobmFtZSk7XG4gIH1cblxuICAvLyBmYWxsYmFja1xuICBpZiAoaGFzKGVsLCBuYW1lKSkge1xuICAgIHJlbW92ZShlbCwgbmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgYWRkKGVsLCBuYW1lKTtcbiAgfVxufVxuIiwiXG52YXIgc3ludGggPSByZXF1aXJlKCdzeW50aGV0aWMtZG9tLWV2ZW50cycpO1xuXG52YXIgb24gPSBmdW5jdGlvbihlbGVtZW50LCBuYW1lLCBmbiwgY2FwdHVyZSkge1xuICAgIHJldHVybiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZm4sIGNhcHR1cmUgfHwgZmFsc2UpO1xufTtcblxudmFyIG9mZiA9IGZ1bmN0aW9uKGVsZW1lbnQsIG5hbWUsIGZuLCBjYXB0dXJlKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBmbiwgY2FwdHVyZSB8fCBmYWxzZSk7XG59O1xuXG52YXIgb25jZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBuYW1lLCBmbiwgY2FwdHVyZSkge1xuICAgIGZ1bmN0aW9uIHRtcCAoZXYpIHtcbiAgICAgICAgb2ZmKGVsZW1lbnQsIG5hbWUsIHRtcCwgY2FwdHVyZSk7XG4gICAgICAgIGZuKGV2KTtcbiAgICB9XG4gICAgb24oZWxlbWVudCwgbmFtZSwgdG1wLCBjYXB0dXJlKTtcbn07XG5cbnZhciBlbWl0ID0gZnVuY3Rpb24oZWxlbWVudCwgbmFtZSwgb3B0KSB7XG4gICAgdmFyIGV2ID0gc3ludGgobmFtZSwgb3B0KTtcbiAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXYpO1xufTtcblxuaWYgKCFkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgb24gPSBmdW5jdGlvbihlbGVtZW50LCBuYW1lLCBmbikge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5hdHRhY2hFdmVudCgnb24nICsgbmFtZSwgZm4pO1xuICAgIH07XG59XG5cbmlmICghZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIG9mZiA9IGZ1bmN0aW9uKGVsZW1lbnQsIG5hbWUsIGZuKSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LmRldGFjaEV2ZW50KCdvbicgKyBuYW1lLCBmbik7XG4gICAgfTtcbn1cblxuaWYgKCFkb2N1bWVudC5kaXNwYXRjaEV2ZW50KSB7XG4gICAgZW1pdCA9IGZ1bmN0aW9uKGVsZW1lbnQsIG5hbWUsIG9wdCkge1xuICAgICAgICB2YXIgZXYgPSBzeW50aChuYW1lLCBvcHQpO1xuICAgICAgICByZXR1cm4gZWxlbWVudC5maXJlRXZlbnQoJ29uJyArIGV2LnR5cGUsIGV2KTtcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBvbjogb24sXG4gICAgb2ZmOiBvZmYsXG4gICAgb25jZTogb25jZSxcbiAgICBlbWl0OiBlbWl0XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBvbmU7XG5tb2R1bGUuZXhwb3J0cy5hbGwgPSBhbGw7XG5cbmZ1bmN0aW9uIG9uZSAoc2VsZWN0b3IsIHBhcmVudCkge1xuICBwYXJlbnQgfHwgKHBhcmVudCA9IGRvY3VtZW50KTtcbiAgcmV0dXJuIHBhcmVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbn1cblxuZnVuY3Rpb24gYWxsIChzZWxlY3RvciwgcGFyZW50KSB7XG4gIHBhcmVudCB8fCAocGFyZW50ID0gZG9jdW1lbnQpO1xuICB2YXIgc2VsZWN0aW9uID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICByZXR1cm4gIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHNlbGVjdGlvbik7XG59XG4iLCJcbnZhciBpbmRleE9mID0gW10uaW5kZXhPZjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcnIsIG9iail7XG4gIGlmIChpbmRleE9mKSByZXR1cm4gYXJyLmluZGV4T2Yob2JqKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoYXJyW2ldID09PSBvYmopIHJldHVybiBpO1xuICB9XG4gIHJldHVybiAtMTtcbn07IiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjkuMlxuKGZ1bmN0aW9uKCkge1xuICB2YXIgcm9vdDtcblxuICByb290ID0gdHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIgJiYgZXhwb3J0cyAhPT0gbnVsbCA/IGV4cG9ydHMgOiB0aGlzO1xuXG4gIHJvb3QuTGV0aGFyZ3kgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gTGV0aGFyZ3koc3RhYmlsaXR5LCBzZW5zaXRpdml0eSwgdG9sZXJhbmNlLCBkZWxheSkge1xuICAgICAgdGhpcy5zdGFiaWxpdHkgPSBzdGFiaWxpdHkgIT0gbnVsbCA/IE1hdGguYWJzKHN0YWJpbGl0eSkgOiA4O1xuICAgICAgdGhpcy5zZW5zaXRpdml0eSA9IHNlbnNpdGl2aXR5ICE9IG51bGwgPyAxICsgTWF0aC5hYnMoc2Vuc2l0aXZpdHkpIDogMTAwO1xuICAgICAgdGhpcy50b2xlcmFuY2UgPSB0b2xlcmFuY2UgIT0gbnVsbCA/IDEgKyBNYXRoLmFicyh0b2xlcmFuY2UpIDogMS4xO1xuICAgICAgdGhpcy5kZWxheSA9IGRlbGF5ICE9IG51bGwgPyBkZWxheSA6IDE1MDtcbiAgICAgIHRoaXMubGFzdFVwRGVsdGFzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaSwgcmVmLCByZXN1bHRzO1xuICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoaSA9IDEsIHJlZiA9IHRoaXMuc3RhYmlsaXR5ICogMjsgMSA8PSByZWYgPyBpIDw9IHJlZiA6IGkgPj0gcmVmOyAxIDw9IHJlZiA/IGkrKyA6IGktLSkge1xuICAgICAgICAgIHJlc3VsdHMucHVzaChudWxsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgIH0pLmNhbGwodGhpcyk7XG4gICAgICB0aGlzLmxhc3REb3duRGVsdGFzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaSwgcmVmLCByZXN1bHRzO1xuICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoaSA9IDEsIHJlZiA9IHRoaXMuc3RhYmlsaXR5ICogMjsgMSA8PSByZWYgPyBpIDw9IHJlZiA6IGkgPj0gcmVmOyAxIDw9IHJlZiA/IGkrKyA6IGktLSkge1xuICAgICAgICAgIHJlc3VsdHMucHVzaChudWxsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgIH0pLmNhbGwodGhpcyk7XG4gICAgICB0aGlzLmRlbHRhc1RpbWVzdGFtcCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGksIHJlZiwgcmVzdWx0cztcbiAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKGkgPSAxLCByZWYgPSB0aGlzLnN0YWJpbGl0eSAqIDI7IDEgPD0gcmVmID8gaSA8PSByZWYgOiBpID49IHJlZjsgMSA8PSByZWYgPyBpKysgOiBpLS0pIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2gobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICB9KS5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIExldGhhcmd5LnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBsYXN0RGVsdGE7XG4gICAgICBlID0gZS5vcmlnaW5hbEV2ZW50IHx8IGU7XG4gICAgICBpZiAoZS53aGVlbERlbHRhICE9IG51bGwpIHtcbiAgICAgICAgbGFzdERlbHRhID0gZS53aGVlbERlbHRhO1xuICAgICAgfSBlbHNlIGlmIChlLmRlbHRhWSAhPSBudWxsKSB7XG4gICAgICAgIGxhc3REZWx0YSA9IGUuZGVsdGFZICogLTQwO1xuICAgICAgfSBlbHNlIGlmICgoZS5kZXRhaWwgIT0gbnVsbCkgfHwgZS5kZXRhaWwgPT09IDApIHtcbiAgICAgICAgbGFzdERlbHRhID0gZS5kZXRhaWwgKiAtNDA7XG4gICAgICB9XG4gICAgICB0aGlzLmRlbHRhc1RpbWVzdGFtcC5wdXNoKERhdGUubm93KCkpO1xuICAgICAgdGhpcy5kZWx0YXNUaW1lc3RhbXAuc2hpZnQoKTtcbiAgICAgIGlmIChsYXN0RGVsdGEgPiAwKSB7XG4gICAgICAgIHRoaXMubGFzdFVwRGVsdGFzLnB1c2gobGFzdERlbHRhKTtcbiAgICAgICAgdGhpcy5sYXN0VXBEZWx0YXMuc2hpZnQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNJbmVydGlhKDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sYXN0RG93bkRlbHRhcy5wdXNoKGxhc3REZWx0YSk7XG4gICAgICAgIHRoaXMubGFzdERvd25EZWx0YXMuc2hpZnQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNJbmVydGlhKC0xKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgTGV0aGFyZ3kucHJvdG90eXBlLmlzSW5lcnRpYSA9IGZ1bmN0aW9uKGRpcmVjdGlvbikge1xuICAgICAgdmFyIGxhc3REZWx0YXMsIGxhc3REZWx0YXNOZXcsIGxhc3REZWx0YXNPbGQsIG5ld0F2ZXJhZ2UsIG5ld1N1bSwgb2xkQXZlcmFnZSwgb2xkU3VtO1xuICAgICAgbGFzdERlbHRhcyA9IGRpcmVjdGlvbiA9PT0gLTEgPyB0aGlzLmxhc3REb3duRGVsdGFzIDogdGhpcy5sYXN0VXBEZWx0YXM7XG4gICAgICBpZiAobGFzdERlbHRhc1swXSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZGlyZWN0aW9uO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZGVsdGFzVGltZXN0YW1wWyh0aGlzLnN0YWJpbGl0eSAqIDIpIC0gMl0gKyB0aGlzLmRlbGF5ID4gRGF0ZS5ub3coKSAmJiBsYXN0RGVsdGFzWzBdID09PSBsYXN0RGVsdGFzWyh0aGlzLnN0YWJpbGl0eSAqIDIpIC0gMV0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgbGFzdERlbHRhc09sZCA9IGxhc3REZWx0YXMuc2xpY2UoMCwgdGhpcy5zdGFiaWxpdHkpO1xuICAgICAgbGFzdERlbHRhc05ldyA9IGxhc3REZWx0YXMuc2xpY2UodGhpcy5zdGFiaWxpdHksIHRoaXMuc3RhYmlsaXR5ICogMik7XG4gICAgICBvbGRTdW0gPSBsYXN0RGVsdGFzT2xkLnJlZHVjZShmdW5jdGlvbih0LCBzKSB7XG4gICAgICAgIHJldHVybiB0ICsgcztcbiAgICAgIH0pO1xuICAgICAgbmV3U3VtID0gbGFzdERlbHRhc05ldy5yZWR1Y2UoZnVuY3Rpb24odCwgcykge1xuICAgICAgICByZXR1cm4gdCArIHM7XG4gICAgICB9KTtcbiAgICAgIG9sZEF2ZXJhZ2UgPSBvbGRTdW0gLyBsYXN0RGVsdGFzT2xkLmxlbmd0aDtcbiAgICAgIG5ld0F2ZXJhZ2UgPSBuZXdTdW0gLyBsYXN0RGVsdGFzTmV3Lmxlbmd0aDtcbiAgICAgIGlmIChNYXRoLmFicyhvbGRBdmVyYWdlKSA8IE1hdGguYWJzKG5ld0F2ZXJhZ2UgKiB0aGlzLnRvbGVyYW5jZSkgJiYgKHRoaXMuc2Vuc2l0aXZpdHkgPCBNYXRoLmFicyhuZXdBdmVyYWdlKSkpIHtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgTGV0aGFyZ3kucHJvdG90eXBlLnNob3dMYXN0VXBEZWx0YXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmxhc3RVcERlbHRhcztcbiAgICB9O1xuXG4gICAgTGV0aGFyZ3kucHJvdG90eXBlLnNob3dMYXN0RG93bkRlbHRhcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubGFzdERvd25EZWx0YXM7XG4gICAgfTtcblxuICAgIHJldHVybiBMZXRoYXJneTtcblxuICB9KSgpO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIi8vIGNoZWNrIGRvY3VtZW50IGZpcnN0IHNvIGl0IGRvZXNuJ3QgZXJyb3IgaW4gbm9kZS5qc1xudmFyIHN0eWxlID0gdHlwZW9mIGRvY3VtZW50ICE9ICd1bmRlZmluZWQnXG4gID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpLnN0eWxlXG4gIDoge31cblxudmFyIHByZWZpeGVzID0gWydPJywgJ21zJywgJ01veicsICdXZWJraXQnXVxudmFyIHVwcGVyID0gLyhbQS1aXSkvZ1xudmFyIG1lbW8gPSB7fVxuXG4vKipcbiAqIHByZWZpeCBga2V5YFxuICpcbiAqICAgcHJlZml4KCd0cmFuc2Zvcm0nKSAvLyA9PiBXZWJraXRUcmFuc2Zvcm1cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBwcmVmaXgoa2V5KXtcbiAgLy8gQ2FtZWwgY2FzZVxuICBrZXkgPSBrZXkucmVwbGFjZSgvLShbYS16XSkvZywgZnVuY3Rpb24oXywgY2hhcil7XG4gICAgcmV0dXJuIGNoYXIudG9VcHBlckNhc2UoKVxuICB9KVxuXG4gIC8vIFdpdGhvdXQgcHJlZml4XG4gIGlmIChzdHlsZVtrZXldICE9PSB1bmRlZmluZWQpIHJldHVybiBrZXlcblxuICAvLyBXaXRoIHByZWZpeFxuICB2YXIgS2V5ID0ga2V5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsga2V5LnNsaWNlKDEpXG4gIHZhciBpID0gcHJlZml4ZXMubGVuZ3RoXG4gIHdoaWxlIChpLS0pIHtcbiAgICB2YXIgbmFtZSA9IHByZWZpeGVzW2ldICsgS2V5XG4gICAgaWYgKHN0eWxlW25hbWVdICE9PSB1bmRlZmluZWQpIHJldHVybiBuYW1lXG4gIH1cblxuICByZXR1cm4ga2V5XG59XG5cbi8qKlxuICogTWVtb2l6ZWQgdmVyc2lvbiBvZiBgcHJlZml4YFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIHByZWZpeE1lbW96aWVkKGtleSl7XG4gIHJldHVybiBrZXkgaW4gbWVtb1xuICAgID8gbWVtb1trZXldXG4gICAgOiBtZW1vW2tleV0gPSBwcmVmaXgoa2V5KVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRhc2hlZCBwcmVmaXhcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBwcmVmaXhEYXNoZWQoa2V5KXtcbiAga2V5ID0gcHJlZml4KGtleSlcbiAgaWYgKHVwcGVyLnRlc3Qoa2V5KSkge1xuICAgIGtleSA9ICctJyArIGtleS5yZXBsYWNlKHVwcGVyLCAnLSQxJylcbiAgICB1cHBlci5sYXN0SW5kZXggPSAwXG4gIH1cbiAgcmV0dXJuIGtleS50b0xvd2VyQ2FzZSgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJlZml4TWVtb3ppZWRcbm1vZHVsZS5leHBvcnRzLmRhc2ggPSBwcmVmaXhEYXNoZWRcbiIsImltcG9ydCB2cyBmcm9tICd2aXJ0dWFsLXNjcm9sbCdcbmltcG9ydCBzbmlmZmVyIGZyb20gJ3NuaWZmZXInXG5pbXBvcnQgeyBvbiwgb2ZmIH0gZnJvbSAnZG9tLWV2ZW50J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYW5hZ2VyIHtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihvcHQgPSB7fSkge1xuXG4gICAgICAgIGlmKCFvcHQuY2FsbGJhY2spXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdZb3UgbmVlZCB0byBwcm92aWRlIGEgY2FsbGJhY2sgZnVuY3Rpb24gaW4gdGhlIG9wdGlvbnMnKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbCA9IG9wdC5lbCB8fCBkb2N1bWVudC5ib2R5XG4gICAgICAgIHRoaXMuYW5pbWF0aW5nID0gZmFsc2VcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaW5kZXggPSAwXG4gICAgICAgIHRoaXMubGVuZ3RoID0gb3B0Lmxlbmd0aFxuXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGRpcmVjdGlvbjogb3B0LmRpcmVjdGlvbiB8fCAneScsXG4gICAgICAgICAgICBsb29wOiBvcHQubG9vcCB8fCBmYWxzZSxcbiAgICAgICAgICAgIGRlbHRhOiBvcHQuZGVsdGEgfHwgMSxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBvcHQuY2FsbGJhY2ssXG4gICAgICAgICAgICBsaW1pdEluZXJ0aWE6IG9wdC5saW1pdEluZXJ0aWEgfHwgZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudnMgPSBudWxsXG4gICAgICAgIFxuICAgICAgICB0aGlzLm9uU2Nyb2xsID0gdGhpcy5vblNjcm9sbC5iaW5kKHRoaXMpXG4gICAgICAgIHRoaXMub25LZXlEb3duID0gdGhpcy5vbktleURvd24uYmluZCh0aGlzKVxuICAgIH1cbiAgICBcbiAgICBpbml0KCkge1xuICAgICAgICBcbiAgICAgICAgdGhpcy52cyA9IG5ldyB2cyh7IGxpbWl0SW5lcnRpYTogdGhpcy5vcHRpb25zLmxpbWl0SW5lcnRpYSB9KVxuICAgICAgICB0aGlzLnZzLm9uKHRoaXMub25TY3JvbGwpXG4gICAgICAgIFxuICAgICAgICBpZihzbmlmZmVyLmlzRGVza3RvcCkge1xuICAgICAgICAgICAgb24oZG9jdW1lbnQsICdrZXlkb3duJywgdGhpcy5vbktleURvd24pXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudnMub2ZmKHRoaXMub25TY3JvbGwpXG4gICAgICAgIHRoaXMudnMuZGVzdHJveSgpXG4gICAgICAgIHRoaXMudnMgPSBudWxsXG4gICAgICAgIFxuICAgICAgICBpZihzbmlmZmVyLmlzRGVza3RvcCkge1xuICAgICAgICAgICAgb2ZmKGRvY3VtZW50LCAna2V5ZG93bicsIHRoaXMub25LZXlEb3duKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGdldE5leHQoZGVsdGEpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5leHQgPSBkZWx0YSA+PSB0aGlzLm9wdGlvbnMuZGVsdGEgPyB0aGlzLmluZGV4ICsgMSA6IHRoaXMuaW5kZXggLSAxIFxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tMb29wKG5leHQpXG4gICAgfVxuICAgIFxuICAgIGNoZWNrTG9vcChuZXh0KSB7XG5cbiAgICAgICAgcmV0dXJuIG5leHQgPCAwID8gdGhpcy5vcHRpb25zLmxvb3AgPyB0aGlzLmxlbmd0aCA6IDAgOiBuZXh0ID4gdGhpcy5sZW5ndGggPyB0aGlzLm9wdGlvbnMubG9vcCA/IDAgOiB0aGlzLmxlbmd0aCA6IG5leHRcbiAgICB9XG4gICAgXG4gICAgZ2V0RXZlbnQoaW5kZXgpIHtcblxuICAgICAgICBjb25zdCBwcmV2ID0gdGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PSAneScgPyAndXAnIDogJ2xlZnQnXG4gICAgICAgIGNvbnN0IG5leHQgPSB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09ICd5JyA/ICdkb3duJyA6ICdyaWdodCdcbiAgICAgICAgXG4gICAgICAgIGxldCBkaXJlY3Rpb24gPSBpbmRleCA+IHRoaXMuaW5kZXggPyBuZXh0IDogcHJldlxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmxvb3ApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmluZGV4ID09IDAgJiYgaW5kZXggPT0gdGhpcy5sZW5ndGgpIGRpcmVjdGlvbiA9IHByZXZcbiAgICAgICAgICAgIGlmICh0aGlzLmluZGV4ID09IHRoaXMubGVuZ3RoICYmIGluZGV4ID09IDApIGRpcmVjdGlvbiA9IG5leHRcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGN1cnJlbnQ6IGluZGV4LFxuICAgICAgICAgICAgcHJldmlvdXM6IHRoaXMuaW5kZXgsXG4gICAgICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvblxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uU2Nyb2xsKGV2ZW50KSB7XG4gICAgICBcbiAgICAgICAgY29uc3QgeyBkZWx0YVgsIGRlbHRhWSB9ID0gZXZlbnRcbiAgICAgICAgY29uc3Qgbm9ybSA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT0gJ3knID8gZGVsdGFZIC0gKGRlbHRhWSAqIDIpIDogZGVsdGFYIC0gKGRlbHRhWCAqIDIpXG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLmFuaW1hdGluZyB8fCBub3JtID4gLXRoaXMub3B0aW9ucy5kZWx0YSAmJiBub3JtIDwgdGhpcy5vcHRpb25zLmRlbHRhKSByZXR1cm5cbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSB0cnVlXG4gICAgICAgIFxuICAgICAgICB0aGlzLmNhbGxiYWNrKG5vcm0pXG4gICAgfVxuICAgIFxuICAgIG9uS2V5RG93bihlKSB7XG5cbiAgICAgICAgY29uc3QgcHJldiA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT0gJ3knID8gJzM4JyA6ICczNydcbiAgICAgICAgY29uc3QgbmV4dCA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT0gJ3knID8gJzQwJyA6ICczOSdcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuYW5pbWF0aW5nIHx8IGUua2V5Q29kZSAhPSBwcmV2ICYmIGUua2V5Q29kZSAhPSBuZXh0KSByZXR1cm5cbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSB0cnVlXG4gICAgICAgIFxuICAgICAgICB0aGlzLmNhbGxiYWNrKGUua2V5Q29kZSA9PSBuZXh0ID8gdGhpcy5vcHRpb25zLmRlbHRhKzEgOiAtKHRoaXMub3B0aW9ucy5kZWx0YSsxKSlcbiAgICB9XG4gICAgXG4gICAgZ29UbyhpbmRleCkge1xuXG4gICAgICAgIGNvbnN0IGNoZWNrID0gdGhpcy5jaGVja0xvb3AoaW5kZXgpXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5nZXRFdmVudChjaGVjaylcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaW5kZXggPSBjaGVja1xuICAgICAgICB0aGlzLm9wdGlvbnMuY2FsbGJhY2soZXZlbnQpXG4gICAgfVxuXG4gICAgY2FsbGJhY2soZGVsdGEpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXROZXh0KGRlbHRhKVxuICAgICAgICBjb25zdCBldmVudCA9IHRoaXMuZ2V0RXZlbnQoaW5kZXgpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXhcbiAgICAgICAgdGhpcy5vcHRpb25zLmNhbGxiYWNrKGV2ZW50KVxuICAgIH1cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IG9uO1xubW9kdWxlLmV4cG9ydHMub24gPSBvbjtcbm1vZHVsZS5leHBvcnRzLm9mZiA9IG9mZjtcblxuZnVuY3Rpb24gb24gKGVsZW1lbnQsIGV2ZW50LCBjYWxsYmFjaywgY2FwdHVyZSkge1xuICAhZWxlbWVudC5hZGRFdmVudExpc3RlbmVyICYmIChldmVudCA9ICdvbicgKyBldmVudCk7XG4gIChlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgfHwgZWxlbWVudC5hdHRhY2hFdmVudCkuY2FsbChlbGVtZW50LCBldmVudCwgY2FsbGJhY2ssIGNhcHR1cmUpO1xuICByZXR1cm4gY2FsbGJhY2s7XG59XG5cbmZ1bmN0aW9uIG9mZiAoZWxlbWVudCwgZXZlbnQsIGNhbGxiYWNrLCBjYXB0dXJlKSB7XG4gICFlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIgJiYgKGV2ZW50ID0gJ29uJyArIGV2ZW50KTtcbiAgKGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciB8fCBlbGVtZW50LmRldGFjaEV2ZW50KS5jYWxsKGVsZW1lbnQsIGV2ZW50LCBjYWxsYmFjaywgY2FwdHVyZSk7XG4gIHJldHVybiBjYWxsYmFjaztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRhc2hpZnkgPSByZXF1aXJlKCdkYXNoaWZ5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNuaWZmZXIoKTtcblxuZnVuY3Rpb24gU25pZmZlcigpIHtcbiAgICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIGF2ID0gbmF2aWdhdG9yLmFwcFZlcnNpb24udG9Mb3dlckNhc2UoKTtcblxuICAgIHZhciBpc1dpbmRvd3NQaG9uZSA9IC93aW5kb3dzIHBob25lfGllbW9iaWxlfHdwZGVza3RvcC8udGVzdCh1YSk7XG5cbiAgICB2YXIgaXNEcm9pZFBob25lID0gIWlzV2luZG93c1Bob25lICYmIC9hbmRyb2lkLiptb2JpbGUvLnRlc3QodWEpO1xuICAgIHZhciBpc0Ryb2lkVGFibGV0ID0gIWlzV2luZG93c1Bob25lICYmICFpc0Ryb2lkUGhvbmUgJiYgKC9hbmRyb2lkL2kpLnRlc3QodWEpO1xuICAgIHZhciBpc0Ryb2lkID0gaXNEcm9pZFBob25lIHx8IGlzRHJvaWRUYWJsZXQ7XG5cbiAgICB2YXIgaXNJb3MgPSAhaXNXaW5kb3dzUGhvbmUgJiYgKC9pcChob25lfG9kfGFkKS9pKS50ZXN0KHVhKSAmJiAhd2luZG93Lk1TU3RyZWFtO1xuICAgIHZhciBpc0lwYWQgPSAhaXNXaW5kb3dzUGhvbmUgJiYgKC9pcGFkL2kpLnRlc3QodWEpICYmIGlzSW9zO1xuXG4gICAgdmFyIGlzVGFibGV0ID0gaXNEcm9pZFRhYmxldCB8fCBpc0lwYWQ7XG4gICAgdmFyIGlzUGhvbmUgPSBpc0Ryb2lkUGhvbmUgfHwgKGlzSW9zICYmICFpc0lwYWQpIHx8IGlzV2luZG93c1Bob25lO1xuICAgIHZhciBpc0RldmljZSA9IGlzUGhvbmUgfHwgaXNUYWJsZXQ7XG5cbiAgICB2YXIgaXNGaXJlZm94ID0gdWEuaW5kZXhPZignZmlyZWZveCcpID4gLTE7XG4gICAgdmFyIGlzU2FmYXJpID0gISF1YS5tYXRjaCgvdmVyc2lvblxcL1tcXGRcXC5dKy4qc2FmYXJpLyk7XG4gICAgdmFyIGlzT3BlcmEgPSB1YS5pbmRleE9mKCdvcHInKSA+IC0xO1xuICAgIHZhciBpc0lFMTEgPSAhKHdpbmRvdy5BY3RpdmVYT2JqZWN0KSAmJiBcIkFjdGl2ZVhPYmplY3RcIiBpbiB3aW5kb3c7XG4gICAgdmFyIGlzSUUgPSBhdi5pbmRleE9mKCdtc2llJykgPiAtMSB8fCBpc0lFMTEgfHwgYXYuaW5kZXhPZignZWRnZScpID4gLTE7XG4gICAgdmFyIGlzRWRnZSA9IHVhLmluZGV4T2YoJ2VkZ2UnKSA+IC0xO1xuICAgIHZhciBpc0Nocm9tZSA9IHdpbmRvdy5jaHJvbWUgIT09IG51bGwgJiYgd2luZG93LmNocm9tZSAhPT0gdW5kZWZpbmVkICYmIG5hdmlnYXRvci52ZW5kb3IudG9Mb3dlckNhc2UoKSA9PSAnZ29vZ2xlIGluYy4nICYmICFpc09wZXJhICYmICFpc0VkZ2U7XG5cbiAgICB0aGlzLmluZm9zID0ge1xuICAgICAgICBpc0Ryb2lkOiBpc0Ryb2lkLFxuICAgICAgICBpc0Ryb2lkUGhvbmU6IGlzRHJvaWRQaG9uZSxcbiAgICAgICAgaXNEcm9pZFRhYmxldDogaXNEcm9pZFRhYmxldCxcbiAgICAgICAgaXNXaW5kb3dzUGhvbmU6IGlzV2luZG93c1Bob25lLFxuICAgICAgICBpc0lvczogaXNJb3MsXG4gICAgICAgIGlzSXBhZDogaXNJcGFkLFxuICAgICAgICBpc0RldmljZTogaXNEZXZpY2UsXG4gICAgICAgIGlzRWRnZTogaXNFZGdlLFxuICAgICAgICBpc0lFOiBpc0lFLFxuICAgICAgICBpc0lFMTE6IGlzSUUxMSxcbiAgICAgICAgaXNQaG9uZTogaXNQaG9uZSxcbiAgICAgICAgaXNUYWJsZXQ6IGlzVGFibGV0LFxuICAgICAgICBpc0ZpcmVmb3g6IGlzRmlyZWZveCxcbiAgICAgICAgaXNTYWZhcmk6IGlzU2FmYXJpLFxuICAgICAgICBpc09wZXJhOiBpc09wZXJhLFxuICAgICAgICBpc0Nocm9tZTogaXNDaHJvbWUsXG4gICAgICAgIGlzRGVza3RvcDogIWlzUGhvbmUgJiYgIWlzVGFibGV0XG4gICAgfTtcblxuICAgIE9iamVjdC5rZXlzKHRoaXMuaW5mb3MpLmZvckVhY2goZnVuY3Rpb24oaW5mbykge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgaW5mbywge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5mb3NbaW5mb107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcblxuICAgIC8vIFRPRE86IGFkZCBnZXRWZXJzaW9uKCkgdG8gZ2V0IElFL1NhZmFyaS8uLi4gdmVyc2lvblxufVxuXG5TbmlmZmVyLnByb3RvdHlwZS5hZGRDbGFzc2VzID0gZnVuY3Rpb24oZWwpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmluZm9zKS5mb3JFYWNoKGZ1bmN0aW9uKGluZm8pIHtcbiAgICAgICAgaWYgKHRoaXMuaW5mb3NbaW5mb10pIGFkZENsYXNzKGVsLCBkYXNoaWZ5KGluZm8pKTtcbiAgICB9LCB0aGlzKTtcbn07XG5cblNuaWZmZXIucHJvdG90eXBlLmdldEluZm9zID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNsb25lKHRoaXMuaW5mb3MpO1xufTtcblxuZnVuY3Rpb24gYWRkQ2xhc3MoZWwsIGNsYXNzTmFtZSkge1xuICAgIGlmIChlbC5hZGRDbGFzcykgZWwuYWRkQ2xhc3MoY2xhc3NOYW1lKTtcbiAgICBlbHNlIGlmIChlbC5jbGFzc0xpc3QpIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICBlbHNlIGVsLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XG59XG5cbmZ1bmN0aW9uIGNsb25lKHNvdXJjZSkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNvdXJjZSkpO1xufSIsIlxuLy8gZm9yIGNvbXByZXNzaW9uXG52YXIgd2luID0gd2luZG93O1xudmFyIGRvYyA9IGRvY3VtZW50IHx8IHt9O1xudmFyIHJvb3QgPSBkb2MuZG9jdW1lbnRFbGVtZW50IHx8IHt9O1xuXG4vLyBkZXRlY3QgaWYgd2UgbmVlZCB0byB1c2UgZmlyZWZveCBLZXlFdmVudHMgdnMgS2V5Ym9hcmRFdmVudHNcbnZhciB1c2Vfa2V5X2V2ZW50ID0gdHJ1ZTtcbnRyeSB7XG4gICAgZG9jLmNyZWF0ZUV2ZW50KCdLZXlFdmVudHMnKTtcbn1cbmNhdGNoIChlcnIpIHtcbiAgICB1c2Vfa2V5X2V2ZW50ID0gZmFsc2U7XG59XG5cbi8vIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNjczNVxuZnVuY3Rpb24gY2hlY2tfa2IoZXYsIG9wdHMpIHtcbiAgICBpZiAoZXYuY3RybEtleSAhPSAob3B0cy5jdHJsS2V5IHx8IGZhbHNlKSB8fFxuICAgICAgICBldi5hbHRLZXkgIT0gKG9wdHMuYWx0S2V5IHx8IGZhbHNlKSB8fFxuICAgICAgICBldi5zaGlmdEtleSAhPSAob3B0cy5zaGlmdEtleSB8fCBmYWxzZSkgfHxcbiAgICAgICAgZXYubWV0YUtleSAhPSAob3B0cy5tZXRhS2V5IHx8IGZhbHNlKSB8fFxuICAgICAgICBldi5rZXlDb2RlICE9IChvcHRzLmtleUNvZGUgfHwgMCkgfHxcbiAgICAgICAgZXYuY2hhckNvZGUgIT0gKG9wdHMuY2hhckNvZGUgfHwgMCkpIHtcblxuICAgICAgICBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgICBldi5pbml0RXZlbnQob3B0cy50eXBlLCBvcHRzLmJ1YmJsZXMsIG9wdHMuY2FuY2VsYWJsZSk7XG4gICAgICAgIGV2LmN0cmxLZXkgID0gb3B0cy5jdHJsS2V5IHx8IGZhbHNlO1xuICAgICAgICBldi5hbHRLZXkgICA9IG9wdHMuYWx0S2V5IHx8IGZhbHNlO1xuICAgICAgICBldi5zaGlmdEtleSA9IG9wdHMuc2hpZnRLZXkgfHwgZmFsc2U7XG4gICAgICAgIGV2Lm1ldGFLZXkgID0gb3B0cy5tZXRhS2V5IHx8IGZhbHNlO1xuICAgICAgICBldi5rZXlDb2RlICA9IG9wdHMua2V5Q29kZSB8fCAwO1xuICAgICAgICBldi5jaGFyQ29kZSA9IG9wdHMuY2hhckNvZGUgfHwgMDtcbiAgICB9XG5cbiAgICByZXR1cm4gZXY7XG59XG5cbi8vIG1vZGVybiBicm93c2VycywgZG8gYSBwcm9wZXIgZGlzcGF0Y2hFdmVudCgpXG52YXIgbW9kZXJuID0gZnVuY3Rpb24odHlwZSwgb3B0cykge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gICAgLy8gd2hpY2ggaW5pdCBmbiBkbyB3ZSB1c2VcbiAgICB2YXIgZmFtaWx5ID0gdHlwZU9mKHR5cGUpO1xuICAgIHZhciBpbml0X2ZhbSA9IGZhbWlseTtcbiAgICBpZiAoZmFtaWx5ID09PSAnS2V5Ym9hcmRFdmVudCcgJiYgdXNlX2tleV9ldmVudCkge1xuICAgICAgICBmYW1pbHkgPSAnS2V5RXZlbnRzJztcbiAgICAgICAgaW5pdF9mYW0gPSAnS2V5RXZlbnQnO1xuICAgIH1cblxuICAgIHZhciBldiA9IGRvYy5jcmVhdGVFdmVudChmYW1pbHkpO1xuICAgIHZhciBpbml0X2ZuID0gJ2luaXQnICsgaW5pdF9mYW07XG4gICAgdmFyIGluaXQgPSB0eXBlb2YgZXZbaW5pdF9mbl0gPT09ICdmdW5jdGlvbicgPyBpbml0X2ZuIDogJ2luaXRFdmVudCc7XG5cbiAgICB2YXIgc2lnID0gaW5pdFNpZ25hdHVyZXNbaW5pdF07XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIgdXNlZCA9IHt9O1xuXG4gICAgb3B0cy50eXBlID0gdHlwZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gc2lnW2ldO1xuICAgICAgICB2YXIgdmFsID0gb3B0c1trZXldO1xuICAgICAgICAvLyBpZiBubyB1c2VyIHNwZWNpZmllZCB2YWx1ZSwgdGhlbiB1c2UgZXZlbnQgZGVmYXVsdFxuICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhbCA9IGV2W2tleV07XG4gICAgICAgIH1cbiAgICAgICAgdXNlZFtrZXldID0gdHJ1ZTtcbiAgICAgICAgYXJncy5wdXNoKHZhbCk7XG4gICAgfVxuICAgIGV2W2luaXRdLmFwcGx5KGV2LCBhcmdzKTtcblxuICAgIC8vIHdlYmtpdCBrZXkgZXZlbnQgaXNzdWUgd29ya2Fyb3VuZFxuICAgIGlmIChmYW1pbHkgPT09ICdLZXlib2FyZEV2ZW50Jykge1xuICAgICAgICBldiA9IGNoZWNrX2tiKGV2LCBvcHRzKTtcbiAgICB9XG5cbiAgICAvLyBhdHRhY2ggcmVtYWluaW5nIHVudXNlZCBvcHRpb25zIHRvIHRoZSBvYmplY3RcbiAgICBmb3IgKHZhciBrZXkgaW4gb3B0cykge1xuICAgICAgICBpZiAoIXVzZWRba2V5XSkge1xuICAgICAgICAgICAgZXZba2V5XSA9IG9wdHNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBldjtcbn07XG5cbnZhciBsZWdhY3kgPSBmdW5jdGlvbiAodHlwZSwgb3B0cykge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIHZhciBldiA9IGRvYy5jcmVhdGVFdmVudE9iamVjdCgpO1xuXG4gICAgZXYudHlwZSA9IHR5cGU7XG4gICAgZm9yICh2YXIga2V5IGluIG9wdHMpIHtcbiAgICAgICAgaWYgKG9wdHNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBldltrZXldID0gb3B0c1trZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGV2O1xufTtcblxuLy8gZXhwb3NlIGVpdGhlciB0aGUgbW9kZXJuIHZlcnNpb24gb2YgZXZlbnQgZ2VuZXJhdGlvbiBvciBsZWdhY3lcbi8vIGRlcGVuZGluZyBvbiB3aGF0IHdlIHN1cHBvcnRcbi8vIGF2b2lkcyBpZiBzdGF0ZW1lbnRzIGluIHRoZSBjb2RlIGxhdGVyXG5tb2R1bGUuZXhwb3J0cyA9IGRvYy5jcmVhdGVFdmVudCA/IG1vZGVybiA6IGxlZ2FjeTtcblxudmFyIGluaXRTaWduYXR1cmVzID0gcmVxdWlyZSgnLi9pbml0Lmpzb24nKTtcbnZhciB0eXBlcyA9IHJlcXVpcmUoJy4vdHlwZXMuanNvbicpO1xudmFyIHR5cGVPZiA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHR5cHMgPSB7fTtcbiAgICBmb3IgKHZhciBrZXkgaW4gdHlwZXMpIHtcbiAgICAgICAgdmFyIHRzID0gdHlwZXNba2V5XTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdHlwc1t0c1tpXV0gPSBrZXk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cHNbbmFtZV0gfHwgJ0V2ZW50JztcbiAgICB9O1xufSkoKTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJpbml0RXZlbnRcIiA6IFtcbiAgICBcInR5cGVcIixcbiAgICBcImJ1YmJsZXNcIixcbiAgICBcImNhbmNlbGFibGVcIlxuICBdLFxuICBcImluaXRVSUV2ZW50XCIgOiBbXG4gICAgXCJ0eXBlXCIsXG4gICAgXCJidWJibGVzXCIsXG4gICAgXCJjYW5jZWxhYmxlXCIsXG4gICAgXCJ2aWV3XCIsXG4gICAgXCJkZXRhaWxcIlxuICBdLFxuICBcImluaXRNb3VzZUV2ZW50XCIgOiBbXG4gICAgXCJ0eXBlXCIsXG4gICAgXCJidWJibGVzXCIsXG4gICAgXCJjYW5jZWxhYmxlXCIsXG4gICAgXCJ2aWV3XCIsXG4gICAgXCJkZXRhaWxcIixcbiAgICBcInNjcmVlblhcIixcbiAgICBcInNjcmVlbllcIixcbiAgICBcImNsaWVudFhcIixcbiAgICBcImNsaWVudFlcIixcbiAgICBcImN0cmxLZXlcIixcbiAgICBcImFsdEtleVwiLFxuICAgIFwic2hpZnRLZXlcIixcbiAgICBcIm1ldGFLZXlcIixcbiAgICBcImJ1dHRvblwiLFxuICAgIFwicmVsYXRlZFRhcmdldFwiXG4gIF0sXG4gIFwiaW5pdE11dGF0aW9uRXZlbnRcIiA6IFtcbiAgICBcInR5cGVcIixcbiAgICBcImJ1YmJsZXNcIixcbiAgICBcImNhbmNlbGFibGVcIixcbiAgICBcInJlbGF0ZWROb2RlXCIsXG4gICAgXCJwcmV2VmFsdWVcIixcbiAgICBcIm5ld1ZhbHVlXCIsXG4gICAgXCJhdHRyTmFtZVwiLFxuICAgIFwiYXR0ckNoYW5nZVwiXG4gIF0sXG4gIFwiaW5pdEtleWJvYXJkRXZlbnRcIiA6IFtcbiAgICBcInR5cGVcIixcbiAgICBcImJ1YmJsZXNcIixcbiAgICBcImNhbmNlbGFibGVcIixcbiAgICBcInZpZXdcIixcbiAgICBcImN0cmxLZXlcIixcbiAgICBcImFsdEtleVwiLFxuICAgIFwic2hpZnRLZXlcIixcbiAgICBcIm1ldGFLZXlcIixcbiAgICBcImtleUNvZGVcIixcbiAgICBcImNoYXJDb2RlXCJcbiAgXSxcbiAgXCJpbml0S2V5RXZlbnRcIiA6IFtcbiAgICBcInR5cGVcIixcbiAgICBcImJ1YmJsZXNcIixcbiAgICBcImNhbmNlbGFibGVcIixcbiAgICBcInZpZXdcIixcbiAgICBcImN0cmxLZXlcIixcbiAgICBcImFsdEtleVwiLFxuICAgIFwic2hpZnRLZXlcIixcbiAgICBcIm1ldGFLZXlcIixcbiAgICBcImtleUNvZGVcIixcbiAgICBcImNoYXJDb2RlXCJcbiAgXVxufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIk1vdXNlRXZlbnRcIiA6IFtcbiAgICBcImNsaWNrXCIsXG4gICAgXCJtb3VzZWRvd25cIixcbiAgICBcIm1vdXNldXBcIixcbiAgICBcIm1vdXNlb3ZlclwiLFxuICAgIFwibW91c2Vtb3ZlXCIsXG4gICAgXCJtb3VzZW91dFwiXG4gIF0sXG4gIFwiS2V5Ym9hcmRFdmVudFwiIDogW1xuICAgIFwia2V5ZG93blwiLFxuICAgIFwia2V5dXBcIixcbiAgICBcImtleXByZXNzXCJcbiAgXSxcbiAgXCJNdXRhdGlvbkV2ZW50XCIgOiBbXG4gICAgXCJET01TdWJ0cmVlTW9kaWZpZWRcIixcbiAgICBcIkRPTU5vZGVJbnNlcnRlZFwiLFxuICAgIFwiRE9NTm9kZVJlbW92ZWRcIixcbiAgICBcIkRPTU5vZGVSZW1vdmVkRnJvbURvY3VtZW50XCIsXG4gICAgXCJET01Ob2RlSW5zZXJ0ZWRJbnRvRG9jdW1lbnRcIixcbiAgICBcIkRPTUF0dHJNb2RpZmllZFwiLFxuICAgIFwiRE9NQ2hhcmFjdGVyRGF0YU1vZGlmaWVkXCJcbiAgXSxcbiAgXCJIVE1MRXZlbnRzXCIgOiBbXG4gICAgXCJsb2FkXCIsXG4gICAgXCJ1bmxvYWRcIixcbiAgICBcImFib3J0XCIsXG4gICAgXCJlcnJvclwiLFxuICAgIFwic2VsZWN0XCIsXG4gICAgXCJjaGFuZ2VcIixcbiAgICBcInN1Ym1pdFwiLFxuICAgIFwicmVzZXRcIixcbiAgICBcImZvY3VzXCIsXG4gICAgXCJibHVyXCIsXG4gICAgXCJyZXNpemVcIixcbiAgICBcInNjcm9sbFwiXG4gIF0sXG4gIFwiVUlFdmVudFwiIDogW1xuICAgIFwiRE9NRm9jdXNJblwiLFxuICAgIFwiRE9NRm9jdXNPdXRcIixcbiAgICBcIkRPTUFjdGl2YXRlXCJcbiAgXVxufVxuIiwiZnVuY3Rpb24gRSAoKSB7XG4gIC8vIEtlZXAgdGhpcyBlbXB0eSBzbyBpdCdzIGVhc2llciB0byBpbmhlcml0IGZyb21cbiAgLy8gKHZpYSBodHRwczovL2dpdGh1Yi5jb20vbGlwc21hY2sgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc2NvdHRjb3JnYW4vdGlueS1lbWl0dGVyL2lzc3Vlcy8zKVxufVxuXG5FLnByb3RvdHlwZSA9IHtcbiAgb246IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgdmFyIGUgPSB0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KTtcblxuICAgIChlW25hbWVdIHx8IChlW25hbWVdID0gW10pKS5wdXNoKHtcbiAgICAgIGZuOiBjYWxsYmFjayxcbiAgICAgIGN0eDogY3R4XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvbmNlOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2ssIGN0eCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBmdW5jdGlvbiBsaXN0ZW5lciAoKSB7XG4gICAgICBzZWxmLm9mZihuYW1lLCBsaXN0ZW5lcik7XG4gICAgICBjYWxsYmFjay5hcHBseShjdHgsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIGxpc3RlbmVyLl8gPSBjYWxsYmFja1xuICAgIHJldHVybiB0aGlzLm9uKG5hbWUsIGxpc3RlbmVyLCBjdHgpO1xuICB9LFxuXG4gIGVtaXQ6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIGRhdGEgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIGV2dEFyciA9ICgodGhpcy5lIHx8ICh0aGlzLmUgPSB7fSkpW25hbWVdIHx8IFtdKS5zbGljZSgpO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgbGVuID0gZXZ0QXJyLmxlbmd0aDtcblxuICAgIGZvciAoaTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBldnRBcnJbaV0uZm4uYXBwbHkoZXZ0QXJyW2ldLmN0eCwgZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgb2ZmOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgZSA9IHRoaXMuZSB8fCAodGhpcy5lID0ge30pO1xuICAgIHZhciBldnRzID0gZVtuYW1lXTtcbiAgICB2YXIgbGl2ZUV2ZW50cyA9IFtdO1xuXG4gICAgaWYgKGV2dHMgJiYgY2FsbGJhY2spIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBldnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChldnRzW2ldLmZuICE9PSBjYWxsYmFjayAmJiBldnRzW2ldLmZuLl8gIT09IGNhbGxiYWNrKVxuICAgICAgICAgIGxpdmVFdmVudHMucHVzaChldnRzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgZXZlbnQgZnJvbSBxdWV1ZSB0byBwcmV2ZW50IG1lbW9yeSBsZWFrXG4gICAgLy8gU3VnZ2VzdGVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9sYXpkXG4gICAgLy8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vc2NvdHRjb3JnYW4vdGlueS1lbWl0dGVyL2NvbW1pdC9jNmViZmFhOWJjOTczYjMzZDExMGE4NGEzMDc3NDJiN2NmOTRjOTUzI2NvbW1pdGNvbW1lbnQtNTAyNDkxMFxuXG4gICAgKGxpdmVFdmVudHMubGVuZ3RoKVxuICAgICAgPyBlW25hbWVdID0gbGl2ZUV2ZW50c1xuICAgICAgOiBkZWxldGUgZVtuYW1lXTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEU7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc291cmNlKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc291cmNlKSk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIG9iamVjdEFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgndGlueS1lbWl0dGVyJyk7XG52YXIgTGV0aGFyZ3kgPSByZXF1aXJlKCdsZXRoYXJneScpLkxldGhhcmd5O1xudmFyIHN1cHBvcnQgPSByZXF1aXJlKCcuL3N1cHBvcnQnKTtcbnZhciBjbG9uZSA9IHJlcXVpcmUoJy4vY2xvbmUnKTtcbnZhciBiaW5kQWxsID0gcmVxdWlyZSgnYmluZGFsbC1zdGFuZGFsb25lJyk7XG52YXIgRVZUX0lEID0gJ3ZpcnR1YWxzY3JvbGwnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZpcnR1YWxTY3JvbGw7XG5cbnZhciBrZXlDb2RlcyA9IHtcbiAgICBMRUZUOiAzNyxcbiAgICBVUDogMzgsXG4gICAgUklHSFQ6IDM5LFxuICAgIERPV046IDQwLFxuICAgIFNQQUNFOiAzMlxufTtcblxuZnVuY3Rpb24gVmlydHVhbFNjcm9sbChvcHRpb25zKSB7XG4gICAgYmluZEFsbCh0aGlzLCAnX29uV2hlZWwnLCAnX29uTW91c2VXaGVlbCcsICdfb25Ub3VjaFN0YXJ0JywgJ19vblRvdWNoTW92ZScsICdfb25LZXlEb3duJyk7XG5cbiAgICB0aGlzLmVsID0gd2luZG93O1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZWwpIHtcbiAgICAgICAgdGhpcy5lbCA9IG9wdGlvbnMuZWw7XG4gICAgICAgIGRlbGV0ZSBvcHRpb25zLmVsO1xuICAgIH1cbiAgICB0aGlzLm9wdGlvbnMgPSBvYmplY3RBc3NpZ24oe1xuICAgICAgICBtb3VzZU11bHRpcGxpZXI6IDEsXG4gICAgICAgIHRvdWNoTXVsdGlwbGllcjogMixcbiAgICAgICAgZmlyZWZveE11bHRpcGxpZXI6IDE1LFxuICAgICAgICBrZXlTdGVwOiAxMjAsXG4gICAgICAgIHByZXZlbnRUb3VjaDogZmFsc2UsXG4gICAgICAgIHVucHJldmVudFRvdWNoQ2xhc3M6ICd2cy10b3VjaG1vdmUtYWxsb3dlZCcsXG4gICAgICAgIGxpbWl0SW5lcnRpYTogZmFsc2VcbiAgICB9LCBvcHRpb25zKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMubGltaXRJbmVydGlhKSB0aGlzLl9sZXRoYXJneSA9IG5ldyBMZXRoYXJneSgpO1xuXG4gICAgdGhpcy5fZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG4gICAgdGhpcy5fZXZlbnQgPSB7XG4gICAgICAgIHk6IDAsXG4gICAgICAgIHg6IDAsXG4gICAgICAgIGRlbHRhWDogMCxcbiAgICAgICAgZGVsdGFZOiAwXG4gICAgfTtcbiAgICB0aGlzLnRvdWNoU3RhcnRYID0gbnVsbDtcbiAgICB0aGlzLnRvdWNoU3RhcnRZID0gbnVsbDtcbiAgICB0aGlzLmJvZHlUb3VjaEFjdGlvbiA9IG51bGw7XG59XG5cblZpcnR1YWxTY3JvbGwucHJvdG90eXBlLl9ub3RpZnkgPSBmdW5jdGlvbihlKSB7XG4gICAgdmFyIGV2dCA9IHRoaXMuX2V2ZW50O1xuICAgIGV2dC54ICs9IGV2dC5kZWx0YVg7XG4gICAgZXZ0LnkgKz0gZXZ0LmRlbHRhWTtcblxuICAgdGhpcy5fZW1pdHRlci5lbWl0KEVWVF9JRCwge1xuICAgICAgICB4OiBldnQueCxcbiAgICAgICAgeTogZXZ0LnksXG4gICAgICAgIGRlbHRhWDogZXZ0LmRlbHRhWCxcbiAgICAgICAgZGVsdGFZOiBldnQuZGVsdGFZLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBlXG4gICB9KTtcbn07XG5cblZpcnR1YWxTY3JvbGwucHJvdG90eXBlLl9vbldoZWVsID0gZnVuY3Rpb24oZSkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIGlmICh0aGlzLl9sZXRoYXJneSAmJiB0aGlzLl9sZXRoYXJneS5jaGVjayhlKSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICB2YXIgZXZ0ID0gdGhpcy5fZXZlbnQ7XG5cbiAgICAvLyBJbiBDaHJvbWUgYW5kIGluIEZpcmVmb3ggKGF0IGxlYXN0IHRoZSBuZXcgb25lKVxuICAgIGV2dC5kZWx0YVggPSBlLndoZWVsRGVsdGFYIHx8IGUuZGVsdGFYICogLTE7XG4gICAgZXZ0LmRlbHRhWSA9IGUud2hlZWxEZWx0YVkgfHwgZS5kZWx0YVkgKiAtMTtcblxuICAgIC8vIGZvciBvdXIgcHVycG9zZSBkZWx0YW1vZGUgPSAxIG1lYW5zIHVzZXIgaXMgb24gYSB3aGVlbCBtb3VzZSwgbm90IHRvdWNoIHBhZFxuICAgIC8vIHJlYWwgbWVhbmluZzogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1doZWVsRXZlbnQjRGVsdGFfbW9kZXNcbiAgICBpZihzdXBwb3J0LmlzRmlyZWZveCAmJiBlLmRlbHRhTW9kZSA9PSAxKSB7XG4gICAgICAgIGV2dC5kZWx0YVggKj0gb3B0aW9ucy5maXJlZm94TXVsdGlwbGllcjtcbiAgICAgICAgZXZ0LmRlbHRhWSAqPSBvcHRpb25zLmZpcmVmb3hNdWx0aXBsaWVyO1xuICAgIH1cblxuICAgIGV2dC5kZWx0YVggKj0gb3B0aW9ucy5tb3VzZU11bHRpcGxpZXI7XG4gICAgZXZ0LmRlbHRhWSAqPSBvcHRpb25zLm1vdXNlTXVsdGlwbGllcjtcblxuICAgIHRoaXMuX25vdGlmeShlKTtcbn07XG5cblZpcnR1YWxTY3JvbGwucHJvdG90eXBlLl9vbk1vdXNlV2hlZWwgPSBmdW5jdGlvbihlKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5saW1pdEluZXJ0aWEgJiYgdGhpcy5fbGV0aGFyZ3kuY2hlY2soZSkgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICB2YXIgZXZ0ID0gdGhpcy5fZXZlbnQ7XG5cbiAgICAvLyBJbiBTYWZhcmksIElFIGFuZCBpbiBDaHJvbWUgaWYgJ3doZWVsJyBpc24ndCBkZWZpbmVkXG4gICAgZXZ0LmRlbHRhWCA9IChlLndoZWVsRGVsdGFYKSA/IGUud2hlZWxEZWx0YVggOiAwO1xuICAgIGV2dC5kZWx0YVkgPSAoZS53aGVlbERlbHRhWSkgPyBlLndoZWVsRGVsdGFZIDogZS53aGVlbERlbHRhO1xuXG4gICAgdGhpcy5fbm90aWZ5KGUpO1xufTtcblxuVmlydHVhbFNjcm9sbC5wcm90b3R5cGUuX29uVG91Y2hTdGFydCA9IGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgdCA9IChlLnRhcmdldFRvdWNoZXMpID8gZS50YXJnZXRUb3VjaGVzWzBdIDogZTtcbiAgICB0aGlzLnRvdWNoU3RhcnRYID0gdC5wYWdlWDtcbiAgICB0aGlzLnRvdWNoU3RhcnRZID0gdC5wYWdlWTtcbn07XG5cblZpcnR1YWxTY3JvbGwucHJvdG90eXBlLl9vblRvdWNoTW92ZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICBpZihvcHRpb25zLnByZXZlbnRUb3VjaFxuICAgICAgICAmJiAhZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKG9wdGlvbnMudW5wcmV2ZW50VG91Y2hDbGFzcykpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHZhciBldnQgPSB0aGlzLl9ldmVudDtcblxuICAgIHZhciB0ID0gKGUudGFyZ2V0VG91Y2hlcykgPyBlLnRhcmdldFRvdWNoZXNbMF0gOiBlO1xuXG4gICAgZXZ0LmRlbHRhWCA9ICh0LnBhZ2VYIC0gdGhpcy50b3VjaFN0YXJ0WCkgKiBvcHRpb25zLnRvdWNoTXVsdGlwbGllcjtcbiAgICBldnQuZGVsdGFZID0gKHQucGFnZVkgLSB0aGlzLnRvdWNoU3RhcnRZKSAqIG9wdGlvbnMudG91Y2hNdWx0aXBsaWVyO1xuXG4gICAgdGhpcy50b3VjaFN0YXJ0WCA9IHQucGFnZVg7XG4gICAgdGhpcy50b3VjaFN0YXJ0WSA9IHQucGFnZVk7XG5cbiAgICB0aGlzLl9ub3RpZnkoZSk7XG59O1xuXG5WaXJ0dWFsU2Nyb2xsLnByb3RvdHlwZS5fb25LZXlEb3duID0gZnVuY3Rpb24oZSkge1xuICAgIHZhciBldnQgPSB0aGlzLl9ldmVudDtcbiAgICBldnQuZGVsdGFYID0gZXZ0LmRlbHRhWSA9IDA7XG4gICAgdmFyIHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDQwXG5cbiAgICBzd2l0Y2goZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2Uga2V5Q29kZXMuTEVGVDpcbiAgICAgICAgY2FzZSBrZXlDb2Rlcy5VUDpcbiAgICAgICAgICAgIGV2dC5kZWx0YVkgPSB0aGlzLm9wdGlvbnMua2V5U3RlcDtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2Uga2V5Q29kZXMuUklHSFQ6XG4gICAgICAgIGNhc2Uga2V5Q29kZXMuRE9XTjpcbiAgICAgICAgICAgIGV2dC5kZWx0YVkgPSAtIHRoaXMub3B0aW9ucy5rZXlTdGVwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5Q29kZXMuU1BBQ0UgJiYgZS5zaGlmdEtleTpcbiAgICAgICAgICAgIGV2dC5kZWx0YVkgPSB3aW5kb3dIZWlnaHQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlDb2Rlcy5TUEFDRTpcbiAgICAgICAgICAgIGV2dC5kZWx0YVkgPSAtIHdpbmRvd0hlaWdodDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX25vdGlmeShlKTtcbn07XG5cblZpcnR1YWxTY3JvbGwucHJvdG90eXBlLl9iaW5kID0gZnVuY3Rpb24oKSB7XG4gICAgaWYoc3VwcG9ydC5oYXNXaGVlbEV2ZW50KSB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5fb25XaGVlbCk7XG4gICAgaWYoc3VwcG9ydC5oYXNNb3VzZVdoZWVsRXZlbnQpIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIHRoaXMuX29uTW91c2VXaGVlbCk7XG5cbiAgICBpZihzdXBwb3J0Lmhhc1RvdWNoKSB7XG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX29uVG91Y2hTdGFydCk7XG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUpO1xuICAgIH1cblxuICAgIGlmKHN1cHBvcnQuaGFzUG9pbnRlciAmJiBzdXBwb3J0Lmhhc1RvdWNoV2luKSB7XG4gICAgICAgIHRoaXMuYm9keVRvdWNoQWN0aW9uID0gZG9jdW1lbnQuYm9keS5zdHlsZS5tc1RvdWNoQWN0aW9uO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm1zVG91Y2hBY3Rpb24gPSAnbm9uZSc7XG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignTVNQb2ludGVyRG93bicsIHRoaXMuX29uVG91Y2hTdGFydCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignTVNQb2ludGVyTW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZihzdXBwb3J0Lmhhc0tleURvd24pIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleURvd24pO1xufTtcblxuVmlydHVhbFNjcm9sbC5wcm90b3R5cGUuX3VuYmluZCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmKHN1cHBvcnQuaGFzV2hlZWxFdmVudCkgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuX29uV2hlZWwpO1xuICAgIGlmKHN1cHBvcnQuaGFzTW91c2VXaGVlbEV2ZW50KSB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCB0aGlzLl9vbk1vdXNlV2hlZWwpO1xuXG4gICAgaWYoc3VwcG9ydC5oYXNUb3VjaCkge1xuICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9vblRvdWNoU3RhcnQpO1xuICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlKTtcbiAgICB9XG5cbiAgICBpZihzdXBwb3J0Lmhhc1BvaW50ZXIgJiYgc3VwcG9ydC5oYXNUb3VjaFdpbikge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm1zVG91Y2hBY3Rpb24gPSB0aGlzLmJvZHlUb3VjaEFjdGlvbjtcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdNU1BvaW50ZXJEb3duJywgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0cnVlKTtcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdNU1BvaW50ZXJNb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUsIHRydWUpO1xuICAgIH1cblxuICAgIGlmKHN1cHBvcnQuaGFzS2V5RG93bikgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5RG93bik7XG59O1xuXG5WaXJ0dWFsU2Nyb2xsLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKGNiLCBjdHgpIHtcbiAgdGhpcy5fZW1pdHRlci5vbihFVlRfSUQsIGNiLCBjdHgpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9lbWl0dGVyLmU7XG4gIGlmIChldmVudHMgJiYgZXZlbnRzW0VWVF9JRF0gJiYgZXZlbnRzW0VWVF9JRF0ubGVuZ3RoID09PSAxKSB0aGlzLl9iaW5kKCk7XG59O1xuXG5WaXJ0dWFsU2Nyb2xsLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbihjYiwgY3R4KSB7XG4gIHRoaXMuX2VtaXR0ZXIub2ZmKEVWVF9JRCwgY2IsIGN0eCk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2VtaXR0ZXIuZTtcbiAgaWYgKCFldmVudHNbRVZUX0lEXSB8fCBldmVudHNbRVZUX0lEXS5sZW5ndGggPD0gMCkgdGhpcy5fdW5iaW5kKCk7XG59O1xuXG5WaXJ0dWFsU2Nyb2xsLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBldnQgPSB0aGlzLl9ldmVudDtcbiAgICBldnQueCA9IDA7XG4gICAgZXZ0LnkgPSAwO1xufTtcblxuVmlydHVhbFNjcm9sbC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2VtaXR0ZXIub2ZmKCk7XG4gICAgdGhpcy5fdW5iaW5kKCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiBnZXRTdXBwb3J0KCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGhhc1doZWVsRXZlbnQ6ICdvbndoZWVsJyBpbiBkb2N1bWVudCxcbiAgICAgICAgaGFzTW91c2VXaGVlbEV2ZW50OiAnb25tb3VzZXdoZWVsJyBpbiBkb2N1bWVudCxcbiAgICAgICAgaGFzVG91Y2g6ICdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LFxuICAgICAgICBoYXNUb3VjaFdpbjogbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgJiYgbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgPiAxLFxuICAgICAgICBoYXNQb2ludGVyOiAhIXdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZCxcbiAgICAgICAgaGFzS2V5RG93bjogJ29ua2V5ZG93bicgaW4gZG9jdW1lbnQsXG4gICAgICAgIGlzRmlyZWZveDogbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdGaXJlZm94JykgPiAtMVxuICAgIH07XG59KSgpO1xuIl19
