import Plain from '../../lib/Plain';
import Button from '../button/button';
import ButtonTemplate from '../button/button.html';

export default class Page extends Plain {

    constructor() {
        super();
        this.data = {
            button: {
                component: Button,
                template: ButtonTemplate
            },
            title: 'Page title',
            header: 'Page header',
            body: 'Page content here.',
            footer: 'Page footer'
        };
    }

    onMount() {
        console.log('!!! Mounted Page');
    }

}