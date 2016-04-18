import PlainDom from './PlainDom';
import PlainRenderer from './PlainRenderer';
import PlainObserver from './PlainObserver';

export default class PlainComponent {

    constructor(ProviderClass, template, data = {}) {
        this.provider = ProviderClass;
        this.template = template;
        this.data = data;
    }

    render(node) {
        let ProviderClass = this.provider;
        let template = this.template;
        let list = PlainDom.toArray(node);

        list.forEach((node) => {
            let provider = new ProviderClass(this.data);
            let data = provider.getData();
            let fragment = new PlainRenderer(template);

            PlainObserver.register(data, fragment);
            PlainObserver.update(data);

            if (fragment.node) {
                provider.onBeforeMount(node);
                node.appendChild(fragment.node);
                provider.onMount(node);
            }
        });
    }

    static render(ProviderClass, template, node) {
        new PlainComponent(ProviderClass, template).render(node);
    }

}