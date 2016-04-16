import Plain from '../../lib/Plain';

export default class Button extends Plain {

    defaultData = {
        label: ''
    };

    onMount(node) {
        console.log('!!! Mounted Button');
        node.addEventListener('click', this.onClick);
    }

    onClick = () => {
        this.data.label = 'Clicked!!!';
        this.update();
    }

}