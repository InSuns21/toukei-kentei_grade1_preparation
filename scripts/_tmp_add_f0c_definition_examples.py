from pathlib import Path

p = Path('textbook/volumes/00_foundations/F0_00C_連続写像_コンパクト性_最大最小/index.md')
text = p.read_text(encoding='utf-8')

needle1 = '''<!-- formal-statement-end -->

<a id="def-f0-00c-02"></a>'''
insert1 = r'''<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00c-01 -->
### 1.1 定義の確認：$x^2$ は $x=1$ で連続

**定義の確認**

$f:\mathbb R\to\mathbb R$, $f(t)=t^2$ を $t=1$ で考えます。任意の $\varepsilon>0$ に対し

$$
\delta=\min\left\{1,\frac{\varepsilon}{3}\right\}
$$

と取ります。$|t-1|<\delta\le1$ なら $0<t<2$ なので $|t+1|<3$ です。したがって

$$
|f(t)-f(1)|
=|t^2-1|
=|t-1||t+1|
<3\delta
\le\varepsilon.
$$

よって、定義に現れる「任意の $\varepsilon>0$ に対して適切な $\delta>0$ を選ぶ」という条件を $t=1$ で満たしています。
<!-- definition-example-end -->

<a id="def-f0-00c-02"></a>'''

needle2 = '''<!-- formal-statement-end -->

「入力を十分近づければ、出力も好きなだけ近づけられる」という意味です。'''
insert2 = r'''<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00c-02 -->
### 1.2 定義の確認：一次関数は全ての点で連続

**定義の確認**

$f:\mathbb R\to\mathbb R$, $f(t)=3t+1$ とします。任意の点 $x\in\mathbb R$ と任意の $\varepsilon>0$ に対し

$$
\delta=\frac{\varepsilon}{3}
$$

と取れば、$|t-x|<\delta$ から

$$
|f(t)-f(x)|
=3|t-x|
<3\delta
=\varepsilon
$$

です。$x$ は任意だったので、この写像は全ての点で連続、すなわち連続写像です。
<!-- definition-example-end -->

「入力を十分近づければ、出力も好きなだけ近づけられる」という意味です。'''

if needle1 not in text:
    raise SystemExit('first insertion point not found')
if needle2 not in text:
    raise SystemExit('second insertion point not found')
text = text.replace(needle1, insert1, 1)
text = text.replace(needle2, insert2, 1)
p.write_text(text, encoding='utf-8')
