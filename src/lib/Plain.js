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

                if (this.constructor.dataTypes) {
                    this.convertTypes(data, this.constructor.dataTypes);
                }

                let copy = copyObject(this.validate(data));
                mergeObject(copy, state);
            }
        });

        storage.set(this, state);
        this.data = data;
    }

    convertTypes(data, types) {
        let keys = Object.keys(types);

        for (let key of keys) {
            data[key] = this.convertType(data[key], types[key]);
        }
    }

    convertType(value, type) {
        switch (type) {
            case 'string':
                !value && (value = '');
            break;

            case 'object':
                !isObject(value) && (value = {});
            break;

            case 'number':
                value = parseFloat(value);
            break;

            case 'int':
                value = parseInt(value, 10);
            break;

            case 'array':
                !Array.isArray(value) && (value = []);
            break;
        }

        return value;
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