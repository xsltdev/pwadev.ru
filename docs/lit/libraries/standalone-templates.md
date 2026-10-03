---
description: Пакет lit-html можно использовать отдельно от компонентов Lit везде, где нужно эффективно отрисовывать и обновлять HTML
---

# Автономные шаблоны lit-html

Lit соединяет модель компонентов LitElement с отрисовкой на литералах шаблонов JavaScript. Часть, отвечающая за шаблоны, вынесена в отдельную библиотеку `lit-html`. Её можно использовать вне модели компонентов Lit везде, где нужно эффективно создавать и обновлять HTML.

## Пакет lit-html

Пакет `lit-html` ставится отдельно от `lit`:

```sh
npm install lit-html
```

Основные импорты — `html` и `render`:

```js
import { html, render } from 'lit-html';
```

В автономный пакет `lit-html` также входят модули возможностей, которые описаны в руководстве Lit:

-   `lit-html/directives/*` — [встроенные директивы](../templates/directives.md)
-   `lit-html/directive.js` — [пользовательские директивы](../templates/custom-directives.md)
-   `lit-html/async-directive.js` — [пользовательские асинхронные директивы](../templates/custom-directives.md#async-directives)
-   `lit-html/directive-helpers.js` — [помощники директив для императивных обновлений](../templates/custom-directives.md)
-   `lit-html/static.js` — [статический тег html](../templates/expressions.md#static-expressions)
-   `lit-html/polyfill-support.js` — поддержка полифилов веб-компонентов, см. [стили и шаблоны lit-html](#styles-and-lit-html-templates)

## Отрисовка шаблонов lit-html

Шаблоны Lit пишут литералами шаблонов JavaScript с тегом `html`. Содержимое литерала — в основном обычный декларативный HTML. В него можно вставлять выражения, которые создают и обновляют динамические части. Полный синтаксис — в [обзоре шаблонов](../templates/overview.md).

```html
html`<h1>Hello ${name}</h1>`
```

Выражение шаблона lit-html само по себе не создаёт и не обновляет DOM. Это только описание DOM — `TemplateResult`. Чтобы создать или обновить DOM, передайте `TemplateResult` функции `render()` вместе с контейнером:

```js
import { html, render } from 'lit-html';

const name = 'world';
const sayHi = html`<h1>Hello ${name}</h1>`;
render(sayHi, document.body);
```

## Динамические данные

Чтобы шаблон был динамическим, напишите _функцию шаблона_ и вызывайте её, когда данные меняются.

```js
import { html, render } from 'lit-html';

// Функция шаблона
const myTemplate = (name) => html`<div>Hello ${name}</div>`;

// Отрисовка с одними данными
render(myTemplate('earth'), document.body);

// ... позже ...
// Отрисовка с другими данными
render(myTemplate('mars'), document.body);
```

Когда вызывается функция шаблона, lit-html запоминает текущие значения выражений. Узлы DOM при этом не создаются, поэтому вызов быстрый и дешёвый.

Функция возвращает `TemplateResult` с шаблоном и входными данными. В этом главный принцип lit-html: **интерфейс — это _функция_ состояния**.

При вызове `render` **lit-html обновляет только те части шаблона, которые изменились с прошлой отрисовки.** Поэтому обновления быстрые.

### Параметры отрисовки

Метод `render` принимает аргумент `options`:

-   `host` — значение `this` при вызове обработчиков, записанных синтаксисом `@eventName`. Параметр действует, только если обработчик — обычная функция. Если передан объект-обработчик, в качестве `this` используется он. Подробнее — в [выражениях обработчиков событий](../templates/expressions.md#event-listener-expressions).
-   `renderBefore` — необязательный узел внутри `container`, перед которым lit-html отрисует результат. По умолчанию разметка добавляется в конец контейнера. `renderBefore` позволяет выбрать конкретное место.
-   `creationScope` — объект, у которого lit-html вызывает `importNode` при клонировании шаблонов. По умолчанию это `document`. Параметр нужен для сложных случаев.

Пример параметров при автономном использовании `lit-html`:

```html
<div id="container">
    <header>My Site</header>
    <footer>Copyright 2021</footer>
</div>
```

```ts
const template = () => html`...`;
const container = document.getElementById('container');
const renderBefore = container.querySelector('footer');
render(template(), container, { renderBefore });
```

Шаблон окажется между элементами `<header>` и `<footer>`.

!!!info ""

    **Параметры отрисовки должны быть постоянными.** Между повторными вызовами `render` их менять не следует.

## Стили и шаблоны lit-html {#styles-and-lit-html-templates}

lit-html делает одно дело: отрисовывает HTML. Как стилизовать получившуюся разметку, зависит от того, как вы её используете. Внутри компонентной системы вроде LitElement следуйте её правилам.

В общем случае способ зависит от теневого DOM:

-   Если вы рисуете не в теневой DOM, стили можно задать глобальными таблицами стилей.
-   Если рисуете в теневой DOM, внутрь теневого корня можно поместить теги `<style>`.

!!!info ""

    **Стилизация теневых корней в устаревших браузерах требует полифилов.** Полифил [ShadyCSS](https://github.com/webcomponents/polyfills/tree/master/packages/shadycss) вместе с автономным `lit-html` требует загрузить `lit-html/polyfill-support.js` и передать в `RenderOptions` параметр `scope` с именем тега хоста, чтобы ограничить область отрисованного содержимого. Так можно сделать, но если нужна отрисовка шаблонов lit-html в теневой DOM на устаревших браузерах, лучше использовать [LitElement](../components/overview.md).

Для динамических стилей в lit-html есть две директивы:

-   [`classMap`](../templates/directives.md#classmap) задаёт классы элемента по свойствам объекта.
-   [`styleMap`](../templates/directives.md#stylemap) задаёт стили элемента по карте свойств и значений.
