exports.ids = [7];
exports.modules = {

/***/ 289:
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

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(65);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// CONCATENATED MODULE: ./node_modules/@tweenjs/tween.js/dist/tween.esm.js
/**
 * The Ease class provides a collection of easing functions for use with tween.js.
 */
var Easing = {
    Linear: {
        None: function (amount) {
            return amount;
        },
    },
    Quadratic: {
        In: function (amount) {
            return amount * amount;
        },
        Out: function (amount) {
            return amount * (2 - amount);
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount;
            }
            return -0.5 * (--amount * (amount - 2) - 1);
        },
    },
    Cubic: {
        In: function (amount) {
            return amount * amount * amount;
        },
        Out: function (amount) {
            return --amount * amount * amount + 1;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount;
            }
            return 0.5 * ((amount -= 2) * amount * amount + 2);
        },
    },
    Quartic: {
        In: function (amount) {
            return amount * amount * amount * amount;
        },
        Out: function (amount) {
            return 1 - --amount * amount * amount * amount;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount * amount;
            }
            return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
        },
    },
    Quintic: {
        In: function (amount) {
            return amount * amount * amount * amount * amount;
        },
        Out: function (amount) {
            return --amount * amount * amount * amount * amount + 1;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount * amount * amount;
            }
            return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
        },
    },
    Sinusoidal: {
        In: function (amount) {
            return 1 - Math.cos((amount * Math.PI) / 2);
        },
        Out: function (amount) {
            return Math.sin((amount * Math.PI) / 2);
        },
        InOut: function (amount) {
            return 0.5 * (1 - Math.cos(Math.PI * amount));
        },
    },
    Exponential: {
        In: function (amount) {
            return amount === 0 ? 0 : Math.pow(1024, amount - 1);
        },
        Out: function (amount) {
            return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
        },
        InOut: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            if ((amount *= 2) < 1) {
                return 0.5 * Math.pow(1024, amount - 1);
            }
            return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
        },
    },
    Circular: {
        In: function (amount) {
            return 1 - Math.sqrt(1 - amount * amount);
        },
        Out: function (amount) {
            return Math.sqrt(1 - --amount * amount);
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
            }
            return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
        },
    },
    Elastic: {
        In: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
        },
        Out: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
        },
        InOut: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            amount *= 2;
            if (amount < 1) {
                return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
            }
            return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
        },
    },
    Back: {
        In: function (amount) {
            var s = 1.70158;
            return amount * amount * ((s + 1) * amount - s);
        },
        Out: function (amount) {
            var s = 1.70158;
            return --amount * amount * ((s + 1) * amount + s) + 1;
        },
        InOut: function (amount) {
            var s = 1.70158 * 1.525;
            if ((amount *= 2) < 1) {
                return 0.5 * (amount * amount * ((s + 1) * amount - s));
            }
            return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
        },
    },
    Bounce: {
        In: function (amount) {
            return 1 - Easing.Bounce.Out(1 - amount);
        },
        Out: function (amount) {
            if (amount < 1 / 2.75) {
                return 7.5625 * amount * amount;
            }
            else if (amount < 2 / 2.75) {
                return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
            }
            else if (amount < 2.5 / 2.75) {
                return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
            }
            else {
                return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
            }
        },
        InOut: function (amount) {
            if (amount < 0.5) {
                return Easing.Bounce.In(amount * 2) * 0.5;
            }
            return Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
        },
    },
};

var now;
// Include a performance.now polyfill.
// In node.js, use process.hrtime.
// eslint-disable-next-line
// @ts-ignore
if (typeof self === 'undefined' && typeof process !== 'undefined' && process.hrtime) {
    now = function () {
        // eslint-disable-next-line
        // @ts-ignore
        var time = process.hrtime();
        // Convert [seconds, nanoseconds] to milliseconds.
        return time[0] * 1000 + time[1] / 1000000;
    };
}
// In a browser, use self.performance.now if it is available.
else if (typeof self !== 'undefined' && self.performance !== undefined && self.performance.now !== undefined) {
    // This must be bound, because directly assigning this function
    // leads to an invocation exception in Chrome.
    now = self.performance.now.bind(self.performance);
}
// Use Date.now if it is available.
else if (Date.now !== undefined) {
    now = Date.now;
}
// Otherwise, use 'new Date().getTime()'.
else {
    now = function () {
        return new Date().getTime();
    };
}
var now$1 = now;

