import PlainDom from './PlainDom';
import PlainObserver from './PlainObserver';

export default class PlainDomFragment extends PlainDom {

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
        super();
        this.template = template;
        this.fragment = null;
        this.node = null;
        this.data = {};
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
        let result = Object.assign({}, PlainDomFragment.fragmentData);
        let options = {};

        let attributesIterator = PlainDom.getDomListIterator(root.attributes);
        let attribute;
        let attributes = {};
        let attributesData = {};
        let hasAttributesData = false;

        while (attribute = attributesIterator()) {
            let attributeName = attribute.nodeName.toLowerCase();
            let attributeValue = attribute.nodeValue;

            if (attributeValue.indexOf(':') === 0) {
                attributesData[attributeName] = attributeValue;
                !hasAttributesData && (hasAttributesData = true);
            } else if (PlainDomFragment.options[attributeName]) {
                options[attributeName] = attributeValue;
            } else {
                attributes[attributeName] = attributeValue;
            }
        }

        let childrenIterator = PlainDom.getDomListIterator(root.childNodes);
        let child;
        let children = [];

        while (child = childrenIterator()) {
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
            fragment.node = this.createTextNode(fragment.value);
            return fragment.node;
        }

        let options = fragment.options || {};

        if (options.from) {
            data = data[options.from];
        }

        this.setAttributesData(fragment, data);

        let node = this.createElement(fragment.name, fragment.attributes);

        if (options.content) {
            this.addContent(node, data[options.content], options.type);
        }

        if (fragment.children) {

            let docFragment = document.createDocumentFragment();

            if (options['for-each']) {
                let to = options['to'] || 'item';
                let list = data[options['for-each']];

                fragment.listKeys = [];

                list.forEach((item) => {
                    let itemData = Object.assign({}, data);
                    itemData[to] = item;

                    let key = this.getDataId(item);

                    this.addChildren(docFragment, itemData, fragment.children);
                    fragment.listKeys.push(key);
                });
            } else {
                this.addChildren(docFragment, data, fragment.children);
            }

            node.appendChild(docFragment);
        }

        fragment.node = node;
        return node;
    }

    getDataId(data) {
        return typeof data === 'object' ? (data.key || JSON.stringify(data)) : data;
    }

    addChildren(node, data, list) {
        for (let child of list) {
            let childNode = this.createFragmentNode(child, data);
            childNode && node.appendChild(childNode);
        }
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
        fragment.node && fragment.node.parentNode.removeChild(fragment.node);
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
        this.updateElement(node, fragment.attributes);

        if (options.content) {
            this.updateContent(node, data[options.content], options.type);
        }

        if (fragment.children) {
            if (options['for-each']) {
                let to = options['to'] || 'item';
                let list = data[options['for-each']];

                //TODO: delete only modified items
                this.removeContent(node);
                fragment.listKeys = [];

                let docFragment = document.createDocumentFragment();

                list.forEach((item) => {
                    let itemData = Object.assign({}, data);
                    itemData[to] = item;

                    let key = this.getDataId(item);

                    this.addChildren(docFragment, itemData, fragment.children);
                    fragment.listKeys.push(key);
                });

                node.appendChild(docFragment);
            } else {
                this.updateChildren(fragment.children, data);
            }
        }
    }

    addContent(node, content, type) {
        if (type === 'element') {
            content.render(node);
        } else {
            super.addContent(node, content);
        }
    }

    updateContent(node, content, type) {
        if (type !== 'element') {
            super.updateContent(node, content);
        }
    }

}