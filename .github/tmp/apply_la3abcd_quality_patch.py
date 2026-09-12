from pathlib import Path

ROOT = Path("textbook/volumes/00_foundations")


def load(ch):
    p = ROOT / ch / "index.md"
    return p, p.read_text(encoding="utf-8")


def save(p, text):
    p.write_text(text, encoding="utf-8")


def replace_once(text, old, new, label):
    n = text.count(old)
    if n != 1:
        raise RuntimeError(f"{label}: expected exactly one match, got {n}")
    return text.replace(old, new, 1)


def insert_before(text, marker, addition, label):
    n = text.count(marker)
    if n != 1:
        raise RuntimeError(f"{label}: expected exactly one marker, got {n}")
    return text.replace(marker, addition + marker, 1)


# -----------------------------------------------------------------------------
# LA3A: connect dual maps with annihilators, clarify canonicality, add A4/B3/C1.
# -----------------------------------------------------------------------------
p, t = load("LA3A")
anchor = """よって $T^*$ の表現行列は $A^{\\mathsf T}$ です。\n\nここでは内積を使っていません。したがって複素数上でも **共役転置ではなく単なる転置** が現れます。共役転置が出るのは LA5 の内積・随伴です。"""
addition = r"""よって $T^*$ の表現行列は $A^{\mathsf T}$ です。

### 核と像は annihilator でつながる

双対写像と annihilator は別々の定義ではなく、核と像を通じて直接つながります。

<a id="thm-la3a-dual-map-kernel-image"></a>
<!-- formal-statement-start -->
> **定理（双対写像の核・像と annihilator）**  
> $V,W$ を有限次元ベクトル空間、$T:V\to W$ を線形写像とする。このとき
> $$
> \ker T^*=(\operatorname{im}T)^\circ,
> \qquad
> \operatorname{im}T^*=(\ker T)^\circ.
> $$
> 特に
> $$
> \operatorname{rank}T^*=\operatorname{rank}T.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\psi\in W^*$ に対して
$$
\psi\in\ker T^*
\Longleftrightarrow
\psi(Tv)=0\quad(\forall v\in V)
\Longleftrightarrow
\psi|_{\operatorname{im}T}=0.
$$
従って
$$
\ker T^*=(\operatorname{im}T)^\circ.
$$

次に $T^*\psi=\psi\circ T$ は $v\in\ker T$ に対して
$$
(T^*\psi)(v)=\psi(Tv)=\psi(0)=0
$$
なので
$$
\operatorname{im}T^*\subset(\ker T)^\circ.
$$
ここで最初の等式と annihilator の次元公式を使うと
$$
\begin{aligned}
\dim\operatorname{im}T^*
&=\dim W^*-\dim\ker T^*\\
&=\dim W-\dim(\operatorname{im}T)^\circ\\
&=\dim\operatorname{im}T
=\operatorname{rank}T.
\end{aligned}
$$
一方、rank-nullity と annihilator の次元公式から
$$
\dim(\ker T)^\circ
=\dim V-\dim\ker T
=\operatorname{rank}T.
$$
包含する2つの部分空間の次元が等しいので
$$
\operatorname{im}T^*=(\ker T)^\circ.
$$
同時に $\operatorname{rank}T^*=\operatorname{rank}T$ も得られました。$\square$
<!-- proof-end -->

ここでは内積を使っていません。したがって複素数上でも **共役転置ではなく単なる転置** が現れます。共役転置が出るのは LA5 の内積・随伴です。"""
t = replace_once(t, anchor, addition, "LA3A dual-map insertion")

canon_anchor = """には基底が一切現れていません。基底を選んだのは単射性を証明するためだけです。従ってこの同型は、基底を選んで無理に作った同型ではなく標準的なものです。$\\square$\n<!-- proof-end -->"""
canon_new = canon_anchor + r"""

有限次元では $\dim V=\dim V^*$ なので $V\cong V^*$ となる同型も作れます。しかし一般には、その同型は基底などの追加の選択に依存します。これに対し
$$
J(v)(\varphi)=\varphi(v)
$$
で定まる $V\to V^{**}$ は、式そのものに基底の選択がなく自然です。この違いは、後で「双対」と「随伴」を混同しないためにも重要です。"""
t = replace_once(t, canon_anchor, canon_new, "LA3A canonicality note")

