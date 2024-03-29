---
description: Прогрессивное веб-приложение — это веб-сайт, все ресурсы которого такие же, как и в Интернете, но с новыми инструментами, позволяющими быстро загружать эти ресурсы в режиме онлайн и делать их доступными в режиме офлайн.
icon: material/cable-data
---

# Ресурсы и данные

<big>Прогрессивное веб-приложение — это веб-сайт, все ресурсы которого такие же, как и в Интернете, но с новыми инструментами, позволяющими быстро загружать эти ресурсы в режиме онлайн и делать их доступными в режиме офлайн.</big>

## Компоненты приложения

При разработке приложения обычно используется несколько активов и ресурсов: от логики и кода (скомпилированного или нет) до элементов пользовательского интерфейса, таких как дизайн экрана, изображения, логотипы и шрифты.

Прогрессивное веб-приложение — это веб-сайт, поэтому все его ресурсы такие же, как и в Интернете:

-   HTML для содержимого и первоначального рендеринга страницы.
-   JavaScript для логики, включая возможность запуска модулей WebAssembly (скомпилированный код) и рендеринга 2D- и 3D-графики, оптимизированной для аппаратного обеспечения.
-   CSS для верстки, стилизации и анимации.
-   Изображения в веб-форматах, таких как PNG, JPEG, WebP и SVG.
-   Видео в веб-форматах, таких как MPEG-4 и WebM.
-   Веб-шрифты.
-   Данные в формате JSON или других форматах.

