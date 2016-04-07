import Plain from '../../lib/Plain';

export default class Button extends Plain {

    constructor() {
        super();
        this.data = {
            label: 'Click here!!!'
        };
    }

    onMount() {
        console.log('!!! Mounted Button');
    }

}