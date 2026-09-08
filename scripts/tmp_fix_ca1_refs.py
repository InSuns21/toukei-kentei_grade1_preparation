from pathlib import Path

p = Path('textbook/volumes/00_foundations/CA1/index.md')
s = p.read_text(encoding='utf-8')
repls = [
    ('前節の補題により $g(z_0+h)\\to g(z_0)$ なので、$h\\to0$ で', '[複素微分可能なら連続](#lem-ca1-differentiable-continuous) により $g(z_0+h)\\to g(z_0)$ なので、$h\\to0$ で'),
    ('実部・虚部それぞれに実1変数の平均値定理を使うと、$\\phi$ は $[0,1]$ 上定数です。', '[RA3 の平均値定理](../RA3/index.md#thm-ra3-mvt)を実部・虚部それぞれに使うと、$\\phi$ は $[0,1]$ 上定数です。'),
    ('実1変数の微分公式から', '各偏導関数を実変数 $x,y$ について直接計算すると'),
    ('$f$ が正則なので Cauchy–Riemann 方程式から', '$f$ が正則なので [Cauchy–Riemann必要条件](#thm-ca1-cr-necessary) から'),
    ('再び Cauchy–Riemann 方程式を使うと', '再び [Cauchy–Riemann必要条件](#thm-ca1-cr-necessary) を使うと'),
]
for old, new in repls:
    if old not in s:
        raise SystemExit(f'missing replacement target: {old}')
    s = s.replace(old, new, 1)

old = r'''次に $z=x+iy$, $w=s+it$ とします。実指数の加法公式と三角関数の加法公式から

$$
\begin{aligned}
e^{z+w}
&=e^{x+s}
\bigl(\cos(y+t)+i\sin(y+t)\bigr)\\
&=e^xe^s
(\cos y+i\sin y)
(\cos t+i\sin t)\\
&=e^ze^w.
\end{aligned}
$$'''
new = r'''次に $z=x+iy$, $w=s+it$ とします。実変数について成り立つ等式

$$
e^{x+s}=e^xe^s,
$$

$$
\cos(y+t)=\cos y\cos t-\sin y\sin t,
$$

$$
\sin(y+t)=\sin y\cos t+\cos y\sin t
$$

を代入して積を直接展開すると

$$
\begin{aligned}
e^ze^w
&=e^xe^s(\cos y+i\sin y)(\cos t+i\sin t)\\
&=e^{x+s}\bigl(\cos(y+t)+i\sin(y+t)\bigr)\\
&=e^{z+w}.
\end{aligned}
$$'''
if old not in s:
    raise SystemExit('missing exponential product block')
s = s.replace(old, new, 1)
p.write_text(s, encoding='utf-8')
