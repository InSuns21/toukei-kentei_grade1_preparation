# MQFC8 反射陽性はなぜ成り立つか

[MQFC7](../MQFC7/index.md) では Euclid 自由場の多点の平均を二点共分散から求めました。しかし、確率測度が存在するだけでは、その場から実時間の量子状態を作れるとは限りません。量子状態の長さの二乗は非負でなければならないからです。今回は正の Euclid 時間に置いた測定と、時間を反転した測定との相関が非負の長さを与える仕組みを調べます。

直接の前提は [MQFC5](../MQFC5/index.md)、[MQFC6](../MQFC6/index.md)、[MQFC7](../MQFC7/index.md) です。全 Euclid 次元を $d\ge1$、質量を $m>0$ とします。座標は $(t,x)$、$t\in\mathbb R$、$x\in\mathbb R^{d-1}$ と書きます。$d=1$ なら空間変数とその積分を省きます。

## 1. 時間を反転して長さを測る

[Schwartz空間](../MQFC1/index.md#def-mqfc1-schwartz) の実数値部分を $S$ とします。$S'$ は $S$ 上の連続実線形汎関数全体です。[緩増加分布の連続性条件](../MQFC1/index.md#def-mqfc1-tempered) を実数値の場合に使います。$S_+$ は $S$ のうち台が開半空間 $t>0$ に含まれる試験関数全体です。台とは関数が非零となる集合の閉包です。時間反転は

$$
(\theta f)(t,x)=f(-t,x),\qquad
(\theta\omega)(f)=\omega(\theta f)
$$

で表します。時間反転は線形で、二回行うと元に戻ります。$z=(t,x)$ とし、$\alpha=(\alpha_0,\ldots,\alpha_{d-1})$ を各座標の微分回数を指定する多重添字とします。時間方向に $\alpha_0$ 回微分すると反転による符号が $(-1)^{\alpha_0}$ だけ現れ、$|(-t,x)|=|(t,x)|$ なので [Schwartz半ノルム](../MQFC1/index.md#def-mqfc1-schwartz) は保たれます。

$$
\partial^\alpha(\theta f)(t,x)=(-1)^{\alpha_0}
(\partial^\alpha f)(-t,x),\qquad
p_{N,j}(\theta f)=p_{N,j}(f).
$$

従って反転は $S$ 上で連続です。連続実線形写像の合成なので $\theta\omega$ も連続実線形汎関数です。測定 $X_f(\omega)=\omega(f)$ に対して $X_f(\theta\omega)=X_{\theta f}(\omega)$ となります。

[場の特性汎関数](../MQFC6/index.md#def-mqfc6-characteristic-functional) で用いた円筒 $\sigma$ 加法族上の確率測度 $\mu$ を考えます。これは有限個の測定ベクトルがBorel集合に入るという事象から生成される $\sigma$ 加法族上の測度です。

各実試験関数 $f$ に対し全絶対モーメントが有限であると仮定します。つまり各整数 $r\ge1$ について

$$
E_\mu[|X_f|^r]<\infty
$$

です。ここで $E_\mu$ は測度 $\mu$ による期待値です。

反転写像は、測定 $X_f$ との合成が測定 $X_{\theta f}$ になるので円筒可測です。反転で分布が変わらないことを $\theta_*\mu=\mu$ と書きます。左辺は反転後の標本の分布で、各可測集合 $D$ に対し $(\theta_*\mu)(D)=\mu(\theta^{-1}(D))$ です。

正時間の有限個の測定を変数とする複素係数多項式全体を $\mathcal P_+$ とします。つまり

$$
F=P(X_{f_1},\ldots,X_{f_n})
\qquad(f_j\in S_+)
$$

と表せる確率変数です。$P$ は複素係数多項式です。定数も含め、二つの多項式に異なる測定が現れるときはその有限族を合わせればよいので、和と積に閉じています。

測定の実数値は変えず、上線 $\overline{\phantom{F}}$ で複素共役を表します。普通の期待値 $E|F|^2$ の代わりに、反転した多項式と元の多項式を掛けます。この値は正時間と負時間をつなぐ相関であり、非負性は自動ではありません。

[QFT20の反射陽性の定義](../../QFT/QFT20/index.md#def-qft20-reflection-positivity) では反転と共役を合わせて $\Theta F$ と書きました。本章の記法では

$$
(\Theta F)(\omega)=\overline{F(\theta\omega)}
$$

です。ここでは測度と試験関数を明示して、その積の平均を二引数の形式として扱います。

<a id="def-mqfc8-reflection-positivity"></a>

<!-- formal-statement-start -->
> **定義（正時間多項式の反射形式）**
> 実 Schwartz 空間の連続実線形双対上の円筒確率測度 $\mu$ が時間反転 $\theta$ で不変であり、各実試験関数による測定が全絶対モーメントを持つとする。$\mathcal P_+$ を正時間に台を持つ実試験関数の有限個の測定による複素係数多項式全体とする。$F,G\in\mathcal P_+$ に対して反射形式を

$$
(F,G)_\theta=E_\mu[\overline{F(\theta\omega)}G(\omega)]
$$

> と定める。
<!-- formal-statement-end -->

[反射陽性](../../QFT/QFT20/index.md#def-qft20-reflection-positivity) の条件は、この形式について全ての $F\in\mathcal P_+$ で $(F,F)_\theta\ge0$ となることです。

<!-- definition-example-start: def-mqfc8-reflection-positivity -->
### 直接例

**定義の確認**。標準正規変数 $Y$ により $\omega(f)=Y\int f$ とします。積分は実線形で、$z=(t,x)$ に対する Lebesgue 積分を意味します。各標本の $Y$ は有限の実数です。積分の連続性は [Schwartz半ノルム](../MQFC1/index.md#def-mqfc1-schwartz) で判定できます。例えば $N>d$ に対し

$$
\left|\int f(z)\,dz\right|
\le \sup_z(1+|z|)^N|f(z)|\int(1+|z|)^{-N}dz.
$$

右辺の積分は $N>d$ で有限なので、$Y$ を固定した各標本は $S'$ に属します。測定は $Y$ の定数倍なので可測であり、円筒確率測度を誘導します。標準正規変数の全絶対モーメントは有限なので、$E[|X_f|^r]=|\int f|^r E[|Y|^r]<\infty$ です。変数変換 $t\mapsto-t$ で $\int\theta f=\int f$ となり、各標本自体が反転不変です。よって任意の $F=P(X_{f_1},\ldots,X_{f_n})$ に対して

$$
(F,F)_\theta=E|P(Y\int f_1,\ldots,Y\int f_n)|^2\ge0.
$$

これは有限個の線形測定に限らず全多項式についての確認です。測定の絶対モーメントと反転不変性も満たしています。
<!-- definition-example-end -->

反射形式の有限性を確認します。多項式の積を展開すると、正負両時間の測定の有限個の積が現れます。次数 $r\ge1$ の積について、各因子を $Z_1,\ldots,Z_r$ と書けば

$$
|Z_1\cdots Z_r|\le \max_j |Z_j|^r
\le \sum_{j=1}^r |Z_j|^r.
$$

各測定が全絶対モーメントを持つため右辺は可積分です。定数項も可積分なので、有限個の項を足して反射形式が有限になります。第1引数について共役線形、第2引数について線形です。また反転不変性により

$$
\begin{aligned}
\overline{(G,F)_\theta}
&=E[G(\theta\omega)\overline{F(\omega)}]\\
&=E[G(\omega)\overline{F(\theta\omega)}]=(F,G)_\theta.
\end{aligned}
$$

次講ではこの形式を使って状態の空間を組み立てます。今回の中心課題は非負性です。

### 普通の共分散の正値性では足りない

[QFT20の共分散に関する反例](../../QFT/QFT20/index.md#prop-qft20-positive-not-reflection) では平行移動不変な共分散でも反射陽性が破れる例を見ました。ここではさらに簡単な場で符号を直接確認します。

$d=1$ として $\omega(f)=Y\int t f(t)\,dt$ と置きます。積分は先ほどより一つ高い次数の Schwartz 半ノルムで抑えられ、測定は Gaussian です。反転は $Y$ を $-Y$ に変えるだけなので分布は不変です。$a=\int t f(t)\,dt$ とすれば $E[X_f^2]=a^2\ge0$ ですが、$f\in S_+$ を非零の非負の滑らかなコンパクト台関数とすると $a>0$ かつ

$$
E[X_{\theta f}X_f]=-a^2<0.
$$

普通の二乗では符号が相殺しますが、反射では奇関数の符号が一方だけ反転します。反転対称性と通常の正値性を合わせても反射陽性は導けません。

## 2. 自由共分散を時間と空間に分ける

[Euclid自由場の試験関数共分散](../MQFC5/index.md#def-mqfc5-covariance-form) を $B_m$ とします。複素試験関数にも使える半双線形形式です。第1引数を反転した $B_m(\theta f,g)$ について、任意の有限族と係数で二次形式が非負になるかを調べます。[MQFC5の共分散の正値性](../MQFC5/index.md#thm-mqfc5-positivity) で扱ったように、半双線形形式の値を行列に並べると、二次形式は係数の和に対する形式の値になります。今回は通常の共分散ではなく反転を挟んだ値を並べます。

時間周波数を $p$、空間周波数を $k$ とし、$\varepsilon_k=\sqrt{|k|^2+m^2}$ と置きます。空間だけの Fourier 変換を

$$
\widetilde f(t,k)=\int e^{-ik\cdot x} f(t,x)\,dx
$$

と書きます。全 Fourier 変換は $\widehat f(p,k)=\int e^{-ipt}\widetilde f(t,k)\,dt$ です。規格化は [Schwartz空間のFourier変換](../MQFC1/index.md#thm-mqfc1-fourier) と一致します。

周波数の分母は $p^2+\varepsilon_k^2$ です。空間周波数 $k$ を一つ固定すると時間方向だけの一次元計算になります。時間差を $\tau$ とし、まず正の定数 $a$ を固定して時間周波数 $p\in\mathbb R$ について積分します。[QFT20のEuclid自由共分散](../../QFT/QFT20/index.md#thm-qft20-euclidean-kernel) の時間核を、ここでは逆変換の積分として直接求めます。

<a id="thm-mqfc8-time-kernel"></a>

<!-- formal-statement-start -->
> **定理（自由共分散の時間指数核）**
> 任意の実数 $a>0$ と $\tau\in\mathbb R$ に対して

$$
\frac1{2\pi}\int_{\mathbb R}\frac{e^{ip\tau}}{p^2+a^2}\,dp
=\frac{e^{-a|\tau|}}{2a}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

逆変換を複素積分で求める代わりに、右辺を先に Fourier 変換します。正負の半直線の積分はそれぞれ初等的な指数積分です。

<!-- proof-start -->
### 証明

$h(\tau)=e^{-a|\tau|}/(2a)$ は連続かつ可積分です。正負に分けて、負の半直線では $u=-\tau$ と置くと

$$
\begin{aligned}
\widehat h(p)
&=\frac1{2a}\left(\int_0^\infty e^{-(a+ip)u}du
+\int_0^\infty e^{-(a-ip)u}du\right)\\
&=\frac1{2a}\left(\frac1{a+ip}+\frac1{a-ip}\right)\\
&=\frac1{p^2+a^2}.
\end{aligned}
$$

ここで実部 $a>0$ のため無限遠の指数項は零です。$\widehat h$ も可積分です（無限遠で $p^{-2}$ のオーダーであり、原点付近では $a^{-2}$ 以下です）。ただし $h$ 自体は原点で滑らかでないため、Schwartz 関数に対する逆変換の定理をそのまま適用しません。

Schwartz 関数 $\psi$ に対し [Fourier逆変換](../MQFC1/index.md#thm-mqfc1-fourier) を $\psi$ に適用します。$h$ と $\widehat\psi$ が可積分なので、[Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02) を実部と虚部に適用して積分順序を交換できます。

$$
\begin{aligned}
\int h(\tau)\psi(\tau)d\tau
&=\frac1{2\pi}\int \widehat\psi(p)
\left(\int h(\tau)e^{ip\tau}d\tau\right)dp\\
&=\frac1{2\pi}\int\widehat\psi(p)\widehat h(-p)dp\\
&=\frac1{2\pi}\int\widehat h(p)\widehat\psi(-p)dp.
\end{aligned}
$$

求める逆 Fourier 積分を $q(\tau)$ と書きます。

$$
q(\tau)=\frac1{2\pi}\int e^{ip\tau}\widehat h(p)dp.
$$

$\widehat h$ と $\psi$ が可積分なので、同じ積分交換により $\int q\psi$ も上の右辺に一致します。$\tau_n\to\tau$ のとき被積分関数は点ごとに収束し、絶対値は可積分な $|\widehat h(p)|$ で抑えられます。[優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01) により $q$ は連続です。また $\widehat h$ は実偶関数なので正弦の部分は積分すると零となり、$q$ は実数値です。

従って連続実関数 $h-q$ と任意の Schwartz 関数 $\psi$ の積の積分は零です。もし $h-q$ がある点で正なら、その近傍で正の下限を持つ小区間を取り、そこに台を持つ非負・非零の滑らかな $\psi$ を選ぶと積分は正になります。負の場合も符号を反転して同じ矛盾を得ます。ゆえに $h=q$ です。
<!-- proof-end -->

$a=\varepsilon_k$ とすると、時間差 $\tau=t-s$ での共分散は $e^{-\varepsilon_k|t-s|}/(2\varepsilon_k)$ です。反射した側の時間は $-t$ なので差の絶対値は $|-t-s|=t+s$ になります。ここで指数が二つの因子に分かれます。[QFT20の自由スカラー二点核の反射二次形式](../../QFT/QFT20/index.md#thm-qft20-free-reflection) を、一般次元の Schwartz 関数について積分交換まで含めて確かめます。

<a id="thm-mqfc8-reflected-covariance"></a>

<!-- formal-statement-start -->
> **定理（自由場の反射共分散の因子分解）**
> $d\ge1$、$m>0$ とし、$f,g\in\mathcal S(\mathbb R^d)$ は正時間に台を持つ複素試験関数とする。$B_m$ を [Euclid自由場の試験関数共分散](../MQFC5/index.md#def-mqfc5-covariance-form)、$(\theta f)(t,x)=f(-t,x)$ を時間反転とする。$k\in\mathbb R^{d-1}$ に対する空間 Fourier 変換とエネルギーを

$$
\widetilde f(t,k)=\int_{\mathbb R^{d-1}}e^{-ik\cdot x}f(t,x)dx,
\qquad \varepsilon_k=\sqrt{|k|^2+m^2}
$$

> とし、$d=1$ では空間変数と空間積分を省く。さらに

$$
L_m f(k)=\int_0^\infty e^{-\varepsilon_k t}\widetilde f(t,k)\,dt
$$

> と置くと

$$
B_m(\theta f,g)
=\frac1{(2\pi)^{d-1}}\int
\frac{\overline{L_m f(k)}L_m g(k)}{2\varepsilon_k}\,dk.
$$

> 特に任意の正時間試験関数の有限族 $f_1,\ldots,f_n$ と複素係数 $c_1,\ldots,c_n$ について

$$
\sum_{i,j}\overline{c_i}c_j B_m(\theta f_i,f_j)\ge0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

時間差の核を [時間指数核](#thm-mqfc8-time-kernel) で置き換え、正時間の台を利用して $e^{-\varepsilon_k(t+s)}=e^{-\varepsilon_k t}e^{-\varepsilon_k s}$ とします。二つの時間積分が独立になり、反射形式は空間周波数上の重み付き二乗積分になります。

<!-- proof-start -->
### 証明

[自由場の試験関数共分散](../MQFC5/index.md#def-mqfc5-covariance-form) の Fourier 積分に

$$
\widehat{\theta f}(p,k)=\widehat f(-p,k)
=\int_0^\infty e^{ipt}\widetilde f(t,k)\,dt
$$

と $\widehat g(p,k)=\int_0^\infty e^{-ips}\widetilde g(s,k)\,ds$ を代入します。したがって

$$
\begin{aligned}
B_m(\theta f,g)
&=\frac1{(2\pi)^d}\int dk\,dp\int_0^\infty dt\,ds\\
&\quad\times\frac{e^{-ip(t+s)}
\overline{\widetilde f(t,k)}\widetilde g(s,k)}
{p^2+\varepsilon_k^2}.
\end{aligned}
$$

積分交換を確認します。部分 Fourier 変換は時間・空間周波数について急減少します。これを時間重み付きの空間微分で確認しましょう。$\Delta_x=\sum_{\ell=1}^{d-1}\partial^2/\partial x_\ell^2$ は時間 $t$ を固定した空間 Laplace 演算子です。整数 $j\ge0$ について、空間変数で部分積分を繰り返すと

$$
(1+|k|^2)^j\widetilde f(t,k)
=\int e^{-ik\cdot x}(1-\Delta_x)^j f(t,x)dx.
$$

境界項は Schwartz 関数の急減少性から零です。任意の $N\ge0$ について $2j\ge N$ を選びます。右辺の微分は有限個の Schwartz 半ノルムによって、$t\ge0$ で定数倍の $(1+t)^{-2}(1+|x|)^{-d-1}$ に抑えられます。空間の積分は有限なので定数 $C_N$ を選び

$$
|\widetilde f(t,k)|\le C_N(1+t)^{-2}(1+|k|)^{-N}
$$

と評価でき、$g$ にも同じ評価があります。$d=1$ では空間積分を省いて時間の急減少性を使います。また

$$
\int_\mathbb R\frac{dp}{p^2+\varepsilon_k^2}
=\frac{\pi}{\varepsilon_k}\le\frac{\pi}{m}
$$

です（$p=\varepsilon_k u$ と置いて $\arctan u$ を評価）。従って $2N>d-1$ を選べば全変数で絶対可積分です。[Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02) により $p$ を先に積分できます。[時間指数核](#thm-mqfc8-time-kernel) を $\tau=-(t+s)$、$a=\varepsilon_k$ で適用すると

$$
\begin{aligned}
B_m(\theta f,g)
&=\frac1{(2\pi)^{d-1}}\int dk\int_0^\infty dt\,ds\\
&\quad\times\frac{e^{-\varepsilon_k(t+s)}}{2\varepsilon_k}
\overline{\widetilde f(t,k)}\widetilde g(s,k)\\
&=\frac1{(2\pi)^{d-1}}\int
\frac{\overline{L_m f(k)}L_m g(k)}{2\varepsilon_k}\,dk.
\end{aligned}
$$

有限和と積分を交換し、共役をまとめると

$$
\sum_{i,j}\overline{c_i}c_j B_m(\theta f_i,f_j)
=\frac1{(2\pi)^{d-1}}\int
\frac{|\sum_j c_j L_m f_j(k)|^2}{2\varepsilon_k}\,dk\ge0.
$$

質量の正値性により重みは正であり、先の評価で積分は有限です。
<!-- proof-end -->

$d=1$ の場合は空間周波数がなく、結果は

$$
B_m(\theta f,f)=\frac1{2m}\left|\int_0^\infty e^{-mt}f(t)dt\right|^2.
$$

正時間に台を持つ非零の $f$ でも Laplace 積分が零なら反射形式は零になります。通常の自由共分散は [共分散の正値性](../MQFC5/index.md#thm-mqfc5-positivity) により非零の $f$ で真に正ですが、反射形式では非零の零方向が現れます。

## 3. 線形の測定から全多項式へ

線形測定の反射共分散が正でも、一般の確率測度では高次の反射相関が正とは限りません。

例えば $d=1$ で、$(X,Y)$ が $(1,0),(-1,0),(0,1),(0,-1)$ を各確率 $1/4$ で取るとします。[Diracのデルタ超関数](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-dirac) を $\delta_a(f)=f(a)$ として $\omega=X\delta_1+Y\delta_{-1}$ と置けば時間反転は $X,Y$ の交換であり、分布は不変です。$f\in S_+$ では $X_f=f(1)X$、反転測定は $f(1)Y$ なので全ての線形反射共分散は $E[XY]=0$ により零です。しかし $f(1)=1$ の試験関数を選んで $F=X_f^2-1/2$ とすると

$$
(F,F)_\theta=E[X^2Y^2]-\tfrac12 E[X^2+Y^2]+\tfrac14=-\tfrac14.
$$

この場は有限個の連続点評価の線形結合なので測定は有界で全絶対モーメントを持ちます。線形の条件だけで高次の条件を結論できないことが分かります。

自由場では Gaussian 性が橋渡しになります。ここで中心化実 Gaussian 場とは、どの有限個の実測定を取っても結合分布が平均零の多変量正規分布となる場です。退化した正規分布も含みます。[Gaussian型特性汎関数の有限次元整合性](../MQFC6/index.md#thm-mqfc6-gaussian-characteristic) にあるように、同じ平均と共分散を持つ中心化 Gaussian ベクトルは同じ分布です。

正時間の実測定 $X_i=X_{f_i}$ と負時間の測定 $Y_i=X_{\theta f_i}$ を選び、$K_{ij}=E[Y_iX_j]$ と並べます。反転で $X$ と $Y$ が入れ替わり分布が不変なので $K_{ij}=K_{ji}$ です。共分散を行列に並べる理由は、一次の多項式 $F=\sum_j c_jX_j$ を使うと

$$
(F,F)_\theta=\sum_{i,j}\overline{c_i}K_{ij}c_j
=c^*Kc
$$

になるからです。$c$ は係数を並べた列ベクトル、$c^*=\bar c^{\mathsf T}$ は共役転置です。[共分散の正値性](../MQFC5/index.md#thm-mqfc5-positivity) と同じ行列判定を反射形式について行います。実対称行列 $K$ の正半定値性は、全ての実列ベクトル $v$ で $v^{\mathsf T}Kv\ge0$ となる条件です。$c=u+iv$ と分けると、対称性により交差項が消えて $c^*Kc=u^{\mathsf T}Ku+v^{\mathsf T}Kv$ なので複素係数にも同じ非負性が成り立ちます。試験関数族に一次独立性は要求しません。

前後の測定に共通する Gaussian 変数と、それぞれに独立な Gaussian 変数に分けると、任意の多項式の反射形式は平均の絶対値二乗に帰着します。

<a id="thm-mqfc8-gaussian-extension"></a>

<!-- formal-statement-start -->
> **定理（Gaussian場の多項式反射陽性）**
> 実 Schwartz 空間の連続実線形双対上の中心化実 Gaussian 場の円筒確率測度 $\mu$ が時間反転 $\theta$ で不変であるとする。実試験関数の共分散を $B(f,g)=E_\mu[X_fX_g]$ とし、全ての有限な正時間実試験関数族 $f_1,\ldots,f_n$ に対して行列

$$
K_{ij}=B(\theta f_i,f_j)
$$

> が正半定値であるとする。このとき $\mu$ は多項式に関して反射陽性を持つ。逆に、多項式に関して反射陽性ならこの行列条件が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

正時間の測定ベクトルと負時間の測定ベクトルは同じ周辺共分散 $A$ を持ち、両者の相互共分散は $K$ です。差の共分散から $A-K$ も正半定値だと分かります。そこで共通成分の共分散を $K$、独立な残りの成分の共分散を $A-K$ に設定します。共通成分を固定すると二つの多項式は独立で同じ平均を持ちます。

<!-- proof-start -->
### 証明

$f_1,\ldots,f_n\in S_+$ を固定し、$X_i=X_{f_i}$、$Y_i=X_{\theta f_i}$ とします。反転不変性より $E[X_iX_j]=E[Y_iY_j]=A_{ij}$、$E[Y_iX_j]=E[X_iY_j]=K_{ij}$ です。実際 $E[Y_iX_j]=E[X_iY_j]=E[Y_jX_i]$ なので $K$ は実対称です。

結合ベクトル $(X,Y)$ の共分散は

$$
\begin{pmatrix}A&K\\K&A\end{pmatrix}.
$$

任意の $v\in\mathbb R^n$ について

$$
0\le E[(v^{\mathsf T}(X-Y))^2]
=v^{\mathsf T}Av-2v^{\mathsf T}Kv+v^{\mathsf T}Av
=2v^{\mathsf T}(A-K)v
$$

となり、$A-K$ は正半定値です。$K$ も仮定で正半定値です。

[有限次元Gaussian積分と特性関数](../MQFC6/index.md#thm-mqfc6-finite-gaussian) および [Gaussian型特性汎関数の有限次元整合性](../MQFC6/index.md#thm-mqfc6-gaussian-characteristic) の構成を用います。$D$ を実対称正半定値な $n\times n$ 行列とし、$\xi$ を独立な標準正規成分を持つ $n$ 次元列ベクトルとします。

MQFC6で用いた [半正定値行列の平方根](../../../基礎科目/F0/F0-00F1/index.md#thm-f0-00f1-psd-square-root) $D^{1/2}$ は実対称で、$(D^{1/2})^2=D$ です。$I_n$ を $n$ 次の単位行列とすれば

$$
E[\xi]=0,\qquad E[\xi\xi^{\mathsf T}]=I_n
$$

です。従って

$$
E[D^{1/2}\xi]=0,\qquad
E[(D^{1/2}\xi)(D^{1/2}\xi)^{\mathsf T}]
=D^{1/2}I_nD^{1/2}=D.
$$

独立な標準正規成分の特性関数を掛け合わせれば、特性関数の引数 $\eta\in\mathbb R^n$ に対して

$$
E[e^{i\eta^{\mathsf T}D^{1/2}\xi}]
=\prod_{j=1}^n e^{-(D^{1/2}\eta)_j^2/2}
=e^{-\eta^{\mathsf T}D\eta/2}
$$

になります。零固有値があっても逆行列を使わないので構成できます。

独立な中心化 Gaussian ベクトル $Z,U,V$ を用意し、それぞれの共分散を $K,A-K,A-K$ とします。$(Z+U,Z+V)$ の各周辺共分散は $K+(A-K)=A$、相互共分散は独立性と中心化により $K$ です。例えば $E[(Z_i+U_i)(Z_j+V_j)]=E[Z_iZ_j]$ です。両方の結合ベクトルは中心化 Gaussian で、共分散が同じです。実列ベクトル $u,v\in\mathbb R^n$ を特性関数の引数に取ると、いずれも

$$
\exp\left[-\tfrac12
(u^{\mathsf T}Au+2u^{\mathsf T}Kv+v^{\mathsf T}Av)\right]
$$

となります。一次元の [特性関数の一意性](../../../解析系/F0/F0-00P6/index.md#thm-f0-00p6-uniqueness) に対応するベクトル版を用います。

[Gaussian型特性汎関数の有限次元整合性](../MQFC6/index.md#thm-mqfc6-gaussian-characteristic) の証明では、[確率ベクトルの特性関数収束定理](../../../解析系/F0/F0-00P6/index.md#thm-f0-00p6-levy-continuity-vector) に定数列を代入し、有界 Lipschitz 関数の期待値の一致から分布の一致を導きました。同じ議論を今回の二つの結合ベクトルに適用できます。

従って $(X,Y)$ と $(Z+U,Z+V)$ は同じ分布になります。

$F=P(X)$ とします。$Z$ の分布を $\nu$、$U,V$ に共通の分布を $\rho$ とすれば

$$
\begin{aligned}
(F,F)_\theta
&=E[\overline{P(Z+V)}P(Z+U)]\\
&=\int\nu(dz)\int\rho(dv)\int\rho(du)\,
\overline{P(z+v)}P(z+u)\\
&=\int\nu(dz)\left|\int P(z+u)\rho(du)\right|^2\ge0.
\end{aligned}
$$

全ての Gaussian 絶対モーメントが有限です。$P$ の各項の積の可積分性は第1節で確認した評価で従い、$|\overline{P(Z+V)}P(Z+U)|$ も二つの二乗の平均で抑えられます。従って [Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02) による積分交換は正当です。逆方向は $F=\sum_j c_jX_{f_j}$ と取ると $(F,F)_\theta=\sum_{i,j}\bar c_i c_jK_{ij}$ であることから従います。
<!-- proof-end -->

この定理の仮定を [質量付きEuclid自由場のGaussian測度の構成](../MQFC6/index.md#thm-mqfc6-free-measure) による $\mu_m$ で確認します。任意の実試験関数について $\widehat{\theta f}(p,k)=\widehat f(-p,k)$ であり、$p\mapsto-p$ と置換すれば $B_m(\theta f,\theta g)=B_m(f,g)$ です。全有限族の共分散が反転前後で一致するので、中心化 Gaussian の有限次元分布も一致し、円筒集合上で二つの確率測度は一致します。円筒集合の有限交叉は測定の有限族を合わせれば再び円筒集合であり、全空間を含みます。[π–λ定理](../../../解析系/F0/F0-00D3A/index.md#thm-f0-00d3a-pi-lambda) により生成される $\sigma$ 加法族上でも一致します。

したがって [反射共分散の因子分解](#thm-mqfc8-reflected-covariance) と [Gaussian場の多項式反射陽性](#thm-mqfc8-gaussian-extension) から、自由場 $\mu_m$ は反射陽性を持ちます。

### 四次相関での検算

一つの正時間実測定 $X$ と反転した測定 $Y$ について $E[X^2]=E[Y^2]=a$、$E[XY]=k$ とします。ここで $a$ は分散、$k$ は反射共分散（空間周波数ではない）です。反射共分散の非負性から $k\ge0$、差の分散 $E[(X-Y)^2]=2(a-k)\ge0$ から $k\le a$ です。[Gaussian Schwinger関数のWick対分割公式](../MQFC7/index.md#thm-mqfc7-gaussian-pairing) を $Y,Y,X,X$ に適用すると

$$
E[Y^2X^2]=a^2+2k^2.
$$

$F=X^2-a$ に対しては

$$
(F,F)_\theta
=a^2+2k^2-2a^2+a^2=2k^2.
$$

[Gaussian場の多項式反射陽性](#thm-mqfc8-gaussian-extension) の証明と同じく、共通成分 $Z$ の分散を $k$、残差 $U$ の分散を $a-k$ とします。$E_U$ は $Z$ を固定して $U$ の分布だけで平均する記号です。中心化により $E_U[U]=0$ なので

$$
E_U[(Z+U)^2-a]=Z^2+2ZE_U[U]+(a-k)-a=Z^2-k.
$$

その二乗平均は、[Gaussian Schwinger関数のWick対分割公式](../MQFC7/index.md#thm-mqfc7-gaussian-pairing) により $E[Z^4]=3k^2$ なので

$$
E[(Z^2-k)^2]=3k^2-2kE[Z^2]+k^2=2k^2
$$

となり一致します。

## 4. 演習

### 演習 MQFC8-A1：時間反転の二回適用
- Level: A

$f\in S_+$ について $\theta^2f=f$ と $\widehat{\theta f}(p,k)=\widehat f(-p,k)$ を示せ。反転後の台はどこにあるか。

<!-- solution-start -->
$(\theta^2 f)(t,x)=(\theta f)(-t,x)=f(t,x)$ です。第2節の全 Fourier 変換（空間周波数 $k$ を固定）で時間積分の変数を $u=-t$ と置きます。時間の積分区間は全実直線なので、向きの反転と $dt=-du$ の符号が相殺されます。

$$
\widehat{\theta f}(p,k)=\int e^{ipu-ik\cdot x}f(u,x)\,du\,dx
=\widehat f(-p,k).
$$

$f(t,x)=0$ が $t\le0$ で成立し、台自体が $t>0$ に含まれるので、反転後の台は $t<0$ に含まれます。
<!-- solution-end -->

### 演習 MQFC8-A2：時間核の規格化
- Level: A

$a=2$ として $h(t)=e^{-2|t|}/4$ の Fourier 変換を直接求めよ。$p=0$ の値を積分でも確認せよ。

<!-- solution-start -->
正負の半直線を分けると

$$
\widehat h(p)=\frac14\left(\frac1{2+ip}+\frac1{2-ip}\right)
=\frac14\frac4{4+p^2}=\frac1{4+p^2}.
$$

$p=0$ では $1/4$ です。直接積分すると $2\int_0^\infty e^{-2t}/4\,dt=2(1/2)/4=1/4$ です。これは [時間指数核](#thm-mqfc8-time-kernel) の規格化と一致します。
<!-- solution-end -->

### 演習 MQFC8-A3：一周波数の行列
- Level: A

$a>0$、$t_1,t_2>0$ とし $M_{ij}=e^{-a(t_i+t_j)}/(2a)$ とする。任意の複素ベクトルに対する非負性と零方向を求めよ。この行列は時間指数核の因子分解を表す有限の数値模型とする。

<!-- solution-start -->
$u_i=e^{-at_i}$（$i=1,2$）と置くと、$M$ は実対称な $2\times2$ 行列です。$M_{ij}=u_i u_j/(2a)$ なので、第3節で確認した行列判定に従って $c=(c_1,c_2)^{\mathsf T}\in\mathbb C^2$ の二次形式を展開します。

$$
\begin{aligned}
c^*Mc&=\sum_{i,j=1}^2\bar c_i M_{ij}c_j\\
&=\frac{(\bar c_1u_1+\bar c_2u_2)(u_1c_1+u_2c_2)}{2a}\\
&=\frac{|u_1c_1+u_2c_2|^2}{2a}.
\end{aligned}
$$

分母が正なので非負です。零になる条件は $u_1c_1+u_2c_2=0$ です。$u_1,u_2$ はともに正なので零方向は $(u_2,-u_1)$ の複素定数倍です。
<!-- solution-end -->

### 演習 MQFC8-A4：一次と二次の反射形式
- Level: A

中心化結合 Gaussian 変数 $X,Y$ の分散をともに $3$、共分散を $1$ とする。$F=X$ と $F=X^2-3$ の反射形式をそれぞれ求めよ。

<!-- solution-start -->
一次では $E[YX]=1$ です。二次の場合を求めます。[Gaussian Schwinger関数のWick対分割公式](../MQFC7/index.md#thm-mqfc7-gaussian-pairing) により $E[Y^2X^2]=3\cdot3+2\cdot1^2=11$ です。よって

$$
E[(Y^2-3)(X^2-3)]=11-9-9+9=2.
$$
<!-- solution-end -->

### 演習 MQFC8-B1：零方向を作る
- Level: B

$d=1$、$m>0$ とする。非零の非負の滑らかな関数 $h$ の台は $(1,2)$ のコンパクト部分集合とする。時間 $t$ による通常の微分を $h'=dh/dt$ と書く。$f=h'-mh$ が非零で反射共分散の零方向となることを示せ。

<!-- solution-start -->
$h'$ も同じコンパクト台に含まれるため $f\in S_+$ です。部分積分で

$$
\int_0^\infty e^{-mt}h'(t)dt
=[e^{-mt}h(t)]_0^\infty+m\int_0^\infty e^{-mt}h(t)dt.
$$

境界項は零なので $\int_0^\infty e^{-mt}f(t)dt=0$ です。[反射共分散の因子分解](#thm-mqfc8-reflected-covariance) の $d=1$ の式から $B_m(\theta f,f)=0$ です。もし $f=0$ なら時間 $t$ による積の微分から

$$
\frac{d}{dt}(e^{-mt}h(t))
=e^{-mt}(h'(t)-mh(t))=e^{-mt}f(t)=0
$$

となり、$e^{-mt}h$ は定数です。台の外で零なので全域で零となり $h\ne0$ に矛盾します。
<!-- solution-end -->

### 演習 MQFC8-B2：反射陽性の必要条件
- Level: B

$d=1$ とする。標準正規変数 $Y$ を用い $\omega(f)=Y\int t f(t)dt$ とする。$f\in S_+$ を非負かつ非零のコンパクト台滑らかな関数とし、$X=X_f$ とする。この場の通常の共分散の正半定値性、反転不変性、$F=1+\lambda X$ の反射形式を確認し、反射陽性の失敗を示せ。$\lambda$ は実数とする。

<!-- solution-start -->
$a_i=\int tf_i(t)dt$ とすれば任意の有限族の通常の共分散行列は $a_i a_j$ です。複素係数 $c_i$ に対する二次形式は $|\sum c_i a_i|^2$ で非負です。反転は $\omega$ を $-\omega$ に移し、$Y$ と $-Y$ は同じ分布なので測度は不変です。

$a=\int tf(t)dt>0$ で $X=aY$、$X(\theta\omega)=-aY$ です。従って

$$
(F,F)_\theta=E[(1-\lambda aY)(1+\lambda aY)]
=1-\lambda^2 a^2.
$$

$|\lambda|>1/a$ を取れば負となります。[反射陽性の定義](../../QFT/QFT20/index.md#def-qft20-reflection-positivity) は全多項式に非負性を要求するので条件を満たしません。
<!-- solution-end -->

### 演習 MQFC8-B3：二成分の共通 Gaussian 分解
- Level: B

中心化結合 Gaussian ベクトル $X,Y\in\mathbb R^2$ の各周辺共分散が $A=3I_2$（$I_2$ は2次の単位行列）、相互共分散が

$$
K=\begin{pmatrix}1&1\\1&1\end{pmatrix}
$$

であるとする。$K,A-K$ の正半定値性を確認し、$P(X)=X_1X_2$ の反射形式を共通成分分解で求めよ。

<!-- solution-start -->
第3節の行列判定により、実対称な $K,A-K$ の任意の実列ベクトル $v=(v_1,v_2)^{\mathsf T}$ に対する二次形式を計算します。$v^{\mathsf T}Kv=(v_1+v_2)^2\ge0$ です。また

$$
v^{\mathsf T}(A-K)v
=2v_1^2-2v_1v_2+2v_2^2
=(v_1-v_2)^2+v_1^2+v_2^2\ge0.
$$

[Gaussian場の多項式反射陽性](#thm-mqfc8-gaussian-extension) の証明の構成で $Z=(W,W)$ と取り、$W$ は標準正規とします。$U,V$ は独立な中心化 Gaussian ベクトルで共分散 $A-K$、$Z$ からも独立です。$E[U_1U_2]=-1$、$E[U_1]=E[U_2]=0$ です。$E_U$ は $W$ を固定して $U$ の分布だけで平均する記号とします。$Z$ を固定した平均は

$$
\begin{aligned}
E_U[(W+U_1)(W+U_2)]
&=W^2+W E[U_1]+W E[U_2]+E[U_1U_2]\\
&=W^2-1.
\end{aligned}
$$

従って反射形式は $E[(W^2-1)^2]=3-2+1=2$ です。ここで四次モーメント $E[W^4]=3$ は [Wick対分割公式](../MQFC7/index.md#thm-mqfc7-gaussian-pairing) の三つの対分割から得られます。
<!-- solution-end -->

### 演習 MQFC8-C1：自由場の零方向と非線形測定

- Level: C

$d=1,m>0$ の自由場で実試験関数 $f,g\in S_+$ を取り、$L_m f=0$、$L_m g\ne0$ とする。$X=X_f$、$T=X_g$、$a=B_m(f,g)$、$b=B_m(g,g)$ と置く。$F=XT-a$ と $G=T^2-b$ の反射形式 $(F,F)_\theta,(F,G)_\theta,(G,G)_\theta$ を全て求めよ。$f$ は非零でもよい。

<!-- solution-start -->
$Y=X_{\theta f}$、$V=X_{\theta g}$ とし、$c=(L_m g)^2/(2m)>0$ と置きます。[反射共分散の因子分解](#thm-mqfc8-reflected-covariance) により

$$
E[YX]=E[YT]=E[VX]=0,\qquad E[VT]=c.
$$

反転不変性により $E[YV]=E[XT]=a$、$E[V^2]=E[T^2]=b$ です。

[Wick対分割公式](../MQFC7/index.md#thm-mqfc7-gaussian-pairing) を四変数 $Y,V,X,T$ に適用すると

$$
E[YVXT]=E[YV]E[XT]+E[YX]E[VT]+E[YT]E[VX]=a^2.
$$

従って

$$
\begin{aligned}
(F,F)_\theta
&=E[(YV-a)(XT-a)]\\
&=E[YVXT]-aE[YV]-aE[XT]+a^2\\
&=a^2-2a^2+a^2=0.
\end{aligned}
$$

次に $Y,V,T,T$ に適用すると

$$
E[YVT^2]=ab+2E[YT]E[VT]=ab.
$$

第1節の [反射形式](#def-mqfc8-reflection-positivity) に $F=XT-a$、$G=T^2-b$ を代入すると

$$
\begin{aligned}
(F,G)_\theta
&=E[(YV-a)(T^2-b)]\\
&=E[YVT^2]-bE[YV]-aE[T^2]+ab\\
&=ab-ba-ab+ab=0.
\end{aligned}
$$

最後に $V,V,T,T$ について

$$
E[V^2T^2]=b^2+2c^2
$$

なので

$$
\begin{aligned}
(G,G)_\theta
&=E[(V^2-b)(T^2-b)]\\
&=E[V^2T^2]-bE[V^2]-bE[T^2]+b^2\\
&=b^2+2c^2-2b^2+b^2=2c^2>0.
\end{aligned}
$$

一次の零方向を含む積を中心化すると今回の $F$ は零方向になります。一方 $G$ は正の長さを持ちます。通常の確率変数として $F$ が零と結論することはできません。
<!-- solution-end -->

## 5. 次の講義

反射陽性によって正時間の観測量に非負の長さの二乗が定まりました。ただし零方向を除かなければ内積にはなりません。次講では零方向を同一視してから完備化し、時間並進をその空間に移す方法を学びます。ここでは時間並進の縮小性や Hamiltonian の存在までは仮定していません。

参考文献：K. Osterwalder and R. Schrader, [Axioms for Euclidean Green's Functions](https://doi.org/10.1007/BF01645738) (1973) および [II](https://doi.org/10.1007/BF01608978) (1975)。J. Glimm and A. Jaffe, [Quantum Physics: A Functional Integral Point of View](https://link.springer.com/book/10.1007/978-1-4612-4728-9), 2nd ed. 反射陽性と再構成の他の条件は区別して読む必要があります。