/**
 * Controlling groups of tweens
 *
 * Using the TWEEN singleton to manage your tweens can cause issues in large apps with many components.
 * In these cases, you may want to create your own smaller groups of tween
 */
var Group = /** @class */ (function () {
    function Group() {
        this._tweens = {};
        this._tweensAddedDuringUpdate = {};
    }
    Group.prototype.getAll = function () {
        var _this = this;
        return Object.keys(this._tweens).map(function (tweenId) {
            return _this._tweens[tweenId];
        });
    };
    Group.prototype.removeAll = function () {
        this._tweens = {};
    };
    Group.prototype.add = function (tween) {
        this._tweens[tween.getId()] = tween;
        this._tweensAddedDuringUpdate[tween.getId()] = tween;
    };
    Group.prototype.remove = function (tween) {
        delete this._tweens[tween.getId()];
        delete this._tweensAddedDuringUpdate[tween.getId()];
    };
    Group.prototype.update = function (time, preserve) {
        if (time === void 0) { time = now$1(); }
        if (preserve === void 0) { preserve = false; }
        var tweenIds = Object.keys(this._tweens);
        if (tweenIds.length === 0) {
            return false;
        }
        // Tweens are updated in "batches". If you add a new tween during an
        // update, then the new tween will be updated in the next batch.
        // If you remove a tween during an update, it may or may not be updated.
        // However, if the removed tween was added during the current batch,
        // then it will not be updated.
        while (tweenIds.length > 0) {
            this._tweensAddedDuringUpdate = {};
            for (var i = 0; i < tweenIds.length; i++) {
                var tween = this._tweens[tweenIds[i]];
                var autoStart = !preserve;
                if (tween && tween.update(time, autoStart) === false && !preserve) {
                    delete this._tweens[tweenIds[i]];
                }
            }
            tweenIds = Object.keys(this._tweensAddedDuringUpdate);
        }
        return true;
    };
    return Group;
}());

/**
 *
 */
var Interpolation = {
    Linear: function (v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = Interpolation.Utils.Linear;
        if (k < 0) {
            return fn(v[0], v[1], f);
        }
        if (k > 1) {
            return fn(v[m], v[m - 1], m - f);
        }
        return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
    },
    Bezier: function (v, k) {
        var b = 0;
        var n = v.length - 1;
        var pw = Math.pow;
        var bn = Interpolation.Utils.Bernstein;
        for (var i = 0; i <= n; i++) {
            b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
        }
        return b;
    },
    CatmullRom: function (v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = Interpolation.Utils.CatmullRom;
        if (v[0] === v[m]) {
            if (k < 0) {
                i = Math.floor((f = m * (1 + k)));
            }
            return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
        }
        else {
            if (k < 0) {
                return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
            }
            if (k > 1) {
                return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
            }
            return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
        }
    },
    Utils: {
        Linear: function (p0, p1, t) {
            return (p1 - p0) * t + p0;
        },
        Bernstein: function (n, i) {
            var fc = Interpolation.Utils.Factorial;
            return fc(n) / fc(i) / fc(n - i);
        },
        Factorial: (function () {
            var a = [1];
            return function (n) {
                var s = 1;
                if (a[n]) {
                    return a[n];
                }
                for (var i = n; i > 1; i--) {
                    s *= i;
                }
                a[n] = s;
                return s;
            };
        })(),
        CatmullRom: function (p0, p1, p2, p3, t) {
            var v0 = (p2 - p0) * 0.5;
            var v1 = (p3 - p1) * 0.5;
            var t2 = t * t;
            var t3 = t * t2;
            return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
        },
    },
};

/**
 * Utils
 */
var Sequence = /** @class */ (function () {
    function Sequence() {
    }
    Sequence.nextId = function () {
        return Sequence._nextId++;
    };
    Sequence._nextId = 0;
    return Sequence;
}());

