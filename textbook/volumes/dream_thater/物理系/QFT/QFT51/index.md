# QFT51 自由bosonの応力テンソルOPE・中心電荷とVirasoro代数

<!-- definition-example-audit: strict -->

[QFT50の二次元自由場応力テンソル](../QFT50/index.md#thm-qft50-holomorphic-stress)は、古典的には正則で、[Witt括弧](../QFT50/index.md#prop-qft50-witt)は中心項を持ちませんでした。しかし量子論では、同じ点で二つの微分場を掛けること自体に正則化が必要です。**二つの応力テンソルを近づけると何が残るのか**、そしてその短距離特異性が輪郭電荷の交換子をどう変えるのかを調べます。

舞台は向きを固定した二次元Euclid平面の自由な実質量零bosonです。実時間側の符号規約は $(-,+,+,+)$ とし、ここでは $ds^2=dz\,d\bar z$ を使います。結合定数 $g>0$、$z=x+iy$、$\partial=\partial_z$ とし、作用の規格化はQFT50と同じ

$$
S_E[\phi]=\frac{g}{4\pi}\int_{\mathbb R^2}|\nabla\phi|^2\,d^2x,
\qquad J(z)=\partial\phi(z)
$$

です。微分記号は[QFT50のWirtinger微分](../QFT50/index.md#def-qft50-wirtinger)に従います。

$\partial_z$ は $\bar z$ を固定して $z$ を微分します。

$\partial_w$ は、それとは別の挿入点 $w$ を $\bar w$ を固定して微分します。

定数零モードは除去し、場そのものの赤外発散を微分場へ持ち込まないものとします。以下の等式は**自由Gaussian場の点が異なる相関関数**、または他の挿入点を避けた局所的な分布の等式です。量子場の点ごとの積が無条件に存在すると主張するものではありません。平面真空を基準として正規順序を定め、UV正則化を外す順番を明記します。

## 1. まず微分場の一回の収縮を固定する

作用から伝播関数の係数を求めれば、以下のすべての係数が決まります。[QFT20の自由場の反射陽性](../QFT20/index.md#thm-qft20-free-reflection)との役割の違いを意識し、ここでは平面の自由理論に必要な局所計算だけを行います。

<a id="prop-qft51-current-two-point"></a>

<!-- formal-statement-start -->
> **命題（微分自由bosonの二点収縮）**  
> $g>0$ とし、Euclid平面で定数零モードを除いた自由Gaussian作用 $S_E=(g/4\pi)\int|\nabla\phi|^2d^2x$ を考える。平面の並進不変な規格化で、相異なる $z,w$ に対し、場の二点核の局所形と正則側の微分場 $J=\partial_z\phi$ の二点収縮は

$$
G(z,w)=\langle\phi(z)\phi(w)\rangle
=-\frac1{2g}\log\bigl(\mu^2|z-w|^2\bigr),
\qquad
K(z-w):=\langle J(z)J(w)\rangle
=-\frac1{2g(z-w)^2}.
$$

> ここで $\mu>0$ は対数を無次元にする赤外基準であり、$G$ の加法定数は微分場に影響しない。これらは $z\ne w$ の式で、対角上の積は別途正則化する。
<!-- formal-statement-end -->

### 証明の見取り図

二次形式の核は $(g/2\pi)(-\Delta)$。二次元では $\Delta\log|z|^2=4\pi\delta^{(2)}(z)$ なので逆核の係数が決まり、$z$ と $w$ で一度ずつ微分します。

<!-- proof-start -->
### 証明

境界項が消える試験関数に対し、部分積分で

$$
S_E=\frac12\int\phi\,\frac{g}{2\pi}(-\Delta)\phi\,d^2x.
$$

原点を除けば $\Delta\log|z|^2=0$ です。半径 $r$ の円を横切る法線微分の流束は $(2/r)(2\pi r)=4\pi$ で、試験関数との部分積分から分布的に $\Delta\log|z|^2=4\pi\delta^{(2)}(z)$。従って

$$
\frac{g}{2\pi}(-\Delta_z)
\left[-\frac1{2g}\log(\mu^2|z-w|^2)\right]
=\delta^{(2)}(z-w).
$$

有限体積で零モードを取り除いた逆核の局所特異部分がこの式です。平面真空での $\partial_z,\partial_w$ による微分では加法定数が消えます。$z\ne w$ で $\partial_z\log|z-w|^2=1/(z-w)$、$\partial_w(z-w)^{-1}=(z-w)^{-2}$ なので

$$
\partial_z\partial_wG(z,w)
=-\frac1{2g}\partial_w\frac1{z-w}
=-\frac1{2g(z-w)^2}.
$$

特に二つの微分を同じ変数に取ったのではないことが、負号を決めています。
<!-- proof-end -->

**係数の直接検算。** $g=1$、$z-w=2$ なら $K=-1/8$。逆に $w$ を $z$ に近づけると $K$ は二次極を持ち、$\phi$ の赤外定数を変えてもこの二次極は変わりません。以降はこの $K$ を収縮一回分とします。

## 2. 同一点積を定め、一次場とのWard核を確かめる

自由場ではGaussianの対合規則（[QFT19のboson Wick対合](../QFT19/index.md#thm-qft19-boson-wick)）により、離れた場の積を収縮の数で整理できます。対角で発散する自己収縮を引いたものを使います。

<a id="def-qft51-wick-stress"></a>

<!-- formal-statement-start -->
> **定義（点分離正規順序と量子応力テンソル）**  
> 上の自由Gaussian平面真空と二点収縮 $K$ を固定する。点 $z,w$ を離してから対角に近づける点分離極限を、他の挿入点から離した相関関数の意味で

$$
:J^2:(w)=\lim_{z\to w}\bigl(J(z)J(w)-K(z-w)\bigr),
\qquad t(w)=-g:J^2:(w)
$$

> と定める。極限は正則化した合成場の定義であり、裸の点値 $J(w)^2$ の存在を仮定しない。異なる点にある多項式の全正規順序も同じGaussian二点収縮をすべて引く規則で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft51-wick-stress -->
**定義の確認** 平面真空で $\langle J(z)J(w)\rangle=K(z-w)$ なので $\langle:J^2:(w)\rangle=0$。さらに相異なる $w,u,v$ についてGaussianの四点対合を展開すると

$$
\begin{aligned}
\langle J(z)J(w)J(u)J(v)\rangle
&=K(z-w)K(u-v)+K(z-u)K(w-v)+K(z-v)K(w-u),\\
\langle:J^2:(w)J(u)J(v)\rangle
&=2K(w-u)K(w-v).
\end{aligned}
$$

最初の自己収縮 $K(z-w)K(u-v)$ が確かに消え、残る二通りだけが対角極限でも有限です。真空期待値の零と他の挿入点に対する非自明な相関の両方を確認できました。
<!-- definition-example-end -->

まず $J$ 自身が[QFT50のウェイト $(1,0)$](../QFT50/index.md#def-qft50-weights) と整合するかを調べます。

<a id="prop-qft51-stress-current-ope"></a>

<!-- formal-statement-start -->
> **命題（量子応力テンソルと微分場の短距離展開）**  
> 上の平面自由Gaussian模型で、相異なる挿入点の相関関数中、$z\to w$ の特異部分は

$$
t(z)J(w)\sim
\frac{J(w)}{(z-w)^2}+\frac{\partial J(w)}{z-w}.
$$

> 記号 $\sim$ は、右辺との差が $z=w$ の近傍で正則な項（他の挿入点は固定）であることを意味する。演算子の点値としての等号ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$t$ に含まれる二つの $J$ のうちどちらを外の $J(w)$ と収縮するかで係数 $2$ が出ます。残った $J(z)$ を $w$ 周りに展開します。

<!-- proof-start -->
### 証明

Gaussian対合を外の挿入点との相関関数中で使うと、単一収縮の特異項は

$$
-g\cdot2K(z-w)J(z)
=\frac{J(z)}{(z-w)^2}.
$$

残る全正規順序項は $z=w$ の近傍で正則です。$J(z)=J(w)+(z-w)\partial J(w)+O((z-w)^2)$ を正則化した相関関数中で展開すれば

$$
\frac{J(z)}{(z-w)^2}
=\frac{J(w)}{(z-w)^2}+\frac{\partial J(w)}{z-w}+O(1).
$$

よって主張が従います。
<!-- proof-end -->

この二次極の係数が $1$ なのは正規化の検算です。$t=-g:J^2:$ の $-g$ と $K=-1/(2g)(z-w)^{-2}$ が打ち消し合います。

## 3. 二重収縮が中心電荷を生む

一次場のWard核だけでは、$t$ と $t$ の積の一番高い極は分かりません。二つの複合演算子に含まれる各 $J$ を**二組とも**収縮すると、他の場を含まない四次極が残ります。

<a id="def-qft51-stress-ope"></a>

<!-- formal-statement-start -->
> **定義（応力テンソルOPEと中心電荷）**  
> 正則な量子応力テンソル $t$ について、相異なる挿入点の相関関数中で $z\to w$ の特異部分が

$$
t(z)t(w)\sim\frac{c/2}{(z-w)^4}
+\frac{2t(w)}{(z-w)^2}+\frac{\partial t(w)}{z-w}
$$

> の形を持つとき、四次極の係数を定める数 $c$ をこの規格化での**中心電荷**という。$c$ は古典Witt代数の交換関係に現れた係数ではなく、量子の局所積の係数である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft51-stress-ope -->
**定義の確認** 例えば短距離展開が

$$
t(z)t(w)\sim
\frac{1/2}{(z-w)^4}
+\frac{2t(w)}{(z-w)^2}
+\frac{\partial t(w)}{z-w}
$$

なら、二次極・単純極も定義に合致しており、四次極の係数を $c/2=1/2$ と照合して $c=1$ と判定します。また[Cauchyの高階導関数公式](../../../解析系/CA/CA3/index.md#thm-ca3-cauchy-derivatives)による四次極の輪郭積分では

$$
\frac c2\,\frac{\epsilon'''(w)}{3!}
=\frac c{12}\epsilon'''(w)
$$

となり、中心電荷は三階微分に掛かります。四次極がない場合も二次極と単純極は残り得ます。
<!-- definition-example-end -->

<a id="thm-qft51-boson-central-charge"></a>

<!-- formal-statement-start -->
> **定理（実自由bosonの中心電荷は1）**  
> $g>0$ の二次元自由実Gaussian場で、平面真空による点分離正規順序を施した $t=-g:J^2:$ を用いる。このとき相異なる点の短距離展開は

$$
t(z)t(w)\sim
\frac1{2(z-w)^4}
+\frac{2t(w)}{(z-w)^2}
+\frac{\partial t(w)}{z-w},
\qquad c=1.
$$

> 零モード除去と挿入点を離す仮定の下での自由模型の結果であり、任意の相互作用場の中心電荷を $1$ とする主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

Wick展開には、二重収縮2通り、単一収縮4通り、収縮なし、の三群があります。四次極は二重収縮、二次極と単純極は単一収縮のTaylor展開から出ます。

<!-- proof-start -->
### 証明

離れた点 $z,w$ で、Gaussian対合の組合せを明示すると

$$
:J(z)^2::J(w)^2:
=:J(z)^2J(w)^2:
+4K(z-w):J(z)J(w):+2K(z-w)^2.
$$

最初の項は全正規順序なので $z=w$ に新しい短距離収縮を持ちません。最後の二重収縮は

$$
g^2\,2K(z-w)^2
=2g^2\frac1{4g^2(z-w)^4}
=\frac1{2(z-w)^4}.
$$

単一収縮は、$t(z)t(w)=g^2:J(z)^2::J(w)^2:$ の符号を踏まえて

$$
4g^2K(z-w):J(z)J(w):
=-\frac{2g}{(z-w)^2}:J(z)J(w):.
$$

全正規順序の部分は対角近傍でTaylor展開できるので

$$
:J(z)J(w):
=:J(w)^2:+(z-w):\partial J(w)J(w):+O((z-w)^2).
$$

従って単一収縮の特異部分は

$$
-\frac{2g:J(w)^2:}{(z-w)^2}
-\frac{2g:\partial J(w)J(w):}{z-w}
=\frac{2t(w)}{(z-w)^2}+\frac{\partial t(w)}{z-w},
$$

ここで $\partial t=-2g:\partial J\,J:$ と積の微分を用いました。四次極の係数が定義の $c/2$ に等しいので $c=1$ です。
<!-- proof-end -->

結合定数 $g$ が消えるのは偶然ではありません。応力テンソル二つに由来する $g^2$ と、二本の伝播関数に由来する $g^{-2}$ が相殺するからです。

独立な実自由bosonが $N$ 成分ある場合、異なる成分間の収縮が零なので同じ議論で中心電荷は $c=N$ になります。フェルミオン模型や相互作用模型を、この計算だけで扱うことはできません。

## 4. 四次極を輪郭で積分するとVirasoro代数になる

[QFT50の輪郭電荷](../QFT50/index.md#def-qft50-contour-charge)に $\epsilon(z)=z^{n+1}$ を代入します。穿孔領域で正則なLaurent単項式を使うので、原点を囲む円は他の挿入点を横切らないようにします。ここで**動径順序**は、半径の大きい点の場を小さい点の場より外側として並べるEuclid相関関数の順序です。モードの交換子は、二つの積分円の内外を交換した差として計算します。

<a id="def-qft51-virasoro-modes"></a>

<!-- formal-statement-start -->
> **定義（応力テンソルの輪郭モード）**  
> 平面原点の周りで他の挿入点を横切らない正向きの円 $\gamma$ を取り、正則な量子応力テンソル $t$ のLaurentモードを、$n\in\mathbb Z$ に対して

$$
L_n=\frac1{2\pi i}\oint_\gamma z^{n+1}t(z)\,dz
$$

> と定める。積の交換子は動径順序付き相関関数の入れ子輪郭の差で定義する。零モード・状態空間を含む一般の作用素論的構成までをこの定義だけで保証しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft51-virasoro-modes -->
**定義の確認** 原点の穿孔近傍で、円周上にも収束する具体的な有限Laurent展開

$$
t(z)=Az^{-2}+Bz^{-3}+Cz^{-4}
$$

（$A,B,C$ は定数）を考えます。[Cauchy積分公式](../../../解析系/CA/CA3/index.md#thm-ca3-cauchy-integral-formula)で、積に含まれる $z^{-1}$ の係数を取ります。具体的には

$$
\begin{aligned}
z^{0+1}t(z)&=Az^{-1}+Bz^{-2}+Cz^{-3},\\
z^{1+1}t(z)&=A+Bz^{-1}+Cz^{-2}.
\end{aligned}
$$

したがって $L_0=A$、$L_1=B$ です。高次の極は、この二つのモードへ寄与しません。

もし $t$ 自身が円内に正則なら、$n\ge-1$ の積分は零です。一方、負のモードでは重み $z^{n+1}$ 自身の原点の極にも注意します。
<!-- definition-example-end -->

<a id="thm-qft51-virasoro"></a>

<!-- formal-statement-start -->
> **定理（応力テンソルOPEからのVirasoro交換子）**  
> 動径順序付きの局所相関関数で、応力テンソル $t$ が[上の中心電荷付きOPE](#def-qft51-stress-ope)を満たし、入れ子輪郭を特異点を横切らずに変形できると仮定する。このとき輪郭モードは

$$
[L_m,L_n]=(m-n)L_{m+n}
+\frac{c}{12}(m^3-m)\delta_{m+n,0},
\qquad m,n\in\mathbb Z
$$

> を満たす。実自由bosonでは $c=1$。これは相関関数上の局所的な交換子の導出であり、すべての抽象Virasoro表現の存在定理ではない。
<!-- formal-statement-end -->

### 証明の見取り図

内側の輪郭差は $z=w$ のOPEの留数だけを囲みます。四次極は三階導関数、二次極は一階導関数、単純極は値を与えます。その後、外側の $w$ 積分で $\partial t$ を部分積分します。

<!-- proof-start -->
### 証明

動径順序を入れ替えた二つの二重積分の差は、$z$ の円を $w$ の周りの小円へ縮めた留数で表せます。従って

$$
[L_m,L_n]
=\frac1{2\pi i}\oint_w dw\,w^{n+1}
\operatorname{Res}_{z=w}
\bigl[z^{m+1}t(z)t(w)\bigr].
$$

OPEの各極に[Cauchyの高階導関数公式](../../../解析系/CA/CA3/index.md#thm-ca3-cauchy-derivatives)を $z^{m+1}$ へ適用します。整数 $m$ が負でも、$w\ne0$ の小円上で局所的に微分できるので

$$
\begin{aligned}
\operatorname{Res}_{z=w}\frac{z^{m+1}}{(z-w)^4}
&=\frac{(m+1)m(m-1)}{6}w^{m-2},\\
\operatorname{Res}_{z=w}\frac{z^{m+1}}{(z-w)^2}
&=(m+1)w^m,\\
\operatorname{Res}_{z=w}\frac{z^{m+1}}{z-w}&=w^{m+1}.
\end{aligned}
$$

従って内側の積分は

$$
\frac{c}{12}(m^3-m)w^{m-2}
+2(m+1)w^m t(w)+w^{m+1}\partial t(w).
$$

外側で $\oint w^{m+n+2}\partial t\,dw=-(m+n+2)\oint w^{m+n+1}t\,dw$（閉曲線上の全微分の積分は零）なので、$t$ の係数は

$$
2(m+1)-(m+n+2)=m-n.
$$

中心項の外側の積分は $\oint w^{m+n-1}dw/(2\pi i)=\delta_{m+n,0}$。これらを合わせて主張を得ます。
<!-- proof-end -->

**小さい部分代数の検算。** $m,n\in\{-1,0,1\}$ では $m^3-m=0$ なので、$L_{-1},L_0,L_1$ の間には中心項が現れません。これは[QFT50の古典的な三つのWitt生成子](../QFT50/index.md#prop-qft50-witt)に対応します。しかし

$$
[L_2,L_{-2}]=4L_0+\frac c2,
$$

なので $c=1$ は全体のLie代数の交換関係を本当に変えます。

## 5. 中心項は局所変換の三階微分に現れる

一つの $t$ 挿入点 $w$ の周りで[輪郭電荷](../QFT50/index.md#def-qft50-contour-charge)を用い、正則な $\epsilon$ による微小変換を考えると、四次極から新しい項が出ます。記法の対応は

$$
\epsilon'(w)=\partial_w\epsilon(w),\qquad
\epsilon'''(w)=\partial_w^3\epsilon(w),\qquad
\partial t(w)=\partial_w t(w)
$$

です。左の二つは $\bar w$ を固定した変換パラメータの正則微分、右端は場の挿入点に作用する微分です。

<a id="cor-qft51-stress-ward"></a>

<!-- formal-statement-start -->
> **系（応力テンソルの局所量子Ward作用）**  
> [中心電荷付きOPE](#def-qft51-stress-ope)が成立し、$w$ の小円内部に他の挿入点がなく、$\epsilon$ がその近傍で正則なら、輪郭電荷の局所作用は

$$
\delta_\epsilon t(w)
=\epsilon(w)\partial t(w)+2\epsilon'(w)t(w)
+\frac{c}{12}\epsilon'''(w).
$$

> 実自由bosonでは $c=1$。有限変換に伴う追加項や大域的状態の変換をこの式だけから無条件に同一視しない。
<!-- formal-statement-end -->

### 証明の見取り図

輪郭に $\epsilon(z)$ を入れて三種類の極を積分し、$\epsilon'''/3!$、$\epsilon'$、$\epsilon$ を読みます。

<!-- proof-start -->
### 証明

$z=w$ の周りで $\epsilon(z)=\epsilon(w)+\epsilon'(w)(z-w)+\epsilon''(w)(z-w)^2/2+\epsilon'''(w)(z-w)^3/6+\cdots$ を代入します。$\epsilon t(z)t(w)$ の留数は四次極から $(c/2)\epsilon'''/6=(c/12)\epsilon'''$、二次極から $2\epsilon't$、単純極から $\epsilon\partial t$ です。$\epsilon$ が小円内で正則なので他に極はありません。
<!-- proof-end -->

$\epsilon=1,z,z^2$ は三階導関数が零で、これも $L_{-1},L_0,L_1$ に中心項がないことと符合します。量子異常は**古典保存則がすべて壊れる**という意味ではなく、局所的な積の正則化から作用の中心拡張が生じるという意味です。

## 演習：収縮の本数から中心拡張まで

### 演習 QFT51-A1：Green核の二度の微分

- Level: A
- 問題: $G(z,w)=-(2g)^{-1}\log(\mu^2|z-w|^2)$ に対し、$z\ne w$ で $\partial_zG$ と $\partial_w\partial_zG$ を求めよ。$\mu$ に依存するか。

**詳細解答**：$\partial_z\log|z-w|^2=1/(z-w)$ より $\partial_zG=-1/[2g(z-w)]$。$\partial_w(z-w)^{-1}=+(z-w)^{-2}$ なので $\partial_w\partial_zG=-1/[2g(z-w)^2]$。$\mu$ は対数の定数項にしか現れず両微分で消えます。$\partial_z^2$ と混同すると符号を誤ります。

### 演習 QFT51-A2：正規順序の自己収縮

- Level: A
- 問題: $\langle J(z)J(w)\rangle=K(z-w)$ のGaussian場について、$\langle:J^2:(w)\rangle$ と相異なる $w,u,v$ における $\langle:J^2:(w)J(u)J(v)\rangle$ を求めよ。

**詳細解答**：点分離では $\langle J(z)J(w)-K(z-w)\rangle=0$。四点関数を三対合へ分けると $K(z-w)K(u-v)+K(z-u)K(w-v)+K(z-v)K(w-u)$。ここから自己収縮の第一項を引き、$z\to w$ とすると残り二項はともに $K(w-u)K(w-v)$。結論は $0$ と $2K(w-u)K(w-v)$ です。

### 演習 QFT51-A3：$tJ$ の極とウェイト

- Level: A
- 問題: $t=-g:J^2:$、$K=-1/[2g(z-w)^2]$ から $t(z)J(w)$ の二次極・一次極を求め、$J$ の正則ウェイトを判定せよ。

**詳細解答**：二つの $J(z)$ のうち一方を外側の $J(w)$ と収縮する選択は2通りです。従って

$$
-2gK(z-w)J(z)=\frac{J(z)}{(z-w)^2}.
$$

$J(z)=J(w)+(z-w)\partial J(w)+\cdots$ を代入して

$$
\frac{J(w)}{(z-w)^2}+\frac{\partial J(w)}{z-w}
$$

を得ます。[一次場Ward核](../QFT50/index.md#thm-qft50-primary-ward)の二次極係数から正則ウェイトは1、単純極から微分項の係数も一致することを確かめられます。

### 演習 QFT51-A4：二重収縮の数

- Level: A
- 問題: $:J(z)^2::J(w)^2:$ の二重収縮が何通りか数え、$t(z)t(w)$ の四次極係数を求めよ。

**詳細解答**：最初の $J(z)$ の相手は $w$ 側に2通り、残る組は1通りなので二重収縮は $2!=2$ 通りです。応力テンソル二つの係数は $(-g)^2=g^2$ だから

$$
2g^2K^2=\frac{2g^2}{4g^2(z-w)^4}=\frac1{2(z-w)^4}.
$$

四次極の一般係数 $c/2$ と比較すると $c=1$ です。

### 演習 QFT51-A5：輪郭留数の三種類

- Level: A
- 問題: $m\in\mathbb Z$、$w\ne0$ とし、$z^{m+1}/(z-w)^k$ の $z=w$ の留数を $k=1,2,4$ で求めよ。

**詳細解答**：[Cauchy高階導関数公式](../../../解析系/CA/CA3/index.md#thm-ca3-cauchy-derivatives)を $f(z)=z^{m+1}$ に適用します。次数に応じた留数は

$$
\begin{aligned}
k=1 &: \quad f(w)=w^{m+1},\\
k=2 &: \quad f'(w)=(m+1)w^m,\\
k=4 &: \quad \frac{f'''(w)}{3!}=\frac{(m+1)m(m-1)}6w^{m-2}.
\end{aligned}
$$

$m$ が負でも $w\ne0$ の小円上では $f$ が正則なので適用できます。

### 演習 QFT51-B1：単一収縮から二つの極

- Level: B
- 問題: 四点Wick展開の単一収縮が4通りであることを確認し、$-2g(z-w)^{-2}:J(z)J(w):$ から $t(z)t(w)$ の二次極と単純極を再導出せよ。

**詳細解答**：両側にある2本から1本ずつ選ぶので、単一収縮は $2\times2=4$ 通りです。$u=z-w$ とおくと

$$
4g^2K(u)=-\frac{2g}{u^2},\qquad
:J(w+u)J(w):=:J(w)^2:+u:\partial J(w)J(w):+O(u^2).
$$

従って特異項は

$$
-\frac{2g:J^2:}{u^2}-\frac{2g:\partial J\,J:}{u}
=\frac{2t}{u^2}+\frac{\partial t}{u}.
$$

最後の単純極で使った積の微分は $\partial:J^2:=2:\partial J\,J:$ です。

### 演習 QFT51-B2：中心項の積分を最後まで追う

- Level: B
- 問題: $t(z)t(w)$ の四次極が $c/[2(z-w)^4]$ とする。$[L_m,L_n]$ への寄与を入れ子輪郭で計算し、$m+n=0$ のときだけ残ることを示せ。

**詳細解答**：内側の輪郭で重み $z^{m+1}$ を三度微分して $3!$ で割ると

$$
\frac{c}{12}(m+1)m(m-1)w^{m-2}
$$

を得ます。外側で $w^{n+1}$ を掛けると指数は $m+n-1$。留数があるのはこの指数が $-1$、すなわち $m+n=0$ のときだけです。最終的な中心項は

$$
\frac c{12}(m^3-m)\delta_{m+n,0}.
$$

$m=0,\pm1$ では三次多項式が零になることも直接検算できます。

### 演習 QFT51-B3：Witt部分と二つの具体的交換子

- Level: B
- 問題: $2t/(z-w)^2+\partial t/(z-w)$ が $[L_m,L_n]$ に与える係数を求め、$[L_1,L_{-1}]$、$[L_2,L_{-2}]$ を $c=1$ で書け。

**詳細解答**：内側留数は $2(m+1)w^m t+w^{m+1}\partial t$。外側で $w^{n+1}$ を掛けます。後者は閉曲線の部分積分で $-(m+n+2)L_{m+n}$、前者は $2(m+1)L_{m+n}$ なので、合計

$$
[2(m+1)-(m+n+2)]L_{m+n}=(m-n)L_{m+n}.
$$

中心項も加えると、二つの具体例は

$$
[L_1,L_{-1}]=2L_0,\qquad
[L_2,L_{-2}]=4L_0+\frac{8-2}{12}=4L_0+\frac12.
$$

前者では $1^3-1=0$ のため中心項が消えています。

### 演習 QFT51-B4：中心電荷の足し算と独立性

- Level: B
- 問題: 二成分を同時Gaussianとし、異なる成分間の二点収縮が零である実自由boson $\phi_1,\phi_2$ が、それぞれ $g_a>0$ の作用を持つとする。応力テンソルは

  $$
  t=-\sum_{a=1}^2g_a:(\partial\phi_a)^2:
  $$

  とする。この四次極を計算し、$g_1\ne g_2$ でも結果が変わらない理由を述べよ。

**詳細解答**：$J_a=\partial\phi_a$、$K_a(z-w)=\langle J_a(z)J_a(w)\rangle$ と置きます。同時Gaussian性のもとでは、異なる成分間の二点収縮が零ならWick展開に混合対合が生じず、二成分は独立です。[QFT19のboson Wick対合](../QFT19/index.md#thm-qft19-boson-wick)を成分付きで用いると（$\delta_{ab}$ はKroneckerのデルタ）

$$
\langle J_a(z)J_b(w)\rangle
=-\frac{\delta_{ab}}{2g_a(z-w)^2},\qquad
2g_a^2K_a(z-w)^2=\frac1{2(z-w)^4}.
$$

異なる成分間の二重収縮は $\delta_{12}=0$ で消えます。同じ成分の二重収縮を $a=1,2$ で足すと

$$
\frac1{2(z-w)^4}+\frac1{2(z-w)^4}
=\frac1{(z-w)^4}=\frac{c/2}{(z-w)^4},
\qquad c=2.
$$

$g_a$ が消えるのは、各成分で二本の収縮が $g_a^{-2}$ を与え、応力テンソル二つの $g_a^2$ と相殺するためです。

### 演習 QFT51-C1：Green核から量子Ward作用まで

- Level: C
- 問題: 二次元自由実bosonの $S_E=(g/4\pi)\int|\nabla\phi|^2d^2x$ と、零モードを除去した平面真空を仮定する。次を出発点から一続きに検証せよ。

1. Gaussian逆核から $K(z-w)$ を求め、$t=-g:J^2:$ を点分離で定める理由を説明する。
2. $t(z)t(w)$ の四次・二次・一次極をすべて求め、$c$ を決める。
3. 輪郭モード $L_n$ の交換子を計算し、$[L_2,L_{-2}]$ を明示する。
4. 正則な $\epsilon(z)=z^3$ の局所作用 $\delta_\epsilon t(w)$ を求め、古典的な一次場Ward作用と異なる項を説明する。

**詳細解答**：

1. **逆核と点分離。** 部分積分した作用の二次形式と、円周の流束から得る分布恒等式は

   $$
   S_E=\frac12\int\phi\,\frac{g}{2\pi}(-\Delta)\phi\,d^2x,
   \qquad \Delta\log|z-w|^2=4\pi\delta^{(2)}(z-w).
   $$

   したがって逆核と二点収縮は

   $$
   G(z,w)=-\frac1{2g}\log(\mu^2|z-w|^2),\qquad
   K(z-w)=\partial_w\partial_zG=-\frac1{2g(z-w)^2}.
   $$

   二つの微分は、別々の挿入点に作用させました。

   $$
   \partial_z\log|z-w|^2=\frac1{z-w},\qquad
   \partial_w(z-w)^{-1}=(z-w)^{-2}.
   $$

   二次極を持つ積をそのまま対角へ送れないため、[点分離正規順序](#def-qft51-wick-stress)で収縮 $K$ を引きます。真空期待値を取ると $\langle J(z)J(w)-K(z-w)\rangle=0$ となり、極限でも $\langle:J^2:\rangle=0$ です。
2. **二重・単一収縮。** [Wick対合公式](../QFT19/index.md#thm-qft19-boson-wick)で二重収縮は2通り、単一収縮は4通りです。従って

   $$
   :J(z)^2::J(w)^2:
   =:J(z)^2J(w)^2:+4K(z-w):J(z)J(w):+2K(z-w)^2.
   $$

   $t(z)t(w)=g^2:J(z)^2::J(w)^2:$ の四次極は $2g^2K^2=1/[2(z-w)^4]$ です。単一収縮では $4g^2K=-2g/(z-w)^2$。全正規順序を $z=w$ の周りで展開して

   $$
   \begin{aligned}
   -\frac{2g}{(z-w)^2}:J(z)J(w):
   &=-\frac{2g:J(w)^2:}{(z-w)^2}
     -\frac{2g:\partial J(w)J(w):}{z-w}+O(1)\\
   &=\frac{2t(w)}{(z-w)^2}+\frac{\partial t(w)}{z-w}+O(1).
   \end{aligned}
   $$

   ここで $\partial t=-2g:\partial J\,J:$ です。ゆえに四次極の係数 $c/2=1/2$ から $c=1$ となります。
3. **モード交換子。** $w\ne0$ で $z^{m+1}$ に[Cauchy高階導関数公式](../../../解析系/CA/CA3/index.md#thm-ca3-cauchy-derivatives)を適用すると、内側の輪郭の留数は

   $$
   \frac{m^3-m}{12}w^{m-2}
   +2(m+1)w^mt(w)+w^{m+1}\partial t(w).
   $$

   外側で $w^{n+1}$ を掛けて積分すると、第一項は $(m^3-m)\delta_{m+n,0}/12$。最後の項は閉曲線上の部分積分により $-(m+n+2)L_{m+n}$ となります。残る項は $2(m+1)L_{m+n}$ なので

   $$
   [L_m,L_n]=(m-n)L_{m+n}
   +\frac{m^3-m}{12}\delta_{m+n,0},
   \qquad [L_2,L_{-2}]=4L_0+\frac12.
   $$

4. **局所Ward作用。** $\epsilon(w)=w^3$、$\epsilon'(w)=3w^2$、$\epsilon'''(w)=6$。[応力テンソルの局所Ward作用](#cor-qft51-stress-ward)へ代入して

   $$
   \delta_\epsilon t(w)=w^3\partial t(w)+6w^2t(w)+\frac12
   $$

   を得ます。最初の二項はウェイト2の一次場の変換と同形ですが、最後の $1/2$ は $t(z)t(w)$ の二重収縮が作った中心項です。古典的なWitt括弧や $J$ の一次場Ward核だけではこの定数項を導けません。

## この章で確認したこと

自由bosonの二点収縮の係数から、量子応力テンソルの $t(z)t(w)$ に四次極が生まれ、実自由boson一成分の中心電荷は $c=1$ と決まりました。輪郭積分で四次極を三階導関数へ翻訳すると、古典Witt代数が中心拡張されたVirasoro代数になります。次には、この代数が状態・演算子・子孫場へどう作用するかを学ぶ準備が整いました。
