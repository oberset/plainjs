import PlainDomFragment from './src/lib/PlainDomFragment';
import Page from './src/components/page/page';
import PageTemplate from './src/components/page/page.html';

console.time('render');
PlainDomFragment.render(Page, PageTemplate, document.body);
console.timeEnd('render');