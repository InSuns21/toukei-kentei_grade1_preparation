# INV15 Gaussian事前分布で何が復元できるか

[INV5 の二乗ノルムTikhonov正則化](../INV5/index.md#def-inv5-tikhonov)では、観測への不一致と解の大きさを足して、一つの復元値を選びました。しかし、その復元値だけでは「どのような未知量を事前にありそうと考えたのか」が数式の中に隠れがちです。また、観測値が同じでも、誤差の大きい装置と精密な装置は同じ重みで扱うべきではありません。

本講では、観測前に未知量へ割り当てる確率分布と測定誤差の確率分布を別々に設定し、観測後の分布を導きます。有限次元の線形写像と正定値な Gaussian 分布なら、更新後の分布も Gaussian です。平均だけでなく分散共分散行列まで平方完成で求め、最頻値が加重 Tikhonov の解と一致する理由を明らかにします。

## 1. 確率変数としての未知量と観測

未知量を列ベクトル $x\in\mathbb R^n$、観測値を $y\in\mathbb R^m$ とし、既知の観測行列 $A\in\mathbb R^{m\times n}$ に対して

$$
y=Ax+\varepsilon
$$

を考えます。ここで $\varepsilon$ は観測誤差です。これまでの逆問題では $x$ を固定した未知数として扱いましたが、今回は観測前の不確かさを確率分布で記述します。真の未知量がランダムに変化する物理的な仕組みを仮定する必要はなく、未知量に対する事前情報を表すモデルでも構いません。

まず $\mathbb R^d$ 上の Gaussian（多変量正規）分布を具体的に確認します。$M\in\mathbb R^{d\times d}$ が対称正定値とは $M^T=M$ かつ $v\ne0$ なら $v^TMv>0$ であることです。この条件なら逆行列と行列式が存在し、$\det M>0$ です。

<a id="def-inv15-gaussian-density"></a>

<!-- formal-statement-start -->
> **定義（正定値分散共分散行列をもつ多変量正規分布）**  
> $d\ge1$、$\mu\in\mathbb R^d$、対称正定値行列 $\Gamma\in\mathbb R^{d\times d}$ に対して、$\mathbb R^d$ 上の確率密度関数

$$
p_{\mu,\Gamma}(z)
=\frac{\exp\!\left[-\frac12(z-\mu)^T\Gamma^{-1}(z-\mu)\right]}
{(2\pi)^{d/2}\sqrt{\det\Gamma}}
\qquad(z\in\mathbb R^d)
$$

> をもつ分布を $N(\mu,\Gamma)$ と書く。$\mu$ は平均ベクトル、$\Gamma$ は分散共分散行列である。
<!-- formal-statement-end -->

この密度が積分1になる理由も見ておきましょう。実対称行列の直交対角化で $\Gamma=U\operatorname{diag}(\lambda_1,\ldots,\lambda_d)U^T$、$\lambda_j>0$ とできます。$w_j=\lambda_j^{-1/2}[U^T(z-\mu)]_j$ と変数変換すると、体積要素は $dz=\sqrt{\det\Gamma}\,dw$ になり、積分は一次元 Gaussian 積分の積

$$
\prod_{j=1}^d\frac1{\sqrt{2\pi}}\int_{\mathbb R}e^{-w_j^2/2}\,dw_j=1
$$

になります。変数変換後の各 $w_j$ は独立な標準正規変数なので、対称性と一次元の積分から $\mathbb E[z]=\mu$、$\mathbb E[(z-\mu)(z-\mu)^T]=\Gamma$ も確かめられます。

<!-- definition-example-start: def-inv15-gaussian-density -->

**定義の確認**：$\mu=(1,-1)^T$、$\Gamma=\operatorname{diag}(4,1)$ とすれば、$\Gamma$ は対称で、任意の非零 $v$ に対し $v^T\Gamma v=4v_1^2+v_2^2>0$ です。逆行列は $\operatorname{diag}(1/4,1)$、行列式は $4$ なので

$$
p(z_1,z_2)=\frac1{4\pi}
\exp\left[-\frac{(z_1-1)^2}{8}-\frac{(z_2+1)^2}{2}\right].
$$

二つの一次元正規密度の積になり、各々の積分が1なので全体も積分1です。第一座標の分散は4、第二座標の分散は1です。

<!-- definition-example-end -->

次に、未知量へ観測前から与える分布と、未知量が決まったとき観測値が従う分布を組み合わせます。[確率変数の独立性](../../F0/F0-00P3/index.md#def-f0-00p3-independent-random-variables)を使い、未知量と誤差が独立であることを仮定します。

<a id="def-inv15-linear-model"></a>

<!-- formal-statement-start -->
> **定義（線形 Gaussian 逆問題モデル）**  
> 整数 $n,m\ge1$、行列 $A\in\mathbb R^{m\times n}$、平均 $\mu_0\in\mathbb R^n$、対称正定値行列 $\Gamma_0\in\mathbb R^{n\times n}$ と $\Gamma_\varepsilon\in\mathbb R^{m\times m}$ を固定する。独立な確率ベクトル $X\sim N(\mu_0,\Gamma_0)$、$E\sim N(0,\Gamma_\varepsilon)$ に対し、観測 $Y=AX+E$ とする。$X$ の分布を **事前分布**、$Y\mid X=x$ の分布 $N(Ax,\Gamma_\varepsilon)$ を **尤度を定める観測モデル**とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv15-linear-model -->

**定義の確認**：$n=m=1$、$A=(2)$、$X\sim N(1,4)$、$E\sim N(0,1)$ を独立に取ります。$\Gamma_0=(4)$、$\Gamma_\varepsilon=(1)$ はどちらも正定値で、確率変数の独立性もモデルの仮定です。$Y=2X+E$ だから、未知量を $X=x$ と固定すると $Y\mid X=x\sim N(2x,1)$ です。観測前の $X$ の平均は1、分散は4であり、観測値 $y$ が得られた後にこれを更新します。

<!-- definition-example-end -->

**正定値性は重要です。** 分散0の確定値や特異な共分散の場合、上の Lebesgue 密度の形には一般に書けません。また $E$ と $X$ の独立性がなければ、$Y\mid X=x$ を単純に平均 $Ax$・共分散 $\Gamma_\varepsilon$ とする根拠が失われます。

## 2. 尤度とBayes更新を組み立てる

[尤度関数の定義](../../F0/F0-00P7/index.md#def-f0-00p7-likelihood)に従い、観測 $Y=y$ を固定して未知量 $x$ の関数として密度を読みます。$m$ 次元の条件付き密度は

$$
p(y\mid x)=\frac{1}{(2\pi)^{m/2}\sqrt{\det\Gamma_\varepsilon}}
\exp\left[-\frac12(y-Ax)^T\Gamma_\varepsilon^{-1}(y-Ax)\right].
$$

事前密度は定義から

$$
p_0(x)=\frac{1}{(2\pi)^{n/2}\sqrt{\det\Gamma_0}}
\exp\left[-\frac12(x-\mu_0)^T\Gamma_0^{-1}(x-\mu_0)\right].
$$

観測値 $y$ を得ると、未知量の確率分布を条件付き分布として更新できます。積 $p(y\mid x)p_0(x)$ を $x$ について積分すると、$y$ の周辺密度 $p_Y(y)$ になります。積は正で、さらに $p(y\mid x)\le (2\pi)^{-m/2}(\det\Gamma_\varepsilon)^{-1/2}$ と $\int p_0=1$ から有限積分となるので、全ての $y\in\mathbb R^m$ に対して $p_Y(y)>0$ です。

<a id="def-inv15-posterior"></a>

<!-- formal-statement-start -->
> **定義（事後密度と周辺密度）**  
> [線形 Gaussian 逆問題モデル](#def-inv15-linear-model)において、観測 $Y=y$ の下での $X$ の条件付き分布を **事後分布** と呼ぶ。固定した観測値 $y\in\mathbb R^m$ の周辺密度と、未知量 $x\in\mathbb R^n$ の事後密度をそれぞれ

$$
p_Y(y)=\int_{\mathbb R^n}p(y\mid x)p_0(x)\,dx,
\qquad
p(x\mid y)=\frac{p(y\mid x)p_0(x)}{p_Y(y)}
$$

> と定める。この $p(x\mid y)$ は $X$ の $Y=y$ の下での条件付き確率密度関数の版である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv15-posterior -->

**定義の確認**：前節の一次元モデルでは

$$
p(y\mid x)p_0(x)
=\frac{1}{4\pi}\exp\left[-\frac{(y-2x)^2}{2}-\frac{(x-1)^2}{8}\right].
$$

固定した $y$ について、この積は $x$ の二次式の負の指数関数で、$x\to\pm\infty$ では0へ急速に減衰します。積分は有限で正です。定義の比を $x$ について積分すると、分子の積分が分母そのものなので $\int p(x\mid y)\,dx=1$ が確認できます。

<!-- definition-example-end -->

Bayes更新は「尤度が高いものを選ぶ」だけではなく、事前密度との積を正規化した**分布全体**を与えます。次に、この分布の平均と分散共分散行列を求めます。

## 3. 平方完成から事後分布を導く

二次形式

$$
Q_y(x)
=(x-\mu_0)^T\Gamma_0^{-1}(x-\mu_0)
+(y-Ax)^T\Gamma_\varepsilon^{-1}(y-Ax)
$$

を展開します。行列・ベクトルの次元は、$\Gamma_0^{-1}\in\mathbb R^{n\times n}$、$A^T\Gamma_\varepsilon^{-1}A\in\mathbb R^{n\times n}$、$A^T\Gamma_\varepsilon^{-1}y\in\mathbb R^n$ です。そこで

$$
H=\Gamma_0^{-1}+A^T\Gamma_\varepsilon^{-1}A,\qquad
b_y=\Gamma_0^{-1}\mu_0+A^T\Gamma_\varepsilon^{-1}y
$$

と置くと、$Q_y(x)=x^THx-2x^Tb_y+c_y$ となります。$c_y=\mu_0^T\Gamma_0^{-1}\mu_0+y^T\Gamma_\varepsilon^{-1}y$ は $x$ に依存しません。

<a id="thm-inv15-gaussian-posterior"></a>

<!-- formal-statement-start -->
> **定理（線形 Gaussian 逆問題の事後平均と事後共分散）**  
> [線形 Gaussian 逆問題モデル](#def-inv15-linear-model)の全ての仮定の下で、任意の観測値 $y\in\mathbb R^m$ に対し事後分布は正定値共分散をもつ Gaussian 分布 $N(\mu_y,\Gamma_y)$ であり、

$$
\boxed{
\Gamma_y=(\Gamma_0^{-1}+A^T\Gamma_\varepsilon^{-1}A)^{-1},
\quad
\mu_y=\Gamma_y(\Gamma_0^{-1}\mu_0+A^T\Gamma_\varepsilon^{-1}y)
}
$$

> が成り立つ。$A$ は必ずしも単射でなくてよい。
<!-- formal-statement-end -->

### 証明の見取り図

事前密度と尤度の積の指数にある二次形式を平方完成します。鍵は $H$ の正定値性であり、$A$ が階数不足でも $\Gamma_0^{-1}$ が正定値なので逆行列を取れます。

<!-- proof-start -->
### 証明

$\Gamma_0$ と $\Gamma_\varepsilon$ は対称正定値なので、それぞれの逆行列も対称正定値です。任意の $v\in\mathbb R^n\setminus\{0\}$ について

$$
v^THv
=v^T\Gamma_0^{-1}v+(Av)^T\Gamma_\varepsilon^{-1}(Av)
>0+0=0.
$$

二項目は非負、第一項は厳密に正です。従って $H$ は対称正定値で $H^{-1}$ が存在します。$\Gamma_y=H^{-1}$、$\mu_y=H^{-1}b_y$ と置けば $H\mu_y=b_y$ です。

実際に二次式を展開すると

$$
\begin{aligned}
Q_y(x)
&=x^T\Gamma_0^{-1}x-2x^T\Gamma_0^{-1}\mu_0
+\mu_0^T\Gamma_0^{-1}\mu_0\\
&\quad+x^TA^T\Gamma_\varepsilon^{-1}Ax
-2x^TA^T\Gamma_\varepsilon^{-1}y
+y^T\Gamma_\varepsilon^{-1}y\\
&=x^THx-2x^Tb_y+c_y.
\end{aligned}
$$

$H\mu_y=b_y$ を代入して

$$
\begin{aligned}
(x-\mu_y)^TH(x-\mu_y)
&=x^THx-2x^TH\mu_y+\mu_y^TH\mu_y\\
&=x^THx-2x^Tb_y+\mu_y^TH\mu_y.
\end{aligned}
$$

従って

$$
Q_y(x)=(x-\mu_y)^TH(x-\mu_y)
+c_y-\mu_y^TH\mu_y.
$$

最後の二項は $x$ に無関係なので、事後密度は定数倍の $\exp[-(x-\mu_y)^TH(x-\mu_y)/2]$ です。$H=\Gamma_y^{-1}$ で $\Gamma_y$ は正定値だから、[本章のGaussian密度の積分1の確認](#def-inv15-gaussian-density)を用いて定数が $(2\pi)^{-n/2}(\det\Gamma_y)^{-1/2}$ と決まります。この密度の平均は $\mu_y$、分散共分散行列は $\Gamma_y$ です。

なお $A$ の単射性は一度も使っていません。$Av=0$ となる非零 $v$ があっても、$v^THv=v^T\Gamma_0^{-1}v>0$ です。
<!-- proof-end -->

### 例：一次元の測定では何が起きるか

前節の $A=2$、$\mu_0=1$、$\Gamma_0=4$、$\Gamma_\varepsilon=1$、観測 $y=5$ を代入します。

$$
H=\frac14+\frac{2^2}{1}=\frac{17}{4},
\qquad
b_5=\frac14\cdot1+\frac2{1}\cdot5=\frac{41}{4}.
$$

よって

$$
\mu_5=\frac4{17}\frac{41}{4}=\frac{41}{17},
\qquad
\Gamma_5=\frac4{17}.
$$

観測前の分散4が、観測後は $4/17$ に減りました。平均は観測だけからの逆算値 $5/2$ と、事前平均1の間にあります。**事後平均は単なる $A^{-1}y$ ではありません。**

## 4. データ側の行列で同じ答えを表す

未知数の数 $n$ より観測数 $m$ が小さい場合、$n\times n$ 行列 $H$ の逆行列を使うより、$m\times m$ の観測側で計算すると見通しがよいことがあります。そこで、観測の分散共分散行列として

$$
S=A\Gamma_0A^T+\Gamma_\varepsilon
$$

を導入します。$S$ は対称で、$u\ne0$ なら $u^TSu=(A^Tu)^T\Gamma_0(A^Tu)+u^T\Gamma_\varepsilon u>0$ なので正定値です。

<a id="prop-inv15-observation-form"></a>

<!-- formal-statement-start -->
> **命題（観測側の事後更新公式）**  
> [線形 Gaussian 逆問題モデル](#def-inv15-linear-model)において $S=A\Gamma_0A^T+\Gamma_\varepsilon$ と置く。$S$ は正定値で、[事後平均・事後共分散](#thm-inv15-gaussian-posterior)は次でも表せる。

$$
\boxed{
\mu_y=\mu_0+\Gamma_0A^TS^{-1}(y-A\mu_0),\qquad
\Gamma_y=\Gamma_0-\Gamma_0A^TS^{-1}A\Gamma_0.
}
$$

> また観測の周辺分布は $Y\sim N(A\mu_0,S)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$H\Gamma_0A^T=A^T\Gamma_\varepsilon^{-1}S$ を左右から適切に掛けて利得行列を同一視します。観測の分布は独立な Gaussian ベクトルの線形和として確認します。

<!-- proof-start -->
### 証明

$H=\Gamma_0^{-1}+A^T\Gamma_\varepsilon^{-1}A$ だから

$$
\begin{aligned}
H\Gamma_0A^T
&=(\Gamma_0^{-1}+A^T\Gamma_\varepsilon^{-1}A)\Gamma_0A^T\\
&=A^T+A^T\Gamma_\varepsilon^{-1}A\Gamma_0A^T\\
&=A^T\Gamma_\varepsilon^{-1}(\Gamma_\varepsilon+A\Gamma_0A^T)
=A^T\Gamma_\varepsilon^{-1}S.
\end{aligned}
$$

左から $\Gamma_y=H^{-1}$、右から $S^{-1}$ を掛けると

$$
\Gamma_yA^T\Gamma_\varepsilon^{-1}
=\Gamma_0A^TS^{-1}.
$$

また $H\mu_y=\Gamma_0^{-1}\mu_0+A^T\Gamma_\varepsilon^{-1}y$ だから、$H\mu_0=\Gamma_0^{-1}\mu_0+A^T\Gamma_\varepsilon^{-1}A\mu_0$ を引いて

$$
\mu_y-\mu_0
=\Gamma_yA^T\Gamma_\varepsilon^{-1}(y-A\mu_0)
=\Gamma_0A^TS^{-1}(y-A\mu_0).
$$

さらに $H\Gamma_0=I+A^T\Gamma_\varepsilon^{-1}A\Gamma_0$ の左から $\Gamma_y$ を掛けると

$$
\Gamma_0=\Gamma_y+\Gamma_yA^T\Gamma_\varepsilon^{-1}A\Gamma_0,
$$

すなわち $\Gamma_y=\Gamma_0-\Gamma_0A^TS^{-1}A\Gamma_0$ です。

周辺分布も確認します。正定値行列の平方根 $\Gamma_0^{1/2}$、$\Gamma_\varepsilon^{1/2}$ に対し、独立な標準正規ベクトル $Z\in\mathbb R^n$、$W\in\mathbb R^m$ を使って

$$
Y=A\mu_0+A\Gamma_0^{1/2}Z+\Gamma_\varepsilon^{1/2}W
$$

と分布の意味で表せます。独立性から任意の $t\in\mathbb R^m$ に対する指数関数の期待値は

$$
\begin{aligned}
\mathbb E[e^{it^T(Y-A\mu_0)}]
&=\mathbb E[e^{it^TA\Gamma_0^{1/2}Z}]
\,\mathbb E[e^{it^T\Gamma_\varepsilon^{1/2}W}]\\
&=\exp\!\left[-\frac12t^TA\Gamma_0A^Tt\right]
\exp\!\left[-\frac12t^T\Gamma_\varepsilon t\right]
=\exp[-t^TSt/2].
\end{aligned}
$$

一次元の標準正規積分を各独立座標に適用すると第二行の式が出ます。これは $N(0,S)$ の特性関数と一致します。[確率ベクトルの特性関数収束定理](../../F0/F0-00P6/index.md#thm-f0-00p6-levy-continuity-vector)に、各項が $Y-A\mu_0$ に等しい定数列と、候補の $N(0,S)$ を代入すると、両者の全ての有界 Lipschitz 関数の期待値が一致します。従って同じ分布であり、$Y\sim N(A\mu_0,S)$ です。
<!-- proof-end -->

**二次元の直接例**：未知量が二つでも観測は一つとします。

$$
A=\begin{pmatrix}1&0\end{pmatrix},\quad
\mu_0=0,\quad
\Gamma_0=\begin{pmatrix}2&1\\1&2\end{pmatrix},\quad
\Gamma_\varepsilon=(1),\quad y=3.
$$

$\Gamma_0$ の固有値は1と3で正、$\Gamma_\varepsilon=1>0$ です。$S=2+1=3$、$\Gamma_0A^T=(2,1)^T$ だから

$$
\mu_3=\begin{pmatrix}2\\1\end{pmatrix},\quad
\Gamma_3=
\begin{pmatrix}2&1\\1&2\end{pmatrix}
-\frac13\begin{pmatrix}4&2\\2&1\end{pmatrix}
=\begin{pmatrix}2/3&1/3\\1/3&5/3\end{pmatrix}.
$$

観測式は第一成分しか測りません。それでも第二成分の平均が1へ動くのは、事前の二成分に共分散1という相関があるためです。事後共分散の行列式は $1>0$、対角成分も正で、確かに正定値です。**観測されない成分がデータだけで判明したわけではなく、相関を表す事前情報が使われています。**

## 5. 最頻値は加重Tikhonovの解になる

事後分布を得ても、一個の復元値が必要な場合があります。事後密度が最大になる点を**最大事後確率（MAP）推定値**と呼びます。確率密度は座標変換に依存するため、ここでは固定した $\mathbb R^n$ の Lebesgue 密度を最大化するものに限定します。

<a id="def-inv15-map"></a>

<!-- formal-statement-start -->
> **定義（MAP推定値）**  
> [線形 Gaussian 逆問題モデル](#def-inv15-linear-model)で観測 $y$ を固定する。事後密度 $p(x\mid y)$ の最大点を $x_{\mathrm{MAP}}$ と呼ぶ。すなわち $p(x_{\mathrm{MAP}}\mid y)=\sup_{x\in\mathbb R^n}p(x\mid y)$ を満たす点である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv15-map -->

**定義の確認**：$X\mid Y=y\sim N(\mu_y,\Gamma_y)$ のとき、密度の指数にある $(x-\mu_y)^T\Gamma_y^{-1}(x-\mu_y)$ は非負で、正定値性により $x=\mu_y$ でのみ0です。したがって最大値は $\mu_y$ で一意に達成されます。これは後で一般の二次目的関数からも確認します。

<!-- definition-example-end -->

事後密度の分子を最大にすることは、負の対数のうち $x$ に依存する部分を最小にすることと同じです。観測誤差を共分散で重み付けし、事前平均からのずれも同様に測る目的関数

$$
J_y(x)=\frac12(y-Ax)^T\Gamma_\varepsilon^{-1}(y-Ax)
+\frac12(x-\mu_0)^T\Gamma_0^{-1}(x-\mu_0)
$$

が現れます。前者の重みを消してしまうと、単位や観測装置ごとの精度の違いを無視してしまいます。

<a id="thm-inv15-map-tikhonov"></a>

<!-- formal-statement-start -->
> **定理（MAPと加重Tikhonov正則化の一致）**  
> [線形 Gaussian 逆問題モデル](#def-inv15-linear-model)の下で $J_y:\mathbb R^n\to\mathbb R$ を上式で定める。$J_y$ は一意な最小点をもち、その最小点、MAP推定値、事後平均は全て $\mu_y$ に等しい。最小点は正規方程式

$$
(\Gamma_0^{-1}+A^T\Gamma_\varepsilon^{-1}A)x
=\Gamma_0^{-1}\mu_0+A^T\Gamma_\varepsilon^{-1}y
$$

> の唯一の解である。
<!-- formal-statement-end -->

### 証明の見取り図

[INV5 のTikhonov最小点の発想](../INV5/index.md#thm-inv5-tikhonov-minimizer)を、事前平均からの距離と二つの正定値重みに拡張します。各座標の一階微分が零になる条件が事後平均の式となり、正定値の二次形式で一意性が確定します。

<!-- proof-start -->
### 証明

定義から $2J_y(x)=Q_y(x)$ です。[事後分布の平方完成](#thm-inv15-gaussian-posterior)によって

$$
J_y(x)
=\frac12(x-\mu_y)^TH(x-\mu_y)
+\frac12(c_y-\mu_y^TH\mu_y).
$$

$H$ が対称正定値なので右辺の第一項は $x=\mu_y$ でのみ0となり、そこが唯一の最小点です。さらに各座標を微分すると

$$
\nabla J_y(x)=
-A^T\Gamma_\varepsilon^{-1}(y-Ax)+\Gamma_0^{-1}(x-\mu_0)
=Hx-b_y.
$$

従って停留条件は $Hx=b_y$ で、$H$ の正定値性によって解は $H^{-1}b_y=\mu_y$ の一つだけです。$p(x\mid y)$ は正の定数倍の $e^{-J_y(x)}$ なので、$J_y$ の唯一の最小点は密度の唯一の最大点です。事後密度は平均 $\mu_y$ の Gaussian なので平均とも一致します。
<!-- proof-end -->

**通常のTikhonovとの対応**：$\mu_0=0$、$\Gamma_\varepsilon=\sigma^2I_m$、$\Gamma_0=\tau^2I_n$（$\sigma,\tau>0$）なら

$$
2\sigma^2J_y(x)=\|Ax-y\|_2^2+\frac{\sigma^2}{\tau^2}\|x\|_2^2.
$$

従って[INV5 の二乗ノルムTikhonov正則化](../INV5/index.md#def-inv5-tikhonov)のパラメータは $\alpha=\sigma^2/\tau^2$ に対応します。$\mu_0\ne0$ の場合は零に縮めるのではなく、**事前平均へ近づける**罰則になる点に注意してください。

## 6. 観測できない方向と仮定の境界

$A=0$ の場合は観測に未知量の情報が含まれません。公式に代入すれば $\Gamma_y=\Gamma_0$、$\mu_y=\mu_0$ で、事後分布は事前分布から変わりません。$A$ が階数不足の場合も、事後分布自体は定まりますが、核方向の情報をデータが直接与えることはできません。

<a id="prop-inv15-kernel-independent"></a>

<!-- formal-statement-start -->
> **命題（独立な未観測成分は更新されない）**  
> $X_1,X_2$ を互いに独立な実確率変数とし、$s_1,s_2>0$ に対して次の分布を持つとする。

$
X_1\sim N(\mu_1,s_1^2),\qquad
X_2\sim N(\mu_2,s_2^2).
$

> さらに $X_1,X_2$ と独立な $E\sim N(0,r^2)$（$r>0$）を取り、$Y=X_1+E$ を観測する。このとき任意の $y\in\mathbb R$ に対し

$
X_2\mid Y=y\sim N(\mu_2,s_2^2)
$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

事前独立性があると、尤度と事前密度の積を $x_1$ の因子と $x_2$ の因子に分離できます。$x_1$ だけを積分する正規化定数は $x_2$ に依存しません。

<!-- proof-start -->
### 証明

独立性により $p_0(x_1,x_2)=p_1(x_1)p_2(x_2)$、条件付き尤度は $p(y\mid x_1,x_2)=p(y\mid x_1)$ です。[事後密度の定義](#def-inv15-posterior)から

$$
p(x_1,x_2\mid y)
=\frac{p(y\mid x_1)p_1(x_1)p_2(x_2)}
{\int_{\mathbb R}p(y\mid u)p_1(u)\,du}.
$$

ここで右辺を $x_1$ について積分すると、分子の $x_1$ の積分と分母が同一なので $p(x_2\mid y)=p_2(x_2)$ です。従って $X_2$ の条件付き分布は元の $N(\mu_2,s_2^2)$ のままです。
<!-- proof-end -->

一方、前節の相関のある二次元例では $X_2$ の平均も更新されました。「観測行列の核方向は常に不変」と言うのは誤りです。変化が起きるかどうかは事前の相関に依存します。

**転用してはいけない場合**も押さえましょう。例えば $Y=X^2+E$ で $X\sim N(0,1)$、$E\sim N(0,r^2)$ を独立に取ると、固定した $y$ の事後密度は

$$
p(x\mid y)\ \propto\
\exp\left[-\frac{x^2}{2}-\frac{(y-x^2)^2}{2r^2}\right].
$$

指数には $x^4$ が現れ、一般に Gaussian 密度ではありません。さらに正定値でない共分散には逆行列による公式をそのまま使えません。本講の公式は**有限次元・線形・独立な Gaussian・正定値共分散**という条件に依存しています。信用領域や頻度論的被覆、無限次元の確率測度は次講で扱います。

## 演習

式を再現するだけでなく、どの仮定が公式を正当化するかを確認しましょう。

### Level A：定義と直接計算

<a id="ex-inv15-a01"></a>

### INV15-A01 一次元の平方完成

- Level: A

$X\sim N(0,9)$、$E\sim N(0,4)$ が独立、$Y=X+E$、$y=5$ とする。$H$、$b_y$、事後平均と事後分散を計算し、事後平均が0と5の間に入る理由を式で示せ。

<!-- solution-start -->
#### 詳細解答

$n=m=1$、$A=1$、$\mu_0=0$、$\Gamma_0=9$、$\Gamma_\varepsilon=4$ です。どちらの分散も正で、独立性も仮定されています。[事後分布の公式](#thm-inv15-gaussian-posterior)の定義に代入して

$$
H=\frac19+\frac14=\frac{13}{36},
\qquad
b_5=0+\frac54=\frac54.
$$

よって $\Gamma_5=H^{-1}=36/13$、$\mu_5=(36/13)(5/4)=45/13$ です。$0<45/13<5$ は分子について $0<45<65$ から確認できます。さらに $\mu_5=(9/(9+4))5+(4/(9+4))0$ は事前平均と観測値の重み付き平均になっています。
<!-- solution-end -->

<a id="ex-inv15-a02"></a>

### INV15-A02 正定値性と階数不足

- Level: A

$A=(1\ \ 0)$、$\Gamma_0=I_2$、$\Gamma_\varepsilon=(2)$、$\mu_0=0$、$y=3$ とする。$H$ の固有値、$\mu_y$ と $\Gamma_y$ を求め、$A$ が単射でないのに事後分布が定まる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

$\Gamma_\varepsilon^{-1}=1/2$ なので $A^T\Gamma_\varepsilon^{-1}A=\operatorname{diag}(1/2,0)$ です。従って

$$
H=\begin{pmatrix}3/2&0\\0&1\end{pmatrix},
\qquad
b_y=A^T(3/2)=\begin{pmatrix}3/2\\0\end{pmatrix}.
$$

固有値は $3/2,1$ ともに正です。よって

$$
\Gamma_y=\begin{pmatrix}2/3&0\\0&1\end{pmatrix},
\qquad
\mu_y=\Gamma_yb_y=\begin{pmatrix}1\\0\end{pmatrix}.
$$

$A(0,1)^T=0$ ですが、$H$ の第二固有値は $\Gamma_0^{-1}$ の寄与により1で、逆行列が存在します。第二成分の平均・分散はともに事前のままです。
<!-- solution-end -->

<a id="ex-inv15-a03"></a>

### INV15-A03 尤度と密度の正規化

- Level: A

$X\sim N(2,1)$、$E\sim N(0,1)$ は独立、$Y=X+E$ とする。$p(y\mid x)$ と $p_0(x)$ を記し、$p(x\mid y)$ の積分が1となることを周辺密度の定義から証明せよ。

<!-- solution-start -->
#### 詳細解答

分散が正で誤差が独立なので、条件付き観測分布は $N(x,1)$ です。よって

$$
p(y\mid x)=\frac1{\sqrt{2\pi}}e^{-(y-x)^2/2},
\qquad
p_0(x)=\frac1{\sqrt{2\pi}}e^{-(x-2)^2/2}.
$$

$Z(y)=\int_{\mathbb R}p(y\mid u)p_0(u)\,du$ と置きます。被積分関数は正で、$p(y\mid u)\le(2\pi)^{-1/2}$、$\int p_0=1$ なので $0<Z(y)\le(2\pi)^{-1/2}<\infty$ です。[事後密度の定義](#def-inv15-posterior)を積分すると

$$
\int_{\mathbb R}p(x\mid y)\,dx
=\frac1{Z(y)}\int_{\mathbb R}p(y\mid x)p_0(x)\,dx
=\frac{Z(y)}{Z(y)}=1.
$$
<!-- solution-end -->

<a id="ex-inv15-a04"></a>

### INV15-A04 加重Tikhonovの係数

- Level: A

$A=I_2$、$\mu_0=0$、$\Gamma_0=\tau^2I_2$、$\Gamma_\varepsilon=\sigma^2I_2$（$\sigma,\tau>0$）とする。$J_y$ と通常の二乗ノルム Tikhonov 目的関数を比較して $\alpha$ を求め、$\sigma$ が大きくなるとどちらを重視するか説明せよ。

<!-- solution-start -->
#### 詳細解答

逆行列は $\Gamma_0^{-1}=\tau^{-2}I_2$、$\Gamma_\varepsilon^{-1}=\sigma^{-2}I_2$ であり、

$$
J_y(x)=\frac1{2\sigma^2}\|x-y\|_2^2+\frac1{2\tau^2}\|x\|_2^2.
$$

正数 $2\sigma^2$ を掛けても最小点は変わらないので

$$
2\sigma^2J_y(x)=\|x-y\|_2^2+
\frac{\sigma^2}{\tau^2}\|x\|_2^2.
$$

[二乗ノルムTikhonov](../INV5/index.md#def-inv5-tikhonov)の $\alpha$ は $\sigma^2/\tau^2$ です。$\tau$ を固定して $\sigma$ が大きくなると観測は不確かになり、最小点の決定で事前の零平均への縮小を相対的に重視します。
<!-- solution-end -->

<a id="ex-inv15-a05"></a>

### INV15-A05 未観測成分の周辺分布

- Level: A

$X_1\sim N(1,4)$、$X_2\sim N(-2,9)$、$E\sim N(0,1)$ が相互に独立で $Y=X_1+E$ とする。観測 $y$ を得た後の $X_2$ の事後平均と分散を求め、$y$ に依存しないことを密度で説明せよ。

<!-- solution-start -->
#### 詳細解答

同時事前密度は $p_1(x_1)p_2(x_2)$、尤度は $p(y\mid x_1)$ です。事後同時密度はこれらの積に比例します。$x_1$ を積分すると、[未観測独立成分の命題](#prop-inv15-kernel-independent)の証明と同じく $x_1$ に関する正規化因子が消え、$p(x_2\mid y)=p_2(x_2)$ です。従って事後平均は $-2$、分散は9で、どちらも $y$ に依存しません。
<!-- solution-end -->

### Level B：導出と仮定の役割

<a id="ex-inv15-b01"></a>

### INV15-B01 相関があると未観測成分も更新される

- Level: B

$A=(1\ \ 0)$、$\mu_0=0$、$\Gamma_0=\begin{pmatrix}2&1\\1&2\end{pmatrix}$、$\Gamma_\varepsilon=(1)$、$y=3$ とする。$S$ から事後平均・事後共分散を計算し、事前・事後の第二成分の平均と分散を比較せよ。$\Gamma_0$ の正定値性も確認せよ。

<!-- solution-start -->
#### 詳細解答

$\Gamma_0$ の特性方程式は $(2-\lambda)^2-1=(1-\lambda)(3-\lambda)=0$ であり、固有値1と3は正です。従って仮定を満たします。$A\Gamma_0A^T=2$ なので $S=3$、$\Gamma_0A^T=(2,1)^T$ です。[観測側の更新公式](#prop-inv15-observation-form)に代入して

$$
\mu_3=\frac13\begin{pmatrix}2\\1\end{pmatrix}3
=\begin{pmatrix}2\\1\end{pmatrix}
$$

および

$$
\begin{aligned}
\Gamma_3
&=\begin{pmatrix}2&1\\1&2\end{pmatrix}
-\frac13\begin{pmatrix}2\\1\end{pmatrix}
\begin{pmatrix}2&1\end{pmatrix}\\
&=\begin{pmatrix}2/3&1/3\\1/3&5/3\end{pmatrix}
\end{aligned}
$$

を得ます。第二成分の平均は $0$ から $1$、分散は $2$ から $5/3$ へ変わりました。$X_2$ が直接観測されたのではなく、$X_1$ と $X_2$ の事前共分散1が情報の橋渡しをしています。
<!-- solution-end -->

<a id="ex-inv15-b02"></a>

### INV15-B02 行列恒等式を途中から再構成する

- Level: B

正定値 $\Gamma_0,\Gamma_\varepsilon$ と任意の $A$ に対して $H=\Gamma_0^{-1}+A^T\Gamma_\varepsilon^{-1}A$、$S=\Gamma_\varepsilon+A\Gamma_0A^T$ と置く。$H\Gamma_0A^T=A^T\Gamma_\varepsilon^{-1}S$ を示し、これを用いて $H^{-1}A^T\Gamma_\varepsilon^{-1}=\Gamma_0A^TS^{-1}$ を導け。$S$ の可逆性も証明せよ。

<!-- solution-start -->
#### 詳細解答

$\Gamma_\varepsilon$ が対称正定値なので、非零 $u\in\mathbb R^m$ に対し

$$
u^TSu=(A^Tu)^T\Gamma_0(A^Tu)+u^T\Gamma_\varepsilon u>0.
$$

従って $S$ は正定値で可逆です。同じ理由で $H$ も正定値です。積を一項ずつ展開すると

$$
\begin{aligned}
H\Gamma_0A^T
&=\Gamma_0^{-1}\Gamma_0A^T+
A^T\Gamma_\varepsilon^{-1}A\Gamma_0A^T\\
&=A^T\Gamma_\varepsilon^{-1}
(\Gamma_\varepsilon+A\Gamma_0A^T)
=A^T\Gamma_\varepsilon^{-1}S.
\end{aligned}
$$

両辺に左から $H^{-1}$ を掛けると $\Gamma_0A^T=H^{-1}A^T\Gamma_\varepsilon^{-1}S$ です。右から $S^{-1}$ を掛けて

$$
H^{-1}A^T\Gamma_\varepsilon^{-1}=\Gamma_0A^TS^{-1}
$$

を得ます。行列の順序は変えていません。左辺も右辺も $n\times m$ 行列です。
<!-- solution-end -->

<a id="ex-inv15-b03"></a>

### INV15-B03 白色化と正規方程式

- Level: B

正定値 $\Gamma_0,\Gamma_\varepsilon$ の対称な逆平方根を $L_0=\Gamma_0^{-1/2}$、$L_\varepsilon=\Gamma_\varepsilon^{-1/2}$ とする。加重目的関数 $J_y$ を通常の Euclid ノルムの二乗和で表せ。また $z=L_0(x-\mu_0)$ への変換を用いて、最適性条件が[MAPの正規方程式](#thm-inv15-map-tikhonov)と等価であることを示せ。

<!-- solution-start -->
#### 詳細解答

対称性により $L_0^TL_0=\Gamma_0^{-1}$、$L_\varepsilon^TL_\varepsilon=\Gamma_\varepsilon^{-1}$ です。従って

$$
J_y(x)=\frac12\|L_\varepsilon(Ax-y)\|_2^2+
\frac12\|L_0(x-\mu_0)\|_2^2.
$$

$x=\mu_0+\Gamma_0^{1/2}z$ を代入し、$B=L_\varepsilon A\Gamma_0^{1/2}$、$d=L_\varepsilon(y-A\mu_0)$ と置くと

$$
J_y=\frac12\|Bz-d\|_2^2+\frac12\|z\|_2^2.
$$

$z$ で微分した条件は $(B^TB+I)z=B^Td$ です。左辺の $B^TB=\Gamma_0^{1/2}A^T\Gamma_\varepsilon^{-1}A\Gamma_0^{1/2}$ と、右辺の $B^Td=\Gamma_0^{1/2}A^T\Gamma_\varepsilon^{-1}(y-A\mu_0)$ を代入します。左から $\Gamma_0^{-1/2}$ を掛けて $z=\Gamma_0^{-1/2}(x-\mu_0)$ に戻すと

$$
(A^T\Gamma_\varepsilon^{-1}A+\Gamma_0^{-1})(x-\mu_0)
=A^T\Gamma_\varepsilon^{-1}(y-A\mu_0).
$$

両辺を展開し、$A^T\Gamma_\varepsilon^{-1}A\mu_0$ を相殺すれば

$$
(\Gamma_0^{-1}+A^T\Gamma_\varepsilon^{-1}A)x
=\Gamma_0^{-1}\mu_0+A^T\Gamma_\varepsilon^{-1}y
$$

を得ます。
<!-- solution-end -->

<a id="ex-inv15-b04"></a>

### INV15-B04 非線形観測ではGaussianに戻らない

- Level: B

$X\sim N(0,1)$、$E\sim N(0,1)$ は独立で、$Y=X^2+E$ とする。観測 $y=2$ の事後密度の指数を展開し、その密度が Gaussian でない理由と、MAP推定値が一つに決まらないことを示せ。

<!-- solution-start -->
#### 詳細解答

事前密度と尤度を掛けると

$$
p(x\mid2)\propto\exp\left[-\frac12x^2-\frac12(2-x^2)^2\right].
$$

指数の括弧を展開すると

$$
x^2+(2-x^2)^2=x^4-3x^2+4.
$$

Gaussian密度の対数は $x$ の二次多項式ですが、今回は四次項 $-x^4/2$ が残ります。最頻値は $q(x)=x^4-3x^2+4$ の最小点です。微分すると $q'(x)=4x^3-6x=2x(2x^2-3)$ で、停留点は $0,\pm\sqrt{3/2}$ です。

$$
q(0)=4,\qquad
q(\pm\sqrt{3/2})=\frac94-\frac92+4=\frac74<4.
$$

$q(x)\to+\infty$（$|x|\to\infty$）なので、二つの点 $\pm\sqrt{3/2}$ が全実数上の最小点で、MAPも二つあります。[線形Gaussian逆問題の事後平均と事後共分散](#thm-inv15-gaussian-posterior)の定理をこの非線形観測に適用して Gaussian 事後分布やMAPの一意性を主張してはいけません。
<!-- solution-end -->

### Level C：統合問題

<a id="ex-inv15-c01"></a>

### INV15-C01 二回の観測を一度で更新するか逐次更新するか

- Level: C

$X\sim N(0,2)$ とし、$E_1\sim N(0,1)$、$E_2\sim N(0,4)$ は $X$ と互いに独立である。$Y_1=X+E_1$、$Y_2=X+E_2$ を観測し、$y_1=1$、$y_2=3$ を得た。

1. 二つの観測をまとめて $A=(1,1)^T$、$\Gamma_\varepsilon=\operatorname{diag}(1,4)$ として扱い、事後平均と分散を求めよ。
2. 最初に $y_1$ だけで事後分布を作り、その事後分布を次の事前分布として $y_2$ で更新せよ。1と一致することを検証せよ。
3. 二つの更新が一致するための独立性の使われ方と、対応する加重Tikhonov目的関数を示せ。

<!-- solution-start -->
#### 詳細解答

**1. 同時更新。** $n=1,m=2$ で、$\Gamma_0^{-1}=1/2$、$A^T\Gamma_\varepsilon^{-1}A=1+1/4$ です。観測誤差が独立なので、その同時共分散は対角行列 $\operatorname{diag}(1,4)$ になります。したがって

$$
H=\frac12+1+\frac14=\frac74,\qquad
b=\frac0{2}+\frac1{1}\cdot1+\frac1{4}\cdot3=\frac74.
$$

[線形Gaussian逆問題の事後平均と事後共分散](#thm-inv15-gaussian-posterior)より、分散 $H^{-1}=4/7$、平均 $H^{-1}b=1$、すなわち $X\mid(Y_1=1,Y_2=3)\sim N(1,4/7)$ です。

**2. 逐次更新。** 最初の観測だけを用いると、精度（分散の逆数）は $1/2+1=3/2$、右辺は $0/2+1=1$ です。従って最初の事後分布は $N(2/3,2/3)$ になります。これを第二観測の事前分布とすると、新たな精度は

$$
\frac1{2/3}+\frac1{4}=\frac32+\frac14=\frac74
$$

で、平均を求める右辺は

$$
\frac{2/3}{2/3}+\frac3{4}=1+\frac34=\frac74.
$$

よって分散は $4/7$、平均は1であり、同時更新と一致します。

**3. 仮定と最適化。** $E_1,E_2$ が互いに、また $X$ と独立なので、固定した $x$ の下で二つの尤度は積に分解します。[独立性と積分布](../../F0/F0-00P3/index.md#thm-f0-00p3-independence-product-law)により

$$
p(y_1,y_2\mid x)=p(y_1\mid x)p(y_2\mid x).
$$

従って負の対数に現れる二つの観測の重みは別々に加算され、

$$
J(x)=\frac12(x-1)^2+\frac1{8}(x-3)^2+\frac14x^2
$$

です。[MAPと加重Tikhonovの一致](#thm-inv15-map-tikhonov)からこの最小点は事後平均です。直接微分すると $J'(x)=(x-1)+(x-3)/4+x/2=(7/4)x-7/4$、$J''(x)=7/4>0$ ですから最小点は唯一の $x=1$ です。独立性なしで尤度を無条件に積へ分解することはできません。
<!-- solution-end -->

## まとめ

事前分布と観測誤差を正定値な Gaussian 分布で表すと、事後分布も Gaussian となり、**精度行列** $H=\Gamma_0^{-1}+A^T\Gamma_\varepsilon^{-1}A$ が観測前後の情報の結合を示します。事後平均は $\mu_y=H^{-1}b_y$、事後共分散は $H^{-1}$ です。MAP と事後平均が一致するのは、ここで事後密度が正定値の二次形式による Gaussian だからです。

事前の相関によって直接観測していない変数の推定も変わりますが、それは新しい測定が追加されたという意味ではありません。次の [INV16「逆問題の不確実性をどう読むか」](../INV16/index.md)では、事後分布をどう解釈し、事前仮定やモデル誤差にどう敏感かを扱います。
