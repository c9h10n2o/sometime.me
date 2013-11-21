/* Doodle for Night
 * Debussy - Clair de Lune
 * Designed & Coded by Google 2013.8.22 for Debussy 151th
 * Transplanted & Trimmed by c9h10n2o in 2013.8.23, http://sometime.me
 */
 
 define(function(require, exports) {

    exports.init = function(_uiCanvasWrapper, assetsPath, endCallback) {
        window.google || (window.google = {});
        google.doodle || (google.doodle = {});
        // google.doodle.url = "http://google.com";
        // google.doodle.alt = "法国作曲家德彪西诞辰 151周年";
        if (!google.doodle || !google.doodle.loaded) {
            var a = ["google", "doodle", "loaded"], b = this;
            a[0] in b || !b.execScript || b.execScript("var " + a[0]);
            for (var c; a.length && (c = a.shift()); )
                a.length ? b = b[c] ? b[c] : b[c] = {} : b[c] = !0;
        }

        var animationPlaying = true;

        var h, k = this, ba = function(a) {
            var b = typeof a;
            if ('object' == b)
                if (a) {
                    if (a instanceof Array)
                        return 'array';
                    if (a instanceof Object)
                        return b;
                    var c = Object.prototype.toString.call(a);
                    if ('[object Window]' == c)
                        return 'object';
                    if ('[object Array]' == c || 'number' == typeof a.length && 'undefined' != typeof a.splice && 'undefined' != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable('splice'))
                        return 'array';
                    if ('[object Function]' == c || 'undefined' != typeof a.call && 'undefined' != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable('call'))
                        return 'function'
                } else
                    return 'null';
            else if ('function' == b && 'undefined' == typeof a.call)
                return 'object';
            return b
        }, ca = function(a) {
            var b = ba(a);
            return 'array' == b || 'object' == b && 'number' == typeof a.length
        }, l = function(a) {
            return 'string' == typeof a
        }, m = 'closure_uid_' + (1E9 * Math.random() >>> 0), da = 0, ea = function(a, b, c) {
            return a.call.apply(a.bind, arguments)
        }, fa = function(a, b, c) {
            if (!a)
                throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function() {
                    var c = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(c, 
                    d);
                    return a.apply(b, c)
                }
            }
            return function() {
                return a.apply(b, arguments)
            }
        }, ga = function(a, b, c) {
            ga = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf('native code') ? ea : fa;
            return ga.apply(null, arguments)
        }, ha = function(a, b) {
            var c = Array.prototype.slice.call(arguments, 1);
            return function() {
                var b = c.slice();
                b.push.apply(b, arguments);
                return a.apply(this, b)
            }
        }, ia = function() {
            var a = ['google', 'doodle', 'jesr'], b = k;
            a[0] in b || !b.execScript || b.execScript('var ' + a[0]);
            for (var c; a.length && (c = a.shift()); )
                a.length ? 
                b = b[c] ? b[c] : b[c] = {} : b[c] = true
        }, n = function(a, b) {
            function c() {
            }
            c.prototype = b.prototype;
            a.ra = b.prototype;
            a.prototype = new c
        };
        Function.prototype.bind = Function.prototype.bind || function(a, b) {
            if (1 < arguments.length) {
                var c = Array.prototype.slice.call(arguments, 1);
                c.unshift(this, a);
                return ga.apply(null, c)
            }
            return ga(this, a)
        };
        var p;
        var ja = function() {
        };
        ja.prototype.w = false;
        ja.prototype.oa = function() {
            this.w || (this.w = true, this.d())
        };
        var ka = function(a, b) {
            a.a || (a.a = []);
            a.a.push(ga(b, void 0))
        };
        ja.prototype.d = function() {
            if (this.a)
                for (; this.a.length; )
                    this.a.shift()()
        };
        var la = function(a) {
            a && 'function' == typeof a.oa && a.oa()
        };
        var ma = function(a) {
            var b = [], c = 0, d;
            for (d in a)
                b[c++] = a[d];
            return b
        }, na = function(a) {
            var b = [], c = 0, d;
            for (d in a)
                b[c++] = d;
            return b
        };
        var oa = function(a) {
            Error.captureStackTrace ? Error.captureStackTrace(this, oa) : this.stack = Error().stack || '';
            a && (this.message = String(a))
        };
        n(oa, Error);
        oa.prototype.name = 'CustomError';
        var pa = function(a, b) {
            for (var c = a.split('%s'), d = '', e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length; )
                d += c.shift() + e.shift();
            return d + c.join('%s')
        };
        var qa = function(a, b) {
            b.unshift(a);
            oa.call(this, pa.apply(null, b));
            b.shift()
        };
        n(qa, oa);
        qa.prototype.name = 'AssertionError';
        var ra = function(a, b, c) {
            if (!a) {
                var d = Array.prototype.slice.call(arguments, 2), e = 'Assertion failed';
                if (b)
                    var e = e + (': ' + b), f = d;
                throw new qa('' + e, f || []);
            }
        };
        var r = Array.prototype, sa = r.indexOf ? function(a, b, c) {
            ra(null != a.length);
            return r.indexOf.call(a, b, c)
        } : function(a, b, c) {
            c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
            if (l(a))
                return l(b) && 1 == b.length ? a.indexOf(b, c) : -1;
            for (; c < a.length; c++)
                if (c in a && a[c] === b)
                    return c;
            return -1
        }, ta = r.forEach ? function(a, b, c) {
            ra(null != a.length);
            r.forEach.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, e = l(a) ? a.split('') : a, f = 0; f < d; f++)
                f in e && b.call(c, e[f], f, a)
        }, ua = function(a) {
            return r.concat.apply(r, arguments)
        }, va = function(a) {
            var b = 
            a.length;
            if (0 < b) {
                for (var c = Array(b), d = 0; d < b; d++)
                    c[d] = a[d];
                return c
            }
            return []
        };
        var wa = function(a) {
            wa[' '](a);
            return a
        };
        wa[' '] = function() {
        };
        var xa, ya, za, Aa, Ba = function() {
            return k.navigator ? k.navigator.userAgent : null
        };
        Aa = za = ya = xa = false;
        var Ca;
        if (Ca = Ba()) {
            var Da = k.navigator;
            xa = 0 == Ca.lastIndexOf('Opera', 0);
            ya = !xa && (-1 != Ca.indexOf('MSIE') || -1 != Ca.indexOf('Trident'));
            za = !xa && -1 != Ca.indexOf('WebKit');
            Aa = !xa && !za && !ya && 'Gecko' == Da.product
        }
        var Ea = xa, s = ya, Fa = Aa, Ga = za, Ha = k.navigator, Ia = -1 != (Ha && Ha.platform || '').indexOf('Mac'), Ja = function() {
            var a = k.document;
            return a ? a.documentMode : void 0
        }, Ka;
        i: {
            var La = '', Ma;
            if (Ea && k.opera)
                var Na = k.opera.version, La = 'function' == typeof Na ? Na() : Na;
            else if (Fa ? Ma = /rv\:([^\);]+)(\)|;)/ : s ? Ma = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : Ga && (Ma = /WebKit\/(\S+)/), Ma)
                var Oa = Ma.exec(Ba()), La = Oa ? Oa[1] : '';
            if (s) {
                var Pa = Ja();
                if (Pa > parseFloat(La)) {
                    Ka = String(Pa);
                    break i
                }
            }
            Ka = La
        }
        var Qa = Ka, Ra = {}, t = function(a) {
            var b;
            if (!(b = Ra[a])) {
                b = 0;
                for (var c = String(Qa).replace(/^[\s\xa0]+|[\s\xa0]+$/g, '').split('.'), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, '').split('.'), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
                    var g = c[f] || '', q = d[f] || '', aa = RegExp('(\\d*)(\\D*)', 'g'), Ua = RegExp('(\\d*)(\\D*)', 'g');
                    do {
                        var B = aa.exec(g) || ['', '', ''], x = Ua.exec(q) || ['', '', ''];
                        if (0 == B[0].length && 0 == x[0].length)
                            break;
                        b = ((0 == B[1].length ? 0 : parseInt(B[1], 10)) < (0 == x[1].length ? 0 : parseInt(x[1], 10)) ? -1 : (0 == B[1].length ? 
                        0 : parseInt(B[1], 10)) > (0 == x[1].length ? 0 : parseInt(x[1], 10)) ? 1 : 0) || ((0 == B[2].length) < (0 == x[2].length) ? -1 : (0 == B[2].length) > (0 == x[2].length) ? 1 : 0) || (B[2] < x[2] ? -1 : B[2] > x[2] ? 1 : 0)
                    } while (0 == b)
                }
                b = Ra[a] = 0 <= b
            }
            return b
        }, Sa = k.document, Ta = Sa && s ? Ja() || ('CSS1Compat' == Sa.compatMode ? parseInt(Qa, 10) : 5) : void 0;
        var Va;
        (Va = !s) || (Va = s && 9 <= Ta);
        var Wa = Va, Xa = s && !t('9');
        !Ga || t('528');
        Fa && t('1.9b') || s && t('8') || Ea && t('9.5') || Ga && t('528');
        Fa && !t('8') || s && t('9');
        var Ya = function(a, b) {
            this.type = a;
            this.d = this.wa = b
        };
        h = Ya.prototype;
        h.oa = function() {
        };
        h.ua = false;
        h.fb = false;
        h.gb = true;
        h.va = function() {
            this.fb = true;
            this.gb = false
        };
        var Za = function(a, b) {
            a && this.init(a, b)
        };
        n(Za, Ya);
        h = Za.prototype;
        h.wa = null;
        h.Ya = null;
        h.Wa = 0;
        h.Xa = 0;
        h.clientX = 0;
        h.clientY = 0;
        h.Za = 0;
        h.$a = 0;
        h.Ra = 0;
        h.Ua = 0;
        h.Sa = 0;
        h.Ta = false;
        h.Qa = false;
        h.ab = false;
        h.Va = false;
        h.bb = false;
        h.Ia = null;
        h.init = function(a, b) {
            var c = this.type = a.type;
            Ya.call(this, c);
            this.wa = a.target || a.srcElement;
            this.d = b;
            var d = a.relatedTarget;
            if (d) {
                if (Fa) {
                    var e;
                    i: {
                        try {
                            wa(d.nodeName);
                            e = true;
                            break i
                        } catch (f) {
                        }
                        e = false
                    }
                    e || (d = null)
                }
            } else
                'mouseover' == c ? d = a.fromElement : 'mouseout' == c && (d = a.toElement);
            this.Ya = d;
            this.Wa = Ga || void 0 !== a.offsetX ? a.offsetX : a.layerX;
            this.Xa = Ga || void 0 !== a.offsetY ? a.offsetY : a.layerY;
            this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX;
            this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY;
            this.Za = a.screenX || 0;
            this.$a = a.screenY || 0;
            this.Ra = a.button;
            this.Ua = a.keyCode || 0;
            this.Sa = a.charCode || ('keypress' == c ? a.keyCode : 0);
            this.Ta = a.ctrlKey;
            this.Qa = a.altKey;
            this.ab = a.shiftKey;
            this.Va = a.metaKey;
            this.bb = Ia ? a.metaKey : a.ctrlKey;
            this.Ia = a;
            a.defaultPrevented && this.va();
            delete this.ua
        };
        h.va = function() {
            Za.ra.va.call(this);
            var a = this.Ia;
            if (a.preventDefault)
                a.preventDefault();
            else if (a.returnValue = false, Xa)
                try {
                    if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)
                        a.keyCode = -1
                } catch (b) {
                }
        };
        var $a = 'closure_listenable_' + (1E6 * Math.random() | 0), ab = function(a) {
            try {
                return !(!a || !a[$a])
            } catch (b) {
                return false
            }
        }, bb = 0;
        var cb = function(a, b, c, d, e) {
            this.Y = a;
            this.ja = null;
            this.src = b;
            this.type = c;
            this.capture = !!d;
            this.d = e;
            this.key = ++bb;
            this.ca = this.xa = false
        }, db = function(a) {
            a.ca = true;
            a.Y = null;
            a.ja = null;
            a.src = null;
            a.d = null
        };
        var eb = function(a) {
            this.src = a;
            this.I = {};
            this.d = 0
        };
        eb.prototype.add = function(a, b, c, d, e) {
            var f = this.I[a];
            f || (f = this.I[a] = [], this.d++);
            var g = fb(f, b, d, e);
            -1 < g ? (a = f[g], c || (a.xa = false)) : (a = new cb(b, this.src, a, !!d, e), a.xa = c, f.push(a));
            return a
        };
        var gb = function(a, b, c, d, e) {
            a = a.I[b];
            b = -1;
            a && (b = fb(a, c, d, e));
            return -1 < b ? a[b] : null
        }, fb = function(a, b, c, d) {
            for (var e = 0; e < a.length; ++e) {
                var f = a[e];
                if (!f.ca && f.Y == b && f.capture == !!c && f.d == d)
                    return e
            }
            return -1
        };
        var hb = {}, ib = {}, jb = {}, kb = function(a, b, c, d, e) {
            if ('array' == ba(b)) {
                for (var f = 0; f < b.length; f++)
                    kb(a, b[f], c, d, e);
                return null
            }
            c = lb(c);
            if (ab(a))
                a = a.listen(b, c, d, e);
            else {
                if (!b)
                    throw Error('Invalid event type');
                var f = !!d, g = a[m] || (a[m] = ++da), q = ib[g];
                q || (ib[g] = q = new eb(a));
                c = q.add(b, c, false, d, e);
                c.ja || (d = mb(), c.ja = d, d.src = a, d.Y = c, a.addEventListener ? a.addEventListener(b, d, f) : a.attachEvent(b in jb ? jb[b] : jb[b] = 'on' + b, d), hb[c.key] = c);
                a = c
            }
            return a
        }, mb = function() {
            var a = nb, b = Wa ? function(c) {
                return a.call(b.src, b.Y, c)
            } : 
            function(c) {
                c = a.call(b.src, b.Y, c);
                if (!c)
                    return c
            };
            return b
        }, pb = function(a) {
            if ('number' == typeof a || !a || a.ca)
                return false;
            var b = a.src;
            if (ab(b))
                return b.hb(a);
            var c = a.type, d = a.ja;
            b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent && b.detachEvent(c in jb ? jb[c] : jb[c] = 'on' + c, d);
            if (c = ob(b)) {
                var d = a.type, e;
                if (e = d in c.I) {
                    e = c.I[d];
                    var f = sa(e, a), g;
                    if (g = 0 <= f)
                        ra(null != e.length), r.splice.call(e, f, 1);
                    e = g
                }
                e && (db(a), 0 == c.I[d].length && (delete c.I[d], c.d--));
                0 == c.d && (c.src = null, delete ib[b[m] || (b[m] = 
                ++da)])
            } else
                db(a);
            delete hb[a.key];
            return true
        }, rb = function(a, b, c, d) {
            var e = 1;
            if (a = ob(a))
                if (b = a.I[b])
                    for (b = va(b), a = 0; a < b.length; a++) {
                        var f = b[a];
                        f && (f.capture == c && !f.ca) && (e &= false !== qb(f, d))
                    }
            return Boolean(e)
        }, qb = function(a, b) {
            var c = a.Y, d = a.d || a.src;
            a.xa && pb(a);
            return c.call(d, b)
        }, nb = function(a, b) {
            if (a.ca)
                return true;
            if (!Wa) {
                var c;
                if (!(c = b))
                    i: {
                        c = ['window', 'event'];
                        for (var d = k, e; e = c.shift(); )
                            if (null != d[e])
                                d = d[e];
                            else {
                                c = null;
                                break i
                            }
                        c = d
                    }
                e = c;
                c = new Za(e, this);
                d = true;
                if (!(0 > e.keyCode || void 0 != e.returnValue)) {
                    i: {
                        var f = 
                        false;
                        if (0 == e.keyCode)
                            try {
                                e.keyCode = -1;
                                break i
                            } catch (g) {
                                f = true
                            }
                        if (f || void 0 == e.returnValue)
                            e.returnValue = true
                    }
                    e = [];
                    for (f = c.d; f; f = f.parentNode)
                        e.push(f);
                    for (var f = a.type, q = e.length - 1; !c.ua && 0 <= q; q--)
                        c.d = e[q], d &= rb(e[q], f, true, c);
                    for (q = 0; !c.ua && q < e.length; q++)
                        c.d = e[q], d &= rb(e[q], f, false, c)
                }
                return d
            }
            return qb(a, new Za(b, this))
        }, ob = function(a) {
            return a[m] ? ib[a[m] || (a[m] = ++da)] || null : null
        }, sb = '__closure_events_fn_' + (1E9 * Math.random() >>> 0), lb = function(a) {
            ra(a, 'Listener can not be null.');
            if ('function' == ba(a))
                return a;
            ra(a.handleEvent, 'An object listener must have handleEvent method.');
            return a[sb] || (a[sb] = function(b) {
                return a.handleEvent(b)
            })
        };
        var tb = function(a) {
            this.g = a;
            this.i = {}
        };
        n(tb, ja);
        var ub = [];
        tb.prototype.listen = function(a, b, c, d, e) {
            'array' != ba(b) && (ub[0] = b, b = ub);
            for (var f = 0; f < b.length; f++) {
                var g = kb(a, b[f], c || this, d || false, e || this.g || this);
                if (!g)
                    break;
                this.i[g.key] = g
            }
            return this
        };
        tb.prototype.unlisten = function(a, b, c, d, e) {
            if ('array' == ba(b))
                for (var f = 0; f < b.length; f++)
                    this.unlisten(a, b[f], c, d, e);
            else
                e = e || this.g || this, c = lb(c || this), d = !!d, b = ab(a) ? gb(a, b, c, d, e) : a ? (a = ob(a)) ? gb(a, b, c, d, e) : null : null, b && (pb(b), delete this.i[b.key]);
            return this
        };
        tb.prototype.d = function() {
            tb.ra.d.call(this);
            var a = this.i, b;
            for (b in a)
                pb.call(void 0, a[b]);
            this.i = {}
        };
        tb.prototype.handleEvent = function() {
            throw Error('EventHandler.handleEvent not implemented');
        };
        var vb = 'StopIteration' in k ? k.StopIteration : Error('StopIteration'), wb = function() {
        };
        wb.prototype.d = function() {
            throw vb;
        };
        wb.prototype.A = function() {
            return this
        };
        var u = function(a, b) {
            this.a = {};
            this.d = [];
            this.g = this.i = 0;
            var c = arguments.length;
            if (1 < c) {
                if (c % 2)
                    throw Error('Uneven number of arguments');
                for (var d = 0; d < c; d += 2)
                    this.set(arguments[d], arguments[d + 1])
            } else if (a) {
                a instanceof u ? (c = a.R(), d = a.M()) : (c = na(a), d = ma(a));
                for (var e = 0; e < c.length; e++)
                    this.set(c[e], d[e])
            }
        };
        u.prototype.M = function() {
            xb(this);
            for (var a = [], b = 0; b < this.d.length; b++)
                a.push(this.a[this.d[b]]);
            return a
        };
        u.prototype.R = function() {
            xb(this);
            return this.d.concat()
        };
        var xb = function(a) {
            if (a.i != a.d.length) {
                for (var b = 0, c = 0; b < a.d.length; ) {
                    var d = a.d[b];
                    yb(a.a, d) && (a.d[c++] = d);
                    b++
                }
                a.d.length = c
            }
            if (a.i != a.d.length) {
                for (var e = {}, c = b = 0; b < a.d.length; )
                    d = a.d[b], yb(e, d) || (a.d[c++] = d, e[d] = 1), b++;
                a.d.length = c
            }
        }, zb = function(a, b) {
            return yb(a.a, b) ? a.a[b] : void 0
        };
        u.prototype.set = function(a, b) {
            yb(this.a, a) || (this.i++, this.d.push(a), this.g++);
            this.a[a] = b
        };
        u.prototype.X = function() {
            return new u(this)
        };
        u.prototype.A = function(a) {
            xb(this);
            var b = 0, c = this.d, d = this.a, e = this.g, f = this, g = new wb;
            g.d = function() {
                for (; ; ) {
                    if (e != f.g)
                        throw Error('The map has changed since the iterator was created');
                    if (b >= c.length)
                        throw vb;
                    var g = c[b++];
                    return a ? g : d[g]
                }
            };
            return g
        };
        var yb = function(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        };
        var Ab = function(a) {
            if ('function' == typeof a.M)
                return a.M();
            if (l(a))
                return a.split('');
            if (ca(a)) {
                for (var b = [], c = a.length, d = 0; d < c; d++)
                    b.push(a[d]);
                return b
            }
            return ma(a)
        }, Bb = function(a, b, c) {
            if ('function' == typeof a.forEach)
                a.forEach(b, c);
            else if (ca(a) || l(a))
                ta(a, b, c);
            else {
                var d;
                if ('function' == typeof a.R)
                    d = a.R();
                else if ('function' != typeof a.M)
                    if (ca(a) || l(a)) {
                        d = [];
                        for (var e = a.length, f = 0; f < e; f++)
                            d.push(f)
                    } else
                        d = na(a);
                else
                    d = void 0;
                for (var e = Ab(a), f = e.length, g = 0; g < f; g++)
                    b.call(c, e[g], d && d[g], a)
            }
        };
        var Cb = RegExp('^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$'), Eb = function(a) {
            if (Db) {
                Db = false;
                var b = k.location;
                if (b) {
                    var c = b.href;
                    if (c && (c = (c = Eb(c)[3] || null) && decodeURIComponent(c)) && c != b.hostname)
                        throw Db = true, Error();
                }
            }
            return a.match(Cb)
        }, Db = Ga;
        var Fb = function(a, b) {
            var c;
            if (a instanceof Fb)
                this.U = void 0 !== b ? b : a.U, Gb(this, a.Z), this.ma = a.ma, this.ea = a.ea, Hb(this, a.la), this.da = a.da, Ib(this, a.T.X()), this.ka = a.ka;
            else if (a && (c = Eb(String(a)))) {
                this.U = !!b;
                Gb(this, c[1] || '', true);
                this.ma = c[2] ? decodeURIComponent(c[2] || '') : '';
                this.ea = c[3] ? decodeURIComponent(c[3] || '') : '';
                Hb(this, c[4]);
                var d = c[5] || '';
                this.da = d ? decodeURIComponent(d) : '';
                Ib(this, c[6] || '', true);
                this.ka = c[7] ? decodeURIComponent(c[7] || '') : ''
            } else
                this.U = !!b, this.T = new v(null, 0, this.U)
        };
        h = Fb.prototype;
        h.Z = '';
        h.ma = '';
        h.ea = '';
        h.la = null;
        h.da = '';
        h.ka = '';
        h.U = false;
        h.toString = function() {
            var a = [], b = this.Z;
            b && a.push(Jb(b, Kb), ':');
            if (b = this.ea) {
                a.push('//');
                var c = this.ma;
                c && a.push(Jb(c, Kb), '@');
                a.push(encodeURIComponent(String(b)));
                b = this.la;
                null != b && a.push(':', String(b))
            }
            if (b = this.da)
                this.ea && '/' != b.charAt(0) && a.push('/'), a.push(Jb(b, '/' == b.charAt(0) ? Lb : Mb));
            (b = this.T.toString()) && a.push('?', b);
            (b = this.ka) && a.push('#', Jb(b, Nb));
            return a.join('')
        };
        h.X = function() {
            return new Fb(this)
        };
        var Gb = function(a, b, c) {
            a.Z = c ? b ? decodeURIComponent(b) : '' : b;
            a.Z && (a.Z = a.Z.replace(/:$/, ''))
        }, Hb = function(a, b) {
            if (b) {
                b = Number(b);
                if (isNaN(b) || 0 > b)
                    throw Error('Bad port number ' + b);
                a.la = b
            } else
                a.la = null
        }, Ib = function(a, b, c) {
            b instanceof v ? (a.T = b, Ob(a.T, a.U)) : (c || (b = Jb(b, Pb)), a.T = new v(b, 0, a.U))
        }, Jb = function(a, b) {
            return l(a) ? encodeURI(a).replace(b, Qb) : null
        }, Qb = function(a) {
            a = a.charCodeAt(0);
            return '%' + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
        }, Kb = /[#\/\?@]/g, Mb = /[\#\?:]/g, Lb = /[\#\?]/g, Pb = /[\#\?@]/g, Nb = /#/g, 
        v = function(a, b, c) {
            this.a = a || null;
            this.g = !!c
        }, Sb = function(a) {
            if (!a.d && (a.d = new u, a.i = 0, a.a))
                for (var b = a.a.split('&'), c = 0; c < b.length; c++) {
                    var d = b[c].indexOf('='), e = null, f = null;
                    0 <= d ? (e = b[c].substring(0, d), f = b[c].substring(d + 1)) : e = b[c];
                    e = decodeURIComponent(e.replace(/\+/g, ' '));
                    e = Rb(a, e);
                    a.add(e, f ? decodeURIComponent(f.replace(/\+/g, ' ')) : '')
                }
        };
        v.prototype.d = null;
        v.prototype.i = null;
        v.prototype.add = function(a, b) {
            Sb(this);
            this.a = null;
            a = Rb(this, a);
            var c = zb(this.d, a);
            c || this.d.set(a, c = []);
            c.push(b);
            this.i++;
            return this
        };
        var Tb = function(a, b) {
            Sb(a);
            b = Rb(a, b);
            if (yb(a.d.a, b)) {
                a.a = null;
                a.i -= zb(a.d, b).length;
                var c = a.d;
                yb(c.a, b) && (delete c.a[b], c.i--, c.g++, c.d.length > 2 * c.i && xb(c))
            }
        }, Ub = function(a, b) {
            Sb(a);
            b = Rb(a, b);
            return yb(a.d.a, b)
        };
        h = v.prototype;
        h.R = function() {
            Sb(this);
            for (var a = this.d.M(), b = this.d.R(), c = [], d = 0; d < b.length; d++)
                for (var e = a[d], f = 0; f < e.length; f++)
                    c.push(b[d]);
            return c
        };
        h.M = function(a) {
            Sb(this);
            var b = [];
            if (l(a))
                Ub(this, a) && (b = ua(b, zb(this.d, Rb(this, a))));
            else {
                a = this.d.M();
                for (var c = 0; c < a.length; c++)
                    b = ua(b, a[c])
            }
            return b
        };
        h.set = function(a, b) {
            Sb(this);
            this.a = null;
            a = Rb(this, a);
            Ub(this, a) && (this.i -= zb(this.d, a).length);
            this.d.set(a, [b]);
            this.i++;
            return this
        };
        h.toString = function() {
            if (this.a)
                return this.a;
            if (!this.d)
                return '';
            for (var a = [], b = this.d.R(), c = 0; c < b.length; c++)
                for (var d = b[c], e = encodeURIComponent(String(d)), d = this.M(d), f = 0; f < d.length; f++) {
                    var g = e;
                    '' !== d[f] && (g += '=' + encodeURIComponent(String(d[f])));
                    a.push(g)
                }
            return this.a = a.join('&')
        };
        h.X = function() {
            var a = new v;
            a.a = this.a;
            this.d && (a.d = this.d.X(), a.i = this.i);
            return a
        };
        var Rb = function(a, b) {
            var c = String(b);
            a.g && (c = c.toLowerCase());
            return c
        }, Ob = function(a, b) {
            b && !a.g && (Sb(a), a.a = null, Bb(a.d, function(a, b) {
                var e = b.toLowerCase();
                b != e && (Tb(this, b), Tb(this, e), 0 < a.length && (this.a = null, this.d.set(Rb(this, e), va(a)), this.i += a.length))
            }, a));
            a.g = b
        };
        var Vb = 0 <= navigator.userAgent.indexOf('MSIE'), Wb = function(a, b) {
            for (var c = 1; c < arguments.length; c += 2) {
                var d = arguments[c], e = arguments[c + 1], f = a.style;
                f && d in f ? f[d] = e : d in a ? a[d] = e : Vb && (f && 'opacity' == d) && (a.zoom = 1, d = (f.filter || '').replace(/alpha\([^)]*\)/, ''), isNaN(parseFloat(e)) || (d += 'alpha(opacity=' + 100 * e + ')'), f.filter = d)
            }
        }, Xb = ['', 'moz', 'ms', 'o', 'webkit'], Yb = function(a) {
            var b = document;
            if (!b)
                return null;
            for (var c = 0; c < Xb.length; c++) {
                var d = Xb[c], e = a;
                0 < d.length && (e = a.charAt(0).toUpperCase() + a.substr(1));
                d += e;
                if ('undefined' != typeof b[d])
                    return d
            }
            return null
        }, Zb = function() {
            for (var a = ['requestAnimationFrame', 'mozRequestAnimationFrame', 'msRequestAnimationFrame', 'oRequestAnimationFrame', 'webkitRequestAnimationFrame'], b = 0; b < a.length; b++) {
                var c = window[a[b]];
                if (c)
                    return function(a, b, d) {
                        return c(function(b) {
                            // 动画结束后，停止帧刷新，释放CPU
                            return animationPlaying && a.call(d, b)
                        }, b)
                    }
            }
            var d = 0, e = 33, f = 50;
            return function(a, b, c) {
                b && 0 > --f && (1.25 < b / e ? (d = 0, e = Math.min(66, ++e)) : 10 < ++d && (d = 0, e = Math.max(17, --e)));
                window.setTimeout(function(b) {
                    a.call(c, b)
                }, e)
            }
        }, $b = function(a, 
        b, c) {
            $b = Zb();
            return $b(a, b, c)
        };
        var dc = function(a, b, c) {
            this.N = a;
            this.W = b;
            this.V = c;
            this.g = this.i = this.G = false;
            this.J = (new Date).getTime();
            this.H = Yb('hidden');
            if (this.F = (this.k = Yb('visibilityState')) ? this.k.replace(/state$/i, 'change').toLowerCase() : null) {
                a = new tb;
                ka(this, ha(la, a));
                var d = this;
                a.listen(document, this.F, function() {
                    var a = document[d.k];
                    d.G = document[d.H] || 'hidden' == a;
                    d.G ? ac(d) : bc(d)
                })
            }
            cc(this)
        };
        n(dc, ja);
        dc.prototype.d = function() {
            window.clearTimeout(this.A);
            dc.ra.d.call(this)
        };
        var ac = function(a) {
            var b = a.G || a.i;
            a.g && !b ? (a.g = false, a.V(), cc(a)) : !a.g && b && (a.g = true, a.W())
        }, cc = function(a) {
            a.A && window.clearTimeout(a.A);
            var b = Math.max(100, a.N - ((new Date).getTime() - a.J));
            a.A = window.setTimeout(function() {
                a.A = null;
                a.i = (new Date).getTime() - a.J >= a.N;
                a.i || cc(a);
                ac(a)
            }, b)
        }, bc = function(a) {
            a.J = (new Date).getTime();
            a.i = false;
            ac(a)
        };
        var ec = function(a, b) {
            google && google.doodle && (b && (google.doodle.cpDestroy = b), google.doodle.cpInit = function() {
                b && b();
                a()
            })
        }, fc = function(a, b, c) {
            if (google) {
                var d = function() {
                    var a = google.msg && google.msg.unlisten;
                    a && (a(67, d), c && a(94, c));
                    b();
                    return true
                }, e = function() {
                    var a = _uiCanvasWrapper;
                    a && 'hidden' != a.style.visibility && (a = google.msg && google.msg.listen, google.psy && google.psy.q && a && (a(67, d), c && a(94, c)))
                };
                e();
                google.doodle && google.doodle.jesr || (ia(), google.raas && google.raas('doodle', {init: function() {
                        e();
                        google.doodle.jesrd && (a(), google.doodle.jesrd = false)
                    },dispose: function() {
                        d();
                        google.doodle.jesrd = true
                    }}))
            }
        };
        var gc = {Q: [0, 24, 34, 58, 68, 78, 98],Da: 59,v: 102,data: {children: 'ROWBOAT1_FOREARM2 ROWBOAT1_ARM2 ROWBOAT1_HEAD ROWBOAT1_BODY ROWBOAT1_STICK ROWBOAT1_FOREARM1 ROWBOAT1_ARM1 ROWBOAT1_UMBRELLA ROWBOAT1_BOAT ROWBOAT1_PADDLE'.split(' '),name: 'ROWBOAT1_ROOT1',v: 7,C: {y: -66,x: -62},D: {ROWBOAT1_HEAD: {children: [],C: {y: -3,x: -7},o: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],D: {},s: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],y: [-48, -60, -55, -48, -50, -61, -61],rotation: [-51, 0, -10, -51, 50, 0, 0],name: 'ROWBOAT1_HEAD',v: 7,x: [-35, -17, -13, -35, 
                            -11, -30, -30]},ROWBOAT1_ARM1: {children: [],C: {y: 0,x: 0},o: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],D: {},s: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],y: [-36, -38, -37, -36, -30, -41, -41],rotation: [-48, -55, -39, -48, -42, -29, -29],name: 'ROWBOAT1_ARM1',v: 7,x: [-24, -19, -14, -24, -29, -31, -31]},ROWBOAT1_BODY: {children: [],C: {y: 0,x: 0},o: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],D: {},s: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],y: [-42, -50, -50, -42, -42, -49, -49],rotation: [-22, 6, 20, -22, 8, 0, 0],name: 'ROWBOAT1_BODY',v: 7,x: [-32, -23, -17, -32, -30, -36, 
                            -36]},ROWBOAT1_FOREARM1: {children: [],C: {y: -31,x: -4},o: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],D: {},s: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],y: [-27, -26, -23, -27, -10, -29, -29],rotation: [-96, -76, -89, -96, -64, -100, -100],name: 'ROWBOAT1_FOREARM1',v: 7,x: [10, 15, 18, 10, 1, -1, -1]},ROWBOAT1_PADDLE: {children: [],C: {y: -15,x: -2},o: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],D: {},s: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],y: [-22, -22, -22, -22, -22, -22, -22],rotation: [-39, -4, 43, -39, -23, -23, -23],name: 'ROWBOAT1_PADDLE',v: 7,x: [16, 16, 16, 16, 16, 
                            16, 16]},ROWBOAT1_FOREARM2: {children: [],C: {y: -31,x: -4},o: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],D: {},s: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],y: [-27, -27, -26, -27, -13, -36, -44],rotation: [-86, -84, -88, -86, -65, -118, -140],name: 'ROWBOAT1_FOREARM2',v: 7,x: [14, 15, 21, 14, 5, -1, -1]},ROWBOAT1_STICK: {children: [],C: {y: -55,x: 0},o: [1, 1, 1, 1, 1, 1, 1],D: {},s: [1, 1, 1, 1, 1, 1, 1],y: [-13, -13, -13, -13, -13, -29, -29],rotation: [90, 90, 91, 90, 90, 0, 0],name: 'ROWBOAT1_STICK',v: 7,x: [5, 5, 5, 5, 5, 1, 1]},ROWBOAT1_BOAT: {children: [],C: {y: 0,x: 0},o: [0.64, 
                            0.64, 0.64, 0.64, 0.64, 0.64, 0.64],D: {},s: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],y: [-22, -22, -22, -22, -22, -22, -22],rotation: [0, 0, 0, 0, 0, 0, 0],name: 'ROWBOAT1_BOAT',v: 7,x: [-62, -62, -62, -62, -62, -62, -62]},ROWBOAT1_ARM2: {children: [],C: {y: 0,x: 0},o: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],D: {},s: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],y: [-37, -39, -37, -37, -29, -40, -38],rotation: [-50, -50, -50, -50, -57, -44, -66],name: 'ROWBOAT1_ARM2',v: 7,x: [-22, -19, -13, -22, -29, -31, -31]},ROWBOAT1_UMBRELLA: {children: [],C: {y: -37,x: -35},o: [0.07, 0.07, 
                            0.07, 0.07, 0.07, 0.07, 1.27],D: {},s: [2.01, 2.01, 2.01, 2.01, 2.01, 2.01, 1.28],y: [-13, -13, -13, -13, -13, -15, -55],rotation: [90, 90, 90, 90, 90, 0, 0],name: 'ROWBOAT1_UMBRELLA',v: 7,x: [-9, -9, -9, -9, -9, 1, 1]}}}}, hc = {Q: [0, 24, 34, 58, 68, 78, 98],Da: 59,v: 102,data: {D: {ROWBOAT2_PADDLE: {D: {},children: [],C: {y: -15,x: -2},o: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],s: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],y: [-22, -23, -22, -22, -22, -22, -22],rotation: [-38, -40, 43, -38, -38, -38, -38],name: 'ROWBOAT2_PADDLE',v: 7,x: [16, 16, 16, 16, 16, 16, 16]},ROWBOAT2_FOREARM2: {D: {},
                        children: [],C: {y: -31,x: -4},o: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],s: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],y: [-27, -27, -26, -27, -37, -33, -18],rotation: [-83, -84, -87, -83, -119, -104, -54],name: 'ROWBOAT2_FOREARM2',v: 7,x: [13, 14, 21, 13, 12, 13, 2]},ROWBOAT2_FOREARM1: {D: {},children: [],C: {y: -31,x: -4},o: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],s: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],y: [-27, -26, -23, -27, -45, -38, -13],rotation: [-73, -75, -85, -73, -144, -116, -40],name: 'ROWBOAT2_FOREARM1',v: 7,x: [13, 14, 19, 13, 7, 12, -7]},ROWBOAT2_BODY: {D: {},
                        children: [],C: {y: 0,x: 0},o: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],s: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],y: [-49, -47, -51, -49, -49, -49, -49],rotation: [0, -10, 24, 0, 0, 0, 0],name: 'ROWBOAT2_BODY',v: 7,x: [-25, -29, -15, -25, -25, -25, -36]},ROWBOAT2_ARM2: {D: {},children: [],C: {y: 0,x: 0},o: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],s: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],y: [-40, -39, -37, -40, -40, -40, -42],rotation: [-50, -50, -50, -50, -50, -50, -36],name: 'ROWBOAT2_ARM2',v: 7,x: [-21, -20, -13, -21, -21, -21, -27]},ROWBOAT2_HEAD: {D: {},children: [],
                        C: {y: -3,x: -7},o: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],s: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],y: [-61, -56, -58, -61, -55, -52, -59],rotation: [0, -31, 0, 0, -37, -58, -12],name: 'ROWBOAT2_HEAD',v: 7,x: [-20, -30, -9, -20, -25, -27, -32]},ROWBOAT2_BOAT: {D: {},children: [],C: {y: 0,x: 0},o: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],s: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],y: [-22, -22, -22, -22, -22, -22, -22],rotation: [0, 0, 0, 0, 0, 0, 0],name: 'ROWBOAT2_BOAT',v: 7,x: [-62, -62, -62, -62, -62, -62, -62]},ROWBOAT2_ARM1: {D: {},children: [],C: {y: 0,x: 0},o: [0.64, 
                            0.64, 0.64, 0.64, 0.64, 0.64, 0.64],s: [0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64],y: [-39, -39, -37, -39, -39, -39, -41],rotation: [-59, -57, -41, -59, -59, -59, -29],name: 'ROWBOAT2_ARM1',v: 7,x: [-21, -20, -13, -21, -21, -21, -31]}},children: 'ROWBOAT2_FOREARM2 ROWBOAT2_ARM2 ROWBOAT2_HEAD ROWBOAT2_BODY ROWBOAT2_FOREARM1 ROWBOAT2_ARM1 ROWBOAT2_BOAT ROWBOAT2_PADDLE'.split(' '),name: 'ROWBOAT2_ROOT1',v: 7,C: {y: -63,x: -62}}};
        var w = function(a, b) {
            this.x = void 0 !== a ? a : 0;
            this.y = void 0 !== b ? b : 0
        };
        w.prototype.X = function() {
            return new w(this.x, this.y)
        };
        w.prototype.toString = function() {
            return '(' + this.x + ', ' + this.y + ')'
        };
        w.prototype.ceil = function() {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            return this
        };
        w.prototype.floor = function() {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            return this
        };
        var y = function(a, b, c, d, e, f) {
            this.d = null != a ? a : 1;
            this.i = null != b ? b : 0;
            this.c = null != c ? c : 0;
            this.a = null != d ? d : 1;
            this.g = null != e ? e : 0;
            this.A = null != f ? f : 0
        }, ic = function(a, b) {
            return new w(a.d * b.x + a.c * b.y + a.g, a.i * b.x + a.a * b.y + a.A)
        }, jc = function(a, b) {
            return new y(a.d * b.d + a.c * b.i, a.i * b.d + a.a * b.i, a.d * b.c + a.c * b.a, a.i * b.c + a.a * b.a, a.d * b.g + a.c * b.A + a.g, a.i * b.g + a.a * b.A + a.A)
        };
        var kc = function(a) {
            this.value = a;
            this.K = true
        }, z = function(a) {
            null == a && (a = {});
            this.I = [];
            null != a.name && (this.name = a.name);
            lc.push(this)
        }, lc = [];
        z.prototype.B = function(a) {
            this.I.push(a);
            return a
        };
        var A = function(a, b) {
            for (var c, d = new kc(b), e = 0; e < a.I.length && (c = a.I[e], c.call(void 0, d), !d.K); e++)
                ;
        };
        var mc = function() {
            this.g = assetsPath + 'debussy.png';
            this.a = false;
            this.i = [];
            this.d = new Image
        }, nc = function(a) {
            if (!a.d.src) {
                var b = function() {
                    if (!a.a) {
                        a.a = true;
                        for (var b = 0, d; d = a.i[b]; b++)
                            d()
                    }
                };
                a.d.onload = b;
                a.d.src = a.g;
                (a.d.complete || 'complete' == a.d.readyState) && b()
            }
        }, oc = function(a, b) {
            a.a ? b() : a.i.push(b)
        };
        var pc = function(a) {
            a = C.a[a];
            return {width: a[2],height: a[3]}
        }, qc = function(a, b) {
            b && oc(a.d, b);
            nc(a.d)
        }, D = function(a, b, c, d, e) {
            if (a.i) {
                var f = a.a[b], g = f[2], q = f[3];
                c.drawImage(a.d.d, f[0], f[1], g, q, d - 0, e - 0, 1 * g, 1 * q)
            } else
                qc(a, function() {
                    D(a, b, c, d, e)
                })
        };
        var rc = [[0, 418, 166, 970], [169, 509, 116, 123], [323, 8, 68, 76], [459, 8, 57, 62], [468, 1176, 40, 51], [184, 22, 8, 17], [380, 740, 12, 5], [382, 235, 48, 7], [305, 952, 13, 221], [323, 447, 13, 221], [416, 325, 48, 7], [440, 8, 16, 16], [321, 952, 67, 27], [351, 275, 67, 27], [13, 325, 400, 90], [246, 686, 250, 51], [244, 1176, 160, 33], [323, 418, 89, 26], [224, 809, 40, 40], [351, 245, 66, 27], [208, 993, 71, 21], [382, 172, 64, 16], [439, 455, 64, 38], [224, 765, 36, 41], [347, 87, 48, 24], [380, 801, 43, 43], [210, 16, 97, 66], [169, 852, 354, 56], [169, 740, 39, 55], [288, 418, 32, 45], [446, 1176, 19, 21], 
            [222, 686, 21, 20], [415, 418, 21, 20], [467, 172, 28, 57], [399, 87, 28, 57], [321, 1040, 63, 63], [208, 1176, 33, 89], [382, 191, 44, 41], [282, 952, 20, 44], [439, 418, 15, 19], [200, 911, 5, 21], [184, 8, 23, 11], [224, 740, 25, 22], [169, 418, 6, 3], [182, 686, 25, 22], [208, 952, 12, 38], [208, 911, 12, 38], [66, 245, 282, 68], [407, 1176, 36, 93], [169, 952, 10, 41], [169, 686, 10, 41], [347, 114, 49, 33], [430, 8, 7, 143], [511, 1176, 2, 62], [380, 748, 73, 24], [169, 911, 12, 38], [429, 191, 12, 38], [97, 172, 282, 68], [208, 1017, 36, 93], [211, 740, 10, 41], [0, 325, 10, 41], [210, 87, 49, 33], [506, 440, 7, 143], 
            [66, 172, 28, 28], [208, 1272, 135, 65], [331, 998, 45, 39], [267, 740, 110, 5], [113, 0, 110, 5], [331, 982, 110, 5], [331, 990, 110, 5], [0, 130, 110, 5], [0, 0, 110, 5], [210, 8, 110, 5], [0, 23, 181, 104], [380, 775, 23, 23], [169, 1340, 45, 8], [0, 172, 63, 150], [262, 87, 82, 82], [169, 424, 82, 82], [210, 686, 9, 12], [0, 8, 9, 12], [439, 440, 13, 12], [184, 911, 13, 12], [323, 671, 7, 12], [321, 982, 7, 12]];
        var sc = {LOGO_REVEAL_SPRITE: 0,BALLOON1: 1,BALLOON2: 2,BALLOON3: 3,BIKE_BASE: 4,BIKE_LEG: 5,BIKE_THIGH: 6,BORDER_BOTTOM: 7,BORDER_LEFT: 8,BORDER_RIGHT: 9,BORDER_TOP: 10,CAR_WHEEL: 11,CAR1: 12,CAR2: 13,CLOUD0: 14,CLOUD1: 15,CLOUD2: 16,COMET_BASE: 17,COMET_SPARKLE: 18,DOOR_1: 19,DOOR_2: 20,DOOR_3: 21,DOOR_4: 22,DOOR_5: 23,DOOR_6: 24,DOOR_7: 25,FLYINGMACHINE: 26,HILL: 27,HOTAIR1: 28,HOTAIR2: 29,ICON_SEARCH: 30,ICON_SOUND_OFF: 31,ICON_SOUND_ON: 32,LAMP_OFF: 33,LAMP_ON: 34,MOON: 35,PIPE_SMOKE: 36,PLAY: 37,RAIN: 38,ROOF_2: 39,ROOF_3: 40,ROOF_5: 41,
            ROOF_LEFT_1: 42,ROOF_PATTERN: 43,ROOF_RIGHT_1: 44,ROWBOAT1_ARM1: 45,ROWBOAT1_ARM2: 46,ROWBOAT1_BOAT: 47,ROWBOAT1_BODY: 48,ROWBOAT1_FOREARM1: 49,ROWBOAT1_FOREARM2: 50,ROWBOAT1_HEAD: 51,ROWBOAT1_PADDLE: 52,ROWBOAT1_STICK: 53,ROWBOAT1_UMBRELLA: 54,ROWBOAT2_ARM1: 55,ROWBOAT2_ARM2: 56,ROWBOAT2_BOAT: 57,ROWBOAT2_BODY: 58,ROWBOAT2_FOREARM1: 59,ROWBOAT2_FOREARM2: 60,ROWBOAT2_HEAD: 61,ROWBOAT2_PADDLE: 62,SPINNER: 63,STEAMBOAT_LIGHTS: 64,STEAMBOAT_SMOKE: 65,STEAMBOAT_WINDOWS1: 66,STEAMBOAT_WINDOWS2: 67,STEAMBOAT_WINDOWS3: 68,STEAMBOAT_WINDOWS4: 69,
            STEAMBOAT_WINDOWS5: 70,STEAMBOAT_WINDOWS6: 71,STEAMBOAT_WINDOWS7: 72,STEAMBOAT: 73,TWINKLE: 74,WAVE: 75,WINDMILL_BASE: 76,WINDMILL_FAN_OFF: 77,WINDMILL_FAN_ON: 78,WINDOW_A_OFF: 79,WINDOW_A_ON: 80,WINDOW_B_OFF: 81,WINDOW_B_ON: 82,WINDOW_C_OFF: 83,WINDOW_C_ON: 84};
        var tc = function(a, b, c) {
            this.type = a;
            this.x = b;
            this.y = c
        }, wc = function(a, b, c) {
            a = new tc(a, b, c);
            for (var d in uc)
                b = uc[d], vc(b, a.x, a.y) && ('DOWN' == a.type ? A(b.Ga) : 'UP' == a.type && A(b.Ha), b.ta && ('DOWN' == b.ta.type && 'UP' == a.type) && A(b.aa), b.ta = a)
        }, uc = {}, xc = function(a, b) {
            this.x = a;
            this.y = b
        }, yc = {};
        var C = new function() {
            this.a = rc;
            this.d = new mc;
            this.i = false;
            var a = this;
            oc(this.d, function() {
                a.i = true
            })
        }, E = null, zc = function() {
            if (null == E) {
                E = document.createElement('audio');
                E.setAttribute('preload', 'auto');
                var a = document.createElement('source'), b = document.createElement('source');
                a.setAttribute('src', assetsPath + 'clair-de-lune.mp2');
                a.setAttribute('type', 'audio/mpeg');
                b.setAttribute('src', assetsPath + 'clair-de-lune.ogg');
                b.setAttribute('type', 'audio/ogg');
                E.appendChild(a);
                E.appendChild(b)
            }
            return E
        }, 
        Bc = function(a) {
            var b = F, c = rc[a], c = Ac(c[2], c[3]), d = c.getContext('2d');
            D(C, a, d, 0, 0);
            return b.createPattern(c, 'repeat')
        }, Ac = function(a, b) {
            var c = document.createElement('canvas');
            c.width = a;
            c.height = b;
            return c
        }, G = function(a, b, c, d) {
            a = rc[a];
            var e = a[2], f = a[3];
            b.drawImage(C.d.d, a[0], a[1], e, f, c - parseInt(e / 2, 10), d - parseInt(f / 2, 10), e, f)
        }, H = function(a, b, c, d, e, f) {
            a = rc[a];
            var g = a[2], q = a[3];
            b.drawImage(C.d.d, a[0], a[1], g, q, c, d, e || g, f || q)
        };
        var I = function() {
            this.A = Cc++;
            this.y = this.x = 0;
            this.parent = null;
            this.visible = true;
            this.s = this.o = 1;
            this.children = [];
            this.opacity = 1;
            this.name = '';
            this.W = null;
            this.height = this.width = 0;
            this.Ha = this.Ga = this.aa = this.Fa = this.$ = this.ga = this.ta = null;
            this.i = {x: 0,y: 0,width: 0,height: 0};
            this.rotation = {x: 0,y: 0,z: 0};
            this.Aa = {x: 0,y: 0,z: 0};
            this.V = new y(1, 0, 0, 1, 0, 0)
        }, Cc = 0, Dc = function(a, b, c, d, e) {
            a.i.x = null == b ? a.i.x : b;
            a.i.y = null == c ? a.i.y : c;
            a.i.width = null == d ? a.i.width : d;
            a.i.height = null == e ? a.i.height : e
        }, Ec = function(a) {
            a.aa = 
            new z({name: 'tap'});
            a.Ga = new z({name: 'touchbegin'});
            a.Ha = new z({name: 'touchend'});
            uc[a.A] = a
        }, Fc = function(a) {
            a.Fa = new z({name: 'hover'});
            a.ga = new z({name: 'hoverbegin'});
            a.$ = new z({name: 'hoverend'});
            yc[a.A] = a
        }, Gc = function(a, b, c) {
            a.W = document.createElement('canvas');
            a.W.width = a.width = b;
            a.W.height = a.height = c;
            b = a.W.getContext('2d');
            a.d(b)
        }, vc = function(a, b, c) {
            if (a.visible) {
                var d = Hc(a), e = ic(d, new w(a.i.x, a.i.y));
                a = ic(d, new w(a.i.x + a.i.width, a.i.y + a.i.height));
                if (e.x <= b && a.x >= b && e.y <= c && a.y >= c)
                    return true
            }
            return false
        }, 
        Ic = function(a, b) {
            var c, d, e, f, g, q;
            d = 0;
            g = a.children;
            q = [];
            e = 0;
            for (f = g.length; e < f; e++) {
                c = g[e];
                if (b === c) {
                    c.parent = null;
                    a.children.splice(d, 1);
                    break
                }
                q.push(d++)
            }
        }, J = function(a, b) {
            b && (b.parent = a, a.children.push(b))
        };
        I.prototype.d = function() {
        };
        var Kc = function(a, b) {
            if (a.visible && 0 != a.opacity) {
                b.save();
                var c = new y(1, 0, 0, 1, 0, 0), c = jc(c, new y(1, 0, 0, 1, a.x, a.y)), d = a.rotation.z * Math.PI / 180, e = new w(a.Aa.x, a.Aa.y), d = new y(Math.cos(d), Math.sin(d), -Math.sin(d), Math.cos(d), 0, 0);
                e && (d = jc(jc(new y(1, 0, 0, 1, e.x, e.y), d), new y(1, 0, 0, 1, -e.x, -e.y)));
                c = jc(c, d);
                c = jc(c, new y(a.o, 0, 0, a.s, 0, 0));
                a.V = c;
                b.transform(c.d, c.i, c.c, c.a, c.g, c.A);
                b.globalAlpha = Jc(a);
                a.d(b);
                for (c = 0; c < a.children.length; c++)
                    Kc(a.children[c], b);
                a.Ba && a.Ba(b);
                b.restore()
            }
        }, Jc = function(a) {
            return a.parent ? 
            Jc(a.parent) * a.opacity : a.opacity
        }, Hc = function(a) {
            if (a.V)
                return a.parent ? jc(Hc(a.parent), a.V) : a.V
        }, Lc = function(a, b) {
            this.k = 0;
            I.call(this);
            this.w = a;
            this.g = 0;
            this.H = a.Q[a.Q.length - 1];
            if (b.children && b.children.length) {
                var c, d = b.children.length, e, f;
                for (c = 0; c < d; c++)
                    e = b.D[b.children[c]], f = new Lc(this.w, e), f.v = e.v, f.a = sc[e.name], f.C = e.C, f.F = e, J(this, f)
            }
        };
        n(Lc, I);
        Lc.prototype.d = function(a) {
            if (this.a) {
                this.ia || 0 != this.g || (this.k = 0);
                this.g > this.w.Q[this.k + 1] && this.k++;
                var b = this.w.Q[this.k], c = this.w.Q[this.k + 1];
                this.O = (this.g - b) / (c - b) + this.k;
                this.k >= this.w.Q.length && (this.k = 0);
                this.ia && this.g >= this.H || (this.g += K / 40, !this.ia && this.g >= this.w.Da ? this.g = 0 : this.ia && this.g >= this.H + 1 && (this.g = this.H));
                this.g >= this.H && (this.g = c);
                var b = Math.floor(this.O), c = Math.ceil(this.O), d = this.O - b, e = function(a) {
                    return (a[c] - a[b]) * d + a[b]
                };
                this.x = e(this.F.x);
                this.y = e(this.F.y);
                this.o = 
                e(this.F.o);
                this.s = e(this.F.s);
                this.rotation.z = e(this.F.rotation);
                H(this.a, a, this.C.x, this.C.y)
            }
        };
        var Mc = {parsed: false,199: [[1, 63, 0], [1, 60, 0], [1, 63, 1], [1, 61, 1], [1, 58, 1], [1, 68, 0]],1257: [[1, 49, 1]],1145: [[1, 75, 0], [1, 63, 0], [1, 66, 0], [1, 68, 0], [1, 73, 0]],0: [[1, 68, 1], [1, 65, 1]],346: [[1, 56, 1], [1, 53, 1]],341: [[1, 37, 1]],343: [[1, 44, 0]],348: [[1, 60, 0]],1260: [[1, 75, 1], [1, 68, 1], [1, 56, 1]],718: [[1, 82, 0]],717: [[1, 46, 1], [1, 39, 1]],1267: [[1, 68, 0], [1, 61, 0]],713: [[1, 78, 0], [1, 61, 0]],712: [[1, 66, 0]],1069: [[1, 77, 1]],1068: [[1, 73, 1]],1061: [[1, 66, 0], [1, 70, 0]],1060: [[1, 63, 0]],1065: [[1, 75, 0], [1, 65, 1], [1, 82, 0], [1, 87, 0]],1066: [[1, 68, 
                    1]],913: [[1, 34, 0], [1, 46, 0]],296: [[1, 61, 1], [1, 65, 0]],295: [[1, 61, 0]],292: [[1, 54, 0]],290: [[1, 63, 0], [1, 58, 0], [1, 58, 1], [1, 56, 1]],291: [[1, 53, 1]],1128: [[1, 85, 1]],1086: [[1, 73, 0]],1085: [[1, 65, 0], [1, 68, 0]],592: [[1, 63, 0], [1, 77, 0]],595: [[1, 73, 1], [1, 61, 1]],198: [[1, 66, 0]],596: [[1, 70, 0]],1120: [[1, 68, 1]],194: [[1, 68, 1], [1, 75, 0]],1122: [[1, 73, 1]],1124: [[1, 92, 0], [1, 75, 1]],190: [[1, 68, 0], [1, 70, 1]],1126: [[1, 80, 0], [1, 80, 1]],1127: [[1, 85, 0]],273: [[1, 65, 1]],274: [[1, 56, 0], [1, 58, 0]],277: [[1, 63, 1], [1, 58, 1]],278: [[1, 54, 1]],527: [[1, 
                    75, 0]],520: [[1, 54, 0], [1, 61, 0], [1, 58, 0]],521: [[1, 49, 0]],1016: [[1, 51, 1], [1, 39, 1]],1017: [[1, 82, 0], [1, 70, 0]],1010: [[1, 85, 0], [1, 70, 0], [1, 80, 0], [1, 82, 0], [1, 73, 0], [1, 82, 1], [1, 58, 1], [1, 70, 1]],529: [[1, 44, 0]],1234: [[1, 56, 0], [1, 41, 0]],1235: [[1, 56, 1]],1236: [[1, 61, 0], [1, 60, 1]],1230: [[1, 41, 1]],1231: [[1, 44, 0], [1, 48, 1]],1232: [[1, 49, 0], [1, 53, 0]],1233: [[1, 53, 1]],1239: [[1, 48, 0]],108: [[1, 73, 0]],102: [[1, 72, 0]],101: [[1, 75, 0]],104: [[1, 77, 1]],906: [[1, 78, 1], [1, 73, 1], [1, 54, 1], [1, 66, 1]],907: [[1, 61, 1], [1, 58, 1]],1241: [[1, 56, 
                    0]],1240: [[1, 44, 1], [1, 71, 1], [1, 68, 1], [1, 53, 0]],1242: [[1, 52, 1]],645: [[1, 75, 1], [1, 63, 1], [1, 66, 0], [1, 82, 1], [1, 70, 0], [1, 77, 0], [1, 85, 0]],644: [[1, 65, 0], [1, 89, 0], [1, 87, 1]],438: [[1, 75, 0], [1, 61, 0]],439: [[1, 80, 1], [1, 61, 1], [1, 73, 1], [1, 65, 1], [1, 68, 0]],649: [[1, 39, 0], [1, 51, 0]],437: [[1, 53, 0], [1, 56, 0], [1, 63, 0]],433: [[1, 75, 1], [1, 63, 1]],431: [[1, 73, 0]],330: [[1, 44, 1]],333: [[1, 54, 0]],332: [[1, 51, 0]],854: [[1, 78, 0], [1, 66, 0]],345: [[1, 56, 0], [1, 37, 0]],858: [[1, 66, 1], [1, 63, 1], [1, 60, 1], [1, 54, 1], [1, 75, 1]],859: [[1, 78, 1], [1, 72, 1], 
                [1, 33, 0]],6: [[1, 77, 1]],844: [[1, 54, 0]],93: [[1, 70, 0], [1, 73, 0]],92: [[1, 75, 1], [1, 72, 1]],96: [[1, 73, 1], [1, 70, 1]],742: [[1, 65, 0], [1, 89, 0]],743: [[1, 77, 0], [1, 75, 1], [1, 70, 0], [1, 90, 1], [1, 66, 0], [1, 78, 1], [1, 66, 1], [1, 82, 1], [1, 70, 1]],744: [[1, 85, 0], [1, 46, 0], [1, 39, 0]],747: [[1, 75, 0]],748: [[1, 66, 0], [1, 70, 0], [1, 89, 1], [1, 90, 0], [1, 78, 0], [1, 82, 0], [1, 85, 1], [1, 77, 1], [1, 70, 1], [1, 66, 1], [1, 65, 1]],557: [[1, 60, 0], [1, 61, 0]],551: [[1, 80, 0], [1, 68, 0]],1315: [[1, 58, 0], [1, 60, 1]],553: [[1, 77, 1], [1, 65, 1]],552: [[1, 65, 0]],1314: [[1, 51, 0], [1, 
                    54, 0]],1313: [[1, 58, 1], [1, 44, 0]],1050: [[1, 78, 1], [1, 58, 1], [1, 68, 0], [1, 66, 1], [1, 84, 0], [1, 72, 0], [1, 63, 0], [1, 80, 0]],1198: [[1, 48, 1], [1, 49, 0]],1054: [[1, 58, 0], [1, 85, 1], [1, 73, 1], [1, 61, 1], [1, 70, 0]],1055: [[1, 70, 1], [1, 78, 0], [1, 66, 0], [1, 82, 0]],1058: [[1, 61, 0]],1059: [[1, 73, 0], [1, 70, 0], [1, 85, 0], [1, 87, 1], [1, 63, 1], [1, 82, 1], [1, 75, 1], [1, 70, 1], [1, 66, 1]],1193: [[1, 56, 1]],1310: [[1, 46, 0], [1, 51, 1]],1195: [[1, 61, 1]],1196: [[1, 41, 1]],1278: [[1, 49, 0], [1, 49, 1], [1, 65, 0]],1199: [[1, 44, 0], [1, 53, 0]],144: [[1, 70, 0], [1, 73, 0]],140: [[1, 68, 
                    1], [1, 72, 1]],1270: [[1, 53, 1]],1271: [[1, 56, 0]],1272: [[1, 73, 1], [1, 65, 1], [1, 56, 1]],611: [[1, 73, 0]],1275: [[1, 49, 1]],1276: [[1, 44, 1]],1178: [[1, 68, 0]],912: [[1, 80, 1], [1, 68, 1]],1285: [[1, 55, 1], [1, 79, 0], [1, 75, 0]],1284: [[1, 73, 1]],1287: [[1, 39, 0], [1, 63, 1]],1286: [[1, 73, 0], [1, 73, 1], [1, 70, 1], [1, 58, 1]],1281: [[1, 79, 1], [1, 75, 1], [1, 39, 1]],1283: [[1, 49, 0], [1, 44, 0], [1, 51, 1], [1, 77, 1]],949: [[1, 48, 0], [1, 36, 0], [1, 54, 0], [1, 54, 1], [1, 72, 0], [1, 66, 0], [1, 63, 0], [1, 75, 0], [1, 60, 0], [1, 75, 1], [1, 72, 1], [1, 66, 1], [1, 63, 1], [1, 60, 1]],945: [[1, 
                    78, 0], [1, 54, 0], [1, 72, 0], [1, 72, 1], [1, 66, 0], [1, 78, 1], [1, 66, 1], [1, 54, 1], [1, 63, 0], [1, 63, 1], [1, 75, 0], [1, 75, 1], [1, 60, 0], [1, 60, 1]],1289: [[1, 70, 0], [1, 73, 0], [1, 51, 0], [1, 73, 1], [1, 67, 1], [1, 70, 1]],1288: [[1, 77, 0], [1, 46, 0]],940: [[1, 78, 1], [1, 66, 1], [1, 63, 1], [1, 54, 1], [1, 75, 1], [1, 60, 1], [1, 72, 1]],1191: [[1, 53, 1]],1190: [[1, 80, 0]],684: [[1, 70, 0], [1, 84, 0], [1, 72, 0], [1, 78, 0], [1, 82, 0], [1, 82, 1], [1, 78, 1], [1, 70, 1], [1, 66, 0], [1, 84, 1], [1, 60, 1], [1, 72, 1]],683: [[1, 60, 0]],1304: [[1, 61, 0], [1, 51, 1]],1227: [[1, 56, 1]],1306: [[1, 51, 0], [1, 46, 
                    1]],1307: [[1, 54, 0], [1, 58, 0]],1300: [[1, 46, 1], [1, 65, 0]],1301: [[1, 51, 1]],1303: [[1, 58, 1], [1, 54, 1], [1, 51, 0], [1, 46, 0], [1, 39, 0]],1308: [[1, 70, 1], [1, 44, 1]],1225: [[1, 53, 1]],132: [[1, 72, 1], [1, 68, 1]],130: [[1, 70, 0]],135: [[1, 73, 1], [1, 70, 1]],494: [[1, 75, 1]],1223: [[1, 37, 0]],139: [[1, 72, 0], [1, 68, 0]],1222: [[1, 44, 1]],26: [[1, 77, 0], [1, 73, 1], [1, 77, 1]],939: [[1, 78, 0], [1, 66, 0]],404: [[1, 77, 0]],403: [[1, 75, 1]],930: [[1, 54, 0]],409: [[1, 58, 0]],408: [[1, 61, 0]],828: [[1, 56, 0]],371: [[1, 73, 1], [1, 77, 1], [1, 68, 0]],824: [[1, 78, 0]],827: [[1, 54, 
                    0], [1, 60, 1]],826: [[1, 32, 0], [1, 44, 0], [1, 80, 1], [1, 56, 1], [1, 75, 1], [1, 68, 1], [1, 63, 1]],821: [[1, 78, 0], [1, 82, 0], [1, 66, 1], [1, 78, 1], [1, 54, 1]],823: [[1, 70, 0], [1, 66, 0]],1279: [[1, 44, 0], [1, 44, 1], [1, 53, 0]],700: [[1, 85, 0], [1, 70, 0], [1, 82, 0], [1, 73, 0], [1, 66, 0], [1, 61, 0]],701: [[1, 82, 1], [1, 70, 1], [1, 66, 1], [1, 58, 1], [1, 78, 1], [1, 61, 1]],393: [[1, 54, 1]],392: [[1, 49, 1], [1, 66, 1], [1, 75, 1], [1, 61, 1], [1, 70, 1], [1, 58, 1]],88: [[1, 70, 1], [1, 73, 1]],397: [[1, 77, 1], [1, 75, 0]],82: [[1, 66, 0], [1, 72, 0]],83: [[1, 75, 0]],81: [[1, 69, 0]],84: [[1, 68, 1], [1, 65, 
                    1]],794: [[1, 61, 0]],790: [[1, 87, 0]],799: [[1, 82, 0], [1, 70, 0], [1, 66, 0], [1, 70, 1], [1, 82, 1], [1, 58, 1], [1, 66, 1], [1, 78, 1]],1273: [[1, 61, 0], [1, 53, 0], [1, 53, 1]],582: [[1, 77, 1], [1, 75, 0]],580: [[1, 77, 0]],581: [[1, 46, 0]],1131: [[1, 92, 1]],588: [[1, 75, 1]],247: [[1, 57, 0]],246: [[1, 60, 0]],1277: [[1, 73, 0], [1, 56, 0], [1, 77, 1], [1, 73, 1]],248: [[1, 61, 1], [1, 58, 1], [1, 56, 1]],518: [[1, 44, 1]],1008: [[1, 61, 0]],1006: [[1, 87, 0], [1, 75, 0], [1, 63, 0]],1005: [[1, 85, 1], [1, 73, 1], [1, 70, 1], [1, 61, 1], [1, 82, 1], [1, 80, 1], [1, 66, 1]],1001: [[1, 63, 1], [1, 80, 0]],1E3: [[1, 
                    68, 0], [1, 56, 0], [1, 87, 1], [1, 75, 1]],458: [[1, 56, 0]],621: [[1, 51, 1], [1, 39, 1]],1224: [[1, 49, 1]],627: [[1, 53, 0], [1, 70, 0], [1, 75, 0]],626: [[1, 61, 0], [1, 65, 0], [1, 58, 0]],1221: [[1, 65, 1], [1, 37, 1], [1, 68, 0]],451: [[1, 80, 0], [1, 73, 0]],452: [[1, 61, 0]],453: [[1, 65, 0], [1, 73, 1], [1, 61, 1], [1, 77, 1], [1, 65, 1], [1, 56, 1]],1229: [[1, 61, 1], [1, 65, 0]],178: [[1, 70, 0]],1083: [[1, 77, 0]],175: [[1, 75, 1]],171: [[1, 72, 0]],170: [[1, 70, 1]],977: [[1, 63, 0]],979: [[1, 54, 0]],978: [[1, 60, 0]],657: [[1, 63, 0]],180: [[1, 70, 1]],652: [[1, 87, 1], [1, 63, 1], [1, 75, 1], [1, 70, 
                    1], [1, 66, 1], [1, 82, 1]],184: [[1, 66, 0]],651: [[1, 63, 0], [1, 75, 0], [1, 82, 0], [1, 87, 0]],189: [[1, 70, 0]],658: [[1, 87, 0], [1, 70, 0], [1, 75, 0], [1, 82, 0], [1, 87, 1], [1, 66, 0], [1, 75, 1], [1, 70, 1], [1, 63, 1], [1, 82, 1]],185: [[1, 61, 0], [1, 63, 0], [1, 66, 1], [1, 60, 1], [1, 68, 1], [1, 63, 1]],869: [[1, 72, 0], [1, 54, 0], [1, 78, 0]],860: [[1, 45, 0]],1282: [[1, 77, 0], [1, 73, 0], [1, 46, 1]],865: [[1, 66, 0], [1, 78, 1], [1, 66, 1], [1, 54, 1], [1, 75, 1], [1, 63, 1], [1, 60, 1], [1, 72, 1]],864: [[1, 78, 0], [1, 72, 0], [1, 54, 0], [1, 63, 0], [1, 75, 0], [1, 60, 0]],753: [[1, 66, 1]],886: [[1, 75, 0], [1, 
                    68, 0], [1, 78, 1], [1, 66, 1], [1, 72, 1], [1, 60, 1], [1, 75, 1], [1, 63, 1], [1, 54, 1]],885: [[1, 80, 0], [1, 72, 0], [1, 63, 0], [1, 56, 0], [1, 60, 0]],1115: [[1, 70, 0], [1, 68, 0], [1, 73, 0]],320: [[1, 61, 0]],777: [[1, 61, 0]],776: [[1, 82, 0], [1, 85, 0], [1, 70, 0], [1, 73, 0], [1, 82, 1], [1, 66, 0], [1, 84, 1], [1, 70, 1], [1, 66, 1], [1, 72, 1], [1, 60, 1]],205: [[1, 70, 0], [1, 66, 1]],772: [[1, 87, 0], [1, 70, 0], [1, 82, 0], [1, 66, 0], [1, 63, 0], [1, 75, 0], [1, 85, 1], [1, 82, 1], [1, 73, 1], [1, 70, 1], [1, 66, 1], [1, 61, 1]],1041: [[1, 70, 0], [1, 82, 1], [1, 70, 1], [1, 58, 1], [1, 78, 1], [1, 66, 1], [1, 63, 1]],1040: [[1, 
                    82, 0], [1, 58, 0], [1, 63, 0], [1, 66, 0], [1, 78, 0]],1045: [[1, 63, 0], [1, 66, 0], [1, 80, 1], [1, 68, 1], [1, 82, 0], [1, 84, 1], [1, 72, 1], [1, 63, 1]],1044: [[1, 58, 0], [1, 70, 0], [1, 78, 0]],1049: [[1, 82, 1], [1, 70, 1]],1269: [[1, 56, 1], [1, 77, 0], [1, 73, 0]],1268: [[1, 61, 1], [1, 65, 0]],669: [[1, 73, 0], [1, 61, 0], [1, 70, 0], [1, 82, 0], [1, 66, 0], [1, 85, 1], [1, 70, 1], [1, 61, 1], [1, 73, 1], [1, 66, 1], [1, 82, 1]],668: [[1, 85, 0]],1263: [[1, 73, 1], [1, 77, 1], [1, 65, 1]],1262: [[1, 61, 1], [1, 44, 0], [1, 49, 0]],1148: [[1, 56, 1]],664: [[1, 85, 1], [1, 73, 1], [1, 70, 1], [1, 61, 1], [1, 82, 1], [1, 66, 1]],
            663: [[1, 87, 0], [1, 75, 0], [1, 82, 0], [1, 63, 0], [1, 70, 0]],1266: [[1, 56, 0], [1, 65, 0], [1, 65, 1]],1265: [[1, 68, 1]],1264: [[1, 53, 0], [1, 68, 0], [1, 75, 0]],692: [[1, 60, 0], [1, 70, 0], [1, 72, 0], [1, 85, 1]],693: [[1, 84, 0], [1, 73, 1], [1, 70, 1], [1, 82, 0], [1, 82, 1], [1, 78, 0], [1, 61, 1], [1, 66, 1]],542: [[1, 82, 0], [1, 70, 0], [1, 77, 0]],546: [[1, 80, 1], [1, 68, 1]],995: [[1, 56, 1], [1, 80, 1], [1, 68, 1]],1316: [[1, 66, 1]],997: [[1, 61, 0], [1, 78, 0]],996: [[1, 54, 0], [1, 66, 0], [1, 58, 0], [1, 70, 0], [1, 73, 0]],991: [[1, 37, 0]],990: [[1, 54, 1], [1, 66, 0], [1, 78, 1], [1, 61, 1], [1, 70, 1], 
                [1, 66, 1], [1, 73, 1], [1, 58, 1]],1311: [[1, 54, 1]],992: [[1, 49, 0]],1318: [[1, 42, 1]],127: [[1, 77, 0], [1, 63, 1], [1, 73, 0], [1, 66, 1]],528: [[1, 73, 0], [1, 70, 0], [1, 73, 1], [1, 61, 1], [1, 53, 1], [1, 66, 0], [1, 59, 1], [1, 68, 1]],1011: [[1, 66, 0]],928: [[1, 78, 1], [1, 58, 0], [1, 70, 0], [1, 66, 1], [1, 54, 1]],415: [[1, 49, 0]],417: [[1, 54, 0]],921: [[1, 68, 0], [1, 82, 1]],922: [[1, 70, 1], [1, 66, 1], [1, 58, 1], [1, 78, 1], [1, 63, 1]],923: [[1, 85, 0]],418: [[1, 49, 1], [1, 41, 1]],926: [[1, 61, 0], [1, 73, 0]],927: [[1, 66, 0], [1, 82, 0], [1, 78, 0], [1, 63, 0]],319: [[1, 56, 1], [1, 54, 1], [1, 60, 
                    1], [1, 51, 1]],313: [[1, 58, 0]],312: [[1, 56, 0], [1, 53, 0], [1, 63, 0]],1183: [[1, 68, 1], [1, 65, 1], [1, 37, 1]],1181: [[1, 66, 0]],831: [[1, 60, 0], [1, 84, 1], [1, 68, 0], [1, 72, 1], [1, 80, 0], [1, 60, 1], [1, 63, 0], [1, 75, 0]],835: [[1, 60, 0], [1, 84, 0], [1, 72, 0], [1, 82, 1], [1, 70, 1], [1, 66, 1], [1, 58, 1], [1, 78, 1], [1, 61, 1]],363: [[1, 80, 0], [1, 77, 0]],382: [[1, 49, 1], [1, 42, 1]],385: [[1, 77, 0]],386: [[1, 73, 0]],784: [[1, 87, 1]],786: [[1, 84, 0], [1, 82, 0]],787: [[1, 73, 1], [1, 85, 1], [1, 60, 0], [1, 82, 1], [1, 70, 0], [1, 70, 1]],780: [[1, 72, 0]],788: [[1, 66, 0], [1, 66, 1], [1, 61, 1]],
            578: [[1, 58, 1], [1, 53, 1]],577: [[1, 65, 0], [1, 70, 1], [1, 75, 1], [1, 65, 1], [1, 63, 1]],62: [[1, 75, 1], [1, 72, 1]],67: [[1, 73, 0], [1, 77, 0]],252: [[1, 65, 0]],253: [[1, 63, 0], [1, 65, 1]],257: [[1, 65, 0]],1162: [[1, 80, 1]],732: [[1, 70, 1], [1, 85, 1], [1, 77, 1], [1, 66, 1], [1, 89, 1], [1, 65, 1]],508: [[1, 73, 1]],1032: [[1, 78, 1], [1, 63, 1]],1031: [[1, 82, 0], [1, 58, 0], [1, 70, 0], [1, 82, 1], [1, 66, 0], [1, 63, 0], [1, 78, 0], [1, 70, 1], [1, 66, 1], [1, 58, 1]],1036: [[1, 82, 0], [1, 58, 0], [1, 70, 0], [1, 66, 0], [1, 78, 0], [1, 63, 0], [1, 82, 1], [1, 58, 1], [1, 70, 1], [1, 66, 1], [1, 78, 1]],503: [[1, 
                    77, 0]],1212: [[1, 60, 0]],1213: [[1, 73, 1], [1, 64, 1]],1211: [[1, 59, 1], [1, 71, 0], [1, 59, 0], [1, 68, 0]],635: [[1, 85, 1], [1, 70, 1], [1, 77, 1], [1, 66, 1], [1, 65, 1], [1, 89, 1]],464: [[1, 61, 0]],1218: [[1, 44, 0]],166: [[1, 70, 0], [1, 72, 1]],160: [[1, 72, 0]],162: [[1, 70, 1]],966: [[1, 65, 0]],967: [[1, 80, 0], [1, 60, 0], [1, 56, 0], [1, 72, 0], [1, 75, 0], [1, 68, 0], [1, 66, 1], [1, 78, 1], [1, 75, 1], [1, 63, 1], [1, 54, 1]],960: [[1, 54, 0], [1, 66, 0], [1, 63, 0], [1, 72, 0], [1, 80, 1], [1, 60, 0], [1, 78, 0], [1, 68, 1], [1, 56, 1], [1, 75, 0], [1, 75, 1], [1, 72, 1], [1, 65, 1], [1, 60, 1]],968: [[1, 60, 1], 
                [1, 72, 1]],1102: [[1, 92, 1]],1100: [[1, 80, 0], [1, 80, 1]],1101: [[1, 85, 1]],934: [[1, 48, 1], [1, 36, 1]],1158: [[1, 80, 0], [1, 68, 1]],879: [[1, 66, 0], [1, 78, 0], [1, 72, 0], [1, 54, 0], [1, 63, 0], [1, 75, 0], [1, 60, 0], [1, 80, 1], [1, 63, 1], [1, 56, 1], [1, 75, 1], [1, 68, 1], [1, 60, 1], [1, 72, 1]],874: [[1, 78, 0], [1, 72, 0], [1, 54, 0], [1, 75, 0], [1, 66, 0], [1, 63, 0], [1, 60, 0], [1, 78, 1], [1, 54, 1], [1, 63, 1], [1, 75, 1], [1, 66, 1], [1, 60, 1]],875: [[1, 72, 1]],870: [[1, 63, 0], [1, 75, 0], [1, 66, 0], [1, 60, 0], [1, 78, 1], [1, 54, 1], [1, 66, 1], [1, 75, 1], [1, 63, 1], [1, 60, 1]],871: [[1, 72, 1]],1244: [[1, 
                    56, 1]],892: [[1, 60, 0], [1, 63, 0], [1, 54, 0]],893: [[1, 46, 1], [1, 34, 1]],895: [[1, 72, 0]],896: [[1, 78, 0], [1, 75, 0]],897: [[1, 66, 0]],1246: [[1, 68, 0], [1, 60, 0], [1, 59, 1]],1150: [[1, 63, 1]],1249: [[1, 52, 0], [1, 71, 0], [1, 56, 0]],1248: [[1, 68, 1]],355: [[1, 80, 1], [1, 77, 1]],808: [[1, 63, 0], [1, 58, 0], [1, 44, 1], [1, 32, 1]],350: [[1, 68, 1], [1, 65, 1], [1, 53, 0], [1, 56, 0]],802: [[1, 73, 0]],801: [[1, 85, 0]],800: [[1, 63, 1]],806: [[1, 66, 0]],1258: [[1, 65, 0], [1, 73, 0]],217: [[1, 66, 1]],768: [[1, 66, 0], [1, 70, 0], [1, 73, 0], [1, 87, 1], [1, 70, 1], [1, 82, 0], [1, 85, 0], [1, 75, 1], 
                [1, 66, 1], [1, 63, 1], [1, 82, 1]],769: [[1, 61, 0]],210: [[1, 68, 1]],211: [[1, 66, 0]],760: [[1, 70, 0], [1, 89, 0], [1, 65, 0], [1, 66, 0], [1, 77, 0]],761: [[1, 82, 0], [1, 87, 1], [1, 70, 1], [1, 82, 1], [1, 75, 1], [1, 63, 1], [1, 66, 1]],764: [[1, 70, 0], [1, 87, 0], [1, 63, 0], [1, 66, 0], [1, 82, 0], [1, 85, 1], [1, 82, 1], [1, 70, 1], [1, 75, 0]],765: [[1, 73, 1], [1, 61, 1], [1, 66, 1]],1259: [[1, 53, 1], [1, 37, 0]],1072: [[1, 92, 1]],1298: [[1, 61, 0], [1, 61, 1], [1, 39, 1]],1070: [[1, 80, 1]],1071: [[1, 85, 1]],281: [[1, 65, 0], [1, 65, 1], [1, 70, 0]],280: [[1, 63, 0]],286: [[1, 63, 1]],1094: [[1, 68, 1]],1095: [[1, 
                    70, 1]],1096: [[1, 92, 0]],1097: [[1, 73, 1]],679: [[1, 60, 0], [1, 70, 0], [1, 84, 0], [1, 82, 0], [1, 66, 0], [1, 78, 0], [1, 72, 0], [1, 84, 1], [1, 70, 1], [1, 82, 1], [1, 78, 1], [1, 66, 1], [1, 72, 1], [1, 60, 1]],1092: [[1, 64, 1]],1154: [[1, 85, 0]],676: [[1, 61, 0], [1, 85, 0], [1, 73, 0], [1, 82, 0], [1, 70, 0], [1, 66, 0], [1, 82, 1], [1, 70, 1], [1, 84, 1], [1, 78, 1], [1, 72, 1], [1, 66, 1], [1, 60, 1]],1156: [[1, 72, 1]],1098: [[1, 76, 1]],1099: [[1, 85, 0]],1153: [[1, 66, 1], [1, 92, 0]],673: [[1, 70, 0], [1, 85, 0], [1, 61, 0], [1, 73, 0], [1, 82, 0], [1, 66, 0], [1, 85, 1], [1, 61, 1], [1, 70, 1], [1, 73, 1], [1, 66, 1], 
                [1, 82, 1]],262: [[1, 65, 1]],267: [[1, 66, 0]],268: [[1, 70, 1], [1, 65, 0]],57: [[1, 73, 1], [1, 77, 1], [1, 75, 0], [1, 72, 0]],258: [[1, 66, 1]],53: [[1, 75, 1], [1, 72, 1]],537: [[1, 82, 1], [1, 61, 1], [1, 60, 1], [1, 75, 0], [1, 70, 1], [1, 65, 1], [1, 77, 1]],536: [[1, 68, 0], [1, 63, 0]],535: [[1, 59, 0], [1, 53, 0]],533: [[1, 73, 0]],532: [[1, 61, 0], [1, 75, 1], [1, 63, 1]],1322: [[1, 42, 0]],988: [[1, 72, 0], [1, 75, 0]],989: [[1, 78, 0]],1325: [[1, 60, 0], [1, 70, 0], [1, 66, 0]],982: [[1, 49, 1], [1, 37, 1]],116: [[1, 73, 1]],118: [[1, 68, 0], [1, 65, 0]],428: [[1, 73, 1], [1, 68, 1], [1, 61, 1], [1, 56, 1], 
                [1, 53, 1]],1254: [[1, 73, 1], [1, 37, 1], [1, 65, 1]],1255: [[1, 44, 1]],1253: [[1, 64, 0]],1250: [[1, 59, 0]],1251: [[1, 64, 1], [1, 44, 0], [1, 68, 0]],915: [[1, 58, 0], [1, 66, 0], [1, 78, 0], [1, 73, 0]],914: [[1, 54, 0]],917: [[1, 61, 1], [1, 56, 0], [1, 80, 0]],916: [[1, 61, 0], [1, 85, 1], [1, 73, 1]],911: [[1, 56, 1]],427: [[1, 41, 0], [1, 49, 0]],426: [[1, 66, 0], [1, 70, 0], [1, 75, 0]],301: [[1, 63, 1]],305: [[1, 61, 0]],307: [[1, 61, 1]],372: [[1, 65, 0]],842: [[1, 78, 0], [1, 61, 0], [1, 78, 1], [1, 54, 1], [1, 66, 1]],841: [[1, 66, 0], [1, 82, 0], [1, 58, 0], [1, 70, 0]],848: [[1, 45, 1], [1, 33, 1]],1209: [[1, 
                    56, 1]],568: [[1, 46, 1]],752: [[1, 70, 0], [1, 66, 0], [1, 87, 1], [1, 75, 1], [1, 70, 1], [1, 82, 1], [1, 63, 1]],757: [[1, 82, 0], [1, 66, 0], [1, 89, 1], [1, 70, 1], [1, 82, 1], [1, 65, 1], [1, 77, 1], [1, 66, 1]],756: [[1, 63, 0], [1, 75, 0], [1, 87, 0], [1, 70, 0]],754: [[1, 89, 0], [1, 65, 0], [1, 77, 0], [1, 85, 0]],229: [[1, 66, 0], [1, 65, 1], [1, 63, 1], [1, 57, 1], [1, 60, 1]],222: [[1, 58, 0], [1, 61, 0], [1, 63, 0], [1, 68, 0]],1027: [[1, 82, 1], [1, 70, 1], [1, 66, 1], [1, 39, 0], [1, 51, 0], [1, 58, 1], [1, 78, 1], [1, 63, 1]],1020: [[1, 58, 0]],1188: [[1, 49, 1]],1189: [[1, 75, 0]],1186: [[1, 37, 0], [1, 44, 1]],1182: [[1, 
                    63, 0]],391: [[1, 49, 0], [1, 42, 0]],1037: [[1, 63, 1]],725: [[1, 70, 0]],722: [[1, 58, 0]],1160: [[1, 75, 1]],1164: [[1, 56, 0]],601: [[1, 70, 1]],157: [[1, 63, 0], [1, 66, 0], [1, 68, 0], [1, 66, 1], [1, 63, 1], [1, 61, 1]],1163: [[1, 72, 0]],1205: [[1, 48, 0], [1, 53, 0], [1, 56, 0]],1207: [[1, 52, 1]],1206: [[1, 71, 1], [1, 68, 1], [1, 44, 1]],1201: [[1, 68, 0], [1, 56, 0], [1, 41, 0], [1, 56, 1]],1200: [[1, 53, 1], [1, 65, 0]],1203: [[1, 61, 0]],1202: [[1, 60, 1]],1217: [[1, 68, 1], [1, 52, 0], [1, 56, 0], [1, 73, 0], [1, 64, 0]],48: [[1, 66, 1], [1, 69, 1], [1, 77, 0]],49: [[1, 73, 0]],46: [[1, 80, 0]],950: [[1, 
                    78, 0], [1, 78, 1]],954: [[1, 54, 0], [1, 66, 0], [1, 54, 1], [1, 72, 0], [1, 75, 0], [1, 75, 1], [1, 72, 1], [1, 66, 1], [1, 60, 0], [1, 63, 0], [1, 78, 0], [1, 78, 1], [1, 63, 1], [1, 60, 1]],41: [[1, 65, 0], [1, 68, 0]],1113: [[1, 76, 0]],1299: [[1, 51, 0], [1, 46, 0]],5: [[1, 80, 1]],1114: [[1, 64, 0]],1116: [[1, 63, 1]],1292: [[1, 65, 1], [1, 67, 0], [1, 58, 1]],1118: [[1, 66, 1]],1290: [[1, 55, 0], [1, 63, 0]],1291: [[1, 63, 1], [1, 73, 0], [1, 58, 0], [1, 70, 0]],1296: [[1, 46, 1]],1297: [[1, 63, 0], [1, 58, 0]],1295: [[1, 51, 1], [1, 61, 1]],488: [[1, 75, 0], [1, 77, 1]],484: [[1, 54, 1]],483: [[1, 66, 1], [1, 70, 1], 
                [1, 49, 0], [1, 75, 1], [1, 49, 1], [1, 61, 1], [1, 58, 1]],482: [[1, 65, 0], [1, 42, 0]],481: [[1, 77, 0], [1, 73, 0]],472: [[1, 49, 1]],473: [[1, 42, 1]]};
        var L = function() {
            I.call(this)
        };
        n(L, I);
        var Nc = [32, 33, 34, 36, 37, 39, 41, 42, 44, 45, 46, 48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 75, 76, 77, 78, 79, 80, 82, 84, 85, 87, 89, 90, 92], Oc = {5300: 'windmill',24600: 'smoke',25700: 'something',33E3: 'smoke',34600: 'boat lights',38500: 'boat lights',43100: 'boat lights',43700: 'boat lights',45100: 'boat lights',48800: 'boat lights',40300: 'boat',50300: 'boat',52E3: 'boat lights',54600: '',58E3: 'boat',62600: 'smoke',64E3: 'smoke',64400: '',65700: '',66300: '',65800: '',64400: '',67300: '',68300: '',69200: '',
            7E4: '',71200: '',72200: 'boom',74700: '',8E4: '',82100: '',85400: '',90600: '',94500: '',98800: '',102700: 'cloud',103200: 'cloud',103700: 'cloud',104100: 'cloud',105E3: 'cloud',105500: 'cloud',106E3: 'cloud',106800: 'rain',108500: ' umbrella',115400: 'rowboat',118300: 'end'}, Pc = function() {
            for (var a = 0; a < Nc.length; a++) {
                var b = 'note' + Nc[a];
                L[b] = new z({name: b})
            }
            for (var c in Oc)
                a = 'event' + c, L[a] = new z({name: a})
        };
        var Uc = function(a, b, c) {
            Qc(a);
            this.a = a;
            this.G = b;
            this.d = c;
            this.ha = this.d.ha ? this.d.ha : Rc;
            delete this.d.ha;
            this.P = this.d.P ? this.d.P : null;
            delete this.d.P;
            this.L = this.d.L ? this.d.L : null;
            delete this.d.L;
            this.ba = this.d.ba ? this.d.ba : null;
            delete this.d.ba;
            this.i = Date.now() + this.ba;
            this.g = {};
            this.A = false;
            for (var d in this.d)
                this.g[d] = a[d];
            M.push(this);
            Sc || (Sc = true, $b(Tc))
        }, M = [], Sc = false, Vc = 0;
        Uc.prototype.P = null;
        Uc.prototype.L = null;
        var N = function(a, b, c) {
            new Uc(a, b, c)
        }, Qc = function(a) {
            var b = 1 <= arguments.length ? Array.prototype.slice.call(arguments, 0) : [], c, d, e, f, b = [].concat(b);
            if (M && 0 < M.length)
                for (c = M, d = 0, e = c.length; d < e; d++)
                    f = c[d], null != f && -1 !== b.indexOf(f.a) && (f = M.indexOf(f), -1 !== f && M.splice(f, 1))
        }, Tc = function() {
            if (Sc && !Vc) {
                var a, b, c, d, e, f, g, q;
                try {
                    g = M;
                    0 === g.length && (Sc = false);
                    e = 0;
                    for (f = g.length; e < f; e++)
                        if (c = g[e], a = Date.now() - c.i - c.ba, !(0 > a))
                            if (a > c.G) {
                                for (d in c.d)
                                    c.a[d] = c.d[d];
                                c.P && c.P();
                                c.L && c.L();
                                c.A = true
                            } else {
                                for (d in c.d)
                                    c.a[d] = 
                                    c.ha(a, c.g[d], c.d[d] - c.g[d], c.G);
                                c.P && c.P()
                            }
                    if (0 < M.length)
                        for (b = q = M.length - 1; 0 >= q ? 0 >= b : 0 <= b; 0 >= q ? b++ : b--)
                            true === M[b].A && M.splice(b, 1);
                    $b(Tc)
                } catch (aa) {
                    throw Sc = false, Error(aa);
                }
            }
            return Sc
        }, Rc = function(a, b, c, d) {
            return c * ((a = a / d - 1) * a * a + 1) + b
        };
        var Wc = {width: 179,height: 78,frames: [[[28, 20, 50, 943, 7, 6], [39, 39, 72, 936, 6, 4], [62, 30, 72, 941, 6, 7], [90, 32, 72, 949, 6, 7], [117, 30, 156, 943, 8, 8], [129, 8, 72, 917, 6, 9], [145, 44, 79, 904, 5, 6], [162, 45, 79, 915, 4, 6]], [[28, 20, 0, 828, 48, 40], [91, 32, 72, 927, 6, 8], [116, 30, 156, 897, 9, 9], [129, 8, 72, 904, 6, 12], [144, 44, 46, 925, 7, 7], [159, 45, 50, 933, 7, 9]], [[28, 20, 114, 785, 49, 41], [92, 33, 58, 935, 6, 8], [112, 29, 23, 938, 13, 13], [129, 8, 65, 945, 6, 15], [144, 43, 39, 916, 8, 8], [155, 45, 45, 904, 11, 11]], [[28, 20, 0, 786, 48, 41], [92, 35, 48, 916, 7, 8], [110, 29, 23, 906, 15, 
                        15], [129, 8, 65, 926, 6, 18], [144, 42, 0, 906, 22, 14]], [[28, 15, 114, 827, 49, 46], [93, 37, 57, 904, 6, 8], [107, 29, 50, 950, 7, 8], [117, 33, 156, 927, 8, 15], [129, 8, 65, 904, 6, 21], [144, 41, 23, 922, 14, 15]], [[9, 5, 82, 670, 68, 56], [82, 24, 45, 869, 43, 34], [129, 11, 58, 913, 6, 21], [144, 41, 0, 921, 22, 16]], [[8, 4, 69, 727, 68, 57], [81, 23, 0, 869, 44, 36], [129, 8, 58, 944, 6, 26], [144, 39, 0, 938, 22, 18]], [[8, 4, 90, 613, 69, 56], [82, 6, 58, 785, 55, 53], [143, 39, 130, 897, 25, 19]], [[8, 4, 0, 673, 68, 57], [81, 5, 0, 731, 57, 54], [142, 38, 130, 874, 27, 22]], [[8, 4, 90, 552, 69, 60], [81, 3, 0, 552, 89, 61]], 
                [[8, 2, 0, 214, 164, 64]], [[8, 1, 0, 72, 165, 68]], [[9, 0, 0, 0, 166, 71]], [[10, 0, 0, 141, 165, 72]], [[13, 1, 0, 279, 160, 71]], [[14, 2, 0, 351, 158, 70]], [[15, 3, 0, 422, 155, 69]], [[19, 5, 89, 874, 40, 52], [33, 69, 79, 911, 4, 3], [61, 5, 0, 492, 108, 59], [119, 65, 79, 922, 3, 3]], [[26, 7, 130, 917, 25, 28], [37, 37, 156, 907, 9, 19], [52, 30, 38, 925, 7, 5], [62, 29, 37, 938, 12, 23], [87, 6, 0, 614, 81, 58]]]};
        var Yc = function() {
            I.call(this);
            var a = this;
            this.a = 0;
            this.g = false;
            var b = [34600, 38500, 43100, 43700, 45100, 48800, 40300], c, d = b.length;
            for (c = 0; c < d; c++)
                L['event' + b[c]].B(function() {
                    a.a++
                });
            L.event52000.B(function() {
                a.g = true
            });
            b = [54600, 58E3, 62600, 64E3, 65700, 66300, 64400, 67300, 68300];
            d = b.length;
            for (c = 0; c < d; c++)
                L['event' + b[c]].B(function() {
                    var b = new Xc;
                    b.x = 100;
                    b.y = 30;
                    J(a, b)
                })
        };
        n(Yc, I);
        Yc.prototype.d = function(a) {
            H(73, a, 0, 9);
            this.a && H(sc['STEAMBOAT_WINDOWS' + this.a], a, 24, 90);
            this.g && H(64, a, 45, 26)
        };
        var Xc = function() {
            I.call(this);
            this.o = this.s = 0.5;
            this.a = this.opacity = 1;
            this.rotation.z = 20 * Math.random()
        };
        n(Xc, I);
        Xc.prototype.d = function(a) {
            this.y -= this.a;
            this.x -= K / 10;
            this.a -= K / 1E3;
            this.rotation.z += K / 10;
            G(65, a, 0, 0);
            this.s = this.o += K / 1E3;
            this.opacity -= K / 1E3;
            0.01 > this.opacity && (this.opacity = 0, Ic(this.parent, this))
        };
        var Zc = function() {
            I.call(this)
        };
        n(Zc, I);
        Zc.prototype.d = function(a) {
            D(C, 35, a, 130, 20)
        };
        var $c = function() {
            I.call(this);
            this.v = Wc.frames.length;
            this.a = this.v - 1;
            this.F = rc[0];
            this.width = Wc.width;
            this.height = Wc.height;
            this.w = Ac(this.width, this.height * this.v);
            this.H = this.w.getContext('2d');
            for (var a = 0; a < this.v; a++)
                for (var b = a, c = Wc.frames[b], d = c.length, e = void 0, f = void 0, g = void 0, q = void 0, aa = void 0, Ua = f = void 0, B = void 0, x = void 0, e = 0; e < d; e++)
                    for (f = c[e], Ua = f[0], B = f[1], g = f[2] + this.F[0], q = f[3] + this.F[1], aa = f[4], f = f[5], x = b; x < this.v; x++)
                        this.H.drawImage(C.d.d, g, q, aa, f, Ua, B + this.height * x, aa, f);
            this.g = 
            0;
            this.k = -1
        };
        n($c, I);
        $c.prototype.d = function(a) {
            this.opacity = this.a / (this.v - 1);
            a.save();
            a.globalCompositeOperation = 'lighter';
            a.drawImage(this.w, 0, this.height * this.a, this.width, this.height, 0, 0, this.width, this.height);
            a.restore();
            this.g && 40 < new Date - this.g && (this.a += this.k, this.g = 0, 0 >= this.a ? (this.a = 0, this.visible = false) : this.a > this.v - 1 ? this.a = this.v - 1 : this.g = new Date)
        };
        var dd = function() {
            I.call(this);
            this.F = Ac(650, 221);
            this.a = F.createLinearGradient(0, 0, 192, 369);
            this.a.addColorStop(0, 'rgb(18, 18, 23)');
            this.a.addColorStop(1, 'rgb(44, 57, 79)');
            var a, b;
            for (a = 0; 10 > a; a++)
                b = new ad(650 * Math.random(), 44.2 * Math.random()), J(this, b);
            this.O = new Zc;
            J(this, this.O);
            this.w = new bd;
            this.w.visible = false;
            J(this, this.w);
            a = this.F.getContext('2d');
            a.fillStyle = this.a;
            a.fillRect(0, 0, 650, 136);
            a.fillStyle = '#1d212b';
            a.fillRect(0, 136, 650, 85);
            for (b = 0; 70 > b; b++) {
                var c = 650 * Math.random(), d = 110.5 * Math.random();
                a.fillStyle = 'rgba(255, 255, 255, ' + 0.75 * Math.random() + ')';
                a.fillRect(c, d, 1, 1)
            }
            this.k = new cd(28, 32);
            this.g = new cd(29, 30);
            this.k.x = 615;
            this.k.y = 35;
            this.g.x = 570;
            this.g.y = 56;
            J(this, this.k);
            J(this, this.g);
            this.G = new $c;
            this.G.x = 325 - this.G.width / 2;
            this.G.y = 15;
            J(this, this.G);
            Gc(this, 650, 221)
        };
        n(dd, I);
        dd.prototype.d = function(a) {
            a.drawImage(this.F, 0, 0)
        };
        var fd = function(a, b, c, d) {
            I.call(this);
            this.x = a;
            this.y = b;
            this.type = d;
            this.a = false;
            this.g = c || [35, 47];
            this.k = Nc[ed];
            ed++;
            ed > this.g[1] && (ed = this.g[0]);
            var e = this;
            L['note' + this.k].B(function(a) {
                a.K = false;
                e.a = a.value;
                e.visible = e.a
            })
        };
        n(fd, L);
        var ed = 23;
        fd.prototype.d = function(a) {
            G(sc['WINDOW_' + this.type + '_ON'], a, 0, 0)
        };
        var gd = function(a, b, c, d, e, f) {
            I.call(this);
            80 > b && (d = 1, b = 100);
            this.width = a;
            this.height = b;
            this.O = ['A', 'B', 'C'][Math.floor(3 * Math.random())];
            this.Ka = c || Math.floor(6 * Math.random()) + 4;
            this.La = d || Math.floor(6 * Math.random()) + 4;
            this.Ma = f || 0;
            this.H = 0.9 * a;
            this.eb = 0.7 * (b - this.Ma);
            this.cb = e || [35, 47];
            this.F = [];
            a = this.H / (2 * this.Ka);
            b = this.eb / (2 * this.La);
            1 == d && (b = 8);
            for (d = 0; d < this.Ka; d++)
                for (c = 0; c < this.La; c++)
                    e = new fd(a * (2 * d + 1) + (this.width - this.H) / 2, b * (2 * c + 1) + (this.width - this.H) / 2 + this.Ma, this.cb, this.O), this.F.push(e), 
                    e.visible = false, J(this, e);
            this.g = F.createLinearGradient(100, 0, 100, 200);
            this.g.addColorStop(0, 'rgba(21,30,36,1)');
            this.g.addColorStop(1, 'rgba(14,49,89,1)');
            this.Ja = Ac(this.width, 25);
            d = sc['ROOF_' + (0.5 < Math.random() ? 3 : 5)];
            a = this.Ja.getContext('2d');
            H(d, a, Math.random() * (this.width - 30), 25 - pc(d).height)
        };
        n(gd, I);
        gd.prototype.d = function(a) {
            a.fillStyle = this.g;
            a.fillRect(0, 0, parseInt(this.width, 10), parseInt(this.height, 10));
            hd(this, a);
            a.drawImage(this.Ja, 0, -24)
        };
        var hd = function(a, b) {
            for (var c = 0; c < a.F.length; c++)
                G(sc['WINDOW_' + a.O + '_OFF'], b, a.F[c].x, a.F[c].y)
        }, kd = function(a, b) {
            this.a = 20 * Math.random() + 30;
            gd.call(this, a, b, 4, 2, [0, 34], this.a);
            this.Oa = 0.75 >= Math.random();
            this.k = [];
            id++;
            this.A = id;
            if (this.Oa) {
                this.Pa = Math.floor(4 * Math.random()) + 1;
                for (var c = 0; c < this.Pa; c++) {
                    var d = {x: Math.random() * (this.width - 40) + 20,height: 10 * Math.random() + 5,width: Math.random() + 3};
                    this.k.push(d);
                    d.S = new jd;
                    J(this, d.S);
                    d.S.o = d.S.s = 0.1;
                    d.S.opacity = 0;
                    d.S.x = d.x;
                    d.S.y = 20 - d.height;
                    d.y = 10
                }
                for (var e = 
                ['24600', '33000'], f = 0; f < e.length; f++)
                    (function(a) {
                        L['event' + e[f]].B(function(b) {
                            b.K = false;
                            b.K = false;
                            for (var c, d = 0; d < a.k.length; d++) {
                                var e = a.k[d].S;
                                e.opacity = 1;
                                e.o = e.s = 0.01;
                                b = Math.random() + 0.05 + 0.15;
                                c = 0.5 > Math.random() ? -1 : 1;
                                e.o *= c;
                                c *= b;
                                N(e, 2E3, {opacity: 0,o: c,s: b})
                            }
                        })
                    })(this)
            }
            this.g = F.createLinearGradient(100, 0, 100, 200);
            this.g.addColorStop(0, 'rgba(20,44,67,1)');
            this.g.addColorStop(1, 'rgba(19,75,142,1)');
            this.w = F.createLinearGradient(0, 192, 228, 0);
            this.w.addColorStop(0, 'rgb(0, 0, 0)');
            this.w.addColorStop(0.28787, 
            'rgb(0, 0, 0)');
            this.w.addColorStop(1, 'rgb(255, 255, 255)');
            this.Na = Bc(43);
            Gc(this, a, b)
        };
        n(kd, gd);
        var id = 0;
        kd.prototype.d = function(a) {
            a.fillStyle = this.g;
            a.fillRect(0, this.a, parseInt(this.width, 10), parseInt(this.height - this.a, 10));
            a.strokeStyle = '#333333';
            a.lineWidth = 2;
            a.strokeRect(0, this.a / 2, parseInt(this.width, 10), parseInt(this.a / 2 + 2, 10));
            a.fillStyle = this.Na;
            a.fillRect(0, this.a / 2, parseInt(this.width, 10), parseInt(this.a / 2 + 2, 10));
            a.fillStyle = this.w;
            a.strokeStyle = 'rgba(0, 0, 0, 0.2)';
            for (var b, c = 0; c < this.k.length; c++)
                b = this.k[c], a.beginPath(), a.rect(b.x, 24 - b.height, b.width, b.height), a.fill(), a.stroke(), a.closePath();
            hd(this, a)
        };
        kd.prototype.Ba = function(a) {
            if (8 > this.A) {
                var b = sc['DOOR_' + this.A];
                G(b, a, 0.5 * this.width, this.height - pc(b).height / 2 + 1)
            }
            3 == this.A || 10 == this.A || 4 == this.A ? (H(42, a, 0, 5), H(44, a, this.width - 25, 5)) : 35 < this.a && 0 == this.A % 2 && (G(39, a, 0.2 * this.width, 27), G(39, a, 0.5 * this.width, 27), G(39, a, 0.8 * this.width, 27))
        };
        var ld = function(a, b, c, d, e) {
            gd.call(this, a, b, c, d, e, 0);
            Gc(this, a, b)
        };
        n(ld, gd);
        var jd = function() {
            I.call(this);
            this.a = 36;
            this.g = pc(this.a).height;
            this.k = pc(this.a).width
        };
        n(jd, I);
        jd.prototype.d = function(a) {
            H(this.a, a, -this.k / 2, -this.g)
        };
        var nd = function() {
            I.call(this);
            md += 1;
            this.a = 0 == md % 2 ? 12 : 13
        };
        n(nd, L);
        var md = 0;
        nd.prototype.d = function(a) {
            D(C, this.a, a, 0, 0);
            D(C, 11, a, 0, 20);
            D(C, 11, a, 44, 20)
        };
        var od = function() {
            I.call(this);
            this.a = false;
            for (var a = [41, 53, 65, 77, 89], b = 0; b < a.length; b++) {
                var c = this;
                L['note' + a[b]].B(function(a) {
                    a.K = false;
                    c.a = a.value
                })
            }
        };
        n(od, L);
        od.prototype.d = function(a) {
            this.a ? D(C, 34, a, 0, 0) : D(C, 33, a, 0, 0)
        };
        var ad = function(a, b) {
            I.call(this);
            this.x = a;
            this.y = b;
            this.g = false;
            this.a = Nc[pd];
            pd++;
            92 == this.a && (pd = 30);
            this.opacity = 0;
            var c = this;
            L['note' + this.a].B(function(a) {
                a.K = false;
                qd(c, a)
            })
        };
        n(ad, L);
        var pd = 30;
        ad.prototype.d = function(a) {
            H(74, a, -11, -11)
        };
        var qd = function(a, b) {
            a.g = b.value;
            a.g && N(a, 300, {opacity: 1,o: 0.1 * Math.random() + 0.9,s: 0.1 * Math.random() + 0.9,L: function() {
                    N(a, 300, {opacity: 0,o: 0.1,s: 0.1,L: function() {
                            a.x = 650 * Math.random();
                            a.y = 44.2 * Math.random()
                        }})
                }})
        }, rd = function() {
            I.call(this);
            this.g = {};
            this.a = '102700 103200 103700 104100 105000 105500 106000'.split(' ');
            for (var a = 0; a < this.a.length; a++)
                this.g['cloud' + a] = 0;
            for (a = 0; a < this.a.length; a++)
                (function(a, c) {
                    L['event' + a.a[c]].B(function(d) {
                        d.K = false;
                        d = {};
                        d['cloud' + c] = 1;
                        N(a.g, 200, d)
                    })
                })(this, a)
        };
        n(rd, I);
        rd.prototype.d = function(a) {
            a.fillStyle = '#FFFFFF';
            for (var b = 0; b < this.a.length; b++)
                a.save(), a.globalAlpha = this.g['cloud' + b], a.translate(60 * b + 50, 30), 0 == b ? H(15, a, 0, 60) : 1 == b ? H(16, a, -60, 20) : 2 == b ? H(16, a, 0, 15) : 3 == b ? H(15, a, 10, -10) : 4 == b ? H(16, a, 30, 40) : 5 == b ? H(16, a, 40, -20) : 6 == b ? H(16, a, 20, 30) : 7 == b ? H(16, a, 0, -20) : 8 == b && H(16, a, 0, 30), a.restore();
            a.globalAlpha = 1;
            0.869 > (E ? E.currentTime / 118.27200317382812 : 0) && H(14, a, 70 - 500 * (E ? E.currentTime / 118.27200317382812 : 0), 20)
        };
        var sd = function() {
            I.call(this);
            this.g = false;
            var a = this;
            a.opacity = 0;
            L.event106800.B(function(b) {
                b.K = false;
                a.g = true;
                a.opacity = 1
            });
            this.a = Ac(950, 521);
            for (var b = this.a.getContext('2d'), c = 0; 150 > c; c++)
                H(38, b, Math.random() * this.a.width, Math.random() * this.a.height - 30)
        };
        n(sd, I);
        sd.prototype.d = function(a) {
            a.drawImage(this.a, 300 * -Math.random(), 300 * -Math.random())
        };
        var yd = function(a) {
            I.call(this);
            this.g = this.a = a;
            if (1 == this.a) {
                this.J = this.w = false;
                this.Ca = this.qa = 1;
                Dc(this, -55, -60, 110, 110);
                Ec(this);
                Fc(this);
                this.k = 0;
                var b = this;

                // 播放动画（已含音画同步）
                function startAnimation() {
                    b.J || (b.k = window.setTimeout(function() {
                        b.J || (b.w = true);
                        b.k = 0
                    }, 250), O || !(O = zc())) || (O.volume = td, ud.appendChild(O), O.addEventListener && O.addEventListener('playing', vd, false), O && O.play && O.play());
                    wd()
                }
                startAnimation();
                // 自动播放

                setTimeout(function() {
                    animationPlaying = false;
                    // 动画结束，终止递归，释放CPU
                    endCallback && endCallback();
                    // 外部回调
                }, 120e3);
                
                // 取消手动播放
                // this.aa.B(startAnimation);
                // this.ga.B(function() {
                //     b.J || (xd(), N(b, 400, {s: 1.1}))
                // });
                // this.$.B(function() {
                //     b.J || (wd(), N(b, 400, {s: 1}))
                // })
            }
        };
        n(yd, I);
        yd.prototype.d = function(a) {
            G(this.a, a, 0, 0);
            1 == this.a && (a.save(), this.w ? (a.globalAlpha = this.Ca, a.scale(this.qa, this.qa), a.save(), a.rotate(this.g), H(63, a, -14, -14), a.restore()) : H(37, a, -20, -25), a.restore());
            this.g && (this.o = this.s + Math.sin(this.g) / 40, this.g += K / 100)
        };
        var zd = function() {
            I.call(this);
            this.a = new yd(1);
            this.g = new yd(2);
            this.k = new yd(3);
            J(this, this.k);
            J(this, this.g);
            J(this, this.a);
            this.a.y = 130;
            this.g.y = 120;
            this.g.x = -50;
            this.k.y = 100;
            this.k.x = -50;
            this.w = 0;
            this.J = false
        };
        n(zd, I);
        zd.prototype.d = function() {
            this.w += K / 400;
            this.g.rotation.z = 10 * Math.sin(this.w);
            this.k.rotation.z = 8 * Math.sin(this.w);
            this.a.rotation.z = 5 * Math.cos(this.w);
            this.J && (this.a.y -= K / 20, this.g.y -= K / 10, this.k.y -= K / 8, this.a.x -= K / 20, this.g.x -= K / 20, this.k.x -= K / 100)
        };
        var cd = function(a, b) {
            I.call(this);
            this.a = a;
            this.k = b;
            this.g = 100 * Math.random();
            var c = this;
            28 == this.a ? (Dc(this, -20, -30, 40, 40), Ec(this), this.aa.B(function() {
                28 == c.a && (td = 0 == td ? 1 : 0, O && (O.volume = td), 1 == td ? c.k = 32 : c.k = 31)
            })) : (Dc(this, -20, -20, 38, 30), Ec(this)/*, this.aa.B(Ad)*/);
            // 取消搜索按钮事件绑定，保留静音按钮绑定

            // 取消手形光标（无法单个控制）
            // Fc(this);
            // this.ga.B(function() {
            //     xd();
            //     N(c, 200, {o: 1.1,s: 1.1})
            // });
            // this.$.B(function() {
            //     wd();
            //     N(c, 200, {o: 1,s: 1})
            // })
        };
        n(cd, I);
        cd.prototype.d = function(a) {
            this.g += K / 400;
            this.rotation.z = 5 * Math.cos(this.g);
            G(this.a, a, 0, 0);
            G(this.k, a, 0, -8)
        };
        var Cd = function() {
            I.call(this);
            this.a = new Bd;
            this.a.x = 31;
            this.a.y = 20;
            this.a.rotation.z = 10;
            J(this, this.a);
            this.g = 0
        };
        n(Cd, I);
        Cd.prototype.d = function(a) {
            H(76, a, 0, 0);
            this.a.g && (this.g = 1);
            0 < this.g && (this.g -= 0.1 / K, this.a.rotation.z += K / 10 * this.g)
        };
        var Bd = function() {
            I.call(this);
            var a = this;
            this.a = 77;
            a.g = false;
            L.event5300.B(function(b) {
                b.K = false;
                a.g = true;
                a.a = 78
            });
            L.event24600.B(function(b) {
                b.K = false;
                a.g = false;
                a.a = 77
            })
        };
        n(Bd, I);
        Bd.prototype.d = function(a) {
            H(this.a, a, -42, -42)
        };
        var Dd = function() {
            I.call(this);
            this.a = 100 * Math.random()
        };
        n(Dd, I);
        Dd.prototype.d = function(a) {
            this.a += K / 300;
            this.rotation.z = Math.sin(this.a);
            H(26, a, 50 - this.a, this.rotation.z)
        };
        var Ed = function() {
            I.call(this);
            this.o = this.s = 0.7;
            this.a = 0
        };
        n(Ed, I);
        Ed.prototype.d = function(a) {
            H(4, a, 0, 0);
            a.save();
            a.translate(18, 25);
            a.rotate(0.4 * Math.sin(this.a) - 0.1);
            H(6, a, 0, 0);
            a.save();
            a.rotate(0.2 * -Math.sin(this.a) + 0);
            H(5, a, 5, 0);
            a.restore();
            a.restore();
            this.a += K / 100
        };
        var Fd = function() {
            I.call(this);
            this.a = 0;
            this.g = Bc(75)
        };
        n(Fd, I);
        Fd.prototype.d = function(a) {
            a.fillStyle = this.g;
            this.a -= K / 10;
            a.save();
            a.translate(this.a, 0);
            a.fillRect(-this.a, 0, 650, 50);
            a.restore()
        };
        var Gd = function() {
            I.call(this)
        };
        n(Gd, I);
        Gd.prototype.d = function(a) {
            H(27, a, 4150, 170)
        };
        var Hd = function(a, b) {
            I.call(this);
            this.a = new Lc(a, a.data);
            J(this, this.a);
            this.o = this.s = 0.7;
            var c = this;
            this.g = 100 * Math.random();
            L['event' + b].B(function() {
                var a, b = c.a.children.length;
                for (a = 0; a < b; a++)
                    c.a.children[a].ia = true
            })
        };
        n(Hd, I);
        Hd.prototype.d = function() {
            this.g += K / 500;
            this.a.y = 3 * Math.sin(this.g)
        };
        var bd = function() {
            I.call(this);
            this.x = 140;
            this.y = 100;
            var a = this;
            this.rotation.z = -25;
            this.ya = 0;
            L.event69200.B(function() {
                a.visible = true
            });
            L.event72200.B(function() {
                N(a, 200, {ya: 1,L: function() {
                        N(a, 200, {opacity: 0});
                        a.visible = false
                    }})
            })
        };
        n(bd, I);
        bd.prototype.d = function(a) {
            a.globalAlpha = this.opacity * (1 - this.ya);
            H(17, a, 0, 0);
            a.globalAlpha = this.opacity * this.ya;
            H(18, a, 57, -7);
            this.x += K / 30;
            this.y -= K / 90
        };
        var ud = null, P = null, F = null, O = null, Id = [], Jd = 0, Kd = null, Q = null, R = null, S = null, T = null, U = null, V = null, W = null, Ld = null, Md = null, X = null, Y = null, Z = null, Nd = null, Od = null, $ = [], K = 0, td = 1, Pd = true, Qd = false, Rd = new Date, Sd = function(a) {
            bc(p);
            wc('DOWN', a.offsetX || a.layerX || 0, a.offsetY || a.layerY || 0)
        }, Td = function(a) {
            bc(p);
            a = new xc(a.offsetX || a.layerX || 0, a.offsetY || a.layerY || 0);
            var b, c, d;
            for (c in yc)
                b = yc[c], (d = vc(b, a.x, a.y)) ? (b.fa || (A(b.ga), b.fa = true), A(b.Fa)) : b.fa && (A(b.$), b.fa = false)
        }, Ud = function(a) {
            bc(p);
            wc('UP', a.offsetX || a.layerX || 
            0, a.offsetY || a.layerY || 0)
        }, Vd = function() {
            bc(p);
            var a, b;
            for (b in yc)
                a = yc[b], a.fa && (A(a.$), a.fa = false)
        }, vd = function() {
            O && O.removeEventListener && O.removeEventListener('playing', vd, false);
            var a = W;
            a.J = a.a.J = true;
            a.a.k ? window.clearTimeout(a.a.k) : a.a.w && N(a.a, 500, {qa: 1.5,Ca: 0});
            a = Q.G;
            a.visible = true;
            a.a = a.v - 1;
            a.g = new Date;
            a.k = -1
        }, xd = function() {
            Wb(P, 'cursor', 'pointer')
        }, wd = function() {
            Wb(P, 'cursor', 'default')
        }, Ad = function() {
            var a = google.doodle;
            if (a && a.url) {
                var b = a.url;
                if (google.nav && google.nav.go) {
                    a = b;
                    if (0 == b.indexOf('/search')) {
                        a = 
                        new Fb(window.location);
                        a.da = '/search';
                        for (var b = (b instanceof Fb ? b.X() : new Fb(b, void 0)).T, c = b.R(), d = 0; d < c.length; d++) {
                            var e = c[d], f = a, g = e, e = e ? b.M(e) : [];
                            f.T.set(g, 0 < e.length ? String(e[0]) : void 0)
                        }
                        a = a.toString()
                    }
                    google.nav.go(a)
                } else
                    window.parent ? window.parent.location.replace(b) : window.location.replace(b)
            }
        }, Xd = function() {
            if (Pd)
                Qd = false;
            else if (Qd = true, null != ud) {
                var a = new Date;
                K = a - Rd;
                Rd = a;
                a = E ? E.currentTime / 118.27200317382812 : 0;
                if (1 > a) {
                    for (var b = 0; b < $.length; b++)
                        $[b].x += K / 25 * (b + 0.5), 650 < ic(Hc($[b]), new w(0, 
                        0)).x && ($[b].x = -200 - 100 * b);
                    X && (X.x += K / 40);
                    V.y = 221 * R.s;
                    if (O && !O.paused) {
                        Y.x = 1202.5 * a - 280;
                        R.x = 10 * -O.currentTime;
                        S.x = 1.25 * R.x;
                        R.o = R.s = 1 - 0.25 * a;
                        U.x = 5 * -O.currentTime;
                        T.x = 1.75 * R.x;
                        Od.x = 330 - 825 * (1 - a);
                        Od.y = 30;
                        Nd.x = 325 + 825 * (1 - a);
                        Nd.y = 30;
                        for (b = Math.floor(1E3 * O.currentTime); b >= parseInt(Id[Jd], 10); ) {
                            for (var c = Mc['' + Id[Jd]], d = 0; d < c.length; d++) {
                                var e = c[d], f = e[0], g = e[1], e = e[2];
                                if (1 == f || 2 == f)
                                    e ? (f = Kd['track' + f], e = new Wd(g), e.B('track' + f), f['' + g] = e) : (f = Kd['track' + f], f['' + g] && A(L['note' + f['' + g].Ea], false), delete f['' + 
                                    g])
                            }
                            Jd++;
                            Oc.hasOwnProperty(Id[Jd] + '') && A(L['event' + Id[Jd]], false)
                        }
                        if (0.7 > a)
                            for (b = [R.N, S.N, T.za], f = 0; f < b.length; f++)
                                c = b[f][0], d = b[f][b[f].length - 1], g = ic(Hc(c), new w(c.width, 0)).x, 0 >= g && (c.x = d.x + d.width, b[f].push(b[f].shift()))
                    }
                    W.parent && 0.03919 < a ? Ic(W.parent, W) : Y.parent && 0.772 < a ? Ic(V, Y) : Ld.parent && 0.3004 < a ? Ic(U, Ld) : Z.parent && 0.9884 < a && Ic(U, Z);
                    !Od.parent && 0.562 < a ? (J(V, Nd), J(V, Od)) : !Y.parent && 0.096 < a ? J(V, Y) : !Z.parent && 0.6 < a && J(U, Z);
                    0.998 <= a && !Q.G.visible && (Q.G.y = 50, J(Q, Q.G), a = Q.G, a.visible = true, a.a = 1, a.g = 
                    new Date, a.k = 1)
                }
                Kc(Q, F);
                H(8, F, 0, 0);
                H(9, F, 637, 0);
                H(10, F, 13, 0, 624, 7);
                H(7, F, 13, 214, 624, 7);
                $b(Xd)
            }
        }, Wd = function(a) {
            this.Ea = a
        };
        Wd.prototype.B = function(a) {
            A(L['note' + this.Ea], a)
        };
        (function(a, b, c) {
            var d = function() {
                a();
                window.lol && window.lol()
            }, e = function() {
                fc(d, b, c);
                ec(d, b);
                d()
            };
            google && google.x ? google.x({id: 'DOODLE'}, e) : e()
        })(function() {
            if (ud = _uiCanvasWrapper)
                if (P = document.createElement('canvas'))
                    if (P.width = 650, P.height = 221, F = P.getContext ? P.getContext('2d') : null) {
                        Pc();
                        td = 1;
                        Jd = 0;
                        Kd = {track1: {},track2: {}};
                        Rd = new Date;
                        if (!Mc.parsed) {
                            var a = {}, b, c;
                            for (c in Mc)
                                'parsed' != c && (b = 100 * parseInt(c, 10), Id.push(b), a[b] = Mc[c]);
                            Mc = a;
                            Mc.parsed = true;
                            Id.sort(function(a, b) {
                                return a - 
                                b
                            })
                        }
                        ud.appendChild(P);
                        F.d = true;
                        Qd = Pd = false;
                        qc(C, function() {
                            p = new dc(24E4, function() {
                                O && (O.pause && 117.27200317382812 > O.currentTime) && O.pause();
                                Pd = true;
                                Vc = Date.now()
                            }, function() {
                                Pd = false;
                                if (Vc) {
                                    var a, b, c = M.length, d = Date.now() - Vc;
                                    for (b = 0; b < c; b++)
                                        a = M[b], a.i = a.i + d;
                                    Vc = 0
                                }
                                Qd || $b(Xd);
                                // 动画结束后，切换回tab也不再继续播放音乐
                                W.J && 117.27200317382812 > O.currentTime && (Rd = new Date, animationPlaying && O && O.play && O.play())
                            });
                            P.addEventListener('mousedown', Sd, false);
                            P.addEventListener('mouseup', Ud, false);
                            P.addEventListener('mousemove', Td, false);
                            P.addEventListener('mouseout', Vd, false);
                            Q = new dd;
                            R = 
                            new I;
                            S = new I;
                            T = new I;
                            U = new I;
                            V = new Fd;
                            W = new zd;
                            Ld = new Cd;
                            Md = new Gd;
                            Od = new Hd(gc, 115400);
                            Od.o = -0.7;
                            Nd = new Hd(hc, 108500);
                            var a = 0, b = 0;
                            R.N = [];
                            for (b = 0; 10 > b; b++) {
                                var c = new ld(80 * Math.random() + 80, 70 * Math.random() + 50, 5, 4, [0, 34]);
                                c.x = a;
                                a += c.width;
                                c.y = 200 - c.height;
                                J(R, c);
                                R.N.push(c)
                            }
                            a = 0;
                            S.N = [];
                            for (b = 0; 10 > b; b++)
                                c = new kd(70 * Math.random() + 70, 30 * Math.random() + 70), c.x = a, a += c.width, c.y = 210 - c.height, J(S, c), S.N.push(c);
                            a = 0;
                            T.za = [];
                            for (b = 0; 70 > b; b++)
                                c = new od, c.x = a, c.y = 153, c.width = 150, a += c.width, J(T, c), T.za.push(c);
                            $.push(new nd);
                            $.push(new nd);
                            Y = new Yc;
                            Y.x = -280;
                            Y.y = -90;
                            Z = new Dd;
                            Z.y = 27;
                            Z.x = 1950;
                            X = new Ed;
                            X.x = 10;
                            X.y = 179;
                            $[0].x = 550;
                            $[0].y = 180;
                            $[1].x = -20;
                            $[1].y = 180;
                            Ld.y = 60;
                            Ld.x = 500;
                            W.x = 325;
                            W.y = 10;
                            J(U, Ld);
                            J(T, X);
                            J(T, $[0]);
                            J(T, $[1]);
                            Q.H = new rd;
                            J(Q, Q.H);
                            J(Q, R);
                            J(Q, V);
                            J(R, U);
                            J(R, S);
                            J(R, T);
                            J(Q, new sd);
                            J(Q, W);
                            J(T, Md);
                            $b(Xd)
                        })
                    }
        }, function() {
            Pd = true;
            p && p.oa();
            O && (O.pause && O.pause(), O.volume = td = 0, O.readyState && 1 < O.readyState && (O.currentTime = 0), ud.removeChild(O), O.removeEventListener && O.removeEventListener('playing', vd, false));
            P && _uiCanvasWrapper && (ud.removeChild(P), P.removeEventListener('mousedown', Sd, false), P.removeEventListener('mouseup', Ud, false), P.removeEventListener('mousemove', Td, false), P.removeEventListener('mouseout', Vd, false));
            for (var a = 0; a < Nc.length; a++) {
                var b = 'note' + Nc[a];
                b in L && (L[b].I = [], delete L[b])
            }
            for (var c in Oc)
                a = 'event' + c, a in L && (L[a].I = [], delete L[a]);
            var d;
            if (M && 0 < M.length)
                for (c = M, a = 0, b = c.length; a < b; a++)
                    d = c[a], null != d && M.splice(M.indexOf(d), 1);
            Sc = false;
            M = [];
            if (lc && 0 < lc.length)
                for (c = lc, a = 0, b = c.length; a < 
                b; a++)
                    d = c[a], null != d && lc.splice(lc.indexOf(d), 1);
            lc = [];
            ed = 23;
            md = id = 0;
            pd = 30;
            uc = {};
            yc = {};
            Cc = 0;
            O = F = P = ud = null;
            Jd = 0;
            Od = Nd = Z = Y = X = Md = Ld = W = V = U = T = S = R = Q = Kd = null;
            $ = [];
            K = 0
        });

    };

});
