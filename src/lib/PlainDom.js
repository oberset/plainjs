const T_UNDEF = void(0);
const T_FUNC = 'function';
const DOC = document;

export default class PlainDom {

    static createDocumentFragment(template) {
        let elem = DOC.createElement('div');
        let fragment = DOC.createDocumentFragment();

        elem.innerHTML = template;
        fragment.appendChild(elem);

        return fragment;
    }

    static createTemplateFromString(html) {
        return this.createDocumentFragment(html).firstChild;
    }

    createElementNode(name, attributes = {}) {
        let element = DOC.createElement(name);
        let props = Object.keys(attributes);

        for (let prop of props) {
            let value = attributes[prop];
            element.setAttribute(prop, (value === T_UNDEF ? prop : value));
        }

        return element;
    }

    addContent(node, content) {
        node.appendChild(
            DOC.createTextNode('' + content)
        );
    }

    getDomListIterator(list) {
        let i = 0;
        let count = list.length;

        return function() {
            return i < count ? list[i++] : null;
        };
    }

}