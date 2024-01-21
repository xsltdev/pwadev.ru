---
description: Локализация - это процесс поддержки нескольких языков и регионов в ваших
приложениях и компонентах
---

# Локализация

Локализация - это процесс поддержки нескольких языков и регионов в ваших приложениях и компонентах. В Lit есть сторонняя поддержка локализации с помощью библиотеки Библиотека `@lit/localize` имеет ряд преимуществ, которые могут сделать ее хорошим выбором по сравнению со сторонними библиотеками локализации:

-   Встроенная поддержка выражений и HTML-разметки внутри локализованных шаблонов. Нет необходимости в новом синтаксисе и интерполяционном времени выполнения для подстановки переменных - просто используйте уже имеющиеся шаблоны.
-   Автоматический повторный рендеринг компонентов Lit при смене локали.
-   Всего 1,27 килобайта (минифицированного + сжатого) дополнительного JavaScript.
-   Опционально компилируется для каждой локали, сокращая дополнительный JavaScript до 0 KiB.

## Установка

Установите клиентскую библиотеку `@lit/localize` и интерфейс командной строки `@lit/localize-tools`. интерфейс командной строки.

```sh
npm i @lit/localize
npm i -D @lit/localize-tools
```

## Быстрый старт

1.  Оберните строку или шаблон в функцию `msg` ([подробности](#making-strings-and-templates-localizable)).
2.  Создайте конфигурационный файл `lit-localize.json` ([details](#config-file)).
3.  Запустите `lit-localize extract` для создания XLIFF-файла ([подробности](#extracting-messages)).
4.  Отредактируйте сгенерированный XLIFF-файл, добавив в него тег перевода `<target>` ([details](#translation-with-xliff)).
5.  Запустите `lit-localize build` для вывода локализованной версии ваших строк и шаблонов ([details](#output-modes)).

## Создание локализуемых строк и шаблонов {#making-strings-and-templates-localizable}

Чтобы сделать строку или шаблон Lit локализуемыми, оберните их в функцию `msg`. Функция `msg` возвращает версию заданной строки или шаблона в той локали, которая активна в данный момент.

!!!info ""

    Пока у вас нет никаких переводов, `msg` просто возвращает исходную строку или шаблон, поэтому его можно использовать, даже если вы еще не готовы к локализации.

=== "TS"

    ```ts
    import { html, LitElement } from 'lit';
    import { customElement, property } from 'lit/decorators.js';
    import { msg } from '@lit/localize';

    @customElement('my-greeter')
    class MyGreeter extends LitElement {
    	@property()
    	who = 'World';

    	render() {
    		return msg(html`Hello <b>${this.who}</b>`);
    	}
    }
    ```

=== "JS"

    ```js
    import { html, LitElement } from 'lit';
    import { msg } from '@lit/localize';

    class MyGreeter extends LitElement {
    	static properties = {
    		who: {},
    	};

    	constructor() {
    		super();
    		this.who = 'World';
    	}

    	render() {
    		return msg(html`Hello <b>${this.who}</b>`);
    	}
    }
    customElements.define('my-greeter', MyGreeter);
    ```

### Типы сообщений {#message-types}

Любая строка или шаблон, которые вы обычно отображаете с помощью Lit, может быть локализована, включая те, которые содержат динамические выражения и HTML-разметку.

Обычная строка:

```js
msg('Hello World');
```

Обычная строка с выражением (подробнее о `str` см. в [строки с выражениями](#strings-with-expressions)):

```js
msg(str`Hello ${name}`);
```

HTML-шаблон:

```js
msg(html`Hello <b>World</b>`);
```

HTML-шаблон с выражением:

```js
msg(html`Hello <b>${name}</b>`);
```

Локализованные сообщения также могут быть вложены в HTML-шаблоны:

```js
html`<button>${msg('Hello World')}</button>`;
```

### Строки с выражениями {#strings-with-expressions}

Строки, содержащие выражение, должны быть помечены либо `html`, либо `str`, чтобы быть локализуемыми. Вы должны предпочесть `str`, а не `html`, если ваша строка не содержит никакой HTML-разметки, потому что она имеет немного меньше накладных расходов на производительность. При выполнении команды `lit-localize` будет выдана ошибка, если вы забудете тег `html` или `str` для строки с выражением.

Неверно:

```js
import { msg } from '@lit/localize';
msg(`Hello ${name}`);
```

Правильно:

```js
import { msg, str } from '@lit/localize';
msg(str`Hello ${name}`);
```

Тег `str` необходим в этих случаях, потому что не помеченные литералы шаблонных строк оцениваются до обычных строк, прежде чем они будут получены функцией `msg`, что означает, что значения динамических выражений не могут быть иначе захвачены и подставлены в локализованные версии строк.

## Коды локалей

Код локали - это строка, идентифицирующая человеческий язык, а иногда также включающая регион, сценарий или другие вариации.

Lit Localize не предписывает использовать какую-либо определенную систему кодов локалей, хотя настоятельно рекомендуется использовать стандарт [BCP 47 language tag standard](https://www.w3.org/International/articles/language-tags/index.en). Примерами языковых тегов BCP 47 являются:

-   `en`: Английский
-   `es-419`: испанский язык, на котором говорят в Латинской Америке
-   `zh-Hans`: китайский язык, написанный упрощенным шрифтом

### Термины

В Lit Localize есть несколько терминов, относящихся к кодам локалей. Эти термины используются в данной документации, в файле конфигурации Lit Localize и в Lit Localize API:

| Название | Описание |
| --- | --- |
| Source locale | Локаль, которая используется для написания строк и шаблонов в вашем исходном коде. |
| Target locales | Локализации, в которые могут быть переведены ваши строки и шаблоны. |
| Active locale | Глобальная локаль, которая отображается в данный момент. |

## Режимы вывода {#output-modes}

Lit Localize поддерживает два режима вывода:

-   Режим _Runtime_ использует API Lit Localize для загрузки локализованных сообщений во время выполнения.
-   Режим _Transform_ позволяет обойтись без кода Lit Localize во время выполнения, создавая отдельный пакет JavaScript для каждой локали.

!!!info "Не знаете, какой режим использовать?"

    Начните с режима выполнения. Позже можно будет легко переключить режим, поскольку основной API `msg` идентичен.

### Режим выполнения

В режиме выполнения для каждой локали генерируется один модуль JavaScript или TypeScript. Каждый модуль содержит локализованные шаблоны для этой локали. Когда активная локаль переключается, модуль для этой локали импортируется, и все локализованные компоненты перерисовываются.

Режим выполнения делает переключение локалей очень быстрым, поскольку перезагрузка страницы не требуется. Однако по сравнению с режимом преобразования это несколько снижает производительность рендеринга.

Пример сгенерированного вывода:

```js
// locales/es-419.ts
export const templates = {
    hf71d669027554f48: html`Hola <b>Mundo</b>`,
};
```

Все подробности о режиме выполнения см. на странице [Режим выполнения](runtime-mode.md).

### Режим преобразования

В режиме преобразования для каждой локали создается отдельная папка. Каждая папка содержит полную автономную сборку вашего приложения в этой локали, с полностью удаленными обертками `msg` и всем остальным кодом времени выполнения Lit Localize.

Режим трансформации требует 0 килобайт дополнительного JavaScript и очень быстро отрисовывается. Однако при смене локали требуется перезагрузить страницу, чтобы загрузить новый пакет JavaScript.

Пример сгенерированного вывода:

```js
// locales/en/my-element.js
render() {
  return html`Hello <b>World</b>`;
}
```

---

```js
// locales/es-419/my-element.js
render() {
  return html`Hola <b>Mundo</b>`;
}
```

Подробную информацию о режиме трансформации см. на странице [Режим преобразования](transform-mode.md).

### Различия

<table>
<thead>
<tr>
  <th></th>
  <th>Режим выполнения</th>
  <th>Режим преобразования</th>
</tr>
</thead>

<tbody>
<tr>
  <td>Вывод</td>
  <td>Динамически загружаемый модуль для каждой целевой локали.</td>
  <td>Отдельная сборка приложения для каждой локали.</td>
</tr>

<tr>
  <td>Переключение локалей</td>
  <td>Вызов <code>setLocale()</code></td>
  <td>Перезагрузка страницы</td>
</tr>

<tr>
  <td>JS bytes</td>
  <td>1.27 KiB (minified + compressed)</td>
  <td>0 KiB</td>
</tr>

<tr>
  <td>Сделать шаблон локализируемым</td>
  <td><code>msg()</code></td>
  <td><code>msg()</code></td>
</tr>

<tr>
  <td>Настройка</td>
  <td><code>configureLocalization()</code></td>
  <td><code>configureTransformLocalization()</code></td>
</tr>

<tr>
  <td>Преимущества</td>
  <td>
    <ul>
      <li>Более быстрое переключение локалей.</li>
      <li>Меньше <em>маргинальных</em> байтов при переключении локали.</li>
    </ul>
  </td>
  <td>
    <ul>
      <li>Более быстрый рендеринг.</li>
      <li>Меньше байтов для одной локали.</li>
    </ul>
  </td>
</tr>
</tbody>
</table>

## Конфигурационный файл {#config-file}

Инструмент командной строки `lit-localize` ищет файл конфигурации `lit-localize.json` в текущем каталоге. Скопируйте и вставьте приведенный ниже пример для быстрого начала работы, а полный список всех опций смотрите на странице [CLI и config](cli-and-config.md).

!!!info ""

    Если вы пишете JavaScript, установите свойство `inputFiles` в местоположение исходных файлов `.js`. Если вы пишете на TypeScript, установите свойство `tsConfig` в местоположение файла `tsconfig.json`, а `inputFiles` оставьте пустым.

=== "TS"

    ```ts
    {
    "$schema": "https://raw.githubusercontent.com/lit/lit/main/packages/localize-tools/config.schema.json",
    "sourceLocale": "en",
    "targetLocales": ["es-419", "zh-Hans"],
    "tsConfig": "./tsconfig.json",
    "output": {
    	"mode": "runtime",
    	"outputDir": "./src/generated/locales"
    },
    "interchange": {
    	"format": "xliff",
    	"xliffDir": "./xliff/"
    }
    }
    ```

=== "JS"

    ```js
    {
    "$schema": "https://raw.githubusercontent.com/lit/lit/main/packages/localize-tools/config.schema.json",
    "sourceLocale": "en",
    "targetLocales": ["es-419", "zh-Hans"],
    "inputFiles": [
    	"src/**/*.js"
    ],
    "output": {
    	"mode": "runtime",
    	"outputDir": "./src/generated/locales"
    },
    "interchange": {
    	"format": "xliff",
    	"xliffDir": "./xliff/"
    }
    }
    ```

## Извлечение сообщений {#extracting-messages}

Выполните команду `lit-localize extract`, чтобы сгенерировать файл [XLIFF](https://docs.oasis-open.org/xliff/v1.2/os/xliff-core.html) для каждой целевой локали. XLIFF - это XML-формат, поддерживаемый большинством инструментов и сервисов локализации. Файлы XLIFF будут записаны в каталог, указанный опцией `interchange.xliffDir` [config](cli-and-config.md#xliff-mode-settings).

```sh
lit-localize extract
```

Например, с учетом источника:

```js
msg('Hello World');
msg(str`Hello ${name}`);
msg(html`Hello <b>World</b>`);
```

Затем для каждой целевой локали будет сгенерирован файл `<xliffDir>/<locale>.xlf`:

```xml
<!-- xliff/es-419.xlf -->

<trans-unit id="s3d58dee72d4e0c27">
  <source>Hello World</source>
</trans-unit>

<trans-unit id="saed7d3734ce7f09d">
  <source>Hello <x equiv-text="${name}"/></source>
</trans-unit>

<trans-unit id="hf71d669027554f48">
  <source>Hello <x equiv-text="&lt;b&gt;"/>World<x equiv-text="&lt;/b&gt;"/></source>
</trans-unit>
```

## Перевод с помощью XLIFF {#translation-with-xliff}

Файлы XLIFF можно редактировать вручную, но чаще всего они отправляются в стороннюю службу перевода, где их редактируют эксперты-лингвисты с помощью специализированных инструментов.

После загрузки XLIFF-файлов в выбранную службу перевода вы получите в ответ новые XLIFF-файлы. Новые XLIFF-файлы будут выглядеть так же, как и загруженные вами, но с тегами `<target>`, вставленными в каждый `<trans-unit>`.

Когда вы получите новые XLIFF-файлы перевода, сохраните их в настроенном каталоге `interchange.xliffDir`, заменяя оригинальные версии.

```xml
<!-- xliff/es-419.xlf -->

<trans-unit id="s3d58dee72d4e0c27">
  <source>Hello World</source>
  <target>Hola Mundo</target>
</trans-unit>

<trans-unit id="saed7d3734ce7f09d">
  <source>Hello <x equiv-text="${name}"/></source>
  <target>Hola <x equiv-text="${name}"/></target>
</trans-unit>

<trans-unit id="hf71d669027554f48">
  <source>Hello <x equiv-text="&lt;b&gt;"/>World<x equiv-text="&lt;/b&gt;"/></source>
  <target>Hola <x equiv-text="&lt;b&gt;"/>Mundo<x equiv-text="&lt;/b&gt;"/></target>
</trans-unit>
```

## Создание локализованных шаблонов

Используйте команду `lit-localize build`, чтобы включить переводы обратно в ваше приложение. Поведение этой команды зависит от настроенного вами [output mode](#output-modes).

```sh
lit-localize build
```

Подробнее о том, как работает сборка в каждом режиме, смотрите на страницах [runtime mode](runtime-mode.md) и [transform mode](transform-mode.md).

## Описания сообщений

Используйте опцию `desc` для функции `msg`, чтобы предоставить человекочитаемые описания для ваших строк и шаблонов. Эти описания показываются переводчикам большинством инструментов перевода, и их настоятельно рекомендуется использовать для объяснения и контекстуализации смысла сообщений.

```js
render() {
  return html`<button>
    ${msg("Launch", {
      desc: "Button that begins rocket launch sequence.",
    })}
  </button>`;
}
```

Описания представляются в файлах XLIFF с помощью элементов `<note>`.

```xml
<trans-unit id="s512957aa09384646">
  <source>Launch</source>
  <note>Button that begins rocket launch sequence.</note>
</trans-unit>
```

## Идентификаторы сообщений

Lit Localize автоматически генерирует идентификатор для каждого вызова `msg`, используя хэш строки.

Если два вызова `msg` имеют одинаковый идентификатор, то они рассматриваются как одно и то же сообщение, то есть будут переведены как единое целое, и в обоих местах будут подставлены одинаковые переводы.

Например, эти два вызова `msg` находятся в двух разных файлах, но поскольку они имеют одинаковое содержание, они будут рассматриваться как одно сообщение:

```js
// file1.js
msg('Hello World');

// file2.js
msg('Hello World');
```

### Генерация идентификаторов

Следующее содержимое влияет на генерацию идентификатора:

-   Строковое содержимое
-   HTML-разметка
-   Положение выражений
-   Отмечена ли строка тегом `html`.

Следующее содержимое **не** влияет на генерацию идентификаторов:

-   Код внутри выражения
-   Вычисленное значение выражения
-   Описания
-   Расположение файла

Например, все эти сообщения имеют один и тот же идентификатор:

```js
msg(html`Hello <b>${name}</b>`);
msg(html`Hello <b>${this.name}</b>`);
msg(html`Hello <b>${this.name}</b>`, {
    desc: 'A friendly greeting',
});
```

Но это сообщение имеет другой идентификатор:

```js
msg(html`Hello <i>${name}</i>`);
```

### Переопределение идентификаторов

Идентификаторы сообщений можно переопределить, указав опцию `id` в функции `msg`. В некоторых случаях это может быть необходимо, например, когда одинаковая строка имеет несколько значений, поскольку на другом языке каждое из них может быть написано по-разному:

```js
msg('Buffalo', { id: 'buffalo-animal-singular' });
msg('Buffalo', { id: 'buffalo-animal-plural' });
msg('Buffalo', { id: 'buffalo-city' });
msg('Buffalo', { id: 'buffalo-verb' });
```
