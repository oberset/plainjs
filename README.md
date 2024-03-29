# Plainjs
Простой и быстрый Javascript фреймворк уровня представления (View).

Примеры использования Plainjs можно посмотреть в репозитории https://github.com/oberset/plainjs-test-app

Plainjs рендерит ваши данные в html-код страницы. Для отрисовки данных на странице используется нативный DOM-интерфейс браузера. Рендеринг осуществляется на основе html-шаблона (т.к сам шаблон представляет из себя кусок обычного html, его парсинг тоже осуществляется с помощью DOM браузера).

Пример "Hello World" (отрисуем строку текста в браузере):

```javascript
import { PlainComponent as Pjs } from 'plainjs';

Pjs.render('<h1 content="hello"></h1>', { hello: 'Hello World!!!' }, document.querySelector('.hello'));
```

В приведенном примере мы импортируем класс PlainComponent (в примере используется синтаксис es6) и вызываем у него статический метод *render*. В качестве параметров методу *render* мы передаем html-шаблон, порцию данных и родительский DOM-узел, в который будет осуществляться вставка результата рендеринга.

Для управления данными можно создать собственный класс. В следующем примере мы создадим простой компонент состоящий из шаблона и класса-обработчика. Компонент будет состоять из поля checkbox и кнопки, при нажатии на которую checkbox будет менять свое состояние checked/unchecked.

Подключение компонента:
```javascript
import { PlainComponent as Pjs } from 'plainjs';
import { Checkbox, CheckboxTemplate } from './components/checkbox/checkbox';

Pjs.render(CheckboxTemplate, Checkbox, document.querySelector('.container-checkbox'));
```

Код html-шаблона */components/checkbox/checkbox.html*:
```html
<div class=":className">
    <input type="checkbox" checked=":checked" />
    <button type="button" content="label"></button>
</div>
```

Код класса обработчика */components/checkbox/checkbox.js*:
```javascript
import { Plain } from 'plainjs';
import UI from 'plainjs/ui';
import template from './checkbox.html';

class Checkbox extends Plain {

   constructor() {
        super();

        // установка начального состояния
        this.setData({
            className: 'checkbox',
            label: 'set checked',
            checked: null
        });
    }

    onMount(node) {
        this.ui = UI(node, {
            button: 'button'
        });

        // получаем начальное состояние checkbox
        this.checked = this.getData().checked;

        this.ui.button[0].addEventListener('click', (e) => {
            this.checked = !this.checked;

            // обновим состояние
            this.setData({
                checked: this.checked,
                label: this.checked ? 'set unchecked' : 'set checked'
            });
        });
    }

    onUnmount() {
        this.ui = null;
    }

}

export { Checkbox, template as CheckboxTemplate };
```

**При обновлении данных Plainjs не перерисовывает весь шаблон целиком, а обновляет DOM только у измененных фрагментов.**

## Примеры работы

Пример компонента, который меняет содержимое в зависимости от статуса загрузки (ожидание результата выполнения асинхронного кода):

Код шаблона */components/loader/loader.html*:
```html
<div class="loader">
    <div class="content">
        <div match="status" eq="0">Кликните для начала загрузки.</div>
        <div match="status" eq="1">Идет загрузка...</div>
        <div match="status" eq="2">Загрузка завершена!!!</div>
    </div>
    <button>Click</button>
</div>
```

Код класса обработчика */components/loader/loader.js*:
```javascript
import { Plain } from 'plainjs';
import UI from 'plainjs/ui';
import template from './loader.html';

class Loader extends Plain {
    constructor() {
        super();

        // установим начальное состояние
        this.setData({
            status: 0
        });
    }

    onMount(node) {
        this.ui = UI(node, {
           button: 'button'
        });

        this.ui.button[0].addEventListener('click', (e) => {
            // если еще не производили загрузку
            if (this.getData().status < 1) {
                this.setData({ status: 1 });

                // эмуляция асинхронного вызова
                setTimeout(() => {
                    this.setData({ status: 2 });
                }, 2500);
            }
        });
    }

    onUnmount() {
        this.ui = null;
    }
}

export { Loader, template as LoaderTemplate }
```

