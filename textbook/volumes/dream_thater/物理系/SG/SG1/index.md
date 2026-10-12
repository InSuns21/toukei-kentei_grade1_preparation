# SG1 quenched disorder・Random Energy Model・凍結転移

[SM3 の正準分配関数](../../SM/SM3/index.md#def-sm3-canonical)は、エネルギーが与えられたとき、各微視的状態へ Boltzmann 重みを割り当てます。[SM7 の Curie–Weiss 模型](../../SM/SM7/index.md#def-sm7-cw)では相互作用係数を固定し、スピン配置について和を取りました。

ところが磁性体の不純物や結合のばらつきは、試料を作るたびに変わり得ます。試料を一つ選んだ後は、その無秩序は熱的なスピン変動とは別に固定されています。そこで「**先に熱平衡を計算して試料間で平均する**」ことと、「**先に試料間で Boltzmann 重みを平均する**」ことを分けます。この順序が、低温で劇的な差を生みます。

本章では配置ごとに独立な正規エネルギーを与える最も単純な無秩序模型を使い、圧力の極限をエネルギー帯ごとの状態数から証明します。結合からエネルギーの相関が生まれる Sherrington–Kirkpatrick（SK）模型は後続で扱います。

## 1. 熱揺らぎと試料ごとの無秩序

試料を表す外部確率変数を $J$、試料を固定した後のスピン配置を $\sigma$ とすると、二つの平均の順序が現れます。例えば試料が二通りあり、配置のエネルギーがそれぞれ異なるなら、分配関数 $Z(J)$ 自身が確率変数です。

ここでは Boltzmann 定数を1とし、逆温度 $\beta\ge0$ を使います。有限状態空間 $\Omega_N$ と、各試料で与えられる有限のエネルギー $H_N(\sigma;J)\in\mathbb R$ を考えます。試料の分布は $\mathbb P_J$、期待値は $\mathbb E_J$ と書きます。熱平均は試料 $J$ を固定してから定義するため、混同しません。

<a id="def-sg1-quenched"></a>

<!-- formal-statement-start -->
> **定義（quenched圧力とannealed圧力）**  
> 整数 $N\ge1$、有限な空でない $\Omega_N$、実数値のランダムエネルギー $H_N(\sigma;J)$ と $\beta\ge0$ に対し、有限分配関数を次で定める。

$$
Z_N(\beta,J)=\sum_{\sigma\in\Omega_N}e^{-\beta H_N(\sigma;J)}.
$$

> $Z_N>0$ がほとんど確実に成立し、以下の期待値が有限のとき、quenched圧力とannealed圧力をそれぞれ

$$
p_N^{\mathrm q}(\beta)=\frac1N\mathbb E_J[\log Z_N(\beta,J)],
\qquad
p_N^{\mathrm a}(\beta)=\frac1N\log\mathbb E_J[Z_N(\beta,J)]
$$

> と定める。個別試料のランダムな圧力は $P_N(\beta,J)=N^{-1}\log Z_N(\beta,J)$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg1-quenched -->
### 二つの試料を直接比較する

**定義の確認**：$\Omega=\{0,1\}$ とし、状態0のエネルギーは0、状態1のエネルギーは試料によって $+h$ または $-h$（各確率 $1/2$、$h>0$）とします。すると

$$
Z_+=1+e^{-\beta h},\qquad Z_-=1+e^{\beta h}.
$$

二つとも正で対数の平均を取れます。$\beta h>0$ なら $Z_+\ne Z_-$ なので、平均の順序を交換する根拠はありません。実際、

$$
\begin{aligned}
\mathbb E_J[\log Z]
 &=\frac12\log[(1+e^{-\beta h})(1+e^{\beta h})]
 =\log\!\left(2\cosh\frac{\beta h}{2}\right),\\
\log\mathbb E_J[Z]
 &=\log(1+\cosh\beta h)
 =\log2+2\log\cosh\frac{\beta h}{2}.
\end{aligned}
$$

後者と前者の差は $\log\cosh(\beta h/2)>0$ です。これは「分配関数を平均する」ことと「対数自由エネルギーを平均する」ことの差です。
<!-- definition-example-end -->

<a id="prop-sg1-jensen"></a>

<!-- formal-statement-start -->
> **命題（annealed圧力とquenched圧力の比較）**  
> [前の定義](#def-sg1-quenched)の条件のもとで、

$$
p_N^{\mathrm q}(\beta)\le p_N^{\mathrm a}(\beta).
$$

> 等号が成立するのは $Z_N(\beta,J)$ が試料に依存せず、ほとんど確実に定数となるとき、かつそのときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

「対数の平均は、平均の対数以下」を直接示します。重要なのは、差があること自体よりも、どちらの順序が物理的に固定された試料を表しているかです。

<!-- proof-start -->
### 証明

$m=\mathbb E_J Z_N>0$ と置きます。正の実数 $u$ に対して $\log u\le u-1$ が成り立ち、等号は $u=1$ の場合だけです。$u=Z_N/m$ を代入し、両辺を平均すると

$$
\mathbb E_J\left[\log\frac{Z_N}{m}\right]
\le\mathbb E_J\left[\frac{Z_N}{m}-1\right]
=\frac{\mathbb E_J Z_N}{m}-1=0.
$$

左辺は $\mathbb E_J\log Z_N-\log m$ なので、これを $N>0$ で割ると結論です。等号なら非負な量 $Z_N/m-1-\log(Z_N/m)$ の期待値が0ですから、その量がほとんど確実に0、すなわち $Z_N=m$ がほとんど確実に成立します。逆も明白です。
<!-- proof-end -->

quenched は「無秩序を固定してから $\log Z$ を計算」、annealed は「$Z$ を無秩序について平均してから $\log$」です。この不等式だけでは、両者の一スピンあたりの差が $N\to\infty$ で消えるかどうかは分かりません。

## 2. エネルギーそのものをランダムにする REM

SM7 の全結合模型では、異なる配置のエネルギーは同じ磁化を共有し相関します。ここではまず相関を外し、配置ごとに独立なエネルギーを与えます。これは通常の格子上の相互作用を表すというより、無秩序による極端な低エネルギー配置を抽出するための模型です。

<a id="def-sg1-rem"></a>

<!-- formal-statement-start -->
> **定義（Random Energy Model）**  
> 整数 $N\ge1$、配置集合 $\Omega_N=\{-1,+1\}^N$ を考える。$2^N$ 個の互いに独立な確率変数 $H_N(\sigma)$（$\sigma\in\Omega_N$）がそれぞれ平均0・分散 $N$ の正規分布に従うとする。これを本章の REM とする。分配関数は

$$
Z_N(\beta)=\sum_{\sigma\in\Omega_N}e^{-\beta H_N(\sigma)},
\qquad \beta\ge0
$$

> である。熱平均では全ての $H_N(\sigma)$ の実現値を固定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg1-rem -->
### 一スピンの REM を確認する

**定義の確認**：$N=1$ なら $\Omega_1=\{-1,+1\}$ の二配置に独立な $H_-,H_+\sim N(0,1)$ を割り当てます。どちらのエネルギーも実数値であり、$Z_1=e^{-\beta H_-}+e^{-\beta H_+}>0$ です。二つの配置のエネルギー差もランダムです。対して [Curie–Weiss 模型の定義](../../SM/SM7/index.md#def-sm7-cw)では同じ相互作用係数から配置のエネルギーを決めるため、この独立性は成立しません。
<!-- definition-example-end -->

$a=\sqrt{2\log2}$ と置きます。あるエネルギー密度 $-x$ を持つ配置は、だいたい $\exp(-Nx^2/2)$ の割合しかありません。しかし試行数は $2^N$ 個あるので、その帯にはおよそ $\exp[N(\log2-x^2/2)]$ 個の配置を期待できます。これが凍結を決める競争です。

<a id="prop-sg1-annealed-rem"></a>

<!-- formal-statement-start -->
> **命題（REMのannealed圧力）**  
> [REM](#def-sg1-rem)では全ての整数 $N\ge1$、$\beta\ge0$ に対して

$$
\mathbb E Z_N(\beta)=2^N e^{N\beta^2/2},
\qquad
p_N^{\mathrm a}(\beta)=\log2+\frac{\beta^2}{2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

正規確率変数の指数モーメントを平方完成で計算します。annealed 計算は簡単ですが、低温での典型的な試料を表すとは限りません。

<!-- proof-start -->
### 証明

$X\sim N(0,N)$ の密度は $(2\pi N)^{-1/2}\exp[-x^2/(2N)]$ です。実数 $t$ について

$$
tx-\frac{x^2}{2N}
=-\frac{(x-Nt)^2}{2N}+\frac{Nt^2}{2}.
$$

したがって正規密度の積分を $x-Nt$ へ平行移動すると

$$
\mathbb E e^{tX}
=\frac1{\sqrt{2\pi N}}\int_{\mathbb R}
e^{tx-x^2/(2N)}\,dx
=e^{Nt^2/2}.
$$

この式へ $t=-\beta$ を入れ、有限和と期待値を交換すると

$$
\mathbb E Z_N
=\sum_{\sigma\in\Omega_N}\mathbb E e^{-\beta H_N(\sigma)}
=\sum_{\sigma\in\Omega_N}e^{N\beta^2/2}
=2^N e^{N\beta^2/2}.
$$

最後に対数を取り $N$ で割ります。ここで必要なのは各配置の周辺分布が同じことだけで、独立性は期待値の計算自体には使っていません。
<!-- proof-end -->

## 3. エネルギー帯に何個の配置が残るか

典型的な試料の圧力を得るには、期待値で重み付けした珍しい試料ではなく、**一つの試料の中の配置数**を評価します。エネルギー密度 $Y_\sigma=-H_N(\sigma)/N$ が区間 $I$ に入る配置数を

$$
C_N(I)=|\{\sigma\in\Omega_N:Y_\sigma\in I\}|
$$

と置きます。$Y_\sigma$ は平均0・分散 $1/N$ の正規分布です。

<a id="lem-sg1-bins"></a>

<!-- formal-statement-start -->
> **補題（正規尾とエネルギー帯の状態数）**  
> [REM](#def-sg1-rem)を考え、$a=\sqrt{2\log2}$ とする。任意の $t>0$ に対し

$$
\mathbb P\!\left(\max_{\sigma\in\Omega_N}|Y_\sigma|>t\right)
\le 2^{N+1}e^{-Nt^2/2}.
$$

> 有界な区間 $I=[u,v]$（$u<v$）について

$$
2^N\sqrt{\frac{N}{2\pi}}(v-u)e^{-N\sup_{x\in I}x^2/2}
\le \mathbb E C_N(I)
\le 2^N\sqrt{\frac{N}{2\pi}}(v-u)e^{-N\inf_{x\in I}x^2/2}.
$$

> また $r_I=\log2-\sup_{x\in I}x^2/2>0$ なら、$C_N(I)/\mathbb EC_N(I)\to1$ が確率収束する。
<!-- formal-statement-end -->

### 証明の見取り図

最初の式は正規尾の評価と $2^N$ 個の配置への和集合評価です。帯の期待状態数は正規密度の最小値・最大値を積分に適用します。独立性は最後の分散評価で初めて決定的に使われます。

<!-- proof-start -->
### 証明

前節で導いた $\mathbb Ee^{sH}=e^{Ns^2/2}$ と、非負変数の [Markov 不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を使うと、任意の $s,t>0$ に対して

$$
\mathbb P(H_N(\sigma)\ge Nt)
\le e^{-sNt}\mathbb Ee^{sH_N(\sigma)}
=\exp[N(s^2/2-st)].
$$

$s=t$ と置くと右辺は $e^{-Nt^2/2}$ です。$-H_N$ も同じ分布なので、両側の尾は高々 $2e^{-Nt^2/2}$ です。全配置への和集合評価から最初の式を得ます。

$Y_\sigma$ の密度は

$$
f_N(x)=\sqrt{\frac{N}{2\pi}}e^{-Nx^2/2}
$$

ですから、区間 $I$ に入る確率を密度の上限・下限で挟むと

$$
(v-u)\min_{x\in I} f_N(x)
\le\int_u^v f_N(x)\,dx
\le(v-u)\max_{x\in I} f_N(x).
$$

$2^N$ 個の同分布な指示変数を足したものが $C_N(I)$ なので、期待値の二つの境界が得られます。さらに、配置間のエネルギーの[独立性](../../../解析系/F0/F0-00P3/index.md#def-f0-00p3-independent-random-variables)から、各指示変数も独立になり、共分散の交差項が消えます。したがって

$$
\operatorname{Var}C_N(I)
=2^Np_I(1-p_I)\le2^Np_I
=\mathbb EC_N(I)
$$

です。ここで $p_I=\mathbb P(Y_\sigma\in I)$ です。$r_I>0$ のとき下界より $\mathbb EC_N(I)\ge c_I\sqrt N e^{Nr_I}\to\infty$。[Chebyshev 不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-chebyshev)で任意の $\varepsilon>0$ について

$$
\mathbb P\left(
\left|\frac{C_N(I)}{\mathbb EC_N(I)}-1\right|>\varepsilon
\right)
\le\frac{\operatorname{Var}C_N(I)}
{\varepsilon^2(\mathbb EC_N(I))^2}
\le\frac1{\varepsilon^2\mathbb EC_N(I)}\longrightarrow0.
$$

以上です。
<!-- proof-end -->

$r_I>0$ は、その帯の配置数の期待値が指数的に増える条件です。反対に $|x|>a$ の帯は期待状態数が指数的に小さくなり、典型的な試料では消えます。ただし、境界 $|x|=a$ に直接同じ集中評価を適用してはなりません。そこで極限では内側の帯から境界へ近付けます。

## 4. REMの圧力が低温で直線になる

有限の分配関数は指数関数の和ですが、その極限ではどのエネルギー帯が優勢かが入れ替わります。候補となる一スピンあたりの寄与は、状態数の指数 $\log2-x^2/2$ と Boltzmann 因子の指数 $\beta x$ の和です。

<a id="thm-sg1-pressure"></a>

<!-- formal-statement-start -->
> **定理（REMのquenched圧力極限）**  
> [REM](#def-sg1-rem)において $\beta\ge0$ を固定し、$a=\sqrt{2\log2}$ とすると、ランダムな一スピン圧力 $P_N=N^{-1}\log Z_N$ は確率収束し、quenched圧力 $p_N^{\mathrm q}=\mathbb E P_N$ も次の同じ極限を持つ。

$$
p(\beta)=\max_{-a\le x\le a}
\left\{\log2-\frac{x^2}{2}+\beta x\right\}
=
\begin{cases}
\log2+\dfrac{\beta^2}{2},&0\le\beta\le a,\\[4pt]
a\beta,&\beta\ge a.
\end{cases}
$$
<!-- formal-statement-end -->

### 証明の見取り図

上からは有限個のエネルギー帯に分け、帯ごとの配置数に [Markov 不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を適用します。下からは候補のエネルギー密度 $x$ を $|x|<a$ に固定し、[帯内状態数の補題](#lem-sg1-bins)による集中を使います。最適点が境界 $a$ のときも、内側の $x<a$ を近付けて扱えます。最後に一様二乗可積分性を確認して期待値の極限へ進みます。

<!-- proof-start -->
### 証明

**(i) 典型的な最大エネルギー密度の制御。** $\eta>0$ を固定します。[補題の尾評価](#lem-sg1-bins)に $t=a+\eta$ を代入すると

$$
\mathbb P\left(\max_\sigma|Y_\sigma|>a+\eta\right)
\le 2\exp\left[N\left(\log2-\frac{(a+\eta)^2}{2}\right)\right]
\longrightarrow0.
$$

最後の指数係数は $a^2/2=\log2$ より負です。

**(ii) 上からの評価。** 区間 $[-a-\eta,a+\eta]$ を幅高々 $\delta>0$ の有限個の帯 $I_1,\ldots,I_K$ に分割します。$K$ は $N$ に依存しません。各帯で

$$
b_j=\inf_{x\in I_j}\frac{x^2}{2},
\qquad
d_j=\sup_{x\in I_j}x
$$

と書きます。補題の期待値上界により、各固定 $\varepsilon>0$ に対し十分大きな $N$ では

$$
\mathbb EC_N(I_j)\le
\exp[N(\log2-b_j+\varepsilon/2)].
$$

[Markov 不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を $C_N(I_j)$ に適用すると

$$
\mathbb P\left(C_N(I_j)>
e^{N(\log2-b_j+\varepsilon)}\right)
\le e^{-N\varepsilon/2}.
$$

同時成立確率は少なくとも $1-Ke^{-N\varepsilon/2}$ です。この事象と (i) の最大密度制御の上では

$$
\begin{aligned}
Z_N
&=\sum_j\sum_{\sigma:Y_\sigma\in I_j}e^{N\beta Y_\sigma}\\
&\le\sum_{j=1}^{K}C_N(I_j)e^{N\beta d_j}\\
&\le K\exp\left[N\max_j
  \{\log2-b_j+\varepsilon+\beta d_j\}\right].
\end{aligned}
$$

従って $P_N$ は高確率で上式の最大値と $(\log K)/N$ の和以下です。一つの帯内で $x,y$ は高々 $\delta$ だけ離れ、$x^2/2$ の Lipschitz 定数は $a+\eta$ 以下なので

$$
\log2-b_j+\beta d_j
\le\sup_{x\in I_j}
\{\log2-x^2/2+\beta x\}
+(a+\eta+\beta)\delta.
$$

先に $N\to\infty$、次に $\varepsilon,\delta,\eta\downarrow0$ と取ると、確率的な上極限は $[-a,a]$ 上の最大値を超えません。

**(iii) 下からの評価。** $x\in(-a,a)$ を固定します。$|x|<a$ より、十分小さい区間 $I=[x-\delta,x+\delta]\subset(-a,a)$ で

$$
r_I=\log2-\sup_{y\in I}y^2/2>0
$$

となります。補題の集中と期待値下界から、確率が1に近付く事象上で、十分大きな $N$ について

$$
C_N(I)\ge\frac12\mathbb EC_N(I)
\ge\frac12(2\delta)\sqrt{\frac N{2\pi}}
e^{Nr_I}.
$$

この帯の各状態は $Y_\sigma\ge x-\delta$ ですから

$$
P_N\ge\frac1N\log C_N(I)+\beta(x-\delta)
\ge r_I+\beta(x-\delta)+
\frac1N\log\left(\delta\sqrt{\frac N{2\pi}}\right).
$$

$N\to\infty$、$\delta\downarrow0$ により下界 $\log2-x^2/2+\beta x$ を得ます。$x$ は $(-a,a)$ の任意の点なので、その上限は連続性から閉区間 $[-a,a]$ での最大値に等しくなります。これで $P_N$ の確率収束が示されました。

**(iv) 期待値への移行。** $M_N=\max_\sigma|H_N(\sigma)|/N$ とすると、任意の試料で

$$
-\beta M_N\le P_N\le\log2+\beta M_N,
\qquad |P_N|\le\log2+\beta M_N.
$$

補題の尾評価から、$t_0>a$ を固定して尾積分すると

$$
\begin{aligned}
\mathbb EM_N^2
&=\int_0^\infty 2t\,\mathbb P(M_N>t)\,dt\\
&\le t_0^2+\int_{t_0}^\infty
 2t\cdot 2e^{-N(t^2/2-\log2)}\,dt\\
&=t_0^2+\frac4N e^{-N(t_0^2/2-\log2)}.
\end{aligned}
$$

したがって $\sup_N\mathbb EP_N^2<\infty$ です。任意の $\varepsilon>0$ に対し

$$
\mathbb E|P_N-p|
\le\varepsilon+
\left(\mathbb E|P_N-p|^2\right)^{1/2}
\mathbb P(|P_N-p|>\varepsilon)^{1/2}.
$$

Cauchy–Schwarz と確率収束を使い、右辺の後項が0に収束します。$\varepsilon\downarrow0$ とすれば $\mathbb E|P_N-p|\to0$、特に $\mathbb EP_N\to p$ です。

**(v) 最大値の計算。** 最大化する関数 $f_\beta(x)=\log2-x^2/2+\beta x$ は $f_\beta'(x)=\beta-x$、$f_\beta''(x)=-1$ です。$0\le\beta\le a$ なら最大点は $x=\beta$ で $f_\beta(\beta)=\log2+\beta^2/2$ です。$\beta>a$ なら区間の右端 $x=a$ で最大となり、$f_\beta(a)=\log2-a^2/2+\beta a=\beta a$ です。
<!-- proof-end -->

この証明では正規積分の指数評価に加えて、**異なる配置のエネルギーが独立**だから帯内の配置数が集中しました。相関のある SK 模型で同じ分散の計算をそのまま使うことはできません。

## 5. 凍結転移と annealed 計算の限界

$\beta$ を上げることは温度を下げることです。高温側では多くのエネルギー帯が寄与し、最適エネルギー密度は $x=\beta$ と連続的に動きます。ところが $x=a$ を越えるほど低いエネルギー密度を持つ配置は、指数的な状態数の見積もりから典型的には存在できません。

<a id="def-sg1-freezing"></a>

<!-- formal-statement-start -->
> **定義（凍結転移と臨界逆温度）**  
> [REMの圧力極限](#thm-sg1-pressure)について $\beta_{\mathrm c}=\sqrt{2\log2}$ を臨界逆温度とする。$p(\beta)$ が $\beta<\beta_{\mathrm c}$ で二次式、$\beta>\beta_{\mathrm c}$ で直線となる変化を REM の凍結転移と呼ぶ。温度 $T>0$ は $T=1/\beta$（$\beta>0$）で対応させる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg1-freezing -->
### 臨界温度を数値で確かめる

**定義の確認**：$\log2\approx0.6931$ なので、$\beta_{\mathrm c}\approx1.1774$、$T_{\mathrm c}=1/\beta_{\mathrm c}\approx0.8493$ です。例えば $\beta=0$ では圧力は $\log2$、$\beta=2$ は低温側で圧力が $2\sqrt{2\log2}$ です。$\beta=2$ に高温の二次式を延長してはいけません。
<!-- definition-example-end -->

<a id="cor-sg1-freezing"></a>

<!-- formal-statement-start -->
> **系（凍結転移とannealed近似の破れ）**  
> [REM](#def-sg1-rem)の極限圧力 $p(\beta)$ は $\beta>0$ で微分可能である。$u(\beta)=-p'(\beta)$、$s(\beta)=p(\beta)-\beta p'(\beta)$ と置くと、$\beta\ne\beta_{\mathrm c}$ で

$$
u(\beta)=
\begin{cases}
-\beta,&0<\beta<\beta_{\mathrm c},\\
-\beta_{\mathrm c},&\beta>\beta_{\mathrm c},
\end{cases}
\qquad
s(\beta)=
\begin{cases}
\log2-\beta^2/2,&0<\beta<\beta_{\mathrm c},\\
0,&\beta>\beta_{\mathrm c}.
\end{cases}
$$

> $p'(\beta)$ は臨界逆温度で連続だが $p''$ は不連続である。また annealed 極限との差は

$$
\lim_{N\to\infty}p_N^{\mathrm a}(\beta)-p(\beta)
=
\begin{cases}
0,&0\le\beta\le\beta_{\mathrm c},\\
(\beta-\beta_{\mathrm c})^2/2,&\beta>\beta_{\mathrm c}.
\end{cases}
$$
<!-- formal-statement-end -->

### 証明の見取り図

[REM圧力の二つの式](#thm-sg1-pressure)を各領域で微分します。温度による物理的な内部エネルギーとエントロピーの解釈には、熱力学的極限と微分の交換についての追加論点があります。ここではまず極限圧力から定めた関数 $u,s$ の恒等式を証明します。

<!-- proof-start -->
### 証明

高温側では $p'(\beta)=\beta$、$p''(\beta)=1$ なので

$$
u=-\beta,\qquad
s=\log2+\frac{\beta^2}{2}-\beta^2
=\log2-\frac{\beta^2}{2}.
$$

低温側では $p'(\beta)=a$、$p''(\beta)=0$ なので

$$
u=-a,\qquad s=a\beta-\beta a=0.
$$

臨界逆温度 $\beta=a$ の左右からの一階微分はともに $a$、一方で二階微分の左右極限は $1$ と $0$ です。最後に [annealed圧力の公式](#prop-sg1-annealed-rem) と [極限圧力の定理](#thm-sg1-pressure)を比較します。$\beta>a$ で

$$
\log2+\frac{\beta^2}{2}-a\beta
=\frac{a^2}{2}+\frac{\beta^2}{2}-a\beta
=\frac{(\beta-a)^2}{2}.
$$

$\beta\le a$ では二つの式が一致します。
<!-- proof-end -->

**何が分かったか。** 低温では、annealed 平均に寄与する珍しく極端な試料と、典型的な固定試料とで振る舞いが異なります。これは有限 $N$ での [Jensen の比較](#prop-sg1-jensen)だけからは分からず、指数的な配置数と正規尾の競争まで追って初めて現れました。

一方、REMでは配置のエネルギーを独立と仮定したので、重なり（overlap）による構造を計算していません。SG2で Gaussian 部分積分・補間法を整え、SG3からエネルギー間の相関をもつ SK 模型に進みます。

## 演習問題

### Level A：定義と計算を確かめる

**SG1-A1（二試料の対数平均）**
- Level: A

配置が二つあり、エネルギーは $0,J$、無秩序 $J$ は $h,-h$（各確率 $1/2$、$h>0$）とする。$\mathbb E_J\log Z$、$\log\mathbb E_JZ$ と差を求め、$\beta h>0$ で差の符号を判定せよ。

<!-- solution-start -->
**詳細解答**

$Z(J)=1+e^{-\beta J}$ なので

$$
\begin{aligned}
\mathbb E\log Z
&=\tfrac12\log(1+e^{-\beta h})
 +\tfrac12\log(1+e^{\beta h})\\
&=\tfrac12\log[2+e^{\beta h}+e^{-\beta h}]
 =\log(2\cosh(\beta h/2)).
\end{aligned}
$$

一方 $\mathbb EZ=1+\cosh(\beta h)=2\cosh^2(\beta h/2)$ です。従って差は $\log\cosh(\beta h/2)$。$\cosh t=(e^t+e^{-t})/2\ge1$ で、$t\ne0$ なら厳密に大きいので、$\beta h>0$ では差は正です。
<!-- solution-end -->

**SG1-A2（正規指数モーメント）**
- Level: A

$X\sim N(0,v)$（$v>0$）について、$\mathbb E e^{tX}=e^{vt^2/2}$ を積分の平方完成から示せ。

<!-- solution-start -->
**詳細解答**

$$
tx-\frac{x^2}{2v}
=-\frac{(x-vt)^2}{2v}+\frac{vt^2}{2}.
$$

これを正規密度の積分へ代入し、$y=x-vt$ とすると

$$
\mathbb Ee^{tX}
=e^{vt^2/2}\frac1{\sqrt{2\pi v}}
\int_{\mathbb R}e^{-y^2/(2v)}\,dy
=e^{vt^2/2}.
$$

最後の積分は平均0・分散 $v$ の正規密度の規格化より $\sqrt{2\pi v}$ です。
<!-- solution-end -->

**SG1-A3（REMのannealed分配関数）**
- Level: A

$N=2$ の REM は何個のエネルギーを持つか。分散を示し、$\mathbb EZ_2$ と $p_2^{\mathrm a}$ を求めよ。

<!-- solution-start -->
**詳細解答**

二値スピン二個の配置集合は $\{-1,+1\}^2$ で、要素数は4です。各配置へ独立に $N(0,2)$ のエネルギーを一つずつ割り当てます。[正規指数モーメント](#prop-sg1-annealed-rem)の計算で $v=2,t=-\beta$ と置くと、各 Boltzmann 因子の期待値は $e^{\beta^2}$。したがって $\mathbb EZ_2=4e^{\beta^2}$ であり、

$$
p_2^{\mathrm a}=\frac12\log(4e^{\beta^2})
=\log2+\frac{\beta^2}{2}.
$$
<!-- solution-end -->

**SG1-A4（臨界逆温度での導関数）**
- Level: A

$a=\sqrt{2\log2}$ とし、$p(\beta)=\log2+\beta^2/2$（$\beta\le a$）、$p(\beta)=a\beta$（$\beta\ge a$）とする。$p,p'$ の連続性と $p''$ の片側値を調べよ。

<!-- solution-start -->
**詳細解答**

$\beta=a$ の左の関数値は $\log2+a^2/2=2\log2=a^2$、右の関数値は $a\cdot a=a^2$ で一致します。左微分は $\beta$ の極限から $a$、右微分は定数 $a$ です。一階微分まで連続です。$\beta<a$ で $p''=1$、$\beta>a$ で $p''=0$ なので、臨界逆温度で二階微分は存在しません。
<!-- solution-end -->

### Level B：状態数の評価と仮定の役割

**SG1-B1（極端エネルギーの確率制御）**
- Level: B

$M_N=\max_{\sigma}|H_N(\sigma)|/N$ とする。$t_0>\sqrt{2\log2}$ を固定し、$\sup_N\mathbb E M_N^2<\infty$ を尾積分から証明せよ。

<!-- solution-start -->
**詳細解答**

[正規尾の補題](#lem-sg1-bins)により $\mathbb P(M_N>t)\le 2^{N+1}e^{-Nt^2/2}$ です。非負確率変数の尾積分公式を $M_N^2$ に適用すると

$$
\mathbb EM_N^2=\int_0^\infty 2t\,\mathbb P(M_N>t)\,dt.
$$

$t\le t_0$ では確率を1で押さえて積分を $t_0^2$ 以下とし、残りは

$$
\begin{aligned}
\int_{t_0}^\infty
 2t\,2^{N+1}e^{-Nt^2/2}\,dt
&=4e^{N\log2}\int_{t_0}^\infty t e^{-Nt^2/2}\,dt\\
&=\frac4N e^{-N(t_0^2/2-\log2)}.
\end{aligned}
$$

$t_0^2/2-\log2>0$ だから後項は高々4であり、$\mathbb EM_N^2\le t_0^2+4$ が全 $N\ge1$ に成り立ちます。
<!-- solution-end -->

**SG1-B2（有限Nでの厳密なJensen差）**
- Level: B

REMの任意の $N\ge1$、$\beta>0$ について $\operatorname{Var}Z_N>0$ を計算し、$p_N^{\mathrm q}<p_N^{\mathrm a}$ を証明せよ。また $\beta<\beta_{\mathrm c}$ における極限圧力ではこの差が消えることと矛盾しない理由を説明せよ。

<!-- solution-start -->
**詳細解答**

一配置の $W=e^{-\beta H}$ について

$$
\mathbb EW=e^{N\beta^2/2},\qquad
\mathbb EW^2=e^{2N\beta^2}.
$$

独立な $2^N$ 個の和が $Z_N$ なので

$$
\operatorname{Var}Z_N
=2^N\operatorname{Var}W
=2^N(e^{2N\beta^2}-e^{N\beta^2})>0.
$$

$\beta>0$ なら $e^{2N\beta^2}>e^{N\beta^2}$ です。$Z_N$ が定数でないため [Jensen の比較の等号条件](#prop-sg1-jensen)は満たされず、有限 $N$ では厳密な不等式です。極限で一致するのは、$N^{-1}$ 倍した差が0へ向かうという主張です。各 $N$ の正の差が $N\to\infty$ で0に収束しても矛盾しません。
<!-- solution-end -->

**SG1-B3（帯内の配置数と集中）**
- Level: B

$0<u<v<a$ の固定区間 $I=[u,v]$ について、$\mathbb EC_N(I)$ が指数的に増えることを示し、$C_N(I)/\mathbb EC_N(I)\to1$ を確率収束として証明せよ。エネルギーが独立でなければ、どの式が使えなくなるか述べよ。

<!-- solution-start -->
**詳細解答**

$0<u<v$ より区間内の $\sup_{x\in I}x^2/2=v^2/2$。[帯の補題](#lem-sg1-bins)から

$$
\mathbb EC_N(I)\ge(v-u)\sqrt{\frac N{2\pi}}
\exp[N(\log2-v^2/2)].
$$

$v<a$ より $\log2-v^2/2>0$ で、期待配置数は指数的に発散します。指示変数 $\mathbf1_{\{Y_\sigma\in I\}}$ の独立性により、共分散の交差項が0となって

$$
\operatorname{Var}C_N(I)
=\sum_\sigma p_I(1-p_I)\le\mathbb EC_N(I).
$$

[Chebyshev 不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-chebyshev)を比へ適用すると

$$
\mathbb P\left(
\left|\frac{C_N(I)}{\mathbb EC_N(I)}-1\right|>\varepsilon
\right)\le\frac1{\varepsilon^2\mathbb EC_N(I)}\to0.
$$

エネルギーが相関すれば二つの指示変数の共分散が一般に0ではないため、$\operatorname{Var}C_N=\sum_\sigma\operatorname{Var}\mathbf1_\sigma$ という等式はそのまま使えません。従って同じ集中結論はこの計算だけから出ません。
<!-- solution-end -->

### Level C：モデルを変えたときも導出する

**SG1-C1（一般化REMの凍結点）**
- Level: C

各 $N$ について配置数を $M_N=\lceil e^{Ns}\rceil$（$s>0$）とし、配置ごとのエネルギーを独立な $N(0,Nv)$（$v>0$）とする。逆温度 $\beta\ge0$ の分配関数 $Z_N=\sum_{i=1}^{M_N}e^{-\beta H_i}$ を考える。quenched極限圧力、臨界逆温度、annealed圧力との差を求めよ。証明では、帯内期待状態数の指数と最大化する変数の区間を明示せよ。

<!-- solution-start -->
**詳細解答**

エネルギー密度 $Y_i=-H_i/N$ は平均0・分散 $v/N$ の正規分布です。長さが固定の帯 $I$ に入る確率の指数部分は $e^{-Nx^2/(2v)}$ なので、期待状態数の指数は

$$
s-\frac{x^2}{2v}.
$$

一つの試料に典型的に存在できる帯の境界は、その指数が0になる $|x|=a_v$ で、$a_v=\sqrt{2vs}$ です。

これは本章の [REM圧力定理の証明](#thm-sg1-pressure)の $2^N$ を $M_N$ に、分散 $N$ を $Nv$ に置き換えた計算です。

尾確率は $\mathbb P(|Y_i|>t)\le2e^{-Nt^2/(2v)}$ です。和集合評価では $2M_N e^{-Nt^2/(2v)}$ となるので、$t>a_v$ ではこの上界が0へ向かいます。

固定帯の期待値は $\sqrt{N/(2\pi v)}|I|\,M_N$ に密度の指数部分の上下界を掛けて評価します。

$|x|<a_v$ の帯では、独立性による分散評価と [Chebyshev 不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-chebyshev)によって配置数が集中します。ここで上下界の各操作を確かめます。$t>a_v$ を固定すると、配置数 $M_N\le 2e^{Ns}$ なので

$$
\mathbb P\!\left(\max_i|Y_i|>t\right)
\le 2M_Ne^{-Nt^2/(2v)}
\le 4e^{-N(t^2/(2v)-s)}\longrightarrow0.
$$

上界では $[-t,t]$ を幅 $\delta$ 以下の有限個の区間 $I_j$ に分けます。各区間の期待配置数は

$$
\mathbb EC_N(I_j)\le
M_N\sqrt{\frac{N}{2\pi v}}|I_j|
\exp\!\left[-N\inf_{x\in I_j}\frac{x^2}{2v}\right]
$$

と評価できるので、任意の $\varepsilon>0$ に対し [Markov 不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)と有限個の区間への和集合評価から、高確率で

$$
C_N(I_j)\le
\exp\!\left[N\left(s-\inf_{x\in I_j}\frac{x^2}{2v}+\varepsilon\right)\right]
$$

がすべての $j$ に成り立ちます。各区間での $e^{N\beta Y_i}$ の最大値を掛けて足すと、$N^{-1}\log Z_N$ の上界が得られます。$x^2/(2v)$ は $[-t,t]$ 上で Lipschitz 連続なので、先に $N\to\infty$、次に $\varepsilon,\delta\downarrow0$、$t\downarrow a_v$ と取れば、上極限は $|x|\le a_v$ での候補関数の最大値以下です。

下界では $|x|<a_v$ を固定し、その点を含む十分小さい区間 $I$ を選びます。$r_I=s-\sup_{y\in I}y^2/(2v)>0$ です。独立性より $\operatorname{Var}C_N(I)\le\mathbb EC_N(I)$ で、期待値は $e^{Nr_I}$ に正の多項式因子を掛けたもの以上です。[Chebyshev 不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-chebyshev)から高確率で $C_N(I)\ge \mathbb EC_N(I)/2$ となります。ゆえに

$$
\frac1N\log Z_N\ge
\frac1N\log C_N(I)+\beta\inf I
\ge r_I+\beta\inf I+o(1).
$$

$I$ を点 $x$ に縮め、その後 $x$ を $(-a_v,a_v)$ 全体で動かせば、閉区間 $[-a_v,a_v]$ での最大値を下から得ます。これで確率収束が成立します。さらに $L_N=\max_i|Y_i|$ とおくと

$$
\left|\frac1N\log Z_N\right|
\le\frac{\log M_N}{N}+\beta L_N.
$$

上の尾評価を $t_0>a_v$ から積分すると

$$
\mathbb E L_N^2\le t_0^2+
\frac{8v}{N}e^{-N(t_0^2/(2v)-s)},
$$

よって一スピン圧力は一様に二乗可積分であり、確率収束から期待値の収束も従います。したがって quenched 極限圧力は

$$
p_{s,v}(\beta)=\max_{|x|\le a_v}
\left(s-\frac{x^2}{2v}+\beta x\right)
$$

です。微分で最大点を求めると $-\frac{x}{v}+\beta=0$、従って無制約最大点は $x=v\beta$。これが区間内にある条件は $\beta\le a_v/v$ です。したがって

$$
\beta_{\mathrm c}=\sqrt{\frac{2s}{v}},\qquad
p_{s,v}(\beta)=
\begin{cases}
s+v\beta^2/2,&\beta\le\beta_{\mathrm c},\\
\beta\sqrt{2vs},&\beta\ge\beta_{\mathrm c}.
\end{cases}
$$

annealed 計算では正規指数モーメントから

$$
\frac1N\log\mathbb E Z_N
=\frac{\log M_N}{N}+\frac{v\beta^2}{2}
\longrightarrow s+\frac{v\beta^2}{2}.
$$

ゆえに極限差は $\beta\le\beta_{\mathrm c}$ で0、低温側で

$$
s+\frac{v\beta^2}{2}-\beta\sqrt{2vs}
=\frac v2(\beta-\beta_{\mathrm c})^2
$$

です。ここでは $M_N$ の切り上げは $N^{-1}\log M_N\to s$ にしか影響しません。
<!-- solution-end -->
