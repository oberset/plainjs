import PlainDom from './PlainDom';
import Plain from './Plain';
import PlainRenderer from './PlainRenderer';
import PlainObserver from './PlainObserver';
import { isObject } from './utils';

export default class PlainComponent {

    constructor(template, ProviderClass) {
        this.providerClass = ProviderClass;
        this.template = template;
        this.provider = null;
    }

    render(node, data) {
        let fragment = new PlainRenderer(this.template);
        let provider = new this.providerClass(data);
        let dataStorage = provider.getData();

        PlainObserver.register(dataStorage, fragment);
        PlainObserver.update(dataStorage);

        if (fragment.node) {
            provider.onBeforeMount(node);
            node.appendChild(fragment.node);
            provider.onMount(node);
        }

        this.provider = provider;
    }

    update(data) {
        this.provider.setData(data).update();
    }

    static render(template, providerClass, node, data) {
        if (isObject(providerClass) && data === undefined) {
            data = providerClass;
            providerClass = Plain;
        }

        new PlainComponent(template, providerClass).render(node, data);
    }

}