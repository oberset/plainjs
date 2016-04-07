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

	var _PlainDomFragment = __webpack_require__(1);

	var _PlainDomFragment2 = _interopRequireDefault(_PlainDomFragment);

	var _page = __webpack_require__(3);

	var _page2 = _interopRequireDefault(_page);

	var _page3 = __webpack_require__(7);

	var _page4 = _interopRequireDefault(_page3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.time('render');
	_PlainDomFragment2.default.render(_page2.default, _page4.default, document.body);
	console.timeEnd('render');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _PlainDom2 = __webpack_require__(2);

	var _PlainDom3 = _interopRequireDefault(_PlainDom2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PlainDomFragment = function (_PlainDom) {
	    _inherits(PlainDomFragment, _PlainDom);

	    _createClass(PlainDomFragment, null, [{
	        key: 'render',
	        value: function render(Component, template, node) {
	            var component = new Component();
	            var data = component.getData();
	            var fragment = new PlainDomFragment(this.createTemplateFromString(template));
	            fragment.updateData(data);
	            node.appendChild(fragment.node);

	            return fragment;
	        }
	    }]);

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
	        key: 'updateData',
	        value: function updateData(data) {
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
	            return str.replace(/^(\s?)[\r\n\t]+[\s\t]*/, "$1") || '';
	        }
	    }, {
	        key: 'createFragmentFromElement',
	        value: function createFragmentFromElement(root) {
	            var result = Object.assign({}, PlainDomFragment.fragmentData);
	            var options = {};

	            var attributesIterator = this.getDomListIterator(root.attributes);
	            var attribute = void 0;
	            var attributes = {};

	            while (attribute = attributesIterator()) {
	                var attributeName = attribute.nodeName.toLowerCase();
	                var attributeValue = attribute.nodeValue;

	                if (PlainDomFragment.options[attributeName]) {
	                    options[attributeName] = attributeValue;
	                } else {
	                    attributes[attributeName] = attributeValue;
	                }
	            }

	            var childrenIterator = this.getDomListIterator(root.childNodes);
	            var child = void 0;
	            var children = [];

	            while (child = childrenIterator()) {
	                var fragment = this.createFragmentFromTemplate(child);
	                fragment && children.push(fragment);
	            }

	            result.name = root.nodeName.toLowerCase();
	            result.attributes = attributes;
	            result.options = options;

	            children.length && (result.children = children);

	            return result;
	        }
	    }, {
	        key: 'createFragmentNode',
	        value: function createFragmentNode(fragment, data) {
	            fragment = fragment || this.fragment;
	            data = data || this.data;

	            var node = this.createElementNode(fragment.name, fragment.attributes);
	            var options = fragment.options || {};

	            if (options.from) {
	                data = data[options.from];
	            }

	            if (options.content) {
	                this.addContent(node, data[options.content]);
	            }

	            if (fragment.children) {
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = fragment.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

	            return node;
	        }
	    }, {
	        key: 'updateFragment',
	        value: function updateFragment() {}
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
	    from: true,
	    'for-each': true
	};
	exports.default = PlainDomFragment;

/***/ },
/* 2 */
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
	        key: 'createElementNode',
	        value: function createElementNode(name) {
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
	        key: 'addContent',
	        value: function addContent(node, content) {
	            node.appendChild(DOC.createTextNode(content.toString()));
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
	    }], [{
	        key: 'createDocumentFragment',
	        value: function createDocumentFragment(template) {
	            var elem = DOC.createElement('div');
	            var fragment = DOC.createDocumentFragment();

	            elem.innerHTML = template;
	            fragment.appendChild(elem);

	            return fragment;
	        }
	    }, {
	        key: 'createTemplateFromString',
	        value: function createTemplateFromString(html) {
	            return this.createDocumentFragment(html).firstChild;
	        }
	    }]);

	    return PlainDom;
	}();

	exports.default = PlainDom;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Plain2 = __webpack_require__(4);

	var _Plain3 = _interopRequireDefault(_Plain2);

	var _button = __webpack_require__(5);

	var _button2 = _interopRequireDefault(_button);

	var _button3 = __webpack_require__(6);

	var _button4 = _interopRequireDefault(_button3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Page = function (_Plain) {
	    _inherits(Page, _Plain);

	    function Page() {
	        _classCallCheck(this, Page);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Page).call(this));

	        _this.data = {
	            button: {
	                component: _button2.default,
	                template: _button4.default
	            },
	            title: 'Page title',
	            header: 'Page header',
	            body: 'Page content here.',
	            footer: 'Page footer'
	        };
	        return _this;
	    }

	    _createClass(Page, [{
	        key: 'onMount',
	        value: function onMount() {
	            console.log('!!! Mounted Page');
	        }
	    }]);

	    return Page;
	}(_Plain3.default);

	exports.default = Page;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _PlainDom = __webpack_require__(2);

	var _PlainDom2 = _interopRequireDefault(_PlainDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Plain = function () {
	    function Plain() {
	        _classCallCheck(this, Plain);
	    }

	    _createClass(Plain, [{
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
	    }]);

	    return Plain;
	}();

	exports.default = Plain;

/***/ },
/* 5 */
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

	var Button = function (_Plain) {
	    _inherits(Button, _Plain);

	    function Button() {
	        _classCallCheck(this, Button);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Button).call(this));

	        _this.data = {
	            label: 'Click here!!!'
	        };
	        return _this;
	    }

	    _createClass(Button, [{
	        key: 'onMount',
	        value: function onMount() {
	            console.log('!!! Mounted Button');
	        }
	    }]);

	    return Button;
	}(_Plain3.default);

	exports.default = Button;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<button class=\"button\" content=\"label\"></button>";

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<div class=\"page\">\r\n    <h1 content=\"title\"></h1>\r\n    <div class=\"header\" content=\"header\"></div>\r\n    <p content=\"body\"></p>\r\n    <div content=\"button\"></div>\r\n    <div class=\"footer\" content=\"footer\"></div>\r\n</div>";

/***/ }
/******/ ]);