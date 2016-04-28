import PlainDom from './PlainDom';
import PlainObserver from './PlainObserver';
import {isObject, copyObject, copyArray, isNullOrUndef, T_UNDEF} from './utils';

const ITEMS_EQUALS = 0;
const ITEMS_TO_DELETE = -1;
const ITEMS_TO_ADD = 1;
const ITEMS_TO_UPDATE = 2;

export default class PlainRenderer {

    static fragmentData = {
        name: null,
        attributes: null,
        children: null,
        renderedData: null,
        options: null
    };

    static options = {
        content: true,
        component: true,
        from: true,
        to: true,
        'for-each': true,
        match: true,
        exists: true,
        eq: true,
        'not-eq': true,
        gt: true,
        gte: true,
        lt: true,
        lte: true
    };

    constructor(template) {
        this.template = this.createTemplateFromString(template);
        this.fragment = null;
        this.node = null;
        this.data = {};
        this.previousData = {};
    }

    createTemplateFromString(html) {
        return PlainDom.createDocumentFragment(html).firstChild;
    }

    update(provider) {
        this.data = provider.getData();

        if (null === this.fragment) {
            this.fragment = this.createFragmentFromTemplate();
            this.node = this.createFragmentNode();
        } else {
            console.time('updateFragment');
            this.updateFragmentNode();
            console.timeEnd('updateFragment');
        }

        this.previousData = copyObject(this.data);
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
        result.renderedData = {};
        result.children = children;

        return result;
    }

    createFragmentNode(fragment, data) {
        fragment = fragment || this.fragment;
        data = data || this.data;

        if (fragment.type === 'string') {
            return (fragment.node = PlainDom.createTextNode(fragment.value));
        }

        let options = fragment.options || {};

        if (options.from) {
            data = data[options.from];
        }

        if (options.match && !this.match(options, data[options.match])) {
            return null;
        }

        this.setAttributesData(fragment, data);

        let node = PlainDom.createElement(fragment.name, fragment.attributes);

        options.content && this.addContent(node, fragment, data[options.content]);
        options.component && this.addComponent(node, fragment, data[options.component]);

        if (options['for-each']) {
            let to = options['to'] || 'item';
            let list = data[options['for-each']];
            let fragments = [];

            list.forEach((item) => {
                let itemChildren = copyArray(fragment.children);
                let itemData = Object.assign({}, data);
                itemData[to] = item;

                this.addChildren(node, itemData, itemChildren);
                fragments.push(itemChildren);
            });
            fragment.renderedData.children = fragments;
        } else {
            this.addChildren(node, data, fragment.children);
        }

        return (fragment.node = node);
    }

    updateFragmentNode(fragment, data, previousData) {
        fragment = fragment || this.fragment;
        data = data || this.data;
        previousData = previousData || this.previousData;

        if (fragment.type === 'string') {
            return null;
        }

        let node = fragment.node || this.createFragmentNode(fragment, data);

        if (null === node) {
            return null;
        }

        let options = fragment.options;

        if (options.from) {
            data = data[options.from];
            previousData = previousData[options.from];
        }

        if (options.match && !this.match(options, data[options.match])) {
            return (fragment.node = null);
        }

        this.setAttributesData(fragment, data);
        PlainDom.setAttributes(node, fragment.attributes);

        options.content && this.updateContent(node, fragment, data[options.content]);
        options.component && this.updateComponent(node, fragment, data[options.component]);

        if (options['for-each']) {
            let to = options['to'] || 'item';
            let list = data[options['for-each']];
            let prevList = previousData[options['for-each']];
            let items = this.getUpdatedItems(list, prevList);
            let renderedChildren = fragment.renderedData.children ? fragment.renderedData.children : [];
            let fragments = [];

            items.forEach((item, i) => {
                switch (item.type) {
                    case ITEMS_TO_DELETE:
                        (() => {
                            let itemChildren = renderedChildren[i] || [];
                            this.deleteChildren(node, itemChildren);
                        })();

                        break;

                    case ITEMS_TO_ADD:
                        (() => {
                            let itemChildren = fragment.children;
                            let itemData = Object.assign({}, data);
                            itemData[to] = item.data;

                            this.addChildren(node, itemData, itemChildren);
                            fragments.push(itemChildren);
                        })();
                        break;

                    case ITEMS_TO_UPDATE:
                        (() => {
                            let itemChildren = renderedChildren[i] || [];
                            let itemData = Object.assign({}, data);
                            itemData[to] = item.data;

                            let itemPreviousData = Object.assign({}, previousData);
                            itemPreviousData[to] = item.previous;

                            this.updateChildren(node, itemChildren, itemData, itemPreviousData);
                            fragments.push(itemChildren);
                        })();
                        break;

                    default:
                        fragments.push(children);
                }
            });

            fragment.renderedData.children = fragments;
        } else {
            this.updateChildren(node, fragment.children, data, previousData);
        }

        return node;
    }

