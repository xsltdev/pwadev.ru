---
description: Тестирование гарантирует, что ваш код работает так, как вы задумали, и избавляет вас от утомительной отладки
---

# Тестирование

Тестирование гарантирует, что ваш код работает так, как вы задумали, и избавляет вас от утомительной отладки.

Смотрите документацию по [Стартовым наборам](starter-kits.md), где представлена простая в использовании установка с полностью готовой тестовой средой, которая отлично подходит для тестирования компонентов Lit.

## Выбор среды тестирования

Lit — это стандартная современная библиотека Javascript, и вы можете использовать практически любой фреймворк для тестирования Javascript для проверки вашего Lit-кода. Существует множество популярных вариантов, включая [Jest](https://jestjs.io/), [Karma](https://karma-runner.github.io/), [Mocha](https://mochajs.org/), [Jasmine](https://jasmine.github.io/) и [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/).

Чтобы эффективно тестировать Lit-код, необходимо убедиться в том, что среда тестирования поддерживает несколько вещей.

### Тестирование в браузере

Компоненты Lit предназначены для работы в браузере, поэтому тестирование должно проводиться в браузерной среде. Инструменты, ориентированные на тестирование кода [node](https://nodejs.org/), могут не подойти.

!!!info ""

    Хотя можно тестировать без браузера, подменяя вызовы DOM, мы не рекомендуем такой подход, поскольку он не позволит протестировать код так, как его воспринимают пользователи.

### Поддержка современного Javascript

Тестовая среда, которую вы используете, должна поддерживать современный Javascript, включая использование модулей с голыми спецификаторами модулей, или понижение уровня современного Javascript соответствующим образом. Подробнее см. в документации [Требования для устаревших браузеров](requirements.md#building-for-legacy-browsers).

### Использование полифиллов

Для тестирования на старых браузерах в тестовое окружение необходимо загрузить некоторые полифиллы, включая [web components polyfills](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs) и модуль Lit's `polyfill-support`. Подробнее см. документацию [Polyfills](requirements.md#polyfills).

## Использование Web Test Runner {#web-test-runner}

Мы рекомендуем использовать [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/), поскольку он специально разработан для тестирования современных веб-библиотек, таких как Lit, с использованием современных веб-функций, таких как пользовательские элементы и теневой DOM. См. документацию [Getting Started](https://modern-web.dev/guides/test-runner/getting-started) по Web Test Runner.

Для поддержки старых браузеров необходимо настроить Web Test Runner следующим образом:

Установите `@web/dev-server-legacy`:

```bash
npm i @web/dev-server-legacy --save-dev
```

Установите `web-test-runner.config.js`:

```js
import { legacyPlugin } from '@web/dev-server-legacy';

export default {
    /* ... */
    plugins: [
        // make sure this plugin is always last
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