ex = r"""

### LA3A-A03 3次元の双対基底

$V=\mathbb R^3$ の基底
$$
v_1=(1,0,1)^T,\qquad
v_2=(1,1,0)^T,\qquad
v_3=(0,1,1)^T
$$
の双対基底 $v^1,v^2,v^3$ を、標準座標 $x=(x_1,x_2,x_3)^T$ を用いて求めよ。

<!-- solution-start -->
**解答**：$x=av_1+bv_2+cv_3$ と置くと
$$
x_1=a+b,\qquad x_2=b+c,\qquad x_3=a+c.
$$
従って
$$
a=\frac{x_1-x_2+x_3}{2},\quad
b=\frac{x_1+x_2-x_3}{2},\quad
c=\frac{-x_1+x_2+x_3}{2}.
$$
双対基底は各係数を読むので
$$
\boxed{
\begin{aligned}
v^1(x)&=\frac{x_1-x_2+x_3}{2},\\
v^2(x)&=\frac{x_1+x_2-x_3}{2},\\
v^3(x)&=\frac{-x_1+x_2+x_3}{2}.
\end{aligned}}
$$
実際、各 $v^i$ に $v_j$ を代入すると $v^i(v_j)=\delta_{ij}$ になります。
<!-- solution-end -->

### LA3A-A04 双対写像を具体的に計算する

$$
T:\mathbb R^2\to\mathbb R^3,\qquad
T(x,y)=(x+2y,\,3x-y,\,x)
$$
とし、$\psi\in(\mathbb R^3)^*$ を
$$
\psi(a,b,c)=2a-b+4c
$$
で定める。$T^*\psi$ を求め、標準基底で $T^*$ の表現行列が $T$ の表現行列の転置になることを確認せよ。

<!-- solution-start -->
**解答**：定義から
$$
\begin{aligned}
(T^*\psi)(x,y)
&=\psi(T(x,y))\\
&=2(x+2y)-(3x-y)+4x\\
&=3x+5y.
\end{aligned}
$$
一方
$$
[T]=
\begin{pmatrix}
1&2\\
3&-1\\
1&0
\end{pmatrix},
\qquad
[T]^\mathsf T=
\begin{pmatrix}
1&3&1\\
2&-1&0
\end{pmatrix}.
$$
$\psi$ の係数ベクトル $(2,-1,4)^T$ に $[T]^\mathsf T$ を掛けると
$$
\begin{pmatrix}1&3&1\\2&-1&0\end{pmatrix}
\begin{pmatrix}2\\-1\\4\end{pmatrix}
=
\begin{pmatrix}3\\5\end{pmatrix},
$$
確かに $3x+5y$ の係数と一致します。
<!-- solution-end -->

### LA3A-B03 $\operatorname{im}T^*$ と $(\ker T)^\circ$ を手で照合する

$$
T:\mathbb R^3\to\mathbb R^2,\qquad
T(x,y,z)=(x+y,\,y+z)
$$
について $\ker T$ と $\operatorname{im}T^*$ を求め、
$$
\operatorname{im}T^*=(\ker T)^\circ
$$
を座標計算で確認せよ。

<!-- solution-start -->
**解答**：$T(x,y,z)=0$ なら
$$
x=-y,\qquad z=-y,
$$
なので
$$
\ker T=\operatorname{span}\{(1,-1,1)^T\}.
$$
$\psi(u,v)=\alpha u+\beta v$ とすると
$$
(T^*\psi)(x,y,z)
=\alpha(x+y)+\beta(y+z)
=\alpha x+(\alpha+\beta)y+\beta z.
$$
従って $\operatorname{im}T^*$ は係数 $(a,b,c)$ が
$$
b=a+c
$$
を満たす線形形式全体です。一方、$ax+by+cz$ が $(1,-1,1)^T$ を消す条件は
$$
a-b+c=0,
$$
すなわち同じく $b=a+c$。従って両者は一致します。
<!-- solution-end -->

### LA3A-C01 二重 annihilator

$V$ を有限次元ベクトル空間、$W\subset V$ を部分空間とする。$W^\circ\subset V^*$ の annihilator を
$$
(W^\circ)^\circ
=\{F\in V^{**}:F(\varphi)=0\ \text{for all }\varphi\in W^\circ\}
$$
と定める。標準埋め込み $J:V\to V^{**}$ に対して
$$
\boxed{J(W)=(W^\circ)^\circ}
$$
を示せ。

<!-- solution-start -->
**解答**：まず $w\in W$ と $\varphi\in W^\circ$ なら
$$
J(w)(\varphi)=\varphi(w)=0
$$
なので
$$
J(W)\subset(W^\circ)^\circ.
$$
あとは次元を比較します。$J$ は単射なので
$$
\dim J(W)=\dim W.
$$
また $\dim V^*=\dim V=n$ と annihilator の次元公式から
$$
\dim W^\circ=n-\dim W.
$$
これを $V^*$ の部分空間 $W^\circ$ にもう一度適用すると
$$
\dim(W^\circ)^\circ
=n-\dim W^\circ
=\dim W.
$$
包含する有限次元部分空間の次元が等しいため
$$
J(W)=(W^\circ)^\circ.
$$
「二回消すと元へ戻る」と言っても、厳密には $W\subset V$ と $(W^\circ)^\circ\subset V^{**}$ を標準埋め込み $J$ で同一視している点が重要です。
<!-- solution-end -->
"""
t = insert_before(t, "\n---\n\n## 8. 次に進む", ex, "LA3A exercises")
save(p, t)


