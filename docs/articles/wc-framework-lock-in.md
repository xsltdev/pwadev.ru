---
description: создадим приложение, в котором каждый компонент будет написан с использованием другого фреймворка
---

# Веб-компоненты избавляют от привязки к JavaScript-фреймворку

В последнее время мы видели много замечательных постов о веб-компонентах. Многие из них посвящены развивающемуся шаблону [веб-компонентов HTML](https://adactio.com/journal/20618), который отказывается от теневого DOM в пользу постепенного улучшения существующей разметки. Также обсуждался вопрос о полной замене JavaScript-фреймворков веб-компонентами, в том числе и [в этом посте](https://jakelazaroff.com/words/web-components-will-outlive-your-javascript-framework/).

Однако это не единственные варианты. Вы также можете использовать веб-компоненты в тандеме с фреймворками JavaScript. Для этого я хочу рассказать о ключевом преимуществе, о котором я не так часто упоминал: **веб-компоненты могут значительно ослабить связь с JavaScript-фреймворками**.

Чтобы доказать это, мы сделаем нечто безумное: создадим приложение, в котором _каждый компонент_ будет написан с использованием другого фреймворка.

Наверное, само собой разумеется, что вы не должны создавать реальное приложение подобным образом! Но есть веские причины для смешивания фреймворков. Может быть, вы постепенно переходите с [React](https://reactdev.ru/) на Vue. Может быть, ваше приложение построено на [Solid](https://soliddev.ru/), но вы хотите использовать стороннюю библиотеку, которая существует только в виде компонента [Angular](https://angdev.ru). Может быть, вы хотите использовать Svelte для нескольких "островков интерактивности" на статичном сайте.

Вот что мы собираемся создать: простое небольшое приложение, основанное на [TodoMVC](https://todomvc.com/).

<todo-demo show-layout="true" show-input="true" show-todos="true" show-filters="true"></todo-demo>

По мере создания мы увидим, как веб-компоненты могут инкапсулировать JavaScript-фреймворки, позволяя нам использовать их, не накладывая более широких ограничений на остальные части приложения.

## Что такое веб-компонент? {#whats-a-web-component}

Если вы не знакомы с веб-компонентами, вот краткое руководство по их работе.

Сначала мы объявляем подкласс `HTMLElement` в JavaScript. Назовем его `MyComponent`:

```js
class MyComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadow.innerHTML = `
			<p>Hello from a web component!</p>
			<style>
				p {
					color: pink;
					font-weight: bold;
					padding: 1rem;
					border: 4px solid pink;
				}
			</style>
		`;
    }
}
```

Вызов `attachShadow` в конструкторе заставляет наш компонент использовать [теневой DOM](https://developer.mozilla.org/docs/Web/Web_Components/Using_shadow_DOM), который инкапсулирует разметку и стили внутри нашего компонента от остальной части страницы. `connectedCallback` вызывается, когда веб-компонент действительно подключается к дереву DOM, рендерингуя содержимое HTML в "теневой корень" компонента.

Это предвещает, как мы заставим наши фреймворки работать с веб-компонентами [^1]. Обычно мы "прикрепляем" фреймворки к элементу DOM и позволяем им управлять всеми потомками этого элемента. С веб-компонентами мы можем прикрепить фреймворк к теневому корню, что гарантирует, что он сможет получить доступ только к "теневому дереву" компонента.

[^1]: Понимаете? Теневые деревья? Теневые элементы? Как теневой DOM?

Далее мы определяем пользовательское имя элемента для нашего класса `MyComponent`:

```js
customElements.define('my-component', MyComponent);
```

Всякий раз, когда на странице появляется тег с таким именем пользовательского элемента, соответствующий узел DOM на самом деле является экземпляром `MyComponent`!

```html
<my-component></my-component>
<script>
    const myComponent =
        document.querySelector('my-component');
    console.log(myComponent instanceof MyComponent); // true
</script>
```

Посмотрите:

<my-component></my-component>

Веб-компоненты - это еще не все, но этого вполне достаточно, чтобы дочитать статью до конца.

## Макет экрана

Точкой входа в наше приложение будет компонент React [^2]. Вот наше скромное начало:

[^2]: Технически, мы используем Preact в режиме совместимости, потому что я не смог понять, как заставить работать предустановку React от Vite. Оказывается, инструменты для сборки становятся сложными, когда вы пытаетесь использовать четыре разных фреймворка в одной кодовой базе!

```js
// TodoApp.jsx
export default function TodoApp() {
    return <></>;
}
```

Мы могли бы начать добавлять сюда элементы, чтобы заблокировать базовую структуру DOM, но я хочу написать еще один компонент для этого, чтобы показать, как мы можем вложить веб-компоненты таким же образом, как мы вкладываем компоненты фреймворка.

Большинство фреймворков поддерживают композицию с помощью вложенности, как обычные HTML-элементы. Со стороны это обычно выглядит примерно так:

```js
<Card>
    <Avatar />
</Card>
```

Внутри фреймворки решают эту проблему несколькими способами. Например, React и Solid предоставляют вам доступ к дочерним элементам в виде специального свойства `children`:

```js
function Card(props) {
    return <div class="card">{props.children}</div>;
}
```

С веб-компонентами, использующими теневой DOM, мы можем сделать то же самое с помощью [`элемента <slot>`](https://developer.mozilla.org/docs/Web/HTML/Element/slot). Когда браузер встречает `<slot>`, он заменяет его на дочерние элементы веб-компонента.

`<slot>` на самом деле мощнее, чем дочерние элементы `children` React или Solid. Если мы дадим каждому слоту атрибут `name`, веб-компонент может иметь несколько `<slot>`, и мы можем определить, куда попадает каждый вложенный элемент, задав ему атрибут `slot`, соответствующий имени `<slot>`.

Давайте посмотрим, как это выглядит на практике. Мы напишем наш компонент разметки с помощью Solid:

```js
// TodoLayout.jsx
import { render } from 'solid-js/web';

function TodoLayout() {
    return (
        <div class="wrapper">
            <header class="header">
                <slot name="title" />
                <slot name="filters" />
            </header>
            <div>
                <slot name="todos" />
            </div>
            <footer>
                <slot name="input" />
            </footer>
        </div>
    );
}

customElements.define(
    'todo-layout',
    class extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({
                mode: 'open',
            });
        }

        connectedCallback() {
            render(() => <TodoLayout />, this.shadow);
        }
    },
);
```

В нашем веб-компоненте Solid есть две части: обертка веб-компонента в верхней части и собственно компонент Solid в нижней части.

Самое важное, что нужно заметить в компоненте Solid, - это то, что мы используем именованные `<slot>` вместо реквизита `children`. В то время как `children` обрабатывается Solid и позволяет нам вложить другие компоненты Solid, `<slot>` обрабатывается самим браузером и позволяет нам вложить любой элемент HTML - включая веб-компоненты, написанные с помощью других фреймворков!

Обертка веб-компонента довольно похожа на [пример выше](#whats-a-web-component). В конструкторе он создает теневой корень, а затем в методе `connectedCallback` рендерит в него компонент Solid.

Обратите внимание, что это не полная реализация обертки для веб-компонента! По крайней мере, мы, вероятно, захотим определить метод [`attributeChangedCallback`](https://developer.mozilla.org/docs/Web/API/Web_Components/Using_custom_elements#responding_to_attribute_changes), чтобы мы могли перерисовывать компонент Solid при изменении атрибутов. Если вы используете это в производстве, вам, вероятно, стоит воспользоваться пакетом Solid под названием [Solid Element](https://www.npmjs.com/package/solid-element), который сделает все это за вас.

Вернувшись в наше приложение React, мы можем использовать наш компонент `TodoLayout`:

```js
// TodoApp.jsx
export default function TodoApp() {
    return (
        <todo-layout>
            <h1 slot="title">Todos</h1>
        </todo-layout>
    );
}
```

Обратите внимание, что нам не нужно ничего импортировать из `TodoLayout.jsx` - мы просто используем тег пользовательского элемента, который мы определили.

Проверьте это:

<todo-demo show-layout="true"></todo-demo>

Это React-компонент, отображающий компонент Solid, который принимает вложенный React-элемент в качестве дочернего.

## Добавление Todos

Для ввода тодо мы еще немного раздвинем луковицу и напишем его вообще без фреймворка!

```js
// TodoInput.js
customElements.define('todo-input', TodoInput);

class TodoInput extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadow.innerHTML = `
			<form>
				<input name="text" type="text"
					placeholder="What needs to be done?" />
			</form>
    	`;

        this.shadow
            .querySelector('form')
            .addEventListener('submit', (evt) => {
                evt.preventDefault();
                const data = new FormData(evt.target);

                this.dispatchEvent(
                    new CustomEvent('add', {
                        detail: data.get('text'),
                    }),
                );
                evt.target.reset();
            });
    }
}
```

Между этим примером, веб-компонентом и нашим макетом Solid вы, вероятно, заметили закономерность: прикрепляем корень тени, а затем отображаем HTML внутри него. Независимо от того, пишем ли мы HTML вручную или используем фреймворк для его генерации, процесс примерно одинаков.

Здесь мы используем [пользовательское событие](https://developer.mozilla.org/docs/Web/API/CustomEvent) для связи с родительским компонентом. Когда форма будет отправлена, мы отправим событие `add` с вводимым текстом.

Очереди событий часто используются для [разделения связи](https://gameprogrammingpatterns.com/event-queue.html) между компонентами программной системы. Браузеры в значительной степени опираются на события, а пользовательские события, в частности, являются важным инструментом в инструментарии веб-компонентов - особенно потому, что пользовательский элемент выступает в качестве естественной шины событий, доступ к которой можно получить извне веб-компонента.

Прежде чем мы продолжим добавлять компоненты, нам нужно понять, как обрабатывать наше состояние. Пока что мы просто сохраним его в нашем компоненте React `TodoApp`. Хотя со временем мы перерастем `useState`, это отличное место для начала.

У каждого тодо будет три свойства: `id`, текстовая строка `text`, описывающая его, и булево значение `done`, указывающее, был ли он завершен.

```js
// TodoApp.jsx
import { useCallback, useState } from 'react';

let id = 0;
export default function TodoApp() {
    const [todos, setTodos] = useState([]);

    export function addTodo(text) {
        setTodos((todos) => [
            ...todos,
            { id: id++, text, done: false },
        ]);
    }

    const inputRef = useCallback((ref) => {
        if (!ref) return;
        ref.addEventListener('add', (evt) =>
            addTodo(evt.detail),
        );
    }, []);

    return (
        <todo-layout>
            <h1 slot="title">Todos</h1>
            <todo-input
                slot="input"
                ref={inputRef}
            ></todo-input>
        </todo-layout>
    );
}
```

Мы будем хранить массив наших дел в состоянии React. Когда мы добавляем тодо, мы добавляем его в этот массив.

Единственная неудобная часть этого - функция `inputRef`. Наш `<todo-input>` испускает пользовательское событие `add` при отправке формы. Обычно в React мы подключаем слушателей событий с помощью реквизитов вроде `onClick` - но это работает только для событий, о которых React уже знает. Нам нужно прослушивать события `add` напрямую [^3].

[^3]: В других фреймворках этот процесс проще. Например, в Svelte мы можем использовать директиву `on:` для [прослушивания произвольных событий, исходящих от любого HTML-элемента](https://svelte.dev/docs/component-directives#on-eventname), включая веб-компоненты.

В React Land мы используем [рефссылки](https://reactdev.ru/learn/manipulating-the-dom-with-refs/) для прямого взаимодействия с DOM. Чаще всего мы используем их с помощью хука `useRef`, но это не единственный способ! Реквизит `ref` на самом деле является просто функцией, которая вызывается с помощью узла DOM. Вместо того чтобы передавать в этот реквизит ссылку, возвращаемую хуком `useRef`, мы можем передать функцию, которая прикрепляет слушатель событий непосредственно к узлу DOM.

Вы можете задаться вопросом, почему мы должны обернуть функцию в `useCallback`. Ответ кроется в [старой документации React по рефам](https://reactdev.ru/archive/react16/refs-and-the-dom/#caveats-with-callback-refs) (и, насколько я могу судить, не был перенесен в новую документацию):

!!!tip ""

    Если обратный вызов `ref` определен как встроенная функция, то при обновлении она будет вызвана дважды, сначала с `null`, а затем снова с элементом DOM. Это происходит потому, что при каждом рендере создается новый экземпляр функции, поэтому React нужно очистить старую ссылку и установить новую. Вы можете избежать этого, определив обратный вызов `ref` как связанный метод класса, но учтите, что в большинстве случаев это не имеет значения.

В данном случае это имеет значение, поскольку мы не хотим подключать слушатель событий заново при каждом рендере. Поэтому мы обернули его в `useCallback`, чтобы гарантировать, что каждый раз мы передаем один и тот же экземпляр функции.

<todo-demo show-layout="true" show-input="true"></todo-demo>

## Элементы Todo

Пока что мы можем добавлять задания, но не видеть их. Следующим шагом будет написание компонента, который будет показывать каждый элемент Todo. Мы напишем этот компонент с помощью Svelte.

Svelte поддерживает [пользовательские элементы из коробки](https://svelte.dev/docs/custom-elements-api). Вместо того чтобы продолжать каждый раз показывать один и тот же шаблон обертки веб-компонента, мы просто воспользуемся этой возможностью!

Вот код:

```html
<!-- TodoItem.svelte -->
<svelte:options customElement="todo-item" />

<script>
    import { createEventDispatcher } from 'svelte';

    export let id;
    export let text;
    export let done;

    const dispatch = createEventDispatcher();
    $: dispatch('check', { id, done });
</script>

<div>
    <input
        id="todo-{id}"
        type="checkbox"
        bind:checked="{done}"
    />
    <label for="todo-{id}">{text}</label>
    <button aria-label="delete {text}" on:click="{()" ="">
        dispatch("delete", { id })}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
        >
            <path
                d="M10.707,1.293a1,1,0,0,0-1.414,0L6,4.586,2.707,1.293A1,1,0,0,0,1.293,2.707L4.586,6,1.293,9.293a1,1,0,1,0,1.414,1.414L6,7.414l3.293,3.293a1,1,0,0,0,1.414-1.414L7.414,6l3.293-3.293A1,1,0,0,0,10.707,1.293Z"
                fill="currentColor"
            />
        </svg>
    </button>
</div>
```

В Svelte тег `<script>` не выводится в DOM в буквальном смысле - вместо этого код запускается при инстанцировании компонента. Наш компонент Svelte принимает три реквизита: `id`, `text` и `done`. Он также создает пользовательский диспетчер событий, который может отправлять события на пользовательский элемент.

Синтаксис `$:` объявляет реактивный блок. Это означает, что при изменении значений `id` или `done` он будет отправлять событие `check` с новыми значениями. `id`, вероятно, не изменится, так что на практике это означает, что он будет отправлять событие `check` всякий раз, когда мы проверяем или снимаем отметку с todo.

Вернувшись в наш React-компонент, мы перебираем наши todos и используем наш новый компонент `<todo-item>`. Нам также нужна еще пара служебных функций для удаления и проверки тодо, а также еще один обратный вызов для прикрепления слушателей событий к каждому `<todo-item>`.

Вот код:

```js
// TodoApp.jsx
import { useCallback, useState } from 'react';

let id = 0;
export default function TodoApp() {
    const [todos, setTodos] = useState([]);

    export function addTodo(text) {
        setTodos((todos) => [
            ...todos,
            { id: id++, text, done: false },
        ]);
    }

    export function removeTodo(id) {
        setTodos((todos) =>
            todos.filter((todo) => todo.id !== id),
        );
    }

    export function checkTodo(id, done) {
        setTodos((todos) =>
            todos.map((todo) =>
                todo.id === id ? { ...todo, done } : todo,
            ),
        );
    }

    const inputRef = useCallback((ref) => {
        if (!ref) return;
        ref.addEventListener('add', (evt) =>
            addTodo(evt.detail),
        );
    }, []);

    const todoRef = useCallback((ref) => {
        if (!ref) return;
        ref.addEventListener('check', (evt) =>
            checkTodo(evt.detail.id, evt.detail.done),
        );
        ref.addEventListener('delete', (evt) =>
            removeTodo(evt.detail.id),
        );
    }, []);

    return (
        <todo-layout>
            <h1 slot="title">Todos</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <todo-item
                            ref={todoRef}
                            {...todo}
                        />
                    </li>
                ))}
            </ul>
            <todo-input
                slot="input"
                ref={inputRef}
            ></todo-input>
        </todo-layout>
    );
}
```

Теперь в списке отображаются все наши дела! И когда мы добавляем новое дело, оно появляется в списке!

<todo-demo show-layout="true" show-input="true" show-todos="true"></todo-demo>

## Фильтрация Todos

Последняя функция, которую нужно добавить, - это возможность фильтровать тодо.

Но прежде чем мы добавим ее, нам нужно провести небольшой рефакторинг.

Я хочу показать еще один способ, с помощью которого веб-компоненты могут взаимодействовать друг с другом: использование общего хранилища. Многие фреймворки, которые мы используем, имеют свои собственные реализации хранилищ, но нам нужно такое хранилище, которое мы могли бы использовать со всеми ними. Для этого мы будем использовать библиотеку под названием [Nano Stores](https://github.com/nanostores/nanostores).

Сначала мы создадим новый файл `store.js` с нашим состоянием todo, переписанным с помощью Nano Stores:

```js
// store.js
import { atom, computed } from 'nanostores';

let id = 0;
export const $todos = atom([]);
export const $done = computed($todos, (todos) =>
    todos.filter((todo) => todo.done),
);
export const $left = computed($todos, (todos) =>
    todos.filter((todo) => !todo.done),
);

export function addTodo(text) {
    $todos.set([...$todos.get(), { id: id++, text }]);
}

export function checkTodo(id, done) {
    $todos.set(
        $todos
            .get()
            .map((todo) =>
                todo.id === id ? { ...todo, done } : todo,
            ),
    );
}

export function removeTodo(id) {
    $todos.set(
        $todos.get().filter((todo) => todo.id !== id),
    );
}

export const $filter = atom('all');
```

Основная логика осталась прежней; большинство изменений - это просто перенос из API `useState` в API Nano Stores. Мы добавили два новых [вычисляемых хранилища](https://github.com/nanostores/nanostores#computed-stores), `$done` и `$left`, которые являются "производными" от хранилища `$todos` и возвращают завершенные и незавершенные дела, соответственно. Мы также добавили новое хранилище, `$filter`, которое будет хранить текущее значение фильтра.

Мы напишем наш компонент фильтра с помощью Vue.

```html
<!-- TodoFilters.ce.vue -->
<script setup>
    import { useStore, useVModel } from '@nanostores/vue';

    import {
        $todos,
        $done,
        $left,
        $filter,
    } from './store.js';

    const filter = useVModel($filter);
    const todos = useStore($todos);
    const done = useStore($done);
    const left = useStore($left);
</script>

<template>
    <div>
        <label>
            <input
                type="radio"
                name="filter"
                value="all"
                v-model="filter"
            />
            <span> All ({{ todos.length }})</span>
        </label>
        <label>
            <input
                type="radio"
                name="filter"
                value="todo"
                v-model="filter"
            />
            <span> Todo ({{ left.length }})</span>
        </label>

        <label>
            <input
                type="radio"
                name="filter"
                value="done"
                v-model="filter"
            />
            <span> Done ({{ done.length }})</span>
        </label>
    </div>
</template>
```

Синтаксис довольно похож на синтаксис Svelte: тег `<script>` в верхней части запускается при инстанцировании компонента, а тег `<template>` содержит разметку компонента.

Vue не делает компиляцию компонента в пользовательский элемент такой же простой, как Svelte. Нам нужно создать еще один файл, импортировать компонент Vue и вызвать для него [`defineCustomElement`](https://vuejs.org/guide/extras/web-components.html):

```js
// TodoFilters.js
import { defineCustomElement } from 'vue';

import TodoFilters from './TodoFilters.ce.vue';

customElements.define(
    'todo-filters',
    defineCustomElement(TodoFilters),
);
```

Вернувшись в React Land, мы рефакторим наш компонент, чтобы использовать Nano Stores, а не `useState`, и добавим компонент `<todo-filters>`:

```js
// TodoApp.jsx
import { useStore } from '@nanostores/react';
import { useCallback } from 'react';

import {
    $todos,
    $done,
    $left,
    $filter,
    addTodo,
    removeTodo,
    checkTodo,
} from './store.js';

export default function App() {
    const filter = useStore($filter);
    const todos = useStore($todos);
    const done = useStore($done);
    const left = useStore($left);
    const visible =
        filter === 'todo'
            ? left
            : filter === 'done'
            ? done
            : todos;

    const todoRef = useCallback((ref) => {
        if (!ref) return;
        ref.addEventListener('check', (evt) =>
            checkTodo(evt.detail.id, evt.detail.done),
        );
        ref.addEventListener('delete', (evt) =>
            removeTodo(evt.detail.id),
        );
    }, []);

    const inputRef = useCallback((ref) => {
        if (ref)
            ref.addEventListener('add', (evt) =>
                addTodo(evt.detail),
            );
    }, []);

    return (
        <todo-layout>
            <h1 slot="title">Todos</h1>
            <todo-filters slot="filters" />

            <div slot="todos">
                {visible.map((todo) => (
                    <todo-item
                        key={todo.id}
                        ref={todoRef}
                        {...todo}
                    />
                ))}
            </div>
            <todo-input ref={inputRef} slot="input" />
        </todo-layout>
    );
}
```

Мы сделали это! Теперь у нас есть полнофункциональное приложение todo, написанное с помощью четырех различных фреймворков - React, Solid, Svelte и Vue - плюс компонент, написанный на ванильном JavaScript.

<todo-demo show-layout="true" show-input="true" show-todos="true" show-filters="true"></todo-demo>

## Движение вперед

Суть этой статьи не в том, чтобы убедить вас в том, что это хороший способ написания веб-приложений. Мы хотим показать, что существуют способы создания веб-приложений, отличные от написания всего на одном JavaScript-фреймворке, и, более того, веб-компоненты _значительно облегчают_ эту задачу.

Вы можете постепенно улучшать статический HTML. Можно создавать насыщенные интерактивные "острова" JavaScript, которые естественным образом взаимодействуют с библиотеками гипермедиа, такими как [HTMX](https://htmx.org/). Вы даже можете обернуть веб-компонент вокруг компонента фреймворка и использовать его с любым другим фреймворком.

Веб-компоненты радикально ослабляют связь между фреймворками JavaScript, предоставляя общий интерфейс, который могут использовать все фреймворки. С точки зрения потребителя, веб-компоненты - это просто HTML-теги - неважно, что происходит "под капотом".

Если вы хотите поиграть с этим сами, я создал [CodeSandbox с нашим примером приложения todo](https://codesandbox.io/p/devbox/polyglot-todos-wm4lwn).

## Список литературы

Если вам интересно, вот несколько хороших статей, которые еще глубже погружаются в тему:

-   Крис Фердинанди написал о том, как обернуть свою собственную библиотеку пользовательского интерфейса [Reef](https://reefjs.com/) веб-компонентом в статье [Reactive Web Components and DOM Diffing](https://gomakethings.com/reactive-web-components-and-dom-diffing/).
-   Андрико Карулла написал отличный обзор о том, как писать компоненты, не зависящие от фреймворка, под названием [Writing Components That Work in Any Framework](https://component-odyssey.com/articles/01-writing-components-that-work-in-any-framework).
-   Томас Уилберн показывает, как использовать веб-компоненты для создания "языков" внутри HTML в статье [Chiaroscuro, или Выразительные деревья в веб-компонентах](https://www.milezero.org/index.php/tech/web/components/chiaroscuro.html).
-   Макси Феррейра написал замечательную статью под названием [Sharing State with Islands Architecture](https://frontendatscale.com/blog/islands-architecture-state/), в которой подробно рассказывает о пользовательских событиях и хранилищах.
-   В официальной документации Astro есть страница, посвященная [обмену состоянием между островами](https://docs.astro.build/en/core-concepts/sharing-state/) с помощью [Nano Stores](https://github.com/nanostores/nanostores).
-   Хотя в ней нет прямого упоминания о веб-компонентах, в эссе HTMX о [дружественных гипермедиа сценариях](https://htmx.org/essays/hypermedia-friendly-scripting/) события и острова рассматриваются как способы взаимодействия клиентских сценариев с веб-приложениями, управляемыми гипермедиа.

## Источник

-   [Web Components Eliminate JavaScript Framework Lock-in](https://jakelazaroff.com/words/web-components-eliminate-javascript-framework-lock-in/)
