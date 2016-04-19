import PlainDom from './PlainDom';
import PlainObserver from './PlainObserver';
import {isObject, copyObject, copyArray} from './utils';

const ITEMS_EQUALS = 0;
const ITEMS_TO_DELETE = -1;
const ITEMS_TO_ADD = 1;
const ITEMS_TO_UPDATE = 2;

export default class PlainRenderer {

    static fragmentData = {
        name: null,
        attributes: null,
        content: null,
        children: null,
        renderedChildren: null,
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
        this.previousData = {};
    }

    createTemplateFromString(html) {
        return PlainDom.createDocumentFragment(html).firstChild;
    }

    update(data) {
        this.data = data;

        if (null === this.fragment) {
            this.fragment = this.createFragmentFromTemplate();
            this.node = this.createFragmentNode();
        } else {
            console.time('updateFragment');
            this.updateFragment();
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
            this.addContent(node, fragment, data[options.content], options.type);
        }

        if (fragment.children) {
            if (options['for-each']) {
                let to = options['to'] || 'item';
                let list = data[options['for-each']];
                let fragments = [];

                list.forEach((item, i) => {
                    let itemChildren = copyArray(fragment.children);
                    let itemData = Object.assign({}, data);
                    itemData[to] = {key: i, ...item};

                    this.addChildren(node, itemData, itemChildren);
                    fragments.push(itemChildren);
                });

                fragment.renderedChildren = fragments;
            } else {
                this.addChildren(node, data, fragment.children);
            }
        }

        fragment.node = node;
        return node;
    }

    getUpdatedItems(items = [], previousItems = []) {
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

    addChildren(node, data, fragmentChildren) {
        let children = fragmentChildren.map(
            (item) => this.createFragmentNode(item, data)
        ).filter(
            (item) => item && true
        );
        PlainDom.appendChildren(node, children);
    }

    updateChildren(list, data, previousData) {
        for (let child of list) {
            this.updateFragment(child, data, previousData);
        }
    }

    deleteChildren(node, list) {
        for (let child of list) {
            this.deleteFragment(node, child);
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

    deleteFragment(node, fragment) {
        fragment.node && PlainDom.removeChild(node, fragment.node);
    }

    updateFragment(fragment, data, previousData) {
        fragment = fragment || this.fragment;
        data = data || this.data;
        previousData = previousData || this.previousData;

        if (fragment.type === 'string') {
            return;
        }

        let node = fragment.node;
        let options = fragment.options;

        if (options.from) {
            data = data[options.from];
            previousData = previousData[options.from];
        }

        this.setAttributesData(fragment, data);
        PlainDom.setAttributes(node, fragment.attributes);

        if (options.content) {
            let content = data[options.content];
            this.updateContent(fragment, content, options.type);
        }

        if (fragment.children) {
            if (options['for-each']) {
                let to = options['to'] || 'item';
                let list = data[options['for-each']];
                let prevList = previousData[options['for-each']];
                let items = this.getUpdatedItems(list, prevList);
                let fragments = [];

                items.forEach((item, i) => {
                    let children = fragment.renderedChildren[i] || [];

                    switch (item.type) {
                        case ITEMS_TO_DELETE:
                            this.deleteChildren(node, children);
                        break;

                        case ITEMS_TO_ADD:
                            let itemChildren = copyArray(fragment.children);
                            (() => {
                                let itemData = Object.assign({}, data);
                                itemData[to] = {key: i, ...item.data};

                                this.addChildren(node, itemData, itemChildren);
                                fragments.push(itemChildren);
                            })();
                        break;

                        case ITEMS_TO_UPDATE:
                            (() => {
                                let itemData = Object.assign({}, data);
                                itemData[to] = {key: i, ...item.data};

                                let itemPreviousData = Object.assign({}, previousData);
                                itemPreviousData[to] = item.previous;

                                this.updateChildren(children, itemData, itemPreviousData);
                                fragments.push(children);
                            })();
                       break;

                       default:
                            fragments.push(children);
                    }
                });

                fragment.renderedChildren = fragments;
            } else {
                this.updateChildren(fragment.children, data, previousData);
            }
        }
    }

    addContent(node, fragment, content, type) {
        if (type === 'element') {
            content.render(node);
            fragment.content = {
                type: type,
                component: content
            };
        } else {
            let contentNode = PlainDom.createTextNode(content);
            PlainDom.appendChild(node, contentNode);
            fragment.content = {
                type: type,
                node: contentNode
            };
        }
    }

    updateContent(fragment, content, type) {
        if (fragment.content.type !== type) {
            // todo change type
        } else if (type !== 'element') {
            let node = fragment.content.node;
            let storedContent = PlainDom.getText(node);
            storedContent !== content && PlainDom.setText(node, content);
        }
    }

}