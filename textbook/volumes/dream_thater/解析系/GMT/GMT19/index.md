# GMT19 blow-upと接測度の基礎

<!-- definition-example-audit: strict -->

[GMT15の密度と近似接平面](../GMT15/index.md#thm-gmt15-rectifiable-density-tangent)では、小球の面積がどれほどあるか、そこから平面方向に外れた面積がどれほど少ないかを調べました。しかし「小球の内側にある測度を、顕微鏡で拡大した一枚の測度として保存する」方法があれば、平面だけでなく角、枝分かれ、原子の集積も同じ言葉で比較できます。

本講義では点の周りを拡大する **blow-up** と、その拡大像の非零の測度極限を定めます。「極限が取れること」「零測度へ潰れないこと」「得られる形が一意であること」は別の問題です。十分条件を証明し、滑らかな曲面と特異な測度を計算して違いを確かめます。

以下、$d\ge1$、$B(x,r)$ は $\mathbb R^d$ の開球です。測度は非負の [MT5のRadon測度](../../MT/MT5/index.md#def-mt5-radon)、すなわち各コンパクト集合の質量が有限で、必要な内外正則性を持つBorel測度とします。$\mathcal H^m$ は [MT8の非正規化Hausdorff測度](../../MT/MT8/index.md#def-mt8-hausdorff-measure)です。[非正規化Hausdorff測度のEuclid空間上での比例](../GMT10/index.md#lem-gmt10-hausdorff-normalization)より、$m$ 次元線形平面 $V$ について

$$
\mathcal H^m(V\cap B(0,r))=2^m r^m.
$$

## 1. 点を中心に拡大すると、測度はどう動くか

例えば $\mathbb R$ の区間 $[0,r]$ を $1/r$ 倍すれば $[0,1]$ になります。しかし区間に載る長さ $r$ は、押し出しただけでは $r$ のままです。拡大された図形の長さと、押し出された元の測度の質量は区別しなければなりません。

点 $x$ を原点へ動かし、距離を $r$ で割る写像を $T_{x,r}$ と書きます。測度 $\mu$ の **押し出し** $(T_{x,r})_\#\mu$ は、拡大後の集合 $A$ に対して「拡大前に $T_{x,r}^{-1}(A)$ に入った質量」を与えます。したがって正の係数 $c$ を掛けてから極限を取ることができます。

<a id="def-gmt19-blow-up"></a>

<!-- formal-statement-start -->
> **定義（blow-up写像と測度の規格化）**
> $x\in\mathbb R^d$、$r>0$ と非負Radon測度 $\mu$ に対し、拡大写像 $T_{x,r}:\mathbb R^d\to\mathbb R^d$ と押し出し測度を次で定める。

$$
T_{x,r}(y)=\frac{y-x}{r},
\qquad
((T_{x,r})_\#\mu)(A)=\mu(x+rA)
$$

> ここで $A$ はBorel集合、$x+rA=\{x+rz:z\in A\}$ である。$c>0$ に対する $c(T_{x,r})_\#\mu$ を規格化したblow-up測度という。$0<\mu(B(x,r))<\infty$ のときは特に

$$
\mu_{x,r}=\frac{(T_{x,r})_\#\mu}{\mu(B(x,r))}
$$

> を **球質量規格化** と呼ぶ。
<!-- formal-statement-end -->

この定義から直ちに

$$
\int_{\mathbb R^d}\varphi(z)\,d((T_{x,r})_\#\mu)(z)
=\int_{\mathbb R^d}\varphi\left(\frac{y-x}{r}\right)\,d\mu(y)
$$

となります。左の積分を右へ移すのが押し出しの基本操作です。球質量規格化なら $\mu_{x,r}(B(0,1))=1$ ですが、後で定義する **拡大像の非零極限ではこの規格化に限定しません**。

<!-- definition-example-start: def-gmt19-blow-up -->
### 直接例：Lebesgue測度と点質量

**定義の確認**：逆像・押し出し・正の係数を順に計算します。$\mu=a\mathcal L^d$、$a>0$ とします。Borel集合 $A$ が有界なら、Lebesgue測度の平行移動不変性と $d$ 次元の拡大率から

$$
((T_{x,r})_\#\mu)(A)=a\mathcal L^d(x+rA)
=ar^d\mathcal L^d(A).
$$

$\omega_d=\mathcal L^d(B(0,1))$ とおけば、$\mu(B(x,r))=a\omega_dr^d$ なので

$$
\mu_{x,r}=\frac{\mathcal L^d}{\omega_d}.
$$

これは任意の $x,r$ で同じです。一方、$\mu=\delta_a$、$x=a$ とすると $T_{a,r}(a)=0$ なので

$$
(T_{a,r})_\#\delta_a=\delta_0,\qquad
(\delta_a)_{a,r}=\delta_0.
$$

$x\ne a$ なら、十分小さい $r$ について $\delta_a(B(x,r))=0$ となり、球質量規格化は定義できません。**中心が測度の台に入るか**が重要です。
<!-- definition-example-end -->

## 2. どの意味で収束させるか

拡大後の測度は総質量が無限大でもかまいません。例えば $\mathcal L^d$ は全空間では無限大ですが、コンパクト集合上の質量は有限です。そこで観測窓をコンパクトに制限し、その中の連続関数で測ります。$C_c(\mathbb R^d)$ は [MT5で扱うコンパクト台の連続関数](../../MT/MT5/index.md#def-mt5-cc) の集合です。

<a id="def-gmt19-vague"></a>

<!-- formal-statement-start -->
> **定義（局所弱収束）**
> 非負Radon測度 $\nu_j,\nu$ が $\mathbb R^d$ 上で局所弱収束（vague convergence）し、$\nu_j\rightharpoonup_{\mathrm v}\nu$ と書くのは、すべての $\varphi\in C_c(\mathbb R^d)$ について

$$
\lim_{j\to\infty}\int\varphi\,d\nu_j=\int\varphi\,d\nu
$$

> が成り立つことをいう。
<!-- formal-statement-end -->

確率測度の通常の弱収束では有界連続関数すべてを試験するのに対し、この定義ではコンパクト台のものだけを使います。無限遠へ移動した質量は局所的な窓から見えなくなります。

<!-- definition-example-start: def-gmt19-vague -->
### 直接例：質量が無限遠へ逃げる

**定義の確認**：すべてのコンパクト台の連続関数について積分極限を計算し、通常の弱収束で用いる関数と比較します。

$d=1$ で $\nu_j=\delta_j$ とし、$\varphi$ の台を $[-R,R]$ に含めます。$j>R$ なら

$$
\int\varphi\,d\nu_j=\varphi(j)=0
=\int\varphi\,d0.
$$

任意のコンパクト台の $\varphi$ で成立するので、$\delta_j\rightharpoonup_{\mathrm v}0$ です。しかし $\varphi\equiv1$ は有界連続であり、その積分は常に1です。したがって確率測度として零測度へ弱収束したわけではありません。この例は **局所弱極限が零になり得る**ことも示します。
<!-- definition-example-end -->

局所弱収束からは、コンパクト集合上の質量の上極限評価が得られます。実際、コンパクト $K$ とその上で1となる $0\le\varphi\in C_c$ を取ると、

$$
\limsup_j\nu_j(K)\le\lim_j\int\varphi\,d\nu_j
=\int\varphi\,d\nu.
$$

[MT5のRadon正則性](../../MT/MT5/index.md#thm-mt5-radon-regularity)を用いて $\varphi$ の台を $K$ の任意に小さい近傍へ取れば、右辺を $\nu(K)$ に近付けられます。ゆえに

$$
\limsup_j\nu_j(K)\le\nu(K).
$$

ただし一般の開球 $B$ について $\nu_j(B)\to\nu(B)$ は自動ではありません。境界に質量がない球であれば、内側・外側の連続cutoffで挟んで極限を取れます。

## 3. 接測度：拡大し続けたときに残る非零の形

球質量規格化は便利ですが、半径の取り方で局所的な質量が極端に増減する測度にも接したい場合があります。そこで任意の正の係数 $c_j$ を許し、代わりに **非零** という条件を課します。

<a id="def-gmt19-tangent"></a>

<!-- formal-statement-start -->
> **定義（接測度）**
> 非負Radon測度 $\mu$ と $x\in\operatorname{supp}\mu$ に対し、非零の非負Radon測度 $\nu$ が $x$ における接測度であるとは、$r_j\downarrow0$ と $c_j>0$ が存在し、

$$
c_j(T_{x,r_j})_\#\mu\rightharpoonup_{\mathrm v}\nu,
\qquad \nu\ne0
$$

> となることをいう。接測度全体を $\operatorname{Tan}(\mu,x)$ と書く。$r_j\downarrow0$ は正で単調に0へ収束する半径列とする。
<!-- formal-statement-end -->

これは拡大して得られる「測度の接写」です。$\operatorname{supp}\mu$ は、どの近傍にも正の $\mu$ 質量を持つ点の閉集合です。すべてのRadon測度・すべての台の点で接測度が存在すると、定義だけからはまだ結論できません。まず定義から条件を実際に調べます。

<!-- definition-example-start: def-gmt19-tangent -->
### 直接例：点質量と定数密度

**定義の確認**：中心が台に属すること、規格化係数が正であること、極限が零ではないことを順に確かめます。

$x=a$、$\mu=\delta_a$ では、任意の $r_j\downarrow0$ と $c_j=1$ に対し $\delta_0$ が極限です。$\delta_0\ne0$ はコンパクト上有限なので、接測度です。

$\mu=a\mathcal L^d$、$a>0$ では、$r_j\downarrow0$ に対して $c_j=(ar_j^d)^{-1}$ を取ると、任意の $\varphi\in C_c$ について

$$
\int\varphi\,d\bigl(c_j(T_{x,r_j})_\#\mu\bigr)
=\int\varphi\,d\mathcal L^d
$$

がすべての $j$ で成立します。よって $\mathcal L^d$ は非零接測度です。係数を2倍すれば $2\mathcal L^d$ も接測度であり、接測度は一般に「定数倍まで一つ」であっても一意ではありません。
<!-- definition-example-end -->

### 3.1 再拡大しても接測度である

接測度が点の局所的な形を表すなら、得られた像をさらに固定倍率で拡大しても同じ局所形の候補であるはずです。

<a id="prop-gmt19-rescaling"></a>

<!-- formal-statement-start -->
> **命題（接測度の再拡大不変性）**
> 非負Radon測度 $\mu$、$x\in\operatorname{supp}\mu$、$\nu\in\operatorname{Tan}(\mu,x)$ と正数 $a,s$ に対して

$$
a(T_{0,s})_\#\nu\in\operatorname{Tan}(\mu,x)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

縮尺 $r_j$ で拡大した像をさらに $s$ で割る操作は、一度に縮尺 $sr_j$ で拡大する操作と一致します。コンパクト台の連続関数の合成から局所弱収束も保たれます。

<!-- proof-start -->
### 証明

$c_j(T_{x,r_j})_\#\mu\rightharpoonup_{\mathrm v}\nu$ とします。写像の合成は点 $y$ に適用して

$$
T_{0,s}(T_{x,r_j}(y))
=\frac{(y-x)/r_j}{s}
=T_{x,sr_j}(y)
$$

と確認できます。任意の $\varphi\in C_c$ に対し $\varphi\circ T_{0,s}$ も $C_c$ です。ゆえに

$$
\begin{aligned}
\int\varphi\,d\bigl(ac_j(T_{x,sr_j})_\#\mu\bigr)
&=a\int(\varphi\circ T_{0,s})\,d\bigl(c_j(T_{x,r_j})_\#\mu\bigr)\\
&\longrightarrow a\int(\varphi\circ T_{0,s})\,d\nu\\
&=\int\varphi\,d\bigl(a(T_{0,s})_\#\nu\bigr).
\end{aligned}
$$

固定された可逆な拡大は非零測度を非零のまま保ち、$sr_j\to0$ です。必要なら $r_j$ を部分列に取って単調にすれば定義を満たします。$\square$
<!-- proof-end -->

## 4. 極限を確実に取り出す条件

非零な極限を得るには、固定された観測窓の質量が一様に大きすぎず、小さすぎないことが大切です。測度版のコンパクト性を、[Riesz–Markov正汎関数版](../../MT/MT5/index.md#thm-mt5-riesz-markov-positive)から導きます。

<a id="lem-gmt19-vague-compactness"></a>

<!-- formal-statement-start -->
> **補題（測度の局所弱コンパクト性）**
> $\nu_j$ を $\mathbb R^d$ 上の非負Radon測度列とし、各 $R>0$ について

$$
\sup_j\nu_j(B(0,R))<\infty
$$

> と仮定する。このとき部分列 $\nu_{j_k}$ と非負Radon測度 $\nu$ が存在し、$\nu_{j_k}\rightharpoonup_{\mathrm v}\nu$ となる。ただし $\nu$ は零測度でもよい。
<!-- formal-statement-end -->

### 証明の見取り図

一つのコンパクト窓上では連続関数の積分が一様有界です。可算個の稠密なコンパクト台の連続関数について対角部分列を取り、極限を全 $C_c$ 関数へ延長します。最後に非負関数へ非負値を与える線形写像から測度を復元します。

<!-- proof-start -->
### 証明

$C_c(\mathbb R^d)$ の中から、各閉球 $\overline B(0,N)$ に台を持つ連続関数の一様ノルムについて稠密となる可算族を選びます（例えば有理格子上の値を持つ区分線形cutoffから作れます）。それを $\{\varphi_\ell\}_{\ell\ge1}$ と書きます。

$\varphi_\ell$ の台が $B(0,R_\ell)$ に入れば

$$
\left|\int\varphi_\ell\,d\nu_j\right|
\le \|\varphi_\ell\|_\infty\,\nu_j(B(0,R_\ell))
\le C_\ell
$$

です。まず $\ell=1$ の積分が収束する部分列を選び、その中から $\ell=2$ のものを選び、順に繰り返します。対角部分列では、すべての $\varphi_\ell$ に対して積分が収束します。

任意の $\varphi\in C_c$ を取り、その台を含む球の内側で $\varphi_\ell$ に一様近似します。二つの関数の差の積分について

$$
\left|\int(\varphi-\varphi_\ell)\,d\nu_j\right|
\le \|\varphi-\varphi_\ell\|_\infty\,
\sup_j\nu_j(B(0,R)).
$$

従って対角部分列上で $L(\varphi)=\lim_k\int\varphi\,d\nu_{j_k}$ が存在します。極限から $L$ は線形かつ非負関数に非負値を与え、各コンパクト台を固定したとき一様ノルムで有界です。[Riesz–Markov正汎関数版](../../MT/MT5/index.md#thm-mt5-riesz-markov-positive)を $X=\mathbb R^d$ に適用すると、$L(\varphi)=\int\varphi\,d\nu$ を満たす非負Radon測度 $\nu$ が得られます。これは定義どおりの局所弱収束です。$\square$
<!-- proof-end -->

ここでは一様上界だけを使ったため、局所弱極限が零に潰れる可能性は残ります。次に球の質量比を仮定して下界も保証します。

<a id="def-gmt19-doubling"></a>

<!-- formal-statement-start -->
> **定義（点での局所倍加性）**
> 非負Radon測度 $\mu$ と $x\in\operatorname{supp}\mu$ について、定数 $D\ge1$、$r_0>0$ が存在し、すべての $0<r<r_0$ に対して

$$
\mu(B(x,2r))\le D\,\mu(B(x,r))
$$

> が成り立つとき、$\mu$ は点 $x$ で局所倍加的であるという。$D,r_0$ は $x$ に依存してよい。
<!-- formal-statement-end -->

この条件は **中心を固定した球**の比だけに課します。空間中のすべての中心と半径に一様な倍加条件を要求するものではありません。

<!-- definition-example-start: def-gmt19-doubling -->
### 直接例：平面上の面積測度

**定義の確認**：台・局所有限性・球の質量比を直接計算し、倍加定数と半径上限を指定します。

$1\le m\le d$、$V$ を $m$ 平面、$\mu=\mathcal H^m\llcorner V$、$x\in V$ とします。上で確認した平面の球質量から

$$
\mu(B(x,r))=2^mr^m,\qquad
\frac{\mu(B(x,2r))}{\mu(B(x,r))}=2^m.
$$

$\mu$ はRadonで、任意の近傍の球に正の質量があるため $x\in\operatorname{supp}\mu$ です。従って $D=2^m$、任意の $r_0>0$ で局所倍加性の各条件を確認できました。
<!-- definition-example-end -->

<a id="thm-gmt19-doubling-tangent"></a>

<!-- formal-statement-start -->
> **定理（局所倍加点での接測度の存在）**
> $\mu$ を $\mathbb R^d$ 上の非負Radon測度、$x\in\operatorname{supp}\mu$ とする。$\mu$ が $x$ で局所倍加的なら、任意の $r_j\downarrow0$ から部分列 $r_{j_k}$ を選べて

$$
\frac{(T_{x,r_{j_k}})_\#\mu}{\mu(B(x,r_{j_k}))}
\rightharpoonup_{\mathrm v}\nu,\qquad \nu\ne0
$$

> とできる。特に $\operatorname{Tan}(\mu,x)\ne\varnothing$ である。
<!-- formal-statement-end -->

### 証明の見取り図

倍加不等式を有限回繰り返し、拡大後の半径 $R$ の球の質量を一様に抑えます。コンパクト性補題で極限を選び、半径1の球を覆うcutoffの積分で極限が非零と確かめます。

<!-- proof-start -->
### 証明

$x\in\operatorname{supp}\mu$ なので任意の小半径で $\mu(B(x,r))>0$ です。Radon性より小球の質量は有限です。$R>1$ を固定し、整数 $k\ge1$ を $R\le2^k$ となるよう取ります。$j$ が十分大きく $2^{k-1}r_j<r_0$ なら、倍加性を $r_j,2r_j,\ldots,2^{k-1}r_j$ に順に用いて

$$
\begin{aligned}
\mu_{x,r_j}(B(0,R))
&=\frac{\mu(B(x,Rr_j))}{\mu(B(x,r_j))}\\
&\le\frac{\mu(B(x,2^kr_j))}{\mu(B(x,r_j))}
\le D^k.
\end{aligned}
$$

$R\le1$ なら単調性から上界1で十分です。初めの有限個の $j$ についても各球の質量は有限なので、$R$ を固定すれば列全体に一様上界が得られます。[局所弱コンパクト性](#lem-gmt19-vague-compactness)から部分列と極限 $\nu$ が存在します。

次に $0\le\varphi\le1$、$\varphi=1$ on $\overline B(0,1)$、$\operatorname{supp}\varphi\subset B(0,2)$ となる連続cutoffを選びます。すべての $j$ で

$$
\int\varphi\,d\mu_{x,r_j}\ge\mu_{x,r_j}(B(0,1))=1.
$$

部分列の極限を取ると $\int\varphi\,d\nu\ge1$ であり、$\nu\ne0$ です。よって接測度の存在が示されました。$\square$
<!-- proof-end -->

### 密度が正で有限なら倍加性が従う

既習の [GMT1の上・下密度](../GMT1/index.md#def-gmt1-upper-lower-density)で、ある整数 $m\ge1$ について

$$
0<\liminf_{r\downarrow0}\frac{\mu(B(x,r))}{r^m}
\le\limsup_{r\downarrow0}\frac{\mu(B(x,r))}{r^m}<\infty
$$

なら、十分小さい $r$ で $ar^m\le\mu(B(x,r))\le br^m$ となる $0<a\le b<\infty$ を選べます。したがって

$$
\frac{\mu(B(x,2r))}{\mu(B(x,r))}
\le\frac{b(2r)^m}{ar^m}=2^m\frac ba
$$

です。これは正の有限密度の両側評価から接測度の存在が得られる道筋です。ただし密度の **極限値の存在** までは使っていません。

## 5. 平面・拡大不変集合・滑らかな曲線を拡大する

### 5.1 拡大不変集合は拡大しても形が変わらない

ここで **拡大不変集合** は、閉集合 $C\subset\mathbb R^d$ で、任意の $z\in C$ と $t>0$ について $tz\in C$ となるものです。幾何学では cone とも呼びますが、凸性は要求しません。$\mathcal H^m(C\cap B(0,R))<\infty$ が各 $R$ で成立し、半径1の球で正の面積を持つ場合を考えます。

<a id="prop-gmt19-cone"></a>

<!-- formal-statement-start -->
> **命題（拡大不変集合と平面の接測度）**
> $1\le m\le d$ とし、$C\subset\mathbb R^d$ を閉じた拡大不変集合で

$$
0<\mathcal H^m(C\cap B(0,1))<\infty,\qquad
\mathcal H^m(C\cap B(0,R))<\infty\quad(R>0)
$$

> を満たすものとする。$\mu=\mathcal H^m\llcorner C$ なら原点は $\operatorname{supp}\mu$ に属し、

$$
(T_{0,r})_\#\mu=r^m\mu,\qquad
\mu_{0,r}=\frac{\mu}{\mathcal H^m(C\cap B(0,1))}
$$

> がすべての $r>0$ で成り立つ。特に後者は原点の接測度である。$C=V$ が $m$ 次元線形平面なら $\mu_{0,r}=2^{-m}\mathcal H^m\llcorner V$ である。
<!-- formal-statement-end -->

### 証明の見取り図

拡大不変性により $rC=C$ です。押し出しの逆像 $rA$ で測り、Hausdorff測度の $m$ 次斉次性を使うだけです。平面では既習の球係数 $2^m$ を代入します。

<!-- proof-start -->
### 証明

任意のBorel集合 $A$ に対し、拡大不変性から $C\cap rA=r(C\cap A)$ です。[MT8のHausdorff測度の拡大則](../../MT/MT8/index.md#def-mt8-hausdorff-measure)を適用して

$$
\begin{aligned}
((T_{0,r})_\#\mu)(A)
&=\mathcal H^m(C\cap rA)\\
&=\mathcal H^m(r(C\cap A))
=r^m\mathcal H^m(C\cap A)
=r^m\mu(A).
\end{aligned}
$$

$\mu(B(0,r))=r^m\mu(B(0,1))>0$ なので原点は台に含まれ、球質量規格化を行うと $r^m$ が約分されます。一定列の局所弱極限はその測度自体です。$C=V$ なら [非正規化Hausdorff測度のEuclid空間上での比例](../GMT10/index.md#lem-gmt10-hausdorff-normalization)から $\mu(B(0,1))=2^m$ です。$\square$
<!-- proof-end -->

**二本の半直線の例。** $d=2,m=1$、$C=\{(t,0):t\ge0\}\cup\{(0,t):t\ge0\}$ とします。二つの半直線は原点以外で交わらないため

$$
\mathcal H^1(C\cap B(0,r))=r+r=2r,\qquad
\mu_{0,r}=\tfrac12\mathcal H^1\llcorner C.
$$

原点での接測度は一本の直線上の測度ではなく、角を持つ二本の半直線に載っています。集合の拡大像だけでなく、その各枝に残る測度も確認できました。

### 5.2 滑らかな曲面は接平面へ近付く

滑らかな曲面の一点 $x$ における接平面を、単に座標の絵から読み取るのではなく、測度の積分の極限から導きます。ここでは $C^1$ 埋め込みの局所表示を用い、[GMT13の整流可能集合上の面積公式](../GMT13/index.md#thm-gmt13-rectifiable-area)を適用します。

<a id="thm-gmt19-smooth-flat"></a>

<!-- formal-statement-start -->
> **定理（滑らかな曲面の平坦な接測度）**
> $1\le m\le d$ とする。$M\subset\mathbb R^d$ は点 $x\in M$ の近傍で $C^1$ 埋め込み $F:U\subset\mathbb R^m\to M$ による一枚の $m$ 次元曲面とし、$0\in U$、$F(0)=x$、$A=DF(0)$ はrank $m$ とする。$V=A\mathbb R^m$ とし、$\mu=\mathcal H^m\llcorner M$ は $\mathbb R^d$ 上で局所有限なRadon測度であるとする。このとき

$$
r^{-m}(T_{x,r})_\#\mu
\rightharpoonup_{\mathrm v}\mathcal H^m\llcorner V
\qquad(r\downarrow0).
$$

> 従って $\mathcal H^m\llcorner V$ と $2^{-m}\mathcal H^m\llcorner V$ はそれぞれ適切な規格化における $x$ の接測度である。
<!-- formal-statement-end -->

### 証明の見取り図

$F(ru)=x+rAu+o(r)$ と面積の倍率 $J_mF(ru)\to J_mA$ を同時に使います。積分の変数を $t=ru$ と置き、コンパクト台の連続関数の台から $u$ の範囲を有界に制限してから極限を交換します。

<!-- proof-start -->
### 証明

$F$ はrank $m$ の $C^1$ 埋め込みなので、原点の十分小さい近傍では双Lipschitzです。具体的には $|Av|\ge\kappa|v|$ となる $\kappa>0$ を選び、$F(t)-x=At+o(|t|)$ により

$$
|F(t)-x|\ge\frac{\kappa}{2}|t|
$$

を小さい $t$ で満たします。$M$ は $x$ の近傍でこの一枚の像なので、$\varphi\in C_c$ の台が $B(0,R)$ に含まれるとき、十分小さい $r$ では $\varphi((y-x)/r)$ の積分がこの表示の内側に収まります。

[GMT13の面積公式](../GMT13/index.md#thm-gmt13-rectifiable-area)で重複度が1となることを確認し、パラメータ $t\in U$ で積分します。$J_mF(t)=\sqrt{\det(DF(t)^{\mathsf T}DF(t))}$ です。

$$
\begin{aligned}
r^{-m}\int_M\varphi\left(\frac{y-x}{r}\right)d\mathcal H^m(y)
&=r^{-m}\int_U\varphi\left(\frac{F(t)-x}{r}\right)J_mF(t)\,dt\\
&=\int_{r^{-1}U}\varphi\left(\frac{F(ru)-x}{r}\right)J_mF(ru)\,du.
\end{aligned}
$$

もし被積分関数が零でなければ $|F(ru)-x|\le Rr$ なので、上記の下界から $|u|\le2R/\kappa$ です。従って積分する $u$ を固定された有界球へ制限できます。その上で $C^1$ 性により一様に

$$
\frac{F(ru)-x}{r}\longrightarrow Au,\qquad
J_mF(ru)\longrightarrow J_mA.
$$

Jacobianも有界で、固定球上の定数関数が可積分な支配関数になるので、[Lebesgueの優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)を適用できます。極限は $\int_{\mathbb R^m}\varphi(Au)J_mA\,du$ です。[GMT10の線形写像の面積倍率](../GMT10/index.md#thm-gmt10-linear-area)でこの積分は $\int_V\varphi\,d\mathcal H^m$ に等しくなります。これで局所弱収束が証明されました。

最後に極限の球面 $\partial B(0,1)$ は $V$ 上の $\mathcal H^m$-零集合なので、球質量も $r^{-m}\mu(B(x,r))\to2^m$ です。したがって球質量規格化の極限は $2^{-m}\mathcal H^m\llcorner V$ となります。$\square$
<!-- proof-end -->

**放物線の具体計算。** $M=\{(t,t^2):t\in\mathbb R\}$、$x=(0,0)$ とします。$F(t)=(t,t^2)$ なら $A(u)=(u,0)$、$J_1F(t)=\sqrt{1+4t^2}$ です。積分の変数を $t=ru$ とすると

$$
\begin{aligned}
r^{-1}\int_M\varphi(y/r)\,d\mathcal H^1(y)
&=\int_{\mathbb R}\varphi(u,ru^2)\sqrt{1+4r^2u^2}\,du\\
&\longrightarrow\int_{\mathbb R}\varphi(u,0)\,du.
\end{aligned}
$$

台が有界なら $|u|\le R$ に制限でき、平方根も有界なので極限交換ができます。接測度の台は原点での水平接線になりました。

## 6. 平坦な極限から接平面を読み取る

ここまでの向きは「滑らかな曲面なら平面への極限がある」でした。逆向きに、面積測度の拡大像が **すべての小スケールで** 平面上の測度へ収束すると分かれば、[GMT15の近似接平面](../GMT15/index.md#def-gmt15-approximate-tangent)を導けます。

<a id="prop-gmt19-flat-approximate"></a>

<!-- formal-statement-start -->
> **命題（全スケール平坦極限から近似接平面へ）**
> $1\le m\le d$、$E\subset\mathbb R^d$ をBorel集合、$\mu=\mathcal H^m\llcorner E$ を局所有限なRadon測度、$x\in E$ とする。$m$ 次元線形平面 $V$ と定数 $c>0$ があり、

$$
r^{-m}(T_{x,r})_\#\mu
\rightharpoonup_{\mathrm v}c\,\mathcal H^m\llcorner V
\qquad(r\downarrow0)
$$

> が半径の全極限として成り立つなら、$D^m(E,x)=c$ であり、$V$ は $x$ における近似接$m$平面である。
<!-- formal-statement-end -->

### 証明の見取り図

球面が極限測度の零集合であることから密度が読めます。平面から一定の割合で離れる閉円錐を単位閉球で切ると、その集合の極限測度は零なので、近似接平面の円錐外条件が従います。

<!-- proof-start -->
### 証明

$\nu_r=r^{-m}(T_{x,r})_\#\mu$ と置きます。極限測度 $\nu=c\mathcal H^m\llcorner V$ は $\partial B(0,1)$ に質量を持ちません。内側と外側のコンパクト台cutoffで球の指示関数を挟み、[局所弱収束の定義](#def-gmt19-vague)を用いると

$$
\frac{\mu(B(x,r))}{r^m}
=\nu_r(B(0,1))
\longrightarrow\nu(B(0,1))=c2^m.
$$

[GMT15の平面基準密度](../GMT15/index.md#def-gmt15-plane-density)の分母は $2^mr^m$ なので $D^m(E,x)=c$ です。特に正で有限です。

$0<\varepsilon<1$ を任意に固定し、$V$ から相対距離 $\varepsilon$ 以上外れた単位閉球内の集合を

$$
K_\varepsilon=\{z:|z|\le1,\
\operatorname{dist}(z,V)\ge\varepsilon|z|\}
$$

とします。これはコンパクトです。$V$ に属する点でこの不等式を満たすのは $z=0$ だけなので、$m\ge1$ により $\nu(K_\varepsilon)=0$ です。前節のコンパクト集合に関する上極限評価から

$$
\limsup_{r\downarrow0}\nu_r(K_\varepsilon)
\le \nu(K_\varepsilon)=0.
$$

従って

$$
\lim_{r\downarrow0}r^{-m}
\mu\left(\left\{y\in B(x,r):
\operatorname{dist}(y-x,V)\ge\varepsilon|y-x|\right\}\right)=0.
$$

これは [GMT15の近似接平面の定義](../GMT15/index.md#def-gmt15-approximate-tangent)における円錐外面積の条件そのものです。すべての $\varepsilon$ で成立するので結論を得ます。$\square$
<!-- proof-end -->

ここで要求したのは **すべての半径 $r\downarrow0$ に沿った規格化済み極限**です。接測度の定義では一つの半径部分列を選べばよく、また自由に係数を変えられます。したがって「一つの平坦な接測度が存在する」だけから上の命題の仮定を得ることはできません。

### 6.1 特異な測度では接測度が複数の形を持つ

$e_1=(1,0,\ldots,0)$、$a_n=2^{-2^n}$（$n\ge1$）とし、

$$
\mu=\sum_{n=1}^\infty a_n\delta_{a_ne_1}
$$

を考えます。総質量は有限で、原点は原子の集積点なので台に含まれます。$a_{n+1}/a_n\to0$ です。

まず $r_n=a_n$、$c_n=1/a_n$ とすると、$n$ 番目の原子は重さ1で $e_1$ へ移ります。$k<n$ の原子は観測窓から出て、$k>n$ の合計の相対質量は

$$
\frac{\sum_{k>n}a_k}{a_n}
\le\frac{2a_{n+1}}{a_n}\longrightarrow0
$$

です。従って $c_n(T_{0,r_n})_\#\mu\rightharpoonup_{\mathrm v}\delta_{e_1}$ です。

他方、$s_n=\sqrt{a_na_{n+1}}$、$b_n=1/a_{n+1}$ とします。$n$ 番目以前の原子は無限遠へ去り、$(n+1)$ 番目は

$$
\frac{a_{n+1}}{s_n}
=\sqrt{\frac{a_{n+1}}{a_n}}\longrightarrow0
$$

へ重さ1で移ります。それ以降の相対質量も消えるので

$$
b_n(T_{0,s_n})_\#\mu\rightharpoonup_{\mathrm v}\delta_0.
$$

**$\delta_{e_1}$ と $\delta_0$ は定数倍や固定拡大でも一致しない**、異なる二つの接測度です。一般の接測度が平坦とは限らず、存在しても形が一意とは限らないことを、原子の列で確かめられました。

## 7. 演習

拡大・存在・形の違いを、計算と証明で自分で確かめます。

### Level A：定義と基本計算

<a id="ex-gmt19-a1"></a>
**A1. 押し出しの積分。** $\mu=3\mathcal L^1$ を $\mathbb R$ 上の測度とし、$x=2,r=1/4$ とする。$(T_{x,r})_\#\mu$ と球質量規格化を求めよ。$\varphi\in C_c(\mathbb R)$ に対する積分でも確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $T_{2,1/4}^{-1}(A)=2+\frac14 A$ なので、Lebesgue測度の拡大則から

$$
((T_{2,1/4})_\#\mu)(A)
=3\mathcal L^1\left(2+\tfrac14 A\right)
=\tfrac34\mathcal L^1(A).
$$

球は $(2-\frac14,2+\frac14)$ だから $\mu(B(2,\frac14))=3\times\frac12=\frac32$ です。したがって

$$
\mu_{2,1/4}=\frac{\frac34\mathcal L^1}{\frac32}
=\tfrac12\mathcal L^1.
$$

積分でも $z=4(y-2)$、$dy=\frac14dz$ を代入して

$$
\int\varphi(4(y-2))\,3dy
=\frac34\int\varphi(z)\,dz
$$

です。単位球 $(-1,1)$ の質量は $\frac12\times2=1$ と検算できます。
<!-- solution-end -->

<a id="ex-gmt19-a2"></a>
**A2. 点質量の中心。** $\mu=2\delta_{(1,0)}$ とし、中心 $x=(1,0)$ と $x=(0,0)$ のそれぞれについて $\mu_{x,r}$ が小さい $r$ で定義できるか調べ、接測度を一つ求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $x=(1,0)$ なら $\mu(B(x,r))=2$、押し出しは $2\delta_0$ なので $\mu_{x,r}=\delta_0$ です。任意の $r_j\downarrow0$ で非零の同じ測度へ局所弱収束し、$\delta_0\in\operatorname{Tan}(\mu,x)$ です。

$x=(0,0)$ では $0<r<1$ の球に原子がなく $\mu(B(x,r))=0$ です。球質量規格化はできず、また原点は $\operatorname{supp}\mu=\{(1,0)\}$ に入らないので、本章の接測度の定義の中心としても選べません。
<!-- solution-end -->

<a id="ex-gmt19-a3"></a>
**A3. 二種類の弱収束。** $\mathbb R$ 上の $\nu_j=\delta_j$ が局所弱収束では零測度へ収束することを示せ。確率測度の通常の弱収束との違いを有界連続関数で説明せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 任意の $\varphi\in C_c$ の台はある $[-R,R]$ に入ります。$j>R$ では $\varphi(j)=0$ なので

$$
\int\varphi\,d\nu_j=\varphi(j)\longrightarrow0=\int\varphi\,d0.
$$

一方、確率測度の通常の弱収束は有界連続関数をすべて試験します。定数関数 $1$ について $\int1\,d\delta_j=1$ ですが $\int1\,d0=0$ です。従って零測度への通常の弱収束は起こりません。
<!-- solution-end -->

<a id="ex-gmt19-a4"></a>
**A4. 半直線の正規化。** $\mu=\mathcal H^1\llcorner\{(t,0):t\ge0\}$ を $\mathbb R^2$ 上で考える。原点での $(T_{0,r})_\#\mu$ と $\mu_{0,r}$ を求め、極限が零でないことを示せ。

- Level: A

<!-- solution-start -->
**詳細解答。** 半直線は拡大不変なので $C\cap rA=r(C\cap A)$ を用いると

$$
(T_{0,r})_\#\mu=r\mu.
$$

また原点を中心とする半径 $r$ の球との交わりは長さ $r$ の半開線分なので、$\mu(B(0,r))=r$ です。よって $\mu_{0,r}=\mu$ が全 $r$ で成立します。例えば半径1の球の質量は1ですから $\mu\ne0$ であり、$\mu\in\operatorname{Tan}(\mu,0)$ です。
<!-- solution-end -->

<a id="ex-gmt19-a5"></a>
**A5. 密度から倍加へ。** 非負Radon測度 $\mu$、$x\in\operatorname{supp}\mu$ に対し、$0<a\le b<\infty$ と $r_0>0$ があり $ar^m\le\mu(B(x,r))\le br^m$ が $0<r<r_0$ で成立する。点 $x$ の局所倍加定数を具体的に与えよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $0<r<r_0/2$ なら $r,2r$ の両方で仮定を使えるため

$$
\mu(B(x,2r))\le b(2r)^m=2^mb\,r^m,
\qquad \mu(B(x,r))\ge ar^m.
$$

両辺を割ると $\mu(B(x,2r))/\mu(B(x,r))\le2^mb/a$ です。よって $D=2^mb/a$、新しい半径上限 $r_0/2$ が使えます。下界 $a>0$ が分母を保証する点も不可欠です。
<!-- solution-end -->

### Level B：定理を組み合わせる

<a id="ex-gmt19-b1"></a>
**B1. 連続密度のblow-up。** $\mathbb R^d$ で $\mu=f\mathcal L^d$、$f$ は $x$ の近傍で連続、$f(x)>0$ かつ非負とする。$r^{-d}(T_{x,r})_\#\mu$ と $\mu_{x,r}$ の局所弱極限を、それぞれ求めよ。$f$ は遠方では有界でなくてもよい。

- Level: B

<!-- solution-start -->
**詳細解答。** $\varphi\in C_c$ の台を $B(0,R)$ に含め、押し出しの積分で $y=x+rz$ と変数変換すると

$$
r^{-d}\int\varphi\left(\frac{y-x}{r}\right)f(y)\,dy
=\int_{B(0,R)}\varphi(z)f(x+rz)\,dz.
$$

$f$ は $x$ で連続なので $z\in B(0,R)$ に関し $f(x+rz)\to f(x)$ は一様です。したがって極限は $f(x)\int\varphi(z)\,dz$ です。同様に球質量の積分を $y=x+rz$ と置けば

$$
\frac{\mu(B(x,r))}{r^d}
=\int_{B(0,1)}f(x+rz)\,dz
\longrightarrow f(x)\omega_d.
$$

後者は正なので十分小さい $r$ で球質量規格化ができ、前者を後者で割って

$$
r^{-d}(T_{x,r})_\#\mu\rightharpoonup_{\mathrm v}f(x)\mathcal L^d,
\qquad
\mu_{x,r}\rightharpoonup_{\mathrm v}\frac{\mathcal L^d}{\omega_d}.
$$

遠方の $f$ はコンパクト台の連続関数による積分では参照されません。
<!-- solution-end -->

<a id="ex-gmt19-b2"></a>
**B2. 二本の半直線の角。** $C=\{(t,0):t\ge0\}\cup\{(0,t):t\ge0\}$、$\mu=\mathcal H^1\llcorner C$ とする。$\mu_{0,r}$ と $\mu(B(0,r))/(2r)$ を求め、なぜ一枚の直線の接測度ではないか説明せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** 各半直線が球内に長さ $r$ ずつ入るので $\mu(B(0,r))=2r$、平面基準密度は

$$
\frac{\mu(B(0,r))}{2r}=\frac{2r}{2r}=1.
$$

拡大不変集合の計算から $(T_{0,r})_\#\mu=r\mu$ なので $\mu_{0,r}=\frac12\mu$ です。この測度は二本の直交する正半直線のどちらにも正の質量を与え、一本の直線上には支えられません。密度1という数字だけでは近似接線の存在を判定できないことが分かります。実際、どの直線を候補にしても片方の枝が固定角度だけ外側に残り、円錐外の質量は $r$ のオーダーで消えません。
<!-- solution-end -->

<a id="ex-gmt19-b3"></a>
**B3. 疎な原子の異なる極限。** $a_n=2^{-2^n}$、$\mu=\sum_{n\ge1}a_n\delta_{a_n}$ を $\mathbb R$ 上で考える。$r_n=a_n$、$s_n=\sqrt{a_na_{n+1}}$ の二系列を用いて、$\delta_1,\delta_0$ がいずれも原点の接測度であることを出発点から示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** どの $r>0$ の球にも十分大きい $n$ の原子が入るため $0\in\operatorname{supp}\mu$ です。任意の $\varphi\in C_c(\mathbb R)$ に対し

$$
\int\varphi\,d\left(a_n^{-1}(T_{0,a_n})_\#\mu\right)
=\sum_{k\ge1}\frac{a_k}{a_n}\varphi(a_k/a_n).
$$

$k<n$ なら $a_k/a_n\ge a_{n-1}/a_n\to\infty$ なので、固定コンパクト台の外に出ます。$k=n$ は $\varphi(1)$ です。$k>n$ について $a_{k+1}/a_k\le1/4$ より $\sum_{k>n}a_k\le2a_{n+1}$、従って残りの絶対値は $2\|\varphi\|_\infty a_{n+1}/a_n\to0$ です。極限は $\varphi(1)$ となります。

次に

$$
\int\varphi\,d\left(a_{n+1}^{-1}(T_{0,s_n})_\#\mu\right)
=\sum_{k\ge1}\frac{a_k}{a_{n+1}}\varphi(a_k/s_n).
$$

$k\le n$ の位置は $a_n/s_n=\sqrt{a_n/a_{n+1}}\to\infty$ 以上なので台から出ます。$k=n+1$ の位置は $a_{n+1}/s_n=\sqrt{a_{n+1}/a_n}\to0$ で重さ1です。$k>n+1$ の合計重みは $\le2a_{n+2}/a_{n+1}\to0$。極限は $\varphi(0)$ です。二つの極限は非零であり、定義に従って $\delta_1,\delta_0\in\operatorname{Tan}(\mu,0)$ です。
<!-- solution-end -->

<a id="ex-gmt19-b4"></a>
**B4. 放物線と局所弱収束。** $\mu=\mathcal H^1\llcorner\{(t,t^2):t\in\mathbb R\}$ の原点での $r^{-1}(T_{0,r})_\#\mu$ の極限を、線素のJacobianと $C_c$ 関数で直接導け。球質量規格化の極限も求めよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $F(t)=(t,t^2)$ の速度は $F'(t)=(1,2t)$、長さは $\sqrt{1+4t^2}$ です。[面積公式](../GMT13/index.md#thm-gmt13-rectifiable-area)でパラメータ表示して $t=ru$ と置くと

$$
\begin{aligned}
\int\varphi\,d\bigl(r^{-1}(T_{0,r})_\#\mu\bigr)
&=r^{-1}\int_{\mathbb R}\varphi(t/r,t^2/r)\sqrt{1+4t^2}\,dt\\
&=\int_{\mathbb R}\varphi(u,ru^2)\sqrt{1+4r^2u^2}\,du.
\end{aligned}
$$

$\varphi$ の台が $B(0,R)$ なら被積分関数が非零な範囲で $|u|\le R$ です。固定区間上では平方根と $\varphi$ が一様に有界で、可積分な支配関数があるため [Lebesgueの優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)を使えます。極限は $\int_\mathbb R\varphi(u,0)\,du$、すなわち水平直線の $\mathcal H^1$ です。単位円周はこの極限測度に関して零なので $\mu(B(0,r))/r\to2$ です。よって

$$
\mu_{0,r}\rightharpoonup_{\mathrm v}
\tfrac12\mathcal H^1\llcorner(\mathbb R\times\{0\}).
$$
<!-- solution-end -->

### Level C：密度と接測度の統合

<a id="ex-gmt19-c1"></a>
**C1. 接する二曲線は密度2でも平坦な極限を持つ。** $E=(\mathbb R\times\{0\})\cup\{(t,t^2):t\in\mathbb R\}$、$\mu=\mathcal H^1\llcorner E$、$x=(0,0)$ とする。

- Level: C

1. $E$ がBorelで局所有限な $\mathcal H^1$ 測度を持つことを示せ。
2. $r^{-1}(T_{0,r})_\#\mu$ の局所弱極限と $D^1(E,0)$ を求めよ。
3. 原点における近似接線を定義から判定し、密度1でないことと矛盾しない理由を述べよ。

<!-- solution-start -->
**詳細解答。**

**1.** 直線は $\{(x,y):y=0\}$、放物線は $\{(x,y):y-x^2=0\}$ と表せます。どちらも連続関数の零集合なので閉じており、その有限和 $E$ も閉集合、従ってBorelです。有界球の内側で直線の長さは有限です。放物線は有界な $t$ 範囲で $F(t)=(t,t^2)$ と表され、線素 $\sqrt{1+4t^2}$ の積分も有限です。従って $\mu$ は局所有限なRadon測度です。

**2.** 二つの曲線の交わりは原点一つだけで $\mathcal H^1(\{0\})=0$ なので、測度は二つの曲線の測度の和です。直線の部分は[拡大不変集合の命題](#prop-gmt19-cone)からすべての $r$ で $r^{-1}(T_{0,r})_\#(\mathcal H^1\llcorner V)=\mathcal H^1\llcorner V$ です。放物線部分は[滑らかな曲面の定理](#thm-gmt19-smooth-flat)で同じ水平直線 $V=\mathbb R\times\{0\}$ へ収束します。コンパクト台の連続関数に対する積分も和なので

$$
r^{-1}(T_{0,r})_\#\mu
\rightharpoonup_{\mathrm v}2\mathcal H^1\llcorner V.
$$

極限の単位円周は零測度集合だから $\mu(B(0,r))/r\to2\times\mathcal H^1(V\cap B(0,1))=4$ です。[平面基準密度](../GMT15/index.md#def-gmt15-plane-density)の分母は $2r$ なので

$$
D^1(E,0)=\lim_{r\downarrow0}\frac{\mu(B(0,r))}{2r}
=\frac42=2.
$$

**3.** [全スケール平坦極限の命題](#prop-gmt19-flat-approximate)を $m=1,c=2,V=\mathbb R\times\{0\}$ に適用します。$E$ はBorelで局所有限、$c>0$ かつ極限は全半径で成立したので、$V$ が近似接線となります。定義から直接見ても、直線部分は円錐外に質量を持たず、放物線では $|t^2|/\sqrt{t^2+t^4}\le|t|$ なので、$|t|<\varepsilon$ の小球内で円錐外に点がありません。密度2は二枚の曲線が同じ接線に重なっている「重複度」を表し、接方向が二つあることを意味しません。
<!-- solution-end -->

## 8. 次の講義への橋

接測度は「拡大像の形」を与えますが、単に一つの接測度を選べることだけでは一般の集合を整流可能と断定できません。GMT20では、[GMT15の密度・近似接平面](../GMT15/index.md#thm-gmt15-rectifiable-density-tangent)と本講義の局所極限を組み合わせ、どの密度仮定なら幾何的な整流可能性を判定できるかを考えます。特に一般の正・有限な整数次元密度から整流可能性を結論するPreissの深い定理は、ここで証明した局所倍加性だけからは出てきません。
