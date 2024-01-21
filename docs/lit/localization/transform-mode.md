---
description: В режиме преобразования Lit Localize для каждой локали создается отдельная папка. Каждая папка содержит полную автономную сборку вашего приложения в этой локали
---

# Режим локализации преобразования

В режиме преобразования Lit Localize для каждой локали создается отдельная папка. Каждая папка содержит полную автономную сборку вашего приложения в этой локали, с удаленным кодом `@lit/localize`:

-   Вызовы `msg` заменяются на статическую локализованную версию строки или шаблона в каждой локали.
-   Теги `str` удаляются.
-   Удалены импорты `@lit/localize`.
-   Шаблоны оптимизированы для удаления ненужных выражений путем складывания их в родительские шаблоны, где это возможно.

Например, для исходного текста:

```js
// src/launch-button.js
import {msg} from '@lit/localize';

render() {
  return html`<button>${msg('Launch rocket')}</button>`
}
```

Будут созданы следующие файлы:

```js
// locales/en/launch-button.js
render() {
  return html`<button>Launch rocket</button>`
}

// locales/es-419/launch-button.js
render() {
  return html`<button>Lanza cohete</button>`
}
```

## Настройка режима преобразования

В конфигурации `lit-localize.json` установите для свойства `mode` значение `transform`, а для свойства `output.outputDir` - место, где будут создаваться локализованные папки приложений. Дополнительные сведения см. в разделе [Настройки режима трансформации](cli-and-config.md#transform-mode-settings).

В проекте на JavaScript или TypeScript опционально вызовите `configureTransformLocalization`, передав объект со следующим свойством:

-   `sourceLocale: string`: Локаль, в которой пишутся исходные шаблоны. Указывается в виде кода локали (например, `"en"`).

`configureTransformLocalization` возвращает объект со следующим свойством:

-   `getLocale`: Функция, возвращающая код активной локали.

Например:

```js
import { configureTransformLocalization } from '@lit/localize';

export const { getLocale } = configureTransformLocalization(
    {
        sourceLocale: 'en',
    },
);
```

## Установка начальной локали

В режиме преобразования активная локаль определяется загружаемым пакетом JavaScript. Как определить, какой пакет загружать при загрузке страницы, зависит от вас.

Например, если локаль вашего приложения отражается в пути URL, вы можете включить в HTML-файл встроенный скрипт, который проверяет URL и вставляет соответствующий тег `<script>`:

!!!warning ""

    Всегда проверяйте коды локалей при динамическом выборе имени скрипта. Приведенный ниже пример безопасен, поскольку скрипт может быть загружен только в том случае, если он соответствует одному из известных нам кодов локали, но если бы наша логика подбора была менее точной, это могло бы привести к ошибкам или атакам, внедряющим небезопасный JavaScript.

```js
import { allLocales } from './generated/locales.js';

const url = new URL(window.location.href);
const unsafeLocale = url.searchParams.get('locale');
const locale = allLocales.includes(unsafeLocale)
    ? unsafeLocale
    : 'en';

const script = document.createElement('script');
script.type = 'module';
script.src = `/${locale}.js`;
document.head.appendChild(script);
```

Для повышения производительности вы можете статически отобразить соответствующий тег скрипта в HTML-файле на сервере. Это позволит браузеру начать загрузку вашего скрипта как можно раньше.

## Переключение локалей

В режиме преобразования функция `setLocale` недоступна. Вместо этого перезагрузите страницу так, чтобы при следующей загрузке был выбран другой набор локалей.

Например, этот пользовательский элемент `locale-picker` загружает новый URL при выборе новой локали из выпадающего списка:

=== "TS"

    ```ts
    import {LitElement, html} from 'lit';
    import {customElement} from 'lit/decorators.js';
    import {getLocale} from './localization.js';
    import {allLocales} from './generated/locales.js';

    @customElement('locale-picker');
    export class LocalePicker extends LitElement {
    	render() {
    		return html`
    		<select @change=${this.localeChanged}>
    			${allLocales.map(
    			(locale) =>
    				html`<option value=${locale} selected=${locale === getLocale()}>
    				${locale}
    				</option>`
    			)}
    		</select>
    		`;
    	}

    	localeChanged(event: Event) {
    		const newLocale = (event.target as HTMLSelectElement).value;
    		const url = new URL(window.location.href);
    		if (url.searchParams.get('locale') !== newLocale) {
    			url.searchParams.set('locale', newLocale);
    			window.location.assign(url.href);
    		}
    	}
    }
    ```

=== "JS"

    ```js
    import { LitElement, html } from 'lit';
    import { getLocale } from './localization.js';
    import { allLocales } from './generated/locales.js';

    export class LocalePicker extends LitElement {
    	render() {
    		return html`
    			<select @change=${this.localeChanged}>
    				${allLocales.map(
    					(locale) =>
    						html`<option
    							value=${locale}
    							selected=${locale ===
    							getLocale()}
    						>
    							${locale}
    						</option>`,
    				)}
    			</select>
    		`;
    	}

    	localeChanged(event) {
    		const newLocale = event.target.value;
    		const url = new URL(window.location.href);
    		if (url.searchParams.get('locale') !== newLocale) {
    			url.searchParams.set('locale', newLocale);
    			window.location.assign(url.href);
    		}
    	}
    }
    customElements.define('locale-picker', LocalePicker);
    ```

## Интеграция с Rollup

Если вы используете [Rollup](https://rollupjs.org/) и предпочитаете интегрированное решение вместо отдельного запуска команды `lit-localize build`, импортируйте функцию `localeTransformers` из `@lit/localize-tools/lib/rollup.js` в ваш конфиг Rollup.

Эта функция генерирует массив объектов `{locale, transformer}`, которые вы можете использовать в сочетании с опцией [`transformers`](https://github.com/rollup/plugins/tree/master/packages/typescript/#transformers) из [`@rollup/plugin-typescript`](https://www.npmjs.com/package/@rollup/plugin-typescript) для генерации отдельного пакета для каждой локали.

!!!info ""

    Если вы пишете на JavaScript, не беспокойтесь, что здесь используется компилятор TypeScript. Lit Localize зависит от компилятора TypeScript для разбора, анализа и преобразования вашего исходного кода, но он работает и с обычными JavaScript-файлами!

Следующий файл `rollup.config.mjs` генерирует минифицированный бандл для каждой из ваших локалей в директории `./bundled/<locale>/`:

=== "TS"

    ```ts
    import typescript from '@rollup/plugin-typescript';
    import { localeTransformers } from '@lit/localize-tools/lib/rollup.js';
    import resolve from '@rollup/plugin-node-resolve';
    import { terser } from 'rollup-plugin-terser';

    // Config is read from ./lit-localize.json by default.
    // Pass a path to read config from another location.
    const locales = localeTransformers();

    export default locales.map(
    	({ locale, localeTransformer }) => ({
    		input: `src/index.ts`,
    		plugins: [
    			typescript({
    				transformers: {
    					before: [localeTransformer],
    				},
    			}),
    			resolve(),
    			terser(),
    		],
    		output: {
    			file: `bundled/${locale}/index.js`,
    			format: 'es',
    		},
    	}),
    );
    ```

=== "JS"

    ```js
    import typescript from '@rollup/plugin-typescript';
    import resolve from '@rollup/plugin-node-resolve';
    import { terser } from 'rollup-plugin-terser';
    import summary from 'rollup-plugin-summary';
    import { localeTransformers } from '@lit/localize-tools/lib/rollup.js';

    // Config is read from ./lit-localize.json by default.
    // Pass a path to read config from another location.
    const locales = localeTransformers();

    export default locales.map(
    	({ locale, localeTransformer }) => ({
    		input: `src/index.js`,
    		plugins: [
    			typescript({
    				transformers: {
    					before: [localeTransformer],
    				},
    				// Specifies the ES version and module format to emit. See
    				// https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
    				tsconfig: 'jsconfig.json',
    				// Temporary directory where transformed modules will be emitted before
    				// Rollup bundles them.
    				outDir: 'bundled/temp',
    				// @rollup/plugin-typescript always matches only ".ts" files, regardless
    				// of any settings in our jsconfig.json.
    				include: ['src/**/*.js'],
    			}),
    			resolve(),
    			terser(),
    			summary({
    				showMinifiedSize: false,
    			}),
    		],
    		output: {
    			file: `bundled/${locale}/index.js`,
    			format: 'es',
    			sourcemap: true,
    		},
    	}),
    );
    ```
