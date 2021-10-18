"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toRomaji = toRomaji;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
    supPre: _toConsumableArray("ぁぃぅぇぉ"),
    r: _toConsumableArray("らりるれろ"),
    w: _toConsumableArray("わを"),
    f: ["ふ"],
    p: _toConsumableArray("ぱぴぷぺぽ"),
    b: _toConsumableArray("ばびぶべぼ"),
    j: _toConsumableArray("じぢ"),
    z: _toConsumableArray("ざずぜぞ"),
    d: _toConsumableArray("だでど"),
    g: _toConsumableArray("がぎぐげご"),
    repeatNextConsonant: ["っ"]
  },
  vowel: {
    a: _toConsumableArray("あかがさざただなはばぱまやらわぁゃ"),
    i: _toConsumableArray("いきぎしじちぢにひびぴみりぃ"),
    u: _toConsumableArray("うくぐすずつづぬふぶぷむゆるぅゅ"),
    e: _toConsumableArray("えけげせぜてでねへべぺめれぇ"),
    o: _toConsumableArray("おこごそぞとどのほぼぽもよろをょぉ"),
    "-": ["ー"]
  },
  longVowel: {
    a: 'ā',
    i: 'ī',
    u: 'ū',
    e: 'ē',
    o: 'ō'
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
  }).reduce(function (prev, _ref10, i, arr) {
    var consonant = _ref10.consonant,
        vowel = _ref10.vowel,
        katakana = _ref10.katakana,
        through = _ref10.through,
        _char2 = _ref10["char"];
    var next = arr[i + 1];
    var previous = prev[i - 1];

    if (vowel === '-' && previous && previous.vowel || vowel === (previous === null || previous === void 0 ? void 0 : previous.vowel) && !consonant || vowel === 'u' && !consonant && (previous === null || previous === void 0 ? void 0 : previous.vowel) === 'o') {
      previous.vowel = map.longVowel[previous.vowel || ''];
      vowel = undefined;
    } else if (consonant === "supPre") {
      consonant = "";

      if (previous.consonant === "f") {
        delete previous.vowel;
      }
    } else if (consonant === "ySupPre") {
      consonant = "y";

      if (previous) {
        if (["i", "e"].includes(previous.vowel || "") || previous.consonant === "f" && previous.vowel === "u") {
          delete previous.vowel;
        }

        if (["sh", "ch", "j"].includes(previous.consonant)) {
          consonant = "";
        }
      }
    } else if (consonant === "repeatNextConsonant") {
      consonant = (next === null || next === void 0 ? void 0 : next.consonant.charAt(0)) || "";

      if ((next === null || next === void 0 ? void 0 : next.consonant) === "ch") {
        consonant = "t";
      }
    } else if (consonant === "n" && !vowel) {
      if (next && !next.consonant) {
        consonant = "n-";
      }

      if (next && _toConsumableArray("bpm").includes(next.consonant.charAt(0))) {
        consonant = "m";
      }
    }

    prev.push({
      consonant: consonant,
      vowel: vowel,
      katakana: katakana,
      through: through,
      "char": _char2
    });
    return prev;
  }, []).map(function (_ref11) {
    var consonant = _ref11.consonant,
        vowel = _ref11.vowel,
        katakana = _ref11.katakana,
        through = _ref11.through,
        _char3 = _ref11["char"];

    if (through) {
      return _char3;
    }

    if (katakana) {
      return (consonant + (vowel || "")).toUpperCase();
    }

    return consonant + (vowel || "");
  }).join("");
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rYW5hLXJvbWFqaS50cyJdLCJuYW1lcyI6WyJtYXAiLCJjb25zb25hbnQiLCJrIiwicyIsInNoIiwidCIsInRzIiwiY2giLCJuIiwiaCIsIm0iLCJ5IiwieVN1cFByZSIsInN1cFByZSIsInIiLCJ3IiwiZiIsInAiLCJiIiwiaiIsInoiLCJkIiwiZyIsInJlcGVhdE5leHRDb25zb25hbnQiLCJ2b3dlbCIsImEiLCJpIiwidSIsImUiLCJvIiwibG9uZ1Zvd2VsIiwibG93ZXJLYXRha2FuYSIsInVwcGVyS2F0YWthbmEiLCJpc0thdGFrYW5hIiwiamkiLCJleHRlbmRlZCIsImNvZGUiLCJjb2RlUG9pbnRBdCIsImlzSGlyYWdhbmEiLCJub0hpcmFnYW5hQ29ycmVzcG9uZGFudCIsImNvbnZIaXJhZ2FuYSIsImluY2x1ZGVzIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwidG9Sb21hamkiLCJrYW5hIiwia2F0YWthbmEiLCJ0aHJvdWdoIiwiY2hhciIsIk9iamVjdCIsImVudHJpZXMiLCJmaWx0ZXIiLCJ2Iiwiam9pbiIsInJlZHVjZSIsInByZXYiLCJhcnIiLCJuZXh0IiwicHJldmlvdXMiLCJ1bmRlZmluZWQiLCJjaGFyQXQiLCJwdXNoIiwidG9VcHBlckNhc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLEdBQUcsR0FBRztBQUNWQyxFQUFBQSxTQUFTLEVBQUU7QUFDVEMsSUFBQUEsQ0FBQyxxQkFBTSxPQUFOLENBRFE7QUFFVEMsSUFBQUEsQ0FBQyxxQkFBTSxNQUFOLENBRlE7QUFHVEMsSUFBQUEsRUFBRSxFQUFFLENBQUMsR0FBRCxDQUhLO0FBSVRDLElBQUFBLENBQUMscUJBQU0sS0FBTixDQUpRO0FBS1RDLElBQUFBLEVBQUUsRUFBRSxDQUFDLEdBQUQsQ0FMSztBQU1UQyxJQUFBQSxFQUFFLEVBQUUsQ0FBQyxHQUFELENBTks7QUFPVEMsSUFBQUEsQ0FBQyxxQkFBTSxRQUFOLENBUFE7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QixJQUFJLENBQUN4RCxTQUFMLENBQWUyRCxNQUFmLENBQXNCLENBQXRCLENBQXBCLENBQVosRUFBMkQ7QUFDekQzRCxRQUFBQSxTQUFTLEdBQUcsR0FBWjtBQUNEO0FBQ0Y7O0FBQ0RzRCxJQUFBQSxJQUFJLENBQUNNLElBQUwsQ0FBVTtBQUFFNUQsTUFBQUEsU0FBUyxFQUFUQSxTQUFGO0FBQWF1QixNQUFBQSxLQUFLLEVBQUxBLEtBQWI7QUFBb0JzQixNQUFBQSxRQUFRLEVBQVJBLFFBQXBCO0FBQThCQyxNQUFBQSxPQUFPLEVBQVBBLE9BQTlCO0FBQXVDLGNBQUFDO0FBQXZDLEtBQVY7QUFDQSxXQUFPTyxJQUFQO0FBQ0QsR0EzREksRUEyREYsRUEzREUsRUE0REp2RCxHQTVESSxDQTREQSxrQkFBbUQ7QUFBQSxRQUFoREMsU0FBZ0QsVUFBaERBLFNBQWdEO0FBQUEsUUFBckN1QixLQUFxQyxVQUFyQ0EsS0FBcUM7QUFBQSxRQUE5QnNCLFFBQThCLFVBQTlCQSxRQUE4QjtBQUFBLFFBQXBCQyxPQUFvQixVQUFwQkEsT0FBb0I7QUFBQSxRQUFYQyxNQUFXOztBQUN0RCxRQUFJRCxPQUFKLEVBQWE7QUFDWCxhQUFPQyxNQUFQO0FBQ0Q7O0FBQ0QsUUFBSUYsUUFBSixFQUFjO0FBQ1osYUFBTyxDQUFDN0MsU0FBUyxJQUFJdUIsS0FBSyxJQUFJLEVBQWIsQ0FBVixFQUE0QnNDLFdBQTVCLEVBQVA7QUFDRDs7QUFDRCxXQUFPN0QsU0FBUyxJQUFJdUIsS0FBSyxJQUFJLEVBQWIsQ0FBaEI7QUFDRCxHQXBFSSxFQXFFSjZCLElBckVJLENBcUVDLEVBckVELENBQVA7QUFzRUQiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtYXAgPSB7XG4gIGNvbnNvbmFudDoge1xuICAgIGs6IFsuLi5cIuOBi+OBjeOBj+OBkeOBk1wiXSxcbiAgICBzOiBbLi4uXCLjgZXjgZnjgZvjgZ1cIl0sXG4gICAgc2g6IFtcIuOBl1wiLF0sXG4gICAgdDogWy4uLlwi44Gf44Gm44GoXCJdLFxuICAgIHRzOiBbXCLjgaRcIixdLFxuICAgIGNoOiBbXCLjgaFcIixdLFxuICAgIG46IFsuLi5cIuOBquOBq+OBrOOBreOBruOCk1wiXSxcbiAgICBoOiBbLi4uXCLjga/jgbLjgbjjgbtcIl0sXG4gICAgbTogWy4uLlwi44G+44G/44KA44KB44KCXCJdLFxuICAgIHk6IFsuLi5cIuOChOOChuOCiFwiXSxcbiAgICB5U3VwUHJlOiBbLi4uXCLjgoPjgoXjgodcIl0sXG4gICAgc3VwUHJlOiBbLi4uXCLjgYHjgYPjgYXjgYfjgYlcIl0sXG4gICAgcjogWy4uLlwi44KJ44KK44KL44KM44KNXCJdLFxuICAgIHc6IFsuLi5cIuOCj+OCklwiLF0sXG4gICAgZjogW1wi44G1XCJdLFxuICAgIHA6IFsuLi5cIuOBseOBtOOBt+OBuuOBvVwiXSxcbiAgICBiOiBbLi4uXCLjgbDjgbPjgbbjgbnjgbxcIl0sXG4gICAgajogWy4uLlwi44GY44GiXCJdLFxuICAgIHo6IFsuLi5cIuOBluOBmuOBnOOBnlwiXSxcbiAgICBkOiBbLi4uXCLjgaDjgafjgalcIl0sXG4gICAgZzogWy4uLlwi44GM44GO44GQ44GS44GUXCJdLFxuICAgIHJlcGVhdE5leHRDb25zb25hbnQ6IFtcIuOBo1wiXVxuICB9LFxuICB2b3dlbDoge1xuICAgIGE6IFsuLi5cIuOBguOBi+OBjOOBleOBluOBn+OBoOOBquOBr+OBsOOBseOBvuOChOOCieOCj+OBgeOCg1wiXSxcbiAgICBpOiBbLi4uXCLjgYTjgY3jgY7jgZfjgZjjgaHjgaLjgavjgbLjgbPjgbTjgb/jgorjgYNcIl0sXG4gICAgdTogWy4uLlwi44GG44GP44GQ44GZ44Ga44Gk44Gl44Gs44G144G244G344KA44KG44KL44GF44KFXCJdLFxuICAgIGU6IFsuLi5cIuOBiOOBkeOBkuOBm+OBnOOBpuOBp+OBreOBuOOBueOBuuOCgeOCjOOBh1wiXSxcbiAgICBvOiBbLi4uXCLjgYrjgZPjgZTjgZ3jgZ7jgajjganjga7jgbvjgbzjgb3jgoLjgojjgo3jgpLjgofjgYlcIl0sXG4gICAgXCItXCI6IFtcIuODvFwiXVxuICB9LFxuICBsb25nVm93ZWw6IHtcbiAgICBhOiAnYcyEJyxcbiAgICBpOiAnacyEJyxcbiAgICB1OiAndcyEJyxcbiAgICBlOiAnZcyEJyxcbiAgICBvOiAnb8yEJyxcbiAgfSBhcyB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9XG59O1xuXG5kZWNsYXJlIGludGVyZmFjZSB0ZW1wT2JqIHtcbiAgY29uc29uYW50OiBzdHJpbmcsXG4gIHZvd2VsPzogc3RyaW5nLFxuICBrYXRha2FuYTogYm9vbGVhbixcbiAgdGhyb3VnaDogYm9vbGVhbixcbiAgY2hhcjogc3RyaW5nLFxufVxuXG5jb25zdCBbbG93ZXJLYXRha2FuYSwgdXBwZXJLYXRha2FuYV0gPSBbMHgzMEExLCAweDMwRkJdO1xuXG5mdW5jdGlvbiBpc0thdGFrYW5hKGppOiBzdHJpbmcsIGV4dGVuZGVkPWZhbHNlKTogYm9vbGVhbiB7XG4gIGNvbnN0IGNvZGUgPSBqaS5jb2RlUG9pbnRBdCgwKTtcbiAgcmV0dXJuIGNvZGUhID49IGxvd2VyS2F0YWthbmEgJiYgY29kZSEgPCAoZXh0ZW5kZWQgPyAweDMwRkYgOiB1cHBlckthdGFrYW5hKTtcbn1cblxuZnVuY3Rpb24gaXNIaXJhZ2FuYShqaTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IGNvZGUgPSBqaS5jb2RlUG9pbnRBdCgwKTtcbiAgcmV0dXJuIGNvZGUhID49IDB4MzA0MSAmJiBjb2RlISA8PSAweDMwOUY7XG59XG5cbmNvbnN0IG5vSGlyYWdhbmFDb3JyZXNwb25kYW50ID0gJ+ODt+ODuOODueODuuODu+ODvOODvyc7XG5cbmZ1bmN0aW9uIGNvbnZIaXJhZ2FuYShqaTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKGlzS2F0YWthbmEoamkpICYmICFub0hpcmFnYW5hQ29ycmVzcG9uZGFudC5pbmNsdWRlcyhqaSkpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShqaS5jb2RlUG9pbnRBdCgwKSEgLSAweDYwKTtcbiAgfVxuICByZXR1cm4gamk7XG59XG5cbi8qKlxuICogSGlyYWdhbmEgaXMgdHJhbnNmb3JtZWQgaW50byBsb3dlciBjYXNlIG91dHB1dC5cbiAqIEthdGFrYW5hIGlzIHRyYW5zZm9ybWVkIGludG8gVVBQRVIgY2FzZSBvdXRwdXQuXG4gKiBgYGBqc1xuICogdG9Sb21hamkoJ+ODreODvOODnuOBmCcpIC8vID09PSAnUk/MhE1BamknO1xuICogYGBgXG4gKiBUaGUgc2VxdWVuY2VzIG9mIHNhbWUgdm93ZWxzIGFuZCAnb3UnIG91dHB1dCB3aXRoIHByb2xvbmdlZCB2b3dlbCBvZiB0aGUgZmlyc3QuXG4gKiBUaGUgc2VxdWVuY2Ugb2YgJ2VpJyBpcyBub3QgcmVwcmVzZW50ZWQgd2l0aCBsb25nICdlJy5cbiAqIGV4KVxuICogLSAn44Gh44Gh44KF44GG44GL44GEJywgJ2NoaWNodcyEa2FpJ1xuICogLSAn44G144KK44KH44GGJywgJ2Z1cnlvzIQnXG4gKiAtICfjgZfjgofjgYbjgYzjgY/jgZvjgYQnLCAnc2hvzIRnYWt1c2VpJ1xuICogXG4gKiBDYXZlYXQ6IFRoZSBydWxlIHRvIG5vdCBjb25zaWRlciBhcyBwcm9sb25nZWQgdm93ZWwgc291bmRcbiAqIHdoZW4gdGhlIGNvbnNlY3V0aXZlIHZvd2VscyBhcmUgZnJvbSBzZXBhcmF0ZSBLYW5qaXMgaXMgbm90IHJlc3BlY3RlZC5cbiAqIFxuICogZXgpICfjgY3jgYTjga/jgpPjgajjgYbjga7jgbDjgYLjgYQnXG4gKiAtIE9LOiAna2lpaGFudG/MhG5vYmFhaSdcbiAqIC0gT3VyIF93cm9uZ18gb3V0cHV0OiAna2nMhGhhbnRvzIRub2JhzIRpJ1xuICogXG4gKiAn44GK44GL44GC44GV44KTJ1xuICogLSBzaG91bGQgYmUgYW5kIGlzICdva2HMhHNhbidcbiAqIFxuICogJ+OBqOOBiuOCiidcbiAqIC0gc2hvdWxkIGJlIGFuZCBpcyAndG/MhHJpJ1xuICogQHBhcmFtIGthbmEgVGhlIGlucHV0IHdpdGggSGlyYWdhbmEvS2F0YWthbmFcbiAqIEByZXR1cm5zIFJvbWFqaSByZXByZXNlbnRhdGlvbiBvZiB0aGUgaW5wdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvUm9tYWppKGthbmE6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBbLi4ua2FuYV1cbiAgICAubWFwKChqaSkgPT4gKHtcbiAgICAgIGthdGFrYW5hOiBpc0thdGFrYW5hKGppKSxcbiAgICAgIGppOiBjb252SGlyYWdhbmEoamkpLFxuICAgICAgY2hhcjogamksXG4gICAgICB0aHJvdWdoOiAhaXNLYXRha2FuYShqaSwgdHJ1ZSkgJiYgIWlzSGlyYWdhbmEoamkpXG4gICAgfSkpXG4gICAgLm1hcCgoeyBqaSwga2F0YWthbmEsIHRocm91Z2gsIGNoYXIgfSkgPT5cbiAgICAoe1xuICAgICAgY29uc29uYW50OiBPYmplY3QuZW50cmllcyhtYXAuY29uc29uYW50KVxuICAgICAgICAuZmlsdGVyKChbLCB2XSkgPT4gdi5pbmNsdWRlcyhqaSkpXG4gICAgICAgIC5tYXAoKFtrLF0pID0+IGspLmpvaW4oKSxcbiAgICAgIHZvd2VsOiBPYmplY3QuZW50cmllcyhtYXAudm93ZWwpXG4gICAgICAgIC5maWx0ZXIoKFssIHZdKSA9PiB2LmluY2x1ZGVzKGppKSlcbiAgICAgICAgLm1hcCgoW2ssXSkgPT4gaykuam9pbigpLFxuICAgICAga2F0YWthbmEsXG4gICAgICB0aHJvdWdoLFxuICAgICAgY2hhcixcbiAgICB9IGFzIHRlbXBPYmopKVxuICAgIC5yZWR1Y2UoKHByZXYsIHsgY29uc29uYW50LCB2b3dlbCwga2F0YWthbmEsIHRocm91Z2gsIGNoYXIgfSwgaSwgYXJyKSA9PiB7XG4gICAgICBjb25zdCBuZXh0ID0gYXJyW2kgKyAxXTtcbiAgICAgIGNvbnN0IHByZXZpb3VzID0gcHJldltpIC0gMV07XG4gICAgICBpZiAoKHZvd2VsID09PSAnLScgJiYgcHJldmlvdXMgJiYgcHJldmlvdXMudm93ZWwpXG4gICAgICAgIHx8ICh2b3dlbCA9PT0gcHJldmlvdXM/LnZvd2VsICYmICFjb25zb25hbnQpXG4gICAgICAgIHx8ICh2b3dlbCA9PT0gJ3UnICYmICFjb25zb25hbnQgJiYgcHJldmlvdXM/LnZvd2VsID09PSAnbycpXG4gICAgICApIHtcbiAgICAgICAgcHJldmlvdXMudm93ZWwgPSBtYXAubG9uZ1Zvd2VsW3ByZXZpb3VzLnZvd2VsIHx8ICcnXTtcbiAgICAgICAgdm93ZWwgPSB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2UgaWYgKGNvbnNvbmFudCA9PT0gXCJzdXBQcmVcIikge1xuICAgICAgICBjb25zb25hbnQgPSBcIlwiO1xuICAgICAgICBpZiAocHJldmlvdXMuY29uc29uYW50ID09PSBcImZcIikge1xuICAgICAgICAgIGRlbGV0ZSBwcmV2aW91cy52b3dlbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjb25zb25hbnQgPT09IFwieVN1cFByZVwiKSB7XG4gICAgICAgIGNvbnNvbmFudCA9IFwieVwiO1xuICAgICAgICBpZiAocHJldmlvdXMpIHtcbiAgICAgICAgICBpZiAoW1wiaVwiLCBcImVcIl0uaW5jbHVkZXMocHJldmlvdXMudm93ZWwgfHwgXCJcIilcbiAgICAgICAgICAgIHx8IHByZXZpb3VzLmNvbnNvbmFudCA9PT0gXCJmXCIgJiYgcHJldmlvdXMudm93ZWwgPT09IFwidVwiKSB7XG4gICAgICAgICAgICBkZWxldGUgcHJldmlvdXMudm93ZWw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChbXCJzaFwiLCBcImNoXCIsIFwialwiXS5pbmNsdWRlcyhwcmV2aW91cy5jb25zb25hbnQpKSB7XG4gICAgICAgICAgICBjb25zb25hbnQgPSBcIlwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjb25zb25hbnQgPT09IFwicmVwZWF0TmV4dENvbnNvbmFudFwiKSB7XG4gICAgICAgIGNvbnNvbmFudCA9IG5leHQ/LmNvbnNvbmFudC5jaGFyQXQoMCkgfHwgXCJcIjtcbiAgICAgICAgaWYgKG5leHQ/LmNvbnNvbmFudCA9PT0gXCJjaFwiKSB7XG4gICAgICAgICAgY29uc29uYW50ID0gXCJ0XCI7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY29uc29uYW50ID09PSBcIm5cIiAmJiAhdm93ZWwpIHtcbiAgICAgICAgaWYgKG5leHQgJiYgIW5leHQuY29uc29uYW50KSB7XG4gICAgICAgICAgY29uc29uYW50ID0gXCJuLVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0ICYmIFsuLi5cImJwbVwiXS5pbmNsdWRlcyhuZXh0LmNvbnNvbmFudC5jaGFyQXQoMCkpKSB7XG4gICAgICAgICAgY29uc29uYW50ID0gXCJtXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHByZXYucHVzaCh7IGNvbnNvbmFudCwgdm93ZWwsIGthdGFrYW5hLCB0aHJvdWdoLCBjaGFyIH0pO1xuICAgICAgcmV0dXJuIHByZXY7XG4gICAgfSwgW10gYXMgdGVtcE9ialtdKVxuICAgIC5tYXAoKHsgY29uc29uYW50LCB2b3dlbCwga2F0YWthbmEsIHRocm91Z2gsIGNoYXIgfSkgPT4ge1xuICAgICAgaWYgKHRocm91Z2gpIHtcbiAgICAgICAgcmV0dXJuIGNoYXI7XG4gICAgICB9XG4gICAgICBpZiAoa2F0YWthbmEpIHtcbiAgICAgICAgcmV0dXJuIChjb25zb25hbnQgKyAodm93ZWwgfHwgXCJcIikpLnRvVXBwZXJDYXNlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29uc29uYW50ICsgKHZvd2VsIHx8IFwiXCIpO1xuICAgIH0pXG4gICAgLmpvaW4oXCJcIik7XG59Il19