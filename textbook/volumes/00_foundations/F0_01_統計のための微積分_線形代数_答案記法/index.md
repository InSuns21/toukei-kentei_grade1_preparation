# F0-01 統計のための微積分・線形代数・答案記法

この章は、微積分や線形代数を一般論として最初から学び直す章ではありません。統計検定1級で頻出する計算を、**台・母数範囲・存在条件・行列の次元・最大最小の根拠を落とさずに再現するための準備章**です。

共通表記は [統計教材 共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md)、[公式出題範囲との対応](../../../../references/official-scope.md) に従います。確率密度関数・累積分布関数・最尤推定量などは日本語正式名を主表記にします。

> **導出粒度の基準**
>
> 本章では答えだけを置かず、少なくとも「出発点 → 適用条件 → 主要な途中計算 → 結論」を残します。特に、広義積分の収束、停留点の最大・最小判定、変数変換の像、ヤコビアンの絶対値、行列の可逆性は採点対象になり得るため省略しません。

## この章で解けるようになる問題

- 確率密度関数の正規化、期待値、分散を台と積分可能性から計算する。
- 尤度を対数尤度へ移し、内部解・境界解を区別して最大化する。
- 多変数変換で逆変換、像の範囲、ヤコビアンを順に求める。
- 二次形式を固有値分解し、正定値性や最大分散方向を判定する。
- 最小二乗法を正規方程式と直交射影として扱う。
- 必要条件・十分条件、同値変形、一方向の含意を区別して答案を書く。
- 詳細解答から得点の核を残した本番答案へ圧縮する。

---

# 1. 統計問題を「条件・計算・解釈」に分ける

統計検定1級の問題は、多くの場合次の三層に分かれます。

1. 確率モデルを読み、台と母数空間を確定する。
2. 微積分または線形代数で、求める量を導く。
3. 得られた式を推定・検定・予測の言葉で解釈する。

第2層だけを速くしても、第1層の条件確認を落とすと誤答になります。典型例は次です。

- スコア方程式を解いただけで最大値と決める。
- 母数に依存する台を無視して尤度を微分する。
- 対称な広義積分を形式的に相殺し、存在しない期待値を0とする。
- ヤコビアンだけ求めて変換後の領域を書かない。
- 非正則な行列に逆行列を置く。

本章では、計算を速くすることより先に「その計算を使ってよい条件」を固定します。

---

# 2. 最小限の定義

## 2.1 確率密度関数・累積分布関数

連続型確率変数 $X$ の確率密度関数 $f_X$ は非負で

$$
\int_{-\infty}^{\infty}f_X(x)\,dx=1
$$

を満たし、

$$
P(a<X\le b)=\int_a^b f_X(x)\,dx
$$

で区間確率を与えます。累積分布関数は

$$
F_X(x)=P(X\le x)
$$

です。

## 2.2 台と母数空間

本章では

$$
\mathcal X=\{x:f_X(x)>0\}
$$

を台と呼びます。答案では、積分範囲または指示関数で実際に使う範囲を明示します。

例えば

$$
f_\lambda(x)=\lambda e^{-\lambda x}\boldsymbol 1_{(0,\infty)}(x),
\qquad \lambda>0
$$

では、観測値の台は $(0,\infty)$、母数空間は $(0,\infty)$ です。両者は別物です。

台が母数に依存する例として

$$
f_\theta(x)=\frac1\theta\boldsymbol 1_{[0,\theta]}(x),
\qquad \theta>0
$$

があります。このとき標本 $x_1,\ldots,x_n$ に対する尤度には

$$
\theta\ge \max_i x_i
$$

という制約が現れます。

## 2.3 期待値の存在

$E[g(X)]$ を有限な実数として扱うには、少なくとも

$$
\int_{\mathcal X}|g(x)|f_X(x)\,dx<\infty
$$

を確認すれば十分です。このとき

$$
E[g(X)]=\int_{\mathcal X}g(x)f_X(x)\,dx.
$$

正部分と負部分がそれぞれ発散する場合、対称性で相殺してはいけません。

## 2.4 尤度・最尤推定量

$X_1,\ldots,X_n$ が独立同分布で密度 $f_\theta$ を持つとします。観測値 $x_1,\ldots,x_n$ に対して

$$
L(\theta;x_1,\ldots,x_n)
=\prod_{i=1}^n f_\theta(x_i)
$$

を尤度と呼びます。母数空間内で尤度を最大にする統計量を最尤推定量と呼びます。

微分可能な内部点では停留条件が使えますが、境界解や母数依存の台では、尤度の単調性や区分表示を直接確認します。

## 2.5 勾配とヘッセ行列

$g:\mathbb R^p\to\mathbb R$ に対し、勾配を

$$
\nabla g(\boldsymbol x)
=
\begin{pmatrix}
\partial g/\partial x_1\\
\vdots\\
\partial g/\partial x_p
\end{pmatrix}
$$

とし、ヘッセ行列を

$$
\nabla^2 g(\boldsymbol x)
=
\left(\frac{\partial^2g}{\partial x_i\partial x_j}\right)_{i,j}
$$

とします。

内部点 $\boldsymbol x_0$ で $\nabla g(\boldsymbol x_0)=\boldsymbol0$ かつヘッセ行列が負定値なら狭義局所最大、正定値なら狭義局所最小です。ヘッセ行列の符号だけを見てはいけません。

## 2.6 ヤコビ行列とヤコビアン

写像 $T:\mathbb R^p\to\mathbb R^p$ のヤコビ行列を

$$
DT(\boldsymbol x)
=
\left(\frac{\partial T_i}{\partial x_j}\right)_{i,j}
$$

とし、その行列式をヤコビアンと呼びます。

確率密度関数の変数変換では通常、逆変換 $\boldsymbol x=T^{-1}(\boldsymbol y)$ に対する

$$
\left|\det DT^{-1}(\boldsymbol y)\right|
$$

を使います。**絶対値・逆変換・像の範囲**の三つをセットで確認します。

## 2.7 ベクトル・行列の次元

ベクトルは列ベクトルを既定とします。$\boldsymbol x\in\mathbb R^p$、$\boldsymbol A\in\mathbb R^{p\times p}$ なら