Рендеринг компонента:
```javascript
import { PlainComponent as Pjs } from 'plainjs';
import { Loader, LoaderTemplate } from './components/loader/loader';

Pjs.render(LoaderTemplate, Loader, document.querySelector('.container-loader'));
```

Еще один пример: форма регистрации, в которой при вводе данных в поле ID нужно блокировать поля first-name и last-name.

Код шаблона */components/input/input.html*:
```html
<div class=":className">
    <div from="id">
        <label for="id" content="label">: </label>
        <input id="id" name="id" type="text" size="20" placeholder=":placeholder" />
    </div>
    <div from="first-name">
        <label for="first-name" content="label">: </label>
        <input id="first-name" name="first-name" type="text" disabled=":disabled" size="20" placeholder=":placeholder" />
    </div>
    <div from="last-name">
        <label for="last-name" content="label">: </label>
        <input id="last-name" name="last-name" type="text" disabled=":disabled" size="20" placeholder=":placeholder" />
    </div>
</div>
```

Код класса обработчика */components/input/input.js*:
```javascript
import { Plain } from 'plainjs';
import UI from 'plainjs/ui';
import template from './input.html';

class Input extends Plain {

   constructor() {
        super();

        // начальное состояние (укажем CSS-класс и параметры полей)
        this.setData({
            className: 'input',
            id: {
                label: 'ID',
                placeholder: 'input id',
                disabled: null
            },
            'first-name': {
                label: 'First name',
                placeholder: 'input first name',
                disabled: null
            },
            'last-name': {
                label: 'Last name',
                placeholder: 'input last name',
                disabled: null
            }
        });

        // какие поля нужно блокировать
        this.disabledFields = ['first-name', 'last-name'];
        this.disabled = false;
    }

    updateFields() {
        const changes = {};
        const { disabled } = this;

        this.disabledFields.forEach(field => (changes[field] = { disabled }));
        this.setData(changes);
    }

    onMount(node) {
        this.ui = UI(node, {
            inputId: '#id'
        });

        this.ui.inputId[0].addEventListener('input', (e) => {
            const val = e.currentTarget.value;

            if (val && !this.disabled) {
                this.disabled = true;
                this.updateFields();

            } else if (!val && this.disabled) {
                this.disabled = false;
                this.updateFields();
            }
        });
    }

    onUnmount() {
        this.ui = null;
        this.disabled = false;
    }
}

export { Input, template as InputTemplate };
```

Рендеринг компонента:
```javascript
import { PlainComponent as Pjs } from 'plainjs';
import { Input, InputTemplate } from './components/input/input';

Pjs.render(InputTemplate, Input, document.querySelector('.container-input'));
```

Использование циклов в шаблоне: нарисуем select, при выборе значения из списка будем выводить его в заголовок.

Код шаблона:
```html
<div class="select">
    <h3 content="selected"></h3>
    <select for-each="options" to="option">
        <option from="option" value=":value" content="label"></option>
    </select>
</div>
```

Код обработчика:
```javascript
import { Plain } from 'plainjs';
import UI from 'plainjs/ui';
import template from './select.html';

class Select extends Plain {
    constructor() {
        super();

        this.options = [
            {value: 1, label: 'One'},
            {value: 2, label: 'Two'},
            {value: 3, label: 'Three'},
            {value: 4, label: 'Four'},
            {value: 5, label: 'Five'}
        ];

        // установим начальное состояние
        this.setData({
            selected: this.options[0].label,
            options: this.options
        });
    }

    onMount(node) {
        this.ui = UI(node, { select: 'select'});

        this.ui.select[0].addEventListener('change', (e) => {
            // меняем содержимое заголовка
            this.setData({
                selected: this.options[e.currentTarget.selectedIndex].label
            });
        });
    }

    onUnmount() {
        this.ui = null;
    }
}

export { Select, template as SelectTemplate }
```

Рендеринг компонента:
```javascript
import { PlainComponent as Pjs } from 'plainjs';
import { Select, SelectTemplate } from './components/select/select';

Pjs.render(SelectTemplate, Select, document.querySelector('.container-select'));
```
