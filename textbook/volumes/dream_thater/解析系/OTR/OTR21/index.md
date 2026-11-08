# OTR21 どのエネルギーがどのPDEを生むか

[OTR20の形式的なWasserstein勾配](../OTR20/index.md#def-otr20-formal-gradient)では、第一変分 $U_\rho=\delta\mathcal F/\delta\rho$ から下降速度 $v=-\nabla U_\rho$ を選び、[連続の方程式](../OTR17/index.md#def-otr17-measure-weak)へ入れる手順を得ました。しかし、まだ「どのエネルギーを選べば熱や拡散が現れるか」は分かりません。普通の粒子なら位置のエネルギーを下げると低い場所へ移動します。確率密度には、広がることで下がるエネルギーもあります。

今回は、[OTR16の位置エネルギー](../OTR16/index.md#def-otr16-potential-energy)、[相互作用エネルギー](../OTR16/index.md#def-otr16-interaction-energy)、[密度に依存するエネルギー](../OTR16/index.md#def-otr16-internal-energy)の一例を組み合わせます。**拡散・外場への移動・粒子間相互作用**が、同じ下降法則の三つの項として現れます。以下では $d\ge1$、空間は $\mathbb R^d$、密度は特に断らなければ滑らか・厳密に正・全質量 $1$ とします。$\nabla$ と $\Delta=\nabla\cdot\nabla$ は空間変数 $x$ に関する勾配とLaplacianです。

## 1. 広がることにもエネルギーがある

一様な箱から質量を押し広げると、密度の高い部分が薄くなります。密度 $r>0$ に関数 $r\log r$ を対応させ、その積分を考えると、広がりに対する値の変化を計算できます。$r=0$ では $r\log r=0$ と連続延長します。この量をここでは**熱エントロピー** $\mathcal H$ と呼びます。情報理論でよく用いる $-\int\rho\log\rho$ という量とは**符号が逆**です。

一方、外場 $V(x)$ は粒子一個にかかる位置ごとの費用で、偶関数 $W(x-y)$ は粒子の対ごとの費用です。$W$ の偶性とは $W(z)=W(-z)$ であり、二重積分で対 $(x,y)$ と $(y,x)$ を数える重複を係数 $1/2$ で調整します。$W*\rho$ は畳み込みで、$(W*\rho)(x)=\int W(x-y)\rho(y)dy$ と書きます。

<a id="def-otr21-free-energy"></a>

<!-- formal-statement-start -->
> **定義（エントロピーを含む自由エネルギー）**
> $a>0$、$V,W:\mathbb R^d\to\mathbb R$ は $C^2$ 級で、$W$ は偶関数、$|V(x)|+|W(x)|\le C(1+|x|^2)$ とする。二次モーメントを持つ確率密度 $\rho$ で $\int\rho\log\rho$ が有限のとき、**自由エネルギー**を

$$
\begin{aligned}
\mathcal F(\rho)&=a\mathcal H(\rho)+\mathcal V(\rho)+\mathcal W(\rho),\\
\mathcal H(\rho)&=\int_{\mathbb R^d}\rho(x)\log\rho(x)\,dx,\\
\mathcal V(\rho)&=\int_{\mathbb R^d}V(x)\rho(x)\,dx,\\
\mathcal W(\rho)&=\frac12\iint W(x-y)\rho(x)\rho(y)\,dx\,dy
\end{aligned}
$$

> と定める。$a$ は拡散の強さを決める係数である。全ての積分が実数として定義される密度に限ってこの式を使用する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr21-free-energy -->
**定義の確認**。$d=1$、$a=1$、$V=W=0$、$\rho(x)=(2\pi)^{-1/2}e^{-x^2/2}$ とします。密度は正で、Gaussian積分により全質量 $1$、二次モーメント $\int x^2\rho dx=1$ です。$\log\rho=-\frac12\log(2\pi)-x^2/2$ を積分すると

$$
\mathcal F(\rho)=\mathcal H(\rho)
=-\frac12\log(2\pi)-\frac12\int x^2\rho dx
=-\frac12\log(2\pi e).
$$

$V=W=0$ は偶性・成長条件を満たし、三項とも有限です。熱エントロピーは負になっても構いません。特に「非負でなければならないエネルギー」ではありません。
<!-- definition-example-end -->

$a=1$、$V=W=0$ のとき $\mathcal F=\mathcal H$ です。$a=1$、$W=0$、$V(x)=|x|^2/2$ とすれば、外へ広がろうとする密度と、原点へ集める外場の競争になります。この後者から、熱方程式に復元力を加えたFokker–Planck方程式が出ます。

## 2. 三つの第一変分を手で出す

[質量保存制約下の第一変分](../OTR20/index.md#def-otr20-first-variation)は、$\eta\in C_c^\infty(\mathbb R^d)$、$\int\eta dx=0$ に対して $\rho+\varepsilon\eta$ を代入して微分したものです。$\rho$ は正で $\eta$ の台はコンパクトなので、その台上の $\rho$ には正の最小値があります。従って十分小さい $|\varepsilon|$ では非負性と全質量を保てます。

<a id="prop-otr21-first-variations"></a>

<!-- formal-statement-start -->
> **命題（三種のエネルギーの第一変分）**
> $\rho$ を滑らかな正の確率密度で有限二次モーメントと有限の $\mathcal H(\rho)$ を持つものとする。$V,W$ は[本章の自由エネルギー](#def-otr21-free-energy)の条件を満たす。このとき、コンパクト支持の質量保存変分に関する第一変分は、加法定数を除き

$$
\frac{\delta\mathcal H}{\delta\rho}=\log\rho+1,\qquad
\frac{\delta\mathcal V}{\delta\rho}=V,\qquad
\frac{\delta\mathcal W}{\delta\rho}=W*\rho.
$$

> 特に $\mathcal F=a\mathcal H+\mathcal V+\mathcal W$ の第一変分を

$$
U_\rho=a(\log\rho+1)+V+W*\rho
$$

> と選べる。$W$ の偶性を外すなら第三項は $W_{\rm sym}*\rho$ に置換し、$W_{\rm sym}(z)=(W(z)+W(-z))/2$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

最初の項では実関数 $r\log r$ を微分します。位置エネルギーは $\rho$ に線形です。相互作用では変分した密度が二つの因子に現れ、偶性によって二つの交差項が等しくなります。係数 $1/2$ が消える理由はこの対称性です。

<!-- proof-start -->
### 証明

$\rho_\varepsilon=\rho+\varepsilon\eta$ と置きます。コンパクト集合 $K=\operatorname{supp}\eta$ 上では $\rho_\varepsilon$ は $\varepsilon$ の小さな区間で一様に正です。従って $r\log r$ の導関数 $1+\log r$ を用い、積分領域を $K$ に制限して微分と積分を交換できます。

$$
\left.\frac{d}{d\varepsilon}\mathcal H(\rho_\varepsilon)\right|_0
=\int_K(1+\log\rho)\eta\,dx.
$$

位置エネルギーは $\mathcal V(\rho_\varepsilon)=\mathcal V(\rho)+\varepsilon\int V\eta$ なので、微分係数は $\int V\eta$ です。

相互作用では、二つの因子をそれぞれ展開します。

$$
\begin{aligned}
\mathcal W(\rho_\varepsilon)-\mathcal W(\rho)
={}&\frac\varepsilon2\iint W(x-y)
\{\eta(x)\rho(y)+\rho(x)\eta(y)\}\,dx\,dy\\
&+\frac{\varepsilon^2}{2}\iint W(x-y)\eta(x)\eta(y)\,dx\,dy.
\end{aligned}
$$

成長条件と $\rho$ の二次モーメント、$\eta$ のコンパクト支持により、ここに現れる積分は有限です。第二の一次項で $x,y$ を交換し $W(y-x)=W(x-y)$ を用いると、第一の一次項に一致します。従って

$$
\left.\frac{d}{d\varepsilon}\mathcal W(\rho_\varepsilon)\right|_0
=\int\left[\int W(x-y)\rho(y)dy\right]\eta(x)dx.
$$

偶性がなければ、二つの一次項の平均が $W_{\rm sym}*\rho$ を与えます。最後に三つの微分を足し、$\int\eta dx=0$ なので第一変分へ定数を加えても変わらないことを確認します。$\square$
<!-- proof-end -->

**直接の確認**として $d=1$、$W(z)=\kappa z^2/2$、$\kappa\ge0$ を考えます。$m=\int y\rho(y)dy$、$M_2=\int y^2\rho(y)dy$ とすると

$$
(W*\rho)(x)=\frac\kappa2(x^2-2mx+M_2),
\qquad\partial_x(W*\rho)(x)=\kappa(x-m).
$$

畳み込みの変分が、各粒子を重心 $m$ へ引き寄せる力を表すと分かります。**偶性は重要**です。例えば $W(z)=z$ なら $\iint(x-y)\rho(x)\rho(y)dxdy=0$ でエネルギーは恒等的にゼロですが、誤って $W*\rho=x-m$ を第一変分にするとゼロでない力を予測してしまいます。

## 3. 保存則へ入れるとPDEが現れる

第一変分の空間勾配は

$$
\nabla U_\rho=a\frac{\nabla\rho}{\rho}+\nabla V+\nabla(W*\rho).
$$

第1項の分母は $\rho>0$ なので意味を持ちます。$W$ を積分の内部で微分するには、例えば $|\nabla W(z)|\le C(1+|z|)$ と有限一次モーメントを仮定します。最初の項へ $\rho$ を掛けると $\rho\nabla\log\rho=\nabla\rho$ となる点が、拡散を生みます。

<a id="thm-otr21-gradient-pde"></a>

<!-- formal-statement-start -->
> **定理（自由エネルギーの形式的Wasserstein下降方程式）**
> $a>0$、$V,W\in C^2(\mathbb R^d)$ とし、$W$ は偶、$|V|+|W|\le C(1+|x|^2)$、$|\nabla V|+|\nabla W|\le C(1+|x|)$ とする。滑らかで正の確率密度 $\rho_t$ が有限二次モーメントを持ち、$\nabla U_{\rho_t}\in L^2(\rho_tdx)$ かつ[OTR20の接空間](../OTR20/index.md#def-otr20-tangent)に属するとする。[形式的Wasserstein勾配](../OTR20/index.md#def-otr20-formal-gradient)の負を速度として[連続の方程式](../OTR17/index.md#def-otr17-measure-weak)を満たすなら、分布の意味で

$$
\boxed{\partial_t\rho
=a\Delta\rho+\nabla\cdot(\rho\nabla V)
+\nabla\cdot\bigl(\rho\nabla(W*\rho)\bigr).}
$$

> 逆に、このPDEを満たす滑らかな正の $\rho_t$ で上記の可積分性・接空間条件が成立するなら、速度 $v_t=-\nabla U_{\rho_t}$ は同じ連続の方程式を満たす。この同値は**滑らかな解が存在することの証明ではない**。
<!-- formal-statement-end -->

### 証明の見取り図

[OTR20の下降速度の符号](../OTR20/index.md#def-otr20-formal-gradient)に従って $v=-\nabla U$ を採用します。保存則のマイナス符号が反転するため、右辺は正の発散になります。その第1項だけが $a\Delta\rho$ に簡約されます。

<!-- proof-start -->
### 証明

[第一変分の計算](#prop-otr21-first-variations)を $x$ で微分すると、正値性と畳み込みの微分可能性より

$$
v=-\nabla U_\rho
=-a\nabla\log\rho-\nabla V-\nabla(W*\rho).
$$

連続の方程式 $\partial_t\rho+\nabla\cdot(\rho v)=0$ に代入し、$v$ の三つの負号を展開します。

$$
\begin{aligned}
\partial_t\rho
&=-\nabla\cdot(\rho v)\\
&=\nabla\cdot(a\rho\nabla\log\rho)
 +\nabla\cdot(\rho\nabla V)
 +\nabla\cdot(\rho\nabla(W*\rho))\\
&=a\nabla\cdot(\nabla\rho)
 +\nabla\cdot(\rho\nabla V)
 +\nabla\cdot(\rho\nabla(W*\rho)).
\end{aligned}
$$

最後の行が結論です。逆方向は $v=-\nabla U$ を定義して上の等式を逆にたどればよく、仮定した可積分性の下で分布的な連続の方程式になります。$\square$
<!-- proof-end -->

三つの項を切り分けると次のようになります。

| エネルギー | 下降速度 | 密度のPDE |
| --- | --- | --- |
| $a\mathcal H$ | $-a\nabla\log\rho$ | $\partial_t\rho=a\Delta\rho$（熱方程式） |
| $\mathcal H+\mathcal V$ | $-\nabla\log\rho-\nabla V$ | $\partial_t\rho=\Delta\rho+\nabla\cdot(\rho\nabla V)$（Fokker–Planck方程式） |
| $\mathcal W$ | $-\nabla(W*\rho)$ | $\partial_t\rho=\nabla\cdot(\rho\nabla(W*\rho))$（相互作用輸送） |

表の相互作用のみの行は $a=0$ とした極限的な別のエネルギーを扱っています。証明はその項だけについて同じ代数を適用するもので、定理の $a>0$ を密かに変更したわけではありません。外場だけなら $v=-\nabla V$ の輸送方程式です。一般には三項の和で、拡散と移流が競争します。

### Gaussianの熱流を検算する

$d=1$、$V=W=0$、$a=1$、初期密度が平均 $m$、分散 $q_0>0$ のGaussianだとします。$q(t)=q_0+2t$ と置いて

$$
\rho_t(x)=\frac1{\sqrt{2\pi q(t)}}
\exp\left(-\frac{(x-m)^2}{2q(t)}\right).
$$

$q'=dq/dt=2$ とし、$\partial_t$ は位置 $x$ を固定した時間微分、$\partial_x$ は時刻 $t$ を固定した空間微分です。対数密度を各変数で微分すると

$$
\partial_t\log\rho=-\frac{q'}{2q}+\frac{q'(x-m)^2}{2q^2},
\qquad \partial_x\log\rho=-\frac{x-m}{q}.
$$

$\partial_t\rho=\rho\,\partial_t\log\rho$、$\partial_x\rho=\rho\,\partial_x\log\rho$ を使い、後者をもう一度空間微分すると

$$
\frac{\partial_t\rho}{\rho}=-\frac1q+\frac{(x-m)^2}{q^2},
\qquad
\frac{\partial_{xx}\rho}{\rho}
=-\frac1q+\frac{(x-m)^2}{q^2}.
$$

この族は熱方程式を満たし、分散が $2t$ だけ増えます。これはあくまで明示的な滑らか解の検算であり、任意の初期条件からの存在・一意性を示すものではありません。

## 4. 下降速度を選ぶと何が減るか

式から下降の向きが分かっても、時間とともに本当にエネルギーが減ることは境界の扱いなしには言えません。積分の時間微分を実行でき、無限遠へ流出する境界項が消える条件を確かめます。

エントロピーだけの場合の散逸率に現れるのは、正密度の対数の勾配の二乗平均です。これは**Fisher情報**と呼ばれます。ここでいうFisher情報は位置変数 $x$ に関する情報で、未知母数についてのFisher情報行列ではありません。

<a id="def-otr21-fisher"></a>

<!-- formal-statement-start -->
> **定義（密度のFisher情報）**
> $\rho\in C^1(\mathbb R^d)$ を厳密に正の確率密度とする。位置についての Fisher情報を、値が $+\infty$ の場合も許して

$$
I(\rho)=\int_{\mathbb R^d}\rho|\nabla\log\rho|^2dx
=\int_{\mathbb R^d}\frac{|\nabla\rho|^2}{\rho}dx
$$

> と定義する。等号は $\nabla\log\rho=\nabla\rho/\rho$ による。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr21-fisher -->
**定義の確認**。$\rho$ が $d$ 次元の平均 $m$、共分散 $qI_d$ のGaussian（$q>0$、$I_d$ は $d\times d$ 単位行列）なら、$\nabla\log\rho=-(x-m)/q$ です。共分散行列の対角成分は各座標の分散なので、$1\le i\le d$ について $E(X_i-m_i)^2=q$ です。従って

$$
\int\rho(x)dx=1,\qquad
E|X-m|^2=\sum_{i=1}^dE(X_i-m_i)^2=dq.
$$

これを定義に代入すると

$$
I(\rho)=\frac1{q^2}\int|x-m|^2\rho(x)dx
=\frac d q<\infty.
$$

被積分関数は非負で、各項の可積分性も二次モーメントから確認できました。
<!-- definition-example-end -->

<a id="thm-otr21-dissipation"></a>

<!-- formal-statement-start -->
> **定理（自由エネルギーの散逸等式）**
> $[0,T]$ 上で滑らかな正の確率密度 $\rho_t$ が[本章のPDE](#thm-otr21-gradient-pde)を満たし、$U_t=a(1+\log\rho_t)+V+W*\rho_t$ とする。各時刻で $\mathcal F(\rho_t)$ と $\int\rho_t|\nabla U_t|^2dx$ が有限とする。$\rho_t\log\rho_t$、$V\rho_t$、$W(x-y)\rho_t(x)\rho_t(y)$ の各時間微分について、任意のコンパクトな時間区間上で積分可能な優関数が存在し、微分と積分を交換できるとする。さらに

$$
\lim_{R\to\infty}\int_{\partial B_R}
U_t\rho_t\nabla U_t\cdot n\,dS=0
$$

> かつ[発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)の適用に必要な可積分性が成り立つとする。このとき

$$
\boxed{\frac d{dt}\mathcal F(\rho_t)
=-\int_{\mathbb R^d}\rho_t|\nabla U_t|^2dx\le0.}
$$

> 特に $\mathcal F=a\mathcal H$（$V=W=0$）の滑らかな熱流なら $d\mathcal H/dt=-aI(\rho_t)$ である。有界な滑らか領域 $\Omega$ では、同じ結論の境界項を消すため $\rho\nabla U\cdot n=0$（no-flux）を課す。
<!-- formal-statement-end -->

### 証明の見取り図

第一変分はエネルギーの時間微分を $\int U_t\partial_t\rho_t$ と表します。[本章のPDE](#thm-otr21-gradient-pde)により $\partial_t\rho=\nabla\cdot(\rho\nabla U)$ ですから、部分積分すると勾配の二乗に負号が付きます。境界からのエネルギー流出が残る場合、単調性をこの式だけから判断できません。

<!-- proof-start -->
### 証明

仮定した微分交換から

$$
\frac d{dt}\mathcal F(\rho_t)
=\int U_t\partial_t\rho_tdx
=\int U_t\nabla\cdot(\rho_t\nabla U_t)dx.
$$

半径 $R$ の球 $B_R$ 上の積の微分

$$
\nabla\cdot(U_t\rho_t\nabla U_t)
=U_t\nabla\cdot(\rho_t\nabla U_t)
+\rho_t|\nabla U_t|^2
$$

を積分し、[発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)を半径 $R$ の球 $B_R$ に適用すると

$$
\int_{B_R}U_t\nabla\cdot(\rho_t\nabla U_t)dx
=\int_{\partial B_R}U_t\rho_t\nabla U_t\cdot n\,dS
-\int_{B_R}\rho_t|\nabla U_t|^2dx.
$$

$R\to\infty$ で境界項がゼロ、右辺の二乗項は可積分です。左辺の全空間積分がエネルギーの微分に一致することも、仮定した積分交換から検算できます。エントロピーと位置エネルギーの微分はそれぞれ次の積分です。

$$
\frac d{dt}\mathcal H=\int(1+\log\rho)\partial_t\rho\,dx,
\qquad \frac d{dt}\mathcal V=\int V\partial_t\rho\,dx.
$$

相互作用では二重積分の二つの微分項を $x,y$ の交換・偶性で一致させると

$$
\frac d{dt}\mathcal W=\int(W*\rho)\partial_t\rho\,dx.
$$

従って合計が $\int U\partial_t\rho$ になります。純粋な熱流なら $U=a(1+\log\rho)$ なので、左辺は $a\,d\mathcal H/dt$、右辺は $-a^2I$ です。$a>0$ で割り、$d\mathcal H/dt=-aI$ となります。$\square$
<!-- proof-end -->

熱流のGaussian例では $\mathcal H(\rho_t)=-\frac12\log(2\pi e q(t))$ ですから、$q'=2$ を代入して

$$
\frac d{dt}\mathcal H(\rho_t)
=-\frac{q'}{2q}=-\frac1q=-I(\rho_t).
$$

**係数に注意**。$\mathcal F=a\mathcal H$ のエネルギー散逸は $d\mathcal F/dt=-a^2I$ であり、$d\mathcal H/dt=-aI$ です。両者を混同すると $a$ を一個落とします。

### 境界条件は式の一部

有界領域で同じ計算をすると、[OTR17のno-flux条件](../OTR17/index.md#def-otr17-no-flux)により境界積分を消せます。熱方程式なら流束は $j=-a\nabla\rho$、従って $j\cdot n=0$ は $\partial_n\rho=0$ です。これを欠くと、密度の全質量すら保たないことがあります。

例えば区間 $(0,1)$ 上の次の関数を取ります。

$$
\rho_t(x)=\frac\pi2e^{-\pi^2t}\sin(\pi x).
$$

これは内部で $\partial_t\rho=\partial_{xx}\rho$ を満たし初期質量は $1$ ですが、全質量は

$$
\int_0^1\rho_t(x)dx=e^{-\pi^2t}
$$

へ減少します。両端の法線流束がゼロではないためです。

## 5. Fokker–Planck方程式と平衡密度

外場を加えた $\mathcal F=\mathcal H+\mathcal V$ では

$$
\partial_t\rho=\Delta\rho+\nabla\cdot(\rho\nabla V),
\qquad U_\rho=1+\log\rho+V.
$$

外場によって増えるエネルギーと拡散で減るエントロピーが釣り合う密度を探します。$\nabla U=0$ なら $\log\rho+V$ は定数ですから、$\rho$ は $e^{-V}$ に比例するはずです。ただし $e^{-V}$ の積分が無限大なら確率密度として正規化できません。正規化できるときの密度を定義します。

<a id="def-otr21-gibbs-density"></a>

<!-- formal-statement-start -->
> **定義（Gibbs密度）**
> $V:\mathbb R^d\to\mathbb R$ を連続関数とし、**正規化定数** $Z=\int_{\mathbb R^d}e^{-V(x)}dx$ が $0<Z<\infty$ を満たすとする。このとき

$$
\pi(x)=\frac{e^{-V(x)}}Z
$$

> を外場 $V$ に対応する Gibbs密度と呼ぶ。$\pi$ は正で $\int\pi dx=1$ を満たす。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr21-gibbs-density -->
**定義の確認**。$d=1$、$V(x)=x^2/2$ ならGaussian積分から $Z=\sqrt{2\pi}\in(0,\infty)$ です。$\pi(x)=(2\pi)^{-1/2}e^{-x^2/2}>0$、かつ $\int\pi dx=1$ なので定義の全条件を満たします。さらに $\int x^2\pi dx=1$ で有限二次モーメントを持ちます。
<!-- definition-example-end -->

<a id="prop-otr21-gibbs"></a>

<!-- formal-statement-start -->
> **命題（Gibbs密度と相対エントロピー）**
> $V\in C^2(\mathbb R^d)$ とし、$0<Z=\int e^{-V(x)}dx<\infty$、$\pi(x)=Z^{-1}e^{-V(x)}$ が有限二次モーメントを持つとする。$\rho$ が確率密度で $\mathcal H(\rho)$ と $\int V\rho$ が有限なら、$\rho=0$ の点では $\rho\log(\rho/\pi)=0$ と定めて

$$
\mathcal H(\rho)+\mathcal V(\rho)+\log Z
=\int\rho\log\frac\rho\pi\,dx\ge0.
$$

> 等号は $\rho=\pi$ がほとんど至る所で成り立つときに限る。さらに $\pi$ は $\Delta\pi+\nabla\cdot(\pi\nabla V)=0$ を満たす滑らかな定常密度である。
<!-- formal-statement-end -->

### 証明の見取り図

$\log\pi=-V-\log Z$ を展開すると、自由エネルギー差が二つの確率密度の対数比の積分になります。非負性には $s\log s\ge s-1$ を使います。定常性は $\nabla\pi=-\pi\nabla V$ から直接確かめます。

<!-- proof-start -->
### 証明

$\rho>0$ の点で $\log(\rho/\pi)=\log\rho+V+\log Z$ を $\rho$ 倍して積分すると、$\rho=0$ の点は規約により寄与しないので、$\int\rho=1$ から最初の等式を得ます。

非負性は $s=\rho/\pi$ と置き、実関数 $f(s)=s\log s-s+1$（$s>0$）から確かめます。導関数と二階導関数は

$$
f'(s)=\log s,\qquad f''(s)=\frac1s>0.
$$

$s=1$ が唯一の最小点で、$f(1)=0$ です。$s=0$ でも連続延長により $f(0)=1$ となるため、すべての $s\ge0$ で $f(s)\ge0$ です。よって

$$
\int\rho\log\frac\rho\pi dx
=\int\pi\left[s\log s-s+1\right]dx
+\int(\rho-\pi)dx\ge0.
$$

$\pi>0$ なので等号のときは $s=1$ がほとんど至る所成立します。最後に $\nabla\pi=-\pi\nabla V$ を微分し、$\Delta\pi+\nabla\cdot(\pi\nabla V)=\nabla\cdot(\nabla\pi+\pi\nabla V)=0$ です。$\square$
<!-- proof-end -->

**具体例：二次外場。** $d=1$、$V(x)=x^2/2$ なら $Z=\sqrt{2\pi}$、$\pi=N(0,1)$ の密度です。ここで $N(m,q)$ は平均 $m$、**分散** $q>0$ のGaussianを表します。

時刻 $t\ge0$ における平均 $m(t)$、分散 $q(t)$ を動かし、プライムは時間についての通常の導関数 $m'=dm/dt$、$q'=dq/dt$ を表すことにします。一方、密度 $\rho_t(x)$ の $\partial_t$ は位置 $x$ を固定した偏微分です。$y=x-m(t)$ とおけば $\partial_t y=-m'$ なので、連鎖律から

$$
\frac{\partial_t\rho}{\rho}
=-\frac{q'}{2q}+\frac{ym'}q+\frac{y^2q'}{2q^2}.
$$

一方、時刻を固定した空間微分については

$$
\frac{\partial_{xx}\rho}{\rho}=-\frac1q+\frac{y^2}{q^2},
\qquad \frac{\partial_x(x\rho)}{\rho}=1-\frac{(y+m)y}{q}.
$$

Fokker–Planck方程式の $y$ と $y^2$ の係数を照合すると

$$
m'=-m,\qquad q'=2-2q,
\qquad m(t)=m_0e^{-t},\quad q(t)=1+(q_0-1)e^{-2t}.
$$

初期値は $m(0)=m_0\in\mathbb R$、$q(0)=q_0>0$ としました。$t\ge0$ では $q(t)=e^{-2t}q_0+(1-e^{-2t})>0$ なので計算の除算も正当です。平均は原点へ引かれ、分散は $1$ へ向かいます。このときの自由エネルギー差は

$$
\mathcal F(\rho_t)-\mathcal F(\pi)
=\frac12\left[m(t)^2+q(t)-1-\log q(t)\right].
$$

$q>0$ では $q-1-\log q\ge0$ なので非負です。さらに時間微分すると

$$
\frac d{dt}(\mathcal F(\rho_t)-\mathcal F(\pi))
=-m(t)^2-\frac{(q(t)-1)^2}{q(t)}.
$$

一方 $\partial_xU=m+(1-1/q)(x-m)$ より $\int\rho|\partial_xU|^2=m^2+(q-1)^2/q$ です。[散逸等式](#thm-otr21-dissipation)が数値係数まで一致しました。

## 6. 相互作用では重心が効く

相互作用だけで $W(z)=\kappa z^2/2$（$d=1,\ \kappa>0$）とすると、[第一変分の直接計算](#prop-otr21-first-variations)から $v=-\kappa(x-m)$ です。質量 $1$、無限遠の流束が消える滑らかな解に対して

$$
\partial_t\rho=\kappa\partial_x\bigl((x-m)\rho\bigr),
\qquad m(t)=\int x\rho_t(x)dx.
$$

部分積分により $m'=-\kappa\int(x-m)\rho dx=0$ で重心は保存されます。分散 $S=\int(x-m)^2\rho dx$ を微分すると

$$
S'=-2\kappa\int(x-m)^2\rho dx=-2\kappa S.
$$

従って $S(t)=S(0)e^{-2\kappa t}$ です。[相互作用エネルギーの定義](../OTR16/index.md#def-otr16-interaction-energy)では独立な $X,Y$ に対して $E(X-Y)^2=2S$ なので $\mathcal W=\kappa S/2$、その微分は $-\kappa^2S$。同時に $\int\rho|v|^2dx=\kappa^2S$ です。熱による広がりとは逆に、相互作用は分布を重心へ縮めます。

## 7. 演習：第一変分から散逸まで再構成する

### OTR21-A01 エントロピーの第一変分
- Level: A

$d=1$、滑らかな正の確率密度 $\rho$ と $\eta\in C_c^\infty(\mathbb R)$、$\int\eta dx=0$ を取る。$\mathcal H(\rho)=\int\rho\log\rho dx$ が有限とする。$\rho+\varepsilon\eta$ の非負性と質量が保たれる小さい $\varepsilon$ を説明し、第一変分を求めよ。

<!-- solution-start -->
**詳細解答**。まず $\eta=0$ なら摂動はゼロで、任意の $\varepsilon$ で成立します。$\eta\ne0$ なら $K=\operatorname{supp}\eta$ は空でないコンパクト集合なので、$c=\min_K\rho>0$、$M=\max_K|\eta|>0$ です。$|\varepsilon|<c/(2M)$ とすれば $K$ 上で $\rho+\varepsilon\eta\ge c/2$、$K$ の外では $\eta=0$ です。質量は $\int(\rho+\varepsilon\eta)=1+\varepsilon\cdot0=1$ です。

実関数 $h(r)=r\log r$ の微分は $h'(r)=1+\log r$ なので、変化する積分領域 $K$ の上で微分すると

$$
\left.\frac d{d\varepsilon}\mathcal H(\rho+\varepsilon\eta)\right|_0
=\int_K(1+\log\rho)\eta dx.
$$

従って $\delta\mathcal H/\delta\rho=1+\log\rho$ です。$1$ は $\int\eta=0$ のため省いても同じ方向微分になります。
<!-- solution-end -->

### OTR21-A02 拡散係数はどこに現れるか
- Level: A

$a>0$ とし $V=W=0$、$\mathcal F=a\mathcal H$ とする。滑らかな正密度について下降速度とPDEを導け。さらに境界項が消え $I(\rho_t)<\infty$ である解では $d\mathcal F/dt$ と $d\mathcal H/dt$ を区別して求めよ。

<!-- solution-start -->
**詳細解答**。[第一変分](#prop-otr21-first-variations)を $a$ 倍すると $U=a(1+\log\rho)$ です。速度は $v=-a\nabla\rho/\rho$ なので $\rho v=-a\nabla\rho$。保存則を用いて

$$
\partial_t\rho=-\nabla\cdot(\rho v)=a\Delta\rho.
$$

[散逸等式](#thm-otr21-dissipation)に $\nabla U=a\nabla\log\rho$ を代入すると

$$
\frac d{dt}\mathcal F=-a^2\int\rho|\nabla\log\rho|^2dx=-a^2I(\rho_t).
$$

$\mathcal F=a\mathcal H$ なので $a>0$ で割れば $d\mathcal H/dt=-aI(\rho_t)$ です。
<!-- solution-end -->

### OTR21-A03 二次外場の速度
- Level: A

$d=1$、$V(x)=\lambda x^2/2$（$\lambda>0$）、$\mathcal F=\mathcal V$ とする。外場だけの下降速度 $v$ と連続の方程式を書け。$\int|x|\rho_tdx<\infty$ で、$|x|\to\infty$ のとき $x^2\rho_t(x)\to0$ となり、微分と積分を交換できるとき、平均 $m(t)=\int x\rho_tdx$ が満たす微分方程式を求めよ。

<!-- solution-start -->
**詳細解答**。[位置エネルギーの第一変分](#prop-otr21-first-variations)は $U=V$ なので $v=-\partial_xV=-\lambda x$。従って

$$
\partial_t\rho=-\partial_x(\rho v)=\lambda\partial_x(x\rho).
$$

両端の境界項 $[x^2\rho]_{-\infty}^{\infty}$ が消えるとして、$m'=\lambda\int x\partial_x(x\rho)dx$ を部分積分すると

$$
m'=\lambda[x^2\rho]_{-\infty}^{\infty}-\lambda\int x\rho dx=-\lambda m.
$$

従って $m(t)=m(0)e^{-\lambda t}$ です。拡散がない輸送でも、平均は外場へ向かいます。
<!-- solution-end -->

### OTR21-A04 相互作用の係数
- Level: A

$d=1$、$W(z)=\kappa z^2/2$（$\kappa>0$）、$\rho$ は二次モーメント有限の確率密度とする。$m=\int x\rho dx$、$S=\int(x-m)^2\rho dx$ を用いて $\mathcal W(\rho)$、$W*\rho$、その空間微分を求めよ。

<!-- solution-start -->
**詳細解答**。独立な $X,Y$ の密度を $\rho$ とすると

$$
E(X-Y)^2=EX^2+EY^2-2EX\,EY
=2(EX^2-m^2)=2S.
$$

[相互作用エネルギー](../OTR16/index.md#def-otr16-interaction-energy)の係数 $1/2$ も含め

$$
\mathcal W(\rho)=\frac12\frac\kappa2E(X-Y)^2
=\frac\kappa2S.
$$

一方、$M_2=\int y^2\rho(y)dy=m^2+S$ とすれば

$$
(W*\rho)(x)=\frac\kappa2(x^2-2mx+M_2),
\qquad \partial_x(W*\rho)=\kappa(x-m).
$$

$1/2$ は第一変分を取る際に二つの一次交差項があるため消えます。
<!-- solution-end -->

### OTR21-A05 GaussianのFisher情報
- Level: A

$d\ge1$、$q>0$、$m\in\mathbb R^d$ とし、密度 $\rho(x)=(2\pi q)^{-d/2}\exp(-|x-m|^2/(2q))$ に対して、[Fisher情報](#def-otr21-fisher)を定義から計算せよ。

<!-- solution-start -->
**詳細解答**。対数を取って $\log\rho=-\frac d2\log(2\pi q)-|x-m|^2/(2q)$。各座標で $\partial_{x_i}\log\rho=-(x_i-m_i)/q$ なので

$$
I(\rho)=\int\rho\sum_{i=1}^d\frac{(x_i-m_i)^2}{q^2}dx
=\frac1{q^2}\sum_{i=1}^d q=\frac d q.
$$

全質量が $1$ で、各座標の分散が $q<\infty$ だから、この積分は有限です。
<!-- solution-end -->

### OTR21-B01 Gaussianの熱方程式と散逸
- Level: B

$t\ge0$、$q_0>0$、$m\in\mathbb R$ とし、$q(t)=q_0+2at$、$a>0$ とする。$\rho_t(x)=(2\pi q(t))^{-1/2}\exp(-(x-m)^2/(2q(t)))$ について、$\partial_t\rho=a\partial_{xx}\rho$ を検算し、$d\mathcal H/dt=-aI$ を独立に求めよ。

<!-- solution-start -->
**詳細解答**。$q'=2a$ として時間微分を先に計算すると

$$
\partial_t\log\rho=-\frac{q'}{2q}+\frac{q'(x-m)^2}{2q^2}
=-\frac a q+\frac{a(x-m)^2}{q^2}.
$$

空間微分は $\partial_x\rho=-\frac{x-m}{q}\rho$、従って積の微分で

$$
\partial_{xx}\rho
=\left(-\frac1q+\frac{(x-m)^2}{q^2}\right)\rho.
$$

$\partial_t\rho=\rho\partial_t\log\rho$ なので両辺が一致します。$E(X-m)^2=q$ から

$$
\mathcal H(\rho_t)=-\frac12\log(2\pi e q),
\qquad I(\rho_t)=\frac1q.
$$

これをそれぞれ微分・代入すると $d\mathcal H/dt=-q'/(2q)=-a/q=-aI$。PDEの検算とは別に散逸が確かめられました。
<!-- solution-end -->

### OTR21-B02 二次外場のGaussian解
- Level: B

$d=1$、$V(x)=x^2/2$、$\mathcal F=\mathcal H+\mathcal V$ とする。$\rho_t=N(m(t),q(t))$ の密度が $\partial_t\rho=\partial_{xx}\rho+\partial_x(x\rho)$ を満たすための $m,q$ の方程式を導け。$m_0\in\mathbb R,q_0>0$ とし、相対自由エネルギーの時間微分を散逸式と比較せよ。

<!-- solution-start -->
**詳細解答**。上で定めた $N(m,q)$ の密度について $y=x-m(t)$ と置きます。$\partial_t$ では $x$ を固定するので

$$
\partial_t y=-m',\qquad \partial_t(y^2)=-2ym'.
$$

$q'=dq/dt$ とともに対数密度の連鎖律を使うと

$$
\frac{\partial_t\rho}{\rho}=-\frac{q'}{2q}+\frac{ym'}q+\frac{y^2q'}{2q^2}.
$$

$\partial_x\rho=-y\rho/q$、$\partial_{xx}\rho=(-1/q+y^2/q^2)\rho$、$\partial_x(x\rho)=\rho-xy\rho/q$ です。$x=y+m$ を代入して、定数・$y$・$y^2$ の係数を比較すると

$$
\frac{q'}{2q^2}=\frac1{q^2}-\frac1q,
\qquad\frac{m'}q=-\frac m q.
$$

ゆえに $q'=2-2q$、$m'=-m$。初期条件から $q=1+(q_0-1)e^{-2t}>0$、$m=m_0e^{-t}$ です。[Gibbs密度の定義](#def-otr21-gibbs-density)から平衡密度は標準Gaussianで、[Gibbs密度と相対エントロピー](#prop-otr21-gibbs)より自由エネルギー差は $D=\frac12(m^2+q-1-\log q)$ です。その微分は

$$
D'=mm'+\frac12\left(1-\frac1q\right)q'
=-m^2-\frac{(q-1)^2}{q}.
$$

速度の負号に対応する $\partial_xU=x-y/q=m+(1-1/q)y$ なので $\int\rho|\partial_xU|^2=m^2+(1-1/q)^2q$。すなわち $D'=-\int\rho|\partial_xU|^2$ です。
<!-- solution-end -->

### OTR21-B03 重心を動かさない相互作用
- Level: B

$d=1$、$W(z)=\kappa z^2/2$、$\kappa>0$ とし、相互作用のみの輸送方程式 $\partial_t\rho=\kappa\partial_x((x-m(t))\rho)$ の滑らかな確率密度解で境界項が消えるとする。$m(t)$ と分散 $S(t)$ の時間変化、$d\mathcal W/dt$ を導け。

<!-- solution-start -->
**詳細解答**。確率質量を保つことは右辺の積分が境界流束 $[\kappa(x-m)\rho]_{-\infty}^{\infty}=0$ になることから従います。平均は

$$
m'=\kappa\int x\partial_x((x-m)\rho)dx
=-\kappa\int(x-m)\rho dx=0.
$$

従って $m$ を固定して分散を微分できます。

$$
S'=\kappa\int(x-m)^2\partial_x((x-m)\rho)dx
=-2\kappa\int(x-m)^2\rho dx=-2\kappa S.
$$

解は $S=S_0e^{-2\kappa t}$ です。[相互作用の係数](#prop-otr21-first-variations)を使えば $\mathcal W=\kappa S/2$ なので

$$
\frac d{dt}\mathcal W=\frac\kappa2(-2\kappa S)=-\kappa^2S
=-\int\rho|\kappa(x-m)|^2dx.
$$

これは[散逸計算](#thm-otr21-dissipation)と同じ形です（この問題では拡散係数をゼロとした場合を直接検算しています）。
<!-- solution-end -->

### OTR21-B04 偶性を失うと何が壊れるか
- Level: B

$d=1$、$W(z)=z$ とし、有限一次モーメントを持つ確率密度 $\rho$ の相互作用エネルギー $\mathcal W=\frac12\iint W(x-y)\rho(x)\rho(y)dxdy$ を考える。$\mathcal W$、正しい第一変分と、誤って $W*\rho$ を第一変分とした場合の矛盾を示せ。

<!-- solution-start -->
**詳細解答**。$m=\int x\rho dx$ とすると絶対可積分性は $\iint|x-y|\rho(x)\rho(y)\le2\int|x|\rho(x)dx<\infty$ から従います。よって

$$
\mathcal W=\frac12\left(\iint x\rho(x)\rho(y)dxdy-\iint y\rho(x)\rho(y)dxdy\right)
=\frac12(m-m)=0.
$$

任意の質量保存変分でも常に $0$ なので真の第一変分は $0$ を選べます。実際 $W_{\rm sym}(z)=(z-z)/2=0$ です。しかし $W*\rho(x)=\int(x-y)\rho(y)dy=x-m$ とすると、空間勾配が $1$ になって下降速度 $v=-1$ を予測します。定数汎関数なのに非ゼロの力を作るため矛盾です。二つの因子を変分する際の対称化が不可欠です。
<!-- solution-end -->

### OTR21-C01 拡散・外場・相互作用を統合する
- Level: C

$d=1$、$a=1$、$V(x)=\lambda x^2/2$、$W(z)=\kappa z^2/2$（$\lambda>0,\ \kappa\ge0$）とする。初期密度は平均 $m_0\in\mathbb R$、分散 $q_0>0$ のGaussianとする。

1. 自由エネルギーの下降PDEを求め、Gaussian型の解が満たす $m,q$ の微分方程式を導け。
2. 自由エネルギーを $m,q$ で表し、時間微分が $-\int\rho|\partial_xU|^2dx$ に一致することを示せ。
3. 定常なGaussianの平均と分散を求めよ。

<!-- solution-start -->
**詳細解答**。$W*\rho$ の微分は $\kappa(x-m)$、$V'(x)=\lambda x$、$\partial_xU=\partial_x\log\rho+\lambda x+\kappa(x-m)$ です。[下降PDE](#thm-otr21-gradient-pde)は

$$
\partial_t\rho=\partial_{xx}\rho
+\partial_x\left(\{\lambda x+\kappa(x-m)\}\rho\right).
$$

$y=x-m(t)$ とし $b=\lambda+\kappa$ と置けば、括弧内は $by+\lambda m$ です。$\partial_t$ では $x$ を固定し、$\partial_x$ では $t$ を固定するので

$$
\partial_t y=-m',\qquad \partial_t(y^2)=-2ym',\qquad \partial_x y=1.
$$

これらをGaussianの対数密度へ適用すると

$$
\frac{\partial_t\rho}{\rho}=-\frac{q'}{2q}+\frac{ym'}q+\frac{y^2q'}{2q^2},
$$

$$
\frac{\partial_{xx}\rho+\partial_x((by+\lambda m)\rho)}\rho
=-\frac1q+\frac{y^2}{q^2}+b-\frac{by^2+\lambda my}{q}.
$$

$y^2,y$ の係数から $q'=2-2bq$、$m'=-\lambda m$。定数項も $-q'/(2q)=-1/q+b$ で一致します。従って

$$
m(t)=m_0e^{-\lambda t},
\qquad q(t)=\frac1b+\left(q_0-\frac1b\right)e^{-2bt}>0.
$$

エントロピー・位置・相互作用を個別に計算し、$E[X^2]=m^2+q$、$E(X-Y)^2=2q$ を用います。

$$
\mathcal F=-\frac12\log(2\pi e q)
+\frac\lambda2(m^2+q)+\frac\kappa2 q.
$$

これを $m,q$ で微分して $m',q'$ を代入すると

$$
\begin{aligned}
\mathcal F'
&=\lambda m(-\lambda m)+\frac12\left(b-\frac1q\right)(2-2bq)\\
&=-\lambda^2m^2-\frac{(bq-1)^2}{q}.
\end{aligned}
$$

他方、$\partial_x\log\rho=-y/q$ より $\partial_xU=\lambda m+(b-1/q)y$。Gaussianの $E[Y]=0,E[Y^2]=q$ を適用すると

$$
\int\rho|\partial_xU|^2dx
=\lambda^2m^2+2\lambda m(b-1/q)E[Y]+(b-1/q)^2E[Y^2]
=\lambda^2m^2+\frac{(bq-1)^2}{q}.
$$

よって散逸等式が一致します。定常Gaussianは $m'=q'=0$、$\lambda>0,b>0$ だから $m_*=0,q_*=1/b=1/(\lambda+\kappa)$ です。拡散は分散を増やし、二つのポテンシャルは分散を減らします。
<!-- solution-end -->

### OTR21-C02 境界を無視した熱方程式の落とし穴
- Level: C

区間 $\Omega=(0,1)$ と $t\ge0$ に対し $\rho_t(x)=(\pi/2)e^{-\pi^2t}\sin(\pi x)$ を考える。内部で熱方程式 $\partial_t\rho=\partial_{xx}\rho$ を満たし初期質量は $1$ だが、確率密度の時間発展とならないことを示せ。境界の流束 $j=-\partial_x\rho$ と質量収支を検算し、no-fluxなら何が変わるか説明せよ。

<!-- solution-start -->
**詳細解答**。$\sin(\pi x)>0$ は区間内部で成立し、$\rho$ は滑らかです。時間と空間で二回微分して

$$
\partial_t\rho=-\frac{\pi^3}{2}e^{-\pi^2t}\sin(\pi x),
\quad \partial_{xx}\rho=-\frac{\pi^3}{2}e^{-\pi^2t}\sin(\pi x).
$$

一方、$\int_0^1\sin(\pi x)dx=[-\cos(\pi x)/\pi]_0^1=2/\pi$ なので

$$
M(t)=\int_0^1\rho_tdx=e^{-\pi^2t},\qquad M'(t)=-\pi^2e^{-\pi^2t}.
$$

流束は $j=-(\pi^2/2)e^{-\pi^2t}\cos(\pi x)$ です。左端の外向き法線は $n(0)=-1$、右端は $n(1)=1$。よって

$$
j(0)n(0)=\frac{\pi^2}{2}e^{-\pi^2t},
\qquad j(1)n(1)=\frac{\pi^2}{2}e^{-\pi^2t}.
$$

どちらからも外へ流出し、質量収支の式は

$$
M'(t)=-[j(1)-j(0)]=-\pi^2e^{-\pi^2t}
$$

で、直接求めた導関数と一致します。初期時刻以外は確率質量が $1$ でなく、$\mathcal P_2$ 上の確率測度曲線ではありません。[no-flux境界条件](../OTR17/index.md#def-otr17-no-flux) $j\cdot n=0$ なら、積分した保存則の右辺がゼロとなり $M(t)=M(0)=1$ を保てます。内部PDEだけから確率保存を推論してはいけません。
<!-- solution-end -->

## 8. 今回の結論と次の問い

密度の対数勾配は拡散、外場の勾配は引力・斥力、偶相互作用の畳み込み勾配は粒子間の力を生みます。いずれも、第一変分から負の速度を作り、連続の方程式に代入して導けます。滑らかな解で境界項が消えればエネルギーは負の勾配ノルム二乗の速さで減少します。ただし、形式的に式が出ることと、一般の初期測度から解が存在することは別問題です。

次のOTR22では、このPDEを直接解くのではなく、各時間刻みで **自由エネルギーとWasserstein距離を同時に最小化する**方法を構成します。その最小化解の存在と離散的な散逸を、ここで得た滑らかな計算とは区別して証明します。

