# OTR23 JKOの一歩はPDEにどう近づくか

[OTR22のJKO反復](../OTR22/index.md#def-otr22-jko-step)は、前時刻の確率測度から次の確率測度を最小化で選ぶ方法でした。そこでは[最小化解の存在](../OTR22/index.md#thm-otr22-existence)と[離散エネルギー不等式](../OTR22/index.md#prop-otr22-energy)を証明しました。しかし、エネルギーが減るだけでは、その反復が[OTR21の熱・Fokker–Planck方程式](../OTR21/index.md#thm-otr21-gradient-pde)に近づくとは言えません。

有限次元で $x^{k+1}$ が $F(x)+|x-x^k|^2/(2\tau)$ を最小化するなら、微分可能な場合は $(x^{k+1}-x^k)/\tau=-\nabla F(x^{k+1})$ です。確率測度では「位置を少しずらす」ことで同じ役割の式を取り出します。重要なのは、**最適結合を新しい測度から古い測度へ向けること**と、**弱形式へ直すときのTaylor展開の誤差を残すこと**です。

以下では空間を $\mathbb R^d$、$d\ge1$、時間刻みを $\tau>0$、確率測度を有限二次モーメントを持つ $\mathcal P_2(\mathbb R^d)$ の元とします。$\mu=\rho\,dx$ は密度 $\rho$ を持つ測度、$\nabla$ と $\Delta$ は空間変数についての勾配とLaplacianです。$C_c^\infty$ は滑らかなコンパクト支持の関数、$C_b^2$ は関数と1、2階導関数が有界で連続な関数の集合です。

## 1. 密度を変える代わりに位置を動かす

密度へ直接 $\rho+\varepsilon\eta$ を足すと非負性の確認が必要になります。ここでは滑らかなベクトル場 $\xi$ に従って各点を $x+\varepsilon\xi(x)$ へ移すことにします。この操作なら押し出しによって質量は自動的に保存され、最適輸送の費用とも直接比較できます。

方向 $\xi$ をコンパクト支持にするのは、無限遠での積分と可逆性の問題を切り分けるためです。$D\xi(x)$ は位置 $x$ での空間微分行列であり、$\|D\xi\|_\infty$ はその作用素ノルムの上限です。$\xi\in C_c^\infty(\mathbb R^d;\mathbb R^d)$ なら $D\xi$ は有界で、$|\varepsilon|\|D\xi\|_\infty<1$ のとき $S_\varepsilon(x)=x+\varepsilon\xi(x)$ は全空間の微分同相写像になります。実際、

$$
|S_\varepsilon(x)-S_\varepsilon(y)|
\ge(1-|\varepsilon|\|D\xi\|_\infty)|x-y|
$$

で単射、方程式 $x=z-\varepsilon\xi(x)$ は縮小写像として任意の $z$ について唯一解を持ちます。微分行列 $DS_\varepsilon=I+\varepsilon D\xi$ の行列式は局所的な体積の倍率を表し、変数変換ではこの倍率で密度を割ります。

<a id="def-otr23-displacement-variation"></a>

<!-- formal-statement-start -->
> **定義（位置の微小押し出し変分）**
> $\mu\in\mathcal P_2(\mathbb R^d)$、$\xi\in C_c^\infty(\mathbb R^d;\mathbb R^d)$ とする。十分小さな実数 $\varepsilon$ に対して $S_\varepsilon(x)=x+\varepsilon\xi(x)$ とし、質量を保存する**位置の微小押し出し変分**を

$$
\mu_\varepsilon=(S_\varepsilon)_\#\mu
$$

> と定義する。$\mu=\rho\,dx$ なら $\mu_\varepsilon=\rho_\varepsilon\,dx$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr23-displacement-variation -->
**定義の確認**。$d=1$、$\rho(x)=(2\pi)^{-1/2}e^{-x^2/2}$ とし、$0\le\chi\le1$ を $[-2,2]$ に支持を持ち $[-1,1]$ で1となる滑らかな関数とします。$\xi(x)=x\chi(x)$ と置きます。ここでプライムは位置 $x$ に関する導関数です。積の微分により

$$
S_\varepsilon'(x)=1+\varepsilon\xi'(x)
=1+\varepsilon\bigl(\chi(x)+x\chi'(x)\bigr)>0
$$

が十分小さい $|\varepsilon|$ で成り立ち、$S_\varepsilon$ は増加する微分同相写像です。一次元のJacobianはこの $S_\varepsilon'$ です。微小区間の長さが $dz=S_\varepsilon'(x)\,dx$ 倍になるため、押し出しの密度は

$$
\rho_\varepsilon(S_\varepsilon(x))
=\frac{\rho(x)}{S_\varepsilon'(x)}\ge0,
\qquad
\int\rho_\varepsilon(z)\,dz
=\int\rho(x)\,dx=1
$$

を満たします。さらに $|S_\varepsilon(x)|\le |x|+|\varepsilon|\|\xi\|_\infty$ だから

$$
\int z^2\rho_\varepsilon(z)\,dz
=\int|S_\varepsilon(x)|^2\rho(x)\,dx
\le2\int x^2\rho(x)\,dx+2\varepsilon^2\|\xi\|_\infty^2<\infty.
$$

外側 $|x|>2$ では $S_\varepsilon(x)=x$ です。これで非負性・総質量・有限二次モーメントという定義の条件をそれぞれ確認できました。
<!-- definition-example-end -->

この変分で[OTR21の自由エネルギー](../OTR21/index.md#def-otr21-free-energy)がどう変わるかを計算します。拡散係数 $a>0$、$V,W\in C^2(\mathbb R^d)$、$W$ は偶関数とし、$|V(x)|+|W(x)|\le C(1+|x|^2)$、$|\nabla V(x)|+|\nabla W(x)|\le C(1+|x|)$ を仮定します。$\rho\,dx\in\mathcal P_2$、$\int\rho\log\rho$ が有限のとき

$$
\mathcal F(\rho)=a\int\rho\log\rho\,dx
+\int V\rho\,dx+\frac12\iint W(x-y)\rho(x)\rho(y)\,dx\,dy
$$

を考えます。$W*\rho(x)=\int W(x-y)\rho(y)dy$ は[OTR21の畳み込み](../OTR21/index.md#def-otr21-free-energy)です。

<a id="lem-otr23-pushforward-derivative"></a>

<!-- formal-statement-start -->
> **補題（押し出しに沿う自由エネルギーの微分）**
> $d\ge1$、$a>0$ とし、$V,W\in C^2(\mathbb R^d)$、$W(z)=W(-z)$ とする。ある $C>0$ について全ての $z\in\mathbb R^d$ で $|V(z)|+|W(z)|\le C(1+|z|^2)$、$|\nabla V(z)|+|\nabla W(z)|\le C(1+|z|)$ とする。$\mu=\rho\,dx\in\mathcal P_2(\mathbb R^d)$ で $\int\rho\log\rho\,dx$ が有限とする。任意の $\xi\in C_c^\infty(\mathbb R^d;\mathbb R^d)$ による[位置の微小押し出し変分](#def-otr23-displacement-variation)について

$$
\begin{aligned}
\left.\frac d{d\varepsilon}\mathcal F(\rho_\varepsilon)\right|_{\varepsilon=0}
= {}&-a\int\rho\,\nabla\cdot\xi\,dx\\
&+\int\rho\,\bigl[\nabla V+\nabla(W*\rho)\bigr]\cdot\xi\,dx.
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

エントロピーはJacobianの対数が生み、外場は一粒子の移動を微分し、相互作用は二粒子の相対位置を微分します。相互作用の二項は $W$ の偶性によって一致します。ここでは $\rho$ 自体の微分可能性を仮定しないことが大切です。

<!-- proof-start -->
### 証明

$J_\varepsilon(x)=\det DS_\varepsilon(x)=\det(I+\varepsilon D\xi(x))$ と置きます。$DS_\varepsilon$ は $|\varepsilon|\|D\xi\|_\infty<1$ で可逆で、$J_0=1$ からの連続性により十分小さい $\varepsilon$ では $J_\varepsilon>0$ です。押し出しの定義と変数変換を任意の可測集合 $B$ に用いると

$$
\mu_\varepsilon(B)=\int_{S_\varepsilon^{-1}(B)}\rho(x)\,dx
=\int_B\frac{\rho(S_\varepsilon^{-1}(z))}
{J_\varepsilon(S_\varepsilon^{-1}(z))}\,dz.
$$

従って $\rho_\varepsilon(S_\varepsilon(x))J_\varepsilon(x)=\rho(x)$ がほとんど至る所で成立します。これは[OTR17の流れに対するJacobianの密度保存式](../OTR17/index.md#prop-otr17-jacobian)と同じ変数変換の原理ですが、ここでは時間発展の流れを仮定していません。従って

$$
\begin{aligned}
\int\rho_\varepsilon\log\rho_\varepsilon\,dz
&=\int\rho(x)\log\frac{\rho(x)}{J_\varepsilon(x)}\,dx\\
&=\int\rho\log\rho\,dx-\int\rho\log J_\varepsilon\,dx.
\end{aligned}
$$

$J_0=1$、$\frac d{d\varepsilon}|_0\log J_\varepsilon=\operatorname{tr}D\xi=\nabla\cdot\xi$ です。$D\xi$ の支持はコンパクトで $J_\varepsilon$ は小さな $\varepsilon$ について0から離れるため、微分と積分を交換して第一項の微分が $-\int\rho\,\nabla\cdot\xi$ と分かります。

押し出しの定義から外場項は $\int V(x+\varepsilon\xi(x))\,d\mu(x)$ です。$\xi$ の支持上で $\nabla V$ は有界なので、微分係数は $\int\nabla V\cdot\xi\,d\mu$ です。

相互作用項の微分は、元の二つの変数 $x,y$ に戻すと

$$
\frac12\iint\nabla W(x-y)\cdot\bigl(\xi(x)-\xi(y)\bigr)\,d\mu(x)d\mu(y).
$$

$W$ が偶なので $\nabla W$ は奇関数です。$x$ と $y$ を交換した第二項は第一項と一致し、その和は

$$
\int\left[\int\nabla W(x-y)\,d\mu(y)\right]\cdot\xi(x)\,d\mu(x)
=\int\rho\,\nabla(W*\rho)\cdot\xi\,dx.
$$

導関数の一次成長と $\mu\in\mathcal P_2$ はこの微分の支配関数を与えます。三つを加えて結論を得ます。$\square$
<!-- proof-end -->

**符号の直接確認**。上のGaussian例で $a=1$、$V=W=0$ とすると $\mathcal H'(0)=-\int\rho(\chi+x\chi')dx$ です。部分積分で $\rho'=-x\rho$ を使うと

$$
-\int\rho(\chi+x\chi')dx
=\int\rho' x\chi\,dx=-\int x^2\chi(x)\rho(x)dx<0.
$$

中央を外側へ広げるこの変分では熱エントロピーが下がります。

## 2. JKO最小化の弱いEuler–Lagrange条件

今度は押し出し変分をJKOの最小化に代入します。$\nu$ を古い状態、$\mu$ を一歩後の状態とし、$\pi\in\Pi(\mu,\nu)$ を[最適結合](../OTR3/index.md#thm-otr3-polish)とします。結合の第一座標 $x$ が**新**、第二座標 $y$ が**旧**です。$\pi$ をそのまま使い、$x$ だけを $S_\varepsilon(x)$ に移した結合は $\mu_\varepsilon$ と $\nu$ を結ぶので、最適費用に対する上界を作れます。

<a id="thm-otr23-euler-lagrange"></a>

<!-- formal-statement-start -->
> **定理（JKO一歩の弱いEuler–Lagrange条件）**
> $d\ge1$、$\tau>0$、$\nu\in\mathcal P_2(\mathbb R^d)$ とする。$a>0$、$V,W\in C^2(\mathbb R^d)$ は $W(z)=W(-z)$ を満たし、ある $C>0$ について全ての $x$ で $|V(x)|+|W(x)|\le C(1+|x|^2)$、$|\nabla V(x)|+|\nabla W(x)|\le C(1+|x|)$ を満たすとする。$\mathcal F=a\mathcal H+\mathcal V+\mathcal W$ を[エントロピーを含む自由エネルギー](../OTR21/index.md#def-otr21-free-energy)とし、$\mu=\rho\,dx\in\mathcal P_2(\mathbb R^d)$ が有限エントロピーかつ $\mathcal F(\mu)<\infty$ で

$$
\mu\in\underset{\eta\in\mathcal P_2}{\operatorname{argmin}}
\left\{\mathcal F(\eta)+\frac{W_2^2(\eta,\nu)}{2\tau}\right\}
$$

> を満たすとする。$\pi\in\Pi(\mu,\nu)$ を $W_2$ の最適結合（$\pi$ の第一座標が新しい測度）とする。このとき全ての $\xi\in C_c^\infty(\mathbb R^d;\mathbb R^d)$ について

$$
\boxed{\frac1\tau\iint(x-y)\cdot\xi(x)\,d\pi(x,y)
=a\int\rho\,\nabla\cdot\xi\,dx
-\int\rho\,[\nabla V+\nabla(W*\rho)]\cdot\xi\,dx.}
$$
<!-- formal-statement-end -->

### 証明の見取り図

固定した最適結合を押し出したものは、変分後に最適とは限りません。それでも輸送費用の**上界**としては使えます。$\varepsilon>0$ と $\varepsilon<0$ を両方試すと、一次の係数が正でも負でもないため0と確定します。

<!-- proof-start -->
### 証明

$\mu_\varepsilon=(S_\varepsilon)_\#\mu$ を競争相手にします。結合 $((S_\varepsilon,\operatorname{id}))_\#\pi$ の費用から

$$
\begin{aligned}
W_2^2(\mu_\varepsilon,\nu)
&\le\iint|x+\varepsilon\xi(x)-y|^2\,d\pi(x,y)\\
&=W_2^2(\mu,\nu)
+2\varepsilon\iint(x-y)\cdot\xi(x)\,d\pi
+\varepsilon^2\int|\xi|^2\,d\mu.
\end{aligned}
$$

[JKO目的関数](../OTR22/index.md#def-otr22-jko-step)を $J_{\tau,\nu}(\eta)=\mathcal F(\eta)+W_2^2(\eta,\nu)/(2\tau)$ と書きます。$\mu$ の最小性で $0\le J_{\tau,\nu}(\mu_\varepsilon)-J_{\tau,\nu}(\mu)$ となり、上の費用上界を代入すると

$$
0\le\mathcal F(\mu_\varepsilon)-\mathcal F(\mu)
+\frac\varepsilon\tau\iint(x-y)\cdot\xi(x)\,d\pi
+\frac{\varepsilon^2}{2\tau}\int|\xi|^2\,d\mu.
$$

ここで $\mathcal F(\mu_\varepsilon)-\mathcal F(\mu)=\varepsilon A+o(|\varepsilon|)$ とし、$A$ に[補題の微分式](#lem-otr23-pushforward-derivative)を代入します。正の $\varepsilon$ で割って極限を取れば $A+\tau^{-1}\iint(x-y)\cdot\xi\,d\pi\ge0$、負の $\varepsilon$ で割れば逆向きの不等式です。従って等号が成り立ち、$A$ を移項すると主張の式を得ます。$\square$
<!-- proof-end -->

この式は $\rho$ の滑らかさを要求しません。さらに $\rho$ が滑らかで厳密に正なら、[OTR21の第一変分](../OTR21/index.md#prop-otr21-first-variations)を使い、右辺を部分積分で

$$
-\int\rho\,\nabla\bigl(a\log\rho+V+W*\rho\bigr)\cdot\xi\,dx
$$

と書けます。$\rho\,dx$ はLebesgue測度に絶対連続なので、[Brenierの最適写像定理](../OTR13/index.md#thm-otr13-brenier)により新しい測度から古い測度への最適結合を $y=T(x)$ と表せるとき、全ての試験ベクトル場に対する等号から

$$
\boxed{\frac{x-T(x)}\tau
=-\nabla\bigl(a\log\rho(x)+V(x)+(W*\rho)(x)\bigr)}
\qquad\rho\,dx\text{--a.e.}
$$

となります。これは**新しい位置 $x$ から見た後退差分**で、右辺が[OTR20の負の形式的勾配](../OTR20/index.md#def-otr20-formal-gradient)です。$T$ の存在と微分できる密度は別の仮定なので、一方をもう一方から勝手に導かないでください。

## 3. 試験関数で見ればPDEの一歩になる

時刻間の密度の差を点ごとに割ると、最小化解が滑らかとは限らず議論が進みません。そこで[OTR17の弱い連続の方程式](../OTR17/index.md#def-otr17-measure-weak)にならい、滑らかな試験関数 $\varphi$ を積分してから差を取ります。

二点 $x,y$ の間で $\varphi(x)-\varphi(y)$ を $x$ の周りでTaylor展開すれば、一次項には先ほどのEuler–Lagrange条件が入ります。二次項は消えませんが、輸送距離で上から抑えられます。

<a id="thm-otr23-weak-step"></a>

<!-- formal-statement-start -->
> **定理（JKO一歩の弱いPDEと輸送誤差）**
> $d\ge1$、$\tau>0$、$a>0$ とする。$V,W\in C^2(\mathbb R^d)$ は $W$ が偶で、ある $C>0$ について全ての $x$ で $|V(x)|+|W(x)|\le C(1+|x|^2)$、$|\nabla V(x)|+|\nabla W(x)|\le C(1+|x|)$ を満たすとする。$\mathcal F=a\mathcal H+\mathcal V+\mathcal W$ を[自由エネルギー](../OTR21/index.md#def-otr21-free-energy)、$\nu\in\mathcal P_2(\mathbb R^d)$ とし、$\mu=\rho\,dx\in\mathcal P_2$ は有限エントロピーで $\mathcal F(\mu)<\infty$ のJKO最小化解とする。$\pi\in\Pi(\mu,\nu)$ は第一周辺分布が $\mu$、第二周辺分布が $\nu$ の $W_2$ 最適結合とする。このとき任意の $\varphi\in C_c^\infty(\mathbb R^d)$ について、ある実数 $R_\tau(\varphi)$ が存在して

$$
\begin{aligned}
\int\varphi\,d\mu-\int\varphi\,d\nu
={}&\tau\int\bigl[a\Delta\varphi
-\nabla\varphi\cdot\nabla V\\
&\hspace{48pt}-\nabla\varphi\cdot\nabla(W*\rho)\bigr]d\mu
+R_\tau(\varphi),
\end{aligned}
$$

$$
|R_\tau(\varphi)|\le\frac12\|D^2\varphi\|_\infty W_2^2(\mu,\nu).
$$

> 特に、時間差分の主部は $\partial_t\rho=a\Delta\rho+\nabla\cdot(\rho\nabla V)+\nabla\cdot(\rho\nabla(W*\rho))$ の弱形式である。これは一歩の等式であり、$\tau\downarrow0$ で解へ収束するという主張は含まない。
<!-- formal-statement-end -->

### 証明の見取り図

結合の周辺分布により積分差を $\pi$ 上の二点差へ置き換えます。$x$ は新、$y$ は旧という向きで一次項を作り、[Euler–Lagrange条件](#thm-otr23-euler-lagrange)に $\xi=\nabla\varphi$ を代入します。二次の残差を距離の二乗で評価するのが連続時間への橋です。

<!-- proof-start -->
### 証明

$\pi$ の第一・第二周辺分布が $\mu,\nu$ なので

$$
\int\varphi\,d\mu-\int\varphi\,d\nu
=\iint\bigl[\varphi(x)-\varphi(y)\bigr]d\pi(x,y).
$$

$f(s)=\varphi(x+s(y-x))$ と置き、$s=0$ を中心とする二次までの積分剰余付きTaylor公式を用います。

$$
\begin{aligned}
\varphi(x)-\varphi(y)
={}&\nabla\varphi(x)\cdot(x-y)\\
&-\int_0^1(1-s)(y-x)^TD^2\varphi(x+s(y-x))(y-x)\,ds.
\end{aligned}
$$

後半の絶対値は $\|D^2\varphi\|_\infty|x-y|^2/2$ 以下です。$\pi$ について積分し、最適性 $\iint|x-y|^2d\pi=W_2^2(\mu,\nu)$ を使って残差評価を得ます。

一次項に[前定理](#thm-otr23-euler-lagrange)を $\xi=\nabla\varphi$ として適用すると

$$
\iint(x-y)\cdot\nabla\varphi(x)d\pi
=\tau\left[a\int\rho\Delta\varphi\,dx
-\int\rho\,(\nabla V+\nabla(W*\rho))\cdot\nabla\varphi\,dx\right].
$$

この式を二点差の一次項に戻せば結論です。$\square$
<!-- proof-end -->

**右辺の符号を確認しましょう。** $W=0$、$a=1$ なら

$$
\frac1\tau\left(\int\varphi\,d\mu-\int\varphi\,d\nu\right)
=\int(\Delta\varphi-\nabla V\cdot\nabla\varphi)d\mu
+\frac{R_\tau(\varphi)}\tau.
$$

これは $\partial_t\rho=\Delta\rho+\nabla\cdot(\rho\nabla V)$ を $\varphi$ で積分し、空間の部分積分をした形と一致します。二次誤差を「一歩ごとにゼロ」と言ってはいけません。一歩の $W_2^2/\tau$ が刻みとともに小さくなることさえ、個別のステップでは別途評価が必要です。

## 4. Gaussianなら一歩の式を数値まで解ける

形式的なPDEとの一致を、エントロピーと二次外場の両方を含む本物の最小化問題で確認します。$d=1$、$\lambda>0$ とし

$$
\mathcal F(\rho)=\int\rho\log\rho\,dx
+\frac\lambda2\int x^2\rho(x)dx,
\qquad \nu=N(m,s^2),\quad s>0
$$

を採用します。ここで $N(m,s^2)$ は平均 $m$、分散 $s^2$ のGaussian確率測度です。基準分布を $\gamma_\lambda=N(0,\lambda^{-1})$、$Z_\lambda=\sqrt{2\pi/\lambda}$ とすると、密度の対数を展開して

$$
\mathcal F(\mu)
=D(\mu\Vert\gamma_\lambda)-\log Z_\lambda
\ge-\log Z_\lambda
$$

となります。[相対エントロピーの非負性](../OTR21/index.md#prop-otr21-gibbs)と[狭義下半連続性](../OTR22/index.md#lem-otr22-relative-entropy-lsc)から、[OTR22のJKO存在定理](../OTR22/index.md#thm-otr22-existence)の仮定を確認できるため、一歩の最小化解が存在します。さらに、この例では最小化解がGaussianであることまで証明できます。

<a id="prop-otr23-gaussian-step"></a>

<!-- formal-statement-start -->
> **命題（二次外場付きエントロピーのGaussian一歩）**
> $\lambda,\tau>0$、$m\in\mathbb R$、$s>0$ とし、$\nu=N(m,s^2)$ とする。$\mathcal F(\mu)=\int\rho\log\rho\,dx+(\lambda/2)\int x^2d\mu$（$\mu=\rho dx$ でエントロピー有限の場合、それ以外は $+\infty$）を $\mathcal P_2(\mathbb R)$ 上に定める。JKO一歩の最小化解は一意で $\mu=N(M,r^2)$ となり、

$$
M=\frac{m}{1+\lambda\tau},\qquad
r=\frac{s+\sqrt{s^2+4\tau(1+\lambda\tau)}}{2(1+\lambda\tau)}>0.
$$

> 特に $r-s=\tau(1/r-\lambda r)$、$M-m=-\tau\lambda M$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

任意の候補の平均と標準偏差を $M,r$ としたとき、Gaussianは同じ二つの値でエントロピーを最小にします。また、Gaussianの旧分布への輸送費用は平均差と標準偏差差の二乗で下から評価できます。両方の下界で等号を実現するのがGaussianなので、全測度にわたる最小化を二変数の計算へ減らせます。

<!-- proof-start -->
### 証明

有限エネルギーの候補 $\mu=\rho dx$ の平均と標準偏差を $M,r>0$ とします。密度がある確率測度の分散は0にはなりません。$g_{M,r}$ を $N(M,r^2)$ の密度とすると、[相対エントロピーの非負性](../OTR21/index.md#prop-otr21-gibbs)を $D(\mu\Vert N(M,r^2))$ に適用して

$$
\begin{aligned}
0&\le\int\rho\log\frac{\rho}{g_{M,r}}dx\\
&=\int\rho\log\rho\,dx
+\frac12\log(2\pi r^2)+\frac1{2r^2}\int(x-M)^2\rho(x)dx\\
&=\int\rho\log\rho\,dx+\frac12\log(2\pi e r^2).
\end{aligned}
$$

従ってエントロピーは $-\frac12\log(2\pi e)-\log r$ 以上で、等号は $\rho=g_{M,r}$ のときに限ります。

$X\sim\mu$、$Y\sim\nu$ となる任意の結合について、[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を中心化した二変数に適用すると、$\operatorname{Cov}(X,Y)\le rs$ です。従って

$$
\begin{aligned}
E[(X-Y)^2]
&=(M-m)^2+r^2+s^2-2\operatorname{Cov}(X,Y)\\
&\ge(M-m)^2+(r-s)^2.
\end{aligned}
$$

この二つの下界と $E[X^2]=M^2+r^2$ から、JKO目的値は

$$
G(M,r)=-\frac12\log(2\pi e)-\log r
+\frac\lambda2(M^2+r^2)
+\frac{(M-m)^2+(r-s)^2}{2\tau}
$$

以上です。一方 $X=M+rZ$、$Y=m+sZ$、$Z\sim N(0,1)$ の結合では $x\mapsto m+(s/r)(x-M)$ は傾き $s/r>0$ の増加アフィン写像であり、[一次元の分位点公式](../OTR11/index.md#thm-otr11-quantile-formula)によって輸送費用の下界を達成します。従ってGaussian候補 $N(M,r^2)$ は各 $M,r$ に対して $G(M,r)$ を実現します。

$r>0$ 上で偏微分すると

$$
\partial_MG=\lambda M+\frac{M-m}\tau,
\qquad\partial_rG=-\frac1r+\lambda r+\frac{r-s}\tau.
$$

二階導関数は $\partial^2_{MM}G=\lambda+1/\tau>0$、$\partial^2_{rr}G=1/r^2+\lambda+1/\tau>0$ で交差項は0です。また $r\downarrow0$ と $r\uparrow\infty$ の両端で $G\to\infty$ なので、停留点が唯一の最小点です。第一の式から $M=m/(1+\lambda\tau)$、第二を $r$ 倍して

$$
(1+\lambda\tau)r^2-sr-\tau=0
$$

となり、正根が表示した $r$ です。他の候補が同じ目的値を達成するなら、エントロピーの下界で等号が必要なのでその候補自身もGaussianです。よって全確率測度の中で一意です。最後の差分公式は二つの停留方程式を変形して得られます。$\square$
<!-- proof-end -->

**PDEとの比較**。この一歩では $(M-m)/\tau=-\lambda M$ と $(r-s)/\tau=1/r-\lambda r$ です。時間刻みを形式的に小さくすると、平均 $m(t)$ と標準偏差 $s(t)$ に対して次の常微分方程式が現れます。ここで $m'(t)=dm(t)/dt$、$s'(t)=ds(t)/dt$ は時刻 $t$ に関する導関数です。一方、密度のPDEで用いる $\partial_t\rho(t,x)$ は位置 $x$ を固定した時間偏微分であり、先ほどの $\partial_MG,\partial_rG$ は目的関数 $G$ の別々の最適化変数に関する偏微分です。

$$
m'(t)=-\lambda m(t),\qquad
s'(t)=\frac1{s(t)}-\lambda s(t),
\qquad (s^2)'(t)=2-2\lambda s(t)^2
$$

が現れます。これは[OTR21のGaussianのFokker–Planck解の計算](../OTR21/index.md#thm-otr21-gradient-pde)と係数が一致します。この観察は一歩の最適化を検算したもので、任意初期値に対する収束定理ではありません。

## 5. エネルギー散逸を時間の連続性に替える

離散的な測度列を時間の関数として見るには、**階段状補間**と**変位補間**の二種類が役立ちます。前者は一歩の弱方程式を足すのに自然で、後者は時刻に関して連続です。ここで補間するのはPDEの解そのものではありません。

<a id="def-otr23-time-interpolations"></a>

<!-- formal-statement-start -->
> **定義（JKOの階段状補間と測地線補間）**
> $\tau>0$、$N\in\mathbb N$ とし、$\mu^0,\ldots,\mu^N\in\mathcal P_2(\mathbb R^d)$ がJKO反復で得られたとする。$t\in((k-1)\tau,k\tau]$ に対して、**階段状補間**を $\bar\mu_\tau(t)=\mu^k$、$\bar\mu_\tau(0)=\mu^0$ とする。各 $k$ で最適結合 $\pi_k\in\Pi(\mu^k,\mu^{k-1})$ を一つ選び、$\theta=(t-(k-1)\tau)/\tau$ と置く。**測地線補間**を

$$
\widetilde\mu_\tau(t)=\bigl((1-\theta)y+\theta x\bigr)_\#\pi_k,
\qquad \widetilde\mu_\tau(0)=\mu^0
$$

> と定義する。$\pi_k$ の $x$ 側が新、$y$ 側が旧の測度である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr23-time-interpolations -->
**定義の確認**。$\mu^0=\delta_1$、$\mu^1=\delta_{1/2}$ の一歩なら最適結合は $\pi_1=\delta_{(1/2,1)}$ です。$0<t\le\tau$ の階段状補間は常に $\delta_{1/2}$ ですが、測地線補間は $\delta_{1-t/(2\tau)}$ となり、$t=0$ で $\delta_1$、$t=\tau$ で $\delta_{1/2}$ に一致します。途中で確率質量は消えずに移動しています。
<!-- definition-example-end -->

以下で $m\in\mathbb R$ はエネルギー下界、$E_0=\mathcal F(\mu^0)-m\ge0$ とします。$m$ はGaussian平均ではなく、別の用途の記号です。

<a id="thm-otr23-interpolation-estimate"></a>

<!-- formal-statement-start -->
> **定理（JKO補間の離散散逸と時間一様評価）**
> $\mathcal F:\mathcal P_2(\mathbb R^d)\to(-\infty,+\infty]$ と $m\in\mathbb R$ があり、全ての $\eta\in\mathcal P_2(\mathbb R^d)$ で $\mathcal F(\eta)\ge m$ を満たし、$\mathcal F(\mu^0)<\infty$ とする。$\tau>0$、$N\in\mathbb N$ に対して $\mu^0,\ldots,\mu^N$ が各回のJKO最小化解であるとし、$T=N\tau$ とする。$E_0=\mathcal F(\mu^0)-m$、$a_k=W_2(\mu^k,\mu^{k-1})$ と置くと

$$
\sum_{k=1}^N\frac{a_k^2}{\tau}\le2E_0.
$$

> [二種類の時間補間](#def-otr23-time-interpolations)は、全ての $0\le s\le t\le T$ について

$$
W_2\bigl(\widetilde\mu_\tau(s),\widetilde\mu_\tau(t)\bigr)
\le\sqrt{2E_0}\,\sqrt{t-s}
$$

> を満たし、各 $0\le t\le T$ について

$$
W_2\bigl(\bar\mu_\tau(t),\widetilde\mu_\tau(t)\bigr)
\le\sqrt{2\tau E_0}.
$$

> さらに各ステップが[弱いPDE定理](#thm-otr23-weak-step)の仮定を満たせば、任意の $\varphi\in C_c^\infty$ に対するその残差 $R_k(\varphi)$ は

$$
\left|\sum_{k=1}^N R_k(\varphi)\right|
\le\tau E_0\|D^2\varphi\|_\infty.
$$
<!-- formal-statement-end -->

### 証明の見取り図

一歩の散逸不等式を足して得るのは**距離二乗の和**です。測地線上での距離は時刻差に比例するので、区間をまたぐ移動を三角不等式で足し、[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)で時間の平方根へ変換します。最後の残差も同じ距離二乗の和で抑えます。

<!-- proof-start -->
### 証明

[OTR22の離散エネルギー不等式](../OTR22/index.md#prop-otr22-energy)を $k=1,\ldots,N$ について足すと

$$
\frac1{2\tau}\sum_{k=1}^Na_k^2
\le\mathcal F(\mu^0)-\mathcal F(\mu^N)
\le E_0.
$$

よって第一式が従います。[OTR15の最適結合による定速測地線](../OTR15/index.md#thm-otr15-displacement-geodesic)を各区間で使うと、$((k-1)\tau,k\tau)$ 内の二時刻 $u<v$ では距離が $(v-u)a_k/\tau$ です。$[s,t]$ と各小区間の共通部分の長さを $\ell_k$ とすると、三角不等式から

$$
W_2(\widetilde\mu_\tau(s),\widetilde\mu_\tau(t))
\le\sum_k\frac{\ell_k}{\tau}a_k.
$$

$\sum_k\ell_k=t-s$ かつ $0\le\ell_k\le\tau$ です。有限和の[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)より

$$
\begin{aligned}
\left(\sum_k\frac{\ell_k}{\tau}a_k\right)^2
&\le\left(\sum_k\frac{\ell_k^2}{\tau}\right)
\left(\sum_k\frac{a_k^2}{\tau}\right)\\
&\le(t-s)\,2E_0.
\end{aligned}
$$

同一区間内で階段状補間 $\mu^k$ と測地線補間の距離は $(1-\theta)a_k\le a_k$ です。第一式から各 $a_k^2\le2\tau E_0$ が従うので第二の評価を得ます。$t=0$ では両者とも $\mu^0$ です。

最後に各ステップの[残差評価](#thm-otr23-weak-step)を足し

$$
\left|\sum_kR_k(\varphi)\right|
\le\frac12\|D^2\varphi\|_\infty\sum_ka_k^2
\le\tau E_0\|D^2\varphi\|_\infty
$$

を得ます。$\square$
<!-- proof-end -->

したがって固定した $T$ において、**累積したTaylor残差は $O(\tau)$** です。これは[PDE弱形式](#thm-otr23-weak-step)の右辺を時間で足す準備になります。ただし、$\bar\mu_\tau$ の極限の存在、非線形な相互作用項の極限交換、エネルギーの下半連続性、極限の一意性はまだ調べていません。次講OTR24に進む前に、以下の演習で誤差・符号・仮定を手計算してください。

## 6. 演習：最適性条件から弱方程式まで

### OTR23-A01 一次元の押し出しと質量
- Level: A

$\rho$ を有限二次モーメントと有限エントロピーを持つ確率密度、$\xi\in C_c^\infty(\mathbb R)$ とする。$S_\varepsilon(x)=x+\varepsilon\xi(x)$ で押し出した密度の式とエントロピーの微分係数を導け。

<!-- solution-start -->
**詳細解答**。$|\varepsilon|\|\xi'\|_\infty<1$ なら $S_\varepsilon'=1+\varepsilon\xi'>0$ で、変数変換より $\rho_\varepsilon(S_\varepsilon(x))=\rho(x)/(1+\varepsilon\xi'(x))$ です。これを積分すれば $\int\rho_\varepsilon dz=\int\rho dx=1$ です。対数を取り、積分変数を元へ戻すと

$$
\mathcal H(\rho_\varepsilon)
=\mathcal H(\rho)-\int\rho(x)\log(1+\varepsilon\xi'(x))dx.
$$

積分内の微分係数は $\rho\xi'/(1+\varepsilon\xi')$ で、その絶対値は小さな $\varepsilon$ で $2\|\xi'\|_\infty\rho$ 以下です。従って微分と積分を交換し $\mathcal H'(0)=-\int\rho\xi' dx$ を得ます。
<!-- solution-end -->

### OTR23-A02 最適結合の向きを確かめる
- Level: A

$\nu=\delta_2$、$\mu=\delta_1$、$\xi$ は $x=1$ の近くで1となるコンパクト支持の滑らかな関数とする。$\pi\in\Pi(\mu,\nu)$ として $\iint(x-y)\xi(x)d\pi$ を求め、$\mu_\varepsilon=(\operatorname{id}+\varepsilon\xi)_\#\mu$ の費用を直接展開せよ。

<!-- solution-start -->
**詳細解答**。$\pi=\delta_{(1,2)}$ だから $\iint(x-y)\xi(x)d\pi=(1-2)\cdot1=-1$ です。$\mu_\varepsilon=\delta_{1+\varepsilon}$ で、費用は

$$
W_2^2(\mu_\varepsilon,\nu)=(1+\varepsilon-2)^2
=1-2\varepsilon+\varepsilon^2.
$$

一次係数が $2\iint(x-y)\xi(x)d\pi=-2$ と一致します。$x$ を旧と解釈すると符号を誤ります。
<!-- solution-end -->

### OTR23-A03 Fokker–Planckの符号
- Level: A

$a=1$、$W=0$、$V(x)=\lambda|x|^2/2$、$\lambda>0$ とする。[弱いPDE一歩](#thm-otr23-weak-step)の右辺の主部を書き、対応する密度の方程式を示せ。

<!-- solution-start -->
**詳細解答**。$\nabla V(x)=\lambda x$ なので、任意の $\varphi\in C_c^\infty$ の主部は

$$
\int(\Delta\varphi-\lambda x\cdot\nabla\varphi)\rho(x)dx.
$$

[OTR17の弱い連続の方程式](../OTR17/index.md#def-otr17-measure-weak)と同様に、空間の試験関数に対する分布微分を使います。すなわち、密度 $\rho$ の古典微分を仮定せず

$$
\langle\Delta\rho,\varphi\rangle
=\int\rho\,\Delta\varphi\,dx,\qquad
\langle\nabla\cdot(x\rho),\varphi\rangle
=-\int x\rho\cdot\nabla\varphi\,dx
$$

と定義します（$\rho$ が十分滑らかなら通常の部分積分と一致します）。従って $\partial_t\rho=\Delta\rho+\lambda\nabla\cdot(x\rho)$ を**分布の意味で**得ます。外場項は正の発散として現れます。
<!-- solution-end -->

### OTR23-A04 二次Taylor誤差の係数
- Level: A

$d=1$、$\varphi(x)=x^2$ とし、任意の二点 $x,y$ について $\varphi(x)-\varphi(y)$ を $\varphi'(x)(x-y)$ と残差の和へ分けよ。残差の符号と大きさを求めよ。

<!-- solution-start -->
**詳細解答**。平方差を $x$ の周りで展開すると

$$
x^2-y^2=2x(x-y)-(x-y)^2.
$$

一次項は $2x(x-y)$、残差は $-(x-y)^2$ です。$\varphi''=2$ なので、[Taylor誤差評価](#thm-otr23-weak-step)に現れる係数は

$$
\frac12\|\varphi''\|_\infty=1
$$

であり、残差の絶対値は上界と一致します。$\varphi=x^2$ は $C_c^\infty$ ではありませんが、この**二点間の代数恒等式**は任意の二点で成立し、有限二次モーメントの結合で積分できます。
<!-- solution-end -->

### OTR23-A05 一歩の距離の最大値
- Level: A

$\mathcal F\ge m$、$\mathcal F(\mu^0)-m=E_0$ のJKO反復で $a_k=W_2(\mu^k,\mu^{k-1})$ とする。$\max_{1\le k\le N}a_k$ の上界を $\tau,E_0$ で示せ。

<!-- solution-start -->
**詳細解答**。[離散エネルギー評価](../OTR22/index.md#prop-otr22-energy)を足すと $\sum_ka_k^2/(2\tau)\le E_0$ です。各 $a_k^2$ は非負なので $a_k^2\le\sum_ja_j^2\le2\tau E_0$、従って $\max_ka_k\le\sqrt{2\tau E_0}$ です。$\tau\to0$ で一歩の距離は0になりますが、これだけでは差商 $a_k/\tau$ が有界とは言えません。
<!-- solution-end -->

### OTR23-B01 相互作用の係数を導く
- Level: B

$d=1$、$W(z)=\kappa z^2/2$、$\kappa\ge0$ とし、$\mu$ の平均を $m$ とする。押し出し変分に沿う相互作用エネルギーの微分を、二重積分を展開して求めよ。

<!-- solution-start -->
**詳細解答**。$W(x-y)=\kappa(x-y)^2/2$ なので $\mathcal W(\mu_\varepsilon)$ は

$$
\frac\kappa4\iint[(x-y)+\varepsilon(\xi(x)-\xi(y))]^2d\mu(x)d\mu(y)
$$

です。微分すると $\frac\kappa2\iint(x-y)(\xi(x)-\xi(y))d\mu(x)d\mu(y)$ です。$x,y$ を交換すると二番目の積分は一番目の負なので、差は二倍となり

$$
\mathcal W'(0)=\kappa\iint(x-y)\xi(x)d\mu(x)d\mu(y)
=\kappa\int(x-m)\xi(x)d\mu(x).
$$

$\nabla(W*\rho)(x)=\kappa(x-m)$ と一致します。係数 $1/2$ の取り忘れがないことを二重積分で確認しました。
<!-- solution-end -->

### OTR23-B02 積分された弱残差
- Level: B

$\mathcal F\ge m$、$\mathcal F(\mu^0)-m=E_0<\infty$、$N\tau\le T$ とする。全てのステップで[弱いPDE一歩](#thm-otr23-weak-step)が成り立つ場合、$\varphi\in C_c^\infty$ について最初と最後の積分差の式を書き、残差が $\tau\to0$ で消えることを証明せよ。

<!-- solution-start -->
**詳細解答**。各 $k$ について$\nu=\mu^{k-1}$、$\mu=\mu^k$ を代入して足し、左辺を望遠和にすると

$$
\begin{aligned}
\int\varphi\,d\mu^N-\int\varphi\,d\mu^0
={}&\tau\sum_{k=1}^N\int\bigl[a\Delta\varphi
-\nabla\varphi\cdot(\nabla V+\nabla(W*\rho^k))\bigr]d\mu^k\\
&+\sum_{k=1}^NR_k(\varphi).
\end{aligned}
$$

残差の絶対値は各 $k$ で $\|D^2\varphi\|_\infty a_k^2/2$ 以下です。[散逸の望遠和](#thm-otr23-interpolation-estimate)により $\sum_ka_k^2\le2\tau E_0$ なので、総残差は $\tau E_0\|D^2\varphi\|_\infty\to0$ です。ただし主部の和が特定の関数の積分へ収束するかは、この計算からは出てきません。
<!-- solution-end -->

### OTR23-B03 Gaussianが全候補より良い理由
- Level: B

$\nu=N(m,s^2)$、$s>0$ とする。任意の密度を持つ候補 $\mu$ の平均を $M$、標準偏差を $r>0$ として、二次輸送距離とエントロピーの下界をそれぞれ導き、Gaussianで二つとも等号になることを示せ。

<!-- solution-start -->
**詳細解答**。任意の結合 $(X,Y)$ について、二乗を展開して平均と共分散に分けると

$$
E[(X-Y)^2]
=(M-m)^2+r^2+s^2-2E[(X-M)(Y-m)].
$$

中心化した確率変数に[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を適用すれば共分散は $rs$ 以下なので、

$$
W_2^2(\mu,\nu)\ge(M-m)^2+(r-s)^2.
$$

$\mu=N(M,r^2)$ なら、$Z\sim N(0,1)$ に対して $X=M+rZ$、$Y=m+sZ$ と取れます。両成分が $Z$ の増加関数であるため、[一次元の分位点公式](../OTR11/index.md#thm-otr11-quantile-formula)によりこの結合は最適です。その費用は上の下界に等しくなります。

次に $g_{M,r}$ をそのGaussian密度として $D(\mu\Vert g_{M,r}dx)\ge0$ を展開します。$\int(x-M)^2d\mu=r^2$ より

$$
D(\mu\Vert g_{M,r}dx)=\int\rho\log\rho\,dx
+\frac12\log(2\pi r^2)+\frac12.
$$

従って $\mathcal H(\mu)\ge-\frac12\log(2\pi e r^2)$ で、等号は密度比が1、すなわち $\mu=N(M,r^2)$ のときに限ります。二つの下界を同時に実現する候補なので、平均と分散を固定した全候補の中でGaussianが最良です。
<!-- solution-end -->

### OTR23-B04 区間内の速さとHölder評価
- Level: B

$N$ 個のJKOステップがあって $a_k=W_2(\mu^k,\mu^{k-1})$、$\sum a_k^2/\tau\le2E_0$ とする。測地線補間の $s<t$ 間の距離評価を、各刻み内の滞在時間 $\ell_k$ を用いて証明せよ。

<!-- solution-start -->
**詳細解答**。区間 $((k-1)\tau,k\tau]$ で測地線の速度は $a_k/\tau$ です。$[s,t]$ がその区間内に占める長さを $\ell_k$ とすると、その区間内の移動距離は $\ell_ka_k/\tau$ です。隣接区間の端点は同じ測度なので、距離の三角不等式を順に適用して $W_2(\widetilde\mu_\tau(s),\widetilde\mu_\tau(t))\le\sum\ell_ka_k/\tau$ です。

$$
\begin{aligned}
\left(\sum_k\frac{\ell_k}{\tau}a_k\right)^2
&\le\left(\sum_k\frac{\ell_k^2}{\tau}\right)
\left(\sum_k\frac{a_k^2}{\tau}\right)\\
&\le\sum_k\ell_k\cdot2E_0=2E_0(t-s).
\end{aligned}
$$

最後の不等式は $\ell_k\le\tau$ によります。平方根を取って $1/2$-Hölder評価が出ます。これは各刻みでの速度が一様有界であることを意味しません。
<!-- solution-end -->

### OTR23-C01 GaussianのJKO一歩から平均と分散の方程式へ
- Level: C

$\lambda>0$、$\mu^0=N(m_0,s_0^2)$、$s_0>0$ とする。自由エネルギー $\mathcal F(\rho)=\int\rho\log\rho+(\lambda/2)\int x^2\rho$ のJKO一歩を解き、$m_1,s_1$ を求めよ。その関係式から $\tau\downarrow0$ で連続時間のGaussianの平均と分散 $m(t),q(t)$ が従うべき常微分方程式と解を導け。初期値は $m(0)=m_0$、$q(0)=s_0^2$ とする。

<!-- solution-start -->
**詳細解答**。[Gaussianの一歩の命題](#prop-otr23-gaussian-step)で旧平均 $m=m_0$、旧標準偏差 $s=s_0$ とすると、一意の最小化解は $N(m_1,s_1^2)$ で

$$
m_1=\frac{m_0}{1+\lambda\tau},\qquad
s_1=\frac{s_0+\sqrt{s_0^2+4\tau(1+\lambda\tau)}}{2(1+\lambda\tau)}.
$$

導出を確認すると、任意の候補について相対エントロピーと共分散の[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)から目的関数は $G(M,r)$ 以上です。Gaussianはその下界を達成し、$\partial_MG=\lambda M+(M-m_0)/\tau=0$、$\partial_rG=-1/r+\lambda r+(r-s_0)/\tau=0$ が厳密凸な $G$ の一意の最小点を決めます。後者に $\tau r$ を掛けると $(1+\lambda\tau)r^2-s_0r-\tau=0$ です。

停留条件を差分へ戻すと $(m_1-m_0)/\tau=-\lambda m_1$、$(s_1-s_0)/\tau=1/s_1-\lambda s_1$ です。この後退差分に対応する連続式は $m'=-\lambda m$、$s'=1/s-\lambda s$ です。$q=s^2$ として連鎖律を適用すると

$$
q'=2ss'=2s\left(\frac1s-\lambda s\right)=2-2\lambda q.
$$

第一式の解は $m(t)=m_0e^{-\lambda t}$。第二式は $q'+2\lambda q=2$ に積分因子 $e^{2\lambda t}$ を掛け、$(e^{2\lambda t}q)'=2e^{2\lambda t}$ を積分して

$$
q(t)=\frac1\lambda+\left(s_0^2-\frac1\lambda\right)e^{-2\lambda t}.
$$

これはGaussianのFokker–Planck方程式に対応するパラメータの解です。差分の一致は導けましたが、反復列全体の収束をこの解答だけで証明したものではありません。
<!-- solution-end -->

### OTR23-C02 二次外場だけのJKOでTaylor残差を実測する
- Level: C

$d=1$、$\lambda>0$、$\mathcal F(\mu)=\frac\lambda2\int x^2d\mu$、$\mu^0\in\mathcal P_2(\mathbb R)$ で $M_2(\mu^0)=M>0$ とする。拡散項を含まないこのエネルギーのJKO反復について、次を計算せよ。

1. 一歩の最適輸送写像。
2. 試験関数 $\varphi(x)=x^2$ に対する一次項と残差。
3. $t=k\tau$ を固定して $\tau\downarrow0$ ときの二次モーメント。

<!-- solution-start -->
**詳細解答**。$c=1+\lambda\tau$ と置きます。[OTR22の二次外場の一歩](../OTR22/index.md#prop-otr22-quadratic)から $\mu^k=(c^{-k}\operatorname{id})_\#\mu^0$ です。新しい位置 $x$ から古い位置 $y$ へ向かう最適写像は $T(x)=cx$ で、$(x-y)/\tau=-\lambda x$ です。$M_k:=\int x^2d\mu^k=c^{-2k}M$ と書きます。

$\varphi(x)=x^2$ はコンパクト支持ではないため、[弱いPDE一歩の定理](#thm-otr23-weak-step)をそのまま援用しません。ここでは有限二次モーメントがあるので、二点恒等式

$$
x^2-y^2=2x(x-y)-(x-y)^2
$$

を直接最適結合で積分できます。$y=(1+\lambda\tau)x$ を代入すると一次項は $2x(x-y)=-2\lambda\tau x^2$、残差は $-(x-y)^2=-\lambda^2\tau^2x^2$ です。$\mu^k$ で積分してそれぞれ $-2\lambda\tau M_k$、$-\lambda^2\tau^2M_k$ を得ます。ゆえに

$$
\frac{M_k-M_{k-1}}\tau
=-2\lambda M_k-\lambda^2\tau M_k.
$$

実際 $M_{k-1}=c^2M_k$ なので左辺は $-(c^2-1)M_k/\tau=-(2\lambda+\lambda^2\tau)M_k$ です。残差の絶対値は $W_2^2(\mu^k,\mu^{k-1})=\lambda^2\tau^2M_k$ と一致し、Taylor上界が等号で成立します。

$t=k\tau$ を固定すると $M_k=M(1+\lambda\tau)^{-2t/\tau}$ です。$\lim_{\tau\downarrow0}\log(1+\lambda\tau)/\tau=\lambda$ より $M_k\to Me^{-2\lambda t}$ です。これは輸送方程式 $\partial_t\rho=\lambda\partial_x(x\rho)$ の二次モーメント方程式 $M_2'=-2\lambda M_2$ と一致します。エントロピーを含まない例なので、この解答だけで熱方程式の極限は証明されません。
<!-- solution-end -->

## 7. 一歩から連続時間へ渡す宿題

ここまでで、位置の押し出しによるJKOの停留条件、試験関数に対する弱いPDE一歩、そして $W_2$ 時間補間と累積誤差 $O(\tau)$ を証明しました。いずれも**各刻みの最小化解が存在することを前提**とする結果であり、極限の存在・一意性は含みません。

次の問いは、刻み $\tau$ によらないコンパクト性を使って補間列の極限を選び、その極限へ弱い方程式を渡せるか、さらに極限を一意にできるかです。それがOTR24の主題になります。
