# MT8：直径被覆と集合のスケーリング指数

Lebesgue 測度は直線上の長さ、平面上の面積、空間上の体積を測ります。しかし一点集合も Cantor 集合も Lebesgue 測度は 0 であり、「どのくらい細かい集合なのか」という違いを Lebesgue 測度だけでは区別できません。

そこで、直径 $\delta$ 以下の小集合で覆ったとき、直径の $s$ 乗の総和をどこまで小さくできるかを測ります。指数 $s$ を変えながら被覆コストを調べると、集合固有の「スケールに対する細かさ」を臨界指数として取り出せます。

[外測度・Carathéodory 可測性](../F0_00D3_外測度_Caratheodory可測性/index.md) の構成を、被覆の大きさに指数 $s$ を入れて幾何へ伸ばします。正規化定数は文献により異なるため、本章では直径による非正規化版を用います。後で集合の細かさを表す臨界指数を定義しますが、その値はこの正規化に依存しません。

---

## 1. 直径をコストにする

距離空間 $(X,d)$ の非空集合 $A\subset X$ の直径を

$$
\operatorname{diam} A
=
\sup\{d(x,y):x,y\in A\}
$$

とし、$\operatorname{diam}\varnothing=0$ とします。

<a id="def-mt8-hausdorff-content"></a>

<!-- formal-statement-start -->
> **定義（δ-Hausdorff内容量）**  
> $s\ge0$, $\delta>0$, $E\subset X$ とする。$E$ の $\delta$-Hausdorff 内容量を
>
$$
\mathcal H_\delta^s(E)
=
\inf
\left\{
\sum_{i=1}^{\infty}(\operatorname{diam}U_i)^s:
E\subset\bigcup_{i=1}^{\infty}U_i,\ 
\operatorname{diam}U_i\le\delta
\right\}
$$
>
> と定める。$s=0$ では、非空な $U_i$ に対して $(\operatorname{diam}U_i)^0=1$ と解釈する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mt8-hausdorff-content -->
### 直接例：一点集合の Hausdorff 内容量

**定義の確認**

$s>0$ とし $E=\{x\}$ とします。任意の $\delta>0$ に対し、一集合 $U_1=\{x\}$ で $E$ を覆え、
$$
\operatorname{diam}U_1=0\le\delta.
$$
従って定義の下限は
$$
0\le\mathcal H_\delta^s(\{x\})\le0^s=0,
$$
すなわち $\mathcal H_\delta^s(\{x\})=0$ です。
<!-- definition-example-end -->

$0<\delta_1<\delta_2$ なら、$\delta_1$-被覆は $\delta_2$-被覆 より制約が強いので

$$
\mathcal H_{\delta_1}^s(E)
\ge
\mathcal H_{\delta_2}^s(E).
$$

したがって $\delta\downarrow0$ の極限が存在します。

<a id="def-mt8-hausdorff-measure"></a>

<!-- formal-statement-start -->
> **定義（Hausdorff 外測度）**  
> $s\ge0$ に対し
>
$$
\mathcal H^s(E)
=
\lim_{\delta\downarrow0}\mathcal H_\delta^s(E)
=
\sup_{\delta>0}\mathcal H_\delta^s(E)
$$
>
> と定める。これを指数 $s$ の Hausdorff 外測度と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mt8-hausdorff-measure -->
### 直接例：一点集合の Hausdorff 外測度

**定義の確認**

上の計算から、$s>0$ では全ての $\delta>0$ に対して
$$
\mathcal H_\delta^s(\{x\})=0.
$$
したがって定義どおり極限を取ると
$$
\mathcal H^s(\{x\})
=
\lim_{\delta\downarrow0}\mathcal H_\delta^s(\{x\})
=
0.
$$
<!-- definition-example-end -->

まだ「測度」ではなく外測度と呼んでいるのは、まず全ての部分集合上で外測度として構成し、その後 Borel 集合が Carathéodory 可測になることを示すからです。

---

## 2. Hausdorff 構成は外測度になる

<a id="thm-mt8-hausdorff-outer-measure"></a>

<!-- formal-statement-start -->
> **定理（Hausdorff 外測度の外測度性）**  
> 任意の $s\ge0$ に対し、$\mathcal H^s$ は $X$ 上の外測度である。すなわち
>
> 1. $\mathcal H^s(\varnothing)=0$、
> 2. $A\subset B$ なら $\mathcal H^s(A)\le\mathcal H^s(B)$、
> 3. 任意の $(E_j)_{j\ge1}$ に対し
>
$$
\mathcal H^s\!\left(\bigcup_{j=1}^{\infty}E_j\right)
\le
\sum_{j=1}^{\infty}\mathcal H^s(E_j)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

空集合と単調性は被覆の包含関係から直接出ます。

可算劣加法性では、各 $E_j$ に対して下限そのものを取る必要はありません。$\mathcal H_\delta^s(E_j)$ に $2^{-j}\varepsilon$ だけ近い $\delta$-被覆を選び、それらを全て合わせます。

<!-- proof-start -->
### 証明

$\varnothing$ は空の被覆で覆えるので $\mathcal H_\delta^s(\varnothing)=0$、従って $\mathcal H^s(\varnothing)=0$ です。

