# MIR2-10 超幾何I関数とquinticの係数

<!-- definition-example-audit: strict -->

## 1. 幾何から定まるJ関数と、手で計算できる級数の間

[前講の種数0のJ関数](../MIR2-09/index.md#def-mir2-09-j-function)は、安定写像の仮想基本類と子孫挿入を使って定義した。係数には未知のGromov–Witten不変量が入る。これに対し、[B側の正則周期](../MIR1-11/index.md#thm-mir1-11-regular-period)は、階乗係数を使って実際に計算できた。

$$
\omega_0(z)=\sum_{d\ge0}\frac{(5d)!}{(d!)^5}z^d.
$$

次の問いは、**この階乗比を、超平面類も含む一つの級数へ拡張できるか**である。そこで超幾何 $I$ 関数を定義する。ただし $I$ はまず明示的な代数的級数として作るものであり、$J$ に含まれる仮想曲線計数と一致するという主張は**定義からは出ない**。

舞台を固定する。$X\subset\mathbb P^4_{\mathbb C}$ は滑らかな五次超曲面、$H=c_1(\mathcal O_X(1))$ は超平面類である。[古典的三重交叉](../MIR2-02/index.md#prop-mir2-02-degree-zero-three-point)によれば $\int_XH^3=5$。$X$ は複素三次元なので、カップ積の実次数が8となる $H^4$ は零である。従って射影空間から来る偶数コホモロジーの部分環は

$$
R_{\mathrm{amb}}=\mathbb Q[H]/(H^4),\qquad
1,H,H^2,H^3\ \text{が基底}
$$

で表せる。これは奇数次を含む $H^\bullet(X)$ 全体ではない。[A側でambient部分に限った理由](../MIR2-04/index.md#def-mir2-04-small-product)とも整合する。

ここでは $z$ をB側の複素構造パラメータ、$d$ を非負整数の次数、$w$ を形式的な可逆補助変数とする。後で使う $h=H/w$ は**コホモロジー類を形式変数で割った元**であり、$h^4=0$。

$w$ は[J関数](../MIR2-09/index.md#def-mir2-09-j-function)の子孫変数と同じ名前にそろえるが、ここでは定義の類似を表すだけである。指数には $\operatorname{Log}z$ が出るため、解析的に読むときは $0<|z|<\delta<1/3125$ の切断円板で分枝を固定する。形式的な計算では $L=\operatorname{Log}z$ を記号として扱い、$\theta L=1$ とする。

## 2. 五次という次数を係数の積へ入れる

五次超曲面なので分子の積は各次数 $d$ で $5d$ 個、射影空間の斉次座標が五つあることに対応して分母は五乗になる。これは構成の動機であり、仮想局所化からこの形がGW理論に現れることの証明ではない。

<a id="def-mir2-10-i-function"></a>

<!-- formal-statement-start -->
> **定義（quinticの超幾何I関数）**
>
> $X\subset\mathbb P^4_{\mathbb C}$ を滑らかな五次超曲面、$H=c_1(\mathcal O_X(1))$、$h=H/w\in R_{\mathrm{amb}}[w,w^{-1}]$、$w$ を可逆とする。$L=\operatorname{Log}z$ の分枝を上記の切断円板で固定する。空積を1と約束し、次の $R_{\mathrm{amb}}[w,w^{-1}]$ 値級数を超幾何I関数と定義する。

$$
\boxed{
I_X(z,w)
=w\,e^{hL}\sum_{d=0}^{\infty}z^d
\frac{\prod_{m=1}^{5d}(5h+m)}
{\prod_{m=1}^{d}(h+m)^5}
}.
$$

> 分母の $h+m$ は定数項 $m\ne0$ を持つので、$h^4=0$ の環で可逆である。$e^{hL}=1+hL+h^2L^2/2+h^3L^3/6$ は有限和である。級数の各成分は $|z|<1/3125$ で局所収束する（第4節で確認する）。
<!-- formal-statement-end -->

ここで $w$ を掛けたのは、[Jの次数0の項](../MIR2-09/index.md#prop-mir2-09-degree-zero-j)の $w e^{\mathbf t/w}$ と比較しやすくする規格化のためである。一方、分子の $5h$ は「次数5」、分母の指数5は「射影空間の五座標」の役目をしている。二種類の5を取り違えない。

<!-- definition-example-start: def-mir2-10-i-function -->

**定義の確認**（$d=0,1$）。 $d=0$ では分子・分母とも空積で1となり、寄与は $we^{hL}$。$d=1$ の係数は

$$
B_1(h)=\frac{(5h+1)(5h+2)(5h+3)(5h+4)(5h+5)}{(h+1)^5}.
$$

$(h+1)^5$ は定数項が1なので可逆であり、$h^4=0$ のもとで実際に割れる。分子・分母を展開すると

$$
\begin{aligned}
\prod_{m=1}^{5}(5h+m)
&=120+1370h+5625h^2+10625h^3\pmod {h^4},\\
(1+h)^{-5}&=1-5h+15h^2-35h^3\pmod {h^4}.
\end{aligned}
$$

よって

$$
B_1(h)=120+770h+575h^2-1150h^3.
$$

特に $h=0$ の値は $5!=120$ となり、既習の周期の一次係数と一致する。逆元の存在だけでなく、定義の非自明な割り算も確認した。

<!-- definition-example-end -->

## 3. Iの最初の二成分を手計算する

$w$ を除いた級数を $\mathcal I(z,h)=I_X(z,w)/w$ とする。$h$ は四乗零だから、唯一の成分表示

$$
\mathcal I(z,h)=I_0(z)+h\widehat I_1(z)+h^2 I_2(z)+h^3 I_3(z)
$$

がある。$\widehat I_1$ の対数を含まない部分を $I_1$ と呼ぶ。つまり

$$
\widehat I_1(z)=I_0(z)L+I_1(z).
$$

この区別をしておけば、「$I_1$ は対数を含むか」という表記の混乱がなくなる。以下 $H_n=\sum_{k=1}^n1/k$、$H_0=0$ は調和数である。

<a id="prop-mir2-10-i01"></a>

<!-- formal-statement-start -->
> **命題（I関数の定数成分と一次成分）**
>
> 上記の $I_X$ に対し、$a_d=(5d)!/(d!)^5$ と置く。$|z|<1/3125$ で

$$
\boxed{I_0(z)=\sum_{d\ge0}a_dz^d},
\qquad
\boxed{I_1(z)=5\sum_{d\ge1}a_d(H_{5d}-H_d)z^d}
$$

> が成立し、$I_X/w$ の $h$ 係数は $I_0(z)\operatorname{Log}z+I_1(z)$ である。従って $I_0(0)=1$、$I_1(0)=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

積の各因子の定数項を掛ければ $a_d$ が出る。一次係数は積を対数微分すると、分子から $5H_{5d}$、分母から $5H_d$ が出る。最後に指数 $e^{hL}$ の一次項を加える。

<!-- proof-start -->
### 証明

$d$ 次係数の有理式を $B_d(h)$ と置く。$B_d(0)=(5d)!/(d!)^5=a_d$。$h=0$ の近傍では分子・分母とも非零だから対数微分でき、

$$
\begin{aligned}
\frac{B_d'(h)}{B_d(h)}
&=\sum_{m=1}^{5d}\frac5{5h+m}
-5\sum_{m=1}^{d}\frac1{h+m},\\
\frac{B_d'(0)}{B_d(0)}
&=5H_{5d}-5H_d.
\end{aligned}
$$

$d=0$ では $B_0=1$ なので微分は零である。従って $B_d(h)$ の $h^0,h^1$ の項は

$$
B_d(h)=a_d+5a_d(H_{5d}-H_d)h+O(h^2).
$$

ここで $O(h^2)$ は四乗零環で次数2以上の項を表す。$e^{hL}=1+hL+O(h^2)$ を掛けると

$$
e^{hL}B_d(h)
=a_d+h\{a_dL+5a_d(H_{5d}-H_d)\}+O(h^2).
$$

各 $z^d$ 係数を足して主張を得る。$I_0(0)=a_0=1$、$I_1(0)=0$ は空積から従う。収束は次節の係数比によって保証される。$\square$
<!-- proof-end -->

**最初の二次数。** $H_5-H_1=137/60-1=77/60$ より

$$
5a_1(H_5-H_1)=5\cdot120\cdot\frac{77}{60}=770.
$$

また $H_{10}=7381/2520$、$H_2=3/2$ だから、$H_{10}-H_2=3601/2520$ であり

$$
5a_2(H_{10}-H_2)
=5\cdot113400\cdot\frac{3601}{2520}=810225.
$$

したがって

$$
\begin{aligned}
I_0(z)&=1+120z+113400z^2+O(z^3),\\
I_1(z)&=770z+810225z^2+O(z^3).
\end{aligned}
$$

これは単なる数値合わせではない。次節では**全次数**についてB側のFrobenius族と同じ係数比になることを示す。

## 4. Frobenius族と全次数で対応し、Picard–Fuchs方程式を満たす

[B側のFrobeniusパラメータ族](../MIR1-12/index.md#def-mir1-12-frobenius-family)では、補助変数 $\rho$ に依存する係数 $c_0(\rho)=1$ と

$$
\frac{c_d(\rho)}{c_{d-1}(\rho)}
=\frac{5\prod_{j=1}^4(5(d-1+\rho)+j)}{(d+\rho)^4}
\quad(d\ge1)
$$

を定義した。ここで注意すべき点は、I関数の $h$ をいきなり普通の複素数として周期へ代入するのではなく、**通常の複素変数に関する係数式として比を比較してから、四乗零の元 $h$ に代入する**ことである。

<a id="thm-mir2-10-frobenius-match"></a>

<!-- formal-statement-start -->
> **定理（I関数のFrobenius族への一致）**
>
> 上記の $I_X$ と、$c_d(\rho)$ による [Frobenius族](../MIR1-12/index.md#def-mir1-12-frobenius-family) $F(\rho,z)=e^{\rho L}\sum_{d\ge0}c_d(\rho)z^d$ を考える。係数を $\rho=0$ の近傍で展開してから $\rho=h=H/w$ と形式代入し $h^4=0$ とすると、

$$
\boxed{\mathcal I(z,h)=F(h,z)\pmod {h^4}}
$$

> が成立する。従って $I_0=\omega_0$、$\widehat I_1=y_1=\omega_0 L+A_1$、$I_1=A_1$ であり、さらに $\mathcal I$ の $h^2,h^3$ 成分は [四本の局所解](../MIR1-12/index.md#thm-mir1-12-log-basis) の $y_2,y_3$ と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

分子最後の因子 $5h+5d=5(h+d)$ を分母の一因子と相殺すると、Frobenius係数の漸化式がそのまま現れる。初期係数1も一致するので全次数で等しい。

<!-- proof-start -->
### 証明

$d\ge1$ で $B_d/B_{d-1}$ を計算すると

$$
\begin{aligned}
\frac{B_d(h)}{B_{d-1}(h)}
&=\frac{\prod_{m=5d-4}^{5d}(5h+m)}{(h+d)^5}\\
&=\frac{5(h+d)\prod_{j=1}^4(5(h+d-1)+j)}{(h+d)^5}\\
&=\frac{5\prod_{j=1}^4(5(d-1+h)+j)}{(d+h)^4}.
\end{aligned}
$$

相殺は $d+h$ の定数項が $d\ne0$ で可逆だから正当である。右辺は $c_d(\rho)/c_{d-1}(\rho)$ に $\rho=h$ を代入したもの。$B_0(h)=c_0(h)=1$ なので数学的帰納法で $B_d(h)=c_d(h)$ が任意の $d\ge0$ について成立する。

従って指数を掛けた級数 $\mathcal I=e^{hL}\sum_d c_d(h)z^d$ が $F(h,z)$ に一致する。[Frobenius局所解の定義と展開](../MIR1-12/index.md#thm-mir1-12-log-basis)で $y_k=\partial_\rho^k F(0,z)/k!$ だから、$F(h,z)=y_0+hy_1+h^2y_2+h^3y_3\pmod{h^4}$。

また[第一正則補正の公式](../MIR1-12/index.md#prop-mir1-12-harmonic)は $A_1=5\sum_{d\ge1}a_d(H_{5d}-H_d)z^d$。前節の $I_1$ と全係数が一致する。$\square$
<!-- proof-end -->

<a id="prop-mir2-10-pf"></a>

<!-- formal-statement-start -->
> **命題（I関数のPicard–Fuchs方程式）**
>
> 上記の $R_{\mathrm{amb}}[w,w^{-1}]$ 値級数 $\mathcal I=I_X/w$ に、$z$ のみに作用する作用素

$$
\mathcal L=\theta^4-5z\prod_{j=1}^4(5\theta+j),
\qquad \theta=z\frac{d}{dz}
$$

> を成分ごとに作用させる。このとき切断円板上で $\mathcal L\mathcal I=0$ であり、$I_0,\widehat I_1,I_2,I_3$ は同じ四階方程式の局所解である。
<!-- formal-statement-end -->

### 証明の見取り図

[既習の残差公式](../MIR1-12/index.md#thm-mir1-12-residual)においてパラメータの四乗が唯一の残差だった。$h^4=0$ なら、その残差を消せる。

<!-- proof-start -->
### 証明

[残差公式](../MIR1-12/index.md#thm-mir1-12-residual)は $|\rho|<1/2$、$0<|z|<\delta<1/3125$ で

$$
\mathcal L F(\rho,z)=\rho^4 e^{\rho L}
$$

を与える。$\rho$ で三階までTaylor展開すると、右辺の $\rho^0,\rho^1,\rho^2,\rho^3$ 係数はすべて零である。左辺では $\mathcal L$ が $\rho$ に依存しないのでTaylor係数と $\mathcal L$ の作用が交換できる（上記の収束領域で正当化される）。従って各 $y_k$（$0\le k\le3$）について $\mathcal Ly_k=0$。

前定理で $\mathcal I=\sum_{k=0}^3h^ky_k$ と分かった。$h$ は $z$ と独立なので $\mathcal L(h^ky_k)=h^k\mathcal Ly_k=0$、これらを足して $\mathcal L\mathcal I=0$ を得る。$\square$
<!-- proof-end -->

ここで得たのは**B側微分方程式の解**であり、「$J$ がその解である」と証明したわけではない。I関数の成分をより高い $h$ 次数まで残すには、$h^4=0$ による切断とは別の計算が必要になる。

**収束の位置づけ。** [Frobenius族の収束証明](../MIR1-12/index.md#thm-mir1-12-residual)は、$|\rho|\le\varepsilon<1/2$ で係数比が一様に3125へ近づくことから、$|z|<1/3125$ の閉小円板上で $F$ と $\rho$ の三階までの偏微分が局所一様収束することを示した。

ここで使う $y_0,\ldots,y_3$ はまさにその有限個の偏微分なので、$\mathcal I$ の各成分にも同じ収束が適用できる。ただし $L$ を含む成分は $z=0$ では一般に正則ではなく、分枝を固定した穿孔円板上の関数である。

## 5. Iの二成分からミラー座標を読み直す

第3節の $I_0(0)=1$ より、十分小さい原点近傍では $I_0\ne0$ である。そこで $I_1/I_0$ を取ると、[規格化ミラー座標の定義](../MIR1-15/index.md#def-mir1-15-mirror-coordinate)に現れた正則補正 $h(z)=A_1/\omega_0$ が得られる。ここだけは $h=H/w$ と重なるので、正則補正を $g(z)$ と書く。

<a id="prop-mir2-10-mirror-coordinate"></a>

<!-- formal-statement-start -->
> **命題（I関数から再現されるミラー写像）**
>
> $I_0,I_1$ を第3節の式で定め、$g(z)=I_1(z)/I_0(z)$ とする。原点近傍で

$$
T(z)=\operatorname{Log}z+g(z),
\qquad q(z)=e^{T(z)}=z\,e^{g(z)}
$$

> と置くと、$T=y_1/\omega_0$、$q$ は [MIR1-15の規格化ミラー写像](../MIR1-15/index.md#def-mir1-15-mirror-coordinate)に等しい。初項は

$$
\boxed{q(z)=z+770z^2+1014275z^3+O(z^4)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$I_0=\omega_0$ と $I_1=A_1$ を先の全次数一致から使い、比の二次係数を先に計算してから指数を展開する。

<!-- proof-start -->
### 証明

[一致定理](#thm-mir2-10-frobenius-match)より $I_0=\omega_0$、$I_1=A_1$。したがって

$$
T=L+\frac{I_1}{I_0}
=L+\frac{A_1}{\omega_0}
=\frac{y_1}{\omega_0}.
$$

$I_0=1+120z+113400z^2+O(z^3)$ だから、形式的な逆級数は

$$
I_0^{-1}=1-120z+(120^2-113400)z^2+O(z^3)
=1-120z-99000z^2+O(z^3).
$$

これに $I_1=770z+810225z^2+O(z^3)$ を掛けると

$$
g(z)=770z+(810225-120\cdot770)z^2+O(z^3)
=770z+717825z^2+O(z^3).
$$

従って

$$
\begin{aligned}
e^{g(z)}
&=1+g(z)+\frac{g(z)^2}{2}+O(z^3)\\
&=1+770z+\left(717825+\frac{770^2}{2}\right)z^2+O(z^3)\\
&=1+770z+1014275z^2+O(z^3).
\end{aligned}
$$

$q=ze^g$ から主張が従い、[MIR1-15の定義](../MIR1-15/index.md#def-mir1-15-mirror-coordinate)と一致する。$\square$
<!-- proof-end -->

**何が証明され、何が残るか。** ここまでのI関数の式、Picard–Fuchsとの一致、$q$ の係数は超幾何計算で証明された。一方、[J関数の定義](../MIR2-09/index.md#def-mir2-09-j-function)には仮想基本類とGW不変量が入る。

次数0では $J_X(\mathbf t,0,w)=we^{\mathbf t/w}$ だが、Iの $d=0$ 項が $we^{HL/w}$ と一致することだけで、**正次数全体の $I$ と $J$ の関係は導けない**。Iに使った $z$ とA側のNovikov変数 $Q$ をただ $Q=z$ と置くのも、鏡像座標変換 $q(z)$ を無視する誤りである。GW理論からIの積が出てくる理由を次講の局所化で学び、正確な $I/J$ 比較定理をその次に扱う。

## 6. 演習：定義から周期と鏡像写像まで

### Level A：定義と最初の係数

<a id="ex-mir2-10-a01"></a>
#### MIR2-10-A01 ambient環と逆元
- Level: A

滑らかなquintic三次元多様体 $X$ 上の超平面類 $H$ について、$H^4=0$ である理由を述べよ。$h=H/w$、$w$ 可逆として、$(1+h)^{-1}$ を正確に求め、掛けて検算せよ。

<!-- solution-start -->
**詳細解答。** $H$ は実次数2のコホモロジー類なので、$H^4$ は実次数8。一方 $X$ の実次元は6だから $H^8(X;\mathbb Q)=0$ である。従って $h^4=H^4/w^4=0$。有限幾何級数として

$$
(1+h)^{-1}=1-h+h^2-h^3
$$

である。実際 $(1+h)(1-h+h^2-h^3)=1-h^4=1$。形式的な無限和への収束は不要である。
<!-- solution-end -->

<a id="ex-mir2-10-a02"></a>
#### MIR2-10-A02 五次積の一次数係数
- Level: A

$B_1(h)=\prod_{m=1}^5(5h+m)/(h+1)^5$ の $h^0,h^1,h^2$ 係数を $h^4=0$ の環で求めよ。

<!-- solution-start -->
**詳細解答。** 分子を乗算すると、$h^2$ まで $120+1370h+5625h^2+O(h^3)$。分母の逆数は $(1+h)^{-5}=1-5h+15h^2+O(h^3)$。従って定数項は120、一次項は $1370-5\cdot120=770$、二次項は

$$
5625-5\cdot1370+15\cdot120
=5625-6850+1800=575.
$$

よって $B_1(h)=120+770h+575h^2+O(h^3)$。$O(h^3)$ は次数3の項が残り得るという意味であり、零と取り違えない。
<!-- solution-end -->

<a id="ex-mir2-10-a03"></a>
#### MIR2-10-A03 階乗比の漸化式
- Level: A

$a_d=(5d)!/(d!)^5$、$a_0=1$ に対し、$a_d/a_{d-1}$ を簡約して $a_1,a_2$ を求めよ。

<!-- solution-start -->
**詳細解答。** $d\ge1$ で

$$
\begin{aligned}
\frac{a_d}{a_{d-1}}
&=\frac{\prod_{j=0}^4(5d-j)}{d^5}
=\frac{5\prod_{j=1}^4(5d-5+j)}{d^4}.
\end{aligned}
$$

$d=1$ なら $a_1=5\cdot(1\cdot2\cdot3\cdot4)=120$。$d=2$ なら

$$
a_2=120\cdot\frac{10\cdot9\cdot8\cdot7\cdot6}{2^5}
=120\cdot945=113400.
$$

これは[正則周期の係数漸化式](../MIR1-10/index.md#prop-mir1-10-coefficient-recurrence)と一致する。
<!-- solution-end -->

<a id="ex-mir2-10-a04"></a>
#### MIR2-10-A04 調和数と一次補正
- Level: A

$H_n=\sum_{m=1}^n1/m$ とする。$5a_d(H_{5d}-H_d)$ の $d=1,2$ を求め、$I_1$ の最初の二項を記せ。

<!-- solution-start -->
**詳細解答。** $H_5=137/60$、$H_1=1$ より差は $77/60$。$a_1=120$ だから $5\cdot120\cdot77/60=770$。また $H_{10}=7381/2520$、$H_2=3/2=3780/2520$ から差は $3601/2520$。$a_2=113400$ なので

$$
5\cdot113400\cdot\frac{3601}{2520}
=225\cdot3601=810225.
$$

従って $I_1(z)=770z+810225z^2+O(z^3)$。この $I_1$ は対数を除いた正則補正であり、$h$ の全係数は $I_0L+I_1$ である。
<!-- solution-end -->

<a id="ex-mir2-10-a05"></a>
#### MIR2-10-A05 次数0と正次数の論理
- Level: A

$z^0$ のI関数と、$Q^0$ に制限した $J_X(\mathbf t,Q,w)$ を求め、$\mathbf t=HL$ と置いた場合の一致を記せ。その一致から正次数の $I=J$ を結論できるか。

<!-- solution-start -->
**詳細解答。** Iの $d=0$ 係数は空積なので $we^{HL/w}$。[Jの次数0の式](../MIR2-09/index.md#prop-mir2-09-degree-zero-j)は $J_X(\mathbf t,0,w)=we^{\mathbf t/w}$ である。$\mathbf t=HL$ を入れると同じ $we^{HL/w}$。しかしこの比較で使ったのは $d=0$ の項だけ。Iの $z^d$（$d>0$）には明示的な階乗積が、Jの $Q^d$ には仮想GW不変量が入り、両者の同一性は示されていない。従って正次数への結論はできない。
<!-- solution-end -->

### Level B：係数比較・微分方程式・座標変換

<a id="ex-mir2-10-b01"></a>
#### MIR2-10-B01 係数比とFrobenius族
- Level: B

$d\ge1$ とし、$B_d(h)=\prod_{m=1}^{5d}(5h+m)/\prod_{m=1}^d(h+m)^5$ とする。$B_d/B_{d-1}$ を簡約し、[MIR1-12のFrobenius係数](../MIR1-12/index.md#def-mir1-12-frobenius-family)の $c_d(h)/c_{d-1}(h)$ と一致することを示せ。

<!-- solution-start -->
**詳細解答。** 共通因子を約分すると

$$
\frac{B_d}{B_{d-1}}
=\frac{(5h+5d-4)(5h+5d-3)(5h+5d-2)(5h+5d-1)(5h+5d)}{(h+d)^5}.
$$

最後の因子は $5(h+d)$ で、$h+d$ は定数項 $d$ が非零のため可逆である。従って

$$
\frac{B_d}{B_{d-1}}
=\frac{5\prod_{j=1}^4(5(d-1+h)+j)}{(d+h)^4}.
$$

これは引用した $c_d(\rho)/c_{d-1}(\rho)$ の $\rho=h$ への代入である。$B_0=c_0=1$ より帰納法で全 $d$ に対し $B_d(h)=c_d(h)$。
<!-- solution-end -->

<a id="ex-mir2-10-b02"></a>
#### MIR2-10-B02 ミラー写像と逆写像
- Level: B

$I_0=1+120z+113400z^2+O(z^3)$、$I_1=770z+810225z^2+O(z^3)$ とする。$q= z\exp(I_1/I_0)$ を三次まで求め、逆級数 $z=z(q)$ を三次まで求めよ。

<!-- solution-start -->
**詳細解答。** $I_0^{-1}=1-120z-99000z^2+O(z^3)$ だから

$$
I_1/I_0=770z+(810225-92400)z^2+O(z^3)
=770z+717825z^2+O(z^3).
$$

$\exp(g)=1+g+g^2/2+O(z^3)$ を適用し

$$
q=z+770z^2+(717825+296450)z^3+O(z^4)
=z+770z^2+1014275z^3+O(z^4).
$$

逆写像を $z=q+bq^2+cq^3+O(q^4)$ と置き代入する。$z^2=q^2+2bq^3+O(q^4)$、$z^3=q^3+O(q^4)$ より

$$
q=q+(b+770)q^2+(c+1540b+1014275)q^3+O(q^4).
$$

よって $b=-770$、$c=-1540(-770)-1014275=171525$。従って $z=q-770q^2+171525q^3+O(q^4)$ である。
<!-- solution-end -->

<a id="ex-mir2-10-b03"></a>
#### MIR2-10-B03 四乗零の意味
- Level: B

[残差公式](../MIR1-12/index.md#thm-mir1-12-residual) $\mathcal LF(\rho,z)=\rho^4e^{\rho L}$ を用い、$\mathcal L\mathcal I=0$ を示せ。また $h^4\ne0$ の形式環に取り替えた場合、同じ結論をこの公式だけから導けるか。

<!-- solution-start -->
**詳細解答。** $F(\rho,z)=\sum_{k=0}^3\rho^k y_k(z)+O(\rho^4)$ とTaylor展開する。右辺は $\rho^4e^{\rho L}=\rho^4+O(\rho^5)$ だから、$\rho^k$（$k=0,1,2,3$）の係数比較により $\mathcal Ly_k=0$。$h^4=0$ では[係数一致](#thm-mir2-10-frobenius-match)により $\mathcal I=\sum_{k=0}^3h^k y_k$ なので $\mathcal L\mathcal I=\sum_{k=0}^3h^k\mathcal Ly_k=0$。

逆に $h^4$ が非零なら、Frobenius族を無限に展開して $\rho=h$ と代入したときの残差 $h^4e^{hL}$ は一般に零でない。従って四階の方程式が成り立つとは結論できない。三次元上のambient環による切断が効いている。
<!-- solution-end -->

<a id="ex-mir2-10-b04"></a>
#### MIR2-10-B04 二つの「5」の検算
- Level: B

分子だけを $5h+m$ の代わりに $h+m$ と誤記したと仮定する。$d=1$ の定数項と $h$ 係数を求め、quinticの周期と一致しない理由を示せ。

<!-- solution-start -->
**詳細解答。** 誤った比は

$$
\widetilde B_1(h)=\frac{\prod_{m=1}^5(h+m)}{(h+1)^5}
=\frac{(h+2)(h+3)(h+4)(h+5)}{(h+1)^4}.
$$

定数項は $2\cdot3\cdot4\cdot5=120$ で、**定数項だけなら正しい**。対数微分すると一次係数は

$$
\widetilde B_1'(0)
=120\left(\sum_{m=2}^{5}\frac1m-4\right)
=120\left(\frac{77}{60}-4\right)
=-326.
$$

正しい一次係数は $770$ だから、この誤記では対数周期の一次補正が一致しない。さらに全次数の比もFrobenius漸化式とは一致しない。定数項だけの検算が不十分な例である。
<!-- solution-end -->

### Level C：一つの関数から全体を再構成する

<a id="ex-mir2-10-c01"></a>
#### MIR2-10-C01 Iから周期・方程式・座標へ
- Level: C

滑らかなquintic三次元多様体 $X$ と $h=H/w$（$h^4=0$）について、次の級数を考える。

$$
I_X=we^{hL}\sum_{d\ge0}z^dB_d(h),\qquad
B_d(h)=\frac{\prod_{m=1}^{5d}(5h+m)}{\prod_{m=1}^d(h+m)^5}.
$$

次の四点を順に示せ。

- $h^0,h^1$ 係数を導く。
- Frobenius族との全次数一致とPicard–Fuchs方程式を示す。
- 鏡像座標の三次係数を求める。
- ここまでで仮想GW不変量が計算されたか論じる。

<!-- solution-start -->
**詳細解答。** (1) $B_d(0)=(5d)!/(d!)^5=a_d$。積の対数微分から

$$
B_d'(0)=a_d\left(5\sum_{m=1}^{5d}\frac1m
-5\sum_{m=1}^{d}\frac1m\right)
=5a_d(H_{5d}-H_d).
$$

指数 $e^{hL}=1+hL+O(h^2)$ を掛けると

$$
I_X/w=I_0+h(I_0L+I_1)+O(h^2),
$$

$$
I_0=\sum_{d\ge0}a_dz^d,\qquad
I_1=5\sum_{d\ge1}a_d(H_{5d}-H_d)z^d.
$$

(2) $B_d/B_{d-1}$ の分子末尾を $5(h+d)$ と書いて約分すると

$$
\frac{B_d}{B_{d-1}}
=\frac{5\prod_{j=1}^4(5(d-1+h)+j)}{(d+h)^4}.
$$

これは[Frobenius係数の漸化式](../MIR1-12/index.md#def-mir1-12-frobenius-family)であり、初期値 $B_0=c_0=1$ も同じ。従って $I_X/w=F(h,z)=\sum_{k=0}^3h^ky_k$。[残差公式](../MIR1-12/index.md#thm-mir1-12-residual)を $\rho$ の三階まで係数比較すると $\mathcal Ly_k=0$（$0\le k\le3$）だから $\mathcal L(I_X/w)=0$。

(3) $a_1=120$、$a_2=113400$、$H_5-H_1=77/60$、$H_{10}-H_2=3601/2520$ から

$$
I_0=1+120z+113400z^2+\cdots,\qquad
I_1=770z+810225z^2+\cdots.
$$

$I_0^{-1}=1-120z-99000z^2+\cdots$ を掛ければ

$$
\frac{I_1}{I_0}=770z+717825z^2+\cdots.
$$

指数関数の二次係数には $(770z)^2/2=296450z^2$ が加わるから

$$
q=ze^{I_1/I_0}
=z+770z^2+1014275z^3+\cdots.
$$

(4) 得たのは**明示的な超幾何級数とB側周期の一致**である。[J関数](../MIR2-09/index.md#def-mir2-09-j-function)の正次数には仮想基本類による未知のGW不変量が現れる。両者の比較には正しい鏡像座標、規格化、ミラー定理が必要であり、この演習では証明していない。従ってGW不変量の具体値も、曲線の本数も結論してはならない。
<!-- solution-end -->

## 7. 次講へ

ここで作ったI関数は、五次の積から $I_0=\omega_0$、$I_1=A_1$ を全次数で再現し、四乗零環の上でPicard–Fuchs方程式を満たした。ミラー座標も $q=z+770z^2+1014275z^3+\cdots$ と計算できた。

しかし $I$ はまだ**超幾何計算側の候補**であり、$J$ は仮想基本類による不変量の母関数である。次講のトーラス局所化では、空間に作用する対称性からGW積分を固定点寄与へ分ける仕組みを学び、その後に正確なquinticミラー定理へ進む。

参考：D. Cox・S. Katz, *Mirror Symmetry and Algebraic Geometry*, 第10–11章；K. Horiほか, *Mirror Symmetry*（Clay Mathematics Monographs）, 超幾何I関数・ミラー定理の章。
