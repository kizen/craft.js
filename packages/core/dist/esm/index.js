import {
  ERROR_USE_EDITOR_OUTSIDE_OF_EDITOR_CONTEXT as e,
  useCollector as t,
  wrapConnectorHooks as n,
  ERROR_USE_NODE_OUTSIDE_OF_EDITOR_CONTEXT as r,
  deprecationWarning as o,
  useEffectOnce as a,
  ERROR_TOP_LEVEL_ELEMENT_NO_ID as i,
  ROOT_NODE as d,
  ERROR_INVALID_NODEID as s,
  ERROR_DELETE_TOP_LEVEL_NODE as c,
  ERROR_NOPARENT as u,
  DEPRECATED_ROOT_NODE as l,
  ERROR_NOT_IN_RESOLVER as f,
  ERROR_INVALID_NODE_ID as p,
  ERROR_MOVE_TOP_LEVEL_NODE as v,
  ERROR_MOVE_NONCANVAS_CHILD as h,
  ERROR_CANNOT_DRAG as g,
  ERROR_MOVE_TO_NONCANVAS_PARENT as y,
  ERROR_MOVE_INCOMING_PARENT as m,
  ERROR_MOVE_CANNOT_DROP as N,
  ERROR_MOVE_TO_DESCENDANT as E,
  ERROR_DUPLICATE_NODEID as O,
  ERROR_MOVE_OUTGOING_PARENT as b,
  getRandomId as C,
  ERROR_DESERIALIZE_COMPONENT_NOT_IN_RESOLVER as T,
  getDOMInfo as w,
  EventHandlers as k,
  DerivedEventHandlers as D,
  isChromium as x,
  isLinux as I,
  RenderIndicator as S,
  useMethods as j,
  ERROR_RESOLVER_NOT_AN_OBJECT as q,
  HISTORY_ACTIONS as P,
} from '@craftjs/utils';
export { ROOT_NODE } from '@craftjs/utils';
import L, {
  createContext as R,
  useContext as A,
  useMemo as _,
  useEffect as F,
  useState as z,
  useRef as M,
  Children as B,
  Fragment as H,
} from 'react';
import W from 'tiny-invariant';
import { isFunction as $, pickBy as J } from 'lodash';
import V from 'lodash/cloneDeep';
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var X = function (
  e,
  t
) {
  return (X =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array &&
      function (e, t) {
        e.__proto__ = t;
      }) ||
    function (e, t) {
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    })(e, t);
};
function Y(e, t) {
  if ('function' != typeof t && null !== t)
    throw new TypeError(
      'Class extends value ' + String(t) + ' is not a constructor or null'
    );
  function n() {
    this.constructor = e;
  }
  X(e, t),
    (e.prototype =
      null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
}
var G = function () {
  return (G =
    Object.assign ||
    function (e) {
      for (var t, n = 1, r = arguments.length; n < r; n++)
        for (var o in (t = arguments[n]))
          Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
      return e;
    }).apply(this, arguments);
};
function K(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) &&
      t.indexOf(r) < 0 &&
      (n[r] = e[r]);
  if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
    var o = 0;
    for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
        (n[r[o]] = e[r[o]]);
  }
  return n;
}
function U() {
  for (var e = 0, t = 0, n = arguments.length; t < n; t++)
    e += arguments[t].length;
  var r = Array(e),
    o = 0;
  for (t = 0; t < n; t++)
    for (var a = arguments[t], i = 0, d = a.length; i < d; i++, o++)
      r[o] = a[i];
  return r;
}
var Q = L.createContext(null),
  Z = function (e) {
    var t = e.related;
    return L.createElement(
      Q.Provider,
      { value: { id: e.id, related: void 0 !== t && t } },
      e.children
    );
  },
  ee = R(null),
  te = R(null),
  ne = function () {
    return A(te);
  };
function re(r) {
  var o = ne(),
    a = A(ee);
  W(a, e);
  var i = t(a, r),
    d = _(
      function () {
        return o && o.createConnectorsUsage();
      },
      [o]
    );
  F(
    function () {
      return (
        d.register(),
        function () {
          d.cleanup();
        }
      );
    },
    [d]
  );
  var s = _(
    function () {
      return d && n(d.connectors);
    },
    [d]
  );
  return G(G({}, i), { connectors: s, inContext: !!a, store: a });
}
function oe(e) {
  var t = A(Q);
  W(t, r);
  var o = t.id,
    a = t.related,
    i = re(function (t) {
      return o && t.nodes[o] && e && e(t.nodes[o]);
    }),
    d = i.actions,
    s = i.connectors,
    c = K(i, ['actions', 'query', 'connectors']),
    u = _(
      function () {
        return n({
          connect: function (e) {
            return s.connect(e, o);
          },
          drag: function (e) {
            return s.drag(e, o);
          },
        });
      },
      [s, o]
    ),
    l = _(
      function () {
        return {
          setProp: function (e, t) {
            t ? d.history.throttle(t).setProp(o, e) : d.setProp(o, e);
          },
          setCustom: function (e, t) {
            t ? d.history.throttle(t).setCustom(o, e) : d.setCustom(o, e);
          },
          setHidden: function (e) {
            return d.setHidden(o, e);
          },
        };
      },
      [d, o]
    );
  return G(G({}, c), {
    id: o,
    related: a,
    inNodeContext: !!t,
    actions: l,
    connectors: u,
  });
}
function ae(e) {
  var t = oe(e),
    n = t.id,
    r = t.related,
    a = t.actions,
    i = t.inNodeContext,
    d = t.connectors,
    s = K(t, ['id', 'related', 'actions', 'inNodeContext', 'connectors']);
  return G(G({}, s), {
    actions: a,
    id: n,
    related: r,
    setProp: function (e, t) {
      return (
        o('useNode().setProp()', { suggest: 'useNode().actions.setProp()' }),
        a.setProp(e, t)
      );
    },
    inNodeContext: i,
    connectors: d,
  });
}
var ie = function (e) {
    var t = e.render,
      n = ae().connectors;
    return 'string' == typeof t.type
      ? (0, n.connect)((0, n.drag)(L.cloneElement(t)))
      : t;
  },
  de = function (e) {
    var t = oe(function (e) {
        return {
          type: e.data.type,
          props: e.data.props,
          nodes: e.data.nodes,
          hydrationTimestamp: e._hydrationTimestamp,
        };
      }),
      n = t.type,
      r = t.props,
      o = t.nodes;
    return _(
      function () {
        var t = r.children;
        o &&
          o.length > 0 &&
          (t = L.createElement(
            L.Fragment,
            null,
            o.map(function (e) {
              return L.createElement(ce, { id: e, key: e });
            })
          ));
        var a = L.createElement(n, G(G({}, r), e), t);
        return 'string' == typeof n ? L.createElement(ie, { render: a }) : a;
      },
      [n, r, e, t.hydrationTimestamp, o]
    );
  },
  se = function (e) {
    var t = e.render,
      n = K(e, ['render']),
      r = oe(function (e) {
        return { hidden: e.data.hidden };
      }).hidden,
      o = re(function (e) {
        return { onRender: e.options.onRender };
      }).onRender;
    return r
      ? null
      : L.createElement(o, { render: t || L.createElement(de, G({}, n)) });
  },
  ce = function (e) {
    var t = e.id,
      n = e.render,
      r = K(e, ['id', 'render']);
    return L.createElement(
      Z,
      { id: t },
      L.createElement(se, G({ render: n }, r))
    );
  },
  ue = { is: 'div', canvas: !1, custom: {}, hidden: !1 },
  le = { is: 'type', canvas: 'isCanvas' };
