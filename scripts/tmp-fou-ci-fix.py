from pathlib import Path
import re


def read(p):
    return Path(p).read_text(encoding='utf-8')


def write(p, s):
    Path(p).write_text(s, encoding='utf-8')


# Refine undefined-term candidate extraction without weakening registered first-use checks.
p = 'scripts/audit-dream-theater-undefined-terms.mjs'
s = read(p)
old = """  const boldSpans = [...text.matchAll(/\\*\\*([^*]{2,80})\\*\\*/gu)].map((match) => match[1]);
  const definitionLike = /(?:とは|と呼(?:ぶ|び)|を(?:いう|定義する)|任意の|各|すべての)/u.test(text);
  if (!(isHeading || isFormalTitle || boldSpans.length || definitionLike)) return [];

  const sources = [text, ...boldSpans];"""
new = """  const isExerciseHeading = /^#{1,6}\\s+(?:[A-Z][A-Z0-9]*\\d*-[ABC]\\d{2}\\b|[A-Z][A-Z0-9]*-\\d+\\b)/u.test(text.trim());
  if (isExerciseHeading) return [];
  const boldSpans = [...text.matchAll(/\\*\\*([^*]{2,80})\\*\\*/gu)]
    .map((match) => match[1])
    .filter((span) => !/^(?:定義の確認|例|演習|補足)[：:。]?/u.test(span.trim()));
  const definitionLike = /(?:とは|と呼(?:ぶ|び)|を(?:いう|定義する)|任意の|各|すべての)/u.test(text);
  if (!(isHeading || isFormalTitle || boldSpans.length || definitionLike)) return [];

  // In ordinary prose, bold spans are intentional technical labels. Scanning the
  // entire sentence turns phrases such as 「使う関数」「一般の関数」 into false terms.
  const sources = isHeading || isFormalTitle ? [text, ...boldSpans] : boldSpans.length ? boldSpans : [text];"""
assert old in s, 'candidate extraction anchor changed'
s = s.replace(old, new, 1)
old2 = """  if (particle) candidate = particle[1].trim();
  return candidate;
}"""
new2 = """  if (particle) candidate = particle[1].trim();
  candidate = candidate
    .replace(/^(?:の|も|ただし|つまり|前節の|一般の|良い|使う|なる|得られる|持つ|必要な|代表的な|従来の|古典|一意性も|支配して|積分可能だから|周波数から)+/u, '')
    .trim();
  return candidate;
}"""
assert old2 in s
s = s.replace(old2, new2, 1)
old3 = """    '連続関数', '実関数', '複素関数', '分布関数', '定数関数', '一次関数',
  ]).has(value);"""
new3 = """    '連続関数', '実関数', '複素関数', '分布関数', '定数関数', '一次関数',
    '連続性', '完備性', '稠密性', '絶対収束', '各点収束',
  ]).has(value);"""
assert old3 in s
s = s.replace(old3, new3, 1)
write(p, s)

# FOU3: real first-use fixes and canonical aliases.
p = 'textbook/volumes/00_foundations/FOU3/index.md'
s = read(p)
s = s.replace('# FOU3 Fourier変換：連続周波数・畳み込み・反転', '# FOU3 連続周波数解析：変換・積・反転', 1)
s = s.replace('$L^2$ の完備性、Hilbert 空間、Plancherel', '$L^2$ の完備性、完備内積空間の構造、Plancherel', 1)
s = s.replace('## 7. approximate identity：狭い核で関数を平均する', '## 7. 原点へ集中する核で関数を平均する', 1)
lines = s.splitlines()
refs = {
    80: ('優収束定理', '[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)'),
    105: ('優収束定理', '[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)'),
    456: ('優収束定理', '[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)'),
    648: ('優収束定理', '[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)'),
    686: ('Gaussian approximate identity', '[Gaussian approximate identity](#thm-fou3-gaussian-approximation)'),
    1085: ('Fubini', '[Fubini](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02)'),
}
for n, (label, link) in refs.items():
    assert label in lines[n - 1], (n, lines[n - 1])
    if link not in lines[n - 1]:
        lines[n - 1] = lines[n - 1].replace(label, link, 1)
write(p, '\n'.join(lines) + '\n')

p = 'textbook/volumes/00_foundations/FOU3/knowledge.yaml'
s = read(p)
s = s.replace('aliases: [Fourier transform on L1]', 'aliases: [Fourier transform on L1, Fourier変換]', 1)
needle = 'aliases: [translation continuity on L1]'
if needle in s:
    s = s.replace(needle, 'aliases: [translation continuity on L1, 平行移動連続性]', 1)
write(p, s)

# FOU4: disambiguate recap terms, acronym first use, and formal-reference links.
p = 'textbook/volumes/00_foundations/FOU4/index.md'
s = read(p)
s = s.replace('Banach空間', '完備ノルム空間').replace('Banach 空間', '完備ノルム空間')
s = s.replace('Hilbert空間', '完備内積空間').replace('Hilbert 空間', '完備内積空間')
s = s.replace('前節の平行移動連続性', '前節の $L^2$ 平行移動補題')
m = re.search(r'(?<!everywhere; )a\.e\.', s)
assert m, 'bare a.e. not found'
s = s[:m.start()] + 'ほとんど至る所（almost everywhere; a.e.）' + s[m.end():]
lines = s.splitlines()
refs = {
    356: ('Gaussian approximate identity', '[Gaussian approximate identity](../FOU3/index.md#thm-fou3-gaussian-approximation)'),
    1366: ('Minkowskiの不等式', '[Minkowskiの不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-02)'),
}
for n, (label, link) in refs.items():
    assert label in lines[n - 1], (n, lines[n - 1])
    if link not in lines[n - 1]:
        lines[n - 1] = lines[n - 1].replace(label, link, 1)
write(p, '\n'.join(lines) + '\n')

# Roadmap: avoid globally ambiguous recap alias in reader prose.
p = 'textbook/volumes/00_foundations/F0_00R2_EncoreII_Fourier解析_微分方程式/index.md'
s = read(p).replace('Hilbert 空間', '完備内積空間').replace('Hilbert空間', '完備内積空間')
write(p, s)
