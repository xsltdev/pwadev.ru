---
description: Если вы хотите создать прогрессивное веб-приложение, то, возможно, задаетесь вопросом, с чего начать, можно ли модернизировать сайт до PWA, не начиная с нуля, или как перейти от приложения для конкретной платформы к PWA. Данная статья поможет вам ответить на эти вопросы.
icon: material/clock-start
---

# Начало работы

<big>Если вы хотите создать прогрессивное веб-приложение, то, возможно, задаетесь вопросом, с чего начать, можно ли модернизировать сайт до PWA, не начиная с нуля, или как перейти от приложения для конкретной платформы к PWA. Данная статья поможет вам ответить на эти вопросы.</big>

## Первые шаги

Прогрессивные веб-приложения — это все еще сайты с расширенными функциями и возможностями. Они не привязаны к определенному технологическому стеку, и вы можете начать создание нового сайта с нуля или обновить существующий сайт, не прибегая к полной перестройке. В этом руководстве вы узнаете, как создать хорошую реализацию паттерна PWA. Вот некоторые стратегии для начала работы:

### Сделайте его устанавливаемым

Начните с малого! Этот подход включает в себя начало с базового файла манифеста, простой автономной страницы и сервисного работника для обслуживания автономной страницы и кэширования некоторых критических CSS и JavaScript. Благодаря кэшированию критических CSS и JavaScript вы получите существующее веб-приложение, готовое к работе в автономном режиме, при этом повысив его производительность.

### Сосредоточьтесь на одной функции

Выберите одну новую функцию — например, push-уведомления или обработку файлов, — которая окажет существенное влияние на пользователей или бизнес. Это позволит вам окунуться в пул PWA, не внося слишком много изменений за один раз.

### Создайте простую версию

Возьмите существующий раздел вашего приложения или конкретный путь пользователя, например, воспроизведение видео или доступ к посадочному талону, и сделайте так, чтобы он работал от начала до конца как offline-first PWA, отдельно или в контексте. Это позволяет провести эксперимент с минимальными рисками и переосмыслить опыт работы с PWA для своих пользователей.

### Начните с нуля

Если вам предстоит редизайн сайта или вы можете начать его с нуля, эта стратегия имеет большой смысл. По сравнению с другими стратегиями, она позволяет легче внедрить паттерны дизайна PWA, в частности, с самого начала использовать все возможности рабочих служб.

## Обновление приложения в магазине

Благодаря возможности публикации PWA в магазинах приложений можно обернуть свой PWA в PWA launcher и загрузить его в такие магазины, как Google Play Store или Windows Store. Если у вас есть существующее приложение для конкретной платформы, вы можете заменить его своим PWA, опубликованным в магазине.

При таком подходе существующие пользователи получат обновление своего опыта до PWA, а новые пользователи смогут по-прежнему использовать или устанавливать ваш PWA из браузера или из магазинов приложений. При этом у вас будет одно приложение для всех, что позволит сэкономить затраты, время и улучшить пользовательский опыт.

## Контрольный список PWA

Прогрессивное веб-приложение — это веб-сайт, поэтому возникает вопрос: Когда он становится Progressive Web App? Ответ не так прост, поскольку концепция PWA не относится к конкретной технологии или стеку, PWA — это скорее паттерн, включающий различные технические компоненты.

