const map = {
  consonant: {
    k: [..."かきくけこ"],
    s: [..."さすせそ"],
    sh: ["し",],
    t: [..."たてと"],
    ts: ["つ",],
    ch: ["ち",],
    n: [..."なにぬねのん"],
    h: [..."はひへほ"],
    m: [..."まみむめも"],
    y: [..."やゆよ"],
    ySupPre: [..."ゃゅょ"],
    supPre: [..."ぁぃぅぇぉゎ"],
    r: [..."らりるれろ"],
    w: [..."わを",],
    f: ["ふ"],
    p: [..."ぱぴぷぺぽ"],
    b: [..."ばびぶべぼ"],
    j: [..."じぢ"],
    z: [..."ざずぜぞ"],
    d: [..."だでど"],
    g: [..."がぎぐげご"],
    repeatNextConsonant: ["っ"],
    v: ["ゔ"],
  },
  vowel: {
    a: [..."あかがさざただなはばぱまやらわぁゃゎ"],
    i: [..."いきぎしじちぢにひびぴみりぃ"],
    u: [..."うくぐすずつづぬふぶぷむゆるぅゅゔ"],
    e: [..."えけげせぜてでねへべぺめれぇ"],
    o: [..."おこごそぞとどのほぼぽもよろをょぉ"],
    "-": ["ー"]
  },
  longVowel: {
    a: 'ā',
    i: 'ī',
    u: 'ū',
    e: 'ē',
    o: 'ō',
  } as { [key: string]: string }
};

declare interface tempObj {
  consonant: string,
  vowel?: string,
  katakana: boolean,
  through: boolean,
  char: string,
}

const [lowerKatakana, upperKatakana] = [0x30A1, 0x30FB];

function isKatakana(ji: string, extended = false): boolean {
  const code = ji.codePointAt(0);
  return code! >= lowerKatakana && code! < (extended ? 0x30FF : upperKatakana);
}

function isHiragana(ji: string): boolean {
  const code = ji.codePointAt(0);
  return code! >= 0x3041 && code! <= 0x309F;
}

const noHiraganaCorrespondant = 'ヷヸヹヺ・ーヿ';

function convHiragana(ji: string): string {
  if (isKatakana(ji) && !noHiraganaCorrespondant.includes(ji)) {
    return String.fromCharCode(ji.codePointAt(0)! - 0x60);
  }
  return ji;
}

interface Strategy {
  matches: (previous: tempObj, vowel: string) => boolean;
  doWork: (previous: tempObj, curr: tempObj) => void;
}

interface GlobalStrategy {
  matches: (prev: tempObj, curr: tempObj, next: tempObj) => boolean;
  doWork: (prev: tempObj, curr: tempObj, next: tempObj) => void;
}

class SmallAiueoStrategies {
  static strategies: Strategy[] = [
    // JE, CHE, SHE
    {
      matches: (previous, vowel) => ['j', 'ch', 'sh'].includes(previous.consonant) && previous.vowel === 'i' && vowel === 'e',
      doWork: (previous) => delete previous.vowel,
    },
    // DU, TU
    {
      matches: (previous, vowel) => [...'td'].includes(previous.consonant) && previous.vowel === 'o' && vowel === 'u',
      doWork: (previous) => delete previous.vowel,
    },
    // DI, TI
    {
      matches: (previous, vowel) => [...'td'].includes(previous.consonant) && previous.vowel === 'e' && vowel === 'i',
      doWork: (previous) => delete previous.vowel,
    },
    // SI
    {
      matches: (previous, vowel) => ['s', 'z'].includes(previous.consonant) && previous.vowel === 'u' && vowel === 'i',
      doWork: (previous) => delete previous.vowel,
    },
    // Fa, Fi, Fu, Fe, Fo, Va, Vi, Vu, Ve, Vo
    {
      matches: (previous, vowel) => [..."fv"].includes(previous.consonant),
      doWork: (previous) => delete previous.vowel,
    },
    // YE
    {
      matches: (previous, vowel) => previous.consonant === '' && previous.vowel === 'i' && vowel === 'e',
      doWork: (previous) => previous.vowel = 'y',
    },
    // WO, WI, WE
    {
      matches: (previous, vowel) => previous.consonant === '' && previous.vowel === 'u' && [...'oei'].includes(vowel),
      doWork: (previous) => previous.vowel = 'w',
    },
    // TWA
    {
      matches: (previous, vowel) => previous.consonant === 't' && previous.vowel === 'o' && vowel !== 'u',
      doWork: (previous) => previous.vowel = 'w',
    },
    // GWA, KWA
    {
      matches: (previous, vowel) => ['k','g'].includes(previous.consonant) && previous.vowel === 'u' && vowel !== 'u',
      doWork: (previous) => previous.vowel = 'w',
    },
    // HYE, BYE, PYE, KYE
    {
      matches: (previous, vowel) => [...'bhkp'].includes(previous.consonant) && previous.vowel === 'i' && vowel === 'e',
      doWork: (previous) => previous.vowel = 'y',
    },
    // TSA, TSI, TSE, TSO
    {
      matches: (previous, vowel) => previous.consonant === 'ts' && previous.vowel === 'u',
      doWork: (previous) => delete previous.vowel,
    },
  ];
  static doWork(previous: tempObj, curr: tempObj): void {
    SmallAiueoStrategies.strategies
      .filter(strategy => strategy.matches(previous, curr.vowel!))
      .forEach(strategy => strategy.doWork(previous, curr));
  }
}

