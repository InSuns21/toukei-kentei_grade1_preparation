# MIR1-15 ミラー写像の構成と逆級数

<!-- definition-example-audit: strict -->

## 1. 周期比からなぜ新しい座標を作るのか

[四本のFrobenius解の構成](../MIR1-12/index.md#thm-mir1-12-log-basis)では、quinticのPicard–Fuchs方程式

$$
\mathcal Ly=0,\qquad
\mathcal L=\theta^4-5z\prod_{j=1}^{4}(5\theta+j),\qquad
\theta=z\frac{d}{dz}
$$

に対する正則解 $\omega_0(z)$ と対数解 $y_1(z)$ が得られた。

$$
\begin{aligned}
\omega_0(z)&=\sum_{d=0}^{\infty}a_dz^d,&a_d&=\frac{(5d)!}{(d!)^5},\\
y_1(z)&=\omega_0(z)\operatorname{Log}z+A_1(z),&
A_1(z)&=5\sum_{d=1}^{\infty}a_d(H_{5d}-H_d)z^d.
\end{aligned}
$$

ここで $H_n=\sum_{k=1}^n1/k$ は調和数で、$H_0=0$ とする。[第一正則補正の導出](../MIR1-12/index.md#prop-mir1-12-harmonic)で $A_1$ は $|z|<R=1/3125$ 上で正則だと分かっている。また[周期比の定義](../MIR1-12/index.md#def-mir1-12-period-ratio)により、分母が零でない切断領域で

$$
T(z)=\frac{y_1(z)}{\omega_0(z)}
=\operatorname{Log}z+h(z),\qquad h(z)=\frac{A_1(z)}{\omega_0(z)}
$$

と書ける。原点を反時計回りに一周すると、[対数解のモノドロミー](../MIR1-13/index.md#thm-mir1-13-continuation)から $T\mapsto T+2\pi i$ となる。このままでは $T$ は原点の周りで一価でない。

一方、指数関数は $e^{T+2\pi i}=e^T$ を満たす。そこで周期比の指数を取り、原点まで延長できる**一価な局所座標**を作る。その際、先頭係数だけを合わせて残りを推測してはならない。正則な逆写像の存在、係数の計算、変数変換の微分を順に確かめる。

注意したいのは、この計算の舞台が[quinticの一パラメータ周期系](../MIR1-10/index.md#thm-mir1-10-quintic-pf)であることだ。[整数周期格子と局所基底を区別する定義](../MIR1-14/index.md#def-mir1-14-integral-period-lattice)にあるように、対数解の局所規格化だけで幾何学的な整数周期基底全体が決まるわけではない。

## 2. 規格化ミラー写像と局所双正則性

$\omega_0(0)=1$ だから、十分小さい $\delta$（$0<\delta<R$）を選べば $|z|<\delta$ で $\omega_0(z)\ne0$ である。よって $h=A_1/\omega_0$ はこの円板で正則であり、$A_1(0)=0$ なので $h(0)=0$ となる。

切断した穿孔円板で対数分枝を固定し、$t=T/(2\pi i)$ と置く。すると $t$ は原点を正向きに一周するごとに $1$ 増える。この加法的な変化を指数で打ち消したものを考える。

<a id="def-mir1-15-mirror-coordinate"></a>

<!-- formal-statement-start -->
> **定義（規格化ミラー座標）**
>
> $a_d=(5d)!/(d!)^5$、$H_n=\sum_{k=1}^n1/k$ とし、周期級数を次で定める。

$$
\omega_0(z)=\sum_{d\ge0}a_dz^d,
\qquad A_1(z)=5\sum_{d\ge1}a_d(H_{5d}-H_d)z^d.
$$

> $|z|<\delta<1/3125$ で $\omega_0$ が非零となる $\delta$ を選び、$h=A_1/\omega_0$ とする。切断した $0<|z|<\delta$ で対数分枝を固定し、$T=\operatorname{Log}z+h$、$t=T/(2\pi i)$ と置く。**本講の規格化ミラー写像**を

$$
\boxed{q(z)=e^{2\pi it(z)}=e^{T(z)}=z e^{h(z)}}
$$

> とする。原点では右辺を使って $q(0)=0$ と定める。$z$ はB側の複素構造座標、$t$ は規格化周期比、$q$ はその指数座標である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir1-15-mirror-coordinate -->

**定義の確認**。小さい正実数 $z$ で実対数を選ぶ。階乗係数は正、$H_{5d}-H_d>0$ だから $\omega_0(z)>0$、$A_1(z)>0$ で、$h(z)$ は実数となる。したがって $q(z)=ze^{h(z)}>0$ で、$q(z)/z\to e^{h(0)}=1$。さらに一周後は $T+2\pi i$ となるが $e^{T+2\pi i}=e^T$。**正実軸での値、一周後の一価性、原点での規格化**をそれぞれ確かめた。

<!-- definition-example-end -->

<a id="thm-mir1-15-local-biholomorphism"></a>

<!-- formal-statement-start -->
> **定理（ミラー写像は原点で局所双正則）**
>
> $h$ は原点近傍で正則、$h(0)=0$ とし、$q(z)=ze^{h(z)}$ とする。$q$ は原点で正則に定義され、

$$
q(0)=0,\qquad q'(0)=1.
$$

> さらに原点の十分小さい開近傍上で $q$ は双正則である。その局所逆関数 $Z$ は正則で、$Z(0)=0$、$Z'(0)=1$、$q(Z(w))=w$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

対数は指数を取ると消え、$q=ze^h$ は原点に延長される。原点での微分が零でないことを確認し、複素平面を実二次元と見て[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)を適用する。逆写像の複素正則性は微分の複素線形性から示す。

<!-- proof-start -->
### 証明

$h$ と指数関数の合成は正則なので、$q=ze^h$ は原点を含む円板で正則である。積の微分と連鎖律から

$$
q'(z)=e^{h(z)}+ze^{h(z)}h'(z)
=e^{h(z)}(1+zh'(z)).
$$

$h(0)=0$ を代入すると $q(0)=0$、$q'(0)=e^0=1\ne0$。

複素変数 $z=x+iy$ を実二次元座標とみなす。正則関数 $q$ の実微分行列は、Cauchy–Riemannの等式から

$$
D_{\mathbb R}q(z)=
\begin{pmatrix}
\operatorname{Re}q'(z)&-\operatorname{Im}q'(z)\\
\operatorname{Im}q'(z)&\operatorname{Re}q'(z)
\end{pmatrix},
\qquad
\det D_{\mathbb R}q(z)=|q'(z)|^2.
$$

したがって原点では行列式が1で非零となる。[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)を実二次元の $C^1$ 写像 $q$ に適用すると、原点近傍で実 $C^1$ 級の逆関数 $Z$ が存在する。十分小さい近傍では $q'(z)\ne0$ であり、逆関数定理の微分公式により $D_{\mathbb R}Z$ は $D_{\mathbb R}q$ の逆行列、すなわち複素数 $1/q'(z)$ を掛ける線形写像である。従って $Z$ もCauchy–Riemannの等式を満たし、複素微分可能で正則である。ゆえに $q$ は双正則である。

$q(Z(0))=0$ と局所単射性から $Z(0)=0$。次に合成式を $w=0$ で微分すると

$$
q'(Z(0))Z'(0)=1
$$

なので $1\cdot Z'(0)=1$。$\square$
<!-- proof-end -->

**最小例。** $h(z)=az$ とすれば $q(z)=z(1+az+a^2z^2/2+\cdots)$ である。どんな定数 $a$ でも $q'(0)=1$ だが、二次以降の補正は $a$ に依存する。quinticでは最初の $a=770$ が周期から決まる。

## 3. 周期級数を割り、指数を取る

[正則周期の階乗公式](../MIR1-11/index.md#thm-mir1-11-regular-period)と[第一正則補正](../MIR1-12/index.md#prop-mir1-12-harmonic)から、原点での係数は

$$
\begin{aligned}
\omega_0(z)&=1+120z+113400z^2+168168000z^3+O(z^4),\\
A_1(z)&=770z+810225z^2+\frac{3745679000}{3}z^3+O(z^4).
\end{aligned}
$$

三次係数の出発点も確認しよう。$a_3=15!/(3!)^5=168168000$ と $H_{15}-H_3=535097/360360$ より、

$$
5a_3(H_{15}-H_3)
=5\cdot168168000\cdot\frac{535097}{360360}
=\frac{3745679000}{3}.
$$

いきなり指数を取るのではなく、先に商を計算する。$h=h_1z+h_2z^2+h_3z^3+O(z^4)$ と置き、$\omega_0h=A_1$ の係数を比較すると

$$
\begin{aligned}
h_1&=770,\\
h_2+120h_1&=810225,\\
h_3+120h_2+113400h_1&=\frac{3745679000}{3}.
\end{aligned}
$$

すなわち

$$
h_2=810225-120\cdot770=717825,
$$

$$
h_3=\frac{3745679000}{3}-120\cdot717825-113400\cdot770
=\frac{3225308000}{3}.
$$

ここで $h(0)=0$ を使い、$q=ze^h$ を展開する。$z^4$ まで必要なら $e^h$ は $z^3$ まででよい。具体的に

$$
\begin{aligned}
h^2&=h_1^2z^2+2h_1h_2z^3+O(z^4),\\
h^3&=h_1^3z^3+O(z^4),\\
e^h&=1+h+\frac{h^2}{2}+\frac{h^3}{6}+O(z^4).
\end{aligned}
$$

<a id="prop-mir1-15-forward-series"></a>

<!-- formal-statement-start -->
> **命題（quinticのミラー写像の初期係数）**
>
> $a_d=(5d)!/(d!)^5$、$H_n=\sum_{k=1}^n1/k$ を使い、次の周期級数を考える。

$$
\omega_0(z)=\sum_{d\ge0}a_dz^d,
\qquad A_1(z)=5\sum_{d\ge1}a_d(H_{5d}-H_d)z^d.
$$

> $\omega_0(0)=1$ なので、原点近傍で $q(z)=z\exp(A_1(z)/\omega_0(z))$ を定められる。この写像のTaylor展開は

$$
\boxed{q(z)=z+770z^2+1014275z^3+1703916750z^4+O(z^5)}
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

商の係数を上で出したので、指数関数のTaylor係数を計算する。四次係数には $h^3/6$ の寄与も含まれる。

<!-- proof-start -->
### 証明

$q=ze^h$ の各係数は

$$
\begin{aligned}
[z^2]q&=h_1=770,\\
[z^3]q&=h_2+\frac{h_1^2}{2}
=717825+\frac{770^2}{2}
=1014275,\\
[z^4]q&=h_3+h_1h_2+\frac{h_1^3}{6}\\
&=\frac{3225308000}{3}+770\cdot717825+\frac{770^3}{6}.
\end{aligned}
$$

最後の二項は $770\cdot717825=552725250$ と $770^3/6=228266500/3$。従って

$$
[z^4]q=\frac{3225308000+1658175750+228266500}{3}
=1703916750.
$$

$h$ が原点近くで正則なので剰余は $O(z^5)$ とできる。$\square$
<!-- proof-end -->

**規格化が重要になる理由。** もし対数解を $y_1+c\omega_0$ に選び直せば $T\mapsto T+c$ となる。新しい指数座標は $\widetilde q=e^cq$ であり、$\widetilde q=z+O(z^2)$ を保つ条件は $e^c=1$、すなわち $c\in2\pi i\mathbb Z$ である。これは局所的な先頭係数の条件であって、[整数周期基底](../MIR1-14/index.md#def-mir1-14-integral-period-lattice)を確定させたという主張ではない。

## 4. 合成式から逆級数を求める

[局所双正則性](#thm-mir1-15-local-biholomorphism)で逆関数は既に存在する。新しい変数を $q$、元の変数を $z=Z(q)$ とする。逆関数の係数を得るには $q(Z(q))=q$ を次数ごとに満たせばよい。

<a id="def-mir1-15-inverse-mirror-series"></a>

<!-- formal-statement-start -->
> **定義（逆ミラー級数）**
>
> 原点近傍で正則な写像 $q(z)$ が次の展開を持つとする。

$$
q(z)=z+770z^2+1014275z^3+1703916750z^4+O(z^5).
$$

> $q(0)=0$、$q'(0)=1$ により、原点近傍で正則逆関数 $Z$ が存在する。$Z(0)=0$、$Z'(0)=1$、$q(Z(w))=w$ が成立する。この $Z$ の原点でのTaylor級数を**逆ミラー級数**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir1-15-inverse-mirror-series -->

**定義の確認**。$Q(z)=z/(1-z)$ は $Q(0)=0$、$Q'(0)=1$ である。$q=z/(1-z)$ を $z$ について解くと $z=q/(1+q)$ となり、$|q|<1$ で

$$
Z(q)=\frac{q}{1+q}=q-q^2+q^3-q^4+\cdots.
$$

実際、$Q(Z(q))=[q/(1+q)]/[1-q/(1+q)]=q$。原点値、微分、合成条件を一つずつ確かめた。これで逆級数の高次係数は元の係数の単なる符号反転ではないと分かる。

<!-- definition-example-end -->

一般に $Q(z)=z+Az^2+Bz^3+Cz^4+O(z^5)$、$Z(q)=q+b_2q^2+b_3q^3+b_4q^4+O(q^5)$ と置く。積を展開しておくと、

$$
\begin{aligned}
Z^2&=q^2+2b_2q^3+(b_2^2+2b_3)q^4+O(q^5),\\
Z^3&=q^3+3b_2q^4+O(q^5),\\
Z^4&=q^4+O(q^5).
\end{aligned}
$$

これを $Q(Z)=Z+AZ^2+BZ^3+CZ^4+\cdots$ に代入し、$q$ 以外の係数を零と置くと

$$
\begin{aligned}
b_2+A&=0,\\
b_3+2Ab_2+B&=0,\\
b_4+A(b_2^2+2b_3)+3Bb_2+C&=0.
\end{aligned}
$$

順に解いて

$$
b_2=-A,\qquad b_3=2A^2-B,\qquad b_4=-5A^3+5AB-C.
$$

<a id="thm-mir1-15-inverse-coefficients"></a>

<!-- formal-statement-start -->
> **定理（逆ミラー級数の初期係数）**
>
> $q(z)=z\exp(A_1(z)/\omega_0(z))$ を前節のquinticの周期から作り、原点での正則逆関数を $Z$ とする。このとき

$$
\boxed{Z(q)=q-770q^2+171525q^3-81623000q^4+O(q^5)}
$$

> が成り立つ。これは原点近傍で収束するTaylor級数の展開である。
<!-- formal-statement-end -->

### 証明の見取り図

正方向の三係数を一般の反転式へ代入する。先に逆関数の存在を証明したため、求める係数は実際の解析的逆関数の係数である。

<!-- proof-start -->
### 証明

[正方向の係数](#prop-mir1-15-forward-series)から $A=770$、$B=1014275$、$C=1703916750$ とする。まず

$$
b_2=-770,\qquad
b_3=2\cdot770^2-1014275=1185800-1014275=171525.
$$

四次では元の係数比較を使い、途中の積を別々に出す。

$$
\begin{aligned}
b_2^2+2b_3&=592900+343050=935950,\\
A(b_2^2+2b_3)&=770\cdot935950=720681500,\\
3Bb_2&=-3\cdot1014275\cdot770=-2342975250.
\end{aligned}
$$

よって

$$
\begin{aligned}
b_4&=-720681500+2342975250-1703916750\\
&=-81623000.
\end{aligned}
$$

この係数は $Q(Z(q))=q+O(q^5)$ を満たす。逆関数のTaylor展開は一意なので主張が得られる。$\square$
<!-- proof-end -->

## 5. Lagrange反転公式を証明して高次係数へ

係数比較は確実だが、一般次数では計算が長くなる。ここで $[z^k]f(z)$ を正則級数 $f$ の $z^k$ 係数とする。$q=ze^{h(z)}$ の形に特化すると、逆級数の係数を一式で書ける。

<a id="thm-mir1-15-lagrange-inversion"></a>

<!-- formal-statement-start -->
> **定理（指数型ミラー写像のLagrange反転公式）**
>
> $h$ は原点近傍で正則かつ $h(0)=0$ とする。$Q(z)=ze^{h(z)}$ と、その原点近傍の正則逆関数 $Z$ に対し、すべての整数 $n\ge1$ で

$$
\boxed{[q^n]Z(q)=\frac1n[z^{n-1}]e^{-nh(z)}}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

Cauchyの係数積分で逆関数の係数を取り出す。閉曲線の全微分の積分を零と置いてから $q=Q(z)$ へ変数を戻すと、逆関数の微分は消え、指数型の係数だけが残る。

<!-- proof-start -->
### 証明

[局所双正則性](#thm-mir1-15-local-biholomorphism)により十分小さい領域で $Q$ と $Z$ が互いに正則逆写像をなす。原点を正向きに一周する小円 $C_q$ 上でCauchyの係数積分を適用すると

$$
[q^n]Z=\frac1{2\pi i}\int_{C_q}Z(q)q^{-n-1}\,dq.
$$

全微分を展開して

$$
d(Z(q)q^{-n})=Z'(q)q^{-n}\,dq-nZ(q)q^{-n-1}\,dq
$$

を得る。閉曲線の全微分積分は零だから

$$
[q^n]Z=\frac1{2\pi in}\int_{C_q}Z'(q)q^{-n}\,dq.
$$

$Q$ は近傍で双正則なので $q=Q(z)$ と変数変換でき、原点の周回の向きは正に保たれる。また $Z(Q(z))=z$ を微分すると $Z'(Q(z))Q'(z)=1$、従って $Z'(q)\,dq=dz$ となる。よって $C_q$ の逆像 $C_z$ 上で

$$
\begin{aligned}
[q^n]Z
&=\frac1{2\pi in}\int_{C_z}\frac{dz}{Q(z)^n}\\
&=\frac1{2\pi in}\int_{C_z}z^{-n}e^{-nh(z)}\,dz\\
&=\frac1n[z^{n-1}]e^{-nh(z)}.
\end{aligned}
$$

最後に $e^{-nh}$ が原点で正則であることを使ってCauchyの係数積分を再適用した。$\square$
<!-- proof-end -->

**quinticでの第二の検算。** 前節までに $h_1=770$、$h_2=717825$、$h_3=3225308000/3$ が分かっているので、

$$
\begin{aligned}
[q^2]Z&=\tfrac12[z]e^{-2h}=-h_1=-770,\\
[q^3]Z&=\tfrac13[z^2]e^{-3h}
=-h_2+\tfrac32h_1^2=171525,\\
[q^4]Z&=\tfrac14[z^3]e^{-4h}
=-h_3+4h_1h_2-\tfrac83h_1^3.
\end{aligned}
$$

最後の式の三つの項は順に $-3225308000/3$、$2210901000$、$-3652264000/3$ だから和は $-81623000$。これは[直接係数比較](#thm-mir1-15-inverse-coefficients)とは別の導出である。

## 6. 微分変換と幾何学的な意味の境界

後続のB側Yukawa結合では、関数の値に加え、**どの座標で微分するか**を指定する必要がある。$\theta_z=z\,d/dz$、$\theta_q=q\,d/dq$ と書き分ける。$t=(\operatorname{Log}z+h)/(2\pi i)$ は対数分枝を選んだ領域の座標である。

<a id="prop-mir1-15-coordinate-derivatives"></a>

<!-- formal-statement-start -->
> **命題（ミラー座標の微分の変換）**
>
> $h$ は原点近傍で正則、$h(0)=0$ とし、$q=ze^{h(z)}$、$t=(\operatorname{Log}z+h(z))/(2\pi i)$ とする。$z\ne0$、$1+zh'(z)\ne0$ の局所領域で、

$$
\boxed{\frac{dq}{dz}=e^h(1+zh'),\quad
\theta_z=(1+zh')\theta_q,\quad
\frac{dz}{dt}=\frac{2\pi iz}{1+zh'}.}
$$

> $\theta_z$ と $\theta_q$ の等式は、同じ関数を対応する座標で表した場合の作用素の等式を意味する。
<!-- formal-statement-end -->

### 証明の見取り図

積と合成の微分から $dq/dz$ を求め、その式を関数 $f(q(z))$ の連鎖律へ代入する。最後は $dt/dz$ の逆数を取るが、分母の非零条件を忘れない。

<!-- proof-start -->
### 証明

$ze^{h}$ を $z$ で微分すると $dq/dz=e^h+ze^hh'=e^h(1+zh')$ である。$f(q)$ を正則関数とすると

$$
\begin{aligned}
\theta_z f(q(z))
&=z\frac{d}{dz}f(q(z))
=z\frac{dq}{dz}\frac{df}{dq}\\
&=ze^h(1+zh')\frac{df}{dq}
=(1+zh')q\frac{df}{dq}.
\end{aligned}
$$

これが $\theta_z=(1+zh')\theta_q$ の作用の意味となる。さらに

$$
\frac{dt}{dz}
=\frac1{2\pi i}\left(\frac1z+h'(z)\right)
=\frac{1+zh'(z)}{2\pi iz}.
$$

$z\ne0$ かつ $1+zh'\ne0$ のとき、この微分の逆数を取ることで $dz/dt=2\pi iz/(1+zh')$ を得る。$1+zh'(0)=1$ なので原点近くでは後者の非零条件を確保できる。$\square$
<!-- proof-end -->

本講で求めた $q=z+O(z^2)$ は、**局所Frobenius周期から定義した規格化座標**である。一方、[前講の整数周期格子](../MIR1-14/index.md#def-mir1-14-integral-period-lattice)との同定には別の幾何データを要する。A側のKählerパラメータや曲線計数変数への同一視、正則3形式の規格化、Yukawa結合との照合は、ここではまだ証明していない。局所座標の係数だけを曲線本数と読むのは誤りである。

## 7. 演習：定義から逆級数まで

### Level A：各操作を確実にする

<a id="ex-mir1-15-a01"></a>
#### MIR1-15-A01 一周で何が変わるか
- Level: A

$T=\operatorname{Log}z+h(z)$、$h(0)=0$、$h$ は原点近傍で一価正則とする。正向き一周で $t=T/(2\pi i)$ と $q=e^{2\pi it}$ はどう変わるか。また $q(0)$、$q'(0)$ を求めよ。

<!-- solution-start -->
**詳細解答。** 一周で $\operatorname{Log}z\mapsto\operatorname{Log}z+2\pi i$ となり、$h$ は一価なので変わらない。$t\mapsto t+1$ だが $e^{2\pi i(t+1)}=e^{2\pi it}$ より $q$ は不変。$q=ze^h$ から $q(0)=0$、$q'(z)=e^h(1+zh')$。$h(0)=0$ を入れると $q'(0)=1$ である。
<!-- solution-end -->

<a id="ex-mir1-15-a02"></a>
#### MIR1-15-A02 商の二次係数
- Level: A

$\omega_0=1+120z+113400z^2+O(z^3)$、$A_1=770z+810225z^2+O(z^3)$ とする。$h=A_1/\omega_0$ を二次まで求めよ。

<!-- solution-start -->
**詳細解答。** $h=h_1z+h_2z^2+O(z^3)$ と置き、$\omega_0h=A_1$ を展開する。一次で $h_1=770$、二次で $h_2+120h_1=810225$。$120\cdot770=92400$ なので $h_2=810225-92400=717825$。従って $h=770z+717825z^2+O(z^3)$。
<!-- solution-end -->

<a id="ex-mir1-15-a03"></a>
#### MIR1-15-A03 指数の二乗項
- Level: A

$h=770z+717825z^2+O(z^3)$ のとき、$q=ze^h$ の三次までを求めよ。$h^2/2$ の寄与を示せ。

<!-- solution-start -->
**詳細解答。** $h^2=770^2z^2+O(z^3)$ だから $e^h=1+h+h^2/2+O(z^3)$。二次係数は $717825+770^2/2=717825+296450=1014275$。$z$ を掛けて $q=z+770z^2+1014275z^3+O(z^4)$。
<!-- solution-end -->

<a id="ex-mir1-15-a04"></a>
#### MIR1-15-A04 逆関数の二次係数
- Level: A

$Q(z)=z+Az^2+O(z^3)$ の逆関数を $Z(q)=q+bq^2+O(q^3)$ と置き、合成恒等式から $b$ を求めよ。

<!-- solution-start -->
**詳細解答。** $Z^2=q^2+O(q^3)$ より $Q(Z)=q+bq^2+Aq^2+O(q^3)$。右辺が $q$ に一致するには $b+A=0$。したがって $b=-A$。$A=770$ の場合は $b=-770$ となる。
<!-- solution-end -->

<a id="ex-mir1-15-a05"></a>
#### MIR1-15-A05 対数解の定数変更
- Level: A

$T$ を $T+c$ に取り替える。新座標 $\widetilde q=e^{T+c}$ が $\widetilde q=z+O(z^2)$ を満たすための $c\in\mathbb C$ の必要十分条件を求めよ。

<!-- solution-start -->
**詳細解答。** $\widetilde q=e^cq$。もとの $q=z+O(z^2)$ から $\widetilde q=e^cz+O(z^2)$。一次係数が1になる条件は $e^c=1$、つまり $c=2\pi ik$（$k\in\mathbb Z$）である。これは局所規格化の条件であり、整数周期基底全体が確定したことを意味しない。
<!-- solution-end -->

### Level B：存在・逆計算・微分の橋渡し

<a id="ex-mir1-15-b01"></a>
#### MIR1-15-B01 規格化と可逆性は同じでない
- Level: B

$h$ は原点で正則、$h(0)=c$ として $Q(z)=ze^{h(z)}$ と置く。原点で逆関数が存在する理由と、逆関数の一次係数を求めよ。特に $c=0$ の場合と比較せよ。

<!-- solution-start -->
**詳細解答。** $Q'(z)=e^h(1+zh')$ なので $Q'(0)=e^c\ne0$。$Q'(0)=e^c$ を複素数として実微分の行列式を計算すると $|e^c|^2>0$。よって実二次元の[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)を適用でき、逆微分行列は複素線形なので正則逆関数 $Z$ がある。合成 $Q(Z(q))=q$ を $q=0$ で微分すると $Q'(0)Z'(0)=1$、従って $Z'(0)=e^{-c}$。$c=0$ のときだけ、ここでの規格化では $Z'(0)=1$ となる。逆関数の存在自体には $c=0$ は不要である。
<!-- solution-end -->

<a id="ex-mir1-15-b02"></a>
#### MIR1-15-B02 逆級数の四次係数
- Level: B

$Q(z)=z+Az^2+Bz^3+Cz^4+O(z^5)$ とし、$Z(q)=q+b_2q^2+b_3q^3+b_4q^4+O(q^5)$ を合成式から求めよ。$A=770$、$B=1014275$、$C=1703916750$ を代入して検算せよ。

<!-- solution-start -->
**詳細解答。** $Z^2=q^2+2b_2q^3+(b_2^2+2b_3)q^4+\cdots$、$Z^3=q^3+3b_2q^4+\cdots$、$Z^4=q^4+\cdots$。$Q(Z)=q$ の二次、三次、四次を零とすることで

$$
b_2=-A,\quad b_3=2A^2-B,\quad b_4=-5A^3+5AB-C
$$

を得る。数値は $b_2=-770$、$b_3=2\cdot592900-1014275=171525$。四次は $b_2^2+2b_3=935950$、$A(935950)=720681500$、$3Bb_2=-2342975250$ より

$$
b_4=-720681500+2342975250-1703916750=-81623000.
$$

各項はそれぞれ $AZ^2$、$BZ^3$、$CZ^4$ の四次寄与に対応する。
<!-- solution-end -->

<a id="ex-mir1-15-b03"></a>
#### MIR1-15-B03 Lagrange反転で四次を再計算
- Level: B

$h(z)=h_1z+h_2z^2+h_3z^3+O(z^4)$、$Q(z)=ze^{h(z)}$ とする。[反転公式](#thm-mir1-15-lagrange-inversion)を使い $[q^4]Z(q)$ を導け。quinticの $h_1=770$、$h_2=717825$、$h_3=3225308000/3$ に代入せよ。

<!-- solution-start -->
**詳細解答。** $[q^4]Z=\tfrac14[z^3]e^{-4h}$。指数を三次まで展開すると $e^{-4h}=1-4h+8h^2-(64/6)h^3+O(z^4)$。ここで $[z^3]h^2=2h_1h_2$、$[z^3]h^3=h_1^3$ だから

$$
[q^4]Z=\frac14(-4h_3+16h_1h_2-\tfrac{64}{6}h_1^3)
=-h_3+4h_1h_2-\tfrac83h_1^3.
$$

数値を代入して

$$
\frac{-3225308000+6632703000-3652264000}{3}=-81623000
$$

となり、[係数比較の結果](#thm-mir1-15-inverse-coefficients)と一致する。
<!-- solution-end -->

<a id="ex-mir1-15-b04"></a>
#### MIR1-15-B04 微分する座標を明確にする
- Level: B

$h(z)=770z+717825z^2+O(z^3)$、$q=ze^{h(z)}$、$t=(\operatorname{Log}z+h(z))/(2\pi i)$ とする。$\theta_z$ を $\theta_q$ で表す係数を二次まで求め、$dz/dt$ を導け。必要な非零条件を示せ。

<!-- solution-start -->
**詳細解答。** $h'(z)=770+2\cdot717825z+O(z^2)$。$f(q(z))$ への連鎖律で

$$
z\frac{d}{dz}f(q(z))
=z\frac{dq}{dz}\frac{df}{dq}
=(1+zh')q\frac{df}{dq}.
$$

従って $\theta_z=(1+770z+1435650z^2+O(z^3))\theta_q$。一方、$dt/dz=(1/z+h')/(2\pi i)=(1+zh')/(2\pi iz)$ なので $dz/dt=2\pi iz/(1+zh')$。$z\ne0$、$1+zh'\ne0$ が必要である。後者は $z=0$ で値1だから十分小さい穿孔円板で満たされる。
<!-- solution-end -->

### Level C：周期・座標・逆級数を一度に

<a id="ex-mir1-15-c01"></a>
#### MIR1-15-C01 quinticの規格化ミラー写像を再構成
- Level: C

$a_d=(5d)!/(d!)^5$、$H_n=\sum_{k=1}^n1/k$、$\omega_0=\sum_{d\ge0}a_dz^d$、$A_1=5\sum_{d\ge1}a_d(H_{5d}-H_d)z^d$ とし、$T=\operatorname{Log}z+A_1/\omega_0$ とする。次を示せ。

1. $\omega_0,A_1$ の三次までと、$h=A_1/\omega_0$ の三次までを導け。
2. $q=e^T$ が原点で局所座標となることと $q(z)$ の四次までを示せ。
3. 逆関数 $Z(q)$ を四次まで求め、Lagrange反転でも四次係数を検算せよ。
4. $t=T/(2\pi i)$ に対する $dz/dt$ を求め、局所計算だけでは未確定な幾何学的情報を一つ述べよ。

<!-- solution-start -->
**詳細解答。**

**(1)** 階乗から $(a_0,a_1,a_2,a_3)=(1,120,113400,168168000)$。調和数の差は $H_5-H_1=77/60$、$H_{10}-H_2=3601/2520$、$H_{15}-H_3=535097/360360$ であるから

$$
A_1=770z+810225z^2+\frac{3745679000}{3}z^3+O(z^4).
$$

$h=h_1z+h_2z^2+h_3z^3+\cdots$ とおき $\omega_0h=A_1$ の一次、二次、三次を比較すると

$$
h_1=770,\quad
h_2=810225-120h_1=717825,
$$

$$
h_3=\frac{3745679000}{3}-120h_2-113400h_1
=\frac{3225308000}{3}.
$$

**(2)** $\omega_0(0)=1$ なので原点近傍で $\omega_0\ne0$。$h$ は正則で $h(0)=0$。一周で $T$ に $2\pi i$ が加わるが $e^T$ は一価となり、$q=ze^h$ と原点へ延長する。$q'(0)=1\ne0$ に局所逆関数定理を適用できる。指数のTaylor式より

$$
q=z+h_1z^2+(h_2+h_1^2/2)z^3
 +(h_3+h_1h_2+h_1^3/6)z^4+O(z^5),
$$

よって $q=z+770z^2+1014275z^3+1703916750z^4+O(z^5)$。

**(3)** $q(z)=z+Az^2+Bz^3+Cz^4+\cdots$、$Z=q+b_2q^2+b_3q^3+b_4q^4+\cdots$ とおく。$q(Z)=q$ を次数ごとに比較すると $b_2=-A$、$b_3=2A^2-B$、$b_4=-5A^3+5AB-C$。数値を入れ

$$
Z(q)=q-770q^2+171525q^3-81623000q^4+O(q^5).
$$

また[反転公式](#thm-mir1-15-lagrange-inversion)では $[q^4]Z=\tfrac14[z^3]e^{-4h}=-h_3+4h_1h_2-(8/3)h_1^3=-81623000$ となり一致する。

**(4)** $dt/dz=(1+zh')/(2\pi iz)$ なので $z\ne0$、$1+zh'\ne0$ の範囲で $dz/dt=2\pi iz/(1+zh')$。[整数周期格子の接続行列](../MIR1-14/index.md#def-mir1-14-integral-period-lattice)と局所Frobenius基底の関係はこの係数計算から決まらない。ましてA側のGW数値との同一視をこの計算だけから主張できない。
<!-- solution-end -->

## 8. 次講へ

本講では **対数周期比 → 一価な指数座標 → 正方向の係数 → 解析的逆関数 → Lagrange反転 → 微分変換** を一つの計算でつないだ。$q(z)$ の二次係数は $770$、逆写像の二次係数は $-770$ だが、高次係数は単純な符号変更ではない。

次の **MIR1-16「B側Yukawa結合と周期の統合」**では、ここで確定した $z\leftrightarrow q$ と $dz/dt$ を用いて三次結合の座標表示・規格化を調べる。曲線本数やA側の不変量との比較は、そのための理論的入力を明示した後に行う。

**参考文献**：[Cox–Katz, *Mirror Symmetry and Algebraic Geometry*](https://doi.org/10.1090/surv/068)、[Horiほか, *Mirror Symmetry*](https://www.claymath.org/resource/mirror-symmetry/)、[Candelasほか（1991）](https://www.staff.science.uu.nl/~beuke106/HypergeometricFunctions/COGP.pdf)。主要な係数・反転・微分の計算は本文で示した。
