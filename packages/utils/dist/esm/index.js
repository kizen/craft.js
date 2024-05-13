import t, {
  applyPatches as e,
  enableMapSet as n,
  enablePatches as r,
  produceWithPatches as i,
} from 'immer';
import o from 'lodash/isEqualWith';
import a, {
  useMemo as s,
  useRef as c,
  useCallback as u,
  useEffect as l,
  useState as p,
  cloneElement as f,
  isValidElement as d,
} from 'react';
import h from 'shallowequal';
import { customAlphabet as y } from 'nanoid';
import g from 'tiny-invariant';
import m from 'react-dom';
var v = 'ROOT',
  b = 'canvas-ROOT',
  E = 'Parent id cannot be ommited',
  w = 'Attempting to add a node with duplicated id',
  O = 'Node does not exist, it may have been removed',
  R =
    'A <Element /> that is used inside a User Component must specify an `id` prop, eg: <Element id="text_element">...</Element> ',
  T =
    'Placeholder required placement info (parent, index, or where) is missing',
  C = 'Node cannot be dropped into target parent',
  I = 'Target parent rejects incoming node',
  H = 'Current parent rejects outgoing node',
  D = 'Cannot move node that is not a direct child of a Canvas node',
  P = 'Cannot move node into a non-Canvas parent',
  x = 'A top-level Node cannot be moved',
  N = 'Root Node cannot be moved',
  A = 'Cannot move node into a descendant',
  k =
    'The component type specified for this node (%node_type%) does not exist in the resolver',
  L =
    "The component specified in the <Canvas> `is` prop has additional Canvas specified in it's render template.",
  M =
    'The node has specified a canDrag() rule that prevents it from being dragged',
  S = 'Invalid parameter Node Id specified',
  _ = 'Attempting to delete a top-level Node',
  j =
    'Resolver in <Editor /> has to be an object. For (de)serialization Craft.js needs a list of all the User Components. \n    \nMore info: https://craft.js.org/r/docs/api/editor#props',
  U =
    'An Error occurred while deserializing components: Cannot find component <%displayName% /> in resolver map. Please check your resolver in <Editor />\n\nAvailable components in resolver: %availableComponents%\n\nMore info: https://craft.js.org/r/docs/api/editor#props',
  q =
    'You can only use useEditor in the context of <Editor />. \n\nPlease only use useEditor in components that are children of the <Editor /> component.',
  G =
    'You can only use useNode in the context of <Editor />. \n\nPlease only use useNode in components that are children of the <Editor /> component.',
  Y = function (t, e) {
    return (Y =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (t, e) {
          t.__proto__ = e;
        }) ||
      function (t, e) {
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      })(t, e);
  },
  B = function () {
    return (B =
      Object.assign ||
      function (t) {
        for (var e, n = 1, r = arguments.length; n < r; n++)
          for (var i in (e = arguments[n]))
            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t;
      }).apply(this, arguments);
  };