class SmallYayuyoStrategies {
  static strategies: Strategy[] = [
    {
      matches: (previous, vowel) => ["i", "e"].includes(previous.vowel!),
      doWork: (previous) => delete previous.vowel,
    },
    {
      matches: (previous, vowel) => [..."fv"].includes(previous.consonant) && previous.vowel === "u",
      doWork: (previous) => delete previous.vowel,
    },
    {
      matches: (previous, vowel) => ["sh", "ch", "j"].includes(previous.consonant),
      doWork: (previous, curr) => curr.consonant = ""
    },
  ];
  static doWork(previous: tempObj, curr: tempObj): void {
    curr.consonant = "y";
    if (!previous) {
      return;
    }
    SmallYayuyoStrategies.strategies
      .filter(strategy => strategy.matches(previous, curr.vowel!))
      .forEach(strategy => strategy.doWork(previous, curr));
  }
}

class GlobalStrategies {
  static strategies: GlobalStrategy[] = [
    {
      matches: (prev, curr, next) => (curr.vowel === '-' && prev && !!prev.vowel)
        || (curr.vowel === prev?.vowel && !curr.consonant)
        || (curr.vowel === 'u' && !curr.consonant && prev?.vowel === 'o'),
      doWork: (prev, curr, next) => {
        prev.vowel = map.longVowel[prev.vowel || ''];
        curr.vowel = undefined;
      }
    },
    {
      matches: (prev, curr, next) => curr.consonant === "supPre",
      doWork: (prev, curr, next) => {
        SmallAiueoStrategies.doWork(prev, curr);
        curr.consonant = "";
      }
    },
    {
      matches: (prev, curr, next) => curr.consonant === "ySupPre",
      doWork: (prev, curr, next) => SmallYayuyoStrategies.doWork(prev, curr),
    },
    {
      matches: (prev, curr, next) => curr.consonant === "repeatNextConsonant",
      doWork: (prev, curr, next) => {
        curr.consonant = next?.consonant.charAt(0) || "";
        if (next?.consonant === "ch") {
          curr.consonant = "t";
        }
      }
    },
    {
      matches: (prev, curr, next) => curr.consonant === "n" && !curr.vowel,
      doWork: (prev, curr, next) => {
        if (next && (!next.consonant || next.consonant === 'y')) {
          curr.consonant = "n’";
        }
      }
    }
  ];
  static doWork = (prev: tempObj, curr: tempObj, next: tempObj): void =>
    GlobalStrategies.strategies
      .filter(strategy => strategy.matches(prev, curr, next))
      .forEach(strategy => strategy.doWork(prev, curr, next))
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
export function toRomaji(kana: string): string {
  return [...kana]
    .map((ji) => ({
      katakana: isKatakana(ji),
      ji: convHiragana(ji),
      char: ji,
      through: !isKatakana(ji, true) && !isHiragana(ji)
    }))
    .map(({ ji, katakana, through, char }) =>
    ({
      consonant: Object.entries(map.consonant)
        .filter(([, v]) => v.includes(ji))
        .map(([k,]) => k).join(),
      vowel: Object.entries(map.vowel)
        .filter(([, v]) => v.includes(ji))
        .map(([k,]) => k).join(),
      katakana,
      through,
      char,
    } as tempObj))
    .reduce((target, curr, i, arr) => {
      const next = arr[i + 1];
      const previous = target[i - 1];
      GlobalStrategies.doWork(previous, curr, next);
      target.push(curr);
      return target;
    }, [] as tempObj[])
    .map(({ consonant, vowel, katakana, through, char }) => {
      if (through) {
        return char;
      }
      if (katakana) {
        return (consonant + (vowel || "")).toUpperCase();
      }
      return consonant + (vowel || "");
    })
    .join("");
}