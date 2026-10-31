# QFT24 QEDの一ループ真空偏極・Ward恒等式と電荷のくりこみ

[QFT18の木レベルWard–Takahashi恒等式](../QFT18/index.md#thm-qft18-tree-ward)は、光子の運動量で電子頂点を縮約すると二つの逆伝播核の差が残ることを示しました。[QFT23の反項](../QFT23/index.md#def-qft23-bare-counterterms)は、発散した係数を測定条件で調整する手順を示しました。では、この二つを実際のQED量子補正へつなぐと、**光子の質量が勝手に生まれず、電荷の大きさだけが運動量によって変わる**という主張は、どの計算から出るのでしょうか。

今回の中心問いは、**電子・陽電子の閉ループによる光子二点頂点を計算し、ゲージ対称性が反項の形をどう制限するか**です。横性を先に確かめ、次元正則化で発散係数と有限な運動量依存を求めます。最後に、単純な鋭いカットオフを使うと横性が壊れる具体例を確認します。これは固定次数の摂動計算であり、無限体積の相互作用QEDを厳密に構成したという主張ではありません。

## 1. Euclid型QEDと光子二点頂点

この講義では一種類の質量 $m>0$ のDiracフェルミオン、正の電荷の大きさ $e>0$、外部Euclid運動量 $p\in\mathbb R^4$ を考え、$\hbar=c=1$ とします。実時間の符号や極の処方は[QFT17の最小結合](../QFT17/index.md#def-qft17-qed-action)と[QFT20のWick回転の条件](../QFT20/index.md#def-qft20-contour-wick)に注意し、ここからは明示的にEuclid規約を固定します。

Euclidのgamma行列は $\{\gamma_\mu,\gamma_\nu\}=2\delta_{\mu\nu}I$、$\operatorname{tr}I=4$、$\operatorname{tr}(\gamma_\mu\gamma_\nu)=4\delta_{\mu\nu}$ とし、$\not k=\gamma_\mu k_\mu$ と書きます。Fourier変換は $\partial_\mu\mapsto ik_\mu$ です。よって自由Dirac核とその逆は

$$
D(k)=i\not k+m,\qquad
S(k)=D(k)^{-1}=\frac{-i\not k+m}{k^2+m^2}.
$$

積 $D(k)(-i\not k+m)=(k^2+m^2)I$ は[Clifford関係](../QFT7/index.md#def-qft7-clifford)から直接従います。ここで $S$ は実時間の $S_F$ と数値因子が異なる**Euclid核**です。

光子場 $A_\mu$ に結合するEuclidのDirac作用素を $D_A=\gamma_\mu(\partial_\mu+ieA_\mu)+m$ とします。[有限次元Grassmann積分の行列式](../QFT19/index.md#thm-qft19-berezin-det)から、有限モードでフェルミオンを積分消去した作用は、光子に依存しない定数を除き $-\operatorname{Tr}\log D_A$ です。$\operatorname{Tr}$ は位置・運動量の積分とスピノル行列traceを合わせた形式的記号です。

<a id="def-qft24-vacuum-polarization"></a>

<!-- formal-statement-start -->
> **定義（一ループ真空偏極テンソル）**
> 質量 $m>0$、結合 $e>0$ のEuclid型QEDのフェルミオン核 $S(k)=(i\not k+m)^{-1}$ について、閉フェルミオンループから生じる光子二点の1PI係数を、同じ正則化の下で

$$
\Pi_{\mu\nu}(p)
=-e^2\int\frac{d^dk}{(2\pi)^d}\,
\operatorname{tr}\!\left[
\gamma_\mu S(k)\gamma_\nu S(k+p)\right]
$$

> と定める。$d=4-2\varepsilon$ は後述する次元正則化の積分次元で、結合には次元を合わせる因子 $\mu^{2\varepsilon}$ を含めて解釈する。$\mu>0$ は基準スケールである。四次元での光子二次有効作用は、自由Maxwell作用に加えて

$$
\frac12\int\frac{d^4p}{(2\pi)^4}
A_\mu(-p)\Pi_{\mu\nu}(p)A_\nu(p)
$$

> を含むものとする。総和添字はEuclid添字 $\mu,\nu=1,\ldots,d$ とし、四次元での実際の光子成分は四個である。
<!-- formal-statement-end -->

この全体符号は、閉ループだからと暗記する必要はありません。$X=ieS\gamma_\mu A_\mu$ と置き、形式的な行列対数を二次まで展開すると

$$
-\operatorname{Tr}\log(1+X)
=-\operatorname{Tr}X+\frac12\operatorname{Tr}X^2+O(A^3).
$$

$i^2=-1$ から $\operatorname{Tr}X^2/2=-e^2\operatorname{Tr}(S\gamma A S\gamma A)/2$ です。光子二点頂点の規約は[QFT21の1PI頂点](../QFT21/index.md#def-qft21-proper-vertex)と同じ「有効作用の二階微分」です。

<!-- definition-example-start: def-qft24-vacuum-polarization -->
### 例：零外部運動量でループの二本の核を確かめる

**定義の確認**：$p=0$ なら二本の核は同じ $S(k)$ です。$S(k)$ の分子を二つ掛けると、gamma行列が奇数個の項はtraceで消え、残りは

$$
\operatorname{tr}\{\gamma_\mu(-i\not k+m)\gamma_\nu(-i\not k+m)\}
=-4(2k_\mu k_\nu-\delta_{\mu\nu}k^2)+4m^2\delta_{\mu\nu}.
$$

従って定義の先頭の負号を含めると、被積分関数の分子は

$$
4e^2\left[2k_\mu k_\nu-\delta_{\mu\nu}(k^2+m^2)\right].
$$

この段階で $\Pi_{\mu\nu}(0)$ を通常の収束積分だと扱ってはいけません。分母は $(k^2+m^2)^2$ であり、四次元ではUV発散します。**正則化を指定してから**横性・反項を判定する必要があります。
<!-- definition-example-end -->

## 2. Ward恒等式は閉ループで何を消すか

光子の縦向き成分とは、外部運動量 $p_\mu$ に平行な部分です。局所U(1)変換の下で純ゲージの成分は物理自由度でないため、正則化・反項の選び方もそれを尊重しなければなりません。ここでは木レベルの[逆核の差の恒等式](../QFT18/index.md#thm-qft18-tree-ward)をEuclid核へ翻訳します。

<a id="thm-qft24-loop-ward"></a>

<!-- formal-statement-start -->
> **定理（一ループ真空偏極の横性）**
> 質量 $m>0$ の一種類のDirac場について、$D(k)=i\not k+m$、$S(k)=D(k)^{-1}$ とし、[真空偏極テンソル](#def-qft24-vacuum-polarization)を運動量平行移動に不変な次元正則化で定める。gamma行列は $d=4-2\varepsilon$ 次元のClifford関係を形式的に満たし、traceの規格化を $4$ とする。このとき、解析接続で定まる一ループ係数として

$$
p_\mu\Pi_{\mu\nu}(p)=0
$$

> が任意のEuclid外部運動量 $p$ で成立する。$O(d)$ 回転不変性と組み合わせると、$p\ne0$ ではスカラー関数 $\Pi(p^2)$ が存在して

$$
\Pi_{\mu\nu}(p)
=(p^2\delta_{\mu\nu}-p_\mu p_\nu)\Pi(p^2)
$$

> と表せる。質量 $m>0$ では正則化・減算後のスカラー係数は $p^2=0$ の近傍にも延長できる。
<!-- formal-statement-end -->

### 証明の見取り図

外部運動量でgamma頂点を縮約すると $D(k+p)-D(k)$ が生まれます。両側に伝播核を挟むと、二つの核の**差**になります。閉ループ全体では、その差は積分変数の平行移動で相殺されます。最後に回転不変な二階テンソルの一般形を用います。

<!-- proof-start -->
### 証明

Dirac逆核の差を直接計算します。

$$
D(k+p)-D(k)
=i\gamma_\mu(k_\mu+p_\mu)+m-(i\gamma_\mu k_\mu+m)
=i\not p.
$$

両側から $S(k+p)$、$S(k)$ を順序を保って掛けると

$$
\begin{aligned}
S(k+p)i\not p\,S(k)
&=S(k+p)\{D(k+p)-D(k)\}S(k)\\
&=D(k+p)^{-1}D(k+p)S(k)\\
&\quad-S(k+p)D(k)D(k)^{-1}\\
&=S(k)-S(k+p).
\end{aligned}
$$

真空偏極のtraceを巡回させて、$\gamma_\mu$ の直前へ $S(k+p)$ を移すと

$$
\begin{aligned}
p_\mu\Pi_{\mu\nu}(p)
&=-e^2\mu^{2\varepsilon}
\int\frac{d^dk}{(2\pi)^d}
\operatorname{tr}\{S(k+p)\not p\,S(k)\gamma_\nu\}\\
&=-\frac{e^2\mu^{2\varepsilon}}{i}
\int\frac{d^dk}{(2\pi)^d}
\operatorname{tr}\{[S(k)-S(k+p)]\gamma_\nu\}=0.
\end{aligned}
$$

最後の零は発散した二つの積分を勝手に別々に収束させた結果ではありません。次元正則化の解析接続された積分は変数変換 $k\mapsto k+p$ を保つため、**正則化された差全体**が零になるという意味です。

回転不変性から、$p\ne0$ で二階テンソルは $a(p^2)\delta_{\mu\nu}+b(p^2)p_\mu p_\nu$ の形です。これを $p_\mu$ と縮約すると

$$
[a(p^2)+p^2b(p^2)]p_\nu=0.
$$

従って $a=-p^2b$。$\Pi=-b$ と書けば主張の横方向の形になります。$m>0$ の零運動量近傍における正則化後の解析性は、次節で得る $\log[m^2+x(1-x)p^2]$ の積分から直接確認します。
<!-- proof-end -->

ここで使った「横性」は、光子の二点補正が**運動量に比例する縦成分を持たない**という意味です。全量子次数の三点Ward–Takahashi恒等式や $Z_1=Z_2$ までこの証明だけで確定したわけではありません。頂点補正・電子自己エネルギーの計算は別途必要です。

## 3. trace・Feynmanパラメータ・一ループ積分

横性が分かっても係数 $\Pi(p^2)$ は未知です。ここで実際に閉ループを計算します。[QFT23の次元正則化](../QFT23/index.md#def-qft23-dimensional-regularization)と[Gamma関数積分](../QFT23/index.md#thm-qft23-dimensional-integral)を使います。

<a id="thm-qft24-transverse-integral"></a>

<!-- formal-statement-start -->
> **定理（真空偏極のFeynmanパラメータ表示）**
> 質量 $m>0$、結合 $e>0$ の一種類のEuclid型Dirac場の一ループ真空偏極を $d=4-2\varepsilon$ の次元正則化で定義し、$d$ 次元Clifford関係と $\operatorname{tr}I=4$ を用いる。$\Delta_x=m^2+x(1-x)p^2$、基準スケール $\mu>0$ とすると

$$
\Pi_{\mu\nu}(p)
=(p^2\delta_{\mu\nu}-p_\mu p_\nu)
\,8e^2\int_0^1x(1-x)I_2(\Delta_x)\,dx,
$$

$$
I_2(\Delta)=
\mu^{2\varepsilon}\int\frac{d^d\ell}{(2\pi)^d}
\frac{1}{(\ell^2+\Delta)^2}
=\frac{\mu^{2\varepsilon}}{(4\pi)^{d/2}}
\Gamma\!\left(2-\frac d2\right)\Delta^{d/2-2}.
$$

> ここで等式は解析接続した摂動係数の意味で成立する。$\bar\mu^2=4\pi e^{-\gamma_E}\mu^2$ と置くと、$\varepsilon\to0$ においてスカラー係数は

$$
\Pi(p^2)=\frac{e^2}{2\pi^2}
\int_0^1x(1-x)
\left[\frac1\varepsilon-\log\frac{\Delta_x}{\bar\mu^2}\right]dx
+O(\varepsilon).
$$
<!-- formal-statement-end -->

### 証明の見取り図

二本の伝播核の分子をClifford traceで展開し、分母はFeynmanパラメータで一つにまとめます。平行移動した積分変数の二次項は回転対称性で $\delta_{\mu\nu}$ に置き換えます。部分積分の恒等式によって質量項が消え、横方向のテンソルが残ります。

<!-- proof-start -->
### 証明

まず奇数個のgamma行列のtraceは零であり、四個のtraceを反交換関係から

$$
\operatorname{tr}(\gamma_\mu\gamma_\alpha\gamma_\nu\gamma_\beta)
=4(\delta_{\mu\alpha}\delta_{\nu\beta}
-\delta_{\mu\nu}\delta_{\alpha\beta}
+\delta_{\mu\beta}\delta_{\alpha\nu})
$$

と計算します。よって[定義](#def-qft24-vacuum-polarization)の分子は

$$
N_{\mu\nu}(k,p)
=4e^2\{k_\mu(k+p)_\nu+k_\nu(k+p)_\mu
-\delta_{\mu\nu}[k\cdot(k+p)+m^2]\}.
$$

正の数 $A,B$ について $1/(AB)=\int_0^1[xB+(1-x)A]^{-2}dx$ とする恒等式（[前講の導出](../QFT23/index.md#prop-qft23-subtracted-bubble)）を、$A=k^2+m^2$、$B=(k+p)^2+m^2$ に適用します。$xB+(1-x)A=(k+xp)^2+\Delta_x$ です。$\ell=k+xp$ と平行移動すると、奇関数の項は積分で消えるため偶関数部分は

$$
N_{\mu\nu}^{\mathrm{even}}
=4e^2\{2\ell_\mu\ell_\nu-\delta_{\mu\nu}\ell^2
-2x(1-x)p_\mu p_\nu
+\delta_{\mu\nu}[x(1-x)p^2-m^2]\}.
$$

次元正則化の回転不変性によって、$F(\ell^2)$ を伴う二次モーメントは

$$
\int d^d\ell\,\ell_\mu\ell_\nu F(\ell^2)
=\frac{\delta_{\mu\nu}}d\int d^d\ell\,\ell^2F(\ell^2)
$$

です。$I_1(\Delta)=\mu^{2\varepsilon}\int d^d\ell/(2\pi)^d\,(\ell^2+\Delta)^{-1}$ と置くと、表面項のない次元正則化の部分積分は

$$
0=\int\frac{d^d\ell}{(2\pi)^d}\,
\frac{\partial}{\partial\ell_\rho}
\frac{\ell_\rho}{\ell^2+\Delta}
=d\,\frac{I_1(\Delta)}{\mu^{2\varepsilon}}
-2\int\frac{d^d\ell}{(2\pi)^d}
\frac{\ell^2}{(\ell^2+\Delta)^2}.
$$

他方、分子を $\ell^2=(\ell^2+\Delta)-\Delta$ と分ければ

$$
\mu^{2\varepsilon}\int\frac{d^d\ell}{(2\pi)^d}
\frac{\ell^2}{(\ell^2+\Delta)^2}
=I_1(\Delta)-\Delta I_2(\Delta).
$$

両式より

$$
\left(1-\frac d2\right)I_1(\Delta)=\Delta I_2(\Delta),
\qquad
\left(\frac2d-1\right)
\mu^{2\varepsilon}\int\frac{d^d\ell}{(2\pi)^d}
\frac{\ell^2}{(\ell^2+\Delta)^2}
=\Delta I_2(\Delta).
$$

従って $\delta_{\mu\nu}$ の係数は

$$
\Delta_x+x(1-x)p^2-m^2
=2x(1-x)p^2,
$$

$p_\mu p_\nu$ の係数は $-2x(1-x)$ です。最初の $4e^2$ と合わせて $8e^2x(1-x)$ が残り、表示式を得ます。

$I_2$ は[Gamma関数による次元積分](../QFT23/index.md#thm-qft23-dimensional-integral)へ指数 $2$ を代入したものです。$\Gamma(\varepsilon)=1/\varepsilon-\gamma_E+O(\varepsilon)$、$(4\pi)^\varepsilon\mu^{2\varepsilon}\Delta^{-\varepsilon}=1+\varepsilon\log(4\pi\mu^2/\Delta)+O(\varepsilon^2)$ を掛け、

$$
I_2(\Delta)=\frac1{16\pi^2}
\left[\frac1\varepsilon-\log\frac{\Delta}{\bar\mu^2}\right]+O(\varepsilon)
$$

を得ます。係数 $8/(16\pi^2)=1/(2\pi^2)$ であり、$1/\varepsilon$ の積分係数は $\int_0^1x(1-x)dx=1/6$ です。
<!-- proof-end -->

### 例：$p=0$ と一般の $p$ で係数を確認する

$p=0$ では $\Delta_x=m^2$ で全ての $x$ に共通です。したがって

$$
\Pi(0)=\frac{e^2}{12\pi^2}
\left[\frac1\varepsilon-\log\frac{m^2}{\bar\mu^2}\right]
+O(\varepsilon).
$$

一方、$p\ne0$ でも $p_\mu\Pi_{\mu\nu}=p_\mu(p^2\delta_{\mu\nu}-p_\mu p_\nu)\Pi=0$ です。**係数が発散すること**と**横性が失われること**は別の問題であると分かります。

## 4. 光子反項と零運動量減算

光子の古典作用は、[Maxwell作用](../QFT15/index.md#def-qft15-maxwell-action)のEuclid版として $F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu$ を用いた $\int F_{\mu\nu}F_{\mu\nu}/4$ です。Fourier変換すると $F_{\mu\nu}(p)=i[p_\mu A_\nu(p)-p_\nu A_\mu(p)]$ です。二つの反対称な項を展開し、$A_\mu(-p)$ と $A_\nu(p)$ の係数を集めると

$$
\frac14\int d^4x\,F_{\mu\nu}F_{\mu\nu}
=\frac12\int\frac{d^4p}{(2\pi)^4}
A_\mu(-p)(p^2\delta_{\mu\nu}-p_\mu p_\nu)A_\nu(p).
$$

こうして核が $(p^2\delta_{\mu\nu}-p_\mu p_\nu)$ となる理由が見えます。この**同じテンソル構造**に限って反項を置けば、光子に明示的な質量項を加えずに発散を相殺できます。

<a id="def-qft24-photon-subtraction"></a>

<!-- formal-statement-start -->
> **定義（光子場反項と零運動量減算法）**
> 四次元Euclid型QEDで、一種類の質量 $m>0$ のDirac場による一ループ光子二点の横方向係数を $\Pi(p^2)$ とする。光子の場の強さに対する反項を

$$
S_{\mathrm{ct},A}=
\frac{\delta Z_3}{4}\int d^4x\,F_{\mu\nu}F_{\mu\nu}
$$

> と置き、くりこみ後の横方向二点核の係数を

$$
\Pi_R(p^2)=\Pi(p^2)+\delta Z_3
$$

> と定める。$\Pi_R(0)=0$ を課す方式を、本講義の光子の零運動量減算法と呼ぶ。$m>0$ によって $p^2=0$ に赤外特異性がないことを仮定する。ゲージ固定に伴う縦方向の自由核は別に扱い、この条件では変更しない。
<!-- formal-statement-end -->

この条件は、光子の「質量を零に設定する」という条件と同一ではありません。横性により補正は初めから $(p^2\delta_{\mu\nu}-p_\mu p_\nu)$ に比例し、零運動量で消えるのはテンソル全体です。**その前に掛かるスカラー係数**を零へ規格化することで、長距離での電荷を基準として選びます。

<!-- definition-example-start: def-qft24-photon-subtraction -->
### 例：自由Maxwell場で条件を確認する

**定義の確認**：$e=0$ ではフェルミオンの閉ループは消え、$\Pi=0$ です。$\delta Z_3=0$ と取れば $\Pi_R(0)=0$ で、横方向の逆核は $(p^2\delta_{\mu\nu}-p_\mu p_\nu)$ のままです。もし $\delta Z_3=c\ne0$ とすれば逆核は $(1+c)$ 倍となり、長距離での場の規格化が変わるため、条件を満たさなくなります。規格化条件が反項の有限部分を選ぶことを確認できました。
<!-- definition-example-end -->

<a id="thm-qft24-renormalized-photon"></a>

<!-- formal-statement-start -->
> **定理（一ループ光子反項と有限真空偏極）**
> 質量 $m>0$、結合 $e>0$ の一種類のDirac場によるEuclid QEDの一ループ光子真空偏極を、$\bar\mu^2=4\pi e^{-\gamma_E}\mu^2$ とする次元正則化 $d=4-2\varepsilon$ で計算する。四次元でのくりこみ後の係数を $\Pi_R=\Pi+\delta Z_3$ と定めると、表示する $O(e^2)$ の次数で次が成り立つ。
>
> **（1）修正最小減算法**では極のみを相殺し、

$$
\delta Z_3^{\overline{\mathrm{MS}}}
=-\frac{e^2}{12\pi^2}\frac1\varepsilon,
\qquad
\Pi_{\overline{\mathrm{MS}}}(p^2)
=-\frac{e^2}{2\pi^2}
\int_0^1x(1-x)\log\frac{m^2+x(1-x)p^2}{\bar\mu^2}\,dx.
$$

> **（2）零運動量減算法**では有限部分も調整し、

$$
\delta Z_3^{(0)}
=-\frac{e^2}{12\pi^2}
\left[\frac1\varepsilon-\log\frac{m^2}{\bar\mu^2}\right],
$$

$$
\boxed{\Pi_R^{(0)}(p^2)
=-\frac{e^2}{2\pi^2}\int_0^1x(1-x)
\log\left(1+\frac{x(1-x)p^2}{m^2}\right)dx}.
$$

> ここで反項は各々示した一ループ係数であり、より高次の $O(e^4)$ 補正は表示していない。零運動量減算後の積分は、任意の固定 $p^2\ge0$ で有限である。
<!-- formal-statement-end -->

### 証明の見取り図

[前節の次元正則化積分](#thm-qft24-transverse-integral)では発散項が $p$ に依存しません。従って光子の運動量二次核全体に共通の係数を引くだけで済みます。有限な対数の差を取ると正則化スケールも消えます。

<!-- proof-start -->
### 証明

[真空偏極の積分公式](#thm-qft24-transverse-integral)の極部分は

$$
\frac{e^2}{2\pi^2}\frac1\varepsilon
\int_0^1x(1-x)\,dx
=\frac{e^2}{12\pi^2\varepsilon}.
$$

従って極のみを相殺する修正最小減算法では、$\delta Z_3$ にその負号を付けます。有限部分は元の係数から $1/\varepsilon$ を引いた対数積分となります。

零運動量条件では、$p=0$ のとき $\Delta_x=m^2$ なので

$$
\Pi(0)=\frac{e^2}{12\pi^2}
\left[\frac1\varepsilon-\log\frac{m^2}{\bar\mu^2}\right]
+O(\varepsilon).
$$

$\delta Z_3^{(0)}=-\Pi(0)$ と選び、外部運動量がある場合へ戻すと

$$
\begin{aligned}
\Pi_R^{(0)}(p^2)
&=\lim_{\varepsilon\to0}\{\Pi(p^2)-\Pi(0)\}\\
&=-\frac{e^2}{2\pi^2}\int_0^1x(1-x)
\left[
\log\frac{\Delta_x}{\bar\mu^2}
-\log\frac{m^2}{\bar\mu^2}
\right]dx\\
&=-\frac{e^2}{2\pi^2}\int_0^1x(1-x)
\log\frac{\Delta_x}{m^2}\,dx.
\end{aligned}
$$

$m^2>0$、$x(1-x)\ge0$ かつ $p^2\ge0$ なので、対数の引数は $1$ 以上です。被積分関数は $x\in[0,1]$ で連続で、有限な値を持ちます。従って固定 $p$ で積分が有限です。反項の形は横方向テンソルに比例するため、[一ループ横性](#thm-qft24-loop-ward)も保たれます。
<!-- proof-end -->

この負の有限係数は、実時間の伝播関数の $i$ や符号を混ぜて覚えると取り違えやすいところです。**本章のEuclid定義では**横方向の有効二点核が $(p^2\delta-pp)[1+\Pi_R^{(0)}]$ となることを基準にします。別の伝播関数の定義で $\Pi$ の符号を逆にする流儀もあります。

## 5. 運動量によって電荷はどちらへ変わるか

正のEuclid運動量で、零運動量減算した対数は非負です。従って本章の $\Pi_R^{(0)}$ は非正となります。この符号は、長距離の電荷を基準にすると短距離で遮蔽が弱まり、**見かけの電荷が増える**というQEDの描像につながります。

<a id="prop-qft24-low-high-momentum"></a>

<!-- formal-statement-start -->
> **命題（質量がある場合の低・高運動量展開）**
> 一種類の質量 $m>0$ のDirac場と正の結合 $e>0$ について、[零運動量減算した真空偏極](#thm-qft24-renormalized-photon)を $Q^2=p^2\ge0$ の関数とする。$Q^2/m^2\to0$ では

$$
\Pi_R^{(0)}(Q^2)
=-\frac{e^2}{60\pi^2}\frac{Q^2}{m^2}
+\frac{e^2}{560\pi^2}\frac{Q^4}{m^4}
+O\!\left(e^2\frac{Q^6}{m^6}\right).
$$

> $Q^2/m^2\to\infty$ では

$$
\Pi_R^{(0)}(Q^2)
=-\frac{e^2}{12\pi^2}\log\frac{Q^2}{m^2}
+\frac{5e^2}{36\pi^2}
+O\!\left(e^2\frac{m^2}{Q^2}\right).
$$

> 展開は固定した一ループ係数についての漸近式であり、高運動量で $e^2|\log(Q^2/m^2)|$ が大きい領域まで、有限次数の摂動近似を正当化するものではない。
<!-- formal-statement-end -->

### 証明の見取り図

低運動量では対数をTaylor展開し、$x(1-x)$ のべき積分を求めます。高運動量では積分の中の $\log(Q^2/m^2)$ を抜き出し、残る $\log[x(1-x)]$ の有限積分を計算します。

<!-- proof-start -->
### 証明

$t=Q^2/m^2$、$a=x(1-x)$ と置くと $0\le a\le1/4$ です。$|t|<4$ では $\log(1+at)=at-(at)^2/2+O(t^3a^3)$ が一様に成り立ちます。Beta積分を直接多項式に展開すると

$$
\int_0^1a^2dx=\int_0^1(x^2-2x^3+x^4)dx
=\frac13-\frac12+\frac15=\frac1{30},
$$

$$
\int_0^1a^3dx=\int_0^1(x^3-3x^4+3x^5-x^6)dx
=\frac14-\frac35+\frac12-\frac17=\frac1{140}.
$$

従って $\int a\log(1+at)dx=t/30-t^2/280+O(t^3)$ となり、低運動量式が従います。

高運動量では $t\ge1$ として

$$
\int_0^1 a\log(1+at)dx
=\frac16\log t+\int_0^1a\log a\,dx
+\int_0^1a\log\left(1+\frac1{at}\right)dx.
$$

端点で $a=0$ となる量は極限値で解釈します。最後の積分は $t\to\infty$ で零になり、$0\le a\log(1+1/(at))\le1/t$（$\log(1+u)\le u$）から $O(1/t)$ です。定数項は $x\leftrightarrow1-x$ の対称性と $\int_0^1x^n\log x\,dx=-1/(n+1)^2$ より

$$
\begin{aligned}
\int_0^1a\log a\,dx
&=2\int_0^1x(1-x)\log x\,dx\\
&=2\left(-\frac14+\frac19\right)=-\frac5{18}.
\end{aligned}
$$

したがって $\int a\log(1+at)dx=(\log t)/6-5/18+O(1/t)$ です。これを $-e^2/(2\pi^2)$ 倍すると高運動量式を得ます。
<!-- proof-end -->

### 例：低エネルギーでは重い粒子の影響が小さい

同じ外部運動量 $Q$ で質量を $m$ から $2m$ へ変えると、$Q^2\ll m^2$ の先頭項は $1/4$ 倍になります。これは「重い荷電粒子の閉ループが厳密に零になる」わけではなく、低運動量では $Q^2/m^2$ に抑えられるという**質量依存の減算条件下**の結果です。

この講義での横方向の光子交換を、同じ基準規格化のもとで概念的に書けば

$$
\frac{e^2}{Q^2[1+\Pi_R^{(0)}(Q^2)]}
=\frac{e_{\mathrm{eff}}^2(Q^2)}{Q^2},
\qquad
e_{\mathrm{eff}}^2(Q^2):=
\frac{e^2}{1+\Pi_R^{(0)}(Q^2)}.
$$

$e^2|\log(Q^2/m^2)|\ll1$ の一ループ有効範囲では $\Pi_R^{(0)}(Q^2)<0$ なので、$e_{\mathrm{eff}}^2(Q^2)>e^2$ です。この式の分母を任意の高エネルギーまで外挿して「極が実在する」と結論してはいけません。くりこみ群による体系的なスケール依存の導出は後続で扱います。

## 6. 鋭いカットオフはなぜ注意が要るか

[横性の証明](#thm-qft24-loop-ward)で、発散する積分の変数を $k\mapsto k+p$ と平行移動しました。しかし積分領域を $|k|\le\Lambda$ と決めると、平行移動先は元の球と一致しません。**球の境界から寄与が出る**ことを直接計算しましょう。

<a id="prop-qft24-sharp-cutoff-boundary"></a>

<!-- formal-statement-start -->
> **命題（鋭い球形カットオフのゲージ非不変な境界項）**
> 四次元Euclid型QEDで質量 $m>0$、結合 $e>0$ とし、[真空偏極の定義](#def-qft24-vacuum-polarization)に $d=4$、$\lvert k\rvert\le\Lambda$（$\Lambda>0$）という同じ球形カットオフを課す。零外部運動量での係数は

$$
\boxed{\Pi_{\mu\nu}^{\mathrm{sharp}}(0)
=-\frac{e^2}{8\pi^2}
\frac{\Lambda^4}{\Lambda^2+m^2}\delta_{\mu\nu}}
$$

> となり、一般には零でない。これはゲージ不変な正則化を使って得た光子質量ではなく、鋭いカットオフが平行移動不変性を失うことによる境界項である。通常の $F_{\mu\nu}F_{\mu\nu}$ 反項は $p=0$ で零なので、この定数項を吸収できない。
<!-- formal-statement-end -->

### 証明の見取り図

零外部運動量での被積分関数は全微分に書けます。有限半径の球ではGaussの発散定理が球面積分を残します。球面上の単位法線の二次平均を使えば係数まで求まります。

<!-- proof-start -->
### 証明

[定義の確認例](#def-qft24-vacuum-polarization)の分子と分母から

$$
\begin{aligned}
\Pi_{\mu\nu}^{\mathrm{sharp}}(0)
&=4e^2\int_{|k|\le\Lambda}
\frac{d^4k}{(2\pi)^4}
\frac{2k_\mu k_\nu-\delta_{\mu\nu}(k^2+m^2)}
{(k^2+m^2)^2}\\
&=-4e^2\int_{|k|\le\Lambda}
\frac{d^4k}{(2\pi)^4}
\frac{\partial}{\partial k_\mu}
\left(\frac{k_\nu}{k^2+m^2}\right).
\end{aligned}
$$

最後の等式は商の微分

$$
\frac{\partial}{\partial k_\mu}
\left(\frac{k_\nu}{k^2+m^2}\right)
=\frac{\delta_{\mu\nu}}{k^2+m^2}
-\frac{2k_\mu k_\nu}{(k^2+m^2)^2}
$$

を代入して確認できます。球面 $|k|=\Lambda$ で $k_\nu=\Lambda n_\nu$、外向き法線は $n_\mu$、面積は $2\pi^2\Lambda^3$ です。回転対称性と $\sum_\mu n_\mu^2=1$ により単位法線の球面上の二次平均値は $\langle n_\mu n_\nu\rangle=\delta_{\mu\nu}/4$ なので、Gaussの定理で

$$
\begin{aligned}
\int_{|k|\le\Lambda}d^4k\,
\frac{\partial}{\partial k_\mu}
\left(\frac{k_\nu}{k^2+m^2}\right)
&=\frac{\Lambda}{\Lambda^2+m^2}
\int_{|k|=\Lambda}n_\mu n_\nu\,dS\\
&=\frac{\Lambda}{\Lambda^2+m^2}
\frac{2\pi^2\Lambda^3}{4}\delta_{\mu\nu}\\
&=\frac{\pi^2\Lambda^4}{2(\Lambda^2+m^2)}
\delta_{\mu\nu}.
\end{aligned}
$$

これに $-4e^2/(2\pi)^4=-e^2/(4\pi^4)$ を掛けると、主張の $-e^2\Lambda^4/\{8\pi^2(\Lambda^2+m^2)\}$ を得ます。
<!-- proof-end -->

この式は $\Lambda\to\infty$ で $-e^2\Lambda^2\delta_{\mu\nu}/(8\pi^2)$ の二次発散を示します。形は光子の質量項のように見えても、**ゲージ変換に不変ではない正則化で生じた偽の信号**です。正則化を変えるか、ゲージ対称性を復元する反項・条件を別途設定しない限り、[横性の証明](#thm-qft24-loop-ward)を鋭い球カットオフにそのまま移すことはできません。

## 7. 演習：符号・横性・有限部分を再構成する

### 演習 QFT24-A1：四つのgamma行列のtrace

- Level: A
- 問題: Euclidのgamma行列が $\{\gamma_\mu,\gamma_\nu\}=2\delta_{\mu\nu}I$、$\operatorname{tr}I=4$ を満たすとする。$\operatorname{tr}(\gamma_\mu\gamma_\alpha\gamma_\nu\gamma_\beta)$ を計算し、$p=0$ の一ループ真空偏極の分子のうち $k_\mu k_\nu$ の係数を求めよ。外部結合の大きさは $e>0$ とする。

<!-- solution-start -->
### 詳細解答

最初のgamma行列を右へ動かし、反交換関係を三回用いると

$$
\begin{aligned}
\operatorname{tr}(\gamma_\mu\gamma_\alpha\gamma_\nu\gamma_\beta)
&=2\delta_{\mu\alpha}\operatorname{tr}(\gamma_\nu\gamma_\beta)
-2\delta_{\mu\nu}\operatorname{tr}(\gamma_\alpha\gamma_\beta)\\
&\quad+2\delta_{\mu\beta}\operatorname{tr}(\gamma_\alpha\gamma_\nu)
-\operatorname{tr}(\gamma_\alpha\gamma_\nu\gamma_\beta\gamma_\mu).
\end{aligned}
$$

最後はtraceの巡回性で左辺と等しく、左辺へ移すと2倍になります。二個のtraceは $4\delta$ なので

$$
\operatorname{tr}(\gamma_\mu\gamma_\alpha\gamma_\nu\gamma_\beta)
=4(\delta_{\mu\alpha}\delta_{\nu\beta}
-\delta_{\mu\nu}\delta_{\alpha\beta}
+\delta_{\mu\beta}\delta_{\alpha\nu}).
$$

これを $k_\alpha k_\beta$ と縮約すると $4(2k_\mu k_\nu-\delta_{\mu\nu}k^2)$。伝播核の二分子にある $(-i)^2=-1$ と[真空偏極の定義](#def-qft24-vacuum-polarization)の全体 $-e^2$ が掛かるので、$k_\mu k_\nu$ の係数は $+8e^2$ です。質量項は $-4e^2m^2\delta_{\mu\nu}$ を与えます。
<!-- solution-end -->

### 演習 QFT24-A2：分母を平方完成する

- Level: A
- 問題: $m>0$、Euclid運動量 $k,p\in\mathbb R^4$ に対し $A=k^2+m^2$、$B=(k+p)^2+m^2$ とする。$x\in[0,1]$ に対して $xB+(1-x)A=(k+xp)^2+m^2+x(1-x)p^2$ を示し、$\Delta_x\ge m^2$ を確認せよ。

<!-- solution-start -->
### 詳細解答

左辺を展開すると

$$
\begin{aligned}
xB+(1-x)A
&=x(k^2+2k\cdot p+p^2+m^2)
+(1-x)(k^2+m^2)\\
&=k^2+2xk\cdot p+xp^2+m^2\\
&=(k+xp)^2+(x-x^2)p^2+m^2.
\end{aligned}
$$

$0\le x\le1$ だから $x-x^2=x(1-x)\ge0$ で、Euclidの $p^2=\sum_\mu p_\mu^2\ge0$ です。従って $\Delta_x=m^2+x(1-x)p^2\ge m^2>0$。分母が零にならないことは、[次元積分公式](#thm-qft24-transverse-integral)の適用条件と零運動量減算の赤外安全性を確認します。
<!-- solution-end -->

### 演習 QFT24-A3：発散係数の $1/6$

- Level: A
- 問題: 次元正則化した一ループ係数が $\Pi(p^2)=\frac{e^2}{2\pi^2}\int_0^1x(1-x)[1/\varepsilon-\log(\Delta_x/\bar\mu^2)]dx+O(\varepsilon)$ であるとする。$\Delta_x=m^2+x(1-x)p^2$、$m>0$ として、$1/\varepsilon$ の係数を求めよ。

<!-- solution-start -->
### 詳細解答

$1/\varepsilon$ は $x,p$ に依存しないので積分の外へ出せます。

$$
\int_0^1x(1-x)\,dx
=\left[\frac{x^2}{2}-\frac{x^3}{3}\right]_0^1
=\frac12-\frac13=\frac16.
$$

よって発散項は $e^2/(12\pi^2\varepsilon)$ です。$p$ に依存しないのは**スカラー係数**であり、テンソル全体には $(p^2\delta_{\mu\nu}-p_\mu p_\nu)$ が掛かるので、光子の質量発散とは異なります。
<!-- solution-end -->

### 演習 QFT24-A4：零運動量での傾き

- Level: A
- 問題: $m,e>0$ とし、$\Pi_R^{(0)}(Q^2)=-\frac{e^2}{2\pi^2}\int_0^1x(1-x)\log[1+x(1-x)Q^2/m^2]dx$ とする。$Q^2=0$ での $Q^2$ に関する導関数を求め、符号を説明せよ。

<!-- solution-start -->
### 詳細解答

積分の中を $Q^2$ で微分すると、連鎖律から

$$
\frac{\partial}{\partial Q^2}
\log\left(1+\frac{x(1-x)Q^2}{m^2}\right)
=\frac{x(1-x)}{m^2+x(1-x)Q^2}.
$$

$m>0$ なので $Q^2\ge0$ の零近傍で分母は $m^2$ 以上です。導関数の絶対値は $x^2(1-x)^2/m^2$ で抑えられ、微分と積分を交換できます。従って

$$
\left.\frac{d\Pi_R^{(0)}}{dQ^2}\right|_{0}
=-\frac{e^2}{2\pi^2m^2}\int_0^1x^2(1-x)^2dx
=-\frac{e^2}{60\pi^2m^2}.
$$

被積分関数が非負で外の係数が負なので、傾きは負です。
<!-- solution-end -->

### 演習 QFT24-A5：球面の二次平均

- Level: A
- 問題: 四次元の半径 $\Lambda>0$ の球面の面積が $2\pi^2\Lambda^3$ であるとする。外向き単位法線 $n=(n_1,\ldots,n_4)$ について $\int_{|k|=\Lambda}n_\mu n_\nu\,dS$ を求めよ。結果を用い、$\int_{|k|\le\Lambda}\partial_{k_\mu}[k_\nu/(k^2+m^2)]\,d^4k$ を計算せよ。$m>0$ とする。

<!-- solution-start -->
### 詳細解答

球面は回転不変なので平均行列は $c\delta_{\mu\nu}$ です。traceを取ると $\sum_\mu n_\mu^2=1$ であるから $4c=1$、すなわち $c=1/4$。従って

$$
\int_{|k|=\Lambda}n_\mu n_\nu\,dS
=\frac{2\pi^2\Lambda^3}{4}\delta_{\mu\nu}.
$$

Gaussの発散定理を各添字成分に適用すると、境界で $k_\nu=\Lambda n_\nu$ より

$$
\int_{|k|\le\Lambda}
\partial_{k_\mu}\left[\frac{k_\nu}{k^2+m^2}\right]d^4k
=\frac{\Lambda}{\Lambda^2+m^2}
\frac{2\pi^2\Lambda^3}{4}\delta_{\mu\nu}
=\frac{\pi^2\Lambda^4}{2(\Lambda^2+m^2)}\delta_{\mu\nu}.
$$

零でない表面項が、鋭い球カットオフを平行移動できないことの具体的な証拠です。
<!-- solution-end -->

### 演習 QFT24-B1：ループのWard恒等式を別の順序から導く

- Level: B
- 問題: Euclid核 $D(k)=i\not k+m$、$S(k)=D(k)^{-1}$ とし、$\Pi_{\mu\nu}(p)=-e^2\int d^dk/(2\pi)^d\,\operatorname{tr}[\gamma_\mu S(k)\gamma_\nu S(k+p)]$ を運動量平行移動に不変な正則化で定義する（必要な基準スケール因子は略す）。traceの巡回性と逆行列を使い $p_\mu\Pi_{\mu\nu}=0$ を導け。$m>0$ とする。発散した積分を通常の可積分関数として個別に扱わないこと。

<!-- solution-start -->
### 詳細解答

$p_\mu\gamma_\mu=\not p=[D(k+p)-D(k)]/i$。traceを巡回させると、二つの伝播核の間へ $\not p$ を置けます。

$$
\begin{aligned}
p_\mu\Pi_{\mu\nu}(p)
&=-e^2\int\frac{d^dk}{(2\pi)^d}
\operatorname{tr}[S(k+p)\not p\,S(k)\gamma_\nu]\\
&=-\frac{e^2}{i}\int\frac{d^dk}{(2\pi)^d}
\operatorname{tr}\bigl[
S(k+p)(D(k+p)-D(k))S(k)\gamma_\nu
\bigr].
\end{aligned}
$$

逆行列の積を対応する順で消すと

$$
\begin{aligned}
S(k+p)D(k+p)S(k)&=S(k),\\
S(k+p)D(k)S(k)&=S(k+p).
\end{aligned}
$$

従って縮約は $-\frac{e^2}{i}\int\operatorname{tr}[S(k)-S(k+p)]\gamma_\nu$ に等しい。同じ次元正則化の下で第二項に $u=k+p$ を代入すると第一項と一致して差は零です。正則化を使わず別々の積分が存在するとは主張していません。[本章の横性定理](#thm-qft24-loop-ward)と同じ結論を、逆核の差の位置から再導出できました。
<!-- solution-end -->

### 演習 QFT24-B2：二つの減算方式の差

- Level: B
- 問題: $m,e>0$ とし、修正最小減算法の有限係数を $\Pi_{\overline{\mathrm{MS}}}(Q^2)=-(e^2/2\pi^2)\int_0^1x(1-x)\log\{[m^2+x(1-x)Q^2]/\bar\mu^2\}dx$ とする。零運動量減算法との差を求め、$\bar\mu=2m$ での $\Pi_{\overline{\mathrm{MS}}}(0)$ と二方式の反項の差を計算せよ。

<!-- solution-start -->
### 詳細解答

零運動量減算は $\Pi_R^{(0)}(Q^2)=\Pi_{\overline{\mathrm{MS}}}(Q^2)-\Pi_{\overline{\mathrm{MS}}}(0)$ と構成できます。$Q^2=0$ を代入すると対数は $x$ に依存しないので

$$
\Pi_{\overline{\mathrm{MS}}}(0)
=-\frac{e^2}{2\pi^2}\frac16\log\frac{m^2}{\bar\mu^2}
=-\frac{e^2}{12\pi^2}\log\frac{m^2}{\bar\mu^2}.
$$

従って任意の $Q^2\ge0$ で

$$
\Pi_{\overline{\mathrm{MS}}}(Q^2)-\Pi_R^{(0)}(Q^2)
=-\frac{e^2}{12\pi^2}\log\frac{m^2}{\bar\mu^2}.
$$

$\bar\mu=2m$ なら $\log(m^2/\bar\mu^2)=-\log4$ だから、$\Pi_{\overline{\mathrm{MS}}}(0)=e^2\log4/(12\pi^2)>0$ です。反項は $\Pi_R=\Pi_{\rm bare}+\delta Z_3$ という[規約](#def-qft24-photon-subtraction)で定義したので

$$
\delta Z_3^{(0)}-\delta Z_3^{\overline{\mathrm{MS}}}
=-\Pi_{\overline{\mathrm{MS}}}(0)
=-\frac{e^2\log4}{12\pi^2}.
$$

有限な定数の配分が異なるだけで、同じ基準条件に合わせて物理量を比較するなら、別の物理効果を追加したわけではありません。
<!-- solution-end -->

### 演習 QFT24-B3：高運動量の対数と定数

- Level: B
- 問題: $t=Q^2/m^2>0$、$a=x(1-x)$、$m>0$ とする。$H(t)=\int_0^1a\log(1+at)dx$ の $t\to\infty$ の主対数項と定数項を求めよ。端点で $a=0$ になることに注意して剰余を評価せよ。

<!-- solution-start -->
### 詳細解答

$0<x<1$ では $1+at=at(1+1/(at))$ なので

$$
H(t)=\log t\int_0^1a\,dx
+\int_0^1a\log a\,dx
+\int_0^1a\log\left(1+\frac1{at}\right)dx.
$$

最初の積分は $1/6$。二番目の積分は対称性から $2\int_0^1(x-x^2)\log x\,dx$ です。$u=x^{n+1}/(n+1)$ で部分積分するか $\int_0^1x^n\log x\,dx=-1/(n+1)^2$ を導くと

$$
2\left[-\frac1{2^2}+\frac1{3^2}\right]
=-\frac5{18}.
$$

第三積分は $\log(1+u)\le u$ と $a\ge0$ により

$$
0\le\int_0^1a\log\left(1+\frac1{at}\right)dx
\le\int_0^1\frac{dx}{t}=\frac1t.
$$

端点の $a=0$ では $a\log(1+1/(at))\to0$ の連続延長を用います。従って $H(t)=(\log t)/6-5/18+O(1/t)$ です。[高運動量命題](#prop-qft24-low-high-momentum)の定数 $5e^2/(36\pi^2)$ もここから再現できます。
<!-- solution-end -->

### 演習 QFT24-B4：二種類の質量と低エネルギー

- Level: B
- 問題: 二種類の独立なDirac場が質量 $m_1,m_2>0$、光子に対する電荷の大きさ $e_1,e_2>0$ を持つとする。両者の閉ループだけを一ループで考え、各ループを零運動量減算する。$Q^2\ll\min(m_1^2,m_2^2)$ での光子の横方向スカラー係数の先頭項を求めよ。異なる種類の場の交差ループがなぜ無いか説明せよ。

<!-- solution-start -->
### 詳細解答

Dirac作用素は種類の空間でブロック対角なので、有限次元の行列式は $\det D_1\det D_2$ です。従って[フェルミオン行列式](../QFT19/index.md#thm-qft19-berezin-det)の対数は $\operatorname{Tr}\log D_1+\operatorname{Tr}\log D_2$ となり、一つの閉ループ中で種類が切り替わる混合頂点はありません。各種類の寄与は加法的です。

各ループの[低運動量展開](#prop-qft24-low-high-momentum)へ $(m,e)=(m_j,e_j)$ を代入すると

$$
\begin{aligned}
\Pi_{R,1}^{(0)}(Q^2)+\Pi_{R,2}^{(0)}(Q^2)
&=-\frac{Q^2}{60\pi^2}
\left(\frac{e_1^2}{m_1^2}+\frac{e_2^2}{m_2^2}\right)\\
&\quad+O\!\left(Q^4
\left[\frac{e_1^2}{m_1^4}+\frac{e_2^2}{m_2^4}\right]\right).
\end{aligned}
$$

「重い種の寄与は低エネルギーで抑制される」とは、このように $1/m_j^2$ が現れることです。高エネルギーでの対数係数とは別の極限を比較しています。
<!-- solution-end -->

### 演習 QFT24-C1：フェルミオン閉ループから有限な電荷補正まで

- Level: C
- 問題: 質量 $m>0$、正の結合 $e>0$ を持つ一種類のDirac場を四次元Euclid QEDで考える。$D(k)=i\not k+m$、$S(k)=(-i\not k+m)/(k^2+m^2)$、$\{\gamma_\mu,\gamma_\nu\}=2\delta_{\mu\nu}$、$\operatorname{tr}I=4$ とし、真空偏極を $-e^2\int d^dk/(2\pi)^d\,\operatorname{tr}[\gamma_\mu S(k)\gamma_\nu S(k+p)]$ で定義する（次元正則化では $\mu^{2\varepsilon}$ を補う）。

  1. フェルミオン行列式の対数展開から閉ループの負号を説明せよ。
  2. 次元正則化 $d=4-2\varepsilon$ で、$p_\mu\Pi_{\mu\nu}=0$ を示し、Feynmanパラメータ表示の $\Pi(p^2)$ の極係数を求めよ。
  3. $\Pi_R(0)=0$ と規格化して有限な $\Pi_R(Q^2)$ を導き、$Q^2\ll m^2$ の先頭項の符号を求めよ。
  4. 同じループに $|k|\le\Lambda$ の鋭い球カットオフを直接課した場合、$\Pi_{\mu\nu}(0)$ が零にならないことを示し、上の結果と矛盾しない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

**1. 行列式の符号**。[有限次元Berezin積分の定理](../QFT19/index.md#thm-qft19-berezin-det)で $\int d\bar\psi\,d\psi\,e^{-\bar\psi D_A\psi}=\det D_A$ です。したがって有効作用には $-\log\det D_A=-\operatorname{Tr}\log D_A$ が現れます。$D_A=D_0+ie\gamma A$ と置き、$X=ieS\gamma A$ を使うと二次項は $+\operatorname{Tr}X^2/2=-e^2\operatorname{Tr}(S\gamma A S\gamma A)/2$ です。これが問題文の閉ループ全体の $-e^2$ です。

**2. 横性と極**。[木レベル逆核の差](../QFT18/index.md#thm-qft18-tree-ward)のEuclid版は $i\not p=D(k+p)-D(k)$ です。したがって

$$
S(k+p)i\not p\,S(k)=S(k)-S(k+p).
$$

traceを巡回させ、正則化の下で $k$ を平行移動すると二項の差が相殺し、$p_\mu\Pi_{\mu\nu}=0$ です。分母をFeynmanパラメータでまとめて $\ell=k+xp$ とし、$\Delta_x=m^2+x(1-x)p^2$ と置きます。gamma traceから偶関数の分子は

$$
4e^2[2\ell_\mu\ell_\nu-\delta_{\mu\nu}\ell^2
-2a p_\mu p_\nu+\delta_{\mu\nu}(ap^2-m^2)],
\qquad a=x(1-x).
$$

回転平均と次元正則化での全微分積分から

$$
\left(\frac2d-1\right)
\int\frac{d^d\ell\,\ell^2}{(2\pi)^d(\ell^2+\Delta_x)^2}
=\Delta_x\int\frac{d^d\ell}{(2\pi)^d(\ell^2+\Delta_x)^2}
$$

となり、質量項が消えます。結果は $8e^2a(p^2\delta_{\mu\nu}-p_\mu p_\nu)I_2(\Delta_x)$。次元積分は

$$
I_2(\Delta_x)=\frac1{16\pi^2}
\left[\frac1\varepsilon-\log\frac{\Delta_x}{\bar\mu^2}\right]
+O(\varepsilon).
$$

$\int_0^1a\,dx=1/6$ を掛けるので、$\Pi(p^2)$ の極係数は $e^2/(12\pi^2)$ です。途中のスカラー積分が発散しても、縦方向の成分は現れません。

**3. 零運動量減算**。反項は $F_{\mu\nu}F_{\mu\nu}$ 型として $\delta Z_3=-\Pi(0)$ を選びます。このとき

$$
\begin{aligned}
\Pi_R(Q^2)
&=\Pi(Q^2)-\Pi(0)\\
&=-\frac{e^2}{2\pi^2}\int_0^1a
\log\frac{m^2+aQ^2}{m^2}\,dx.
\end{aligned}
$$

微小な $Q^2/m^2$ で $\log(1+aQ^2/m^2)=aQ^2/m^2+O(Q^4/m^4)$ です。$\int_0^1a^2dx=1/30$ なので

$$
\Pi_R(Q^2)=-\frac{e^2Q^2}{60\pi^2m^2}
+O\!\left(e^2\frac{Q^4}{m^4}\right).
$$

負号は $e_{\rm eff}^2=e^2/(1+\Pi_R)$ が小さな正の $Q^2$ で増えることを意味します。ただし $e^2|\Pi_R/e^2|\ll1$ という摂動の有効範囲で解釈します。

**4. カットオフの失敗機構**。$p=0$ の積分核は

$$
-4e^2\frac{\partial}{\partial k_\mu}
\left(\frac{k_\nu}{k^2+m^2}\right).
$$

四次元球面の平均 $\langle n_\mu n_\nu\rangle=\delta_{\mu\nu}/4$ と面積 $2\pi^2\Lambda^3$ を使うと

$$
\Pi_{\mu\nu}^{\rm sharp}(0)
=-\frac{4e^2}{(2\pi)^4}
\frac{\Lambda}{\Lambda^2+m^2}
\frac{2\pi^2\Lambda^3}{4}\delta_{\mu\nu}
=-\frac{e^2\Lambda^4}{8\pi^2(\Lambda^2+m^2)}\delta_{\mu\nu}.
$$

零でないのは、$|k|\le\Lambda$ と $|k+p|\le\Lambda$ が異なる領域であり、Ward証明の変数移動を許さないためです。次元正則化では移動を保った解析接続を使い、横性を満たす形で反項を決めました。二つの値は**異なる正則化の中間量**であり、前者を物理光子の質量と結論することはできません。
<!-- solution-end -->

## 8. 学びの整理

- フェルミオンを積分消去すると行列式が現れ、二次の対数展開から閉ループの負号を検算できる。
- 外部光子運動量で縮約した閉ループは、二つのDirac核の差と積分変数の平行移動に帰着する。横性はゲージ対称性を尊重する**正則化にも依存**する。
- 次元正則化では発散が $(p^2\delta_{\mu\nu}-p_\mu p_\nu)$ に比例し、$F_{\mu\nu}F_{\mu\nu}$ の反項だけで一ループの光子二点発散を相殺できる。
- 零運動量減算後の運動量依存は対数積分で有限になり、低運動量では $Q^2/m^2$ に抑えられ、高運動量では負の対数を持つ。
- 真空偏極の横性だけから電子頂点・自己エネルギーの全Ward恒等式やQED全体の非摂動的存在は証明できない。くりこみ群、さらに非可換ゲージ理論へ進む前に、この区別を保持する。
