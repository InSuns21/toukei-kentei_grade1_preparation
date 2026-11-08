# OTR24 時間刻みをゼロにすると何が得られるか

[OTR23の一歩の弱い方程式](../OTR23/index.md#thm-otr23-weak-step)では、JKO最小化の差分が熱・Fokker–Planck方程式に似ていることを、**消えない二次のTaylor残差**まで含めて証明しました。[時間補間の評価](../OTR23/index.md#thm-otr23-interpolation-estimate)からは、残差を有限時間だけ足すと $O(\tau)$ で消えることも分かっています。

しかし、残差が消えても、差分式の測度が何かに収束する保証はありません。また、収束先が二つあるかもしれません。今回はこの二つの穴を、**コンパクト性による極限の存在 → 弱方程式への移行 → 解の一意性**の順に埋めます。

空間は $\mathbb R^d$（$d\ge1$）、$\mathcal P_2=\mathcal P_2(\mathbb R^d)$ は有限二次モーメントの確率測度、$W_2$ は[二次Wasserstein距離](../OTR8/index.md#def-otr8-wasserstein)とします。一般の相互作用を持つ非線形方程式ではなく、$a=1$、$W=0$、$V(x)=\lambda|x|^2/2$（$\lambda>0$）を採用します。この選択なら、質量が無限遠へ逃げないことをエネルギーから証明でき、最後には解も明示できます。

## 1. モデルを固定し、質量が逃げないことを示す

密度が広がろうとする熱エントロピーと、原点へ引き戻す二次外場を競わせます。[OTR21の自由エネルギー](../OTR21/index.md#def-otr21-free-energy)を次のように特殊化します。密度 $\rho$ を持つ $\mu=\rho\,dx\in\mathcal P_2$ で $\int\rho\log\rho$ が有限なら

$$
\mathcal F(\mu)=\int_{\mathbb R^d}\rho\log\rho\,dx
+\frac{\lambda}{2}\int_{\mathbb R^d}|x|^2\,d\mu(x).
$$

それ以外では $\mathcal F(\mu)=+\infty$ とします。以下の初期値は $\mu^0\in\mathcal P_2$ かつ $\mathcal F(\mu^0)<\infty$ とし、時間刻み $\tau>0$ ごとに[OTR22のJKO反復](../OTR22/index.md#def-otr22-jko-step)で $\mu_\tau^0=\mu^0,\mu_\tau^1,\ldots$ を作ります。

単に $\int\rho\log\rho$ を下から定数で抑えることは $\mathbb R^d$ ではできません。そこで密度をGaussianと比較して二次モーメントを取り出します。

確率測度 $\gamma$ に対する相対エントロピー $D(\mu\Vert\gamma)$ は、$\mu\ll\gamma$ なら

$$
D(\mu\Vert\gamma)=\int\log\left(\frac{d\mu}{d\gamma}\right)\,d\mu
$$

で、それ以外では $+\infty$ です。[相対エントロピーの非負性と下半連続性](../OTR22/index.md#lem-otr22-relative-entropy-lsc)を使います。

以下、$I_d$ は $d$ 次単位行列です。共分散が $\sigma^2I_d$ のGaussianは、各座標が独立な $N(0,\sigma^2)$ です。

<a id="lem-otr24-coercivity"></a>

<!-- formal-statement-start -->
> **補題（二次外場エネルギーの下界と一様モーメント）**  
> $d\ge1$、$\lambda>0$ とし、$\mathcal F$ を上の式で定める。$\gamma_{\lambda/2}$ を、平均 $0$、共分散行列 $(2/\lambda)I_d$ のGaussian確率測度とし、

$$
c_\lambda=\frac d2\log\frac{\lambda}{4\pi},\qquad
M_2(\mu)=\int|x|^2\,d\mu(x)
$$

> と置く。有限エネルギーの任意の $\mu\in\mathcal P_2$ に対して

$$
\mathcal F(\mu)
=D(\mu\Vert\gamma_{\lambda/2})
+\frac{\lambda}{4}M_2(\mu)+c_\lambda
\ge\frac{\lambda}{4}M_2(\mu)+c_\lambda.
$$

> 特に $E_0=\mathcal F(\mu^0)-c_\lambda\ge0$ とすると、全てのJKO最小化解に対して

$$
M_2(\mu_\tau^k)\le\frac{4E_0}{\lambda},\qquad
\sum_{k=1}^{N}\frac{W_2^2(\mu_\tau^k,\mu_\tau^{k-1})}{\tau}
\le 2E_0
$$

> が全ての $\tau>0$、$N\ge1$ で成立する。各JKO一歩は存在し、有限エネルギーを持つ。
<!-- formal-statement-end -->

### 証明の見取り図

比較するGaussianの精度（共分散の逆数）を $\lambda/2$ にすると、エントロピーの負の二次項を外場が上回り、二次モーメントが正の係数で残ります。一歩の存在には相対エントロピーの狭義下半連続性を、移動距離には離散散逸を使います。

<!-- proof-start -->
### 証明

$\gamma_{\lambda/2}$ は各座標の分散が $2/\lambda$ の独立Gaussianです。各一次元密度 $\sqrt{\lambda/(4\pi)}e^{-\lambda x_i^2/4}$ の積を取り、$|x|^2=\sum_{i=1}^dx_i^2$ を使うと、その密度は

$$
g(x)=\left(\frac{\lambda}{4\pi}\right)^{d/2}
\exp\left(-\frac{\lambda}{4}|x|^2\right).
$$

従って $\mu=\rho\,dx$ について相対エントロピーの定義へ $\log g=c_\lambda-\lambda|x|^2/4$ を代入すると

$$
\begin{aligned}
D(\mu\Vert\gamma_{\lambda/2})
&=\int\rho(\log\rho-\log g)\,dx\\
&=\int\rho\log\rho\,dx-c_\lambda+\frac\lambda4M_2(\mu).
\end{aligned}
$$

これを $\mathcal F$ の式へ代入すると等式が出ます。相対エントロピーは非負なので下界も従います。非負性の適用条件は $\mu$ が有限エネルギーの密度を持ち、$g>0$ であることです。

一歩の存在については、$\mathcal F=D(\,\cdot\,\Vert\gamma_{\lambda/2})+(\lambda/4)M_2+c_\lambda$ です。[相対エントロピーの狭義下半連続性](../OTR22/index.md#lem-otr22-relative-entropy-lsc)と非負・下半連続な $|x|^2$ の積分の下半連続性により $\mathcal F$ は狭義下半連続です。上の下界から二次モーメントを制御でき、初期値自身が有限値の競争相手になります。従って[OTR22の直接法による存在定理](../OTR22/index.md#thm-otr22-existence)の条件が各段階で満たされます。

[OTR22の離散エネルギー不等式](../OTR22/index.md#prop-otr22-energy)へ、前状態 $\mu_\tau^{k-1}$ を競争相手として代入すると

$$
\frac{W_2^2(\mu_\tau^k,\mu_\tau^{k-1})}{2\tau}
\le\mathcal F(\mu_\tau^{k-1})-\mathcal F(\mu_\tau^k).
$$

右辺を $k=1,\ldots,N$ で足すと望遠和になり、$\mathcal F(\mu_\tau^N)\ge c_\lambda$ を代入して距離の評価を得ます。また $\mathcal F(\mu_\tau^k)\le\mathcal F(\mu^0)$ と先ほどの下界を合わせると $\lambda M_2(\mu_\tau^k)/4\le E_0$ です。$\square$
<!-- proof-end -->

**数値を代入する例**。$d=1,\lambda=2$ では $c_\lambda=-\frac12\log(2\pi)$、比較測度は $N(0,1)$ です。$N(0,1)$ 自身の自由エネルギーは $-\frac12\log(2\pi e)+1=c_\lambda+\frac12$ で、下界 $c_\lambda+\frac12M_2$ の**等号**を達成します。ここでの一様評価は各刻みについてのもので、確率密度の各点での上界ではありません。

## 2. どの意味で方程式を解くのか

極限は点ごとに微分可能な密度を持つとは限りません。最初から密度の偏微分を要求すると、コンパクト性で得た測度を解と呼べなくなります。[OTR17の測度の弱形式](../OTR17/index.md#def-otr17-measure-weak)に合わせ、滑らかなコンパクト支持の試験関数 $\varphi$ に積分してから時間を進めます。

ここで $C_c^\infty(\mathbb R^d)$ は滑らかでコンパクト支持の実数値関数、$\nabla$ と $\Delta$ は空間微分です。後で繰り返し使う作用素を

$$
L\varphi(x)=\Delta\varphi(x)-\lambda x\cdot\nabla\varphi(x)
$$

と書きます。$L\varphi$ もコンパクト支持の連続関数なので有界です。$\mu_t$ が時刻とともに**狭義連続**とは、任意の有界連続な $f$ について $t\mapsto\int f\,d\mu_t$ が連続なことです。

<a id="def-otr24-weak-solution"></a>

<!-- formal-statement-start -->
> **定義（二次モーメント有界なFokker–Planck弱解）**  
> $T>0$、$\lambda>0$、$\mu^0\in\mathcal P_2(\mathbb R^d)$ とする。狭義連続な曲線 $t\mapsto\mu_t\in\mathcal P_2(\mathbb R^d)$ が

$$
\sup_{0\le t\le T}\int|x|^2\,d\mu_t(x)<\infty
$$

> を満たし、全ての $\varphi\in C_c^\infty(\mathbb R^d)$ と $t\in[0,T]$ に対して

$$
\int\varphi\,d\mu_t-\int\varphi\,d\mu^0
=\int_0^t\!\int L\varphi(x)\,d\mu_s(x)\,ds
$$

> を満たすとき、$\mu_t$ を初期値 $\mu^0$ に対する方程式

$$
\partial_t\mu=\Delta\mu+\lambda\nabla\cdot(x\mu)
$$

> の**二次モーメント有界な測度弱解**という。最後の式は測度の分布微分としての略記であり、密度が存在するとは仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr24-weak-solution -->
**定義の確認**。$d=1$、$\lambda>0$、初期値が密度 $N(0,\lambda^{-1})$ なら $\mu_t=\mu^0$ と置けます。その密度 $g(x)=\sqrt{\lambda/(2\pi)}e^{-\lambda x^2/2}$ では $g'=-\lambda xg$ なので

$$
\int(\varphi''-\lambda x\varphi')g\,dx
=-\int\varphi'g'\,dx-\lambda\int x\varphi'g\,dx=0.
$$

左辺の時間差もゼロであり、二次モーメントは $\lambda^{-1}$、狭義連続性も定数曲線から従います。従って定義の**全条件**を満たします。
<!-- definition-example-end -->

この弱解を作るには、各刻みの測度を時間に沿って並べ、その曲線から収束する部分列を取り出します。

## 3. 時間補間から収束部分列を取り出す

[OTR23の階段状補間と測地線補間](../OTR23/index.md#def-otr23-time-interpolations)をそれぞれ $\bar\mu_\tau(t)$、$\widetilde\mu_\tau(t)$ とします。固定した $T>0$ について $N_\tau=\lceil T/\tau\rceil$ ステップ作り、$[0,T]$ に制限します。後者は時刻に関して連続で、[OTR23の時間評価](../OTR23/index.md#thm-otr23-interpolation-estimate)から

$$
\begin{aligned}
W_2(\widetilde\mu_\tau(s),\widetilde\mu_\tau(t))
&\le\sqrt{2E_0}\sqrt{|t-s|},\\
\sup_{0\le t\le T}W_2(\bar\mu_\tau(t),\widetilde\mu_\tau(t))
&\le\sqrt{2\tau E_0}.
\end{aligned}
$$

**各時刻の確率測度の緊密性**も必要です。移動先の確率が無限遠へ逃げると、時間だけが滑らかでも極限を持てません。一様二次モーメントから任意の $R>0$ に対して

$$
\mu_\tau^k(\{|x|>R\})
\le\frac1{R^2}\int|x|^2d\mu_\tau^k
\le\frac{4E_0}{\lambda R^2}
$$

となります。これは[OTR3のProkhorovのコンパクト性定理](../OTR3/index.md#thm-otr3-prokhorov)につながる具体的な評価です。測地線補間の二次モーメントも、$z=(1-\theta)y+\theta x$ に対する $|z|^2\le(1-\theta)|y|^2+\theta|x|^2$ から同じ上界です。

<a id="thm-otr24-compactness"></a>

<!-- formal-statement-start -->
> **定理（JKO時間補間の狭義コンパクト性）**  
> $d\ge1$、$\lambda>0$、$T>0$、$\mu^0\in\mathcal P_2$、$\mathcal F(\mu^0)<\infty$ とする。$\tau_n\downarrow0$ に対し上記JKO反復の二種類の補間を $[0,T]$ に作ると、ある部分列と狭義連続な曲線 $\mu:[0,T]\to\mathcal P_2$ が存在して、任意の有界連続な $f$ について

$$
\sup_{0\le t\le T}\left|
\int f\,d\bar\mu_{\tau_n}(t)-\int f\,d\mu_t
\right|\longrightarrow0
$$

> がその部分列上で成立する。$\widetilde\mu_{\tau_n}$ についても同じ収束を持ち、$\mu_0=\mu^0$ である。また

$$
\sup_{t\in[0,T]}M_2(\mu_t)\le\frac{4E_0}{\lambda},\qquad
W_2(\mu_s,\mu_t)\le\sqrt{2E_0}\sqrt{|t-s|}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

有理時刻では測度族の一様緊密性から部分列を取れます。可算個の有理時刻で共通の部分列になるよう対角線を選び、時間についての平方根型の距離評価によって無理時刻へ延長します。最後に[輸送費用の下半連続性](../OTR22/index.md#lem-otr22-w2-lsc)で極限曲線の距離も抑えます。

<!-- proof-start -->
### 証明

1. **有理時刻で選ぶ**。$[0,T]$ の有理数と端点を $r_1,r_2,\ldots$ と列挙します。

   固定した時刻 $r_j$ では二次モーメント評価から、$\widetilde\mu_{\tau_n}(r_j)$ が一様に緊密な測度族をなします。[Prokhorovの定理](../OTR3/index.md#thm-otr3-prokhorov)で $r_1$ に関する狭義収束部分列を選び、その中から $r_2$ に関する部分列を選ぶ操作を繰り返します。

   第 $n$ 番目の部分列の第 $n$ 項を取る対角選択で、全ての $r_j$ において同時に狭義収束する部分列を得ます。
2. **全時刻へ延ばす**。有界な1-Lipschitz関数 $f$ について、[結合から得られる積分差の評価](../OTR8/index.md#def-otr8-wasserstein)により

$$
\left|\int f\,d\widetilde\mu_{\tau_n}(t)
-\int f\,d\widetilde\mu_{\tau_n}(r)\right|
\le W_2(\widetilde\mu_{\tau_n}(t),\widetilde\mu_{\tau_n}(r))
\le\sqrt{2E_0}\sqrt{|t-r|}.
$$

   時刻 $t$ から距離 $\delta$ 以内の有理時刻を選ぶと、対角部分列の積分値は時刻 $t$ でもCauchyになります。さらに有限個の有理時刻で $[0,T]$ を被覆すれば、上式と三角不等式で一様Cauchyを得ます。

   各 $t$ の測度列も一様緊密です。[Prokhorovのコンパクト性定理](../OTR3/index.md#thm-otr3-prokhorov)を適用して狭義極限 $\mu_t$ を得ます。1-Lipschitz試験関数の極限積分値は一意なので、どの収束部分列からも同じ $\mu_t$ が出ます。

   二次モーメントの下半連続性から $\mu_t\in\mathcal P_2$ です。
3. **試験関数を広げる**。二次モーメント評価から、補間と極限の全測度について $\{|x|>R\}$ の質量は $O(R^{-2})$ です。有界連続な $f$ は閉球上で一様連続なので、そこで任意の精度の有界Lipschitz関数で近似し、球外の積分は質量の上界で抑えられます。したがって任意の有界連続 $f$ に対して、全時刻で一様な積分収束が成立し、$t\mapsto\int f\,d\mu_t$ も連続です。
4. **距離と二つの補間**。各 $s,t$ における狭義収束と[二次費用の下半連続性](../OTR22/index.md#lem-otr22-w2-lsc)から

$$
W_2^2(\mu_s,\mu_t)
\le\liminf_nW_2^2(\widetilde\mu_{\tau_n}(s),\widetilde\mu_{\tau_n}(t))
\le2E_0|t-s|.
$$

   $\widetilde\mu_\tau(0)=\mu^0$ なので $\mu_0=\mu^0$。最後に補間間の $W_2$ 距離が $\sqrt{2\tau_nE_0}\to0$ となることを、上の有界Lipschitz試験関数評価に適用すれば、階段状補間も同じ極限へ一様狭義収束します。$\square$
<!-- proof-end -->

ここで得たのは**狭義収束**です。二次モーメントの一様有界性だけから、近似列の $W_2$ 収束まで言うことはできません。後の演習で、狭義収束しても二次モーメントが極限へ収束しない例を確認します。

## 4. 離散方程式を極限へ渡す

コンパクト性で得た曲線が本当に方程式を満たすかは、差分式を全時刻で足して初めて分かります。一歩の[弱いEuler–Lagrange計算](../OTR23/index.md#thm-otr23-weak-step)を $a=1$、$W=0$、$V(x)=\lambda|x|^2/2$ へ特殊化すると、各ステップで

$$
\int\varphi\,d\mu_\tau^k-\int\varphi\,d\mu_\tau^{k-1}
=\tau\int L\varphi\,d\mu_\tau^k+R_k(\varphi),
\qquad
|R_k(\varphi)|\le\frac12\|D^2\varphi\|_\infty a_k^2,
$$

ここで $a_k=W_2(\mu_\tau^k,\mu_\tau^{k-1})$ です。重要なのは、一歩ごとの $R_k/\tau$ が小さいと仮定していないことです。

<a id="thm-otr24-weak-limit"></a>

<!-- formal-statement-start -->
> **定理（JKO極限はFokker–Planck弱解）**  
> [コンパクト性定理](#thm-otr24-compactness)と同じ $d,\lambda,T,\mu^0$ とJKO反復を考える。その定理で得られた任意の狭義収束部分列の極限曲線 $\mu_t$ は、[二次モーメント有界な測度弱解](#def-otr24-weak-solution)である。さらに全ての $t\in[0,T]$ について $\mathcal F(\mu_t)\le\mathcal F(\mu^0)$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

刻みの上端 $m\tau$ まで望遠和を作り、最後の端数 $m\tau-t$ を別に抑えます。累積Taylor残差は $O(\tau)$、端数も $O(\tau)$ です。主項の $L\varphi$ は有界連続なので狭義収束で積分を極限へ移せます。

<!-- proof-start -->
### 証明

$0<t\le T$、$m=\lceil t/\tau\rceil$ とすると $0\le m\tau-t<\tau$ です。上の一歩の式を $k=1,\ldots,m$ で足し、階段状補間の定義へ戻すと

$$
\int\varphi\,d\bar\mu_\tau(t)-\int\varphi\,d\mu^0
=\int_0^{m\tau}\int L\varphi\,d\bar\mu_\tau(s)\,ds
+\sum_{k=1}^{m}R_k(\varphi).
$$

[一様散逸評価](#lem-otr24-coercivity)から $\sum_{k=1}^m a_k^2\le2\tau E_0$ なので

$$
\left|\sum_{k=1}^mR_k(\varphi)\right|
\le\tau E_0\|D^2\varphi\|_\infty.
$$

さらに $L\varphi$ は有界で、最後の端数の積分は

$$
\left|\int_t^{m\tau}\int L\varphi\,d\bar\mu_\tau(s)\,ds\right|
\le\tau\|L\varphi\|_\infty.
$$

従って全ての $t\in[0,T]$ について

$$
\left|\int\varphi\,d\bar\mu_\tau(t)-\int\varphi\,d\mu^0
-\int_0^t\int L\varphi\,d\bar\mu_\tau(s)\,ds\right|
\le\tau\bigl(E_0\|D^2\varphi\|_\infty+\|L\varphi\|_\infty\bigr).
$$

$t=0$ では左辺は0です。[コンパクト性定理](#thm-otr24-compactness)で $\bar\mu_{\tau_n}(s)\to\mu_s$ が全時刻で一様狭義収束するため、試験関数 $L\varphi$ の積分も $s$ に関して一様に収束します。時間積分の差は $T$ 倍の一様誤差以下であり、右辺は $\tau_n\to0$ でゼロです。ゆえに弱解の等式が成立し、狭義連続性・二次モーメント評価・初期値は既に前定理で確認済みです。

最後に[相対エントロピーの狭義下半連続性](../OTR22/index.md#lem-otr22-relative-entropy-lsc)と $M_2$ の下半連続性により $\mathcal F$ は狭義下半連続です。$\mathcal F(\bar\mu_\tau(t))\le\mathcal F(\mu^0)$ と各固定時刻での狭義収束から $\mathcal F(\mu_t)\le\mathcal F(\mu^0)$ を得ます。$\square$
<!-- proof-end -->

まだ極限は**部分列ごと**かもしれません。その可能性を排除するのが次の一意性です。

## 5. 後退する試験関数で一意性を示す

弱解の等式は空間に関する試験関数を時間に依存させても使えます。実際、$s\mapsto\int f\,d\mu_s$ は $f\in C_c^\infty$ に対して絶対連続で、その導関数は $\int Lf\,d\mu_s$ です。まず $\psi(s,x)=h(s)f(x)$ に[積の微分公式](../../../基礎科目/RA/RA3/index.md#prop-ra3-product-rule)を使うと、$f$ は時間に依存せず、$L$ は空間変数 $x$ にのみ作用するので

$$
\frac{d}{ds}\int h(s)f(x)\,d\mu_s(x)
=h'(s)\int f\,d\mu_s+h(s)\int Lf\,d\mu_s
$$

がほとんど全ての $s$ で成立します。有限和へ広げ、空間支持が一つのコンパクト集合に収まる滑らかな $\psi$ を有限和で近似すると

$$
\int\psi(t,x)\,d\mu_t-\int\psi(0,x)\,d\mu^0
=\int_0^t\!\int(\partial_s\psi+L\psi)(s,x)\,d\mu_s\,ds
$$

が得られます。近似は $\psi$ とその時間微分・空間一、二階微分をコンパクト領域上で一様に行えばよく、積分交換は確率測度の全質量1から正当化されます。

解の情報を時刻 $t$ から時刻0へ戻したいので、$L$ に従って**逆向きに変化する試験関数**を作ります。この試験関数は粒子の分布を直接時間発展させるのではなく、最終時刻に測りたい関数を過去へ運ぶものです。

$Z$ を平均0・共分散 $I_d$ の標準Gaussian確率ベクトルとし、$q(t)=(1-e^{-2\lambda t})/\lambda$ とします。

<a id="def-otr24-ou-semigroup"></a>

<!-- formal-statement-start -->
> **定義（Ornstein–Uhlenbeckの後退作用素）**  
> $\lambda>0$ とする。有界連続な関数 $f:\mathbb R^d\to\mathbb R$ と $t\ge0$ に対し

$$
(P_tf)(x)=
\mathbb E\!\left[f\left(e^{-\lambda t}x+\sqrt{q(t)}Z\right)\right],
\qquad
q(t)=\frac{1-e^{-2\lambda t}}{\lambda}
$$

> と定める。$P_0f=f$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr24-ou-semigroup -->
**定義の確認**。$f(x)=\cos(u\cdot x)$（$u\in\mathbb R^d$）とします。[Gaussian Fourier恒等式](../../F0/F0-00P6/index.md#lem-f0-00p6-gaussian-fourier)から得られる標準正規分布の特性関数を各独立成分へ適用すると、$\mathbb E[e^{i\sqrt{q(t)}u\cdot Z}]=e^{-q(t)|u|^2/2}$ です。その実部を取って

$$
P_tf(x)=\cos(e^{-\lambda t}u\cdot x)
\exp\left(-\frac12q(t)|u|^2\right).
$$

$P_0f=f$、$|P_tf|\le1$ です。また $u=0$ なら $P_t1=1$ です。

一般の有界連続な $f$ でも、確率変数の引数は $x$ に連続に依存するので[Lebesgueの優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)から $P_tf$ は連続です。期待値の定義から

$$
|P_tf|\le\|f\|_\infty,\qquad f\ge0\ \Longrightarrow\ P_tf\ge0
$$

です。これで有界連続関数を有界連続関数へ写し、定数1と非負性を保つことまで確かめられました。$f$ にコンパクト支持は不要です。
<!-- definition-example-end -->

<a id="lem-otr24-backward"></a>

<!-- formal-statement-start -->
> **補題（Gaussian表示から得る後退方程式）**  
> $d\ge1$、$\lambda>0$、$f\in C_c^\infty(\mathbb R^d)$ とする。$u(t,x)=P_tf(x)$ は $t\ge0$ で空間二階・時間一階の連続導関数を持ち、

$$
\partial_tu(t,x)=\Delta_xu(t,x)-\lambda x\cdot\nabla_xu(t,x)
=Lu(t,x).
$$

> また全ての $t\ge0$ で

$$
\|u(t)\|_\infty\le\|f\|_\infty,\qquad
\|\nabla u(t)\|_\infty\le\|\nabla f\|_\infty,\qquad
\|D^2u(t)\|_\infty\le\|D^2 f\|_\infty.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$P_tf$ は「空間を $e^{-\lambda t}$ 倍に縮めてから、分散 $q(t)$ のGaussianで平均する」形です。Gaussian平均の分散微分はLaplacianの半分になり、縮小の微分は $-\lambda x\cdot\nabla$ を作ります。

<!-- proof-start -->
### 証明

$G(q,z)=\mathbb E[f(z+\sqrt q Z)]$（$q>0$）と置きます。以下、$q',b'$ はそれぞれ一変数関数 $q(t),b(t)$ の $d/dt$、$\partial_tu$ は空間点 $x$ を固定した時間偏微分、$\nabla_zG$ と $\Delta_zG$ は $q$ を固定した $z$ に関する微分です。Gaussian密度

$$
g_q(y)=(2\pi q)^{-d/2}\exp(-|y|^2/(2q))
$$

を使えば $G(q,z)=\int f(z+y)g_q(y)\,dy$ です。密度を実際に微分すると

$$
\partial_qg_q(y)
=g_q(y)\left(-\frac d{2q}+\frac{|y|^2}{2q^2}\right)
=\frac12\Delta_yg_q(y).
$$

$f$ とその導関数は有界で、Gaussianの尾で支配されるため、微分と積分を交換し二回の部分積分を行って

$$
\partial_qG(q,z)=\frac12\Delta_zG(q,z)
$$

を得ます。$b(t)=e^{-\lambda t}$ とすると $u(t,x)=G(q(t),b(t)x)$、$b'=-\lambda b$、$q'=2b^2$ です。連鎖律で

$$
\begin{aligned}
\partial_tu
&=\frac{q'}2\Delta_zG+b'x\cdot\nabla_zG\\
&=b^2\Delta_zG-\lambda b x\cdot\nabla_zG
=\Delta_xu-\lambda x\cdot\nabla_xu.
\end{aligned}
$$

最後の等号では $\nabla_xu=b\nabla_zG$、$\Delta_xu=b^2\Delta_zG$ を代入しました。$q\downarrow0$ では滑らかな $f$ とその導関数のGaussian平均が元の値に一様収束するので、$t=0$ でも式が成立します。さらに

$$
D_x^ju(t,x)
=b(t)^j\mathbb E[D^jf(b(t)x+\sqrt{q(t)}Z)]
\quad(j=0,1,2)
$$

から $0<b(t)\le1$ を用いて三つのノルム上界を得ます。$\square$
<!-- proof-end -->

<a id="thm-otr24-uniqueness"></a>

<!-- formal-statement-start -->
> **定理（二次モーメント有界な弱解の一意性と表示）**  
> $d\ge1$、$\lambda>0$、$T>0$、$\mu^0\in\mathcal P_2(\mathbb R^d)$ とする。[本章の測度弱解](#def-otr24-weak-solution)は高々一つであり、存在するなら任意の $f\in C_c^\infty(\mathbb R^d)$ と $t\in[0,T]$ に対して

$$
\boxed{\int f\,d\mu_t=\int(P_tf)(x)\,d\mu^0(x).}
$$

> 従ってその測度は、独立な $X_0\sim\mu^0$ と $Z\sim N(0,I_d)$ を使って

$$
\mu_t=\operatorname{Law}\left(
e^{-\lambda t}X_0+\sqrt{\frac{1-e^{-2\lambda t}}{\lambda}}Z
\right)
$$

> と一意に定まる。
<!-- formal-statement-end -->

### 証明の見取り図

時刻 $t$ で測りたい関数 $f$ を固定し、$\psi(s,x)=P_{t-s}f(x)$ として過去へ戻します。[後退方程式](#lem-otr24-backward)によって $\partial_s\psi+L\psi=0$ ですが、$\psi$ は一般にコンパクト支持ではありません。そこで切断関数を掛け、切断位置を無限遠へ送る誤差を二次モーメントで抑えます。

<!-- proof-start -->
### 証明

$t\in(0,T]$ と $f\in C_c^\infty$ を固定し、$\psi(s,x)=P_{t-s}f(x)$（$0\le s\le t$）と置きます。[前補題](#lem-otr24-backward)から

$$
\partial_s\psi+L\psi=-LP_{t-s}f+LP_{t-s}f=0.
$$

$\chi\in C_c^\infty(\mathbb R^d)$ を $|x|\le1$ で1、$|x|\ge2$ で0、$0\le\chi\le1$ とし、$\chi_R(x)=\chi(x/R)$ とします。$\chi_R\psi$ は空間変数に関して有界な領域の外でゼロになるので、先ほど導いた時間依存の試験関数の公式を適用できます。積の微分により

$$
\begin{aligned}
(\partial_s+L)(\chi_R\psi)
&=\psi\,\Delta\chi_R
+2\nabla\chi_R\cdot\nabla\psi
-\lambda(x\cdot\nabla\chi_R)\psi.
\end{aligned}
$$

$\|\nabla\chi_R\|_\infty\le C/R$、$\|\Delta\chi_R\|_\infty\le C/R^2$ で、両方とも $R\le|x|\le2R$ の外では0です。[前補題の導関数上界](#lem-otr24-backward)を代入すると最初の二項の積分は $O(t/R^2+t/R)$ です。第三項はその環状領域で $|x\cdot\nabla\chi_R|\le2C$ を満たします。$M=\sup_{s\le T}M_2(\mu_s)<\infty$ を使えば

$$
\begin{aligned}
\int_0^t\!\int_{|x|\ge R}
|x\cdot\nabla\chi_R|\,|\psi|\,d\mu_s\,ds
&\le2C\|f\|_\infty\int_0^t\mu_s(\{|x|\ge R\})\,ds\\
&\le\frac{2CtM\|f\|_\infty}{R^2}\longrightarrow0.
\end{aligned}
$$

従って時間依存試験関数の等式から $R\to\infty$ で

$$
\int\chi_R f\,d\mu_t-\int\chi_R P_tf\,d\mu^0\longrightarrow0.
$$

$|\chi_R f|\le\|f\|_\infty$、$|\chi_R P_tf|\le\|f\|_\infty$ なので両端は[Lebesgueの優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)により極限へ移せます。これで表示式を得ました。右辺は初期測度だけで決まるので、二つの弱解があっても全ての $f\in C_c^\infty$ について各時刻の積分が等しく、確率測度の一意性から一致します。

最後の確率変数の表示は、[本章のGaussian作用素 $P_t$](#def-otr24-ou-semigroup)を初期測度で積分し、[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)を使えば導かれます。$X_0$ と $Z$ の独立性があるから条件付き期待値が $P_tf(X_0)$ となります。$\square$
<!-- proof-end -->

**一意性は単なる名前付き定理の引用ではありません。** Gaussianを使う後退方程式から逆向きの試験関数を構成し、無限遠で生じる切断誤差まで評価したので、今回固定したモデルについて証明が閉じています。

## 6. 部分列を外し、実際の時間発展を得る

<a id="cor-otr24-full-convergence"></a>

<!-- formal-statement-start -->
> **系（JKO反復全体の連続時間極限）**  
> $d\ge1$、$\lambda>0$、$\mu^0\in\mathcal P_2$、$\mathcal F(\mu^0)<\infty$ とする。任意の固定した $T>0$ について、$\tau\downarrow0$ のJKO階段状補間・測地線補間はともに、[一意性定理のGaussian表示](#thm-otr24-uniqueness)で与えられる同じ $\mu_t$ に、全時刻一様な狭義収束の意味で収束する。$\mu_t$ の $W_2$ 時間変化は $\sqrt{|t-s|}$ の定数倍で抑えられ、全ての $t\in[0,T]$ で

$$
\mathcal F(\mu_t)\le\mathcal F(\mu^0),\qquad
M_2(\mu_t)\le\frac{4E_0}{\lambda}.
$$

> 特に極限は初期値 $\mu^0$ を持つFokker–Planck方程式の唯一の二次モーメント有界な弱解である。
<!-- formal-statement-end -->

### 証明の見取り図

どの $\tau_n\downarrow0$ からもコンパクト性により収束部分列を取り出せます。その部分列は弱方程式を満たし、一意性により常に同じ極限へ行き着きます。もし全体が収束しないなら、極限から離れ続ける列を取れるので矛盾します。

<!-- proof-start -->
### 証明

任意の $\tau_n\downarrow0$ を選びます。[コンパクト性](#thm-otr24-compactness)で部分列を取り、[弱解への移行](#thm-otr24-weak-limit)でその極限が弱解であることを示しました。[一意性](#thm-otr24-uniqueness)により極限は常に同じGaussian表示の曲線です。

全体が一様狭義収束しないと仮定すると、ある有界連続関数 $f$、$\varepsilon>0$、$\tau_n\downarrow0$ が存在し

$$
\sup_{t\in[0,T]}
\left|\int f\,d\bar\mu_{\tau_n}(t)-\int f\,d\mu_t\right|
\ge\varepsilon
$$

を満たします。しかしこの列からも[コンパクト性](#thm-otr24-compactness)により一様狭義収束する部分列を選べ、その極限は同じ $\mu_t$ なので矛盾します。測地線補間にも同じ議論が使えます。時間の平方根型評価・二次モーメント・エネルギー評価は先の二定理で既に得ています。$\square$
<!-- proof-end -->

**Gaussian初期値の検算**。$d=1$、$\mu^0=N(m_0,s_0^2)$、$s_0>0$ とします。[前定理の表示](#thm-otr24-uniqueness)で独立な二つのGaussianを足すと

$$
\mu_t=N\left(m_0e^{-\lambda t},
\frac1\lambda+\left(s_0^2-\frac1\lambda\right)e^{-2\lambda t}\right).
$$

平均 $m(t)=m_0e^{-\lambda t}$、分散 $v(t)=\lambda^{-1}+(s_0^2-\lambda^{-1})e^{-2\lambda t}$ と置きます。ここでは発展後の**全分散**を $v(t)$ と呼び、第5節の $q(t)$（追加するGaussian雑音の分散）と区別します。時刻 $t$ で微分すると

$$
m'=-\lambda m,\qquad v'=2-2\lambda v,
$$

となり、[OTR23のGaussian一歩の後退差分](../OTR23/index.md#prop-otr23-gaussian-step)から予想した微分方程式と一致します。$t>0$ では一般の初期測度に対してもGaussianとの畳み込みによって任意階数微分可能なLebesgue密度が生まれますが、収束の主張はあくまで狭義収束であり、近似列の $W_2$ 収束をここでは主張していません。

## 7. 演習：三段階の証明を組み直す

### OTR24-A01 相対エントロピーで二次モーメントを取り出す
- Level: A

$d=1$、$\lambda=2$ とする。$\rho\,dx\in\mathcal P_2(\mathbb R)$ で $\int\rho\log\rho\,dx$ が有限である確率密度 $\rho$ に対して $\mathcal F(\rho)=\int\rho\log\rho\,dx+\int x^2\rho(x)dx$ を考える。比較密度 $g(x)=(2\pi)^{-1/2}e^{-x^2/2}$ を使い、$\mathcal F=D(\rho\,dx\Vert g\,dx)+\frac12M_2+c_2$ を導け。$c_2$ を計算し、$\mathcal F(\rho)\le K$ なら $M_2$ にどんな上界があるか示せ。

<!-- solution-start -->
**詳細解答**。$\log g(x)=-\frac12\log(2\pi)-x^2/2$ なので

$$
\begin{aligned}
D(\rho\,dx\Vert g\,dx)
&=\int\rho\log\frac{\rho}{g}\,dx\\
&=\int\rho\log\rho\,dx+\frac12\log(2\pi)+\frac12M_2.
\end{aligned}
$$

$c_2=-\frac12\log(2\pi)$ と置けば $\mathcal F=D+\frac12M_2+c_2$ です。[相対エントロピーの非負性](../OTR21/index.md#prop-otr21-gibbs)から $\frac12M_2+c_2\le\mathcal F\le K$、ゆえに $M_2\le2(K-c_2)$ となります。$K<c_2$ なら仮定を満たす密度自体が存在しません。
<!-- solution-end -->

### OTR24-A02 距離評価を試験関数の評価へ替える
- Level: A

$E_0\ge0$、$0\le s<t\le T$ とし、JKO測地線補間が $W_2(\widetilde\mu_\tau(s),\widetilde\mu_\tau(t))\le\sqrt{2E_0(t-s)}$ を満たすとする。有界でLipschitz定数が $L_f$ の関数 $f$ について、両時刻の積分差を評価せよ。

<!-- solution-start -->
**詳細解答**。[結合によるWasserstein距離](../OTR8/index.md#def-otr8-wasserstein)で、任意の結合 $\pi$ に対して

$$
\begin{aligned}
\left|\int f\,d\widetilde\mu_\tau(t)
-\int f\,d\widetilde\mu_\tau(s)\right|
&=\left|\iint(f(x)-f(y))\,d\pi(x,y)\right|\\
&\le L_f\iint|x-y|\,d\pi\\
&\le L_f\left(\iint|x-y|^2\,d\pi\right)^{1/2}.
\end{aligned}
$$

最後はCauchy–Schwarzと $\pi$ の質量1によります。最適結合で最小化すると右辺は $L_fW_2$ なので、結論は $L_f\sqrt{2E_0(t-s)}$ です。$f$ の有界性は狭義収束の試験関数として使うためで、この積分差の評価そのものにはLipschitz性と二次モーメントがあれば足ります。
<!-- solution-end -->

### OTR24-A03 弱方程式の拡散と外場の符号
- Level: A

$d=1$、$\lambda=3$ とする。$\rho(t,x)$ が空間・時間について滑らかで全ての点で正値を取る確率密度であり、$\partial_t\rho=\partial_{xx}\rho+3\partial_x(x\rho)$ を満たすとする。$\varphi\in C_c^\infty(\mathbb R)$ に対し、$\frac d{dt}\int\varphi(x)\rho(t,x)dx$ を求め、外場項の符号を説明せよ。

<!-- solution-start -->
**詳細解答**。試験関数がコンパクト支持なので境界項が消え、

$$
\begin{aligned}
\frac d{dt}\int\varphi\rho\,dx
&=\int\varphi\rho_{xx}\,dx+3\int\varphi(x\rho)_x\,dx\\
&=-\int\varphi'\rho_x\,dx-3\int x\varphi'\rho\,dx\\
&=\int(\varphi''-3x\varphi')\rho\,dx.
\end{aligned}
$$

従って本章の $L\varphi=\varphi''-3x\varphi'$ と一致します。密度側で外場が正の発散項になるのは、試験関数へ移す際に一回の部分積分で負号が付くためです。
<!-- solution-end -->

### OTR24-A04 Gaussianの分散を確かめる
- Level: A

$d=1$、$\lambda>0$、$s_0>0$ とし、$v(t)=\lambda^{-1}+(s_0^2-\lambda^{-1})e^{-2\lambda t}$ とする。$v(0)$、$v'(t)$、$t\to\infty$ の極限を計算し、全ての $t\ge0$ で $v(t)>0$ を示せ。

<!-- solution-start -->
**詳細解答**。代入して $v(0)=\lambda^{-1}+s_0^2-\lambda^{-1}=s_0^2$ です。微分すると

$$
v'(t)=-2\lambda(s_0^2-\lambda^{-1})e^{-2\lambda t}
=2-2\lambda v(t).
$$

$e^{-2\lambda t}\to0$ なので $v(t)\to\lambda^{-1}$ です。また

$$
v(t)=e^{-2\lambda t}s_0^2+(1-e^{-2\lambda t})\lambda^{-1}
$$

は二つの正数の非負係数による和で、最初の係数は任意の有限 $t$ で正です。従って $v(t)>0$ です。
<!-- solution-end -->

### OTR24-A05 狭義収束は二次輸送距離の収束ではない
- Level: A

$n\ge2$ とし $\nu_n=(1-n^{-2})\delta_0+n^{-2}\delta_n$ とする。$\nu_n\in\mathcal P_2(\mathbb R)$ を示し、狭義極限、二次モーメント、$W_2(\nu_n,\delta_0)$ を求めよ。なぜ一様二次モーメント評価だけでは $W_2$ 収束を結論できないか説明せよ。

<!-- solution-start -->
**詳細解答**。質量は $(1-n^{-2})+n^{-2}=1$ で非負です。二次モーメントは

$$
M_2(\nu_n)=(1-n^{-2})0^2+n^{-2}n^2=1
$$

なので各 $\nu_n\in\mathcal P_2$ で一様有界です。有界連続な $f$ について

$$
\int f\,d\nu_n=(1-n^{-2})f(0)+n^{-2}f(n)\longrightarrow f(0)
$$

ですから $\nu_n$ は $\delta_0$ に狭義収束します。一方 $\delta_0$ と結ぶ結合は一意で、$W_2^2(\nu_n,\delta_0)=\int|x|^2d\nu_n=1$、従って $W_2=1$ のままです。二次モーメントが極限の $0$ へ収束していないことが原因です。
<!-- solution-end -->

### OTR24-B01 有理時刻から全時刻へ
- Level: B

$\eta_n:[0,T]\to\mathcal P_2(\mathbb R^d)$ が全ての $n$ で $\sup_tM_2(\eta_n(t))\le M$ と $W_2(\eta_n(s),\eta_n(t))\le C|t-s|^{1/2}$ を満たすとする。可算稠密な時刻集合で狭義収束する部分列があるとき、任意の有界1-Lipschitz関数 $f$ に対して $\int f\,d\eta_n(t)$ が全時刻一様に収束することを、有限個の時刻で被覆して証明せよ。

<!-- solution-start -->
**詳細解答**。まず二次モーメントから $\eta_n(t)(|x|>R)\le M/R^2$ なので全時刻の測度が一様tightです。稠密集合 $D$ の各 $r$ では狭義収束があるから、$a_n(r)=\int f\,d\eta_n(r)$ はCauchyです。

任意の $\varepsilon>0$ に対し $\delta>0$ を $2C\sqrt\delta<\varepsilon/2$ となるよう選びます。コンパクト区間 $[0,T]$ を $D$ の有限個の点 $r_1,\ldots,r_J$ から距離 $\delta$ 未満の区間で覆います。この有限個の点についてある $N$ 以降は全て $|a_n(r_j)-a_m(r_j)|<\varepsilon/2$ です。

任意の時刻 $t$ では $|t-r_j|<\delta$ の点を選び、[Lipschitz試験関数の積分差](#thm-otr24-compactness)と三角不等式で

$$
\begin{aligned}
|a_n(t)-a_m(t)|
&\le|a_n(t)-a_n(r_j)|+|a_n(r_j)-a_m(r_j)|\\
&\quad+|a_m(r_j)-a_m(t)|\\
&\le2C\sqrt\delta+\varepsilon/2<\varepsilon.
\end{aligned}
$$

従って $a_n$ は一様Cauchyで、一様に極限関数へ収束します。有界連続な一般の $f$ へ広げるには、共通の球外質量 $M/R^2$ を小さくしてから球内で有界Lipschitz近似を使います。
<!-- solution-end -->

### OTR24-B02 最後の端数を含む弱残差
- Level: B

$\tau>0$、$T>0$ のJKO反復で、各ステップの $a_k=W_2(\mu_\tau^k,\mu_\tau^{k-1})$ が $\sum_{k=1}^{\lceil T/\tau\rceil}a_k^2/\tau\le2E_0$ を満たすとする。[OTR23の一歩の弱方程式](../OTR23/index.md#thm-otr23-weak-step)を $L\varphi=\Delta\varphi-\lambda x\cdot\nabla\varphi$ で使う。任意の $t\in(0,T]$、$\varphi\in C_c^\infty$ に対し、$\bar\mu_\tau(t)$ と $\mu^0$ の積分差から $\int_0^t\int L\varphi d\bar\mu_\tau ds$ を引いた絶対値の上界を示せ。

<!-- solution-start -->
**詳細解答**。$m=\lceil t/\tau\rceil$ なので $(m-1)\tau<t\le m\tau$ です。各ステップの式を $k=1,\ldots,m$ まで足すと

$$
\int\varphi\,d\mu_\tau^m-\int\varphi\,d\mu^0
=\tau\sum_{k=1}^{m}\int L\varphi\,d\mu_\tau^k
+\sum_{k=1}^mR_k(\varphi).
$$

第一和は $[0,m\tau]$ 上の階段状補間の時間積分です。仮定から

$$
\left|\sum_{k=1}^mR_k(\varphi)\right|
\le\frac12\|D^2\varphi\|_\infty\sum_{k=1}^ma_k^2
\le\tau E_0\|D^2\varphi\|_\infty.
$$

$[t,m\tau]$ の余分な積分は長さが $\tau$ 以下で、確率測度の質量が1だから $\tau\|L\varphi\|_\infty$ 以下です。これらを合わせた上界は

$$
\tau\bigl(E_0\|D^2\varphi\|_\infty+\|L\varphi\|_\infty\bigr).
$$

刻みの上端へ丸める誤差を落とすと、$t$ が格子点でない場合の論証が不足します。
<!-- solution-end -->

### OTR24-B03 Gaussian平均の微分と生成作用素
- Level: B

$d=1$、$\lambda>0$、$u\in\mathbb R$、$f(x)=\cos(ux)$ とする。$P_tf(x)=e^{-q(t)u^2/2}\cos(e^{-\lambda t}ux)$、$q(t)=(1-e^{-2\lambda t})/\lambda$ について、$\partial_tP_tf=(\partial_{xx}-\lambda x\partial_x)P_tf$ を直接微分して確認せよ。

<!-- solution-start -->
**詳細解答**。$b=e^{-\lambda t}$、$A=e^{-q u^2/2}$ と置けば $b'=-\lambda b$、$q'=2b^2$、$A'=-b^2u^2A$ です。連鎖律から

$$
\begin{aligned}
\partial_t(P_tf)
&=A'\cos(bux)-A\sin(bux)b'ux\\
&=-b^2u^2A\cos(bux)+\lambda buxA\sin(bux).
\end{aligned}
$$

一方

$$
\partial_x(P_tf)=-buA\sin(bux),\qquad
\partial_{xx}(P_tf)=-b^2u^2A\cos(bux).
$$

したがって $\partial_{xx}P_tf-\lambda x\partial_xP_tf$ は上の時間微分と等しいです。$t=0$ に代入すると $Lf=-u^2\cos(ux)+\lambda ux\sin(ux)$ と一致します。$f$ はコンパクト支持ではありませんが、この微分恒等式の直接検算には支障ありません。
<!-- solution-end -->

### OTR24-B04 後退試験関数の切断誤差
- Level: B

$d\ge1$、$\lambda>0$ とし、$\mu_s$ が $\sup_{0\le s\le T}M_2(\mu_s)\le M$ を満たす確率測度曲線とする。$\psi(s,x)$ は時間 $s$ に関して1階、空間 $x$ に関して2階の連続導関数を持ち、$\|\psi\|_\infty\le K_0$、$\|\nabla_x\psi\|_\infty\le K_1$、$\partial_s\psi+L\psi=0$ を満たすとする。$\chi_R(x)=\chi(x/R)$ は本文の切断関数で、$\|\nabla\chi\|_\infty\le C_1$、$\|\Delta\chi\|_\infty\le C_2$ とする。$\int_0^t\int|(\partial_s+L)(\chi_R\psi)|d\mu_sds$ の $R\to\infty$ 評価を導け。

<!-- solution-start -->
**詳細解答**。[積の微分公式](../../../基礎科目/RA/RA3/index.md#prop-ra3-product-rule)を時間微分と空間微分それぞれに使うと

$$
(\partial_s+L)(\chi_R\psi)
=\psi\Delta\chi_R+2\nabla\chi_R\cdot\nabla\psi
-\lambda\psi\,x\cdot\nabla\chi_R.
$$

導関数は $R\le|x|\le2R$ に支持を持ち、$\|\Delta\chi_R\|_\infty\le C_2/R^2$、$\|\nabla\chi_R\|_\infty\le C_1/R$ です。最初の二項を積分すると

$$
\int_0^t\int\bigl(|\psi\Delta\chi_R|
+2|\nabla\chi_R\cdot\nabla\psi|\bigr)d\mu_sds
\le t\left(\frac{K_0C_2}{R^2}+\frac{2K_1C_1}{R}\right).
$$

最後の項は環状領域で $|x\cdot\nabla\chi_R|\le2C_1$ なので

$$
\begin{aligned}
\lambda\int_0^t\!\int|\psi x\cdot\nabla\chi_R|d\mu_sds
&\le2\lambda K_0C_1\int_0^t\mu_s(|x|\ge R)ds\\
&\le\frac{2\lambda K_0C_1tM}{R^2}.
\end{aligned}
$$

両者を足した上界は $R\to\infty$ で0です。ドリフト係数の $|x|$ を無視して $O(R^{-1})$ と断定するのではなく、環状支持とモーメントの尾評価の両方を使います。
<!-- solution-end -->

### OTR24-C01 二成分Gaussian混合のJKO極限
- Level: C

$d=1$、$\lambda=1$ とし、初期測度を $\mu^0=\frac12N(-1,1)+\frac12N(1,1)$ とする。$\mathcal F(\mu)=\int\rho\log\rho\,dx+\frac12\int x^2d\mu(x)$ のJKO反復について、本章の収束定理が適用できることを確認し、極限 $\mu_t$ を具体的に求めよ。各成分の平均・分散、全体の平均・分散、および $t\to\infty$ の狭義極限を計算せよ。

<!-- solution-start -->
**詳細解答**。初期測度は二つのGaussian密度の混合なので、全ての点で正値を取る $C^\infty$ 級の密度 $\rho$ を持ちます。各成分の二次モーメントは分散1と平均の二乗1の和で2です。従って混合全体の二次モーメントも2です。

密度の上界は $\rho(x)\le(2\pi)^{-1/2}$ であり、一方のGaussian成分から次の下界を得ます。

$$
\rho(x)\ge\frac12(2\pi)^{-1/2}e^{-(x-1)^2/2}.
$$

二つの評価から $|\log\rho(x)|\le C(1+x^2)$ です。有限二次モーメントによって $\int\rho|\log\rho|<\infty$ となり、$\mathcal F(\mu^0)<\infty$ です。従って[連続時間極限の系](#cor-otr24-full-convergence)を適用できます。

[弱解のGaussian表示](#thm-otr24-uniqueness)で各成分の初期値 $X_0=\pm1+G$（$G\sim N(0,1)$）を代入します。独立な標準Gaussian $Z$ と $b=e^{-t}$ を使うと

$$
e^{-t}X_0+\sqrt{1-e^{-2t}}Z
=\pm b+\bigl(bG+\sqrt{1-b^2}Z\bigr).
$$

括弧内は平均0・分散 $b^2+(1-b^2)=1$ のGaussianです。したがって

$$
\boxed{\mu_t=\frac12N(-e^{-t},1)+\frac12N(e^{-t},1).}
$$

各成分の平均は $\pm e^{-t}$、分散は1です。$b=e^{-t}$ とすると、全体の平均は $\frac12(-b)+\frac12b=0$ で、二乗平均は

$$
\mathbb E[X_t^2]
=\frac12(1+(-b)^2)+\frac12(1+b^2)=1+b^2.
$$

従って全体の分散は $1+e^{-2t}$ です。$t\to\infty$ では二つの成分がともに $N(0,1)$ へ狭義収束するので $\mu_t\Rightarrow N(0,1)$ です。有限の $t$ では二成分混合が一般に単一Gaussianではないことも分かります。「二成分」は密度の極大点が二つあるという意味ではありません。
<!-- solution-end -->

### OTR24-C02 同じ雑音で結ぶ安定性評価
- Level: C

$d\ge1$、$\lambda>0$ とする。二つの初期測度 $\mu^0,\nu^0\in\mathcal P_2(\mathbb R^d)$ に対し、[本章のGaussian表示](#thm-otr24-uniqueness)から定める測度曲線をそれぞれ $\mu_t,\nu_t$ とする（初期エネルギーの有限性は仮定しない）。任意の $t\ge0$ について

$$
W_2(\mu_t,\nu_t)\le e^{-\lambda t}W_2(\mu^0,\nu^0)
$$

を証明せよ。さらに $\gamma_\lambda=N(0,\lambda^{-1}I_d)$ がこの時間発展で不変であることを示し、$W_2(\mu_t,\gamma_\lambda)$ の長時間評価を導け。

<!-- solution-start -->
**詳細解答**。初期測度の[最適結合](../OTR3/index.md#thm-otr3-polish) $(X_0,Y_0)$ を取ると $E|X_0-Y_0|^2=W_2^2(\mu^0,\nu^0)$ です。この組と独立な同一の標準Gaussian $Z$ を使い、$b=e^{-\lambda t}$、$q=(1-b^2)/\lambda$ と置いて

$$
X_t=bX_0+\sqrt q Z,\qquad
Y_t=bY_0+\sqrt q Z
$$

を作ります。各周辺法則は本章のGaussian表示によって $\mu_t,\nu_t$ です。一方、差では雑音が相殺され

$$
E|X_t-Y_t|^2=b^2E|X_0-Y_0|^2
=e^{-2\lambda t}W_2^2(\mu^0,\nu^0).
$$

$W_2$ は**全結合の費用の最小値**なので、ここで作った結合の費用以下であり、平方根を取って主張を得ます。等号は一般に保証されません。

$Y_0\sim\gamma_\lambda$ とすれば $Y_t=bY_0+\sqrt q Z$ は独立なGaussianの和で、平均0、共分散は

$$
\operatorname{Cov}(Y_t)
=b^2\lambda^{-1}I_d+qI_d
=\frac{b^2+(1-b^2)}{\lambda}I_d
=\lambda^{-1}I_d.
$$

従って $\nu_t=\gamma_\lambda$ は不変です。最初の不等式を $\nu^0=\gamma_\lambda$ に適用して

$$
W_2(\mu_t,\gamma_\lambda)
\le e^{-\lambda t}W_2(\mu^0,\gamma_\lambda)\longrightarrow0
$$

を得ます。これは**連続時間のGaussian表示で定義した二つの曲線の収縮**であり、初期エネルギーが有限なら[連続時間極限の系](#cor-otr24-full-convergence)により実際の弱解同士の評価でもあります。JKO近似列が固定時間に $W_2$ 収束することを本章の定理へ無断で付け加えたものではありません。
<!-- solution-end -->

## 8. この講義で確かめたこと

1. 二次外場のある自由エネルギーは相対エントロピーと正の二次モーメント項へ分かれ、刻みによらない一様緊密性を与えました。
2. 時間の平方根型評価と合わせて、JKO補間には全時刻一様な狭義収束部分列が存在します。
3. 一歩のTaylor残差の総和が $O(\tau)$ なので、その部分列はFokker–Planckの弱方程式を満たします。
4. Gaussianで構成した後退試験関数と無限遠での切断評価から弱解の一意性を証明し、部分列を外して反復全体の収束を得ました。

今回の結論は**$\lambda>0$ の二次外場を持つ線形Fokker–Planckモデルでの、狭義収束と一意の測度弱解**です。相互作用のある非線形流、一般のポテンシャル、近似列の強い $W_2$ 収束はここから自動的には出ません。次講では連続時間のJKOを離れ、有限行列での輸送最適化とそのエントロピー正則化を扱います。
