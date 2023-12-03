/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = 'code-language-change',
	a = 'before-code-language-change',
	n = () =>
		localStorage.getItem('code-language-preference') ??
		'ts',
	g = (e, a = !1) => {
		if (!a) {
			let a = !1;
			const n = {
				pendingLanguage: e,
				cancel: () => {
					a = !0;
				},
			};
			if (
				(window.dispatchEvent(
					new CustomEvent(
						'before-code-language-change',
						{ detail: n },
					),
				),
				a)
			)
				return;
		}
		localStorage.setItem('code-language-preference', e),
			window.dispatchEvent(
				new Event('code-language-change'),
			),
			t();
	},
	t = () => {
		document.body.setAttribute(
			'code-language-preference',
			n(),
		);
	};
export { a as B, e as C, n as g, g as s };
