---
description: Директивы — это функции, которые могут расширять Lit, настраивая отображение шаблонного выражения
---

# Пользовательские директивы

<big>
**Директивы** — это функции, которые могут расширять Lit, настраивая отображение шаблонного выражения. Директивы полезны и мощны, потому что они могут иметь состояние, обращаться к DOM, получать уведомления об отключении и повторном подключении шаблонов, а также самостоятельно обновлять выражения вне вызова рендеринга.
</big>

Использовать директиву в шаблоне так же просто, как вызвать функцию в выражении шаблона:

```js
html`<div>${fancyDirective('some text')}</div>`;
```

Lit поставляется с рядом [встроенных директив](directives.md), таких как [`repeat()`](directives.md#repeat) и [`cache()`](directives.md#cache). Пользователи также могут писать свои собственные директивы.

Существует два вида директив:

-   Простые функции
-   Директивы, основанные на классах

Простая функция возвращает значение для рендеринга. Она может принимать любое количество аргументов или не принимать их вовсе.

```js
export noVowels = (str) => str.replaceAll(/[aeiou]/ig,'x');
```

Директива, основанная на классе, позволяет делать то, что не под силу простой функции. Используйте директивы на основе классов, чтобы:

-   Получить прямой доступ к рендерингу DOM (например, добавлять, удалять или переупорядочивать рендеринговые узлы DOM).
-   Сохранять состояние между рендерами.
-   Обновлять DOM асинхронно, вне вызова рендера.
-   Очистка ресурсов при отключении директивы от DOM.

Остальная часть этой страницы описывает директивы на основе классов.

## Создание директив на основе классов

Чтобы создать директиву на основе класса, выполните следующие действия:

-   Реализуйте директиву в виде класса, который расширяет класс [`Directive`](https://lit.dev/docs/api/custom-directives#Directive).
-   Передайте свой класс фабрике [`directive()`](https://lit.dev/docs/api/custom-directives#directive), чтобы создать функцию директивы, которую можно использовать в выражениях шаблона Lit.

```js
import { Directive, directive } from 'lit/directive.js';

// Define directive
class HelloDirective extends Directive {
    render() {
        return `Hello!`;
    }
}
// Create the directive function
const hello = directive(HelloDirective);

// Use directive
const template = html`<div>${hello()}</div>`;
```

Когда этот шаблон обрабатывается, директива _function_ (`hello()`) возвращает объект `DirectiveResult`, который дает указание Lit создать или обновить экземпляр директивы _class_ (`HelloDirective`). Затем Lit вызывает методы экземпляра директивы для выполнения логики обновления.

Некоторые директивы должны обновлять DOM асинхронно, вне обычного цикла обновления. Чтобы создать _асинхронную директиву_, расширьте базовый класс `AsyncDirective` вместо `Directive`. Подробности см. в разделе [Асинхронные директивы](#async-directives).

## Жизненный цикл директивы, основанной на классе

Класс директив имеет несколько встроенных методов жизненного цикла:

-   Конструктор класса, для однократной инициализации.
-   `render()`, для декларативного рендеринга.
-   `update()`, для императивного доступа к DOM.

Вы должны реализовать обратный вызов `render()` для всех директив. Реализация `update()` необязательна. Реализация по умолчанию `update()` вызывает и возвращает значение из `render()`.

Директивы Async, которые могут обновлять DOM вне обычного цикла обновления, используют некоторые дополнительные обратные вызовы жизненного цикла. Подробности см. в разделе [Async-директивы](#async-directives).

### Одноразовая установка: constructor()

Когда Lit впервые встречает `DirectiveResult` в выражении, он создаст экземпляр соответствующего класса директивы (вызывая конструктор директивы и инициализаторы любых полей класса):

=== "TS"

    ```ts
    class MyDirective extends Directive {
    	// Class fields will be initialized once and can be used to persist
    	// state between renders
    	value = 0;
    	// Constructor is only run the first time a given directive is used
    	// in an expression
    	constructor(partInfo: PartInfo) {
    		super(partInfo);
    		console.log('MyDirective created');
    	}
    	// ...
    }
    ```

=== "JS"

    ```js
    class MyDirective extends Directive {
    	// Class fields will be initialized once and can be used to persist
    	// state between renders
    	value = 0;
    	// Constructor is only run the first time a given directive is used
    	// in an expression
    	constructor(partInfo) {
    		super(partInfo);
    		console.log('MyDirective created');
    	}
    	// ...
    }
    ```

Пока одна и та же функция директивы используется в одном и том же выражении при каждом рендере, предыдущий экземпляр используется повторно, таким образом, состояние экземпляра сохраняется между рендерами.

Конструктор получает один объект `PartInfo`, который предоставляет метаданные о выражении, в котором была использована директива. Это может быть полезно для проверки ошибок в случаях, когда директива предназначена для использования только в определенных типах выражений (см. [Ограничение директивы одним типом выражения](#limiting-a-directive-to-one-expression-type)).

### Декларативный рендеринг: render()

Метод `render()` должен возвращать значение для рендеринга в DOM. Он может возвращать любое рендерируемое значение, включая другой `DirectiveResult`.

Помимо обращения к состоянию экземпляра директивы, метод `render()` может также принимать произвольные аргументы, передаваемые в функцию директивы:

```js
const template = html`<div>
    ${myDirective(name, rank)}
</div>`;
```

Параметры, заданные для метода `render()`, определяют сигнатуру функции директивы:

=== "TS"

    ```ts
    class MaxDirective extends Directive {
    	maxValue = Number.MIN_VALUE;
    	// Define a render method, which may accept arguments:
    	render(value: number, minValue = Number.MIN_VALUE) {
    		this.maxValue = Math.max(
    			value,
    			this.maxValue,
    			minValue,
    		);
    		return this.maxValue;
    	}
    }
    const max = directive(MaxDirective);

    // Call the directive with `value` and `minValue` arguments defined for `render()`:
    const template = html`<div>${max(someNumber, 0)}</div>`;
    ```

=== "JS"

    ```js
    class MaxDirective extends Directive {
    	maxValue = Number.MIN_VALUE;
    	// Define a render method, which may accept arguments:
    	render(value, minValue = Number.MIN_VALUE) {
    		this.maxValue = Math.max(
    			value,
    			this.maxValue,
    			minValue,
    		);
    		return this.maxValue;
    	}
    }
    const max = directive(MaxDirective);

    // Call the directive with `value` and `minValue` arguments defined for `render()`:
    const template = html`<div>${max(someNumber, 0)}</div>`;
    ```

### Императивный доступ к DOM: update()

В более продвинутых случаях использования вашей директиве может потребоваться доступ к базовому DOM и императивное чтение из него или его изменение. Этого можно добиться, переопределив обратный вызов `update()`.

Обратный вызов `update()` получает два аргумента:

-   Объект `Part` с API для прямого управления DOM, связанным с выражением.
-   Массив, содержащий аргументы `render()`.

Ваш метод `update()` должен возвращать что-то, что Lit может отрендерить, или специальное значение `noChange`, если повторный рендеринг не требуется. Обратный вызов `update()` довольно гибкий, но типичные варианты использования включают в себя:

-   Чтение данных из DOM и использование их для генерации значения для рендеринга.
-   Императивное обновление DOM с помощью ссылки `element` или `parentNode` на объект `Part`. В этом случае `update()` обычно возвращает `noChange`, указывая, что Lit не нужно предпринимать никаких дальнейших действий для рендеринга директивы.

#### Части

Каждая позиция выражения имеет свой собственный объект `Part`:

-   [`ChildPart`](https://lit.dev/docs/api/custom-directives#ChildPart) для выражений в позиции HTML child.
-   [`AttributePart`](https://lit.dev/docs/api/custom-directives#AttributePart) для выражений в позиции значения атрибута HTML.
-   [`BooleanAttributePart`](https://lit.dev/docs/api/custom-directives#BooleanAttributePart) для выражений в значении булевого атрибута (имя с префиксом `?`).
-   [`EventPart`](https://lit.dev/docs/api/custom-directives#EventPart) для выражений в позиции слушателя события (имя с префиксом `@`).
-   [`PropertyPart`](https://lit.dev/docs/api/custom-directives#PropertyPart) для выражений в позиции значения свойства (имя с префиксом `.`).
-   [`ElementPart`](https://lit.dev/docs/api/custom-directives#ElementPart) для выражений на теге элемента.

В дополнение к метаданным, содержащимся в `PartInfo`, все типы `Part` предоставляют доступ к DOM `элементу`, связанному с выражением (или `parentNode`, в случае `ChildPart`), к которому можно напрямую обратиться в `update()`. Например:

=== "TS"

    ```ts
    // Renders attribute names of parent element to textContent
    class AttributeLogger extends Directive {
    	attributeNames = '';
    	update(part: ChildPart) {
    		this.attributeNames = (part.parentNode as Element)
    			.getAttributeNames?.()
    			.join(' ');
    		return this.render();
    	}
    	render() {
    		return this.attributeNames;
    	}
    }
    const attributeLogger = directive(AttributeLogger);

    const template = html`<div a b>${attributeLogger()}</div>`;
    // Renders: `<div a b>a b</div>`
    ```

=== "JS"

    ```js
    // Renders attribute names of parent element to textContent
    class AttributeLogger extends Directive {
    	attributeNames = '';
    	update(part) {
    		this.attributeNames = part.parentNode
    			.getAttributeNames?.()
    			.join(' ');
    		return this.render();
    	}
    	render() {
    		return this.attributeNames;
    	}
    }
    const attributeLogger = directive(AttributeLogger);

    const template = html`<div a b>${attributeLogger()}</div>`;
    // Renders: `<div a b>a b</div>`
    ```

Кроме того, модуль `directive-helpers.js` содержит ряд вспомогательных функций, которые работают с объектами `Part` и могут быть использованы для динамического создания, вставки и перемещения частей внутри `ChildPart` директивы.

#### Вызов `render()` из `update()`

Реализация по умолчанию `update()` просто вызывает и возвращает значение из `render()`. Если вы переопределили `update()` и все еще хотите вызвать `render()` для генерации значения, вам нужно вызвать `render()` явно.

Аргументы `render()` передаются в `update()` в виде массива. Вы можете передать аргументы в `render()` следующим образом:

=== "TS"

    ```ts
    class MyDirective extends Directive {
    update(part: Part, [fish, bananas]: DirectiveParameters<this>) {
    	// ...
    	return this.render(fish, bananas);
    }
    render(fish: number, bananas: number) { ... }
    }
    ```

=== "JS"

    ```js
    class MyDirective extends Directive {
    update(part, [fish, bananas]) {
    	// ...
    	return this.render(fish, bananas);
    }
    render(fish, bananas) { ... }
    }
    ```

### Различия между `update()` и `render()`

Хотя обратный вызов `update()` является более мощным, чем обратный вызов `render()`, есть важное различие: При использовании пакета `@lit-labs/ssr` для рендеринга на стороне сервера (SSR), на сервере вызывается только метод `render()`. Чтобы быть совместимыми с SSR, директивы должны возвращать значения из `render()` и использовать `update()` только для логики, требующей доступа к DOM.

## Сигнализация отсутствия изменений

Иногда в директиве может не быть ничего нового для рендеринга Lit. Вы сигнализируете об этом, возвращая `noChange` из метода `update()` или `render()`. Это отличается от возврата `undefined`, который заставляет Lit очистить `Part`, связанную с директивой. Возврат `noChange` оставляет на месте ранее отрендеренное значение.

Существует несколько распространенных причин для возврата `noChange`:

-   Исходя из входных значений, нет ничего нового для рендеринга.
-   Метод `update()` в обязательном порядке обновил DOM.
-   В асинхронной директиве вызов `update()` или `render()` может вернуть `noChange`, потому что рендерить пока нечего.

Например, директива может отслеживать предыдущие значения, переданные ей, и выполнять собственную грязную проверку, чтобы определить, нуждается ли вывод директивы в обновлении. Метод `update()` или `render()` может возвращать `noChange`, чтобы сигнализировать, что вывод директивы не нуждается в повторном рендеринге.

=== "TS"

    ```ts
    import { Directive } from 'lit/directive.js';
    import { noChange } from 'lit';
    class CalculateDiff extends Directive {
    	a?: string;
    	b?: string;
    	render(a: string, b: string) {
    		if (this.a !== a || this.b !== b) {
    			this.a = a;
    			this.b = b;
    			// Expensive & fancy text diffing algorithm
    			return calculateDiff(a, b);
    		}
    		return noChange;
    	}
    }
    ```

=== "JS"

    ```js
    import { Directive } from 'lit/directive.js';
    import { noChange } from 'lit';
    class CalculateDiff extends Directive {
    	render(a, b) {
    		if (this.a !== a || this.b !== b) {
    			this.a = a;
    			this.b = b;
    			// Expensive & fancy text diffing algorithm
    			return calculateDiff(a, b);
    		}
    		return noChange;
    	}
    }
    ```

## Ограничение директивы одним типом выражения {#limiting-a-directive-to-one-expression-type}

Некоторые директивы полезны только в одном контексте, например, в выражении атрибута или дочернем выражении. Если директива помещена в неправильный контекст, она должна выдать соответствующую ошибку.

Например, директива `classMap` проверяет, что она используется только в `AttributePart` и только для `class` атрибута:

=== "TS"

    ```ts
    class ClassMap extends Directive {
    	constructor(partInfo: PartInfo) {
    		super(partInfo);
    		if (
    			partInfo.type !== PartType.ATTRIBUTE ||
    			partInfo.name !== 'class'
    		) {
    			throw new Error(
    				'The `classMap` directive must be used in the `class` attribute',
    			);
    		}
    	}
    	// ...
    }
    ```

=== "JS"

    ```js
    class ClassMap extends Directive {
    	constructor(partInfo) {
    		super(partInfo);
    		if (
    			partInfo.type !== PartType.ATTRIBUTE ||
    			partInfo.name !== 'class'
    		) {
    			throw new Error(
    				'The `classMap` directive must be used in the `class` attribute',
    			);
    		}
    	}
    	// ...
    }
    ```

## Асинхронные директивы {#async-directives}

Предыдущие примеры директив являются синхронными: они синхронно возвращают значения из своих обратных вызовов `render()`/ `update()`, поэтому их результаты записываются в DOM во время обратного вызова `update()` компонента.

Иногда требуется, чтобы директива могла обновлять DOM асинхронно — например, если она зависит от асинхронного события, такого как сетевой запрос.

Для асинхронного обновления результата директивы необходимо расширить базовый класс [`AsyncDirective`](https://lit.dev/docs/api/custom-directives#AsyncDirective), который предоставляет API `setValue()`. `setValue()` позволяет директиве "подставить" новое значение в выражение шаблона, вне обычного цикла `update`/`render` шаблона.

Вот пример простой асинхронной директивы, которая выдает значение Promise:

=== "TS"

    ```ts
    class ResolvePromise extends AsyncDirective {
    	render(promise: Promise<unknown>) {
    		Promise.resolve(promise).then((resolvedValue) => {
    			// Rendered asynchronously:
    			this.setValue(resolvedValue);
    		});
    		// Rendered synchronously:
    		return `Waiting for promise to resolve`;
    	}
    }
    export const resolvePromise = directive(ResolvePromise);
    ```

=== "JS"

    ```js
    class ResolvePromise extends AsyncDirective {
    	render(promise) {
    		Promise.resolve(promise).then((resolvedValue) => {
    			// Rendered asynchronously:
    			this.setValue(resolvedValue);
    		});
    		// Rendered synchronously:
    		return `Waiting for promise to resolve`;
    	}
    }
    export const resolvePromise = directive(ResolvePromise);
    ```

Здесь отрисованный шаблон показывает "Waiting for promise to resolve", за которым следует разрешенное значение обещания, когда бы оно ни разрешилось.

Асинхронные директивы часто нуждаются в подписке на внешние ресурсы. Чтобы предотвратить утечку памяти, асинхронные директивы должны отменять подписку или избавляться от ресурсов, когда экземпляр директивы больше не используется. Для этого `AsyncDirective` предоставляет следующие дополнительные обратные вызовы и API жизненного цикла:

-   `disconnected()`: Вызывается, когда директива больше не используется. Экземпляры директив отсоединяются в трех случаях:

    -   Когда дерево DOM, в котором содержится директива, удаляется из DOM
    -   Когда основной элемент директивы отключается
    -   Когда выражение, породившее директиву, больше не разрешается в ту же директиву.

    После того как директива получает обратный вызов `disconnected`, она должна освободить все ресурсы, на которые она подписалась во время `update` или `render`, чтобы предотвратить утечку памяти.

-   `reconnected()`: Вызывается, когда ранее отключенная директива возвращается к использованию. Поскольку поддеревья DOM могут быть временно отключены, а затем снова подключены, отключенной директиве может потребоваться реакция на повторное подключение. Примерами этого могут быть случаи, когда DOM удаляется и кэшируется для последующего использования, или когда элемент хоста перемещается, вызывая отключение и повторное подключение. Обратный вызов `reconnected()` всегда должен быть реализован наряду с `disconnected()`, чтобы вернуть отключенную директиву в ее рабочее состояние.

-   `isConnected`: Отражает текущее состояние подключения директивы.

!!!info ""

    Обратите внимание, что `AsyncDirective` может продолжать получать обновления, пока он отключен, если содержащее его дерево будет перерисовано. В связи с этим, `update` и/или `render` должны всегда проверять флаг `this.isConnected` перед подпиской на любые долго хранящиеся ресурсы, чтобы предотвратить утечки памяти.

Ниже приведен пример директивы, которая подписывается на `Observable` и обрабатывает отключение и повторное подключение соответствующим образом:

=== "TS"

    ```ts
    class ObserveDirective extends AsyncDirective {
    	observable: Observable<unknown> | undefined;
    	unsubscribe: (() => void) | undefined;
    	// When the observable changes, unsubscribe to the old one and
    	// subscribe to the new one
    	render(observable: Observable<unknown>) {
    		if (this.observable !== observable) {
    			this.unsubscribe?.();
    			this.observable = observable;
    			if (this.isConnected) {
    				this.subscribe(observable);
    			}
    		}
    		return noChange;
    	}
    	// Subscribes to the observable, calling the directive's asynchronous
    	// setValue API each time the value changes
    	subscribe(observable: Observable<unknown>) {
    		this.unsubscribe = observable.subscribe(
    			(v: unknown) => {
    				this.setValue(v);
    			},
    		);
    	}
    	// When the directive is disconnected from the DOM, unsubscribe to ensure
    	// the directive instance can be garbage collected
    	disconnected() {
    		this.unsubscribe!();
    	}
    	// If the subtree the directive is in was disconnected and subsequently
    	// re-connected, re-subscribe to make the directive operable again
    	reconnected() {
    		this.subscribe(this.observable!);
    	}
    }
    export const observe = directive(ObserveDirective);
    ```

=== "JS"

    ```js
    class ObserveDirective extends AsyncDirective {
    	// When the observable changes, unsubscribe to the old one and
    	// subscribe to the new one
    	render(observable) {
    		if (this.observable !== observable) {
    			this.unsubscribe?.();
    			this.observable = observable;
    			if (this.isConnected) {
    				this.subscribe(observable);
    			}
    		}
    		return noChange;
    	}
    	// Subscribes to the observable, calling the directive's asynchronous
    	// setValue API each time the value changes
    	subscribe(observable) {
    		this.unsubscribe = observable.subscribe((v) => {
    			this.setValue(v);
    		});
    	}
    	// When the directive is disconnected from the DOM, unsubscribe to ensure
    	// the directive instance can be garbage collected
    	disconnected() {
    		this.unsubscribe();
    	}
    	// If the subtree the directive is in was disconneted and subsequently
    	// re-connected, re-subscribe to make the directive operable again
    	reconnected() {
    		this.subscribe(this.observable);
    	}
    }
    export const observe = directive(ObserveDirective);
    ```
