import Plain from '../../lib/Plain';
import Button from '../button/button';
import buttonTemplate from '../button/button.html';
import Item from '../item/item';
import itemTemplate from '../item/item.html';
import PlainComponent from '../../lib/PlainComponent';

export default class Page extends Plain {

    constructor() {
        super();

        this.button = new PlainComponent(buttonTemplate, Button);
        this.item = new PlainComponent(itemTemplate, Item);

        this.setData({
            className: 'main-page',
            counter: {
                first: 1
            },
            title: 'Page title',
            header: 'Page header',
            body: 'Page content here.',
            footer: 'Page footer',
            button: {
                component: this.button,
                data: {
                    label: 'Click here!!!'
                }
            },
            list: {
                items: [
                    {
                        item: {
                            component: this.item,
                            data:{
                                name: 'One',
                                key: 1
                            }
                        }
                    },
                    {
                        item: {
                            component: this.item,
                            data:{
                                name: 'Two',
                                key: 2
                            }
                        }
                    },
                    {
                        item: {
                            component: this.item,
                            data:{
                                name: 'Three',
                                key: 3
                            }
                        }
                    }
                ]
            }
        });
    }

    onMount(node) {
        node.querySelector('.button').addEventListener('click', this.onClick);

        let items = [];

        for (var i = 0; i < 100; i++) {
            items.push({
                item: {
                    component: this.item,
                    data:{
                        name: 'Name ' + (i + 1),
                        key: (i + 1)
                    }
                }
            });
        }

        this.setData({
            className: 'main-page main-page_loaded',
            header: 'Update page header!!!',
            list: {
                items: items
            }
        });
    }

    onClick = () => {
        this.data.counter.first++;
        this.update();
    }

}