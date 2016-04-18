export function isObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
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
        } else {
            target[i] = source[i];
        }
    }
    return target;
}

export function toArray(list) {
    return Array.from(list);
}

export function isNode(test) {
    return test instanceof Node;
}
