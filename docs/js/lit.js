/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;
const e = window,
	i = e.trustedTypes,
	s = i
		? i.createPolicy('lit-html', {
				createHTML: (t) => t,
		  })
		: void 0,
	n = '$lit$',
	r = `lit$${(Math.random() + '').slice(9)}$`,
	o = '?' + r,
	l = `<${o}>`,
	a = document,
	h = () => a.createComment(''),
	c = (t) =>
		null === t ||
		('object' != typeof t && 'function' != typeof t),
	d = Array.isArray,
	u = (t) =>
		d(t) ||
		'function' ==
			typeof (null == t
				? void 0
				: t[Symbol.iterator]),
	p = '[ \t\n\f\r]',
	v =
		/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
	f = /-->/g,
	$ = />/g,
	_ = RegExp(
		`>|${p}(?:([^\\s"'>=/]+)(${p}*=${p}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,
		'g',
	),
	A = /'/g,
	y = /"/g,
	m = /^(?:script|style|textarea|title)$/i,
	g = (t, ...e) => ({
		_$litType$: 1,
		strings: t,
		values: e,
	}),
	b = Symbol.for('lit-noChange'),
	E = Symbol.for('lit-nothing'),
	S = new WeakMap(),
	w = a.createTreeWalker(a, 129, null, !1);
function C(t, e) {
	if (!Array.isArray(t) || !t.hasOwnProperty('raw'))
		throw Error('invalid template strings array');
	return void 0 !== s ? s.createHTML(e) : e;
}
const P = (t, e) => {
	const i = t.length - 1,
		s = [];
	let o,
		a = 2 === e ? '<svg>' : '',
		h = v;
	for (let e = 0; e < i; e++) {
		const i = t[e];
		let c,
			d,
			u = -1,
			p = 0;
		for (
			;
			p < i.length &&
			((h.lastIndex = p),
			(d = h.exec(i)),
			null !== d);

		)
			(p = h.lastIndex),
				h === v
					? '!--' === d[1]
						? (h = f)
						: void 0 !== d[1]
						? (h = $)
						: void 0 !== d[2]
						? (m.test(d[2]) &&
								(o = RegExp(
									'</' + d[2],
									'g',
								)),
						  (h = _))
						: void 0 !== d[3] && (h = _)
					: h === _
					? '>' === d[0]
						? ((h = null != o ? o : v),
						  (u = -1))
						: void 0 === d[1]
						? (u = -2)
						: ((u = h.lastIndex - d[2].length),
						  (c = d[1]),
						  (h =
								void 0 === d[3]
									? _
									: '"' === d[3]
									? y
									: A))
					: h === y || h === A
					? (h = _)
					: h === f || h === $
					? (h = v)
					: ((h = _), (o = void 0));
		const g =
			h === _ && t[e + 1].startsWith('/>') ? ' ' : '';
		a +=
			h === v
				? i + l
				: u >= 0
				? (s.push(c),
				  i.slice(0, u) + n + i.slice(u) + r + g)
				: i +
				  r +
				  (-2 === u ? (s.push(void 0), e) : g);
	}
	return [
		C(
			t,
			a + (t[i] || '<?>') + (2 === e ? '</svg>' : ''),
		),
		s,
	];
};
class x {
	constructor({ strings: t, _$litType$: e }, s) {
		let l;
		this.parts = [];
		let a = 0,
			c = 0;
		const d = t.length - 1,
			u = this.parts,
			[p, v] = P(t, e);
		if (
			((this.el = x.createElement(p, s)),
			(w.currentNode = this.el.content),
			2 === e)
		) {
			const t = this.el.content,
				e = t.firstChild;
			e.remove(), t.append(...e.childNodes);
		}
		for (
			;
			null !== (l = w.nextNode()) && u.length < d;

		) {
			if (1 === l.nodeType) {
				if (l.hasAttributes()) {
					const t = [];
					for (const e of l.getAttributeNames())
						if (
							e.endsWith(n) ||
							e.startsWith(r)
						) {
							const i = v[c++];
							if ((t.push(e), void 0 !== i)) {
								const t = l
										.getAttribute(
											i.toLowerCase() +
												n,
										)
										.split(r),
									e = /([.?@])?(.*)/.exec(
										i,
									);
								u.push({
									type: 1,
									index: a,
									name: e[2],
									strings: t,
									ctor:
										'.' === e[1]
											? H
											: '?' === e[1]
											? R
											: '@' === e[1]
											? M
											: N,
								});
							} else
								u.push({
									type: 6,
									index: a,
								});
						}
					for (const e of t) l.removeAttribute(e);
				}
				if (m.test(l.tagName)) {
					const t = l.textContent.split(r),
						e = t.length - 1;
					if (e > 0) {
						l.textContent = i
							? i.emptyScript
							: '';
						for (let i = 0; i < e; i++)
							l.append(t[i], h()),
								w.nextNode(),
								u.push({
									type: 2,
									index: ++a,
								});
						l.append(t[e], h());
					}
				}
			} else if (8 === l.nodeType)
				if (l.data === o)
					u.push({ type: 2, index: a });
				else {
					let t = -1;
					for (
						;
						-1 !==
						(t = l.data.indexOf(r, t + 1));

					)
						u.push({ type: 7, index: a }),
							(t += r.length - 1);
				}
			a++;
		}
	}
	static createElement(t, e) {
		const i = a.createElement('template');
		return (i.innerHTML = t), i;
	}
}
function T(t, e, i = t, s) {
	var n, r, o, l;
	if (e === b) return e;
	let a =
		void 0 !== s
			? null === (n = i._$Co) || void 0 === n
				? void 0
				: n[s]
			: i._$Cl;
	const h = c(e) ? void 0 : e._$litDirective$;
	return (
		(null == a ? void 0 : a.constructor) !== h &&
			(null === (r = null == a ? void 0 : a._$AO) ||
				void 0 === r ||
				r.call(a, !1),
			void 0 === h
				? (a = void 0)
				: ((a = new h(t)), a._$AT(t, i, s)),
			void 0 !== s
				? ((null !== (o = (l = i)._$Co) &&
				  void 0 !== o
						? o
						: (l._$Co = []))[s] = a)
				: (i._$Cl = a)),
		void 0 !== a &&
			(e = T(t, a._$AS(t, e.values), a, s)),
		e
	);
}
class U {
	constructor(t, e) {
		(this._$AV = []),
			(this._$AN = void 0),
			(this._$AD = t),
			(this._$AM = e);
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(t) {
		var e;
		const {
				el: { content: i },
				parts: s,
			} = this._$AD,
			n = (
				null !==
					(e =
						null == t
							? void 0
							: t.creationScope) &&
				void 0 !== e
					? e
					: a
			).importNode(i, !0);
		w.currentNode = n;
		let r = w.nextNode(),
			o = 0,
			l = 0,
			h = s[0];
		for (; void 0 !== h; ) {
			if (o === h.index) {
				let e;
				2 === h.type
					? (e = new k(r, r.nextSibling, this, t))
					: 1 === h.type
					? (e = new h.ctor(
							r,
							h.name,
							h.strings,
							this,
							t,
					  ))
					: 6 === h.type &&
					  (e = new I(r, this, t)),
					this._$AV.push(e),
					(h = s[++l]);
			}
			o !== (null == h ? void 0 : h.index) &&
				((r = w.nextNode()), o++);
		}
		return (w.currentNode = a), n;
	}
	v(t) {
		let e = 0;
		for (const i of this._$AV)
			void 0 !== i &&
				(void 0 !== i.strings
					? (i._$AI(t, i, e),
					  (e += i.strings.length - 2))
					: i._$AI(t[e])),
				e++;
	}
}
class k {
	constructor(t, e, i, s) {
		var n;
		(this.type = 2),
			(this._$AH = E),
			(this._$AN = void 0),
			(this._$AA = t),
			(this._$AB = e),
			(this._$AM = i),
			(this.options = s),
			(this._$Cp =
				null ===
					(n =
						null == s
							? void 0
							: s.isConnected) ||
				void 0 === n ||
				n);
	}
	get _$AU() {
		var t, e;
		return null !==
			(e =
				null === (t = this._$AM) || void 0 === t
					? void 0
					: t._$AU) && void 0 !== e
			? e
			: this._$Cp;
	}
	get parentNode() {
		let t = this._$AA.parentNode;
		const e = this._$AM;
		return (
			void 0 !== e &&
				11 === (null == t ? void 0 : t.nodeType) &&
				(t = e.parentNode),
			t
		);
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(t, e = this) {
		(t = T(this, t, e)),
			c(t)
				? t === E || null == t || '' === t
					? (this._$AH !== E && this._$AR(),
					  (this._$AH = E))
					: t !== this._$AH &&
					  t !== b &&
					  this._(t)
				: void 0 !== t._$litType$
				? this.g(t)
				: void 0 !== t.nodeType
				? this.$(t)
				: u(t)
				? this.T(t)
				: this._(t);
	}
	k(t) {
		return this._$AA.parentNode.insertBefore(
			t,
			this._$AB,
		);
	}
	$(t) {
		this._$AH !== t &&
			(this._$AR(), (this._$AH = this.k(t)));
	}
	_(t) {
		this._$AH !== E && c(this._$AH)
			? (this._$AA.nextSibling.data = t)
			: this.$(a.createTextNode(t)),
			(this._$AH = t);
	}
	g(t) {
		var e;
		const { values: i, _$litType$: s } = t,
			n =
				'number' == typeof s
					? this._$AC(t)
					: (void 0 === s.el &&
							(s.el = x.createElement(
								C(s.h, s.h[0]),
								this.options,
							)),
					  s);
		if (
			(null === (e = this._$AH) || void 0 === e
				? void 0
				: e._$AD) === n
		)
			this._$AH.v(i);
		else {
			const t = new U(n, this),
				e = t.u(this.options);
			t.v(i), this.$(e), (this._$AH = t);
		}
	}
	_$AC(t) {
		let e = S.get(t.strings);
		return (
			void 0 === e &&
				S.set(t.strings, (e = new x(t))),
			e
		);
	}
	T(t) {
		d(this._$AH) || ((this._$AH = []), this._$AR());
		const e = this._$AH;
		let i,
			s = 0;
		for (const n of t)
			s === e.length
				? e.push(
						(i = new k(
							this.k(h()),
							this.k(h()),
							this,
							this.options,
						)),
				  )
				: (i = e[s]),
				i._$AI(n),
				s++;
		s < e.length &&
			(this._$AR(i && i._$AB.nextSibling, s),
			(e.length = s));
	}
	_$AR(t = this._$AA.nextSibling, e) {
		var i;
		for (
			null === (i = this._$AP) ||
			void 0 === i ||
			i.call(this, !1, !0, e);
			t && t !== this._$AB;

		) {
			const e = t.nextSibling;
			t.remove(), (t = e);
		}
	}
	setConnected(t) {
		var e;
		void 0 === this._$AM &&
			((this._$Cp = t),
			null === (e = this._$AP) ||
				void 0 === e ||
				e.call(this, t));
	}
}
class N {
	constructor(t, e, i, s, n) {
		(this.type = 1),
			(this._$AH = E),
			(this._$AN = void 0),
			(this.element = t),
			(this.name = e),
			(this._$AM = s),
			(this.options = n),
			i.length > 2 || '' !== i[0] || '' !== i[1]
				? ((this._$AH = Array(i.length - 1).fill(
						new String(),
				  )),
				  (this.strings = i))
				: (this._$AH = E);
	}
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(t, e = this, i, s) {
		const n = this.strings;
		let r = !1;
		if (void 0 === n)
			(t = T(this, t, e, 0)),
				(r = !c(t) || (t !== this._$AH && t !== b)),
				r && (this._$AH = t);
		else {
			const s = t;
			let o, l;
			for (t = n[0], o = 0; o < n.length - 1; o++)
				(l = T(this, s[i + o], e, o)),
					l === b && (l = this._$AH[o]),
					r || (r = !c(l) || l !== this._$AH[o]),
					l === E
						? (t = E)
						: t !== E &&
						  (t +=
								(null != l ? l : '') +
								n[o + 1]),
					(this._$AH[o] = l);
		}
		r && !s && this.j(t);
	}
	j(t) {
		t === E
			? this.element.removeAttribute(this.name)
			: this.element.setAttribute(
					this.name,
					null != t ? t : '',
			  );
	}
}
class H extends N {
	constructor() {
		super(...arguments), (this.type = 3);
	}
	j(t) {
		this.element[this.name] = t === E ? void 0 : t;
	}
}
const O = i ? i.emptyScript : '';
class R extends N {
	constructor() {
		super(...arguments), (this.type = 4);
	}
	j(t) {
		t && t !== E
			? this.element.setAttribute(this.name, O)
			: this.element.removeAttribute(this.name);
	}
}
class M extends N {
	constructor(t, e, i, s, n) {
		super(t, e, i, s, n), (this.type = 5);
	}
	_$AI(t, e = this) {
		var i;
		if (
			(t =
				null !== (i = T(this, t, e, 0)) &&
				void 0 !== i
					? i
					: E) === b
		)
			return;
		const s = this._$AH,
			n =
				(t === E && s !== E) ||
				t.capture !== s.capture ||
				t.once !== s.once ||
				t.passive !== s.passive,
			r = t !== E && (s === E || n);
		n &&
			this.element.removeEventListener(
				this.name,
				this,
				s,
			),
			r &&
				this.element.addEventListener(
					this.name,
					this,
					t,
				),
			(this._$AH = t);
	}
	handleEvent(t) {
		var e, i;
		'function' == typeof this._$AH
			? this._$AH.call(
					null !==
						(i =
							null === (e = this.options) ||
							void 0 === e
								? void 0
								: e.host) && void 0 !== i
						? i
						: this.element,
					t,
			  )
			: this._$AH.handleEvent(t);
	}
}
class I {
	constructor(t, e, i) {
		(this.element = t),
			(this.type = 6),
			(this._$AN = void 0),
			(this._$AM = e),
			(this.options = i);
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(t) {
		T(this, t);
	}
}
const j = {
		O: n,
		P: r,
		A: o,
		C: 1,
		M: P,
		L: U,
		R: u,
		D: T,
		I: k,
		V: N,
		H: R,
		N: M,
		U: H,
		F: I,
	},
	D = e.litHtmlPolyfillSupport;
null == D || D(x, k),
	(null !== (t = e.litHtmlVersions) && void 0 !== t
		? t
		: (e.litHtmlVersions = [])
	).push('2.8.0');
const L = (t, e, i) => {
		var s, n;
		const r =
			null !==
				(s = null == i ? void 0 : i.renderBefore) &&
			void 0 !== s
				? s
				: e;
		let o = r._$litPart$;
		if (void 0 === o) {
			const t =
				null !==
					(n =
						null == i
							? void 0
							: i.renderBefore) &&
				void 0 !== n
					? n
					: null;
			r._$litPart$ = o = new k(
				e.insertBefore(h(), t),
				t,
				void 0,
				null != i ? i : {},
			);
		}
		return o._$AI(t), o;
		/**
		 * @license
		 * Copyright 2019 Google LLC
		 * SPDX-License-Identifier: BSD-3-Clause
		 */
	},
	B = {
		boundAttributeSuffix: j.O,
		marker: j.P,
		markerMatch: j.A,
		HTML_RESULT: j.C,
		getTemplateHtml: j.M,
		overrideDirectiveResolve: (t, e) =>
			class extends t {
				_$AS(t, i) {
					return e(this, i);
				}
			},
		setDirectiveClass(t, e) {
			t._$litDirective$ = e;
		},
		getAttributePartCommittedValue: (t, e, i) => {
			let s = b;
			return (
				(t.j = (t) => (s = t)), t._$AI(e, t, i), s
			);
		},
		connectedDisconnectable: (t) => ({
			...t,
			_$AU: !0,
		}),
		resolveDirective: j.D,
		AttributePart: j.V,
		PropertyPart: j.U,
		BooleanAttributePart: j.H,
		EventPart: j.N,
		ElementPart: j.F,
		TemplateInstance: j.L,
		isIterable: j.R,
		ChildPart: j.I,
	},
	z = {
		ATTRIBUTE: 1,
		CHILD: 2,
		PROPERTY: 3,
		BOOLEAN_ATTRIBUTE: 4,
		EVENT: 5,
		ELEMENT: 6,
	},
	V =
		(t) =>
		(...e) => ({ _$litDirective$: t, values: e });
class W {
	constructor(t) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(t, e, i) {
		(this._$Ct = t), (this._$AM = e), (this._$Ci = i);
	}
	_$AS(t, e) {
		return this.update(t, e);
	}
	update(t, e) {
		return this.render(...e);
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const { I: q } = j,
	F = (t) => void 0 === t.strings,
	K = () => document.createComment(''),
	G = (t, e, i) => {
		var s;
		const n = t._$AA.parentNode,
			r = void 0 === e ? t._$AB : e._$AA;
		if (void 0 === i) {
			const e = n.insertBefore(K(), r),
				s = n.insertBefore(K(), r);
			i = new q(e, s, t, t.options);
		} else {
			const e = i._$AB.nextSibling,
				o = i._$AM,
				l = o !== t;
			if (l) {
				let e;
				null === (s = i._$AQ) ||
					void 0 === s ||
					s.call(i, t),
					(i._$AM = t),
					void 0 !== i._$AP &&
						(e = t._$AU) !== o._$AU &&
						i._$AP(e);
			}
			if (e !== r || l) {
				let t = i._$AA;
				for (; t !== e; ) {
					const e = t.nextSibling;
					n.insertBefore(t, r), (t = e);
				}
			}
		}
		return i;
	},
	Q = (t, e, i = t) => (t._$AI(e, i), t),
	Z = {},
	J = (t, e = Z) => (t._$AH = e),
	Y = (t) => {
		var e;
		null === (e = t._$AP) ||
			void 0 === e ||
			e.call(t, !1, !0);
		let i = t._$AA;
		const s = t._$AB.nextSibling;
		for (; i !== s; ) {
			const t = i.nextSibling;
			i.remove(), (i = t);
		}
	},
	{
		TemplateInstance: X,
		isIterable: tt,
		resolveDirective: et,
		ChildPart: it,
		ElementPart: st,
	} = B,
	nt = (t, e, i, s) => {
		let n, r;
		if (0 === i.length)
			(r = new it(e, null, void 0, s)), (n = t);
		else {
			const t = i[i.length - 1];
			if ('template-instance' === t.type)
				(r = new it(e, null, t.instance, s)),
					t.instance._$AV.push(r),
					(n =
						t.result.values[
							t.instancePartIndex++
						]),
					t.templatePartIndex++;
			else if ('iterable' === t.type) {
				r = new it(e, null, t.part, s);
				const i = t.iterator.next();
				if (i.done)
					throw (
						((n = void 0),
						(t.done = !0),
						Error(
							'Unhandled shorter than expected iterable',
						))
					);
				(n = i.value), t.part._$AH.push(r);
			} else r = new it(e, null, t.part, s);
		}
		if (((n = et(r, n)), n === b))
			i.push({ part: r, type: 'leaf' });
		else if (
			((t) =>
				null === t ||
				('object' != typeof t &&
					'function' != typeof t))(n)
		)
			i.push({ part: r, type: 'leaf' }), (r._$AH = n);
		else if (
			((t, e) =>
				void 0 !==
				(null == t ? void 0 : t._$litType$))(n)
		) {
			if (
				((t) => {
					var e;
					return (
						null !=
						(null ===
							(e =
								null == t
									? void 0
									: t._$litType$) ||
						void 0 === e
							? void 0
							: e.h)
					);
				})(n)
			)
				throw Error(
					'compiled templates are not supported',
				);
			const t = 'lit-part ' + lt(n);
			if (e.data !== t)
				throw Error(
					'Hydration value mismatch: Unexpected TemplateResult rendered to part',
				);
			{
				const t = it.prototype._$AC(n),
					e = new X(t, r);
				i.push({
					type: 'template-instance',
					instance: e,
					part: r,
					templatePartIndex: 0,
					instancePartIndex: 0,
					result: n,
				}),
					(r._$AH = e);
			}
		} else
			tt(n)
				? (i.push({
						part: r,
						type: 'iterable',
						value: n,
						iterator: n[Symbol.iterator](),
						done: !1,
				  }),
				  (r._$AH = []))
				: (i.push({ part: r, type: 'leaf' }),
				  (r._$AH = n ?? ''));
		return r;
	},
	rt = (t, e, i) => {
		if (void 0 === e)
			throw Error('unbalanced part marker');
		e._$AB = t;
		const s = i.pop();
		if (
			'iterable' === s.type &&
			!s.iterator.next().done
		)
			throw Error(
				'unexpected longer than expected iterable',
			);
		if (i.length > 0) return i[i.length - 1].part;
	},
	ot = (t, e, i) => {
		const s = /lit-node (\d+)/.exec(t.data),
			n = parseInt(s[1]),
			r = t.nextElementSibling;
		if (null === r)
			throw Error(
				'could not find node for attribute parts',
			);
		r.removeAttribute('defer-hydration');
		const o = e[e.length - 1];
		if ('template-instance' !== o.type)
			throw Error('internal error');
		{
			const t = o.instance;
			for (;;) {
				const e = t._$AD.parts[o.templatePartIndex];
				if (
					void 0 === e ||
					(1 !== e.type && 6 !== e.type) ||
					e.index !== n
				)
					break;
				if (1 === e.type) {
					const s = new e.ctor(
							r,
							e.name,
							e.strings,
							o.instance,
							i,
						),
						n = F(s)
							? o.result.values[
									o.instancePartIndex
							  ]
							: o.result.values,
						l = !(5 === s.type || 3 === s.type);
					s._$AI(n, s, o.instancePartIndex, l),
						(o.instancePartIndex +=
							e.strings.length - 1),
						t._$AV.push(s);
				} else {
					const e = new st(r, o.instance, i);
					et(
						e,
						o.result.values[
							o.instancePartIndex++
						],
					),
						t._$AV.push(e);
				}
				o.templatePartIndex++;
			}
		}
	},
	lt = (t) => {
		const e = new Uint32Array(2).fill(5381);
		for (const i of t.strings)
			for (let t = 0; t < i.length; t++)
				e[t % 2] =
					(33 * e[t % 2]) ^ i.charCodeAt(t);
		const i = String.fromCharCode(
			...new Uint8Array(e.buffer),
		);
		return btoa(i);
	};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ globalThis.litElementHydrateSupport = ({
	LitElement: t,
}) => {
	const e = Object.getOwnPropertyDescriptor(
		Object.getPrototypeOf(t),
		'observedAttributes',
	).get;
	Object.defineProperty(t, 'observedAttributes', {
		get() {
			return [...e.call(this), 'defer-hydration'];
		},
	});
	const i = t.prototype.attributeChangedCallback;
	t.prototype.attributeChangedCallback = function (
		t,
		e,
		n,
	) {
		'defer-hydration' === t &&
			null === n &&
			s.call(this),
			i.call(this, t, e, n);
	};
	const s = t.prototype.connectedCallback;
	t.prototype.connectedCallback = function () {
		this.hasAttribute('defer-hydration') ||
			s.call(this);
	};
	const n = t.prototype.createRenderRoot;
	t.prototype.createRenderRoot = function () {
		return this.shadowRoot
			? ((this._$AG = !0), this.shadowRoot)
			: n.call(this);
	};
	const r = Object.getPrototypeOf(t.prototype).update;
	t.prototype.update = function (t) {
		const e = this.render();
		if ((r.call(this, t), this._$AG)) {
			this._$AG = !1;
			for (
				let t = 0;
				t < this.attributes.length;
				t++
			) {
				const e = this.attributes[t];
				if (
					e.name.startsWith('hydrate-internals-')
				) {
					const t = e.name.slice(18);
					this.removeAttribute(t),
						this.removeAttribute(e.name);
				}
			}
			((t, e, i = {}) => {
				if (void 0 !== e._$litPart$)
					throw Error(
						'container already contains a live render',
					);
				let s, n, r;
				const o = [],
					l = document.createTreeWalker(
						e,
						NodeFilter.SHOW_COMMENT,
					);
				let a;
				for (; null !== (a = l.nextNode()); ) {
					const e = a.data;
					if (e.startsWith('lit-part')) {
						if (0 === o.length && void 0 !== s)
							throw Error(
								`There must be only one root part per container. Found a part marker (${a}) when we already have a root part marker (${n})`,
							);
						(r = nt(t, a, o, i)),
							void 0 === s && (s = r),
							(n ??= a);
					} else if (e.startsWith('lit-node'))
						ot(a, o, i);
					else if (e.startsWith('/lit-part')) {
						if (1 === o.length && r !== s)
							throw Error('internal error');
						r = rt(a, r, o);
					}
				}
				if (void 0 === s) {
					const t =
						e instanceof ShadowRoot
							? "{container.host.localName}'s shadow root"
							: e instanceof DocumentFragment
							? 'DocumentFragment'
							: e.localName;
					console.error(
						`There should be exactly one root part in a render container, but we didn't find any in ${t}.`,
					);
				}
				e._$litPart$ = s;
			})(e, this.renderRoot, this.renderOptions);
		} else L(e, this.renderRoot, this.renderOptions);
	};
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = window,
	ht =
		at.ShadowRoot &&
		(void 0 === at.ShadyCSS ||
			at.ShadyCSS.nativeShadow) &&
		'adoptedStyleSheets' in Document.prototype &&
		'replace' in CSSStyleSheet.prototype,
	ct = Symbol(),
	dt = new WeakMap();
