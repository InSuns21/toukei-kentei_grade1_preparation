# SLT2-16 flat minimaの座標依存性

[ニューラルネットの線形化と二階剰余](../SLT2-08/index.md#thm-slt2-08-taylor)によって、パラメータを少し動かしたとき予測がどれほど変わるかを評価できた。前章の確率的な更新模型でも、学習過程の雑音と予測の汎化保証は別問題だった。

では、訓練損失の谷が「平ら」な解ほど未知のデータにもよく当たる、と結論できるだろうか。平らさをパラメータ空間のEuclid距離で測るなら、**何を一単位のパラメータ変化と呼ぶか**に依存する。関数としてまったく同じ予測を実現する二層網ですら、重みの尺度を変えるだけで谷の曲率を任意に大きくできる。

この章では、次を順に確認する。

1. Hessianの最大固有値と有限半径の損失増加は何を測るか。
2. 座標を変えたときHessianに何が起こるか。
3. 同じ予測を保つ二層模型で曲率を直接変えられるか。
4. 訓練損失が完全に平らでも汎化が失敗するのはなぜか。

## 1. 平らな谷を数で表す

まず訓練標本 $S=((x_i,y_i))_{i=1}^n$ を固定し、パラメータ $\theta\in\Theta\subseteq\mathbb R^p$ による予測関数 $f_\theta$ と損失 $\ell$ から、経験損失を

$$
L_S(\theta)=\frac1n\sum_{i=1}^n\ell(f_\theta(x_i),y_i)
$$

と置く。以下の曲率の議論では、$\Theta$ の内点付近で $L_S$ が二回連続微分可能だと仮定する。勾配 $\nabla L_S(\theta)$ は各座標の一階偏微分を並べたベクトル、**Hessian** $H_S(\theta)$ はその勾配をさらに各座標で微分した $p\times p$ 行列であり、第 $(i,j)$ 成分を $\partial_{\theta_i}\partial_{\theta_j}L_S(\theta)$ とする。二回連続微分可能性から対称行列になる。

勾配が零の点を**停留点**という。内点で局所極小なら停留点であり、Hessianは正半定値になる。これは方向 $v$ に沿う一変数関数 $t\mapsto L_S(\theta+tv)$ が $t=0$ で極小となり、二階微分 $v^{\mathsf T}H_S(\theta)v\ge0$ を満たすからである。したがって最大固有値は非負である。

二つの尺度を区別する。Hessianが表すのは極めて近い点での二次近似であり、有限の大きさの摂動に対する損失増加は、その近傍全体での最大値を取って測る。後者で使う半径 $\rho$ は**Euclidノルムで測ったパラメータの移動量**である。

<a id="def-slt2-16-sharpness"></a>

<!-- formal-statement-start -->
> **定義（Hessianによる局所sharpnessと有限半径sharpness）**
> $\Theta\subseteq\mathbb R^p$ を開集合、$L:\Theta\to\mathbb R$ を $C^2$ 級、$\theta_\star\in\Theta$ を停留局所極小点とする。$H=\nabla^2L(\theta_\star)$ と置く。Hessianによる局所sharpnessを

$$
s_H(\theta_\star)=\lambda_{\max}(H)
=\max_{\|v\|_2=1}v^{\mathsf T}Hv
$$

> と定める。さらに閉球 $\{\theta_\star+\delta:\|\delta\|_2\le\rho\}$ が $\Theta$ に含まれる半径 $\rho>0$ に対し、有限半径sharpnessを

$$
S_\rho(\theta_\star)
=\max_{\|\delta\|_2\le\rho}
\{L(\theta_\star+\delta)-L(\theta_\star)\}
$$

> と定める。最大値は連続関数のコンパクト集合上での最大値なので存在する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-16-sharpness -->
**定義の確認**。$\Theta=\mathbb R^2$、$L(u,v)=(u^2+4v^2)/2$、$\theta_\star=(0,0)$ とする。勾配は $(u,4v)^{\mathsf T}$ で原点で零。損失は全点で非負だから原点は局所極小である。Hessianは $\operatorname{diag}(1,4)$ で、単位ベクトル $(r,s)$ に対する二次形式は $r^2+4s^2\le4$。$(0,1)$ が等号を実現するので $s_H=4$。また

$$
\max_{u^2+v^2\le\rho^2}\frac{u^2+4v^2}{2}
=\frac{4\rho^2}{2}=2\rho^2
$$

となり、$S_\rho=2\rho^2$ を実際に満たす。単に固有値を計算しただけでなく、定義の停留性・極小性・半径条件・最大化をすべて確認した。
<!-- definition-example-end -->

**二次近似が使える範囲**を明確にする。局所極小点 $\theta_\star$ の近くで Taylor 展開すると、$\nabla L(\theta_\star)=0$ だから

$$
L(\theta_\star+\delta)-L(\theta_\star)
=\frac12\delta^{\mathsf T}H\delta+r(\delta),
\qquad \frac{r(\delta)}{\|\delta\|_2^2}\longrightarrow0
$$

である。$r$ は二次より小さい剰余であり、有限の $\rho$ で一律に零になるわけではない。前提となる [Taylor剰余の評価](../SLT2-08/index.md#thm-slt2-08-taylor)と同じく、ここでも展開点・摂動の向き・微分可能性が重要になる。

<a id="prop-slt2-16-radius"></a>

<!-- formal-statement-start -->
> **命題（有限半径sharpnessの二次近似）**
> 開集合 $\Theta\subseteq\mathbb R^p$、$L\in C^2(\Theta)$、停留局所極小点 $\theta_\star\in\Theta$ とし、$H=\nabla^2L(\theta_\star)$ とする。上の [有限半径sharpness](#def-slt2-16-sharpness) について、$\rho\downarrow0$ で

$$
S_\rho(\theta_\star)
=\frac{\rho^2}{2}\lambda_{\max}(H)+o(\rho^2)
$$

> が成立する。ここで $o(\rho^2)$ は $\rho^2$ で割ったものが0へ収束する剰余を表す。
<!-- formal-statement-end -->

### 証明の見取り図

固定された方向のTaylor展開だけでは球上の最大値を評価できない。Hessianの連続性で**全方向に一様な剰余評価**を作り、最大固有値の方向で下界も実現する。

<!-- proof-start -->
### 証明

$\theta_\star$ の周りに閉球が入る半径 $\rho_0>0$ を取る。任意の $\|\delta\|\le\rho<\rho_0$ に対し一変数関数 $g(t)=L(\theta_\star+t\delta)$（$0\le t\le1$）を考える。$g'(0)=\nabla L(\theta_\star)\cdot\delta=0$ で、$g''(t)=\delta^{\mathsf T}\nabla^2L(\theta_\star+t\delta)\delta$。微積分の基本定理を二回用いると

$$
\begin{aligned}
g(1)-g(0)
&=\int_0^1g'(t)\,dt\\
&=\int_0^1\int_0^t g''(s)\,ds\,dt
=\int_0^1(1-s)g''(s)\,ds.
\end{aligned}
$$

最後の等号は、連続な $g''$ について積分領域 $0\le s\le t\le1$ の順序を交換したものである。ここへ $g''$ を代入して

$$
L(\theta_\star+\delta)-L(\theta_\star)
=\int_0^1(1-t)\delta^{\mathsf T}
\nabla^2L(\theta_\star+t\delta)\delta\,dt.
$$

定数 $H$ を差し引くと剰余 $r(\delta)$ は

$$
|r(\delta)|\le\frac12\|\delta\|_2^2\,
\sup_{\|h\|_2\le\rho}
\|\nabla^2L(\theta_\star+h)-H\|_{\mathrm{op}}.
$$

右辺の上限を $\varepsilon(\rho)$ と書けば、$H$ の連続性から $\varepsilon(\rho)\to0$。対称・正半定値行列 $H$ に対して $\delta^{\mathsf T}H\delta\le\lambda_{\max}(H)\rho^2$ より

$$
S_\rho(\theta_\star)\le
\frac{\rho^2}{2}\{\lambda_{\max}(H)+\varepsilon(\rho)\}.
$$

逆に最大固有値の単位固有ベクトル $v_{\max}$ を取り、$\delta=\rho v_{\max}$ を代入すれば

$$
S_\rho(\theta_\star)\ge
\frac{\rho^2}{2}\{\lambda_{\max}(H)-\varepsilon(\rho)\}.
$$

二つを挟み合わせ、差を $\rho^2$ で割れば極限が0となる。$\square$
<!-- proof-end -->

$S_\rho$ は二次近似と整合するが、どちらも「球」がどの座標のEuclid距離で定義されたかを記憶している。次にその依存を計算する。

## 2. 座標を変えるとHessianはどう変わるか

同じ損失を別の座標から見る。元の座標を $\theta\in\mathbb R^p$、新しい座標を $u\in\mathbb R^p$ とし、滑らかな可逆対応 $\theta=\psi(u)$ を使う。対応は二回連続微分可能で、逆写像も二回連続微分可能と仮定する。$J(u)=D\psi(u)$ は第 $(i,a)$ 成分が $\partial\psi_i/\partial u_a$ のJacobian行列であり、座標 $u$ の一単位の変位が $\theta$ にどの方向・倍率で移るかを表す。新座標での損失は $\widetilde L(u)=L(\psi(u))$ とする。

このときHessianが常に $J^{\mathsf T}HJ$ になるわけではない。**停留点以外では、座標を取り替える写像の二階微分に勾配が掛かった項が残る**。

<a id="thm-slt2-16-coordinate"></a>

<!-- formal-statement-start -->
> **定理（停留点におけるHessianの再座標化公式）**
> 開集合 $U,\Theta\subseteq\mathbb R^p$、$L\in C^2(\Theta)$、$C^2$ 級全単射 $\psi:U\to\Theta$ で逆写像も $C^2$ 級であるものを仮定し、$\widetilde L=L\circ\psi$、$\theta=\psi(u)$、$J=D\psi(u)$ と置く。任意の $a,b$ について

$$
\frac{\partial^2\widetilde L}{\partial u_a\partial u_b}
=\sum_{i,j=1}^p
\frac{\partial\psi_i}{\partial u_a}
\frac{\partial^2L}{\partial\theta_i\partial\theta_j}
\frac{\partial\psi_j}{\partial u_b}
+\sum_{i=1}^p\frac{\partial L}{\partial\theta_i}
\frac{\partial^2\psi_i}{\partial u_a\partial u_b}.
$$

> 特に $\nabla L(\theta_\star)=0$、$u_\star=\psi^{-1}(\theta_\star)$ なら

$$
\nabla^2\widetilde L(u_\star)
=J(u_\star)^{\mathsf T}\nabla^2L(\theta_\star)J(u_\star).
$$

> このとき停留性、Hessianの正・負・零固有値の個数は保たれるが、個々の固有値の値は一般に保たれない。
<!-- formal-statement-end -->

### 証明の見取り図

まず $u_a$ に関する一階の連鎖律を成分表示し、それを $u_b$ でもう一度微分する。[パラメータJacobianの計算](../SLT2-08/index.md#thm-slt2-08-parameter-jacobian)と同様に、**どの変数を微分したか**を添字で追う。符号の個数の保存は行列の合同変換に対する二次形式の符号から確かめられる。

<!-- proof-start -->
### 証明

一階の連鎖律は

$$
\partial_{u_a}\widetilde L(u)
=\sum_{i=1}^p
\partial_{\theta_i}L(\psi(u))\,\partial_{u_a}\psi_i(u).
$$

右辺の各積を $u_b$ で微分する。前因子には再度連鎖律を適用し

$$
\partial_{u_b}\{\partial_{\theta_i}L(\psi(u))\}
=\sum_{j=1}^p
\partial_{\theta_j}\partial_{\theta_i}L(\psi(u))
\partial_{u_b}\psi_j(u)
$$

を得る。これを積の微分に代入すれば定理の二項の和になる。$\nabla L(\theta_\star)=0$ なら第二項の各 $\partial_{\theta_i}L$ が零なので、第一項のみが残る。また $\nabla_u\widetilde L=J^{\mathsf T}\nabla_\theta L=0$ で停留性が保たれる。

$J(u_\star)$ は $C^2$ 級の逆写像が存在し、逆写像との合成が恒等写像となることを連鎖律で微分すれば可逆と分かる。任意の $v\in\mathbb R^p$ に対して

$$
v^{\mathsf T}(J^{\mathsf T}HJ)v=(Jv)^{\mathsf T}H(Jv).
$$

$v\mapsto Jv$ が全単射だから、二次形式が正・負となる最大部分空間の次元と零空間の次元は変わらない。これは対称行列の合同変換の慣性不変性であり、**固有値の数値の一致**を意味しない。$\square$
<!-- proof-end -->

**変換公式の直接例**。$L(\theta)=\theta^2/2$、$\theta=u/c$（$c>0$）とする。両座標の原点は停留極小点で、$\widetilde L(u)=u^2/(2c^2)$、Jacobianは $1/c$ である。従って

$$
\nabla_\theta^2L(0)=1,\quad
\nabla_u^2\widetilde L(0)
=\frac1c\cdot1\cdot\frac1c=\frac1{c^2}.
$$

関数の値は点の対応に沿って完全に同じなのに、最大固有値は $c$ の選び方で任意に小さくも大きくもなる。さらに新座標の半径 $\rho$ の球は元座標の半径 $\rho/c$ の球に対応し、有限半径sharpnessも $\rho^2/(2c^2)$ に変わる。ここで変えたのは損失そのものではなく、摂動の測り方である。

**停留点でないときの注意**。$L(\theta)=\theta^2$、$\theta=u^2$、$u>0$ では $\widetilde L(u)=u^4$。$u=1$ では $L'(\theta)=2$, $L''(\theta)=2$、$\psi'=2$, $\psi''=2$ なので

$$
\widetilde L''(1)=2\cdot2^2+2\cdot2=12
$$

となる。$J^{\mathsf T}HJ=8$ だけでは誤りであり、残りの4が座標を取り替える写像の二階微分項である。

## 3. 予測が同じでも谷の曲率は変わる

機械学習では、座標の取り方を変えるだけでなく、**別のパラメータの組が同じ関数を表す**ことがある。損失の幾何を予測の質と結び付けるには、まずパラメータの同一性と予測関数の同一性を区別したい。

<a id="def-slt2-16-equivalence"></a>

<!-- formal-statement-start -->
> **定義（予測関数の同値性）**
> 入力集合 $\mathcal X$ とパラメータ空間 $\Theta$ を固定し、各 $\theta\in\Theta$ が関数 $f_\theta:\mathcal X\to\mathbb R$ を定めるとする。二つのパラメータ $\theta,\theta'$ が

$$
f_\theta(x)=f_{\theta'}(x)\qquad
(\text{全ての }x\in\mathcal X)
$$

> を満たすとき、両者は予測関数として同値という。同一の損失 $\ell$ と同一の $(X,Y)$ の分布 $P$ に対し期待損失が存在すれば、母集団リスク $R_P(\theta)=E_P[\ell(f_\theta(X),Y)]$ は等しい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-16-equivalence -->
**定義の確認**。$\mathcal X=\mathbb R$、$\Theta=\mathbb R^2$、$f_{(a,b)}(x)=abx$ とする。$\theta=(1,1)$、$\theta'=(2,1/2)$ は異なるが、任意の実数 $x$ で $f_\theta(x)=x=f_{\theta'}(x)$ となる。ゆえに**全入力での同値性**が成立する。任意の $P$ で二乗損失の期待値が有限なら、積分の被積分関数が点ごとに等しいため二つのリスクも一致する。訓練点だけで一致したことから全入力の同値性を推論していない。
<!-- definition-example-end -->

この例は単なる人工的な積ではない。二層網の一ニューロンが線形活性化を持てば、出力重み $a$ と入力重み $b$ の積 $abx$ が現れる。正の領域に限ったReLU網でも同じ構造が生じる。

<a id="thm-slt2-16-bilinear"></a>

<!-- formal-statement-start -->
> **定理（双線形予測器の同値な極小点と任意に大きい曲率）**
> 入力集合 $\mathbb R$ 上の予測関数 $f_{(a,b)}(x)=abx$（$a,b\in\mathbb R$）を考える。訓練標本 $S=\{(1,1)\}$ に対する損失を

$$
L_S(a,b)=\frac12(ab-1)^2
$$

> とする。任意の $c>0$ に対し、$\theta_c=(c,c^{-1})$ は大域極小で $f_{\theta_c}(x)=x$ を全入力で満たす。一方、そのHessianは

$$
H_S(\theta_c)
=\begin{pmatrix}c^{-2}&1\\1&c^2\end{pmatrix}
$$

> であり、固有値は $0,c^2+c^{-2}$ である。従って同じ予測関数・同じ母集団リスクを持つ極小点でも、Hessianの最大固有値は上に有界ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$ab=1$ ならどの入力にも同じ予測を返す。損失を $a,b$ で二回微分し、極小点で行列の行列式が零になることと対角和を使って固有値を求める。

<!-- proof-start -->
### 証明

$ab=1$ のとき $f_{(a,b)}(x)=x$ が全ての $x$ で成立し、$L_S(a,b)=0$。損失は二乗なので非負であり、これらは大域極小点である。勾配を積の微分で計算すると

$$
\partial_aL_S=(ab-1)b,\qquad
\partial_bL_S=(ab-1)a.
$$

さらに各成分を微分すれば

$$
\begin{aligned}
\partial_a^2L_S&=b^2,\\
\partial_b^2L_S&=a^2,\\
\partial_b\partial_aL_S&=a b+(ab-1)=2ab-1.
\end{aligned}
$$

極小点 $a=c,b=c^{-1}$ では $ab=1$ だから

$$
H_S(\theta_c)
=\begin{pmatrix}c^{-2}&1\\1&c^2\end{pmatrix},
\quad
\det H_S=1-1=0,\quad
\operatorname{tr}H_S=c^{-2}+c^2.
$$

固有値を $\lambda_1,\lambda_2$ とすると、特性方程式は

$$
\lambda^2-(c^2+c^{-2})\lambda=0
$$

となるので $\lambda_1=0,\lambda_2=c^2+c^{-2}$。また

$$
v^{\mathsf T}H_Sv=(c^{-1}v_1+cv_2)^2\ge0
$$

より正半定値性も確認できる。$c\to\infty$ とすれば最大固有値は発散する。他方 $f_{\theta_c}=x$ は全ての $c$ で同じ関数なので、[予測関数の同値性](#def-slt2-16-equivalence)により同じ分布と損失の下で母集団リスクは等しい。$\square$
<!-- proof-end -->

具体的には $c=1$ で最大固有値は2、$c=10$ で $100+1/100=100.01$。どちらの解も全入力で $f(x)=x$ を返す。**「sharpだから汎化が悪い」とは、この比較からは言えない。**

この不定性は二層ReLU網にも現れる。活性化 $\sigma(t)=\max\{t,0\}$ は $c>0$ に対して $\sigma(ct)=c\sigma(t)$（正の一次同次性）を満たす。従って

$$
a\sigma(bx)=(a/c)\sigma(cbx)
$$

であり、二つの表現は全入力で等しい。ただしReLUは折点で二回微分可能ではない。上のHessian計算をReLUへ使えるのは、例えば訓練入力 $x=1$、$a,b>0$ の近傍のように $bx>0$ が保たれる滑らかな領域である。**ReLUの全パラメータ空間で Hessian が定義できる**と主張していない。

また、[停留点におけるHessianの再座標化公式](#thm-slt2-16-coordinate)から分かるように、可逆な再尺度化はHessianの正負の方向の個数を保つ。しかし最大固有値も、Hessianの対角和も保たない。逆に、直交変換 $J^{\mathsf T}J=I$ なら $J^{\mathsf T}HJ$ は相似変換で、固有値が保たれる。座標の取り替えがすべて同じ影響を持つわけではない。

## 4. 経験損失の平坦さは汎化保証ではない

ここまでの例は**同じ予測なのに曲率だけ違う**ことを示した。さらに別の問題がある。経験損失の曲率は訓練入力を見て計算するため、訓練時に一度も現れなかった入力上の誤差を測れない。母集団リスクと経験リスクの違いは、[Bayes超過リスクと近似誤差の区別](../SLT1-01/index.md#def-slt1-01-bayes-excess)で扱った問題でもある。

<a id="prop-slt2-16-flat-overfit"></a>

<!-- formal-statement-start -->
> **命題（訓練曲率零でもテストリスクが非零となる反例）**
> 線形予測器 $f_\theta(x)=\theta x$（$\theta\in\mathbb R$）、二乗損失 $\ell(f,y)=(f-y)^2/2$ とする。訓練標本 $S$ が $n\ge1$ 個の $(0,0)$ だけからなるとき、全ての $\theta$ で $L_S(\theta)=0$、$\nabla L_S(\theta)=0$、$\nabla^2L_S(\theta)=0$ となる。一方、テスト分布 $P$ が $(X,Y)=(1,0)$ に確率1を置くなら

$$
R_P(\theta)=\frac{\theta^2}{2}.
$$

> 特に $s_H=0$ かつ $S_\rho=0$ の訓練解でも、テストリスクには有限の一様上界がない。
<!-- formal-statement-end -->

### 証明の見取り図

訓練入力 $x=0$ ではパラメータ $\theta$ が予測に一切現れない。一方、テスト入力 $x=1$ では誤差がそのまま $\theta$ に比例する。二つの分布を固定して損失を代入すればよい。

<!-- proof-start -->
### 証明

各訓練例で $f_\theta(0)=0$、$y=0$ なので損失は $(0-0)^2/2=0$。平均した $L_S$ は全実数で恒等的に零であり、一階・二階微分も零。従って任意の半径 $\rho>0$ で $S_\rho=\max_{|\delta|\le\rho}(0-0)=0$ である。

テスト分布は一点に確率1を置くから、期待値はその点での損失であり

$$
R_P(\theta)
=E_P\!\left[\frac{(\theta X-Y)^2}{2}\right]
=\frac{(\theta\cdot1-0)^2}{2}
=\frac{\theta^2}{2}.
$$

$|\theta|\to\infty$ とすれば右辺は発散する。$\square$
<!-- proof-end -->

この反例は**訓練・テスト分布が異なる**設定である。元々の独立同分布（independent and identically distributed; iid）を前提とする汎化理論が、異なるテスト分布に対して無条件に保証したことはない。だからこそ「訓練側のsharpnessだけでテスト性能を保証する」という追加主張には反例になる。iid下でも有限標本からの汎化保証には、仮説クラス・損失の有界性や安定性など追加の条件が必要である。

ここまでの結論は「flatnessに経験的な意味がない」ではない。パラメータ化、距離・ノルム、摂動の分布、学習算法、データの生成条件を**固定した上で**、曲率と汎化の関連を研究することはできる。ただし単純なHessian最大固有値の小ささを、座標に依らない予測性能の証明へ格上げしてはならない。

## 演習

### SLT2-16-A01 一次元の尺度変換
- Level: A
- 目安時間: 12分

$L(\theta)=3\theta^2/2$、$\theta=u/4$ とする。原点で元座標と新座標のHessianの最大固有値、半径 $\rho>0$ の有限半径sharpnessをそれぞれ求めよ。

<!-- solution-start -->
#### 詳細解答

$L'(\theta)=3\theta$、$L''(\theta)=3$、原点は停留大域極小である。元座標では $s_H=3$、$|\delta|\le\rho$ 上の最大損失差は

$$
S_\rho^{(\theta)}(0)=\max_{|\delta|\le\rho}\frac32\delta^2
=\frac32\rho^2.
$$

新座標では $\widetilde L(u)=3u^2/32$ だから、微分を二回行って $\widetilde L''(0)=3/16$ となる。従って

$$
s_H^{(u)}(0)=\frac3{16},\qquad
S_\rho^{(u)}(0)=\frac3{32}\rho^2.
$$

同じ $\rho$ でも、新座標の摂動 $u=\rho$ は元座標では $\theta=\rho/4$ に対応するため、値が違う。
<!-- solution-end -->

### SLT2-16-A02 二つの重みの積
- Level: A
- 目安時間: 14分

$L(a,b)=(ab-1)^2/2$ とする。$(a,b)=(2,1/2)$ で勾配、Hessian、固有値を求め、局所極小か確認せよ。

<!-- solution-start -->
#### 詳細解答

$ab=1$ なので損失は零、非負な二乗損失の大域極小である。積の微分より

$$
\nabla L=(ab-1)(b,a)^{\mathsf T}=(0,0)^{\mathsf T}.
$$

[双線形模型のHessianの計算](#thm-slt2-16-bilinear)を $a=2,b=1/2$ に適用すると

$$
H=\begin{pmatrix}b^2&2ab-1\\2ab-1&a^2\end{pmatrix}
=\begin{pmatrix}1/4&1\\1&4\end{pmatrix}.
$$

特性方程式は

$$
\det(H-\lambda I)
=(1/4-\lambda)(4-\lambda)-1
=\lambda^2-\frac{17}4\lambda
=0.
$$

よって固有値は $0,17/4$。正半定値であることも分かる。
<!-- solution-end -->

### SLT2-16-A03 有限半径sharpness
- Level: A
- 目安時間: 12分

$L(u,v)=\frac12(3u^2+v^2)$ の原点でHessianの最大固有値と、半径 $\rho>0$ の有限半径sharpnessを定義から求めよ。最大損失増加を与える方向を記せ。

<!-- solution-start -->
#### 詳細解答

$\nabla L=(3u,v)^{\mathsf T}$ は原点で零、損失は全点で非負である。Hessianは $\operatorname{diag}(3,1)$ で最大固有値は3。$u^2+v^2\le\rho^2$ なら

$$
\frac12(3u^2+v^2)
\le\frac32(u^2+v^2)
\le\frac32\rho^2.
$$

$(u,v)=(\rho,0)$ と $(-\rho,0)$ が両方の等号を満たす。従って [Hessianによる局所sharpnessと有限半径sharpnessの定義](#def-slt2-16-sharpness)から

$$
S_\rho(0)=\frac32\rho^2
$$

である。方向は第一座標軸の正負である。
<!-- solution-end -->

### SLT2-16-A04 停留点以外のHessian
- Level: A
- 目安時間: 13分

$L(\theta)=\theta^2$、$\theta=\psi(u)=u^2$、$u>0$ とする。$u=1$ で $\widetilde L''(1)$ を直接計算し、$J^{\mathsf T}HJ$ の項と、これだけでは足りない項を求めよ。

<!-- solution-start -->
#### 詳細解答

$\widetilde L(u)=(u^2)^2=u^4$ だから

$$
\widetilde L'(u)=4u^3,\qquad
\widetilde L''(u)=12u^2,\qquad
\widetilde L''(1)=12.
$$

元座標の評価点は $\theta=1$ で、$L'(1)=2$、$L''(1)=2$。また $\psi'(1)=2$、$\psi''(1)=2$ である。[停留点におけるHessianの再座標化公式](#thm-slt2-16-coordinate)の一般形の二つの項は

$$
(2)^2\cdot2=8,\qquad
2\cdot2=4.
$$

合計は $8+4=12$。元の点で勾配が零でないため、第二項は消えない。
<!-- solution-end -->

### SLT2-16-A05 観測できない入力
- Level: A
- 目安時間: 12分

$f_\theta(x)=\theta x$、損失 $(f-y)^2/2$、訓練標本 $S=\{(0,0),(0,0)\}$、テスト分布は $(X,Y)=(1,0)$ に確率1を置くとする。$\theta=3$ における訓練損失、その一階・二階微分、テストリスクを求めよ。

<!-- solution-start -->
#### 詳細解答

訓練各点は入力0だから $f_3(0)=0$ であり、二つの損失の平均は $L_S(3)=0$。実際に任意の $\theta$ に対して $L_S(\theta)\equiv0$ なので、微分して

$$
L_S'(3)=0,\qquad L_S''(3)=0.
$$

テスト側では $f_3(1)=3$、正解値0なので

$$
R_P(3)=\frac12(3-0)^2=\frac92.
$$

訓練側の平坦さが、観測していない入力への誤差を測っていないことが原因である。
<!-- solution-end -->

### SLT2-16-B01 球上で一様なTaylor剰余
- Level: B
- 目安時間: 25分

開集合 $\Theta\subseteq\mathbb R^p$ 上の $C^2$ 級損失 $L$ の停留局所極小点 $\theta_\star$ を考え、$H=\nabla^2L(\theta_\star)$ とする。$\varepsilon(\rho)=\sup_{\|h\|\le\rho}\|\nabla^2L(\theta_\star+h)-H\|_{\mathrm{op}}$ と置く。十分小さい $\rho$ について、任意の $\|\delta\|\le\rho$ で

$$
\left|L(\theta_\star+\delta)-L(\theta_\star)
-\tfrac12\delta^{\mathsf T}H\delta\right|
\le\tfrac12\varepsilon(\rho)\|\delta\|^2
$$

を示し、$S_\rho/\rho^2\to\lambda_{\max}(H)/2$ を導け。

<!-- solution-start -->
#### 詳細解答

$\theta_\star$ は開集合の内点なので、ある $\rho_0>0$ の閉球が $\Theta$ 内にある。$\rho<\rho_0$ とし、$g(t)=L(\theta_\star+t\delta)$ を $0\le t\le1$ 上で定義する。$C^2$ 性により

$$
g'(0)=0,\qquad
g''(t)=\delta^{\mathsf T}\nabla^2L(\theta_\star+t\delta)\delta.
$$

$g(1)=g(0)+g'(0)+\int_0^1(1-t)g''(t)\,dt$ を使い、一定行列 $H$ の項の積分は $\int_0^1(1-t)\,dt=1/2$ だから

$$
\begin{aligned}
&L(\theta_\star+\delta)-L(\theta_\star)
-\frac12\delta^{\mathsf T}H\delta\\
&\quad=\int_0^1(1-t)\delta^{\mathsf T}
\{\nabla^2L(\theta_\star+t\delta)-H\}\delta\,dt.
\end{aligned}
$$

行列の作用素ノルムから絶対値を取ると、各 $t$ で $\|t\delta\|\le\rho$ より、右辺は $\int_0^1(1-t)\varepsilon(\rho)\|\delta\|^2\,dt$ 以下となり、指定の不等式を得る。

連続性から $\varepsilon(\rho)\to0$。$\|\delta\|\le\rho$ で二次形式の上界を取り、最大固有値の単位固有ベクトル $v$ に $\delta=\rho v$ を代入した下界と合わせれば

$$
\frac12\{\lambda_{\max}(H)-\varepsilon(\rho)\}
\le\frac{S_\rho}{\rho^2}
\le\frac12\{\lambda_{\max}(H)+\varepsilon(\rho)\}.
$$

挟み打ちによって極限は $\lambda_{\max}(H)/2$ である。固定方向だけの剰余評価ではなく、球全体での一様評価が核心になる。
<!-- solution-end -->

### SLT2-16-B02 保存されるものと変わるもの
- Level: B
- 目安時間: 22分

$L(\theta_1,\theta_2)=(\theta_1^2+4\theta_2^2)/2$、座標の取り替え $\theta_1=cu_1$、$\theta_2=u_2/c$（$c>0$）とする。原点で新Hessianの固有値を計算し、正・零・負固有値の個数と最大固有値を比較せよ。$c\to\infty$ のときどうなるか。

<!-- solution-start -->
#### 詳細解答

元Hessianは $H=\operatorname{diag}(1,4)$。$J=\operatorname{diag}(c,c^{-1})$ は $c>0$ で可逆。原点では勾配が零だから [停留点におけるHessianの再座標化公式](#thm-slt2-16-coordinate)により

$$
\widetilde H=J^{\mathsf T}HJ
=\operatorname{diag}(c,c^{-1})\,
\operatorname{diag}(1,4)\,
\operatorname{diag}(c,c^{-1})
=\operatorname{diag}(c^2,4c^{-2}).
$$

従って新固有値は $c^2,4c^{-2}$。どちらも正で、元も新座標も「正2・零0・負0」で変わらない。ただし

$$
\lambda_{\max}(\widetilde H)=\max\{c^2,4c^{-2}\}
$$

は $c\to\infty$ で発散する。両固有値の積は常に4だが、各固有値は一定でない。可逆合同変換は正負の方向を保存し、Euclid距離に基づく曲率の数値を保存しない。
<!-- solution-end -->

### SLT2-16-B03 ReLUの尺度対称性
- Level: B
- 目安時間: 25分

$\sigma(t)=\max\{t,0\}$、$f_{a,b}(x)=a\sigma(bx)$ とする。

1. $c>0$ なら $f_{a,b}(x)=f_{a/c,cb}(x)$ が全実数 $x$ で成立することを証明せよ。
2. 訓練点 $(1,1)$、$a,b>0$ の領域で二乗損失のHessianを計算し、極小点 $(c,c^{-1})$ における最大固有値を求めよ。
3. なぜ $b=0$ でも同じHessian公式を無条件に使えないか説明せよ。

<!-- solution-start -->
#### 詳細解答

1. $c>0$ のとき $\max\{ct,0\}=c\max\{t,0\}$ である。よって

$$
f_{a/c,cb}(x)
=\frac ac\sigma(cbx)
=\frac ac\,c\sigma(bx)
=a\sigma(bx)=f_{a,b}(x).
$$

2. 訓練入力は $x=1$ で $b>0$ だから $\sigma(b)=b$。この開領域では損失 $L(a,b)=\{ab-1\}^2/2$ と一致し、二回微分可能である。偏微分を順に取ると

$$
\partial_aL=(ab-1)b,\quad
\partial_bL=(ab-1)a,\quad
\nabla^2L=\begin{pmatrix}b^2&2ab-1\\2ab-1&a^2\end{pmatrix}.
$$

$(c,c^{-1})$ は $c>0$ でこの領域に属し、$ab=1$ だから固有値は [双線形模型の固有値計算](#thm-slt2-16-bilinear)と同じ $0,c^2+c^{-2}$ になる。

3. $\sigma(t)$ は $t=0$ に折点があり、一般には微分が存在しない。$b=0$ では訓練入力 $x=1$ に対する $\sigma(b)$ が非微分となるため、$C^2$ 級を前提としたHessian公式の適用条件が失われる。尺度対称性の等式そのものは折点でも成立するが、等式と微分可能性は別問題である。
<!-- solution-end -->

### SLT2-16-B04 勾配降下も座標依存
- Level: B
- 目安時間: 20分

$L(\theta)=\theta^2/2$、$\theta=cu$（$c>0$）とする。学習率 $\eta>0$ のEuclid勾配降下を $\theta$ で直接一歩行った結果と、$u$ で一歩行ってから $\theta$ に戻した結果を比較せよ。いつ一致するか。

<!-- solution-start -->
#### 詳細解答

元の勾配は $L'(\theta)=\theta$ であるため、元座標での更新は

$$
\theta_{\mathrm{direct}}^+
=\theta-\eta L'(\theta)=(1-\eta)\theta.
$$

新座標の損失は $\widetilde L(u)=L(cu)=c^2u^2/2$、その勾配は $c^2u$。従って $u^+=(1-\eta c^2)u$ であり、元の座標へ戻すと

$$
\theta_{\mathrm{mapped}}^+
=cu^+=(1-\eta c^2)\theta.
$$

二つの差は $-\eta(c^2-1)\theta$ である。$\eta>0$ では $c=1$ または現在点が $\theta=0$ のときのみ一致する。損失関数の値の対応を保つ再パラメータ化でも、同じ数値の学習率を用いるEuclid勾配降下の軌道までは一般に保存されない。
<!-- solution-end -->

### SLT2-16-C01 flatnessと汎化を二方向から検証する
- Level: C
- 目安時間: 40分

二つの設定を考える。損失はいずれも二乗誤差の半分とする。

1. 模型Aは $f_{a,b}(x)=abx$、訓練点 $(1,1)$。二つの解 $(1,1)$ と $(10,1/10)$ の訓練損失、Hessianの最大固有値、任意の同じテスト分布でのリスクを比較せよ。ただしテスト側で必要な二乗モーメントは有限とする。
2. 模型Bは $f_\theta(x)=\theta x$、訓練標本が $(0,0)$ のみ、テスト分布が $(1,0)$ に確率1を置く。$\theta=M>0$ のHessian最大固有値とテストリスクを計算せよ。
3. 二つの結果から「小さい経験Hessianが小さいテストリスクを保証する」という主張に欠けた条件を説明せよ。

<!-- solution-start -->
#### 詳細解答

1. どちらも $ab=1$ なので訓練点で予測1、$L_S=0$ である。勾配は $(ab-1)(b,a)^{\mathsf T}$ なので両方で零。Hessianは

$$
H(a,b)=\begin{pmatrix}b^2&2ab-1\\2ab-1&a^2\end{pmatrix}.
$$

$(1,1)$ なら $H=\begin{pmatrix}1&1\\1&1\end{pmatrix}$ で、特性方程式 $\lambda(\lambda-2)=0$ より最大固有値は2。$(10,1/10)$ では $H=\begin{pmatrix}1/100&1\\1&100\end{pmatrix}$ で、行列式0・対角和 $100+1/100$ だから最大固有値は $100.01$。

一方、すべての入力 $x$ に対して両解とも $f(x)=x$。従って同じテスト分布 $P$ で

$$
R_P(1,1)=\frac12E_P[(X-Y)^2]
=R_P(10,1/10).
$$

曲率だけが大きく違い、リスクは厳密に等しい。

2. 模型Bでは全 $\theta$ で $L_S(\theta)=\frac12(\theta\cdot0)^2=0$、従って $L_S''(M)=0$。テスト側は $X=1,Y=0$ に固定されるので

$$
R_P(M)=\frac12(M\cdot1-0)^2=\frac{M^2}{2}.
$$

$M$ を任意に大きくできるので、訓練Hessianの小ささだけからリスクの有限上界は得られない。

3. 模型Aでは**同値な予測の間で座標に基づくsharpnessが変わる**ため、まずパラメータ化や摂動のノルムを指定しなければ大小比較が一意でない。模型Bでは**訓練入力がテスト入力を覆わない**ため、経験曲率が未知分布での損失を制御しない。模型Bはtrain/test分布が異なるので iid保証そのものへの反例ではない。汎化保証を証明するなら、共通のデータ生成分布、仮説クラスの制約、損失の条件、学習算法の条件などを具体的に明示して別の不等式を導く必要がある。$s_H$ の小ささだけを十分条件にはできない。
<!-- solution-end -->
