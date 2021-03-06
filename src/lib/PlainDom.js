import { toArray, isNullOrUndef, T_UNDEF } from './utils';

const doc = document;
const reContentTypeHTML = /^\s*text\/html\s*(?:;|$)/i;

let DOMParserClass = null;

function createHTMLDoc(source) {
    let htmlDoc = doc.implementation.createHTMLDocument();
    htmlDoc.body.innerHTML = source;

    return htmlDoc;
}

function getDOMParser() {

    if (DOMParserClass) {
        return new DOMParserClass();
    }

    let nativeParser = window.DOMParser;
    let nativeHTMLParser = null;

    if (nativeParser) {
        try {
            if ((new DOMParser()).parseFromString('', 'text/html')) {
                nativeHTMLParser = nativeParser;
            }
        } catch (ex) {}
    }

    if (nativeHTMLParser) {
        DOMParserClass = nativeHTMLParser;
    } else if (nativeParser) {

        let parseFromString = nativeParser.prototype.parseFromString;

        nativeParser.prototype.parseFromString = function(source, type) {
            if (reContentTypeHTML.test(type)) {
                return createHTMLDoc(source);
            } else {
                return parseFromString.apply(this, arguments);
            }
        };

        DOMParserClass = nativeParser;

    } else {
        DOMParserClass = function () {
            this.parseFromString = function (source, type) {
                if (reContentTypeHTML.test(type)) {
                    return createHTMLDoc(source);
                } else {
                    throw new Error('Unknown content-type: "' + type + '"');
                }
            }
        }
    }

    return new DOMParserClass();
}

function parseFromString(source) {
    return getDOMParser().parseFromString(source, 'text/html').body;
}

export default class PlainDom {

    static createDocument(source) {
        return createHTMLDoc(source);
    }

    static createDocumentFragment(source) {
        let frag = doc.createDocumentFragment();

        if (source !== T_UNDEF) {
            let content;

            if (this.isDomNode(source)) {
                content = source;
            } else {
                content = parseFromString(source);
            }

            frag.appendChild(content);
        }

        return frag;
    }

    static createElement(name, attributes) {
        let elem = doc.createElement(name);

        if (attributes) {
            let keys = Object.keys(attributes);
            for (let key of keys) {
                let value = attributes[key];
                if (!isNullOrUndef(value)) {
                    elem.setAttribute(key, (value === T_UNDEF ? key : value));
                }
            }
        }

        return elem;
    }

    static createTextNode(str) {
        return doc.createTextNode(str);
    }

    static setText(textNode, str) {
        textNode.nodeValue = str;
    }

    static getText(textNode) {
        return textNode.nodeValue;
    }

    static appendChild(node, child) {
        !this.isDomNode(child) && (child = doc.createTextNode(child));
        node.appendChild(child);
    }

    static appendChildren(node, children) {
        let list = toArray(children);
        let frag = this.createDocumentFragment();

        for (let item of list) {
            this.appendChild(frag, item);
        }

        node.appendChild(frag);
    }

    static removeChild(node, child) {
        node.removeChild(child);
    }

    static removeChildren(node, children) {
        if (!children) {
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
        } else {
            let list = toArray(children);

            for (let item of list) {
                this.removeChild(node, item);
            }
        }
    }

    static replaceChild(node, newChild, oldChild) {
        return node.replaceChild(newChild, oldChild);
    }

    static getChildren(node, type) {
        if (!type) {
            return toArray(node.childNodes);
        } else {
            return toArray(node.childNodes).filter(node => {
                return node.nodeType === type;
            });
        }
    }

    static getParent(node) {
        return node.parentNode;
    }

    static setAttribute(node, name, value) {
        name === 'class' ? this.setClassName(node, value) : node.setAttribute(name, value);
    }

    static removeAttribute(node, name) {
        node.removeAttribute(name);
    }

    static getAttributes(node) {
        return toArray(node.attributes);
    }

    static setAttributes(node, attributes) {
        let list = Object.keys(attributes);

        for (let name of list) {
            let value = attributes[name];

            if (name === 'class') {
                this.setClassName(node, value);

            } else if (name === 'checked' && node.checked !== T_UNDEF) {
                node.checked = !!value;

            } else if (name === 'disabled' && node.disabled !== T_UNDEF) {
                node.disabled = !!value;

            } else if (name === 'selected' && node.nodeName === 'option') {
                node.selected = !!value;

            } else if (isNullOrUndef(value)) {
                node.removeAttribute(name);
            } else {
                node.setAttribute(name, value);
            }
        }
    }

    static setClassName(node, className) {
        node.className = className || '';
    }

    static isDomNode(elem) {
        return elem !== null && typeof elem === 'object' && elem.nodeType && elem.nodeType > 0;
    }

    static toArray(nodelist) {
        return this.isDomNode(nodelist) ? [nodelist] : toArray(nodelist);
    }

}