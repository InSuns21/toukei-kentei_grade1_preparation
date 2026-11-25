# MQFC15 相互作用測度を作る：P(φ)₂

[MQFC14](../MQFC14/index.md) では自由場の積から自己収縮を取り除き、試験関数で平均した量の二乗平均極限を構成した。今回はこの量を利用し、自由場の標本の確率を変える。場の値に依存する重みを与えても総確率を1にできるか、量子状態を作るための反射陽性を保てるかを調べる。

直接の前提は [MQFC8](../MQFC8/index.md)、[MQFC13](../MQFC13/index.md)、[MQFC14](../MQFC14/index.md) である。全 Euclid 次元は2、質量は $m>0$ とする。座標は $z=(t,x)$、時間反転は $\theta z=(-t,x)$ と書き、自由場の確率測度と期待値を $\mu_0,E_0$ で表す。

## 1. 相互作用を有限領域で作る

[正則化したWick積の試験関数測定](../MQFC14/index.md#def-mqfc14-smeared-wick) で使った $X_\epsilon(z)=\Phi(\rho_\epsilon(z-\cdot))$ を用いる。$\rho$ は単位球に支持を持つ非負滑らかな関数で積分1、各座標の反転に不変とする。$\rho_\epsilon(z)=\epsilon^{-2}\rho(z/\epsilon)$ であり、$\epsilon>0$ は正則化幅である。点分散 $a_\epsilon=E_0[X_\epsilon(z)^2]$ は有限で位置によらない。

実多項式 $P(u)=\sum_{j=0}^{2k}p_ju^j$ を選ぶ。$k\ge1$ は整数、$p_{2k}>0$ とする。低次の奇数項は許される。最高次数が偶数で係数が正だから両端で $P(u)\to+\infty$ となる。冪を [Gaussian Wick多項式](../MQFC14/index.md#def-mqfc14-wick) $W_j(u;a)$ に置き換えて

$$
P_a(u)=\sum_{j=0}^{2k}p_jW_j(u;a)
$$

と書く。$W_0=1$ とする。母関数 $e^{su-as^2/2}$ の二因子を展開して $s^j$ の係数を取ると

$$
W_j(u;a)=j!\sum_{\ell=0}^{\lfloor j/2\rfloor}
\frac{u^{j-2\ell}(-a/2)^\ell}{(j-2\ell)!\ell!}.
$$

$\ell=0$ の項だけが $u^j$ である。従って $P_a$ の最高次項は $p_{2k}u^{2k}$ のままである。固定した有限の $a\ge0$ では $P_a(u)/u^{2k}\to p_{2k}>0$ だから、十分大きい $R$ の外では $P_a\ge0$。区間 $[-R,R]$ 上では連続関数が最小値を持つので、ある有限な $M_a\ge0$ に対し $P_a\ge-M_a$ となる。

例えば $P(u)=\lambda u^4$、$\lambda>0$ なら

$$
P_a(u)=\lambda(u^4-6au^2+3a^2)
=\lambda((u^2-3a)^2-6a^2).
$$

最小値は $-6\lambda a^2$ であり、$u^2=3a$ で達する。元の多項式が非負でも Wick順序化した後は非負とは限らない。

まず非負の滑らかなコンパクト支持関数 $g$ で相互作用の範囲と強度を指定する。各標本の $X_\epsilon$ は滑らかなので、その領域上でエネルギーの変化を有限の実数として積分できる。

<a id="def-mqfc15-interaction"></a>

<!-- formal-statement-start -->
> **定義（有限切断Wick相互作用）**
> 二次元の質量付き Euclid 自由場を上記の平均核で幅 $\epsilon>0$ に正則化する。実多項式 $P$ の最高次数は正の偶数、最高次係数は正とする。非負の実関数 $g\in C_c^\infty(\mathbb R^2)$ に対し、有限切断Wick相互作用を

$$
V_{\epsilon,g}=\int_{\mathbb R^2}g(z)P_{a_\epsilon}(X_\epsilon(z))\,dz
$$

> と定める。$P_a$ は各冪を分散 $a$ の Wick多項式で置き換えた多項式である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc15-interaction -->
### 直接例

$P(u)=u^4$、$g=\rho$ とする。**定義の確認**。最高次数4、係数1、$g$ は非負で滑らかかつコンパクト支持を持つ。各標本で被積分関数は連続でコンパクト支持を持つから積分は有限。平方完成と $\int\rho=1$ により

$$
V_{\epsilon,\rho}
=\int\rho(z)(X_\epsilon(z)^2-3a_\epsilon)^2dz-6a_\epsilon^2
\ge-6a_\epsilon^2.
$$

[Wick多項式の混合二次モーメント](../MQFC14/index.md#thm-mqfc14-wick-covariance) の次数4と0から各点の四次Wick多項式の平均は0である。同じ公式の次数4同士から絶対期待値は $\sqrt{24}a_\epsilon^2$ 以下なので積分と期待値を交換でき、$E_0[V_{\epsilon,\rho}]=0$ となる。
<!-- definition-example-end -->

可測性は積分の近似から確認できる。支持を含む長方形を細分した Riemann 和は有限個の場の測定の多項式なので円筒可測である。各標本で連続関数の積分に収束するため、極限も可測である。

## 2. 指数重みの正規化

自由場の確率に $e^{-V_{\epsilon,g}}$ を掛けて相互作用を入れる。総質量が1になるように重みの期待値で割る必要がある。この期待値は分配関数とも呼ばれる。

<a id="thm-mqfc15-gibbs"></a>

<!-- formal-statement-start -->
> **定理（有限切断Gibbs測度の正規化）**
> $V_{\epsilon,g}$ を有限切断Wick相互作用とする。自由場測度 $\mu_0$ に対し

$$
Z_{\epsilon,g}=E_0[e^{-V_{\epsilon,g}}],
\qquad d\mu_{\epsilon,g}
=Z_{\epsilon,g}^{-1}e^{-V_{\epsilon,g}}d\mu_0
$$

> と置くと、$0<Z_{\epsilon,g}<\infty$ であり $\mu_{\epsilon,g}$ は確率測度となる。自由場で絶対可積分な観測量は新しい測度でも絶対可積分である。
<!-- formal-statement-end -->

### 証明の見取り図

多項式の下界を積分し、指数重みを有限の定数で抑える。重みの正値性と可積分性の両方が必要である。

<!-- proof-start -->
### 証明

$G=\int g(z)dz$ と置く。非負でコンパクト支持だから $0\le G<\infty$ である。$P_{a_\epsilon}\ge-M_{a_\epsilon}$ と $g\ge0$ から

$$
V_{\epsilon,g}\ge-M_{a_\epsilon}G,
\qquad 0<e^{-V_{\epsilon,g}}\le e^{M_{a_\epsilon}G}.
$$

自由場測度の総質量は1なので $Z_{\epsilon,g}\le e^{M_{a_\epsilon}G}$。また $\bigcup_{n\ge1}\{e^{-V_{\epsilon,g}}\ge1/n\}$ は全空間であり、ある $n$ の集合が正の確率を持つ。その確率の $1/n$ 倍が $Z_{\epsilon,g}$ の正の下界となる。

可測集合 $D$ の質量は $E_0[1_De^{-V_{\epsilon,g}}]/Z_{\epsilon,g}$ と定める。非負性と空集合の質量0は直接従い、互いに素な集合列の指示関数の部分和に単調収束定理を適用すれば可算加法性が従う。全空間の質量は1である。$E_0|F|<\infty$ なら

$$
E_{\epsilon,g}|F|
\le Z_{\epsilon,g}^{-1}e^{M_{a_\epsilon}G}E_0|F|<\infty.
$$

従って有限個の測定の多項式も可積分で、各測定の全絶対モーメントは有限である。
<!-- proof-end -->

一変数の模型で計算しよう。平均0、分散 $a>0$ の正規変数 $U$ に $V=b(U^2-a)$、$b\ge0$ を加えると

$$
e^{-V}d\mu_0(u)
=\frac{e^{ba}}{\sqrt{2\pi a}}
e^{-(1/(2a)+b)u^2}du.
$$

$a'=(a^{-1}+2b)^{-1}$ と置けば $1/(2a)+b=1/(2a')$ である。正規密度の積分が1なので $Z=e^{ba}\sqrt{a'/a}$。これで割ると平均0、分散 $a'$ の正規密度を得る。$b>0$ なら $a'<a$ だから大きな測定値の確率が抑えられる。四次相互作用の測度も正規分布になるという意味ではない。

定数項を $c$ だけ変えると $V_{\epsilon,g}$ は $cG$ だけ増える。分子と分母はともに $e^{-cG}$ 倍され、正規化後の測度は変わらない。

## 3. 反射陽性を保存する

[正時間多項式の反射形式](../MQFC8/index.md#def-mqfc8-reflection-positivity) では正時間の測定から作る多項式 $F$ に対して $E_0[\overline{F(\theta\Phi)}F(\Phi)]\ge0$ が成立した。正時間の情報だけで決まる重みと負時間側の反転した重みを掛ければ、両方の因子に重みを吸収できそうである。ただし指数を掛けた関数は多項式ではない。まず有限個の測定についてこの問題を解く。

<a id="lem-mqfc15-weighted-reflection"></a>

<!-- formal-statement-start -->
> **補題（正時間の有界重みによる反射形式）**
> 二次元の質量付き Euclid 自由場で、正時間支持の有限個の実試験関数の測定ベクトルを $X$、対応する反転測定ベクトルを $Y$ とする。$F$ は複素係数多項式、$h$ は非負有界 Borel 関数とする。このとき

$$
E_0[\overline{F(Y)}h(Y)F(X)h(X)]\ge0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[Gaussian場の多項式反射陽性](../MQFC8/index.md#thm-mqfc8-gaussian-extension) の証明に現れた共通 Gaussian 成分を使う。重み付き関数も二乗可積分なので、その成分を固定して平均した値の平方絶対値に帰着できる。

<!-- proof-start -->
### 証明

引用した定理の証明から $(X,Y)$ と同分布の組を $(Z+U,Z+W)$ と書ける。$Z,U,W$ は独立な中心化 Gaussian ベクトルで $U,W$ は同分布である。$Z$ の分布を $\nu$、$U,W$ の分布を $\sigma$ とする。$B(x)=F(x)h(x)$ と置く。有界性から $E_0|B(X)|^2<\infty$、$Y$ も同分布なので積は Cauchy–Schwarz により絶対可積分である。Fubini の定理により

$$
\begin{aligned}
E_0[\overline{B(Y)}B(X)]
&=\int\nu(dz)\int\sigma(dw)\int\sigma(du)
\,\overline{B(z+w)}B(z+u)\\
&=\int\nu(dz)\left|\int B(z+u)\sigma(du)\right|^2\\
&\ge0.
\end{aligned}
$$

内側の平均は $\nu$ のほとんど至る所で有限である。これは $E|B(Z+U)|^2<\infty$ から従う。
<!-- proof-end -->

平均核の支持半径は $\epsilon$ なので、$t>\epsilon$ の点で $X_\epsilon(t,x)$ を測る試験関数は正時間に支持を持つ。一方 $0<t\le\epsilon$ の測定は負時間側にも入り得る。そこで $g_+$ の支持を $t>\epsilon$ に制限し、反転した関数を足す。これは有限切断で反射陽性を示すための十分条件である。

<a id="thm-mqfc15-rp"></a>

<!-- formal-statement-start -->
> **定理（分離された切断での反射陽性の保存）**
> 有限切断Gibbs測度において平均核は時間反転に不変とする。$g_+$ は非負の滑らかなコンパクト支持関数で、支持は $t>\epsilon$ に含まれるとする。

$$
g(z)=g_+(z)+g_+(\theta z).
$$

> このとき $\mu_{\epsilon,g}$ は時間反転不変であり、正時間測定の任意の複素係数多項式 $F$ に対して

$$
E_{\epsilon,g}[\overline{F(\theta\Phi)}F(\Phi)]\ge0
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

相互作用を正負時間に分け、正時間側の積分を非負係数の Riemann 和で近似する。近似重みは有界なので直前の補題を適用できる。固定切断幅での下界を使って近似極限を取る。

<!-- proof-start -->
### 証明

$A(\Phi)=\int g_+(z)P_{a_\epsilon}(X_\epsilon(z))dz$ とする。反転不変な平均核から

$$
X_\epsilon(z;\theta\Phi)
=\Phi(\rho_\epsilon(z-\theta\,\cdot))
=X_\epsilon(\theta z;\Phi).
$$

時間座標の反転の絶対 Jacobian は1なので、$A(\theta\Phi)=\int g_+(\theta z)P_{a_\epsilon}(X_\epsilon(z))dz$。よって $V_{\epsilon,g}=A+A\circ\theta$ である。自由場の反転不変性とこの式により、任意の可測集合 $D$ に対して

$$
\begin{aligned}
\mu_{\epsilon,g}(\theta^{-1}D)
&=Z_{\epsilon,g}^{-1}E_0[1_D(\theta\Phi)e^{-V_{\epsilon,g}(\Phi)}]\\
&=Z_{\epsilon,g}^{-1}E_0[1_D(\Phi)e^{-V_{\epsilon,g}(\theta\Phi)}]\\
&=\mu_{\epsilon,g}(D).
\end{aligned}
$$

$g_+$ の支持を含む長方形を細分し、各セルの面積を $v_i$、代表点を $z_i$ とする。$g_+(z_i)>0$ の項だけを残して

$$
A_n=\sum_i v_i g_+(z_i)P_{a_\epsilon}(X_\epsilon(z_i))
$$

を作る。測定関数は全て正時間に支持を持つ。各標本で $A_n\to A$。また $G_n=\sum_i v_i g_+(z_i)$ は $\int g_+$ に収束し、全 $n$ に共通の有限上界 $L$ を持つ。$A_n\ge-M_{a_\epsilon}G_n$ より $e^{-A_n}\le e^{M_{a_\epsilon}L}$ である。

$F$ の測定と $A_n$ の測定を合わせた有限ベクトルに [正時間の有界重みによる反射形式](#lem-mqfc15-weighted-reflection) を適用する。すると

$$
E_0[\overline{F(\theta\Phi)}F(\Phi)e^{-A_n(\theta\Phi)}e^{-A_n(\Phi)}]\ge0.
$$

絶対値は $e^{2M_{a_\epsilon}L}|F(\theta\Phi)F(\Phi)|$ 以下であり、自由場の全絶対モーメントと Cauchy–Schwarz により可積分である。$A_n(\Phi)\to A(\Phi)$、$A_n(\theta\Phi)\to A(\theta\Phi)$ だから支配収束により左辺は

$$
E_0[\overline{F(\theta\Phi)}F(\Phi)e^{-V_{\epsilon,g}}]
$$

に収束する。非負実数の極限は非負である。[有限切断Gibbs測度の正規化](#thm-mqfc15-gibbs) の正の $Z_{\epsilon,g}$ で割れば結論を得る。
<!-- proof-end -->

例えば $\epsilon=1/4$、$g_+(t,x)=\rho(t-2,x)$ なら支持の時間範囲は $[1,3]$ に含まれ、$t>\epsilon$ を満たす。反転関数を足した $g$ は非負で時間反転不変である。

時間反転不変性だけでは十分ではない。独立に $\pm1$ を等確率で取る $X,Y$ の反転を交換とする。自由な分布では任意の複素関数 $F$ に対して $E[\overline{F(Y)}F(X)]=|EF(X)|^2\ge0$。ところが $V=bXY$、$b>0$ は反転不変で下に有界でも、$F(X)=X$ の新しい反射形式は

$$
\frac{E[XYe^{-bXY}]}{E[e^{-bXY}]}
=\frac{e^{-b}-e^b}{e^{-b}+e^b}<0.
$$

同符号と異符号の状態が各2個なのでこの式になる。重みが正負時間の積に分離できず、平方絶対値への帰着が失われる。これは反射不変性だけから反射陽性を推論することの反例である。

## 4. 切断除去には別の評価がいる

[Wick積の二乗平均極限](../MQFC14/index.md#thm-mqfc14-smeared-limit) により二次元では任意の固定次数 $j\ge1$ について $V_{\epsilon,j}(g)\to V_j(g)$ が $L^2(\mu_0)$ で成立する。従って

$$
V_{\epsilon,g}=p_0G+\sum_{j=1}^{2k}p_jV_{\epsilon,j}(g)
$$

は $V_g=p_0G+\sum_{j=1}^{2k}p_jV_j(g)$ に二乗平均で収束する。差のノルムは各差のノルムと $|p_j|$ の積の和以下であり各項が0へ行く。しかし指数重みの平均の収束は別問題である。四次の場合の上界 $e^{6\lambda a_\epsilon^2G}$ は点分散が増えると発散する（$G>0$ の場合）。

次の条件付き定理は、指数重みに必要な追加評価を具体化する。

<a id="thm-mqfc15-density-limit"></a>

<!-- formal-statement-start -->
> **定理（指数重みの一様評価と密度の極限）**
> 共通の確率空間上の有限実確率変数 $V_n,V$ が $V_n\to V$ と確率収束するとする。ある $q>1$ と有限の $K$ について

$$
\sup_n E[e^{-qV_n}]\le K
$$

> と仮定する。このとき $e^{-V_n}\to e^{-V}$ が $L^1$ で成立し、$Z=E[e^{-V}]$ は正かつ有限である。$Z_n=E[e^{-V_n}]$ とすると正規化密度も

$$
\left\|\frac{e^{-V_n}}{Z_n}-\frac{e^{-V}}Z\right\|_1\to0
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

重みを有限の高さで切って収束を示し、切った残りは $q$ 次の評価で一様に小さくする。

<!-- proof-start -->
### 証明

$Y_n=e^{-V_n}$、$Y=e^{-V}$ と置く。確率収束から $Y_n\to Y$ も確率収束する。実際 $|V|\le R$、$|V_n-V|\le\delta\le1$ 上で平均値の定理より $|Y_n-Y|\le e^{R+1}\delta$。$R$ を大きくして $P(|V|>R)$ を小さくし、所定の誤差以下になる $\delta$ を選べば、残る例外確率 $P(|V_n-V|>\delta)$ は0へ行く。

$Y_n\wedge T$ は $Y_n$ と $T>0$ の小さい方である。任意の $\eta>0$ で二つの事象に分けると

$$
E|Y_n\wedge T-Y\wedge T|
\le\eta+T P(|Y_n-Y|>\eta).
$$

$n\to\infty$、次に $\eta\downarrow0$ とすれば左辺は0へ行く。関数 $v\mapsto e^{-qv}$ についても先ほどと同じ平均値の定理の評価 $q e^{q(R+1)}\delta$ を使える。従って $Y_n^q\wedge T\to Y^q\wedge T$ も期待絶対差で収束し、$E[Y^q\wedge T]\le K$。単調収束で $E[Y^q]\le K$ である。

$y>T$ なら $y\le y^q/T^{q-1}$ なので

$$
E[Y_n1_{\{Y_n>T\}}]\le KT^{1-q},
\qquad E[Y1_{\{Y>T\}}]\le KT^{1-q}.
$$

切った部分と残りに分けて

$$
E|Y_n-Y|\le2KT^{1-q}+E|Y_n\wedge T-Y\wedge T|.
$$

固定 $T$ で $n\to\infty$、次に $T\to\infty$ とすれば $q>1$ により右辺は0へ行く。$Y$ は正で可積分なので $0<Z<\infty$。さらに $|Z_n-Z|\le E|Y_n-Y|\to0$。最後に

$$
\begin{aligned}
E\left|\frac{Y_n}{Z_n}-\frac YZ\right|
&\le \frac{E|Y_n-Y|}{Z_n}
+\left|\frac1{Z_n}-\frac1Z\right|E[Y]\\
&=\frac{E|Y_n-Y|+|Z_n-Z|}{Z_n}\to0.
\end{aligned}
$$

分母は正の $Z$ に収束するため結論が従う。
<!-- proof-end -->

有界観測量の期待値の差は、その上限と密度差の $L^1$ ノルムの積以下である。場の多項式は非有界なので、この結論だけでは全モーメントの収束は言えない。[非有界観測量の極限への移行](../MQFC13/index.md#thm-mqfc13-ui-limit) と同様に尾部を別に制御する必要がある。

## 5. 演習

### 演習 MQFC15-A1：Wick順序の下界

- Level: A

$a\ge0$、$\lambda>0$、実数 $c$ に対し $P(u)=\lambda u^4+cu^2$ を Wick順序化し最小値を求めよ。

<!-- solution-start -->
[Gaussian Wick多項式](../MQFC14/index.md#def-mqfc14-wick) より

$$
P_a(u)=\lambda u^4+(c-6\lambda a)u^2+3\lambda a^2-ca.
$$

$s=u^2\ge0$、$D=c-6\lambda a$ と置く。$\lambda s^2+Ds$ は $D\ge0$ なら $s=0$ で最小0。$D<0$ なら

$$
\lambda s^2+Ds=\lambda(s+D/(2\lambda))^2-D^2/(4\lambda)
$$

より $s=-D/(2\lambda)>0$ で最小を取る。最小値は $3\lambda a^2-ca-(\max\{0,-D\})^2/(4\lambda)$ である。
<!-- solution-end -->

### 演習 MQFC15-A2：定数項の効果

- Level: A

相互作用 $V$ の正規化定数を $Z$ とする。$V'=V+5$ の正規化定数と正規化後の密度を求めよ。

<!-- solution-start -->
[有限切断Gibbs測度の正規化](#thm-mqfc15-gibbs) の式から $Z'=E_0[e^{-V-5}]=e^{-5}Z$。従って

$$
\frac{e^{-V'}}{Z'}=\frac{e^{-5}e^{-V}}{e^{-5}Z}=\frac{e^{-V}}Z.
$$

全可測集合の確率は変わらない。
<!-- solution-end -->

### 演習 MQFC15-A3：二次相互作用の分散

- Level: A

平均0、分散2の正規変数 $U$ を $e^{-(U^2-2)/4}$ で重み付けする。正規化定数と新しい分散を求めよ。

<!-- solution-start -->
元の密度は $(4\pi)^{-1/2}e^{-u^2/4}$。重みを掛けると $e^{1/2}(4\pi)^{-1/2}e^{-u^2/2}$。標準正規密度 $(2\pi)^{-1/2}e^{-u^2/2}$ と比較した係数の比は $e^{1/2}/\sqrt2$ だからこれが $Z$。割った後は標準正規密度であり分散1である。
<!-- solution-end -->

### 演習 MQFC15-A4：正時間支持の判定

- Level: A

平均核の支持半径は $\epsilon=1/2$ とする。$g_+$ の支持の時間座標の最小値が $3/4$ の場合と $1/4$ の場合、第3節の定理の支持条件を判定せよ。

<!-- solution-start -->
[分離された切断での反射陽性の保存](#thm-mqfc15-rp) では支持の全点で $t>\epsilon$ が必要である。前者では測定関数の最小時間は $3/4-1/2=1/4>0$ 以上なので条件を満たす。後者では $1/4<1/2$ なので条件を満たさない。これは定理が適用できないという判定であり、反射陽性が必ず破れるという判定ではない。
<!-- solution-end -->

### 演習 MQFC15-B1：下界が失われる場合

- Level: B

標準正規変数 $U$ に対し $P(u)=-u^4$ を Wick順序化した $V$ を考える。$E[e^{-V}]=\infty$ を示せ。

<!-- solution-start -->
[Gaussian Wick多項式](../MQFC14/index.md#def-mqfc14-wick) より $V=-U^4+6U^2-3$。正規密度を掛けると

$$
E[e^{-V}]=\frac{e^3}{\sqrt{2\pi}}\int_{\mathbb R}e^{u^4-(13/2)u^2}du.
$$

$u^2\ge13$ なら $(13/2)u^2\le u^4/2$ だから指数は $u^4/2$ 以上となる。無限長の領域で被積分関数が1以上なので積分は発散する。最高次係数が負のため正規化定理の下界の論証は成立しない。
<!-- solution-end -->

### 演習 MQFC15-B2：分離する重みと分離しない重み

- Level: B

独立な等確率の符号変数 $X,Y$ を考える。$V=b(X+Y)$（実数 $b$）と $V=bXY$（$b>0$）で正規化した後の $E[XY]$ をそれぞれ求めよ。

<!-- solution-start -->
前者では $E[e^{-bX}]=(e^{-b}+e^b)/2$、$E[Xe^{-bX}]=(e^{-b}-e^b)/2$。独立性から分子と分母はそれぞれこの二つの値の平方になるので

$$
E_V[XY]=\left(\frac{e^{-b}-e^b}{e^{-b}+e^b}\right)^2\ge0.
$$

後者では $XY$ が等確率の符号変数なので分子は $(e^{-b}-e^b)/2$、分母は $(e^{-b}+e^b)/2$。商は負である。前者の平方は正負時間の分離から生じるが後者では分離がない。
<!-- solution-end -->

### 演習 MQFC15-B3：二乗平均と指数重み

- Level: B

区間 $(0,1)$ の一様確率空間で整数 $n\ge2$ に対し $V_n=-n$ を $(0,n^{-4})$ 上、他では0とする。二乗平均極限と $E[e^{-V_n}]$ を求め、正規化密度が1に $L^1$ 収束するか判定せよ。

<!-- solution-start -->
$E[V_n^2]=n^2n^{-4}=n^{-2}\to0$ なので二乗平均極限は0。しかし

$$
Z_n=1-n^{-4}+n^{-4}e^n\to\infty.
$$

区間 $(0,n^{-4})$ の新しい確率は $n^{-4}e^n/Z_n\to1$、元の確率は $n^{-4}\to0$。差は密度差の $L^1$ ノルム以下なので密度は1に収束しない。[指数重みの一様評価と密度の極限](#thm-mqfc15-density-limit) の仮定も $E[e^{-qV_n}]\ge n^{-4}e^{qn}\to\infty$ により破れている。
<!-- solution-end -->

### 演習 MQFC15-B4：指数重みの尾部

- Level: B

非負確率変数 $Y_n$ が $\sup_n E[Y_n^3]\le8$ を満たす。$E[Y_n1_{\{Y_n>T\}}]$ の上界を求め、これを $0.02$ 以下にする $T$ を選べ。

<!-- solution-start -->
$Y_n>T>0$ 上で $Y_n\le Y_n^3/T^2$。期待値は $8/T^2$ 以下。$8/T^2\le0.02$ は $T^2\ge400$ と同値なので $T=20$ を選べばよい。$n$ に依存しない尾部評価である。
<!-- solution-end -->

### 演習 MQFC15-C1：切断除去を仮定した反射陽性の移行

- Level: C

共通の自由場空間上で $V_n$ は第3節の分離条件を満たす有限切断相互作用とし、有限実変数 $V$ に確率収束するとする。$\sup_n E_0[e^{-2V_n}]\le K<\infty$ を仮定する。正規化密度が収束し、極限測度でも正時間多項式の反射陽性が成立することを示せ。

<!-- solution-start -->
[指数重みの一様評価と密度の極限](#thm-mqfc15-density-limit) に $q=2$ を入れると $Y_n=e^{-V_n}$ は $Y=e^{-V}$ に $L^1$ 収束し、$Z_n\to Z>0$。証明から $E_0[Y^2]\le K$ も従う。

正時間の測定多項式 $F$ を固定して $H=\overline{F(\theta\Phi)}F(\Phi)$ とする。Cauchy–Schwarz により

$$
E_0|H|^2\le
(E_0|F(\theta\Phi)|^4)^{1/2}(E_0|F(\Phi)|^4)^{1/2}<\infty.
$$

$H_T=H1_{\{|H|\le T\}}$ は有界なので $E_0[H_T(Y_n-Y)]$ の絶対値は $T\|Y_n-Y\|_1$ 以下で0へ行く。残りは Cauchy–Schwarz により

$$
E_0[|H|1_{\{|H|>T\}}(Y_n+Y)]
\le2\sqrt K(E_0[|H|^21_{\{|H|>T\}}])^{1/2}.
$$

右辺は $T\to\infty$ で0へ行き、$n$ に依存しない。従って $E_0[HY_n]\to E_0[HY]$。$Z_n\to Z>0$ だから正規化した反射形式も収束する。[分離された切断での反射陽性の保存](#thm-mqfc15-rp) により各 $E_0[HY_n]/Z_n\ge0$ なので極限も非負である。

反転不変性も有界指示関数の期待値の収束で保存される。任意の測定の絶対モーメントは $Y$ の二乗平均と自由場の倍次数の絶対モーメントを Cauchy–Schwarz で組み合わせて有限となる。よって [正時間多項式の反射形式](../MQFC8/index.md#def-mqfc8-reflection-positivity) の条件も満たす。ここで一様指数評価そのものを示したわけではない。
<!-- solution-end -->

## 6. 次の講義

有限切断で相互作用を確率測度にし、正負時間に分離できる場合に反射陽性を保てることを示した。次講では切断幅を0に近づけるための Wick積の評価と指数重みの制御を学ぶ。有限領域での切断除去と相互作用領域を無限に広げる極限は別の問題である。
