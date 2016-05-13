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
        } else {
            this.provider.onUpdate();
        }
    }
}

export default class PlainComponent {

    static getNextId = counter();

    constructor(template, ProviderClass, live = true) {
        this.providerClass = ProviderClass;
        this.template = template;
        this.id = this.constructor.getNextId();
        this.live = live === true;
        this.provider = null;
        this.fragment = null;
        this.node = null;
    }

    render(node, data) {
        if (!this.isRendered()) {
            let fragment = new PlainRenderer(this.template, this.node);
            let provider = new this.providerClass(data);

            PlainObserver.register(fragment, new DomUpdater(node, provider));
            PlainObserver.register(provider, fragment);

            this.live || PlainObserver.update(provider);

            this.provider = provider;
            this.fragment = fragment;
        }

        return this;
    }

    replace(node, data) {
        this.node = node;
        return this.render(PlainDom.getParent(node), data);
    }

    update(newData) {
        if (this.isRendered()) {
            this.provider.setData(newData);
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
        new PlainComponent(template, providerClass, false).render(node, data);
    }

}