# -----------------------------------------------------------------------------
# LA3B: proof/content already strong; deepen construction exercises to A4/B3/C1.
# -----------------------------------------------------------------------------
p, t = load("LA3B")
ex = r"""

### LA3B-A03 置換行列の行列式

$4\times4$ 行列 $P$ の列が順に
$$
e_2,\ e_4,\ e_1,\ e_3
$$
であるとする。Leibniz 公式を使って $\det P$ を求めよ。

<!-- solution-start -->
**解答**：各列には1個だけ1があるので、Leibniz 公式で非零になるのは
$$
\sigma=(2,4,1,3)
$$
に対応する項だけです。この並びの転倒は
$$
(2,1),\quad(4,1),\quad(4,3)
$$
の3個なので
$$
\operatorname{sgn}(\sigma)=(-1)^3=-1.
$$
従って
$$
\boxed{\det P=-1}.
$$
一般にも、置換行列の行列式は対応する置換の符号です。
<!-- solution-end -->

### LA3B-A04 交代多重線形性だけで値を追う

$n=3$ とし
$$
D(c_1,c_2,c_3)=d
$$
とする。$D$ が交代3重線形であることだけを使って、次を求めよ。
$$
D(c_1+2c_2,c_2,c_3),\qquad
D(c_3,c_2,c_1),\qquad
D(2c_1,c_2,3c_3).
$$

<!-- solution-start -->
**解答**：多重線形性と交代性から
$$
\begin{aligned}
D(c_1+2c_2,c_2,c_3)
&=D(c_1,c_2,c_3)+2D(c_2,c_2,c_3)=d,\\
D(c_3,c_2,c_1)&=-D(c_1,c_2,c_3)=-d,\\
D(2c_1,c_2,3c_3)&=6D(c_1,c_2,c_3)=6d.
\end{aligned}
$$
2番目は第1・第3引数を1回交換しているので符号が反転します。
<!-- solution-end -->

### LA3B-B03 列が一次従属なら行列式は0

$n\times n$ 行列 $A=[c_1\ \cdots\ c_n]$ の列ベクトルが一次従属なら
$$
\det A=0
$$
であることを、乗法性や可逆性判定を使わず、交代多重線形性だけから示せ。

<!-- solution-start -->
**解答**：一次従属なので、係数の少なくとも1つが非零な関係
$$
\alpha_1c_1+\cdots+\alpha_nc_n=0
$$
があります。添字を入れ替えて $\alpha_n\ne0$ としてよいので
$$
c_n=-\sum_{j=1}^{n-1}\frac{\alpha_j}{\alpha_n}c_j.
$$
最終列について線形性を使うと
$$
\det(c_1,\dots,c_n)
=-\sum_{j=1}^{n-1}\frac{\alpha_j}{\alpha_n}
\det(c_1,\dots,c_{n-1},c_j).
$$
各項には $c_j$ が2回現れるため交代性から0です。従って $\det A=0$ です。
<!-- solution-end -->

### LA3B-C01 行列式0と一次従属を構成論から結ぶ

$A=[c_1\ \cdots\ c_n]$ とする。LA3C の乗法性・余因子・可逆性判定を使わず、LA3B までの結果だけから
$$
\boxed{\det A=0\iff c_1,\dots,c_n\text{ は一次従属}}
$$
を示せ。

<!-- solution-start -->
**解答**：一次従属なら0である向きは B03 で示しました。逆向きの対偶を示します。

$c_1,\dots,c_n$ が一次独立なら、$\mathbb F^n$ の基底です。仮に
$$
\det(c_1,\dots,c_n)=0
$$
とします。標準基底の各 $e_j$ をこの基底で
$$
e_j=\sum_i a_{ij}c_i
$$
と展開します。多重線形性により
$$
\det(e_1,\dots,e_n)
$$
を展開すると、同じ $c_i$ を2回含む項は0で、残る項は $c_1,\dots,c_n$ の置換だけです。各残存項は交換による符号反転から
$$
\pm\det(c_1,
\dots,c_n)=0
$$
です。従って $\det I_n=0$ となりますが、LA3B で $\det I_n=1$ を示しているので矛盾です。

よって一次独立なら $\det A\ne0$。対偶を取れば
$$
\det A=0\Longrightarrow c_1,\dots,c_n\text{ は一次従属}
$$
も得られ、両方向が閉じます。
<!-- solution-end -->
"""
t = insert_before(t, "\n---\n\n## 9. 次に進む", ex, "LA3B exercises")
save(p, t)


