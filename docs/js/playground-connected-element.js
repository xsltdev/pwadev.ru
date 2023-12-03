import { a as e, b as t, c as r, _ as i } from './tslib.js';
import {
	t as a,
	a as o,
	n as d,
	x as n,
	d as c,
	o as p,
	i as s,
	e as l,
	s as u,
	b as m,
	c as f,
	l as h,
} from './lit.js';
import { M as b, B as g, a as v } from './mwc-base.js';
/**
 * @license
 * Copyright 2018 Google Inc.
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
 */ function y(e, t) {
	if (e.closest) return e.closest(t);
	for (var r = e; r; ) {
		if (x(r, t)) return r;
		r = r.parentElement;
	}
	return null;
}
function x(e, t) {
	return (
		e.matches ||
		e.webkitMatchesSelector ||
		e.msMatchesSelector
	).call(e, t);
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
 */ var w = {
		BG_FOCUSED:
			'mdc-ripple-upgraded--background-focused',
		FG_ACTIVATION:
			'mdc-ripple-upgraded--foreground-activation',
		FG_DEACTIVATION:
			'mdc-ripple-upgraded--foreground-deactivation',
		ROOT: 'mdc-ripple-upgraded',
		UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
	},
	_ = {
		VAR_FG_SCALE: '--mdc-ripple-fg-scale',
		VAR_FG_SIZE: '--mdc-ripple-fg-size',
		VAR_FG_TRANSLATE_END:
			'--mdc-ripple-fg-translate-end',
		VAR_FG_TRANSLATE_START:
			'--mdc-ripple-fg-translate-start',
		VAR_LEFT: '--mdc-ripple-left',
		VAR_TOP: '--mdc-ripple-top',
	},
	A = {
		DEACTIVATION_TIMEOUT_MS: 225,
		FG_DEACTIVATION_MS: 150,
		INITIAL_ORIGIN_SCALE: 0.6,
		PADDING: 10,
		TAP_DELAY_MS: 300,
	},
	R = [
		'touchstart',
		'pointerdown',
		'mousedown',
		'keydown',
	],
	C = ['touchend', 'pointerup', 'mouseup', 'contextmenu'],
	I = [],
	S = (function (i) {
		function a(e) {
			var r =
				i.call(
					this,
					t(t({}, a.defaultAdapter), e),
				) || this;
			return (
				(r.activationAnimationHasEnded = !1),
				(r.activationTimer = 0),
				(r.fgDeactivationRemovalTimer = 0),
				(r.fgScale = '0'),
				(r.frame = { width: 0, height: 0 }),
				(r.initialSize = 0),
				(r.layoutFrame = 0),
				(r.maxRadius = 0),
				(r.unboundedCoords = { left: 0, top: 0 }),
				(r.activationState =
					r.defaultActivationState()),
				(r.activationTimerCallback = function () {
					(r.activationAnimationHasEnded = !0),
						r.runDeactivationUXLogicIfReady();
				}),
				(r.activateHandler = function (e) {
					r.activateImpl(e);
				}),
				(r.deactivateHandler = function () {
					r.deactivateImpl();
				}),
				(r.focusHandler = function () {
					r.handleFocus();
				}),
				(r.blurHandler = function () {
					r.handleBlur();
				}),
				(r.resizeHandler = function () {
					r.layout();
				}),
				r
			);
		}
		return (
			e(a, i),
			Object.defineProperty(a, 'cssClasses', {
				get: function () {
					return w;
				},
				enumerable: !1,
				configurable: !0,
			}),
			Object.defineProperty(a, 'strings', {
				get: function () {
					return _;
				},
				enumerable: !1,
				configurable: !0,
			}),
			Object.defineProperty(a, 'numbers', {
				get: function () {
					return A;
				},
				enumerable: !1,
				configurable: !0,
			}),
			Object.defineProperty(a, 'defaultAdapter', {
				get: function () {
					return {
						addClass: function () {},
						browserSupportsCssVars:
							function () {
								return !0;
							},
						computeBoundingRect: function () {
							return {
								top: 0,
								right: 0,
								bottom: 0,
								left: 0,
								width: 0,
								height: 0,
							};
						},
						containsEventTarget: function () {
							return !0;
						},
						deregisterDocumentInteractionHandler:
							function () {},
						deregisterInteractionHandler:
							function () {},
						deregisterResizeHandler:
							function () {},
						getWindowPageOffset: function () {
							return { x: 0, y: 0 };
						},
						isSurfaceActive: function () {
							return !0;
						},
						isSurfaceDisabled: function () {
							return !0;
						},
						isUnbounded: function () {
							return !0;
						},
						registerDocumentInteractionHandler:
							function () {},
						registerInteractionHandler:
							function () {},
						registerResizeHandler:
							function () {},
						removeClass: function () {},
						updateCssVariable: function () {},
					};
				},
				enumerable: !1,
				configurable: !0,
			}),
			(a.prototype.init = function () {
				var e = this,
					t = this.supportsPressRipple();
				if ((this.registerRootHandlers(t), t)) {
					var r = a.cssClasses,
						i = r.ROOT,
						o = r.UNBOUNDED;
					requestAnimationFrame(function () {
						e.adapter.addClass(i),
							e.adapter.isUnbounded() &&
								(e.adapter.addClass(o),
								e.layoutInternal());
					});
				}
			}),
			(a.prototype.destroy = function () {
				var e = this;
				if (this.supportsPressRipple()) {
					this.activationTimer &&
						(clearTimeout(this.activationTimer),
						(this.activationTimer = 0),
						this.adapter.removeClass(
							a.cssClasses.FG_ACTIVATION,
						)),
						this.fgDeactivationRemovalTimer &&
							(clearTimeout(
								this
									.fgDeactivationRemovalTimer,
							),
							(this.fgDeactivationRemovalTimer = 0),
							this.adapter.removeClass(
								a.cssClasses
									.FG_DEACTIVATION,
							));
					var t = a.cssClasses,
						r = t.ROOT,
						i = t.UNBOUNDED;
					requestAnimationFrame(function () {
						e.adapter.removeClass(r),
							e.adapter.removeClass(i),
							e.removeCssVars();
					});
				}
				this.deregisterRootHandlers(),
					this.deregisterDeactivationHandlers();
			}),
			(a.prototype.activate = function (e) {
				this.activateImpl(e);
			}),
			(a.prototype.deactivate = function () {
				this.deactivateImpl();
			}),
			(a.prototype.layout = function () {
				var e = this;
				this.layoutFrame &&
					cancelAnimationFrame(this.layoutFrame),
					(this.layoutFrame =
						requestAnimationFrame(function () {
							e.layoutInternal(),
								(e.layoutFrame = 0);
						}));
			}),
			(a.prototype.setUnbounded = function (e) {
				var t = a.cssClasses.UNBOUNDED;
				e
					? this.adapter.addClass(t)
					: this.adapter.removeClass(t);
			}),
			(a.prototype.handleFocus = function () {
				var e = this;
				requestAnimationFrame(function () {
					return e.adapter.addClass(
						a.cssClasses.BG_FOCUSED,
					);
				});
			}),
			(a.prototype.handleBlur = function () {
				var e = this;
				requestAnimationFrame(function () {
					return e.adapter.removeClass(
						a.cssClasses.BG_FOCUSED,
					);
				});
			}),
			(a.prototype.supportsPressRipple = function () {
				return this.adapter.browserSupportsCssVars();
			}),
			(a.prototype.defaultActivationState =
				function () {
					return {
						activationEvent: void 0,
						hasDeactivationUXRun: !1,
						isActivated: !1,
						isProgrammatic: !1,
						wasActivatedByPointer: !1,
						wasElementMadeActive: !1,
					};
				}),
			(a.prototype.registerRootHandlers = function (
				e,
			) {
				var t, i;
				if (e) {
					try {
						for (
							var a = r(R), o = a.next();
							!o.done;
							o = a.next()
						) {
							var d = o.value;
							this.adapter.registerInteractionHandler(
								d,
								this.activateHandler,
							);
						}
					} catch (e) {
						t = { error: e };
					} finally {
						try {
							o &&
								!o.done &&
								(i = a.return) &&
								i.call(a);
						} finally {
							if (t) throw t.error;
						}
					}
					this.adapter.isUnbounded() &&
						this.adapter.registerResizeHandler(
							this.resizeHandler,
						);
				}
				this.adapter.registerInteractionHandler(
					'focus',
					this.focusHandler,
				),
					this.adapter.registerInteractionHandler(
						'blur',
						this.blurHandler,
					);
			}),
			(a.prototype.registerDeactivationHandlers =
				function (e) {
					var t, i;
					if ('keydown' === e.type)
						this.adapter.registerInteractionHandler(
							'keyup',
							this.deactivateHandler,
						);
					else
						try {
							for (
								var a = r(C), o = a.next();
								!o.done;
								o = a.next()
							) {
								var d = o.value;
								this.adapter.registerDocumentInteractionHandler(
									d,
									this.deactivateHandler,
								);
							}
						} catch (e) {
							t = { error: e };
						} finally {
							try {
								o &&
									!o.done &&
									(i = a.return) &&
									i.call(a);
							} finally {
								if (t) throw t.error;
							}
						}
				}),
			(a.prototype.deregisterRootHandlers =
				function () {
					var e, t;
					try {
						for (
							var i = r(R), a = i.next();
							!a.done;
							a = i.next()
						) {
							var o = a.value;
							this.adapter.deregisterInteractionHandler(
								o,
								this.activateHandler,
							);
						}
					} catch (t) {
						e = { error: t };
					} finally {
						try {
							a &&
								!a.done &&
								(t = i.return) &&
								t.call(i);
						} finally {
							if (e) throw e.error;
						}
					}
					this.adapter.deregisterInteractionHandler(
						'focus',
						this.focusHandler,
					),
						this.adapter.deregisterInteractionHandler(
							'blur',
							this.blurHandler,
						),
						this.adapter.isUnbounded() &&
							this.adapter.deregisterResizeHandler(
								this.resizeHandler,
							);
				}),
			(a.prototype.deregisterDeactivationHandlers =
				function () {
					var e, t;
					this.adapter.deregisterInteractionHandler(
						'keyup',
						this.deactivateHandler,
					);
					try {
						for (
							var i = r(C), a = i.next();
							!a.done;
							a = i.next()
						) {
							var o = a.value;
							this.adapter.deregisterDocumentInteractionHandler(
								o,
								this.deactivateHandler,
							);
						}
					} catch (t) {
						e = { error: t };
					} finally {
						try {
							a &&
								!a.done &&
								(t = i.return) &&
								t.call(i);
						} finally {
							if (e) throw e.error;
						}
					}
				}),
			(a.prototype.removeCssVars = function () {
				var e = this,
					t = a.strings;
				Object.keys(t).forEach(function (r) {
					0 === r.indexOf('VAR_') &&
						e.adapter.updateCssVariable(
							t[r],
							null,
						);
				});
			}),
			(a.prototype.activateImpl = function (e) {
				var t = this;
				if (!this.adapter.isSurfaceDisabled()) {
					var r = this.activationState;
					if (!r.isActivated) {
						var i =
							this.previousActivationEvent;
						(i &&
							void 0 !== e &&
							i.type !== e.type) ||
							((r.isActivated = !0),
							(r.isProgrammatic =
								void 0 === e),
							(r.activationEvent = e),
							(r.wasActivatedByPointer =
								!r.isProgrammatic &&
								void 0 !== e &&
								('mousedown' === e.type ||
									'touchstart' ===
										e.type ||
									'pointerdown' ===
										e.type)),
							void 0 !== e &&
							I.length > 0 &&
							I.some(function (e) {
								return t.adapter.containsEventTarget(
									e,
								);
							})
								? this.resetActivationState()
								: (void 0 !== e &&
										(I.push(e.target),
										this.registerDeactivationHandlers(
											e,
										)),
								  (r.wasElementMadeActive =
										this.checkElementMadeActive(
											e,
										)),
								  r.wasElementMadeActive &&
										this.animateActivation(),
								  requestAnimationFrame(
										function () {
											(I = []),
												r.wasElementMadeActive ||
													void 0 ===
														e ||
													(' ' !==
														e.key &&
														32 !==
															e.keyCode) ||
													((r.wasElementMadeActive =
														t.checkElementMadeActive(
															e,
														)),
													r.wasElementMadeActive &&
														t.animateActivation()),
												r.wasElementMadeActive ||
													(t.activationState =
														t.defaultActivationState());
										},
								  )));
					}
				}
			}),
			(a.prototype.checkElementMadeActive = function (
				e,
			) {
				return (
					void 0 === e ||
					'keydown' !== e.type ||
					this.adapter.isSurfaceActive()
				);
			}),
			(a.prototype.animateActivation = function () {
				var e = this,
					t = a.strings,
					r = t.VAR_FG_TRANSLATE_START,
					i = t.VAR_FG_TRANSLATE_END,
					o = a.cssClasses,
					d = o.FG_DEACTIVATION,
					n = o.FG_ACTIVATION,
					c = a.numbers.DEACTIVATION_TIMEOUT_MS;
				this.layoutInternal();
				var p = '',
					s = '';
				if (!this.adapter.isUnbounded()) {
					var l =
							this.getFgTranslationCoordinates(),
						u = l.startPoint,
						m = l.endPoint;
					(p = u.x + 'px, ' + u.y + 'px'),
						(s = m.x + 'px, ' + m.y + 'px');
				}
				this.adapter.updateCssVariable(r, p),
					this.adapter.updateCssVariable(i, s),
					clearTimeout(this.activationTimer),
					clearTimeout(
						this.fgDeactivationRemovalTimer,
					),
					this.rmBoundedActivationClasses(),
					this.adapter.removeClass(d),
					this.adapter.computeBoundingRect(),
					this.adapter.addClass(n),
					(this.activationTimer = setTimeout(
						function () {
							e.activationTimerCallback();
						},
						c,
					));
			}),
			(a.prototype.getFgTranslationCoordinates =
				function () {
					var e,
						t = this.activationState,
						r = t.activationEvent;
					return (
						(e = t.wasActivatedByPointer
							? (function (e, t, r) {
									if (!e)
										return {
											x: 0,
											y: 0,
										};
									var i,
										a,
										o = t.x,
										d = t.y,
										n = o + r.left,
										c = d + r.top;
									if (
										'touchstart' ===
										e.type
									) {
										var p = e;
										(i =
											p
												.changedTouches[0]
												.pageX - n),
											(a =
												p
													.changedTouches[0]
													.pageY -
												c);
									} else {
										var s = e;
										(i = s.pageX - n),
											(a =
												s.pageY -
												c);
									}
									return { x: i, y: a };
							  })(
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
									 */ r,
									this.adapter.getWindowPageOffset(),
									this.adapter.computeBoundingRect(),
							  )
							: {
									x: this.frame.width / 2,
									y:
										this.frame.height /
										2,
							  }),
						{
							startPoint: (e = {
								x:
									e.x -
									this.initialSize / 2,
								y:
									e.y -
									this.initialSize / 2,
							}),
							endPoint: {
								x:
									this.frame.width / 2 -
									this.initialSize / 2,
								y:
									this.frame.height / 2 -
									this.initialSize / 2,
							},
						}
					);
				}),
			(a.prototype.runDeactivationUXLogicIfReady =
				function () {
					var e = this,
						t = a.cssClasses.FG_DEACTIVATION,
						r = this.activationState,
						i = r.hasDeactivationUXRun,
						o = r.isActivated;
					(i || !o) &&
						this.activationAnimationHasEnded &&
						(this.rmBoundedActivationClasses(),
						this.adapter.addClass(t),
						(this.fgDeactivationRemovalTimer =
							setTimeout(function () {
								e.adapter.removeClass(t);
							}, A.FG_DEACTIVATION_MS)));
				}),
			(a.prototype.rmBoundedActivationClasses =
				function () {
					var e = a.cssClasses.FG_ACTIVATION;
					this.adapter.removeClass(e),
						(this.activationAnimationHasEnded =
							!1),
						this.adapter.computeBoundingRect();
				}),
			(a.prototype.resetActivationState =
				function () {
					var e = this;
					(this.previousActivationEvent =
						this.activationState.activationEvent),
						(this.activationState =
							this.defaultActivationState()),
						setTimeout(function () {
							return (e.previousActivationEvent =
								void 0);
						}, a.numbers.TAP_DELAY_MS);
				}),
			(a.prototype.deactivateImpl = function () {
				var e = this,
					r = this.activationState;
				if (r.isActivated) {
					var i = t({}, r);
					r.isProgrammatic
						? (requestAnimationFrame(
								function () {
									e.animateDeactivation(
										i,
									);
								},
						  ),
						  this.resetActivationState())
						: (this.deregisterDeactivationHandlers(),
						  requestAnimationFrame(
								function () {
									(e.activationState.hasDeactivationUXRun =
										!0),
										e.animateDeactivation(
											i,
										),
										e.resetActivationState();
								},
						  ));
				}
			}),
			(a.prototype.animateDeactivation = function (
				e,
			) {
				var t = e.wasActivatedByPointer,
					r = e.wasElementMadeActive;
				(t || r) &&
					this.runDeactivationUXLogicIfReady();
			}),
			(a.prototype.layoutInternal = function () {
				this.frame =
					this.adapter.computeBoundingRect();
				var e = Math.max(
					this.frame.height,
					this.frame.width,
				);
				this.maxRadius = this.adapter.isUnbounded()
					? e
					: Math.sqrt(
							Math.pow(this.frame.width, 2) +
								Math.pow(
									this.frame.height,
									2,
								),
					  ) + a.numbers.PADDING;
				var t = Math.floor(
					e * a.numbers.INITIAL_ORIGIN_SCALE,
				);
				this.adapter.isUnbounded() && t % 2 != 0
					? (this.initialSize = t - 1)
					: (this.initialSize = t),
					(this.fgScale =
						'' +
						this.maxRadius / this.initialSize),
					this.updateLayoutCssVars();
			}),
			(a.prototype.updateLayoutCssVars = function () {
				var e = a.strings,
					t = e.VAR_FG_SIZE,
					r = e.VAR_LEFT,
					i = e.VAR_TOP,
					o = e.VAR_FG_SCALE;
				this.adapter.updateCssVariable(
					t,
					this.initialSize + 'px',
				),
					this.adapter.updateCssVariable(
						o,
						this.fgScale,
					),
					this.adapter.isUnbounded() &&
						((this.unboundedCoords = {
							left: Math.round(
								this.frame.width / 2 -
									this.initialSize / 2,
							),
							top: Math.round(
								this.frame.height / 2 -
									this.initialSize / 2,
							),
						}),
						this.adapter.updateCssVariable(
							r,
							this.unboundedCoords.left +
								'px',
						),
						this.adapter.updateCssVariable(
							i,
							this.unboundedCoords.top + 'px',
						));
			}),
			a
		);
	})(b),
	T = S;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class k extends g {
	constructor() {
		super(...arguments),
			(this.primary = !1),
			(this.accent = !1),
			(this.unbounded = !1),
			(this.disabled = !1),
			(this.activated = !1),
			(this.selected = !1),
			(this.internalUseStateLayerCustomProperties =
				!1),
			(this.hovering = !1),
			(this.bgFocused = !1),
			(this.fgActivation = !1),
			(this.fgDeactivation = !1),
			(this.fgScale = ''),
			(this.fgSize = ''),
			(this.translateStart = ''),
			(this.translateEnd = ''),
			(this.leftPos = ''),
			(this.topPos = ''),
			(this.mdcFoundationClass = T);
	}
	get isActive() {
		return x(this.parentElement || this, ':active');
	}
	createAdapter() {
		return {
			browserSupportsCssVars: () => !0,
			isUnbounded: () => this.unbounded,
			isSurfaceActive: () => this.isActive,
			isSurfaceDisabled: () => this.disabled,
			addClass: (e) => {
				switch (e) {
					case 'mdc-ripple-upgraded--background-focused':
						this.bgFocused = !0;
						break;
					case 'mdc-ripple-upgraded--foreground-activation':
						this.fgActivation = !0;
						break;
					case 'mdc-ripple-upgraded--foreground-deactivation':
						this.fgDeactivation = !0;
				}
			},
			removeClass: (e) => {
				switch (e) {
					case 'mdc-ripple-upgraded--background-focused':
						this.bgFocused = !1;
						break;
					case 'mdc-ripple-upgraded--foreground-activation':
						this.fgActivation = !1;
						break;
					case 'mdc-ripple-upgraded--foreground-deactivation':
						this.fgDeactivation = !1;
				}
			},
			containsEventTarget: () => !0,
			registerInteractionHandler: () => {},
			deregisterInteractionHandler: () => {},
			registerDocumentInteractionHandler: () => {},
			deregisterDocumentInteractionHandler: () => {},
			registerResizeHandler: () => {},
			deregisterResizeHandler: () => {},
			updateCssVariable: (e, t) => {
				switch (e) {
					case '--mdc-ripple-fg-scale':
						this.fgScale = t;
						break;
					case '--mdc-ripple-fg-size':
						this.fgSize = t;
						break;
					case '--mdc-ripple-fg-translate-end':
						this.translateEnd = t;
						break;
					case '--mdc-ripple-fg-translate-start':
						this.translateStart = t;
						break;
					case '--mdc-ripple-left':
						this.leftPos = t;
						break;
					case '--mdc-ripple-top':
						this.topPos = t;
				}
			},
			computeBoundingRect: () =>
				(
					this.parentElement || this
				).getBoundingClientRect(),
			getWindowPageOffset: () => ({
				x: window.pageXOffset,
				y: window.pageYOffset,
			}),
		};
	}
	startPress(e) {
		this.waitForFoundation(() => {
			this.mdcFoundation.activate(e);
		});
	}
	endPress() {
		this.waitForFoundation(() => {
			this.mdcFoundation.deactivate();
		});
	}
	startFocus() {
		this.waitForFoundation(() => {
			this.mdcFoundation.handleFocus();
		});
	}
	endFocus() {
		this.waitForFoundation(() => {
			this.mdcFoundation.handleBlur();
		});
	}
	startHover() {
		this.hovering = !0;
	}
	endHover() {
		this.hovering = !1;
	}
	waitForFoundation(e) {
		this.mdcFoundation
			? e()
			: this.updateComplete.then(e);
	}
	update(e) {
		e.has('disabled') &&
			this.disabled &&
			this.endHover(),
			super.update(e);
	}
	render() {
		const e =
				this.activated &&
				(this.primary || !this.accent),
			t =
				this.selected &&
				(this.primary || !this.accent),
			r = {
				'mdc-ripple-surface--accent': this.accent,
				'mdc-ripple-surface--primary--activated': e,
				'mdc-ripple-surface--accent--activated':
					this.accent && this.activated,
				'mdc-ripple-surface--primary--selected': t,
				'mdc-ripple-surface--accent--selected':
					this.accent && this.selected,
				'mdc-ripple-surface--disabled':
					this.disabled,
				'mdc-ripple-surface--hover': this.hovering,
				'mdc-ripple-surface--primary': this.primary,
				'mdc-ripple-surface--selected':
					this.selected,
				'mdc-ripple-upgraded--background-focused':
					this.bgFocused,
				'mdc-ripple-upgraded--foreground-activation':
					this.fgActivation,
				'mdc-ripple-upgraded--foreground-deactivation':
					this.fgDeactivation,
				'mdc-ripple-upgraded--unbounded':
					this.unbounded,
				'mdc-ripple-surface--internal-use-state-layer-custom-properties':
					this
						.internalUseStateLayerCustomProperties,
			};
		return n`<div class="mdc-ripple-surface mdc-ripple-upgraded ${c(
			r,
		)}" style="${p({
			'--mdc-ripple-fg-scale': this.fgScale,
			'--mdc-ripple-fg-size': this.fgSize,
			'--mdc-ripple-fg-translate-end':
				this.translateEnd,
			'--mdc-ripple-fg-translate-start':
				this.translateStart,
			'--mdc-ripple-left': this.leftPos,
			'--mdc-ripple-top': this.topPos,
		})}"></div>`;
	}
}
i(
	[o('.mdc-ripple-surface')],
	k.prototype,
	'mdcRoot',
	void 0,
),
	i(
		[d({ type: Boolean })],
		k.prototype,
		'primary',
		void 0,
	),
	i(
		[d({ type: Boolean })],
		k.prototype,
		'accent',
		void 0,
	),
	i(
		[d({ type: Boolean })],
		k.prototype,
		'unbounded',
		void 0,
	),
	i(
		[d({ type: Boolean })],
		k.prototype,
		'disabled',
		void 0,
	),
	i(
		[d({ type: Boolean })],
		k.prototype,
		'activated',
		void 0,
	),
	i(
		[d({ type: Boolean })],
		k.prototype,
		'selected',
		void 0,
	),
	i(
		[d({ type: Boolean })],
		k.prototype,
		'internalUseStateLayerCustomProperties',
		void 0,
	),
	i([a()], k.prototype, 'hovering', void 0),
	i([a()], k.prototype, 'bgFocused', void 0),
	i([a()], k.prototype, 'fgActivation', void 0),
	i([a()], k.prototype, 'fgDeactivation', void 0),
	i([a()], k.prototype, 'fgScale', void 0),
	i([a()], k.prototype, 'fgSize', void 0),
	i([a()], k.prototype, 'translateStart', void 0),
	i([a()], k.prototype, 'translateEnd', void 0),
	i([a()], k.prototype, 'leftPos', void 0),
	i([a()], k.prototype, 'topPos', void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const F = s`.mdc-ripple-surface{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:transparent;will-change:transform,opacity;position:relative;outline:0;overflow:hidden}.mdc-ripple-surface::after,.mdc-ripple-surface::before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-ripple-surface::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index,1)}.mdc-ripple-surface::after{z-index:0;z-index:var(--mdc-ripple-z-index,0)}.mdc-ripple-surface.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface::after,.mdc-ripple-surface::before{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded],.mdc-ripple-upgraded--unbounded{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::before,.mdc-ripple-upgraded--unbounded::after,.mdc-ripple-upgraded--unbounded::before{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::before,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::before{top:var(--mdc-ripple-top,calc(50% - 50%));left:var(--mdc-ripple-left,calc(50% - 50%));width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface::after,.mdc-ripple-surface::before{background-color:#000;background-color:var(--mdc-ripple-color,#000)}.mdc-ripple-surface.mdc-ripple-surface--hover::before,.mdc-ripple-surface:hover::before{opacity:.04;opacity:var(--mdc-ripple-hover-opacity,.04)}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12;opacity:var(--mdc-ripple-focus-opacity,.12)}.mdc-ripple-surface:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12;opacity:var(--mdc-ripple-press-opacity,.12)}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(.4,0,.2,1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}:host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;display:block}:host .mdc-ripple-surface{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;will-change:unset}.mdc-ripple-surface--primary::after,.mdc-ripple-surface--primary::before{background-color:#6200ee;background-color:var(--mdc-ripple-color,var(--mdc-theme-primary,#6200ee))}.mdc-ripple-surface--primary.mdc-ripple-surface--hover::before,.mdc-ripple-surface--primary:hover::before{opacity:.04;opacity:var(--mdc-ripple-hover-opacity,.04)}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12;opacity:var(--mdc-ripple-focus-opacity,.12)}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12;opacity:var(--mdc-ripple-press-opacity,.12)}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--primary--activated::before{opacity:.12;opacity:var(--mdc-ripple-activated-opacity,.12)}.mdc-ripple-surface--primary--activated::after,.mdc-ripple-surface--primary--activated::before{background-color:#6200ee;background-color:var(--mdc-ripple-color,var(--mdc-theme-primary,#6200ee))}.mdc-ripple-surface--primary--activated.mdc-ripple-surface--hover::before,.mdc-ripple-surface--primary--activated:hover::before{opacity:.16;opacity:var(--mdc-ripple-hover-opacity,.16)}.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.24;opacity:var(--mdc-ripple-focus-opacity,.24)}.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.24;opacity:var(--mdc-ripple-press-opacity,.24)}.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--primary--selected::before{opacity:.08;opacity:var(--mdc-ripple-selected-opacity,.08)}.mdc-ripple-surface--primary--selected::after,.mdc-ripple-surface--primary--selected::before{background-color:#6200ee;background-color:var(--mdc-ripple-color,var(--mdc-theme-primary,#6200ee))}.mdc-ripple-surface--primary--selected.mdc-ripple-surface--hover::before,.mdc-ripple-surface--primary--selected:hover::before{opacity:.12;opacity:var(--mdc-ripple-hover-opacity,.12)}.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.2;opacity:var(--mdc-ripple-focus-opacity,.2)}.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.2;opacity:var(--mdc-ripple-press-opacity,.2)}.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--accent::after,.mdc-ripple-surface--accent::before{background-color:#018786;background-color:var(--mdc-ripple-color,var(--mdc-theme-secondary,#018786))}.mdc-ripple-surface--accent.mdc-ripple-surface--hover::before,.mdc-ripple-surface--accent:hover::before{opacity:.04;opacity:var(--mdc-ripple-hover-opacity,.04)}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12;opacity:var(--mdc-ripple-focus-opacity,.12)}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12;opacity:var(--mdc-ripple-press-opacity,.12)}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--accent--activated::before{opacity:.12;opacity:var(--mdc-ripple-activated-opacity,.12)}.mdc-ripple-surface--accent--activated::after,.mdc-ripple-surface--accent--activated::before{background-color:#018786;background-color:var(--mdc-ripple-color,var(--mdc-theme-secondary,#018786))}.mdc-ripple-surface--accent--activated.mdc-ripple-surface--hover::before,.mdc-ripple-surface--accent--activated:hover::before{opacity:.16;opacity:var(--mdc-ripple-hover-opacity,.16)}.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.24;opacity:var(--mdc-ripple-focus-opacity,.24)}.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.24;opacity:var(--mdc-ripple-press-opacity,.24)}.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--accent--selected::before{opacity:.08;opacity:var(--mdc-ripple-selected-opacity,.08)}.mdc-ripple-surface--accent--selected::after,.mdc-ripple-surface--accent--selected::before{background-color:#018786;background-color:var(--mdc-ripple-color,var(--mdc-theme-secondary,#018786))}.mdc-ripple-surface--accent--selected.mdc-ripple-surface--hover::before,.mdc-ripple-surface--accent--selected:hover::before{opacity:.12;opacity:var(--mdc-ripple-hover-opacity,.12)}.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.2;opacity:var(--mdc-ripple-focus-opacity,.2)}.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.2;opacity:var(--mdc-ripple-press-opacity,.2)}.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--disabled{opacity:0}.mdc-ripple-surface--internal-use-state-layer-custom-properties::after,.mdc-ripple-surface--internal-use-state-layer-custom-properties::before{background-color:#000;background-color:var(--mdc-ripple-hover-state-layer-color,#000)}.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-surface--hover::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties:hover::before{opacity:.04;opacity:var(--mdc-ripple-hover-state-layer-opacity,.04)}.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12;opacity:var(--mdc-ripple-focus-state-layer-opacity,.12)}.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12;opacity:var(--mdc-ripple-pressed-state-layer-opacity,.12)}.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-pressed-state-layer-opacity, 0.12)}`;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let E = class extends k {};
(E.styles = [F]), (E = i([l('mwc-ripple')], E));
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class H {
	constructor(e) {
		(this.startPress = (t) => {
			e().then((e) => {
				e && e.startPress(t);
			});
		}),
			(this.endPress = () => {
				e().then((e) => {
					e && e.endPress();
				});
			}),
			(this.startFocus = () => {
				e().then((e) => {
					e && e.startFocus();
				});
			}),
			(this.endFocus = () => {
				e().then((e) => {
					e && e.endFocus();
				});
			}),
			(this.startHover = () => {
				e().then((e) => {
					e && e.startHover();
				});
			}),
			(this.endHover = () => {
				e().then((e) => {
					e && e.endHover();
				});
			});
	}
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */ const z = s`:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:400;font-style:normal;font-size:var(--mdc-icon-size,24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}`;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let D = class extends u {
	render() {
		return n`<span><slot></slot></span>`;
	}
};
(D.styles = [z]), (D = i([l('mwc-icon')], D));
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class P extends u {
	constructor() {
		super(...arguments),
			(this.raised = !1),
			(this.unelevated = !1),
			(this.outlined = !1),
			(this.dense = !1),
			(this.disabled = !1),
			(this.trailingIcon = !1),
			(this.fullwidth = !1),
			(this.icon = ''),
			(this.label = ''),
			(this.expandContent = !1),
			(this.shouldRenderRipple = !1),
			(this.rippleHandlers = new H(
				() => (
					(this.shouldRenderRipple = !0),
					this.ripple
				),
			));
	}
	renderOverlay() {
		return n``;
	}
	renderRipple() {
		const e = this.raised || this.unelevated;
		return this.shouldRenderRipple
			? n`<mwc-ripple class="ripple" .primary="${!e}" .disabled="${
					this.disabled
			  }"></mwc-ripple>`
			: '';
	}
	focus() {
		const e = this.buttonElement;
		e && (this.rippleHandlers.startFocus(), e.focus());
	}
	blur() {
		const e = this.buttonElement;
		e && (this.rippleHandlers.endFocus(), e.blur());
	}
	getRenderClasses() {
		return {
			'mdc-button--raised': this.raised,
			'mdc-button--unelevated': this.unelevated,
			'mdc-button--outlined': this.outlined,
			'mdc-button--dense': this.dense,
		};
	}
	render() {
		return n`<button id="button" class="mdc-button ${c(
			this.getRenderClasses(),
		)}" ?disabled="${this.disabled}" aria-label="${
			this.label || this.icon
		}" aria-haspopup="${h(
			this.ariaHasPopup,
		)}" @focus="${this.handleRippleFocus}" @blur="${
			this.handleRippleBlur
		}" @mousedown="${
			this.handleRippleActivate
		}" @mouseenter="${
			this.handleRippleMouseEnter
		}" @mouseleave="${
			this.handleRippleMouseLeave
		}" @touchstart="${
			this.handleRippleActivate
		}" @touchend="${
			this.handleRippleDeactivate
		}" @touchcancel="${
			this.handleRippleDeactivate
		}">${this.renderOverlay()} ${this.renderRipple()} <span class="leading-icon"><slot name="icon">${
			this.icon && !this.trailingIcon
				? this.renderIcon()
				: ''
		}</slot></span><span class="mdc-button__label">${
			this.label
		}</span> <span class="slot-container ${c({
			flex: this.expandContent,
		})}"><slot></slot></span><span class="trailing-icon"><slot name="trailingIcon">${
			this.icon && this.trailingIcon
				? this.renderIcon()
				: ''
		}</slot></span></button>`;
	}
	renderIcon() {
		return n`<mwc-icon class="mdc-button__icon">${this.icon}</mwc-icon>`;
	}
	handleRippleActivate(e) {
		const t = () => {
			window.removeEventListener('mouseup', t),
				this.handleRippleDeactivate();
		};
		window.addEventListener('mouseup', t),
			this.rippleHandlers.startPress(e);
	}
	handleRippleDeactivate() {
		this.rippleHandlers.endPress();
	}
	handleRippleMouseEnter() {
		this.rippleHandlers.startHover();
	}
	handleRippleMouseLeave() {
		this.rippleHandlers.endHover();
	}
	handleRippleFocus() {
		this.rippleHandlers.startFocus();
	}
	handleRippleBlur() {
		this.rippleHandlers.endFocus();
	}
}
(P.shadowRootOptions = {
	mode: 'open',
	delegatesFocus: !0,
}),
	i(
		[
			v,
			d({ type: String, attribute: 'aria-haspopup' }),
		],
		P.prototype,
		'ariaHasPopup',
		void 0,
	),
	i(
		[d({ type: Boolean, reflect: !0 })],
		P.prototype,
		'raised',
		void 0,
	),
	i(
		[d({ type: Boolean, reflect: !0 })],
		P.prototype,
		'unelevated',
		void 0,
	),
	i(
		[d({ type: Boolean, reflect: !0 })],
		P.prototype,
		'outlined',
		void 0,
	),
	i([d({ type: Boolean })], P.prototype, 'dense', void 0),
	i(
		[d({ type: Boolean, reflect: !0 })],
		P.prototype,
		'disabled',
		void 0,
	),
	i(
		[d({ type: Boolean, attribute: 'trailingicon' })],
		P.prototype,
		'trailingIcon',
		void 0,
	),
	i(
		[d({ type: Boolean, reflect: !0 })],
		P.prototype,
		'fullwidth',
		void 0,
	),
	i([d({ type: String })], P.prototype, 'icon', void 0),
	i([d({ type: String })], P.prototype, 'label', void 0),
	i(
		[d({ type: Boolean })],
		P.prototype,
		'expandContent',
		void 0,
	),
	i([o('#button')], P.prototype, 'buttonElement', void 0),
	i([m('mwc-ripple')], P.prototype, 'ripple', void 0),
	i([a()], P.prototype, 'shouldRenderRipple', void 0),
	i(
		[f({ passive: !0 })],
		P.prototype,
		'handleRippleActivate',
		null,
	);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const O = s`.mdc-button{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto,sans-serif;font-family:var(--mdc-typography-button-font-family,var(--mdc-typography-font-family,Roboto,sans-serif));font-size:.875rem;font-size:var(--mdc-typography-button-font-size,.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height,2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight,500);letter-spacing:.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing,.0892857143em);text-decoration:none;text-decoration:var(--mdc-typography-button-text-decoration,none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform,uppercase)}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity,0);transition:opacity 280ms cubic-bezier(.4,0,.2,1);background-color:#fff;background-color:var(--mdc-elevation-overlay-color,#fff)}.mdc-button{position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:0;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;background:0 0}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:0}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top}.mdc-button .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button .mdc-button__icon{margin-left:8px;margin-right:0}.mdc-button .mdc-button__label{position:relative}.mdc-button .mdc-button__focus-ring{display:none}@media screen and (forced-colors:active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring{pointer-events:none;border:2px solid transparent;border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);height:calc(100% + 4px);width:calc(100% + 4px);display:block}}@media screen and (forced-colors:active)and (forced-colors:active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring{border-color:CanvasText}}@media screen and (forced-colors:active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring::after,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring::after{content:"";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);height:calc(100% + 4px);width:calc(100% + 4px)}}@media screen and (forced-colors:active)and (forced-colors:active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring::after,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring::after{border-color:CanvasText}}.mdc-button .mdc-button__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}.mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button__label+.mdc-button__icon{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.mdc-button{padding:0 8px 0 8px}.mdc-button--unelevated{transition:box-shadow 280ms cubic-bezier(.4,0,.2,1);padding:0 16px 0 16px}.mdc-button--unelevated.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--unelevated.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--raised{transition:box-shadow 280ms cubic-bezier(.4,0,.2,1);padding:0 16px 0 16px}.mdc-button--raised.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--raised.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--outlined{border-style:solid;transition:border 280ms cubic-bezier(.4,0,.2,1)}.mdc-button--outlined .mdc-button__ripple{border-style:solid;border-color:transparent}.mdc-button{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small,4px)}.mdc-button:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary,#6200ee)}.mdc-button:disabled{color:rgba(0,0,0,.38)}.mdc-button .mdc-button__icon{font-size:1.125rem;width:1.125rem;height:1.125rem}.mdc-button .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small,4px)}.mdc-button--raised,.mdc-button--unelevated{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small,4px)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:#6200ee;background-color:var(--mdc-theme-primary,#6200ee)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{background-color:rgba(0,0,0,.12)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){color:#fff;color:var(--mdc-theme-on-primary,#fff)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{color:rgba(0,0,0,.38)}.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon{font-size:1.125rem;width:1.125rem;height:1.125rem}.mdc-button--raised .mdc-button__ripple,.mdc-button--unelevated .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small,4px)}.mdc-button--outlined{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small,4px);padding:0 15px 0 15px;border-width:1px}.mdc-button--outlined:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary,#6200ee)}.mdc-button--outlined:disabled{color:rgba(0,0,0,.38)}.mdc-button--outlined .mdc-button__icon{font-size:1.125rem;width:1.125rem;height:1.125rem}.mdc-button--outlined .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small,4px)}.mdc-button--outlined:not(:disabled){border-color:rgba(0,0,0,.12)}.mdc-button--outlined:disabled{border-color:rgba(0,0,0,.12)}.mdc-button--outlined.mdc-button--icon-trailing{padding:0 11px 0 15px}.mdc-button--outlined.mdc-button--icon-leading{padding:0 15px 0 11px}.mdc-button--outlined .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px;border-width:1px}.mdc-button--outlined .mdc-button__touch{left:calc(-1 * 1px);width:calc(100% + 2 * 1px)}.mdc-button--raised{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);transition:box-shadow 280ms cubic-bezier(.4,0,.2,1)}.mdc-button--raised:focus,.mdc-button--raised:hover{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.mdc-button--raised:active{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.mdc-button--raised:disabled{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}:host{display:inline-flex;outline:0;-webkit-tap-highlight-color:transparent;vertical-align:top}:host([fullwidth]){width:100%}:host([raised]),:host([unelevated]){--mdc-ripple-color:#fff;--mdc-ripple-focus-opacity:0.24;--mdc-ripple-hover-opacity:0.08;--mdc-ripple-press-opacity:0.24}.leading-icon .mdc-button__icon,.leading-icon ::slotted(*),.trailing-icon .mdc-button__icon,.trailing-icon ::slotted(*){margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem}.leading-icon .mdc-button__icon[dir=rtl],.leading-icon ::slotted([dir=rtl]),.trailing-icon .mdc-button__icon[dir=rtl],.trailing-icon ::slotted([dir=rtl]),[dir=rtl] .leading-icon .mdc-button__icon,[dir=rtl] .leading-icon ::slotted(*),[dir=rtl] .trailing-icon .mdc-button__icon,[dir=rtl] .trailing-icon ::slotted(*){margin-left:8px;margin-right:0}.trailing-icon .mdc-button__icon,.trailing-icon ::slotted(*){margin-left:8px;margin-right:0}.trailing-icon .mdc-button__icon[dir=rtl],.trailing-icon ::slotted([dir=rtl]),[dir=rtl] .trailing-icon .mdc-button__icon,[dir=rtl] .trailing-icon ::slotted(*){margin-left:0;margin-right:8px}.slot-container{display:inline-flex;align-items:center;justify-content:center}.slot-container.flex{flex:auto}.mdc-button{flex:auto;overflow:hidden;padding-left:8px;padding-left:var(--mdc-button-horizontal-padding,8px);padding-right:8px;padding-right:var(--mdc-button-horizontal-padding,8px)}.mdc-button--raised{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);box-shadow:var(--mdc-button-raised-box-shadow,0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12))}.mdc-button--raised:focus{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);box-shadow:var(--mdc-button-raised-box-shadow-focus,var(--mdc-button-raised-box-shadow-hover,0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)))}.mdc-button--raised:hover{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);box-shadow:var(--mdc-button-raised-box-shadow-hover,0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12))}.mdc-button--raised:active{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);box-shadow:var(--mdc-button-raised-box-shadow-active,0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12))}.mdc-button--raised:disabled{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12);box-shadow:var(--mdc-button-raised-box-shadow-disabled,0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12))}.mdc-button--raised,.mdc-button--unelevated{padding-left:16px;padding-left:var(--mdc-button-horizontal-padding,16px);padding-right:16px;padding-right:var(--mdc-button-horizontal-padding,16px)}.mdc-button--outlined{border-width:1px;border-width:var(--mdc-button-outline-width,1px);padding-left:calc(16px - 1px);padding-left:calc(var(--mdc-button-horizontal-padding,16px) - var(--mdc-button-outline-width,1px));padding-right:calc(16px - 1px);padding-right:calc(var(--mdc-button-horizontal-padding,16px) - var(--mdc-button-outline-width,1px))}.mdc-button--outlined:not(:disabled){border-color:rgba(0,0,0,.12);border-color:var(--mdc-button-outline-color,rgba(0,0,0,.12))}.mdc-button--outlined .ripple{top:calc(-1 * 1px);top:calc(-1 * var(--mdc-button-outline-width,1px));left:calc(-1 * 1px);left:calc(-1 * var(--mdc-button-outline-width,1px));right:initial;right:initial;border-width:1px;border-width:var(--mdc-button-outline-width,1px);border-style:solid;border-color:transparent}.mdc-button--outlined .ripple[dir=rtl],[dir=rtl] .mdc-button--outlined .ripple{left:initial;left:initial;right:calc(-1 * 1px);right:calc(-1 * var(--mdc-button-outline-width,1px))}.mdc-button--dense{height:28px;margin-top:0;margin-bottom:0}.mdc-button--dense .mdc-button__touch{height:100%}:host([disabled]){pointer-events:none}:host([disabled]) .mdc-button{color:rgba(0,0,0,.38);color:var(--mdc-button-disabled-ink-color,rgba(0,0,0,.38))}:host([disabled]) .mdc-button--raised,:host([disabled]) .mdc-button--unelevated{background-color:rgba(0,0,0,.12);background-color:var(--mdc-button-disabled-fill-color,rgba(0,0,0,.12))}:host([disabled]) .mdc-button--outlined{border-color:rgba(0,0,0,.12);border-color:var(--mdc-button-disabled-outline-color,rgba(0,0,0,.12))}`;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */ let B = class extends P {};
(B.styles = [O]), (B = i([l('mwc-button')], B));
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class V extends u {
	set project(e) {
		'string' == typeof e
			? requestAnimationFrame(() => {
					var t;
					const r = this.getRootNode();
					this._project =
						null !==
							(t = r.getElementById(e)) &&
						void 0 !== t
							? t
							: void 0;
			  })
			: (this._project = e);
	}
}
i([d()], V.prototype, 'project', null),
	i([a()], V.prototype, '_project', void 0);
export { V as P, H as R, y as c, x as m };
