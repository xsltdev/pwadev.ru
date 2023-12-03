import { _ as e } from './tslib.js';
import {
	i as t,
	n as i,
	s as o,
	x as l,
	A as a,
	e as n,
} from './lit.js';
import './litdev-code-language-switch.js';
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ let r = class extends o {
	constructor() {
		super(...arguments),
			(this.hideCodeLanguageSwitch = !1);
	}
	render() {
		return l`${
			this.project
				? l`<a id="openInPlayground" title="Open this example in the playground" target="_blank" href="https://lit.dev/playground/#sample=${this.project}"><svg width="22px" height="22px" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg></a>`
				: a
		} ${
			this.hideCodeLanguageSwitch
				? a
				: l`<litdev-code-language-switch></litdev-code-language-switch>`
		}`;
	}
};
(r.styles = t`:host{display:flex;align-items:center;margin-left:auto}#openInPlayground{display:flex;color:inherit;opacity:70%;fill:#5f5f5f}#openInPlayground:hover{opacity:100%;fill:#005cc5bd}litdev-code-language-switch{margin-left:10px}`),
	e([i()], r.prototype, 'project', void 0),
	e(
		[i({ type: Boolean })],
		r.prototype,
		'hideCodeLanguageSwitch',
		void 0,
	),
	(r = e([n('litdev-example-controls')], r));
