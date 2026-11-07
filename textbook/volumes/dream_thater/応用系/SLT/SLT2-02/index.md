# SLT2-02 最小ノルム補間と勾配流

前章では、訓練値を完全に再現する係数が何通りもあることを確かめた。例えば $X\beta=y$ を満たす係数を一つ選んだあと、その係数に $X$ の核のベクトルを足しても訓練予測は変わらない。では、実際に計算を行うと**どの補間解が選ばれるのか**。

係数の長さを最小にする方法と、係数を零から少しずつ動かして損失を下げる方法を比べよう。後者は勾配流と呼ぶ連続時間の学習過程である。驚くことに、平方損失・零初期値・十分長い学習時間という条件では、二つの選択が一致する。ただしこれは**最適化の選択則**であって、未知データに対する汎化性能の保証ではない。

[設計行列](../../ML/ML1-04/index.md#def-ml1-04-design-matrix)を $X\in\mathbb R^{n\times p}$、応答を $y\in\mathbb R^n$、係数を $\beta\in\mathbb R^p$ とする。$n,p$ は正整数で、全て実数とする。最初に[線形補間可能性](../SLT2-01/index.md#def-slt2-01-linear-interpolation)と[行空間と核の直交性](../SLT2-01/index.md#thm-slt2-01-row-null-prediction)を思い出す。以下の行列・応答はまず非確率的に固定する。

## 1. ノルムを最小にする係数

次の2行3列の例では、解の個数は無限である。

$$
X=\begin{pmatrix}1&0&1\\0&1&1\end{pmatrix},
\qquad y=\begin{pmatrix}1\\2\end{pmatrix},
\qquad
\beta(s)=\begin{pmatrix}1-s\\2-s\\s\end{pmatrix}
\quad(s\in\mathbb R).
$$

全ての $\beta(s)$ で $X\beta(s)=y$ となる。しかし平方ノルムを計算すると

$$
\|\beta(s)\|_2^2
=(1-s)^2+(2-s)^2+s^2
=3(s-1)^2+2.
$$

したがって $s=1$ が唯一の最小点で、係数は $(0,1,1)^{\mathsf T}$ になる。これは[最小ノルム最小二乗解](../../ML/ML1-04/index.md#thm-ml1-04-solution-set-minimum-norm)を、残差が零になる場合へ適用したものである。

一般の行列で同じ選択を計算するには、[特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)（Singular Value Decomposition; SVD）で、$X$ が情報を残す方向と消す方向を分ける。$r=\operatorname{rank}X$ とする。$r>0$ なら正の特異値 $\sigma_1,\ldots,\sigma_r>0$ と、互いに直交する単位ベクトル $u_j\in\mathbb R^n$、$v_j\in\mathbb R^p$ を使って

$$
X=\sum_{j=1}^r\sigma_j u_jv_j^{\mathsf T},
\qquad
Xv_j=\sigma_j u_j,
\qquad
X^{\mathsf T}u_j=\sigma_j v_j
$$

と書ける。$u_j$ は訓練応答側、$v_j$ は係数側の方向である。$r=0$ なら和は空和とし零とする。SVDで正の特異値だけを逆数にした写像を **Moore–Penrose擬似逆** といい、

$$
X^\dagger=\sum_{j=1}^r\frac{1}{\sigma_j}v_ju_j^{\mathsf T}
\quad\in\mathbb R^{p\times n}
$$

と表す。この定義は[既習の擬似逆による最小ノルム解](../../ML/ML1-04/index.md#thm-ml1-04-solution-set-minimum-norm)と同じものであり、$r=0$ の場合は零写像である。零特異値の逆数は取らない。

<a id="thm-slt2-02-minimum-norm"></a>

<!-- formal-statement-start -->
> **定理（最小ノルム解のSVD表示と行フルランク公式）**
> $n,p$ を正整数とし、$X\in\mathbb R^{n\times p}$ と $y\in\mathbb R^n$ を固定する。$r=\operatorname{rank}X$、正の特異値を $\sigma_1,\ldots,\sigma_r$、対応する特異ベクトルを $u_j,v_j$ とする。このとき

$$
\beta^\dagger=X^\dagger y
=\sum_{j=1}^r\frac{u_j^{\mathsf T}y}{\sigma_j}v_j
$$

> は $\|X\beta-y\|_2^2$ を最小にする全ての係数のうち、Euclidノルムが最小の唯一の係数である。補間解であるための必要十分条件は $y\in\operatorname{Im}X$ である。特に $\operatorname{rank}X=n$（行フルランク）の場合は任意の $y$ を補間し、$XX^{\mathsf T}$ が可逆で

$$
\beta^\dagger=X^{\mathsf T}(XX^{\mathsf T})^{-1}y
$$

> が成り立つ。一般階数では $XX^{\mathsf T}$ の逆行列の存在を仮定できない。
<!-- formal-statement-end -->

### 証明の見取り図

$y$ を $u_j$ の方向とそれに垂直な成分へ分ける。各正特異値方向の係数は最小二乗で固定され、核の方向だけが自由に残る。[行空間と核の直交性](../SLT2-01/index.md#thm-slt2-01-row-null-prediction)を用いて自由成分を零にすると最小ノルムとなる。行フルランクの場合には $XX^{\mathsf T}$ の固有値が $\sigma_j^2>0$ になる。

<!-- proof-start -->
### 証明

SVDの $v_1,\ldots,v_r$ は $\operatorname{row}(X)$ の正規直交基底である。任意の係数は[行空間と核の直交性](../SLT2-01/index.md#thm-slt2-01-row-null-prediction)により

$$
\beta=\sum_{j=1}^r b_jv_j+z,\qquad z\in\ker X
$$

と一意に書ける。$y_\perp=y-\sum_{j=1}^r(u_j^{\mathsf T}y)u_j$ とおけば $y_\perp$ は全ての $u_j$ に直交し、

$$
X\beta-y
=\sum_{j=1}^r(\sigma_jb_j-u_j^{\mathsf T}y)u_j-y_\perp.
$$

各成分は互いに直交するので、Pythagorasの等式で

$$
\|X\beta-y\|_2^2
=\sum_{j=1}^r(\sigma_jb_j-u_j^{\mathsf T}y)^2+\|y_\perp\|_2^2.
$$

$\sigma_j>0$ だから最小値を達成するための必要十分条件は $b_j=u_j^{\mathsf T}y/\sigma_j$（全ての $j\le r$）である。その条件下で

$$
\|\beta\|_2^2
=\sum_{j=1}^r\frac{(u_j^{\mathsf T}y)^2}{\sigma_j^2}+\|z\|_2^2
$$

だから、$z=0$ が唯一のノルム最小条件となる。$y_\perp=0$ のとき、かつそのときだけ最小残差は0であり、これは $y\in\operatorname{Im}X$ と同値である。

行フルランク $r=n$ なら $u_1,\ldots,u_n$ は $\mathbb R^n$ の正規直交基底であり、

$$
XX^{\mathsf T}=\sum_{j=1}^n\sigma_j^2u_ju_j^{\mathsf T},
\qquad
(XX^{\mathsf T})^{-1}=\sum_{j=1}^n\sigma_j^{-2}u_ju_j^{\mathsf T}.
$$

これを $X^{\mathsf T}=\sum_j\sigma_jv_ju_j^{\mathsf T}$ に掛けると

$$
X^{\mathsf T}(XX^{\mathsf T})^{-1}y
=\sum_{j=1}^n\sigma_j\sigma_j^{-2}v_j(u_j^{\mathsf T}y)
=X^\dagger y.
$$

階数が $n$ 未満なら $XX^{\mathsf T}$ の階数も $r<n$ なので、通常の逆行列は存在しない。$\square$
<!-- proof-end -->

### 例：逆Gram行列と平方完成を突き合わせる

冒頭の $X$ の行は独立であり、$XX^{\mathsf T}$ は $2\times2$ の対称行列となる。具体的には

$$
XX^{\mathsf T}
=\begin{pmatrix}2&1\\1&2\end{pmatrix},
\qquad
(XX^{\mathsf T})^{-1}
=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$

行列式が $4-1=3\ne0$ だから逆行列が存在する。[最小ノルム公式](#thm-slt2-02-minimum-norm)をこの $X,y$ に適用すると

$$
(XX^{\mathsf T})^{-1}y
=\frac13\begin{pmatrix}2-2\\-1+4\end{pmatrix}
=\begin{pmatrix}0\\1\end{pmatrix},
\qquad
\beta^\dagger=X^{\mathsf T}\begin{pmatrix}0\\1\end{pmatrix}
=\begin{pmatrix}0\\1\\1\end{pmatrix}.
$$

これは先の $\|\beta(s)\|^2=3(s-1)^2+2$ の最小点と一致する。$X\beta^\dagger=(1,2)^{\mathsf T}=y$ も直接確認できる。

## 2. 係数を動かして損失を減らす

最小ノルムという条件をあらかじめ指定せず、学習を零ベクトルから始めたらどうなるか。平方損失を

$$
L(\beta)=\frac12\|X\beta-y\|_2^2
$$

と置く。この節では係数 $1/2$ を固定し、$1/(2n)$ では割らない。$X,y$ と、微分対象以外の係数を固定して、$k=1,\ldots,p$ の各 $\beta_k$ について偏微分すると

$$
\frac{\partial L}{\partial\beta_k}
=\sum_{i=1}^nX_{ik}\left(\sum_{\ell=1}^pX_{i\ell}\beta_\ell-y_i\right),
\qquad
\nabla L(\beta)=X^{\mathsf T}(X\beta-y).
$$

ここで $\partial L/\partial\beta_k$ は係数 $\beta_k$ による偏微分である。一方、係数を学習時間 $t$ の関数と見たときの時間導関数は

$$
\dot\beta(t)=\frac{d\beta(t)}{dt}
=\begin{pmatrix}\frac{d\beta_1(t)}{dt}\\\vdots\\\frac{d\beta_p(t)}{dt}\end{pmatrix}
$$

であり、偏微分とは微分する変数が異なる。$t\ge0$ は学習時間であり、統計的な標本数ではない。勾配の反対向きへ連続的に係数を動かす微分方程式を考える。

<a id="def-slt2-02-gradient-flow"></a>

<!-- formal-statement-start -->
> **定義（最小二乗勾配流と初期値）**
> 固定した $X\in\mathbb R^{n\times p}$ と $y\in\mathbb R^n$ に対し、微分可能な曲線 $\beta:[0,\infty)\to\mathbb R^p$ が

$$
\dot\beta(t)=-X^{\mathsf T}(X\beta(t)-y),
\qquad \beta(0)=\beta_0\in\mathbb R^p
$$

> を全ての $t\ge0$ で満たすとき、初期値 $\beta_0$ からの最小二乗勾配流という。特に $\beta_0=0$ を零初期値という。$\dot\beta$ は学習時間についての導関数である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-02-gradient-flow -->
### 例：一次元の微分方程式が本当に定義を満たすか

**定義の確認**。$n=p=1$、$X=(2)$、$y=(6)$、$\beta_0=0$ とする。この場合の定義式は $\dot\beta=-2(2\beta-6)=-4\beta+12$。候補を $\beta(t)=3(1-e^{-4t})$ と置けば

$$
\beta(0)=3(1-1)=0,\qquad
\dot\beta(t)=12e^{-4t},\qquad
-4\beta(t)+12=12e^{-4t}.
$$

初期条件も全ての時刻での微分方程式も満たされる。$t\to\infty$ で $\beta(t)\to3$ となり、$X\beta=6=y$ に収束する。
<!-- definition-example-end -->

## 3. 勾配流が選ぶ解をSVDで求める

SVDの $v_j$ 方向で係数の速度を調べると、行列全体の微分方程式は一次元の式に分かれる。各正の特異値 $\sigma_j$ に対して、係数方向の誤差は $e^{-\sigma_j^2t}$ の速さで減衰する。一方、核方向には勾配が働かない。

<a id="thm-slt2-02-gradient-flow-limit"></a>

<!-- formal-statement-start -->
> **定理（勾配流の特異モード解と極限）**
> $X\in\mathbb R^{n\times p}$、$y\in\mathbb R^n$ を固定し、$X$ の正の特異値を $\sigma_1,\ldots,\sigma_r$、対応する特異ベクトルを $u_j,v_j$ とする。初期値 $\beta(0)=0$ の[最小二乗勾配流](#def-slt2-02-gradient-flow)は全ての $t\ge0$ で一意に存在し、

$$
\beta(t)=\sum_{j=1}^r
\frac{1-e^{-\sigma_j^2t}}{\sigma_j}(u_j^{\mathsf T}y)v_j
$$

> を満たす。さらに

$$
\lim_{t\to\infty}\beta(t)=X^\dagger y,
\qquad
\lim_{t\to\infty}X\beta(t)=\sum_{j=1}^r(u_j^{\mathsf T}y)u_j.
$$

> $y\in\operatorname{Im}X$ なら極限は最小ノルム補間解であり、$y\notin\operatorname{Im}X$ なら極限は最小ノルム最小二乗解だが完全補間はしない。$r=0$ のとき $\beta(t)=0$、$X\beta(t)=0$ と読む。
<!-- formal-statement-end -->

### 証明の見取り図

零初期値から動く勾配は常に行空間内にある。各 $v_j$ に沿う成分 $b_j(t)$ へ[勾配流の定義](#def-slt2-02-gradient-flow)を射影し、$\dot b_j=-\sigma_j^2b_j+\sigma_j u_j^{\mathsf T}y$ を解く。正の特異値方向は指数的に収束し、核方向には初めから成分がない。最終的な係数が[擬似逆の公式](#thm-slt2-02-minimum-norm)に一致する。

<!-- proof-start -->
### 証明

まず候補解をSVDで構成する。$c_j=u_j^{\mathsf T}y$ と置いて、$b_j(t)=(c_j/\sigma_j)(1-e^{-\sigma_j^2t})$ とする。$b_j(0)=0$ であり、

$$
\dot b_j(t)=\sigma_jc_je^{-\sigma_j^2t},
\quad
-\sigma_j^2b_j(t)+\sigma_jc_j
=-\sigma_jc_j(1-e^{-\sigma_j^2t})+\sigma_jc_j
=\sigma_jc_je^{-\sigma_j^2t}.
$$

したがって各成分が一次元の方程式を満たす。$\beta(t)=\sum_{j=1}^rb_j(t)v_j$ と置くと

$$
X^{\mathsf T}X\beta(t)
=\sum_{j=1}^r\sigma_j^2b_j(t)v_j,\qquad
X^{\mathsf T}y=\sum_{j=1}^r\sigma_jc_jv_j
$$

だから $\dot\beta=-X^{\mathsf T}X\beta+X^{\mathsf T}y$ と $\beta(0)=0$ を満たす。$r=0$ でも両辺が零で成立する。

一意性も確かめる。同じ初期値を持つ二つの解の差を $d(t)$ とすると $\dot d=-X^{\mathsf T}Xd$、$d(0)=0$ である。従って

$$
\frac{d}{dt}\frac12\|d(t)\|_2^2
=d(t)^{\mathsf T}\dot d(t)
=-\|Xd(t)\|_2^2\le0.
$$

非負の $\|d(t)\|^2$ は初期値0から増加できないので、全ての $t\ge0$ で $d(t)=0$ となる。

有限個のモードについて $\sigma_j>0$ だから $e^{-\sigma_j^2t}\to0$ であり、

$$
\beta(t)\to\sum_{j=1}^r\frac{c_j}{\sigma_j}v_j=X^\dagger y,
\qquad
X\beta(t)=\sum_{j=1}^r(1-e^{-\sigma_j^2t})c_ju_j
\to\sum_{j=1}^rc_ju_j.
$$

後者は $y$ の $\operatorname{Im}X$ への直交射影である。[最小ノルム解のSVD表示と行フルランク公式](#thm-slt2-02-minimum-norm)から、補間の有無も結論できる。$\square$
<!-- proof-end -->

### 例：2つの減衰速度を直接見る

冒頭の $X$ について $XX^{\mathsf T}=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ は $(1,1)^{\mathsf T}$ 方向で固有値3、$(1,-1)^{\mathsf T}$ 方向で固有値1を持つ。$y=(1,2)^{\mathsf T}$ を両方向へ分解すると

$$
y=\frac32\begin{pmatrix}1\\1\end{pmatrix}
-\frac12\begin{pmatrix}1\\-1\end{pmatrix}.
$$

この例では $X$ の二行が独立なので、$XX^{\mathsf T}$ は可逆であり、$X^{\mathsf T}$ は単射である。勾配流の速度は

$$
\dot\beta(t)=X^{\mathsf T}(y-X\beta(t))
\in\operatorname{Im}X^{\mathsf T}=\operatorname{row}(X)
$$

に属する。[行空間と核の直交性](../SLT2-01/index.md#thm-slt2-01-row-null-prediction)により、速度は核に直交する。零初期値では核成分が初めから零で、時間が経っても変化しないため、係数は常に行空間内にある。

そこで $\alpha(t)\in\mathbb R^2$ を使って $\beta(t)=X^{\mathsf T}\alpha(t)$ と表す。$X$ は時刻に依存しないから、勾配流の定義に代入すると

$$
X^{\mathsf T}\dot\alpha(t)
=\dot\beta(t)
=X^{\mathsf T}(y-XX^{\mathsf T}\alpha(t)).
$$

$X^{\mathsf T}$ の単射性と零初期値から、補助変数は次の初期値問題を満たす。

$$
\dot\alpha(t)=y-XX^{\mathsf T}\alpha(t),
\qquad \alpha(0)=0.
$$

$XX^{\mathsf T}$ の固有値 $\lambda>0$ の方向で、$y$ の係数を $d$、$\alpha$ の係数を $a(t)$ と書けば

$$
\dot a(t)=d-\lambda a(t),\quad a(0)=0,
\qquad a(t)=\frac{d}{\lambda}(1-e^{-\lambda t}).
$$

この解は初期値を満たし、微分すると $\dot a(t)=de^{-\lambda t}=d-\lambda a(t)$ となる。固有値 $3,1$ と上の $y$ の分解をそれぞれ代入すると

$$
\alpha(t)=
\frac{1-e^{-3t}}{2}\begin{pmatrix}1\\1\end{pmatrix}
-\frac{1-e^{-t}}{2}\begin{pmatrix}1\\-1\end{pmatrix}
=\frac12\begin{pmatrix}e^{-t}-e^{-3t}\\2-e^{-3t}-e^{-t}\end{pmatrix}.
$$

従って

$$
\beta(t)=
\begin{pmatrix}
(e^{-t}-e^{-3t})/2\\
1-(e^{-3t}+e^{-t})/2\\
1-e^{-3t}
\end{pmatrix}
\quad\longrightarrow\quad
\begin{pmatrix}0\\1\\1\end{pmatrix}.
$$

最初は $\beta(0)=0$。最後は先のノルム最小補間解である。途中の $e^{-3t}$ と $e^{-t}$ は異なる速度で減衰する。有限時間では一般に $X\beta(t)\ne y$ であり、**極限の補間**と**有限時間の補間**を区別する。

## 4. 初期値を変えたらどうなるか

零初期値が重要である。係数の核方向は損失を全く変えないため、勾配でも動かせない。初期係数を行空間と核へ分け、核への直交射影を $P_{\ker X}\beta_0$ と書く。

<a id="prop-slt2-02-initialization"></a>

<!-- formal-statement-start -->
> **命題（初期値の核成分の保存）**
> 固定した $X\in\mathbb R^{n\times p}$、$y\in\mathbb R^n$ と任意の初期値 $\beta_0\in\mathbb R^p$ に対する[最小二乗勾配流](#def-slt2-02-gradient-flow)では、全ての $t\ge0$ について

$$
P_{\ker X}\beta(t)=P_{\ker X}\beta_0.
$$

> さらに極限は

$$
\lim_{t\to\infty}\beta(t)=X^\dagger y+P_{\ker X}\beta_0.
$$

> したがって最小ノルム解に収束する必要十分条件は $P_{\ker X}\beta_0=0$ である。特に零初期値は十分条件だが、任意の初期値について最小ノルムを主張してはならない。
<!-- formal-statement-end -->

### 証明の見取り図

勾配 $-X^{\mathsf T}(X\beta-y)$ は常に $\operatorname{row}(X)$ に属する。核との直交性から核への射影は時間で変化しない。行空間の各成分は、同じ一次元の減衰方程式で初期値の寄与を忘れる。

<!-- proof-start -->
### 証明

[行空間と核の直交性](../SLT2-01/index.md#thm-slt2-01-row-null-prediction)より $P_{\ker X}X^{\mathsf T}=0$。定義式の両辺に射影を掛けると

$$
\frac{d}{dt}P_{\ker X}\beta(t)
=-P_{\ker X}X^{\mathsf T}(X\beta(t)-y)=0.
$$

よって核への射影は初期値のままである。一方、$c_j=u_j^{\mathsf T}y$ と置く。$v_j$ 成分 $b_j(t)=v_j^{\mathsf T}\beta(t)$ は

$$
\dot b_j=-\sigma_j^2b_j+\sigma_jc_j,
\qquad
b_j(t)=e^{-\sigma_j^2t}v_j^{\mathsf T}\beta_0
+(1-e^{-\sigma_j^2t})\frac{c_j}{\sigma_j}
$$

となる。右辺を微分すれば元の方程式が成立し、$t=0$ の値も一致する。従って

$$
\beta(t)=P_{\ker X}\beta_0+
\sum_{j=1}^r\left[
e^{-\sigma_j^2t}v_j^{\mathsf T}\beta_0+
(1-e^{-\sigma_j^2t})\frac{c_j}{\sigma_j}
\right]v_j.
$$

$t\to\infty$ とすると、残るのは核成分と $\sum_j(c_j/\sigma_j)v_j=X^\dagger y$ である。両者は直交するので、極限のノルム平方は $\|X^\dagger y\|^2+\|P_{\ker X}\beta_0\|^2$。ゆえに最小ノルムである必要十分条件は核成分が零となることである。$\square$
<!-- proof-end -->

### 反例：補間はしても、最小ノルムを選ばない初期値

$X=(1\;\;0)$、$y=(1)$、$\beta_0=(0,5)^{\mathsf T}$ とする。勾配流は

$$
\dot\beta_1=1-\beta_1,\qquad \dot\beta_2=0,
\qquad
\beta(t)=\begin{pmatrix}1-e^{-t}\\5\end{pmatrix}
\longrightarrow\begin{pmatrix}1\\5\end{pmatrix}.
$$

極限は確かに $X\beta=1$ を満たすが、最小ノルム補間解 $(1,0)^{\mathsf T}$ ではない。失った条件は**核成分が零の初期値**である。勾配は第二成分に一度も働かない。

### 階数欠損の場合：最小二乗への収束を補間と呼ばない

$$
X=\begin{pmatrix}1&0\\2&0\end{pmatrix},
\qquad y=\begin{pmatrix}1\\0\end{pmatrix}.
$$

$X$ は階数1で、$y$ は像である $(1,2)^{\mathsf T}$ の張る直線上にない。零初期値の勾配流は

$$
\dot\beta_1=-5\beta_1+1,\quad \dot\beta_2=0,
\qquad
\beta(t)=\begin{pmatrix}(1-e^{-5t})/5\\0\end{pmatrix}.
$$

極限 $(1/5,0)^{\mathsf T}$ の適合値は $(1/5,2/5)^{\mathsf T}$、残差は $(4/5,-2/5)^{\mathsf T}$ であり、零ではない。$XX^{\mathsf T}$ は階数1なので逆行列公式も使えない。擬似逆解へ収束することと、補間できることは別の命題である。

## 5. この選択則の範囲

| 条件 | 勾配流の極限 | 保証しないこと |
|---|---|---|
| 零初期値・任意の有限行列 | 最小ノルム最小二乗解 $X^\dagger y$ | $y$ を常に補間できるとは限らない |
| 零初期値・$y\in\operatorname{Im}X$ | 最小ノルム**補間**解 | 未知の入力分布での低リスク |
| 非零初期値・核成分あり | $X^\dagger y+P_{\ker X}\beta_0$ | 最小ノルム性 |
| 正の特異値が小さい | 時間スケール $1/\sigma_j^2$ が長い | 有限時間での極限解への到達 |

この章の計算では全ての係数の勾配流を連続時間で正確に解いた。有限ステップの勾配降下法や学習率の大きさについては、別途安定条件が必要である。また初期値を零とすることと、母集団で正しい係数を選ぶことは同義ではない。[訓練上の観測同値性](../SLT2-01/index.md#def-slt2-01-observational-equivalence)が示す通り、訓練で区別できない核方向の信号は、データだけから回復できない。次章では正則化を入れたridge回帰のスペクトルを調べる。

## 演習

**問題 SLT2-02-A01（補間族の最小ノルム）**
- Level: A

$X=(1\;\;1)$、$y=(4)$ とする。全補間解を一変数で表し、ノルム平方を平方完成して最小ノルム解を求めよ。

<!-- solution-start -->
**詳細解答**。$\beta_1+\beta_2=4$ だから $\beta=(s,4-s)^{\mathsf T}$。平方ノルムは

$$
s^2+(4-s)^2=2s^2-8s+16=2(s-2)^2+8.
$$

$s=2$ だけで最小となり、$\beta^\dagger=(2,2)^{\mathsf T}$。$X\beta^\dagger=4$ も満たす。核方向 $(1,-1)^{\mathsf T}$ を足すとノルムが増える。
<!-- solution-end -->

**問題 SLT2-02-A02（行フルランクの逆行列公式）**
- Level: A

$X=(2\;\;0\;\;1)$、$y=(5)$ とする。$XX^{\mathsf T}$、$(XX^{\mathsf T})^{-1}$、最小ノルム補間解を求め、補間を検算せよ。

<!-- solution-start -->
**詳細解答**。$XX^{\mathsf T}=(2^2+0^2+1^2)=(5)$。行数は1、階数は1なので逆行列 $(1/5)$ が存在する。[最小ノルム解のSVD表示と行フルランク公式](#thm-slt2-02-minimum-norm)より

$$
\beta^\dagger=X^{\mathsf T}(1/5)(5)
=\begin{pmatrix}2\\0\\1\end{pmatrix}.
$$

実際 $X\beta^\dagger=2\cdot2+0+1=5=y$。核の任意の成分を加えても補間は可能だがノルムは増える。
<!-- solution-end -->

**問題 SLT2-02-A03（一次元勾配流）**
- Level: A

$X=(3)$、$y=(6)$、$\beta(0)=0$ のとき、$L=\|X\beta-y\|^2/2$ に対する勾配流と極限を求めよ。

<!-- solution-start -->
**詳細解答**。微分により $\nabla L=3(3\beta-6)=9\beta-18$。従って $\dot\beta=-9\beta+18$。定常点は2で、$e^{-9t}$ を用いた解

$$
\beta(t)=2(1-e^{-9t})
$$

は $\beta(0)=0$、$\dot\beta=18e^{-9t}$、$-9\beta+18=18e^{-9t}$ を満たす。$t\to\infty$ で2となり、$3\cdot2=6$ を補間する。
<!-- solution-end -->

**問題 SLT2-02-A04（核成分の保存）**
- Level: A

$X=(1\;\;0)$、$y=(3)$、$\beta(0)=(4,-2)^{\mathsf T}$ とする。勾配流と極限、最小ノルム解との差を求めよ。

<!-- solution-start -->
**詳細解答**。損失は $(\beta_1-3)^2/2$ で $\dot\beta_1=3-\beta_1$、$\dot\beta_2=0$。初期値を代入した解は

$$
\beta_1(t)=3+(4-3)e^{-t}=3+e^{-t},\qquad
\beta_2(t)=-2.
$$

極限は $(3,-2)^{\mathsf T}$、最小ノルム解は $(3,0)^{\mathsf T}$。差は $(0,-2)^{\mathsf T}\in\ker X$ であり、[核成分の保存](#prop-slt2-02-initialization)と一致する。
<!-- solution-end -->

**問題 SLT2-02-A05（補間不能の残差）**
- Level: A

$X=\begin{pmatrix}1&0\\1&0\end{pmatrix}$、$y=(2,0)^{\mathsf T}$ とする。零初期値勾配流の極限係数、適合値、残差を求め、補間不能な理由を説明せよ。

<!-- solution-start -->
**詳細解答**。$X\beta=(\beta_1,\beta_1)^{\mathsf T}$ なので損失の微分は $(\beta_1-2)+\beta_1=2\beta_1-2$。流れは $\dot\beta_1=-2\beta_1+2$、$\dot\beta_2=0$。零初期値の解は

$$
\beta(t)=(1-e^{-2t},0)^{\mathsf T}\to(1,0)^{\mathsf T}.
$$

適合値は $(1,1)^{\mathsf T}$、残差は $y-X\beta^\dagger=(1,-1)^{\mathsf T}$。どの係数でも二つの訓練予測が一致するのに、$y$ の二成分は異なるため補間不能である。
<!-- solution-end -->

**問題 SLT2-02-B01（2行3列の逆Gram行列）**
- Level: B

$X=\begin{pmatrix}1&0&1\\0&1&1\end{pmatrix}$、$y=(3,0)^{\mathsf T}$ とする。全補間解を求め、平方完成と $X^{\mathsf T}(XX^{\mathsf T})^{-1}y$ の両方から最小ノルム係数を求めよ。

<!-- solution-start -->
**詳細解答**。方程式は $\beta_1+\beta_3=3$、$\beta_2+\beta_3=0$。$\beta_3=s$ とすれば $(3-s,-s,s)^{\mathsf T}$ が全解。ノルム平方は

$$
(3-s)^2+2s^2=3s^2-6s+9=3(s-1)^2+6,
$$

ゆえに最小係数は $(2,-1,1)^{\mathsf T}$。一方 $XX^{\mathsf T}=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ は行フルランクで、逆行列は $\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$。[最小ノルム解のSVD表示と行フルランク公式](#thm-slt2-02-minimum-norm)より

$$
(XX^{\mathsf T})^{-1}y=(2,-1)^{\mathsf T},
\quad X^{\mathsf T}(2,-1)^{\mathsf T}=(2,-1,1)^{\mathsf T}.
$$

二つの方法が一致し、$X(2,-1,1)^{\mathsf T}=(3,0)^{\mathsf T}$ と検算できる。
<!-- solution-end -->

**問題 SLT2-02-B02（対角SVDと時間スケール）**
- Level: B

$X=\operatorname{diag}(2,1/2)$、$y=(4,1)^{\mathsf T}$、$\beta(0)=0$ とする。勾配流の各成分と残差 $y-X\beta(t)$、極限係数を求め、遅い方向を特定せよ。

<!-- solution-start -->
**詳細解答**。$X$ の正の特異値は2と $1/2$ であり、[勾配流の特異モード解と極限](#thm-slt2-02-gradient-flow-limit)の式から

$$
\beta_1(t)=2(1-e^{-4t}),\qquad
\beta_2(t)=2(1-e^{-t/4}).
$$

実際 $\dot\beta_1=-4\beta_1+8$、$\dot\beta_2=-\beta_2/4+1/2$ を満たす。予測は $(4(1-e^{-4t}),\,1-e^{-t/4})^{\mathsf T}$ だから残差は $(4e^{-4t},\,e^{-t/4})^{\mathsf T}$。極限は $(2,2)^{\mathsf T}$。第二成分は減衰率 $1/4$ なので、第一成分の減衰率4より遅い。
<!-- solution-end -->

**問題 SLT2-02-B03（初期化による選択）**
- Level: B

$X=(1\;\;1\;\;0)$、$y=(2)$、$\beta_0=(2,0,5)^{\mathsf T}$ とする。零初期値の最小ノルム補間解と、与えた初期値からの勾配流の極限を比較し、核成分を具体的に求めよ。

<!-- solution-start -->
**詳細解答**。$XX^{\mathsf T}=(2)$ なので [最小ノルム解のSVD表示と行フルランク公式](#thm-slt2-02-minimum-norm)から $\beta^\dagger=X^{\mathsf T}(1/2)(2)=(1,1,0)^{\mathsf T}$。[行空間と核の直交性](../SLT2-01/index.md#thm-slt2-01-row-null-prediction)により行方向の射影は

$$
P_{\operatorname{row}(X)}\beta_0
=\frac{(1,1,0)^{\mathsf T}(1,1,0)}{2}\beta_0
=(1,1,0)^{\mathsf T}.
$$

したがって核成分は $\beta_0-P_{\operatorname{row}(X)}\beta_0=(1,-1,5)^{\mathsf T}$。これは実際に $X(1,-1,5)^{\mathsf T}=0$ を満たす。[初期値の核成分の保存](#prop-slt2-02-initialization)より極限は

$$
\beta^\dagger+P_{\ker X}\beta_0
=(2,0,5)^{\mathsf T}.
$$

この初期値は既に補間しているため、全時間で変化しないこととも整合する。
<!-- solution-end -->

**問題 SLT2-02-B04（階数1とSVDの零方向）**
- Level: B

$X=\begin{pmatrix}1&1\\2&2\end{pmatrix}$、$y=(1,0)^{\mathsf T}$ とする。最小ノルム最小二乗解と最小残差を求め、$XX^{\mathsf T}$ の通常の逆行列を使えない理由を述べよ。また零初期値勾配流の極限と一致することを確認せよ。

<!-- solution-start -->
**詳細解答**。全予測は $(s,2s)^{\mathsf T}$（$s=\beta_1+\beta_2$）。残差二乗は $(1-s)^2+4s^2=5(s-1/5)^2+4/5$ で、最小値は $4/5$、最適な和は $s=1/5$。係数ノルムは $\beta_1^2+(1/5-\beta_1)^2=2(\beta_1-1/10)^2+1/50$ なので

$$
\beta^\dagger=(1/10,1/10)^{\mathsf T},
\qquad y-X\beta^\dagger=(4/5,-2/5)^{\mathsf T}.
$$

$XX^{\mathsf T}=\begin{pmatrix}2&4\\4&8\end{pmatrix}$ は行列式 $16-16=0$ で、逆行列がない。一方、勾配は両係数に同じ $5s-1$ を作用させる。零初期値では $\beta_1(t)=\beta_2(t)=a(t)$、$s=2a$ なので $\dot a=1-10a$。よって $a(t)=(1-e^{-10t})/10$ で、極限は $\beta^\dagger$ に一致する。
<!-- solution-end -->

**問題 SLT2-02-C01（擬似逆・勾配流・非零初期値の総合）**
- Level: C

固定設計 $X=\begin{pmatrix}1&0&1\\0&1&1\end{pmatrix}$ と $y=(1,2)^{\mathsf T}$ を考える。

1. $X$ が行フルランクであることを示し、$X^\dagger y$ を求めよ。全補間解のノルム平方による検算も行え。
2. 零初期値の勾配流を特異モードごとに解き、$X\beta(t)-y$ を求めよ。有限時刻と無限時間の違いを述べよ。
3. 初期値を $\beta_0=(-1,-1,1)^{\mathsf T}$ に変えた場合の流れと極限を求め、最小ノルム解にならない理由を説明せよ。
4. 真の係数を $(1,2,0)^{\mathsf T}$ と仮定した場合、零初期値の極限がそれと一致するか確かめ、訓練補間と係数回復を区別せよ。

<!-- solution-start -->
**詳細解答**。

**1.** 二行は独立で $r=n=2$。$XX^{\mathsf T}=\begin{pmatrix}2&1\\1&2\end{pmatrix}$、逆行列は $\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$ なので、[最小ノルム解のSVD表示と行フルランク公式](#thm-slt2-02-minimum-norm)を適用して

$$
\beta^\dagger=X^{\mathsf T}\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}
\begin{pmatrix}1\\2\end{pmatrix}
=X^{\mathsf T}\begin{pmatrix}0\\1\end{pmatrix}
=(0,1,1)^{\mathsf T}.
$$

全補間解は $(1-s,2-s,s)^{\mathsf T}$。ノルム平方は $3(s-1)^2+2$ で、$s=1$ のときのみ上記の解を得る。

**2.** $XX^{\mathsf T}$ の固有値3の方向は $(1,1)^{\mathsf T}$、固有値1の方向は $(1,-1)^{\mathsf T}$。$y=(3/2)(1,1)^{\mathsf T}-(1/2)(1,-1)^{\mathsf T}$ と分け、[勾配流の特異モード解と極限](#thm-slt2-02-gradient-flow-limit)を使うと

$$
\beta(t)=\frac12
\begin{pmatrix}
e^{-t}-e^{-3t}\\
2-e^{-t}-e^{-3t}\\
2-2e^{-3t}
\end{pmatrix}.
$$

$X\beta$ の第1成分は $\beta_1+\beta_3=1+\frac12e^{-t}-\frac32e^{-3t}$、第2成分は $\beta_2+\beta_3=2-\frac12e^{-t}-\frac32e^{-3t}$。この二つから $y$ を引くと

$$
X\beta(t)-y
=-\frac32e^{-3t}\begin{pmatrix}1\\1\end{pmatrix}
+\frac12e^{-t}\begin{pmatrix}1\\-1\end{pmatrix}.
$$

従って第1成分は $-\frac32e^{-3t}+\frac12e^{-t}$、第2成分は $-\frac32e^{-3t}-\frac12e^{-t}$ である。$t=0$ には $(-1,-2)^{\mathsf T}=-y$、$t\to\infty$ には0へ収束する。二つの固有方向は直交しているので、残差ノルムは

$$
\|X\beta(t)-y\|_2^2
=\frac92e^{-6t}+\frac12e^{-2t}>0
\qquad(0\le t<\infty).
$$

したがって有限時刻では完全補間せず、無限時間の極限でのみ残差が零になる。

**3.** $z=(-1,-1,1)^{\mathsf T}$ は $Xz=0$ を満たすので、核の元である。初期値を核方向へ変えると

$$
\beta_{\beta_0}(t)=\beta_{\mathrm{zero}}(t)+z
\quad\longrightarrow\quad
(-1,0,2)^{\mathsf T}.
$$

和の微分は元の流れと同じであり、初期時刻で $z$ を与える。極限の訓練予測は $X(-1,0,2)^{\mathsf T}=(1,2)^{\mathsf T}$ だが、そのノルム平方は5で、最小ノルム解の平方ノルム2より大きい。

**4.** 指定された真の係数 $\beta^\star=(1,2,0)^{\mathsf T}$ も $X\beta^\star=(1,2)^{\mathsf T}$ を満たす。しかし $\beta^\dagger=(0,1,1)^{\mathsf T}\ne\beta^\star$ である。両者の差は $(-1,-1,1)^{\mathsf T}\in\ker X$ であり、[観測同値性](../SLT2-01/index.md#def-slt2-01-observational-equivalence)により訓練値からは区別できない。零初期値の極限は規則として定まるが、真の係数の回復を保証しない。
<!-- solution-end -->

## まとめ

- 擬似逆 $X^\dagger$ は正の特異値方向だけを逆にし、核方向を零にする。行フルランクなら $X^\dagger=X^{\mathsf T}(XX^{\mathsf T})^{-1}$。
- $L=\|X\beta-y\|_2^2/2$ の零初期値勾配流は、各特異方向で $1-e^{-\sigma_j^2t}$ を係数に掛け、無限時間で $X^\dagger y$ に収束する。
- 非零初期値の核成分は保存される。階数欠損で補間不能な応答には、最小二乗の適合値までしか到達しない。
- 係数を選ぶ規則、有限時間での最適化誤差、未知の分布での予測リスクは異なる問いである。
