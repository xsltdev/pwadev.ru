---
description: Lit Labs — пакеты Lit в разработке, по которым авторы собирают отзывы
---

# Lit Labs

Lit Labs объединяет пакеты Lit, которые ещё разрабатываются и по которым авторы активно собирают отзывы. Их можно использовать в реальных проектах, чтобы этот процесс шёл быстрее, но учтите следующее:

-   Проекты Lit Labs публикуются в области npm `@lit-labs`.
-   Ломающие изменения вероятнее, чем у пакетов вне Labs, но они следуют семантическому версионированию, а все изменения попадают в CHANGELOG.
-   Ошибки стараются исправлять вовремя, но ошибки пакетов вне Labs обычно важнее ошибок пакетов Labs.
-   Когда проект готов выйти из Labs, его начинают публиковать в области `@lit`. Например, `@lit-labs/task` стал `@lit/task`. Первая версия в `@lit` совпадает с последней версией в `@lit-labs`, а дальнейшие обновления получает только версия `@lit`.
-   Проект Lit Labs могут признать устаревшим. Об этом сообщают сообществу, а в пакет npm добавляют предупреждение об устаревании. Исправления ошибок для такого пакета выходят ещё как минимум 6 месяцев. Список исторических пакетов Labs остаётся на этой странице.

Сейчас отзывы собирают по следующим пакетам.

## Близки к выпуску из Labs

