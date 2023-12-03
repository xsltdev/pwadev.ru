import { _ as t } from './tslib.js';
import { s as e, n as o } from './lit.js';
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const r = (t) => t.nodeType === Node.ELEMENT_NODE;
function s(t) {
	return {
		addClass: (e) => {
			t.classList.add(e);
		},
		removeClass: (e) => {
			t.classList.remove(e);
		},
		hasClass: (e) => t.classList.contains(e),
	};
}
const n = () => {},
	i = {
		get passive() {
			return !1;
		},
	};
document.addEventListener('x', n, i),
	document.removeEventListener('x', n);
const c = (t = window.document) => {
		let e = t.activeElement;
		const o = [];
		if (!e) return o;
		for (; e && (o.push(e), e.shadowRoot); )
			e = e.shadowRoot.activeElement;
		return o;
	},
	a = (t) => {
		const e = c();
		if (!e.length) return !1;
		const o = e[e.length - 1],
			r = new Event('check-if-focused', {
				bubbles: !0,
				composed: !0,
			});
		let s = [];
		const n = (t) => {
			s = t.composedPath();
		};
		return (
			document.body.addEventListener(
				'check-if-focused',
				n,
			),
			o.dispatchEvent(r),
			document.body.removeEventListener(
				'check-if-focused',
				n,
			),
			-1 !== s.indexOf(t)
		);
	};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class d extends e {
	click() {
		if (this.mdcRoot)
			return (
				this.mdcRoot.focus(),
				void this.mdcRoot.click()
			);
		super.click();
	}
	createFoundation() {
		void 0 !== this.mdcFoundation &&
			this.mdcFoundation.destroy(),
			this.mdcFoundationClass &&
				((this.mdcFoundation =
					new this.mdcFoundationClass(
						this.createAdapter(),
					)),
				this.mdcFoundation.init());
	}
	firstUpdated() {
		this.createFoundation();
	}
}
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var u = (function () {
	function t(t) {
		void 0 === t && (t = {}), (this.adapter = t);
	}
	return (
		Object.defineProperty(t, 'cssClasses', {
			get: function () {
				return {};
			},
			enumerable: !1,
			configurable: !0,
		}),
		Object.defineProperty(t, 'strings', {
			get: function () {
				return {};
			},
			enumerable: !1,
			configurable: !0,
		}),
		Object.defineProperty(t, 'numbers', {
			get: function () {
				return {};
			},
			enumerable: !1,
			configurable: !0,
		}),
		Object.defineProperty(t, 'defaultAdapter', {
			get: function () {
				return {};
			},
			enumerable: !1,
			configurable: !0,
		}),
		(t.prototype.init = function () {}),
		(t.prototype.destroy = function () {}),
		t
	);
})();
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ function l(t, e, o) {
	if (void 0 !== e)
		return (function (t, e, o) {
			const r = t.constructor;
			if (!o) {
				const t = '__' + e;
				if (!(o = r.getPropertyDescriptor(e, t)))
					throw Error(
						'@ariaProperty must be used after a @property decorator',
					);
			}
			const s = o;
			let n = '';
			if (!s.set)
				throw Error(
					'@ariaProperty requires a setter for ' +
						e,
				);
			if (t.dispatchWizEvent) return o;
			const i = {
				configurable: !0,
				enumerable: !0,
				set(t) {
					if ('' === n) {
						const t = r.getPropertyOptions(e);
						n =
							'string' == typeof t.attribute
								? t.attribute
								: e;
					}
					this.hasAttribute(n) &&
						this.removeAttribute(n),
						s.set.call(this, t);
				},
			};
			return (
				s.get &&
					(i.get = function () {
						return s.get.call(this);
					}),
				i
			);
		})(t, e, o);
	throw Error(
		'@ariaProperty only supports TypeScript Decorators',
	);
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ const f = (t) => (e, o) => {
	if (e.constructor._observers) {
		if (!e.constructor.hasOwnProperty('_observers')) {
			const t = e.constructor._observers;
			(e.constructor._observers = new Map()),
				t.forEach((t, o) =>
					e.constructor._observers.set(o, t),
				);
		}
	} else {
		e.constructor._observers = new Map();
		const t = e.updated;
		e.updated = function (e) {
			t.call(this, e),
				e.forEach((t, e) => {
					const o =
						this.constructor._observers.get(e);
					void 0 !== o &&
						o.call(this, this[e], t);
				});
		};
	}
	e.constructor._observers.set(o, t);
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ var h, m;
const p =
	null !==
		(m =
			null === (h = window.ShadyDOM) || void 0 === h
				? void 0
				: h.inUse) &&
	void 0 !== m &&
	m;
class v extends d {
	constructor() {
		super(...arguments),
			(this.disabled = !1),
			(this.containingForm = null),
			(this.formDataListener = (t) => {
				this.disabled ||
					this.setFormData(t.formData);
			});
	}
	findFormElement() {
		if (!this.shadowRoot || p) return null;
		const t =
			this.getRootNode().querySelectorAll('form');
		for (const e of Array.from(t))
			if (e.contains(this)) return e;
		return null;
	}
	connectedCallback() {
		var t;
		super.connectedCallback(),
			(this.containingForm = this.findFormElement()),
			null === (t = this.containingForm) ||
				void 0 === t ||
				t.addEventListener(
					'formdata',
					this.formDataListener,
				);
	}
	disconnectedCallback() {
		var t;
		super.disconnectedCallback(),
			null === (t = this.containingForm) ||
				void 0 === t ||
				t.removeEventListener(
					'formdata',
					this.formDataListener,
				),
			(this.containingForm = null);
	}
	click() {
		this.formElement &&
			!this.disabled &&
			(this.formElement.focus(),
			this.formElement.click());
	}
	firstUpdated() {
		super.firstUpdated(),
			this.shadowRoot &&
				this.mdcRoot.addEventListener(
					'change',
					(t) => {
						this.dispatchEvent(
							new Event('change', t),
						);
					},
				);
	}
}
(v.shadowRootOptions = {
	mode: 'open',
	delegatesFocus: !0,
}),
	t(
		[o({ type: Boolean })],
		v.prototype,
		'disabled',
		void 0,
	);
export {
	d as B,
	v as F,
	u as M,
	l as a,
	c as b,
	s as c,
	a as d,
	r as i,
	f as o,
};
