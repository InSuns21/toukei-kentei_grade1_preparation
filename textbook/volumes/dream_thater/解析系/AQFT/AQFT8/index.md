# AQFT8 Minkowski真空とFock二点関数

[AQFT7のquasifree状態](../AQFT7/index.md#def-aqft7-quasifree)では、不確定性条件を満たす実対称双線形形式 $\mu$ からGaussian型のWeyl状態を作りました。しかしこのような形式は多数あり、**どの状態がMinkowski時空の正エネルギー真空なのか**はまだ決まりません。物理的な真空を選ぶには、Klein–Gordon方程式の「正周波数」を用いて $\mu$ を具体化し、その状態のPoincaré不変性とスペクトル条件まで確認する必要があります。

本講では、既習の[QFT4のFock構成](../../../物理系/QFT/QFT4/index.md#def-qft4-fock-space)・[QFT5のWightman二点分布](../../../物理系/QFT/QFT5/index.md#thm-qft5-wightman-positive)と、源商から始めるAQFTを**同じ波束で照合**します。質量はまず $m>0$ とし、計量は $(-,+,+,+)$、$\hbar=c=1$ です。最後に $m=0$ の場合に必要な注意を述べます。真空の選択を一般の局所netの公理にするのではなく、**この自由場模型で構成して証明する**ことが目標です。

## 1. 源商の解を正周波数波束へ送る

[AQFT4のKlein–Gordon商と解空間の同型](../AQFT4/index.md#thm-aqft4-kg-quotient)および[AQFT5のシンプレクティック形式](../AQFT5/index.md#def-aqft5-causal-symplectic)を用います。具体的に
$$
\begin{gathered}
M=\mathbb R^{1,3},\quad P=\partial_t^2-\Delta_{\boldsymbol x}+m^2,\quad
E=G_{\mathrm{ret}}-G_{\mathrm{adv}},\\
\mathcal V=C_c^\infty(M,\mathbb R)/PC_c^\infty(M,\mathbb R),\qquad
\sigma([f],[g])=-\int_M f(Eg)\,d^4x .
\end{gathered}
$$
実解 $u=Ef$ の時刻零でのデータを $q(\boldsymbol x)=u(0,\boldsymbol x)$、$p(\boldsymbol x)=\partial_tu(0,\boldsymbol x)$ とします。両者は滑らかでコンパクト支持です。[Cauchy面での形式](../../HPDE/HPDE23/index.md#def-hpde23-symplectic)との照合により
$$
\sigma([f],[g])=\int_{\mathbb R^3}(q_f p_g-p_f q_g)\,d^3x .
$$
この式の**順序**が後の虚部の符号を決めます。

空間Fourier変換を
$$
\widehat q(\boldsymbol k)=(2\pi)^{-3/2}
\int_{\mathbb R^3}q(\boldsymbol x)e^{-i\boldsymbol k\cdot\boldsymbol x}\,d^3x,\quad
\omega_{\boldsymbol k}=\sqrt{|\boldsymbol k|^2+m^2}
$$
と定めます。運動量ごとに方程式は $\ddot{\widehat u}+\omega_{\boldsymbol k}^2\widehat u=0$ です。その解は
$$
\widehat u(t,\boldsymbol k)=\widehat q(\boldsymbol k)\cos(\omega_{\boldsymbol k}t)
+\frac{\widehat p(\boldsymbol k)}{\omega_{\boldsymbol k}}\sin(\omega_{\boldsymbol k}t).
$$
右辺を $e^{\mp i\omega t}$ の和に直すと、$e^{-i\omega t}$ の係数は
$$
\frac12\left(\widehat q+\frac{i}{\omega}\widehat p\right).
$$
この係数を一粒子Hilbert空間の $L^2$ ノルムに適した重みで規格化します。

<a id="def-aqft8-positive-frequency"></a>

<!-- formal-statement-start -->
> **定義（Minkowski正周波数写像）**  
> $m>0$、$u=Ef$ を実空間コンパクトなKlein–Gordon解、$(q,p)$ をその時刻零のCauchyデータとする。一粒子Hilbert空間 $\mathfrak h=L^2(\mathbb R^3,d^3\boldsymbol k)$ への実線形写像 $K:\mathcal V\to\mathfrak h$ を
$$
K[f](\boldsymbol k)=\frac1{\sqrt2}\left(
\sqrt{\omega_{\boldsymbol k}}\widehat q_f(\boldsymbol k)
+\frac{i}{\sqrt{\omega_{\boldsymbol k}}}\widehat p_f(\boldsymbol k)\right)
$$
> で定める。$K[f]$ を実解の正周波数一粒子波束と呼ぶ。$\mathfrak h$ の内積は本講の計算では第2変数線形の
$$
(h,k)_{\mathfrak h}:=\int_{\mathbb R^3}\overline{h(\boldsymbol p)}k(\boldsymbol p)\,d^3p
$$
> を使う（QFT4・5の第1変数線形の内積とは引数順が逆）。
<!-- formal-statement-end -->

$K$ は $f$ の代表ではなく $Ef$ から決まるため、$f\mapsto f+P\varphi$ で変わりません。$\omega_{\boldsymbol k}\ge m>0$ だから、コンパクト支持の滑らかな $q,p$ のFourier変換は急減少し、$K[f]\in L^2$ です。

<!-- definition-example-start: def-aqft8-positive-frequency -->
### 直接例：位置データと速度データ

**定義の確認**。実Cauchyデータを二組取って正周波数写像へ代入し、複素内積の虚部を検算します。

実数値の非零 $a\in C_c^\infty(\mathbb R^3)$ を取り、$(q,p)=(a,0)$ と $(0,a)$ の解をそれぞれ $u,v$ とします。[AQFT4の商から解への全射性](../AQFT4/index.md#thm-aqft4-kg-quotient)により、$u=Ef$、$v=Eg$ となる実試験関数 $f,g$ を選べます。定義へデータを入れると
$$
K[f]=\sqrt{\omega/2}\,\widehat a,\qquad
K[g]=i\widehat a/\sqrt{2\omega}.
$$
従って
$$
(K[f],K[g])_{\mathfrak h}
=\frac i2\int_{\mathbb R^3}|\widehat a|^2\,d^3k
=\frac i2\int_{\mathbb R^3}a^2\,d^3x.
$$
最後はPlancherelの等式です。虚部を二倍すると $\sigma([f],[g])=\int a^2$ と一致します。**単に正のノルムを計算したのではなく、シンプレクティック形式の符号も実際に確認しました。**
<!-- definition-example-end -->

<a id="prop-aqft8-symplectic-isometry"></a>

<!-- formal-statement-start -->
> **命題（正周波数写像の虚部と実部）**  
> $m>0$、上記の実源商 $\mathcal V$、$\sigma$、$K$ を取る。任意の $F,G\in\mathcal V$ に対し
$$
2\operatorname{Im}(KF,KG)_{\mathfrak h}=\sigma(F,G),\qquad
\mu_0(F,G):=\operatorname{Re}(KF,KG)_{\mathfrak h}
$$
> が成立する。$\mu_0$ は[AQFT7の許容共分散](../AQFT7/index.md#def-aqft7-covariance)であり、二点形式は
$$
\Lambda_0(F,G)=(KF,KG)_{\mathfrak h}
=\mu_0(F,G)+\frac i2\sigma(F,G)
$$
> となる。
<!-- formal-statement-end -->

### 証明の見取り図

内積の四項を展開し、実データのFourier変換が $\widehat q(-k)=\overline{\widehat q(k)}$ を満たすことを用います。実部にはエネルギーに似た正の二次形式が残り、虚部はCauchyデータの交代形式になります。

<!-- proof-start -->
### 証明

実数値データ $q_f,p_f,q_g,p_g$ に対するPlancherelの等式を用い、$K$ の内積を展開します。
$$
\begin{aligned}
(KF,KG)_{\mathfrak h}
=\frac12\int d^3k\,\bigl[
&\omega\,\overline{\widehat q_f}\widehat q_g
+\omega^{-1}\overline{\widehat p_f}\widehat p_g\\
&+i\overline{\widehat q_f}\widehat p_g
-i\overline{\widehat p_f}\widehat q_g
\bigr].
\end{aligned}
$$
$\omega(-k)=\omega(k)$ と実データの現実条件から、最初の二項の積分は実数です。交差項も $\int\overline{\widehat q_f}\widehat p_g=\int q_fp_g$、$\int\overline{\widehat p_f}\widehat q_g=\int p_fq_g$ という実数です。よって
$$
\begin{aligned}
2\operatorname{Re}(KF,KG)
&=\int d^3k\,
(\omega\overline{\widehat q_f}\widehat q_g+
\omega^{-1}\overline{\widehat p_f}\widehat p_g),\\
2\operatorname{Im}(KF,KG)
&=\int d^3x\,(q_fp_g-p_fq_g)
=\sigma(F,G).
\end{aligned}
$$
特に $\mu_0(F,F)=\|KF\|^2\ge0$ です。[複素Hilbert空間のCauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)から
$$
|\sigma(F,G)|=2|\operatorname{Im}(KF,KG)|
\le2\|KF\|\|KG\|
=2\sqrt{\mu_0(F,F)\mu_0(G,G)}.
$$
従って[AQFT7の不確定性条件](../AQFT7/index.md#def-aqft7-covariance)を満たし、最後の二点形式の等式も従います。
<!-- proof-end -->

## 2. 因果伝播子と質量殻Fourier変換を突き合わせる

[AQFT4の因果伝播子](../AQFT4/index.md#thm-aqft4-kg-quotient)を時間Fourier変換で直接確かめましょう。固定した $\boldsymbol k$ で、$\ddot u+\omega^2u=\widehat f$ の遅延基本解は $\theta(t)\sin(\omega t)/\omega$、先進基本解は $-\theta(-t)\sin(\omega t)/\omega$ です。したがって差 $E$ の核は $\sin(\omega t)/\omega$ で、時間零データは
$$
\begin{aligned}
\widehat q_f(\boldsymbol k)
&=-\int_{\mathbb R}\frac{\sin(\omega_{\boldsymbol k}s)}{\omega_{\boldsymbol k}}
\widehat f(s,\boldsymbol k)\,ds,\\
\widehat p_f(\boldsymbol k)
&=\int_{\mathbb R}\cos(\omega_{\boldsymbol k}s)
\widehat f(s,\boldsymbol k)\,ds.
\end{aligned}
$$
$\sqrt{\omega}\widehat q+i\widehat p/\sqrt{\omega}$ の組合せがなぜ便利か、ここで理由が見えます。$\,-\sin\theta+i\cos\theta=i e^{i\theta}$ より
$$
K[f](\boldsymbol k)
=\frac{i}{\sqrt{2\omega_{\boldsymbol k}}}
\int_{\mathbb R} e^{i\omega_{\boldsymbol k}s}\widehat f(s,\boldsymbol k)\,ds.
$$
QFT4・5と同じ**非ユニタリ**な時空Fourier変換
$$
\widetilde f(E,\boldsymbol k)=\int_{\mathbb R^4}
f(t,\boldsymbol x)e^{iEt-i\boldsymbol k\cdot\boldsymbol x}\,dt\,d^3x
$$
を使うと、空間Fourier変換だけには $(2\pi)^{-3/2}$ が入っているので、結論は
$$
\boxed{K[f](\boldsymbol k)=
\frac{i}{(2\pi)^{3/2}}
\frac{\widetilde f(\omega_{\boldsymbol k},\boldsymbol k)}
{\sqrt{2\omega_{\boldsymbol k}}}.}
$$
この $i$ は $E=G_{\mathrm{ret}}-G_{\mathrm{adv}}$ と選んだCauchyデータから生じます。**二点内積では $(-i)i=1$ と相殺する一方、符号を確認せず省いてよいわけではありません。**

<a id="def-aqft8-vacuum-two-point"></a>

<!-- formal-statement-start -->
> **定義（Minkowski真空共分散と二点形式）**  
> $m>0$ の実Klein–Gordon源商上で、上記の正周波数写像 $K$ から
$$
\mu_{\mathrm{vac}}(F,G)=\operatorname{Re}(KF,KG)_{\mathfrak h},
\qquad
\Lambda_{\mathrm{vac}}(F,G)=(KF,KG)_{\mathfrak h}
$$
> を定める。対応する中心化quasifree状態を $\omega_{\mathrm{vac}}$ と書く。実試験関数 $f,g$ に対する二点形式は
$$
\Lambda_{\mathrm{vac}}([f],[g])
=\int_{\mathbb R^3}\frac{d^3k}{(2\pi)^3\,2\omega_{\boldsymbol k}}\,
\overline{\widetilde f(\omega_{\boldsymbol k},\boldsymbol k)}
\,\widetilde g(\omega_{\boldsymbol k},\boldsymbol k)
$$
> である。
<!-- formal-statement-end -->

[許容共分散からの状態構成](../AQFT7/index.md#thm-aqft7-quasifree-state)に命題の $\mu_{\mathrm{vac}}$ を代入するため、Weyl C*環上の**正規化された正の状態が実在**します。$\Lambda$ の積分はSchwartz級の減衰と $\omega\ge m$ から有限です。

<!-- definition-example-start: def-aqft8-vacuum-two-point -->
### 直接例：非零の二点ノルムと交換子の違い

**定義の確認**。同じ位置データから正の二点対角値を、異なる速度データを加えた組からCCRの虚部を確かめます。

前節の初期データ $(a,0)$ を持つ $F$ について
$$
\Lambda_{\mathrm{vac}}(F,F)=\frac12\int d^3k\,
\omega_{\boldsymbol k}|\widehat a(\boldsymbol k)|^2>0.
$$
一方 $\Lambda_{\mathrm{vac}}(F,F)-\Lambda_{\mathrm{vac}}(F,F)=0=i\sigma(F,F)$ です。$G$ を初期データ $(0,a)$ に変えると
$$
\Lambda_{\mathrm{vac}}(F,G)=\frac i2\int a^2,\quad
\Lambda_{\mathrm{vac}}(G,F)=-\frac i2\int a^2 .
$$
従って差は $i\int a^2=i\sigma(F,G)$。正値性は任意の複素線形結合に対し $\|\sum_jz_jKF_j\|^2\ge0$ から確認できます。**二点関数が零でないことと交換子が零でないことは別の性質**です。
<!-- definition-example-end -->

<a id="thm-aqft8-wightman-match"></a>

<!-- formal-statement-start -->
> **定理（自由場Fock真空とAQFT二点形式の一致）**  
> $m>0$、四次元Minkowski時空、$P=\partial_t^2-\Delta+m^2$、実試験関数商 $\mathcal V$、$E=G_{\mathrm{ret}}-G_{\mathrm{adv}}$、$\sigma=-\int fEg$ を取る。[QFT4の一粒子波束](../../../物理系/QFT/QFT4/index.md#def-qft4-smeared-field)を $u_f(k)=\widetilde f(\omega_k,k)/\sqrt{2\omega_k}$ とする。このとき
$$
K[f]=i(2\pi)^{-3/2}u_f,\qquad
\Lambda_{\mathrm{vac}}([f],[g])=W_{\mathrm{QFT5}}(f,g)
$$
> が成立する。右辺は時間順序を取らない[QFT5のWightman二点分布](../../../物理系/QFT/QFT5/index.md#def-qft5-wightman)であり、その核は分布の意味で
$$
W(x-y)=\int_{\mathbb R^3}\frac{d^3k}{(2\pi)^3\,2\omega_k}
e^{-i\omega_k(x^0-y^0)+i\boldsymbol k\cdot(\boldsymbol x-\boldsymbol y)}
$$
> となる。さらに $\Lambda_{\mathrm{vac}}(F,G)-\Lambda_{\mathrm{vac}}(G,F)=i\sigma(F,G)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

時間零の正周波数分解を先に作り、源 $f$ を因果伝播子で解に送って初期値へ戻すと、QFT4の波束と位相 $i$ を除いて一致します。二点内積で位相が消え、Fourier指数を展開するとQFT5の核になります。

<!-- proof-start -->
### 証明

上節の遅延・先進差のCauchyデータに $K$ を代入した式より、$K[f]=i(2\pi)^{-3/2}u_f$ が得られました。ゆえに
$$
\begin{aligned}
(K[f],K[g])_{\mathfrak h}
&=\int d^3k\,\overline{K[f](k)}K[g](k)\\
&=\int\frac{d^3k}{(2\pi)^3\,2\omega_k}
\overline{\widetilde f(\omega_k,k)}\widetilde g(\omega_k,k).
\end{aligned}
$$
実試験関数に対しFourier変換の複素共役を取ると
$$
\overline{\widetilde f(\omega,k)}
=\int d^4x\,f(x)e^{-i\omega x^0+i\boldsymbol k\cdot\boldsymbol x}
$$
です。この式と $\widetilde g$ の定義を代入し、分布としてまとめると
$$
\Lambda_{\mathrm{vac}}([f],[g])
=\int d^4x\,d^4y\,f(x)g(y)
\int\frac{d^3k}{(2\pi)^3\,2\omega_k}
e^{-i\omega_k(x^0-y^0)+i\boldsymbol k\cdot(\boldsymbol x-\boldsymbol y)}.
$$
したがって核が表示されます。[QFT5のFock交換関係を使った二点表示](../../../物理系/QFT/QFT5/index.md#thm-qft5-wightman-positive)では、内積が**第1変数線形**で $W(f,g)=\langle u_g,u_f\rangle_{\mathrm{QFT}}$ と書かれます。本講の第2変数線形内積なら同じ複素数は $(u_f,u_g)$ です。引数順序を交換しているのであり、物理的符号を反転したわけではありません。

最後に[正周波数写像の虚部](#prop-aqft8-symplectic-isometry)から
$$
\Lambda_{\mathrm{vac}}(F,G)-\Lambda_{\mathrm{vac}}(G,F)
=2i\operatorname{Im}(KF,KG)=i\sigma(F,G).
$$
この差は時間順序化したFeynman二点関数との差ではありません。
<!-- proof-end -->

## 3. Fock表示でWeyl関係とGaussian期待値を作る

QFT4では生成・消滅演算子が**有限粒子の共通不変領域**で定義されていました。ここでは一粒子空間 $\mathfrak h$ 上の対称Fock空間
$$
\mathcal F_s(\mathfrak h)=\bigoplus_{n=0}^\infty\mathfrak h^{\otimes_s n},
\qquad \Omega=(1,0,0,\ldots)
$$
を取ります。各 $h\in\mathfrak h$ の生成・消滅演算子はQFT4の式を密度によって拡張でき、$\Phi(h)=a(h)+a^\dagger(h)$ は実線形です。$e^{i\Phi(h)}$ はFock空間のユニタリとして定義でき、有限粒子ベクトル上の形式的なBaker–Campbell–Hausdorff計算だけに依存しないよう、次の命題では指数ベクトルで検算します。

<a id="def-aqft8-fock-weyl"></a>

<!-- formal-statement-start -->
> **定義（自由場のFock Weyl表現）**  
> 上記の $\mathfrak h$ と $\mathcal F_s(\mathfrak h)$ に対し、$F\in\mathcal V$ の像 $h=KF$ から
$$
W_{\mathcal F}(F):=e^{i\Phi(h)},\qquad \Phi(h)=a(h)+a^\dagger(h)
$$
> を定める。ここで $a(h)$ は反線形、$a^\dagger(h)$ は線形であり、$\Omega$ は零粒子ベクトルである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft8-fock-weyl -->
### 直接例：零元と非零の一粒子波束

**定義の確認**。$F=0$ では $K0=0$ であることを使います。

直接例として $F=0$ なら $K0=0$、$\Phi(0)=0$ なので $W_{\mathcal F}(0)=I$、$\langle\Omega,W_{\mathcal F}(0)\Omega\rangle=1$ です。より非自明に、上の $(a,0)$ データなら $\|KF\|^2=\int\omega|\widehat a|^2/2$ で、真空期待値は $e^{-\|KF\|^2/2}\in(0,1)$ となります。定義の規格化を $e^{i\Phi/\sqrt2}$ に替えると指数の係数が半分になり、AQFT7と合わなくなるので注意してください。
<!-- definition-example-end -->

<a id="prop-aqft8-fock-weyl"></a>

<!-- formal-statement-start -->
> **命題（Fock Weyl関係と真空特性汎関数）**  
> $m>0$、実源商 $\mathcal V$ の写像 $K$ とFock表示 $W_{\mathcal F}$ を上のように定める。任意の $F,G\in\mathcal V$ に対し
$$
\begin{gathered}
W_{\mathcal F}(F)W_{\mathcal F}(G)
=e^{-i\sigma(F,G)/2}W_{\mathcal F}(F+G),\\
W_{\mathcal F}(F)^*=W_{\mathcal F}(-F),\qquad
\langle\Omega,W_{\mathcal F}(F)\Omega\rangle
=e^{-\mu_{\mathrm{vac}}(F,F)/2}
\end{gathered}
$$
> が成立する。従ってこのベクトル状態は[AQFT7の中心化quasifree状態](../AQFT7/index.md#def-aqft7-quasifree)に一致する。
<!-- formal-statement-end -->

### 証明の見取り図

生成演算子だけを指数にしたベクトルは各粒子数成分が明示でき、指数の内積も積分ではなく級数で計算できます。Weylユニタリの作用をこの稠密な族で比較すると、位相は $\operatorname{Im}(KF,KG)$ になります。

<!-- proof-start -->
### 証明

指数ベクトル $\varepsilon(v)=\bigoplus_{n\ge0}v^{\otimes n}/\sqrt{n!}$ は、$\|\varepsilon(v)\|^2=e^{\|v\|^2}$ でFock空間に属し、これらの線形包は稠密です。生成・消滅演算子の定義から、有限粒子切断で計算した極限として
$$
W(h)\varepsilon(v)
=\exp\left(-\frac{\|h\|^2}{2}+i(h,v)_{\mathfrak h}\right)
\,\varepsilon(v+ih)
$$
を得ます。ここでは $W(h)=e^{i(a(h)+a^\dagger(h))}$ で、指数因子の第2項 $i(h,v)$ は、$e^{ia(h)}$ を $\varepsilon(v)$ に作用させて得ます。一方、定数項 $-\|h\|^2/2$ は交換子 $[ia(h),ia^\dagger(h)]=-\|h\|^2$ に由来します。実際 $a(h)\varepsilon(v)=(h,v)\varepsilon(v)$、$e^{ia^\dagger(h)}\varepsilon(v)=\varepsilon(v+ih)$ なので、分解
$$
W(h)=e^{-\|h\|^2/2}e^{ia^\dagger(h)}e^{ia(h)}
$$
の両辺は指数ベクトル上で同じ作用を与えます（無限級数は固定した指数ベクトル上でノルム収束します）。

$W(h)W(k)\varepsilon(v)$ を順に計算すると
$$
\begin{aligned}
&\exp\left(-\frac{\|h\|^2+\|k\|^2}{2}
+i(h,v+ik)+i(k,v)\right)\varepsilon(v+i(h+k))\\
&=\exp\bigl(-i\operatorname{Im}(h,k)\bigr)
\,W(h+k)\varepsilon(v).
\end{aligned}
$$
第2行は $\|h+k\|^2=\|h\|^2+\|k\|^2+2\operatorname{Re}(h,k)$ を使ったものです。なお $(h,ik)=i(h,k)$ なので位相は $e^{-i\operatorname{Im}(h,k)}$ です。稠密な指数ベクトル上で一致する有界ユニタリは全Fock空間で一致します。[虚部の同定](#prop-aqft8-symplectic-isometry)により $\operatorname{Im}(KF,KG)=\sigma(F,G)/2$。逆元は $W(-h)$ で随伴性が従います。

最後に $\varepsilon(0)=\Omega$、$\langle\Omega,\varepsilon(ih)\rangle=1$ より
$$
\langle\Omega,W(h)\Omega\rangle
=e^{-\|h\|^2/2}=e^{-\mu_{\mathrm{vac}}(F,F)/2}.
$$
[AQFT7の状態の一意性](../AQFT7/index.md#thm-aqft7-quasifree-state)から具体的Weyl C*環の状態と一致します。

なおFockの有限Weyl線形結合が[AQFT6の具体的なC*ノルム](../AQFT6/index.md#prop-aqft6-twisted-translation)で有界であることも必要です。[AQFT7のGaussian Weyl状態構成定理](../AQFT7/index.md#thm-aqft7-quasifree-state)の証明中のFølner平均を**今回のFockユニタリ表示**に適用すると、任意の有限和に対し
$$
\left\|\sum_jc_jW_{\mathcal F}(F_j)\right\|
\le\left\|\sum_jc_jL(F_j)\right\| .
$$
従ってFock表示は具体的Weyl C*環の有界 *-表現へ延長し、上のベクトル状態はそのC*環上で正しく定義されます。
<!-- proof-end -->

**二点関数の作用素としての意味。** $a(KF)\Omega=0$ かつ $\Phi(KF)\Omega=a^\dagger(KF)\Omega$ だから、真空は各場の定義域に属し
$$
\langle\Phi(KF)\Omega,\Phi(KG)\Omega\rangle
=(KF,KG)_{\mathfrak h}=\Lambda_{\mathrm{vac}}(F,G)
$$
です。ここで左辺は第2変数線形の内積で示しました。場の積を無条件に全空間で定義したという主張ではありません。

## 4. 不変性・スペクトル条件・真空一意性

真空と呼ぶための[追加条件](../AQFT3/index.md#def-aqft3-vacuum)は、Gaussian状態であることとは独立です。[AQFT6のPoincaré自己同型](../AQFT6/index.md#thm-aqft6-haag-kastler)は源を $f(x)\mapsto f(h^{-1}x)$ と運びます。

正エネルギー質量殻 $\mathscr H_m^+=\{(\omega_{\boldsymbol k},\boldsymbol k)\}$ では、$d^3k/(2\omega_{\boldsymbol k})$ が固有時向きLorentz変換で不変です。先ほどの $K[f]=i(2\pi)^{-3/2}u_f$ の式から、並進 $a=(a^0,\boldsymbol a)$ は
$$
(KT_af)(\boldsymbol k)
=e^{i(\omega_{\boldsymbol k}a^0-\boldsymbol k\cdot\boldsymbol a)}K[f](\boldsymbol k)
$$
を満たします。Lorentz変換 $\ell$ には、質量殻上の運動量を $p\mapsto\ell^{-1}p$ と変換して波束へ代入し、$d^3k/(2\omega)$ と整合する平方根の重みを付けたユニタリ $U_1(\ell)$ が対応します。したがって全Poincaré群に対して $(KT_hF,KT_hG)=(KF,KG)$ が成立します。

<a id="thm-aqft8-vacuum-spectrum"></a>

<!-- formal-statement-start -->
> **定理（Minkowski Fock状態の正エネルギーと真空一意性）**  
> $m>0$ の実Klein–Gordon源商 $\mathcal V$ のWeyl C*netと、上記の許容実対称形式から得られる中心化quasifree状態 $\omega_{\mathrm{vac}}$ を考える。この状態は固有時向きPoincaré群に不変である。対応するFock実装は
$$
U_{\mathcal F}(h)=\Gamma(U_1(h))
$$
> であり、強連続である。並進の共同スペクトルは[AQFT3の前方閉光円錐](../AQFT3/index.md#def-aqft3-spectrum)に含まれ、平行移動に不変なFockベクトルは真空の定数倍だけである。すなわち
$$
\operatorname{supp}E_{\mathcal F}\subseteq\overline V_+,\qquad
\{\psi:U_{\mathcal F}(a)\psi=\psi\ (\forall a\in\mathbb R^4)\}=\mathbb C\Omega .
$$
<!-- formal-statement-end -->

### 証明の見取り図

質量殻上の一粒子並進の位相は $e^{i(\omega t-k\cdot x)}$ なので、生成作用素の共同スペクトルは未来質量殻にあります。$n$ 粒子ではこれを $n$ 個加算します。未来光円錐は加算に閉じており、正の質量により $n\ge1$ の全エネルギーは零になれません。

<!-- proof-start -->
### 証明

**(1) 共変性・不変性。** 実試験関数 $f$ のFourier変換に $f(h^{-1}x)$ を代入し、変数を $x=hy$ と置きます。固有時向きPoincaré変換のJacobian絶対値は1で、正の質量殻は正の質量殻へ移るため
$$
\widetilde{T_hf}(p)=
e^{i(p^0a^0-\boldsymbol p\cdot\boldsymbol a)}\widetilde f(\ell^{-1}p)
$$
という形になります。並進位相の符号は[AQFT3の規約](../AQFT3/index.md#def-aqft3-spectrum) $U(a)=e^{i(a^0H-\boldsymbol a\cdot\boldsymbol P)}$ と一致します。質量殻測度 $d^3k/(2\omega_k)$ が不変なので、[二点形式の積分表示](#def-aqft8-vacuum-two-point)に代入すれば $\Lambda_{\mathrm{vac}}(T_hF,T_hG)=\Lambda_{\mathrm{vac}}(F,G)$。従って $\mu_{\mathrm{vac}}$ も不変、[AQFT7の状態の一意性](../AQFT7/index.md#thm-aqft7-quasifree-state)から $\omega_{\mathrm{vac}}\circ\alpha_h=\omega_{\mathrm{vac}}$ です。

**(2) 強連続性。** 並進の一粒子表現は上の乗算位相であり、$a\to0$ で点ごとに $1$ へ収束し絶対値は1です。$h\in L^2$ に対し
$$
\|(U_1(a)-I)h\|^2
=\int|e^{i(\omega_ka^0-\boldsymbol k\cdot\boldsymbol a)}-1|^2|h(k)|^2\,d^3k\to0
$$
が優収束定理で従います。Lorentz変換についても質量殻上のコンパクト支持滑らかな波束では変数変換と一様連続性により強連続、密度とユニタリ性で全 $\mathfrak h$ へ延長できます。$n$ 粒子上の $\Gamma(U_1)$ は $U_1^{\otimes n}$ なので有限粒子ベクトルで強連続です。任意のFockベクトルは有限粒子切断で近似できるので、再びユニタリ性から全空間の強連続性が従います。

**(3) 共同スペクトル。** $n$ 粒子空間での平行移動は
$$
(U_{\mathcal F}(a)\psi)_n(k_1,\ldots,k_n)
=e^{i\{a^0\sum_j\omega_{k_j}-\boldsymbol a\cdot\sum_j k_j\}}\psi_n(k_1,\ldots,k_n)
$$
です。従って共同スペクトルの支持は $n=0$ で $\{0\}$、$n\ge1$ で
$$
\left\{\left(\sum_{j=1}^n\omega_{k_j},\sum_{j=1}^nk_j\right)\right\}^{\mathrm{closure}}
\subset\overline V_+ .
$$
最後の包含は $\sum_j\omega_{k_j}\ge\sum_j|k_j|\ge|\sum_jk_j|$ から得られます。直和の共同スペクトルも閉包を取って $\overline V_+$ の中にあります。

**(4) 真空一意性。** $\Omega$ は零粒子なので $U_{\mathcal F}(a)\Omega=\Omega$。一方、$n\ge1$ なら各 $\omega_{k_j}\ge m$、従って $n$ 粒子エネルギー $\sum_j\omega_{k_j}\ge nm>0$ です。時間並進不変なベクトルの $n$ 粒子成分は零でなければならず、残るのは零粒子成分 $\mathbb C\Omega$ だけです。
<!-- proof-end -->

<a id="prop-aqft8-gns-fock"></a>

<!-- formal-statement-start -->
> **命題（真空quasifree状態のGNSとFock表現）**  
> 上の $m>0$ の $\omega_{\mathrm{vac}}$ について、Fock空間の真空 $\Omega$ は $W_{\mathcal F}(F)$（$F\in\mathcal V$）に対して巡回である。従って[OA5のGNS構成](../../OA/OA5/index.md#thm-oa5-gns)で得る $\omega_{\mathrm{vac}}$ の巡回表現は、このFock表現とユニタリ同値である。
<!-- formal-statement-end -->

### 証明の見取り図

まずコンパクト支持の実初期データから作る $K(\mathcal V)$ が複素線形包として一粒子空間で稠密であることを示します。その後、Weylユニタリを真空に作用させたcoherentベクトルから、各粒子数の対称テンソルを極限・偏極化で回収します。

<!-- proof-start -->
### 証明

位置データだけを使い、速度データは零に固定します。実数値のコンパクト支持滑らかな関数 $q$ に対応する正周波数波束は
$$
K(q,0)=\sqrt{\omega/2}\,\widehat q
$$
です。ここで $\widehat q$ は空間Fourier変換を表します。

これらの波束の複素線形包が一粒子空間で稠密であることを、直交補から確かめます。$g\in\mathfrak h$ がその全てに直交するとします。任意の複素数値コンパクト支持滑らかな $q$ は二つの実数値関数の複素線形結合ですから、直交性は
$$
0=(g,K(q,0))_{\mathfrak h}
=\frac1{\sqrt2}\int_{\mathbb R^3}
\overline{g(k)}\sqrt{\omega_k}\widehat q(k)\,d^3k
$$
をその全ての $q$ に対して要求します。

$\sqrt{\omega_k}\,g(k)$ が通常の $L^2$ に属するとは限りません。しかし任意のSchwartz関数 $\varphi$ について
$$
\left|\int_{\mathbb R^3}\overline{g(k)}\sqrt{\omega_k}\,\varphi(k)\,d^3k\right|
\le\|g\|_2\,\|\sqrt{\omega}\,\varphi\|_2<\infty
$$
であり、右辺はSchwartz半ノルムで抑えられます。従って重み付き関数 $\sqrt{\omega}\,\overline g$ は緩増加分布を定めます。上の直交性は、その逆Fourier変換が全てのコンパクト支持滑らかな試験関数に対して零であることを意味します。Fourier変換の単射性から、この分布は零です。従って $\sqrt{\omega_k}g(k)=0$ がほとんど至る所で成立します。$\omega_k\ge m>0$ より $g=0$。直交補が零なので、複素線形包は稠密です。

なお各実データ $(q,0)$ は[AQFT4の商・解同型](../AQFT4/index.md#thm-aqft4-kg-quotient)により何らかの $F\in\mathcal V$ に対応します。

[Weyl期待値の計算](#prop-aqft8-fock-weyl)により
$$
W_{\mathcal F}(F)\Omega=e^{-\|KF\|^2/2}\varepsilon(iKF).
$$
有限個の $F_j$ と実数 $t_j$ について $t\mapsto W_{\mathcal F}(tF_j)\Omega$ はFockノルムで解析的で、$t_j=0$ の各階微分は $(KF_j)^{\otimes n}$ と低粒子数成分の線形結合を与えます。微分の定義に沿ってベクトルの差を $t$ で割る極限を取ると、巡回閉部分空間に $n$ 粒子純成分が入ります。例えば一次では
$$
\lim_{t\to0}\frac{W_{\mathcal F}(tF)\Omega-\Omega}{t}
=i\,a^\dagger(KF)\Omega,
$$
二次では二階微分から既知の零粒子成分を除くと $(iKF)^{\otimes2}$ が残ります。一般の $n$ も同じTaylor級数を次数順に用いて帰納します。偏極恒等式で $(KF)^{\otimes n}$ から混合対称テンソルを作り、$K(\mathcal V)$ の複素線形包の稠密性を使えば各 $\mathfrak h^{\otimes_s n}$ に稠密です。零粒子も $\Omega$ 自身があるので巡回性が従います。

このFock三つ組は $\omega_{\mathrm{vac}}$ を実現する巡回表現です。[OA5のGNS一意性](../../OA/OA5/index.md#thm-oa5-gns)を適用すれば、$[A]\mapsto\pi_{\mathcal F}(A)\Omega$ が内積
$$
\langle[A],[B]\rangle_{\mathrm{GNS}}
=\omega_{\mathrm{vac}}(A^*B)
$$
を保ち、稠密値域を持つためユニタリへ延長します。
<!-- proof-end -->

ここで**一粒子空間の複素全域をKの実像が覆う**とは主張していません。巡回性の証明に必要なのは複素線形包の稠密性です。一般のquasifree状態を選べば、同じFock表現とユニタリ同値になるとは限りません。その差はAQFT10で扱います。

## 5. 質量零と条件の境界

本講の核となる証明では $m>0$ として $\omega^{-1/2}$ が運動量原点で有界であることを利用しました。$m=0$ では $\omega_k=|k|$ が原点で零となりますが、**3空間次元**のコンパクト支持滑らかなデータについて
$$
\int_{|k|<1}\frac{|\widehat p(k)|^2}{|k|}\,d^3k
\le C\int_0^1 r\,dr<\infty
$$
なので $K(q,p)$ 自体は $L^2$ に入ります。ただし原点での滑らかさ、低次元での赤外問題、真空状態の拡張を $m>0$ と同じ一行の議論で済ませてはいけません。質量零の同様の構成には、原点を除いた質量殻上での極限と測度零集合の扱いを改めて確認します。

また、$W(x-y)$ は点で有限な関数とは限りません。真空の「二点関数」の正確な意味は、実あるいは複素の試験関数を掛けた**分布としての二点量**です。Gaussian正値性だけでは、Poincaré不変性も正エネルギーも領域ごとのvon Neumann環の型も結論できません。

## 6. 演習と詳細解答

### Level A：正周波数・規格化・符号の個別確認

<a id="ex-aqft8-a01"></a>
#### AQFT8-A01 振動子の正周波数係数
- Level: A

$\omega>0$、$u(t)=q\cos\omega t+(p/\omega)\sin\omega t$、$q,p\in\mathbb R$ とする。$e^{-i\omega t}$ の係数を求め、それを $K=(\sqrt\omega\,q+ip/\sqrt\omega)/\sqrt2$ で表せ。

<!-- solution-start -->
**詳細解答**。$\cos\theta=(e^{i\theta}+e^{-i\theta})/2$、$\sin\theta=(e^{i\theta}-e^{-i\theta})/(2i)$ を使うと
$$
u(t)=\frac12\left(q+\frac{ip}{\omega}\right)e^{-i\omega t}
+\frac12\left(q-\frac{ip}{\omega}\right)e^{i\omega t}.
$$
従って正周波数係数は $(q+ip/\omega)/2$ です。$K/\sqrt{2\omega}=(q+ip/\omega)/2$ と一致します。$p$ の項の符号を逆にすると負周波数係数になります。
<!-- solution-end -->

<a id="ex-aqft8-a02"></a>
#### AQFT8-A02 初期データの交代形式
- Level: A

実数 $q,p,q',p'$ と $\omega>0$ に対し $K(q,p)=(\sqrt\omega q+ip/\sqrt\omega)/\sqrt2$ を定める。$2\operatorname{Im}\overline{K(q,p)}K(q',p')$ を求めよ。

<!-- solution-start -->
**詳細解答**。共役を先に取ると
$$
\overline{K(q,p)}K(q',p')
=\frac12\left(\omega qq'+\frac{pp'}{\omega}
+iqp'-ipq'\right).
$$
実部は前二項、虚部は $(qp'-pq')/2$ です。よって $2\operatorname{Im}(\overline{K(q,p)}K(q',p'))=qp'-pq'$。順序を交換すると負号に変わり、[AQFT5の形式](../AQFT5/index.md#def-aqft5-causal-symplectic)と一致します。
<!-- solution-end -->

<a id="ex-aqft8-a03"></a>
#### AQFT8-A03 質量殻ノルムの $(2\pi)$ 係数
- Level: A

$u_f(k)=\widetilde f(\omega_k,k)/\sqrt{2\omega_k}$、$K[f]=i(2\pi)^{-3/2}u_f$ とする。$\|K[f]\|^2$ と $\omega_{\mathrm{vac}}(W([f]))$ を書け。

<!-- solution-start -->
**詳細解答**。複素共役で $i$ は $-i$ となり積は $1$ です。従って
$$
\|K[f]\|^2
=\int_{\mathbb R^3}\frac{d^3k}{(2\pi)^3\,2\omega_k}
|\widetilde f(\omega_k,k)|^2.
$$
[中心化quasifree状態の定義](../AQFT7/index.md#def-aqft7-quasifree)により
$$
\omega_{\mathrm{vac}}(W([f]))
=\exp\left[-\frac12\int\frac{d^3k}{(2\pi)^3\,2\omega_k}
|\widetilde f(\omega_k,k)|^2\right].
$$
指数の前の $1/2$ と質量殻測度の $1/(2\omega)$ は別の係数なので落としません。
<!-- solution-end -->

<a id="ex-aqft8-a04"></a>
#### AQFT8-A04 時間並進のエネルギー符号
- Level: A

$f_a(t,x)=f(t-a^0,x-\boldsymbol a)$ とする。$\widetilde f_a(\omega_k,k)$ に付く位相を求め、$a=(s,0)$ の一粒子時間並進のエネルギー符号を[AQFT3の規約](../AQFT3/index.md#def-aqft3-spectrum)で述べよ。

<!-- solution-start -->
**詳細解答**。変数 $t'=t-a^0$、$x'=x-\boldsymbol a$ に置換すると
$$
\widetilde f_a(E,k)=
e^{i(Ea^0-k\cdot\boldsymbol a)}\widetilde f(E,k).
$$
$E=\omega_k>0$ とすれば $K[f_a]=e^{i(\omega_ka^0-k\cdot\boldsymbol a)}K[f]$。$a=(s,0)$ で $U(s)=e^{isH}$、一粒子エネルギーは $H$ の乗算関数 $\omega_k>0$ です。$e^{-is\omega}$ を選ぶと、この**能動的な**時空並進と矛盾します。
<!-- solution-end -->

<a id="ex-aqft8-a05"></a>
#### AQFT8-A05 質量零の赤外積分
- Level: A

空間次元3で $\widehat p$ が有界、$\omega_k=|k|$ とする。$|k|<\varepsilon$ における $|\widehat p(k)|^2/\omega_k$ の積分が有限であることを示せ。空間次元1では同じ上界で何が起こるか。

<!-- solution-start -->
**詳細解答**。$|\widehat p(k)|\le C$ とすると球座標の体積要素 $4\pi r^2dr$ により
$$
\int_{|k|<\varepsilon}\frac{|\widehat p(k)|^2}{|k|}\,d^3k
\le4\pi C^2\int_0^\varepsilon r\,dr
=2\pi C^2\varepsilon^2<\infty.
$$
一次元では上界が $C^2\int_{-\varepsilon}^{\varepsilon}dk/|k|$ となり発散します。この比較だけで任意の $\widehat p$ が発散するとはいえませんが、一般の非零零モードに対する危険を示します。
<!-- solution-end -->

### Level B：二点形式からFock・スペクトル条件まで

<a id="ex-aqft8-b01"></a>
#### AQFT8-B01 二点正値性とCCRを同時に検算
- Level: B

実源商の $F_1,\ldots,F_N$ と複素係数 $z_j$ に対し $\Lambda(F,G)=(KF,KG)$ とする。複素Gram正値性と、二点形式の反対称部を証明せよ。正値性だけから正エネルギーは従うか。

<!-- solution-start -->
**詳細解答**。内積の第2変数線形性から
$$
\sum_{j,k}\overline{z_j}z_k\Lambda(F_j,F_k)
=\left(\sum_jz_jKF_j,\sum_kz_kKF_k\right)
=\left\|\sum_jz_jKF_j\right\|^2\ge0.
$$
さらに
$$
\Lambda(F,G)-\Lambda(G,F)
=2i\operatorname{Im}(KF,KG)
=i\sigma(F,G)
$$
は[虚部の命題](#prop-aqft8-symplectic-isometry)で証明済みです。正値性は内積の条件、正エネルギーは**並進の共同スペクトル**に関する条件です。並進作用を指定しなければ後者は従いません。
<!-- solution-end -->

<a id="ex-aqft8-b02"></a>
#### AQFT8-B02 Gaussian期待値とWeyl位相
- Level: B

$\sigma(F,G)=s$、$\mu(F,F)=a$、$\mu(G,G)=b$、$\mu(F,G)=c$ を与え、$\omega_{\mathrm{vac}}(W(F)W(G))$ と $\omega_{\mathrm{vac}}(W(G)W(F))$ を計算せよ。ただし $\mu$ は許容共分散である。

<!-- solution-start -->
**詳細解答**。[Weyl関係](../AQFT6/index.md#def-aqft6-weyl-ccr)により
$$
W(F)W(G)=e^{-is/2}W(F+G),\qquad
W(G)W(F)=e^{is/2}W(F+G).
$$
双線形性から $\mu(F+G,F+G)=a+2c+b$ なので、[quasifree状態](../AQFT7/index.md#def-aqft7-quasifree)を適用して
$$
\omega_{\mathrm{vac}}(W(F)W(G))
=e^{-is/2}e^{-(a+2c+b)/2},\qquad
\omega_{\mathrm{vac}}(W(G)W(F))
=e^{is/2}e^{-(a+2c+b)/2}.
$$
二式の差は $-2i\sin(s/2)e^{-(a+2c+b)/2}$。これは有限Weyl元の交換子期待値であり、場の二点反対称部 $is$ そのものではありません。後者は $tF,tG$ に関する二階微分から得ます。
<!-- solution-end -->

<a id="ex-aqft8-b03"></a>
#### AQFT8-B03 多粒子スペクトルの包含
- Level: B

$m>0$、$\omega_{k_j}=\sqrt{|k_j|^2+m^2}$、$p_n=(\sum_j\omega_{k_j},\sum_jk_j)$ とする。任意の $n\ge1$ で $p_n\in\overline V_+$、時間並進不変な $n$ 粒子ベクトルが零であることを示せ。

<!-- solution-start -->
**詳細解答**。各 $\omega_{k_j}\ge|k_j|$ なので、三角不等式を順に適用すると
$$
p_n^0=\sum_j\omega_{k_j}
\ge\sum_j|k_j|\ge\left|\sum_jk_j\right|.
$$
従って $p_n\in\overline V_+$ です。また $\omega_{k_j}\ge m$ なので $p_n^0\ge nm>0$。時間並進は $e^{itp_n^0}$ を掛けます。すべての $t$ で不変なら、そのベクトルは $p_n^0=0$ の集合に支持される必要がありますが、これは空集合です。従って零ベクトルしかありません。
<!-- solution-end -->

<a id="ex-aqft8-b04"></a>
#### AQFT8-B04 QFTの内積規約とAQFTの順序
- Level: B

QFT5の内積を $\langle v,w\rangle_{\mathrm{QFT}}=\int v\overline w\,d\mu$、本講の内積を $(v,w)=\int\overline v w\,d\mu$ とする。QFT5で $W(f,g)=\langle u_g,u_f\rangle_{\mathrm{QFT}}$ と書く理由を説明し、AQFTの $\Lambda(f,g)$ と照合せよ。

<!-- solution-start -->
**詳細解答**。QFT5では内積の第1変数が線形なので
$$
\langle u_g,u_f\rangle_{\mathrm{QFT}}
=\int u_g\overline{u_f}\,d\mu
=\int\overline{u_f}u_g\,d\mu
=(u_f,u_g).
$$
$K[f]=i(2\pi)^{-3/2}u_f$ なので、同じ測度の取り方に直すと
$$
(K[f],K[g])_{L^2(d^3k)}
=\int\frac{d^3k}{(2\pi)^3}\overline{u_f(k)}u_g(k)
=W(f,g).
$$
二点の順序を逆にすると一般に複素共役となり、虚部（CCR符号）が反転します。内積の引数順だけを機械的に合わせるのではなく、どちらの変数が線形かを先に確認する必要があります。
<!-- solution-end -->

### Level C：一つの真空模型を最初から再構成する

<a id="ex-aqft8-c01"></a>
#### AQFT8-C01 実データからWeyl真空・正エネルギーまで
- Level: C

$m>0$ の自由実Klein–Gordon場で、実コンパクト支持Cauchyデータ $(q,p)$ を持つ解を考える。(i) 正周波数波束 $K(q,p)$ を定め、(ii) $\sigma((q,p),(q',p'))$ が $2\operatorname{Im}(K(q,p),K(q',p'))$ に等しいことを導け。(iii) $\omega(W(F))$ を定めてquasifree状態の正値性を説明し、(iv) 並進作用の位相から多粒子の正エネルギーと真空の一意性を示せ。(v) 以上だけで任意の相互作用netの真空一意性が言えない理由を述べよ。

<!-- solution-start -->
**詳細解答**。(i) Fourier変換で各 $k$ の振動子方程式を解き、
$$
\widehat u(t,k)=\widehat q(k)\cos\omega_kt+
\widehat p(k)\sin(\omega_kt)/\omega_k.
$$
$e^{-i\omega_kt}$ の係数は $(\widehat q+i\widehat p/\omega_k)/2$ なので
$$
K(q,p)=\frac{\sqrt{\omega_k}\widehat q+i\widehat p/\sqrt{\omega_k}}{\sqrt2}.
$$
$m>0$ だから $K$ は $L^2$ に属します。

(ii) 内積を四項に展開して実データの現実条件を使うと、虚部に寄与するのは交差項だけです。
$$
2\operatorname{Im}(K(q,p),K(q',p'))
=\int d^3k(\overline{\widehat q}\widehat p'
-\overline{\widehat p}\widehat q')
=\int d^3x(qp'-pq')=\sigma(F,G).
$$
これは[AQFT5の商形式](../AQFT5/index.md#def-aqft5-causal-symplectic)との一致です。

(iii) $\mu(F,G)=\operatorname{Re}(KF,KG)$ とすると $\mu(F,F)=\|KF\|^2$、さらに
$$
|\sigma(F,G)|^2=4|\operatorname{Im}(KF,KG)|^2
\le4\|KF\|^2\|KG\|^2=4\mu(F,F)\mu(G,G).
$$
[quasifree状態の存在定理](../AQFT7/index.md#thm-aqft7-quasifree-state)が使えるので
$$
\omega(W(F))=e^{-\mu(F,F)/2}
$$
は正の線形汎関数としてC*閉包まで延長されます。単に指数が正という議論ではありません。

(iv) 能動的な源の移動 $f_a(x)=f(x-a)$ は
$$
K[f_a](k)=e^{i(\omega_ka^0-k\cdot a)}K[f](k)
$$
と作用するため、一粒子の共同スペクトルは $(\omega_k,k)$ 上にあります。$n$ 粒子では和となり
$$
\sum_j\omega_{k_j}\ge\sum_j|k_j|\ge|\sum_j k_j|,
\qquad
\sum_j\omega_{k_j}\ge nm>0\quad(n\ge1).
$$
従って全スペクトルは $\overline V_+$ にあり、時間並進不変な正粒子数成分は零。零粒子真空 $\Omega$ が唯一の並進不変方向です。

(v) 証明では自由Klein–Gordon方程式、正周波数の質量殻、対称Fock空間上の粒子数ごとのエネルギー加法性を使いました。これらは一般の相互作用netに自動的には備わらないので、その真空の存在・一意性をこの構成から推論することはできません。
<!-- solution-end -->

## 7. 到達点と次講

Minkowskiの正周波数写像 $K$ をCauchyデータから定義し、$\sigma=2\operatorname{Im}(K\cdot,K\cdot)$ を検算しました。源 $f$ からは $K[f]=i(2\pi)^{-3/2}\widetilde f(\omega,k)/\sqrt{2\omega}$ と求まり、QFT4・5と規格化が一致します。$\mu_{\mathrm{vac}}=\operatorname{Re}(K\cdot,K\cdot)$ は許容共分散で、そのWeyl状態はFock真空のGaussian期待値そのものです。平行移動の位相から正エネルギーと真空一意性も示しました。

**次講AQFT9「GNSから局所von Neumann環へ」**では、この真空表現の下で局所C*環を二重可換子により弱閉包し、$\mathfrak A(O)$ と $\pi_{\mathrm{vac}}(\mathfrak A(O))''$ を区別します。
