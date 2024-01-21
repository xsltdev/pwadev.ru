---
description: Lit SSR генерирует статический HTML, который браузер может разобрать и раскрасить без использования JavaScript
---

# Использование клиента Lit SSR

!!!warning ""

    Этот пакет входит в семейство экспериментальных пакетов Lit Labs. Руководство по использованию программ Labs в производстве см. на [странице Lit Labs](https://lit.dev/docs/libraries/labs/).

Lit SSR генерирует статический HTML, который браузер может разобрать и раскрасить без использования JavaScript. (Браузеры, не поддерживающие декларативный Shadow DOM, потребуют некоторого JavaScript-полифилла для компонентов Lit, созданных для использования Shadow DOM). Для страниц со статичным содержимым это все, что нужно. Однако если содержимое страницы должно быть динамичным и реагировать на действия пользователя, потребуется JavaScript для повторного применения этой реактивности.

Способ повторного применения реактивности на стороне клиента зависит от того, используете ли вы автономные шаблоны Lit или компоненты Lit.

## Автономные шаблоны Lit

**"Гидратация" шаблонов Lit** - это процесс повторного связывания выражений шаблонов Lit с узлами, которые они должны обновлять в DOM, а также добавление слушателей событий. Для гидратации шаблонов Lit в пакете `@lit-labs/ssr-client` предусмотрен метод `hydrate()`. Перед обновлением контейнера, отрендеренного на сервере с помощью `render()`, необходимо сначала вызвать `hydrate()` для этого контейнера, используя тот же шаблон и данные, которые были использованы для рендеринга на сервере:

```js
import { render } from 'lit';
import { hydrate } from '@lit-labs/ssr-client';
import { myTemplate } from './my-template.js';
// Initial hydration required before render:
// (must be same data used to render on the server)
const initialData = getInitialAppData();
hydrate(myTemplate(initialData), document.body);

// After hydration, render will efficiently update the server-rendered DOM:
const update = (data) =>
    render(myTemplate(data), document.body);
```

## Компоненты Lit

Чтобы вновь применить реактивность к компонентам Lit, необходимо загрузить определения пользовательских элементов для их обновления, включить обратные вызовы их жизненного цикла, а шаблоны в теневых корнях компонентов должны быть гидратированы.

Обновление может быть достигнуто простой загрузкой модуля компонента, который регистрирует пользовательский элемент. Это может быть сделано путем загрузки пакета всех определений компонентов для страницы, или может быть сделано на основе более сложной эвристики, когда только подмножество определений загружается по мере необходимости. Чтобы обеспечить гидратацию шаблонов в теневых корнях `LitElement`, загрузите модуль `@lit-labs/ssr-client/lit-element-hydrate-support.js`, который устанавливает поддержку для `LitElement`, чтобы автоматически гидратировать себя, когда он обнаруживает, что был рендерингом сервера с декларативным теневым DOM. Этот модуль должен быть загружен до загрузки модуля `lit` (включая любые модули компонентов, которые импортируют `lit`), чтобы обеспечить правильную установку поддержки гидратации.

При серверном рендеринге компонентов Lit содержимое их теневого корня выдается внутри `<template shadowroot>`, также известного как [Declarative Shadow Root](https://web.dev/declarative-shadow-dom/). Декларативные теневые корни автоматически присоединяют свое содержимое к теневому корню родительского элемента шаблона при разборе HTML без использования JavaScript.

Пока все браузеры не включат поддержку декларативных теневых DOM, доступен очень маленький полифилл, который можно вставить в страницу. Это позволит вам использовать SSR сейчас для всех браузеров с включенным JavaScript и постепенно решать задачи, не связанные с JavaScript, по мере распространения функции на другие браузеры. Использование [`template-shadowroot` polyfill](https://github.com/webcomponents/template-shadowroot) описано ниже.

### Загрузка `@lit-labs/ssr-client/lit-element-hydrate-support.js`

Он должен быть загружен перед любыми модулями компонентов и библиотекой `lit`.

Например:

```html
<body>
    <!-- App components rendered with declarative shadow DOM placed here. -->

    <!-- ssr-client lit-element-hydrate-support should be loaded first. -->
    <script
        type="module"
        src="/node_modules/@lit-labs/ssr-client/lit-element-hydrate-support.js"
    ></script>

    <!-- As component definition loads, your pre-rendered components will
        come to life and become interactive. -->
    <script src="/app-components.js"></script>
</body>
```

Если вы [собираете](../tools/production.md) свой код, убедитесь, что `@lit-labs/ssr-client/lit-element-hydrate-support.js` импортирован первым:

```js
// index.js
import '@lit-labs/ssr-client/lit-element-hydrate-support.js';
import './app-components.js';
```

### Использование полифилла `template-shadowroot`

Приведенный ниже HTML-фрагмент включает опциональную стратегию скрытия тела до загрузки полифилла, чтобы предотвратить смещение макета.

```html
<!doctype html>
<html>
    <head>
        <!-- On browsers that don't yet support native declarative shadow DOM, a
        paint can occur after some or all pre-rendered HTML has been parsed,
        but before the declarative shadow DOM polyfill has taken effect. This
        paint is undesirable because it won't include any component shadow DOM.
        To prevent layout shifts that can result from this render, we use a
        "dsd-pending" attribute to ensure we only paint after we know
        shadow DOM is active. -->
        <style>
            body[dsd-pending] {
                display: none;
            }
        </style>
    </head>

    <body dsd-pending>
        <script>
            if (
                HTMLTemplateElement.prototype.hasOwnProperty(
                    'shadowRoot',
                )
            ) {
                // This browser has native declarative shadow DOM support, so we can
                // allow painting immediately.
                document.body.removeAttribute(
                    'dsd-pending',
                );
            }
        </script>

        <!-- App components rendered with declarative shadow DOM placed here. -->

        <!-- Use a type=module script so that we can use dynamic module imports.
        Note this pattern will not work in IE11. -->
        <script type="module">
            // Check if we require the template shadow root polyfill.
            if (
                !HTMLTemplateElement.prototype.hasOwnProperty(
                    'shadowRoot',
                )
            ) {
                // Fetch the template shadow root polyfill.
                const { hydrateShadowRoots } = await import(
                    '/node_modules/@webcomponents/template-shadowroot/template-shadowroot.js'
                );

                // Apply the polyfill. This is a one-shot operation, so it is important
                // it happens after all HTML has been parsed.
                hydrateShadowRoots(document.body);

                // At this point, browsers without native declarative shadow DOM
                // support can paint the initial state of your components!
                document.body.removeAttribute(
                    'dsd-pending',
                );
            }
        </script>
    </body>
</html>
```

### Комбинированный пример

В этом примере показана стратегия, сочетающая загрузку полифилла `@lit-labs/ssr-client/lit-element-hydrate-support.js` и полифилла `template-shadowroot` и обслуживающая страницу с компонентом SSRed для гидратации на стороне клиента.

[Lit SSR в сервере Koa](https://stackblitz.com/edit/lit-ssr-global?file=src/server.js)
