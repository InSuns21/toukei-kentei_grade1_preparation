# NPDE2 entropy solution・選択原理・$L^1$ 収縮性

NPDE1 では、Burgers 方程式の同じ Riemann 初期値

$$
u_0(x)
=
\begin{cases}
0,&x<0,\\
1,&x>0
\end{cases}
$$

に対して、

- Rankine--Hugoniot 条件を満たす跳躍解
- 特性が開く向きを連続に埋める中心希薄波

がどちらも分布的弱解になることを確認しました。

これは「弱解へ広げれば古典解の破綻後も続けられる」という成功と同時に、「弱解が多すぎて未来が一つに決まらない」という失敗でもあります。

本章の中心問いは、この非一意性をどう解消するかです。

~~~text
分布的弱解は保存される量の収支を守る
  ↓
しかし expansion shock まで許してしまう
  ↓
粘性を少し入れると、凸な量には一方向の散逸が生じる
  ↓
その散逸不等式を粘性0の極限にも残したい
  ↓
凸 entropy の散逸不等式
  ↓
Kruzhkov の全ての |u-k| を課す
  ↓
二つの解の差に対する比較不等式
  ↓
L1 収縮性
  ↓
同じ初期値なら一意
~~~

ここでいう **entropy solution（エントロピー解）** は、分布的弱解よりさらに弱い解ではありません。

$$
\boxed{
\text{分布的弱解の中から}
\quad
\text{追加不等式で適切な解を選ぶ}
}
$$

という選択原理です。

前提は [NPDE1 の保存則・Rankine--Hugoniot 条件・弱解非一意性](../NPDE1/index.md) と、[GPDE2 の平滑化核・局所 $L^1$ 近似](../GPDE2/index.md)です。後者は $L^1$ 収縮性の証明で二つの時空点を近づける際に使います。

---

## 1. 滑らかな解では「別の保存される量」を作れる

一次元スカラー保存則

$$
u_t+\partial_x f(u)=0
$$

を考えます。$u$ が滑らかなら

$$
u_t+f'(u)u_x=0
$$

です。

ここで滑らかな関数 $\eta:\mathbb R\to\mathbb R$ を選び、$\eta(u)$ の時間変化を計算すると

$$
\partial_t\eta(u)
=
\eta'(u)u_t.
$$

保存則から

$$
u_t=-f'(u)u_x
$$

なので

$$
\partial_t\eta(u)
=
-\eta'(u)f'(u)u_x.
$$

もし別の関数 $q$ を

$$
q'(z)=\eta'(z)f'(z)
$$

で選べば、

$$
\partial_xq(u)
=
q'(u)u_x
=
\eta'(u)f'(u)u_x.
$$

従って

$$
\partial_t\eta(u)+\partial_xq(u)=0.
$$

元の保存則から、別の保存則が一つ作れました。

この組を定義します。

<a id="def-npde2-entropy-pair"></a>
<!-- formal-statement-start -->
> **定義（entropy / entropy flux pair）**  
> $f\in C^1(\mathbb R)$ とする。$\eta\in C^2(\mathbb R)$ が凸、すなわち

$$
\eta''(z)\ge0
\qquad
(z\in\mathbb R)
$$

> を満たし、$q\in C^1(\mathbb R)$ が

$$
q'(z)=\eta'(z)f'(z)
$$

> を満たすとき、$(\eta,q)$ を保存則

$$
u_t+\partial_xf(u)=0
$$

> の **entropy / entropy flux pair** という。本章では $\eta$ を entropy、$q$ を entropy flux と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde2-entropy-pair -->
**定義の確認**

Burgers 流束

$$
f(u)=\frac{u^2}{2}
$$

に対して

$$
\eta(u)=\frac{u^2}{2}
$$

を選びます。

このとき

$$
\eta'(u)=u,
\qquad
f'(u)=u
$$

なので

$$
q'(u)=u^2.
$$

従って定数を0に選べば

$$
q(u)=\frac{u^3}{3}.
$$

確かに滑らかな Burgers 解では

$$
\partial_t\left(\frac{u^2}{2}\right)
+
\partial_x\left(\frac{u^3}{3}\right)
=
0
$$

です。
<!-- definition-example-end -->

$q$ には加法定数の自由があります。ただし $\partial_xq(u)$ では定数が消えるので、後で導入する散逸不等式の判定には影響しません。

