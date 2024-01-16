---
title: Building for production
eleventyNavigation:
    key: Production
    parent: Tools
    order: 6
versionLinks:
    v1: tools/build/
    v2: tools/production/
---

# Сворка для продакшена

Эта страница посвящена рекомендациям по созданию _приложения_, использующего компоненты Lit для производства. Рекомендации по сборке исходного кода перед публикацией многократно используемого Lit-компонента в npm см. в разделе [Publishing](./publishing.md).

При создании приложения, включающего компоненты Lit, вы можете использовать такие распространенные инструменты сборки JavaScript, как [Rollup](https://rollupjs.org/) или [webpack](https://webpack.js.org/), чтобы подготовить исходный код и зависимости к работе в производственной среде.

Полный список требований к сборке Lit-кода, применимых как к разработке, так и к производству, см. в [Requirements](./requirements.md).

В дополнение к этим минимальным требованиям на этой странице описаны оптимизации, которые следует учитывать при подготовке кода к производству, а также конкретная конфигурация Rollup, которая их реализует.

## Подготовка кода к производству {#preparing-code-for-production}

Проекты Lit пользуются теми же оптимизациями времени сборки, что и другие веб-проекты. При обслуживании Lit-приложений в производстве рекомендуется использовать следующие оптимизации:

-   Пакетирование модулей Javascript для уменьшения количества сетевых запросов (например, с помощью [Rollup](https://rollupjs.org/) или [webpack](https://webpack.js.org/)).
-   Минификация Javascript-кода для уменьшения размера полезной нагрузки ([Terser](https://www.npmjs.com/package/terser) хорошо подходит для Lit, поскольку поддерживает современный JavaScript).
-   [Передача современного кода современным браузерам](https://web.dev/serve-modern-code-to-modern-browsers/), так как он обычно меньше и быстрее, и возврат к скомпилированному коду в старых браузерах.
-   [Хеширование статических активов, включая встроенный JavaScript](https://web.dev/love-your-cache/#fingerprinted-urls) для более легкого аннулирования кэша.
-   [Включение сжатия при обслуживании](https://web.dev/reduce-network-payloads-using-text-compression/#data-compression) (например, gzip или brotli) для уменьшения количества байт, передаваемых по проводам.

Кроме того, обратите внимание, что поскольку шаблоны Lit определяются внутри строковых литералов шаблонов JavaScript, они не обрабатываются стандартными минификаторами HTML. Добавление плагина, который минифицирует HTML в строковых литералах шаблонов, может привести к скромному уменьшению размера кода. Существует несколько пакетов для такой оптимизации:

-   Rollup: [rollup-plugin-minify-html-literals](https://www.npmjs.com/package/rollup-plugin-minify-html-literals?activeTab=readme)
-   Webpack: [minify-html-literals-loader](https://www.npmjs.com/package/minify-html-literals-loader)

## Создание с помощью Rollup {#building-with-rollup}

Существует множество инструментов, которые можно использовать для выполнения необходимых и дополнительных шагов сборки, необходимых для обслуживания кода Lit, и Lit не требует какого-то одного конкретного инструмента. Однако мы рекомендуем Rollup, поскольку он предназначен для работы со стандартным форматом модулей ES и вывода оптимального кода, использующего нативные модули на клиенте.

Существует множество способов настроить Rollup для пакетирования вашего проекта. Проект [Modern Web](https://modern-web.dev/) поддерживает отличный плагин Rollup [`@web/rollup-plugin-html`](https://modern-web.dev/docs/building/rollup-plugin-html/), который помогает связать ряд лучших практик по созданию приложений в простой в использовании пакет. Примеры конфигураций, использующих этот плагин, описаны ниже.

### Сборка только для современных приложений

Аннотированный файл `rollup.config.js`, представленный ниже, создаст приложение, отвечающее [требованиям к сборке для современных браузеров](./requirements.md#building-for-modern-browsers) и [оптимизациям для производства](#preparing-code-for-production), описанным на этой странице. Эта конфигурация подходит для обслуживания современных браузеров, которые могут работать с ES2021 JS без полифиллов.

Требуемые модули узла:

```sh
npm i --save-dev rollup \
  @web/rollup-plugin-html \
  @web/rollup-plugin-copy \
  @rollup/plugin-node-resolve \
  @rollup/plugin-terser \
  rollup-plugin-minify-html-literals \
  rollup-plugin-summary
```

`rollup.config.js:`

```js
// Import rollup plugins
import html from '@web/rollup-plugin-html';
import { copy } from '@web/rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from '@rollup/plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';

export default {
    plugins: [
        // Entry point for application build; can specify a glob to build multiple
        // HTML files for non-SPA app
        html({
            input: 'index.html',
        }),
        // Resolve bare module specifiers to relative paths
        resolve(),
        // Minify HTML template literals
        minifyHTML(),
        // Minify JS
        terser({
            ecma: 2021,
            module: true,
            warnings: true,
        }),
        // Print bundle summary
        summary(),
        // Optional: copy any static assets to build directory
        copy({
            patterns: ['images/**/*'],
        }),
    ],
    output: {
        dir: 'build',
    },
    preserveEntrySignatures: 'strict',
};
```

Запуск сборки rollup:

```sh
rollup -c
```