| Пакет | Описание | Ссылки |
| --- | --- | --- |
| [scoped-registry-mixin](https://www.npmjs.com/package/@lit-labs/scoped-registry-mixin) | Миксин для Lit, который работает с экспериментальным [полифилом Scoped CustomElementRegistry](https://github.com/webcomponents/polyfills/tree/master/packages/scoped-custom-element-registry). | [Документация](https://github.com/lit/lit/tree/main/packages/labs/scoped-registry-mixin#readme) · [Отзывы](https://github.com/lit/lit/discussions/3364) · [Ошибки](https://github.com/lit/lit/issues?q=is%3Aissue+is%3Aopen+in%3Atitle+%5Blabs%2Fscoped-registry-mixin%5D) |

## В разработке

| Пакет | Описание | Ссылки |
| --- | --- | --- |
| [eleventy-plugin-lit](https://www.npmjs.com/package/@lit-labs/eleventy-plugin-lit) | Плагин для [Eleventy](https://www.11ty.dev), который на этапе сборки заранее отрисовывает компоненты Lit и при необходимости гидрирует их. | [Документация](https://github.com/lit/lit/tree/main/packages/labs/eleventy-plugin-lit#readme) · [Отзывы](https://github.com/lit/lit/discussions/3356) · [Ошибки](https://github.com/lit/lit/issues?q=is%3Aissue+is%3Aopen+in%3Atitle+%5Blabs%2Feleventy-plugin-lit%5D) |
| [motion](https://www.npmjs.com/package/@lit-labs/motion) | Помощники анимации для шаблонов Lit. | [Документация](https://github.com/lit/lit/tree/main/packages/labs/motion#readme) · [Отзывы](https://github.com/lit/lit/discussions/3351) · [Ошибки](https://github.com/lit/lit/issues?q=is%3Aissue+is%3Aopen+in%3Atitle+%5Blabs%2Fmotion%5D) |
| [observers](https://www.npmjs.com/package/@lit-labs/observers) | Реактивные контроллеры для объектов-наблюдателей платформы. | [Документация](https://github.com/lit/lit/tree/main/packages/labs/observers#readme) · [Отзывы](https://github.com/lit/lit/discussions/3355) · [Ошибки](https://github.com/lit/lit/issues?q=is%3Aissue+is%3Aopen+in%3Atitle+%5Blabs%2Fobservers%5D) |
| [signals](https://www.npmjs.com/package/@lit-labs/signals) | Интеграция Lit с полифилом предложения сигналов TC39. | [Документация](../data/signals.md) · [Отзывы](https://github.com/lit/lit/discussions/4779) · [Ошибки](https://github.com/lit/lit/issues?q=is%3Aissue+is%3Aopen+in%3Atitle+%5Blabs%2Fsignals%5D) |
| [ssr](https://www.npmjs.com/package/@lit-labs/ssr) | Серверный рендеринг шаблонов и компонентов Lit. | [Документация](../ssr/overview.md) · [Отзывы](https://github.com/lit/lit/discussions/3353) · [Ошибки](https://github.com/lit/lit/issues?q=is%3Aissue+is%3Aopen+in%3Atitle+%5Blabs%2Fssr%5D) |
| [testing](https://www.npmjs.com/package/@lit-labs/testing) | Утилиты тестирования Lit, в том числе фикстуры, отрисованные на сервере. | [Документация](https://github.com/lit/lit/tree/main/packages/labs/testing#readme) · [Отзывы](https://github.com/lit/lit/discussions/3359) · [Ошибки](https://github.com/lit/lit/issues?q=is%3Aissue+is%3Aopen+in%3Atitle+%5Blabs%2Ftesting%5D) |
| [virtualizer](https://www.npmjs.com/package/@lit-labs/virtualizer) | Виртуализация по видимой области, включая виртуальный скроллинг. | [Документация](https://github.com/lit/lit/tree/main/packages/labs/virtualizer#readme) · [Отзывы](https://github.com/lit/lit/discussions/3362) · [Ошибки](https://github.com/lit/lit/issues?q=is%3Aissue+is%3Aopen+in%3Atitle+%5Blabs%2Fvirtualizer%5D) |

## Прототипы

| Пакет | Описание | Ссылки |
| --- | --- | --- |
| [analyzer](https://www.npmjs.com/package/@lit-labs/analyzer) | Статический анализатор Lit. | [Документация](https://github.com/lit/lit/tree/main/packages/labs/analyzer#readme) · [Ошибки](https://github.com/lit/lit/issues?q=is%3Aissue+is%3Aopen+in%3Atitle+%5Blabs%2Fanalyzer%5D) |
| [cli](https://www.npmjs.com/package/@lit-labs/cli) | Утилита командной строки для Lit. | [Документация](https://github.com/lit/lit/tree/main/packages/labs/cli#readme) · [Ошибки](https://github.com/lit/lit/issues?q=is%3Aissue+is%3Aopen+in%3Atitle+%5Blabs%2Fcli%5D) |
| [compiler](https://www.npmjs.com/package/@lit-labs/compiler) | Компилятор, который оптимизирует шаблоны Lit. | [Документация](https://github.com/lit/lit/tree/main/packages/labs/compiler#readme) · [Отзывы](https://github.com/lit/lit/discussions/4117) · [Ошибки](https://github.com/lit/lit/issues?q=is%3Aissue+is%3Aopen+in%3Atitle+%5Blabs%2Fcompiler%5D) |
| [preact-signals](https://www.npmjs.com/package/@lit-labs/preact-signals) | Интеграция сигналов Preact с Lit. | [Документация](https://github.com/lit/lit/tree/main/packages/labs/preact-signals#readme) · [Отзывы](https://github.com/lit/lit/discussions/4115) · [Ошибки](https://github.com/lit/lit/issues?q=is%3Aissue+is%3Aopen+in%3Atitle+%5Blabs%2Fpreact-signals%5D) |
| [router](https://www.npmjs.com/package/@lit-labs/router) | Компонентный роутер в виде реактивных контроллеров. | [Документация](https://github.com/lit/lit/tree/main/packages/labs/router#readme) · [Отзывы](https://github.com/lit/lit/discussions/3354) · [Ошибки](https://github.com/lit/lit/issues?q=is%3Aissue+is%3Aopen+in%3Atitle+%5Blabs%2Frouter%5D) |
