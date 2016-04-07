import PlainDom from './PlainDom';

export default class PlainDomFragment extends PlainDom {

    static fragmentData = {
        name: null,
        attributes: null,
        children: null,
        options: null
    };

    static options = {
        content: true,
        from: true,
        'for-each': true
    };

    static render(Component, template, node) {
        let component = new Component();
        let data = component.getData();
        let fragment = new PlainDomFragment(
            this.createTemplateFromString(template)
        );
        fragment.updateData(data);
        node.appendChild(fragment.node);

        return fragment;
    }

    constructor(template) {
        super();
        this.template = template;
        this.fragment = null;
        this.node = null;
        this.data = {};
    }

    updateData(data) {
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
        return str.replace(/^(\s?)[\r\n\t]+[\s\t]*/, "$1") || '';
    }

    createFragmentFromElement(root) {
        let result = Object.assign({}, PlainDomFragment.fragmentData);
        let options = {};

        let attributesIterator = this.getDomListIterator(root.attributes);
        let attribute;
        let attributes = {};

        while (attribute = attributesIterator()) {
            let attributeName = attribute.nodeName.toLowerCase();
            let attributeValue = attribute.nodeValue;

            if (PlainDomFragment.options[attributeName]) {
                options[attributeName] = attributeValue;
            } else {
                attributes[attributeName] = attributeValue;
            }
        }

        let childrenIterator = this.getDomListIterator(root.childNodes);
        let child;
        let children = [];

        while (child = childrenIterator()) {
            let fragment = this.createFragmentFromTemplate(child);
            fragment && children.push(fragment);
        }

        result.name = root.nodeName.toLowerCase();
        result.attributes = attributes;
        result.options = options;

        children.length && (result.children = children);

        return result;
    }

    createFragmentNode(fragment, data) {
        fragment = fragment || this.fragment;
        data = data || this.data;

        let node = this.createElementNode(fragment.name, fragment.attributes);
        let options = fragment.options || {};

        if (options.from) {
            data = data[options.from];
        }

        if (options.content) {
            this.addContent(node, data[options.content]);
        }

        if (fragment.children) {
            for (let child of fragment.children) {
                let childNode = this.createFragmentNode(child, data);
                childNode && node.appendChild(childNode);
            }
        }

        return node;
    }

    updateFragment() {

    }

}