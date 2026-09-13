from pathlib import Path

root = Path('.')
index = root / 'textbook/volumes/00_foundations/RA3/index.md'
chapter = root / 'textbook/volumes/00_foundations/RA3/chapter.yaml'
glossary = root / 'textbook/volumes/00_foundations/RA3/glossary.yaml'
knowledge = root / 'textbook/volumes/00_foundations/RA3/knowledge.yaml'

s = index.read_text(encoding='utf-8')
marker = '<!-- definition-example-end -->\n\n---\n\n## 2. Rolleから平均値定理へ'
insert = r"""<!-- definition-example-end -->

### 高階導関数と $C^k$ 級

Taylorの定理のように高階導関数を使う前に、ここで記法を固定します。「微分できる」と「導関数まで連続である」は別の条件です。

<a id="def-ra3-higher-derivative"></a>
<!-- formal-statement-start -->
> **定義（高階導関数）**  
> 開区間 $I\subset\mathbb R$ 上の関数 $f$ について、$f'=f^{(1)}$ とし、$f^{(j)}$ が微分可能なら
$$
f^{(j+1)}=(f^{(j)})'
$$
> と帰納的に定める。$f^{(0)}=f$ と約束する。
<!-- formal-statement-end -->

したがって $f''=f^{(2)}$、$f'''=f^{(3)}$ です。「$k$ 回微分可能」とは $f^{(k)}$ まで存在することをいいますが、まだそれらの連続性までは要求していません。

<a id="def-ra3-ck-class"></a>
<!-- formal-statement-start -->
> **定義（$C^k$ 級・$C^\infty$ 級）**  
> 開区間 $I\subset\mathbb R$ と整数 $k\ge0$ に対し、$f:I\to\mathbb R$ が **$C^k$ 級**であるとは、$0\le j\le k$ の各 $j$ について $f^{(j)}$ が存在し連続であることをいう。そのような関数全体を $C^k(I)$ と書く。すべての整数 $k\ge0$ について $C^k$ 級である関数を **$C^\infty$ 級**または **滑らかな関数**という。
<!-- formal-statement-end -->

特に
$$
C^0(I)=\{\text{$I$ 上の連続関数}\},
$$
$$
C^1(I)=\{\text{$I$ 上で微分可能で、$f'$ も連続な関数}\}.
$$
また定義から
$$
C^{k+1}(I)\subset C^k(I),
\qquad
C^\infty(I)=\bigcap_{k=0}^{\infty}C^k(I)
$$
です。ここで重要なのは、**微分可能であることだけでは $C^1$ 級とは限らない**ことです。

閉区間 $[a,b]$ に対して $C^k([a,b])$ と書くときは、$(a,b)$ で $k$ 回微分可能で、$f,f',\ldots,f^{(k)}$ が端点まで連続に延長できる、という意味で用います。

<!-- definition-example-start: def-ra3-higher-derivative, def-ra3-ck-class -->
**定義の確認**：多項式や指数関数 $e^x$ は何回微分しても連続な導関数を持つので $C^\infty$ 級です。一方
$$
f(x)=
\begin{cases}
x^2\sin(1/x),&x\ne0,\\
0,&x=0
\end{cases}
$$
を考えます。$x=0$ では
$$
\frac{f(h)-f(0)}h=h\sin(1/h)\to0
$$
なので $f'(0)=0$ です。$x\ne0$ では
$$
f'(x)=2x\sin(1/x)-\cos(1/x).
$$
ところが $x_n=1/(2\pi n)\to0$ とすると
$$
f'(x_n)=-1
$$
なので $f'(x)\to f'(0)=0$ ではありません。したがって $f$ は実数全体で微分可能ですが $C^1$ 級ではありません。
<!-- definition-example-end -->

$C^\infty$ 級であることも、関数がTaylor級数と一致することまでは意味しません。Taylor**級数**との一致には、後で述べるように剰余項が次数とともに0へ行くことを別途確認する必要があります。

---

## 2. Rolleから平均値定理へ"""
if 'def-ra3-ck-class' not in s:
    if marker not in s:
        raise SystemExit('RA3 insertion marker not found')
    s = s.replace(marker, insert, 1)

