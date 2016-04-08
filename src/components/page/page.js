import Plain from '../../lib/Plain';
import Button from '../button/button';
import ButtonTemplate from '../button/button.html';

export default class Page extends Plain {

    constructor() {
        super();
        this.setData({
            counter: 1,
            title: 'Page title',
            header: 'Page header',
            body: 'Page content here.',
            footer: 'Page footer'
        });
    }

    onMount(node) {
        console.log('!!! Mounted Page');
        node.addEventListener('click', this.onClick);

        this.setData({
            header: 'Update page header!!!'
        });
    }

    onClick = () => {
        this.data.counter++;
        this.update();
    }

}