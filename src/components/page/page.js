import Plain from '../../lib/Plain';
import Button from '../button/button';
import buttonTemplate from '../button/button.html';
import PlainComponent from '../../lib/PlainComponent';

export default class Page extends Plain {

    constructor() {
        super();

        this.button = new PlainComponent(Button, buttonTemplate, {
            label: 'Click here!!!'
        });

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
        node.querySelector('.button').addEventListener('click', this.onClick);

        this.setData({
            className: 'main-page main-page_loaded',
            header: 'Update page header!!!',
            list: {
                items: [
                    {
                        name: 'Updated One'
                    },
                    {
                        name: 'Updated Two'
                    },
                    {
                        name: 'Updated Three'
                    },
                    {
                        name: 'Add Four'
                    },
                    {
                        name: 'Add Five'
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