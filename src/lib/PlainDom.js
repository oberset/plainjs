import { toArray, T_UNDEF } from './utils';

const doc = document;
let domParser = null;

export default class PlainDom {

    static createDocumentFragment(source) {
        let frag = doc.createDocumentFragment();

        if (source !== T_UNDEF) {
            let content;

            if (this.isDomNode(source)) {
                content = source;
            } else {
                if ('DOMParser' in window) {
                    content = (domParser || (domParser = new DOMParser())).parseFromString(source, 'text/html').body;
                } else {
                    content = doc.createElement('div');
                    content.innerHTML = source;
                }
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
                elem.setAttribute(key, (value === T_UNDEF ? key : value));
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

    static removeChildren(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
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

    static getAttributes(node) {
        return toArray(node.attributes);
    }

    static setAttributes(node, attributes) {
        let list = toArray(node.attributes);

        for (let attribute of list) {
            let name = attribute.name;
            let value = attribute.value;

            if (T_UNDEF === attributes[name]) {
                node.removeAttribute(name);
            } else if (value !== attributes[name]) {
                node.setAttribute(name, attributes[name]);
            }
        }
    }

    static isDomNode(elem) {
        return typeof elem === 'object' && elem.nodeType && elem.nodeType > 0;
    }

    static toArray(nodelist) {
        return this.isDomNode(nodelist) ? [nodelist] : toArray(nodelist);
    }

}