function W() {
  for (var t = 0, e = 0, n = arguments.length; e < n; e++)
    t += arguments[e].length;
  var r = Array(t),
    i = 0;
  for (e = 0; e < n; e++)
    for (var o = arguments[e], a = 0, s = o.length; a < s; a++, i++)
      r[i] = o[a];
  return r;
}
var z = {
    UNDO: 'HISTORY_UNDO',
    REDO: 'HISTORY_REDO',
    THROTTLE: 'HISTORY_THROTTLE',
    IGNORE: 'HISTORY_IGNORE',
    MERGE: 'HISTORY_MERGE',
    CLEAR: 'HISTORY_CLEAR',
  },
  F = (function () {
    function t() {
      (this.timeline = []), (this.pointer = -1);
    }
    return (
      (t.prototype.add = function (t, e) {
        (0 === t.length && 0 === e.length) ||
          ((this.pointer = this.pointer + 1),
          (this.timeline.length = this.pointer),
          (this.timeline[this.pointer] = {
            patches: t,
            inversePatches: e,
            timestamp: Date.now(),
          }));
      }),
      (t.prototype.throttleAdd = function (t, e, n) {
        if ((void 0 === n && (n = 500), 0 !== t.length || 0 !== e.length)) {
          if (this.timeline.length && this.pointer >= 0) {
            var r = this.timeline[this.pointer],
              i = r.patches,
              o = r.inversePatches,
              a = r.timestamp;
            if (new Date().getTime() - a < n)
              return void (this.timeline[this.pointer] = {
                timestamp: a,
                patches: W(i, t),
                inversePatches: W(e, o),
              });
          }
          this.add(t, e);
        }
      }),
      (t.prototype.merge = function (t, e) {
        if (0 !== t.length || 0 !== e.length)
          if (this.timeline.length && this.pointer >= 0) {
            var n = this.timeline[this.pointer],
              r = n.inversePatches;
            this.timeline[this.pointer] = {
              timestamp: n.timestamp,
              patches: W(n.patches, t),
              inversePatches: W(e, r),
            };
          } else this.add(t, e);
      }),
      (t.prototype.clear = function () {
        (this.timeline = []), (this.pointer = -1);
      }),
      (t.prototype.canUndo = function () {
        return this.pointer >= 0;
      }),
      (t.prototype.canRedo = function () {
        return this.pointer < this.timeline.length - 1;
      }),
      (t.prototype.undo = function (t) {
        if (this.canUndo()) {
          var n = this.timeline[this.pointer].inversePatches;
          return (this.pointer = this.pointer - 1), e(t, n);
        }
      }),
      (t.prototype.redo = function (t) {
        if (this.canRedo())
          return (
            (this.pointer = this.pointer + 1),
            e(t, this.timeline[this.pointer].patches)
          );
      }),
      t
    );
  })();