Несмотря на отсутствие единых правил для всех браузеров, существует набор рекомендаций, называемых [Progressive Web App Checklist](https://web.dev/articles/pwa-checklist), которые помогут вам создать PWA, которое понравится пользователям.

### Основные требования

Поскольку PWA работают на всех устройствах, от мобильных до настольных, основной контрольный список Progressive Web App содержит требования к установке и надежности приложения для _всех_ пользователей, независимо от размера экрана или типа ввода.

Основными требованиями являются:

#### Быстро запускается и быстро работает

Производительность играет важную роль в успехе любого интернет-ресурса, поскольку высокопроизводительные сайты привлекают и удерживают пользователей лучше, чем плохо работающие. Сайты должны быть ориентированы на оптимизацию показателей производительности, ориентированных на пользователя.

#### Работает в любом браузере

Прогрессивные веб-приложения — это прежде всего веб-приложения, а значит, они должны работать во всех браузерах, а не только в одном из них. При этом пользовательский опыт не обязательно должен быть идентичным во всех браузерах. Можно предусмотреть функции, которые не поддерживаются одним браузером, и предусмотреть запасной вариант для обеспечения хорошего качества работы.

#### Отзывчивость на любой размер экрана

Пользователи могут использовать ваш PWA на экране любого размера, и все содержимое доступно при любом размере области просмотра.

#### Предоставляет пользовательскую автономную страницу.

Когда пользователи находятся в автономном режиме, сохранение их в PWA обеспечивает более плавный переход к "родной" странице, чем возврат к автономной странице браузера по умолчанию.

#### Возможность установки

Пользователи, устанавливающие или добавляющие приложения на свой домашний экран, как правило, больше работают с этими приложениями, а когда PWA установлен, он может использовать больше возможностей для улучшения пользовательского опыта.

### Оптимальные характеристики PWA

Чтобы создать по-настоящему качественное Progressive Web App, которое будет ощущаться как лучшее в своем классе приложение, необходимо не только соблюдение основных требований. Оптимальный контрольный список Progressive Web App — это то, что позволит вашему PWA чувствовать себя способным и надежным, используя при этом преимущества, которые делает веб мощным.

#### Обеспечивает возможность работы в автономном режиме

Позволяя пользователям использовать PWA в автономном режиме, вы создадите для них аутентичный опыт работы с приложениями. Для этого необходимо определить те функции, которые не требуют подключения, чтобы пользователи могли получить доступ хотя бы к некоторым функциям.

!!!note ""

    Когда мы говорим, что PWA должен обеспечивать работу в автономном режиме, это не означает, что все сервисы и контент должны быть доступны в автономном режиме. Например, приложение для ведения заметок не может синхронизировать свои заметки при отсутствии связи, но оно может позволить пользователям писать заметки и синхронизировать новые изменения, когда они снова окажутся в сети. Как минимум, необходимо вывести на экран пользовательского интерфейса приложения соответствующее сообщение о том, что приложению требуется подключение к сети.

#### Полностью доступен

Убедитесь, что все содержимое и взаимодействие приложения понятно программам чтения с экрана, может быть использовано только с клавиатуры, что фокус указан, а цветовой контраст высок. Сделав PWA доступным, вы обеспечите его использование всеми пользователями.

#### Использование мощных возможностей там, где это возможно.

От push-сообщений, WASM и WebGL до доступа к файловой системе, выбора контактов и интеграции с магазинами приложений. Инструменты для создания высокопроизводительных и глубоко интегрированных PWA уже здесь, что позволяет создавать полнофункциональные пользовательские возможности, ранее предназначенные только для платформенных приложений, которые ваши пользователи могут брать с собой куда угодно.

#### Можно найти через поиск

Более половины всего трафика на сайт поступает из органического поиска. Убедиться в том, что для контента существуют канонические URL-адреса и что поисковые системы могут индексировать ваш сайт, очень важно для того, чтобы пользователи могли найти ваш PWA.

#### Работает с любым типом ввода

Пользователи должны иметь возможность беспрепятственно переключаться между типами ввода при работе с приложением, а способы ввода не должны зависеть от размера экрана.

#### Обеспечивает контекст для запросов разрешений

Вводите запросы на такие разрешения, как уведомления, геолокация и учетные данные, только после предоставления контекстного обоснования, чтобы повысить вероятность принятия запроса пользователем.

#### Соблюдение лучших практик для здорового кода

Если вы поддерживаете приложение в актуальном состоянии, а кодовую базу в рабочем состоянии, вам будет проще создавать новые функции, отвечающие другим целям, изложенным в этом контрольном списке.

!!!note ""

    В то время как контрольный список PWA содержит набор лучших практик для всех разработчиков, некоторые браузеры также имеют _критерии PWA_.

    Критерии PWA — это набор технических требований, которым должен соответствовать ваш сайт, чтобы считаться PWA. В этом случае ваш PWA будет получать особые условия, например, запускать новые события, отображать значок или диалог установки или добавлять новое меню Install в браузер.

## Ресурсы

-   [Контрольный список PWA](https://web.dev/articles/pwa-checklist)

:material-information-outline: Источник &mdash; [Getting started](https://web.dev/learn/pwa/getting-started)
