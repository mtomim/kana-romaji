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
    return curr.vowel === '-' && prev && !!prev.vowel || curr.vowel === (prev === null || prev === void 0 ? void 0 : prev.vowel) && !curr.consonant && !(prev.consonant && (next === null || next === void 0 ? void 0 : next.vowel) === '-') || curr.vowel === 'u' && !curr.consonant && (prev === null || prev === void 0 ? void 0 : prev.vowel) === 'o';
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
    if (next && (!next.consonant || next.consonant === 'y') && !next.through) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtYXAiLCJjb25zb25hbnQiLCJrIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwicyIsInNoIiwidCIsInRzIiwiY2giLCJuIiwiaCIsIm0iLCJ5IiwieVN1cFByZSIsInN1cFByZSIsInIiLCJ3IiwiZiIsInAiLCJiIiwiaiIsInoiLCJkIiwiZyIsInJlcGVhdE5leHRDb25zb25hbnQiLCJ2Iiwidm93ZWwiLCJhIiwiaSIsInUiLCJlIiwibyIsImxvbmdWb3dlbCIsImxvd2VyS2F0YWthbmEiLCJ1cHBlckthdGFrYW5hIiwiaXNLYXRha2FuYSIsImppIiwiZXh0ZW5kZWQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJjb2RlIiwiY29kZVBvaW50QXQiLCJpc0hpcmFnYW5hIiwibm9IaXJhZ2FuYUNvcnJlc3BvbmRhbnQiLCJjb252SGlyYWdhbmEiLCJpbmNsdWRlcyIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIlNtYWxsQWl1ZW9TdHJhdGVnaWVzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJkb1dvcmsiLCJwcmV2aW91cyIsImN1cnIiLCJzdHJhdGVnaWVzIiwiZmlsdGVyIiwic3RyYXRlZ3kiLCJtYXRjaGVzIiwiZm9yRWFjaCIsIl9kZWZpbmVQcm9wZXJ0eSIsIlNtYWxsWWF5dXlvU3RyYXRlZ2llcyIsIkdsb2JhbFN0cmF0ZWdpZXMiLCJfR2xvYmFsU3RyYXRlZ2llcyIsInByZXYiLCJuZXh0IiwiY2hhckF0IiwidGhyb3VnaCIsInRvUm9tYWppIiwia2FuYSIsImthdGFrYW5hIiwiX3JlZiIsImNoYXIiLCJPYmplY3QiLCJlbnRyaWVzIiwiX3JlZjIiLCJfcmVmMyIsIl9zbGljZWRUb0FycmF5IiwiX3JlZjQiLCJfcmVmNSIsImpvaW4iLCJfcmVmNiIsIl9yZWY3IiwiX3JlZjgiLCJfcmVmOSIsInJlZHVjZSIsInRhcmdldCIsImFyciIsInB1c2giLCJfcmVmMTAiLCJ0b1VwcGVyQ2FzZSJdLCJzb3VyY2VzIjpbIi4uL3NyYy9rYW5hLXJvbWFqaS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtYXAgPSB7XG4gIGNvbnNvbmFudDoge1xuICAgIGs6IFsuLi5cIuOBi+OBjeOBj+OBkeOBk1wiXSxcbiAgICBzOiBbLi4uXCLjgZXjgZnjgZvjgZ1cIl0sXG4gICAgc2g6IFtcIuOBl1wiLF0sXG4gICAgdDogWy4uLlwi44Gf44Gm44GoXCJdLFxuICAgIHRzOiBbXCLjgaRcIixdLFxuICAgIGNoOiBbXCLjgaFcIixdLFxuICAgIG46IFsuLi5cIuOBquOBq+OBrOOBreOBruOCk1wiXSxcbiAgICBoOiBbLi4uXCLjga/jgbLjgbjjgbtcIl0sXG4gICAgbTogWy4uLlwi44G+44G/44KA44KB44KCXCJdLFxuICAgIHk6IFsuLi5cIuOChOOChuOCiFwiXSxcbiAgICB5U3VwUHJlOiBbLi4uXCLjgoPjgoXjgodcIl0sXG4gICAgc3VwUHJlOiBbLi4uXCLjgYHjgYPjgYXjgYfjgYnjgo5cIl0sXG4gICAgcjogWy4uLlwi44KJ44KK44KL44KM44KNXCJdLFxuICAgIHc6IFsuLi5cIuOCj+OCklwiLF0sXG4gICAgZjogW1wi44G1XCJdLFxuICAgIHA6IFsuLi5cIuOBseOBtOOBt+OBuuOBvVwiXSxcbiAgICBiOiBbLi4uXCLjgbDjgbPjgbbjgbnjgbxcIl0sXG4gICAgajogWy4uLlwi44GY44GiXCJdLFxuICAgIHo6IFsuLi5cIuOBluOBmuOBnOOBnlwiXSxcbiAgICBkOiBbLi4uXCLjgaDjgafjgalcIl0sXG4gICAgZzogWy4uLlwi44GM44GO44GQ44GS44GUXCJdLFxuICAgIHJlcGVhdE5leHRDb25zb25hbnQ6IFtcIuOBo1wiXSxcbiAgICB2OiBbXCLjgpRcIl0sXG4gIH0sXG4gIHZvd2VsOiB7XG4gICAgYTogWy4uLlwi44GC44GL44GM44GV44GW44Gf44Gg44Gq44Gv44Gw44Gx44G+44KE44KJ44KP44GB44KD44KOXCJdLFxuICAgIGk6IFsuLi5cIuOBhOOBjeOBjuOBl+OBmOOBoeOBouOBq+OBsuOBs+OBtOOBv+OCiuOBg1wiXSxcbiAgICB1OiBbLi4uXCLjgYbjgY/jgZDjgZnjgZrjgaTjgaXjgazjgbXjgbbjgbfjgoDjgobjgovjgYXjgoXjgpRcIl0sXG4gICAgZTogWy4uLlwi44GI44GR44GS44Gb44Gc44Gm44Gn44Gt44G444G544G644KB44KM44GHXCJdLFxuICAgIG86IFsuLi5cIuOBiuOBk+OBlOOBneOBnuOBqOOBqeOBruOBu+OBvOOBveOCguOCiOOCjeOCkuOCh+OBiVwiXSxcbiAgICBcIi1cIjogW1wi44O8XCJdXG4gIH0sXG4gIGxvbmdWb3dlbDoge1xuICAgIGE6ICfEgScsXG4gICAgaTogJ8SrJyxcbiAgICB1OiAnxasnLFxuICAgIGU6ICfEkycsXG4gICAgbzogJ8WNJyxcbiAgfSBhcyB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9XG59O1xuXG5kZWNsYXJlIGludGVyZmFjZSB0ZW1wT2JqIHtcbiAgY29uc29uYW50OiBzdHJpbmcsXG4gIHZvd2VsPzogc3RyaW5nLFxuICBrYXRha2FuYTogYm9vbGVhbixcbiAgdGhyb3VnaDogYm9vbGVhbixcbiAgY2hhcjogc3RyaW5nLFxufVxuXG5jb25zdCBbbG93ZXJLYXRha2FuYSwgdXBwZXJLYXRha2FuYV0gPSBbMHgzMEExLCAweDMwRkJdO1xuXG5mdW5jdGlvbiBpc0thdGFrYW5hKGppOiBzdHJpbmcsIGV4dGVuZGVkID0gZmFsc2UpOiBib29sZWFuIHtcbiAgY29uc3QgY29kZSA9IGppLmNvZGVQb2ludEF0KDApO1xuICByZXR1cm4gY29kZSEgPj0gbG93ZXJLYXRha2FuYSAmJiBjb2RlISA8IChleHRlbmRlZCA/IDB4MzBGRiA6IHVwcGVyS2F0YWthbmEpO1xufVxuXG5mdW5jdGlvbiBpc0hpcmFnYW5hKGppOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgY29kZSA9IGppLmNvZGVQb2ludEF0KDApO1xuICByZXR1cm4gY29kZSEgPj0gMHgzMDQxICYmIGNvZGUhIDw9IDB4MzA5Rjtcbn1cblxuY29uc3Qgbm9IaXJhZ2FuYUNvcnJlc3BvbmRhbnQgPSAn44O344O444O544O644O744O844O/JztcblxuZnVuY3Rpb24gY29udkhpcmFnYW5hKGppOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoaXNLYXRha2FuYShqaSkgJiYgIW5vSGlyYWdhbmFDb3JyZXNwb25kYW50LmluY2x1ZGVzKGppKSkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGppLmNvZGVQb2ludEF0KDApISAtIDB4NjApO1xuICB9XG4gIHJldHVybiBqaTtcbn1cblxuaW50ZXJmYWNlIFN0cmF0ZWd5IHtcbiAgbWF0Y2hlczogKHByZXZpb3VzOiB0ZW1wT2JqLCB2b3dlbDogc3RyaW5nKSA9PiBib29sZWFuO1xuICBkb1dvcms6IChwcmV2aW91czogdGVtcE9iaiwgY3VycjogdGVtcE9iaikgPT4gdm9pZDtcbn1cblxuaW50ZXJmYWNlIEdsb2JhbFN0cmF0ZWd5IHtcbiAgbWF0Y2hlczogKHByZXY6IHRlbXBPYmosIGN1cnI6IHRlbXBPYmosIG5leHQ6IHRlbXBPYmopID0+IGJvb2xlYW47XG4gIGRvV29yazogKHByZXY6IHRlbXBPYmosIGN1cnI6IHRlbXBPYmosIG5leHQ6IHRlbXBPYmopID0+IHZvaWQ7XG59XG5cbmNsYXNzIFNtYWxsQWl1ZW9TdHJhdGVnaWVzIHtcbiAgc3RhdGljIHN0cmF0ZWdpZXM6IFN0cmF0ZWd5W10gPSBbXG4gICAgLy8gSkUsIENIRSwgU0hFXG4gICAge1xuICAgICAgbWF0Y2hlczogKHByZXZpb3VzLCB2b3dlbCkgPT4gWydqJywgJ2NoJywgJ3NoJ10uaW5jbHVkZXMocHJldmlvdXMuY29uc29uYW50KSAmJiBwcmV2aW91cy52b3dlbCA9PT0gJ2knICYmIHZvd2VsID09PSAnZScsXG4gICAgICBkb1dvcms6IChwcmV2aW91cykgPT4gZGVsZXRlIHByZXZpb3VzLnZvd2VsLFxuICAgIH0sXG4gICAgLy8gRFUsIFRVXG4gICAge1xuICAgICAgbWF0Y2hlczogKHByZXZpb3VzLCB2b3dlbCkgPT4gWy4uLid0ZCddLmluY2x1ZGVzKHByZXZpb3VzLmNvbnNvbmFudCkgJiYgcHJldmlvdXMudm93ZWwgPT09ICdvJyAmJiB2b3dlbCA9PT0gJ3UnLFxuICAgICAgZG9Xb3JrOiAocHJldmlvdXMpID0+IGRlbGV0ZSBwcmV2aW91cy52b3dlbCxcbiAgICB9LFxuICAgIC8vIERJLCBUSVxuICAgIHtcbiAgICAgIG1hdGNoZXM6IChwcmV2aW91cywgdm93ZWwpID0+IFsuLi4ndGQnXS5pbmNsdWRlcyhwcmV2aW91cy5jb25zb25hbnQpICYmIHByZXZpb3VzLnZvd2VsID09PSAnZScgJiYgdm93ZWwgPT09ICdpJyxcbiAgICAgIGRvV29yazogKHByZXZpb3VzKSA9PiBkZWxldGUgcHJldmlvdXMudm93ZWwsXG4gICAgfSxcbiAgICAvLyBTSVxuICAgIHtcbiAgICAgIG1hdGNoZXM6IChwcmV2aW91cywgdm93ZWwpID0+IFsncycsICd6J10uaW5jbHVkZXMocHJldmlvdXMuY29uc29uYW50KSAmJiBwcmV2aW91cy52b3dlbCA9PT0gJ3UnICYmIHZvd2VsID09PSAnaScsXG4gICAgICBkb1dvcms6IChwcmV2aW91cykgPT4gZGVsZXRlIHByZXZpb3VzLnZvd2VsLFxuICAgIH0sXG4gICAgLy8gRmEsIEZpLCBGdSwgRmUsIEZvLCBWYSwgVmksIFZ1LCBWZSwgVm9cbiAgICB7XG4gICAgICBtYXRjaGVzOiAocHJldmlvdXMsIHZvd2VsKSA9PiBbLi4uXCJmdlwiXS5pbmNsdWRlcyhwcmV2aW91cy5jb25zb25hbnQpLFxuICAgICAgZG9Xb3JrOiAocHJldmlvdXMpID0+IGRlbGV0ZSBwcmV2aW91cy52b3dlbCxcbiAgICB9LFxuICAgIC8vIFlFXG4gICAge1xuICAgICAgbWF0Y2hlczogKHByZXZpb3VzLCB2b3dlbCkgPT4gcHJldmlvdXMuY29uc29uYW50ID09PSAnJyAmJiBwcmV2aW91cy52b3dlbCA9PT0gJ2knICYmIHZvd2VsID09PSAnZScsXG4gICAgICBkb1dvcms6IChwcmV2aW91cykgPT4gcHJldmlvdXMudm93ZWwgPSAneScsXG4gICAgfSxcbiAgICAvLyBXTywgV0ksIFdFXG4gICAge1xuICAgICAgbWF0Y2hlczogKHByZXZpb3VzLCB2b3dlbCkgPT4gcHJldmlvdXMuY29uc29uYW50ID09PSAnJyAmJiBwcmV2aW91cy52b3dlbCA9PT0gJ3UnICYmIFsuLi4nb2VpJ10uaW5jbHVkZXModm93ZWwpLFxuICAgICAgZG9Xb3JrOiAocHJldmlvdXMpID0+IHByZXZpb3VzLnZvd2VsID0gJ3cnLFxuICAgIH0sXG4gICAgLy8gVFdBXG4gICAge1xuICAgICAgbWF0Y2hlczogKHByZXZpb3VzLCB2b3dlbCkgPT4gcHJldmlvdXMuY29uc29uYW50ID09PSAndCcgJiYgcHJldmlvdXMudm93ZWwgPT09ICdvJyAmJiB2b3dlbCAhPT0gJ3UnLFxuICAgICAgZG9Xb3JrOiAocHJldmlvdXMpID0+IHByZXZpb3VzLnZvd2VsID0gJ3cnLFxuICAgIH0sXG4gICAgLy8gR1dBLCBLV0FcbiAgICB7XG4gICAgICBtYXRjaGVzOiAocHJldmlvdXMsIHZvd2VsKSA9PiBbJ2snLCdnJ10uaW5jbHVkZXMocHJldmlvdXMuY29uc29uYW50KSAmJiBwcmV2aW91cy52b3dlbCA9PT0gJ3UnICYmIHZvd2VsICE9PSAndScsXG4gICAgICBkb1dvcms6IChwcmV2aW91cykgPT4gcHJldmlvdXMudm93ZWwgPSAndycsXG4gICAgfSxcbiAgICAvLyBIWUUsIEJZRSwgUFlFLCBLWUVcbiAgICB7XG4gICAgICBtYXRjaGVzOiAocHJldmlvdXMsIHZvd2VsKSA9PiBbLi4uJ2Joa3AnXS5pbmNsdWRlcyhwcmV2aW91cy5jb25zb25hbnQpICYmIHByZXZpb3VzLnZvd2VsID09PSAnaScgJiYgdm93ZWwgPT09ICdlJyxcbiAgICAgIGRvV29yazogKHByZXZpb3VzKSA9PiBwcmV2aW91cy52b3dlbCA9ICd5JyxcbiAgICB9LFxuICAgIC8vIFRTQSwgVFNJLCBUU0UsIFRTT1xuICAgIHtcbiAgICAgIG1hdGNoZXM6IChwcmV2aW91cywgdm93ZWwpID0+IHByZXZpb3VzLmNvbnNvbmFudCA9PT0gJ3RzJyAmJiBwcmV2aW91cy52b3dlbCA9PT0gJ3UnLFxuICAgICAgZG9Xb3JrOiAocHJldmlvdXMpID0+IGRlbGV0ZSBwcmV2aW91cy52b3dlbCxcbiAgICB9LFxuICBdO1xuICBzdGF0aWMgZG9Xb3JrKHByZXZpb3VzOiB0ZW1wT2JqLCBjdXJyOiB0ZW1wT2JqKTogdm9pZCB7XG4gICAgU21hbGxBaXVlb1N0cmF0ZWdpZXMuc3RyYXRlZ2llc1xuICAgICAgLmZpbHRlcihzdHJhdGVneSA9PiBzdHJhdGVneS5tYXRjaGVzKHByZXZpb3VzLCBjdXJyLnZvd2VsISkpXG4gICAgICAuZm9yRWFjaChzdHJhdGVneSA9PiBzdHJhdGVneS5kb1dvcmsocHJldmlvdXMsIGN1cnIpKTtcbiAgfVxufVxuXG5jbGFzcyBTbWFsbFlheXV5b1N0cmF0ZWdpZXMge1xuICBzdGF0aWMgc3RyYXRlZ2llczogU3RyYXRlZ3lbXSA9IFtcbiAgICB7XG4gICAgICBtYXRjaGVzOiAocHJldmlvdXMsIHZvd2VsKSA9PiBbXCJpXCIsIFwiZVwiXS5pbmNsdWRlcyhwcmV2aW91cy52b3dlbCEpLFxuICAgICAgZG9Xb3JrOiAocHJldmlvdXMpID0+IGRlbGV0ZSBwcmV2aW91cy52b3dlbCxcbiAgICB9LFxuICAgIHtcbiAgICAgIG1hdGNoZXM6IChwcmV2aW91cywgdm93ZWwpID0+IFsuLi5cImZ2XCJdLmluY2x1ZGVzKHByZXZpb3VzLmNvbnNvbmFudCkgJiYgcHJldmlvdXMudm93ZWwgPT09IFwidVwiLFxuICAgICAgZG9Xb3JrOiAocHJldmlvdXMpID0+IGRlbGV0ZSBwcmV2aW91cy52b3dlbCxcbiAgICB9LFxuICAgIHtcbiAgICAgIG1hdGNoZXM6IChwcmV2aW91cywgdm93ZWwpID0+IFtcInNoXCIsIFwiY2hcIiwgXCJqXCJdLmluY2x1ZGVzKHByZXZpb3VzLmNvbnNvbmFudCksXG4gICAgICBkb1dvcms6IChwcmV2aW91cywgY3VycikgPT4gY3Vyci5jb25zb25hbnQgPSBcIlwiXG4gICAgfSxcbiAgXTtcbiAgc3RhdGljIGRvV29yayhwcmV2aW91czogdGVtcE9iaiwgY3VycjogdGVtcE9iaik6IHZvaWQge1xuICAgIGN1cnIuY29uc29uYW50ID0gXCJ5XCI7XG4gICAgaWYgKCFwcmV2aW91cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBTbWFsbFlheXV5b1N0cmF0ZWdpZXMuc3RyYXRlZ2llc1xuICAgICAgLmZpbHRlcihzdHJhdGVneSA9PiBzdHJhdGVneS5tYXRjaGVzKHByZXZpb3VzLCBjdXJyLnZvd2VsISkpXG4gICAgICAuZm9yRWFjaChzdHJhdGVneSA9PiBzdHJhdGVneS5kb1dvcmsocHJldmlvdXMsIGN1cnIpKTtcbiAgfVxufVxuXG5jbGFzcyBHbG9iYWxTdHJhdGVnaWVzIHtcbiAgc3RhdGljIHN0cmF0ZWdpZXM6IEdsb2JhbFN0cmF0ZWd5W10gPSBbXG4gICAge1xuICAgICAgbWF0Y2hlczogKHByZXYsIGN1cnIsIG5leHQpID0+IChjdXJyLnZvd2VsID09PSAnLScgJiYgcHJldiAmJiAhIXByZXYudm93ZWwpXG4gICAgICAgIHx8IChjdXJyLnZvd2VsID09PSBwcmV2Py52b3dlbCAmJiAhY3Vyci5jb25zb25hbnQgJiYgIShwcmV2LmNvbnNvbmFudCAmJiBuZXh0Py52b3dlbCA9PT0gJy0nKSlcbiAgICAgICAgfHwgKGN1cnIudm93ZWwgPT09ICd1JyAmJiAhY3Vyci5jb25zb25hbnQgJiYgcHJldj8udm93ZWwgPT09ICdvJyksXG4gICAgICBkb1dvcms6IChwcmV2LCBjdXJyLCBuZXh0KSA9PiB7XG4gICAgICAgIHByZXYudm93ZWwgPSBtYXAubG9uZ1Zvd2VsW3ByZXYudm93ZWwgfHwgJyddO1xuICAgICAgICBjdXJyLnZvd2VsID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgbWF0Y2hlczogKHByZXYsIGN1cnIsIG5leHQpID0+IGN1cnIuY29uc29uYW50ID09PSBcInN1cFByZVwiLFxuICAgICAgZG9Xb3JrOiAocHJldiwgY3VyciwgbmV4dCkgPT4ge1xuICAgICAgICBTbWFsbEFpdWVvU3RyYXRlZ2llcy5kb1dvcmsocHJldiwgY3Vycik7XG4gICAgICAgIGN1cnIuY29uc29uYW50ID0gXCJcIjtcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIG1hdGNoZXM6IChwcmV2LCBjdXJyLCBuZXh0KSA9PiBjdXJyLmNvbnNvbmFudCA9PT0gXCJ5U3VwUHJlXCIsXG4gICAgICBkb1dvcms6IChwcmV2LCBjdXJyLCBuZXh0KSA9PiBTbWFsbFlheXV5b1N0cmF0ZWdpZXMuZG9Xb3JrKHByZXYsIGN1cnIpLFxuICAgIH0sXG4gICAge1xuICAgICAgbWF0Y2hlczogKHByZXYsIGN1cnIsIG5leHQpID0+IGN1cnIuY29uc29uYW50ID09PSBcInJlcGVhdE5leHRDb25zb25hbnRcIixcbiAgICAgIGRvV29yazogKHByZXYsIGN1cnIsIG5leHQpID0+IHtcbiAgICAgICAgY3Vyci5jb25zb25hbnQgPSBuZXh0Py5jb25zb25hbnQuY2hhckF0KDApIHx8IFwiXCI7XG4gICAgICAgIGlmIChuZXh0Py5jb25zb25hbnQgPT09IFwiY2hcIikge1xuICAgICAgICAgIGN1cnIuY29uc29uYW50ID0gXCJ0XCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIG1hdGNoZXM6IChwcmV2LCBjdXJyLCBuZXh0KSA9PiBjdXJyLmNvbnNvbmFudCA9PT0gXCJuXCIgJiYgIWN1cnIudm93ZWwsXG4gICAgICBkb1dvcms6IChwcmV2LCBjdXJyLCBuZXh0KSA9PiB7XG4gICAgICAgIGlmIChuZXh0ICYmICghbmV4dC5jb25zb25hbnQgfHwgbmV4dC5jb25zb25hbnQgPT09ICd5JykgJiYgIW5leHQudGhyb3VnaCkge1xuICAgICAgICAgIGN1cnIuY29uc29uYW50ID0gXCJu4oCZXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIF07XG4gIHN0YXRpYyBkb1dvcmsgPSAocHJldjogdGVtcE9iaiwgY3VycjogdGVtcE9iaiwgbmV4dDogdGVtcE9iaik6IHZvaWQgPT5cbiAgICBHbG9iYWxTdHJhdGVnaWVzLnN0cmF0ZWdpZXNcbiAgICAgIC5maWx0ZXIoc3RyYXRlZ3kgPT4gc3RyYXRlZ3kubWF0Y2hlcyhwcmV2LCBjdXJyLCBuZXh0KSlcbiAgICAgIC5mb3JFYWNoKHN0cmF0ZWd5ID0+IHN0cmF0ZWd5LmRvV29yayhwcmV2LCBjdXJyLCBuZXh0KSlcbn1cblxuLyoqXG4gKiBIaXJhZ2FuYSBpcyB0cmFuc2Zvcm1lZCBpbnRvIGxvd2VyIGNhc2Ugb3V0cHV0LlxuICogS2F0YWthbmEgaXMgdHJhbnNmb3JtZWQgaW50byBVUFBFUiBjYXNlIG91dHB1dC5cbiAqIGBgYGpzXG4gKiB0b1JvbWFqaSgn44Ot44O844Oe44GYJykgLy8gPT09ICdST8yETUFqaSc7XG4gKiBgYGBcbiAqIFRoZSBzZXF1ZW5jZXMgb2Ygc2FtZSB2b3dlbHMgYW5kICdvdScgb3V0cHV0IHdpdGggcHJvbG9uZ2VkIHZvd2VsIG9mIHRoZSBmaXJzdC5cbiAqIFRoZSBzZXF1ZW5jZSBvZiAnZWknIGlzIG5vdCByZXByZXNlbnRlZCB3aXRoIGxvbmcgJ2UnLlxuICogZXgpXG4gKiAtICfjgaHjgaHjgoXjgYbjgYvjgYQnLCAnY2hpY2h1zIRrYWknXG4gKiAtICfjgbXjgorjgofjgYYnLCAnZnVyeW/MhCdcbiAqIC0gJ+OBl+OCh+OBhuOBjOOBj+OBm+OBhCcsICdzaG/MhGdha3VzZWknXG4gKiBcbiAqIENhdmVhdDogVGhlIHJ1bGUgdG8gbm90IGNvbnNpZGVyIGFzIHByb2xvbmdlZCB2b3dlbCBzb3VuZFxuICogd2hlbiB0aGUgY29uc2VjdXRpdmUgdm93ZWxzIGFyZSBmcm9tIHNlcGFyYXRlIEthbmppcyBpcyBub3QgcmVzcGVjdGVkLlxuICogXG4gKiBleCkgJ+OBjeOBhOOBr+OCk+OBqOOBhuOBruOBsOOBguOBhCdcbiAqIC0gT0s6ICdraWloYW50b8yEbm9iYWFpJ1xuICogLSBPdXIgX3dyb25nXyBvdXRwdXQ6ICdracyEaGFudG/MhG5vYmHMhGknXG4gKiBcbiAqICfjgYrjgYvjgYLjgZXjgpMnXG4gKiAtIHNob3VsZCBiZSBhbmQgaXMgJ29rYcyEc2FuJ1xuICogXG4gKiAn44Go44GK44KKJ1xuICogLSBzaG91bGQgYmUgYW5kIGlzICd0b8yEcmknXG4gKiBAcGFyYW0ga2FuYSBUaGUgaW5wdXQgd2l0aCBIaXJhZ2FuYS9LYXRha2FuYVxuICogQHJldHVybnMgUm9tYWppIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBpbnB1dFxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9Sb21hamkoa2FuYTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIFsuLi5rYW5hXVxuICAgIC5tYXAoKGppKSA9PiAoe1xuICAgICAga2F0YWthbmE6IGlzS2F0YWthbmEoamkpLFxuICAgICAgamk6IGNvbnZIaXJhZ2FuYShqaSksXG4gICAgICBjaGFyOiBqaSxcbiAgICAgIHRocm91Z2g6ICFpc0thdGFrYW5hKGppLCB0cnVlKSAmJiAhaXNIaXJhZ2FuYShqaSlcbiAgICB9KSlcbiAgICAubWFwKCh7IGppLCBrYXRha2FuYSwgdGhyb3VnaCwgY2hhciB9KSA9PlxuICAgICh7XG4gICAgICBjb25zb25hbnQ6IE9iamVjdC5lbnRyaWVzKG1hcC5jb25zb25hbnQpXG4gICAgICAgIC5maWx0ZXIoKFssIHZdKSA9PiB2LmluY2x1ZGVzKGppKSlcbiAgICAgICAgLm1hcCgoW2ssXSkgPT4gaykuam9pbigpLFxuICAgICAgdm93ZWw6IE9iamVjdC5lbnRyaWVzKG1hcC52b3dlbClcbiAgICAgICAgLmZpbHRlcigoWywgdl0pID0+IHYuaW5jbHVkZXMoamkpKVxuICAgICAgICAubWFwKChbayxdKSA9PiBrKS5qb2luKCksXG4gICAgICBrYXRha2FuYSxcbiAgICAgIHRocm91Z2gsXG4gICAgICBjaGFyLFxuICAgIH0gYXMgdGVtcE9iaikpXG4gICAgLnJlZHVjZSgodGFyZ2V0LCBjdXJyLCBpLCBhcnIpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSBhcnJbaSArIDFdO1xuICAgICAgY29uc3QgcHJldmlvdXMgPSB0YXJnZXRbaSAtIDFdO1xuICAgICAgR2xvYmFsU3RyYXRlZ2llcy5kb1dvcmsocHJldmlvdXMsIGN1cnIsIG5leHQpO1xuICAgICAgdGFyZ2V0LnB1c2goY3Vycik7XG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH0sIFtdIGFzIHRlbXBPYmpbXSlcbiAgICAubWFwKCh7IGNvbnNvbmFudCwgdm93ZWwsIGthdGFrYW5hLCB0aHJvdWdoLCBjaGFyIH0pID0+IHtcbiAgICAgIGlmICh0aHJvdWdoKSB7XG4gICAgICAgIHJldHVybiBjaGFyO1xuICAgICAgfVxuICAgICAgaWYgKGthdGFrYW5hKSB7XG4gICAgICAgIHJldHVybiAoY29uc29uYW50ICsgKHZvd2VsIHx8IFwiXCIpKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnNvbmFudCArICh2b3dlbCB8fCBcIlwiKTtcbiAgICB9KVxuICAgIC5qb2luKFwiXCIpO1xufSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsR0FBRyxHQUFHO0VBQ1ZDLFNBQVMsRUFBRTtJQUNUQyxDQUFDLEVBQUFDLGtCQUFBLENBQU0sT0FBTyxDQUFDO0lBQ2ZDLENBQUMsRUFBQUQsa0JBQUEsQ0FBTSxNQUFNLENBQUM7SUFDZEUsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFFO0lBQ1ZDLENBQUMsRUFBQUgsa0JBQUEsQ0FBTSxLQUFLLENBQUM7SUFDYkksRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFFO0lBQ1ZDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBRTtJQUNWQyxDQUFDLEVBQUFOLGtCQUFBLENBQU0sUUFBUSxDQUFDO0lBQ2hCTyxDQUFDLEVBQUFQLGtCQUFBLENBQU0sTUFBTSxDQUFDO0lBQ2RRLENBQUMsRUFBQVIsa0JBQUEsQ0FBTSxPQUFPLENBQUM7SUFDZlMsQ0FBQyxFQUFBVCxrQkFBQSxDQUFNLEtBQUssQ0FBQztJQUNiVSxPQUFPLEVBQUFWLGtCQUFBLENBQU0s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