function J(e, n, r, o) {
  var a,
    p = s(function () {
      return new F();
    }, []),
    f = c([]),
    d = c();
  'function' == typeof e
    ? (a = e)
    : ((a = e.methods),
      (f.current = e.ignoreHistoryForActions),
      (d.current = e.normalizeHistory));
  var h = c(o);
  h.current = o;
  var y = c(n),
    g = s(
      function () {
        var e = d.current,
          n = f.current,
          o = h.current;
        return function (s, c) {
          var u,
            l =
              r &&
              K(
                r,
                function () {
                  return s;
                },
                p
              ),
            f = i(s, function (t) {
              var e, n;
              switch (c.type) {
                case z.UNDO:
                  return p.undo(t);
                case z.REDO:
                  return p.redo(t);
                case z.CLEAR:
                  return p.clear(), B({}, t);
                case z.IGNORE:
                case z.MERGE:
                case z.THROTTLE:
                  var r = c.payload,
                    i = r[0],
                    o = r.slice(1);
                  (e = a(t, l))[i].apply(e, o);
                  break;
                default:
                  (n = a(t, l))[c.type].apply(n, c.payload);
              }
            }),
            d = f[0],
            h = f[1],
            y = f[2];
          return (
            (u = d),
            o &&
              o(
                d,
                s,
                { type: c.type, params: c.payload, patches: h },
                l,
                function (t) {
                  var e = i(d, t);
                  (u = e[0]), (h = W(h, e[1])), (y = W(e[2], y));
                }
              ),
            [z.UNDO, z.REDO].includes(c.type) && e && (u = t(u, e)),
            W(n, [z.UNDO, z.REDO, z.IGNORE, z.CLEAR]).includes(c.type) ||
              (c.type === z.THROTTLE
                ? p.throttleAdd(h, y, c.config && c.config.rate)
                : c.type === z.MERGE
                ? p.merge(h, y)
                : p.add(h, y)),
            u
          );
        };
      },
      [p, a, r]
    ),
    m = u(function () {
      return y.current;
    }, []),
    v = s(
      function () {
        return new Q(m);
      },
      [m]
    ),
    b = u(
      function (t) {
        var e = g(y.current, t);
        (y.current = e), v.notify();
      },
      [g, v]
    );
  l(
    function () {
      v.notify();
    },
    [v]
  );
  var E = s(
      function () {
        return r
          ? K(
              r,
              function () {
                return y.current;
              },
              p
            )
          : [];
      },
      [p, r]
    ),
    w = s(
      function () {
        var t = Object.keys(a(null, null)),
          e = f.current;
        return B(
          B(
            {},
            t.reduce(function (t, e) {
              return (
                (t[e] = function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  return b({ type: e, payload: t });
                }),
                t
              );
            }, {})
          ),
          {
            history: {
              undo: function () {
                return b({ type: z.UNDO });
              },
              redo: function () {
                return b({ type: z.REDO });
              },
              clear: function () {
                return b({ type: z.CLEAR });
              },
              throttle: function (n) {
                return B(
                  {},
                  t
                    .filter(function (t) {
                      return !e.includes(t);
                    })
                    .reduce(function (t, e) {
                      return (
                        (t[e] = function () {
                          for (var t = [], r = 0; r < arguments.length; r++)
                            t[r] = arguments[r];
                          return b({
                            type: z.THROTTLE,
                            payload: W([e], t),
                            config: { rate: n },
                          });
                        }),
                        t
                      );
                    }, {})
                );
              },
              ignore: function () {
                return B(
                  {},
                  t
                    .filter(function (t) {
                      return !e.includes(t);
                    })
                    .reduce(function (t, e) {
                      return (
                        (t[e] = function () {
                          for (var t = [], n = 0; n < arguments.length; n++)
                            t[n] = arguments[n];
                          return b({ type: z.IGNORE, payload: W([e], t) });
                        }),
                        t
                      );
                    }, {})
                );
              },
              merge: function () {
                return B(
                  {},
                  t
                    .filter(function (t) {
                      return !e.includes(t);
                    })
                    .reduce(function (t, e) {
                      return (
                        (t[e] = function () {
                          for (var t = [], n = 0; n < arguments.length; n++)
                            t[n] = arguments[n];
                          return b({ type: z.MERGE, payload: W([e], t) });
                        }),
                        t
                      );
                    }, {})
                );
              },
            },
          }
        );
      },
      [b, a]
    );
  return s(
    function () {
      return {
        getState: m,
        subscribe: function (t, e, n) {
          return v.subscribe(t, e, n);
        },
        actions: w,
        query: E,
        history: p,
      };
    },
    [w, E, v, m, p]
  );
}
function K(t, e, n) {
  var r = Object.keys(t()).reduce(function (n, r) {
    var i;
    return B(
      B({}, n),
      (((i = {})[r] = function () {
        for (var n, i = [], o = 0; o < arguments.length; o++)
          i[o] = arguments[o];
        return (n = t(e()))[r].apply(n, i);
      }),
      i)
    );
  }, {});
  return B(B({}, r), {
    history: {
      canUndo: function () {
        return n.canUndo();
      },
      canRedo: function () {
        return n.canRedo();
      },
    },
  });
}
n(), r();
var Q = (function () {
    function t(t) {
      (this.subscribers = []), (this.getState = t);
    }
    return (
      (t.prototype.subscribe = function (t, e, n) {
        var r = this,
          i = new V(
            function () {
              return t(r.getState());
            },
            e,
            n
          );
        return this.subscribers.push(i), this.unsubscribe.bind(this, i);
      }),
      (t.prototype.unsubscribe = function (t) {
        if (this.subscribers.length) {
          var e = this.subscribers.indexOf(t);
          if (e > -1) return this.subscribers.splice(e, 1);
        }
      }),
      (t.prototype.notify = function () {
        this.subscribers.forEach(function (t) {
          return t.collect();
        });
      }),
      t
    );
  })(),
  V = (function () {
    function t(t, e, n) {
      void 0 === n && (n = !1),
        (this.collector = t),
        (this.onChange = e),
        n && this.collect();
    }
    return (
      (t.prototype.collect = function () {
        try {
          var t = this.collector();
          o(t, this.collected) ||
            ((this.collected = t),
            this.onChange && this.onChange(this.collected));
        } catch (t) {
          console.warn(t);
        }
      }),
      t
    );
  })(),
  X = function (t) {
    var e = t.getBoundingClientRect(),
      n = e.x,
      r = e.y,
      i = e.top,
      o = e.left,
      a = e.bottom,
      s = e.right,
      c = e.width,
      u = e.height,
      l = window.getComputedStyle(t),
      p = {
        left: parseInt(l.marginLeft),
        right: parseInt(l.marginRight),
        bottom: parseInt(l.marginBottom),
        top: parseInt(l.marginTop),
      },
      f = {
        left: parseInt(l.paddingLeft),
        right: parseInt(l.paddingRight),
        bottom: parseInt(l.paddingBottom),
        top: parseInt(l.paddingTop),
      };
    return {
      x: n,
      y: r,
      top: i,
      left: o,
      bottom: a,
      right: s,
      width: c,
      height: u,
      outerWidth: Math.round(c + p.left + p.right),
      outerHeight: Math.round(u + p.top + p.bottom),
      margin: p,
      padding: f,
      inFlow:
        t.parentElement &&
        !!(function (e) {
          var n = getComputedStyle(e);
          if (
            !(
              (l.overflow && 'visible' !== l.overflow) ||
              'none' !== n.float ||
              'grid' === n.display ||
              ('flex' === n.display && 'column' !== n['flex-direction'])
            )
          ) {
            switch (l.position) {
              case 'static':
              case 'relative':
                break;
              default:
                return;
            }
            switch (t.tagName) {
              case 'TR':
              case 'TBODY':
              case 'THEAD':
              case 'TFOOT':
                return !0;
            }
            switch (l.display) {
              case 'block':
              case 'list-item':
              case 'table':
              case 'flex':
              case 'grid':
                return !0;
            }
          }
        })(t.parentElement),
    };
  };