# -----------------------------------------------------------------------------
# LA3C: expand the delicate Laplace-sign step, formalize adjugate identity,
# and add computation/proof exercises to A4/B3/C1.
# -----------------------------------------------------------------------------
p, t = load("LA3C")
start_phrase = "$\\sigma(j)=i$ を固定し、第 $j$ 列と第 $i$ 行を除いて残りの添字を昇順に詰め直すと $M_{ij}$ の置換 $\\bar\\sigma\\in S_{n-1}$ が得られます。"
start = t.find(start_phrase)
if start < 0:
    raise RuntimeError("LA3C Laplace start not found")
end_phrase = "これを $i$ について足せば列展開を得ます。"
end = t.find(end_phrase, start)
if end < 0:
    raise RuntimeError("LA3C Laplace end not found")
replacement = r"""$\sigma(j)=i$ を固定します。列添字集合から $j$ を除いたものを
$$
C=\{1,\dots,n\}\setminus\{j\},
$$
行添字集合から $i$ を除いたものを
$$
R=\{1,\dots,n\}\setminus\{i\}
$$
とし、それぞれを昇順に
$$
c_1<\cdots<c_{n-1},\qquad r_1<\cdots<r_{n-1}
$$
と並べます。$\sigma(j)=i$ なので、$\sigma$ は $C$ を $R$ へ全単射に移します。従って一意な $\bar\sigma\in S_{n-1}$ が
$$
\sigma(c_k)=r_{\bar\sigma(k)}
$$
で定まります。これは $\sigma(j)=i$ を満たす置換と $S_{n-1}$ の置換との1対1対応です。

成分積から $a_{ij}$ を除いた部分は、この対応の下でちょうど小行列 $M_{ij}$ の Leibniz 項になります。残るのは符号です。位置 $j$ を先頭へ移すには $j-1$ 回、値 $i$ を先頭へ移すには $i-1$ 回の隣接交換が必要で、その後に残る置換が $\bar\sigma$ です。従って
$$
\operatorname{sgn}(\sigma)
=(-1)^{(j-1)+(i-1)}\operatorname{sgn}(\bar\sigma)
=(-1)^{i+j}\operatorname{sgn}(\bar\sigma).
$$
ここで最後の等号は指数が2だけ違うためです。

したがって固定した $i$ に対応する項の和は
$$
a_{ij}(-1)^{i+j}
\sum_{\bar\sigma\in S_{n-1}}
\operatorname{sgn}(\bar\sigma)
\prod_{k=1}^{n-1}(M_{ij})_{\bar\sigma(k),k}
=a_{ij}C_{ij}.
$$
"""
t = t[:start] + replacement + t[end:]

adj_start = t.find("ここで積を直接計算します。$A\\operatorname{adj}(A)$ の $(i,j)$ 成分は")
if adj_start < 0:
    raise RuntimeError("LA3C adjugate start not found")
adj_end_phrase = "したがって $\\det A\\ne0$ なら"
adj_end = t.find(adj_end_phrase, adj_start)
if adj_end < 0:
    raise RuntimeError("LA3C adjugate end not found")
