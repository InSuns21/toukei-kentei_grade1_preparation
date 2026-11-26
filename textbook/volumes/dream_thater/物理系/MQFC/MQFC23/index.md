# MQFC23 転送作用素と物理Hilbert空間

直接の前提は [MQFC9](../MQFC9/index.md)、[MQFC20](../MQFC20/index.md)、[MQFC21](../MQFC21/index.md)、[MQFC22](../MQFC22/index.md) である。

前講では [自由境界Wilson測度の反射陽性](../MQFC22/index.md#thm-mqfc22-wilson-reflection) を示した。反転した二つの時間領域の積分が非負であることは、観測量からベクトルを作れるという意味を持つ。今回は時間を一層進める積分核を直接作る。核の固有値を調べれば、相関が時間とともに減衰する速さをエネルギーに読み替えられる。

## 1. 一時刻の配置とゲージ平均

空間を有限長方形格子 $X$ とし、向きを一つ選んだ空間辺集合を $E$、空間正方形集合を $S$ とする。群はコンパクト部分群 $G\subset U(N)$、結合は $\beta\ge0$ とする。時間は等間隔 $a>0$ で、まず自由境界（端点の配置も積分する）の有限個の時間層を考える。空間格子の形と群と結合は固定する。

一時刻の配置は $A=(A_e)_{e\in E}\in Q=G^E$ である。積Haar確率測度を $dA$ とし、複素Hilbert空間 $\mathcal K=L^2(Q,dA)$ を使う。内積は第2引数について線形とする。

[頂点ゲージ変換](../MQFC19/index.md#def-mqfc19-vertex-gauge) により、$s\in G^X$ が辺 $e=(x,y)$ に作用すると

$$
(sA)_e=s_y A_e s_x^{-1}.
$$

[格子の積Haar測度のゲージ不変性](../MQFC20/index.md#prop-mqfc20-product-gauge) により、この変換は積分を保つ。したがって $R_s f(A)=f(s^{-1}A)$ は $\mathcal K$ 上のユニタリ作用である。実際、変数変換によってノルムを保ち、逆作用は $R_{s^{-1}}$ となる。

同じ物理配置を表す関数を平均で取り出そう。正規化積Haar測度 $ds$ を使い、

$$
(Pf)(A)=\int_{G^X} f(sA)\,ds
$$

と置く。$s$ は各頂点の群元の組であり、$A$ は固定して $s$ だけを平均する。$P$ は [群平均による不変部分空間への直交射影](../MQFC20/index.md#thm-mqfc20-invariant-projection) の一時刻版である。有限次元表現に限らずここで使えることは、次の計算で確認できる。

[Cauchy–Schwarz の不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz) と変数変換から

$$
\|Pf\|^2\le \int_Q\int_{G^X}|f(sA)|^2\,ds\,dA
=\|f\|^2.
$$

ここで非負関数の積分順序の交換は [Tonelli の定理](../../../解析系/F0/F0-00D2C/index.md#thm-tonelli) による。右辺が有限なので、平均はほとんど至る所で定義され、零関数の同値類を零関数へ送る。

固定した $t\in G^X$ に対し、[Haar積分の変数変換](../MQFC20/index.md#prop-mqfc20-haar-transform) で $s'=st$ と置けば

$$
(Pf)(tA)=\int f(stA)\,ds=\int f(s'A)\,ds'=(Pf)(A).
$$

従って $P^2=P$ である。また

$$
\langle f,Pg\rangle=\int ds\int dA\,\overline{f(A)}g(sA)
$$

で被積分関数の絶対値の積分は Cauchy–Schwarz の不等式により $\|f\|_2\|g\|_2$ 以下である。[Fubini の定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02) を実部・虚部に適用できる。$B=sA$ と置き、さらに $s'=s^{-1}$ と変数変換すると

$$
\begin{aligned}
\langle f,Pg\rangle
&=\int ds\int dB\,\overline{f(s^{-1}B)}g(B)\\
&=\int dB\,\overline{\int f(s'B)\,ds'}\,g(B)\\
&=\langle Pf,g\rangle.
\end{aligned}
$$

よって $P=P^*$。像は全ての $R_s$ に固定される閉部分空間 $\mathcal K_{\rm inv}$ である。逆に各 $R_s$ に固定される $L^2$ ベクトルは群平均でも固定される（積分は同値類として解釈する）。

例えば一本の辺、$G=U(1)$ の場合、$A=e^{i\theta}$ とすると

$$
P(A^n)=A^n\int s_y^n\,ds_y\int s_x^{-n}\,ds_x.
$$

両端が異なる頂点なら $n=0$ で1、それ以外は0になる。閉路の周回積のトレースは [格子 Wilson loop の不変性](../MQFC19/index.md#thm-mqfc19-wilson-invariance) により不変である。一時刻のゲージ不変空間にはこのような関数が残る。

## 2. 一層の積分を作用素にする

[基本正方形と周回積](../MQFC19/index.md#def-mqfc19-plaquette) に従って、空間正方形 $p$ の周回積を $A_p$ と書く。[Wilson格子作用](../MQFC21/index.md#def-mqfc21-action) の配置に依存しない定数を省いて、

$$
w(g)=\exp\left(\frac{\beta}{N}\operatorname{Re}\operatorname{tr}g\right),
\qquad h(A)=\prod_{p\in S}w(A_p)
$$

と置く。$h$ は正、連続である。[Wilson格子作用の不変性と有界性](../MQFC21/index.md#prop-mqfc21-action-invariance) を空間正方形に適用するとゲージ不変であり、$e^{-\beta |S|}\le h\le e^{\beta |S|}$ を満たす。$|S|$ は正方形の個数で、空積は1とする。

隣り合う二層の配置を $A,B$、時間辺の値を $c_x$ とする。前講と同じ向きで横切る正方形の周回積は $B_e^{-1}c_y^{-1}A_ec_x$ である。時間辺を積分するには

$$
K(B,A)=\prod_{e\in E}w(B_e^{-1}A_e)
$$

の第2変数をゲージ変換して平均すればよい。実際、$s_x=c_x^{-1}$ と置くと

$$
B_e^{-1}c_y^{-1}A_ec_x=B_e^{-1}(sA)_e.
$$

時間辺の積Haar測度は逆元変換で保存されるため、この平均は $\int K(B,sA)\,ds$ である。各空間層の重み $h$ を前後半分ずつ割り当てると、時間方向の積分を同じ核の繰返しで表せる。

そのため、関数に $\sqrt h$ を掛ける作用素 $M$ と、核を入力配置 $A$ について積分する作用素 $C$ を用意する。

$$
(Mf)(A)=\sqrt{h(A)}f(A),\qquad
(Cf)(B)=\int_Q K(B,A)f(A)\,dA.
$$

$M$ は有界な実関数の乗算、$C$ は有界核と確率測度による積分なので、どちらも $\mathcal K$ 上の有界作用素である。

<a id="def-mqfc23-transfer"></a>

<!-- formal-statement-start -->
> **定義（Wilson転送作用素）**
> 有限空間格子 $X$、コンパクト部分群 $G\subset U(N)$、$\beta\ge0$ に対して、上の空間重み $h$ と横切る正方形の核 $K$ を用いる。
>
> $\mathcal K=L^2(G^E,dA)$ 上で $M$ を $\sqrt h$ の乗算、$C$ を核 $K$ の積分作用素、$P$ を頂点ゲージ平均とする。Wilson転送作用素 $T$ は

$$
T=MCPM,\qquad
(Tf)(B)=\int_Q L(B,A)f(A)\,dA,
$$

$$
L(B,A)=\sqrt{h(B)h(A)}
\int_{G^X}K(B,sA)\,ds
$$

> で与えられる。
<!-- formal-statement-end -->

作用素の積は右から作用させる。$CP$ の核表示は、$A'=sA$ とした後で $s'=s^{-1}$ と置いて得る。

$$
\begin{aligned}
(CPf)(B)
&=\int ds\int dA\,K(B,A)f(sA)\\
&=\int dA'\int ds\,K(B,s^{-1}A')f(A')\\
&=\int dA'\int ds'\,K(B,s'A')f(A').
\end{aligned}
$$

前後の $M$ を掛ければ $L(B,A)$ となる。また $h(sA)=h(A)$ なので $P(Mf)(A)=\sqrt{h(A)}(Pf)(A)$、従って $MP=PM$ である。

<!-- definition-example-start: def-mqfc23-transfer -->
### 直接例：一本の空間辺

**定義の確認**

空間が異なる二頂点を結ぶ一本の辺だけなら $S$ は空で $h=1$。二値群 $G=\{1,-1\}\subset U(1)$ の場合、$N=1$、$B^{-1}=B$ だから $K(B,A)=e^{\beta BA}$。$s_x,s_y$ を独立一様に動かすと $s_yAs_x^{-1}$ は固定した $A$ に対して一様二値となり、

$$
L(B,A)=\frac{e^{\beta B}+e^{-\beta B}}2=\cosh\beta.
$$

したがって $Tf=(\cosh\beta)\int f\,dA$ である。空間重み、時間辺の平均、積分作用の全てを一つずつ確認できる。
<!-- definition-example-end -->

時間層が $0,\ldots,n$、$n\ge1$ の自由境界なら、時間辺をすべて積分した重みは各層の $h$ と各隣接層の平均核の積になる。$\psi=\sqrt h$ と置けば、分配関数から配置非依存の Wilson 定数因子を除いたものは

$$
Z'_n=\langle\psi,T^n\psi\rangle.
$$

実際、$\prod_{j=0}^{n-1}L(A_{j+1},A_j)$ の中で中間層の $\sqrt h$ は2回掛かって $h$ となる。両端には1回しか現れないので $\psi(A_0)\psi(A_n)$ を掛ければ全層の重みが復元する。この計算は端点の観測量を挿入するときにも使える。

## 3. 非負性とコンパクト性

核が正の実数値を取ることと、積分作用素の二次形式が非負であることは異なる。例えば平均前の二値群の核 $e^{\beta BA}$ で符号関数 $f(A)=A$ を取ると

$$
\langle f,Cf\rangle=\frac{e^\beta-e^{-\beta}}2=\sinh\beta.
$$

負結合では核が正でもこの値は負になる。ここで前講の [Wilson重みの非負指標展開](../MQFC22/index.md#thm-mqfc22-character-expansion) が必要になる。

<a id="thm-mqfc23-transfer-positive"></a>

<!-- formal-statement-start -->
> **定理（Wilson転送作用素の非負性）**
> 有限空間格子上のコンパクト部分群 $G\subset U(N)$ と $\beta\ge0$ の Wilson転送作用素 $T$ は有界、コンパクト、自己共役かつ非負である。頂点ゲージ平均 $P$ に対して

$$
PT=TP=T,\qquad \langle f,Tf\rangle\ge0
\quad(f\in\mathcal K).
$$

> また積分核 $L(B,A)$ は連続で、全ての配置について正の一様下界を持つ。
<!-- formal-statement-end -->

核心は $T=MPCPM$ と書けることにある。$C$ の非負性を指標の行列要素による二乗和から示し、前後の $PM$ を同じ作用素として使う。

<!-- proof-start -->
### 証明

$K(B,A)=\overline{K(A,B)}$ である。有限個の辺の [Wilson重みの非負指標展開](../MQFC22/index.md#thm-mqfc22-character-expansion) と [指標による左右因子分解](../MQFC22/index.md#prop-mqfc22-character-factorization) を掛け合わせると

$$
K(B,A)=\sum_\lambda b_\lambda\overline{q_\lambda(B)}q_\lambda(A),
\qquad b_\lambda\ge0.
$$

ここで $\lambda$ は各辺の表現と二つの行列添字をまとめたもの、$q_\lambda$ は対応する行列要素の積、$b_\lambda$ は指標係数の積である。

各表現の次元を $d_\rho$、指標展開の係数を $c_\rho$ とする。ユニタリ行列の各列のノルム二乗は1なので $\sum_{ij}|\rho_{ij}(g)|^2=d_\rho$。[Cauchy–Schwarz の不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz) により一辺の絶対和は

$$
\begin{aligned}
\sum_\rho c_\rho\sum_{i,j}
|\rho_{ij}(B_e)\rho_{ij}(A_e)|
&\le\sum_\rho c_\rho\sqrt{d_\rho}\sqrt{d_\rho}\\
&=\sum_\rho c_\rho d_\rho=e^\beta.
\end{aligned}
$$

最後の等号は [Wilson重みの非負指標展開](../MQFC22/index.md#thm-mqfc22-character-expansion) による。全辺の絶対和は $e^{\beta|E|}$ 以下である。

$dA$ は確率測度なので $L^2$ 関数は $L^1$ にも属する。したがって項別積分によって

$$
\langle f,Cf\rangle
=\sum_\lambda b_\lambda\left|\int_Q q_\lambda(A) f(A)\,dA\right|^2\ge0.
$$

さらに表現の有限部分集合までで打ち切った核は有限個の分離積の和である。各辺で捨てた指標の絶対和は $\sum_{\rho\ {\rm omitted}}c_\rho d_\rho$ 以下で0へ収束する。有限個の辺の積の差を一辺ずつ置き換えると、全核も一様に収束する。核の一様誤差が $\epsilon$ なら対応する作用素のノルム誤差は

$$
\|(C-C_{\rm finite})f\|_2\le\epsilon\|f\|_1\le\epsilon\|f\|_2.
$$

ゆえに有限階数作用素のノルム極限である $C$ はコンパクトである。

同時ゲージ変換では

$$
(sB)_e^{-1}(sA)_e=s_x B_e^{-1}A_e s_x^{-1}
$$

となるので $K(sB,sA)=K(B,A)$。固定した $s$ について積Haar測度の変数変換 $A=sA'$ を使うと

$$
(CR_sf)(B)=\int K(B,sA')f(A')\,dA'
=(Cf)(s^{-1}B).
$$

従って $CR_s=R_sC$。群平均を取れば $PC=CP$ を得る。既に $M$ も $P$ と可換であるから

$$
T=MPCPM=(PM)^*C(PM).
$$

これで自己共役性、非負性、$PT=TP=T$ が従う。有界作用素との合成でコンパクト性も保たれる。

$Q$ と $G^X$ はコンパクトで、$K$ は連続だから平均核も連続である。また $w\ge e^{-\beta}$ より

$$
L(B,A)\ge e^{-\beta(|S|+|E|)}>0.
$$

以上は有限格子と非負結合の下での主張である。
<!-- proof-end -->

例えば $\beta=0$ なら $h=1$、$K=1$、従って $Tf=\int f\,dA$。像は定数だけであり、ゲージ不変であっても平均0の関数は消える。物理Hilbert空間のベクトルをゲージ不変空間だけで定めるとこの零方向を見落とす。

## 4. 零方向を除き、真空を規格化する

[OS Hilbert空間](../MQFC9/index.md#def-mqfc9-os-hilbert) では反射形式で長さ0となる方向を除いた。ここでも $T$ の二次形式をベクトルの長さとして使えばよい。$\ker T=\{f\in\mathcal K:Tf=0\}$ は作用素の零空間である。これはゲージ不変空間の直交補空間を含むが、上の零結合例のようにそれだけとは限らない。零方向だけ異なる関数を同じベクトルとみなし、その類を $[f]=f+\ker T$ と書く。

<a id="def-mqfc23-physical-hilbert"></a>

<!-- formal-statement-start -->
> **定義（格子の物理Hilbert空間）**
> 非負有界自己共役な Wilson転送作用素 $T$ に対し、一時刻の反射形式を

$$
(f,g)_T=\langle f,Tg\rangle
$$

> とする。この形式の零方向 $\ker T$ で $\mathcal K$ を割り、得られる内積空間を完備化したものを格子の物理Hilbert空間 $\mathcal H_{\rm phys}$ とする。
<!-- formal-statement-end -->

一層間の自由境界反射形式からこの形式への対応も明示できる。正側の観測量 $F(A)$ を $f=\sqrt h F$ に対応させ、負側も $g=\sqrt h G$ と置けば、両端の反射積分は $\langle g,Tf\rangle/Z'_1$ になる。正の定数 $1/Z'_1$ は零方向を変えず、内積の全体規格化にだけ影響する。

[自己共役作用素の Borel 関数計算](../../../解析系/QM/QM6/index.md#def-qm6-borel-functional-calculus) により非負平方根 $T^{1/2}$ が存在する。反射形式のノルムは

$$
\|f\|_T^2=\langle f,Tf\rangle=\|T^{1/2}f\|^2
$$

である。$T^{1/2}f=0$ なら $Tf=T^{1/2}(T^{1/2}f)=0$ である。

逆に $Tf=0$ なら上のノルム恒等式の右辺が0になるので、$T^{1/2}f=0$ である。従って零方向は $\ker T^{1/2}=\ker T$ となる。

写像 $[f]\mapsto T^{1/2}f$ は等長である。その像に直交するベクトルは

$$
\langle v,T^{1/2}f\rangle
=\langle T^{1/2}v,f\rangle=0\quad(\forall f\in\mathcal K)
$$

を満たすので $T^{1/2}v=0$ と同値である。従って像の閉包は $(\ker T)^\perp$ になる。

したがって以下では $\mathcal H_{\rm phys}$ を $(\ker T)^\perp\subset\mathcal K_{\rm inv}$ と同一視する。この包含は [Wilson転送作用素の非負性](#thm-mqfc23-transfer-positive) の $TP=T$ から $T(I-P)=0$、従って $(\mathcal K_{\rm inv})^\perp\subset\ker T$ となることによる。$T$ と $T^{1/2}$ は可換なのでこの同一視は時間発展とも整合する。

<!-- definition-example-start: def-mqfc23-physical-hilbert -->
### 直接例：零結合で残るベクトル

**定義の確認**

$\beta=0$ なら $Tf=\int f\,dA$ である。反射形式は

$$
(f,g)_T=\overline{\int f\,dA}\int g\,dA.
$$

従って零方向は平均0の関数全体である。$f$ と定数 $\int f\,dA$ の差は平均0だから同じ類に属し、その類のノルム二乗は $|\int f\,dA|^2$ である。商空間は複素数の通常の内積空間と等長で、既に完備である。
<!-- definition-example-end -->

有限格子で最も減衰の遅いベクトルを基準にすれば時間並進の最大固有値を1にできる。規格化前の最大固有値を $\Lambda_0$ と書く。固有値が単純であるとは、その固有空間が一次元であることをいう。このベクトルを真空として、他のベクトルの減衰を真空との比で測ろう。

<a id="thm-mqfc23-vacuum"></a>

<!-- formal-statement-start -->
> **定理（転送作用素の真空規格化）**
> 有限空間格子上の Wilson転送作用素 $T$ の最大固有値 $\Lambda_0=\|T\|$ は正で単純であり、正の規格化固有関数 $\Omega$ を持つ。
> $\mathcal H_{\rm phys}=(\ker T)^\perp$ 上の規格化作用素 $U=T/\Lambda_0$ は単射な非負自己共役縮小作用素で、

$$
U\Omega=\Omega,\qquad \|\Omega\|=1.
$$

> 真空直交部分に非零スペクトルがあれば、その上端は1より小さい。
<!-- formal-statement-end -->

有限格子では核に正の下界があるため、最大固有関数の符号が揃う。そのため同じ固有値を持つ直交固有ベクトルが存在できない。

<!-- proof-start -->
### 証明

[コンパクト自己共役作用素のスペクトル定理](../../../解析系/FA/FA7/index.md#thm-fa7-compact-self-adjoint-spectral) を非負な $T$ に適用する。$L$ の正の下界より $\langle1,T1\rangle>0$、従って $\Lambda_0=\|T\|>0$ は固有値である。核が実対称なので実部・虚部が固有空間に属し、実の規格化固有関数 $v$ を選べる。

$$
\langle |v|,T|v|\rangle-\langle v,Tv\rangle
=\int L(B,A)(|v(B)v(A)|-v(B)v(A))\,dA\,dB\ge0.
$$

左辺第1項は $\Lambda_0\||v|\|^2=\Lambda_0$ 以下であり、第2項は $\Lambda_0$ である。よって等号が成立する。非負な $D=\Lambda_0 I-T$ について $\|D^{1/2}|v|\|^2=\langle |v|,D|v|\rangle=0$ である。従って $D|v|=0$、すなわち $T|v|=\Lambda_0|v|$ となり、$|v|$ も固有関数である。$\Omega=|v|$ と置くと

$$
\Lambda_0\Omega(B)=(T\Omega)(B)\ge
e^{-\beta(|S|+|E|)}\int_Q\Omega(A)\,dA>0
$$

であり、右辺の積分は $\Omega\ne0$ から正である。連続核によって固有関数の連続な代表を選べる。

最大固有空間の次元が2以上なら $\Omega$ と直交する実固有関数 $z\ne0$ が取れる。$\Omega>0$ なので $z$ は正と負の値をそれぞれ正測度集合上で取る。しかし上と同じ差の積分を $z$ に適用すると、符号が異なる集合の直積上で被積分関数が厳密に正となる。差は正となって作用素ノルムの上界に反する。ゆえに単純である。

$\Lambda_0\ne0$ なので $\Omega\in(\ker T)^\perp$。この閉部分空間は $T$ で不変で、そこへの制限は単射である。$\Lambda_0$ で割れば非負性と自己共役性を保ちノルム1となる。[非零固有値の有限重複度と0以外での非集積](../../../解析系/FA/FA7/index.md#thm-fa7-nonzero-eigenvalues-discrete) により、単純な固有値1を除いたスペクトルの上端は1未満となる。真空直交空間が零なら励起ベクトルは存在しない。
<!-- proof-end -->

## 5. 離散時間の固有値をエネルギーに変える

[転送作用素の真空規格化](#thm-mqfc23-vacuum) 後、一層で固有ベクトルの係数が $\lambda\in(0,1]$ 倍になるなら、$n$ 層では $\lambda^n$ 倍になる。指数関数と比較すると

$$
\lambda=e^{-aE},\qquad E=-a^{-1}\log\lambda.
$$

こうしてエネルギーを固有値とする作用素を格子Hamiltonianと呼ぶ。$\lambda_j$ は規格化後の固有値、$u_j$ はその固有ベクトルとする。展開係数と真空の添字は

$$
v_j=\langle u_j,v\rangle,\qquad
\lambda_0=1,\quad u_0=\Omega
$$

と定める。

<a id="thm-mqfc23-hamiltonian"></a>

<!-- formal-statement-start -->
> **定理（格子Hamiltonianの構成）**
> 空間有限の Wilson転送作用素を真空固有値で規格化し、零方向を除いた物理Hilbert空間上で $U=T/\Lambda_0$ とする。時間格子間隔を $a>0$ とし、重複度を込めた $U$ の正の固有値を $\lambda_j\in(0,1]$、対応する完全正規直交固有系を $u_j$ とする。
>
> 非負自己共役作用素 $H$ は次で与えられる。

$$
E_j=-a^{-1}\log\lambda_j,\qquad
D(H)=\left\{v=\sum_j v_j u_j:
\sum_j E_j^2|v_j|^2<\infty\right\},
$$

$$
Hv=\sum_j E_jv_j u_j,\qquad e^{-naH}=U^n
\quad(n=0,1,2,\ldots).
$$

> 真空のエネルギーは0である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[コンパクト自己共役作用素のスペクトル定理](../../../解析系/FA/FA7/index.md#thm-fa7-compact-self-adjoint-spectral) により、非零固有値の固有系は零空間の直交補空間で完全である。$U$ の正の固有値は1以下だから $E_j$ は有限の非負実数となる。有限個の固有ベクトルの線形結合は定義域に入り、稠密である。

表示した定義域で級数はノルム収束する。$H$ は実対角なので対称である。随伴の定義から $v\in D(H^*)$ ならある $w$ が存在して

$$
\langle Hu_j,v\rangle=\langle u_j,w\rangle,
\qquad E_jv_j=w_j
$$

となる。従って $\sum_j E_j^2|v_j|^2=\|w\|^2<\infty$ である。

逆にこの条件を満たすとき、$w=\sum_j E_jv_j u_j$ を取れば、任意の $x\in D(H)$ について

$$
\langle Hx,v\rangle=\sum_j\overline{x_j}E_jv_j
=\langle x,w\rangle
$$

となる。両内積の級数は Cauchy–Schwarz の不等式で絶対収束する。よって $v\in D(H^*)$ であり、$H^*=H$ が成立する。さらに

$$
\langle v,Hv\rangle=\sum_j E_j|v_j|^2\ge0
$$

だから非負である。

[自己共役作用素の Borel 関数計算](../../../解析系/QM/QM6/index.md#def-qm6-borel-functional-calculus) で $e^{-naH}u_j=e^{-naE_j}u_j=\lambda_j^n u_j$。両作用素は有界で完全正規直交系上で一致するので全空間で一致する。真空には $\lambda=1$ が対応し $E=0$ である。
<!-- proof-end -->

零固有値に有限のエネルギーを割り当てることはできない。逆に正の固有値が0へ近づく場合は零固有値を除いても $H$ が非有界になる。これは [自己共役縮小半群の非負生成作用素](../MQFC9/index.md#thm-mqfc9-hamiltonian) の離散時間からの構成に対応する。

例えば真空と二つの励起ベクトルの規格化固有値が $1,1/2,1/4$、$a=0.2$ ならエネルギーは $0,5\log2,10\log2$ である。最小の正のエネルギーが格子間隔を含むエネルギーギャップである。

真空直交の $v$ に対して、励起ベクトルが存在する場合の正の励起固有値の上端を $\lambda_*$ とすると

$$
\langle v,U^n v\rangle=\sum_{j\ne0}|v_j|^2\lambda_j^n
\le \lambda_*^n\|v\|^2.
$$

$0<\lambda_*<1$ ならギャップは $-a^{-1}\log\lambda_*$ である。例えば有界な実ゲージ不変観測量 $F$ を考える。$F\Omega$ は関数の点ごとの積であり、

$$
\|F\Omega\|_2\le \|F\|_\infty\|\Omega\|_2
$$

を満たす。したがってこの積も $\mathcal K$ に属する。

ここでは必ずしも物理空間に属さない $F\Omega$ や端点関数も扱うため、全配置空間上の作用素を $\widehat U=T/\Lambda_0:\mathcal K\to\mathcal K$ と書く。その物理空間への制限が $U$ であり、零空間上では $\widehat U=0$ である。

このとき、$v$ を $F\Omega-\langle\Omega,F\Omega\rangle\Omega$ の物理空間への直交射影とすれば、$n\ge1$ で連結した真空二点関数は $\langle v,U^nv\rangle$ になる。実際、$m_F=\langle\Omega,F\Omega\rangle$ は実数で、$z=(F-m_F)\Omega$ と置くと

$$
\langle z,\widehat U^nz\rangle
=\langle F\Omega,\widehat U^nF\Omega\rangle-m_F^2.
$$

交差項の各々は $\widehat U^n\Omega=\Omega$ と自己共役性から $m_F^2$ であり、最後の真空項は $+m_F^2$ である。$z=v+k$（$k\in\ker T$）と分解すると、$n\ge1$ で $\widehat U^nk=0$、かつ $k\perp U^nv$ だから

$$
\langle z,\widehat U^nz\rangle=\langle v,U^nv\rangle.
$$

$n=0$ では全空間の恒等作用素が零方向を消さないため、この置換は一般には成立しない。

自由境界の有限時間積分から真空を得るには、両端から遠ざける。$\psi=\sqrt h$ は正で $\langle\Omega,\psi\rangle>0$。固有系で分解すると

$$
\lim_{m\to\infty}\widehat U^m\psi
=\langle\Omega,\psi\rangle\Omega
$$

がノルム収束で成立する。実際、真空直交成分は零空間成分と励起固有ベクトル成分に分かれ、$m\ge1$ では前者が消える。後者のノルムは $\lambda_*^m\|\psi\|$ 以下（励起がなければ0）である。

観測量が有界なら端点からのこの収束を挿入した内積にも適用できる。例えば両端から $m$ 層離れた二つの同じ観測量 $F$（間隔 $n\ge1$）の期待値は、自由境界の核の積に各観測量を掛けると

$$
\frac{\langle\widehat U^m\psi,
 F\widehat U^n F\widehat U^m\psi\rangle}
{\langle\psi,\widehat U^{2m+n}\psi\rangle}
$$

となる。分子は $\langle\Omega,\psi\rangle^2\langle F\Omega,\widehat U^n F\Omega\rangle$ に、分母は $\langle\Omega,\psi\rangle^2>0$ に収束する。この比が上で用いた真空二点関数である。

有限空間格子でのギャップは、体積を無限にする場合や $a\to0$ で同じ正の下界を持つとは限らない。例えば $\lambda_*(a)=e^{-a^2}$ なら全ての $a>0$ で1未満だが、エネルギーギャップは $a$ となって0に近づく。

## 6. 演習

### 演習 MQFC23-A1：開いた辺の平均
- Level: A

両端が異なる一本の辺で $G=\{1,-1\}$ とする。$f(A)=2+3A$ の頂点平均と、平均前後の $L^2$ ノルム二乗を求めよ。

<!-- solution-start -->
**詳細解答**。二つの頂点を独立一様に平均する。$s_y A s_x^{-1}=s_y A s_x$ だから $P(A)=A(\sum s_y/2)(\sum s_x/2)=0$。よって $Pf=2$。一方、

$$
\|f\|^2=\frac{(2+3)^2+(2-3)^2}{2}=13,
\qquad\|Pf\|^2=4.
$$

失われたノルム二乗は9で、$3A$ のノルム二乗に一致する。平均は直交射影である。
<!-- solution-end -->

### 演習 MQFC23-A2：二値群の積分核
- Level: A

一本の辺の時間辺平均前の作用素 $C$ を考える。$G=\{1,-1\}$、$w(g)=e^{\beta g}$ とする。$1,A$ に対する固有値を求めよ。

<!-- solution-start -->
**詳細解答**。[Wilson重みの非負指標展開](../MQFC22/index.md#thm-mqfc22-character-expansion) の二値例より $K(B,A)=p+qBA$、$p=\cosh\beta,q=\sinh\beta$。

$$
(C1)(B)=p+qB\int A\,dA=p,
$$

$$
(CA)(B)=p\int A\,dA+qB\int A^2\,dA=qB.
$$

$\int A\,dA=0$、$\int A^2\,dA=1$ だから固有値は $p,q$。$\beta\ge0$ ではいずれも非負である。端点ゲージ平均後には符号関数が消えるので $T=CP$ は定数上で $p$、符号上で0となる。
<!-- solution-end -->

### 演習 MQFC23-A3：商の内積
- Level: A

標準内積を持つ $\mathbb C^2$ の標準正規直交基底に関して、$T=\operatorname{diag}(3,0)$（第1成分を3倍し、第2成分を0にする作用素）とする。$f=(2,5)$、$g=(1,-4)$ の反射内積とそれぞれの零方向商の像を求めよ。

<!-- solution-start -->
**詳細解答**。[格子の物理Hilbert空間](#def-mqfc23-physical-hilbert) の形式に代入すると

$$
Tg=(3,0),\qquad \langle f,Tg\rangle=6.
$$

非負平方根は $T^{1/2}=\operatorname{diag}(\sqrt3,0)$ なので、商空間から通常の内積空間への等長写像による像は

$$
T^{1/2}f=(2\sqrt3,0),\qquad
T^{1/2}g=(\sqrt3,0).
$$

この通常内積も6。第2成分は全て零方向であり、商空間の次元は1である。
<!-- solution-end -->

### 演習 MQFC23-A4：時間の単位
- Level: A

正の固有値が $6,3,1$、時間間隔 $a=1/4$ の転送作用素を規格化し、励起エネルギーと2層の減衰率を求めよ。

<!-- solution-start -->
**詳細解答**。[転送作用素の真空規格化](#thm-mqfc23-vacuum) に従って最大固有値6で割ると、規格化固有値は $1,1/2,1/6$ となる。

[格子Hamiltonianの構成](#thm-mqfc23-hamiltonian) により、エネルギーと2層後に掛かる係数は順に

$$
(E_0,E_1,E_2)=(0,4\log2,4\log6),
\qquad (\lambda_0^2,\lambda_1^2,\lambda_2^2)=(1,1/4,1/36).
$$

例えば第2成分では $\exp(-(2/4)4\log2)=1/4$ となり一致する。
<!-- solution-end -->

### 演習 MQFC23-B1：境界因子の検算
- Level: B

空間層が3個 $A_0,A_1,A_2$ のとき、$\langle\psi,T^2\psi\rangle$ の積分を展開し、空間重みが各層で1回ずつ現れることを確認せよ。

<!-- solution-start -->
**詳細解答**。[Wilson転送作用素](#def-mqfc23-transfer) の核を $L(B,A)=\sqrt{h(B)h(A)}\,D(B,A)$ と略記する。$D(B,A)=\int K(B,sA)\,ds$ である。二重の作用を内積に代入すると

$$
\langle\psi,T^2\psi\rangle
=\int\psi(A_2)L(A_2,A_1)L(A_1,A_0)\psi(A_0)
\,dA_0dA_1dA_2.
$$

$\psi=\sqrt h$ を代入すると $A_0$ の平方根は右端と最後の核に、$A_1$ の平方根は両方の核に、$A_2$ の平方根は左端と最初の核に現れる。従って

$$
Z'_2=\int h(A_0)h(A_1)h(A_2)
D(A_2,A_1)D(A_1,A_0)\,dA_0dA_1dA_2.
$$

全層の重みは1回ずつであり、各時間辺の平均も1回ずつ現れる。端点の $\psi$ を省くと端点の空間作用が半分になるので、同じ自由境界模型ではなくなる。
<!-- solution-end -->

### 演習 MQFC23-B2：零固有値と非有界性
- Level: B

正規直交基底 $(e_j)_{j\ge0}$ の空間で $Ue_0=0$、$Ue_j=e^{-j+1}e_j$（$j\ge1$）とする。$a=1$ の物理空間、真空、Hamiltonian の定義域を求め、$v=\sum_{j\ge1}j^{-1}e_j$ がその定義域に入るか判定せよ。

<!-- solution-start -->
**詳細解答**。零固有空間は $\operatorname{span}\{e_0\}$ なので、[格子の物理Hilbert空間](#def-mqfc23-physical-hilbert) の同一視に従えば物理空間は $e_0^\perp$。最大固有値1に対応する真空は $e_1$。 [格子Hamiltonianの構成](#thm-mqfc23-hamiltonian) と同じ対角構成から

$$
He_j=(j-1)e_j,\qquad
D(H)=\left\{\sum_{j\ge1}v_je_j:
\sum_{j\ge1}(j-1)^2|v_j|^2<\infty\right\}.
$$

$v$ は $\sum j^{-2}<\infty$ なので物理空間に属する。しかし $j\ge2$ で $(j-1)^2/j^2\ge1/4$ だから定義域の和は発散する。よって $v\notin D(H)$。$e_0$ の除去と $H$ の非有界性は別の問題である。
<!-- solution-end -->

### 演習 MQFC23-B3：有限格子の相関減衰
- Level: B

規格化した転送作用素の固有値が $1,0.8,0.3$ とする。真空に直交する $v=2u_1+iu_2$ に対し、$\langle v,U^n v\rangle$ と $a=0.1$ のギャップを求めよ。$v=u_2$ の場合の減衰率と比較せよ。

<!-- solution-start -->
**詳細解答**。固有系は正規直交であるため交差項は0。第2引数線形の内積なので係数は絶対値二乗となり、

$$
\langle v,U^n v\rangle=4(0.8)^n+(0.3)^n
\le5(0.8)^n.
$$

真空直交空間の上端は0.8だからギャップは $-10\log0.8$。$v=u_2$ なら相関は $(0.3)^n$、エネルギーは $-10\log0.3>-10\log0.8$。一つの観測量が最低励起に直交すると、観測される減衰はギャップより速い。
<!-- solution-end -->

### 演習 MQFC23-C1：閉路の転送作用素
- Level: C

二値群の空間グラフを3頂点3辺の閉路とする。空間正方形は置かず $h=1$ とし、時間方向の各辺に対応する正方形の重みを $w(g)=e^{\beta g}$ とする（空間の周期的な一次元模型）。$\beta>0$ とする。

1. 頂点変換に不変な関数空間が $1$ と閉路積 $W=A_1A_2A_3$ で張られることを示せ。
2. $T$ のこの空間上の固有値を求め、物理Hilbert空間とギャップを求めよ。
3. $\beta=0$ で何が変わるか説明せよ。

<!-- solution-start -->
**詳細解答**。第1問。頂点を順に $x_1,x_2,x_3$、辺を $x_1\to x_2\to x_3\to x_1$ とする。ゲージ変換後の辺は $s_2 A_1 s_1,s_3 A_2 s_2,s_1 A_3 s_3$。積は $s_1^2s_2^2s_3^2W=W$ で不変である。

逆に頂点変換を

$$
s_1=1,\qquad s_2=A_1,\qquad s_3=A_2A_1
$$

と選ぶ。すると変換後の各辺は順に

$$
A_1^2=1,\quad (A_2A_1)A_2A_1=1,\quad
A_3A_2A_1=W
$$

になる。従って同じ $W$ を持つ配置は同じ軌道に属する。不変関数は二値 $W$ の関数であり、$1,W$ で張られる。

積Haar測度で閉路積は一様二値なので $\int W=0$、$\int W^2=1$。よってこの二つは正規直交系である。

第2問。$p=\cosh\beta,q=\sinh\beta$ と置く。[Wilson転送作用素](#def-mqfc23-transfer) は $h=1$ のため $CP$ となる。$1,W$ は $P$ で固定される。演習 MQFC23-A2 と同じ二値群の核を各辺に適用する。核は辺ごとの積で

$$
K(B,A)=\prod_{i=1}^3(p+qB_i A_i).
$$

積Haar測度の独立性から

$$
(C1)(B)=\prod_{i=1}^3\int(p+qB_iA_i)\,dA_i=p^3,
$$

$$
(CW)(B)=\prod_{i=1}^3\int(p+qB_iA_i)A_i\,dA_i
=q^3 B_1B_2B_3.
$$

各辺で $\int A_i=0,\int A_i^2=1$ を使った。従って固有値は $p^3,q^3$ である。$\beta>0$ なら $p>q>0$、不変空間内の零方向はない。一方、その直交補空間は $P$ で消える。従って物理Hilbert空間は二次元で、真空は定数1、唯一の励起ベクトルは $W$ となる。

[転送作用素の真空規格化](#thm-mqfc23-vacuum) により励起固有値は $(q/p)^3=(\tanh\beta)^3$。[格子Hamiltonianの構成](#thm-mqfc23-hamiltonian) によりギャップは

$$
-a^{-1}\log((\tanh\beta)^3)
=-3a^{-1}\log(\tanh\beta)>0.
$$

$W$ の真空期待値は0、乗算によって真空から励起ベクトル $W$ を得るので、$n$ 層の相関は $(\tanh\beta)^{3n}$ となる。

第3問。$\beta=0$ なら $p=1,q=0$。$W$ は依然としてゲージ不変だが、転送作用素で消えるので反射形式での長さは0となる。物理Hilbert空間は定数だけの一次元であり、正の有限励起エネルギーは存在しない。零固有値に $-\log0$ を代入して通常の固有ベクトルとして残すことはできない。
<!-- solution-end -->

## 7. 次の講義

転送作用素によって、一層の積分、ゲージ不変なベクトル、真空と相関の減衰を一つの枠組みに結び付けた。次講では強結合で Wilson loop の期待値を展開し、閉路が囲む面積との関係を調べる。
