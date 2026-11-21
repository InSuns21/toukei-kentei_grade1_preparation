# BHI24 island候補と一般化エントロピー

<!-- definition-example-audit: strict -->

## 1. 浴だけを数えた計算に、重力側の候補領域を加える

[BHI23のislandなしの枝](../BHI23/index.md#prop-bhi23-hawking-branch)では、透過的な浴の放射領域 $R$ に限って物質の精細エントロピーを計算しました。浴の相関は放射の増加を表しますが、それだけでは重力領域に蓄えられた相関を数えていません。放射領域に対する別の候補を作るには、重力側の空間領域 $I$ も物質エントロピーを計算する領域に含め、増やした境界の重力的な寄与も足します。この $I$ が **island候補** です。

[BHI17の重力・浴の設定](../BHI17/index.md#def-bhi17-radiation-ledger)と[HOLO24の一般化エントロピー](../../HOLO/HOLO24/index.md#def-holo24-generalized-entropy)をつなぎます。本講の作業は **領域の指定 → 物質の四端点相関 → 重力端点の寄与 → 両項の和** です。端点の極値条件を解くのはBHI25、停留後の枝の競合を判定するのはBHI26で扱います。

二次元では空間断面は一次元であり、余次元2の曲面は点です。したがって $I$ に端点が二つあれば、重力項も二点分を加えます。これは面積項の二次元版である[BHI20のdilatonエントロピー](../BHI20/index.md#prop-bhi20-entropy)を候補端点へ評価する操作です。平坦な浴と曲がった重力領域を同じ座標で扱うには、以下の局所的な**共形接合座標**と正則化を固定します。

## 2. 観測区間とisland候補の端点を固定する

まず時間 $\tau$ の空間断面に共通の座標 $y$ を取り、重力側を $y<0$、平坦浴を $y>0$ と記します。この座標で物質の計量が

$$
ds^2=e^{2\omega(\tau,y)}(-d\tau^2+dy^2)
$$

と書ける範囲を考えます。$\omega$ は実数値の共形因子の対数です。浴の共形因子を $1$ とする規格化では $\omega=0$ が浴側で成り立ちます。接合が物理的に実現するためには、[BHI22の誘導計量と透過条件](../BHI22/index.md#def-bhi22-cutoff-gluing)も必要です。座標を形式的に貼っただけでは、重力の場の方程式や接合条件を満たすとは限りません。

この断面で重力側の閉区間 $I=[y_1,y_2]$、浴の閉区間 $R=[y_3,y_4]$ を考えます。以下は境界での重複を避けて

$$
y_1<y_2<0<y_3=b<y_4=L,\qquad
\delta=y_3-y_2>0
$$

とします。図式として左から $y_1$、$y_2$、接合面 $0$、$b$、$L$ の順です。$I$ はまだ変分していない**候補**です。$\partial I=\{Q_1,Q_2\}$ の二点は座標 $(\tau,y_1),(\tau,y_2)$ を持ちます。

量子場の局所領域は[BHI15の因数分解の注意](../BHI15/index.md#def-bhi15-algebraic-entropy)に照らし、ここでは固定cutoffで部分系を指定できる模型を採用します。両側に同じ物質CFTが透過的に延長され、同じ半古典状態 $\omega_{\rm m}$ の制限を $I$、$R$、$I\cup R$ に取れると仮定します。状態の指定を別々の無関係な密度行列に取り替えてはなりません。

<a id="def-bhi24-island-candidate"></a>

<!-- formal-statement-start -->
> **定義（接合浴に対する二端点island候補）**
>
> 二次元の重力領域と非重力浴が、共通の空間的断面、透過する物質状態 $\omega_{\rm m}$ と正のcutoff $a$ を共有するとする。座標 $y$ と時刻 $\tau_*$ を取り、重力領域・浴と二つの区間を次のように指定する。
>
$
\begin{gathered}
G=\{y<0\},\qquad B=\{y>0\},\qquad R=[b,L],\\
y_1<y_2<0<b<L,\qquad I=[y_1,y_2].
\end{gathered}
$
>
> $I$ が $R$ と同じ空間的断面上にあり、両端点で物質の正則化とdilaton値が定義できるとき、これを **二端点island候補**とする。端点集合は次の通りである。
>
$
\partial I=\{Q_1,Q_2\},\qquad Q_j=(\tau_*,y_j).
$
>
> 空の候補 $I=\varnothing$ は別枝として許す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi24-island-candidate -->
**定義の確認**：$\tau_*=0$、$I=[-4,-2]$、$R=[1,5]$、$a=10^{-2}$ とし、接合面を $y=0$ に置きます。$-4<-2<0<1<5$ で、区間は互いに交わらず、どちらも同じ空間断面上です。端点は $Q_1=(0,-4),Q_2=(0,-2)$ の二点、区間長は $\ell_I=2$、$\ell_R=4$、間隔は $\delta=3$ です。状態を同じ共形真空からの制限と指定し、各端点に物理的cutoff $a=0.01\ll2,3,4$ を課せば、物質の縮約領域も指定できます。dilatonが両点で有限と仮定すれば定義の候補条件を満たします。これは**位置と計算可能性の確認**であり、JT場の方程式やQES停留条件を解いた例ではありません。
<!-- definition-example-end -->

## 3. 四端点を結び付ける交差比

[BHI18の二端点CFT公式](../BHI18/index.md#prop-bhi18-conformal-bath)は、**一つ**の区間の真空相関なら長さと両端のcutoffから求められると教えました。$I\cup R$ は二つの離れた区間です。四端点のtwist演算子の相関には、中心電荷から決まらない情報が一つ残ります。

それを記述するため、区間の長さと間隔を

$$
\ell_I=y_2-y_1,\quad
\ell_R=y_4-y_3,\quad
\delta=y_3-y_2
$$

とします。四点の並びから作られる**交差比**は、長さの単位に依存しない無次元の量です。

<a id="def-bhi24-cross-ratio"></a>

<!-- formal-statement-start -->
> **定義（island・放射の交差比）**
>
> 一つの空間断面上で $y_1<y_2<y_3<y_4$ を満たす四つの実数を取る。$I=[y_1,y_2]$ と $R=[y_3,y_4]$ の交差比を
>
$$
x=\frac{(y_2-y_1)(y_4-y_3)}
{(y_3-y_1)(y_4-y_2)}
=\frac{\ell_I\ell_R}{(\ell_I+\delta)(\ell_R+\delta)}
$$
>
> とする。$0<x<1$ であり、両区間を固定したまま $\delta\to\infty$ なら $x\to0$ となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi24-cross-ratio -->
**定義の確認**：先の $(-4,-2,1,5)$ を代入します。$\ell_I=2$、$\ell_R=4$、$\delta=3$ なので

$$
x=\frac{2\cdot4}{(2+3)(4+3)}=\frac8{35},
\qquad 1-x=\frac{27}{35}>0.
$$

分母と分子の差は $(\ell_I+\delta)(\ell_R+\delta)-\ell_I\ell_R
=\delta(\ell_I+\ell_R+\delta)>0$ であり、$0<x<1$ を直接検証できます。座標を一斉に $y\mapsto\lambda y+\mu$（$\lambda>0$）と変えると分子・分母に $\lambda^2$ が掛かり、交差比は変わりません。
<!-- definition-example-end -->

交差比の出現は「四点なら全部分かる」という意味ではありません。二点相関を二組掛けた値で四点相関を割った**残りの関数**を、各CFT・状態ごとに決めなければなりません。

## 4. 四点相関から物質エントロピーを作る

共通の共形真空を $(\tau,y)$ 座標で指定し、等時刻四端点ではスピンなしtwist演算子の四点関数を使用できると仮定します。左右の中心電荷を $c=\bar c>0$、整数 $n>1$ に対するtwistの全スケーリング次元を

$$
\Delta_n=\frac c{12}\left(n-\frac1n\right)
$$

とします。[BHI18で用いたtwist相関と端点尺度](../BHI18/index.md#prop-bhi18-conformal-bath)の延長ですが、二端点公式をそのまま四端点へ積の形で転用することはできません。

物理的な短距離cutoffは各端点で同じ長さ $a>0$ とします。計量が $e^{2\omega_j}$ 倍なら、座標長でのcutoffは

$$
\epsilon_j=a e^{-\omega_j},\qquad
\omega_j:=\omega(\tau_*,y_j).
$$

単一区間 $[y_i,y_j]$ の相関には $\sqrt{\epsilon_i\epsilon_j}$ が入り、すなわち

$$
S_{\rm matter}^{(a)}([y_i,y_j])
=\frac c3\ln\frac{y_j-y_i}{a}
+\frac c6(\omega_i+\omega_j)+k+o(1)
$$

です。$k$ は**同一CFT・真空・端点処方**での一組の端点定数です。半直線の反射境界CFTの式ではなく、透過的に延長された全直線の真空を使っています。

四点関数の比を、整数 $n>1$ について

$$
\mathcal F_n(x):=
\frac{\operatorname{Tr}(\rho_{I\cup R}^{\,n})}
{\operatorname{Tr}(\rho_I^{\,n})\operatorname{Tr}(\rho_R^{\,n})}
$$

と定めます。正規化された状態で $n=1$ に連続に延長できれば $\mathcal F_1(x)=1$ です。**ここでの $\mathcal F_n$ はこの比で定めた関数**であり、別の四点関数のprefactorを取り出して定義される同名関数と取り違えません。有限cutoff補正を除くCFTスケーリング領域では共形不変性により $x$ の関数となります。解析接続を $n=1$ の近傍まで行い、その微分とcutoff極限を交換できることは追加の仮定です。

<a id="prop-bhi24-four-endpoint-entropy"></a>

<!-- formal-statement-start -->
> **命題（共形真空における二つの区間の物質エントロピー）**
>
> $y_1<y_2<y_3<y_4$、$a\ll\min(\ell_I,\ell_R,\delta)$、$c=\bar c>0$ の二次元CFTを取る。同一の共形真空、透過的な全直線への延長、同じ物理的cutoff $a$、四端点で滑らかな正の共形因子、レプリカの $n\to1$ 解析接続と微分可能性を仮定する。四点相関の比 $\mathcal F_n(x)$ に対し
>
$$
\mathcal I(x):=\left.\partial_n\ln\mathcal F_n(x)\right|_{n=1}
$$
>
> と置けば、スケーリング領域での普遍項と共通端点定数は
>
$$
\boxed{\displaystyle
S_{\rm matter}^{(a)}(I\cup R)
=\frac c3\ln\frac{\ell_I\ell_R}{a^2}
+\frac c6\sum_{j=1}^{4}\omega_j+2k-\mathcal I(x)+o(1).
}
$$
>
> さらに、同一正則化の下で $\mathcal I(x)$ は次の相互情報量の有限な普遍部分である。
>
$
\mathcal I(x)
=S_{\rm matter}(I)+S_{\rm matter}(R)
 -S_{\rm matter}(I\cup R).
$
>
> 一般のCFTでは $\mathcal I(x)$ は中心電荷のみで決まらない。
<!-- formal-statement-end -->

### 証明の見取り図

二つの単一区間それぞれには既習の二点公式を使えます。四点相関と二点相関の積の比を残し、レプリカ微分で相互情報量を取り出します。各端点の共形因子は四点と二点の比では相殺され、最終的なエントロピーには各端点一回ずつ現れます。

<!-- proof-start -->
### 証明

まず[単一区間の共形エントロピー公式](../BHI18/index.md#prop-bhi18-conformal-bath)へ、長さ $\ell_I=y_2-y_1$、端点cutoff $\epsilon_1,\epsilon_2$ と $\ell_R=y_4-y_3$、cutoff $\epsilon_3,\epsilon_4$ をそれぞれ代入します。$-\partial_n\ln\operatorname{Tr}\rho_X^n|_1=S(X)$ なので、

$$
\begin{aligned}
S(I)&=\frac c3\ln\frac{\ell_I}{a}+\frac c6(\omega_1+\omega_2)+k+o(1),\\
S(R)&=\frac c3\ln\frac{\ell_R}{a}+\frac c6(\omega_3+\omega_4)+k+o(1).
\end{aligned}
$$

レプリカの比の**定義**から、同じ正則化で

$$
\ln\operatorname{Tr}\rho_{I\cup R}^{\,n}
=\ln\operatorname{Tr}\rho_I^{\,n}
+\ln\operatorname{Tr}\rho_R^{\,n}
+\ln\mathcal F_n(x).
$$

両辺を $n=1$ で微分し符号を反転させると

$$
S(I\cup R)=S(I)+S(R)
-\left.\partial_n\ln\mathcal F_n(x)\right|_{n=1}.
$$

共形四点関数を二つの二点関数で割ると、各twistが持つ共形変換のJacobianと局所cutoff因子は分子分母で相殺し、残りは四点の交差比 $x$ の関数です（その関数値はCFTの演算子内容・状態が決めます）。各単一区間の式を加えて代入すると、表示した結果を得ます。物理的cutoffを変えても相互情報量の局所端点項は同じ処方内で相殺します。ただし有限な極限が存在することと解析接続の制御は命題の仮定です。$\square$
<!-- proof-end -->

相互情報量が現れることは、$I$ と $R$ を一緒に数える意味を表しています。独立でない区間について $S(I\cup R)=S(I)+S(R)$ としてしまうと、islandを採用する動機となる相関を最初から消すことになります。[BHI5で用いた相互情報量](../BHI5/index.md#thm-bhi5-correlation-gap)を、今回は離れた空間区間へ適用しています。

## 5. 計算できる物質CFTの例と、できない一般化

自由な質量零Dirac場の無限直線真空は、特別に二区間の相互情報量を閉じた式で求められる例です。この節だけは $c=\bar c=1$ とし、同じ相関・cutoff・状態を使います。この自由場の既知の多区間結果によれば、

$$
\mathcal I_{\rm Dirac}(x)=-\frac13\ln(1-x).
$$

この**自由Dirac場に固有の結果**は [Casini–Huerta, *Remarks on the Entanglement Entropy for Disconnected Regions*](https://doi.org/10.1088/1126-6708/2009/03/048) の多区間公式を二区間へ適用したものです。一般CFTの普遍公式としては使いません。

具体的に $y_1=-4,y_2=-2,y_3=1,y_4=5$ なら

$$
x=\frac8{35},\qquad
\mathcal I_{\rm Dirac}
=-\frac13\ln\frac{27}{35}
=\frac13\ln\frac{35}{27}\simeq0.0864\ {\rm nat}.
$$

そこで端点のWeyl係数を $e^{\omega_1}=2,e^{\omega_2}=3$、浴側を $e^{\omega_3}=e^{\omega_4}=1$ と仮に指定すると

$$
\begin{aligned}
S_{\rm matter}^{(a)}(I\cup R)
&=\frac13\ln\frac8{a^2}
+\frac16\ln6+2k-\frac13\ln\frac{35}{27}+o(1),\\
S_{\rm matter}^{(a)}(I)
&=\frac13\ln\frac2a+\frac16\ln6+k+o(1),\\
S_{\rm matter}^{(a)}(R)
&=\frac13\ln\frac4a+k+o(1).
\end{aligned}
$$

両単一区間の和から二区間の式を引くと $a$、$k$、Weyl項が消えて $\frac13\ln(35/27)$ が残ります。$y_1,y_2$ のWeyl係数とdilatonをここで自由に選んだのは、**端点項の帳簿を検算する運動学的な例**であり、与えた係数がJTの場の方程式と接合条件を同時に満たすとは主張しません。

この例から別の相関の近似も理解できます。$x\ll1$ の自由Dirac場では

$$
-\ln(1-x)=x+\frac{x^2}{2}+O(x^3),
\qquad
\mathcal I_{\rm Dirac}(x)=\frac x3+\frac{x^2}{6}+O(x^3).
$$

一般のCFTでは小さい $x$ での最初の冪や係数も変わり得ます。温度、反射境界、非自明な共形写像、時間の異なる端点を導入した場合は、同じ等時刻の真空公式をそのまま使わず、状態に対応した四点相関を再計算する必要があります。

## 6. JTの重力端点を足した一般化エントロピー

[HOLO24の一般化エントロピーの定義](../../HOLO/HOLO24/index.md#def-holo24-generalized-entropy)では、幾何項と物質エントロピーを**同じ面・同じ状態・整合する正則化**で足します。[BHI20のJTエントロピー](../BHI20/index.md#prop-bhi20-entropy)に合わせ、$G_2>0$、位相的な定数 $S_0=\Phi_0/(4G_2)$、各端点のdilaton $\Phi(Q_j)$ を使います。二端点islandに対する幾何項は

$$
A_{\rm JT}(\partial I)
=\sum_{j=1}^{2}\left(S_0+\frac{\Phi(Q_j)}{4G_2}\right)
=2S_0+\frac{\Phi(Q_1)+\Phi(Q_2)}{4G_2}.
$$

ここで $S_0$ は**各端点当たり**の位相的寄与を表す規約です。物質による局所UV発散を重力結合の反項へ吸収する厳密な扱いは[HOLO24の形状変分を含む繰り込み](../../HOLO/HOLO24/index.md#prop-holo24-cutoff-variation)に従います。以下の表示は、共通cutoff $a$ で整合させた有効結合・端点定数の台帳です。$a$ のみを変えて重力項と物質の端点処方を固定したまま物理量の不変性を主張しません。

<a id="def-bhi24-jt-island-ledger"></a>

<!-- formal-statement-start -->
> **定義（JT浴模型のisland候補の一般化エントロピー）**
>
> [二端点island候補](#def-bhi24-island-candidate) $I=[y_1,y_2]$ と浴領域 $R=[b,L]$、同じ半古典物質状態、整合したcutoff・重力有効作用・端点処方を固定する。$G_2>0$ と $S_0$、各端点のdilatonを用い、
>
$$
\boxed{\displaystyle
S_{\rm gen}^{(a)}[I;R]
=2S_0+\frac{\Phi(Q_1)+\Phi(Q_2)}{4G_2}
+S_{\rm matter}^{(a)}(I\cup R)+S_{\rm loc}^{(a)}[\partial I].
}
$$
>
> とする。$S_{\rm loc}^{(a)}$ は必要な局所端点項・反項であり、既に各有効結合に吸収した規約では零と記す。空の候補には重力端点項を足さず、
>
$
S_{\rm gen}^{(a)}[\varnothing;R]=S_{\rm matter}^{(a)}(R)
$
>
> とする。**候補の値**を定義したのであり、極値・支配鞍点はまだ指定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi24-jt-island-ledger -->
**定義の確認**：第5節の運動学的な自由Dirac例で、$G_2=1/2$、$S_0=1$、$\Phi(Q_1)=8$、$\Phi(Q_2)=12$、$S_{\rm loc}=0$ と規約を固定します。$4G_2=2$ なので各端点は $1+8/2=5$ と $1+12/2=7$、合計 $12$ です。$a=10^{-2}$、共通定数を $k=0$ とした規格化なら、

$$
S_{\rm gen}^{(a)}[I;R]
=12+\frac13\ln80000+\frac16\ln6-\frac13\ln\frac{35}{27}
\simeq15.975\ {\rm nat}.
$$

空の候補は $S_{\rm gen}^{(a)}[\varnothing;R]=\frac13\ln400+k\simeq1.997\ {\rm nat}$ です。異なる候補の比較には物質・重力の**共通処方**が必要であり、この数値は任意に与えた背景データでの評価であって、islandが支配する物理的JT解ではありません。
<!-- definition-example-end -->

幾何的な入力をJTの定常解へ接続することもできます。[BHI20の静的外部パッチ](../BHI20/index.md#def-bhi20-static-patch)で $\ell,a_{\Phi},G_2,r_h>0$、$r_1,r_2>r_h$ に候補端点を置くと、$\Phi(r_j)=a_{\Phi}r_j/\ell$ です。従って

$$
A_{\rm JT}
=2S_0+\frac{a_{\Phi}(r_1+r_2)}{4G_2\ell}.
$$

例えば $\ell=a_{\Phi}=r_h=1$、$r_1=2,r_2=3$、$G_2=1/2$、$S_0=1$ なら $A_{\rm JT}=2+(2+3)/2=9/2$ です。これは**真空JT解の幾何項**の計算です。実際の $S_{\rm matter}(I\cup R)$ を求めるには、これらの点から共通共形座標への変換、浴との接合、状態の四点関数をさらに入れる必要があります。

<a id="prop-bhi24-assembled-ledger"></a>

<!-- formal-statement-start -->
> **命題（共通cutoffで組み立てたisland枝）**
>
> [四端点の物質エントロピー命題](#prop-bhi24-four-endpoint-entropy)と[JT浴模型の一般化エントロピー](#def-bhi24-jt-island-ledger)の条件を満たし、局所端点項を有効結合に吸収した同一規約を用いる。このときisland候補に対応するスケーリング領域の値は
>
$$
\boxed{\displaystyle
S_{\rm gen}^{(a)}[I;R]
=2S_0+\frac{\Phi(Q_1)+\Phi(Q_2)}{4G_2}
+\frac c3\ln\frac{\ell_I\ell_R}{a^2}
+\frac c6\sum_{j=1}^4\omega_j+2k-\mathcal I(x)+o(1).
}
$$
>
> 特に同じ状態・cutoffで空の候補を評価すれば、
>
$$
S_{\rm gen}^{(a)}[I;R]-S_{\rm gen}^{(a)}[\varnothing;R]
=A_{\rm JT}(\partial I)+S_{\rm matter}^{(a)}(I)-\mathcal I(x).
$$
<!-- formal-statement-end -->

### 証明の見取り図

二つの端点のdilaton値へ物質の四点公式を足します。空の候補では物質領域が $R$ だけに戻るので、差を取る際に浴区間の寄与は消え、追加した重力項・island単区間の項・二領域の相関項だけが残ります。

<!-- proof-start -->
### 証明

[一般化エントロピーの定義](#def-bhi24-jt-island-ledger)において $S_{\rm loc}=0$ と表す**整合した規約**を選び、[四端点公式](#prop-bhi24-four-endpoint-entropy)を $S_{\rm matter}(I\cup R)$ に代入します。これが第一式です。次に空の候補には $A_{\rm JT}=0$ を課すので

$$
\begin{aligned}
S_{\rm gen}[I;R]-S_{\rm gen}[\varnothing;R]
&=A_{\rm JT}+S_{\rm matter}(I\cup R)-S_{\rm matter}(R)\\
&=A_{\rm JT}+
  [S_{\rm matter}(I)+S_{\rm matter}(R)-\mathcal I(x)]
  -S_{\rm matter}(R)\\
&=A_{\rm JT}+S_{\rm matter}(I)-\mathcal I(x).
\end{aligned}
$$

二段目は**同じ状態で定義した**相互情報量の式であり、相関のない別状態へ置き換えていません。$R$ の二端点のcutoff項が相殺する一方、$I$ に新しく生じた端点の発散は重力側の局所端点項・結合と一体で扱う必要があります。$\square$
<!-- proof-end -->

この差の式は二つの候補を比べる**算術的な恒等式**です。実際の放射エントロピーを右辺の小さい方と宣言するには、各候補でQES条件を解き、レプリカ鞍点の選択条件を確かめなければなりません。

## 7. 候補を置くこととQESであることは違う

[HOLO24のQES](../../HOLO/HOLO24/index.md#def-holo24-qes)は、一般化エントロピーが許容される独立な法線変位のすべてに対して停留する曲面です。二次元の端点 $(t_j,y_j)$ には時間・空間方向の二つの自由度があり、等時刻断面で座標 $y_j$ だけを動かした停留性は完全なQES条件とは限りません。ここでは時刻を固定して候補値を**評価**しただけです。

特に $I=[y_1,y_2]$ を決めてから $S_{\rm gen}(I)$ を一度計算しただけでは、次はまだ成立しません。

- $Q_1,Q_2$ がQESであること（独立な法線方向の一次変分が必要）。
- その候補が同じ境界条件・トポロジーの他の鞍点より支配的であること。
- 放射の精細エントロピーが既にPage曲線へ移行したこと。
- 浴から内部の情報を効率よく復号できること。

**反例の仕組み**：$S_{\rm gen}(y)=S_*+(y-y_*)^2+\lambda(y-y_*)$（$\lambda\ne0$）を、ある許容端点変位 $y$ についての局所模型とします。$y=y_*$ は二次の幾何項だけなら停留しますが、$dS_{\rm gen}/dy=2(y-y_*)+\lambda$ なのでそこでは $\lambda\ne0$。物質相関に由来する一次項を無視することが失敗原因です。実際の停留位置は $y=y_*-\lambda/2$ となります。**この一次元の計算が、二つの時間・空間方向の変分全体を代行するわけではありません。**

## 8. 本講の計算台帳

| 何を数えるか | 入力 | 得られるもの |
| --- | --- | --- |
| islandなし | $R$, 浴の状態, $a$ | [BHI23の浴のみの枝](../BHI23/index.md#prop-bhi23-finite-interval) |
| 追加する領域 | $y_1<y_2<0<b<L$, 共通断面・状態 | $I$, $\partial I=\{Q_1,Q_2\}$ |
| 物質の二領域 | $c$, 四点相関, $\omega_j$, $a$, $\mathcal F_n(x)$ | $S_{\rm matter}(I\cup R)$ |
| 重力端点 | $S_0,G_2,\Phi(Q_1),\Phi(Q_2)$、局所反項 | $A_{\rm JT}(\partial I)$ |
| 一般化エントロピー | 直上の二項を同じ処方で加算 | $S_{\rm gen}[I;R]$、ただし未極値 |

参考：[Almheiriほか『The Entropy of Hawking Radiation』](https://doi.org/10.1103/RevModPhys.93.035002)、[Engelhardt–Wall『Quantum Extremal Surfaces』](https://arxiv.org/abs/1408.3203)、[Casini–Huertaの二領域相関](https://doi.org/10.1088/1126-6708/2009/03/048)。

## 9. 演習：四端点から重力の台帳まで

全問で対数は自然対数です。明記がなければ全端点は等時刻、同じCFT状態・正則化・端点定数を使用し、$a$ より十分大きい区間長と隙間を仮定します。

### Level A：候補・幾何・符号を確認する

<a id="ex-bhi24-a01"></a>

#### BHI24-A01 何がisland候補か

- Level: A
- 問題: 重力領域 $y<0$、浴 $y>0$、$R=[2,7]$ とする。$I_1=[-5,-1]$、$I_2=[-2,1]$、$I_3=[1,3]$ のうち、本講の二端点island候補の領域条件を満たすものを挙げ、端点を明示せよ（共通断面、正則化された物質状態は全候補で与えられる）。

<!-- solution-start -->
**詳細解答。** [候補の定義](#def-bhi24-island-candidate)は $y_1<y_2<0<b<L$ を要求します。$I_1$ は $-5<-1<0<2<7$ で端点は $Q_1=-5,Q_2=-1$、候補です。$I_2$ は上端 $1>0$ が浴に入るので失格です。$I_3$ は両端が浴にあり、しかも $[1,3]\cap[2,7]=[2,3]$ と重なるため失格です。いずれも位置条件の判定で、$I_1$ がQESと決まったわけではありません。
<!-- solution-end -->

<a id="ex-bhi24-a02"></a>

#### BHI24-A02 交差比の幾何

- Level: A
- 問題: $I=[-5,-3]$、$R=[1,4]$ の交差比 $x$ と $1-x$ を求め、$0<x<1$ を確かめよ。

<!-- solution-start -->
**詳細解答。** $\ell_I=-3-(-5)=2$、$\ell_R=4-1=3$、$\delta=1-(-3)=4$ です。[交差比の定義](#def-bhi24-cross-ratio)へ代入し、$x=2\cdot3/[(2+4)(3+4)]=6/42=1/7$、$1-x=6/7>0$。したがって $0<1/7<1$ です。端点を結ぶ長さの次元は分子分母で相殺します。
<!-- solution-end -->

<a id="ex-bhi24-a03"></a>

#### BHI24-A03 端点のWeyl係数

- Level: A
- 問題: 物理cutoff $a>0$、$\omega_1=\ln2,\omega_2=0$、単一区間長 $\ell_I=6$、$c=1$ とする。端点の座標cutoffと $S(I)$ の対数普遍項を求めよ。

<!-- solution-start -->
**詳細解答。** 物理長は $a=e^{\omega_j}\epsilon_j$ なので、$\epsilon_1=a/2$、$\epsilon_2=a$ です。[単一区間公式](../BHI18/index.md#prop-bhi18-conformal-bath)で端点の幾何平均cutoffは $\sqrt{\epsilon_1\epsilon_2}=a/\sqrt2$ となり、

$$
S(I)=\frac13\ln\frac{6}{a/\sqrt2}+k
=\frac13\ln\frac6a+\frac16\ln2+k.
$$

係数の正符号は、同じ物理cutoffならWeyl因子が大きい端点ほど座標cutoffが小さくなることによります。
<!-- solution-end -->

<a id="ex-bhi24-a04"></a>

#### BHI24-A04 重力項は何点分か

- Level: A
- 問題: $S_0=2,G_2=1/4,\Phi(Q_1)=3,\Phi(Q_2)=5$ の二端点候補について $A_{\rm JT}$ を計算せよ。空候補の幾何項も答えよ。

<!-- solution-start -->
**詳細解答。** $4G_2=1$ なので各端点は $S_0+\Phi(Q_j)/(4G_2)$ より $2+3=5$ と $2+5=7$。合計は $A_{\rm JT}=5+7=12$ です。[一般化エントロピーの定義](#def-bhi24-jt-island-ledger)では空の候補に端点がなく、幾何項は $0$ です。二端点なのに $S_0$ を一度だけ足すのは誤りです。
<!-- solution-end -->

<a id="ex-bhi24-a05"></a>

#### BHI24-A05 共通規約で相互情報量を求める

- Level: A
- 問題: 同じcutoffで $S(I)=5,S(R)=7,S(I\cup R)=9$ nat と計算された。相互情報量を求め、相互情報量が零の場合と比較せよ。

<!-- solution-start -->
**詳細解答。** [相互情報量の定義](../BHI5/index.md#thm-bhi5-correlation-gap)から $\mathcal I=S(I)+S(R)-S(I\cup R)=5+7-9=3$ nat。零なら独立性の判定には追加の条件が要りますが、少なくともこのエントロピーの等式では $S(I\cup R)=S(I)+S(R)=12$ nat になります。ここでは相関により二領域のエントロピーが3 nat小さくなっています。
<!-- solution-end -->

### Level B：CFTの相関と重力の値を接続する

<a id="ex-bhi24-b01"></a>

#### BHI24-B01 四端点レプリカの微分

- Level: B
- 問題: 同じ正則化の二領域で $\mathcal F_n(x)=\exp[(n-1/n)h(x)]$（$h(x)$ は $n$ に依存しない実関数）という四点対二点比が与えられた。$n=1$ の規格化、$\mathcal I(x)$、$S(I\cup R)$ を導け。

<!-- solution-start -->
**詳細解答。** $n=1$ では $n-1/n=0$ なので $\mathcal F_1=e^0=1$ です。対数を取ると $\ln\mathcal F_n=(n-n^{-1})h(x)$、したがって

$$
\partial_n\ln\mathcal F_n=(1+n^{-2})h(x),
\qquad \mathcal I(x)=2h(x).
$$

[四端点エントロピー命題](#prop-bhi24-four-endpoint-entropy)のレプリカ恒等式へ代入すれば $S(I\cup R)=S(I)+S(R)-2h(x)$。ここで $h(x)$ が常に非負という結論は、与えられた関数形だけでなく実際の正の状態の相互情報量条件に依存します。
<!-- solution-end -->

<a id="ex-bhi24-b02"></a>

#### BHI24-B02 自由Dirac場の距離依存

- Level: B
- 問題: 質量零自由Dirac真空の等長二区間を $I=[0,d]$、$R=[d+\delta,2d+\delta]$（$d,\delta>0$）とする。$x$ と $\mathcal I$ を求め、$\delta=d$ と $\delta\gg d$ を比較せよ。これは重力領域に置かれたislandの直接例ではなく、物質相関の検算である。

<!-- solution-start -->
**詳細解答。** $\ell_I=\ell_R=d$、隙間は $\delta$ なので[交差比の定義](#def-bhi24-cross-ratio)から $x=d^2/(d+\delta)^2$。自由Dirac真空の式を用い、

$$
\mathcal I=-\frac13\ln\left(1-\frac{d^2}{(d+\delta)^2}\right)
=\frac13\ln\frac{(d+\delta)^2}{\delta(2d+\delta)}.
$$

$\delta=d$ なら $\mathcal I=\frac13\ln(4/3)$ です。$\delta\gg d$ では $x=d^2/\delta^2+O(d^3/\delta^3)$、$-\ln(1-x)=x+O(x^2)$ だから

$$
\mathcal I=\frac{d^2}{3\delta^2}+O\left(\frac{d^3}{\delta^3}\right).
$$

離すと相関が小さくなります。反対に $\delta\lesssim a$ では分離端点の連続体スケーリング仮定が使えなくなります。
<!-- solution-end -->

<a id="ex-bhi24-b03"></a>

#### BHI24-B03 静的JTの端点項と差分

- Level: B
- 問題: $r_h=1,\ell=2,a_{\Phi}=3,G_2=1/2,S_0=1$ の[BHI20の静的JT解](../BHI20/index.md#def-bhi20-static-patch)で $r_1=2,r_2=4$ に端点を置く。$A_{\rm JT}$ を求めよ。また同じ状態・規約で $S(I)=6$、$\mathcal I(I:R)=4$ nat と指定された場合、空の候補との差を計算せよ。

<!-- solution-start -->
**詳細解答。** 両点は $r_j>r_h=1$ で静的外部パッチにあります。$\Phi(r_j)=a_{\Phi}r_j/\ell=3r_j/2$ から $\Phi_1=3,\Phi_2=6$。よって

$$
A_{\rm JT}=2S_0+\frac{\Phi_1+\Phi_2}{4G_2}
=2+\frac9{2}=\frac{13}{2}.
$$

[候補と空枝の差分命題](#prop-bhi24-assembled-ledger)へ代入すると

$$
S_{\rm gen}[I;R]-S_{\rm gen}[\varnothing;R]
=\frac{13}{2}+6-4=\frac{17}{2}\ {\rm nat}.
$$

空枝の値より大きいという**候補値の比較**はできますが、端点がQESであるとは示していません。また入力された $S(I)$ と相互情報量がこのJT背景の場の状態から得られるかも別途確認が要ります。
<!-- solution-end -->

<a id="ex-bhi24-b04"></a>

#### BHI24-B04 共通cutoffを崩すと何が壊れるか

- Level: B
- 問題: 二区間の物質エントロピーの単一区間項を $S(I)=\frac c3\ln(\ell_I/a_I)+k_I$、$S(R)=\frac c3\ln(\ell_R/a_R)+k_R$ とする。同じ正則化での相互情報量が $\mathcal I$ と分かっているとき、$S(I\cup R)$ を示せ。その後、$S(R)$ だけでcutoffを $a_R\to2a_R$ に変えて差を比較する操作が不正確な理由を式で説明せよ。

<!-- solution-start -->
**詳細解答。** 同じ規約での相互情報量恒等式から

$$
S(I\cup R)=\frac c3\ln\frac{\ell_I}{a_I}
+\frac c3\ln\frac{\ell_R}{a_R}+k_I+k_R-\mathcal I.
$$

共通規約なら $S(I\cup R)-S(R)=S(I)-\mathcal I$ と $R$ 由来の項が相殺します。しかし右辺の比較に使う $S(R)$ **だけ**を別のcutoff $2a_R$ で計算すると $S(R)'=S(R)-\frac c3\ln2$ となり、

$$
S(I\cup R)-S(R)'=S(I)-\mathcal I+\frac c3\ln2
$$

という人工的な差が残ります。端点定数もcutoff変更に応じて変わる規約なら、その変更も整合させる必要があります。重力側の反項まで含む絶対的な $S_{\rm gen}$ の比較は、より慎重に同一繰り込み規約を固定します。
<!-- solution-end -->

### Level C：定義・四点相関・JTの二端点を統合する

<a id="ex-bhi24-c01"></a>

#### BHI24-C01 island候補を一から組み立てる

- Level: C
- 問題: 共通等時刻の接合座標で $I=[-6,-3]$、$R=[2,8]$ を取り、物質を質量零自由Dirac真空 $c=1$ とする。物理cutoffは全端点 $a=10^{-2}$、$\omega_1=\ln2,\omega_2=\ln4,\omega_3=\omega_4=0$、共通の端点定数は $k=0$ と規格化する。重力側は $S_0=1,G_2=1/2,\Phi(Q_1)=4,\Phi(Q_2)=6$、局所端点項は重力有効結合へ吸収済みとする。
  1. 候補の幾何条件、$\ell_I,\ell_R,\delta,x$ を確かめよ。
  2. $S(I),S(R),\mathcal I$ と $S(I\cup R)$ を同じcutoffで計算せよ。
  3. 重力端点項と $S_{\rm gen}[I;R]$、空枝との差を計算せよ。
  4. この結果から「Page転移を証明した」「この端点がQES」と言えない理由を述べよ。与えた端点データは運動学的であり、JT場の方程式を解いたとは仮定しない。

<!-- solution-start -->
**詳細解答。** (1) $-6<-3<0<2<8$ なので同じ断面上の重力区間 $I$ と浴区間 $R$ は分離しています。$\ell_I=-3-(-6)=3$、$\ell_R=8-2=6$、$\delta=2-(-3)=5$ です。[交差比](#def-bhi24-cross-ratio)へ代入すると

$$
x=\frac{3\cdot6}{(3+5)(6+5)}
=\frac{18}{88}=\frac9{44},\qquad 1-x=\frac{35}{44}.
$$

$0<x<1$ であり、全長さ・間隔は $a=10^{-2}$ より十分大きいので、四端点のスケーリング計算を適用する条件を満たします。

(2) 端点の共形因子は $\omega_1+\omega_2=\ln8$、浴側は零です。[二端点エントロピー](../BHI18/index.md#prop-bhi18-conformal-bath)により

$$
S(I)=\frac13\ln\frac3a+\frac16\ln8,\qquad
S(R)=\frac13\ln\frac6a.
$$

自由Dirac真空の相互情報量は

$$
\mathcal I=-\frac13\ln(1-x)
=\frac13\ln\frac{44}{35}.
$$

よって[四端点の命題](#prop-bhi24-four-endpoint-entropy)を使い

$$
\begin{aligned}
S(I\cup R)
&=S(I)+S(R)-\mathcal I\\
&=\frac13\ln\frac{18}{a^2}
+\frac16\ln8-\frac13\ln\frac{44}{35}.
\end{aligned}
$$

ここでは $a$ の次元は区間座標と同じ長さで、対数の引数は無次元です。

(3) $4G_2=2$ なので二端点の重力項は

$$
A_{\rm JT}=2S_0+\frac{4+6}{2}=2+5=7.
$$

従って[組立命題](#prop-bhi24-assembled-ledger)より

$$
S_{\rm gen}[I;R]
=7+\frac13\ln\frac{18}{a^2}
+\frac16\ln8-\frac13\ln\frac{44}{35}.
$$

空枝は $S_{\rm gen}[\varnothing;R]=S(R)=\frac13\ln(6/a)$。両者の差を単一区間で書き直すと

$$
S_{\rm gen}[I;R]-S_{\rm gen}[\varnothing;R]
=7+\frac13\ln\frac3a+\frac16\ln8-\frac13\ln\frac{44}{35}.
$$

この差は与えられた $a=10^{-2}$ で正です（$7>0$、$3/a=300>1$、$\ln8>0$、$\ln(44/35)<\ln2$ より明らかに正）。さらに数値を求めれば、$S(I)\simeq2.248$、$\mathcal I\simeq0.0763$、差は約 $9.172$ nat です。各項の符号を確かめることが重要です。

(4) 求めたのは指定された端点での**値**であり、$\partial_{t_j}S_{\rm gen}$ や $\partial_{y_j}S_{\rm gen}$ の停留条件を解いていません。[QESの定義](../../HOLO/HOLO24/index.md#def-holo24-qes)から端点をQESと呼べず、さらに異なる候補の鞍点を比較していないのでPage転移も証明できません。与えた背景データが半古典JTと接合条件を実現しているか、という独立の物理的確認も必要です。
<!-- solution-end -->
