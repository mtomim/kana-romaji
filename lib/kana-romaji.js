"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toRomaji = toRomaji;
var _GlobalStrategies;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var map = {
  consonant: {
    k: _toConsumableArray("かきくけこ"),
    s: _toConsumableArray("さすせそ"),
    sh: ["し"],
    t: _toConsumableArray("たてと"),
    ts: ["つ"],
    ch: ["ち"],
    n: _toConsumableArray("なにぬねのん"),
    h: _toConsumableArray("はひへほ"),
    m: _toConsumableArray("まみむめも"),
    y: _toConsumableArray("やゆよ"),
    ySupPre: _toConsumableArray("ゃゅょ"),
    supPre: _toConsumableArray("ぁぃぅぇぉゎ"),
    r: _toConsumableArray("らりるれろ"),
    w: _toConsumableArray("わを"),
    f: ["ふ"],
    p: _toConsumableArray("ぱぴぷぺぽ"),
    b: _toConsumableArray("ばびぶべぼ"),
    j: _toConsumableArray("じぢ"),
    z: _toConsumableArray("ざずぜぞ"),
    d: _toConsumableArray("だでど"),
    g: _toConsumableArray("がぎぐげご"),
    repeatNextConsonant: ["っ"],
    v: ["ゔ"]
  },
  vowel: {
    a: _toConsumableArray("あかがさざただなはばぱまやらわぁゃゎ"),
    i: _toConsumableArray("いきぎしじちぢにひびぴみりぃ"),
    u: _toConsumableArray("うくぐすずつづぬふぶぷむゆるぅゅゔ"),
    e: _toConsumableArray("えけげせぜてでねへべぺめれぇ"),
    o: _toConsumableArray("おこごそぞとどのほぼぽもよろをょぉ"),
    "-": ["ー"]
  },
  longVowel: {
    a: 'ā',
    i: 'ī',
    u: 'ū',
    e: 'ē',
    o: 'ō'
  }
};
var lowerKatakana = 0x30A1,
  upperKatakana = 0x30FB;
function isKatakana(ji) {
  var extended = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var code = ji.codePointAt(0);
  return code >= lowerKatakana && code < (extended ? 0x30FF : upperKatakana);
}
function isHiragana(ji) {
  var code = ji.codePointAt(0);
  return code >= 0x3041 && code <= 0x309F;
}
var noHiraganaCorrespondant = 'ヷヸヹヺ・ーヿ';
function convHiragana(ji) {
  if (isKatakana(ji) && !noHiraganaCorrespondant.includes(ji)) {
    return String.fromCharCode(ji.codePointAt(0) - 0x60);
  }
  return ji;
}
var SmallAiueoStrategies = /*#__PURE__*/function () {
  function SmallAiueoStrategies() {
    _classCallCheck(this, SmallAiueoStrategies);
  }
  return _createClass(SmallAiueoStrategies, null, [{
    key: "doWork",
    value: function doWork(previous, curr) {
      SmallAiueoStrategies.strategies.filter(function (strategy) {
        return strategy.matches(previous, curr.vowel);
      }).forEach(function (strategy) {
        return strategy.doWork(previous, curr);
      });
    }
  }]);
}();
_defineProperty(SmallAiueoStrategies, "strategies", [
// JE, CHE, SHE
{
  matches: function matches(previous, vowel) {
    return ['j', 'ch', 'sh'].includes(previous.consonant) && previous.vowel === 'i' && vowel === 'e';
  },
  doWork: function doWork(previous) {
    return delete previous.vowel;
  }
},
// DU, TU
{
  matches: function matches(previous, vowel) {
    return _toConsumableArray('td').includes(previous.consonant) && previous.vowel === 'o' && vowel === 'u';
  },
  doWork: function doWork(previous) {
    return delete previous.vowel;
  }
},
// DI, TI
{
  matches: function matches(previous, vowel) {
    return _toConsumableArray('td').includes(previous.consonant) && previous.vowel === 'e' && vowel === 'i';
  },
  doWork: function doWork(previous) {
    return delete previous.vowel;
  }
},
// SI
{
  matches: function matches(previous, vowel) {
    return ['s', 'z'].includes(previous.consonant) && previous.vowel === 'u' && vowel === 'i';
  },
  doWork: function doWork(previous) {
    return delete previous.vowel;
  }
},
// Fa, Fi, Fu, Fe, Fo, Va, Vi, Vu, Ve, Vo
{
  matches: function matches(previous, vowel) {
    return _toConsumableArray("fv").includes(previous.consonant);
  },
  doWork: function doWork(previous) {
    return delete previous.vowel;
  }
},
// YE
{
  matches: function matches(previous, vowel) {
    return previous.consonant === '' && previous.vowel === 'i' && vowel === 'e';
  },
  doWork: function doWork(previous) {
    return previous.vowel = 'y';
  }
},
// WO, WI, WE
{
  matches: function matches(previous, vowel) {
    return previous.consonant === '' && previous.vowel === 'u' && _toConsumableArray('oei').includes(vowel);
  },
  doWork: function doWork(previous) {
    return previous.vowel = 'w';
  }
},
// TWA
{
  matches: function matches(previous, vowel) {
    return previous.consonant === 't' && previous.vowel === 'o' && vowel !== 'u';
  },
  doWork: function doWork(previous) {
    return previous.vowel = 'w';
  }
},
// GWA, KWA
{
  matches: function matches(previous, vowel) {
    return ['k', 'g'].includes(previous.consonant) && previous.vowel === 'u' && vowel !== 'u';
  },
  doWork: function doWork(previous) {
    return previous.vowel = 'w';
  }
},
// HYE, BYE, PYE, KYE
{
  matches: function matches(previous, vowel) {
    return _toConsumableArray('bhkp').includes(previous.consonant) && previous.vowel === 'i' && vowel === 'e';
  },
  doWork: function doWork(previous) {
    return previous.vowel = 'y';
  }
},
// TSA, TSI, TSE, TSO
{
  matches: function matches(previous, vowel) {
    return previous.consonant === 'ts' && previous.vowel === 'u';
  },
  doWork: function doWork(previous) {
    return delete previous.vowel;
  }
}]);
var SmallYayuyoStrategies = /*#__PURE__*/function () {
  function SmallYayuyoStrategies() {
    _classCallCheck(this, SmallYayuyoStrategies);
  }
  return _createClass(SmallYayuyoStrategies, null, [{
    key: "doWork",
    value: function doWork(previous, curr) {
      curr.consonant = "y";
      if (!previous) {
        return;
      }
      SmallYayuyoStrategies.strategies.filter(function (strategy) {
        return strategy.matches(previous, curr.vowel);
      }).forEach(function (strategy) {
        return strategy.doWork(previous, curr);
      });
    }
  }]);
}();
_defineProperty(SmallYayuyoStrategies, "strategies", [{
  matches: function matches(previous, vowel) {
    return ["i", "e"].includes(previous.vowel);
  },
  doWork: function doWork(previous) {
    return delete previous.vowel;
  }
}, {
  matches: function matches(previous, vowel) {
    return _toConsumableArray("fv").includes(previous.consonant) && previous.vowel === "u";
  },
  doWork: function doWork(previous) {
    return delete previous.vowel;
  }
}, {
  matches: function matches(previous, vowel) {
    return ["sh", "ch", "j"].includes(previous.consonant);
  },
  doWork: function doWork(previous, curr) {
    return curr.consonant = "";
  }
}]);
var GlobalStrategies = /*#__PURE__*/_createClass(function GlobalStrategies() {
  _classCallCheck(this, GlobalStrategies);
});
/**
 * Hiragana is transformed into lower case output.
 * Katakana is transformed into UPPER case output.
 * ```js
 * toRomaji('ローマじ') // === 'RŌMAji';
 * ```
 * The sequences of same vowels and 'ou' output with prolonged vowel of the first.
 * The sequence of 'ei' is not represented with long 'e'.
 * ex)
 * - 'ちちゅうかい', 'chichūkai'
 * - 'ふりょう', 'furyō'
 * - 'しょうがくせい', 'shōgakusei'
 * 
 * Caveat: The rule to not consider as prolonged vowel sound
 * when the consecutive vowels are from separate Kanjis is not respected.
 * 
 * ex) 'きいはんとうのばあい'
 * - OK: 'kiihantōnobaai'
 * - Our _wrong_ output: 'kīhantōnobāi'
 * 
 * 'おかあさん'
 * - should be and is 'okāsan'
 * 
 * 'とおり'
 * - should be and is 'tōri'
 * @param kana The input with Hiragana/Katakana
 * @returns Romaji representation of the input
 */
