---
description: Стартовые наборы Lit - это шаблоны проектов для многократно используемых компонентов Lit, которые можно опубликовать для использования другими пользователями
---

# Стартовые комплекты

Стартовые наборы Lit - это шаблоны проектов для многократно используемых компонентов Lit, которые можно опубликовать для использования другими пользователями.

Чтобы начать работу над компонентом локально, вы можете использовать один из этих стартовых проектов:

-   [Lit JavaScript starter project](https://github.com/lit/lit-element-starter-js)
-   [Lit TypeScript starter project](https://github.com/lit/lit-element-starter-ts)

Оба проекта определяют компонент Lit. Они также добавляют набор дополнительных инструментов для разработки, линтинга и тестирования компонента:

-   Node.js и npm для управления зависимостями. Требуется Node.js 10 или выше.
-   Локальный сервер разработки, [Web Dev Server](https://modern-web.dev/docs/dev-server/overview/).
-   Линтинг с помощью [ESLint](https://eslint.org/) и [lit-analyzer](https://www.npmjs.com/package/lit-analyzer).
-   Тестирование с помощью [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/).
-   Статический doc-сайт, созданный с помощью [web-component-analyzer](https://www.npmjs.com/package/web-component-analyzer) и [eleventy](https://www.11ty.dev/).

Ни один из этих инструментов не является _обязательным_ для работы с Lit. Они представляют собой один из возможных наборов инструментов для хорошего опыта разработчика.

<div class="alert alert-info">

!!!alert "Альтернативная точка старта"

    В качестве альтернативы официальным стартовым проектам Lit в проекте Open WC есть [генератор проектов](https://open-wc.org/docs/development/generator/) для веб-компонентов, использующих Lit. Скрипт Open WC задает ряд вопросов и создает для вас проект.

## Скачайте стартовый проект

Самый быстрый способ опробовать проект на месте - загрузить один из стартовых проектов в виде zip-файла.

1.  Загрузите стартовый проект с GitHub в виде zip-файла:

    -   [JavaScript starter project](https://github.com/lit/lit-element-starter-js/archive/main.zip)
    -   [TypeScript starter project](https://github.com/lit/lit-element-starter-ts/archive/main.zip)

2.  Распакуйте zip-файл.

3.  Установите зависимости.

    ```bash
    cd <project folder>
    npm i
    ```

!!!alert "Хотите, чтобы он был на GitHub?"

    Если вы знакомы с git, вы можете захотеть создать репозиторий GitHub для вашего стартового проекта, вместо того чтобы просто загрузить zip-файл. Вы можете воспользоваться функцией [GitHub template repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template), чтобы создать свой собственный репозиторий из [JavaScript starter project](https://github.com/PolymerLabs/lit-element-starter-js) или [TypeScript starter project](https://github.com/PolymerLabs/lit-element-starter-ts). Затем клонируйте новый репозиторий и установите зависимости, как описано выше.

## Попробуйте свой проект

1.  **Если вы используете TypeScript-версию стартера**, создайте JavaScript-версию вашего проекта:

    ```bash
    npm run build
    ```

    Чтобы следить за файлами и перестраивать их при изменении, выполните следующую команду в отдельной оболочке:

    ```bash
    npm run build:watch
    ```

    **Если вы используете JavaScript-версию стартового проекта, сборка не требуется.**

2.  Запустите сервер разработки:

    ```bash
    npm run serve
    ```

3.  Откройте демонстрационную страницу проекта на вкладке браузера. Например:

    [http://localhost:8000/dev/](http://localhost:8000/dev/)

    Ваш сервер может использовать другой номер порта. Проверьте URL-адрес в выводе терминала на предмет правильного номера порта.

## Отредактируйте свой компонент

Отредактируйте определение вашего компонента. Файл, который вы редактируете, зависит от того, какой язык вы используете:

-   JavaScript. Отредактируйте файл `my-element.js` в корне проекта.
-   TypeScript. Отредактируйте файл `my-element.ts` в директории `src`.

Несколько моментов, на которые следует обратить внимание в коде:

-   Код определяет класс для компонента (`MyElement`) и регистрирует его в браузере как пользовательский элемент с именем `<my-element>`.

    === "TS"

        ```ts
        @customElement('my-element')
        export class MyElement extends LitElement {
        	/* ... */
        }
        ```

    === "JS"

        ```js
        export class MyElement extends LitElement {
        	/* ... */
        }

        customElements.define('my-element', MyElement);
        ```

-   Метод `render` компонента определяет [шаблон](../templates/overview.md), который будет отображаться как часть компонента. В данном случае он включает в себя текст, некоторые привязки данных и кнопку. Для получения дополнительной информации см. раздел [Шаблоны](../templates/overview.md).

    ```js
    export class MyElement extends LitElement {
        // ...
        render() {
            return html`
                <h1>Hello, ${this.name}!</h1>
                <button @click=${this._onClick}>
                    Click Count: ${this.count}
                </button>
                <slot></slot>
            `;
        }
    }
    ```

-   Компонент определяет некоторые свойства. Компонент реагирует на изменения этих свойств (например, при необходимости перерисовывает шаблон). Для получения дополнительной информации см. раздел [Свойства](../components/properties.md).

    === "TS"

        ```ts
        export class MyElement extends LitElement {
        	// ...
        	@property({ type: String })
        	name = 'World';
        	//...
        }
        ```

    === "JS"

        ```js
        export class MyElement extends LitElement {
        	// ...
        	static properties = {
        		name: { type: String },
        	};

        	constructor() {
        		super();
        		this.name = 'World';
        	}
        	// ...
        }
        ```

## Переименуйте свой компонент

Вероятно, вам захочется изменить имя компонента с "my-element" на более подходящее. Это проще всего сделать с помощью IDE или другого текстового редактора, который позволяет выполнять глобальный поиск и замену по всему проекту.

1.  **Если вы используете версию TypeScript**, удалите сгенерированные файлы:

    ```bash
    npm run clean
    ```

2.  Найдите и замените "my-element" на имя вашего нового компонента во всех файлах проекта (кроме папки `node_modules`).
3.  Найдите и замените "MyElement" на имя вашего нового класса во всех файлах проекта (кроме папки `node_modules`).
4.  Переименуйте исходные и тестовые файлы в соответствии с новым именем компонента:

    JavaScript:

    -   `src/my-element.js`
    -   `src/test/my-element_test.js`

    TypeScript:

    -   `src/my-element.ts`
    -   `src/test/my-element_test.ts`

5.  **Если вы используете версию TypeScript**, пересоберите проект:

    ```bash
    npm run build
    ```

6.  Проверьте и убедитесь, что ваш компонент по-прежнему работает:

    ```bash
    npm run serve
    ```

## Следующие шаги

Готовы добавить функции в свой компонент? Загляните в раздел [Components](../components/overview.md), чтобы узнать о создании вашего первого компонента Lit, или в раздел [Templates](../templates/overview.md), чтобы узнать о написании шаблонов.

Подробную информацию о выполнении тестов и использовании других инструментов можно найти в README стартового проекта:

-   [TypeScript project README](https://github.com/PolymerLabs/lit-element-starter-ts/blob/master/README.md)
-   [JavaScript project README](https://github.com/PolymerLabs/lit-element-starter-js/blob/master/README.md)

Руководство по публикации компонента в `npm` см. в разделе [Publishing](./publishing.md).
