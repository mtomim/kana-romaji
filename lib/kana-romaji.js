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
    repeatNextConsonant: ["っ"],
    v: ["ゔ"]
  },
  vowel: {
    a: _toConsumableArray("あかがさざただなはばぱまやらわぁゃ"),
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

      if (_toConsumableArray("fv").includes(previous.consonant)) {
        delete previous.vowel;
      }
    } else if (consonant === "ySupPre") {
      consonant = "y";

      if (previous) {
        if (["i", "e"].includes(previous.vowel || "") || _toConsumableArray("fv").includes(previous.consonant) && previous.vowel === "u") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rYW5hLXJvbWFqaS50cyJdLCJuYW1lcyI6WyJtYXAiLCJjb25zb25hbnQiLCJrIiwicyIsInNoIiwidCIsInRzIiwiY2giLCJuIiwiaCIsIm0iLCJ5IiwieVN1cFByZSIsInN1cFByZSIsInIiLCJ3IiwiZiIsInAiLCJiIiwiaiIsInoiLCJkIiwiZyIsInJlcGVhdE5leHRDb25zb25hbnQiLCJ2Iiwidm93ZWwiLCJhIiwiaSIsInUiLCJlIiwibyIsImxvbmdWb3dlbCIsImxvd2VyS2F0YWthbmEiLCJ1cHBlckthdGFrYW5hIiwiaXNLYXRha2FuYSIsImppIiwiZXh0ZW5kZWQiLCJjb2RlIiwiY29kZVBvaW50QXQiLCJpc0hpcmFnYW5hIiwibm9IaXJhZ2FuYUNvcnJlc3BvbmRhbnQiLCJjb252SGlyYWdhbmEiLCJpbmNsdWRlcyIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsInRvUm9tYWppIiwia2FuYSIsImthdGFrYW5hIiwidGhyb3VnaCIsImNoYXIiLCJPYmplY3QiLCJlbnRyaWVzIiwiZmlsdGVyIiwiam9pbiIsInJlZHVjZSIsInByZXYiLCJhcnIiLCJuZXh0IiwicHJldmlvdXMiLCJ1bmRlZmluZWQiLCJjaGFyQXQiLCJwdXNoIiwidG9VcHBlckNhc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLEdBQUcsR0FBRztBQUNWQyxFQUFBQSxTQUFTLEVBQUU7QUFDVEMsSUFBQUEsQ0FBQyxxQkFBTSxPQUFOLENBRFE7QUFFVEMsSUFBQUEsQ0FBQyxxQkFBTSxNQUFOLENBRlE7QUFHVEMsSUFBQUEsRUFBRSxFQUFFLENBQUMsR0FBRCxDQUhLO0FBSVRDLElBQUFBLENBQUMscUJBQU0sS0FBTixDQUpRO0FBS1RDLElBQUFBLEVBQUUsRUFBRSxDQUFDLEdBQUQsQ0FMSztBQU1UQyxJQUFBQSxFQUFFLEVBQUUsQ0FBQyxHQUFELENBTks7QUFPVEMsSUFBQUEsQ0FBQyxxQkFBTSxRQUFOLENBUFE7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QUMzQkEsUUFBQUEsU0FBUyxHQUFHLElBQVo7QUFDRDs7QUFDRCxVQUFJd0QsSUFBSSxJQUFJLG1CQUFJLEtBQUosRUFBV2YsUUFBWCxDQUFvQmUsSUFBSSxDQUFDeEQsU0FBTCxDQUFlMkQsTUFBZixDQUFzQixDQUF0QixDQUFwQixDQUFaLEVBQTJEO0FBQ3pEM0QsUUFBQUEsU0FBUyxHQUFHLEdBQVo7QUFDRDtBQUNGOztBQUNEc0QsSUFBQUEsSUFBSSxDQUFDTSxJQUFMLENBQVU7QUFBRTVELE1BQUFBLFNBQVMsRUFBVEEsU0FBRjtBQUFhd0IsTUFBQUEsS0FBSyxFQUFMQSxLQUFiO0FBQW9Cc0IsTUFBQUEsUUFBUSxFQUFSQSxRQUFwQjtBQUE4QkMsTUFBQUEsT0FBTyxFQUFQQSxPQUE5QjtBQUF1QyxjQUFBQztBQUF2QyxLQUFWO0FBQ0EsV0FBT00sSUFBUDtBQUNELEdBM0RJLEVBMkRGLEVBM0RFLEVBNERKdkQsR0E1REksQ0E0REEsa0JBQW1EO0FBQUEsUUFBaERDLFNBQWdELFVBQWhEQSxTQUFnRDtBQUFBLFFBQXJDd0IsS0FBcUMsVUFBckNBLEtBQXFDO0FBQUEsUUFBOUJzQixRQUE4QixVQUE5QkEsUUFBOEI7QUFBQSxRQUFwQkMsT0FBb0IsVUFBcEJBLE9BQW9CO0FBQUEsUUFBWEMsTUFBVzs7QUFDdEQsUUFBSUQsT0FBSixFQUFhO0FBQ1gsYUFBT0MsTUFBUDtBQUNEOztBQUNELFFBQUlGLFFBQUosRUFBYztBQUNaLGFBQU8sQ0FBQzlDLFNBQVMsSUFBSXdCLEtBQUssSUFBSSxFQUFiLENBQVYsRUFBNEJxQyxXQUE1QixFQUFQO0FBQ0Q7O0FBQ0QsV0FBTzdELFNBQVMsSUFBSXdCLEtBQUssSUFBSSxFQUFiLENBQWhCO0FBQ0QsR0FwRUksRUFxRUo0QixJQXJFSSxDQXFFQyxFQXJFRCxDQUFQO0FBc0VEIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbWFwID0ge1xuICBjb25zb25hbnQ6IHtcbiAgICBrOiBbLi4uXCLjgYvjgY3jgY/jgZHjgZNcIl0sXG4gICAgczogWy4uLlwi44GV44GZ44Gb44GdXCJdLFxuICAgIHNoOiBbXCLjgZdcIixdLFxuICAgIHQ6IFsuLi5cIuOBn+OBpuOBqFwiXSxcbiAgICB0czogW1wi44GkXCIsXSxcbiAgICBjaDogW1wi44GhXCIsXSxcbiAgICBuOiBbLi4uXCLjgarjgavjgazjga3jga7jgpNcIl0sXG4gICAgaDogWy4uLlwi44Gv44Gy44G444G7XCJdLFxuICAgIG06IFsuLi5cIuOBvuOBv+OCgOOCgeOCglwiXSxcbiAgICB5OiBbLi4uXCLjgoTjgobjgohcIl0sXG4gICAgeVN1cFByZTogWy4uLlwi44KD44KF44KHXCJdLFxuICAgIHN1cFByZTogWy4uLlwi44GB44GD44GF44GH44GJXCJdLFxuICAgIHI6IFsuLi5cIuOCieOCiuOCi+OCjOOCjVwiXSxcbiAgICB3OiBbLi4uXCLjgo/jgpJcIixdLFxuICAgIGY6IFtcIuOBtVwiXSxcbiAgICBwOiBbLi4uXCLjgbHjgbTjgbfjgbrjgb1cIl0sXG4gICAgYjogWy4uLlwi44Gw44Gz44G244G544G8XCJdLFxuICAgIGo6IFsuLi5cIuOBmOOBolwiXSxcbiAgICB6OiBbLi4uXCLjgZbjgZrjgZzjgZ5cIl0sXG4gICAgZDogWy4uLlwi44Gg44Gn44GpXCJdLFxuICAgIGc6IFsuLi5cIuOBjOOBjuOBkOOBkuOBlFwiXSxcbiAgICByZXBlYXROZXh0Q29uc29uYW50OiBbXCLjgaNcIl0sXG4gICAgdjogW1wi44KUXCJdLFxuICB9LFxuICB2b3dlbDoge1xuICAgIGE6IFsuLi5cIuOBguOBi+OBjOOBleOBluOBn+OBoOOBquOBr+OBsOOBseOBvuOChOOCieOCj+OBgeOCg1wiXSxcbiAgICBpOiBbLi4uXCLjgYTjgY3jgY7jgZfjgZjjgaHjgaLjgavjgbLjgbPjgbTjgb/jgorjgYNcIl0sXG4gICAgdTogWy4uLlwi44GG44GP44GQ44GZ44Ga44Gk44Gl44Gs44G144G244G344KA44KG44KL44GF44KF44KUXCJdLFxuICAgIGU6IFsuLi5cIuOBiOOBkeOBkuOBm+OBnOOBpuOBp+OBreOBuOOBueOBuuOCgeOCjOOBh1wiXSxcbiAgICBvOiBbLi4uXCLjgYrjgZPjgZTjgZ3jgZ7jgajjganjga7jgbvjgbzjgb3jgoLjgojjgo3jgpLjgofjgYlcIl0sXG4gICAgXCItXCI6IFtcIuODvFwiXVxuICB9LFxuICBsb25nVm93ZWw6IHtcbiAgICBhOiAnxIEnLFxuICAgIGk6ICfEqycsXG4gICAgdTogJ8WrJyxcbiAgICBlOiAnxJMnLFxuICAgIG86ICfFjScsXG4gIH0gYXMgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfVxufTtcblxuZGVjbGFyZSBpbnRlcmZhY2UgdGVtcE9iaiB7XG4gIGNvbnNvbmFudDogc3RyaW5nLFxuICB2b3dlbD86IHN0cmluZyxcbiAga2F0YWthbmE6IGJvb2xlYW4sXG4gIHRocm91Z2g6IGJvb2xlYW4sXG4gIGNoYXI6IHN0cmluZyxcbn1cblxuY29uc3QgW2xvd2VyS2F0YWthbmEsIHVwcGVyS2F0YWthbmFdID0gWzB4MzBBMSwgMHgzMEZCXTtcblxuZnVuY3Rpb24gaXNLYXRha2FuYShqaTogc3RyaW5nLCBleHRlbmRlZD1mYWxzZSk6IGJvb2xlYW4ge1xuICBjb25zdCBjb2RlID0gamkuY29kZVBvaW50QXQoMCk7XG4gIHJldHVybiBjb2RlISA+PSBsb3dlckthdGFrYW5hICYmIGNvZGUhIDwgKGV4dGVuZGVkID8gMHgzMEZGIDogdXBwZXJLYXRha2FuYSk7XG59XG5cbmZ1bmN0aW9uIGlzSGlyYWdhbmEoamk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCBjb2RlID0gamkuY29kZVBvaW50QXQoMCk7XG4gIHJldHVybiBjb2RlISA+PSAweDMwNDEgJiYgY29kZSEgPD0gMHgzMDlGO1xufVxuXG5jb25zdCBub0hpcmFnYW5hQ29ycmVzcG9uZGFudCA9ICfjg7fjg7jjg7njg7rjg7vjg7zjg78nO1xuXG5mdW5jdGlvbiBjb252SGlyYWdhbmEoamk6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChpc0thdGFrYW5hKGppKSAmJiAhbm9IaXJhZ2FuYUNvcnJlc3BvbmRhbnQuaW5jbHVkZXMoamkpKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoamkuY29kZVBvaW50QXQoMCkhIC0gMHg2MCk7XG4gIH1cbiAgcmV0dXJuIGppO1xufVxuXG4vKipcbiAqIEhpcmFnYW5hIGlzIHRyYW5zZm9ybWVkIGludG8gbG93ZXIgY2FzZSBvdXRwdXQuXG4gKiBLYXRha2FuYSBpcyB0cmFuc2Zvcm1lZCBpbnRvIFVQUEVSIGNhc2Ugb3V0cHV0LlxuICogYGBganNcbiAqIHRvUm9tYWppKCfjg63jg7zjg57jgZgnKSAvLyA9PT0gJ1JPzIRNQWppJztcbiAqIGBgYFxuICogVGhlIHNlcXVlbmNlcyBvZiBzYW1lIHZvd2VscyBhbmQgJ291JyBvdXRwdXQgd2l0aCBwcm9sb25nZWQgdm93ZWwgb2YgdGhlIGZpcnN0LlxuICogVGhlIHNlcXVlbmNlIG9mICdlaScgaXMgbm90IHJlcHJlc2VudGVkIHdpdGggbG9uZyAnZScuXG4gKiBleClcbiAqIC0gJ+OBoeOBoeOCheOBhuOBi+OBhCcsICdjaGljaHXMhGthaSdcbiAqIC0gJ+OBteOCiuOCh+OBhicsICdmdXJ5b8yEJ1xuICogLSAn44GX44KH44GG44GM44GP44Gb44GEJywgJ3Nob8yEZ2FrdXNlaSdcbiAqIFxuICogQ2F2ZWF0OiBUaGUgcnVsZSB0byBub3QgY29uc2lkZXIgYXMgcHJvbG9uZ2VkIHZvd2VsIHNvdW5kXG4gKiB3aGVuIHRoZSBjb25zZWN1dGl2ZSB2b3dlbHMgYXJlIGZyb20gc2VwYXJhdGUgS2FuamlzIGlzIG5vdCByZXNwZWN0ZWQuXG4gKiBcbiAqIGV4KSAn44GN44GE44Gv44KT44Go44GG44Gu44Gw44GC44GEJ1xuICogLSBPSzogJ2tpaWhhbnRvzIRub2JhYWknXG4gKiAtIE91ciBfd3JvbmdfIG91dHB1dDogJ2tpzIRoYW50b8yEbm9iYcyEaSdcbiAqIFxuICogJ+OBiuOBi+OBguOBleOCkydcbiAqIC0gc2hvdWxkIGJlIGFuZCBpcyAnb2thzIRzYW4nXG4gKiBcbiAqICfjgajjgYrjgoonXG4gKiAtIHNob3VsZCBiZSBhbmQgaXMgJ3RvzIRyaSdcbiAqIEBwYXJhbSBrYW5hIFRoZSBpbnB1dCB3aXRoIEhpcmFnYW5hL0thdGFrYW5hXG4gKiBAcmV0dXJucyBSb21hamkgcmVwcmVzZW50YXRpb24gb2YgdGhlIGlucHV0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b1JvbWFqaShrYW5hOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gWy4uLmthbmFdXG4gICAgLm1hcCgoamkpID0+ICh7XG4gICAgICBrYXRha2FuYTogaXNLYXRha2FuYShqaSksXG4gICAgICBqaTogY29udkhpcmFnYW5hKGppKSxcbiAgICAgIGNoYXI6IGppLFxuICAgICAgdGhyb3VnaDogIWlzS2F0YWthbmEoamksIHRydWUpICYmICFpc0hpcmFnYW5hKGppKVxuICAgIH0pKVxuICAgIC5tYXAoKHsgamksIGthdGFrYW5hLCB0aHJvdWdoLCBjaGFyIH0pID0+XG4gICAgKHtcbiAgICAgIGNvbnNvbmFudDogT2JqZWN0LmVudHJpZXMobWFwLmNvbnNvbmFudClcbiAgICAgICAgLmZpbHRlcigoWywgdl0pID0+IHYuaW5jbHVkZXMoamkpKVxuICAgICAgICAubWFwKChbayxdKSA9PiBrKS5qb2luKCksXG4gICAgICB2b3dlbDogT2JqZWN0LmVudHJpZXMobWFwLnZvd2VsKVxuICAgICAgICAuZmlsdGVyKChbLCB2XSkgPT4gdi5pbmNsdWRlcyhqaSkpXG4gICAgICAgIC5tYXAoKFtrLF0pID0+IGspLmpvaW4oKSxcbiAgICAgIGthdGFrYW5hLFxuICAgICAgdGhyb3VnaCxcbiAgICAgIGNoYXIsXG4gICAgfSBhcyB0ZW1wT2JqKSlcbiAgICAucmVkdWNlKChwcmV2LCB7IGNvbnNvbmFudCwgdm93ZWwsIGthdGFrYW5hLCB0aHJvdWdoLCBjaGFyIH0sIGksIGFycikgPT4ge1xuICAgICAgY29uc3QgbmV4dCA9IGFycltpICsgMV07XG4gICAgICBjb25zdCBwcmV2aW91cyA9IHByZXZbaSAtIDFdO1xuICAgICAgaWYgKCh2b3dlbCA9PT0gJy0nICYmIHByZXZpb3VzICYmIHByZXZpb3VzLnZvd2VsKVxuICAgICAgICB8fCAodm93ZWwgPT09IHByZXZpb3VzPy52b3dlbCAmJiAhY29uc29uYW50KVxuICAgICAgICB8fCAodm93ZWwgPT09ICd1JyAmJiAhY29uc29uYW50ICYmIHByZXZpb3VzPy52b3dlbCA9PT0gJ28nKVxuICAgICAgKSB7XG4gICAgICAgIHByZXZpb3VzLnZvd2VsID0gbWFwLmxvbmdWb3dlbFtwcmV2aW91cy52b3dlbCB8fCAnJ107XG4gICAgICAgIHZvd2VsID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIGlmIChjb25zb25hbnQgPT09IFwic3VwUHJlXCIpIHtcbiAgICAgICAgY29uc29uYW50ID0gXCJcIjtcbiAgICAgICAgaWYgKFsuLi5cImZ2XCJdLmluY2x1ZGVzKHByZXZpb3VzLmNvbnNvbmFudCkpIHtcbiAgICAgICAgICBkZWxldGUgcHJldmlvdXMudm93ZWw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY29uc29uYW50ID09PSBcInlTdXBQcmVcIikge1xuICAgICAgICBjb25zb25hbnQgPSBcInlcIjtcbiAgICAgICAgaWYgKHByZXZpb3VzKSB7XG4gICAgICAgICAgaWYgKFtcImlcIiwgXCJlXCJdLmluY2x1ZGVzKHByZXZpb3VzLnZvd2VsIHx8IFwiXCIpXG4gICAgICAgICAgICB8fCBbLi4uXCJmdlwiXS5pbmNsdWRlcyhwcmV2aW91cy5jb25zb25hbnQpICYmIHByZXZpb3VzLnZvd2VsID09PSBcInVcIikge1xuICAgICAgICAgICAgZGVsZXRlIHByZXZpb3VzLnZvd2VsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoW1wic2hcIiwgXCJjaFwiLCBcImpcIl0uaW5jbHVkZXMocHJldmlvdXMuY29uc29uYW50KSkge1xuICAgICAgICAgICAgY29uc29uYW50ID0gXCJcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY29uc29uYW50ID09PSBcInJlcGVhdE5leHRDb25zb25hbnRcIikge1xuICAgICAgICBjb25zb25hbnQgPSBuZXh0Py5jb25zb25hbnQuY2hhckF0KDApIHx8IFwiXCI7XG4gICAgICAgIGlmIChuZXh0Py5jb25zb25hbnQgPT09IFwiY2hcIikge1xuICAgICAgICAgIGNvbnNvbmFudCA9IFwidFwiO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGNvbnNvbmFudCA9PT0gXCJuXCIgJiYgIXZvd2VsKSB7XG4gICAgICAgIGlmIChuZXh0ICYmICFuZXh0LmNvbnNvbmFudCkge1xuICAgICAgICAgIGNvbnNvbmFudCA9IFwibi1cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV4dCAmJiBbLi4uXCJicG1cIl0uaW5jbHVkZXMobmV4dC5jb25zb25hbnQuY2hhckF0KDApKSkge1xuICAgICAgICAgIGNvbnNvbmFudCA9IFwibVwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwcmV2LnB1c2goeyBjb25zb25hbnQsIHZvd2VsLCBrYXRha2FuYSwgdGhyb3VnaCwgY2hhciB9KTtcbiAgICAgIHJldHVybiBwcmV2O1xuICAgIH0sIFtdIGFzIHRlbXBPYmpbXSlcbiAgICAubWFwKCh7IGNvbnNvbmFudCwgdm93ZWwsIGthdGFrYW5hLCB0aHJvdWdoLCBjaGFyIH0pID0+IHtcbiAgICAgIGlmICh0aHJvdWdoKSB7XG4gICAgICAgIHJldHVybiBjaGFyO1xuICAgICAgfVxuICAgICAgaWYgKGthdGFrYW5hKSB7XG4gICAgICAgIHJldHVybiAoY29uc29uYW50ICsgKHZvd2VsIHx8IFwiXCIpKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnNvbmFudCArICh2b3dlbCB8fCBcIlwiKTtcbiAgICB9KVxuICAgIC5qb2luKFwiXCIpO1xufSJdfQ==