var mainGroup = new Group();

/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */
var Tween = /** @class */ (function () {
    function Tween(_object, _group) {
        if (_group === void 0) { _group = mainGroup; }
        this._object = _object;
        this._group = _group;
        this._isPaused = false;
        this._pauseStart = 0;
        this._valuesStart = {};
        this._valuesEnd = {};
        this._valuesStartRepeat = {};
        this._duration = 1000;
        this._initialRepeat = 0;
        this._repeat = 0;
        this._yoyo = false;
        this._isPlaying = false;
        this._reversed = false;
        this._delayTime = 0;
        this._startTime = 0;
        this._easingFunction = Easing.Linear.None;
        this._interpolationFunction = Interpolation.Linear;
        this._chainedTweens = [];
        this._onStartCallbackFired = false;
        this._id = Sequence.nextId();
        this._isChainStopped = false;
        this._goToEnd = false;
    }
    Tween.prototype.getId = function () {
        return this._id;
    };
    Tween.prototype.isPlaying = function () {
        return this._isPlaying;
    };
    Tween.prototype.isPaused = function () {
        return this._isPaused;
    };
    Tween.prototype.to = function (properties, duration) {
        // TODO? restore this, then update the 07_dynamic_to example to set fox
        // tween's to on each update. That way the behavior is opt-in (there's
        // currently no opt-out).
        // for (const prop in properties) this._valuesEnd[prop] = properties[prop]
        this._valuesEnd = Object.create(properties);
        if (duration !== undefined) {
            this._duration = duration;
        }
        return this;
    };
    Tween.prototype.duration = function (d) {
        this._duration = d;
        return this;
    };
    Tween.prototype.start = function (time) {
        if (this._isPlaying) {
            return this;
        }
        // eslint-disable-next-line
        this._group && this._group.add(this);
        this._repeat = this._initialRepeat;
        if (this._reversed) {
            // If we were reversed (f.e. using the yoyo feature) then we need to
            // flip the tween direction back to forward.
            this._reversed = false;
            for (var property in this._valuesStartRepeat) {
                this._swapEndStartRepeatValues(property);
                this._valuesStart[property] = this._valuesStartRepeat[property];
            }
        }
        this._isPlaying = true;
        this._isPaused = false;
        this._onStartCallbackFired = false;
        this._isChainStopped = false;
        this._startTime = time !== undefined ? (typeof time === 'string' ? now$1() + parseFloat(time) : time) : now$1();
        this._startTime += this._delayTime;
        this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat);
        return this;
    };
    Tween.prototype._setupProperties = function (_object, _valuesStart, _valuesEnd, _valuesStartRepeat) {
        for (var property in _valuesEnd) {
            var startValue = _object[property];
            var startValueIsArray = Array.isArray(startValue);
            var propType = startValueIsArray ? 'array' : typeof startValue;
            var isInterpolationList = !startValueIsArray && Array.isArray(_valuesEnd[property]);
            // If `to()` specifies a property that doesn't exist in the source object,
            // we should not set that property in the object
            if (propType === 'undefined' || propType === 'function') {
                continue;
            }
            // Check if an Array was provided as property value
            if (isInterpolationList) {
                var endValues = _valuesEnd[property];
                if (endValues.length === 0) {
                    continue;
                }
                // handle an array of relative values
                endValues = endValues.map(this._handleRelativeValue.bind(this, startValue));
                // Create a local copy of the Array with the start value at the front
                _valuesEnd[property] = [startValue].concat(endValues);
            }
            // handle the deepness of the values
            if ((propType === 'object' || startValueIsArray) && startValue && !isInterpolationList) {
                _valuesStart[property] = startValueIsArray ? [] : {};
                // eslint-disable-next-line
                for (var prop in startValue) {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _valuesStart[property][prop] = startValue[prop];
                }
                _valuesStartRepeat[property] = startValueIsArray ? [] : {}; // TODO? repeat nested values? And yoyo? And array values?
                // eslint-disable-next-line
                // @ts-ignore FIXME?
                this._setupProperties(startValue, _valuesStart[property], _valuesEnd[property], _valuesStartRepeat[property]);
            }
            else {
                // Save the starting value, but only once.
                if (typeof _valuesStart[property] === 'undefined') {
                    _valuesStart[property] = startValue;
                }
                if (!startValueIsArray) {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
                }
                if (isInterpolationList) {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _valuesStartRepeat[property] = _valuesEnd[property].slice().reverse();
                }
                else {
                    _valuesStartRepeat[property] = _valuesStart[property] || 0;
                }
            }
        }
    };
    Tween.prototype.stop = function () {
        if (!this._isChainStopped) {
            this._isChainStopped = true;
            this.stopChainedTweens();
        }
        if (!this._isPlaying) {
            return this;
        }
        // eslint-disable-next-line
        this._group && this._group.remove(this);
        this._isPlaying = false;
        this._isPaused = false;
        if (this._onStopCallback) {
            this._onStopCallback(this._object);
        }
        return this;
    };
    Tween.prototype.end = function () {
        this._goToEnd = true;
        this.update(Infinity);
        return this;
    };
    Tween.prototype.pause = function (time) {
        if (time === void 0) { time = now$1(); }
        if (this._isPaused || !this._isPlaying) {
            return this;
        }
        this._isPaused = true;
        this._pauseStart = time;
        // eslint-disable-next-line
        this._group && this._group.remove(this);
        return this;
    };
    Tween.prototype.resume = function (time) {
        if (time === void 0) { time = now$1(); }
        if (!this._isPaused || !this._isPlaying) {
            return this;
        }
        this._isPaused = false;
        this._startTime += time - this._pauseStart;
        this._pauseStart = 0;
        // eslint-disable-next-line
        this._group && this._group.add(this);
        return this;
    };
    Tween.prototype.stopChainedTweens = function () {
        for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
            this._chainedTweens[i].stop();
        }
        return this;
    };
    Tween.prototype.group = function (group) {
        this._group = group;
        return this;
    };
    Tween.prototype.delay = function (amount) {
        this._delayTime = amount;
        return this;
    };
    Tween.prototype.repeat = function (times) {
        this._initialRepeat = times;
        this._repeat = times;
        return this;
    };
    Tween.prototype.repeatDelay = function (amount) {
        this._repeatDelayTime = amount;
        return this;
    };
    Tween.prototype.yoyo = function (yoyo) {
        this._yoyo = yoyo;
        return this;
    };
    Tween.prototype.easing = function (easingFunction) {
        this._easingFunction = easingFunction;
        return this;
    };
    Tween.prototype.interpolation = function (interpolationFunction) {
        this._interpolationFunction = interpolationFunction;
        return this;
    };
    Tween.prototype.chain = function () {
        var tweens = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tweens[_i] = arguments[_i];
        }
        this._chainedTweens = tweens;
        return this;
    };
    Tween.prototype.onStart = function (callback) {
        this._onStartCallback = callback;
        return this;
    };
    Tween.prototype.onUpdate = function (callback) {
        this._onUpdateCallback = callback;
        return this;
    };
    Tween.prototype.onRepeat = function (callback) {
        this._onRepeatCallback = callback;
        return this;
    };
    Tween.prototype.onComplete = function (callback) {
        this._onCompleteCallback = callback;
        return this;
    };
    Tween.prototype.onStop = function (callback) {
        this._onStopCallback = callback;
        return this;
    };
    /**
     * @returns true if the tween is still playing after the update, false
     * otherwise (calling update on a paused tween still returns true because
     * it is still playing, just paused).
     */
    Tween.prototype.update = function (time, autoStart) {
        if (time === void 0) { time = now$1(); }
        if (autoStart === void 0) { autoStart = true; }
        if (this._isPaused)
            return true;
        var property;
        var elapsed;
        var endTime = this._startTime + this._duration;
        if (!this._goToEnd && !this._isPlaying) {
            if (time > endTime)
                return false;
            if (autoStart)
                this.start(time);
        }
        this._goToEnd = false;
        if (time < this._startTime) {
            return true;
        }
        if (this._onStartCallbackFired === false) {
            if (this._onStartCallback) {
                this._onStartCallback(this._object);
            }
            this._onStartCallbackFired = true;
        }
        elapsed = (time - this._startTime) / this._duration;
        elapsed = this._duration === 0 || elapsed > 1 ? 1 : elapsed;
        var value = this._easingFunction(elapsed);
        // properties transformations
        this._updateProperties(this._object, this._valuesStart, this._valuesEnd, value);
        if (this._onUpdateCallback) {
            this._onUpdateCallback(this._object, elapsed);
        }
        if (elapsed === 1) {
            if (this._repeat > 0) {
                if (isFinite(this._repeat)) {
                    this._repeat--;
                }
                // Reassign starting values, restart by making startTime = now
                for (property in this._valuesStartRepeat) {
                    if (!this._yoyo && typeof this._valuesEnd[property] === 'string') {
                        this._valuesStartRepeat[property] =
                            // eslint-disable-next-line
                            // @ts-ignore FIXME?
                            this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
                    }
                    if (this._yoyo) {
                        this._swapEndStartRepeatValues(property);
                    }
                    this._valuesStart[property] = this._valuesStartRepeat[property];
                }
                if (this._yoyo) {
                    this._reversed = !this._reversed;
                }
                if (this._repeatDelayTime !== undefined) {
                    this._startTime = time + this._repeatDelayTime;
                }
                else {
                    this._startTime = time + this._delayTime;
                }
                if (this._onRepeatCallback) {
                    this._onRepeatCallback(this._object);
                }
                return true;
            }
            else {
                if (this._onCompleteCallback) {
                    this._onCompleteCallback(this._object);
                }
                for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
                    // Make the chained tweens start exactly at the time they should,
                    // even if the `update()` method was called way past the duration of the tween
                    this._chainedTweens[i].start(this._startTime + this._duration);
                }
                this._isPlaying = false;
                return false;
            }
        }
        return true;
    };
    Tween.prototype._updateProperties = function (_object, _valuesStart, _valuesEnd, value) {
        for (var property in _valuesEnd) {
            // Don't update properties that do not exist in the source object
            if (_valuesStart[property] === undefined) {
                continue;
            }
            var start = _valuesStart[property] || 0;
            var end = _valuesEnd[property];
            var startIsArray = Array.isArray(_object[property]);
            var endIsArray = Array.isArray(end);
            var isInterpolationList = !startIsArray && endIsArray;
            if (isInterpolationList) {
                _object[property] = this._interpolationFunction(end, value);
            }
            else if (typeof end === 'object' && end) {
                // eslint-disable-next-line
                // @ts-ignore FIXME?
                this._updateProperties(_object[property], start, end, value);
            }
            else {
                // Parses relative end values with start as base (e.g.: +10, -3)
                end = this._handleRelativeValue(start, end);
                // Protect against non numeric properties.
                if (typeof end === 'number') {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _object[property] = start + (end - start) * value;
                }
            }
        }
    };
    Tween.prototype._handleRelativeValue = function (start, end) {
        if (typeof end !== 'string') {
            return end;
        }
        if (end.charAt(0) === '+' || end.charAt(0) === '-') {
            return start + parseFloat(end);
        }
        else {
            return parseFloat(end);
        }
    };
    Tween.prototype._swapEndStartRepeatValues = function (property) {
        var tmp = this._valuesStartRepeat[property];
        var endValue = this._valuesEnd[property];
        if (typeof endValue === 'string') {
            this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(endValue);
        }
        else {
            this._valuesStartRepeat[property] = this._valuesEnd[property];
        }
        this._valuesEnd[property] = tmp;
    };
    return Tween;
}());

