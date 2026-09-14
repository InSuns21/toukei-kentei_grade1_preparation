from pathlib import Path

root = Path('textbook/volumes/00_foundations/F0_00P6_特性関数_中心極限定理')
p = root / 'index.md'
s = p.read_text(encoding='utf-8')

s = s.replace('bounded Lipschitz test functions', '有界Lipschitz関数')
s = s.replace('## 4. bounded Lipschitz関数で分布収束を判定できる', '## 4. 有界Lipschitz関数で分布収束を判定できる')
s = s.replace('**定理（bounded Lipschitz testによる分布収束の特徴付け）**', '**定理（有界Lipschitz関数による分布収束の特徴付け）**')
s = s.replace('### 証明：CDFからstep近似し、逆向きはLipschitz cutoffで挟む', '### 証明：CDFからstep近似し、逆向きは区分線形cutoffで挟む')
s = s.replace('#### Step 1：分布収束ならbounded Lipschitz期待値が収束する', '#### Step 1：分布収束なら有界Lipschitz関数の期待値が収束する')
s = s.replace('$h$ を有界Lipschitzとし', '$h$ を有界Lipschitz関数とし')
s = s.replace('#### Step 2：bounded Lipschitz期待値収束ならCDFが連続点で収束する', '#### Step 2：有界Lipschitz関数の期待値収束ならCDFが連続点で収束する')
s = s.replace('後のGaussian smoothingではCDFを直接扱わず、bounded Lipschitz期待値だけを制御すれば十分になります。', '後のGaussian smoothingではCDFを直接扱わず、有界Lipschitz関数の期待値だけを制御すれば十分になります。')
s = s.replace('[bounded Lipschitz testによる特徴付け](#thm-f0-00p6-bl-characterization)', '[有界Lipschitz関数による特徴付け](#thm-f0-00p6-bl-characterization)')
s = s.replace('有界Lipschitz $h$', '有界Lipschitz関数 $h$')
s = s.replace('> **定理（有界Lipschitz関数による分布収束の特徴付け）**  \n', '> **定理（有界Lipschitz関数による分布収束の特徴付け）**\n')

marker = '<a id="thm-f0-00p6-bl-characterization"></a>\n\n'
if marker not in s:
    raise SystemExit('BL theorem marker not found')
definition = r'''<a id="def-f0-00p6-bounded-lipschitz"></a>

<!-- formal-statement-start -->
> **定義（有界Lipschitz関数）**
> 関数 $h:\mathbb R\to\mathbb R$ が **有界Lipschitz関数** であるとは、ある有限な定数 $M,L\ge0$ が存在して、すべての $x,y\in\mathbb R$ に対し

$$
|h(x)|\le M,
\qquad
|h(x)-h(y)|\le L|x-y|
$$

> が成り立つことをいいます。第1条件が有界性、第2条件がLipschitz条件です。
<!-- formal-statement-end -->

この章で必要なのはこの二つの不等式だけです。Lipschitz条件は「入力を $|x-y|$ だけ動かしたとき、出力の変化がその定数倍を超えない」という一様な変化率の上限を表します。

<!-- definition-example-start: def-f0-00p6-bounded-lipschitz -->
**定義の確認**：

$$
h(x)=\frac{1}{1+|x|}
$$

とします。まず $0<h(x)\le1$ なので $M=1$ で有界です。また

$$
\begin{aligned}
|h(x)-h(y)|
&=\frac{\bigl||x|-|y|\bigr|}{(1+|x|)(1+|y|)}\\
&\le \bigl||x|-|y|\bigr|\\
&\le |x-y|,
\end{aligned}
$$

ここで最後は逆三角不等式を使いました。したがって $L=1$ を取れ、$h$ は有界Lipschitz関数です。
<!-- definition-example-end -->

---

'''
s = s.replace(marker, definition + marker, 1)
p.write_text(s, encoding='utf-8')

p = root / 'chapter.yaml'
s = p.read_text(encoding='utf-8')
s = s.replace('  - bounded Lipschitz testによる分布収束の特徴付けを証明できる', '  - 有界Lipschitz関数を定義し、その期待値による分布収束の特徴付けを証明できる')
s = s.replace('  - { id: F0P6-DEF-02, name: 分布収束 }', '  - { id: F0P6-DEF-02, name: 分布収束 }\n  - { id: F0P6-DEF-03, name: 有界Lipschitz関数 }')
s = s.replace('name: bounded Lipschitz testによる分布収束の特徴付け', 'name: 有界Lipschitz関数による分布収束の特徴付け')
p.write_text(s, encoding='utf-8')

p = root / 'glossary.yaml'
s = p.read_text(encoding='utf-8')
s = s.replace('meaning: 特性関数の点wise収束と分布収束を結ぶ定理。', 'meaning: 特性関数の各点収束と分布収束を結ぶ定理。')
if 'term: 有界Lipschitz関数' not in s:
    s += '  - term: 有界Lipschitz関数\n    english: bounded Lipschitz function\n    meaning: 絶対値が一様に有界で、かつ |h(x)-h(y)| を定数倍の |x-y| で一様に上から抑えられる関数。\n'
p.write_text(s, encoding='utf-8')

p = root / 'knowledge.yaml'
s = p.read_text(encoding='utf-8')
needle = '''  - id: prob.bounded-lipschitz-characterization
    name: bounded Lipschitz testによる分布収束の特徴付け
    kind: theorem
    aliases: [bounded Lipschitz testによる分布収束の特徴付け]
    requires:
      - prob.distribution-convergence
      - prob.cdf
'''
replacement = '''  - id: prob.bounded-lipschitz-function
    name: 有界Lipschitz関数
    kind: definition
    aliases: [有界Lipschitz関数]
    requires: []

  - id: prob.bounded-lipschitz-characterization
    name: 有界Lipschitz関数による分布収束の特徴付け
    kind: theorem
    aliases: [有界Lipschitz関数による分布収束の特徴付け]
    requires:
      - prob.distribution-convergence
      - prob.cdf
      - prob.bounded-lipschitz-function
'''
if needle not in s:
    raise SystemExit('knowledge BL block not found')
s = s.replace(needle, replacement, 1)
p.write_text(s, encoding='utf-8')
