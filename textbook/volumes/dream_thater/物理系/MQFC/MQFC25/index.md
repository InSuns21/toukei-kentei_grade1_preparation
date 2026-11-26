# MQFC25 強結合での相関減衰と格子ギャップ

直接の前提は [MQFC12](../MQFC12/index.md)、[MQFC21](../MQFC21/index.md)、[MQFC22](../MQFC22/index.md)、[MQFC23](../MQFC23/index.md)、[MQFC24](../MQFC24/index.md)、[SGT6](../../../計算系/SGT/SGT6/index.md) である。

前講の [Wilson loopの面積上界](../MQFC24/index.md#def-mqfc24-area-bound) は一つの大きな閉路の平均を調べた。今度は離れた二つの小さな観測量がどの程度独立に近づくかを調べる。さらに時間方向の相関が一様に速く減衰すれば、有限空間格子の大きさによらない励起エネルギーの下界が得られる。鍵は一辺の値を変えたとき、その影響が隣の辺にどれほど伝わるかを測ることである。

## 1. 一辺だけを動かす条件付き分布

次元 $d\ge2$ の有限直方体格子を自由境界で取る。正向き辺集合を $E$、基本正方形集合を $P$ とし、$G\subset U(N)$ をコンパクト部分群とする。$N$ は正整数、$\beta\ge0$ は無次元の結合パラメータである。配置を $x\in G^E$ と書く。[Wilson格子ゲージ測度](../MQFC21/index.md#def-mqfc21-measure) の定数因子を除いた重みは

$$
\mu(dx)=Z^{-1}\exp\left(\beta\sum_{p\in P}w_p(x)\right)\prod_{i\in E}d x_i,
\qquad
w_p(x)=N^{-1}\operatorname{Re}\operatorname{tr}x_p.
$$

ここで $dx_i$ は正規化Haar測度である。[Wilson格子作用の不変性と有界性](../MQFC21/index.md#prop-mqfc21-action-invariance) から $|w_p|\le1$ である。

一辺 $i$ 以外を固定した配置を $x_{\ne i}$ と書き、辺 $i$ に $u\in G$ を入れたときの値を $w_p(u,x_{\ne i})$ と書く。辺 $i$ を含まない正方形の重みは分子と分母で消えるので、一辺の条件付き確率分布は

$$
\pi_i(du\mid x_{\ne i})
=\frac{e^{V_i(u;x)}}{\int_G e^{V_i(v;x)}\,dv}\,du,
\qquad
V_i(u;x)=\beta\sum_{p\ni i}w_p(u,x_{\ne i}).
$$

分母は正で有限であり、全質量は1である。この式は全ての外側配置に対して定義される。

例えば一正方形で $G=\{1,-1\}$ とする。残り三辺の積が $s=\pm1$ なら $V_i(u;x)=\beta su$ だから

$$
\pi_i(u=1\mid s)=\frac{e^{\beta s}}{e^{\beta s}+e^{-\beta s}}
=\frac{1+s\tanh\beta}{2}.
$$

$\beta=0$ では外側の値によらず確率は $1/2$。$\beta$ が小さいときは他の一辺を変えても確率は少ししか動かない。

## 2. 影響を数にする

[有限集合上の全変動距離](../../../計算系/SGT/SGT6/index.md#def-sgt6-tv) の和を積分に拡張する。二つの確率密度 $p,q$ を同じHaar測度に関して比較するとき、全変動距離を $\|p-q\|_{\rm TV}=\frac12\int |p-q|$ と書く。有限群の一様Haar測度で確率質量を $p(u)/|G|,q(u)/|G|$ と書けば、積分表示は有限集合上の和と一致する。$|p-q|\le p+q$ を積分すると0以上1以下である。一辺を変更して条件付き分布がどれだけ動くか、その最大値を行列に並べる。

<a id="def-mqfc25-influence"></a>

<!-- formal-statement-start -->
> **定義（Dobrushin影響係数）**
> 有限辺集合 $E$ 上のWilson測度の一辺条件付き分布を $\pi_i$ とする。異なる辺 $i,j$ に対し

$$
c_{ij}=\sup_{x,y:\ x_k=y_k\ (k\ne j)}
\|\pi_i(\cdot\mid x_{\ne i})-\pi_i(\cdot\mid y_{\ne i})\|_{\rm TV}.
$$

> $c_{ii}=0$ とし、各成分が0以上の行列 $C=(c_{ij})$ とその最大行和

$$
q=\max_{i\in E}\sum_{j\in E}c_{ij}
$$

> を用いる。$q<1$ をDobrushinの収縮条件とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc25-influence -->
**定義の確認**：上の一正方形二値模型では、異なる辺 $j$ の符号を反転すると $s$ が反転する。二点分布の全変動距離は $u=1$ の確率の差の絶対値に等しいので

$$
c_{ij}=\left|\frac{1+\tanh\beta}{2}-\frac{1-\tanh\beta}{2}\right|=\tanh\beta.
$$

同じ配置を選べば差は0であり、異なる値を選ぶと上の値になるので上限もこの値である。対角成分は0、各行に非対角成分が3個あるから $q=3\tanh\beta$。例えば $\tanh\beta=1/4$ なら $q=3/4<1$ となる。
<!-- definition-example-end -->

一般のコンパクト群でも確率密度の変化量を抑えられる。二辺を共に含む正方形の数を $m_{ij}$ とする。外側の辺 $j$ を変えても、そのような正方形以外は辺 $i$ の条件付き分布に影響しない。

<a id="thm-mqfc25-wilson-influence"></a>

<!-- formal-statement-start -->
> **定理（Wilson測度の強結合影響評価）**
> 自由境界の有限直方体格子（次元 $d\ge2$）、コンパクト群 $G\subset U(N)$、$\beta\ge0$ のWilson測度について

$$
c_{ij}\le 2\beta m_{ij}\quad(i\ne j),\qquad
q\le 12(d-1)\beta.
$$

> 特に $0\le\beta<1/[12(d-1)]$ なら収縮条件が成立する。この十分条件は格子の辺数によらない。
<!-- formal-statement-end -->

証明の要点は、二つの密度をいきなり比較せず、指数の中身を連続的に移すことである。正規化定数の微分も含めれば、その変化量を積分できる。

<!-- proof-start -->
### 証明

辺 $j$ だけ異なる外側配置を $x,y$ とする。$D(u)=V_i(u;y)-V_i(u;x)$ と置く。各 $w_p$ の値域は $[-1,1]$ なので

$$
|D(u)|\le2\beta m_{ij}.
$$

$0\le t\le1$ に対して $V_t=V_i(\cdot;x)+tD$、$Z_t=\int e^{V_t}$、$p_t=e^{V_t}/Z_t$ とする。指数とその微分はコンパクト群上で有界なので微分を積分内へ移せる。

$$
Z_t'=\int D(u)e^{V_t(u)}\,du,\qquad
\frac{Z_t'}{Z_t}=\int D(u)p_t(u)\,du.
$$

従って商の微分から

$$
\partial_t p_t(u)=p_t(u)\left(D(u)-\int D(v)p_t(v)\,dv\right).
$$

括弧の絶対値は $4\beta m_{ij}$ 以下であり、$p_t$ の積分は1である。各 $u$ で $p_1(u)-p_0(u)=\int_0^1\partial_t p_t(u)\,dt$ と書き、積分の絶対値を絶対値の積分で上から抑えると

$$
\begin{aligned}
\frac12\int |p_1-p_0|
&\le\frac12\int_0^1\int|\partial_t p_t|\,du\,dt\\
&\le2\beta m_{ij}.
\end{aligned}
$$

上限を取ると第1の主張を得る。

一本の辺は自身の方向と異なる $d-1$ 方向のそれぞれで高々二枚の正方形に属する。境界では枚数が減るだけである。各正方形は自身のほかに三辺を持つので、重複を回数込みで数えると

$$
\sum_{j\ne i}m_{ij}=3|\{p:p\ni i\}|\le6(d-1).
$$

よって各行について $\sum_j c_{ij}\le12(d-1)\beta$。最大を取れば結論となる。
<!-- proof-end -->

例えば $d=4,\ \beta=1/72$ なら上界は $36/72=1/2$。これは実際の最大行和が必ず $1/2$ に等しいという主張ではない。

## 3. 収縮から離れた観測量の相関へ

各辺を頂点とするグラフを考え、二辺が一つの正方形を共有するとき隣接させる。集合 $A,B\subset E$ の距離 $r(A,B)$ は、$A$ から $B$ に至る最短の隣接移動回数とする。交われば0、道がなければ無限大とする。

関数 $f$ が辺集合 $A$ のみに依存するとは、$A$ の辺の値を固定すれば残りを変えても $f$ が変わらないことをいう。一辺変更に対する関数の振れ幅を測る。

<a id="def-mqfc25-oscillation"></a>

<!-- formal-statement-start -->
> **定義（辺ごとの振動幅）**
> 有界可測関数 $f:G^E\to\mathbb C$ と辺 $i\in E$ に対し

$$
\delta_i(f)=\sup_{x,y:\ x_k=y_k\ (k\ne i)}|f(x)-f(y)|
$$

> とする。全ての辺の振動幅を行ベクトル $\delta(f)$ に並べる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc25-oscillation -->
**定義の確認**：二値群で $f(x)=x_1x_2$ とすると、第1辺だけを反転した差の絶対値は2、第2辺だけでも2、その他の辺では0である。全ての配置で $f=\pm1$ なので2を超える差はない。従って $\delta(f)=(2,2,0,\ldots,0)$ となる。
<!-- definition-example-end -->

一辺だけを条件付き分布で平均する操作を

$$
(P_i f)(x)=\int f(u,x_{\ne i})\pi_i(du\mid x_{\ne i})
$$

と置く。Wilson測度のもとで外側を固定した条件付き平均であり、$\mu(P_i f)=\mu(f)$ が成立する（ここで $\mu(f)=\int f\,d\mu$）。$M=|E|>0$ として、一辺を一様ランダムに選んで更新する平均操作を $P_0=M^{-1}\sum_i P_i$ と書く。$P_0$ は正方形集合 $P$ と別の記号である。

<a id="lem-mqfc25-oscillation-update"></a>

<!-- formal-statement-start -->
> **補題（一辺平均による振動幅の伝播）**
> 有限Wilson測度の条件付き平均 $P_i$ と影響行列 $C$ に対し、有界可測関数 $f$ は

$$
\delta_i(P_i f)=0,\qquad
\delta_j(P_i f)\le\delta_j(f)+c_{ij}\delta_i(f)\quad(j\ne i)
$$

> を満たす。従って成分ごとの不等式として

$$
\delta(P_0 f)\le\delta(f)R,\qquad
R=(1-M^{-1})I+M^{-1}C
$$

> が成立する。
<!-- formal-statement-end -->

自分の辺の影響は平均で消えるが、隣の辺を変えると平均に使った分布まで変わる。その二種類の変化を別々に数える。

<!-- proof-start -->
### 証明

$P_i f$ は $x_i$ に依存しない。$j\ne i$ として、辺 $j$ だけ異なる配置 $x,y$ を取る。$P_i f(x)-P_i f(y)$ の間に $\int f(u,y_{\ne i})\pi_i(du\mid x_{\ne i})$ を挿入する。最初の差は同一分布で関数だけを変えるので絶対値が $\delta_j(f)$ 以下である。

残る差は同じ関数を二つの確率分布で平均した差である。二密度の共通部分 $\min(p,q)$ を取り除くと、残る二つの非負な関数は両方とも質量 $t=\|p-q\|_{\rm TV}$ を持つ。$t>0$ ならそれらを $t$ で割って確率分布にできる。差は独立に選んだ二つの値における関数値の差の平均の $t$ 倍である。従って複素関数でも絶対値は $t\delta_i(f)$ 以下となる。$t=0$ なら差は0である。影響係数の定義から $t\le c_{ij}$ である。

$P_i$ について平均し、固定した $j$ に対して $i=j$ の項が0であることを使うと

$$
\delta_j(P_0 f)\le
\frac{M-1}{M}\delta_j(f)+\frac1M\sum_{i\ne j}c_{ij}\delta_i(f).
$$

これが行ベクトルの積である。
<!-- proof-end -->

二つの関数の連結相関を、複素共役を第1因子に置いて

$$
\operatorname{Cov}_\mu(f,g)=\mu(\overline f g)-\mu(\overline f)\mu(g)
$$

と書く。独立なら0になる量である。各辺の振動幅を使うと、遠くの関数へ影響が伝わるためには何回も隣接移動が必要だという事実を定量化できる。

<a id="thm-mqfc25-correlation-decay"></a>

<!-- formal-statement-start -->
> **定理（Dobrushin収縮による体積一様相関減衰）**
> 有限Wilson測度の影響行列の最大行和を $q<1$ とする。辺集合 $A,B$ のみにそれぞれ依存する有界可測関数 $f,g$ に対し、$r=r(A,B)<\infty$ なら

$$
|\operatorname{Cov}_\mu(f,g)|
\le \sum_{i,j}\delta_i(f)\left(\sum_{k=0}^\infty C^k\right)_{ij}\delta_j(g)
\le \frac{4|A|\|f\|_\infty\|g\|_\infty}{1-q}q^r.
$$

> $q^0=1$ とし、道がなければ相関は0である。格子全体の辺数は右辺に現れない。
<!-- formal-statement-end -->

収縮条件から、更新を繰り返した関数は定数に近づく。元の相関を一回ごとの変化に分けて足し戻すと、影響行列の冪の和が現れる。

<!-- proof-start -->
### 証明

$q<1$ なので $R$ の各行和は $\rho=1-(1-q)/M<1$ 以下である。[一辺平均による振動幅の伝播](#lem-mqfc25-oscillation-update) を反復して

$$
\delta(P_0^n f)\le\delta(f)R^n,\qquad
\sum_j\delta_j(P_0^n f)\le\rho^n\sum_i\delta_i(f)
$$

を得る。任意の二配置を一辺ずつ変更する経路で結べば関数値の差は振動幅の総和以下である。$\mu(P_0^n f)=\mu(f)$ だから、片方の配置を $\mu$ で平均すると

$$
\sup_x|P_0^n f(x)-\mu(f)|\le\rho^n\sum_i\delta_i(f)\longrightarrow0.
$$

よって望む相関は次の望遠和の極限である。

$$
\operatorname{Cov}_\mu(f,g)=
\sum_{n=0}^\infty \mu\left(\overline{(I-P_0)P_0^n f}\,g\right).
$$

実際、有限和では $f-P_0^{n+1}f$ が残り、一様収束と $g$ の有界性から極限を取れる。

有界関数 $h$ について辺 $i$ の外側を固定し、$h-P_i h$ の条件付き平均が0であることを使うと

$$
\mu(\overline{h-P_i h}\,g)
=\mu(\overline{h-P_i h}(g-P_i g)).
$$

各括弧の絶対値はそれぞれ $\delta_i(h),\delta_i(g)$ 以下である。これは一辺の全ての値についての差を確率分布で平均したためである。従って $I-P_0$ の定義から

$$
|\mu(\overline{(I-P_0)h}\,g)|
\le M^{-1}\sum_i\delta_i(h)\delta_i(g).
$$

$h=P_0^n f$ として前の振動幅評価を代入する。$\delta(g)^{\mathsf T}$ は列ベクトルである。

$$
|\operatorname{Cov}_\mu(f,g)|
\le M^{-1}\delta(f)\left(\sum_{n=0}^\infty R^n\right)\delta(g)^{\mathsf T}.
$$

$R$ の行和上界 $\rho<1$ より各成分の級数は収束する。有限幾何和に $I-R$ を掛けると $I-R^{n+1}$ となるため、極限は $(I-R)^{-1}$ である。$I-R=(I-C)/M$ だから

$$
M^{-1}\sum_{n=0}^\infty R^n=(I-C)^{-1}=\sum_{k=0}^\infty C^k.
$$

右端も行和上界 $q<1$ による収束と同じ幾何和の計算で正当化される。

$C$ の成分は正方形を共有しない辺間では0である。行列積 $(C^k)_{ij}$ は長さ $k$ の隣接移動に沿う係数の積の和である。$i\in A,j\in B$ では $k<r$ の項は0になる。さらに各行の和は高々 $q^k$ なので

$$
\begin{aligned}
\sum_{i\in A,j\in B}\delta_i(f)(C^k)_{ij}\delta_j(g)
&\le4\|f\|_\infty\|g\|_\infty
\sum_{i\in A}\sum_j(C^k)_{ij}\\
&\le4\|f\|_\infty\|g\|_\infty|A|q^k.
\end{aligned}
$$

$k\ge r$ から足すと $q^r/(1-q)$ を得る。道がなければ全ての項が0である。空の辺集合に依存する関数は定数なので相関は0である。
<!-- proof-end -->

例えば $q\le1/2$、$|A|=4$、両観測量の絶対値が1以下で距離10なら、上界は $32/1024=1/32$ となる。近い位置ではこの評価が粗くても、距離が増えるにつれて小さくなることが重要である。

## 4. 時間方向の相関を格子ギャップへ変える

距離の評価は空間方向にも時間方向にも使える。しかしエネルギーに変えるには、時間並進を非負自己共役作用素で表せることが必要である。[Wilson転送作用素の非負性](../MQFC23/index.md#thm-mqfc23-transfer-positive) と [転送作用素の真空規格化](../MQFC23/index.md#thm-mqfc23-vacuum) を使う。空間直方体を固定し、時間層だけを伸ばす。

$T$ を転送作用素、$\Lambda_0>0$ をその最大固有値、$\Omega>0$ を連続な規格化真空固有関数とする。全一時刻空間上の作用素を $\widetilde U=T/\Lambda_0$ とし、零空間を除いた物理Hilbert空間への制限を $U$ とする。前講までの構成で真空は単純であり、有限空間格子ごとに $\widetilde U^L$ は $L\to\infty$ で真空への直交射影に作用素ノルムで収束する。

<a id="thm-mqfc25-uniform-lattice-gap"></a>

<!-- formal-statement-start -->
> **定理（強結合における体積一様格子ギャップ）**
> 自由境界の有限空間直方体格子、時空次元 $d\ge2$、コンパクト群 $G\subset U(N)$ を取る。Wilson測度の結合を $\beta\ge0$ とし、$0<b<1$ が

$$
12(d-1)\beta\le b
$$

> を満たすとする。真空規格化後の物理Hilbert空間の転送作用素 $U$ の全ての励起固有値 $\lambda>0$ は

$$
\lambda\le b
$$

> を満たす。励起空間が非零なら格子間隔 $a>0$ のHamiltonianの真空直交部分のスペクトルは $[-a^{-1}\log b,\infty)$ に含まれる。
<!-- formal-statement-end -->

証明の鍵は、特定のWilson loopだけでなく任意の有界一時刻観測量について時間相関を評価できることにある。固有関数を観測量に変換することにより、見えない励起を残さず評価する。

<!-- proof-start -->
### 証明

空間辺の配置空間を $Q=G^{E_{\rm s}}$、空間層の重みを $h(A)>0$ とし、$\psi=\sqrt h$ とする。[Wilson転送作用素](../MQFC23/index.md#def-mqfc23-transfer) の核表示で時間層の積分を順に実行する。時刻 $0,\ldots,2L+n$ の自由境界で、$L$ と $L+n$ に有界観測量 $f,g$ を挿入すると

$$
\langle\overline{f_L}g_{L+n}\rangle
=\frac{\langle\psi,\widetilde U^L M_{\overline f}\widetilde U^n M_g\widetilde U^L\psi\rangle}
{\langle\psi,\widetilde U^{2L+n}\psi\rangle}.
$$

ここで $M_f$ は各関数 $k$ を $f k$ に移す有界作用素である。端点では $\psi$、中間層では隣接する二つの核の平方根の積が $h$ になるので元のWilson重みと一致する。分子・分母の $\Lambda_0^{2L+n}$ は消えている。

固定した $n\ge1$ について $L\to\infty$ とする。[転送作用素の真空規格化](../MQFC23/index.md#thm-mqfc23-vacuum) による真空の単純性と他のスペクトル上端が1未満であることから

$$
\widetilde U^L\psi\longrightarrow \langle\Omega,\psi\rangle\Omega.
$$

$\Omega,\psi$ は正なので $\langle\Omega,\psi\rangle>0$ である。分母はその二乗に収束し、分子でも同じ因子が現れる。単独の観測量の平均も $\langle\Omega,M_f\Omega\rangle$ に収束する。従って $f=g$ の連結相関の極限は

$$
\langle f\Omega,\widetilde U^n f\Omega\rangle-|\langle\Omega,f\Omega\rangle|^2.
$$

時間座標を整数で測る。各辺の時間座標の小さい端点をその辺の時刻とする。同一正方形に属する二辺の時刻は高々1しか違わない。従って二つの空間層に属する辺集合の距離は少なくとも $n$ である。

[Wilson測度の強結合影響評価](#thm-mqfc25-wilson-influence) で有限時間格子の最大行和は $b$ 以下である。[Dobrushin収縮による体積一様相関減衰](#thm-mqfc25-correlation-decay) を各有限時間格子で使い、時間極限を取ると

$$
\left|\langle f\Omega,\widetilde U^n f\Omega\rangle-
|\langle\Omega,f\Omega\rangle|^2\right|
\le\frac{4|E_{\rm s}|\|f\|_\infty^2}{1-b}b^n.
$$

ここで空間格子は固定したままなので、右辺の係数は $n$ に依存しない。

任意の規格化励起固有ベクトル $v$ を選ぶ。固有値 $\lambda>0$、$v\perp\Omega$ とする。$v=\lambda^{-1}\widetilde Uv$ であり、連続有界核を持つ作用素の像は連続関数である。実際、$v$ は $L^2$ に属し従って $L^1$ にも属するため、核の一様連続性から積分後の連続性が従う。$Q$ はコンパクトで $\Omega$ は連続かつ厳密に正だから最小値が正である。

そこで $f=v/\Omega$ とすれば有界である。$T$ の像は頂点ゲージ平均で固定されるので、連続代表を使えば $v,\Omega$ はゲージ不変であり、$f$ もゲージ不変である。$f\Omega=v$ を代入すると連結相関は

$$
\langle v,\widetilde U^n v\rangle=\lambda^n.
$$

上の評価は $\lambda^n\le K_f b^n$ となる。$K_f=4|E_{\rm s}|\|f\|_\infty^2/(1-b)$ は有限の正数である。$n$ 乗根を取り $n\to\infty$ とすれば $\lambda\le b$ となる。空間辺がない場合は一時刻空間が一次元なので励起はない。

[格子Hamiltonianの構成](../MQFC23/index.md#thm-mqfc23-hamiltonian) では物理空間の全ての正の転送固有値がエネルギー $E=-a^{-1}\log\lambda$ を与える。従って全励起エネルギーは $-a^{-1}\log b$ 以上である。対角作用素のスペクトルは固有エネルギーの閉包なので、この閉区間の外にスペクトルはない。
<!-- proof-end -->

この証明では個々の観測量の係数が空間体積とともに増えても構わない。各有限空間格子について先に時間を伸ばし、最後に固有値の上界を得るからである。励起のある全ての有限空間格子に同じ $b$ が使える。

例えば $d=4,\beta=1/72$ では $b=1/2$ を取れて、格子単位で $\log 2$ 以上、物理単位で $(\log 2)/a$ 以上となる。$\beta=0$ では転送作用素の像が真空のみとなるので、非零の励起空間を持つ質量ギャップとは区別する。

## 5. 何が示されたか

今回の結論は固定格子間隔の強結合領域での体積一様下界である。[稠密な観測ベクトル族からのギャップ判定](../MQFC12/index.md#thm-mqfc12-decay-gap) と同じく、全励起を捉える観測量が必要だった。有限空間格子では固有関数を真空関数で割ることで各励起を直接捉えた。一般の無限体積再構成では、極限測度の構成、時間並進の同定、真空直交観測ベクトルの稠密性を確認しなければならない。

固定した二つの局所観測量に対する相関評価は、期待値が収束する無限体積部分列に沿ってそのまま残る。一方、連続極限では $\beta$ と $a$ を同時に変えるので、今回の小さい $\beta$ の条件が維持されるとは限らない。面積則、固定格子の相関減衰、連続理論の存在と正の物理ギャップはそれぞれ異なる主張である。

## 6. 演習

### 演習 MQFC25-A1：二値の条件付き確率
- Level: A

一正方形二値群で $\tanh\beta=1/5$ とする。残り三辺の積が $1,-1$ のときの辺 $i$ の値が1となる確率と、その全変動距離、最大行和を求めよ。
<!-- solution-start -->
**詳細解答**

条件付き確率は $(1+s\tanh\beta)/2$ だから $s=1$ で $3/5$、$s=-1$ で $2/5$。値 $-1$ の確率はそれぞれ $2/5,3/5$ となる。

全変動距離は $(|3/5-2/5|+|2/5-3/5|)/2=1/5$。他の三辺の各反転がこの変化を生むため、[Dobrushin影響係数](#def-mqfc25-influence) の最大行和は $3/5$ で1未満である。
<!-- solution-end -->

### 演習 MQFC25-A2：正方形の数
- Level: A

$d=3$ の直方体格子の内部にある一本の辺について、所属する正方形数と $\sum_{j\ne i}m_{ij}$ を求めよ。$\beta=1/48$ で影響行和の上界を求めよ。
<!-- solution-start -->
**詳細解答**

辺の向き以外に2方向あり、各方向について正負の側に1枚ずつあるので4枚である。一枚につき他の辺が3本あるから、重複を回数込みで数えた和は $4\cdot3=12$。

[Wilson測度の強結合影響評価](#thm-mqfc25-wilson-influence) によれば行和は $2\beta\cdot12=24/48=1/2$ 以下である。境界の辺でもこの値を超えない。
<!-- solution-end -->

### 演習 MQFC25-A3：振動幅と平均
- Level: A

二値群の二辺の独立一様分布について $f(x)=2x_1+x_1x_2$ とする。各辺の振動幅、$P_1f,P_2f$ を求めよ。
<!-- solution-start -->
**詳細解答**

第1辺の反転では差の絶対値が $2|2+x_2|$ なので最大は6。第2辺の反転では $2|x_1|=2$。従って [辺ごとの振動幅](#def-mqfc25-oscillation) は $(6,2)$。

独立一様分布では条件付き平均も一様で、$P_1x_1=0$ だから $P_1f=(2+x_2)P_1x_1=0$。第2辺を平均すると $P_2f=2x_1$ である。従って $\delta_1(P_1f)=0$、$\delta_2(P_2f)=0$ も確認できる。
<!-- solution-end -->

### 演習 MQFC25-A4：相関評価の数値
- Level: A

二つの局所観測量について $|A|=2$、距離 $r=5$、$q\le1/3$、両方の絶対値は1以下とする。相関の上界を求めよ。
<!-- solution-start -->
**詳細解答**

[Dobrushin収縮による体積一様相関減衰](#thm-mqfc25-correlation-decay) に代入する。$q^5\le 1/243$、$1/(1-q)\le3/2$ なので

$$
|\operatorname{Cov}_\mu(f,g)|\le4\cdot2\cdot\frac32\cdot\frac1{243}
=\frac4{81}.
$$

この数は全体の格子の辺数を含まない。
<!-- solution-end -->

### 演習 MQFC25-B1：二辺間の影響の和
- Level: B

各成分が0以上の行列 $C=\begin{pmatrix}0&1/4\\1/2&0\end{pmatrix}$ を考える。収縮条件を確認し、$\sum_{k\ge0}C^k$ の成分 $(1,2)$ を求めよ。振動幅がそれぞれ $(2,0),(0,2)$ の場合、行列を用いた相関上界を計算せよ。
<!-- solution-start -->
**詳細解答**

行和は $1/4,1/2$ なので最大は $1/2<1$。積を計算すると $C^2=(1/8)I$ である。偶数冪は対角行列だから $(1,2)$ 成分は0、奇数冪 $C^{2l+1}=(1/8)^l C$ の成分は $(1/8)^l/4$。

従って幾何級数を足すと

$$
\left(\sum_{k\ge0}C^k\right)_{12}=
\frac{1/4}{1-1/8}=\frac27.
$$

[体積一様相関減衰の定理](#thm-mqfc25-correlation-decay) の最初の上界は $2(2/7)2=8/7$。上界は必ず鋭いわけではなく、実際の相関の絶対値がこの値に等しいとは限らない。
<!-- solution-end -->

### 演習 MQFC25-B2：密度の正規化の微分
- Level: B

二点集合 $u=\pm1$ の一様測度上で、$p_t(u)$ を $e^{t\alpha u}$ に比例する密度とする（$\alpha>0,0\le t\le1$）。$\partial_t\log Z_t$ と $u=1$ の確率の微分を計算し、始点と終点の全変動距離を求めよ。
<!-- solution-start -->
**詳細解答**

$Z_t=(e^{t\alpha}+e^{-t\alpha})/2=\cosh(t\alpha)$ なので

$$
\partial_t\log Z_t=\alpha\tanh(t\alpha).
$$

$u=1$ の確率は $(1+\tanh(t\alpha))/2$ で、その微分は $\alpha/(2\cosh^2(t\alpha))$ である。$u=-1$ の確率の微分はこの負である。

二点分布の全変動距離は正側確率の差であり、始点は $1/2$、終点は $(1+\tanh\alpha)/2$ なので $\tanh\alpha/2$。これは微分を $0$ から $1$ まで積分した値とも一致する。$D(u)=\alpha u$ であり、[強結合影響評価](#thm-mqfc25-wilson-influence) の証明で使った $\partial_t p_t=p_t(D-\int Dp_t)$ の正規化項を具体的に確認できる。
<!-- solution-end -->

### 演習 MQFC25-B3：見えない励起
- Level: B

三次元Hilbert空間の標準正規直交基底 $e_0,e_1,e_2$ 上で、転送作用素を対角成分 $1,1/5,4/5$ で定める。真空を $e_0$ とし、格子間隔を $a=1$ とする。観測ベクトル $e_1$ の自己相関と全励起ギャップを求めよ。$e_1$ の相関から $\log 5$ を全励起ギャップと主張できるか。
<!-- solution-start -->
**詳細解答**

$U^ne_1=5^{-n}e_1$ なので自己相関は $5^{-n}$。$U^ne_2=(4/5)^ne_2$ なのでこちらは $(4/5)^n$。

[格子Hamiltonianの構成](../MQFC23/index.md#thm-mqfc23-hamiltonian) による励起エネルギーはそれぞれ $\log 5$ と $\log(5/4)$。小さい方が全励起ギャップであり、$\log(5/4)$ である。$e_1$ の観測は $e_2$ と直交しているため低いエネルギーを見落とす。従って $\log 5$ を全励起の下界とすることはできない。
<!-- solution-end -->

### 演習 MQFC25-C1：強結合からスペクトルまで
- Level: C

時空次元4、$\beta=1/108$ の自由境界Wilson測度を考える。各有限空間格子で一時刻転送作用素の正の励起固有値を $\lambda$ とする。
1. 体積一様な最大行和上界を求めよ。
2. 空間層の辺数が $m>0$ のとき、絶対値が $F$ 以下の一時刻観測量の連結時間相関の上界を求めよ。
3. 規格化された励起固有関数 $v$ から観測量を作り、$\lambda$ の上界を証明せよ。$a=1/10$ のときエネルギーの下界を求めよ。
4. $\beta$ がこの十分条件を満たさない場合にもギャップがないと断定できるか。
<!-- solution-start -->
**詳細解答**

(1) [強結合影響評価](#thm-mqfc25-wilson-influence) より $q\le12(4-1)/108=1/3$。格子の辺数に依存しない。

(2) 時間が $n\ge1$ 層離れれば辺の隣接移動は最低 $n$ 回必要である。[体積一様相関減衰](#thm-mqfc25-correlation-decay) で $|A|\le m$、$q\le1/3$ を使うと

$$
|\operatorname{Cov}(f_0,f_n)|\le
\frac{4mF^2}{1-1/3}(1/3)^n
=6mF^2 3^{-n}.
$$

有限時間格子の両端を遠ざける極限でも、右辺が全時間層数に依存しないため上界は保存される。

(3) [体積一様格子ギャップ](#thm-mqfc25-uniform-lattice-gap) の証明と同じ対応を明示する。真空 $\Omega$ はコンパクト配置空間で連続かつ正なので下限が正。非零固有値の $v$ は連続核の像なので連続である。$f=v/\Omega$ と取ると $F=\|f\|_\infty<\infty$ である。真空直交性から平均は0、転送表示の自己相関は $\langle v,U^nv\rangle=\lambda^n$ となる。従って

$$
(3\lambda)^n\le6mF^2,\qquad
3\lambda\le(6mF^2)^{1/n}\longrightarrow1.
$$

よって $\lambda\le1/3$。エネルギーは $-a^{-1}\log\lambda\ge10\log3$ である。係数 $mF^2$ が空間体積によって変化しても、固定空間格子で時間を伸ばす順序なので固有値上界は共通となる。

(4) 断定できない。$q<1$ は今回の証明の十分条件で、これが壊れれば行列の幾何級数を上の方法で抑えられなくなるだけである。別の評価でギャップを証明できる可能性がある。また固定格子のギャップだけでは連続極限の構成を保証しない。
<!-- solution-end -->

## 7. 次の講義

固定した格子では強結合の相関減衰から励起の下界を得た。次は格子単位の減衰率と物理単位の質量との換算を調べ、格子間隔を小さくしたときにどのような一様性が必要になるかを明らかにする。
