---
description: В Lit 3 мало ломающих изменений относительно Lit 2. Для большинства проектов обновление не требует правок кода
---

# Обновление до Lit 3

!!!info ""

    Если вы переходите с Lit 1.x на Lit 2.x, см. [руководство по обновлению до Lit 2](https://lit.dev/docs/v2/releases/upgrade/).

## Обзор

В Lit 3.0 мало ломающих изменений относительно Lit 2.x:

-   Internet Explorer 11 больше не поддерживается.
-   Модули npm Lit публикуются как ES2021.
-   API, помеченные устаревшими в релизах Lit 2.x, удалены.
-   Модули поддержки гидратации SSR переехали в пакет `@lit-labs/ssr-client`.
-   Только типы: обновлены типы `renderRoot` и `createRenderRoot()` у `ReactiveElement`.
-   Убрана поддержка декораторов Babel версии `2018-09`.
-   Поведение декораторов унифицировано между экспериментальными декораторами TypeScript и стандартными декораторами.
    -   Из-за этого при использовании TypeScript нужна как минимум версия 5.2: в ней обновлены типы обоих видов декораторов.

Большинству пользователей не нужно менять код, чтобы перейти с Lit 2 на Lit 3. Большинство приложений и библиотек могут расширить диапазон версий npm так, чтобы в него входили и 2.x, и 3.x: `"^2.7.0 || ^3.0.0"`.

Lit 2.x и 3.0 _совместимы друг с другом_: шаблоны, базовые классы и директивы одной версии работают с другой.

## Lit публикуется как ES2021

Lit 2 публиковался как ES2019, Lit 3 — как ES2021. Этот уровень широко поддерживают современные браузеры и инструменты сборки. Изменение ломает сборку, если вам нужны старые браузеры, а текущие инструменты не разбирают ES2021.

### Lit 3 и Webpack 4

Внутренний парсер Webpack 4 не понимает оператор `??`, логическое присваивание `??=` и опциональную цепочку `?.`. Это синтаксис ES2021, поэтому Webpack 4 бросает `Module parse failed: Unexpected token`.

Лучше перейти на Webpack 5: он этот синтаксис разбирает. Если перейти нельзя, код Lit 3 можно преобразовать через `babel-loader`.

Установите пакеты Babel:

```sh
npm i -D babel-loader@8 \
    @babel/plugin-transform-optional-chaining \
    @babel/plugin-transform-nullish-coalescing-operator \
    @babel/plugin-transform-logical-assignment-operators
```

Добавьте правило, похожее на следующее. Его, возможно, придётся подстроить под проект:

```js
// В webpack.config.js

module.exports = {
    // ...

    module: {
        rules: [
            // ... остальные правила

            // Понижает синтаксис ES2021 в Lit, чтобы его разобрал Webpack 4.
            // После перехода на Webpack 5 правило можно удалить.
            {
                test: /\.js$/,
                include: ['@lit', 'lit-element', 'lit-html'].map((p) =>
                    path.resolve(__dirname, 'node_modules/' + p)
                ),
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            '@babel/plugin-transform-optional-chaining',
                            '@babel/plugin-transform-nullish-coalescing-operator',
                            '@babel/plugin-transform-logical-assignment-operators',
                        ],
                    },
                },
            },
        ],
    },
};
```

## Изменения декораторов Lit

Декораторы JavaScript стандартизованы TC39 и находятся на стадии 3 из четырёх. На стадии 3 виртуальные машины и компиляторы начинают реализовывать уже стабильную спецификацию. TypeScript 5.2 и Babel 7.23 эту спецификацию реализовали.

Существует больше одной версии API декораторов: стандартные декораторы, экспериментальные декораторы TypeScript и прежние предложения, которые реализовывал Babel, в том числе версия `2018-09`.

Lit 2 поддерживал экспериментальные декораторы TypeScript и декораторы Babel `2018-09`. Lit 3 поддерживает стандартные декораторы и экспериментальные декораторы TypeScript.

Декораторы Lit 3 в основном обратно совместимы с декораторами TypeScript из Lit 2. **Скорее всего, менять код не нужно.**

Небольшие ломающие изменения понадобились, чтобы декораторы Lit вели себя одинаково в экспериментальном и стандартном режимах.

Что изменилось в Lit 3.0:

-   `requestUpdate()` вызывается автоматически для аксессоров с `@property()` и `@state()`. Раньше это делал сеттер.
-   Значение аксессора читается при первом рендере и используется как начальное значение для `changedProperties` и отражения в атрибут.
-   Декораторы Lit 3 больше не поддерживают опцию `version: "2018-09"` у `@babel/plugin-proposal-decorators`. Пользователям Babel стоит [перейти на стандартные декораторы](#standard-decorator-migration).
-   По желанию: [для рукописных аксессоров лучше перенести `@property()` и `@state()` на сеттер](#decorated-getter). Это упрощает переход на стандартные декораторы.

## Удалённые API

Если проект на Lit 2.x не выдаёт предупреждений об устаревании, этот список вас, скорее всего, не затронет.

-   [Удалён псевдоним `UpdatingElement` для `ReactiveElement`](#removed-updating-element).
-   [Удалён реэкспорт декораторов из основного модуля `lit-element`](#removed-re-export-decorators).
-   [Удалена устаревшая сигнатура декоратора `queryAssignedNodes`](#removed-queryassignednodes-non-object).
-   [Экспериментальные модули гидратации SSR перенесены из `lit`, `lit-element` и `lit-html` в `@lit-labs/ssr-client`](#moved-experimental-hydration).

## Шаги обновления

### Удалён псевдоним `UpdatingElement` {#removed-updating-element}

Замените `UpdatingElement` из Lit 2.x на `ReactiveElement`. Это не функциональное изменение: `UpdatingElement` был псевдонимом `ReactiveElement`.

```ts
// Удалено
import { UpdatingElement } from 'lit';

// Актуально
import { ReactiveElement } from 'lit';
```

### Декораторы больше не реэкспортируются из `lit-element` {#removed-re-export-decorators}

[Встроенные декораторы](../components/decorators.md) Lit 3.0 больше не экспортируются из `lit-element`. Их импортируют из `lit/decorators.js`.

```ts
// Реэкспорт декораторов из lit-element удалён
import { customElement, property, state } from 'lit-element';

// Актуально
import { customElement, property, state } from 'lit/decorators.js';
```

### Удалена устаревшая сигнатура `queryAssignedNodes` {#removed-queryassignednodes-non-object}

Если `queryAssignedNodes` вызывался с селектором, перейдите на `queryAssignedElements`.

```ts
// Удалено
@queryAssignedNodes('list', true, '.item')

// Актуально
@queryAssignedElements({slot: 'list', flatten: true, selector: '.item'})
```

Вызовы без `selector` теперь принимают объект параметров.

```ts
// Удалено
@queryAssignedNodes('list', true)

// Актуально
@queryAssignedNodes({slot: 'list', flatten: true})
```

### Модули экспериментальной гидратации убраны из ядра {#moved-experimental-hydration}

Экспериментальная гидратация вынесена из основных библиотек в [`@lit-labs/ssr-client`](https://www.npmjs.com/package/@lit-labs/ssr-client).

```ts
// Удалено
import 'lit/experimental-hydrate-support.js';
import { hydrate } from 'lit/experimental-hydrate.js';

// Актуально
import '@lit-labs/ssr-client/lit-element-hydrate-support.js';
import { hydrate } from '@lit-labs/ssr-client';
```

## Только типы: `renderRoot` и `createRenderRoot()` {#render-root-type-update}

Это изменение только типов, на выполнение оно не влияет.

Тип `ReactiveElement.renderRoot` изменён с `Element | ShadowRoot` на `HTMLElement | DocumentFragment`. Тип возврата `ReactiveElement.createRenderRoot()` изменён с `HTMLElement | ShadowRoot` на `HTMLElement | DocumentFragment`. Так они согласованы друг с другом и с `render()` из lit-html.

Код, который просто обращается к `this.renderRoot`, обычно менять не нужно. Явные аннотации со старыми типами стоит обновить.

## По желанию: стандартные декораторы {#standard-decorator-migration}

Lit 3 поддерживает стандартные декораторы, но пользователям TypeScript по-прежнему рекомендуются экспериментальные. Код, который TypeScript и Babel сейчас выпускают для стандартных декораторов, довольно большой.

Стандартные декораторы для продакшена имеет смысл рекомендовать, когда их поддержат браузеры или когда преобразование декораторов появится в новом компиляторе Lit.

Попробовать их можно уже сейчас: они работают в TypeScript 5.2 и новее и в Babel 7.23 с плагином `@babel/plugin-proposal-decorators`.

### Настройка

#### TypeScript

Поставьте TypeScript 5.2 или новее и _уберите_ из tsconfig параметр `"experimentalDecorators"`, если он есть.

#### Babel

Поставьте Babel 7.23 или новее и [`@babel/plugin-proposal-decorators`](https://babeljs.io/docs/babel-plugin-proposal-decorators). Плагину передайте опцию `"version": "2023-05"`.

### Изменения в коде

#### Ключевое слово `accessor` у декорированных полей {#add-accessor-to-decorated-fields}

Стандартным декораторам нельзя менять _вид_ члена класса, который они декорируют. Декораторы, которым нужны геттер и сеттер, применяются к уже существующим геттеру и сеттеру. Чтобы это было удобнее, стандарт добавляет ключевое слово `accessor`: применённое к полю класса, оно создаёт «автоаксессор». Автоаксессоры выглядят и ведут себя почти как поля класса, но создают на прототипе аксессоры с закрытым хранилищем.

Декораторам `@property()`, `@state()`, `@query()`, `@queryAll()`, `@queryAssignedElements()` и `@queryAssignedNodes()` нужно ключевое слово `accessor`.

```ts
class MyElement extends LitElement {
    @property()
    accessor myProperty = 'initial value';
    // ...
}
```

#### Перенесите декораторы с геттеров на сеттеры {#decorated-getter}

Стандартный декоратор может заменить только тот член класса, к которому он применён напрямую. Декораторам Lit нужно перехватывать запись свойства, поэтому их ставят на сеттеры. В Lit 2 рекомендовалось ставить декораторы на геттеры.

Для `@property()` и `@state()` вызовы `this.requestUpdate()` в сеттере можно убрать: теперь это происходит автоматически. Если `requestUpdate()` вызывать не нужно, используйте параметр свойства `noAccessor`.

Для `@property()` и `@state()` декоратор при записи свойства вызывает _геттер_, чтобы получить старое значение. Поэтому нужно определить и геттер, и сеттер.

Было:

```ts
class MyElement extends LitElement {
    private _foo = 42;
    set(v) {
        const oldValue = this._foo;
        this._foo = v;
        this.requestUpdate('foo', oldValue);
    }
    @property()
    get() {
        return this._foo;
    }
}
```

Стало:

```ts
class MyElement extends LitElement {
    private _foo = 42;
    @property()
    set(v) {
        this._foo = v;
    }
    get() {
        return this._foo;
    }
}
```
