# MICA13 Radzikowskiの波面集合条件

<!-- definition-example-audit: strict -->

[MICA12の局所Hadamard式](../MICA12/index.md#def-mica12-local-parametrix)は、正周波数の $i0$ 処方と幾何学的な係数から短距離の特異部分を記述しました。しかし、一般の曲がった時空で二点分布を全域にわたって一つの式で表すことはできません。複数の測地線が二点を結ぶこともあります。**局所式を貼り合わせる代わりに、特異性の「位置と余接方向」を指定できないか**がこの章の問いです。

[MICA3の波面集合](../MICA3/index.md#def-mica3-wavefront)、[MICA9の零測地線とHamilton流](../MICA9/index.md#thm-mica9-null-geodesic)、[MICA10の伝播定理](../MICA10/index.md#thm-mica10-propagation)を結びます。結果は、どの二点が特異に結ばれるかに加え、**一方の余接ベクトルだけを未来向きに取る**という条件です。もう一方には負符号が付きます。

本章の道筋は、(1) 幾何学的な二点関係を定義し、(2) 平坦模型で向きを検算し、(3) 交換子条件による等号・二状態の滑らかな差を証明し、(4) 局所Hadamard形との同値で、何を既習定理で示し何を原論文の深い補題に依存するかを分ける、というものです。

## 1. 二点を結ぶ零測地線と余接方向

舞台を固定します。$(M,g)$ は境界のない、時間向き付き滑らかな**4次元大域双曲Lorentz時空**、計量の符号は $(-,+,+,+)$ です。[MICA11の実Klein–Gordon場](../MICA11/index.md#def-mica11-smeared-algebra)と同じく

$$
P=-\Box_g+m^2+\xi R,\qquad m\ge0,\quad\xi\in\mathbb R
$$

を固定し、二点量は $M\times M$ 上の分布核 $W=\omega_2$ として扱います。二点での「値」$W(x,y)$ は一般に定義されません。[二点分布の条件](../MICA11/index.md#def-mica11-two-point-conditions)に従い、$P_xW=P_yW=0$、正値性、Hermite性、交換子条件

$$
W(x,y)-W(y,x)=-iE(x,y)
$$

を仮定する場面を明示します。$E$ は[遅延 − 先進の因果伝播子](../../HPDE/HPDE21/index.md#def-hpde21-causal-propagator)であり、この符号規約は[MICA11の正弦核計算](../MICA11/index.md#def-mica11-two-point-conditions)と一致します。**波面条件はこれらの条件から自動的には出ません**。

共変ベクトル $k\in T_x^*M$ の計量双対は $k^\sharp=g^{-1}(k,\cdot)$ です。零でない $k$ が $g^{-1}(k,k)=0$ を満たし、$k^\sharp$ が未来向きなら、これを**未来向き光的共変ベクトル**とします（[MICA11の高周波方向](../MICA11/index.md#prop-mica11-positive-direction)）。$(-,+,+,+)$ 計量では、平坦座標の $(-1,\boldsymbol n)$（$|\boldsymbol n|=1$）が未来向きです。$dt$ の係数が正だと未来向きになる、という判定は誤りです。

二点を一本の零測地線が結ぶとき、曲線に沿って余接ベクトルを平行移動できます。[MICA9の双特性曲線](../MICA9/index.md#def-mica9-bicharacteristic)ではその移動が主シンボルのHamilton流に対応しました。ここでは、曲線上の順序だけでなく、余接ベクトルを平行移動した**同じ光線**であることを要求します。零測地線は複数存在しても構いません。

<a id="def-mica13-null-pair"></a>

<!-- formal-statement-start -->
> **定義（二点の未来向き零測地線関係）**  
> $x,y\in M$、零でない $k_x\in T_x^*M$、$q_y\in T_y^*M$ に対し、次を満たす組の集合を $\mathcal C^+$ とする。
>
> 1. $x,y$ を結ぶ零測地線 $\gamma$（$x=y$ ではその点を通る零測地線）が存在する。
> 2. $k_x$ は $\gamma$ に余接的に接し、$k_x^\sharp$ は未来向き光的である。
> 3. $k_x$ を $\gamma$ に沿って $y$ へ余接平行移動したベクトル $\tau_{x\to y}k_x$ が $q_y$ に等しい。
>
> このとき $k_y:=-q_y$ として、二点分布用の関係を

$$
\mathcal C^+
=\{(x,k_x;y,-q_y):\ (x,k_x)\sim(y,q_y),\ k_x^\sharp\text{ は未来向き光的}\}
\subset T^*(M\times M)\setminus0
$$

> と書く。$\sim$ は上の零測地線・平行移動関係である。$\mathcal C^-$ は同じ条件で $k_x^\sharp$ を**過去向き**に置き換えた集合である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica13-null-pair -->
### 直接例：平坦時空で符号まで確認する

**定義の確認**。

**定義の条件をすべて検査します**。Minkowski時空で $\boldsymbol n=(1,0,0)$、$x=(3,3,0,0)$、$y=(1,1,0,0)$ と置くと、$\gamma(s)=(1+2s,1+2s,0,0)$ は二点を結ぶ零測地線です。接ベクトルは $(2,2,0,0)$、その計量長は $-2^2+2^2=0$。$k_x=(-a,a,0,0)$（$a>0$）なら $k_x^\sharp=(a,a,0,0)$ は未来向き光的で $\gamma$ と同じ方向です。平坦接続では平行移動により成分が変わらず、$q_y=(-a,a,0,0)$ です。従って**二点波面の第2成分**は $-q_y=(a,-a,0,0)$ になります。

同じ $x,y$ で $(x,k_x;y,q_y)$ としてしまうと、平行移動自体は正しくても二点分布の波面関係の符号は誤ります。この違いは積の位相 $\varphi(x)-\varphi(y)$ の $y$ 微分が負になることから生じます。
<!-- definition-example-end -->

## 2. 波面集合を条件として課す

波面集合の定義で使う局所Fourier変換は $e^{-iz\cdot\zeta}$ の規約です。二点分布では $T^*(M\times M)$ の点を $(x,k_x;y,k_y)$ と書きます。$k_x,k_y$ の**それぞれが零でない**ことをここでは結論の一部とします。一般の分布には片方だけ零である波面方向もあり得るため、その排除は自動ではありません。

<a id="def-mica13-wfsc"></a>

<!-- formal-statement-start -->
> **定義（Hadamard波面集合条件、microlocal spectrum condition）**  
> 時間向き付き4次元Lorentz時空 $(M,g)$ 上の分布型二点量 $W\in\mathcal D'(M\times M)$ が、上で定めた二点の未来向き零測地線関係 $\mathcal C^+$ に対し

$$
WF(W)=\mathcal C^+
$$

> を満たすとき、$W$ は**Hadamard波面集合条件**を満たすという。自由実Klein–Gordon場の状態に用いる際は、双解性・交換子条件・正値性などを別に仮定する。単なる $WF(W)\subset\mathcal C^+$ と、等号の条件を混同しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica13-wfsc -->
### 直接例：Minkowski質量零真空の光円錐

**定義の確認**。

[MICA12で積分から得た正周波数二点分布](../MICA12/index.md#prop-mica12-massless-boundary)を使います。$z=x-y$、$\tau=t_x-t_y$、$\boldsymbol r=\boldsymbol x-\boldsymbol y$ とすれば

$$
W_0(x,y)=\frac{1}{4\pi^2\{r^2-(\tau-i0)^2\}}
=\frac1{8\pi^2\sigma_+(x,y)}.
$$

$z\ne0$ の光円錐の滑らかな部分では、$\sigma=(-\tau^2+r^2)/2$ が横断方向の局所座標になります。$\tau>0$ では $1/(\sigma+i0)$、$\tau<0$ では $1/(\sigma-i0)$ なので、[片側境界値の波面集合](../MICA4/index.md#thm-mica4-boundary-wf)から、前者の波面は $\lambda\,d_x\sigma$（$\lambda>0$）、後者は $\lambda\,d_x\sigma$（$\lambda<0$）です。$d_x\sigma=(-\tau,\boldsymbol r)$ の計量双対の時間成分は $\tau$ だから、いずれも $\lambda\,d_x\sigma$ の計量双対は未来向きです。$d_y\sigma=-d_x\sigma$ が第2変数の負符号を与えます。

対角 $z=0$ では $d\sigma=0$ となるため、今の横断座標の議論だけでは不十分です。[MICA11のFourier積分](../MICA11/index.md#prop-mica11-positive-direction)で $|\boldsymbol p|\to\infty$ の位相微分が $((-1,\boldsymbol n),(1,-\boldsymbol n))$ に近づきますが、**位相微分の極限だけはWFの下側包含の証明ではありません**。その不足は、次の命題で質量殻積分の局所Fourier変換を直接評価して補います。
<!-- definition-example-end -->

この条件は「どこでも正の周波数をFourier変換で選ぶ」という意味ではありません。曲がった時空には大域的な時間並進が不要です。一方、$\mathcal C^+$ は零測地線の幾何と時間向きだけで定まります。質量 $m$ や $\xi R$ は**主シンボルに現れず**、[MICA9の特性集合](../MICA9/index.md#prop-mica9-kg-characteristic)の方向は共通です。ただし、その事実は異なる質量の二点分布が同じ分布になることを意味しません。

対角で未完了だった「位相が正しいだけで本当に特異なのか」を、質量零模型では局所Fourier変換の評価で閉じることができます。

<a id="prop-mica13-flat-wavefront"></a>

<!-- formal-statement-start -->
> **命題（質量零Minkowski真空の全波面方向）**  
> $M=\mathbb R^{1+3}$、$g=-dt^2+d\boldsymbol x^2$、$P=-\Box$ において、[MICA12の正周波数二点分布](../MICA12/index.md#prop-mica12-massless-boundary)

$$
W_0(x,y)=\int_{\mathbb R^3}\frac{d^3p}{(2\pi)^3,2|\boldsymbol p|}
e^{-i|\boldsymbol p|(t_x-t_y)+i\boldsymbol p\cdot(\boldsymbol x-\boldsymbol y)}
$$

> の波面集合は、[二点の零測地線関係](#def-mica13-null-pair)に対して $WF(W_0)=\mathcal C^+$ である。
<!-- formal-statement-end -->

### 証明の見取り図

対角の外では、境界値 $1/(\sigma+i0\tau)$ に[片側境界値の計算](../MICA4/index.md#thm-mica4-boundary-wf)を当てます。対角では $d\sigma=0$ なので、質量殻上の正の測度を滑らかな cutoff で畳み込んだFourier変換を直接調べます。正の積分なので、質量殻のすぐ近くの非急減少部分が打ち消されません。

<!-- proof-start -->
### 証明

$z=(\tau,\boldsymbol r)=x-y$ と置くと $W_0(x,y)=w_0(z)$ です。$z\ne0$ かつ $\sigma(z)\ne0$ では、$w_0=1/(8\pi^2\sigma_+)$ は滑らかです。$z\ne0$ かつ $\sigma=0$ では $d\sigma\ne0$ なので、$\sigma$ を一つの横断座標に取れます。[片側境界値の波面計算](../MICA4/index.md#thm-mica4-boundary-wf)をこの座標へ適用すると $\tau>0$ 側は $\lambda d_z\sigma$（$\lambda>0$）、$\tau<0$ 側は $\lambda d_z\sigma$（$\lambda<0$）だけです。係数は非零なので、これは上側包含でなく等号です。両側とも計量双対が未来向きになります。

残る $z=0$ を調べます。$\kappa(\boldsymbol p)=(-|\boldsymbol p|,\boldsymbol p)$ と置けば $w_0$ のFourier変換は、定数因子を除いて $\kappa(\boldsymbol p)$ に載る正の測度 $d^3p/(2|\boldsymbol p|)$ です。原点の任意に小さい近傍に支持を持つ実試験関数 $\psi\ge0$、$\int\psi>0$ を選び、$\widetilde\psi(z)=\psi(-z)$、$\chi=\psi*\widetilde\psi$ とします。$\chi(0)>0$、$\widehat\chi=|\widehat\psi|^2\ge0$ で、$\widehat\chi$ は原点の近傍で正の下限を持ちます。局所化したFourier変換は

$$
\widehat{\chi w_0}(\zeta)
=\frac1{(2\pi)^3}\int_{\mathbb R^3}
\frac{\widehat\chi(\zeta-\kappa(\boldsymbol p))}{2|\boldsymbol p|}\,d^3p.
$$

任意の単位方向 $\boldsymbol n$ と $R\to\infty$ に対し $\zeta_R=(-R,R\boldsymbol n)$ とします。$|\boldsymbol p-R\boldsymbol n|<\delta$ の固定半径の球では、逆三角不等式より

$$
\bigl||\boldsymbol p|-R\bigr|\le|\boldsymbol p-R\boldsymbol n|<\delta,
\qquad |\zeta_R-\kappa(\boldsymbol p)|\le2\delta.
$$

$\delta>0$ を十分小さく取ると $\widehat\chi\ge c>0$ となり、積分のこの領域への制限だけで $\widehat{\chi w_0}(\zeta_R)\ge c'/R$（$R>2\delta$）を得ます。$\psi$ の支持は任意に小さく選べます。仮に原点でこの方向が正則なら、そこで非零の正則化cutoffを選び、その内側に支持を取った上の $\chi$ も方向別に急減少するはずなので矛盾します。従って正の光的余接方向はどれも波面に属します。

逆に、正の零錐から離れた閉錐方向の $\zeta$ については、$|\boldsymbol p|\le2|\zeta|$ と $|\boldsymbol p|>2|\zeta|$ に積分域を分けます。前者では $|\zeta-\kappa(\boldsymbol p)|\ge c|\zeta|$（方向の分離）、後者では $|\zeta-\kappa(\boldsymbol p)|\ge c|\boldsymbol p|$ です。$\widehat\chi$ が任意次数で急減少し、$d^3p/|\boldsymbol p|$ の原点近傍の積分も有限であることから、どちらの積分も $O(|\zeta|^{-N})$ を任意の $N$ で満たします。よって $WF(w_0)$ の原点の方向はちょうど未来向き零錐です。

最後に $(z,y)=(x-y,y)$ という線形座標を取れば、$w_0(z)$ は $y$ に依存しません。[波面の座標変換則](../MICA5/index.md#thm-mica5-coordinate-change)で $(z,\zeta;y,0)$ を $(x,y)$ 座標に戻すと $(x,\zeta;y,-\zeta)$ となります。平坦な零測地線では平行移動が恒等なので、これが全ての $\mathcal C^+$ を与えます。
<!-- proof-end -->

## 3. 転置と交換子条件から何が証明できるか

状態の交換子は二点量の反対称部分を決めます。一方、波面集合は分布を滑らかな項だけ変えても不変です。この二つを合わせると、条件の「包含」を「等号」へ強められます。

二点分布の転置を $W^T(x,y)=W(y,x)$ とします。[波面集合の座標変換則](../MICA5/index.md#thm-mica5-coordinate-change)を入れ替え写像 $(x,y)\mapsto(y,x)$ に適用すると、共変ベクトルの位置も入れ替わります。

<a id="prop-mica13-transpose"></a>

<!-- formal-statement-start -->
> **命題（転置による正負波面の交換）**  
> 時間向き付きLorentz時空 $M$ と任意の分布 $W\in\mathcal D'(M\times M)$ について

$$
WF(W^T)=\{(x,k;y,l):(y,l;x,k)\in WF(W)\}.
$$

> 特に $WF(W)\subset\mathcal C^+$ なら $WF(W^T)\subset\mathcal C^-$ であり、$\mathcal C^+\cap\mathcal C^-=\varnothing$ である。
<!-- formal-statement-end -->

### 証明の見取り図

座標交換は微分同相なので波面集合の余接変換則を使えます。正の二点関係における第2余接ベクトルは、未来向き平行移動ベクトルの**負**です。これを第1成分へ移せば過去向きになります。

<!-- proof-start -->
### 証明

$s(x,y)=(y,x)$ と置けば $W^T=s^*W$ です。$ds$ は二成分を交換する線形同型で、[座標変換則](../MICA5/index.md#thm-mica5-coordinate-change)により最初の式を得ます。$WF(W)$ の点を $(x,k_x;y,-q_y)\in\mathcal C^+$ とすると、転置で $(y,-q_y;x,k_x)$ になります。$q_y=\tau_{x\to y}k_x$ は未来向き光的であり、$-q_y$ は過去向き光的です。逆向き測地線の平行移動は $-q_y$ を $-k_x$ に写すので、$(y,-q_y;x,k_x)$ は $\mathcal C^-$ の元です。最後に、一つの非零光的共変ベクトルが未来向きと過去向きの両方になることはありません。従って両集合は交わりません。
<!-- proof-end -->

交換子条件と組み合わせるには、$E$ の波面方向を知る必要があります。**次の入力は意図的に既存の大きな解析定理として使用します**：実主型Klein–Gordon作用素の因果伝播子について

$$
WF(E)=\mathcal C^+\cup\mathcal C^-.
$$

これは光円錐上の局所基本解の特異性、[特異性伝播](../MICA10/index.md#thm-mica10-propagation)、および双変数のFourier積分作用素の標準的な構成を合わせた定理です。対角での初期特異性と伝播の上側包含だけでは全域の等号を証明できない点に注意します。厳密な構成は下記文献の Duistermaat–Hörmander の distinguished parametrix 理論に依存し、本章で波動伝播核の全Fourier積分作用素計算を再構成したとは主張しません。

<a id="prop-mica13-ccr-equality"></a>

<!-- formal-statement-start -->
> **命題（交換子条件と片側包含から波面集合の等号）**  
> 4次元時間向き付き大域双曲Lorentz時空上の実Klein–Gordon作用素 $P$ の因果伝播子を $E$ とし、$WF(E)=\mathcal C^+\cup\mathcal C^-$ を用いる。$W\in\mathcal D'(M\times M)$ が

$$
W-W^T=-iE,\qquad WF(W)\subset\mathcal C^+
$$

> を満たすなら、$WF(W)=\mathcal C^+$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$E$ の未来向き部分の特異性は $W$ と $W^T$ の**どちらか**になければなりません。しかし転置は過去向きの部分にしか特異性を持てません。従って未来向き部分は全て $W$ が担います。

<!-- proof-start -->
### 証明

任意に $\rho\in\mathcal C^+$ を取ります。$WF(E)=\mathcal C^+\cup\mathcal C^-$ から $\rho\in WF(E)$ です。仮に $\rho\notin WF(W)$ とすると、[転置命題](#prop-mica13-transpose)により $WF(W^T)\subset\mathcal C^-$ だから $\rho\notin WF(W^T)$ でもあります。[波面集合の和の包含](../MICA3/index.md#prop-mica3-sum)を $E=i(W-W^T)$ に適用すると

$$
WF(E)\subset WF(W)\cup WF(W^T),
$$

より $\rho\notin WF(E)$ となって矛盾します。従って $\mathcal C^+\subset WF(W)$。仮定の逆包含と合わせて等号を得ます。ここでは正値性を使っていません。正値性は**この包含が状態の二点分布に成立することを局所から大域へ示す段階**で重要です。
<!-- proof-end -->

同じ方程式・同じ交換子条件に対して二つのHadamard状態を選んでも、短距離特異性の差はどこまで残るでしょうか。上の集合の向きは完全に分離しているので、差の波面集合には強い制約があります。

<a id="prop-mica13-smooth-difference"></a>

<!-- formal-statement-start -->
> **命題（Hadamard二点分布の差の滑らかさ）**  
> 同じ $(M,g,P,E)$ に対する二つの分布型二点量 $W_1,W_2$ が、同じ交換子条件

$$
W_j-W_j^T=-iE\qquad(j=1,2)
$$

> と $WF(W_j)\subset\mathcal C^+$ を満たすなら、差 $D=W_1-W_2$ は $M\times M$ 上の滑らかな関数である。
<!-- formal-statement-end -->

### 証明の見取り図

交換子条件を引くと差は転置対称です。一方、差の波面集合は未来向き側に含まれます。同じ差を転置して評価すれば過去向き側にも含まれます。両者の共通部分は空なので滑らかです。

<!-- proof-start -->
### 証明

$D-D^T=(W_1-W_1^T)-(W_2-W_2^T)=(-iE)-(-iE)=0$、すなわち $D=D^T$ です。また[波面集合の和の包含](../MICA3/index.md#prop-mica3-sum)から

$$
WF(D)\subset WF(W_1)\cup WF(W_2)\subset\mathcal C^+.
$$

同じ等式を転置に適用すると、[転置命題](#prop-mica13-transpose)より

$$
WF(D)=WF(D^T)\subset\mathcal C^-.
$$

従って $WF(D)\subset\mathcal C^+\cap\mathcal C^-=\varnothing$。[MICA3の空な波面集合と滑らかさ](../MICA3/index.md#thm-mica3-projection)から $D\in C^\infty(M\times M)$ です。ここでも交換子条件と波面の向きがあれば十分で、正値性を追加使用していません。
<!-- proof-end -->

**この命題は、二点分布が等しいという主張ではありません**。[MICA11の滑らかな双解の付加](../MICA11/index.md#prop-mica11-smooth-shift)で、$v\in C^\infty(M;\mathbb R)$ が $Pv=0$、$\lambda\ge0$ なら $W_\lambda=W_1+\lambda v\otimes v$ は同じ交換子条件を持ち、差 $\lambda v(x)v(y)$ は滑らかなままです。従ってHadamard性は「状態の一意性」ではありません。

## 4. 局所Hadamard形との同値はどこまで示せるか

[MICA12の局所Hadamard形](../MICA12/index.md#def-mica12-local-parametrix)は、各測地的凸正規近傍 $C$ の $C\times C$ 上で、幾何学的な全次数の特異式を引くと滑らかな余りが残るという条件でした。一方、今の $WF(W)=\mathcal C^+$ は**すべての** $M\times M$ を一度に記述します。両者を結ぶには二つの別問題があります。

1. **局所 → 大域**：あるCauchy面の近くで正しい局所特異構造を持つ正値の二点分布は、離れた二点に新たな悪い特異性を隠していないか。
2. **大域 → 局所**：波面集合が同じだけで、$U/\sigma_+$ と対数係数が一致するとどう分かるか。

第1の問題には、[特異性伝播](../MICA10/index.md#thm-mica10-propagation)に加え、**二点分布の正値性と交換子条件を使う局所―大域特異性定理**が必要です。$P_xW=P_yW=0$ の伝播だけでは、$x$ と $y$ の二本の光線が互いに同じ一本の零測地線になるとは結論できません。独立に伝播するだけでは、異なる光線の組を排除できないからです。

第2の問題では、同じ背景と交換子条件を持つ参照Hadamard状態 $W_{\mathrm{ref}}$ を一つ用意します。$WF(W)$ と $WF(W_{\mathrm{ref}})$ の向きが未来向きなら、[Hadamard二点分布の差の滑らかさ](#prop-mica13-smooth-difference)で $W-W_{\mathrm{ref}}$ は滑らかです。従って参照状態の局所式からそのまま $W$ の局所式を得ます。ただし**参照状態の存在自体**は波面集合の形式的操作だけからは出てきません。

<a id="thm-mica13-equivalence"></a>

<!-- formal-statement-start -->
> **定理（RadzikowskiのHadamard同値定理：自由実スカラー場）**  
> $(M,g)$ は境界のない滑らかな時間向き付き4次元大域双曲Lorentz時空とし、$P=-\Box_g+m^2+\xi R$（$m\ge0$、$\xi\in\mathbb R$）を固定する。$\omega$ はこの実Klein–Gordon場の**準自由状態**で、その二点分布 $W\in\mathcal D'(M\times M)$ は正値、双解性、交換子条件 $W-W^T=-iE$ を満たすとする。このとき次は同値である。
>
> 1. $W$ は局所Hadamard形を持つ（適切な測地的凸正規近傍で[MICA12の全次数の局所式](../MICA12/index.md#def-mica12-local-parametrix)との差が滑らかであり、Cauchy発展に沿って整合する）。
> 2. $W$ はHadamard波面集合条件を満たす。

$$
WF(W)=\mathcal C^+.
$$

> これは特定の状態の**存在**を波面条件だけで証明する定理ではなく、既に与えられた状態の二点分布を特徴づける定理である。原論文は準自由中性スカラーKlein–Gordon場を扱い、さらにFeynman伝播子のdistinguished parametrix条件との同値も示す。
<!-- formal-statement-end -->

### 証明の見取り図

局所から大域への難所は、正値性を使うRadzikowskiの局所―大域定理です。大域から局所へは、参照Hadamard状態の存在を入力として、既に証明した**滑らかな差**を使います。$WF(E)$ の幾何学的等号、参照状態の存在、局所―大域定理を大規模な外部入力として明示し、そこから同値へ至る論理を計算します。

<!-- proof-start -->
### 証明（外部の局所―大域定理・存在定理を入力とする還元）

まず実Klein–Gordon場の同じ背景 $P,E$ に対する参照準自由Hadamard状態 $\omega_{\mathrm{ref}}$ の存在を用います。大域双曲時空での存在はFulling–Narcowich–Waldの変形構成などによる結果であり、ここでの仮定（時間向き、大域双曲性、実normally hyperbolic作用素）に適用されます。$W_{\mathrm{ref}}$ をその二点分布とすると、局所Hadamard形から得た大域波面条件 $WF(W_{\mathrm{ref}})=\mathcal C^+$ を用います。参照状態の構成とその波面条件の証明は、この還元より先に確立された解析結果として入力するものであり、循環して「同値定理自身」を仮定するものではありません。

**(1) から (2)。** 両方の二点分布が同じ幾何学係数による局所Hadamard特異式を持つので、共通の凸正規近傍 $C$ では

$$
W|_{C\times C}-W_{\mathrm{ref}}|_{C\times C}
=(W-H_{\ell,\infty})-(W_{\mathrm{ref}}-H_{\ell,\infty})
\in C^\infty(C\times C).
$$

これは局所表示の共通部分を**分布として**引いた計算です。$W$ と $W_{\mathrm{ref}}$ はともに正値・双解性を持ち、反対称部分は同じ $-iE$ です。そこでRadzikowskiの**局所―大域特異性定理**（Radzikowski, *Commun. Math. Phys.* **180** (1996), 1–22）を適用します。同定理の正値性・同じ反対称部分・参照状態の波面に関する仮定がここで満たされるため、局所的に一致した特異構造は大域的に一致し、少なくとも

$$
WF(W)\subset\mathcal C^+
$$

が従います。さらに[交換子条件による等号命題](#prop-mica13-ccr-equality)の入力は $WF(E)=\mathcal C^+\cup\mathcal C^-$ と上の包含なので、$WF(W)=\mathcal C^+$ です。

**(2) から (1)。** 仮定により $WF(W)=\mathcal C^+$、参照状態にも $WF(W_{\mathrm{ref}})=\mathcal C^+$ が成立します。両者の交換子条件は等しいので、[Hadamard二点分布の差の滑らかさ](#prop-mica13-smooth-difference)を $W_1=W$、$W_2=W_{\mathrm{ref}}$ に適用して

$$
D:=W-W_{\mathrm{ref}}\in C^\infty(M\times M)
$$

を得ます。参照状態の局所表示 $W_{\mathrm{ref}}=H_{\ell,\infty}+F_{\mathrm{ref}}$（$F_{\mathrm{ref}}$ は滑らか）に代入すれば

$$
W=H_{\ell,\infty}+(F_{\mathrm{ref}}+D)
$$

で、括弧内は $C\times C$ 上滑らかです。従って $W$ は各凸正規近傍で局所Hadamard形を持ちます。
<!-- proof-end -->

上の証明は**同値を既習命題へ還元する部分**を示したものです。外部入力の全証明まで含む自己完結なDuistermaat–Hörmander/Radzikowski理論の構築ではありません。次の区別を明示しておきます。

| 使う結果 | この章で実施したこと | 残る深い解析 |
| --- | --- | --- |
| $WF(E)=\mathcal C^+\cup\mathcal C^-$ | 向き・交換子条件への代入を検算 | 双変数伝播核のFourier積分作用素による全WF計算 |
| 局所Hadamard係数と境界値 | [MICA12](../MICA12/index.md#thm-mica12-transport)の幾何学と平坦模型を使用 | 一般時空の局所parametrixの精密な波面評価 |
| 局所 → 大域 | 共通特異項を引き、正値性・交換子条件・双解性を照合 | 正値保存microlocal切断を用いた局所―大域特異性定理 |
| 大域 → 局所 | [滑らかな差](#prop-mica13-smooth-difference)から局所表示を導出 | 参照Hadamard状態の変形・貼り合わせ構成 |

特に、伝播定理を一度書くだけで「局所Hadamard ⇒ 大域Hadamard」を証明した、としてはいけません。一般の二点分布に正値性を外せば、局所と大域を同じ結論に結ぶ推論が壊れます。また、1996年の原論文が扱う準自由状態という範囲から、任意の相互作用場や高次相関に同じ形式を無条件に拡張できません。

## 5. 演習――向き・交換子条件・滑らかな差・局所大域を再構成する

<a id="ex-mica13-a01"></a>
### 演習 MICA13-A1：未来向き光的共変ベクトルを判定する

- Level: A
- 目安時間: 15分

$g=-dt^2+dx_1^2+dx_2^2+dx_3^2$ で $a>0$ とする。$k=(-a,0,a,0)$ について $g^{-1}(k,k)$、$k^\sharp$、時間向きを計算せよ。$-k$ の向きも求めよ。

<!-- solution-start -->
#### 詳細解答

逆計量は $\operatorname{diag}(-1,1,1,1)$ です。従って

$$
g^{-1}(k,k)=-(-a)^2+0^2+a^2+0^2=0,
\qquad k^\sharp=(a,0,a,0).
$$

$a>0$ なので、$k^\sharp$ の時間成分は正で未来向きです。一方 $(-k)^\sharp=(-a,0,-a,0)$ は時間成分が負で過去向きです。$dt$ の係数の符号をベクトルの時間成分と取り違えないことが要点です。
<!-- solution-end -->

<a id="ex-mica13-a02"></a>
### 演習 MICA13-A2：第2余接ベクトルの符号

- Level: A
- 目安時間: 18分

Minkowski時空で $x=(2,2,0,0)$、$y=(0,0,0,0)$ とし、$k_x=(-b,b,0,0)$（$b>0$）とする。$(x,k_x;y,l_y)\in\mathcal C^+$ になる $l_y$ を求めよ。また、$x'=(2,0,0,0)$、$y'=(0,0,0,0)$ の間に同様の関係が成り立つか判定せよ。

<!-- solution-start -->
#### 詳細解答

最初の二点の差は $(2,2,0,0)$ で計量長が $-4+4=0$ です。直線が零測地線で、$k_x^\sharp=(b,b,0,0)$ はその未来向き接方向。平坦接続で $q_y=(-b,b,0,0)$ のままなので、[二点関係の定義](#def-mica13-null-pair)より

$$
l_y=-q_y=(b,-b,0,0).
$$

後半の差 $(2,0,0,0)$ は計量長 $-4<0$ の時間的分離です。二点を結ぶ直線は時間的で零測地線ではないため、非零のどんな $k_{x'},l_{y'}$ を選んでも $\mathcal C^+$ の元にはなりません。
<!-- solution-end -->

<a id="ex-mica13-a03"></a>
### 演習 MICA13-A3：光円錐の両側で $i0$ の向きを確かめる

- Level: A
- 目安時間: 19分

4次元Minkowski時空で $\sigma=(-\tau^2+r^2)/2$ とする。$\tau=+r$ と $\tau=-r$（$r>0$）の滑らかな光円錐上で、$\sigma_+=\sigma+i0\tau$ の片側境界値が選ぶ $\lambda d_x\sigma$ の符号と、その計量双対の時間向きを求めよ。

<!-- solution-start -->
#### 詳細解答

$d_x\sigma=(-\tau,\boldsymbol r)$、$(d_x\sigma)^\sharp=(\tau,\boldsymbol r)$ です。$\tau=r>0$ なら $\sigma+i0$ で、[片側境界値の波面集合](../MICA4/index.md#thm-mica4-boundary-wf)から $\lambda>0$ を取ります。その計量双対の時間成分は $\lambda\tau>0$。$\tau=-r<0$ なら $\sigma-i0$ なので $\lambda<0$ を取ります。この場合も $\lambda\tau>0$ です。いずれも未来向きで、第2変数の微分は $d_y\sigma=-d_x\sigma$ です。
<!-- solution-end -->

<a id="ex-mica13-a04"></a>
### 演習 MICA13-A4：転置すると未来と過去が入れ替わる

- Level: A
- 目安時間: 15分

$(x,k;y,-q)\in\mathcal C^+$ とする。転置 $W^T$ の対応する波面方向を記し、なぜ第1余接ベクトルが過去向きになるか説明せよ。$q$ は $k$ の零測地線に沿う余接平行移動とする。

<!-- solution-start -->
#### 詳細解答

入れ替え写像 $(x,y)\mapsto(y,x)$ に[波面の座標変換](../MICA5/index.md#thm-mica5-coordinate-change)を適用すると

$$
(x,k;y,-q)\longmapsto(y,-q;x,k).
$$

$q^\sharp$ は未来向きで、$(-q)^\sharp=-q^\sharp$ は過去向きです。逆向きに平行移動した $-q$ は $-k$ になります。従って後者は $\mathcal C^-$ に属します。$q$ の符号を最初から忘れると、この判定は逆になります。
<!-- solution-end -->

<a id="ex-mica13-a05"></a>
### 演習 MICA13-A5：質量殻と零の特性を区別する

- Level: A
- 目安時間: 17分

$P=\partial_t^2-\Delta+m^2$（$m>0$）の平坦模型で、$e^{-i\omega_{\boldsymbol p}t+i\boldsymbol p\cdot\boldsymbol x}$ の位相微分 $k=(-\omega_{\boldsymbol p},\boldsymbol p)$ は時間的か光的か。また $\boldsymbol p=r\boldsymbol n$、$r\to\infty$ の単位規格化方向はどうなるか。

<!-- solution-start -->
#### 詳細解答

$\omega_{\boldsymbol p}^2=|\boldsymbol p|^2+m^2$ なので

$$
g^{-1}(k,k)=-\omega_{\boldsymbol p}^2+|\boldsymbol p|^2=-m^2<0.
$$

従って有限運動量の $k$ は時間的です。しかし $\boldsymbol p=r\boldsymbol n$、$|\boldsymbol n|=1$ なら

$$
r^{-1}k=(-\sqrt{1+m^2/r^2},\boldsymbol n)
\longrightarrow(-1,\boldsymbol n),
$$

この極限の計量長は $-1+1=0$ です。低階の質量項ではなく、主シンボルの零錐がWFの高周波方向を決めることが分かります。
<!-- solution-end -->

<a id="ex-mica13-b01"></a>
### 演習 MICA13-B1：包含が等号になる機構

- Level: B
- 目安時間: 28分

同じ $(M,g,P,E)$ で $WF(E)=\mathcal C^+\cup\mathcal C^-$ とする。$W-W^T=-iE$、$WF(W)\subset\mathcal C^+$ を仮定する。各 $\rho\in\mathcal C^+$ が $WF(W)$ に必ず属することを、波面集合の和の包含を使って背理法で証明せよ。証明で正値性は必要か。

<!-- solution-start -->
#### 詳細解答

$\rho\in\mathcal C^+$ を一つ固定します。もし $\rho\notin WF(W)$ なら、[転置の命題](#prop-mica13-transpose)で $WF(W^T)\subset\mathcal C^-$、しかも $\mathcal C^+\cap\mathcal C^-=\varnothing$ なので $\rho\notin WF(W^T)$ です。分布の差に[MICA3の波面集合の和の包含](../MICA3/index.md#prop-mica3-sum)を適用すると

$$
WF(-iE)=WF(W-W^T)
\subset WF(W)\cup WF(W^T).
$$

右辺には $\rho$ がないのに、左辺は $WF(E)=\mathcal C^+\cup\mathcal C^-$ により $\rho$ を含みます。矛盾です。よって $\mathcal C^+\subset WF(W)$、仮定と合わせて等号。使ったのは交換子条件、$E$ の波面、転置と和の性質だけで、正値性はこの部分には不要です。
<!-- solution-end -->

<a id="ex-mica13-b02"></a>
### 演習 MICA13-B2：差が滑らかになることを再導出する

- Level: B
- 目安時間: 30分

$W_1,W_2$ は同じ交換子条件と $WF(W_j)\subset\mathcal C^+$ を満たすとする。$D=W_1-W_2$ について (1) 転置対称性、(2) 波面集合の二つの包含、(3) 滑らかさを順に示せ。なぜ「二状態が一致する」とは結論できないか。

<!-- solution-start -->
#### 詳細解答

(1) それぞれの交換子条件から

$$
D-D^T=(W_1-W_1^T)-(W_2-W_2^T)=(-iE)-(-iE)=0.
$$

よって $D^T=D$ です。(2) 差のWFの包含から $WF(D)\subset\mathcal C^+$。同時に $D=D^T$ と[転置による正負波面の交換](#prop-mica13-transpose)を使うと $WF(D)=WF(D^T)\subset\mathcal C^-$。(3) 共通部分は空だから $WF(D)=\varnothing$ です。[滑らかさの判定](../MICA3/index.md#thm-mica3-projection)から $D\in C^\infty(M\times M)$。

しかし滑らかさは $D=0$ を意味しません。[滑らかな双解の変更](../MICA11/index.md#prop-mica11-smooth-shift)は $D=\lambda v\otimes v$（$\lambda>0$、$v\not\equiv0$）という非零の例を与えます。
<!-- solution-end -->

<a id="ex-mica13-b03"></a>
### 演習 MICA13-B3：局所の差から大域の結論へ

- Level: B
- 目安時間: 28分

同じ $P,E$ の分布型二点量 $W,W_{\mathrm{ref}}$ が、凸正規近傍 $C$ で同じ全次数の局所Hadamard式 $H_{\ell,\infty}$ を持つとする。(1) $C\times C$ で差が滑らかなことを式で示せ。(2) それだけで $WF(W)\subset\mathcal C^+$ が全 $M\times M$ で従うか。(3) 一般の状態について局所―大域定理を使う際の追加の役割を挙げよ。

<!-- solution-start -->
#### 詳細解答

(1) $F=W-H_{\ell,\infty}$、$F_{\mathrm{ref}}=W_{\mathrm{ref}}-H_{\ell,\infty}$ は局所Hadamard形により滑らかなので

$$
(W-W_{\mathrm{ref}})|_{C\times C}
=F-F_{\mathrm{ref}}\in C^\infty(C\times C).
$$

(2) $C\times C$ の外で $W-W_{\mathrm{ref}}$ の滑らかさを調べていないので、これだけでは全域の波面方向を制限できません。個々の $x,y$ の特性方向への伝播だけでも、異なる零測地線の組を排除する情報が不足します。(3) 状態の正値性は[二点量のCauchy–Schwarz評価](../MICA11/index.md#prop-mica11-cauchy-schwarz)に現れ、遠方の二点の相関に対しても制約を与えます。これを交換子条件、双解性、参照状態の大域的な波面条件と組み合わせる**局所―大域特異性定理**が必要です。正値性を外した任意の双解分布にこの結論を移してはいけません。
<!-- solution-end -->

<a id="ex-mica13-b04"></a>
### 演習 MICA13-B4：同値の逆向きに必要な参照状態

- Level: B
- 目安時間: 30分

既知のHadamard二点分布 $W_{\mathrm{ref}}$ が同じ $P,E$ について存在し、局所的に $W_{\mathrm{ref}}=H_{\ell,\infty}+F_{\mathrm{ref}}$（$F_{\mathrm{ref}}$ は滑らか）を満たすとする。$W$ も同じ交換子条件と $WF(W)\subset\mathcal C^+$ を満たすなら、$W$ の局所Hadamard形を導け。また参照状態が**別の作用素 $P'$** の状態であった場合、この議論はそのまま使えるか。

<!-- solution-start -->
#### 詳細解答

まず同じ $E$ に対する交換子条件があるので、[Hadamard二点分布の差の滑らかさ](#prop-mica13-smooth-difference)を $W,W_{\mathrm{ref}}$ に適用し、$D:=W-W_{\mathrm{ref}}\in C^\infty(M\times M)$ を得ます。各凸正規近傍で

$$
W=H_{\ell,\infty}+(F_{\mathrm{ref}}+D)
$$

となり、括弧内が滑らかなので定義通り局所Hadamard形です。$P'$ が異なれば一般に因果伝播子 $E'$ も異なり、$D-D^T=-iE+iE'$ が零になるとは言えません。さらに $H_{\ell,\infty}$ の対数係数も $P$ に依存します。従って**同じ背景と同じ場の作用素・交換子条件**という仮定を省略できません。
<!-- solution-end -->

<a id="ex-mica13-c01"></a>
### 演習 MICA13-C1：Minkowski真空と滑らかな状態変更を統合する

- Level: C
- 目安時間: 48分

4次元Minkowski時空で $P=-\Box$、$E$ は[HPDE21の遅延 − 先進規約](../../HPDE/HPDE21/index.md#def-hpde21-causal-propagator)とする。質量零真空を

$$
W_0(x,y)=\frac1{8\pi^2\sigma_+(x,y)},
\quad \sigma_+=\lim_{\varepsilon\downarrow0}
\bigl(\sigma+i\varepsilon(t_x-t_y)+\tfrac12\varepsilon^2\bigr)
$$

で与える。$\lambda>0$ に対して $W_\lambda=W_0+\lambda\,1\otimes1$ と置く。

1. $W_0$ の非対角光円錐上の未来向き共変ベクトルを $\tau>0$ と $\tau<0$ で求めよ。
2. $W_\lambda-W_\lambda^T$、$P_xW_\lambda$、$P_yW_\lambda$ を計算し、正値性が保たれる理由を述べよ。
3. $WF(W_\lambda)$ と $WF(W_0)$ の関係を示せ。局所Hadamard式を引いた余りの差も求めよ。
4. この計算だけで、一般の曲がった時空における局所―大域同値定理まで証明できるか。

<!-- solution-start -->
#### 詳細解答

**1.** $\sigma=(-\tau^2+r^2)/2$、$d_x\sigma=(-\tau,\boldsymbol r)$ です。$\tau>0$ では[境界値の波面](../MICA4/index.md#thm-mica4-boundary-wf)により $\lambda' d_x\sigma$（$\lambda'>0$）、$\tau<0$ では $\lambda' d_x\sigma$（$\lambda'<0$）が特異方向です。いずれも計量双対の時間成分は $\lambda'\tau>0$ となり未来向きで、第2変数では $-\lambda'd_x\sigma$ が現れます。

**2.** 定数関数は $P1=-\Box1=0$ を満たし、$P_x(1\otimes1)=P_y(1\otimes1)=0$ です。また $(1\otimes1)^T=1\otimes1$ なので

$$
W_\lambda-W_\lambda^T=W_0-W_0^T=-iE,
\quad P_xW_\lambda=P_yW_\lambda=0.
$$

正値性は[二点量の条件](../MICA11/index.md#def-mica11-two-point-conditions)に $W_\lambda$ を代入して、試験関数 $f$ に対し

$$
W_\lambda(\overline f,f)
=W_0(\overline f,f)+\lambda\left|\int_M f\,d\mu_g\right|^2\ge0
$$

と直接確認できます（$W_0$ の正値性は[MICA11の質量殻表示](../MICA11/index.md#prop-mica11-positive-direction)による）。全体の場代数上の状態としての正値性は[MICA11の滑らかな双解による状態変更](../MICA11/index.md#prop-mica11-smooth-shift)で確認されます。

**3.** $\lambda\,1\otimes1$ は滑らかなので[波面の和の性質](../MICA3/index.md#prop-mica3-sum)で、滑らかな項の加減が波面集合を変えないことから

$$
WF(W_\lambda)=WF(W_0)=\mathcal C^+.
$$

ここで最後の等号は質量零Minkowski真空についての**全**波面計算を入力しています。[MICA12の質量零模型](../MICA12/index.md#prop-mica12-massless-boundary)では $U=1$ で $v_n=0$ なので、同じ尺度の局所式は $H_{\ell,\infty}=W_0$。従って

$$
(W_\lambda-H_{\ell,\infty})-(W_0-H_{\ell,\infty})
=\lambda\,1\otimes1,
$$

となり、零でない滑らかな余りの差を与えます。

**4.** いいえ。ここで計算したのは平坦時空での正周波数表示と滑らかな変更です。一般の時空で正値性が離れた二点の不要な特異性を排除する**局所―大域定理**、参照Hadamard状態の存在、伝播核の全波面の解析はまだ使用していません。これらは[同値定理](#thm-mica13-equivalence)の外部入力として明示されており、平坦模型だけで代用できません。
<!-- solution-end -->

## 6. 次章への接続：波面が対角で衝突するとき

$WF(W)=\mathcal C^+$ の定義は、$x=y$ で未来向き零共変ベクトル $k$ に対する $(x,k;x,-k)$ を含みます。これは[対角埋め込みの余法束](../MICA7/index.md#prop-mica7-diagonal-product)と同じ形です。従って一般の[引き戻しの十分条件](../MICA7/index.md#thm-mica7-pullback)は生の $W$ の対角制限に適用できません。**十分条件を満たさないことと、あらゆる方法で制限が不可能ということは別**である点も忘れないでください。

一方、[Hadamard二点分布の差の滑らかさ](#prop-mica13-smooth-difference)により、同じ $P,E$ に対する二つのHadamard二点分布の差は滑らかです。その差なら対角上に通常の関数として制限できます。次のMICA14は、**生の二点分布の対角評価**と**共通の特異部分を引いた差の対角評価**を区別して扱います。

## 参考文献

- M. J. Radzikowski, [“Micro-Local Approach to the Hadamard Condition in Quantum Field Theory on Curved Space-Time”](https://doi.org/10.1007/BF02100096), *Communications in Mathematical Physics* **179** (1996), 529–553（波面集合条件・distinguished parametrixとの同値）。
- M. J. Radzikowski, [“A Local to Global Singularity Theorem for Quantum Field Theory on Curved Space-Time”](https://doi.org/10.1007/BF02101180), *Communications in Mathematical Physics* **180** (1996), 1–22（正値性と局所―大域の核心）。
- S. A. Fulling, F. J. Narcowich, R. M. Wald, [“Singularity Structure of the Two-Point Function in Quantum Field Theory in Curved Spacetime, II”](https://doi.org/10.1016/0003-4916(81)90098-1), *Annals of Physics* **136** (1981), 243–272（Hadamard状態の存在・変形構成）。
- H. Sahlmann, R. Verch, [“Microlocal Spectrum Condition and Hadamard Form for Vector-Valued Quantum Fields in Curved Spacetime”](https://arxiv.org/abs/math-ph/0008029), *Reviews in Mathematical Physics* **13** (2001), 1203–1246（後の一般化。ここではスカラー場に限定）。
