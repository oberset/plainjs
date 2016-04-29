export default class PlainObserver {

    static list = new WeakMap();

    static register(object, listener) {
        let listeners = this.list.get(object);
        if (!Array.isArray(listeners)) {
            listeners = [listener];
        } else {
            listeners.push(listener);
        }
        this.list.set(object, listeners);
    }

    static unregister(object) {
        if (this.list.has(object)) {
            this.list.delete(object);
        }
    }

    static update(object) {
        let listeners = this.list.get(object);
        listeners && listeners.forEach(listener => {
            listener.update(object);
        });
    }

}