var VERSION = '18.6.4';

/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */
var nextId = Sequence.nextId;
/**
 * Controlling groups of tweens
 *
 * Using the TWEEN singleton to manage your tweens can cause issues in large apps with many components.
 * In these cases, you may want to create your own smaller groups of tweens.
 */
var TWEEN = mainGroup;
// This is the best way to export things in a way that's compatible with both ES
// Modules and CommonJS, without build hacks, and so as not to break the
// existing API.
// https://github.com/rollup/rollup/issues/1961#issuecomment-423037881
var getAll = TWEEN.getAll.bind(TWEEN);
var removeAll = TWEEN.removeAll.bind(TWEEN);
var add = TWEEN.add.bind(TWEEN);
var remove = TWEEN.remove.bind(TWEEN);
var update = TWEEN.update.bind(TWEEN);
var tween_esm_exports = {
    Easing: Easing,
    Group: Group,
    Interpolation: Interpolation,
    now: now$1,
    Sequence: Sequence,
    nextId: nextId,
    Tween: Tween,
    VERSION: VERSION,
    getAll: getAll,
    removeAll: removeAll,
    add: add,
    remove: remove,
    update: update,
};

/* harmony default export */ var tween_esm = (tween_esm_exports);


// EXTERNAL MODULE: ./src/index.ts + 36 modules
var src = __webpack_require__(313);

