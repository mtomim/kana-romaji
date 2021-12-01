import { toRomaji } from "../../src/kana-romaji";

describe('kanaRomaji.ts', () => {
    test.each([
        ['ちちゅうかい', 'chichūkai'],
        ['しんぶんし', 'shinbunshi'],
        ['いっぱんじん', 'ippanjin'],
        ['しょうがくせい', 'shōgakusei'],
        ['おぅ', 'ou'],
        ['おっ', 'o'],
        ['かちょう', 'kachō'],
        ['ひょう', 'hyō'],
        ['みょう', 'myō'],
        ['ぎょう', 'gyō'],
        ['じょう', 'jō'],
        ['ょゅぅ', 'yoyuu'],
        ['ひょうご', 'hyōgo'],
        ['ひゅーご', 'hyūgo'],
        ['ふぃーちゅあー', 'fīchuā'],
        ['ふゅーちゃー', 'fyūchā'],
        ['みふぁそ', 'mifaso'],
        ['ふらんすご', 'furansugo'],
        ['ふぁみりー', 'famirī'],
        ['ふらの', 'furano'],
        ['ふりょう', 'furyō'],
        ['おんおふすいっち', 'on’ofusuitchi'],
        ['こんにゃく', 'konnyaku'],
        ['あんま', 'anma'],
        ['おかあさん', 'okāsan'],
        ['きーきー', 'kīkī'],
        ['けーき', 'kēki'],
        ['ケーキ', 'KĒKI'],
        ['とおり', 'tōri'],
        ['きいはんとう', 'kīhantō'],
        ['ろくおんテープ', 'rokuonTĒPU'],
        ['S.O.S.はエスオーエス', 'S.O.S.haESUŌESU'],
        ['こうこうせい、しょうがくせい、だいがくせい', 'kōkōsei、shōgakusei、daigakusei'],
        ['ヴュー', 'VYŪ'],
        ['ゔぃ', 'vi'],
        ['イェ', 'YE'],
        ['ウィ', 'WI'],
        ['ウェ', 'WE'],
        ['ウォ', 'WO'],
        ['ヴァ', 'VA'],
        ['ヴィ', 'VI'],
        ['ヴ', 'VU'],
        ['ヴェ', 'VE'],
        ['ヴォ', 'VO'],
        ['ヴュ', 'VYU'],
        ['スィ', 'SI'],
        ['シェ', 'SHE'],
        ['ズィ', 'ZI'],
        ['ジェ', 'JE'],
        ['ティ', 'TI'],
        ['トゥ', 'TU'],
        ['チェ', 'CHE'],
        ['ディ', 'DI'],
        ['ドゥ', 'DU'],
        ['ヂェ', 'JE'],
        ['ファ', 'FA'],
        ['フィ', 'FI'],
        ['フェ', 'FE'],
        ['フォ', 'FO'],

        ['いぇ', 'ye'],
        ['うぃ', 'wi'],
        ['うぇ', 'we'],
        ['うぉ', 'wo'],
        ['ゔぁ', 'va'],
        ['ゔぃ', 'vi'],
        ['ゔ', 'vu'],
        ['ゔぇ', 've'],
        ['ゔぉ', 'vo'],
        ['ゔゅ', 'vyu'],
        ['すぃ', 'si'],
        ['しぇ', 'she'],
        ['ずぃ', 'zi'],
        ['じぇ', 'je'],
        ['てぃ', 'ti'],
        ['とぅ', 'tu'],
        ['ちぇ', 'che'],
        ['でぃ', 'di'],
        ['どぅ', 'du'],
        ['ぢぇ', 'je'],
        ['ふぁ', 'fa'],
        ['ふぃ', 'fi'],
        ['ふぇ', 'fe'],
        ['ふぉ', 'fo'],
        ['きゃ', 'kya'],
        ['きゅ', 'kyu'],
        ['きょ', 'kyo'],
        ['ぎゃ', 'gya'],
        ['ぎゅ', 'gyu'],
        ['ぎょ', 'gyo'],
        ['しゃ', 'sha'],
        ['しゅ', 'shu'],
        ['しょ', 'sho'],
        ['じゃ', 'ja'],
        ['じゅ', 'ju'],
        ['じょ', 'jo'],
        ['ちゃ', 'cha'],
        ['ちゅ', 'chu'],
        ['ちょ', 'cho'],
        ['ぢゃ', 'ja'],
        ['ぢゅ', 'ju'],
        ['ぢょ', 'jo'],
        ['にゃ', 'nya'],
        ['にゅ', 'nyu'],
        ['にょ', 'nyo'],
        ['ひゃ', 'hya'],
        ['ひゅ', 'hyu'],
        ['ひょ', 'hyo'],
        ['びゃ', 'bya'],
        ['びゅ', 'byu'],
        ['びょ', 'byo'],
        ['ぴゃ', 'pya'],
        ['ぴゅ', 'pyu'],
        ['ぴょ', 'pyo'],
        ['みゃ', 'mya'],
        ['みゅ', 'myu'],
        ['みょ', 'myo'],
        ['りゃ', 'rya'],
        ['りゅ', 'ryu'],
        ['りょ', 'ryo'],
        // sh で始まる音節の前では、促音は s で表します。
        // ch と ts の前では、t を使います。
        ['かった', 'katta'],
        ['いっぽう', 'ippō'],
        ['ぶっだ', 'budda'],
        ['あっしゅく', 'asshuku'],
        ['あっちゃく', 'atchaku'],
        ['よっつ', 'yottsu'],
        ['ほんい', 'hon’i'],
        ['ほんやく', 'hon’yaku'],
        ['てゃ', 'tya'],
        ['てゅ', 'tyu'],
        ['てょ', 'tyo'],
        ['とぁ', 'twa'],
        ['ぐぁ', 'gwa'],
        ['ぐぃ', 'gwi'],
        ['ぐぇ', 'gwe'],
        ['ぐぉ', 'gwo'],
        ['ぐゎ', 'gwa'],
        ['くぁ', 'kwa'],
        ['くぃ', 'kwi'],
        ['くぇ', 'kwe'],
        ['くぉ', 'kwo'],
        ['くゎ', 'kwa'],
        ['ひぇ', 'hye'],
        ['びぇ', 'bye'],
        ['ぴぇ', 'pye'],
        ['きぇ', 'kye'],
        ['ツァー', 'TSĀ'],
        ['ツィゴイネル', 'TSIGOINERU'],
        ['ツェツェばえ', 'TSETSEbae'],
        ['ケカッツォ', 'KEKATTSO'],
    ])('translates %s into %s', (input, expected) => {
        expect(toRomaji(input)).toBe(expected);
    })
})