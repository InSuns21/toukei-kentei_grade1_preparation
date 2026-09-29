# F0-00P2 密度・Radon–Nikodym：確率質量関数と確率密度関数を同じ式で読む

<!-- definition-example-audit: strict -->

[P1](../F0_00P1_確率空間_確率変数_分布/index.md) で、確率変数の分布を値空間上の確率測度として作りました。この章では、確率質量関数と確率密度関数を**基準測度に対する密度**として統一します。

---

## 1. 絶対連続性：零集合を新しく作らない

[P1](../F0_00P1_確率空間_確率変数_分布/index.md) では、ある分布がLebesgue測度に対する積分で表せる場合を「確率密度関数を持つ」と見ました。では、基準測度 $\mu$ に対して別の測度 $\nu$ を

$$
\nu(A)=\int_A f\,d\mu
$$

と表したいとき、最低限どんな条件が必要でしょうか。

もし $\mu(A)=0$ なら、どんな非負可測関数 $f$ を使っても右辺は $0$ です。したがって、この表示が可能なら必ず $\nu(A)=0$ でなければなりません。**基準測度が零とみなす集合へ、$\nu$ だけが新しい質量を置かないこと**を切り出した条件が絶対連続性です。

<a id="def-f0-00p2-absolute-continuity"></a>

<!-- formal-statement-start -->
> **定義（測度の絶対連続性）**  
> 同じ可測空間 $(\Omega,\mathcal F)$ 上の非負測度 $\mu,\nu$ について、任意の $A\in\mathcal F$ に対して

$$
\mu(A)=0\Longrightarrow\nu(A)=0
$$

> が成り立つとき、$\nu$ は $\mu$ に関して絶対連続であるといい、$\nu\ll\mu$ と書きます。
<!-- formal-statement-end -->

### 1.1 例：密度 $2x$ から作った測度

$[0,1]$ 上のLebesgue測度を $\lambda$ とし

$$
\nu(A):=\int_A2x\,d\lambda(x)
$$

とします。

<!-- definition-example-start: def-f0-00p2-absolute-continuity -->
**定義の確認**

$\lambda(A)=0$ なら測度0の集合上の積分は0なので $\nu(A)=0$ です。従って $\nu\ll\lambda$ です。
<!-- definition-example-end -->

一方、Dirac測度 $\delta_0$ では

$$
\lambda(\{0\})=0,
\qquad
\delta_0(\{0\})=1,
$$

したがって $\delta_0\not\ll\lambda$ です。

---

## 2. 基準測度に対する密度

絶対連続性は、密度表示が存在するために必要な条件を与えました。次に欲しいのは、集合ごとの値 $\nu(A)$ を毎回別々に扱うのではなく、**一つの関数 $f$ を積分すれば全ての $\nu(A)$ を復元できる表現**です。

この $f$ は、基準測度 $\mu$ に対して $\nu$ がどこにどれだけ質量を置くかを記録します。この役割を持つ関数を次で定義します。

<a id="def-f0-00p2-rn-density"></a>

<!-- formal-statement-start -->
> **定義（Radon--Nikodym微分）**  
> 同じ可測空間 $(\Omega,\mathcal F)$ 上の非負測度 $\mu,\nu$ に対し、非負可測関数 $f$ が

$$
\nu(A)=\int_Af\,d\mu
\qquad(\forall A\in\mathcal F)
$$

> を満たすとき、$f$ を $\nu$ の $\mu$ に関するRadon--Nikodym微分と呼び、$f=d\nu/d\mu$ と書きます。
<!-- formal-statement-end -->

### 2.1 例：先ほどの測度

<!-- definition-example-start: def-f0-00p2-rn-density -->
**定義の確認**

$f(x)=2x$ は非負Borel可測で、任意の可測集合 $A$ に対して

$$
\int_Af\,d\lambda
=\int_A2x\,d\lambda
=\nu(A).
$$

従って

$$
\frac{d\nu}{d\lambda}(x)=2x.
$$
<!-- definition-example-end -->

密度は、測度だけでなく「何を基準測度にしたか」に依存します。

---