重要なのは、まだ凸性を使っていないことです。滑らかな解では、$\eta$ が凸でなくても[RA3 の連鎖律](../RA3/index.md#prop-ra3-chain-rule)から等式が成り立ちます。

凸性が効くのは、衝撃波や粘性を考えたときです。

---

## 2. 小さな粘性は「等式」を「散逸不等式」へ変える

保存則へ小さな粘性 $\varepsilon>0$ を加えた

$$
u_t^\varepsilon
+
\partial_xf(u^\varepsilon)
=
\varepsilon u_{xx}^\varepsilon
$$

を考えます。

$u^\varepsilon$ が滑らかで、$(\eta,q)$ が entropy pair だとします。

左辺に $\eta'(u^\varepsilon)$ を掛けると

$$
\eta'(u^\varepsilon)u_t^\varepsilon
+
\eta'(u^\varepsilon)f'(u^\varepsilon)u_x^\varepsilon
=
\varepsilon\eta'(u^\varepsilon)u_{xx}^\varepsilon.
$$

左辺は

$$
\partial_t\eta(u^\varepsilon)
+
\partial_xq(u^\varepsilon).
$$

右辺では積の微分を使います。

$$
\partial_x
\left(
\eta'(u^\varepsilon)u_x^\varepsilon
\right)
=
\eta''(u^\varepsilon)|u_x^\varepsilon|^2
+
\eta'(u^\varepsilon)u_{xx}^\varepsilon.
$$

従って

$$
\eta'(u^\varepsilon)u_{xx}^\varepsilon
=
\partial_x
\left(
\eta'(u^\varepsilon)u_x^\varepsilon
\right)
-
\eta''(u^\varepsilon)|u_x^\varepsilon|^2.
$$

以上から

$$
\partial_t\eta(u^\varepsilon)
+
\partial_xq(u^\varepsilon)
=
\varepsilon
\partial_x
\left(
\eta'(u^\varepsilon)u_x^\varepsilon
\right)
-
\varepsilon
\eta''(u^\varepsilon)|u_x^\varepsilon|^2.
$$

$\eta$ は凸なので

$$
\eta''(u^\varepsilon)|u_x^\varepsilon|^2\ge0.
$$

よって最後の項は非正です。

さらに

$$
\partial_{xx}\eta(u^\varepsilon)
=
\eta''(u^\varepsilon)|u_x^\varepsilon|^2
+
\eta'(u^\varepsilon)u_{xx}^\varepsilon
$$

だから、元の式を

$$
\boxed{
\partial_t\eta(u^\varepsilon)
+
\partial_xq(u^\varepsilon)
\le
\varepsilon
\partial_{xx}\eta(u^\varepsilon)
}
$$

とも書けます。

ここに選択原理の向きが現れています。

粘性は凸な量を勝手に増やすのではなく、粘性0極限で

$$
\partial_t\eta(u)+\partial_xq(u)\le0
$$

という一方向の不等式を残します。

<a id="def-npde2-entropy-inequality"></a>
<!-- formal-statement-start -->
> **定義（entropy inequality）**  
> $f\in C^1(\mathbb R)$ とし、$(\eta,q)$ を entropy pair とする。局所有界な分布的弱解 $u$ が

$$
\partial_t\eta(u)+\partial_xq(u)\le0
$$

> を超関数の意味で満たすとは、任意の非負テスト関数

$$
\varphi\in C_c^\infty((0,T)\times\mathbb R),
\qquad
\varphi\ge0
$$

> に対して

$$
\iint
\left(
\eta(u)\varphi_t
+
q(u)\varphi_x
\right)
dx\,dt
\ge0
$$

> が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde2-entropy-inequality -->
**符号の確認**

超関数微分では

$$
\left\langle
\partial_t\eta(u)+\partial_xq(u),
\varphi
\right\rangle
=
-
\iint
\left(
\eta(u)\varphi_t+q(u)\varphi_x
\right)
dx\,dt.
$$

左辺が非正であることは

$$
-
\iint
\left(
\eta(u)\varphi_t+q(u)\varphi_x
\right)
dx\,dt
\le0
$$

と同値なので、定義の積分不等式は

$$
\iint
\left(
\eta(u)\varphi_t+q(u)\varphi_x
\right)
dx\,dt
\ge0
$$

となります。
<!-- definition-example-end -->

等式ではなく不等式なのは「情報を失ったから」ではありません。粘性が作る散逸の向きを、弱解の選択条件として保持しているからです。

---

## 3. 一本の跳躍では entropy inequality を数値で判定できる

NPDE1 と同じく、速度 $s$ で進む一本の跳躍

$$
u(t,x)
=
\begin{cases}
u_L,&x<st,\\
u_R,&x>st
\end{cases}
$$

を考えます。

記号を短くするため

$$
[g]
=
g(u_R)-g(u_L)
$$

と置きます。

NPDE1 で、保存則の弱形式が成り立つ条件は

$$
[f]-s[u]=0
$$

でした。

同じ移動界面計算を $\eta(u)$ と $q(u)$ に対して行うと、

$$
\partial_t\eta(u)+\partial_xq(u)
=
\left(
[q]-s[\eta]
\right)
\delta_{x=st}
$$

となります。

したがって entropy inequality は

$$
[q]-s[\eta]\le0
$$

です。

<a id="prop-npde2-shock-entropy-jump"></a>
<!-- formal-statement-start -->
> **命題（跳躍に対する entropy 条件）**  
> $f\in C^1(\mathbb R)$ とし、定数状態 $u_L\ne u_R$ を速度

$$
s=
\frac{f(u_R)-f(u_L)}{u_R-u_L}
$$

> で結ぶ Rankine--Hugoniot 跳躍を考える。entropy pair $(\eta,q)$ に対して、この跳躍が entropy inequality を満たすための必要十分条件は

$$
\boxed{
q(u_R)-q(u_L)
-
s\{\eta(u_R)-\eta(u_L)\}
\le0
}
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

$\eta(u)$ と $q(u)$ は界面の左右で定数です。従って超関数微分は界面の Dirac 項だけを持ちます。その係数が非正であることが entropy inequality そのものです。

<!-- proof-start -->
### 証明

$H$ を Heaviside 関数として

$$
u(t,x)
=
u_L+(u_R-u_L)H(x-st)
$$

と書きます。

合成後も

$$
\eta(u)
=
\eta(u_L)
+
[\eta]H(x-st),
$$

$$
q(u)
=
q(u_L)
+
[q]H(x-st).
$$

GPDE2 の Heaviside の超関数微分を時空変数へ適用すると

$$
\partial_tH(x-st)
=
-s\delta_{x=st},
$$

$$
\partial_xH(x-st)
=
\delta_{x=st}.
$$

従って

$$
\partial_t\eta(u)
=
-s[\eta]\delta_{x=st},
$$

$$
\partial_xq(u)
=
[q]\delta_{x=st}.
$$

足せば

$$
\partial_t\eta(u)+\partial_xq(u)
=
([q]-s[\eta])\delta_{x=st}.
$$

$\delta_{x=st}$ は非負テスト関数へ非負値を返すので、この超関数が非正であることは係数が非正であることと同値です。

よって

$$
[q]-s[\eta]\le0
$$

が必要十分です。
<!-- proof-end -->

### Burgers の圧縮 shock と expansion shock

Burgers で

$$
\eta(u)=\frac{u^2}{2},
\qquad
q(u)=\frac{u^3}{3}
$$

を使います。

まず

$$
u_L=1,
\qquad
u_R=0
$$

なら

$$
s=\frac12.
$$

このとき

$$
[q]
=
0-\frac13
=
-\frac13,
$$

$$
[\eta]
=
0-\frac12
=
-\frac12.
$$

従って

$$
[q]-s[\eta]
=
-\frac13
-
\frac12\left(-\frac12\right)
=
-\frac13+\frac14
=
-\frac1{12}
<0.
$$

圧縮 shock はこの entropy inequality を満たします。

一方、NPDE1 の非一意性を生んだ

$$
u_L=0,
\qquad
u_R=1
$$

では、同じ $s=1/2$ に対して

$$
[q]-s[\eta]
=
\frac13-\frac14
=
\frac1{12}
>0.
$$

従って expansion shock は entropy inequality を破ります。

一つの凸 entropy だけでも、NPDE1 の偽物を排除できました。

ただし一般の初期値問題で一意性まで得るには、もっと組織的な entropy の族が必要です。

---

## 4. 凸流束では Lax 条件と chord 条件が「圧縮」を表す

$f\in C^2(\mathbb R)$ が狭義凸

$$
f''>0
$$

だとします。

$u_L>u_R$ を結ぶ Rankine--Hugoniot 速度は

$$
s
=
\frac{f(u_L)-f(u_R)}{u_L-u_R}.
$$

平均値の定理により、ある

$$
\xi\in(u_R,u_L)
$$

が存在して

$$
s=f'(\xi)
$$

です。

$f''>0$ なので $f'$ は狭義単調増加です。従って

$$
f'(u_R)<f'(\xi)<f'(u_L).
$$

すなわち

$$
\boxed{
f'(u_R)<s<f'(u_L)
}
$$

です。

左側の特性は shock より速く、右側の特性は shock より遅いので、両側の特性が shock へ流れ込みます。

<a id="prop-npde2-lax-condition"></a>
<!-- formal-statement-start -->
> **命題（狭義凸流束の Lax 圧縮条件）**  
> $f\in C^2(\mathbb R)$、$f''>0$ とし、$u_L>u_R$ とする。Rankine--Hugoniot 速度

$$
s=
\frac{f(u_L)-f(u_R)}{u_L-u_R}
$$

> は

$$
\boxed{
f'(u_L)>s>f'(u_R)
}
$$

> を満たす。
<!-- formal-statement-end -->

この条件は局所的には「左右の特性が shock へ入る」ことを表します。

もう一つ、流束のグラフで同じことを見ます。

$u_R<k<u_L$ とし、両端を結ぶ chord を

$$
\ell(k)
=
f(u_R)+s(k-u_R)
$$

と置きます。

凸性からグラフは chord の下にあるので

$$
\boxed{
f(k)\le\ell(k)
}
$$

です。

この chord 条件は Oleinik 型の選択条件を Riemann shock に限定して見たものです。

ここでは Lax 条件と Oleinik 型条件を、一般の系に対する別理論として展開するのではなく、

- Lax 条件：特性速度から圧縮を見る
- chord 条件：流束グラフから entropy 散逸を見る

という位置付けで使います。

---

## 5. Kruzhkov は全ての基準値 $k$ と比較する

一つの凸 entropy だけでは、全ての弱解を区別できる保証はありません。

Kruzhkov の考え方は、任意の実数 $k$ に対して

$$
|u-k|
$$

を使うことです。

まず符号関数を

$$
\operatorname{sgn}(z)
=
\begin{cases}
1,&z>0,\\
0,&z=0,\\
-1,&z<0
\end{cases}
$$

とします。

<a id="def-npde2-kruzhkov-pair"></a>
<!-- formal-statement-start -->
> **定義（Kruzhkov entropy pair）**  
> $f\in C^1(\mathbb R)$ とし、各 $k\in\mathbb R$ に対して

$$
\eta_k(u)=|u-k|,
$$

$$
q_k(u)
=
\operatorname{sgn}(u-k)\{f(u)-f(k)\}
$$

> と定める。$(\eta_k,q_k)$ を **Kruzhkov entropy pair** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde2-kruzhkov-pair -->
**定義の確認**

Burgers 流束

$$
f(u)=\frac{u^2}{2}
$$

で $k=1$ とします。

$u>1$ なら

$$
q_1(u)
=
\frac{u^2-1}{2}.
$$

$u<1$ なら

$$
q_1(u)
=
-\frac{u^2-1}{2}
=
\frac{1-u^2}{2}.
$$

どちらの場合も

$$
q_1(u)
=
\operatorname{sgn}(u-1)
\frac{u^2-1}{2}
$$

です。

$u=1$ では $q_1(1)=0$ です。
<!-- definition-example-end -->

$\eta_k$ は $u=k$ で $C^2$ ではありません。ただし滑らかな凸近似を取れるため、前節までの entropy pair の極限として扱えます。

本章で単に entropy solution と書くときは、次に定義する選択解を指します。

<a id="def-npde2-kruzhkov-solution"></a>
<!-- formal-statement-start -->
> **定義（Kruzhkov entropy solution）**  
> $T>0$、$f\in C^1(\mathbb R)$、$u_0\in L^\infty(\mathbb R)$ とする。関数

$$
u\in L^\infty((0,T)\times\mathbb R)
$$

> が初期値 $u_0$ を持つ [NPDE1 の分布的弱解](../NPDE1/index.md#def-npde1-weak-solution)であり、さらに任意の $k\in\mathbb R$ と任意の非負

$$
\varphi\in C_c^\infty([0,T)\times\mathbb R)
$$

> に対して

$$
\boxed{
\iint
\left[
|u-k|\varphi_t
+
\operatorname{sgn}(u-k)
\{f(u)-f(k)\}\varphi_x
\right]
dx\,dt
+
\int_{\mathbb R}
|u_0-k|\varphi(0,x)\,dx
\ge0
}
$$

> を満たすとき、$u$ を初期値 $u_0$ に対する **Kruzhkov entropy solution** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde2-kruzhkov-solution -->
**追加条件であることの確認**

定義の最初に「分布的弱解である」と要求しています。

したがって

$$
\text{entropy solution}
\subset
\text{distributional weak solution}
$$

です。

NPDE1 で許した弱解をさらに増やすのではなく、全ての $k$ に対する不等式で候補を削っています。
<!-- definition-example-end -->

---

## 6. Kruzhkov 条件は凸 Riemann 問題で shock と rarefaction を正しく選ぶ

狭義凸流束を考えます。

### 圧縮側 $u_L>u_R$

Rankine--Hugoniot shock を考えます。

$k$ が区間 $[u_R,u_L]$ の外にあるとき、$\operatorname{sgn}(u-k)$ は左右で変わりません。この場合 Kruzhkov entropy は元の保存則の定数倍になり、跳躍係数は [NPDE1 の Rankine--Hugoniot 条件](../NPDE1/index.md#thm-npde1-rankine-hugoniot)により0です。

本質は

$$
u_R<k<u_L
$$

です。

このとき

$$
\eta_k(u_L)=u_L-k,
\qquad
\eta_k(u_R)=k-u_R.
$$

従って

$$
[\eta_k]
=
2k-u_L-u_R.
$$

entropy flux は

$$
q_k(u_L)=f(u_L)-f(k),
$$

$$
q_k(u_R)=f(k)-f(u_R).
$$

よって

$$
[q_k]
=
2f(k)-f(u_L)-f(u_R).
$$

したがって

$$
[q_k]-s[\eta_k]
=
2f(k)-f(u_L)-f(u_R)
-
s(2k-u_L-u_R).
$$

ここで

$$
\ell(k)=f(u_R)+s(k-u_R)
$$

と置くと、Rankine--Hugoniot 関係から

$$
f(u_L)=f(u_R)+s(u_L-u_R)
$$

なので

$$
f(u_L)+f(u_R)+s(2k-u_L-u_R)
=
2\ell(k).
$$

よって

$$
[q_k]-s[\eta_k]
=
2\{f(k)-\ell(k)\}.
$$

凸性から

$$
f(k)\le\ell(k)
$$

だから

$$
[q_k]-s[\eta_k]\le0.
$$

従って圧縮 shock は全ての Kruzhkov 条件を満たします。

### 拡張側 $u_L<u_R$

今度は同じ Rankine--Hugoniot 条件だけで二状態を直接つないだ expansion shock を考えます。

$u_L<k<u_R$ では同じ計算の符号が反転して

$$
[q_k]-s[\eta_k]
=
2\{\ell(k)-f(k)\}.
$$

狭義凸性なら内部点で

$$
f(k)<\ell(k)
$$

なので

$$
[q_k]-s[\eta_k]>0.
$$

従って expansion shock は Kruzhkov entropy solution ではありません。

一方、NPDE1 の中心希薄波は $t>0$ で連続です。ファン内部と外部では古典解なので各滑らかな凸 entropy について等式を満たし、ファン境界でも $u$ と $q_k(u)$ が連続なので Dirac 項は生じません。従って Kruzhkov inequality を満たします。

<a id="thm-npde2-convex-riemann-selection"></a>
<!-- formal-statement-start -->
> **定理（狭義凸流束の Riemann entropy 選択）**  
> $f\in C^2(\mathbb R)$、$f''>0$ とし、

$$
u_0(x)
=
\begin{cases}
u_L,&x<0,\\
u_R,&x>0
\end{cases}
$$

> を初期値とする。
>
> 1. $u_L>u_R$ なら、Rankine--Hugoniot 速度

$$
s=
\frac{f(u_L)-f(u_R)}{u_L-u_R}
$$

> で進む圧縮 shock は Kruzhkov entropy solution である。
> 2. $u_L<u_R$ なら、NPDE1 で構成した中心希薄波は Kruzhkov entropy solution である。
> 3. $u_L<u_R$ を直接つなぐ Rankine--Hugoniot expansion shock は Kruzhkov entropy solution ではない。
<!-- formal-statement-end -->

### 証明の見取り図

shock では entropy inequality が一本の界面係数

$$
[q_k]-s[\eta_k]
$$

の符号へ落ちます。その符号は、凸な $f$ のグラフと両端を結ぶ chord の上下関係そのものです。

希薄波は連続で、滑らかな部分では entropy 等式を満たします。境界に値の跳躍がないため、余分な Dirac 項も出ません。

<!-- proof-start -->
### 証明

**1. $u_L>u_R$。**

$k\notin(u_R,u_L)$ では左右で $\operatorname{sgn}(u-k)$ が同じなので、Kruzhkov jump coefficient は Rankine--Hugoniot 条件の定数倍となり0です。

$u_R<k<u_L$ では上で計算した通り

$$
[q_k]-s[\eta_k]
=
2\{f(k)-\ell(k)\}.
$$

$f$ は凸なので、$u_R$ と $u_L$ を結ぶ chord の内部で

$$
f(k)\le\ell(k).
$$

従って

$$
[q_k]-s[\eta_k]\le0.
$$

全ての $k$ で entropy inequality を満たすので、圧縮 shock は Kruzhkov entropy solution です。

**2. $u_L<u_R$。**

NPDE1 の中心希薄波を $u(t,x)=U(x/t)$ とします。

ファン内部では古典解なので、$u\ne k$ の点では

$$
\partial_t|u-k|
+
\partial_x
\left[
\operatorname{sgn}(u-k)
\{f(u)-f(k)\}
\right]
=
0.
$$

$u=k$ を横切る位置でも $|u-k|$ と $q_k(u)$ は連続です。またファン両端でも $u$ 自身が連続です。

従って区分的に部分積分したとき、内部境界から jump measure は残りません。よって entropy inequality は実際には等式として成り立ちます。

NPDE1 で初期値への局所 $L^1$ 収束も確認済みなので、中心希薄波は Kruzhkov entropy solution です。

**3. $u_L<u_R$ の expansion shock。**

$u_L<k<u_R$ を一つ取ります。

この場合

$$
[q_k]-s[\eta_k]
=
2\{\ell(k)-f(k)\}.
$$

$f''>0$ なので内部点では厳密に

$$
f(k)<\ell(k).
$$

従って

$$
[q_k]-s[\eta_k]>0.
$$

これは跳躍に対する entropy 条件

$$
[q_k]-s[\eta_k]\le0
$$

に反します。

よって expansion shock は Kruzhkov entropy solution ではありません。
<!-- proof-end -->

NPDE1 で残った二つの候補のうち、entropy 条件は希薄波だけを残しました。

しかし「Riemann 問題で正しく見える」だけでは、一意性の証明には足りません。

次に、任意の二つの entropy solution を直接比較します。

---

## 7. 二つの解を比較するために、基準値 $k$ を「もう一つの解」にする

Kruzhkov inequality は各 **定数** $k$ に対して成り立ちます。

一意性を示したいなら、二つの解

$$
u=u(t,x),
\qquad
v=v(s,y)
$$

を比較して

$$
|u-v|
$$

を制御したくなります。

ここでいきなり

$$
k=v(t,x)
$$

と代入してはいけません。

Kruzhkov inequality は「固定された定数 $k$」について証明されているので、空間・時間で動く $v$ をそのまま代入するのは論理の飛躍です。

そこで変数を二組に増やします。

- $u$ の変数：$(t,x)$
- $v$ の変数：$(s,y)$

$v(s,y)$ を固定すれば、$(t,x)$ から見れば一つの定数です。

逆に $u(t,x)$ を固定すれば、$(s,y)$ から見れば一つの定数です。

この二つの不等式を足し、最後に

$$
(t,x)\approx(s,y)
$$

へ平滑化核で近づけます。

これが **doubling of variables** の核心です。

<a id="lem-npde2-kato-inequality"></a>
<!-- formal-statement-start -->
> **補題（Kato 型不等式）**  
> $f\in C^1(\mathbb R)$ とし、$u,v\in L^\infty((0,T)\times\mathbb R)$ をそれぞれ Kruzhkov entropy solution とする。すると超関数の意味で

$$
\boxed{
\partial_t|u-v|
+
\partial_x
\left[
\operatorname{sgn}(u-v)
\{f(u)-f(v)\}
\right]
\le0
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

1. $u$ の entropy inequality で $k=v(s,y)$ とする。
2. $v$ の entropy inequality で $k=u(t,x)$ とする。
3. $(t,x)$ と $(s,y)$ を近づける対称な平滑化核をテスト関数へ入れる。
4. 二つの不等式を足すと、差変数にかかる微分項が打ち消し合う。
5. GPDE2 の局所 $L^1$ 近似を使って、二点 $(t,x),(s,y)$ を同一点へ潰す。

<!-- proof-start -->
### 証明

非負関数

$$
\psi\in C_c^\infty((0,T)\times\mathbb R)
$$

を固定します。

GPDE2 の平滑化核から、一変数の非負な対称平滑化核 $\rho_\delta$ を取り、

$$
\int_{\mathbb R}\rho_\delta(r)\,dr=1
$$

とします。

四変数テスト関数を

$$
\Phi_\delta(t,x,s,y)
=
\psi\left(
\frac{t+s}{2},
\frac{x+y}{2}
\right)
\rho_\delta(t-s)
\rho_\delta(x-y)
$$

と置きます。

$\Phi_\delta\ge0$ です。

**第1段階：$u$ の不等式。**

$(s,y)$ を固定します。このとき

$$
k=v(s,y)
$$

は $(t,x)$ に関して定数です。

従って $u$ の Kruzhkov inequality を $\Phi_\delta$ に適用できます。その後 $(s,y)$ について積分します。

**第2段階：$v$ の不等式。**

今度は $(t,x)$ を固定し、

$$
k=u(t,x)
$$

として $v$ の Kruzhkov inequality を使い、$(t,x)$ について積分します。

**第3段階：二式を足す。**

二つの entropy 値はどちらも

$$
|u(t,x)-v(s,y)|.
$$

また flux 項も

$$
\operatorname{sgn}(u-v)\{f(u)-f(v)\}
$$

で一致します。実際、

$$
\operatorname{sgn}(v-u)\{f(v)-f(u)\}
=
\operatorname{sgn}(u-v)\{f(u)-f(v)\}.
$$

$\Phi_\delta$ の微分では

$$
\partial_t\rho_\delta(t-s)
+
\partial_s\rho_\delta(t-s)
=
0,
$$

$$
\partial_x\rho_\delta(x-y)
+
\partial_y\rho_\delta(x-y)
=
0.
$$

したがって二つの不等式を足すと、差変数 $t-s$、$x-y$ を微分する項は打ち消し合います。

残るのは平均変数に作用する $\psi_t,\psi_x$ の項です。整理すると

$$
\int\!\!\int\!\!\int\!\!\int
|u(t,x)-v(s,y)|
\psi_t\left(
\frac{t+s}{2},
\frac{x+y}{2}
\right)
\rho_\delta(t-s)\rho_\delta(x-y)
\,dt\,dx\,ds\,dy
$$

と

$$
\int\!\!\int\!\!\int\!\!\int
\operatorname{sgn}(u-v)
\{f(u)-f(v)\}
\psi_x\left(
\frac{t+s}{2},
\frac{x+y}{2}
\right)
\rho_\delta(t-s)\rho_\delta(x-y)
\,dt\,dx\,ds\,dy
$$

の和が非負になります。

**第4段階：$\delta\downarrow0$。**

$u,v$ は局所有界なので、共通の値域を含む区間上で $f$ は Lipschitz です。

[GPDE2 の平滑化核の局所 $L^1$ 近似](../GPDE2/index.md#thm-gpde2-mollifier-l1loc)と、[多次元の平行移動補題](../GPDE2/index.md#lem-gpde2-l1-translation-rd)により、

$$
u(t,x)-v(s,y)
$$

を $\rho_\delta(t-s)\rho_\delta(x-y)$ で平均した式は、$\delta\downarrow0$ で同一点の

$$
u(t,x)-v(t,x)
$$

へ局所 $L^1$ の意味で収束します。

$f$ の局所 Lipschitz 性から flux 差も同様に収束します。

従って極限を取ると

$$
\iint
\left[
|u-v|\psi_t
+
\operatorname{sgn}(u-v)
\{f(u)-f(v)\}\psi_x
\right]
dx\,dt
\ge0.
$$

これは

$$
\partial_t|u-v|
+
\partial_x
\left[
\operatorname{sgn}(u-v)
\{f(u)-f(v)\}
\right]
\le0
$$

の超関数表示です。
<!-- proof-end -->

この補題が一意性の心臓部です。

一つの解の entropy inequality を眺めるだけではなく、**二つの解の距離そのものが増えない構造**へ変換しました。

---

## 8. Kato 型不等式から有限伝播と $L^1$ 収縮性を得る

$u,v$ の絶対値がある $M>0$ で抑えられているとします。

$f'\,$ はコンパクト区間 $[-M,M]$ 上で連続なので

$$
L
=
\max_{|z|\le M}|f'(z)|
$$

は有限です。

平均値の定理から

$$
|f(u)-f(v)|
\le
L|u-v|.
$$

したがって Kato flux

$$
Q(u,v)
=
\operatorname{sgn}(u-v)\{f(u)-f(v)\}
$$

は

$$
|Q(u,v)|
\le
L|u-v|
$$

を満たします。

この $L$ は、差の情報が伝わる最大速度の上界として働きます。

<a id="thm-npde2-l1-contraction"></a>
<!-- formal-statement-start -->
> **定理（Kruzhkov の局所 L1 評価と L1 収縮性）**  
> $f\in C^1(\mathbb R)$ とし、$u,v$ を初期値 $u_0,v_0\in L^\infty(\mathbb R)$ に対する Kruzhkov entropy solution とする。ある $M>0$ について

$$
|u|,|v|\le M
$$

> がほとんど至る所で成り立つとし、

$$
L=
\max_{|z|\le M}|f'(z)|
$$

> と置く。このとき任意の有限区間 $[a,b]$ と、ほとんど全ての $t\in(0,T)$ に対して

$$
\boxed{
\int_a^b
|u(t,x)-v(t,x)|\,dx
\le
\int_{a-Lt}^{b+Lt}
|u_0(x)-v_0(x)|\,dx
}
$$

> が成り立つ。
>
> 特に

$$
u_0-v_0\in L^1(\mathbb R)
$$

> なら

$$
\boxed{
\|u(t,\cdot)-v(t,\cdot)\|_{L^1(\mathbb R)}
\le
\|u_0-v_0\|_{L^1(\mathbb R)}
}
$$

> がほとんど全ての $t$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

Kato 型不等式は

$$
\partial_t w+\partial_xQ\le0,
\qquad
w=|u-v|
$$

です。

しかも

$$
|Q|\le Lw.
$$

時刻 $t$ の区間 $[a,b]$ に届き得る情報は、最大速度 $L$ を逆向きにたどると初期時刻の

$$
[a-Lt,b+Lt]
$$

の中にしかありません。

この後退時空領域を近似するテスト関数を Kato inequality に入れます。

<!-- proof-start -->
### 証明

$$
w=|u-v|,
$$

$$
Q=
\operatorname{sgn}(u-v)\{f(u)-f(v)\}
$$

と置きます。

Kato 型不等式は

$$
\partial_tw+\partial_xQ\le0.
$$

また平均値の定理から

$$
|Q|\le Lw.
$$

時刻 $\tau\in(0,T)$ を固定します。

後退する区間

$$
I_t
=
[a-L(\tau-t),\,b+L(\tau-t)]
\qquad
(0\le t\le\tau)
$$

を考えます。

$t=\tau$ では

$$
I_\tau=[a,b],
$$

$t=0$ では

$$
I_0=[a-L\tau,b+L\tau].
$$

$I_t$ の指示関数を、空間端と時刻 $\tau$ で滑らかに近似した非負テスト関数 $\varphi$ を Kato inequality に入れます。

右端

$$
x=b+L(\tau-t)
$$

は速度 $-L$ で動きます。そこで生じる境界寄与は極限で

$$
Lw-Q.
$$

$|Q|\le Lw$ なので

$$
Lw-Q\ge0.
$$

左端

$$
x=a-L(\tau-t)
$$

は速度 $L$ で動き、境界寄与は

$$
Lw+Q.
$$

同様に

$$
Lw+Q\ge0.
$$

従って側面から負の寄与は入りません。

時間上端 $\tau$ と初期時刻0の寄与を残すと

$$
\int_a^b w(\tau,x)\,dx
\le
\int_{a-L\tau}^{b+L\tau}w(0,x)\,dx.
$$

初期トレースより

$$
w(0,x)=|u_0(x)-v_0(x)|
$$

なので

$$
\int_a^b
|u(\tau,x)-v(\tau,x)|\,dx
\le
\int_{a-L\tau}^{b+L\tau}
|u_0(x)-v_0(x)|\,dx.
$$

これが局所評価です。

さらに $u_0-v_0\in L^1(\mathbb R)$ とします。

$a=-R$、$b=R$ として $R\to\infty$ とすると、左辺は単調収束により

$$
\|u(\tau,\cdot)-v(\tau,\cdot)\|_{L^1}
$$

へ、右辺は

$$
\|u_0-v_0\|_{L^1}
$$

へ収束します。

従って

$$
\|u(\tau)-v(\tau)\|_{L^1}
\le
\|u_0-v_0\|_{L^1}.
$$

entropy solution は同値な時間代表を取り直すことで標準的には $L^1_{\mathrm{loc}}$ 連続な時間発展として扱えますが、本定理ではその追加事項を使わず、ほとんど全ての時刻での主張に留めています。
<!-- proof-end -->

<a id="cor-npde2-uniqueness"></a>
<!-- formal-statement-start -->
> **系（Kruzhkov entropy solution の一意性）**  
> 上の定理の仮定の下で、二つの Kruzhkov entropy solution $u,v$ が同じ初期値

$$
u_0=v_0
$$

> を持つなら

$$
u=v
$$

> が $(0,T)\times\mathbb R$ のほとんど至る所で成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の有限区間 $[a,b]$ に対し、局所 $L^1$ 評価の右辺は

$$
\int_{a-Lt}^{b+Lt}
|u_0-v_0|\,dx
=
0.
$$

従って

$$
\int_a^b|u(t,x)-v(t,x)|\,dx=0
$$

です。

有限区間は任意なので

$$
u(t,x)=v(t,x)
$$

がほとんど至る所で成り立ちます。
<!-- proof-end -->

これで NPDE1 の非一意性は解消されました。

しかも一意性だけではありません。

$$
\boxed{
\text{初期値を少し変えたとき、解も }L^1\text{ でそれ以上には離れない}
}
$$

という安定性まで得ています。

---

## 9. vanishing viscosity は entropy solution を選ぶ

entropy inequality の導入は粘性方程式から始まりました。

最後に、その接続を定理として閉じます。

<a id="prop-npde2-vanishing-viscosity"></a>
<!-- formal-statement-start -->
> **命題（vanishing viscosity 極限の entropy 選択）**  
> $f\in C^2(\mathbb R)$ とする。各 $\varepsilon>0$ に対して滑らかな関数 $u^\varepsilon$ が

$$
u_t^\varepsilon
+
\partial_xf(u^\varepsilon)
=
\varepsilon u_{xx}^\varepsilon
$$

> を満たすとする。
>
> さらに、ある $M>0$ が存在して

$$
\|u^\varepsilon\|_{L^\infty((0,T)\times\mathbb R)}
\le M
$$

> が一様に成り立ち、

$$
u^\varepsilon\to u
$$

> が $L^1_{\mathrm{loc}}((0,T)\times\mathbb R)$ で成り立つとする。初期値も必要な局所 $L^1$ 収束を満たすとする。
>
> このとき極限 $u$ は全ての Kruzhkov entropy inequality を満たす。従って $u$ が分布的弱解と初期トレースを持てば、Kruzhkov entropy solution である。
<!-- formal-statement-end -->

### 証明の見取り図

滑らかな凸 entropy $\eta$ について

$$
\partial_t\eta(u^\varepsilon)
+
\partial_xq(u^\varepsilon)
\le
\varepsilon\partial_{xx}\eta(u^\varepsilon)
$$

を既に導きました。

非負テスト関数で積分すると、右辺は $\varepsilon$ 倍なので0へ消えます。

最後に $|z-k|$ を滑らかで凸な関数で近似します。

<!-- proof-start -->
### 証明

まず $\eta\in C^2(\mathbb R)$ を凸とし、対応する entropy flux $q$ を取ります。

第2節で

$$
\partial_t\eta(u^\varepsilon)
+
\partial_xq(u^\varepsilon)
\le
\varepsilon
\partial_{xx}\eta(u^\varepsilon)
$$

を得ました。

非負

$$
\varphi\in C_c^\infty([0,T)\times\mathbb R)
$$

を掛けて部分積分すると

$$
\iint
\left[
\eta(u^\varepsilon)\varphi_t
+
q(u^\varepsilon)\varphi_x
\right]
dx\,dt
+
\int
\eta(u_0^\varepsilon)\varphi(0,x)\,dx
\ge
-\varepsilon
\iint
\eta(u^\varepsilon)\varphi_{xx}
\,dx\,dt.
$$

$u^\varepsilon$ は $[-M,M]$ に入るので、$\eta(u^\varepsilon)$ はテスト関数の台上で一様有界です。

従って右辺の絶対値は

$$
\varepsilon C_\varphi
$$

で抑えられ、$\varepsilon\downarrow0$ で0へ収束します。

一方、

$$
u^\varepsilon\to u
\qquad
L^1_{\mathrm{loc}}
$$

かつ値域が一様有界なので、$\eta$ と $q$ の $[-M,M]$ 上の Lipschitz 性から

$$
\eta(u^\varepsilon)\to\eta(u),
$$

$$
q(u^\varepsilon)\to q(u)
$$

も局所 $L^1$ で成り立ちます。

従って極限で

$$
\iint
\left[
\eta(u)\varphi_t
+
q(u)\varphi_x
\right]
dx\,dt
+
\int
\eta(u_0)\varphi(0,x)\,dx
\ge0.
$$

最後に固定した $k\in\mathbb R$ に対し、例えば

$$
\eta_{k,\delta}(z)
=
\sqrt{(z-k)^2+\delta^2}
$$

を使います。

これは滑らかで凸であり、

$$
\eta_{k,\delta}(z)
\longrightarrow
|z-k|
$$

です。

導関数も $z\ne k$ で

$$
\eta_{k,\delta}'(z)
\longrightarrow
\operatorname{sgn}(z-k)
$$

なので、対応する flux を定数 $q_{k,\delta}(k)=0$ で規格化すれば

$$
q_{k,\delta}(z)
\longrightarrow
\operatorname{sgn}(z-k)\{f(z)-f(k)\}
$$

となります。

値域は有界なので支配収束を使って $\delta\downarrow0$ とすれば、Kruzhkov entropy inequality を得ます。
<!-- proof-end -->

ここで証明したのは、

$$
\boxed{
\text{粘性近似が強く収束するなら、その極限は entropy solution}
}
$$

です。

「粘性解族から収束部分列が必ず取れるか」という compactness の存在論は別の問題です。本章では選択原理と一意性の機構に焦点を当て、その compactness を暗黙に仮定しません。

---

## 10. 何が解決したか

NPDE1 では

$$
\text{古典解}
\longrightarrow
\text{分布的弱解}
$$

と広げることで衝撃波を扱えました。

しかし弱解は多すぎました。

NPDE2 では

$$
\text{分布的弱解}
\longrightarrow
\text{Kruzhkov entropy solution}
$$

と **絞り込む** ことで、次の三つを得ました。

1. expansion shock を排除できる。
2. 狭義凸 Riemann 問題で圧縮 shock / 希薄波を正しく選べる。
3. $L^1$ 収縮性から一意性と初期値安定性が得られる。

特に重要なのは

$$
\boxed{
\text{選択条件}
\quad\Longrightarrow\quad
\text{距離の収縮}
\quad\Longrightarrow\quad
\text{一意性}
}
$$

という流れです。

これは「物理的にそれらしい条件を足したら一意になった」という経験則ではありません。

全ての $|u-k|$ に対する不等式を、doubling of variables で二解比較へ持ち上げることが数学的な核心です。

---

## 11. 演習

### Level A

<a id="ex-npde2-a01"></a>
#### NPDE2-A01 Burgers の二次 entropy flux
- Level: A

Burgers 流束

$$
f(u)=\frac{u^2}{2}
$$

と entropy

$$
\eta(u)=\frac{u^2}{2}
$$

を考える。

1. $q'(u)=\eta'(u)f'(u)$ を計算せよ。
2. $q(0)=0$ として $q$ を求めよ。
3. 滑らかな解で $\partial_t\eta(u)+\partial_xq(u)=0$ を直接確認せよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
\eta'(u)=u,
\qquad
f'(u)=u.
$$

従って

$$
q'(u)
=
\eta'(u)f'(u)
=
u^2.
$$

$q(0)=0$ なので

$$
q(u)
=
\int_0^u z^2\,dz
=
\frac{u^3}{3}.
$$

よって

$$
\boxed{
q(u)=\frac{u^3}{3}
}.
$$

次に滑らかな Burgers 解では

$$
u_t+uu_x=0.
$$

したがって

$$
\partial_t\eta(u)
=
uu_t,
$$

$$
\partial_xq(u)
=
u^2u_x.
$$

足すと

$$
\partial_t\eta(u)+\partial_xq(u)
=
u(u_t+uu_x)
=
0.
$$
<!-- solution-end -->

<a id="ex-npde2-a02"></a>
#### NPDE2-A02 圧縮 shock の entropy production
- Level: A

Burgers 方程式で

$$
u_L=2,
\qquad
u_R=0
$$

を結ぶ shock を考える。

1. Rankine--Hugoniot 速度 $s$ を求めよ。
2. $\eta(u)=u^2/2$、$q(u)=u^3/3$ に対して $[q]-s[\eta]$ を計算せよ。
3. entropy inequality を満たすか判定せよ。

<!-- solution-start -->
#### 詳細解答

Burgers の shock 速度は

$$
s
=
\frac{u_L+u_R}{2}
=
1.
$$

次に

$$
[q]
=
q(0)-q(2)
=
0-\frac83
=
-\frac83.
$$

また

$$
[\eta]
=
\eta(0)-\eta(2)
=
0-2
=
-2.
$$

従って

$$
[q]-s[\eta]
=
-\frac83
-
1(-2)
=
-\frac83+\frac63
=
-\frac23.
$$

よって

$$
[q]-s[\eta]
=
-\frac23<0.
$$

したがって entropy inequality を満たします。
<!-- solution-end -->

<a id="ex-npde2-a03"></a>
#### NPDE2-A03 expansion shock を一つの entropy で排除する
- Level: A

Burgers 方程式で

$$
u_L=0,
\qquad
u_R=2
$$

を Rankine--Hugoniot shock で直接つなぐ。

1. 速度 $s$ を求めよ。
2. $\eta(u)=u^2/2$、$q(u)=u^3/3$ に対して $[q]-s[\eta]$ を計算せよ。
3. この弱解が entropy solution になれない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

速度は

$$
s
=
\frac{0+2}{2}
=
1.
$$

次に

$$
[q]
=
\frac83-0
=
\frac83,
$$

$$
[\eta]
=
2-0
=
2.
$$

従って

$$
[q]-s[\eta]
=
\frac83-2
=
\frac23
>0.
$$

entropy inequality では

$$
[q]-s[\eta]\le0
$$

が必要なので、この expansion shock は条件を破ります。

したがって分布的弱解ではありますが、entropy solution ではありません。
<!-- solution-end -->

<a id="ex-npde2-a04"></a>
#### NPDE2-A04 Kruzhkov entropy flux を具体化する
- Level: A

Burgers 流束 $f(u)=u^2/2$ で $k=2$ とする。

1. $\eta_2(u)$ を書け。
2. $q_2(u)$ を $u>2$、$u<2$ に分けて書け。
3. $u=3$ と $u=1$ で値を計算せよ。

<!-- solution-start -->
#### 詳細解答

entropy は

$$
\eta_2(u)=|u-2|.
$$

flux は

$$
q_2(u)
=
\operatorname{sgn}(u-2)
\left(
\frac{u^2}{2}-2
\right).
$$

$u>2$ では符号は正なので

$$
q_2(u)
=
\frac{u^2}{2}-2.
$$

$u<2$ では符号は負なので

$$
q_2(u)
=
2-\frac{u^2}{2}.
$$

$u=3$ では

$$
\eta_2(3)=1,
$$

$$
q_2(3)
=
\frac92-2
=
\frac52.
$$

$u=1$ では

$$
\eta_2(1)=1,
$$

$$
q_2(1)
=
2-\frac12
=
\frac32.
$$
<!-- solution-end -->

<a id="ex-npde2-a05"></a>
#### NPDE2-A05 Lax 圧縮条件を平均値の定理から出す
- Level: A

$f\in C^2(\mathbb R)$、$f''>0$ とする。$u_L>u_R$ に対する shock 速度

$$
s
=
\frac{f(u_L)-f(u_R)}{u_L-u_R}
$$

が

$$
f'(u_L)>s>f'(u_R)
$$

を満たすことを、平均値の定理から示せ。

<!-- solution-start -->
#### 詳細解答

区間 $[u_R,u_L]$ に平均値の定理を適用します。

ある

$$
\xi\in(u_R,u_L)
$$

が存在して

$$
f'(\xi)
=
\frac{f(u_L)-f(u_R)}{u_L-u_R}
=
s.
$$

$f''>0$ なので $f'$ は狭義単調増加です。

$u_R<\xi<u_L$ だから

$$
f'(u_R)
<
f'(\xi)
<
f'(u_L).
$$

$f'(\xi)=s$ を代入して

$$
\boxed{
f'(u_R)<s<f'(u_L)
}.
$$

これは左右の特性が shock へ流れ込むことを意味します。
<!-- solution-end -->

### Level B

<a id="ex-npde2-b01"></a>
#### NPDE2-B01 粘性方程式から entropy inequality を導く
- Level: B

滑らかな解 $u^\varepsilon$ が

$$
u_t^\varepsilon
+
\partial_xf(u^\varepsilon)
=
\varepsilon u_{xx}^\varepsilon
$$

を満たし、$(\eta,q)$ は $\eta''\ge0$ を満たす entropy pair とする。

1. $\eta'(u^\varepsilon)$ を掛けて entropy の等式を導け。
2. 粘性項を積の微分へ分解せよ。
3. 凸性から不等式
   $$
   \partial_t\eta(u^\varepsilon)+\partial_xq(u^\varepsilon)
   \le
   \varepsilon\partial_{xx}\eta(u^\varepsilon)
   $$
   を導け。

<!-- solution-start -->
#### 詳細解答

元の方程式に $\eta'(u^\varepsilon)$ を掛けます。

$$
\eta'(u^\varepsilon)u_t^\varepsilon
+
\eta'(u^\varepsilon)f'(u^\varepsilon)u_x^\varepsilon
=
\varepsilon
\eta'(u^\varepsilon)u_{xx}^\varepsilon.
$$

entropy pair の定義から

$$
q'(u)=\eta'(u)f'(u)
$$

なので左辺は

$$
\partial_t\eta(u^\varepsilon)
+
\partial_xq(u^\varepsilon).
$$

次に

$$
\partial_{xx}\eta(u^\varepsilon)
=
\eta''(u^\varepsilon)|u_x^\varepsilon|^2
+
\eta'(u^\varepsilon)u_{xx}^\varepsilon.
$$

従って

$$
\eta'(u^\varepsilon)u_{xx}^\varepsilon
=
\partial_{xx}\eta(u^\varepsilon)
-
\eta''(u^\varepsilon)|u_x^\varepsilon|^2.
$$

代入して

$$
\partial_t\eta(u^\varepsilon)
+
\partial_xq(u^\varepsilon)
=
\varepsilon\partial_{xx}\eta(u^\varepsilon)
-
\varepsilon
\eta''(u^\varepsilon)|u_x^\varepsilon|^2.
$$

$\varepsilon>0$、$\eta''\ge0$ なので最後の項は非正です。

したがって

$$
\boxed{
\partial_t\eta(u^\varepsilon)
+
\partial_xq(u^\varepsilon)
\le
\varepsilon\partial_{xx}\eta(u^\varepsilon)
}.
$$
<!-- solution-end -->

<a id="ex-npde2-b02"></a>
#### NPDE2-B02 chord 条件と Kruzhkov shock 条件
- Level: B

$f\in C^2(\mathbb R)$ を凸とし、$u_L>u_R$ とする。

Rankine--Hugoniot 速度を $s$、chord を

$$
\ell(k)=f(u_R)+s(k-u_R)
$$

とする。

$u_R<k<u_L$ に対して

$$
[q_k]-s[\eta_k]
=
2\{f(k)-\ell(k)\}
$$

を途中式から導き、凸性により entropy 条件が成り立つことを示せ。

<!-- solution-start -->
#### 詳細解答

$u_R<k<u_L$ なので

$$
\eta_k(u_L)=u_L-k,
$$

$$
\eta_k(u_R)=k-u_R.
$$

従って

$$
[\eta_k]
=
(k-u_R)-(u_L-k)
=
2k-u_L-u_R.
$$

flux は

$$
q_k(u_L)=f(u_L)-f(k),
$$

$$
q_k(u_R)=f(k)-f(u_R).
$$

よって

$$
[q_k]
=
2f(k)-f(u_L)-f(u_R).
$$

したがって

$$
[q_k]-s[\eta_k]
=
2f(k)-f(u_L)-f(u_R)
-s(2k-u_L-u_R).
$$

Rankine--Hugoniot 関係

$$
f(u_L)
=
f(u_R)+s(u_L-u_R)
$$

を使います。

すると

$$
f(u_L)+f(u_R)+s(2k-u_L-u_R)
$$

は

$$
f(u_R)+s(u_L-u_R)+f(u_R)
+s(2k-u_L-u_R)
$$

となり、

$$
2f(u_R)+2s(k-u_R)
=
2\ell(k)
$$

です。

従って

$$
[q_k]-s[\eta_k]
=
2f(k)-2\ell(k)
=
\boxed{
2\{f(k)-\ell(k)\}
}.
$$

$f$ は凸なので chord の下にあり、

$$
f(k)\le\ell(k).
$$

よって

$$
[q_k]-s[\eta_k]\le0.
$$

したがって圧縮 shock はこの $k$ に対する Kruzhkov inequality を満たします。
<!-- solution-end -->

<a id="ex-npde2-b03"></a>
#### NPDE2-B03 Kato flux の速度評価
- Level: B

$|u|,|v|\le M$ とし、

$$
L=\max_{|z|\le M}|f'(z)|
$$

とする。

Kato flux

$$
Q(u,v)
=
\operatorname{sgn}(u-v)\{f(u)-f(v)\}
$$

について

$$
|Q(u,v)|\le L|u-v|
$$

を示せ。また、この評価が局所 $L^1$ 評価の区間

$$
[a-Lt,b+Lt]
$$

にどう現れるか説明せよ。

<!-- solution-start -->
#### 詳細解答

$u=v$ なら両辺は0なので成立します。

$u\ne v$ とします。

平均値の定理により、$u$ と $v$ の間のある $\xi$ が存在して

$$
f(u)-f(v)
=
f'(\xi)(u-v).
$$

$u,v\in[-M,M]$ なので $\xi\in[-M,M]$ です。

従って

$$
|f'(\xi)|\le L.
$$

よって

$$
|f(u)-f(v)|
\le
L|u-v|.
$$

符号関数の絶対値は1なので

$$
|Q(u,v)|
=
|f(u)-f(v)|
\le
L|u-v|.
$$

したがって差 $|u-v|$ の flux は、その密度の $L$ 倍を超える速度で外へ運ばれません。

時刻 $t$ の $[a,b]$ に影響できる初期位置を最大速度 $L$ で逆向きにたどると、左へ $Lt$、右へ $Lt$ 広げた

$$
[a-Lt,b+Lt]
$$

になります。

これが局所 $L^1$ 評価の右辺に現れる区間です。
<!-- solution-end -->

<a id="ex-npde2-b04"></a>
#### NPDE2-B04 Burgers の希薄波が entropy 条件を満たす理由
- Level: B

Burgers 方程式の Riemann データ

$$
u_L=0,
\qquad
u_R=1
$$

に対する中心希薄波

$$
u(t,x)
=
\begin{cases}
0,&x\le0,\\
x/t,&0<x<t,\\
1,&x\ge t
\end{cases}
$$

を考える。

固定した $k\in\mathbb R$ に対して、Kruzhkov entropy flux を用い、この希薄波が entropy inequality を満たす理由を次の順で説明せよ。

1. $u\ne k$ の滑らかな領域。
2. $u=k$ を横切る位置。
3. ファン境界 $x=0,t$。

<!-- solution-start -->
#### 詳細解答

**1. $u\ne k$ の滑らかな領域。**

$\eta_k(u)=|u-k|$ は $u\ne k$ では滑らかです。

その領域では

$$
\eta_k'(u)=\operatorname{sgn}(u-k)
$$

なので、Kruzhkov flux は

$$
q_k'(u)
=
\eta_k'(u)f'(u)
$$

を満たします。

希薄波は古典的に Burgers 方程式を満たすため

$$
\partial_t\eta_k(u)+\partial_xq_k(u)=0.
$$

**2. $u=k$ を横切る位置。**

$0<k<1$ ならファン内の直線

$$
x=kt
$$

で $u=k$ になります。

しかし

$$
\eta_k(k)=0,
\qquad
q_k(k)=0
$$

で、左右からの値も連続に0へ近づきます。

従ってこの線をまたいでも $\eta_k(u)$ と $q_k(u)$ に jump はなく、Dirac 項は生じません。

$k\notin(0,1)$ ならそもそもファン内で $u=k$ を横切りません。

**3. ファン境界。**

$x=0$ では左右とも $u=0$、$x=t$ では左右とも $u=1$ です。

したがって $u$ は連続で、$\eta_k(u)$ と $q_k(u)$ も連続です。

よって境界にも jump measure はありません。

以上から全時空で entropy 等式が超関数の意味で成り立ち、特に entropy inequality を満たします。
<!-- solution-end -->

### Level C

<a id="ex-npde2-c01"></a>
#### NPDE2-C01 Burgers Riemann 問題を entropy selection と一意性まで閉じる
- Level: C

Burgers 方程式

$$
u_t+\partial_x\left(\frac{u^2}{2}\right)=0
$$

と Riemann 初期値

$$
u_0(x)
=
\begin{cases}
a,&x<0,\\
b,&x>0
\end{cases}
\qquad
(a\ne b)
$$

を考える。

1. $a>b$ のとき Rankine--Hugoniot shock の速度を求め、Lax 条件を確認せよ。
2. $a>b$ の shock が Kruzhkov entropy 条件を満たすことを、$b<k<a$ での jump coefficient から示せ。
3. $a<b$ のとき中心希薄波を書け。
4. $a<b$ を直接つなぐ expansion shock が Kruzhkov 条件を破ることを示せ。
5. 中心希薄波が entropy solution であることを説明せよ。
6. $L^1$ 収縮性により、1 または3で得た entropy solution と同じ初期値を持つ別の entropy solution が存在しないことを示せ。
7. 「Rankine--Hugoniot 条件」「entropy 条件」「$L^1$ 収縮性」の役割を一文ずつ区別せよ。

<!-- solution-start -->
#### 詳細解答

**1. $a>b$ の shock。**

Burgers の Rankine--Hugoniot 速度は

$$
s
=
\frac{f(a)-f(b)}{a-b}
=
\frac{a^2-b^2}{2(a-b)}
=
\frac{a+b}{2}.
$$

特性速度は

$$
f'(u)=u.
$$

$a>b$ なので

$$
a
>
\frac{a+b}{2}
>
b.
$$

従って

$$
\boxed{
f'(a)>s>f'(b)
}
$$

で、Lax 圧縮条件を満たします。

**2. Kruzhkov 条件。**

$b<k<a$ とします。

chord は

$$
\ell(k)
=
f(b)+s(k-b).
$$

Burgers 流束 $f(u)=u^2/2$ は狭義凸なので

$$
f(k)<\ell(k)
$$

です。

B02 の計算から

$$
[q_k]-s[\eta_k]
=
2\{f(k)-\ell(k)\}
<0.
$$

$k$ が $[b,a]$ の外なら jump coefficient は [NPDE1 の Rankine--Hugoniot 条件](../NPDE1/index.md#thm-npde1-rankine-hugoniot)により0です。

従って全ての $k$ で entropy inequality を満たします。

**3. $a<b$ の中心希薄波。**

Burgers では $f'(u)=u$ なので

$$
\boxed{
u(t,x)
=
\begin{cases}
a,&x\le at,\\
x/t,&at<x<bt,\\
b,&x\ge bt.
\end{cases}
}
$$

です。

**4. expansion shock の排除。**

直接 shock でつなぐ場合も速度は

$$
s=\frac{a+b}{2}.
$$

$a<k<b$ を取ります。

この向きでは

$$
[q_k]-s[\eta_k]
=
2\{\ell(k)-f(k)\}.
$$

狭義凸性から

$$
f(k)<\ell(k)
$$

なので

$$
[q_k]-s[\eta_k]>0.
$$

entropy 条件は非正を要求するため、この expansion shock は排除されます。

**5. 希薄波の entropy 性。**

希薄波はファン内部と外部で古典解です。

$u=k$ を横切る線でも、ファン両端でも $u$ は連続です。

従って $\eta_k(u)$、$q_k(u)$ に jump measure は生じず、各滑らかな領域の entropy 等式を貼り合わせられます。

よって全ての $k$ で Kruzhkov inequality を満たします。

**6. 一意性。**

$u$ を上で得た entropy solution、$v$ を同じ初期値 $u_0$ を持つ任意の entropy solution とします。

局所 $L^1$ 評価から任意の有限区間 $[A,B]$ に対して

$$
\int_A^B|u(t,x)-v(t,x)|\,dx
\le
\int_{A-Lt}^{B+Lt}|u_0(x)-u_0(x)|\,dx.
$$

右辺は0なので

$$
\int_A^B|u-v|\,dx=0.
$$

区間は任意だから

$$
u=v
$$

がほとんど至る所で成り立ちます。

**7. 三つの役割。**

- Rankine--Hugoniot 条件：跳躍面で **保存される量の収支** が合うための条件。
- entropy 条件：保存則を満たす複数の弱解から **散逸の向きに合う解を選ぶ** 条件。
- $L^1$ 収縮性：選ばれた二つの entropy solution の距離が増えないことから **一意性と初期値安定性** を与える性質。

したがって

$$
\boxed{
\text{保存}
\to
\text{選択}
\to
\text{一意性}
}
$$

という三段階になっています。
<!-- solution-end -->

---

## 12. 章末チェック

- entropy / entropy flux pair を $q'=\eta'f'$ から構成できる。
- 粘性保存則へ $\eta'(u^\varepsilon)$ を掛け、凸性が散逸項の符号を決めることを導出できる。
- entropy inequality の超関数表示とテスト関数表示の符号を対応させられる。
- 一本の jump に対して $[q]-s[\eta]\le0$ を導ける。
- Burgers の圧縮 shock と expansion shock を二次 entropy で判別できる。
- 狭義凸流束で Lax 圧縮条件を平均値の定理から導ける。
- Kruzhkov entropy pair $(|u-k|,q_k)$ を定義できる。
- 凸流束の Riemann 問題で圧縮 shock / 希薄波が選ばれ、expansion shock が排除されることを chord 条件から説明できる。
- doubling of variables で「定数 $k$」をもう一つの解へ変える手順を説明できる。
- [Kato 型不等式](#lem-npde2-kato-inequality)から局所 $L^1$ 評価を導き、$L^1$ 収縮性と一意性へ進める。
- vanishing viscosity で得られる極限が entropy inequality を満たす理由を、凸性・強収束・$\varepsilon$ 項の消失に分けて説明できる。
- entropy solution が「弱解より弱い」のではなく「弱解を選別する」概念だと説明できる。