exercise_marker = '''<!-- solution-end -->\n\n### Level B\n'''
exercise = r'''<!-- solution-end -->

<a id="ex-ra3-a05"></a>
#### RA3-A05 $C^k$ 級の判定
- Level: A

次の関数について、指定された性質を判定せよ。

1. $f(x)=x^3$ は $C^\infty(\mathbb R)$ に属するか。
2. $g(x)=|x|$ は $C^1(\mathbb R)$ に属するか。
3. 本文の $h(x)=x^2\sin(1/x)$（$x\ne0$）、$h(0)=0$ は $C^1(\mathbb R)$ に属するか。

<!-- solution-start -->
**解答**：

1. 多項式は何回微分しても多項式になり、各導関数は連続です。したがって $f\in C^\infty(\mathbb R)$ です。
2. $|x|$ は0で微分可能でないので、そもそも $C^1$ 級の必要条件を満たしません。したがって $g\notin C^1(\mathbb R)$ です。
3. 本文で確認したように $h'(0)=0$ は存在しますが、$x_n=1/(2\pi n)\to0$ に沿って $h'(x_n)=-1$ となるため $h'$ は0で連続ではありません。したがって $h$ は微分可能ですが $h\notin C^1(\mathbb R)$ です。

この3例から「連続」「微分可能」「$C^1$ 級」「$C^\infty$ 級」は同じ条件ではなく、滑らかさの段階を表していることが分かります。
<!-- solution-end -->

### Level B
'''
if 'ex-ra3-a05' not in s:
    if exercise_marker not in s:
        raise SystemExit('RA3 exercise marker not found')
    s = s.replace(exercise_marker, exercise, 1)
index.write_text(s, encoding='utf-8')

s = chapter.read_text(encoding='utf-8')
if 'C^k・C^∞級記法' not in s:
    s = s.replace('  - 平均値定理から単調性・誤差評価を導ける\n', '  - 平均値定理から単調性・誤差評価を導ける\n  - 高階導関数とC^k・C^∞級記法を定義から説明し、微分可能性との違いを判定できる\n')
    s = s.replace('definitions:\n  - { id: RA3-DEF-01, name: 導関数 }\n', 'definitions:\n  - { id: RA3-DEF-01, name: 導関数 }\n  - { id: RA3-DEF-02, name: 高階導関数 }\n  - { id: RA3-DEF-03, name: C^k級・C^∞級 }\n')
    s = s.replace('exercise_counts: { level_a: 4, level_b: 3, level_c: 1, level_d: 0 }', 'exercise_counts: { level_a: 5, level_b: 3, level_c: 1, level_d: 0 }')
    s = s.replace('estimated_hours: { reading: 2.0, exercises: 1.5, review: 0.5 }', 'estimated_hours: { reading: 2.25, exercises: 1.75, review: 0.5 }')
chapter.write_text(s, encoding='utf-8')

s = glossary.read_text(encoding='utf-8')
if 'term: C^k級' not in s:
    addition = '''  - term: C^k級\n    english: C^k class\n    meaning: k階までの導関数が存在し、それらがすべて連続である関数の滑らかさの階級。\n  - term: C∞級\n    english: smooth function / C-infinity class\n    meaning: 任意の階数まで導関数が存在し、それらがすべて連続である関数。滑らかな関数ともいう。\n'''
    s = s.replace('terms:\n', 'terms:\n' + addition, 1)
glossary.write_text(s, encoding='utf-8')

s = knowledge.read_text(encoding='utf-8')
if 'analysis.ck-smoothness-class' not in s:
    needle = '''  - id: analysis.rolle-theorem\n'''
    addition = '''  - id: analysis.higher-derivative\n    name: 高階導関数\n    kind: definition\n    aliases: [高階導関数, k階導関数]\n    requires: [analysis.derivative]\n  - id: analysis.ck-smoothness-class\n    name: C^k級・C^∞級\n    kind: definition\n    aliases: [C^k級, C∞級, 滑らかな関数]\n    requires: [analysis.higher-derivative]\n'''
    if needle not in s:
        raise SystemExit('RA3 knowledge insertion marker not found')
    s = s.replace(needle, addition + needle, 1)
    s = s.replace('    requires: [analysis.mean-value-theorem]\n  - id: analysis.inverse-derivative', '    requires: [analysis.mean-value-theorem, analysis.ck-smoothness-class]\n  - id: analysis.inverse-derivative', 1)
knowledge.write_text(s, encoding='utf-8')
