# GW1-15 GWの基本公理と分裂公式

<!-- definition-example-audit: strict -->

## 1. 一つずつ数えた値を、計算の規則へ変える

[前講の手計算](../GW1-14/index.md#thm-gw1-14-p2-lines)では、射影平面の二点を通る直線を数え、挿入を増やしても実際の標点がどう決まるかを調べた。毎回モジュライを具体的に構成する方法だけでは、次数や標点が増えたときに計算が続かない。そこで、安定写像の**標点を忘れる操作**と**節点で分裂する操作**から、GW不変量の計算法則を導く。

本講の範囲は、滑らかな**凸複素射影多様体** $X$（複素次元 $m$）、種数0、評価類だけを挿入する**一次（primary）不変量**である。凸性は[定義](../GW1-09/index.md#def-gw1-09-convex)に従う。[安定写像モジュライの存在](../GW1-10/index.md#thm-gw1-10-moduli-existence)と[滑らかさ・次元](../GW1-10/index.md#thm-gw1-10-smooth-dimension)によって、以下の積分は滑らかな固有 Deligne–Mumford スタックの有理基本類に対するものとして正当化される。非凸標的や高種数へ、通常の基本類による議論をそのまま移さない。

有効曲線類 $\beta\in H_2(X;\mathbb Z)$、標点数 $k$ について

$$
M_{k,\beta}=\overline{\mathcal M}_{0,k}(X,\beta),\qquad
D(k,\beta)=m-3+\langle c_1(TX),\beta\rangle+k
$$

と書く。**安定範囲**は $\beta\ne0$ なら $k\ge0$、$\beta=0$ なら $k\ge3$ である。[一次GW不変量の定義](../GW1-13/index.md#def-gw1-13-primary-invariant)を簡記して

$$
\langle\alpha_1,\ldots,\alpha_k\rangle_{\beta}
=\int_{[M_{k,\beta}]}\prod_{i=1}^{k}\operatorname{ev}_i^*\alpha_i
$$

と置く。係数は $\mathbb Q$、特記しない限り挿入 $\alpha_i$ は斉次コホモロジー類とする。$k=0$ の積は単位類 $1$。次数が合わない積分と空のモジュライの積分は0だが、**不安定な組では積分自体が定義されない**。

すでに[次数必要条件](../GW1-13/index.md#prop-gw1-13-dimension-constraint)によって、非零となるには挿入の実次数の和が $2D(k,\beta)$ でなければならない。以下の公理は、その次数条件を破って数を作る規則ではない。

## 2. 標点の名前を変えても数は変わるか

標点は番号付きであっても、番号を同時に付け替えれば同じ幾何学的状況を表す。一方、コホモロジーのカップ積には次数による交換符号がある。

<a id="prop-gw1-15-symmetry"></a>

<!-- formal-statement-start -->
> **命題（一次GW不変量の次数付き対称性）**  
> $X$ を滑らかな凸射影多様体、$(\beta,k)$ を上記の安定範囲とする。斉次類 $\alpha_i\in H^{d_i}(X;\mathbb Q)$ に対し、隣り合う二挿入を交換した値は

$$
\langle\ldots,\alpha_i,\alpha_{i+1},\ldots\rangle_\beta
=(-1)^{d_i d_{i+1}}
\langle\ldots,\alpha_{i+1},\alpha_i,\ldots\rangle_\beta
$$

> となる。特に全挿入が偶数次数なら通常の対称性を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

標点の入れ替えはモジュライ上の自己同型を与え、評価写像の番号を交換する。基本類はその自己同型で保存され、符号はカップ積の次数付き交換則だけから出る。

<!-- proof-start -->
### 証明

標点 $i,i+1$ を交換する同型を $s:M_{k,\beta}\to M_{k,\beta}$ とする。[評価写像の定義](../GW1-11/index.md#def-gw1-11-evaluation)から

$$
\operatorname{ev}_i\circ s=\operatorname{ev}_{i+1},
\qquad
\operatorname{ev}_{i+1}\circ s=\operatorname{ev}_{i}.
$$

$s$ はスタックの基本類を保存する。積分の被積分類を $s^*$ で引き戻すと、二つの隣接因子の順序だけが逆になる。次数付き交換則

$$
\operatorname{ev}_{i+1}^*\alpha_i\smile
\operatorname{ev}_{i}^*\alpha_{i+1}
=(-1)^{d_id_{i+1}}
\operatorname{ev}_{i}^*\alpha_{i+1}\smile
\operatorname{ev}_{i+1}^*\alpha_i
$$

と $\int_{[M]}s^*\Theta=\int_{[M]}\Theta$ を合わせて結論を得る。
<!-- proof-end -->

**直接例**。$\mathbb P^2$ の超平面類 $H$ と点類 $H^2$ はともに偶数実次数だから、[前講で計算した値](../GW1-14/index.md#thm-gw1-14-p2-lines)について

$$
\langle H^2,H^2,H\rangle_{1}
=\langle H,H^2,H^2\rangle_{1}=1
$$

である。ここで添字 $1$ は直線の曲線類を表す。任意の奇数次数類についても「符号なし」とは言っていない。

## 3. 基本類を挿入すると、なぜ零になるか

標的 $X$ の単位類 $1\in H^0(X;\mathbb Q)$ の評価引き戻しは常に $1$ である。「掛けても変わらないのだから不変量も同じ」と考えたくなる。しかし、**新しい標点を一つ置くとモジュライの複素次元が1増す**。この差が基本類公理の源である。

[忘却射](../GW1-11/index.md#def-gw1-11-forgetful)を $f:M_{k+1,\beta}\to M_{k,\beta}$ と書く。忘れる前と後がともに安定なら、この射は一つ余分な標点の位置を動かす普遍曲線であり、相対複素次元は1である。[忘却射と評価の可換性](../GW1-11/index.md#prop-gw1-11-forget-evaluation)も使える。

<a id="thm-gw1-15-fundamental-class"></a>

<!-- formal-statement-start -->
> **定理（基本類公理・単位類挿入）**  
> $X$ を滑らかな凸射影多様体とする。$\beta\ne0$ かつ $k\ge0$、または $\beta=0$ かつ $k\ge3$ とし、$\alpha_i\in H^*(X;\mathbb Q)$ を任意の斉次類とする。このとき

$$
\langle\alpha_1,\ldots,\alpha_k,1\rangle_\beta=0.
$$

> $\beta=0$ で三標点の値 $\langle\alpha,\gamma,1\rangle_0=\int_X\alpha\smile\gamma$ は本定理の例外であり、一般には零でない。この例外では、単位類を忘れた先の二標点モジュライが不安定である。
<!-- formal-statement-end -->

### 証明の見取り図

残る挿入は忘却射 $f$ による引き戻しになる。しかし $f$ のファイバーは複素一次元で、$f_*1$ はコホモロジーの次数を2下げるため零である。次数条件だけからも同じことが確かめられる。

<!-- proof-start -->
### 証明

安定な忘却射 $f$ がある場合、$\Theta=\prod_{i=1}^{k}\operatorname{ev}_i^*\alpha_i$ を $M_{k,\beta}$ 上の類とする。[忘却射と評価の可換性](../GW1-11/index.md#prop-gw1-11-forget-evaluation)により、追加標点での単位挿入を含めた被積分類は $f^*\Theta$ である。固有で相対複素次元1の普遍曲線に対するファイバー積分は次数を実次数で2下げる。従って

$$
f_*1\in H^{-2}(M_{k,\beta};\mathbb Q)=0,
$$

であり、射影公式から

$$
\begin{aligned}
\langle\alpha_1,\ldots,\alpha_k,1\rangle_\beta
&=\int_{[M_{k+1,\beta}]}f^*\Theta\\
&=\int_{[M_{k,\beta}]}\Theta\smile f_*1=0.
\end{aligned}
$$

ここでスタックの有理基本類についてのファイバー積分・射影公式を用い、有限自己同型がある場合もその有理重みを含む。別の検算として、元の $M_{k,\beta}$ で挿入次数が $2D(k,\beta)$ なら、追加した $1$ は次数を増やさない一方、積分先の必要次数は $2D(k+1,\beta)=2D(k,\beta)+2$ となる。元の挿入次数が $2D(k,\beta)+2$ なら、追加後に形式上次数が一致する場合もある。しかしそのとき元のモジュライ上の $\Theta$ 自体が最高次数を超えるので零である。いずれの場合も $f_*1=0$ と整合する。
<!-- proof-end -->

**例外の検算**。$X=\mathbb P^1$、点類 $h$ について[次数0の一次不変量](../GW1-13/index.md#prop-gw1-13-zero-degree)から

$$
\langle h,1,1\rangle_0=\int_{\mathbb P^1}h=1.
$$

この $k=3$ では $\beta=0,k=2$ の忘却先がないため、上の証明は開始できない。対して正次数 $1$ の $\langle h,h,1\rangle_1$ は、$D(3,1)=3$ に対して挿入の複素余次元が $2$ にすぎず、実際に0になる。[次数1の二点計数](../GW1-14/index.md#thm-gw1-14-p1-degree-one)の値 $\langle h,h\rangle_1=1$ と混同しない。

## 4. 因子類は曲線の次数を取り出す

今度は単位類でなく、実次数2の因子類 $D\in H^2(X;\mathbb Q)$ を余分な標点へ挿入する。標点の位置を曲線上で動かし、その像を通じて $D$ を積分すると、得られるのは写像が表す曲線類との交叉数 $\langle D,\beta\rangle$ である。

ここで「ファイバー積分」の中身を確かめる。安定写像 $u:C\to X$ を固定すると、追加標点の位置は節点や既存標点の近くでは小さな定数泡を生むことがあるが、安定化した普遍曲線のファイバー全体は $C$ を表す。追加標点の評価射による因子類の積分は

$$
\int_Cu^*D=\langle D,u_*[C]\rangle
=\langle D,\beta\rangle.
$$

節点付きの $C$ では各成分 $C_v$ について $\beta=\sum_v(u|_{C_v})_*[C_v]$ であり、値は成分ごとの交叉数の和となる。定数泡の寄与は0である。この確認が、忘却射に沿うファイバー積分を単なる記号操作にしないための要点となる。

<a id="thm-gw1-15-divisor"></a>

<!-- formal-statement-start -->
> **定理（因子公理）**  
> $X$ を滑らかな凸射影多様体、$D\in H^2(X;\mathbb Q)$ を因子類、$\alpha_i\in H^*(X;\mathbb Q)$ を斉次類とする。$\beta\ne0,k\ge0$、または $\beta=0,k\ge3$ で忘却前後のモジュライが安定なら

$$
\langle\alpha_1,\ldots,\alpha_k,D\rangle_\beta
=\langle D,\beta\rangle
\langle\alpha_1,\ldots,\alpha_k\rangle_\beta.
$$

> $\beta=0,k=2$ の左辺は安定な三標点不変量として定義されるが、右辺の二標点不変量は定義されないので、この式を適用してはならない。
<!-- formal-statement-end -->

### 証明の見取り図

[忘却射](../GW1-11/index.md#def-gw1-11-forgetful)のファイバー上で、新しい標点の評価類 $\operatorname{ev}_{k+1}^*D$ を積分する。その値は曲線類が固定されているため、各ファイバーで $\langle D,\beta\rangle$ で一定である。

<!-- proof-start -->
### 証明

$f:M_{k+1,\beta}\to M_{k,\beta}$ を忘却射とし、$M_{k,\beta}$ 上で $\Theta=\prod_{i=1}^k\operatorname{ev}_i^*\alpha_i$ とする。[評価と忘却の可換性](../GW1-11/index.md#prop-gw1-11-forget-evaluation)によって

$$
\langle\alpha_1,\ldots,\alpha_k,D\rangle_\beta
=\int_{[M_{k+1,\beta}]}
f^*\Theta\smile\operatorname{ev}_{k+1}^*D.
$$

$f$ は普遍曲線であるから、余分な標点を動かすファイバーの積分を、上で確かめた式へ適用する。節点付き写像も総曲線類が $\beta$ に固定されるので、有理コホモロジーの次数0の類として

$$
f_*(\operatorname{ev}_{k+1}^*D)
=\langle D,\beta\rangle\cdot1
\quad\text{in }H^0(M_{k,\beta};\mathbb Q).
$$

右辺は連結成分ごとにも同じ定数である。射影公式を使って

$$
\begin{aligned}
\langle\alpha_1,\ldots,\alpha_k,D\rangle_\beta
&=\int_{[M_{k,\beta}]}
\Theta\smile f_*(\operatorname{ev}_{k+1}^*D)\\
&=\langle D,\beta\rangle
\int_{[M_{k,\beta}]}\Theta
=\langle D,\beta\rangle\langle\alpha_1,\ldots,\alpha_k\rangle_\beta.
\end{aligned}
$$

これで証明された。基本類公理との違いは、$1$ のファイバー積分が負の次数に落ちるのに対して、実次数2の $D$ は相対次元1をちょうど埋める点である。
<!-- proof-end -->

**直接例**。$\mathbb P^2$ の直線類 $H$、次数1の曲線類 $\beta_1$ では $\langle H,\beta_1\rangle=1$。[二点を通る直線の計数](../GW1-11/index.md#prop-gw1-11-line-two-points)で

$$
\langle H^2,H^2\rangle_{\beta_1}=1
$$

となる。[因子公理](#thm-gw1-15-divisor)を適用すると

$$
\langle H^2,H^2,H\rangle_{\beta_1}
=1\cdot\langle H^2,H^2\rangle_{\beta_1}
=1,
$$

であり、[前講の三条件の手計算](../GW1-14/index.md#thm-gw1-14-p2-lines)と一致する。$H^2$ は実次数4の**点類**であり因子類ではない。もし $X=\mathbb P^2,\beta=0,k=2$ なら $\langle H,H,1\rangle_0=1$ に対し、二標点側の積分は存在しない。したがって $\langle H,0\rangle=0$ を掛けて消してはならない。

## 5. 分裂公式を「相関の積の和」として使う

[一節点分裂の定義](../GW1-12/index.md#def-gw1-12-admissible-splitting)では、標点集合を $S=A\sqcup B$、曲線類を $\beta=\beta_A+\beta_B$ に分け、節点用の標点 $*$ を左右へ一つずつ加えた。両側の写像は節点で同じ $X$ の点を取る必要があり、その条件を[対角類](../GW1-12/index.md#def-gw1-12-diagonal-matching)が担う。

ここでは偶数実次数の挿入だけを用い、対角類の**全成分**を有理 Künneth 分解

$$
[\Delta_X]=\sum_t p_t\boxtimes q_t
\quad\text{in }H^{2m}(X\times X;\mathbb Q)
$$

と表す。$p_t,q_t$ は斉次類であり、奇数次数コホモロジーがある標的では、必要な符号をこの分解の各項に含める。単に偶数部分だけを取り出して全対角類と同一視しない。例えば $\mathbb P^2$ では $1,H,H^2$ の基底と双対基底から

$$
[\Delta_{\mathbb P^2}]
=1\boxtimes H^2+H\boxtimes H+H^2\boxtimes1
$$

となる。これは[対角類の節点一致の計算](../GW1-12/index.md#def-gw1-12-diagonal-matching)の直接例である。

[凸標的の一節点境界の分裂公式](../GW1-12/index.md#thm-gw1-12-boundary-splitting)により、固定した許容分裂の境界に沿う評価積分は、節点挿入 $p_t,q_t$ を持つ二つの不変量の積の和で計算できる。一般の無標点・同次数の対称な分裂には交換による $1/2$ が現れることがある。しかし、以下の四標点の比較ではラベル $1,2$ と $3,4$ が左右を識別するため、**交換を別の境界として再計数しない**。

種数0の標点集合 $S=\{1,\ldots,k\}$（$k\ge4$）から $1,2,3,4$ だけ残して安定化する射を考える。これは[四標点の交比と境界三点](../GW1-07/index.md#thm-gw1-07-four-point-compactification)への射

$$
\mathrm{st}_{1234}:M_{k,\beta}
\longrightarrow\overline{\mathcal M}_{0,4}\simeq\mathbb P^1
$$

である。境界点 $12|34$ の逆像は、$1,2$ が左、$3,4$ が右にある分裂境界の和となる。射影直線上の二境界点 $12|34$ と $13|24$ のコホモロジー類は等しい。この等式から数値公式を得る。

<a id="prop-gw1-15-four-point-sum"></a>

<!-- formal-statement-start -->
> **命題（四標点相関の境界和公式）**  
> $X$ を滑らかな凸複素射影多様体、$\beta$ を有効曲線類、$k\ge4$ とし、$(\beta,k)$ は安定範囲にあるとする。$\alpha_1,\ldots,\alpha_k$ を偶数実次数の斉次コホモロジー類とし、その複素余次元和が $D(k,\beta)-1$ であると仮定する。上記の全対角分解を用いれば

$$
\begin{aligned}
&\sum_{\substack{\beta_A+\beta_B=\beta\\
S=A\sqcup B\\
\{1,2\}\subset A,\ \{3,4\}\subset B}}^{\rm stable}
\ \sum_t
\langle(\alpha_i)_{i\in A},p_t\rangle_{\beta_A}
\langle(\alpha_j)_{j\in B},q_t\rangle_{\beta_B}\\
={}&
\sum_{\substack{\gamma_A+\gamma_B=\beta\\
S=A\sqcup B\\
\{1,3\}\subset A,\ \{2,4\}\subset B}}^{\rm stable}
\ \sum_t
\langle(\alpha_i)_{i\in A},p_t\rangle_{\gamma_A}
\langle(\alpha_j)_{j\in B},q_t\rangle_{\gamma_B}.
\end{aligned}
$$

> 上付きの $\rm stable$ は両側へ節点標点を足した安定写像が存在し得る分裂だけを和に入れることを表す。安定範囲外の二・一・零標点の次数0相関を、零の項として加えてはならない。分裂された標点は番号順に並べる。
<!-- formal-statement-end -->

### 証明の見取り図

二つの境界点の Poincaré 双対は $\mathbb P^1$ 上で等しい。それを $\mathrm{st}_{1234}$ に引き戻して評価積と交叉し、[一節点分裂定理](../GW1-12/index.md#thm-gw1-12-boundary-splitting)で境界ごとに因子化する。

<!-- proof-start -->
### 証明

$h\in H^2(\overline{\mathcal M}_{0,4};\mathbb Q)$ を点類とする。[四標点境界の同値性](../GW1-12/index.md#prop-gw1-12-four-point-boundary)によって

$$
\operatorname{PD}[12|34]=h=\operatorname{PD}[13|24].
$$

$M_{k,\beta}$ 上の評価類の積を $\Theta=\prod_{i\in S}\operatorname{ev}_i^*\alpha_i$ とする。仮定の複素余次元和は $D(k,\beta)-1$ だから、$\Theta\smile\mathrm{st}_{1234}^*h$ はちょうど複素余次元 $D(k,\beta)$ に達し、基本類上で積分できる。ゆえに

$$
\begin{aligned}
\int_{[M_{k,\beta}]}\Theta\smile
\mathrm{st}_{1234}^*\operatorname{PD}[12|34]
&=\int_{[M_{k,\beta}]}\Theta\smile\mathrm{st}_{1234}^*h\\
&=\int_{[M_{k,\beta}]}\Theta\smile
\mathrm{st}_{1234}^*\operatorname{PD}[13|24].
\end{aligned}
$$

左辺の境界逆像では、左側に $1,2$、右側に $3,4$ が載る一節点分裂を列挙する。$\beta_A+\beta_B=\beta$ の各項で、[貼り合わせ射](../GW1-12/index.md#prop-gw1-12-clutching)により節点の像は対角条件を満たし、[凸標的の一節点境界の分裂公式](../GW1-12/index.md#thm-gw1-12-boundary-splitting)に従って、全対角類の各 $p_t\boxtimes q_t$ が左右の積分の積を与える。挿入 $\alpha_i$ が偶数次数なので、左右の外部積の並べ替えに追加の Koszul 符号は出ない。$p_t,q_t$ が奇数次数である場合に必要な符号は、すでに全対角分解の係数に含まれている。

二節点以上の層は[境界余次元](../GW1-10/index.md#prop-gw1-10-boundary)が2以上であり、因子としての基本類には寄与しない。一節点の分裂では $1,2$ と $3,4$ が左右を区別するので、一般点で貼り合わせ写像の次数は1である。したがって別の $1/2$ は掛けない。同じ操作を右辺の $13|24$ に行えば、主張の二つの和になる。
<!-- proof-end -->

**最小例：分裂積分は元の一次不変量とは違う。** $X=\mathbb P^1,\beta=0,k=4$ とし、$\alpha_1=h,\alpha_2=\alpha_3=\alpha_4=1$ とする。$D(4,0)=2$ なので挿入の複素余次元は1で、境界積分の条件 $D-1=1$ を満たす。$\beta=0$ なので各側には二つの元の標点と節点標点の計三つが必要で、$12|34$ は唯一の分割である。対角は $1\boxtimes h+h\boxtimes1$ だから

$$
\begin{aligned}
&\langle h,1,1\rangle_0\langle1,1,h\rangle_0
+\langle h,1,h\rangle_0\langle1,1,1\rangle_0\\
&\qquad=1\cdot1+0\cdot0=1.
\end{aligned}
$$

$13|24$ 側でも同様に1である。一方、[次数0・四標点の一次不変量](../GW1-13/index.md#prop-gw1-13-zero-degree)自体は $\langle h,1,1,1\rangle_0=0$。**境界点の類を余分に掛けた積分**と元の一次不変量は別物である。分裂公式の両辺を取り違えてはいけない。

## 6. 公理が使えないときの見分け方

| 操作 | 正当化する射・条件 | 典型的な落とし穴 |
| --- | --- | --- |
| 挿入の交換 | 番号付き標点の置換 | 奇数次数で交換符号を落とす |
| 単位類 $1$ の追加 | 忘却射の相対次元1、$f_*1=0$ | 次数0・三標点から二標点へ忘れる |
| 因子類 $D$ の追加 | $f_*\operatorname{ev}_{k+1}^*D=\langle D,\beta\rangle$ | 点類 $H^2$ を因子類と誤認する |
| 分裂の和 | 節点一致の対角類と境界の貼り合わせ | 不安定な定数成分・枝を重複して数えること |
| 四標点の比較 | $\overline{\mathcal M}_{0,4}$ の境界点の同値性 | 境界積分と一次不変量を同一視する |

次の講義では、この四標点の関係を三点GW不変量で定義する量子積へ代入し、結合律と WDVV の式を導く。本講では結合律をまだ仮定していない。

## 7. 演習と詳細解答

### Level A

<a id="ex-gw1-15-a01"></a>
#### GW1-15-A01 次数制約と定義域外を区別する
- Level: A

$X=\mathbb P^2$ とし、$H$ は直線類とする。次数0について、$\langle H,H,1\rangle_0$、$\langle H,H,H\rangle_0$、$\langle H^2,1,1,1\rangle_0$ の値と、$\langle H,H\rangle_0$ がそもそも定義されるかを判定せよ。

<!-- solution-start -->
**詳細解答**。[次数0の積表示](../GW1-10/index.md#prop-gw1-10-zero-degree)では三標点のモジュライは $\mathbb P^2$ である。したがって[三点公式](../GW1-13/index.md#prop-gw1-13-zero-degree)から

$$
\langle H,H,1\rangle_0=\int_{\mathbb P^2}H^2=1,\qquad
\langle H,H,H\rangle_0=\int_{\mathbb P^2}H^3=0.
$$

四標点では $M_{4,0}\simeq\mathbb P^2\times\overline{\mathcal M}_{0,4}$ の複素次元は3だが、$\operatorname{ev}_i$ は第一因子への射影だから $H^2$ の複素余次元2しか供給できない。よって $\langle H^2,1,1,1\rangle_0=0$。二標点・次数0では定数球面の自己同型が無限個で、安定写像モジュライが定義されないので $\langle H,H\rangle_0$ は**未定義**である。零とは区別する。
<!-- solution-end -->

<a id="ex-gw1-15-a02"></a>
#### GW1-15-A02 置換と次数符号
- Level: A

斉次類 $\alpha\in H^{d}(X)$、$\gamma\in H^{e}(X)$ について、隣接交換の符号を導け。特に実次数 $d=2,e=4$ と $d=e=1$ の二場合を求めよ。

<!-- solution-start -->
**詳細解答**。[次数付き対称性](#prop-gw1-15-symmetry)では標点の置換が評価写像を交換し、カップ積の交換則 $\alpha\smile\gamma=(-1)^{de}\gamma\smile\alpha$ を適用する。$2\cdot4=8$ は偶数なので符号は $+1$、$1\cdot1=1$ は奇数なので符号は $-1$ である。奇数次数類が零なら後者の具体的な相関も零になり得るが、**符号の規則そのもの**は変わらない。
<!-- solution-end -->

<a id="ex-gw1-15-a03"></a>
#### GW1-15-A03 単位挿入を見分ける
- Level: A

$X=\mathbb P^1$ の点類 $h$ について、$\langle h,h\rangle_1$ と $\langle h,h,1\rangle_1$ の値を求め、後者を前者と等しいと置けない理由を述べよ。

<!-- solution-start -->
**詳細解答**。[次数1の点計数](../GW1-14/index.md#thm-gw1-14-p1-degree-one)から $\langle h,h\rangle_1=1$ である。$D(2,1)=2$ で二つの点類の複素余次元和も2だから次数が一致する。一方 $D(3,1)=3$ なのに $h,h,1$ の複素余次元和は $1+1+0=2$ である。[基本類公理](#thm-gw1-15-fundamental-class)または[次数必要条件](../GW1-13/index.md#prop-gw1-13-dimension-constraint)によって $\langle h,h,1\rangle_1=0$。標点が増えると必要次数も増すため、単位類を掛けたというだけでは同じ値にならない。
<!-- solution-end -->

<a id="ex-gw1-15-a04"></a>
#### GW1-15-A04 因子類と点類を取り違えない
- Level: A

$\mathbb P^2$ で曲線類 $\beta=d[\text{直線}]$ とする。$H$ に対する因子公理の係数を求めよ。また $H^2$ を同じ係数で因子公理へ代入できるか答えよ。

<!-- solution-start -->
**詳細解答**。定義より $\langle H,\beta\rangle=\int_\beta H=d\int_{[\text{直線}]}H=d$ である。忘却前後が安定なら[因子公理](#thm-gw1-15-divisor)は

$$
\langle\alpha_1,\ldots,\alpha_k,H\rangle_\beta
=d\,\langle\alpha_1,\ldots,\alpha_k\rangle_\beta
$$

を与える。$H^2\in H^4(\mathbb P^2)$ は実次数4で、複素一次元ファイバーの積分後に実次数2の類を残す。したがって $f_*\operatorname{ev}_{k+1}^*H^2$ は一般には数ではなく、$H^2$ を因子公理の $D\in H^2(X)$ に代入してはならない。
<!-- solution-end -->

<a id="ex-gw1-15-a05"></a>
#### GW1-15-A05 分裂成分の安定性
- Level: A

四標点 $S=\{1,2,3,4\}$、$\beta=0$ の場合、$12|34$ の一節点分裂で左右は安定か。また $A=\{1\}$、$B=\{2,3,4\}$ を許容分裂に含められるかを説明せよ。

<!-- solution-start -->
**詳細解答**。$12|34$ では左に $1,2,*$、右に $3,4,*$ の各三特殊点がある。次数0成分の安定性条件を両方満たすので許容される。一方、$A=\{1\}$ 側には $1,*$ の二特殊点しかない。球面の二点を固定する自己同型 $z\mapsto az$（$a\in\mathbb C^\times$）が無限に残るため[安定写像の次数0条件](../GW1-08/index.md#prop-gw1-08-zero-class)を満たさない。従ってこの分割は[許容される一節点分裂](../GW1-12/index.md#def-gw1-12-admissible-splitting)には入らない。
<!-- solution-end -->

### Level B

<a id="ex-gw1-15-b01"></a>
#### GW1-15-B01 忘却射に沿うファイバー積分を再構成する
- Level: B

安定な忘却射 $f:M_{k+1,\beta}\to M_{k,\beta}$ に対して、$f_*1=0$ と $f_*\operatorname{ev}_{k+1}^*D=\langle D,\beta\rangle$ をそれぞれ説明し、基本類公理と因子公理の違いを導け。

<!-- solution-start -->
**詳細解答**。忘却射は相対複素次元1の普遍曲線である。ファイバー積分は実次数を2下げるので、$1$ は実次数0から $-2$ へ移り、$H^{-2}=0$ により $f_*1=0$ となる。一方 $D\in H^2(X)$ なら、追加標点の評価類の実次数は2で、ファイバー積分は実次数0の類になる。安定写像 $u:C\to X$ のファイバー上では

$$
\int_Cu^*D
=\sum_v\int_{C_v}u^*D
=\sum_v\langle D,(u|_{C_v})_*[C_v]\rangle
=\langle D,\beta\rangle.
$$

[忘却と評価の可換性](../GW1-11/index.md#prop-gw1-11-forget-evaluation)で残りの挿入を $f^*\Theta$ と書き、射影公式 $\int_{M_{k+1,\beta}}f^*\Theta\,\eta=\int_{M_{k,\beta}}\Theta\,f_*\eta$ を $\eta=1$、$\eta=\operatorname{ev}_{k+1}^*D$ にそれぞれ適用すれば、[基本類公理](#thm-gw1-15-fundamental-class)の零と[因子公理](#thm-gw1-15-divisor)の係数を得る。
<!-- solution-end -->

<a id="ex-gw1-15-b02"></a>
#### GW1-15-B02 次数0の四標点境界を二つの方法で計算する
- Level: B

$X=\mathbb P^1$、$\beta=0$、挿入 $(h,1,1,1)$ とする。$12|34$ と $13|24$ の境界積分を分裂公式で求め、それぞれ元の一次不変量 $\langle h,1,1,1\rangle_0$ と比較せよ。

<!-- solution-start -->
**詳細解答**。$D(4,0)=1-3+4=2$、挿入の複素余次元和は1で、境界積分にはちょうどよい。[射影直線の対角分解](../GW1-12/index.md#def-gw1-12-diagonal-matching)を $[\Delta]=1\boxtimes h+h\boxtimes1$ と書く。次数0では両側に二つの元の標点と節点が必要だから、$12|34$ で使えるのはこの一つの分割だけである。三標点公式から

$$
\begin{aligned}
&\langle h,1,1\rangle_0\langle1,1,h\rangle_0
+\langle h,1,h\rangle_0\langle1,1,1\rangle_0\\
&\qquad=1\cdot1+0\cdot0=1.
\end{aligned}
$$

$13|24$ は $h$ と $1$ の所属が左右で同じ型なので、同じ二項を計算して1となる。一方、[次数0・四標点不変量の消滅](../GW1-13/index.md#prop-gw1-13-zero-degree)から $\langle h,1,1,1\rangle_0=0$。二境界積分は $\mathrm{st}^*[\text{点}]$ という実次数2の因子をさらに掛けているため、一次不変量と異なってよい。
<!-- solution-end -->

<a id="ex-gw1-15-b03"></a>
#### GW1-15-B03 四標点の境界和に次数条件を使う
- Level: B

$X=\mathbb P^2$、$\beta=1$、挿入 $(H^2,1,H^2,H)$ とする。$D(4,1)$ と挿入の複素余次元和を求め、$12|34$ 側の分裂で $\beta_A=0,\beta_B=1$ の寄与を計算せよ。

<!-- solution-start -->
**詳細解答**。[次元公式](../GW1-10/index.md#thm-gw1-10-smooth-dimension)へ $m=2,c_1(T\mathbb P^2)\cdot1=3,k=4$ を代入すると

$$
D(4,1)=2-3+3+4=6.
$$

挿入の複素余次元和は $2+0+2+1=5=D-1$ なので、通常の四点一次不変量ではなく境界積分にちょうど合う。分割 $A=\{1,2\},B=\{3,4\}$ と $\beta_A=0,\beta_B=1$ を取る。[対角分解](../GW1-12/index.md#def-gw1-12-diagonal-matching)の三項を順に代入する。左側の三点定数写像に対して

$$
\langle H^2,1,1\rangle_0=1,\quad
\langle H^2,1,H\rangle_0=0,\quad
\langle H^2,1,H^2\rangle_0=0.
$$

従って $1\boxtimes H^2$ の項だけが残り、その右側は[次数1の二点と直線計数](../GW1-14/index.md#thm-gw1-14-p2-lines)により $\langle H^2,H,H^2\rangle_1=1$。よってこの分裂の寄与は $1\cdot1=1$。左右とも $\beta=0$ としてはいけない。次数の和が1にならないからである。
<!-- solution-end -->

<a id="ex-gw1-15-b04"></a>
#### GW1-15-B04 因子公理の不安定例外を反証する
- Level: B

$X=\mathbb P^2$ の $\langle H,H,1\rangle_0$ に因子公理を形式的に適用して零と結論する議論の、どの仮定が破れているか説明せよ。また $\beta=1$ の $\langle H^2,H^2,H\rangle_1$ では適用可能なことを確認せよ。

<!-- solution-start -->
**詳細解答**。次数0の三標点は安定で、[三点公式](../GW1-13/index.md#prop-gw1-13-zero-degree)から

$$
\langle H,H,1\rangle_0=\int_{\mathbb P^2}H^2=1.
$$

因子類 $H$ を一つ忘れた先は $\beta=0,k=2$ となる。定数球面は二標点では無限自己同型を持ち、[忘却射](../GW1-11/index.md#def-gw1-11-forgetful)の安定な行き先が存在しない。したがって[因子公理](#thm-gw1-15-divisor)の仮定を破っており、$\langle H,0\rangle\langle H,1\rangle_0$ という形式的な積は定義されない。

正次数1では二標点の写像は非定数で安定である。[二点を通る直線の計数](../GW1-11/index.md#prop-gw1-11-line-two-points)より $\langle H^2,H^2\rangle_1=1$、直線類との交叉は $\langle H,1\rangle=1$ だから

$$
\langle H^2,H^2,H\rangle_1
=\langle H,1\rangle\langle H^2,H^2\rangle_1=1.
$$

同じ形式の因子挿入でも、**忘却後の安定性**が結論を左右する。
<!-- solution-end -->

### Level C

<a id="ex-gw1-15-c01"></a>
#### GW1-15-C01 四標点分裂を両側から全件計算する
- Level: C

$X=\mathbb P^2$、$\beta=1$、挿入 $(H^2,1,H^2,H)$ とする。四標点相関の境界和公式の $12|34$ と $13|24$ の両側を、$\beta_A+\beta_B=1$ の全ての可能性と対角類の各項を検査して計算せよ。零となる分裂の理由と、分裂した標点が安定であることも確認せよ。

<!-- solution-start -->
**詳細解答**。$X$ の複素次元は2、$c_1(TX)\cdot\beta=3$ なので $D(4,1)=6$、挿入の複素余次元和は $2+0+2+1=5=D-1$。[四標点境界和公式](#prop-gw1-15-four-point-sum)を使える。$\beta=1$ なので、有効な分裂は $(\beta_A,\beta_B)=(0,1),(1,0)$ の二つだけである。いずれの分割でも各側には元の二標点と節点を加えた三標点があるため、定数側も安定である。

まず $12|34$ とし、$A=\{1,2\}$、$B=\{3,4\}$ を固定する。対角は

$$
[\Delta_{\mathbb P^2}]
=1\boxtimes H^2+H\boxtimes H+H^2\boxtimes1.
$$

$(0,1)$ の場合、左の三点相関は $\langle H^2,1,p_t\rangle_0$ で、複素余次元を2に合わせるには $p_t=1$ だけが可能である。その項は

$$
\langle H^2,1,1\rangle_0
\langle H^2,H,H^2\rangle_1
=1\cdot1=1
$$

となる。右の値1は[射影平面の次数1計数](../GW1-14/index.md#thm-gw1-14-p2-lines)による。$(1,0)$ では左の三点相関 $\langle H^2,1,p_t\rangle_1$ の複素次元は $D(3,1)=5$、挿入の余次元は最大でも $2+0+2=4$ なので全項0。従って $12|34$ 側の和は1である。

次に $13|24$ では $A=\{1,3\}$、$B=\{2,4\}$。$(0,1)$ では左の三点定数写像の挿入が $(H^2,H^2,p_t)$ で、最小でも余次元4が $D(3,0)=2$ を超えるため全て0。$(1,0)$ では左は $(H^2,H^2,p_t)$、右は $(1,H,q_t)$ となる。左の複素次元5を満たすには $p_t=H$（余次元1）が必要で、対角類の対応する右挿入も $q_t=H$ である。よって

$$
\langle H^2,H^2,H\rangle_1
\langle1,H,H\rangle_0
=1\cdot\int_{\mathbb P^2}H^2
=1\cdot1=1.
$$

$1\boxtimes H^2$ と $H^2\boxtimes1$ の項は左右の次数が一致しないため零となる。結局

$$
\mathcal B_{12|34}=1=\mathcal B_{13|24}.
$$

四点の元の一次不変量は挿入余次元5と $D(4,1)=6$ が一致しないので0だが、境界因子を掛けた和は1である。これは結合律を仮定せず、**境界点の同値性・対角分解・既知の低次数計数**から直接導かれた。
<!-- solution-end -->