// CONCATENATED MODULE: ./examples/UseAnimationExample.tsx




var options = [];
var algorithms = {};

for (var type in Easing) {
  for (var mode in Easing[type]) {
    var _name = type + mode;

    if (_name === "LinearNone") {
      _name = "Linear";
    }

    options.push(_name);
    algorithms[_name] = Easing[type][mode];
  }
}

function Example() {
  var _useState = Object(react["useState"])(options[0]),
      _useState2 = slicedToArray_default()(_useState, 2),
      algorithmName = _useState2[0],
      setAlgorithmName = _useState2[1];

  var _useState3 = Object(react["useState"])(0),
      _useState4 = slicedToArray_default()(_useState3, 2),
      percent = _useState4[0],
      setPercent = _useState4[1];

  var _useAnimation = Object(src["a" /* useAnimation */])(function (percent) {
    return setPercent(percent);
  }, {
    duration: 1000,
    algorithm: algorithms[algorithmName]
  }),
      _useAnimation2 = slicedToArray_default()(_useAnimation, 2),
      start = _useAnimation2[0],
      cancel = _useAnimation2[1];

  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", null, /*#__PURE__*/react_default.a.createElement("button", {
    onClick: start
  }, "Start"), /*#__PURE__*/react_default.a.createElement("button", {
    onClick: cancel
  }, "Cancel"), /*#__PURE__*/react_default.a.createElement("select", {
    value: algorithmName,
    onChange: function onChange(event) {
      setAlgorithmName(event.target.value);
    }
  }, options.map(function (option) {
    return /*#__PURE__*/react_default.a.createElement("option", {
      key: option,
      value: option
    }, option);
  }))), /*#__PURE__*/react_default.a.createElement("div", {
    style: {
      height: 8,
      width: percent * 100 + "%",
      marginTop: 8,
      backgroundColor: "orange"
    }
  }));
}

