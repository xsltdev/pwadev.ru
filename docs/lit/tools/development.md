---
description: На этапе разработки проектов, когда вы пишете компоненты Lit, следующие инструменты помогут вам повысить производительность
---

# Разработка

На этапе разработки проектов, когда вы пишете компоненты Lit, следующие инструменты помогут вам повысить производительность:

-   dev-сервер для предварительного просмотра кода без этапа сборки.
-   TypeScript для написания кода с проверкой типов.
-   Линтер для выявления ошибок Javascript.
-   Форматировщик кода для последовательного форматирования кода.
-   Lit-специфические плагины IDE для линтинга и синтаксической подсветки Lit-шаблонов.

Ознакомьтесь с документацией [Стартовых наборов](starter-kits.md), чтобы легко создать среду разработки с предварительно настроенными функциями.

## Сборки для разработки и производства

Все пакеты Lit публикуются в сборках для разработки и производства, используя поддержку Node для [export conditions](https://nodejs.org/api/packages.html#packages_conditional_exports).

Производственная сборка оптимизирована с очень агрессивными настройками минификации. Сборка для разработки не минифицирована для облегчения отладки и включает дополнительные проверки и предупреждения. По умолчанию используется производственная сборка, чтобы проекты случайно не развернули большую сборку разработки.

Вы должны выбрать сборку для разработки, указав условие экспорта `"development"` в инструментах, поддерживающих условия экспорта, таких как Rollup, Webpack и Web Dev Server. Для каждого инструмента это делается по-разному.

Например, в Rollup, используя плагин `@rollup/node-resolve`, вы можете выбрать сборку для разработки с помощью опции `exportConditions`:

```js
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    // ...
    plugins: [
        nodeResolve({
            exportConditions: ['development'],
        }),
    ],
};
```

### Предупреждения времени выполнения в сборках разработки

Сборки разработки `ReactiveElement` и `LitElement` поддерживают дополнительные предупреждения во время выполнения, которые могут помочь выявить проблемы, которые было бы дорого проверять в производственных сборках.

Некоторые предупреждения отображаются всегда. Также есть две категории _опциональных предупреждений_, которые можно включить или выключить:

-   `'migration'`. Предупреждения, связанные с переходом с LitElement 2.x. По умолчанию выключены.
-   `'change-in-update'`. Предупреждения, связанные с изменением реактивного состояния во время обновления. По умолчанию включено.

Управлять необязательными предупреждениями можно с помощью методов `ReactiveElement.disableWarning()` и `ReactiveElement.enableWarning()`. Вы можете вызывать их у любого подкласса `ReactiveElement`, включая `LitElement` и ваши собственные классы. Вызов методов на заданном классе включает или выключает предупреждения для этого класса и всех его подклассов. Например, вы можете отключить категорию предупреждений для всех классов `ReactiveElement`, для всех классов `LitElement` или для определенного подкласса `LitElement`.

Эти методы доступны только в сборках разработки, поэтому не забудьте защитить доступ к ним. Мы рекомендуем использовать необязательное построение цепочек.

Примеры:

```ts
import { LitElement, ReactiveElement } from 'lit';

// Turn off migration warnings on all ReactiveElements,
// including LitElements
ReactiveElement.disableWarning?.('migration');

// Turn off update warnings on all LitElements
LitElement.disableWarning?.('change-in-update');

// Turn off update warnings on one element
MyElement.disableWarning?.('change-in-update');
```

Вы также можете управлять предупреждениями в рамках одного класса, определив свойство `static enabledWarnings`:

```ts
class MyElement extends LitElement {
    static enabledWarnings = ['migration'];
}
```

Для размера кода будет лучше, если код для управления предупреждениями будет исключен из ваших собственных производственных сборок.

#### Предупреждение о нескольких версиях Lit {#multiple-lit-versions}

Предупреждение только для dev-режима, выдаваемое при обнаружении нескольких версий или даже нескольких копий одной и той же версии любого из пакетов ядра Lit - `lit-html`, `lit-element`, `@lit/reactive-element`.

Если Lit используется как внутренняя зависимость элементов, элементы могут использовать разные версии Lit и будут полностью совместимы. Мы также позаботились о том, чтобы Lit 2 и Lit 3 были в основном совместимы друг с другом. Например, вы можете передать шаблон Lit 2 в функцию рендеринга Lit 3 и наоборот.

Так почему же это предупреждение? Lit иногда сравнивают с фреймворками, которые часто ломаются, если смешивать компоненты, использующие разные версии фреймворков. Таким образом, можно случайно установить несколько дублирующихся версий Lit, не заметив этого.

Загрузка нескольких совместимых версий Lit неоптимальна, поскольку пользователю приходится отправлять лишние дублирующиеся байты.

Если вы публикуете библиотеку, использующую Lit, следуйте нашим [лучшим практикам публикации](publishing.md#don't-bundle-minify-or-optimize-modules), чтобы потребители вашей библиотеки могли избавиться от дублирования Lit в своих проектах.

##### Устранение множественных версий Lit

Можно следовать приведенным ниже шагам, но не иметь возможности дедублировать Lit, например, библиотека, от которой вы зависите, поставляет определенную версию Lit. В таких случаях предупреждение можно проигнорировать.

Если вы видите предупреждение `Multiple versions of Lit loaded` в режиме разработки, вы можете попробовать сделать несколько вещей:

1.  Выяснить, какие библиотеки Lit имеют несколько загруженных версий, проверив следующие переменные в консоли браузера: `window.litElementVersions`, `window.reactiveElementVersions` и `window.litHtmlVersions`.

2.  Используйте `npm ls` (обратите внимание, вы можете указать конкретные библиотеки для поиска, например, `npm ls @lit/reactive-element`), чтобы определить, какие зависимости загружают несколько разных версий Lit.

3.  Попробуйте использовать `npm dedupe` для удаления дубликатов Lit. Используйте `npm ls`, чтобы проверить, был ли дублированный пакет Lit успешно удален.

4.  Можно подтолкнуть `npm` к установке определенных версий основных пакетов Lit, установив их в качестве прямых зависимостей вашего проекта с помощью `npm i @lit/reactive-element@latest lit-element@latest lit-html@latest`. Замените `latest` на версию, до которой вы хотите произвести дедуплицирование.

5.  Если дублирование все еще присутствует, возможно, вам придется удалить блокировку пакетов и `node_modules`. Затем установите нужную вам версию `lit`, за которой следуют ваши зависимости.

## Локальные dev-серверы {#devserver}

Lit упакован в виде JavaScript-модулей и использует спецификаторы модулей, которые пока не поддерживаются в большинстве браузеров. Голые спецификаторы широко используются, и вы можете захотеть использовать их и в своем коде. Например:

```js
import { LitElement, html, css } from 'lit';
```

Чтобы запустить этот код в браузере, голый спецификатор (`'lit'`) нужно преобразовать в URL, который может загрузить браузер (например, `'/node_modules/lit/lit.js'`).

Существует множество серверов разработки, которые могут работать со спецификаторами модулей. Если у вас уже есть сервер разработки, который делает это и интегрируется с вашим процессом сборки, этого должно быть достаточно.

Если вам нужен сервер разработки, мы рекомендуем [Web Dev Server](https://modern-web.dev/docs/dev-server/overview/).

### Web Dev Server {#web-dev-server}

[Web Dev Server](https://modern-web.dev/docs/dev-server/overview/) - это сервер разработки с открытым исходным кодом, который обеспечивает процесс разработки без сборки.

Он занимается переписыванием пустых спецификаторов модулей в корректные URL, как того требуют браузеры.

Установите Web Dev Server:

```bash
npm i @web/dev-server --save-dev
```

Добавьте команду в файл `package.json`:

```json
"scripts": {
  "start": "web-dev-server"
}
```

И файл `web-dev-server.config.js`:

```js
export default {
    open: true,
    watch: true,
    appIndex: 'index.html',
    nodeResolve: {
        exportConditions: ['development'],
    },
};
```

Запустите сервер разработки:

```bash
npm run start
```

#### Поддержка устаревших браузеров

Для старых браузеров, таких как IE11, Web Dev Server может преобразовывать модули JavaScript, чтобы использовать обратно совместимый загрузчик модулей SystemJS, и автоматически обслуживать полифиллы веб-компонентов. Для поддержки старых браузеров вам потребуется настроить пакет `@web/dev-server-legacy`.

Установите пакет Web Dev Server legacy:

```bash
npm i @web/dev-server-legacy --save-dev
```

Настройте `web-dev-server.config.js`:

```js
import { legacyPlugin } from '@web/dev-server-legacy';

export default {
    // ...
    plugins: [
        // Make sure this plugin is always last
        legacyPlugin({
            polyfills: {
                webcomponents: true,
                // Inject lit's polyfill-support module into test files, which is required
                // for interfacing with the webcomponents polyfills
                custom: [
                    {
                        name: 'lit-polyfill-support',
                        path: 'node_modules/lit/polyfill-support.js',
                        test: "!('attachShadow' in Element.prototype)",
                        module: false,
                    },
                ],
            },
        }),
    ],
};
```

Полные инструкции по установке и использованию см. в [документации Web Dev Server](https://modern-web.dev/docs/dev-server/overview/).

## TypeScript {#typescript}

TypeScript расширяет язык Javascript, добавляя поддержку типов. Типы полезны для раннего обнаружения ошибок и повышения читабельности и понятности кода.

Чтобы установить TypeScript в свой проект, выполните следующие действия:

```bash
npm install typescript --save-dev
```

Чтобы собрать код:

```bash
npx tsc --watch
```

Полные инструкции по установке и использованию см. на сайте [TypeScript](https://www.typescriptlang.org/). Для начала работы особенно полезны разделы [установка TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html) и [использование его возможностей](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).

## Линтинг JavaScript и TypeScript {#linting}

Линтинг поможет выявить ошибки в вашем коде. Мы рекомендуем использовать [ESLint](https://eslint.org) для линтинга Lit-кода.

Чтобы установить ESLint в свой проект:

```bash
npm install eslint --save-dev
npx eslint --init
```

Чтобы запустить его:

```bash
npx eslint yourfile.js
```

Или добавьте его в свои скрипты npm:

```json
{
    "scripts": {
        "lint": "eslint \"**/*.{js,ts}\""
    }
}
```

Полные инструкции по установке и использованию см. в [документации ESLint](https://eslint.org/docs/user-guide/getting-started).

Мы также рекомендуем [`eslint-plugin-lit` для ESLint](https://www.npmjs.com/package/eslint-plugin-lit), который обеспечивает проверку HTML-шаблонов Lit, включая общие проверки HTML-шаблонов и специфические для Lit правила.

Интеграция линтинга в рабочий процесс IDE поможет выявлять ошибки как можно раньше. Смотрите [Lit-specific IDE plugins](#ide-plugins), чтобы настроить вашу IDE для работы с Lit.

## Форматирование исходного кода {#formatting}

Использование форматировщика кода поможет обеспечить его единообразие и читабельность. Интеграция выбранного вами форматировщика с вашей IDE гарантирует, что ваш код всегда будет чистым и аккуратным.

Несколько популярных вариантов включают:

-   [Prettier](https://prettier.io/): [VS Code plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   [Beautifier](https://beautifier.io/): [VS Code plugin](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)
-   [Clang](https://www.npmjs.com/package/clang-format): [VS Code plugin](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)

## Lit-специфические плагины IDE {#ide-plugins}

Существует ряд плагинов для IDE, которые могут быть полезны при разработке на Lit. В частности, мы рекомендуем использовать подсветку синтаксиса, которая работает с шаблонами Lit.

### lit-plugin

`lit-plugin` обеспечивает подсветку синтаксиса, проверку типов и многое другое для шаблонов Lit. Он [доступен для VS Code](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin), или вы можете использовать [`ts-lit-plugin` плагин компилятора TypeScript](https://github.com/runem/lit-analyzer/tree/master/packages/ts-lit-plugin), который работает с Sublime Text и Atom.

`lit-plugin` и `ts-lit-plugin` обеспечивают:

-   подсветку синтаксиса
-   проверка типов
-   завершение кода
-   Наведение курсора на документацию
-   Переход к определению
-   Линтинг
-   Быстрые исправления

### ESLint

ESLint имеет [интеграции](https://eslint.org/docs/user-guide/integrations#editors) для ряда редакторов кода. Если в конфигурации ESLint установлен [`eslint-plugin-lit` для ESLint](https://www.npmjs.com/package/eslint-plugin-lit), ваша IDE будет показывать специфические ошибки и предупреждения Lit.

### Другие плагины

Другие плагины для IDE, а также дополнительные инструменты и информацию смотрите в репозитории [awesome-lit-html](https://github.com/web-padawan/awesome-lit-html#ide-plugins).
