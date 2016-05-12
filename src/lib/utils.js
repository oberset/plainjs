export const T_UNDEF = void(0);

function testObject(obj, proto) {
    return obj !== null && Object.prototype.toString.call(obj) === '[object ' + proto + ']';
}

export function isObject(obj) {
    return testObject(obj, 'Object');
}

export function copyObject(source, target = {}) {
    let keys = Object.keys(source);
    for (let key of keys) {
        let val = source[key];
        if (isObject(val)) {
            val = copyObject(val);
        } else if (Array.isArray(val)) {
            val = copyArray(val);
        }
        target[key] = val;
    }
    return target;
}

export function copyArray(source, target = []) {
    for (var i = 0, len = source.length; i < len; i++) {
        if (Array.isArray(source[i])) {
            target[i] = copyArray(source[i]);
        } else if (isObject(source[i])) {
            target[i] = copyObject(source[i]);
        } else {
            target[i] = source[i];
        }
    }
    return target;
}

export function mergeObject(source, target = {}) {
    let keys = Object.keys(source);
    for (let key of keys) {
        let newData = source[key];
        let curData = target[key];

        if (isObject(curData) && isObject(newData)) {
            mergeObject(newData, curData);
        } else {
            target[key] = newData;
        }
    }
    return target;
}

export function toArray(list) {
    return Array.from(list);
}

export function toKeyValue(list, key, value) {
    let obj = {};
    for (let item of list) {
        obj[item[key]] = item[value];
    }
    return obj;
}

export function isNullOrUndef(test) {
    return test === null || test === T_UNDEF;
}
