import Plain from '../../lib/Plain';

export default class Button extends Plain {

    constructor() {
        super();
        this.setData({
            label: 'Click here!!!'
        });
    }

    onMount(node) {
        node.addEventListener('click', this.onClick);
    }

    onClick = () => {
        this.setData({
            label: 'Clicked!!!'
        });
        this.update();
    }

}