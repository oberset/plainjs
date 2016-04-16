import PlainDomFragment from './PlainDomFragment';
import PlainObserver from './PlainObserver';

export default class PlainComponent {

    constructor(ProviderClass, template) {
        this.provider = ProviderClass;
        this.template = template;
    }

    render(node) {
        let ProviderClass = this.provider;
        let template = PlainDomFragment.createTemplateFromString(this.template);
        let list = Array.isArray(node) ? node : [];

        switch (true) {
            case node instanceof Node:
                list.push(node);
            break;

            case node instanceof NodeList:
                let it = PlainDomFragment.getDomListIterator(node);
                let nextNode;
                while (nextNode = it()) {
                    list.push(nextNode);
                }
            break;
        }

        list.forEach((node) => {
            let provider = new ProviderClass();
            let data = provider.getData();
            let fragment = new PlainDomFragment(template);

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