$$
\boldsymbol x^{\mathsf T}\boldsymbol A\boldsymbol x
$$

はスカラーです。積の順序は一般には交換できません。

## 2.8 正定値・半正定値

実対称行列 $\boldsymbol A$ が正定値であるとは、任意の $\boldsymbol x\ne\boldsymbol0$ について

$$
\boldsymbol x^{\mathsf T}\boldsymbol A\boldsymbol x>0
$$

となることです。半正定値であるとは、任意の $\boldsymbol x$ について

$$
\boldsymbol x^{\mathsf T}\boldsymbol A\boldsymbol x\ge0
$$

となることです。

確率ベクトル $\boldsymbol X$ の分散共分散行列 $\boldsymbol\Sigma$ は

$$
\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a
=\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X)\ge0
$$

なので常に半正定値です。

## 2.9 シュール補

ブロック行列

$$
\boldsymbol M=
\begin{pmatrix}
A&B\\
C&D
\end{pmatrix}
$$

で $D$ が可逆なとき、

$$
A-BD^{-1}C
$$

を $D$ に関するシュール補と呼びます。多変量正規分布の条件付き分散共分散行列で再登場します。

## 2.10 固有値・固有ベクトル

$\boldsymbol v\ne\boldsymbol0$ が

$$
\boldsymbol A\boldsymbol v=\lambda\boldsymbol v
$$

を満たすとき、$\lambda$ を固有値、$\boldsymbol v$ を対応する固有ベクトルと呼びます。

## 2.11 直交射影行列

$\boldsymbol P\in\mathbb R^{n\times n}$ が

$$
\boldsymbol P^{\mathsf T}=\boldsymbol P,
\qquad
\boldsymbol P^2=\boldsymbol P
$$

を満たすとき、直交射影行列と呼びます。$\boldsymbol P\boldsymbol y$ と $(\boldsymbol I_n-\boldsymbol P)\boldsymbol y$ は互いに直交します。

## 2.12 ランダウ記号

正の数列 $b_n$ に対し

$$
a_n=O(b_n)
$$

とは、ある $C>0,N$ が存在し、$n\ge N$ で $|a_n|\le Cb_n$ となることです。また

$$
a_n=o(b_n)
$$

とは $a_n/b_n\to0$ となることです。確率的ランダウ記号は後続章で別に定義します。

## 2.13 答案で使う論理

$A\Longrightarrow B$ のとき、$A$ は $B$ の十分条件、$B$ は $A$ の必要条件です。必要十分条件を示すには両方向が必要です。

また $\Longleftrightarrow$ は各変形が可逆なときだけ使います。例えば $c$ で割る変形には $c\ne0$ が必要です。

$$
\forall\theta\ \exists c_\theta
$$

と

$$
\exists c\ \forall\theta
$$

も異なります。量化順序を勝手に交換しません。

---

# 3. 基本命題と主要定理

## 3.1 対数尤度で最大化してよい条件

$L(\theta)>0$ の範囲では、対数関数が狭義単調増加なので

$$
L(\widehat\theta)\ge L(\theta)
\Longleftrightarrow
\log L(\widehat\theta)\ge\log L(\theta).
$$

したがって尤度と対数尤度の最大点は一致します。ただし $L(\theta)=0$ となる点や母数依存の台は、元の尤度で別途確認します。

## 3.2 多変数変換の密度公式

$T:\mathcal X\to\mathcal Y$ が一対一かつ全射で、$T,T^{-1}$ が連続微分可能、さらに

$$
\det DT^{-1}(\boldsymbol y)\ne0
$$

とします。$\boldsymbol Y=T(\boldsymbol X)$ なら

$$
f_{\boldsymbol Y}(\boldsymbol y)
=f_{\boldsymbol X}(T^{-1}(\boldsymbol y))
\left|\det DT^{-1}(\boldsymbol y)\right|,
\qquad \boldsymbol y\in\mathcal Y.
$$

**導出**：任意の領域 $A\subset\mathcal Y$ について

$$
\begin{aligned}
P(\boldsymbol Y\in A)
&=P(\boldsymbol X\in T^{-1}(A))\\
&=\int_{T^{-1}(A)}f_{\boldsymbol X}(\boldsymbol x)\,d\boldsymbol x\\
&=\int_A f_{\boldsymbol X}(T^{-1}(\boldsymbol y))
\left|\det DT^{-1}(\boldsymbol y)\right|\,d\boldsymbol y.
\end{aligned}
$$

一対一でない変換では逆像の各枝の寄与を足します。

## 3.3 実対称行列のスペクトル分解

実対称行列 $\boldsymbol A$ には、ある直交行列 $\boldsymbol Q$ と実固有値 $\lambda_1,\ldots,\lambda_p$ が存在して

$$
\boldsymbol A
=\boldsymbol Q\operatorname{diag}(\lambda_1,\ldots,\lambda_p)\boldsymbol Q^{\mathsf T}
$$

と書けます。$\boldsymbol z=\boldsymbol Q^{\mathsf T}\boldsymbol x$ と置けば

$$
\begin{aligned}
\boldsymbol x^{\mathsf T}\boldsymbol A\boldsymbol x
&=\boldsymbol z^{\mathsf T}
\operatorname{diag}(\lambda_1,\ldots,\lambda_p)\boldsymbol z\\
&=\sum_{i=1}^p\lambda_i z_i^2.
\end{aligned}
$$

本章では有限次元実対称行列のスペクトル定理自体は既知の線形代数として使い、二次形式への変換を答案で再現できるようにします。

## 3.4 正定値性と固有値

実対称行列 $\boldsymbol A$ が正定値であることと、全固有値が正であることは同値です。

全固有値が正なら、$\boldsymbol z=\boldsymbol Q^{\mathsf T}\boldsymbol x\ne0$ に対して

$$
\boldsymbol x^{\mathsf T}\boldsymbol A\boldsymbol x
=\sum_i\lambda_i z_i^2>0.
$$

逆に正定値なら、単位固有ベクトル $\boldsymbol q_i$ に対して

