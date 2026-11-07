# MFL17 境界・adaptive近傍・density shift

<!-- definition-example-audit: strict -->

## 1. 円周で消えた一次の項は、区間の端で復活する

[MFL13のGaussian核平均](../MFL13/index.md#def-mfl13-kernel)と[MFL15の密度補正generator](../MFL15/index.md#thm-mfl15-generator)は、境界の**ない**多様体で導かれた。円周なら左右の近傍が対称なので、Gaussian重みの奇数次モーメントは0になる。ところが区間 $[0,1]$ の左端 $x=0$ では、$y<0$ の観測点が存在しない。

例えば、密度が一様で $f(y)=y$ のとき、左端から周囲を平均すれば必ず正の値へ動く。$f''=0$ でも移動量は0にならない。境界で何が起こるかを計算しないまま、[MFL16の熱半群との対応](../MFL16/index.md#prop-mfl16-time-limit)を適用することはできない。

本章では有限標本より先に、密度 $p$ による**連続の核平均**を調べる。核幅 $\varepsilon$ の長さ尺度は $\sqrt{\varepsilon}$ である。ここで取り上げる問いは、境界による片側偏り、点ごとの帯域幅、観測密度の変化という三つの異なる効果を、どの係数で区別できるかである。

以下、区間は $I=[0,1]$、関数の導関数は区間端で片側微分として連続延長したものとする。$p\in C^3(I)$ は $\int_0^1p(y)\,dy=1$、$p(y)\ge p_{\min}>0$ を満たし、$f\in C^3(I)$ は実数値とする。核は無次元の指数を用い、帯域幅 $\varepsilon>0$ は長さの二乗で測る。分子・分母に共通のGaussian正規化定数は約分できる。

## 2. 区間に制限した行平均と、切断されたモーメント

### 2.1 行確率を作る

観測点 $x$ に対して $y\in I$ の値をGaussianで重み付けし、行和で割る。$y$ の積分区間を区間の外へ勝手に延長しないことが重要である。

<a id="def-mfl17-row"></a>

<!-- formal-statement-start -->
> **定義（区間上の行正規化Gaussian核）**
> $I=[0,1]$、$p\in C(I)$、$p>0$、$\int_Ip=1$、$\varepsilon>0$ とする。$x,y\in I$ に対し、核と正の行和を

$$
K_\varepsilon(x,y)=\exp\!\left(-\frac{(x-y)^2}{4\varepsilon}\right),
\qquad
Z_\varepsilon^p(x)=\int_0^1K_\varepsilon(x,y)p(y)\,dy>0
$$

> とおく。連続関数 $f$ の行正規化平均を

$$
P_\varepsilon^p f(x)=
\frac{\int_0^1K_\varepsilon(x,y)f(y)p(y)\,dy}
{Z_\varepsilon^p(x)}
$$

> と定める。
<!-- formal-statement-end -->

この分母は正の重みの総和なので、$P_\varepsilon^p1=1$ であり、$f\ge0$ なら $P_\varepsilon^pf\ge0$。有限の[可逆Markov行列](../MFL16/index.md#thm-mfl16-spectrum)と同じく「平均する」構造だが、これは連続積分による作用素であり、有限点群の固有対を自動的に与えるものではない。

<!-- definition-example-start: def-mfl17-row -->
**直接例（定数と左端の一次関数）。** $p(y)=1$ は正で積分1、$f=1$ では分子と分母が一致する。$x=0$、$f(y)=y$ では

$$
P_\varepsilon^p f(0)=
\frac{\int_0^1 e^{-y^2/(4\varepsilon)}y\,dy}
{\int_0^1 e^{-y^2/(4\varepsilon)}\,dy}>0=f(0).
$$

分子は正の被積分関数の積分、分母も正だから、定義の非負性と正規化の両方を直接確認した。後でこの比の正確な一次係数を求める。
<!-- definition-example-end -->

### 2.2 端までの距離を無次元化する

$y=x+\sqrt{\varepsilon}\,u$ と置くと、$dy=\sqrt{\varepsilon}\,du$ で、積分端点は $u=-x/\sqrt{\varepsilon}$、$u=(1-x)/\sqrt{\varepsilon}$ に移る。これを正の距離を用いた $A,B$ と書けば、核の重みは $e^{-u^2/4}$ である。重み付き平均の展開には、零次・一次・二次の積分が必要になる。

<a id="def-mfl17-moments"></a>

<!-- formal-statement-start -->
> **定義（切断Gaussianモーメント）**
> $A,B\ge0$、$A+B>0$ とし、$j=0,1,2,3$ に対して

$$
m_j(A,B)=\int_{-A}^{B}u^j e^{-u^2/4}\,du,
\qquad
\mu_j(A,B)=\frac{m_j(A,B)}{m_0(A,B)}.
$$

> さらに $v(A,B)=\mu_2(A,B)-\mu_1(A,B)^2$ とする。$m_0>0$ であり、$v>0$ は切断重みで正規化した $u$ の分散である。
<!-- formal-statement-end -->

計算の意味は単純だ。$\mu_1$ は近傍の平均的な**向き付き移動**、$\mu_2$ は二階微分に掛かる平均二乗移動である。$v$ は密度の傾きと関数の傾きが相互作用する係数になる。

<!-- definition-example-start: def-mfl17-moments -->
**直接例（左端での半Gaussian）。** $A=0$、$B\to\infty$ なら、[MFL13の全空間Gaussianモーメント](../MFL13/index.md#lem-mfl13-moments)の半分を使い、

$$
m_0(0,\infty)=\sqrt{\pi},\quad
m_1(0,\infty)=\left[-2e^{-u^2/4}\right]_0^\infty=2,
$$

$$
m_2(0,\infty)=2\sqrt{\pi},\quad
\mu_1=\frac2{\sqrt{\pi}},\quad
\mu_2=2,\quad v=2-\frac4\pi>0.
$$

最後の正値性は切断分布が定数でないことからも分かる。$A=B\to\infty$ の対称な内点では $\mu_1=0$、$\mu_2=2$、$v=2$ となる。**境界により奇数次の項が残る**ことが、二つの例の本質的な差である。
<!-- definition-example-end -->

部分積分により、有限の $A,B$ でも

$$
m_1=2(e^{-A^2/4}-e^{-B^2/4}),\qquad
m_2=2m_0-2(Ae^{-A^2/4}+Be^{-B^2/4}).
$$

特に右端では $\mu_1=-2/\sqrt{\pi}$ となり、平均の向きが左端と反転する。

## 3. 境界層の一次・二次biasを導く

$\delta=\sqrt{\varepsilon}$ と書く。$x$ が端点から $O(\delta)$ の範囲でも、モーメントの上下限を $A=x/\delta$、$B=(1-x)/\delta$ としたまま計算すれば、内点だけに成り立つ左右対称性を無理に使わずに済む。

<a id="thm-mfl17-expansion"></a>

<!-- formal-statement-start -->
> **定理（境界層の核平均展開）**
> $p,f\in C^3([0,1])$、$p\ge p_{\min}>0$、$\int_0^1p=1$ とする。[区間上の行正規化Gaussian核](#def-mfl17-row)に対し、$\delta=\sqrt{\varepsilon}$、$A=x/\delta$、$B=(1-x)/\delta$、$\mu_j=\mu_j(A,B)$ とおく。このとき $\delta\downarrow0$ で、全ての $x\in[0,1]$ に一様に

$$
P_\varepsilon^pf(x)-f(x)
=\delta\mu_1 f'(x)
+\delta^2\left[
\frac{\mu_2}{2}f''(x)
+(\mu_2-\mu_1^2)\frac{p'(x)}{p(x)}f'(x)
\right]+O(\delta^3).
$$

> $O(\delta^3)$ の定数は $p_{\min}$、$p,f$ の $C^3$ ノルムに依存してよいが、$x$ には依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

$y=x+\delta u$ で分母と分子を同時にTaylor展開する。一階の比は $p$ の寄与が相殺して $\mu_1f'$ だけになる。二階では $(pf)''$ の交差項から $p'f'$ が現れる一方、分母の一次項との積を差し引くため、係数が $\mu_2$ ではなく $\mu_2-\mu_1^2$ となる。

<!-- proof-start -->
### 証明

$p_0=p(x)$、$p_1=p'(x)$、$p_2=p''(x)$ とし、$h=pf$ とおく。$x+\delta u\in[0,1]$ の範囲で、Taylorの定理を展開点 $x$、評価点 $x+\delta u$、次数2として適用すると

$$
p(x+\delta u)=p_0+\delta up_1+\frac{\delta^2u^2}{2}p_2+R_p,
\qquad |R_p|\le C\delta^3|u|^3.
$$

$h=pf$ にも同じ展開を適用できる。変数変換後の分子・分母から共通の $\delta m_0$ を除くと

$$
N=h+\delta\mu_1h'
+\frac{\delta^2\mu_2}{2}h''+O(\delta^3),\qquad
D=p+\delta\mu_1p'
+\frac{\delta^2\mu_2}{2}p''+O(\delta^3).
$$

ここでは各関数とその導関数を $x$ で評価した。$\int_{\mathbb R}|u|^3e^{-u^2/4}\,du<\infty$ であり、$\delta$ が十分小さければ $A+B=1/\delta$ なので $m_0(A,B)$ は0から一様に離れる。従って剰余は $x$ に一様である。

$D\ge p_{\min}/2$ が小さい $\delta$ で成り立つ。$a=\mu_1p'/p$、$b=\mu_2p''/(2p)$ とすると

$$
\frac1D=\frac1p\{1-\delta a+\delta^2(a^2-b)\}+O(\delta^3).
$$

これに $N$ を掛け、$h'=pf'+p'f$、$h''=pf''+2p'f'+p''f$ を代入する。零次は $f$、一次は

$$
\mu_1\frac{h'}p-\mu_1\frac{p'}pf=\mu_1f'
$$

である。二次の $f$ に比例する項は

$$
\frac{\mu_2p''f}{2p}
-\mu_1^2\frac{(p')^2f}{p^2}
+\left(\mu_1^2\frac{(p')^2}{p^2}-\frac{\mu_2p''}{2p}\right)f=0.
$$

$f'$ に掛かる項は $\mu_2(p'/p)f'-\mu_1^2(p'/p)f'$、$f''$ に掛かる項は $\mu_2f''/2$。まとめて所望の式を得る。$\square$
<!-- proof-end -->

### 3.1 端点と内点で異なる次数

区間端での「外向き法線方向」は左端で負の方向、右端で正の方向である。端点でその方向への一階微分が0という条件を考えると、区間では両端の通常の一階導関数が0という形になる。

<a id="def-mfl17-neumann"></a>

<!-- formal-statement-start -->
> **定義（区間のNeumann境界条件）**
> 閉区間 $[0,1]$ 上の実数値関数 $f\in C^1([0,1])$ が

$$
f'(0)=0,\qquad f'(1)=0
$$

> を満たすとき、$f$ は区間のNeumann境界条件を満たすという。左端では外向き法線微分が $-f'(0)$、右端では $f'(1)$ であり、両者が0であることと同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl17-neumann -->
**直接例（両端で微分が消える関数）。** $f(x)=x^2(1-x)^2$ は $C^1([0,1])$ で、

$$
f'(x)=2x(1-x)^2-2x^2(1-x)=2x(1-x)(1-2x).
$$

したがって $f'(0)=f'(1)=0$ が直接確認でき、両端で外向き法線微分は0である。一方 $g(x)=x$ は $g'(0)=g'(1)=1$ なのでこの条件を満たさない。
<!-- definition-example-end -->

<a id="prop-mfl17-endpoint"></a>

<!-- formal-statement-start -->
> **命題（端点の平方根偏りとNeumann条件）**
> [境界層の展開](#thm-mfl17-expansion)と同じ仮定で、$x=0$ のとき

$$
P_\varepsilon^pf(0)-f(0)
=\frac{2}{\sqrt{\pi}}\sqrt{\varepsilon}\,f'(0)
+\varepsilon\left[
f''(0)+\left(2-\frac4\pi\right)\frac{p'(0)}{p(0)}f'(0)
\right]+O(\varepsilon^{3/2})
$$

> が成り立つ。$x=1$ では平方根項の符号が逆になる。従って $(P_\varepsilon^pf-f)/\varepsilon$ が各端点で有限の極限を持つためには、$f'(0)=f'(1)=0$ が必要である。一方、固定した内点 $0<x<1$ では

$$
\frac{P_\varepsilon^pf(x)-f(x)}{\varepsilon}
\longrightarrow f''(x)+2\frac{p'(x)}{p(x)}f'(x).
$$
<!-- formal-statement-end -->

### 証明の見取り図

端点では先ほどの半Gaussianの係数を代入する。内点では両端までの距離を $\sqrt{\varepsilon}$ で割った値がともに無限大へ向かい、$\mu_1\to0$ が指数的に速い。

<!-- proof-start -->
### 証明

$x=0$ では $A=0$、$B=1/\sqrt{\varepsilon}\to\infty$。[切断モーメントの式](#def-mfl17-moments)から $\mu_1=2/\sqrt{\pi}+O(e^{-c/\varepsilon})$、$\mu_2=2+O(e^{-c/\varepsilon})$ である（$c>0$ は固定）。[展開定理](#thm-mfl17-expansion)に代入して端点式を得る。右端は $u$ を反転して $\mu_1=-2/\sqrt{\pi}+O(e^{-c/\varepsilon})$ とすればよい。

もし $f'(0)\ne0$ なら、左端の商は $2f'(0)/\sqrt{\pi\varepsilon}+O(1)$ となり、有限極限を持たない。右端も同様である。これが必要条件である。

固定した内点 $x$ では $A,B\to\infty$ で、$\mu_1=O(e^{-c_x/\varepsilon})$、$\mu_2=2+O(e^{-c_x/\varepsilon})$。$c_x>0$ は端点距離から取れる。[展開定理](#thm-mfl17-expansion)の剰余を $\varepsilon$ で割ると $O(\sqrt{\varepsilon})$ になり、表示の極限式が従う。$\square$
<!-- proof-end -->

ここで端点の必要条件は[区間のNeumann境界条件](#def-mfl17-neumann)に当たる。ただし、この必要条件を見つけただけで有限核作用素全体がNeumann熱半群へ収束すると証明したわけではない。関数空間・境界層・時間反復・スペクトルの制御は別途必要になる。

**失敗例。** $p=1$、$f(x)=x$ では左端の二階微分が0でも

$$
\frac{P_\varepsilon^pf(0)-f(0)}{\varepsilon}
=\frac{2}{\sqrt{\pi\varepsilon}}+O(e^{-c/\varepsilon}),
$$

と発散する。失われた仮定は端点の法線微分が0という条件であり、証明中の奇数次モーメントが0となる対称性が壊れた。

### 3.2 端点で条件を満たしても境界層全体が一致するとは限らない

<a id="prop-mfl17-layer"></a>

<!-- formal-statement-start -->
> **命題（左端Neumann条件と境界層の非一様性）**
> $p(y)=1$、$f(y)=y^2$、$x_\varepsilon=a\sqrt{\varepsilon}$（固定 $a\ge0$）を区間 $[0,1]$ 上で考える。[行平均](#def-mfl17-row)について

$$
\lim_{\varepsilon\downarrow0}
\frac{P_\varepsilon^pf(x_\varepsilon)-f(x_\varepsilon)}
{\varepsilon}
=2+a\,\frac{2e^{-a^2/4}}{\int_{-a}^{\infty}e^{-u^2/4}\,du}.
$$

> 特に $a=0$ なら2だが、$a>0$ なら2より大きい。$f'(0)=0$ であっても、生成作用素の内点値 $f''=2$ への一様収束はこの例では成立しない。
<!-- formal-statement-end -->

### 証明の見取り図

二次関数ではTaylor展開が厳密である。$\mu_1$ と $\mu_2$ の切断積分を代入し、端点から $\sqrt{\varepsilon}$ だけ動いた効果を残す。

<!-- proof-start -->
### 証明

$\delta=\sqrt{\varepsilon}$、$x=a\delta$ とする。$y=x+\delta u$ を二乗し、$p=1$ なので分母で約分すると

$$
P_\varepsilon^pf(x)-f(x)
=2x\delta\mu_1(a,(1-x)/\delta)
+\delta^2\mu_2(a,(1-x)/\delta).
$$

$a$ は固定で $(1-x)/\delta\to\infty$。半直線上の $m_1=2e^{-a^2/4}$ と、部分積分から得た $m_2=2m_0-2ae^{-a^2/4}$ を使うと、極限は

$$
2a\frac{m_1}{m_0}+\frac{m_2}{m_0}
=2a\frac{m_1}{m_0}+2-a\frac{m_1}{m_0}
=2+a\frac{m_1}{m_0}.
$$

$a>0$ では $m_1,m_0>0$ なので2より大きい。$f'(0)=0$ は満たすが、極限差が残る。$\square$
<!-- proof-end -->

この反例は「端点で有限な極限」と「境界まで一様なgenerator近似」が違うことを示す。[MFL16の有限次元時間極限定理](../MFL16/index.md#prop-mfl16-time-limit)は**固定次元・作用素ノルム**の仮定を含むので、この点ごとの議論から直接適用できない。

## 4. adaptive近傍は何を変えるか

観測点が密な場所と疎な場所で同じ長さ尺度を使うと、平均が見る近傍の意味が揃わない。そこで評価点 $x$ に応じて局所長さ $\delta(x)$ を変える。ただし、次の構成は**行ごとの幅だけ**を変えるもので、二点 $x,y$ を対称に扱う可変幅核とは異なる。

<a id="def-mfl17-adaptive"></a>

<!-- formal-statement-start -->
> **定義（点ごとに固定したadaptive帯域幅）**
> $I=[0,1]$、$p\in C(I)$、$p>0$、$\int_Ip=1$、正の連続関数 $\rho:I\to(0,\infty)$、$\varepsilon>0$ を与える。$\delta_\varepsilon(x)=\sqrt{\varepsilon}\rho(x)$ とし

$$
K_{\varepsilon,\rho}^{\mathrm{row}}(x,y)
=\exp\!\left(-\frac{(x-y)^2}{4\varepsilon\rho(x)^2}\right),
\qquad
P_{\varepsilon,\rho}^pf(x)
=\frac{\int_I K_{\varepsilon,\rho}^{\mathrm{row}}(x,y)f(y)p(y)\,dy}
{\int_I K_{\varepsilon,\rho}^{\mathrm{row}}(x,y)p(y)\,dy}.
$$

> この定義では積分中の $\rho(x)$ は固定値であり、$\rho(y)$ は核に現れない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl17-adaptive -->
**直接例（密度に応じた幅）。** $p_s(x)=1+s(2x-1)$、$|s|<1$ は正で積分1である。$\beta\in\mathbb R$ として $\rho(x)=p_s(x)^{-\beta}$ とすると、$1-|s|\le p_s\le1+|s|$ より $\rho$ は正で上下有界。$K_{\varepsilon,\rho}^{\mathrm{row}}>0$ で分母は正、定数関数の分子と分母は一致する。$s>0,\beta>0$ なら右側ほど密度が大きく、$\rho$ は小さくなる。
<!-- definition-example-end -->

<a id="thm-mfl17-adaptive"></a>

<!-- formal-statement-start -->
> **定理（adaptive行帯域幅の内点generator）**
> $p,f\in C^3([0,1])$、$p\ge p_{\min}>0$、$\int_0^1p=1$、$\rho\in C([0,1])$、$0<\rho_{\min}\le\rho\le\rho_{\max}<\infty$ とする。[adaptive行帯域幅](#def-mfl17-adaptive)について、固定内点 $x\in(0,1)$ では

$$
\lim_{\varepsilon\downarrow0}
\frac{P_{\varepsilon,\rho}^pf(x)-f(x)}{\varepsilon}
=\rho(x)^2\left[f''(x)+2\frac{p'(x)}{p(x)}f'(x)\right].
$$

> 左端では、$\sqrt{\varepsilon}$ の係数は $2\rho(0)f'(0)/\sqrt{\pi}$、右端では $-2\rho(1)f'(1)/\sqrt{\pi}$ になる。
<!-- formal-statement-end -->

### 証明の見取り図

固定した評価点 $x$ について、$\delta=\sqrt{\varepsilon}\rho(x)$ と置き直す。$\rho$ を積分変数 $y$ で微分する操作は存在しないので、内点で $\rho'$ の項は出ない。

<!-- proof-start -->
### 証明

固定 $x$ で $\rho(x)>0$ を定数とみなし、[境界層の展開](#thm-mfl17-expansion)の変数変換 $y=x+\delta u$ を適用する。$x\in(0,1)$ が固定なので $x/\delta,(1-x)/\delta\to\infty$。従って $\mu_1$ は指数的に小さく、$\mu_2\to2$、$\mu_2-\mu_1^2\to2$ となる。二次項は

$$
\delta^2\left(f''+2\frac{p'}pf'\right)
=\varepsilon\rho(x)^2\left(f''+2\frac{p'}pf'\right).
$$

剰余は $O(\delta^3)=O(\varepsilon^{3/2})$ で、$\varepsilon$ で割れば0へ向かう。端点では同じ展開の $\mu_1\to\pm2/\sqrt{\pi}$ と $\delta=\sqrt{\varepsilon}\rho(x)$ を代入する。$\square$
<!-- proof-end -->

$\rho=p^{-\beta}$ なら内点の拡散係数は $p^{-2\beta}$ になる。**幅を密度に合わせただけでは、密度driftが自動的に消えない。** ここで使った行核は一般に $K^{\mathrm{row}}(x,y)\ne K^{\mathrm{row}}(y,x)$ なので、[MFL15の対称重みからの詳細釣合い](../MFL15/index.md#prop-mfl15-balance)もそのままは使えない。対称な $\rho(x)\rho(y)$ 型の核では $\rho(y)$ の展開を含むため別の係数が現れ、この定理で代用できない。

## 5. density shiftは作用素をどう変えるか

標本が従う密度を $p$、別の観測環境での密度を $q$ と書く。幾何学的な支持区間が同じでも、点を多く観測する場所が変われば行平均の重みが変わる。まず両密度が区間全体で正である場合だけ扱う。

<a id="def-mfl17-shift"></a>

<!-- formal-statement-start -->
> **定義（同一支持上のdensity shift）**
> $I=[0,1]$ 上の $p,q\in C^3(I)$ がともに正で、$\int_Ip=\int_Iq=1$ とする。密度 $p$ から $q$ への **density shift** に対し、比 $w(y)=q(y)/p(y)>0$ を重要度重みとする。[行平均](#def-mfl17-row)の分子・分母に $w$ を掛けた作用素を

$$
P_\varepsilon^{p,w}f(x)
=\frac{\int_IK_\varepsilon(x,y)f(y)w(y)p(y)\,dy}
{\int_IK_\varepsilon(x,y)w(y)p(y)\,dy}
$$

> と定める。$w(y)p(y)=q(y)$ なので、$P_\varepsilon^{p,w}=P_\varepsilon^q$ が厳密に成り立つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl17-shift -->
**直接例（傾いた二つの密度）。** $p_s(x)=1+s(2x-1)$、$q_t(x)=1+t(2x-1)$、$|s|,|t|<1$ とすれば、いずれも積分1かつ一様に正である。$w=q_t/p_s$ は連続で上下有界、$w p_s=q_t$。従って分母は正であり、重み付き行平均は直接積分の $q_t$ 行平均に一致する。
<!-- definition-example-end -->

<a id="prop-mfl17-shift"></a>

<!-- formal-statement-start -->
> **命題（density shiftとdriftの差）**
> [同一支持上のdensity shift](#def-mfl17-shift)の仮定で $f\in C^3(I)$ とする。固定内点 $x\in(0,1)$ では

$$
\lim_{\varepsilon\downarrow0}
\frac{(P_\varepsilon^q-P_\varepsilon^p)f(x)}{\varepsilon}
=2\left(\frac{q'(x)}{q(x)}-\frac{p'(x)}{p(x)}\right)f'(x)
=2(\log w)'(x)f'(x).
$$

> 同一の正の連続 $\rho$ を使うadaptive行核では、右辺全体に $\rho(x)^2$ が掛かる。
<!-- formal-statement-end -->

### 証明の見取り図

二つの密度について別々に内点の展開を作り、$f''$ の項が相殺することを確かめる。

<!-- proof-start -->
### 証明

[端点と内点の命題](#prop-mfl17-endpoint)を $p$ と $q$ にそれぞれ適用すると、固定内点で

$$
P_\varepsilon^q f
=f+\varepsilon\left(f''+2\frac{q'}qf'\right)+o(\varepsilon),
\qquad
P_\varepsilon^p f
=f+\varepsilon\left(f''+2\frac{p'}pf'\right)+o(\varepsilon).
$$

両式を引いて $\varepsilon$ で割ると、$f$ と $f''$ は消え、残るのは表示のdrift差である。$q=wp$ より $\log q-\log p=\log w$ だから対数微分も一致する。[adaptive内点generator](#thm-mfl17-adaptive)を両密度へ同じ $\rho$ で適用すれば、$\rho(x)^2$ が共通係数として残る。$\square$
<!-- proof-end -->

具体的に $f(x)=x$、$p_s(x)=1+s(2x-1)$ とすると、固定内点で

$$
\frac{P_\varepsilon^{p_s}f(x)-f(x)}{\varepsilon}
\longrightarrow \frac{4s}{1+s(2x-1)}.
$$

$x=1/2$ で $s=1/4$ なら極限は1、$s=-1/4$ なら $-1$ になる。これは幾何的な区間が変わらなくても密度driftが反転する例である。$q_t$ へ変えた場合の差は $x=1/2$ で $4(t-s)$ となる。

**重要度重みの限界。** $p=0$ の場所で $q>0$ なら $q/p$ は定義できず、$p$ の観測点から $q$ の支持全体を回復できない。両密度が正でも $w$ が極端に大きければ有限標本の重みの分散が増える。[MFL14の集中評価](../MFL14/index.md#thm-mfl14-ratio)は仮定を再検査せずにそのまま重み付き平均へ移せない。

また、[MFL15のalpha補正](../MFL15/index.md#def-mfl15-alpha)は境界のない多様体での対称核に対する二段正規化である。区間上では補正用の $q_\varepsilon(x)$ 自身が端点で切断されて変動するため、ここでの単純な行核の境界公式を、全ての $\alpha$ に無条件で流用できない。

## 6. 再現実験：端点距離・帯域幅・密度を動かす

[boundary_kernel_lab.py](boundary_kernel_lab.py) はPython標準ライブラリだけを用いる。区間 $[0,1]$ の積分を複合Simpson公式で数値計算し、独立に計算した切断モーメントの**解析式**と比べる。密度は $p_s(y)=1+s(2y-1)$、$|s|<1$、幅は $\rho(x)=p_s(x)^{-\beta}$、入力関数は $f(y)=y$ または $f(y)=y^2$ とする。

- `--x` は左端からの距離、`--epsilon` は帯域幅、`--slope` は密度の傾き、`--beta` は局所幅の指数を変える。
- `numerical_increment` は数値積分による $P_{\varepsilon,\rho}^{p_s}f(x)-f(x)$、`moment_increment` はAffine密度と一次・二次関数で厳密な切断モーメント式の値である。この二つの差は積分実装の検算に使う。
- `leading_boundary_increment` は $\delta\mu_1 f'(x)$、`second_order_increment` は[展開定理](#thm-mfl17-expansion)の二次までの式。有限 $\varepsilon$ では真値と一致するとは限らない。
- `scaled_generator` は $(P-f)/\varepsilon$ である。端点の $f=y$ では幅を縮めるほど大きくなる一方、固定内点では有限のdriftへ近づく。

```python-file-lab
# lab-id: MFL17-BOUNDARY-KERNEL-FILE
# lab-title: 境界層・adaptive bandwidth・density shiftの核平均
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL17/boundary_kernel_lab.py
# timeout-ms: 30000
# lab-preset: 左端・一様密度・一次関数 | --x 0 --epsilon 0.01 --slope 0 --beta 0 --function linear
# lab-preset: 左端・幅縮小と平方根項 | --x 0 --epsilon 0.0025 --slope 0 --beta 0 --function linear
# lab-preset: 境界層・左端Neumann条件 | --x 0.1 --epsilon 0.01 --slope 0 --beta 0 --function quadratic
# lab-preset: 内点・密度drift | --x 0.5 --epsilon 0.01 --slope 0.5 --beta 0 --function linear
# lab-preset: adaptive幅・左端 | --x 0 --epsilon 0.01 --slope 0.5 --beta 0.5 --function linear
# lab-preset: 密度反転・内点 | --x 0.5 --epsilon 0.01 --slope -0.5 --beta 0 --function linear
```

`python boundary_kernel_lab.py --self-test` は定数保存、厳密な一様密度の端点積分、切断モーメントとの一致、密度傾斜の符号、可変幅の効果を検算する。数値積分の分割数は固定偶数 `--steps` で指定する。小さい $\varepsilon$ には十分細かい分割が必要であり、数値誤差を数学的な境界biasと混同しない。この実験は連続積分の決定論的検算であって、ランダム点群の高確率界や熱半群への収束証明ではない。

## 7. 演習：境界と密度の効果を切り分ける

<a id="ex-mfl17-a01"></a>

### MFL17-A01 半Gaussianの係数

- Level: A
- 問題: $m_j=\int_0^\infty u^j e^{-u^2/4}\,du$（$j=0,1,2$）を計算し、$\mu_1=m_1/m_0$、$\mu_2=m_2/m_0$、$\mu_2-\mu_1^2$ を求めよ。積分の変数変換または部分積分を示せ。

**詳細解答。** [Gaussianモーメント](../MFL13/index.md#lem-mfl13-moments)から全直線の零次積分は $2\sqrt{\pi}$、二次積分は $4\sqrt{\pi}$。被積分関数は偶関数なので半直線ではそれぞれ $m_0=\sqrt{\pi}$、$m_2=2\sqrt{\pi}$ となる。一次は $v=u^2/4$ と置くと $u\,du=2\,dv$ だから

$$
m_1=2\int_0^\infty e^{-v}\,dv=2[-e^{-v}]_0^\infty=2.
$$

従って

$$
\mu_1=\frac2{\sqrt\pi},\qquad
\mu_2=2,\qquad
\mu_2-\mu_1^2=2-\frac4\pi>0.
$$

最後の値は正規化した半Gaussianの分散であり、密度の導関数を含む二次項に掛かる。

<a id="ex-mfl17-a02"></a>

### MFL17-A02 端点の一次関数

- Level: A
- 問題: $I=[0,1]$、$p(y)=1$、$f(y)=y$ とする。$x=0$ での[行平均](#def-mfl17-row)を有限 $\varepsilon>0$ の積分比で書き、$\varepsilon\downarrow0$ で $(P_\varepsilon^pf(0)-f(0))/\sqrt\varepsilon$ の極限を計算せよ。$\varepsilon$ で割った場合はどうなるか。

**詳細解答。** $y=\sqrt{\varepsilon}u$ と変数変換すれば

$$
P_\varepsilon^pf(0)
=\sqrt{\varepsilon}\,
\frac{\int_0^{1/\sqrt{\varepsilon}}u e^{-u^2/4}\,du}
{\int_0^{1/\sqrt{\varepsilon}}e^{-u^2/4}\,du}.
$$

分子は $2(1-e^{-1/(4\varepsilon)})\to2$、分母は単調に増えて $\sqrt\pi$ へ近づく。従って平方根で割った極限は $2/\sqrt\pi$ となる。一方

$$
\frac{P_\varepsilon^pf(0)-f(0)}{\varepsilon}
=\frac1{\sqrt\varepsilon}
\frac{2(1-e^{-1/(4\varepsilon)})}
{\int_0^{1/\sqrt{\varepsilon}}e^{-u^2/4}\,du}
\longrightarrow+\infty.
$$

内点の $f''=0$ を端点へ無条件に当てはめると、この発散を見落とす。

<a id="ex-mfl17-a03"></a>

### MFL17-A03 二次関数の端点

- Level: A
- 問題: $I=[0,1]$、$p=1$、$f(y)=y^2$ とする。$f'(0)$ と $(P_\varepsilon^pf(0)-f(0))/\varepsilon$ の極限を求め、二階微分 $f''(0)$ と比較せよ。

**詳細解答。** $f'(y)=2y$ なので $f'(0)=0$。$y=\sqrt\varepsilon u$ を代入すれば

$$
\frac{P_\varepsilon^pf(0)-f(0)}{\varepsilon}
=\frac{\int_0^{1/\sqrt\varepsilon}u^2e^{-u^2/4}\,du}
{\int_0^{1/\sqrt\varepsilon}e^{-u^2/4}\,du}
\longrightarrow\frac{2\sqrt\pi}{\sqrt\pi}=2.
$$

これは $f''(0)=2$ と一致する。しかしこの**一点の一致**だけで境界層全体での一様収束は導けない。

<a id="ex-mfl17-a04"></a>

### MFL17-A04 密度が傾いた内点

- Level: A
- 問題: $p_s(x)=1+s(2x-1)$、$|s|<1$、$f(x)=x$ を $[0,1]$ 上に置く。$p_s$ が確率密度であることを確認し、固定内点 $x=1/2$ の[内点generator](#prop-mfl17-endpoint)を求めよ。$s=\pm1/4$ を代入せよ。

**詳細解答。** $p_s(x)\ge1-|s|>0$ であり、

$$
\int_0^1p_s(x)\,dx=1+s[x^2-x]_0^1=1.
$$

$p_s'(x)=2s$、$f'=1$、$f''=0$ である。$x=1/2$ では $p_s=1$ だから

$$
L_{p_s}f(1/2)
=0+2\frac{2s}{1}\cdot1=4s.
$$

$s=1/4$ なら1、$s=-1/4$ なら $-1$。同じ $f$ と区間でも、標本密度の偏りでdriftが反転する。

<a id="ex-mfl17-b01"></a>

### MFL17-B01 分母が打ち消す項を再導出

- Level: B
- 問題: $p,f\in C^3([0,1])$、$p>0$ とし、$y=x+\delta u$ の切断モーメントを $\mu_1,\mu_2$ とする。$p,f$ を二次まで展開して行平均の $O(\delta^2)$ の係数を導け。なぜ密度driftの係数が $\mu_2$ だけではないか説明せよ。

**詳細解答。** 分子と分母を $\delta m_0$ で割った後、$h=pf$ とおくと

$$
N=h+\delta\mu_1h'+\frac{\delta^2\mu_2}{2}h''+O(\delta^3),\quad
D=p+\delta\mu_1p'+\frac{\delta^2\mu_2}{2}p''+O(\delta^3).
$$

$D^{-1}=p^{-1}\{1-\delta\mu_1p'/p+\delta^2[\mu_1^2(p'/p)^2-\mu_2p''/(2p)]\}+O(\delta^3)$ と二次まで展開する。$N$ との積のうち、$\delta^2f''$ は $\mu_2f''/2$。$h''=pf''+2p'f'+p''f$ の交差項から $\mu_2(p'/p)f'$、$-\delta\mu_1p'/p$ と $\delta\mu_1h'/p$ の積から $-\mu_1^2(p'/p)f'$ が出る。$f$ に比例する二次項は分母の $p''$ と $(p')^2$ の寄与によって全て相殺する。従って

$$
P_\varepsilon^pf-f
=\delta\mu_1f'+\delta^2\left[
\frac{\mu_2}{2}f''+(\mu_2-\mu_1^2)\frac{p'}pf'
\right]+O(\delta^3).
$$

この $-\mu_1^2$ は**行正規化の分母を展開した結果**であり、消すと境界で誤った密度補正係数になる。

<a id="ex-mfl17-b02"></a>

### MFL17-B02 adaptive幅の尺度と非対称性

- Level: B
- 問題: $p_s(x)=1+s(2x-1)$、$|s|<1$、$\rho(x)=p_s(x)^{-1/2}$、$f(x)=x^2$ とする。[adaptive行核](#def-mfl17-adaptive)の固定内点generatorと左端の平方根偏りの係数を求めよ。また $s\ne0$ なら行核が一般に非対称である理由を具体的な二点で示せ。

**詳細解答。** $\rho^2=p_s^{-1}$、$f'=2x$、$f''=2$、$p_s'=2s$ なので、[adaptive内点定理](#thm-mfl17-adaptive)の仮定（正の上下有界幅と滑らかさ）は成立し、

$$
L_{\rho,p_s}f(x)
=\frac1{p_s(x)}
\left[2+2\frac{2s}{p_s(x)}(2x)\right]
=\frac2{p_s(x)}+\frac{8sx}{p_s(x)^2}.
$$

左端では $f'(0)=0$ だから $\sqrt\varepsilon$ 項の係数は0である。ただし二次項は $f''(0)\rho(0)^2=2/(1-s)$ となる。行核の非対称性について $x=0,y=1$ を取ると、

$$
K_{\varepsilon,\rho}^{\mathrm{row}}(0,1)
=e^{-(1-s)/(4\varepsilon)},\qquad
K_{\varepsilon,\rho}^{\mathrm{row}}(1,0)
=e^{-(1+s)/(4\varepsilon)}.
$$

$s\ne0$ なら異なる。従って対称核に基づく詳細釣合いを追加の検証なしには用いられない。

<a id="ex-mfl17-b03"></a>

### MFL17-B03 density shiftと重み付けの限界

- Level: B
- 問題: $p_s=1+s(2x-1)$、$q_t=1+t(2x-1)$（$|s|,|t|<1$）、$f(x)=x$ とする。重要度重み $w=q_t/p_s$ を求め、$x=1/2$ の二つの内点generatorの差を導け。次に $p(x)=2$（$0\le x\le1/2$）、$p(x)=0$（$1/2<x\le1$）、$q(x)=1$（$0\le x\le1$）では同じ重み付けが不可能な理由を述べよ。

**詳細解答。** 最初の二密度は正で正規化済みだから

$$
w(x)=\frac{1+t(2x-1)}{1+s(2x-1)}>0,\qquad wp_s=q_t.
$$

[密度変化によるdriftの差](#prop-mfl17-shift)で $x=1/2$ に $f'=1$、$q_t'=2t$、$p_s'=2s$、$q_t=p_s=1$ を代入すると

$$
(L_{q_t}-L_{p_s})f(1/2)
=2(2t-2s)=4(t-s).
$$

後半の $p$ も積分1の密度だが、$(1/2,1]$ で $p=0$、$q=1$ なので $q/p$ は定義できない。$p$ の標本に非負重みを掛けても、その区間に元の標本が一つも出現しないという**支持の欠落**は直せない。後半の密度は前半命題の全区間正値・滑らかさの仮定を満たさず、そのgenerator公式自体も適用しない。

<a id="ex-mfl17-b04"></a>

### MFL17-B04 左端Neumann条件だけでは足りない

- Level: B
- 問題: $p=1$、$f(x)=x^2$、$x_\varepsilon=a\sqrt\varepsilon$（$a>0$ 固定）について、$(P_\varepsilon f(x_\varepsilon)-f(x_\varepsilon))/\varepsilon$ の極限を切断モーメントから計算せよ。端点 $a=0$ と固定内点の値を比較し、一様収束を否定する理由を説明せよ。

**詳細解答。** $y=x+\delta u$、$\delta=\sqrt\varepsilon$ として

$$
\frac{P_\varepsilon f(x)-f(x)}{\varepsilon}
=\frac{2x}{\delta}\mu_1(A,B)+\mu_2(A,B).
$$

$x=a\delta$ なら $A=a$、$B=1/\delta-a\to\infty$。部分積分から $\mu_2(a,\infty)=2-a\mu_1(a,\infty)$、$\mu_1(a,\infty)=2e^{-a^2/4}/\int_{-a}^\infty e^{-u^2/4}\,du$ だから、極限は

$$
2a\mu_1+\mu_2=2+a\mu_1>2.
$$

$a=0$ の端点値は2、固定した内点 $x>0$ では $\mu_1\to0,\mu_2\to2$ なので2になる。しかし $x_\varepsilon$ も区間内にあり、そこで2より大きな極限差が残る。したがって区間全体でのgeneratorの一様誤差が0になることはない。$f'(0)=0$ は満たすが、**移動する境界層の点**まで固定内点の公式を適用したのが誤りである。

<a id="ex-mfl17-c01"></a>

### MFL17-C01 境界・幅・密度を同じ模型で比較する

- Level: C
- 問題: $I=[0,1]$、$p_s(x)=1+s(2x-1)$、$|s|<1$、$\rho(x)=p_s(x)^{-\beta}$（$\beta\in\mathbb R$）、$f(x)=x+x^2$ とする。以下を順に示せ。

  1. $p_s$ と $\rho$ が[adaptive行核](#def-mfl17-adaptive)の仮定を満たすことを確認し、固定内点のgeneratorを求めよ。
  2. 左端の $\sqrt\varepsilon$ 偏りの係数と、右端での符号を含む係数を求めよ。なぜ一般に $\varepsilon^{-1}(P-f)$ が両端で発散するか説明せよ。
  3. $\widetilde f(x)=x^2$ に替えたとき、左端では平方根項が消えることと、$x=a\sqrt\varepsilon\rho(0)$ の境界層で固定内点のgeneratorと同じ極限になるとは限らないことを、少なくとも $s=\beta=0$ で示せ。
  4. 正の別密度 $q_t=1+t(2x-1)$、$|t|<1$ へshiftしたときの固定内点drift差を、**同一の $\rho$ を保つ場合**と **$\rho$ も $q_t^{-\beta}$ へ作り直す場合**で区別せよ。前者の重み付けによる実現条件を述べよ。

**詳細解答。**

1. $1-|s|\le p_s\le1+|s|$ なので積分1かつ正であり、$p_s^{-\beta}$ も正で上下有界な滑らかな関数となる。$f'=1+2x$、$f''=2$、$p_s'=2s$ である。[adaptive内点定理](#thm-mfl17-adaptive)に代入して

$$
L_{\rho,p_s}f(x)=p_s(x)^{-2\beta}
\left[2+\frac{4s(1+2x)}{p_s(x)}\right].
$$

2. 左端では $f'(0)=1$、$\rho(0)=(1-s)^{-\beta}$ だから[端点平方根の式](#prop-mfl17-endpoint)を局所幅に適用して

$$
P_{\varepsilon,\rho}^{p_s}f(0)-f(0)
=\frac{2(1-s)^{-\beta}}{\sqrt\pi}\sqrt\varepsilon+O(\varepsilon).
$$

  右端では $f'(1)=3$、$\rho(1)=(1+s)^{-\beta}$ なので

$$
P_{\varepsilon,\rho}^{p_s}f(1)-f(1)
=-\frac{6(1+s)^{-\beta}}{\sqrt\pi}\sqrt\varepsilon+O(\varepsilon).
$$

  どちらも非零の係数を $\varepsilon$ で割るため、それぞれ正・負の向きへ絶対値が無限大に増える。密度の傾斜に由来する二次driftより境界一次項が優勢である。

3. $\widetilde f'(0)=0$ なので左端の平方根項は0。$s=\beta=0$ なら $p=1,\rho=1$ で、[境界層の命題](#prop-mfl17-layer)は

$$
\frac{P_\varepsilon \widetilde f(a\sqrt\varepsilon)
-\widetilde f(a\sqrt\varepsilon)}{\varepsilon}
\longrightarrow 2+\frac{2ae^{-a^2/4}}{\int_{-a}^\infty e^{-u^2/4}\,du}>2
\quad(a>0)
$$

  を与える。しかし固定内点でのgeneratorは $\widetilde f''=2$ であり、一様には近づかない。端点条件だけで熱半群への強い収束を宣言できない。

4. $p_s$ と $q_t$ はともに正なので $w=q_t/p_s$ は定義され、$w p_s=q_t$ を使って行積分の分子と分母を同時に再重み付けできる。$\rho$ を **$p_s^{-\beta}$ に固定**して比べると、[密度変化によるdriftの差](#prop-mfl17-shift)から

$$
(L_{\rho,q_t}-L_{\rho,p_s})f(x)
=2p_s(x)^{-2\beta}(1+2x)
\left(\frac{2t}{q_t(x)}-\frac{2s}{p_s(x)}\right).
$$

  一方、密度と一緒に幅も $\rho_q=q_t^{-\beta}$ に変えるなら、単なるdrift差ではなく拡散係数の差も生じる。具体的には

$$
L_{\rho_q,q_t}f-L_{\rho,p_s}f
=2\{q_t^{-2\beta}-p_s^{-2\beta}\}
+2(1+2x)\left\{
q_t^{-2\beta}\frac{2t}{q_t}
-p_s^{-2\beta}\frac{2s}{p_s}
\right\}.
$$

  これらの等式は固定内点に関するものであり、有限標本による重み推定誤差、境界層、固有空間の収束までは保証しない。

## 8. まとめ：何が確定し、何が追加で必要か

- 区間端の行Gaussian平均には、密度が一様でも $\sqrt{\varepsilon}$ の片側偏りが現れる。境界で二階generatorを得るには法線導関数を抑える必要があるが、境界層全体の一様近似にはそれだけでは足りない。
- 点ごとに幅を固定した行核は、内点の拡散係数を $\rho(x)^2$ 倍する。対称な可変幅核やalpha補正した核とは異なる。
- 同じ支持上のdensity shiftは、幅を固定すれば内点driftを $2\rho^2(\log(q/p))'f'$ だけ変える。支持が変わる場合の重要度重みは定義できない場所がある。
- これらは**連続核の局所bias**の結論である。有限標本での集中、境界条件を伴う作用素収束、固有値・固有空間収束は追加の仮定と証明を要する。次のMFL18ではまず円周という境界のない離散模型でスペクトルを完全に計算する。
