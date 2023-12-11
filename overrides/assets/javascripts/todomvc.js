class ql extends HTMLElement {
	constructor() {
		super(),
			(this.shadow = this.attachShadow({
				mode: 'open',
			}));
	}
	connectedCallback() {
		this.shadow.innerHTML = `
      <p>Hello from a web component!</p>
      <style>
        p {
          color: pink;
          font-weight: bold;
          padding: 1rem;
          border: 4px solid pink;
        }
      </style>

    `;
	}
}
customElements.define('my-component', ql);
var Jl = Object.defineProperty,
	Kl = (t, e, n) =>
		e in t
			? Jl(t, e, {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: n,
			  })
			: (t[e] = n),
	ht = (t, e, n) => (
		Kl(t, typeof e != 'symbol' ? e + '' : e, n), n
	);
(function () {
	const t = document.createElement('link').relList;
	if (t && t.supports && t.supports('modulepreload'))
		return;
	for (const o of document.querySelectorAll(
		'link[rel="modulepreload"]',
	))
		n(o);
	new MutationObserver((o) => {
		for (const r of o)
			if (r.type === 'childList')
				for (const s of r.addedNodes)
					s.tagName === 'LINK' &&
						s.rel === 'modulepreload' &&
						n(s);
	}).observe(document, { childList: !0, subtree: !0 });
	function e(o) {
		const r = {};
		return (
			o.integrity && (r.integrity = o.integrity),
			o.referrerpolicy &&
				(r.referrerPolicy = o.referrerpolicy),
			o.crossorigin === 'use-credentials'
				? (r.credentials = 'include')
				: o.crossorigin === 'anonymous'
				? (r.credentials = 'omit')
				: (r.credentials = 'same-origin'),
			r
		);
	}
	function n(o) {
		if (o.ep) return;
		o.ep = !0;
		const r = e(o);
		fetch(o.href, r);
	}
})();
var Rn,
	k,
	ks,
	Yt,
	hr,
	Ss,
	go,
	Ue = {},
	Cs = [],
	Gl =
		/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
	jn = Array.isArray;
function It(t, e) {
	for (var n in e) t[n] = e[n];
	return t;
}
function Es(t) {
	var e = t.parentNode;
	e && e.removeChild(t);
}
function $n(t, e, n) {
	var o,
		r,
		s,
		l = {};
	for (s in e)
		s == 'key'
			? (o = e[s])
			: s == 'ref'
			? (r = e[s])
			: (l[s] = e[s]);
	if (
		(arguments.length > 2 &&
			(l.children =
				arguments.length > 3
					? Rn.call(arguments, 2)
					: n),
		typeof t == 'function' && t.defaultProps != null)
	)
		for (s in t.defaultProps)
			l[s] === void 0 && (l[s] = t.defaultProps[s]);
	return fn(t, l, o, r, null);
}
function fn(t, e, n, o, r) {
	var s = {
		type: t,
		props: e,
		key: n,
		ref: o,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__d: void 0,
		__c: null,
		constructor: void 0,
		__v: r ?? ++ks,
		__i: -1,
		__u: 0,
	};
	return r == null && k.vnode != null && k.vnode(s), s;
}
function re(t) {
	return t.children;
}
function Mt(t, e) {
	(this.props = t), (this.context = e);
}
function me(t, e) {
	if (e == null) return t.__ ? me(t.__, t.__i + 1) : null;
	for (var n; e < t.__k.length; e++)
		if ((n = t.__k[e]) != null && n.__e != null)
			return n.__e;
	return typeof t.type == 'function' ? me(t) : null;
}
function Ps(t) {
	var e, n;
	if ((t = t.__) != null && t.__c != null) {
		for (
			t.__e = t.__c.base = null, e = 0;
			e < t.__k.length;
			e++
		)
			if ((n = t.__k[e]) != null && n.__e != null) {
				t.__e = t.__c.base = n.__e;
				break;
			}
		return Ps(t);
	}
}
function vr(t) {
	((!t.__d && (t.__d = !0) && Yt.push(t) && !xn.__r++) ||
		hr !== k.debounceRendering) &&
		((hr = k.debounceRendering) || Ss)(xn);
}
function xn() {
	var t, e, n, o, r, s, l, i, c;
	for (Yt.sort(go); (t = Yt.shift()); )
		t.__d &&
			((e = Yt.length),
			(o = void 0),
			(s = (r = (n = t).__v).__e),
			(i = []),
			(c = []),
			(l = n.__P) &&
				(((o = It({}, r)).__v = r.__v + 1),
				k.vnode && k.vnode(o),
				Vo(
					l,
					o,
					r,
					n.__n,
					l.ownerSVGElement !== void 0,
					32 & r.__u ? [s] : null,
					i,
					s ?? me(r),
					!!(32 & r.__u),
					c,
				),
				(o.__.__k[o.__i] = o),
				Ts(i, o, c),
				o.__e != s && Ps(o)),
			Yt.length > e && Yt.sort(go));
	xn.__r = 0;
}
function As(t, e, n, o, r, s, l, i, c, u, _) {
	var a,
		v,
		h,
		O,
		C,
		N = (o && o.__k) || Cs,
		j = e.length;
	for (
		n.__d = c, Zl(n, e, N), c = n.__d, a = 0;
		a < j;
		a++
	)
		(h = n.__k[a]) != null &&
			typeof h != 'boolean' &&
			typeof h != 'function' &&
			((v = h.__i === -1 ? Ue : N[h.__i] || Ue),
			(h.__i = a),
			Vo(t, h, v, r, s, l, i, c, u, _),
			(O = h.__e),
			h.ref &&
				v.ref != h.ref &&
				(v.ref && Do(v.ref, null, h),
				_.push(h.ref, h.__c || O, h)),
			C == null && O != null && (C = O),
			65536 & h.__u || v.__k === h.__k
				? (c = Os(h, c, t))
				: typeof h.type == 'function' &&
				  h.__d !== void 0
				? (c = h.__d)
				: O && (c = O.nextSibling),
			(h.__d = void 0),
			(h.__u &= -196609));
	(n.__d = c), (n.__e = C);
}
function Zl(t, e, n) {
	var o,
		r,
		s,
		l,
		i,
		c = e.length,
		u = n.length,
		_ = u,
		a = 0;
	for (t.__k = [], o = 0; o < c; o++)
		(r = t.__k[o] =
			(r = e[o]) == null ||
			typeof r == 'boolean' ||
			typeof r == 'function'
				? null
				: typeof r == 'string' ||
				  typeof r == 'number' ||
				  typeof r == 'bigint' ||
				  r.constructor == String
				? fn(null, r, null, null, r)
				: jn(r)
				? fn(re, { children: r }, null, null, null)
				: r.__b > 0
				? fn(
						r.type,
						r.props,
						r.key,
						r.ref ? r.ref : null,
						r.__v,
				  )
				: r) != null
			? ((r.__ = t),
			  (r.__b = t.__b + 1),
			  (i = Yl(r, n, (l = o + a), _)),
			  (r.__i = i),
			  (s = null),
			  i !== -1 &&
					(_--, (s = n[i]) && (s.__u |= 131072)),
			  s == null || s.__v === null
					? (i == -1 && a--,
					  typeof r.type != 'function' &&
							(r.__u |= 65536))
					: i !== l &&
					  (i === l + 1
							? a++
							: i > l
							? _ > c - l
								? (a += i - l)
								: a--
							: (a =
									i < l && i == l - 1
										? i - l
										: 0),
					  i !== o + a && (r.__u |= 65536)))
			: (s = n[o]) &&
			  s.key == null &&
			  s.__e &&
			  (s.__e == t.__d && (t.__d = me(s)),
			  mo(s, s, !1),
			  (n[o] = null),
			  _--);
	if (_)
		for (o = 0; o < u; o++)
			(s = n[o]) != null &&
				!(131072 & s.__u) &&
				(s.__e == t.__d && (t.__d = me(s)),
				mo(s, s));
}
function Os(t, e, n) {
	var o, r;
	if (typeof t.type == 'function') {
		for (o = t.__k, r = 0; o && r < o.length; r++)
			o[r] && ((o[r].__ = t), (e = Os(o[r], e, n)));
		return e;
	}
	return (
		t.__e != e &&
			(n.insertBefore(t.__e, e || null), (e = t.__e)),
		e && e.nextSibling
	);
}
function wn(t, e) {
	return (
		(e = e || []),
		t == null ||
			typeof t == 'boolean' ||
			(jn(t)
				? t.some(function (n) {
						wn(n, e);
				  })
				: e.push(t)),
		e
	);
}
function Yl(t, e, n, o) {
	var r = t.key,
		s = t.type,
		l = n - 1,
		i = n + 1,
		c = e[n];
	if (c === null || (c && r == c.key && s === c.type))
		return n;
	if (o > (c != null && !(131072 & c.__u) ? 1 : 0))
		for (; l >= 0 || i < e.length; ) {
			if (l >= 0) {
				if (
					(c = e[l]) &&
					!(131072 & c.__u) &&
					r == c.key &&
					s === c.type
				)
					return l;
				l--;
			}
			if (i < e.length) {
				if (
					(c = e[i]) &&
					!(131072 & c.__u) &&
					r == c.key &&
					s === c.type
				)
					return i;
				i++;
			}
		}
	return -1;
}
function gr(t, e, n) {
	e[0] === '-'
		? t.setProperty(e, n ?? '')
		: (t[e] =
				n == null
					? ''
					: typeof n != 'number' || Gl.test(e)
					? n
					: n + 'px');
}
function Xe(t, e, n, o, r) {
	var s;
	t: if (e === 'style')
		if (typeof n == 'string') t.style.cssText = n;
		else {
			if (
				(typeof o == 'string' &&
					(t.style.cssText = o = ''),
				o)
			)
				for (e in o)
					(n && e in n) || gr(t.style, e, '');
			if (n)
				for (e in n)
					(o && n[e] === o[e]) ||
						gr(t.style, e, n[e]);
		}
	else if (e[0] === 'o' && e[1] === 'n')
		(s =
			e !==
			(e = e.replace(
				/(PointerCapture)$|Capture$/,
				'$1',
			))),
			(e =
				e.toLowerCase() in t
					? e.toLowerCase().slice(2)
					: e.slice(2)),
			t.l || (t.l = {}),
			(t.l[e + s] = n),
			n
				? o
					? (n.u = o.u)
					: ((n.u = Date.now()),
					  t.addEventListener(e, s ? yr : mr, s))
				: t.removeEventListener(e, s ? yr : mr, s);
	else {
		if (r)
			e = e
				.replace(/xlink(H|:h)/, 'h')
				.replace(/sName$/, 's');
		else if (
			e !== 'width' &&
			e !== 'height' &&
			e !== 'href' &&
			e !== 'list' &&
			e !== 'form' &&
			e !== 'tabIndex' &&
			e !== 'download' &&
			e !== 'rowSpan' &&
			e !== 'colSpan' &&
			e !== 'role' &&
			e in t
		)
			try {
				t[e] = n ?? '';
				break t;
			} catch {}
		typeof n == 'function' ||
			(n == null || (n === !1 && e[4] !== '-')
				? t.removeAttribute(e)
				: t.setAttribute(e, n));
	}
}
function mr(t) {
	var e = this.l[t.type + !1];
	if (t.t) {
		if (t.t <= e.u) return;
	} else t.t = Date.now();
	return e(k.event ? k.event(t) : t);
}
function yr(t) {
	return this.l[t.type + !0](k.event ? k.event(t) : t);
}
function Vo(t, e, n, o, r, s, l, i, c, u) {
	var _,
		a,
		v,
		h,
		O,
		C,
		N,
		j,
		F,
		L,
		A,
		st,
		Ht,
		Pt,
		_t,
		Q = e.type;
	if (e.constructor !== void 0) return null;
	128 & n.__u &&
		((c = !!(32 & n.__u)), (s = [(i = e.__e = n.__e)])),
		(_ = k.__b) && _(e);
	t: if (typeof Q == 'function')
		try {
			if (
				((j = e.props),
				(F = (_ = Q.contextType) && o[_.__c]),
				(L = _ ? (F ? F.props.value : _.__) : o),
				n.__c
					? (N = (a = e.__c = n.__c).__ = a.__E)
					: ('prototype' in Q &&
					  Q.prototype.render
							? (e.__c = a = new Q(j, L))
							: ((e.__c = a = new Mt(j, L)),
							  (a.constructor = Q),
							  (a.render = Ql)),
					  F && F.sub(a),
					  (a.props = j),
					  a.state || (a.state = {}),
					  (a.context = L),
					  (a.__n = o),
					  (v = a.__d = !0),
					  (a.__h = []),
					  (a._sb = [])),
				a.__s == null && (a.__s = a.state),
				Q.getDerivedStateFromProps != null &&
					(a.__s == a.state &&
						(a.__s = It({}, a.__s)),
					It(
						a.__s,
						Q.getDerivedStateFromProps(
							j,
							a.__s,
						),
					)),
				(h = a.props),
				(O = a.state),
				(a.__v = e),
				v)
			)
				Q.getDerivedStateFromProps == null &&
					a.componentWillMount != null &&
					a.componentWillMount(),
					a.componentDidMount != null &&
						a.__h.push(a.componentDidMount);
			else {
				if (
					(Q.getDerivedStateFromProps == null &&
						j !== h &&
						a.componentWillReceiveProps !=
							null &&
						a.componentWillReceiveProps(j, L),
					!a.__e &&
						((a.shouldComponentUpdate != null &&
							a.shouldComponentUpdate(
								j,
								a.__s,
								L,
							) === !1) ||
							e.__v === n.__v))
				) {
					for (
						e.__v !== n.__v &&
							((a.props = j),
							(a.state = a.__s),
							(a.__d = !1)),
							e.__e = n.__e,
							e.__k = n.__k,
							e.__k.forEach(function (pt) {
								pt && (pt.__ = e);
							}),
							A = 0;
						A < a._sb.length;
						A++
					)
						a.__h.push(a._sb[A]);
					(a._sb = []), a.__h.length && l.push(a);
					break t;
				}
				a.componentWillUpdate != null &&
					a.componentWillUpdate(j, a.__s, L),
					a.componentDidUpdate != null &&
						a.__h.push(function () {
							a.componentDidUpdate(h, O, C);
						});
			}
			if (
				((a.context = L),
				(a.props = j),
				(a.__P = t),
				(a.__e = !1),
				(st = k.__r),
				(Ht = 0),
				'prototype' in Q && Q.prototype.render)
			) {
				for (
					a.state = a.__s,
						a.__d = !1,
						st && st(e),
						_ = a.render(
							a.props,
							a.state,
							a.context,
						),
						Pt = 0;
					Pt < a._sb.length;
					Pt++
				)
					a.__h.push(a._sb[Pt]);
				a._sb = [];
			} else
				do
					(a.__d = !1),
						st && st(e),
						(_ = a.render(
							a.props,
							a.state,
							a.context,
						)),
						(a.state = a.__s);
				while (a.__d && ++Ht < 25);
			(a.state = a.__s),
				a.getChildContext != null &&
					(o = It(
						It({}, o),
						a.getChildContext(),
					)),
				v ||
					a.getSnapshotBeforeUpdate == null ||
					(C = a.getSnapshotBeforeUpdate(h, O)),
				As(
					t,
					jn(
						(_t =
							_ != null &&
							_.type === re &&
							_.key == null
								? _.props.children
								: _),
					)
						? _t
						: [_t],
					e,
					n,
					o,
					r,
					s,
					l,
					i,
					c,
					u,
				),
				(a.base = e.__e),
				(e.__u &= -161),
				a.__h.length && l.push(a),
				N && (a.__E = a.__ = null);
		} catch (pt) {
			(e.__v = null),
				c || s != null
					? ((e.__e = i),
					  (e.__u |= c ? 160 : 32),
					  (s[s.indexOf(i)] = null))
					: ((e.__e = n.__e), (e.__k = n.__k)),
				k.__e(pt, e, n);
		}
	else
		s == null && e.__v === n.__v
			? ((e.__k = n.__k), (e.__e = n.__e))
			: (e.__e = Xl(n.__e, e, n, o, r, s, l, c, u));
	(_ = k.diffed) && _(e);
}
function Ts(t, e, n) {
	e.__d = void 0;
	for (var o = 0; o < n.length; o++)
		Do(n[o], n[++o], n[++o]);
	k.__c && k.__c(e, t),
		t.some(function (r) {
			try {
				(t = r.__h),
					(r.__h = []),
					t.some(function (s) {
						s.call(r);
					});
			} catch (s) {
				k.__e(s, r.__v);
			}
		});
}
function Xl(t, e, n, o, r, s, l, i, c) {
	var u,
		_,
		a,
		v,
		h,
		O,
		C,
		N = n.props,
		j = e.props,
		F = e.type;
	if ((F === 'svg' && (r = !0), s != null)) {
		for (u = 0; u < s.length; u++)
			if (
				(h = s[u]) &&
				'setAttribute' in h == !!F &&
				(F ? h.localName === F : h.nodeType === 3)
			) {
				(t = h), (s[u] = null);
				break;
			}
	}
	if (t == null) {
		if (F === null) return document.createTextNode(j);
		(t = r
			? document.createElementNS(
					'http://www.w3.org/2000/svg',
					F,
			  )
			: document.createElement(F, j.is && j)),
			(s = null),
			(i = !1);
	}
	if (F === null)
		N === j || (i && t.data === j) || (t.data = j);
	else {
		if (
			((s = s && Rn.call(t.childNodes)),
			(N = n.props || Ue),
			!i && s != null)
		)
			for (
				N = {}, u = 0;
				u < t.attributes.length;
				u++
			)
				N[(h = t.attributes[u]).name] = h.value;
		for (u in N)
			(h = N[u]),
				u == 'children' ||
					(u == 'dangerouslySetInnerHTML'
						? (a = h)
						: u === 'key' ||
						  u in j ||
						  Xe(t, u, null, h, r));
		for (u in j)
			(h = j[u]),
				u == 'children'
					? (v = h)
					: u == 'dangerouslySetInnerHTML'
					? (_ = h)
					: u == 'value'
					? (O = h)
					: u == 'checked'
					? (C = h)
					: u === 'key' ||
					  (i && typeof h != 'function') ||
					  N[u] === h ||
					  Xe(t, u, h, N[u], r);
		if (_)
			i ||
				(a &&
					(_.__html === a.__html ||
						_.__html === t.innerHTML)) ||
				(t.innerHTML = _.__html),
				(e.__k = []);
		else if (
			(a && (t.innerHTML = ''),
			As(
				t,
				jn(v) ? v : [v],
				e,
				n,
				o,
				r && F !== 'foreignObject',
				s,
				l,
				s ? s[0] : n.__k && me(n, 0),
				i,
				c,
			),
			s != null)
		)
			for (u = s.length; u--; )
				s[u] != null && Es(s[u]);
		i ||
			((u = 'value'),
			O !== void 0 &&
				(O !== t[u] ||
					(F === 'progress' && !O) ||
					(F === 'option' && O !== N[u])) &&
				Xe(t, u, O, N[u], !1),
			(u = 'checked'),
			C !== void 0 &&
				C !== t[u] &&
				Xe(t, u, C, N[u], !1));
	}
	return t;
}
function Do(t, e, n) {
	try {
		typeof t == 'function' ? t(e) : (t.current = e);
	} catch (o) {
		k.__e(o, n);
	}
}
function mo(t, e, n) {
	var o, r;
	if (
		(k.unmount && k.unmount(t),
		(o = t.ref) &&
			((o.current && o.current !== t.__e) ||
				Do(o, null, e)),
		(o = t.__c) != null)
	) {
		if (o.componentWillUnmount)
			try {
				o.componentWillUnmount();
			} catch (s) {
				k.__e(s, e);
			}
		(o.base = o.__P = null), (t.__c = void 0);
	}
	if ((o = t.__k))
		for (r = 0; r < o.length; r++)
			o[r] &&
				mo(
					o[r],
					e,
					n || typeof t.type != 'function',
				);
	n || t.__e == null || Es(t.__e),
		(t.__ = t.__e = t.__d = void 0);
}
function Ql(t, e, n) {
	return this.constructor(t, n);
}
function ti(t, e, n) {
	var o, r, s, l;
	k.__ && k.__(t, e),
		(r = (o = typeof n == 'function')
			? null
			: (n && n.__k) || e.__k),
		(s = []),
		(l = []),
		Vo(
			e,
			(t = ((!o && n) || e).__k = $n(re, null, [t])),
			r || Ue,
			Ue,
			e.ownerSVGElement !== void 0,
			!o && n
				? [n]
				: r
				? null
				: e.firstChild
				? Rn.call(e.childNodes)
				: null,
			s,
			!o && n ? n : r ? r.__e : e.firstChild,
			o,
			l,
		),
		Ts(s, t, l);
}
(Rn = Cs.slice),
	(k = {
		__e: function (t, e, n, o) {
			for (var r, s, l; (e = e.__); )
				if ((r = e.__c) && !r.__)
					try {
						if (
							((s = r.constructor) &&
								s.getDerivedStateFromError !=
									null &&
								(r.setState(
									s.getDerivedStateFromError(
										t,
									),
								),
								(l = r.__d)),
							r.componentDidCatch != null &&
								(r.componentDidCatch(
									t,
									o || {},
								),
								(l = r.__d)),
							l)
						)
							return (r.__E = r);
					} catch (i) {
						t = i;
					}
			throw t;
		},
	}),
	(ks = 0),
	(Mt.prototype.setState = function (t, e) {
		var n;
		(n =
			this.__s != null && this.__s !== this.state
				? this.__s
				: (this.__s = It({}, this.state))),
			typeof t == 'function' &&
				(t = t(It({}, n), this.props)),
			t && It(n, t),
			t != null &&
				this.__v &&
				(e && this._sb.push(e), vr(this));
	}),
	(Mt.prototype.forceUpdate = function (t) {
		this.__v &&
			((this.__e = !0),
			t && this.__h.push(t),
			vr(this));
	}),
	(Mt.prototype.render = re),
	(Yt = []),
	(Ss =
		typeof Promise == 'function'
			? Promise.prototype.then.bind(Promise.resolve())
			: setTimeout),
	(go = function (t, e) {
		return t.__v.__b - e.__v.__b;
	}),
	(xn.__r = 0);
let ot = [],
	yo = (t, e) => {
		let n = [],
			o = {
				get() {
					return (
						o.lc || o.listen(() => {})(),
						o.value
					);
				},
				l: e || 0,
				lc: 0,
				listen(r, s) {
					return (
						(o.lc = n.push(r, s || o.l) / 2),
						() => {
							let l = n.indexOf(r);
							~l &&
								(n.splice(l, 2),
								--o.lc || o.off());
						}
					);
				},
				notify(r) {
					let s = !ot.length;
					for (let l = 0; l < n.length; l += 2)
						ot.push(n[l], n[l + 1], o.value, r);
					if (s) {
						for (
							let l = 0;
							l < ot.length;
							l += 4
						) {
							let i;
							for (
								let c = l + 1;
								!i && (c += 4) < ot.length;

							)
								ot[c] < ot[l + 1] &&
									(i = ot.push(
										ot[l],
										ot[l + 1],
										ot[l + 2],
										ot[l + 3],
									));
							i ||
								ot[l](ot[l + 2], ot[l + 3]);
						}
						ot.length = 0;
					}
				},
				off() {},
				set(r) {
					o.value !== r &&
						((o.value = r), o.notify());
				},
				subscribe(r, s) {
					let l = o.listen(r, s);
					return r(o.value), l;
				},
				value: t,
			};
		return o;
	};
