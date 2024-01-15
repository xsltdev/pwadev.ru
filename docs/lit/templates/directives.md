---
description: Директивы — это функции, которые могут расширить Lit, настраивая способ рендеринга выражения. В Lit есть несколько встроенных директив, которые помогают решать различные задачи рендеринга
---

# Встроенные директивы

<big>
**Директивы** — это функции, которые могут расширить Lit, настраивая способ рендеринга выражения. В Lit есть несколько встроенных директив, которые помогают решать различные задачи рендеринга:
</big>

Стилизация:

| Декоратор | Описание |
| --- | --- |
| [`classMap`](#classmap) | Присваивает список классов элементу на основе объекта. |
| [`styleMap`](#stylemap) | Устанавливает список свойств стиля для элемента, основанного на объекте. |

Циклы и условия:

| Декоратор | Описание |
| --- | --- |
| [`when`](#when) | Выдает один из двух шаблонов на основе условия. |
| [`choose`](#choose) | Отображает один из многих шаблонов на основе ключевого значения. |
| [`map`](#map) | Преобразовывает итерируемый объект с помощью функции. |
| [`repeat`](#repeat) | Выводит значения из итерируемой таблицы в DOM с дополнительным ключом, чтобы обеспечить диффузию данных и стабильность DOM. |
| [`join`](#join) | Объединяет значения из итерабельной таблицы с помощью объединяющего значения. |
| [`range`](#range) | Создает итерабельную таблицу чисел в последовательности, полезной для итерации определенное количество раз. |
| [`ifDefined`](#ifdefined) | Устанавливает атрибут, если его значение определено, и удаляет атрибут, если не определено. |

Кэширование и обнаружение изменений:

| Декоратор | Описание |
| --- | --- |
| [`cache`](#cache) | Кэширует отрисованный DOM при изменении шаблонов, а не удаляет его. |
| [`keyed`](#keyed) | Связывает отрисовываемое значение с уникальным ключом, заставляя DOM перерисовываться при изменении ключа. |
| [`guard`](#guard) | Переоценивает шаблон только при изменении одной из его зависимостей. |
| [`live`](#live) | Устанавливает атрибут или свойство, если оно отличается от живого значения DOM, а не от последнего отрендеренного значения. |

Ссылка на рендеринг DOM:

| Декоратор | Описание |
| --- | --- |
| [`ref`](#ref) | Получает ссылку на элемент, отрендеренный в шаблоне. |

Рендеринг специальных значений:

| Декоратор | Описание |
| --- | --- |
| [`templateContent`](#templatecontent) | Рендерит содержимое элемента `<template>`. |
| [`unsafeHTML`](#unsafehtml) | Возвращает строку в виде HTML, а не текста. |
| [`unsafeSVG`](#unsafesvg) | Выводит строку не как текст, а как SVG. |

Асинхронный рендеринг:

| Декоратор | Описание |
| --- | --- |
| [`until`](#until) | Отрисовывает содержимое, пока не будет выполнено одно или несколько обещаний. |
| [`asyncAppend`](#asyncappend) | Добавляет значения из `AsyncIterable` в DOM по мере их получения. |
| [`asyncReplace`](#asyncreplace) | Возвращает последнее значение из `AsyncIterable` в DOM по мере его получения. |

!!!alert "Объединяйте только то, что используете"

    Эти директивы называются "встроенными", потому что они входят в пакет Lit. Но каждая директива — это отдельный модуль, поэтому ваше приложение включает только те директивы, которые вы импортируете.

Вы также можете создавать свои собственные директивы. Для получения дополнительной информации смотрите [Пользовательские директивы](custom-directives.md).

## Стилизация

### `classMap`

Устанавливает список классов для элемента на основе объекта.

Импорт

```js
import { classMap } from 'lit/directives/class-map.js';
```

Синтаксис

```ts
classMap(classInfo: {[name: string]: string | boolean | number})
```

Место использования:

: Выражение атрибута `class` (должно быть единственным выражением в атрибуте `class`)

Директива `classMap` использует API `element.classList` для эффективного добавления и удаления классов в элемент на основе объекта, переданного пользователем. Каждый ключ в объекте рассматривается как имя класса, и если значение, связанное с ключом, истинно, то этот класс добавляется в элемент. При последующих рендерах все ранее установленные классы, которые являются ложными или больше не содержатся в объекте, удаляются.

=== "TS"

    ```ts
    @customElement('my-element')
    class MyElement extends LitElement {
    	@property({ type: Boolean })
    	enabled = false;

    	render() {
    		const classes = {
    			enabled: this.enabled,
    			hidden: false,
    		};
    		return html`<div class=${classMap(classes)}>
    			Classy text
    		</div>`;
    	}
    }
    ```

=== "JS"

    ```js
    class MyElement extends LitElement {
    	static properties = {
    		enabled: { type: Boolean },
    	};

    	constructor() {
    		super();
    		this.enabled = false;
    	}

    	render() {
    		const classes = {
    			enabled: this.enabled,
    			hidden: false,
    		};
    		return html`<div class=${classMap(classes)}>
    			Classy text
    		</div>`;
    	}
    }
    customElements.define('my-element', MyElement);
    ```

Карта `classMap` должна быть единственным выражением в атрибуте `class`, но она может быть объединена со статическими значениями:

```ts
html`<div class="my-widget ${classMap(dynamicClasses)}">
    Static and dynamic
</div>`;
```

Изучите `classMap` больше в [playground](https://lit.dev/playground/#sample=examples/directive-class-map).

### `styleMap`

Устанавливает список свойств стиля для элемента на основе объекта.

Импорт

```js
import { styleMap } from 'lit/directives/style-map.js';
```

Синтаксис:

```ts
styleMap(styleInfo: {[name: string]: string | undefined | null})
```

Место использования:

: Выражение атрибута `style` (должно быть единственным выражением в атрибуте `style`)

Директива `styleMap` использует API `element.style` для эффективного добавления и удаления встроенных стилей в элемент на основе объекта, переданного пользователем. Каждый ключ в объекте рассматривается как имя свойства стиля, а значение — как значение этого свойства. При последующих рендерах все ранее установленные свойства стиля, которые не определены или `null`, удаляются (устанавливаются в `null`).

=== "TS"

    ```ts
    @customElement('my-element')
    class MyElement extends LitElement {
    	@property({ type: Boolean })
    	enabled = false;

    	render() {
    		const styles = {
    			backgroundColor: this.enabled ? 'blue' : 'gray',
    			color: 'white',
    		};
    		return html`<p style=${styleMap(styles)}>
    			Hello style!
    		</p>`;
    	}
    }
    ```

=== "JS"

    ```js
    class MyElement extends LitElement {
    	static properties = {
    		enabled: { type: Boolean },
    	};

    	constructor() {
    		super();
    		this.enabled = false;
    	}

    	render() {
    		const styles = {
    			backgroundColor: this.enabled ? 'blue' : 'gray',
    			color: 'white',
    		};
    		return html`<p style=${styleMap(styles)}>
    			Hello style!
    		</p>`;
    	}
    }
    customElements.define('my-element', MyElement);
    ```

Для CSS-свойств, содержащих тире, вы можете использовать эквивалент верблюжьего регистра или заключить имя свойства в кавычки. Например, CSS-свойство `font-family` можно записать как `fontFamily` или `'font-family'`:

```js
{ fontFamily: 'roboto' }
{ 'font-family': 'roboto' }
```

Ссылайтесь на пользовательские свойства CSS, такие как `--custom-color`, заключая все имя свойства в кавычки:

```js
{ '--custom-color': 'steelblue' }
```

Карта `styleMap` должна быть единственным выражением в атрибуте `style`, но она может быть объединена со статическими значениями:

```js
html`<p style="color: white; ${styleMap(moreStyles)}">
    More styles!
</p>`;
```

Изучите `styleMap` подробнее в [playground](https://lit.dev/playground/#sample=examples/directive-style-map).

## Циклы и условия

### `when`

Выводит один из двух шаблонов на основе условия.

Импорт:

```js
import { when } from 'lit/directives/when.js';
```

Синтаксис:

```ts
when<T, F>(
  condition: boolean,
  trueCase: () => T,
  falseCase?: () => F
)
```

Место использования:

: Любое

Если `condition` истинно, возвращает результат вызова `trueCase()`, иначе возвращает результат вызова `falseCase()`, если определено `falseCase`.

Это удобная обертка вокруг тернарного выражения, которая позволяет написать встроенное условие без `else`.

```ts
class MyElement extends LitElement {
    render() {
        return html`
            ${when(
                this.user,
                () => html`User: ${this.user.username}`,
                () => html`Sign In...`,
            )}
        `;
    }
}
```

### `choose`

Выбирает и оценивает шаблонную функцию из списка case, основываясь на соответствии заданного `value`.

Импорт

```js
import { choose } from 'lit/directives/choose.js';
```

Синтаксис:

```ts
choose<T, V>(
  value: T,
  cases: Array<[T, () => V]>,
  defaultCase?: () => V
)
```

Место использования:

: Любое

Случаи структурируются как `[caseValue, func]`. `value` сопоставляется с `caseValue` по принципу строгого равенства. Выбирается первое совпадение. Значения `case` могут быть любого типа, включая примитивы, объекты и символы.

Это похоже на оператор `switch`, но в виде выражения и без отбрасывания.

```ts
class MyElement extends LitElement {
    render() {
        return html`
            ${choose(
                this.section,
                [
                    ['home', () => html`<h1>Home</h1>`],
                    ['about', () => html`<h1>About</h1>`],
                ],
                () => html`<h1>Error</h1>`,
            )}
        `;
    }
}
```

### `map`

Возвращает итерабельную таблицу, содержащую результат вызова `f(value)` для каждого значения в `items`.

Импорт

```js
import { map } from 'lit/directives/map.js';
```

Синтаксис:

```ts
map<T>(
  items: Iterable<T> | undefined,
  f: (value: T, index: number) => unknown
)
```

Место использования:

: Любое

`map()` — это простая обертка вокруг цикла [for/of loop](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/for...of), которая делает работу с итерациями в выражениях немного проще. `map()` всегда обновляет любой DOM, созданный на месте — он не делает никаких диффирингов или перемещений DOM. Если вам это нужно, смотрите [repeat](#repeat). `map()` меньше и быстрее, чем `repeat()`, поэтому, если вам не нужны диффиринги и стабильность DOM, предпочтите `map()`.

```ts
class MyElement extends LitElement {
    render() {
        return html`
            <ul>
                ${map(items, (i) => html`<li>${i}</li>`)}
            </ul>
        `;
    }
}
```

### `repeat`

Выводит значения из итерируемого файла в DOM с дополнительным ключом, чтобы обеспечить диффузию данных и стабильность DOM.

Импорт

```js
import { repeat } from 'lit/directives/repeat.js';
```

Синтаксис:

```ts
repeat(items: Iterable<T>, keyfn: KeyFn<T>, template: ItemTemplate<T>)
repeat(items: Iterable<T>, template: ItemTemplate<T>)
type KeyFn<T> = (item: T, index: number) => unknown;
type ItemTemplate<T> = (item: T, index: number) => unknown;
```

Место использования:

: Дочернее выражение

Повторяет серию значений (обычно `TemplateResults`), сгенерированных из итерируемой таблицы, и эффективно обновляет эти элементы при изменении итерируемой таблицы. При использовании `keyFn` связь между ключами и DOM поддерживается между обновлениями путем перемещения сгенерированного DOM, когда это необходимо, и это, как правило, самый эффективный способ использования `repeat`, поскольку он выполняет минимум ненужной работы при вставках и удалениях.

Если вы не используете функцию ключа, вам следует рассмотреть возможность использования [`map()`](#map).

=== "TS"

    ```ts
    @customElement('my-element')
    class MyElement extends LitElement {
    	@property()
    	items: Array<{ id: number; name: string }> = [];

    	render() {
    		return html`
    			<ul>
    				${repeat(
    					this.items,
    					(item) => item.id,
    					(item, index) =>
    						html` <li>
    							${index}: ${item.name}
    						</li>`,
    				)}
    			</ul>
    		`;
    	}
    }
    ```

=== "JS"

    ```js
    class MyElement extends LitElement {
    	static properties = {
    		items: {},
    	};

    	constructor() {
    		super();
    		this.items = [];
    	}

    	render() {
    		return html`
    			<ul>
    				${repeat(
    					this.items,
    					(item) => item.id,
    					(item, index) =>
    						html` <li>
    							${index}: ${item.name}
    						</li>`,
    				)}
    			</ul>
    		`;
    	}
    }
    customElements.define('my-element', MyElement);
    ```

Если `keyFn` не указан, `repeat` будет работать аналогично простому отображению элементов в значения, и DOM будет повторно использоваться для потенциально разных элементов.

Обсуждение того, когда следует использовать `повтор`, а когда — стандартный контроль потока JavaScript, см. в [Когда использовать map или repeat](lists.md#when-to-use-map-or-repeat).

Подробнее о `repeat можно узнать в [playground](https://lit.dev/playground/#sample=examples/directive-repeat).

### `join`

Возвращает итерабельную таблицу, содержащую значения в `items`, чередующиеся со значением `joiner`.

Импорт

```js
import { join } from 'lit/directives/join.js';
```

Синтаксис:

```ts
join<I, J>(
  items: Iterable<I> | undefined,
  joiner: J
): Iterable<I | J>;

join<I, J>(
  items: Iterable<I> | undefined,
  joiner: (index: number) => J
): Iterable<I | J>;
```

Место использования:

: Любое

```ts
class MyElement extends LitElement {
    render() {
        return html`
            ${join(
                map(
                    menuItems,
                    (i) =>
                        html`<a href=${i.href}
                            >${i.label}</a
                        >`,
                ),
                html`<span class="separator">|</span>`,
            )}
        `;
    }
}
```

### `range`

Возвращает итерабельную таблицу целых чисел от `start` до `end` (эксклюзивных) с инкрементом на `step`.

Импорт

```js
import { range } from 'lit/directives/range.js';
```

Синтаксис:

```ts
range(end: number): Iterable<number>;

range(
  start: number,
  end: number,
  step?: number
): Iterable<number>;

```

Место использования:

: Любое

```ts
class MyElement extends LitElement {
    render() {
        return html`
            ${map(range(8), (i) => html`${i + 1}`)}
        `;
    }
}
```

### `ifDefined`

Устанавливает атрибут, если его значение определено, и удаляет атрибут, если не определено.

Импорт

```js
import { ifDefined } from 'lit/directives/if-defined.js';
```

Синтаксис:

```ts
ifDefined(value: unknown)
```

Место использования:

: Выражение атрибута

Для частей AttributeParts устанавливает атрибут, если значение определено, и удаляет атрибут, если значение не определено (`undefined` или `null`). Для других типов частей эта директива не используется.

Когда в одном значении атрибута содержится более одного выражения, атрибут будет удален, если _любое_ выражение использует `ifDefined` и оценивается как `undefined`/`null`. Это особенно полезно для установки атрибутов URL, когда атрибут не должен устанавливаться, если необходимые части URL не определены, чтобы предотвратить 404.

=== "TS"

    ```ts
    @customElement('my-element')
    class MyElement extends LitElement {
    	@property()
    	filename: string | undefined = undefined;

    	@property()
    	size: string | undefined = undefined;

    	render() {
    		// src attribute not rendered if either size or filename are undefined
    		return html`<img
    			src="/images/${ifDefined(
    				this.size,
    			)}/${ifDefined(this.filename)}"
    		/>`;
    	}
    }
    ```

=== "JS"

    ```js
    class MyElement extends LitElement {
    	static properties = {
    		filename: {},
    		size: {},
    	};

    	constructor() {
    		super();
    		this.filename = undefined;
    		this.size = undefined;
    	}

    	render() {
    		// src attribute not rendered if either size or filename are undefined
    		return html`<img
    			src="/images/${ifDefined(
    				this.size,
    			)}/${ifDefined(this.filename)}"
    		/>`;
    	}
    }
    customElements.define('my-element', MyEleent);
    ```

Изучите `ifDefined` подробнее в [playground](https://lit.dev/playground/#sample=examples/directive-if-defined).

## Кэширование и обнаружение изменений

### `cache`

Кэширует отрисованный DOM при смене шаблонов вместо того, чтобы отбрасывать его. Вы можете использовать эту директиву для оптимизации производительности рендеринга при частом переключении между большими шаблонами.

Импорт

```js
import { cache } from 'lit/directives/cache.js';
```

Синтаксис:

```ts
cache(value: TemplateResult|unknown)
```

Место использования:

: Выражение `Child`

Когда значение, переданное в `cache`, меняется между одним или несколькими `TemplateResult`, отрисованные DOM-узлы для данного шаблона кэшируются, когда они не используются. Когда шаблон меняется, директива кэширует _текущие_ узлы DOM перед переключением на новое значение и восстанавливает их из кэша при переключении обратно на ранее отрендеренное значение, вместо того чтобы создавать узлы DOM заново.

=== "TS"

    ```ts
    const detailView = (data) => html`<div>...</div>`;
    const summaryView = (data) => html`<div>...</div>`;

    @customElement('my-element')
    class MyElement extends LitElement {
    	@property()
    	data = { showDetails: true /*...*/ };

    	render() {
    		return html`${cache(
    			this.data.showDetails
    				? detailView(this.data)
    				: summaryView(this.data),
    		)}`;
    	}
    }
    ```

=== "JS"

    ```js
    const detailView = (data) => html`<div>...</div>`;
    const summaryView = (data) => html`<div>...</div>`;

    class MyElement extends LitElement {
    	static properties = {
    		data: {},
    	};

    	constructor() {
    		super();
    		this.data = { showDetails: true /*...*/ };
    	}

    	render() {
    		return html`${cache(
    			this.data.showDetails
    				? detailView(this.data)
    				: summaryView(this.data),
    		)}`;
    	}
    }
    customElements.define('my-element', MyElement);
    ```

Когда Lit перерисовывает шаблон, он обновляет только измененные части: он не создает и не удаляет больше DOM, чем нужно. Но когда вы переключаетесь с одного шаблона на другой, Lit удаляет старый DOM и создает новое дерево DOM.

Директива `cache` кэширует сгенерированный DOM для данного выражения и шаблона ввода. В приведенном выше примере она кэширует DOM для шаблонов `summaryView` и `detailView`. Когда вы переключаетесь с одного представления на другое, Lit подменяет кэшированную версию нового представления и обновляет ее последними данными. Это может повысить производительность рендеринга при частом переключении между этими представлениями.

Подробнее о `cache` можно узнать в [playground](https://lit.dev/playground/#sample=examples/directive-cache).

### `keyed`

Связывает отрисовываемое значение с уникальным ключом. При изменении ключа предыдущий DOM удаляется и утилизируется перед рендерингом следующего значения, даже если значение — например, шаблон — остается прежним.

Импорт

```js
import { keyed } from 'lit/directives/keyed.js';
```

Синтаксис:

```ts
keyed(key: unknown, value: unknown)
```

Место использования:

: Любое выражение

`keyed` полезен, когда вы отрисовываете элементы с состоянием и вам нужно убедиться, что все состояние элемента будет очищено при изменении некоторых критических данных. По сути, это отказ от стандартной стратегии повторного использования DOM в Lit.

`keyed` также полезен в некоторых сценариях анимации, если вам нужно принудительно создать новый элемент для анимации "входа" или "выхода".

=== "TS"

    ```ts
    @customElement('my-element')
    class MyElement extends LitElement {
    	@property()
    	userId: string = '';

    	render() {
    		return html` <div>
    			${keyed(
    				this.userId,
    				html`<user-card
    					.userId=${this.userId}
    				></user-card>`,
    			)}
    		</div>`;
    	}
    }
    ```

=== "JS"

    ```js
    class MyElement extends LitElement {
    	static properties = {
    		userId: {},
    	};

    	constructor() {
    		super();
    		this.userId = '';
    	}

    	render() {
    		return html` <div>
    			${keyed(
    				this.userId,
    				html`<user-card
    					.userId=${this.userId}
    				></user-card>`,
    			)}
    		</div>`;
    	}
    }
    customElements.define('my-element', MyElement);
    ```

### guard

Переоценивает шаблон только при изменении одной из его зависимостей, чтобы оптимизировать производительность рендеринга за счет предотвращения ненужной работы.

Импорт

```js
import { guard } from 'lit/directives/guard.js';
```

Синтаксис:

```ts
guard(dependencies: unknown[], valueFn: () => unknown)
```

Место использования:

: Любое выражение

Выдает значение, возвращаемое `valueFn`, и переоценивает `valueFn` только тогда, когда одна из зависимостей меняет идентификатор.

Где:

-   `dependencies` — массив значений, которые необходимо отслеживать на предмет изменений.
-   `valueFn` — функция, возвращающая рендерируемое значение.

`guard` полезен при работе с неизменяемыми шаблонами данных, предотвращая дорогостоящую работу до обновления данных.

=== "TS"

    ```ts
    @customElement('my-element')
    class MyElement extends LitElement {
    	@property()
    	value: string = '';

    	render() {
    		return html` <div>
    			${guard([this.value], () =>
    				calculateSHA(this.value),
    			)}
    		</div>`;
    	}
    }
    ```

=== "JS"

    ```js
    class MyElement extends LitElement {
    	static properties = {
    		value: {},
    	};

    	constructor() {
    		super();
    		this.value = '';
    	}

    	render() {
    		return html` <div>
    			${guard([this.value], () =>
    				calculateSHA(this.value),
    			)}
    		</div>`;
    	}
    }
    customElements.define('my-element', MyElement);
    ```

В этом случае дорогостоящая функция `calculateSHA` запускается только при изменении свойства `value`.

Изучите `guard` подробнее на [playground](https://lit.dev/playground/#sample=examples/directive-guard).

### live

Устанавливает атрибут или свойство, если оно отличается от живого значения DOM, а не от последнего рендерированного значения.

Импорт

```js
import { live } from 'lit/directives/live.js';
```

Синтаксис:

```ts
live(value: unknown)
```

Место использования:

: Атрибут или выражение свойства

При определении того, обновлять ли значение, проверяет значение выражения по _живому_ значению DOM, а не по поведению Lit по умолчанию — по последнему установленному значению.

Это полезно для случаев, когда значение DOM может измениться за пределами Lit. Например, при использовании выражения для установки свойства `<input>` элемента `value`, текста редактируемого элемента содержимого или для пользовательского элемента, изменяющего свои свойства или атрибуты.

В этих случаях, если значение DOM изменится, а значение, установленное с помощью выражения Lit, нет, Lit не будет знать, что нужно обновить значение DOM, и оставит его в покое. Если вы не хотите этого — если вы хотите перезаписать значение DOM связанным значением независимо ни от чего — используйте директиву `live()`.

=== "TS"

    ```ts
    @customElement('my-element')
    class MyElement extends LitElement {
    	@property()
    	data = { value: 'test' };

    	render() {
    		return html`<input
    			.value=${live(this.data.value)}
    		/>`;
    	}
    }
    ```

=== "JS"

    ```js
    class MyElement extends LitElement {
    	static properties = {
    		data: {},
    	};

    	constructor() {
    		super();
    		this.data = { value: 'test' };
    	}

    	render() {
    		return html`<input
    			.value=${live(this.data.value)}
    		/>`;
    	}
    }
    customElements.define('my-element', MyElement);
    ```

`live()` выполняет строгую проверку равенства с живым значением DOM, и если новое значение равно живому значению, ничего не делает. Это означает, что `live()` не следует использовать, если выражение приводит к преобразованию типов. Если вы используете `live()` с выражением атрибута, убедитесь, что в выражении передаются только строки, иначе выражение будет обновляться при каждом рендере.

Изучите `live` подробнее на [playground](https://lit.dev/playground/#sample=examples/directive-live).

## Рендеринг специальных значений

### `templateContent`

Рендерит содержимое элемента `<template>`.

Импорт

```js
import { templateContent } from 'lit/directives/template-content.js';
```

Синтаксис:

```ts
templateContent(templateElement: HTMLTemplateElement)
```

Место использования:

: Детское выражение

Шаблоны Lit закодированы на Javascript, поэтому в них можно встраивать выражения Javascript, которые делают их динамичными. Если у вас есть статичный HTML `<template>`, который нужно включить в шаблон Lit, вы можете использовать директиву `templateContent`, чтобы клонировать содержимое шаблона и включить его в свой шаблон Lit. Если ссылка на элемент шаблона не изменяется между рендерами, последующие рендеры будут безотказными.

!!!warning ""

    Обратите внимание, что содержимое шаблона должно контролироваться разработчиком и не должно быть создано с использованием недоверенной строки. Примерами недоверенного содержимого являются параметры строки запроса и значения пользовательского ввода. Недоверенные шаблоны, созданные с помощью этой директивы, могут привести к уязвимостям [межсайтового скриптинга (XSS)](https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D0%B6%D1%81%D0%B0%D0%B9%D1%82%D0%BE%D0%B2%D1%8B%D0%B9_%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D1%82%D0%B8%D0%BD%D0%B3).

=== "TS"

    ```ts
    const templateEl = document.querySelector(
    	'template#myContent',
    ) as HTMLTemplateElement;

    @customElement('my-element')
    class MyElement extends LitElement {
    	render() {
    		return html` Here's some content from a template
    		element: ${templateContent(templateEl)}`;
    	}
    }
    ```

=== "JS"

    ```js
    const templateEl = document.querySelector(
    	'template#myContent',
    );

    class MyElement extends LitElement {
    	render() {
    		return html` Here's some content from a template
    		element: ${templateContent(templateEl)}`;
    	}
    }
    customElements.define('my-element', MyElement);
    ```

Изучите `templateContent` больше в [playground](https://lit.dev/playground/#sample=examples/directive-template-content).

### `unsafeHTML`

Возвращает строку в виде HTML, а не текста.

Импорт

```js
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
```

Синтаксис:

```ts
unsafeHTML(value: string | typeof nothing | typeof noChange)
```

Место использования:

: Дочернее выражение

Ключевая особенность синтаксиса шаблонов Lit заключается в том, что только строки из литералов шаблонов анализируются как HTML. Поскольку литералы шаблонов могут быть созданы только в доверенных файлах сценариев, это служит естественной защитой от XSS-атак, внедряющих недоверенный HTML. Однако могут быть случаи, когда в шаблоне Lit необходимо отобразить HTML, созданный не в файлах сценариев, например, доверенный HTML-контент, полученный из базы данных. Директива `unsafeHTML` разберет такую строку как HTML и отобразит ее в шаблоне Lit.

!!!warning ""

    Обратите внимание, что строка, передаваемая в `unsafeHTML`, должна контролироваться разработчиком и не содержать недоверенного содержимого. Примерами недоверенного содержимого могут быть параметры строки запроса и значения из пользовательского ввода. Недоверенное содержимое, отображаемое с помощью этой директивы, может привести к уязвимости [межсайтовый скриптинг (XSS)](https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D0%B6%D1%81%D0%B0%D0%B9%D1%82%D0%BE%D0%B2%D1%8B%D0%B9_%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D1%82%D0%B8%D0%BD%D0%B3).

=== "TS"

    ```ts
    const markup = '<h3>Some HTML to render.</h3>';

    @customElement('my-element')
    class MyElement extends LitElement {
    	render() {
    		return html`
    			Look out, potentially unsafe HTML ahead:
    			${unsafeHTML(markup)}
    		`;
    	}
    }
    ```

=== "JS"

    ```js
    const markup = '<h3>Some HTML to render.</h3>';

    class MyElement extends LitElement {
    	render() {
    		return html`
    			Look out, potentially unsafe HTML ahead:
    			${unsafeHTML(markup)}
    		`;
    	}
    }
    customElements.define('my-element', MyElement);
    ```

Изучите `unsafeHTML` подробнее на [игровой площадке](https://lit.dev/playground/#sample=examples/directive-unsafe-html).

### `unsafeSVG`

Выводит строку в виде SVG, а не текста.

Импорт

```js
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
```

Синтаксис:

```ts
unsafeSVG(value: string | typeof nothing | typeof noChange)
```

Место использования:

: Дочернее выражение

Как и в случае с [`unsafeHTML`](#unsafehtml), возможны случаи, когда в шаблоне Lit необходимо отобразить SVG-контент, не содержащийся в файлах сценариев, например, доверенный SVG-контент, полученный из базы данных. Директива `unsafeSVG` разберет такую строку как SVG и отобразит ее в шаблоне Lit.

!!!warning ""

    Обратите внимание, что строка, передаваемая в `unsafeSVG`, должна контролироваться разработчиком и не содержать недоверенного содержимого. Примерами недоверенного содержимого могут быть параметры строки запроса и значения из пользовательского ввода. Недоверенное содержимое, отображаемое с помощью этой директивы, может привести к уязвимостям [межсайтового скриптинга (XSS)](https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D0%B6%D1%81%D0%B0%D0%B9%D1%82%D0%BE%D0%B2%D1%8B%D0%B9_%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D1%82%D0%B8%D0%BD%D0%B3).

=== "TS"

    ```ts
    const svg = '<circle cx="50" cy="50" r="40" fill="red" />';

    @customElement('my-element')
    class MyElement extends LitElement {
    	render() {
    		return html`
    			Look out, potentially unsafe SVG ahead:
    			<svg
    				width="40"
    				height="40"
    				viewBox="0 0 100 100"
    				xmlns="http://www.w3.org/2000/svg"
    				version="1.1"
    			>
    				${unsafeSVG(svg)}
    			</svg>
    		`;
    	}
    }
    ```

=== "JS"

    ```js
    const svg = '<circle cx="50" cy="50" r="40" fill="red" />';

    class MyElement extends LitElement {
    	render() {
    		return html`
    			Look out, potentially unsafe SVG ahead:
    			<svg
    				width="40"
    				height="40"
    				viewBox="0 0 100 100"
    				xmlns="http://www.w3.org/2000/svg"
    				version="1.1"
    			>
    				${unsafeSVG(svg)}
    			</svg>
    		`;
    	}
    }
    customElements.define('my-element', MyElement);
    ```

Изучите `unsafeSVG` подробнее в [playground](https://lit.dev/playground/#sample=examples/directive-unsafe-svg).

## Ссылки на визуализированный DOM

### `ref`

Получает ссылку на элемент, отображаемый в DOM.

Импорт

```js
import { ref } from 'lit/directives/ref.js';
```

Синтаксис:

```ts
ref(refOrCallback: RefOrCallback)
```

Место использования:

: Выражение элемента

Хотя большинство манипуляций с DOM в Lit можно выполнять декларативно, используя шаблоны, в сложных ситуациях может потребоваться получить ссылку на элемент, отображенный в шаблоне, и манипулировать им императивно. В качестве примера можно привести фокусировку элемента управления формой или вызов библиотеки императивных манипуляций с DOM на элементе контейнера.

При размещении на элементе в шаблоне директива `ref` будет извлекать ссылку на этот элемент после рендеринга. Ссылка на элемент может быть получена одним из двух способов: либо путем передачи объекта `Ref`, либо путем передачи обратного вызова.

Объект `Ref` выступает в качестве контейнера для ссылки на элемент и может быть создан с помощью вспомогательного метода `createRef`, находящегося в модуле `ref`. После рендеринга свойство `Ref` `value` будет установлено на элемент, где к нему можно будет получить доступ в пост-рендерном жизненном цикле, например `updated`.

=== "TS"

    ```ts
    @customElement('my-element')
    class MyElement extends LitElement {
    	inputRef: Ref<HTMLInputElement> = createRef();

    	render() {
    		// Passing ref directive a Ref object that will hold the element in .value
    		return html`<input ${ref(this.inputRef)} />`;
    	}

    	firstUpdated() {
    		const input = this.inputRef.value!;
    		input.focus();
    	}
    }
    ```

=== "JS"

    ```js
    class MyElement extends LitElement {

    inputRef = createRef();

    render() {
    	// Passing ref directive a Ref object that will hold the element in .value
    	return html`<input ${ref(this.inputRef)}>`;
    }

    firstUpdated() {
    	const input = this.inputRef.value!;
    	input.focus();
    }
    }
    customElements.define('my-element', MyElement);
    ```

Директиве `ref` также можно передать обратный вызов ref. Обратный вызов будет вызываться каждый раз при изменении элемента, на который ссылается ссылка. Если обратный вызов ref рендерится на другую позицию элемента или удаляется при последующем рендеринге, то сначала он будет вызван с `undefined`, а затем еще один вызов с новым элементом, на который он был рендерирован (если таковой имеется). Обратите внимание, что в `LitElement` обратный вызов будет вызван автоматически, привязанный к главному элементу.

=== "TS"

    ```ts
    @customElement('my-element')
    class MyElement extends LitElement {
    	render() {
    		// Passing ref directive a change callback
    		return html`<input ${ref(this.inputChanged)} />`;
    	}

    	inputChanged(input?: HTMLInputElement) {
    		input?.focus();
    	}
    }
    ```

=== "JS"

    ```js
    class MyElement extends LitElement {
    	render() {
    		// Passing ref directive a change callback
    		return html`<input ${ref(this.inputChanged)} />`;
    	}

    	inputChanged(input) {
    		input?.focus();
    	}
    }
    customElements.define('my-element', MyElement);
    ```

Изучите `ref` больше в [playground](https://lit.dev/playground/#sample=examples/directive-ref).

## Асинхронный рендеринг

### `until`

Отрисовывает содержимое, пока не разрешится одно или несколько обещаний.

Импорт

```js
import { until } from 'lit/directives/until.js';
```

Синтаксис:

```ts
until(...values: unknown[])
```

Место использования:

: Любое выражение

Принимает ряд значений, включая `Promise`. Значения отображаются в порядке приоритета: первый аргумент имеет наивысший приоритет, а последний — наименьший. Если значение является обещанием, то до его разрешения будет отображаться значение с более низким приоритетом.

Приоритет значений может быть использован для создания содержимого-заместителя для асинхронных данных. Например, первым (с наивысшим приоритетом) аргументом может быть `Promise` с ожидающим содержимым, а в качестве второго (с более низким приоритетом) аргумента может использоваться шаблон индикатора загрузки, не относящийся к `Promise`. Индикатор загрузки отобразится сразу, а основной контент — после разрешения `Promise`.

=== "TS"

    ```ts
    @customElement('my-element')
    class MyElement extends LitElement {
    	@state()
    	private content = fetch('./content.txt').then((r) =>
    		r.text(),
    	);

    	render() {
    		return html`${until(
    			this.content,
    			html`<span>Loading...</span>`,
    		)}`;
    	}
    }
    ```

=== "JS"

    ```js
    class MyElement extends LitElement {
    	static properties = {
    		content: { state: true },
    	};

    	constructor() {
    		super();
    		this.content = fetch('./content.txt').then((r) =>
    			r.text(),
    		);
    	}

    	render() {
    		return html`${until(
    			this.content,
    			html`<span>Loading...</span>`,
    		)}`;
    	}
    }
    customElements.define('my-element', MyElement);
    ```

Изучите `until` больше на [игровой площадке](https://lit.dev/playground/#sample=examples/directive-until).

### `asyncAppend`

Добавляет значения из `AsyncIterable` в DOM по мере их получения.

Импорт

```js
import { asyncAppend } from 'lit/directives/async-append.js';
```

Синтаксис:

```ts
asyncAppend(iterable: AsyncIterable)
```

Место использования:

: Дочернее выражение

`asyncAppend` выводит значения генератора [async iterable](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/for-await...of), добавляя каждое новое значение после предыдущего. Обратите внимание, что генераторы async также реализуют протокол async iterable, и поэтому могут быть использованы `asyncAppend`.

=== "TS"

    ```ts
    async function* tossCoins(count: number) {
    	for (let i = 0; i < count; i++) {
    		yield Math.random() > 0.5 ? 'Heads' : 'Tails';
    		await new Promise((r) => setTimeout(r, 1000));
    	}
    }

    @customElement('my-element')
    class MyElement extends LitElement {
    	@state()
    	private tosses = tossCoins(10);

    	render() {
    		return html` <ul>
    			${asyncAppend(
    				this.tosses,
    				(v: string) => html`<li>${v}</li>`,
    			)}
    		</ul>`;
    	}
    }
    ```

=== "JS"

    ```js
    async function* tossCoins(count) {
    	for (let i = 0; i < count; i++) {
    		yield Math.random() > 0.5 ? 'Heads' : 'Tails';
    		await new Promise((r) => setTimeout(r, 1000));
    	}
    }

    class MyElement extends LitElement {
    	static properties = {
    		tosses: { state: true },
    	};

    	constructor() {
    		super();
    		this.tosses = tossCoins(10);
    	}

    	render() {
    		return html` <ul>
    			${asyncAppend(
    				this.tosses,
    				(v) => html`<li>${v}</li>`,
    			)}
    		</ul>`;
    	}
    }
    customElements.define('my-element', MyElement);
    ```

Изучите `asyncAppend` подробнее на [игровой площадке](https://lit.dev/playground/#sample=examples/directive-async-append).

### `asyncReplace`

Возвращает последнее значение из `AsyncIterable` в DOM по мере его получения.

Импорт

```js
import { asyncReplace } from 'lit/directives/async-replace.js';
```

Синтаксис:

```ts
asyncReplace(iterable: AsyncIterable)
```

Место использования:

: Дочернее выражение

Подобно [`asyncAppend`](#asyncappend), `asyncReplace` отображает значения [async iterable](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/for-await...of), заменяя предыдущее значение на каждое новое.

=== "TS"

    ```ts
    async function* countDown(count: number) {
    	while (count > 0) {
    		yield count--;
    		await new Promise((r) => setTimeout(r, 1000));
    	}
    }

    @customElement('my-element')
    class MyElement extends LitElement {
    	@state()
    	private timer = countDown(10);

    	render() {
    		return html`Timer:
    			<span>${asyncReplace(this.timer)}</span>.`;
    	}
    }
    ```

=== "JS"

    ```js
    async function* countDown(count) {
    	while (count > 0) {
    		yield count--;
    		await new Promise((r) => setTimeout(r, 1000));
    	}
    }

    class MyElement extends LitElement {
    	static properties = {
    		timer: { state: true },
    	};

    	constructor() {
    		super();
    		this.timer = countDown(10);
    	}

    	render() {
    		return html`Timer:
    			<span>${asyncReplace(this.timer)}</span>.`;
    	}
    }
    customElements.define('my-element', MyElement);
    ```

Изучите `asyncReplace` подробнее в [playground](https://lit.dev/playground/#sample=examples/directive-async-replace).