/* harmony default export */ var UseAnimationExample = (Example);
// CONCATENATED MODULE: ./docs/useAnimation.mdx
const frontMatter={};const metadata={"unversionedId":"useAnimation","id":"useAnimation","isDocsHomePage":false,"title":"useAnimation","description":"Use this hook to perform JavaScript animation.","source":"@site/docs/useAnimation.mdx","slug":"/useAnimation","permalink":"/hooks/useAnimation","version":"current","sidebar":"docs","previous":{"title":"useNextFrame","permalink":"/hooks/useNextFrame"},"next":{"title":"useMounted","permalink":"/hooks/useMounted"}};/* @jsxRuntime classic */ /* @jsx mdx */const toc=[{value:'Usage',id:'usage',children:[{value:'Params',id:'params',children:[]},{value:'Results',id:'results',children:[]}]},{value:'Example',id:'example',children:[]}];const layoutProps={toc};const MDXLayout="wrapper";function MDXContent({components,...props}){return Object(esm["b" /* mdx */])(MDXLayout,Object(esm_extends["a" /* default */])({},layoutProps,props,{components:components,mdxType:"MDXLayout"}),Object(esm["b" /* mdx */])("p",null,`Use this hook to perform JavaScript animation.`),Object(esm["b" /* mdx */])("h2",{"id":"usage"},`Usage`),Object(esm["b" /* mdx */])("pre",null,Object(esm["b" /* mdx */])("code",{parentName:"pre","className":"language-ts"},`function useAnimation(
  callback: (percent: number) => void,
  options:
    | number
    | { duration: number; algorithm?: (percent: number) => number }
): [start: () => void, cancel: () => void];
`)),Object(esm["b" /* mdx */])("h3",{"id":"params"},`Params`),Object(esm["b" /* mdx */])("ul",null,Object(esm["b" /* mdx */])("li",{parentName:"ul"},Object(esm["b" /* mdx */])("strong",{parentName:"li"},Object(esm["b" /* mdx */])("inlineCode",{parentName:"strong"},`callback`),`:`),` animation process function, it receives a percent number as the first param.`),Object(esm["b" /* mdx */])("li",{parentName:"ul"},Object(esm["b" /* mdx */])("strong",{parentName:"li"},Object(esm["b" /* mdx */])("inlineCode",{parentName:"strong"},`options`),`:`),` animation duration time or an options object.`,Object(esm["b" /* mdx */])("ul",{parentName:"li"},Object(esm["b" /* mdx */])("li",{parentName:"ul"},Object(esm["b" /* mdx */])("strong",{parentName:"li"},Object(esm["b" /* mdx */])("inlineCode",{parentName:"strong"},`options.duration`),`:`),` required animation duration time, in milliseconds.`),Object(esm["b" /* mdx */])("li",{parentName:"ul"},Object(esm["b" /* mdx */])("strong",{parentName:"li"},Object(esm["b" /* mdx */])("inlineCode",{parentName:"strong"},`options.algorithm`),`:`),` optional algorithm function. Animation execution is linear by default, you can specify this option to change the default behavior.`)))),Object(esm["b" /* mdx */])("h3",{"id":"results"},`Results`),Object(esm["b" /* mdx */])("ul",null,Object(esm["b" /* mdx */])("li",{parentName:"ul"},Object(esm["b" /* mdx */])("strong",{parentName:"li"},Object(esm["b" /* mdx */])("inlineCode",{parentName:"strong"},`start`),`:`),` start function.`),Object(esm["b" /* mdx */])("li",{parentName:"ul"},Object(esm["b" /* mdx */])("strong",{parentName:"li"},Object(esm["b" /* mdx */])("inlineCode",{parentName:"strong"},`cancel`),`:`),` cancel function.`)),Object(esm["b" /* mdx */])("h2",{"id":"example"},`Example`),Object(esm["b" /* mdx */])(ExampleBox["a" /* default */],{mdxType:"ExampleBox"},Object(esm["b" /* mdx */])(UseAnimationExample,{mdxType:"UseAnimationExample"})),Object(esm["b" /* mdx */])("pre",null,Object(esm["b" /* mdx */])("code",{parentName:"pre","className":"language-tsx"},`import React, { useState } from "react";
import { Easing } from "@tweenjs/tween.js";
import { useAnimation } from "@lilib/hooks";

const options: string[] = [];
const algorithms: { [name: string]: (percent: number) => number } = {};

for (let type in Easing) {
  for (let mode in (Easing as any)[type]) {
    let name = type + mode;
    if (name === "LinearNone") {
      name = "Linear";
    }
    options.push(name);
    algorithms[name] = (Easing as any)[type][mode];
  }
}

function Example() {
  const [algorithmName, setAlgorithmName] = useState(options[0]);
  const [percent, setPercent] = useState(0);
  const [start, cancel] = useAnimation((percent) => setPercent(percent), {
    duration: 1000,
    algorithm: algorithms[algorithmName],
  });

  return (
    <>
      <div>
        <button onClick={start}>Start</button>
        <button onClick={cancel}>Cancel</button>
        <select
          value={algorithmName}
          onChange={(event) => {
            setAlgorithmName(event.target.value);
          }}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          height: 8,
          width: percent * 100 + "%",
          marginTop: 8,
          backgroundColor: "orange",
        }}
      ></div>
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