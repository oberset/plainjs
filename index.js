import PlainComponent from './src/lib/PlainComponent';
import Page from './src/components/page/page';
import template from './src/components/page/page.html';

console.time('render');
Array.from(document.querySelectorAll('.container')).forEach((node) => {
    PlainComponent.render(template, Page, node);
});
console.timeEnd('render');