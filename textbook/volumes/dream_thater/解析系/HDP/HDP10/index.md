# HDP10 被覆数からchainingへの入口と応用総合

[HDP6の有限net](../HDP6/index.md#def-hdp6-net)は、球面上の無数の方向を有限個の代表点に置き換える道具でした。固定点の偏差確率を足し合わせれば、有限個の候補の最大偏差を制御できます。しかし候補数が $2^m$ 個あると、各候補に同じ粗い上界を使う方法では $\sqrt m$ が現れます。候補同士が極めて近いなら、それは本当に必要な損失でしょうか。

例えば多数の関数がほとんど同じ値を返すとき、それらの誤差は強く連動します。**候補の個数だけでなく、互いの距離ごとに何個の代表点が必要か**を使いたいのです。粗い代表点から細かい代表点へ少しずつ近づく方法を chaining（連鎖法）と呼びます。本章では有限距離空間上で核心を証明し、被覆数の和・積分による上界を導きます。無限集合に対する極限操作を前提なしに行わず、その先に必要な条件も分けて述べます。

## 1. 単一スケールの和集合評価は何を捨てるか

有限個の中心化確率変数 $Z_1,\ldots,Z_M$ が、それぞれすべての実数 $\lambda$ で $Ee^{\lambda Z_i}\le e^{\lambda^2\sigma^2/2}$ を満たすとします。[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)で $\lambda=x/\sigma^2$ を選べば

$$
P(Z_i\ge x)
\le e^{-\lambda x+\lambda^2\sigma^2/2}
=e^{-x^2/(2\sigma^2)}.
$$

$-Z_i$ でも同じなので、和集合の確率を足すと

$$
P\left(\max_{1\le i\le M}|Z_i|\ge x\right)
\le 2M e^{-x^2/(2\sigma^2)}.
$$

従って $0<\delta<1$ のとき、確率 $1-\delta$ 以上で最大偏差は $\sigma\sqrt{2\log(2M/\delta)}$ 以下です。この評価に変数同士の独立性は要りません。しかし $Z_i-Z_k$ がほとんど零であっても、各変数の誤差を別々に数えてしまいます。

必要なのは、**差の確率的な大きさ**を表す距離です。ここから先の定理は有限個の添字を持つ過程を扱い、各 $X_t$ が相互に独立であることは要求しません。

## 2. 距離に沿う増分と一般の被覆数

集合 $T$ は空でない有限集合とし、$d$ は $T$ 上の距離とします。$X_t$ は同じ確率空間上の実数値確率変数で、全ての $t$ について $EX_t=0$ とします。二つの点が近いとき差 $X_t-X_s$ も小さく揺らぐという条件を指数モーメントで定量化します。

<a id="def-hdp10-subgaussian-increments"></a>

<!-- formal-statement-start -->
> **定義（距離に従うsub-Gaussian増分）**  
> 空でない有限距離空間 $(T,d)$ 上の実数値確率変数族 $(X_t)_{t\in T}$ が、全ての $t$ について $EX_t=0$ を満たし、任意の $s,t\in T$ と $\lambda\in\mathbb R$ に対して次を満たすとき、$d$ に従うsub-Gaussian増分を持つという。

$$
E\exp\{\lambda(X_t-X_s)\}
\le\exp\{\lambda^2d(s,t)^2/2\}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp10-subgaussian-increments -->
**定義の直接例**。$G=(G_1,\ldots,G_m)$ の座標を独立な標準正規変数とし、$T$ を $\mathbb R^m$ の任意の有限部分集合とします。$X_t=\langle G,t\rangle$ と $d(s,t)=\|t-s\|_2$ に取ります。$E X_t=0$ です。差は平均零・分散 $\sum_i(t_i-s_i)^2$ の正規変数だから

$$
Ee^{\lambda(X_t-X_s)}
=\prod_{i=1}^m Ee^{\lambda(t_i-s_i)G_i}
=\exp\left(\frac{\lambda^2}{2}\sum_{i=1}^m(t_i-s_i)^2\right).
$$

よってすべての $\lambda$ で条件が等号で成り立ちます。$X_s,X_t$ は一般に独立ではありません。例えば $t=2s$ では $X_t=2X_s$ です。
<!-- definition-example-end -->

球面に限らず距離 $d$ で点を覆うために、半径を変えた最小の代表点数を測ります。

<a id="def-hdp10-covering-number"></a>

<!-- formal-statement-start -->
> **定義（有限距離空間の被覆数）**  
> 有限距離空間 $(T,d)$ と $\varepsilon\ge0$ に対し、被覆数 $N(T,d,\varepsilon)$ は、各 $t\in T$ から距離 $\varepsilon$ 以下に少なくとも一つの点があるような部分集合 $S\subset T$ の要素数の最小値である。

$$
N(T,d,\varepsilon)
=\min\left\{|S|:S\subset T,\ 
\forall t\in T\ \exists s\in S,\ d(t,s)\le\varepsilon\right\}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp10-covering-number -->
**定義の直接例**。$T=\{0,1,2\}$、$d(s,t)=|s-t|$ とします。$0\le\varepsilon<1$ なら異なる点を代表にできないので $N=3$ です。$1\le\varepsilon<2$ では中央の $\{1\}$ だけで三点を覆い $N=1$、$\varepsilon\ge2$ でも $N=1$ です。被覆中心を $T$ 内に限定している点に注意します。[HDP6の球面の被覆数](../HDP6/index.md#def-hdp6-covering-number)と同じ考え方を一般の有限距離空間に移したものです。
<!-- definition-example-end -->

有限性によって最小値を実現する $S$ は存在します。半径を小さくすれば被覆の条件は厳しくなるので、$\varepsilon'\le\varepsilon$ なら $N(T,d,\varepsilon')\ge N(T,d,\varepsilon)$ です。

<a id="lem-hdp10-increment-tail"></a>

<!-- formal-statement-start -->
> **補題（増分の両側尾部）**  
> $(T,d)$ は有限距離空間で、$(X_t)$ は[距離に従うsub-Gaussian増分](#def-hdp10-subgaussian-increments)を持つとする。$s,t\in T$ と $v\ge0$ に対し、$d(s,t)>0$ なら

$$
P\left(|X_t-X_s|\ge d(s,t)\sqrt{2v}\right)\le2e^{-v}.
$$

> $s=t$ のとき差は恒等的に零である。
<!-- formal-statement-end -->

### 証明の見取り図

増分 $Y=X_t-X_s$ を一つの確率変数として[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)に入力し、距離の二乗を分散代理量として最適化します。

<!-- proof-start -->
### 証明

$r=d(s,t)>0$、$a=r\sqrt{2v}$ とします。$v>0$ なら $\lambda=a/r^2>0$ を選び、

$$
P(Y\ge a)\le e^{-\lambda a}Ee^{\lambda Y}
\le\exp\left(-\frac{a^2}{r^2}+\frac{a^2}{2r^2}\right)
=e^{-v}.
$$

定義の条件は $\lambda$ が負の場合にも成り立つので、$-Y$ に同じ計算をすると $P(Y\le-a)\le e^{-v}$ です。両事象の和で結論を得ます。$v=0$ では右辺が $2$ なので確率 $1$ 以下という自明な評価で成立します。$s=t$ では $Y=0$ です。
<!-- proof-end -->

## 3. 粗い点から細かい点へ：有限chaining

最大距離を $D=\max_{s,t\in T}d(s,t)$ とします。$|T|\ge2$ なら $D>0$ です。一つの代表点 $t_0$ から始め、半径 $D/2,D/4,\ldots$ で最小被覆を取ります。ある $t$ の代理を各段階で $\pi_j(t)$ と書くと、$X_t-X_{t_0}$ は隣り合う代理の差の和に分けられます。この「隣り合う差」が距離とともに小さくなることが単一スケール法との決定的な違いです。

<a id="thm-hdp10-finite-chaining"></a>

<!-- formal-statement-start -->
> **定理（有限過程の多段階chaining評価）**  
> $|T|\ge2$ の有限距離空間 $(T,d)$ 上で、中心化過程 $(X_t)$ が $d$ に従うsub-Gaussian増分を持つとする。$D=\max_{s,t}d(s,t)>0$、$\varepsilon_j=D2^{-j}$、$N_j=N(T,d,\varepsilon_j)$（$j\ge1$）、$N_0=1$ とする。$\varepsilon_J$ が異なる二点間の最小距離より真に小さくなる整数 $J\ge1$ を選ぶ。任意の $u>0$ に対し、確率 $1-e^{-u}$ 以上で

$$
\sup_{t\in T}|X_t-X_{t_0}|
\le3D\sum_{j=1}^{J}2^{-j}
\sqrt{2\left\{\log(2N_jN_{j-1})+u+j\log2\right\}}
$$

> が成り立つ。ここで $t_0\in T$ は任意の固定点である。
<!-- formal-statement-end -->

### 証明の見取り図

各スケールに代表集合を用意します。望む確率をレベル $j$ ごとに $e^{-u}2^{-j}$ だけ配分して、代表間の**全ての可能な差**を同時に制御します。その後、各 $t$ に対応する代理点の差を望遠鏡和にします。全点に最初から同じ尾部評価をかけるわけではありません。

<!-- proof-start -->
### 証明

$T_0=\{t_0\}$ とし、$j=1,\ldots,J$ について $|T_j|=N_j$ の $\varepsilon_j$-被覆を取ります。$T$ は有限で、異なる二点間の最小距離を $r_*>0$ とできます。$\varepsilon_J<r_*$ なら、$T$ 内の点を中心とする半径 $\varepsilon_J$ の球は他の点を含みません。従って $T_J=T$ です。

各 $t\in T$ に対して $d(t,\pi_j(t))\le\varepsilon_j$ となる $\pi_j(t)\in T_j$ を一つ選び、$\pi_0(t)=t_0$、$\pi_J(t)=t$ とします。$j=1$ では $d(t,t_0)\le D=\varepsilon_0$ と置きます。三角不等式により

$$
d(\pi_j(t),\pi_{j-1}(t))
\le d(\pi_j(t),t)+d(t,\pi_{j-1}(t))
\le\varepsilon_j+\varepsilon_{j-1}
=3D2^{-j}.
$$

$j$ を固定し、$T_j\times T_{j-1}$ に属する点の組 $(a,b)$ をすべて考えます。距離が正の組には[増分の両側尾部](#lem-hdp10-increment-tail)を

$$
v_j=\log(2N_jN_{j-1})+u+j\log2
$$

で適用します。組一つが次の評価に失敗する確率は $2e^{-v_j}=e^{-u}2^{-j}/(N_jN_{j-1})$ 以下です。距離零の組には差がないため失敗は起きません。組の総数は高々 $N_jN_{j-1}$ なので、和集合の確率は

$$
P(\text{レベル }j\text{ に失敗がある})
\le N_jN_{j-1}\frac{e^{-u}2^{-j}}{N_jN_{j-1}}
=e^{-u}2^{-j}
$$

です。さらにレベル $1,\ldots,J$ で失敗する確率は $\sum_{j=1}^Je^{-u}2^{-j}<e^{-u}$ です。従って確率 $1-e^{-u}$ 以上で、全レベルの全組に対して同時に

$$
|X_a-X_b|
\le d(a,b)\sqrt{2v_j}
$$

が成り立ちます。この事象上で任意の $t$ の望遠鏡和は

$$
X_t-X_{t_0}
=\sum_{j=1}^J
\{X_{\pi_j(t)}-X_{\pi_{j-1}(t)}\}.
$$

各差を絶対値で評価し、先の $3D2^{-j}$ の距離上界を代入します。右辺は $t$ に依存しないため、最後に全 $t$ の上限を取れば定理の式となります。
<!-- proof-end -->

**なぜ独立性が不要なのか**。証明で使った確率の足し算は和事象の上界であり、異なる代表点間の増分を確率的に独立とみなしていません。必要なのは[定義の全組に対する増分評価](#def-hdp10-subgaussian-increments)だけです。

## 4. 被覆数の積分で複雑度を測る

定理の式は代表点数 $N_j$ を各段階で参照します。$\varepsilon_j$ が小さいほど $N_j$ は増えますが、同時に係数 $2^{-j}$ は小さくなります。これにより「細かい違いが多数ある」ことへの過剰な罰則が抑えられます。

<a id="cor-hdp10-entropy-integral"></a>

<!-- formal-statement-start -->
> **系（有限距離空間のエントロピー積分上界）**  
> [有限chaining定理](#thm-hdp10-finite-chaining)の仮定の下で、$\mathcal H$ を次の有限積分とする。

$$
\mathcal H(T,d)=\int_0^D
\sqrt{\log N(T,d,\varepsilon)}\,d\varepsilon.
$$

> このとき任意の $u>0$ に対し、確率 $1-e^{-u}$ 以上で

$$
\sup_{t\in T}|X_t-X_{t_0}|
\le12\mathcal H(T,d)+3D\sqrt{2u}
+9D\sqrt{2\log2}.
$$

> $|T|=1$ では左辺と $\mathcal H$ はともに零である。
<!-- formal-statement-end -->

### 証明の見取り図

前の定理で $\log N_{j-1}\le\log N_j$ と平方根の劣加法性を使い、$j$ に依存する確率配分の寄与を幾何級数で合計します。被覆数の単調性によって離散和を積分と比較します。

<!-- proof-start -->
### 証明

$N_0=1$ であり、$j\ge2$ では被覆数の単調性から $N_{j-1}\le N_j$ です。従って全 $j$ で

$$
\log(2N_jN_{j-1})+u+j\log2
\le2\log N_j+u+(j+1)\log2.
$$

非負数の平方根について $\sqrt{a+b+c}\le\sqrt a+\sqrt b+\sqrt c$ を使うと、[有限chaining定理](#thm-hdp10-finite-chaining)の右辺は

$$
6D\sum_{j=1}^J2^{-j}\sqrt{\log N_j}
+3D\sqrt{2u}\sum_{j=1}^J2^{-j}
+3D\sqrt{2\log2}\sum_{j=1}^J2^{-j}\sqrt{j+1}
$$

以下です。$\sqrt{j+1}\le j+1$ と

$$
\sum_{j=1}^{\infty}2^{-j}=1,\qquad
\sum_{j=1}^{\infty}j2^{-j}=2
$$

から、後ろ二項はそれぞれ $3D\sqrt{2u}$ と $9D\sqrt{2\log2}$ 以下です。

$\varepsilon\in[\varepsilon_{j+1},\varepsilon_j]$ なら $\varepsilon\le\varepsilon_j$ なので $N(T,d,\varepsilon)\ge N_j$ です。その区間の長さは $\varepsilon_j/2$ であり、

$$
\int_{\varepsilon_{j+1}}^{\varepsilon_j}
\sqrt{\log N(T,d,\varepsilon)}\,d\varepsilon
\ge\frac{\varepsilon_j}{2}\sqrt{\log N_j}.
$$

区間は互いに内部が重ならないため、$D2^{-j}=\varepsilon_j$ を代入して合計すると

$$
D\sum_{j=1}^J2^{-j}\sqrt{\log N_j}
\le2\int_0^D\sqrt{\log N(T,d,\varepsilon)}\,d\varepsilon
=2\mathcal H(T,d).
$$

最初の項は $12\mathcal H$ 以下となります。有限集合では $N(T,d,\varepsilon)\le|T|$ なので積分も有限です。
<!-- proof-end -->

この上界は**有限添字集合に対するDudley型評価**です。一般の無限集合へ同じ式を移すときは、可算な代表点列から各点の値を近似できるか、標本路の近似可能性、上限の可測性、無限和の収束といった追加の問題が生じます。有限集合の定理だけでそれらを証明したことにはなりません。また、この積分上界は使いやすい十分な評価ですが、全ての確率変数族で最適次数を与えるという主張でもありません。

## 5. 数が多くても近い点が多い例

$m\ge1$ とし、標準基底 $e_1,\ldots,e_m$ を使って次の $2^m$ 点を考えます。

$$
T_m=\left\{\sum_{i=1}^m s_i2^{-i}e_i:
s_i\in\{0,1\}\right\}\subset\mathbb R^m.
$$

$G_i$ が独立な標準正規なら $X_t=\langle G,t\rangle$ は[増分の直接例](#def-hdp10-subgaussian-increments)を満たします。原点 $t_0=0$ を基準にすると、単一スケールの和集合評価は $\max_t\|t\|_2=D$ と $|T_m|=2^m$ を使うため、$D\sqrt m$ 程度になります。

ところが、最初の $k$ 座標だけ残して残りを零にする代表点の集合は高々 $2^k$ 個です。元の点との距離は

$$
\left(\sum_{i=k+1}^m4^{-i}\right)^{1/2}
\le\left(\sum_{i=k+1}^{\infty}4^{-i}\right)^{1/2}
=\frac{2^{-k}}{\sqrt3}
$$

以下です。$D^2=\sum_{i=1}^m4^{-i}$ は $1/4$ 以上です。$k=j+1$ とすれば $2^{-(j+1)}/\sqrt3\le D2^{-j}$ なので

$$
N(T_m,\|\cdot\|_2,D2^{-j})\le2^{\min(j+1,m)}.
$$

従って[エントロピー積分の証明で現れた離散項](#cor-hdp10-entropy-integral)を直接評価すれば

$$
D\sum_{j\ge1}2^{-j}\sqrt{\log N_j}
\le D\sqrt{\log2}\sum_{j\ge1}2^{-j}\sqrt{j+1}
\le3D\sqrt{\log2}.
$$

この評価は $m$ に依存しません。実際、正規変数の正部分を $G_i^+=\max(G_i,0)$ とすると

$$
\sup_{t\in T_m}X_t=\sum_{i=1}^m2^{-i}G_i^+,\qquad
E G_i^+=\int_0^\infty x\frac{e^{-x^2/2}}{\sqrt{2\pi}}\,dx
=\frac1{\sqrt{2\pi}}.
$$

よって $E\sup_tX_t=\sum_i2^{-i}/\sqrt{2\pi}<1/\sqrt{2\pi}$ であり、候補数 $2^m$ に反して最大値は有界です。結論は点数が少ないからではなく、小さい座標ほど寄与が指数的に減るためです。

## 6. 応用：有限な関数族の標本平均

観測値 $Y_1,\ldots,Y_n$ は同じ分布 $P$ に従う独立な確率変数とします。有限な実数値可測関数族 $\mathcal F$ について $P_nf=n^{-1}\sum_{i=1}^n f(Y_i)$ と $Pf=Ef(Y_1)$ を比べます。$f$ が多いと、各 $f$ に対する集中を単純に足すのは損かもしれません。

ここでは関数族の中に零関数があり、各 $f$ は有界であるとします。$f$ と $g$ の差は高々 $\|f-g\|_\infty$ なので、近い関数ほど標本平均の差も近く揺らぐことを示せます。

<a id="cor-hdp10-empirical-finite-class"></a>

<!-- formal-statement-start -->
> **系（有限関数族の一様標本平均偏差）**  
> $Y_1,\ldots,Y_n$ は確率分布 $P$ に従う独立同分布の標本、$n\ge1$ とする。$\mathcal F$ は零関数を含む有限な相異なる実数値可測関数の集合で、各関数は有界であるとする。$\mathcal F$ に $d(f,g)=\|f-g\|_\infty/\sqrt n$ を入れ、$D=\max_{f,g\in\mathcal F}d(f,g)$ とする。$|\mathcal F|\ge2$ のとき、任意の $u>0$ に対し確率 $1-e^{-u}$ 以上で

$$
\sup_{f\in\mathcal F}|P_nf-Pf|
\le12\int_0^D\sqrt{\log N(\mathcal F,d,\varepsilon)}\,d\varepsilon
+3D\sqrt{2u}+9D\sqrt{2\log2}.
$$

> $|\mathcal F|=1$ なら、零関数だけなので左辺は零である。
<!-- formal-statement-end -->

### 証明の見取り図

標本平均の差を独立和として[Hoeffding補題](../HDP1/index.md#lem-hdp1-hoeffding)で評価します。関数間の最大差が増分の尺度となるため、[有限chainingのエントロピー上界](#cor-hdp10-entropy-integral)を零関数から適用できます。

<!-- proof-start -->
### 証明

$Z_f=P_nf-Pf$ とします。$h=f-g$、$a=\|h\|_\infty$ と置くと $|h(Y_i)|\le a$ で、$Eh(Y_i)=Ph$ です。$a=0$ なら $Z_f-Z_g=0$ です。$a>0$ では $h(Y_i)$ は区間 $[-a,a]$ に属し、[Hoeffding補題](../HDP1/index.md#lem-hdp1-hoeffding)をパラメータ $\lambda/n$ で適用して

$$
Ee^{(\lambda/n)\{h(Y_i)-Ph\}}
\le\exp\left(\frac{(\lambda/n)^2(2a)^2}{8}\right)
=\exp\left(\frac{\lambda^2a^2}{2n^2}\right)
$$

を得ます。標本の独立性により

$$
Ee^{\lambda(Z_f-Z_g)}
=\prod_{i=1}^nEe^{(\lambda/n)\{h(Y_i)-Ph\}}
\le\exp\left(\frac{\lambda^2a^2}{2n}\right)
=\exp\left(\frac{\lambda^2d(f,g)^2}{2}\right).
$$

$Z_f$ は中心化され、$d$ は相異なる関数の一様距離から得た距離です。零関数 $0$ では $Z_0=0$ です。従って $t_0=0$ として[エントロピー積分上界](#cor-hdp10-entropy-integral)を使えば、主張を得ます。
<!-- proof-end -->

**適用条件の境界**。標本が独立でないと指数モーメントを積へ分けられません。また $\|f-g\|_\infty$ でなく $L^2(P)$ 距離を勝手に代入することもできません。後者は分散を制御しても、一般には全実数のsub-Gaussian増分条件を保証しないからです。統計的学習理論では関数族の複雑度をより精密に扱いますが、そこではsymmetrizationなど追加の理論が必要です。

## 7. 各集中法を使い分ける

何を足し合わせるか、どの仮定で指数モーメントを作るかを見分けると、高次元確率の道具を混同せずに済みます。

| 問いたい対象 | 必要な確認 | 既習の主要結果 |
|---|---|---|
| 独立な有界スカラー和 | 各項の独立性・上下限 | [Hoeffding不等式](../HDP1/index.md#thm-hdp1-hoeffding) |
| 分散を反映する有界和 | 分散・片側上限・独立性 | [Bernstein不等式](../HDP2/index.md#thm-hdp2-bernstein) |
| 有限点集合の射影距離 | 固定差分の集中・点集合の固定性 | [Johnson–Lindenstrauss補題](../HDP6/index.md#thm-hdp6-jl) |
| 標本共分散の作用素ノルム | 全方向条件・等方性・net | [標本共分散評価](../HDP7/index.md#thm-hdp7-isotropic-covariance) |
| 独立な確定上界付き対称行列和 | 自己共役性・行列分散・ノルム | [行列Bernstein不等式](../HDP8/index.md#thm-hdp8-matrix-bernstein) |
| 独立なsub-Gaussian座標の二次形式 | 座標独立性・二つの行列ノルム | [Hanson–Wright不等式](../HDP9/index.md#thm-hdp9-hanson-wright) |
| 強く関連する多数の候補の最大偏差 | 全組の増分MGF・距離別の被覆数 | [有限chaining定理](#thm-hdp10-finite-chaining) |

例えば $n$ 本の観測ベクトルから標本共分散を推定するなら、対称行列の和として扱えるか、各射影の二乗に戻してnetを使うかを選びます。一方、$2^m$ 個の非常に近い候補があるなら、個数をそのまま代入する前に[エントロピー積分上界](#cor-hdp10-entropy-integral)の被覆数を調べる価値があります。

## 8. 演習：単一スケールから多段階へ

**Level A：定義と数値例を手で検算する**

### A1. 三点の被覆数

$T=\{0,1,2\}$ に通常の距離を入れる。$\varepsilon=0,1/2,1,2$ での被覆数と $D$ を計算せよ。

- Level: A
- ID: HDP10-A1

<!-- solution-start -->
**詳細解答**　$D=d(0,2)=2$ です。$\varepsilon=0$ では各点以外を覆えないので $N=3$。$\varepsilon=1/2$ でも異なる点の距離は $1$ 以上で $N=3$ です。$\varepsilon=1$ なら中心 $1$ から全点への距離は $1$ 以下なので $N=1$。$\varepsilon=2$ でも中心 $1$ が使えるので $N=1$ です。
<!-- solution-end -->

### A2. 正規過程の二点増分

独立な $G_1,G_2\sim N(0,1)$ と $s=(1,0)$、$t=(1,2)$ に対し $X_v=\langle G,v\rangle$ とする。$X_t-X_s$ の指数モーメント、距離 $d(s,t)$、$v=2$ の両側尾部上界を求めよ。

- Level: A
- ID: HDP10-A2

<!-- solution-start -->
**詳細解答**　$X_s=G_1$、$X_t=G_1+2G_2$ なので差は $2G_2$、距離は $\sqrt{(1-1)^2+(2-0)^2}=2$ です。したがって $Ee^{\lambda(X_t-X_s)}=Ee^{2\lambda G_2}=e^{2\lambda^2}=e^{\lambda^2d(s,t)^2/2}$。[増分の両側尾部](#lem-hdp10-increment-tail)で $v=2$ を代入すると $P(|2G_2|\ge2\sqrt4)=P(|G_2|\ge2)\le2e^{-2}$ です。
<!-- solution-end -->

### A3. 望遠鏡和の距離評価

$D=8$、$\varepsilon_j=8\,2^{-j}$、$j=1,2,3$ とする。$d(t,\pi_j(t))\le\varepsilon_j$、$\pi_0(t)=t_0$、$d(t,t_0)\le D$ のとき、各 $d(\pi_j(t),\pi_{j-1}(t))$ の上界とその総和を求めよ。

- Level: A
- ID: HDP10-A3

<!-- solution-start -->
**詳細解答**　距離の三角不等式 $d(a,c)\le d(a,b)+d(b,c)$ に $a=\pi_j(t)$、$b=t$、$c=\pi_{j-1}(t)$ を代入します。$d(t,\pi_j(t))\le\varepsilon_j$ と $d(t,\pi_{j-1}(t))\le\varepsilon_{j-1}$ なので、各上界は $\varepsilon_j+\varepsilon_{j-1}=3D2^{-j}$ です。$j=1$ で $12$、$j=2$ で $6$、$j=3$ で $3$。総和は $21$ です。ただしこれは差の距離の**上界**の和であり、実際の $d(t,t_0)$ は高々 $8$ です。望遠鏡和の絶対値評価では、途中の移動が往復し得るため上界が大きくなることを許容します。
<!-- solution-end -->

### A4. union boundの失敗確率の配分

$N_j=5$、$N_{j-1}=3$、$u=\log10$、$j=2$ のとき、有限chainingの $v_j$ と、各組・そのレベル全体の失敗確率上界を求めよ。

- Level: A
- ID: HDP10-A4

<!-- solution-start -->
**詳細解答**　$v_2=\log(2\cdot5\cdot3)+\log10+2\log2=\log1200$ です。一組あたりは $2e^{-v_2}=2/1200=1/600$ 以下です。組は最大 $15$ 組なので、レベル全体は $15/600=1/40=0.025$ 以下です。一般式 $e^{-u}2^{-j}=0.1/4=0.025$ と一致します。
<!-- solution-end -->

### A5. 対角行列を一つの最大偏差と間違えない

独立な標準正規 $G_1,\ldots,G_n$ と $A=I_n$ に対して、$\sum_i(G_i^2-1)$ をchainingの増分和としてではなく二次形式として扱うための仮定と、二つの行列ノルムを示せ。

- Level: A
- ID: HDP10-A5

<!-- solution-start -->
**詳細解答**　$G$ は独立な平均零の座標を持ち、各座標の指数モーメントは $Ee^{\lambda G_i}=e^{\lambda^2/2}$ です。[Hanson–Wrightの定理](../HDP9/index.md#thm-hdp9-hanson-wright)に $K=1$、$A=I_n$ を入れます。$\|I_n\|_{\mathrm F}^2=\sum_{i,j}(I_n)_{ij}^2=n$、$\|I_n\|_{\mathrm{op}}=1$ です。よって二領域上界は $2\exp[-\min\{t^2/(640n),t/64\}]$ です。ここでは添字集合の被覆数ではなく、座標ごとの二次形式が対象です。
<!-- solution-end -->

**Level B：核心証明の段階を再構成する**

### B1. 多段階の全組の確率評価

有限chainingのレベル $j$ の全組を考える。$v_j=\log(2N_jN_{j-1})+u+j\log2$ の選び方から、全レベルの失敗確率が $e^{-u}$ 以下であることを導け。独立性が必要かも答えよ。

- Level: B
- ID: HDP10-B1

<!-- solution-start -->
**詳細解答**　[増分の両側尾部](#lem-hdp10-increment-tail)から各組の失敗確率は $2e^{-v_j}=e^{-u}2^{-j}/(N_jN_{j-1})$ 以下です。レベル $j$ には最大 $N_jN_{j-1}$ 組あるので、和集合の確率は $e^{-u}2^{-j}$ 以下です。レベルをさらに合算すると $\sum_{j=1}^J e^{-u}2^{-j}=e^{-u}(1-2^{-J})<e^{-u}$。足し算は $P(\cup_iA_i)\le\sum_iP(A_i)$ だけを使うため、増分相互の独立性は不要です。
<!-- solution-end -->

### B2. エントロピー積分への変換

$N_j$ は非減少とする。$\sum_{j=1}^J\varepsilon_j\sqrt{\log N_j}\le2\mathcal H$ を、半径区間 $[\varepsilon_{j+1},\varepsilon_j]$ での被覆数の単調性から証明せよ。

- Level: B
- ID: HDP10-B2

<!-- solution-start -->
**詳細解答**　$\varepsilon\in[\varepsilon_{j+1},\varepsilon_j]$ は $\varepsilon\le\varepsilon_j$ なので $N(T,d,\varepsilon)\ge N(T,d,\varepsilon_j)=N_j$ です。従って区間の積分は $(\varepsilon_j-\varepsilon_{j+1})\sqrt{\log N_j}=(\varepsilon_j/2)\sqrt{\log N_j}$ 以上です。$j=1,\ldots,J$ の区間は内部が重ならないため、合計すると $\mathcal H\ge\frac12\sum_{j=1}^J\varepsilon_j\sqrt{\log N_j}$ となります。両辺を2倍して示されました。
<!-- solution-end -->

### B3. 同じ確率変数を共有する候補

$G\sim N(0,1)$ と $T=\{0,1,2\}$ を取り、$X_t=tG$、$d(s,t)=|s-t|$ とする。増分条件を検算し、候補が従属でもchainingを適用できる理由を述べよ。

- Level: B
- ID: HDP10-B3

<!-- solution-start -->
**詳細解答**　各 $EX_t=tEG=0$ です。任意の $s,t,\lambda$ に対し $X_t-X_s=(t-s)G$ なので $Ee^{\lambda(X_t-X_s)}=\exp(\lambda^2(t-s)^2/2)=\exp(\lambda^2d(s,t)^2/2)$。したがって[増分条件](#def-hdp10-subgaussian-increments)は等号で成立します。$X_1=G$ と $X_2=2G$ は独立ではありませんが、[有限chaining定理](#thm-hdp10-finite-chaining)は全組の尾部と和集合評価しか使わないため適用できます。
<!-- solution-end -->

### B4. 有限標本平均の増分MGF

独立同分布の $Y_i$ と一様に有界な二関数 $f,g$ に対して、$a=\|f-g\|_\infty$ と置く。$Z_f=P_nf-Pf$ の増分が $d(f,g)=a/\sqrt n$ を満たすことを式で示せ。$Y_i$ の独立性を失うとどこが壊れるか答えよ。

- Level: B
- ID: HDP10-B4

<!-- solution-start -->
**詳細解答**　$h=f-g$ とすると $Z_f-Z_g=n^{-1}\sum_i(h(Y_i)-Ph)$ です。$h(Y_i)\in[-a,a]$ なので[Hoeffding補題](../HDP1/index.md#lem-hdp1-hoeffding)に $\lambda/n$ を入力して $Ee^{(\lambda/n)(h(Y_i)-Ph)}\le e^{\lambda^2a^2/(2n^2)}$。独立性を使ってこれを $n$ 回掛ければ $Ee^{\lambda(Z_f-Z_g)}\le e^{\lambda^2a^2/(2n)}=e^{\lambda^2d(f,g)^2/2}$ です。標本が完全従属なら積への分解はできません。例えば全 $Y_i=Y_1$ なら $P_nf=f(Y_1)$ で、誤差が $n^{-1/2}$ に減る保証はありません。
<!-- solution-end -->

**Level C：理論と使い分けを統合する**

### C1. 指数的に多い近接候補

$T_m=\{\sum_{i=1}^ms_i2^{-i}e_i:s_i\in\{0,1\}\}$、$X_t=\langle G,t\rangle$（独立標準正規 $G_i$）とする。(1) $D^2$ を計算せよ。(2) 前 $k$ 座標を残す被覆を作り、半径と点数を示せ。(3) $E\sup_t X_t$ を計算し、$2^m$ 個への単純union boundと比較せよ。

- Level: C
- ID: HDP10-C1

<!-- solution-start -->
**詳細解答**　(1) 二点間の座標差の絶対値は高々 $2^{-i}$ です。全座標で一方を $1$、もう一方を $0$ にすれば同時に達成されるので $D^2=\sum_{i=1}^m4^{-i}=(1-4^{-m})/3$ です。(2) $s_{k+1}=\cdots=s_m=0$ に置き換える写像を使うと代表点数は $2^k$、距離の二乗は $\sum_{i=k+1}^m s_i4^{-i}\le \sum_{i=k+1}^\infty4^{-i}=4^{-k}/3$。従って半径 $2^{-k}/\sqrt3$ で覆えます。(3) 各 $s_i$ は独立に選べるので、最大値は $\sum_i2^{-i}(G_i)^+$ です。正規密度の積分で $E(G_i)^+=1/\sqrt{2\pi}$ となるため、期待最大値は $(1-2^{-m})/\sqrt{2\pi}$。一方 $|T_m|=2^m$ に共通尺度 $D$ の単純和集合評価を使うと $D\sqrt{2\log(2^{m+1}/\delta)}=O(D\sqrt m)$ しか直接は得られません。被覆の段階別評価では $N_j\le2^{j+1}$ と $\sum_j2^{-j}\sqrt{j+1}<\infty$ を使えるので、$m$ に依存しない上界が得られます。
<!-- solution-end -->

### C2. 依存・二次形式・候補族の判定

次の三設定に対し、適切な既習定理を選び、使える条件と不足する条件を示せ。(a) 独立な標準正規ベクトル $G\in\mathbb R^n$ と確定対称行列 $A$ の $G^{\mathsf T}AG$。(b) 同一の $G\sim N(0,1)$ をすべての座標に使った $X=(G,\ldots,G)$ と $I_n$ の二次形式。(c) 有界な有限関数族の独立標本平均の最大偏差。

- Level: C
- ID: HDP10-C2

<!-- solution-start -->
**詳細解答**　(a) 各 $G_i$ は独立・平均零で共通MGF代理量 $K=1$ なので[Hanson–Wright不等式](../HDP9/index.md#thm-hdp9-hanson-wright)を使えます。偏差の上界は $2\exp[-\min\{t^2/(640\|A\|_{\mathrm F}^2),t/(64\|A\|_{\mathrm{op}})\}]$（$A\ne0$）です。(b) 各座標はsub-Gaussianですが独立ではありません。二次形式は $nG^2$、中心化は $n(G^2-1)$ で、(a) の定理を適用できません。[HDP9の独立性に関する反例](../HDP9/index.md#thm-hdp9-hanson-wright)と同じ仕組みです。(c) 標本 $Y_i$ の独立性、有界性、零関数を含む有限な関数族を確認できれば、[有限関数族の系](#cor-hdp10-empirical-finite-class)を適用できます。ここでの複雑度は関数間の $\|\cdot\|_\infty/\sqrt n$ による被覆数であり、(a) のFrobeniusノルムや作用素ノルムを代入する問題ではありません。零関数がなければ基準関数の偏差を別途評価する必要があります。
<!-- solution-end -->

ここまでで、単一の確率変数の集中から、有限個の候補の同時制御、行列・二次形式、**候補間の距離を使う多段階の同時制御**までがつながりました。chainingを無限集合や統計的学習理論の一般論へ広げるときには、本章では仮定していない可算な代表点からの近似・標本路・関数族の可測性といった条件を改めて確かめる必要があります。