class ut {
	constructor(t, e, i) {
		if (((this._$cssResult$ = !0), i !== ct))
			throw Error(
				'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.',
			);
		(this.cssText = t), (this.t = e);
	}
	get styleSheet() {
		let t = this.o;
		const e = this.t;
		if (ht && void 0 === t) {
			const i = void 0 !== e && 1 === e.length;
			i && (t = dt.get(e)),
				void 0 === t &&
					((this.o = t =
						new CSSStyleSheet()).replaceSync(
						this.cssText,
					),
					i && dt.set(e, t));
		}
		return t;
	}
	toString() {
		return this.cssText;
	}
}
const pt = (t, ...e) => {
		const i =
			1 === t.length
				? t[0]
				: e.reduce(
						(e, i, s) =>
							e +
							((t) => {
								if (!0 === t._$cssResult$)
									return t.cssText;
								if ('number' == typeof t)
									return t;
								throw Error(
									"Value passed to 'css' function must be a 'css' function result: " +
										t +
										". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.",
								);
							})(i) +
							t[s + 1],
						t[0],
				  );
		return new ut(i, t, ct);
	},
	vt = ht
		? (t) => t
		: (t) =>
				t instanceof CSSStyleSheet
					? ((t) => {
							let e = '';
							for (const i of t.cssRules)
								e += i.cssText;
							return ((t) =>
								new ut(
									'string' == typeof t
										? t
										: t + '',
									void 0,
									ct,
								))(e);
					  })(t)
					: t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var ft;
