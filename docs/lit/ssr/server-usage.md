---
description: Серверный рендеринг начинается с рендеринга шаблона Lit template с помощью специфической для сервера функции render(), предоставляемой в пакете @lit-labs/ssr
---

# Использование сервера Lit SSR

!!!warning ""

    Этот пакет входит в семейство экспериментальных пакетов Lit Labs. Руководство по использованию программ Labs в производстве см. на [странице Lit Labs](https://lit.dev/docs/libraries/labs/).

## Рендеринг шаблонов {#rendering-templates}

Серверный рендеринг начинается с рендеринга шаблона Lit _template_ с помощью специфической для сервера функции `render()`, предоставляемой в пакете `@lit-labs/ssr`.

Функция рендеринга имеет следующую сигнатуру:

```ts
render(value: unknown, renderInfo?: Partial<RenderInfo>): RenderResult
```

Обычно `value` - это `TemplateResult`, созданный выражением шаблона Lit, например:

```ts
html`<h1>Hello</h1>`;
```

Шаблон может содержать пользовательские элементы. Если пользовательские элементы определены на сервере, они будут отображаться по очереди, вместе с их шаблонами.

```ts
import { render } from '@lit-labs/ssr';
// Import `my-element` on the server to server render it.
import './my-element.js';

const result = render(html`
    <h1>Hello SSR!</h1>
    <my-element></my-element>
`);
```

Чтобы отобразить отдельный элемент, вы создаете шаблон, содержащий только этот элемент:

```ts
import './my-element.js';

const result = render(html`<my-element></my-element>`);
```

### Работа с результатами рендеринга {#handling-renderresults}

`render()` возвращает `RenderResult`: итератор значений, которые могут быть переданы потоком или сведены в строку.

`RenderResult` может содержать строки, вложенные результаты рендеринга или обещания строк или результатов рендеринга. Не все результаты рендеринга содержат Promises - они могут возникать, когда пользовательские элементы выполняют асинхронные задачи, например, получение данных. Но поскольку `RenderResult` может содержать Promises, его обработка в строку или HTTP-ответ является _потенциально_ асинхронной операцией.

Даже если `RenderResult` может содержать Promises, он все равно является синхронизируемым итерируемым, а не асинхронизируемым итерируемым. Это связано с тем, что синхронизируемые итерабели быстрее, чем асинхронизируемые итерабели, и многие серверные рендеры не требуют асинхронного рендеринга и поэтому не должны нести накладные расходы на асинхронизируемый итерабель.

Разрешение Promises в синхронном итерабеле создает своего рода гибридный протокол синхронной/асинхронной итерации. При потреблении `RenderResult` вы должны проверять каждое значение на предмет того, является ли оно Promise или итерируемым, и ждать или рекурсировать в зависимости от необходимости.

`@lit-labs/ssr` содержит три утилиты, которые делают это за вас:

-   `RenderResultReadable`
-   `collectResult()`
-   `collectResultSync()`

#### `RenderResultReadable`

`RenderResultReadable` - это реализация потока Node `Readable`, который предоставляет значения из `RenderResult`. Его можно направить в поток `Writable` или передать фреймворкам веб-серверов, таким как Koa.

Это предпочтительный способ обработки результатов SSR при интеграции с потоковым HTTP-сервером или другим API, поддерживающим потоки.

```ts
import { render } from '@lit-labs/ssr';
import { RenderResultReadable } from '@lit-labs/ssr/lib/render-result-readable.js';

// Using Koa to stream
app.use(async (ctx) => {
    const result = render(html`<my-element></my-element>`);
    ctx.type = 'text/html';
    ctx.body = new RenderResultReadable(result);
});
```

#### `collectResult()`

`collectResult(result: RenderResult): Promise<string>`

`collectResult()` - это async-функция, которая принимает `RenderResult` и объединяет его в строку. Она ожидает Promises и выполняет рекурсию во вложенные итерационные таблицы.

**Пример:**

```ts
import { render } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';

const result = render(html`<my-element></my-element>`);
const html = await collectResult(result);
```

#### `collectResultSync()`

`collectResultSync(result: RenderResult): Promise<string>`

`collectResultSync()` - это функция синхронизации, которая принимает `RenderResult` и объединяет его в строку. Она выполняет рекурсию во вложенных итерациях, но _бросает_ исключение, когда встречает Promise.

Поскольку эта функция не поддерживает асинхронный рендеринг, рекомендуется использовать ее только в тех случаях, когда вы не можете ожидать асинхронных функций.

```ts
import { render } from '@lit-labs/ssr';
import { collectResultSync } from '@lit-labs/ssr/lib/render-result.js';

const result = render(html`<my-element></my-element>`);
// Throws if `result` contains a Promise!
const html = collectResultSync(result);
```

### Опции рендера {#render-options}

Вторым аргументом `render()` является объект `RenderInfo`, который используется для передачи опций и текущего состояния рендеринга компонентам и подшаблонам.

Основными опциями, которые могут быть установлены вызывающим пользователем, являются:

-   `deferHydration`: определяет, добавлять ли к пользовательским элементам верхнего уровня атрибут `defer-hydration`, сигнализирующий о том, что элементы не должны автоматически увлажняться. По умолчанию это значение равно `false`, так что элементы верхнего уровня будут автоматически гидратироваться.
-   `ElementRenderers`: Массив классов `ElementRenderer`, используемых для рендеринга пользовательских элементов. По умолчанию он содержит `LitElementRenderer` для рендеринга Lit-элементов. Его можно настроить на включение пользовательских экземпляров `ElementRenderer` (документация готовится), или установить пустой массив для полного отключения рендеринга пользовательских элементов.

## Запуск SSR в модуле VM или в глобальной области видимости {#running-ssr-in-a-vm-module-or-the-global-scope}

Чтобы отрисовывать пользовательские элементы в Node, они должны быть сначала определены и зарегистрированы в глобальном API `customElements`, что является функцией только для браузера. Поэтому, когда Lit запускается в Node, он автоматически использует набор минимальных DOM API, необходимых для рендеринга Lit на сервере, и определяет глобальный `customElements`. (Список эмулируемых API см. в [Эмуляция DOM](./dom-emulation.md)).

Lit SSR предоставляет два различных способа рендеринга пользовательских элементов на стороне сервера: рендеринг в [глобальной области](#global-scope) или через [VM-модули](#vm-module). VM-модули используют API Node [`vm.Module`](https://nodejs.org/api/vm.html#class-vmmodule), который позволяет выполнять код в контексте виртуальной машины V8. Эти два метода отличаются в первую очередь тем, как разделяется глобальное состояние, например, реестр пользовательских элементов.

При рендеринге в глобальной области видимости будет определен один общий реестр `customElements`, который будет использоваться во всех запросах рендеринга, а также любое другое глобальное состояние, которое может быть установлено кодом вашего компонента.

Рендеринг с помощью модулей VM позволяет каждому запросу рендеринга иметь свой собственный контекст с отдельным глобалом от основного процесса Node. Реестр `customElements` будет установлен только в этом контексте, и другие глобальные состояния также будут изолированы от этого контекста. Модули VM - это экспериментальная функция Node.

| Global | VM Module |
| --- | --- |
| **Плюсы:** Прост в использовании. Можно напрямую импортировать модули компонентов и вызывать `render()` с помощью шаблонов<br />**Минусы:** Пользовательские элементы регистрируются в общем реестре для разных запросов рендеринга. | **Плюсы:** Изолирует контексты от различных запросов рендеринга.<br />**Минусы:** Менее интуитивное использование. Необходимо написать и указать файл модуля с функцией для вызова.<br />Медленнее из-за необходимости повторной оценки графа модуля при каждом запросе. |

### Глобальная область видимости {#global-scope}

При использовании глобальной области видимости вы можете просто вызвать `render()` с шаблоном, чтобы получить `RenderResult` и передать его на сервер:

```js
import { render } from '@lit-labs/ssr';
import { RenderResultReadable } from '@lit-labs/ssr/lib/render-result-readable.js';
import { myTemplate } from './my-template.js';

// ...

// within a Koa middleware, for example
app.use(async (ctx) => {
    const ssrResult = render(myTemplate(data));
    ctx.type = 'text/html';
    ctx.body = new RenderResultReadable(ssrResult);
});
```

### Модуль VM {#vm-module}

Lit также предоставляет возможность загружать код приложения в отдельный VM-контекст с собственным глобальным объектом и осуществлять рендеринг из него.

```js
// render-template.js
import { render } from '@lit-labs/ssr';
import { myTemplate } from './my-template.js';

export const renderTemplate = (someData) => {
    return render(myTemplate(someData));
};
```

=== "TS"

    ```ts
    // server.js
    import { ModuleLoader } from '@lit-labs/ssr/lib/module-loader.js';
    import { RenderResultReadable } from '@lit-labs/ssr/lib/render-result-readable.js';

    // ...

    // within a Koa middleware, for example
    app.use(async (ctx) => {
    	const moduleLoader = new ModuleLoader();
    	const importResult = await moduleLoader.importModule(
    		'./render-template.js', // Module to load in VM context
    		import.meta.url, // Referrer URL for module
    	);
    	const { renderTemplate } = importResult.module
    		.namespace as typeof import('./render-template.js');
    	const ssrResult = await renderTemplate({
    		some: 'data',
    	});
    	ctx.type = 'text/html';
    	ctx.body = new RenderResultReadable(ssrResult);
    });
    ```

=== "JS"

    ```js
    // server.js
    import { ModuleLoader } from '@lit-labs/ssr/lib/module-loader.js';
    import { RenderResultReadable } from '@lit-labs/ssr/lib/render-result-readable.js';

    // ...

    // within a Koa middleware, for example
    app.use(async (ctx) => {
    	const moduleLoader = new ModuleLoader();
    	const importResult = await moduleLoader.importModule(
    		'./render-template.js', // Module to load in VM context
    		import.meta.url, // Referrer URL for module
    	);
    	const { renderTemplate } =
    		importResult.module.namespace;
    	const ssrResult = await renderTemplate({
    		some: 'data',
    	});
    	ctx.type = 'text/html';
    	ctx.body = new RenderResultReadable(ssrResult);
    });
    ```

!!!note ""

    Для использования этой возможности требуется Node 14+ и передача флага `--experimental-vm-modules` Node из-за использования экспериментальных модулей VM для создания совместимого с модулями контекста VM.