_GlobalStrategies = GlobalStrategies;
_defineProperty(GlobalStrategies, "strategies", [{
  matches: function matches(prev, curr, next) {
    return curr.vowel === '-' && prev && !!prev.vowel || curr.vowel === (prev === null || prev === void 0 ? void 0 : prev.vowel) && !curr.consonant || curr.vowel === 'u' && !curr.consonant && (prev === null || prev === void 0 ? void 0 : prev.vowel) === 'o';
  },
  doWork: function doWork(prev, curr, next) {
    prev.vowel = map.longVowel[prev.vowel || ''];
    curr.vowel = undefined;
  }
}, {
  matches: function matches(prev, curr, next) {
    return curr.consonant === "supPre";
  },
  doWork: function doWork(prev, curr, next) {
    SmallAiueoStrategies.doWork(prev, curr);
    curr.consonant = "";
  }
}, {
  matches: function matches(prev, curr, next) {
    return curr.consonant === "ySupPre";
  },
  doWork: function doWork(prev, curr, next) {
    return SmallYayuyoStrategies.doWork(prev, curr);
  }
}, {
  matches: function matches(prev, curr, next) {
    return curr.consonant === "repeatNextConsonant";
  },
  doWork: function doWork(prev, curr, next) {
    curr.consonant = (next === null || next === void 0 ? void 0 : next.consonant.charAt(0)) || "";
    if ((next === null || next === void 0 ? void 0 : next.consonant) === "ch") {
      curr.consonant = "t";
    }
  }
}, {
  matches: function matches(prev, curr, next) {
    return curr.consonant === "n" && !curr.vowel;
  },
  doWork: function doWork(prev, curr, next) {
    if (next && (!next.consonant || next.consonant === 'y')) {
      curr.consonant = "n’";
    }
  }
}]);
_defineProperty(GlobalStrategies, "doWork", function (prev, curr, next) {
  return _GlobalStrategies.strategies.filter(function (strategy) {
    return strategy.matches(prev, curr, next);
  }).forEach(function (strategy) {
    return strategy.doWork(prev, curr, next);
  });
});
function toRomaji(kana) {
  return _toConsumableArray(kana).map(function (ji) {
    return {
      katakana: isKatakana(ji),
      ji: convHiragana(ji),
      "char": ji,
      through: !isKatakana(ji, true) && !isHiragana(ji)
    };
  }).map(function (_ref) {
    var ji = _ref.ji,
      katakana = _ref.katakana,
      through = _ref.through,
      _char = _ref["char"];
    return {
      consonant: Object.entries(map.consonant).filter(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
          v = _ref3[1];
        return v.includes(ji);
      }).map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 1),
          k = _ref5[0];
        return k;
      }).join(),
      vowel: Object.entries(map.vowel).filter(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
          v = _ref7[1];
        return v.includes(ji);
      }).map(function (_ref8) {
        var _ref9 = _slicedToArray(_ref8, 1),
          k = _ref9[0];
        return k;
      }).join(),
      katakana: katakana,
      through: through,
      "char": _char
    };
  }).reduce(function (target, curr, i, arr) {
    var next = arr[i + 1];
    var previous = target[i - 1];
    GlobalStrategies.doWork(previous, curr, next);
    target.push(curr);
    return target;
  }, []).map(function (_ref10) {
    var consonant = _ref10.consonant,
      vowel = _ref10.vowel,
      katakana = _ref10.katakana,
      through = _ref10.through,
      _char2 = _ref10["char"];
    if (through) {
      return _char2;
    }
    if (katakana) {
      return (consonant + (vowel || "")).toUpperCase();
    }
    return consonant + (vowel || "");
  }).join("");
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtYXAiLCJjb25zb25hbnQiLCJrIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwicyIsInNoIiwidCIsInRzIiwiY2giLCJuIiwiaCIsIm0iLCJ5IiwieVN1cFByZSIsInN1cFByZSIsInIiLCJ3IiwiZiIsInAiLCJiIiwiaiIsInoiLCJkIiwiZyIsInJlcGVhdE5leHRDb25zb25hbnQiLCJ2Iiwidm93ZWwiLCJhIiwiaSIsInUiLCJlIiwibyIsImxvbmdWb3dlbCIsImxvd2VyS2F0YWthbmEiLCJ1cHBlckthdGFrYW5hIiwiaXNLYXRha2FuYSIsImppIiwiZXh0ZW5kZWQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJjb2RlIiwiY29kZVBvaW50QXQiLCJpc0hpcmFnYW5hIiwibm9IaXJhZ2FuYUNvcnJlc3BvbmRhbnQiLCJjb252SGlyYWdhbmEiLCJpbmNsdWRlcyIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIlNtYWxsQWl1ZW9TdHJhdGVnaWVzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJkb1dvcmsiLCJwcmV2aW91cyIsImN1cnIiLCJzdHJhdGVnaWVzIiwiZmlsdGVyIiwic3RyYXRlZ3kiLCJtYXRjaGVzIiwiZm9yRWFjaCIsIl9kZWZpbmVQcm9wZXJ0eSIsIlNtYWxsWWF5dXlvU3RyYXRlZ2llcyIsIkdsb2JhbFN0cmF0ZWdpZXMiLCJfR2xvYmFsU3RyYXRlZ2llcyIsInByZXYiLCJuZXh0IiwiY2hhckF0IiwidG9Sb21hamkiLCJrYW5hIiwia2F0YWthbmEiLCJ0aHJvdWdoIiwiX3JlZiIsImNoYXIiLCJPYmplY3QiLCJlbnRyaWVzIiwiX3JlZjIiLCJfcmVmMyIsIl9zbGljZWRUb0FycmF5IiwiX3JlZjQiLCJfcmVmNSIsImpvaW4iLCJfcmVmNiIsIl9yZWY3IiwiX3JlZjgiLCJfcmVmOSIsInJlZHVjZSIsInRhcmdldCIsImFyciIsInB1c2giLCJfcmVmMTAiLCJ0b1VwcGVyQ2FzZSJdLCJzb3VyY2VzIjpbIi4uL3NyYy9rYW5hLXJvbWFqaS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtYXAgPSB7XG4gIGNvbnNvbmFudDoge1xuICAgIGs6IFsuLi5cIuOBi+OBjeOBj+OBkeOBk1wiXSxcbiAgICBzOiBbLi4uXCLjgZXjgZnjgZvjgZ1cIl0sXG4gICAgc2g6IFtcIuOBl1wiLF0sXG4gICAgdDogWy4uLlwi44Gf44Gm44GoXCJdLFxuICAgIHRzOiBbXCLjgaRcIixdLFxuICAgIGNoOiBbXCLjgaFcIixdLFxuICAgIG46IFsuLi5cIuOBquOBq+OBrOOBreOBruOCk1wiXSxcbiAgICBoOiBbLi4uXCLjga/jgbLjgbjjgbtcIl0sXG4gICAgbTogWy4uLlwi44G+44G/44KA44KB44KCXCJdLFxuICAgIHk6IFsuLi5cIuOChOOChuOCiFwiXSxcbiAgICB5U3VwUHJlOiBbLi4uXCLjgoPjgoXjgodcIl0sXG4gICAgc3VwUHJlOiBbLi4uXCLjgYHjgYPjgYXjgYfjgYnjgo5cIl0sXG4gICAgcjogWy4uLlwi44KJ44KK44KL44KM44KNXCJdLFxuICAgIHc6IFsuLi5cIuOCj+OCklwiLF0sXG4gICAgZjogW1wi44G1XCJdLFxuICAgIHA6IFsuLi5cIuOBseOBtOOBt+OBuuOBvVwiXSxcbiAgICBiOiBbLi4uXCLjgbDjgbPjgbbjgbnjgbxcIl0sXG4gICAgajogWy4uLlwi44GY44GiXCJdLFxuICAgIHo6IFsuLi5cIuOBluOBmuOBnOOBnlwiXSxcbiAgICBkOiBbLi4uXCLjgaDjgafjgalcIl0sXG4gICAgZzogWy4uLlwi44GM44GO44GQ44GS44GUXCJdLFxuICAgIHJlcGVhdE5leHRDb25zb25hbnQ6IFtcIuOBo1wiXSxcbiAgICB2OiBbXCLjgpRcIl0sXG4gIH0sXG4gIHZvd2VsOiB7XG4gICAgYTogWy4uLlwi44GC44GL44GM44GV44GW44Gf44Gg44Gq44Gv44Gw44Gx44G+44KE44KJ44KP44GB44KD44KOXCJdLFxuICAgIGk6IFsuLi5cIuOBhOOBjeOBjuOBl+OBmOOBoeOBouOBq+OBsuOBs+OBtOOBv+OCiuOBg1wiXSxcbiAgICB1OiBbLi4uXCLjgYbjgY/jgZDjgZnjgZrjgaTjgaXjgazjgbXjgbbjgbfjgoDjgobjgovjgYXjgoXjgpRcIl0sXG4gICAgZTogWy4uLlwi44GI44GR44GS44Gb44Gc44Gm44Gn44Gt44G444G544G644KB44KM44GHXCJdLFxuICAgIG86IFsuLi5cIuOBiuOBk+OBlOOBneOBnuOBqOOBqeOBruOBu+OBvOOBveOCguOCiOOCjeOCkuOCh+OBiVwiXSxcbiAgICBcIi1cIjogW1wi44O8XCJdXG4gIH0sXG4gIGxvbmdWb3dlbDoge1xuICAgIGE6ICfEgScsXG4gICAgaTogJ8SrJyxcbiAgICB1OiAnxasnLFxuICAgIGU6ICfEkycsXG4gICAgbzogJ8WNJyxcbiAgfSBhcyB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9XG59O1xuXG5kZWNsYXJlIGludGVyZmFjZSB0ZW1wT2JqIHtcbiAgY29uc29uYW50OiBzdHJpbmcsXG4gIHZvd2VsPzogc3RyaW5nLFxuICBrYXRha2FuYTogYm9vbGVhbixcbiAgdGhyb3VnaDogYm9vbGVhbixcbiAgY2hhcjogc3RyaW5nLFxufVxuXG5jb25zdCBbbG93ZXJLYXRha2FuYSwgdXBwZXJLYXRha2FuYV0gPSBbMHgzMEExLCAweDMwRkJdO1xuXG5mdW5jdGlvbiBpc0thdGFrYW5hKGppOiBzdHJpbmcsIGV4dGVuZGVkID0gZmFsc2UpOiBib29sZWFuIHtcbiAgY29uc3QgY29kZSA9IGppLmNvZGVQb2ludEF0KDApO1xuICByZXR1cm4gY29kZSEgPj0gbG93ZXJLYXRha2FuYSAmJiBjb2RlISA8IChleHRlbmRlZCA/IDB4MzBGRiA6IHVwcGVyS2F0YWthbmEpO1xufVxuXG5mdW5jdGlvbiBpc0hpcmFnYW5hKGppOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgY29kZSA9IGppLmNvZGVQb2ludEF0KDApO1xuICByZXR1cm4gY29kZSEgPj0gMHgzMDQxICYmIGNvZGUhIDw9IDB4MzA5Rjtcbn1cblxuY29uc3Qgbm9IaXJhZ2FuYUNvcnJlc3BvbmRhbnQgPSAn44O344O444O544O644O744O844O/JztcblxuZnVuY3Rpb24gY29udkhpcmFnYW5hKGppOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoaXNLYXRha2FuYShqaSkgJiYgIW5vSGlyYWdhbmFDb3JyZXNwb25kYW50LmluY2x1ZGVzKGppKSkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGppLmNvZGVQb2ludEF0KDApISAtIDB4NjApO1xuICB9XG4gIHJldHVybiBqaTtcbn1cblxuaW50ZXJmYWNlIFN0cmF0ZWd5IHtcbiAgbWF0Y2hlczogKHByZXZpb3VzOiB0ZW1wT2JqLCB2b3dlbDogc3RyaW5nKSA9PiBib29sZWFuO1xuICBkb1dvcms6IChwcmV2aW91czogdGVtcE9iaiwgY3VycjogdGVtcE9iaikgPT4gdm9pZDtcbn1cblxuaW50ZXJmYWNlIEdsb2JhbFN0cmF0ZWd5IHtcbiAgbWF0Y2hlczogKHByZXY6IHRlbXBPYmosIGN1cnI6IHRlbXBPYmosIG5leHQ6IHRlbXBPYmopID0+IGJvb2xlYW47XG4gIGRvV29yazogKHByZXY6IHRlbXBPYmosIGN1cnI6IHRlbXBPYmosIG5leHQ6IHRlbXBPYmopID0+IHZvaWQ7XG59XG5cbmNsYXNzIFNtYWxsQWl1ZW9TdHJhdGVnaWVzIHtcbiAgc3RhdGljIHN0cmF0ZWdpZXM6IFN0cmF0ZWd5W10gPSBbXG4gICAgLy8gSkUsIENIRSwgU0hFXG4gICAge1xuICAgICAgbWF0Y2hlczogKHByZXZpb3VzLCB2b3dlbCkgPT4gWydqJywgJ2NoJywgJ3NoJ10uaW5jbHVkZXMocHJldmlvdXMuY29uc29uYW50KSAmJiBwcmV2aW91cy52b3dlbCA9PT0gJ2knICYmIHZvd2VsID09PSAnZScsXG4gICAgICBkb1dvcms6IChwcmV2aW91cykgPT4gZGVsZXRlIHByZXZpb3VzLnZvd2VsLFxuICAgIH0sXG4gICAgLy8gRFUsIFRVXG4gICAge1xuICAgICAgbWF0Y2hlczogKHByZXZpb3VzLCB2b3dlbCkgPT4gWy4uLid0ZCddLmluY2x1ZGVzKHByZXZpb3VzLmNvbnNvbmFudCkgJiYgcHJldmlvdXMudm93ZWwgPT09ICdvJyAmJiB2b3dlbCA9PT0gJ3UnLFxuICAgICAgZG9Xb3JrOiAocHJldmlvdXMpID0+IGRlbGV0ZSBwcmV2aW91cy52b3dlbCxcbiAgICB9LFxuICAgIC8vIERJLCBUSVxuICAgIHtcbiAgICAgIG1hdGNoZXM6IChwcmV2aW91cywgdm93ZWwpID0+IFsuLi4ndGQnXS5pbmNsdWRlcyhwcmV2aW91cy5jb25zb25hbnQpICYmIHByZXZpb3VzLnZvd2VsID09PSAnZScgJiYgdm93ZWwgPT09ICdpJyxcbiAgICAgIGRvV29yazogKHByZXZpb3VzKSA9PiBkZWxldGUgcHJldmlvdXMudm93ZWwsXG4gICAgfSxcbiAgICAvLyBTSVxuICAgIHtcbiAgICAgIG1hdGNoZXM6IChwcmV2aW91cywgdm93ZWwpID0+IFsncycsICd6J10uaW5jbHVkZXMocHJldmlvdXMuY29uc29uYW50KSAmJiBwcmV2aW91cy52b3dlbCA9PT0gJ3UnICYmIHZvd2VsID09PSAnaScsXG4gICAgICBkb1dvcms6IChwcmV2aW91cykgPT4gZGVsZXRlIHByZXZpb3VzLnZvd2VsLFxuICAgIH0sXG4gICAgLy8gRmEsIEZpLCBGdSwgRmUsIEZvLCBWYSwgVmksIFZ1LCBWZSwgVm9cbiAgICB7XG4gICAgICBtYXRjaGVzOiAocHJldmlvdXMsIHZvd2VsKSA9PiBbLi4uXCJmdlwiXS5pbmNsdWRlcyhwcmV2aW91cy5jb25zb25hbnQpLFxuICAgICAgZG9Xb3JrOiAocHJldmlvdXMpID0+IGRlbGV0ZSBwcmV2aW91cy52b3dlbCxcbiAgICB9LFxuICAgIC8vIFlFXG4gICAge1xuICAgICAgbWF0Y2hlczogKHByZXZpb3VzLCB2b3dlbCkgPT4gcHJldmlvdXMuY29uc29uYW50ID09PSAnJyAmJiBwcmV2aW91cy52b3dlbCA9PT0gJ2knICYmIHZvd2VsID09PSAnZScsXG4gICAgICBkb1dvcms6IChwcmV2aW91cykgPT4gcHJldmlvdXMudm93ZWwgPSAneScsXG4gICAgfSxcbiAgICAvLyBXTywgV0ksIFdFXG4gICAge1xuICAgICAgbWF0Y2hlczogKHByZXZpb3VzLCB2b3dlbCkgPT4gcHJldmlvdXMuY29uc29uYW50ID09PSAnJyAmJiBwcmV2aW91cy52b3dlbCA9PT0gJ3UnICYmIFsuLi4nb2VpJ10uaW5jbHVkZXModm93ZWwpLFxuICAgICAgZG9Xb3JrOiAocHJldmlvdXMpID0+IHByZXZpb3VzLnZvd2VsID0gJ3cnLFxuICAgIH0sXG4gICAgLy8gVFdBXG4gICAge1xuICAgICAgbWF0Y2hlczogKHByZXZpb3VzLCB2b3dlbCkgPT4gcHJldmlvdXMuY29uc29uYW50ID09PSAndCcgJiYgcHJldmlvdXMudm93ZWwgPT09ICdvJyAmJiB2b3dlbCAhPT0gJ3UnLFxuICAgICAgZG9Xb3JrOiAocHJldmlvdXMpID0+IHByZXZpb3VzLnZvd2VsID0gJ3cnLFxuICAgIH0sXG4gICAgLy8gR1dBLCBLV0FcbiAgICB7XG4gICAgICBtYXRjaGVzOiAocHJldmlvdXMsIHZvd2VsKSA9PiBbJ2snLCdnJ10uaW5jbHVkZXMocHJldmlvdXMuY29uc29uYW50KSAmJiBwcmV2aW91cy52b3dlbCA9PT0gJ3UnICYmIHZvd2VsICE9PSAndScsXG4gICAgICBkb1dvcms6IChwcmV2aW91cykgPT4gcHJldmlvdXMudm93ZWwgPSAndycsXG4gICAgfSxcbiAgICAvLyBIWUUsIEJZRSwgUFlFLCBLWUVcbiAgICB7XG4gICAgICBtYXRjaGVzOiAocHJldmlvdXMsIHZvd2VsKSA9PiBbLi4uJ2Joa3AnXS5pbmNsdWRlcyhwcmV2aW91cy5jb25zb25hbnQpICYmIHByZXZpb3VzLnZvd2VsID09PSAnaScgJiYgdm93ZWwgPT09ICdlJyxcbiAgICAgIGRvV29yazogKHByZXZpb3VzKSA9PiBwcmV2aW91cy52b3dlbCA9ICd5JyxcbiAgICB9LFxuICAgIC8vIFRTQSwgVFNJLCBUU0UsIFRTT1xuICAgIHtcbiAgICAgIG1hdGNoZXM6IChwcmV2aW91cywgdm93ZWwpID0+IHByZXZpb3VzLmNvbnNvbmFudCA9PT0gJ3RzJyAmJiBwcmV2aW91cy52b3dlbCA9PT0gJ3UnLFxuICAgICAgZG9Xb3JrOiAocHJldmlvdXMpID0+IGRlbGV0ZSBwcmV2aW91cy52b3dlbCxcbiAgICB9LFxuICBdO1xuICBzdGF0aWMgZG9Xb3JrKHByZXZpb3VzOiB0ZW1wT2JqLCBjdXJyOiB0ZW1wT2JqKTogdm9pZCB7XG4gICAgU21hbGxBaXVlb1N0cmF0ZWdpZXMuc3RyYXRlZ2llc1xuICAgICAgLmZpbHRlcihzdHJhdGVneSA9PiBzdHJhdGVneS5tYXRjaGVzKHByZXZpb3VzLCBjdXJyLnZvd2VsISkpXG4gICAgICAuZm9yRWFjaChzdHJhdGVneSA9PiBzdHJhdGVneS5kb1dvcmsocHJldmlvdXMsIGN1cnIpKTtcbiAgfVxufVxuXG5jbGFzcyBTbWFsbFlheXV5b1N0cmF0ZWdpZXMge1xuICBzdGF0aWMgc3RyYXRlZ2llczogU3RyYXRlZ3lbXSA9IFtcbiAgICB7XG4gICAgICBtYXRjaGVzOiAocHJldmlvdXMsIHZvd2VsKSA9PiBbXCJpXCIsIFwiZVwiXS5pbmNsdWRlcyhwcmV2aW91cy52b3dlbCEpLFxuICAgICAgZG9Xb3JrOiAocHJldmlvdXMpID0+IGRlbGV0ZSBwcmV2aW91cy52b3dlbCxcbiAgICB9LFxuICAgIHtcbiAgICAgIG1hdGNoZXM6IChwcmV2aW91cywgdm93ZWwpID0+IFsuLi5cImZ2XCJdLmluY2x1ZGVzKHByZXZpb3VzLmNvbnNvbmFudCkgJiYgcHJldmlvdXMudm93ZWwgPT09IFwidVwiLFxuICAgICAgZG9Xb3JrOiAocHJldmlvdXMpID0+IGRlbGV0ZSBwcmV2aW91cy52b3dlbCxcbiAgICB9LFxuICAgIHtcbiAgICAgIG1hdGNoZXM6IChwcmV2aW91cywgdm93ZWwpID0+IFtcInNoXCIsIFwiY2hcIiwgXCJqXCJdLmluY2x1ZGVzKHByZXZpb3VzLmNvbnNvbmFudCksXG4gICAgICBkb1dvcms6IChwcmV2aW91cywgY3VycikgPT4gY3Vyci5jb25zb25hbnQgPSBcIlwiXG4gICAgfSxcbiAgXTtcbiAgc3RhdGljIGRvV29yayhwcmV2aW91czogdGVtcE9iaiwgY3VycjogdGVtcE9iaik6IHZvaWQge1xuICAgIGN1cnIuY29uc29uYW50ID0gXCJ5XCI7XG4gICAgaWYgKCFwcmV2aW91cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBTbWFsbFlheXV5b1N0cmF0ZWdpZXMuc3RyYXRlZ2llc1xuICAgICAgLmZpbHRlcihzdHJhdGVneSA9PiBzdHJhdGVneS5tYXRjaGVzKHByZXZpb3VzLCBjdXJyLnZvd2VsISkpXG4gICAgICAuZm9yRWFjaChzdHJhdGVneSA9PiBzdHJhdGVneS5kb1dvcmsocHJldmlvdXMsIGN1cnIpKTtcbiAgfVxufVxuXG5jbGFzcyBHbG9iYWxTdHJhdGVnaWVzIHtcbiAgc3RhdGljIHN0cmF0ZWdpZXM6IEdsb2JhbFN0cmF0ZWd5W10gPSBbXG4gICAge1xuICAgICAgbWF0Y2hlczogKHByZXYsIGN1cnIsIG5leHQpID0+IChjdXJyLnZvd2VsID09PSAnLScgJiYgcHJldiAmJiAhIXByZXYudm93ZWwpXG4gICAgICAgIHx8IChjdXJyLnZvd2VsID09PSBwcmV2Py52b3dlbCAmJiAhY3Vyci5jb25zb25hbnQpXG4gICAgICAgIHx8IChjdXJyLnZvd2VsID09PSAndScgJiYgIWN1cnIuY29uc29uYW50ICYmIHByZXY/LnZvd2VsID09PSAnbycpLFxuICAgICAgZG9Xb3JrOiAocHJldiwgY3VyciwgbmV4dCkgPT4ge1xuICAgICAgICBwcmV2LnZvd2VsID0gbWFwLmxvbmdWb3dlbFtwcmV2LnZvd2VsIHx8ICcnXTtcbiAgICAgICAgY3Vyci52b3dlbCA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIG1hdGNoZXM6IChwcmV2LCBjdXJyLCBuZXh0KSA9PiBjdXJyLmNvbnNvbmFudCA9PT0gXCJzdXBQcmVcIixcbiAgICAgIGRvV29yazogKHByZXYsIGN1cnIsIG5leHQpID0+IHtcbiAgICAgICAgU21hbGxBaXVlb1N0cmF0ZWdpZXMuZG9Xb3JrKHByZXYsIGN1cnIpO1xuICAgICAgICBjdXJyLmNvbnNvbmFudCA9IFwiXCI7XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBtYXRjaGVzOiAocHJldiwgY3VyciwgbmV4dCkgPT4gY3Vyci5jb25zb25hbnQgPT09IFwieVN1cFByZVwiLFxuICAgICAgZG9Xb3JrOiAocHJldiwgY3VyciwgbmV4dCkgPT4gU21hbGxZYXl1eW9TdHJhdGVnaWVzLmRvV29yayhwcmV2LCBjdXJyKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG1hdGNoZXM6IChwcmV2LCBjdXJyLCBuZXh0KSA9PiBjdXJyLmNvbnNvbmFudCA9PT0gXCJyZXBlYXROZXh0Q29uc29uYW50XCIsXG4gICAgICBkb1dvcms6IChwcmV2LCBjdXJyLCBuZXh0KSA9PiB7XG4gICAgICAgIGN1cnIuY29uc29uYW50ID0gbmV4dD8uY29uc29uYW50LmNoYXJBdCgwKSB8fCBcIlwiO1xuICAgICAgICBpZiAobmV4dD8uY29uc29uYW50ID09PSBcImNoXCIpIHtcbiAgICAgICAgICBjdXJyLmNvbnNvbmFudCA9IFwidFwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBtYXRjaGVzOiAocHJldiwgY3VyciwgbmV4dCkgPT4gY3Vyci5jb25zb25hbnQgPT09IFwiblwiICYmICFjdXJyLnZvd2VsLFxuICAgICAgZG9Xb3JrOiAocHJldiwgY3VyciwgbmV4dCkgPT4ge1xuICAgICAgICBpZiAobmV4dCAmJiAoIW5leHQuY29uc29uYW50IHx8IG5leHQuY29uc29uYW50ID09PSAneScpKSB7XG4gICAgICAgICAgY3Vyci5jb25zb25hbnQgPSBcIm7igJlcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgXTtcbiAgc3RhdGljIGRvV29yayA9IChwcmV2OiB0ZW1wT2JqLCBjdXJyOiB0ZW1wT2JqLCBuZXh0OiB0ZW1wT2JqKTogdm9pZCA9PlxuICAgIEdsb2JhbFN0cmF0ZWdpZXMuc3RyYXRlZ2llc1xuICAgICAgLmZpbHRlcihzdHJhdGVneSA9PiBzdHJhdGVneS5tYXRjaGVzKHByZXYsIGN1cnIsIG5leHQpKVxuICAgICAgLmZvckVhY2goc3RyYXRlZ3kgPT4gc3RyYXRlZ3kuZG9Xb3JrKHByZXYsIGN1cnIsIG5leHQpKVxufVxuXG4vKipcbiAqIEhpcmFnYW5hIGlzIHRyYW5zZm9ybWVkIGludG8gbG93ZXIgY2FzZSBvdXRwdXQuXG4gKiBLYXRha2FuYSBpcyB0cmFuc2Zvcm1lZCBpbnRvIFVQUEVSIGNhc2Ugb3V0cHV0LlxuICogYGBganNcbiAqIHRvUm9tYWppKCfjg63jg7zjg57jgZgnKSAvLyA9PT0gJ1JPzIRNQWppJztcbiAqIGBgYFxuICogVGhlIHNlcXVlbmNlcyBvZiBzYW1lIHZvd2VscyBhbmQgJ291JyBvdXRwdXQgd2l0aCBwcm9sb25nZWQgdm93ZWwgb2YgdGhlIGZpcnN0LlxuICogVGhlIHNlcXVlbmNlIG9mICdlaScgaXMgbm90IHJlcHJlc2VudGVkIHdpdGggbG9uZyAnZScuXG4gKiBleClcbiAqIC0gJ+OBoeOBoeOCheOBhuOBi+OBhCcsICdjaGljaHXMhGthaSdcbiAqIC0gJ+OBteOCiuOCh+OBhicsICdmdXJ5b8yEJ1xuICogLSAn44GX44KH44GG44GM44GP44Gb44GEJywgJ3Nob8yEZ2FrdXNlaSdcbiAqIFxuICogQ2F2ZWF0OiBUaGUgcnVsZSB0byBub3QgY29uc2lkZXIgYXMgcHJvbG9uZ2VkIHZvd2VsIHNvdW5kXG4gKiB3aGVuIHRoZSBjb25zZWN1dGl2ZSB2b3dlbHMgYXJlIGZyb20gc2VwYXJhdGUgS2FuamlzIGlzIG5vdCByZXNwZWN0ZWQuXG4gKiBcbiAqIGV4KSAn44GN44GE44Gv44KT44Go44GG44Gu44Gw44GC44GEJ1xuICogLSBPSzogJ2tpaWhhbnRvzIRub2JhYWknXG4gKiAtIE91ciBfd3JvbmdfIG91dHB1dDogJ2tpzIRoYW50b8yEbm9iYcyEaSdcbiAqIFxuICogJ+OBiuOBi+OBguOBleOCkydcbiAqIC0gc2hvdWxkIGJlIGFuZCBpcyAnb2thzIRzYW4nXG4gKiBcbiAqICfjgajjgYrjgoonXG4gKiAtIHNob3VsZCBiZSBhbmQgaXMgJ3RvzIRyaSdcbiAqIEBwYXJhbSBrYW5hIFRoZSBpbnB1dCB3aXRoIEhpcmFnYW5hL0thdGFrYW5hXG4gKiBAcmV0dXJucyBSb21hamkgcmVwcmVzZW50YXRpb24gb2YgdGhlIGlucHV0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b1JvbWFqaShrYW5hOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gWy4uLmthbmFdXG4gICAgLm1hcCgoamkpID0+ICh7XG4gICAgICBrYXRha2FuYTogaXNLYXRha2FuYShqaSksXG4gICAgICBqaTogY29udkhpcmFnYW5hKGppKSxcbiAgICAgIGNoYXI6IGppLFxuICAgICAgdGhyb3VnaDogIWlzS2F0YWthbmEoamksIHRydWUpICYmICFpc0hpcmFnYW5hKGppKVxuICAgIH0pKVxuICAgIC5tYXAoKHsgamksIGthdGFrYW5hLCB0aHJvdWdoLCBjaGFyIH0pID0+XG4gICAgKHtcbiAgICAgIGNvbnNvbmFudDogT2JqZWN0LmVudHJpZXMobWFwLmNvbnNvbmFudClcbiAgICAgICAgLmZpbHRlcigoWywgdl0pID0+IHYuaW5jbHVkZXMoamkpKVxuICAgICAgICAubWFwKChbayxdKSA9PiBrKS5qb2luKCksXG4gICAgICB2b3dlbDogT2JqZWN0LmVudHJpZXMobWFwLnZvd2VsKVxuICAgICAgICAuZmlsdGVyKChbLCB2XSkgPT4gdi5pbmNsdWRlcyhqaSkpXG4gICAgICAgIC5tYXAoKFtrLF0pID0+IGspLmpvaW4oKSxcbiAgICAgIGthdGFrYW5hLFxuICAgICAgdGhyb3VnaCxcbiAgICAgIGNoYXIsXG4gICAgfSBhcyB0ZW1wT2JqKSlcbiAgICAucmVkdWNlKCh0YXJnZXQsIGN1cnIsIGksIGFycikgPT4ge1xuICAgICAgY29uc3QgbmV4dCA9IGFycltpICsgMV07XG4gICAgICBjb25zdCBwcmV2aW91cyA9IHRhcmdldFtpIC0gMV07XG4gICAgICBHbG9iYWxTdHJhdGVnaWVzLmRvV29yayhwcmV2aW91cywgY3VyciwgbmV4dCk7XG4gICAgICB0YXJnZXQucHVzaChjdXJyKTtcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfSwgW10gYXMgdGVtcE9ialtdKVxuICAgIC5tYXAoKHsgY29uc29uYW50LCB2b3dlbCwga2F0YWthbmEsIHRocm91Z2gsIGNoYXIgfSkgPT4ge1xuICAgICAgaWYgKHRocm91Z2gpIHtcbiAgICAgICAgcmV0dXJuIGNoYXI7XG4gICAgICB9XG4gICAgICBpZiAoa2F0YWthbmEpIHtcbiAgICAgICAgcmV0dXJuIChjb25zb25hbnQgKyAodm93ZWwgfHwgXCJcIikpLnRvVXBwZXJDYXNlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29uc29uYW50ICsgKHZvd2VsIHx8IFwiXCIpO1xuICAgIH0pXG4gICAgLmpvaW4oXCJcIik7XG59Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxHQUFHLEdBQUc7RUFDVkMsU0FBUyxFQUFFO0lBQ1RDLENBQUMsRUFBQUMsa0JBQUEsQ0FBTSxPQUFPLENBQUM7SUFDZkMsQ0FBQyxFQUFBRCxrQkFBQSxDQUFNLE1BQU0sQ0FBQztJQUNkRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUU7SUFDVkMsQ0FBQyxFQUFBSCxrQkFBQSxDQUFNLEtBQUssQ0FBQztJQUNiSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUU7SUFDVkMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFFO0lBQ1ZDLENBQUMsRUFBQU4sa0JBQUEsQ0FBTSxRQUFRLENBQUM7SUFDaEJPLENBQUMsRUFBQVAsa0JBQUEsQ0FBTSxNQUFNLENBQUM7SUFDZFEsQ0FBQyxFQUFBUixrQkFBQSxDQUFNLE9BQU8sQ0FBQztJQUNmUyxDQUFDLEVBQUFULGtCQUFBLENBQU0sS0FBSyxDQUFDO0lBQ2JVLE9BQU8sRUFBQVYsa0JBQUEsQ0FBTSxLQUFLLENBQUM7SUFDbkJXLE1BQU0sRUFBQVgsa0JBQUEsQ0FBTSxRQUFRLENBQUM7SUFDckJZLENBQUMs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