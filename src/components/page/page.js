import Plain from '../../lib/Plain';
import Button from '../button/button';
import buttonTemplate from '../button/button.html';
import Item from '../item/item';
import itemTemplate from '../item/item.html';
import PlainComponent from '../../lib/PlainComponent';

export default class Page extends Plain {

    constructor() {
        super();

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
                component: new PlainComponent(buttonTemplate, Button)
            },
            list: {
                items: [
                    {
                        name: 'First'
                    },
                    {
                        name: 'Second'
                    },
                    {
                        name: 'Third'
                    }
                ],
                componentItems: [
                    {
                        item: {
                            component: new PlainComponent(itemTemplate, Item),
                            data:{
                                name: 'One',
                                key: 1
                            }
                        }
                    },
                    {
                        item: {
                            component: new PlainComponent(itemTemplate, Item),
                            data:{
                                name: 'Two',
                                key: 2
                            }
                        }
                    }
                ]
            }
        });
    }

    onMount(node) {
        node.querySelector('.button').addEventListener('click', this.onClick);

        this.setData({
            className: 'main-page main-page_loaded',
            header: 'Update page header!!!'
        });
    }

    onClick = () => {

        let componentItems = this.data.list.componentItems;
        let count = componentItems.length  + 1;
        componentItems.push({
            item: {
                component: new PlainComponent(itemTemplate, Item),
                data:{
                    name: 'Name ' + count,
                    key: count
                }
            }
        });

        this.data.list.items = null;

        this.setData({
            counter: {
                first: this.data.counter.first + 1
            }
        });

        this.update();
    }

}