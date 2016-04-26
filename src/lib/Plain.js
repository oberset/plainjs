import PlainObserver from './PlainObserver';
import { isObject, copyObject, mergeObject, T_UNDEF } from './utils';

export default class Plain {

    constructor(data = {}) {
        if (!isObject(data)) {
            throw new Error('Passed "data" must be a plain object');
        }

        let props = copyObject(data);

        Object.defineProperty(this, 'data', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: props
        });
    }

    setData(data) {
        mergeObject(data, this.data);
        return this;
    }

    getData(key) {
        return key !== T_UNDEF ?  this.data[key] : this.data;
    }

    onBeforeMount() {}

    onMount() {}

    update() {
        PlainObserver.update(this.getData());
    }

}