# HA9 Mikhlin–Hörmander型Fourier乗数

[HA8のLittlewood–Paley分解](../HA8/index.md#def-ha8-dyadic)では滑らかな周波数帯を切り出し、[HA5の特異積分定理](../HA5/index.md#thm-ha5-stronglp)でその核から $L^p$ 有界性を導きました。では、周波数ごとに任意の係数 $m(\xi)$ を掛ける操作についても、同じ手順を使えるでしょうか。

$L^2$ では乗数の絶対値の上限を見れば済みます。しかし $p\ne2$ では Plancherel の等式が使えません。鍵は、**周波数側で乗数を微分できること**から、空間側の畳み込み核が原点から離れて十分減衰し、近い二点であまり変化しないことを証明する点です。この橋を一つずつ架けます。

以下 $d\ge1$、$x,\xi\in\mathbb R^d$ とし、Fourier変換の規約は

$$
\widehat f(\xi)=\int_{\mathbb R^d}e^{-ix\cdot\xi}f(x)\,dx,\qquad
\mathcal F^{-1}h(x)=(2\pi)^{-d}\int_{\mathbb R^d}e^{ix\cdot\xi}h(\xi)\,d\xi
$$

です。[FOU4のPlancherel定理](../../FOU/FOU4/index.md#thm-fou4-l2-extension)を各座標に適用すれば $\|f\|_2^2=(2\pi)^{-d}\|\widehat f\|_2^2$ となります。$\mathcal S(\mathbb R^d)$ は、すべての多重指数 $\alpha,\beta$ について $x^\alpha\partial^\beta f(x)$ が有界な滑らかな関数の空間です。[多重指数](../../GPDE/GPDE2/index.md#def-gpde2-multi-index) $\alpha=(\alpha_1,\ldots,\alpha_d)$ は非負整数の組で、$|\alpha|=\sum_k\alpha_k$、$\partial^\alpha=\partial_{\xi_1}^{\alpha_1}\cdots\partial_{\xi_d}^{\alpha_d}$ と書きます。ここでは超関数の理論そのものは用いず、この微分の記法のみを使います。

## 1. 周波数側の掛け算を作用素にする

周波数によって位相や振幅を変える操作を、単に式の上で掛けるだけでなく、どの関数空間の元に対して定義できるかをはっきりさせます。まずは $L^2$ を使えば、乗数が無限遠や原点で滑らかでなくても問題を切り分けられます。

<a id="def-ha9-multiplier"></a>
<!-- formal-statement-start -->
> **定義（Fourier乗数作用素）**  
> $m:\mathbb R^d\to\mathbb C$ がLebesgue可測で本質的に有界とする。$f\in L^2(\mathbb R^d)$ に対し、$L^2$ の意味で

$$
T_mf=\mathcal F^{-1}(m\widehat f)
$$

> と定め、これを記号 $m$ のFourier乗数作用素という。$m$ は測度零集合上の変更を同一視する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha9-multiplier -->
**定義の確認**　$d=1$、$m(\xi)=\boldsymbol1_{\{1\le|\xi|\le2\}}$ とします。$\widehat f$ が $[1,2]$ に台を持てば $T_mf=f$、$[-1,1/2]$ に台を持てば $T_mf=0$ です。これはFourier側の積 $m\widehat f$ を確認した結果です。$m$ は不連続ですが、$L^2$ での定義そのものには微分可能性を要求していません。
<!-- definition-example-end -->

<a id="prop-ha9-l2"></a>
<!-- formal-statement-start -->
> **命題（有界乗数のL2評価）**  
> $m\in L^\infty(\mathbb R^d)$ なら $T_m:L^2\to L^2$ は線形かつ有界で、

$$
\|T_mf\|_2\le\|m\|_\infty\|f\|_2.
$$

<!-- formal-statement-end -->

### 証明の見取り図

Fourier変換後の積は二乗可積分であり、Plancherelで元の空間へ戻せます。逆変換の係数 $(2\pi)^{-d}$ を両辺で一致させます。

<!-- proof-start -->
### 証明

$f\in L^2$ なら $m\widehat f\in L^2$ です。[Plancherel](../../FOU/FOU4/index.md#thm-fou4-l2-extension)を $T_mf$ と $f$ に適用すると

$$
\begin{aligned}
\|T_mf\|_2^2
&=(2\pi)^{-d}\int_{\mathbb R^d}|m(\xi)|^2|\widehat f(\xi)|^2\,d\xi\\
&\le\|m\|_\infty^2(2\pi)^{-d}\int|\widehat f(\xi)|^2\,d\xi\\
&=\|m\|_\infty^2\|f\|_2^2.
\end{aligned}
$$

平方根を取れば結論です。線形性もFourier変換と乗算の線形性から従います。
<!-- proof-end -->

この証明で得たのは **$p=2$ に限った評価**です。原点以外で乗数を微分し、帯域ごとに核へ戻す準備に進みます。

## 2. 微分の尺度を揃える

例えば $m(\xi)=-i\xi_1/|\xi|$ は原点で式が定義できませんが、原点以外では滑らかです。$\xi$ を二倍にしても乗数は同じなので、$k$ 階微分は半径に対して $|\xi|^{-k}$ の大きさを持ちます。この「周波数の尺度に見合った微分」を一般化します。

<a id="def-ha9-mikhlin"></a>
<!-- formal-statement-start -->
> **定義（Mikhlin型微分条件）**  
> $d\ge1$、整数 $N\ge0$ とする。$m$ は $\mathbb R^d\setminus\{0\}$ 上 $C^N$ 級とし、ある定数 $M<\infty$ に対して全多重指数 $|\alpha|\le N$ と全 $\xi\ne0$ で

$$
|\partial^\alpha m(\xi)|\le M|\xi|^{-|\alpha|}
$$

> が成り立つとき、$m$ は次数 $N$ のMikhlin型微分条件を満たすという。$\alpha=0$ の場合は $|m(\xi)|\le M$ の意味である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha9-mikhlin -->
**定義の確認**　$d=2$ で $m(\xi)=\xi_1/|\xi|$ とします。$r=(\xi_1^2+\xi_2^2)^{1/2}$ とおけば

$$
\partial_{\xi_1}m=r^{-1}-\xi_1^2r^{-3},\qquad
\partial_{\xi_2}m=-\xi_1\xi_2r^{-3}.
$$

従って $|m|\le1$、$|\partial_{\xi_1}m|\le2r^{-1}$、$|\partial_{\xi_2}m|\le r^{-1}$ です。これが $N=1$ の条件を直接確認したものです。より高階の微分は、$m(t\xi)=m(\xi)$ を微分して $\partial^\alpha m(t\xi)=t^{-|\alpha|}\partial^\alpha m(\xi)$ を得て、単位球面上での連続性・有界性を組み合わせれば検証できます。原点での滑らかさは一切主張していません。
<!-- definition-example-end -->

## 3. 一つの周波数環帯から核の減衰へ

[HA8の滑らかなdyadic分割](../HA8/index.md#def-ha8-dyadic)の $\psi$ を固定します。$\operatorname{supp}\psi\subset\{1/2\le|\eta|\le2\}$、$\sum_{j\in\mathbb Z}\psi(2^{-j}\xi)=1$（$\xi\ne0$）です。環帯ごとの乗数

$$
m_j(\xi)=m(\xi)\psi(2^{-j}\xi)
$$

は原点から離れて滑らかでコンパクトな台を持ちます。$\mathcal F^{-1}m_j$ が通常の滑らかな核なので、まずその減衰を導きます。

<a id="lem-ha9-shell"></a>
<!-- formal-statement-start -->
> **補題（環帯乗数の核評価）**  
> $d\ge1$ とし、$m$ が[次数 $d+2$ のMikhlin型微分条件](#def-ha9-mikhlin)を定数 $M$ で満たすとする。$K_j=\mathcal F^{-1}m_j$ とおく。このとき定数 $C=C(d,\psi)$ があり、任意の整数 $j$ と $x\in\mathbb R^d$ で

$$
|K_j(x)|\le CM2^{jd}(1+2^j|x|)^{-(d+1)},
$$

$$
|\nabla K_j(x)|\le CM2^{j(d+1)}(1+2^j|x|)^{-(d+2)}
$$

> が成り立つ。勾配は各座標の一階偏微分をまとめたもので、ベクトルの大きさをユークリッドノルムで測る。
<!-- formal-statement-end -->

### 証明の見取り図

$\xi=2^j\eta$ と伸縮すると、すべての $j$ が固定環帯上の $a_j(\eta)=m(2^j\eta)\psi(\eta)$ に移ります。微分条件のおかげで $a_j$ の導関数は一様に有界です。逆Fourier積分を繰り返し部分積分すると、空間変数が大きいほど減衰します。

<!-- proof-start -->
### 証明

$a_j(\eta)=m(2^j\eta)\psi(\eta)$ とおくと $\operatorname{supp}a_j\subset\{1/2\le|\eta|\le2\}$ です。多重指数 $\gamma$ に対する[積の微分公式](../../../基礎科目/RA/RA3/index.md#prop-ra3-product-rule)は

$$
\partial^\gamma a_j(\eta)=
\sum_{\beta\le\gamma}
{\gamma\choose\beta}\,2^{j|\beta|}
(\partial^\beta m)(2^j\eta)\,
(\partial^{\gamma-\beta}\psi)(\eta).
$$

環帯上で微分条件に $\xi=2^j\eta$ を代入すると

$$
2^{j|\beta|}|\partial^\beta m(2^j\eta)|
\le M|\eta|^{-|\beta|}\le M2^{|\beta|}
$$

となります。$\psi$ の導関数は固定コンパクト集合上で有界なので、$|\gamma|\le d+2$ なら

$$
\|\partial^\gamma a_j\|_{L^1(\mathbb R^d)}
\le C_{\gamma,d,\psi}M,
$$

が $j$ に依存せず成り立ちます。逆変換を $\kappa_j(u)=\mathcal F^{-1}a_j(u)$ と記すと、$u\ne0$ について少なくとも一座標 $\ell$ が $|u_\ell|\ge|u|/\sqrt d$ を満たします。積分中の指数関数へ $\partial_{\eta_\ell}$ を $q$ 回移すと、境界項は $a_j$ のコンパクト台により消え、

$$
(iu_\ell)^q\kappa_j(u)
=(-1)^q(2\pi)^{-d}\int e^{iu\cdot\eta}
\partial_{\eta_\ell}^{q}a_j(\eta)\,d\eta.
$$

$q=d+1$ とすると、$|u|\ge1$ で $|\kappa_j(u)|\le CM|u|^{-(d+1)}$。$|u|\le1$ では $|\kappa_j(u)|\le(2\pi)^{-d}\|a_j\|_1\le CM$ なので、両方を合わせて

$$
|\kappa_j(u)|\le CM(1+|u|)^{-(d+1)}
$$

です。次に $\partial_{u_k}\kappa_j(u)$ の逆変換の被積分関数は $i\eta_k a_j(\eta)$ です。[積の微分公式](../../../基礎科目/RA/RA3/index.md#prop-ra3-product-rule)により、その $d+2$ 階までの $\eta$ 微分の $L^1$ ノルムも一様に $CM$ 以下です。上と同じ部分積分を $q=d+2$ で行えば

$$
|\nabla_u\kappa_j(u)|\le CM(1+|u|)^{-(d+2)}
$$

を得ます。最後に $\xi=2^j\eta$、$d\xi=2^{jd}\,d\eta$ から

$$
K_j(x)=2^{jd}\kappa_j(2^jx),\qquad
\nabla K_j(x)=2^{j(d+1)}(\nabla\kappa_j)(2^jx)
$$

なので、主張の二式が従います。
<!-- proof-end -->

一つの環帯の核は原点で発散しません。原点に特異性が現れるのは、**全ての尺度を足し合わせるため**です。

## 4. 尺度の和から特異積分の仮定を得る

固定した $x\ne0$ に対して、$2^j|x|\le1$ の低い周波数帯では $2^{jd}$ が十分小さく、$2^j|x|>1$ の高い帯域では前節の減衰が効きます。これらを別々に足します。

<a id="lem-ha9-kernel"></a>
<!-- formal-statement-start -->
> **補題（全周波数核と標準核条件）**  
> [環帯核補題](#lem-ha9-shell)の仮定の下で、$x\ne0$ に対し

$$
K(x)=\sum_{j\in\mathbb Z}K_j(x)
$$

> は絶対収束し、コンパクト集合ごとに勾配の級数も一様収束する。さらに

$$
|K(x)|\le CM|x|^{-d},\qquad
|\nabla K(x)|\le CM|x|^{-d-1}.
$$

> $K(x,y):=K(x-y)$ と置くと、これは[HA5の標準Calderón–Zygmund核](../HA5/index.md#def-ha5-standard-kernel)の両変数の滑らかさを $\delta=1$ で満たす。
<!-- formal-statement-end -->

### 証明の見取り図

大きさの評価では $d+1$ 階の減衰、勾配の評価では $d+2$ 階の減衰を使います。どちらも、尺度境界 $2^J|x|\le1<2^{J+1}|x|$ で幾何級数に分けます。

<!-- proof-start -->
### 証明

$r=|x|>0$ とし、$2^Jr\le1<2^{J+1}r$ を満たす整数 $J$ を一つ取ります。低周波 $j\le J$ では[環帯核評価](#lem-ha9-shell)から

$$
\sum_{j\le J}|K_j(x)|
\le CM\sum_{j\le J}2^{jd}
=\frac{CM2^{Jd}}{1-2^{-d}}
\le C_dMr^{-d}.
$$

高周波 $j\ge J+1$ では $(1+2^jr)^{-(d+1)}\le(2^jr)^{-(d+1)}$ なので

$$
\begin{aligned}
\sum_{j\ge J+1}|K_j(x)|
&\le CMr^{-(d+1)}\sum_{j\ge J+1}2^{-j}\\
&=2CMr^{-(d+1)}2^{-(J+1)}
\le C_dMr^{-d},
\end{aligned}
$$

です。最後に $2^{J+1}r>1$、すなわち $2^{-(J+1)}<r$ を使いました。

勾配について低周波は

$$
\sum_{j\le J}|\nabla K_j(x)|
\le CM\frac{2^{J(d+1)}}{1-2^{-(d+1)}}
\le C_dMr^{-(d+1)}.
$$

高周波は $d+2$ 階の減衰から

$$
\begin{aligned}
\sum_{j\ge J+1}|\nabla K_j(x)|
&\le CMr^{-(d+2)}
\sum_{j\ge J+1}2^{-j}\\
&\le C_dMr^{-(d+1)}.
\end{aligned}
$$

これらの推定を $r\ge\varepsilon>0$ の閉集合で使うと一様収束も従い、$K$ は原点を除いて $C^1$ です。

二点 $z,z'$ が $|z-z'|\le|z|/2$ を満たすとき、線分 $z_t=z+t(z'-z)$ 上で $|z_t|\ge|z|/2$ です。一変数の基本定理を $t\mapsto K(z_t)$ に使い、

$$
\begin{aligned}
|K(z')-K(z)|
&=\left|\int_0^1\nabla K(z_t)\cdot(z'-z)\,dt\right|\\
&\le C_dM\frac{|z-z'|}{|z|^{d+1}}.
\end{aligned}
$$

$z=x-y$ とし、$y$ を $y'$ に動かす場合にも、$x$ を $x'$ に動かす場合にもこの式を適用できます。従って両変数の標準核条件がそろいます。
<!-- proof-end -->

## 5. 微分条件からLp有界性を導く

空間核の大きさを知っただけでは $L^p$ 有界性は出ません。[HA5の標準作用素の定義](../HA5/index.md#def-ha5-cz-operator)には、核の条件のほか **$L^2$ 有界性**と、入力の台から離れた場所での**核積分表示**が必要でした。後者を省いて定理名だけを呼び出さないようにします。

<a id="thm-ha9-mikhlin"></a>
<!-- formal-statement-start -->
> **定理（Mikhlin–Hörmander型Fourier乗数定理：整数階版）**  
> $d\ge1$ とし、$m:\mathbb R^d\to\mathbb C$ はLebesgue可測で、$\mathbb R^d\setminus\{0\}$ 上 $C^{d+2}$ 級とする。ある $M<\infty$ が存在し、全 $|\alpha|\le d+2$ と $\xi\ne0$ に対して

$$
|\partial^\alpha m(\xi)|\le M|\xi|^{-|\alpha|}
$$

> を満たすとする。$\xi=0$ の値は任意に定めてよい。このとき[Fourier乗数作用素](#def-ha9-multiplier) $T_m$ は各 $1<p<\infty$ に対して $L^p(\mathbb R^d)$ 上へ一意に有界延長され、

$$
\|T_mf\|_{L^p}\le C_{p,d,\psi}M\|f\|_{L^p}
$$

> が成立する。さらに $T_m$ は $L^1$ 上の弱型 $(1,1)$ 延長を持つ。定数は $m$ と $f$ の個別の選び方には依存しない。
<!-- formal-statement-end -->

この採用版で $d+2$ 階までの微分を仮定したのは、核を古典的な勾配評価まで直接制御して定理の結論を保証するためです。最良の微分階数を主張していません。また端点の「弱型」と「強型」は違います。

### 証明の見取り図

[命題のL2評価](#prop-ha9-l2)で $B\le M$ を確保します。[核補題](#lem-ha9-kernel)で核条件を確保します。最後に、コンパクト台の入力と離れた試験関数について dyadic 和を $L^2$ と台外積分の両方で極限へ送り、[HA5の定理](../HA5/index.md#thm-ha5-stronglp)を適用します。

<!-- proof-start -->
### 証明

**(1) $L^2$ の入力。**　仮定の $\alpha=0$ から $|m(\xi)|\le M$（$\xi\ne0$）です。原点は測度零なので [L2評価](#prop-ha9-l2)により $\|T_mf\|_2\le M\|f\|_2$ です。

**(2) 台外核表示を確立する。**　$f,g\in C_c^\infty(\mathbb R^d)$ を台が交わらないように取ります。両台はコンパクトであり、距離 $\delta=\operatorname{dist}(\operatorname{supp}f,\operatorname{supp}g)>0$ です。有限和 $m^{(N)}=\sum_{j=-N}^{N}m_j$ は滑らかでコンパクトな周波数台を持つので

$$
\langle T_{m^{(N)}}f,g\rangle
=\iint\left(\sum_{j=-N}^NK_j(x-y)\right)
f(y)\overline{g(x)}\,dy\,dx.
$$

$\xi\ne0$ では [HA8の望遠分割](../HA8/index.md#def-ha8-dyadic)により $m^{(N)}(\xi)\to m(\xi)$。さらに $|m^{(N)}(\xi)|\le M$（分割が非負、和が高々1）です。従って

$$
\|T_{m^{(N)}}f-T_mf\|_2^2
=(2\pi)^{-d}\int|m^{(N)}-m|^2|\widehat f|^2\,d\xi\longrightarrow0
$$

です。これは[優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)を、支配関数 $4M^2|\widehat f|^2$ に適用したものです。

一方 $|x-y|\ge\delta$ では[核補題](#lem-ha9-kernel)の絶対収束が一様で、$\sum_j|K_j(x-y)|\le CM\delta^{-d}$ です。$f,g$ はコンパクト台で可積分なので、積分内の和も支配収束で $K(x-y)$ に移せます。従って

$$
\langle T_mf,g\rangle
=\iint K(x-y)f(y)\overline{g(x)}\,dy\,dx.
$$

任意の $g$ の台を $\operatorname{supp}f$ の外の小球に取れるので、これはほとんど至る所、台外で $T_mf(x)=\int K(x-y)f(y)\,dy$ が成立することを意味します。ここでは $K$ の原点における通常積分の存在を仮定していません。

**(3) 標準核と既習定理の適用。**　[核補題](#lem-ha9-kernel)から

$$
|K(x-y)|\le CM|x-y|^{-d},\quad
|K(x-y)-K(x-y')|
\le CM\frac{|y-y'|}{|x-y|^{d+1}}
$$

が $|y-y'|\le|x-y|/2$ で成立し、第1変数も同様です。従って [HA5の定義](../HA5/index.md#def-ha5-cz-operator)で $\delta=1$、核定数 $A=CM$、$L^2$ 定数 $B=M$ の作用素です。

ここで $M=0$ なら $m=0$ がほとんど至る所成り立ち、結論は自明です。$M>0$ なら正規化した作用素 $S=M^{-1}T_m$ を考えます。その核は $M^{-1}K$ なので核定数は $C$、$L^2$ ノルムは1以下です。

[HA5の強型定理](../HA5/index.md#thm-ha5-stronglp)を $S$ に $\delta=1$、$A=C$、$B=1$ として適用すると、各 $1<p<\infty$ で

$$
\|Sf\|_p\le C_{p,d,\psi}\|f\|_p.
$$

両辺に $M$ を掛けて

$$
\|T_mf\|_p\le C_{p,d,\psi}M\|f\|_p
$$

を得ます。延長の一意性は [$L^p$ における稠密性](../../MT/MT7/index.md#thm-mt7-simple-dense)から従います。同じ正規化を [HA5の弱型定理](../HA5/index.md#thm-ha5-weak11)にも適用すれば $T_m$ の弱型 $(1,1)$ を得ます。
<!-- proof-end -->

なぜこの条件が効いたのでしょうか。$\partial^\alpha m$ の次数ごとの減衰が、環帯へ伸縮した後の**一様な導関数評価**に変わり、それが核の $|x|^{-d}$ と勾配の $|x|^{-d-1}$ へ変わったからです。単に $m$ が滑らかだというだけでは、全尺度に同じ定数を使える保証はありません。

## 6. 三つの具体例と境界

### 6.1 Riesz変換の乗数

[HA5のRiesz変換](../HA5/index.md#def-ha5-riesz)の記号は $m_k(\xi)=-i\xi_k/|\xi|$ です。$\xi\ne0$ で $m_k(t\xi)=m_k(\xi)$（$t>0$）なので、これを $|\alpha|$ 回微分して得る $\partial^\alpha m_k(t\xi)=t^{-|\alpha|}\partial^\alpha m_k(\xi)$ と単位球面上の最大値から

$$
|\partial^\alpha m_k(\xi)|
\le\left(\max_{|\omega|=1}|\partial^\alpha m_k(\omega)|\right)|\xi|^{-|\alpha|}.
$$

全 $|\alpha|\le d+2$ にわたる有限個の定数の最大を $M$ に取れば主定理の条件が成立します。このため[主定理](#thm-ha9-mikhlin)は $R_k$ の $L^p$ 有界性を別経路で与えます。$d=1$ では Hilbert変換の符号付き乗数と一致し、$L^1$ 強型へは拡張できません。

### 6.2 滑らかなcutoffを全尺度で使う

$\chi\in C_c^\infty(\mathbb R^d)$ とし、$m_\lambda(\xi)=\chi(\xi/\lambda)$（$\lambda>0$）とします。連鎖律から

$$
\partial^\alpha m_\lambda(\xi)
=\lambda^{-|\alpha|}(\partial^\alpha\chi)(\xi/\lambda)
$$

です。$\eta=\xi/\lambda$ とおけば

$$
|\xi|^{|\alpha|}|\partial^\alpha m_\lambda(\xi)|
=|\eta|^{|\alpha|}|\partial^\alpha\chi(\eta)|
\le\sup_{\eta\in\mathbb R^d}
|\eta|^{|\alpha|}|\partial^\alpha\chi(\eta)|<\infty.
$$

従って定数は $\lambda$ に依存せず、[主定理](#thm-ha9-mikhlin)は全ての $\lambda$ に共通の $L^p$ 作用素ノルムを与えます。さらに直接、$T_{m_\lambda}f=k_\lambda*f$、$k_\lambda(x)=\lambda^d\check\chi(\lambda x)$ であり、$\|k_\lambda\|_1=\|\check\chi\|_1$ と検算できます。

### 6.3 Besselポテンシャルと逆向きの例

$s\ge0$ として $b_s(\xi)=(1+|\xi|^2)^{-s/2}$ を考えます。一次微分は

$$
\partial_{\xi_k}b_s(\xi)=-s\xi_k(1+|\xi|^2)^{-s/2-1}
$$

です。繰り返し微分すると、各項はある $0\le \ell\le|\alpha|$ と次数 $2\ell-|\alpha|$ 以下の多項式 $P(\xi)$ を用いた $P(\xi)(1+|\xi|^2)^{-s/2-\ell}$ の形になります。例えば二階微分は $\partial_{\xi_\ell}\partial_{\xi_k}b_s=-s\delta_{k\ell}(1+|\xi|^2)^{-s/2-1}+s(s+2)\xi_k\xi_\ell(1+|\xi|^2)^{-s/2-2}$ です。一回微分するたびに多項式の微分（次数が1減る）か $\xi_k$ を掛けて分母の指数を1増やす操作が生じるため、帰納的に上の形が保たれます。$|\xi|\ge1$ では各項を $C_{s,\alpha}|\xi|^{-s-|\alpha|}\le C_{s,\alpha}|\xi|^{-|\alpha|}$ と評価でき、$0<|\xi|\le1$ では滑らかさから導関数が有界で $|\xi|^{-|\alpha|}\ge1$ です。したがって主定理の条件を満たします。

一方 $s<0$ なら $b_s(\xi)\to\infty$（$|\xi|\to\infty$）なので、$\alpha=0$ の条件すら満たしません。実際、遠い周波数環帯に $\widehat f$ を集中させれば $L^2$ 作用素ノルムが無限大になることは[命題](#prop-ha9-l2)の計算を逆に用いて確認できます。$s\ge0$ と $s<0$ を同じ有界乗数として扱ってはいけません。

### 6.4 微分条件は十分であって必要ではない

$d=1$ の区間指示関数 $\boldsymbol1_{[a,b]}$ は端点で不連続なので[微分条件](#def-ha9-mikhlin)を満たしません。しかし $a<b$ に対して、半直線への射影は [HA5で強型 $L^p$ が証明されたHilbert変換（1次元Riesz変換）](../HA5/index.md#thm-ha5-riesz-kernel)の乗数 $-i\,\operatorname{sgn}\xi$ と恒等作用素の線形結合です。

変調 $f(x)\mapsto e^{iax}f(x)$ は $L^p$ ノルムを変えず、Fourier変換を $\widehat f(\xi-a)$ へ平行移動します。半直線射影二つの差が $[a,b]$ への射影になるので、$1<p<\infty$ で有界です。

これはMikhlin型条件が**必要条件ではない**例です。一方、一般の粗い多次元cutoffへこの議論をそのまま移せるわけではありません。

## 7. 演習と詳細解答

演習では、まず次数・変数変換・核の評価を独立に計算します。次に作用素定理の適用条件と反例を確かめ、最後に全体の証明を別の次元で組み立て直します。

<a id="ex-ha9-a01"></a>
**演習 HA9-A01（L2乗数のノルム）**  
- Level: A

$m(\xi)=e^{-|\xi|^2}$ とする。$\|T_mf\|_2\le\|f\|_2$ を示し、$\widehat f$ の台が $\{|\xi|\ge R\}$ に入るなら、より強い評価を求めよ。

<!-- solution-start -->
**詳細解答**　$0<e^{-|\xi|^2}\le1$ なので[乗数のL2命題](#prop-ha9-l2)を適用して $\|T_mf\|_2\le\|f\|_2$ です。台が $|\xi|\ge R$ ならその上で $|m(\xi)|\le e^{-R^2}$。従って

$$
\begin{aligned}
\|T_mf\|_2^2
&=(2\pi)^{-d}\int_{|\xi|\ge R}e^{-2|\xi|^2}|\widehat f|^2\,d\xi\\
&\le e^{-2R^2}(2\pi)^{-d}\int|\widehat f|^2\,d\xi
=e^{-2R^2}\|f\|_2^2.
\end{aligned}
$$

平方根を取り $\|T_mf\|_2\le e^{-R^2}\|f\|_2$ を得ます。
<!-- solution-end -->

<a id="ex-ha9-a02"></a>
**演習 HA9-A02（同次次数の微分）**  
- Level: A

$d=2$、$m(\xi)=\xi_2/|\xi|$ とする。一次導関数を全て求め、$|\partial^\alpha m(\xi)|\le2|\xi|^{-|\alpha|}$（$|\alpha|\le1$）を確認せよ。

<!-- solution-start -->
**詳細解答**　$r=|\xi|$ とすると

$$
\partial_{\xi_1}m=-\xi_1\xi_2r^{-3},\qquad
\partial_{\xi_2}m=r^{-1}-\xi_2^2r^{-3}.
$$

$|\xi_1\xi_2|\le r^2$、$\xi_2^2\le r^2$ から各偏微分の絶対値はそれぞれ $r^{-1}$、$2r^{-1}$ 以下です。$|m|=|\xi_2|/r\le1$ も確認できました。[微分条件](#def-ha9-mikhlin)の $\alpha=0,e_1,e_2$ を検査しました。
<!-- solution-end -->

<a id="ex-ha9-a03"></a>
**演習 HA9-A03（核の周波数伸縮）**  
- Level: A

$m_j(\xi)=m(\xi)\psi(2^{-j}\xi)$、$a_j(\eta)=m(2^j\eta)\psi(\eta)$ とする。$K_j=\mathcal F^{-1}m_j$ と $\kappa_j=\mathcal F^{-1}a_j$ の関係、勾配の関係を書け。

<!-- solution-start -->
**詳細解答**　$\xi=2^j\eta$ とおき $d\xi=2^{jd}d\eta$ なので

$$
K_j(x)=(2\pi)^{-d}2^{jd}
\int e^{i(2^jx)\cdot\eta}a_j(\eta)\,d\eta
=2^{jd}\kappa_j(2^jx).
$$

$x_k$ で微分すると連鎖律で $2^j$ がさらに掛かり、

$$
\partial_{x_k}K_j(x)=2^{j(d+1)}(\partial_{u_k}\kappa_j)(2^jx).
$$

各成分を並べれば $\nabla K_j(x)=2^{j(d+1)}(\nabla\kappa_j)(2^jx)$ です。
<!-- solution-end -->

<a id="ex-ha9-a04"></a>
**演習 HA9-A04（二つの幾何級数）**  
- Level: A

$d=3$、$2^Jr\le1<2^{J+1}r$（$r>0$）として、$\sum_{j\le J}2^{3j}$ と $r^{-4}\sum_{j\ge J+1}2^{-j}$ がともに $Cr^{-3}$ 以下であることを示せ。

<!-- solution-start -->
**詳細解答**　低周波側は等比級数から

$$
\sum_{j\le J}2^{3j}
=\frac{2^{3J}}{1-2^{-3}}
\le\frac{r^{-3}}{1-2^{-3}}.
$$

高周波側は $\sum_{j\ge J+1}2^{-j}=2^{-J}$ です。$2^Jr\le1$ だけでは高側の上限が出ませんが、もう一方の条件 $2^{J+1}r>1$ から $2^{-J}<2r$ です。従って $r^{-4}2^{-J}<2r^{-3}$。[核補題](#lem-ha9-kernel)では二つの不等式の向きが異なる点に注意します。
<!-- solution-end -->

<a id="ex-ha9-a05"></a>
**演習 HA9-A05（Bessel記号の一階微分）**  
- Level: A

$b_2(\xi)=(1+|\xi|^2)^{-1}$ とする。一次微分を求め、$|\xi|\ge1$ で $|\partial_{\xi_k}b_2|\le2|\xi|^{-1}$、$0<|\xi|\le1$ でも同じ上限が成り立つことを示せ。

<!-- solution-start -->
**詳細解答**　連鎖律から

$$
\partial_{\xi_k}b_2=-2\xi_k(1+|\xi|^2)^{-2}.
$$

$r=|\xi|$ とすると絶対値は $2r(1+r^2)^{-2}$ 以下です。$r\ge1$ では $(1+r^2)^2\ge r^4$ より $2r^{-3}\le2r^{-1}$、$r\le1$ では $(1+r^2)^2\ge1$ と $r\le r^{-1}$ より $2r\le2r^{-1}$ です。よって全域で次数1の条件が成立します。
<!-- solution-end -->

<a id="ex-ha9-b01"></a>
**演習 HA9-B01（部分積分で減衰を作る）**  
- Level: B

$a\in C_c^{d+2}(\mathbb R^d)$ が固定コンパクト集合に台を持つとする。$\|\partial^\gamma a\|_1\le M$（$|\gamma|\le d+2$）から、$\kappa=\mathcal F^{-1}a$ に対し $|\kappa(u)|\le CM(1+|u|)^{-(d+1)}$ を証明せよ。

<!-- solution-start -->
**詳細解答**　$|u|\le1$ なら逆変換の積分から $|\kappa(u)|\le(2\pi)^{-d}\|a\|_1\le(2\pi)^{-d}M$ です。$|u|>1$ のとき $|u_\ell|\ge|u|/\sqrt d$ となる座標 $\ell$ を選びます。$e^{iu\cdot\eta}=(iu_\ell)^{-(d+1)}\partial_{\eta_\ell}^{d+1}e^{iu\cdot\eta}$ を使って $d+1$ 回部分積分すると、$a$ の台がコンパクトで境界項は零となり

$$
\kappa(u)=\frac{(-1)^{d+1}}{(2\pi)^d(iu_\ell)^{d+1}}
\int e^{iu\cdot\eta}\partial_{\eta_\ell}^{d+1}a(\eta)\,d\eta.
$$

従って $|\kappa(u)|\le(2\pi)^{-d}d^{(d+1)/2}M|u|^{-(d+1)}$ です。両領域を $1+|u|$ の形へまとめる際は、$|u|>1$ なら $1+|u|\le2|u|$ を使います。[環帯核補題](#lem-ha9-shell)の減衰指数が検算できました。
<!-- solution-end -->

<a id="ex-ha9-b02"></a>
**演習 HA9-B02（核を両変数の差へ変える）**  
- Level: B

$x,y,y'\in\mathbb R^d$、$|y-y'|\le|x-y|/2$ とする。$|\nabla K(z)|\le A|z|^{-d-1}$ から $|K(x-y)-K(x-y')|$ を評価せよ。第1変数の差についても説明せよ。

<!-- solution-start -->
**詳細解答**　$z_t=x-y+t(y-y')$ とおけば $z_0=x-y$、$z_1=x-y'$ で、

$$
|z_t|\ge|x-y|-t|y-y'|\ge|x-y|/2.
$$

従って

$$
\begin{aligned}
|K(x-y')-K(x-y)|
&=\left|\int_0^1\nabla K(z_t)\cdot(y-y')\,dt\right|\\
&\le\int_0^1A(|x-y|/2)^{-d-1}|y-y'|\,dt\\
&=2^{d+1}A\frac{|y-y'|}{|x-y|^{d+1}}.
\end{aligned}
$$

$x$ を $x'$ に変えるときも $z_t=x-y+t(x'-x)$ とおけば同じ下限と計算です。[標準核の定義](../HA5/index.md#def-ha5-standard-kernel)はこの両方を求めます。
<!-- solution-end -->

<a id="ex-ha9-b03"></a>
**演習 HA9-B03（条件を欠くとどこで止まるか）**  
- Level: B

$m(\xi)=|\xi|$（$\xi\ne0$）について、Mikhlin条件のどの次数が失敗するか述べよ。$\widehat f_R$ を $R\le|\xi|\le2R$ に台を持つ非零関数として、$L^2$ 有界性が成立しないことを示せ。

<!-- solution-start -->
**詳細解答**　$\alpha=0$ で $|m(\xi)|=|\xi|$ は無限遠で有界ではありません。従って微分条件の最初の段階が破れ、[L2評価](#prop-ha9-l2)に入力できません。Plancherelを直接使うと

$$
\|T_mf_R\|_2^2=(2\pi)^{-d}
\int_{R\le|\xi|\le2R}|\xi|^2|\widehat f_R(\xi)|^2\,d\xi
\ge R^2\|f_R\|_2^2.
$$

従って $\|T_mf_R\|_2/\|f_R\|_2\ge R\to\infty$ です。核評価を試みる以前に $L^2$ の入口が壊れています。
<!-- solution-end -->

<a id="ex-ha9-b04"></a>
**演習 HA9-B04（cutoffの一様性）**  
- Level: B

$d=1$ で $\chi\in C_c^\infty(\mathbb R)$、$m_\lambda(\xi)=\chi(\xi/\lambda)$ とする。任意の整数 $k\ge0$ で $\sup_{\lambda>0,\xi\ne0}|\xi|^k|m_\lambda^{(k)}(\xi)|<\infty$ を示し、核の $L^1$ ノルムも $\lambda$ と無関係であることを示せ。

<!-- solution-start -->
**詳細解答**　連鎖律を $k$ 回用いると $m_\lambda^{(k)}(\xi)=\lambda^{-k}\chi^{(k)}(\xi/\lambda)$ です。$\eta=\xi/\lambda$ とすると

$$
|\xi|^k|m_\lambda^{(k)}(\xi)|
=|\eta|^k|\chi^{(k)}(\eta)|
\le\max_{\eta\in\operatorname{supp}\chi}|\eta|^k|\chi^{(k)}(\eta)|=:M_k<\infty.
$$

$\chi^{(k)}$ は台の外で零なので最大値は有限です。一方逆Fourier変換は $k_\lambda(x)=\lambda\check\chi(\lambda x)$ であり、

$$
\|k_\lambda\|_1=\int_{\mathbb R}\lambda|\check\chi(\lambda x)|\,dx
=\int_{\mathbb R}|\check\chi(u)|\,du=\|\check\chi\|_1.
$$

これは[主定理](#thm-ha9-mikhlin)の一様評価を、滑らかなcutoffの特別な場合に直接検算したものです。
<!-- solution-end -->

<a id="ex-ha9-c01"></a>
**演習 HA9-C01（次元2の乗数定理を組み立てる）**  
- Level: C

$d=2$、$m\in C^4(\mathbb R^2\setminus\{0\})$ とし、$|\partial^\alpha m(\xi)|\le M|\xi|^{-|\alpha|}$（$|\alpha|\le4$）を仮定する。以下を証明せよ。

1. $T_m$ が $L^2$ 有界であることを示せ。
2. $m_j(\xi)=m(\xi)\psi(2^{-j}\xi)$ の核 $K_j$ について $|K_j(x)|\le CM2^{2j}(1+2^j|x|)^{-3}$、$|\nabla K_j(x)|\le CM2^{3j}(1+2^j|x|)^{-4}$ を示せ。
3. $K=\sum_{j\in\mathbb Z}K_j$ について $|K(x)|\le CM|x|^{-2}$、$|\nabla K(x)|\le CM|x|^{-3}$（$x\ne0$）を示せ。
4. $T_m$ が $1<p<\infty$ で $L^p$ 有界であることを、必要な核表示・既出定理の条件とともに説明せよ。

<!-- solution-start -->
**詳細解答**

**1.** $\alpha=0$ の仮定から $|m|\le M$ です。原点は測度零であり、[有界乗数のL2評価](#prop-ha9-l2)により $\|T_mf\|_2\le M\|f\|_2$ を得ます。

**2.** $a_j(\eta)=m(2^j\eta)\psi(\eta)$ とおくと台は $1/2\le|\eta|\le2$ に入り、$|\gamma|\le4$ の任意の導関数について[積の微分公式](../../../基礎科目/RA/RA3/index.md#prop-ra3-product-rule)から

$$
|\partial^\gamma a_j(\eta)|
\le\sum_{\beta\le\gamma}{\gamma\choose\beta}
M|\eta|^{-|\beta|}|\partial^{\gamma-\beta}\psi(\eta)|
\le C_{\gamma,\psi}M.
$$

台が固定なので $L^1$ ノルムも同じ上界を持ちます。$|u|>1$ で $|u_\ell|\ge|u|/\sqrt2$ を選び、$\kappa_j=\mathcal F^{-1}a_j$ の積分を $\eta_\ell$ で3回部分積分すれば $|\kappa_j(u)|\le CM|u|^{-3}$。$\partial_{u_k}\kappa_j$ は $i\eta_k a_j$ の逆変換なので4回部分積分し $|\nabla\kappa_j(u)|\le CM|u|^{-4}$。$|u|\le1$ は各被積分関数の $L^1$ ノルムで抑えます。最後に $u=2^jx$ の変数変換から $\displaystyle K_j(x)=2^{2j}\kappa_j(2^jx)$ と $\nabla K_j=2^{3j}(\nabla\kappa_j)(2^jx)$ を用い、要求された二式を得ます。

**3.** $r=|x|$ とし、$2^Jr\le1<2^{J+1}r$ を選びます。大きさは

$$
\begin{aligned}
\sum_{j\le J}|K_j(x)|
&\le CM\sum_{j\le J}2^{2j}
=CM\frac{2^{2J}}{1-2^{-2}}\le CMr^{-2},\\
\sum_{j\ge J+1}|K_j(x)|
&\le CMr^{-3}\sum_{j\ge J+1}2^{-j}
=CMr^{-3}2^{-J}\le CMr^{-2}.
\end{aligned}
$$

勾配も同じ分割で、

$$
\sum_{j\le J}|\nabla K_j(x)|
\le CM\frac{2^{3J}}{1-2^{-3}}\le CMr^{-3},
$$

$$
\sum_{j\ge J+1}|\nabla K_j(x)|
\le CMr^{-4}2^{-J}\le CMr^{-3}.
$$

よって二式と原点を除く一様収束が成立します。

**4.** $|x-y|\ge\delta>0$ の領域で上の核級数が一様絶対収束するため、台の離れた $f,g\in C_c^\infty$ では各 $m_j$ の核積分表示を足せます。

周波数側では $\sum_{-N}^Nm_j\to m$ が原点以外で成り立ち、$M|\widehat f|$ が $L^2$ 支配関数となるので、Plancherelと優収束により作用素の列も $T_mf$ へ $L^2$ 収束します。従って $T_m$ の台外核表示が成立します。

さらに勾配評価 $|\nabla K(z)|\le CM|z|^{-3}$ を線分上で積分すれば、$|y-y'|\le|x-y|/2$ に対して

$$
|K(x-y)-K(x-y')|
\le CM\frac{|y-y'|}{|x-y|^3}
$$

となり、第1変数も同様です。これは[HA5の標準CZ作用素の条件](../HA5/index.md#def-ha5-cz-operator)に $\delta=1$、$A=CM$、$B=M$ として一致します。

$M>0$ のとき $S=T_m/M$ を考えれば、核定数と $L^2$ ノルムが $M$ に依存しなくなります。[強型Lp有界性](../HA5/index.md#thm-ha5-stronglp)を $S$ に適用し $\|Sf\|_p\le C_p\|f\|_p$。$M$ 倍すれば $\|T_mf\|_p\le C_pM\|f\|_p$ です。$M=0$ なら零作用素です。
<!-- solution-end -->

## 8. 次の振動積分へ

周波数側の一様な微分条件から $L^p$ 有界性を導く方法を得ました。しかし $e^{i\lambda\Phi(\xi)}$ のように大きなパラメータ $\lambda$ に応じて振動する乗数では、微分すると $\lambda$ が現れ、本章の定数は大きくなりがちです。そこで次章HA10では、単純に絶対値を上から抑えるだけでなく、振動そのものの打消しを積分から引き出す方法を学びます。
