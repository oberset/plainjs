import PlainDom from './PlainDom';
import PlainObserver from './PlainObserver';

export default class PlainRenderer {

    static fragmentData = {
        name: null,
        attributes: null,
        children: null,
        options: null
    };

    static options = {
        content: true,
        type: true,
        from: true,
        to: true,
        'for-each': true
    };

    constructor(template) {
        this.template = this.createTemplateFromString(template);
        this.fragment = null;
        this.node = null;
        this.data = {};
    }

    createTemplateFromString(html) {
        return PlainDom.createDocumentFragment(html).firstChild;
    }

    update(data) {
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

    createFragmentFromTemplate(template) {
        let root = template || this.template.firstChild;
        let result;

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

    createFragmentFromString(str) {
        return {
            type: 'string',
            value: str.replace(/^(\s?)[\r\n\t]+[\s\t]*/, "$1") || ''
        };
    }

    createFragmentFromElement(root) {
        let result = Object.assign({}, PlainRenderer.fragmentData);
        let options = {};

        let attributesIterator = PlainDom.getAttributes(root);
        let attribute;
        let attributes = {};
        let attributesData = {};
        let hasAttributesData = false;

        for (let attribute of attributesIterator) {
            let attributeName = attribute.nodeName.toLowerCase();
            let attributeValue = attribute.nodeValue;

            if (attributeValue.indexOf(':') === 0) {
                attributesData[attributeName] = attributeValue;
                !hasAttributesData && (hasAttributesData = true);
            } else if (PlainRenderer.options[attributeName]) {
                options[attributeName] = attributeValue;
            } else {
                attributes[attributeName] = attributeValue;
            }
        }

        let childrenIterator = PlainDom.getChildren(root);
        let child;
        let children = [];

        for (let child of childrenIterator) {
            let fragment = this.createFragmentFromTemplate(child);
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

    createFragmentNode(fragment, data) {
        fragment = fragment || this.fragment;
        data = data || this.data;

        if (fragment.type === 'string') {
            fragment.node = PlainDom.createTextNode(fragment.value);
            return fragment.node;
        }

        let options = fragment.options || {};

        if (options.from) {
            data = data[options.from];
        }

        this.setAttributesData(fragment, data);

        let node = PlainDom.createElement(fragment.name, fragment.attributes);

        if (options.content) {
            this.addContent(node, data[options.content], options.type);
        }

        if (fragment.children) {
            if (options['for-each']) {
                let to = options['to'] || 'item';
                let list = data[options['for-each']];
                let docFragment = PlainDom.createDocumentFragment();

                list.forEach((item) => {
                    let itemData = Object.assign({}, data);
                    itemData[to] = item;

                    this.addChildren(docFragment, itemData, fragment.children);
                });

                PlainDom.appendChild(node, docFragment);
            } else {
                this.addChildren(node, data, fragment.children);
            }
        }

        fragment.node = node;
        return node;
    }

    getDataId(data) {
        return typeof data === 'object' ? (data.key || JSON.stringify(data)) : ('' + data).toLowerCase();
    }

    addChildren(node, data, list) {
        PlainDom.appendChildren(node, list.map(
            (item) => this.createFragmentNode(item, data)
        ).filter(
            (item) => item && true
        ));
    }

    updateChildren(list, data) {
        for (let child of list) {
            this.updateFragment(child, data);
        }
    }

    deleteChildren(list) {
        for (let child of list) {
            this.deleteFragment(child);
        }
    }

    setAttributesData(fragment, data) {
        if (fragment.hasAttributesData) {
            let attributes = Object.keys(fragment.attributesData);
            for (let key of attributes) {
                let value = fragment.attributesData[key];
                fragment.attributes[key] = data[value.substring(1)];
            }
        }
    }

    deleteFragment(fragment) {
        fragment.node && PlainDom.removeChild(fragment.node.parentNode, fragment.node);
        fragment = null;
    }

    updateFragment(fragment, data) {
        fragment = fragment || this.fragment;
        data = data || this.data;

        if (fragment.type === 'string') {
            return;
        }

        let node = fragment.node;
        let options = fragment.options;

        if (options.from) {
            data = data[options.from];
        }

        this.setAttributesData(fragment, data);
        PlainDom.setAttributes(node, fragment.attributes);

        if (options.content) {
            this.updateContent(node, data[options.content], options.type);
        }

        if (fragment.children) {
            if (options['for-each']) {
                let to = options['to'] || 'item';
                let list = data[options['for-each']];
                let docFragment = PlainDom.createDocumentFragment();

                PlainDom.removeChildren(node);

                list.forEach((item) => {
                    let itemData = Object.assign({}, data);
                    itemData[to] = item;

                    this.addChildren(docFragment, itemData, fragment.children);
                });

                PlainDom.appendChild(node, docFragment);
            } else {
                this.updateChildren(fragment.children, data);
            }
        }
    }

    addContent(node, content, type) {
        if (type === 'element') {
            content.render(node);
        } else {
            PlainDom.appendChild(node, content);
        }
    }

    updateContent(node, content, type) {
        if (type !== 'element') {
            PlainDom.removeChildren(node);
            PlainDom.appendChild(node, content);
        }
    }

}