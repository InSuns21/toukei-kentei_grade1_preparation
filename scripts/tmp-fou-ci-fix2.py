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
needle = "  const readerLines = stripNonReaderContent(page.source).split(/\\r?\\n/u);"
replacement = "  const readerLines = stripNonReaderContent(page.source).split(/\\r?\\n/u).map((line) => line.replace(/<a\\s+id=[^>]+><\\/a>/gu, ''));"
assert needle in s
s = s.replace(needle, replacement, 1)
write(p, s)

# 2) FOU3: keep formal introduction before first reader-facing use, canonicalize links,
# and make every direct definition example use the standard verification heading.
p = 'textbook/volumes/00_foundations/FOU3/index.md'
s = read(p)
s = s.replace('## 3. $L^1$ 平行移動連続性と Riemann--Lebesgue', '## 3. $L^1$ の平行移動と Riemann--Lebesgue', 1)
s = s.replace('## 4. 畳み込み：空間側の混合が周波数側の積になる', '## 4. 空間側の混合が周波数側の積になる', 1)
s = s.replace('また Gaussian の変換公式から', 'また [GaussianのFourier変換](#lem-fou3-gaussian-transform)から', 1)
s = s.replace('積分順序を交換し、Gaussian 変換公式から', '積分順序を交換し、[GaussianのFourier変換](#lem-fou3-gaussian-transform)から', 1)
s = s.replace('$L^1$ 平行移動連続性から右辺は $0$ へ収束します。', '[L1の平行移動連続性](#lem-fou3-l1-translation)から右辺は $0$ へ収束します。', 1)
s = s.replace('任意の $\\eta>0$ に対し、平行移動連続性から $|y|<\\delta$ なら', '任意の $\\eta>0$ に対し、[L1の平行移動連続性](#lem-fou3-l1-translation)から $|y|<\\delta$ なら', 1)
s = s.replace('$|\\xi|\\to\\infty$ なら $|h|=\\pi/|\\xi|\\to0$ です。したがって $L^1$ 平行移動連続性により右辺は0へ行き、', '$|\\xi|\\to\\infty$ なら $|h|=\\pi/|\\xi|\\to0$ です。したがって [L1の平行移動連続性](#lem-fou3-l1-translation)により右辺は0へ行き、', 1)
s = s.replace('**定義の確認：区間指示関数。** $a>0$ として', '**定義の確認**\n\n区間指示関数を使います。$a>0$ として', 1)
s = s.replace('**定義の確認：区間の重なり。** $f=g=', '**定義の確認**\n\n区間の重なりを直接計算します。$f=g=', 1)
s = s.replace('**定義の確認：Gaussian 核。**\n', '**定義の確認**\n\nGaussian 核について三条件を順に確認します。\n', 1)
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