const $t = window,
	_t = $t.trustedTypes,
	At = _t ? _t.emptyScript : '',
	yt = $t.reactiveElementPolyfillSupport,
	mt = {
		toAttribute(t, e) {
			switch (e) {
				case Boolean:
					t = t ? At : null;
					break;
				case Object:
				case Array:
					t = null == t ? t : JSON.stringify(t);
			}
			return t;
		},
		fromAttribute(t, e) {
			let i = t;
			switch (e) {
				case Boolean:
					i = null !== t;
					break;
				case Number:
					i = null === t ? null : Number(t);
					break;
				case Object:
				case Array:
					try {
						i = JSON.parse(t);
					} catch (t) {
						i = null;
					}
			}
			return i;
		},
	},
	gt = (t, e) => e !== t && (e == e || t == t),
	bt = {
		attribute: !0,
		type: String,
		converter: mt,
		reflect: !1,
		hasChanged: gt,
	},
	Et = 'finalized';
class St extends HTMLElement {
	constructor() {
		super(),
			(this._$Ei = new Map()),
			(this.isUpdatePending = !1),
			(this.hasUpdated = !1),
			(this._$El = null),
			this._$Eu();
	}
	static addInitializer(t) {
		var e;
		this.finalize(),
			(null !== (e = this.h) && void 0 !== e
				? e
				: (this.h = [])
			).push(t);
	}
	static get observedAttributes() {
		this.finalize();
		const t = [];
		return (
			this.elementProperties.forEach((e, i) => {
				const s = this._$Ep(i, e);
				void 0 !== s &&
					(this._$Ev.set(s, i), t.push(s));
			}),
			t
		);
	}
	static createProperty(t, e = bt) {
		if (
			(e.state && (e.attribute = !1),
			this.finalize(),
			this.elementProperties.set(t, e),
			!e.noAccessor &&
				!this.prototype.hasOwnProperty(t))
		) {
			const i =
					'symbol' == typeof t
						? Symbol()
						: '__' + t,
				s = this.getPropertyDescriptor(t, i, e);
			void 0 !== s &&
				Object.defineProperty(this.prototype, t, s);
		}
	}
	static getPropertyDescriptor(t, e, i) {
		return {
			get() {
				return this[e];
			},
			set(s) {
				const n = this[t];
				(this[e] = s), this.requestUpdate(t, n, i);
			},
			configurable: !0,
			enumerable: !0,
		};
	}
	static getPropertyOptions(t) {
		return this.elementProperties.get(t) || bt;
	}
	static finalize() {
		if (this.hasOwnProperty(Et)) return !1;
		this[Et] = !0;
		const t = Object.getPrototypeOf(this);
		if (
			(t.finalize(),
			void 0 !== t.h && (this.h = [...t.h]),
			(this.elementProperties = new Map(
				t.elementProperties,
			)),
			(this._$Ev = new Map()),
			this.hasOwnProperty('properties'))
		) {
			const t = this.properties,
				e = [
					...Object.getOwnPropertyNames(t),
					...Object.getOwnPropertySymbols(t),
				];
			for (const i of e) this.createProperty(i, t[i]);
		}
		return (
			(this.elementStyles = this.finalizeStyles(
				this.styles,
			)),
			!0
		);
	}
	static finalizeStyles(t) {
		const e = [];
		if (Array.isArray(t)) {
			const i = new Set(t.flat(1 / 0).reverse());
			for (const t of i) e.unshift(vt(t));
		} else void 0 !== t && e.push(vt(t));
		return e;
	}
	static _$Ep(t, e) {
		const i = e.attribute;
		return !1 === i
			? void 0
			: 'string' == typeof i
			? i
			: 'string' == typeof t
			? t.toLowerCase()
			: void 0;
	}
	_$Eu() {
		var t;
		(this._$E_ = new Promise(
			(t) => (this.enableUpdating = t),
		)),
			(this._$AL = new Map()),
			this._$Eg(),
			this.requestUpdate(),
			null === (t = this.constructor.h) ||
				void 0 === t ||
				t.forEach((t) => t(this));
	}
	addController(t) {
		var e, i;
		(null !== (e = this._$ES) && void 0 !== e
			? e
			: (this._$ES = [])
		).push(t),
			void 0 !== this.renderRoot &&
				this.isConnected &&
				(null === (i = t.hostConnected) ||
					void 0 === i ||
					i.call(t));
	}
	removeController(t) {
		var e;
		null === (e = this._$ES) ||
			void 0 === e ||
			e.splice(this._$ES.indexOf(t) >>> 0, 1);
	}
	_$Eg() {
		this.constructor.elementProperties.forEach(
			(t, e) => {
				this.hasOwnProperty(e) &&
					(this._$Ei.set(e, this[e]),
					delete this[e]);
			},
		);
	}
	createRenderRoot() {
		var t;
		const e =
			null !== (t = this.shadowRoot) && void 0 !== t
				? t
				: this.attachShadow(
						this.constructor.shadowRootOptions,
				  );
		return (
			((t, e) => {
				ht
					? (t.adoptedStyleSheets = e.map((t) =>
							t instanceof CSSStyleSheet
								? t
								: t.styleSheet,
					  ))
					: e.forEach((e) => {
							const i =
									document.createElement(
										'style',
									),
								s = at.litNonce;
							void 0 !== s &&
								i.setAttribute('nonce', s),
								(i.textContent = e.cssText),
								t.appendChild(i);
					  });
			})(e, this.constructor.elementStyles),
			e
		);
	}
	connectedCallback() {
		var t;
		void 0 === this.renderRoot &&
			(this.renderRoot = this.createRenderRoot()),
			this.enableUpdating(!0),
			null === (t = this._$ES) ||
				void 0 === t ||
				t.forEach((t) => {
					var e;
					return null === (e = t.hostConnected) ||
						void 0 === e
						? void 0
						: e.call(t);
				});
	}
	enableUpdating(t) {}
	disconnectedCallback() {
		var t;
		null === (t = this._$ES) ||
			void 0 === t ||
			t.forEach((t) => {
				var e;
				return null === (e = t.hostDisconnected) ||
					void 0 === e
					? void 0
					: e.call(t);
			});
	}
	attributeChangedCallback(t, e, i) {
		this._$AK(t, i);
	}
	_$EO(t, e, i = bt) {
		var s;
		const n = this.constructor._$Ep(t, i);
		if (void 0 !== n && !0 === i.reflect) {
			const r = (
				void 0 !==
				(null === (s = i.converter) || void 0 === s
					? void 0
					: s.toAttribute)
					? i.converter
					: mt
			).toAttribute(e, i.type);
			(this._$El = t),
				null == r
					? this.removeAttribute(n)
					: this.setAttribute(n, r),
				(this._$El = null);
		}
	}
	_$AK(t, e) {
		var i;
		const s = this.constructor,
			n = s._$Ev.get(t);
		if (void 0 !== n && this._$El !== n) {
			const t = s.getPropertyOptions(n),
				r =
					'function' == typeof t.converter
						? { fromAttribute: t.converter }
						: void 0 !==
						  (null === (i = t.converter) ||
						  void 0 === i
								? void 0
								: i.fromAttribute)
						? t.converter
						: mt;
			(this._$El = n),
				(this[n] = r.fromAttribute(e, t.type)),
				(this._$El = null);
		}
	}
	requestUpdate(t, e, i) {
		let s = !0;
		void 0 !== t &&
			((
				(i =
					i ||
					this.constructor.getPropertyOptions(t))
					.hasChanged || gt
			)(this[t], e)
				? (this._$AL.has(t) || this._$AL.set(t, e),
				  !0 === i.reflect &&
						this._$El !== t &&
						(void 0 === this._$EC &&
							(this._$EC = new Map()),
						this._$EC.set(t, i)))
				: (s = !1)),
			!this.isUpdatePending &&
				s &&
				(this._$E_ = this._$Ej());
	}
	async _$Ej() {
		this.isUpdatePending = !0;
		try {
			await this._$E_;
		} catch (t) {
			Promise.reject(t);
		}
		const t = this.scheduleUpdate();
		return (
			null != t && (await t), !this.isUpdatePending
		);
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		var t;
		if (!this.isUpdatePending) return;
		this.hasUpdated,
			this._$Ei &&
				(this._$Ei.forEach((t, e) => (this[e] = t)),
				(this._$Ei = void 0));
		let e = !1;
		const i = this._$AL;
		try {
			(e = this.shouldUpdate(i)),
				e
					? (this.willUpdate(i),
					  null === (t = this._$ES) ||
							void 0 === t ||
							t.forEach((t) => {
								var e;
								return null ===
									(e = t.hostUpdate) ||
									void 0 === e
									? void 0
									: e.call(t);
							}),
					  this.update(i))
					: this._$Ek();
		} catch (t) {
			throw ((e = !1), this._$Ek(), t);
		}
		e && this._$AE(i);
	}
	willUpdate(t) {}
	_$AE(t) {
		var e;
		null === (e = this._$ES) ||
			void 0 === e ||
			e.forEach((t) => {
				var e;
				return null === (e = t.hostUpdated) ||
					void 0 === e
					? void 0
					: e.call(t);
			}),
			this.hasUpdated ||
				((this.hasUpdated = !0),
				this.firstUpdated(t)),
			this.updated(t);
	}
	_$Ek() {
		(this._$AL = new Map()),
			(this.isUpdatePending = !1);
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$E_;
	}
	shouldUpdate(t) {
		return !0;
	}
	update(t) {
		void 0 !== this._$EC &&
			(this._$EC.forEach((t, e) =>
				this._$EO(e, this[e], t),
			),
			(this._$EC = void 0)),
			this._$Ek();
	}
	updated(t) {}
	firstUpdated(t) {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var wt, Ct;
(St[Et] = !0),
	(St.elementProperties = new Map()),
	(St.elementStyles = []),
	(St.shadowRootOptions = { mode: 'open' }),
	null == yt || yt({ ReactiveElement: St }),
	(null !== (ft = $t.reactiveElementVersions) &&
	void 0 !== ft
		? ft
		: ($t.reactiveElementVersions = [])
	).push('1.6.3');
class Pt extends St {
	constructor() {
		super(...arguments),
			(this.renderOptions = { host: this }),
			(this._$Do = void 0);
	}
	createRenderRoot() {
		var t, e;
		const i = super.createRenderRoot();
		return (
			(null !==
				(t = (e = this.renderOptions)
					.renderBefore) &&
				void 0 !== t) ||
				(e.renderBefore = i.firstChild),
			i
		);
	}
	update(t) {
		const e = this.render();
		this.hasUpdated ||
			(this.renderOptions.isConnected =
				this.isConnected),
			super.update(t),
			(this._$Do = L(
				e,
				this.renderRoot,
				this.renderOptions,
			));
	}
	connectedCallback() {
		var t;
		super.connectedCallback(),
			null === (t = this._$Do) ||
				void 0 === t ||
				t.setConnected(!0);
	}
	disconnectedCallback() {
		var t;
		super.disconnectedCallback(),
			null === (t = this._$Do) ||
				void 0 === t ||
				t.setConnected(!1);
	}
	render() {
		return b;
	}
}
(Pt.finalized = !0),
	(Pt._$litElement$ = !0),
	null === (wt = globalThis.litElementHydrateSupport) ||
		void 0 === wt ||
		wt.call(globalThis, { LitElement: Pt });
const xt = globalThis.litElementPolyfillSupport;
null == xt || xt({ LitElement: Pt }),
	(null !== (Ct = globalThis.litElementVersions) &&
	void 0 !== Ct
		? Ct
		: (globalThis.litElementVersions = [])
	).push('3.3.3');
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = (t) => (e) =>
		'function' == typeof e
			? ((t, e) => (customElements.define(t, e), e))(
					t,
					e,
			  )
			: ((t, e) => {
					const { kind: i, elements: s } = e;
					return {
						kind: i,
						elements: s,
						finisher(e) {
							customElements.define(t, e);
						},
					};
			  })(t, e),
	/**
	 * @license
	 * Copyright 2017 Google LLC
	 * SPDX-License-Identifier: BSD-3-Clause
	 */ Ut = (t, e) =>
		'method' === e.kind &&
		e.descriptor &&
		!('value' in e.descriptor)
			? {
					...e,
					finisher(i) {
						i.createProperty(e.key, t);
					},
			  }
			: {
					kind: 'field',
					key: Symbol(),
					placement: 'own',
					descriptor: {},
					originalKey: e.key,
					initializer() {
						'function' ==
							typeof e.initializer &&
							(this[e.key] =
								e.initializer.call(this));
					},
					finisher(i) {
						i.createProperty(e.key, t);
					},
			  };
function kt(t) {
	return (e, i) =>
		void 0 !== i
			? ((t, e, i) => {
					e.constructor.createProperty(i, t);
			  })(t, e, i)
			: Ut(t, e);
	/**
	 * @license
	 * Copyright 2017 Google LLC
	 * SPDX-License-Identifier: BSD-3-Clause
	 */
}
function Nt(t) {
	return kt({ ...t, state: !0 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const Ht =
	({ finisher: t, descriptor: e }) =>
	(i, s) => {
		var n;
		if (void 0 === s) {
			const s =
					null !== (n = i.originalKey) &&
					void 0 !== n
						? n
						: i.key,
				r =
					null != e
						? {
								kind: 'method',
								placement: 'prototype',
								key: s,
								descriptor: e(i.key),
						  }
						: { ...i, key: s };
			return (
				null != t &&
					(r.finisher = function (e) {
						t(e, s);
					}),
				r
			);
		}
		{
			const n = i.constructor;
			void 0 !== e &&
				Object.defineProperty(i, s, e(s)),
				null == t || t(n, s);
		}
	};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function Ot(t) {
	return Ht({
		finisher: (e, i) => {
			Object.assign(e.prototype[i], t);
		},
	});
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function Rt(t, e) {
	return Ht({
		descriptor: (i) => {
			const s = {
				get() {
					var e, i;
					return null !==
						(i =
							null ===
								(e = this.renderRoot) ||
							void 0 === e
								? void 0
								: e.querySelector(t)) &&
						void 0 !== i
						? i
						: null;
				},
				enumerable: !0,
				configurable: !0,
			};
			if (e) {
				const e =
					'symbol' == typeof i
						? Symbol()
						: '__' + i;
				s.get = function () {
					var i, s;
					return (
						void 0 === this[e] &&
							(this[e] =
								null !==
									(s =
										null ===
											(i =
												this
													.renderRoot) ||
										void 0 === i
											? void 0
											: i.querySelector(
													t,
											  )) &&
								void 0 !== s
									? s
									: null),
						this[e]
					);
				};
			}
			return s;
		},
	});
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function Mt(t) {
	return Ht({
		descriptor: (e) => ({
			async get() {
				var e;
				return (
					await this.updateComplete,
					null === (e = this.renderRoot) ||
					void 0 === e
						? void 0
						: e.querySelector(t)
				);
			},
			enumerable: !0,
			configurable: !0,
		}),
	});
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var It;
const jt =
	null !=
	(null === (It = window.HTMLSlotElement) || void 0 === It
		? void 0
		: It.prototype.assignedElements)
		? (t, e) => t.assignedElements(e)
		: (t, e) =>
				t
					.assignedNodes(e)
					.filter(
						(t) =>
							t.nodeType ===
							Node.ELEMENT_NODE,
					);
function Dt(t) {
	const { slot: e, selector: i } = null != t ? t : {};
	return Ht({
		descriptor: (s) => ({
			get() {
				var s;
				const n =
						'slot' +
						(e
							? `[name=${e}]`
							: ':not([name])'),
					r =
						null === (s = this.renderRoot) ||
						void 0 === s
							? void 0
							: s.querySelector(n),
					o = null != r ? jt(r, t) : [];
				return i
					? o.filter((t) => t.matches(i))
					: o;
			},
			enumerable: !0,
			configurable: !0,
		}),
	});
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function Lt(t, e, i) {
	let s,
		n = t;
	return (
		'object' == typeof t
			? ((n = t.slot), (s = t))
			: (s = { flatten: e }),
		i
			? Dt({ slot: n, flatten: e, selector: i })
			: Ht({
					descriptor: (t) => ({
						get() {
							var t, e;
							const i =
									'slot' +
									(n
										? `[name=${n}]`
										: ':not([name])'),
								r =
									null ===
										(t =
											this
												.renderRoot) ||
									void 0 === t
										? void 0
										: t.querySelector(
												i,
										  );
							return null !==
								(e =
									null == r
										? void 0
										: r.assignedNodes(
												s,
										  )) && void 0 !== e
								? e
								: [];
						},
						enumerable: !0,
						configurable: !0,
					}),
			  })
	);
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const Bt = V(
		class extends W {
			constructor(t) {
				var e;
				if (
					(super(t),
					1 !== t.type ||
						'style' !== t.name ||
						(null === (e = t.strings) ||
						void 0 === e
							? void 0
							: e.length) > 2)
				)
					throw Error(
						'The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.',
					);
			}
			render(t) {
				return Object.keys(t).reduce((e, i) => {
					const s = t[i];
					return null == s
						? e
						: e +
								`${(i = i.includes('-')
									? i
									: i
											.replace(
												/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,
												'-$&',
											)
											.toLowerCase())}:${s};`;
				}, '');
			}
			update(t, [e]) {
				const { style: i } = t.element;
				if (void 0 === this.ht) {
					this.ht = new Set();
					for (const t in e) this.ht.add(t);
					return this.render(e);
				}
				this.ht.forEach((t) => {
					null == e[t] &&
						(this.ht.delete(t),
						t.includes('-')
							? i.removeProperty(t)
							: (i[t] = ''));
				});
				for (const t in e) {
					const s = e[t];
					if (null != s) {
						this.ht.add(t);
						const e =
							'string' == typeof s &&
							s.endsWith(' !important');
						t.includes('-') || e
							? i.setProperty(
									t,
									e ? s.slice(0, -11) : s,
									e ? 'important' : '',
							  )
							: (i[t] = s);
					}
				}
				return b;
			}
		},
	),
	zt = (t) => (null != t ? t : E),
	/**
	 * @license
	 * Copyright 2018 Google LLC
	 * SPDX-License-Identifier: BSD-3-Clause
	 */ Vt = V(
		class extends W {
			constructor(t) {
				var e;
				if (
					(super(t),
					1 !== t.type ||
						'class' !== t.name ||
						(null === (e = t.strings) ||
						void 0 === e
							? void 0
							: e.length) > 2)
				)
					throw Error(
						'`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.',
					);
			}
			render(t) {
				return (
					' ' +
					Object.keys(t)
						.filter((e) => t[e])
						.join(' ') +
					' '
				);
			}
			update(t, [e]) {
				var i, s;
				if (void 0 === this.it) {
					(this.it = new Set()),
						void 0 !== t.strings &&
							(this.nt = new Set(
								t.strings
									.join(' ')
									.split(/\s/)
									.filter(
										(t) => '' !== t,
									),
							));
					for (const t in e)
						e[t] &&
							!(null === (i = this.nt) ||
							void 0 === i
								? void 0
								: i.has(t)) &&
							this.it.add(t);
					return this.render(e);
				}
				const n = t.element.classList;
				this.it.forEach((t) => {
					t in e ||
						(n.remove(t), this.it.delete(t));
				});
				for (const t in e) {
					const i = !!e[t];
					i === this.it.has(t) ||
						(null === (s = this.nt) ||
						void 0 === s
							? void 0
							: s.has(t)) ||
						(i
							? (n.add(t), this.it.add(t))
							: (n.remove(t),
							  this.it.delete(t)));
				}
				return b;
			}
		},
	),
	Wt = V(
		class extends W {
			constructor(t) {
				if (
					(super(t),
					3 !== t.type &&
						1 !== t.type &&
						4 !== t.type)
				)
					throw Error(
						'The `live` directive is not allowed on child or event bindings',
					);
				if (!F(t))
					throw Error(
						'`live` bindings can only contain a single expression',
					);
			}
			render(t) {
				return t;
			}
			update(t, [e]) {
				if (e === b || e === E) return e;
				const i = t.element,
					s = t.name;
				if (3 === t.type) {
					if (e === i[s]) return b;
				} else if (4 === t.type) {
					if (!!e === i.hasAttribute(s)) return b;
				} else if (
					1 === t.type &&
					i.getAttribute(s) === e + ''
				)
					return b;
				return J(t), e;
			}
		},
	);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function qt(t, e, i) {
	return t ? e() : null == i ? void 0 : i();
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const Ft = {},
	Kt = V(
		class extends W {
			constructor() {
				super(...arguments), (this.st = Ft);
			}
			render(t, e) {
				return e();
			}
			update(t, [e, i]) {
				if (Array.isArray(e)) {
					if (
						Array.isArray(this.st) &&
						this.st.length === e.length &&
						e.every((t, e) => t === this.st[e])
					)
						return b;
				} else if (this.st === e) return b;
				return (
					(this.st = Array.isArray(e)
						? Array.from(e)
						: e),
					this.render(e, i)
				);
			}
		},
	),
	Gt = (t, e) => {
		var i, s;
		const n = t._$AN;
		if (void 0 === n) return !1;
		for (const t of n)
			null === (s = (i = t)._$AO) ||
				void 0 === s ||
				s.call(i, e, !1),
				Gt(t, e);
		return !0;
	},
	Qt = (t) => {
		let e, i;
		do {
			if (void 0 === (e = t._$AM)) break;
			(i = e._$AN), i.delete(t), (t = e);
		} while (0 === (null == i ? void 0 : i.size));
	},
	Zt = (t) => {
		for (let e; (e = t._$AM); t = e) {
			let i = e._$AN;
			if (void 0 === i) e._$AN = i = new Set();
			else if (i.has(t)) break;
			i.add(t), Xt(e);
		}
	};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function Jt(t) {
	void 0 !== this._$AN
		? (Qt(this), (this._$AM = t), Zt(this))
		: (this._$AM = t);
}
function Yt(t, e = !1, i = 0) {
	const s = this._$AH,
		n = this._$AN;
	if (void 0 !== n && 0 !== n.size)
		if (e)
			if (Array.isArray(s))
				for (let t = i; t < s.length; t++)
					Gt(s[t], !1), Qt(s[t]);
			else null != s && (Gt(s, !1), Qt(s));
		else Gt(this, t);
}
const Xt = (t) => {
	var e, i, s, n;
	2 == t.type &&
		((null !== (e = (s = t)._$AP) && void 0 !== e) ||
			(s._$AP = Yt),
		(null !== (i = (n = t)._$AQ) && void 0 !== i) ||
			(n._$AQ = Jt));
};
class te extends W {
	constructor() {
		super(...arguments), (this._$AN = void 0);
	}
	_$AT(t, e, i) {
		super._$AT(t, e, i),
			Zt(this),
			(this.isConnected = t._$AU);
	}
	_$AO(t, e = !0) {
		var i, s;
		t !== this.isConnected &&
			((this.isConnected = t),
			t
				? null === (i = this.reconnected) ||
				  void 0 === i ||
				  i.call(this)
				: null === (s = this.disconnected) ||
				  void 0 === s ||
				  s.call(this)),
			e && (Gt(this, t), Qt(this));
	}
	setValue(t) {
		if (F(this._$Ct)) this._$Ct._$AI(t, this);
		else {
			const e = [...this._$Ct._$AH];
			(e[this._$Ci] = t), this._$Ct._$AI(e, this, 0);
		}
	}
	disconnected() {}
	reconnected() {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const ee = (t, e, i) => {
		const s = new Map();
		for (let n = e; n <= i; n++) s.set(t[n], n);
		return s;
	},
	ie = V(
		class extends W {
			constructor(t) {
				if ((super(t), 2 !== t.type))
					throw Error(
						'repeat() can only be used in text expressions',
					);
			}
			ct(t, e, i) {
				let s;
				void 0 === i
					? (i = e)
					: void 0 !== e && (s = e);
				const n = [],
					r = [];
				let o = 0;
				for (const e of t)
					(n[o] = s ? s(e, o) : o),
						(r[o] = i(e, o)),
						o++;
				return { values: r, keys: n };
			}
			render(t, e, i) {
				return this.ct(t, e, i).values;
			}
			update(t, [e, i, s]) {
				var n;
				const r = ((t) => t._$AH)(t),
					{ values: o, keys: l } = this.ct(
						e,
						i,
						s,
					);
				if (!Array.isArray(r))
					return (this.ut = l), o;
				const a =
						null !== (n = this.ut) &&
						void 0 !== n
							? n
							: (this.ut = []),
					h = [];
				let c,
					d,
					u = 0,
					p = r.length - 1,
					v = 0,
					f = o.length - 1;
				for (; u <= p && v <= f; )
					if (null === r[u]) u++;
					else if (null === r[p]) p--;
					else if (a[u] === l[v])
						(h[v] = Q(r[u], o[v])), u++, v++;
					else if (a[p] === l[f])
						(h[f] = Q(r[p], o[f])), p--, f--;
					else if (a[u] === l[f])
						(h[f] = Q(r[u], o[f])),
							G(t, h[f + 1], r[u]),
							u++,
							f--;
					else if (a[p] === l[v])
						(h[v] = Q(r[p], o[v])),
							G(t, r[u], r[p]),
							p--,
							v++;
					else if (
						(void 0 === c &&
							((c = ee(l, v, f)),
							(d = ee(a, u, p))),
						c.has(a[u]))
					)
						if (c.has(a[p])) {
							const e = d.get(l[v]),
								i =
									void 0 !== e
										? r[e]
										: null;
							if (null === i) {
								const e = G(t, r[u]);
								Q(e, o[v]), (h[v] = e);
							} else
								(h[v] = Q(i, o[v])),
									G(t, r[u], i),
									(r[e] = null);
							v++;
						} else Y(r[p]), p--;
					else Y(r[u]), u++;
				for (; v <= f; ) {
					const e = G(t, h[f + 1]);
					Q(e, o[v]), (h[v++] = e);
				}
				for (; u <= p; ) {
					const t = r[u++];
					null !== t && Y(t);
				}
				return (this.ut = l), J(t, h), b;
			}
		},
	);
export {
	E as A,
	L as D,
	Rt as a,
	Mt as b,
	Ot as c,
	Vt as d,
	Tt as e,
	Lt as f,
	V as g,
	W as h,
	pt as i,
	z as j,
	Wt as k,
	zt as l,
	qt as m,
	kt as n,
	Bt as o,
	Kt as p,
	te as q,
	gt as r,
	Pt as s,
	Nt as t,
	Dt as u,
	ie as v,
	g as x,
};
