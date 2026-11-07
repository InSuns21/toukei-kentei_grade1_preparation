# OTR2 分割して運べば何が解消するか

<!-- definition-example-audit: strict -->

## 1. 写像では運べない質量をどう運ぶか

前講では、[輸送写像](../OTR1/index.md#def-otr1-transport-map) $T$ が出発点 $x$ ごとに一つの到着点 $T(x)$ を指定することを学びました。たとえば出発分布が $\mu=\delta_0$、到着分布が

$$
\nu=\frac12\delta_{-1}+\frac12\delta_1
$$

なら、[有限原子測度の質量保存則](../OTR1/index.md#prop-otr1-atomic-mass-balance)により輸送写像は存在しません。点 $0$ の質量 $1$ を写像一つで二つに分けられないからです。

そこで、点 $x$ の質量を点 $y$ へ**どれだけ送るか**を記録することにします。上の例では、$(0,-1)$ に $1/2$、$(0,1)$ に $1/2$ の質量を置けば、出発側の総量は $1$、到着側の二点の総量はそれぞれ $1/2$ になります。これは写像ではなく、出発点と到着点の**組**の上の確率分布です。

一般に $X,Y$ を可測空間とし、$X\times Y$ には積 $\sigma$ 代数を入れます。組 $(x,y)$ を第1成分 $x$、第2成分 $y$ へ戻す写像を、それぞれ座標射影 $p_X(x,y)=x$、$p_Y(x,y)=y$ と書きます。[押し出し測度](../../F0/F0-00P1/index.md#def-f0-00p1-pushforward)を使うと、組の分布から「出発だけ」「到着だけ」の分布を取り出せます。これは既習の同時分布から周辺分布を取り出す操作と同じ考え方です。

<a id="def-otr2-coupling"></a>

<!-- formal-statement-start -->
> **定義（結合測度と周辺分布）**
> 可測空間 $(X,\mathcal A)$、$(Y,\mathcal B)$ と確率測度 $\mu,\nu$ をそれぞれに与える。積可測空間 $(X\times Y,\mathcal A\otimes\mathcal B)$ 上の確率測度 $\pi$ が

$$
(p_X)_{\#}\pi=\mu,\qquad (p_Y)_{\#}\pi=\nu
$$

> を満たすとき、$\pi$ を $\mu,\nu$ の**結合測度**（coupling）、または輸送計画と呼ぶ。結合測度全体を $\Pi(\mu,\nu)$ と記す。二つの押し出し測度を $\pi$ の第1・第2**周辺分布**と呼ぶ。
<!-- formal-statement-end -->

定義は可測集合 $A\in\mathcal A$、$B\in\mathcal B$ を用いて次のようにも書けます。

$$
\pi(A\times Y)=\mu(A),\qquad
\pi(X\times B)=\nu(B).
$$

なぜ同値でしょうか。$p_X^{-1}(A)=A\times Y$、$p_Y^{-1}(B)=X\times B$ を押し出し測度の定義へ直接代入しただけです。第1式は「各出発領域から出ていく総量」、第2式は「各到着領域へ入る総量」が指定どおりであることを表します。

<!-- definition-example-start: def-otr2-coupling -->
### 定義の確認：一つの原子を二つに分ける

**定義の確認**：確率測度であることと二つの周辺条件を別々に確かめます。

$X=\{0\}$、$Y=\{-1,1\}$ にすべての部分集合を可測集合として入れます。先ほどの $\mu,\nu$ に対し

$$
\pi=\frac12\delta_{(0,-1)}+\frac12\delta_{(0,1)}
$$

と置きます。非負の重みの和が $1$ なので $\pi$ は確率測度です。第1射影は両方の組を $0$ に写すため、$(p_X)_{\#}\pi=\delta_0=\mu$ です。第2射影は二つの組をそれぞれ $-1,1$ に写すため、

$$
(p_Y)_{\#}\pi
=\frac12\delta_{-1}+\frac12\delta_1=\nu.
$$

従って $\pi\in\Pi(\mu,\nu)$ です。**結合は存在するが輸送写像は存在しない**という最初の問いに答えられました。
<!-- definition-example-end -->

## 2. 結合は必ず存在するのか

出発と到着を相関させずに選ぶなら、長方形 $A\times B$ に $\mu(A)\nu(B)$ の質量を置けます。これが既習の**積測度**です。確率測度は有限測度なので、[積測度の存在一意性定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-01)の $\sigma$ 有限性の仮定を満たします。

<a id="prop-otr2-nonempty"></a>

<!-- formal-statement-start -->
> **命題（結合の非空性）**
> 任意の可測空間 $(X,\mathcal A)$、$(Y,\mathcal B)$ 上の確率測度 $\mu,\nu$ について、積測度 $\mu\times\nu$ は結合測度である。特に $\Pi(\mu,\nu)$ は空でない。
<!-- formal-statement-end -->

### 証明の見取り図

[積測度の存在一意性定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-01)の長方形に関する等式へ $B=Y$ または $A=X$ を代入すれば、二つの周辺分布が元の確率測度と一致します。

<!-- proof-start -->
### 証明

[積測度の存在一意性定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-01)を、有限測度である $\mu,\nu$ に適用します。積測度 $\pi=\mu\times\nu$ は非負であり、

$$
\pi(X\times Y)=\mu(X)\nu(Y)=1\cdot1=1
$$

なので確率測度です。任意の $A\in\mathcal A$ に対して

$$
\pi(A\times Y)=\mu(A)\nu(Y)=\mu(A),
$$

また任意の $B\in\mathcal B$ に対して

$$
\pi(X\times B)=\mu(X)\nu(B)=\nu(B).
$$

これは[結合測度の定義](#def-otr2-coupling)にある二つの周辺条件なので、$\pi\in\Pi(\mu,\nu)$ です。$\square$
<!-- proof-end -->

ただし、積測度が**費用の安い結合**とは限りません。たとえば $X=Y=\{0,1\}$、$\mu=\nu=(\delta_0+\delta_1)/2$ とし、費用を $|x-y|$ とすれば、積測度では異なる点を結ぶ質量が合計 $1/2$ あります。一方、同じ点同士を結ぶ結合では費用が $0$ になります。どの結合を選ぶかが次の課題です。

### 周辺分布は積分にも反映される

確率測度を領域ごとに一致させる条件は、出発点だけ、または到着点だけを見る関数の平均値も固定します。

<a id="prop-otr2-marginal-integration"></a>

<!-- formal-statement-start -->
> **命題（周辺分布の積分恒等式）**
> $\pi\in\Pi(\mu,\nu)$ とする。$f:X\to[0,\infty]$ と $g:Y\to[0,\infty]$ が可測なら、以下の等式が拡張非負実数の意味で成立する。

$$
\int_{X\times Y}f(x)\,d\pi(x,y)=\int_X f\,d\mu,
$$

$$
\int_{X\times Y}g(y)\,d\pi(x,y)=\int_Y g\,d\nu.
$$

> 実数値の可積分関数 $f\in L^1(\mu)$、$g\in L^1(\nu)$ についても、各積分は有限で同じ等式が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

座標射影による押し出しで周辺分布を作るという定義と、[押し出し積分公式](../../F0/F0-00P3D/index.md#thm-f0-00p3d-pushforward-integration)を合成します。

<!-- proof-start -->
### 証明

$p_X:X\times Y\to X$ は可測で、[結合測度の定義](#def-otr2-coupling)から $(p_X)_{\#}\pi=\mu$ です。[押し出し積分公式](../../F0/F0-00P3D/index.md#thm-f0-00p3d-pushforward-integration)に写像 $p_X$、測度 $\pi$、非負可測関数 $f$ を代入すると

$$
\int_X f(x)\,d((p_X)_{\#}\pi)(x)
=\int_{X\times Y}f(p_X(x,y))\,d\pi(x,y).
$$

左辺の測度を $\mu$ に、右辺の $p_X(x,y)$ を $x$ に置き換えると第1式が出ます。$p_Y$ と $(p_Y)_{\#}\pi=\nu$ に同じ公式を適用すると第2式です。可積分な実数値関数の場合も、[押し出し積分公式](../../F0/F0-00P3D/index.md#thm-f0-00p3d-pushforward-integration)を正負部分へそれぞれ適用できます。その絶対値の積分が周辺分布側で有限なので、両辺は有限です。$\square$
<!-- proof-end -->

## 3. 組ごとの費用を最小にする

質量を $(x,y)$ の組へ割り当てるなら、その組ごとの単位費用 $c(x,y)$ に対して、そこに置いた質量で平均した費用を考えればよいでしょう。以下では $c:X\times Y\to[0,\infty]$ を積可測空間上の非負可測関数とします。非負性により積分は無限大でも定義できます。

<a id="def-otr2-kantorovich"></a>

<!-- formal-statement-start -->
> **定義（Kantorovichの最適輸送問題）**
> 可測空間 $(X,\mathcal A)$、$(Y,\mathcal B)$ 上の確率測度 $\mu,\nu$ と、非負可測費用 $c:X\times Y\to[0,\infty]$ を与える。結合 $\pi\in\Pi(\mu,\nu)$ の費用を

$$
J_K(\pi):=\int_{X\times Y}c(x,y)\,d\pi(x,y)
$$

> と定め、**Kantorovich問題**の値を

$$
K_c(\mu,\nu):=\inf_{\pi\in\Pi(\mu,\nu)}J_K(\pi)
$$

> とする。有限の費用でこの下限を達成する許容結合があれば、これを**最適結合**と呼ぶ。値は $+\infty$ であってもよく、一般には下限が有限でも最小値が達成されるとは限らない。
<!-- formal-statement-end -->

この定義で $\Pi(\mu,\nu)\ne\varnothing$ は[結合の非空性](#prop-otr2-nonempty)が保証します。しかし、費用の有限性や最適結合の存在は別問題です。最適結合の存在を一般に保証する条件は次講で考えます。

<!-- definition-example-start: def-otr2-kantorovich -->
### 定義の確認：原子の分割にも費用を付ける

**定義の確認**：結合の許容性を確かめてから非負可測費用を積分し、最小値を判断します。

第1節の $\delta_0$ から $(\delta_{-1}+\delta_1)/2$ への結合で、$c(x,y)=|x-y|$ とすれば、

$$
J_K(\pi)=\frac12|0-(-1)|+\frac12|0-1|=1.
$$

この例では結合は実は一意です。出発点は $0$ のみで、二つの到着点へ送る量がそれぞれ $1/2$ と指定されるためです。従って $K_c(\mu,\nu)=1$ で、有限費用の最適結合が存在します。対応するMonge問題は許容写像がなく、費用の比較以前に実行不可能でした。
<!-- definition-example-end -->

## 4. Monge問題はKantorovich問題にどう入るか

[Monge問題](../OTR1/index.md#def-otr1-monge)は、写像 $T$ の費用 $\int_Xc(x,T(x))\,d\mu(x)$ を最小化しました。写像 $T$ から各点の組 $(x,T(x))$ へ質量を移すと、結合を一つ作れます。$(\mathrm{id},T)$ は $x\mapsto(x,T(x))$ という写像の略記です。

<a id="prop-otr2-graph"></a>

<!-- formal-statement-start -->
> **命題（Monge写像のグラフ結合への埋め込み）**
> 可測空間 $(X,\mathcal A)$、$(Y,\mathcal B)$ の確率測度 $\mu,\nu$ に対し、$T:X\to Y$ を $T_{\#}\mu=\nu$ を満たす可測輸送写像とする。このとき

$$
\pi_T:=(\mathrm{id},T)_{\#}\mu\in\Pi(\mu,\nu)
$$

> である。この形の $\pi_T$ を $T$ の**グラフ結合**という。任意の非負可測費用 $c:X\times Y\to[0,\infty]$ に対して、

$$
\int_{X\times Y}c(x,y)\,d\pi_T(x,y)
=\int_X c(x,T(x))\,d\mu(x).
$$
<!-- formal-statement-end -->

### 証明の見取り図

第1射影と組写像の合成は恒等写像、第2射影との合成は $T$ です。これで周辺条件が出ます。費用の等式は[押し出し積分公式](../../F0/F0-00P3D/index.md#thm-f0-00p3d-pushforward-integration)の $f=c$ への適用です。

<!-- proof-start -->
### 証明

$T$ と恒等写像が可測なので、$(\mathrm{id},T):X\to X\times Y$ も可測です。可測長方形への逆像が

$$
(\mathrm{id},T)^{-1}(A\times B)=A\cap T^{-1}(B)
$$

となり、これは $\mathcal A$ に属するからです。長方形は積 $\sigma$ 代数を生成するので、この確認で可測性が従います。よって $\pi_T$ は確率測度として定義できます。

任意の $A\in\mathcal A$ に対し、

$$
\begin{aligned}
\pi_T(A\times Y)
&=\mu\bigl((\mathrm{id},T)^{-1}(A\times Y)\bigr)\\
&=\mu(A\cap T^{-1}(Y))=\mu(A).
\end{aligned}
$$

任意の $B\in\mathcal B$ に対しても、

$$
\begin{aligned}
\pi_T(X\times B)
&=\mu\bigl((\mathrm{id},T)^{-1}(X\times B)\bigr)\\
&=\mu(T^{-1}(B))=\nu(B).
\end{aligned}
$$

最後は[輸送写像の定義](../OTR1/index.md#def-otr1-transport-map)です。従って[結合測度の定義](#def-otr2-coupling)から $\pi_T\in\Pi(\mu,\nu)$ です。

さらに[押し出し積分公式](../../F0/F0-00P3D/index.md#thm-f0-00p3d-pushforward-integration)へ $S=(\mathrm{id},T)$、被積分関数 $c$、元の測度 $\mu$ を代入すると

$$
\begin{aligned}
\int_{X\times Y}c(x,y)\,d(S_{\#}\mu)(x,y)
&=\int_X c(S(x))\,d\mu(x)\\
&=\int_X c(x,T(x))\,d\mu(x).
\end{aligned}
$$

$S_{\#}\mu=\pi_T$ なので主張の費用恒等式になります。$\square$
<!-- proof-end -->

写像が一つの出発点に一つの到着点を指定する以上、グラフ結合も出発点ごとに質量を分割しません。Kantorovichの許容集合は、こうした結合だけでなく分割する結合も含みます。

<a id="prop-otr2-comparison"></a>

<!-- formal-statement-start -->
> **命題（Kantorovich下限とMonge下限の比較）**
> 可測空間上の確率測度 $\mu,\nu$、非負可測費用 $c$ を固定する。Monge問題の許容輸送写像が少なくとも一つ存在し、その下限を $M_c(\mu,\nu)$ と書けば、

$$
K_c(\mu,\nu)\le M_c(\mu,\nu).
$$

> Monge問題に許容写像がない場合も、空集合上の下限を $+\infty$ と約束すれば同じ不等式が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

任意のMonge許容写像から同じ費用のKantorovich許容結合が得られるので、後者の最小化ではより多くの候補を比較できます。

<!-- proof-start -->
### 証明

Monge許容写像 $T$ を任意に取ります。[グラフ結合への埋め込み](#prop-otr2-graph)から $\pi_T\in\Pi(\mu,\nu)$ で、その費用は $T$ の費用と一致します。従って、[本章のKantorovichの最適輸送問題](#def-otr2-kantorovich)で定義した下限より

$$
K_c(\mu,\nu)\le J_K(\pi_T)
=\int_Xc(x,T(x))\,d\mu(x).
$$

右辺を全てのMonge許容写像 $T$ について下限にすれば、$K_c\le M_c$ を得ます。許容写像がない場合は $M_c=+\infty$ なので、拡張非負実数の順序として不等式が成立します。$\square$
<!-- proof-end -->

## 5. 有限空間では行列で全条件を見られる

出発点 $x_1,\ldots,x_m$ と到着点 $y_1,\ldots,y_n$ の質量を

$$
\mu=\sum_{i=1}^m a_i\delta_{x_i},\qquad
\nu=\sum_{j=1}^n b_j\delta_{y_j}
$$

と書き、$a_i,b_j>0$、$\sum_i a_i=\sum_j b_j=1$ とします。各組へ送る質量を $p_{ij}:=\pi(\{(x_i,y_j)\})$ とすれば、行 $i$ は出発点 $x_i$ からの配分、列 $j$ は到着点 $y_j$ へ届く配分です。したがって周辺条件が行和・列和となる理由が分かります。

<a id="prop-otr2-finite-criterion"></a>

<!-- formal-statement-start -->
> **命題（有限原子での写像と結合の判別）**
> 相異なる有限個の点 $x_i$、$y_j$ に正の質量 $a_i$、$b_j$ を持つ確率測度 $\mu,\nu$ を上のように与える。このとき $\pi\in\Pi(\mu,\nu)$ と各成分が $0$ 以上の行列 $P=(p_{ij})$ で次を満たすものは一対一に対応する。

$$
p_{ij}\ge0,\qquad
\sum_{j=1}^n p_{ij}=a_i,\qquad
\sum_{i=1}^m p_{ij}=b_j.
$$

> このような $P$ を**輸送行列**という。対応する結合がある輸送写像のグラフ結合であるための必要十分条件は、各行で正の成分がちょうど一つであることである。その成分は対応する $a_i$ に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

第1・第2周辺を各一元集合で評価すれば行和・列和が出ます。写像は各出発点の行全体を一列に置くので、行ごとに正の成分が一つです。逆にそのような行列は列の位置から写像を復元できます。

<!-- proof-start -->
### 証明

有限空間では、結合測度は非負の原子質量 $p_{ij}$ で完全に決まります。第1周辺を $\{x_i\}$ で評価すると

$$
\mu(\{x_i\})=\pi(\{x_i\}\times Y)
=\sum_j\pi(\{(x_i,y_j)\})=\sum_jp_{ij}.
$$

同様に第2周辺を $\{y_j\}$ で評価すると $\sum_i p_{ij}=b_j$ です。逆に各成分が $0$ 以上の行列がこれらを満たせば、全質量は $\sum_{ij}p_{ij}=\sum_i a_i=1$ で、任意の部分集合について和を取ることで両周辺条件が成り立ちます。よって一対一対応が得られます。

もし $\pi=\pi_T$ なら、出発点 $x_i$ の質量は組 $(x_i,T(x_i))$ のみに置かれます。$a_i>0$ だから行 $i$ に正の成分は一つで、その値は $a_i$ です。逆に各行の唯一の正成分の列番号を $j(i)$ として $T(x_i)=y_{j(i)}$ と定めます。有限集合上の写像は可測であり、列和条件から

$$
(T_{\#}\mu)(\{y_j\})
=\sum_{i:j(i)=j}a_i=\sum_i p_{ij}=b_j
$$

です。したがって $T_{\#}\mu=\nu$ で、$\pi$ は $T$ のグラフ結合に一致します。$\square$
<!-- proof-end -->

費用 $c_{ij}:=c(x_i,y_j)$ が有限なら、輸送行列の総費用は

$$
J_K(P)=\sum_{i=1}^m\sum_{j=1}^n c_{ij}p_{ij}.
$$

これは各組の単位費用に、その組へ運ぶ質量を掛けた総和です。行列の最適化を一般にどう解くかは、後の有限次元線形計画の章で詳しく扱います。

### 定義の確認：分割で費用が真に下がる

三つの出発点に質量 $(1/2,1/4,1/4)$、二つの到着点に質量 $(1/2,1/2)$ を置きます。行は $x_1,x_2,x_3$、列は $y_1,y_2$ の順とし、単位費用の行列を

$$
C=\begin{pmatrix}
0&2\\
0&4\\
4&0
\end{pmatrix}
$$

とします。Monge写像では質量 $1/2$ の $x_1$ を $y_1$ へ運ぶか、$y_2$ へ運ぶかの二通りだけです。前者では $x_2,x_3$ を $y_2$ へ送るので費用は $4/4=1$、後者では $x_2,x_3$ を $y_1$ へ送るので費用は $2/2+4/4=2$ です。従ってMongeの最小費用は $1$ です。

しかし次の輸送行列では、$x_1$ の質量を二列へ分割できます。

$$
P_*=\begin{pmatrix}
1/4&1/4\\
1/4&0\\
0&1/4
\end{pmatrix}.
$$

各行和は $(1/2,1/4,1/4)$、各列和は $(1/2,1/2)$ で、[有限原子での写像と結合の判別](#prop-otr2-finite-criterion)により許容結合です。その費用は

$$
J_K(P_*)=2\cdot\frac14=\frac12.
$$

これがKantorovichの最小費用でもあることを確かめましょう。任意の許容行列 $P$ では、第2列に必要な質量は $1/2$ ですが、第3行からそこへ送れるのは高々 $1/4$ です。よって

$$
p_{12}+p_{22}=\frac12-p_{32}\ge\frac14.
$$

非零費用の組に着目すると

$$
J_K(P)=2p_{12}+4p_{22}+4p_{31}
\ge 2(p_{12}+p_{22})\ge\frac12.
$$

$P_*$ はこの下界を達成するので、

$$
K_c(\mu,\nu)=\frac12<1=M_c(\mu,\nu).
$$

**Monge写像が存在する場合ですら、分割を認めると費用が真に改善する**ことが分かりました。Kantorovich問題はMonge問題の単なる記法変更ではありません。

## 6. 結合で解決したこと、まだ残ること

結合によって任意の二つの確率測度の間で輸送自体は可能になり、Monge写像の費用を超えない下限が得られました。しかし一般の可測空間では、その下限を実現する結合があるとは限りません。また結合が存在しても、費用の積分がすべて $+\infty$ となる場合があります。

次講では、空間のコンパクト性や費用に対する適切な連続性の仮定から、**最適結合の存在**をどのように証明できるかを学びます。

## 演習

### OTR2-A01 行と列で周辺条件を確認する
- Level: A
- 目安時間: 12分

$X=\{x_1,x_2\}$、$Y=\{y_1,y_2\}$ の各部分集合を可測とする。両周辺分布はそれぞれ $(1/2,1/2)$ であり、輸送行列を

$$
P=\begin{pmatrix}1/4&1/4\\1/4&1/4\end{pmatrix}
$$

とする。これが結合を定めることを確かめ、費用行列 $C=\begin{pmatrix}0&1\\2&0\end{pmatrix}$ に対する総費用を求めよ。またグラフ結合か判定せよ。

<!-- solution-start -->
#### 詳細解答

四成分はいずれも非負で、行和は $1/4+1/4=1/2$ が二行、列和も $1/4+1/4=1/2$ が二列です。全質量は $1$ であり、[有限原子での写像と結合の判別](#prop-otr2-finite-criterion)から $\Pi(\mu,\nu)$ に属します。

$$
J_K(P)=0\cdot\frac14+1\cdot\frac14
+2\cdot\frac14+0\cdot\frac14=\frac34.
$$

各行に正の成分が二つあるので、同命題のグラフ結合の必要十分条件を満たしません。
<!-- solution-end -->

### OTR2-A02 一つの原子を分割する
- Level: A
- 目安時間: 12分

$X=\{0\}$、$Y=\{1,3\}$ とし、$\mu=\delta_0$、$\nu=\frac13\delta_1+\frac23\delta_3$ とする。結合をすべて求め、$c(x,y)=|x-y|$ の最適費用を計算せよ。輸送写像が存在するかも答えよ。

<!-- solution-start -->
#### 詳細解答

第1周辺が $\delta_0$ なので、結合の質量は $(0,1)$ と $(0,3)$ にだけ置けます。第2周辺が各点の質量を固定するので唯一の結合は

$$
\pi=\frac13\delta_{(0,1)}+\frac23\delta_{(0,3)}
$$

です。両係数は非負、和は $1$、両射影の押し出しは $\mu,\nu$ だから確かに許容結合です。唯一なので最適であり、

$$
K_c(\mu,\nu)=\frac13\cdot1+\frac23\cdot3=\frac73.
$$

輸送写像なら $T(0)$ は $1$ または $3$ のどちらか一つです。その押し出しは $\delta_1$ または $\delta_3$ となり $\nu$ と一致しません。従ってMonge許容写像はありません。
<!-- solution-end -->

### OTR2-A03 積測度を有限行列で作る
- Level: A
- 目安時間: 12分

$X=\{0,1\}$ 上の $\mu=\frac14\delta_0+\frac34\delta_1$ と、$Y=\{a,b\}$ 上の $\nu=\frac35\delta_a+\frac25\delta_b$ を考える。積測度 $\mu\times\nu$ の行列を求め、両周辺を確認せよ。これがグラフ結合かも判定せよ。

<!-- solution-start -->
#### 詳細解答

[σ有限測度の積測度](../../F0/F0-00D2C/index.md#thm-f0-00d2c-01)を、各一元集合の長方形 $\{x_i\}\times\{y_j\}$ に適用すると、各成分は行の質量と列の質量の積です。

$$
P=\begin{pmatrix}
(1/4)(3/5)&(1/4)(2/5)\\
(3/4)(3/5)&(3/4)(2/5)
\end{pmatrix}
=\begin{pmatrix}
3/20&1/10\\
9/20&3/10
\end{pmatrix}.
$$

行和は $3/20+2/20=1/4$、$9/20+6/20=3/4$ です。列和は $3/20+9/20=3/5$、$1/10+3/10=2/5$ です。従って結合の両周辺は指定どおりです。各行に正成分が二つあり、[有限原子での写像と結合の判別](#prop-otr2-finite-criterion)からグラフ結合ではありません。
<!-- solution-end -->

### OTR2-A04 輸送写像のグラフを行列へ直す
- Level: A
- 目安時間: 12分

$X=\{0,1,2\}$、$Y=\{0,1\}$、$\mu=\frac15\delta_0+\frac3{10}\delta_1+\frac12\delta_2$ とし、$T(0)=1$、$T(1)=T(2)=0$ とする。$T_{\#}\mu$、グラフ結合の行列、$c(x,y)=|x-y|$ の総費用を求めよ。

<!-- solution-start -->
#### 詳細解答

$T^{-1}(\{0\})=\{1,2\}$、$T^{-1}(\{1\})=\{0\}$ なので、[輸送写像の定義](../OTR1/index.md#def-otr1-transport-map)から

$$
T_{\#}\mu=\left(\frac3{10}+\frac12\right)\delta_0+\frac15\delta_1
=\frac45\delta_0+\frac15\delta_1.
$$

行を $0,1,2$、列を $0,1$ の順にすると

$$
P_T=\begin{pmatrix}
0&1/5\\
3/10&0\\
1/2&0
\end{pmatrix}.
$$

各行は一つの列にだけ質量を持ち、列和は $(4/5,1/5)$ です。[グラフ結合への埋め込み](#prop-otr2-graph)により、行列の費用は写像の費用と等しく、

$$
J_K(P_T)=\frac15|0-1|
+\frac3{10}|1-0|+\frac12|2-0|
=\frac15+\frac3{10}+1=\frac32.
$$
<!-- solution-end -->

### OTR2-B01 同じ周辺でも結合の費用は異なる
- Level: B
- 目安時間: 25分

$X=Y=[0,1]$ にBorel集合を入れ、$\mu=\nu$ を $[0,1]$ の一様確率測度とする。対角結合 $\pi_{\mathrm d}=(\mathrm{id},\mathrm{id})_{\#}\mu$ と積結合 $\pi_{\mathrm p}=\mu\times\mu$ がともに許容であることを示し、$c(x,y)=|x-y|$ の費用を両方計算せよ。

<!-- solution-start -->
#### 詳細解答

恒等写像は可測で、$\mathrm{id}_{\#}\mu=\mu$ です。[グラフ結合への埋め込み](#prop-otr2-graph)により $\pi_{\mathrm d}$ は結合です。[結合の非空性](#prop-otr2-nonempty)の証明から $\pi_{\mathrm p}$ も結合です。

対角結合では $y=x$ だけへ運ぶので、[押し出し積分公式](../../F0/F0-00P3D/index.md#thm-f0-00p3d-pushforward-integration)を使い

$$
J_K(\pi_{\mathrm d})=\int_0^1|x-x|\,dx=0.
$$

積結合では[非負関数に対するTonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)を使えます。$|x-y|$ は非負可測で、積分を二つの三角形へ分け、対称性を使うと

$$
\begin{aligned}
J_K(\pi_{\mathrm p})
&=\int_0^1\int_0^1|x-y|\,dx\,dy\\
&=2\int_0^1\int_0^y(y-x)\,dx\,dy\\
&=2\int_0^1\left[yx-\frac{x^2}{2}\right]_{x=0}^{x=y}\,dy\\
&=2\int_0^1\frac{y^2}{2}\,dy=\frac13.
\end{aligned}
$$

費用は非負なので $K_c(\mu,\mu)=0$ であり、対角結合が最適です。同じ周辺でも費用は結合の選び方で変わります。
<!-- solution-end -->

### OTR2-B02 二対二の輸送行列を一変数で調べる
- Level: B
- 目安時間: 25分

$X=\{x_1,x_2\}$、$Y=\{y_1,y_2\}$、出発質量 $(3/5,2/5)$、到着質量 $(1/2,1/2)$、費用行列

$$
C=\begin{pmatrix}0&3\\2&0\end{pmatrix}
$$

を考える。すべての許容輸送行列を $t=p_{11}$ で表し、$t$ の範囲と最適費用・最適行列を求めよ。積結合の費用とも比較せよ。

<!-- solution-start -->
#### 詳細解答

第1行和から $p_{12}=3/5-t$、第1列和から $p_{21}=1/2-t$ です。第2行和から

$$
p_{22}=\frac25-p_{21}
=\frac25-\left(\frac12-t\right)=t-\frac1{10}.
$$

従ってすべての許容行列は

$$
P(t)=\begin{pmatrix}
t&3/5-t\\
1/2-t&t-1/10
\end{pmatrix}
$$

です。四成分の非負条件をそれぞれ書くと、$t\ge0$、$t\le3/5$、$t\le1/2$、$t\ge1/10$。合わせて $1/10\le t\le1/2$ です。列和・行和は構成時に確認済みです。

費用は

$$
\begin{aligned}
J_K(P(t))
&=3\left(\frac35-t\right)
+2\left(\frac12-t\right)\\
&=\frac{14}{5}-5t.
\end{aligned}
$$

係数 $-5$ は負なので、区間の右端 $t=1/2$ で最小となります。

$$
P_*=\begin{pmatrix}1/2&1/10\\0&2/5\end{pmatrix},
\qquad K_c(\mu,\nu)=\frac3{10}.
$$

積結合では $p_{11}=(3/5)(1/2)=3/10$ なので、

$$
J_K(\mu\times\nu)=\frac{14}{5}-5\cdot\frac3{10}=\frac{13}{10}.
$$

積測度は許容ですが、最適結合ではありません。
<!-- solution-end -->

### OTR2-B03 行ごとの分割と写像可能性
- Level: B
- 目安時間: 25分

$X=\{x_1,x_2\}$、$Y=\{y_1,y_2\}$ に各部分集合を可測とし、$\mu=\frac12\delta_{x_1}+\frac12\delta_{x_2}$、$\nu=\frac14\delta_{y_1}+\frac34\delta_{y_2}$ とする。輸送写像が存在しない理由を証明し、許容結合を一つ構成せよ。その結合がグラフ結合でないことも示せ。

<!-- solution-start -->
#### 詳細解答

輸送写像なら、各 $x_i$ にある質量 $1/2$ を一つの到着点へ丸ごと送ります。従って $T_{\#}\mu(\{y_1\})$ は $0,1/2,1$ のどれかです。指定値 $\nu(\{y_1\})=1/4$ はこのいずれでもありません。[有限原子測度の質量保存則](../OTR1/index.md#prop-otr1-atomic-mass-balance)からMonge許容写像は存在しません。

一方、

$$
P=\begin{pmatrix}
1/4&1/4\\
0&1/2
\end{pmatrix}
$$

と置けば、非負の成分の行和は $(1/2,1/2)$、列和は $(1/4,3/4)$ です。[有限原子での写像と結合の判別](#prop-otr2-finite-criterion)により許容結合です。第1行は二つの正成分を持つので、同命題からグラフ結合ではありません。
<!-- solution-end -->

### OTR2-C01 費用パラメータが分割の価値を決める
- Level: C
- 目安時間: 40分

出発質量を $(1/2,1/4,1/4)$、到着質量を $(1/2,1/2)$ とする三対二の有限輸送で、費用行列を

$$
C_{a,b}=\begin{pmatrix}
0&a\\
0&b\\
b&0
\end{pmatrix},\qquad a,b>0
$$

とする。

1. Mongeの許容写像をすべて挙げ、最小費用を求めよ。
2. 任意の許容結合に対する費用の下界を導き、Kantorovichの最小費用を求めよ。
3. 分割による厳密な改善が起きる条件と、最適結合を各場合に一つ示せ。

<!-- solution-start -->
#### 詳細解答

**1. Mongeの候補。** 出発点 $x_1$ の質量は $1/2$ で、到着側の各質量も $1/2$ です。$T(x_1)=y_1$ なら $x_2,x_3$ は $y_2$ へ行かなければならず、その費用は

$$
\frac12\cdot0+\frac14\cdot b+\frac14\cdot0=\frac b4.
$$

$T(x_1)=y_2$ なら残りの二点は $y_1$ へ行き、費用は

$$
\frac12a+\frac14\cdot0+\frac14b=\frac a2+\frac b4.
$$

$a>0$ だから前者が小さく、Mongeの最小費用は $M_c=b/4$ です。この二通り以外は各到着点に必要な質量 $1/2$ を満たしません。

**2. Kantorovichの下界。** 任意の許容行列 $P=(p_{ij})$ では、第2列の列和と第3行の行和から

$$
p_{12}+p_{22}=\frac12-p_{32}\ge\frac14.
$$

また $a,b>0$ と $p_{31}\ge0$ により

$$
\begin{aligned}
J_K(P)&=a p_{12}+b p_{22}+b p_{31}\\
&\ge \min(a,b)(p_{12}+p_{22})\\
&\ge \frac{\min(a,b)}4.
\end{aligned}
$$

下界を実現できることを次に確かめます。

**3. 最適行列と厳密な差。** $a\le b$ なら

$$
P_{\mathrm{split}}=
\begin{pmatrix}
1/4&1/4\\
1/4&0\\
0&1/4
\end{pmatrix}
$$

は行和 $(1/2,1/4,1/4)$、列和 $(1/2,1/2)$ を持つので許容です。費用は $a/4$ で、下界と一致します。

$b\le a$ なら

$$
P_{\mathrm{map}}=
\begin{pmatrix}
1/2&0\\
0&1/4\\
0&1/4
\end{pmatrix}
$$

が許容で、費用は $b/4$ です。こちらも下界と一致し、各行の正成分は一つなのでMonge写像から来ます。

従って、$a=b$ の場合も含めて

$$
K_c(\mu,\nu)=\frac{\min(a,b)}4,\qquad
M_c(\mu,\nu)=\frac b4.
$$

厳密な改善 $K_c<M_c$ が起きるのは **$a<b$ のとき、かつそのときに限る** ことが分かります。$a=b$ では分割する最適結合と分割しない最適結合が両方存在します。
<!-- solution-end -->
