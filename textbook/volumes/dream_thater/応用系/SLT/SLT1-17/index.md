# SLT1-17 有限辞書・線形予測・ridgeの汎化保証比較

## 1. 同じ「学習」でも保証する量は違う

これまで、有限個の予測器を一斉に調べる方法、VC次元で分類器を測る方法、Rademacher複雑度で実数値予測器を測る方法、そして算法の一点置換に対する安定性を学んだ。では、実際の学習器を選ぶとき、この四つの道具はどう比較できるだろうか。

まず三種類の模型を並べよう。

1. **有限辞書**：標本を見ずに用意した有限個の候補から経験リスク最小化（ERM）で一つを選ぶ。
2. **線形予測**：係数 $w$ の範囲をノルムで制限し、分類または回帰をする。係数は連続的に変わるので候補は無限個ある。
3. **ridge回帰**：二乗損失に二次罰則を加えて唯一の係数を選ぶ。関数クラスの大きさよりも、標本一点の置換で解がどれほど動くかを評価できる。

三つとも「汎化」を扱うが、**0–1分類誤差か二乗誤差か、高確率か期待値か、全候補同時か特定算法の出力だけか**が違う。比較の前にこの違いを固定する。

以下、標本 $S=(Z_1,\ldots,Z_n)\sim P^n$ は独立同分布とし、母集団リスクを $R_P(h)=\mathbb E\ell(h,Z)$、経験リスクを $\widehat R_S(h)=n^{-1}\sum_i\ell(h,Z_i)$ と書く。$n\ge1$、$\delta\in(0,1)$ とする。固定候補とデータを見て選んだ候補を区別することが、全ての出発点である。

## 2. 有限辞書：保証の代価は候補数の対数

非空有限集合 $\mathcal H=\{h_1,\ldots,h_M\}$ を**標本抽選前に固定**する。$M\ge1$、全ての候補の損失は $[0,1]$ に収まるとする。例えば二値分類の0–1損失ならこの条件は自動的に成立する。各候補が可測であるとし、有限集合上の同点処理は固定しておく。

[有限辞書の一様偏差界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)に、失敗確率を $\delta$ として代入する。半径を

$$
t_M=\sqrt{\frac{\log(2M/\delta)}{2n}}
$$

とすると、確率 $1-\delta$ 以上で全候補について $|R_P(h)-\widehat R_S(h)|\le t_M$ が同時成立する。この一つの事象上では経験リスク最小化子 $\widehat h$ も比較相手 $h^\star\in\arg\min_{\mathcal H}R_P$ も含まれる。実際、

$$
\begin{aligned}
R_P(\widehat h)
&\le\widehat R_S(\widehat h)+t_M\\
&\le\widehat R_S(h^\star)+t_M\\
&\le R_P(h^\star)+2t_M.
\end{aligned}
$$

