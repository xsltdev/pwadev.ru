---
description: Поскольку Lit использует обычные выражения Javascript, вы можете использовать стандартные конструкции потока управления Javascript, такие как условные операторы, вызовы функций и операторы if или switch для отображения условного содержимого
---

# Условные операторы

Поскольку Lit использует обычные выражения Javascript, вы можете использовать стандартные конструкции потока управления Javascript, такие как [условные операторы](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Conditional_Operator), вызовы функций и операторы `if` или `switch` для отображения условного содержимого.

Условные выражения JavaScript также позволяют комбинировать вложенные шаблонные выражения, и вы даже можете сохранять результаты шаблонов в переменных, чтобы использовать их в других местах.

## Условные выражения с условным (тернарным) оператором

Тернарные выражения с условным оператором `?` - отличный способ добавления встроенных условий:

```ts
render() {
  return this.userName
    ? html`Welcome ${this.userName}`
    : html`Please log in <button>Login</button>`;
}
```

## Условные выражения с помощью операторов if

Вы можете выразить условную логику с помощью операторов `if` вне шаблона, чтобы вычислить значения для использования внутри шаблона:

```ts
render() {
  let message;
  if (this.userName) {
    message = html`Welcome ${this.userName}`;
  } else {
    message = html`Please log in <button>Login</button>`;
  }
  return html`<p class="message">${message}</p>`;
}
```

В качестве альтернативы можно вынести логику в отдельную функцию, чтобы упростить шаблон:

```ts
getUserMessage() {
  if (this.userName) {
    return html`Welcome ${this.userName}`;
  } else {
    return html`Please log in <button>Login</button>`;
  }
}
render() {
  return html`<p>${this.getUserMessage()}</p>`;
}
```

## Кэширование результатов работы шаблона: директива `cache`

В большинстве случаев JavaScript-условия - это все, что вам нужно для условных шаблонов. Однако если вы переключаетесь между большими и сложными шаблонами, вам, возможно, захочется избежать затрат на воссоздание DOM при каждом переключении.

В этом случае вы можете использовать директиву `cache` _directive_. Директива `cache` кэширует DOM для шаблонов, которые не отображаются в данный момент.

```ts
render() {
  return html`${cache(this.userName ?
    html`Welcome ${this.userName}`:
    html`Please log in <button>Login</button>`)
  }`;
}
```

Дополнительную информацию см. в директиве [cache](directives.md#cache).

## Условный рендеринг ничего {#conditionally-rendering-nothing}

Иногда в одной из ветвей условного оператора нужно вывести ничего. Это обычно требуется для дочерних выражений, а также иногда в выражениях атрибутов.

Для дочерних выражений значения `undefined`, `null`, пустая строка (`''`) и значение посыла Lit [nothing](https://lit.dev/docs/v3/api/templates/#nothing) не отображают узлы. Дополнительные сведения см. в разделе [Удаление дочернего содержимого](expressions.md#removing-child).

В этом примере значение отображается, если оно существует, а в противном случае ничего не отображается:

```ts
render() {
  return html`<user-name>${this.userName ?? nothing}</user-name>`;
}
```

Для выражений с атрибутами значение смыслового блока Lit [nothing](https://lit.dev/docs/v3/api/templates/#nothing) удаляет атрибут. Дополнительную информацию см. в разделе [Удаление атрибута](expressions.md#removing-attribute).

В этом примере условно отображается атрибут `aria-label`:

```ts
html`<button
    aria-label="${this.ariaLabel || nothing}"
></button>`;
```
