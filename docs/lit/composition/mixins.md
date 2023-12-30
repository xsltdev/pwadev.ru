---
description: Миксины классов - это паттерн для совместного использования кода между классами с помощью стандартного JavaScript
---

# Миксины

Миксины классов - это паттерн для совместного использования кода между классами с помощью стандартного JavaScript. В отличие от шаблонов композиции "has-a", таких как [reactive controllers](controllers.md), где класс может _владеть_ контроллером для добавления поведения, миксины реализуют композицию "is-a", где миксин заставляет сам класс _быть_ экземпляром разделяемого поведения.

Вы можете использовать миксины для настройки компонента Lit, добавляя API или переопределяя его обратные вызовы жизненного цикла.

## Основы миксинов

Миксины можно рассматривать как "фабрики подклассов", которые переопределяют класс, к которому они применяются, и возвращают подкласс, дополненный поведением, указанным в миксине. Поскольку миксины реализуются с помощью стандартных выражений классов JavaScript, они могут использовать все идиомы, доступные для подклассов, такие как добавление новых полей/методов, переопределение существующих методов суперкласса и использование `super`.

!!!info ""

    Для удобства чтения в примерах на этой странице опущены некоторые типы TypeScript для функций mixin. Подробности о правильной типизации миксинов в TypeScript см. в [Mixins in TypeScript](#mixins-in-typescript).

Чтобы определить миксин, напишите функцию, которая принимает `superClass` и возвращает новый класс, расширяющий его, добавляя поля и методы по мере необходимости:

```ts
const MyMixin = (superClass) =>
    class extends superClass {
        /* class fields & methods to extend superClass with */
    };
```

Чтобы применить миксин, просто передайте класс, чтобы сгенерировать подкласс с примененным миксином. Чаще всего пользователи применяют миксин непосредственно к базовому классу при определении нового класса:

```ts
class MyElement extends MyMixin(LitElement) {
    /* user code */
}
```

Миксины также могут использоваться для создания конкретных подклассов, которые пользователи могут расширять как обычный класс, где миксин - это деталь реализации:

```ts
export const LitElementWithMixin = MyMixin(LitElement);
```

---

```ts
import { LitElementWithMixin } from './lit-element-with-mixin.js';

class MyElement extends LitElementWithMixin {
    /* user code */
}
```

Поскольку миксины классов - это стандартный паттерн JavaScript, а не Lit-специфика, в сообществе есть много информации о том, как использовать миксины для повторного использования кода. Чтобы узнать больше о миксинах, вот несколько хороших ссылок:

-   [Class mixins](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends#mix-ins) на MDN
-   [Real Mixins with JavaScript Classes](https://justinfagnani.com/2015/12/21/real-mixins-with-JavaScript-classes/) by Justin Fagnani
-   [Миксины](https://www.TypeScriptlang.org/docs/handbook/mixins.html) в руководстве по TypeScript.
-   [Dedupe mixin library](https://open-wc.org/docs/development/dedupe-mixin/) от open-wc, включая обсуждение того, когда использование миксинов может привести к дублированию, и как использовать библиотеку дедупирования, чтобы избежать этого.
-   [Mixin conventions](https://component.kitchen/elix/mixins) с последующей библиотекой веб-компонентов Elix. Не являясь специфичной для Lit, содержит продуманные предложения по применению соглашений при определении миксинов для веб-компонентов.

## Создание миксинов для LitElement

Миксины, применяемые к LitElement, могут реализовывать или переопределять любой из стандартных [пользовательских жизненных циклов элементов](../components/lifecycle.md#custom-element-lifecycle), таких как `constructor()` или `connectedCallback()`, а также любой из [реактивных жизненных циклов обновлений](../components/lifecycle.md#reactive-update-cycle), таких как `render()` или `updated()`.

Например, следующий миксин будет регистрировать, когда элемент создан, подключен и обновлен:

```ts
const LoggingMixin = (superClass) =>
    class extends superClass {
        constructor() {
            super();
            console.log(`${this.localName} was created`);
        }
        connectedCallback() {
            super.connectedCallback();
            console.log(`${this.localName} was connected`);
        }
        updated(changedProperties) {
            super.updated?.(changedProperties);
            console.log(`${this.localName} was updated`);
        }
    };
```

Обратите внимание, что миксин всегда должен делать супервызов стандартных методов жизненного цикла пользовательского элемента, реализованных в `LitElement`. При переопределении обратного вызова реактивного обновления жизненного цикла рекомендуется вызывать суперметод, если он уже существует в суперклассе (как показано выше с необязательным вызовом `super.updated?()`).

Также обратите внимание, что миксины могут выполнять работу до или после базовой реализации стандартных обратных вызовов жизненного цикла, выбирая время вызова суперметода.

Миксины также могут добавлять [реактивные свойства](../components/properties.md), [стили](../components/styles.md) и API к подклассифицируемому элементу.

Миксин в примере ниже добавляет реактивное свойство `highlight` к элементу и метод `renderHighlight()`, который пользователь может вызвать, чтобы обернуть некоторый контент. Когда свойство/атрибут `highlight` установлено, обернутое содержимое окрашивается в желтый цвет.

<litdev-example sandbox-base-url="https://playground.lit.dev/" style="--litdev-example-editor-lines-ts:24;
             --litdev-example-editor-lines-js:29;
             --litdev-example-preview-height:120px" project="v3-docs/mixins/highlightable"></litdev-example>

Обратите внимание, что в приведенном примере пользователь миксина должен вызывать метод `renderHighlight()` из своего метода `render()`, а также позаботиться о том, чтобы добавить `статические стили`, определенные миксином, в стили подкласса. Характер этого договора между миксином и пользователем зависит от определения миксина и должен быть задокументирован автором миксина.

## Миксины в TypeScript

При написании миксинов `LitElement` на TypeScript необходимо знать несколько деталей.

### Типизация суперкласса

Вы должны ограничить аргумент `superClass` типом класса, который, как вы ожидаете, будет расширяться пользователями, если таковые имеются. Этого можно добиться с помощью общего вспомогательного типа `Constructor`, как показано ниже:

```ts
import {LitElement} from 'lit';

type Constructor<T = {}> = new (...args: any[]) => T;

export const MyMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  class MyMixinClass extends superClass {
    /* ... */
  };
  return MyMixinClass as /* see "typing the subclass" below */;
}
```

Приведенный выше пример гарантирует, что класс, передаваемый в миксин, расширяется от `LitElement`, так что ваш миксин может полагаться на обратные вызовы и другие API, предоставляемые Lit.

### Типизация подкласса

Хотя в TypeScript есть базовая поддержка вывода возвращаемого типа для подкласса, созданного с помощью шаблона mixin, у нее есть серьезное ограничение: выводимый класс не должен содержать членов с модификаторами доступа `private` или `protected`.

!!!info ""

    Поскольку `LitElement` сам по себе имеет приватные и защищенные члены, по умолчанию TypeScript выдаст ошибку _"Property '...' of exported class expression may not be private or protected."_ при возврате класса, расширяющего `LitElement`.

Существует два обходных пути, оба из которых предполагают приведение возвращаемого типа из функции mixin, чтобы избежать вышеуказанной ошибки.

#### Когда миксин не добавляет новых публичных/защищенных API

Если ваш миксин переопределяет только методы или свойства `LitElement` и не добавляет никаких новых API, вы можете просто привести сгенерированный класс к типу суперкласса `T`, который был передан:

```ts
export const MyMixin = <T extends Constructor<LitElement>>(
    superClass: T,
) => {
    class MyMixinClass extends superClass {
        connectedCallback() {
            super.connectedCallback();
            this.doSomethingPrivate();
        }
        private doSomethingPrivate() {
            /* does not need to be part of the interface */
        }
    }
    // Cast return type to the superClass type passed in
    return MyMixinClass as T;
};
```

#### Когда миксин добавляет новый публичный/защищенный API

Если ваш миксин добавляет новый защищенный или публичный API, который пользователи должны иметь возможность использовать в своем классе, вам нужно определить интерфейс для миксина отдельно от реализации, а возвращаемый тип привести к пересечению интерфейса миксина и типа суперкласса:

```ts
// Define the interface for the mixin
export declare class MyMixinInterface {
    highlight: boolean;
    protected renderHighlight(): unknown;
}

export const MyMixin = <T extends Constructor<LitElement>>(
    superClass: T,
) => {
    class MyMixinClass extends superClass {
        @property() highlight = false;
        protected renderHighlight() {
            /* ... */
        }
    }
    // Cast return type to your mixin's interface intersected with the superClass type
    return MyMixinClass as Constructor<MyMixinInterface> &
        T;
};
```

### Применение декораторов в миксинах

Из-за ограничений системы типов TypeScript декораторы (такие как `@property()`) должны применяться к объявлению класса, а не к выражению класса.

На практике это означает, что миксины в TypeScript должны объявлять класс и затем возвращать его, а не возвращать выражение класса непосредственно из функции-стрелки.

Поддерживается:

```ts
export const MyMixin = <T extends LitElementConstructor>(
    superClass: T,
) => {
    // ✅ Defining a class in a function body, and then returning it
    class MyMixinClass extends superClass {
        @property()
        mode = 'on';
        /* ... */
    }
    return MyMixinClass;
};
```

Не поддерживается:

```ts
export const MyMixin = <T extends LitElementConstructor>(
    superClass: T,
) =>
    // ❌ Returning class expression directly using arrow-function shorthand
    class extends superClass {
        @property()
        mode = 'on';
        /* ... */
    };
```
