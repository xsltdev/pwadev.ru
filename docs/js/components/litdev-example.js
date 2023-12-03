import { _ as e } from '../tslib.js';
import {
	i as r,
	n as o,
	s as t,
	A as a,
	x as i,
	l as d,
	o as n,
} from '../lit.js';
import {
	C as p,
	g as l,
} from '../code-language-preference.js';
import '../playground-ide.js';
import '../litdev-example-controls.js';
import '../playground-connected-element.js';
import '../mwc-base.js';
import '../litdev-code-language-switch.js';
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class s extends t {
	constructor() {
		super(...arguments),
			(this._onCodeLanguagePreferenceChanged = () => {
				this.requestUpdate();
			});
	}
	connectedCallback() {
		super.connectedCallback(),
			window.addEventListener(
				p,
				this._onCodeLanguagePreferenceChanged,
			);
	}
	disconnectedCallback() {
		super.disconnectedCallback(),
			window.removeEventListener(
				p,
				this._onCodeLanguagePreferenceChanged,
			);
	}
	render() {
		if (!this.project) return a;
		const e = !this.filename,
			r = { borderRadius: e ? 'unset' : 'inherit' },
			o = l(),
			t =
				'ts' === o
					? `/samples/${this.project}/project.json`
					: `/samples/js/${this.project}/project.json`,
			p =
				'ts' === o
					? this.filename
					: this.filename?.replace(/.ts$/, '.js');
		return i`<playground-project sandbox-base-url="${d(
			this.sandboxBaseUrl,
		)}" id="project" project-src="${t}"></playground-project><div id="bar">${
			e
				? i`<playground-tab-bar project="project" editor="project-file-editor"></playground-tab-bar>`
				: a
		}<litdev-example-controls .project="${
			this.project
		}"></litdev-example-controls></div><playground-file-editor id="project-file-editor" project="project" filename="${d(
			p,
		)}" style="${n(
			r,
		)}"></playground-file-editor><playground-preview project="project"></playground-preview>`;
	}
}
(s.styles = r`:host{border-radius: 5px;border: 1px solid #ddd;display:block}#bar{display:flex;height:var(--litdev-example-bar-height)}:host(:not([filename]))>#bar{border-bottom:var(--code-border)}:host([filename])>#bar{background:var(--playground-code-background)}:host([filename])>#bar>litdev-example-controls{padding-top:6px}:host([filename])>playground-file-editor{padding-top:0}#bar,playground-file-editor,playground-preview,playground-tab-bar{border-radius:5px;box-sizing:border-box}playground-tab-bar{background:#fff;font-family:'Open Sans',sans-serif;height:var(--litdev-example-tab-bar-height);min-width:0}litdev-example-controls{height:var(--litdev-example-controls-height);padding-right:6px;box-sizing:border-box;z-index:1}playground-file-editor{border:1px solid transparent;height:var(--litdev-example-editor-height,300px);margin-bottom:0;border-bottom-left-radius:0;border-bottom-right-radius:0;background:var(--playground-code-background);line-height:var(--playground-code-line-height);padding:var(--litdev-code-padding)}playground-preview{margin:0 .5px;height:var(--litdev-example-preview-height,100px);border-top:var(--code-border);border-bottom:var(--code-border);border-top-left-radius:0;border-top-right-radius:0}playground-preview::part(preview-toolbar){display:none}`),
	e([o()], s.prototype, 'project', void 0),
	e(
		[o({ reflect: !0 })],
		s.prototype,
		'filename',
		void 0,
	),
	e(
		[o({ attribute: 'sandbox-base-url' })],
		s.prototype,
		'sandboxBaseUrl',
		void 0,
	),
	customElements.define('litdev-example', s);
