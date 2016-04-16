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

	var _page = __webpack_require__(5);

	var _page2 = _interopRequireDefault(_page);

	var _page3 = __webpack_require__(9);

	var _page4 = _interopRequireDefault(_page3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.time('render');
	_PlainComponent2.default.render(_page2.default, _page4.default, document.querySelectorAll('.container'));
	console.timeEnd('render');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _PlainDomFragment = __webpack_require__(2);

	var _PlainDomFragment2 = _interopRequireDefault(_PlainDomFragment);

	var _PlainObserver = __webpack_require__(4);

	var _PlainObserver2 = _interopRequireDefault(_PlainObserver);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PlainComponent = function () {
	    function PlainComponent(ProviderClass, template) {
	        _classCallCheck(this, PlainComponent);

	        this.provider = ProviderClass;
	        this.template = template;
	    }

	    _createClass(PlainComponent, [{
	        key: 'render',
	        value: function render(node) {
	            var ProviderClass = this.provider;
	            var template = _PlainDomFragment2.default.createTemplateFromString(this.template);
	            var list = Array.isArray(node) ? node : [];

	            switch (true) {
	                case node instanceof Node:
	                    list.push(node);
	                    break;

	                case node instanceof NodeList:
	                    var it = _PlainDomFragment2.default.getDomListIterator(node);
	                    var nextNode = void 0;
	                    while (nextNode = it()) {
	                        list.push(nextNode);
	                    }
	                    break;
	            }

	            list.forEach(function (node) {
	                var provider = new ProviderClass();
	                var data = provider.getData();
	                var fragment = new _PlainDomFragment2.default(template);

	                _PlainObserver2.default.register(data, fragment);
	                _PlainObserver2.default.update(data);

	                if (fragment.node) {
	                    provider.onBeforeMount(node);
	                    node.appendChild(fragment.node);
	                    provider.onMount(node);
	                }
	            });
	        }
	    }], [{
	        key: 'render',
	        value: function render(ProviderClass, template, node) {
	            new PlainComponent(ProviderClass, template).render(node);
	        }
	    }]);

	    return PlainComponent;
	}();

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

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _PlainDom2 = __webpack_require__(3);

	var _PlainDom3 = _interopRequireDefault(_PlainDom2);

	var _PlainObserver = __webpack_require__(4);

	var _PlainObserver2 = _interopRequireDefault(_PlainObserver);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PlainDomFragment = function (_PlainDom) {
	    _inherits(PlainDomFragment, _PlainDom);

	    function PlainDomFragment(template) {
	        _classCallCheck(this, PlainDomFragment);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PlainDomFragment).call(this));

	        _this.template = template;
	        _this.fragment = null;
	        _this.node = null;
	        _this.data = {};
	        return _this;
	    }

	    _createClass(PlainDomFragment, [{
	        key: 'update',
	        value: function update(data) {
	            this.data = Object.assign({}, this.data, data);

	            if (null === this.fragment) {
	                this.fragment = this.createFragmentFromTemplate();
	                console.log(this.fragment);

	                this.node = this.createFragmentNode();
	                console.log(this.node);
	            } else {
	                this.updateFragment();
	            }
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
	            var result = Object.assign({}, PlainDomFragment.fragmentData);
	            var options = {};

	            var attributesIterator = _PlainDom3.default.getDomListIterator(root.attributes);
	            var attribute = void 0;
	            var attributes = {};
	            var attributesData = {};
	            var hasAttributesData = false;

	            while (attribute = attributesIterator()) {
	                var attributeName = attribute.nodeName.toLowerCase();
	                var attributeValue = attribute.nodeValue;

	                if (attributeValue.indexOf(':') === 0) {
	                    attributesData[attributeName] = attributeValue;
	                    !hasAttributesData && (hasAttributesData = true);
	                } else if (PlainDomFragment.options[attributeName]) {
	                    options[attributeName] = attributeValue;
	                } else {
	                    attributes[attributeName] = attributeValue;
	                }
	            }

	            var childrenIterator = _PlainDom3.default.getDomListIterator(root.childNodes);
	            var child = void 0;
	            var children = [];

	            while (child = childrenIterator()) {
	                var fragment = this.createFragmentFromTemplate(child);
	                fragment && children.push(fragment);
	            }

	            result.type = 'element';
	            result.name = root.nodeName.toLowerCase();
	            result.attributes = attributes;
	            result.attributesData = attributesData;
	            result.hasAttributesData = hasAttributesData;
	            result.options = options;
	            children.length && (result.children = children);

	            return result;
	        }
	    }, {
	        key: 'createFragmentNode',
	        value: function createFragmentNode(fragment, data) {
	            var _this2 = this;

	            fragment = fragment || this.fragment;
	            data = data || this.data;

	            if (fragment.type === 'string') {
	                fragment.node = this.createTextNode(fragment.value);
	                return fragment.node;
	            }

	            var options = fragment.options || {};

	            if (options.from) {
	                data = data[options.from];
	            }

	            this.setAttributesData(fragment, data);

	            var node = this.createElement(fragment.name, fragment.attributes);

	            if (options.content) {
	                this.addContent(node, data[options.content], options.type);
	            }

	            if (fragment.children) {
	                (function () {

	                    var docFragment = document.createDocumentFragment();

	                    if (options['for-each']) {
	                        (function () {
	                            var to = options['to'] || 'item';
	                            var list = data[options['for-each']];

	                            fragment.listKeys = [];

	                            list.forEach(function (item) {
	                                var itemData = Object.assign({}, data);
	                                itemData[to] = item;

	                                var key = _this2.getDataId(item);

	                                _this2.addChildren(docFragment, itemData, fragment.children);
	                                fragment.listKeys.push(key);
	                            });
	                        })();
	                    } else {
	                        _this2.addChildren(docFragment, data, fragment.children);
	                    }

	                    node.appendChild(docFragment);
	                })();
	            }

	            fragment.node = node;
	            return node;
	        }
	    }, {
	        key: 'getDataId',
	        value: function getDataId(data) {
	            return (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' ? data.key || JSON.stringify(data) : data;
	        }
	    }, {
	        key: 'addChildren',
	        value: function addChildren(node, data, list) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var child = _step.value;

	                    var childNode = this.createFragmentNode(child, data);
	                    childNode && node.appendChild(childNode);
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
	    }, {
	        key: 'updateChildren',
	        value: function updateChildren(list, data) {
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var child = _step2.value;

	                    this.updateFragment(child, data);
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
	        }
	    }, {
	        key: 'deleteChildren',
	        value: function deleteChildren(list) {
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = list[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var child = _step3.value;

	                    this.deleteFragment(child);
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
	    }, {
	        key: 'setAttributesData',
	        value: function setAttributesData(fragment, data) {
	            if (fragment.hasAttributesData) {
	                var attributes = Object.keys(fragment.attributesData);
	                var _iteratorNormalCompletion4 = true;
	                var _didIteratorError4 = false;
	                var _iteratorError4 = undefined;

	                try {
	                    for (var _iterator4 = attributes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                        var key = _step4.value;

	                        var value = fragment.attributesData[key];
	                        fragment.attributes[key] = data[value.substring(1)];
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
	        }
	    }, {
	        key: 'deleteFragment',
	        value: function deleteFragment(fragment) {
	            fragment.node && fragment.node.parentNode.removeChild(fragment.node);
	            fragment = null;
	        }
	    }, {
	        key: 'updateFragment',
	        value: function updateFragment(fragment, data) {
	            var _this3 = this;

	            fragment = fragment || this.fragment;
	            data = data || this.data;

	            if (fragment.type === 'string') {
	                return;
	            }

	            var node = fragment.node;
	            var options = fragment.options;

	            if (options.from) {
	                data = data[options.from];
	            }

	            this.setAttributesData(fragment, data);
	            this.updateElement(node, fragment.attributes);

	            if (options.content) {
	                this.updateContent(node, data[options.content], options.type);
	            }

	            if (fragment.children) {
	                if (options['for-each']) {
	                    (function () {
	                        var to = options['to'] || 'item';
	                        var list = data[options['for-each']];

	                        //TODO: delete only modified items
	                        _this3.removeContent(node);
	                        fragment.listKeys = [];

	                        var docFragment = document.createDocumentFragment();

	                        list.forEach(function (item) {
	                            var itemData = Object.assign({}, data);
	                            itemData[to] = item;

	                            var key = _this3.getDataId(item);

	                            _this3.addChildren(docFragment, itemData, fragment.children);
	                            fragment.listKeys.push(key);
	                        });

	                        node.appendChild(docFragment);
	                    })();
	                } else {
	                    this.updateChildren(fragment.children, data);
	                }
	            }
	        }
	    }, {
	        key: 'addContent',
	        value: function addContent(node, content, type) {
	            if (type === 'element') {
	                content.render(node);
	            } else {
	                _get(Object.getPrototypeOf(PlainDomFragment.prototype), 'addContent', this).call(this, node, content);
	            }
	        }
	    }, {
	        key: 'updateContent',
	        value: function updateContent(node, content, type) {
	            if (type !== 'element') {
	                _get(Object.getPrototypeOf(PlainDomFragment.prototype), 'updateContent', this).call(this, node, content);
	            }
	        }
	    }]);

	    return PlainDomFragment;
	}(_PlainDom3.default);

	PlainDomFragment.fragmentData = {
	    name: null,
	    attributes: null,
	    children: null,
	    options: null
	};
	PlainDomFragment.options = {
	    content: true,
	    type: true,
	    from: true,
	    to: true,
	    'for-each': true
	};
	exports.default = PlainDomFragment;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var T_UNDEF = void 0;
	var T_FUNC = 'function';
	var DOC = document;

	var PlainDom = function () {
	    function PlainDom() {
	        _classCallCheck(this, PlainDom);
	    }

	    _createClass(PlainDom, [{
	        key: 'createElement',
	        value: function createElement(name) {
	            var attributes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            var element = DOC.createElement(name);
	            var props = Object.keys(attributes);

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = props[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var prop = _step.value;

	                    var value = attributes[prop];
	                    element.setAttribute(prop, value === T_UNDEF ? prop : value);
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

	            return element;
	        }
	    }, {
	        key: 'updateElement',
	        value: function updateElement(element) {
	            var attributes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            var attributesExists = PlainDom.getDomListIterator(element.attributes);
	            var attribute = void 0;

	            while (attribute = attributesExists()) {
	                var name = attribute.nodeName;
	                var value = attribute.nodeValue;

	                if (T_UNDEF === attributes[name]) {
	                    element.removeAttribute(name);
	                } else if (value !== attributes[name]) {
	                    element.setAttribute(name, attributes[name]);
	                }
	            }
	        }
	    }, {
	        key: 'createTextNode',
	        value: function createTextNode(content) {
	            return DOC.createTextNode('' + content);
	        }
	    }, {
	        key: 'addContent',
	        value: function addContent(node, content) {
	            node.appendChild(DOC.createTextNode('' + content));
	        }
	    }, {
	        key: 'updateContent',
	        value: function updateContent(node, content) {
	            this.removeContent(node);
	            this.addContent(node, content);
	        }
	    }, {
	        key: 'removeContent',
	        value: function removeContent(node) {
	            while (node.firstChild) {
	                node.removeChild(node.firstChild);
	            }
	        }
	    }], [{
	        key: 'createDocumentFragment',
	        value: function createDocumentFragment(template) {
	            var fragment = DOC.createDocumentFragment();

	            if (template) {
	                var elem = DOC.createElement('div');
	                elem.innerHTML = template;
	                fragment.appendChild(elem);
	            }

	            return fragment;
	        }
	    }, {
	        key: 'createTemplateFromString',
	        value: function createTemplateFromString(html) {
	            return this.createDocumentFragment(html).firstChild;
	        }
	    }, {
	        key: 'getDomListIterator',
	        value: function getDomListIterator(list) {
	            var i = 0;
	            var count = list.length;

	            return function () {
	                return i < count ? list[i++] : null;
	            };
	        }
	    }]);

	    return PlainDom;
	}();

	exports.default = PlainDom;

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Plain2 = __webpack_require__(6);

	var _Plain3 = _interopRequireDefault(_Plain2);

	var _button = __webpack_require__(7);

	var _button2 = _interopRequireDefault(_button);

	var _button3 = __webpack_require__(8);

	var _button4 = _interopRequireDefault(_button3);

	var _PlainComponent = __webpack_require__(1);

	var _PlainComponent2 = _interopRequireDefault(_PlainComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Page = function (_Plain) {
	    _inherits(Page, _Plain);

	    function Page() {
	        _classCallCheck(this, Page);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Page).call(this));

	        _this.onClick = function () {
	            _this.data.counter.first++;
	            _this.update();
	        };

	        _this.button = new _PlainComponent2.default(_button2.default, _button4.default);

	        _this.setData({
	            className: 'main-page',
	            counter: {
	                first: 1
	            },
	            title: 'Page title',
	            header: 'Page header',
	            body: 'Page content here.',
	            footer: 'Page footer',
	            button: _this.button,
	            list: {
	                items: [{
	                    name: 'One'
	                }, {
	                    name: 'Two'
	                }, {
	                    name: 'Three'
	                }]
	            }
	        });
	        return _this;
	    }

	    _createClass(Page, [{
	        key: 'onMount',
	        value: function onMount(node) {
	            console.log('!!! Mounted Page');
	            node.querySelector('.button').addEventListener('click', this.onClick);

	            this.setData({
	                className: 'main-page main-page_loaded',
	                header: 'Update page header!!!',
	                list: {
	                    items: [{
	                        name: '111'
	                    }, {
	                        name: '222'
	                    }]
	                }
	            });
	        }
	    }]);

	    return Page;
	}(_Plain3.default);

	exports.default = Page;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _PlainDom = __webpack_require__(3);

	var _PlainDom2 = _interopRequireDefault(_PlainDom);

	var _PlainObserver = __webpack_require__(4);

	var _PlainObserver2 = _interopRequireDefault(_PlainObserver);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Plain = function () {
	    function Plain() {
	        _classCallCheck(this, Plain);

	        Object.defineProperty(this, 'data', {
	            enumerable: true,
	            configurable: false,
	            writable: false,
	            value: {}
	        });
	    }

	    _createClass(Plain, [{
	        key: 'setData',
	        value: function setData(data) {
	            Object.assign(this.data, data);
	        }
	    }, {
	        key: 'getData',
	        value: function getData() {
	            return this.data;
	        }
	    }, {
	        key: 'onBeforeMount',
	        value: function onBeforeMount() {}
	    }, {
	        key: 'onMount',
	        value: function onMount() {}
	    }, {
	        key: 'update',
	        value: function update() {
	            _PlainObserver2.default.update(this.getData());
	        }
	    }]);

	    return Plain;
	}();

	exports.default = Plain;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Plain2 = __webpack_require__(6);

	var _Plain3 = _interopRequireDefault(_Plain2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Button = function (_Plain) {
	    _inherits(Button, _Plain);

	    function Button() {
	        _classCallCheck(this, Button);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Button).call(this));

	        _this.onClick = function () {
	            _this.data.label = 'Clicked!!!';
	            _this.update();
	        };

	        _this.setData({
	            label: 'Click here!!!'
	        });
	        return _this;
	    }

	    _createClass(Button, [{
	        key: 'onMount',
	        value: function onMount(node) {
	            console.log('!!! Mounted Button');
	            node.addEventListener('click', this.onClick);
	        }
	    }]);

	    return Button;
	}(_Plain3.default);

	exports.default = Button;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<button class=\"button\" content=\"label\"></button>";

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "<div class=\":className\">\r\n    <h1>\r\n        <span content=\"title\"></span> №<span from=\"counter\" content=\"first\"></span>\r\n    </h1>\r\n    <div class=\"header\" content=\"header\"></div>\r\n    <p class=\"content\">\r\n        <span content=\"body\"></span>\r\n        <span content=\"button\" type=\"element\"></span>\r\n    </p>\r\n    <ul class=\"list\" from=\"list\" for-each=\"items\" to=\"item\">\r\n        <li from=\"item\">\r\n            <span content=\"name\"></span>\r\n        </li>\r\n    </ul>\r\n    <div class=\"footer\" content=\"footer\"></div>\r\n</div>";

/***/ }
/******/ ]);