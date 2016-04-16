const T_UNDEF = void(0);
const T_FUNC = 'function';
const DOC = document;

export default class PlainDom {

    static createDocumentFragment(template) {
        let fragment = DOC.createDocumentFragment();

        if (template) {
            let elem = DOC.createElement('div');
            elem.innerHTML = template;
            fragment.appendChild(elem);
        }

        return fragment;
    }

    static createTemplateFromString(html) {
        return this.createDocumentFragment(html).firstChild;
    }

    static getDomListIterator(list) {
        let i = 0;
        let count = list.length;

        return function() {
            return i < count ? list[i++] : null;
        };
    }

    createElement(name, attributes = {}) {
        let element = DOC.createElement(name);
        let props = Object.keys(attributes);

        for (let prop of props) {
            let value = attributes[prop];
            element.setAttribute(prop, (value === T_UNDEF ? prop : value));
        }

        return element;
    }

    updateElement(element, attributes = {}) {
        let attributesExists = PlainDom.getDomListIterator(element.attributes);
        let attribute;

        while (attribute = attributesExists()) {
            let name = attribute.nodeName;
            let value = attribute.nodeValue;

            if (T_UNDEF === attributes[name]) {
                element.removeAttribute(name);
            } else if (value !== attributes[name]) {
                element.setAttribute(name, attributes[name]);
            }
        }
    }

    createTextNode(content) {
        return DOC.createTextNode('' + content);
    }

    addContent(node, content) {
        node.appendChild(
            DOC.createTextNode('' + content)
        );
    }

    updateContent(node, content) {
        this.removeContent(node);
        this.addContent(node, content);
    }

    removeContent(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

}