$A\subset B$ なら、$B$ の任意の $\delta$-被覆は $A$ の $\delta$-被覆でもあります。従って

$$
\mathcal H_\delta^s(A)
\le
\mathcal H_\delta^s(B),
$$

ゆえに $\delta\downarrow0$ として

$$
\mathcal H^s(A)\le\mathcal H^s(B).
$$

可算劣加法性を示します。右辺 $\sum_j\mathcal H^s(E_j)$ が無限大なら結論は自明なので、以下では有限とします。このとき各 $\mathcal H_\delta^s(E_j)$ も有限であり、近似する $\delta$-被覆を実際に選べます。

$\delta>0$ と $\varepsilon>0$ を固定します。各 $j$ について、$E_j$ の $\delta$-被覆 $(U_{j,k})_{k\ge1}$ を

$$
\sum_{k=1}^{\infty}
(\operatorname{diam}U_{j,k})^s
\le
\mathcal H_\delta^s(E_j)+2^{-j}\varepsilon
$$

となるように取ります。

二重列 $(U_{j,k})_{j,k}$ は $\bigcup_jE_j$ を覆うので

$$
\mathcal H_\delta^s\!\left(\bigcup_jE_j\right)
\le
\sum_{j=1}^{\infty}\sum_{k=1}^{\infty}
(\operatorname{diam}U_{j,k})^s
\le
\sum_{j=1}^{\infty}\mathcal H_\delta^s(E_j)+\varepsilon.
$$

さらに $\mathcal H_\delta^s(E_j)\le\mathcal H^s(E_j)$ だから

$$
\mathcal H_\delta^s\!\left(\bigcup_jE_j\right)
\le
\sum_{j=1}^{\infty}\mathcal H^s(E_j)+\varepsilon.
$$

$\varepsilon\downarrow0$、その後 $\delta\downarrow0$ とすれば

$$
\mathcal H^s\!\left(\bigcup_jE_j\right)
\le
\sum_{j=1}^{\infty}\mathcal H^s(E_j).
$$
<!-- proof-end -->

---

## 3. 距離が離れた集合には加法的

Hausdorff 外測度には、一般の外測度より強い距離依存の性質があります。

<a id="def-mt8-metric-outer-measure"></a>

<!-- formal-statement-start -->
> **定義（距離外測度）**  
> 距離空間 $(X,d)$ 上の外測度 $\mu^*$ が 距離外測度 であるとは、
>
$$
\operatorname{dist}(A,B)>0
$$
>
> を満たす任意の $A,B\subset X$ に対し
>
$$
\mu^*(A\cup B)=\mu^*(A)+\mu^*(B)
$$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mt8-metric-outer-measure -->
### 直接例：計数外測度

**定義の確認**

$X$ 上で
$$
\mu^*(A)=
\begin{cases}
\#A,&A\text{ が有限},\\
\infty,&A\text{ が無限}
\end{cases}
$$
と置きます。これは集合の個数の劣加法性から外測度です。$\operatorname{dist}(A,B)>0$ なら特に $A\cap B=\varnothing$ なので、
$$
\mu^*(A\cup B)=\mu^*(A)+\mu^*(B)
$$
が成り立ちます。従って計数外測度は距離外測度です。
<!-- definition-example-end -->

<a id="prop-mt8-hausdorff-metric-outer"></a>

<!-- formal-statement-start -->
> **命題（Hausdorff 外測度は距離外測度）**  
> 任意の $s\ge0$ に対し、$\mathcal H^s$ は距離外測度である。
<!-- formal-statement-end -->

### 証明の見取り図

$A$ と $B$ の距離を $r>0$ とします。$\delta<r$ なら、直径 $\delta$ 以下の集合は $A$ と $B$ の両方に同時には交われません。したがって $A\cup B$ の細かい被覆は、$A$ を覆う部分と $B$ を覆う部分へ分離できます。

<!-- proof-start -->
### 証明

$r=\operatorname{dist}(A,B)>0$ とし、$0<\delta<r$ を取ります。

$\mathcal H_\delta^s(A\cup B)=\infty$ なら求める下側評価は自明です。以下では有限とし、$A\cup B$ の任意の $\delta$-被覆 $(U_i)$ を取ります。もし一つの $U_i$ が $A$ と $B$ の両方に交わるなら、$a\in A\cap U_i$ と $b\in B\cap U_i$ が取れて

$$
d(a,b)
\le
\operatorname{diam}U_i
\le
\delta
<
r,
$$

となり $r=\operatorname{dist}(A,B)$ に矛盾します。

したがって各 $U_i$ は $A$ と $B$ の高々一方にしか交わりません。$A$ に交わる添字集合を $I_A$、$B$ に交わる添字集合を $I_B$ とすると

$$
\sum_i(\operatorname{diam}U_i)^s
\ge
\mathcal H_\delta^s(A)
+
\mathcal H_\delta^s(B).
$$

全ての $\delta$-被覆について下限を取り、

$$
\mathcal H_\delta^s(A\cup B)
\ge
\mathcal H_\delta^s(A)+\mathcal H_\delta^s(B).
$$