これは[有限クラスERMの系](../SLT1-04/index.md#cor-slt1-04-finite-erm)の適用である。例えば $M$ を16倍にしても半径の二乗へ加わるのは $\log16/(2n)$ だけだが、標本を見て辞書そのものを自由に作り直す操作はこの議論に含まれない。

**具体例**。入力が $\{a,b\}$ の分類で、辞書を「常に0」「常に1」「$a$ だけ1」の3候補とする。各候補は標本前に確定しており、$M=3$ の合併評価が使える。標本を見てから「観測点では正しいが未知点では間違う」予測器を新しい第4候補として作るなら、元の $M=3$ の評価ではその候補を覆えない。

## 3. アフィン分類器：無限候補をVC次元で数える

入力 $x\in\mathbb R^d$ を直線・超平面で分ける分類器を考える。$w\in\mathbb R^d$ は向きと尺度、$b\in\mathbb R$ は切片であり、境界 $w\cdot x+b=0$ の点をラベル1に含めることにする。ここで $d\ge1$ は**入力の次元**であり、VC次元そのものではない。

<a id="def-slt1-17-affine-halfspace"></a>

<!-- formal-statement-start -->
> **定義（アフィン半空間分類器クラス）**
> 整数 $d\ge1$ に対し、$\mathbb R^d$ 上の二値予測器の集合を

$$
\mathcal H_d^{\mathrm{aff}}
=\{h_{w,b}:x\mapsto\boldsymbol1_{\{w\cdot x+b\ge0\}}:
w\in\mathbb R^d,\ b\in\mathbb R\}
$$

> とする。各 $h_{w,b}$ は可測であり、境界上では値1を返す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-17-affine-halfspace -->
**定義の確認**。$d=1$、$w=1,b=-1$ とすると、$h_{1,-1}(x)=1$ となる条件は $x-1\ge0$、すなわち $x\ge1$ である。$x=1$ は1、$x=0$ は0に分類され、境界規則も確かめられる。$w=-1,b=1$ なら $x\le1$ が1側になる。$w=0,b=-1$ は全点0、$w=0,b=1$ は全点1なので、定数分類器も含まれている。
<!-- definition-example-end -->

有限集合の全ての二値ラベル付けを実現できることを[shattering](../SLT1-05/index.md#def-slt1-05-shattering)と呼び、可能な集合の最大点数が[VC次元](../SLT1-05/index.md#def-slt1-05-vc)である。直線分類器が何個の点を自由にラベル付けできるかを、上下から決める。

<a id="thm-slt1-17-affine-vc"></a>

<!-- formal-statement-start -->
> **定理（アフィン半空間のVC次元）**
> $d\ge1$ とし、[アフィン半空間分類器クラス](#def-slt1-17-affine-halfspace)を $\mathbb R^d$ 上で考える。このとき

$$
\operatorname{VCdim}(\mathcal H_d^{\mathrm{aff}})=d+1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

下界では原点と標準基底の $d+1$ 点に任意の $\pm1$ の符号を割り当て、切片と各係数を直接決める。上界では任意の $d+2$ 点を拡張ベクトル $(x,1)$ にすると線形従属になる。従属係数の正負を使うラベル付けは実現できない。

<!-- proof-start -->
### 証明

**下界**。点 $x_0=0,x_j=e_j$（$1\le j\le d$）を取る。どのようなラベル $y_0,\ldots,y_d\in\{0,1\}$ にも、符号 $s_j=2y_j-1\in\{-1,1\}$ を対応させる。$b=s_0$、$w_j=s_j-s_0$ と選べば

$$
w\cdot x_0+b=s_0,\qquad
w\cdot x_j+b=w_j+b=s_j.
$$

全て厳密に $\pm1$ なので境界の取り決めに依らず指定したラベルを実現する。従って $d+1$ 点はshatterされ、VC次元は $d+1$ 以上である。

**上界**。任意の $d+2$ 点 $x_1,\ldots,x_{d+2}$ を取る。$(x_i,1)\in\mathbb R^{d+1}$ は $d+2$ 本あるので線形従属である。従って全て0ではない係数 $a_i$ が存在し、

$$
\sum_{i=1}^{d+2}a_ix_i=0,\qquad
\sum_{i=1}^{d+2}a_i=0.
$$

第二式と非零性から $a_i>0$ と $a_i<0$ の両方が存在する。$a_i>0$ の点を1、$a_i<0$ の点を0にするラベルを指定し、$a_i=0$ の点には任意のラベルを置く。もしある $h_{w,b}$ が実現したなら、$g_i=w\cdot x_i+b$ について、正の $a_i$ では $g_i\ge0$、負の $a_i$ では $g_i<0$ である。よって

$$
\sum_i a_i g_i
=\sum_{a_i>0}a_ig_i+\sum_{a_i<0}a_ig_i>0.
$$

しかし従属性を用いると同じ左辺は

$$
\sum_i a_i(w\cdot x_i+b)
=w\cdot\sum_i a_ix_i+b\sum_i a_i=0,
$$

となり矛盾する。どの $d+2$ 点もshatterできないのでVC次元は $d+1$ 以下である。
<!-- proof-end -->

**二次元の実例**。$(0,0),(1,0),(0,1)$ は任意の3点ラベルを実現できる。一方、正方形の対角にある $(0,0),(1,1)$ を1、残る $(1,0),(0,1)$ を0にすることはできない。双方の対角線の中点は同じ $(1/2,1/2)$ であり、アフィン式の中点値は両端の平均だから、同じ点で「0以上」と「0未満」を要求して矛盾する。これは証明の線形従属性を図なしで直接確認した例である。

ただし既習の[VC高確率界](../SLT1-07/index.md#cor-slt1-07-vc-high-prob)は、その記述ではクラスを有限または可算と仮定している。ここで係数全体は非可算なので、定理の仮定を無言で置き換えてはいけない。実数係数の予測を可算クラスで近似できることを確かめる。

<a id="lem-slt1-17-rational-dense"></a>

<!-- formal-statement-start -->
> **補題（有理係数半空間による点ごとの近似）**
> $d\ge1$、$\mathcal H_d^{\mathrm{aff}}$ を上で定義したクラスとし、係数 $(w,b)$ を有理数へ制限した可算部分クラスを $\mathcal H_{d,\mathbb Q}^{\mathrm{aff}}$ とする。任意の $h\in\mathcal H_d^{\mathrm{aff}}$ について、$\mathcal H_{d,\mathbb Q}^{\mathrm{aff}}$ 内の列 $(h_k)$ を選んで、全ての $x\in\mathbb R^d$ に対し $h_k(x)\to h(x)$ とできる。
<!-- formal-statement-end -->

### 証明の見取り図

境界 $w\cdot x+b=0$ を有理近似だけで扱うと、符号が不規則に変わるおそれがある。切片を先に $1/k$ だけ正へ寄せ、係数の有理近似誤差を $1/k^2$ に抑えて境界上でも最終的に1を返すようにする。

<!-- proof-start -->
### 証明

実係数 $(w,b)$ を固定する。各 $k\ge1$ に対し有理係数 $w_{k,j},b_k$ を

$$
|w_{k,j}-w_j|\le k^{-2},\qquad
|b_k-(b+k^{-1})|\le k^{-2}
$$

となるよう選ぶ（有理数の稠密性）。$g(x)=w\cdot x+b$、$g_k(x)=w_k\cdot x+b_k$ と置けば、どの固定 $x$ にも

$$
|g_k(x)-g(x)-k^{-1}|
\le k^{-2}\left(1+\sum_{j=1}^d|x_j|\right).
$$

$g(x)>0$ または $g(x)<0$ なら $g_k(x)\to g(x)$ により符号は最終的に一致する。$g(x)=0$ なら固定した $x$ について、十分大きな $k$ で右辺は $1/k$ より小さいので $g_k(x)>0$。従って $1_{\{g_k(x)\ge0\}}\to1_{\{g(x)\ge0\}}$ が全ての $x$ で成立する。
<!-- proof-end -->

この補題から、任意の分布 $P$ に対し $0$–$1$ 損失が有界なので、支配収束によって $R_P(h_k)\to R_P(h)$ である。有限標本上でも $\widehat R_S(h_k)\to\widehat R_S(h)$ となる。有理係数族は可算かつVC次元が $d+1$ 以下だから、[VC高確率界](../SLT1-07/index.md#cor-slt1-07-vc-high-prob)をこの可算族に適用した同時事象の上で、全ての実係数の分類器へ極限を取れる。このため元の非可算クラスにも確率 $1-\delta$ 以上で

$$
\sup_{h\in\mathcal H_d^{\mathrm{aff}}}
|R_P(h)-\widehat R_S(h)|
\le\sqrt{\frac8n
\log\left(\frac4\delta\sum_{j=0}^{\min(d+1,2n)}
\binom{2n}{j}\right)}
$$

が成り立つ。$1\le d+1\le2n$ なら、[Sauer–Shelahの二項和評価](../SLT1-06/index.md#cor-slt1-06-polynomial)により右辺は

$$
\sqrt{\frac8n\left[(d+1)\log\frac{2en}{d+1}
+\log\frac4\delta\right]}
$$

以下になる。ここで使う損失は**0–1分類損失**であり、同じ式を二乗損失へ流用することはできない。

## 4. 線形回帰：二乗損失を有界にしてから複雑度を測る

線形回帰で $(w\cdot x-y)^2$ を損失にすると、$y$ や $x$ が無制限なら値はいくらでも大きくなる。そこで入力のノルム、ラベル、係数ノルムを固定し、初めて有界損失の理論へ接続する。

<a id="def-slt1-17-bounded-square"></a>

<!-- formal-statement-start -->
> **定義（有界線形回帰と正規化二乗損失）**
> $d,n\ge1$、$B>0$、$R>0$、$Y\ge0$、$K=BR+Y>0$ とする。分布 $P$ は $\|X\|_2\le R$、$|Y_{\mathrm{label}}|\le Y$ を確率1で満たすと仮定する。パラメータ集合

$$
W_B=\{w\in\mathbb R^d:\|w\|_2\le B\}
$$

> 上の予測 $h_w(x)=w\cdot x$ と、**正規化二乗損失**

$$
\ell_K(w,(x,y))=\frac{(w\cdot x-y)^2}{K^2}
$$

> を考える。分布の台では全ての $w\in W_B$ に対し $0\le\ell_K\le1$ が成り立つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-17-bounded-square -->
**定義の確認**。$d=1,B=2,R=1,Y=1$ なら $K=3$ である。$\|w\|\le2$、$|x|\le1$ から $|wx|\le2$、従って $|wx-y|\le3$ と各条件を順に検証できる。例えば $(w,x,y)=(2,1,-1)$ では $\ell_K=9/9=1$、$(1,1,1)$ では0であり、値域の両端を実現する。$w=3$ は係数条件外なのでこの保証の対象ではない。
<!-- definition-example-end -->

[線形クラスの経験Rademacher評価](../SLT1-11/index.md#prop-slt1-11-linear-rademacher)は固定入力に対し高々 $BR/\sqrt n$ である。ただしこれが直接抑えるのは予測値の符号平均で、**二乗損失の**符号平均ではない。二乗損失への移動に必要なLipschitz定数を計算する。

任意の $y\in[-Y,Y]$ に対し、$c(t)=\max(-BR,\min(BR,t))$ として $\phi_y(t)=(c(t)-y)^2/K^2$ を全実数上に定める。$c$ は1-Lipschitzで $|c(t)-y|\le K$ だから

$$
\begin{aligned}
|\phi_y(t)-\phi_y(s)|
&=\frac{|c(t)-c(s)|\,|c(t)+c(s)-2y|}{K^2}\\
&\le\frac{2K}{K^2}|c(t)-c(s)|
\le\frac2K|t-s|.
\end{aligned}
$$

モデルの予測 $w\cdot x$ は既に $[-BR,BR]$ 内なので、$\phi_y(w\cdot x)=\ell_K(w,(x,y))$ である。$c$ を挟む理由は、[contraction不等式](../SLT1-11/index.md#thm-slt1-11-contraction)が写像の**全実数上の**Lipschitz条件を必要とするからである。

<a id="thm-slt1-17-linear-square-generalization"></a>

<!-- formal-statement-start -->
> **定理（有界線形回帰の一様汎化界）**
> [有界線形回帰と正規化二乗損失](#def-slt1-17-bounded-square)の仮定を満たし、$S\sim P^n$ を独立同分布標本、$\delta\in(0,1)$ とする。正規化損失による母集団・経験リスクを

$
R_K(w)=\mathbb E_P\ell_K(w,Z),\qquad
\widehat R_K(w)=\frac1n\sum_{i=1}^n\ell_K(w,Z_i)
$

> と書く。標本前に決めた集合 $W_B$ に対し、確率 $1-\delta$ 以上で全ての $w\in W_B$ について同時に

$$
|R_K(w)-\widehat R_K(w)|
\le \frac{4BR}{K\sqrt n}
+\sqrt{\frac{\log(2/\delta)}{2n}}
=:D_{n,\delta}
$$

> が成立する。従ってこの集合上の厳密なERM $\widehat w$ は同じ事象で

$$
R_K(\widehat w)-\inf_{w\in W_B}R_K(w)
\le2D_{n,\delta}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

正規化で値域を $[0,1]$ にし、$\phi_y$ のLipschitz係数 $2/K$ を[符号平均の合成不等式](../SLT1-11/index.md#thm-slt1-11-contraction)へ入れる。既習のsymmetrizationで片側偏差の期待値を抑え、有界差分集中を正負それぞれへ使って二側の同時事象を作る。最後に連続な係数集合を可算稠密集合で近似する。

<!-- proof-start -->
### 証明

まず $W_B$ の可算稠密部分集合 $W_0=\mathbb Q^d\cap W_B$ に制限する。球の内点は有理座標で近似でき、境界点 $w$ も $(1-1/k)w$ を先に球の内点へ寄せてから有理座標で近似すればよい。そこから得る損失関数クラスを $\mathcal F_0$ とする。

入力だけに作用する線形関数クラスを

$
\mathcal H_0=\{x\mapsto w\cdot x:w\in W_0\},\qquad
\mathcal H_B=\{x\mapsto w\cdot x:w\in W_B\}
$

と書く。以下、$\widehat{\mathfrak R}_S(\mathcal F_0)$ は組 $(x_i,y_i)$ 上、$\widehat{\mathfrak R}_{(x_i)}(\mathcal H_0)$ は入力列 $(x_i)$ 上で計算する。

固定標本について、可算クラス $\mathcal H_0$ に[contraction不等式](../SLT1-11/index.md#thm-slt1-11-contraction)を $\phi_{y_i}(t)-\phi_{y_i}(0)$ で適用する。これは0で消え、Lipschitz係数は $2/K$ である。符号和の定数 $\sum_i\sigma_i\phi_{y_i}(0)$ は関数 $w$ に依存せず、符号期待値が0なので、通常版の経験Rademacher複雑度を変えない。$\mathcal H_0\subseteq\mathcal H_B$ だから、最後に[線形クラスの評価](../SLT1-11/index.md#prop-slt1-11-linear-rademacher)で上から抑えると

$$
\widehat{\mathfrak R}_S(\mathcal F_0)
\le\frac2K\widehat{\mathfrak R}_{(x_i)}(\mathcal H_0)
\le\frac2K\widehat{\mathfrak R}_{(x_i)}(\mathcal H_B)
\le\frac{2BR}{K\sqrt n}.
$$

ここで $\mathcal F_0$ の各関数は $[0,1]$ 値である。[Rademacher対称化](../SLT1-10/index.md#thm-slt1-10-symmetrization)を正負の片側偏差に適用すると、双方の上限の期待値は高々

$$
2\mathfrak R_n(\mathcal F_0)
\le\frac{4BR}{K\sqrt n}.
$$

片側偏差の上限 $U(S)=\sup_{w\in W_0}(R_K(w)-\widehat R_K(w))$ は、標本の一座標を置換すると各関数の経験平均が高々 $1/n$ しか変化せず、上限も高々 $1/n$ しか変化しない。従って[有界差分集中](../../../解析系/HDP/HDP4/index.md#thm-hdp4-mcdiarmid)に $c_i=1/n$ を入れ、失敗確率 $\delta/2$ とすると

$$
U(S)\le\mathbb E U(S)
+\sqrt{\frac{\log(2/\delta)}{2n}}
$$

が確率 $1-\delta/2$ 以上で成立する。$V(S)=\sup_{w\in W_0}(\widehat R_K(w)-R_K(w))$ も同じ評価である。合併評価により、確率 $1-\delta$ 以上で全ての $w\in W_0$ に対し絶対偏差が $D_{n,\delta}$ 以下となる。

任意の $w\in W_B$ を $w_k\in W_0$ で近似する。$\|X\|\le R$、$|Y_{\mathrm{label}}|\le Y$ の台では $\ell_K(w_k,Z)\to\ell_K(w,Z)$、しかも損失が $[0,1]$ 値だから支配収束により $R_K(w_k)\to R_K(w)$ である。経験平均も有限和として収束する。よって先ほどの**同一の同時事象**で極限を取れば、全 $w\in W_B$ へ結論が広がる。

$W_B$ はコンパクトで経験損失は連続なのでERM $\widehat w$ は存在する。先に示した一様偏差事象上で、任意の比較候補 $v\in W_B$ に対して

$
\begin{aligned}
R_K(\widehat w)
&\le\widehat R_K(\widehat w)+D_{n,\delta}\\
&\le\widehat R_K(v)+D_{n,\delta}\\
&\le R_K(v)+2D_{n,\delta}
\end{aligned}
$

と直接比較し、$v\in W_B$ について下限を取る。この三段の比較は[既習の近似ERM不等式](../SLT1-04/index.md#thm-slt1-04-approximate-erm-oracle)と同じ論法だが、ここではその定理の有限・可算クラス仮定を非可算な $W_B$ に誤適用せず、同時事象上で証明した。
<!-- proof-end -->

ここで $D_{n,\delta}$ は**正規化した二乗損失**の無次元量である。元の二乗損失で評価するなら全式に $K^2$ を掛ける。係数ノルムの上限 $B$ を標本の結果から後付けで選んだ場合、同じ固定クラスの議論を直ちに使うことはできない。

## 5. ridge：予測器全体でなく学習算法の動きを測る

[ridge回帰の定義](../../ML/ML1-05/index.md#def-ml1-05-ridge)では、二乗残差に $\ell_2$ 罰則を加える。ここでは目的関数の規格化を

$$
F_S(w)=\frac1n\sum_{i=1}^n(w\cdot x_i-y_i)^2
+\lambda\|w\|_2^2,\qquad \lambda>0,
$$

と固定する（切片も含める場合は全座標を罰する設定）。入力次元 $d$ に対し $w\in\mathbb R^d$ とし、全ての訓練点・試験点で $\|x\|\le R$、$|y|\le Y$、$R,Y>0$ とする。

最小化子 $\widehat w_S$ は[強凸ridgeの一意性](../../ML/ML1-05/index.md#thm-ml1-05-unique)から一意である。$F_S(\widehat w_S)\le F_S(0)=n^{-1}\sum_i y_i^2\le Y^2$ なので

$$
\lambda\|\widehat w_S\|_2^2\le Y^2,\qquad
\|\widehat w_S\|_2\le B_\lambda:=Y/\sqrt\lambda.
$$

この上限は**標本の値によらない**。このため、最小化を球 $W_\lambda=\{w:\|w\|\le B_\lambda\}$ に制限しても解は変わらない。$K_\lambda=Y+RB_\lambda$、$L_\lambda=2RK_\lambda$ と置くと、球上の二乗損失 $q(w,z)=(w\cdot x-y)^2$ は

$$
0\le q(w,z)\le K_\lambda^2,\qquad
|q(w,z)-q(v,z)|\le L_\lambda\|w-v\|_2
$$

を満たす。第二式は平方差の因数分解と $|x\cdot(w-v)|\le R\|w-v\|$ から得られる。これで[強凸正則化ERMの安定性](../SLT1-14/index.md#thm-slt1-14-regularized-erm-stability)の全条件が揃う。

<a id="thm-slt1-17-ridge-stability"></a>

<!-- formal-statement-start -->
> **定理（有界ridgeの一様安定性と期待汎化）**
> $d,n\ge1$、$\lambda,R,Y>0$、$\mathcal Z=\{(x,y)\in\mathbb R^d\times\mathbb R:\|x\|_2\le R,\ |y|\le Y\}$ とする。任意の $S\in\mathcal Z^n$ に対し、上の $F_S$ の唯一の最小化子を出力する決定的ridge算法 $A_n(S)=\widehat w_S$ を考える。$B_\lambda=Y/\sqrt\lambda$、$K_\lambda=Y+RB_\lambda$ とすると、任意の隣接標本 $S,T$ と任意の $z\in\mathcal Z$ で

$$
|q(\widehat w_S,z)-q(\widehat w_T,z)|
\le\beta_n,\qquad
\beta_n=\frac{4R^2K_\lambda^2}{\lambda n}.
$$

> さらに $S\sim P^n$ が独立同分布なら、元の二乗損失について

$$
\left|\mathbb E_S[R_q(\widehat w_S)
-\widehat R_{q,S}(\widehat w_S)]\right|
\le\beta_n
$$

> が成立する。これは期待汎化ギャップの評価であり、確率 $1-\delta$ の保証や、最良予測器への超過リスク界ではない。
<!-- formal-statement-end -->

### 証明の見取り図

罰則の係数が $\lambda\|w\|^2$ なので、既習の $\lambda_{\mathrm{old}}\|w\|^2/2$ 形式には $\lambda_{\mathrm{old}}=2\lambda$ を代入する。二つの標本の最適性を足すと共通の $n-1$ 点が消え、パラメータの距離が $1/n$ で抑えられる。損失値の差も抑え、最後に二乗損失を $K_\lambda^2$ で正規化して期待定理へつなぐ。

<!-- proof-start -->
### 証明

前段で $W_\lambda$ がコンパクト凸、全ての最小化子がこの球内にあり、球上の損失は凸かつ $L_\lambda$-Lipschitzであることを確認した。$F_S$ の二次成長不等式は、[強凸正則化ERMの定理](../SLT1-14/index.md#thm-slt1-14-regularized-erm-stability)の証明へ $\lambda_{\mathrm{old}}=2\lambda$ を代入して

$$
F_S(v)-F_S(\widehat w_S)
\ge\lambda\|v-\widehat w_S\|_2^2
\qquad(v\in W_\lambda)
$$

となる。隣接標本 $S,T$ は第 $i$ 観測 $z_i,z_i'$ だけが異なるとし、$w=\widehat w_S$、$v=\widehat w_T$、$\Delta=v-w$ とする。上の二次成長を $(S,v)$ と $(T,w)$ にそれぞれ使って足すと

$$
\begin{aligned}
2\lambda\|\Delta\|_2^2
&\le F_S(v)-F_S(w)+F_T(w)-F_T(v)\\
&=\frac1n\{q(v,z_i)-q(w,z_i)
+q(w,z_i')-q(v,z_i')\}\\
&\le\frac{2L_\lambda}{n}\|\Delta\|_2.
\end{aligned}
$$

$\Delta=0$ なら結論は自明。そうでなければ $2\lambda\|\Delta\|$ で割り

$$
\|\widehat w_S-\widehat w_T\|_2
\le\frac{L_\lambda}{\lambda n}
$$

を得る。任意の試験点 $z$ で同じLipschitz条件を使うと

$$
|q(\widehat w_S,z)-q(\widehat w_T,z)|
\le\frac{L_\lambda^2}{\lambda n}
=\frac{4R^2K_\lambda^2}{\lambda n}.
$$

この評価は分布や標本実現値を含まず、[一様算法安定性](../SLT1-14/index.md#def-slt1-14-uniform-stability)である。正規化した損失を

$$
q'(w,z)=q(w,z)/K_\lambda^2
$$

と置くと、球 $W_\lambda$ 上では $[0,1]$ 値となり、その安定性係数は $\beta_n/K_\lambda^2$ である。

可測性は[正規方程式](../../ML/ML1-05/index.md#thm-ml1-05-unique)で確認できる。$X\in\mathbb R^{n\times d}$ を行に各 $x_i^T$ を持つ設計行列、$y\in\mathbb R^n$ をラベル列とすると

$$
\widehat w_S=
\left(\frac1nX^TX+\lambda I_d\right)^{-1}\frac1nX^Ty.
$$

$\lambda>0$ により逆行列は常に存在し、標本座標に対して右辺は連続だから出力は可測である。最後に[一様安定性による期待汎化界](../SLT1-14/index.md#thm-slt1-14-expected-generalization)を $q'$ に適用し、得られた式へ $K_\lambda^2$ を掛けて元の二乗損失の結論を得る。
<!-- proof-end -->

**直接計算できる一変数模型**。$d=1$、全入力 $x_i=1$、$\lambda>0$ なら

$$
F_S(w)=\frac1n\sum_i(w-y_i)^2+\lambda w^2
= (1+\lambda)w^2-2\bar y\,w+\frac1n\sum_i y_i^2.
$$

ここで $F_S'(w)=dF_S(w)/dw$ は実変数 $w$ に関する通常の導関数である。二次式を微分すると

$
F_S'(w)=2(1+\lambda)w-2\bar y,\qquad
F_S''(w)=2(1+\lambda)>0
$

だから唯一の最小点は $\widehat w_S=\bar y/(1+\lambda)$ である。ラベル $y_i$ を $y_i'$ に置き換えると

$$
|\widehat w_S-\widehat w_T|
=\frac{|y_i-y_i'|}{n(1+\lambda)}
\le\frac{2Y}{n(1+\lambda)}.
$$

ここでは一般定理の粗い $\lambda^{-1}$ 依存より鋭い評価が、問題の構造を直接解くことで得られる。安定性界は必ずしも最良定数ではない。

## 6. 汎化ギャップが小さくても超過リスクとは限らない

同じ一次元模型で $X=1$、ラベル $Y_{\mathrm{label}}\in\{-1,1\}$ が独立に等確率で発生するとする。最良の定数予測は $w^\star=0$ で、母集団二乗リスクは $R_q(w)=1+w^2$ である。一方、観測したラベル平均を $\bar Y$ とし、$c=(1+\lambda)^{-1}$ と置くとridge出力は $c\bar Y$ となる。

<a id="prop-slt1-17-one-dimensional-gap"></a>

<!-- formal-statement-start -->
> **命題（一次元ridgeの期待汎化ギャップと超過リスク）**
> $n\ge1$、$\lambda>0$、$X_i\equiv1$、$Y_i$ は独立な公平符号（$\Pr(Y_i=\pm1)=1/2$）とし、二乗損失 $q(w,(1,y))=(w-y)^2$ とする。$\widehat w=\bar Y/(1+\lambda)$ について

$$
\mathbb E[R_q(\widehat w)-\widehat R_{q,S}(\widehat w)]
=\frac{2}{n(1+\lambda)},
$$

> だが、最良の定数予測 $w^\star=0$ に対する期待超過リスクは

$$
\mathbb E[R_q(\widehat w)-R_q(w^\star)]
=\frac{1}{n(1+\lambda)^2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

二乗式を展開すると、経験リスクと母集団リスクの差では訓練ラベルとの交差項だけが残る。$\bar Y$ の二乗の期待値は、独立な公平符号の交差項が消えるため $1/n$ である。

<!-- proof-start -->
### 証明

$R_q(w)=\mathbb E(w-Y)^2=w^2-2w\mathbb EY+\mathbb EY^2=w^2+1$ である。標本上では

$$
\widehat R_{q,S}(w)
=w^2-2w\bar Y+\frac1n\sum_iY_i^2
=w^2-2w\bar Y+1.
$$

$w=\widehat w=c\bar Y$ を代入して差を取ると

$$
R_q(\widehat w)-\widehat R_{q,S}(\widehat w)
=2c\bar Y^2.
$$

独立性と $\mathbb EY_i=0,\mathbb EY_i^2=1$ から

$$
\mathbb E\bar Y^2
=\frac1{n^2}\sum_{i,j}\mathbb E(Y_iY_j)
=\frac1{n^2}\sum_i1=\frac1n.
$$

従って期待ギャップは $2c/n$。また $R_q(w^\star)=1$、$R_q(\widehat w)-1=c^2\bar Y^2$ だから期待超過リスクは $c^2/n$ である。両者は同じ確率量ではない。
<!-- proof-end -->

この例では $\lambda$ を大きくすると期待超過リスクは小さくなるが、真の最良予測が0だからである。最適予測が0以外の分布では、大き過ぎる $\lambda$ は縮小による偏りを増やす。[ridgeの偏り・分散の分解](../../ML/ML1-05/index.md#thm-ml1-05-bias-variance)と合わせ、安定性だけで予測性能を結論しない。

## 7. 三つの評価をどう選ぶか

| 方法 | 対象・損失 | 主な代価 | 保証の確率様式 |
|---|---|---|---|
| 有限辞書＋ERM | 標本前固定の $M$ 候補、$[0,1]$ 損失 | $\sqrt{\log M/n}$ | 全候補同時の高確率偏差とERM超過リスク |
| アフィン分類器のVC | 入力 $\mathbb R^d$、0–1分類損失 | おおむね $\sqrt{(d+1)\log n/n}$ | 全分類器同時の高確率偏差 |
| ノルム制約付き線形回帰のRademacher | $\|w\|\le B$、$\|x\|\le R$、有界ラベル、正規化二乗損失 | $BR/(K\sqrt n)$ と集中項 | 全係数同時の高確率偏差とERM超過リスク |
| ridgeの一様安定性 | $\lambda>0$、有界入力・ラベル、二乗損失 | $4R^2(Y+RY/\sqrt\lambda)^2/(\lambda n)$ | **その算法の**期待汎化ギャップ |

先頭二行は0–1損失の分類、残り二行は二乗損失の回帰であり、数値をそのまま順位付けする表ではない。さらにRademacherの行は正規化損失、ridgeの行は元の二乗損失である。ridgeも固定ノルム球 $B_\lambda$ の中にあるため、両方の道具を同じ算法に適用できるが、得られる**命題が異なる**。

仮定を外すとどこで壊れるかも分けよう。

- **非有界ラベル**：$F_S(0)\le Y^2$ がなくなりridge解の標本非依存ノルム半径を作れない。二乗損失も $[0,1]$ に規格化できず、有界差分・有界損失の証明が止まる。例えばCauchyラベルでは母集団二乗リスク自体が無限になり得る。
- **$\lambda=0$**：ridgeの二次成長係数が0となり、安定性の距離評価で割れない。設計に核があれば最小二乗解が一意とも限らない。
- **0–1損失をLipschitzとして扱う**：予測値を閾値化する写像は閾値で不連続なので、二乗損失に使ったLipschitz係数 $2/K$ を分類誤差へ移せない。分類ではmargin損失を使うなど別の操作が必要である。
- **標本依存の辞書やノルム半径**：固定候補への合併評価や固定関数クラスのsymmetrizationの適用先が変わる。独立検証標本などで選択を分離するか、選択全体を覆う評価が必要になる。
- **独立同分布でない標本**：有限辞書でのHoeffding、Rademacher対称化でのghost標本、安定性から期待汎化へ移る交換等式のそれぞれに独立性が使われた。点を複製して標本長だけ増やしても保証は強くならない。

## 演習

**問題 SLT1-17-A01（有限辞書の偏差半径）**
- Level: A

候補数 $M=32$、$n=200$、$\delta=0.05$、全候補の損失が $[0,1]$ で標本前固定とする。$t_M$ と厳密ERMのクラス内超過リスク上界 $2t_M$ を求め、どの確率事象上で成立するか述べよ。

<!-- solution-start -->
**詳細解答**。[有限辞書の一様偏差界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)へ $M=32$ を代入すると

$$
t_M=\sqrt{\frac{\log(2\cdot32/0.05)}{2\cdot200}}
=\sqrt{\frac{\log1280}{400}}
\approx0.1337.
$$

従って $2t_M\approx0.2675$ である。標本の確率 $0.95$ 以上で **全32候補について同時に** 経験リスクと真のリスクの差の絶対値が $t_M$ 以下になる。その事象の上で、経験最小化子と母集団最小化子にそれぞれ偏差界を適用するため、超過リスクは $2t_M$ 以下である。ERMが標本後に選ばれた点を忘れず、固定した一候補だけの確率事象とは言わない。
<!-- solution-end -->

**問題 SLT1-17-A02（一次元アフィン分類）**
- Level: A

$d=1$、点 $x_0=0,x_1=1$ に割り当てる4通りの二値ラベルを実現する $(w,b)$ を全て一例ずつ与えよ。さらに $x=0,1,2$ に対するラベル $(1,0,1)$ が実現不能であることを示せ。

<!-- solution-start -->
**詳細解答**。ラベル $(y_0,y_1)$ に対し $s_j=2y_j-1$ と置き、[本章のVC次元定理](#thm-slt1-17-affine-vc)の下界構成 $b=s_0,w=s_1-s_0$ を使う。具体的には $(0,0)$ なら $(w,b)=(0,-1)$、$(0,1)$ なら $(2,-1)$、$(1,0)$ なら $(-2,1)$、$(1,1)$ なら $(0,1)$。いずれも $b=s_0,w+b=s_1$ なので条件を直接確かめられる。

三点のラベル $(1,0,1)$ を実現するには $b\ge0$、$w+b<0$、$2w+b\ge0$ が必要になる。しかし後二式から $w<-b$、$w\ge-b/2$ を得るので、$b\ge0$ の下では $\,-b/2\le w<-b$ を満たせない。よって実現不能である。
<!-- solution-end -->

**問題 SLT1-17-A03（有限標本の経験Rademacher計算）**
- Level: A

$d=B=1$、$n=4$、入力が全て $x_i=1$ である。線形クラスの経験Rademacher複雑度を符号の16通りから厳密に計算し、$BR/\sqrt n$（$R=1$）と比較せよ。

<!-- solution-start -->
**詳細解答**。[線形クラスの正確な式](../SLT1-11/index.md#prop-slt1-11-linear-rademacher)は

$$
\widehat{\mathfrak R}_S(\mathcal H_1)
=\frac14\mathbb E_\sigma|\sigma_1+\sigma_2+\sigma_3+\sigma_4|.
$$

和の値は $-4,-2,0,2,4$、それぞれの個数は $1,4,6,4,1$ である。従って

$$
\mathbb E|\textstyle\sum_i\sigma_i|
=\frac{4+4\cdot2+6\cdot0+4\cdot2+4}{16}
=\frac{24}{16}=\frac32.
$$

よって複雑度は $3/8=0.375$。一方、一般評価は $BR/\sqrt n=1/2=0.5$ なので $3/8\le1/2$ を確認できる。一般評価は符号和の絶対値の期待へCauchy–Schwarzを使うため、常に等号とはならない。
<!-- solution-end -->

**問題 SLT1-17-A04（二乗損失のLipschitz定数）**
- Level: A

$B=2,R=1,Y=1$ とし、線形予測の正規化二乗損失について $K$、全実数上で切り詰めた損失のLipschitz定数、経験Rademacher複雑度の上界を $n$ で表せ。

<!-- solution-start -->
**詳細解答**。[正規化二乗損失](#def-slt1-17-bounded-square)で $K=BR+Y=3$ である。$c(t)\in[-2,2]$、$y\in[-1,1]$ なので $|c(t)-y|\le3$。二乗差は

$$
|\phi_y(t)-\phi_y(s)|
\le\frac{|c(t)-c(s)|\cdot6}{9}
\le\frac23|t-s|.
$$

ゆえに $L=2/3$ と取れる。[符号平均の合成不等式](../SLT1-11/index.md#thm-slt1-11-contraction)と[線形クラスの評価](../SLT1-11/index.md#prop-slt1-11-linear-rademacher)から

$$
\widehat{\mathfrak R}_S(\mathcal F)
\le L\frac{BR}{\sqrt n}
=\frac23\frac2{\sqrt n}
=\frac4{3\sqrt n}.
$$

ここで制御するのは二乗損失を**9で割った**関数クラスである。元の二乗損失と混同しない。
<!-- solution-end -->

**問題 SLT1-17-A05（一次元ridgeの一点置換）**
- Level: A

$x_i=1$、$n=3$、$(y_1,y_2,y_3)=(1,0,-1)$、$\lambda=1$ とする。ridgeの解を求め、最後のラベルを $-1$ から1へ置換した後の解と差を計算せよ。

<!-- solution-start -->
**詳細解答**。二乗目的の微分は $F_S'(w)=2(1+\lambda)w-2\bar y$ であり、二階微分 $2(1+\lambda)>0$ より唯一の最小点は $\bar y/(1+\lambda)$ である。元の平均は $(1+0-1)/3=0$ だから $\widehat w_S=0$。置換後の平均は $(1+0+1)/3=2/3$、従って

$$
\widehat w_T=\frac{2/3}{2}=\frac13,\qquad
|\widehat w_T-\widehat w_S|=\frac13.
$$

一点置換式 $|y_3-y_3'|/[n(1+\lambda)]=2/(3\cdot2)=1/3$ と一致する。全データを取り直すのでなく、分子に現れるのは置換された一点のラベル差だけである。
<!-- solution-end -->

**問題 SLT1-17-B01（アフィン分類不能の別証明）**
- Level: B

$d=2$ の正方形の頂点を $a=(0,0)$、$b=(1,0)$、$c=(0,1)$、$d'=(1,1)$ とする。$a,d'$ をラベル1、$b,c$ をラベル0に指定したとき、任意のアフィン式 $g(x)=w\cdot x+t$ で分離できないことを、係数の連立式と中点の二通りで確かめよ。

<!-- solution-start -->
**詳細解答**。境界を1側へ含めるので、分離できるなら $g(a)=t\ge0$、$g(d')=w_1+w_2+t\ge0$、$g(b)=w_1+t<0$、$g(c)=w_2+t<0$ が必要である。後二式を加えると

$$
w_1+w_2+2t<0.
$$

一方、最初と2番目の条件を足すと $w_1+w_2+2t\ge0$ となり矛盾する。

中点では $(a+d')/2=(b+c)/2=(1/2,1/2)$ である。アフィン性から $g((a+d')/2)=(g(a)+g(d'))/2\ge0$ だが、同じ点を $(b+c)/2$ と書けば $(g(b)+g(c))/2<0$ となる。これは[VC次元定理](#thm-slt1-17-affine-vc)の上界で使った従属関係 $a+d'-b-c=0$ の具体形である。
<!-- solution-end -->

**問題 SLT1-17-B02（ridgeの安定性係数を再構成する）**
- Level: B

入力ノルム・ラベル絶対値が高々1、$\lambda=1$ の $d$ 次元ridgeを考える。標本数 $n$ に対してノルム球の半径、二乗損失の値域とLipschitz定数、元の二乗損失の安定性係数、および正規化した二乗損失の期待汎化ギャップ上界を順に導け。

<!-- solution-start -->
**詳細解答**。$F_S(\widehat w)\le F_S(0)\le1$ なので $\|\widehat w\|^2\le1$、半径は $B_\lambda=1$ である。全ての $w$ がこの球内なら $|w\cdot x|\le1$、$|y|\le1$ から $|w\cdot x-y|\le2$、ゆえに $0\le q\le4$。

二乗差を因数分解し、$w,v$ を球内、$z=(x,y)$ を台内に取ると

$$
|q(w,z)-q(v,z)|
\le|x\cdot(w-v)|\,(|w\cdot x-y|+|v\cdot x-y|)
\le4\|w-v\|.
$$

従って $L_\lambda=4$。[有界ridgeの一様安定性と期待汎化](#thm-slt1-17-ridge-stability)の二次成長係数を使えば、隣接標本の解の距離は $L_\lambda/(\lambda n)=4/n$ 以下であり、試験点での損失差は $L_\lambda(4/n)=16/n$ 以下となる。二乗損失は4で割ると $[0,1]$ なので、正規化した期待汎化ギャップの絶対値は $16/(4n)=4/n$ 以下である。元の損失の $16/n$ と単位が異なる。
<!-- solution-end -->

**問題 SLT1-17-B03（有限辞書とVC界の使い分け）**
- Level: B

$\mathbb R^2$ のアフィン二値分類器を考える。まず標本抽選前に8候補だけを選んだ場合、$n=200,\delta=0.05$ の一様偏差半径を計算せよ。次に全アフィン分類器を使う場合のVC次元と、$1\le d_{\mathrm{VC}}\le2n$ の公式による半径を示せ。なぜ前者の半径で全アフィン分類器を保証できないか説明せよ。

<!-- solution-start -->
**詳細解答**。有限辞書は $M=8$ なので

$$
t_8=\sqrt{\frac{\log(2\cdot8/0.05)}{400}}
=\sqrt{\frac{\log320}{400}}\approx0.1201.
$$

全アフィン分類器は[VC次元定理](#thm-slt1-17-affine-vc)から $d_{\mathrm{VC}}=2+1=3$ である。$3\le400$ なので[VC高確率界](../SLT1-07/index.md#cor-slt1-07-vc-high-prob)に代入し、

$$
\begin{aligned}
B_{200,3,0.05}
&\le\sqrt{\frac8{200}\left[
3\log\frac{2e\cdot200}{3}+\log80\right]}\\
&\approx0.9394.
\end{aligned}
$$

後者は上限1を超えないがかなり粗い。前者は8候補についてだけの同時事象で、選んでいないアフィン分類器を含まない。前者の方が小さいからといって、全アフィン分類器の任意のERMを保証するものではない。二つの評価は対象クラスが異なる。
<!-- solution-end -->

**問題 SLT1-17-B04（期待ギャップと超過リスクの分離）**
- Level: B

公平符号ラベル $Y_i\in\{-1,1\}$、全入力 $X_i=1$、$\lambda=2$ とする。一次元ridgeの期待汎化ギャップと、最良定数予測 $w^\star=0$ に対する期待超過リスクを $n$ の式で求めよ。$\bar Y^2$ の期待値を自分で再計算せよ。

<!-- solution-start -->
**詳細解答**。一次元ridgeでは $c=1/(1+\lambda)=1/3$、$\widehat w=\bar Y/3$。独立性により $\mathbb E(Y_iY_j)=0$（$i\ne j$）、$\mathbb EY_i^2=1$ なので

$$
\mathbb E\bar Y^2
=\frac1{n^2}\left(\sum_i1+\sum_{i\ne j}0\right)=\frac1n.
$$

経験リスクは $\widehat w^2-2\widehat w\bar Y+1$、母集団リスクは $\widehat w^2+1$ だから差は $2\widehat w\bar Y=(2/3)\bar Y^2$。従って期待ギャップは $2/(3n)$。最良定数予測のリスクは1なので、超過リスクは $\widehat w^2=\bar Y^2/9$、その期待値は $1/(9n)$。同じ学習器でも違う統計量を保証している。
<!-- solution-end -->

**問題 SLT1-17-C01（三つの保証を同じ設定で判定する）**
- Level: C

$n=100,\delta=0.1$ とする。分類問題では入力 $X\in[-1,1]$、出力 $Y\in\{0,1\}$、0–1損失を用いる。回帰問題では $X\in[-1,1]$、$Y\in[-1,1]$、二乗損失を用いる。いずれも独立同分布標本とし、以下は標本抽選前に固定されたものとする。

1. 分類の有限辞書が $M=16$ 個なら、ERMのクラス内超過リスクの高確率上界を求めよ。
2. 分類の全アフィン半空間（一次元閾値と定数を含む）なら、VC次元と前節の多項式版半径を求めよ。
3. 回帰の線形クラス $\|w\|\le B=1$、$R=Y_{\max}=1$ で、正規化二乗損失のERMの一様偏差界とクラス内超過リスク界を求めよ。
4. 同じ回帰データで $\lambda=1$ のridgeを用いた場合、元の二乗損失と正規化二乗損失の期待汎化ギャップ上界を求めよ。前三項と確率的意味を比較し、ラベルが無制限のとき壊れる部分を述べよ。

<!-- solution-start -->
**詳細解答**。いずれも $0<\delta<1$、$n\ge1$ である。分類の損失は $[0,1]$、回帰は入力・ラベルを有界とし、各候補集合は標本前に固定している。モデルごとに適用条件を検査する。

1. [有限辞書の一様偏差界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)から

$$
t_{16}=\sqrt{\frac{\log(2\cdot16/0.1)}{200}}
=\sqrt{\frac{\log320}{200}}\approx0.1698.
$$

   [ERM比較](../SLT1-04/index.md#cor-slt1-04-finite-erm)でクラス内超過リスクは確率0.9以上で $2t_{16}\approx0.3396$ 以下である。

2. $d=1$ なので[VC次元定理](#thm-slt1-17-affine-vc)から $d_{\mathrm{VC}}=2$。$2\le2n=200$ だから多項式版へ代入でき、

$$
B_{100,2,0.1}
\le\sqrt{\frac8{100}\left[
2\log\frac{2e\cdot100}{2}+\log40\right]}
\approx1.092.
$$

   0–1損失の絶対偏差は常に1以下なので、この数値界はこの $n$ では実質的に自明である。全分類器に対して有効だが、有限辞書の半径と同程度の鋭さを保証するものではない。

3. 回帰の $K=BR+Y_{\max}=2$、正規化した損失は $(wx-y)^2/4\in[0,1]$。[線形回帰の定理](#thm-slt1-17-linear-square-generalization)へ $B=R=1$ を入れると

$$
D_{100,0.1}
\le\frac4{2\sqrt{100}}
+\sqrt{\frac{\log20}{200}}
\approx0.2+0.1224=0.3224.
$$

   確率0.9以上で全 $|w|\le1$ の正規化損失の絶対偏差が同時に $D$ 以下であり、ERMのクラス内超過リスクは $2D\approx0.6448$ 以下となる。元の二乗損失の偏差に直すなら $K^2=4$ を掛ける。

4. ridgeでは $B_\lambda=Y_{\max}/\sqrt\lambda=1$、$K_\lambda=1+1=2$。[有界ridgeの一様安定性と期待汎化](#thm-slt1-17-ridge-stability)から元の二乗損失の安定性係数は

$$
\beta_{100}=\frac{4\cdot1^2\cdot2^2}{1\cdot100}
=0.16.
$$

   元の損失の期待汎化ギャップの絶対値は0.16以下、4で割った正規化損失では0.04以下である。これは**期待値**であり、確率0.9のERM超過リスクを0.04で抑える式ではない。第3項の一様偏差界はridge出力にも適用できるが、異なる命題である。

   ラベルが無制限になると、回帰の $K$ を固定できないため第3項の $[0,1]$ 値仮定とLipschitz定数評価が使えない。第4項でも $F_S(0)\le Y_{\max}^2$ による標本一様ノルム球が作れず、その後のLipschitz条件・一様安定性の証明が途切れる。分類の第1、2項はラベルが $\{0,1\}$ の設定なのでこの変更をそのまま持ち込んだ別問題にはならない。
<!-- solution-end -->

## まとめ

有限辞書なら「**何候補を標本前に固定したか**」、アフィン分類なら「**何点をshatterできるか**」、ノルム制約付き回帰なら「**損失への合成で複雑度がいくら増えるか**」、ridgeなら「**一点置換で出力損失がどれほど変わるか**」が中心となる。次章では、これらの保証が使える条件をさらに外し、壊れる論理段階を対照する。
