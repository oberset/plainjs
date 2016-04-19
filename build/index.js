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

	var _page = __webpack_require__(6);

	var _page2 = _interopRequireDefault(_page);

	var _page3 = __webpack_require__(10);

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

	var _PlainDom = __webpack_require__(2);

	var _PlainDom2 = _interopRequireDefault(_PlainDom);

	var _PlainRenderer = __webpack_require__(4);

	var _PlainRenderer2 = _interopRequireDefault(_PlainRenderer);

	var _PlainObserver = __webpack_require__(5);

	var _PlainObserver2 = _interopRequireDefault(_PlainObserver);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PlainComponent = function () {
	    function PlainComponent(ProviderClass, template) {
	        var data = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	        _classCallCheck(this, PlainComponent);

	        this.provider = ProviderClass;
	        this.template = template;
	        this.data = data;
	    }

	    _createClass(PlainComponent, [{
	        key: 'render',
	        value: function render(node) {
	            var _this = this;

	            var ProviderClass = this.provider;
	            var template = this.template;
	            var list = _PlainDom2.default.toArray(node);

	            list.forEach(function (node) {
	                var provider = new ProviderClass(_this.data);
	                var data = provider.getData();
	                var fragment = new _PlainRenderer2.default(template);

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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var T_UNDEFINED = void 0;
	var doc = document;

	var PlainDom = function () {
	    function PlainDom() {
	        _classCallCheck(this, PlainDom);
	    }

	    _createClass(PlainDom, null, [{
	        key: 'createDocumentFragment',
	        value: function createDocumentFragment(content) {
	            var frag = doc.createDocumentFragment();

	            if (content) {
	                if (!(0, _utils.isNode)(content)) {
	                    var elem = doc.createElement('div');
	                    elem.innerHTML = '' + content;
	                    content = elem;
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
	                        elem.setAttribute(key, value === T_UNDEFINED ? key : value);
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
	            !(0, _utils.isNode)(child) && (child = doc.createTextNode(child));
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
	        value: function removeChildren(node) {
	            while (node.firstChild) {
	                node.removeChild(node.firstChild);
	            }
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
	        key: 'getAttributes',
	        value: function getAttributes(node) {
	            return (0, _utils.toArray)(node.attributes);
	        }
	    }, {
	        key: 'setAttributes',
	        value: function setAttributes(node, attributes) {
	            var list = (0, _utils.toArray)(node.attributes);

	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = list[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var attribute = _step3.value;

	                    var name = attribute.nodeName;
	                    var value = attribute.nodeValue;

	                    if (T_UNDEFINED === attributes[name]) {
	                        node.removeAttribute(name);
	                    } else if (value !== attributes[name]) {
	                        node.setAttribute(name, attributes[name]);
	                    }
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
	        key: 'toArray',
	        value: function toArray(nodelist) {
	            return (0, _utils.isNode)(nodelist) ? [nodelist] : (0, _utils.toArray)(nodelist);
	        }
	    }]);

	    return PlainDom;
	}();

	exports.default = PlainDom;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isObject = isObject;
	exports.copyObject = copyObject;
	exports.copyArray = copyArray;
	exports.toArray = toArray;
	exports.isNode = isNode;
	function isObject(obj) {
	    return Object.prototype.toString.call(obj) === "[object Object]";
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

	function toArray(list) {
	    return Array.from(list);
	}

	function isNode(test) {
	    return test instanceof Node;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
	    function PlainRenderer(template) {
	        _classCallCheck(this, PlainRenderer);

	        this.template = this.createTemplateFromString(template);
	        this.fragment = null;
	        this.node = null;
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
	        value: function update(data) {
	            this.data = data;

	            if (null === this.fragment) {
	                this.fragment = this.createFragmentFromTemplate();
	                this.node = this.createFragmentNode();
	            } else {
	                console.time('updateFragment');
	                this.updateFragment();
	                console.timeEnd('updateFragment');
	            }

	            this.previousData = (0, _utils.copyObject)(this.data);
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

	                    var attributeName = attribute.nodeName.toLowerCase();
	                    var attributeValue = attribute.nodeValue;

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
	            children.length && (result.children = children);

	            return result;
	        }
	    }, {
	        key: 'createFragmentNode',
	        value: function createFragmentNode(fragment, data) {
	            var _this = this;

	            fragment = fragment || this.fragment;
	            data = data || this.data;

	            if (fragment.type === 'string') {
	                fragment.node = _PlainDom2.default.createTextNode(fragment.value);
	                return fragment.node;
	            }

	            var options = fragment.options || {};

	            if (options.from) {
	                data = data[options.from];
	            }

	            this.setAttributesData(fragment, data);

	            var node = _PlainDom2.default.createElement(fragment.name, fragment.attributes);

	            if (options.content) {
	                this.addContent(node, fragment, data[options.content], options.type);
	            }

	            if (fragment.children) {
	                if (options['for-each']) {
	                    (function () {
	                        var to = options['to'] || 'item';
	                        var list = data[options['for-each']];
	                        var fragments = [];

	                        list.forEach(function (item, i) {
	                            var itemChildren = (0, _utils.copyArray)(fragment.children);
	                            var itemData = Object.assign({}, data);
	                            itemData[to] = _extends({ key: i }, item);

	                            _this.addChildren(node, itemData, itemChildren);
	                            fragments.push(itemChildren);
	                        });

	                        fragment.renderedChildren = fragments;
	                    })();
	                } else {
	                    this.addChildren(node, data, fragment.children);
	                }
	            }

	            fragment.node = node;
	            return node;
	        }
	    }, {
	        key: 'getUpdatedItems',
	        value: function getUpdatedItems() {
	            var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	            var previousItems = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

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
	        key: 'addChildren',
	        value: function addChildren(node, data, fragmentChildren) {
	            var _this2 = this;

	            var children = fragmentChildren.map(function (item) {
	                return _this2.createFragmentNode(item, data);
	            }).filter(function (item) {
	                return item && true;
	            });
	            _PlainDom2.default.appendChildren(node, children);
	        }
	    }, {
	        key: 'updateChildren',
	        value: function updateChildren(list, data, previousData) {
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = list[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var child = _step3.value;

	                    this.updateFragment(child, data, previousData);
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
	        key: 'deleteChildren',
	        value: function deleteChildren(node, list) {
	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = list[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var child = _step4.value;

	                    this.deleteFragment(node, child);
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
	        key: 'setAttributesData',
	        value: function setAttributesData(fragment, data) {
	            if (fragment.hasAttributesData) {
	                var attributes = Object.keys(fragment.attributesData);
	                var _iteratorNormalCompletion5 = true;
	                var _didIteratorError5 = false;
	                var _iteratorError5 = undefined;

	                try {
	                    for (var _iterator5 = attributes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                        var key = _step5.value;

	                        var value = fragment.attributesData[key];
	                        fragment.attributes[key] = data[value.substring(1)];
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
	        }
	    }, {
	        key: 'deleteFragment',
	        value: function deleteFragment(node, fragment) {
	            fragment.node && _PlainDom2.default.removeChild(node, fragment.node);
	        }
	    }, {
	        key: 'updateFragment',
	        value: function updateFragment(fragment, data, previousData) {
	            var _this3 = this;

	            fragment = fragment || this.fragment;
	            data = data || this.data;
	            previousData = previousData || this.previousData;

	            if (fragment.type === 'string') {
	                return;
	            }

	            var node = fragment.node;
	            var options = fragment.options;

	            if (options.from) {
	                data = data[options.from];
	                previousData = previousData[options.from];
	            }

	            this.setAttributesData(fragment, data);
	            _PlainDom2.default.setAttributes(node, fragment.attributes);

	            if (options.content) {
	                var content = data[options.content];
	                this.updateContent(fragment, content, options.type);
	            }

	            if (fragment.children) {
	                if (options['for-each']) {
	                    (function () {
	                        var to = options['to'] || 'item';
	                        var list = data[options['for-each']];
	                        var prevList = previousData[options['for-each']];
	                        var items = _this3.getUpdatedItems(list, prevList);
	                        var fragments = [];

	                        items.forEach(function (item, i) {
	                            var children = fragment.renderedChildren[i] || [];

	                            switch (item.type) {
	                                case ITEMS_TO_DELETE:
	                                    _this3.deleteChildren(node, children);
	                                    break;

	                                case ITEMS_TO_ADD:
	                                    var itemChildren = (0, _utils.copyArray)(fragment.children);
	                                    (function () {
	                                        var itemData = Object.assign({}, data);
	                                        itemData[to] = _extends({ key: i }, item.data);

	                                        _this3.addChildren(node, itemData, itemChildren);
	                                        fragments.push(itemChildren);
	                                    })();
	                                    break;

	                                case ITEMS_TO_UPDATE:
	                                    (function () {
	                                        var itemData = Object.assign({}, data);
	                                        itemData[to] = _extends({ key: i }, item.data);

	                                        var itemPreviousData = Object.assign({}, previousData);
	                                        itemPreviousData[to] = item.previous;

	                                        _this3.updateChildren(children, itemData, itemPreviousData);
	                                        fragments.push(children);
	                                    })();
	                                    break;

	                                default:
	                                    fragments.push(children);
	                            }
	                        });

	                        fragment.renderedChildren = fragments;
	                    })();
	                } else {
	                    this.updateChildren(fragment.children, data, previousData);
	                }
	            }
	        }
	    }, {
	        key: 'addContent',
	        value: function addContent(node, fragment, content, type) {
	            if (type === 'element') {
	                content.render(node);
	                fragment.content = {
	                    type: type,
	                    component: content
	                };
	            } else {
	                var contentNode = _PlainDom2.default.createTextNode(content);
	                _PlainDom2.default.appendChild(node, contentNode);
	                fragment.content = {
	                    type: type,
	                    node: contentNode
	                };
	            }
	        }
	    }, {
	        key: 'updateContent',
	        value: function updateContent(fragment, content, type) {
	            if (fragment.content.type !== type) {
	                // todo change type
	            } else if (type !== 'element') {
	                    var node = fragment.content.node;
	                    var storedContent = _PlainDom2.default.getText(node);
	                    storedContent !== content && _PlainDom2.default.setText(node, content);
	                }
	        }
	    }]);

	    return PlainRenderer;
	}();

	PlainRenderer.fragmentData = {
	    name: null,
	    attributes: null,
	    content: null,
	    children: null,
	    renderedChildren: null,
	    options: null
	};
	PlainRenderer.options = {
	    content: true,
	    type: true,
	    from: true,
	    to: true,
	    'for-each': true
	};
	exports.default = PlainRenderer;

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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Plain2 = __webpack_require__(7);

	var _Plain3 = _interopRequireDefault(_Plain2);

	var _button = __webpack_require__(8);

	var _button2 = _interopRequireDefault(_button);

	var _button3 = __webpack_require__(9);

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

	        _this.button = new _PlainComponent2.default(_button2.default, _button4.default, {
	            label: 'Click here!!!'
	        });

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
	            node.querySelector('.button').addEventListener('click', this.onClick);

	            var items = [];

	            for (var i = 0; i < 100; i++) {
	                items.push({
	                    name: 'Updated ' + i
	                });
	            }

	            this.setData({
	                className: 'main-page main-page_loaded',
	                header: 'Update page header!!!',
	                list: {
	                    items: items
	                }
	            });
	        }
	    }]);

	    return Page;
	}(_Plain3.default);

	exports.default = Page;

/***/ },
/* 7 */
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

	var Plain = function () {
	    function Plain() {
	        var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, Plain);

	        this.defaultProps = {};

	        if (!(0, _utils.isObject)(data)) {
	            throw new Error('Passed "data" must be a plain object');
	        }

	        var defaultProps = (0, _utils.copyObject)(this.defaultProps);
	        var props = (0, _utils.copyObject)(data, defaultProps);

	        Object.defineProperty(this, 'data', {
	            enumerable: true,
	            configurable: false,
	            writable: false,
	            value: props
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Plain2 = __webpack_require__(7);

	var _Plain3 = _interopRequireDefault(_Plain2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Button = function (_Plain) {
	    _inherits(Button, _Plain);

	    function Button() {
	        var _Object$getPrototypeO;

	        var _temp, _this, _ret;

	        _classCallCheck(this, Button);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Button)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.defaultProps = {
	            label: ''
	        }, _this.onClick = function () {
	            _this.update();
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }

	    _createClass(Button, [{
	        key: 'onMount',
	        value: function onMount(node) {
	            node.addEventListener('click', this.onClick);
	        }
	    }]);

	    return Button;
	}(_Plain3.default);

	exports.default = Button;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "<button class=\"button\" content=\"label\"></button>";

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div class=\":className\">\r\n    <h1>\r\n        <span content=\"title\"></span> №<span from=\"counter\" content=\"first\"></span>\r\n    </h1>\r\n    <div class=\"header\" content=\"header\"> <b>Static content inside header container</b></div>\r\n    <p class=\"content\">\r\n        <em>Static content here</em><br>\r\n        <span content=\"body\"> <b>Static content inside body container</b></span>\r\n        <span content=\"button\" type=\"element\"> <b>Static content inside button container</b></span>\r\n    </p>\r\n    <ul class=\"list\" from=\"list\" for-each=\"items\" to=\"item\">\r\n        <li from=\"item\">\r\n            <p class=\"list-item\">\r\n                <b>Item <span content=\"key\"></span></b>: <span content=\"name\"></span>\r\n            </p>\r\n        </li>\r\n    </ul>\r\n    <div class=\"footer\" content=\"footer\"></div>\r\n</div>";

/***/ }
/******/ ]);