# kana-romaji, kana to alphabet converting library

Hiragana is transformed into lower case output.
Katakana is transformed into UPPER case output.
```js
toRomaji('ローマじ') // === 'RŌMAji';
```
The sequences of same vowels and 'ou' output with prolonged vowel of the first.
The sequence of 'ei' is not represented with long 'e'.
ex)
- 'ちちゅうかい', 'chichūkai'
- 'ふりょう', 'furyō'
- 'しょうがくせい', 'shōgakusei'

Caveat: The rule to not consider as prolonged vowel sound
when the consecutive vowels are from separate Kanjis is not respected.

ex) 'きいはんとうのばあい'
- OK: 'kiihantōnobaai'
- Our _wrong_ output: 'kīhantōnobāi'

'おかあさん'
- should be and is 'okāsan'

'とおり'
- should be and is 'tōri'

## What about wanakana?
WanaKana https://github.com/WaniKani/WanaKana offers various conversions between Kana and Romaji. Their functionality was somewhat limited in terms of rules of Romaji. Sequence 'ou' in 'こうこうせい' is transformed into 'koukousei' instead of
'kōkōsei'.

## References
University of Tokyo had the following document for recommended Romaji representation.
- https://park.itc.u-tokyo.ac.jp/eigo/UT-Komaba-Nihongo-no-romaji-hyoki-v1.pdf

## I use this!
I'm using this library inside `word-decks` https://github.com/mtomim/word-decks project, a simple learning-card application.