$$
0<\boldsymbol q_i^{\mathsf T}\boldsymbol A\boldsymbol q_i
=\lambda_i.
$$

よって全固有値が正です。半正定値の場合は不等号を非負に置き換えます。

2次実対称行列

$$
\begin{pmatrix}a&b\\b&c\end{pmatrix}
$$

では、正定値の必要十分条件は

$$
a>0,
\qquad ac-b^2>0
$$

です。

## 3.5 直交射影行列の基本性質

$\boldsymbol P^{\mathsf T}=\boldsymbol P$、$\boldsymbol P^2=\boldsymbol P$ なら

$$
\begin{aligned}
(\boldsymbol P\boldsymbol y)^{\mathsf T}(\boldsymbol I-\boldsymbol P)\boldsymbol y
&=\boldsymbol y^{\mathsf T}(\boldsymbol P-\boldsymbol P^2)\boldsymbol y\\
&=0.
\end{aligned}
$$

したがって射影成分と残差成分は直交します。

また $\boldsymbol P\boldsymbol v=\lambda\boldsymbol v$ に $\boldsymbol P$ を作用させると

$$
\lambda^2\boldsymbol v=\lambda\boldsymbol v,
$$

よって固有値は $0$ または $1$ です。

---

# 4. 典型例

## 例1：確率密度関数の正規化と期待値

$\theta>0$ とし

$$
f_\theta(x)=c(\theta)x^{\theta-1}(1-x)\boldsymbol1_{(0,1)}(x)
$$

とします。まず

$$
\begin{aligned}
\int_0^1x^{\theta-1}(1-x)\,dx
&=\frac1\theta-\frac1{\theta+1}\\
&=\frac1{\theta(\theta+1)}.
\end{aligned}
$$

したがって

$$
c(\theta)=\theta(\theta+1).
$$

期待値は

$$
\begin{aligned}
E_\theta[X]
&=\theta(\theta+1)\int_0^1x^\theta(1-x)\,dx\\
&=\theta(\theta+1)
\left(\frac1{\theta+1}-\frac1{\theta+2}\right)\\
&=\frac\theta{\theta+2}.
\end{aligned}
$$

$0<X<1$ なので $0<E[X]<1$ という検算も通ります。

## 例2：正規分布の最尤推定

$X_1,\ldots,X_n$ が独立に $N(\mu,\sigma^2)$ に従うとします。対数尤度は

$$
\ell(\mu,\sigma^2)
=-\frac n2\log(2\pi)-\frac n2\log\sigma^2
-\frac1{2\sigma^2}\sum_i(x_i-\mu)^2.
$$

$\sigma^2$ を固定すると

$$
\frac{\partial\ell}{\partial\mu}
=\frac n{\sigma^2}(\overline x-\mu),
$$

よって $\widehat\mu=\overline x$。二階偏微分は $-n/\sigma^2<0$ です。

$v=\sigma^2$ と置き

$$
s_n^2=\frac1n\sum_i(x_i-\overline x)^2>0
$$

とすれば

$$
\frac{d\ell(\overline x,v)}{dv}
=\frac{n(s_n^2-v)}{2v^2}.
$$

よって符号が正から負へ変わる唯一の点は

$$
\widehat{\sigma^2}=\frac1n\sum_i(x_i-\overline x)^2.
$$

全観測値が同じで $s_n^2=0$ なら、$v\downarrow0$ で尤度が発散し、$v>0$ 内に最尤推定値は存在しません。

## 例3：二つの指数変数の変換

$X,Y$ が独立に率 $\lambda$ の指数分布に従い

$$
U=X+Y,
\qquad
V=\frac X{X+Y}
$$

とします。逆変換は

$$
x=uv,
\qquad y=u(1-v),
$$

像は $u>0,0<v<1$ です。ヤコビアンの絶対値は

$$
\left|
\det
\begin{pmatrix}
v&u\\
1-v&-u
\end{pmatrix}
\right|=u.
$$

したがって

$$
f_{U,V}(u,v)
=\lambda^2ue^{-\lambda u}
\boldsymbol1_{(0,\infty)}(u)
\boldsymbol1_{(0,1)}(v).
$$

$u$ と $v$ の関数へ分離するので $U,V$ は独立で、$V$ は $(0,1)$ 上の一様分布です。

## 例4：最小二乗法と射影

$\boldsymbol Y\in\mathbb R^n$、$\boldsymbol X\in\mathbb R^{n\times p}$、$\operatorname{rank}(\boldsymbol X)=p$ とします。

$$
Q(\boldsymbol\beta)
=\|\boldsymbol Y-\boldsymbol X\boldsymbol\beta\|^2
$$

を展開すると

$$
Q
=\boldsymbol Y^{\mathsf T}\boldsymbol Y
-2\boldsymbol\beta^{\mathsf T}\boldsymbol X^{\mathsf T}\boldsymbol Y
+\boldsymbol\beta^{\mathsf T}\boldsymbol X^{\mathsf T}\boldsymbol X\boldsymbol\beta.
$$

よって

$$
\nabla Q
=-2\boldsymbol X^{\mathsf T}\boldsymbol Y
+2\boldsymbol X^{\mathsf T}\boldsymbol X\boldsymbol\beta.
$$

列フルランク性から $\boldsymbol X^{\mathsf T}\boldsymbol X$ は正定値で可逆なので

$$
\widehat{\boldsymbol\beta}
=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
\boldsymbol X^{\mathsf T}\boldsymbol Y.
$$

ハット行列

$$
\boldsymbol H
=\boldsymbol X(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}
$$

は対称かつ冪等なので、$\operatorname{col}(\boldsymbol X)$ への直交射影行列です。

---

# 5. 問題解決パターン

## CALC-1：積分・微分の前に三点確認

1. 台と母数空間を書く。
2. 積分なら端点の可積分性、微分なら内部解か境界解かを確認する。
3. 計算後、密度なら積分1、期待値なら値域、最適化なら符号変化で検算する。

## JAC-1：変数変換の四段階

1. 順変換を書く。
2. 逆変換を解く。
3. 元の台を逆変換へ代入して像を求める。
4. 逆変換のヤコビアンの絶対値を掛ける。

