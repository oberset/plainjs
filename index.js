import PlainComponent from './src/lib/PlainComponent';
import Page from './src/components/page/page';
import template from './src/components/page/page.html';

console.time('render');
PlainComponent.render(Page, template, document.querySelectorAll('.container'));
console.timeEnd('render');