const ei = 5,
	Qe = 6,
	tn = 10;
let ni = (t, e, n, o) => (
		(t.events = t.events || {}),
		t.events[n + tn] ||
			(t.events[n + tn] = o((r) => {
				t.events[n].reduceRight(
					(s, l) => (l(s), s),
					{ shared: {}, ...r },
				);
			})),
		(t.events[n] = t.events[n] || []),
		t.events[n].push(e),
		() => {
			let r = t.events[n],
				s = r.indexOf(e);
			r.splice(s, 1),
				r.length ||
					(delete t.events[n],
					t.events[n + tn](),
					delete t.events[n + tn]);
		}
	),
	oi = 1e3,
	ri = (t, e) =>
		ni(
			t,
			(n) => {
				let o = e(n);
				o && t.events[Qe].push(o);
			},
			ei,
			(n) => {
				let o = t.listen;
				t.listen = (...s) => (
					!t.lc &&
						!t.active &&
						((t.active = !0), n()),
					o(...s)
				);
				let r = t.off;
				return (
					(t.events[Qe] = []),
					(t.off = () => {
						r(),
							setTimeout(() => {
								if (t.active && !t.lc) {
									t.active = !1;
									for (let s of t.events[
										Qe
									])
										s();
									t.events[Qe] = [];
								}
							}, oi);
					}),
					() => {
						(t.listen = o), (t.off = r);
					}
				);
			},
		),
	br = (t, e) => {
		Array.isArray(t) || (t = [t]);
		let n,
			o = () => {
				let s = t.map((l) => l.get());
				(n === void 0 ||
					s.some((l, i) => l !== n[i])) &&
					((n = s), r.set(e(...s)));
			},
			r = yo(
				void 0,
				Math.max(...t.map((s) => s.l)) + 1,
			);
		return (
			ri(r, () => {
				let s = t.map((l) => l.listen(o, r.l));
				return (
					o(),
					() => {
						for (let l of s) l();
					}
				);
			}),
			r
		);
	};
function si(t, e, n) {
	let o = new Set([...e, void 0]);
	return t.listen((r, s) => {
		o.has(s) && n(r, s);
	});
}
var ye,
	J,
	Qn,
	$r,
	kn = 0,
	Ns = [],
	pn = [],
	xr = k.__b,
	wr = k.__r,
	kr = k.diffed,
	Sr = k.__c,
	Cr = k.unmount;
function Mn(t, e) {
	k.__h && k.__h(J, t, kn || e), (kn = 0);
	var n = J.__H || (J.__H = { __: [], __h: [] });
	return (
		t >= n.__.length && n.__.push({ __V: pn }), n.__[t]
	);
}
function li(t) {
	return (kn = 1), ii(Rs, t);
}
function ii(t, e, n) {
	var o = Mn(ye++, 2);
	if (
		((o.t = t),
		!o.__c &&
			((o.__ = [
				n ? n(e) : Rs(void 0, e),
				function (i) {
					var c = o.__N ? o.__N[0] : o.__[0],
						u = o.t(c, i);
					c !== u &&
						((o.__N = [u, o.__[1]]),
						o.__c.setState({}));
				},
			]),
			(o.__c = J),
			!J.u))
	) {
		var r = function (i, c, u) {
			if (!o.__c.__H) return !0;
			var _ = o.__c.__H.__.filter(function (v) {
				return v.__c;
			});
			if (
				_.every(function (v) {
					return !v.__N;
				})
			)
				return !s || s.call(this, i, c, u);
			var a = !1;
			return (
				_.forEach(function (v) {
					if (v.__N) {
						var h = v.__[0];
						(v.__ = v.__N),
							(v.__N = void 0),
							h !== v.__[0] && (a = !0);
					}
				}),
				!(!a && o.__c.props === i) &&
					(!s || s.call(this, i, c, u))
			);
		};
		J.u = !0;
		var s = J.shouldComponentUpdate,
			l = J.componentWillUpdate;
		(J.componentWillUpdate = function (i, c, u) {
			if (this.__e) {
				var _ = s;
				(s = void 0), r(i, c, u), (s = _);
			}
			l && l.call(this, i, c, u);
		}),
			(J.shouldComponentUpdate = r);
	}
	return o.__N || o.__;
}
function ci(t, e) {
	var n = Mn(ye++, 3);
	!k.__s &&
		Wo(n.__H, e) &&
		((n.__ = t), (n.i = e), J.__H.__h.push(n));
}
function ui(t, e) {
	var n = Mn(ye++, 4);
	!k.__s &&
		Wo(n.__H, e) &&
		((n.__ = t), (n.i = e), J.__h.push(n));
}
function ai(t, e) {
	var n = Mn(ye++, 7);
	return Wo(n.__H, e)
		? ((n.__V = t()), (n.i = e), (n.__h = t), n.__V)
		: n.__;
}
function bo(t, e) {
	return (
		(kn = 8),
		ai(function () {
			return t;
		}, e)
	);
}
function fi() {
	for (var t; (t = Ns.shift()); )
		if (t.__P && t.__H)
			try {
				t.__H.__h.forEach(_n),
					t.__H.__h.forEach($o),
					(t.__H.__h = []);
			} catch (e) {
				(t.__H.__h = []), k.__e(e, t.__v);
			}
}
(k.__b = function (t) {
	(J = null), xr && xr(t);
}),
	(k.__r = function (t) {
		wr && wr(t), (ye = 0);
		var e = (J = t.__c).__H;
		e &&
			(Qn === J
				? ((e.__h = []),
				  (J.__h = []),
				  e.__.forEach(function (n) {
						n.__N && (n.__ = n.__N),
							(n.__V = pn),
							(n.__N = n.i = void 0);
				  }))
				: (e.__h.forEach(_n),
				  e.__h.forEach($o),
				  (e.__h = []),
				  (ye = 0))),
			(Qn = J);
	}),
	(k.diffed = function (t) {
		kr && kr(t);
		var e = t.__c;
		e &&
			e.__H &&
			(e.__H.__h.length &&
				((Ns.push(e) !== 1 &&
					$r === k.requestAnimationFrame) ||
					(($r = k.requestAnimationFrame) || pi)(
						fi,
					)),
			e.__H.__.forEach(function (n) {
				n.i && (n.__H = n.i),
					n.__V !== pn && (n.__ = n.__V),
					(n.i = void 0),
					(n.__V = pn);
			})),
			(Qn = J = null);
	}),
	(k.__c = function (t, e) {
		e.some(function (n) {
			try {
				n.__h.forEach(_n),
					(n.__h = n.__h.filter(function (o) {
						return !o.__ || $o(o);
					}));
			} catch (o) {
				e.some(function (r) {
					r.__h && (r.__h = []);
				}),
					(e = []),
					k.__e(o, n.__v);
			}
		}),
			Sr && Sr(t, e);
	}),
	(k.unmount = function (t) {
		Cr && Cr(t);
		var e,
			n = t.__c;
		n &&
			n.__H &&
			(n.__H.__.forEach(function (o) {
				try {
					_n(o);
				} catch (r) {
					e = r;
				}
			}),
			(n.__H = void 0),
			e && k.__e(e, n.__v));
	});
var Er = typeof requestAnimationFrame == 'function';
function pi(t) {
	var e,
		n = function () {
			clearTimeout(o),
				Er && cancelAnimationFrame(e),
				setTimeout(t);
		},
		o = setTimeout(n, 100);
	Er && (e = requestAnimationFrame(n));
}
function _n(t) {
	var e = J,
		n = t.__c;
	typeof n == 'function' && ((t.__c = void 0), n()),
		(J = e);
}
function $o(t) {
	var e = J;
	(t.__c = t.__()), (J = e);
}
function Wo(t, e) {
	return (
		!t ||
		t.length !== e.length ||
		e.some(function (n, o) {
			return n !== t[o];
		})
	);
}
function Rs(t, e) {
	return typeof e == 'function' ? e(t) : e;
}
function _i(t, e) {
	for (var n in e) t[n] = e[n];
	return t;
}
function Pr(t, e) {
	for (var n in t)
		if (n !== '__source' && !(n in e)) return !0;
	for (var o in e)
		if (o !== '__source' && t[o] !== e[o]) return !0;
	return !1;
}
function Ar(t) {
	this.props = t;
}
((Ar.prototype = new Mt()).isPureReactComponent = !0),
	(Ar.prototype.shouldComponentUpdate = function (t, e) {
		return Pr(this.props, t) || Pr(this.state, e);
	});
var Or = k.__b;
k.__b = function (t) {
	t.type &&
		t.type.__f &&
		t.ref &&
		((t.props.ref = t.ref), (t.ref = null)),
		Or && Or(t);
};
var di = k.__e;
k.__e = function (t, e, n, o) {
	if (t.then) {
		for (var r, s = e; (s = s.__); )
			if ((r = s.__c) && r.__c)
				return (
					e.__e == null &&
						((e.__e = n.__e), (e.__k = n.__k)),
					r.__c(t, e)
				);
	}
	di(t, e, n, o);
};
var Tr = k.unmount;
function js(t, e, n) {
	return (
		t &&
			(t.__c &&
				t.__c.__H &&
				(t.__c.__H.__.forEach(function (o) {
					typeof o.__c == 'function' && o.__c();
				}),
				(t.__c.__H = null)),
			(t = _i({}, t)).__c != null &&
				(t.__c.__P === n && (t.__c.__P = e),
				(t.__c = null)),
			(t.__k =
				t.__k &&
				t.__k.map(function (o) {
					return js(o, e, n);
				}))),
		t
	);
}
function Ms(t, e, n) {
	return (
		t &&
			n &&
			((t.__v = null),
			(t.__k =
				t.__k &&
				t.__k.map(function (o) {
					return Ms(o, e, n);
				})),
			t.__c &&
				t.__c.__P === e &&
				(t.__e && n.appendChild(t.__e),
				(t.__c.__e = !0),
				(t.__c.__P = n))),
		t
	);
}
function to() {
	(this.__u = 0), (this.t = null), (this.__b = null);
}
function Ls(t) {
	var e = t.__.__c;
	return e && e.__a && e.__a(t);
}
function en() {
	(this.u = null), (this.o = null);
}
(k.unmount = function (t) {
	var e = t.__c;
	e && e.__R && e.__R(),
		e && 32 & t.__u && (t.type = null),
		Tr && Tr(t);
}),
	((to.prototype = new Mt()).__c = function (t, e) {
		var n = e.__c,
			o = this;
		o.t == null && (o.t = []), o.t.push(n);
		var r = Ls(o.__v),
			s = !1,
			l = function () {
				s ||
					((s = !0),
					(n.__R = null),
					r ? r(i) : i());
			};
		n.__R = l;
		var i = function () {
			if (!--o.__u) {
				if (o.state.__a) {
					var c = o.state.__a;
					o.__v.__k[0] = Ms(
						c,
						c.__c.__P,
						c.__c.__O,
					);
				}
				var u;
				for (
					o.setState({ __a: (o.__b = null) });
					(u = o.t.pop());

				)
					u.forceUpdate();
			}
		};
		o.__u++ ||
			32 & e.__u ||
			o.setState({ __a: (o.__b = o.__v.__k[0]) }),
			t.then(l, l);
	}),
	(to.prototype.componentWillUnmount = function () {
		this.t = [];
	}),
	(to.prototype.render = function (t, e) {
		if (this.__b) {
			if (this.__v.__k) {
				var n = document.createElement('div'),
					o = this.__v.__k[0].__c;
				this.__v.__k[0] = js(
					this.__b,
					n,
					(o.__O = o.__P),
				);
			}
			this.__b = null;
		}
		var r = e.__a && $n(re, null, t.fallback);
		return (
			r && (r.__u &= -33),
			[$n(re, null, e.__a ? null : t.children), r]
		);
	});
var Nr = function (t, e, n) {
	if (
		(++n[1] === n[0] && t.o.delete(e),
		t.props.revealOrder &&
			(t.props.revealOrder[0] !== 't' || !t.o.size))
	)
		for (n = t.u; n; ) {
			for (; n.length > 3; ) n.pop()();
			if (n[1] < n[0]) break;
			t.u = n = n[2];
		}
};
((en.prototype = new Mt()).__a = function (t) {
	var e = this,
		n = Ls(e.__v),
		o = e.o.get(t);
	return (
		o[0]++,
		function (r) {
			var s = function () {
				e.props.revealOrder
					? (o.push(r), Nr(e, t, o))
					: r();
			};
			n ? n(s) : s();
		}
	);
}),
	(en.prototype.render = function (t) {
		(this.u = null), (this.o = new Map());
		var e = wn(t.children);
		t.revealOrder &&
			t.revealOrder[0] === 'b' &&
			e.reverse();
		for (var n = e.length; n--; )
			this.o.set(e[n], (this.u = [1, 0, this.u]));
		return t.children;
	}),
	(en.prototype.componentDidUpdate =
		en.prototype.componentDidMount =
			function () {
				var t = this;
				this.o.forEach(function (e, n) {
					Nr(t, n, e);
				});
			});
var hi =
		(typeof Symbol < 'u' &&
			Symbol.for &&
			Symbol.for('react.element')) ||
		60103,
	vi =
		/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,
	gi = /^on(Ani|Tra|Tou|BeforeInp|Compo)/,
	mi = /[A-Z0-9]/g,
	yi = typeof document < 'u',
	bi = function (t) {
		return (
			typeof Symbol < 'u' &&
			typeof Symbol() == 'symbol'
				? /fil|che|rad/
				: /fil|che|ra/
		).test(t);
	};
(Mt.prototype.isReactComponent = {}),
	[
		'componentWillMount',
		'componentWillReceiveProps',
		'componentWillUpdate',
	].forEach(function (t) {
		Object.defineProperty(Mt.prototype, t, {
			configurable: !0,
			get: function () {
				return this['UNSAFE_' + t];
			},
			set: function (e) {
				Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: e,
				});
			},
		});
	});
var Rr = k.event;
function $i() {}
function xi() {
	return this.cancelBubble;
}
function wi() {
	return this.defaultPrevented;
}
k.event = function (t) {
	return (
		Rr && (t = Rr(t)),
		(t.persist = $i),
		(t.isPropagationStopped = xi),
		(t.isDefaultPrevented = wi),
		(t.nativeEvent = t)
	);
};
var ki = {
		enumerable: !1,
		configurable: !0,
		get: function () {
			return this.class;
		},
	},
	jr = k.vnode;
k.vnode = function (t) {
	typeof t.type == 'string' &&
		(function (e) {
			var n = e.props,
				o = e.type,
				r = {};
			for (var s in n) {
				var l = n[s];
				if (
					!(
						(s === 'value' &&
							'defaultValue' in n &&
							l == null) ||
						(yi &&
							s === 'children' &&
							o === 'noscript') ||
						s === 'class' ||
						s === 'className'
					)
				) {
					var i = s.toLowerCase();
					s === 'defaultValue' &&
					'value' in n &&
					n.value == null
						? (s = 'value')
						: s === 'download' && l === !0
						? (l = '')
						: i === 'ondoubleclick'
						? (s = 'ondblclick')
						: i !== 'onchange' ||
						  (o !== 'input' &&
								o !== 'textarea') ||
						  bi(n.type)
						? i === 'onfocus'
							? (s = 'onfocusin')
							: i === 'onblur'
							? (s = 'onfocusout')
							: gi.test(s)
							? (s = i)
							: o.indexOf('-') === -1 &&
							  vi.test(s)
							? (s = s
									.replace(mi, '-$&')
									.toLowerCase())
							: l === null && (l = void 0)
						: (i = s = 'oninput'),
						i === 'oninput' &&
							r[(s = i)] &&
							(s = 'oninputCapture'),
						(r[s] = l);
				}
			}
			o == 'select' &&
				r.multiple &&
				Array.isArray(r.value) &&
				(r.value = wn(n.children).forEach(
					function (c) {
						c.props.selected =
							r.value.indexOf(
								c.props.value,
							) != -1;
					},
				)),
				o == 'select' &&
					r.defaultValue != null &&
					(r.value = wn(n.children).forEach(
						function (c) {
							c.props.selected = r.multiple
								? r.defaultValue.indexOf(
										c.props.value,
								  ) != -1
								: r.defaultValue ==
								  c.props.value;
						},
					)),
				n.class && !n.className
					? ((r.class = n.class),
					  Object.defineProperty(
							r,
							'className',
							ki,
					  ))
					: ((n.className && !n.class) ||
							(n.class && n.className)) &&
					  (r.class = r.className = n.className),
				(e.props = r);
		})(t),
		(t.$$typeof = hi),
		jr && jr(t);
};
var Mr = k.__r;
k.__r = function (t) {
	Mr && Mr(t), t.__c;
};
var Lr = k.diffed;
k.diffed = function (t) {
	Lr && Lr(t);
	var e = t.props,
		n = t.__e;
	n != null &&
		t.type === 'textarea' &&
		'value' in e &&
		e.value !== n.value &&
		(n.value = e.value == null ? '' : e.value);
};
function Si(t, e) {
	var n = e(),
		o = li({ h: { __: n, v: e } }),
		r = o[0].h,
		s = o[1];
	return (
		ui(
			function () {
				(r.__ = n), (r.v = e), eo(r) && s({ h: r });
			},
			[t, n, e],
		),
		ci(
			function () {
				return (
					eo(r) && s({ h: r }),
					t(function () {
						eo(r) && s({ h: r });
					})
				);
			},
			[t],
		),
		n
	);
}
function eo(t) {
	var e,
		n,
		o = t.v,
		r = t.__;
	try {
		var s = o();
		return !(
			((e = r) === (n = s) &&
				(e !== 0 || 1 / e == 1 / n)) ||
			(e != e && n != n)
		);
	} catch {
		return !0;
	}
}
function nn(t, e = {}) {
	let n = bo(
			(r) =>
				e.keys ? si(t, e.keys, r) : t.listen(r),
			[e.keys, t],
		),
		o = t.get.bind(t);
	return Si(n, o);
}
const no = new Map();
function Fs(t) {
	if (no.has(t)) return no.get(t);
	const e = yo([]),
		n = {
			id: 0,
			$todos: e,
			$filter: yo('all'),
			$done: br(e, (o) => o.filter((r) => r.done)),
			$left: br(e, (o) => o.filter((r) => !r.done)),
			addTodo: (o) => {
				n.$todos.set([
					...n.$todos.get(),
					{ id: n.id++, text: o, done: !1 },
				]);
			},
			checkTodo: (o, r) => {
				n.$todos.set(
					n.$todos
						.get()
						.map((s) =>
							s.id === o
								? { ...s, done: r }
								: s,
						),
				);
			},
			removeTodo: (o) => {
				n.$todos.set(
					n.$todos
						.get()
						.filter((r) => r.id !== o),
				);
			},
		};
	return (
		n.addTodo('Create example app'),
		n.addTodo('Write blog post'),
		n.addTodo('Post on social media'),
		no.set(t, n),
		n
	);
}
let Ci = Ds;
const ke = 1,
	Sn = 2,
	Us = {
		owned: null,
		cleanups: null,
		context: null,
		owner: null,
	};
var tt = null;
let oo = null,
	Ct = null,
	ft = null,
	ee = null,
	Ln = 0;
