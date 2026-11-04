# QFT45 自発的対称性の破れの量子補正・Higgs質量と調整問題

[QFT33の真空とHessian](../QFT33/index.md#prop-qft33-o2-masses)から、古典ポテンシャルの極小点とその曲率がスカラー場の木レベル質量を決めることが分かりました。[QFT36の電弱Higgs質量関係](../QFT36/index.md#prop-qft36-tree-relations)も同じ仕組みを使います。一方、[QFT22の二点tadpole](../QFT22/index.md#thm-qft22-one-loop-vertices)は質量項を量子補正します。**量子補正を入れると真空はどこへ動き、軽いHiggs質量を保つには何を調整する必要があるのでしょうか。**

一つの実スカラー模型で、高運動量モードが質量へ及ぼす寄与、重い粒子を消したときの閾値補正、一ループ有効ポテンシャルによる真空移動を順に計算します。その後、対称性に守られる質量零方向と、重い質量尺度への感度が高いスカラー質量とを区別します。

四次元、自然単位 $\hbar=c=1$ を用います。実時間の正準スカラー運動項は[計量の規約](../../SREL/SREL2/index.md#def-srel2-minkowski-metric) $\eta=\operatorname{diag}(-1,+1,+1,+1)$ で $-\partial_\mu\phi\partial^\mu\phi/2$ とします。ループ積分ではEuclid運動量 $k_E$（$k_E^2\ge0$）を使い、[QFT20のWick回転](../QFT20/index.md#def-qft20-euclidean-action)と同じく実時間の振動積分を無条件に正の測度と同一視しません。積分はまず有限体積・有限Fourierモードで定義し、固定カットオフで体積を無限大にした後に四次元球形積分を評価します。以下のループ次数は形式的な摂動展開の次数です。

## 1. 古典的な谷の底と質量

実スカラー $\phi$ に、偶関数のポテンシャル

$$
U(\phi)=-\frac{\mu_0^2}{2}\phi^2+\frac\lambda4\phi^4,
\qquad \mu_0^2>0,\quad \lambda>0
$$

を与えます。$\mu_0$ は質量次元1、$\lambda$ は無次元です。$U'(\phi)=\phi(-\mu_0^2+\lambda\phi^2)$ より停留点は $0$ と $\pm v_0$、$v_0^2=\mu_0^2/\lambda$ です。$U''(0)=-\mu_0^2<0$、$U''(\pm v_0)=2\mu_0^2>0$ で、$U\to+\infty$（$|\phi|\to\infty$）なので、$\pm v_0$ は大域的最小点です。

例えば $\phi=v_0+h$ と置くと

$$
U(v_0+h)=U(v_0)+\mu_0^2h^2+\lambda v_0h^3+\frac\lambda4h^4.
$$

従って正準運動項と比較した**木レベル**の動径質量は $m_{h,0}^2=2\mu_0^2=2\lambda v_0^2$ です。これは $\mathbb Z_2$ 反転対称性の二つの谷であり、連続対称性を破って生じるGoldstone粒子の例ではありません。量子補正後の真空と曲率質量はこの値から動き得ます。

質量を語るときは次の三つを混同しません。

- **ラグランジアンの質量係数**：$\phi^2/2$ の係数であり、くりこみ方式や尺度で変わり得る。
- **有効ポテンシャルの曲率**：一様な背景の周りでの二階微分。零外部運動量の二点1PI頂点と結び付く。
- **極質量**：適切な安定粒子が存在する場合、実時間二点関数の極の位置で定める。一般に零運動量の曲率とは一致しない（[QFT23のくりこみ条件](../QFT23/index.md#def-qft23-subtraction-conditions)）。

## 2. 高運動量の揺らぎが質量を変える

まず対称性の破れを含まない $m^2>0$ のEuclid模型を用い、紫外側の計算を安全に行います。作用は

$$
S_E[\phi]=\int d^4x\left\{\frac12(\partial_E\phi)^2
+\frac{m^2}{2}\phi^2+\frac\lambda4\phi^4\right\},
\qquad m^2>0,\quad\lambda\ge0.
$$

この章の $\lambda\phi^4/4$ はQFT22の $\lambda_{22}\phi^4/4!$ と異なる正規化で、$\lambda_{22}=6\lambda$ です。従って[QFT22のtadpole係数](../QFT22/index.md#thm-qft22-one-loop-vertices) $\lambda_{22}I_1/2$ は $3\lambda I_1$ に読み替えます。

有限Fourierモードを低運動量 $|k_E|\le K$ の $\phi_L$ と、殻 $K<|k_E|\le\Lambda$ の $\chi$ に分けます（$0<K<\Lambda$）。低い場を固定して高い場をGaussian近似で積分すると、四次相互作用の $\phi_L^2\chi^2$ が局所質量項を生みます。これを**Wilsonianな質量補正**として定義します。

<a id="def-qft45-shell-mass"></a>

<!-- formal-statement-start -->
> **定義（運動量殻を消去した質量係数）**
> 四次元Euclidの有限周期トーラス上で実スカラーの作用を次のように定め、$m^2>0,\lambda\ge0$ とする。

$$
S_E=\int d^4x\left[\frac12(\partial_E\phi)^2+\frac{m^2}{2}\phi^2+\frac\lambda4\phi^4\right].
$$

> 鋭い有限Fourierカットオフ $\Lambda$ を課し、$0<K<\Lambda$ について高モード $\chi$ を積分する。残る低モード作用の局所二次項の係数を

$$
\frac12(m^2+\delta m^2_{K,\Lambda})\phi_L^2
$$

> と書く。$\delta m^2_{K,\Lambda}$ を**運動量殻による質量係数の補正**と呼ぶ。高次演算子や結合の変化とは別の係数であり、物理的な極質量ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft45-shell-mass -->
### 例：場二つの係数を読み取る

**定義の確認**：高モードの分散を $C_>(0)=\langle\chi(x)^2\rangle_0$ とすると、$\lambda(\phi_L+\chi)^4/4$ の $\phi_L^2\chi^2$ 項は $6\lambda\phi_L^2\chi^2/4$ です。Gaussian平均後は $(3\lambda C_>(0)/2)\phi_L^2$ なので、質量項 $\delta m^2\phi_L^2/2$ と比較して $\delta m^2=3\lambda C_>(0)$。**四次頂点の係数と質量項の $1/2$** を別々に確かめました。
<!-- definition-example-end -->

<a id="thm-qft45-cutoff-mass"></a>

<!-- formal-statement-start -->
> **定理（四次元スカラーの一ループ殻質量補正）**
> 四次元Euclid周期トーラス上の実スカラー作用を $m^2>0,\lambda\ge0$ として

$$
S_E=\int d^4x\left[\frac12(\partial_E\phi)^2+\frac{m^2}{2}\phi^2+\frac\lambda4\phi^4\right]
$$

> とする。有限Fourierモードを $0<K<\Lambda$ で高低に分け、結合を一次まで展開する。体積無限大で、殻モードのGaussian平均が与える局所二次係数は

$$
\delta m^2_{K,\Lambda}
=\frac{3\lambda}{16\pi^2}
\left[\Lambda^2-K^2-m^2\log\frac{\Lambda^2+m^2}{K^2+m^2}\right]+O(\lambda^2).
$$

> $m,K$ を固定して $\Lambda\gg m,K$ とすると、表示した一次係数の先頭は $3\lambda\Lambda^2/(16\pi^2)$ である。これは指定した**鋭いカットオフ方式の質量係数**の感度であり、物理的極質量が $\Lambda^2$ に比例して増大するとの主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

四次相互作用を低・高モードで展開し、高モードの二点Gaussian平均だけを残します。四次元球面積 $2\pi^2$ により一次元の積分へ落とし、$u=k^2$ と置きます。

<!-- proof-start -->
### 証明

低モードを固定すると、相互作用の展開は

$$
\frac\lambda4(\phi_L+\chi)^4
=\frac\lambda4(\phi_L^4+4\phi_L^3\chi+6\phi_L^2\chi^2
+4\phi_L\chi^3+\chi^4).
$$

高モード自由作用は中心化Gaussianで、奇数次の平均は零です。$\langle\chi(x)^2\rangle_0=C_>(0)$ は平行移動不変であり、$\phi_L^2$ 項の一次寄与は $3\lambda C_>(0)\phi_L^2/2$ になります。ゆえに

$$
\delta m^2_{K,\Lambda}=3\lambda C_>(0),\qquad
C_>(0)=\int_{K<|k_E|\le\Lambda}\frac{d^4k_E}{(2\pi)^4}\frac1{k_E^2+m^2}.
$$

[QFT22の四次元積分](../QFT22/index.md#thm-qft22-cutoff-integrals)と同じ球面積を使うと

$$
\begin{aligned}
C_>(0)&=\frac{2\pi^2}{(2\pi)^4}\int_K^\Lambda\frac{r^3}{r^2+m^2}\,dr\\
&=\frac1{16\pi^2}\int_{K^2}^{\Lambda^2}\frac{u}{u+m^2}\,du\\
&=\frac1{16\pi^2}\left[u-m^2\log(u+m^2)\right]_{K^2}^{\Lambda^2}.
\end{aligned}
$$

これを三倍の結合へ代入すれば結論です。高次補正はGaussian平均の累積量や結合の再定義から生じるため、今回の一次係数と区別しました。
<!-- proof-end -->

### なぜこれはHiggs質量の予言ではないか

カットオフを変えると $\delta m^2_{K,\Lambda}$ も変わりますが、[QFT23の裸パラメータと反項](../QFT23/index.md#def-qft23-bare-counterterms)のように、低エネルギーで同じ条件を満たすよう裸の $m^2$ を調整できます。物理量は**裸の係数とループを合わせた値**で固定します。二次発散だけを観測値へ加算し「Higgs質量が無限大になる」とは言えません。

一方、重い**実在する**質量尺度が軽い場と結合している場合には、正則化で消せないmatching上の相対関係を考える必要があります。次にそれを計算します。

## 3. 重い粒子を消したときの質量閾値

[QFT44のmatching](../QFT44/index.md#def-qft44-matching)は同じ低エネルギー量を両理論で比較して係数を定める操作でした。今度は軽い実スカラー $\phi$ と重い実スカラー $\chi$ のポテンシャルに

$$
U(\phi,\chi)=U_L(\phi)+\frac12M^2\chi^2
+\frac g4\phi^2\chi^2,\qquad M^2>0,\quad g\ge0
$$

を加えます。$U_L$ は軽い場の局所ポテンシャル、$M$ は**物理的な重い尺度を持つ入力パラメータ**で、$g$ は無次元の混合結合です。$\phi=\varphi$ を一定に保つと、$\chi$ の二次核は $K_\chi=-\partial_E^2+M^2+g\varphi^2/2$ です。$g\ge0$ なので実 $\varphi$ に対して正定値です。これは $\chi$ についてGaussianの模型であり、軽い場も同時に厳密に積分したという意味ではありません。

ここで**一ループ有効ポテンシャル**とは、一定背景 $\varphi$ の単位体積あたりの有効作用の、$\hbar$ に一次の項までを含むものです（[QFT21の1PI有効作用](../QFT21/index.md#def-qft21-effective-action)）。実スカラーを二次Gaussianで消すと、背景依存部分は $\frac12\operatorname{Tr}\log K_\chi$ で決まります。

<a id="def-qft45-heavy-threshold"></a>

<!-- formal-statement-start -->
> **定義（重いスカラーの質量閾値補正）**
> 四次元Euclid模型のポテンシャルを $M>0,g\ge0$ として

$$
U(\phi,\chi)=U_L(\phi)+\frac{M^2}{2}\chi^2+\frac g4\phi^2\chi^2
$$

> とし、一定背景 $\phi=\varphi$ を固定する。$\chi$ のGaussian行列式から得る有効ポテンシャルの $\varphi^2/2$ の係数を、選んだくりこみ方式・尺度 $\mu_R$ における**質量閾値補正** $\delta m_L^2$ と呼ぶ。軽い理論と重い理論のmatchingで使う係数であり、単独で測れる極質量ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft45-heavy-threshold -->
### 例：重いGaussianモードを一つ積分する

**定義の確認**：一つの実変数 $x$ と $A>0$ に対して $\int_{\mathbb R}e^{-Ax^2/2}dx=(2\pi/A)^{1/2}$ です。$A=M^2+g\varphi^2/2$ とすると、$-\log Z(\varphi)+\log Z(0)=\frac12\log[1+g\varphi^2/(2M^2)]$。小さい $\varphi$ では $g\varphi^2/(4M^2)+O(\varphi^4)$ となるので、$\varphi^2/2$ の係数は $g/(2M^2)$ です。実際の四次元では各Fourierモードの $M^2$ が $k_E^2+M^2$ に替わり、その係数を積分します。
<!-- definition-example-end -->

<a id="thm-qft45-heavy-matching"></a>

<!-- formal-statement-start -->
> **定理（重いGaussianスカラーの一ループ質量matching）**
> 四次元Euclidの二実スカラー模型で $M^2>0,g\ge0$ とし、ポテンシャルを

$$
U(\phi,\chi)=U_L(\phi)+\frac{M^2}{2}\chi^2+\frac g4\phi^2\chi^2
$$

> とする。一定背景 $\phi=\varphi$ で重い $\chi$ の一ループGaussian行列式を $\varphi^2$ 次まで展開する。鋭い球形カットオフ $\Lambda$ を使う場合、重い場による軽い場の質量係数の一次寄与は

$$
\delta m_{L,\mathrm{cut}}^2
=\frac{g}{32\pi^2}\left[\Lambda^2-M^2\log\left(1+\frac{\Lambda^2}{M^2}\right)\right].
$$

> 次元正則化後の修正最小減算法 $\overline{\mathrm{MS}}$ における同じ寄与は、一ループ次数で

$$
\delta m_{L,\overline{\mathrm{MS}}}^2(\mu_R)
=\frac{gM^2}{32\pi^2}\left(\log\frac{M^2}{\mu_R^2}-1\right).
$$

> 特に $\mu_R=M$ では $\delta m_L^2=-gM^2/(32\pi^2)$ となる。これは同じ方式で定義した低エネルギーの質量係数との関係であり、有限部分の値は方式に依存する。
<!-- formal-statement-end -->

### 証明の見取り図

重い場をGaussian積分して $\operatorname{Tr}\log$ を得ます。$\varphi^2$ の係数を比較する際には $1/2$ が二度現れる点に注意します。修正最小減算法の有限式は質量二乗を変数として微分して検算します。

<!-- proof-start -->
### 証明

有限Fourierモードの比を取ると、背景に依存しない行列式は相殺し、単位体積あたり

$$
\Delta V_1(\varphi)
=\frac12\int_{|k_E|\le\Lambda}\frac{d^4k_E}{(2\pi)^4}
\log\frac{k_E^2+M^2+g\varphi^2/2}{k_E^2+M^2}.
$$

対数の展開 $\log(1+z)=z+O(z^2)$ を $z=g\varphi^2/[2(k_E^2+M^2)]$ に使うと

$$
\Delta V_1(\varphi)=\frac{g\varphi^2}{4}
\int_{|k_E|\le\Lambda}\frac{d^4k_E}{(2\pi)^4}\frac1{k_E^2+M^2}
+O(\varphi^4).
$$

$\varphi^2/2$ の係数を読むので $\delta m_L^2=gI_1(\Lambda,M)/2$ です。[QFT22の $I_1$ 積分](../QFT22/index.md#thm-qft22-cutoff-integrals)を代入して第一式を得ます。

次元正則化後の $\overline{\mathrm{MS}}$ では、実スカラーの一ループの有限な定数背景項を $x=M^2+g\varphi^2/2>0$ として

$$
V_{1,\overline{\mathrm{MS}}}(x)
=\frac{x^2}{64\pi^2}\left(\log\frac{x}{\mu_R^2}-\frac32\right)
$$

と書けます（$\varphi$ に依存しない定数を除く）。これは[QFT23の次元積分](../QFT23/index.md#thm-qft23-dimensional-integral)の質量二乗微分を積分し、[修正最小減算法](../QFT23/index.md#def-qft23-msbar)で極を引いたものです。実際

$$
\frac{dV_{1,\overline{\mathrm{MS}}}}{dx}
=\frac{x}{32\pi^2}\left(\log\frac{x}{\mu_R^2}-1\right),
\qquad \frac{dx}{d(\varphi^2)}=\frac g2.
$$

$\varphi^2$ の係数は $gM^2[\log(M^2/\mu_R^2)-1]/(64\pi^2)$。質量項の $1/2$ を戻すと第二式です。
<!-- proof-end -->

### 二次発散が見えなくても重い尺度は残る

上の二式には違いがあります。鋭いカットオフでは $\Lambda^2$ の項が現れますが、$\overline{\mathrm{MS}}$ の式には現れません。それでも $gM^2$ に比例する**重い閾値の感度**は残ります。$\Lambda$ と $M$ は異なります。前者は計算に導入した規制量、後者は模型の重い自由度の質量です。

ただし $\delta m_L^2$ 一項だけの符号や有限値が方式不変な観測量なのではありません。同じ条件でmatchingした軽い質量係数と重い理論の入力との**全体の関係**を比較する必要があります。また $g=0$ なら二つの場が相互作用せず、この模型の重い場は軽い質量を補正しません。

## 4. 量子補正で谷の位置が動く

先の対称相模型とは別に、第1節の $\mathbb Z_2$ 対称ポテンシャルに戻ります。一定背景 $\varphi$ 周りの二次作用を $\varphi+h$ の二次まで展開すると、揺らぎ $h$ のEuclid核は $-\partial_E^2+\mathcal M^2(\varphi)$ であり

$$
\mathcal M^2(\varphi)=U''(\varphi)=-\mu_0^2+3\lambda\varphi^2.
$$

真空候補 $v_0=\mu_0/\sqrt\lambda$ では $\mathcal M^2(v_0)=2\mu_0^2>0$ です。$\mathcal M^2(\varphi)>0$ の近傍だけを考えれば、Gaussian積分の実対数を使って一ループ有効ポテンシャルを計算できます。$\varphi=0$ は負曲率なので、そこへ同じ実対数の式を何の注意もなく外挿しません。

<a id="def-qft45-one-loop-vacuum"></a>

<!-- formal-statement-start -->
> **定義（一ループ有効ポテンシャルの停留真空）**
> 四次元の一定実スカラー背景 $\varphi$ に対し、正の揺らぎ質量二乗 $\mathcal M^2(\varphi)=U''(\varphi)>0$ の領域で、指定したくりこみ方式・尺度 $\mu_R$ の一ループ有効ポテンシャルを次の形に定める。

$$
V_{\mathrm{eff}}(\varphi)=U(\varphi)+V_1(\varphi)+O(\hbar^2).
$$

> このとき、次の停留条件と正曲率条件を満たす摂動的に制御された解 $v$ を、その次数での**停留真空候補**と呼ぶ。

$$
V_{\mathrm{eff}}'(v)=0,\qquad V_{\mathrm{eff}}''(v)>0.
$$

> $V_{\mathrm{eff}}''(v)$ は零運動量の曲率質量二乗であり、極質量と同一とは限らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft45-one-loop-vacuum -->
### 例：ループを切った場合の条件を直接確かめる

**定義の確認**：$V_1=0$ と置く木レベルでは $v=v_0>0$ で、$U'(v_0)=-\mu_0^2v_0+\lambda v_0^3=0$、$U''(v_0)=2\mu_0^2>0$ です。$-v_0$ でも同じ条件を満たします。一方 $\varphi=0$ は $U'=0$ でも $U''<0$ なので、この定義の安定な停留真空候補ではありません。
<!-- definition-example-end -->

<a id="thm-qft45-vacuum-shift"></a>

<!-- formal-statement-start -->
> **定理（破れた実スカラー模型の一ループ真空移動）**
> $U(\varphi)=-\mu_0^2\varphi^2/2+\lambda\varphi^4/4$、$\mu_0^2>0,\lambda>0$ とし、四次元 $\overline{\mathrm{MS}}$ 方式、尺度 $\mu_R>0$ で正曲率の $v_0=\mu_0/\sqrt\lambda$ 周辺を考える。実スカラー自身の一ループGaussian寄与だけを含むとき、$L=\log(2\mu_0^2/\mu_R^2)$ として

$$
V_1(\varphi)=\frac{\mathcal M^4(\varphi)}{64\pi^2}
\left(\log\frac{\mathcal M^2(\varphi)}{\mu_R^2}-\frac32\right),
\qquad \mathcal M^2(\varphi)=-\mu_0^2+3\lambda\varphi^2.
$$

> ループ展開が成立するなら正の停留点 $v=v_0+\delta v$ は

$$
\frac{\delta v}{v_0}=-\frac{3\lambda}{16\pi^2}(L-1)+O(\hbar^2)
$$

> を満たす。表示した式では一ループの記録因子 $\hbar$ を1に置き、$O(\hbar^2)$ は二ループ以上と一ループ解の高次反復を表す。$v$ と曲率の値は方式・尺度に依存し、完全な標準模型のHiggs極質量の予測ではない。
<!-- formal-statement-end -->

### 証明の見取り図

一定背景の二階微分からGaussian行列式を作り、[重い場の有限関数](#thm-qft45-heavy-matching)と同じ $x^2\log x$ を $x=\mathcal M^2(\varphi)$ に適用します。停留条件を $v_0$ の周りで一次展開し、$U''(v_0)$ で割ります。

<!-- proof-start -->
### 証明

背景を $\phi=\varphi+h$ と分解すると $U(\varphi+h)$ の $h^2/2$ の係数が $U''(\varphi)=\mathcal M^2(\varphi)$ です。$\mathcal M^2>0$ でGaussian行列式の対数が実数となり、$\overline{\mathrm{MS}}$ 有限項により $V_1$ の式を得ます。$x=\mathcal M^2(\varphi)$ として、前節の微分を使うと

$$
V_1'(\varphi)
=\frac{x(\varphi)x'(\varphi)}{32\pi^2}
\left(\log\frac{x(\varphi)}{\mu_R^2}-1\right),
\qquad x'(\varphi)=6\lambda\varphi.
$$

$U'(v_0)=0$、$U''(v_0)=2\mu_0^2=:m_{h,0}^2$ なので、停留条件をループ次数で展開すると

$$
\begin{aligned}
0&=V_{\mathrm{eff}}'(v_0+\delta v)
=U''(v_0)\delta v+V_1'(v_0)+O(\hbar^2),\\
V_1'(v_0)&=\frac{(2\mu_0^2)(6\lambda v_0)}{32\pi^2}(L-1).
\end{aligned}
$$

ゆえに $\delta v=-V_1'(v_0)/(2\mu_0^2)=-3\lambda v_0(L-1)/(16\pi^2)$ です。$|\delta v|\ll v_0$ で初めて周辺の摂動解が自己整合します。
<!-- proof-end -->

例えば $\mu_R^2=2\mu_0^2$ なら $L=0$ で、$\delta v/v_0=3\lambda/(16\pi^2)>0$ となります。$\overline{\mathrm{MS}}$ のパラメータを固定して尺度を変えれば見かけの $\delta v$ も変わります。物理的な観測量を比較するには、[QFT25のRG方程式](../QFT25/index.md#def-qft25-rg-equation)に従い結合と質量も合わせて走らせ、必要な次数の計算を揃えます。

### 曲率と極質量の違い

上の例の曲率を一次まで計算すると $V_{\mathrm{eff}}''(v)=U''(v_0)+U'''(v_0)\delta v+V_1''(v_0)+O(\hbar^2)$ です。$U'''(v_0)=6\lambda v_0$ と $x''=6\lambda$ を使えば

$$
\begin{aligned}
V_1''(v_0)&=\frac{6\lambda(2\mu_0^2)(L-1)+(6\lambda v_0)^2L}{32\pi^2},\\
U'''(v_0)\delta v&=-\frac{36\lambda^2v_0^2}{32\pi^2}(L-1),\\
V_{\mathrm{eff}}''(v)&=2\mu_0^2+\frac{3\lambda^2v_0^2}{8\pi^2}(L+2)+O(\hbar^2).
\end{aligned}
$$

この曲率は**零外部運動量**での二点頂点に相当します。極質量を求めるには運動量依存する自己エネルギーを含めて極条件を解きます。曲率を実験のHiggs極質量へ直結するのは別の計算です。

## 5. 対称性が守る方向と守らない方向

連続な大域対称性が正則化・反項を含めて保存されていれば、量子補正後の有効ポテンシャルも同じ回転対称性を持つことがあります。二成分実場 $\boldsymbol\phi=(\phi_1,\phi_2)$ なら、回転対称な一様背景のポテンシャルは $V_{\mathrm{eff}}=F(r^2)$、$r^2=\phi_1^2+\phi_2^2$ と書けます（ここではその滑らかな表示を仮定します）。

<a id="prop-qft45-goldstone-hessian"></a>

<!-- formal-statement-start -->
> **命題（回転不変な有効ポテンシャルの接線零方向）**
> 二実成分場の一様背景に対し $V_{\mathrm{eff}}(\boldsymbol\phi)=F(\phi_1^2+\phi_2^2)$ が $C^2$ 級で、$v>0$ において $F'(v^2)=0$ とする。$\boldsymbol\phi_0=(v,0)$ でのHessianは

$$
H(\boldsymbol\phi_0)=\begin{pmatrix}4v^2F''(v^2)&0\\0&0\end{pmatrix}.
$$

> 特に接線方向 $(0,1)^T$ の曲率は零である。これは回転不変性と停留条件から得る零運動量の結論であり、すべての局所ゲージHiggs模型に物理的な質量零粒子が現れるとの主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$r^2$ を先に一回微分してから各成分で二回微分します。停留点では $F'$ の項が消え、残る行列は真空ベクトルの外積になります。

<!-- proof-start -->
### 証明

$s=\phi_1^2+\phi_2^2$ と置くと連鎖律から

$$
\frac{\partial V_{\mathrm{eff}}}{\partial\phi_a}=2\phi_aF'(s),
\qquad
\frac{\partial^2V_{\mathrm{eff}}}{\partial\phi_a\partial\phi_b}
=2\delta_{ab}F'(s)+4\phi_a\phi_bF''(s).
$$

$\boldsymbol\phi_0=(v,0)$、$s=v^2$ と $F'(v^2)=0$ を代入すると、第一項は零、第二項は $4v^2F''(v^2)$ の $(1,1)$ 成分だけになります。従って $H(0,1)^T=(0,0)^T$。これは[QFT33の対称性軌道とHessianの定理](../QFT33/index.md#thm-qft33-hessian-zero)を回転不変な有効ポテンシャルへ具体的に適用したものです。
<!-- proof-end -->

直接例として $F(s)=\lambda(s-v^2)^2/4$ を代入すると $F'(v^2)=0$、$F''(v^2)=\lambda/2$ なので $H=\operatorname{diag}(2\lambda v^2,0)$ です。量子補正が $F$ の形を変えても、対称性と停留条件が保たれる限り接線の零曲率は維持されます。ただし量子のGoldstone励起を保証するには、[QFT33のスペクトル形Goldstone定理](../QFT33/index.md#thm-qft33-goldstone)にある局所性・保存流・無限体積等の仮定が別に必要です。[QFT34の局所ゲージ模型](../QFT34/index.md#def-qft34-abelian-higgs)ではゲージ固定と拘束を扱うため、この大域対称性の議論をそのまま粒子数へ転用できません。

## 6. Higgs質量の調整問題とは何か

測定で低いスカラー質量係数 $m_{\mathrm{low}}^2$ が固定され、重い理論の係数 $m_{\mathrm{high}}^2$ と閾値補正の和がその値を与える状況を考えます。差は同じ方式・尺度でmatchingした係数とします。

$$
m_{\mathrm{low}}^2=m_{\mathrm{high}}^2+\delta m_{\mathrm{threshold}}^2
\quad\text{（指定次数・方式のmatching）}.
$$

両辺が成立するよう $m_{\mathrm{high}}^2$ を調整すること自体は、くりこみで常に行います。しかし $|\delta m_{\mathrm{threshold}}^2|\gg|m_{\mathrm{low}}^2|$ なら、大きな二数の差から小さい値が生じることになります。この**入力への感度**を調整問題（naturalness / hierarchy question）の一つの形として定量化します。

<a id="def-qft45-tuning-diagnostic"></a>

<!-- formal-statement-start -->
> **定義（単一閾値の調整指標）**
> 一つの指定したmatching方式・尺度で、非零の低エネルギー質量係数が次の和を満たすとする。

$$
m_{\mathrm{low}}^2=m_{\mathrm{high}}^2+\delta m_{\mathrm{threshold}}^2.
$$

> 二数の相殺の大きさを診断する無次元量を

$$
\Delta_{\mathrm{threshold}}=\frac{|\delta m_{\mathrm{threshold}}^2|}{|m_{\mathrm{low}}^2|}
$$

> と置く。$\Delta_{\mathrm{threshold}}\gg1$ は**その入力分解における大きな相殺**を示すが、自然界の確率、モデル全体に普遍な指標、または新粒子の存在定理ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft45-tuning-diagnostic -->
### 例：重い質量と軽い質量が三桁離れている場合

**定義の確認**：第3節の $\overline{\mathrm{MS}}$ 方式を $\mu_R=M$ で使い、$M=10^3$、$g=1$、$m_{\mathrm{low}}^2=1$（共通の質量単位）とします。すると

$$
\delta m^2=-\frac{10^6}{32\pi^2}\simeq-3166.3,
\qquad m_{\mathrm{high}}^2=1-\delta m^2\simeq3167.3,
\qquad\Delta_{\mathrm{threshold}}\simeq3166.3.
$$

係数の単位、matching尺度、和による再構成を直接確認しました。$\Delta^{-1}\simeq3.16\times10^{-4}$ は**この二項の相殺比**であって、特定の理論が実現する確率ではありません。$g$ を零に近づければ同じ $M$ でも補正は小さくなります。
<!-- definition-example-end -->

### 標準模型のHiggsへ戻る

[QFT35のHiggs二重項](../QFT35/index.md#def-qft35-higgs-yukawa)の木レベルポテンシャルを $V(H)=-\mu_H^2H^\dagger H+\lambda_H(H^\dagger H)^2$ とすると、[QFT36の質量関係](../QFT36/index.md#prop-qft36-tree-relations)と同じく $v^2=\mu_H^2/\lambda_H$、$m_{h,0}^2=2\lambda_Hv^2$ です。標準模型ではHiggs自身に加えてゲージ場・フェルミオンのループが入ります。真空を定める有効ポテンシャルや場の背景値にはゲージ選択上の注意もあり、**本章の一実スカラーの係数をそのまま標準模型の全補正へ代入してはいけません**。

調整問題の論理を整理すると、次の三段階に分かれます。

1. **計算事実**：軽いスカラーと結合する重い粒子は、例示した摂動模型で $gM^2$ の閾値寄与を生む。一方、鋭いカットオフの $\Lambda^2$ の見え方は正則化依存である。
2. **モデル依存の感度**：重い尺度 $M$ と結合 $g$ が指定されたとき、軽い質量係数を保つには入力間の相殺が必要になる場合がある。対称性、結合の小ささ、複数の寄与の構造により事情は変わる。
3. **解釈の限界**：大きな調整指標だけから、新物理が特定のエネルギー以下で必ず発見されるとは結論できない。これは**理論選択の指針と問い**であり、数学的な必然性を持つ質量上限の定理ではない。

## 7. 演習：質量の係数、真空の移動、閾値を自力で計算する

### 演習 QFT45-A1：二重井戸の曲率

- Level: A
- 目安時間: 8分

実スカラーの古典ポテンシャル $U(\phi)=-a^2\phi^2/2+b\phi^4/4$、$a,b>0$ とする。全停留点、極小点、$\phi=v>0$ での正準揺らぎの木レベル質量二乗を求めよ。

<!-- solution-start -->
### 詳細解答

$U'(\phi)=-a^2\phi+b\phi^3=\phi(-a^2+b\phi^2)$ なので停留点は $0,\pm a/\sqrt b$ です。$U''(\phi)=-a^2+3b\phi^2$ で $U''(0)=-a^2<0$、$U''(\pm a/\sqrt b)=2a^2>0$。$b>0$ により $|\phi|\to\infty$ で $U\to\infty$ なので $\pm a/\sqrt b$ が大域的極小です。$v=a/\sqrt b$、$\phi=v+h$ で二次項は $U''(v)h^2/2=a^2h^2$。正準運動項と比較し $m_{h,0}^2=2a^2$ です。
<!-- solution-end -->

### 演習 QFT45-A2：Gaussian一モードの符号

- Level: A
- 目安時間: 8分

$A>0,c\ge0$ とし、$Z(\varphi)=\int_{\mathbb R}\exp[-(A+c\varphi^2)x^2/2]dx$ を考える。$-\log[Z(\varphi)/Z(0)]$ を $\varphi^2$ 次まで展開し、$\varphi^2/2$ の係数を求めよ。

<!-- solution-start -->
### 詳細解答

[有限次元Gaussian積分](../QFT19/index.md#thm-qft19-gaussian)より $Z(\varphi)=\sqrt{2\pi/(A+c\varphi^2)}$。比を取ると $Z(\varphi)/Z(0)=\sqrt{A/(A+c\varphi^2)}$ です。従って

$$
-\log\frac{Z(\varphi)}{Z(0)}
=\frac12\log\left(1+\frac{c\varphi^2}{A}\right)
=\frac{c\varphi^2}{2A}+O(\varphi^4).
$$

したがって求める係数は $c/A$。単なる $\log Z$ と $-\log Z$ の符号を取り違えないこと、質量項の $1/2$ を戻すことの二点を確認しました。
<!-- solution-end -->

### 演習 QFT45-A3：質量零の殻積分

- Level: A
- 目安時間: 8分

四次元Euclidの $0<K<\Lambda$、$m=0$ の高運動量殻で $C_>(0)=\int_{K<|k|\le\Lambda}d^4k/[(2\pi)^4k^2]$ を計算し、相互作用 $\lambda\phi^4/4$ が一次で与える $\delta m^2$ を求めよ。

<!-- solution-start -->
### 詳細解答

半径 $r$ の三次元球面積 $2\pi^2r^3$ を使い

$$
C_>(0)=\frac{2\pi^2}{(2\pi)^4}\int_K^\Lambda\frac{r^3}{r^2}dr
=\frac1{8\pi^2}\left[\frac{r^2}2\right]_K^\Lambda
=\frac{\Lambda^2-K^2}{16\pi^2}.
$$

[質量補正の定義](#def-qft45-shell-mass)で係数は $3\lambda C_>(0)$ なので $\delta m^2=3\lambda(\Lambda^2-K^2)/(16\pi^2)$ です。$K>0$ なので積分下端の零運動量特異性はありません。極質量の計算ではありません。
<!-- solution-end -->

### 演習 QFT45-A4：重い場の二次核

- Level: A
- 目安時間: 8分

ポテンシャル $U=U_L(\phi)+M^2\chi^2/2+g\phi^2\chi^2/4$、$M>0,g>0$ で $\phi=\varphi$ を一定に保つ。重い場の二階微分 $\partial_\chi^2U$ を求め、$\varphi=0$ の周りの $\chi$ の行列式で軽い場の $\varphi^2/2$ の係数が $gI_1(\Lambda,M)/2$ になることを示せ。

<!-- solution-start -->
### 詳細解答

$\partial_\chi U=M^2\chi+g\varphi^2\chi/2$、従って $\partial_\chi^2U=M^2+g\varphi^2/2$。二次核は $k_E^2+M^2+g\varphi^2/2>0$ です。行列式の差は

$$
\frac12\int\frac{d^4k_E}{(2\pi)^4}
\log\left(1+\frac{g\varphi^2}{2(k_E^2+M^2)}\right)
=\frac{g\varphi^2}{4}I_1(\Lambda,M)+O(\varphi^4),
$$

ただし積分域は $|k_E|\le\Lambda$。$\delta m^2\varphi^2/2$ と係数比較して $\delta m^2=gI_1/2$ です。
<!-- solution-end -->

### 演習 QFT45-A5：調整指標の意味

- Level: A
- 目安時間: 8分

ある固定方式で $m_{\mathrm{low}}^2=2$、$\delta m^2=-198$（同じ質量単位の二乗）とする。$m_{\mathrm{high}}^2$ と[調整指標](#def-qft45-tuning-diagnostic) $\Delta$ を求め、この値から直接は言えない物理的主張を一つ挙げよ。

<!-- solution-start -->
### 詳細解答

$2=m_{\mathrm{high}}^2-198$ なので $m_{\mathrm{high}}^2=200$ です。二数を合わせると $200-198=2$ を再現し、$\Delta=198/2=99$。この定義は二項の相殺の大きさだけを測ります。例えば「新粒子が必ず特定のエネルギーで発見される」「この模型の実現確率が $1/99$」はいずれも導けません。
<!-- solution-end -->

### 演習 QFT45-B1：正質量の殻補正と極限

- Level: B
- 目安時間: 15分

四次元Euclidの正質量 $m^2>0$ と殻 $0<K<\Lambda$ に対し、$C_>(0)=\int_{K<|k|\le\Lambda}d^4k/[(2\pi)^4(k^2+m^2)]$ を出発点から積分せよ。さらに $m\to0^+$ の極限と、$\Lambda\to\infty$（$m,K$ 固定）での主項を求めよ。

<!-- solution-start -->
### 詳細解答

四次元球面積と $u=r^2$ を用いると

$$
\begin{aligned}
C_>(0)&=\frac1{8\pi^2}\int_K^\Lambda\frac{r^3}{r^2+m^2}\,dr
=\frac1{16\pi^2}\int_{K^2}^{\Lambda^2}\frac{u}{u+m^2}\,du\\
&=\frac1{16\pi^2}\int_{K^2}^{\Lambda^2}\left(1-\frac{m^2}{u+m^2}\right)du\\
&=\frac1{16\pi^2}\left[\Lambda^2-K^2-m^2\log\frac{\Lambda^2+m^2}{K^2+m^2}\right].
\end{aligned}
$$

$K>0$ により、$m\to0^+$ で $m^2\log[(\Lambda^2+m^2)/(K^2+m^2)]\to0$ です。従って極限は $(\Lambda^2-K^2)/(16\pi^2)$。$m,K$ 固定、$\Lambda\to\infty$ では対数は $O(\log\Lambda)$ なので主項は $\Lambda^2/(16\pi^2)$ です。$\delta m^2$ はこの式の $3\lambda$ 倍となり、裸質量を同時に固定した物理量とは区別されます。
<!-- solution-end -->

### 演習 QFT45-B2：修正最小減算法の閾値

- Level: B
- 目安時間: 15分

$M^2>0,g\ge0,\mu_R>0$ として $x(\varphi)=M^2+g\varphi^2/2$、$f(x)=x^2[\log(x/\mu_R^2)-3/2]/(64\pi^2)$ を定める。(1) $df/dx$ を求め、(2) $f(x(\varphi))-f(M^2)$ の $\varphi^2/2$ 係数を求め、(3) $\mu_R=M$ と $\mu_R=eM$ の二つの尺度で値を比較せよ。

<!-- solution-start -->
### 詳細解答

積の微分則から

$$
f'(x)=\frac1{64\pi^2}\left\{2x\left(\log\frac{x}{\mu_R^2}-\frac32\right)+x\right\}
=\frac{x}{32\pi^2}\left(\log\frac{x}{\mu_R^2}-1\right).
$$

$x-M^2=g\varphi^2/2$ を代入し、一次Taylor展開で

$$
f(x(\varphi))-f(M^2)
=\frac{g\varphi^2}{2}\frac{M^2}{32\pi^2}
\left(\log\frac{M^2}{\mu_R^2}-1\right)+O(\varphi^4).
$$

従って質量補正は $\delta m^2=gM^2[\log(M^2/\mu_R^2)-1]/(32\pi^2)$。$\mu_R=M$ では $-gM^2/(32\pi^2)$、$\mu_R=eM$ では $\log(e^{-2})=-2$ なので $-3gM^2/(32\pi^2)$ です。値が異なるのは定義した係数が方式・尺度依存だからで、測定値が尺度で変動したと解釈しません。
<!-- solution-end -->

### 演習 QFT45-B3：真空の一ループ移動

- Level: B
- 目安時間: 15分

$U(\varphi)=-\mu_0^2\varphi^2/2+\lambda\varphi^4/4$（$\mu_0^2,\lambda>0$）と、正の $x(\varphi)=-\mu_0^2+3\lambda\varphi^2$ における一ループ項 $V_1=x^2[\log(x/\mu_R^2)-3/2]/(64\pi^2)$ を考える。$v_0=\mu_0/\sqrt\lambda$ の周りの $\delta v$ を一次の停留条件から求め、$\mu_R^2=2\mu_0^2$ で符号を判定せよ。

<!-- solution-start -->
### 詳細解答

$U'(v_0)=0$、$U''(v_0)=2\mu_0^2$ です。$x'(\varphi)=6\lambda\varphi$、$x(v_0)=2\mu_0^2$ と、[一ループ関数の微分](#thm-qft45-vacuum-shift)より

$$
V_1'(v_0)=\frac{(2\mu_0^2)(6\lambda v_0)}{32\pi^2}
\left(\log\frac{2\mu_0^2}{\mu_R^2}-1\right).
$$

$0=U''(v_0)\delta v+V_1'(v_0)+O(\hbar^2)$ なので

$$
\delta v=-\frac{3\lambda v_0}{16\pi^2}
\left(\log\frac{2\mu_0^2}{\mu_R^2}-1\right).
$$

$\mu_R^2=2\mu_0^2$ では対数が0で $\delta v=3\lambda v_0/(16\pi^2)>0$。$\lambda/(16\pi^2)$ が小さく、揺らぎの曲率が正の近傍に解が残るという条件でこの展開を使えます。
<!-- solution-end -->

### 演習 QFT45-B4：量子補正後の零方向

- Level: B
- 目安時間: 15分

二実成分の一様有効ポテンシャル $V(\phi_1,\phi_2)=F(\phi_1^2+\phi_2^2)$ を考える。$F$ は $C^2$、$v>0$ で $F'(v^2)=0$ とする。

1. Hessianを成分で計算せよ。
2. $F(s)=a(s-v^2)^2+b(s-v^2)^4$、$a>0,b\ge0$ で $\boldsymbol\phi=(v,0)$ の二つの固有値を求めよ。
3. 何を追加せずには物理的Goldstone粒子を結論できないか述べよ。

<!-- solution-start -->
### 詳細解答

$s=\phi_1^2+\phi_2^2$ とおくと $\partial_aV=2\phi_aF'(s)$。さらに $\partial_b$ を作用させると

$$
H_{ab}=2\delta_{ab}F'(s)+4\phi_a\phi_bF''(s)
$$

です。$F'(v^2)=0$ により $(v,0)$ では $H=\operatorname{diag}(4v^2F''(v^2),0)$。具体例の関数を一回、二回と微分すれば

$$
F'(s)=2a(s-v^2)+4b(s-v^2)^3,\qquad
F''(s)=2a+12b(s-v^2)^2.
$$

従って $F''(v^2)=2a$ からHessianの固有値は $8av^2$ と $0$ です。$b$ の値はこの二次曲率には現れません。これは一定背景の零運動量Hessianの結果です。

物理的な質量零励起には、保存された**大域**内部対称性、適切な局所性・スペクトル条件・無限体積の非零秩序変数など[Goldstone定理の仮定](../QFT33/index.md#thm-qft33-goldstone)が別に要ります。局所ゲージの角度成分をそのまま物理粒子とは数えません。
<!-- solution-end -->

### 演習 QFT45-C1：重い閾値から破れた真空まで

- Level: C
- 目安時間: 30分

四次元で軽い実スカラー $\phi$ と重い実スカラー $\chi$ を考え、$\overline{\mathrm{MS}}$ 方式で $\mu_R=M$ を選ぶ。$M>0,g>0,\lambda>0$、ポテンシャルは $U=\frac12m_{\mathrm{high}}^2\phi^2+\lambda\phi^4/4+M^2\chi^2/2+g\phi^2\chi^2/4$ とする。重い場の一ループmatchingによる二次係数だけを残して軽い模型を作り、軽い場自身のループは後段まで入れない。

1. 重い場を積分消去した $\phi^2/2$ の閾値補正を求めよ。
2. 軽い二次係数を $m_{\mathrm{low}}^2=-a^2$（$a>0$）へ合わせる $m_{\mathrm{high}}^2$ を求め、軽い有効ポテンシャルの正の木レベル真空 $v_0$ と曲率質量二乗を求めよ。
3. $M/a=10^3$、$g=1$ のとき、$|\delta m^2|/a^2$ と $m_{\mathrm{high}}^2/a^2$ を求め、相殺がどの程度かを数値で表せ。
4. 同じ尺度 $\mu_R=M$ の軽い場自身の一ループ有効ポテンシャルも加える。$v_0$ からの一次移動 $\delta v/v_0$ を対数を残して求めよ。また $M/a\gg1$ で何に注意すべきか、および観測Higgsの極質量と同一視できない理由を二つ述べよ。

<!-- solution-start -->
### 詳細解答

**(1) 重い場の積分消去。** 背景 $\varphi$ を固定すると $\chi$ の二次核は $k_E^2+M^2+g\varphi^2/2$。有限モードGaussianの行列式の対数を $\varphi^2$ まで展開し、[重い場のmatching定理](#thm-qft45-heavy-matching)を $\mu_R=M$ に適用すると

$$
\delta m^2=\frac{gM^2}{32\pi^2}\left(\log\frac{M^2}{M^2}-1\right)
=-\frac{gM^2}{32\pi^2}.
$$

**(2) 破れた軽い真空。** $m_{\mathrm{low}}^2=m_{\mathrm{high}}^2+\delta m^2=-a^2$ を解くと

$$
m_{\mathrm{high}}^2=-a^2+\frac{gM^2}{32\pi^2}.
$$

軽い模型の $U_L(\varphi)=-a^2\varphi^2/2+\lambda\varphi^4/4$ において $U_L'=\varphi(-a^2+\lambda\varphi^2)$、$U_L''=-a^2+3\lambda\varphi^2$。正の極小は $v_0=a/\sqrt\lambda$、曲率質量二乗は $U_L''(v_0)=2a^2$ です。$\lambda>0$ により極小は大域的です。

**(3) 相殺の比。** $M^2/a^2=10^6$ を代入すれば

$$
\frac{|\delta m^2|}{a^2}=\frac{10^6}{32\pi^2}\simeq3166.3,
\qquad
\frac{m_{\mathrm{high}}^2}{a^2}=-1+\frac{10^6}{32\pi^2}\simeq3165.3.
$$

二項を足すと $3165.3-3166.3=-1$ を再現し、低い二次係数に対する閾値の大きさは約 $3.2\times10^3$ 倍です。$a^2/|\delta m^2|\simeq3.16\times10^{-4}$ は相殺の比であり確率ではありません。なお $m_{\mathrm{low}}^2<0$ でも計算した重い $\chi$ の核 $M^2+g\varphi^2/2$ は正であり、重いGaussian消去自体は定義できます。

**(4) 軽い場の一ループ真空。** 同じ $\overline{\mathrm{MS}}$ 尺度 $\mu_R=M$ で軽い理論のパラメータ $a^2,\lambda$ を固定し、追加の一ループ近似を採用します。$\mathcal M^2(v_0)=2a^2$、$\mathcal M^{2\prime}(v_0)=6\lambda v_0$ なので、[真空移動の定理](#thm-qft45-vacuum-shift)の $\mu_0^2$ を $a^2$ に置き換えます。

$$
\frac{\delta v}{v_0}=-\frac{3\lambda}{16\pi^2}
\left(\log\frac{2a^2}{M^2}-1\right).
$$

$M/a=10^3$ なら $\log(2a^2/M^2)=\log(2\times10^{-6})$ で大きな負の対数です。$\lambda|\log(2a^2/M^2)|/(16\pi^2)$ が小さくなければ固定次数の近似は信頼できず、[くりこみ群](../QFT25/index.md#def-qft25-rg-equation)で低尺度まで係数を走らせる改善が必要です。また重い場の一ループ閾値に加え、軽い場の一ループを含めた結果を**一つの尺度不変な高精度予言**と称するには、matchingとrunningの次数を揃えなければなりません。

さらに、(i) 曲率質量二乗は零運動量の二点関数であって、自己エネルギーの運動量依存を含む極質量ではないこと、(ii) 標準模型にはゲージ場・フェルミオンの量子補正とゲージの扱いが必要で、一つの実スカラーの計算では閉じていないこと、の二点から観測Higgs質量とは同一視できません。
<!-- solution-end -->

## 8. まとめと次の問い

- $\lambda\phi^4/4$ の一ループtadpoleは、鋭い四次元カットオフの質量係数に $3\lambda\Lambda^2/(16\pi^2)$ の先頭依存を生みます。裸係数との和を固定するので、これだけは観測量ではありません。
- 重い実在粒子のGaussian消去では、$g\phi^2\chi^2/4$ から一ループで $gM^2$ に比例する**閾値関係**が生じます。$\overline{\mathrm{MS}}$ でもこの尺度は消えませんが、有限係数は方式依存です。
- 一ループ有効ポテンシャルは真空の位置と曲率を変えます。大域連続対称性による接線零方向は対称な有効ポテンシャルの停留条件で守られますが、局所ゲージ場や極質量は別の判定を要します。
- 調整問題は、重い入力尺度に比して軽いスカラー質量を保つ際の**感度とモデル選択**の問題です。単独の二次発散や調整指標から新物理の必然的な発見尺度は導けません。

次は、格子ゲージ理論・トポロジカルな作用項などを入口として、摂動論がどこまで適用でき、非摂動的主張は何を別途必要とするかを調べます。
