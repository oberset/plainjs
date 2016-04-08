import PlainDom from './PlainDom';
import PlainObserver from './PlainObserver';

export default class Plain {

    constructor() {
        Object.defineProperty(this, 'data', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: {}
        });
    }

    setData(data) {
        Object.assign(this.data, data);
    }

    getData() {
        return this.data;
    }

    onBeforeMount() {}

    onMount() {}

    update() {
        PlainObserver.update(this.getData());
    }

}