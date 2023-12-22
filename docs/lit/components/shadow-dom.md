---
description: Компоненты Lit используют shadow DOM для инкапсуляции своего DOM. Теневой DOM предоставляет возможность добавить к элементу отдельное изолированное и инкапсулированное дерево DOM
---

# Теневой DOM

Компоненты Lit используют [shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom) для инкапсуляции своего DOM. Теневой DOM предоставляет возможность добавить к элементу отдельное изолированное и инкапсулированное дерево DOM. Инкапсуляция DOM - это ключ к обеспечению совместимости с любым другим кодом, включая другие веб-компоненты или компоненты Lit, функционирующие на странице.

Shadow DOM обеспечивает три преимущества:

-   DOM scoping. API DOM, такие как `document.querySelector`, не найдут элементов в теневой DOM компонента, поэтому глобальным скриптам сложнее случайно сломать ваш компонент.
-   Разграничение стилей. Вы можете писать инкапсулированные стили для теневого DOM, которые не не влияют на остальную часть дерева DOM.
-   Композиция. Теневой корень компонента, который содержит его внутренний DOM, отделен от дочерних элементов компонента. Вы можете выбрать, как дочерние элементы будут отображаться во внутреннем DOM компонента.

Дополнительная информация о теневом DOM:

-   [Shadow DOM v1: Self-Contained Web Components](https://developers.google.com/web/fundamentals/web-components/shadowdom) на сайте Web Fundamentals.
-   [Использование теневого DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) на MDN.

!!!alert "Старые браузеры"

    В старых браузерах, где нативный теневой DOM недоступен, можно использовать [полифиллы веб-компонентов](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs). Обратите внимание, что модуль `polyfill-support` от Lit должен быть загружен вместе с полифиллами веб-компонентов. Подробности см. в [Требования для устаревших браузеров](../tools/requirements.md#building-for-legacy-browsers).

## Доступ к узлам в теневом DOM

Lit рендерит компоненты в свой `renderRoot`, который по умолчанию является теневым корнем. Чтобы найти внутренние элементы, вы можете использовать API запросов DOM, например `this.renderRoot.querySelector()`.

Корень `renderRoot` всегда должен быть либо теневым корнем, либо элементом, для которого используются такие API, как `.querySelectorAll()` и `.children`.

Вы можете запросить внутренний DOM после первоначального рендеринга компонента (например, в `firstUpdated`), или использовать геттерный шаблон:

```js
firstUpdated() {
  this.staticNode = this.renderRoot.querySelector('#static-node');
}

get _closeButton() {
  return this.renderRoot.querySelector('#close-button');
}
```

LitElement предоставляет набор декораторов, которые обеспечивают сокращенный способ определения геттеров, подобных этому.

### `@query`, `@queryAll` и `@queryAsync` декораторы

Декораторы `@query`, `@queryAll` и `@queryAsync` предоставляют удобный способ доступа к узлам во внутреннем DOM компонента.

!!!alert "Использование декораторов"

    **Декораторы** - это предложенная функция JavaScript, поэтому для использования декораторов вам потребуется компилятор типа Babel или TypeScript. Подробности см. в [Использование декораторов](decorators.md).

#### `@query` { #query }

Изменяет свойство класса, превращая его в геттер, который возвращает узел из корня рендеринга. Необязательный второй аргумент при значении `true` выполняет запрос DOM только один раз и кэширует результат. Это может быть использовано в качестве оптимизации производительности в случаях, когда запрашиваемый узел не будет меняться.

```js
import { LitElement, html } from 'lit';
import { query } from 'lit/decorators/query.js';

class MyElement extends LitElement {
    @query('#first')
    _first;

    render() {
        return html`
            <div id="first"></div>
            <div id="second"></div>
        `;
    }
}
```

Этот декоратор эквивалентен:

```js
get _first() {
  return this.renderRoot?.querySelector('#first') ?? null;
}
```

#### `@queryAll` { #query-all }

Идентичен `query`, за исключением того, что возвращает все совпадающие узлы, а не один узел. Это эквивалентно вызову `querySelectorAll`.

```js
import { LitElement, html } from 'lit';
import { queryAll } from 'lit/decorators/queryAll.js';

class MyElement extends LitElement {
    @queryAll('div')
    _divs;

    render() {
        return html`
            <div id="first"></div>
            <div id="second"></div>
        `;
    }
}
```

Здесь `_divs` вернет оба элемента `<div>` в шаблоне. Для TypeScript типизация свойства `@queryAll` - это `NodeListOf<HTMLElement>`. Если вы точно знаете, какой тип узлов вы хотите получить, тип может быть более конкретным:

```js
@queryAll('button')
_buttons!: NodeListOf<HTMLButtonElement>
```

Восклицательный знак (`!`) после `buttons` - это оператор TypeScript [non-null assertion operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator). Он указывает компилятору, что `кнопки` всегда должны быть определены, и никогда не должны быть `null` или `undefined`.

#### `@queryAsync` { #query-async }

Аналогичен `@query`, только вместо непосредственного возврата узла возвращает `Promise`, который разрешается в этот узел после завершения рендеринга любого ожидающего элемента. Код может использовать это вместо ожидания обещания `updateComplete`.

Это полезно, например, если узел, возвращаемый `@queryAsync`, может измениться в результате изменения другого свойства.

## Рендеринг дочерних узлов со слотами {#slots}

Ваш компонент может принимать дочерние элементы (например, элемент `<ul>` может иметь дочерние элементы `<li>`).

```html
<my-element>
    <p>A child</p>
</my-element>
```

По умолчанию, если элемент имеет теневое дерево, его дочерние узлы не отображаются вообще.

Чтобы отобразить дочерние элементы, ваш шаблон должен включать один или несколько [`<slot>` элементов](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot), которые выступают в качестве держателей для дочерних узлов.

### Использование элемента `slot`

Чтобы отобразить дочерние элементы, создайте для них элемент `<slot>` в шаблоне элемента. Дочерние элементы не _перемещаются_ в дереве DOM, но они отображаются так, как если бы они были дочерними элементами `<slot>`. Например:

<litdev-example sandbox-base-url="https://playground.lit.dev/" style="--litdev-example-editor-lines-ts:14;
             --litdev-example-editor-lines-js:14;
             --litdev-example-preview-height:165px" project="v3-docs/components/shadowdom/slots"></litdev-example>

### Использование именованных слотов

Чтобы назначить ребенка на определенный слот, убедитесь, что атрибут `slot` ребенка совпадает с атрибутом `name` слота:

-   **Именованные слоты принимают детей только с совпадающим атрибутом `slot`**

    Например, `<slot name="one"></slot>` принимает детей только с атрибутом `slot="one"`.

-   **Дети с атрибутом `slot` будут отображаться только в слоте с соответствующим атрибутом `name`**

    Например, `<p slot="one">...</p>` будет помещен только в `<slot name="one"></slot>`.

<litdev-example sandbox-base-url="https://playground.lit.dev/" style="--litdev-example-editor-lines-ts:14;
             --litdev-example-editor-lines-js:14;
             --litdev-example-preview-height:120px" project="v3-docs/components/shadowdom/namedslots"></litdev-example>

### Указание содержимого обратного хода слота {#fallback}

Вы можете указать содержимое отката для слота. Запасной контент отображается, когда слоту не назначен ребенок.

```html
<slot>I am fallback content</slot>
```

!!!alert "Рендеринг резервного содержимого"

    Если слоту назначены дочерние узлы, его содержимое не отображается. Слот по умолчанию без имени принимает любые дочерние узлы. Он не будет отображать резервное содержимое, даже если единственными назначенными узлами являются текстовые узлы, содержащие пробелы, например `<example-element> </example-element>`. При использовании выражения Lit в качестве дочернего элемента пользовательского элемента убедитесь, что в соответствующих случаях используется нерендерируемое значение, чтобы все содержимое слота с возвратом было отрисовано. Дополнительные сведения см. в разделе [удаление дочернего содержимого](../templates/expressions.md#removing-child).

## Доступ к дочерним элементам слотов { #accessing-slotted-children }

Чтобы получить доступ к дочерним элементам, назначенным слотам в корне тени, вы можете использовать стандартные методы `slot.assignedNodes` или `slot.assignedElements` с событием `slotchange`.

Например, вы можете создать геттер для доступа к назначенным элементам для определенного слота:

```js
get _slottedChildren() {
  const slot = this.shadowRoot.querySelector('slot');
  return slot.assignedElements({flatten: true});
}
```

Вы также можете использовать событие `slotchange` для выполнения действий при изменении назначенных узлов. В следующем примере извлекается текстовое содержимое всех дочерних узлов со слотами.

```js
handleSlotchange(e) {
  const childNodes = e.target.assignedNodes({flatten: true});
  // ... do something with childNodes ...
  this.allText = childNodes.map((node) => {
    return node.textContent ? node.textContent : ''
  }).join('');
}

render() {
  return html`<slot @slotchange=${this.handleSlotchange}></slot>`;
}
```

Для получения дополнительной информации смотрите [HTMLSlotElement](https://developer.mozilla.org/docs/Web/API/HTMLSlotElement) на MDN.

### `@queryAssignedElements` и `@queryAssignedNodes` декораторы { #query-assigned-nodes }

`@queryAssignedElements` и `@queryAssignedNodes` преобразуют свойство класса в геттер, возвращающий результат вызова [`slot.assignedElements`](https://developer.mozilla.org/docs/Web/API/HTMLSlotElement/assignedElements) или [`slot.assignedNodes`](https://developer.mozilla.org/docs/Web/API/HTMLSlotElement/assignedNodes) соответственно для заданного слота в теневом дереве компонента. Используйте их для запроса элементов или узлов, назначенных данному слоту.

Обе принимают необязательный объект со следующими свойствами:

| Свойство | Описание |
| --- | --- |
| `flatten` | Булево значение, указывающее, нужно ли сплющивать назначенные узлы, заменяя все дочерние `<slot>` элементы их назначенными узлами. |
| `slot` | Имя слота, определяющее слот для запроса. Оставьте неопределенным, чтобы выбрать слот по умолчанию. |
| `selector` (только для `queryAssignedElements`) | Если указано, возвращаются только те назначенные элементы, которые соответствуют данному CSS-селектору. |

Решение о том, какой декоратор использовать, зависит от того, хотите ли вы запрашивать текстовые узлы, назначенные слоту, или только узлы элементов. Это решение зависит от конкретного случая использования.

!!!alert "Использование декораторов"

    **Декораторы** - это предложенная функция JavaScript, поэтому для использования декораторов вам потребуется компилятор типа Babel или TypeScript. Подробности см. в [Использование декораторов](decorators.md).

```ts
@queryAssignedElements({slot: 'list', selector: '.item'})
_listItems!: Array<HTMLElement>;

@queryAssignedNodes({slot: 'header', flatten: true})
_headerNodes!: Array<Node>;
```

Приведенные выше примеры эквивалентны следующему коду:

```js
get _listItems() {
  const slot = this.shadowRoot.querySelector('slot[name=list]');
  return slot.assignedElements().filter((node) => node.matches('.item'));
}

get _headerNodes() {
  const slot = this.shadowRoot.querySelector('slot[name=header]');
  return slot.assignedNodes({flatten: true});
}
```

## Настройка корня рендеринга {#renderroot}

У каждого компонента Lit есть **корень рендера** - узел DOM, который служит контейнером для его внутреннего DOM.

По умолчанию LitElement создает открытый `shadowRoot` и осуществляет рендеринг внутри него, создавая следующую структуру DOM:

```html
<my-element>
    #shadow-root
    <p>child 1</p>
    <p>child 2</p></my-element
>
```

Есть два способа настроить корень рендеринга, используемый LitElement:

-   Установка `shadowRootOptions`.
-   Реализация метода `createRenderRoot`.

### Установка `shadowRootOptions`.

Самый простой способ настроить корень рендера - установить статическое свойство `shadowRootOptions`. Реализация `createRenderRoot` по умолчанию передает `shadowRootOptions` в качестве аргумента опций в `attachShadow` при создании корня тени компонента. Он может быть установлен для настройки любых опций, разрешенных в словаре [ShadowRootInit](https://developer.mozilla.org/docs/Web/API/Element/attachShadow#parameters), например, `mode` и `delegatesFocus`.

```js
class DelegatesFocus extends LitElement {
    static shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        delegatesFocus: true,
    };
}
```

Дополнительные сведения см. в [Element.attachShadow()](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow) на MDN.

### Реализация `createRenderRoot`

Реализация по умолчанию `createRenderRoot` создает открытый корень тени и добавляет к нему любые стили, заданные в поле класса `static styles`. Подробнее о стилях см. в [Styles](styles.md).

Чтобы настроить корень рендеринга компонента, реализуйте `createRenderRoot` и верните узел, в который должен рендериться шаблон.

Например, для рендеринга шаблона в основном дереве DOM в качестве дочерних элементов, реализуйте `createRenderRoot` и верните `this`.

!!!alert "Рендеринг в дочерние элементы"

    Рендеринг в дочерние элементы, а не в теневой DOM, как правило, не рекомендуется. Ваш элемент не будет иметь доступа к DOM или к диапазону стилей, и он не сможет компоновать элементы в своем внутреннем DOM.

<litdev-example sandbox-base-url="https://playground.lit.dev/" style="--litdev-example-editor-lines-ts:12;
             --litdev-example-editor-lines-js:11;
             --litdev-example-preview-height:120px" project="v3-docs/components/shadowdom/renderroot"></litdev-example>
