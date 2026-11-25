# TSP13 support functionals・エントロピーによるスペクトル評価

## 1. 非零成分の配置から情報量を読む

[三因子テンソルのスペクトル極値公式](../TSP12/index.md#thm-tsp12-three-tensor) は漸近階数と漸近劣階数をスペクトル点の極値として表した。しかし、スペクトル点の存在だけでは具体的な数値を計算できない。本講では係数の非零位置を有限集合として取り出し、そこに確率を配ることで情報量を計算する。非零係数の絶対値を確率にする必要はないので、任意の体でもこの計算を始められる。

体 $K$ 上の有限次元三因子テンソル $t\in U_1\otimes U_2\otimes U_3$ を扱う。各因子の順序付き基底を $B_i=(e_{i,a})_{a=1}^{d_i}$ とし、まとめて $B=(B_1,B_2,B_3)$ と書く。[多因子テンソル積の存在・基底・一意性](../TSP1/index.md#thm-tsp1-multifactor-basis) により、次の基底展開の係数 $t_{abc}\in K$ は一意に決まる。

$$
t=\sum_{a=1}^{d_1}\sum_{b=1}^{d_2}\sum_{c=1}^{d_3}
t_{abc}e_{1,a}\otimes e_{2,b}\otimes e_{3,c}.
$$

この展開で係数が零でない位置だけを集めたものを台と呼ぶ。

<a id="def-tsp13-support"></a>

<!-- formal-statement-start -->
> **定義（テンソルの台）**
>
> 基底の組 $B$ に関する三因子テンソル $t$ の台は、次の有限集合である。

$$
S_B(t)=\{(a,b,c):t_{abc}\ne0\}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsp13-support -->
**定義の確認**

例えば $W=e_{1,2}\otimes e_{2,1}\otimes e_{3,1}+e_{1,1}\otimes e_{2,2}\otimes e_{3,1}+e_{1,1}\otimes e_{2,1}\otimes e_{3,2}$ とする。三つの基底積は異なり、係数はすべて1である。残りの係数は0なので台は $\{(2,1,1),(1,2,1),(1,1,2)\}$ である。
<!-- definition-example-end -->

台 $S$ が空でないとき、$\mathcal P(S)$ は各点へ非負実数を割り当て、総和を1とする確率分布の集合とする。分布 $P$ の第 $i$ 周辺分布を $P_i$ と書く。例えば第1周辺は

$$
P_1(a)=\sum_{b,c:(a,b,c)\in S}P(a,b,c)
$$

である。各周辺は非負で総和1になる。以後、[Shannonエントロピー](../../../応用系/INFO/INFO1/index.md#def-info1-entropy) を底2で用いる。

$$
H(p)=-\sum_{a:p(a)>0}p(a)\log_2 p(a).
$$

零確率の項は0とする。三つの因子の重要度を変えるため、重み $\theta_i\ge0$ を選び、$\sum_{i=1}^3\theta_i=1$ とする。全ての重みの組を $\Theta$ と書く。固定した台の上で確率分布を動かし、周辺エントロピーの重み付き和を最大化する。

<a id="def-tsp13-support-entropy"></a>

<!-- formal-statement-start -->
> **定義（重み付き台エントロピー）**
>
> 空でない有限添字集合 $S$ と重み $\theta\in\Theta$ に対し、

$$
h_\theta(S)=\max_{P\in\mathcal P(S)}
\sum_{i=1}^3\theta_iH(P_i)
$$

> と定める。
<!-- formal-statement-end -->

最大値は存在する。有限個の確率を並べた単体は閉かつ有界で、周辺化は線形である。$-x\log_2 x$ は $x=0$ で0へ連続に延長できるため目的関数は連続であり、コンパクト集合上で最大値を取る。

<!-- definition-example-start: def-tsp13-support-entropy -->
**定義の確認**

$S=\{(1,1,1),(2,2,2)\}$ に確率 $p,1-p$ を配る。三つの周辺はすべて $(p,1-p)$ で、重み付き和は $H(p,1-p)$ そのものになる。[有限離散エントロピーの上下限](../../../応用系/INFO/INFO1/index.md#thm-info1-entropy-bounds) から最大は $p=1/2$ のとき1である。したがってどの重みでも $h_\theta(S)=1$ となる。
<!-- definition-example-end -->

## 2. 基底の選び方を最適化する

階数と同じく、基底を変えても値が変わらない量が欲しい。台は基底で変化するため、固定基底での最大化だけでは足りない。基底についてさらに最小化し、底2で指数化した量を定める。

<a id="def-tsp13-upper-support"></a>

<!-- formal-statement-start -->
> **定義（上側support functional）**
>
> 体 $K$ 上の有限次元三因子テンソル $t$ と $\theta\in\Theta$ に対し、$t\ne0$ なら

$$
\zeta^\theta(t)=2^{\min_B h_\theta(S_B(t))}
$$

> と定める。最小は各因子のすべての基底の組について取る。零テンソルには $\zeta^\theta(0)=0$ を割り当てる。
<!-- formal-statement-end -->

固定された次元では台の候補は有限個なので、実際に実現される台の中で最小値を取れる。基底変換は基底の組全体を並べ替えるだけだから、可逆な局所写像で値は変わらない。

<!-- definition-example-start: def-tsp13-upper-support -->
**定義の確認**

非零の単純テンソル $u_1\otimes u_2\otimes u_3$ を考える。各 $u_i$ を最初の基底ベクトルに選べば台は一点で、唯一の分布の周辺はすべて一点集中、エントロピーは0となる。他の基底でも各エントロピーは非負だから最小値は0、従って $\zeta^\theta(t)=1$ である。

さらに各因子の次元が2以上なら、$u_i$ と独立な $v_i$ を選ぶ。次の二本は独立である。

$$
\alpha(u_i-v_i)+\beta v_i
=\alpha u_i+(\beta-\alpha)v_i=0
\quad\Longrightarrow\quad \alpha=\beta=0.
$$

従って $u_i-v_i,v_i$ を基底の最初の二本に取れる。各 $u_i$ はこの二本の和なので、多重線形性で積を展開すると互いに異なる $2^3=8$ 個の基底積が係数1で現れる。一様分布の各周辺は公平な二値分布で、重み付きエントロピーは1である。各周辺の上限も1なので、この基底では $2^{h_\theta}=2$ となる。固定基底の値が不変量でないことが分かる。
<!-- definition-example-end -->

## 3. 局所線形写像で値が増えない理由

単なる座標の削除であれば台も縮む。しかし一般の線形写像は一つの基底ベクトルを複数の成分へ展開する。そこで、確率の大きい入力添字から順に出力基底を選ぶ。最適分布から得る各添字の費用を使えば、展開後も費用が増えない。以下の $s\preceq t$ は [テンソルの制限](../TSP4/index.md#def-tsp4-restriction)、すなわち局所線形写像のテンソル積で $t$ を $s$ に移せることを表す。

<a id="thm-tsp13-monotonicity"></a>

<!-- formal-statement-start -->
> **定理（上側support functionalの単調性）**
>
> 同一の体上の有限次元三因子テンソル $s,t$ と $\theta\in\Theta$ に対し、$s\preceq t$ なら

$$
\zeta^\theta(s)\le\zeta^\theta(t).
$$
<!-- formal-statement-end -->

[制限同値](../TSP5/index.md#def-tsp5-restriction-equivalence) とは $s\preceq t$ と $t\preceq s$ がともに成立することである。この場合、定理を両方向に適用できるので値は等しい。

<!-- proof-start -->
### 証明

まず $s,t\ne0$ とする。$B$ を $t$ の最小値を与える基底とし、$S=S_B(t)$ と置く。最大化分布を $P$、その周辺を $p_i$、最大値を $h$ とする。

$\theta_i>0$ の因子では、台に出現する添字 $a$ は必ず $p_i(a)>0$ である。もし $p_i(a)=0$ なら、その添字を含む台の点 $v$ を選び、$0<\epsilon<1$ に対して

$$
P_\epsilon=(1-\epsilon)P+\epsilon\delta_v
$$

とする。ここで $\delta_v$ は点 $v$ に全質量を置く分布である。

新しい正確率 $\epsilon$ の項は $-\epsilon\log_2\epsilon$ を生む。もともと正だった項の変化の絶対値は、ある定数 $C$ により $C\epsilon$ 以下に抑えられる。

実際、各正確率の近傍では $-x\log_2 x$ の[導関数](../../../基礎科目/RA/RA3/index.md#def-ra3-derivative) が有界なので、[平均値定理](../../../基礎科目/RA/RA3/index.md#thm-ra3-mvt) を適用できる。項数は有限だから定数をまとめられる。他の零確率項の変化は非負である。

従って目的関数の増加量は少なくとも

$$
\epsilon(-\theta_i\log_2\epsilon-C)
$$

である。$\epsilon\to0+$ で括弧内は正になるから、最大化に矛盾する。

各台の点 $v=(a_1,a_2,a_3)$ に対し、同じ $P_\epsilon$ に沿う右微分を計算する。正重みの因子だけを足すと

$$
\left.\frac{d}{d\epsilon}\sum_i\theta_iH((P_\epsilon)_i)\right|_{0+}
=\sum_{i:\theta_i>0}\theta_i(-\log_2 p_i(a_i))-h.
$$

実際、$b$ を第 $i$ 因子の添字として、$p_{i,\epsilon}(b)=(1-\epsilon)p_i(b)+\epsilon\delta_{a_i}(b)$ と書く。ここで $\delta_{a_i}(b)$ は $b=a_i$ のとき1、他は0である。$\epsilon$ だけを動かし、$p_i,a_i$ は固定する。台に出る添字では $p_i(b)>0$ なので、[連鎖律](../../../基礎科目/RA/RA3/index.md#prop-ra3-chain-rule) を用いて

$$
\left.\frac{d}{d\epsilon}H(p_{i,\epsilon})\right|_{0+}
=\sum_b\left(-\log_2 p_i(b)-\frac1{\ln 2}\right)
(\delta_{a_i}(b)-p_i(b)).
$$

和は台に出る添字に限る。$\ln$ は自然対数である。$\sum_b(\delta_{a_i}(b)-p_i(b))=0$ より定数項が消え、

$$
-\log_2 p_i(a_i)+\sum_b p_i(b)\log_2 p_i(b)
=-\log_2 p_i(a_i)-H(p_i)
$$

となる。最大点からの右微分は非正だから

$$
\sum_{i:\theta_i>0}\theta_i(-\log_2 p_i(a_i))\le h
\quad(v\in S).
$$

[制限の定義](../TSP4/index.md#def-tsp4-restriction) により $s=(A_1\otimes A_2\otimes A_3)t$ と書く。各因子で台に出る入力ベクトル $e_{i,a}$ の像 $A_i e_{i,a}$ を、正重みなら $p_i(a)$ の大きい順、零重みなら任意の順に調べる。既に選んだ像の線形結合で表せない像だけを採用する。この手順で像の張る空間の基底が得られる。出力空間全体の基底へ延長する。

入力添字 $a$ の像を展開したとき、現れる採用済み基底ベクトルの元の入力添字 $b$ は $p_i(b)\ge p_i(a)$ を満たす。採用された添字に $q_i(b)=p_i(b)$ を割り当てると $\sum_b q_i(b)\le1$ となる。延長分の基底は $s$ の台に出ない。

$s$ の非零成分は少なくとも一つの $t$ の非零成分の展開から生じる。従って出力台の各点 $w=(b_1,b_2,b_3)$ について

$$
\sum_{i:\theta_i>0}\theta_i(-\log_2 q_i(b_i))\le h.
$$

出力台の任意の確率分布 $R$ で平均する。周辺を $r_i$ とすると左辺の平均は $\sum_i\theta_i\sum_b r_i(b)(-\log_2 q_i(b))$ である。正重みについて $c_i=\sum_b q_i(b)$ は正で1以下。正規化した $q_i/c_i$ と $r_i$ に [Gibbs不等式](../../../応用系/INFO/INFO2/index.md#thm-info2-gibbs) を適用すると

$$
H(r_i)\le-\sum_b r_i(b)\log_2 q_i(b)+\log_2 c_i
\le-\sum_b r_i(b)\log_2 q_i(b).
$$

よって重み付き周辺エントロピーは $h$ 以下である。最大化してもこの上界を超えず、基底について最小化して2の冪を取れば結論が得られる。$s=0$ なら定義から成立し、$t=0$ なら制限により $s=0$ である。
<!-- proof-end -->

例えば三因子のうち一つの因子に線形射影を作用させて二項から一項に減らすと、残った非零単純テンソルの値は1になる。この単調性は台の単純な包含だけでなく、任意の局所線形写像にも使える点が重要である。

## 4. 積と直和を情報量で測る

[テンソルのKronecker積](../TSP5/index.md#def-tsp5-kronecker) では各因子の添字を二つ組にする。積基底において台は元の二つの台の直積になる。相関を許した二つ組の情報量はそれぞれの情報量の和を超えない。また [テンソルの直和](../TSP5/index.md#def-tsp5-direct-sum) は互いに異なる座標ブロックに二つのテンソルを置く操作である。積と直和の記号をそれぞれ $\boxtimes,\oplus$ とする。

<a id="thm-tsp13-product-sum"></a>

<!-- formal-statement-start -->
> **定理（上側support functionalの劣乗法性・劣加法性）**
>
> 同一の体上の有限次元三因子テンソル $s,t$ と $\theta\in\Theta$ について、

$$
\zeta^\theta(s\boxtimes t)\le\zeta^\theta(s)\zeta^\theta(t),
$$

$$
\zeta^\theta(s\oplus t)\le\zeta^\theta(s)+\zeta^\theta(t).
$$
<!-- formal-statement-end -->

積では結合分布の周辺化を、直和ではどちらのブロックから選ばれたかを記録する。

<!-- proof-start -->
### 証明

非零の場合を示す。$s,t$ で最小化する基底を選び、それぞれの台の最大値を $a,b$ と置く。

積基底の台の任意の分布 $P$ から元の二つの台への周辺分布 $R,T$ を作る。第 $i$ 因子の二つ組の分布を $P_i$ とすると、[相互情報量の相対エントロピー表示](../../../応用系/INFO/INFO2/index.md#thm-info2-mutual-kl) と [Gibbs不等式](../../../応用系/INFO/INFO2/index.md#thm-info2-gibbs) から

$$
0\le D(P_i\|R_i\otimes T_i)
=H(R_i)+H(T_i)-H(P_i).
$$

ここで $R_i\otimes T_i$ は二つの周辺確率の積分布であり、$P_i$ の正の確率がある点では両周辺確率も正である。従って

$$
H(P_i)\le H(R_i)+H(T_i).
$$

重み付き和を取ると $a+b$ 以下となる。

一方、$R,T$ をそれぞれ最大化分布に選んだ独立な積分布では、対数が和に分かれるので等号になる。従って積基底の最大値は $a+b$。全基底についての最小値はそれ以下である。

[テンソルの直和](../TSP5/index.md#def-tsp5-direct-sum) の連結基底では、台は二つの互いに混ざらないブロックからなる。任意の分布について第一ブロックの総確率を $\lambda$ とする。ブロックを条件とする分布を $R,T$ とすれば、各因子の添字からブロックが判明するため、[結合エントロピーの連鎖律](../../../応用系/INFO/INFO1/index.md#thm-info1-chain-rule) により

$$
H(P_i)=H(\lambda,1-\lambda)+\lambda H(R_i)+(1-\lambda)H(T_i).
$$

$\lambda=0,1$ の場合は質量0のブロックの項を0とする。最大化した重み付き和は、$\lambda$ を固定すれば $H(\lambda,1-\lambda)+\lambda a+(1-\lambda)b$ である。

$Z=2^a+2^b$、$q=(2^a/Z,2^b/Z)$ と置く。[相対エントロピー](../../../応用系/INFO/INFO2/index.md#def-info2-relative-entropy) を展開すると

$$
D((\lambda,1-\lambda)\|q)
=\log_2 Z-H(\lambda,1-\lambda)-\lambda a-(1-\lambda)b.
$$

[Gibbs不等式](../../../応用系/INFO/INFO2/index.md#thm-info2-gibbs) により最大値は $\log_2 Z$、達成点は $\lambda=2^a/Z$ である。全基底の最小値はこの連結基底での値以下なので、指数化して直和の結論を得る。零との積は零、零との直和は未使用座標を除いて元のテンソルと制限同値なので、[上側support functionalの単調性](#thm-tsp13-monotonicity) により制限同値なテンソルの値は等しい。零の値は定義により0である。
<!-- proof-end -->

積基底での等号と、すべての基底にわたる最小値での等号を混同してはいけない。積空間では積基底でない基底も選べるため、上の証明だけでは乗法性の逆向きは出てこない。

## 5. 対角テンソルと漸近劣階数の評価

[対角テンソル](../TSP4/index.md#def-tsp4-diagonal) $D_r$（$r$ は非負整数）を測るには基底を変えても値が小さくならないことが必要である。そのため、まず一つの因子に固定ベクトルを持つ項で対角テンソルを表すと、最低何項必要かを考える。

<a id="lem-tsp13-diagonal-slices"></a>

<!-- formal-statement-start -->
> **補題（対角テンソルの一因子固定項の下界）**
>
> 体 $K$ と非負整数 $r$ を固定する。$K^r$ の標準基底を用いて対角テンソルを

$$
D_r=\sum_{j=1}^r e_j\otimes e_j\otimes e_j
$$

> とする。これを一つの因子のベクトルと残る二因子のテンソルとの積である項の和として表すとする。項ごとに固定する因子を変えてよい。このとき項数は少なくとも $r$ である。
<!-- formal-statement-end -->

第3因子の固定ベクトルを消す $K$ への線形写像を選ぶと、残る二つの因子の項は階数1以下の行列になる。一方、対角テンソルの縮約は対角行列なので、その階数を下から評価できる。

<!-- proof-start -->
### 証明

第1、第2、第3因子を固定する項数をそれぞれ $a,b,c$ とする。$c\ge r$ なら結論は成立する。第3因子の固定ベクトルを $w_1,\ldots,w_c$ とする。線形写像 $\ell:K^r\to K$ は係数 $x_j=\ell(e_j)$ で決まり、$w_k=\sum_j w_{jk}e_j$ を消す条件は

$$
\sum_{j=1}^r w_{jk}x_j=0
\qquad (1\le k\le c)
$$

である。$r$ 個の未知数に対する高々 $c$ 本の独立な線形条件なので、これらの条件を満たす係数ベクトル全体の次元は少なくとも $r-c$ である。

これらの線形写像の係数空間の次元を $m\ge r-c$ とする。基底を行として並べた行列は階数 $m$ なので、独立な $m$ 本の列を選べる。その $m$ 列からなる正方行列を $M$ とすると $M$ は可逆である。基底の線形結合の係数を行ベクトル $z$ とすると、選んだ列での座標をすべて1にするには次のように選べばよい。

$$
z=(1,\ldots,1)M^{-1},\qquad zM=(1,\ldots,1).
$$
従って対応する線形写像 $\ell$ は少なくとも $m$ 個の座標で非零となる。この議論は有限体でも成立する。

$\ell$ で第3因子を縮約する、すなわち $\operatorname{id}\otimes\operatorname{id}\otimes\ell$ を作用させると、残る二因子のテンソルは

$$
\sum_{j=1}^r \ell(e_j)e_j\otimes e_j
$$

となる。二因子の標準基底で第1添字を行、第2添字を列とした [平坦化](../TSP3/index.md#def-tsp3-flattening) の係数行列は $\operatorname{diag}(\ell(e_1),\ldots,\ell(e_r))$ である。非零の対角成分に対応する列は独立だから、その階数は少なくとも $m\ge r-c$ である。第3因子を固定した項は消える。

第1因子を固定した項 $u\otimes v$（$v\in K^r\otimes K^r$）は縮約後に $u\otimes(\operatorname{id}\otimes\ell)v$ となる。その係数行列の各列は $u$ のスカラー倍なので階数は1以下である。第2因子を固定した項では各列が縮約後の第1因子ベクトルのスカラー倍となり、同じ下界計算に使える。

行列の和の列空間は各列空間の和に含まれるから、階数は $a+b$ 以下。従って $r-c\le a+b$、すなわち $r\le a+b+c$ である。
<!-- proof-end -->

<a id="thm-tsp13-normalization"></a>

<!-- formal-statement-start -->
> **定理（上側support functionalの対角正規化）**
>
> 任意の体上の三因子の [対角テンソル](../TSP4/index.md#def-tsp4-diagonal) $D_r$ と $\theta\in\Theta$ について、$r\ge0$ なら

$$
\zeta^\theta(D_r)=r.
$$
<!-- formal-statement-end -->

標準基底では一様分布で $r$ を得られる。他の基底でそれより小さいと仮定し、冪を取って一因子固定項の個数を数えると、直前の補題と矛盾する。

<!-- proof-start -->
### 証明

$r=0$ は定義による。$r\ge1$ とする。標準基底の台は $(j,j,j)$ の $r$ 点である。全周辺は同じ分布であり、[有限離散エントロピーの上下限](../../../応用系/INFO/INFO1/index.md#thm-info1-entropy-bounds) より最大値は $\log_2 r$。従って $\zeta^\theta(D_r)\le r$。

逆向きに任意の基底を選び、その台を $S$、$h=h_\theta(S)$ と置く。正整数 $n$ に対し、$t^{\boxtimes n}$ は $t$ の $n$ 個のKronecker積を表す。積基底の非零成分は $S^n$ に対応する。各係数が元の $n$ 個の係数の積であり、体には零因子がないからである。

各成分について、$n$ 個の三つ組の出現割合を分布 $P$ とみなす。第 $i$ 因子の長さ $n$ の添字列の出現割合は $P_i$ である。

定義により $\sum_i\theta_iH(P_i)\le h$ なので、少なくとも一つの因子で $H(P_i)\le h$ となる。

固定因子で出現回数 $(n_1,\ldots,n_r)$ を持つ列の数を $N$ とし、$p_j=n_j/n$ と置く。独立に $p$ から $n$ 回抽出すると、その出現回数を持つ列の各確率は

$$
\prod_{j:n_j>0}p_j^{n_j}=2^{-nH(p)}.
$$

全確率は1以下だから $N2^{-nH(p)}\le1$、従って $N\le2^{nH(p)}$。出現回数の候補は高々 $(n+1)^r$ 通りである。従ってエントロピーが $h$ 以下の添字列は一因子につき高々 $(n+1)^r2^{nh}$ 本である。

非零成分ごとに最初に $H(P_i)\le h$ となる因子を一つ選ぶ。選んだ因子とその添字列が同じ成分を集めれば、一因子固定項一つにまとめられる。三因子を合わせた項数は高々 $3(n+1)^r2^{nh}$ となる。

[対角テンソルの直和とKronecker積](../TSP5/index.md#thm-tsp5-diagonal-operations) により $D_r^{\boxtimes n}$ は $D_{r^n}$ と可逆な座標の並べ替えで一致する。[一因子固定項の下界](#lem-tsp13-diagonal-slices) から

$$
r^n\le3(n+1)^r2^{nh}.
$$

底2の対数を取り $n$ で割ると

$$
\log_2 r\le h+\frac{\log_2 3+r\log_2(n+1)}{n}.
$$

$n\to\infty$ で右の余分な項は0に収束し、$\log_2 r\le h$。任意の基底に対して成立するため最小化しても下界が残る。
<!-- proof-end -->

[テンソル劣階数](../TSP4/index.md#def-tsp4-subrank) $Q(t)$ は $D_q\preceq t$ となる最大の整数 $q$、[漸近階数と漸近劣階数](../TSP9/index.md#def-tsp9-asymptotic-rank) のうち $\widetilde Q(t)$ は $Q(t^{\boxtimes n})^{1/n}$ の極限である。$R(t)$ はテンソル階数を表す。

<a id="thm-tsp13-subrank-bound"></a>

<!-- formal-statement-start -->
> **定理（台エントロピーによる漸近劣階数の上界）**
>
> 任意の体上の有限次元三因子テンソル $t$ と $\theta\in\Theta$ について、

$$
\widetilde Q(t)\le\zeta^\theta(t)\le R(t).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[テンソル劣階数](../TSP4/index.md#def-tsp4-subrank) より $q_n=Q(t^{\boxtimes n})$ と置けば $D_{q_n}\preceq t^{\boxtimes n}$ である。[単調性](#thm-tsp13-monotonicity)、[対角正規化](#thm-tsp13-normalization)、[劣乗法性](#thm-tsp13-product-sum) を順に適用すると

$$
q_n=\zeta^\theta(D_{q_n})\le\zeta^\theta(t^{\boxtimes n})
\le\zeta^\theta(t)^n.
$$

非負の $n$ 乗根を取って [漸近階数と漸近劣階数](../TSP9/index.md#def-tsp9-asymptotic-rank) の極限へ移すと第一の不等式を得る。零の場合も各値は0である。

[対角テンソルによる階数の特徴付け](../TSP4/index.md#thm-tsp4-rank-restriction) から $t\preceq D_{R(t)}$ である。単調性と対角正規化をもう一度使うと第二の不等式が従う。
<!-- proof-end -->

<a id="sec-tsp13-w-entropy"></a>

## 6. 三項テンソルとスペクトル点の区別

第1節の $W$ を考える。三つの台の点に $x,y,z$ を配ると $x+y+z=1$ である。二値分布のエントロピーを $H_2(u)=H(u,1-u)$ ($0\le u\le1$) と書く。三つの周辺のエントロピーは $H_2(x),H_2(y),H_2(z)$ となる。

等重みでは最大化する分布は一様である。実際、$H_2'(u)=dH_2(u)/du$ とし、$u$ だけを動かして微分する。$H_2(u)=-u\log_2 u-(1-u)\log_2(1-u)$ から $H_2'(u)=\log_2(1-u)-\log_2 u$ を得る。さらに [高階導関数](../../../基礎科目/RA/RA3/index.md#def-ra3-higher-derivative) $H_2''(u)=dH_2'(u)/du$ を計算すると

$$
H_2''(u)=-1/((\ln2)u(1-u))<0.
$$

これは $0<u<1$ で成立し、連続性で端点も含め凹性を持つ。まず $H_2((x+y)/2)\ge (H_2(x)+H_2(y))/2$、次に重み $2/3,1/3$ で $(x+y)/2,z$ に凹性を適用して

$$
\frac{H_2(x)+H_2(y)+H_2(z)}3\le H_2(1/3)
$$

となる。$x=y=z=1/3$ で達成する。従って [台エントロピーによる漸近劣階数の上界](#thm-tsp13-subrank-bound) から

$$
\widetilde Q(W)\le\zeta^{(1/3,1/3,1/3)}(W)
\le2^{H_2(1/3)}=\frac{3}{2^{2/3}}<2.
$$

最後の等号は $H_2(1/3)=\log_2 3-2/3$ から従う。[平坦化階数によるスペクトル点](../TSP11/index.md#thm-tsp11-flattening-spectral-point) からも漸近劣階数の上界を得られる。各一因子平坦化の行階数は2である（例えば第1因子の行は列 $(1,1)$ と列 $(2,1),(1,2)$ に互いに素な非零位置を持つ）。三つの平坦化階数だけからは得られなかった厳しい上界である。

### 研究との接続

[スペクトル点](../TSP11/index.md#def-tsp11-spectral-point) は単調性と正規化に加え、直和と積で等号を要求する。第4節の劣乗法性だけでは漸近階数の下界を結論できない。実際、$t\preceq D_{R(t)}$ から単一コピーの上界は得られるが、$\zeta^\theta(t^{\boxtimes n})$ が $\zeta^\theta(t)^n$ より小さい可能性を上の論証だけでは排除できない。

歴史的には Strassen (1991) は、ある基底で台が積順序の反鎖（異なる二点が全座標で同時に大小比較できない集合）になる oblique テンソルの半環上で上側support functionalのスペクトル点性を示した。2026年1月の Sakabe・Doğan・Walter の[論文 Theorem 1.1](https://arxiv.org/abs/2601.21553) は、複素数体上の任意の有限次元テンソルについて上側support functionalと量子エントロピーから作る量の一致を示し、スペクトル点性を導いた。2026年4月の Alman・Li・Pratt の[論文](https://arxiv.org/abs/2604.01386) は三因子で一つの重みが0のときのスペクトル点性を任意の体で扱う。

これらは研究文献の結果の紹介であり、本講の上界の証明はそれらに依存しない。一般の複素テンソルでの等号の証明には別の理論が必要である。スペクトル点性が成立する範囲を考える。[三因子テンソルのスペクトル極値公式](../TSP12/index.md#thm-tsp12-three-tensor) により漸近階数の下界にもなる。

## 7. 演習

### Level A

<a id="ex-tsp13-a01"></a>

#### TSP13-A01 周辺の計算

- Level: A

$S=\{(1,1,1),(1,2,2),(2,1,2)\}$ に確率 $1/2,1/4,1/4$ を配る。三つの周辺と等重みの目的関数を求めよ。

<!-- solution-start -->
##### 詳細解答

第1周辺と第2周辺はともに $(3/4,1/4)$。第3周辺は $(1/2,1/2)$ である。[重み付き台エントロピー](#def-tsp13-support-entropy) の目的関数は $(2H_2(1/4)+1)/3$。$H_2(1/4)=2-(3/4)\log_2 3$ だから、値は $(5-(3/2)\log_2 3)/3$ となる。これは指定分布での値で、最大値とは限らない。
<!-- solution-end -->

<a id="ex-tsp13-a02"></a>

#### TSP13-A02 単純テンソルの基底

- Level: A

$t=(e_1+e_2)\otimes e_1\otimes e_1$ を二次元の三因子で考える。標準基底で $\theta=(1/2,1/4,1/4)$ の台エントロピーを求め、上側support functionalと比較せよ。

<!-- solution-start -->
##### 詳細解答

標準基底の台は $(1,1,1),(2,1,1)$。第1周辺のみ二値で他は一点集中。従って最大値は $1/2$（第一周辺を一様にする）。固定基底の指数化は $\sqrt2$。第1因子で $(e_1+e_2,e_2)$ を選ぶと独立で台は一点になる。非負性と [上側support functional](#def-tsp13-upper-support) の最小化から値は1。
<!-- solution-end -->

<a id="ex-tsp13-a03"></a>

#### TSP13-A03 重みの端点

- Level: A

$S=\{(1,1,1),(1,2,2),(2,2,1),(3,1,1)\}$ で $\theta=(1,0,0)$ とする。最大値を達成する分布を一つ挙げよ。

<!-- solution-start -->
##### 詳細解答

第1周辺は三値なので [有限離散エントロピーの上下限](../../../応用系/INFO/INFO1/index.md#thm-info1-entropy-bounds) により $\log_2 3$ 以下。四点に順に $1/3,0,1/3,1/3$ を置けば第1周辺が一様になる。従って最大値は $\log_2 3$ である。
<!-- solution-end -->

<a id="ex-tsp13-a04"></a>

#### TSP13-A04 対角正規化

- Level: A

$D_3$ と $D_2$ の積について、任意の $\theta$ で値を求めよ。

<!-- solution-start -->
##### 詳細解答

[対角テンソルの直和とKronecker積](../TSP5/index.md#thm-tsp5-diagonal-operations) により積は対角添字 $(i,j)$ が6組の $D_6$ と同値。[対角正規化](#thm-tsp13-normalization) から値は6で、個々の値の積 $3\cdot2$ に一致する。
<!-- solution-end -->

### Level B

<a id="ex-tsp13-b01"></a>

#### TSP13-B01 二つのブロック

- Level: B

固定された二つの非零台の最大値が $a=1,b=2$ である。直和の連結基底で最大化するブロック確率と指数化した値を求めよ。

<!-- solution-start -->
##### 詳細解答

[劣乗法性・劣加法性の証明](#thm-tsp13-product-sum) の直和計算で $Z=2^1+2^2=6$。第一ブロックの確率を $\lambda$ とすると目的関数は $H_2(\lambda)+\lambda+2(1-\lambda)$。最大化条件は $\lambda=2/6=1/3$。その値は $H_2(1/3)+1/3+4/3=\log_2 3+1=\log_2 6$、指数化は6。これは連結基底での値であり、基底最小化後は高々6である。
<!-- solution-end -->

<a id="ex-tsp13-b02"></a>

#### TSP13-B02 列の出現割合

- Level: B

長さ6の二値列のうち記号2が2回現れるものを数え、第5節の数え上げ上界を確認せよ。

<!-- solution-start -->
##### 詳細解答

2の位置を6箇所から2箇所選ぶので $N=\binom62=15$。$p=(2/3,1/3)$ による独立抽出で各列の確率は $(2/3)^4(1/3)^2=16/729$。合計 $240/729\le1$ である。従って $N\le729/16=2^{6H_2(1/3)}$ となり、[対角正規化の証明](#thm-tsp13-normalization) で用いた上界を確認できる。
<!-- solution-end -->

<a id="ex-tsp13-b03"></a>

#### TSP13-B03 基底を選ぶ順序

- Level: B

一因子の入力確率を $(1/2,1/3,1/6)$、像を順に $v_1,v_2,v_1+v_2$ とする。$v_1,v_2$ は独立である。単調性の証明で採用する像と第三入力の費用比較を示せ。

<!-- solution-start -->
##### 詳細解答

確率降順に調べると $v_1,v_2$ を採用し、第三の像はその線形結合なので採用しない。出力の割当は $q=(1/2,1/3)$、総和は $5/6$。第三入力の費用は $\log_2 6$、二つの展開先の費用は $\log_2 2,\log_2 3$ なのでいずれも小さい。例えば出力分布 $(1/2,1/2)$ のエントロピーは1、交差費用は $(1+\log_2 3)/2>1$。これは [単調性](#thm-tsp13-monotonicity) の証明で使った不等式の具体例である。
<!-- solution-end -->

<a id="ex-tsp13-b04"></a>

#### TSP13-B04 片方の因子だけを測る

- Level: B

$t=\sum_{j=1}^r e_j\otimes e_j\otimes 1$ とする。任意の基底において第1周辺の最大エントロピーは $\log_2 r$ であることを示し、$\theta=(1,0,0)$ での値を求めよ（$r\ge1$、最初の二因子は $r$ 次元、第3因子は $K$）。

<!-- solution-start -->
##### 詳細解答

第3因子は一次元空間 $K$ とする。最初の二因子の係数行列は標準基底で単位行列 $I_r$ である。[多因子テンソルの基底変換](../TSP1/index.md#prop-tsp1-coordinate-change) により、旧基底を新基底で展開する係数行列を $A,B$、第3因子での $1$ の新座標を $\gamma\ne0$ とすると

$$
t'_{ab1}=\gamma\sum_{j=1}^r A_{aj}B_{bj},
\qquad (t'_{ab1})=\gamma AB^{\mathsf T}.
$$

$A,B$ は可逆なのでこの行列も可逆で階数は $r$。零行があれば可逆でないため、各行に非零成分が存在する。各行から非零成分を一つ選び、その $r$ 点に確率 $1/r$ を置くと第1周辺は一様になる。従って [有限離散エントロピーの上下限](../../../応用系/INFO/INFO1/index.md#thm-info1-entropy-bounds) から最大値は $\log_2 r$。全基底の最小もこの値で、$\zeta^{(1,0,0)}(t)=r$ である。
<!-- solution-end -->

### Level C

<a id="ex-tsp13-c01"></a>

#### TSP13-C01 平坦化との違い

- Level: C

第1節の $W$ に対して、三つの一因子平坦化階数を求め、等重みの固定基底での最適分布と漸近劣階数の上界を導出せよ。またこの上界の証明だけで漸近階数の下界を主張できるか。

<!-- solution-start -->
##### 詳細解答

[テンソルの平坦化](../TSP3/index.md#def-tsp3-flattening) は第1添字を行、残る二つの添字の組を列に対応させる。第1因子を行とすると列順 $(1,1),(1,2),(2,1),(2,2)$ の係数行列は

$$
\begin{pmatrix}0&1&1&0\\1&0&0&0\end{pmatrix}.
$$

非零列 $(0,1)^T,(1,0)^T$ が独立だから階数2。$W$ は因子の置換で三項が入れ替わるため第2、第3因子でも列順を対応させれば同じ行列を得る。分布を $(x,y,z)$ とすれば第1、第2、第3周辺は順に $(1-x,x),(1-y,y),(1-z,z)$ である。[第6節の二値エントロピーの計算](#sec-tsp13-w-entropy) で得た $H_2''(u)<0$ ($0<u<1$) と端点での連続性による凹性を用いると、平均は $H_2((x+y+z)/3)=H_2(1/3)$ 以下。一様分布が達成する。

$$
2^{H_2(1/3)}=2^{\log_2 3-2/3}=3/2^{2/3}.
$$

[漸近劣階数の上界](#thm-tsp13-subrank-bound) より $\widetilde Q(W)\le3/2^{2/3}$。この数が2未満なのは三乗して $27/4<8$ となるためである。平坦化階数による上界2より厳しい。基底最小化は値をさらに下げ得る。一般の乗法性をこの証明で得ていないので、$\zeta^\theta(W)\le\widetilde R(W)$ をこの論証だけで導くことはできない。別途スペクトル点性を示せば [スペクトル極値公式](../TSP12/index.md#thm-tsp12-three-tensor) を使える。
<!-- solution-end -->

## 8. 次講への接続

次は行列積テンソルについてスペクトル評価と行列積指数を結び付ける。個々のスペクトル点の値を求めることと、スペクトル全体で最大値を求めることは異なる課題である。