adj_repl = r"""<a id="thm-la3c-adjugate-identity"></a>
<!-- formal-statement-start -->
> **定理（余因子行列の基本恒等式）**  
> 任意の正方行列 $A$ に対して
> $$
> A\operatorname{adj}(A)
> =\operatorname{adj}(A)A
> =(\det A)I.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A\operatorname{adj}(A)$ の $(i,j)$ 成分は
$$
\sum_{k=1}^na_{ik}C_{jk}
$$
です。

$i=j$ なら第 $i$ 行の Laplace 展開そのものなので $\det A$ です。$i\ne j$ なら、第 $j$ 行を第 $i$ 行で置き換えた行列を考えます。その第 $j$ 行に沿う Laplace 展開が上の和であり、この行列には第 $i$ 行と第 $j$ 行として同じ行が2本あるため行列式は0です。従って
$$
A\operatorname{adj}(A)=(\det A)I.
$$

同様に $\operatorname{adj}(A)A$ の $(i,j)$ 成分を列の Laplace 展開として読むと、$i=j$ で $\det A$、$i\ne j$ で同じ列を2本持つ行列の行列式0になるため
$$
\operatorname{adj}(A)A=(\det A)I.
$$
$\square$
<!-- proof-end -->

"""
t = t[:adj_start] + adj_repl + t[adj_end:]

ex = r"""

### LA3C-A03 パラメータ付き行列の可逆性

$t\in\mathbb R$ とし
$$
A_t=
\begin{pmatrix}
1&t&0\\
0&1&t\\
t&0&1
\end{pmatrix}.
$$
$\det A_t$ を求め、$A_t$ が可逆でない $t$ を全て求めよ。

<!-- solution-start -->
**解答**：第1行で展開すると
$$
\begin{aligned}
\det A_t
&=1\det\begin{pmatrix}1&t\\0&1\end{pmatrix}
-t\det\begin{pmatrix}0&t\\t&1\end{pmatrix}\\
&=1-t(0-t^2)=1+t^3.
\end{aligned}
$$
実数では
$$
1+t^3=(t+1)(t^2-t+1)
$$
で、$t^2-t+1>0$ なので
$$
\boxed{t=-1}
$$
のときだけ $\det A_t=0$、従って可逆ではありません。
<!-- solution-end -->

### LA3C-A04 余因子行列から逆行列を作る

$$
A=
\begin{pmatrix}
1&1&0\\
0&1&1\\
1&0&1
\end{pmatrix}
$$
について $\det A$ と $\operatorname{adj}(A)$ を求め、余因子行列の基本恒等式から $A^{-1}$ を求めよ。

<!-- solution-start -->
**解答**：計算すると
$$
\det A=2.
$$
各余因子を並べて転置すると
$$
\operatorname{adj}(A)=
\begin{pmatrix}
1&-1&1\\
1&1&-1\\
-1&1&1
\end{pmatrix}.
$$
従って
$$
A^{-1}
=\frac1{\det A}\operatorname{adj}(A)
=\frac12
\begin{pmatrix}
1&-1&1\\
1&1&-1\\
-1&1&1
\end{pmatrix}.
$$
実際に $A\operatorname{adj}(A)=2I$ を掛け算で確認できます。
<!-- solution-end -->

### LA3C-B03 Cramer の公式を導く

$A=[a_1\ \cdots\ a_n]$ を可逆な $n\times n$ 行列とし、$Ax=b$ の解を
$$
x=(x_1,\dots,x_n)^T
$$
とする。$A_j$ を $A$ の第 $j$ 列だけを $b$ に置き換えた行列とするとき
$$
\boxed{x_j=\frac{\det A_j}{\det A}}
$$
を、行列式の多重線形性と交代性から導け。

<!-- solution-start -->
**解答**：$Ax=b$ は列ベクトルで書けば
$$
b=x_1a_1+\cdots+x_na_n
$$
です。従って第 $j$ 列について多重線形性を使うと
$$
\det A_j
=\sum_{k=1}^n x_k
\det(a_1,\dots,a_{j-1},a_k,a_{j+1},\dots,a_n).
$$
$k\ne j$ の項には $a_k$ が2本現れるので0です。残るのは $k=j$ の項だけで
$$
\det A_j=x_j\det A.
$$
$A$ は可逆だから $\det A\ne0$。従って
$$
x_j=\frac{\det A_j}{\det A}.
$$
公式を暗記するより、「置換列 $b$ を解の線形結合で展開すると重複列が全部消える」と見るのが本質です。
<!-- solution-end -->

### LA3C-C01 corank 1 の行列と余因子行列

$A\in\mathbb F^{n\times n}$ が
$$
\operatorname{rank}A=n-1
$$
を満たすとする。次を示せ。

1. $\operatorname{adj}(A)\ne0$。
2. $\operatorname{adj}(A)$ の各列は $\ker A$ に属する。
3. $\operatorname{rank}\operatorname{adj}(A)=1$。

<!-- solution-start -->
**解答**：$\operatorname{rank}A=n-1$ なので $\det A=0$ です。一方、rank が $n-1$ であることから少なくとも1つの $(n-1)\times(n-1)$ 小行列式は非零です。その値は符号を除いて $A$ の余因子の1つなので
$$
\operatorname{adj}(A)\ne0.
$$

余因子行列の基本恒等式から
$$
A\operatorname{adj}(A)=(\det A)I=0.
$$
従って $\operatorname{adj}(A)$ の各列 $u$ は $Au=0$ を満たし、$u\in\ker A$ です。rank-nullity より
$$
\dim\ker A=n-(n-1)=1.
$$
したがって $\operatorname{adj}(A)$ の全ての列は同じ1次元空間に入り
$$
\operatorname{rank}\operatorname{adj}(A)\le1.
$$
しかし第1段階で $\operatorname{adj}(A)\ne0$ を示したので rank は0ではありません。従って
$$
\boxed{\operatorname{rank}\operatorname{adj}(A)=1}.
$$
なお $\operatorname{adj}(A)A=0$ から、行についても同様に左核へ入ることが分かります。
<!-- solution-end -->
"""
t = insert_before(t, "\n---\n\n## 10. 次に進む", ex, "LA3C exercises")
save(p, t)