# 5) FOU4: remove grammatical false positives, canonicalize named dependencies,
# and make all definition examples verify the definition directly.
p = 'textbook/volumes/00_foundations/FOU4/index.md'
s = read(p)
s = s.replace(
    '$L^2$ 全体へ線形作用素を延長するため、近似に使う core 自身が和と差に閉じていることが重要です。単に $h*k_\\varepsilon$ という形の関数だけを集めると、異なる $\\varepsilon$ を持つ二つの関数の和・差が同じ形に戻るとは限りません。そこで有限線形結合まで含めます。',
    '$L^2$ 全体へ線形な写像を延長するため、近似に使う core 自身が和と差に閉じていることが重要です。単に $h*k_\\varepsilon$ の形だけを集めると、異なる $\\varepsilon$ を持つ二要素の和・差が同じ形に戻るとは限りません。そこで有限線形結合まで含めます。',
    1,
)
s = s.replace('古典 Fourier 積分の絶対収束は保証されません。', '古典 Fourier 積分に必要な絶対可積分性は保証されません。', 1)
s = s.replace('- 稠密な線形部分空間で写像を定義する', '- 稠密部分で写像を定義する', 1)
s = s.replace('Minkowski の積分不等式から', '[Minkowskiの不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-02)から', 1)
s = s.replace('前節の $L^2$ 平行移動補題から', '[L2平行移動連続性](#lem-fou4-l2-translation)から', 1)
s = s.replace('FOU3 の畳み込み定理から', '[L1畳み込みと畳み込み定理](../FOU3/index.md#thm-fou3-convolution)から')
s = s.replace('従って FOU3 の畳み込み定理により', '従って [L1畳み込みと畳み込み定理](../FOU3/index.md#thm-fou3-convolution)により')
s = s.replace(
    '- $g\\in L^1$：FOU3 の古典 Fourier 変換と畳み込み定理を使うため。',
    '- $g\\in L^1$：[L1 Fourier変換](../FOU3/index.md#def-fou3-fourier-transform)と[L1畳み込みと畳み込み定理](../FOU3/index.md#thm-fou3-convolution)を使うため。',
    1,
)
s = s.replace('あとは FOU3 の Fourier 反転を $r$ の $x=0$ に適用します。', 'あとは [Fourier反転定理](../FOU3/index.md#thm-fou3-inversion)を $r$ の $x=0$ に適用します。', 1)
s = s.replace('[FOU3 の Fourier 反転](../FOU3/index.md#thm-fou3-inversion)', '[Fourier反転定理](../FOU3/index.md#thm-fou3-inversion)', 1)
s = s.replace('Plancherel はここでは「神託」ではなく、FOU3 の反転定理を $g*g^\\sharp$ に当てることで出てきました。', 'Plancherel はここでは「神託」ではなく、[Fourier反転定理](../FOU3/index.md#thm-fou3-inversion)を $g*g^\\sharp$ に当てることで出てきました。', 1)
s = s.replace('まず core で FOU3 の反転定理を使って二回 Fourier 変換します。', '[Fourier反転定理](../FOU3/index.md#thm-fou3-inversion)をまず core 上で使って二回 Fourier 変換します。', 1)
s = s.replace('FOU3 の反転公式を $-x$ に適用すると', '[Fourier反転定理](../FOU3/index.md#thm-fou3-inversion)を $-x$ に適用すると', 1)
s = s.replace('- $g*g^\\sharp$ に FOU3 の反転定理を適用して core 上の Plancherel を再構成できるか。', '- [Fourier反転定理](../FOU3/index.md#thm-fou3-inversion)を $g*g^\\sharp$ に適用して core 上の Plancherel を再構成できるか。', 1)
# Existing examples already calculate the defining quantities; normalize their heading.
s = s.replace('**定義の確認。** $f=1_{[0,1]}$、', '**定義の確認**\n\n$f=1_{[0,1]}$、', 1)
s = s.replace('**定義の確認。** $h=1_{[-1,1]}$ とすると', '**定義の確認**\n\n$h=1_{[-1,1]}$ とすると', 1)
# The L2-transform block previously only motivated the definition. Verify that it really
# extends the classical transform on the dense core by choosing a constant approximating sequence.
old = '''<!-- definition-example-start: def-fou4-l2-transform -->
**なぜ「各 $\\xi$ で積分」と定義しないのか。** 冒頭の'''
new = '''<!-- definition-example-start: def-fou4-l2-transform -->
**定義の確認**

まず $f\\in\\mathcal G$ なら、近似列として定数列 $g_n=f$ を取れます。このとき $\\|g_n-f\\|_2=0$ なので、定義から

$$
\\mathcal F_2 f
=L^2\\!\\operatorname{-lim}_{n\\to\\infty}\\widehat g_n
=\\widehat f.
$$

したがって新しい $L^2$ Fourier 変換は、core 上では FOU3 の古典 Fourier 変換と一致します。

**なぜ「各 $\\xi$ で積分」と定義しないのか。** 冒頭の'''
assert old in s
s = s.replace(old, new, 1)
# For the normalized operator, the standard Gaussian is a direct low-complexity check:
# under this convention its Fourier transform gains exactly sqrt(2pi), so normalization fixes it.
old = '''<!-- definition-example-start: def-fou4-unitary-transform -->
Parseval から'''
new = '''<!-- definition-example-start: def-fou4-unitary-transform -->
**定義の確認**

$f(x)=e^{-x^2/2}$ とします。[GaussianのFourier変換](../FOU3/index.md#lem-fou3-gaussian-transform)から

$$
\\mathcal F_2 f(\\xi)=\\sqrt{2\\pi}\,e^{-\\xi^2/2},
$$

したがって定義へ代入すると

$$
Uf(\\xi)=\\frac1{\\sqrt{2\\pi}}\\mathcal F_2f(\\xi)
=e^{-\\xi^2/2}=f(\\xi).
$$

係数 $1/\\sqrt{2\\pi}$ が、この規約で Gaussian を固定する正規化になっていることを直接確認できました。

Parseval から'''
assert old in s
s = s.replace(old, new, 1)
write(p, s)

# 6) Roadmap explicitly previews FOU3's L1 Fourier transform.
p = 'textbook/volumes/00_foundations/F0_00R2_EncoreII_Fourier解析_微分方程式/knowledge.yaml'
s = read(p)
needle = '  - fourier.fou3-convolution\n'
assert needle in s
if '  - fourier.fou3-fourier-transform\n' not in s:
    s = s.replace(needle, '  - fourier.fou3-fourier-transform\n' + needle, 1)
write(p, s)
