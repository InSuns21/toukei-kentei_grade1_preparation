# MQFC22 格子ゲージ場の反射陽性

[MQFC21 の Wilson格子ゲージ測度](../MQFC21/index.md#def-mqfc21-measure) は有限格子上の確率測度を与える。しかし確率が正であることと、時間反転を挟んだ相関が非負であることは別の条件である。[MQFC8 の正時間多項式の反射形式](../MQFC8/index.md#def-mqfc8-reflection-positivity) と同じ問いを群値の辺変数について考える。今回は時間方向の中央で格子を切り、切断面を横切る正方形の重みを左右の行列要素に分解する。

## 1. 時間反転でどの辺が移るか

格子間隔を単位に取り、頂点集合を $\{1-L,\ldots,L\}\times X$ とする。

$L\ge1$ は整数、$X$ は $\mathbb Z^{d-1}$ の有限長方形（$d\ge2$）である。

隣接頂点を結ぶ辺と [基本正方形](../MQFC19/index.md#def-mqfc19-plaquette) を全て置き、格子の外へ出る辺や周期的につなぐ辺は置かない（自由境界）。

群はコンパクト部分群 $G\subset U(N)$、$N\ge1$ とする。

辺の向きと積順序は [MQFC19 の群値辺接続](../MQFC19/index.md#def-mqfc19-link) に従う。

後から通る辺を左に掛け、逆向きは逆元で表す。

時刻 $t$ を $1-t$ に写す反転を $r$ とする。

時刻 $t\ge1$ の頂点だけを結ぶ辺を正側、$t\le0$ の頂点だけを結ぶ辺を負側と呼ぶ。

時刻0から1への辺はどちらにも入れず、横切る辺として区別する。

反転した配置 $rU$ は有向辺 $e$ に対して $(rU)_e=U_{re}$ と定める。

時間方向の正向き辺は反転すると負向きになるため逆元を取るが、空間方向の辺は向きが変わらない。

$r^2e=e$ なので $(r(rU))_e=U_e$ である。

配置空間は正向き辺集合 $E_+$ に対する有限直積 $G^{E_+}$ で、各座標は一つの辺の値である。Borel 集合はこの直積位相の開集合から可算和と補集合で生成される。この可測構造に関して可測であることを Borel 可測という。

正側の辺だけに依存する有界 Borel 可測複素関数全体を $\mathcal A_+$ とする。和・積・複素共役に閉じ、定数を含む。複素共役と反転を合わせた操作を $\Theta$ と書く。$\Theta F$ は負側の辺だけに依存する。反転不変な測度とは、任意の有界可測関数 $H$ について

$$
\int H(rU)\,d\mu(U)=\int H(U)\,d\mu(U)
$$

となる測度である。ここで $d\mu(U)$ は配置 $U$ を動かす積分測度を表し、微分ではない。

普通の二乗平均では同じ配置の値を掛けるが、ここでは反転した配置の値を共役にして掛ける。その全関数に対する非負性を調べたい。

Wilson測度に関しては [Wilson格子作用の不変性と有界性](../MQFC21/index.md#prop-mqfc21-action-invariance) により正方形の向きや基点に依存しないので、反転で正方形を入れ替えても作用が変わらない。[正規化Haar積分の変数変換](../MQFC20/index.md#prop-mqfc20-haar-transform) により辺の置換と逆元化は積測度を保つ。従って Wilson測度も反転で不変である。

<a id="def-mqfc22-lattice-reflection"></a>

<!-- formal-statement-start -->
> **定義（格子の反射形式）**
> 上記の格子と反転 $r$ 上の反転不変な確率測度 $\mu$ に対し、$F,G_1\in\mathcal A_+$ の反射形式を

$$
\Theta F(U)=\overline{F(rU)},\qquad
(F,G_1)_r=\int \Theta F(U)G_1(U)\,d\mu(U)
$$

> と定める。全ての $F\in\mathcal A_+$ で $(F,F)_r\ge0$ なら、この反転に関して反射陽性であるという。
<!-- formal-statement-end -->

有界性で積分が有限となる。反転不変性と $r^2=1$ を用いると

$$
\overline{(G_1,F)_r}
=\int G_1(rU)\overline{F(U)}\,d\mu(U)
=(F,G_1)_r.
$$

積分の線形性と複素共役の規則から、第1変数について共役線形、第2変数について線形である。上の引数交換の性質と合わせて Hermite 形式となる。[正定値 Hermite 内積](../../../代数系/LREP/LREP2/index.md#def-lrep2-invariant-inner-product) と共役線形性・対称性は共通だが、ここでは非零関数に対する厳密な正値性を要求していない。反転不変性だけでは非負性もまだ保証されない。

<!-- definition-example-start: def-mqfc22-lattice-reflection -->
**定義の確認**。[Wilson格子ゲージ測度の定義](../MQFC21/index.md#def-mqfc21-measure) で $\beta=0$ とすると $Z_0=1$ であり、測度 $\mu_0$ は積Haar確率測度そのものである。従って全正向き辺が独立な Haar 分布を持つ。[Haar積分の変数変換](../MQFC20/index.md#prop-mqfc20-haar-transform) により反転は測度を保つ。正側と負側は辺を共有しないので、$F(U)$ と $F(rU)$ は独立であり、反転不変性から同じ平均を持つ。横切る辺に依存しないので、その積分は1となる。これにより任意の $F\in\mathcal A_+$ に対し

$$
(F,F)_r=\overline{\int F\,d\mu_0}\int F\,d\mu_0
=\left|\int F\,d\mu_0\right|^2.
$$

従って非負である。

例えば $G=U(1)$ で正側に少なくとも一本の辺がある格子を取り、その辺の値を $u$ として $F(u)=1+u$ とする。この関数は連続で絶対値が2以下、正側の辺だけに依存するため $\mathcal A_+$ に属する。

$du$ は $u=e^{i\theta}$ の角度 $\theta\in[0,2\pi)$ の正規化一様測度に対応する。従って

$$
\int_{U(1)}u\,du
=\frac1{2\pi}\int_0^{2\pi}e^{i\theta}\,d\theta
=\frac{e^{2\pi i}-1}{2\pi i}=0.
$$

平均が1なので反射形式は $|1|^2=1$ である。

一方 $F(u)=u$ の反射形式は0だが普通の二乗平均は1である。

定義域の全関数で非負であっても、零になる非零関数が存在する。
<!-- definition-example-end -->

単に反転不変というだけでは足りない。

二値 $a,b\in\{1,-1\}$ が常に $b=-a$ を満たし、$a$ は一様とする。

交換 $(a,b)\mapsto(b,a)$ で確率は変わらないが、正側の $F(a)=a$ に対して $E[ba]=-1$ となる。

左右を結ぶ重みの符号構造が必要である。

## 2. 一つの正方形の重みを指標で分解する

[Wilson格子作用](../MQFC21/index.md#def-mqfc21-action) の一正方形の寄与は $1-\operatorname{Re}\operatorname{tr}g/N$ である。ここから $\beta\ge0$ のもとで指数を取り、各正方形の定数因子 $e^{-\beta}$ を除くと、重みは

$$
w_\beta(g)=\exp\left(\frac{\beta}{N}\operatorname{Re}\operatorname{tr}g\right)
$$

となる。ここで $g\in G$ は周回積である。$g^{-1}=g^\dagger$（$\dagger$ は共役転置）なので $\operatorname{tr}g^{-1}=\overline{\operatorname{tr}g}$ であり、実部は変わらない。共役変換でもトレースは変わらない。

[表現の指標](../MQFC20/index.md#def-mqfc20-character) は表現行列のトレースである。$D(g)=g$ を $\mathbb C^N$ の標準正規直交基底で表した自然な $N$ 次元 [ユニタリ表現](../../../代数系/LREP/LREP2/index.md#def-lrep2-invariant-inner-product)、$\overline D(g)=\overline g$ を [複素共役表現](../../../代数系/LREP/LREP4/index.md#def-lrep4-conjugate) の対応する基底での行列とする。成分の共役は積を保ち、共役行列もユニタリなので後者も連続ユニタリ表現である。

二つの群元 $a,b$ があるとき、指標を $b^{-1}a$ に適用すると左右の行列要素に分かれる。

例えば一次元の $U(1)$ で $\chi_n(g)=g^n$（$n$ は整数）なら $\chi_n(b^{-1}a)=\overline{b^n}a^n$ である。

係数が非負ならその積分は絶対値二乗の和にできる。

以下では非零の真の不変部分空間を持たない [既約表現](../../../代数系/LREP/LREP1/index.md#def-lrep1-irreducible) を使う。[表現の同値](../../../代数系/LREP/LREP1/index.md#def-lrep1-equivalence) は可逆な絡作用素が存在することであり、同値な表現の指標は相似変換でトレースが変わらないため一致する。各同値類から一つを選び、その正規直交基底を固定する。

<a id="thm-mqfc22-character-expansion"></a>

<!-- formal-statement-start -->
> **定理（Wilson重みの非負指標展開）**
> コンパクト部分群 $G\subset U(N)$ と $\beta\ge0$ に対し、有限次元連続既約ユニタリ表現の高々可算な同値類代表の集合 $R$ と係数 $c_\rho\ge0$ が存在し、

$$
w_\beta(g)=\sum_{\rho\in R}c_\rho\chi_\rho(g),
\qquad
\sum_{\rho\in R}c_\rho d_\rho=e^\beta
$$

> が成立する。$d_\rho$ は $\rho$ の次元であり、級数は絶対かつ一様に収束する。
<!-- formal-statement-end -->

指数関数を展開すると指標の積が非負係数で現れる。積はテンソル積の指標なので、有限次元表現の分解を各項に施せばよい。無限の指標全体の完全性を仮定する必要はない。

<!-- proof-start -->
### 証明

実部を二つの指標に分けると

$$
w_\beta(g)=
\exp\left(\frac{\beta}{2N}\chi_D(g)\right)
\exp\left(\frac{\beta}{2N}\chi_{\overline D}(g)\right).
$$

指数級数の積を $k,l\ge0$ で展開する。

$$
w_\beta(g)=\sum_{k,l\ge0}a_{kl}
\chi_D(g)^k\chi_{\overline D}(g)^l,
\quad
a_{kl}=\frac{(\beta/(2N))^{k+l}}{k!l!}.
$$

零次の冪は1とする。ユニタリ行列の各列の二乗ノルムは1なので各対角成分の絶対値は1以下であり、各指標の絶対値は $N$ 以下である。従って項の絶対値は $a_{kl}N^{k+l}$ 以下であり、その総和は

$$
\sum_{k,l\ge0}a_{kl}N^{k+l}
=\left(\sum_{k\ge0}\frac{(\beta/2)^k}{k!}\right)^2=e^\beta.
$$

従って積の展開と一様収束が正当化される。

[表現のテンソル積](../../../代数系/LREP/LREP4/index.md#def-lrep4-tensor-product) の基底で、二つの表現行列 $D_1,D_2$ のテンソル積の対角成分は $(D_1)_{ii}(D_2)_{jj}$ になる。従って

$$
\operatorname{tr}(D_1\otimes D_2)
=\sum_{i,j}(D_1)_{ii}(D_2)_{jj}
=\operatorname{tr}D_1\,\operatorname{tr}D_2.
$$

この式を繰り返せば指標の積はテンソル積の指標になる。そこで $D^{\otimes k}\otimes\overline D^{\otimes l}$ を考える。これは次元 $N^{k+l}$ のユニタリ表現である。[完全可約性](../../../代数系/LREP/LREP2/index.md#thm-lrep2-complete-reducibility) により既約表現に有限直和分解する。各不変部分空間への制限は元の内積を保存するので、正規直交基底を取ればユニタリ表現となる。各同値類の出現回数（重複度）を $m_{kl,\rho}$ とすれば、トレースと次元の直和加法性から

$$
\chi_D^k\chi_{\overline D}^l=\sum_\rho m_{kl,\rho}\chi_\rho,
\qquad
\sum_\rho m_{kl,\rho}d_\rho=N^{k+l}.
$$

全 $(k,l)$ に現れる同値類を合わせた集合 $R$ は可算である。$c_\rho=\sum_{k,l}a_{kl}m_{kl,\rho}$ と置く。非負項の和の順序交換により

$$
\sum_\rho c_\rho d_\rho
=\sum_{k,l}a_{kl}N^{k+l}=e^\beta.
$$

$|\chi_\rho(g)|\le d_\rho$ なので絶対一様収束が成り立ち、二重級数を同値類ごとにまとめてよい。これで表示を得る。
<!-- proof-end -->

例えば $G=\{1,-1\}\subset U(1)$ では

$$
e^{\beta g}=\cosh\beta+g\sinh\beta.
$$

$g=1,-1$ を代入すれば両辺が一致する。定数指標と符号指標はいずれも一次元であり、$\beta\ge0$ なら係数は非負、和は $e^\beta$ である。

## 3. 左右の行列要素への分解

表現 $\rho:G\to U(d_\rho)$ の固定した正規直交基底で、$\rho_{ij}(a)$ は群元 $a$ の作用行列の第 $i$ 行・第 $j$ 列の成分を表す。ユニタリ性は $\rho(b)^\dagger\rho(b)=I$ であり、逆元の表現を共役転置にできる理由である。左右の配置の積をこの成分で展開すると、積分を二つの平均の積に分けられる。

<a id="prop-mqfc22-character-factorization"></a>

<!-- formal-statement-start -->
> **命題（指標による左右因子分解）**
> $G\subset U(N)$ をコンパクト部分群とし、$\rho$ を $d_\rho$ 次元連続ユニタリ表現とする。任意の $a,b\in G$ に対して

$$
\chi_\rho(b^{-1}a)=
\sum_{i,j=1}^{d_\rho}\overline{\rho_{ij}(b)}\rho_{ij}(a).
$$

> 従って$G$ 上の同じ有限正 Borel 測度 $\nu$ で $a,b$ を別々に積分する場合、任意の有界 Borel 可測複素関数 $f:G\to\mathbb C$ に対して

$$
\int\overline{f(b)}f(a)\chi_\rho(b^{-1}a)\,d\nu(a)d\nu(b)
=\sum_{i,j}\left|\int f(a)\rho_{ij}(a)\,d\nu(a)\right|^2.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

ユニタリ性と表現の積の規則により $\rho(b^{-1}a)=\rho(b)^\dagger\rho(a)$ である。対角成分を展開すると

$$
(\rho(b)^\dagger\rho(a))_{jj}
=\sum_i\overline{\rho_{ij}(b)}\rho_{ij}(a).
$$

$j$ について足すと指標になる。有限和の各項を積分する際には $f$ と行列要素が有界で測度が有限だから [Fubini の定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02) を適用できる。各 $(i,j)$ の項は

$$
\begin{aligned}
&\int_G\int_G\overline{f(b)\rho_{ij}(b)}
 f(a)\rho_{ij}(a)\,d\nu(a)d\nu(b)\\
&=\overline{\int_G f(b)\rho_{ij}(b)\,d\nu(b)}
 \int_G f(a)\rho_{ij}(a)\,d\nu(a).
\end{aligned}
$$

積分変数の名前以外は同じなので、これは絶対値二乗である。
<!-- proof-end -->

非負係数を掛けて足せば Wilson重みでも同じ非負性が得られる。ただし格子には切断面を横切る辺もある。その辺を無視して左右の因子を分離してはいけない。

## 4. 横切る辺を積分してから正値性を示す

正側の辺配置を $A$、負側を反転によって正側と同じラベル・向きに直した配置を $B$ とする。

各半分の積Haar確率測度を $dA,dB$ と書く。

横切る辺は $x\in X$ ごとに一本あり、$(0,x)$ から $(1,x)$ への群元を $c_x$ とする。

その積Haar確率測度は $dc$ である。

辺の置換・逆元化は [Haar積分の変数変換](../MQFC20/index.md#prop-mqfc20-haar-transform) により測度を保つから、基準測度は $dA\,dB\,dc$ となる。

$F$ の反射は $\overline{F(B)}$ である。

切断面に接する時刻1の各空間辺には正向きを一つ選ぶ。その始点と終点の空間座標を $x,y$ とし、辺を $e=(x,y)$ と書く。群元を $A_e$、対応する時刻0の空間辺を $B_e$ とする。

切断面を横切る正方形を下の $x$ から順に上の $x$、上の $y$、下の $y$、下の $x$ へ進むと、後から通る辺が左に来るので周回積は

$$
B_e^{-1}c_y^{-1}A_ec_x.
$$

各 $c_x$ を固定したとき、正側の時刻1の頂点に $c_x^{-1}$、それ以外の正側頂点に単位元を置くゲージ変換を $A\mapsto T_{c^{-1}}A$ と書く。

[MQFC19 の頂点ゲージ変換](../MQFC19/index.md#def-mqfc19-vertex-gauge) の端点規則に従えば、新しい空間辺は $c_y^{-1}A_ec_x$ である。

一般に境界の頂点 $(1,x)$ に $s_x$、それ以外に単位元を置く頂点変換を $T_s$ とする。$c^{-1}$ は各成分を逆元にした割当てである。この変換で横切る正方形の重みから $c$ を取り除ける。

<a id="thm-mqfc22-wilson-reflection"></a>

<!-- formal-statement-start -->
> **定理（自由境界Wilson測度の反射陽性）**
> $L\ge1$ を整数、$X\subset\mathbb Z^{d-1}$ を有限長方形（$d\ge2$）とする。
>
> 頂点集合 $\{1-L,\ldots,L\}\times X$ の自由境界格子上で、コンパクト部分群 $G\subset U(N)$ と $\beta\ge0$ の Wilson測度 $\mu_\beta$ を取る。
>
> $r(t,x)=(1-t,x)$ とし、$\mathcal A_+$ を正側の辺のみの有界可測複素関数全体とする。
>
> このとき全ての $F\in\mathcal A_+$ で

$$
\int\overline{F(rU)}F(U)\,d\mu_\beta(U)\ge0.
$$
<!-- formal-statement-end -->

証明の鍵は二つある。まず横切る辺を正側の頂点変換に吸収し、残った積分を正負両側の同じ平均に変える。次に横切る正方形ごとに非負指標展開を使えば、全ての項が絶対値二乗になる。

<!-- proof-start -->
### 証明

[Wilson測度の構成](../MQFC21/index.md#thm-mqfc21-measure) で $Z_\beta>0$ が分かっている。全基本正方形の集合を $P$ とし、各正方形の定数因子をまとめて $C=e^{-\beta |P|}/Z_\beta>0$ と置く。

正側に完全に含まれる正方形の $w_\beta$ の積を $h(A)$ とする。

負側の対応する積は $h(B)$ である（反転による周回の向きの差は実トレースに影響しない）。

$d\nu(A)=h(A)dA$ は有限正測度で、正側の任意の頂点変換で不変である。

[Wilson格子作用の不変性](../MQFC21/index.md#prop-mqfc21-action-invariance) と [積Haar測度のゲージ不変性](../MQFC20/index.md#prop-mqfc20-product-gauge) を正側に適用した。

$d\nu(B)$ も同じ測度である。

切断面上の空間辺集合を $E_X$ とする。全正方形は左右内部と、$e\in E_X$ ごとに一つ存在する横切る正方形に分かれる。従って反射形式は

$$
C\int\overline{F(B)}F(A)
\prod_{e\in E_X}w_\beta(B_e^{-1}c_y^{-1}A_ec_x)
\,d\nu(A)d\nu(B)dc.
$$

空積は1とする。

$c$ を固定して $A'=T_{c^{-1}}A$ と変数変換する。

逆変換は $A=T_c A'$ である。

$\nu$ は不変なので、$A'$ を再び $A$ と書けば

$$
(F,F)_r=C\int\overline{F(B)}\,\widetilde F(A)
K(B,A)\,d\nu(A)d\nu(B),
$$

$$
\widetilde F(A)=\int F(T_c A)\,dc,\qquad
K(B,A)=\prod_{e\in E_X}w_\beta(B_e^{-1}A_e).
$$

$F$ は有界 Borel 可測で、群作用は連続、重みは有界である。測度も有限なので [Fubini の定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02) により積分順序を交換できる。任意の $s=(s_x)_{x\in X}\in G^X$ に対し [頂点ゲージ変換の作用則](../MQFC19/index.md#prop-mqfc19-action) から $T_cT_s=T_{cs}$（$cs$ は頂点ごとの積）である。[Haar積分の変数変換](../MQFC20/index.md#prop-mqfc20-haar-transform) を各 $c_x$ の右移動に適用して

$$
\widetilde F(T_s A)=\int F(T_{cs} A)\,dc
=\int F(T_{c'} A)\,dc'=\widetilde F(A).
$$

ここで $c'=cs$ とし、$A,s$ は固定して積分変数 $c$ だけを動かした。

同じ $T_s$ を両側へ施すと、各横切る因子の引数は

$$
(s_yB_es_x^{-1})^{-1}(s_yA_es_x^{-1})
=s_x B_e^{-1}A_e s_x^{-1}
$$

となる。

重みの共役不変性から $K(T_sB,T_sA)=K(B,A)$ である。

固定した $s$ に対して $A=T_s A_0$、$B=T_s B_0$ と置く。両変換は逆変換 $T_{s^{-1}}$ を持ち、測度 $\nu$ を保つ。$\widetilde F(T_s A_0)=\widetilde F(A_0)$ と核の同時不変性を代入すると

$$
(F,F)_r=C\int\overline{F(T_s B_0)}
\widetilde F(A_0)K(B_0,A_0)\,d\nu(A_0)d\nu(B_0).
$$

従って $A_0,B_0$ を再び $A,B$ と書けば、上の積分は $F(B)$ を $F(T_sB)$ に置き換えても変わらない。

これを $s$ の積Haar確率測度で平均して

$$
(F,F)_r=C\int\overline{\widetilde F(B)}\widetilde F(A)
K(B,A)\,d\nu(A)d\nu(B).
$$

ここで [Wilson重みの非負指標展開](#thm-mqfc22-character-expansion) と [指標による左右因子分解](#prop-mqfc22-character-factorization) を各 $e\in E_X$ に適用する。各辺の添字として $\rho_e$ および $1\le i_e,j_e\le d_{\rho_e}$ を選び、それらをまとめて $\lambda$ と書く。

$$
q_\lambda(A)=\prod_{e\in E_X}(\rho_e(A_e))_{i_e j_e},
\qquad
b_\lambda=\prod_{e\in E_X}c_{\rho_e}.
$$

有限個の辺について展開を掛けると

$$
K(B,A)=\sum_\lambda b_\lambda\overline{q_\lambda(B)}q_\lambda(A).
$$

交換を正当化するため、各 $\rho$ の行列要素に [Cauchy–Schwarz の不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を使う。ユニタリ性により $\sum_i|\rho_{ij}(a)|^2=1$ が各列 $j$ で成立する。$j$ について足せば各行列の全成分の絶対値二乗和は $d_\rho$ なので

$$
\sum_{i,j}|\rho_{ij}(b)\rho_{ij}(a)|
\le\sqrt{d_\rho d_\rho}=d_\rho.
$$

従って各辺の絶対和は $\sum_\rho c_\rho d_\rho=e^\beta$ 以下であり、全辺では $e^{\beta |E_X|}$ 以下である。有界な $\widetilde F$ と有限測度 $\nu$ に対して項別積分ができる。結果は

$$
(F,F)_r
=C\sum_\lambda b_\lambda
\left|\int \widetilde F(A)q_\lambda(A)\,d\nu(A)\right|^2
\ge0.
$$

$C>0$、$b_\lambda\ge0$ なので結論が得られた。
<!-- proof-end -->

例えば [格子 Wilson loop の不変性](../MQFC19/index.md#thm-mqfc19-wilson-invariance) により正側の閉路のトレースなら頂点変換で不変なので $\widetilde F=F$ となる。一方、正側の時刻1の開いた辺の行列要素は平均で消える場合がある。横切る辺の積分が境界頂点のゲージ平均を生むことは、次講で状態空間を構成する際に重要になる。

自由境界と反転の位置を明示したのは、固定境界や周期境界では切断面とゲージ変換の許される範囲を別に確認する必要があるためである。また、この非負性は有限格子の性質であり、連続極限の存在や質量ギャップの正の下界を与えるものではない。

## 5. 演習

### 演習 MQFC22-A1：反転と逆辺
- Level: A

時刻1から2への時間辺の値が $u$、時刻 $-1$ から0への時間辺の値が $v$ とする（$L\ge2$）。反転後の前者の値と二回反転後の値を求めよ。

<!-- solution-start -->
**詳細解答**。

時刻1は0へ、時刻2は $-1$ へ移る。

従って反転した辺は0から $-1$ への負向き辺である。

[群値辺接続](../MQFC19/index.md#def-mqfc19-link) の逆辺規則により値は $v^{-1}$。

後者の辺 $-1\to0$ は $2\to1$ に移るので反転後の値は $u^{-1}$ である。

反転した配置でも同じ逆辺規則が成り立つ。そこで再び $1\to2$ を反転すると、その値は $(u^{-1})^{-1}=u$ に戻る。
<!-- solution-end -->

### 演習 MQFC22-A2：二値群の指標展開
- Level: A

$G=\{1,-1\}\subset U(1)$ で $\beta\ge0$ とし、$w_\beta$ を $c_0+c_1g$ と書き、$c_0,c_1$ と和を求めよ。

<!-- solution-start -->
**詳細解答**。$g=1,-1$ を順に代入する。

$$
c_0+c_1=e^\beta,\qquad c_0-c_1=e^{-\beta}.
$$

足して2で割ると $c_0=(e^\beta+e^{-\beta})/2=\cosh\beta$、引いて2で割ると $c_1=(e^\beta-e^{-\beta})/2=\sinh\beta$。$\beta\ge0$ では両方非負で、次元はいずれも1だから [Wilson重みの非負指標展開](#thm-mqfc22-character-expansion) の重み付き総和は $e^\beta$ に一致する。
<!-- solution-end -->

### 演習 MQFC22-A3：零になる関数
- Level: A

$\beta=0$ の自由境界模型で $G=U(1)$ とし、正側の異なる二辺の値を $u,v$ とする。$F=u+2v$ の反射形式と通常の二乗平均を求めよ。

<!-- solution-start -->
**詳細解答**。Haar 積分で $\int u\,du=\int v\,dv=0$。独立性と [格子の反射形式](#def-mqfc22-lattice-reflection) の定義から反射形式は $|0+2\cdot0|^2=0$ である。

通常の二乗平均では

$$
|u+2v|^2=1+4+2u\overline v+2\overline u v.
$$

交差項の平均は独立性によって $\int u\,du\int\overline v\,dv=0$ とその共役になるので二乗平均は5。普通の二乗平均と反射形式は一致しない。
<!-- solution-end -->

### 演習 MQFC22-A4：非可換な周回積
- Level: A

切断面を横切る一正方形について、下の $x$ から上の $x$、上の $y$、下の $y$、下の $x$ と進む。

周回積を求め、正側の変換 $g_x=c_x^{-1},g_y=c_y^{-1}$ 後の $A_e'$ で表せ。

<!-- solution-start -->
**詳細解答**。各移動の行列は順に $c_x,A_e,c_y^{-1},B_e^{-1}$。列ベクトルに順に作用させるので積は $B_e^{-1}c_y^{-1}A_ec_x$ である。[頂点ゲージ変換](../MQFC19/index.md#def-mqfc19-vertex-gauge) は始点の逆元を右、終点の元を左に掛ける。従って

$$
A_e'=g_yA_e g_x^{-1}=c_y^{-1}A_ec_x.
$$

周回積は $B_e^{-1}A_e'$ になる。非可換群では $c_x,c_y$ を交換してはならない。
<!-- solution-end -->

### 演習 MQFC22-B1：円周群での無限展開
- Level: B

$G=U(1)$、$\beta\ge0$ とし、$w_\beta(e^{i\theta})$ の $e^{in\theta}$ の係数を整数 $n$ に対して求め、非負性と絶対収束を確認せよ。

<!-- solution-start -->
**詳細解答**。$\cos\theta=(e^{i\theta}+e^{-i\theta})/2$ を指数に代入して二つの指数級数を掛ける。

$$
w_\beta(e^{i\theta})=
\sum_{k,l\ge0}\frac{(\beta/2)^{k+l}}{k!l!}e^{i(k-l)\theta}.
$$

$n\ge0$ なら $k=l+n$、$n<0$ なら $l=k+|n|$。

自由な添字を $m\ge0$ とすると、いずれも

$$
c_n=\sum_{m\ge0}\frac{(\beta/2)^{2m+|n|}}{m!(m+|n|)!}.
$$

各項は非負である。全整数 $n$ の和は元の全 $(k,l)$ の和に一致し $e^\beta$ になる。各 $e^{in\theta}$ の絶対値は1なので絶対一様収束する。[Wilson重みの非負指標展開](#thm-mqfc22-character-expansion) の具体例である。
<!-- solution-end -->

### 演習 MQFC22-B2：重みが正でも反射陽性とは限らない
- Level: B

二値 $a,b\in\{1,-1\}$ を基準測度で独立一様とし、確率密度を $e^{\beta ba}$ に比例させる（ここだけ $\beta$ は任意の実数）。$f(a)=a$ の反射形式を計算し、負になる条件を求めよ。

<!-- solution-start -->
**詳細解答**。$ba=1$ の配置は2個、$ba=-1$ も2個なので基準測度で両者の確率は $1/2$。規格化定数は $(e^\beta+e^{-\beta})/2=\cosh\beta>0$。反射形式は

$$
\frac{\frac12 e^\beta-\frac12 e^{-\beta}}{\cosh\beta}
=\tanh\beta.
$$

$\beta<0$ なら負である。密度は全配置で正かつ交換不変だが、符号指標の係数 $\sinh\beta$ が負になり、[Wilson重みの非負指標展開](#thm-mqfc22-character-expansion) の非負係数の仮定が失われる。この模型は横切る辺を固定した左右二変数の模型であり、自由境界の全辺積分と区別する。
<!-- solution-end -->

### 演習 MQFC22-B3：境界頂点での平均
- Level: B

一つの正側空間辺 $e=(x,y)$ が切断面に接し $x\ne y$ とする。

$G=U(1)$ で $F(A)=A_e^n$（整数 $n$）を境界平均した $\widetilde F$ を求めよ。

<!-- solution-start -->
**詳細解答**。[頂点ゲージ変換](../MQFC19/index.md#def-mqfc19-vertex-gauge) で $A_e$ は $c_yA_ec_x^{-1}$ になる。$U(1)$ は可換なので

$$
\widetilde F(A)=A_e^n
\int c_y^n\,dc_y\int c_x^{-n}\,dc_x.
$$

$c_y,c_x$ は独立な Haar 変数である。整数 $m$ に対して $c=e^{i\theta}$ と書くと

$$
\int_{U(1)}c^m\,dc
=\frac1{2\pi}\int_0^{2\pi}e^{im\theta}\,d\theta
=\begin{cases}
1 & m=0,\\
(e^{2\pi im}-1)/(2\pi im)=0 & m\ne0.
\end{cases}
$$

$m=n$ と $m=-n$ をそれぞれ代入する。

従って $n=0$ では定数1、それ以外では零関数になる。

[自由境界Wilson測度の反射陽性](#thm-mqfc22-wilson-reflection) の証明の二乗和に代入すれば、$n\ne0$ の反射形式が零になる理由も分かる。

通常の二乗平均は $|A_e^n|^2=1$ である。
<!-- solution-end -->

### 演習 MQFC22-C1：二つの正方形を横切る模型の核
- Level: C

二値群 $G=\{1,-1\}$ と $\beta\ge0$ で、切断面にある三頂点を $x,y,z$、二つの空間辺を $(x,y),(y,z)$ とする。

時間層は0と1だけ、空間はこの直線だけとする。

正側の辺値を $(a_1,a_2)$、負側を $(b_1,b_2)$、横切る三辺を $(c_x,c_y,c_z)$ とする。

横切る二正方形の Wilson重みから定数因子を除き、(1) $c$ を固定して得る核を非負指標で展開せよ。

(2) $c$ の平均後、任意の正側関数 $F$ の規格化された反射形式を求めよ。

<!-- solution-start -->
**詳細解答**。(1) 正側の変換後の辺値を $a_1'=c_y^{-1}a_1c_x$、$a_2'=c_z^{-1}a_2c_y$ と置く。二値群では逆元は自身である。横切る正方形の積は $b_1a_1',b_2a_2'$。$p=\cosh\beta,q=\sinh\beta$ とすれば [Wilson重みの非負指標展開](#thm-mqfc22-character-expansion) の二値例により核は

$$
\begin{aligned}
K(B,A')&=(p+qb_1a_1')(p+qb_2a_2')\\
&=p^2+pq\,b_1a_1'+pq\,b_2a_2'\\
&\quad+q^2(b_1b_2)(a_1'a_2').
\end{aligned}
$$

$\beta\ge0$ では全係数が非負。左右同じ関数 $1,a_1',a_2',a_1'a_2'$ に分かれる。

(2) 元の $F$ は変換後に $F(c_y a_1'c_x,c_z a_2'c_y)$ となる。$c_y$ を固定して $c_x,c_z$ を全て動かすと、二つの引数は独立に全二値を走る。従って

$$
\widetilde F(A')=\frac14\sum_{s_1,s_2=\pm1}F(s_1,s_2)=M
$$

は定数である。全辺の基準測度は規格化された一様測度で、半分内部に正方形はない。従って [自由境界Wilson測度の反射陽性](#thm-mqfc22-wilson-reflection) の式で $\nu$ は一様確率測度になる。

各非定数指標の平均は零であるから $\int K\,dA'dB=p^2$ となる。元の分配関数は正方形二個の定数因子を戻して $Z_\beta=e^{-2\beta}p^2$。反射形式の分子は $e^{-2\beta}|M|^2p^2$。割り算すると

$$
(F,F)_r=|M|^2\ge0.
$$

例えば $F(a_1,a_2)=1+a_1a_2$ なら $M=1$ で反射形式は1、$F=a_1a_2$ なら $M=0$。この直線の境界では全ての辺を頂点変換で動かせるため、平均で定数だけが残った。閉路を持つ空間格子ではゲージ不変な非定数関数も残り得る。
<!-- solution-end -->

## 6. 次の講義

今回の非負形式は零方向を許す。次講では零方向を取り除いて内積空間を作り、時間方向の転送とゲージ不変状態の関係を調べる。