function Z(t, e) {
  var n = t.subscribe,
    r = t.getState,
    i = t.actions,
    o = t.query,
    a = c(!0),
    s = c(null),
    f = c(e);
  f.current = e;
  var d = u(
    function (t) {
      return B(B({}, t), { actions: i, query: o });
    },
    [i, o]
  );
  a.current && e && ((s.current = e(r(), o)), (a.current = !1));
  var h = p(d(s.current)),
    y = h[0],
    g = h[1];
  return (
    l(
      function () {
        var t;
        return (
          f.current &&
            (t = n(
              function (t) {
                return f.current(t, o);
              },
              function (t) {
                g(d(t));
              }
            )),
          function () {
            t && t();
          }
        );
      },
      [d, o, n]
    ),
    y
  );
}
var $,
  tt = y('1234567890abcdef', 24),
  et = function () {
    return tt();
  },
  nt = (function () {
    function t() {
      (this.isEnabled = !0),
        (this.elementIdMap = new WeakMap()),
        (this.registry = new Map());
    }
    return (
      (t.prototype.getElementId = function (t) {
        var e = this.elementIdMap.get(t);
        if (e) return e;
        var n = et();
        return this.elementIdMap.set(t, n), n;
      }),
      (t.prototype.getConnectorId = function (t, e) {
        return e + '--' + this.getElementId(t);
      }),
      (t.prototype.register = function (t, e) {
        var n = this,
          r = this.getByElement(t, e.name);
        if (r) {
          if (h(e.required, r.required)) return r;
          this.getByElement(t, e.name).disable();
        }
        var i = null,
          o = this.getConnectorId(t, e.name);
        return (
          this.registry.set(o, {
            id: o,
            required: e.required,
            enable: function () {
              i && i(), (i = e.connector(t, e.required, e.options));
            },
            disable: function () {
              i && i();
            },
            remove: function () {
              return n.remove(o);
            },
          }),
          this.isEnabled && this.registry.get(o).enable(),
          this.registry.get(o)
        );
      }),
      (t.prototype.get = function (t) {
        return this.registry.get(t);
      }),
      (t.prototype.remove = function (t) {
        var e = this.get(t);
        e && (e.disable(), this.registry.delete(e.id));
      }),
      (t.prototype.enable = function () {
        (this.isEnabled = !0),
          this.registry.forEach(function (t) {
            t.enable();
          });
      }),
      (t.prototype.disable = function () {
        (this.isEnabled = !1),
          this.registry.forEach(function (t) {
            t.disable();
          });
      }),
      (t.prototype.getByElement = function (t, e) {
        return this.get(this.getConnectorId(t, e));
      }),
      (t.prototype.removeByElement = function (t, e) {
        return this.remove(this.getConnectorId(t, e));
      }),
      (t.prototype.clear = function () {
        this.disable(),
          (this.elementIdMap = new WeakMap()),
          (this.registry = new Map());
      }),
      t
    );
  })();