一対一でなければ逆像の枝を列挙し、各枝の寄与を足します。

## QUAD-1：二次形式を固有値へ移す

実対称行列なら

$$
\boldsymbol A=\boldsymbol Q\boldsymbol\Lambda\boldsymbol Q^{\mathsf T}
$$

として

$$
\boldsymbol x^{\mathsf T}\boldsymbol A\boldsymbol x
=\sum_i\lambda_i z_i^2
$$

へ移します。非対称行列へ実対称行列のスペクトル定理を無条件に使いません。

## PROJ-1：最小二乗を直交分解として読む

1. $\boldsymbol X$ の次元と階数を確認する。
2. 正規方程式を書く。
3. 可逆性がある場合だけ逆行列表示へ進む。
4. 当てはめ値と残差を $\boldsymbol H\boldsymbol Y$、$(\boldsymbol I-\boldsymbol H)\boldsymbol Y$ に分ける。
5. $\boldsymbol X^{\mathsf T}\widehat{\boldsymbol\varepsilon}=\boldsymbol0$ で直交性を確認する。

## ANSWER-1：本番答案へ圧縮する

削らないものは、台・母数空間、主要な立式、分岐を決める計算、定理の仮定、問われた結論です。反復的な算術だけを圧縮します。

---

# 6. 演習：問題の直後に解答

GitHub Pagesでは各解答を折りたたんで表示します。

## Level A：基礎

### F0-A01 端点での可積分性

実数 $a$ に対し、$\int_0^1x^a\,dx$ が有限になる必要十分条件を求め、有限な場合の値を計算せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$0<\varepsilon<1$ として、$a\ne-1$ なら

$$
\int_\varepsilon^1x^a\,dx
=\frac{1-\varepsilon^{a+1}}{a+1}.
$$

$a>-1$ なら $\varepsilon^{a+1}\to0$ なので $1/(a+1)$ に収束します。$a<-1$ なら発散します。$a=-1$ では

$$
\int_\varepsilon^1\frac{dx}{x}
=-\log\varepsilon\to\infty.
$$

したがって必要十分条件は

$$
\boxed{a>-1},
$$

有限な場合の値は $1/(a+1)$ です。

##### 本番答案

$\varepsilon\downarrow0$ として

$$
\int_\varepsilon^1x^a dx
=\frac{1-\varepsilon^{a+1}}{a+1}
$$

より $a>-1$ でのみ収束し、値は $1/(a+1)$。$a=-1$ は $-\log\varepsilon\to\infty$。

##### 採点基準

- 広義積分の立式: 2点
- $a=-1$ の場合分け: 2点
- 必要十分条件: 4点
- 積分値: 2点

<!-- solution-end -->

### F0-A02 勾配とヘッセ行列

$g(\boldsymbol x)=\boldsymbol x^{\mathsf T}\boldsymbol A\boldsymbol x-2\boldsymbol b^{\mathsf T}\boldsymbol x$ とする。ただし $\boldsymbol A$ は実対称行列である。$\nabla g$ と $\nabla^2g$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

一般に

$$
\nabla(\boldsymbol x^{\mathsf T}\boldsymbol A\boldsymbol x)
=(\boldsymbol A+\boldsymbol A^{\mathsf T})\boldsymbol x.
$$

$\boldsymbol A$ は対称なので

$$
\nabla g(\boldsymbol x)=2\boldsymbol A\boldsymbol x-2\boldsymbol b,
$$

さらに

$$
\boxed{\nabla^2g(\boldsymbol x)=2\boldsymbol A}.
$$

##### 本番答案

$\boldsymbol A^{\mathsf T}=\boldsymbol A$ より

$$
\nabla g=2\boldsymbol A\boldsymbol x-2\boldsymbol b,
\qquad
\nabla^2g=2\boldsymbol A.
$$

##### 採点基準

- 二次形式の勾配: 4点
- 線形項: 2点
- ヘッセ行列: 4点

<!-- solution-end -->

### F0-A03 固有値と正定値性

$$
\boldsymbol A=
\begin{pmatrix}3&1\\1&3\end{pmatrix}
$$

の固有値を求め、正定値であることを示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\det(\boldsymbol A-\lambda\boldsymbol I_2)
=(3-\lambda)^2-1
=(\lambda-2)(\lambda-4).
$$

固有値は $2,4$ です。$\boldsymbol A$ は実対称で全固有値が正なので正定値です。

##### 本番答案

特性多項式が $(\lambda-2)(\lambda-4)$。固有値 $2,4>0$、かつ実対称なので正定値。

##### 採点基準

- 特性多項式: 4点
- 固有値: 3点
- 定理の仮定と結論: 3点

<!-- solution-end -->

### F0-A04 射影行列

$\boldsymbol u\ne\boldsymbol0$ とし

$$
\boldsymbol P
=\frac{\boldsymbol u\boldsymbol u^{\mathsf T}}
{\boldsymbol u^{\mathsf T}\boldsymbol u}
$$

とおく。$\boldsymbol P$ が直交射影行列であることを示し、階数を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$\boldsymbol u^{\mathsf T}\boldsymbol u>0$ なので定義できます。転置すると

$$
\boldsymbol P^{\mathsf T}=\boldsymbol P.
$$

また

$$
\begin{aligned}
\boldsymbol P^2
&=\frac{\boldsymbol u\boldsymbol u^{\mathsf T}\boldsymbol u\boldsymbol u^{\mathsf T}}
{(\boldsymbol u^{\mathsf T}\boldsymbol u)^2}\\
&=\boldsymbol P.
\end{aligned}
$$

したがって直交射影行列です。像は $\operatorname{span}(\boldsymbol u)$ であり

$$
\boxed{\operatorname{rank}(\boldsymbol P)=1}.
$$

##### 本番答案

$\boldsymbol u^{\mathsf T}\boldsymbol u>0$。直接計算で $\boldsymbol P^{\mathsf T}=\boldsymbol P$、$\boldsymbol P^2=\boldsymbol P$。また $\boldsymbol P\boldsymbol x$ は常に $\boldsymbol u$ の定数倍で、$\boldsymbol P\boldsymbol u=\boldsymbol u$ だから像は $\operatorname{span}(\boldsymbol u)$、階数1。

