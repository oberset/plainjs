import Plain from '../../lib/Plain';
import Button from '../button/button';
import buttonTemplate from '../button/button.html';
import PlainComponent from '../../lib/PlainComponent';

export default class Page extends Plain {

    constructor() {
        super();

        this.button = new PlainComponent(Button, buttonTemplate);

        this.setData({
            className: 'main-page',
            counter: {
                first: 1
            },
            title: 'Page title',
            header: 'Page header',
            body: 'Page content here.',
            footer: 'Page footer',
            button: this.button,
            list: {
                items: [
                    {
                        name: 'One'
                    },
                    {
                        name: 'Two'
                    },
                    {
                        name: 'Three'
                    }
                ]
            }
        });
    }

    onMount(node) {
        console.log('!!! Mounted Page');
        node.querySelector('.button').addEventListener('click', this.onClick);

        this.setData({
            className: 'main-page main-page_loaded',
            header: 'Update page header!!!',
            list: {
                items: [
                    {
                        name: '111'
                    },
                    {
                        name: '222'
                    }
                ]
            }
        });
    }

    onClick = () => {
        this.data.counter.first++;
        this.update();
    }

}