import { isNode, toArray } from './utils';

const T_UNDEFINED = void(0);
const doc = document;

export default class PlainDom {

    static createDocumentFragment(content) {
        let frag = doc.createDocumentFragment();

        if (content) {
            if (!isNode(content)) {
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

    static createTextNode(text) {
        return doc.createTextNode('' + text);
    }

    static appendChild(node, child) {
        !isNode(child) && (child = doc.createTextNode('' + child));
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

    static getChildren(node) {
        return toArray(node.childNodes);
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
        return isNode(nodelist) ? [nodelist] : toArray(nodelist);
    }

}