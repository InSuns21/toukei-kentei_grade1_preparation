# RKHS2 正則化問題の表現定理

<!-- definition-example-audit: strict -->

[RKHS1](../RKHS1/index.md) では、点評価が内積
$$
f(x)=\langle f,K_x\rangle_{\mathcal H}
$$
として表されることを確認しました。

ここでは、その再生性が最適化問題の次元を一気に下げることを見ます。訓練データが有限個しかないなら、損失が見ているのも
$$
f(x_1),\dots,f(x_n)
$$
という有限個の値だけです。そこで、訓練点から完全に見えない方向へ関数を動かしても損失は変わりません。一方、RKHS ノルムによる正則化はその余分な方向を罰します。

本章の中心は
$$
\boxed{
\text{有限個の点評価}
+
\text{RKHS ノルム正則化}
\Longrightarrow
\text{核切片の有限線形結合}
}
$$
です。

これは単なる計算上の便利さではありません。無限次元かもしれない関数空間上の最適化が、訓練点数以下の有限次元問題へ落ちる理由そのものです。

---

## 1. 訓練点から見える方向だけを集める

訓練点を
$$
x_1,\dots,x_n\in\mathcal X
$$
とし、$\mathcal H$ を再生核 $K$ を持つ RKHS とします。

<a id="def-rkhs2-sample-subspace"></a>

<!-- formal-statement-start -->
> **定義（標本部分空間）**  
> 訓練点 $x_1,\dots,x_n$ に対して
>
$$
S
:=
\operatorname{span}
\{K_{x_1},\dots,K_{x_n}\}
\subset\mathcal H
$$
>
> を **標本部分空間** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rkhs2-sample-subspace -->
**定義の確認**：線形核で何が「見える」か

