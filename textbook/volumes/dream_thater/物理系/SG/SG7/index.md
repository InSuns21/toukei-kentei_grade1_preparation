# SG7 dilutedスピングラスとランダムfactor graph

[SG3のSherrington–Kirkpatrick模型](../SG3/index.md#def-sg3-sk)は、全てのスピン対が弱いGaussian結合で相互作用する模型でした。[SG6のGuerra補間](../SG6/index.md#thm-sg6-guerra-bound)では、その共分散をoverlapの二乗で整理しました。では、**一つのスピンが有限個程度の相手としか相互作用しない**ときは何が変わるでしょうか。

例えば多数の頂点に少数の不規則な辺を張ると、各辺の結合は弱める必要がありません。その一方、二つの配置のoverlapだけでは、どの辺の両端が一致しているかを表し切れません。そこで本章は有限サイズのPoisson化から出発し、局所的に木に近いグラフ、分配関数の厳密計算、多レプリカoverlapを経て、充足可能性問題（CSP）へ進みます。局所木での再帰を確率的な無限グラフへ拡張するcavity法とBelief Propagationは次章SG8で扱います。

## 1. 無秩序が「全スピン対」ではなくランダムな辺に載る

整数 $N\ge2$、平均接続度 $c\ge0$、逆温度 $\beta\ge0$、一様外場 $h\in\mathbb R$ を固定します。平均 $cN/2$ のPoisson個の辺を用意し、各辺の両端を $1,\ldots,N$ から独立に一様抽出します。端点が等しい自己ループと多重辺を許すので、Poissonの計算が厳密になります。有限 $N$ の単純グラフ模型とは異なりますが、固定された近傍を観察する極限ではこれらの例外の確率が消えます。

<a id="def-sg7-viana-bray"></a>

<!-- formal-statement-start -->
> **定義（Poisson化Viana–Bray模型）**  
> $M\sim\operatorname{Poi}(cN/2)$ とし、条件付きで $(I_a,K_a)$（$1\le a\le M$）を独立一様な $\{1,\ldots,N\}^2$ から選ぶ。さらに $J_a\in\{-1,1\}$ を独立かつ対称に選び、これら全てを相互独立とする。配置 $\sigma\in\{-1,1\}^N$ に対して
>
$$
B_N(\sigma)=\beta\sum_{a=1}^{M}J_a\sigma_{I_a}\sigma_{K_a}
+h\sum_{i=1}^N\sigma_i,\qquad
Z_N=\sum_{\sigma\in\{-1,1\}^N}e^{B_N(\sigma)}
$$
>
> と定める。無秩序を固定したGibbs平均を $\langle f\rangle$、quenched圧力を $p_N(c,\beta,h)=N^{-1}\mathbb E\log Z_N$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg7-viana-bray -->
### 二スピン・一本の辺を直接計算する

**定義の確認**：$N=2$、$h=0$、実現した辺が $(1,2)$ で $J=+1$、ほかに辺がないとします。$\sigma_1\sigma_2$ は $+1$ と $-1$ を各二配置で取るため、

$$
Z_2=2e^\beta+2e^{-\beta}=4\cosh\beta.
$$

同じ端点の辺が二本あれば結合は $J_1+J_2$ となり、自己ループなら $\sigma_i^2=1$ により全配置へ共通の因子 $e^{\beta J}$ が掛かります。これは端点を重複なく抽出する模型との有限サイズでの違いです。
<!-- definition-example-end -->

各辺のエネルギー寄与が $O(1)$ でも、$\mathbb EM=cN/2=O(N)$ なので、全相互作用の規模は $O(N)$ になります。SK模型のような $N^{-1/2}$ の結合縮小は必要ありません。符号に関しても物理のエネルギー $H=-\sum J_a\sigma_{I_a}\sigma_{K_a}$ と置けば $e^{-\beta H}$ に一致します。

## 2. 頂点の次数と局所的な木

ある頂点 $i$ に接続する「辺の個数」を $D_i$ とします。自己ループは一本と数え、端点の出現回数とは区別します。辺がPoisson個あることから、$D_i$ 自身の分布を直接求められます。

<a id="prop-sg7-poisson-degree"></a>

<!-- formal-statement-start -->
> **命題（Poisson次数と局所木性）**  
> [Poisson化Viana–Bray模型](#def-sg7-viana-bray)の固定頂点 $i$ について、自己ループを一本と数える接続辺数は
>
$$
D_i\sim\operatorname{Poi}\left(c\left(1-\frac{1}{2N}\right)\right).
$$
>
> 特に $N\to\infty$ で $D_i$ は $\operatorname{Poi}(c)$ に分布収束する。また $c<\infty$ を固定し、一様に選んだ根の半径 $r$ の近傍を任意の固定整数 $r$ まで探索すると、有限サイズのPoisson($c$)子孫を持つGalton–Watson木の半径 $r$ 近傍へ局所的に収束する。
<!-- formal-statement-end -->

### 証明の見取り図

一本の辺が頂点 $i$ に触れる確率を計算し、Poisson個の独立試行を「当たり」と「外れ」に薄化します。局所木性については、探索する頂点が有限個に抑えられたときの衝突確率が $O(1/N)$ となることを使います。

<!-- proof-start -->
### 証明

一本の辺の両端が $i$ でない確率は $(1-1/N)^2$ なので、接続確率は

$$
q_N=1-\left(1-\frac1N\right)^2
=\frac2N-\frac1{N^2}.
$$

$M=m$ を条件にすると $D_i\mid M=m\sim\operatorname{Bin}(m,q_N)$ です。確率母関数を順に計算して

$$
\mathbb E s^{D_i}
=\mathbb E(1-q_N+q_Ns)^M
=\exp\left[\frac{cN}{2}q_N(s-1)\right].
$$

最後はPoisson($cNq_N/2$)の確率母関数だから、パラメータは $c(1-1/(2N))$ です。

局所木性は探索順に確認します。固定半径 $r$、固定定数 $K$ を取り、探索で見える頂点数を $K$ 以下に制限します。辺の端点は一様なので、新たに見つける端点が既探索集合へ戻る確率は各回高々 $K/N$ です。$K$ 回程度の探索で衝突する確率は $O(K^2/N)$。一方、各探索頂点が未探索部分へ出す辺は、Poissonの独立薄化により近似的にPoisson($c$)で、複数の探索頂点の辺数の依存は端点衝突と共通辺が消える極限で消えます。

$K$ を先に固定すると半径 $r$ のPoisson($c$)分枝過程の頂点数が $K$ を超える確率は、期待値 $1+c+\cdots+c^r<\infty$ とMarkovの不等式から $K\to\infty$ で零へ抑えられます。従って先に $N\to\infty$、次に $K\to\infty$ とすれば、半径 $r$ の有限近傍で閉路も衝突も消え、分枝過程へ収束します。
<!-- proof-end -->

**読み違えに注意。** 局所的に木になることは、グラフ全体が木になることではありません。巨視的な閉路や巨大連結成分の存在、また全自由エネルギーが木の局所計算だけで決まるという結論は、この命題からは出ません。

## 3. 因子グラフ：辺の模型を制約式へ拡張する

対相互作用に限定せず、各相互作用をスピンの部分集合に作用する非負の関数で表すと、同じ構造でランダムSATや彩色問題を扱えます。変数と相互作用を二種類の頂点として分けるのがfactor graph（因子グラフ）です。

<a id="def-sg7-factor-graph"></a>

<!-- formal-statement-start -->
> **定義（因子グラフと分配関数）**  
> 変数集合 $V=\{1,\ldots,N\}$、有限な因子集合 $A$、各因子 $a$ が参照する変数集合 $\partial a\subseteq V$、関数 $\psi_a:\{-1,1\}^{\partial a}\to[0,\infty)$ を与える。二部グラフの辺を $(i,a)$（$i\in\partial a$）で定めたものを因子グラフという。外場 $h_i\in\mathbb R$ とともに
>
$$
Z=\sum_{\sigma\in\{-1,1\}^N}
\exp\left(\sum_i h_i\sigma_i\right)
\prod_{a\in A}\psi_a(\sigma_{\partial a})
$$
>
> と定める。$Z>0$ のときのみ通常の対数圧力とGibbs確率を定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg7-factor-graph -->
### 相互作用も論理制約も同じ形式になる

**定義の確認**：変数 $1,2$ と一因子 $a$ を結び、$\partial a=\{1,2\}$、$\psi_a(s_1,s_2)=e^{\beta Js_1s_2}$ とすればViana–Bray模型の一本の非ループ辺が再現されます。$h_i=0$ なら四配置の重みは $e^{\beta J}$ が二つ、$e^{-\beta J}$ が二つで、和は $4\cosh(\beta J)$ です。

次に論理式 $(x_1\lor\neg x_2)$ に対し、真を $+1$、偽を $-1$ として、満たす割当に $\psi_a=1$、満たさない割当に $\psi_a=0$ を置きます。違反するのは $(x_1,x_2)=(-1,+1)$ だけですから $Z=3$ です。これは正温度のIsing因子と異なる**硬い制約**ですが、同じ分配関数に入ります。
<!-- definition-example-end -->

自己ループがあるViana–Bray模型では一因子が同じ変数を二回参照します。$\psi_a(\sigma_i)=e^{\beta J_a}$ と定数因子へまとめれば、集合 $\partial a$ の定義と矛盾しません。多重辺は異なる因子として保持します。

## 4. 木なら分配関数を葉から厳密に計算できる

木に閉路がないことは単なる見た目の特徴ではありません。外場ゼロの対相互作用なら、葉のスピンを先に和に入れて消すことができます。これは次章のメッセージ再帰の最も簡単な原型です。

<a id="prop-sg7-tree-partition"></a>

<!-- formal-statement-start -->
> **命題（木上のIsing分配関数）**  
> 有限な木 $T=(V,E)$ に対して、各辺の実数結合を $J_e$ とし、外場を零とする。
>
$$
Z_T(\beta)=\sum_{\sigma\in\{-1,1\}^V}
\exp\left(\beta\sum_{e=\{i,j\}\in E}J_e\sigma_i\sigma_j\right).
$$
>
> このとき
>
$$
Z_T(\beta)=2^{|V|}\prod_{e\in E}\cosh(\beta J_e).
$$
<!-- formal-statement-end -->

### 証明の見取り図

葉を一つ選んで、その葉のスピンだけを和に入れます。得られる因子 $2\cosh(\beta J_e)$ は隣のスピンに依存しないので、葉を削除して同じ操作を繰り返せます。

<!-- proof-start -->
### 証明

$|V|=1$ なら二通りのスピンがあり、$Z_T=2$ です。$|V|\ge2$ なら葉 $v$ と唯一の隣接頂点 $u$ を選びます。$v$ に現れる相互作用は $J_{\{u,v\}}\sigma_u\sigma_v$ の一項だけです。残りの配置を固定して

$$
\sum_{\sigma_v=\pm1}e^{\beta J_{\{u,v\}}\sigma_u\sigma_v}
=e^{\beta J_{\{u,v\}}\sigma_u}
+e^{-\beta J_{\{u,v\}}\sigma_u}
=2\cosh(\beta J_{\{u,v\}}).
$$

最後の値は $\sigma_u$ に依存しません。従って $Z_T=2\cosh(\beta J_{\{u,v\}})Z_{T\setminus\{v\}}$ です。残ったグラフも木なので、頂点数に関する帰納法から

$$
Z_T=2\prod_{e\in E}2\cosh(\beta J_e)
=2^{|V|}\prod_{e\in E}\cosh(\beta J_e).
$$

最初の $2$ は最後に残った一頂点のスピン和、各辺由来の因子 $2$ は $|V|-1$ 個なので、合計 $2^{|V|}$ です。
<!-- proof-end -->

例えば三頂点の道 $1-2-3$ で $J_{12}=1$、$J_{23}=-1$ なら $Z_T=8\cosh^2\beta$ となります。一方、三角形に辺 $(3,1)$ を足せば最初の葉がなく、三本の結合符号の積が分配関数へ影響します。**木の公式を一般の疎グラフへ無条件に流用してはいけません。**

## 5. annealed圧力とquenched圧力：平均の順序を確認する

[SG1のquenchedとannealedの定義](../SG1/index.md#def-sg1-quenched)を現在の模型に適用します。有限 $N$ で無秩序平均を先に取ると、対称な符号結合を持つ一本の辺は、配置に依らず同じ因子を与えます。

<a id="prop-sg7-annealed-pressure"></a>

<!-- formal-statement-start -->
> **命題（Poisson化模型のannealed圧力とquenched上界）**  
> [Poisson化Viana–Bray模型](#def-sg7-viana-bray)の全ての $N\ge2$、$c,\beta\ge0$、$h\in\mathbb R$ に対し、
>
$$
\frac1N\log\mathbb E Z_N
=\log(2\cosh h)+\frac c2(\cosh\beta-1),
$$
>
> かつ
>
$$
p_N(c,\beta,h)\le
\log(2\cosh h)+\frac c2(\cosh\beta-1).
$$
<!-- formal-statement-end -->

### 証明の見取り図

固定配置について先に符号 $J_a$ を平均し、次にPoisson個の辺を平均します。最後に[SG1のJensen不等式による比較](../SG1/index.md#prop-sg1-jensen)を使います。結合を固定して対数を平均する場合とは交換できません。

<!-- proof-start -->
### 証明

任意の $\sigma$ と端点 $(I_a,K_a)$ を固定すると、$\sigma_{I_a}\sigma_{K_a}\in\{-1,1\}$ です。対称な $J_a$ に対し

$$
\mathbb E_{J_a}e^{\beta J_a\sigma_{I_a}\sigma_{K_a}}
=\frac{e^\beta+e^{-\beta}}2=\cosh\beta.
$$

$M=m$ を条件として結合を独立に平均すれば $(\cosh\beta)^m$。Poissonの確率母関数から

$$
\mathbb E(\cosh\beta)^M
=\sum_{m=0}^\infty e^{-cN/2}\frac{(cN/2)^m}{m!}
(\cosh\beta)^m
=\exp\left[\frac{cN}{2}(\cosh\beta-1)\right].
$$

この値は配置に依存しないので

$$
\mathbb E Z_N
=\left(\sum_{\sigma}e^{h\sum_i\sigma_i}\right)
e^{(cN/2)(\cosh\beta-1)}
=(2\cosh h)^N e^{(cN/2)(\cosh\beta-1)}.
$$

対数を取り $N$ で割れば等式です。さらに $Z_N>0$、$\mathbb E Z_N<\infty$ なので対数の凹性から $\mathbb E\log Z_N\le\log\mathbb E Z_N$ となります。
<!-- proof-end -->

$h=0$ で辺を一本固定し、符号だけを平均した二頂点の対数分配関数は $\log4+\log\cosh\beta$ です。一方、辺数もPoisson平均した $\log\mathbb EZ$ には $\cosh\beta-1$ が現れます。**$\log\cosh\beta$ と $\cosh\beta-1$ の違い**は、無秩序平均と対数の順序を混同したかどうかの検算になります。

## 6. 辺密度で微分すると多レプリカoverlapが現れる

[SK模型の二レプリカoverlap](../SG3/index.md#def-sg3-overlap)は、Gaussian共分散の二次式を制御しました。疎グラフでは、辺を一本増やすと対数の中に相関関数が入り、その対数を級数展開したときに多レプリカの情報が必要になります。

まず同じ無秩序から独立に採った $r$ 個のGibbs配置 $\sigma^1,\ldots,\sigma^r$ を考えます。これらは無秩序を固定すれば独立ですが、無秩序まで平均すると一般には独立ではありません。

<a id="def-sg7-multi-overlap"></a>

<!-- formal-statement-start -->
> **定義（多レプリカoverlap）**  
> 整数 $r\ge2$、$r$ 個のスピン配置 $\sigma^1,\ldots,\sigma^r\in\{-1,1\}^N$ に対して
>
$$
R_{1\cdots r}=\frac1N\sum_{i=1}^N
\prod_{a=1}^{r}\sigma_i^a
$$
>
> を $r$ レプリカoverlapとする。特に $r=2$ では通常のoverlap $R_{12}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg7-multi-overlap -->
### 四レプリカでは二レプリカの値だけを見ていない

**定義の確認**：$N=2$ とし、四配置を $\sigma^1=(+,+)$、$\sigma^2=(+,-)$、$\sigma^3=(-,+)$、$\sigma^4=(-,-)$ とします。各サイトの四重積は順に $+1,+1$ です。従って $R_{1234}=1$ ですが、$R_{12}=(1-1)/2=0$ です。四重積の平均は単独の二レプリカoverlapに置き換えられません。
<!-- definition-example-end -->

<a id="thm-sg7-add-edge"></a>

<!-- formal-statement-start -->
> **定理（Poissonの一辺追加公式と多レプリカ展開）**  
> [Poisson化Viana–Bray模型](#def-sg7-viana-bray)で $\beta<\infty$、$c\ge0$、$h\in\mathbb R$ を固定する。$t=\tanh\beta$ とし、$\langle\cdot\rangle_c$ を密度 $c$ の系のGibbs平均とする。$I,K$ は独立一様な頂点とすると、右微分（$c>0$ では通常の微分）は
>
$$
\frac{\partial p_N}{\partial c}
=\frac12\log\cosh\beta
+\frac14\mathbb E\log\left(
1-t^2\langle\sigma_I\sigma_K\rangle_c^2
\right).
$$
>
> さらに同じ無秩序の下で独立な $2n$ レプリカを使えば
>
$$
\frac{\partial p_N}{\partial c}
=\frac12\log\cosh\beta
-\frac14\sum_{n=1}^{\infty}
\frac{t^{2n}}n\,
\mathbb E\left\langle R_{1\cdots 2n}^2\right\rangle_c.
$$
>
> 各式は有限 $N$ で厳密に成立する。
<!-- formal-statement-end -->

### 証明の見取り図

Poisson分布の平均を少し増やす操作は、独立な辺を一本追加したときの対数分配関数の増加に等しくなります。その辺の符号平均を取ると二つの対数の平均になり、$-\log(1-x)$ の級数を展開すると偶数個のレプリカが順番に現れます。

<!-- proof-start -->
### 証明

$\lambda=cN/2$ と書き、$M\sim\operatorname{Poi}(\lambda)$ とします。各辺の端点と符号を独立に準備した上で、辺数 $m$ のときの $\mathbb E\log Z_N$ を $f(m)$ と書きます。辺一本の追加で $\log Z_N$ の変化の絶対値は $\beta$ 以下なので、$|f(m+1)-f(m)|\le\beta$。従ってPoisson級数は局所一様に微分でき、

$$
\frac{d}{d\lambda}\mathbb Ef(M)
=\sum_{m\ge0}e^{-\lambda}\frac{\lambda^m}{m!}
\bigl(f(m+1)-f(m)\bigr).
$$

新しい端点 $I,K$ と符号 $J$ を独立に一組追加すると、新旧の分配関数の比は $\langle e^{\beta J\sigma_I\sigma_K}\rangle_c$ です。$\lambda=cN/2$ と $p_N=N^{-1}\mathbb E\log Z_N$ より

$$
\frac{\partial p_N}{\partial c}
=\frac12\mathbb E_{G,I,K,J}
\log\langle e^{\beta J\sigma_I\sigma_K}\rangle_c.
$$

$\sigma_I\sigma_K\in\{\pm1\}$、$t=\tanh\beta$ を使うと

$$
\langle e^{\beta J\sigma_I\sigma_K}\rangle_c
=\cosh\beta\bigl(1+Jt\langle\sigma_I\sigma_K\rangle_c\bigr).
$$

$J$ の二符号を等確率で平均すると、$q=\langle\sigma_I\sigma_K\rangle_c$ として

$$
\frac12\log(1+tq)+\frac12\log(1-tq)
=\frac12\log(1-t^2q^2).
$$

これを先ほどの $1/2$ 倍の公式へ代入すれば第一式を得ます。

$0\le t<1$、$|q|\le1$ なので $|t^2q^2|<1$。従って

$$
\log(1-t^2q^2)
=-\sum_{n=1}^{\infty}\frac{t^{2n}}nq^{2n}.
$$

絶対値の級数は $\sum_{n\ge1}t^{2n}/n<\infty$ に抑えられるため、期待値と和を交換できます。同じGibbs測度から独立に取った $2n$ レプリカにより

$$
\langle\sigma_I\sigma_K\rangle_c^{2n}
=\left\langle
\prod_{a=1}^{2n}\sigma_I^a
\prod_{a=1}^{2n}\sigma_K^a
\right\rangle_c.
$$

端点 $I,K$ は独立一様なので、右辺を端点について平均すると

$$
\frac1{N^2}\sum_{i,j=1}^N
\left\langle
\prod_{a=1}^{2n}\sigma_i^a
\prod_{a=1}^{2n}\sigma_j^a
\right\rangle_c
=\left\langle R_{1\cdots 2n}^2\right\rangle_c.
$$

最後に無秩序平均を取れば第二式が従います。
<!-- proof-end -->

この公式には対角 $I=K$ も含まれます。単純グラフ模型での「異なる頂点へ一本追加」と混同しなければ有限 $N$ で誤差項は不要です。級数の $n=1$ は[通常の二レプリカoverlap](../SG3/index.md#def-sg3-overlap)ですが、$n\ge2$ が消えると仮定する根拠はありません。また $0\le q^2\le1$ から、

$$
0\le\frac{\partial p_N}{\partial c}
\le\frac12\log\cosh\beta
$$

です。下界では $\log(1-t^2)=-2\log\cosh\beta$ を使いました。$c=0$ では自由スピンのGibbs相関を代入して微分の右極限を検算できます。

## 7. ランダムCSP：エネルギー最小化から充足可能性へ

因子が「満たされたら1、違反したら0」を取れば、分配関数は充足割当の個数になります。しかし $Z=0$ も許すため、有限温度の圧力や厳密な確率測度と同一視するには注意が必要です。制約違反の個数を $E(\sigma)$ として $Z_\beta=\sum_\sigma e^{-\beta E(\sigma)}$ と置けば、$Z_\beta>0$ で、$\beta\to\infty$ の極限では充足割当だけが残ります。

<a id="def-sg7-poisson-ksat"></a>

<!-- formal-statement-start -->
> **定義（Poisson化ランダム $k$-SAT）**  
> 固定整数 $k\ge2$、$N\ge k$、密度 $\alpha\ge0$ を取る。$L\sim\operatorname{Poi}(\alpha N)$ 個の節を作り、各節ごとに相異なる $k$ 個の変数を一様に選び、各リテラルの否定符号を独立に確率 $1/2$ で選ぶ。全節を同時に満たす割当の個数を $X_N$ とし、各節の真偽を因子 $\psi_a\in\{0,1\}$ で表す。
>
$$
X_N=\sum_{\sigma\in\{-1,1\}^N}
\prod_{a=1}^L\psi_a(\sigma_{\partial a}).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg7-poisson-ksat -->
### 一節の例

**定義の確認**：$k=2$ の節 $(x_1\lor\neg x_2)$ は四割当のうち $(-1,+1)$ のときだけ偽です。したがって満たす割当は3個で、二変数の因子グラフを用いた $X_2=3$ と一致します。節を追加するごとに分配関数の積に因子 $\psi_a$ を一つ増やします。
<!-- definition-example-end -->

<a id="thm-sg7-ksat-first-moment"></a>

<!-- formal-statement-start -->
> **定理（Poisson化ランダム $k$-SAT の第一モーメント上界）**  
> 上記の $k,N,\alpha$ に対して
>
$$
\mathbb E X_N=2^N e^{-\alpha N2^{-k}}.
$$
>
> 特に $\alpha>2^k\log2$ なら
>
$$
\mathbb P(X_N\ge1)\le
\exp\{N(\log2-\alpha2^{-k})\}\longrightarrow0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

割当を一つ固定すると、独立な一節が偽となる確率は $2^{-k}$ です。節数を条件付きで固定してからPoisson平均を行い、最後に解の個数にMarkovの不等式を適用します。

<!-- proof-start -->
### 証明

固定した配置 $\sigma$ と一節の相異なる変数添字を条件にしても、独立な否定符号の組は $2^k$ 通りで、全リテラルが偽になる符号の組は一つだけです。よって一節を満たす確率は $1-2^{-k}$。$L=m$ のもとでは節が独立なので

$$
\mathbb P(\sigma\text{ が全節を満たす}\mid L=m)
=(1-2^{-k})^m.
$$

$2^N$ 個の配置について指示関数を足し、期待値の線形性から $\mathbb E[X_N\mid L=m]=2^N(1-2^{-k})^m$。Poissonの確率母関数へ $s=1-2^{-k}$ を代入すると

$$
\mathbb E X_N
=2^N\exp\{\alpha N((1-2^{-k})-1)\}
=\exp\{N(\log2-\alpha2^{-k})\}.
$$

$X_N$ は非負整数で、$\{X_N\ge1\}$ 上で $X_N\ge1$ なので、$\mathbb P(X_N\ge1)\le\mathbb EX_N$。指数が負なら極限は零です。
<!-- proof-end -->

この上界は「その密度より上では高確率で充足不能」という**片側の十分条件**です。実際のしきい値の値や、下側の充足可能性は導きません。固定節数 $L=m$ の模型なら $\mathbb EX_N=2^N(1-2^{-k})^m$ であり、Poisson化した模型と指数が異なる点にも注意してください。大きな $k$ についての厳密なしきい値の研究は本章の第一モーメントだけでは到達しません。

## 8. これまでの道具でできること・次章で必要になること

辺の疎性を取り込むと、Gaussian共分散の代わりにPoissonの一辺追加、多レプリカoverlap、木上の局所計算が自然に出てきました。特に[辺密度微分公式](#thm-sg7-add-edge)は厳密ですが、無限個の多レプリカoverlapを含むため、それだけで熱力学極限の値が閉じるわけではありません。

因子グラフが木なら、局所部分を順に周辺化できる一方、閉路がある場合は同じ再帰を無条件に厳密化できません。SG8では木上の再帰をメッセージとして定式化し、疎なランダムグラフに対するRS・1RSBの仮定と、Mézard–Parisi型の自由エネルギー記述との関係を吟味します。**局所木収束だけでBethe自由エネルギーの正しさが証明されたとは考えない**ことが、二章の接続で重要です。

## 演習問題

### Level A：対象と定義を計算で確認する

**SG7-A1：Poisson辺数と次数。** $N=4$、$c=2$ のPoisson化Viana–Bray模型について $\mathbb EM$ と、頂点1へ接続する辺数 $D_1$ の平均を計算せよ。自己ループを一本と数えよ。

- Level: A

<!-- solution-start -->
### 詳細解答

[模型の定義](#def-sg7-viana-bray)により $\mathbb EM=cN/2=2\cdot4/2=4$。一本の辺が頂点1に触れる確率は $1-(3/4)^2=7/16$ です。Poisson薄化から[次数命題](#prop-sg7-poisson-degree)の平均は

$$
\mathbb ED_1=4\cdot\frac7{16}=\frac74
=2\left(1-\frac18\right).
$$

端点の出現回数を数えれば平均は $2\mathbb EM/N=2$ ですが、自己ループを二回数えるため別の量です。
<!-- solution-end -->

**SG7-A2：一つの制約因子。** 二変数の節 $(x_1\lor\neg x_2)$ の四割当を列挙し、因子分配関数を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$(x_1,x_2)=(+,+)$ では $x_1$ が真、$(+,-)$ でも $x_1$ が真です。$(-,-)$ では $\neg x_2$ が真です。$(-,+)$ だけは両リテラルが偽になります。[因子グラフの定義](#def-sg7-factor-graph)で三配置には重み1、一配置には重み0を与えるので

$$
Z=1+1+1+0=3.
$$

充足割当の個数と因子分配関数が等しい例です。
<!-- solution-end -->

**SG7-A3：道グラフ。** 三頂点の道 $1-2-3$ に $J_{12}=1$、$J_{23}=-2$ を置く。$h=0$ の $Z$ を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

[木上の分配関数命題](#prop-sg7-tree-partition)では頂点が3個、辺が2本なので

$$
Z=2^3\cosh(\beta\cdot1)\cosh(\beta\cdot(-2))
=8\cosh\beta\cosh(2\beta).
$$

$\cosh(-2\beta)=\cosh(2\beta)$ を使いました。負の結合を無視したのではなく、外場ゼロの木では符号の効果が消えます。
<!-- solution-end -->

**SG7-A4：四レプリカ。** $N=2$、$\sigma^1=(+,+)$、$\sigma^2=(+,-)$、$\sigma^3=(-,+)$、$\sigma^4=(-,-)$ で $R_{12}$ と $R_{1234}$ を計算せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

[多レプリカoverlapの定義](#def-sg7-multi-overlap)から

$$
R_{12}=\frac{(+)(+)+(+)(-)}2=0.
$$

第一サイトの四重積は $(+)(+)(-)(-)=+1$、第二サイトの四重積は $(+)(-)(+)(-)=+1$ です。従って $R_{1234}=(1+1)/2=1$。二つは別の統計量です。
<!-- solution-end -->

### Level B：有限系の恒等式を再導出する

**SG7-B1：annealedとquenchedを区別する。** $h=0$ のPoisson化模型について $\mathbb EZ_N$ とannealed圧力を求め、$\beta=0$ の値を検算せよ。quenched圧力について何が従うか。

- Level: B

<!-- solution-start -->
### 詳細解答

各配置を固定すると、独立対称な各 $J_a$ の平均から $\mathbb Ee^{\beta J_a\sigma_{I_a}\sigma_{K_a}}=\cosh\beta$。$M=m$ を固定すれば $(\cosh\beta)^m$、$M$ のPoisson平均を取れば

$$
\mathbb EZ_N
=2^N\exp\left[\frac{cN}{2}(\cosh\beta-1)\right].
$$

従って $N^{-1}\log\mathbb EZ_N=\log2+c(\cosh\beta-1)/2$ です。$\beta=0$ では $\cosh0=1$ なので $\log2$。これは試料によらず $Z_N=2^N$ になることと一致します。[annealed圧力命題](#prop-sg7-annealed-pressure)と対数の凹性から、quenched圧力は上式以下です。一般に等号は主張できません。
<!-- solution-end -->

**SG7-B2：一辺追加と符号平均。** $q=\langle\sigma_I\sigma_K\rangle$ として $\mathbb E_J\log\langle e^{\beta J\sigma_I\sigma_K}\rangle$ を計算せよ。さらに密度微分の上下界を導け。

- Level: B

<!-- solution-start -->
### 詳細解答

$J=\pm1$ を各確率 $1/2$ とし $t=\tanh\beta$ と置くと、

$$
\langle e^{\beta J\sigma_I\sigma_K}\rangle
=\cosh\beta(1+Jtq).
$$

二符号の対数の平均は

$$
\log\cosh\beta+\frac12\log(1+tq)
+\frac12\log(1-tq)
=\log\cosh\beta+\frac12\log(1-t^2q^2).
$$

[一辺追加定理](#thm-sg7-add-edge)により、この式の無秩序・端点平均の $1/2$ 倍が $\partial_cp_N$ です。$0\le q^2\le1$ より

$$
\log(1-t^2)\le\log(1-t^2q^2)\le0.
$$

さらに $1-t^2=\cosh^{-2}\beta$ なので、両辺へ $1/2\log\cosh\beta$ を足し $1/4$ 倍の対数項を使えば $0\le\partial_cp_N\le\frac12\log\cosh\beta$ を得ます。
<!-- solution-end -->

**SG7-B3：Poisson化 $2$-SATの第一モーメント。** $k=2$ とし、$\mathbb EX_N$ を導いて、どの $\alpha$ なら第一モーメントだけで高確率の充足不能が示せるか答えよ。同じ密度で節数を固定した場合との違いを説明せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

一節を固定割当が違反する確率は $1/4$ です。節数 $L=m$ の条件付き期待値は $2^N(3/4)^m$。Poisson($\alpha N$)の確率母関数を使い、

$$
\mathbb EX_N
=2^N\exp[\alpha N(3/4-1)]
=\exp[N(\log2-\alpha/4)].
$$

[第一モーメント定理](#thm-sg7-ksat-first-moment)のMarkov評価は $\alpha>4\log2$ で零に収束します。節数を厳密に $m=\lfloor\alpha N\rfloor$ に固定すれば $\mathbb EX_N=2^N(3/4)^m$、指数率は $\log2+\alpha\log(3/4)$ です。この場合に得られる上界条件は $\alpha>-\log2/\log(3/4)$ であり、Poisson化の $4\log2$ と同じではありません。いずれも真のしきい値との等号を意味しません。
<!-- solution-end -->

### Level C：疎な相互作用を統合して考える

**SG7-C1：木・Poisson・overlap。** $h=0$、$\beta>0$ とする。(a) 木 $T$ の辺結合が全て $\pm1$ のとき $|V|^{-1}\log Z_T$ を計算せよ。(b) $M\sim\operatorname{Poi}(cN/2)$ の模型でannealed圧力を求めよ。(c) 一辺追加公式を有限系から導き、対数項の $t^4$ までの展開にどのoverlapが登場するか述べよ。(d) (a) の木の値がそのまま全ランダムグラフの厳密圧力と断言できない理由を二つ説明せよ。

- Level: C

<!-- solution-start -->
### 詳細解答

(a) [木上の分配関数命題](#prop-sg7-tree-partition)で $\cosh(\beta J_e)=\cosh\beta$、$|E|=|V|-1$ なので、

$$
\frac1{|V|}\log Z_T
=\log2+\frac{|V|-1}{|V|}\log\cosh\beta.
$$

(b) 各辺を符号平均すると配置によらず $\cosh\beta$。Poissonの母関数により $\mathbb EZ_N=2^N\exp[(cN/2)(\cosh\beta-1)]$、従って

$$
\frac1N\log\mathbb EZ_N
=\log2+\frac c2(\cosh\beta-1).
$$

(a) は固定した木の $\log Z_T$、(b) はグラフも平均した後の $\log\mathbb EZ_N$ です。対数と平均の順序を変えて同一視してはいけません。

(c) $M$ の平均を $\lambda=cN/2$ と書くと、Poisson期待値の微分は一本の独立辺の追加差です。分配関数の比は $\langle e^{\beta J\sigma_I\sigma_K}\rangle$ であり、$q=\langle\sigma_I\sigma_K\rangle$ に対して符号平均した対数は $\log\cosh\beta+\frac12\log(1-t^2q^2)$。$1/N$ と $d\lambda/dc=N/2$ を掛け、

$$
\frac{\partial p_N}{\partial c}
=\frac12\log\cosh\beta+\frac14\mathbb E\log(1-t^2q^2).
$$

級数は $\log(1-t^2q^2)=-t^2q^2-\frac12t^4q^4-\cdots$ です。独立な二端点について $q^2$ は二レプリカの $R_{12}^2$、$q^4$ は四レプリカの $R_{1234}^2$ に変換されるため、

$$
\frac{\partial p_N}{\partial c}
=\frac12\log\cosh\beta
-\frac{t^2}{4}\mathbb E\langle R_{12}^2\rangle
-\frac{t^4}{8}\mathbb E\langle R_{1234}^2\rangle
-\cdots.
$$

(d) 第一に、[局所木性](#prop-sg7-poisson-degree)は固定半径の近傍だけの性質であり、有限グラフ全体には閉路や多重辺があり得ます。第二に、局所計算を平均した量が大域的なquenched圧力へ収束するには、境界条件や相関の影響を制御する別の論証が必要です。ゆえに(a)を任意の $c,\beta$ へ適用するのは誤りです。
<!-- solution-end -->

## 参考文献

- L. Viana and A. J. Bray, *Phase diagrams for dilute spin glasses*, Journal of Physics C **18** (1985), 3037. [原論文](https://doi.org/10.1088/0022-3719/18/15/013)。
- M. Mézard, G. Parisi, R. Zecchina, *Analytic and Algorithmic Solution of Random Satisfiability Problems*, Science **297** (2002), 812–815. [論文](https://doi.org/10.1126/science.1073287)。希薄模型と制約充足への接続。
- J. Ding, A. Sly, N. Sun, *Proof of the satisfiability conjecture for large k*, Annals of Mathematics **196** (2022), 1–388. [原論文](https://annals.math.princeton.edu/2022/196-1/p01)。第一モーメントを超える研究級結果の例。
