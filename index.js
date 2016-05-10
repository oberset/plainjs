import { default as Psj } from './src/lib/PlainComponent';
import Counter from './src/components/counter/counter';
import CounterTemplate from './src/components/counter/counter.html';
import Test from './src/components/test/test';
import TestTemplate from './src/components/test/test.html';
import SelectTemplate from './src/components/select/select.html';

console.time('render');
Psj.render('<h1 content="hello"></h1>', {hello: 'Hello World!!!'}, document.querySelector('.hello'));
console.timeEnd('render');

console.time('render');
Psj.render(SelectTemplate, {
    options: [
        {
            value: 1,
            label: 'One',
            selected: false
        },
        {
            value: 2,
            label: 'Two',
            selected: true
        },
        {
            value: 3,
            label: 'Three',
            selected: false
        }
    ]
}, document.querySelector('.select'));
console.timeEnd('render');

console.time('render');
let counter = new Psj(CounterTemplate, Counter);
setTimeout(() => {
    counter.replace(document.querySelector('.counter-elem'));
}, 5000);
console.timeEnd('render');

console.time('render');
let test = new Psj(TestTemplate, Test);
console.log(test.isRendered());
test.render(document.querySelector('.test'));
console.log(test.isRendered());

setTimeout(() => {
    test.destroy();
}, 10000);

console.timeEnd('render');
