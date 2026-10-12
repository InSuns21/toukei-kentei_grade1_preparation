# SG8 cavity法・Belief Propagation・Mézard–Parisi

[SG7のランダム因子グラフ](../SG7/index.md#def-sg7-factor-graph)では、相互作用を局所的な因子に分けました。[木上のIsing分配関数](../SG7/index.md#prop-sg7-tree-partition)では葉から順にスピンを消しましたが、外場があると、葉を消去した後の重みが隣のスピンに依存します。この依存を二成分の確率ベクトルとして渡す方法がcavity法です。

ここでは「木の上で**厳密に**計算できること」と、「閉路のある希薄ランダムグラフを木のように扱う**近似・物理的仮説**」を区別します。前半でBelief Propagation（BP）とBethe分配関数を導出し、後半でPoisson分枝木のreplica-symmetric（RS）再帰、複数状態を仮定する1RSB、Mézard–Parisi型の考え方へ進みます。

## 1. 枝から来る二成分の情報

変数 $i\in V$ にスピン $\sigma_i\in\{-1,+1\}$ を置き、因子 $a\in A$ は $\partial a\subseteq V$ の変数を参照します。各頂点の重み $\phi_i(s)>0$ と各因子の重み $\psi_a(\sigma_{\partial a})>0$ を与え、

$$
Z=\sum_{\sigma\in\{-1,+1\}^V}
\prod_{i\in V}\phi_i(\sigma_i)
\prod_{a\in A}\psi_a(\sigma_{\partial a})
$$

を考えます。[SG7の因子グラフ](../SG7/index.md#def-sg7-factor-graph)では因子に零も許しましたが、本章の厳密なBP定理では**正値**に限定します。そうしないと、矛盾する制約を含む部分木から全零のメッセージが届き、正規化できない場合があります。

因子と変数を結ぶ接続を一本切ると、その先の部分木の全配置和は、切断位置のスピン $s=\pm1$ を固定した二つの数になります。正規化すれば、部分木全体を長々と記録する必要はありません。

<a id="def-sg8-bp"></a>

<!-- formal-statement-start -->
> **定義（cavity messageとBelief Propagation）**  
> 有限因子グラフの全有向接続 $(i,a)$ に、正の確率ベクトル $\mu_{i\to a}(s)$ と $\widehat\mu_{a\to i}(s)$（$s=\pm1$）を与える。BP方程式とは次を全接続で満たすことである。
>
$$
\mu_{i\to a}(s)=
\frac{\phi_i(s)\prod_{b\in\partial i\setminus\{a\}}\widehat\mu_{b\to i}(s)}
{\sum_{t=\pm1}\phi_i(t)\prod_{b\in\partial i\setminus\{a\}}\widehat\mu_{b\to i}(t)},
$$
>
$$
\widehat\mu_{a\to i}(s)=
\frac{\displaystyle\sum_{\tau_{\partial a\setminus\{i\}}}
\psi_a(s,\tau)\prod_{j\in\partial a\setminus\{i\}}\mu_{j\to a}(\tau_j)}
{\displaystyle\sum_{t=\pm1}\sum_{\tau_{\partial a\setminus\{i\}}}
\psi_a(t,\tau)\prod_{j\in\partial a\setminus\{i\}}\mu_{j\to a}(\tau_j)}.
$$
>
> ここで $\partial i=\{a:i\in\partial a\}$ とし、空積は1とする。両メッセージは各々 $s$ について和が1である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg8-bp -->
### 一因子・二スピンの直接確認

**定義の確認**：因子を一つ除いたときの変数メッセージと、その因子から返るメッセージを順に計算します。

$\phi_1=\phi_2=1$、$\psi_a(s,t)=e^{Kst}$ とします。因子を除くと両変数は孤立するので、$\mu_{1\to a}(\pm1)=\mu_{2\to a}(\pm1)=1/2$ です。因子から変数1への未正規化メッセージは

$$
\sum_{t=\pm1}e^{Kst}\frac12
=\frac{e^{Ks}+e^{-Ks}}2=\cosh K.
$$

$s$ に依存しないため $\widehat\mu_{a\to1}(\pm1)=1/2$。変数2に対しても同じです。全ての成分は正で、それぞれ和が1になります。
<!-- definition-example-end -->

## 2. 局所周辺分布とBethe分配関数

各接続のメッセージから、変数・因子が受け取る情報を掛けたときの正規化量を定めます。**メッセージの和は1でも、全系の分配関数が1になるわけではありません。** 接続の重複を補正する商が必要になります。

<a id="def-sg8-bethe"></a>

<!-- formal-statement-start -->
> **定義（局所beliefとBethe分配関数）**  
> 正のBP固定点について、変数・因子・接続の正規化量を
>
$$
z_i=\sum_s\phi_i(s)\prod_{a\in\partial i}\widehat\mu_{a\to i}(s),
\qquad
z_a=\sum_{\sigma_{\partial a}}\psi_a(\sigma_{\partial a})
\prod_{i\in\partial a}\mu_{i\to a}(\sigma_i),
$$
>
$$
z_{ia}=\sum_{s=\pm1}\mu_{i\to a}(s)\widehat\mu_{a\to i}(s)
$$
>
> とする。局所beliefとBethe分配関数は
>
$$
b_i(s)=\frac{\phi_i(s)\prod_{a\in\partial i}\widehat\mu_{a\to i}(s)}{z_i},
\qquad
b_a(\sigma_{\partial a})=
\frac{\psi_a(\sigma_{\partial a})\prod_{i\in\partial a}\mu_{i\to a}(\sigma_i)}{z_a},
$$
>
$$
Z_{\mathrm B}=
\frac{\prod_{i\in V}z_i\,\prod_{a\in A}z_a}
{\prod_{(i,a):\,i\in\partial a}z_{ia}}.
$$
>
> $\log Z_{\mathrm B}$ は無次元のBethe圧力であり、逆温度 $\beta>0$ の熱力学的自由エネルギーは $-\beta^{-1}\log Z_{\mathrm B}$ となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg8-bethe -->
### 正規化の4を落とさない

**定義の確認**：変数・因子・接続の規格化定数を代入し、Bethe積を直接確かめます。

前節の一因子例では $z_1=z_2=1$、$z_a=\cosh K$、$z_{1a}=z_{2a}=1/2$ です。従って

$$
Z_{\mathrm B}=\frac{1\cdot1\cdot\cosh K}{(1/2)^2}
=4\cosh K.
$$

直接四配置を足しても $Z=2e^K+2e^{-K}=4\cosh K$ です。辺因子だけを取り出して $\cosh K$ とするのは、全てのスピン配置の数を落とした計算です。
<!-- definition-example-end -->

<a id="prop-sg8-local"></a>

<!-- formal-statement-start -->
> **命題（BPの局所整合性）**  
> 全因子・頂点重みが正で、メッセージがBP方程式を満たすとき、任意の $i\in\partial a$、$s=\pm1$ に対し
>
$$
b_i(s)=
\sum_{\sigma_{\partial a\setminus\{i\}}}b_a(s,\sigma_{\partial a\setminus\{i\}})
=\frac{\mu_{i\to a}(s)\widehat\mu_{a\to i}(s)}{z_{ia}}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

頂点側の更新で $a$ 以外の因子をまとめると $\mu_{i\to a}$ が現れます。因子側の更新で $i$ 以外を足すと $\widehat\mu_{a\to i}$ が現れます。残った比例定数を和1から確定します。

<!-- proof-start -->
### 証明

変数更新の分母を $C_{i\to a}$ とすると、定義式から

$$
\phi_i(s)\prod_{b\in\partial i}\widehat\mu_{b\to i}(s)
=C_{i\to a}\mu_{i\to a}(s)\widehat\mu_{a\to i}(s).
$$

$s$ について和を取り $z_i=C_{i\to a}z_{ia}$。よって $b_i(s)=\mu_{i\to a}(s)\widehat\mu_{a\to i}(s)/z_{ia}$ です。

因子更新の分母を $\widehat C_{a\to i}$ とすると、$b_a$ をほかの変数について和で消した結果は

$$
\sum_{\sigma_{\partial a\setminus\{i\}}}b_a(s,\sigma)
=\frac{\widehat C_{a\to i}}{z_a}
\mu_{i\to a}(s)\widehat\mu_{a\to i}(s).
$$

さらに $s$ を足すと $1=\widehat C_{a\to i}z_{ia}/z_a$ であるため、$z_a=\widehat C_{a\to i}z_{ia}$。これを戻すと右辺は $b_i(s)$ になります。
<!-- proof-end -->

## 3. 有限木でのBPは近似ではなく恒等式

木では接続 $(i,a)$ を除いた各枝は互いに交わりません。したがって一つの枝の全配置を消去して得たメッセージは、ほかの枝と独立に掛けられます。閉路では切断した枝が別の経路で再び交わるため、この議論が壊れます。

<a id="thm-sg8-tree"></a>

<!-- formal-statement-start -->
> **定理（有限因子木でのBPとBethe分配関数の厳密性）**  
> 連結有限因子グラフが木で、全 $\phi_i>0$、$\psi_a>0$ なら、枝の部分分配関数から定める正規化BP解が一意に存在する。[局所belief](#def-sg8-bethe)は厳密なGibbs周辺分布と一致し、
>
$$
Z=Z_{\mathrm B}=
\frac{\prod_i z_i\prod_a z_a}
{\prod_{(i,a)}z_{ia}}.
$$
>
> 森でも各連結成分について成立し、全体ではその積となる。
<!-- formal-statement-end -->

### 証明の見取り図

まず切断先の部分木のスピン和でBPを構成します。次に局所周辺分布を木の辺で貼り合わせれば、正規化された全配置のGibbs分布を再構成できます。その積商の分子を展開すると、全メッセージが消えてBetheの正規化定数だけが残ります。

<!-- proof-start -->
### 証明

**第一段階：枝の和。** 接続 $(i,a)$ を切った $i$ 側の部分木について、$\sigma_i=s$ に固定して内部の重みを全て足した値を $U_{i\to a}(s)>0$ とします。反対の $a$ 側では $\sigma_i=s$ を境界条件として固定し、$i$ 自身の頂点重みは含めずに内部を足した値を $\widehat U_{a\to i}(s)>0$ とします。

木で異なる枝は交わらないため、

$$
U_{i\to a}(s)=\phi_i(s)
\prod_{b\in\partial i\setminus\{a\}}\widehat U_{b\to i}(s),
$$

$$
\widehat U_{a\to i}(s)=
\sum_{\tau_{\partial a\setminus\{i\}}}
\psi_a(s,\tau)\prod_{j\in\partial a\setminus\{i\}}
U_{j\to a}(\tau_j).
$$

これらの二成分を和1へ正規化すると、枝ごとに掛かる正のスカラーは消え、[BP更新式](#def-sg8-bp)になります。葉からの帰納法で全有向接続のメッセージが一意に決まります。

**第二段階：局所周辺。** $\sigma_i=s$ を固定した全系の重みは、$i$ に隣接する各枝の和を掛けることで $\phi_i(s)\prod_{a\in\partial i}\widehat U_{a\to i}(s)$ です。規格化すると $b_i(s)$ に一致します。因子 $a$ の全隣接スピンを固定した場合も、外側の各枝を独立に消去すれば $\psi_a(\sigma_{\partial a})\prod_{i\in\partial a}U_{i\to a}(\sigma_i)$ となり、規格化後は $b_a$ になります。

**第三段階：貼り合わせ。** 正の局所周辺が[局所整合性](#prop-sg8-local)を満たすので、

$$
Q(\sigma)=
\frac{\prod_{a\in A}b_a(\sigma_{\partial a})\prod_{i\in V}b_i(\sigma_i)}
{\prod_{(i,a):i\in\partial a}b_i(\sigma_i)}
$$

を作れます。これは正規化された確率分布です。実際、木に根を一つ取り、根の周辺分布から各子の条件付き分布へ順に展開するとこの積商になります。各条件付き分布は子の配置について和が1ですから、葉から足し上げると $\sum_\sigma Q(\sigma)=1$ です。因子の葉を取り除く場合も $b_a/b_i$ を $\sigma_{\partial a\setminus\{i\}}$ の条件付き分布として使い、[局所整合性](#prop-sg8-local)により和が1になります。

**第四段階：全てのメッセージを消す。** [局所belief](#def-sg8-bethe)を $Q$ に代入して積を展開すると、各接続の $\mu_{i\to a}$ と $\widehat\mu_{a\to i}$ は分子と分母で一回ずつ相殺されます。従って

$$
Q(\sigma)=
\frac{\prod_i\phi_i(\sigma_i)\prod_a\psi_a(\sigma_{\partial a})}
{\left(\prod_i z_i\prod_a z_a\right)/
\left(\prod_{(i,a)}z_{ia}\right)}
=\frac1{Z_{\mathrm B}}\prod_i\phi_i\prod_a\psi_a.
$$

$\sum_\sigma Q(\sigma)=1$ なので、この分母は全配置重みの和 $Z$ に等しく、$Z=Z_{\mathrm B}$ が従います。孤立頂点は $z_i=\sum_s\phi_i(s)$ として掛ければよく、森では成分別の積を取ります。
<!-- proof-end -->

**重要な区別。** 木で成り立つのは切断成分の非交差性に基づく等式です。[SG7の局所木収束](../SG7/index.md#prop-sg7-poisson-degree)は「固定半径で閉路が見えにくい」という主張にすぎず、巨大グラフの $\log Z/N$ の誤差が消えることまで含みません。

## 4. Ising模型：二成分メッセージからcavity fieldへ

対相互作用 $\psi_{\{i,j\}}(s,t)=e^{K_{ij}st}$ と外場 $\phi_i(s)=e^{h_i s}$ を取ります。$K_{ij}=\beta J_{ij}$ とすれば[SG7の希薄模型](../SG7/index.md#def-sg7-viana-bray)と整合します。因子を消去した変数間メッセージは、正規化された二成分なので実数一つで表せます。

<a id="def-sg8-field"></a>

<!-- formal-statement-start -->
> **定義（Ising cavity field）**  
> 正の変数間メッセージを $\nu_{i\to j}(s)=e^{H_{i\to j}s}/(2\cosh H_{i\to j})$ と表すと、BP更新は
>
$$
H_{i\to j}=h_i+
\sum_{k\in\partial i\setminus\{j\}}
u(K_{ik},H_{k\to i}),
\qquad
u(K,H)=\operatorname{artanh}(\tanh K\,\tanh H).
$$
>
> $H_{i\to j}$ をcavity fieldとする。全結合は有限とし、$|\tanh K|<1$ を仮定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg8-field -->
### 磁場を持つ二頂点

**定義の確認**：隣を切断したときの外場から有効場の更新を計算します。

一本辺の端点1,2に外場 $h_1,h_2$ と結合 $K$ を置けば、$H_{1\to2}=h_1$、$H_{2\to1}=h_2$。頂点1が受け取る全有効場は

$$
h_1+\operatorname{artanh}(\tanh K\,\tanh h_2).
$$

$h_2=0$ なら隣からの寄与は0、$h_2\to+\infty$ なら有限 $K$ のもとで寄与は $K$ に近づきます。結合が負なら寄与も逆向きになります。
<!-- definition-example-end -->

### 更新式を再導出する

$m=\tanh H_{k\to i}$ とすると入力は $\nu_{k\to i}(t)=(1+tm)/2$ です。一辺を消去した後の重みは

$$
\sum_{t=\pm1}e^{Kst}\frac{1+tm}{2}
=\cosh K+s\,m\sinh K
=\cosh K(1+s\,m\tanh K).
$$

$s=+1$ と $-1$ の重みの比について対数の半分を取ると

$$
\frac12\log\frac{1+m\tanh K}{1-m\tanh K}
=\operatorname{artanh}(m\tanh K).
$$

複数枝では重みを掛けるので対数比が足され、頂点外場 $h_i$ を加えて上の式になります。「各枝が条件付き独立」という木の構造をこの導出で使っています。

## 5. 一つの閉路で生じる補正

BPを木以外へ形式的に適用しても固定点を得る場合があります。しかしそのBethe値が正しい分配関数になるとは限りません。最小の確認として外場0、三角形の三辺に同一結合 $K$ を置きます。

<a id="prop-sg8-loop"></a>

<!-- formal-statement-start -->
> **命題（三角形の閉路補正）**  
> 三角形のIsing模型 $e^{K\sigma_i\sigma_j}$、外場0、有限 $K\in\mathbb R$ において、零cavity fieldはBP固定点である。そのBethe分配関数と厳密分配関数は
>
$$
Z_{\mathrm B}=8(\cosh K)^3,\qquad
Z=8(\cosh K)^3(1+\tanh^3K).
$$
>
> 従って $K\ne0$ でBethe近似は厳密でない。
<!-- formal-statement-end -->

### 証明の見取り図

入力の磁化が0なら更新後も0になります。この固定点でBethe値を計算し、厳密配置和は各辺を $\cosh K(1+\sigma_i\sigma_j\tanh K)$ と展開します。奇数回だけ出現するスピンの項は和を取ると消え、三辺全部を選ぶ閉路項だけが残ります。

<!-- proof-start -->
### 証明

[Ising更新式](#def-sg8-field)の右辺は、$h_i=0$ で全入力 $H=0$ なら0です。従って $\nu_{i\to j}(\pm1)=1/2$。因子側を消去したBethe表示を使い、頂点ごとに

$$
z_i^{\rm pair}=\sum_{s=\pm1}\prod_{j\in\partial i}
\sum_{t=\pm1}e^{Kst}\nu_{j\to i}(t)
=2(\cosh K)^2,
$$

辺ごとに

$$
z_{ij}^{\rm pair}=\sum_{s,t=\pm1}e^{Kst}
\nu_{i\to j}(s)\nu_{j\to i}(t)=\cosh K.
$$

これは[因子形式のBethe公式](#def-sg8-bethe)から因子メッセージを消去した同値形であり、頂点・辺は各3つなので

$$
Z_{\mathrm B}=\frac{[2(\cosh K)^2]^3}{(\cosh K)^3}
=8(\cosh K)^3.
$$

厳密な方は $t=\tanh K$ と書き、

$$
Z=(\cosh K)^3
\sum_{s_1,s_2,s_3}
(1+ts_1s_2)(1+ts_2s_3)(1+ts_3s_1).
$$

定数項の和は8。一辺だけ、または二辺だけを取る展開項は、奇数回出現するスピンを含むため $\sum_{s=\pm1}s=0$ によって消えます。三辺全ての項は $t^3s_1^2s_2^2s_3^2=t^3$ なので和は $8t^3$。従って $Z=8(\cosh K)^3(1+t^3)$。有限 $K$ なら $|t|<1$ で $1+t^3>0$ です。
<!-- proof-end -->

閉路の寄与は結合が反強磁性的な $K<0$ なら負になります。木の厳密定理を一般の疎グラフへ拡張するには、局所木収束以外の誤差評価が必要です。

## 6. ランダム木上のRS cavity分布

[SG7のPoisson次数と局所木性](../SG7/index.md#prop-sg7-poisson-degree)を使うと、一様な根から見た有限半径の探索はPoisson($c$)の子孫数を持つランダム木で近似できます。ここで有限グラフのBP収束を前提とするのではなく、**無限分枝木での分布再帰**を独立に定めます。

<a id="def-sg8-rs"></a>

<!-- formal-statement-start -->
> **定義（RS分布再帰）**  
> $c\ge0$、$\beta\ge0$、$h\in\mathbb R$ を固定し、$D\sim\operatorname{Poi}(c)$、独立対称符号 $J_1,J_2,\ldots\in\{-1,+1\}$、独立同分布な $H_1,H_2,\ldots$ を用いる。全ての要素は独立とする。[Isingの更新関数](#def-sg8-field)を使った固定点方程式
>
$$
H\ \stackrel d=\ h+\sum_{k=1}^D
u(\beta J_k,H_k)
$$
>
> をRS（replica-symmetric）cavity分布再帰とする。右辺が入力分布 $\nu$ に定める出力分布を $T\nu$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg8-rs -->
### 正確に計算できる二つの場合

**定義の確認**：枝からの寄与が消える場合を再帰式に代入します。

$\beta=0$ なら $u(0,H)=0$ なので、どの入力分布からも $T\nu=\delta_h$ です。$h=0$ なら全入力を0と置くことで $T\delta_0=\delta_0$。一方、一般の外場では $D$ がPoisson確率変数なので、単に $D$ を平均 $c$ に置き換えるのは別の方程式になります。
<!-- definition-example-end -->

高温では一意性を証明できます。有限一次モーメント分布間のWasserstein距離 $W_1(\nu,\nu')$ は、二分布を周辺とする全ての結合 $(X,Y)$ の $\mathbb E|X-Y|$ の下限です。

<a id="prop-sg8-contraction"></a>

<!-- formal-statement-start -->
> **命題（RS再帰の高温収縮）**  
> $c\tanh\beta<1$、$\beta<\infty$ とする。有限一次モーメント分布 $\nu,\nu'$ について
>
$$
W_1(T\nu,T\nu')\le
c\tanh\beta\,W_1(\nu,\nu').
$$
>
> 従ってこの分布の空間に固定点がただ一つ存在し、どの有限一次モーメント初期分布からの反復も $W_1$ でその固定点へ収束する。
<!-- formal-statement-end -->

### 証明の見取り図

一枝の入力fieldを変えても、その影響は最大 $\tanh\beta$ 倍です。独立な枝の本数の期待値が $c$ なので、全体の期待誤差は最大 $c\tanh\beta$ 倍になります。収縮の反復から固定点を作ります。

<!-- proof-start -->
### 証明

$t=\tanh K$ とすると

$$
\frac{\partial}{\partial x}u(K,x)
=\frac{t(1-\tanh^2x)}{1-t^2\tanh^2x}.
$$

$|K|=\beta$ では $|t|=\tanh\beta<1$。分母と分子の括弧の差は $(1-t^2)\tanh^2x\ge0$ なので、絶対値は高々 $\tanh\beta$ です。よって平均値の定理から

$$
|u(\beta J,x)-u(\beta J,y)|
\le \tanh\beta\,|x-y|.
$$

$\nu,\nu'$ を持つ変数の結合 $(X_k,Y_k)$ を独立同分布に複製し、$D$ と $J_k$ は両側で共有します。三角不等式で

$$
\begin{aligned}
\mathbb E\left|
\sum_{k=1}^D u(\beta J_k,X_k)
-\sum_{k=1}^D u(\beta J_k,Y_k)\right|
&\le \tanh\beta\,
\mathbb E\sum_{k=1}^D|X_k-Y_k|\\
&=c\tanh\beta\,\mathbb E|X_1-Y_1|.
\end{aligned}
$$

結合の下限を取ると目的の $W_1$ 不等式です。さらに $|u(\beta J,x)|\le\beta$ より $\mathbb E|H'|\le|h|+\beta c$ で、$T$ は有限一次モーメント分布を保ちます。$W_1$ に関してその空間は完備です。反復 $\nu_{n+1}=T\nu_n$ の隣接距離は $q^nW_1(\nu_1,\nu_0)$ 以下（$q=c\tanh\beta<1$）なので、三角不等式と等比級数によりCauchy列になり、ある $\nu_*$ へ収束します。収縮性で $T\nu_*=\nu_*$。二つの固定点の距離 $d$ は $d\le qd$ を満たすので $d=0$、一意です。
<!-- proof-end -->

これは**RS分布再帰そのもの**に関する厳密な結論です。有限のPoissonランダムグラフの自由エネルギー極限がこの固定点から得られるBethe値に等しい、という主張は別途証明を要します。

## 7. 1RSB cavityとMézard–Parisiの位置づけ

高温RSでは、一つの環境から一つのcavityメッセージを選び、その環境のランダムさを分布にまとめました。しかし低温のフラストレーション系では、**同じ無秩序試料内に異なるGibbs状態群が存在する**という描像が重要になります。このとき状態 $\alpha$ ごとに異なるメッセージを持たせ、状態全体にも確率的な重みを与えるのが1RSB cavityの発想です。

[SG6のRuelle確率カスケード](../SG6/index.md#def-sg6-rpc)では階層状態の確率重みを扱いました。希薄模型のMézard–Parisi型記述は、この状態重みと局所因子グラフのBP更新を組み合わせようとします。ここでまず、有限個の状態が与えられた場合の重みの計算を厳密に行います。

<a id="def-sg8-rsb"></a>

<!-- formal-statement-start -->
> **定義（1RSBの状態重み付け）**  
> 有限非空集合 $\mathcal A$、正の状態重み $W_\alpha$（$\sum_\alpha W_\alpha=1$）、状態別の正の局所分配関数増分 $z_\alpha>0$、$m\in(0,1]$ に対し、
>
$$
W'_\alpha=
\frac{W_\alpha z_\alpha^m}
{\sum_{\gamma\in\mathcal A}W_\gamma z_\gamma^m},
\qquad
\Phi_m=\frac1m\log\sum_{\alpha\in\mathcal A}W_\alpha z_\alpha^m
$$
>
> を1RSB cavityの有限状態再重み付けと、その対数増分とする。無限状態版では状態に依存するメッセージの**分布**を同様の局所増分で更新する。一般の希薄グラフに対する自由エネルギー公式の厳密性は、この定義からは従わない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg8-rsb -->
### 2状態の重み付けを検算する

**定義の確認**：状態ごとの増分を指数 $m$ で重み付けして正規化します。

$W_A=W_B=1/2$、$z_A=4$、$z_B=1$、$m=1/2$ とすると、

$$
W'_A=\frac{(1/2)\cdot2}{(1/2)\cdot2+(1/2)\cdot1}
=\frac23,\qquad W'_B=\frac13.
$$

$m=1$ なら $(W'_A,W'_B)=(4/5,1/5)$ です。$m$ は増分の大小による重みの偏りを調節しますが、この例は状態分解の存在を証明しません。
<!-- definition-example-end -->

### どこから物理的仮説になるか

[SG6のPoisson重みの指数傾斜](../SG6/index.md#lem-sg6-poisson-tilt)に $m$ 乗の重みが現れたのと同様、希薄系では状態ごとの局所分配関数増分を $z^m$ で再重み付けする考え方が現れます。RSなら「環境に条件づけたメッセージの分布」だけを求めます。1RSBではさらに「**同じ環境内で状態を変えたときのメッセージ分布**」を追うため、未知量の階層が一段増えます。

ただし、無限グラフに対する1RSB方程式の解が存在すること、その状態群が実際の有限模型のGibbs分解を表すこと、Mézard–Parisi型のBethe自由エネルギーが正しい極限圧力となることは、模型・温度・条件に依存する別々の問題です。[SG6のParisi変分原理](../SG6/index.md#thm-sg6-parisi-principle)は完全結合Gaussian SK模型に関する研究級の結果であり、希薄模型の1RSB公式を無条件には正当化しません。SATのような零因子ではBPの正規化が壊れ得るため、正値因子の場合から直接外挿できません。

## 8. どの結論が厳密か

有限**木**上のBP・Bethe公式は厳密です。三角形の具体計算は、閉路があるだけで補正が生じることを示しました。Poisson分枝木上のRS分布再帰と $c\tanh\beta<1$ の収縮も厳密ですが、有限ランダムグラフの圧力を決定するには、境界の影響や誤差の別証明が必要です。1RSB・Mézard–Parisi型の物理描像は、RSでは捉えにくい複数状態の構造を記述するための言語であり、その数学的正当化の範囲は対象模型に応じて確認する必要があります。

## 演習問題

### Level A：局所計算

**SG8-A1：変数メッセージ。** 因子 $a$ だけに接続する変数 $i$ で $\phi_i(+1)=3$、$\phi_i(-1)=1$ のとき $\mu_{i\to a}$ を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

[BP更新式](#def-sg8-bp)で空積は1なので未正規化重みは $(3,1)$、分母は $3+1=4$。従って $\mu_{i\to a}(+1)=3/4$、$\mu_{i\to a}(-1)=1/4$。成分は正で和1です。
<!-- solution-end -->

**SG8-A2：因子メッセージ。** $\psi_a(s,t)=e^{Kst}$、$\mu_{2\to a}(t)=(1+tm)/2$（$|m|<1$）のとき $\widehat\mu_{a\to1}(s)$ を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

[因子から変数への更新](#def-sg8-bp)の分子は

$$
\sum_{t=\pm1}e^{Kst}\frac{1+tm}{2}
=\cosh K+s\,m\sinh K.
$$

$s=\pm1$ の和は $2\cosh K$。従って $\widehat\mu_{a\to1}(s)=(1+s\,m\tanh K)/2$ です。$|m\tanh K|<1$ なので両成分は正です。
<!-- solution-end -->

**SG8-A3：二変数のBethe積。** 無外場、二変数一因子 $\psi_a(s,t)=e^{Kst}$ において全 $z_i,z_a,z_{ia}$ と $Z_{\mathrm B}$ を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

一様メッセージ $\mu=\widehat\mu=1/2$ を代入すると、[局所beliefとBethe分配関数](#def-sg8-bethe)より $z_1=z_2=\sum_s1/2=1$、

$$
z_a=\sum_{s,t}e^{Kst}/4=\cosh K,\qquad
z_{1a}=z_{2a}=\sum_s(1/2)^2=1/2.
$$

従って $Z_{\mathrm B}=(1\cdot1\cdot\cosh K)/((1/2)^2)=4\cosh K$。直接の配置和 $2e^K+2e^{-K}$ に一致します。
<!-- solution-end -->

**SG8-A4：磁場の影響。** 一本辺の結合 $K>0$、$h_1=0$、$h_2=x$ のとき、頂点1が受け取る有効場を求め、$x=0$ と $x\to+\infty$ を調べよ。

- Level: A

<!-- solution-start -->
### 詳細解答

[Ising cavity field](#def-sg8-field)では $H_{2\to1}=x$ なので、頂点1の全有効場は $\operatorname{artanh}(\tanh K\,\tanh x)$。$x=0$ なら $\tanh x=0$ で0です。$x\to+\infty$ なら $\tanh x\to1$、有限 $K$ について $\operatorname{artanh}(\tanh K)=K$ なので、極限は $K$ です。
<!-- solution-end -->

### Level B：恒等式と反例

**SG8-B1：局所整合性。** BP固定点で $\sum_{\sigma_{\partial a\setminus\{i\}}}b_a=b_i$ を証明し、$z_a$ と $\widehat C_{a\to i}$ の関係を示せ。

- Level: B

<!-- solution-start -->
### 詳細解答

因子更新の未正規化分子を $\widehat C_{a\to i}\widehat\mu_{a\to i}(s)$ と書くと、

$$
\sum_{\sigma_{\partial a\setminus\{i\}}}b_a(s,\sigma)
=\frac{\widehat C_{a\to i}}{z_a}
\mu_{i\to a}(s)\widehat\mu_{a\to i}(s).
$$

$s$ の和が1なので $z_a=\widehat C_{a\to i}z_{ia}$。変数更新の分母 $C_{i\to a}$ も使えば $z_i=C_{i\to a}z_{ia}$ です。両式を割り戻すと、左右とも $\mu_{i\to a}(s)\widehat\mu_{a\to i}(s)/z_{ia}$ となります。これは[局所整合性命題](#prop-sg8-local)の計算です。
<!-- solution-end -->

**SG8-B2：三角形の誤差。** 外場0、全辺結合 $K$ の三角形で、$Z/Z_{\mathrm B}$ を計算し、$K<0$ では1より大きいか小さいかを述べよ。

- Level: B

<!-- solution-start -->
### 詳細解答

零BP固定点では、各頂点から $z_i^{\rm pair}=2\cosh^2K$、各辺から $z_{ij}^{\rm pair}=\cosh K$。よって $Z_{\mathrm B}=8\cosh^3K$ です。[閉路補正命題](#prop-sg8-loop)の配置和を再展開すると、$e^{Kst}=\cosh K(1+st\tanh K)$ の3因子の積では空辺集合と三辺全体だけが非零で、$Z=8\cosh^3K(1+\tanh^3K)$。従って比は $1+\tanh^3K$。$K<0$ なら $\tanh K<0$ なので1未満、有限 $K$ では正です。
<!-- solution-end -->

**SG8-B3：分布再帰の一意性。** $c=2$、$\tanh\beta=1/4$ とする。収縮係数を求め、$h=0$ の固定点を特定せよ。$h\ne0$ の $\delta_h$ は固定点か。

- Level: B

<!-- solution-start -->
### 詳細解答

[収縮命題](#prop-sg8-contraction)より係数は $c\tanh\beta=2/4=1/2<1$ なので固定点は一意。$h=0$ のとき $u(\beta J,0)=0$ から $T\delta_0=\delta_0$、従って唯一の固定点は $\delta_0$ です。$h\ne0$ なら $D=1$ の事象が正の確率で起こり、そのとき出力は $h+u(\beta J,h)$、$J=\pm1$ で異なる二値を取ります。$\tanh\beta=1/4>0$ なので $u(\beta,h)\ne0$、ゆえに $T\delta_h\ne\delta_h$ です。
<!-- solution-end -->

### Level C：厳密な木と物理的仮定を接続する

**SG8-C1：BP・loop・RS・1RSB。** (a) 外場0の道 $1-2-3$ に結合 $K,L$ を置いて $Z$ を求めよ。(b) 三角形のloop補正を導け。(c) 局所木収束だけでランダムグラフのBethe圧力が厳密と結論できない理由を説明せよ。(d) 二状態 $W_A=W_B=1/2$、$z_A=4,z_B=1$、$m=1/2$ の再重み付けと $\Phi_m$ を求め、何が未証明か述べよ。

- Level: C

<!-- solution-start -->
### 詳細解答

(a) 固定した $\sigma_2$ に対し端点1の和は $2\cosh K$、端点3の和は $2\cosh L$。残る $\sigma_2$ の和は2なので

$$
Z=2(2\cosh K)(2\cosh L)=8\cosh K\cosh L.
$$

これは[木上BPの厳密性](#thm-sg8-tree)にも一致します。(b) 三角形では $t=\tanh K$ とおくと配置和の高温展開で三辺全体の積のみが定数項以外に残り、$Z/Z_{\mathrm B}=1+t^3$。従って、閉路を含む有限グラフでBPの固定点が存在しても、Bethe分配関数は全配置の厳密な和と一致するとは限りません。

(c) [SG7の局所木収束](../SG7/index.md#prop-sg7-poisson-degree)は固定半径の近傍の法則がPoisson分枝木の対応する近傍の法則へ近づくという主張です。遠方からの境界影響と全頂点にわたる $\log Z/N$ の誤差が小さいという評価は含まれません。局所の等式を大域の圧力等式へ移すには追加の証明が要ります。

(d) 再重み付けの分子は $(\frac12\cdot4^{1/2},\frac12\cdot1^{1/2})=(1,1/2)$、その和は $3/2$。従って [1RSB重み付け](#def-sg8-rsb)より

$$
(W'_A,W'_B)=(2/3,1/3),\qquad
\Phi_{1/2}=2\log(3/2).
$$

これは有限状態の代数的恒等式です。実際の希薄スピングラスのGibbs状態分解の存在、1RSBの仮定の正しさ、Mézard–Parisi自由エネルギーと熱力学圧力の等号は証明していません。
<!-- solution-end -->
