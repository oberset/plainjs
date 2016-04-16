import Plain from '../../lib/Plain';

export default class Button extends Plain {

    constructor() {
        super();
        this.setData({
            label: 'Click here!!!'
        });
    }

    onMount(node) {
        console.log('!!! Mounted Button');
        node.addEventListener('click', this.onClick);
    }

    onClick = () => {
        this.data.label = 'Clicked!!!';
        this.update();
    }

}