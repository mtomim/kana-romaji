import { toRomaji } from "../../src/kana-romaji";

describe('kanaRomaji.ts', () => {
    test.each([
        ['ちちゅうかい', 'chichūkai'],
        ['しんぶんし', 'shimbunshi'],
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
        ['おんおふすいっち', 'on-ofusuitchi'],
        ['こんにゃく', 'konnyaku'],
        ['あんま', 'amma'],
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
    ])('translates %s to %s', (input, expected) => {
        expect(toRomaji(input)).toBe(expected);
    })
})