function Ei(t, e) {
	const n = Ct,
		o = tt,
		r = t.length === 0,
		s = e === void 0 ? o : e,
		l = r
			? Us
			: {
					owned: null,
					cleanups: null,
					context: s ? s.context : null,
					owner: s,
			  },
		i = r ? t : () => t(() => Fn(() => Hn(l)));
	(tt = l), (Ct = null);
	try {
		return Un(i, !0);
	} finally {
		(Ct = n), (tt = o);
	}
}
function xo(t, e, n) {
	const o = Oi(t, e, !1, ke);
	Hs(o);
}
function Fn(t) {
	if (Ct === null) return t();
	const e = Ct;
	Ct = null;
	try {
		return t();
	} finally {
		Ct = e;
	}
}
function on() {
	return tt;
}
function Pi(t, e, n) {
	let o = t.value;
	return (
		(!t.comparator || !t.comparator(o, e)) &&
			((t.value = e),
			t.observers &&
				t.observers.length &&
				Un(() => {
					for (
						let r = 0;
						r < t.observers.length;
						r += 1
					) {
						const s = t.observers[r],
							l = oo && oo.running;
						l && oo.disposed.has(s),
							(l ? !s.tState : !s.state) &&
								(s.pure
									? ft.push(s)
									: ee.push(s),
								s.observers && Ws(s)),
							l || (s.state = ke);
					}
					if (ft.length > 1e6)
						throw ((ft = []), new Error());
				}, !1)),
		e
	);
}
function Hs(t) {
	if (!t.fn) return;
	Hn(t);
	const e = tt,
		n = Ct,
		o = Ln;
	(Ct = tt = t), Ai(t, t.value, o), (Ct = n), (tt = e);
}
function Ai(t, e, n) {
	let o;
	try {
		o = t.fn(e);
	} catch (r) {
		return (
			t.pure &&
				((t.state = ke),
				t.owned && t.owned.forEach(Hn),
				(t.owned = null)),
			(t.updatedAt = n + 1),
			Is(r)
		);
	}
	(!t.updatedAt || t.updatedAt <= n) &&
		(t.updatedAt != null && 'observers' in t
			? Pi(t, o)
			: (t.value = o),
		(t.updatedAt = n));
}
function Oi(t, e, n, o = ke, r) {
	const s = {
		fn: t,
		state: o,
		updatedAt: null,
		owned: null,
		sources: null,
		sourceSlots: null,
		cleanups: null,
		value: e,
		owner: tt,
		context: tt ? tt.context : null,
		pure: n,
	};
	return (
		tt === null ||
			(tt !== Us &&
				(tt.owned
					? tt.owned.push(s)
					: (tt.owned = [s]))),
		s
	);
}
function Vs(t) {
	if (t.state === 0) return;
	if (t.state === Sn) return wo(t);
	if (t.suspense && Fn(t.suspense.inFallback))
		return t.suspense.effects.push(t);
	const e = [t];
	for (
		;
		(t = t.owner) && (!t.updatedAt || t.updatedAt < Ln);

	)
		t.state && e.push(t);
	for (let n = e.length - 1; n >= 0; n--)
		if (((t = e[n]), t.state === ke)) Hs(t);
		else if (t.state === Sn) {
			const o = ft;
			(ft = null),
				Un(() => wo(t, e[0]), !1),
				(ft = o);
		}
}
function Un(t, e) {
	if (ft) return t();
	let n = !1;
	e || (ft = []), ee ? (n = !0) : (ee = []), Ln++;
	try {
		const o = t();
		return Ti(n), o;
	} catch (o) {
		n || (ee = null), (ft = null), Is(o);
	}
}
function Ti(t) {
	if ((ft && (Ds(ft), (ft = null)), t)) return;
	const e = ee;
	(ee = null), e.length && Un(() => Ci(e), !1);
}
function Ds(t) {
	for (let e = 0; e < t.length; e++) Vs(t[e]);
}
function wo(t, e) {
	t.state = 0;
	for (let n = 0; n < t.sources.length; n += 1) {
		const o = t.sources[n];
		if (o.sources) {
			const r = o.state;
			r === ke
				? o !== e &&
				  (!o.updatedAt || o.updatedAt < Ln) &&
				  Vs(o)
				: r === Sn && wo(o, e);
		}
	}
}
function Ws(t) {
	for (let e = 0; e < t.observers.length; e += 1) {
		const n = t.observers[e];
		n.state ||
			((n.state = Sn),
			n.pure ? ft.push(n) : ee.push(n),
			n.observers && Ws(n));
	}
}
function Hn(t) {
	let e;
	if (t.sources)
		for (; t.sources.length; ) {
			const n = t.sources.pop(),
				o = t.sourceSlots.pop(),
				r = n.observers;
			if (r && r.length) {
				const s = r.pop(),
					l = n.observerSlots.pop();
				o < r.length &&
					((s.sourceSlots[l] = o),
					(r[o] = s),
					(n.observerSlots[o] = l));
			}
		}
	if (t.owned) {
		for (e = t.owned.length - 1; e >= 0; e--)
			Hn(t.owned[e]);
		t.owned = null;
	}
	if (t.cleanups) {
		for (e = t.cleanups.length - 1; e >= 0; e--)
			t.cleanups[e]();
		t.cleanups = null;
	}
	t.state = 0;
}
function Ni(t) {
	return t instanceof Error
		? t
		: new Error(
				typeof t == 'string' ? t : 'Unknown error',
				{ cause: t },
		  );
}
function Is(t, e = tt) {
	throw Ni(t);
}
function Ri(t, e) {
	return Fn(() => t(e || {}));
}
function ji(t, e, n) {
	let o = n.length,
		r = e.length,
		s = o,
		l = 0,
		i = 0,
		c = e[r - 1].nextSibling,
		u = null;
	for (; l < r || i < s; ) {
		if (e[l] === n[i]) {
			l++, i++;
			continue;
		}
		for (; e[r - 1] === n[s - 1]; ) r--, s--;
		if (r === l) {
			const _ =
				s < o
					? i
						? n[i - 1].nextSibling
						: n[s - i]
					: c;
			for (; i < s; ) t.insertBefore(n[i++], _);
		} else if (s === i)
			for (; l < r; )
				(!u || !u.has(e[l])) && e[l].remove(), l++;
		else if (e[l] === n[s - 1] && n[i] === e[r - 1]) {
			const _ = e[--r].nextSibling;
			t.insertBefore(n[i++], e[l++].nextSibling),
				t.insertBefore(n[--s], _),
				(e[r] = n[s]);
		} else {
			if (!u) {
				u = new Map();
				let a = i;
				for (; a < s; ) u.set(n[a], a++);
			}
			const _ = u.get(e[l]);
			if (_ != null)
				if (i < _ && _ < s) {
					let a = l,
						v = 1,
						h;
					for (
						;
						++a < r &&
						a < s &&
						!(
							(h = u.get(e[a])) == null ||
							h !== _ + v
						);

					)
						v++;
					if (v > _ - i) {
						const O = e[l];
						for (; i < _; )
							t.insertBefore(n[i++], O);
					} else t.replaceChild(n[i++], e[l++]);
				} else l++;
			else e[l++].remove();
		}
	}
}
function Mi(t, e, n, o = {}) {
	let r;
	return (
		Ei((s) => {
			(r = s),
				e === document
					? t()
					: Li(
							e,
							t(),
							e.firstChild ? null : void 0,
							n,
					  );
		}, o.owner),
		() => {
			r(), (e.textContent = '');
		}
	);
}
function zs(t, e, n) {
	let o;
	const r = () => {
			const l = document.createElement('template');
			return (
				(l.innerHTML = t),
				n
					? l.content.firstChild.firstChild
					: l.content.firstChild
			);
		},
		s = e
			? () =>
					Fn(() =>
						document.importNode(
							o || (o = r()),
							!0,
						),
					)
			: () => (o || (o = r())).cloneNode(!0);
	return (s.cloneNode = s), s;
}
function Li(t, e, n, o) {
	if (
		(n !== void 0 && !o && (o = []),
		typeof e != 'function')
	)
		return Cn(t, e, o, n);
	xo((r) => Cn(t, e(), r, n), o);
}
function Cn(t, e, n, o, r) {
	for (; typeof n == 'function'; ) n = n();
	if (e === n) return n;
	const s = typeof e,
		l = o !== void 0;
	if (
		((t = (l && n[0] && n[0].parentNode) || t),
		s === 'string' || s === 'number')
	)
		if ((s === 'number' && (e = e.toString()), l)) {
			let i = n[0];
			i && i.nodeType === 3
				? (i.data = e)
				: (i = document.createTextNode(e)),
				(n = ce(t, n, o, i));
		} else
			n !== '' && typeof n == 'string'
				? (n = t.firstChild.data = e)
				: (n = t.textContent = e);
	else if (e == null || s === 'boolean') n = ce(t, n, o);
	else {
		if (s === 'function')
			return (
				xo(() => {
					let i = e();
					for (; typeof i == 'function'; )
						i = i();
					n = Cn(t, i, n, o);
				}),
				() => n
			);
		if (Array.isArray(e)) {
			const i = [],
				c = n && Array.isArray(n);
			if (ko(i, e, n, r))
				return (
					xo(() => (n = Cn(t, i, n, o, !0))),
					() => n
				);
			if (i.length === 0) {
				if (((n = ce(t, n, o)), l)) return n;
			} else
				c
					? n.length === 0
						? Fr(t, i, o)
						: ji(t, n, i)
					: (n && ce(t), Fr(t, i));
			n = i;
		} else if (e.nodeType) {
			if (Array.isArray(n)) {
				if (l) return (n = ce(t, n, o, e));
				ce(t, n, null, e);
			} else
				n == null || n === '' || !t.firstChild
					? t.appendChild(e)
					: t.replaceChild(e, t.firstChild);
			n = e;
		}
	}
	return n;
}
function ko(t, e, n, o) {
	let r = !1;
	for (let s = 0, l = e.length; s < l; s++) {
		let i = e[s],
			c = n && n[s],
			u;
		if (!(i == null || i === !0 || i === !1))
			if ((u = typeof i) == 'object' && i.nodeType)
				t.push(i);
			else if (Array.isArray(i)) r = ko(t, i, c) || r;
			else if (u === 'function')
				if (o) {
					for (; typeof i == 'function'; )
						i = i();
					r =
						ko(
							t,
							Array.isArray(i) ? i : [i],
							Array.isArray(c) ? c : [c],
						) || r;
				} else t.push(i), (r = !0);
			else {
				const _ = String(i);
				c && c.nodeType === 3 && c.data === _
					? t.push(c)
					: t.push(document.createTextNode(_));
			}
	}
	return r;
}
function Fr(t, e, n = null) {
	for (let o = 0, r = e.length; o < r; o++)
		t.insertBefore(e[o], n);
}
function ce(t, e, n, o) {
	if (n === void 0) return (t.textContent = '');
	const r = o || document.createTextNode('');
	if (e.length) {
		let s = !1;
		for (let l = e.length - 1; l >= 0; l--) {
			const i = e[l];
			if (r !== i) {
				const c = i.parentNode === t;
				!s && !l
					? c
						? t.replaceChild(r, i)
						: t.insertBefore(r, n)
					: c && i.remove();
			} else s = !0;
		}
	} else t.insertBefore(r, n);
	return [r];
}
const Fi = zs(
		'<div class=wrapper><header class=header><slot name=title></slot><slot name=filters></slot></header><div><slot name=todos></slot></div><footer><slot name=input>',
	),
	Ui = zs(`<style>
          .wrapper {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            border: 1px solid var(--border-color);
            padding: 1rem;
            border-radius: 1rem;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `);
