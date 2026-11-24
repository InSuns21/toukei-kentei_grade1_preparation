# LREP19 Dirac方程式の共変性

<!-- definition-example-audit: strict -->

これまで四成分スピノルの変換則と、そこから作る四元ベクトルを学びました。今回はスピノルを各時空点に割り当て、その時間発展を決めます。どの慣性系でも同じ方程式を使え、しかも時間について一階の方程式を作ることが目標です。

## 1. 二階の波動方程式から一階の作用素へ

時空を $\mathbb R^4$、点を $x=(t,x^1,x^2,x^3)^{\mathsf T}$ とします。[Minkowski計量](../../../物理系/SREL/SREL2/index.md#def-srel2-minkowski-metric)を使い、[符号の共通規約](../../../../../dream-theater-lorentz-conventions.md)に従って $\eta=\operatorname{diag}(-1,1,1,1)$ とし、光速と換算Planck定数を $c=\hbar=1$ に取ります。質量 $m\ge0$ は実定数です。$\partial_\mu$ は $x^\mu$ での偏微分、$\partial_0=\partial_t$ です。ギリシャ文字の添字は $0,1,2,3$、空間添字 $j$ は $1,2,3$ を走り、和を明記します。

場とは各点に値を割り当てる関数です。ここでは [Diracスピノル](../LREP16/index.md#def-lrep16-dirac) を値とする、少なくとも二階連続微分可能な関数 $\psi:\mathbb R^4\to\mathbb C^4$ を考えます。列の成分は普通の複素数です。

[自由Klein–Gordon方程式の波動演算子](../../../物理系/QFT/QFT1/index.md#def-qft1-klein-gordon)をスカラー成分に対して

$$
\Box_\eta=\sum_{\mu,\nu}\eta^{\mu\nu}\partial_\mu\partial_\nu
=-\partial_t^2+\sum_{j=1}^3\partial_j^2
$$

と置きます。QFT1の[自由Klein–Gordon方程式](../../../物理系/QFT/QFT1/index.md#def-qft1-klein-gordon)は $(-\Box_\eta+m^2)f=0$ です。QFT1では実数値の場を考えましたが、ここでは複素成分 $f=a+ib$ に対しても同じ演算子を使います。係数が実数なので、$(-\Box_\eta+m^2)f=0$ は実部 $a$ と虚部 $b$ がそれぞれ同じ実数値の方程式を満たすことと同値です。空間一定の場合にも $\partial_t^2 f=-m^2 f$ となり、一般には初期値と初期時間微分の二つが必要です。四成分を組み合わせることで、これを一階の式に因数分解できないでしょうか。

[LREP15のガンマ行列](../LREP15/index.md#def-lrep15-gamma)は基底の番号を添字に持ちます。[ベクトル成分用行列の変換則](../LREP17/index.md#prop-lrep17-vector-matrices)で導入した成分用の行列をそのまま用います。$I=I_2$、$I_4$ は四次単位行列、$\sigma_j$ は [Pauli行列](../LREP5/index.md#def-lrep5-pauli-model) です。

$$
G^0=-i\gamma^0=\begin{pmatrix}0&-iI\\iI&0\end{pmatrix},
\quad G^j=i\gamma^j=\begin{pmatrix}0&i\sigma_j\\i\sigma_j&0\end{pmatrix}.
$$

$$
G^\mu G^\nu+G^\nu G^\mu=-2\eta^{\mu\nu}I_4.
$$

特に $(G^0)^2=I_4$、$(G^j)^2=-I_4$ です。元の $\gamma^\mu$ の反交換関係とは符号が異なります。微分と行列を組み合わせるとき、時空の添字を下に持つ微分と上に持つ $G^\mu$ を組み合わせます。

ここで構成する微分作用素は、関数そのものと一階偏微分から新しい関数を作る写像です。各偏微分に固定行列を掛け、質量の定数倍を引くので、微分の最高次数は一階になります。

<a id="def-lrep19-dirac-operator"></a>

<!-- formal-statement-start -->
> **定義（自由Dirac作用素）**  
> 実定数 $m\ge0$ と上記の四次定数行列 $G^\mu$ に対して、$\mathbb R^4$ 上の微分可能な四成分複素関数に作用する自由Dirac作用素を

$$
D_m=i\sum_{\mu=0}^3G^\mu\partial_\mu-mI_4
$$

> と定める。$D_m\psi=0$ を自由Dirac方程式と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep19-dirac-operator -->
**定義の確認。** $e_k$ は $\mathbb C^4$ の標準基底、$v=e_1+ie_3$ とします。$G^0e_1=ie_3$、$G^0e_3=-ie_1$ なので $G^0v=ie_3+i(-ie_1)=v$ です。空間座標を $\boldsymbol x=(x^1,x^2,x^3)$ と書きます。$\psi(t,\boldsymbol x)=e^{-imt}v$ とすると、$\partial_t\psi=-im\psi$、$\partial_j\psi=0$ です。従って

$$
D_m\psi=iG^0(-im\psi)-m\psi=m(G^0-I_4)\psi=0.
$$

この関数は全時空で微分可能であり、四成分全ての方程式を満たします。$m>0$ で同じ $v$ を時間一定にすると $D_mv=-mv\ne0$ です。単に任意の四成分関数が解になるわけではありません。
<!-- definition-example-end -->

## 2. Lorentz変換後にも同じ方程式

[Lorentz群と単位元成分](../LREP9/index.md#def-lrep9-lorentz-group) で学んだ適正・時間向き保存Lorentz変換 $\Lambda$ は $\Lambda^{\mathsf T}\eta\Lambda=\eta$ を満たし、[Spin群とLorentz二重被覆](../LREP15/index.md#thm-lrep15-spin-cover) に対応する定数行列 $S=S(A)$ を選びます。点 $x'=\Lambda x$ に元の点 $x$ のスピノルを変換して配置します。変換された場は、同じ数値の座標で比較するのでなく

$$
\psi'(x')=S\psi(\Lambda^{-1}x')
$$

と定めます。共変とは、この変換をした後も方程式が同じ形を保つことです。右辺の関数の引数と、値に掛ける行列の両方が変わる点が重要です。

<a id="thm-lrep19-dirac-covariance"></a>

<!-- formal-statement-start -->
> **定理（自由Dirac方程式のLorentz共変性）**  
> 任意の一階連続微分可能な四成分関数 $\psi$、実定数 $m\ge0$、適正・時間向き保存Lorentz変換 $\Lambda$ とそのSpin持ち上げ $S$ に対し、$x'=\Lambda x$、$\psi'(x')=S\psi(x)$ と置く。このとき

$$
(D_m'\psi')(x')=S(D_m\psi)(x),
\qquad D_m'=i\sum_\mu G^\mu\partial'_\mu-mI_4.
$$

> 特に $\psi$ が解であることと $\psi'$ が解であることは同値である。
<!-- formal-statement-end -->

**証明の見取り図。** 連鎖律で微分の添字を変換し、行列側の変換と打ち消し合わせます。質量項はスカラー倍なので残ります。

<!-- proof-start -->
### 証明

$x^\nu=\sum_\mu(\Lambda^{-1})^\nu{}_\mu x'^\mu$ であり、連鎖律を各成分に適用すると

$$
\partial'_\mu\psi'(x')
=S\sum_\nu(\Lambda^{-1})^\nu{}_\mu\partial_\nu\psi(x).
$$

[ベクトル成分用行列の変換則](../LREP17/index.md#prop-lrep17-vector-matrices) より $G^\mu S=S\sum_\rho\Lambda^\mu{}_\rho G^\rho$。従って

$$
\begin{aligned}
i\sum_\mu G^\mu\partial'_\mu\psi'
&=iS\sum_{\mu,\nu,\rho}\Lambda^\mu{}_\rho
(\Lambda^{-1})^\nu{}_\mu G^\rho\partial_\nu\psi\\
&=iS\sum_\nu G^\nu\partial_\nu\psi.
\end{aligned}
$$

最後の等号は $\sum_\mu(\Lambda^{-1})^\nu{}_\mu\Lambda^\mu{}_\rho$ が $\nu=\rho$ なら1、そうでなければ0となることによります。$mI_4$ は $S$ と可換なので $-m\psi'=-Sm\psi$。両式を足すと結論を得ます。$S$ は可逆で、$x\mapsto x'$ も全単射なので解の同値性も従います。$\square$
<!-- proof-end -->

例えば座標だけ変えて $S$ を掛け忘れると、微分の逆変換を相殺する行列がなくなります。また $m$ はどの慣性系でも同じ質量としたので質量項も共変です。時空依存の $S(x)$ では積の微分から追加項が生じ、今回の証明はそのままでは使えません。

## 3. 一階の式を因数分解の形で確かめる

$L=i\sum_\mu G^\mu\partial_\mu$ と略します。一階作用素を二回作用させると、異なる方向の偏微分が混ざります。偏微分が交換できれば、反交換子を使って混合項を消せます。

<a id="prop-lrep19-dirac-factorization"></a>

<!-- formal-statement-start -->
> **命題（Dirac作用素による波動作用素の因数分解）**  
> 二階連続微分可能な四成分関数 $\psi$ と実定数 $m\ge0$ に対し、上記 $L$ は

$$
L^2\psi=\Box_\eta\psi,\qquad
(L+mI_4)(L-mI_4)\psi=(\Box_\eta-m^2)\psi.
$$

> 従って自由Dirac方程式の解の各成分は自由Klein–Gordon方程式を満たす。
<!-- formal-statement-end -->

**証明の見取り図。** 二重和を添字交換した式と平均し、反交換関係を代入します。

<!-- proof-start -->
### 証明

$G^\mu$ は定数で、$\partial_\mu\partial_\nu\psi=\partial_\nu\partial_\mu\psi$ です。$i^2=-1$ に注意して

$$
\begin{aligned}
L^2\psi
&=-\sum_{\mu,\nu}G^\mu G^\nu\partial_\mu\partial_\nu\psi\\
&=-\frac12\sum_{\mu,\nu}(G^\mu G^\nu+G^\nu G^\mu)
\partial_\mu\partial_\nu\psi\\
&=\sum_{\mu,\nu}\eta^{\mu\nu}\partial_\mu\partial_\nu\psi.
\end{aligned}
$$

二行目は第一行と $\mu,\nu$ を交換した式の平均です。$m$ が定数なので $L(m\psi)=mL\psi$。積を展開すると

$$
(L+mI_4)(L-mI_4)\psi=L^2\psi-m^2\psi.
$$

[自由Dirac作用素](#def-lrep19-dirac-operator) を $\psi$ に作用させた値 $D_m\psi$ が零なら左辺も零です。全体に負号を掛ければ $(-\Box_\eta+m^2)\psi=0$ となります。$\square$
<!-- proof-end -->

逆は一般に成立しません。例えば $m>0$、$w=e_1-ie_3$ は $G^0w=-w$ を満たし、$\psi=e^{-imt}w$ は二階の方程式を満たします。しかし $D_m\psi=m(G^0-I_4)\psi=-2m\psi$ です。二階方程式だけでは、時間微分とスピノル成分の結び付きが失われます。

## 4. 随伴の方程式と保存電流

[LREP17のDirac随伴](../LREP17/index.md#def-lrep17-dirac-adjoint) を各点で用いて $\bar\psi=\psi^\dagger H$ と書きます。$H=G^0$、$H^\dagger=H$、$H^2=I_4$ です。$\dagger$ は共役転置で、$\bar\psi$ は行です。$G^j$ は反Hermitian、$H$ と反交換するため

$$
(G^0)^\dagger H=HG^0,\qquad
(G^j)^\dagger H=-G^jH=HG^j.
$$

従って全添字について $(G^\mu)^\dagger H=HG^\mu$ が成り立ちます。この関係を使って、列の方程式を行の方程式へ移します。

<a id="prop-lrep19-adjoint-equation"></a>

<!-- formal-statement-start -->
> **命題（自由Dirac方程式の随伴方程式）**  
> 一階連続微分可能な $\psi:\mathbb R^4\to\mathbb C^4$ と実定数 $m\ge0$ に対して、$\bar\psi=\psi^\dagger H$ とする。$D_m\psi=0$ と

$$
i\sum_\mu(\partial_\mu\bar\psi)G^\mu+m\bar\psi=0
$$

> は同値である。
<!-- formal-statement-end -->

**証明の見取り図。** 共役転置で $i$ の符号と行列の順番を反転し、右から $H$ を掛けます。

<!-- proof-start -->
### 証明

$D_m\psi=0$ を共役転置すると

$$
-i\sum_\mu(\partial_\mu\psi^\dagger)(G^\mu)^\dagger
-m\psi^\dagger=0.
$$

$m$ が実数であることを使いました。右から $H$ を掛け、$(G^\mu)^\dagger H=HG^\mu$ を代入します。$H$ は定数なので $(\partial_\mu\psi^\dagger)H=\partial_\mu\bar\psi$。最後に全体を $-1$ 倍して結論を得ます。共役転置も $H$ の右乗算も可逆なので逆向きも成立します。$\square$
<!-- proof-end -->

[Dirac随伴の変換則](../LREP17/index.md#prop-lrep17-adjoint-covariance) より $\bar\psi'(x')=\bar\psi(x)S^{-1}$。[自由Dirac方程式のLorentz共変性](#thm-lrep19-dirac-covariance) と [随伴方程式](#prop-lrep19-adjoint-equation) との同値性から、行の式も変換後に成立します。質量項の符号が反対なのは、共役転置で微分項の $i$ が反転したためです。

[LREP17のDirac双線形量](../LREP17/index.md#def-lrep17-bilinears) のベクトルを各時空点で考えます。時間成分が密度、空間成分がその移動を表す流れになります。この密度と流れの組を電流と呼びます（電荷の定数倍を掛ける前の規格化です）。

<a id="def-lrep19-current"></a>

<!-- formal-statement-start -->
> **定義（自由Dirac場の電流）**  
> 四成分複素関数 $\psi$ とその随伴 $\bar\psi$ に対し、四成分関数 $j$ を

$$
j^\mu(x)=\bar\psi(x)G^\mu\psi(x)
$$

> と定める。時間成分を $\rho=j^0$、空間三成分を $\boldsymbol j=(j^1,j^2,j^3)$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep19-current -->
**定義の確認。** 第1節の解 $\psi=e^{-imt}v$ では $v=e_1+ie_3$、$\bar\psi=e^{imt}v^\dagger H=e^{imt}v^\dagger$ です。従って $j^0=v^\dagger v=2$。空間成分は $HG^j=-G^jH$ を使うと

$$
v^\dagger G^jv=v^\dagger HG^jHv=-v^\dagger G^jv
$$

となって全て0です。時間・空間の全成分を計算できました。$\rho$ は空間に一定なので、この例は有限の全積分を持つ状態ではありません。
<!-- definition-example-end -->

<a id="thm-lrep19-current-conservation"></a>

<!-- formal-statement-start -->
> **定理（自由Dirac電流の保存）**  
> 実定数 $m\ge0$ に対する一階連続微分可能な自由Dirac方程式の解 $\psi$ の電流 $j^\mu=\bar\psi G^\mu\psi$ は実数値の四元ベクトル場として変換し、

$$
\sum_\mu\partial_\mu j^\mu
=\partial_t\rho+\sum_j\partial_j j^j=0,\qquad
\rho=\psi^\dagger\psi\ge0
$$

> を満たす。$\rho(x)=0$ となるのは $\psi(x)=0$ のときに限る。
<!-- formal-statement-end -->

**証明の見取り図。** ベクトルとしての変換則と実数値性は既習の双線形量に帰着し、微分では列と行の方程式を組み合わせます。

<!-- proof-start -->
### 証明

[Dirac双線形量の共変性](../LREP17/index.md#prop-lrep17-bilinear-covariance) を点 $x$ の値に適用すると $j'^\mu(x')=\sum_\nu\Lambda^\mu{}_\nu j^\nu(x)$ です。[Dirac双線形量の実数値性](../LREP17/index.md#prop-lrep17-real-bilinears) から各成分は実数で、$j^0=\sum_{k=1}^4|\psi_k|^2$ です。

積の微分をすると

$$
\sum_\mu\partial_\mu j^\mu
=\sum_\mu(\partial_\mu\bar\psi)G^\mu\psi
+\sum_\mu\bar\psi G^\mu\partial_\mu\psi.
$$

[随伴方程式](#prop-lrep19-adjoint-equation) の右に $\psi$ を掛けると第一項は $(-m/i)\bar\psi\psi=im\bar\psi\psi$ です。[自由Dirac作用素](#def-lrep19-dirac-operator) の式の左に $\bar\psi$ を掛けると第二項は $(m/i)\bar\psi\psi=-im\bar\psi\psi$。和は零です。$\square$
<!-- proof-end -->

これは局所的な連続の式です。有限の箱 $[-R,R]^3$ で密度を積分して時間微分すると、連続な偏微分を持つので微分を積分内に移せます。各空間方向を一変数の微積分の基本定理で積分すると、その方向の両面の流出の差が現れます。例えば第一方向からの寄与は

$$
-\int_{-R}^R\int_{-R}^R
[j^1(t,R,x^2,x^3)-j^1(t,-R,x^2,x^3)]\,dx^2dx^3.
$$

他の二方向も含めた流出が零なら箱内の密度の積分は保存されます。全空間の積分を保存量とするには、例えば時間区間全体で場が共通の有限箱の外で零という条件を置けば、箱を拡大しても積分が同じなので成立します。局所式だけから無条件に有限の全積分があるとはいえません。

## 5. 時間発展と質量項の役割

時間微分について解くと、[自由Dirac作用素](#def-lrep19-dirac-operator) の式の左に $H$ を掛けて

$$
i\partial_t\psi=-i\sum_j\alpha^j\partial_j\psi+mH\psi,
\qquad \alpha^j=HG^j
$$

となります。行列積をブロックごとに計算すると

$$
\alpha^j=
\begin{pmatrix}0&-iI\\iI&0\end{pmatrix}
\begin{pmatrix}0&i\sigma_j\\i\sigma_j&0\end{pmatrix}
=\begin{pmatrix}\sigma_j&0\\0&-\sigma_j\end{pmatrix}.
$$

Pauli行列はHermitianなので $\alpha^j$ もHermitianであり、$H$ もHermitianです。左・右の二成分を $\psi=(u,r)^{\mathsf T}$ と書けば

$$
\begin{aligned}
i\partial_t u&=-i\sum_j\sigma_j\partial_j u-imr,\\
i\partial_t r&= i\sum_j\sigma_j\partial_j r+imu.
\end{aligned}
$$

$m=0$ なら左右は独立に時間発展します。$m>0$ では互いの成分が右辺に現れます。これは [chirality射影子](../LREP16/index.md#def-lrep16-chiral-projectors) で分けた二つの成分を質量が結ぶという意味です。次講ではこの時間発展の解を運動量ごとに構成します。

## 6. 演習

### Level A

<a id="ex-lrep19-a01"></a>

#### LREP19-A01 時間だけに依存する解
- Level: A
- ID: LREP19-A01

$m>0$、$w=e_2-ie_4$ とする。$\psi=e^{imt}w$ が自由Dirac方程式の解か確認せよ。

<!-- solution-start -->
**詳細解答。** $G^0$ の上ブロックは $-iI$、下ブロックは $iI$ なので $G^0w=ie_4+(-i)(-ie_2)=-w$。空間微分は零で $\partial_t\psi=im\psi$ です。[自由Dirac作用素](#def-lrep19-dirac-operator) に代入すると

$$
D_m\psi=-mG^0\psi-m\psi=0.
$$

従って解です。
<!-- solution-end -->

<a id="ex-lrep19-a02"></a>

#### LREP19-A02 反交換と混合微分
- Level: A
- ID: LREP19-A02

$f(t,x^1)$ を二階連続微分可能な四成分関数とする。$L^2 f$ を時間と第一空間方向だけで展開せよ。

<!-- solution-start -->
**詳細解答。** $L=iG^0\partial_t+iG^1\partial_1$ です。行列は定数で混合微分は交換できるので

$$
L^2f=-(G^0)^2\partial_t^2f
-(G^0G^1+G^1G^0)\partial_t\partial_1f
-(G^1)^2\partial_1^2f.
$$

第1節で確認した $G^\mu$ の反交換関係から順に $I_4,0,-I_4$ となるため $L^2f=-\partial_t^2f+\partial_1^2f$ です。
<!-- solution-end -->

<a id="ex-lrep19-a03"></a>

#### LREP19-A03 随伴の符号
- Level: A
- ID: LREP19-A03

時間だけに依存する解 $\psi=e^{-imt}(e_1+ie_3)$ の随伴方程式を直接確かめよ。

<!-- solution-start -->
**詳細解答。** $v=e_1+ie_3$ は $Hv=v$ なので [Dirac随伴](../LREP17/index.md#def-lrep17-dirac-adjoint) は $\bar\psi=e^{imt}v^\dagger$。$H^\dagger=H$ より $v^\dagger H=v^\dagger$ です。従って $\partial_t\bar\psi=im\bar\psi$、空間微分は零で、

$$
i(\partial_t\bar\psi)G^0+m\bar\psi
=-m\bar\psi H+m\bar\psi=0.
$$

[随伴方程式](#prop-lrep19-adjoint-equation) を満たします。
<!-- solution-end -->

<a id="ex-lrep19-a04"></a>

#### LREP19-A04 電流の成分
- Level: A
- ID: LREP19-A04

点で $\psi=(1,2,0,0)^{\mathsf T}$ のとき $j^\mu$ を全て求めよ。

<!-- solution-start -->
**詳細解答。** [自由Dirac場の電流](#def-lrep19-current) より $\rho=1^2+2^2=5$。$\alpha^j=HG^j$ の上ブロックは $\sigma_j$ なので $u=(1,2)^{\mathsf T}$ に対して

$$
\sigma_1u=(2,1)^{\mathsf T},\quad
\sigma_2u=(-2i,i)^{\mathsf T},\quad
\sigma_3u=(1,-2)^{\mathsf T}.
$$

左から $(1,2)$ を掛けると $j^1=4,\ j^2=0,\ j^3=-3$。時間成分は正で、空間成分は負にもなります。
<!-- solution-end -->

### Level B

<a id="ex-lrep19-b01"></a>

#### LREP19-B01 回転後の微分
- Level: B
- ID: LREP19-B01

$x'^1=-x^2,\ x'^2=x^1,\ t'=t,\ x'^3=x^3$ とする。対応するSpin行列 $S$ を固定し、$\partial'_1\psi'$ と $\partial'_2\psi'$ を求め、空間の最初の二方向のDirac作用が共変であることを確かめよ。

<!-- solution-start -->
**詳細解答。** 逆変換は $x^1=x'^2,\ x^2=-x'^1$。連鎖律より $\partial'_1\psi'=-S\partial_2\psi$、$\partial'_2\psi'=S\partial_1\psi$ です。[ベクトル成分用行列の変換則](../LREP17/index.md#prop-lrep17-vector-matrices) から $G^1S=-SG^2,\ G^2S=SG^1$。よって

$$
G^1\partial'_1\psi'+G^2\partial'_2\psi'
=S(G^2\partial_2\psi+G^1\partial_1\psi).
$$

二つの負号が打ち消されます。
<!-- solution-end -->

<a id="ex-lrep19-b02"></a>

#### LREP19-B02 質量零の進行波
- Level: B
- ID: LREP19-B02

$m=0$ とし、二階連続微分可能な複素関数 $f$ に対して $\psi=f(t-x^3)e_1$ を考える。方程式と電流保存を直接確認せよ。

<!-- solution-start -->
**詳細解答。** $G^0e_1=ie_3=G^3e_1$ です。$\partial_t\psi=f'e_1$、$\partial_3\psi=-f'e_1$、他は零。従って $D_0\psi=if'(G^0-G^3)e_1=0$。

[自由Dirac場の電流](#def-lrep19-current) は $\rho=|f|^2$、$\alpha^1,\alpha^2$ の上ブロックの対角成分は零、$\alpha^3$ の第一対角成分は1なので $\boldsymbol j=(0,0,|f|^2)$ です。$s=t-x^3$ と置けば

$$
\partial_t|f(s)|^2=f'(s)^*f(s)+f(s)^*f'(s),
$$

$$
\partial_3|f(s)|^2=-f'(s)^*f(s)-f(s)^*f'(s).
$$

両者の和は零で [自由Dirac電流の保存](#thm-lrep19-current-conservation) と一致します。
<!-- solution-end -->

<a id="ex-lrep19-b03"></a>

#### LREP19-B03 二階方程式から解を作る
- Level: B
- ID: LREP19-B03

$m>0$ とし、三階連続微分可能な四成分関数 $\chi$ が $(-\Box_\eta+m^2)\chi=0$ を満たすとする。$\psi=(L+mI_4)\chi$ がDirac方程式を満たすことを示し、$\chi=e^{-imt}(e_1+ie_3)$ と $\chi=e^{-imt}(e_1-ie_3)$ のそれぞれで $\psi$ を求めよ。

<!-- solution-start -->
**詳細解答。** $m$ は定数で $L$ と可換です。[Dirac作用素による波動作用素の因数分解](#prop-lrep19-dirac-factorization) の積を逆順にしても同じなので

$$
D_m\psi=(L-mI_4)(L+mI_4)\chi
=(\Box_\eta-m^2)\chi=0.
$$

時間だけの関数なので $L\chi=mH\chi$。$H(e_1\pm ie_3)=\pm(e_1\pm ie_3)$ を代入すると、第一の $\psi=2m\chi$、第二の $\psi=0$ です。二階方程式の解から一階方程式の解が得られますが、非零の入力が零へ移る場合もあります。
<!-- solution-end -->

<a id="ex-lrep19-b04"></a>

#### LREP19-B04 電荷共役された解
- Level: B
- ID: LREP19-B04

$m\ge0$ は実定数、$\psi$ は一階連続微分可能な自由Dirac方程式の解とする。[電荷共役](../LREP18/index.md#def-lrep18-charge-conjugation) $\psi^c=B\psi^*$ が同じ方程式を満たすことを示せ。

<!-- solution-start -->
**詳細解答。** [電荷共役行列の恒等式](../LREP18/index.md#prop-lrep18-gamma-transpose) から $B(G^\mu)^*B^{-1}=-G^\mu$ です。元の式を成分ごとに複素共役して

$$
-i\sum_\mu(G^\mu)^*\partial_\mu\psi^*-m\psi^*=0.
$$

左から定数行列 $B$ を掛け、$B(G^\mu)^*=-G^\mu B$ を代入します。

$$
i\sum_\mu G^\mu\partial_\mu(B\psi^*)-mB\psi^*=0.
$$

これが $\psi^c$ の方程式です。$i$ と行列共役の二つの負号が消えます。
<!-- solution-end -->

<a id="ex-lrep19-b05"></a>

#### LREP19-B05 質量による左右成分の結合
- Level: B
- ID: LREP19-B05

空間一定で $u(0)=a\in\mathbb C^2$、$r(0)=0$ とする。$u(t)=\cos(mt)a$、$r(t)=\sin(mt)a$ が第5節の時間発展を満たすことを示せ。密度を求め、$m=0$ と $m>0$ を比較せよ。

<!-- solution-start -->
**詳細解答。** 空間微分は零なので第5節の二つの式は $i\partial_t u=-imr$、$i\partial_t r=imu$。$i$ で割ると $\partial_t u=-mr$、$\partial_t r=mu$ です。候補を微分すると

$$
\partial_t u=-m\sin(mt)a=-mr,\qquad
\partial_t r=m\cos(mt)a=mu.
$$

初期時刻で $\cos(0)=1$、$\sin(0)=0$ なので指定の値も満たします。[自由Dirac電流の保存](#thm-lrep19-current-conservation) の密度の式から

$$
\rho=u^\dagger u+r^\dagger r
=(\cos^2(mt)+\sin^2(mt))a^\dagger a=a^\dagger a.
$$

$m=0$ なら全時刻で右成分は零です。$m>0$ かつ $a\ne0$ なら $t=\pi/(2m)$ で $u=0$、$r=a$ となります。密度は変わりませんが、質量による結合で左右の成分の大きさは変わります。
<!-- solution-end -->

### Level C

<a id="ex-lrep19-c01"></a>

#### LREP19-C01 異なる解の間の電流と質量
- Level: C
- ID: LREP19-C01

一階連続微分可能な二つの自由Dirac場 $\phi,\psi$ がそれぞれ実質量 $m_\phi,m_\psi\ge0$ の方程式を満たすとする。$k^\mu=\bar\phi G^\mu\psi$ の変換則と発散を求めよ。等質量の場合に保存されること、異質量では一般に保存されないことを具体例で示せ。

<!-- solution-start -->
**詳細解答。** [Dirac随伴の変換則](../LREP17/index.md#prop-lrep17-adjoint-covariance) と [ベクトル成分用行列の変換則](../LREP17/index.md#prop-lrep17-vector-matrices) より

$$
k'^\mu(x')=\bar\phi(x)S^{-1}G^\mu S\psi(x)
=\sum_\nu\Lambda^\mu{}_\nu k^\nu(x).
$$

二入力なので各成分が実数であるとは限りません。[随伴方程式](#prop-lrep19-adjoint-equation) を $\phi$ に適用し、右に $\psi$ を掛けると

$$
\sum_\mu(\partial_\mu\bar\phi)G^\mu\psi
=im_\phi\bar\phi\psi.
$$

一方 [自由Dirac作用素](#def-lrep19-dirac-operator) を $\psi$ に適用し、左に $\bar\phi$ を掛けると

$$
\sum_\mu\bar\phi G^\mu\partial_\mu\psi
=-im_\psi\bar\phi\psi.
$$

積の微分から

$$
\sum_\mu\partial_\mu k^\mu
=i(m_\phi-m_\psi)\bar\phi\psi.
$$

従って等質量なら発散は零です。異質量では $v=e_1+ie_3$、$\phi=e^{-im_\phi t}v$、$\psi=e^{-im_\psi t}v$ とすれば、両方が [自由Dirac作用素の定義](#def-lrep19-dirac-operator) の確認例と同じ計算で解になります。$v^\dagger H=v^\dagger$ なので

$$
\bar\phi\psi=2e^{i(m_\phi-m_\psi)t}.
$$

$k^0$ も同じ値で、空間成分は零です。直接微分しても $2i(m_\phi-m_\psi)e^{i(m_\phi-m_\psi)t}$ は異質量なら非零。質量項の相殺に等質量性が必要だったことが分かります。
<!-- solution-end -->

## 7. まとめ

- 成分用行列と微分の変換が打ち消し合い、一階方程式はLorentz共変になる。
- 反交換関係が二階の混合微分を消し、作用素を因数分解する。
- 実質量と随伴の方程式から電流の保存が従い、時間成分は四成分の絶対値の二乗和である。
- 質量零では左右二成分の方程式が分かれる。次は運動量を指定して具体的な解を構成する。
