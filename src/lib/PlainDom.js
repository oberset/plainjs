import { isHTMLElement, toArray } from './utils';

const T_UNDEFINED = void(0);
const doc = document;

export default class PlainDom {

    static createDocumentFragment(content) {
        let frag = doc.createDocumentFragment();

        if (content) {
            if (!isHTMLElement(content)) {
                let elem = doc.createElement('div');
                elem.innerHTML = '' + content;
                content = elem;
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
                elem.setAttribute(key, (value === T_UNDEFINED ? key : value));
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
        !isHTMLElement(child) && (child = doc.createTextNode(child));
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
            let name = attribute.nodeName;
            let value = attribute.nodeValue;

            if (T_UNDEFINED === attributes[name]) {
                node.removeAttribute(name);
            } else if (value !== attributes[name]) {
                node.setAttribute(name, attributes[name]);
            }
        }
    }

    static toArray(nodelist) {
        return isHTMLElement(nodelist) ? [nodelist] : toArray(nodelist);
    }

}