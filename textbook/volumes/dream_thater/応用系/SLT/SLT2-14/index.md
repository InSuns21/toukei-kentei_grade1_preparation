# SLT2-14 mean-field勾配流と連続性方程式

[前章の経験粒子測度](../SLT2-13/index.md#def-slt2-13-empirical-measure)では、有限個のニューロンの速度を試験関数で平均することで、測度の運動を厳密に書けた。しかし粒子数を無限へ増やしたとき、同じ等式が本当に解を定めるとは限らない。遠くの少数粒子が予測を変えることもあり、連続性方程式の記号だけでは存在も一意性も分からない。

この章では、**粒子の運動を確率測度の輸送として理解する**。まず距離と弱い意味での方程式を定義し、次に損失を輸送方向へ微分する。最後に特徴関数が十分滑らかで一様に有界な模型では、解を構成して有限粒子からの収束を示す。これは通常の非有界な二層網を全て包括する定理ではない。

扱う問いは次の五つである。

1. 粒子分布が「近い」とは何を意味するか。
2. 連続性方程式を、密度を仮定せずどう読むか。
3. 粒子ポテンシャルは損失のどの微分に当たるか。
4. どの正則性条件で全時間の解と粒子極限を証明できるか。
5. 損失減少は大域最適化を保証するか。

## 1. 粒子を対応付けて距離を測る

パラメータ空間を $\Theta=\mathbb R^q$（$q\ge1$）とする。確率測度 $\mu,\nu$ を比較するには、単に「有界連続関数の積分が近い」という弱収束だけでは足りない。[前章の非有界特徴の例](../SLT2-13/index.md#def-slt2-13-empirical-measure)のように遠方へ逃げた質量を検知したいからである。

二つの分布から粒子を一つずつ取り出して対応させることを考えよう。**結合** $\pi$ とは、$\Theta\times\Theta$ 上の確率測度で、第1座標の分布が $\mu$、第2座標の分布が $\nu$ となるものを指す。対応点間の距離の平均を最小化したものが輸送距離になる。ここでは有限一次モーメントを持つ測度の集合を $\mathcal P_1(\Theta)$、有限二次モーメントを持つ集合を $\mathcal P_2(\Theta)$ と書く。

<a id="def-slt2-14-wasserstein"></a>

<!-- formal-statement-start -->
> **定義（輸送結合とWasserstein距離）**
> $\Theta=\mathbb R^q$、$\mu,\nu\in\mathcal P_1(\Theta)$ とする。両周辺分布が $\mu,\nu$ である確率測度の集合を $\Pi(\mu,\nu)$ とし、一次Wasserstein距離を

$$
W_1(\mu,\nu)=\inf_{\pi\in\Pi(\mu,\nu)}
\int_{\Theta\times\Theta}\|\theta-\eta\|_2\,\pi(d\theta,d\eta)
$$

> で定める。$\mu,\nu\in\mathcal P_2(\Theta)$ のとき、二次Wasserstein距離を

$$
W_2(\mu,\nu)=\left[
\inf_{\pi\in\Pi(\mu,\nu)}
\int_{\Theta\times\Theta}\|\theta-\eta\|_2^2\,\pi(d\theta,d\eta)
\right]^{1/2}
$$

> と定める。$\Pi(\mu,\nu)$ は空でない。たとえば独立結合 $\mu\otimes\nu$ が属する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-14-wasserstein -->
**定義の確認**。$\mu=\delta_0$、$\nu=\delta_3$（$\Theta=\mathbb R$）とする。周辺分布の条件から唯一の結合は $\pi=\delta_{(0,3)}$ であり、質量1・非負・両周辺の条件が成立する。一次・二次モーメントはそれぞれ有限で、

$$
W_1(\delta_0,\delta_3)=3,\qquad W_2(\delta_0,\delta_3)=3.
$$

一方 $\nu=\tfrac12\delta_0+\tfrac12\delta_2$ なら、$\mu=\delta_0$ からの唯一の結合は $(\delta_{(0,0)}+\delta_{(0,2)})/2$。よって $W_1=1$、$W_2=\sqrt2$。二つの距離は同じ単位を持つが、遠い粒子への重み付けが違う。
<!-- definition-example-end -->

この章では $\psi_i:\Theta\to\mathbb R$ の勾配が一様に $M_1$ 以下なら、任意の結合 $\pi$ に対して

$$
\begin{aligned}
\left|\int\psi_i\,d\mu-\int\psi_i\,d\nu\right|
&=\left|\int[\psi_i(\theta)-\psi_i(\eta)]\,d\pi\right|\\
&\le M_1\int\|\theta-\eta\|_2\,d\pi.
\end{aligned}
$$

従って結合の下限を取れば差は $M_1W_1(\mu,\nu)$ 以下となる。**特徴の勾配の有界性が、測度の距離から予測の誤差を制御する橋**である。

## 2. 密度なしで連続性方程式を読む

訓練点 $(x_i,y_i)$（$1\le i\le n$）を固定し、$\psi_i(\theta)$ を各粒子の訓練点 $i$ への寄与とする。前章の $\psi_{x_i}(a,w)=a\sigma(w^{\mathsf T}\xi_i)$ が典型例だが、以下の構成は一般の滑らかな $\psi_i$ に対して書ける。分布 $\mu$ の予測、残差、二乗損失を

$$
f_i(\mu)=\int\psi_i\,d\mu,\quad
e_i(\mu)=f_i(\mu)-y_i,\quad
\mathcal L(\mu)=\frac1{2n}\sum_{i=1}^ne_i(\mu)^2
$$

と置く。[粒子ポテンシャル](../SLT2-13/index.md#def-slt2-13-particle-potential)の連続版は

$$
V(\theta;\mu)=\frac1n\sum_{i=1}^ne_i(\mu)\psi_i(\theta),
\qquad
v(\theta,\mu)=-\nabla_\theta V(\theta;\mu)
$$

である。$v$ は位置 $\theta$ だけでなく、その時刻の分布 $\mu$ にも依存する速度場である。

有限粒子なら、[経験測度の弱形式](../SLT2-13/index.md#prop-slt2-13-weak-form)は $\int\varphi\,d\mu_m$ を微分して得られた。一般の確率測度にも同じ等式を**解の定義**として採用する。ここで $C_c^1(\Theta)$ は一階微分が連続で、ある有界な閉集合の外で零となる試験関数の集合である。

<a id="def-slt2-14-weak-continuity"></a>

<!-- formal-statement-start -->
> **定義（連続性方程式の確率測度弱解）**
> $\Theta=\mathbb R^q$、時間区間 $[0,T]$、測度列 $\mu_t\in\mathcal P_1(\Theta)$ と速度場 $v(\theta,\mu)$ を考える。$t\mapsto\mu_t$ が $W_1$ 連続で、全ての $\varphi\in C_c^1(\Theta)$ について $t\mapsto\int\varphi\,d\mu_t$ が絶対連続であり、ほとんど全ての $t\in[0,T]$ において

$$
\frac d{dt}\int_\Theta\varphi\,d\mu_t
=\int_\Theta\nabla\varphi(\theta)\cdot
v(\theta,\mu_t)\,\mu_t(d\theta)
$$

> を満たすとき、$\mu_t$ を連続性方程式の確率測度弱解と呼ぶ。形式記号では

$$
\partial_t\mu_t+\nabla_\theta\cdot(\mu_t v(\cdot,\mu_t))=0.
$$

> 積分が定義されることを要求する。右辺の発散は、試験関数を用いた上の等式によって意味が決まる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-14-weak-continuity -->
**定義の確認**。$\Theta=\mathbb R$、一定速度 $v(\theta,\mu)=c$、$\mu_t=\delta_{a+ct}$ とする。$\mu_t$ は確率測度で一次モーメントは $|a+ct|<\infty$、$W_1(\mu_t,\mu_s)=|c||t-s|$ なので連続である。任意の $\varphi\in C_c^1$ について

$$
\frac d{dt}\int\varphi\,d\mu_t
=\frac d{dt}\varphi(a+ct)
=c\varphi'(a+ct)
=\int\varphi'c\,d\mu_t.
$$

ゆえに全条件が満たされる。Dirac測度は通常の密度を持たなくても弱解になれる。
<!-- definition-example-end -->

十分に滑らかな密度 $\rho(t,\theta)$ があるときは $\mu_t(d\theta)=\rho(t,\theta)d\theta$ と書け、コンパクト台の $\varphi$ に対する部分積分で $\int\varphi\,\nabla\cdot(\rho v)=-\int\nabla\varphi\cdot\rho v$ を得る。弱形式はこの積分恒等式を密度のない場合へ拡張したものである。**境界項が消えるのは試験関数がコンパクト台だから**であり、非有界領域のすべての関数へ無断で拡張してよいわけではない。

## 3. 損失を「重み変更」と「粒子移動」で微分する

損失 $\mathcal L(\mu)$ は測度の関数であり、微分方法が二つある。質量の配分を変えるときと、質量をそのまま運ぶときである。両者を分けると、なぜ勾配が $\nabla_\theta V$ になるかが見える。

<a id="prop-slt2-14-first-variation"></a>

<!-- formal-statement-start -->
> **命題（損失の第一変分と輸送方向微分）**
> $\Theta=\mathbb R^q$、$n\ge1$、$\psi_i\in C_b^2(\Theta)$（関数および一・二階導関数が有界）、$\mu,\nu\in\mathcal P_2(\Theta)$ とする。$e_i(\mu)=\int\psi_i\,d\mu-y_i$、$\mathcal L(\mu)=(2n)^{-1}\sum_i e_i(\mu)^2$、$V(\theta;\mu)=n^{-1}\sum_i e_i(\mu)\psi_i(\theta)$ と置く。このとき

$$
\left.\frac d{d\varepsilon}\right|_{\varepsilon=0+}
\mathcal L((1-\varepsilon)\mu+\varepsilon\nu)
=\int_\Theta V(\theta;\mu)\,(\nu-\mu)(d\theta).
$$

> さらに有界な $C^1$ ベクトル場 $\zeta:\Theta\to\mathbb R^q$ による輸送 $T_\varepsilon(\theta)=\theta+\varepsilon\zeta(\theta)$ と $\mu_\varepsilon=(T_\varepsilon)_\#\mu$ に対して

$$
\left.\frac d{d\varepsilon}\right|_{\varepsilon=0}
\mathcal L(\mu_\varepsilon)
=\int_\Theta\nabla_\theta V(\theta;\mu)
\cdot\zeta(\theta)\,\mu(d\theta).
$$

> 下付きの $\#$ は写像による押し出し測度を表し、$(T_\varepsilon)_\#\mu(A)=\mu(T_\varepsilon^{-1}(A))$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

残差は測度に線形なので、混合による差分は正確に計算できる。輸送なら、まず $\int\psi_i(T_\varepsilon(\theta))d\mu$ を連鎖律で微分する。

<!-- proof-start -->
### 証明

$d_i=\int\psi_i\,d(\nu-\mu)$ と置くと $e_i((1-\varepsilon)\mu+\varepsilon\nu)=e_i(\mu)+\varepsilon d_i$。従って

$$
\begin{aligned}
\mathcal L((1-\varepsilon)\mu+\varepsilon\nu)
&=\frac1{2n}\sum_i(e_i+\varepsilon d_i)^2\\
&=\mathcal L(\mu)+\frac{\varepsilon}{n}\sum_i e_i d_i
+\frac{\varepsilon^2}{2n}\sum_i d_i^2.
\end{aligned}
$$

一次項は $n^{-1}\sum_i e_i\int\psi_i\,d(\nu-\mu)=\int V\,d(\nu-\mu)$ である。

一方、押し出し測度の定義により $f_i(\mu_\varepsilon)=\int\psi_i(\theta+\varepsilon\zeta(\theta))\,\mu(d\theta)$。平均値の定理と $\|\nabla\psi_i\|\le M_1$ より差商の絶対値は $M_1\|\zeta\|_\infty$ 以下。優収束で微分を積分へ移せるので

$$
\left.\frac d{d\varepsilon}\right|_0 f_i(\mu_\varepsilon)
=\int\nabla\psi_i(\theta)\cdot\zeta(\theta)\,d\mu.
$$

これを二乗損失の連鎖律に代入すれば

$$
\left.\frac d{d\varepsilon}\right|_0\mathcal L(\mu_\varepsilon)
=\frac1n\sum_i e_i
\int\nabla\psi_i\cdot\zeta\,d\mu
=\int\nabla V\cdot\zeta\,d\mu.
$$

$\square$
<!-- proof-end -->

**変分の確認**。$\psi(\theta)=\sin\theta$、$y=0$、$\mu=\delta_{\pi/2}$、$\nu=\delta_0$ では $\mathcal L(\mu)=1/2$。混合後の予測は $1-\varepsilon$ だから損失は $(1-\varepsilon)^2/2$ で導関数は $-1$。右辺も $V(\theta;\mu)=\sin\theta$ より $V(0)-V(\pi/2)=-1$。質量を付け替える変分は、同じ粒子を動かす変分とは違う。

二次Wasserstein距離の名前に「勾配流」が結び付く理由もここにある。輸送方向の導関数は $L^2(\mu)$ 内積 $\int\nabla V\cdot\zeta\,d\mu$ であるため、最も急な**輸送方向**の下り坂を $v=-\nabla V$ と選ぶ。ただしこの計算だけでは、一般の測度空間上の距離勾配流の存在・一意性や大域最適化を主張していない。

## 4. 有界で滑らかな模型なら全時間で解ける

ここから仮定を明示する。$\psi_i$ とその勾配・Hessianが**全空間で**有界であるとする。通常の $\psi_i(a,w)=a\sigma(w^{\mathsf T}\xi_i)$ は $a$ が無制限なので一般にこの仮定を満たさない。一方、例えば $\psi_i(u,w)=\tanh(u)\tanh(w^{\mathsf T}\xi_i)$ は、訓練入力 $\xi_i$ を固定すれば全ての一・二階導関数が有界であり、二層網の一つの滑らかな有界出力係数模型として仮定を満たす。

以降 $Y=\max_i|y_i|$ とし、一様な定数 $M_0,M_1,M_2\ge0$ が

$$
|\psi_i|\le M_0,\quad
\|\nabla\psi_i\|_2\le M_1,\quad
\|\nabla^2\psi_i\|_{\mathrm{op}}\le M_2
$$

を満たすとする。残差について $|e_i(\mu)|\le M_0+Y$ である。これから速度には三つの重要な評価が出る。

$$
\begin{aligned}
\|v(\theta,\mu)\|_2&\le B:=(M_0+Y)M_1,\\
\|v(\theta,\mu)-v(\eta,\mu)\|_2
&\le L_\theta\|\theta-\eta\|_2,\quad L_\theta:=(M_0+Y)M_2,\\
\|v(\theta,\mu)-v(\theta,\nu)\|_2
&\le L_\mu W_1(\mu,\nu),\quad L_\mu:=M_1^2.
\end{aligned}
$$

最後の行では $\frac1n\sum_i|e_i(\mu)-e_i(\nu)|\|\nabla\psi_i\|\le M_1^2W_1$ とした。速度の**位置と分布の双方へのLipschitz性**が、以下の存在・一意性の鍵である。

<a id="thm-slt2-14-wellposed"></a>

<!-- formal-statement-start -->
> **定理（有界特徴のmean-field方程式の大域適切設定性）**
> $\Theta=\mathbb R^q$、訓練点 $(x_i,y_i)_{i=1}^n$ を固定する。$\psi_i\in C^2(\Theta)$ が全空間で上の $M_0,M_1,M_2<\infty$ により一様に抑えられ、$\mu_0\in\mathcal P_2(\Theta)$ とする。$v(\theta,\mu)=-n^{-1}\sum_i(\int\psi_i\,d\mu-y_i)\nabla\psi_i(\theta)$ に対して、任意の $T<\infty$ 上に、初期値 $\mu_0$ を持つ [連続性方程式の弱解](#def-slt2-14-weak-continuity) が一意に存在する。この解は特性曲線

$$
\dot X_t(\theta)=v(X_t(\theta),\mu_t),
\qquad X_0(\theta)=\theta,
\qquad \mu_t=(X_t)_\#\mu_0
$$

> で表され、全時刻 $t\ge0$ まで延長される。初期値 $\mu_0,\nu_0\in\mathcal P_2(\Theta)$ に対応する解は

$$
W_1(\mu_t,\nu_t)\le
\exp((L_\theta+L_\mu)t)\,W_1(\mu_0,\nu_0)
$$

> を満たす。ここで $L_\theta=(M_0+Y)M_2$、$L_\mu=M_1^2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

分布の軌道を仮に与えると、位置にLipschitzな速度場で粒子の常微分方程式を解ける。それが作る押し出し分布へ軌道を置き換える操作が、短時間なら縮小写像になる。解を時間区間ごとにつなぎ、二つの初期分布の差を同じ結合上の粒子の差で評価する。

<!-- proof-start -->
### 証明

**存在**。短い $[0,h]$ 上で、初期値を $\theta$ とする可測な軌道写像 $X_t(\theta)$ を考える。$\sup_t\int\|X_t(\theta)-\theta\|\,\mu_0(d\theta)$ が有限な、時間について $L^1(\mu_0)$ 連続の写像の空間を用いる。この空間は $C([0,h];L^1(\mu_0;\mathbb R^q))$ の閉じたアフィン部分空間として完備である。

候補 $X$ が作る測度を $\mu_t^X=(X_t)_\#\mu_0$ と置き、作用素を

$$
(\mathcal TX)_t(\theta)
=\theta+\int_0^t v(X_s(\theta),\mu_s^X)\,ds
$$

とする。速度の有界性から $|(\mathcal TX)_t(\theta)-\theta|\le Bt$。二つの候補 $X,Z$ について、同じ初期粒子の対応が結合を与えるので

$$
W_1(\mu_s^X,\mu_s^Z)
\le\int\|X_s(\theta)-Z_s(\theta)\|\,\mu_0(d\theta).
$$

上の速度の二つのLipschitz評価を用いると

$$
\sup_{t\le h}\int\|(\mathcal TX)_t-(\mathcal TZ)_t\|\,d\mu_0
\le h(L_\theta+L_\mu)
\sup_{s\le h}\int\|X_s-Z_s\|\,d\mu_0.
$$

$h(L_\theta+L_\mu)<1$ と選べば縮小写像であり、Picard反復の極限として一意の固定点 $X$ を得る。ここでの連続性は $L^1$ で、代表元を選べば積分方程式を $\mu_0$ ほとんど至る所で満たす。位置についてのLipschitz性により、その特性曲線は必要なら全初期位置へ拡張できる。

**時間延長と弱形式**。$\|v\|\le B$ は時間窓によらず同じであり、各小区間の終端分布を新初期値として同じ縮小写像を反復できる。粒子の移動は $\|X_t(\theta)-\theta\|\le Bt$、従って $\int\|X_t\|^2d\mu_0\le2\int\|\theta\|^2d\mu_0+2B^2t^2<\infty$。また $W_1(\mu_t,\mu_s)\le B|t-s|$。

任意の $\varphi\in C_c^1$ に対し、押し出しと連鎖律で

$$
\int\varphi\,d\mu_t=\int\varphi(X_t(\theta))\,d\mu_0,\quad
\frac d{dt}\varphi(X_t)=\nabla\varphi(X_t)\cdot v(X_t,\mu_t).
$$

被積分関数の絶対値は $B\|\nabla\varphi\|_\infty$ 以下なので積分と時間微分を交換でき、定義の弱形式を得る。

**安定性・一意性**。初期測度の任意の結合 $\pi_0$ に対し、対応する特性曲線を $X_t(\theta),Z_t(\eta)$ として

$$
D(t)=\int\|X_t(\theta)-Z_t(\eta)\|\,\pi_0(d\theta,d\eta)
$$

を取る。三角不等式と速度評価を積分すると

$$
D(t)\le D(0)+\int_0^t
[L_\theta D(s)+L_\mu W_1(\mu_s,\nu_s)]\,ds.
$$

流れによる $\pi_0$ の押し出しは $\mu_s,\nu_s$ の結合だから $W_1(\mu_s,\nu_s)\le D(s)$。[Grönwallによる連続依存](../../../解析系/ODE/ODE8/index.md#thm-ode8-continuous-dependence)と同じ積分評価を反復すれば $D(t)\le e^{(L_\theta+L_\mu)t}D(0)$。$\pi_0$ の下限を取って結論を得る。

最後に任意の弱解 $\widetilde\mu_s$ について、その測度が定める既知の時間依存速度場 $b_s(\theta)=v(\theta,\widetilde\mu_s)$ を固定する。時刻 $s$ の点を時刻 $t$ へ送るこの速度場の特性流を $X_{s,t}$ と書く。任意の $\varphi\in C_c^1$ と固定 $t$ に対し、逆向きに運んだ試験関数 $\varphi_s(\theta)=\varphi(X_{s,t}(\theta))$ は

$$
\partial_s\varphi_s+b_s\cdot\nabla\varphi_s=0,
\qquad \varphi_t=\varphi
$$

を満たす。$b_s$ の位置Lipschitz性と $C^1$ 性から連鎖律が使え、速度有界性により有限時間のコンパクト集合の逆像もコンパクトである。弱形式を時間依存試験関数へ適用すると（時間の区分近似と極限によって正当化できる）

$$
\frac d{ds}\int\varphi_s\,d\widetilde\mu_s
=\int(\partial_s\varphi_s+b_s\cdot\nabla\varphi_s)
\,d\widetilde\mu_s=0.
$$

したがって $\int\varphi\,d\widetilde\mu_t=\int\varphi(X_{0,t}(\theta))d\mu_0$。任意の $\varphi\in C_c^1$ について一致するため $\widetilde\mu_t=(X_{0,t})_\#\mu_0$ であり、既に示した特性流の安定性によって二つの弱解も一致する。$\square$
<!-- proof-end -->

この定理の一意性は**同じ初期分布から出る測度の軌道**についてである。固定核の勾配流と同一だという意味ではない。特徴勾配を現在の分布で平均するので、核も動きうる。

## 5. 損失は減るが最適性は別問題

定理の特徴と速度の有界性があれば、コンパクト台に限らない有界な $C^1$ 関数 $\psi_i$ にも特性曲線上の連鎖律を使える。これにより残差を微分できる。

<a id="thm-slt2-14-dissipation"></a>

<!-- formal-statement-start -->
> **定理（mean-field流のエネルギー散逸と動くGram行列）**
> [大域適切設定性定理](#thm-slt2-14-wellposed)の仮定のもとで、$\mu_t$ をその解、$e_i(t)=\int\psi_i\,d\mu_t-y_i$ とする。行列 $G(\mu_t)\in\mathbb R^{n\times n}$ を

$$
G_{ij}(\mu)=\int_\Theta
\nabla\psi_i(\theta)\cdot\nabla\psi_j(\theta)\,\mu(d\theta)
$$

> と定めると $G(\mu_t)$ は対称正半定値であり、

$$
\dot e(t)=-\frac1nG(\mu_t)e(t),
\qquad
\frac{d}{dt}\mathcal L(\mu_t)
=-\int_\Theta\|\nabla_\theta V(\theta;\mu_t)\|_2^2\,\mu_t(d\theta)
=-\frac1{n^2}e(t)^{\mathsf T}G(\mu_t)e(t)\le0.
$$

> これは損失の単調性を述べ、任意の初期分布から大域最小値への収束を保証しない。
<!-- formal-statement-end -->

### 証明の見取り図

予測を特性曲線で微分して $v=-n^{-1}\sum_j e_j\nabla\psi_j$ を代入する。行列の正半定値性は積分の中の平方和、散逸式は残差の連鎖律と速度の平方で確認する。

<!-- proof-start -->
### 証明

押し出し測度の性質から $f_i(t)=\int\psi_i(X_t(\theta))d\mu_0$。$\|\nabla\psi_i\|\le M_1$、$\|v\|\le B$ なので時間微分を積分へ移せる。よって

$$
\begin{aligned}
\dot e_i
&=\int\nabla\psi_i(\theta)\cdot v(\theta,\mu_t)\,\mu_t(d\theta)\\
&=-\frac1n\sum_{j=1}^n e_j(t)
\int\nabla\psi_i(\theta)\cdot\nabla\psi_j(\theta)\,\mu_t(d\theta)\\
&=-\frac1n\sum_jG_{ij}(\mu_t)e_j(t).
\end{aligned}
$$

任意の $c\in\mathbb R^n$ に対して

$$
c^{\mathsf T}G(\mu)c
=\int\left\|\sum_{i=1}^n c_i\nabla\psi_i(\theta)\right\|_2^2d\mu
\ge0
$$

だから正半定値。二乗損失の連鎖律を使うと

$$
\begin{aligned}
\frac d{dt}\mathcal L
&=\frac1n\sum_i e_i\dot e_i
=-\frac1{n^2}\sum_{i,j}e_iG_{ij}e_j\\
&=-\int\left\|\frac1n\sum_i e_i\nabla\psi_i\right\|_2^2d\mu_t
=-\int\|\nabla V\|_2^2d\mu_t.
\end{aligned}
$$

$\square$
<!-- proof-end -->

**二粒子の直接計算**。$\Theta=\mathbb R$、$n=1$、$\psi(\theta)=\sin\theta$、$y=0$、$\mu_0=(\delta_0+\delta_{\pi/2})/2$ とする。初期予測は $1/2$、残差 $e=1/2$、速度は $v(\theta,\mu_0)=-\tfrac12\cos\theta$。二粒子の速度は $-1/2,0$ であり、

$$
G(\mu_0)=\frac12(\cos^2 0+\cos^2(\pi/2))=\frac12.
$$

従って $\dot e(0)=-Ge=-1/4$、$\dot{\mathcal L}(0)=e\dot e=-1/8$。直接粒子を微分しても $\dot f=\tfrac12[\cos0(-1/2)+\cos(\pi/2)0]=-1/4$ となり一致する。

ただし勾配が零なら、損失が正でも止まってしまう。$\psi(\theta)=\sin\theta$、$y=1$、$\mu_0=\delta_{-\pi/2}$ は $e=-2$ だが $\nabla\psi(-\pi/2)=0$。従って $v(-\pi/2,\mu_0)=0$ で分布は静止、損失は $2$ のままである。一方 $\delta_{\pi/2}$ なら損失は零。**非凸な輸送方向の停留点と、大域最良の分布は違う。**

## 6. 幅を増やした粒子系との一致

連続体の解を示しただけでは、それが有限ニューロンの極限であるとはいえない。ここでは初期経験測度が輸送距離で近いと仮定し、同じ速度の安定性で誤差を伝播させる。

<a id="thm-slt2-14-particle-limit"></a>

<!-- formal-statement-start -->
> **定理（有限粒子のmean-field極限）**
> [大域適切設定性定理](#thm-slt2-14-wellposed)の特徴関数の仮定を置く。初期確率測度 $\mu_0\in\mathcal P_2(\Theta)$、各 $m$ の初期経験測度 $\mu_m(0)=m^{-1}\sum_{r=1}^m\delta_{\theta_r(0)}\in\mathcal P_2(\Theta)$ を取る。有限粒子を [加速勾配流](../SLT2-13/index.md#def-slt2-13-particle-potential) $\dot\theta_r=v(\theta_r,\mu_m)$ で動かし、$\mu_m(t)$ を経験測度とする。連続体解 $\mu_t$ に対し

$$
\sup_{0\le t\le T}W_1(\mu_m(t),\mu_t)
\le e^{(L_\theta+L_\mu)T}W_1(\mu_m(0),\mu_0).
$$

> 特に $W_1(\mu_m(0),\mu_0)\to0$ なら、各有限 $T$ 上で一様に $W_1(\mu_m(t),\mu_t)\to0$。$m$ の増大だけでは初期収束は自動的に従わない。
<!-- formal-statement-end -->

### 証明の見取り図

経験測度は特性曲線の押し出しであり、[前章の有限粒子弱形式](../SLT2-13/index.md#prop-slt2-13-weak-form)と整合する。連続体との比較には、すでに示した初期分布の安定性をそのまま適用できる。

<!-- proof-start -->
### 証明

$\mu_m(0)$ が $m$ 個のDirac確率測度の平均なので、特性曲線で押し出すと

$$
(X_t)_\#\mu_m(0)
=\frac1m\sum_{r=1}^m\delta_{X_t(\theta_r(0))}.
$$

特性方程式の速度は $\mu_m(t)$ を通じて計算されるから、これは有限粒子の加速流そのものである。有限次元の速度場は大域有界かつ局所Lipschitzなので、全時刻で解ける。[安定性定理](#thm-slt2-14-wellposed)を初期分布 $\mu_m(0)$ と $\mu_0$ に適用すれば、各 $0\le t\le T$ で

$$
W_1(\mu_m(t),\mu_t)
\le e^{(L_\theta+L_\mu)t}W_1(\mu_m(0),\mu_0)
\le e^{(L_\theta+L_\mu)T}W_1(\mu_m(0),\mu_0).
$$

この上限を $t$ について取れば結論を得る。$\square$
<!-- proof-end -->

この収束は任意の固定有限時間窓についてである。$T$ とともに指数因子が増すので、**幅極限と無限時間極限の交換**は保証されない。また $W_1$ 収束から本章の有界Lipschitz特徴の予測は収束するが、非有界特徴の予測は別途モーメント・一様可積分性の評価が必要になる。

例として $\mu_m(0)=(1-1/m)\delta_0+(1/m)\delta_m$ は $\delta_0$ へ弱収束するが、$W_1(\mu_m(0),\delta_0)=1$ のままである。移動先までの平均距離を制御することが、弱収束だけでは足りない理由である。

**本章のまとめ**。連続性方程式は、ニューロンの分布が速度場で運ばれることを試験関数で記述する。第一変分は損失を下げる輸送速度を与える。有界で滑らかな特徴では全時間の解、安定性、有限粒子の収束、損失減少を証明できる。しかし非有界パラメータ化と大域最適化の問題は、これらの仮定や結論を越える。

---

## 演習

### SLT2-14-A01 点質量の輸送距離
- Level: A
- 目安時間: 12分

$\Theta=\mathbb R$、$\mu=\delta_{-1}$、$\nu=(\delta_1+\delta_3)/2$ のとき $W_1(\mu,\nu)$ と $W_2(\mu,\nu)$ を定義から求めよ。

<!-- solution-start -->
#### 詳細解答

第1周辺が $\delta_{-1}$ だから結合は $\pi=(\delta_{(-1,1)}+\delta_{(-1,3)})/2$ に一意に決まる。移動距離はそれぞれ $2,4$。よって

$$
W_1=\frac{2+4}{2}=3,\qquad
W_2=\sqrt{\frac{2^2+4^2}{2}}=\sqrt{10}.
$$

両測度の二次モーメントは有限で、結合が他にないため下限もこの値に等しい。
<!-- solution-end -->

### SLT2-14-A02 粒子の弱形式
- Level: A
- 目安時間: 12分

$\Theta=\mathbb R$、$n=1$、$\psi(\theta)=\sin\theta$、$y=0$、$\mu_0=(\delta_0+\delta_{\pi/2})/2$ とする。$\varphi(\theta)=\theta$ の初期観測量の時間微分を、有限粒子の速度から求めよ。なぜこの $\varphi$ をコンパクト台の試験関数で近似できるか述べよ。

<!-- solution-start -->
#### 詳細解答

$e(0)=(\sin0+\sin(\pi/2))/2=1/2$ なので $v(\theta,\mu_0)=-\cos\theta/2$。二粒子の速度は $-1/2,0$ で、$\varphi'(\theta)=1$ だから

$$
\left.\frac d{dt}\right|_0\int\theta\,d\mu_t
=\frac12\left(-\frac12+0\right)=-\frac14.
$$

初期粒子は有限点にあり、短時間の軌道も有界集合に留まる。そこでは $\varphi(\theta)=\theta$ と一致し、外では滑らかに零へ落とす $C_c^1$ 関数を選べる。従って弱形式で同じ初期微分が求まる。
<!-- solution-end -->

### SLT2-14-A03 第一変分の係数
- Level: A
- 目安時間: 12分

$\psi(\theta)=\sin\theta$、$y=0$、$\mu=\delta_{\pi/2}$、$\nu=\delta_0$ とする。$\mu_\varepsilon=(1-\varepsilon)\mu+\varepsilon\nu$ の損失の一次・二次係数を求め、第一変分と照合せよ。

<!-- solution-start -->
#### 詳細解答

予測は $f(\mu_\varepsilon)=(1-\varepsilon)\cdot1+\varepsilon\cdot0=1-\varepsilon$。従って

$$
\mathcal L(\mu_\varepsilon)
=\frac12(1-\varepsilon)^2
=\frac12-\varepsilon+\frac12\varepsilon^2.
$$

一次係数は $-1$、二次係数は $1/2$。$e(\mu)=1$、$V(\theta;\mu)=\sin\theta$ だから $\int V\,d(\nu-\mu)=0-1=-1$。第一変分が一次係数に一致し、二次項は微分の極限で消える。
<!-- solution-end -->

### SLT2-14-A04 速度の一様評価
- Level: A
- 目安時間: 13分

$\Theta=\mathbb R$、$\psi(\theta)=\sin\theta$、$n=1$、$y=0$ とする。$M_0=M_1=M_2=1$ を使って $B,L_\theta,L_\mu$ を求め、速度の式と整合することを確認せよ。

<!-- solution-start -->
#### 詳細解答

$|\sin\theta|\le1$、$|\cos\theta|\le1$、$|-\sin\theta|\le1$ より三つの上限は妥当である。$Y=0$ だから

$$
B=(1+0)1=1,\quad L_\theta=(1+0)1=1,\quad L_\mu=1^2=1.
$$

$v(\theta,\mu)=-(\int\sin u\,d\mu(u))\cos\theta$。係数の絶対値は1以下、$\cos$ のLipschitz定数も1以下。分布の変更では $\sin$ のLipschitz定数1と $W_1$ の結合評価を使うため、各上限と一致する。
<!-- solution-end -->

### SLT2-14-A05 停留点は最適か
- Level: A
- 目安時間: 13分

$\psi(\theta)=\sin\theta$、教師 $y=1$、$\mu_0=\delta_{-\pi/2}$ とする。速度と損失を計算し、損失がより小さい確率測度を一つ挙げよ。

<!-- solution-start -->
#### 詳細解答

予測は $-1$、残差 $e=-1-1=-2$。$\nabla\psi(-\pi/2)=\cos(-\pi/2)=0$ だから粒子速度は $-e\cos(-\pi/2)=0$。$\mu_t=\mu_0$ が弱解であり、一意性から動かない。損失は

$$
\mathcal L(\mu_0)=\frac12(-2)^2=2.
$$

比較測度 $\nu=\delta_{\pi/2}$ なら予測1、残差0、損失0である。速度が零という条件は全分布で損失が最小であることを意味しない。
<!-- solution-end -->

### SLT2-14-B01 残差と散逸の二重検算
- Level: B
- 目安時間: 20分

$n=1$、$\psi(\theta)=\sin\theta$、$y=0$、$\mu_0=(\delta_0+\delta_{\pi/2})/2$ とする。初期の $\dot e$、$\dot{\mathcal L}$ を、(a) 粒子の連鎖律と (b) Gram積分から別々に導け。

<!-- solution-start -->
#### 詳細解答

初期残差は $e=1/2$、速度は $v(0)=-1/2$、$v(\pi/2)=0$。(a) 連鎖律から

$$
\dot e=\frac12[\cos0\,v(0)+\cos(\pi/2)v(\pi/2)]
=\frac12\left(-\frac12+0\right)=-\frac14.
$$

$\mathcal L=e^2/2$ なので $\dot{\mathcal L}=e\dot e=-1/8$。(b) Gram量は $G=\int\cos^2\theta\,d\mu_0=(1+0)/2=1/2$。従って $\dot e=-Ge=-1/4$、$\dot{\mathcal L}=-e^2G=-(1/4)(1/2)=-1/8$。また速度の二乗平均は $(1/2)[(1/2)^2+0]=1/8$ で、散逸式の符号まで一致する。
<!-- solution-end -->

### SLT2-14-B02 初期誤差の伝播
- Level: B
- 目安時間: 18分

$\psi(\theta)=\sin\theta$、$y=0$ とする。初期分布 $\mu_0=\delta_0$ と $\nu_0=\delta_h$（$h\in\mathbb R$）の解について、任意の有限 $T$ 上の $W_1$ 誤差の上界を求めよ。$T\to\infty$ で何がいえないかも答えよ。

<!-- solution-start -->
#### 詳細解答

二つの点質量間の唯一の結合は $\delta_{(0,h)}$ で、$W_1(\mu_0,\nu_0)=|h|$。この模型では $M_0=M_1=M_2=1,Y=0$ なので $L_\theta+L_\mu=2$。安定性を $t\le T$ に適用して

$$
\sup_{0\le t\le T}W_1(\mu_t,\nu_t)
\le e^{2T}|h|.
$$

固定 $T$ なら $h\to0$ で右辺は零。ただし $e^{2T}$ は $T$ とともに増えるので、$T\to\infty$ と $h\to0$ の順序を交換できるという一様評価にはならない。
<!-- solution-end -->

### SLT2-14-B03 結合から分布Lipschitz評価へ
- Level: B
- 目安時間: 23分

$\mu,\nu\in\mathcal P_1(\mathbb R^q)$、$\psi_i\in C^1$、$\sup_\theta\|\nabla\psi_i\|\le M_1$ とする。任意の結合から $|e_i(\mu)-e_i(\nu)|\le M_1W_1(\mu,\nu)$ を示し、さらに $\|\nabla\psi_i\|\le M_1$ のとき $\|v(\theta,\mu)-v(\theta,\nu)\|\le M_1^2 W_1$ を導け。

<!-- solution-start -->
#### 詳細解答

結合 $\pi\in\Pi(\mu,\nu)$ の周辺分布の性質から

$$
e_i(\mu)-e_i(\nu)
=\int[\psi_i(\theta)-\psi_i(\eta)]\,\pi(d\theta,d\eta).
$$

線分上の積分表示 $\psi_i(\theta)-\psi_i(\eta)=\int_0^1\nabla\psi_i(\eta+s(\theta-\eta))\cdot(\theta-\eta)\,ds$ より絶対値は $M_1\|\theta-\eta\|$ 以下。積分して $\pi$ 全体の下限を取れば第一の結論を得る。続いて

$$
\begin{aligned}
\|v(\theta,\mu)-v(\theta,\nu)\|
&=\left\|\frac1n\sum_i[e_i(\mu)-e_i(\nu)]\nabla\psi_i(\theta)\right\|\\
&\le\frac1n\sum_i M_1W_1(\mu,\nu)M_1
=M_1^2W_1(\mu,\nu).
\end{aligned}
$$

教師 $y_i$ は差を取ると消える。予測の微分と測度距離をつなぐのに有限標本以外の確率的な仮定は要らない。
<!-- solution-end -->

### SLT2-14-B04 弱収束では距離を抑えられない
- Level: B
- 目安時間: 20分

$m\ge2$、$\mu_m=(1-1/m)\delta_0+(1/m)\delta_m$、$\mu=\delta_0$ とする。有界連続関数の積分について弱収束を示す一方、$W_1(\mu_m,\mu)$ と一次モーメントを求め、有限時間の粒子収束定理の仮定と比較せよ。

<!-- solution-start -->
#### 詳細解答

有界連続 $\varphi$ について

$$
\left|\int\varphi\,d\mu_m-\int\varphi\,d\mu\right|
=\frac1m|\varphi(m)-\varphi(0)|
\le\frac{2\|\varphi\|_\infty}{m}\to0.
$$

よって弱収束する。一方 $\mu=\delta_0$ なので唯一の結合は点0へ各粒子を送るもの。輸送費用は

$$
W_1(\mu_m,\delta_0)
=\left(1-\frac1m\right)0+\frac1m|m|=1.
$$

$\int|\theta|\,d\mu_m=1$ も零へ向かわない。従って粒子極限定理の必要な $W_1$ 初期収束を満たさず、弱収束だけから同定理を使うことはできない。
<!-- solution-end -->

### SLT2-14-C01 質量配分と輸送の異なる停留性
- Level: C
- 目安時間: 32分

$\Theta=\mathbb R$、訓練点1個で $\psi(\theta)=\cos\theta$、$y=1/2$ とし、初期分布 $\mu_0=(\delta_0+\delta_\pi)/2$ を取る。

1. 予測、損失、速度、Gram量を求め、mean-field流が静止することを示せ。
2. $\nu=\delta_0$ への混合 $\mu_\varepsilon=(1-\varepsilon)\mu_0+\varepsilon\nu$ の一次変分と実際の損失を比較せよ。
3. この模型が大域適切設定性定理の仮定を満たしながら、輸送勾配の停留性から大域最適性がいえない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

1. $\cos0=1$、$\cos\pi=-1$ なので $f(\mu_0)=(1-1)/2=0$、$e=-1/2$、$\mathcal L=e^2/2=1/8$。$\nabla\psi=-\sin\theta$ だから

$$
v(\theta,\mu_0)=-e\nabla\psi(\theta)
=-\frac12\sin\theta.
$$

二原子の位置 $0,\pi$ で速度はともに0。よって $\mu_t\equiv\mu_0$ は弱解で、一意性によりこれが解である。Gram量は

$$
G(\mu_0)=\frac12(\sin^2 0+\sin^2\pi)=0,
$$

従って $\dot e=-Ge=0$、$\dot{\mathcal L}=-e^2G=0$ も一致する。

2. $\nu=\delta_0$ は予測1。混合の予測は $(1-\varepsilon)\cdot0+\varepsilon\cdot1=\varepsilon$ で、残差 $\varepsilon-1/2$。従って

$$
\mathcal L(\mu_\varepsilon)
=\frac12\left(\varepsilon-\frac12\right)^2
=\frac18-\frac12\varepsilon+\frac12\varepsilon^2.
$$

一次変分は $-1/2$。直接、$V(\theta;\mu_0)=e\cos\theta=-\cos\theta/2$ として

$$
\int V\,d(\nu-\mu_0)
=V(0)-\frac{V(0)+V(\pi)}2
=-\frac12-0=-\frac12
$$

を得る。混合は粒子の**質量比**を変え、輸送は二つの原子の質量を保って位置を動かすため、導関数が異なる。

3. $\psi=\cos$ とその一・二階導関数は全て絶対値1以下なので $M_0=M_1=M_2=1$、$Y=1/2$ で大域解が存在する。しかし流れは $\nabla V$ が原子の位置で零となると止まる。$\mu_{\varepsilon=1/2}$ は予測1/2・損失0だから、静止した $\mu_0$ は大域最適ではない。存在・一意性・散逸は成立しても、非凸な輸送幾何における大域最適性の保証にはならない。
<!-- solution-end -->
