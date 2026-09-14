from pathlib import Path

p = Path('textbook/volumes/00_foundations/F0_00P6_特性関数_中心極限定理/index.md')
s = p.read_text(encoding='utf-8')
start_marker = '<!-- definition-example-start: def-f0-00p6-bounded-lipschitz -->'
end_marker = '<!-- definition-example-end -->'
start = s.index(start_marker)
end = s.index(end_marker, start) + len(end_marker)
replacement = r'''<!-- definition-example-start: def-f0-00p6-bounded-lipschitz -->
**定義の確認**：次の区分線形関数を考えます。

$$
h(x)=
\begin{cases}
1,&x\le0,\\
1-x,&0<x<1,\\
0,&x\ge1.
\end{cases}
$$

まず $0\le h(x)\le1$ なので $M=1$ で有界です。次に $x\le y$ として Lipschitz 条件を確認します。同じ区間に $x,y$ があれば、$h$ は傾き $0$ または $-1$ の一次関数なので

$$
|h(x)-h(y)|\le y-x.
$$

異なる区間にまたがる場合も、例えば $x\le0<y<1$ なら

$$
|h(x)-h(y)|=y\le y-x,
$$

$0<x<1\le y$ なら

$$
|h(x)-h(y)|=1-x\le y-x,
$$

$x\le0$ かつ $y\ge1$ なら

$$
|h(x)-h(y)|=1\le y-x.
$$

したがってすべての $x,y$ について

$$
|h(x)-h(y)|\le |x-y|,
$$

となり、$L=1$ を取れます。よって $h$ は有界Lipschitz関数です。後で分布関数を上下から挟む関数も、この例と同じ「一定部分と傾き一定の部分をつなぐ」形です。
<!-- definition-example-end -->'''
s = s[:start] + replacement + s[end:]
p.write_text(s, encoding='utf-8')
