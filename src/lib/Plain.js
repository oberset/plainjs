import PlainObserver from './PlainObserver';

function isObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
}

export default class Plain {

    defaultData = {};

    constructor(data = {}) {
        if (!isObject(data)) {
            throw new Error('Passed "data" must be a plain object');
        }

        let ownData = Object.assign({}, this.defaultData, data);

        Object.defineProperty(this, 'data', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: ownData
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