# MQFC35 Feynman核の対角延長を計算する

前講の[局所反項の自由度](../MQFC34/index.md#thm-mqfc34-counterterm-freedom)は、発散の程度から許される反項の種類を決めました。今回は二つの頂点を二本の内部線で結んだ一ループの核を取り上げ、引き去る項の係数まで求めます。光円錐に沿った特異性と、二つの頂点が一致するときの発散は別々に扱います。

## 1. 二点核から一ループ核へ

自然単位を使い、時空差を $z=(t,\boldsymbol x)\in\mathbb R^4$、Lorentz計量を $(-,+,+,+)$ とします。二次形式は

$$
q(z)=|\boldsymbol x|^2-t^2
$$

です。[Feynman二点分布](../../QFT/QFT6/index.md#def-qft6-feynman-two-point)は時間順序付き真空二点関数でした。既習の表示は質量 $m>0$ の場合なので、ここではエネルギーを $E_{\boldsymbol p}=|\boldsymbol p|$ に置き換え、質量ゼロの場合を原点外で直接作ります。規格化は真空期待値そのもので、基本解にするための追加の $i$ は掛けません。

運動量の大きさを $p=|\boldsymbol p|$、空間距離を $a=|\boldsymbol x|$ とし、収束因子 $e^{-\eta p}$ ($\eta>0$) を入れます。

$$
D_\eta(z)=\int_{\mathbb R^3}
\frac{e^{-(\eta+i|t|)|\boldsymbol p|+i\boldsymbol p\cdot\boldsymbol x}}
{(2\pi)^3\,2|\boldsymbol p|}\,d^3p.
$$

$a>0$ なら空間の極軸を $\boldsymbol x$ の方向に取り、運動量との角を $\theta$、その余弦を $u=\cos\theta$ とします。空間の球座標で $d^3p=p^2dp\,d\Omega$、$d\Omega$ は単位2球面の面積要素です。方位角を積分し、$du=-\sin\theta\,d\theta$ と置換すると

$$
\int_{S^2}e^{ipau}d\Omega
=2\pi\int_{-1}^1 e^{ipau}\,du
=\frac{4\pi\sin(pa)}{pa}.
$$

$p=0$ では右辺を連続値 $4\pi$ とします。$p^2/(2p)$ と角度積分の $1/p$ が相殺されます。$w=\eta+i|t|$ と置くと

$$
D_\eta(z)=\frac1{4\pi^2a}\int_0^\infty e^{-wp}\sin(pa)\,dp.
$$

指数関数へ分けて積分すれば

$$
\int_0^\infty e^{-wp}\sin(pa)\,dp
=\frac1{2i}\left(\frac1{w-ia}-\frac1{w+ia}\right)
=\frac{a}{w^2+a^2}.
$$

よって $a=0$ にも連続に接続する表示は

$$
D_\eta(z)=\frac{1}{4\pi^2}\frac{1}{q(z)+\eta^2+2i\eta|t|}.
$$

原点以外の光円錐 $q=0$ では $|t|>0$ であり、虚部は正側から近づきます。そこで、原点外の分布として

$$
D_F=\frac{1}{4\pi^2}(q+i0)^{-1}
$$

を使います。ここで $i0$ は正の虚部 $i\varepsilon$ を持つ滑らかな核を $\varepsilon\downarrow0$ とした分布極限を表します。これは $q\ne0$ での関数 $1/(4\pi^2q)$ と、光円錐上の正側境界値を合わせたものです。

実際、原点以外の光円錐上では $a=|t|>0$ です。$t$ と空間方向を固定したときの偏微分は $\partial q/\partial a=2a\ne0$ であり、逆変換 $a=\sqrt{q+t^2}$ は正の平方根で滑らかです。よって光円錐近傍では $q,t$ と空間の角度を局所座標に取れます。$t$ を固定して $q$ を $\eta^2$ だけ平行移動した上で虚部 $2\eta|t|$ を零へ近づけると、一次元の[境界値公式](../../../解析系/MICA/MICA4/index.md#prop-mica4-sokhotski)が適用でき、同じ極限を得ます。

光円錐近傍の固定コンパクト集合内で $|t|$ は正の下界を持ち、試験関数の微分も一様有界なので、その局所積分に極限を通せます。

以下では、[Hörmanderの分布積の存在定理](../../../解析系/MICA/MICA6/index.md#thm-mica6-product-existence)でいう逆向きの特異方向が衝突しない積を用います。また、[スケーリング次数](../MQFC32/index.md#def-mqfc32-scaling-degree)は全座標を縮めたときの特異性の強さを測ります。

二頂点で二本の線を縮約すると、位置空間の核は $D_F$ の二乗になります（組合せ係数と結合定数はここでは外に出します）。二本の辺と二頂点を持つ連結グラフでは、一本の辺で頂点を結んだ残りの一本が閉路を作るので一ループです。

<a id="prop-mqfc35-fish-kernel"></a>

<!-- formal-statement-start -->
> **命題（質量ゼロ二線核の次数）**  
> $U=\mathbb R^4\setminus\{0\}$、$q(t,\boldsymbol x)=|\boldsymbol x|^2-t^2$ とする。正側境界値で定めた $D_F=(4\pi^2)^{-1}(q+i0)^{-1}$ の $U$ 上の分布積は存在し、
>
$$
f=D_F^2=\frac{1}{16\pi^4}(q+i0)^{-2}
$$
>
> はスケーリング次数4を持つ。
<!-- formal-statement-end -->

光円錐の原点以外では $q$ が局所座標になるため、既習の一次元の積を使えます。原点へ近づくときには全座標を縮めるので、二乗の次数は4になります。

<!-- proof-start -->
### 証明

$dq$ を全座標についての微分、$x_j$ を空間座標の第 $j$ 成分とします。光円錐上で $z\ne0$ なら

$$
dq=-2t\,dt+2\sum_{j=1}^3 x_j\,dx_j\ne0.
$$

先ほどの局所座標では $\partial q/\partial a=2a\ne0$ でした。$da=dq/(2a)$ はこの固定変数での置換積分を表し、体積要素は

$$
dt\,a^2 da\,d\Omega=\frac a2\,dt\,dq\,d\Omega
$$

となります。[微分同相による分布の座標移送](../../../解析系/MICA/MICA5/index.md#def-mica5-coordinate-pushforward)に従い、このJacobian因子を試験関数に含めます。

その座標で $D_F$ は一次元の $(q+i0)^{-1}$ の定数倍を他の座標へ定数として広げたものです。[同側境界値の積](../../../解析系/MICA/MICA6/index.md#prop-mica6-boundary-product)と[波面集合の座標変換則](../../../解析系/MICA/MICA5/index.md#thm-mica5-coordinate-change)により、局所座標で二因子の波面は同じ符号の $dq$ 方向に限られ、逆向きの組はありません。従って分布積が存在し、二乗の非定数部分は $(q+i0)^{-2}$ になります。光円錐の外では滑らかな通常の積なので、これらは重なりで一致します。

[分布のスケール変換](../MQFC32/index.md#def-mqfc32-dilation)では $z=\lambda y$ ($\lambda>0$) と置換すると体積の $\lambda^4$ が規格化の $\lambda^{-4}$ と相殺されます。境界値近似には

$$
(q(\lambda y)+i\varepsilon)^{-2}
=\lambda^{-4}(q(y)+i\varepsilon/\lambda^2)^{-2}
$$

が成り立ちます。固定した $\lambda$ で $\varepsilon\downarrow0$ とすれば

$$
f_\lambda=\lambda^{-4}f.
$$

空間的分離の点では正の通常関数なので $f\ne0$ です。[斉次分布のスケーリング次数](../MQFC32/index.md#thm-mqfc32-homogeneous-degree)より次数は4です。
<!-- proof-end -->

光円錐上の分布積はこの段階で決まりましたが、原点は座標 $q$ の微分が零になる場所なので、この論証をそのまま使えません。以降は原点への延長を作ります。

## 2. 角度部分の積分を計算する

原点を除いた4次元空間でEuclid半径 $\rho=(t^2+|\boldsymbol x|^2)^{1/2}$、方向 $\omega=z/\rho\in S^3$ を使います。$S^3$ は $\mathbb R^4$ の単位球面、$\omega_0=t/\rho$ は時間方向成分です。これは積分の分解に用いる補助座標で、Lorentz計量を変更したわけではありません。

半径と角度の変数で

$$
q(z)=\rho^2 Q(\omega),\qquad Q(\omega)=1-2\omega_0^2
$$

です。角度の分布を

$$
A=\frac1{16\pi^4}(Q+i0)^{-2}
$$

と置きます。$Q=0$ では $\omega_0=\pm1/\sqrt2$ なので、球面上で $\omega_0$ を座標に使えます。実際、空間方向 $\nu\in S^2$ を用いた逆表示は $\omega=(\omega_0,\sqrt{1-\omega_0^2}\,\nu)$ であり、$|\omega_0|<1$ では滑らかです。この座標に関して

$$
\frac{dQ}{d\omega_0}=-4\omega_0\ne0.
$$

したがって一次元の境界値を局所座標で定義でき、コンパクトな球面上では任意の滑らかな関数に作用します。

原点を避ける試験関数への作用は、体積要素 $\rho^3 d\rho\,d\omega$ と核の $\rho^{-4}$ を組み合わせて

$$
\langle f,\varphi\rangle
=\int_0^\infty\frac{d\rho}{\rho}
\langle A,\omega\mapsto\varphi(\rho\omega)\rangle
$$

となります。これを確認するには、まず原点を避ける台を含む半径区間 $[a,b]$ ($0<a<b<\infty$) を固定します。滑らかな近似核は

$$
\frac{\rho^{-4}}{16\pi^4}(Q+i\varepsilon/\rho^2)^{-2}
$$

となります。$Q=0$ の近傍では一次元の境界値の収束とその微分による評価を使えます。実際、局所座標 $s=Q$ でコンパクトな台を持つ関数 $h$ に対し、$h'$ を $dh/ds$、$h''$ を $d^2h/ds^2$ と書き、部分積分すると

$$
\int\frac{h(s)}{(s+i v)^2}\,ds
=\int\frac{h'(s)}{s+i v}\,ds
\qquad(v>0).
$$

対称区間 $[-L,L]$ に台を収め、$h'(s)-h'(0)$ と定数項へ分けます。前者は

$$
|h'(s)-h'(0)|\le |s|\sup|h''|
$$

により積分が一様有界です。定数項の積分も

$$
h'(0)\int_{-L}^L\frac{ds}{s+iv}
=-2i\arctan(L/v)h'(0)
$$

で、一様有界です。球面の有限個の座標近傍でこの評価を使えば、$\rho\in[a,b]$ の滑らかな角度関数とその微分は一様有界であるため、半径積分に境界値の極限を通せます。$Q\ne0$ の近傍は通常の関数として収束します。

光円錐では角度積分を普通の関数の積分へ置き換えないことが重要です。定数関数1への作用 $C=\langle A,1\rangle$ が対数発散の係数になります。

<a id="prop-mqfc35-angular-residue"></a>

<!-- formal-statement-start -->
> **命題（二線核の角度係数）**  
> $S^3$ に標準球面測度を使い、$Q(\omega)=1-2\omega_0^2$ とする。次の境界値積分が成立する。
>
$$
C=\frac1{16\pi^4}\lim_{\varepsilon\downarrow0}
\int_{S^3}(Q+i\varepsilon)^{-2}\,d\omega
=-\frac{i}{8\pi^2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

角度だけの積分を、実部が正である複素Gaussian積分に変換します。時刻方向と空間三方向で異なる複素位相が残り、Euclid核とは異なる係数が現れます。

<!-- proof-start -->
### 証明

$\varepsilon>0$ とし、$H(z)=\varepsilon |z|^2-iq(z)$ と置きます。実部が $\varepsilon|z|^2$ なので絶対可積分です。直交座標では

$$
H(z)=(\varepsilon+i)t^2+(\varepsilon-i)|\boldsymbol x|^2.
$$

実部正の複素数 $b$ に対し

$$
J(b)=\int_\mathbb R e^{-bu^2}du
$$

と置きます。$J'(b)=dJ/db$ は複素変数 $b$ に関する微分です。$b$ の近傍で $\operatorname{Re}b\ge c>0$ を保てば、微分した被積分関数は $u^2e^{-cu^2}$ で抑えられるので、

$$
J'(b)=-\int_{\mathbb R}u^2e^{-bu^2}du.
$$

一方、$b$ を固定して実変数 $u$ で微分すると

$$
\frac d{du}(ue^{-bu^2})=(1-2bu^2)e^{-bu^2}.
$$

両端で $ue^{-bu^2}$ が零へ収束するので、この導関数の積分は零です。二つの積分を照合すると

$$
J(b)+2bJ'(b)=0.
$$

正の実軸では実Gaussian積分により $J(b)=\sqrt\pi b^{-1/2}$ です。右半平面で偏角を $(-\pi/2,\pi/2)$ に選ぶと

$$
(b^{1/2}J(b))'=0
$$

です。実際、積の微分は $b^{1/2}J'(b)+J(b)/(2b^{1/2})=0$ になります。右半平面は連結であり、正の実軸で定数が $\sqrt\pi$ と決まるので同じ式が成り立ちます。従って

$$
\int_{\mathbb R^4}e^{-H(z)}d^4z
=\pi^2(\varepsilon+i)^{-1/2}(\varepsilon-i)^{-3/2}.
$$

一方極座標では $H(\rho\omega)=\rho^2(\varepsilon-iQ)$。$s=\rho^2$ と置けば $\rho^3d\rho=s\,ds/2$ です。$\operatorname{Re}b>0$ のとき部分積分で $\int_0^\infty s e^{-bs}ds=b^{-2}$ となるので

$$
\int_{\mathbb R^4}e^{-H(z)}d^4z
=\frac12\int_{S^3}(\varepsilon-iQ)^{-2}d\omega.
$$

$\varepsilon-iQ=-i(Q+i\varepsilon)$ であり、二乗の逆数にすると負号が付きます。両表示を等置して

$$
\int_{S^3}(Q+i\varepsilon)^{-2}d\omega
=-2\pi^2(\varepsilon+i)^{-1/2}(\varepsilon-i)^{-3/2}.
$$

極限では前者の冪が $e^{-i\pi/4}$、後者が $e^{3i\pi/4}$ となり、積は $e^{i\pi/2}=i$。規格化 $1/(16\pi^4)$ を掛けると $C=-i/(8\pi^2)$ です。角度分布の存在は節冒頭の局所座標の確認によるので、定数1への境界値極限を取れます。
<!-- proof-end -->

比較として、Euclid自由場の質量ゼロ核 $1/(4\pi^2\rho^2)$ を二乗した場合には、角度分布は定数 $1/(16\pi^4)$ です。実Gaussian積分を極座標で計算すると球面積は $2\pi^2$ だから、係数は

$$
\frac{2\pi^2}{16\pi^4}=\frac1{8\pi^2}.
$$

この正の実数をLorentzの場合へそのまま代入してはいけません。

## 3. 位置空間での減算とcutoff反項

半径 $R>0$ を決め、[原点Taylor減算](../MQFC33/index.md#def-mqfc33-subtraction)の零階の場合として原点の値だけを引きます。$\delta$ は[Diracのデルタ分布](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-dirac)で、試験関数の原点での値を取ります。角度分布の作用は滑らかな角度関数に対して取り、半径の積分はその後に行います。

<a id="thm-mqfc35-fish-extension"></a>

<!-- formal-statement-start -->
> **定理（二線核の減算延長とcutoff反項）**  
> $z=(t,\boldsymbol x)\in\mathbb R^4$、$q(z)=|\boldsymbol x|^2-t^2$ とする。原点外の核を $f=(16\pi^4)^{-1}(q+i0)^{-2}$、球面 $S^3$ 上の分布を
>
$$
A=\frac{1}{16\pi^4}(1-2\omega_0^2+i0)^{-2}
$$
>
> とし、$C=\langle A,1\rangle=-i/(8\pi^2)$ とする。$R>0$ に対して、試験関数 $\varphi\in C_c^\infty(\mathbb R^4)$ への作用を
>
$$
\langle T_R,\varphi\rangle=
\int_0^\infty\frac{d\rho}{\rho}
\langle A,\varphi(\rho\,\cdot)-\mathbf1_{\{\rho<R\}}\varphi(0)\rangle
$$
>
> と定めると、$T_R$ は次数4を保つ延長である。原点を半径 $\ell>0$ で除いた分布
>
$$
\langle f_\ell,\varphi\rangle
=\int_\ell^\infty\frac{d\rho}{\rho}\langle A,\varphi(\rho\,\cdot)\rangle
$$
>
> に対して、分布として
>
$$
T_R=\lim_{\ell\downarrow0}
\bigl(f_\ell-C\log(R/\ell)\delta\bigr)
$$
>
> が成り立つ。任意の $S>0$ で $T_S-T_R=-C\log(S/R)\delta$ であり、次数4を保つ全延長は $T_R+c\delta$ ($c\in\mathbb C$) である。
<!-- formal-statement-end -->

### 証明の見取り図

角度分布は普通の有界関数ではありませんが、有限個の角度微分で評価できます。減算した関数はそれらの微分も含めて半径に比例して小さくなるため、対数発散を打ち消せます。cutoffの定数項だけを積分すると、引くべきデルタ反項の係数になります。

<!-- proof-start -->
### 証明

球面を有限個の座標近傍に分け、各近傍に滑らかな分割を取ります。[超関数の局所有限階評価](../../../解析系/GPDE/GPDE1/index.md#prop-gpde1-local-finite-order)を各座標の境界値分布へ適用し、台がコンパクトな各分割を掛けます。最大の微分階数を $N$、評価定数の和を $K$ とすれば、角度関数 $g$ に対して

$$
|\langle A,g\rangle|\le K\|g\|_{C^N(S^3)}
$$

です。ここで右辺は有限個の局所座標における微分の最大値をまとめたものです。$\rho<\min(1,R)$ で

$$
\varphi(\rho\omega)-\varphi(0)
=\rho\int_0^1 \omega\cdot(\nabla\varphi)(s\rho\omega)\,ds.
$$

角度微分を $N$ 階まで行うと、$\omega$ の微分は各座標のコンパクト部分で有界です。$\nabla\varphi$ に連鎖律が作用するたび $s\rho\le1$ が掛かり、$\varphi$ の微分階数は最大 $N+1$ です。よってある定数 $K'$ で

$$
|\langle A,\varphi(\rho\,\cdot)-\varphi(0)\rangle|
\le K'\rho\max_{|\alpha|\le N+1}
\sup_{|z|\le1}|\partial^\alpha\varphi(z)|.
$$

この評価を $d\rho/\rho$ で積分すると原点近傍で有限です。残りは正の半径の下界があり、試験関数の台と $R$ から上界も取れるので有限階の微分上限で抑えられます。従って $T_R$ は分布です。

原点を避ける試験関数なら $\varphi(0)=0$ で、減算が消えるため[原点を越える分布の延長](../MQFC33/index.md#def-mqfc33-extension)の条件を満たします。

$0<\ell<R$ では

$$
\int_\ell^R\frac{d\rho}{\rho}\langle A,\varphi(0)\rangle
=C\varphi(0)\log(R/\ell).
$$

従って $f_\ell$ からこの項を引いた作用と $T_R$ の差は、減算済みの $0<\rho<\ell$ 部分の負であり、先の評価で絶対値は試験関数ごとに $O(\ell)$ です。これでcutoff極限が得られます。

$S>R$ のとき二つの減算の差は $-C\varphi(0)\int_R^S d\rho/\rho$。$S<R$ の場合も交換して同じ式を得ます。

[分布のスケール変換](../MQFC32/index.md#def-mqfc32-dilation)では

$$
\langle (T_R)_\lambda,\varphi\rangle
=\lambda^{-4}\langle T_R,\varphi(\,\cdot\,/\lambda)\rangle.
$$

半径を $\rho=\lambda s$ と置き換えると $d\rho/\rho=ds/s$、減算の範囲は $s<R/\lambda$ に変わるので

$$
(T_R)_\lambda
=\lambda^{-4}T_{R/\lambda}
=\lambda^{-4}(T_R+C\log\lambda\,\delta).
$$

任意の実数 $\gamma>4$ に対して $\lambda^{\gamma-4}$ と $\lambda^{\gamma-4}\log\lambda$ はともに零へ収束するので次数は4以下です。一方、原点を避ける試験関数に対しては $(T_R)_\lambda$ の作用は $f_\lambda$ の作用と一致します。従って全空間で零に収束する規格化は原点外でも零に収束しなければならず、[質量ゼロ二線核の次数](#prop-mqfc35-fish-kernel)より延長の次数は4以上です。従って正確に4です。

最後に[局所反項の自由度](../MQFC34/index.md#thm-mqfc34-counterterm-freedom)に次元4、次数4を代入すると許容微分階数は $\lfloor4-4\rfloor=0$。全自由度はデルタの係数一個であり、逆にどの係数を選んでも次数4が保たれます。
<!-- proof-end -->

例として $R=1$ の長さ単位では、$f_\ell$ の発散部分は $-i\log(1/\ell)\delta/(8\pi^2)$ です。これを引くために加える反項は正の $i\log(1/\ell)\delta/(8\pi^2)$ になります。$R$ を倍にすると有限部分の差は $+i\log2\,\delta/(8\pi^2)$。どちらも原点だけに支持を持ちます。

ここで採用した球による減算はEuclid半径を使用しており、Lorentz不変性の検証を別に行う必要があります。この講で計算したのは分布としての延長とその局所自由度です。

## 4. 原点の反項を二頂点の対角へ戻す

二点 $(x,y)$ の核を試験関数 $\Phi(x,y)$ へ作用させるには、$z=x-y$ と $y$ を独立変数に取ります。変換 $(z,y)\mapsto(z+y,y)$ の逆変換は $(x,y)\mapsto(x-y,y)$ です。微分行列を4次元単位行列 $I_4$ でブロック表示すると

$$
\frac{\partial(x,y)}{\partial(z,y)}
=\begin{pmatrix}I_4&I_4\\0&I_4\end{pmatrix},
\qquad \det\left(\frac{\partial(x,y)}{\partial(z,y)}\right)=1.
$$

従って体積要素 $d^4x\,d^4y=d^4z\,d^4y$ を保つため、

$$
\psi(z)=\int_{\mathbb R^4}\Phi(y+z,y)\,d^4y
$$

と置きます。ここでは $\Phi\in C_c^\infty(\mathbb R^8)$ を仮定しています。$\Phi$ の台を逆変換した集合はコンパクトであり、その $z$ への射影もコンパクトです。$y$ の積分は共通の有界集合に限られ、$z$ 微分を積分の中へ通せます。従って $\psi$ は滑らかでコンパクトな台を持ち、相対座標の分布 $T_R$ を $\psi$ に作用させられます。反項 $c\delta$ は

$$
\langle c\delta,\psi\rangle
=c\int_{\mathbb R^4}\Phi(y,y)\,d^4y
$$

となります。例えば $\Phi(x,y)=g(x)h(y)$ なら $c\int g(y)h(y)d^4y$ です。二点が離れた試験関数には作用せず、[挿入点の配置空間と衝突対角](../MQFC31/index.md#def-mqfc31-collision)のうち二点対角にだけ寄与する理由が分かります。

同じ二点核を用いても、減算半径や有限反項の規格化は選び直せます。この選択を固定することと、光円錐上の境界値の符号を変更することは全く異なります。

## 5. 演習

### 演習 MQFC35-A1：空間的分離での核
- Level: A

$t=0$、$|\boldsymbol x|=2$ における $D_F$ と二線核 $f$ の関数としての値を求めよ。また全座標を3倍した場合の比を求めよ。

<!-- solution-start -->
**詳細解答**

$q=4$ は正なので境界値は通常の逆数になる。第1節の規格化から

$$
D_F=\frac1{16\pi^2},\qquad f=\frac1{256\pi^4}.
$$

全座標を3倍すると $q$ は9倍なので、二点核は $1/9$ 倍、二乗は $1/81$ 倍になる。これは[質量ゼロ二線核の次数](#prop-mqfc35-fish-kernel)の斉次性と一致する。
<!-- solution-end -->

### 演習 MQFC35-A2：境界値の符号
- Level: A

一次元の $u_\pm=(s\pm i0)^{-1}$ について、$u_+^2$ が $u_-^2$ と異なることをデルタの導関数を使って示せ。

<!-- solution-start -->
**詳細解答**

[境界値公式](../../../解析系/MICA/MICA4/index.md#prop-mica4-sokhotski)では $u_\pm=\mathrm{pv}(1/s)\mp i\pi\delta$ である。ここで $\partial_s$ は $s$ に関する分布微分で、$\delta'=\partial_s\delta$ は $\langle\delta',\varphi\rangle=-\varphi'(0)$ と作用する。試験関数の $\varphi'$ は $s$ に関する通常の導関数である。[同側境界値の積](../../../解析系/MICA/MICA6/index.md#prop-mica6-boundary-product)によって

$$
u_+^2-u_-^2=-\partial_s(u_+-u_-)=2i\pi\delta'.
$$

原点近傍で $s$ と一致する試験関数を取ると $\delta'$ の作用は $-1$ だから差は $-2i\pi$ で零ではない。
<!-- solution-end -->

### 演習 MQFC35-A3：反項の符号
- Level: A

第3節の $R=2$、$\ell=1/2$ において、cutoffから差し引く係数と、実際に足すデルタの係数を求めよ。

<!-- solution-start -->
**詳細解答**

半径比は4。[二線核の角度係数](#prop-mqfc35-angular-residue)より $C=-i/(8\pi^2)$ なので、差し引く項の係数は

$$
C\log4=-\frac{i\log4}{8\pi^2}.
$$

[cutoff反項の定理](#thm-mqfc35-fish-extension)はこの項を引くので、加える係数は $+i\log4/(8\pi^2)$ となる。
<!-- solution-end -->

### 演習 MQFC35-A4：二点対角
- Level: A

$\Phi(x,y)=g(x)h(y)$ とし、$g,h\in C_c^\infty(\mathbb R^4)$ の台が交わらないとする。相対座標のデルタ反項の作用を求めよ。

<!-- solution-start -->
**詳細解答**

第4節の変換で $\psi(z)=\int g(y+z)h(y)d^4y$ となる。$\delta$ は $\psi(0)$ を取るから作用は $c\int g(y)h(y)d^4y$。台が交わらず積が恒等的に零なので作用は零である。各頂点の台が近くても、交わらない限りこの局所項は寄与しない。
<!-- solution-end -->

### 演習 MQFC35-B1：Euclid核の反項
- Level: B

$e(z)=1/(16\pi^4|z|^4)$ を4次元Euclid空間の原点外で考える。球状cutoffでの対数係数と減算尺度変更を求め、Lorentz核と比較せよ。

<!-- solution-start -->
**詳細解答**

実Gaussian積分を直交座標で計算すると

$$
\int_{\mathbb R^4}e^{-|z|^2}d^4z=\pi^2.
$$

極座標での半径積分は

$$
\int_0^\infty e^{-\rho^2}\rho^3d\rho=\frac12
$$

なので球面積は $2\pi^2$。したがって角度係数は

$$
C_E=\frac{2\pi^2}{16\pi^4}=\frac1{8\pi^2}.
$$

半径 $\ell$ から $R$ まで定数項を積分すると $C_E\varphi(0)\log(R/\ell)$。[臨界核の対数尺度変更](../MQFC34/index.md#prop-mqfc34-log-scale)に係数 $1/(16\pi^4)$ を掛けると

$$
T^E_S-T^E_R=-\frac{\log(S/R)}{8\pi^2}\delta.
$$

Lorentzの場合は $C=-i C_E$ なので差は $+i C_E\log(S/R)\delta$ である。角度境界値を普通の正の積分に置き換えられないことがこの位相の差に現れる。
<!-- solution-end -->

### 演習 MQFC35-B2：異なる減算尺度を同じ規格化にする
- Level: B

原点近傍で1となる試験関数 $\chi$ を固定し、$\langle T_R+c_R\delta,\chi\rangle=0$ とする。$c_R$ の一意性と $c_S-c_R$ を求めよ。

<!-- solution-start -->
**詳細解答**

$\chi(0)=1$ なので $c_R=-\langle T_R,\chi\rangle$ と一意に決まる。[二線核の減算延長とcutoff反項](#thm-mqfc35-fish-extension)より

$$
c_S-c_R=-\langle T_S-T_R,\chi\rangle
=C\log(S/R).
$$

$C=-i/(8\pi^2)$ を代入すると $-i\log(S/R)/(8\pi^2)$。規格化した延長の差は $-C\log(S/R)\delta+(c_S-c_R)\delta=0$ である。
<!-- solution-end -->

### 演習 MQFC35-B3：縮尺で生じる対数
- Level: B

$V=T_R+c\delta$ とする。$(V)_\lambda-\lambda^{-4}V$ を求め、有限反項 $c$ の選択でこの差を消せるか調べよ。

<!-- solution-start -->
**詳細解答**

[二線核の減算延長とcutoff反項](#thm-mqfc35-fish-extension)の証明で $(T_R)_\lambda=\lambda^{-4}(T_R+C\log\lambda\,\delta)$ を得た。[デルタ導関数のスケーリング次数](../MQFC32/index.md#prop-mqfc32-delta-degree)の零階の変換式は $\delta_\lambda=\lambda^{-4}\delta$ である。従って

$$
(V)_\lambda-\lambda^{-4}V
=\lambda^{-4} C\log\lambda\,\delta.
$$

$c$ の項は相殺される。$C\ne0$ だから $\lambda\ne1$ では差は非零であり、定数の有限反項では厳密な斉次性を回復できない。
<!-- solution-end -->

### 演習 MQFC35-C1：滑らかなcutoffと有限反項
- Level: C

$\kappa:[0,\infty)\to[0,1]$ を滑らかで、$u\le1$ で0、$u\ge2$ で1とする。$f^\kappa_\ell$ を第2節の動径積分に $\kappa(\rho/\ell)$ を掛けて定める。$0<2\ell<R$ の場合について、$f^\kappa_\ell-C\log(R/\ell)\delta$ の極限を求めよ。鋭いcutoffとの差が局所項になることを示せ。

<!-- solution-start -->
**詳細解答**

鋭いcutoff $f_\ell$ との差は $\ell<\rho<2\ell$ にしか寄与しない。$\rho=\ell u$ と置くと

$$
\langle f^\kappa_\ell-f_\ell,\varphi\rangle
=\int_1^2\frac{\kappa(u)-1}{u}
\langle A,\varphi(\ell u\,\cdot)\rangle du.
$$

第3節の角度微分評価で $\varphi(\ell u\,\cdot)-\varphi(0)$ への作用は $O(\ell)$（$1\le u\le2$ で一様）。よって定数項と残りへ分けると

$$
\langle f^\kappa_\ell-f_\ell,\varphi\rangle
=C\varphi(0)\int_1^2\frac{\kappa(u)-1}{u}du+O(\ell).
$$

$J=\int_1^2(1-\kappa(u))du/u$ と置けば $0\le J\le\log2$。差の極限は $-CJ\delta$ である。[二線核の減算延長とcutoff反項](#thm-mqfc35-fish-extension)の鋭いcutoff極限を足して

$$
\lim_{\ell\downarrow0}
(f^\kappa_\ell-C\log(R/\ell)\delta)=T_R-CJ\delta.
$$

鋭いcutoffと同じ規格化を得たいならさらに $+CJ\delta$ を足す。原点外ではcutoffの差は消え、残るのはデルタだけである。従って発散の係数は同じでも、有限部分はcutoffの形に依存する。
<!-- solution-end -->

## 6. 次の講義

二点の衝突では一つの相対座標の原点だけを延長しました。次講では三点以上のうち一部分だけが衝突する場合を扱い、部分対角と全対角の延長を区別します。

## 7. 直接前提講座

- [MQFC31](../MQFC31/index.md)
- [MQFC32](../MQFC32/index.md)
- [MQFC33](../MQFC33/index.md)
- [MQFC34](../MQFC34/index.md)
- [MICA6](../../../解析系/MICA/MICA6/index.md)
- [QFT6](../../QFT/QFT6/index.md)
- [GPDE1](../../../解析系/GPDE/GPDE1/index.md)
