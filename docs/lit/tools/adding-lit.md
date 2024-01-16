---
description: Lit не требует специализированных инструментов, а компоненты Lit работают в любом JavaScript-фреймворке или с любой серверной шаблонной системой или CMS, поэтому Lit идеально подходит для добавления в существующие проекты и приложения
---

# Добавление Lit в существующий проект

Lit не требует специализированных инструментов, а компоненты Lit работают в любом JavaScript-фреймворке или с любой серверной шаблонной системой или CMS, поэтому Lit идеально подходит для добавления в существующие проекты и приложения.

## Установка из npm

Сначала установите пакет `lit` из npm:

```sh
npm i lit
```

Если вы еще не используете npm для управления зависимостями JavaScript, вам придется сначала настроить свой проект. Мы рекомендуем использовать [npm CLI](https://docs.npmjs.com/cli/v7/configuring-npm/install).

## Добавьте компонент

Вы можете создать новый элемент в любом месте исходных текстов вашего проекта:

=== "TS"

    ```ts
    import { LitElement, html } from 'lit';
    import { customElement } from 'lit/decorators.js';

    @customElement('my-element')
    class MyElement extends LitElement {
    	render() {
    		return html` <div>Hello from MyElement!</div> `;
    	}
    }
    ```

=== "JS"

    ```js
    import { LitElement, html } from 'lit';

    class MyElement extends LitElement {
    	render() {
    		return html` <div>Hello from MyElement!</div> `;
    	}
    }
    customElements.define('my-element', MyElement);
    ```

## Использование компонента

Как использовать компонент, зависит от вашего проекта и используемых в нем библиотек или фреймворков. Вы можете использовать свой компонент в HTML, с API DOM или в языках шаблонов:

### Обычный HTML

```html
<script type="module" src="/lib/components/my-elements.js">
<my-element></my-element>
```

### JSX

**JSX** - это очень распространенный язык шаблонов. В JSX имена элементов в нижнем регистре создают HTML-элементы, которыми и являются компоненты Lit. Используйте имя тега, которое вы указали в декораторе `@customElement()`:

```ts
import './components/my-elements.js';

export const App = () => (
  <h1>My App</h1>
  <my-element></my-element>
)
```

### Шаблоны фреймворков

Большинство фреймворков JavaScript имеют [отличную поддержку веб-компонентов](https://custom-elements-everywhere.com/) и Lit. Просто импортируйте определение элемента и используйте имена тегов элементов в своих шаблонах.

## Следующие шаги

На данном этапе вы должны быть в состоянии собрать и запустить свой проект и увидеть сообщение "Привет от MyElement!".

Если вы готовы добавить функции в свой компонент, перейдите в раздел [Components](../components/overview.md), чтобы узнать о создании вашего первого компонента Lit, или в раздел [Templates](../templates/overview.md), чтобы узнать подробности о написании шаблонов.

Подробности о сборке проектов, включая примеры конфигураций Rollup, смотрите в разделе [Building for production](./production.md).