По умолчанию веб-сайты загружают ресурсы по сети, [начиная с HTML](https://web.dev/articles/critical-rendering-path) и заканчивая остальными ресурсами.

Управление этими ресурсами, чтобы они быстро загружались и были доступны в автономном режиме, было сложной задачей для Интернета. В настоящее время PWA используют возможности, которые раньше ассоциировались только с приложениями для конкретных платформ.

### Платформоспецифичные приложения против PWA

При установке приложения для конкретной платформы обычно загружается пакет, включающий все ресурсы приложения: код, изображения, шрифты, видео и т.д. Таким образом, все эти ресурсы доступны из хранилища вашего устройства, даже когда приложение находится в автономном режиме.

С другой стороны, классический веб-сайт требует подключения к сети для загрузки ресурсов в случае необходимости. Если вы находитесь в автономном режиме, браузер выдаст ошибку, поскольку на стороне клиента нет никаких ресурсов.

Подход PWA расширяет возможности традиционного веб-сайта, делая некоторые или все активы доступными на стороне клиента, как в приложениях для конкретной платформы. Поэтому, когда вы открываете PWA, начальный рендеринг может быть таким же мгновенным, как и в платформенном приложении, поскольку активы доступны без обращения к сети.

!!!note ""

    Приложение, доступное в автономном режиме, всегда будет отображать базовый пользовательский интерфейс, а не техническую ошибку операционной системы или браузера. Некоторые приложения по-прежнему предлагают весь свой функционал, некоторые — ограниченный, а другие — простое сообщение с брендингом приложения. Это относится как к приложениям для конкретных платформ, так и к PWA.

## Кэши и хранение

С момента появления Интернета разработчики не имели полного контроля над тем, как кэшируется тот или иной ресурс. За кэш HTTP отвечает браузер, который может кэшировать и обслуживать ресурсы в соответствии с различными политиками, а может и не кэшировать. Другие варианты хранения, такие как Web Storage и IndexedDB, предназначались для сохранения простых данных и объектов.

PWA не нужно полагаться только на эти политики для хранения своего содержимого. Вместо этого сегодня у нас есть решения, позволяющие лучше контролировать, когда и как кэшировать ресурсы и когда и как доставлять их локально: Cache Storage API. В Интернете существует несколько решений для хранения данных на стороне клиента:

-   **Веб-хранилище**: Включает в себя `localStorage` и `sessionStorage`. Эти API хранят простые пары строк ключ/значение. Веб-хранилище имеет ограниченные возможности и синхронный API, поэтому по возможности его следует избегать.
-   **IndexedDB**: Объектно-ориентированная база данных (No-SQL) с асинхронным API, которая хорошо подходит для работы в Интернете. IndexedDB может хранить структурированные и двоичные данные на стороне клиента. Как правило, она используется для хранения данных, например, полученных или отправленных в виде API-запроса. Также полезно сохранять данные локально, а затем синхронизировать их с сервером. Для взаимодействия с базой данных используется [IndexedDB API](https://developer.mozilla.org/docs/Web/API/IndexedDB_API).
-   **Хранилище кэша**: Коллекция пар HTTP-запросов и ответов, которые можно использовать для хранения и извлечения ресурсов — с их HTTP-заголовками — точно в том виде, в котором они были доставлены с сервера. API [Cache Storage API](https://developer.mozilla.org/docs/Web/API/CacheStorage) позволяет хранить, извлекать, обновлять и удалять сетевые запросы, например, для ваших активов, даже в автономном режиме.

!!!warning ""

    Возможно, вы слышали о WebSQL и ApplicationCache. Эти два решения устарели, и их не следует использовать в PWA.

### Необходимость в рабочих службах

PWA может хранить свои активы в Cache Storage и IndexedDB, но как использовать эти активы для обеспечения быстрого и автономного взаимодействия с пользователями. Ответ. Рабочие службы.

С помощью рабочих служб можно обслуживать активы, не обращаясь к сети, отправлять уведомления пользователям, добавлять значок к значку PWA, обновлять содержимое в фоновом режиме и даже заставить весь PWA работать в автономном режиме. Подробнее о рабочих службах читайте в [следующей главе](service-workers.md).

## Готовность к работе в автономном режиме

Пользователи ожидают, что ваше приложение будет работать быстро и всегда готово к работе. Это означает, что приложение должно работать в автономном режиме.

Возможность работы в автономном режиме не означает, что весь ваш контент или сервисы должны быть доступны без подключения к сети. Однако наличие хотя бы базовых возможностей работы в автономном режиме, например, страницы с запросом на подключение к Интернету для продолжения работы, обеспечит лучший пользовательский опыт, удерживая пользователя в рамках опыта работы с вашим приложением вместо общей ошибки браузера. В некоторых браузерах эта функция является обязательной для прохождения критериев установки PWA. Отображение пользовательского интерфейса PWA вместе с кэшированным содержимым лучше. Позволить пользователям продолжать использовать весь PWA и синхронизировать изменения на сервере, когда они возвращаются в сеть, — это золотой стандарт работы в автономном режиме.

Чтобы сделать приложение доступным в автономном режиме, необходимо кэшировать активы, необходимые для работы в автономном режиме, и заставить сервисный работник обслуживать их позже. Обязательно добавляйте автономные активы в кэш до того, как они понадобятся. В данном случае речь идет о конкретном случае, когда их нельзя кэшировать при запросе.

!!!note ""

    Кэширование активов происходит независимо от установки PWA и работает даже во вкладке браузера, обеспечивая более быструю доставку активов и работу в автономном режиме независимо от того, как пользователь решил использовать ваш PWA.

### Часто используемые подходы к кэшированию

В своем PWA вы сами принимаете все решения. Вы можете выбрать наилучший подход к кэшированию или установке активов, исходя из своих потребностей. Вот некоторые решения, которые необходимо принять:

-   Предварительное кэширование: выберите активы, которые вы хотите установить при первой загрузке; они должны включать HTML и минимальные активы для рендеринга приложения. При использовании прекэширования не забывайте, что вы используете пространство устройства и сеть. Будьте сознательны и ответственны при загрузке активов и их кэшировании.
-   Cache as needed: используется для добавления активов в кэш при поступлении запроса. Обычно это активы, которые могут изменяться независимо от версии приложения, например изображения или контент. Различные стратегии кэширования по мере необходимости описаны в разделе [caching](caching.md).
-   API и веб-службы: Вызовы API можно кэшировать, а вместо кэширования ответов API можно хранить их данные в IndexedDB.

!!!tip ""

    Для приложений, ориентированных на конкретную платформу, наиболее распространенной схемой является включение всех активов приложения в его пакет; именно поэтому размер таких приложений обычно превышает 500 МБ. С другой стороны, PWA может изначально установить только минимальный набор ресурсов для обеспечения автономной и быстрой работы, а остальное загрузить позже, при этом PWA используют значительно меньше памяти при установке.

### Обновление ресурсов

В стандартной модели приложений для установленных в каталоге приложений, когда разработчикам необходимо обновить свое приложение, они публикуют новый пакет. Пользователям приходится заново загружать весь пакет, даже если большинство ресурсов остались неизменными. В PWA, используя подходы, описанные в разделе выше, вы сами решаете, как и когда обновлять ресурсы. Ниже приведены различные варианты обновления ресурсов: "Полное обновление":

-   Полное обновление: в этом случае при каждом, даже незначительном, изменении в приложении ваш код будет заново загружать все ресурсы в кэш.
-   Частичное обновление: в этом случае создается метод, определяющий, какие ресурсы были обновлены, и обновляются только они, с вмешательством или без вмешательства пользователя.
-   Непрерывное обновление: при использовании этого метода ресурсы будут проверяться и обновляться автоматически при каждом использовании PWA в отдельности.

!!!note ""

    При кэшировании ресурсов необходимо определить политику замены или очистки кэша, которая определяет, когда пользователь увидит обновленный ресурс; при этом учитывается использование памяти и баланс между быстрой работой и отображением немного устаревшего ресурса.

## Размер и продолжительность жизни

Обычно приложения для конкретных платформ не имеют ограничений по размеру; при установке размер приложений может составлять гигабайты и более. Пока устройство имеет достаточный объем памяти, установка будет разрешена. Кроме того, пока приложение установлено, оно будет использовать весь объем памяти независимо от того, используете вы его или нет. В случае PWA хранение данных осуществляется по-другому. Браузер будет хранить ваши ресурсы в соответствии с политиками, которые вы определите в логике PWA.

!!!note ""

    Пользователи всегда контролируют ситуацию и могут удалить активы в любой момент. Для PWA ручное удаление происходит через настройки браузера.

Ограничения по размеру зависят от браузера. Они не такие гибкие, как для приложений, ориентированных на конкретную платформу, но обычно их достаточно для большинства веб-приложений. Конкретные ограничения для каждого браузера можно найти в [этой статье](https://web.dev/articles/storage-for-the-web#how-much).

Если пользователь использует PWA в браузере, браузеры могут удалять активы, основываясь на нагрузке на хранилище, или после нескольких недель бездействия. На некоторых платформах, если пользователь установит ваш PWA, выселение не произойдет. Там, где это возможно, код может запрашивать постоянное хранилище через API, чтобы избежать такого вытеснения.

!!!note ""

    Если по какой-либо причине произойдет вытеснение хранилища, а пользователь установил ваш PWA, то при наличии сетевого подключения он будет продолжать работать. Когда вы снова откроете это приложение, браузер снова запустит жизненный цикл Service Worker, загрузив ваше приложение из сети.

## Ресурсы

-   [Хранилище в Интернете](https://web.dev/articles/storage-for-the-web)
-   [MDN: Веб-хранилище](https://developer.mozilla.org/docs/Web/API/Web_Storage_API)
-   [MDN: IndexedDB](https://developer.mozilla.org/docs/Web/API/IndexedDB_API)

:material-information-outline: Источник &mdash; [Assets and data](https://web.dev/learn/pwa/assets-and-data)