##### 採点基準

- 定義可能性: 2点
- 対称性: 2点
- 冪等性: 3点
- 階数: 3点

<!-- solution-end -->

## Level B：小問セット

### F0-B01 ガンマ型密度

$\theta>0$ とし

$$
f_\theta(x)=c(\theta)x^2e^{-\theta x}\boldsymbol1_{(0,\infty)}(x)
$$

とする。$c(\theta)$ と $E_\theta[X]$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$t=\theta x$ とすると

$$
\int_0^\infty x^2e^{-\theta x}dx
=\frac1{\theta^3}\int_0^\infty t^2e^{-t}dt.
$$

部分積分を2回使えば $\int_0^\infty t^2e^{-t}dt=2$ なので

$$
c(\theta)=\frac{\theta^3}{2}.
$$

同様に $\int_0^\infty x^3e^{-\theta x}dx=6/\theta^4$ より

$$
E_\theta[X]
=\frac{\theta^3}{2}\frac6{\theta^4}
=\boxed{\frac3\theta}.
$$

##### 本番答案

$t=\theta x$ と置き

$$
1=c(\theta)\frac2{\theta^3}
$$

より $c(\theta)=\theta^3/2$。さらに

$$
E[X]=\frac{\theta^3}{2}\frac6{\theta^4}=3/\theta.
$$

##### 採点基準

- 正規化積分: 4点
- 正規化定数: 2点
- 期待値積分: 2点
- 結論: 2点

<!-- solution-end -->

### F0-B02 和と差への変換

$X,Y$ は独立に $(0,1)$ 上の一様分布に従う。$U=X+Y$、$V=X-Y$ とする。$(U,V)$ の同時確率密度関数を台とともに求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

逆変換は

$$
x=\frac{u+v}{2},
\qquad y=\frac{u-v}{2}.
$$

ヤコビアンの絶対値は

$$
\left|
\det
\begin{pmatrix}
1/2&1/2\\
1/2&-1/2
\end{pmatrix}
\right|=\frac12.
$$

$0<x<1,0<y<1$ を代入して

$$
0<u+v<2,
\qquad 0<u-v<2.
$$

したがって

$$
0<u<2,
\qquad
\max(-u,u-2)<v<\min(u,2-u).
$$

元の同時確率密度関数は単位正方形上で1なので、上記領域で

$$
f_{U,V}(u,v)=\frac12,
$$

それ以外では0です。

##### 本番答案

逆変換 $x=(u+v)/2,y=(u-v)/2$、ヤコビアン絶対値 $1/2$。条件 $0<u\pm v<2$ の領域で $f_{U,V}=1/2$、領域外で0。

##### 採点基準

- 逆変換: 2点
- ヤコビアン: 3点
- 領域: 3点
- 密度と検算: 2点

<!-- solution-end -->

### F0-B03 線形変換の分散共分散行列

$E[\boldsymbol X]=\boldsymbol\mu$、$\operatorname{Cov}(\boldsymbol X)=\boldsymbol\Sigma$ とする。定数行列 $\boldsymbol A$、定数ベクトル $\boldsymbol b$ に対し

$$
\boldsymbol Y=\boldsymbol A\boldsymbol X+\boldsymbol b
$$

の平均と分散共分散行列を導け。

<!-- solution-start -->

#### 解答

##### 詳細解答

期待値の線形性から

$$
E[\boldsymbol Y]=\boldsymbol A\boldsymbol\mu+\boldsymbol b.
$$

中心化すると

$$
\boldsymbol Y-E[\boldsymbol Y]
=\boldsymbol A(\boldsymbol X-\boldsymbol\mu).
$$

よって

$$
\begin{aligned}
\operatorname{Cov}(\boldsymbol Y)
&=E[(\boldsymbol Y-E[\boldsymbol Y])(\boldsymbol Y-E[\boldsymbol Y])^{\mathsf T}]\\
&=\boldsymbol A\boldsymbol\Sigma\boldsymbol A^{\mathsf T}.
\end{aligned}
$$

##### 本番答案

$$
E[\boldsymbol Y]=\boldsymbol A\boldsymbol\mu+\boldsymbol b,
\qquad
\operatorname{Cov}(\boldsymbol Y)=\boldsymbol A\boldsymbol\Sigma\boldsymbol A^{\mathsf T}.
$$

後式は $\boldsymbol Y-E\boldsymbol Y=\boldsymbol A(\boldsymbol X-\boldsymbol\mu)$ から従う。

##### 採点基準

- 平均: 3点
- 中心化: 2点
- 分散共分散行列の展開: 4点
- 定数項への言及: 1点

<!-- solution-end -->

### F0-B04 停留点と最大点

「微分可能な関数 $h$ が $h'(a)=0$ を満たせば、$a$ は局所最大点である」という主張を反例で否定せよ。さらに、狭義局所最大点と結論するための追加確認と、大域最大には別の確認が必要な理由を述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

反例は

$$
h(x)=x^2,
\qquad a=0
$$

です。$h'(0)=0$ ですが0は局所最小点です。

狭義局所最大とするには、例えば $a$ が定義域の内部にあり、$h$ が近傍で二階連続微分可能で

$$
h''(a)<0
$$

を確認するか、導関数が $a$ の前後で正から負へ変わることを確認します。

これは局所的な判定です。大域最大には、定義域全体の凹性、境界、他の停留点、無限遠なども比較する必要があります。

##### 本番答案

$h(x)=x^2,a=0$ なら $h'(0)=0$ だが0は局所最小点。局所最大には内部点であることと、例えば $h''(a)<0$ または導関数の正→負の符号変化を確認する。大域最大には定義域全体での比較が必要。

##### 採点基準

- 反例: 4点
- 局所最大の追加条件: 4点
- 局所と大域の区別: 2点

<!-- solution-end -->

## Level C：統計検定1級型

### F0-C01 台が母数に依存する最尤推定

$X_1,\ldots,X_n$ は独立に $[0,\theta]$ 上の一様分布に従う。$\theta>0,n\ge2$ とし

