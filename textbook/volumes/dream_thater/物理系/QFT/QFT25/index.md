# QFT25 くりこみ群方程式・β関数・異常次元と一ループの走る結合

[QFT23の四次元 $\phi^4$ 反項](../QFT23/index.md#thm-qft23-msbar-counterterms)は、発散を差し引くための係数を求めました。[QFT24のQED真空偏極](../QFT24/index.md#thm-qft24-renormalized-photon)は、同じ電荷でも観測する運動量によって補正が変わることを示しました。ところが、次元正則化の途中で導入した $\mu$ は実験装置の目盛りではありません。この**任意の尺度を動かしても、同じ裸の理論の予測は変わらない**という要請から、結合の変化を計算できます。

今回の問いは、**「くりこみ尺度を変える」ことを、何を固定した微分として定義し、$\phi^4$ とQEDの一ループ積分から走る結合・異常次元をどう導くか**です。四次元Euclid摂動論で $\hbar=c=1$ とし、$d=4-2\varepsilon$、$\mu>0$、$\varepsilon\to0$ を用います。これは有限次数の摂動論であり、四次元相互作用場の非摂動的な存在を証明するものではありません。

## 1. 何を固定して尺度を動かすのか

[裸の作用・くりこみ済み係数・反項](../QFT23/index.md#def-qft23-bare-counterterms)により、四次元の実スカラー $\phi^4$ 理論の四次結合には「裸」と「くりこみ済み」の二種類があります。次元 $d$ では $\phi$ の質量次元が $(d-2)/2$ なので $\phi^4$ の係数は質量次元 $4-d=2\varepsilon$ です。無次元に近い結合を $\lambda(\mu)$ と書くと、裸の四次結合は

$$
\lambda_B=\mu^{2\varepsilon}Z_\lambda(\lambda,\varepsilon)\lambda.
$$

ここで $Z_\lambda$ は反項をまとめた因子で、$Z_\lambda=1+O(\lambda)$ です。$\lambda_B$ は固定した正則化付き理論のパラメータ、$\lambda$ は尺度 $\mu$ を添えて記すパラメータです。$\mu$ の変更と外線運動量 $p$ の変更は別の操作です。

新しい「β関数」は、**裸のパラメータを変えない**まま $\mu$ を動かしたときのくりこみ済み結合の変化率です。「異常次元」は同様の操作で場の規格化因子がどう変化するかを測ります。

<a id="def-qft25-rg-functions"></a>

<!-- formal-statement-start -->
> **定義（くりこみ群β関数と場の異常次元）**
> $d=4-2\varepsilon$ の正則化付き理論で、裸の結合 $\lambda_B$、裸の質量 $m_B^2$、裸の場 $\phi_B$ と、$\mu>0$ に依存し得るくりこみ済み量 $\lambda,m^2,\phi_R$ があり、$\phi_B=Z_\phi^{1/2}\phi_R$ とする。裸の量と正則化パラメータ $\varepsilon$ を固定した全微分により

$$
\beta_\lambda=\left.\mu\frac{d\lambda}{d\mu}\right|_{\mathrm{bare}},
\qquad
\beta_{m^2}=\left.\mu\frac{dm^2}{d\mu}\right|_{\mathrm{bare}},
\qquad
\gamma_\phi=\left.\frac12\mu\frac{d\log Z_\phi}{d\mu}\right|_{\mathrm{bare}}
$$

> を定義する。$\beta_\lambda$ を結合のβ関数、$\gamma_\phi$ を場の異常次元と呼ぶ。全微分では $\lambda(\mu)$、$m^2(\mu)$ 等の**暗黙の尺度依存も微分する**。多結合理論では各結合にβ関数を設ける。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft25-rg-functions -->
### 例：自由場は何を示すか

**定義の確認**：$\lambda_B=0$、$Z_\phi=1$、$m_B^2=m^2$ の自由実スカラー場なら、固定裸パラメータで $m^2$ は一定、$\log Z_\phi=0$ です。従って $\beta_\lambda=\beta_{m^2}=\gamma_\phi=0$ です。たとえ二点関数が外線運動量 $p$ に依存しても、それはこのβ関数の定義でいう「$\mu$ 依存」ではありません。
<!-- definition-example-end -->

**注意：符号と呼び方。** $\gamma_\phi$ はここでは $+\frac12d\log Z_\phi/d\log\mu$ です。文献には符号が反対の定義もあります。また $\beta_{m^2}/m^2$ は質量二乗の走りを表す比率で、$\gamma_\phi$ と同じ量ではありません。

## 2. $\phi^4$ 模型のβ関数を反項から導く

[QFT23の修正最小減算法](../QFT23/index.md#def-qft23-msbar)は $\Delta_\varepsilon=1/\varepsilon-\gamma_E+\log(4\pi)$ の極と付随する定数を引きます。この定数は $\mu$ に依存しないので、**一ループのβ関数を決めるのは $1/\varepsilon$ の留数**です。ここでは一種類の実スカラー、$m^2>0$、四次項 $\mu^{2\varepsilon}\lambda\phi_R^4/4!$、結合は摂動的に小さいと仮定します。

<a id="thm-qft25-phi4-beta"></a>

<!-- formal-statement-start -->
> **定理（φ⁴模型の一ループβ関数と質量の走り）**
> $d=4-2\varepsilon$ の一成分実 $\phi^4$ 理論で、[QFT23の一ループ反項](../QFT23/index.md#thm-qft23-msbar-counterterms)を用い、裸の量を固定して微分する。$\overline{\mathrm{MS}}$ で四次結合と質量に対する裸の関係が

$$
\lambda_B=\mu^{2\varepsilon}
\left[\lambda+\frac{3\lambda^2}{32\pi^2}\Delta_\varepsilon
+O(\lambda^3)\right],
$$

$$
m_B^2=m^2
\left[1+\frac{\lambda}{32\pi^2}\Delta_\varepsilon
+O(\lambda^2)\right]
$$

> と書けるとする。ここで $\Delta_\varepsilon=1/\varepsilon-\gamma_E+\log(4\pi)$ であり、β関数は $\varepsilon\to0$ 後の四次元で定義する。このとき

$$
\boxed{\beta_\lambda=\frac{3\lambda^2}{16\pi^2}+O(\lambda^3)},
\qquad
\boxed{\beta_{m^2}=\frac{\lambda m^2}{16\pi^2}+O(\lambda^2m^2)},
\qquad
\boxed{\gamma_\phi=O(\lambda^2)}.
$$

> 最後の式は**一ループにおいて $\gamma_\phi=0$** という主張であり、全次数で零とは述べていない。
<!-- formal-statement-end -->

### 証明の見取り図

$\mu^{2\varepsilon}$ の微分は $2\varepsilon$ を生みます。β関数の最初の項は $-2\varepsilon\lambda$ で、それを $1/\varepsilon$ の留数へ掛けると、四次元でも残る有限項が生まれます。質量には $\mu^{2\varepsilon}$ を前置しませんが、$\lambda$ が動くため質量反項を通じた走りが残ります。

<!-- proof-start -->
### 証明

$a=3/(32\pi^2)$ と置きます。$\overline{\mathrm{MS}}$ の定数 $-\gamma_E+\log4\pi$ は $\varepsilon\to0$ の有限部分の取り方を変えるだけで、以下の一ループ有限係数を変えないので、極の部分で計算します。裸結合の微分は

$$
0=\mu\frac{d\lambda_B}{d\mu}
=\mu^{2\varepsilon}
\left[
2\varepsilon\left(\lambda+\frac{a\lambda^2}{\varepsilon}\right)
+\beta_\lambda^{(d)}
\left(1+\frac{2a\lambda}{\varepsilon}\right)
\right]+O(\lambda^3),
$$

ここで $\beta_\lambda^{(d)}=\mu\,d\lambda/d\mu$ はまだ $d$ 次元での値です。まず自由な次元による項 $-2\varepsilon\lambda$ が必要なので

$$
\beta_\lambda^{(d)}=-2\varepsilon\lambda+b\lambda^2+O(\lambda^3).
$$

代入して $\lambda^2$ の項を抜き出すと

$$
2a\lambda^2+b\lambda^2
+\frac{2a\lambda}{\varepsilon}(-2\varepsilon\lambda)
=(b-2a)\lambda^2=0.
$$

ゆえに $b=2a=3/(16\pi^2)$。$\varepsilon\to0$ として第一式を得ます。$-\gamma_E+\log4\pi$ を残しても、そこへ掛かる $-2\varepsilon\lambda$ は極限で零となります。

質量について $c=1/(32\pi^2)$ とすると

$$
0=\mu\frac{dm_B^2}{d\mu}
=\beta_{m^2}^{(d)}\left(1+\frac{c\lambda}{\varepsilon}\right)
+m^2\frac{c}{\varepsilon}\beta_\lambda^{(d)}
+O(\lambda^2m^2).
$$

$\beta_\lambda^{(d)}=-2\varepsilon\lambda+O(\lambda^2)$ を代入すると、一次項では

$$
0=\beta_{m^2}^{(d)}-2c\lambda m^2+O(\lambda^2m^2),
$$

したがって $\beta_{m^2}=2c\lambda m^2=\lambda m^2/(16\pi^2)$ です。二次項を捨てる際、$\beta_{m^2}$ 自身が $O(\lambda m^2)$ なので、$\beta_{m^2}c\lambda/\varepsilon$ は次の次数へ回ることを使っています。

最後に[QFT23の一ループ二点頂点](../QFT23/index.md#thm-qft23-msbar-counterterms)はtadpoleで、外線運動量 $p$ に依存しません。ゆえに $p^2$ に比例する一ループの極がなく、$Z_\phi=1+O(\lambda^2)$ です。定義により一ループの $\gamma_\phi$ は零です。
<!-- proof-end -->

「質量が走る」と「場の異常次元が零」は矛盾しません。前者は二点頂点の**定数項**、後者は二点頂点の **$p^2$ の係数**を見ています。

### 例：二倍のスケールでの小さい変化

$\lambda(\mu_0)=\lambda_0\ll1$ とし、区間で一次近似すると、$\mu=2\mu_0$ における結合差は

$$
\lambda(2\mu_0)-\lambda_0
=\frac{3\lambda_0^2}{16\pi^2}\log2+O(\lambda_0^3).
$$

正の結合では高い尺度で増える符号です。実験する外線運動量を二倍にしただけで裸結合そのものを変更した、という意味ではありません。

## 3. 頂点関数のくりこみ群方程式

結合だけが走る理由を丸暗記せず、くりこみ済みの相関関数に戻りましょう。[QFT21の1PI有効作用](../QFT21/index.md#def-qft21-proper-vertex)をくりこみ済み場 $\phi_R$ で $n$ 回微分した頂点を $\Gamma_R^{(n)}$ と書きます。$\phi_B=Z_\phi^{1/2}\phi_R$ なら、鎖律から $\Gamma_R^{(n)}=Z_\phi^{n/2}\Gamma_B^{(n)}$ です。ここが場の異常次元の係数 $n$ の出発点になります。

<a id="def-qft25-rg-equation"></a>

<!-- formal-statement-start -->
> **定義（くりこみ群方程式と走る結合）**
> [β関数と異常次元](#def-qft25-rg-functions)が定義されたくりこみ方式で、$t=\log(\mu/\mu_0)$ を尺度変数とし、初期値 $\lambda(0)=\lambda_0$、$m^2(0)=m_0^2$ を持つ微分方程式

$$
\frac{d\lambda}{dt}=\beta_\lambda(\lambda,m^2),\qquad
\frac{dm^2}{dt}=\beta_{m^2}(\lambda,m^2)
$$

> をくりこみ群の流れと呼び、その解を走る結合・走る質量と呼ぶ。$\Gamma_R^{(n)}$ に対する、裸の量を固定した尺度微分の関係をくりこみ群方程式と呼ぶ。$\mu$ の流れは再パラメータ化であり、外線運動量を同時に動かすときは別途その操作を指定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft25-rg-equation -->
### 例：定数β関数の流れの確認

**定義の確認**：$\beta_\lambda=b$（定数）、$\beta_{m^2}=0$ の模型なら、微分方程式を積分すると $\lambda(t)=\lambda_0+bt$、$m^2(t)=m_0^2$ です。初期値を満たし、$d\lambda/dt=b$ を直接確認できます。実際の $\phi^4$ 理論では $\beta_\lambda$ が $\lambda^2$ に依存するため、後で別に積分します。
<!-- definition-example-end -->

<a id="thm-qft25-vertex-rg-equation"></a>

<!-- formal-statement-start -->
> **定理（1PI頂点のくりこみ群方程式）**
> 一種類の実スカラー場で $\phi_B=Z_\phi^{1/2}\phi_R$、$\Gamma_R^{(n)}=Z_\phi^{n/2}\Gamma_B^{(n)}$ とし、裸の理論の規格化した $n$ 点1PI頂点 $\Gamma_B^{(n)}$ が固定裸量の下で $\mu$ に明示的に依存しないとする。$\Gamma_R^{(n)}$ は外部運動量を固定して微分できるものとする。このとき

$$
\boxed{
\left(\mu\frac{\partial}{\partial\mu}
+\beta_\lambda\frac{\partial}{\partial\lambda}
+\beta_{m^2}\frac{\partial}{\partial m^2}
-n\gamma_\phi\right)\Gamma_R^{(n)}=0
}.
$$

> 偏微分では括弧に書いていない外部運動量・他のくりこみ済み変数を固定する。複数の結合や場があれば対応するβ関数・異常次元の項を追加する。
<!-- formal-statement-end -->

### 証明の見取り図

裸頂点を $\Gamma_B^{(n)}=Z_\phi^{-n/2}\Gamma_R^{(n)}$ と解き、裸を固定した全微分で零と置きます。$Z_\phi^{-n/2}$ を微分して出る $-n\gamma_\phi$ が、この定理の符号を決めます。

<!-- proof-start -->
### 証明

$D=\mu\partial_\mu+\beta_\lambda\partial_\lambda+\beta_{m^2}\partial_{m^2}$ と置きます。微分を固定外線運動量で実行すると

$$
\begin{aligned}
0&=\left.\mu\frac{d\Gamma_B^{(n)}}{d\mu}\right|_{\mathrm{bare}}
=D\!\left(Z_\phi^{-n/2}\Gamma_R^{(n)}\right)\\
&=Z_\phi^{-n/2}D\Gamma_R^{(n)}
-\frac n2 Z_\phi^{-n/2}
(D\log Z_\phi)\Gamma_R^{(n)}.
\end{aligned}
$$

[異常次元の定義](#def-qft25-rg-functions)では $D\log Z_\phi=2\gamma_\phi$ です。$Z_\phi^{n/2}$ を掛ければ $D\Gamma_R^{(n)}-n\gamma_\phi\Gamma_R^{(n)}=0$ となります。ここでは外線場の係数を明示しているので、連結相関関数に対する異なる符号の方程式を無断で転用していません。
<!-- proof-end -->

### 例：既に計算した四点頂点で符号を検査

[QFT23の $\overline{\mathrm{MS}}$ 四点頂点](../QFT23/index.md#thm-qft23-msbar-counterterms)は、零運動量で一ループまで

$$
\Gamma_R^{(4)}(0)
=\lambda-\frac{3\lambda^2}{32\pi^2}
\log\frac{\mu^2}{m^2}+O(\lambda^3).
$$

明示的な $\mu$ 微分は $-3\lambda^2/(16\pi^2)$、一方 $\beta_\lambda\,\partial_\lambda\Gamma_R^{(4)}=+3\lambda^2/(16\pi^2)+O(\lambda^3)$ です。$\beta_{m^2}\partial_{m^2}$ はここでは $O(\lambda^3)$、$4\gamma_\phi$ は一ループで零です。和は $O(\lambda^3)$ で消えます。これは**発散反項から得たβの符号を、有限な頂点で独立に検算する**例です。

## 4. QED：真空偏極から電荷のβ関数へ

QEDでは光子場 $A_B=Z_3^{1/2}A_R$ と電荷 $e_B$ を区別します。ゲージ不変な方式で完全なWard–Takahashi恒等式が成り立ち、電子の頂点と波動関数のくりこみ定数が $Z_1=Z_2$ を満たすときに限り、裸電荷は $e_B=\mu^\varepsilon Z_3^{-1/2}e$ と表せます。この等式は**QFT24の二点横性だけでは証明されません**。ここでは量子Ward恒等式を保存するQED摂動論を仮定した計算として扱います。

一種類の質量 $m>0$、電荷の絶対値 $e>0$ のDirac場について、[QFT24の光子反項](../QFT24/index.md#thm-qft24-renormalized-photon)は

$$
Z_3=1-\frac{e^2}{12\pi^2}\frac1\varepsilon+O(e^4)
$$

という極を持ちます（$\overline{\mathrm{MS}}$ の付随定数は尺度微分で寄与しません）。これを固定裸電荷の微分に入れます。

<a id="thm-qft25-qed-beta"></a>

<!-- formal-statement-start -->
> **定理（QEDの一ループ電荷β関数）**
> 四次元Euclid QEDの摂動論で、一種類の質量 $m>0$ のDiracフェルミオン、次元正則化 $d=4-2\varepsilon$、ゲージ対称性を保つ $\overline{\mathrm{MS}}$ を用いる。量子Ward–Takahashi恒等式に基づく $Z_1=Z_2$ と $e_B=\mu^\varepsilon Z_3^{-1/2}e$ を仮定し、[QFT24の真空偏極反項](../QFT24/index.md#thm-qft24-renormalized-photon)で光子の $Z_3$ を決める。このとき四次元で

$$
\boxed{\beta_e=\frac{e^3}{12\pi^2}+O(e^5)},\qquad
\boxed{\gamma_A=\frac{e^2}{12\pi^2}+O(e^4)}
$$

> が成立する。ここで $\gamma_A=\frac12\mu\,d\log Z_3/d\mu|_{\mathrm{bare}}$。$\alpha=e^2/(4\pi)$ を用いれば $\beta_\alpha=2\alpha^2/(3\pi)+O(\alpha^3)$ である。このβ関数は $\overline{\mathrm{MS}}$ のUV尺度微分を表し、質量以下の測定尺度で常に同じ係数の物理的電荷変化が起こる、という主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

光子反項の極を $Z_3$ に代入し、$e_B$ を固定して $\log\mu$ で微分します。$\varepsilon$ を零とする**前に** $\beta_e^{(d)}=-\varepsilon e+O(e^3)$ を使うと、$Z_3$ の極と掛け合わされ有限の三次係数が出ます。

<!-- proof-start -->
### 証明

$a=1/(12\pi^2)$ とすると $Z_3=1-ae^2/\varepsilon+O(e^4)$ です。$m$ 依存はこの極の留数にはありません。裸電荷の対数微分により

$$
0=\varepsilon+\frac{\beta_e^{(d)}}e
-\frac12\beta_e^{(d)}\frac{\partial\log Z_3}{\partial e}
=\varepsilon+\frac{\beta_e^{(d)}}e
+\frac{ae}{\varepsilon}\beta_e^{(d)}+O(e^4).
$$

$\beta_e^{(d)}=-\varepsilon e+be^3+O(e^5)$ と置き、$e^2$ まで残すと

$$
0=\varepsilon-\varepsilon+be^2-ae^2+O(e^4),
$$

従って $b=a$ です。$\gamma_A$ は定義から

$$
\gamma_A=\frac12\beta_e^{(d)}
\left(-\frac{2ae}{\varepsilon}\right)+O(e^4)
=ae^2+O(e^4)
$$

となります。$\alpha=e^2/(4\pi)$ を微分すると

$$
\beta_\alpha=\frac{e}{2\pi}\beta_e
=\frac{e^4}{24\pi^3}
=\frac{2\alpha^2}{3\pi}
$$

です。
<!-- proof-end -->

### 二点関数からの別検算と閾値

[QFT24の零運動量減算](../QFT24/index.md#thm-qft24-renormalized-photon)では $Q^2=p^2\ge0$ として

$$
\Pi_R^{(0)}(Q^2)
=-\frac{e^2}{2\pi^2}\int_0^1x(1-x)
\log\left(1+\frac{x(1-x)Q^2}{m^2}\right)dx.
$$

$Q\gg m$ で $\int_0^1x(1-x)dx=1/6$ を使うと

$$
\Pi_R^{(0)}(Q^2)
=-\frac{e^2}{12\pi^2}\log\frac{Q^2}{m^2}+O(e^2).
$$

最後の $O(e^2)$ は $Q$ に依存しない有限定数を含み、$m^2/Q^2$ で抑えられる補正を省いています。光子逆核の係数が $1+\Pi_R^{(0)}$ という[前講のEuclid規約](../QFT24/index.md#def-qft24-photon-subtraction)を使い、短距離の電荷の二乗に対応する比を

$$
e_{\mathrm{eff}}^2(Q)=\frac{e^2}{1+\Pi_R^{(0)}(Q^2)}
$$

と一ループ精度で置きます。これを $\log Q$ で微分すると $d(e_{\mathrm{eff}}^2)/d\log Q=e^4/(6\pi^2)+O(e^6)$、すなわち $\beta_e=e^3/(12\pi^2)$ と同じ正符号です。この確認は高運動量 $Q\gg m$ の**leading log**についてであり、厳密に全運動量で同一のβ関数だという意味ではありません。

低運動量では対数を展開すると $\int_0^1x^2(1-x)^2dx=1/30$ より

$$
\Pi_R^{(0)}(Q^2)
=-\frac{e^2Q^2}{60\pi^2m^2}
+O(e^2Q^4/m^4).
$$

重い荷電粒子は $Q\ll m$ でこの観測量への寄与が抑えられます。質量独立の $\overline{\mathrm{MS}}$ のβ関数と、この**物理的な閾値での減衰**を混同しないための具体例です。

## 5. 方程式を積分すると何が分かるか

[定義した走る結合](#def-qft25-rg-equation)を実際に解きましょう。一ループのβ関数は結合の二乗または三乗なので、逆数に直して積分すると簡単です。

<a id="prop-qft25-flow-solution"></a>

<!-- formal-statement-start -->
> **命題（一ループの流れの積分と有効域）**
> 四次元の一成分実 $\phi^4$ 理論について、正の初期結合 $\lambda(\mu_0)=\lambda_0>0$、一ループ近似 $\beta_\lambda=3\lambda^2/(16\pi^2)$ を採用すると、その微分方程式の解は

$$
\boxed{
\lambda(\mu)=
\frac{\lambda_0}
{1-\frac{3\lambda_0}{16\pi^2}\log(\mu/\mu_0)}
}.
$$

> 同様に、一種類のDiracフェルミオンを持つQEDで $\alpha(\mu_0)=\alpha_0>0$、$\beta_\alpha=2\alpha^2/(3\pi)$ を採用すると

$$
\boxed{
\alpha(\mu)=
\frac{\alpha_0}
{1-\frac{2\alpha_0}{3\pi}\log(\mu/\mu_0)}
}.
$$

> どちらも分母が零になる位置まで理論を予言する公式ではない。導出は摂動展開の一ループ打切りに依存し、結合が十分小さい尺度範囲でのみ制御される。
<!-- formal-statement-end -->

### 証明の見取り図

$d\lambda/dt=b\lambda^2$ の両辺を $-\lambda^{-2}$ 倍し、逆数 $1/\lambda$ の導関数に変換します。QEDでは $\alpha$ に同じ操作をします。

<!-- proof-start -->
### 証明

$t=\log(\mu/\mu_0)$、$b=3/(16\pi^2)$ とすると

$$
\frac{d}{dt}\frac1\lambda
=-\frac1{\lambda^2}\frac{d\lambda}{dt}=-b.
$$

$t=0$ から積分して $1/\lambda(t)-1/\lambda_0=-bt$。分母を払えば第一式です。QEDは $c=2/(3\pi)$ と置くと $d(1/\alpha)/dt=-c$ なので第二式です。いずれも $t=0$ に初期値を代入すれば満たし、微分すれば元の方程式へ戻ります。
<!-- proof-end -->

一ループ解の分母が零となる形式的な尺度を **Landau極** と呼ぶことがあります。しかし $\lambda$ や $\alpha$ が大きくなる途中で打切り誤差が制御できなくなるため、極が現れることは完全な理論の特異点の証明ではありません。さらに $\phi^4$ の質量の走りは、[一ループの質量β関数](#thm-qft25-phi4-beta)と結合の式を組にして

$$
\frac{d\log m^2}{d\log\lambda}
=\frac{\lambda/(16\pi^2)}{3\lambda/(16\pi^2)}
=\frac13
$$

と計算でき、$m^2(\mu)=m_0^2[\lambda(\mu)/\lambda_0]^{1/3}$ です。これは正の $m_0^2,\lambda_0$ と一ループ近似の範囲での関係です。

## 6. 方式が違っても先頭係数は同じか

QFT23では $\overline{\mathrm{MS}}$ と零運動量減算法の結合が有限な量だけ異なりました。方式が違えば数値の付け方も異なりますが、結合の**滑らかな有限再定義**は一般に先頭の非零β係数を変えません。何が保たれるかを明示します。

<a id="prop-qft25-scheme-change"></a>

<!-- formal-statement-start -->
> **命題（有限な結合再定義と一ループ係数）**
> 四次元の質量独立な単一結合理論で、摂動的に $\beta_g=b_1g^2+O(g^3)$ とする。二つの方式の無次元結合が、尺度 $\mu$ に**明示的に依存しない**有限再定義

$$
g'=g+c g^2+O(g^3)
$$

> で結ばれ、逆関数が原点近傍で存在するとする。このとき $\beta_{g'}=b_1(g')^2+O((g')^3)$ であり、先頭の係数 $b_1$ は不変である。質量比や尺度に明示依存する再定義には、この結論をそのまま適用しない。
<!-- formal-statement-end -->

### 証明の見取り図

鎖律で $\beta_{g'}=(dg'/dg)\beta_g$ とし、$g$ を $g'$ で戻します。二次係数に影響する項がないことを確認します。

<!-- proof-start -->
### 証明

$dg'/dg=1+2cg+O(g^2)$ なので

$$
\beta_{g'}=(1+2cg+O(g^2))(b_1g^2+O(g^3))
=b_1g^2+O(g^3).
$$

逆変換は $g=g'-c(g')^2+O((g')^3)$ で、$g^2=(g')^2+O((g')^3)$ です。代入して結論を得ます。
<!-- proof-end -->

これは外部運動量を物理的に変えた結果の差と、くりこみ方式を選び直した差の区別にも役立ちます。[QFT23の零運動量結合](../QFT23/index.md#prop-qft23-dr-bubble)を質量と固定尺度の比を含む式で $\overline{\mathrm{MS}}$ へ結びつけると、質量依存のβ関数には閾値の項が生じ得ます。上の命題の「尺度に明示依存しない」という仮定を落として普遍性を主張しないでください。

## 7. 演習：極の留数から観測量まで

### 演習 QFT25-A1：固定裸量の微分

- Level: A
- 問題：$d=4-2\varepsilon$、$g_B=\mu^{2\varepsilon}g$ で反項がない模型を考える。$g_B$ を固定した $\beta_g^{(d)}$ を求め、四次元極限を述べよ。

<!-- solution-start -->
**詳細解答**

$\mu$ の全微分を取ると

$$
0=\mu\frac{dg_B}{d\mu}
=\mu^{2\varepsilon}(2\varepsilon g+\beta_g^{(d)}).
$$

$\mu>0$ より $\mu^{2\varepsilon}\ne0$ なので $\beta_g^{(d)}=-2\varepsilon g$ です。$\varepsilon\to0$ では零となります。これは相互作用補正によるβ関数ではなく、$d\ne4$ での結合の工学的次元の寄与です。
<!-- solution-end -->

### 演習 QFT25-A2：$\phi^4$ の極から係数を数える

- Level: A
- 問題：$g_B=\mu^{2\varepsilon}(g+ag^2/\varepsilon)$ とする。$g_B$ を固定した微分を二次まで行い、四次元で $\beta_g=2ag^2$ となる理由を示せ。

<!-- solution-start -->
**詳細解答**

$$
0=2\varepsilon(g+ag^2/\varepsilon)
+\beta_g^{(d)}(1+2ag/\varepsilon).
$$

$\beta_g^{(d)}=-2\varepsilon g+bg^2$ を代入すると、$g$ の一次は $2\varepsilon g-2\varepsilon g=0$、二次は $2ag^2+bg^2-4ag^2=(b-2a)g^2$ です。ゆえに $b=2a$、$\varepsilon\to0$ で $\beta_g=2ag^2$ となります。
<!-- solution-end -->

### 演習 QFT25-A3：異常次元の係数

- Level: A
- 問題：$\phi_B=Z_\phi^{1/2}\phi_R$ とし、ある模型で $Z_\phi=1+cg^2/\varepsilon+O(g^3)$、$\beta_g^{(d)}=-\varepsilon g+O(g^3)$ とする。$Z_\phi$ に明示的な $\mu$ 依存がないとき、$\gamma_\phi$ の最初の非零項を求めよ。ここでは $g$ の工学的次元の係数が $\varepsilon$ である。

<!-- solution-start -->
**詳細解答**

$\log Z_\phi=cg^2/\varepsilon+O(g^3)$ なので $\partial_g\log Z_\phi=2cg/\varepsilon+O(g^2)$。従って

$$
\gamma_\phi=\frac12\beta_g^{(d)}
\frac{\partial\log Z_\phi}{\partial g}
=\frac12(-\varepsilon g)\frac{2cg}{\varepsilon}+O(g^3)
=-cg^2+O(g^3).
$$

$-\varepsilon g$ を四次元極限より先に捨てると有限項を見失います。これは指定された仮想模型の係数であり、$\phi^4$ の一ループの $\gamma_\phi=0$ と混同しません。
<!-- solution-end -->

### 演習 QFT25-A4：QEDの低運動量係数

- Level: A
- 問題：$Q^2\ll m^2$、$\Pi_R^{(0)}(Q^2)=-e^2/(2\pi^2)\int_0^1x(1-x)\log(1+x(1-x)Q^2/m^2)\,dx$ とする。$Q^2$ に比例する項を求めよ。

<!-- solution-start -->
**詳細解答**

$u=x(1-x)Q^2/m^2$ は $0\le u\le Q^2/(4m^2)$ なので一様に小さく、$\log(1+u)=u+O(u^2)$ を積分へ用いられます。

$$
\int_0^1x^2(1-x)^2dx
=\int_0^1(x^2-2x^3+x^4)dx
=\frac13-\frac12+\frac15=\frac1{30}.
$$

従って $\Pi_R^{(0)}=-e^2Q^2/(60\pi^2m^2)+O(e^2Q^4/m^4)$ です。定数項は零で、重い質量で抑えられます。
<!-- solution-end -->

### 演習 QFT25-A5：RG方程式の外線係数

- Level: A
- 問題：$\Gamma_R^{(n)}=Z_\phi^{n/2}\Gamma_B^{(n)}$ とし、裸頂点を固定したとき $\mu\,d\Gamma_B^{(n)}/d\mu=0$。$\mu\,d\log Z_\phi/d\mu=2\gamma_\phi$ から $n=2,4$ のRG方程式の異常次元項の係数と符号を求めよ。

<!-- solution-start -->
**詳細解答**

$\Gamma_B^{(n)}=Z_\phi^{-n/2}\Gamma_R^{(n)}$ を微分すると $0=Z_\phi^{-n/2}(D\Gamma_R^{(n)}-n\gamma_\phi\Gamma_R^{(n)})$ です。従って二点では $D\Gamma_R^{(2)}-2\gamma_\phi\Gamma_R^{(2)}=0$、四点では $D\Gamma_R^{(4)}-4\gamma_\phi\Gamma_R^{(4)}=0$ です。負号は裸頂点を $Z_\phi^{-n/2}$ 倍で表したことから出ます。
<!-- solution-end -->

### 演習 QFT25-B1：四点頂点でβ関数を再導出

- Level: B
- 問題：$\Gamma_R^{(4)}(0)=\lambda-(3\lambda^2/32\pi^2)\log(\mu^2/m^2)+O(\lambda^3)$ とする。$\gamma_\phi=O(\lambda^2)$、$\beta_{m^2}=O(\lambda m^2)$ に注意し、[1PI頂点のRG方程式](#thm-qft25-vertex-rg-equation)から一ループ $\beta_\lambda$ を求めよ。$m^2$ 微分がこの次数で寄与しないことも示せ。

<!-- solution-start -->
**詳細解答**

まず偏微分では結合・質量を固定するので

$$
\mu\partial_\mu\Gamma_R^{(4)}
=-\frac{3\lambda^2}{16\pi^2}+O(\lambda^3).
$$

$\partial_\lambda\Gamma_R^{(4)}=1+O(\lambda)$ で、$\partial_{m^2}\Gamma_R^{(4)}=+3\lambda^2/(32\pi^2m^2)+O(\lambda^3)$ です。これに $\beta_{m^2}=O(\lambda m^2)$ を掛ければ $O(\lambda^3)$。$\gamma_\phi=O(\lambda^2)$ に $\Gamma_R^{(4)}=O(\lambda)$ を掛けても $O(\lambda^3)$ です。二次では $0=-3\lambda^2/(16\pi^2)+\beta_\lambda$ なので $\beta_\lambda=3\lambda^2/(16\pi^2)+O(\lambda^3)$ です。
<!-- solution-end -->

### 演習 QFT25-B2：走る質量を走る結合で表す

- Level: B
- 問題：$d\lambda/dt=3\lambda^2/(16\pi^2)$、$dm^2/dt=\lambda m^2/(16\pi^2)$、$\lambda(0)=\lambda_0>0$、$m^2(0)=m_0^2>0$ とする。$m^2(t)$ を $\lambda(t)$ だけで表し、二つの初期値と微分方程式を検算せよ。

<!-- solution-start -->
**詳細解答**

二式をそれぞれ $\lambda$、$m^2$ で割ると

$$
\frac{d\log\lambda}{dt}=\frac{3\lambda}{16\pi^2},
\qquad
\frac{d\log m^2}{dt}=\frac{\lambda}{16\pi^2}.
$$

従って $d\log m^2/d\log\lambda=1/3$ です。$t=0$ から積分すると $\log(m^2/m_0^2)=\frac13\log(\lambda/\lambda_0)$、ゆえに $m^2=m_0^2(\lambda/\lambda_0)^{1/3}$。$t=0$ で $m_0^2$、また

$$
\frac{d m^2}{dt}
=\frac{m^2}{3\lambda}\frac{d\lambda}{dt}
=\frac{m^2}{3\lambda}\frac{3\lambda^2}{16\pi^2}
=\frac{\lambda m^2}{16\pi^2}
$$

で原式を満たします。
<!-- solution-end -->

### 演習 QFT25-B3：QEDの高運動量対数と電荷

- Level: B
- 問題：$Q\gg m$ で $\Pi_R^{(0)}(Q^2)=-e^2\log(Q^2/m^2)/(12\pi^2)+O(e^2)$ とする。$e_{\mathrm{eff}}^2=e^2/(1+\Pi_R^{(0)})$ を一次の真空偏極精度で微分し、$\beta_e$ の係数を得よ。なぜ $Q\ll m$ では同じleading-log近似を使えないか述べよ。

<!-- solution-start -->
**詳細解答**

$L=\log(Q^2/m^2)$、$a=1/(12\pi^2)$ と置くと

$$
e_{\mathrm{eff}}^2
=e^2(1-ae^2L)^{-1}
=e^2+ae^4L+O(e^6).
$$

$dL/d\log Q=2$ なので $d e_{\mathrm{eff}}^2/d\log Q=2ae^4+O(e^6)$。一方 $d e_{\mathrm{eff}}^2/d\log Q=2e_{\mathrm{eff}}\beta_{e_{\mathrm{eff}}}$ だから、先頭次数で $\beta_e=ae^3=e^3/(12\pi^2)$ です。$Q\ll m$ では[低運動量展開](#thm-qft25-qed-beta)の対数は $Q^2/m^2$ の冪級数に置き換わり、$L$ の支配項を仮定できません。
<!-- solution-end -->

### 演習 QFT25-B4：有限再定義の有効条件

- Level: B
- 問題：$\beta_g=b_1g^2+b_2g^3+O(g^4)$、$g'=g+cg^2+O(g^3)$ とし、$c$ は $\mu$ に依存しない定数とする。$g'$ のβ関数の二次係数を求めよ。さらに $c=c(\mu)$ とすれば鎖律のどこに追加項が出るか示せ。

<!-- solution-start -->
**詳細解答**

$c$ が一定なら

$$
\beta_{g'}=(1+2cg+O(g^2))(b_1g^2+b_2g^3+O(g^4))
=b_1g^2+O(g^3).
$$

$g=g'-c(g')^2+O((g')^3)$ なので二次は $b_1(g')^2$ です。一方 $c=c(\mu)$ なら固定 $g$ での明示的尺度依存を含める必要があり

$$
\beta_{g'}=
\frac{\partial g'}{\partial g}\beta_g
+\left.\mu\frac{\partial g'}{\partial\mu}\right|_g
=\frac{\partial g'}{\partial g}\beta_g
+\mu\frac{dc}{d\mu}g^2+O(g^3).
$$

追加項は二次係数を変え得ます。質量依存方式への不用意な「普遍性」の適用はできません。
<!-- solution-end -->

### 演習 QFT25-C1：二種類の「尺度」と一ループ流の総合検算

- Level: C
- 問題：$d=4-2\varepsilon$ の一成分 $\phi^4$ の裸結合を $\lambda_B=\mu^{2\varepsilon}[\lambda+3\lambda^2/(32\pi^2\varepsilon)]+O(\lambda^3)$、一ループの零運動量四点頂点を $\Gamma_R^{(4)}(0)=\lambda-(3\lambda^2/32\pi^2)\log(\mu^2/m^2)+O(\lambda^3)$ とする。初期尺度 $\mu_0$ における値は $\lambda_0>0$ とする。

  1. 裸結合の微分から四次元β関数を導け。
  2. 得たβ関数を解き $\lambda(\mu)$ を求め、$\lambda_0\ll1$ の下でその二次までの展開を示せ。
  3. $m$ の走りによる寄与次数を見積もり、(2) の走る結合を四点頂点へ代入すると $\mu$ の任意性が一ループ精度で相殺されることを確認せよ。
  4. この一致を「外線運動量を $\mu_0$ から $\mu$ へ変えたら必ず同じ増加を測る」と言い換えてよいか、仮定・方式・適用限界を示して判定せよ。

<!-- solution-start -->
**詳細解答**

(1) $a=3/(32\pi^2)$ とし、$\beta_\lambda^{(d)}=-2\varepsilon\lambda+b\lambda^2$ と置きます。固定裸結合で

$$
\begin{aligned}
0&=2\varepsilon(\lambda+a\lambda^2/\varepsilon)
+(-2\varepsilon\lambda+b\lambda^2)(1+2a\lambda/\varepsilon)
+O(\lambda^3)\\
&=(b-2a)\lambda^2+O(\lambda^3)
\end{aligned}
$$

より $b=2a=3/(16\pi^2)$ です。極を消す前に $-\varepsilon$ の項を落としてはいけません。

(2) $t=\log(\mu/\mu_0)$ と置くと $d(1/\lambda)/dt=-b$ です。従って

$$
\lambda(\mu)=\frac{\lambda_0}{1-b\lambda_0t}
=\lambda_0+b\lambda_0^2t+O(\lambda_0^3t^2)
$$

です。展開は $|b\lambda_0t|\ll1$ の範囲で行います。

(3) [質量のβ関数](#thm-qft25-phi4-beta)は $\beta_{m^2}=O(\lambda m^2)$ なので、四点頂点の一ループの質量対数 $O(\lambda^2)\log m^2$ の $\mu$ 微分への寄与は $O(\lambda^3)$ です。従って $m^2$ は表示する二次まで $m_0^2$ を使えます。(2) を代入して

$$
\begin{aligned}
\Gamma_R^{(4)}(0;\mu)
&=\lambda_0+b\lambda_0^2\log\frac{\mu}{\mu_0}
-\frac{b\lambda_0^2}{2}
\log\frac{\mu^2}{m_0^2}
+O(\lambda_0^3)\\
&=\lambda_0-\frac{b\lambda_0^2}{2}
\log\frac{\mu_0^2}{m_0^2}
+O(\lambda_0^3).
\end{aligned}
$$

右辺に $\mu$ は残りません。これは裸の理論を固定したときの**任意のくりこみ尺度への非依存性**を、二つの経路で確認した結果です。

(4) いいえ。(3) は**外部運動量を零に固定**して $\mu$ を変えた計算です。実際の外部運動量 $Q$ の変化は、[QFT23のbubble差](../QFT23/index.md#prop-qft23-dr-bubble)など別の関数へ $Q$ を代入して計算します。$Q\gg m$ でleading logをまとめる際には $\mu\sim Q$ が有用ですが、低運動量の閾値、方式による有限項、結合が大きい領域では単純な一ループ走りだけで観測量全体を置き換えられません。
<!-- solution-end -->

## 8. 学びの整理

- [β関数・異常次元](#def-qft25-rg-functions)は、裸パラメータを固定した $\mu$ 微分として定義します。$\mu$ と外線運動量を混ぜません。
- [実スカラー $\phi^4$ の一ループβ](#thm-qft25-phi4-beta)では $\beta_\lambda>0$、$\beta_{m^2}>0$（$\lambda,m^2>0$）、場の異常次元はその次数で零です。
- [1PI頂点のくりこみ群方程式](#thm-qft25-vertex-rg-equation)は、有限な計算結果からもβの係数と符号を検算できます。
- [QEDの一ループβ](#thm-qft25-qed-beta)の導出では、二点横性より強い量子Ward恒等式の仮定を明示しました。正のβと低エネルギーでの重い粒子の抑制は両立します。
- [一ループの流れ](#prop-qft25-flow-solution)の形式的な極を、理論の実在する特異点の証明と取り違えません。

次は、運動量を段階的に積分消去するWilson流、関連・無関連・周辺演算子へ進みます。ここでの $\mu$ の変化とWilson流のカットオフの変化が、どの範囲で同じ物理を記述するかを改めて検討します。