    deleteFragmentNode(node, fragment) {
        fragment.node && PlainDom.removeChild(node, fragment.node);
        fragment.node = null;
    }

    match(options, data) {
        if (options.exists) {

            return !isNullOrUndef(data);

        } else if (options.eq) {

            switch (typeof data) {
                case 'string':
                case 'boolean':
                case 'number':
                case 'undefined':
                    return options.eq === data.toString();
                break;

                case 'object':
                    return (options.eq === 'null' && data === null) || (options.eq === 'object' && data !== null);
                break;
            }

        } else {

            for (let type of ['lt', 'gt', 'lte', 'gte']) {
                if (T_UNDEF !== options[type]) {
                    let test = parseFloat(options[type]);
                    let val = parseFloat(data);

                    switch (type) {
                        case 'lt':
                            return test > val;
                        break;

                        case 'lte':
                            return test >= val;
                        break;

                        case 'gt':
                            return test < val;
                        break;

                        case 'gte':
                            return test <= val;
                        break;
                    }
                }
            }
        }
    }

    getUpdatedItems(items, previousItems) {
        !Array.isArray(items) && (items = []);
        !Array.isArray(previousItems) && (previousItems = []);

        let changes = [];

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
                })
            }
        }

        if (previousItems.length > items.length) {
            changes.length = previousItems.length;
            changes.fill({type: ITEMS_TO_DELETE}, items.length);
        }

        return changes;
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

    addChildren(node, data, fragmentChildren) {
        let children = fragmentChildren.map(
            (item) => this.createFragmentNode(item, data)
        ).filter(
            (item) => item && true
        );
        children.length && PlainDom.appendChildren(node, children);
    }

    updateChildren(node, list, data, previousData) {
        let updatedNodes = [];
        let needUpdate = false;

        for (let child of list) {
            let currentNode = child.node;
            let updatedNode = this.updateFragmentNode(child, data, previousData);

            if (child.type === 'element' && !needUpdate) {
                needUpdate = currentNode !== updatedNode;
            }

            updatedNode && updatedNodes.push(updatedNode);
        }

        if (needUpdate) {
            PlainDom.removeChildren(node);
            PlainDom.appendChildren(node, updatedNodes);
        }
    }

    deleteChildren(node, list) {
        for (let child of list) {
            this.deleteFragmentNode(node, child);
        }
    }

    addContent(node, fragment, content) {
        let contentNode = PlainDom.createTextNode(content);
        PlainDom.appendChild(node, contentNode);

        fragment.renderedData.content = {
            node: contentNode
        };
    }

    updateContent(node, fragment, content) {
        let textNode = fragment.renderedData.content.node;
        PlainDom.getText(textNode) !== content && PlainDom.setText(textNode, content);
    }

    addComponent(node, fragment, params) {
        let component = params.component;
        let data = params.data || {};

        component.render(node, data);
        fragment.renderedData.component = component;
    }

    updateComponent(node, fragment, params) {
        let newComponent = params.component;
        let oldComponent = fragment.renderedData.component;
        let update = oldComponent && newComponent.getId() === oldComponent.getId();

        if (update) {
            oldComponent.update(params.data || {});
        } else {
            PlainDom.removeChildren(node);
            this.addComponent(node, fragment, params);
        }
    }

}