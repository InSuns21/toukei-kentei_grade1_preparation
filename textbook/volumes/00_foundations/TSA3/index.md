# TSA3 Encore IV 時系列解析 III：二次定常過程の周波数領域表現

<!-- definition-example-audit: strict -->

TSA1 では、二次定常過程の [自己共分散関数](../TSA1/index.md#def-tsa1-autocovariance) が [正定値性](../TSA1/index.md#prop-tsa1-covariance-kernel)を持つことを、有限線形結合の分散から示しました。本章では、この二次形式の非負性を出発点に、自己共分散列を周波数ごとの有限測度へ移し、最後には過程そのものを周波数成分の直交積分として表します。

章の流れは、まず自己共分散列が満たす二次形式条件を独立に定義し、その条件から周波数側の有限測度を構成します。次に、その測度が関数密度を持つ場合と原子を持つ場合を比較し、最後に周波数側の $L^2$ 空間と過程が生成する閉線形空間を等長に対応させます。

周波数は端点を同一視した円周

$$
\mathbb T:=\mathbb R/(2\pi\mathbb Z)
$$

上で扱い、積分表示では代表区間 $[-\pi,\pi)$ を使います。測度構成では [MT5 の Riesz--Markov 正汎関数版](../MT5/index.md#thm-mt5-riesz-markov-positive)、一意性と $L^2(F)$ の稠密性では [FOU2 の三角多項式の一様稠密性](../FOU2/index.md#thm-fou2-trigonometric-density)、密度の存在条件では [Radon--Nikodym 定理](../F0_00P2_密度_期待値_Radon_Nikodym/index.md#thm-f0-00p2-radon-nikodym)を正本として使います。

TSA2 の時間領域での分解とは補完関係にありますが、本章の周波数領域の構成では TSA2 の分解定理を証明入力にはしません。時間領域と周波数領域を循環依存にしないためです。

---

## 1. 自己共分散列が満たす二次形式条件

平均0の実二次定常過程 $(X_t)$ なら、TSA1 の [自己共分散関数](../TSA1/index.md#def-tsa1-autocovariance)は

$$
\gamma(h)=E[X_{t+h}X_t]
$$

です。

<a id="def-tsa3-positive-definite"></a>

<!-- formal-statement-start -->
> **定義（正定値列）**  
> 列 $\gamma:\mathbb Z\to\mathbb C$ が正定値であるとは、任意の整数 $t_1,\dots,t_m$ と複素数 $c_1,\dots,c_m$ に対して

$$
\boxed{
\sum_{j,k=1}^m
c_j\overline{c_k}\gamma(t_j-t_k)\ge0
}
$$

> が成り立つことです。
<!-- formal-statement-end -->

### 1.1 例：弱ホワイトノイズの自己共分散

分散 $\sigma^2$ の弱ホワイトノイズでは

$$
\gamma(h)=\sigma^2\mathbf1_{\{h=0\}}.
$$

<!-- definition-example-start: def-tsa3-positive-definite -->
**定義の確認**  
同じ時刻を持つ添字をまとめると

$$
\sum_{j,k}c_j\overline{c_k}\gamma(t_j-t_k)
=
\sigma^2\sum_{r\in\mathbb Z}
\left|
\sum_{j:t_j=r}c_j
\right|^2
\ge0.
$$

従って定義の不等式を任意の $(t_j,c_j)$ について満たし、弱ホワイトノイズの自己共分散列は正定値です。
<!-- definition-example-end -->

TSA1 で証明した [自己共分散関数の正定値性](../TSA1/index.md#prop-tsa1-covariance-kernel)を、ここでは複素係数まで含む形で確認すると

$$
\begin{aligned}
\sum_{j,k}c_j\overline{c_k}\gamma(t_j-t_k)
&=E\left[
\left(\sum_jc_jX_{t_j}\right)
\overline{\left(\sum_kc_kX_{t_k}\right)}
\right]\\
&=E\left|\sum_jc_jX_{t_j}\right|^2\ge0.
\end{aligned}
$$

したがって自己共分散列には「正定値」という強い制約があります。

---

## 2. 二次形式条件から従う基本性質

<a id="lem-tsa3-pd-basic"></a>

<!-- formal-statement-start -->
> **補題（正定値列の Hermite 対称性と有界性）**  
> $\gamma$ が正定値なら

$$
\gamma(0)\ge0,
\qquad
\gamma(-h)=\overline{\gamma(h)},
\qquad
|\gamma(h)|\le\gamma(0)
$$

> が全ての $h\in\mathbb Z$ で成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$t_1=0$、係数 $c_1=1$ だけを取れば $\gamma(0)\ge0$ です。

次に時刻 $0,h$ を取ると、正定値性は任意の $z\in\mathbb C$ に対して

$$
\gamma(0)+z\gamma(h)+\overline z\gamma(-h)+|z|^2\gamma(0)\ge0
$$

を要求します。左辺は実数でなければならないので、$z=1,i$ を代入すれば

$$
\gamma(-h)=\overline{\gamma(h)}
$$

が従います。

次に $t_1=0,t_2=h$、係数 $c_1=1,c_2=z$ を取ります。すでに示した共役対称性を使うと、正定値性から全ての $z\in\mathbb C$ に対して

$$
\gamma(0)(1+|z|^2)
+
2\operatorname{Re}\{z\gamma(h)\}
\ge0.
$$

$\gamma(0)=0$ なら $z=-\overline{\gamma(h)}$ と取ることで $-2|\gamma(h)|^2\ge0$ となり、$\gamma(h)=0$ です。

$\gamma(0)>0$ なら

$$
z=-\frac{\overline{\gamma(h)}}{\gamma(0)}
$$

と取ると

$$
0
\le
\gamma(0)-\frac{|\gamma(h)|^2}{\gamma(0)}.
$$

従って

$$
|\gamma(h)|\le\gamma(0).
$$

$\square$
<!-- proof-end -->

特に $\gamma(0)=0$ なら全ての $h$ で $\gamma(h)=0$ です。

---

## 3. 周波数測度を構成する中心定理

<a id="thm-tsa3-herglotz"></a>

<!-- formal-statement-start -->
> **定理（Herglotz の定理）**  
> 列 $\gamma:\mathbb Z\to\mathbb C$ が正定値であることと、円周 $\mathbb T$ 上の有限非負 Borel 測度 $F$ が一意に存在して

$$
\boxed{
\gamma(h)
=
\int_{\mathbb T}e^{ih\lambda}\,F(d\lambda)
\qquad(h\in\mathbb Z)
}
$$

> と表せることは同値です。さらに

$$
F(\mathbb T)=\gamma(0).
$$

> $\gamma$ が実数値かつ偶関数なら $F$ は $\lambda\mapsto-\lambda$ に関して対称です。
<!-- formal-statement-end -->

### 証明の見取り図

逆向きは、測度表示を二次形式へ代入すると絶対値二乗の積分になります。順向きは、正定値性から非負な近似密度 $f_n$ を作り、同じ質量を持つ有限測度列から弱収束部分列を抜き、その Fourier 係数を極限へ送ります。最後に三角多項式の一様稠密性で表現測度の一意性を示します。

存在証明の核は「正定値性から最初から非負な近似密度を作る」ことです。

### 3.1 逆向き：測度表示があれば正定値

<!-- proof-start -->
### 証明：測度表示から正定値性

有限非負測度 $F$ が上の表示を満たすとします。任意の $t_j,c_j$ に対して

$$
\begin{aligned}
\sum_{j,k}c_j\overline{c_k}\gamma(t_j-t_k)
&=
\int_{\mathbb T}
\sum_{j,k}c_j\overline{c_k}e^{i(t_j-t_k)\lambda}
\,F(d\lambda)\\
&=
\int_{\mathbb T}
\left|
\sum_jc_je^{it_j\lambda}
\right|^2
F(d\lambda)\\
&\ge0.
\end{aligned}
$$

従って $\gamma$ は正定値です。また $h=0$ を代入すれば $F(\mathbb T)=\gamma(0)$ です。
<!-- proof-end -->

### 3.2 存在の準備：Fejér型の非負近似密度

$\gamma$ を正定値とし、$n\ge1$ に対して

$$
\boxed{
f_n(\lambda)
:=
\frac1{2\pi n}
\sum_{j,k=0}^{n-1}
\gamma(j-k)e^{-i(j-k)\lambda}
}
$$

と置きます。

<a id="lem-tsa3-fejer-positive"></a>

<!-- formal-statement-start -->
> **補題（Herglotz 近似密度）**  
> 各 $n$ について $f_n(\lambda)\ge0$ であり、測度

$$
F_n(d\lambda):=f_n(\lambda)d\lambda
$$

> は

$$
F_n(\mathbb T)=\gamma(0)
$$

> を満たします。さらに固定した $h\in\mathbb Z$ に対して $n>|h|$ なら

$$
\boxed{
\int_{\mathbb T}e^{ih\lambda}F_n(d\lambda)
=
\left(1-\frac{|h|}{n}\right)\gamma(h).
}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

正定値性の定義で $t_j=j$、$c_j=e^{-ij\lambda}$ と取ると

$$
\sum_{j,k=0}^{n-1}
\gamma(j-k)e^{-i(j-k)\lambda}\ge0.
$$

従って $f_n\ge0$ です。

また Fourier 直交性

$$
\frac1{2\pi}
\int_{-\pi}^{\pi}e^{ir\lambda}d\lambda
=
\mathbf1_{\{r=0\}}
$$

より、全質量では $j=k$ の $n$ 項だけが残り

$$
\int f_n(\lambda)d\lambda
=\frac1n\cdot n\gamma(0)=\gamma(0).
$$

固定した $h$ について

$$
\int e^{ih\lambda}f_n(\lambda)d\lambda
$$

では $j-k=h$ の項だけが残ります。そのような組 $(j,k)$ は $n-|h|$ 個なので

$$
\int e^{ih\lambda}f_n(\lambda)d\lambda
=
\frac{n-|h|}{n}\gamma(h).
$$

$\square$
<!-- proof-end -->

### 3.3 有限測度列から弱収束部分列を抜く

近似測度 $F_n$ は全て同じ有限質量を持ちます。ここで「有限測度列はコンパクト区間上で弱収束部分列を持つ」という部分を、Riesz--Markov を使って必要な形まで証明します。

<a id="lem-tsa3-compact-measures"></a>

<!-- formal-statement-start -->
> **補題（コンパクト区間上の有限測度列の部分列選択）**  
> コンパクト区間 $K=[-\pi,\pi]$ 上の有限非負 Borel 測度 $\mu_n$ が
>
$$
\sup_n\mu_n(K)\le M<\infty
$$
>
> を満たすとする。このとき部分列 $\mu_{n_r}$ と有限非負 Borel 測度 $\mu$ が存在し、任意の複素数値連続関数 $g\in C(K;\mathbb C)$ に対して
>
$$
\boxed{
\int_K g\,d\mu_{n_r}
\longrightarrow
\int_K g\,d\mu
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$C(K)$ 全体でいきなり部分列を選ぶのではなく、まず可算稠密集合だけで対角部分列を取ります。全測度の質量が $M$ 以下なので $|\int g\,d\mu_n|\le M\sup_K|g|$ と一様に抑えられ、稠密集合上の収束が $C(K)$ 全体へ延長されます。最後に、その極限を正線形汎関数として [MT5 の Riesz–Markov 正汎関数版](../MT5/index.md#thm-mt5-riesz-markov-positive)で測度へ戻します。

<!-- proof-start -->
### 証明

まず実数値連続関数空間 $C(K;\mathbb R)$ を考えます。$K$ 上の折れ線関数で、内部の節点を有理数、節点での値を有理数に取るもの全体を $\mathcal D$ とします。$\mathcal D$ は可算です。

任意の $g\in C(K;\mathbb R)$ と $\varepsilon>0$ を取ります。$g$ はコンパクト区間上で一様連続なので、十分細かい有限分割を取り、各分割点と関数値を有理数で十分近く近似して折れ線補間すれば、ある $p\in\mathcal D$ が

$$
\|g-p\|_\infty<\varepsilon
$$

を満たします。従って任意の $g\in C(K;\mathbb R)$ を最大誤差を任意に小さくして $\mathcal D$ の元で近似できます。

$\mathcal D=\{p_1,p_2,\dots\}$ と番号付けます。各 $m$ について

$$
\left|
\int_K p_m\,d\mu_n
\right|
\le
M\|p_m\|_\infty
$$

なので、$(\int p_m\,d\mu_n)_n$ は有界実数列です。$p_1$ について収束部分列を取り、その中から $p_2$ について収束する部分列を取り、以下同様に進めます。対角部分列を $\mu_{n_r}$ とすれば、全ての $m$ について

$$
\int p_m\,d\mu_{n_r}
$$

が $r\to\infty$ で収束します。

次に任意の $g\in C(K;\mathbb R)$ を固定します。$p_m\in\mathcal D$ を $\|g-p_m\|_\infty$ が任意に小さくなるように選べます。また全ての $r$ について

$$
\left|
\int(g-p_m)\,d\mu_{n_r}
\right|
\le
M\|g-p_m\|_\infty.
$$

従って、まず $m$ を大きくして右辺を小さくし、その $p_m$ に対して $r,s$ を大きくすれば

$$
\left|
\int g\,d\mu_{n_r}
-
\int g\,d\mu_{n_s}
\right|
$$

を任意に小さくできます。よって極限

$$
L(g):=
\lim_{r\to\infty}\int_K g\,d\mu_{n_r}
$$

が全ての $g\in C(K;\mathbb R)$ に対して存在します。

極限を取る前の積分が線形なので $L$ も線形です。また $g\ge0$ なら各 $r$ で $\int g\,d\mu_{n_r}\ge0$ だから

$$
L(g)\ge0.
$$

さらに

$$
|L(g)|
\le
M\|g\|_\infty.
$$

従って $L:C(K;\mathbb R)\to\mathbb R$ は正線形汎関数です。

$K$ はコンパクト Hausdorff 空間なので $C_c(K)=C(K)$ です。[MT5 の Riesz--Markov 正汎関数版](../MT5/index.md#thm-mt5-riesz-markov-positive)を適用すると、一意な有限 Radon 測度 $\mu$ が存在して

$$
L(g)=\int_K g\,d\mu
\qquad
(g\in C(K;\mathbb R))
$$

となります。コンパクト距離空間上の Radon 測度は有限 Borel 測度です。

最後に複素数値 $g$ について

$$
g=\operatorname{Re}g+i\operatorname{Im}g
$$

と分ければ、実部・虚部それぞれの収束から

$$
\int g\,d\mu_{n_r}
\to
\int g\,d\mu
$$

が従います。$\square$
<!-- proof-end -->

### 3.4 存在証明を完成する

<!-- proof-start -->
### 証明：弱収束部分列の極限を取る

$\gamma(0)=0$ なら[正定値列の基本補題](#lem-tsa3-pd-basic)から $\gamma\equiv0$ なので $F=0$ でよいです。

$\gamma(0)>0$ とします。$F_n$ は全て質量 $\gamma(0)$ を持ち、Lebesgue 密度を持つので端点に原子を持ちません。従って $[-\pi,\pi]$ 上の測度とみなし、[部分列選択補題](#lem-tsa3-compact-measures)から弱収束部分列

$$
F_{n_r}\Longrightarrow \widetilde F
$$

を取れます。端点を同一視する商写像 $q:[-\pi,\pi]\to\mathbb T$ による押し出し測度を

$$
F(A):=\widetilde F(q^{-1}(A))
\qquad
(A\in\mathcal B(\mathbb T))
$$

と定めます。これを $F=q_\#\widetilde F$ と書きます。$q$ は連続なので $q^{-1}(A)$ は Borel 集合であり、$F$ は円周上の有限非負 Borel 測度です。

固定した $h\in\mathbb Z$ に対して $e^{ih\lambda}$ は円周上の連続関数なので

$$
\begin{aligned}
\int_{\mathbb T}e^{ih\lambda}F(d\lambda)
&=
\lim_{r\to\infty}
\int_{\mathbb T}e^{ih\lambda}F_{n_r}(d\lambda)\\
&=
\lim_{r\to\infty}
\left(1-\frac{|h|}{n_r}\right)\gamma(h)\\
&=\gamma(h).
\end{aligned}
$$

これで存在が得られました。
<!-- proof-end -->

### 3.5 一意性の準備：連続関数を三角多項式で近似する

一意性では「全ての Fourier 係数が一致する二つの有限測度は同じ測度である」と示します。そのために、連続関数を三角多項式で一様近似します。

この近似は [FOU2 の三角多項式の一様稠密性](../FOU2/index.md#thm-fou2-trigonometric-density) が正本です。FOU2 では実数値連続周期関数について証明しています。複素数値連続関数には実部・虚部へそれぞれ適用し、二つの近似多項式を合わせれば同じ結論が得られます。

### 3.6 一意性を完成する

<!-- proof-start -->
### 証明：Fourier 係数が測度を一意に決める

$F,G$ が同じ Fourier 係数

$$
\int e^{ih\lambda}F(d\lambda)
=
\int e^{ih\lambda}G(d\lambda)
\qquad(\forall h\in\mathbb Z)
$$

を持つとします。従って任意の三角多項式 $p$ について

$$
\int p\,dF=\int p\,dG.
$$

任意の連続周期関数 $g$ に対し、[三角多項式の一様稠密性](../FOU2/index.md#thm-fou2-trigonometric-density)から三角多項式 $p_N$ が一様に $g$ へ収束します。$F,G$ は有限測度なので

$$
\int g\,dF
=
\lim_N\int p_N\,dF
=
\lim_N\int p_N\,dG
=
\int g\,dG.
$$

連続関数の積分が全て一致すれば有限 Borel 測度は一致します。実際、開集合 $O\subset\mathbb T$ に対して

$$
g_m(x):=\min\{1,m\,d_{\mathbb T}(x,O^c)\}
$$

と置けば $g_m\uparrow\mathbf1_O$ です。[単調収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange)から $F(O)=G(O)$。開集合全体は有限共通部分で閉じ Borel $\sigma$ 代数を生成します。[π–λ定理](../F0_00D3A_pi_lambda_Dynkin/index.md#thm-f0-00d3a-pi-lambda)を有限測度の一致する集合族へ適用すれば $F=G$ です。

これでHerglotz の定理の一意性まで証明できました。
<!-- proof-end -->

実数値自己共分散なら $\gamma(-h)=\gamma(h)$ です。$F$ を反転した測度 $F^-(A)=F(-A)$ も同じ Fourier 係数を持つため、一意性から $F^-=F$、すなわち対称性も従います。

---

## 4. 自己共分散を周波数測度で表す

<a id="def-tsa3-spectral-measure"></a>

<!-- formal-statement-start -->
> **定義（スペクトル測度）**  
> 二次定常過程の自己共分散列 $\gamma(h)$ に対し、Herglotz の定理で一意に定まる有限非負測度 $F$、すなわち

$$
\gamma(h)=\int_{\mathbb T}e^{ih\lambda}F(d\lambda)
$$

> この有限非負測度 $F$ を **スペクトル測度** と呼びます。
<!-- formal-statement-end -->

### 4.1 例：弱ホワイトノイズ

分散 $\sigma^2$ の弱ホワイトノイズに対して

$$
F(d\lambda)=\frac{\sigma^2}{2\pi}d\lambda
$$

と置きます。

<!-- definition-example-start: def-tsa3-spectral-measure -->
**定義の確認**  
Fourier 直交性から

$$
\int_{-\pi}^{\pi}e^{ih\lambda}
\frac{\sigma^2}{2\pi}d\lambda
=
\begin{cases}
\sigma^2,&h=0,\\
0,&h\ne0,
\end{cases}
$$

で、これは弱ホワイトノイズの自己共分散そのものです。従って定義を満たし、この $F$ がスペクトル測度です。
<!-- definition-example-end -->

全質量は

$$
\boxed{
F(\mathbb T)=\gamma(0)=\operatorname{Var}(X_t)
}
$$

です。したがって $F(A)$ は周波数領域 $A$ に割り当てられた分散量と読めます。

---

## 5. 絶対連続な場合の周波数密度

<a id="def-tsa3-spectral-density"></a>

<!-- formal-statement-start -->
> **定義（スペクトル密度）**  
> スペクトル測度 $F$ が円周上のLebesgue 測度 $\lambda$ に絶対連続、すなわち $F\ll\lambda$ であるとき、Radon--Nikodym 密度

$$
\boxed{
f(\lambda):=\frac{dF}{d\lambda}(\lambda)
}
$$

> をスペクトル密度と呼びます。
<!-- formal-statement-end -->

[Radon--Nikodym定理](../F0_00P2_密度_期待値_Radon_Nikodym/index.md#thm-f0-00p2-radon-nikodym)から、この密度はLebesgue 測度に関してほとんど至る所の意味で一意です。

### 5.1 例：弱ホワイトノイズは平坦なスペクトル

<!-- definition-example-start: def-tsa3-spectral-density -->
**定義の確認**  
前節で

$$
F(A)=\int_A\frac{\sigma^2}{2\pi}d\lambda
$$

と書けたので $F\ll\lambda$ です。従ってRadon--Nikodym 密度は

$$
\boxed{
f(\lambda)=\frac{\sigma^2}{2\pi}}
$$

で一定です。これが平坦なスペクトルです。
<!-- definition-example-end -->

密度が存在するとHerglotz 表示は

$$
\boxed{
\gamma(h)=\int_{-\pi}^{\pi}e^{ih\lambda}f(\lambda)d\lambda
}
$$

になります。

---

## 6. 自己共分散が絶対可算和可能なら逆 Fourier 級数が密度になる

<a id="thm-tsa3-absolute-summable-density"></a>

<!-- formal-statement-start -->
> **定理（絶対可算和可能な自己共分散のスペクトル密度）**  
> 自己共分散列が

$$
\sum_{h\in\mathbb Z}|\gamma(h)|<\infty
$$

> を満たすならスペクトル測度はLebesgue 測度に絶対連続で、連続なスペクトル密度

$$
\boxed{
f(\lambda)
=
\frac1{2\pi}
\sum_{h\in\mathbb Z}
\gamma(h)e^{-ih\lambda}
}
$$

> を持ちます。
<!-- formal-statement-end -->

### 証明の見取り図

絶対可算和可能性で逆 Fourier 級数を一様収束させます。Herglotz の存在証明で使った非負近似密度も同じ極限へ一様収束するので極限関数は非負です。最後に Fourier 係数を計算し、Herglotz 表現の一意性で測度そのものを同定します。

<!-- proof-start -->
### 証明

絶対可算和可能性から Fourier 級数は [Weierstrass の M-test](../RA5/index.md#thm-ra5-mtest)により $\lambda$ に一様収束し、連続関数 $f$ を定めます。

Herglotz証明で作った近似密度は

$$
f_n(\lambda)
=
\frac1{2\pi}
\sum_{|h|<n}
\left(1-\frac{|h|}{n}\right)
\gamma(h)e^{-ih\lambda}.
$$

絶対可算和可能性により $f_n\to f$ は一様収束します。各 $f_n\ge0$ なので $f\ge0$ です。

さらに任意の整数 $m$ に対して項別積分でき

$$
\int_{-\pi}^{\pi}e^{im\lambda}f(\lambda)d\lambda
=\gamma(m).
$$

従って $f(\lambda)d\lambda$ はHerglotz 表示を与える有限非負測度です。Herglotz表現の一意性からこれはスペクトル測度 $F$ そのものなので

$$
F(d\lambda)=f(\lambda)d\lambda.
$$

$\square$
<!-- proof-end -->

「逆 Fourier 級数を書けばよい」の裏には、絶対収束・非負性・Herglotz一意性が入っています。

---

## 7. 例：指数型自己共分散

$|\rho|<1$ とし

$$
\gamma(h)=c\rho^{|h|},
\qquad c>0
$$

とします。絶対可算和可能なので前節の定理を使えます。

$$
\begin{aligned}
2\pi f(\lambda)
&=c\left(1+\sum_{h=1}^{\infty}\rho^he^{-ih\lambda}
+\sum_{h=1}^{\infty}\rho^he^{ih\lambda}\right)\\
&=c\left(
1+\frac{\rho e^{-i\lambda}}{1-\rho e^{-i\lambda}}
+\frac{\rho e^{i\lambda}}{1-\rho e^{i\lambda}}
\right)\\
&=c\frac{1-\rho^2}{1-2\rho\cos\lambda+\rho^2}.
\end{aligned}
$$

従って

$$
\boxed{
f(\lambda)
=
\frac{c(1-\rho^2)}
{2\pi(1-2\rho\cos\lambda+\rho^2)}.
}
$$

TSA4 ではこれが AR(1) の伝達関数から同じ形で出ることを確認します。

---

## 8. 密度で見えない周期成分

スペクトル測度は常に存在しますが、スペクトル密度は常に存在するわけではありません。典型例が周期成分に対応する原子です。

<a id="def-tsa3-line-frequency-atom"></a>

<!-- formal-statement-start -->
> **定義（線スペクトル）**  
> 二次定常過程のスペクトル測度を $F$ とする。周波数 $\lambda_0\in\mathbb T$ が
>
$$
F(\{\lambda_0\})>0
$$
>
> を満たすとき、$\lambda_0$ に線スペクトルを持つという。また、スペクトル測度全体が Lebesgue 測度に絶対連続、すなわち $F\ll d\lambda$ であるとき、その過程は絶対連続スペクトルを持つという。
<!-- formal-statement-end -->

### 8.1 直接例：ランダム正弦波

$0<\omega_0<\pi$、$\Phi\sim\operatorname{Unif}(0,2\pi)$ とし、

$$
X_t=A\cos(\omega_0t+\Phi)
$$

とします。

<!-- definition-example-start: def-tsa3-line-frequency-atom -->
**定義の確認**  
積和公式と $\Phi$ の一様性から

$$
E[X_t]=0,
\qquad
\gamma(h)
=
E[X_{t+h}X_t]
=
\frac{A^2}{2}\cos(\omega_0h).
$$

そこで

$$
F
=
\frac{A^2}{4}\delta_{\omega_0}
+
\frac{A^2}{4}\delta_{-\omega_0}
$$

と置くと

$$
\int_{\mathbb T}e^{ih\lambda}F(d\lambda)
=
\frac{A^2}{4}
\left(e^{ih\omega_0}+e^{-ih\omega_0}\right)
=
\frac{A^2}{2}\cos(h\omega_0)
=
\gamma(h).
$$

Herglotz の一意性から、これがスペクトル測度です。特に

$$
F(\{\omega_0\})=F(\{-\omega_0\})=\frac{A^2}{4}>0,
$$

なので $\pm\omega_0$ に線スペクトルを持ちます。一方、一点集合の Lebesgue 測度は0なのに $F$ は正の質量を与えるため $F\not\ll d\lambda$ です。従って通常の関数としてのスペクトル密度は存在しません。
<!-- definition-example-end -->

この例は「スペクトル測度」と「スペクトル密度」を同一視してはいけない理由を示します。周期成分は、幅を持つ山ではなく測度の原子として現れます。

---

## 9. 共分散の表現から過程そのものの表現へ

ここまでの Herglotz の定理は

$$
\gamma(h)=\int e^{ih\lambda}F(d\lambda)
$$

という**二次構造の表現**でした。次は

$$
X_t=\int e^{it\lambda}Z(d\lambda)
$$

という**確率変数そのものの表現**へ進みます。そのため、周波数側 $L^2(F)$ と、過程が生成する確率変数の閉線形空間を等長に対応させます。


### 9.1 二つの完備内積空間

周波数表示では $e^{it\lambda}$ が現れるため、確率変数空間に複素内積を入れて

$$
\langle Y,W\rangle_{L^2(\Omega)}
:=E[Y\overline W]
$$

と扱います。

過程が生成する閉線形空間を

$$
\mathcal H_X
:=
\overline{\operatorname{span}_{\mathbb C}\{X_t:t\in\mathbb Z\}}^{L^2}
$$

と置きます。一方、周波数側は

$$
L^2(F):=L^2(\mathbb T,\mathcal B(\mathbb T),F)
$$

です。

目標は

$$
U:L^2(F)\to\mathcal H_X
$$

という等長写像を構成することです。

---

## 10. 連続関数は $L^2(F)$ に稠密

<a id="lem-tsa3-continuous-density"></a>

<!-- formal-statement-start -->
> **補題（連続関数の二乗平均稠密性）**  
> 円周 $\mathbb T$ 上の有限 Borel 測度 $F$ に対し、$C(\mathbb T)$ は $L^2(F)$ に稠密である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

円周上の距離を、代表元 $x,y\in\mathbb R$ に対して

$$
d_{\mathbb T}(x,y)
:=
\min_{k\in\mathbb Z}|x-y+2\pi k|
$$

とします。これは代表元の取り方によらず定まります。

開集合 $O\subset\mathbb T$ を考えます。$O=\mathbb T$ は定数関数1でよいので、$O\ne\mathbb T$ とします。$d_{\mathbb T}$ を使って

$$
g_m(x):=\min\{1,m\,d_{\mathbb T}(x,O^c)\}
$$

と置けば、$g_m$ は連続で

$$
0\le g_m\le1,
\qquad
g_m(x)\uparrow\mathbf1_O(x).
$$

従って [Lebesgue の優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)から

$$
\|g_m-\mathbf1_O\|_{L^2(F)}^2
=
\int|g_m-\mathbf1_O|^2dF
\to0.
$$

よって開集合の指示関数は $C(\mathbb T)$ の $L^2(F)$ 閉包に属します。

次に

$$
\mathcal D
:=
\{A\in\mathcal B(\mathbb T):
\mathbf1_A\in\overline{C(\mathbb T)}^{L^2(F)}\}
$$

と置きます。$\mathcal D$ は $\mathbb T$ を含み、補集合で閉じています。

互いに素な $A_1,A_2,\dots\in\mathcal D$ に対し、有限和

$$
\mathbf1_{\cup_{k=1}^nA_k}
=
\sum_{k=1}^n\mathbf1_{A_k}
$$

は閉包に属します。また

$$
\left\|
\mathbf1_{\cup_{k\ge1}A_k}
-
\mathbf1_{\cup_{k=1}^nA_k}
\right\|_2^2
=
F\left(\bigcup_{k>n}A_k\right)
\to0.
$$

従って $\mathcal D$ は Dynkin 族です。開集合全体は有限共通部分で閉じる $\pi$-system なので、[π–λ定理](../F0_00D3A_pi_lambda_Dynkin/index.md#thm-f0-00d3a-pi-lambda)から

$$
\mathcal D=\mathcal B(\mathbb T).
$$

よって全 Borel 集合の指示関数、したがって全単関数が $C(\mathbb T)$ の $L^2(F)$ 閉包に属します。単関数は $L^2(F)$ に稠密なので、$C(\mathbb T)$ も稠密です。$\square$
<!-- proof-end -->

---

## 11. 三角多項式は $L^2(F)$ に稠密

[FOU2 の三角多項式の一様稠密性](../FOU2/index.md#thm-fou2-trigonometric-density)を、周波数側の $L^2(F)$ 稠密性へ持ち上げます。

<a id="thm-tsa3-trig-density"></a>

<!-- formal-statement-start -->
> **定理（三角多項式の二乗平均稠密性）**  
> 円周上の有限 Borel 測度 $F$ に対し、次の三角多項式全体は $L^2(F)$ に稠密である。

$$
\mathcal P
:=\operatorname{span}_{\mathbb C}\{e^{it\lambda}:t\in\mathbb Z\}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f\in L^2(F)$、$\varepsilon>0$ を取ります。前節から連続関数 $g$ を

$$
\|f-g\|_2<\frac\varepsilon2
$$

となるように選べます。

複素数値 $g$ の実部・虚部に [FOU2 の三角多項式の一様稠密性](../FOU2/index.md#thm-fou2-trigonometric-density)を適用し、複素三角多項式 $p$ を

$$
\|g-p\|_\infty
<
\frac{\varepsilon}{2\sqrt{F(\mathbb T)+1}}
$$

となるように選べます。すると

$$
\|g-p\|_2
\le
\sqrt{F(\mathbb T)}\|g-p\|_\infty
<\frac\varepsilon2.
$$

従って

$$
\|f-p\|_2<\varepsilon.
$$

よって $\mathcal P$ は $L^2(F)$ に稠密です。$\square$
<!-- proof-end -->

---

## 12. 共分散から等長写像を作る

三角多項式

$$
p(\lambda)=\sum_{j=1}^m c_j e^{it_j\lambda}
$$

に対し

$$
\boxed{
U_0p:=\sum_{j=1}^mc_jX_{t_j}
}
$$

と置きます。

$p=\sum_jc_je^{it_j\lambda}$、$q=\sum_kd_ke^{is_k\lambda}$ なら

$$
\begin{aligned}
\langle U_0p,U_0q\rangle_{L^2(\Omega)}
&=
\sum_{j,k}c_j\overline{d_k}\gamma(t_j-s_k)\\
&=
\int
\left(\sum_jc_je^{it_j\lambda}\right)
\overline{\left(\sum_kd_ke^{is_k\lambda}\right)}
F(d\lambda)\\
&=
\langle p,q\rangle_{L^2(F)}.
\end{aligned}
$$

従って

$$
\boxed{
\|U_0p\|_{L^2(\Omega)}=\|p\|_{L^2(F)}
}.
$$

特に、同じ $L^2(F)$ 元を別の三角多項式表示で書いても像は同じ $L^2(\Omega)$ 元になるため、$U_0$ は矛盾なく定義されています。

---

## 13. $U_0$ を $L^2(F)$ 全体へ延長する

任意の $f\in L^2(F)$ に対し、三角多項式列 $p_n$ を

$$
p_n\to f
\qquad(L^2(F)\text{ において})
$$

と取ります。等長性より

$$
\|U_0p_n-U_0p_m\|_{L^2(\Omega)}
=
\|p_n-p_m\|_{L^2(F)},
$$

したがって $(U_0p_n)$ はCauchy 列です。[L^2 の完備性](../F0_00D2E_L2完備性_Riesz_Fischer/index.md#thm-f0-00d2e-01)から極限が存在します。

$$
Uf:=\lim_{n\to\infty}U_0p_n
$$

と定めれば、別の近似列を用いても同じ極限になります。こうして

$$
\boxed{
U:L^2(F)\to\mathcal H_X
}
$$

が得られ

$$
\boxed{
\langle Uf,Ug\rangle_{L^2(\Omega)}
=
\langle f,g\rangle_{L^2(F)}
}
$$

を満たします。

また

$$
U(e^{it\lambda})=X_t.
$$

$L^2(F)$ は完備で $U$ は等長写像なので $U(L^2(F))$ は閉です。その像は $\operatorname{span}\{X_t\}$ を含むため

$$
\boxed{
U(L^2(F))=\mathcal H_X
}.
$$

---

## 14. 互いに素な周波数帯の増分を構成する

<a id="def-tsa3-orthogonal-random-measure"></a>

<!-- formal-statement-start -->
> **定義（直交増分ランダム測度）**  
> 有限測度 $F$ に対する写像 $Z:\mathcal B(\mathbb T)\to L^2(\Omega)$ が、互いに素なBorel 集合に対する直交性、互いに素な列に対する $L^2$ 可算加法性、および次の二次モーメント関係を満たすとき、$Z$ を制御測度 $F$ を持つ **直交増分ランダム測度** という。

$$
E[Z(A)\overline{Z(B)}]=F(A\cap B)
$$
<!-- formal-statement-end -->

上で作った $U$ を使って

$$
\boxed{Z(A):=U\mathbf1_A}
$$

と定めます。

<!-- definition-example-start: def-tsa3-orthogonal-random-measure -->
**定義の確認**  
任意のBorel 集合 $A,B$ に対して

$$
\begin{aligned}
E[Z(A)\overline{Z(B)}]
&=\langle U\mathbf1_A,U\mathbf1_B\rangle\\
&=\langle\mathbf1_A,\mathbf1_B\rangle_{L^2(F)}\\
&=F(A\cap B).
\end{aligned}
$$

従って $A\cap B=\varnothing$ なら $Z(A)\perp Z(B)$ です。

さらに互いに素な $A_1,A_2,\dots$ について

$$
\left\|
\mathbf1_{\cup_{k\ge1}A_k}
-
\sum_{k=1}^n\mathbf1_{A_k}
\right\|_{L^2(F)}^2
=
F\left(\bigcup_{k>n}A_k\right)
\to0.
$$

等長写像 $U$ を作用させれば

$$
Z\left(\bigcup_{k\ge1}A_k\right)
=
L^2\!\!\!-\lim_{n\to\infty}
\sum_{k=1}^nZ(A_k).
$$

よって定義の全条件を満たします。
<!-- definition-example-end -->

---

## 15. 直交増分測度に関する積分

<a id="def-tsa3-spectral-integral"></a>

<!-- formal-statement-start -->
> **定義（スペクトル確率積分）**  
> 上で構成した $Z$ に対し、$g\in L^2(F)$ のスペクトル確率積分を次で定める。

$$
\boxed{
\int_{\mathbb T}g(\lambda)Z(d\lambda):=Ug
}
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa3-spectral-integral -->
**定義の確認**：単関数  
$g=\sum_{j=1}^m a_j\mathbf1_{A_j}$ なら

$$
\int g\,dZ
=Ug
=\sum_{j=1}^ma_jU\mathbf1_{A_j}
=\sum_{j=1}^ma_jZ(A_j).
$$

通常のランダム測度積分の単関数定義と一致します。
<!-- definition-example-end -->

等長性から

$$
\boxed{
E\left|\int g\,dZ\right|^2
=
\int|g|^2dF
}
$$

であり、さらに

$$
E\left[
\left(\int f\,dZ\right)
\overline{\left(\int g\,dZ\right)}
\right]
=
\int f\overline g\,dF.
$$

---

## 16. 定常過程を周波数積分で表す

<a id="thm-tsa3-spectral-representation"></a>

<!-- formal-statement-start -->
> **定理（定常過程のスペクトル表現定理）**  
> $(X_t)_{t\in\mathbb Z}$ を平均0の二次定常過程とし、$F$ をそのスペクトル測度とする。このとき、制御測度 $F$ を持つ直交増分ランダム測度 $Z$ が存在して、全ての $t\in\mathbb Z$ について次が $L^2(\Omega)$ の意味で成り立つ。

$$
\boxed{
X_t=\int_{\mathbb T}e^{it\lambda}Z(d\lambda)
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

構成はすでに終わっています。三角多項式上で $e^{it\lambda}\mapsto X_t$ と定めた等長写像を $L^2(F)$ 全体へ延長し、指示関数から $Z(A)=U\mathbf1_A$ を作りました。したがって指数関数 $e^{it\lambda}$ をスペクトル確率積分へ入れるだけで $X_t$ が戻ります。

<!-- proof-start -->
### 証明

前節までで等長写像 $U$ と

$$
Z(A)=U\mathbf1_A
$$

を構成しました。スペクトル確率積分の定義から

$$
\int e^{it\lambda}Z(d\lambda)
=U(e^{it\lambda}).
$$

一方、$U$ は $U_0$ の連続延長であり

$$
U(e^{it\lambda})=X_t.
$$

従って

$$
X_t=\int e^{it\lambda}Z(d\lambda).
$$

$\square$
<!-- proof-end -->

Herglotz の定理が

$$
\gamma(h)=\int e^{ih\lambda}F(d\lambda)
$$

という **二次構造の表現** なのに対し、この定理は

$$
X_t=\int e^{it\lambda}Z(d\lambda)
$$

という **確率変数そのものの表現** です。

---

## 17. 例：弱ホワイトノイズ

分散 $\sigma^2$ の弱ホワイトノイズでは

$$
F(d\lambda)=\frac{\sigma^2}{2\pi}d\lambda.
$$

従ってBorel 集合 $A$ に対し

$$
E|Z(A)|^2
=F(A)
=\frac{\sigma^2}{2\pi}|A|.
$$

互いに素な周波数帯 $A,B$ なら

$$
E[Z(A)\overline{Z(B)}]=0.
$$

平坦なスペクトルとは、周波数帯へ割り当てられる $L^2$ エネルギーがLebesgue 長に比例することです。

---

## 18. 例：線スペクトル

$0<\omega<\pi$ とし

$$
X_t=A\cos(t\omega)+B\sin(t\omega),
$$

$$
E[A]=E[B]=0,
\qquad
E[A^2]=E[B^2]=\tau^2,
\qquad
E[AB]=0
$$

とします。すると

$$
\gamma(h)=\tau^2\cos(h\omega)
$$

なので

$$
F
=
\frac{\tau^2}{2}\delta_{\omega}
+
\frac{\tau^2}{2}\delta_{-\omega}.
$$

$$
C:=\frac{A-iB}{2}
$$

と置けば

$$
X_t=Ce^{it\omega}+\overline C e^{-it\omega},
$$

$$
E|C|^2=\frac{\tau^2}{2},
\qquad
E[C^2]=0.
$$

従って

$$
Z(\{\omega\})=C,
\qquad
Z(\{-\omega\})=\overline C
$$

と見れば、二つの原子は $L^2$ で直交し、原子質量は $F$ と一致します。

---

## 19. この章でつながったもの

Herglotz の定理は、自己共分散列を「周波数ごとに分散を配る有限測度」へ変換しました。スペクトル表現定理はさらに、周波数側の $L^2(F)$ と過程が生成する閉線形空間を等長対応させ、

$$
X_t=\int_{\mathbb T}e^{it\lambda}Z(d\lambda)
$$

まで持ち上げました。

弱ホワイトノイズでは分散が Lebesgue 長に比例して全周波数へ平坦に配られ、ランダム正弦波では分散が二つの原子へ集中します。TSA4 ではこの表現へ線形フィルタを作用させ、ARMA / ARIMA の伝達関数とスペクトルへ進みます。

---

# 演習

## TSA3-A01 自己共分散列の正定値性を複素係数で確認する

- Level: A
- 目安時間: 15分

平均0の実二次定常過程 $(X_t)$ の自己共分散を $\gamma(h)$ とする。整数 $t_1,\dots,t_m$ と複素数 $c_1,\dots,c_m$ に対して

$$
\sum_{j,k=1}^m c_j\overline{c_k}\gamma(t_j-t_k)\ge0
$$

を示せ。さらに $2\times2$ の場合を用いて $|\gamma(h)|\le\gamma(0)$ を導け。

<!-- solution-start -->
### 詳細解答

複素確率変数

$$
Y:=\sum_{j=1}^m c_jX_{t_j}
$$

を考えます。$X_t$ は実数値なので

$$
\overline Y=\sum_{k=1}^m\overline{c_k}X_{t_k}.
$$

従って二次定常性より

$$
\begin{aligned}
E|Y|^2
&=
E\left[
\left(\sum_jc_jX_{t_j}\right)
\left(\sum_k\overline{c_k}X_{t_k}\right)
\right]\\
&=
\sum_{j,k}c_j\overline{c_k}E[X_{t_j}X_{t_k}]\\
&=
\sum_{j,k}c_j\overline{c_k}\gamma(t_j-t_k).
\end{aligned}
$$

左辺は非負なので正定値性が従います。

次に $L^2$ の Cauchy--Schwarz の不等式を $X_{t+h},X_t$ に適用すると

$$
\begin{aligned}
|\gamma(h)|
&=
|E[X_{t+h}X_t]|\\
&\le
\sqrt{E[X_{t+h}^2]E[X_t^2]}\\
&=
\gamma(0),
\end{aligned}
$$

です。最後の等号では二次定常性により両時刻の分散がともに $\gamma(0)$ であることを使いました。従って

$$
\boxed{|\gamma(h)|\le\gamma(0)}.
$$
<!-- solution-end -->

## TSA3-A02 Herglotz 近似測度の Fourier 係数

- Level: A
- 目安時間: 18分

正定値列 $\gamma:\mathbb Z\to\mathbb C$ に対し

$$
f_n(\lambda)
=
\frac1{2\pi n}
\sum_{j,k=0}^{n-1}
\gamma(j-k)e^{-i(j-k)\lambda}
$$

と置く。

1. $f_n(\lambda)\ge0$ を示せ。
2. $\int_{-\pi}^{\pi}f_n(\lambda)d\lambda=\gamma(0)$ を示せ。
3. 固定した $h\in\mathbb Z$ と $n>|h|$ に対し
   $$
   \int_{-\pi}^{\pi}e^{ih\lambda}f_n(\lambda)d\lambda
   =
   \left(1-\frac{|h|}{n}\right)\gamma(h)
   $$
   を示せ。

<!-- solution-start -->
### 詳細解答

1. 正定値性の定義で時刻 $0,\dots,n-1$、係数
   $$
   c_j=e^{-ij\lambda}
   $$
   を選びます。すると
   $$
   \sum_{j,k=0}^{n-1}
   c_j\overline{c_k}\gamma(j-k)
   =
   \sum_{j,k=0}^{n-1}
   \gamma(j-k)e^{-i(j-k)\lambda}
   \ge0.
   $$
   正の定数 $2\pi n$ で割っているだけなので $f_n(\lambda)\ge0$ です。

2. Fourier の直交性
   $$
   \frac1{2\pi}\int_{-\pi}^{\pi}e^{-ir\lambda}d\lambda
   =
   \mathbf1_{\{r=0\}}
   $$
   を使います。積分後に残るのは $j=k$ の $n$ 項だけなので
   $$
   \int f_n
   =
   \frac1n\sum_{j=0}^{n-1}\gamma(0)
   =
   \gamma(0).
   $$

3. 積分する指数は
   $$
   e^{i\{h-(j-k)\}\lambda}
   $$
   です。従って $j-k=h$ の組だけが残ります。$n>|h|$ ならその組は $n-|h|$ 個なので
   $$
   \int e^{ih\lambda}f_n(\lambda)d\lambda
   =
   \frac{n-|h|}{n}\gamma(h).
   $$
   これが求める式です。
<!-- solution-end -->

## TSA3-A03 弱ホワイトノイズのスペクトル測度とスペクトル密度

- Level: A
- 目安時間: 12分

$(\varepsilon_t)$ を分散 $\sigma^2>0$ の弱ホワイトノイズとする。

1. 自己共分散 $\gamma(h)$ を求めよ。
2.
   $$
   F(d\lambda)=\frac{\sigma^2}{2\pi}d\lambda
   $$
   がスペクトル測度であることを Herglotz 表示から確認せよ。
3. スペクトル密度とスペクトル測度の全質量を求めよ。

<!-- solution-start -->
### 詳細解答

1. 弱ホワイトノイズの定義から
   $$
   \gamma(h)
   =
   \begin{cases}
   \sigma^2,&h=0,\\
   0,&h\ne0.
   \end{cases}
   $$

2. 候補測度について
   $$
   \int_{-\pi}^{\pi}
   e^{ih\lambda}\frac{\sigma^2}{2\pi}d\lambda
   =
   \frac{\sigma^2}{2\pi}
   \int_{-\pi}^{\pi}e^{ih\lambda}d\lambda.
   $$
   $h=0$ では $\sigma^2$、$h\ne0$ では0です。従って全ての $h$ で自己共分散と一致します。Herglotz の一意性からこの $F$ がスペクトル測度です。

3. $F$ は Lebesgue 測度に絶対連続なので
   $$
   \boxed{f(\lambda)=\frac{\sigma^2}{2\pi}}
   $$
   がスペクトル密度です。また
   $$
   F(\mathbb T)
   =
   \int_{-\pi}^{\pi}\frac{\sigma^2}{2\pi}d\lambda
   =
   \sigma^2
   =
   \gamma(0).
   $$
   つまり全周波数へ割り当てた分散の総量が時系列の分散に一致します。
<!-- solution-end -->

## TSA3-A04 ランダム正弦波の線スペクトル

- Level: A
- 目安時間: 18分

$0<\omega<\pi$ とし、

$$
X_t=A\cos(\omega t)+B\sin(\omega t),
$$

$$
E[A]=E[B]=0,
\qquad
E[A^2]=E[B^2]=\tau^2,
\qquad
E[AB]=0
$$

とする。

1. $\gamma(h)=\tau^2\cos(h\omega)$ を示せ。
2.
   $$
   F=\frac{\tau^2}{2}\delta_\omega+\frac{\tau^2}{2}\delta_{-\omega}
   $$
   がスペクトル測度であることを示せ。
3. この過程が通常の関数としてのスペクトル密度を持たない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

1. 加法定理を使うと
   $$
   \begin{aligned}
   E[X_{t+h}X_t]
   &=
   \tau^2\{
   \cos((t+h)\omega)\cos(t\omega)
   +
   \sin((t+h)\omega)\sin(t\omega)
   \}\\
   &=
   \tau^2\cos(h\omega).
   \end{aligned}
   $$
   $E[AB]=0$ により交差項は消えています。

2. 候補測度の Fourier 係数は
   $$
   \begin{aligned}
   \int e^{ih\lambda}F(d\lambda)
   &=
   \frac{\tau^2}{2}e^{ih\omega}
   +
   \frac{\tau^2}{2}e^{-ih\omega}\\
   &=
   \tau^2\cos(h\omega)
   =
   \gamma(h).
   \end{aligned}
   $$
   Herglotz の一意性からこれがスペクトル測度です。

3. 一点集合 $\{\omega\}$ の Lebesgue 測度は0ですが
   $$
   F(\{\omega\})=\frac{\tau^2}{2}>0.
   $$
   従って $F$ は Lebesgue 測度に絶対連続ではありません。スペクトル密度は Radon--Nikodym 微分 $dF/d\lambda$ が存在するときだけ定義されるので、この $F$ には通常の関数としてのスペクトル密度はありません。
<!-- solution-end -->

## TSA3-B01 Herglotz 表現の一意性を再構成する

- Level: B
- 目安時間: 24分

円周 $\mathbb T$ 上の有限非負 Borel 測度 $F,G$ が

$$
\int e^{ih\lambda}F(d\lambda)
=
\int e^{ih\lambda}G(d\lambda)
\qquad(\forall h\in\mathbb Z)
$$

を満たすとする。$F=G$ を示せ。

<!-- solution-start -->
### 詳細解答

まず任意の三角多項式

$$
p(\lambda)=\sum_{|h|\le N}a_he^{ih\lambda}
$$

について、線形性と仮定から

$$
\int p\,dF=\int p\,dG
$$

です。

次に連続関数 $g\in C(\mathbb T)$ を取ります。複素数値なら実部・虚部へ分けます。[FOU2 の三角多項式の一様稠密性](../FOU2/index.md#thm-fou2-trigonometric-density)により、三角多項式 $p_n$ を

$$
\|p_n-g\|_\infty\to0
$$

となるように取れます。有限測度なので

$$
\left|\int(p_n-g)dF\right|
\le
F(\mathbb T)\|p_n-g\|_\infty
\to0,
$$

$G$ についても同様です。従って

$$
\int g\,dF=\int g\,dG
$$

が全ての連続 $g$ で成り立ちます。

開集合 $O$ に対して

$$
g_m(x)=\min\{1,m\,d_{\mathbb T}(x,O^c)\}
$$

と置けば $0\le g_m\uparrow\mathbf1_O$ です。[単調収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange)から

$$
F(O)=\lim_m\int g_m\,dF
=
\lim_m\int g_m\,dG
=
G(O).
$$

したがって両測度は全ての開集合で一致します。開集合は有限共通部分で閉じ Borel σ代数を生成するので、[π–λ定理](../F0_00D3A_pi_lambda_Dynkin/index.md#thm-f0-00d3a-pi-lambda)を適用して

$$
\boxed{F=G}.
$$
<!-- solution-end -->

## TSA3-B02 指数型自己共分散からスペクトル密度を求める

- Level: B
- 目安時間: 25分

$|\rho|<1$、$c>0$ とし、

$$
\gamma(h)=c\rho^{|h|}
$$

とする。

1. $\sum_{h\in\mathbb Z}|\gamma(h)|<\infty$ を示せ。
2.
   $$
   f(\lambda)
   =
   \frac1{2\pi}\sum_{h\in\mathbb Z}\gamma(h)e^{-ih\lambda}
   $$
   を幾何級数で計算せよ。
3. $\int_{-\pi}^{\pi}f(\lambda)d\lambda=c$ を、Fourier 係数または直接積分のどちらかで説明せよ。

<!-- solution-start -->
### 詳細解答

1. $|\rho|<1$ なので
   $$
   \sum_{h\in\mathbb Z}|\gamma(h)|
   =
   c\left(1+2\sum_{h=1}^{\infty}|\rho|^h\right)
   =
   c\left(1+\frac{2|\rho|}{1-|\rho|}\right)
   <\infty.
   $$
   従って本文の絶対可算和可能性の定理を適用できます。

2. 正負の添字を分けると
   $$
   \begin{aligned}
   2\pi f(\lambda)
   &=
   c\left[
   1+
   \sum_{h=1}^{\infty}\rho^he^{-ih\lambda}
   +
   \sum_{h=1}^{\infty}\rho^he^{ih\lambda}
   \right]\\
   &=
   c\left[
   1+
   \frac{\rho e^{-i\lambda}}{1-\rho e^{-i\lambda}}
   +
   \frac{\rho e^{i\lambda}}{1-\rho e^{i\lambda}}
   \right].
   \end{aligned}
   $$
   共通分母
   $$
   (1-\rho e^{-i\lambda})(1-\rho e^{i\lambda})
   =
   1-2\rho\cos\lambda+\rho^2
   $$
   へまとめると分子は $1-\rho^2$ になり、
   $$
   \boxed{
   f(\lambda)
   =
   \frac{c(1-\rho^2)}
   {2\pi(1-2\rho\cos\lambda+\rho^2)}
   }.
   $$

3. Herglotz 表示で $h=0$ と置けば
   $$
   \int f(\lambda)d\lambda=\gamma(0)=c.
   $$
   これは「スペクトル測度の全質量 = 分散」という一般則の具体例です。
<!-- solution-end -->

## TSA3-B03 等長写像から直交増分ランダム測度を作る

- Level: B
- 目安時間: 30分

平均0の二次定常過程 $(X_t)$ のスペクトル測度を $F$ とする。三角多項式

$$
p(\lambda)=\sum_{j=1}^mc_je^{it_j\lambda}
$$

に対し

$$
U_0p:=\sum_{j=1}^mc_jX_{t_j}
$$

と置く。

1. $\|U_0p\|_2=\|p\|_{L^2(F)}$ を示せ。
2. $U_0$ が $L^2(F)$ 全体へ一意な等長写像 $U$ として延長できる理由を説明せよ。
3. $Z(A):=U\mathbf1_A$ と置き、
   $$
   E[Z(A)\overline{Z(B)}]=F(A\cap B)
   $$
   を示せ。
4. 互いに素な $A_1,A_2,\dots$ について $Z$ の可算加法性が $L^2$ で成り立つことを示せ。

<!-- solution-start -->
### 詳細解答

1. Herglotz 表示を使うと
   $$
   \begin{aligned}
   \|U_0p\|_2^2
   &=
   \sum_{j,k}
   c_j\overline{c_k}\gamma(t_j-t_k)\\
   &=
   \int_{\mathbb T}
   \sum_{j,k}
   c_j\overline{c_k}
   e^{i(t_j-t_k)\lambda}
   F(d\lambda)\\
   &=
   \int_{\mathbb T}
   \left|\sum_jc_je^{it_j\lambda}\right|^2
   F(d\lambda)\\
   &=
   \|p\|_{L^2(F)}^2.
   \end{aligned}
   $$
   非負平方根を取れば等長性が従います。

2. 本文で示したように三角多項式は $L^2(F)$ に稠密です。$p_n\to f$ in $L^2(F)$ なら等長性から
   $$
   \|U_0p_n-U_0p_m\|_2
   =
   \|p_n-p_m\|_{L^2(F)}.
   $$
   従って $(U_0p_n)$ は Cauchy 列です。[L^2 の完備性](../F0_00D2E_L2完備性_Riesz_Fischer/index.md#thm-f0-00d2e-01)により極限が存在し、
   $$
   Uf:=L^2\text{-}\lim_nU_0p_n
   $$
   と定められます。別の近似列との差も等長性で0へ行くため、定義は近似列に依存しません。

3. $U$ は内積を保存するので
   $$
   \begin{aligned}
   E[Z(A)\overline{Z(B)}]
   &=
   \langle U\mathbf1_A,U\mathbf1_B\rangle\\
   &=
   \langle\mathbf1_A,\mathbf1_B\rangle_{L^2(F)}\\
   &=
   \int\mathbf1_{A\cap B}dF\\
   &=
   F(A\cap B).
   \end{aligned}
   $$
   特に $A\cap B=\varnothing$ なら二つの増分は直交します。

4. 互いに素なら
   $$
   \mathbf1_{\cup_{k\ge1}A_k}
   -
   \sum_{k=1}^n\mathbf1_{A_k}
   =
   \mathbf1_{\cup_{k>n}A_k}.
   $$
   よって
   $$
   \left\|
   \mathbf1_{\cup A_k}
   -
   \sum_{k=1}^n\mathbf1_{A_k}
   \right\|_{L^2(F)}^2
   =
   F\left(\bigcup_{k>n}A_k\right)
   \to0
   $$
   です。等長写像 $U$ を作用させて
   $$
   \boxed{
   Z\left(\bigcup_{k\ge1}A_k\right)
   =
   L^2\text{-}\lim_{n\to\infty}
   \sum_{k=1}^nZ(A_k)
   }.
   $$
<!-- solution-end -->

## TSA3-C01 Herglotz からスペクトル表現までを一本で再構成する

- Level: C
- 目安時間: 45分

$(X_t)_{t\in\mathbb Z}$ を平均0の二次定常過程、$\gamma$ を自己共分散、$F$ を Herglotz の定理で得るスペクトル測度とする。

1. 三角多項式 $p=\sum_jc_je^{it_j\lambda}$ に対する写像
   $$
   U_0p=\sum_jc_jX_{t_j}
   $$
   が等長であることを示し、$L^2(F)$ 全体への等長写像 $U$ へ延長せよ。
2. $Z(A)=U\mathbf1_A$ と定めたとき、$Z$ が制御測度 $F$ を持つ直交増分ランダム測度であることを示せ。
3. スペクトル確率積分を $\int g\,Z(d\lambda):=Ug$ と定め、
   $$
   X_t=\int_{\mathbb T}e^{it\lambda}Z(d\lambda)
   $$
   を導け。
4. この表現から
   $$
   E[X_{t+h}\overline{X_t}]
   =
   \int_{\mathbb T}e^{ih\lambda}F(d\lambda)
   $$
   を再び導き、Herglotz 表示と整合することを確認せよ。
5. 弱ホワイトノイズとランダム正弦波で $F$ の形が根本的にどう違うか説明せよ。

<!-- solution-start -->
### 詳細解答

1. $p=\sum_jc_je^{it_j\lambda}$ に対し
   $$
   \begin{aligned}
   \|U_0p\|_2^2
   &=
   \sum_{j,k}
   c_j\overline{c_k}\gamma(t_j-t_k)\\
   &=
   \int
   \left|\sum_jc_je^{it_j\lambda}\right|^2F(d\lambda)\\
   &=
   \|p\|_{L^2(F)}^2.
   \end{aligned}
   $$
   したがって $U_0$ は等長です。同じ $L^2(F)$ 元を二通りの三角多項式で表しても差のノルムが0なので、像の差も0です。

   三角多項式は $L^2(F)$ に稠密です。任意の $f\in L^2(F)$ に対し $p_n\to f$ と取ると
   $$
   \|U_0p_n-U_0p_m\|_2
   =
   \|p_n-p_m\|_{L^2(F)}
   $$
   なので像は Cauchy 列になります。確率変数側の $L^2$ 完備性により
   $$
   Uf:=L^2\text{-}\lim_nU_0p_n
   $$
   と定義でき、同じ等長性が極限でも保たれます。

2. B03 と同じ計算から
   $$
   E[Z(A)\overline{Z(B)}]
   =
   F(A\cap B).
   $$
   従って互いに素な集合の増分は直交します。互いに素な列 $A_k$ について、指示関数の有限和が和集合の指示関数へ $L^2(F)$ 収束するので、$U$ の等長性により
   $$
   Z(\cup_kA_k)
   =
   L^2\text{-}\lim_n\sum_{k=1}^nZ(A_k).
   $$
   これで直交増分ランダム測度の条件が揃います。

3. 定義から
   $$
   \int e^{it\lambda}Z(d\lambda)
   =
   U(e^{it\lambda}).
   $$
   しかし $e^{it\lambda}$ はもともとの三角多項式の一つであり、$U$ は $U_0$ の延長なので
   $$
   U(e^{it\lambda})=X_t.
   $$
   従って
   $$
   \boxed{
   X_t=\int e^{it\lambda}Z(d\lambda)
   }.
   $$

4. スペクトル確率積分の内積保存性から
   $$
   \begin{aligned}
   E[X_{t+h}\overline{X_t}]
   &=
   E\left[
   \left(\int e^{i(t+h)\lambda}Z(d\lambda)\right)
   \overline{\left(\int e^{it\lambda}Z(d\lambda)\right)}
   \right]\\
   &=
   \int
   e^{i(t+h)\lambda}
   e^{-it\lambda}
   F(d\lambda)\\
   &=
   \int e^{ih\lambda}F(d\lambda).
   \end{aligned}
   $$
   これは Herglotz 表示そのものです。したがって「共分散の測度表示」と「過程の確率積分表示」は同じ $F$ を通じて一致します。

5. 分散 $\sigma^2$ の弱ホワイトノイズでは
   $$
   F(d\lambda)=\frac{\sigma^2}{2\pi}d\lambda
   $$
   で、分散は周波数全体へ Lebesgue 長に比例して配られます。これは絶対連続で平坦なスペクトルです。

   一方、$\gamma(h)=\tau^2\cos(h\omega)$ のランダム正弦波では
   $$
   F=\frac{\tau^2}{2}\delta_\omega+\frac{\tau^2}{2}\delta_{-\omega},
   $$
   で、分散は二つの周波数原子へ集中します。この測度は Lebesgue 測度に絶対連続ではなく、通常のスペクトル密度を持ちません。

   したがって同じ二次定常過程でも、周波数領域では「広がった絶対連続成分」と「原子へ集中する線スペクトル」という全く異なる二次構造を区別できます。
<!-- solution-end -->

---

## 次に進む

TSA4 では、ここで構成したスペクトル表現へ線形フィルタを作用させます。伝達関数によるスペクトル測度の変換、ARMA / ARIMA の因果表現と逆フィルタ、差分と季節差分、時間領域の自己共分散と周波数領域の対応を扱います。