!(function (t) {
  (t[(t.HandlerDisabled = 0)] = 'HandlerDisabled'),
    (t[(t.HandlerEnabled = 1)] = 'HandlerEnabled');
})($ || ($ = {}));
var rt = (function () {
    function t(t) {
      (this.registry = new nt()),
        (this.subscribers = new Set()),
        (this.options = t);
    }
    return (
      (t.prototype.listen = function (t) {
        var e = this;
        return (
          this.subscribers.add(t),
          function () {
            return e.subscribers.delete(t);
          }
        );
      }),
      (t.prototype.disable = function () {
        this.onDisable && this.onDisable(),
          this.registry.disable(),
          this.subscribers.forEach(function (t) {
            t($.HandlerDisabled);
          });
      }),
      (t.prototype.enable = function () {
        this.onEnable && this.onEnable(),
          this.registry.enable(),
          this.subscribers.forEach(function (t) {
            t($.HandlerEnabled);
          });
      }),
      (t.prototype.cleanup = function () {
        this.disable(), this.subscribers.clear(), this.registry.clear();
      }),
      (t.prototype.addCraftEventListener = function (t, e, n, r) {
        var i = function (r) {
          (function (t, e, n) {
            t.craft ||
              (t.craft = {
                stopPropagation: function () {},
                blockedEvents: {},
              });
            for (
              var r = (t.craft && t.craft.blockedEvents[e]) || [], i = 0;
              i < r.length;
              i++
            ) {
              var o = r[i];
              if (n !== o && n.contains(o)) return !0;
            }
            return !1;
          })(r, e, t) ||
            ((r.craft.stopPropagation = function () {
              r.craft.blockedEvents[e] || (r.craft.blockedEvents[e] = []),
                r.craft.blockedEvents[e].push(t);
            }),
            n(r));
        };
        return (
          t.addEventListener(e, i, r),
          function () {
            return t.removeEventListener(e, i, r);
          }
        );
      }),
      (t.prototype.createConnectorsUsage = function () {
        var t = this,
          e = this.handlers(),
          n = new Set(),
          r = !1,
          i = new Map();
        return {
          connectors: Object.entries(e).reduce(function (e, o) {
            var a,
              s = o[0],
              c = o[1];
            return B(
              B({}, e),
              (((a = {})[s] = function (e, o, a) {
                var u = function () {
                  var r = t.registry.register(e, {
                    required: o,
                    name: s,
                    options: a,
                    connector: c,
                  });
                  return n.add(r.id), r;
                };
                return i.set(t.registry.getConnectorId(e, s), u), r && u(), e;
              }),
              a)
            );
          }, {}),
          register: function () {
            (r = !0),
              i.forEach(function (t) {
                t();
              });
          },
          cleanup: function () {
            (r = !1),
              n.forEach(function (e) {
                return t.registry.remove(e);
              });
          },
        };
      }),
      (t.prototype.derive = function (t, e) {
        return new t(this, e);
      }),
      (t.prototype.createProxyHandlers = function (t, e) {
        var n = [],
          r = t.handlers();
        return (
          e(
            new Proxy(r, {
              get: function (t, e, i) {
                return e in r == 0
                  ? Reflect.get(t, e, i)
                  : function (t) {
                      for (var i = [], o = 1; o < arguments.length; o++)
                        i[o - 1] = arguments[o];
                      var a = r[e].apply(r, W([t], i));
                      a && n.push(a);
                    };
              },
            })
          ),
          function () {
            n.forEach(function (t) {
              t();
            });
          }
        );
      }),
      (t.prototype.reflect = function (t) {
        return this.createProxyHandlers(this, t);
      }),
      t
    );
  })(),
  it = (function (t) {
    function e(e, n) {
      var r = t.call(this, n) || this;
      return (
        (r.derived = e),
        (r.options = n),
        (r.unsubscribeParentHandlerListener = r.derived.listen(function (t) {
          switch (t) {
            case $.HandlerEnabled:
              return r.enable();
            case $.HandlerDisabled:
              return r.disable();
            default:
              return;
          }
        })),
        r
      );
    }
    return (
      (function (t, e) {
        if ('function' != typeof e && null !== e)
          throw new TypeError(
            'Class extends value ' + String(e) + ' is not a constructor or null'
          );
        function n() {
          this.constructor = t;
        }
        Y(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((n.prototype = e.prototype), new n()));
      })(e, t),
      (e.prototype.inherit = function (t) {
        return this.createProxyHandlers(this.derived, t);
      }),
      (e.prototype.cleanup = function () {
        t.prototype.cleanup.call(this), this.unsubscribeParentHandlerListener();
      }),
      e
    );
  })(rt);
