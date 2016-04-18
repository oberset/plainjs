import PlainObserver from './PlainObserver';
import { isObject, copyObject } from './utils';

export default class Plain {

    defaultProps = {};

    constructor(data = {}) {
        if (!isObject(data)) {
            throw new Error('Passed "data" must be a plain object');
        }

        let defaultProps = copyObject(this.defaultProps);
        let props = copyObject(data, defaultProps);

        Object.defineProperty(this, 'data', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: props
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