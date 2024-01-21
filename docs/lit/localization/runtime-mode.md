---
description: В режиме выполнения Lit Localize для каждой из ваших локалей генерируется один модуль JavaScript или TypeScript. Каждый сгенерированный модуль содержит локализованные шаблоны для этой локали
---

# Режим локализации во время выполнения

В режиме выполнения Lit Localize для каждой из ваших локалей генерируется один модуль JavaScript или TypeScript. Каждый сгенерированный модуль содержит локализованные шаблоны для этой локали. Когда ваше приложение переключается на другую локаль, модуль для этой локали импортируется, и все локализованные компоненты перерисовываются.

Сравнение режимов вывода Lit Localize см. в разделе [Режимы вывода](./overview.md#output-modes).

Пример вывода:

```js
// locales/es-419.ts
export const templates = {
    h3c44aff2d5f5ef6b: html`Hola <b>Mundo!</b>`,
};
```

## Пример использования режима выполнения

Следующий пример демонстрирует приложение, созданное с использованием режима времени выполнения Lit Localize:

<litdev-example sandbox-base-url="https://playground.lit.dev/" style="--litdev-example-editor-lines-ts:12;
               --litdev-example-editor-lines-js:14;
               --litdev-example-preview-height:120px" project="v3-docs/libraries/localization/runtime" filename="x-greeter.ts"></litdev-example>

В репозитории Lit GitHub есть полные рабочие примеры ([JavaScript](https://github.com/lit/lit/tree/main/packages/localize/examples/runtime-js), [TypeScript](https://github.com/lit/lit/tree/main/packages/localize/examples/runtime-ts)) режима выполнения Lit Localize, которые можно использовать в качестве шаблонов.

## Настройка режима выполнения

В конфигурации `lit-localize.json` установите для свойства `output.mode` значение `runtime`, а для свойства `output.outputDir` - место, где вы хотите генерировать локализованные модули шаблонов. Более подробная информация приведена в разделе [Настройки режима выполнения](cli-and-config.md#runtime-mode-settings).

Затем установите `output.localeCodesModule` в выбранный вами путь к файлу. Lit Localize сгенерирует здесь модуль `.js` или `.ts`, который будет отражать настройки `sourceLocale` и `targetLocales` в вашем конфигурационном файле как экспортируемые переменные. Сгенерированный модуль будет выглядеть примерно так:

```js
export const sourceLocale = 'en';
export const targetLocales = ['es-419', 'zh-Hans'];
export const allLocales = ['en', 'es-419', 'zh-Hans'];
```

Наконец, в вашем JavaScript или TypeScript проекте вызовите `configureLocalization`, передав объект со следующими свойствами:

-   `sourceLocale: string`: Переменная `sourceLocale`, экспортируемая сгенерированным вами модулем `output.localeCodesModule`.
-   `targetLocales: string[]`: Переменная `targetLocales`, экспортируемая сгенерированным вами модулем `output.localeCodesModule`.
-   `loadLocale: (locale: string) => Promise<LocaleModule>`: Функция, загружающая локализованный шаблон. Возвращает обещание, разрешающее сгенерированный модуль локализованного шаблона для заданного кода локали. Примеры функций, которые вы можете использовать здесь, смотрите в [Подходы к загрузке модулей локали](#approaches-for-loading-locale-modules).

`configureLocalization` возвращает объект со следующими свойствами:

-   `getLocale`: Функция, возвращающая код активной локали. Если началась загрузка новой локали, `getLocale` будет продолжать возвращать код предыдущей локали, пока не закончится загрузка новой.
-   `setLocale`: Функция, которая начинает переключать активную локаль на заданный код и возвращает обещание, которое разрешается после загрузки новой локали. Пример использования:

Например:

```js
import { configureLocalization } from '@lit/localize';
// Generated via output.localeCodesModule
import {
    sourceLocale,
    targetLocales,
} from './generated/locales.js';

export const { getLocale, setLocale } =
    configureLocalization({
        sourceLocale,
        targetLocales,
        loadLocale: (locale) =>
            import(`/locales/${locale}.js`),
    });
```

## Автоматический рендеринг

Чтобы автоматически вызывать перерисовку компонента при переключении активной локали, примените функцию `updateWhenLocaleChanges` в вашем `конструкторе` при написании JavaScript, или примените декоратор `@localized` к вашему классу при написании TypeScript.

=== "TS"

    ```ts
    import {LitElement, html} from 'lit';
    import {customElement} from 'lit/decorators.js';
    import {msg, localized} from '@lit/localize';

    @customElement('my-element');
    @localized()
    class MyElement extends LitElement {
    	render() {
    		// Whenever setLocale() is called, and templates for that locale have
    		// finished loading, this render() function will be re-invoked.
    		return msg(html`Hello <b>World!</b>`);
    	}
    }
    ```

=== "JS"

    ```js
    import { LitElement, html } from 'lit';
    import {
    	msg,
    	updateWhenLocaleChanges,
    } from '@lit/localize';

    class MyElement extends LitElement {
    	constructor() {
    		super();
    		updateWhenLocaleChanges(this);
    	}

    	render() {
    		// Whenever setLocale() is called, and templates for that locale have
    		// finished loading, this render() function will be re-invoked.
    		return msg(html`Hello <b>World!</b>`);
    	}
    }
    customElements.define('my-element', MyElement);
    ```

## Событие статуса

Событие `lit-localize-status` срабатывает в `window` каждый раз, когда начинается, завершается или не работает переключение локали. Вы можете использовать это событие для:

-   Повторного рендеринга, когда вы не можете использовать декоратор `@localized` (например, при использовании функции Lit `render` напрямую).
-   Рендерить, как только начинается переключение локали, даже до того, как она закончит загрузку (например, индикатор загрузки).
-   Выполнять другие задачи, связанные с локализацией (например, установка cookie для предпочтений локали).

### Типы событий

Строковое свойство `detail.status` говорит о том, какой тип изменения статуса произошел, и может быть либо `loading`, либо `ready`, либо `error`:

**`loading`**

: Началась загрузка новой локали.

    Объект `detail` содержит:

    - `loadingLocale: string`: Код локали, которая начала загружаться.

    В случае, если вторая локаль запрашивается до того, как первая закончит загрузку, отправляется новое событие `loading`, а для первого запроса не будет отправлено событие `ready` или `error`.

    За статусом `loading` может следовать статус `ready`, `error` или `loading`.

**`ready`**

: Новая локаль успешно загружена и готова к рендерингу.

    Объект `detail` содержит:

    -   `readyLocale: string`: Код локали, которая успешно загрузилась.

    За статусом `ready` может следовать только статус `loading`.

**`error`**

: Не удалось загрузить новую локаль.

    Объект `detail` содержит:

    -   `errorLocale: string`: Код локали, которую не удалось загрузить.
    -   `errorMessage: string`: Сообщение об ошибке при неудачной загрузке локали.

    За статусом `error` может следовать только статус `loading`.

### Пример использования события состояния

```ts
// Show/hide a progress indicator whenever a new locale is loading,
// and re-render the application every time a new locale successfully loads.
window.addEventListener('lit-localize-status', (event) => {
    const spinner = document.querySelector('#spinner');

    if (event.detail.status === 'loading') {
        console.log(
            `Loading new locale: ${event.detail.loadingLocale}`,
        );
        spinner.removeAttribute('hidden');
    } else if (event.detail.status === 'ready') {
        console.log(
            `Loaded new locale: ${event.detail.readyLocale}`,
        );
        spinner.setAttribute('hidden', '');
        renderApplication();
    } else if (event.detail.status === 'error') {
        console.error(
            `Error loading locale ${event.detail.errorLocale}: ` +
                event.detail.errorMessage,
        );
        spinner.setAttribute('hidden', '');
    }
});
```

## Подходы к загрузке модулей локали {#approaches-for-loading-locale-modules}

Lit Localize позволяет загружать модули локали как угодно, поскольку в качестве опции `loadLocale` можно передать любую функцию. Вот несколько распространенных шаблонов:

### Lazy-load

Используйте [динамический импорт](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports) для загрузки каждой локали только тогда, когда она становится активной. Это хороший вариант по умолчанию, потому что он минимизирует количество кода, который будут загружать и выполнять ваши пользователи.

```js
import { configureLocalization } from '@lit/localize';
import {
    sourceLocale,
    targetLocales,
} from './generated/locales.js';

const { getLocale, setLocale } = configureLocalization({
    sourceLocale,
    targetLocales,
    loadLocale: (locale) => import(`/locales/${locale}.js`),
});
```

### Предварительная загрузка

Начните предварительную загрузку всех локалей при загрузке страницы. Динамический импорт по-прежнему используется для того, чтобы остальные сценарии на странице не блокировались, пока происходит выборка модулей локалей.

```js
import { configureLocalization } from '@lit/localize';
import {
    sourceLocale,
    targetLocales,
} from './generated/locales.js';

const localizedTemplates = new Map(
    targetLocales.map((locale) => [
        locale,
        import(`/locales/${locale}.js`),
    ]),
);

const { getLocale, setLocale } = configureLocalization({
    sourceLocale,
    targetLocales,
    loadLocale: async (locale) =>
        localizedTemplates.get(locale),
});
```

### Статический импорт

Используйте [static imports](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import) для предварительной загрузки всех локалей таким образом, чтобы блокировать другие сценарии на странице.

!!!alert ""

    Обычно такой подход не рекомендуется, поскольку в этом случае будет извлечено и выполнено больше кода, чем нужно, прежде чем успеет выполниться остальная часть сценария на странице, что заблокирует интерактивность. Используйте этот подход, только если ваше приложение очень маленькое, должно распространяться в одном файле JavaScript, или у вас есть другие ограничения, которые не позволяют использовать динамический импорт.

```js
import {configureLocalization} from '@lit/localize';
import {sourceLocale, targetLocales} from './generated/locales.js';

import * as templates_es_419 from './locales/es-419.js';
import * as templates_zh_hans from './locales/zh-Hans.js';
...

const localizedTemplates = new Map([
  ['es-419', templates_es_419],
  ['zh-Hans', templates_zh_hans],
  ...
]);

const {getLocale, setLocale} = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: async (locale) => localizedTemplates.get(locale),
});
```