function fe(e) {
  var t = e.id,
    n = e.children,
    r = K(e, ['id', 'children']),
    o = G(G({}, ue), r).is,
    d = re(),
    s = d.query,
    c = d.actions,
    u = oe(function (e) {
      return { node: { id: e.id, data: e.data } };
    }),
    l = u.node,
    f = u.inNodeContext,
    p = z(null),
    v = p[0],
    h = p[1];
  return (
    a(function () {
      W(!!t, i);
      var e = l.id,
        a = l.data;
      if (f) {
        var d,
          u =
            a.linkedNodes && a.linkedNodes[t] && s.node(a.linkedNodes[t]).get();
        if (u && u.data.type === o) d = u.id;
        else {
          var p = L.createElement(fe, r, n),
            v = s.parseReactElement(p).toNodeTree();
          (d = v.rootNodeId), c.history.ignore().addLinkedNodeFromTree(v, e, t);
        }
        h(d);
      }
    }),
    v ? L.createElement(ce, G({ id: v }, r)) : null
  );
}
var pe = function () {
  return o('<Canvas />', { suggest: '<Element canvas={true} />' });
};
function Canvas(e) {
  var t = K(e, []);
  return (
    F(function () {
      return pe();
    }, []),
    L.createElement(fe, G({}, t, { canvas: !0 }))
  );
}
var ve,
  he = function () {
    var e = re(function (e) {
      return { timestamp: e.nodes[d] && e.nodes[d]._hydrationTimestamp };
    }).timestamp;
    return e ? L.createElement(ce, { id: d, key: e }) : null;
  },
  ge = function (e) {
    var t = e.children,
      n = e.json,
      r = e.data,
      a = re(),
      i = a.actions,
      s = a.query;
    n && o('<Frame json={...} />', { suggest: '<Frame data={...} />' });
    var c = M({ initialChildren: t, initialData: r || n });
    return (
      F(
        function () {
          var e = c.current,
            t = e.initialChildren,
            n = e.initialData;
          if (n) i.history.ignore().deserialize(n);
          else if (t) {
            var r = L.Children.only(t),
              o = s.parseReactElement(r).toNodeTree(function (e, t) {
                return t === r && (e.id = d), e;
              });
            i.history.ignore().addNodeTree(o);
          }
        },
        [i, s]
      ),
      L.createElement(he, null)
    );
  };
