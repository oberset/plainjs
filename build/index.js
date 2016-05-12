/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _PlainComponent = __webpack_require__(1);

	var _PlainComponent2 = _interopRequireDefault(_PlainComponent);

	var _counter = __webpack_require__(7);

	var _counter2 = _interopRequireDefault(_counter);

	var _counter3 = __webpack_require__(8);

	var _counter4 = _interopRequireDefault(_counter3);

	var _test = __webpack_require__(9);

	var _test2 = _interopRequireDefault(_test);

	var _test3 = __webpack_require__(10);

	var _test4 = _interopRequireDefault(_test3);

	var _select = __webpack_require__(11);

	var _select2 = _interopRequireDefault(_select);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.time('render');
	_PlainComponent2.default.render('<h1 content="hello"></h1>', { hello: 'Hello World!!!' }, document.querySelector('.hello'));
	console.timeEnd('render');

	console.time('render');
	_PlainComponent2.default.render(_select2.default, {
	    options: [{
	        value: 1,
	        label: 'One',
	        selected: false
	    }, {
	        value: 2,
	        label: 'Two',
	        selected: true
	    }, {
	        value: 3,
	        label: 'Three',
	        selected: false
	    }]
	}, document.querySelector('.select'));
	console.timeEnd('render');

	console.time('render');
	var counter = new _PlainComponent2.default(_counter4.default, _counter2.default);
	setTimeout(function () {
	    counter.replace(document.querySelector('.counter-elem'));
	}, 5000);
	console.timeEnd('render');

	console.time('render');
	var test = new _PlainComponent2.default(_test4.default, _test2.default);
	console.log(test.isRendered());
	test.render(document.querySelector('.test'));
	console.log(test.isRendered());

	setTimeout(function () {
	    test.destroy();
	}, 10000);

	console.timeEnd('render');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _PlainDom = __webpack_require__(2);

	var _PlainDom2 = _interopRequireDefault(_PlainDom);

	var _Plain = __webpack_require__(4);

	var _Plain2 = _interopRequireDefault(_Plain);

	var _PlainRenderer = __webpack_require__(6);

	var _PlainRenderer2 = _interopRequireDefault(_PlainRenderer);

	var _PlainObserver = __webpack_require__(5);

	var _PlainObserver2 = _interopRequireDefault(_PlainObserver);

	var _utils = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var counter = function counter() {
	    var nextValue = 0;
	    return function () {
	        return nextValue++;
	    };
	};

	var DomUpdater = function () {
	    function DomUpdater(node, provider) {
	        _classCallCheck(this, DomUpdater);

	        this.node = node;
	        this.provider = provider;
	        this.mountedNode = null;
	    }

	    _createClass(DomUpdater, [{
	        key: 'update',
	        value: function update(fragment) {
	            if (fragment.node && !this.mountedNode) {

	                this.provider.onBeforeMount(this.node);
	                _PlainDom2.default.appendChild(this.node, fragment.node);
	                this.provider.onMount(this.node);
	                this.mountedNode = fragment.node;
	            } else if (!fragment.node && this.mountedNode) {

	                this.provider.onBeforeUnmount(this.node);
	                _PlainDom2.default.removeChild(this.node, this.mountedNode);
	                this.provider.onUnmount(this.node);
	                this.mountedNode = null;
	            }
	        }
	    }]);

	    return DomUpdater;
	}();

	var PlainComponent = function () {
	    function PlainComponent(template, ProviderClass) {
	        var live = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

	        _classCallCheck(this, PlainComponent);

	        this.providerClass = ProviderClass;
	        this.template = template;
	        this.id = this.constructor.getNextId();
	        this.live = live === true;
	        this.provider = null;
	        this.fragment = null;
	        this.node = null;
	    }

	    _createClass(PlainComponent, [{
	        key: 'render',
	        value: function render(node, data) {
	            if (!this.isRendered()) {
	                var fragment = new _PlainRenderer2.default(this.template, this.node);
	                var provider = new this.providerClass(data);

	                _PlainObserver2.default.register(fragment, new DomUpdater(node, provider));
	                _PlainObserver2.default.register(provider, fragment);

	                this.live || _PlainObserver2.default.update(provider);

	                this.provider = provider;
	                this.fragment = fragment;
	            }

	            return this;
	        }
	    }, {
	        key: 'replace',
	        value: function replace(node, data) {
	            this.node = node;
	            return this.render(_PlainDom2.default.getParent(node), data);
	        }
	    }, {
	        key: 'update',
	        value: function update(newData) {
	            if (this.isRendered()) {
	                var provider = this.provider;

	                provider.onBeforeUpdate(provider.getData(), newData);
	                provider.setData(newData);
	                provider.onUpdate(newData);
	            } else {
	                throw new Error('Component is not rendered');
	            }

	            return this;
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            if (this.isRendered()) {
	                this.fragment.deleteFragmentNode();
	                this.fragment = null;

	                this.provider.onDestroy();

	                _PlainObserver2.default.unregister(this.fragment);
	                _PlainObserver2.default.unregister(this.provider);

	                this.provider = null;
	            }

	            return this;
	        }
	    }, {
	        key: 'isRendered',
	        value: function isRendered() {
	            return this.provider !== null && this.fragment !== null;
	        }
	    }, {
	        key: 'getId',
	        value: function getId() {
	            return this.id;
	        }
	    }], [{
	        key: 'render',
	        value: function render(template, providerClass, node, data) {
	            if ((0, _utils.isObject)(providerClass) && data === undefined) {
	                data = providerClass;
	                providerClass = _Plain2.default;
	            }
	            new PlainComponent(template, providerClass, false).render(node, data);
	        }
	    }]);

	    return PlainComponent;
	}();

	PlainComponent.getNextId = counter();
	exports.default = PlainComponent;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var doc = document;
	var reContentTypeHTML = /^\s*text\/html\s*(?:;|$)/i;

	var DOMParserClass = null;

	function createHTMLDoc(source) {
	    var htmlDoc = doc.implementation.createHTMLDocument();
	    htmlDoc.body.innerHTML = source;

	    return htmlDoc;
	}

	function getDOMParser() {

	    if (DOMParserClass) {
	        return new DOMParserClass();
	    }

	    var nativeParser = window.DOMParser;
	    var nativeHTMLParser = null;

	    if (nativeParser) {
	        try {
	            if (new DOMParser().parseFromString('', 'text/html')) {
	                nativeHTMLParser = nativeParser;
	            }
	        } catch (ex) {}
	    }

	    if (nativeHTMLParser) {
	        DOMParserClass = nativeHTMLParser;
	    } else if (nativeParser) {
	        (function () {

	            var parseFromString = nativeParser.prototype.parseFromString;

	            nativeParser.prototype.parseFromString = function (source, type) {
	                if (reContentTypeHTML.test(type)) {
	                    return createHTMLDoc(source);
	                } else {
	                    return parseFromString.apply(this, arguments);
	                }
	            };

	            DOMParserClass = nativeParser;
	        })();
	    } else {
	        DOMParserClass = function DOMParserClass() {
	            this.parseFromString = function (source, type) {
	                if (reContentTypeHTML.test(type)) {
	                    return createHTMLDoc(source);
	                } else {
	                    throw new Error('Unknown content-type: "' + type + '"');
	                }
	            };
	        };
	    }

	    return new DOMParserClass();
	}

	function parseFromString(source) {
	    return getDOMParser().parseFromString(source, 'text/html').body;
	}

	var PlainDom = function () {
	    function PlainDom() {
	        _classCallCheck(this, PlainDom);
	    }

	    _createClass(PlainDom, null, [{
	        key: 'createDocument',
	        value: function createDocument(source) {
	            return createHTMLDoc(source);
	        }
	    }, {
	        key: 'createDocumentFragment',
	        value: function createDocumentFragment(source) {
	            var frag = doc.createDocumentFragment();

	            if (source !== _utils.T_UNDEF) {
	                var content = void 0;

	                if (this.isDomNode(source)) {
	                    content = source;
	                } else {
	                    content = parseFromString(source);
	                }

	                frag.appendChild(content);
	            }

	            return frag;
	        }
	    }, {
	        key: 'createElement',
	        value: function createElement(name, attributes) {
	            var elem = doc.createElement(name);

	            if (attributes) {
	                var keys = Object.keys(attributes);
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var key = _step.value;

	                        var value = attributes[key];
	                        if (value !== null) {
	                            elem.setAttribute(key, value === _utils.T_UNDEF ? key : value);
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	            }

	            return elem;
	        }
	    }, {
	        key: 'createTextNode',
	        value: function createTextNode(str) {
	            return doc.createTextNode(str);
	        }
	    }, {
	        key: 'setText',
	        value: function setText(textNode, str) {
	            textNode.nodeValue = str;
	        }
	    }, {
	        key: 'getText',
	        value: function getText(textNode) {
	            return textNode.nodeValue;
	        }
	    }, {
	        key: 'appendChild',
	        value: function appendChild(node, child) {
	            !this.isDomNode(child) && (child = doc.createTextNode(child));
	            node.appendChild(child);
	        }
	    }, {
	        key: 'appendChildren',
	        value: function appendChildren(node, children) {
	            var list = (0, _utils.toArray)(children);
	            var frag = this.createDocumentFragment();

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var item = _step2.value;

	                    this.appendChild(frag, item);
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            node.appendChild(frag);
	        }
	    }, {
	        key: 'removeChild',
	        value: function removeChild(node, child) {
	            node.removeChild(child);
	        }
	    }, {
	        key: 'removeChildren',
	        value: function removeChildren(node, children) {
	            if (!children) {
	                while (node.firstChild) {
	                    node.removeChild(node.firstChild);
	                }
	            } else {
	                var list = (0, _utils.toArray)(children);

	                var _iteratorNormalCompletion3 = true;
	                var _didIteratorError3 = false;
	                var _iteratorError3 = undefined;

	                try {
	                    for (var _iterator3 = list[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                        var item = _step3.value;

	                        this.removeChild(node, item);
	                    }
	                } catch (err) {
	                    _didIteratorError3 = true;
	                    _iteratorError3 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                            _iterator3.return();
	                        }
	                    } finally {
	                        if (_didIteratorError3) {
	                            throw _iteratorError3;
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'replaceChild',
	        value: function replaceChild(node, newChild, oldChild) {
	            return node.replaceChild(newChild, oldChild);
	        }
	    }, {
	        key: 'getChildren',
	        value: function getChildren(node, type) {
	            if (!type) {
	                return (0, _utils.toArray)(node.childNodes);
	            } else {
	                return (0, _utils.toArray)(node.childNodes).filter(function (node) {
	                    return node.nodeType === type;
	                });
	            }
	        }
	    }, {
	        key: 'getParent',
	        value: function getParent(node) {
	            return node.parentNode;
	        }
	    }, {
	        key: 'setAttribute',
	        value: function setAttribute(node, name, value) {
	            node.setAttribute(name, value);
	        }
	    }, {
	        key: 'removeAttribute',
	        value: function removeAttribute(node, name) {
	            node.removeAttribute(name);
	        }
	    }, {
	        key: 'getAttributes',
	        value: function getAttributes(node) {
	            return (0, _utils.toArray)(node.attributes);
	        }
	    }, {
	        key: 'setAttributes',
	        value: function setAttributes(node, attributes) {
	            var list = (0, _utils.toArray)(node.attributes);

	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = list[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var attribute = _step4.value;

	                    var name = attribute.name;
	                    var value = attribute.value;

	                    if ((0, _utils.isNullOrUndef)(value)) {
	                        node.removeAttribute(name);
	                    } else {
	                        node.setAttribute(name, attributes[name]);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'isDomNode',
	        value: function isDomNode(elem) {
	            return elem !== null && (typeof elem === 'undefined' ? 'undefined' : _typeof(elem)) === 'object' && elem.nodeType && elem.nodeType > 0;
	        }
	    }, {
	        key: 'toArray',
	        value: function toArray(nodelist) {
	            return this.isDomNode(nodelist) ? [nodelist] : (0, _utils.toArray)(nodelist);
	        }
	    }]);

	    return PlainDom;
	}();

	exports.default = PlainDom;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isObject = isObject;
	exports.copyObject = copyObject;
	exports.copyArray = copyArray;
	exports.mergeObject = mergeObject;
	exports.toArray = toArray;
	exports.toKeyValue = toKeyValue;
	exports.isNullOrUndef = isNullOrUndef;
	var T_UNDEF = exports.T_UNDEF = void 0;

	function testObject(obj, proto) {
	    return obj !== null && Object.prototype.toString.call(obj) === '[object ' + proto + ']';
	}

	function isObject(obj) {
	    return testObject(obj, 'Object');
	}

	function copyObject(source) {
	    var target = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var keys = Object.keys(source);
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var key = _step.value;

	            var val = source[key];
	            if (isObject(val)) {
	                val = copyObject(val);
	            } else if (Array.isArray(val)) {
	                val = copyArray(val);
	            }
	            target[key] = val;
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    return target;
	}

	function copyArray(source) {
	    var target = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	    for (var i = 0, len = source.length; i < len; i++) {
	        if (Array.isArray(source[i])) {
	            target[i] = copyArray(source[i]);
	        } else if (isObject(source[i])) {
	            target[i] = copyObject(source[i]);
	        } else {
	            target[i] = source[i];
	        }
	    }
	    return target;
	}

	function mergeObject(source) {
	    var target = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var keys = Object.keys(source);
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	        for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var key = _step2.value;

	            var newData = source[key];
	            var curData = target[key];

	            if (isObject(curData) && isObject(newData)) {
	                mergeObject(newData, curData);
	            } else {
	                target[key] = newData;
	            }
	        }
	    } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	            }
	        } finally {
	            if (_didIteratorError2) {
	                throw _iteratorError2;
	            }
	        }
	    }

	    return target;
	}

	function toArray(list) {
	    return Array.from(list);
	}

	function toKeyValue(list, key, value) {
	    var obj = {};
	    var _iteratorNormalCompletion3 = true;
	    var _didIteratorError3 = false;
	    var _iteratorError3 = undefined;

	    try {
	        for (var _iterator3 = list[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var item = _step3.value;

	            obj[item[key]] = item[value];
	        }
	    } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                _iterator3.return();
	            }
	        } finally {
	            if (_didIteratorError3) {
	                throw _iteratorError3;
	            }
	        }
	    }

	    return obj;
	}

	function isNullOrUndef(test) {
	    return test === null || test === T_UNDEF;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _PlainObserver = __webpack_require__(5);

	var _PlainObserver2 = _interopRequireDefault(_PlainObserver);

	var _utils = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var storage = new WeakMap();

	var Plain = function () {
	    function Plain(data) {
	        var _this = this;

	        _classCallCheck(this, Plain);

	        var state = {};

	        Object.defineProperty(this, 'data', {
	            enumerable: true,
	            configurable: true,
	            get: function get() {
	                throw new Error('Direct access to the property "data" is not allowed. Use method "setData" to update your data.');
	            },
	            set: function set(data) {
	                (0, _utils.isNullOrUndef)(data) && (data = {});
	                var copy = (0, _utils.copyObject)(_this.validate(data));
	                (0, _utils.mergeObject)(copy, state);
	            }
	        });

	        storage.set(this, state);
	        this.data = data;
	    }

	    _createClass(Plain, [{
	        key: 'validate',
	        value: function validate(data) {
	            if ((0, _utils.isObject)(data)) {
	                return data;
	            } else {
	                throw new Error('"data" must be a plain object');
	            }
	        }
	    }, {
	        key: 'setData',
	        value: function setData(data) {
	            this.data = data;
	            _PlainObserver2.default.update(this);
	        }
	    }, {
	        key: 'getData',
	        value: function getData() {
	            return (0, _utils.copyObject)(storage.get(this));
	        }
	    }, {
	        key: 'onBeforeMount',
	        value: function onBeforeMount() {}
	    }, {
	        key: 'onMount',
	        value: function onMount() {}
	    }, {
	        key: 'onBeforeUpdate',
	        value: function onBeforeUpdate() {}
	    }, {
	        key: 'onUpdate',
	        value: function onUpdate() {}
	    }, {
	        key: 'onBeforeUnmount',
	        value: function onBeforeUnmount() {}
	    }, {
	        key: 'onUnmount',
	        value: function onUnmount() {}
	    }, {
	        key: 'onDestroy',
	        value: function onDestroy() {}
	    }]);

	    return Plain;
	}();

	exports.default = Plain;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PlainObserver = function () {
	    function PlainObserver() {
	        _classCallCheck(this, PlainObserver);
	    }

	    _createClass(PlainObserver, null, [{
	        key: "register",
	        value: function register(object, listener) {
	            var listeners = this.list.get(object);
	            if (!Array.isArray(listeners)) {
	                listeners = [listener];
	            } else {
	                listeners.push(listener);
	            }
	            this.list.set(object, listeners);
	        }
	    }, {
	        key: "unregister",
	        value: function unregister(object) {
	            if (this.list.has(object)) {
	                this.list.delete(object);
	            }
	        }
	    }, {
	        key: "update",
	        value: function update(object) {
	            var listeners = this.list.get(object);
	            listeners && listeners.forEach(function (listener) {
	                listener.update(object);
	            });
	        }
	    }]);

	    return PlainObserver;
	}();

	PlainObserver.list = new WeakMap();
	exports.default = PlainObserver;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _PlainDom = __webpack_require__(2);

	var _PlainDom2 = _interopRequireDefault(_PlainDom);

	var _PlainObserver = __webpack_require__(5);

	var _PlainObserver2 = _interopRequireDefault(_PlainObserver);

	var _utils = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ITEMS_EQUALS = 0;
	var ITEMS_TO_DELETE = -1;
	var ITEMS_TO_ADD = 1;
	var ITEMS_TO_UPDATE = 2;

	var PlainRenderer = function () {
	    function PlainRenderer(template, node) {
	        _classCallCheck(this, PlainRenderer);

	        this.template = this.createTemplateFromString(template);
	        this.node = _PlainDom2.default.isDomNode(node) ? node : null;
	        this.fragment = null;
	        this.data = {};
	        this.previousData = {};
	    }

	    _createClass(PlainRenderer, [{
	        key: 'createTemplateFromString',
	        value: function createTemplateFromString(html) {
	            return _PlainDom2.default.createDocumentFragment(html).firstChild;
	        }
	    }, {
	        key: 'update',
	        value: function update(provider) {
	            this.data = provider.getData();

	            if (null === this.fragment) {
	                this.fragment = this.createFragmentFromTemplate();

	                if (this.node) {
	                    var renderedNode = this.node;
	                    var node = this.createFragmentNode();

	                    this.replaceNode(renderedNode, node);
	                    this.node = node;
	                } else {
	                    this.node = this.createFragmentNode();
	                }
	            } else {
	                console.time('updateFragment');
	                this.node = this.updateFragmentNode();
	                console.timeEnd('updateFragment');
	            }

	            this.previousData = (0, _utils.copyObject)(this.data);

	            _PlainObserver2.default.update(this);
	        }
	    }, {
	        key: 'createFragmentFromTemplate',
	        value: function createFragmentFromTemplate(template) {
	            var root = template || this.template.firstChild;
	            var result = void 0;

	            switch (root.nodeType) {
	                case Node.TEXT_NODE:
	                    result = this.createFragmentFromString(root.nodeValue);
	                    break;

	                case Node.ELEMENT_NODE:
	                    result = this.createFragmentFromElement(root);
	                    break;

	                case Node.DOCUMENT_FRAGMENT_NODE:
	                    result = this.createFragmentFromElement(root.firstChild);
	                    break;

	                case Node.DOCUMENT_NODE:
	                    result = this.createFragmentFromElement(root.documentElement);
	                    break;
	            }

	            return result;
	        }
	    }, {
	        key: 'createFragmentFromString',
	        value: function createFragmentFromString(str) {
	            return {
	                type: 'string',
	                value: str.replace(/^(\s?)[\r\n\t]+[\s\t]*/, "$1") || ''
	            };
	        }
	    }, {
	        key: 'createFragmentFromElement',
	        value: function createFragmentFromElement(root) {
	            var result = Object.assign({}, PlainRenderer.fragmentData);
	            var options = {};

	            var attributesIterator = _PlainDom2.default.getAttributes(root);
	            var attributes = {};
	            var attributesData = {};
	            var hasAttributesData = false;

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = attributesIterator[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var attribute = _step.value;

	                    var attributeName = attribute.name.toLowerCase();
	                    var attributeValue = attribute.value;

	                    if (attributeValue.indexOf(':') === 0) {
	                        attributesData[attributeName] = attributeValue;
	                        !hasAttributesData && (hasAttributesData = true);
	                    } else if (PlainRenderer.options[attributeName]) {
	                        options[attributeName] = attributeValue;
	                    } else {
	                        attributes[attributeName] = attributeValue;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            var childrenIterator = _PlainDom2.default.getChildren(root);
	            var children = [];

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = childrenIterator[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var child = _step2.value;

	                    var fragment = this.createFragmentFromTemplate(child);
	                    fragment && children.push(fragment);
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            result.type = 'element';
	            result.name = root.nodeName.toLowerCase();
	            result.attributes = attributes;
	            result.attributesData = attributesData;
	            result.hasAttributesData = hasAttributesData;
	            result.options = options;
	            result.renderedData = {};
	            result.children = children;

	            return result;
	        }
	    }, {
	        key: 'createFragmentNode',
	        value: function createFragmentNode(fragment, data) {
	            var _this = this;

	            fragment = fragment || this.fragment;
	            data = data || this.data;

	            if (fragment.type === 'string') {
	                return fragment.node = _PlainDom2.default.createTextNode(fragment.value);
	            }

	            var options = fragment.options || {};

	            if (options.from) {
	                data = data[options.from];
	            }

	            if (options.match && !this.match(options, data[options.match])) {
	                return null;
	            }

	            if (options.expression && !this.expression(options.expression, data)) {
	                return null;
	            }

	            this.setAttributesData(fragment, data);

	            var node = _PlainDom2.default.createElement(fragment.name, fragment.attributes);

	            options.content && this.addContent(node, fragment, data[options.content]);
	            options.component && this.addComponent(node, fragment, data[options.component]);

	            if (options['for-each']) {
	                (function () {
	                    var to = options['to'] || 'item';
	                    var list = data[options['for-each']];
	                    var fragments = [];

	                    list.forEach(function (item) {
	                        var itemChildren = (0, _utils.copyArray)(fragment.children);
	                        var itemData = Object.assign({}, data);
	                        itemData[to] = item;

	                        _this.addChildren(node, itemData, itemChildren);
	                        fragments.push(itemChildren);
	                    });
	                    fragment.renderedData.children = fragments;
	                })();
	            } else {
	                this.addChildren(node, data, fragment.children);
	            }

	            return fragment.node = node;
	        }
	    }, {
	        key: 'updateFragmentNode',
	        value: function updateFragmentNode(fragment, data, previousData) {
	            var _this2 = this;

	            fragment = fragment || this.fragment;
	            data = data || this.data;
	            previousData = previousData || this.previousData;

	            if (fragment.type === 'string') {
	                return null;
	            }

	            var node = fragment.node || (fragment.node = this.createFragmentNode(fragment, data));

	            if (null === node) {
	                return null;
	            }

	            var options = fragment.options;

	            if (options.from) {
	                data = data[options.from];
	                previousData = previousData[options.from];
	            }

	            if (options.match && !this.match(options, data[options.match])) {
	                return fragment.node = null;
	            }

	            if (options.expression && !this.expression(options.expression, data)) {
	                return fragment.node = null;
	            }

	            this.setAttributesData(fragment, data);
	            _PlainDom2.default.setAttributes(node, fragment.attributes);

	            options.content && this.updateContent(node, fragment, data[options.content]);
	            options.component && this.updateComponent(node, fragment, data[options.component]);

	            if (options['for-each']) {
	                (function () {
	                    var to = options['to'] || 'item';
	                    var list = data[options['for-each']];
	                    var prevList = previousData[options['for-each']];
	                    var items = _this2.getUpdatedItems(list, prevList);
	                    var renderedChildren = fragment.renderedData.children ? fragment.renderedData.children : [];
	                    var fragments = [];

	                    items.forEach(function (item, i) {
	                        switch (item.type) {
	                            case ITEMS_TO_DELETE:
	                                (function () {
	                                    var itemChildren = renderedChildren[i] || [];
	                                    _this2.deleteChildren(node, itemChildren);
	                                })();

	                                break;

	                            case ITEMS_TO_ADD:
	                                (function () {
	                                    var itemChildren = fragment.children;
	                                    var itemData = Object.assign({}, data);
	                                    itemData[to] = item.data;

	                                    _this2.addChildren(node, itemData, itemChildren);
	                                    fragments.push(itemChildren);
	                                })();
	                                break;

	                            case ITEMS_TO_UPDATE:
	                                (function () {
	                                    var itemChildren = renderedChildren[i] || [];
	                                    var itemData = Object.assign({}, data);
	                                    itemData[to] = item.data;

	                                    var itemPreviousData = Object.assign({}, previousData);
	                                    itemPreviousData[to] = item.previous;

	                                    _this2.updateChildren(node, itemChildren, itemData, itemPreviousData);
	                                    fragments.push(itemChildren);
	                                })();
	                                break;

	                            default:
	                                fragments.push(children);
	                        }
	                    });

	                    fragment.renderedData.children = fragments;
	                })();
	            } else {
	                this.updateChildren(node, fragment.children, data, previousData);
	            }

	            return node;
	        }
	    }, {
	        key: 'deleteFragmentNode',
	        value: function deleteFragmentNode(node, fragment) {
	            fragment = fragment || this;

	            if (fragment.node) {
	                node = node || _PlainDom2.default.getParent(fragment.node);
	                _PlainDom2.default.removeChild(node, fragment.node);
	                fragment.node = null;
	            }
	        }
	    }, {
	        key: 'getNodeInfo',
	        value: function getNodeInfo(node) {
	            switch (node.nodeType) {
	                case Node.TEXT_NODE:
	                    return {
	                        name: null,
	                        attributes: [],
	                        content: node.nodeValue
	                    };
	                    break;

	                case Node.ELEMENT_NODE:
	                    return {
	                        name: node.nodeName.toLowerCase(),
	                        attributes: _PlainDom2.default.getAttributes(node),
	                        content: null
	                    };
	                    break;
	            }
	        }
	    }, {
	        key: 'replaceNode',
	        value: function replaceNode(source, target) {
	            _PlainDom2.default.replaceChild(_PlainDom2.default.getParent(source), target, source);
	        }
	    }, {
	        key: 'match',
	        value: function match(options, data) {
	            if (options.exists) {

	                return options.exists === 'false' && (0, _utils.isNullOrUndef)(data) || options.exists === 'true' && !(0, _utils.isNullOrUndef)(data);
	            } else if (options.eq) {

	                switch (typeof data === 'undefined' ? 'undefined' : _typeof(data)) {
	                    case 'string':
	                    case 'boolean':
	                    case 'number':
	                    case 'undefined':
	                        return options.eq === data.toString();
	                        break;

	                    case 'object':
	                        return options.eq === 'null' && data === null || options.eq === 'object' && data !== null;
	                        break;
	                }
	            } else {
	                var _arr = ['lt', 'gt', 'lte', 'gte'];


	                for (var _i = 0; _i < _arr.length; _i++) {
	                    var type = _arr[_i];
	                    if (_utils.T_UNDEF !== options[type]) {
	                        var test = parseFloat(options[type]);
	                        var val = parseFloat(data);

	                        switch (type) {
	                            case 'lt':
	                                return test > val;
	                                break;

	                            case 'lte':
	                                return test >= val;
	                                break;

	                            case 'gt':
	                                return test < val;
	                                break;

	                            case 'gte':
	                                return test <= val;
	                                break;
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'expression',
	        value: function expression(expr, data) {
	            return new Function('data', 'return ' + expr)(data);
	        }
	    }, {
	        key: 'getUpdatedItems',
	        value: function getUpdatedItems(items, previousItems) {
	            !Array.isArray(items) && (items = []);
	            !Array.isArray(previousItems) && (previousItems = []);

	            var changes = [];

	            for (var i = 0, len = items.length; i < len; i++) {
	                if (previousItems[i]) {
	                    changes.push({
	                        type: ITEMS_TO_UPDATE,
	                        data: items[i],
	                        previous: previousItems[i]
	                    });
	                } else {
	                    changes.push({
	                        type: ITEMS_TO_ADD,
	                        data: items[i]
	                    });
	                }
	            }

	            if (previousItems.length > items.length) {
	                changes.length = previousItems.length;
	                changes.fill({ type: ITEMS_TO_DELETE }, items.length);
	            }

	            return changes;
	        }
	    }, {
	        key: 'setAttributesData',
	        value: function setAttributesData(fragment, data) {
	            if (fragment.hasAttributesData) {
	                var attributes = Object.keys(fragment.attributesData);
	                var _iteratorNormalCompletion3 = true;
	                var _didIteratorError3 = false;
	                var _iteratorError3 = undefined;

	                try {
	                    for (var _iterator3 = attributes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                        var key = _step3.value;

	                        var value = fragment.attributesData[key];
	                        fragment.attributes[key] = data[value.substring(1)];
	                    }
	                } catch (err) {
	                    _didIteratorError3 = true;
	                    _iteratorError3 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                            _iterator3.return();
	                        }
	                    } finally {
	                        if (_didIteratorError3) {
	                            throw _iteratorError3;
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'addChildren',
	        value: function addChildren(node, data, fragmentChildren) {
	            var _this3 = this;

	            var children = fragmentChildren.map(function (item) {
	                return _this3.createFragmentNode(item, data);
	            }).filter(function (item) {
	                return item && true;
	            });
	            children.length && _PlainDom2.default.appendChildren(node, children);
	        }
	    }, {
	        key: 'updateChildren',
	        value: function updateChildren(node, list, data, previousData) {
	            var updatedNodes = [];
	            var updated = false;

	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = list[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var child = _step4.value;

	                    if (child.type !== 'element') {
	                        continue;
	                    }

	                    var currentNode = child.node;
	                    var updatedNode = this.updateFragmentNode(child, data, previousData);

	                    if (currentNode !== updatedNode) {
	                        !updated && (updated = true);
	                        updatedNode && updatedNodes.push(updatedNode);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }

	            if (updated) {
	                _PlainDom2.default.removeChildren(node);
	                _PlainDom2.default.appendChildren(node, updatedNodes);
	            }
	        }
	    }, {
	        key: 'deleteChildren',
	        value: function deleteChildren(node, list) {
	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;

	            try {
	                for (var _iterator5 = list[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var child = _step5.value;

	                    this.deleteFragmentNode(node, child);
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'addContent',
	        value: function addContent(node, fragment, content) {
	            var contentNode = _PlainDom2.default.createTextNode(content);
	            _PlainDom2.default.appendChild(node, contentNode);

	            fragment.renderedData.content = {
	                node: contentNode
	            };
	        }
	    }, {
	        key: 'updateContent',
	        value: function updateContent(node, fragment, content) {
	            var textNode = fragment.renderedData.content.node;
	            _PlainDom2.default.getText(textNode) !== content && _PlainDom2.default.setText(textNode, content);
	        }
	    }, {
	        key: 'addComponent',
	        value: function addComponent(node, fragment, params) {
	            var component = params.component;
	            var data = params.data || {};

	            component.render(node, data);
	            fragment.renderedData.component = component;
	        }
	    }, {
	        key: 'updateComponent',
	        value: function updateComponent(node, fragment, params) {
	            var newComponent = params.component;
	            var oldComponent = fragment.renderedData.component;
	            var update = oldComponent && newComponent.getId() === oldComponent.getId();

	            if (update) {
	                oldComponent.update(params.data || {});
	            } else {
	                _PlainDom2.default.removeChildren(node);
	                this.addComponent(node, fragment, params);
	            }
	        }
	    }]);

	    return PlainRenderer;
	}();

	PlainRenderer.fragmentData = {
	    name: null,
	    attributes: null,
	    children: null,
	    renderedData: null,
	    options: null
	};
	PlainRenderer.options = {
	    content: true,
	    component: true,
	    from: true,
	    to: true,
	    'for-each': true,
	    match: true,
	    exists: true,
	    eq: true,
	    'not-eq': true,
	    gt: true,
	    gte: true,
	    lt: true,
	    lte: true,
	    expression: true
	};
	exports.default = PlainRenderer;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Plain2 = __webpack_require__(4);

	var _Plain3 = _interopRequireDefault(_Plain2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Counter = function (_Plain) {
	    _inherits(Counter, _Plain);

	    function Counter() {
	        _classCallCheck(this, Counter);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Counter).call(this));

	        _this.counter = 0;

	        _this.setData({
	            cssClass: 'counter-elem'
	        });

	        //Don't work
	        var data = _this.getData();
	        data.counter = 10000;

	        setInterval(function () {
	            _this.setData({
	                counter: _this.counter++
	            });
	        }, 1000);
	        return _this;
	    }

	    return Counter;
	}(_Plain3.default);

	exports.default = Counter;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<div class=\":cssClass\">\n    <span content=\"counter\"></span>\n</div>";

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Plain2 = __webpack_require__(4);

	var _Plain3 = _interopRequireDefault(_Plain2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Test = function (_Plain) {
	    _inherits(Test, _Plain);

	    function Test() {
	        _classCallCheck(this, Test);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Test).call(this));

	        _this.setData({
	            test: false
	        });

	        setInterval(function () {
	            var data = _this.getData();

	            _this.setData({
	                test: !data.test
	            });
	        }, 1000);
	        return _this;
	    }

	    _createClass(Test, [{
	        key: 'onBeforeMount',
	        value: function onBeforeMount() {
	            console.log('onBeforeMount !!!');
	        }
	    }, {
	        key: 'onMount',
	        value: function onMount() {
	            console.log('onMount !!!');
	        }
	    }, {
	        key: 'onBeforeUnmount',
	        value: function onBeforeUnmount() {
	            console.log('onBeforeUnmount !!!');
	        }
	    }, {
	        key: 'onUnmount',
	        value: function onUnmount() {
	            console.log('onUnmount !!!');
	        }
	    }, {
	        key: 'onDestroy',
	        value: function onDestroy() {
	            console.log('onDestroy !!!');
	        }
	    }]);

	    return Test;
	}(_Plain3.default);

	exports.default = Test;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div match=\"test\" eq=\"true\">\n    <b>Content</b> <em>here</em>\n</div>\n";

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "<select for-each=\"options\" to=\"option\">\n    <option from=\"option\" match=\"selected\" eq=\"false\" value=\":value\" content=\"label\"></option>\n    <option from=\"option\" match=\"selected\" eq=\"true\" value=\":value\" content=\"label\" selected=\"selected\"></option>\n</select>";

/***/ }
/******/ ]);