customElements.define(
	'todo-layout',
	class extends HTMLElement {
		constructor() {
			super(),
				(this.shadow = this.attachShadow({
					mode: 'closed',
				}));
		}
		connectedCallback() {
			Mi(() => Ri(Hi, {}), this.shadow);
		}
	},
);
function Hi() {
	return [
		(() => {
			const t = Fi(),
				e = t.firstChild,
				n = e.firstChild,
				o = n.nextSibling,
				r = e.nextSibling,
				s = r.firstChild,
				l = r.nextSibling,
				i = l.firstChild;
			return (
				(n._$owner = on()),
				(o._$owner = on()),
				(s._$owner = on()),
				(i._$owner = on()),
				t
			);
		})(),
		Ui(),
	];
}
customElements.define(
	'todo-input',
	class extends HTMLElement {
		constructor() {
			super(),
				(this.shadow = this.attachShadow({
					mode: 'closed',
				}));
		}
		connectedCallback() {
			(this.shadow.innerHTML = Vi`
        <form>
          <input name="text" type="text" placeholder="What needs to be done?" />
        </form>

        <style>
          * {
            box-sizing: border-box;
          }

          input {
            font: inherit;
            border: 1px solid var(--border-color);
            background-color: transparent;
            padding: 10px;
            border-radius: 8px;
            width: 100%;
          }

          input:focus {
            outline: 0;
          }

          input:focus-visible {
            outline-offset: 2px;
            outline: 2px solid var(--accent-color);
          }
        </style>
      `),
				this.shadow
					.querySelector('form')
					.addEventListener('submit', (t) => {
						t.preventDefault();
						const e = new FormData(t.target);
						this.dispatchEvent(
							new CustomEvent('add', {
								detail: e.get('text'),
							}),
						),
							t.target.reset();
					});
		}
	},
);
function Vi(t, ...e) {
	return String.raw({ raw: t }, ...e);
}
function He() {}
function Bs(t) {
	return t();
}
function Ur() {
	return Object.create(null);
}
function Je(t) {
	t.forEach(Bs);
}
function qs(t) {
	return typeof t == 'function';
}
function Di(t, e) {
	return t != t
		? e == e
		: t !== e ||
				(t && typeof t == 'object') ||
				typeof t == 'function';
}
function Wi(t) {
	return Object.keys(t).length === 0;
}
function Tt(t, e) {
	t.appendChild(e);
}
function Ii(t, e, n) {
	const o = zi(t);
	if (!o.getElementById(e)) {
		const r = pe('style');
		(r.id = e), (r.textContent = n), Bi(o, r);
	}
}
function zi(t) {
	if (!t) return document;
	const e = t.getRootNode
		? t.getRootNode()
		: t.ownerDocument;
	return e && e.host ? e : t.ownerDocument;
}
function Bi(t, e) {
	return Tt(t.head || t, e), e.sheet;
}
function Js(t, e, n) {
	t.insertBefore(e, n || null);
}
function Io(t) {
	t.parentNode && t.parentNode.removeChild(t);
}
function pe(t) {
	return document.createElement(t);
}
function Hr(t) {
	return document.createElementNS(
		'http://www.w3.org/2000/svg',
		t,
	);
}
function Ks(t) {
	return document.createTextNode(t);
}
function Vr() {
	return Ks(' ');
}
function Dr(t, e, n, o) {
	return (
		t.addEventListener(e, n, o),
		() => t.removeEventListener(e, n, o)
	);
}
function Z(t, e, n) {
	n == null
		? t.removeAttribute(e)
		: t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function qi(t) {
	return Array.from(t.childNodes);
}
function Ji(t, e) {
	(e = '' + e), t.data !== e && (t.data = e);
}
function Ki(
	t,
	e,
	{ bubbles: n = !1, cancelable: o = !1 } = {},
) {
	return new CustomEvent(t, {
		detail: e,
		bubbles: n,
		cancelable: o,
	});
}
function Gi(t) {
	const e = {};
	return (
		t.childNodes.forEach((n) => {
			e[n.slot || 'default'] = !0;
		}),
		e
	);
}
let Ve;
function je(t) {
	Ve = t;
}
function Zi() {
	if (!Ve)
		throw new Error(
			'Function called outside component initialization',
		);
	return Ve;
}
function Yi() {
	const t = Zi();
	return (e, n, { cancelable: o = !1 } = {}) => {
		const r = t.$$.callbacks[e];
		if (r) {
			const s = Ki(e, n, { cancelable: o });
			return (
				r.slice().forEach((l) => {
					l.call(t, s);
				}),
				!s.defaultPrevented
			);
		}
		return !0;
	};
}
const fe = [],
	Wr = [];
let _e = [];
const Ir = [],
	Xi = Promise.resolve();
let So = !1;
function Qi() {
	So || ((So = !0), Xi.then(Me));
}
function Co(t) {
	_e.push(t);
}
const ro = new Set();
let ue = 0;
function Me() {
	if (ue !== 0) return;
	const t = Ve;
	do {
		try {
			for (; ue < fe.length; ) {
				const e = fe[ue];
				ue++, je(e), tc(e.$$);
			}
		} catch (e) {
			throw ((fe.length = 0), (ue = 0), e);
		}
		for (je(null), fe.length = 0, ue = 0; Wr.length; )
			Wr.pop()();
		for (let e = 0; e < _e.length; e += 1) {
			const n = _e[e];
			ro.has(n) || (ro.add(n), n());
		}
		_e.length = 0;
	} while (fe.length);
	for (; Ir.length; ) Ir.pop()();
	(So = !1), ro.clear(), je(t);
}
function tc(t) {
	if (t.fragment !== null) {
		t.update(), Je(t.before_update);
		const e = t.dirty;
		(t.dirty = [-1]),
			t.fragment && t.fragment.p(t.ctx, e),
			t.after_update.forEach(Co);
	}
}
function ec(t) {
	const e = [],
		n = [];
	_e.forEach((o) =>
		t.indexOf(o) === -1 ? e.push(o) : n.push(o),
	),
		n.forEach((o) => o()),
		(_e = e);
}
const nc = new Set();
function oc(t, e) {
	t && t.i && (nc.delete(t), t.i(e));
}
function rc(t, e, n) {
	const { fragment: o, after_update: r } = t.$$;
	o && o.m(e, n),
		Co(() => {
			const s = t.$$.on_mount.map(Bs).filter(qs);
			t.$$.on_destroy
				? t.$$.on_destroy.push(...s)
				: Je(s),
				(t.$$.on_mount = []);
		}),
		r.forEach(Co);
}
function sc(t, e) {
	const n = t.$$;
	n.fragment !== null &&
		(ec(n.after_update),
		Je(n.on_destroy),
		n.fragment && n.fragment.d(e),
		(n.on_destroy = n.fragment = null),
		(n.ctx = []));
}
function lc(t, e) {
	t.$$.dirty[0] === -1 &&
		(fe.push(t), Qi(), t.$$.dirty.fill(0)),
		(t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function ic(t, e, n, o, r, s, l = null, i = [-1]) {
	const c = Ve;
	je(t);
	const u = (t.$$ = {
		fragment: null,
		ctx: [],
		props: s,
		update: He,
		not_equal: r,
		bound: Ur(),
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(
			e.context || (c ? c.$$.context : []),
		),
		callbacks: Ur(),
		dirty: i,
		skip_bound: !1,
		root: e.target || c.$$.root,
	});
	l && l(u.root);
	let _ = !1;
	if (
		((u.ctx = n
			? n(t, e.props || {}, (a, v, ...h) => {
					const O = h.length ? h[0] : v;
					return (
						u.ctx &&
							r(u.ctx[a], (u.ctx[a] = O)) &&
							(!u.skip_bound &&
								u.bound[a] &&
								u.bound[a](O),
							_ && lc(t, a)),
						v
					);
			  })
			: []),
		u.update(),
		(_ = !0),
		Je(u.before_update),
		(u.fragment = o ? o(u.ctx) : !1),
		e.target)
	) {
		if (e.hydrate) {
			const a = qi(e.target);
			u.fragment && u.fragment.l(a), a.forEach(Io);
		} else u.fragment && u.fragment.c();
		e.intro && oc(t.$$.fragment),
			rc(t, e.target, e.anchor),
			Me();
	}
	je(c);
}
let Gs;
typeof HTMLElement == 'function' &&
	(Gs = class extends HTMLElement {
		constructor(t, e, n) {
			super(),
				ht(this, '$$ctor'),
				ht(this, '$$s'),
				ht(this, '$$c'),
				ht(this, '$$cn', !1),
				ht(this, '$$d', {}),
				ht(this, '$$r', !1),
				ht(this, '$$p_d', {}),
				ht(this, '$$l', {}),
				ht(this, '$$l_u', new Map()),
				(this.$$ctor = t),
				(this.$$s = e),
				n && this.attachShadow({ mode: 'open' });
		}
		addEventListener(t, e, n) {
			if (
				((this.$$l[t] = this.$$l[t] || []),
				this.$$l[t].push(e),
				this.$$c)
			) {
				const o = this.$$c.$on(t, e);
				this.$$l_u.set(e, o);
			}
			super.addEventListener(t, e, n);
		}
		removeEventListener(t, e, n) {
			if (
				(super.removeEventListener(t, e, n),
				this.$$c)
			) {
				const o = this.$$l_u.get(e);
				o && (o(), this.$$l_u.delete(e));
			}
		}
		async connectedCallback() {
			if (((this.$$cn = !0), !this.$$c)) {
				let t = function (r) {
					return () => {
						let s;
						return {
							c: function () {
								(s = pe('slot')),
									r !== 'default' &&
										Z(s, 'name', r);
							},
							m: function (l, i) {
								Js(l, s, i);
							},
							d: function (l) {
								l && Io(s);
							},
						};
					};
				};
				if ((await Promise.resolve(), !this.$$cn))
					return;
				const e = {},
					n = Gi(this);
				for (const r of this.$$s)
					r in n && (e[r] = [t(r)]);
				for (const r of this.attributes) {
					const s = this.$$g_p(r.name);
					s in this.$$d ||
						(this.$$d[s] = dn(
							s,
							r.value,
							this.$$p_d,
							'toProp',
						));
				}
				this.$$c = new this.$$ctor({
					target: this.shadowRoot || this,
					props: {
						...this.$$d,
						$$slots: e,
						$$scope: { ctx: [] },
					},
				});
				const o = () => {
					this.$$r = !0;
					for (const r in this.$$p_d)
						if (
							((this.$$d[r] =
								this.$$c.$$.ctx[
									this.$$c.$$.props[r]
								]),
							this.$$p_d[r].reflect)
						) {
							const s = dn(
								r,
								this.$$d[r],
								this.$$p_d,
								'toAttribute',
							);
							s == null
								? this.removeAttribute(
										this.$$p_d[r]
											.attribute || r,
								  )
								: this.setAttribute(
										this.$$p_d[r]
											.attribute || r,
										s,
								  );
						}
					this.$$r = !1;
				};
				this.$$c.$$.after_update.push(o), o();
				for (const r in this.$$l)
					for (const s of this.$$l[r]) {
						const l = this.$$c.$on(r, s);
						this.$$l_u.set(s, l);
					}
				this.$$l = {};
			}
		}
		attributeChangedCallback(t, e, n) {
			var o;
			this.$$r ||
				((t = this.$$g_p(t)),
				(this.$$d[t] = dn(
					t,
					n,
					this.$$p_d,
					'toProp',
				)),
				(o = this.$$c) == null ||
					o.$set({ [t]: this.$$d[t] }));
		}
		disconnectedCallback() {
			(this.$$cn = !1),
				Promise.resolve().then(() => {
					this.$$cn ||
						(this.$$c.$destroy(),
						(this.$$c = void 0));
				});
		}
		$$g_p(t) {
			return (
				Object.keys(this.$$p_d).find(
					(e) =>
						this.$$p_d[e].attribute === t ||
						(!this.$$p_d[e].attribute &&
							e.toLowerCase() === t),
				) || t
			);
		}
	});
function dn(t, e, n, o) {
	var r;
	const s = (r = n[t]) == null ? void 0 : r.type;
	if (
		((e =
			s === 'Boolean' && typeof e != 'boolean'
				? e != null
				: e),
		!o || !n[t])
	)
		return e;
	if (o === 'toAttribute')
		switch (s) {
			case 'Object':
			case 'Array':
				return e == null ? null : JSON.stringify(e);
			case 'Boolean':
				return e ? '' : null;
			case 'Number':
				return e ?? null;
			default:
				return e;
		}
	else
		switch (s) {
			case 'Object':
			case 'Array':
				return e && JSON.parse(e);
			case 'Boolean':
				return e;
			case 'Number':
				return e != null ? +e : e;
			default:
				return e;
		}
}
function cc(t, e, n, o, r, s) {
	let l = class extends Gs {
		constructor() {
			super(t, n, r), (this.$$p_d = e);
		}
		static get observedAttributes() {
			return Object.keys(e).map((i) =>
				(e[i].attribute || i).toLowerCase(),
			);
		}
	};
	return (
		Object.keys(e).forEach((i) => {
			Object.defineProperty(l.prototype, i, {
				get() {
					return this.$$c && i in this.$$c
						? this.$$c[i]
						: this.$$d[i];
				},
				set(c) {
					var u;
					(c = dn(i, c, e)),
						(this.$$d[i] = c),
						(u = this.$$c) == null ||
							u.$set({ [i]: c });
				},
			});
		}),
		o.forEach((i) => {
			Object.defineProperty(l.prototype, i, {
				get() {
					var c;
					return (c = this.$$c) == null
						? void 0
						: c[i];
				},
			});
		}),
		s && (l = s(l)),
		(t.element = l),
		l
	);
}
class uc {
	constructor() {
		ht(this, '$$'), ht(this, '$$set');
	}
	$destroy() {
		sc(this, 1), (this.$destroy = He);
	}
	$on(e, n) {
		if (!qs(n)) return He;
		const o =
			this.$$.callbacks[e] ||
			(this.$$.callbacks[e] = []);
		return (
			o.push(n),
			() => {
				const r = o.indexOf(n);
				r !== -1 && o.splice(r, 1);
			}
		);
	}
	$set(e) {
		this.$$set &&
			!Wi(e) &&
			((this.$$.skip_bound = !0),
			this.$$set(e),
			(this.$$.skip_bound = !1));
	}
}
const ac = '4';
typeof window < 'u' &&
	(
		window.__svelte ||
		(window.__svelte = { v: new Set() })
	).v.add(ac);
function fc(t) {
	Ii(
		t,
		'svelte-12j7zr9',
		'div.svelte-12j7zr9.svelte-12j7zr9{line-height:1;display:flex;align-items:center;gap:0.5rem;padding:0.75rem 0}input.svelte-12j7zr9:checked+label.svelte-12j7zr9{text-decoration:line-through}button.svelte-12j7zr9.svelte-12j7zr9{margin-left:auto;display:flex;justify-content:center;align-items:center;padding:0.25rem;border:0;border-radius:0.5rem;background-color:var(--border-color)}button.svelte-12j7zr9.svelte-12j7zr9:hover{background-color:var(--negative-color)}',
	);
}
function pc(t) {
	let e, n, o, r, s, l, i, c, u, _, a, v, h, O;
	return {
		c() {
			(e = pe('div')),
				(n = pe('input')),
				(r = Vr()),
				(s = pe('label')),
				(l = Ks(t[2])),
				(c = Vr()),
				(u = pe('button')),
				(_ = Hr('svg')),
				(a = Hr('path')),
				Z(n, 'id', (o = 'todo-' + t[1])),
				Z(n, 'type', 'checkbox'),
				Z(n, 'class', 'svelte-12j7zr9'),
				Z(s, 'for', (i = 'todo-' + t[1])),
				Z(s, 'class', 'svelte-12j7zr9'),
				Z(
					a,
					'd',
					'M10.707,1.293a1,1,0,0,0-1.414,0L6,4.586,2.707,1.293A1,1,0,0,0,1.293,2.707L4.586,6,1.293,9.293a1,1,0,1,0,1.414,1.414L6,7.414l3.293,3.293a1,1,0,0,0,1.414-1.414L7.414,6l3.293-3.293A1,1,0,0,0,10.707,1.293Z',
				),
				Z(a, 'fill', 'currentColor'),
				Z(_, 'xmlns', 'http://www.w3.org/2000/svg'),
				Z(_, 'width', '12'),
				Z(_, 'height', '12'),
				Z(_, 'viewBox', '0 0 12 12'),
				Z(u, 'aria-label', (v = 'delete ' + t[2])),
				Z(u, 'class', 'svelte-12j7zr9'),
				Z(e, 'class', 'svelte-12j7zr9');
		},
		m(C, N) {
			Js(C, e, N),
				Tt(e, n),
				(n.checked = t[0]),
				Tt(e, r),
				Tt(e, s),
				Tt(s, l),
				Tt(e, c),
				Tt(e, u),
				Tt(u, _),
				Tt(_, a),
				h ||
					((O = [
						Dr(n, 'change', t[4]),
						Dr(u, 'click', t[5]),
					]),
					(h = !0));
		},
		p(C, [N]) {
			N & 2 &&
				o !== (o = 'todo-' + C[1]) &&
				Z(n, 'id', o),
				N & 1 && (n.checked = C[0]),
				N & 4 && Ji(l, C[2]),
				N & 2 &&
					i !== (i = 'todo-' + C[1]) &&
					Z(s, 'for', i),
				N & 4 &&
					v !== (v = 'delete ' + C[2]) &&
					Z(u, 'aria-label', v);
		},
		i: He,
		o: He,
		d(C) {
			C && Io(e), (h = !1), Je(O);
		},
	};
}
function _c(t, e, n) {
	let { id: o } = e,
		{ text: r } = e,
		{ done: s } = e;
	const l = Yi();
	function i() {
		(s = this.checked), n(0, s);
	}
	const c = () => l('delete', { id: o });
	return (
		(t.$$set = (u) => {
			'id' in u && n(1, (o = u.id)),
				'text' in u && n(2, (r = u.text)),
				'done' in u && n(0, (s = u.done));
		}),
		(t.$$.update = () => {
			t.$$.dirty & 3 &&
				l('check', { id: o, done: s });
		}),
		[s, o, r, l, i, c]
	);
}
class dc extends uc {
	constructor(e) {
		super(),
			ic(
				this,
				e,
				_c,
				pc,
				Di,
				{ id: 1, text: 2, done: 0 },
				fc,
			);
	}
	get id() {
		return this.$$.ctx[1];
	}
	set id(e) {
		this.$$set({ id: e }), Me();
	}
	get text() {
		return this.$$.ctx[2];
	}
	set text(e) {
		this.$$set({ text: e }), Me();
	}
	get done() {
		return this.$$.ctx[0];
	}
	set done(e) {
		this.$$set({ done: e }), Me();
	}
}
customElements.define(
	'todo-item',
	cc(dc, { id: {}, text: {}, done: {} }, [], [], !0),
);
function zo(t, e) {
	const n = Object.create(null),
		o = t.split(',');
	for (let r = 0; r < o.length; r++) n[o[r]] = !0;
	return e ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const I = {},
	de = [],
	Et = () => {},
	hc = () => !1,
	vc = /^on[^a-z]/,
	Vn = (t) => vc.test(t),
	Bo = (t) => t.startsWith('onUpdate:'),
	Y = Object.assign,
	qo = (t, e) => {
		const n = t.indexOf(e);
		n > -1 && t.splice(n, 1);
	},
	gc = Object.prototype.hasOwnProperty,
	H = (t, e) => gc.call(t, e),
	T = Array.isArray,
	he = (t) => Ke(t) === '[object Map]',
	Zs = (t) => Ke(t) === '[object Set]',
	zr = (t) => Ke(t) === '[object Date]',
	M = (t) => typeof t == 'function',
	X = (t) => typeof t == 'string',
	be = (t) => typeof t == 'symbol',
	z = (t) => t !== null && typeof t == 'object',
	Ys = (t) => (z(t) || M(t)) && M(t.then) && M(t.catch),
	Xs = Object.prototype.toString,
	Ke = (t) => Xs.call(t),
	mc = (t) => Ke(t).slice(8, -1),
	Qs = (t) => Ke(t) === '[object Object]',
	Jo = (t) =>
		X(t) &&
		t !== 'NaN' &&
		t[0] !== '-' &&
		'' + parseInt(t, 10) === t,
	hn = zo(
		',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted',
	),
	Dn = (t) => {
		const e = Object.create(null);
		return (n) => e[n] || (e[n] = t(n));
	},
	yc = /-(\w)/g,
	Lt = Dn((t) =>
		t.replace(yc, (e, n) => (n ? n.toUpperCase() : '')),
	),
	bc = /\B([A-Z])/g,
	gt = Dn((t) => t.replace(bc, '-$1').toLowerCase()),
	tl = Dn((t) => t.charAt(0).toUpperCase() + t.slice(1)),
	so = Dn((t) => (t ? `on${tl(t)}` : '')),
	se = (t, e) => !Object.is(t, e),
	vn = (t, e) => {
		for (let n = 0; n < t.length; n++) t[n](e);
	},
	En = (t, e, n) => {
		Object.defineProperty(t, e, {
			configurable: !0,
			enumerable: !1,
			value: n,
		});
	},
	$c = (t) => {
		const e = parseFloat(t);
		return isNaN(e) ? t : e;
	},
	Br = (t) => {
		const e = X(t) ? Number(t) : NaN;
		return isNaN(e) ? t : e;
	};
let qr;
const Eo = () =>
	qr ||
	(qr =
		typeof globalThis < 'u'
			? globalThis
			: typeof self < 'u'
			? self
			: typeof window < 'u'
			? window
			: typeof global < 'u'
			? global
			: {});
function Ko(t) {
	if (T(t)) {
		const e = {};
		for (let n = 0; n < t.length; n++) {
			const o = t[n],
				r = X(o) ? Sc(o) : Ko(o);
			if (r) for (const s in r) e[s] = r[s];
		}
		return e;
	} else if (X(t) || z(t)) return t;
}
const xc = /;(?![^(]*\))/g,
	wc = /:([^]+)/,
	kc = /\/\*[^]*?\*\//g;
function Sc(t) {
	const e = {};
	return (
		t
			.replace(kc, '')
			.split(xc)
			.forEach((n) => {
				if (n) {
					const o = n.split(wc);
					o.length > 1 &&
						(e[o[0].trim()] = o[1].trim());
				}
			}),
		e
	);
}
function Go(t) {
	let e = '';
	if (X(t)) e = t;
	else if (T(t))
		for (let n = 0; n < t.length; n++) {
			const o = Go(t[n]);
			o && (e += o + ' ');
		}
	else if (z(t))
		for (const n in t) t[n] && (e += n + ' ');
	return e.trim();
}
const Cc =
		'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
	Ec = zo(Cc);
function el(t) {
	return !!t || t === '';
}
function Pc(t, e) {
	if (t.length !== e.length) return !1;
	let n = !0;
	for (let o = 0; n && o < t.length; o++)
		n = Pn(t[o], e[o]);
	return n;
}
function Pn(t, e) {
	if (t === e) return !0;
	let n = zr(t),
		o = zr(e);
	if (n || o)
		return n && o ? t.getTime() === e.getTime() : !1;
	if (((n = be(t)), (o = be(e)), n || o)) return t === e;
	if (((n = T(t)), (o = T(e)), n || o))
		return n && o ? Pc(t, e) : !1;
	if (((n = z(t)), (o = z(e)), n || o)) {
		if (!n || !o) return !1;
		const r = Object.keys(t).length,
			s = Object.keys(e).length;
		if (r !== s) return !1;
		for (const l in t) {
			const i = t.hasOwnProperty(l),
				c = e.hasOwnProperty(l);
			if ((i && !c) || (!i && c) || !Pn(t[l], e[l]))
				return !1;
		}
	}
	return String(t) === String(e);
}
const lo = (t) =>
		X(t)
			? t
			: t == null
			? ''
			: T(t) ||
			  (z(t) &&
					(t.toString === Xs || !M(t.toString)))
			? JSON.stringify(t, nl, 2)
			: String(t),
	nl = (t, e) =>
		e && e.__v_isRef
			? nl(t, e.value)
			: he(e)
			? {
					[`Map(${e.size})`]: [
						...e.entries(),
					].reduce(
						(n, [o, r]) => (
							(n[`${o} =>`] = r), n
						),
						{},
					),
			  }
			: Zs(e)
			? { [`Set(${e.size})`]: [...e.values()] }
			: z(e) && !T(e) && !Qs(e)
			? String(e)
			: e;
let at;
class Ac {
	constructor(e = !1) {
		(this.detached = e),
			(this._active = !0),
			(this.effects = []),
			(this.cleanups = []),
			(this.parent = at),
			!e &&
				at &&
				(this.index =
					(at.scopes || (at.scopes = [])).push(
						this,
					) - 1);
	}
	get active() {
		return this._active;
	}
	run(e) {
		if (this._active) {
			const n = at;
			try {
				return (at = this), e();
			} finally {
				at = n;
			}
		}
	}
	on() {
		at = this;
	}
	off() {
		at = this.parent;
	}
	stop(e) {
		if (this._active) {
			let n, o;
			for (n = 0, o = this.effects.length; n < o; n++)
				this.effects[n].stop();
			for (
				n = 0, o = this.cleanups.length;
				n < o;
				n++
			)
				this.cleanups[n]();
			if (this.scopes)
				for (
					n = 0, o = this.scopes.length;
					n < o;
					n++
				)
					this.scopes[n].stop(!0);
			if (!this.detached && this.parent && !e) {
				const r = this.parent.scopes.pop();
				r &&
					r !== this &&
					((this.parent.scopes[this.index] = r),
					(r.index = this.index));
			}
			(this.parent = void 0), (this._active = !1);
		}
	}
}
function Oc(t, e = at) {
	e && e.active && e.effects.push(t);
}
function ol() {
	return at;
}
function Tc(t) {
	at && at.cleanups.push(t);
}
const Zo = (t) => {
		const e = new Set(t);
		return (e.w = 0), (e.n = 0), e;
	},
	rl = (t) => (t.w & Jt) > 0,
	sl = (t) => (t.n & Jt) > 0,
	Nc = ({ deps: t }) => {
		if (t.length)
			for (let e = 0; e < t.length; e++) t[e].w |= Jt;
	},
	Rc = (t) => {
		const { deps: e } = t;
		if (e.length) {
			let n = 0;
			for (let o = 0; o < e.length; o++) {
				const r = e[o];
				rl(r) && !sl(r)
					? r.delete(t)
					: (e[n++] = r),
					(r.w &= ~Jt),
					(r.n &= ~Jt);
			}
			e.length = n;
		}
	},
	Po = new WeakMap();
let Ne = 0,
	Jt = 1;
const Ao = 30;
let mt;
const ne = Symbol(''),
	Oo = Symbol('');
class Yo {
	constructor(e, n = null, o) {
		(this.fn = e),
			(this.scheduler = n),
			(this.active = !0),
			(this.deps = []),
			(this.parent = void 0),
			Oc(this, o);
	}
	run() {
		if (!this.active) return this.fn();
		let e = mt,
			n = zt;
		for (; e; ) {
			if (e === this) return;
			e = e.parent;
		}
		try {
			return (
				(this.parent = mt),
				(mt = this),
				(zt = !0),
				(Jt = 1 << ++Ne),
				Ne <= Ao ? Nc(this) : Jr(this),
				this.fn()
			);
		} finally {
			Ne <= Ao && Rc(this),
				(Jt = 1 << --Ne),
				(mt = this.parent),
				(zt = n),
				(this.parent = void 0),
				this.deferStop && this.stop();
		}
	}
	stop() {
		mt === this
			? (this.deferStop = !0)
			: this.active &&
			  (Jr(this),
			  this.onStop && this.onStop(),
			  (this.active = !1));
	}
}
function Jr(t) {
	const { deps: e } = t;
	if (e.length) {
		for (let n = 0; n < e.length; n++) e[n].delete(t);
		e.length = 0;
	}
}
let zt = !0;
const ll = [];
function Se() {
	ll.push(zt), (zt = !1);
}
function Ce() {
	const t = ll.pop();
	zt = t === void 0 ? !0 : t;
}
function ct(t, e, n) {
	if (zt && mt) {
		let o = Po.get(t);
		o || Po.set(t, (o = new Map()));
		let r = o.get(n);
		r || o.set(n, (r = Zo())), il(r);
	}
}
function il(t, e) {
	let n = !1;
	Ne <= Ao
		? sl(t) || ((t.n |= Jt), (n = !rl(t)))
		: (n = !t.has(mt)),
		n && (t.add(mt), mt.deps.push(t));
}
function Ft(t, e, n, o, r, s) {
	const l = Po.get(t);
	if (!l) return;
	let i = [];
	if (e === 'clear') i = [...l.values()];
	else if (n === 'length' && T(t)) {
		const c = Number(o);
		l.forEach((u, _) => {
			(_ === 'length' || (!be(_) && _ >= c)) &&
				i.push(u);
		});
	} else
		switch ((n !== void 0 && i.push(l.get(n)), e)) {
			case 'add':
				T(t)
					? Jo(n) && i.push(l.get('length'))
					: (i.push(l.get(ne)),
					  he(t) && i.push(l.get(Oo)));
				break;
			case 'delete':
				T(t) ||
					(i.push(l.get(ne)),
					he(t) && i.push(l.get(Oo)));
				break;
			case 'set':
				he(t) && i.push(l.get(ne));
				break;
		}
	if (i.length === 1) i[0] && To(i[0]);
	else {
		const c = [];
		for (const u of i) u && c.push(...u);
		To(Zo(c));
	}
}
function To(t, e) {
	const n = T(t) ? t : [...t];
	for (const o of n) o.computed && Kr(o);
	for (const o of n) o.computed || Kr(o);
}
function Kr(t, e) {
	(t !== mt || t.allowRecurse) &&
		(t.scheduler ? t.scheduler() : t.run());
}
const jc = zo('__proto__,__v_isRef,__isVue'),
	cl = new Set(
		Object.getOwnPropertyNames(Symbol)
			.filter(
				(t) => t !== 'arguments' && t !== 'caller',
			)
			.map((t) => Symbol[t])
			.filter(be),
	),
	Gr = Mc();
function Mc() {
	const t = {};
	return (
		['includes', 'indexOf', 'lastIndexOf'].forEach(
			(e) => {
				t[e] = function (...n) {
					const o = V(this);
					for (
						let s = 0, l = this.length;
						s < l;
						s++
					)
						ct(o, 'get', s + '');
					const r = o[e](...n);
					return r === -1 || r === !1
						? o[e](...n.map(V))
						: r;
				};
			},
		),
		[
			'push',
			'pop',
			'shift',
			'unshift',
			'splice',
		].forEach((e) => {
			t[e] = function (...n) {
				Se();
				const o = V(this)[e].apply(this, n);
				return Ce(), o;
			};
		}),
		t
	);
}
function Lc(t) {
	const e = V(this);
	return ct(e, 'has', t), e.hasOwnProperty(t);
}
class ul {
	constructor(e = !1, n = !1) {
		(this._isReadonly = e), (this._shallow = n);
	}
	get(e, n, o) {
		const r = this._isReadonly,
			s = this._shallow;
		if (n === '__v_isReactive') return !r;
		if (n === '__v_isReadonly') return r;
		if (n === '__v_isShallow') return s;
		if (
			n === '__v_raw' &&
			o === (r ? (s ? Gc : _l) : s ? pl : fl).get(e)
		)
			return e;
		const l = T(e);
		if (!r) {
			if (l && H(Gr, n)) return Reflect.get(Gr, n, o);
			if (n === 'hasOwnProperty') return Lc;
		}
		const i = Reflect.get(e, n, o);
		return (be(n) ? cl.has(n) : jc(n)) ||
			(r || ct(e, 'get', n), s)
			? i
			: G(i)
			? l && Jo(n)
				? i
				: i.value
			: z(i)
			? r
				? dl(i)
				: tr(i)
			: i;
	}
}
class al extends ul {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, n, o, r) {
		let s = e[n];
		if ($e(s) && G(s) && !G(o)) return !1;
		if (
			!this._shallow &&
			(!An(o) && !$e(o) && ((s = V(s)), (o = V(o))),
			!T(e) && G(s) && !G(o))
		)
			return (s.value = o), !0;
		const l =
				T(e) && Jo(n)
					? Number(n) < e.length
					: H(e, n),
			i = Reflect.set(e, n, o, r);
		return (
			e === V(r) &&
				(l
					? se(o, s) && Ft(e, 'set', n, o)
					: Ft(e, 'add', n, o)),
			i
		);
	}
	deleteProperty(e, n) {
		const o = H(e, n);
		e[n];
		const r = Reflect.deleteProperty(e, n);
		return r && o && Ft(e, 'delete', n, void 0), r;
	}
	has(e, n) {
		const o = Reflect.has(e, n);
		return (!be(n) || !cl.has(n)) && ct(e, 'has', n), o;
	}
	ownKeys(e) {
		return (
			ct(e, 'iterate', T(e) ? 'length' : ne),
			Reflect.ownKeys(e)
		);
	}
}
class Fc extends ul {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, n) {
		return !0;
	}
	deleteProperty(e, n) {
		return !0;
	}
}
const Uc = new al(),
	Hc = new Fc(),
	Vc = new al(!0),
	Xo = (t) => t,
	Wn = (t) => Reflect.getPrototypeOf(t);
function rn(t, e, n = !1, o = !1) {
	t = t.__v_raw;
	const r = V(t),
		s = V(e);
	n || (se(e, s) && ct(r, 'get', e), ct(r, 'get', s));
	const { has: l } = Wn(r),
		i = o ? Xo : n ? nr : De;
	if (l.call(r, e)) return i(t.get(e));
	if (l.call(r, s)) return i(t.get(s));
	t !== r && t.get(e);
}
function sn(t, e = !1) {
	const n = this.__v_raw,
		o = V(n),
		r = V(t);
	return (
		e || (se(t, r) && ct(o, 'has', t), ct(o, 'has', r)),
		t === r ? n.has(t) : n.has(t) || n.has(r)
	);
}
function ln(t, e = !1) {
	return (
		(t = t.__v_raw),
		!e && ct(V(t), 'iterate', ne),
		Reflect.get(t, 'size', t)
	);
}
function Zr(t) {
	t = V(t);
	const e = V(this);
	return (
		Wn(e).has.call(e, t) ||
			(e.add(t), Ft(e, 'add', t, t)),
		this
	);
}
function Yr(t, e) {
	e = V(e);
	const n = V(this),
		{ has: o, get: r } = Wn(n);
	let s = o.call(n, t);
	s || ((t = V(t)), (s = o.call(n, t)));
	const l = r.call(n, t);
	return (
		n.set(t, e),
		s
			? se(e, l) && Ft(n, 'set', t, e)
			: Ft(n, 'add', t, e),
		this
	);
}
function Xr(t) {
	const e = V(this),
		{ has: n, get: o } = Wn(e);
	let r = n.call(e, t);
	r || ((t = V(t)), (r = n.call(e, t))),
		o && o.call(e, t);
	const s = e.delete(t);
	return r && Ft(e, 'delete', t, void 0), s;
}
function Qr() {
	const t = V(this),
		e = t.size !== 0,
		n = t.clear();
	return e && Ft(t, 'clear', void 0, void 0), n;
}
function cn(t, e) {
	return function (n, o) {
		const r = this,
			s = r.__v_raw,
			l = V(s),
			i = e ? Xo : t ? nr : De;
		return (
			!t && ct(l, 'iterate', ne),
			s.forEach((c, u) => n.call(o, i(c), i(u), r))
		);
	};
}
function un(t, e, n) {
	return function (...o) {
		const r = this.__v_raw,
			s = V(r),
			l = he(s),
			i =
				t === 'entries' ||
				(t === Symbol.iterator && l),
			c = t === 'keys' && l,
			u = r[t](...o),
			_ = n ? Xo : e ? nr : De;
		return (
			!e && ct(s, 'iterate', c ? Oo : ne),
			{
				next() {
					const { value: a, done: v } = u.next();
					return v
						? { value: a, done: v }
						: {
								value: i
									? [_(a[0]), _(a[1])]
									: _(a),
								done: v,
						  };
				},
				[Symbol.iterator]() {
					return this;
				},
			}
		);
	};
}
function Dt(t) {
	return function (...e) {
		return t === 'delete' ? !1 : this;
	};
}
function Dc() {
	const t = {
			get(r) {
				return rn(this, r);
			},
			get size() {
				return ln(this);
			},
			has: sn,
			add: Zr,
			set: Yr,
			delete: Xr,
			clear: Qr,
			forEach: cn(!1, !1),
		},
		e = {
			get(r) {
				return rn(this, r, !1, !0);
			},
			get size() {
				return ln(this);
			},
			has: sn,
			add: Zr,
			set: Yr,
			delete: Xr,
			clear: Qr,
			forEach: cn(!1, !0),
		},
		n = {
			get(r) {
				return rn(this, r, !0);
			},
			get size() {
				return ln(this, !0);
			},
			has(r) {
				return sn.call(this, r, !0);
			},
			add: Dt('add'),
			set: Dt('set'),
			delete: Dt('delete'),
			clear: Dt('clear'),
			forEach: cn(!0, !1),
		},
		o = {
			get(r) {
				return rn(this, r, !0, !0);
			},
			get size() {
				return ln(this, !0);
			},
			has(r) {
				return sn.call(this, r, !0);
			},
			add: Dt('add'),
			set: Dt('set'),
			delete: Dt('delete'),
			clear: Dt('clear'),
			forEach: cn(!0, !0),
		};
	return (
		[
			'keys',
			'values',
			'entries',
			Symbol.iterator,
		].forEach((r) => {
			(t[r] = un(r, !1, !1)),
				(n[r] = un(r, !0, !1)),
				(e[r] = un(r, !1, !0)),
				(o[r] = un(r, !0, !0));
		}),
		[t, n, e, o]
	);
}
const [Wc, Ic, zc, Bc] = Dc();
function Qo(t, e) {
	const n = e ? (t ? Bc : zc) : t ? Ic : Wc;
	return (o, r, s) =>
		r === '__v_isReactive'
			? !t
			: r === '__v_isReadonly'
			? t
			: r === '__v_raw'
			? o
			: Reflect.get(H(n, r) && r in o ? n : o, r, s);
}
const qc = { get: Qo(!1, !1) },
	Jc = { get: Qo(!1, !0) },
	Kc = { get: Qo(!0, !1) },
	fl = new WeakMap(),
	pl = new WeakMap(),
	_l = new WeakMap(),
	Gc = new WeakMap();
function Zc(t) {
	switch (t) {
		case 'Object':
		case 'Array':
			return 1;
		case 'Map':
		case 'Set':
		case 'WeakMap':
		case 'WeakSet':
			return 2;
		default:
			return 0;
	}
}
function Yc(t) {
	return t.__v_skip || !Object.isExtensible(t)
		? 0
		: Zc(mc(t));
}
function tr(t) {
	return $e(t) ? t : er(t, !1, Uc, qc, fl);
}
function Xc(t) {
	return er(t, !1, Vc, Jc, pl);
}
function dl(t) {
	return er(t, !0, Hc, Kc, _l);
}
function er(t, e, n, o, r) {
	if (!z(t) || (t.__v_raw && !(e && t.__v_isReactive)))
		return t;
	const s = r.get(t);
	if (s) return s;
	const l = Yc(t);
	if (l === 0) return t;
	const i = new Proxy(t, l === 2 ? o : n);
	return r.set(t, i), i;
}
function ve(t) {
	return $e(t)
		? ve(t.__v_raw)
		: !!(t && t.__v_isReactive);
}
function $e(t) {
	return !!(t && t.__v_isReadonly);
}
function An(t) {
	return !!(t && t.__v_isShallow);
}
function hl(t) {
	return ve(t) || $e(t);
}
function V(t) {
	const e = t && t.__v_raw;
	return e ? V(e) : t;
}
function vl(t) {
	return En(t, '__v_skip', !0), t;
}
const De = (t) => (z(t) ? tr(t) : t),
	nr = (t) => (z(t) ? dl(t) : t);
function gl(t) {
	zt && mt && ((t = V(t)), il(t.dep || (t.dep = Zo())));
}
function ml(t, e) {
	t = V(t);
	const n = t.dep;
	n && To(n);
}
function G(t) {
	return !!(t && t.__v_isRef === !0);
}
function Qc(t) {
	return tu(t, !0);
}
function tu(t, e) {
	return G(t) ? t : new eu(t, e);
}
class eu {
	constructor(e, n) {
		(this.__v_isShallow = n),
			(this.dep = void 0),
			(this.__v_isRef = !0),
			(this._rawValue = n ? e : V(e)),
			(this._value = n ? e : De(e));
	}
	get value() {
		return gl(this), this._value;
	}
	set value(e) {
		const n = this.__v_isShallow || An(e) || $e(e);
		(e = n ? e : V(e)),
			se(e, this._rawValue) &&
				((this._rawValue = e),
				(this._value = n ? e : De(e)),
				ml(this));
	}
}
function Zt(t) {
	return G(t) ? t.value : t;
}
const nu = {
	get: (t, e, n) => Zt(Reflect.get(t, e, n)),
	set: (t, e, n, o) => {
		const r = t[e];
		return G(r) && !G(n)
			? ((r.value = n), !0)
			: Reflect.set(t, e, n, o);
	},
};
function yl(t) {
	return ve(t) ? t : new Proxy(t, nu);
}
class ou {
	constructor(e, n, o, r) {
		(this._setter = n),
			(this.dep = void 0),
			(this.__v_isRef = !0),
			(this.__v_isReadonly = !1),
			(this._dirty = !0),
			(this.effect = new Yo(e, () => {
				this._dirty ||
					((this._dirty = !0), ml(this));
			})),
			(this.effect.computed = this),
			(this.effect.active = this._cacheable = !r),
			(this.__v_isReadonly = o);
	}
	get value() {
		const e = V(this);
		return (
			gl(e),
			(e._dirty || !e._cacheable) &&
				((e._dirty = !1),
				(e._value = e.effect.run())),
			e._value
		);
	}
	set value(e) {
		this._setter(e);
	}
}
function ru(t, e, n = !1) {
	let o, r;
	const s = M(t);
	return (
		s
			? ((o = t), (r = Et))
			: ((o = t.get), (r = t.set)),
		new ou(o, r, s || !r, n)
	);
}
function Bt(t, e, n, o) {
	let r;
	try {
		r = o ? t(...o) : t();
	} catch (s) {
		In(s, e, n);
	}
	return r;
}
function $t(t, e, n, o) {
	if (M(t)) {
		const s = Bt(t, e, n, o);
		return (
			s &&
				Ys(s) &&
				s.catch((l) => {
					In(l, e, n);
				}),
			s
		);
	}
	const r = [];
	for (let s = 0; s < t.length; s++)
		r.push($t(t[s], e, n, o));
	return r;
}
function In(t, e, n, o = !0) {
	const r = e ? e.vnode : null;
	if (e) {
		let s = e.parent;
		const l = e.proxy,
			i = n;
		for (; s; ) {
			const u = s.ec;
			if (u) {
				for (let _ = 0; _ < u.length; _++)
					if (u[_](t, l, i) === !1) return;
			}
			s = s.parent;
		}
		const c = e.appContext.config.errorHandler;
		if (c) {
			Bt(c, null, 10, [t, l, i]);
			return;
		}
	}
	su(t, n, r, o);
}
function su(t, e, n, o = !0) {
	console.error(t);
}
let We = !1,
	No = !1;
const et = [];
let St = 0;
const ge = [];
let Rt = null,
	Xt = 0;
const bl = Promise.resolve();
let or = null;
function $l(t) {
	const e = or || bl;
	return t ? e.then(this ? t.bind(this) : t) : e;
}
function lu(t) {
	let e = St + 1,
		n = et.length;
	for (; e < n; ) {
		const o = (e + n) >>> 1,
			r = et[o],
			s = Ie(r);
		s < t || (s === t && r.pre) ? (e = o + 1) : (n = o);
	}
	return e;
}
function rr(t) {
	(!et.length ||
		!et.includes(
			t,
			We && t.allowRecurse ? St + 1 : St,
		)) &&
		(t.id == null
			? et.push(t)
			: et.splice(lu(t.id), 0, t),
		xl());
}
function xl() {
	!We && !No && ((No = !0), (or = bl.then(kl)));
}
function iu(t) {
	const e = et.indexOf(t);
	e > St && et.splice(e, 1);
}
function cu(t) {
	T(t)
		? ge.push(...t)
		: (!Rt ||
				!Rt.includes(
					t,
					t.allowRecurse ? Xt + 1 : Xt,
				)) &&
		  ge.push(t),
		xl();
}
function ts(t, e = We ? St + 1 : 0) {
	for (; e < et.length; e++) {
		const n = et[e];
		n && n.pre && (et.splice(e, 1), e--, n());
	}
}
function wl(t) {
	if (ge.length) {
		const e = [...new Set(ge)];
		if (((ge.length = 0), Rt)) {
			Rt.push(...e);
			return;
		}
		for (
			Rt = e,
				Rt.sort((n, o) => Ie(n) - Ie(o)),
				Xt = 0;
			Xt < Rt.length;
			Xt++
		)
			Rt[Xt]();
		(Rt = null), (Xt = 0);
	}
}
const Ie = (t) => (t.id == null ? 1 / 0 : t.id),
	uu = (t, e) => {
		const n = Ie(t) - Ie(e);
		if (n === 0) {
			if (t.pre && !e.pre) return -1;
			if (e.pre && !t.pre) return 1;
		}
		return n;
	};
function kl(t) {
	(No = !1), (We = !0), et.sort(uu);
	try {
		for (St = 0; St < et.length; St++) {
			const e = et[St];
			e && e.active !== !1 && Bt(e, null, 14);
		}
	} finally {
		(St = 0),
			(et.length = 0),
			wl(),
			(We = !1),
			(or = null),
			(et.length || ge.length) && kl();
	}
}
function au(t, e, ...n) {
	if (t.isUnmounted) return;
	const o = t.vnode.props || I;
	let r = n;
	const s = e.startsWith('update:'),
		l = s && e.slice(7);
	if (l && l in o) {
		const _ = `${
				l === 'modelValue' ? 'model' : l
			}Modifiers`,
			{ number: a, trim: v } = o[_] || I;
		v && (r = n.map((h) => (X(h) ? h.trim() : h))),
			a && (r = n.map($c));
	}
	let i,
		c = o[(i = so(e))] || o[(i = so(Lt(e)))];
	!c && s && (c = o[(i = so(gt(e)))]),
		c && $t(c, t, 6, r);
	const u = o[i + 'Once'];
	if (u) {
		if (!t.emitted) t.emitted = {};
		else if (t.emitted[i]) return;
		(t.emitted[i] = !0), $t(u, t, 6, r);
	}
}
function Sl(t, e, n = !1) {
	const o = e.emitsCache,
		r = o.get(t);
	if (r !== void 0) return r;
	const s = t.emits;
	let l = {},
		i = !1;
	if (!M(t)) {
		const c = (u) => {
			const _ = Sl(u, e, !0);
			_ && ((i = !0), Y(l, _));
		};
		!n && e.mixins.length && e.mixins.forEach(c),
			t.extends && c(t.extends),
			t.mixins && t.mixins.forEach(c);
	}
	return !s && !i
		? (z(t) && o.set(t, null), null)
		: (T(s) ? s.forEach((c) => (l[c] = null)) : Y(l, s),
		  z(t) && o.set(t, l),
		  l);
}
function zn(t, e) {
	return !t || !Vn(e)
		? !1
		: ((e = e.slice(2).replace(/Once$/, '')),
		  H(t, e[0].toLowerCase() + e.slice(1)) ||
				H(t, gt(e)) ||
				H(t, e));
}
let yt = null,
	Cl = null;
function On(t) {
	const e = yt;
	return (
		(yt = t), (Cl = (t && t.type.__scopeId) || null), e
	);
}
function fu(t, e = yt, n) {
	if (!e || t._n) return t;
	const o = (...r) => {
		o._d && as(-1);
		const s = On(e);
		let l;
		try {
			l = t(...r);
		} finally {
			On(s), o._d && as(1);
		}
		return l;
	};
	return (o._n = !0), (o._c = !0), (o._d = !0), o;
}
function io(t) {
	const {
		type: e,
		vnode: n,
		proxy: o,
		withProxy: r,
		props: s,
		propsOptions: [l],
		slots: i,
		attrs: c,
		emit: u,
		render: _,
		renderCache: a,
		data: v,
		setupState: h,
		ctx: O,
		inheritAttrs: C,
	} = t;
	let N, j;
	const F = On(t);
	try {
		if (n.shapeFlag & 4) {
			const A = r || o;
			(N = kt(_.call(A, A, a, s, h, v, O))), (j = c);
		} else {
			const A = e;
			(N = kt(
				A.length > 1
					? A(s, { attrs: c, slots: i, emit: u })
					: A(s, null),
			)),
				(j = e.props ? c : pu(c));
		}
	} catch (A) {
		(Fe.length = 0), In(A, t, 1), (N = qt(ze));
	}
	let L = N;
	if (j && C !== !1) {
		const A = Object.keys(j),
			{ shapeFlag: st } = L;
		A.length &&
			st & 7 &&
			(l && A.some(Bo) && (j = _u(j, l)),
			(L = xe(L, j)));
	}
	return (
		n.dirs &&
			((L = xe(L)),
			(L.dirs = L.dirs
				? L.dirs.concat(n.dirs)
				: n.dirs)),
		n.transition && (L.transition = n.transition),
		(N = L),
		On(F),
		N
	);
}
const pu = (t) => {
		let e;
		for (const n in t)
			(n === 'class' || n === 'style' || Vn(n)) &&
				((e || (e = {}))[n] = t[n]);
		return e;
	},
	_u = (t, e) => {
		const n = {};
		for (const o in t)
			(!Bo(o) || !(o.slice(9) in e)) && (n[o] = t[o]);
		return n;
	};
function du(t, e, n) {
	const { props: o, children: r, component: s } = t,
		{ props: l, children: i, patchFlag: c } = e,
		u = s.emitsOptions;
	if (e.dirs || e.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return o ? es(o, l, u) : !!l;
		if (c & 8) {
			const _ = e.dynamicProps;
			for (let a = 0; a < _.length; a++) {
				const v = _[a];
				if (l[v] !== o[v] && !zn(u, v)) return !0;
			}
		}
	} else
		return (r || i) && (!i || !i.$stable)
			? !0
			: o === l
			? !1
			: o
			? l
				? es(o, l, u)
				: !0
			: !!l;
	return !1;
}
function es(t, e, n) {
	const o = Object.keys(e);
	if (o.length !== Object.keys(t).length) return !0;
	for (let r = 0; r < o.length; r++) {
		const s = o[r];
		if (e[s] !== t[s] && !zn(n, s)) return !0;
	}
	return !1;
}
function hu({ vnode: t, parent: e }, n) {
	for (; e && e.subTree === t; )
		((t = e.vnode).el = n), (e = e.parent);
}
const vu = Symbol.for('v-ndc'),
	gu = (t) => t.__isSuspense;
function mu(t, e) {
	e && e.pendingBranch
		? T(t)
			? e.effects.push(...t)
			: e.effects.push(t)
		: cu(t);
}
const an = {};
function co(t, e, n) {
	return El(t, e, n);
}
function El(
	t,
	e,
	{
		immediate: n,
		deep: o,
		flush: r,
		onTrack: s,
		onTrigger: l,
	} = I,
) {
	var i;
	const c =
		ol() === ((i = nt) == null ? void 0 : i.scope)
			? nt
			: null;
	let u,
		_ = !1,
		a = !1;
	if (
		(G(t)
			? ((u = () => t.value), (_ = An(t)))
			: ve(t)
			? ((u = () => t), (o = !0))
			: T(t)
			? ((a = !0),
			  (_ = t.some((A) => ve(A) || An(A))),
			  (u = () =>
					t.map((A) => {
						if (G(A)) return A.value;
						if (ve(A)) return te(A);
						if (M(A)) return Bt(A, c, 2);
					})))
			: M(t)
			? e
				? (u = () => Bt(t, c, 2))
				: (u = () => {
						if (!(c && c.isUnmounted))
							return (
								v && v(), $t(t, c, 3, [h])
							);
				  })
			: (u = Et),
		e && o)
	) {
		const A = u;
		u = () => te(A());
	}
	let v,
		h = (A) => {
			v = F.onStop = () => {
				Bt(A, c, 4);
			};
		},
		O;
	if (qe)
		if (
			((h = Et),
			e
				? n &&
				  $t(e, c, 3, [u(), a ? [] : void 0, h])
				: u(),
			r === 'sync')
		) {
			const A = va();
			O =
				A.__watcherHandles ||
				(A.__watcherHandles = []);
		} else return Et;
	let C = a ? new Array(t.length).fill(an) : an;
	const N = () => {
		if (F.active)
			if (e) {
				const A = F.run();
				(o ||
					_ ||
					(a
						? A.some((st, Ht) => se(st, C[Ht]))
						: se(A, C))) &&
					(v && v(),
					$t(e, c, 3, [
						A,
						C === an
							? void 0
							: a && C[0] === an
							? []
							: C,
						h,
					]),
					(C = A));
			} else F.run();
	};
	N.allowRecurse = !!e;
	let j;
	r === 'sync'
		? (j = N)
		: r === 'post'
		? (j = () => it(N, c && c.suspense))
		: ((N.pre = !0),
		  c && (N.id = c.uid),
		  (j = () => rr(N)));
	const F = new Yo(u, j);
	e
		? n
			? N()
			: (C = F.run())
		: r === 'post'
		? it(F.run.bind(F), c && c.suspense)
		: F.run();
	const L = () => {
		F.stop(), c && c.scope && qo(c.scope.effects, F);
	};
	return O && O.push(L), L;
}
function yu(t, e, n) {
	const o = this.proxy,
		r = X(t)
			? t.includes('.')
				? Pl(o, t)
				: () => o[t]
			: t.bind(o, o);
	let s;
	M(e) ? (s = e) : ((s = e.handler), (n = e));
	const l = nt;
	we(this);
	const i = El(r, s.bind(o), n);
	return l ? we(l) : oe(), i;
}
function Pl(t, e) {
	const n = e.split('.');
	return () => {
		let o = t;
		for (let r = 0; r < n.length && o; r++) o = o[n[r]];
		return o;
	};
}
function te(t, e) {
	if (
		!z(t) ||
		t.__v_skip ||
		((e = e || new Set()), e.has(t))
	)
		return t;
	if ((e.add(t), G(t))) te(t.value, e);
	else if (T(t))
		for (let n = 0; n < t.length; n++) te(t[n], e);
	else if (Zs(t) || he(t))
		t.forEach((n) => {
			te(n, e);
		});
	else if (Qs(t)) for (const n in t) te(t[n], e);
	return t;
}
function uo(t, e) {
	const n = yt;
	if (n === null) return t;
	const o = Kn(n) || n.proxy,
		r = t.dirs || (t.dirs = []);
	for (let s = 0; s < e.length; s++) {
		let [l, i, c, u = I] = e[s];
		l &&
			(M(l) && (l = { mounted: l, updated: l }),
			l.deep && te(i),
			r.push({
				dir: l,
				instance: o,
				value: i,
				oldValue: void 0,
				arg: c,
				modifiers: u,
			}));
	}
	return t;
}
function Kt(t, e, n, o) {
	const r = t.dirs,
		s = e && e.dirs;
	for (let l = 0; l < r.length; l++) {
		const i = r[l];
		s && (i.oldValue = s[l].value);
		let c = i.dir[o];
		c && (Se(), $t(c, n, 8, [t.el, i, t, e]), Ce());
	}
}
/*! #__NO_SIDE_EFFECTS__ */ function bu(t, e) {
	return M(t) ? Y({ name: t.name }, e, { setup: t }) : t;
}
const gn = (t) => !!t.type.__asyncLoader,
	Al = (t) => t.type.__isKeepAlive;
function $u(t, e) {
	Ol(t, 'a', e);
}
function xu(t, e) {
	Ol(t, 'da', e);
}
function Ol(t, e, n = nt) {
	const o =
		t.__wdc ||
		(t.__wdc = () => {
			let r = n;
			for (; r; ) {
				if (r.isDeactivated) return;
				r = r.parent;
			}
			return t();
		});
	if ((Bn(e, o, n), n)) {
		let r = n.parent;
		for (; r && r.parent; )
			Al(r.parent.vnode) && wu(o, e, n, r),
				(r = r.parent);
	}
}
function wu(t, e, n, o) {
	const r = Bn(e, t, o, !0);
	Tl(() => {
		qo(o[e], r);
	}, n);
}
function Bn(t, e, n = nt, o = !1) {
	if (n) {
		const r = n[t] || (n[t] = []),
			s =
				e.__weh ||
				(e.__weh = (...l) => {
					if (n.isUnmounted) return;
					Se(), we(n);
					const i = $t(e, n, t, l);
					return oe(), Ce(), i;
				});
		return o ? r.unshift(s) : r.push(s), s;
	}
}
const Ut =
		(t) =>
		(e, n = nt) =>
			(!qe || t === 'sp') &&
			Bn(t, (...o) => e(...o), n),
	ku = Ut('bm'),
	Su = Ut('m'),
	Cu = Ut('bu'),
	Eu = Ut('u'),
	Pu = Ut('bum'),
	Tl = Ut('um'),
	Au = Ut('sp'),
	Ou = Ut('rtg'),
	Tu = Ut('rtc');
function Nu(t, e = nt) {
	Bn('ec', t, e);
}
const Ro = (t) =>
		t
			? Dl(t)
				? Kn(t) || t.proxy
				: Ro(t.parent)
			: null,
	Le = Y(Object.create(null), {
		$: (t) => t,
		$el: (t) => t.vnode.el,
		$data: (t) => t.data,
		$props: (t) => t.props,
		$attrs: (t) => t.attrs,
		$slots: (t) => t.slots,
		$refs: (t) => t.refs,
		$parent: (t) => Ro(t.parent),
		$root: (t) => Ro(t.root),
		$emit: (t) => t.emit,
		$options: (t) => sr(t),
		$forceUpdate: (t) =>
			t.f || (t.f = () => rr(t.update)),
		$nextTick: (t) => t.n || (t.n = $l.bind(t.proxy)),
		$watch: (t) => yu.bind(t),
	}),
	ao = (t, e) => t !== I && !t.__isScriptSetup && H(t, e),
	Ru = {
		get({ _: t }, e) {
			const {
				ctx: n,
				setupState: o,
				data: r,
				props: s,
				accessCache: l,
				type: i,
				appContext: c,
			} = t;
			let u;
			if (e[0] !== '$') {
				const h = l[e];
				if (h !== void 0)
					switch (h) {
						case 1:
							return o[e];
						case 2:
							return r[e];
						case 4:
							return n[e];
						case 3:
							return s[e];
					}
				else {
					if (ao(o, e)) return (l[e] = 1), o[e];
					if (r !== I && H(r, e))
						return (l[e] = 2), r[e];
					if ((u = t.propsOptions[0]) && H(u, e))
						return (l[e] = 3), s[e];
					if (n !== I && H(n, e))
						return (l[e] = 4), n[e];
					jo && (l[e] = 0);
				}
			}
			const _ = Le[e];
			let a, v;
			if (_)
				return (
					e === '$attrs' && ct(t, 'get', e), _(t)
				);
			if ((a = i.__cssModules) && (a = a[e]))
				return a;
			if (n !== I && H(n, e)) return (l[e] = 4), n[e];
			if (((v = c.config.globalProperties), H(v, e)))
				return v[e];
		},
		set({ _: t }, e, n) {
			const { data: o, setupState: r, ctx: s } = t;
			return ao(r, e)
				? ((r[e] = n), !0)
				: o !== I && H(o, e)
				? ((o[e] = n), !0)
				: H(t.props, e) ||
				  (e[0] === '$' && e.slice(1) in t)
				? !1
				: ((s[e] = n), !0);
		},
		has(
			{
				_: {
					data: t,
					setupState: e,
					accessCache: n,
					ctx: o,
					appContext: r,
					propsOptions: s,
				},
			},
			l,
		) {
			let i;
			return (
				!!n[l] ||
				(t !== I && H(t, l)) ||
				ao(e, l) ||
				((i = s[0]) && H(i, l)) ||
				H(o, l) ||
				H(Le, l) ||
				H(r.config.globalProperties, l)
			);
		},
		defineProperty(t, e, n) {
			return (
				n.get != null
					? (t._.accessCache[e] = 0)
					: H(n, 'value') &&
					  this.set(t, e, n.value, null),
				Reflect.defineProperty(t, e, n)
			);
		},
	};
function ns(t) {
	return T(t)
		? t.reduce((e, n) => ((e[n] = null), e), {})
		: t;
}
let jo = !0;
function ju(t) {
	const e = sr(t),
		n = t.proxy,
		o = t.ctx;
	(jo = !1),
		e.beforeCreate && os(e.beforeCreate, t, 'bc');
	const {
		data: r,
		computed: s,
		methods: l,
		watch: i,
		provide: c,
		inject: u,
		created: _,
		beforeMount: a,
		mounted: v,
		beforeUpdate: h,
		updated: O,
		activated: C,
		deactivated: N,
		beforeDestroy: j,
		beforeUnmount: F,
		destroyed: L,
		unmounted: A,
		render: st,
		renderTracked: Ht,
		renderTriggered: Pt,
		errorCaptured: _t,
		serverPrefetch: Q,
		expose: pt,
		inheritAttrs: Ee,
		components: Ge,
		directives: Ze,
		filters: Gn,
	} = e;
	if ((u && Mu(u, o, null), l))
		for (const q in l) {
			const W = l[q];
			M(W) && (o[q] = W.bind(n));
		}
	if (r) {
		const q = r.call(n, n);
		z(q) && (t.data = tr(q));
	}
	if (((jo = !0), s))
		for (const q in s) {
			const W = s[q],
				At = M(W)
					? W.bind(n, n)
					: M(W.get)
					? W.get.bind(n, n)
					: Et,
				Zn = !M(W) && M(W.set) ? W.set.bind(n) : Et,
				Pe = Uo({ get: At, set: Zn });
			Object.defineProperty(o, q, {
				enumerable: !0,
				configurable: !0,
				get: () => Pe.value,
				set: (le) => (Pe.value = le),
			});
		}
	if (i) for (const q in i) Nl(i[q], o, n, q);
	if (c) {
		const q = M(c) ? c.call(n) : c;
		Reflect.ownKeys(q).forEach((W) => {
			Du(W, q[W]);
		});
	}
	_ && os(_, t, 'c');
	function lt(q, W) {
		T(W)
			? W.forEach((At) => q(At.bind(n)))
			: W && q(W.bind(n));
	}
	if (
		(lt(ku, a),
		lt(Su, v),
		lt(Cu, h),
		lt(Eu, O),
		lt($u, C),
		lt(xu, N),
		lt(Nu, _t),
		lt(Tu, Ht),
		lt(Ou, Pt),
		lt(Pu, F),
		lt(Tl, A),
		lt(Au, Q),
		T(pt))
	)
		if (pt.length) {
			const q = t.exposed || (t.exposed = {});
			pt.forEach((W) => {
				Object.defineProperty(q, W, {
					get: () => n[W],
					set: (At) => (n[W] = At),
				});
			});
		} else t.exposed || (t.exposed = {});
	st && t.render === Et && (t.render = st),
		Ee != null && (t.inheritAttrs = Ee),
		Ge && (t.components = Ge),
		Ze && (t.directives = Ze);
}
function Mu(t, e, n = Et) {
	T(t) && (t = Mo(t));
	for (const o in t) {
		const r = t[o];
		let s;
		z(r)
			? 'default' in r
				? (s = mn(r.from || o, r.default, !0))
				: (s = mn(r.from || o))
			: (s = mn(r)),
			G(s)
				? Object.defineProperty(e, o, {
						enumerable: !0,
						configurable: !0,
						get: () => s.value,
						set: (l) => (s.value = l),
				  })
				: (e[o] = s);
	}
}
function os(t, e, n) {
	$t(
		T(t)
			? t.map((o) => o.bind(e.proxy))
			: t.bind(e.proxy),
		e,
		n,
	);
}
function Nl(t, e, n, o) {
	const r = o.includes('.') ? Pl(n, o) : () => n[o];
	if (X(t)) {
		const s = e[t];
		M(s) && co(r, s);
	} else if (M(t)) co(r, t.bind(n));
	else if (z(t))
		if (T(t)) t.forEach((s) => Nl(s, e, n, o));
		else {
			const s = M(t.handler)
				? t.handler.bind(n)
				: e[t.handler];
			M(s) && co(r, s, t);
		}
}
function sr(t) {
	const e = t.type,
		{ mixins: n, extends: o } = e,
		{
			mixins: r,
			optionsCache: s,
			config: { optionMergeStrategies: l },
		} = t.appContext,
		i = s.get(e);
	let c;
	return (
		i
			? (c = i)
			: !r.length && !n && !o
			? (c = e)
			: ((c = {}),
			  r.length && r.forEach((u) => Tn(c, u, l, !0)),
			  Tn(c, e, l)),
		z(e) && s.set(e, c),
		c
	);
}
function Tn(t, e, n, o = !1) {
	const { mixins: r, extends: s } = e;
	s && Tn(t, s, n, !0),
		r && r.forEach((l) => Tn(t, l, n, !0));
	for (const l in e)
		if (!(o && l === 'expose')) {
			const i = Lu[l] || (n && n[l]);
			t[l] = i ? i(t[l], e[l]) : e[l];
		}
	return t;
}
const Lu = {
	data: rs,
	props: ss,
	emits: ss,
	methods: Re,
	computed: Re,
	beforeCreate: rt,
	created: rt,
	beforeMount: rt,
	mounted: rt,
	beforeUpdate: rt,
	updated: rt,
	beforeDestroy: rt,
	beforeUnmount: rt,
	destroyed: rt,
	unmounted: rt,
	activated: rt,
	deactivated: rt,
	errorCaptured: rt,
	serverPrefetch: rt,
	components: Re,
	directives: Re,
	watch: Uu,
	provide: rs,
	inject: Fu,
};
function rs(t, e) {
	return e
		? t
			? function () {
					return Y(
						M(t) ? t.call(this, this) : t,
						M(e) ? e.call(this, this) : e,
					);
			  }
			: e
		: t;
}
function Fu(t, e) {
	return Re(Mo(t), Mo(e));
}
function Mo(t) {
	if (T(t)) {
		const e = {};
		for (let n = 0; n < t.length; n++) e[t[n]] = t[n];
		return e;
	}
	return t;
}
function rt(t, e) {
	return t ? [...new Set([].concat(t, e))] : e;
}
function Re(t, e) {
	return t ? Y(Object.create(null), t, e) : e;
}
function ss(t, e) {
	return t
		? T(t) && T(e)
			? [...new Set([...t, ...e])]
			: Y(Object.create(null), ns(t), ns(e ?? {}))
		: e;
}
function Uu(t, e) {
	if (!t) return e;
	if (!e) return t;
	const n = Y(Object.create(null), t);
	for (const o in e) n[o] = rt(t[o], e[o]);
	return n;
}
function Rl() {
	return {
		app: null,
		config: {
			isNativeTag: hc,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {},
		},
		mixins: [],
		components: {},
		directives: {},
		provides: Object.create(null),
		optionsCache: new WeakMap(),
		propsCache: new WeakMap(),
		emitsCache: new WeakMap(),
	};
}
let Hu = 0;
function Vu(t, e) {
	return function (n, o = null) {
		M(n) || (n = Y({}, n)),
			o != null && !z(o) && (o = null);
		const r = Rl(),
			s = new WeakSet();
		let l = !1;
		const i = (r.app = {
			_uid: Hu++,
			_component: n,
			_props: o,
			_container: null,
			_context: r,
			_instance: null,
			version: ga,
			get config() {
				return r.config;
			},
			set config(c) {},
			use(c, ...u) {
				return (
					s.has(c) ||
						(c && M(c.install)
							? (s.add(c), c.install(i, ...u))
							: M(c) &&
							  (s.add(c), c(i, ...u))),
					i
				);
			},
			mixin(c) {
				return (
					r.mixins.includes(c) ||
						r.mixins.push(c),
					i
				);
			},
			component(c, u) {
				return u
					? ((r.components[c] = u), i)
					: r.components[c];
			},
			directive(c, u) {
				return u
					? ((r.directives[c] = u), i)
					: r.directives[c];
			},
			mount(c, u, _) {
				if (!l) {
					const a = qt(n, o);
					return (
						(a.appContext = r),
						u && e ? e(a, c) : t(a, c, _),
						(l = !0),
						(i._container = c),
						(c.__vue_app__ = i),
						Kn(a.component) || a.component.proxy
					);
				}
			},
			unmount() {
				l &&
					(t(null, i._container),
					delete i._container.__vue_app__);
			},
			provide(c, u) {
				return (r.provides[c] = u), i;
			},
			runWithContext(c) {
				Nn = i;
				try {
					return c();
				} finally {
					Nn = null;
				}
			},
		});
		return i;
	};
}
let Nn = null;
function Du(t, e) {
	if (nt) {
		let n = nt.provides;
		const o = nt.parent && nt.parent.provides;
		o === n && (n = nt.provides = Object.create(o)),
			(n[t] = e);
	}
}
function mn(t, e, n = !1) {
	const o = nt || yt;
	if (o || Nn) {
		const r = o
			? o.parent == null
				? o.vnode.appContext &&
				  o.vnode.appContext.provides
				: o.parent.provides
			: Nn._context.provides;
		if (r && t in r) return r[t];
		if (arguments.length > 1)
			return n && M(e) ? e.call(o && o.proxy) : e;
	}
}
function Wu(t, e, n, o = !1) {
	const r = {},
		s = {};
	En(s, Jn, 1),
		(t.propsDefaults = Object.create(null)),
		jl(t, e, r, s);
	for (const l in t.propsOptions[0])
		l in r || (r[l] = void 0);
	n
		? (t.props = o ? r : Xc(r))
		: t.type.props
		? (t.props = r)
		: (t.props = s),
		(t.attrs = s);
}
function Iu(t, e, n, o) {
	const {
			props: r,
			attrs: s,
			vnode: { patchFlag: l },
		} = t,
		i = V(r),
		[c] = t.propsOptions;
	let u = !1;
	if ((o || l > 0) && !(l & 16)) {
		if (l & 8) {
			const _ = t.vnode.dynamicProps;
			for (let a = 0; a < _.length; a++) {
				let v = _[a];
				if (zn(t.emitsOptions, v)) continue;
				const h = e[v];
				if (c)
					if (H(s, v))
						h !== s[v] &&
							((s[v] = h), (u = !0));
					else {
						const O = Lt(v);
						r[O] = Lo(c, i, O, h, t, !1);
					}
				else h !== s[v] && ((s[v] = h), (u = !0));
			}
		}
	} else {
		jl(t, e, r, s) && (u = !0);
		let _;
		for (const a in i)
			(!e ||
				(!H(e, a) &&
					((_ = gt(a)) === a || !H(e, _)))) &&
				(c
					? n &&
					  (n[a] !== void 0 ||
							n[_] !== void 0) &&
					  (r[a] = Lo(c, i, a, void 0, t, !0))
					: delete r[a]);
		if (s !== i)
			for (const a in s)
				(!e || !H(e, a)) && (delete s[a], (u = !0));
	}
	u && Ft(t, 'set', '$attrs');
}
function jl(t, e, n, o) {
	const [r, s] = t.propsOptions;
	let l = !1,
		i;
	if (e)
		for (let c in e) {
			if (hn(c)) continue;
			const u = e[c];
			let _;
			r && H(r, (_ = Lt(c)))
				? !s || !s.includes(_)
					? (n[_] = u)
					: ((i || (i = {}))[_] = u)
				: zn(t.emitsOptions, c) ||
				  ((!(c in o) || u !== o[c]) &&
						((o[c] = u), (l = !0)));
		}
	if (s) {
		const c = V(n),
			u = i || I;
		for (let _ = 0; _ < s.length; _++) {
			const a = s[_];
			n[a] = Lo(r, c, a, u[a], t, !H(u, a));
		}
	}
	return l;
}
function Lo(t, e, n, o, r, s) {
	const l = t[n];
	if (l != null) {
		const i = H(l, 'default');
		if (i && o === void 0) {
			const c = l.default;
			if (
				l.type !== Function &&
				!l.skipFactory &&
				M(c)
			) {
				const { propsDefaults: u } = r;
				n in u
					? (o = u[n])
					: (we(r),
					  (o = u[n] = c.call(null, e)),
					  oe());
			} else o = c;
		}
		l[0] &&
			(s && !i
				? (o = !1)
				: l[1] &&
				  (o === '' || o === gt(n)) &&
				  (o = !0));
	}
	return o;
}
function Ml(t, e, n = !1) {
	const o = e.propsCache,
		r = o.get(t);
	if (r) return r;
	const s = t.props,
		l = {},
		i = [];
	let c = !1;
	if (!M(t)) {
		const _ = (a) => {
			c = !0;
			const [v, h] = Ml(a, e, !0);
			Y(l, v), h && i.push(...h);
		};
		!n && e.mixins.length && e.mixins.forEach(_),
			t.extends && _(t.extends),
			t.mixins && t.mixins.forEach(_);
	}
	if (!s && !c) return z(t) && o.set(t, de), de;
	if (T(s))
		for (let _ = 0; _ < s.length; _++) {
			const a = Lt(s[_]);
			ls(a) && (l[a] = I);
		}
	else if (s)
		for (const _ in s) {
			const a = Lt(_);
			if (ls(a)) {
				const v = s[_],
					h = (l[a] =
						T(v) || M(v)
							? { type: v }
							: Y({}, v));
				if (h) {
					const O = us(Boolean, h.type),
						C = us(String, h.type);
					(h[0] = O > -1),
						(h[1] = C < 0 || O < C),
						(O > -1 || H(h, 'default')) &&
							i.push(a);
				}
			}
		}
	const u = [l, i];
	return z(t) && o.set(t, u), u;
}
function ls(t) {
	return t[0] !== '$';
}
function is(t) {
	const e =
		t &&
		t.toString().match(/^\s*(function|class) (\w+)/);
	return e ? e[2] : t === null ? 'null' : '';
}
function cs(t, e) {
	return is(t) === is(e);
}
function us(t, e) {
	return T(e)
		? e.findIndex((n) => cs(n, t))
		: M(e) && cs(e, t)
		? 0
		: -1;
}
const Ll = (t) => t[0] === '_' || t === '$stable',
	lr = (t) => (T(t) ? t.map(kt) : [kt(t)]),
	zu = (t, e, n) => {
		if (e._n) return e;
		const o = fu((...r) => lr(e(...r)), n);
		return (o._c = !1), o;
	},
	Fl = (t, e, n) => {
		const o = t._ctx;
		for (const r in t) {
			if (Ll(r)) continue;
			const s = t[r];
			if (M(s)) e[r] = zu(r, s, o);
			else if (s != null) {
				const l = lr(s);
				e[r] = () => l;
			}
		}
	},
	Ul = (t, e) => {
		const n = lr(e);
		t.slots.default = () => n;
	},
	Bu = (t, e) => {
		if (t.vnode.shapeFlag & 32) {
			const n = e._;
			n
				? ((t.slots = V(e)), En(e, '_', n))
				: Fl(e, (t.slots = {}));
		} else (t.slots = {}), e && Ul(t, e);
		En(t.slots, Jn, 1);
	},
	qu = (t, e, n) => {
		const { vnode: o, slots: r } = t;
		let s = !0,
			l = I;
		if (o.shapeFlag & 32) {
			const i = e._;
			i
				? n && i === 1
					? (s = !1)
					: (Y(r, e), !n && i === 1 && delete r._)
				: ((s = !e.$stable), Fl(e, r)),
				(l = e);
		} else e && (Ul(t, e), (l = { default: 1 }));
		if (s)
			for (const i in r)
				!Ll(i) && l[i] == null && delete r[i];
	};
function Fo(t, e, n, o, r = !1) {
	if (T(t)) {
		t.forEach((v, h) =>
			Fo(v, e && (T(e) ? e[h] : e), n, o, r),
		);
		return;
	}
	if (gn(o) && !r) return;
	const s =
			o.shapeFlag & 4
				? Kn(o.component) || o.component.proxy
				: o.el,
		l = r ? null : s,
		{ i, r: c } = t,
		u = e && e.r,
		_ = i.refs === I ? (i.refs = {}) : i.refs,
		a = i.setupState;
	if (
		(u != null &&
			u !== c &&
			(X(u)
				? ((_[u] = null), H(a, u) && (a[u] = null))
				: G(u) && (u.value = null)),
		M(c))
	)
		Bt(c, i, 12, [l, _]);
	else {
		const v = X(c),
			h = G(c);
		if (v || h) {
			const O = () => {
				if (t.f) {
					const C = v
						? H(a, c)
							? a[c]
							: _[c]
						: c.value;
					r
						? T(C) && qo(C, s)
						: T(C)
						? C.includes(s) || C.push(s)
						: v
						? ((_[c] = [s]),
						  H(a, c) && (a[c] = _[c]))
						: ((c.value = [s]),
						  t.k && (_[t.k] = c.value));
				} else
					v
						? ((_[c] = l),
						  H(a, c) && (a[c] = l))
						: h &&
						  ((c.value = l),
						  t.k && (_[t.k] = l));
			};
			l ? ((O.id = -1), it(O, n)) : O();
		}
	}
}
const it = mu;
function Ju(t) {
	return Ku(t);
}
function Ku(t, e) {
	const n = Eo();
	n.__VUE__ = !0;
	const {
			insert: o,
			remove: r,
			patchProp: s,
			createElement: l,
			createText: i,
			createComment: c,
			setText: u,
			setElementText: _,
			parentNode: a,
			nextSibling: v,
			setScopeId: h = Et,
			insertStaticContent: O,
		} = t,
		C = (
			f,
			p,
			d,
			g = null,
			m = null,
			$ = null,
			w = !1,
			b = null,
			x = !!p.dynamicChildren,
		) => {
			if (f === p) return;
			f &&
				!Te(f, p) &&
				((g = Ye(f)), Vt(f, m, $, !0), (f = null)),
				p.patchFlag === -2 &&
					((x = !1), (p.dynamicChildren = null));
			const { type: y, ref: S, shapeFlag: E } = p;
			switch (y) {
				case qn:
					N(f, p, d, g);
					break;
				case ze:
					j(f, p, d, g);
					break;
				case fo:
					f == null && F(p, d, g, w);
					break;
				case jt:
					Ge(f, p, d, g, m, $, w, b, x);
					break;
				default:
					E & 1
						? st(f, p, d, g, m, $, w, b, x)
						: E & 6
						? Ze(f, p, d, g, m, $, w, b, x)
						: (E & 64 || E & 128) &&
						  y.process(
								f,
								p,
								d,
								g,
								m,
								$,
								w,
								b,
								x,
								Ae,
						  );
			}
			S != null &&
				m &&
				Fo(S, f && f.ref, $, p || f, !p);
		},
		N = (f, p, d, g) => {
			if (f == null) o((p.el = i(p.children)), d, g);
			else {
				const m = (p.el = f.el);
				p.children !== f.children &&
					u(m, p.children);
			}
		},
		j = (f, p, d, g) => {
			f == null
				? o((p.el = c(p.children || '')), d, g)
				: (p.el = f.el);
		},
		F = (f, p, d, g) => {
			[f.el, f.anchor] = O(
				f.children,
				p,
				d,
				g,
				f.el,
				f.anchor,
			);
		},
		L = ({ el: f, anchor: p }, d, g) => {
			let m;
			for (; f && f !== p; )
				(m = v(f)), o(f, d, g), (f = m);
			o(p, d, g);
		},
		A = ({ el: f, anchor: p }) => {
			let d;
			for (; f && f !== p; )
				(d = v(f)), r(f), (f = d);
			r(p);
		},
		st = (f, p, d, g, m, $, w, b, x) => {
			(w = w || p.type === 'svg'),
				f == null
					? Ht(p, d, g, m, $, w, b, x)
					: Q(f, p, m, $, w, b, x);
		},
		Ht = (f, p, d, g, m, $, w, b) => {
			let x, y;
			const {
				type: S,
				props: E,
				shapeFlag: P,
				transition: R,
				dirs: U,
			} = f;
			if (
				((x = f.el = l(f.type, $, E && E.is, E)),
				P & 8
					? _(x, f.children)
					: P & 16 &&
					  _t(
							f.children,
							x,
							null,
							g,
							m,
							$ && S !== 'foreignObject',
							w,
							b,
					  ),
				U && Kt(f, null, g, 'created'),
				Pt(x, f, f.scopeId, w, g),
				E)
			) {
				for (const D in E)
					D !== 'value' &&
						!hn(D) &&
						s(
							x,
							D,
							null,
							E[D],
							$,
							f.children,
							g,
							m,
							Ot,
						);
				'value' in E &&
					s(x, 'value', null, E.value),
					(y = E.onVnodeBeforeMount) &&
						wt(y, g, f);
			}
			U && Kt(f, null, g, 'beforeMount');
			const B = Gu(m, R);
			B && R.beforeEnter(x),
				o(x, p, d),
				((y = E && E.onVnodeMounted) || B || U) &&
					it(() => {
						y && wt(y, g, f),
							B && R.enter(x),
							U && Kt(f, null, g, 'mounted');
					}, m);
		},
		Pt = (f, p, d, g, m) => {
			if ((d && h(f, d), g))
				for (let $ = 0; $ < g.length; $++)
					h(f, g[$]);
			if (m) {
				let $ = m.subTree;
				if (p === $) {
					const w = m.vnode;
					Pt(
						f,
						w,
						w.scopeId,
						w.slotScopeIds,
						m.parent,
					);
				}
			}
		},
		_t = (f, p, d, g, m, $, w, b, x = 0) => {
			for (let y = x; y < f.length; y++) {
				const S = (f[y] = b ? Wt(f[y]) : kt(f[y]));
				C(null, S, p, d, g, m, $, w, b);
			}
		},
		Q = (f, p, d, g, m, $, w) => {
			const b = (p.el = f.el);
			let {
				patchFlag: x,
				dynamicChildren: y,
				dirs: S,
			} = p;
			x |= f.patchFlag & 16;
			const E = f.props || I,
				P = p.props || I;
			let R;
			d && Gt(d, !1),
				(R = P.onVnodeBeforeUpdate) &&
					wt(R, d, p, f),
				S && Kt(p, f, d, 'beforeUpdate'),
				d && Gt(d, !0);
			const U = m && p.type !== 'foreignObject';
			if (
				(y
					? pt(
							f.dynamicChildren,
							y,
							b,
							d,
							g,
							U,
							$,
					  )
					: w ||
					  At(f, p, b, null, d, g, U, $, !1),
				x > 0)
			) {
				if (x & 16) Ee(b, p, E, P, d, g, m);
				else if (
					(x & 2 &&
						E.class !== P.class &&
						s(b, 'class', null, P.class, m),
					x & 4 &&
						s(b, 'style', E.style, P.style, m),
					x & 8)
				) {
					const B = p.dynamicProps;
					for (let D = 0; D < B.length; D++) {
						const K = B[D],
							dt = E[K],
							ie = P[K];
						(ie !== dt || K === 'value') &&
							s(
								b,
								K,
								dt,
								ie,
								m,
								f.children,
								d,
								g,
								Ot,
							);
					}
				}
				x & 1 &&
					f.children !== p.children &&
					_(b, p.children);
			} else
				!w && y == null && Ee(b, p, E, P, d, g, m);
			((R = P.onVnodeUpdated) || S) &&
				it(() => {
					R && wt(R, d, p, f),
						S && Kt(p, f, d, 'updated');
				}, g);
		},
		pt = (f, p, d, g, m, $, w) => {
			for (let b = 0; b < p.length; b++) {
				const x = f[b],
					y = p[b],
					S =
						x.el &&
						(x.type === jt ||
							!Te(x, y) ||
							x.shapeFlag & 70)
							? a(x.el)
							: d;
				C(x, y, S, null, g, m, $, w, !0);
			}
		},
		Ee = (f, p, d, g, m, $, w) => {
			if (d !== g) {
				if (d !== I)
					for (const b in d)
						!hn(b) &&
							!(b in g) &&
							s(
								f,
								b,
								d[b],
								null,
								w,
								p.children,
								m,
								$,
								Ot,
							);
				for (const b in g) {
					if (hn(b)) continue;
					const x = g[b],
						y = d[b];
					x !== y &&
						b !== 'value' &&
						s(
							f,
							b,
							y,
							x,
							w,
							p.children,
							m,
							$,
							Ot,
						);
				}
				'value' in g &&
					s(f, 'value', d.value, g.value);
			}
		},
		Ge = (f, p, d, g, m, $, w, b, x) => {
			const y = (p.el = f ? f.el : i('')),
				S = (p.anchor = f ? f.anchor : i(''));
			let {
				patchFlag: E,
				dynamicChildren: P,
				slotScopeIds: R,
			} = p;
			R && (b = b ? b.concat(R) : R),
				f == null
					? (o(y, d, g),
					  o(S, d, g),
					  _t(p.children, d, S, m, $, w, b, x))
					: E > 0 &&
					  E & 64 &&
					  P &&
					  f.dynamicChildren
					? (pt(
							f.dynamicChildren,
							P,
							d,
							m,
							$,
							w,
							b,
					  ),
					  (p.key != null ||
							(m && p === m.subTree)) &&
							Hl(f, p, !0))
					: At(f, p, d, S, m, $, w, b, x);
		},
		Ze = (f, p, d, g, m, $, w, b, x) => {
			(p.slotScopeIds = b),
				f == null
					? p.shapeFlag & 512
						? m.ctx.activate(p, d, g, w, x)
						: Gn(p, d, g, m, $, w, x)
					: lt(f, p, x);
		},
		Gn = (f, p, d, g, m, $, w) => {
			const b = (f.component = ua(f, g, m));
			if (
				(Al(f) && (b.ctx.renderer = Ae),
				aa(b),
				b.asyncDep)
			) {
				if ((m && m.registerDep(b, q), !f.el)) {
					const x = (b.subTree = qt(ze));
					j(null, x, p, d);
				}
				return;
			}
			q(b, f, p, d, m, $, w);
		},
		lt = (f, p, d) => {
			const g = (p.component = f.component);
			if (du(f, p, d))
				if (g.asyncDep && !g.asyncResolved) {
					W(g, p, d);
					return;
				} else
					(g.next = p), iu(g.update), g.update();
			else (p.el = f.el), (g.vnode = p);
		},
		q = (f, p, d, g, m, $, w) => {
			const b = () => {
					if (f.isMounted) {
						let {
								next: S,
								bu: E,
								u: P,
								parent: R,
								vnode: U,
							} = f,
							B = S,
							D;
						Gt(f, !1),
							S
								? ((S.el = U.el),
								  W(f, S, w))
								: (S = U),
							E && vn(E),
							(D =
								S.props &&
								S.props
									.onVnodeBeforeUpdate) &&
								wt(D, R, S, U),
							Gt(f, !0);
						const K = io(f),
							dt = f.subTree;
						(f.subTree = K),
							C(
								dt,
								K,
								a(dt.el),
								Ye(dt),
								f,
								m,
								$,
							),
							(S.el = K.el),
							B === null && hu(f, K.el),
							P && it(P, m),
							(D =
								S.props &&
								S.props.onVnodeUpdated) &&
								it(() => wt(D, R, S, U), m);
					} else {
						let S;
						const { el: E, props: P } = p,
							{ bm: R, m: U, parent: B } = f,
							D = gn(p);
						if (
							(Gt(f, !1),
							R && vn(R),
							!D &&
								(S =
									P &&
									P.onVnodeBeforeMount) &&
								wt(S, B, p),
							Gt(f, !0),
							E && Xn)
						) {
							const K = () => {
								(f.subTree = io(f)),
									Xn(
										E,
										f.subTree,
										f,
										m,
										null,
									);
							};
							D
								? p.type
										.__asyncLoader()
										.then(
											() =>
												!f.isUnmounted &&
												K(),
										)
								: K();
						} else {
							const K = (f.subTree = io(f));
							C(null, K, d, g, f, m, $),
								(p.el = K.el);
						}
						if (
							(U && it(U, m),
							!D &&
								(S = P && P.onVnodeMounted))
						) {
							const K = p;
							it(() => wt(S, B, K), m);
						}
						(p.shapeFlag & 256 ||
							(B &&
								gn(B.vnode) &&
								B.vnode.shapeFlag & 256)) &&
							f.a &&
							it(f.a, m),
							(f.isMounted = !0),
							(p = d = g = null);
					}
				},
				x = (f.effect = new Yo(
					b,
					() => rr(y),
					f.scope,
				)),
				y = (f.update = () => x.run());
			(y.id = f.uid), Gt(f, !0), y();
		},
		W = (f, p, d) => {
			p.component = f;
			const g = f.vnode.props;
			(f.vnode = p),
				(f.next = null),
				Iu(f, p.props, g, d),
				qu(f, p.children, d),
				Se(),
				ts(),
				Ce();
		},
		At = (f, p, d, g, m, $, w, b, x = !1) => {
			const y = f && f.children,
				S = f ? f.shapeFlag : 0,
				E = p.children,
				{ patchFlag: P, shapeFlag: R } = p;
			if (P > 0) {
				if (P & 128) {
					Pe(y, E, d, g, m, $, w, b, x);
					return;
				} else if (P & 256) {
					Zn(y, E, d, g, m, $, w, b, x);
					return;
				}
			}
			R & 8
				? (S & 16 && Ot(y, m, $),
				  E !== y && _(d, E))
				: S & 16
				? R & 16
					? Pe(y, E, d, g, m, $, w, b, x)
					: Ot(y, m, $, !0)
				: (S & 8 && _(d, ''),
				  R & 16 && _t(E, d, g, m, $, w, b, x));
		},
		Zn = (f, p, d, g, m, $, w, b, x) => {
			(f = f || de), (p = p || de);
			const y = f.length,
				S = p.length,
				E = Math.min(y, S);
			let P;
			for (P = 0; P < E; P++) {
				const R = (p[P] = x ? Wt(p[P]) : kt(p[P]));
				C(f[P], R, d, null, m, $, w, b, x);
			}
			y > S
				? Ot(f, m, $, !0, !1, E)
				: _t(p, d, g, m, $, w, b, x, E);
		},
		Pe = (f, p, d, g, m, $, w, b, x) => {
			let y = 0;
			const S = p.length;
			let E = f.length - 1,
				P = S - 1;
			for (; y <= E && y <= P; ) {
				const R = f[y],
					U = (p[y] = x ? Wt(p[y]) : kt(p[y]));
				if (Te(R, U))
					C(R, U, d, null, m, $, w, b, x);
				else break;
				y++;
			}
			for (; y <= E && y <= P; ) {
				const R = f[E],
					U = (p[P] = x ? Wt(p[P]) : kt(p[P]));
				if (Te(R, U))
					C(R, U, d, null, m, $, w, b, x);
				else break;
				E--, P--;
			}
			if (y > E) {
				if (y <= P) {
					const R = P + 1,
						U = R < S ? p[R].el : g;
					for (; y <= P; )
						C(
							null,
							(p[y] = x
								? Wt(p[y])
								: kt(p[y])),
							d,
							U,
							m,
							$,
							w,
							b,
							x,
						),
							y++;
				}
			} else if (y > P)
				for (; y <= E; ) Vt(f[y], m, $, !0), y++;
			else {
				const R = y,
					U = y,
					B = new Map();
				for (y = U; y <= P; y++) {
					const ut = (p[y] = x
						? Wt(p[y])
						: kt(p[y]));
					ut.key != null && B.set(ut.key, y);
				}
				let D,
					K = 0;
				const dt = P - U + 1;
				let ie = !1,
					pr = 0;
				const Oe = new Array(dt);
				for (y = 0; y < dt; y++) Oe[y] = 0;
				for (y = R; y <= E; y++) {
					const ut = f[y];
					if (K >= dt) {
						Vt(ut, m, $, !0);
						continue;
					}
					let xt;
					if (ut.key != null) xt = B.get(ut.key);
					else
						for (D = U; D <= P; D++)
							if (
								Oe[D - U] === 0 &&
								Te(ut, p[D])
							) {
								xt = D;
								break;
							}
					xt === void 0
						? Vt(ut, m, $, !0)
						: ((Oe[xt - U] = y + 1),
						  xt >= pr ? (pr = xt) : (ie = !0),
						  C(
								ut,
								p[xt],
								d,
								null,
								m,
								$,
								w,
								b,
								x,
						  ),
						  K++);
				}
				const _r = ie ? Zu(Oe) : de;
				for (
					D = _r.length - 1, y = dt - 1;
					y >= 0;
					y--
				) {
					const ut = U + y,
						xt = p[ut],
						dr = ut + 1 < S ? p[ut + 1].el : g;
					Oe[y] === 0
						? C(null, xt, d, dr, m, $, w, b, x)
						: ie &&
						  (D < 0 || y !== _r[D]
								? le(xt, d, dr, 2)
								: D--);
				}
			}
		},
		le = (f, p, d, g, m = null) => {
			const {
				el: $,
				type: w,
				transition: b,
				children: x,
				shapeFlag: y,
			} = f;
			if (y & 6) {
				le(f.component.subTree, p, d, g);
				return;
			}
			if (y & 128) {
				f.suspense.move(p, d, g);
				return;
			}
			if (y & 64) {
				w.move(f, p, d, Ae);
				return;
			}
			if (w === jt) {
				o($, p, d);
				for (let S = 0; S < x.length; S++)
					le(x[S], p, d, g);
				o(f.anchor, p, d);
				return;
			}
			if (w === fo) {
				L(f, p, d);
				return;
			}
			if (g !== 2 && y & 1 && b)
				if (g === 0)
					b.beforeEnter($),
						o($, p, d),
						it(() => b.enter($), m);
				else {
					const {
							leave: S,
							delayLeave: E,
							afterLeave: P,
						} = b,
						R = () => o($, p, d),
						U = () => {
							S($, () => {
								R(), P && P();
							});
						};
					E ? E($, R, U) : U();
				}
			else o($, p, d);
		},
		Vt = (f, p, d, g = !1, m = !1) => {
			const {
				type: $,
				props: w,
				ref: b,
				children: x,
				dynamicChildren: y,
				shapeFlag: S,
				patchFlag: E,
				dirs: P,
			} = f;
			if (
				(b != null && Fo(b, null, d, f, !0),
				S & 256)
			) {
				p.ctx.deactivate(f);
				return;
			}
			const R = S & 1 && P,
				U = !gn(f);
			let B;
			if (
				(U &&
					(B = w && w.onVnodeBeforeUnmount) &&
					wt(B, p, f),
				S & 6)
			)
				Bl(f.component, d, g);
			else {
				if (S & 128) {
					f.suspense.unmount(d, g);
					return;
				}
				R && Kt(f, null, p, 'beforeUnmount'),
					S & 64
						? f.type.remove(f, p, d, m, Ae, g)
						: y &&
						  ($ !== jt || (E > 0 && E & 64))
						? Ot(y, p, d, !1, !0)
						: (($ === jt && E & 384) ||
								(!m && S & 16)) &&
						  Ot(x, p, d),
					g && ar(f);
			}
			((U && (B = w && w.onVnodeUnmounted)) || R) &&
				it(() => {
					B && wt(B, p, f),
						R && Kt(f, null, p, 'unmounted');
				}, d);
		},
		ar = (f) => {
			const {
				type: p,
				el: d,
				anchor: g,
				transition: m,
			} = f;
			if (p === jt) {
				zl(d, g);
				return;
			}
			if (p === fo) {
				A(f);
				return;
			}
			const $ = () => {
				r(d),
					m &&
						!m.persisted &&
						m.afterLeave &&
						m.afterLeave();
			};
			if (f.shapeFlag & 1 && m && !m.persisted) {
				const { leave: w, delayLeave: b } = m,
					x = () => w(d, $);
				b ? b(f.el, $, x) : x();
			} else $();
		},
		zl = (f, p) => {
			let d;
			for (; f !== p; ) (d = v(f)), r(f), (f = d);
			r(p);
		},
		Bl = (f, p, d) => {
			const {
				bum: g,
				scope: m,
				update: $,
				subTree: w,
				um: b,
			} = f;
			g && vn(g),
				m.stop(),
				$ && (($.active = !1), Vt(w, f, p, d)),
				b && it(b, p),
				it(() => {
					f.isUnmounted = !0;
				}, p),
				p &&
					p.pendingBranch &&
					!p.isUnmounted &&
					f.asyncDep &&
					!f.asyncResolved &&
					f.suspenseId === p.pendingId &&
					(p.deps--, p.deps === 0 && p.resolve());
		},
		Ot = (f, p, d, g = !1, m = !1, $ = 0) => {
			for (let w = $; w < f.length; w++)
				Vt(f[w], p, d, g, m);
		},
		Ye = (f) =>
			f.shapeFlag & 6
				? Ye(f.component.subTree)
				: f.shapeFlag & 128
				? f.suspense.next()
				: v(f.anchor || f.el),
		fr = (f, p, d) => {
			f == null
				? p._vnode && Vt(p._vnode, null, null, !0)
				: C(
						p._vnode || null,
						f,
						p,
						null,
						null,
						null,
						d,
				  ),
				ts(),
				wl(),
				(p._vnode = f);
		},
		Ae = {
			p: C,
			um: Vt,
			m: le,
			r: ar,
			mt: Gn,
			mc: _t,
			pc: At,
			pbc: pt,
			n: Ye,
			o: t,
		};
	let Yn, Xn;
	return (
		e && ([Yn, Xn] = e(Ae)),
		{ render: fr, hydrate: Yn, createApp: Vu(fr, Yn) }
	);
}
function Gt({ effect: t, update: e }, n) {
	t.allowRecurse = e.allowRecurse = n;
}
function Gu(t, e) {
	return (
		(!t || (t && !t.pendingBranch)) && e && !e.persisted
	);
}
function Hl(t, e, n = !1) {
	const o = t.children,
		r = e.children;
	if (T(o) && T(r))
		for (let s = 0; s < o.length; s++) {
			const l = o[s];
			let i = r[s];
			i.shapeFlag & 1 &&
				!i.dynamicChildren &&
				((i.patchFlag <= 0 || i.patchFlag === 32) &&
					((i = r[s] = Wt(r[s])), (i.el = l.el)),
				n || Hl(l, i)),
				i.type === qn && (i.el = l.el);
		}
}
function Zu(t) {
	const e = t.slice(),
		n = [0];
	let o, r, s, l, i;
	const c = t.length;
	for (o = 0; o < c; o++) {
		const u = t[o];
		if (u !== 0) {
			if (((r = n[n.length - 1]), t[r] < u)) {
				(e[o] = r), n.push(o);
				continue;
			}
			for (s = 0, l = n.length - 1; s < l; )
				(i = (s + l) >> 1),
					t[n[i]] < u ? (s = i + 1) : (l = i);
			u < t[n[s]] &&
				(s > 0 && (e[o] = n[s - 1]), (n[s] = o));
		}
	}
	for (s = n.length, l = n[s - 1]; s-- > 0; )
		(n[s] = l), (l = e[l]);
	return n;
}
const Yu = (t) => t.__isTeleport,
	jt = Symbol.for('v-fgt'),
	qn = Symbol.for('v-txt'),
	ze = Symbol.for('v-cmt'),
	fo = Symbol.for('v-stc'),
	Fe = [];
let bt = null;
function Xu(t = !1) {
	Fe.push((bt = t ? null : []));
}
function Qu() {
	Fe.pop(), (bt = Fe[Fe.length - 1] || null);
}
let Be = 1;
function as(t) {
	Be += t;
}
function ta(t) {
	return (
		(t.dynamicChildren = Be > 0 ? bt || de : null),
		Qu(),
		Be > 0 && bt && bt.push(t),
		t
	);
}
function ea(t, e, n, o, r, s) {
	return ta(vt(t, e, n, o, r, s, !0));
}
function na(t) {
	return t ? t.__v_isVNode === !0 : !1;
}
function Te(t, e) {
	return t.type === e.type && t.key === e.key;
}
const Jn = '__vInternal',
	Vl = ({ key: t }) => t ?? null,
	yn = ({ ref: t, ref_key: e, ref_for: n }) => (
		typeof t == 'number' && (t = '' + t),
		t != null
			? X(t) || G(t) || M(t)
				? { i: yt, r: t, k: e, f: !!n }
				: t
			: null
	);
function vt(
	t,
	e = null,
	n = null,
	o = 0,
	r = null,
	s = t === jt ? 0 : 1,
	l = !1,
	i = !1,
) {
	const c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: t,
		props: e,
		key: e && Vl(e),
		ref: e && yn(e),
		scopeId: Cl,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: s,
		patchFlag: o,
		dynamicProps: r,
		dynamicChildren: null,
		appContext: null,
		ctx: yt,
	};
	return (
		i
			? (ir(c, n), s & 128 && t.normalize(c))
			: n && (c.shapeFlag |= X(n) ? 8 : 16),
		Be > 0 &&
			!l &&
			bt &&
			(c.patchFlag > 0 || s & 6) &&
			c.patchFlag !== 32 &&
			bt.push(c),
		c
	);
}
const qt = oa;
function oa(
	t,
	e = null,
	n = null,
	o = 0,
	r = null,
	s = !1,
) {
	if (((!t || t === vu) && (t = ze), na(t))) {
		const i = xe(t, e, !0);
		return (
			n && ir(i, n),
			Be > 0 &&
				!s &&
				bt &&
				(i.shapeFlag & 6
					? (bt[bt.indexOf(t)] = i)
					: bt.push(i)),
			(i.patchFlag |= -2),
			i
		);
	}
	if ((da(t) && (t = t.__vccOpts), e)) {
		e = ra(e);
		let { class: i, style: c } = e;
		i && !X(i) && (e.class = Go(i)),
			z(c) &&
				(hl(c) && !T(c) && (c = Y({}, c)),
				(e.style = Ko(c)));
	}
	const l = X(t)
		? 1
		: gu(t)
		? 128
		: Yu(t)
		? 64
		: z(t)
		? 4
		: M(t)
		? 2
		: 0;
	return vt(t, e, n, o, r, l, s, !0);
}
function ra(t) {
	return t ? (hl(t) || Jn in t ? Y({}, t) : t) : null;
}
function xe(t, e, n = !1) {
	const {
			props: o,
			ref: r,
			patchFlag: s,
			children: l,
		} = t,
		i = e ? la(o || {}, e) : o;
	return {
		__v_isVNode: !0,
		__v_skip: !0,
		type: t.type,
		props: i,
		key: i && Vl(i),
		ref:
			e && e.ref
				? n && r
					? T(r)
						? r.concat(yn(e))
						: [r, yn(e)]
					: yn(e)
				: r,
		scopeId: t.scopeId,
		slotScopeIds: t.slotScopeIds,
		children: l,
		target: t.target,
		targetAnchor: t.targetAnchor,
		staticCount: t.staticCount,
		shapeFlag: t.shapeFlag,
		patchFlag:
			e && t.type !== jt
				? s === -1
					? 16
					: s | 16
				: s,
		dynamicProps: t.dynamicProps,
		dynamicChildren: t.dynamicChildren,
		appContext: t.appContext,
		dirs: t.dirs,
		transition: t.transition,
		component: t.component,
		suspense: t.suspense,
		ssContent: t.ssContent && xe(t.ssContent),
		ssFallback: t.ssFallback && xe(t.ssFallback),
		el: t.el,
		anchor: t.anchor,
		ctx: t.ctx,
		ce: t.ce,
	};
}
function sa(t = ' ', e = 0) {
	return qt(qn, null, t, e);
}
function kt(t) {
	return t == null || typeof t == 'boolean'
		? qt(ze)
		: T(t)
		? qt(jt, null, t.slice())
		: typeof t == 'object'
		? Wt(t)
		: qt(qn, null, String(t));
}
function Wt(t) {
	return (t.el === null && t.patchFlag !== -1) || t.memo
		? t
		: xe(t);
}
function ir(t, e) {
	let n = 0;
	const { shapeFlag: o } = t;
	if (e == null) e = null;
	else if (T(e)) n = 16;
	else if (typeof e == 'object')
		if (o & 65) {
			const r = e.default;
			r &&
				(r._c && (r._d = !1),
				ir(t, r()),
				r._c && (r._d = !0));
			return;
		} else {
			n = 32;
			const r = e._;
			!r && !(Jn in e)
				? (e._ctx = yt)
				: r === 3 &&
				  yt &&
				  (yt.slots._ === 1
						? (e._ = 1)
						: ((e._ = 2),
						  (t.patchFlag |= 1024)));
		}
	else
		M(e)
			? ((e = { default: e, _ctx: yt }), (n = 32))
			: ((e = String(e)),
			  o & 64 ? ((n = 16), (e = [sa(e)])) : (n = 8));
	(t.children = e), (t.shapeFlag |= n);
}
function la(...t) {
	const e = {};
	for (let n = 0; n < t.length; n++) {
		const o = t[n];
		for (const r in o)
			if (r === 'class')
				e.class !== o.class &&
					(e.class = Go([e.class, o.class]));
			else if (r === 'style')
				e.style = Ko([e.style, o.style]);
			else if (Vn(r)) {
				const s = e[r],
					l = o[r];
				l &&
					s !== l &&
					!(T(s) && s.includes(l)) &&
					(e[r] = s ? [].concat(s, l) : l);
			} else r !== '' && (e[r] = o[r]);
	}
	return e;
}
function wt(t, e, n, o = null) {
	$t(t, e, 7, [n, o]);
}
const ia = Rl();
let ca = 0;
function ua(t, e, n) {
	const o = t.type,
		r = (e ? e.appContext : t.appContext) || ia,
		s = {
			uid: ca++,
			vnode: t,
			type: o,
			parent: e,
			appContext: r,
			root: null,
			next: null,
			subTree: null,
			effect: null,
			update: null,
			scope: new Ac(!0),
			render: null,
			proxy: null,
			exposed: null,
			exposeProxy: null,
			withProxy: null,
			provides: e
				? e.provides
				: Object.create(r.provides),
			accessCache: null,
			renderCache: [],
			components: null,
			directives: null,
			propsOptions: Ml(o, r),
			emitsOptions: Sl(o, r),
			emit: null,
			emitted: null,
			propsDefaults: I,
			inheritAttrs: o.inheritAttrs,
			ctx: I,
			data: I,
			props: I,
			attrs: I,
			slots: I,
			refs: I,
			setupState: I,
			setupContext: null,
			attrsProxy: null,
			slotsProxy: null,
			suspense: n,
			suspenseId: n ? n.pendingId : 0,
			asyncDep: null,
			asyncResolved: !1,
			isMounted: !1,
			isUnmounted: !1,
			isDeactivated: !1,
			bc: null,
			c: null,
			bm: null,
			m: null,
			bu: null,
			u: null,
			um: null,
			bum: null,
			da: null,
			a: null,
			rtg: null,
			rtc: null,
			ec: null,
			sp: null,
		};
	return (
		(s.ctx = { _: s }),
		(s.root = e ? e.root : s),
		(s.emit = au.bind(null, s)),
		t.ce && t.ce(s),
		s
	);
}
let nt = null,
	cr,
	ae,
	fs = '__VUE_INSTANCE_SETTERS__';
(ae = Eo()[fs]) || (ae = Eo()[fs] = []),
	ae.push((t) => (nt = t)),
	(cr = (t) => {
		ae.length > 1 ? ae.forEach((e) => e(t)) : ae[0](t);
	});
const we = (t) => {
		cr(t), t.scope.on();
	},
	oe = () => {
		nt && nt.scope.off(), cr(null);
	};
function Dl(t) {
	return t.vnode.shapeFlag & 4;
}
let qe = !1;
function aa(t, e = !1) {
	qe = e;
	const { props: n, children: o } = t.vnode,
		r = Dl(t);
	Wu(t, n, r, e), Bu(t, o);
	const s = r ? fa(t, e) : void 0;
	return (qe = !1), s;
}
function fa(t, e) {
	const n = t.type;
	(t.accessCache = Object.create(null)),
		(t.proxy = vl(new Proxy(t.ctx, Ru)));
	const { setup: o } = n;
	if (o) {
		const r = (t.setupContext =
			o.length > 1 ? _a(t) : null);
		we(t), Se();
		const s = Bt(o, t, 0, [t.props, r]);
		if ((Ce(), oe(), Ys(s))) {
			if ((s.then(oe, oe), e))
				return s
					.then((l) => {
						ps(t, l, e);
					})
					.catch((l) => {
						In(l, t, 0);
					});
			t.asyncDep = s;
		} else ps(t, s, e);
	} else Wl(t, e);
}
function ps(t, e, n) {
	M(e)
		? t.type.__ssrInlineRender
			? (t.ssrRender = e)
			: (t.render = e)
		: z(e) && (t.setupState = yl(e)),
		Wl(t, n);
}
let _s;
function Wl(t, e, n) {
	const o = t.type;
	if (!t.render) {
		if (!e && _s && !o.render) {
			const r = o.template || sr(t).template;
			if (r) {
				const {
						isCustomElement: s,
						compilerOptions: l,
					} = t.appContext.config,
					{ delimiters: i, compilerOptions: c } =
						o,
					u = Y(
						Y(
							{
								isCustomElement: s,
								delimiters: i,
							},
							l,
						),
						c,
					);
				o.render = _s(r, u);
			}
		}
		t.render = o.render || Et;
	}
	{
		we(t), Se();
		try {
			ju(t);
		} finally {
			Ce(), oe();
		}
	}
}
function pa(t) {
	return (
		t.attrsProxy ||
		(t.attrsProxy = new Proxy(t.attrs, {
			get(e, n) {
				return ct(t, 'get', '$attrs'), e[n];
			},
		}))
	);
}
function _a(t) {
	const e = (n) => {
		t.exposed = n || {};
	};
	return {
		get attrs() {
			return pa(t);
		},
		slots: t.slots,
		emit: t.emit,
		expose: e,
	};
}
function Kn(t) {
	if (t.exposed)
		return (
			t.exposeProxy ||
			(t.exposeProxy = new Proxy(yl(vl(t.exposed)), {
				get(e, n) {
					if (n in e) return e[n];
					if (n in Le) return Le[n](t);
				},
				has(e, n) {
					return n in e || n in Le;
				},
			}))
		);
}
function da(t) {
	return M(t) && '__vccOpts' in t;
}
const Uo = (t, e) => ru(t, e, qe),
	ha = Symbol.for('v-scx'),
	va = () => mn(ha),
	ga = '3.3.8',
	ma = 'http://www.w3.org/2000/svg',
	Qt = typeof document < 'u' ? document : null,
	ds = Qt && Qt.createElement('template'),
	ya = {
		insert: (t, e, n) => {
			e.insertBefore(t, n || null);
		},
		remove: (t) => {
			const e = t.parentNode;
			e && e.removeChild(t);
		},
		createElement: (t, e, n, o) => {
			const r = e
				? Qt.createElementNS(ma, t)
				: Qt.createElement(
						t,
						n ? { is: n } : void 0,
				  );
			return (
				t === 'select' &&
					o &&
					o.multiple != null &&
					r.setAttribute('multiple', o.multiple),
				r
			);
		},
		createText: (t) => Qt.createTextNode(t),
		createComment: (t) => Qt.createComment(t),
		setText: (t, e) => {
			t.nodeValue = e;
		},
		setElementText: (t, e) => {
			t.textContent = e;
		},
		parentNode: (t) => t.parentNode,
		nextSibling: (t) => t.nextSibling,
		querySelector: (t) => Qt.querySelector(t),
		setScopeId(t, e) {
			t.setAttribute(e, '');
		},
		insertStaticContent(t, e, n, o, r, s) {
			const l = n ? n.previousSibling : e.lastChild;
			if (r && (r === s || r.nextSibling))
				for (
					;
					e.insertBefore(r.cloneNode(!0), n),
						!(r === s || !(r = r.nextSibling));

				);
			else {
				ds.innerHTML = o ? `<svg>${t}</svg>` : t;
				const i = ds.content;
				if (o) {
					const c = i.firstChild;
					for (; c.firstChild; )
						i.appendChild(c.firstChild);
					i.removeChild(c);
				}
				e.insertBefore(i, n);
			}
			return [
				l ? l.nextSibling : e.firstChild,
				n ? n.previousSibling : e.lastChild,
			];
		},
	},
	ba = Symbol('_vtc');
function $a(t, e, n) {
	const o = t[ba];
	o && (e = (e ? [e, ...o] : [...o]).join(' ')),
		e == null
			? t.removeAttribute('class')
			: n
			? t.setAttribute('class', e)
			: (t.className = e);
}
const xa = Symbol('_vod');
function wa(t, e, n) {
	const o = t.style,
		r = X(n);
	if (n && !r) {
		if (e && !X(e))
			for (const s in e) n[s] == null && Ho(o, s, '');
		for (const s in n) Ho(o, s, n[s]);
	} else {
		const s = o.display;
		r
			? e !== n && (o.cssText = n)
			: e && t.removeAttribute('style'),
			xa in t && (o.display = s);
	}
}
const hs = /\s*!important$/;
function Ho(t, e, n) {
	if (T(n)) n.forEach((o) => Ho(t, e, o));
	else if ((n == null && (n = ''), e.startsWith('--')))
		t.setProperty(e, n);
	else {
		const o = ka(t, e);
		hs.test(n)
			? t.setProperty(
					gt(o),
					n.replace(hs, ''),
					'important',
			  )
			: (t[o] = n);
	}
}
const vs = ['Webkit', 'Moz', 'ms'],
	po = {};
function ka(t, e) {
	const n = po[e];
	if (n) return n;
	let o = Lt(e);
	if (o !== 'filter' && o in t) return (po[e] = o);
	o = tl(o);
	for (let r = 0; r < vs.length; r++) {
		const s = vs[r] + o;
		if (s in t) return (po[e] = s);
	}
	return e;
}
const gs = 'http://www.w3.org/1999/xlink';
function Sa(t, e, n, o, r) {
	if (o && e.startsWith('xlink:'))
		n == null
			? t.removeAttributeNS(gs, e.slice(6, e.length))
			: t.setAttributeNS(gs, e, n);
	else {
		const s = Ec(e);
		n == null || (s && !el(n))
			? t.removeAttribute(e)
			: t.setAttribute(e, s ? '' : n);
	}
}
function Ca(t, e, n, o, r, s, l) {
	if (e === 'innerHTML' || e === 'textContent') {
		o && l(o, r, s), (t[e] = n ?? '');
		return;
	}
	const i = t.tagName;
	if (
		e === 'value' &&
		i !== 'PROGRESS' &&
		!i.includes('-')
	) {
		t._value = n;
		const u =
				i === 'OPTION'
					? t.getAttribute('value')
					: t.value,
			_ = n ?? '';
		u !== _ && (t.value = _),
			n == null && t.removeAttribute(e);
		return;
	}
	let c = !1;
	if (n === '' || n == null) {
		const u = typeof t[e];
		u === 'boolean'
			? (n = el(n))
			: n == null && u === 'string'
			? ((n = ''), (c = !0))
			: u === 'number' && ((n = 0), (c = !0));
	}
	try {
		t[e] = n;
	} catch {}
	c && t.removeAttribute(e);
}
function Il(t, e, n, o) {
	t.addEventListener(e, n, o);
}
function Ea(t, e, n, o) {
	t.removeEventListener(e, n, o);
}
const ms = Symbol('_vei');
function Pa(t, e, n, o, r = null) {
	const s = t[ms] || (t[ms] = {}),
		l = s[e];
	if (o && l) l.value = o;
	else {
		const [i, c] = Aa(e);
		if (o) {
			const u = (s[e] = Na(o, r));
			Il(t, i, u, c);
		} else l && (Ea(t, i, l, c), (s[e] = void 0));
	}
}
const ys = /(?:Once|Passive|Capture)$/;
function Aa(t) {
	let e;
	if (ys.test(t)) {
		e = {};
		let n;
		for (; (n = t.match(ys)); )
			(t = t.slice(0, t.length - n[0].length)),
				(e[n[0].toLowerCase()] = !0);
	}
	return [t[2] === ':' ? t.slice(3) : gt(t.slice(2)), e];
}
let _o = 0;
const Oa = Promise.resolve(),
	Ta = () =>
		_o || (Oa.then(() => (_o = 0)), (_o = Date.now()));
function Na(t, e) {
	const n = (o) => {
		if (!o._vts) o._vts = Date.now();
		else if (o._vts <= n.attached) return;
		$t(Ra(o, n.value), e, 5, [o]);
	};
	return (n.value = t), (n.attached = Ta()), n;
}
function Ra(t, e) {
	if (T(e)) {
		const n = t.stopImmediatePropagation;
		return (
			(t.stopImmediatePropagation = () => {
				n.call(t), (t._stopped = !0);
			}),
			e.map((o) => (r) => !r._stopped && o && o(r))
		);
	} else return e;
}
const bs = /^on[a-z]/,
	ja = (t, e, n, o, r = !1, s, l, i, c) => {
		e === 'class'
			? $a(t, o, r)
			: e === 'style'
			? wa(t, n, o)
			: Vn(e)
			? Bo(e) || Pa(t, e, n, o, l)
			: (
					e[0] === '.'
						? ((e = e.slice(1)), !0)
						: e[0] === '^'
						? ((e = e.slice(1)), !1)
						: Ma(t, e, o, r)
			  )
			? Ca(t, e, o, s, l, i, c)
			: (e === 'true-value'
					? (t._trueValue = o)
					: e === 'false-value' &&
					  (t._falseValue = o),
			  Sa(t, e, o, r));
	};
function Ma(t, e, n, o) {
	return o
		? !!(
				e === 'innerHTML' ||
				e === 'textContent' ||
				(e in t && bs.test(e) && M(n))
		  )
		: e === 'spellcheck' ||
		  e === 'draggable' ||
		  e === 'translate' ||
		  e === 'form' ||
		  (e === 'list' && t.tagName === 'INPUT') ||
		  (e === 'type' && t.tagName === 'TEXTAREA') ||
		  (bs.test(e) && X(n))
		? !1
		: e in t;
}
/*! #__NO_SIDE_EFFECTS__ */ function La(t, e) {
	const n = bu(t);
	class o extends ur {
		constructor(s) {
			super(n, s, e);
		}
	}
	return (o.def = n), o;
}
const Fa =
	typeof HTMLElement < 'u' ? HTMLElement : class {};
class ur extends Fa {
	constructor(e, n = {}, o) {
		super(),
			(this._def = e),
			(this._props = n),
			(this._instance = null),
			(this._connected = !1),
			(this._resolved = !1),
			(this._numberProps = null),
			(this._ob = null),
			this.shadowRoot && o
				? o(this._createVNode(), this.shadowRoot)
				: (this.attachShadow({ mode: 'open' }),
				  this._def.__asyncLoader ||
						this._resolveProps(this._def));
	}
	connectedCallback() {
		(this._connected = !0),
			this._instance ||
				(this._resolved
					? this._update()
					: this._resolveDef());
	}
	disconnectedCallback() {
		(this._connected = !1),
			this._ob &&
				(this._ob.disconnect(), (this._ob = null)),
			$l(() => {
				this._connected ||
					(ws(null, this.shadowRoot),
					(this._instance = null));
			});
	}
	_resolveDef() {
		this._resolved = !0;
		for (let o = 0; o < this.attributes.length; o++)
			this._setAttr(this.attributes[o].name);
		(this._ob = new MutationObserver((o) => {
			for (const r of o)
				this._setAttr(r.attributeName);
		})),
			this._ob.observe(this, { attributes: !0 });
		const e = (o, r = !1) => {
				const { props: s, styles: l } = o;
				let i;
				if (s && !T(s))
					for (const c in s) {
						const u = s[c];
						(u === Number ||
							(u && u.type === Number)) &&
							(c in this._props &&
								(this._props[c] = Br(
									this._props[c],
								)),
							((i ||
								(i = Object.create(null)))[
								Lt(c)
							] = !0));
					}
				(this._numberProps = i),
					r && this._resolveProps(o),
					this._applyStyles(l),
					this._update();
			},
			n = this._def.__asyncLoader;
		n ? n().then((o) => e(o, !0)) : e(this._def);
	}
	_resolveProps(e) {
		const { props: n } = e,
			o = T(n) ? n : Object.keys(n || {});
		for (const r of Object.keys(this))
			r[0] !== '_' &&
				o.includes(r) &&
				this._setProp(r, this[r], !0, !1);
		for (const r of o.map(Lt))
			Object.defineProperty(this, r, {
				get() {
					return this._getProp(r);
				},
				set(s) {
					this._setProp(r, s);
				},
			});
	}
	_setAttr(e) {
		let n = this.getAttribute(e);
		const o = Lt(e);
		this._numberProps &&
			this._numberProps[o] &&
			(n = Br(n)),
			this._setProp(o, n, !1);
	}
	_getProp(e) {
		return this._props[e];
	}
	_setProp(e, n, o = !0, r = !0) {
		n !== this._props[e] &&
			((this._props[e] = n),
			r && this._instance && this._update(),
			o &&
				(n === !0
					? this.setAttribute(gt(e), '')
					: typeof n == 'string' ||
					  typeof n == 'number'
					? this.setAttribute(gt(e), n + '')
					: n || this.removeAttribute(gt(e))));
	}
	_update() {
		ws(this._createVNode(), this.shadowRoot);
	}
	_createVNode() {
		const e = qt(this._def, Y({}, this._props));
		return (
			this._instance ||
				(e.ce = (n) => {
					(this._instance = n), (n.isCE = !0);
					const o = (s, l) => {
						this.dispatchEvent(
							new CustomEvent(s, {
								detail: l,
							}),
						);
					};
					n.emit = (s, ...l) => {
						o(s, l), gt(s) !== s && o(gt(s), l);
					};
					let r = this;
					for (
						;
						(r = r && (r.parentNode || r.host));

					)
						if (r instanceof ur) {
							(n.parent = r._instance),
								(n.provides =
									r._instance.provides);
							break;
						}
				}),
			e
		);
	}
	_applyStyles(e) {
		e &&
			e.forEach((n) => {
				const o = document.createElement('style');
				(o.textContent = n),
					this.shadowRoot.appendChild(o);
			});
	}
}
const $s = (t) => {
		const e = t.props['onUpdate:modelValue'] || !1;
		return T(e) ? (n) => vn(e, n) : e;
	},
	ho = Symbol('_assign'),
	vo = {
		created(t, { value: e }, n) {
			(t.checked = Pn(e, n.props.value)),
				(t[ho] = $s(n)),
				Il(t, 'change', () => {
					t[ho](Ua(t));
				});
		},
		beforeUpdate(t, { value: e, oldValue: n }, o) {
			(t[ho] = $s(o)),
				e !== n &&
					(t.checked = Pn(e, o.props.value));
		},
	};
function Ua(t) {
	return '_value' in t ? t._value : t.value;
}
const Ha = Y({ patchProp: ja }, ya);
let xs;
function Va() {
	return xs || (xs = Ju(Ha));
}
const ws = (...t) => {
	Va().render(...t);
};
function bn(t) {
	let e = Qc(),
		n = t.subscribe((o) => {
			e.value = o;
		});
	return ol() && Tc(n), e;
}
function Da(t, e, n = {}) {
	let o = n.prefix || 'Model',
		r = bn(t);
	if (Array.isArray(e))
		return e.reduce(
			(s, l) => (
				(s[`${l}${o}`] = Uo({
					get: () => r.value[l],
					set: (i) => {
						t.setKey(l, i);
					},
				})),
				s
			),
			{},
		);
	{
		let s = e;
		return Uo({
			get: () => (s ? r.value[s] : r.value),
			set: (l) => {
				s ? t.setKey(s, l) : t.set(l);
			},
		});
	}
}
const Wa = `div{display:flex;gap:.25rem;list-style:none}input{position:absolute;opacity:0}label{display:block;font-size:.8rem;border-radius:.5rem;padding:.5rem .75rem;line-height:1}label:hover{background-color:var(--border-color)}label:has(input:checked){background-color:var(--accent-color);color:#fff}
`,
	Ia = (t, e) => {
		const n = t.__vccOpts || t;
		for (const [o, r] of e) n[o] = r;
		return n;
	},
	za = {
		__name: 'TodoFilters.ce',
		props: ['id'],
		setup(t) {
			const e = t,
				{
					$todos: n,
					$done: o,
					$left: r,
					$filter: s,
				} = Fs(e.id),
				l = Da(s),
				i = bn(n),
				c = bn(o),
				u = bn(r);
			return (_, a) => (
				Xu(),
				ea('div', null, [
					vt('label', null, [
						uo(
							vt(
								'input',
								{
									type: 'radio',
									name: 'filter',
									value: 'all',
									'onUpdate:modelValue':
										a[0] ||
										(a[0] = (v) =>
											G(l)
												? (l.value =
														v)
												: null),
								},
								null,
								512,
							),
							[[vo, Zt(l)]],
						),
						vt(
							'span',
							null,
							' All (' +
								lo(Zt(i).length) +
								')',
							1,
						),
					]),
					vt('label', null, [
						uo(
							vt(
								'input',
								{
									type: 'radio',
									name: 'filter',
									value: 'todo',
									'onUpdate:modelValue':
										a[1] ||
										(a[1] = (v) =>
											G(l)
												? (l.value =
														v)
												: null),
								},
								null,
								512,
							),
							[[vo, Zt(l)]],
						),
						vt(
							'span',
							null,
							' Todo (' +
								lo(Zt(u).length) +
								')',
							1,
						),
					]),
					vt('label', null, [
						uo(
							vt(
								'input',
								{
									type: 'radio',
									name: 'filter',
									value: 'done',
									'onUpdate:modelValue':
										a[2] ||
										(a[2] = (v) =>
											G(l)
												? (l.value =
														v)
												: null),
								},
								null,
								512,
							),
							[[vo, Zt(l)]],
						),
						vt(
							'span',
							null,
							' Done (' +
								lo(Zt(c).length) +
								')',
							1,
						),
					]),
				])
			);
		},
	},
	Ba = Ia(za, [['styles', [Wa]]]);
customElements.define('todo-filters', La(Ba));
var qa = 0;
function Nt(t, e, n, o, r, s) {
	var l,
		i,
		c = {};
	for (i in e) i == 'ref' ? (l = e[i]) : (c[i] = e[i]);
	var u = {
		type: t,
		props: c,
		key: n,
		ref: l,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__d: void 0,
		__c: null,
		constructor: void 0,
		__v: --qa,
		__i: -1,
		__u: 0,
		__source: r,
		__self: s,
	};
	if (typeof t == 'function' && (l = t.defaultProps))
		for (i in l) c[i] === void 0 && (c[i] = l[i]);
	return k.vnode && k.vnode(u), u;
}
function Ja({
	id: t,
	showLayout: e = !1,
	showFilters: n = !1,
	showInput: o = !1,
	showTodos: r = !1,
}) {
	const {
			$todos: s,
			$done: l,
			$left: i,
			$filter: c,
			addTodo: u,
			removeTodo: _,
			checkTodo: a,
		} = Fs(t),
		v = nn(c),
		h = nn(s),
		O = nn(l),
		C = nn(i),
		N = bo((L) => {
			!L ||
				(L.addEventListener('check', (A) =>
					a(A.detail.id, A.detail.done),
				),
				L.addEventListener('delete', (A) =>
					_(A.detail.id),
				));
		}, []),
		j = bo((L) => {
			!L ||
				L.addEventListener('add', (A) =>
					u(A.detail),
				);
		}, []);
	if (!e) return null;
	const F = v === 'todo' ? C : v === 'done' ? O : h;
	return Nt(re, {
		children: [
			Nt('todo-layout', {
				children: [
					Nt('h1', {
						slot: 'title',
						children: 'Todos',
					}),
					n &&
						Nt('todo-filters', {
							slot: 'filters',
							id: t,
						}),
					r &&
						Nt('ul', {
							slot: 'todos',
							children: F.map((L) =>
								Nt(
									'li',
									{
										children: Nt(
											'todo-item',
											{
												ref: N,
												id: L.id,
												text: L.text,
												done: L.done,
											},
										),
									},
									L.id,
								),
							),
						}),
					o &&
						Nt('todo-input', {
							ref: j,
							slot: 'input',
						}),
				],
			}),
			Ka,
		],
	});
}
const Ka = Nt('style', {
	children: Ga`
      :host {
        color-scheme: light dark;
        --border-color: #00000033;
        --negative-color: #f06595;
        --accent-color: #845ef7;
      }

      @media (prefers-color-scheme: dark) {
        :host {
          --border-color: #ffffff22;
        }
      }

      * {
        margin: 0;
        padding: 0;
      }

      h1 {
        line-height: 1;
        text-transform: uppercase;
        font-size: 1.5rem;
      }

      ul {
        list-style: none;
      }

      li:not(:last-child)::after {
        content: "";
        display: block;
        border-bottom: 1px solid var(--border-color);
      }
    `,
});
function Ga(t, ...e) {
	return String.raw({ raw: t }, ...e);
}
customElements.define(
	'todo-demo',
	class extends HTMLElement {
		constructor() {
			super(),
				(this.shadow = this.attachShadow({
					mode: 'closed',
				}));
		}
		connectedCallback() {
			ti(
				$n(Ja, {
					id:
						this.getAttribute('id') ||
						crypto.randomUUID(),
					showLayout:
						this.hasAttribute('show-layout'),
					showInput:
						this.hasAttribute('show-input'),
					showTodos:
						this.hasAttribute('show-todos'),
					showFilters:
						this.hasAttribute('show-filters'),
				}),
				this.shadow,
			);
		}
	},
);
