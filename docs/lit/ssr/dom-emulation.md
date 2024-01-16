---
description: При работе в Node Lit автоматически импортирует и использует набор шиммов DOM, а также определяет глобал customElements
---

# Эмуляция DOM Lit SSR

!!!warning ""

    Этот пакет входит в семейство экспериментальных пакетов Lit Labs. Руководство по использованию программ Labs в производстве см. на [странице Lit Labs](../libraries/labs.md).

При работе в Node Lit автоматически импортирует и использует набор шиммов DOM, а также определяет глобал `customElements`. Реализованы только минимальные интерфейсы DOM, необходимые для определения и регистрации компонентов. К ним относятся несколько ключевых классов DOM и примерно функционирующий `CustomElementRegistry`.

✅ означает, что элемент реализован так, чтобы быть функционально таким же, как в браузере.

`Element`

: ⚠️ Частично: `attributes` ✅, `shadowRoot` (⚠️ Возвращает `{host: this}` если `attachShadow()` был вызван с `{mode: 'open'}`), `setAttribute()` ✅, `removeAttribute()` ✅, `hasAttribute()` ✅, `attachShadow()` (⚠️ Возвращает `{host: this}`), `getAttribute()` ✅

`HTMLElement`

: ⚠️ Пустой класс

`CustomElementRegistry`

: `define()` ✅, `get()` ✅

`customElements`

: Инстанс `CustomElementRegistry`