## 3. 準備：Hilbert空間から表現を作る

Radon--Nikodym微分の存在を示したいのですが、測度 $\nu$ と $\mu$ は点ごとの値を持つ関数ではないので、単純に「$\nu/\mu$ を割り算する」ことはできません。そこで有限測度の場合には、関数 $g$ を入力すると $\int g\,d\nu$ を返す写像を考え、これをHilbert空間 $L^2$ 上の線形汎関数として扱います。

[Hilbert射影定理](../F0_02C1A_Hilbert射影定理_直交分解/index.md#thm-hilbert-projection)を使えば、その線形汎関数を「ある $h$ との内積」として表せます。すると、測度の問題を関数 $h$ の問題へ移せます。その橋渡しが次の補題です。

<a id="lem-f0-00p2-l2-representation"></a>

<!-- formal-statement-start -->
> **補題（L^2表現補題）**  
> 有限測度空間 $(\Omega,\mathcal F,\rho)$ 上で、$T:L^2(\rho)\to\mathbb R$ を連続線形汎関数とします。このとき、ある $h\in L^2(\rho)$ が存在して

$$
T(g)=\int gh\,d\rho
\qquad(\forall g\in L^2(\rho))
$$

> と書けます。$h$ は $\rho$-a.e. の意味で一意です。
<!-- formal-statement-end -->

### 証明の見取り図

$T$ の核 $M=\ker T$ は閉部分空間です。$T$ が消えない方向を一つ取り、そのベクトルを $M$ と直交する成分 $u$ へ射影します。すると、任意の $g$ から適切な倍数 $\alpha u$ を引けば $M$ に入るため、$g$ の「$T$ に見える成分」は $u$ の方向だけで決まります。直交性を使ってその係数 $\alpha$ を内積から計算すると、$T(g)=\langle g,h\rangle$ の形が得られます。

<!-- proof-start -->
### 証明

$T=0$ なら $h=0$ でよいので、$T\ne0$ とします。

$$
M:=\ker T
$$

と置きます。$T$ は連続なので $M$ は $L^2(\rho)$ の閉線形部分空間です。$T(y)\ne0$ となる $y\in L^2(\rho)$ を一つ取ります。

[Hilbert射影定理](../F0_02C1A_Hilbert射影定理_直交分解/index.md#thm-hilbert-projection)により、

$$
u:=y-P_My$$

と置けば

$$
u\in M^\perp,
\qquad
y=P_My+u.
$$

$y\notin M$ なので $u\ne0$ です。また $P_My\in M$ なので

$$
T(u)=T(y)-T(P_My)=T(y)\ne0.
$$

任意の $g\in L^2(\rho)$ に対して

$$
\alpha:=\frac{T(g)}{T(u)}
$$

と置くと $T(g-\alpha u)=0$ なので $g-\alpha u\in M$ です。$u\perp M$ より

$$
0=\langle u,g-\alpha u\rangle
=\int ug\,d\rho-\alpha\|u\|_2^2.
$$

従って

$$
\alpha=\frac{\int ug\,d\rho}{\|u\|_2^2}.
$$

したがって

$$
T(g)
=\frac{T(u)}{\|u\|_2^2}\int ug\,d\rho
=\int gh\,d\rho,
$$

ただし

$$
h:=\frac{T(u)}{\|u\|_2^2}u.
$$

もし $h_1,h_2$ が同じ表示を与えるなら

$$
\int g(h_1-h_2)\,d\rho=0
\qquad(\forall g\in L^2(\rho)).
$$

$g=h_1-h_2$ と取れば $\|h_1-h_2\|_2^2=0$ なので、$h_1=h_2$ が $\rho$-a.e. で成り立ちます。
<!-- proof-end -->

---

## 4. Radon--Nikodym定理

ここまでで、密度表示があるなら $\nu\ll\mu$ が必要であることを確認しました。次の定理は、$\sigma$ 有限という標準的な有限化条件の下では、**この必要条件がそのまま十分条件になる**ことを述べます。

証明ではまず有限測度の場合を扱います。$\rho:=\mu+\nu$ を共通の基準測度にし、前節の $L^2$ 表現で $\nu$ を

$$
\nu(A)=\int_A h\,d\rho
$$

と書きます。同時に $\mu(A)=\int_A(1-h)\,d\rho$ となるので、$\rho$ に対する二つの密度 $h$ と $1-h$ の比から、求める $\mu$ に対する密度 $h/(1-h)$ を作れます。$\sigma$ 有限の場合は、空間を有限測度の部分へ分割してこの構成を貼り合わせます。

<a id="thm-f0-00p2-radon-nikodym"></a>

<!-- formal-statement-start -->
> **定理（Radon--Nikodym定理）**  
> $(\Omega,\mathcal F)$ 上の $\sigma$ 有限な非負測度 $\mu,\nu$ が $\nu\ll\mu$ を満たすとします。このとき非負可測関数 $f$ が存在し、任意の $A\in\mathcal F$ に対して

$$
\nu(A)=\int_Af\,d\mu
$$

> が成り立ちます。さらに $f$ は $\mu$-a.e. の意味で一意です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 4.1 証明：有限測度の場合

まず

$$
\mu(\Omega)<\infty,
\qquad
\nu(\Omega)<\infty
$$

とします。二つの測度を同時に支配する有限測度として

$$
\rho:=\mu+\nu
$$

を置き、$g\in L^2(\rho)$ に対して

$$
T(g):=\int g\,d\nu
$$

と定めます。

$L^2(\rho)$ では、$\rho$-a.e. 等しい関数を同じ元として扱います。そこでまず、代表関数を取り替えても $T$ の値が変わらないことを確認します。$g_1=g_2$ が $\rho$-a.e. 成り立つなら

$$
\rho(\{g_1\ne g_2\})=0.
$$

$\nu\le\rho$ なので

$$
\nu(\{g_1\ne g_2\})=0
$$

でもあり、$g_1=g_2$ が $\nu$-a.e. 成り立ちます。従って $\int g_1\,d\nu=\int g_2\,d\nu$ で、$T(g)$ は代表元の選び方に依存しません。

次に、この積分が有限で $T$ が連続であることを確認します。$\nu\le\rho$ なので

$$
\int g^2\,d\nu
\le
\int g^2\,d\rho
<\infty.
$$

さらに $\nu(\Omega)<\infty$ ですから、[Cauchy--Schwarzの不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)を $|g|$ と定数関数 $1$ に適用して

$$
\begin{aligned}
\int |g|\,d\nu
&\le
\left(\int g^2\,d\nu\right)^{1/2}
\left(\int 1^2\,d\nu\right)^{1/2}\\
&=
\left(\int g^2\,d\nu\right)^{1/2}\nu(\Omega)^{1/2}\\
&\le
\nu(\Omega)^{1/2}\|g\|_{L^2(\rho)}
<\infty.
\end{aligned}
$$

従って $T(g)$ は有限値として定義でき、積分の線形性から $T$ は線形です。また同じ評価から

$$
|T(g)|
\le
\nu(\Omega)^{1/2}\|g\|_{L^2(\rho)}
$$

なので $T$ は連続です。

[L^2表現補題](#lem-f0-00p2-l2-representation)をこの $T$ に適用すると、ある $h\in L^2(\rho)$ が存在して

$$
T(g)=\int gh\,d\rho
\qquad
(\forall g\in L^2(\rho))
$$

となります。$\rho(\Omega)<\infty$ なので、任意の $A\in\mathcal F$ について $\boldsymbol{1}_A\in L^2(\rho)$ です。ここで $g=\boldsymbol{1}_A$ を代入すると

$$
\nu(A)
=T(\boldsymbol{1}_A)
=\int \boldsymbol{1}_Ah\,d\rho
=\int_Ah\,d\rho.
$$

次に $h$ の値域を確認します。$B:=\{h<0\}$ が正の $\rho$-測度を持つとします。すると

$$
B=\bigcup_{m=1}^{\infty}\{h\le-1/m\}
$$

なので、ある $m$ について

$$
B_m:=\{h\le-1/m\}
$$

が $\rho(B_m)>0$ を満たします。しかし

$$
\nu(B_m)
=\int_{B_m}h\,d\rho
\le
-\frac1m\rho(B_m)
<0,
$$

となり、$\nu$ が非負測度であることに反します。従って $h\ge0$ が $\rho$-a.e. 成り立ちます。

また、任意の $A\in\mathcal F$ について

$$
\begin{aligned}
\mu(A)
&=\rho(A)-\nu(A)\\
&=\int_A1\,d\rho-\int_Ah\,d\rho\\
&=\int_A(1-h)\,d\rho.
\end{aligned}
$$

もし $C:=\{h>1\}$ が正の $\rho$-測度を持てば、同様にある $m$ について

$$
C_m:=\{h\ge1+1/m\}
$$

が正の $\rho$-測度を持ち、

$$
\mu(C_m)
=\int_{C_m}(1-h)\,d\rho
\le
-\frac1m\rho(C_m)
<0
$$

となって矛盾します。従って $0\le h\le1$ が $\rho$-a.e. 成り立ちます。

$h$ は $L^2(\rho)$ の元として得られているので、$\rho$-零集合上で代表関数の値を変えても、これまでの積分表示は変わりません。そこで例外的な零集合上では $h:=0$ と取り直し、以下では

$$
0\le h\le1
$$

が全ての点で成り立つ代表元を使います。

ここで

$$
D:=\{h=1\}
$$

と置きます。上で得た $\mu$ の表示から

$$
\mu(D)=\int_D(1-h)\,d\rho=0.
$$

仮定 $\nu\ll\mu$ を集合 $D$ に適用すると $\nu(D)=0$ でもあるので

$$
\rho(D)=\mu(D)+\nu(D)=0.
$$

$D^c$ では $1-h>0$ ですから

$$
f:=\frac{h}{1-h}
$$

と置き、$D$ 上では $f:=0$ と定めます。$h$ は可測なので $f$ も非負可測です。

残る仕事は、$\mu$ に関する積分を $\rho$ に関する積分へ移すことです。まず非負単関数

$$
\varphi=\sum_{j=1}^m a_j\boldsymbol{1}_{A_j},
\qquad
a_j\ge0
$$

について、先ほどの集合ごとの表示を使うと

$$
\begin{aligned}
\int\varphi\,d\mu
&=\sum_{j=1}^m a_j\mu(A_j)\\
&=\sum_{j=1}^m a_j\int_{A_j}(1-h)\,d\rho\\
&=\int\varphi(1-h)\,d\rho.
\end{aligned}
$$

一般の非負可測関数 $\varphi$ については、非負単関数列 $\varphi_n\uparrow\varphi$ を取ります。[単調収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange)を $\mu$ と $\rho$ の両方に適用して

$$
\begin{aligned}
\int\varphi\,d\mu
&=\lim_{n\to\infty}\int\varphi_n\,d\mu\\
&=\lim_{n\to\infty}\int\varphi_n(1-h)\,d\rho\\
&=\int\varphi(1-h)\,d\rho.
\end{aligned}
$$

ここで任意の $A\in\mathcal F$ に対し

$$
\varphi=f\boldsymbol{1}_A
$$

を代入します。$D^c$ では $f(1-h)=h$、また $\rho(D)=0$ なので

$$
\begin{aligned}
\int_Af\,d\mu
&=\int_Af(1-h)\,d\rho\\
&=\int_{A\cap D^c}h\,d\rho\\
&=\int_Ah\,d\rho\\
&=\nu(A).
\end{aligned}
$$

これで有限測度の場合が示されました。

### 4.2 証明：$\sigma$ 有限の場合

$\mu$ の $\sigma$ 有限性から

$$
\Omega=\bigcup_{i=1}^{\infty}E_i,
\qquad
\mu(E_i)<\infty,
$$

となる可測集合列 $(E_i)$ を取れます。同様に $\nu$ について

$$
\Omega=\bigcup_{j=1}^{\infty}F_j,
\qquad
\nu(F_j)<\infty
$$

となる $(F_j)$ を取ります。

全ての交差 $E_i\cap F_j$ は可算個なので、一列

$$
C_1,C_2,\ldots
$$

に並べられます。各 $C_k$ では $\mu(C_k)<\infty$ かつ $\nu(C_k)<\infty$ です。重なりを除くため

$$
D_1:=C_1,
\qquad
D_k:=C_k\setminus\bigcup_{j<k}C_j
\quad(k\ge2)
$$

と置きます。すると $D_k$ は互いに素で $\Omega$ を覆い、$D_k\subseteq C_k$ なので

$$
\mu(D_k)<\infty,
\qquad
\nu(D_k)<\infty.
$$

各 $D_k$ へ制限した測度を

$$
\mu_k(A):=\mu(A\cap D_k),
\qquad
\nu_k(A):=\nu(A\cap D_k)
$$

と定めます。$\mu_k(A)=0$ なら $\mu(A\cap D_k)=0$ なので、仮定 $\nu\ll\mu$ から

$$
\nu(A\cap D_k)=0.
$$

従って $\nu_k\ll\mu_k$ です。

有限測度版を $(\mu_k,\nu_k)$ に適用すると、非負可測関数 $f_k$ が存在して

$$
\nu(A\cap D_k)
=
\int_{A\cap D_k}f_k\,d\mu
$$

となります。そこで

$$
f:=\sum_{k=1}^{\infty}f_k\boldsymbol{1}_{D_k}
$$

と定めます。$D_k$ は互いに素なので、各点では高々一つの項だけが非零です。有限段階の近似

$$
f^{(N)}
:=
\sum_{k=1}^{N}f_k\boldsymbol{1}_{D_k}
$$

は $f^{(N)}\uparrow f$ を満たすため、[単調収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange)から

$$
\begin{aligned}
\int_Af\,d\mu
&=\lim_{N\to\infty}\sum_{k=1}^{N}\int_{A\cap D_k}f_k\,d\mu\\
&=\lim_{N\to\infty}\sum_{k=1}^{N}\nu(A\cap D_k)\\
&=\nu\left(A\cap\bigcup_{k=1}^{\infty}D_k\right)\\
&=\nu(A).
\end{aligned}
$$

最後から2行目では、互いに素な集合 $A\cap D_k$ に対する $\nu$ の可算加法性を使いました。

### 4.3 証明：一意性

$f,g$ がともにRadon--Nikodym微分だとします。上の $\sigma$ 有限分割 $(D_k)$ を使います。各 $D_k$ について

$$
\int_{D_k}f\,d\mu
=
\nu(D_k)
<\infty,
\qquad
\int_{D_k}g\,d\mu
=
\nu(D_k)
<\infty
$$

なので、$f,g$ は $D_k$ 上で $\mu$-a.e. 有限です。

$$
H:=D_k\cap\{f>g\}
$$

が正の $\mu$-測度を持つと仮定します。$f,g$ が有限な点で $f>g$ なら差 $f-g$ は正なので、十分大きい $n$ を選べば $f-g\ge1/n$ となります。従って零集合を除けば

$$
H=
\bigcup_{n=1}^{\infty}
\left(D_k\cap\{f\ge g+1/n\}\right).
$$

可算和の測度が正なら少なくとも一つの項が正の測度を持つので、ある $n$ について

$$
H_n:=D_k\cap\{f\ge g+1/n\}
$$

が $\mu(H_n)>0$ を満たします。しかし

$$
\begin{aligned}
\nu(H_n)
=\int_{H_n}f\,d\mu
&\ge\int_{H_n}g\,d\mu+\frac1n\mu(H_n)\\
&=\nu(H_n)+\frac1n\mu(H_n)\\
&>\nu(H_n),
\end{aligned}
$$

となり矛盾です。従って $f\le g$ a.e.。役割を交換すれば $g\le f$ a.e.なので $f=g$ a.e.です。
<!-- proof-end -->

---

## 5. 確率密度関数と確率質量関数

Lebesgue測度を $\lambda$ とすると、$P_X\ll\lambda$ のとき

$$
f_X:=\frac{dP_X}{d\lambda}
$$

が確率密度関数で

$$
P(X\in A)=\int_Af_X(x)\,dx.
$$

可算集合 $S$ 上の数え上げ測度を $\#$ とすれば、任意の $S$ 上の確率分布は $P_X\ll\#$ であり

$$
\frac{dP_X}{d\#}(x)=P(X=x).
$$

したがって確率質量関数も同じ枠組みの密度です。

---

## 6. 支配測度

一つの分布だけなら、その分布に合わせて基準測度を選べます。しかし、母数 $\theta$ によって分布 $P_\theta$ が変わる族を同時に扱うとき、分布ごとに別の基準測度を使うと密度を同じ土俵で比較できません。

そこで、**族の全ての分布が密度を持てる共通の基準測度**を一つ選びます。その役割を持つ測度を次で定義します。

<a id="def-f0-00p2-dominating-measure"></a>

<!-- formal-statement-start -->
> **定義（支配測度）**  
> 同じ可測空間上の確率測度族 $\{P_\theta:\theta\in\Theta\}$ に対し、測度 $\mu$ が

$$
P_\theta\ll\mu
\qquad(\forall\theta\in\Theta)
$$

> を満たすとき、$\mu$ をこの確率測度族の**支配測度**と呼びます。
<!-- formal-statement-end -->

### 6.1 例：Bernoulliモデル

<!-- definition-example-start: def-f0-00p2-dominating-measure -->
**定義の確認**

$\{0,1\}$ 上の数え上げ測度 $\#$ について $\#(A)=0$ なら $A=\varnothing$ です。従って任意のBernoulli分布 $P_p$ について $P_p(A)=0$。よって

$$
P_p\ll\#
\qquad(\forall p\in[0,1]).
$$

従って $\#$ はBernoulliモデルの支配測度です。
<!-- definition-example-end -->

---

## 演習

### F0-00P2-A01 Bernoulli分布を数え上げ測度で書く
- Level: A
- 目安時間: 10分

$P(X=1)=p$, $P(X=0)=1-p$ とする。数え上げ測度 $\#$ に対する $P_X$ の密度を求めよ。

<!-- solution-start -->
#### 詳細解答
$f(0)=1-p$, $f(1)=p$ と置けば

$$
\int_Af\,d\#=\sum_{x\in A}f(x)=P_X(A).
$$

従って $dP_X/d\#(x)=p^x(1-p)^{1-x}$ です。
<!-- solution-end -->

### F0-00P2-A02 絶対連続性を確認する
- Level: A
- 目安時間: 10分

$[0,1]$ 上で $\nu(A)=\int_A3x^2\,dx$ とする。$\nu\ll\lambda$ を示し、$d\nu/d\lambda$ を求めよ。

<!-- solution-start -->
#### 詳細解答
$\lambda(A)=0$ なら $\nu(A)=0$ なので $\nu\ll\lambda$ です。また

$$
\frac{d\nu}{d\lambda}(x)=3x^2.
$$
<!-- solution-end -->

### F0-00P2-A03 Dirac測度の絶対連続性
- Level: A
- 目安時間: 10分

$\delta_a\not\ll\lambda$ を示せ。

<!-- solution-start -->
#### 詳細解答
$A=\{a\}$ なら $\lambda(A)=0$ ですが $\delta_a(A)=1$ なので、絶対連続性の定義を満たしません。
<!-- solution-end -->

### F0-00P2-A04 重み付き数え上げ測度
- Level: A
- 目安時間: 10分

有限集合 $S$ 上で $\nu(\{x\})=w_x>0$ とする。$P_X(\{x\})=p_x$ のとき $dP_X/d\nu$ を求めよ。

<!-- solution-start -->
#### 詳細解答
一点集合で $p_x=f(x)w_x$ なので

$$
f(x)=\frac{p_x}{w_x}.
$$

さらに $\int_Af\,d\nu=\sum_{x\in A}p_x=P_X(A)$ です。
<!-- solution-end -->

### F0-00P2-B01 Bernoulli族の支配測度
- Level: B
- 目安時間: 15分

数え上げ測度 $\#$ がBernoulli族 $\{P_p:0\le p\le1\}$ を支配することを示し、$dP_p/d\#$ を求めよ。

<!-- solution-start -->
#### 詳細解答
$\#(A)=0$ なら $A=\varnothing$ なので全ての $p$ で $P_p(A)=0$。従って $P_p\ll\#$ です。また

$$
\frac{dP_p}{d\#}(0)=1-p,
\qquad
\frac{dP_p}{d\#}(1)=p.
$$
<!-- solution-end -->

### F0-00P2-B02 点質量と連続部分を同時に支配する
- Level: B
- 目安時間: 15分

$0<p<1$ とし $P=p\delta_0+(1-p)N(0,1)$、$\mu:=\delta_0+\lambda$ とする。標準正規密度を $\varphi$ として、$P\ll\mu$ を示し $dP/d\mu$ を求めよ。

<!-- solution-start -->
#### 詳細解答
$\mu(A)=0$ なら $\delta_0(A)=0$ かつ $\lambda(A)=0$ なので $P(A)=0$。従って $P\ll\mu$ です。

$$
f(x):=p\boldsymbol{1}_{\{0\}}(x)+(1-p)\varphi(x)\boldsymbol{1}_{\mathbb R\setminus\{0\}}(x)
$$

と置けば $\int_Af\,d\mu=P(A)$ なので $f=dP/d\mu$ です。
<!-- solution-end -->

### F0-00P2-B03 一意性を証明する
- Level: B
- 目安時間: 15分

有限測度 $\nu$ に対して $\nu(A)=\int_Af\,d\mu=\int_Ag\,d\mu$ が全ての可測集合 $A$ で成り立つとする。$f,g\ge0$ とし、$f=g$ が $\mu$-a.e. 成り立つことを示せ。

<!-- solution-start -->
#### 詳細解答
$H:=\{f>g\}$ とします。a.e.有限性から

$$
H=\bigcup_{n=1}^{\infty}\{f\ge g+1/n\}
$$

がa.e.の意味で成り立ちます。$\mu(H)>0$ なら、ある $n$ で $H_n:=\{f\ge g+1/n\}$ が正の測度を持ち

$$
\nu(H_n)=\int_{H_n}f\,d\mu
\ge\int_{H_n}g\,d\mu+\frac1n\mu(H_n)
>\nu(H_n),
$$

となり矛盾です。従って $f\le g$ a.e.。逆も同様なので $f=g$ a.e.です。
<!-- solution-end -->

### F0-00P2-C01 基準測度を変えて同じ分布を表す
- Level: C
- 目安時間: 25分

実数上で

$$
\mu(A)=\int_A\frac1{1+x^2}\,dx,
\qquad
\nu(A)=\int_Ace^{-x^2}\,dx
$$

とする。ただし $c>0$ は $\nu(\mathbb R)=1$ となる正規化定数である。

1. $\nu\ll\mu$ を示せ。
2. $d\nu/d\mu$ を求めよ。
3. 定義式を確認せよ。
4. 基準測度を変えると密度が変わっても、確率測度は変わらない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答
**1.** $\mu(A)=0$ とします。$A_m:=A\cap[-m,m]$ 上では $(1+x^2)^{-1}\ge(1+m^2)^{-1}$ なので

$$
0=\mu(A_m)\ge\frac1{1+m^2}\lambda(A_m).
$$

従って $\lambda(A_m)=0$。$A=\bigcup_mA_m$ なので $\lambda(A)=0$、よって $\nu(A)=0$ です。

**2.**

$$
\frac{d\nu}{d\mu}(x)=ce^{-x^2}(1+x^2).
$$

**3.**

$$
\int_A\frac{d\nu}{d\mu}\,d\mu
=\int_Ace^{-x^2}\,dx
=\nu(A).
$$

**4.** 基準測度を変えると密度は変わりますが、任意の可測集合 $A$ に対して復元される値は同じ $\nu(A)$ です。密度は表現、分布は測度そのものです。
<!-- solution-end -->

---

## 次に進む

基準測度に対する密度を理解したら、[F0-00P2A 期待値・LOTUS](../F0_00P2A_期待値_LOTUS/index.md) で、期待値を分布上の積分へ移します。