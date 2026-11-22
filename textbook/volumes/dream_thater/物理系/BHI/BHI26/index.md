# BHI26 Page転移と複数鞍点の比較

## 1. 端点を解いた後で、どの枝を使うか

[BHI25の二浴JT模型](../BHI25/index.md#def-bhi25-equilibrium-model)では、island端点を空間方向と時間方向に変分する式を得ました。しかし、その停留解を見つけただけでは放射エントロピーは決まりません。islandを入れない候補もあり、両者の**停留後の値**を比べる必要があります。ここでは、この二候補が競合すると放射のエントロピーが増大から飽和へ切り替わる過程を計算します。

比較する対象を最初に固定します。左右に平坦な透過浴を接合した**二側の永遠JTブラックホール**、質量零自由Dirac場（中心電荷 $c=N>0$）、Kruskal真空に対応する熱平衡状態を用います。観測領域 $R=R_L\cup R_R$ は両浴の半直線で、端点は同じ浴時刻 $t\ge0$ と空間座標 $b>0$ に置きます。$\kappa=2\pi T>0$、AdS半径 $\ell>0$、端点の**固有**cutoff $\epsilon_g,\epsilon_b>0$、地平線の幾何エントロピー $S_h>0$、繰り込み済みの端点定数 $S_0$ を固定します。自然対数で測り、$A=\kappa a$、$B=\kappa b$、$U=\kappa t_a$、$V=\kappa t$、$X=A+B$ とします。

両浴と両重力端点の位置・Kruskal状態はBHI25と同じです。有限時刻のisland端点には

$$
A>0,\qquad
F(A,U;V)=\cosh(A+B)-\cosh(U-V)>0
$$

を課します。後者は対象の光円錐間隔が空間的な実数領域にあることを保証します。ここでの模型は**出入りの流束が釣り合う定常系**であり、ブラックホール質量が減り続ける[BHI23の出射模型](../BHI23/index.md#def-bhi23-smooth-outgoing-map)とは状態も放射領域も違います。BHI23の式をそのままBHI25のisland枝から引くことはしません。

## 2. 同じ二浴模型で空island枝を作る

islandを空にした候補では、重力端点はありません。物質全体の純粋状態を仮定すると、二つの浴半直線のエントロピーは、その補集合を結ぶ二区間の代わりに**左右浴端点間の一つの区間**のエントロピーとして計算できます。ここで利用するのは[BHI24の共形真空区間公式](../BHI24/index.md#prop-bhi24-four-endpoint-entropy)と、BHI25で導入したKruskal座標です。

左右浴端点の光円錐差の積と各端点の座標Jacobianは、それぞれ

$$
D_{bb}=4e^{2B}\cosh^2 V,\qquad
\left|\frac{\partial w^\pm}{\partial\sigma}\right|_b=\kappa e^B
$$

です。浴側のWeyl因子は1なので、固有cutoff $\epsilon_b$ を使った無次元の区間長は

$$
\frac{\sqrt{D_{bb}}}{\kappa e^B\epsilon_b}
=\frac{2\cosh V}{\kappa\epsilon_b}.
$$

<a id="prop-bhi26-empty-two-bath"></a>

<!-- formal-statement-start -->
> **命題（二浴平衡模型の空islandエントロピー）**
>
> 第1節の二側永遠JT＋二浴・自由DiracのKruskal真空を取り、全物質状態が純粋で、左右浴半直線の補集合について真空区間のtwist相関が利用できると仮定する。端点の局所繰り込み規約を固定した空island候補のエントロピーは
>
$$
\boxed{\displaystyle
S_{\varnothing}(V)=\frac c3
\ln\frac{2\cosh V}{\kappa\epsilon_b}.}
$$
>
> $V\ge0$ では
>
$$
\frac{dS_{\varnothing}}{dV}=\frac c3\tanh V,\qquad
\frac{d^2S_{\varnothing}}{dV^2}=\frac c3\operatorname{sech}^2V>0.
$$
>
> 特に $V\to+\infty$ で
>
$$
S_{\varnothing}(V)=\frac c3V+
\frac c3\ln\frac1{\kappa\epsilon_b}
+\frac c3\ln(1+e^{-2V}).
$$
<!-- formal-statement-end -->

### 証明の見取り図

光円錐差、二端点の座標cutoff、浴のWeyl因子を同じ規約で割ります。区間長の対数に $c/3$ を掛けた後、$\cosh V$ を微分します。

<!-- proof-start -->
### 証明

左右浴端点の座標をBHI25の左右Kruskal貼り合わせで書くと、光円錐差の積は $D_{bb}$ です。自由Dirac真空の一区間エントロピーは、端点の共通繰り込み定数を固定した規約で、区間長を両端の座標cutoffの幾何平均で割った対数に $c/3$ を掛けます。両端とも $\kappa e^B\epsilon_b$ なので、

$$
S_{\varnothing}(V)
=\frac c3\ln\frac{\sqrt{4e^{2B}\cosh^2V}}
{\kappa e^B\epsilon_b}
=\frac c3\ln\frac{2\cosh V}{\kappa\epsilon_b}.
$$

$\partial_V\ln\cosh V=\tanh V$、$\partial_V\tanh V=\operatorname{sech}^2V$ です。また $2\cosh V=e^V(1+e^{-2V})$ を代入すれば最後の表示が従います。$\square$
<!-- proof-end -->

**直接確認**：$c=\kappa=1$、$\epsilon_b=10^{-2}$ なら $S_{\varnothing}(0)=\tfrac13\ln200\simeq1.76611$。同じ固定cutoffで $V=8$ に進むと $S_{\varnothing}(8)\simeq4.20172$ です。$\epsilon_g$ と $S_0$ は空候補に現れません。空候補には変分すべきisland端点自体がありません。

## 3. 島の候補集合：極値化と比較を分ける

islandを入れた場合は、幾何項 $2S_0+2S_h\coth A$ と四端点Dirac相関を足します。[BHI25の一般化エントロピーと停留方程式](../BHI25/index.md#prop-bhi25-thermal-functional)を**同じ状態・同じ固有cutoffで**使うと

$$
\begin{aligned}
S_I(A,U;V)
={}&2S_0+2S_h\coth A\\
&+\frac c3\ln\frac{2\ell\cosh U\cosh V\,F}
{\kappa\epsilon_g\epsilon_b\sinh A\,C_-C_+},\\
C_\pm={}&\cosh\frac{A+B\pm(U+V)}2.
\end{aligned}
$$

ここで $S_I$ を最小化して端点を決めるのではありません。**まず** $\partial_A S_I=\partial_U S_I=0$ でQES候補を取り出し、その値だけを比較します。時間方向は一般に負の曲率を持ち、全座標での最小化は誤りです。

<a id="def-bhi26-extremized-branches"></a>

<!-- formal-statement-start -->
> **定義（同一模型の空枝と極値化済みisland枝）**
>
> 第1節の二浴JT模型のパラメータを固定し、各浴時刻 $V\ge0$ で、空枝を $S_{\varnothing}(V)$ とする。対称な**実数island停留候補集合**を
>
$$
\mathcal Q(V)=\left\{(A,U):
A>0,\ F(A,U;V)>0,\
\partial_A S_I=\partial_U S_I=0\right\}
$$
>
> と定める。$\mathcal Q(V)$ のうち条件を満たし、対象の近似で採用可能と判定した停留解 $(A_j(V),U_j(V))$ に対して、**極値化済みisland枝**を
>
$$
S_{I,j}^{\rm ext}(V)=S_I(A_j(V),U_j(V);V)
$$
>
> と呼ぶ。候補をすべて列挙し鞍点近似の採用条件が確定したときの形式的な枝選択は
>
$$
S_{\rm cand}(V)
=\min\left\{S_{\varnothing}(V),
S_{I,j}^{\rm ext}(V)\ :\ j\ {\rm admissible}\right\}
$$
>
> である。集合が空の場合は空枝だけを残す。この式は指定した対称・実数候補の比較規則であり、非対称・複素鞍点やレプリカ位相の完全な列挙を主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi26-extremized-branches -->
**定義の直接例**：$c=\kappa=\ell=1$、$S_h=1$、$S_0=0$、$B=\ln2$、$\epsilon_g=\epsilon_b=10^{-2}$、$V=12$ とします。BHI25の二つの停留方程式を同時に数値で解いた**後期枝**は

$$
A\simeq3.24129050,\qquad U-V\simeq4.56\times10^{-8}.
$$

$A>0$、$|U-V|<A+B$ なので $F>0$。二式の残差は表示桁を丸める前に $10^{-10}$ 未満です。この解の値と空枝の値は

$$
S_I^{\rm ext}(12)\simeq5.52568375,\qquad
S_{\varnothing}(12)\simeq5.53505673.
$$

よって、この二つの候補の間ではisland枝の値が小さい。一方、$V=8$ では同じ後期枝の値は約 $5.52568191$、空枝は約 $4.20172343$ で、空枝が小さい。有限時刻で $U=V$ と**置いてから**解いたのではありません。
<!-- definition-example-end -->

**集合が空になる場合**：[BHI25の初期時刻の反例](../BHI25/index.md#prop-bhi25-hessian-and-early-check)では $B=1,V=0$ の対称断面に停留解がありません。そこで後期根を $V=0$ に延長し「常に二枝が存在する」としてはいけません。定義にある admissible は、実数領域・停留性に加えて採用した近似が妥当であることを含みます。

## 4. 後期island枝の飽和値とPage交点

後期領域は $U,V\to+\infty$ で $U-V$ が有界かつ $U+V\gg A+B$ です。BHI25の[後期一意根](../BHI25/index.md#prop-bhi25-near-horizon-root)に従い、$q=e^{-A}$、$y=e^{-B}$ とすると

$$
12S_hq(1-qy)=c(y-q)(1-q^2),
\qquad 0<q<y<1.
$$

根を $q_*$、$A_*=-\ln q_*$ と書きます。後期には $U-V\to0$ ですが、これは**有限時刻の方程式を解いた後の極限**です。$U=V$ で評価した関数について、双曲線関数の積和公式から正確に

$$
\begin{aligned}
C_-C_+\big|_{U=V}
&=\frac{\cosh(A+B)+\cosh2V}{2},\\
\frac{\cosh^2V}{C_-C_+}\bigg|_{U=V}
&=\frac{\cosh2V+1}{\cosh2V+\cosh(A+B)}
\end{aligned}
$$

となります。これを使って、後期の候補値と有限時刻の誤差を分離します。

<a id="prop-bhi26-page-crossing"></a>

<!-- formal-statement-start -->
> **命題（後期のisland飽和値とPage交点）**
>
> 第1節の模型で $B,S_h,c>0$ を固定し、[BHI25の後期停留根](../BHI25/index.md#prop-bhi25-near-horizon-root) $A_*>B$ を使う。さらに、その点の対称二変数Hessianが非退化で、十分大きい $V$ で近傍に滑らかな実数停留枝があると仮定する。その枝のエントロピーは
>
$$
S_I^{\rm ext}(V)=K_*+O(e^{-2V}),
$$
>
> ただし固定した繰り込み規約での飽和値 $K_*$ は
>
$$
\boxed{\displaystyle
K_*=2S_0+2S_h\coth A_*
+\frac c3\ln\frac{2\ell[\cosh(A_*+B)-1]}
{\kappa\epsilon_g\epsilon_b\sinh A_*}.}
$$
>
> 後期近似で $S_{\varnothing}(V)=K_*$ が解を持つための必要十分条件は
>
$$
\frac{\kappa\epsilon_b}{2}e^{3K_*/c}\ge1.
$$
>
> このとき $V\ge0$ の交点候補は一つで
>
$$
\boxed{\displaystyle
V_{\rm P}^{\rm late}
=\operatorname{arcosh}
\left(\frac{\kappa\epsilon_b}{2}e^{3K_*/c}\right).}
$$
>
> この値が実際に**後期領域**にあり、候補がその近傍で許容され、他の支配的鞍点がない場合に限り、Page型転移の近似時刻となる。物理時刻は $t_{\rm P}=V_{\rm P}/\kappa$ である。
<!-- formal-statement-end -->

### 証明の見取り図

二変数の停留方程式をまず後期へ送り、[既出の一意根](../BHI25/index.md#prop-bhi25-near-horizon-root)を採用します。次に $U=V$ での値と後期極限値の差を明示し、非退化Hessianによる局所的な枝の継続で端点の移動の誤差を制御します。最後に空枝の $\cosh V$ を解きます。

<!-- proof-start -->
### 証明

[BHI25の二変数停留式](../BHI25/index.md#prop-bhi25-thermal-functional)を $U,V\to\infty$、$U-V$ 有界で極限へ送ります。時間方向の方程式は $\sinh(U-V)=0$ に帰着し、$F>0$ の実数領域から $U-V=0$。半径方向は本節冒頭の $q$ 方程式になります。BHI25の一意性の証明により $q_*\in(0,y)$ は一意です。

$U=V$ での値を $A$ の関数として厳密に書くと

$$
\begin{aligned}
S_I(A,V;V)
={}&K(A)
+\frac c3\ln\frac{\cosh2V+1}
{\cosh2V+\cosh(A+B)},\\
K(A)
={}&2S_0+2S_h\coth A\\
&+\frac c3\ln\frac{2\ell[\cosh(A+B)-1]}
{\kappa\epsilon_g\epsilon_b\sinh A}.
\end{aligned}
$$

実際、$F|_{U=V}=\cosh(A+B)-1$ を使い、$\cosh U\cosh V/(C_-C_+)$ を直前の比に置き換えました。$A=A_*$ と固定し、$z=[\cosh(A_*+B)-1]/[\cosh2V+1]>0$ とすると、第二項は $-(c/3)\ln(1+z)$ です。従って

$$
0\le K_*-S_I(A_*,V;V)
=\frac c3\ln(1+z)
\le\frac{2c}{3}[\cosh(A_*+B)-1]e^{-2V}.
$$

最後の不等号は $\ln(1+z)\le z$ と $\cosh2V+1\ge e^{2V}/2$ によります。さらに、有限時刻の停留方程式の誤差は $O(e^{-2V})$、極限の二変数Jacobian（Hessian）が非退化という仮定の下で陰関数定理を適用すると、近傍の実数停留解は

$$
A(V)=A_*+O(e^{-2V}),\qquad
U(V)-V=O(e^{-2V})
$$

を満たします。停留点なので、この移動に伴う関数値の一次変化は消えます。以上から $S_I^{\rm ext}(V)=K_*+O(e^{-2V})$ です。

一方、[空枝の命題](#prop-bhi26-empty-two-bath)より $S_{\varnothing}(V)=\frac c3\ln[2\cosh V/(\kappa\epsilon_b)]$。これを $K_*$ に等置し指数関数を取ると

$$
\cosh V=\frac{\kappa\epsilon_b}{2}e^{3K_*/c}.
$$

$\cosh V$ は $V\ge0$ で1から単調増加（$V>0$ で厳密増加）するので、右辺が1以上の場合だけ非負の解が存在し、それは表示した $\operatorname{arcosh}$ に等しい。$\square$
<!-- proof-end -->

**近似を使用する順序**：この命題は、任意の $V$ について $K_*$ を正式なisland鞍点と宣言していません。近地平線の小 $q$ 近似 $q_*\simeq cy/(12S_h)$ を使うなら、まず正確な一変数根からの差を調べてから、さらに $S_h/c\gg1$ へ進みます。$S_0$ と $\epsilon_g$ を別々に変更すると対数の差が変わるため、比較では**同じ繰り込み処方**を固定します。

## 5. 数値で交点と誤差を調べる

まず $c=\kappa=\ell=1$、$S_h=1$、$S_0=0$、$B=\ln2$、$\epsilon_g=\epsilon_b=10^{-2}$ とします。$S_h/c=1$ の**計算練習用模型**であり、大きな半古典パラメータの実験ではありません。後期一変数方程式を二分法で解くと

$$
q_*\simeq0.0391133886414,\quad
A_*\simeq3.24129045011,\quad
K_*\simeq5.52568375420.
$$

後期交点の解析式は $V_{\rm P}^{\rm late}\simeq11.97188107658$ です。有限時刻の二変数停留方程式を改めて解くと、交点は

$$
V_{\rm P}\simeq11.97188107463,\qquad
A(V_{\rm P})\simeq3.24129050,\quad
U(V_{\rm P})-V_{\rm P}\simeq4.84\times10^{-8}.
$$

両方の候補値は約 $5.52568375$ nat で一致します。差の絶対値は約 $2\times10^{-9}$（無次元時刻）で、後期近似の条件 $2V_{\rm P}\gg A_*+B$ と整合します。これらの数値は**指定した対称・実数後期枝の局所比較**であり、全鞍点の完全な探索結果ではありません。

| $V$ | 有限時刻の $A(V)$ | $U(V)-V$ | 空枝 $S_{\varnothing}$ | island停留枝 $S_I^{\rm ext}$ | 二候補の小さい値 |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 8 | 3.24143671 | $1.36\times10^{-4}$ | 4.20172343 | 5.52568191 | 4.20172343 |
| 10 | 3.24129313 | $2.49\times10^{-6}$ | 4.86839006 | 5.52568372 | 4.86839006 |
| 11.5 | 3.24129058 | $1.24\times10^{-7}$ | 5.36839006 | 5.52568375 | 5.36839006 |
| 11.9 | 3.24129051 | $5.57\times10^{-8}$ | 5.50172340 | 5.52568375 | 5.50172340 |
| 12 | 3.24129050 | $4.56\times10^{-8}$ | 5.53505673 | 5.52568375 | 5.52568375 |
| 13 | 3.24129046 | $6.17\times10^{-9}$ | 5.86839006 | 5.52568375 | 5.52568375 |
| 14 | 3.24129045 | $8.35\times10^{-10}$ | 6.20172340 | 5.52568375 | 5.52568375 |

表の作り方は、まず[一変数の後期根](../BHI25/index.md#prop-bhi25-near-horizon-root)を初期値とし、各 $V$ で**二変数の**[有限時刻停留式](../BHI25/index.md#prop-bhi25-thermal-functional)を解き、$F>0$ と二式の残差を確認してから関数値を比較する、という順序です。参照実装 [page_transition_reference.py](page_transition_reference.py) は数表と交点を再計算し、任意で枝のグラフを描けます。出力する折線は近傍で**増加枝からほぼ水平な枝へ**切り替わります。

**誤差の実数評価**：この数値例の $X_*=A_*+B\simeq3.93444$ では、$V=12$ における前命題の $\ln(1+z)$ の上界は $10^{-8}$ より小さい。実際、$S_I(A_*,12;12)$ と $K_*$ の差は約 $6.2\times10^{-10}$ nat です。根のずれも考慮した有限時刻の $S_I^{\rm ext}$ の差を数値で確認すると、後期近似を交点の近傍で使用する根拠になります。単に二本の曲線が交差する絵を描くだけでは、この確認にはなりません。

## 6. Page型の折れ目：連続でも傾きは変わる

二つの滑らかな枝を小さい方へ切り替えると、交点でエントロピーの値は連続ですが、傾きは一致するとは限りません。実際の停留枝の微分で、端点が動く項をどう扱うかを確認します。

<a id="prop-bhi26-page-kink"></a>

<!-- formal-statement-start -->
> **命題（枝選択による折れ目と勾配）**
>
> 第3節の二候補 $S_{\varnothing}$ と $S_I^{\rm ext}$ が区間内で滑らかであり、$S_I^{\rm ext}$ が $(A(V),U(V))$ における二変数停留値であるとする。両枝が時刻 $V_{\rm P}>0$ で交差し、その前では空枝、後ではisland枝が小さいなら、候補の小さい方を選ぶ曲線は交点で連続である。その片側微分は
>
$$
\begin{aligned}
\left.\frac{dS_{\rm cand}}{dV}\right|_{V_{\rm P}-0}
&=\frac c3\tanh V_{\rm P},\\
\left.\frac{dS_{\rm cand}}{dV}\right|_{V_{\rm P}+0}
&=\left.\partial_VS_I(A,U;V)\right|_{\rm QES}.
\end{aligned}
$$
>
> 後期の条件が適用できる場合、前者は $c/3+O(e^{-2V_{\rm P}})$、後者は $O(e^{-2V_{\rm P}})$ である。従ってこの近似で増大枝から飽和枝への**折れ目**が現れる。
<!-- formal-statement-end -->

### 証明の見取り図

端点を固定した偏微分と、端点が時刻とともに動く全微分を区別します。QESでは空間・時間の一次変分が零なので、包絡線の微分には外部時刻 $V$ の偏微分だけが残ります。

<!-- proof-start -->
### 証明

$S_I^{\rm ext}(V)=S_I(A(V),U(V);V)$ を連鎖律で微分すると

$$
\frac{d S_I^{\rm ext}}{dV}
=\underbrace{\partial_AS_I}_{=0}\frac{dA}{dV}
+\underbrace{\partial_US_I}_{=0}\frac{dU}{dV}
+\partial_VS_I
=\partial_VS_I.
$$

$F=\cosh X-\cosh(U-V)$、$C_\pm=\cosh[(X\pm(U+V))/2]$ なので

$$
\partial_V\ln F=\frac{\sinh(U-V)}F,\qquad
\partial_V\ln(C_-C_+)=\frac{T_+-T_-}{2},
$$

ただし $T_\pm=\tanh[(X\pm(U+V))/2]$。従って

$$
\boxed{\displaystyle
\partial_VS_I
=\frac c3\left\{
\tanh V+\frac{\sinh(U-V)}F-\frac{T_+-T_-}{2}
\right\}.}
$$

後期では $U-V=O(e^{-2V})$、$\tanh V=1+O(e^{-2V})$、$T_+\to1$、$T_-\to-1$ で、残りは $O(e^{-2V})$ です。一方、空枝の傾きは第2節の命題より $(c/3)\tanh V$。交点の左右で選ぶ関数が変わり、交点で値が一致するので連続です。片側微分はそれぞれの枝の微分で、後期では上のように違います。$\square$
<!-- proof-end -->

より一般に、交差近傍の差 $\Delta(V)=S_I^{\rm ext}(V)-S_{\varnothing}(V)$ が $\Delta'(V)\le-m<0$ を満たし、近似による候補値の誤差が $|\delta S_I|\le\eta$ であるなら、平均値の定理により交点時刻の誤差は局所的に高々 $\eta/m$ です。**勾配差が小さいと交点時刻の誤差は増幅**されるので、値の誤差だけで転移時刻を判断しません。

## 7. 複数鞍点と模型の境界

一般のisland公式の記号 $\min\operatorname{ext}$ は「まず停留候補を作り、その後で候補の値を比べる」という順序を表します。第3節の $\mathcal Q(V)$ に複数の実数根があれば、各根で $S_I$ を評価して比較します。これは**空候補＋一つのisland候補という二枝模型**より候補数が多い場合の規則でもあります。定義域端や停留条件を満たさない点の値を混ぜてはいけません。

[BHI25の二次変分の命題](../BHI25/index.md#prop-bhi25-hessian-and-early-check)で、後期の空間方向は正、時間方向は負になり得ると分かっています。「時間方向に最大なので採用不能」も「全変数で最小なので採用」とも言えません。重力レプリカでどの鞍点が実際に寄与し、いつ支配が切り替わるかを示すには、作用・境界条件・解析接続が必要です。これらは後の[BHI28〜BHI30](../../../../../../dream-theater-series/BHI.yaml)で扱う課題であり、本講の**候補の比較**だけでレプリカ経路積分を導出したことにはなりません。

また、ここで得たのは**熱平衡系のPage型曲線**で、後期island値がほぼ一定のため、増大から飽和へ折れます。最終的に放射の精細エントロピーが減って零へ向かう**完全蒸発のPage曲線**と同じではありません。時間依存するエネルギー収支と地平線エントロピーを追うBHI27で、この差を扱います。

## 8. 演習：交点を自力で再構成する

すべて自然対数を使います。断りがなければ第1節の二浴JT・自由Dirac模型を使い、$B>0$ と局所cutoffは固定します。途中で $U=V$ と置けるのは、**明示した後期極限**の評価だけです。

### Level A：二つの枝を別々に作る

<a id="ex-bhi26-a01"></a>

#### BHI26-A01 空枝のJacobianとWeyl因子

- Level: A
- 問題: $D_{bb}=4e^{2B}\cosh^2V$、浴端点のJacobianが $\kappa e^B$、Weyl因子が1であるとする。固有cutoff $\epsilon_b$ の自由Dirac一区間公式から $S_{\varnothing}(V)$ を導け。

<!-- solution-start -->
**詳細解答。** 光円錐距離積の正の平方根は $2e^B\cosh V$。左右端点の座標cutoffの幾何平均は $\kappa e^B\epsilon_b$ です。よって比は

$$
\frac{2e^B\cosh V}{\kappa e^B\epsilon_b}
=\frac{2\cosh V}{\kappa\epsilon_b}.
$$

[空枝の命題](#prop-bhi26-empty-two-bath)に使った自由Diracの一区間公式では対数の係数は $c/3$ なので、

$$
S_{\varnothing}(V)=\frac c3\ln\frac{2\cosh V}{\kappa\epsilon_b}.
$$

$e^B$ が残らないこと、重力側の $\epsilon_g$ が出ないことを確認します。
<!-- solution-end -->

<a id="ex-bhi26-a02"></a>

#### BHI26-A02 空枝の勾配と後期誤差

- Level: A
- 問題: $V\ge0$ で $S_{\varnothing}'(V)$ を求め、直線 $(c/3)[V+\ln(1/(\kappa\epsilon_b))]$ との差が非負で $(c/3)e^{-2V}$ 以下であることを示せ。

<!-- solution-start -->
**詳細解答。** $\ln\cosh V$ を微分すると

$$
S_{\varnothing}'(V)=\frac c3\tanh V.
$$

$2\cosh V=e^V(1+e^{-2V})$ だから、指定直線との差は

$$
\frac c3\ln(1+e^{-2V}).
$$

$e^{-2V}>0$ と $\ln(1+x)\le x$（$x\ge0$）から

$$
0\le\frac c3\ln(1+e^{-2V})\le\frac c3e^{-2V}.
$$

直線近似には端点cutoff由来の定数を残す必要があります。
<!-- solution-end -->

<a id="ex-bhi26-a03"></a>

#### BHI26-A03 定義域と停留条件

- Level: A
- 問題: $A=3$、$B=1$、$V=5$ とする。$U=7$ と $U=10$ はどちらが実数island候補の定義域内か判定し、定義域内であることだけでQESと呼べるか説明せよ。

<!-- solution-start -->
**詳細解答。** $X=A+B=4$ で、$F=\cosh4-\cosh(U-5)$ です。$\cosh$ は非負の引数で増加するので

$$
U=7:\quad |U-V|=2<4\ \Longrightarrow\ F>0,
$$

$$
U=10:\quad |U-V|=5>4\ \Longrightarrow\ F<0.
$$

前者だけがこの定義域に入ります。ただし[停留候補の定義](#def-bhi26-extremized-branches)は $\partial_A S_I=\partial_U S_I=0$ も要求します。$F>0$ のみではQESになりません。
<!-- solution-end -->

<a id="ex-bhi26-a04"></a>

#### BHI26-A04 有限時刻の等時刻代入の誤り

- Level: A
- 問題: BHI25の時間方向の停留式を $U=V$ に代入し、有限時刻で残る項を求めよ。$V=0$、$X>0$ のとき、この残差は零か。

<!-- solution-start -->
**詳細解答。** [時間停留式](../BHI25/index.md#prop-bhi25-thermal-functional)は

$$
\frac3c\partial_U S_I
=\tanh U-\frac{\sinh(U-V)}F+\frac{T_--T_+}{2}.
$$

$U=V$ では中央項が零で、$T_-=\tanh(X/2-V)$、$T_+=\tanh(X/2+V)$ です。従って残差は

$$
\tanh V+
\frac{\tanh(X/2-V)-\tanh(X/2+V)}2.
$$

$V=0$ では二つの $\tanh(X/2)$ が打ち消し合い、残差は零です。ただし時間微分が零でも**半径方向**の停留条件が残るため、初期QESの存在は従いません。一般の有限 $V$ ではこの残差は零ではありません。
<!-- solution-end -->

<a id="ex-bhi26-a05"></a>

#### BHI26-A05 後期交点が存在する条件

- Level: A
- 問題: $K_*$ を一定とした近似で $S_{\varnothing}(V)=K_*$、$V\ge0$ が解を持つ条件と解の数を示せ。

<!-- solution-start -->
**詳細解答。** [空枝の命題](#prop-bhi26-empty-two-bath)を代入して

$$
\ln\frac{2\cosh V}{\kappa\epsilon_b}=\frac{3K_*}{c}
\quad\Longleftrightarrow\quad
\cosh V=\frac{\kappa\epsilon_b}{2}e^{3K_*/c}.
$$

$\cosh V$ は $V\ge0$ で1から増加します。右辺が1未満なら解なし、1なら $V=0$ に一つ、1を超えれば $V>0$ に一つです。後期であることは別途検査が必要です。
<!-- solution-end -->

### Level B：極値化・誤差・候補選択を結ぶ

<a id="ex-bhi26-b01"></a>

#### BHI26-B01 一変数根から飽和エントロピーへ

- Level: B
- 問題: $c=\kappa=\ell=1$、$S_h=1$、$S_0=0$、$B=\ln2$、$\epsilon_g=\epsilon_b=10^{-2}$ とする。$q\in(0,1/2)$ の後期停留方程式を作り、$q_*\simeq0.0391133886414$ を用いて $A_*$、$K_*$、$V_{\rm P}^{\rm late}$ を計算せよ。

<!-- solution-start -->
**詳細解答。** $y=e^{-B}=1/2$ を[後期根の方程式](../BHI25/index.md#prop-bhi25-near-horizon-root)に代入すると

$$
12q(1-q/2)=(1/2-q)(1-q^2).
$$

解は指定された $q_*$ で、$A_*=-\ln q_*\simeq3.24129045011$。これを[飽和値の命題](#prop-bhi26-page-crossing)へ代入すると

$$
K_*
=2\coth A_*+\frac13
\ln\frac{2[\cosh(A_*+\ln2)-1]}
{10^{-4}\sinh A_*}
\simeq5.52568375420.
$$

次に $\cosh V=(10^{-2}/2)\exp(3K_*)$ なので

$$
V_{\rm P}^{\rm late}
=\operatorname{arcosh}(0.005e^{3K_*})
\simeq11.97188107658.
$$

$2V_{\rm P}^{\rm late}\simeq23.94$ は $A_*+B\simeq3.93$ より十分大きく、この数値例で後期近似を確認できます。
<!-- solution-end -->

<a id="ex-bhi26-b02"></a>

#### BHI26-B02 有限時刻補正の上界

- Level: B
- 問題: $U=V$ での評価関数と後期関数 $K(A)$ の差を正確に書き、$V\ge0$ における誤差の上界を導け。さらに $V=12$、$A=3.24129045011$、$B=\ln2$、$c=1$ で評価せよ。

<!-- solution-start -->
**詳細解答。** 第4節の恒等式を使い、

$$
K(A)-S_I(A,V;V)
=\frac c3\ln\left(
1+\frac{\cosh(A+B)-1}{\cosh2V+1}
\right).
$$

$z>0$ に対する $\ln(1+z)\le z$ を使うと

$$
0\le K(A)-S_I(A,V;V)
\le\frac c3\frac{\cosh(A+B)-1}{\cosh2V+1}
\le\frac{2c}{3}[\cosh(A+B)-1]e^{-2V}.
$$

指定値では $A+B\simeq3.93444$、この上界は約 $1.2\times10^{-9}$ nat、実際の対数差は約 $6.2\times10^{-10}$ nat です。**これは $U=V$ で評価した関数の誤差**です。真の有限時刻停留値との差を述べるにはHessian非退化と二変数停留解の連続性が別途必要です。
<!-- solution-end -->

<a id="ex-bhi26-b03"></a>

#### BHI26-B03 包絡線微分と折れ目

- Level: B
- 問題: $S_I(A(V),U(V);V)$ で $\partial_AS_I=\partial_US_I=0$ が成り立つとする。全微分を書き、後期の空枝・island枝の傾きを導け。$V_{\rm P}>0$ での値の連続性も説明せよ。

<!-- solution-start -->
**詳細解答。** 連鎖律は

$$
\frac{dS_I^{\rm ext}}{dV}
=\partial_AS_I\,A'(V)+\partial_US_I\,U'(V)+\partial_VS_I.
$$

停留条件で最初の二項が零になります。[枝選択の命題](#prop-bhi26-page-kink)の $\partial_VS_I$ に $U-V=O(e^{-2V})$、$T_+\to1$、$T_-\to-1$ を入れると

$$
\frac{dS_I^{\rm ext}}{dV}=O(e^{-2V}).
$$

[空枝の命題](#prop-bhi26-empty-two-bath)からは

$$
\frac{dS_{\varnothing}}{dV}
=\frac c3\tanh V=\frac c3+O(e^{-2V}).
$$

交点では双方の**値**が等しく、左右から同じ値へ近づきます。従って小さい方を選ぶ関数は連続ですが、後期なら傾きは一般に異なります。
<!-- solution-end -->

### Level C：一つの模型のPage型転移を監査する

<a id="ex-bhi26-c01"></a>

#### BHI26-C01 二浴JTのPage型曲線を構成する

- Level: C
- 問題: B01と同じパラメータを使う。以下を順に確認せよ。
  1. 空枝の式と $V=10,12,14$ の値を求めよ。
  2. 二変数停留式で後期island根を検査し、後期飽和値・交点を求めよ。
  3. 各時刻で二候補の小さい方を選び、交点の左右の傾きを比較せよ。
  4. その結果が**完全蒸発の情報回復**を証明しない理由を、状態・近似・鞍点の三点から説明せよ。

<!-- solution-start -->
**詳細解答。** **1. 空枝**：左右浴端点を結ぶKruskal距離とcutoffの比は $2\cosh V/0.01$ です。[空枝の命題](#prop-bhi26-empty-two-bath)より

$$
S_{\varnothing}(V)=\frac13\ln(200\cosh V).
$$

これを代入すると

$$
S_{\varnothing}(10)\simeq4.86839006,\quad
S_{\varnothing}(12)\simeq5.53505673,\quad
S_{\varnothing}(14)\simeq6.20172340.
$$

**2. islandの停留**：$q$ は

$$
12q(1-q/2)=(1/2-q)(1-q^2)
$$

の $0<q<1/2$ にある根で、$q_*\simeq0.0391133886414$、$A_*\simeq3.24129045011$ です。有限時刻には[BHI25の二連立式](../BHI25/index.md#prop-bhi25-thermal-functional)を $A_*,U=V$ から始めて再度解きます。$V=12$ なら $A\simeq3.24129050$、$U-V\simeq4.56\times10^{-8}$ で、$F>0$ です。飽和値は

$$
K_*\simeq5.52568375420,\qquad
V_{\rm P}^{\rm late}\simeq11.97188107658.
$$

**3. 比較と傾き**：$V=10$ では空枝の $4.86839006$ がisland枝の約 $5.52568372$ より小さく、$V=12,14$ ではisland枝が小さい。選択値はそれぞれ

$$
S_{\rm cand}(10)\simeq4.86839006,\quad
S_{\rm cand}(12)\simeq5.52568375,\quad
S_{\rm cand}(14)\simeq5.52568375.
$$

交点の前では $\tfrac13\tanh V_{\rm P}\simeq\tfrac13$、後では停留値の包絡線微分はほぼ0です。物理時刻での傾きにはさらに $\kappa$ を掛けます。

**4. 適用範囲**：状態は熱平衡Hartle–Hawking状態で蒸発するブラックホールではなく、終期で地平線エントロピーが零へ向かう模型でもありません。計算には自由Diracのtwist相関、cutoff一致、後期極限、対称実数QESへの制限が入ります。また別の非対称・複素鞍点や重力レプリカの支配性を列挙していないため、複数鞍点の完全な経路積分を証明していません。従ってこれは**指定模型のPage型増大・飽和**の再構成であり、完全蒸発のユニタリ性や実際の復号の証明ではありません。
<!-- solution-end -->

## 9. まとめと次講への接続

空枝には端点変分がなく、$S_{\varnothing}(V)$ は熱平衡模型で増大します。island枝は**二変数で極値化した後**の $S_I^{\rm ext}(V)$ を使い、後期にはほぼ定数 $K_*$ へ近づきます。二候補の値を比較すると、その競合によるPage型の交点・折れ目・数値誤差まで計算できます。ここでの飽和は静的な二浴模型の結論です。次のBHI27では、境界軌道とエネルギー流を時間依存させ、**実際に蒸発するJT模型**で何が変わるかを調べます。
