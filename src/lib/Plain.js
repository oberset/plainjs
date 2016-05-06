import PlainObserver from './PlainObserver';
import { isObject, copyObject, mergeObject, isNullOrUndef } from './utils';

const storage = new WeakMap();

export default class Plain {

    constructor(data) {
        let state = {};

        Object.defineProperty(this, 'data', {
            enumerable: true,
            configurable: true,
            get: () => {
                throw new Error('Direct access to the property "data" is not allowed. Use method "setData" to update your data.');
            },
            set: (data) => {
                isNullOrUndef(data) && (data = {});
                let copy = copyObject(this.validate(data));
                mergeObject(copy, state);
            }
        });

        storage.set(this, state);
        this.data = data;
    }

    validate(data) {
        if (isObject(data)) {
            return data;
        } else {
            throw new Error('"data" must be a plain object');
        }
    }

    setData(data) {
        this.data = data;
        PlainObserver.update(this);
    }

    getData() {
        return copyObject(storage.get(this));
    }

    onBeforeMount() {}

    onMount() {}

    onBeforeUpdate() {}

    onUpdate() {}

    onBeforeUnmount() {}

    onUnmount() {}

    onDestroy() {}

}