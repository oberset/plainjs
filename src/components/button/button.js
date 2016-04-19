import Plain from '../../lib/Plain';

export default class Button extends Plain {

    defaultProps = {
        label: ''
    };

    onMount(node) {
        node.addEventListener('click', this.onClick);
    }

    onClick = () => {
        this.update();
    }

}