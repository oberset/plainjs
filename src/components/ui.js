import { isObject } from '../lib/utils';
import PlainDom from '../lib/PlainDom';

export default function ui(node, uiMap) {
    if (!PlainDom.isDomNode(node)) {
        throw new Error('Param "node" must be a Node object');
    }

    if (!isObject(uiMap)) {
        throw new Error('Param "uiMap" must be a plain object');
    }

    let ui = {};
    let keys = Object.keys(uiMap);

    for (let key of keys) {
        ui[key] = node.querySelectorAll(uiMap[key]);
    }

    return ui;
}