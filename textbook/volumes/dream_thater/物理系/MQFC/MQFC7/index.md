# MQFC7 Schwinger関数とGaussianの全モーメント

[MQFC6](../MQFC6/index.md) では、すべての試験関数による測定を同時に実現する確率測度を構成しました。二点の共分散が分かると、四点や六点の相関まで決まるでしょうか。自由場では答えは肯定的です。今回は特性汎関数を有限個の方向に微分し、何通りの二点相関の積が現れるかを数えます。さらに、二点相関の積だけでは説明できない相関を取り出す方法を学びます。

直接の前提は [MQFC6](../MQFC6/index.md) です。以下 $d\ge1$、$m>0$ とし、[実Schwartz空間](../MQFC1/index.md#def-mqfc1-schwartz) を $S$、連続実線形双対を $S'$ とします。[質量付きEuclid自由場のGaussian測度の構成](../MQFC6/index.md#thm-mqfc6-free-measure) による測度を $\mu_m$、その期待値を $E$ と書きます。場の測定は $X_f(\omega)=\omega(f)$ です。[Euclid自由場の試験関数共分散](../MQFC5/index.md#def-mqfc5-covariance-form) の実制限を $B_m$ とします。

## 1. 測定の積の平均

四点の相関を調べるには、四つの重みで同じ場を測り、その積の平均を取ります。異なる測定結果は同じ標本点 $\omega$ に依存するので、独立とは限りません。Euclid場のこのモーメントをSchwinger関数と呼びます。まず点の値を必要としない形で扱います。

<a id="def-mqfc7-schwinger"></a>

<!-- formal-statement-start -->
> **定義（試験関数で測ったSchwinger関数）**
> $S'$ の円筒 $\sigma$ 加法族上の確率測度 $\mu$ について、各 $f\in S$ の測定 $X_f$ が全ての正整数次数の絶対モーメントを持つとする。$n\ge1$ に対して

$$
S_n(f_1,\ldots,f_n)=E_\mu\left[\prod_{j=1}^n X_{f_j}\right]
$$

> と定める。空積の期待値は $S_0=1$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc7-schwinger -->
### 直接例

固定点 $a$ と標準正規変数 $Y$ を取り、$\omega=Y\delta_a$ とします。[場の特性汎関数の直接例](../MQFC6/index.md#def-mqfc6-characteristic-functional) と同じ構成で、$\delta_a(f)=f(a)$ は連続実線形であり、有限族の測定は $Y$ の連続な線形写像なので円筒可測です。測定は $X_f=Yf(a)$ です。各 $k\ge1$ に対し

$$
E|X_f|^k=\frac{|f(a)|^k}{\sqrt{2\pi}}
\int_{\mathbb R}|y|^k e^{-y^2/2}\,dy<\infty.
$$

最後の積分は、有限区間では連続で、十分大きな $|y|$ では $|y|^k\le e^{y^2/4}$ となるため収束します。従って定義の条件を満たします。$E[Y]=0$、$E[Y^2]=1$ より

$$
S_1(f)=0,\qquad S_2(f,g)=f(a)g(a).
$$

この例では一般に $S_n=(E[Y^n])\prod_j f_j(a)$ です。
<!-- definition-example-end -->

一般の定義でもHölder不等式を指数 $n$ の $n$ 個の因子に適用すると

$$
E\left|\prod_j X_{f_j}\right|
\le\prod_j(E|X_{f_j}|^n)^{1/n}<\infty.
$$

各 $\omega$ が線形なので $S_n$ は各引数について実線形で、実数の積は可換だから対称です。自由場では [自由場測度の構成](../MQFC6/index.md#thm-mqfc6-free-measure) により各測定が平均零のGaussian変数であり、分散が零なら定数零、正なら上の正規密度の尺度変換で全絶対モーメントを持ちます。

## 2. 特性汎関数から取り出す

試験関数を $f_1,\ldots,f_n$ に固定し、$t=(t_1,\ldots,t_n)\in\mathbb R^n$ とします。測定の線形性を使えば

$$
F(t)=\chi_\mu\left(\sum_j t_jf_j\right)
=E_\mu\left[e^{i\sum_j t_jX_{f_j}}\right].
$$

一回の微分で測定が一個、二回で積が二個現れるはずです。ただし積分記号の内外で微分を交換できることを確かめる必要があります。

<a id="thm-mqfc7-differentiation"></a>

<!-- formal-statement-start -->
> **定理（Schwinger関数の特性汎関数微分表示）**
> $S'$ 上の確率測度 $\mu$ が各実試験関数の測定について全絶対モーメントを持つとする。任意の $n\ge1$ と $f_j\in S$ に対し

$$
S_n(f_1,\ldots,f_n)=
i^{-n}\partial_{t_1}\cdots\partial_{t_n}
\chi_\mu\left(\sum_j t_j f_j\right)\bigg|_{t=0}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

実パラメータで微分するので指数の絶対値は常に1です。微分で増える測定の積は、全絶対モーメントとHölder不等式で可積分になります。

<!-- proof-start -->
### 証明

$Z_j=X_{f_j}$ と略記します。実数 $u,h$ について

$$
\frac{e^{ihu}-1}{h}
=iu\int_0^1e^{ishu}\,ds
$$

なので絶対値は $|u|$ 以下、$h\to0$ で $iu$ に収束します。既に $k$ 回微分した被積分関数を $i^k Z_{j_1}\cdots Z_{j_k} e^{it^TZ}$ とすると、次の $t_\ell$ による差商の絶対値は

$$
|Z_{j_1}\cdots Z_{j_k} Z_\ell|.
$$

この積は指数 $k+1$ のHölder不等式で可積分です（添字の重複も許されます）。従って優収束定理を適用して一階ずつ微分を交換できます。帰納的に

$$
\partial_{t_1}\cdots\partial_{t_n}F(t)
=i^n E\left[Z_1\cdots Z_n e^{it^TZ}\right].
$$

$t=0$ では指数が1となり、$i^n$ で割れば結論を得ます。
<!-- proof-end -->

自由場では $K_{ij}=B_m(f_i,f_j)$ と置くと [Gaussian型特性汎関数の有限次元整合性](../MQFC6/index.md#thm-mqfc6-gaussian-characteristic) により

$$
F(t)=e^{-Q(t)},\qquad
Q(t)=\frac12\sum_{i,j}K_{ij}t_it_j.
$$

例えば $\partial_{t_1}F=-\sum_j K_{1j}t_j F$ です。もう一度微分して原点に代入すると $\partial_{t_2}\partial_{t_1}F(0)=-K_{12}$ であり、$i^{-2}=-1$ を掛けると $S_2=K_{12}$ が戻ります。

## 3. 二点相関の積で全てを表す

四つのラベル $1,2,3,4$ を二個ずつの組に分ける方法は $(12)(34),(13)(24),(14)(23)$ の三通りです。このように各ラベルがちょうど一回現れる、順序を持たない二元集合の集まりを対分割とします。$2r$ 個のラベルの対分割全体を $\mathcal P_2(2r)$ と書きます。測定が同じ試験関数でも、微分するラベルは別々です。

<a id="thm-mqfc7-gaussian-pairing"></a>

<!-- formal-statement-start -->
> **定理（Gaussian Schwinger関数のWick対分割公式）**
> $d\ge1,m>0$ とし、$\mu_m$ を平均零で共分散 $B_m$ のEuclid自由場測度とする。任意の実試験関数 $f_1,\ldots,f_n$ に対して奇数次の $S_n$ は零であり、$r\ge1$ について

$$
S_{2r}(f_1,\ldots,f_{2r})
=\sum_{P\in\mathcal P_2(2r)}
\prod_{\{a,b\}\in P} B_m(f_a,f_b).
$$

> 対分割の個数は $(2r)!/(2^r r!)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

指数関数の展開で、$2r$ 回の微分後に原点で残るのは二次式の $r$ 乗だけです。一つの対分割からは、各対の向きと対の並べ方による $2^r r!$ 個の項が生じ、指数展開の係数と相殺します。

<!-- proof-start -->
### 証明

[Schwinger関数の特性汎関数微分表示](#thm-mqfc7-differentiation) を $F(t)=\exp(-Q(t))$ に適用します。指数関数の冪級数は全ての有限次数の微分について有界な $t$ の範囲で一様収束するので、原点での混合微分は係数の抽出と一致します。各ラベルの指数が1の単項式 $t_1\cdots t_n$ の係数だけを取ればよく、その微分の係数は $1!^n=1$ です。

$Q$ は斉次二次式なので奇数次数の項はありません。$n=2r$ では必要な項は

$$
\frac{(-1)^r}{2^r r!}
\left(\sum_{a,b=1}^{2r}K_{ab}t_at_b\right)^r.
$$

目標の単項式を得るには、各ラベルが一回だけ現れるように $r$ 個の順序付き組 $(a,b)$ を選びます。固定した対分割に対して、各組の向きは2通り、$r$ 組の順序は $r!$ 通りです。$K_{ab}=K_{ba}$ だからこれらは同じ積を与えます。従って係数は

$$
(-1)^r\sum_{P\in\mathcal P_2(2r)}
\prod_{\{a,b\}\in P}K_{ab}.
$$

$i^{-2r}=(-1)^r$ が符号を打ち消して結論を得ます。対分割数は $2r$ 個のラベルを一列に並べて隣接二個ずつを組にし、同じ分割の重複 $2^r r!$ を割れば求まります。この議論には $K$ の逆行列が現れないので、線形従属な測定でも成立します。
<!-- proof-end -->

四次では

$$
S_4=K_{12}K_{34}+K_{13}K_{24}+K_{14}K_{23}.
$$

すべての重みが同じ $f$ で分散 $v=B_m(f,f)$ なら $S_4=3v^2$、$S_6=15v^3$ です。別の見方としてラベル1の相手を先に決めると、残りは $2r-2$ ラベルの対分割になります。

$$
S_{2r}=\sum_{j=2}^{2r}K_{1j}
S_{2r-2}(f_2,\ldots,\widehat{f_j},\ldots,f_{2r}).
$$

帽子はその引数を除くことを表します。この再帰は六次以上の計算にも使えます。

## 4. 多点分布としての意味

ここまでの式は測定の重みに作用するものであり、点ごとの場の値を掛け合わせてはいません。自由場ではさらに、独立な位置変数 $x_1,\ldots,x_n$ を持つ一つの緩増加分布として表せます。

<a id="prop-mqfc7-distribution"></a>

<!-- formal-statement-start -->
> **命題（Gaussian Schwinger多点分布の構成）**
> $d\ge1,m>0$ の自由場に対し、各 $n\ge1$ について $\mathcal S(\mathbb R^{dn})$ 上の連続線形汎関数 $T_n$ が存在し、実試験関数の積 $h(x_1,\ldots,x_n)=\prod_j f_j(x_j)$ に対して

$$
T_n(h)=S_n(f_1,\ldots,f_n)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

共分散のFourier表示では一対に一つの運動量を割り当てます。その対の二つの位置変数に逆符号の運動量を入れ、一般の多変数試験関数にも作用する積分を作ります。質量が正なので乗数は有界です。

<!-- proof-start -->
### 証明

奇数次は $T_n=0$ とします。$n=2r$ の対分割 $P$ の各対を $a_\ell<b_\ell$ と向き付け、$\ell=1,\ldots,r$ と並べます。$p_\ell\in\mathbb R^d$ から $q\in\mathbb R^{2rd}$ を $q_{a_\ell}=-p_\ell$、$q_{b_\ell}=p_\ell$ と定めます。[Schwartz空間のFourier変換](../MQFC1/index.md#thm-mqfc1-fourier) を全次元 $2rd$ に適用して

$$
T_P(h)=(2\pi)^{-dr}\int_{\mathbb R^{dr}}
\widehat h(q)\prod_{\ell=1}^r
\frac{dp_\ell}{|p_\ell|^2+m^2}.
$$

と置きます。$|q|^2=2\sum_\ell |p_\ell|^2$ です。$p=(p_1,\ldots,p_r)$ とし、整数 $N>dr$ を選ぶと

$$
|T_P(h)|\le
(2\pi)^{-dr}m^{-2r}
\sup_q(1+|q|)^N|\widehat h(q)|
\int_{\mathbb R^{dr}}(1+|p|)^{-N}dp.
$$

最後の積分は原点付近で有界、無限遠では動径積分の指数が $dr-1-N<-1$ なので有限です。上の上限はSchwartz半ノルムの有限和で抑えられ、Fourier変換はSchwartz位相で連続です。従って $T_P$ は連続線形です。

積の試験関数 $h=\prod_j f_j$ ではFubiniの定理により $\widehat h(q)=\prod_j\widehat f_j(q_j)$ です。各因子は急減少し、上で絶対収束を確認したので積分を対ごとに分けられます。実 $f_a$ について $\widehat f_a(-p)=\overline{\widehat f_a(p)}$ だから

$$
T_P(h)=\prod_{\{a,b\}\in P} B_m(f_a,f_b).
$$

有限和 $T_{2r}=\sum_P T_P$ を取れば [Gaussian Schwinger関数のWick対分割公式](#thm-mqfc7-gaussian-pairing) と一致します。
<!-- proof-end -->

これは独立な変数の分布です。$x_1=x_2$ と置く操作の存在はこの証明からは従いません。例えば $d=2$ の二点核の形式的な対角値には $\int_{\mathbb R^2}dp/(|p|^2+m^2)$ が現れます。半径 $R$ まで積分すると

$$
\int_{|p|\le R}\frac{dp}{|p|^2+m^2}
=\pi\log\frac{R^2+m^2}{m^2},
$$

となり、$R\to\infty$ で発散します。試験関数で測った二点相関は有限でも、点での自己収縮は別の問題になります。

## 5. 連結相関を取り出す

四次モーメントには三通りの二点相関の積が含まれています。この部分を取り除けば、二点だけでは表せない四次の情報を抽出できます。一般次数でその引き算を自動化するのが対数です。

有限族 $Z_j=X_{f_j}$ を固定し、実パラメータ $s$ で $M(s)=E[e^{\sum_j s_j Z_j}]$ を考えます。原点の近傍で $M$ が有限なら正の値を取り、$M(0)=1$ です。$\log M$ の混合微分で定まる量を、ここでは連結Schwinger関数（同時キュムラント）として扱います。

<a id="def-mqfc7-connected"></a>

<!-- formal-statement-start -->
> **定義（連結Schwinger関数）**
> $S'$ 上の確率測度 $\mu$ と実試験関数 $f_1,\ldots,f_n$ に対し、$Z_j=X_{f_j}$ の指数モーメントが原点を含む実開近傍で有限とする。連結Schwinger関数を

$$
S_n^{\mathrm c}(f_1,\ldots,f_n)
=\partial_{s_1}\cdots\partial_{s_n}
\log E_\mu[e^{\sum_j s_j Z_j}]\bigg|_{s=0}
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc7-connected -->
### 直接例

$Y$ が $1,-1$ をそれぞれ確率 $1/2$ で取るとし、$\omega=Y\delta_a$ とします。第1節の可測性と線形性はそのまま成立します。$f(a)=1$ の試験関数 $f$ を四つ取ると $Z_j=Y$ です。$u=s_1+s_2+s_3+s_4$ として

$$
M(s)=\frac{e^u+e^{-u}}2
=1+\frac{u^2}{2}+\frac{u^4}{24}+O(u^6).
$$

これは全実パラメータで有限かつ正です。$\log(1+z)=z-z^2/2+O(z^3)$ に $z=M-1$ を代入すると

$$
\log M=\frac{u^2}{2}
+\left(\frac1{24}-\frac18\right)u^4+O(u^6)
=\frac{u^2}{2}-\frac{u^4}{12}+O(u^6).
$$

従って二次の混合微分は1、四次の混合微分は $-4!/12=-2$ です。この場の四次モーメントは1ですが、分散1のGaussianの四次モーメントは3なので差が現れます。
<!-- definition-example-end -->

<a id="thm-mqfc7-partitions"></a>

<!-- formal-statement-start -->
> **定理（Schwingerモーメントの連結分割表示）**
> $Z_j=X_{f_j}$ の指数モーメントが原点の実開近傍で有限であるとする。$\Pi(n)$ を $\{1,\ldots,n\}$ の集合分割（空でない互いに素な部分集合の集まりで、和集合が全体）とすると

$$
S_n(f_1,\ldots,f_n)
=\sum_{\pi\in\Pi(n)}
\prod_{A\in\pi} S_{|A|}^{\mathrm c}((f_j)_{j\in A}).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$M=\exp(\log M)$ を展開します。対分割の証明では二個のラベルの組だけが許されましたが、今度は $\log M$ の項の次数に応じて任意の大きさの部分集合を使えます。

<!-- proof-start -->
### 証明

仮定からある $\epsilon>0$ について、全符号ベクトル $\eta\in\{-1,1\}^n$ で $M(2\epsilon\eta)<\infty$ です。従って

$$
E[e^{2\epsilon\sum_j|Z_j|}]
\le\sum_\eta M(2\epsilon\eta)<\infty.
$$

$|s_j|<\epsilon$ では指数の冪級数の絶対和が $e^{\epsilon\sum_j|Z_j|}$ で抑えられます。よって項別積分が可能で $M$ は原点近傍で冪級数を持ちます。その係数の微分は測定の積の期待値です。$M(0)=1$ から十分小さな近傍で $|M-1|<1$ となり、対数の冪級数も収束します。

$L=\log M$ は定数項が零です。非空集合 $A$ に対応する単項式 $\prod_{j\in A}s_j$ の係数は、その混合微分、すなわち $S_{|A|}^{\mathrm c}$ です。$M=e^L=\sum_{k\ge0}L^k/k!$ の $s_1\cdots s_n$ の係数を考えます。各因子の単項式はラベルの重複を許されず、選んだ $k$ 個の非空集合は互いに素で全ラベルを覆います。固定した $k$ ブロックの集合分割が $k!$ 通りの因子の順序で現れるので $1/k!$ と相殺します。左辺の係数は $E[\prod_j Z_j]$ であり、右辺は求める分割和です。
<!-- proof-end -->

平均零の場合は一元集合を含む分割が消えます。二次では $S_2^{\mathrm c}=S_2$、四次では四元集合一個と二元集合二個の分割だけが残るので

$$
S_4^{\mathrm c}=S_4-
(K_{12}K_{34}+K_{13}K_{24}+K_{14}K_{23})
$$

です。ここで $K_{ij}=E[Z_iZ_j]$ です。

<a id="thm-mqfc7-connected-gaussian"></a>

<!-- formal-statement-start -->
> **定理（中心化Gaussian場の連結相関の消失）**
> $\mu_m$ を $m>0$ のEuclid自由場測度とする。任意の実試験関数に対し $S_1^{\mathrm c}=0$、$S_2^{\mathrm c}(f,g)=B_m(f,g)$ であり、$n\ge3$ では $S_n^{\mathrm c}=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

特性関数では負の二次式が指数に現れました。実の指数モーメントでは正の二次式が現れます。対数を取るとその二次式だけが残ります。

<!-- proof-start -->
### 証明

[Gaussian型特性汎関数の有限次元整合性](../MQFC6/index.md#thm-mqfc6-gaussian-characteristic) により $Z=(Z_1,\ldots,Z_n)^T$ の分布は $K^{1/2}Y$ と同じです。$Y$ は独立標準正規変数のベクトルで $K$ は正半定値です。一次元標準正規の実指数モーメントは平方完成で

$$
\frac1{\sqrt{2\pi}}\int e^{uy-y^2/2}dy
=e^{u^2/2}\frac1{\sqrt{2\pi}}\int e^{-(y-u)^2/2}dy
=e^{u^2/2}.
$$

各 $u_j=(K^{1/2}s)_j$ にこれを使い、独立性から

$$
M(s)=\prod_j e^{u_j^2/2}
=e^{s^TKs/2}.
$$

従って全実 $s$ で有限であり、$\log M=s^TKs/2$ です。一階微分は原点で零、二階微分は $K_{ab}$、三階以上は恒等的に零です。
<!-- proof-end -->

この定理と [連結分割表示](#thm-mqfc7-partitions) を合わせると、Gaussianでは二元集合だけが残り、Wick対分割公式が再現されます。連結四次相関が零でも通常の四次相関まで零になるわけではありません。

## 6. 演習

### 演習 MQFC7-A1：微分の符号

- Level: A

平均零、分散 $v>0$ の正規変数 $Z$ の特性関数 $F(t)=e^{-vt^2/2}$ から $E[Z^2]$ と $E[Z^4]$ を求めよ。

<!-- solution-start -->
**詳細解答**

[特性汎関数微分表示](#thm-mqfc7-differentiation) の証明は同じ変数の反復微分にも適用できます。原点付近で

$$
F(t)=1-\frac v2t^2+\frac{v^2}{8}t^4+O(t^6).
$$

$F''(0)=-v$、$F^{(4)}(0)=24v^2/8=3v^2$ です。$i^{-2}=-1$、$i^{-4}=1$ なので $E[Z^2]=v$、$E[Z^4]=3v^2$ となります。
<!-- solution-end -->

### 演習 MQFC7-A2：六次の対分割

- Level: A

六ラベルの対分割数を、ラベル1の相手を選ぶ方法で求めよ。分散2の中心化Gaussian測定の六次モーメントも求めよ。

<!-- solution-start -->
**詳細解答**

1の相手は5通りです。残り四ラベルの最小の相手は3通りで、最後の二ラベルは1通りです。計 $5\cdot3\cdot1=15$ 通りです。[Wick対分割公式](#thm-mqfc7-gaussian-pairing) で各対は分散2を与えるから $15\cdot2^3=120$ です。
<!-- solution-end -->

### 演習 MQFC7-A3：退化した四点測定

- Level: A

自由場で $B_m(f,f)=2$ とし、$S_4(f,2f,f,-f)$ を求めよ。

<!-- solution-start -->
**詳細解答**

線形性から測定は $(Z,2Z,Z,-Z)$ で、積は $-2Z^4$ です。[Wick対分割公式](#thm-mqfc7-gaussian-pairing) で $E[Z^4]=3\cdot2^2=12$ なので答えは $-24$ です。直接にも $(K_{12},K_{34})=(4,-2)$、$(K_{13},K_{24})=(2,-4)$、$(K_{14},K_{23})=(-2,4)$ より三項とも $-8$ になります。
<!-- solution-end -->

### 演習 MQFC7-A4：連結二次と四次

- Level: A

分散3の中心化Gaussian変数 $Z$ について、同じ測定を四つ取る。$\log E[e^{uZ}]$ と通常の四次モーメント、連結四次を求めよ。

<!-- solution-start -->
**詳細解答**

[中心化Gaussian場の連結相関の消失](#thm-mqfc7-connected-gaussian) の平方完成で $M(u)=e^{3u^2/2}$、$\log M=3u^2/2$ です。二階微分は3、四階微分は零です。一方 [Wick対分割公式](#thm-mqfc7-gaussian-pairing) では三対分割がそれぞれ $3^2=9$ を与えるので四次モーメントは27です。連結四次は $27-3\cdot9=0$ です。
<!-- solution-end -->

### 演習 MQFC7-B1：二点共分散から混合モーメント

- Level: B

中心化Gaussian変数 $X,Y$ の分散を $2,3$、共分散を1とする。$E[X^2Y^2]$ と $E[X^3Y]$ を求め、対分割を明示せよ。

<!-- solution-start -->
**詳細解答**

この行列は $2a^2+2ab+3b^2=2(a+b/2)^2+5b^2/2>0$（$(a,b)\ne(0,0)$）なので実現可能です。[Wick対分割公式](#thm-mqfc7-gaussian-pairing) の係数計算は任意の中心化Gaussianに適用できます。ラベルを $X_1,X_2,Y_3,Y_4$ とすると $(12)(34)$ は $2\cdot3$、$(13)(24)$ と $(14)(23)$ は各 $1\cdot1$ です。合計8です。

$X_1,X_2,X_3,Y_4$ では4の相手を三つのXから選び、残りのX同士を結ぶので各項 $1\cdot2$、合計6です。
<!-- solution-end -->

### 演習 MQFC7-B2：独立と連結性

- Level: B

独立な実確率変数 $X,Y$ がそれぞれ原点近傍で有限な指数モーメントを持つとする。$X$ と $Y$ が少なくとも一回ずつ現れる任意の混合キュムラントが零になることを示せ。

<!-- solution-start -->
**詳細解答**

独立性から原点の十分小さな近傍で

$$
M(s,t)=E[e^{sX}]E[e^{tY}]=M_X(s)M_Y(t).
$$

両因子は正であり、[連結分割表示](#thm-mqfc7-partitions) の証明と同じ指数モーメントの評価で微分が存在します。対数は $\log M_X(s)+\log M_Y(t)$ です。$a,b\ge1$ とすると、第一項は $t$ に依存しないので $\partial_t^b$ で消え、第二項は $s$ に依存しないので $\partial_s^a$ で消えます。従って $\partial_s^a\partial_t^b\log M(0,0)=0$ です。個々の変数がGaussianである必要はありません。
<!-- solution-end -->

### 演習 MQFC7-B3：四点分布の積分

- Level: B

$d=1,m>0$ とし、対分割 $P=\{\{1,3\},\{2,4\}\}$ の多点分布を $h\in\mathcal S(\mathbb R^4)$ に作用させる積分を書け。絶対収束を $N=4$ の半ノルムで確認せよ。

<!-- solution-start -->
**詳細解答**

[多点分布の構成](#prop-mqfc7-distribution) で $r=2$、二つの運動量を $p,k$ とすると $q=(-p,-k,p,k)$ です。

$$
T_P(h)=\frac1{(2\pi)^2}\int_{\mathbb R^2}
\frac{\widehat h(-p,-k,p,k)}
{(p^2+m^2)(k^2+m^2)}\,dp\,dk.
$$

$A=\sup_q(1+|q|)^4|\widehat h(q)|$ とします。$|q|^2=2(p^2+k^2)$ なので積分の絶対値は

$$
\frac{A m^{-4}}{(2\pi)^2}
\int_{\mathbb R^2}(1+\sqrt{p^2+k^2})^{-4}dp\,dk
$$

以下です。極座標で最後の積分は $2\pi\int_0^\infty r(1+r)^{-4}dr$ です。$u=1+r$ と置くと $\int_1^\infty(u^{-3}-u^{-4})du=1/2-1/3=1/6$ なので $\pi/3$ となり有限です。
<!-- solution-end -->

### 演習 MQFC7-C1：非Gaussian場と六次の連結分解

- Level: C

$Y$ が $\pm1$ を等確率で取る場 $Y\delta_a$ と、標準正規変数 $G$ の場 $G\delta_a$ を比較する。$f(a)=1$ とする。

1. 両場の二次・四次・六次の測定モーメントを求めよ。
2. 対称性から奇数次の連結量が零となることを示せ。
3. 六ラベルの分割を数え、六次の連結量を二次・四次・六次モーメントから計算せよ。
4. 二点共分散だけで一般の場の全階層が決まらない理由を説明せよ。

<!-- solution-start -->
**詳細解答**

**1.** 測定はそれぞれ $Y,G$ です。$Y^{2k}=1$ なので三つとも1です。[Wick対分割公式](#thm-mqfc7-gaussian-pairing) の有限次元計算で $G$ の分散は1、対分割数は $1,3,15$ なのでモーメントは $1,3,15$ です。

**2.** 両分布は符号反転で不変なので $M(u)=M(-u)$ です。$Y$ は有界、$G$ は平方完成により指数モーメントが全実数で有限です。従って原点近傍の $\log M$ も偶関数で、奇数次の微分は零です。

**3.** 同じ測定の次数 $k$ の連結量を $c_k$、モーメントを $m_k$ とします。[連結分割表示](#thm-mqfc7-partitions) で奇数サイズのブロックは寄与しません。四ラベルでは $4$ と $2+2$ があり $m_4=c_4+3c_2^2$ です。六ラベルでは $6$、$4+2$、$2+2+2$ の三種類です。$4+2$ は二元集合を $\binom62=15$ 通り選び、残りを四元集合とするので15通りです。$2+2+2$ は15通りです。従って

$$
m_6=c_6+15c_4c_2+15c_2^3.
$$

$Y$ では $c_2=1$、$c_4=1-3=-2$ なので

$$
c_6=1-15(-2)(1)-15=16.
$$

$G$ では $c_2=1$、$c_4=3-3=0$ なので $c_6=15-0-15=0$ です。

**4.** どちらも全ての $f,g$ について共分散は $f(a)g(a)$ ですが、四次は同じ $f$ でも1と3に分かれます。Gaussianの特性関数が二次式の指数であるという仮定が失われると、対数に四次以上の項が残り得るためです。単に平均零・共分散が一致することはWick対分割公式の仮定を満たしません。
<!-- solution-end -->

## 7. 次の講義

全モーメントを二点共分散の組合せとして計算できるようになりました。MQFC8ではEuclid時間を反転する操作を入れ、正時間に支持を持つ測定で作った二点共分散の正値性を証明します。その結果をGaussianの多項式へ広げるとき、今回の対分割公式が役立ちます。
