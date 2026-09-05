# F0-00TS2 Encore IV：Herglotz定理・spectral measure・spectral density

TS1では自己共分散をHilbert空間の内積として読み、Wold分解まで進みました。

この章では同じ二次構造を周波数領域へ移します。中心線は

```text
自己共分散列 gamma(h)
  ↓ 正定値性
Fejer型の非負近似密度 f_n
  ↓ コンパクト区間上の測度列の部分列収束
Herglotz定理
  ↓
spectral measure F
  ↓ F << Lebesgue のとき
spectral density f
  ↓
periodogram / ARMAの周波数解析
```

です。

周波数は端点を同一視した円周

$$
\mathbb T:=\mathbb R/(2\pi\mathbb Z)
$$

上で考えます。積分では代表区間 $[-\pi,\pi)$ を使います。これにより $-\pi$ と $\pi$ に別々の点質量を置けてしまうという端点の曖昧さを避けられます。

---

## 1. 自己共分散列は正定値列になる

平均0の実二次定常過程 $(X_t)$ なら

$$
\gamma(h)=E[X_{t+h}X_t]
$$

です。

<a id="def-f0-00ts2-positive-definite"></a>

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

### 1.1 例：white noiseの自己共分散

分散 $\sigma^2$ のwhite noiseでは

$$
\gamma(h)=\sigma^2\mathbf1_{\{h=0\}}.
$$

<!-- definition-example-start: def-f0-00ts2-positive-definite -->
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

従って定義の不等式を任意の $(t_j,c_j)$ について満たし、white noiseの自己共分散列は正定値です。
<!-- definition-example-end -->

一般の二次定常過程についても

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

## 2. 正定値列の基本補題

<a id="lem-f0-00ts2-pd-basic"></a>

<!-- formal-statement-start -->
> **補題（正定値列のHermite対称性と有界性）**  
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

従って

$$
\begin{pmatrix}
\gamma(0)&\gamma(-h)\\
\gamma(h)&\gamma(0)
\end{pmatrix}
$$

はHermite半正定値行列です。その行列式も非負だから

$$
\gamma(0)^2-|\gamma(h)|^2\ge0.
$$

よって $|\gamma(h)|\le\gamma(0)$ です。$\square$
<!-- proof-end -->

特に $\gamma(0)=0$ なら全ての $h$ で $\gamma(h)=0$ です。

---

## 3. Herglotz定理

<a id="thm-f0-00ts2-herglotz"></a>

<!-- formal-statement-start -->
> **定理（Herglotz定理）**  
> 列 $\gamma:\mathbb Z\to\mathbb C$ が正定値であることと、円周 $\mathbb T$ 上の有限非負Borel測度 $F$ が一意に存在して

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

ここから証明します。存在証明の核は「正定値性から最初から非負な近似密度を作る」ことです。

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

### 3.2 存在の準備：Fejer型の非負近似密度

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

<a id="lem-f0-00ts2-fejer-positive"></a>

<!-- formal-statement-start -->
> **補題（Herglotz近似密度）**  
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

またFourier直交性

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

次の補題を章内で証明しておきます。これがRiesz--Markovを丸ごとブラックボックスにしないための部分です。

<a id="lem-f0-00ts2-compact-measures"></a>

<!-- formal-statement-start -->
> **補題（コンパクト区間上の有限測度列の部分列選択）**  
> $[-\pi,\pi]$ 上の有限非負Borel測度 $\mu_n$ が

$$
\sup_n\mu_n([-\pi,\pi])\le M<\infty
$$

> を満たすとします。このとき部分列 $\mu_{n_r}$ と有限非負Borel測度 $\mu$ が存在し、任意の連続関数 $g$ に対して