!(function (e) {
  (e[(e.Any = 0)] = 'Any'), (e[(e.Id = 1)] = 'Id'), (e[(e.Obj = 2)] = 'Obj');
})(ve || (ve = {}));
var ye = function (e) {
  return K(e, [
    'addLinkedNodeFromTree',
    'setDOM',
    'setNodeEvent',
    'replaceNodes',
    'reset',
  ]);
};
function me(e) {
  var t = re(e),
    n = t.connectors,
    r = t.actions,
    o = K(t.query, ['deserialize']),
    a = t.store,
    i = K(t, ['connectors', 'actions', 'query', 'store']),
    d = ye(r),
    s = _(
      function () {
        return G(G({}, d), {
          history: G(G({}, d.history), {
            ignore: function () {
              for (var e, t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
              return ye((e = d.history).ignore.apply(e, t));
            },
            throttle: function () {
              for (var e, t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
              return ye((e = d.history).throttle.apply(e, t));
            },
          }),
        });
      },
      [d]
    );
  return G({ connectors: n, actions: s, query: o, store: a }, i);
}
function Ne(e) {
  return function (t) {
    return function (n) {
      var r = e ? me(e) : me();
      return L.createElement(t, G({}, r, n));
    };
  };
}
function Ee(e) {
  return function (t) {
    return function (n) {
      var r = ae(e);
      return L.createElement(t, G({}, r, n));
    };
  };
}
var Oe = function (e) {
    return Object.fromEntries
      ? Object.fromEntries(e)
      : e.reduce(function (e, t) {
          var n,
            r = t[0],
            o = t[1];
          return G(G({}, e), (((n = {})[r] = o), n));
        }, {});
  },
  be = function (e, t, n) {
    var r = Array.isArray(t) ? t : [t],
      o = G({ existOnly: !1, idOnly: !1 }, n || {}),
      a = r
        .filter(function (e) {
          return !!e;
        })
        .map(function (t) {
          return 'string' == typeof t
            ? { node: e[t], exists: !!e[t] }
            : 'object' != typeof t || o.idOnly
            ? { node: null, exists: !1 }
            : { node: t, exists: !!e[t.id] };
        });
    return (
      o.existOnly &&
        W(
          0 ===
            a.filter(function (e) {
              return !e.exists;
            }).length,
          s
        ),
      a
    );
  },
  Ce = function (e, t) {
    var n = t.name || t.displayName,
      r = (function () {
        if (e[n]) return n;
        for (var r = 0; r < Object.keys(e).length; r++) {
          var o = Object.keys(e)[r];
          if (e[o] === t) return o;
        }
        return 'string' == typeof t ? t : void 0;
      })();
    return W(r, f.replace('%node_type%', n)), r;
  },
  Te = function (e, t) {
    return 'string' == typeof e ? e : { resolvedName: Ce(t, e) };
  },
  we = function (e, t) {
    var n = e.type,
      r = e.isCanvas,
      o = e.props;
    return (
      (o = Object.keys(o).reduce(function (e, n) {
        var r = o[n];
        return (
          null == r ||
            (e[n] =
              'children' === n && 'string' != typeof r
                ? B.map(r, function (e) {
                    return 'string' == typeof e ? e : we(e, t);
                  })
                : r.type
                ? we(r, t)
                : r),
          e
        );
      }, {})),
      { type: Te(n, t), isCanvas: !!r, props: o }
    );
  },
  ke = function (e, t) {
    var n = e.type,
      r = e.props,
      o = e.isCanvas,
      a = K(e, ['type', 'props', 'isCanvas', 'name']),
      i = we({ type: n, isCanvas: o, props: r }, t);
    return G(G({}, i), a);
  };
function De(e, t) {
  W('string' == typeof t, p);
  var n = e.nodes[t],
    r = function (t) {
      return De(e, t);
    };
  return {
    isCanvas: function () {
      return !!n.data.isCanvas;
    },
    isRoot: function () {
      return n.id === d;
    },
    isLinkedNode: function () {
      return n.data.parent && r(n.data.parent).linkedNodes().includes(n.id);
    },
    isTopLevelNode: function () {
      return this.isRoot() || this.isLinkedNode();
    },
    isDeletable: function () {
      return !this.isTopLevelNode();
    },
    isParentOfTopLevelNodes: function () {
      return n.data.linkedNodes && Object.keys(n.data.linkedNodes).length > 0;
    },
    isParentOfTopLevelCanvas: function () {
      return (
        o('query.node(id).isParentOfTopLevelCanvas', {
          suggest: 'query.node(id).isParentOfTopLevelNodes',
        }),
        this.isParentOfTopLevelNodes()
      );
    },
    isSelected: function () {
      return e.events.selected.has(t);
    },
    isHovered: function () {
      return e.events.hovered.has(t);
    },
    isDragged: function () {
      return e.events.dragged.has(t);
    },
    get: function () {
      return n;
    },
    ancestors: function (t) {
      return (
        void 0 === t && (t = !1),
        (function n(r, o, a) {
          void 0 === o && (o = []), void 0 === a && (a = 0);
          var i = e.nodes[r];
          return i
            ? (o.push(r),
              i.data.parent
                ? ((t || (!t && 0 === a)) && (o = n(i.data.parent, o, a + 1)),
                  o)
                : o)
            : o;
        })(n.data.parent)
      );
    },
    descendants: function (n, o) {
      return (
        void 0 === n && (n = !1),
        (function t(a, i, d) {
          return (
            void 0 === i && (i = []),
            void 0 === d && (d = 0),
            (n || (!n && 0 === d)) && e.nodes[a]
              ? ('childNodes' !== o &&
                  r(a)
                    .linkedNodes()
                    .forEach(function (e) {
                      i.push(e), (i = t(e, i, d + 1));
                    }),
                'linkedNodes' !== o &&
                  r(a)
                    .childNodes()
                    .forEach(function (e) {
                      i.push(e), (i = t(e, i, d + 1));
                    }),
                i)
              : i
          );
        })(t)
      );
    },
    linkedNodes: function () {
      return Object.values(n.data.linkedNodes || {});
    },
    childNodes: function () {
      return n.data.nodes || [];
    },
    isDraggable: function (t) {
      try {
        var o = n;
        return (
          W(!this.isTopLevelNode(), v),
          W(De(e, o.data.parent).isCanvas(), h),
          W(o.rules.canDrag(o, r), g),
          !0
        );
      } catch (e) {
        return t && t(e), !1;
      }
    },
    isDroppable: function (t, o) {
      var a = be(e.nodes, t),
        i = n;
      try {
        W(this.isCanvas(), y),
          W(
            i.rules.canMoveIn(
              a.map(function (e) {
                return e.node;
              }),
              i,
              r
            ),
            m
          );
        var d = {};
        return (
          a.forEach(function (t) {
            var n = t.node,
              o = t.exists;
            if ((W(n.rules.canDrop(i, n, r), N), o)) {
              W(!r(n.id).isTopLevelNode(), v);
              var a = r(n.id).descendants(!0);
              W(!a.includes(i.id) && i.id !== n.id, E);
              var s = n.data.parent && e.nodes[n.data.parent];
              W(s.data.isCanvas, h),
                W(s || (!s && !e.nodes[n.id]), O),
                s.id !== i.id && (d[s.id] || (d[s.id] = []), d[s.id].push(n));
            }
          }),
          Object.keys(d).forEach(function (t) {
            var n = e.nodes[t];
            W(n.rules.canMoveOut(d[t], n, r), b);
          }),
          !0
        );
      } catch (e) {
        return o && o(e), !1;
      }
    },
    toSerializedNode: function () {
      return ke(n.data, e.options.resolver);
    },
    toNodeTree: function (e) {
      var n = U([t], this.descendants(!0, e)).reduce(function (e, t) {
        return (e[t] = r(t).get()), e;
      }, {});
      return { rootNodeId: t, nodes: n };
    },
    decendants: function (e) {
      return (
        void 0 === e && (e = !1),
        o('query.node(id).decendants', {
          suggest: 'query.node(id).descendants',
        }),
        this.descendants(e)
      );
    },
    isTopLevelCanvas: function () {
      return !this.isRoot() && !n.data.parent;
    },
  };
}
function xe(e, t, n, r) {
  for (
    var o = { parent: e, index: 0, where: 'before' },
      a = 0,
      i = 0,
      d = 0,
      s = 0,
      c = 0,
      u = 0,
      l = 0,
      f = t.length;
    l < f;
    l++
  ) {
    var p = t[l];
    if (
      ((u = p.top + p.outerHeight),
      (s = p.left + p.outerWidth / 2),
      (c = p.top + p.outerHeight / 2),
      !((i && p.left > i) || (d && c >= d) || (a && p.left + p.outerWidth < a)))
    )
      if (((o.index = l), p.inFlow)) {
        if (r < c) {
          o.where = 'before';
          break;
        }
        o.where = 'after';
      } else
        r < u && (d = u),
          n < s
            ? ((i = s), (o.where = 'before'))
            : ((a = s), (o.where = 'after'));
  }
  return o;
}
var Ie = function (e) {
  return 'string' == typeof e ? e : e.name;
};
function Se(e, t) {
  var n = e.data.type,
    r = {
      id: e.id || C(),
      _hydrationTimestamp: Date.now(),
      data: G(
        {
          type: n,
          name: Ie(n),
          displayName: Ie(n),
          props: {},
          custom: {},
          parent: null,
          isCanvas: !1,
          hidden: !1,
          nodes: [],
          linkedNodes: {},
        },
        e.data
      ),
      related: {},
      events: { selected: !1, dragged: !1, hovered: !1 },
      rules: {
        canDrag: function () {
          return !0;
        },
        canDrop: function () {
          return !0;
        },
        canMoveIn: function () {
          return !0;
        },
        canMoveOut: function () {
          return !0;
        },
      },
      dom: null,
    };
  if (r.data.type === fe || r.data.type === Canvas) {
    var o = G(G({}, ue), r.data.props);
    (r.data.props = Object.keys(r.data.props).reduce(function (e, t) {
      return (
        Object.keys(ue).includes(t)
          ? (r.data[le[t] || t] = o[t])
          : (e[t] = r.data.props[t]),
        e
      );
    }, {})),
      (r.data.name = Ie((n = r.data.type))),
      (r.data.displayName = Ie(n)),
      r.data.type === Canvas && ((r.data.isCanvas = !0), pe());
  }
  t && t(r);
  var a = n.craft;
  if (
    a &&
    ((r.data.displayName = a.displayName || a.name || r.data.displayName),
    (r.data.props = G(G({}, a.props || a.defaultProps || {}), r.data.props)),
    (r.data.custom = G(G({}, a.custom || {}), r.data.custom)),
    null != a.isCanvas && (r.data.isCanvas = a.isCanvas),
    a.rules &&
      Object.keys(a.rules).forEach(function (e) {
        ['canDrag', 'canDrop', 'canMoveIn', 'canMoveOut'].includes(e) &&
          (r.rules[e] = a.rules[e]);
      }),
    a.related)
  ) {
    var i = { id: r.id, related: !0 };
    Object.keys(a.related).forEach(function (e) {
      r.related[e] = function () {
        return L.createElement(Z, i, L.createElement(a.related[e]));
      };
    });
  }
  return r;
}
var je = function (e, t, n) {
    var r = e.props,
      o = (function (e, t) {
        return 'object' == typeof e && e.resolvedName
          ? 'Canvas' === e.resolvedName
            ? Canvas
            : t[e.resolvedName]
          : 'string' == typeof e
          ? e
          : null;
      })(e.type, t);
    if (o) {
      r = Object.keys(r).reduce(function (e, n) {
        var o = r[n];
        return (
          (e[n] =
            null == o
              ? null
              : 'object' == typeof o && o.resolvedName
              ? je(o, t)
              : 'children' === n && Array.isArray(o)
              ? o.map(function (e) {
                  return 'string' == typeof e ? e : je(e, t);
                })
              : o),
          e
        );
      }, {});
      var a = G({}, L.createElement(o, G({}, r)));
      return G(G({}, a), { name: Ce(t, a.type) });
    }
  },
  qe = function (e, t) {
    var n, r;
    if (t.length < 1) return ((n = {})[e.id] = e), n;
    var o = t.map(function (e) {
        return e.rootNodeId;
      }),
      a = G(G({}, e), { data: G(G({}, e.data), { nodes: o }) }),
      i = (((r = {})[e.id] = a), r);
    return t.reduce(function (t, n) {
      var r,
        o = n.nodes[n.rootNodeId];
      return G(
        G(G({}, t), n.nodes),
        (((r = {})[o.id] = G(G({}, o), {
          data: G(G({}, o.data), { parent: e.id }),
        })),
        r)
      );
    }, i);
  };
function Pe(e) {
  var t = e && e.options,
    n = function () {
      return Pe(e);
    };
  return {
    getDropPlaceholder: function (t, r, o, a) {
      void 0 === a &&
        (a = function (t) {
          return e.nodes[t.id].dom;
        });
      var i = e.nodes[r],
        d = n().node(i.id).isCanvas() ? i : e.nodes[i.data.parent];
      if (d) {
        var s = d.data.nodes || [],
          c = xe(
            d,
            s
              ? s.reduce(function (t, n) {
                  var r = a(e.nodes[n]);
                  if (r) {
                    var o = G({ id: n }, w(r));
                    t.push(o);
                  }
                  return t;
                }, [])
              : [],
            o.x,
            o.y
          ),
          u = s.length && e.nodes[s[c.index]],
          l = { placement: G(G({}, c), { currentNode: u }), error: null };
        return (
          be(e.nodes, t).forEach(function (e) {
            var t = e.node;
            e.exists &&
              n()
                .node(t.id)
                .isDraggable(function (e) {
                  return (l.error = e);
                });
          }),
          n()
            .node(d.id)
            .isDroppable(t, function (e) {
              return (l.error = e);
            }),
          l
        );
      }
    },
    getOptions: function () {
      return t;
    },
    getNodes: function () {
      return e.nodes;
    },
    node: function (t) {
      return De(e, t);
    },
    getSerializedNodes: function () {
      var t = this,
        n = Object.keys(e.nodes).map(function (e) {
          return [e, t.node(e).toSerializedNode()];
        });
      return Oe(n);
    },
    getEvent: function (t) {
      return (function (e, t) {
        var n = e.events[t];
        return {
          contains: function (e) {
            return n.has(e);
          },
          isEmpty: function () {
            return 0 === this.all().length;
          },
          first: function () {
            return this.all()[0];
          },
          last: function () {
            var e = this.all();
            return e[e.length - 1];
          },
          all: function () {
            return Array.from(n);
          },
          size: function () {
            return this.all().length;
          },
          at: function (e) {
            return this.all()[e];
          },
          raw: function () {
            return n;
          },
        };
      })(e, t);
    },
    serialize: function () {
      return JSON.stringify(this.getSerializedNodes());
    },
    parseReactElement: function (t) {
      return {
        toNodeTree: function (r) {
          var o = (function (e, t) {
              var n = e;
              return (
                'string' == typeof n && (n = L.createElement(H, {}, n)),
                Se({ data: { type: n.type, props: G({}, n.props) } }, function (
                  e
                ) {
                  t && t(e, n);
                })
              );
            })(t, function (t, n) {
              var o = Ce(e.options.resolver, t.data.type);
              (t.data.displayName = t.data.displayName || o),
                (t.data.name = o),
                r && r(t, n);
            }),
            a = [];
          return (
            t.props &&
              t.props.children &&
              (a = L.Children.toArray(t.props.children).reduce(function (e, t) {
                return (
                  L.isValidElement(t) &&
                    e.push(n().parseReactElement(t).toNodeTree(r)),
                  e
                );
              }, [])),
            (function (e, t) {
              return { rootNodeId: e.id, nodes: qe(e, t) };
            })(o, a)
          );
        },
      };
    },
    parseSerializedNode: function (t) {
      return {
        toNode: function (r) {
          var a = (function (e, t) {
            var n = e.type,
              r = K(e, ['type', 'props']);
            W(
              (void 0 !== n && 'string' == typeof n) ||
                (void 0 !== n && void 0 !== n.resolvedName),
              T.replace('%displayName%', e.displayName).replace(
                '%availableComponents%',
                Object.keys(t).join(', ')
              )
            );
            var o = je(e, t),
              a = o.name;
            return {
              type: o.type,
              name: a,
              displayName: r.displayName || a,
              props: o.props,
              custom: r.custom || {},
              isCanvas: !!r.isCanvas,
              hidden: !!r.hidden,
              parent: r.parent,
              linkedNodes: r.linkedNodes || r._childCanvas || {},
              nodes: r.nodes || [],
            };
          })(t, e.options.resolver);
          W(a.type, f);
          var i = 'string' == typeof r && r;
          return (
            i &&
              o('query.parseSerializedNode(...).toNode(id)', {
                suggest:
                  'query.parseSerializedNode(...).toNode(node => node.id = id)',
              }),
            n()
              .parseFreshNode(G(G({}, i ? { id: i } : {}), { data: a }))
              .toNode(!i && r)
          );
        },
      };
    },
    parseFreshNode: function (t) {
      return {
        toNode: function (n) {
          return Se(t, function (t) {
            t.data.parent === l && (t.data.parent = d);
            var r = Ce(e.options.resolver, t.data.type);
            W(null !== r, f),
              (t.data.displayName = t.data.displayName || r),
              (t.data.name = r),
              n && n(t);
          });
        },
      };
    },
    createNode: function (e, t) {
      o('query.createNode(' + e + ')', {
        suggest: 'query.parseReactElement(' + e + ').toNodeTree()',
      });
      var n = this.parseReactElement(e).toNodeTree(),
        r = n.nodes[n.rootNodeId];
      return t
        ? (t.id && (r.id = t.id),
          t.data && (r.data = G(G({}, r.data), t.data)),
          r)
        : r;
    },
    getState: function () {
      return e;
    },
  };
}
var Le = (function (e) {
    function t() {
      return (null !== e && e.apply(this, arguments)) || this;
    }
    return (
      Y(t, e),
      (t.prototype.handlers = function () {
        return {
          connect: function (e, t) {},
          select: function (e, t) {},
          hover: function (e, t) {},
          drag: function (e, t) {},
          drop: function (e, t) {},
          create: function (e, t, n) {},
        };
      }),
      t
    );
  })(k),
  Re = (function (e) {
    function t() {
      return (null !== e && e.apply(this, arguments)) || this;
    }
    return Y(t, e), t;
  })(D),
  Ae = (function () {
    function e(e, t) {
      (this.store = e),
        (this.dragTarget = t),
        (this.currentIndicator = null),
        (this.currentDropTargetId = null),
        (this.currentDropTargetCanvasAncestorId = null),
        (this.currentTargetId = null),
        (this.currentTargetChildDimensions = null),
        (this.currentIndicator = null),
        (this.dragError = null),
        (this.draggedNodes = this.getDraggedNodes()),
        this.validateDraggedNodes(),
        (this.onScrollListener = this.onScroll.bind(this)),
        window.addEventListener('scroll', this.onScrollListener, !0);
    }
    return (
      (e.prototype.cleanup = function () {
        window.removeEventListener('scroll', this.onScrollListener, !0);
      }),
      (e.prototype.onScroll = function (e) {
        var t = e.target,
          n = this.store.query.node(d).get();
        t instanceof Element &&
          n &&
          n.dom &&
          t.contains(n.dom) &&
          (this.currentTargetChildDimensions = null);
      }),
      (e.prototype.getDraggedNodes = function () {
        return be(
          this.store.query.getNodes(),
          'new' === this.dragTarget.type
            ? this.dragTarget.tree.nodes[this.dragTarget.tree.rootNodeId]
            : this.dragTarget.nodes
        );
      }),
      (e.prototype.validateDraggedNodes = function () {
        var e = this;
        'new' !== this.dragTarget.type &&
          this.draggedNodes.forEach(function (t) {
            t.exists &&
              e.store.query.node(t.node.id).isDraggable(function (t) {
                e.dragError = t;
              });
          });
      }),
      (e.prototype.isNearBorders = function (t, n, r) {
        return (
          t.top + e.BORDER_OFFSET > r ||
          t.bottom - e.BORDER_OFFSET < r ||
          t.left + e.BORDER_OFFSET > n ||
          t.right - e.BORDER_OFFSET < n
        );
      }),
      (e.prototype.isDiff = function (e) {
        return (
          !this.currentIndicator ||
          this.currentIndicator.placement.parent.id !== e.parent.id ||
          this.currentIndicator.placement.index !== e.index ||
          this.currentIndicator.placement.where !== e.where
        );
      }),
      (e.prototype.getChildDimensions = function (e) {
        var t = this,
          n = this.currentTargetChildDimensions;
        return this.currentTargetId === e.id && n
          ? n
          : e.data.nodes.reduce(function (e, n) {
              var r = t.store.query.node(n).get().dom;
              return r && e.push(G({ id: n }, w(r))), e;
            }, []);
      }),
      (e.prototype.getCanvasAncestor = function (e) {
        var t = this;
        if (
          e === this.currentDropTargetId &&
          this.currentDropTargetCanvasAncestorId
        ) {
          var n = this.store.query
            .node(this.currentDropTargetCanvasAncestorId)
            .get();
          if (n) return n;
        }
        var r = function (e) {
          var n = t.store.query.node(e).get();
          return n && n.data.isCanvas
            ? n
            : n.data.parent
            ? r(n.data.parent)
            : null;
        };
        return r(e);
      }),
      (e.prototype.computeIndicator = function (e, t, n) {
        var r = this.getCanvasAncestor(e);
        if (
          r &&
          ((this.currentDropTargetId = e),
          (this.currentDropTargetCanvasAncestorId = r.id),
          r.data.parent &&
            this.isNearBorders(w(r.dom), t, n) &&
            !this.store.query.node(r.id).isLinkedNode() &&
            (r = this.store.query.node(r.data.parent).get()),
          r)
        ) {
          (this.currentTargetChildDimensions = this.getChildDimensions(r)),
            (this.currentTargetId = r.id);
          var o = xe(r, this.currentTargetChildDimensions, t, n);
          if (this.isDiff(o)) {
            var a = this.dragError;
            a ||
              this.store.query.node(r.id).isDroppable(
                this.draggedNodes.map(function (e) {
                  return e.node;
                }),
                function (e) {
                  a = e;
                }
              );
            var i = r.data.nodes[o.index],
              d = i && this.store.query.node(i).get();
            return (
              (this.currentIndicator = {
                placement: G(G({}, o), { currentNode: d }),
                error: a,
              }),
              this.currentIndicator
            );
          }
        }
      }),
      (e.prototype.getIndicator = function () {
        return this.currentIndicator;
      }),
      (e.BORDER_OFFSET = 10),
      e
    );
  })(),
  _e = function (e, t, n) {
    if ((void 0 === n && (n = !1), 1 === t.length || n)) {
      var r = t[0].getBoundingClientRect(),
        o = r.width,
        a = r.height,
        i = t[0].cloneNode(!0);
      return (
        (i.style.position = 'fixed'),
        (i.style.left = '-100%'),
        (i.style.top = '-100%'),
        (i.style.width = o + 'px'),
        (i.style.height = a + 'px'),
        (i.style.pointerEvents = 'none'),
        document.body.appendChild(i),
        e.dataTransfer.setDragImage(i, 0, 0),
        i
      );
    }
    var d = document.createElement('div');
    return (
      (d.style.position = 'fixed'),
      (d.style.left = '-100%'),
      (d.style.top = '-100%'),
      (d.style.width = '100%'),
      (d.style.height = '100%'),
      (d.style.pointerEvents = 'none'),
      t.forEach(function (e) {
        var t = e.getBoundingClientRect(),
          n = t.width,
          r = t.height,
          o = t.top,
          a = t.left,
          i = e.cloneNode(!0);
        (i.style.position = 'absolute'),
          (i.style.left = a + 'px'),
          (i.style.top = o + 'px'),
          (i.style.width = n + 'px'),
          (i.style.height = r + 'px'),
          d.appendChild(i);
      }),
      document.body.appendChild(d),
      e.dataTransfer.setDragImage(d, e.clientX, e.clientY),
      d
    );
  },
  Fe = (function (e) {
    function t() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return (t.positioner = null), (t.currentSelectedElementIds = []), t;
    }
    return (
      Y(t, e),
      (t.prototype.onDisable = function () {
        this.options.store.actions.clearEvents();
      }),
      (t.prototype.handlers = function () {
        var e = this,
          n = this.options.store;
        return {
          connect: function (t, r) {
            return (
              n.actions.setDOM(r, t),
              e.reflect(function (e) {
                e.select(t, r), e.hover(t, r), e.drop(t, r);
              })
            );
          },
          select: function (t, r) {
            var o = e.addCraftEventListener(t, 'mousedown', function (t) {
                t.craft.stopPropagation();
                var o = [];
                if (r) {
                  var a = n.query,
                    i = a.getEvent('selected').all();
                  (e.options.isMultiSelectEnabled(t) || i.includes(r)) &&
                    (o = i.filter(function (e) {
                      var t = a.node(e).descendants(!0),
                        n = a.node(e).ancestors(!0);
                      return !t.includes(r) && !n.includes(r);
                    })),
                    o.includes(r) || o.push(r);
                }
                n.actions.setNodeEvent('selected', o);
              }),
              a = e.addCraftEventListener(t, 'click', function (t) {
                t.craft.stopPropagation();
                var o = n.query.getEvent('selected').all(),
                  a = e.options.isMultiSelectEnabled(t),
                  i = e.currentSelectedElementIds.includes(r),
                  d = U(o);
                a && i
                  ? (d.splice(d.indexOf(r), 1),
                    n.actions.setNodeEvent('selected', d))
                  : !a &&
                    o.length > 1 &&
                    n.actions.setNodeEvent('selected', (d = [r])),
                  (e.currentSelectedElementIds = d);
              });
            return function () {
              o(), a();
            };
          },
          hover: function (t, r) {
            var o = e.addCraftEventListener(t, 'mouseover', function (e) {
              e.craft.stopPropagation(), n.actions.setNodeEvent('hovered', r);
            });
            return function () {
              o();
            };
          },
          drop: function (t, r) {
            var o = e.addCraftEventListener(t, 'dragover', function (t) {
                if (
                  (t.craft.stopPropagation(), t.preventDefault(), e.positioner)
                ) {
                  var o = e.positioner.computeIndicator(
                    r,
                    t.clientX,
                    t.clientY
                  );
                  o && n.actions.setIndicator(o);
                }
              }),
              a = e.addCraftEventListener(t, 'dragenter', function (e) {
                e.craft.stopPropagation(), e.preventDefault();
              });
            return function () {
              a(), o();
            };
          },
          drag: function (t, r) {
            if (!n.query.node(r).isDraggable()) return function () {};
            t.setAttribute('draggable', 'true');
            var o = e.addCraftEventListener(t, 'dragstart', function (t) {
                t.craft.stopPropagation();
                var o = n.actions,
                  a = n.query.getEvent('selected').all(),
                  i = e.options.isMultiSelectEnabled(t);
                e.currentSelectedElementIds.includes(r) ||
                  ((a = i ? U(a, [r]) : [r]),
                  n.actions.setNodeEvent('selected', a)),
                  o.setNodeEvent('dragged', a),
                  (e.dragTarget = { type: 'existing', nodes: a }),
                  (e.positioner = new Ae(e.options.store, e.dragTarget));
              }),
              a = e.addCraftEventListener(t, 'dragend', function (t) {
                t.craft.stopPropagation(),
                  e.dropElement(function (e, t) {
                    'new' !== e.type &&
                      n.actions.move(
                        e.nodes,
                        t.placement.parent.id,
                        t.placement.index +
                          ('after' === t.placement.where ? 1 : 0)
                      );
                  });
              });
            return function () {
              t.setAttribute('draggable', 'false'), o(), a();
            };
          },
          create: function (r, o, a) {
            r.setAttribute('draggable', 'true');
            var i = e.addCraftEventListener(r, 'dragstart', function (r) {
                var a;
                if ((r.craft.stopPropagation(), 'function' == typeof o)) {
                  var i = o();
                  a = L.isValidElement(i)
                    ? n.query.parseReactElement(i).toNodeTree()
                    : i;
                } else a = n.query.parseReactElement(o).toNodeTree();
                (e.draggedElementShadow = _e(
                  r,
                  [r.currentTarget],
                  t.forceSingleDragShadow
                )),
                  (e.dragTarget = { type: 'new', tree: a }),
                  (e.positioner = new Ae(e.options.store, e.dragTarget));
              }),
              d = e.addCraftEventListener(r, 'dragend', function (t) {
                t.craft.stopPropagation(),
                  e.dropElement(function (e, t) {
                    'existing' !== e.type &&
                      (n.actions.addNodeTree(
                        e.tree,
                        t.placement.parent.id,
                        t.placement.index +
                          ('after' === t.placement.where ? 1 : 0)
                      ),
                      a && $(a.onCreate) && a.onCreate(e.tree));
                  });
              });
            return function () {
              r.removeAttribute('draggable'), i(), d();
            };
          },
          attach: function (r, o, a) {
            var i = a.onDragStart,
              d = a.onDragEnd;
            r.setAttribute('draggable', 'true');
            var s = e.addCraftEventListener(r, 'dragstart', function (r) {
                r.craft.stopPropagation();
                var a = n.getState().options.resolver,
                  d = n.query
                    .parseReactElement(L.createElement(a[o]))
                    .toNodeTree();
                (e.draggedElementShadow = _e(
                  r,
                  [r.currentTarget],
                  t.forceSingleDragShadow
                )),
                  (e.dragTarget = { type: 'new', tree: d }),
                  (e.positioner = new Ae(e.options.store, e.dragTarget)),
                  i();
              }),
              c = e.addCraftEventListener(r, 'dragend', function (t) {
                t.craft.stopPropagation(),
                  d(),
                  e.dropElement(function () {
                    return null;
                  });
              });
            return function () {
              r.setAttribute('draggable', 'false'), s(), c();
            };
          },
        };
      }),
      (t.prototype.dropElement = function (e) {
        var t = this.options.store;
        if (this.positioner) {
          var n = this.draggedElementShadow,
            r = this.positioner.getIndicator();
          this.dragTarget && r && !r.error && e(this.dragTarget, r),
            n &&
              (n.parentNode.removeChild(n), (this.draggedElementShadow = null)),
            (this.dragTarget = null),
            t.actions.setIndicator(null),
            t.actions.setNodeEvent('dragged', null),
            this.positioner.cleanup(),
            (this.positioner = null);
        }
      }),
      (t.forceSingleDragShadow = x() && I()),
      t
    );
  })(Le);
function ze(e, t, n, r) {
  void 0 === r && (r = 2);
  var o = 0,
    a = 0,
    i = 0,
    d = 0,
    s = e.where;
  return (
    n
      ? n.inFlow
        ? ((i = n.outerWidth),
          (d = r),
          (o = 'before' === s ? n.top : n.bottom),
          (a = n.left))
        : ((i = r),
          (d = n.outerHeight),
          (o = n.top),
          (a = 'before' === s ? n.left : n.left + n.outerWidth))
      : t &&
        ((o = t.top + t.padding.top),
        (a = t.left + t.padding.left),
        (i =
          t.outerWidth -
          t.padding.right -
          t.padding.left -
          t.margin.left -
          t.margin.right),
        (d = r)),
    { top: o + 'px', left: a + 'px', width: i + 'px', height: d + 'px' }
  );
}
var Me = function (e) {
    var t = e.show,
      n = void 0 === t || t,
      r = M(!0),
      o = z(null)[1],
      a = re(function (e) {
        return {
          indicator: e.indicator,
          indicatorOptions: e.options.indicator,
          enabled: e.options.enabled,
        };
      }),
      i = a.indicator,
      d = a.indicatorOptions,
      s = a.enabled,
      c = ne();
    return (
      F(
        function () {
          c && (s ? c.enable() : c.disable());
        },
        [s, c]
      ),
      F(
        function () {
          r.current ? (r.current = !1) : o(Date.now());
        },
        [n]
      ),
      n && i
        ? L.createElement(S, {
            style: G(
              G(
                {},
                ze(
                  i.placement,
                  w(i.placement.parent.dom),
                  i.placement.currentNode && w(i.placement.currentNode.dom),
                  d.thickness
                )
              ),
              {
                backgroundColor: i.error ? d.error : d.success,
                transition: d.transition || '0.2s ease-in',
              }
            ),
            parentDom: i.placement.parent.dom,
          })
        : null
    );
  },
  Be = function (e) {
    var t = e.children,
      n = e.showIndicator,
      r = void 0 === n || n,
      o = A(ee),
      a = _(
        function () {
          return o.query.getOptions().handlers(o);
        },
        [o]
      );
    return a
      ? L.createElement(
          te.Provider,
          { value: a },
          L.createElement(Me, { show: r }),
          t
        )
      : null;
  },
  He = {
    nodes: {},
    events: { dragged: new Set(), selected: new Set(), hovered: new Set() },
    indicator: null,
    handlers: null,
    options: {
      onNodesChange: function () {
        return null;
      },
      onRender: function (e) {
        return e.render;
      },
      onBeforeMoveEnd: function () {
        return null;
      },
      resolver: {},
      enabled: !0,
      indicator: { error: 'red', success: 'rgb(98, 196, 98)' },
      handlers: function (e) {
        return new Fe({
          store: e,
          isMultiSelectEnabled: function (e) {
            return !!e.metaKey;
          },
        });
      },
      normalizeNodes: function () {},
    },
  },
  We = {
    methods: function (e, t) {
      return G(
        G(
          {},
          (function (e, t) {
            var n = function (t, n, o) {
                var a = function (n, r) {
                  var o = t.nodes[n];
                  'string' != typeof o.data.type &&
                    W(
                      e.options.resolver[o.data.name],
                      f.replace('%node_type%', '' + o.data.type.name)
                    ),
                    (e.nodes[n] = G(G({}, o), {
                      data: G(G({}, o.data), { parent: r }),
                    })),
                    o.data.nodes.length > 0 &&
                      (delete e.nodes[n].data.props.children,
                      o.data.nodes.forEach(function (e) {
                        return a(e, o.id);
                      })),
                    Object.values(o.data.linkedNodes).forEach(function (e) {
                      return a(e, o.id);
                    });
                };
                if ((a(t.rootNodeId, n), n)) {
                  var i = r(n);
                  if ('child' !== o.type)
                    i.data.linkedNodes[o.id] = t.rootNodeId;
                  else {
                    var s = o.index;
                    null != s
                      ? i.data.nodes.splice(s, 0, t.rootNodeId)
                      : i.data.nodes.push(t.rootNodeId);
                  }
                } else
                  W(
                    t.rootNodeId === d,
                    'Cannot add non-root Node without a parent'
                  );
              },
              r = function (t) {
                W(t, u);
                var n = e.nodes[t];
                return W(n, s), n;
              },
              a = function (t) {
                var n = e.nodes[t],
                  r = e.nodes[n.data.parent];
                if (
                  (n.data.nodes &&
                    U(n.data.nodes).forEach(function (e) {
                      return a(e);
                    }),
                  n.data.linkedNodes &&
                    Object.values(n.data.linkedNodes).map(function (e) {
                      return a(e);
                    }),
                  r.data.nodes.includes(t))
                ) {
                  var o = r.data.nodes;
                  o.splice(o.indexOf(t), 1);
                } else {
                  var i = Object.keys(r.data.linkedNodes).find(function (e) {
                    return r.data.linkedNodes[e] === e;
                  });
                  i && delete r.data.linkedNodes[i];
                }
                !(function (e, t) {
                  Object.keys(e.events).forEach(function (n) {
                    var r = e.events[n];
                    r &&
                      r.has &&
                      r.has(t) &&
                      (e.events[n] = new Set(
                        Array.from(r).filter(function (e) {
                          return t !== e;
                        })
                      ));
                  });
                })(e, t),
                  delete e.nodes[t];
              };
            return {
              addLinkedNodeFromTree: function (e, t, o) {
                var i = r(t).data.linkedNodes[o];
                i && a(i), n(e, t, { type: 'linked', id: o });
              },
              add: function (e, t, r) {
                var a = [e];
                Array.isArray(e) &&
                  (o('actions.add(node: Node[])', {
                    suggest: 'actions.add(node: Node)',
                  }),
                  (a = e)),
                  a.forEach(function (e) {
                    var o;
                    n(
                      { nodes: ((o = {}), (o[e.id] = e), o), rootNodeId: e.id },
                      t,
                      { type: 'child', index: r }
                    );
                  });
              },
              addNodeTree: function (e, t, r) {
                n(e, t, { type: 'child', index: r });
              },
              delete: function (n) {
                be(e.nodes, n, { existOnly: !0, idOnly: !0 }).forEach(function (
                  e
                ) {
                  var n = e.node;
                  W(!t.node(n.id).isTopLevelNode(), c), a(n.id);
                });
              },
              deserialize: function (e) {
                var n = 'string' == typeof e ? JSON.parse(e) : e,
                  r = Object.keys(n).map(function (e) {
                    var r = e;
                    return (
                      e === l && (r = d),
                      [
                        r,
                        t.parseSerializedNode(n[e]).toNode(function (e) {
                          return (e.id = r);
                        }),
                      ]
                    );
                  });
                this.replaceNodes(Oe(r));
              },
              move: function (n, r, o) {
                var a = be(e.nodes, n, { existOnly: !0 }),
                  i = e.nodes[r],
                  d = new Set();
                a.forEach(function (n, a) {
                  var s = n.node,
                    c = s.id,
                    u = s.data.parent;
                  t.node(r).isDroppable([c], function (e) {
                    throw new Error(e);
                  }),
                    e.options.onBeforeMoveEnd(s, i, e.nodes[u]);
                  var l = e.nodes[u].data.nodes;
                  d.add(l);
                  var f = l.indexOf(c);
                  (l[f] = '$$'),
                    i.data.nodes.splice(o + a, 0, c),
                    (e.nodes[c].data.parent = r);
                }),
                  d.forEach(function (e) {
                    var t = e.length;
                    U(e)
                      .reverse()
                      .forEach(function (n, r) {
                        '$$' === n && e.splice(t - 1 - r, 1);
                      });
                  });
              },
              replaceNodes: function (t) {
                this.clearEvents(), (e.nodes = t);
              },
              clearEvents: function () {
                this.setNodeEvent('selected', null),
                  this.setNodeEvent('hovered', null),
                  this.setNodeEvent('dragged', null),
                  this.setIndicator(null);
              },
              reset: function () {
                this.clearEvents(), this.replaceNodes({});
              },
              setOptions: function (t) {
                t(e.options);
              },
              setNodeEvent: function (t, n) {
                if (
                  (e.events[t].forEach(function (n) {
                    e.nodes[n] && (e.nodes[n].events[t] = !1);
                  }),
                  (e.events[t] = new Set()),
                  n)
                ) {
                  var r = be(e.nodes, n, { idOnly: !0, existOnly: !0 }),
                    o = new Set(
                      r.map(function (e) {
                        return e.node.id;
                      })
                    );
                  o.forEach(function (n) {
                    e.nodes[n].events[t] = !0;
                  }),
                    (e.events[t] = o);
                }
              },
              setCustom: function (t, n) {
                be(e.nodes, t, { idOnly: !0, existOnly: !0 }).forEach(function (
                  t
                ) {
                  return n(e.nodes[t.node.id].data.custom);
                });
              },
              setDOM: function (t, n) {
                e.nodes[t] && (e.nodes[t].dom = n);
              },
              setIndicator: function (t) {
                (t &&
                  (!t.placement.parent.dom ||
                    (t.placement.currentNode &&
                      !t.placement.currentNode.dom))) ||
                  (e.indicator = t);
              },
              setHidden: function (t, n) {
                e.nodes[t].data.hidden = n;
              },
              setProp: function (t, n) {
                be(e.nodes, t, { idOnly: !0, existOnly: !0 }).forEach(function (
                  t
                ) {
                  return n(e.nodes[t.node.id].data.props);
                });
              },
              selectNode: function (t) {
                if (t) {
                  var n = be(e.nodes, t, { idOnly: !0, existOnly: !0 });
                  this.setNodeEvent(
                    'selected',
                    n.map(function (e) {
                      return e.node.id;
                    })
                  );
                } else this.setNodeEvent('selected', null);
                this.setNodeEvent('hovered', null);
              },
            };
          })(e, t)
        ),
        {
          setState: function (t) {
            var n = K(this, ['history']);
            t(e, n);
          },
        }
      );
    },
    ignoreHistoryForActions: [
      'setDOM',
      'setNodeEvent',
      'selectNode',
      'clearEvents',
      'setOptions',
      'setIndicator',
    ],
    normalizeHistory: function (e) {
      Object.keys(e.events).forEach(function (t) {
        Array.from(e.events[t] || []).forEach(function (n) {
          e.nodes[n] || e.events[t].delete(n);
        });
      }),
        Object.keys(e.nodes).forEach(function (t) {
          var n = e.nodes[t];
          Object.keys(n.events).forEach(function (t) {
            n.events[t] &&
              e.events[t] &&
              !e.events[t].has(n.id) &&
              (n.events[t] = !1);
          });
        });
    },
  },
  $e = function (e, t) {
    return j(We, G(G({}, He), { options: G(G({}, He.options), e) }), Pe, t);
  },
  Je = function (e) {
    var t = e.children,
      n = e.onRender,
      r = e.onNodesChange,
      o = e.onBeforeMoveEnd,
      a = e.resolver,
      i = e.enabled,
      d = e.indicator,
      s = e.showIndicator,
      c = void 0 === s || s;
    void 0 !== a && W('object' == typeof a && !Array.isArray(a), q);
    var u = _(
        function () {
          return J(
            {
              onRender: n,
              onNodesChange: r,
              onBeforeMoveEnd: o,
              resolver: a,
              enabled: i,
              indicator: d,
            },
            function (e) {
              return void 0 !== e;
            }
          );
        },
        [i, d, o, r, n, a]
      ),
      l = $e(u, function (e, t, n, r, o) {
        if (n)
          for (
            var a = n.patches, i = K(n, ['patches']), d = 0;
            d < a.length;
            d++
          ) {
            var s = a[d].path,
              c = s.length > 2 && 'nodes' === s[0] && 'data' === s[2];
            if (
              ([P.IGNORE, P.THROTTLE].includes(i.type) &&
                i.params &&
                (i.type = i.params[0]),
              ['setState', 'deserialize'].includes(i.type) || c)
            ) {
              o(function (n) {
                e.options.normalizeNodes &&
                  e.options.normalizeNodes(n, t, i, r);
              });
              break;
            }
          }
      });
    return (
      F(
        function () {
          l &&
            u &&
            l.actions.setOptions(function (e) {
              Object.assign(e, u);
            });
        },
        [l, u]
      ),
      F(
        function () {
          l.subscribe(
            function (e) {
              return { json: l.query.serialize() };
            },
            function () {
              l.query.getOptions().onNodesChange(l.query);
            }
          );
        },
        [l]
      ),
      l
        ? L.createElement(
            ee.Provider,
            { value: l },
            L.createElement(Be, { showIndicator: c }, t)
          )
        : null
    );
  },
  Ve = function (e) {
    var t = e.events,
      n = e.data,
      r = n.nodes,
      o = n.linkedNodes,
      a = K(e, ['events', 'data']),
      i = Se(V(e));
    return {
      node: (e = G(G(G({}, i), a), {
        events: G(G({}, i.events), t),
        dom: e.dom || i.dom,
      })),
      childNodes: r,
      linkedNodes: o,
    };
  },
  Xe = function (e, t) {
    var n = t.nodes,
      r = K(t, ['nodes']),
      o = e.nodes,
      a = K(e, ['nodes']);
    expect(a).toEqual(r);
    var i = Object.keys(n).reduce(function (e, t) {
        var r = K(n[t], ['_hydrationTimestamp', 'rules']);
        return (e[t] = r), e;
      }, {}),
      d = Object.keys(o).reduce(function (e, t) {
        var n = K(o[t], ['_hydrationTimestamp', 'rules']);
        return (e[t] = n), e;
      }, {});
    expect(d).toEqual(i);
  },
  Ye = function (e) {
    var t = {},
      n = function (e) {
        var r = Ve(e),
          o = r.node,
          a = r.childNodes,
          i = r.linkedNodes;
        (t[o.id] = o),
          a &&
            a.forEach(function (e, r) {
              var a = Ve(e),
                i = a.node,
                d = a.childNodes,
                s = a.linkedNodes;
              (i.data.parent = o.id),
                (t[i.id] = i),
                (o.data.nodes[r] = i.id),
                n(
                  G(G({}, i), {
                    data: G(G({}, i.data), {
                      nodes: d || [],
                      linkedNodes: s || {},
                    }),
                  })
                );
            }),
          i &&
            Object.keys(i).forEach(function (e) {
              var r = Ve(i[e]),
                a = r.node,
                d = r.childNodes,
                s = r.linkedNodes;
              (o.data.linkedNodes[e] = a.id),
                (a.data.parent = o.id),
                (t[a.id] = a),
                n(
                  G(G({}, a), {
                    data: G(G({}, a.data), {
                      nodes: d || [],
                      linkedNodes: s || {},
                    }),
                  })
                );
            });
      };
    return n(e), t;
  },
  Ge = function (e) {
    void 0 === e && (e = {});
    var t = e.nodes,
      n = e.events;
    return G(G(G({}, He), e), {
      nodes: t ? Ye(t) : {},
      events: G(G({}, He.events), n || {}),
    });
  };
export {
  We as ActionMethodsWithConfig,
  Canvas,
  Le as CoreEventHandlers,
  Fe as DefaultEventHandlers,
  Re as DerivedCoreEventHandlers,
  Je as Editor,
  fe as Element,
  Be as Events,
  ge as Frame,
  ce as NodeElement,
  De as NodeHelpers,
  Z as NodeProvider,
  ve as NodeSelectorType,
  Pe as QueryMethods,
  Ne as connectEditor,
  Ee as connectNode,
  Ye as createTestNodes,
  Ge as createTestState,
  ue as defaultElementProps,
  pe as deprecateCanvasComponent,
  He as editorInitialState,
  le as elementPropToNodeData,
  Xe as expectEditorState,
  ke as serializeNode,
  me as useEditor,
  $e as useEditorStore,
  ne as useEventHandler,
  ae as useNode,
};
