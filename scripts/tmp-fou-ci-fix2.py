from pathlib import Path


def read(p):
    return Path(p).read_text(encoding='utf-8')


def write(p, s):
    Path(p).write_text(s, encoding='utf-8')


# 1) Tighten generic technical-term extraction without weakening concept chronology.
p = 'scripts/audit-dream-theater-undefined-terms.mjs'
s = read(p)
s = s.replace(
    "const suffix = '(?:関数|連続性|収束|条件|空間|位相|測度|作用素|不等式|原理|法則|変換|分布|確率変数|可測性|コンパクト性|完備性|独立性|正則性|稠密性)';",
    "const suffix = '(?:関数(?!解析)|連続性|収束|条件|空間|位相|測度|作用素|不等式|原理|法則|変換|分布|確率変数|可測性|コンパクト性|完備性|独立性|正則性|稠密性)';",
    1,
)
old = """  let candidate = String(value)
    .replace(/^(?:任意の|各|すべての|ある|この|その|上の|次の|ここで|さらに|また|まず|実|複素)+/u, '')
    .trim();"""
new = """  let candidate = String(value)
    .replace(/^[-*+]\\s*/u, '')
    .replace(/^(?:任意の|各|すべての|ある|この|その|上の|次の|ここで|さらに|また|まず|実|複素)+/u, '')
    .trim();"""
assert old in s
s = s.replace(old, new, 1)
s = s.replace('前節の|一般の|良い|使う|なる|得られる|持つ|必要な', '前節の|一般の|元の|良い|使う|なる|得られる|持つ|必要な', 1)
s = s.replace("'連続性', '完備性', '稠密性', '絶対収束', '各点収束',", "'連続性', '完備性', '稠密性', '絶対収束', '各点収束', '被積分関数', '平行移動・尺度変換',", 1)
# HTML anchor ids are metadata, not reader-visible first use.
needle = "  const readerLines = stripNonReaderContent(page.source).split(/\\r?\\n/u);"
replacement = "  const readerLines = stripNonReaderContent(page.source).split(/\\r?\\n/u).map((line) => line.replace(/<a\\s+id=[^>]+><\\/a>/gu, ''));"
assert needle in s
s = s.replace(needle, replacement, 1)
write(p, s)

# 2) FOU3: do not name concepts in headings immediately before their formal introduction.
p = 'textbook/volumes/00_foundations/FOU3/index.md'
s = read(p)
s = s.replace('## 3. $L^1$ 平行移動連続性と Riemann--Lebesgue', '## 3. $L^1$ の平行移動と Riemann--Lebesgue', 1)
s = s.replace('## 4. 畳み込み：空間側の混合が周波数側の積になる', '## 4. 空間側の混合が周波数側の積になる', 1)
write(p, s)

# 3) FOU3: register the natural post-definition shorthand actually used in prose.
p = 'textbook/volumes/00_foundations/FOU3/knowledge.yaml'
s = read(p)
s = s.replace('aliases: [translation continuity in L1]', 'aliases: [translation continuity in L1, 平行移動連続性]', 1)
write(p, s)

# 4) FOU4 prerequisite alias: a Hilbert space is exactly a complete inner-product space.
p = 'textbook/volumes/00_foundations/F0_02C1_ノルム空間_Banach_Hilbert/knowledge.yaml'
s = read(p)
s = s.replace('aliases: [Hilbert空間の再掲, Hilbert空間]', 'aliases: [Hilbert空間の再掲, Hilbert空間, 完備内積空間]', 1)
write(p, s)

# 5) FOU4: remove grammatical fragments that the conservative audit could mistake for terms.
p = 'textbook/volumes/00_foundations/FOU4/index.md'
s = read(p)
s = s.replace(
    '$L^2$ 全体へ線形作用素を延長するため、近似に使う core 自身が和と差に閉じていることが重要です。単に $h*k_\\varepsilon$ という形の関数だけを集めると、異なる $\\varepsilon$ を持つ二つの関数の和・差が同じ形に戻るとは限りません。そこで有限線形結合まで含めます。',
    '$L^2$ 全体へ線形な写像を延長するため、近似に使う core 自身が和と差に閉じていることが重要です。単に $h*k_\\varepsilon$ の形だけを集めると、異なる $\\varepsilon$ を持つ二要素の和・差が同じ形に戻るとは限りません。そこで有限線形結合まで含めます。',
    1,
)
s = s.replace('古典 Fourier 積分の絶対収束は保証されません。', '古典 Fourier 積分に必要な絶対可積分性は保証されません。', 1)
s = s.replace('- 稠密な線形部分空間で写像を定義する', '- 稠密部分で写像を定義する', 1)
write(p, s)

# 6) Roadmap explicitly previews FOU3's L1 Fourier transform.
p = 'textbook/volumes/00_foundations/F0_00R2_EncoreII_Fourier解析_微分方程式/knowledge.yaml'
s = read(p)
needle = '  - fourier.fou3-convolution\n'
assert needle in s
if '  - fourier.fou3-fourier-transform\n' not in s:
    s = s.replace(needle, '  - fourier.fou3-fourier-transform\n' + needle, 1)
write(p, s)
