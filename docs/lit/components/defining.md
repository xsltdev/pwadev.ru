---
description: Определите компонент Lit, создав класс, расширяющий LitElement, и зарегистрировав свой класс в браузере
---

# Определение компонента

Определите компонент Lit, создав класс, расширяющий `LitElement`, и зарегистрировав свой класс в браузере:

```ts
@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
    /* ... */
}
```

Декоратор `@customElement` - это сокращение для вызова [`customElements.define`](https://developer.mozilla.org/docs/Web/API/CustomElementRegistry/define), который регистрирует класс пользовательского элемента в браузере и связывает его с именем элемента (в данном случае `simple-greeting`).

Если вы используете JavaScript или не используете декораторы, вы можете вызвать `define()` напрямую:

```js
export class SimpleGreeting extends LitElement {
    /* ... */
}
customElements.define('simple-greeting', SimpleGreeting);
```

## Компонент Lit - это элемент HTML

Когда вы определяете компонент Lit, вы определяете [пользовательский HTML-элемент](https://developer.mozilla.org/docs/Web/Web_Components/Using_custom_elements). Поэтому вы можете использовать новый элемент так же, как и любой другой встроенный элемент:

```html
<simple-greeting name="Markup"></simple-greeting>
```

```js
const greeting = document.createElement('simple-greeting');
```

Базовый класс `LitElement` является подклассом `HTMLElement`, поэтому компонент Lit наследует все стандартные свойства и методы `HTMLElement`.

В частности, `LitElement` наследуется от `ReactiveElement`, который реализует реактивные свойства, и в свою очередь наследуется от `HTMLElement`.

![Диаграмма наследования показывает, что LitElement наследует от ReactiveElement, который, в свою очередь, наследует от HTMLElement. LitElement отвечает за шаблонизацию, ReactiveElement - за управление реактивными свойствами и атрибутами, HTMLElement - стандартный интерфейс DOM, общий для всех собственных элементов HTML и пользовательских элементов.](lit-element-inheritance.png)

## Обеспечение хороших типизаций TypeScript {#typescript-typings}

TypeScript будет определять класс HTML-элемента, возвращаемого из некоторых DOM API, на основе имени тега. Например, `document.createElement('img')` возвращает экземпляр `HTMLImageElement` со свойством `src: string`.

Пользовательские элементы могут получить такую же обработку, добавив в `HTMLElementTagNameMap` следующее:

```ts
@customElement('my-element')
export class MyElement extends LitElement {
    @property({ type: Number })
    aNumber: number = 5;
    /* ... */
}

declare global {
    interface HTMLElementTagNameMap {
        'my-element': MyElement;
    }
}
```

Благодаря этому следующий код правильно проверяет тип:

```ts
const myElement = document.createElement('my-element');
myElement.aNumber = 10;
```

Мы рекомендуем добавить запись `HTMLElementTagNameMap` для всех элементов, созданных на TypeScript, и убедиться, что вы опубликовали свои типы `.d.ts` в пакете npm.