逆向きは外測度の可算劣加法性から従います。$\delta\downarrow0$ として

$$
\mathcal H^s(A\cup B)
=
\mathcal H^s(A)+\mathcal H^s(B).
$$
<!-- proof-end -->

---

## 4. 距離外測度 は Borel 集合を測れる

<a id="thm-mt8-metric-outer-borel"></a>

<!-- formal-statement-start -->
> **定理（距離外測度の Borel 可測性）**  
> 距離空間上の距離外測度 $\mu^*$ に対し、全ての Borel 集合は Carathéodory 可測である。従って $\mathcal H^s$ を Borel $\sigma$-代数へ制限すると測度になる。
<!-- formal-statement-end -->

### 証明の見取り図

[Carathéodory 可測集合が $\sigma$-代数をなす定理](../F0_00D3_外測度_Caratheodory可測性/index.md#thm-f0-00d3-caratheodory)を使うので、閉集合が可測であることを示せば十分です。

閉集合 $F$ から距離 $1/n$ 以上離れた部分は $A\cap F$ と正距離で離れているため、距離外測度の加法性が使えます。残る $F$ の近くの距離帯を偶数番・奇数番に分けると、各系列の異なる帯は正距離で離れるので、その尾部の外測度を0へ送れます。

<!-- proof-start -->
### 証明

閉集合 $F\subset X$ を固定します。任意の $A\subset X$ について

$$
\mu^*(A)
\ge
\mu^*(A\cap F)+\mu^*(A\setminus F)
$$

を示します。逆向きは外測度の劣加法性から常に成り立つので、これで $F$ の Carathéodory 可測性が従います。

$\mu^*(A)=\infty$ なら上の不等式は自明です。以下 $\mu^*(A)<\infty$ とします。

$$
A_n=\{x\in A:d(x,F)\ge1/n\}
$$

とおきます。$A\cap F$ と $A_n$ の距離は少なくとも $1/n$ なので 距離加法性 から

$$
\mu^*(A)
\ge
\mu^*(A\cap F)+\mu^*(A_n).
$$

距離帯を

$$
L_n
=
\left\{
x\in A:
\frac1{n+1}\le d(x,F)<\frac1n
\right\}
$$

とします。

距離関数 $x\mapsto d(x,F)$ は 1-Lipschitz です。例えば $m\ge n+2$ とし、$x\in L_n$, $y\in L_m$ を取ると

$$
d(x,F)\ge\frac1{n+1},
\qquad
d(y,F)<\frac1m\le\frac1{n+2}.
$$

1-Lipschitz 性から

$$
d(x,y)
\ge
|d(x,F)-d(y,F)|
>
\frac1{n+1}-\frac1{n+2}
>0.
$$

従って同じ偶奇の添字を持つ異なる距離帯は正距離で離れています。距離外測度の加法性を有限個ずつ繰り返すと

$$
\sum_{k=1}^{N}\mu^*(L_{2k})\le\mu^*(A),
\qquad
\sum_{k=1}^{N}\mu^*(L_{2k+1})\le\mu^*(A).
$$

$N\to\infty$ とすると、二つの非負項和は上から $\mu^*(A)$ で抑えられるため極限を持ち、従って

$$
\sum_{n\ge N}\mu^*(L_n)\to0.
$$

一方

$$
A\setminus F
\subset
A_N\cup\bigcup_{n\ge N}L_n.
$$

よって外測度の劣加法性から

$$
\mu^*(A\setminus F)
\le
\mu^*(A_N)
+
\sum_{n\ge N}\mu^*(L_n).
$$

従って

$$
\mu^*(A\setminus F)
\le
\limsup_{N\to\infty}\mu^*(A_N).
$$

先の不等式と合わせて

$$
\mu^*(A)
\ge
\mu^*(A\cap F)+\mu^*(A\setminus F).
$$

従って $F$ は Carathéodory 可測です。

閉集合全体を含む $\sigma$-代数は Borel $\sigma$-代数を含むため、全 Borel 集合が可測です。
<!-- proof-end -->

---

## 5. 臨界指数は「測度が無限から0へ切り替わる点」

$s<t$ とします。$\operatorname{diam}U_i\le\delta$ なら

$$
(\operatorname{diam}U_i)^t
=
(\operatorname{diam}U_i)^s
(\operatorname{diam}U_i)^{t-s}
\le
\delta^{t-s}
(\operatorname{diam}U_i)^s.
$$

したがって

$$
\mathcal H_\delta^t(E)
\le
\delta^{t-s}\mathcal H_\delta^s(E).
$$

この一つの不等式から臨界指数が生まれます。

<a id="thm-mt8-threshold"></a>

<!-- formal-statement-start -->
> **定理（Hausdorff 測度の臨界指数性）**  
> $0\le s<t$ とする。
>
> - $\mathcal H^s(E)<\infty$ なら $\mathcal H^t(E)=0$。
> - $\mathcal H^t(E)>0$ なら $\mathcal H^s(E)=\infty$。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\mathcal H^s(E)<\infty$ とします。十分小さい $\delta$ では

$$
\mathcal H_\delta^s(E)\le \mathcal H^s(E)+1
$$

なので

$$
\mathcal H_\delta^t(E)
\le
\delta^{t-s}\bigl(\mathcal H^s(E)+1\bigr).
$$

$\delta\downarrow0$ で右辺は0へ行くため $\mathcal H^t(E)=0$ です。

第2主張は第1主張の対偶です。
<!-- proof-end -->

<a id="def-mt8-hausdorff-dimension"></a>

<!-- formal-statement-start -->
> **定義（Hausdorff 次元）**  
> 集合 $E$ の Hausdorff 次元を
>
$$
\dim_H E
=
\inf\{s\ge0:\mathcal H^s(E)=0\}
=
\sup\{s\ge0:\mathcal H^s(E)=\infty\}
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mt8-hausdorff-dimension -->
### 直接例：一点集合の Hausdorff 次元は0

**定義の確認**

$s>0$ なら上で示したように $\mathcal H^s(\{x\})=0$ です。一方、$s=0$ では一点集合を覆うには少なくとも一つ非空集合が必要なので
$$
\mathcal H^0(\{x\})=1.
$$
従って
$$
\inf\{s\ge0:\mathcal H^s(\{x\})=0\}=0,
$$
すなわち $\dim_H\{x\}=0$ です。
<!-- definition-example-end -->

---

## 6. Lipschitz 写像は Hausdorff 次元を増やさない

集合を座標変換したとき、次元が勝手に増えては幾何学的な量として使いにくくなります。Lipschitz 写像は距離を高々定数倍にしか広げないので、被覆集合の直径も同じ定数倍で制御できます。この対応を Hausdorff 測度へ移すと、次元が増えないことが分かります。

<a id="thm-mt8-lipschitz"></a>

<!-- formal-statement-start -->
> **定理（Lipschitz 写像による Hausdorff 測度の評価）**  
> $f:(X,d_X)\to(Y,d_Y)$ がある $L>0$ について $L$-Lipschitz、すなわち
>
$$
d_Y(f(x),f(y))\le Ld_X(x,y)
$$
>
> を満たすとする。このとき任意の $s\ge0$ と $E\subset X$ に対し
>
$$
\mathcal H^s(f(E))
\le
L^s\mathcal H^s(E).
$$
>
> 特に $\dim_H f(E)\le\dim_H E$。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$(U_i)$ を $E$ の $\delta$-被覆 とします。$(f(U_i))$ は $f(E)$ を覆い、

$$
\operatorname{diam}f(U_i)
\le
L\operatorname{diam}U_i.
$$

したがって

$$
\sum_i(\operatorname{diam}f(U_i))^s
\le
L^s\sum_i(\operatorname{diam}U_i)^s.
$$

また $\operatorname{diam}f(U_i)\le L\delta$ なので

$$
\mathcal H_{L\delta}^s(f(E))
\le
L^s\mathcal H_\delta^s(E).
$$

$\delta\downarrow0$ として

$$
\mathcal H^s(f(E))
\le
L^s\mathcal H^s(E).
$$

$s>\dim_HE$ なら $\mathcal H^s(E)=0$ だから $\mathcal H^s(f(E))=0$ です。従って $\dim_Hf(E)\le\dim_HE$。
<!-- proof-end -->

双 Lipschitz 写像なら逆写像にも同じ議論を使えるため、Hausdorff 次元は保存されます。

---

## 7. 区間を例に定義を計算する

抽象的な定義が通常の「一次元」と一致することを、区間で確認します。上からは等分被覆を作り、下からはどんな被覆でも直径の総和が区間の長さを下回れないことを使います。

<a id="thm-mt8-interval-dimension"></a>

<!-- formal-statement-start -->
> **定理（区間の Hausdorff 次元）**  
> 非退化閉区間 $[a,b]\subset\mathbb R$ に対し
>
$$
\dim_H[a,b]=1.
$$
>
> 本章の非正規化では
>
$$
\mathcal H^1([a,b])=b-a.
$$
<!-- formal-statement-end -->

### 証明の見取り図

上からは区間を $n$ 等分します。

下からは、任意の被覆集合 $U_i\subset\mathbb R$ を、その直径と同じ長さの区間で包みます。[区間の Lebesgue 外測度](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md#thm-f0-00d4-interval-length) により、$[a,b]$ を覆うなら直径の総和は少なくとも $b-a$ 必要です。

<!-- proof-start -->
### 証明

$\ell=b-a>0$ とします。

まず $s=1$ を考えます。$n$ 等分すると長さ $\ell/n$ の $n$ 個の区間で $[a,b]$ を覆えます。$\ell/n\le\delta$ となる $n$ について

$$
\mathcal H_\delta^1([a,b])
\le
n\frac{\ell}{n}
=
\ell.
$$

したがって $\mathcal H^1([a,b])\le\ell$ です。

逆に $(U_i)$ を $[a,b]$ の任意の $\delta$-被覆 とします。各非空 $U_i$ は直径 $\operatorname{diam}U_i$ と同じ長さの閉区間 $I_i$ に含められます。$(I_i)$ も $[a,b]$ を覆うため、Lebesgue 外測度の可算劣加法性から

$$
\ell
\le
\sum_i |I_i|
=
\sum_i\operatorname{diam}U_i.
$$

したがって $\mathcal H_\delta^1([a,b])\ge\ell$ であり、

$$
\mathcal H^1([a,b])=\ell.
$$

$s>1$ なら $n$ 等分被覆により

$$
\mathcal H_{\ell/n}^s([a,b])
\le
n\left(\frac{\ell}{n}\right)^s
=
\ell^s n^{1-s}\to0.
$$

よって $\mathcal H^s([a,b])=0$ です。

一方、すでに

$$
\mathcal H^1([a,b])=\ell>0
$$

を示しました。[Hausdorff 測度の臨界指数性](#thm-mt8-threshold)を $t=1$ に適用すると、全ての $0\le s<1$ について

$$
\mathcal H^s([a,b])=\infty
$$

です。これなら $s=0$ も、直径0の被覆集合に負の冪を掛けることなく同じ論理で処理できます。

以上から臨界指数は1です。
<!-- proof-end -->

---

## 8. Hausdorff 次元の下界を測度から得る

被覆を全て調べる代わりに、集合 $E$ 上に「小集合へ質量を集中させすぎない」測度を作ります。

<a id="thm-mt8-mass-principle"></a>

<!-- formal-statement-start -->
> **定理（質量分布原理）**  
> $E\subset X$ を Borel 集合とし、有限 Borel 測度 $\mu$ が $\mu(X\setminus E)=0$ と $\mu(E)>0$ を満たすとする。$\mu^*$ を $\mu$ から作る外測度とする。ある $C>0$, $\delta_0>0$, $s\ge0$ が存在して、$\operatorname{diam}U\le\delta_0$ の全ての部分集合 $U\subset X$ について
>
$$
\mu^*(U)\le C(\operatorname{diam}U)^s
$$
>
> が成り立つとする。このとき
>
$$
\mathcal H^s(E)\ge\frac{\mu(E)}{C}>0.
$$
>
> 従って $\dim_HE\ge s$。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$0<\delta\le\delta_0$ とし、$(U_i)$ を $E$ の任意の $\delta$-被覆 とします。$\mu$ は $E$ に集中しているので、外測度の可算劣加法性から

$$
\mu(E)
=
\mu^*(E)
\le
\sum_i\mu^*(U_i)
\le
C\sum_i(\operatorname{diam}U_i)^s.
$$

従って

$$
\sum_i(\operatorname{diam}U_i)^s
\ge
\frac{\mu(E)}{C}.
$$

全ての $\delta$-被覆について下限を取り、

$$
\mathcal H_\delta^s(E)
\ge
\frac{\mu(E)}{C}.
$$

$\delta\downarrow0$ として

$$
\mathcal H^s(E)
\ge
\frac{\mu(E)}{C}>0.
$$

[Hausdorff 測度の臨界指数性](#thm-mt8-threshold)により $\dim_HE\ge s$ です。
<!-- proof-end -->

---

## 9. Cantor 集合の Hausdorff 次元

中三分 Cantor 集合を $C$ とし、

$$
\alpha
=
\frac{\log2}{\log3}
$$

と置きます。第 $n$ 段階では長さ $3^{-n}$ の基本区間が $2^n$ 個残り、

$$
2^n(3^{-n})^\alpha=1
$$

です。この指数が臨界指数になることを上下から示します。

<a id="thm-mt8-cantor-dimension"></a>

<!-- formal-statement-start -->
> **定理（中三分 Cantor 集合の Hausdorff 次元）**  
> 中三分 Cantor 集合 $C$ に対し
>
$$
\dim_HC
=
\frac{\log2}{\log3}.
$$
>
> さらに本章の非正規化 Hausdorff 測度では、$\alpha=\log2/\log3$ に対して
>
$$
0<\mathcal H^\alpha(C)<\infty.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 上からの評価

第 $n$ 段階の $2^n$ 個の基本区間で $C$ を覆うと

$$
\mathcal H_{3^{-n}}^\alpha(C)
\le
2^n(3^{-n})^\alpha
=
1.
$$

したがって $\mathcal H^\alpha(C)\le1$ です。

#### 下からの評価に使う Cantor 測度

各第 $n$ 段階の基本集合、すなわち第 $n$ 段階の基本区間と $C$ の共通部分に質量 $2^{-n}$ を割り当てます。親基本集合の質量は二つの子基本集合の質量の和

$$
2^{-n}=2^{-(n+1)}+2^{-(n+1)}
$$

なので、段階を細分しても有限加法性は変わりません。有限個の基本集合の和からなる集合代数を $\mathcal A$ とし、この割当てを $\nu_0$ と書きます。

ここで前測度性を「明らか」で済ませません。[Hopf 型の前測度判定](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md#lem-f0-00d4-hopf-premeasure) を使います。$A_m\in\mathcal A$ が

$$
A_1\supset A_2\supset\cdots,
\qquad
\bigcap_{m=1}^{\infty}A_m=\varnothing
$$

を満たすとします。各 $A_m$ は Cantor 集合の有限個の基本集合の和であり、$C$ の開かつ閉な部分集合です。従って $C$ の閉部分集合としてコンパクトです。もし全ての $A_m$ が非空なら、各 $m$ から $x_m\in A_m$ を取ります。$A_1$ はコンパクトなので $(x_m)$ は収束部分列を持ちます。列 $(A_m)$ は減少列なので、任意の固定した $j$ に対し $m\ge j$ なら $x_m\in A_j$ です。$A_j$ は閉じているため、収束部分列の極限も $A_j$ に属します。従ってその極限は全ての $A_j$ に属し、

$$
\bigcap_{m=1}^{\infty}A_m\ne\varnothing
$$

となり矛盾します。したがってある $m_0$ で $A_{m_0}=\varnothing$ となり、その後は全て空です。よって

$$
\nu_0(A_m)\downarrow0.
$$

従って Hopf 判定により $\nu_0$ は前測度です。[Carathéodory 拡張定理](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md#thm-caratheodory-extension) で、Cantor 集合上の Borel 確率測度 $\mu_C$ へ拡張できます。

長さ $r\in(0,1]$ の区間 $I$ を取り、

$$
3^{-(n+1)}<r\le3^{-n}
$$

となる $n$ を選びます。長さ $r$ の区間は 第 $n$ 段階の基本区間を高々2個しか横切れないので

$$
\mu_C(I)\le2\cdot2^{-n}.
$$

一方

$$
r^\alpha
>
3^{-(n+1)\alpha}
=
2^{-(n+1)}.
$$

したがって

$$
\mu_C(I)
\le
4r^\alpha.
$$

任意の $U\subset\mathbb R$ は長さ $\operatorname{diam}U$ の閉区間に含められます。$\mu_C^*$ を $\mu_C$ の外測度とすると

$$
\mu_C^*(U)
\le
4(\operatorname{diam}U)^\alpha.
$$

[質量分布原理](#thm-mt8-mass-principle) から

$$
\mathcal H^\alpha(C)\ge\frac14.
$$

以上より

$$
\frac14
\le
\mathcal H^\alpha(C)
\le
1
$$

であり、

$$
\boxed{
\dim_HC=\frac{\log2}{\log3}
}.
$$

上側では Cantor 集合の段階構成から得られる基本区間が自然な被覆を与えました。下側では Cantor 測度が、どの小区間にも質量が集中しすぎないことを示しました。上側だけでは「もっと効率のよい被覆なら総コストを0へできる」可能性が残りますが、[質量分布原理](#thm-mt8-mass-principle) がそれを排除します。
<!-- proof-end -->

---

## 10. Hausdorff 次元を評価するときの二方向

未知の集合 $E$ については、次の役割分担を固定すると見通しがよくなります。

**上界 $\dim_HE\le s$**：具体的な被覆を作り、

$$
\sum_i(\operatorname{diam}U_i)^s
$$

を小さくします。

**下界 $\dim_HE\ge s$**：$E$ に集中する測度 $\mu$ を作り、

$$
\mu(U)\le C(\operatorname{diam}U)^s
$$

を示します。

Cantor 集合では構成に現れる基本区間が上界、Cantor 測度が下界を担当しました。この「被覆と測度」の二方向は [後続章](../STO4A/index.md) でも再登場します。

---

# 11. 演習 A

<a id="ex-mt8-a01"></a>

## MT8-A01 $\delta$ に関する単調性

- Level: A

$0<\delta_1<\delta_2$ のとき

$$
\mathcal H_{\delta_1}^s(E)
\ge
\mathcal H_{\delta_2}^s(E)
$$

を示せ。

<!-- solution-start -->
### 詳細解答

$\delta_1$-被覆は各集合の直径が $\delta_1$ 以下なので、自動的に $\delta_2$-被覆でもあります。従って下限を取る候補集合は $\delta_1$ の方が狭く、

$$
\mathcal H_{\delta_1}^s(E)
\ge
\mathcal H_{\delta_2}^s(E).
$$

この単調性により $\delta\downarrow0$ の極限を上限として定義できます。
<!-- solution-end -->

<a id="ex-mt8-a02"></a>

## MT8-A02 一点集合の Hausdorff 次元

- Level: A

一点集合 $\{x\}$ について $\dim_H\{x\}=0$ を示せ。

<!-- solution-start -->
### 詳細解答

任意の $s>0$ と $\delta>0$ を取ります。$\{x\}$ 自身で覆えば直径は0なので

$$
\mathcal H_\delta^s(\{x\})=0.
$$

従って $\mathcal H^s(\{x\})=0$ です。これは全ての $s>0$ で成り立つため

$$
\dim_H\{x\}=0.
$$

なお $s=0$ では非空集合一つの被覆のコストは1であり、$\mathcal H^0(\{x\})=1$ です。
<!-- solution-end -->

<a id="ex-mt8-a03"></a>

## MT8-A03 Lipschitz 像

- Level: A

$f(x)=3x+1$ と $E\subset\mathbb R$ に対し

$$
\mathcal H^s(f(E))
\le
3^s\mathcal H^s(E)
$$

を示せ。また $\dim_Hf(E)=\dim_HE$ を示せ。

<!-- solution-start -->
### 詳細解答

任意の $x,y$ に対し

$$
|f(x)-f(y)|=3|x-y|.
$$

従って $f$ は 3-Lipschitz です。[Lipschitz 写像による Hausdorff 測度の評価](#thm-mt8-lipschitz)から

$$
\mathcal H^s(f(E))
\le
3^s\mathcal H^s(E).
$$

逆写像

$$
f^{-1}(y)=\frac{y-1}{3}
$$

は $1/3$-Lipschitz です。よって

$$
\dim_Hf(E)\le\dim_HE
$$

に加え、

$$
\dim_HE
=
\dim_H(f^{-1}(f(E)))
\le
\dim_Hf(E).
$$

両方を合わせて $\dim_Hf(E)=\dim_HE$ です。
<!-- solution-end -->

<a id="ex-mt8-a04"></a>

## MT8-A04 可算集合の Hausdorff 次元

- Level: A

可算集合 $E=\{x_1,x_2,\ldots\}$ に対し $\dim_HE=0$ を示せ。

<!-- solution-start -->
### 詳細解答

$s>0$, $\delta>0$, $\varepsilon>0$ を固定します。各 $x_i$ を、直径が

$$
\min\left\{\delta,\left(\frac{\varepsilon}{2^i}\right)^{1/s}\right\}
$$

以下の区間 $U_i$ で覆います。すると

$$
\sum_{i=1}^{\infty}(\operatorname{diam}U_i)^s
\le
\sum_{i=1}^{\infty}\frac{\varepsilon}{2^i}
=
\varepsilon.
$$

したがって $\mathcal H_\delta^s(E)=0$ です。$\delta\downarrow0$ として $\mathcal H^s(E)=0$。任意の $s>0$ で成り立つので

$$
\dim_HE=0.
$$
<!-- solution-end -->

# 12. 演習 B

<a id="ex-mt8-b01"></a>

## MT8-B01 区間の下界

- Level: B

$[0,1]$ の任意の可算被覆 $(U_i)$ に対し

$$
1\le\sum_i\operatorname{diam}U_i
$$

を示せ。各 $U_i$ を同じ直径の区間に入れる手順を明示せよ。

<!-- solution-start -->
### 詳細解答

空でない $U_i\subset\mathbb R$ に対し

$$
a_i=\inf U_i,
\qquad
b_i=\sup U_i
$$

とすれば

$$
U_i\subset[a_i,b_i],
\qquad
b_i-a_i=\operatorname{diam}U_i.
$$

したがって $([a_i,b_i])$ も $[0,1]$ を覆います。Lebesgue 外測度の可算劣加法性から

$$
1
=
\lambda^*([0,1])
\le
\sum_i\lambda([a_i,b_i])
=
\sum_i\operatorname{diam}U_i.
$$

これが 1次元 Hausdorff 測度の下界です。
<!-- solution-end -->

<a id="ex-mt8-b02"></a>

## MT8-B02 質量分布原理

- Level: B

$E$ 上に集中する確率測度 $\mu$ があり、$\mu$ から作る外測度を $\mu^*$ とする。十分小さい全ての部分集合 $U$ について

$$
\mu^*(U)\le10(\operatorname{diam}U)^{2/3}
$$

を満たすとする。$\mathcal H^{2/3}(E)$ と $\dim_HE$ の下界を求めよ。

<!-- solution-start -->
### 詳細解答

$\mu(E)=1$, $C=10$, $s=2/3$ です。[質量分布原理](#thm-mt8-mass-principle) より

$$
\mathcal H^{2/3}(E)
\ge
\frac{1}{10}.
$$

特に正なので[Hausdorff 測度の臨界指数性](#thm-mt8-threshold)から

$$
\dim_HE\ge\frac23.
$$

総質量だけでなく、小集合への質量集中度が Hausdorff 次元の下界を決めています。
<!-- solution-end -->

<a id="ex-mt8-b03"></a>

## MT8-B03 一定比率の被覆の上界

- Level: B

ある集合 $E$ が各 $n$ について、直径 $r^n$ の集合 $N^n$ 個で覆えるとする。ただし $N\ge2$, $0<r<1$ とする。

$$
s_0=\frac{\log N}{-\log r}
$$

とおく。$\dim_HE\le s_0$ を示せ。

<!-- solution-start -->
### 詳細解答

$s>s_0$ を取ります。仮定の被覆から

$$
\mathcal H_{r^n}^s(E)
\le
N^n(r^n)^s
=
(Nr^s)^n.
$$

$s>s_0$ より

$$
\log N+s\log r<0,
$$

従って $Nr^s<1$ です。よって

$$
(Nr^s)^n\to0.
$$

したがって $\mathcal H^s(E)=0$。任意の $s>s_0$ で成り立つため

$$
\dim_HE\le s_0.
$$
<!-- solution-end -->

# 13. 演習 C

<a id="ex-mt8-c01"></a>

## MT8-C01 Cantor 集合の Hausdorff 次元を再構成する

- Level: C

中三分 Cantor 集合 $C$ と

$$
\alpha=\frac{\log2}{\log3}
$$

について次を示せ。

1. 第 $n$ 段階の $2^n$ 個の基本区間により $\mathcal H^\alpha(C)\le1$。
2. 各第 $n$ 段階の基本区間へ質量 $2^{-n}$ を与える Cantor 測度 $\mu_C$ を構成できる理由を説明せよ。
3. 長さ $r$ の区間 $I$ に対し $\mu_C(I)\le4r^\alpha$ を示せ。
4. [質量分布原理](#thm-mt8-mass-principle) を使い $\mathcal H^\alpha(C)\ge1/4$ を示せ。
5. $\dim_HC=\alpha$ を結論せよ。

<!-- solution-start -->
### 詳細解答

1. 第 $n$ 段階では $C$ は長さ $3^{-n}$ の基本区間 $2^n$ 個で覆われるため

   $$
   \mathcal H_{3^{-n}}^\alpha(C)
   \le
   2^n(3^{-n})^\alpha.
   $$

   $3^\alpha=2$ だから右辺は1です。従って $\mathcal H^\alpha(C)\le1$。

2. 第 $n$ 段階の各基本集合、すなわち基本区間と $C$ の共通部分に質量 $2^{-n}$ を割り当てます。親基本集合は二つの子基本集合に分かれ、

$$
   2^{-n}=2^{-(n+1)}+2^{-(n+1)}
$$

   なので、細分の前後で有限加法性が整合します。有限個の基本集合の和からなる集合代数を $\mathcal A$ とし、この質量割当てを $\nu_0$ と書きます。

   前測度性を確認するため、[Hopf 型の前測度判定](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md#lem-f0-00d4-hopf-premeasure)を使います。$A_m\in\mathcal A$ が

$$
   A_1\supset A_2\supset\cdots,
   \qquad
   \bigcap_{m=1}^{\infty}A_m=\varnothing
$$

   を満たすとします。各 $A_m$ は $C$ の有限個の基本集合の和なので $C$ の閉部分集合であり、コンパクトです。もし全ての $A_m$ が非空なら、各 $m$ から $x_m\in A_m$ を取ります。$A_1$ はコンパクトなので $(x_m)$ は収束部分列を持ちます。任意の固定した $j$ について、十分大きい $m$ では $A_m\subset A_j$ なので、その部分列の極限は閉集合 $A_j$ に属します。従って同じ極限点が全ての $A_j$ に属し、$\bigcap_jA_j\ne\varnothing$ となって仮定に反します。よってある $m_0$ で $A_{m_0}=\varnothing$ となり、

$$
   \nu_0(A_m)\downarrow0.
$$

   よって Hopf 判定から $\nu_0$ は前測度です。[Carathéodory 拡張定理](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md#thm-caratheodory-extension)により、$C$ 上の Borel 確率測度 $\mu_C$ へ拡張できます。

3. $3^{-(n+1)}<r\le3^{-n}$ となる $n$ を取ります。長さ $r$ の区間は 第 $n$ 段階の基本区間を高々2個しか横切らないので

   $$
   \mu_C(I)\le2\cdot2^{-n}.
   $$

   一方

   $$
   r^\alpha>3^{-(n+1)\alpha}=2^{-(n+1)}.
   $$

   よって

   $$
   \mu_C(I)
   \le
   4r^\alpha.
   $$

4. 任意の $U\subset\mathbb R$ は長さ $\operatorname{diam}U$ の区間に含まれます。$\mu_C^*$ を外測度とすると

   $$
   \mu_C^*(U)
   \le
   4(\operatorname{diam}U)^\alpha.
   $$

   [質量分布原理](#thm-mt8-mass-principle) から

   $$
   \mathcal H^\alpha(C)\ge\frac14.
   $$

5. 以上より

$$
   0<\mathcal H^\alpha(C)<\infty.
$$

   [Hausdorff 測度の臨界指数性](#thm-mt8-threshold)を使うと、$t>\alpha$ では $\mathcal H^t(C)=0$、$s<\alpha$ では $\mathcal H^s(C)=\infty$ です。従って $\alpha$ がちょうど臨界指数であり、

$$
   \boxed{
   \dim_HC=\frac{\log2}{\log3}
   }.
$$

上界は被覆、下界は測度が担当しています。この二方向の分業が Hausdorff 次元評価の基本戦略です。
<!-- solution-end -->

---

## 14. 章末チェック

- [ ] $\mathcal H_\delta^s$ と $\mathcal H^s$ の定義順序を説明できる。
- [ ] Hausdorff 構成の可算劣加法性を近似被覆から証明できる。
- [ ] 正距離で離れた集合に距離加法性が出る理由を説明できる。
- [ ] 距離外測度が Borel 集合を測れる機構を距離帯で追える。
- [ ] 臨界指数性を $\delta^{t-s}$ の評価から導ける。
- [ ] Hausdorff 次元を臨界指数として定義できる。
- [ ] Lipschitz 写像が次元を増やさないことを証明できる。
- [ ] 区間の次元が1であることを上下から示せる。
- [ ] [質量分布原理](#thm-mt8-mass-principle) で Hausdorff 次元の下界を出せる。
- [ ] Cantor 集合の次元を被覆と Cantor 測度の両方から再構成できる。

ここで測度論系列は一巡します。