$$
f_\theta(x)=\frac1\theta\boldsymbol1_{[0,\theta]}(x).
$$

1. 尤度を書き、最尤推定量を求めよ。
2. $M=X_{(n)}=\max_iX_i$ の分布関数と確率密度関数を求めよ。
3. $E_\theta[M]$ を求め、$\theta$ の不偏推定量を構成せよ。
4. 最尤推定量が不偏でないことと、微分だけでは導けない理由を説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$M=\max_i x_i$ とします。$M>0$ なら

$$
L(\theta)=\theta^{-n}\boldsymbol1_{[M,\infty)}(\theta).
$$

$\theta\ge M$ で $\theta^{-n}$ は単調減少なので

$$
\widehat\theta=M.
$$

$0<m<\theta$ では独立性から

$$
P(M\le m)
=\prod_iP(X_i\le m)
=\left(\frac m\theta\right)^n.
$$

よって

$$
F_M(m)=
\begin{cases}
0,&m\le0,\\
(m/\theta)^n,&0<m<\theta,\\
1,&m\ge\theta,
\end{cases}
$$

および

$$
f_M(m)=\frac{nm^{n-1}}{\theta^n}\boldsymbol1_{(0,\theta)}(m).
$$

したがって

$$
E[M]
=\int_0^\theta m\frac{nm^{n-1}}{\theta^n}dm
=\frac n{n+1}\theta.
$$

よって

$$
\widetilde\theta=\frac{n+1}{n}M
$$

が不偏です。$E[M]\ne\theta$ なので最尤推定量は不偏ではありません。最大点は母数依存の台が作る境界 $\theta=M$ にあるため、通常の停留条件だけでは得られません。

なお全標本が0なら $M=0$ で、$\theta\downarrow0$ により尤度が上限なく増えるため $\theta>0$ 内に最尤推定量は存在しません。この標本の確率は0です。

##### 本番答案

$M>0$ なら $L(\theta)=\theta^{-n}\boldsymbol1_{[M,\infty)}(\theta)$。単調減少性から $\widehat\theta=M$。また

$$
P(M\le m)=(m/\theta)^n,
\quad
f_M(m)=nm^{n-1}/\theta^n
$$

$(0<m<\theta)$。よって $E[M]=n\theta/(n+1)$、$(n+1)M/n$ が不偏。境界最大化なのでスコア方程式だけでは導けない。

##### 採点基準

- 尤度・単調性・最尤推定量: 6点
- 分布関数・密度: 8点
- 期待値・不偏化: 6点
- バイアス・母数依存台の説明: 4点

<!-- solution-end -->

### F0-C02 二次形式と主成分方向

$$
\boldsymbol\Sigma=
\begin{pmatrix}4&2\\2&4\end{pmatrix}
$$

とする。

1. 固有値と単位固有ベクトルを求めよ。
2. $\|\boldsymbol a\|=1$ の下で $\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a$ を最大化せよ。
3. 最大化方向を第一主成分方向と呼ぶ理由を線形結合の分散で説明せよ。
4. $\boldsymbol\Sigma$ が正定値であることを二通りで確認せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

特性多項式は

$$
(4-\lambda)^2-4
=(\lambda-6)(\lambda-2).
$$

固有値6に対して

$$
\boldsymbol q_1=\frac1{\sqrt2}(1,1)^{\mathsf T},
$$

固有値2に対して

$$
\boldsymbol q_2=\frac1{\sqrt2}(1,-1)^{\mathsf T}.
$$

単位ベクトルを

$$
\boldsymbol a=c_1\boldsymbol q_1+c_2\boldsymbol q_2,
\qquad c_1^2+c_2^2=1
$$

とすると

$$
\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a
=6c_1^2+2c_2^2
=2+4c_1^2\le6.
$$

最大は $\boldsymbol a=\pm\boldsymbol q_1$ で達成されます。

中心化した確率ベクトル $\boldsymbol X$ なら

$$
\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X)
=\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a
$$

なので、これは分散最大の線形結合です。

正定値性は固有値 $6,2>0$ から分かります。別法として

$$
\begin{aligned}
\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a
&=4a_1^2+4a_1a_2+4a_2^2\\
&=2(a_1+a_2)^2+2a_1^2+2a_2^2>0
\end{aligned}
$$

を使えます。

##### 本番答案

固有値は6,2、単位固有ベクトルは $2^{-1/2}(1,1)^{\mathsf T}$、$2^{-1/2}(1,-1)^{\mathsf T}$。固有基底で二次形式は $6c_1^2+2c_2^2\le6$ なので最大方向は $\pm\boldsymbol q_1$。これは線形結合の分散最大方向である。正定値性は全固有値正、または平方和表示から従う。

##### 採点基準

- 固有値・固有ベクトル: 8点
- 最大化: 8点
- 主成分の説明: 6点
- 正定値性の二方法: 6点

<!-- solution-end -->

### F0-C03 最小二乗と残差の直交性

$x_1=-1,x_2=0,x_3=1$ の単回帰

$$
y_i=\beta_0+\beta_1x_i+\varepsilon_i
$$

を考える。

1. 計画行列 $\boldsymbol X$ を書き、列フルランクを示せ。
2. $\widehat\beta_0,\widehat\beta_1$ を求めよ。
3. ハット行列 $\boldsymbol H$ を求めよ。
4. 残差が $\boldsymbol X$ の各列と直交することを確認せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\boldsymbol X=
\begin{pmatrix}
1&-1\\
1&0\\
1&1
\end{pmatrix},
$$

二列は比例しないので階数2です。

$$
\boldsymbol X^{\mathsf T}\boldsymbol X
=\begin{pmatrix}3&0\\0&2\end{pmatrix},
\qquad
\boldsymbol X^{\mathsf T}\boldsymbol y
=\begin{pmatrix}y_1+y_2+y_3\\-y_1+y_3\end{pmatrix}.
$$

したがって

$$
\widehat\beta_0=\frac{y_1+y_2+y_3}{3},
\qquad
\widehat\beta_1=\frac{y_3-y_1}{2}.
$$

$\boldsymbol H=\boldsymbol X(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}$ より