$$
\boxed{
\int g\,d\mu_{n_r}
\longrightarrow
\int g\,d\mu
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：分布関数の対角選択

$$
G_n(x):=\mu_n([-\pi,x])
$$

と置きます。各 $G_n$ は単調非減少で $0\le G_n\le M$ です。

$[-\pi,\pi]$ の有理点と両端点を可算列 $q_1,q_2,\dots$ と並べます。$(G_n(q_1))_n$ は有界なので収束部分列を持ちます。その部分列から $q_2$ で収束する部分列を抜き、これを繰り返して対角部分列を取ると、全ての $q$ で

$$
G_{n_r}(q)
$$

が $r\to\infty$ で収束するようにできます。

有理点での極限値を $L(q)$ とし、これから右連続な単調関数 $G$ を

$$
G(x):=\inf_{q>x,\ q\in\mathbb Q}L(q)
$$

で作ります。端点では左右極限を使います。単調関数の不連続点は高々可算個です。

$G$ の連続点 $x$ を固定します。$x$ の左右から有理数 $q^-<x<q^+$ を十分近く取れば、単調性により

$$
G_{n_r}(q^-)
\le G_{n_r}(x)
\le G_{n_r}(q^+)
$$

です。$r\to\infty$ の後に $q^-,q^+\to x$ とすれば $G$ の連続性から

$$
G_{n_r}(x)\to G(x).
$$

$G$ の増分

$$
\mu_0((a,b]):=G(b)-G(a)
$$

を半開区間の有限互いに素和へ加法的に延長するとpremeasureになります。[Caratheodory拡張定理](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md#thm-caratheodory-extension)により、これを持つ有限Borel測度 $\mu$ が存在します。

最後に連続関数 $g$ を取ります。$G$ の不連続点を避けて、meshが十分細かい分割

$$
-\pi=x_0<x_1<\cdots<x_m=\pi
$$

を取ります。各区間から一点 $\xi_j$ を選ぶと、一様連続性より

$$
\left|
\int g\,d\mu_{n_r}
-
\sum_{j=1}^m g(\xi_j)\mu_{n_r}((x_{j-1},x_j])
\right|
\le M\,\omega_g(\text{mesh}),
$$

ここで $\omega_g$ は一様連続性のmodulusです。分割点は $G$ の連続点なので各区間質量は $\mu_{n_r}$ から $\mu$ のものへ収束します。同じ評価を $\mu$ にも使い、まず $r\to\infty$、次にmeshを0へ送れば

$$
\int g\,d\mu_{n_r}\to\int g\,d\mu.
$$

$\square$
<!-- proof-end -->

### 3.4 存在証明を完成する

<!-- proof-start -->
### 証明：弱収束部分列の極限を取る

$\gamma(0)=0$ なら[正定値列の基本補題](#lem-f0-00ts2-pd-basic)から $\gamma\equiv0$ なので $F=0$ でよいです。

$\gamma(0)>0$ とします。$F_n$ は全て質量 $\gamma(0)$ を持ち、Lebesgue密度を持つので端点に原子を持ちません。従って $[-\pi,\pi]$ 上の測度とみなし、[部分列選択補題](#lem-f0-00ts2-compact-measures)から弱収束部分列

$$
F_{n_r}\Longrightarrow \widetilde F
$$

を取れます。端点を同一視する商写像 $q:[-\pi,\pi]\to\mathbb T$ で押し出して

$$
F:=q_\#\widetilde F
$$

とします。

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

### 3.5 一意性の準備：Fejer近似

<a id="lem-f0-00ts2-fejer-uniform"></a>

<!-- formal-statement-start -->
> **補題（Fejer近似）**  
> $g$ を $2\pi$ 周期の連続関数とします。Fejer kernel

$$
K_N(u)
:=
\frac1N
\left|
\sum_{j=0}^{N-1}e^{iju}
\right|^2
$$

> を用いて

$$
\sigma_Ng(\lambda)
:=
\frac1{2\pi}
\int_{-\pi}^{\pi}
K_N(u)g(\lambda-u)du
$$

> と置くと、$\sigma_Ng$ は三角多項式で

$$
\boxed{
\|\sigma_Ng-g\|_\infty\to0
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

幾何級数から

$$
K_N(u)
=
\sum_{|h|<N}
\left(1-\frac{|h|}{N}\right)e^{ihu}
\ge0,
$$

かつ定数Fourier係数が1なので

$$
\frac1{2\pi}\int_{-\pi}^{\pi}K_N(u)du=1.
$$

従って

$$
\sigma_Ng(\lambda)-g(\lambda)
=
\frac1{2\pi}
\int K_N(u)\{g(\lambda-u)-g(\lambda)\}du.
$$

任意の $\varepsilon>0$ に対し、一様連続性から $|u|<\delta$ なら

$$
|g(\lambda-u)-g(\lambda)|<\varepsilon
$$

が $\lambda$ に一様に成り立つようにできます。

一方 $|u|\ge\delta$ では

$$
K_N(u)
=
\frac1N
\frac{|1-e^{iNu}|^2}{|1-e^{iu}|^2}
\le
\frac{1}{N\sin^2(\delta/2)}.
$$

従って遠方部分の積分は $N\to\infty$ で一様に0になります。近傍部分は $\varepsilon$ 以下なので

$$
\|\sigma_Ng-g\|_\infty\to0.
$$

$\square$
<!-- proof-end -->

### 3.6 一意性を完成する

<!-- proof-start -->
### 証明：Fourier係数が測度を一意に決める

$F,G$ が同じFourier係数

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

任意の連続周期関数 $g$ に対し、[Fejer近似補題](#lem-f0-00ts2-fejer-uniform)から三角多項式 $\sigma_Ng$ が一様に $g$ へ収束します。$F,G$ は有限測度なので

$$
\int g\,dF
=
\lim_N\int\sigma_Ng\,dF
=
\lim_N\int\sigma_Ng\,dG
=
\int g\,dG.
$$

連続関数の積分が全て一致すれば有限Borel測度は一致します。実際、開集合 $O\subset\mathbb T$ に対して

$$
g_m(x):=\min\{1,m\,d(x,O^c)\}
$$

と置けば $g_m\uparrow\mathbf1_O$ です。単調収束定理から $F(O)=G(O)$。開集合全体は有限共通部分で閉じBorel $\sigma$ 代数を生成するので、有限測度版の $\pi$--$\lambda$ 議論から $F=G$ です。

これでHerglotz定理の一意性まで証明できました。
<!-- proof-end -->

実数値自己共分散なら $\gamma(-h)=\gamma(h)$ です。$F$ を反転した測度 $F^-(A)=F(-A)$ も同じFourier係数を持つため、一意性から $F^-=F$、すなわち対称性も従います。

---

## 4. spectral measure

<a id="def-f0-00ts2-spectral-measure"></a>

<!-- formal-statement-start -->
> **定義（spectral measure）**  
> 二次定常過程の自己共分散列 $\gamma(h)$ に対し、Herglotz定理で一意に定まる有限非負測度 $F$、すなわち

$$
\gamma(h)=\int_{\mathbb T}e^{ih\lambda}F(d\lambda)
$$

> をその過程のspectral measureと呼びます。
<!-- formal-statement-end -->

### 4.1 例：white noise

分散 $\sigma^2$ のwhite noiseに対して

$$
F(d\lambda)=\frac{\sigma^2}{2\pi}d\lambda
$$

と置きます。

<!-- definition-example-start: def-f0-00ts2-spectral-measure -->
**定義の確認**  
Fourier直交性から

$$
\int_{-\pi}^{\pi}e^{ih\lambda}
\frac{\sigma^2}{2\pi}d\lambda
=
\begin{cases}
\sigma^2,&h=0,\\
0,&h\ne0,
\end{cases}
$$

で、これはwhite noiseの自己共分散そのものです。従って定義を満たし、この $F$ がspectral measureです。
<!-- definition-example-end -->

全質量は

$$
\boxed{
F(\mathbb T)=\gamma(0)=\operatorname{Var}(X_t)
}
$$

です。したがって $F(A)$ は周波数領域 $A$ に割り当てられた分散量と読めます。

---

## 5. spectral density

<a id="def-f0-00ts2-spectral-density"></a>

<!-- formal-statement-start -->
> **定義（spectral density）**  
> spectral measure $F$ が円周上のLebesgue測度 $\lambda$ に絶対連続、すなわち $F\ll\lambda$ であるとき、Radon--Nikodym密度

$$
\boxed{
f(\lambda):=\frac{dF}{d\lambda}(\lambda)
}
$$

> をspectral densityと呼びます。
<!-- formal-statement-end -->

[Radon--Nikodym定理](../F0_00P2_密度_期待値_Radon_Nikodym/index.md#thm-f0-00p2-radon-nikodym)から、この密度はLebesgue-a.e. の意味で一意です。

### 5.1 例：white noiseはflat spectrum

<!-- definition-example-start: def-f0-00ts2-spectral-density -->
**定義の確認**  
前節で

$$
F(A)=\int_A\frac{\sigma^2}{2\pi}d\lambda
$$

と書けたので $F\ll\lambda$ です。従ってRadon--Nikodym密度は

$$
\boxed{
f(\lambda)=\frac{\sigma^2}{2\pi}}
$$

で一定です。これがflat spectrumです。
<!-- definition-example-end -->

密度が存在するとHerglotz表示は

$$
\boxed{
\gamma(h)=\int_{-\pi}^{\pi}e^{ih\lambda}f(\lambda)d\lambda
}
$$

になります。

---

## 6. 自己共分散が絶対可算和可能なら逆Fourier級数がdensityになる

<a id="thm-f0-00ts2-absolute-summable-density"></a>

<!-- formal-statement-start -->
> **定理（絶対可算和可能な自己共分散のspectral density）**  
> 自己共分散列が

$$
\sum_{h\in\mathbb Z}|\gamma(h)|<\infty
$$

> を満たすならspectral measureはLebesgue測度に絶対連続で、連続なspectral density

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

<!-- proof-start -->
### 証明

絶対可算和可能性からFourier級数はWeierstrassのM-testにより $\lambda$ に一様収束し、連続関数 $f$ を定めます。

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

従って $f(\lambda)d\lambda$ はHerglotz表示を与える有限非負測度です。Herglotz表現の一意性からこれはspectral measure $F$ そのものなので

$$
F(d\lambda)=f(\lambda)d\lambda.
$$

$\square$
<!-- proof-end -->

「逆Fourier級数を書けばよい」の裏には、絶対収束・非負性・Herglotz一意性が入っています。

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

TS3ではこれがAR(1)のtransfer functionから同じ形で出ることを確認します。

---

## 8. spectral measureは常にあるがdensityは常にあるとは限らない

$0<\omega_0<\pi$、$\Phi\sim\operatorname{Unif}(0,2\pi)$ とし

$$
X_t=A\cos(\omega_0t+\Phi)
$$

とします。積和公式から

$$
\gamma(h)=\frac{A^2}{2}\cos(\omega_0h).
$$

そこで

$$
\boxed{
F=
\frac{A^2}{4}\delta_{\omega_0}
+
\frac{A^2}{4}\delta_{-\omega_0}
}
$$

と置けば

$$
\int e^{ih\lambda}F(d\lambda)
=
\frac{A^2}{2}\cos(\omega_0h)
=
\gamma(h).
$$

この $F$ は点質量を持つためLebesgue測度に絶対連続ではありません。従って通常の関数としてのspectral densityは持ちません。

$$
\boxed{
\text{spectral measureは常に存在}
\quad\not\Rightarrow\quad
\text{spectral densityが存在}
}
$$

です。

---

## 9. Wold分解との接続

[purely nondeterministicなWold表現](../F0_00TS1_定常過程_Hilbert予測_Wold/index.md#cor-f0-00ts1-pnd-wold)は

$$
X_t=\sum_{j=0}^{\infty}\psi_j\varepsilon_{t-j}
$$

でした。

white noise innovationはflat spectrumを持ちます。線形filter

$$
\Psi(e^{-i\lambda})
=
\sum_{j=0}^{\infty}\psi_je^{-ij\lambda}
$$

が周波数ごとの強さを変え、一般の連続スペクトルを作ります。TS3では

$$
f_X(\lambda)
=
|\Psi(e^{-i\lambda})|^2f_\varepsilon(\lambda)
$$

を導きます。

---

## 10. spectral representationへの入口

Herglotz定理は **自己共分散列** を測度へ移す定理です。さらに進むと、過程そのものを適切な直交増分ランダム測度 $Z$ によって

$$
X_t
=
\int_{\mathbb T}e^{it\lambda}Z(d\lambda)
$$

と表すspectral representation theoremがあります。

互いに素な周波数集合 $A,B$ では

$$
E[Z(A)\overline{Z(B)}]=0,
$$

かつ

$$
E|Z(A)|^2=F(A)
$$

となります。

ただしこれはHerglotzより一段深く、ランダム測度の $L^2$ 構成が必要です。この章では **Herglotzを完全に証明し、spectral representation theoremはその先の発展事項として切り分けます。**

---

## 11. periodogram

<a id="def-f0-00ts2-periodogram"></a>

<!-- formal-statement-start -->
> **定義（periodogram）**  
> 中心化した有限標本 $x_0,\dots,x_{n-1}$ に対し

$$
D_n(\lambda)
:=
\sum_{t=0}^{n-1}x_te^{-it\lambda}
$$

> を離散Fourier変換とし、

$$
\boxed{
I_n(\lambda)
:=
\frac1{2\pi n}|D_n(\lambda)|^2
}
$$

> をperiodogramと呼びます。
<!-- formal-statement-end -->

### 11.1 例：2点標本 $(1,-1)$

<!-- definition-example-start: def-f0-00ts2-periodogram -->
**定義の確認**  
$n=2$、$(x_0,x_1)=(1,-1)$ なら

$$
D_2(\lambda)=1-e^{-i\lambda}.
$$

従って定義どおり

$$
I_2(\lambda)
=
\frac1{4\pi}|1-e^{-i\lambda}|^2
=
\frac{1-\cos\lambda}{2\pi}.
$$

これは非負で、$\lambda=\pi$ 付近が大きくなります。交互に符号が変わる標本が高周波側へ強さを持つことと整合します。
<!-- definition-example-end -->

periodogramは標本から計算するランダム量であり、母過程のspectral densityそのものではありません。一般に生のperiodogramは各周波数でそのまま一致推定量にはならず、実務では平滑化などを使います。

---

# 12. 演習

## F0-00TS2-A01 white noiseのspectral measure

- Level: A
- 目安時間: 10分

分散 $\sigma^2$ のwhite noiseについて

$$
F(d\lambda)=\frac{\sigma^2}{2\pi}d\lambda
$$

がspectral measureであることをHerglotz表示から確認し、全質量を求めよ。

<!-- solution-start -->
### 詳細解答

Fourier直交性から

$$
\int e^{ih\lambda}\frac{\sigma^2}{2\pi}d\lambda
=\sigma^2\mathbf1_{\{h=0\}}
=\gamma(h).
$$

よってHerglotz表示を満たす。一意性からこれがspectral measure。全質量は

$$
F(\mathbb T)=\sigma^2=\gamma(0).
$$

### 本番答案

$h=0$ では積分値 $\sigma^2$、$h\ne0$ では0。従って自己共分散列と一致し、全質量は $\sigma^2$。

### 採点基準（20点）
- Fourier直交性：8点
- Herglotz表示との一致：7点
- 全質量：5点
<!-- solution-end -->

## F0-00TS2-A02 自己共分散列の正定値性

- Level: A
- 目安時間: 12分

平均0の二次定常過程について

$$
\sum_{j,k}c_j\overline{c_k}\gamma(t_j-t_k)\ge0
$$

を確率変数の二乗ノルムとして示せ。

<!-- solution-start -->
### 詳細解答

二次定常性から

$$
E[X_{t_j}X_{t_k}]=\gamma(t_j-t_k).
$$

従って

$$
\sum_{j,k}c_j\overline{c_k}\gamma(t_j-t_k)
=
E\left|\sum_jc_jX_{t_j}\right|^2\ge0.
$$

### 本番答案

左辺を $E|\sum_jc_jX_{t_j}|^2$ と書けば非負。

### 採点基準（20点）
- 共分散との置換：8点
- 二乗ノルムへの整理：8点
- 非負性：4点
<!-- solution-end -->

## F0-00TS2-B01 Herglotz近似密度のFourier係数

- Level: B
- 目安時間: 18分

$$
f_n(\lambda)
=
\frac1{2\pi n}
\sum_{j,k=0}^{n-1}\gamma(j-k)e^{-i(j-k)\lambda}
$$

について、(i) $f_n\ge0$、(ii) $\int f_n=\gamma(0)$、(iii) $|h|<n$ で

$$
\int e^{ih\lambda}f_n(\lambda)d\lambda
=
\left(1-\frac{|h|}{n}\right)\gamma(h)
$$

を示せ。

<!-- solution-start -->
### 詳細解答

(i) 正定値性で $c_j=e^{-ij\lambda}$ と置けば分子が非負。(ii) 積分すると $j=k$ だけが残り $n\gamma(0)/n=\gamma(0)$。(iii) $j-k=h$ の組だけが残り、その個数は $n-|h|$。

### 本番答案

正定値性と指数関数の直交性を使う。$j-k=h$ の組数が $n-|h|$ であることが係数 $1-|h|/n$ を与える。

### 採点基準（20点）
- 非負性：6点
- 全質量：6点
- Fourier係数：8点
<!-- solution-end -->

## F0-00TS2-B02 random phase sinusoidのline spectrum

- Level: B
- 目安時間: 18分

$0<\omega_0<\pi$、$\Phi\sim\operatorname{Unif}(0,2\pi)$ とし

$$
X_t=A\cos(\omega_0t+\Phi)
$$

とする。自己共分散を求め、spectral measureを点質量で表せ。spectral densityを持つかも答えよ。

<!-- solution-start -->
### 詳細解答

積和公式と位相の一様性から

$$
\gamma(h)=\frac{A^2}{2}\cos(\omega_0h).
$$

また

$$
\frac{A^2}{4}
\left(e^{ih\omega_0}+e^{-ih\omega_0}\right)
=\gamma(h)
$$

だから

$$
F=
\frac{A^2}{4}\delta_{\omega_0}
+
\frac{A^2}{4}\delta_{-\omega_0}.
$$

点質量を持つので $F\not\ll\lambda$、従って通常のspectral densityを持たない。

### 本番答案

$\gamma(h)=A^2\cos(\omega_0h)/2$、$F=(A^2/4)(\delta_{\omega_0}+\delta_{-\omega_0})$。原子を持つのでdensityなし。

### 採点基準（20点）
- 自己共分散：7点
- spectral measure：8点
- density判定：5点
<!-- solution-end -->

## F0-00TS2-B03 指数型自己共分散のspectral density

- Level: B
- 目安時間: 20分

$|\rho|<1$、$c>0$ とし

$$
\gamma(h)=c\rho^{|h|}
$$

とする。逆Fourier級数を計算してspectral densityを求めよ。

<!-- solution-start -->
### 詳細解答

絶対可算和可能なので

$$
f(\lambda)
=
\frac{c}{2\pi}
\left[
1+
\sum_{h=1}^{\infty}\rho^he^{-ih\lambda}
+
\sum_{h=1}^{\infty}\rho^he^{ih\lambda}
\right].
$$

二つの幾何級数を足して整理すると

$$
\boxed{
f(\lambda)
=
\frac{c(1-\rho^2)}
{2\pi(1-2\rho\cos\lambda+\rho^2)}.
}
$$

### 本番答案

$\sum_{h\ge1}(\rho e^{\pm i\lambda})^h$ を二つの幾何級数として計算し、上式を得る。

### 採点基準（20点）
- 逆Fourier級数：6点
- 幾何級数：8点
- 整理したdensity：6点
<!-- solution-end -->

---

## 章末チェック

- 正定値列を定義し、自己共分散列が正定値であることを示せる。
- 正定値列からHermite対称性と $|\gamma(h)|\le\gamma(0)$ を導ける。
- Herglotz近似密度 $f_n$ が非負になる理由を説明できる。
- 有限測度列の部分列選択を累積分布関数の対角選択から説明できる。
- Herglotz定理の存在・一意性を証明できる。
- spectral measureとspectral densityを定義し区別できる。
- 絶対可算和可能な自己共分散から逆Fourier級数を正当化できる。
- white noiseのflat spectrumとsinusoidのline spectrumを導ける。
- spectral representation theoremがHerglotzより一段深い別定理だと区別できる。
- periodogramと母spectral densityを区別できる。