$\mathcal X=\mathbb R^3$ とし、
$$
K(x,z)=x^{\mathsf T}z
$$
を考えます。[RKHS1 の線形核の例](../RKHS1/index.md#def-rkhs1-reproducing-kernel)と同じく、RKHS は
$$
f_w(z)=w^{\mathsf T}z,
\qquad
\langle f_w,f_v\rangle_{\mathcal H}=w^{\mathsf T}v
$$
で表せます。

訓練点を
$$
x_1=e_1=(1,0,0)^{\mathsf T},
\qquad
x_2=e_2=(0,1,0)^{\mathsf T}
$$
とすると、
$$
K_{x_1}=f_{e_1},
\qquad
K_{x_2}=f_{e_2}
$$
なので
$$
S=\{f_w:w_3=0\}.
$$

したがって $e_3$ 方向は標本部分空間の外側です。実際、
$$
f_{(a,b,c)}(x_1)=a,
\qquad
f_{(a,b,c)}(x_2)=b
$$
であり、$c$ は訓練点での値に全く現れません。
<!-- definition-example-end -->

標本部分空間は高々 $n$ 次元です。したがって有限次元部分空間として閉じており、[閉線形部分空間の直交分解](../F0_02C1A_Hilbert射影定理_直交分解/index.md#thm-f0-02c1a-orthogonal-decomposition)を使えます。

---

## 2. 直交成分はすべての訓練点で消える

任意の $f\in\mathcal H$ を
$$
f=f_S+f_\perp,
\qquad
f_S\in S,
\qquad
f_\perp\in S^\perp
$$
と直交分解します。

<a id="lem-rkhs2-invisible-component"></a>

<!-- formal-statement-start -->
> **補題（直交成分は標本点で消える）**  
> 上の直交分解に対して、すべての $i=1,\dots,n$ について
>
$$
f_\perp(x_i)=0
$$
>
> が成り立つ。したがって
>
$$
f(x_i)=f_S(x_i)
$$
>
> であり、標本部分空間への直交射影は全訓練点で関数値を保つ。
<!-- formal-statement-end -->

### 証明の見取り図

再生性により、点 $x_i$ での値は $K_{x_i}$ との内積です。一方、
$$
K_{x_i}\in S,
\qquad
f_\perp\in S^\perp
$$
なので、この内積は 0 になります。

<!-- proof-start -->
### 証明

[再生性](../RKHS1/index.md#def-rkhs1-reproducing-property)から
$$
f_\perp(x_i)
=
\langle f_\perp,K_{x_i}\rangle_{\mathcal H}.
$$

標本部分空間の定義より $K_{x_i}\in S$ です。また $f_\perp\in S^\perp$ なので
$$
\langle f_\perp,K_{x_i}\rangle_{\mathcal H}=0.
$$

従って
$$
f_\perp(x_i)=0.
$$

さらに
$$
f(x_i)
=
f_S(x_i)+f_\perp(x_i)
=
f_S(x_i).
$$
よって標本部分空間への直交射影は全訓練点で関数値を保ちます。
<!-- proof-end -->

同時に Pythagoras の関係から
$$
\|f\|_{\mathcal H}^2
=
\|f_S\|_{\mathcal H}^2
+
\|f_\perp\|_{\mathcal H}^2.
$$

したがって
$$
\|f_S\|_{\mathcal H}
\le
\|f\|_{\mathcal H},
$$
しかも $f_\perp\ne0$ なら狭義不等号です。

つまり直交成分 $f_\perp$ は、

- 訓練点での値には何も寄与しない
- RKHS ノルムだけを増やす

という成分です。表現定理は、この二つをそのまま最適化へ持ち込んだものです。

---

## 3. RKHS の表現定理

損失
$$
L:\mathbb R^n\to\mathbb R
$$
と、ノルムだけを見る正則化関数
$$
\Omega:[0,\infty)\to\mathbb R
$$
を考えます。

目的関数を
$$
J(f)
=
L\bigl(f(x_1),\dots,f(x_n)\bigr)
+
\Omega\bigl(\|f\|_{\mathcal H}\bigr)
$$
とします。

<a id="thm-rkhs2-representer"></a>

<!-- formal-statement-start -->
> **定理（RKHS 正則化問題の表現定理）**  
> $\mathcal H$ を集合 $\mathcal X$ 上の RKHS、$x_1,\dots,x_n\in\mathcal X$ を訓練点とし、
>
$$
S=\operatorname{span}\{K_{x_1},\dots,K_{x_n}\}
$$
>
> とする。$L:\mathbb R^n\to\mathbb R$ を任意の関数、$\Omega:[0,\infty)\to\mathbb R$ を非減少関数とする。
>
> このとき任意の $f\in\mathcal H$ と、その $S$ への直交射影 $f_S$ に対して
>
$$
J(f_S)\le J(f)
$$
>
> が成り立つ。従って
>
$$
\inf_{f\in\mathcal H}J(f)
=
\inf_{g\in S}J(g).
$$
>
> 特に最小解が存在するなら、少なくとも一つは
>
$$
f^*(\cdot)
=
\sum_{i=1}^n
\alpha_i K(\cdot,x_i)
$$
>
> の形に選べる。さらに $\Omega$ が狭義増加なら、すべての最小解が $S$ に属する。
<!-- formal-statement-end -->

### 証明の見取り図

任意の $f$ を
$$
f=f_S+f_\perp
$$
と分解します。

補題により
$$
f(x_i)=f_S(x_i)
$$
なので損失は完全に同じです。一方、
$$
\|f_S\|\le\|f\|
$$
であり、$\Omega$ は非減少なので正則化項は悪化しません。

狭義増加なら、$f_\perp\ne0$ のとき正則化項が必ず真に小さくなるため、最小解に直交成分は残れません。

<!-- proof-start -->
### 証明

任意の $f\in\mathcal H$ を
$$
f=f_S+f_\perp,
\qquad
f_S\in S,
\qquad
f_\perp\in S^\perp
$$
と直交分解します。

前節の補題より、すべての $i$ で
$$
f(x_i)=f_S(x_i).
$$
したがって
$$
L\bigl(f(x_1),\dots,f(x_n)\bigr)
=
L\bigl(f_S(x_1),\dots,f_S(x_n)\bigr).
$$

また直交性から
$$
\|f\|_{\mathcal H}^2
=
\|f_S\|_{\mathcal H}^2
+
\|f_\perp\|_{\mathcal H}^2
\ge
\|f_S\|_{\mathcal H}^2.
$$
両辺は非負なので
$$
\|f_S\|_{\mathcal H}
\le
\|f\|_{\mathcal H}.
$$

$\Omega$ は非減少だから
$$
\Omega(\|f_S\|_{\mathcal H})
\le
\Omega(\|f\|_{\mathcal H}).
$$
よって
$$
J(f_S)\le J(f).
$$

任意の $f\in\mathcal H$ に対して $S$ 内に同じかそれ以下の目的関数値を持つ $f_S$ があるので
$$
\inf_{f\in\mathcal H}J(f)
\ge
\inf_{g\in S}J(g).
$$
逆向きは $S\subset\mathcal H$ から自明なので
$$
\inf_{f\in\mathcal H}J(f)
=
\inf_{g\in S}J(g).
$$

最小解 $f^*$ が存在すれば、その射影 $f_S^*\in S$ も同じ最小値を達成します。$S$ の定義から
$$
f_S^*
=
\sum_{i=1}^n\alpha_iK_{x_i}
$$
と書けます。

最後に $\Omega$ が狭義増加とします。もし最小解 $f^*$ に $f_\perp^*\ne0$ が残っていれば
$$
\|f_S^*\|_{\mathcal H}
<
\|f^*\|_{\mathcal H}
$$
なので
$$
\Omega(\|f_S^*\|_{\mathcal H})
<
\Omega(\|f^*\|_{\mathcal H}).
$$
損失は同じだから
$$
J(f_S^*)<J(f^*)
$$
となり、$f^*$ の最小性に矛盾します。従って狭義増加の場合、すべての最小解が $S$ に属します。
<!-- proof-end -->

---

## 4. 二乗ノルム正則化では、すべての最小解が有限和になる

計画上の中心問題
$$
\min_{f\in\mathcal H}
L\bigl(f(x_1),\dots,f(x_n)\bigr)
+
\lambda\|f\|_{\mathcal H}^2,
\qquad
\lambda>0
$$
を考えます。

ここでは
$$
\Omega(r)=\lambda r^2
$$
です。$r\ge0$ 上で狭義増加なので、表現定理から最小解が存在するなら **すべての最小解** が
$$
\boxed{
f^*(\cdot)
=
\sum_{i=1}^n
\alpha_iK(\cdot,x_i)
}
$$
の形になります。

重要なのは、損失 $L$ の微分可能性も凸性も、この有限和表示そのものには不要なことです。

表現定理が使っているのは、

1. 損失が訓練点での有限個の値だけを見る
2. 正則化が RKHS ノルムの非減少関数である
3. RKHS の再生性により点評価を核切片との内積で書ける

という構造だけです。

---

## 5. 正則化を外すと「すべての最小解」は有限和にならない

狭義増加という条件が何をしているか、線形核で確認します。

$\mathbb R^2$ 上の線形核
$$
K(x,z)=x^{\mathsf T}z
$$
を考え、訓練点を
$$
x_1=e_1
$$
だけとします。関数を
$$
f_w(z)=w^{\mathsf T}z,
\qquad
w=(w_1,w_2)
$$
と書きます。

損失だけの問題
$$
J_0(w)
=
\bigl(f_w(e_1)-1\bigr)^2
=
(w_1-1)^2
$$
では、
$$
w=(1,t),
\qquad t\in\mathbb R
$$
がすべて最小解です。

標本部分空間は
$$
S=\operatorname{span}\{e_1\}
$$
なので、$t\ne0$ の最小解は $S$ の外にあります。

ただし $t=0$ を選べば $S$ 内の最小解もあります。これは、正則化関数が単に非減少なら「標本部分空間内の最小解を選べる」としか言えず、「すべての最小解がそこに入る」とは限らないことを示します。

さらに
$$
J_-(w)
=
(w_1-1)^2-w_2^2
$$
のように、不可視な方向の大きさをむしろ報酬する項を入れると、
$$
J_-(1,t)=-t^2\to-\infty
$$
となります。訓練点から見えない方向を捨てる、という表現定理の機構そのものが壊れます。

---

## 6. Gram 行列で有限次元問題を書く

表現定理により
$$
f_\alpha
=
\sum_{j=1}^n
\alpha_jK_{x_j}
$$
だけを考えればよくなりました。

訓練点に対する Gram 行列を
$$
G
=
\bigl(K(x_i,x_j)\bigr)_{i,j=1}^n
$$
とします。

<a id="prop-rkhs2-gram-reduction"></a>

<!-- formal-statement-start -->
> **命題（Gram 行列による有限次元表示）**  
> $f_\alpha=\sum_{j=1}^n\alpha_jK_{x_j}$ とすると、
>
$$
\bigl(f_\alpha(x_1),\dots,f_\alpha(x_n)\bigr)^{\mathsf T}
=
G\alpha
$$
>
> かつ
>
$$
\|f_\alpha\|_{\mathcal H}^2
=
\alpha^{\mathsf T}G\alpha.
$$
>
> 従って
>
$$
\inf_{f\in\mathcal H}
\left\{
L\bigl(f(x_1),\dots,f(x_n)\bigr)
+
\lambda\|f\|_{\mathcal H}^2
\right\}
$$
>
> と
>
$$
\inf_{\alpha\in\mathbb R^n}
\left\{
L(G\alpha)
+
\lambda\alpha^{\mathsf T}G\alpha
\right\}
$$
>
> は等しい。いずれかが最小値を達成する場合、対応する有限和表示を通して他方も同じ値を達成する。
<!-- formal-statement-end -->

### 証明の見取り図

関数値には再生性を、ノルムには [再生核の基本公式](../RKHS1/index.md#prop-rkhs1-reproducing-properties)
$$
\langle K_{x_i},K_{x_j}\rangle_{\mathcal H}
=
K(x_i,x_j)
$$
を使います。

<!-- proof-start -->
### 証明

各 $i$ について
$$
\begin{aligned}
f_\alpha(x_i)
&=
\left\langle
\sum_{j=1}^n\alpha_jK_{x_j},
K_{x_i}
\right\rangle_{\mathcal H}\\
&=
\sum_{j=1}^n
\alpha_j
K(x_i,x_j).
\end{aligned}
$$
よって値ベクトルは
$$
G\alpha
$$
です。

また
$$
\begin{aligned}
\|f_\alpha\|_{\mathcal H}^2
&=
\left\langle
\sum_{i=1}^n\alpha_iK_{x_i},
\sum_{j=1}^n\alpha_jK_{x_j}
\right\rangle_{\mathcal H}\\
&=
\sum_{i=1}^n\sum_{j=1}^n
\alpha_i\alpha_j
K(x_i,x_j)\\
&=
\alpha^{\mathsf T}G\alpha.
\end{aligned}
$$

表現定理により最小値を求めるには $S$ 上だけ調べればよく、$S$ の任意の元は $f_\alpha$ と書けます。従って有限次元問題
$$
\inf_{\alpha\in\mathbb R^n}
\left\{
L(G\alpha)
+
\lambda\alpha^{\mathsf T}G\alpha
\right\}
$$
と同じ下限値を持ちます。最小解が存在する場合は、その有限和表示が有限次元側の最小解を与えます。
<!-- proof-end -->

これで「無限次元から有限次元へ落ちる」という言葉が、実際の行列問題になりました。

---

## 7. Gram 行列が特異なら係数は一意とは限らない

表現定理が保証するのは **関数が有限和で表せること** であって、係数 $\alpha$ の一意性ではありません。

定数核
$$
K(x,z)=1
$$
を考えます。二つの訓練点 $x_1,x_2$ に対して
$$
K_{x_1}=K_{x_2}=1
$$
なので
$$
G=
\begin{pmatrix}
1&1\\
1&1
\end{pmatrix}
$$
は特異です。

係数
$$
\alpha=
\begin{pmatrix}
1\\
0
\end{pmatrix},
\qquad
\beta=
\begin{pmatrix}
0\\
1
\end{pmatrix}
$$
は異なりますが、
$$
f_\alpha
=
K_{x_1}
=
1
=
K_{x_2}
=
f_\beta
$$
です。

一般に $v\in\ker G$ なら
$$
\left\|
\sum_{i=1}^n v_iK_{x_i}
\right\|_{\mathcal H}^2
=
v^{\mathsf T}Gv
=
0,
$$
したがって
$$
\sum_{i=1}^n v_iK_{x_i}=0
$$
です。

従って
$$
\alpha
\quad\text{と}\quad
\alpha+v
$$
は同じ RKHS の元を表します。

逆に $G$ が正定値なら核切片 $K_{x_1},\dots,K_{x_n}$ は一次独立なので、$S$ 内の関数の係数表示は一意です。

この区別は次章で線形方程式を解くときに重要になります。

---

## 8. いつ最小解の存在まで言えるか

表現定理は「最小解が存在するなら有限和になる」という構造を与えます。ここから損失に連続性と下からの有界性を加えると、最小解が実際に存在することまで確認できます。

<a id="cor-rkhs2-existence"></a>

<!-- formal-statement-start -->
> **系（連続で下に有界な損失に対する最小解の存在）**  
> $L:\mathbb R^n\to\mathbb R$ が連続かつ下に有界で、$\lambda>0$ とする。このとき
>
$$
J(f)
=
L\bigl(f(x_1),\dots,f(x_n)\bigr)
+
\lambda\|f\|_{\mathcal H}^2
$$
>
> は $\mathcal H$ 上で最小解を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

表現定理により有限次元空間 $S$ だけを見れば十分です。$L$ が下に有界なら、$\lambda\|f\|^2$ によって $\|f\|\to\infty$ のとき目的関数も $+\infty$ へ向かいます。

有限次元では閉有界集合がコンパクトなので、十分大きな閉球へ最小化を制限し、連続性から最小値の達成を得ます。

<!-- proof-start -->
### 証明

$L$ は下に有界なので、ある $m\in\mathbb R$ が存在して
$$
L(y)\ge m
\qquad
(\forall y\in\mathbb R^n)
$$
です。

表現定理より
$$
\inf_{f\in\mathcal H}J(f)
=
\inf_{g\in S}J(g).
$$

$g\in S$ に対して
$$
J(g)
\ge
m+\lambda\|g\|_{\mathcal H}^2.
$$
従って
$$
\|g\|_{\mathcal H}\to\infty
\quad\Longrightarrow\quad
J(g)\to+\infty.
$$

また各点評価は RKHS 上で連続なので
$$
g\mapsto
\bigl(g(x_1),\dots,g(x_n)\bigr)
$$
は連続です。$L$ も連続だから $J|_S$ は連続です。

上の評価から、十分大きい $R$ を取れば最小化を閉球
$$
\{g\in S:\|g\|_{\mathcal H}\le R\}
$$
の中に制限できます。$S$ は有限次元なのでこの閉球はコンパクトであり、連続関数 $J|_S$ はそこで最小値を達成します。よって $\mathcal H$ 上でも最小解が存在します。
<!-- proof-end -->

この系は表現定理そのものより条件が強い点に注意します。表現定理の有限和化には $L$ の連続性すら不要ですが、最小値を「実際に達成する」ことまで言うには追加条件が必要です。

---

## 9. 点評価でなくても同じ機構が働く

表現定理の本質は「核」だけではなく、**有限個の連続線形観測には Riesz 表現元がある**ことです。

連続線形汎関数
$$
\ell_1,\dots,\ell_m\in\mathcal H^*
$$
を考えます。[Riesz 表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation)により、それぞれ一意な
$$
r_1,\dots,r_m\in\mathcal H
$$
が存在して
$$
\ell_j(f)=\langle f,r_j\rangle_{\mathcal H}
$$
と書けます。

<a id="thm-rkhs2-linear-observation"></a>

<!-- formal-statement-start -->
> **定理（連続線形観測に対する表現定理）**  
> Hilbert 空間 $\mathcal H$ 上の連続線形汎関数 $\ell_1,\dots,\ell_m$ の Riesz 表現元を $r_1,\dots,r_m$ とし、
>
$$
S_\ell
=
\operatorname{span}\{r_1,\dots,r_m\}
$$
>
> とする。$L:\mathbb R^m\to\mathbb R$、非減少関数 $\Omega:[0,\infty)\to\mathbb R$ に対して
>
$$
J(f)
=
L\bigl(\ell_1(f),\dots,\ell_m(f)\bigr)
+
\Omega(\|f\|_{\mathcal H})
$$
>
> と置く。このとき任意の $f$ の $S_\ell$ への直交射影 $f_{S_\ell}$ は
>
$$
J(f_{S_\ell})\le J(f)
$$
>
> を満たす。特に最小解が存在するなら $S_\ell$ 内の最小解を選べる。$\Omega$ が狭義増加なら、すべての最小解が $S_\ell$ に属する。
<!-- formal-statement-end -->

### 証明の見取り図

$h\in S_\ell^\perp$ なら
$$
\ell_j(h)
=
\langle h,r_j\rangle
=
0
$$
です。したがって、点評価版の証明で $K_{x_i}$ を $r_j$ に置き換えるだけです。

<!-- proof-start -->
### 証明

任意の $f\in\mathcal H$ を
$$
f=f_{S_\ell}+h,
\qquad
f_{S_\ell}\in S_\ell,
\qquad
h\in S_\ell^\perp
$$
と直交分解します。

各 $j$ について $r_j\in S_\ell$ なので
$$
\ell_j(h)
=
\langle h,r_j\rangle_{\mathcal H}
=
0.
$$
よって
$$
\ell_j(f)
=
\ell_j(f_{S_\ell})
$$
です。

したがって損失項は変わりません。また
$$
\|f\|_{mathcal H}^2
=
\|f_{S_\ell}\|_{mathcal H}^2
+
\|h\|_{mathcal H}^2
$$
なので
$$
\|f_{S_\ell}\|_{mathcal H}
\le
\|f\|_{mathcal H}.
$$

あとは $\Omega$ の非減少性から
$$
J(f_{S_\ell})\le J(f)
$$
が従います。狭義増加の場合に $h\ne0$ が最小解へ残れないことも、点評価版と同じです。
<!-- proof-end -->

RKHS の点評価では
$$
\ell_i(f)=f(x_i),
\qquad
r_i=K_{x_i}
$$
なので、本章の表現定理はこの一般形の特別な場合です。

---

## 10. 次章へ：有限和になった後に何を解くのか

ここまでで、
$$
f^*
=
\sum_{i=1}^n\alpha_iK_{x_i}
$$
という有限和表示と、
$$
\bigl(f(x_1),\dots,f(x_n)\bigr)^{\mathsf T}
=
G\alpha,
\qquad
\|f\|_{\mathcal H}^2
=
\alpha^{\mathsf T}G\alpha
$$
を得ました。

したがって次に必要なのは、具体的な損失 $L$ を入れたときに係数 $\alpha$ をどう求めるかです。

RKHS3 では二乗損失を入れ、核リッジ回帰としてこの有限次元問題を最後まで解きます。本章の役割は、その計算へ入る前に

> なぜ最初から有限個の係数だけを解けばよいのか

を数学的に閉じることです。

---

## 演習

<a id="ex-rkhs2-a01"></a>

### RKHS2-A01 直交成分が訓練点で消えることを再構成する

- Level: A
- 目安時間: 10分

$S=\operatorname{span}\{K_{x_1},\dots,K_{x_n}\}$ とし、$h\in S^\perp$ とする。各 $i$ について $h(x_i)=0$ を示せ。使用した RKHS の性質も明記せよ。

<!-- solution-start -->
#### 詳細解答

RKHS の再生性から
$$
h(x_i)
=
\langle h,K_{x_i}\rangle_{\mathcal H}.
$$

一方、標本部分空間の定義より
$$
K_{x_i}\in S.
$$
仮定 $h\in S^\perp$ から
$$
\langle h,K_{x_i}\rangle_{\mathcal H}=0.
$$
従って
$$
h(x_i)=0.
$$

使った性質は、点評価を核切片との内積へ変換する再生性です。直交性だけでは関数値が 0 とは言えず、再生性が両者を接続しています。
<!-- solution-end -->

<a id="ex-rkhs2-a02"></a>

### RKHS2-A02 射影で損失を変えずノルムを減らす

- Level: A
- 目安時間: 10分

$f=f_S+f_\perp$ を標本部分空間 $S$ に関する直交分解とする。

1. $f(x_i)=f_S(x_i)$ を示せ。
2. $\|f\|_{\mathcal H}^2=\|f_S\|_{\mathcal H}^2+\|f_\perp\|_{\mathcal H}^2$ を示せ。
3. $f_\perp\ne0$ なら $\|f_S\|_{\mathcal H}<\|f\|_{\mathcal H}$ を示せ。

<!-- solution-start -->
#### 詳細解答

1. 前問と同様に
$$
f_\perp(x_i)
=
\langle f_\perp,K_{x_i}\rangle_{mathcal H}
=
0
$$
です。従って
$$
f(x_i)
=
f_S(x_i)+f_\perp(x_i)
=
f_S(x_i).
$$

2. $f_S\perp f_\perp$ なので
$$
\begin{aligned}
\|f\|_{mathcal H}^2
&=
\langle f_S+f_\perp,f_S+f_\perp\rangle_{mathcal H}\\
&=
\|f_S\|_{mathcal H}^2
+
2\langle f_S,f_\perp\rangle_{mathcal H}
+
\|f_\perp\|_{mathcal H}^2\\
&=
\|f_S\|_{mathcal H}^2
+
\|f_\perp\|_{mathcal H}^2.
\end{aligned}
$$

3. $f_\perp\ne0$ なら
$$
\|f_\perp\|_{mathcal H}^2>0.
$$
従って
$$
\|f\|_{mathcal H}^2
>
\|f_S\|_{mathcal H}^2.
$$
両辺は非負なので平方根を取って
$$
\|f\|_{mathcal H}
>
\|f_S\|_{mathcal H}.
$$
<!-- solution-end -->

<a id="ex-rkhs2-a03"></a>

### RKHS2-A03 線形核で不可視方向を捨てる

- Level: A
- 目安時間: 12分

$\mathbb R^3$ 上の線形核を考え、
$$
f_w(z)=w^{\mathsf T}z,
\qquad
\|f_w\|_{\mathcal H}=\|w\|_2
$$
とする。訓練点を $x_1=e_1,x_2=e_2$ とし、
$$
w=(2,-1,5)^{\mathsf T}
$$
とする。

1. 標本部分空間への射影に対応する係数ベクトル $w_S$ を求めよ。
2. $f_w(x_1),f_w(x_2)$ と $f_{w_S}(x_1),f_{w_S}(x_2)$ を比較せよ。
3. 二つの RKHS ノルムを比較せよ。

<!-- solution-start -->
#### 詳細解答

線形核では
$$
K_{x_i}=f_{x_i}.
$$
従って標本部分空間は
$$
S
=
\operatorname{span}\{e_1,e_2\}
$$
に対応します。

1. $w=(2,-1,5)^{\mathsf T}$ を $\operatorname{span}\{e_1,e_2\}$ へ直交射影すると
$$
w_S=(2,-1,0)^{\mathsf T}
$$
です。

2. 元の関数では
$$
f_w(x_1)=w^{\mathsf T}e_1=2,
\qquad
f_w(x_2)=w^{\mathsf T}e_2=-1.
$$
射影後も
$$
f_{w_S}(x_1)=2,
\qquad
f_{w_S}(x_2)=-1.
$$
従って訓練点での値は変わりません。

3. ノルムは
$$
\|f_w\|_{mathcal H}^2
=
2^2+(-1)^2+5^2
=
30,
$$
一方
$$
\|f_{w_S}\|_{mathcal H}^2
=
2^2+(-1)^2
=
5.
$$
従って
$$
\|f_{w_S}\|_{mathcal H}
=
\sqrt5
<
\sqrt{30}
=
\|f_w\|_{mathcal H}.
$$

第3成分は訓練点から完全に見えず、ノルムだけを増やしていました。
<!-- solution-end -->

<a id="ex-rkhs2-a04"></a>

### RKHS2-A04 Gram 行列の二つの公式

- Level: A
- 目安時間: 12分

$$
f_\alpha
=
\sum_{j=1}^n\alpha_jK_{x_j},
\qquad
G_{ij}=K(x_i,x_j)
$$
とする。次を導け。

$$
\bigl(f_\alpha(x_1),\dots,f_\alpha(x_n)\bigr)^{\mathsf T}
=
G\alpha,
$$

$$
\|f_\alpha\|_{mathcal H}^2
=
\alpha^{\mathsf T}G\alpha.
$$

<!-- solution-start -->
#### 詳細解答

各 $i$ について
$$
\begin{aligned}
f_\alpha(x_i)
&=
\left\langle
\sum_{j=1}^n\alpha_jK_{x_j},
K_{x_i}
\right\rangle_{mathcal H}\\
&=
\sum_{j=1}^n\alpha_j
\langle K_{x_j},K_{x_i}\rangle_{mathcal H}\\
&=
\sum_{j=1}^n\alpha_jK(x_i,x_j).
\end{aligned}
$$
最後の式は $G\alpha$ の第 $i$ 成分なので
$$
\bigl(f_\alpha(x_1),\dots,f_\alpha(x_n)\bigr)^{\mathsf T}
=
G\alpha.
$$

また
$$
\begin{aligned}
\|f_\alpha\|_{mathcal H}^2
&=
\left\langle
\sum_i\alpha_iK_{x_i},
\sum_j\alpha_jK_{x_j}
\right\rangle_{mathcal H}\\
&=
\sum_i\sum_j
\alpha_i\alpha_j
\langle K_{x_i},K_{x_j}\rangle_{mathcal H}\\
&=
\sum_i\sum_j
\alpha_i\alpha_jK(x_i,x_j)\\
&=
\alpha^{\mathsf T}G\alpha.
\end{aligned}
$$
<!-- solution-end -->

<a id="ex-rkhs2-b01"></a>

### RKHS2-B01 非減少と狭義増加の差

- Level: B
- 目安時間: 18分

$\mathbb R^2$ 上の線形核、訓練点 $x_1=e_1$ を考える。$f_w(z)=w^{\mathsf T}z$ とし、
$$
J(w)
=
\bigl(f_w(e_1)-1\bigr)^2
+
\Omega(\|w\|_2)
$$
とする。

1. $\Omega(r)=0$ のとき全最小解を求め、標本部分空間外の最小解があることを示せ。
2. $\Omega(r)=r^2$ のとき最小解を求め、標本部分空間内に一意に入ることを示せ。
3. この違いを表現定理の仮定と対応付けよ。

<!-- solution-start -->
#### 詳細解答

標本部分空間は
$$
S=\operatorname{span}\{e_1\}.
$$
$w=(w_1,w_2)$ と書くと
$$
f_w(e_1)=w_1.
$$

1. $\Omega(r)=0$ では
$$
J(w)=(w_1-1)^2.
$$
最小値は 0 で、条件は
$$
w_1=1
$$
だけです。従って全最小解は
$$
w=(1,t),
\qquad
t\in\mathbb R.
$$
$t\ne0$ なら $w\notin S$ です。ただし $t=0$ を選べば $S$ 内の最小解もあります。

2. $\Omega(r)=r^2$ では
$$
J(w)
=
(w_1-1)^2+w_1^2+w_2^2.
$$
$w_2$ については
$$
w_2^2\ge0
$$
なので最小値は $w_2=0$ で達成します。

$w_1$ について
$$
(w_1-1)^2+w_1^2
=
2w_1^2-2w_1+1
=
2\left(w_1-\frac12\right)^2+\frac12.
$$
従って一意な最小解は
$$
w=
\left(\frac12,0\right)
$$
です。これは $S$ に属します。

3. $\Omega(r)=0$ は非減少ですが狭義増加ではありません。そのため「$S$ 内の最小解を選べる」ことまでは言えても、すべての最小解が $S$ に入るとは限りません。

一方 $\Omega(r)=r^2$ は $r\ge0$ で狭義増加なので、標本から見えない直交成分を残すと正則化項が必ず増えます。このため全最小解が $S$ に入ります。
<!-- solution-end -->

<a id="ex-rkhs2-b02"></a>

### RKHS2-B02 特異 Gram 行列と係数の非一意性

- Level: B
- 目安時間: 18分

定数核
$$
K(x,z)=1
$$
と二つの訓練点 $x_1,x_2$ を考える。

1. Gram 行列 $G$ を求め、その階数を求めよ。
2. $f_\alpha=\alpha_1K_{x_1}+\alpha_2K_{x_2}$ を具体的な関数として書け。
3. $\alpha$ と $\beta$ が同じ関数を表すための条件を求めよ。
4. $\ker G$ と係数の非一意性の関係を説明せよ。

<!-- solution-start -->
#### 詳細解答

1. すべての核値が 1 なので
$$
G
=
\begin{pmatrix}
1&1\\
1&1
\end{pmatrix}.
$$
2行目は1行目と同じなので
$$
\operatorname{rank}G=1.
$$

2. 各核切片は定数関数 1 です。従って
$$
f_\alpha
=
\alpha_1+\alpha_2
$$
という定数関数です。

3. $\alpha=(\alpha_1,\alpha_2)^{\mathsf T}$、$\beta=(\beta_1,\beta_2)^{\mathsf T}$ とすると
$$
f_\alpha=f_\beta
$$
であるための必要十分条件は
$$
\alpha_1+\alpha_2
=
\beta_1+\beta_2.
$$

4. 
$$
Gv=0
$$
は
$$
v_1+v_2=0
$$
と同値なので
$$
\ker G
=
\operatorname{span}
\left\{
\begin{pmatrix}
1\\
-1
\end{pmatrix}
\right\}.
$$

$v\in\ker G$ なら
$$
f_{\alpha+v}
=
f_\alpha.
$$
つまり Gram 行列の零空間方向へ係数を動かしても、RKHS の関数自体は変わりません。係数の非一意性は、核切片の線形従属性を表しています。
<!-- solution-end -->

<a id="ex-rkhs2-b03"></a>

### RKHS2-B03 最小解の存在を有限次元化から示す

- Level: B
- 目安時間: 22分

$L:\mathbb R^n\to\mathbb R$ は連続かつ下に有界とする。$\lambda>0$ に対して
$$
J(f)
=
L\bigl(f(x_1),\dots,f(x_n)\bigr)
+
\lambda\|f\|_{\mathcal H}^2
$$
を考える。

1. 表現定理により最小化を標本部分空間 $S$ に制限できることを説明せよ。
2. $\|g\|_{\mathcal H}\to\infty$ なら $J(g)\to+\infty$ であることを示せ。
3. 有限次元空間 $S$ 上のコンパクト性を使って最小解の存在を示せ。

<!-- solution-start -->
#### 詳細解答

1. $\Omega(r)=\lambda r^2$ は $r\ge0$ 上で狭義増加です。表現定理より
$$
\inf_{f\in\mathcal H}J(f)
=
\inf_{g\in S}J(g).
$$
従って最小化は有限次元空間 $S$ 上だけ調べれば十分です。

2. $L$ は下に有界なので、ある $m\in\mathbb R$ が存在して
$$
L(y)\ge m
$$
です。従って
$$
J(g)
\ge
m+\lambda\|g\|_{\mathcal H}^2.
$$
よって
$$
\|g\|_{\mathcal H}\to\infty
\quad\Longrightarrow\quad
J(g)\to+\infty.
$$

3. 各点評価は連続なので
$$
g\mapsto
\bigl(g(x_1),\dots,g(x_n)\bigr)
$$
は連続です。$L$ も連続だから $J|_S$ は連続です。

2 の評価により、十分大きい半径 $R$ を取れば最小値を探す範囲を
$$
\{g\in S:\|g\|_{\mathcal H}\le R\}
$$
へ制限できます。$S$ は有限次元なのでこの閉球はコンパクトです。連続関数 $J|_S$ はコンパクト集合上で最小値を達成するため、$\mathcal H$ 上でも最小解が存在します。
<!-- solution-end -->

<a id="ex-rkhs2-c01"></a>

### RKHS2-C01 点評価を一般の連続線形観測へ置き換える

- Level: C
- 目安時間: 35分

$\mathcal H$ を実 Hilbert 空間とし、連続線形汎関数
$$
\ell_1,\dots,\ell_m\in\mathcal H^*
$$
を考える。Riesz 表現元を
$$
\ell_j(f)=\langle f,r_j\rangle_{mathcal H}
$$
で定め、
$$
S_\ell
=
\operatorname{span}\{r_1,dots,r_m\}
$$
とする。

$$
J(f)
=
L\bigl(\ell_1(f),\dots,ell_m(f)\bigr)
+
\lambda\|f\|_{mathcal H}^2,
\qquad
\lambda>0
$$
について、次を示せ。

1. $h\in S_\ell^\perp$ なら $\ell_j(h)=0$ がすべての $j$ で成り立つ。
2. 任意の最小解は $S_\ell$ に属する。
3. $\mathcal H=\mathbb R^3$、
$$
\ell_1(w)=w_1+w_2,
\qquad
\ell_2(w)=w_2+w_3
$$
としたとき、Riesz 表現元 $r_1,r_2$ を求め、最小解が属する平面を方程式で表せ。

<!-- solution-start -->
#### 詳細解答

1. $h\in S_\ell^\perp$ なら、各 $j$ について $r_j\in S_\ell$ なので
$$
\langle h,r_j\rangle_{mathcal H}=0.
$$
Riesz 表現
$$
\ell_j(h)=\langle h,r_j\rangle_{mathcal H}
$$
から
$$
\ell_j(h)=0
$$
です。

2. 任意の $f\in\mathcal H$ を
$$
f=f_S+h,
\qquad
f_S\in S_\ell,
\qquad
h\in S_\ell^\perp
$$
と直交分解します。

1より
$$
\ell_j(f)
=
\ell_j(f_S)+\ell_j(h)
=
\ell_j(f_S).
$$
従って損失項は
$$
L\bigl(\ell_1(f),\dots,\ell_m(f)\bigr)
=
L\bigl(\ell_1(f_S),\dots,\ell_m(f_S)\bigr)
$$
で変わりません。

一方、直交性から
$$
\|f\|_{mathcal H}^2
=
\|f_S\|_{mathcal H}^2
+
\|h\|_{mathcal H}^2.
$$
もし $h\ne0$ なら
$$
\|f\|_{mathcal H}^2
>
\|f_S\|_{mathcal H}^2.
$$
$\lambda>0$ なので
$$
J(f)>J(f_S).
$$
従って最小解に $h\ne0$ は残れず、任意の最小解は $S_\ell$ に属します。

3. $\mathbb R^3$ の標準内積に対して
$$
\ell_1(w)
=
w_1+w_2
=
\left\langle
w,
\begin{pmatrix}
1\\
1\\
0
\end{pmatrix}
\right\rangle,
$$
したがって
$$
r_1=
\begin{pmatrix}
1\\
1\\
0
\end{pmatrix}.
$$

同様に
$$
\ell_2(w)
=
w_2+w_3
=
\left\langle
w,
\begin{pmatrix}
0\\
1\\
1
\end{pmatrix}
\right\rangle,
$$
なので
$$
r_2=
\begin{pmatrix}
0\\
1\\
1
\end{pmatrix}.
$$

よって最小解は
$$
S_\ell
=
\operatorname{span}
\left\{
\begin{pmatrix}
1\\
1\\
0
\end{pmatrix},
\begin{pmatrix}
0\\
1\\
1
\end{pmatrix}
\right\}
$$
に属します。

この平面に直交するベクトル $n=(n_1,n_2,n_3)$ は
$$
n_1+n_2=0,
\qquad
n_2+n_3=0
$$
を満たすので、例えば
$$
n=
\begin{pmatrix}
1\\
-1\\
1
\end{pmatrix}
$$
を取れます。

従って平面の方程式は
$$
w_1-w_2+w_3=0.
$$

つまり最適解は、観測 $\ell_1,\ell_2$ の Riesz 表現元が張る二次元平面へ必ず落ちます。RKHS の表現定理は、点評価の Riesz 表現元が核切片 $K_{x_i}$ である場合にちょうど対応します。
<!-- solution-end -->