$$
\boldsymbol H=
\begin{pmatrix}
5/6&1/3&-1/6\\
1/3&1/3&1/3\\
-1/6&1/3&5/6
\end{pmatrix}.
$$

さらに

$$
\boldsymbol I_3-\boldsymbol H
=\frac16
\begin{pmatrix}
1&-2&1\\
-2&4&-2\\
1&-2&1
\end{pmatrix}.
$$

$d=y_1-2y_2+y_3$ とすると

$$
\widehat{\boldsymbol\varepsilon}
=\frac d6(1,-2,1)^{\mathsf T}.
$$

定数列 $(1,1,1)^{\mathsf T}$ との内積は0、説明変数列 $(-1,0,1)^{\mathsf T}$ との内積も0です。

##### 本番答案

$\boldsymbol X$ は上記行列で階数2。$\boldsymbol X^{\mathsf T}\boldsymbol X=\operatorname{diag}(3,2)$ から

$$
\widehat\beta_0=(y_1+y_2+y_3)/3,
\quad
\widehat\beta_1=(y_3-y_1)/2.
$$

ハット行列は上記 $3\times3$ 行列。残差は $d(1,-2,1)^{\mathsf T}/6$ で、$\boldsymbol X$ の二列との内積はいずれも0。

##### 採点基準

- 計画行列・階数: 5点
- 正規方程式・推定値: 7点
- ハット行列: 10点
- 残差と直交性: 8点

<!-- solution-end -->

### F0-C04 異なる率をもつ指数変数

$X\sim\operatorname{Exp}(\lambda)$、$Y\sim\operatorname{Exp}(\mu)$ は独立で $\lambda,\mu>0$ とする。

$$
U=X+Y,
\qquad
V=\frac X{X+Y}
$$

について、台、同時確率密度関数、$V$ の周辺確率密度関数を求め、$U,V$ が独立となるための必要十分条件を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

逆変換は

$$
x=uv,
\qquad y=u(1-v),
$$

像は $u>0,0<v<1$ です。ヤコビアンは

$$
\det
\begin{pmatrix}
v&u\\
1-v&-u
\end{pmatrix}=-u,
$$

したがって絶対値は $u$。よって

$$
f_{U,V}(u,v)
=\lambda\mu u
\exp\{-u[\lambda v+\mu(1-v)]\}
$$

です。

$a(v)=\lambda v+\mu(1-v)>0$ と置き

$$
\int_0^\infty ue^{-au}du=\frac1{a^2}
$$

を用いると

$$
f_V(v)
=\frac{\lambda\mu}{[\lambda v+\mu(1-v)]^2}
\boldsymbol1_{(0,1)}(v).
$$

$\lambda=\mu$ なら

$$
f_{U,V}(u,v)=\lambda^2ue^{-\lambda u}\cdot1
$$

と分離するので独立です。

逆に独立なら、正の領域内で $\log f_{U,V}$ は $u$ の関数と $v$ の関数の和に分離できるため混合偏微分は0です。しかし

$$
\frac{\partial^2}{\partial v\partial u}
\log f_{U,V}(u,v)
=-(\lambda-\mu).
$$

よって必要条件も $\lambda=\mu$。したがって

$$
\boxed{U,V\text{ が独立}\Longleftrightarrow\lambda=\mu}.
$$

##### 本番答案

逆変換 $x=uv,y=u(1-v)$、領域 $u>0,0<v<1$、ヤコビアン絶対値 $u$。したがって

$$
f_{U,V}=\lambda\mu u e^{-u[\lambda v+\mu(1-v)]},
$$

$$
f_V(v)=\lambda\mu/[\lambda v+\mu(1-v)]^2.
$$

$\lambda=\mu$ なら因数分解できる。逆に独立なら $\partial^2\log f_{U,V}/(\partial v\partial u)=0$ なので $\lambda=\mu$。

##### 採点基準

- 逆変換・領域: 5点
- ヤコビアン・同時密度: 8点
- 周辺密度: 7点
- 独立の十分性: 3点
- 必要性: 5点

<!-- solution-end -->

## Level D：発展

### F0-D01 一対一でない変換

$X\sim N(0,1)$ とし $Y=X^2$ とする。

1. $y>0$ に対する逆像を全て求めよ。
2. 各逆像の寄与を足して $Y$ の確率密度関数を導け。
3. 全積分が1であることを確認せよ。
4. $E[Y]$ を密度から求め、$E[X^2]$ と一致することを確認せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$y>0$ の逆像は

$$
x=\sqrt y,
\qquad x=-\sqrt y
$$

の二つです。各枝で

$$
\left|\frac{dx}{dy}\right|=\frac1{2\sqrt y}.
$$

標準正規分布の確率密度関数を $\phi$ とすると

$$
\begin{aligned}
f_Y(y)
&=\frac{\phi(\sqrt y)}{2\sqrt y}
+\frac{\phi(-\sqrt y)}{2\sqrt y}\\
&=\frac{1}{\sqrt{2\pi y}}e^{-y/2},
\qquad y>0.
\end{aligned}
$$

変換 $y=x^2$ と対称性から

$$
\int_0^\infty f_Y(y)dy
=2\int_0^\infty\phi(x)dx=1.
$$

また $\phi'(x)=-x\phi(x)$ を用いて

$$
\begin{aligned}
E[Y]
&=2\int_0^\infty x^2\phi(x)dx\\
&=-2\int_0^\infty x\phi'(x)dx\\
&=-2[x\phi(x)]_0^\infty+2\int_0^\infty\phi(x)dx\\
&=1.
\end{aligned}
$$

これは $E[X^2]=1$ と一致します。

##### 本番答案

逆像は $\pm\sqrt y$。各枝のヤコビアン絶対値は $1/(2\sqrt y)$ なので

$$
f_Y(y)=\frac{e^{-y/2}}{\sqrt{2\pi y}}\boldsymbol1_{(0,\infty)}(y).
$$

対称性から全積分は1。$\phi'=-x\phi$ による部分積分で $E[Y]=1=E[X^2]$。

##### 採点基準

- 二つの逆像: 4点
- 各枝の寄与と密度: 10点
- 正規化: 6点
- 期待値: 12点

