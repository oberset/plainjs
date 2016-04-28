import PlainComponent from './src/lib/PlainComponent';
import Counter from './src/components/counter/counter';
import CounterTemplate from './src/components/counter/counter.html';
import Test from './src/components/test/test';
import TestTemplate from './src/components/test/test.html';

/*console.time('render');
PlainComponent.render('<h1 content="hello"></h1>', {hello: 'Hello World!!!'}, document.querySelector('.hello'));
console.timeEnd('render');*/

console.time('render');
PlainComponent.render(CounterTemplate, Counter, document.querySelector('.counter'));
console.timeEnd('render');

console.time('render');
PlainComponent.render(TestTemplate, Test, document.querySelector('.test'));
console.timeEnd('render');
