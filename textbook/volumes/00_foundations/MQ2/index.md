# MQ2 変分原理・二次形式・基底状態

[MQ1](../MQ1/index.md) で自由 Hamiltonian の自己共役な実現と、その二次形式を得ました。ここから知りたいのは「どのエネルギーが許されるか」、特に最も低いエネルギーです。微分方程式 $H\psi=E\psi$ を直接解く前に、規格化した状態のエネルギー期待値を比較できれば、固有関数を知らなくてもエネルギーに上界を与えられます。

ただし、三つの問いは異なります。**期待値の下限はいくらか**、**その下限を実現する状態はあるか**、**実現するならそれは孤立固有値か**。この順番で、[非有界自己共役作用素のスペクトル表示](../QM6/index.md#thm-qm6-unbounded-self-adjoint-spectral) を使って変分原理を導きます。

## 1. 下に有界な Hamiltonian と Rayleigh 商

自己共役 $H$ のスペクトルが下に有界なら、試行状態の平均エネルギーを比較できます。自己共役性を仮定するのは、期待値が実数となり、スペクトル測度によって各エネルギーの寄与を意味付けられるからです。

<a id="def-mq2-semibounded"></a>

<!-- formal-statement-start -->
> **定義（下に有界な自己共役作用素）**  
> 複素 Hilbert 空間 $\mathcal H$ 上の稠密定義自己共役作用素 $H$ が下に有界であるとは、実数 $a$ が存在して、すべての $\psi\in D(H)$ に対し

$$
\langle\psi,H\psi\rangle\ge a\|\psi\|^2
$$

> が成立することをいう。内積は第2変数に線形とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mq2-semibounded -->
### 例：対角 Hamiltonian の下界を確認する

**定義の確認**

$\mathcal H=\mathbb C^3$、$H=\operatorname{diag}(-2,1,4)$ とします。$H^*=H$、$D(H)=\mathbb C^3$ です。任意の $z=(z_1,z_2,z_3)$ に対して

$$
\begin{aligned}
\langle z,Hz\rangle
&=-2|z_1|^2+|z_2|^2+4|z_3|^2\\
&=-2\|z\|^2+3|z_2|^2+6|z_3|^2\\
&\ge-2\|z\|^2.
\end{aligned}
$$

よって $a=-2$ が使えます。$z=e_1$ では等号なので、この下界は最良です。
<!-- definition-example-end -->

非零の試行状態を何倍しても平均エネルギーが変わらないよう、ノルムの二乗で割ります。

<a id="def-mq2-rayleigh-quotient"></a>

<!-- formal-statement-start -->
> **定義（Rayleigh 商）**  
> 自己共役作用素 $H$ と $\psi\in D(H)\setminus\{0\}$ に対し、Rayleigh 商を

$$
R_H(\psi)=\frac{\langle\psi,H\psi\rangle}{\|\psi\|^2}
$$

> と定める。$c\ne0$ なら $R_H(c\psi)=R_H(\psi)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mq2-rayleigh-quotient -->
### 例：対角行列で実際に割る

**定義の確認**

上の $H$ に $\psi=(1,1,0)$ を代入すると、$\langle\psi,H\psi\rangle=-2+1=-1$、$\|\psi\|^2=2$ なので $R_H(\psi)=-1/2$ です。$2\psi$ の分子は $4(-1)$、分母は $4\cdot2$ となり同じ値です。任意の非零 $z$ では各 $|z_j|^2/\|z\|^2$ が非負で総和 $1$ なので、商は固有値 $-2,1,4$ の加重平均になります。
<!-- definition-example-end -->

## 2. スペクトル下端は期待値の下限

有限次元では最小固有値を直接選べます。しかし自由粒子のように固有ベクトルが存在しない作用素にも、スペクトルの下端があります。ここを同じ原理で説明できるのがスペクトル定理です。

<a id="thm-mq2-variational-bottom"></a>

<!-- formal-statement-start -->
> **定理（スペクトル下端の変分原理）**  
> $\mathcal H\ne\{0\}$ 上の稠密定義自己共役作用素 $H$ が下に有界であるとする。このとき $E_0=\inf\sigma(H)$ は有限な実数であり、

$$
E_0
=\inf_{\substack{\psi\in D(H)\\\|\psi\|=1}}
\langle\psi,H\psi\rangle
=\inf_{\psi\in D(H)\setminus\{0\}}R_H(\psi)
$$

> が成り立つ。右辺の下限が達成されることは仮定しない。
<!-- formal-statement-end -->

まず、全ての期待値が $E_0$ 以上であることを示し、次に $E_0$ の直上の狭いスペクトル帯へ状態を集中させます。帯の幅を零へ送れば上から近づけます。

<!-- proof-start -->
### 証明

[QM6 の非有界自己共役スペクトル定理](../QM6/index.md#thm-qm6-unbounded-self-adjoint-spectral) で得られるスペクトル射影値測度を $P$ とし、$\mu_\psi(B)=\langle\psi,P(B)\psi\rangle$ と置きます。$\mu_\psi(\mathbb R)=\|\psi\|^2$ であり、$\psi\in D(H)$ なら $\int\lambda^2\,d\mu_\psi<\infty$ です。[Cauchy–Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz) を有限測度 $\mu_\psi$ 上で $|\lambda|$ と定数関数 $1$ に適用すると、

$$
\int|\lambda|\,d\mu_\psi
\le\left(\int\lambda^2\,d\mu_\psi\right)^{1/2}
\left(\int1\,d\mu_\psi\right)^{1/2}<\infty
$$

なので一次モーメントも有限となり、

$$
\langle\psi,H\psi\rangle
=\int_{\sigma(H)}\lambda\,d\mu_\psi(\lambda)
\ge E_0\int_{\sigma(H)}d\mu_\psi
=E_0\|\psi\|^2.
$$

ここで $E_0$ が有限であることを確認します。定義の下界 $a$ に対して $\langle\psi,(H-aI)\psi\rangle\ge0$ です。[非有界自己共役作用素のスペクトル表示](../QM6/index.md#thm-qm6-unbounded-self-adjoint-spectral) を非負な $H-aI$ に適用すると、そのスペクトルは $[0,\infty)$ に含まれ、$\sigma(H)\subset[a,\infty)$ です。非零 Hilbert 空間上の自己共役作用素のスペクトルは空でないので $E_0\in\mathbb R$ です。

逆側の不等式を証明します。任意の $\varepsilon>0$ を取ります。$E_0$ は閉集合 $\sigma(H)$ の下端なので $E_0\in\sigma(H)$ です。もし $P([E_0,E_0+\varepsilon))=0$ なら、$\mu_\psi$ は全ての状態について $[E_0+\varepsilon,\infty)$ に集中します。この台の上で $|\lambda-E_0|\ge\varepsilon$ なので、Borel 関数 $g(\lambda)=(\lambda-E_0)^{-1}$ を台の上で定義し、他では $0$ と置くと $\|g\|_\infty\le1/\varepsilon$ です。関数計算から $g(H)(H-E_0)=I$ が $D(H)$ 上で、$(H-E_0)g(H)=I$ が全空間上で成り立ちます（後者では $(\lambda-E_0)g(\lambda)=1$ が射影の台で成立し、$g(H)$ は $D(H)$ に写します）。従って $H-E_0$ は有界な逆作用素を持ち、$E_0\in\sigma(H)$ と矛盾します。よって $P([E_0,E_0+\varepsilon))\ne0$ です。

その射影の像にある非零元を一つ取り、ノルムで割って $\psi_\varepsilon$ とします。この元のスペクトル測度は有界区間 $[E_0,E_0+\varepsilon]$ に台を持つため

$$
\int\lambda^2\,d\mu_{\psi_\varepsilon}
\le\max\{|E_0|,|E_0+\varepsilon|\}^2
\|\psi_\varepsilon\|^2<\infty.
$$

よって $\psi_\varepsilon\in D(H)$ です。さらに

$$
E_0
\le\langle\psi_\varepsilon,H\psi_\varepsilon\rangle
=\int_{[E_0,E_0+\varepsilon)}\lambda\,d\mu_{\psi_\varepsilon}
\le E_0+\varepsilon
$$

となります。左からは全試行状態について $R_H\ge E_0$、右からは任意の $\varepsilon>0$ に対し $R_H(\psi_\varepsilon)\le E_0+\varepsilon$ です。従って二つの下限はともに $E_0$ です。$\square$
<!-- proof-end -->

**使い方**：任意の試行関数の期待値は下端に対する**上界** $E_0\le R_H(\psi)$ です。試行関数から勝手に下界を得たことにはなりません。下界は別の作用素不等式などによって証明します。

## 3. 作用素を適用できなくてもエネルギーを測る：閉二次形式

[MQ1 の二次形式](../MQ1/index.md#thm-mq1-bounded-potential) では、$D(H_0)=H^2$ より広い $H^1$ 上で勾配の二乗を積分できました。この拡張を、非負作用素の平方根によって一般化します。

<a id="def-mq2-closed-form"></a>

<!-- formal-statement-start -->
> **定義（下に有界な自己共役作用素の閉二次形式）**  
> 自己共役作用素 $H$ が $H\ge aI$ を満たすとする。非負自己共役作用素 $T=H-aI$ の非負平方根 $T^{1/2}$ をスペクトル関数計算で定め、形式定義域と二次形式を

$$
Q(H)=D(T^{1/2}),\qquad
q_H[\psi]=a\|\psi\|^2+\|T^{1/2}\psi\|^2
\quad(\psi\in Q(H))
$$

> と定める。$b>-a$ に対する形式ノルム $\|\psi\|_{q,b}^2=q_H[\psi]+b\|\psi\|^2$ で $Q(H)$ が完備なとき、この形式を閉形式という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mq2-closed-form -->
### 例：Fourier 側の微分次数の差

**定義の確認**

$\mathcal H=L^2(\mathbb R)$、$H_0=\mathcal F^{-1}M_{c\xi^2}\mathcal F$、$c=\hbar^2/(2m)>0$ では $a=0$ と取れます。平方根は $\mathcal F^{-1}M_{\sqrt c|\xi|}\mathcal F$ なので

$$
\begin{aligned}
D(H_0)&=\{\psi:\xi^2\widehat\psi\in L^2\}=H^2(\mathbb R),\\
Q(H_0)&=\{\psi:|\xi|\widehat\psi\in L^2\}=H^1(\mathbb R),\\
q_{H_0}[\psi]&=c\int_{\mathbb R}\xi^2|\widehat\psi(\xi)|^2\,d\xi.
\end{aligned}
$$

例えば $\widehat\psi(\xi)=(1+\xi^2)^{-1}$ は $|\widehat\psi|^2\asymp|\xi|^{-4}$ です。$|\xi|^2|\widehat\psi|^2\asymp|\xi|^{-2}$ は積分できますが、$|\xi|^4|\widehat\psi|^2\asymp1$ は積分できません。従って $\psi\in Q(H_0)\setminus D(H_0)$ です。$b=1$ とすると、$\|\psi\|_{q,1}^2=\int(1+c\xi^2)|\widehat\psi|^2$ は $H^1$ ノルムと同値で完備です。
<!-- definition-example-end -->

<a id="thm-mq2-form-extension"></a>

<!-- formal-statement-start -->
> **定理（閉形式による変分原理）**  
> $\mathcal H\ne\{0\}$ の下に有界な自己共役作用素 $H\ge aI$ について、上記 $q_H$ は閉形式であり、$D(H)\subset Q(H)$、$\psi\in D(H)$ なら $q_H[\psi]=\langle\psi,H\psi\rangle$ である。さらに

$$
\inf\sigma(H)
=\inf_{\substack{\psi\in Q(H)\\\|\psi\|=1}}q_H[\psi]
$$

> が成り立つ。
<!-- formal-statement-end -->

証明の要点は、形式ノルムが平方根作用素のグラフノルムそのものであり、閉性を非負平方根作用素のグラフの閉性から得られることです。

<!-- proof-start -->
### 証明

$T=H-aI$ とします。スペクトル積分の定義域条件を $T$ と $T^{1/2}$ に適用すると、

$$
\begin{aligned}
D(H)&=\left\{\psi:\int(\lambda-a)^2\,d\mu_\psi(\lambda)<\infty\right\},\\
Q(H)&=\left\{\psi:\int(\lambda-a)\,d\mu_\psi(\lambda)<\infty\right\}.
\end{aligned}
$$

$\lambda-a\ge0$ で $t\le(1+t^2)/2$ が成立するので、$D(H)\subset Q(H)$ です。$\psi\in D(H)$ では $\langle\psi,H\psi\rangle=\int\lambda\,d\mu_\psi$、一方

$$
q_H[\psi]
=a\|\psi\|^2+\int(\lambda-a)\,d\mu_\psi
=\int\lambda\,d\mu_\psi
$$

となり一致します。

$b=1-a$ を選ぶと $b>-a$ であり、

$$
\|\psi\|_{q,1-a}^2
=q_H[\psi]+(1-a)\|\psi\|^2
=\|\psi\|^2+\|T^{1/2}\psi\|^2.
$$

$T^{1/2}$ はスペクトル関数計算から自己共役、従って閉作用素です。このノルムについて Cauchy な列 $(\psi_n)$ では、$\psi_n\to\psi$ と $T^{1/2}\psi_n\to g$ が $\mathcal H$ で成立します。閉作用素のグラフの閉性より $\psi\in D(T^{1/2})$、$T^{1/2}\psi=g$ です。従って $Q(H)$ は形式ノルムについて完備です。

下端を $E_0$ と置くと $q_H[\psi]=\int\lambda\,d\mu_\psi\ge E_0\|\psi\|^2$ が全ての $\psi\in Q(H)$ に成立します。一方 $D(H)\subset Q(H)$ であり、前定理の $D(H)$ 上の正規化列 $\psi_\varepsilon$ は $q_H[\psi_\varepsilon]\le E_0+\varepsilon$ を満たします。従って $Q(H)$ 上の下限も $E_0$ です。$\square$
<!-- proof-end -->

<a id="prop-mq2-bounded-potential-form"></a>

<!-- formal-statement-start -->
> **命題（有界実ポテンシャルの形式）**  
> $c>0$、$V\in L^\infty(\mathbb R^d)$ を実数値とし、$H=-c\Delta+M_V$ を $D(H)=H^2(\mathbb R^d)$ 上で取る。このとき $Q(H)=H^1(\mathbb R^d)$ であり、

$$
q_H[\psi]
=c\int_{\mathbb R^d}|\xi|^2|\widehat\psi(\xi)|^2\,d\xi
+\int_{\mathbb R^d}V(x)|\psi(x)|^2\,dx.
$$

<!-- formal-statement-end -->

この命題では **$H$ の定義域を $H^1$ に変更したのではありません**。

<!-- proof-start -->
### 証明

$K=\|V\|_\infty$ として $H\ge-KI$ です。[MQ1 の有界摂動の自己共役性](../MQ1/index.md#thm-mq1-bounded-potential) により $D(H)=H^2$ で自己共役です。まず $H^2$ 上で Fourier 表示を使うと

$$
\langle\psi,H\psi\rangle
=c\int|\xi|^2|\widehat\psi|^2+\int V|\psi|^2.
$$

この式で定まる形式 $r$ は $H^1$ に連続的に延長できます。実際

$$
\begin{aligned}
r[\psi]+(K+1)\|\psi\|^2
&\ge c\int|\xi|^2|\widehat\psi|^2+\|\psi\|^2,\\
r[\psi]+(K+1)\|\psi\|^2
&\le c\int|\xi|^2|\widehat\psi|^2+(2K+1)\|\psi\|^2.
\end{aligned}
$$

従ってこの形式ノルムは $H^1$ ノルムと同値です。$H^1$ の完備性は [MQ1 の二次形式の節](../MQ1/index.md#thm-mq1-bounded-potential) にある Fourier 重み付き $L^2$ の議論で従います。

この閉形式が $q_H$ と一致することを確認します。スペクトル測度で $\psi\in Q(H)$ に対し $P([-K,n])\psi$ を考えると、$\|\,\cdot\,\|_{q,K+1}$ に関する差の二乗は

$$
\int_{(n,\infty)}(\lambda+K+1)\,d\mu_\psi(\lambda)\longrightarrow0
$$

です（単調収束で定義された有限積分の尾部）。各切断状態は $D(H)$ に属します。従って $D(H)$ は $q_H$ の形式 core です。また Fourier 側で $\widehat\psi$ を大きな球に切断し、その球より少し大きな球の内部で $C_c^\infty$ 関数に平滑化すると、$\int(1+|\xi|^2)|\widehat\psi_n-\widehat\psi|^2\,d\xi\to0$ となります。逆 Fourier 変換した $\psi_n$ は Schwartz 関数なので $H^2$ に属し、従って $H^2$ は $H^1$ で稠密です。両方の閉形式は $H^2$ 上で同じ値を持ち、それぞれの形式ノルムでの完備化で一意に一致します。このため $Q(H)=H^1$ かつ $q_H=r$ です。$\square$
<!-- proof-end -->

この議論で新しく可能になったのは、$H\psi$ を定義できない $H^1$ 関数も試行状態に使うことです。演習では折れ線のような、二階微分が $L^2$ にない状態にも注目します。

## 4. 基底状態が存在するとは限らない

変分原理は常に**下限**を与えます。下限を達成できるかどうかは別問題です。

<a id="def-mq2-ground-state"></a>

<!-- formal-statement-start -->
> **定義（基底状態）**  
> 下に有界な自己共役作用素 $H$ のスペクトル下端を $E_0=\inf\sigma(H)$ とする。非零の $\psi_0\in D(H)$ が

$$
H\psi_0=E_0\psi_0
$$

> を満たすとき、$\psi_0$ を基底状態（基底固有ベクトル）、$E_0$ を基底状態エネルギーという。下端が固有値でなければ、基底状態は存在しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mq2-ground-state -->
### 例：存在する場合としない場合

**定義の確認**

$H=\operatorname{diag}(-2,1,4)$ では $He_1=-2e_1$、$\|e_1\|=1$、$-2=\inf\sigma(H)$ なので $e_1$ は基底状態です。一方、$L^2((0,1))$ 上の $(M_xf)(x)=xf(x)$ は有界自己共役で、スペクトルは $[0,1]$ です。$M_xf=0$ なら $xf(x)=0$ がほとんど至る所で成り立ち、$x>0$ がほとんど至る所なので $f=0$ です。よってスペクトル下端 $0$ は固有値でありません。
<!-- definition-example-end -->

<a id="thm-mq2-ground-minimizer"></a>

<!-- formal-statement-start -->
> **定理（最小化状態と固有状態）**  
> 下に有界な自己共役 $H$ の閉形式を $q_H$、スペクトル下端を $E_0$ とする。単位ベクトル $\psi\in Q(H)$ について

$$
q_H[\psi]=E_0
\quad\Longleftrightarrow\quad
\psi\in D(H),\ H\psi=E_0\psi.
$$

<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$E_0\ge a$ とし、$q_H[\psi]-E_0\|\psi\|^2$ をスペクトル表示で書くと

$$
q_H[\psi]-E_0\|\psi\|^2
=\int_{[E_0,\infty)}(\lambda-E_0)\,d\mu_\psi(\lambda)\ge0.
$$

等号なら、任意の $n\ge1$ について

$$
0\ge\int_{[E_0+1/n,\infty)}(\lambda-E_0)\,d\mu_\psi
\ge\frac1n\mu_\psi([E_0+1/n,\infty))
$$

です。よって各区間の測度が零で、可算和 $(E_0,\infty)=\bigcup_{n\ge1}[E_0+1/n,\infty)$ の測度も零になります。スペクトル測度は $\{E_0\}$ に集中します。すると $\int\lambda^2\,d\mu_\psi=E_0^2\|\psi\|^2<\infty$ なので $\psi\in D(H)$、さらに

$$
\|(H-E_0)\psi\|^2
=\int(\lambda-E_0)^2\,d\mu_\psi=0
$$

となります。逆に $H\psi=E_0\psi$ なら $q_H[\psi]=\langle\psi,H\psi\rangle=E_0\|\psi\|^2$ です。$\square$
<!-- proof-end -->

### 基底固有値が孤立する十分条件

[MQ1 の本質スペクトルの定義](../MQ1/index.md#def-mq1-essential-spectrum) を使うと、十分条件を一つ記述できます。

<a id="prop-mq2-gap-ground"></a>

<!-- formal-statement-start -->
> **命題（本質スペクトルより下の基底固有値）**  
> 下に有界な自己共役作用素 $H$ について、$E_0=\inf\sigma(H)$ とする。$\sigma_{\mathrm{ess}}(H)\ne\varnothing$ のとき、もし

$$
E_0<\inf\sigma_{\mathrm{ess}}(H)
$$

> なら、$E_0$ は孤立した有限重複度の固有値であり、基底状態が存在する。$\sigma_{\mathrm{ess}}(H)=\varnothing$ の場合も、同じ結論が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$E_0$ は閉集合 $\sigma(H)$ の点です。仮定によって $E_0\notin\sigma_{\mathrm{ess}}(H)$ です。[離散スペクトルと本質スペクトルの定義](../MQ1/index.md#def-mq1-essential-spectrum) より $\sigma(H)\setminus\sigma_{\mathrm{ess}}(H)$ は孤立した有限重複度の固有値の集合です。よって $E_0$ はその一つです。$\sigma_{\mathrm{ess}}(H)=\varnothing$ でも全てのスペクトル点が離散固有値という同じ定義を適用できます。$\square$
<!-- proof-end -->

この条件は十分条件であり必要条件ではありません。例えば零作用素を無限次元 Hilbert 空間で考えると、下端 $0$ は無限重複度の固有値ですが、本質スペクトルに属します。逆に自由粒子は [MQ1 の結果](../MQ1/index.md#thm-mq1-free-spectrum) により $E_0=0$ でも固有状態を持ちません。

## 5. 有限次元の Rayleigh–Ritz と min–max

無限次元で直接最小化するのが難しいとき、有限個の試行関数が張る空間 $S$ に制限します。これは定義域の問題を無視する近似ではなく、$S\subset Q(H)$ を条件として行う近似です。

<a id="prop-mq2-rayleigh-ritz"></a>

<!-- formal-statement-start -->
> **命題（Rayleigh–Ritz の上界と単調性）**  
> $H$ を下に有界な自己共役作用素とし、$S\subset Q(H)$ を有限次元の非零部分空間とする。

$$
E(S):=\min_{\substack{\psi\in S\\\|\psi\|=1}}q_H[\psi]
$$

> は存在し、$E_0=\inf\sigma(H)\le E(S)$ である。$S_1\subset S_2$ なら $E(S_2)\le E(S_1)$。$S_n$ が増大し、その和集合が形式ノルムで $Q(H)$ に稠密なら $E(S_n)\downarrow E_0$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

有限次元の単位球面はコンパクトで、$q_H$ はそこで連続なので最小値があります。$S\subset Q(H)$ に対する最小化は $Q(H)$ 全体より候補が少ないため、$E_0\le E(S)$ です。包含 $S_1\subset S_2$ では後者の候補が増えるので $E(S_2)\le E(S_1)$ です。

収束には任意の $\varepsilon>0$ に対し $\psi\in Q(H)$、$\|\psi\|=1$ で $q_H[\psi]<E_0+\varepsilon/2$ を選びます。形式稠密性により $u_n\in S_n$ で $\|u_n-\psi\|_{q,b}\to0$ とできます。$b>-a$ なら形式ノルムは Hilbert ノルムを支配するので $\|u_n\|\to1$ です。また、形式を生成する $T^{1/2}$ について $\|T^{1/2}u_n-T^{1/2}\psi\|\to0$ ですから

$$
q_H[u_n]=a\|u_n\|^2+\|T^{1/2}u_n\|^2\longrightarrow q_H[\psi].
$$

従って $\|u_n\|^{-2}q_H[u_n]\to q_H[\psi]$、十分大きい $n$ で $E(S_n)\le q_H[u_n]/\|u_n\|^2<E_0+\varepsilon$ です。単調性と下界を合わせて主張が従います。$\square$
<!-- proof-end -->

一般の基底 $\varphi_1,\ldots,\varphi_N\in Q(H)$ では行列

$$
A_{ij}=q_H(\varphi_i,\varphi_j),\qquad
G_{ij}=\langle\varphi_i,\varphi_j\rangle
$$

を作ります。ここで $q_H(\cdot,\cdot)$ は複素偏極で定めた第2変数線形の双線形でなく**半双線形形式**です。$\varphi_i$ が一次独立なら $G$ は正定値で、$\psi=\sum_j c_j\varphi_j$ に対し $R(\psi)=(c^*Ac)/(c^*Gc)$ です。最小値は一般化固有値問題 $Ac=\lambda Gc$ の最小固有値となります。直交規格化基底なら $G=I$ です。

### min–max 原理への入口：有限次元の第 $k$ 固有値

最小固有値以外を狙うときは、低い固有ベクトルを何方向まで避けるかが重要になります。

<a id="thm-mq2-finite-minmax"></a>

<!-- formal-statement-start -->
> **定理（有限次元の min–max 原理）**  
> $\mathbb C^N$ 上の自己共役行列 $A$ の固有値を重複度込みで $\lambda_1\le\cdots\le\lambda_N$ とする。$1\le k\le N$ について

$$
\lambda_k
=\min_{\dim S=k}\ \max_{\substack{x\in S\\\|x\|=1}}\langle x,Ax\rangle
=\max_{\dim L=N-k+1}\ \min_{\substack{x\in L\\\|x\|=1}}\langle x,Ax\rangle.
$$

<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

直交規格化固有基底 $e_1,\ldots,e_N$ を選び $x=\sum_{j=1}^Nc_je_j$ とすると

$$
\langle x,Ax\rangle=\sum_{j=1}^N\lambda_j|c_j|^2,\qquad
\|x\|^2=\sum_{j=1}^N|c_j|^2.
$$

任意の $k$ 次元 $S$ と $W=\operatorname{span}\{e_k,\ldots,e_N\}$ は、$\dim S+\dim W=k+(N-k+1)=N+1$ より $S\cap W$ に非零元を持ちます。そこから単位元 $x$ を取ると $c_1=\cdots=c_{k-1}=0$ なので

$$
\langle x,Ax\rangle=\sum_{j=k}^N\lambda_j|c_j|^2
\ge\lambda_k\sum_{j=k}^N|c_j|^2=\lambda_k.
$$

従ってどの $S$ についても最大値は $\lambda_k$ 以上です。一方 $S_0=\operatorname{span}\{e_1,\ldots,e_k\}$ なら、全ての単位 $x\in S_0$ で期待値は $\lambda_k$ 以下、$x=e_k$ で等号です。よって最初の等式が出ます。

二番目も次元交差を逆に使います。任意の $(N-k+1)$ 次元 $L$ は $\operatorname{span}\{e_1,\ldots,e_k\}$ と非自明に交わります。そこから単位 $x$ を取ると期待値は $\lambda_k$ 以下です。他方 $L_0=\operatorname{span}\{e_k,\ldots,e_N\}$ では全単位元の期待値が $\lambda_k$ 以上、$e_k$ で等号となります。$\square$
<!-- proof-end -->

**無限次元への注意**：いま完全に証明したのは有限次元版です。一般の無限次元作用素で第 $k$ 固有値に同じ式を使うには、本質スペクトルの下にある離散固有値を数える条件などが必要です。次の具体的計算では、まずスペクトル下端の変分原理（$k=1$ に相当する評価）を使います。

## 6. 実際に試行関数を積分する

一次元で $m,\hbar,V_0,a>0$ として

$$
H=-\frac{\hbar^2}{2m}\frac{d^2}{dx^2}
-V_0e^{-x^2/a^2},\qquad D(H)=H^2(\mathbb R)
$$

を考えます。実有界ポテンシャルなので [MQ1 の定理](../MQ1/index.md#thm-mq1-bounded-potential) により自己共役で、形式定義域は $H^1$ です。正規化 Gaussian

$$
\psi_b(x)=(\pi b^2)^{-1/4}\exp\left(-\frac{x^2}{2b^2}\right),
\qquad b>0
$$

を試行します。$|\psi_b|^2=(\sqrt\pi b)^{-1}e^{-x^2/b^2}$ なので、$y=x/b$ と変数変換して

$$
\|\psi_b\|_2^2
=\frac1{\sqrt\pi b}\int_{\mathbb R}e^{-x^2/b^2}\,dx
=\frac1{\sqrt\pi}\int_{\mathbb R}e^{-y^2}\,dy=1
$$

です。導関数は $\psi_b'(x)=-x\psi_b(x)/b^2$ です。Gaussian の二次モーメント $\int y^2e^{-y^2}dy=\sqrt\pi/2$ を、$I(t)=\int e^{-ty^2}dy=\sqrt{\pi/t}$ を微分して $-I'(1)=\sqrt\pi/2$ と確かめると、

$$
\begin{aligned}
\int|\psi_b'|^2\,dx
&=\frac1{b^4}\frac1{\sqrt\pi b}\int x^2e^{-x^2/b^2}\,dx\\
&=\frac1{b^2\sqrt\pi}\int y^2e^{-y^2}\,dy
=\frac1{2b^2}.
\end{aligned}
$$

ポテンシャル項では指数をまとめます。

$$
\begin{aligned}
\int e^{-x^2/a^2}|\psi_b|^2\,dx
&=\frac1{\sqrt\pi b}\int
\exp\left[-\left(\frac1{a^2}+\frac1{b^2}\right)x^2\right]dx\\
&=\frac1{b\sqrt{a^{-2}+b^{-2}}}
=\frac a{\sqrt{a^2+b^2}}.
\end{aligned}
$$

従って Rayleigh 商は

$$
R_H(\psi_b)=\frac{\hbar^2}{4mb^2}
-\frac{V_0a}{\sqrt{a^2+b^2}}.
$$

これは厳密に計算した**スペクトル下端の上界**です。さらに $b\ge a$ なら $\sqrt{a^2+b^2}\le\sqrt2b$ であり、

$$
R_H(\psi_b)
\le\frac{\hbar^2}{4mb^2}-\frac{V_0a}{\sqrt2\,b}<0
\quad\text{if}\quad
b>\max\left\{a,\frac{\sqrt2\,\hbar^2}{4mV_0a}\right\}.
$$

従って $E_0=\inf\sigma(H)<0$ と分かります。しかしこの計算**だけ**では、$E_0$ が固有値であることは証明していません。離散固有値を結論するには、例えば本質スペクトルの下端が $0$ 以上であることを別に検証し、前節の十分条件を適用します。試行関数は固有関数の「近似候補」であって、固有関数と同一ではありません。

## 7. 演習

前提を特記しなければ複素 Hilbert 空間で内積は第2変数に線形です。変分原理の適用では、まず自己共役性・下界・試行ベクトルの形式定義域を確認してください。

### Level A

### A1. Rayleigh 商は加重平均

$H=\operatorname{diag}(-3,2,5)$、$z=(1,2,0)$ とする。$R_H(z)$ と $\inf\sigma(H)$ を求め、両者の大小関係を確かめよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$H^*=H$、$D(H)=\mathbb C^3$ なので変分原理が使えます。$Hz=(-3,4,0)$、$\langle z,Hz\rangle=-3+8=5$、$\|z\|^2=1+4=5$ より $R_H(z)=1$ です。スペクトルは対角成分全体 $\{-3,2,5\}$ なので $E_0=-3$。実際 $1\ge-3$ です。$R_H(z)=(-3)(1/5)+2(4/5)$ も確認できます。
<!-- solution-end -->

### A2. 基底状態のないスペクトル下端

$L^2((0,1))$ 上の $H=M_x$ について、$\sigma(H)=[0,1]$、$E_0=0$ だが固有値 $0$ を持たないことを示せ。$f_n(x)=\sqrt n\,\mathbf1_{(0,1/n)}(x)$ を試せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$M_x$ は実有界関数 $x$ を掛ける有界自己共役作用素なので全 $L^2$ で定義されます。$\lambda\notin[0,1]$ では $|x-\lambda|^{-1}$ が本質有界なので逆作用素 $M_{1/(x-\lambda)}$ が存在します。$\lambda\in[0,1]$ では $|x-\lambda|$ が正測度集合で任意に小さくなり、有界な逆作用素は存在しないのでスペクトルは $[0,1]$ です。

$\|f_n\|^2=n(1/n)=1$。期待値は

$$
\langle f_n,Hf_n\rangle
=n\int_0^{1/n}x\,dx
=n\left[\frac{x^2}2\right]_0^{1/n}
=\frac1{2n}\to0.
$$

一方 $Hf=0$ なら $xf(x)=0$ ほとんど至る所 で、$x>0$ ほとんど至る所 より $f=0$ です。従って下限は近づけますが達成できません。
<!-- solution-end -->

### A3. 形式定義域と作用素定義域

$H_0=\mathcal F^{-1}M_{\xi^2}\mathcal F$ を $L^2(\mathbb R)$ 上で取り、$\widehat\psi(\xi)=(1+\xi^2)^{-1}$ とする。$\psi\in Q(H_0)$ か、$\psi\in D(H_0)$ かを判定せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$|\widehat\psi|^2=(1+\xi^2)^{-2}$ なので無限遠では $|\xi|^{-4}$ と同程度です。$Q(H_0)$ に必要なのは

$$
\int(1+\xi^2)|\widehat\psi|^2\,d\xi
=\int\frac{d\xi}{1+\xi^2}<\infty
$$

であり成立します。$D(H_0)$ に必要なのは $\int\xi^4|\widehat\psi|^2d\xi<\infty$ ですが、$\xi^4/(1+\xi^2)^2\to1$ より発散します。従って $\psi\in Q(H_0)\setminus D(H_0)$ です。
<!-- solution-end -->

### A4. 試行空間を広げる

$H=\operatorname{diag}(0,2,7)$ とし、$S_1=\operatorname{span}\{e_2\}$、$S_2=\operatorname{span}\{e_1,e_2\}$ に対する $E(S_1),E(S_2)$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$S_1$ の単位元は $ce_2$、$|c|=1$ なので $R_H(ce_2)=2$ で $E(S_1)=2$ です。$S_2$ の単位元 $x=c_1e_1+c_2e_2$ は $|c_1|^2+|c_2|^2=1$ を満たし、期待値は $0|c_1|^2+2|c_2|^2\ge0$ です。$x=e_1$ で等号なので $E(S_2)=0$。$S_1\subset S_2$ により $E(S_2)=0\le2=E(S_1)$ が確かめられます。
<!-- solution-end -->

### Level B

### B1. 形式最小化と固有値の違い

$\ell^2(\mathbb N)$ 上で $H(x_n)=(n^{-1}x_n)$ を全空間上の有界作用素として定める。$E_0$ と基底状態の有無を求め、Rayleigh 商が $E_0$ に近づく単位ベクトル列を構成せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$H$ は実対角有界自己共役作用素です。単位ベクトル $x=(x_n)$ に対して

$$
R_H(x)=\sum_{n=1}^\infty\frac{|x_n|^2}{n}\ge0.
$$

標準基底 $e_N$ を選ぶと $R_H(e_N)=1/N\to0$ なので、変分原理より $E_0=0$ です。一方 $Hx=0$ は成分ごとに $x_n/n=0$、すなわち全ての $x_n=0$ を強制します。よって $0$ は固有値でなく基底状態は存在しません。下限へ近づく列 $e_N$ は $N$ を大きくするほど高い添字へ逃げます。
<!-- solution-end -->

### B2. 一般化 Rayleigh–Ritz

独立な試行ベクトル $\varphi_1,\varphi_2$ の Gram 行列が $G=\operatorname{diag}(1,4)$、形式行列が $A=\operatorname{diag}(3,8)$ であるとする。$\psi=c_1\varphi_1+c_2\varphi_2$ の Rayleigh 商を求め、最小値とそれを実現する係数方向を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$G$ の対角成分が正なので正定値です。$c\ne0$ に対して

$$
R(c)=\frac{c^*Ac}{c^*Gc}
=\frac{3|c_1|^2+8|c_2|^2}{|c_1|^2+4|c_2|^2}.
$$

$w=|c_1|^2/(|c_1|^2+4|c_2|^2)$ と置けば $0\le w\le1$ で、

$$
R(c)=3w+2(1-w)=2+w\ge2.
$$

等号は $c_1=0,c_2\ne0$ で成立します。行列式でも $\det(A-\lambda G)=(3-\lambda)(8-4\lambda)=0$ の根が $2,3$ となり、最小一般化固有値は $2$ です。Gram 行列を恒等行列と誤認すると最小値を $3$ としてしまいます。
<!-- solution-end -->

### B3. min–max の第二固有値

$H=\operatorname{diag}(1,4,9)$ に対し、$\min_{\dim S=2}\max_{\|x\|=1,x\in S}\langle x,Hx\rangle$ を求め、任意の二次元部分空間でこれより小さくならないことを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

任意の二次元 $S\subset\mathbb C^3$ と $W=\operatorname{span}\{e_2,e_3\}$ は $\dim S+\dim W=4>3$ より非零の交わりを持ちます。$x\in S\cap W$ を単位に取り、$x=c_2e_2+c_3e_3$ とすると

$$
\langle x,Hx\rangle=4|c_2|^2+9|c_3|^2
\ge4(|c_2|^2+|c_3|^2)=4.
$$

従って全ての $S$ で最大値 $\ge4$ です。$S_0=\operatorname{span}\{e_1,e_2\}$ では単位 $x=c_1e_1+c_2e_2$ の期待値は $|c_1|^2+4|c_2|^2\le4$ で、$e_2$ で等号です。ゆえに求める値は $4$ です。
<!-- solution-end -->

### B4. 運動エネルギーの下界と試行関数

$H=-c\,d^2/dx^2-V_0e^{-x^2/a^2}$、$c,V_0,a>0$ を $D(H)=H^2(\mathbb R)$ で考える。規格化 Gaussian $\psi_b(x)=(\pi b^2)^{-1/4}e^{-x^2/(2b^2)}$ を用い、$E_0\ge -V_0$ と $E_0\le c/(2b^2)-V_0a/\sqrt{a^2+b^2}$ を同時に示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$V(x)\ge-V_0$ と運動エネルギーの非負性から、任意の単位 $\psi\in D(H)$ について

$$
\langle\psi,H\psi\rangle
=c\int|\psi'|^2+\int V|\psi|^2
\ge0-V_0\|\psi\|^2=-V_0.
$$

変分原理で $E_0\ge-V_0$ です。一方 $\psi_b$ は滑らかで急減少するため $D(H)$ に属します。$x=by$ により

$$
\|\psi_b\|^2=\frac1{\sqrt\pi}\int e^{-y^2}dy=1,\qquad
\int|\psi_b'|^2=\frac1{b^2\sqrt\pi}\int y^2e^{-y^2}dy=\frac1{2b^2}.
$$

また

$$
\int e^{-x^2/a^2}|\psi_b|^2dx
=\frac1{\sqrt\pi b}\sqrt{\frac{\pi}{a^{-2}+b^{-2}}}
=\frac a{\sqrt{a^2+b^2}}.
$$

従って $R_H(\psi_b)=c/(2b^2)-V_0a/\sqrt{a^2+b^2}$ であり、$E_0\le R_H(\psi_b)$ です。二つを合わせた不等式は

$$
-V_0\le E_0\le\frac{c}{2b^2}-\frac{V_0a}{\sqrt{a^2+b^2}}
$$

です。左側は作用素の下界、右側は試行状態の上界に由来します。
<!-- solution-end -->

### Level C

### C1. 閉形式・試行評価・基底状態を一続きで判断する

$L^2(\mathbb R)$ 上で $H=-c\,d^2/dx^2-V_0e^{-x^2/a^2}$、$c,V_0,a>0$ を $D(H)=H^2(\mathbb R)$ で定める。

1. 自己共役性と $H\ge -V_0I$、$Q(H)=H^1$ を確認し、形式を書け。
2. 正規化 Gaussian $\psi_b$ を試行して $R_H(\psi_b)$ を導き、$E_0<0$ を保証する $b$ の明示条件を与えよ。
3. $E_0$ と $R_H(\psi_b)$ の大小関係を述べ、Gaussian が基底固有関数だとこの計算だけで言えない理由を説明せよ。
4. 追加のスペクトル解析によって $\inf\sigma_{\mathrm{ess}}(H)\ge0$ と証明できたと仮定すると、どの命題によって何が結論できるか。
5. $\sigma_{\mathrm{ess}}(H)$ に関する仮定を外したとき、変分原理の結論のうち何が残るか。

- Level: C

<!-- solution-start -->
#### 詳細解答

(1) $V(x)=-V_0e^{-x^2/a^2}$ は実数値で $-V_0\le V(x)\le0$、$\|V\|_\infty=V_0$ です。[MQ1 の有界ポテンシャルの定理](../MQ1/index.md#thm-mq1-bounded-potential) を $H_0=-c\,d^2/dx^2$ と $M_V$ に適用すると、$D(H)=D(H_0)=H^2$ で自己共役です。$q_H$ は

$$
q_H[\psi]=c\int_{\mathbb R}|\psi'(x)|^2dx
-V_0\int_{\mathbb R}e^{-x^2/a^2}|\psi(x)|^2dx,\quad \psi\in H^1.
$$

運動項が非負、$e^{-x^2/a^2}\le1$ なので $q_H[\psi]\ge-V_0\|\psi\|^2$ です。閉形式の命題から $Q(H)=H^1$ が従います。

(2) $\psi_b(x)=(\pi b^2)^{-1/4}e^{-x^2/(2b^2)}$ とします。$|\psi_b|^2=(\sqrt\pi b)^{-1}e^{-x^2/b^2}$ なので Gaussian 積分により $\|\psi_b\|=1$ です。微分は $\psi_b'(x)=-x\psi_b/b^2$、従って

$$
\begin{aligned}
c\int|\psi_b'|^2dx
&=\frac c{b^4}\frac1{\sqrt\pi b}\int x^2e^{-x^2/b^2}dx\\
&=\frac c{b^2\sqrt\pi}\int y^2e^{-y^2}dy=\frac c{2b^2}.
\end{aligned}
$$

位置項は係数の和を $a^{-2}+b^{-2}$ として

$$
\frac1{\sqrt\pi b}\int
e^{-(a^{-2}+b^{-2})x^2}dx
=\frac1{b\sqrt{a^{-2}+b^{-2}}}
=\frac a{\sqrt{a^2+b^2}}.
$$

ゆえに $R_H(\psi_b)=c/(2b^2)-V_0a/\sqrt{a^2+b^2}$。$b\ge a$ なら $\sqrt{a^2+b^2}\le\sqrt2\,b$ なので

$$
R_H(\psi_b)\le\frac c{2b^2}-\frac{V_0a}{\sqrt2\,b}<0
$$

となる十分条件は $b>\max\{a,c/(\sqrt2 V_0a)\}$ です。$c=\hbar^2/(2m)$ を用いると、本文の条件に一致します。

(3) $E_0=\inf\sigma(H)\le R_H(\psi_b)<0$ です。変分原理は最小化の上界しか与えず、$H\psi_b=E_0\psi_b$ という方程式を示していません。実際、$\psi_b''=(x^2/b^4-1/b^2)\psi_b$ なので

$$
\frac{H\psi_b}{\psi_b}
=\frac c{b^2}-\frac{cx^2}{b^4}-V_0e^{-x^2/a^2}
$$

は $x$ に依存し、定数の固有値にはなりません。

(4) 追加仮定 $\inf\sigma_{\mathrm{ess}}(H)\ge0$ と (2) の $E_0<0$ を合わせると $E_0<\inf\sigma_{\mathrm{ess}}(H)$ です（本質スペクトルが空の場合も含む）。[本質スペクトル下の基底固有値](#prop-mq2-gap-ground) を適用し、$E_0$ は孤立・有限重複度の固有値であり、非零の基底固有ベクトルが存在すると分かります。**本問では本質スペクトルの下界は追加仮定であり、試行積分から証明したことにはしません**。

(5) 追加仮定なしでも、自己共役性、$-V_0\le E_0<0$、$Q(H)=H^1$、Rayleigh 商による上界はすべて残ります。一方、この論証だけでは $E_0$ が固有値か、本質スペクトルかを区別できません。下端への近似列は作れても、基底状態が存在するとはまだ結論できません。
<!-- solution-end -->

## 8. まとめと次章

スペクトル下端は、定義域を明示した自己共役作用素について、単位状態のエネルギー期待値の下限と一致します。閉二次形式を用いると作用素定義域より広い状態も試せます。有限次元 Rayleigh–Ritz は真の下端に対する上界を与え、試行空間を増やすと上界が改善します。

一方、**下端の存在・下限の達成・離散固有値の存在は別**です。次の MQ3 では、調和振動子の Hamiltonian を具体的に解析し、最低エネルギーを実際に達成する固有関数とその上の準位を構成します。