<!-- solution-end -->

---

# 7. 30分ドリル

## F0-DRILL-01 変数変換・尤度・分散共分散行列

$\theta>0$ とし

$$
f_\theta(x)=\theta x^{\theta-1}\boldsymbol1_{(0,1)}(x)
$$

とする。$n\ge2$、$X_1,\ldots,X_n$ は独立同分布で $Y_i=-\log X_i$ とする。

1. $f_\theta$ が確率密度関数であることを確認せよ。（10点）
2. $Y_i$ の確率密度関数を変数変換で求め、$E[Y_i]=1/\theta$、$\operatorname{Var}(Y_i)=1/\theta^2$ を積分で示せ。（25点）
3. $Y_1,\ldots,Y_n$ の尤度・対数尤度を書き、$\theta$ の最尤推定量を求めよ。（20点）
4. 得られた停留点が一意な大域最大点であることを示せ。（15点）
5. $\boldsymbol Z=(Y_1,Y_1+Y_2)^{\mathsf T}$ の分散共分散行列を求め、その固有値を求めて正定値性を確認せよ。（30点）

<!-- solution-start -->

### 解答

#### 詳細解答

**(1)** $\theta>0$ なので0近傍で可積分であり

$$
\int_{\mathbb R}f_\theta(x)dx
=\theta\int_0^1x^{\theta-1}dx
=1.
$$

**(2)** $y=-\log x$ の逆変換は $x=e^{-y}$、像は $y>0$、ヤコビアン絶対値は $e^{-y}$。したがって

$$
f_Y(y)=\theta e^{-\theta y}\boldsymbol1_{(0,\infty)}(y).
$$

部分積分から

$$
E[Y]=\frac1\theta,
\qquad
E[Y^2]=\frac2{\theta^2},
$$

よって

$$
\operatorname{Var}(Y)=\frac1{\theta^2}.
$$

**(3)** 観測値 $y_i>0$ に対して

$$
L(\theta)
=\theta^n\exp\left(-\theta\sum_i y_i\right),
$$

$$
\ell(\theta)
=n\log\theta-\theta\sum_i y_i.
$$

したがって

$$
\ell'(\theta)=\frac n\theta-\sum_i y_i=0
$$

より

$$
\widehat\theta
=\frac n{\sum_i y_i}
=-\frac n{\sum_i\log x_i}.
$$

**(4)**

$$
\ell''(\theta)=-\frac n{\theta^2}<0
$$

なので対数尤度は $(0,\infty)$ 上で狭義凹です。従って停留点は一意な大域最大点です。

**(5)** 独立性と前問の分散から

$$
\operatorname{Cov}(\boldsymbol Z)
=\frac1{\theta^2}
\begin{pmatrix}1&1\\1&2\end{pmatrix}.
$$

括弧内の特性多項式は

$$
\lambda^2-3\lambda+1
$$

なので固有値は

$$
\frac{3+\sqrt5}{2\theta^2},
\qquad
\frac{3-\sqrt5}{2\theta^2}.
$$

$\theta>0$ かつ $3>\sqrt5$ なので両方正、従って正定値です。

#### 本番答案

正規化は $\theta\int_0^1x^{\theta-1}dx=1$。$x=e^{-y}$、$y>0$、$|dx/dy|=e^{-y}$ より $f_Y(y)=\theta e^{-\theta y}$。部分積分から $E[Y]=1/\theta$、$E[Y^2]=2/\theta^2$、分散 $1/\theta^2$。

また

$$
\ell(\theta)=n\log\theta-\theta\sum_i y_i,
\quad
\widehat\theta=n/\sum_i y_i,
$$

$\ell''(\theta)<0$ より一意な大域最大点。

$$
\operatorname{Cov}(\boldsymbol Z)
=\theta^{-2}\begin{pmatrix}1&1\\1&2\end{pmatrix},
$$

固有値は $(3\pm\sqrt5)/(2\theta^2)>0$ なので正定値。

#### 採点基準

- 正規化: 10点
- 変換・2モーメント: 25点
- 尤度・最尤推定量: 20点
- 最大性: 15点
- 分散共分散行列・固有値・正定値性: 30点

<!-- solution-end -->

---

# 8. 実過去問演習への接続

問題文・図表は転載せず、公式問題集を手元に置いて年度・科目・大問番号で照合します。

### PAST-F0-01: MATH-2024-Q1

- 入手先: 統計検定公式問題集［2022〜2024年］
- 制限時間: 初回30分、復習20分
- 現在解く範囲: 尤度の微分、二次式の最小化、線形結合の平均・分散、不等式による比較
- 後続章で再挑戦: フィッシャー情報量、検定、検出力
- 答案確認: 微分前の目的関数、停留条件、最大・最小の根拠、分散比較の等号条件を残す。

### PAST-F0-02: MATH-2021-Q5

- 入手先: 統計検定公式問題集［2019〜2022年］
- 制限時間: 30分
- 現在解く範囲: 行列積、線形変換、平均ベクトルと分散共分散行列、共分散0の判定
- 後続章で再挑戦: 多変量正規性を用いた独立性
- 答案確認: 行列の次元と転置、分散共分散行列の変換、正定値性を逐項確認する。

---

# 9. 復習チェック

1. 台と母数空間を別々に書ける。
2. 広義積分では端点ごとの収束を確認できる。
3. 対数尤度へ移る前に尤度が正の範囲を確認できる。
4. 停留条件だけで最大・最小を決めない。
5. 変数変換で逆変換、像、ヤコビアンの絶対値を順に書ける。
6. 一対一でない変換では逆像の枝を全て足せる。
7. 実対称行列の二次形式を固有基底で平方和へ直せる。
8. 正定値・半正定値と固有値の符号を対応付けられる。
9. $\boldsymbol X^{\mathsf T}\boldsymbol X$ の可逆性を列フルランクから説明できる。
10. ハット行列の対称性・冪等性と残差直交性を確認できる。
11. 必要条件・十分条件・必要十分条件を取り違えない。
12. 詳細解答から、条件・主要立式・判定根拠・結論を残して本番答案へ圧縮できる。
