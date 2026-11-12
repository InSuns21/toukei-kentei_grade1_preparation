# HOLO14 ホログラフィック繰り込み

[HOLO9の2点関数](../HOLO9/index.md#prop-holo9-finite-action)は $0<\nu<1$ に限定し、場の二次の局所反項一つで有限な生成汎関数を得ました。[HOLO13の重力変分](../HOLO13/index.md#def-holo13-brown-york)では、純$AdS_3$の体積反項が境界応力の発散を消しました。しかし一般のスカラーでは境界方向に変化する源がさらに発散を生み、指数差が整数になると対数発散が現れます。反項の係数を後から当て推量すると、有限応答と接触項が混同されます。

本講は、**径方向の方程式から発散を次数ごとに求め、cutoff面の局所反項だけで相殺し、有限な1点・2点関数とWard恒等式まで追う**ことを目標にします。初めて現れる導関数反項を $1<\nu<2$ で完全に計算し、共鳴 $\nu=1$ では対数とスケール異常を別途導きます。一般の漸近AdS重力や全次数の共形異常の完全分類は主張しません。

## 0. 固定する模型と計算規約

整数 $d\ge2$、$L>0$、実質量 $m^2$、$\hbar=1$ とします。固定したEuclid Poincaré $AdS_{d+1}$ の領域 $z\ge\epsilon>0$、$x\in\mathbb R^d$ で

$$
ds_E^2=L^2z^{-2}(dz^2+\delta_{ij}dx^idx^j),\qquad
I_\epsilon[\phi]=\frac12\int_{z\ge\epsilon}\sqrt g\,
(g^{ab}\partial_a\phi\partial_b\phi+m^2\phi^2)\,d^{d+1}X
$$

を使います。$\phi$ は実スカラーで、源 $J\in C_c^\infty(\mathbb R^d;\mathbb R)$ を固定し、赤外では各非零Fourierモードについて減衰する解を選びます。積分・変分はこの試験関数空間上で行い、運動量表示は分布として解釈します。境界方向の全微分積分は消え、背景重力の量子補正とスカラーの自己相互作用を無視します。質量指数は[HOLO8の命題](../HOLO8/index.md#prop-holo8-mass-dimension)を用いて

$$
a=\Delta_-=\frac d2-\nu,\qquad b=\Delta_+=\frac d2+\nu,\qquad
\nu=\sqrt{d^2/4+m^2L^2}>0
$$

と置きます。$a+b=d$、$b-a=2\nu$ です。$a$ は負にもなれます。場の境界値 $\phi_\epsilon=\phi(\epsilon,\cdot)$ と源 $J$ は同じではありません。外向き単位法線は $n^z=-\epsilon/L$ であり、[HOLO7の境界項](../HOLO7/index.md#prop-holo7-onshell-boundary)を使うと

$$
I_{\mathrm{os},\epsilon}
=-\frac{L^{d-1}}2\int_{\mathbb R^d}
\epsilon^{1-d}\phi_\epsilon\,\partial_z\phi(\epsilon,x)\,d^dx .
$$

以下の $O(z^p)$ は滑らかな源に対して局所的に、また必要な積分に対して十分な剰余評価を伴う漸近展開を指します。零波数のみの冪級数を一般の源に無条件に使いません。

## 1. 局所反項はどこから出るか

[HOLO8の径方向方程式](../HOLO8/index.md#ref-holo8-radial-equation)に $z^a(J+z^2F+\cdots)$ を代入すると、指数 $a$ の方程式は自動的に消え、次数 $z^{a+2}$ に $F$ と境界Laplace作用素 $\Delta_x J$ が現れます。$F$ は赤外の状態を指定しなくても源から決まり、したがって**局所的**です。対して $z^b$ の係数は内部の境界条件に依存し、一般に源の非局所汎関数になります。

<a id="def-holo14-local-counterterm"></a>

<!-- formal-statement-start -->
> **定義（cutoff局所反項と繰り込み作用）**  
> 上のEuclid自由スカラー模型で、cutoff面の誘導計量 $\gamma_{ij}=L^2\epsilon^{-2}\delta_{ij}$ と境界場 $\phi_\epsilon$ および有限階の境界微分だけから作る積分を、cutoff局所反項 $I_{\mathrm{ct},\epsilon}$ とする。源 $J$ を固定した極限が存在するとき

$$
I_{\mathrm{ren}}[J]
=\lim_{\epsilon\downarrow0}
\left(I_{\mathrm{os},\epsilon}[J]+I_{\mathrm{ct},\epsilon}[J]\right)
$$

> と定める。反項を追加する前の $I_{\mathrm{os},\epsilon}$ と、極限後の $I_{\mathrm{ren}}$ を区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo14-local-counterterm -->
**定義の確認**：境界計量の体積密度 $\sqrt\gamma=L^d\epsilon^{-d}$ を使うと、$\int\sqrt\gamma\,\phi_\epsilon^2$ と $\int\sqrt\gamma\,\gamma^{ij}\partial_i\phi_\epsilon\partial_j\phi_\epsilon$ はともに面上の場とその接線微分だけで書けます。後者は $\gamma^{ij}=\epsilon^2L^{-2}\delta^{ij}$ を使って計算できます。いずれも $z>\epsilon$ の内部の場の値や、異なる境界点を結ぶ積分核を必要としません。一方 $\int J(x)B[J](x)d^dx$ は一般に非局所なので、反項の定義には該当しません。
<!-- definition-example-end -->

<a id="prop-holo14-recursion"></a>

<!-- formal-statement-start -->
> **命題（非共鳴スカラーの最初の局所係数）**  
> 上記の模型で $1<\nu<2$、源 $J\in C_c^\infty(\mathbb R^d)$、赤外正則解を仮定する。境界展開の最初の三項は、適切な剰余の意味で

$$
\phi(z,x)=z^a\{J(x)+z^2F(x)\}+z^bB[J](x)
+o(z^b),\qquad
F=\frac{\Delta_xJ}{4(\nu-1)}
$$

> である。$F$ は局所的であり、$B[J]$ は赤外境界条件を含む応答係数である。
<!-- formal-statement-end -->

### 証明の見取り図

質量方程式から指数多項式 $P(s)=s(s-d)-m^2L^2=(s-a)(s-b)$ を作ります。$z^{a+2}$ の係数を等置すると $P(a+2)F+\Delta_xJ=0$ となります。$1<\nu<2$ では $P(a+2)\ne0$ で、さらに次の局所項 $z^{a+4}$ は $z^b$ より高次です。

<!-- proof-start -->
### 証明

[HOLO8の動径方程式](../HOLO8/index.md#ref-holo8-radial-equation)を $z$ と $x$ で書き直すと

$$
\mathcal D\phi=
\{z^2\partial_z^2-(d-1)z\partial_z+z^2\Delta_x-m^2L^2\}\phi=0 .
$$

関数 $H(x)$ に対して $\mathcal D(z^sH)=z^sP(s)H+z^{s+2}\Delta_xH$ です。$P(a)=P(b)=0$、かつ

$$
P(a+2)=(a+2-a)(a+2-b)=4(1-\nu).
$$

従って $\phi=z^aJ+z^{a+2}F+\cdots$ を代入した $z^{a+2}$ の係数は $4(1-\nu)F+\Delta_xJ$。これを零とすると

$$
F=-\frac{\Delta_xJ}{4(1-\nu)}
=\frac{\Delta_xJ}{4(\nu-1)}
$$

です。次の局所係数の冪は $z^{a+4}$、応答の冪は $z^b=z^{a+2\nu}$ であり $2\nu<4$ です。非共鳴であるためここまで対数は必要ありません。赤外正則性から定まる $B[J]$ は次のFourier計算で明示します。$\square$
<!-- proof-end -->

直接例として $d=3$、$\nu=3/2$、$m^2L^2=0$ を取り、単一Fourier成分 $J_k e^{ik\cdot x}$ を形式的に考えると $a=0$、$F_k=-|k|^2J_k/2$ です。したがって $\phi_k=J_k(1-|k|^2z^2/2)+z^3B_k+\cdots$ となります。Fourier成分そのものはコンパクト台ではありませんが、一般の $J$ はFourier重ね合わせで扱えます。

## 2. べき発散を相殺し、有限応答を取り出す

第1節の $F$ は源の二階微分です。面積だけの反項では $\epsilon^{2-2\nu}$ の発散が残るため、勾配の二乗を使う二番目の反項が必要です。

<a id="def-holo14-power-counterterms"></a>

<!-- formal-statement-start -->
> **定義（$1<\nu<2$ の最小反項）**  
> 第0節のEuclid自由スカラーで $1<\nu<2$ とする。平坦なcutoff面に

$$
I_{\mathrm{ct},\epsilon}^{(0)}
=\frac a{2L}\int\sqrt\gamma\,\phi_\epsilon^2\,d^dx,\qquad
I_{\mathrm{ct},\epsilon}^{(2)}
=-\frac{L}{4(\nu-1)}
\int\sqrt\gamma\,\gamma^{ij}
(\partial_i\phi_\epsilon)(\partial_j\phi_\epsilon)\,d^dx
$$

> を加える。$I_{\mathrm{ct},\epsilon}=I_{\mathrm{ct},\epsilon}^{(0)}+I_{\mathrm{ct},\epsilon}^{(2)}$ とし、この二項以外の有限局所反項は選ばないものとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo14-power-counterterms -->
**定義の確認**：$d=3,\nu=3/2,a=0$ なら体積反項は零で、勾配反項の係数は $-L/2$。$\phi_\epsilon=J+O(\epsilon^2)$ を代入すると

$$
I_{\mathrm{ct},\epsilon}^{(2)}
=-\frac{L^2}{2\epsilon}
\int|\nabla_xJ|^2\,d^3x+o(1).
$$

$F=\Delta_xJ/2$ なので、後述する裸作用の発散は $-L^2\epsilon^{-1}\int JF=+L^2(2\epsilon)^{-1}\int|\nabla J|^2$ です。二つは符号と係数を含めて消えます。反項は非局所応答 $B$ を一切使っていません。
<!-- definition-example-end -->

<a id="prop-holo14-finite-scalar"></a>

<!-- formal-statement-start -->
> **命題（有限作用と1点関数）**  
> 第0節の模型において $1<\nu<2$、$J\in C_c^\infty(\mathbb R^d)$、各非零波数で赤外減衰するEuclid解、標準選択を仮定する。上の二つの反項を使うと

$$
I_{\mathrm{ren}}[J]=-\nu L^{d-1}\int J(x)B[J](x)\,d^dx .
$$

> GKPWの木レベル辞書 $W[J]=-I_{\mathrm{ren}}[J]$ を仮定し、$\langle\mathcal O(x)\rangle_J=\delta W/\delta J(x)$ と定義すると

$$
\langle\mathcal O(x)\rangle_J=2\nu L^{d-1}B[J](x).
$$

> この表示は追加の有限局所反項を零に置いたschemeで成立する。
<!-- formal-statement-end -->

### 証明の見取り図

第一反項と裸作用を合成すると $\partial_z-a/z$ が現れ、$J$ の主要冪が消えます。残る $F$ によるべき発散は第二反項が消します。$\epsilon^{b}$ の応答との積は $\epsilon^0$ で残ります。最後の変分では赤外正則な線形境界値問題の対称性を使います。

<!-- proof-start -->
### 証明

[HOLO7のon-shell境界表示](../HOLO7/index.md#prop-holo7-onshell-boundary)と体積反項から

$$
I_{\mathrm{os},\epsilon}+I_{\mathrm{ct},\epsilon}^{(0)}
=-\frac{L^{d-1}}2\int\epsilon^{1-d}
\phi_\epsilon\left(\partial_z-\frac a\epsilon\right)\phi_\epsilon\,d^dx.
$$

[第1節の展開](#prop-holo14-recursion)を一度微分すると、滑らかな源の近傍展開に対して

$$
\left(\partial_z-\frac az\right)\phi
=2z^{a+1}F+2\nu z^{b-1}B+o(z^{b-1}).
$$

$a+b=d$、$2a+2-d=2-2\nu$ により

$$
I_{\mathrm{os},\epsilon}+I_{\mathrm{ct},\epsilon}^{(0)}
=-L^{d-1}\epsilon^{2-2\nu}\int JF\,d^dx
-\nu L^{d-1}\int JB\,d^dx+o(1).
$$

ここで $z^{a+2}F$ と $z^{a+1}F$ の積の指数は $4-2\nu>0$、$z^bB$ と $z^{a+1}F$ の積は指数 $2>0$ なので極限では消えます。残る勾配反項では

$$
\sqrt\gamma\,\gamma^{ij}\partial_i\phi_\epsilon\partial_j\phi_\epsilon
=L^{d-2}\epsilon^{2-2\nu}|\nabla J|^2
+O(\epsilon^{4-2\nu})+O(\epsilon^2).
$$

従って境界での部分積分 $\int J\Delta_xJ=-\int|\nabla J|^2$ と $F=\Delta_xJ/[4(\nu-1)]$ により

$$
I_{\mathrm{ct},\epsilon}^{(2)}
=-\frac{L^{d-1}}{4(\nu-1)}\epsilon^{2-2\nu}
\int|\nabla J|^2+o(1)
=+L^{d-1}\epsilon^{2-2\nu}\int JF+o(1).
$$

発散は相殺されます。さらに $B$ のFourier乗数は実数かつ偶関数（次節で示す）なので、$\int J B[h]=\int h B[J]$ です。$\int JB[J]$ を $J+sh$ に置き換え、$s$ に一次の二項を合わせれば

$$
\delta I_{\mathrm{ren}}[J](h)
=-2\nu L^{d-1}\int hB[J],
$$

したがって所望の1点関数を得ます。$\square$
<!-- proof-end -->

<a id="prop-holo14-two-point"></a>

<!-- formal-statement-start -->
> **命題（非局所2点核と有限反項の影響）**  
> $d\ge2$、$1<\nu<2$、標準選択、固定Euclid AdS、赤外減衰解の上記模型では、$k\ne0$ に対する応答のFourier乗数は

$$
\widehat{B[J]}(k)
=q_\nu|k|^{2\nu}\widehat J(k),\qquad
q_\nu=2^{-2\nu}\frac{\Gamma(-\nu)}{\Gamma(\nu)}.
$$

> 従って $x\ne y$ の連結2点関数は、[HOLO9の核](../HOLO9/index.md#def-holo9-bulk-boundary)と同じ規格化で

$$
\langle\mathcal O(x)\mathcal O(y)\rangle_{\mathrm{conn}}
=\frac{2\nu L^{d-1}\Gamma(d/2+\nu)}
{\pi^{d/2}\Gamma(\nu)}\,|x-y|^{-d-2\nu}.
$$

> 有限な局所反項による変更は接触項に限られ、分離点の距離冪を変更しない。
<!-- formal-statement-end -->

### 証明の見取り図

方程式をFourier変換して修正Bessel関数の減衰解を取り、先頭モードを $J$ に正規化します。$z^{a+2}$ と $z^b$ を区別して係数を読めばよく、$B$ 由来の乗数は非整数冪なので局所微分では消せません。

<!-- proof-start -->
### 証明

$\widehat J(k)=\int e^{-ik\cdot x}J(x)d^dx$ と定めます。[径方向方程式](../HOLO8/index.md#ref-holo8-radial-equation)の $k$ モードを $f_k=z^{d/2}u(|k|z)$ に変えると、$t=|k|z$ に対して $t^2u''+tu'-(t^2+\nu^2)u=0$ となります。赤外で減衰する解 $K_\nu(t)$ を選び、$t\downarrow0$ における $K_\nu(t)\sim 2^{\nu-1}\Gamma(\nu)t^{-\nu}$ で正規化すると

$$
\phi_k(z)=\frac{2^{1-\nu}}{\Gamma(\nu)}
|k|^\nu z^{d/2}K_\nu(|k|z)\widehat J(k).
$$

ここで修正Bessel関数の低次漸近は、非整数 $1<\nu<2$ について

$$
K_\nu(t)=2^{\nu-1}\Gamma(\nu)t^{-\nu}
\left(1+\frac{t^2}{4(1-\nu)}+O(t^4)\right)
+2^{-\nu-1}\Gamma(-\nu)t^\nu(1+O(t^2)).
$$

（この特殊関数の漸近公式は既習の特殊関数の公式として使用し、その適用範囲を明記した。）これを掛けると

$$
\phi_k=z^a\widehat J(k)
\left(1-\frac{|k|^2z^2}{4(\nu-1)}\right)
+z^bq_\nu|k|^{2\nu}\widehat J(k)+o(z^b).
$$

$-k^2\widehat J=\widehat{\Delta_xJ}$ なので第1節と一致します。乗数は $k\mapsto-k$ で不変、実数であるため自己随伴です。分離点でのFourier逆変換は、[HOLO9の境界核の構成](../HOLO9/index.md#prop-holo9-kernel-solution)を $\nu>1$ に解析的に延長したものとして（接触項を除いて）$c_\Delta|x-y|^{-2\Delta}$ を与えます。規格化は $c_\Delta=\Gamma(\Delta)/[\pi^{d/2}\Gamma(\nu)]$ です。より明示的には、Gamma積分による分布的な逆Fourier変換

$$
\mathcal F^{-1}(|k|^{2\nu})(r)
=\frac{2^{2\nu}\Gamma(d/2+\nu)}{\pi^{d/2}\Gamma(-\nu)}
|r|^{-d-2\nu}\quad(r\ne0)
$$

を $2\nu L^{d-1}q_\nu$ に掛ければ式が得られます。有限な局所二次反項 $C\int J(-\Delta_x)^nJ$ の二次変分は $k^{2n}$ の多項式、位置空間では $\delta(x-y)$ の有限階微分であり、$x\ne y$ で零です。$\square$
<!-- proof-end -->

**適用境界**：$k=0$ の赤外条件、$\nu\in\mathbb Z$ の対数、曲がった境界源、Lorentzの状態と $i\epsilon$ は上の非整数模型の結論に無条件に含まれません。

## 3. 共鳴すると対数が現れる：$\nu=1$

$\nu\downarrow1$ で第2節の勾配反項係数は発散します。この特異性は物理的な1点関数が必ず無限大という意味ではありません。$a+2=b$ になるため局所解の $z^{a+2}$ と応答の $z^b$ が衝突し、べき項の代わりに対数項が必要になるのです。

<a id="def-holo14-log-scale"></a>

<!-- formal-statement-start -->
> **定義（共鳴展開と参照スケール）**  
> 第0節の模型で $\nu=1$、$a=d/2-1$、$b=d/2+1$ とする。正の逆長さ $\mu>0$ を固定し、境界近くの解を

$$
\phi=z^a\left\{J+z^2\log(z\mu)\,H[J]+z^2B_\mu[J]\right\}
+o(z^{a+2})
$$

> と分解する。$H$ は対数係数、$B_\mu$ は $\mu$ を選んで定める有限係数である。$\log(z\mu)$ の中身は無次元とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo14-log-scale -->
**定義の確認**：$d=2$ では $a=0,b=2$。単色モード $J=e^{ik\cdot x}$（$k\ne0$）に対して $H=(|k|^2/2)J$ とすれば $z^2\log(z\mu)$ が式に現れます。$\mu'=e^t\mu$ へ変えると $\log(z\mu')=\log(z\mu)+t$ なので、同じ場を保つには $B_{\mu'}=B_\mu-tH$ が必要です。参照スケールは解そのものではなく、有限係数の分け方を変えます。
<!-- definition-example-end -->

<a id="prop-holo14-log-divergence"></a>

<!-- formal-statement-start -->
> **命題（対数係数と対数反項）**  
> 第0節の固定平坦Euclid AdS、$\nu=1$、滑らかなコンパクト台の源、赤外正則解を仮定する。対数係数と発散は

$$
H[J]=-\frac12\Delta_xJ,\qquad
I_{\mathrm{os},\epsilon}+I_{\mathrm{ct},\epsilon}^{(0)}
=-\frac{L^{d-1}}2\log(\epsilon\mu)
\int|\nabla J|^2\,d^dx + I_{\mathrm{finite}}+o(1).
$$

> ここで $I_{\mathrm{ct},\epsilon}^{(0)}=a(2L)^{-1}\int\sqrt\gamma\,\phi_\epsilon^2$ である。局所対数反項を

$$
I_{\mathrm{ct},\epsilon}^{\log}
=\frac L2\log(\epsilon\mu)
\int\sqrt\gamma\,\gamma^{ij}
\partial_i\phi_\epsilon\partial_j\phi_\epsilon\,d^dx
$$

> とすれば極限は有限である。追加有限反項を零に選ぶと

$$
I_{\mathrm{ren}}[J]=
-L^{d-1}\int JB_\mu\,d^dx
-\frac{L^{d-1}}2\int JH\,d^dx.
$$
<!-- formal-statement-end -->

### 証明の見取り図

第1節の $P(s)$ は $P(b)=0$ なので通常の係数比較では解けません。ただし $z^b\log z$ を微分すると $P'(b)z^b$ が残ります。この項が $\Delta_xJ$ と打ち消し合う係数を求め、on-shell作用の外向き法線の符号に注意して対数発散を計算します。

<!-- proof-start -->
### 証明

$\mathcal D(z^sH)=z^sP(s)H+z^{s+2}\Delta_xH$ を $s$ で微分すると、$\mathcal D(z^s\log(z\mu)H)$ の $z^s$ 係数は $P(s)\log(z\mu)H+P'(s)H$ です。$s=b=a+2$ では $P(b)=0$、$P'(b)=2b-d=2$。従って次数 $z^b$ の場の方程式は

$$
\Delta_xJ+2H=0,\qquad H=-\Delta_xJ/2.
$$

体積反項を合算する公式は第2節と同じで

$$
I_{\mathrm{os},\epsilon}+I_{\mathrm{ct},\epsilon}^{(0)}
=-\frac{L^{d-1}}2\int\epsilon^{1-d}\phi_\epsilon
\left(\partial_z-\frac a\epsilon\right)\phi_\epsilon .
$$

対数展開を微分すると

$$
\left(\partial_z-\frac az\right)\phi
=z^{b-1}\{(2\log(z\mu)+1)H+2B_\mu\}
+o(z^{b-1}).
$$

$a+b=d$ を使い、有限項まで残すと

$$
I_{\mathrm{os},\epsilon}+I_{\mathrm{ct},\epsilon}^{(0)}
=-L^{d-1}\log(\epsilon\mu)\int JH
-\frac{L^{d-1}}2\int JH
-L^{d-1}\int JB_\mu+o(1).
$$

$\int JH=-\frac12\int J\Delta_xJ=\frac12\int|\nabla J|^2$ であり、最初の項が命題の発散です。対数反項は先頭で

$$
I_{\mathrm{ct},\epsilon}^{\log}
=+\frac{L^{d-1}}2\log(\epsilon\mu)\int|\nabla J|^2
+O(\epsilon^2\log^2\epsilon)
$$

となり、発散を消します。残る有限二項が表示した $I_{\mathrm{ren}}$ です。$\square$
<!-- proof-end -->

**スケールを変えると何が変わるか。** $B_{\mu'}=B_\mu-\log(\mu'/\mu)H$ より、同じbulk解でも

$$
I_{\mathrm{ren},\mu'}-I_{\mathrm{ren},\mu}
=L^{d-1}\log(\mu'/\mu)\int JH
=\frac{L^{d-1}}2\log(\mu'/\mu)\int|\nabla J|^2.
$$

この差は局所作用なので、分離した二点の相関は変えません。非局所な $\log|k|$ の係数は反項で自由に消せません。

## 4. 1点・2点関数とWard恒等式

源がある場合、境界応力の保存則は一般に「発散が零」ではありません。スカラー源を空間的に変化させると、作用の座標変換不変性が応力の発散とスカラー1点関数を結びます。ここでは境界計量も変分できるようにした繰り込み済み生成汎関数を仮定します。

<a id="def-holo14-renormalized-responses"></a>

<!-- formal-statement-start -->
> **定義（繰り込み済み源応答）**  
> 滑らかな境界Riemann計量 $g_{(0)ij}$ と実スカラー源 $J$ に関する微分可能なEuclid生成汎関数 $W[g_{(0)},J]=-I_{\mathrm{ren}}[g_{(0)},J]$ が存在するとする。局所変分を

$$
\delta W=-\frac12\int\sqrt{g_{(0)}}\,\langle T_{ij}\rangle\,\delta g_{(0)}^{ij}\,d^dx
+\int\sqrt{g_{(0)}}\,\langle\mathcal O\rangle\,\delta J\,d^dx
$$

> として応力とスカラー1点関数を定義する。$J$ の共形重みは $a=d-\Delta=d/2-\nu$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo14-renormalized-responses -->
**定義の確認**：平坦な境界計量を固定すると第一項は零であり、第2節の $1<\nu<2$ では $\delta W=\int(2\nu L^{d-1}B)\delta J$ です。$\nu=1$ の例では、対称な線形応答を使い第3節の有限作用を変分して

$$
\langle\mathcal O\rangle_J
=L^{d-1}(2B_\mu[J]+H[J]).
$$

$\mu$ を変えれば右辺は局所項 $-2L^{d-1}\log(\mu'/\mu)H[J]$ だけ変化し、これがscheme依存の1点関数の意味です。計量を変えたときの規約は[HOLO13の応力定義](../HOLO13/index.md#def-holo13-brown-york)と一致します。
<!-- definition-example-end -->

<a id="prop-holo14-ward"></a>

<!-- formal-statement-start -->
> **命題（源付きWard恒等式とトレース関係）**  
> $d\ge2$ の滑らかな境界計量 $g_{(0)}$、滑らかなスカラー源 $J$、上記の微分可能な生成汎関数を仮定する。境界の微分同相に対して $W$ が不変で、境界または変分の支持に表面項がないとき、

$$
\nabla_{(0)}^i\langle T_{ij}\rangle
=\langle\mathcal O\rangle\,\partial_jJ.
$$

> さらに局所Weyl変換 $\delta_\sigma g_{(0)}^{ij}=-2\sigma g_{(0)}^{ij}$、$\delta_\sigma J=-a\sigma J$ に対し $\delta_\sigma W=\int\sqrt{g_{(0)}}\,\sigma\mathcal A$ となる場合、

$$
\langle T^i{}_i\rangle
=aJ\langle\mathcal O\rangle+\mathcal A.
$$

> $\mathcal A$ は指定した状態・境界条件・反項schemeの下での局所Weyl異常密度である。
<!-- formal-statement-end -->

### 証明の見取り図

第一式では任意のベクトル場 $\xi$ に沿う源のLie微分を、第二式では任意の関数 $\sigma$ に沿う重み付き変換を、それぞれ第一変分へ代入します。生成汎関数の不変性と、残る局所異常を区別します。

<!-- proof-start -->
### 証明

境界ベクトル場 $\xi^j$ をコンパクト台とすると、微分同相の無限小変換は

$$
\delta_\xi g_{(0)}^{ij}
=-\nabla_{(0)}^i\xi^j-\nabla_{(0)}^j\xi^i,\qquad
\delta_\xi J=\xi^j\partial_jJ.
$$

定義の第一変分に代入し、$\langle T_{ij}\rangle$ の対称性で二項を合わせると

$$
0=\delta_\xi W
=\int\sqrt{g_{(0)}}\left[
\langle T_{ij}\rangle\nabla_{(0)}^i\xi^j
+\langle\mathcal O\rangle\,\xi^j\partial_jJ\right].
$$

第一項を部分積分して $\xi^j$ をくくると

$$
0=\int\sqrt{g_{(0)}}\,\xi^j
\left[-\nabla_{(0)}^i\langle T_{ij}\rangle
+\langle\mathcal O\rangle\partial_jJ\right].
$$

任意の $\xi$ に対して成立するので第一式が従います。次に Weyl 変分を代入すると

$$
\delta_\sigma W
=\int\sqrt{g_{(0)}}\,\sigma
\left[\langle T^i{}_i\rangle
-aJ\langle\mathcal O\rangle\right].
$$

これを仮定した異常の定義式と比較すれば第二式です。$\square$
<!-- proof-end -->

**異常の二つの具体的な発生源**：純$AdS_3$ Einstein重力では、[HOLO13のFG拘束と中央電荷](../HOLO13/index.md#prop-holo13-brown-henneaux)により、二次元の曲がった境界で $J=0$ のとき $\mathcal A_{\mathrm{grav}}=LR[g_{(0)}]/(16\pi G_3)$ です。これとは別に、固定平坦背景での $\nu=1$ スカラーの対数は、**一定の**Weyl再尺度について、$\delta_\sigma W=-\sigma L^{d-1}\int|\nabla J|^2/2$ を与えます。従ってこの平坦・一定再尺度の条件下では積分異常は $-(L^{d-1}/2)\int|\nabla J|^2$ です。任意の曲面での局所異常は曲率依存反項も必要になり、平坦模型の式をそのまま一般式とはしません。

## 5. 接触項と計算の境界

共鳴模型の非局所部分を確認します。$k\ne0$、$\nu=1$ の赤外減衰解は $z^{d/2}|k|K_1(|k|z)\widehat J(k)$ です。$K_1(t)=t^{-1}+(t/2)\{\log(t/2)+\gamma_E-1/2\}+O(t^3\log t)$ を用いると

$$
\widehat{B_\mu[J]}(k)
=\frac{|k|^2}{2}\left[\log\!\frac{|k|}{2\mu}
+\gamma_E-\frac12\right]\widehat J(k),
\qquad
\widehat H(k)=\frac{|k|^2}{2}\widehat J(k).
$$

したがって第4節の1点を微分して得る2点乗数は

$$
G_\mu(k)=L^{d-1}|k|^2\left[\log\!\frac{|k|}{2\mu}+\gamma_E\right].
$$

$\mu$ を変えた差は $-L^{d-1}|k|^2\log(\mu'/\mu)$ であり、位置空間では $\Delta_x\delta(x-y)$ に比例する接触項です。対数の非解析性こそ、正則化しても残る分離点の相関を示します。

有限局所反項の選び方は応答の局所部分を変えます。また、局所Weyl異常を曲率付き境界で完全に扱うには、重力作用・GHY項・曲率反項を同時に系統化する必要があります。[HOLO13の純Einstein $AdS_3$ の計算](../HOLO13/index.md#prop-holo13-fg-stress)を既知の出発点として用い、ここで高次元重力反項の普遍係数を新しく証明したとはしません。一般の物質‐重力混合や量子ループ、Lorentz実時間応答もこの固定背景の自由場計算からは従いません。

## 6. 演習と詳細解答

<a id="ex-holo14-a1"></a>
### A1. 局所係数の符号を確認する

- Level: A
- 問題: $d=4,\nu=3/2$ とし、$\Delta_xJ=-\kappa^2J$ のFourier成分を考える。$a,b,m^2L^2$ と $F/J$ を求めよ。

<!-- solution-start -->
**詳細解答**：$a=2-3/2=1/2$、$b=2+3/2=7/2$、したがって $m^2L^2=a(a-d)=(1/2)(-7/2)=-7/4$ です。[局所係数の命題](#prop-holo14-recursion)に $\Delta_xJ=-\kappa^2J$ を代入して

$$
F/J=-\frac{\kappa^2}{4(3/2-1)}=-\frac{\kappa^2}{2}.
$$

負号は $\Delta_xe^{ikx}=-|k|^2e^{ikx}$ に由来します。
<!-- solution-end -->

<a id="ex-holo14-a2"></a>
### A2. 反項が局所であることを判定する

- Level: A
- 問題: cutoff面の $\gamma_{ij}=L^2\epsilon^{-2}\delta_{ij}$ に対して $\int\sqrt\gamma\,\phi^2$ と $\int\sqrt\gamma\,\gamma^{ij}\partial_i\phi\partial_j\phi$ の $\epsilon$ の主要冪を $1<\nu<2$ の源 $J$ で求めよ。

<!-- solution-start -->
**詳細解答**：$\phi_\epsilon=\epsilon^a(J+O(\epsilon^2))$、$\sqrt\gamma=L^d\epsilon^{-d}$ より第一積分の被積分密度は $L^d\epsilon^{2a-d}J^2=L^d\epsilon^{-2\nu}J^2$ です。第二積分では逆計量が $\epsilon^2/L^2$ を与えるため $L^{d-2}\epsilon^{2a+2-d}|\nabla J|^2=L^{d-2}\epsilon^{2-2\nu}|\nabla J|^2$ です。どちらも同じ点での有限階の場の微分だけを使い、局所です。
<!-- solution-end -->

<a id="ex-holo14-a3"></a>
### A3. 反項の符号を独立に検算する

- Level: A
- 問題: $d=3,\nu=3/2$ のとき $I_{\mathrm{os},\epsilon}+I_{\mathrm{ct},\epsilon}^{(0)}$ の発散を $\int|\nabla J|^2$ で表し、勾配反項と照合せよ。

<!-- solution-start -->
**詳細解答**：$F=\Delta_xJ/2$ なので $\int JF=-\frac12\int|\nabla J|^2$。$2-2\nu=-1$ ですから

$$
I_{\mathrm{os},\epsilon}+I_{\mathrm{ct},\epsilon}^{(0)}
=-L^2\epsilon^{-1}\int JF+O(1)
=\frac{L^2}{2\epsilon}\int|\nabla J|^2+O(1).
$$

勾配反項は $-L^2(2\epsilon)^{-1}\int|\nabla J|^2+o(1)$ です。足せば発散は零です。外向き法線を逆にすると裸作用の符号も逆になり、この相殺が壊れます。
<!-- solution-end -->

<a id="ex-holo14-a4"></a>
### A4. 共鳴対数の微分を確認する

- Level: A
- 問題: $\nu=1$、$b=d/2+1$ で $P(s)=(s-a)(s-b)$ とする。$\mathcal D(z^b\log(z\mu)H)$ の次数 $z^b$ の係数を求めよ。

<!-- solution-start -->
**詳細解答**：$P(b)=0$、$P'(b)=2b-d=2$ です。$s$ に関する微分で $z^s\log(z\mu)=\partial_sz^s+(\log\mu)z^s$ と書けるため、$P(b)=0$ から係数は $P'(b)H=2H$。他方 $z^aJ$ の境界Laplace作用素による次数 $z^{a+2}=z^b$ の項は $\Delta_xJ$ なので $2H+\Delta_xJ=0$、従って $H=-\Delta_xJ/2$ です。
<!-- solution-end -->

<a id="ex-holo14-b1"></a>
### B1. 発散相殺から1点関数を再構成する

- Level: B
- 問題: $1<\nu<2$ で $\phi=z^a(J+z^2F)+z^bB+o(z^b)$、$F=\Delta_xJ/[4(\nu-1)]$ とする。体積・勾配の反項を加えて有限作用と $\langle\mathcal O\rangle$ を導け。$B$ は実偶Fourier乗数を持つものとする。

<!-- solution-start -->
**詳細解答**：第2節の境界項から、体積反項を加えた作用は $-\frac12L^{d-1}\int\epsilon^{1-d}\phi_\epsilon(\partial_z-a/\epsilon)\phi_\epsilon$ です。作用素を場に適用すると $2\epsilon^{a+1}F+2\nu\epsilon^{b-1}B$ が残ります。従って $-\epsilon^{2-2\nu}L^{d-1}\int JF-\nu L^{d-1}\int JB+o(1)$ です。勾配反項は $+\epsilon^{2-2\nu}L^{d-1}\int JF+o(1)$、残る作用は $I_{\mathrm{ren}}=-\nu L^{d-1}\int JB$ です。自己随伴性から $\delta\int JB=2\int\delta J\,B$ となるため、$W=-I_{\mathrm{ren}}$ の微分は $2\nu L^{d-1}B$ です。
<!-- solution-end -->

<a id="ex-holo14-b2"></a>
### B2. 参照スケールの変更はどの相関を変えるか

- Level: B
- 問題: $\nu=1$ で $\mu'=e^t\mu$、$t\in\mathbb R$ とする。$B_{\mu'}$、$I_{\mathrm{ren},\mu'}-I_{\mathrm{ren},\mu}$、2点乗数の差を求め、分離点での帰結を述べよ。

<!-- solution-start -->
**詳細解答**：同じ場を二通りに書いて対数を比較すると $B_{\mu'}=B_\mu-tH$ です。有限作用 $-L^{d-1}\int JB_\mu-(L^{d-1}/2)\int JH$ を使うと

$$
I_{\mathrm{ren},\mu'}-I_{\mathrm{ren},\mu}
=tL^{d-1}\int JH
=\frac{tL^{d-1}}2\int|\nabla J|^2.
$$

$W=-I$ なので二階変分は $\Delta G(k)=-tL^{d-1}|k|^2$ です。$|k|^2$ は多項式のため、逆Fourier変換はデルタ分布の微分に限られ、$x\ne y$ では両schemeの2点関数は一致します。
<!-- solution-end -->

<a id="ex-holo14-b3"></a>
### B3. 保存則を源の変化まで含めて導く

- Level: B
- 問題: 第4節の第一変分と、コンパクト台の境界ベクトル場 $\xi$ を用いて、応力の発散公式を導け。$\partial_jJ=0$ と $\partial_jJ\ne0$ を比較せよ。

<!-- solution-start -->
**詳細解答**：計量逆変分は $-\nabla^i\xi^j-\nabla^j\xi^i$、源の変分は $\xi^j\partial_jJ$ です。これを代入し、応力の対称性で計量の二項をまとめると $\delta_\xi W=\int\sqrt g(T_{ij}\nabla^i\xi^j+\mathcal O\,\xi^j\partial_jJ)$。第一項を部分積分すると $\int\sqrt g\,\xi^j(-\nabla^iT_{ij}+\mathcal O\partial_jJ)=0$。$\xi$ が任意なので $\nabla^iT_{ij}=\mathcal O\partial_jJ$ です。源が一定なら右辺は零ですが、源が変わる場合に零と決めつけることはできません。
<!-- solution-end -->

<a id="ex-holo14-b4"></a>
### B4. Fourier乗数から非局所核を調べる

- Level: B
- 問題: $1<\nu<2$ で $B(k)=2^{-2\nu}\Gamma(-\nu)|k|^{2\nu}J(k)/\Gamma(\nu)$ とする。$2\nu L^{d-1}B(k)$ の逆Fourier変換を $x\ne y$ で求め、有限局所反項の追加では距離冪が変わらない理由を示せ。

<!-- solution-start -->
**詳細解答**：$r=x-y\ne0$ と置き、第2節の分布的Fourier恒等式

$$
\mathcal F^{-1}(|k|^{2\nu})(r)
=\frac{2^{2\nu}\Gamma(d/2+\nu)}
{\pi^{d/2}\Gamma(-\nu)}|r|^{-d-2\nu}
$$

を適用します。係数を掛けると $2^{-2\nu}$ と $2^{2\nu}$、$\Gamma(-\nu)$ が相殺され、

$$
G(r)=\frac{2\nu L^{d-1}\Gamma(d/2+\nu)}
{\pi^{d/2}\Gamma(\nu)}|r|^{-d-2\nu}.
$$

局所反項の二次変分は偶数次の $|k|^{2n}$ の線形結合なので、その逆Fourier変換は $\delta(r)$ の微分であり、$r\ne0$ では零です。
<!-- solution-end -->

<a id="ex-holo14-c1"></a>
### C1. 共鳴する自由スカラーを作用から相関まで再計算する

- Level: C
- 問題: 固定Euclid $AdS_3$ の $ds^2=L^2z^{-2}(dz^2+dx^2+dy^2)$、$d=2$、$\nu=1$（$m^2=0$）、源 $J\in C_c^\infty(\mathbb R^2)$ を考える。赤外減衰解と標準選択を採用し、(1) Fourierモードの境界展開と $H,B_\mu$、(2) 裸on-shell作用の対数発散、(3) 局所反項と有限作用、(4) 繰り込み済み1点・2点関数、(5) $\mu$ 変更とWardのトレース関係の適用条件を導け。

<!-- solution-start -->
**詳細解答**：

**(1) 境界展開。** $a=0,b=2$。$k\ne0$ の減衰解は $\phi_k(z)=|k|zK_1(|k|z)\widehat J(k)$。$K_1(t)=t^{-1}+\tfrac t2(\log(t/2)+\gamma_E-\tfrac12)+O(t^3\log t)$ を代入すると

$$
\phi_k=\widehat J(k)+z^2\left\{
\frac{|k|^2}{2}\log(z\mu)\widehat J(k)
+\frac{|k|^2}{2}\left[\log\frac{|k|}{2\mu}+\gamma_E-\frac12\right]\widehat J(k)\right\}
+O(z^4\log z).
$$

従って $H(k)=|k|^2\widehat J(k)/2$、$B_\mu(k)=|k|^2[\log(|k|/(2\mu))+\gamma_E-1/2]\widehat J(k)/2$ です。

**(2) 裸作用。** $a=0$ なので体積反項は零です。$\partial_z\phi=z\{(2\log(z\mu)+1)H+2B_\mu\}+\cdots$、$\epsilon^{-1}\phi_\epsilon\partial_z\phi=J\{(2\log(\epsilon\mu)+1)H+2B_\mu\}+o(1)$ です。よって

$$
I_{\mathrm{os},\epsilon}
=-\frac L2\int J\{(2\log(\epsilon\mu)+1)H+2B_\mu\}\,d^2x+o(1).
$$

対数係数は $-L\int JH=-(L/2)\int|\nabla J|^2$ です。

**(3) 相殺と有限作用。** 面上では $\sqrt\gamma\,\gamma^{ij}=\delta^{ij}$。反項は $(L/2)\log(\epsilon\mu)\int|\nabla\phi_\epsilon|^2$ で、その先頭が $(L/2)\log(\epsilon\mu)\int|\nabla J|^2$ なので発散を消します。極限は

$$
I_{\mathrm{ren}}=-L\int JB_\mu-\frac L2\int JH.
$$

**(4) 応答。** $H$ と $B_\mu$ は実偶Fourier乗数なので自己随伴です。$W=-I_{\mathrm{ren}}$ より

$$
\langle\mathcal O\rangle=L(2B_\mu+H),\qquad
G_\mu(k)=L|k|^2[\log(|k|/(2\mu))+\gamma_E].
$$

ここで $G_\mu$ は分布で、$k=0$ は赤外極限により扱います。同一点では通常の有限な関数として評価しません。

**(5) schemeとWard。** $\mu'=e^t\mu$ なら $B_{\mu'}=B_\mu-tH$、したがって $I_{\mathrm{ren},\mu'}-I_{\mathrm{ren},\mu}=(Lt/2)\int|\nabla J|^2$、$\Delta G=-Lt|k|^2$ は接触項のみです。$d=2,\nu=1$ では $a=0$ なので、平坦背景・一定Weyl再尺度の下で積分されたトレース異常は $-(L/2)\int|\nabla J|^2$ です。ただし局所的な曲面上のトレース関係を述べるには、重力源を含む $W[g_{(0)},J]$ の曲率反項と微分同相不変性を確認する必要があり、この固定平坦背景の計算だけで一般の局所公式は完成しません。
<!-- solution-end -->

## 7. まとめと次講

- 源の局所係数 $F=\Delta_xJ/[4(\nu-1)]$ と非局所応答 $B[J]$ を分離し、$1<\nu<2$ で体積・勾配反項がべき発散をちょうど消すことを確かめた。
- 同じ反項schemeで $I_{\mathrm{ren}}=-\nu L^{d-1}\int JB$、$\langle\mathcal O\rangle=2\nu L^{d-1}B$。有限反項は接触項だけを変える。
- 共鳴 $\nu=1$ では $H=-\Delta_xJ/2$ が対数発散を作り、参照スケール変更が局所的な相関の差を生む。
- 計量源とスカラー源をともに変分できる場合には、$\nabla^iT_{ij}=\mathcal O\,\partial_jJ$ と $T^i{}_i=aJ\mathcal O+\mathcal A$ が成立する。一般の曲面の異常を平坦模型の係数だけから決めない。

次講 **HOLO15「境界の熱状態とAdSブラックホール」**では、このように繰り込んだEuclid作用を熱的分配関数の鞍点と結び、[既習の重力熱力学](../HOLO13/index.md#def-holo13-dirichlet-action)を境界理論の自由エネルギーとして読む条件を整理します。