# -----------------------------------------------------------------------------
# LA3D: make the det=0 mechanism fully explicit; add A4/B3/C1 exercises.
# -----------------------------------------------------------------------------
p, t = load("LA3D")
start = t.find("同様に、$T$ がある方向を0へ潰せば")
if start < 0:
    raise RuntimeError("LA3D kernel paragraph start not found")
end = t.find("\n\n---\n\n## 7.", start)
if end < 0:
    raise RuntimeError("LA3D kernel paragraph end not found")
new = r"""この「次元を潰す」という意味も、基底延長まで書けば完全に座標なしで確認できます。

<a id="cor-la3d-det-invertible"></a>
<!-- formal-statement-start -->
> **系（抽象行列式による可逆性判定）**  
> 有限次元ベクトル空間 $V$ の線形写像 $T:V\to V$ に対して
> $$
> \det T=0
> \Longleftrightarrow
> T\text{ は可逆でない}.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $T$ が可逆でないとします。有限次元なので $T$ は単射でなく、$0\ne v_1\in\ker T$ を取れます。$v_1$ を基底
$$
v_1,v_2,\dots,v_n
$$
へ延長します。非零な最高次交代形式 $\omega$ は任意の基底上で非零です。実際、この基底上で $\omega(v_1,\dots,v_n)=0$ なら、最高次交代形式の1次元性の証明と同じ展開により $\omega$ は全ての入力で0となり、非零性に矛盾します。

ところが $Tv_1=0$ なので
$$
\omega(Tv_1,Tv_2,\dots,Tv_n)=0.
$$
抽象行列式の定義から
$$
0=(\det T)\,\omega(v_1,\dots,v_n),
$$
右の第2因子は非零だから $\det T=0$ です。

逆に $\det T=0$ なら、任意の基底 $\mathcal B$ について
$$
\det[T]_{\mathcal B}=\det T=0.
$$
LA3C の可逆性判定により $[T]_{\mathcal B}$ は可逆でなく、従って $T$ も可逆ではありません。$\square$
<!-- proof-end -->
"""
t = t[:start] + new + t[end:]

