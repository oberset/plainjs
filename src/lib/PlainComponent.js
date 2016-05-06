import PlainDom from './PlainDom';
import Plain from './Plain';
import PlainRenderer from './PlainRenderer';
import PlainObserver from './PlainObserver';
import { isObject } from './utils';

const counter = () => {
    let nextValue = 0;
    return () => nextValue++;
};

export default class PlainComponent {

    static getNextId = counter();

    constructor(template, ProviderClass) {
        this.providerClass = ProviderClass;
        this.template = template;
        this.provider = null;
        this.fragment = null;
        this.id = this.constructor.getNextId();
    }

    render(node, data) {
        if (!this.isRendered()) {
            let fragment = new PlainRenderer(this.template);
            let provider = new this.providerClass(data);

            PlainObserver.register(provider, fragment);
            PlainObserver.update(provider);

            provider.onBeforeMount(node);
            fragment.node && PlainDom.appendChild(node, fragment.node);
            provider.onMount(node);

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
            this.provider.onBeforeUnmount();

            this.fragment.deleteFragmentNode();
            this.fragment = null;

            this.provider.onUnmount();
            this.provider.onDestroy();

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