function ot(t, e) {
  e && ('function' == typeof t ? t(e) : (t.current = e));
}
function at(t, e) {
  var n = t.ref;
  return (
    g(
      'string' != typeof n,
      'Cannot connect to an element with an existing string ref. Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. Read more: https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute'
    ),
    f(
      t,
      n
        ? {
            ref: function (t) {
              ot(n, t), ot(e, t);
            },
          }
        : { ref: e }
    )
  );
}
function st(t) {
  if ('string' != typeof t.type) throw new Error();
}
function ct(t) {
  return function (e) {
    void 0 === e && (e = null);
    for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
    if (!d(e)) {
      if (!e) return;
      var i = e;
      return i && t.apply(void 0, W([i], n)), i;
    }
    var o = e;
    return st(o), at(o, t);
  };
}
function ut(t) {
  return Object.keys(t).reduce(function (e, n) {
    return (
      (e[n] = ct(function () {
        for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
        return t[n].apply(t, e);
      })),
      e
    );
  }, {});
}
var lt = function (t) {
    var e = t.parentDom,
      n = a.createElement('div', {
        style: B(
          {
            position: 'fixed',
            display: 'block',
            opacity: 1,
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'transparent',
            zIndex: 99999,
          },
          t.style
        ),
      });
    return e && e.ownerDocument !== document
      ? m.createPortal(n, e.ownerDocument.body)
      : n;
  },
  pt = function (t) {
    l(t, []);
  },
  ft = function (t, e) {
    var n =
        'Deprecation warning: ' + t + ' will be deprecated in future relases.',
      r = e.suggest,
      i = e.doc;
    r && (n += ' Please use ' + r + ' instead.'),
      i && (n += '(' + i + ')'),
      console.warn(n);
  },
  dt = function () {
    return 'undefined' != typeof window;
  },
  ht = function () {
    return dt() && /Linux/i.test(window.navigator.userAgent);
  },
  yt = function () {
    return dt() && /Chrome/i.test(window.navigator.userAgent);
  };
export {
  b as DEPRECATED_ROOT_NODE,
  it as DerivedEventHandlers,
  M as ERROR_CANNOT_DRAG,
  _ as ERROR_DELETE_TOP_LEVEL_NODE,
  U as ERROR_DESERIALIZE_COMPONENT_NOT_IN_RESOLVER,
  w as ERROR_DUPLICATE_NODEID,
  L as ERROR_INFINITE_CANVAS,
  O as ERROR_INVALID_NODEID,
  S as ERROR_INVALID_NODE_ID,
  T as ERROR_MISSING_PLACEHOLDER_PLACEMENT,
  C as ERROR_MOVE_CANNOT_DROP,
  I as ERROR_MOVE_INCOMING_PARENT,
  D as ERROR_MOVE_NONCANVAS_CHILD,
  H as ERROR_MOVE_OUTGOING_PARENT,
  N as ERROR_MOVE_ROOT_NODE,
  x as ERROR_MOVE_TOP_LEVEL_NODE,
  A as ERROR_MOVE_TO_DESCENDANT,
  P as ERROR_MOVE_TO_NONCANVAS_PARENT,
  E as ERROR_NOPARENT,
  k as ERROR_NOT_IN_RESOLVER,
  j as ERROR_RESOLVER_NOT_AN_OBJECT,
  R as ERROR_TOP_LEVEL_ELEMENT_NO_ID,
  q as ERROR_USE_EDITOR_OUTSIDE_OF_EDITOR_CONTEXT,
  G as ERROR_USE_NODE_OUTSIDE_OF_EDITOR_CONTEXT,
  $ as EventHandlerUpdates,
  rt as EventHandlers,
  z as HISTORY_ACTIONS,
  F as History,
  v as ROOT_NODE,
  lt as RenderIndicator,
  at as cloneWithRef,
  K as createQuery,
  ft as deprecationWarning,
  X as getDOMInfo,
  et as getRandomId,
  yt as isChromium,
  dt as isClientSide,
  ht as isLinux,
  Z as useCollector,
  pt as useEffectOnce,
  J as useMethods,
  ut as wrapConnectorHooks,
  ct as wrapHookToRecognizeElement,
};