ex = r"""

### LA3D-A03 多項式空間上の平行移動

$V=\mathbb R_2[x]$ とし
$$
T(p)(x)=p(x+1)
$$
で線形写像 $T:V\to V$ を定める。基底 $(1,x,x^2)$ を使って $\det T$ を求めよ。

<!-- solution-start -->
**解答**：
$$
T(1)=1,
\qquad
T(x)=1+x,
\qquad
T(x^2)=1+2x+x^2.
$$
従って表現行列は
$$
[T]=
\begin{pmatrix}
1&1&1\\
0&1&2\\
0&0&1
\end{pmatrix}.
$$
上三角なので
$$
\boxed{\det T=1}.
$$
抽象行列式と表現行列の行列式が一致するため、別の基底で計算しても答えは変わりません。
<!-- solution-end -->

### LA3D-A04 せん断を体積形式だけで読む

$V$ の基底を $e_1,e_2,e_3$ とし
$$
Te_1=e_1,
\qquad
Te_2=e_1+e_2,
\qquad
Te_3=e_2+e_3
$$
で $T:V\to V$ を定める。行列式の座標公式を使わず、非零な最高次交代形式 $\omega$ を用いて $\det T$ を求めよ。

<!-- solution-start -->
**解答**：交代多重線形性から
$$
\begin{aligned}
\omega(Te_1,Te_2,Te_3)
&=\omega(e_1,e_1+e_2,e_2+e_3)\\
&=\omega(e_1,e_2,e_2+e_3)\\
&=\omega(e_1,e_2,e_3).
\end{aligned}
$$
途中で同じベクトルを2回含む項が全て0になりました。$\omega(e_1,e_2,e_3)\ne0$ なので定義と比較して
$$
\boxed{\det T=1}.
$$
せん断は符号付き体積を変えない、という幾何的意味がそのまま式に現れています。
<!-- solution-end -->

### LA3D-B03 $\det T=0$ を完全に座標なしで判定する

$V$ を有限次元、$T:V\to V$ を線形写像とする。表現行列や LA3C の可逆性判定を使わず、最高次交代形式だけから
$$
\det T=0
\Longleftrightarrow
T\text{ は単射でない}
$$
を示せ。

<!-- solution-start -->
**解答**：$T$ が単射でないなら $0\ne v_1\in\ker T$ を取り、基底 $v_1,\dots,v_n$ へ延長します。非零な最高次交代形式 $\omega$ は基底上で非零なので
$$
\omega(v_1,\dots,v_n)\ne0.
$$
一方 $Tv_1=0$ だから
$$
\omega(Tv_1,\dots,Tv_n)=0.
$$
定義より
$$
0=(\det T)\omega(v_1,\dots,v_n)
$$
なので $\det T=0$ です。

逆に $T$ が単射だとします。有限次元なので $T$ は同型で、任意の基底 $v_1,\dots,v_n$ の像
$$
Tv_1,\dots,Tv_n
$$
も基底です。従って非零な最高次交代形式について
$$
\omega(v_1,\dots,v_n)\ne0,
\qquad
\omega(Tv_1,\dots,Tv_n)\ne0.
$$
両者を結ぶ係数 $\det T$ は0ではありません。よって対偶から $\det T=0$ なら単射ではありません。
<!-- solution-end -->

### LA3D-C01 共役による行列式不変性を座標なしで示す

$V,W$ を同じ有限次元のベクトル空間、$S:V\to W$ を線形同型、$T:V\to V$ を線形写像とする。
$$
U=STS^{-1}:W\to W
$$
と置く。表現行列・相似変換・LA3C の相似不変性を使わず、最高次交代形式の定義だけから
$$
\boxed{\det U=\det T}
$$
を示せ。

<!-- solution-start -->
**解答**：$W$ 上の非零な最高次交代形式 $\eta$ を1つ取ります。$V$ 上に
$$
\omega(v_1,\dots,v_n)
=\eta(Sv_1,\dots,Sv_n)
$$
と定めると、$S$ が同型なので $\omega$ も非零な最高次交代形式です。

任意の $w_i\in W$ を $w_i=Sv_i$ と書くと
$$
\begin{aligned}
\eta(Uw_1,\dots,Uw_n)
&=\eta(STv_1,\dots,STv_n)\\
&=\omega(Tv_1,\dots,Tv_n)\\
&=(\det T)\omega(v_1,\dots,v_n)\\
&=(\det T)\eta(w_1,\dots,w_n).
\end{aligned}
$$
一方、$U$ の抽象行列式の定義では左辺は
$$
(\det U)\eta(w_1,\dots,w_n)
$$
です。$\eta$ が非零になる入力を選べるので係数を比較して
$$
\det U=\det T.
$$
これは「相似不変性」が座標表示の偶然ではなく、同型で空間を読み替えても体積倍率が変わらないという構造的事実であることを示します。
<!-- solution-end -->
"""
t = insert_before(t, "\n---\n\n## 9. 次に進む", ex, "LA3D exercises")
save(p, t)

print("LA3A-D quality patch applied")
