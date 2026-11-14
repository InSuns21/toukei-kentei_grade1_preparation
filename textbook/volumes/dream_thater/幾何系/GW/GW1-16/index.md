# GW1-16 量子積と結合律（WDVV）

<!-- definition-example-audit: strict -->

## 1. 曲線の計数から、積の演算を作りたい

[前講の四標点相関の境界和公式](../GW1-15/index.md#prop-gw1-15-four-point-sum)は、節点で分かれる曲線を二通りに数えて同じ値を与える。ここで次の疑問が生まれる。三点の Gromov–Witten（GW）不変量を、コホモロジー類二つから新しい類一つを作る「積」の係数に使えないだろうか。そして、その積は括弧の付け方によらないだろうか。

古典的なカップ積 $\alpha\smile\lambda$ は三点交叉数 $\int_X\alpha\smile\lambda\smile\nu$ によって検出できる。[次数0の三点GW不変量](../GW1-13/index.md#prop-gw1-13-zero-degree)はまさにこの交叉数である。そこで次数 $\beta\ne0$ の曲線の寄与も加えた積を考える。これが本講で構成する**小量子積**である。「小」は挿入を三点に限定して定義することを指す。

以後、$X$ は滑らかな連結**複素射影凸多様体**（複素次元 $m$）とし、係数は $\mathbb Q$、標点は種数0の一次挿入とする。凸性は[先行定義](../GW1-09/index.md#def-gw1-09-convex)に従い、[モジュライの滑らかさと基本類](../GW1-10/index.md#thm-gw1-10-smooth-dimension)を使用する。最初は

$$
V=H^{\mathrm{even}}(X;\mathbb Q)
$$

に限る。この偶数部分なら[前講の四標点公式](../GW1-15/index.md#prop-gw1-15-four-point-sum)を符号の追加なしに使える。奇数次数コホモロジーを含む全量子コホモロジーには Koszul 符号が必要であり、偶数部分の証明だけで全次数の結合律を主張しない。

## 2. Poincaré双対基底は、三点の数を一つの類に戻す

$V$ の斉次基底を $\phi_0,\ldots,\phi_r$ とする。[節点一致を表す対角類](../GW1-12/index.md#def-gw1-12-diagonal-matching)では、左右の節点に入れる類を Poincaré 双対基底で組にした。同じ組を積の係数にも使う。

交叉行列とその逆行列を

$$
\eta_{ab}=\int_X\phi_a\smile\phi_b,
\qquad
\sum_b\eta_{ab}\eta^{bc}=\delta_a^c
$$

と置き、$\phi^a=\sum_b\eta^{ab}\phi_b$ とする。$X$ が滑らかな向き付けられたコンパクト多様体であるため Poincaré 双対性が成立し、偶数部分同士の交叉行列は非退化である。ここで基底の次数を考慮すると、$\eta_{ab}$ は $\deg\phi_a+\deg\phi_b=2m$ のとき以外0である。このため逆行列も補次数を持つ成分だけが非零であり、

$$
\int_X\phi^a\smile\phi_c
=\sum_b\eta^{ab}\eta_{bc}
=\delta_c^a.
$$

したがって任意の $v\in V$ について

$$
v=\sum_a\left(\int_Xv\smile\phi_a\right)\phi^a.
$$

これは単なる座標の約束ではない。**三点の交叉数をすべて知れば、非退化な双対性によって一つのコホモロジー類が一意に復元される**という仕組みである。

**直接計算**。$X=\mathbb P^1$ の点類 $h$ を用い $\phi_0=1,\phi_1=h$ とすれば、射影直線のカップ積の規格化 $\int_{\mathbb P^1}h=1$ と $h^2=0$ から

$$
(\eta_{ab})=\begin{pmatrix}0&1\\1&0\end{pmatrix}
=(\eta^{ab}),\qquad
\phi^0=h,\quad\phi^1=1.
$$

例えば $v=a+bh$ に対して $\int v\smile1=b$、$\int v\smile h=a$ だから、復元式の右辺は $bh+a$ となる。基底と双対基底を取り違えると、後の量子積で係数の付く類が逆になる。

## 3. 曲線の次数を記録する Novikov 変数

三点不変量を全て単純に足し合わせると、どの曲線類から来た寄与か分からなくなる。そこで有効曲線類 $\beta$ に記号 $Q^\beta$ を対応させ、節点で曲線類が $\beta_1+\beta_2$ に分かれることを積

$$
Q^{\beta_1}Q^{\beta_2}=Q^{\beta_1+\beta_2},
\qquad Q^0=1
$$

で表す。この記号は、まだ特定の数値を代入するものではない。

無限個の曲線類が現れても係数を正しく比較できるよう、射影的な $X$ 上の固定した豊富類 $\omega\in H^2(X;\mathbb R)$ により、曲線類の面積 $A(\beta)=\langle[\omega],\beta\rangle$ を測る。非零の有効曲線類には $A(\beta)>0$ が成り立つ。

<a id="def-gw1-16-novikov"></a>

<!-- formal-statement-start -->
> **定義（有効曲線類の Novikov 完備化）**  
> $X$ を上記の滑らかな射影凸多様体とし、$\mathrm{Eff}(X)$ を $0$ を含む有効な整数曲線類の加法半群とする。$\Lambda_X$ を次の形式和からなる $\mathbb Q$-代数とする。

$$
\Lambda_X=
\left\{\sum_{\beta\in\mathrm{Eff}(X)}c_\beta Q^\beta:
c_\beta\in\mathbb Q,\ 
\#\{\beta:c_\beta\ne0,\ A(\beta)\le E\}<\infty
\text{ for every }E>0\right\}.
$$

> 積は $Q^{\beta_1}Q^{\beta_2}=Q^{\beta_1+\beta_2}$ の分配法則で定める。実コホモロジー次数の規約は

$$
\deg Q^\beta=2\langle c_1(TX),\beta\rangle
$$

> とする。
<!-- formal-statement-end -->

**なぜ積が定義できるか**。固定した $E$ より小さな面積の非零係数の項は、各因子で有限個である。$A(\beta_i)\ge0$ だから、積の面積 $E$ 以下の係数に寄与する組は、両因子の面積 $E$ 以下の項の組に限られる。したがって係数の畳み込みは有限和であり、積も同じ有限性条件を満たす。

<!-- definition-example-start: def-gw1-16-novikov -->
**定義の確認（射影直線）**。$\mathbb P^1$ では $\mathrm{Eff}(\mathbb P^1)=\{d[\mathbb P^1]:d\ge0\}$ で、$q=Q^{[\mathbb P^1]}$ と書けば $\Lambda_{\mathbb P^1}\simeq\mathbb Q[[q]]$ となる。面積を $a=A([\mathbb P^1])>0$ と置くと、$A(d[\mathbb P^1])=da$ である。したがって任意の $E>0$ に対して $da\le E$ の整数 $d\ge0$ は $0\le d\le E/a$ の有限個しかない。形式冪級数 $\sum_{d\ge0}c_dq^d$ は定義の有限性条件を満たす。

さらに二つの形式冪級数の積で $q^n$ の係数は $\sum_{i=0}^nc_id_{n-i}$ という有限和なので積は定義され、$\deg q^n=4n$ も加法的である。実際、$c_1(T\mathbb P^1)=2h$ だから $\deg q=2\langle2h,[\mathbb P^1]\rangle=4$。$\mathbb P^2$ の直線類を $\ell$、$q=Q^\ell$ とすれば同様に $\deg q=2\langle3H,\ell\rangle=6$。同じ字 $q$ でも次数は標的によって異なる。
<!-- definition-example-end -->

## 4. 三点不変量による小量子積

[一次GW不変量の定義](../GW1-13/index.md#def-gw1-13-primary-invariant)において、三標点は $\beta=0$ でも安定である。従って $\alpha,\lambda,\phi_a\in V$ の三点関数は全ての有効 $\beta$ について定義される。前節の双対基底を使って、新しい積を構成する。

<a id="def-gw1-16-small-quantum-product"></a>

<!-- formal-statement-start -->
> **定義（偶数コホモロジーの小量子積）**  
> $X$ を滑らかな連結複素射影凸多様体とし、上の斉次基底 $\{\phi_a\}$、双対基底 $\{\phi^a\}$、Novikov 環 $\Lambda_X$ を用いる。$\alpha,\lambda\in V$ の積を

$$
\alpha*\lambda
=\sum_{\beta\in\mathrm{Eff}(X)}
Q^\beta\sum_a
\langle\alpha,\lambda,\phi_a\rangle_{\beta}\,\phi^a
$$

> で定め、$\Lambda_X$-双線形に $V\otimes_{\mathbb Q}\Lambda_X$ 全体へ拡張する。これを偶数部分の小量子コホモロジー積という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-16-small-quantum-product -->
**定義の確認（射影直線の単位類と点類）**。$X=\mathbb P^1$、$V=\mathbb Q\{1,h\}$ とし、双対基底は $\phi^0=h,\phi^1=1$ とする。[次数0の三点不変量](../GW1-13/index.md#prop-gw1-13-zero-degree)により

$$
\langle1,h,1\rangle_0=1,\qquad
\langle1,h,h\rangle_0=0.
$$

よって定義の $\beta=0$ の係数は $1\cdot h+0\cdot1=h$ である。一方、任意の正次数 $d\ge1$ では、[基本類公理](../GW1-15/index.md#thm-gw1-15-fundamental-class)が三標点の単位挿入に適用でき、

$$
\langle1,h,1\rangle_d
=\langle1,h,h\rangle_d=0.
$$

従って $1*h=h$。次数0の三標点と正次数の三標点はともに安定で、基底の二成分・全曲線次数の寄与を確認した。$h*h$ の非零な正次数補正は次の直接計算で調べる。
<!-- definition-example-end -->

固定した面積上限までの級数は有限であり、係数は $V$ に属するので式は well-defined である。また各 $\beta$ の係数は、任意の $\nu\in V$ に対して

$$
\int_X(\alpha*\lambda)_\beta\smile\nu
=\langle\alpha,\lambda,\nu\rangle_\beta
$$

を満たす。実際、$\nu=\sum_c\nu^c\phi_c$ と展開し、双対基底の式を代入すると

$$
\begin{aligned}
\int_X(\alpha*\lambda)_\beta\smile\nu
&=\sum_{a,c}\nu^c\langle\alpha,\lambda,\phi_a\rangle_\beta
\int_X\phi^a\smile\phi_c\\
&=\sum_c\nu^c\langle\alpha,\lambda,\phi_c\rangle_\beta.
\end{aligned}
$$

非退化性により、この条件が係数 $(\alpha*\lambda)_\beta$ を一意に定める。従って積は基底の取り方に依存しない。

<a id="prop-gw1-16-classical-unit-grading"></a>

<!-- formal-statement-start -->
> **命題（古典極限・単位元・次数）**  
> $X$ を上記の滑らかな連結複素射影凸多様体とし、$\alpha,\lambda$ を偶数次数の斉次コホモロジー類とする。小量子積の次数0成分と単位元は

$$
(\alpha*\lambda)_0=\alpha\smile\lambda,
\qquad 1*\alpha=\alpha*1=\alpha
$$

> を満たす。また Novikov 変数に Chern 次数を与えると、任意の非零項 $Q^\beta\phi^a$ について

$$
\deg(Q^\beta\phi^a)=\deg\alpha+\deg\lambda
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

次数0では定数写像の三点積分に戻る。正次数で単位類を含む三点関数は[基本類公理](../GW1-15/index.md#thm-gw1-15-fundamental-class)で消える。次数はモジュライの複素次元と双対基底の補次数を合わせる。

<!-- proof-start -->
### 証明

[次数0の三点公式](../GW1-13/index.md#prop-gw1-13-zero-degree)を代入すると

$$
(\alpha*\lambda)_0
=\sum_a\left(\int_X\alpha\smile\lambda\smile\phi_a\right)\phi^a
=\alpha\smile\lambda
$$

である。$\beta\ne0$ では忘却前後の安定性が保たれるため、[基本類公理](../GW1-15/index.md#thm-gw1-15-fundamental-class)により $\langle1,\alpha,\phi_a\rangle_\beta=0$。$\beta=0$ での $1\smile\alpha=\alpha$ と、[対称性](../GW1-15/index.md#prop-gw1-15-symmetry)を合わせれば左右の単位元性が従う。

次数について、$d_\alpha,d_\lambda,d_a$ を各類の実次数とする。[次元・次数条件](../GW1-13/index.md#prop-gw1-13-dimension-constraint)は三標点で

$$
d_\alpha+d_\lambda+d_a
=2\bigl(m+\langle c_1(TX),\beta\rangle\bigr)
$$

を要求する。$\phi^a$ の次数は $2m-d_a$ だから、非零項の総次数は

$$
\deg(Q^\beta\phi^a)
=2\langle c_1(TX),\beta\rangle+2m-d_a
=d_\alpha+d_\lambda.
$$

これで三つの主張が成立する。
<!-- proof-end -->

**直接例（$\mathbb P^1$）**。[次数1の標点付き点計数](../GW1-14/index.md#thm-gw1-14-p1-degree-one)と[因子公理](../GW1-15/index.md#thm-gw1-15-divisor)から $\langle h,h,h\rangle_1=1$。次数 $d$ の三点モジュライの複素次元は $D(3,d)=1+2d$。三つの点類の複素余次元は3だから、正次数の候補は $d=1$ のみである。定数写像の $\langle h,h,h\rangle_0=\int h^3=0$ も合わせて

$$
h*h=q\cdot1,\qquad1*h=h,\qquad1*1=1.
$$

ここでは $\phi^h=1$、$\phi^1=h$ なので、$q$ の係数が $h$ ではなく $1$ に付く点を確認できる。この計算を量子環の関係式へまとめるのは次講で行う。

## 5. WDVV：四標点の二通りの分裂が同じ数になる

積が定義できたことと、$(\alpha*\lambda)*\mu=\alpha*(\lambda*\mu)$ が成り立つことは別問題である。括弧を替えた二式を Poincaré ペアリングで検査すると、それぞれに**三点不変量二つの積の和**が現れる。そこで[四標点境界の比較](../GW1-15/index.md#prop-gw1-15-four-point-sum)が使える。

以下の $\alpha,\lambda,\mu,\nu$ はすべて偶数次数の斉次類、$B$ は固定した有効曲線類とする。$B=B_1+B_2$ の和は有効曲線類の分解全てを走り、$B_i=0$ も含む。各側に元の二標点と節点標点があるから、定数側でも三標点となり安定である。$B=0$ に正次数の不安定な相関を補っているわけではない。

<a id="thm-gw1-16-wdvv"></a>

<!-- formal-statement-start -->
> **定理（偶数挿入の WDVV 方程式）**  
> $X$ を滑らかな連結複素射影凸多様体、$\{\phi_a\}$ を $H^{\mathrm{even}}(X;\mathbb Q)$ の斉次基底、$(\eta^{ab})$ を Poincaré 交叉行列の逆行列とする。偶数斉次類 $\alpha,\lambda,\mu,\nu$ と任意の有効曲線類 $B$ に対し、次の二つの式は等しい。

$$
\begin{aligned}
&\sum_{\substack{B_1+B_2=B\\ B_i\in\mathrm{Eff}(X)}}
\sum_{a,b}
\langle\alpha,\lambda,\phi_a\rangle_{B_1}
\eta^{ab}
\langle\phi_b,\mu,\nu\rangle_{B_2}\\
={}&
\sum_{\substack{B_1+B_2=B\\ B_i\in\mathrm{Eff}(X)}}
\sum_{a,b}
\langle\alpha,\mu,\phi_a\rangle_{B_1}
\eta^{ab}
\langle\phi_b,\lambda,\nu\rangle_{B_2}.
\end{aligned}
$$

> さらに右辺で $\mu$ と $\nu$ を入れ替えた式（境界 $14|23$ に対応する式）とも等しい。これらを偶数部分の WDVV 方程式という。
<!-- formal-statement-end -->

### 証明の見取り図

四点を持つ安定写像を忘却・安定化して $\overline{\mathcal M}_{0,4}\cong\mathbb P^1$ へ送る。$12|34$ と $13|24$ と $14|23$ は同じ点類を表す。その逆像の分裂積分に[節点一致の対角類](../GW1-12/index.md#def-gw1-12-diagonal-matching)を代入する。

<!-- proof-start -->
### 証明

$M=\overline{\mathcal M}_{0,4}(X,B)$ とし、$\mathrm{st}:M\to\overline{\mathcal M}_{0,4}$ を四標点の安定化射、$\Theta=\prod_{i=1}^4\operatorname{ev}_i^*\alpha_i$ と置く。ただし $(\alpha_1,\ldots,\alpha_4)=(\alpha,\lambda,\mu,\nu)$ である。[次元公式](../GW1-10/index.md#thm-gw1-10-smooth-dimension)より $D(4,B)=m+1+c_1(TX)\cdot B$ である。

挿入の複素余次元和が $D(4,B)-1$ なら $\Theta\smile\mathrm{st}^*[\mathrm{pt}]$ が最高次数となる。そうでなければ、両辺の各項は[三点の次数条件](../GW1-13/index.md#prop-gw1-13-dimension-constraint)により零である。実際、二側の三点モジュライの複素次元和は

$$
D(3,B_1)+D(3,B_2)
=2m+c_1(TX)\cdot B,
$$

である。一方、節点に入る二つの双対類の複素余次元和は $m$。従って両方の三点積分が非零となるには、外側四挿入の複素余次元和が $m+c_1(TX)\cdot B=D(4,B)-1$ でなければならない。

次数が一致する場合、[四標点境界和公式](../GW1-15/index.md#prop-gw1-15-four-point-sum)を $k=4$ へ適用する。$12|34$ の逆像の因子は $B=B_1+B_2$ で左右にそれぞれ $(1,2,*)$ と $(3,4,*)$ を持つ。元の標点の分配は一通りである。偶数部分の[対角分解](../GW1-12/index.md#def-gw1-12-diagonal-matching)は

$$
[\Delta_X]_{\mathrm{even}}
=\sum_{a,b}\eta^{ab}\phi_a\boxtimes\phi_b
$$

であり、全対角類の奇数成分は、外側が偶数挿入だけなら各側の三点積分で奇数総次数となって零になる。したがって分裂積分は

$$
\sum_{B_1+B_2=B}\sum_{a,b}
\langle\alpha,\lambda,\phi_a\rangle_{B_1}
\eta^{ab}
\langle\mu,\nu,\phi_b\rangle_{B_2}.
$$

標点の番号により左右は区別されるので、余分な $1/2$ を掛けない。$13|24$ も同様に $(1,3,*)$ と $(2,4,*)$ に分け、定理の右辺を得る。偶数挿入なので、[次数付き対称性](../GW1-15/index.md#prop-gw1-15-symmetry)の交換符号は $+1$ である。

$14|23$ については四標点の番号 $3,4$ を交換して同じ議論を行う。三つの境界点の Poincaré 双対は $\mathbb P^1$ 上で同じであるため、三つの和が一致する。
<!-- proof-end -->

**見落としやすい点**。この式には「$\overline{\mathcal M}_{0,4}$ 全体上の四点一次不変量」は現れない。各側の三点関数が掛かる理由は、四点の**境界点の逆像**を積分しているからである。また次数0成分は三標点なので許されるが、次数0の二標点相関を仮に0と置く操作はしていない。

## 6. WDVV から結合律を、添字を省略せず導く

Poincaré ペアリングを $\Lambda_X$-双線形に

$$
(u,v)=\int_Xu\smile v
$$

と延長する。値域は $\Lambda_X$ であり、$\Lambda_X$ を足した量子積では曲線類ごとの係数を比較する。

<a id="thm-gw1-16-associativity"></a>

<!-- formal-statement-start -->
> **定理（偶数部分の小量子積の結合律）**  
> $X$ を滑らかな連結複素射影凸多様体とする。[小量子積](#def-gw1-16-small-quantum-product)は $H^{\mathrm{even}}(X;\mathbb Q)\otimes\Lambda_X$ 上で結合的である。すなわち任意の $u,v,w$ に対して

$$
(u*v)*w=u*(v*w).
$$

> この積は交換的で、単位元は $1\in H^0(X;\mathbb Q)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$(u*v)*w$ の係数を別の類 $\nu$ とペアにすると、積を一回展開するたびに一つ三点相関が出る。この二重和を WDVV の $12|34$ と $14|23$ に同定する。ペアリングが非退化だから、全 $\nu$ で等しければ類として等しい。

<!-- proof-start -->
### 証明

まず $u=\alpha,v=\lambda,w=\mu$ を偶数斉次類とし、検査用に偶数斉次類 $\nu$ を取る。[量子積の定義](#def-gw1-16-small-quantum-product)を二回展開すると

$$
(\alpha*\lambda)*\mu
=\sum_{B_1}\sum_{a,b}
Q^{B_1}
\langle\alpha,\lambda,\phi_a\rangle_{B_1}
\eta^{ab}\,(\phi_b*\mu).
$$

ここで内側の $\phi^a=\sum_b\eta^{ab}\phi_b$ を代入した。$Q^B$ 係数と $\nu$ のペアリングを取ると、[積の三点関数による特徴付け](#def-gw1-16-small-quantum-product)から

$$
\bigl((\alpha*\lambda)*\mu,\nu\bigr)_B
=\sum_{B_1+B_2=B}\sum_{a,b}
\langle\alpha,\lambda,\phi_a\rangle_{B_1}
\eta^{ab}
\langle\phi_b,\mu,\nu\rangle_{B_2}.

$$

同じ操作を右括弧へ行うと

$$
\bigl(\alpha*(\lambda*\mu),\nu\bigr)_B
=\sum_{B_1+B_2=B}\sum_{a,b}
\langle\lambda,\mu,\phi_a\rangle_{B_1}
\eta^{ab}
\langle\alpha,\phi_b,\nu\rangle_{B_2}.

$$

右括弧の展開式で $B_1,B_2$ と $a,b$ を同時に入れ替える。$\eta^{ab}=\eta^{ba}$ は偶数部分の交叉行列の対称性による。さらに[偶数挿入の対称性](../GW1-15/index.md#prop-gw1-15-symmetry)で三点の順序を変えると

$$
\bigl(\alpha*(\lambda*\mu),\nu\bigr)_B
=\sum_{B_1+B_2=B}\sum_{a,b}
\langle\alpha,\nu,\phi_a\rangle_{B_1}
\eta^{ab}
\langle\phi_b,\lambda,\mu\rangle_{B_2}.
$$

これは[WDVV 方程式](#thm-gw1-16-wdvv)の $14|23$ 側そのものであり、先に求めた左括弧の $12|34$ 側に等しい。従って任意の $B,\nu$ について差

$$
\bigl((\alpha*\lambda)*\mu-\alpha*(\lambda*\mu),\nu\bigr)_B=0
$$

となる。$\eta$ は非退化なので、差の各 $Q^B$ 係数は零である。$\Lambda_X$-双線形性によって一般の $u,v,w$ に拡張できる。積の交換性は[三点GW不変量の対称性](../GW1-15/index.md#prop-gw1-15-symmetry)、単位元性は[前節の命題](#prop-gw1-16-classical-unit-grading)で証明した。
<!-- proof-end -->

ここで「WDVV があるので結合的」と一行で済ませなかったのは、**$13|24$ ではなく $14|23$ と照合する必要がある**ためである。右括弧の二重和に現れる三点相関をきちんと並べ替えれば、その理由が見える。

## 7. 射影直線で結合律を手計算する

$X=\mathbb P^1$ で $H^{\mathrm{even}}=\mathbb Q\{1,h\}$、$\deg h=2$、$\deg q=4$ だった。先に求めた

$$
h*h=q,\qquad1*h=h,\qquad1*1=1
$$

を使う。例えば三因子の括弧を比較すると

$$
(h*h)*h=q*h=qh,\qquad
h*(h*h)=h*q=qh.
$$

これは結合律の**検算**であって一般証明の代わりではない。WDVV そのものも $\beta=1$、四挿入 $(h,h,h,1)$ で検算できる。このとき $D(4,1)=4$、挿入複素余次元和は3で、境界因子を一つ掛けるための条件 $D-1=3$ が成立する。

$12|34$ では $(B_1,B_2)=(1,0)$ のときだけ非零であり、対角類の $h\boxtimes1$ の項から

$$
\langle h,h,h\rangle_1
\langle1,h,1\rangle_0=1\cdot1=1.
$$

反対の $(0,1)$ は定数側に $\langle h,h,\phi_a\rangle_0$ が現れ、$h^2=0$ だから零。$14|23$ では $(B_1,B_2)=(0,1)$ に限り、対角類の $1\boxtimes h$ から

$$
\langle h,1,1\rangle_0
\langle h,h,h\rangle_1=1\cdot1=1.
$$

二つの値が等しいことが、$h$ の量子積の具体計算と整合している。

## 8. どこまで証明したか

本講の結合律は、凸な滑らかな射影標的の種数0モジュライが持つ**通常の有理基本類**と、その[境界分裂公式](../GW1-12/index.md#thm-gw1-12-boundary-splitting)を前提に、偶数コホモロジーの小量子積について証明したものである。四点の境界の同値性は、積に「結合律」という強い代数的条件を課す。

奇数次数の挿入まで扱うと対角類の符号と積の次数付き交換則を管理する必要がある。凸性を失った標的では、一般に通常のモジュライ基本類から期待次数のGW不変量を作れず、仮想基本類が必要となる。これらを本講の証明から自動的に推論してはいけない。次講では、ここで構成した積を射影空間の量子環の具体的な表示へ変える。

---

## 演習（全問詳細解答）

### Level A

<a id="ex-gw1-16-a01"></a>
#### GW1-16-A01 射影直線の双対基底
- Level: A

$\mathbb P^1$ の基底 $(1,h)$ に対する交叉行列と双対基底を求め、$v=3+2h$ をペアリングから復元せよ。

<!-- solution-start -->
**詳細解答**。$h^2=0$、$\int_{\mathbb P^1}h=1$ だから $\int1=0$、$\int1\smile h=1$、$\int h^2=0$。従って

$$
\eta=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\quad\eta^2=I,
\quad\phi^0=h,\ \phi^1=1.
$$

$v$ の係数を試験類 $1,h$ と組ませると $\int v\smile1=2$、$\int v\smile h=3$。双対基底への復元式から $v=2\phi^0+3\phi^1=2h+3$ を得る。[節点の対角類](../GW1-12/index.md#def-gw1-12-diagonal-matching)と同じ係数行列である。
<!-- solution-end -->

<a id="ex-gw1-16-a02"></a>
#### GW1-16-A02 Novikov 変数と次数
- Level: A

$\mathbb P^1$ の $q=Q^{[\mathbb P^1]}$ と $\mathbb P^2$ の $q=Q^\ell$ について、$\deg q$ と $\deg(q^2)$ をそれぞれ求めよ。どちらも実コホモロジー次数で答えよ。

<!-- solution-start -->
**詳細解答**。[射影空間の第一 Chern 類](../GW1-09/index.md#thm-gw1-09-projective-convex)は $c_1(T\mathbb P^n)=(n+1)H$ で、直線類との交叉数は1。従って定義の $\deg Q^\beta=2c_1(TX)\cdot\beta$ により、$\mathbb P^1$ は $\deg q=2\cdot2=4$ と $\deg q^2=8$、$\mathbb P^2$ は $\deg q=2\cdot3=6$ と $\deg q^2=12$。$q$ を普通の次数0の数として扱わない。
<!-- solution-end -->

<a id="ex-gw1-16-a03"></a>
#### GW1-16-A03 三点の次数0と古典積
- Level: A

$X=\mathbb P^2$、基底 $(1,H,H^2)$ とする。$H*H$ の $Q^0$ 係数を三点関数と双対基底から直接求めよ。

<!-- solution-start -->
**詳細解答**。$\int_{\mathbb P^2}H^2=1$ で $H^3=0$ だから、双対基底は $(H^2,H,1)$。[次数0の三点公式](../GW1-13/index.md#prop-gw1-13-zero-degree)を各基底元へ適用すると

$$
\langle H,H,1\rangle_0=1,\quad
\langle H,H,H\rangle_0=0,\quad
\langle H,H,H^2\rangle_0=0.
$$

従って $(H*H)_0=1\cdot H^2+0\cdot H+0\cdot1=H^2$。ここでは正次数の寄与をまだ調べていない。
<!-- solution-end -->

<a id="ex-gw1-16-a04"></a>
#### GW1-16-A04 単位元が正次数で補正されない理由
- Level: A

任意の偶数斉次類 $\alpha\in H^*(X;\mathbb Q)$ と任意の正の有効曲線類 $\beta$ について、$\langle1,\alpha,\phi_a\rangle_\beta=0$ を説明し、$(1*\alpha)_\beta=0$ とせよ。

<!-- solution-start -->
**詳細解答**。正次数 $\beta\ne0$ の二標点安定写像は非定数写像なので安定であり、三標点から単位類の付いた標点を忘れる射が定義される。

[基本類公理](../GW1-15/index.md#thm-gw1-15-fundamental-class)を $k=2$、挿入 $(\alpha,\phi_a)$、新標点の挿入 $1$ に適用して

$$
\langle\alpha,\phi_a,1\rangle_\beta=0
$$

を得る。偶数の[対称性](../GW1-15/index.md#prop-gw1-15-symmetry)により問の三点関数も0。量子積の定義で

$$
(1*\alpha)_\beta=\sum_a0\cdot\phi^a=0
$$

となる。$\beta=0$ の三標点は基本類公理の不安定な忘却例外なので、そこで消滅を主張せず $1\smile\alpha=\alpha$ とする。
<!-- solution-end -->

<a id="ex-gw1-16-a05"></a>
#### GW1-16-A05 量子積の次数条件
- Level: A

$X=\mathbb P^2$ で $H*H^2$ の $q^d$ 係数に掛かる基底元を次数条件から調べよ。$d=0,1,d\ge2$ を分け、実際の値の計算は不要とする。

<!-- solution-start -->
**詳細解答**。$\deg H+\deg H^2=2+4=6$、$\deg q=6$。係数を掛ける基底元を $\psi$ とすれば $\deg\psi+6d=6$ が必要である。$d=0$ は $\deg\psi=6$ だが $H^{6}(\mathbb P^2)=0$。$d=1$ は $\deg\psi=0$ なので候補は $1$ のみ。$d\ge2$ は負次数になり候補がない。これは[次数条件](../GW1-13/index.md#prop-gw1-13-dimension-constraint)と双対基底の補次数をまとめた結論であり、$d=1$ の係数が実際に1であることは別のGW計算を要する。
<!-- solution-end -->

### Level B

<a id="ex-gw1-16-b01"></a>
#### GW1-16-B01 WDVV の次数0を直接検算する
- Level: B

$X=\mathbb P^2$、$B=0$、四挿入 $(H,H,1,1)$ について $12|34$ と $13|24$ の WDVV の値を、対角基底 $(1,H,H^2)$ の三項を検査して求めよ。

<!-- solution-start -->
**詳細解答**。$D(4,0)=2-3+4=3$、外側挿入の複素余次元和は $1+1+0+0=2=D-1$。次数0では両成分が定数写像で、各側に二標点と節点があるので三標点として安定である。対角類は $1\boxtimes H^2+H\boxtimes H+H^2\boxtimes1$。

$12|34$ では左が $(H,H,\phi_a)$、右が $(1,1,\phi^a)$。左の余次元が2になるのは $\phi_a=1$ だけで、この項は

$$
\langle H,H,1\rangle_0\langle1,1,H^2\rangle_0
=1\cdot1=1.
$$

$\phi_a=H$ と $H^2$ は左で $H^3$ 以上となり0。$13|24$ では左 $(H,1,\phi_a)$、右 $(H,1,\phi^a)$。両方の余次元が2となるには $\phi_a=H,\phi^a=H$ であり、

$$
\langle H,1,H\rangle_0\langle H,1,H\rangle_0=1.
$$

他の二項は左右どちらかの次数が合わない。よって両側は1で一致する。
<!-- solution-end -->

<a id="ex-gw1-16-b02"></a>
#### GW1-16-B02 括弧の二重和を追跡する
- Level: B

偶数斉次類 $\alpha,\lambda,\mu,\nu$ に対し、$((\alpha*\lambda)*\mu,\nu)_B$ を三点不変量の積として展開し、右括弧の展開と比較するとき、どの境界 $ij|kl$ が必要かを特定せよ。

<!-- solution-start -->
**詳細解答**。最初の積の第 $B_1$ 係数は $\sum_a\langle\alpha,\lambda,\phi_a\rangle_{B_1}\phi^a$。[量子積の定義](#def-gw1-16-small-quantum-product)と $\phi^a=\sum_b\eta^{ab}\phi_b$ から、再び $\mu$ と掛け $\nu$ に組ませると

$$
((\alpha*\lambda)*\mu,\nu)_B
=\sum_{B_1+B_2=B}\sum_{a,b}
\langle\alpha,\lambda,\phi_a\rangle_{B_1}
\eta^{ab}\langle\phi_b,\mu,\nu\rangle_{B_2}.
$$

これは $12|34$ の境界和である。一方 $(\alpha*(\lambda*\mu),\nu)_B$ は

$$
\sum_{B_1+B_2=B}\sum_{a,b}
\langle\lambda,\mu,\phi_a\rangle_{B_1}
\eta^{ab}\langle\alpha,\phi_b,\nu\rangle_{B_2}.
$$

$B_1\leftrightarrow B_2$、$a\leftrightarrow b$ とし、偶数対称性を用いると $\sum\langle\alpha,\nu,\phi_a\rangle_{B_1}\eta^{ab}\langle\phi_b,\lambda,\mu\rangle_{B_2}$ となる。これは $14|23$ の境界和。[WDVV](#thm-gw1-16-wdvv)の三境界の等値性が結合律に必要であり、$13|24$ の一つの比較を名称だけで引用して終えてはならない。
<!-- solution-end -->

<a id="ex-gw1-16-b03"></a>
#### GW1-16-B03 射影直線の一次 WDVV を全分裂で調べる
- Level: B

$X=\mathbb P^1$、$B=1$、挿入 $(h,h,h,1)$ とする。$12|34$ と $14|23$ の分裂で $(B_1,B_2)=(0,1),(1,0)$ をすべて調べ、値を比較せよ。

<!-- solution-start -->
**詳細解答**。$D(4,1)=1-3+2+4=4$、挿入余次元和は3で境界積分の条件を満たす。対角は $1\boxtimes h+h\boxtimes1$。$12|34$ で $(0,1)$ は左に $h,h$ を含む次数0三点相関を持ち、$h^2=0$ で両項0。$(1,0)$ では右が $(h,1,q_t)$ の定数相関で、$\int hq_t$ が非零となるには $q_t=1$、従って左の $p_t=h$ の項だけが残る。

$$
\langle h,h,h\rangle_1\langle h,1,1\rangle_0=1.
$$

$14|23$ で $(0,1)$ は左 $(h,1,p_t)$ が定数で、$p_t=1$ のみ非零、右は $(h,h,h)$ の次数1で値1。$(1,0)$ は右に $(h,h,q_t)$ の次数0があるため0。従って

$$
\mathcal B_{12|34}=1=\mathcal B_{14|23}.
$$

次数1三点値には[射影直線の次数1計数](../GW1-14/index.md#thm-gw1-14-p1-degree-one)と[因子公理](../GW1-15/index.md#thm-gw1-15-divisor)を用いた。
<!-- solution-end -->

<a id="ex-gw1-16-b04"></a>
#### GW1-16-B04 偶数部分だけの証明が必要とする仮定
- Level: B

滑らかな凸射影多様体 $X$ に奇数次数コホモロジーがあっても本講の偶数部分が積で閉じ、WDVV に奇数対角成分が寄与しない理由を説明せよ。またこのことから全次数の量子積が交換的だと結論してよいか。

<!-- solution-start -->
**詳細解答**。$X$ の複素次元を $m$ とする。[三点の次数条件](../GW1-13/index.md#prop-gw1-13-dimension-constraint)では非零積分の挿入実次数和は $2m+2c_1(TX)\cdot B$ という偶数である。外側の二挿入が偶数のとき、節点の挿入だけが奇数なら和は奇数になり、その三点相関は0。従って量子積の出力は偶数部分に属し、分裂の左右に入る奇数対角成分も各側で消える。

ただし奇数の外側挿入を許すと、節点の奇数成分が非零となり得る。次数付き交換では $\alpha\smile\lambda=(-1)^{\deg\alpha\deg\lambda}\lambda\smile\alpha$ の符号が必要だから、全次数での符号なし交換性は一般に誤りである。本講の[結合律定理](#thm-gw1-16-associativity)は偶数部分についての主張である。
<!-- solution-end -->

### Level C

<a id="ex-gw1-16-c01"></a>
#### GW1-16-C01 三点計数から量子積と結合律を再構成する
- Level: C

$X=\mathbb P^1$ とする。(i) Poincaré 双対基底と Novikov 次数を求め、(ii) 次数0の三点公式・基本類公理・次数1の点計数から $1*1,1*h,h*h$ を求め、(iii) 任意の $u=a+bh,v=c+dh,w=e+fh$（係数は $\mathbb Q[[q]]$）について $((u*v)*w)=(u*(v*w))$ を係数まで直接確かめよ。最後に、この直接検算と一般の WDVV 証明との役割の違いを説明せよ。

<!-- solution-start -->
**詳細解答**。(i) $\int_{\mathbb P^1}h=1$、$h^2=0$ なので基底 $(1,h)$ の交叉行列は $\begin{pmatrix}0&1\\1&0\end{pmatrix}$、双対基底は $(h,1)$。[第一 Chern 類](../GW1-09/index.md#thm-gw1-09-projective-convex)が $2h$ なので $\deg q=4$。

(ii) [次数0三点公式](../GW1-13/index.md#prop-gw1-13-zero-degree)で古典積は $1\smile1=1$、$1\smile h=h$、$h^2=0$。[基本類公理](../GW1-15/index.md#thm-gw1-15-fundamental-class)により正次数の単位挿入はすべて0。

一方、[次数1の点計数](../GW1-14/index.md#thm-gw1-14-p1-degree-one)に[因子公理](../GW1-15/index.md#thm-gw1-15-divisor)を用いると

$$
\langle h,h,h\rangle_1=1
$$

を得る。三点で $\deg_{\mathbb C} M_{3,d}=1+2d$、$h,h,h$ の複素余次元和は3なので $d=1$ 以外は消える。双対基底の $\phi^h=1$ に対応するため

$$
1*1=1,\qquad1*h=h,\qquad h*h=q.
$$

(iii) 双線形性から

$$
u*v=(ac+bdq)+(ad+bc)h.
$$

これと $w$ を掛け、定数部と $h$ 部を順に取ると

$$
\begin{aligned}
((u*v)*w)_{\mathrm{const}}
&=(ac+bdq)e+(ad+bc)fq\\
&=ace+bdqe+adfq+bcfq,\\
((u*v)*w)_h
&=(ac+bdq)f+(ad+bc)e\\
&=acf+bdqf+ade+bce.
\end{aligned}
$$

一方 $v*w=(ce+dfq)+(cf+de)h$ なので

$$
\begin{aligned}
(u*(v*w))_{\mathrm{const}}
&=a(ce+dfq)+b(cf+de)q\\
&=ace+adfq+bcfq+bdqe,\\
(u*(v*w))_h
&=a(cf+de)+b(ce+dfq)\\
&=acf+ade+bce+bdqf.
\end{aligned}
$$

それぞれの係数は一致する。$\mathbb Q[[q]]$ は可換な係数環なので、並べ替えに追加の符号はない。これで $\mathbb P^1$ の二次元量子環に限った結合律を直接確かめた。しかし、任意の凸射影標的での結合律はこの個別表の計算からは従わず、[WDVV の境界分裂](#thm-gw1-16-wdvv)と[非退化ペアリングによる証明](#thm-gw1-16-associativity)を必要とする。
<!-- solution-end -->
