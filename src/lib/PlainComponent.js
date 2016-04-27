import PlainDom from './PlainDom';
import Plain from './Plain';
import PlainRenderer from './PlainRenderer';
import PlainObserver from './PlainObserver';
import { isObject } from './utils';

const counters = {
    nextId: 0
};

export default class PlainComponent {

    constructor(template, ProviderClass) {
        this.providerClass = ProviderClass;
        this.template = template;
        this.provider = null;
        this.id = counters.nextId++;
    }

    render(node, data) {
        let fragment = new PlainRenderer(this.template);
        let provider = new this.providerClass(data);

        PlainObserver.register(provider, fragment);
        PlainObserver.update(provider);

        provider.onBeforeMount(node);
        fragment.node && PlainDom.appendChild(node, fragment.node);
        provider.onMount(node);

        this.provider = provider;
    }

    update(data) {
        if (this.provider) {
            this.provider.setData(data);
        } else {
            throw new Error('Component provider is not defined');
        }
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