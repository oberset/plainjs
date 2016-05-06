import PlainDom from './PlainDom';
import Plain from './Plain';
import PlainRenderer from './PlainRenderer';
import PlainObserver from './PlainObserver';
import { isObject } from './utils';

const counter = () => {
    let nextValue = 0;
    return () => nextValue++;
};

class DomUpdater {
    constructor(node, provider) {
        this.node = node;
        this.provider = provider;
        this.mountedNode = null;
    }

    update(fragment) {
        if (fragment.node && !this.mountedNode) {

            this.provider.onBeforeMount(this.node);
            PlainDom.appendChild(this.node, fragment.node);
            this.provider.onMount(this.node);
            this.mountedNode = fragment.node;

        } else if (!fragment.node && this.mountedNode) {

            this.provider.onBeforeUnmount(this.node);
            PlainDom.removeChild(this.node, this.mountedNode);
            this.provider.onUnmount(this.node);
            this.mountedNode = null;
        }
    }
}

export default class PlainComponent {

    static getNextId = counter();

    constructor(template, ProviderClass) {
        this.providerClass = ProviderClass;
        this.template = template;
        this.id = this.constructor.getNextId();
        this.provider = null;
        this.fragment = null;
    }

    render(node, data) {
        if (!this.isRendered()) {
            let fragment = new PlainRenderer(this.template);
            let provider = new this.providerClass(data);

            PlainObserver.register(fragment, new DomUpdater(node, provider));
            PlainObserver.register(provider, fragment);
            PlainObserver.update(provider);

            this.provider = provider;
            this.fragment = fragment;
        }

        return this;
    }

    update(newData) {
        if (this.isRendered()) {
            let provider = this.provider;

            provider.onBeforeUpdate(provider.getData(), newData);
            provider.setData(newData);
            provider.onUpdate(newData);
        } else {
            throw new Error('Component is not rendered');
        }

        return this;
    }

    destroy() {
        if (this.isRendered()) {
            this.fragment.deleteFragmentNode();
            this.fragment = null;

            this.provider.onDestroy();

            PlainObserver.unregister(this.fragment);
            PlainObserver.unregister(this.provider);

            this.provider = null;
        }

        return this;
    }

    isRendered() {
        return (this.provider !== null && this.fragment !== null);
    }

    getId() {
        return this.id;
    }

    static render(template, providerClass, node, data) {
        if (isObject(providerClass) && data === undefined) {
            data = providerClass;
            providerClass = Plain;
        }
        new PlainComponent(template, providerClass).render(node, data);
    }

}