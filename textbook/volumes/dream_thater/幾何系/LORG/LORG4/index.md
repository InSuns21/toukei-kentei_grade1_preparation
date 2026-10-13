# LORG4 Lorentz接続と測地線

<!-- definition-example-audit: strict -->

## 1. 曲線の「まっすぐ」を曲がった時空で判定する

[LORG3で定義したLorentz長さ](../LORG3/index.md#def-lorg3-lorentz-length)から、Minkowski時空では時間的直線が最大固有時を与えることを確かめました。しかし一般の時空では、離れた二点の接空間をそのまま同一視できません。曲線の速度が「変化しない」とは何かを記述するには、接ベクトルを曲線に沿って比較する規則が要ります。

[GEO13のアフィン接続](../../GEO/GEO13/index.md#def-geo13-affine-connection)はその規則を与えます。Riemann計量で使ったLevi-Civita接続の作り方は、どこまでLorentz計量へ持ち込めるでしょうか。鍵は **正定値性ではなく非退化性** です。この違いをKoszulの式から見直し、測地線と指数写像を作ります。固有時の**局所最大化**は次のLORG5で、凸正規近傍を準備してから扱います。

断らない限り $(M,g)$ は滑らかな連結・Hausdorff・第二可算・境界なしの時間向き付きLorentz多様体で、次元は $n+1$（$n\ge1$）、符号は $(-,+,\ldots,+)$ です。曲線のパラメータは断りなく固有時とは限らず、測地線ではアフィンパラメータを用います。

## 2. 正定値でなくてもLevi-Civita接続は作れる

[GEO13の接続の捩率](../../GEO/GEO13/index.md#def-geo13-torsion)が零で、計量に両立する接続を探します。$\nabla g=0$ とは、内積を曲線に沿って微分したときに通常の積の微分則が成立することです。$g(v,v)$ が負や零でも、この積の微分則自体には問題がありません。

<a id="thm-lorg4-lorentz-levi-civita"></a>

<!-- formal-statement-start -->
> **定理（Lorentz計量のLevi-Civita接続とKoszul表示）**  
> 滑らかなLorentz計量 $g$ を持つ滑らかな多様体 $M$ には、$g$ に両立し、捩率のないアフィン接続 $\nabla$ がただ一つ存在する。任意の滑らかなベクトル場 $X,Y,Z$ に対して、接続は次の式で一意に決まる。

$$
\begin{aligned}
2g(\nabla_XY,Z)
={}&Xg(Y,Z)+Yg(Z,X)-Zg(X,Y)\\
&-g(X,[Y,Z])+g(Y,[Z,X])+g(Z,[X,Y]).
\end{aligned}
$$

> この接続をLorentz計量の **Levi-Civita接続** と呼ぶ。存在・一意性に計量の正定値性は不要であり、各接空間での非退化性を用いる。
<!-- formal-statement-end -->

[GEO13のKoszulの公式](../../GEO/GEO13/index.md#thm-geo13-koszul)と構造が同じでも、Riemann計量の証明から「正定値だから」という部分を無条件に転用してはいけません。どこで何を使うかを追います。

### 証明の見取り図

計量両立性の式を $X,Y,Z$ の順序で三つ作り、捩率零から $\nabla_XY-\nabla_YX=[X,Y]$ と交換すれば右辺が現れます。右辺は第3引数 $Z$ に関して各点で線形なので、非退化な双線形形式 $g_p$ を使って $\nabla_XY$ を一意に復元します。局所座標で復元した係数が滑らかで、実際に捩率零・計量両立を満たすことまで検証します。

<!-- proof-start -->
### 証明

**一意性**。計量両立性から三つの積の微分則を得ます。

$$
\begin{aligned}
Xg(Y,Z)&=g(\nabla_XY,Z)+g(Y,\nabla_XZ),\\
Yg(Z,X)&=g(\nabla_YZ,X)+g(Z,\nabla_YX),\\
Zg(X,Y)&=g(\nabla_ZX,Y)+g(X,\nabla_ZY).
\end{aligned}
$$

上二式の和から下式を引き、捩率零を使って

$$
\nabla_YX=\nabla_XY-[X,Y],\quad
\nabla_ZY=\nabla_YZ+[Z,Y],\quad
\nabla_ZX=\nabla_XZ+[Z,X]
$$

と置き換えます。$\nabla_XZ$ と $\nabla_YZ$ の項が打ち消し合い、定理のKoszul式を得ます。従って同じ二条件を満たす二つの接続は、すべての $Z$ に対し $g(\nabla_XY-\widetilde\nabla_XY,Z)=0$ を満たします。非退化性により差は零です。

**存在**。局所座標 $(x^0,\ldots,x^n)$ で $g_{ij}=g(\partial_i,\partial_j)$ とします。非退化なので逆行列 $(g^{ij})$ が存在し、滑らかです。次の係数を定めます。

$$
\Gamma^k_{ij}
=\frac12\sum_{\ell=0}^n g^{k\ell}
\bigl(\partial_i g_{j\ell}+\partial_j g_{i\ell}-\partial_\ell g_{ij}\bigr).
$$

これを $\nabla_{\partial_i}\partial_j=\Gamma^k_{ij}\partial_k$ として、一般のベクトル場には接続のLeibniz則で拡張します。右辺は滑らかで、$\Gamma^k_{ij}=\Gamma^k_{ji}$ ですから座標基底で捩率は零です。捩率はテンソルなので任意のベクトル場でも零になります。

計量両立性は、逆行列を掛け直すと

$$
g_{\ell k}\Gamma^k_{ij}
=\frac12\bigl(\partial_i g_{j\ell}+\partial_j g_{i\ell}-\partial_\ell g_{ij}\bigr)
$$

であり、この式と $i,j$ のうち $j,\ell$ の交換式を足して

$$
g_{\ell k}\Gamma^k_{ij}+g_{jk}\Gamma^k_{i\ell}
=\partial_i g_{j\ell}
$$

を得ます。これは $(\nabla_{\partial_i}g)(\partial_j,\partial_\ell)=0$ です。テンソル性により $\nabla g=0$ が従います。

最後に、座標が重なる領域では、両座標で作った接続は二条件を満たすので、先に示した一意性から一致します。従って局所構成は大域的な接続へ貼り合わされます。ここで必要だったのは $g_{ij}$ の**可逆性**であり、正定値性ではありません。$\square$
<!-- proof-end -->

### 2.1 定理の直接例：Minkowski計量

$\eta=-dt^2+dx^2$ では行列 $(\eta_{ij})=\operatorname{diag}(-1,1)$ は非退化ですが正定値ではありません。成分は定数なので $\partial_k\eta_{ij}=0$、よって上の係数公式ですべての $\Gamma^k_{ij}=0$ です。例えば $X=\partial_t$、$Y=\partial_x$ なら $\nabla_XY=0$ です。

これは「曲がっていないからゼロ」という印象論ではなく、**非退化→逆行列がある→成分微分がゼロ**という定義の検証です。一方、座標を曲線的に取り直すと平坦でもChristoffel係数が消えるとは限りません。係数はテンソルではなく、接続を座標表示したものです。

## 3. 計量を見て接続係数を計算する

$1+1$ 次元の静的な模型を取りましょう。

$$
M=\mathbb R^2,\qquad g=-e^{2x}dt^2+dx^2.
$$

$\partial_t$ はどこでも時間的で未来向きに選べます。計量行列と逆行列は

$$
(g_{ij})=\begin{pmatrix}-e^{2x}&0\\0&1\end{pmatrix},
\qquad
(g^{ij})=\begin{pmatrix}-e^{-2x}&0\\0&1\end{pmatrix}.
$$

唯一の非零の計量成分微分は $\partial_xg_{tt}=-2e^{2x}$ です。従って

$$
\begin{aligned}
\Gamma^t_{tx}=\Gamma^t_{xt}
&=\tfrac12g^{tt}\partial_xg_{tt}
=\tfrac12(-e^{-2x})(-2e^{2x})=1,\\
\Gamma^x_{tt}
&=-\tfrac12g^{xx}\partial_xg_{tt}
=e^{2x}.
\end{aligned}
$$

他の成分は零です。この計算の途中で、$g^{tt}$ の**負号**を落とすとすべてが壊れます。検算として $\nabla_xg_{tt}=\partial_xg_{tt}-2\Gamma^t_{xt}g_{tt}=-2e^{2x}+2e^{2x}=0$ です。

## 4. 測地線方程式と因果型の保存

[GEO14の測地線の定義](../../GEO/GEO14/index.md#def-geo14-geodesic)では、速度が自身に沿って平行である曲線を測地線と呼びます。これは「最短曲線」の定義ではありません。Lorentz幾何では、時間的測地線・光的測地線・空間的測地線の三種を区別し、長さの極値性は別途証明します。

<a id="prop-lorg4-geodesic-causal-type"></a>

<!-- formal-statement-start -->
> **命題（Lorentz測地線方程式と因果型保存）**  
> 時間向き付きLorentz多様体 $(M,g)$ のLevi-Civita接続について、$C^2$ 曲線 $\gamma(s)=(x^0(s),\ldots,x^n(s))$ がアフィンパラメータの測地線である必要十分条件は、すべての $k$ に対し

$$
\ddot x^k+\sum_{i,j=0}^n\Gamma^k_{ij}(x)\dot x^i\dot x^j=0
$$

> が成立することである。そのとき $g(\dot\gamma,\dot\gamma)$ は定数である。初速度が非零なら全速度は非零であり、初速度が時間的・光的・空間的のどれかという分類は変わらない。未来向きの因果的初速度は、存在区間全体で未来向き因果的なままである。
<!-- formal-statement-end -->

### 証明の見取り図

[GEO13の曲線に沿う共変微分](../../GEO/GEO13/index.md#def-geo13-curve-covariant-derivative)を速度自身へ適用すると二階ODEになります。計量両立性から自己内積の微分が零になり、初速度から因果型が固定されます。時間向きは連続性によって飛び越せません。

<!-- proof-start -->
### 証明

速度は $\dot\gamma=\dot x^j\partial_j$ です。曲線に沿う共変微分を座標展開すると

$$
\begin{aligned}
D_s\dot\gamma
&=\frac{d\dot x^k}{ds}\partial_k+
 \dot x^i\dot x^j\nabla_{\partial_i}\partial_j\\
&=\bigl(\ddot x^k+\Gamma^k_{ij}(x)\dot x^i\dot x^j\bigr)\partial_k.
\end{aligned}
$$

座標基底が線形独立なので $D_s\dot\gamma=0$ と表示したODEは同値です。次に計量両立性を $V=W=\dot\gamma$ へ使うと

$$
\frac{d}{ds}g(\dot\gamma,\dot\gamma)
=g(D_s\dot\gamma,\dot\gamma)+g(\dot\gamma,D_s\dot\gamma)=0.
$$

従って自己内積は初期値に等しい定数です。もし途中で速度が零なら、測地線ODEの初期値 $(\gamma,\dot\gamma)=(p,0)$ の一意性によりその曲線は定値曲線となり、非零初速度に矛盾します。時間的・光的・空間的という三分類は自己内積の符号と非零性から固定されます。

最後に、初速度が未来向き因果的なら速度は連続した非零因果ベクトルです。[時間向きの定義](../LORG2/index.md#def-lorg2-time-orientation)により未来錐と過去錐は局所的に分離しているので、連続な速度が零や空間的方向を経ずに未来から過去へ移ることはできません。$\square$
<!-- proof-end -->

### 4.1 具体例：静的座標の「静止」は測地線とは限らない

第3節の $g=-e^{2x}dt^2+dx^2$ で測地線方程式を書けば

$$
\ddot t+2\dot t\dot x=0,\qquad
\ddot x+e^{2x}\dot t^2=0.
$$

$x(s)=x_0$、$t(s)=s$ の曲線は $\dot x=\ddot x=0$ なのに、第二式左辺が $e^{2x_0}>0$ です。**時間軸に平行でも測地線ではありません**。端点を結ぶ時間的曲線であることと、自由な測地運動であることを混同できません。

逆に初期値 $(t,x,\dot t,\dot x)=(0,0,1,0)$ の測地線では、第二式から $\ddot x(0)=-1$ であり、初めから空間方向の加速度が現れます。それでも $g(\dot\gamma,\dot\gamma)=-1$ が一定で、$\dot t>0$ の時間的速度を保ちます。

### 4.2 アフィンパラメータに限る理由

同じ測地線の像を非線形の速さでたどっても、通常は測地線方程式を満たしません。元のアフィンパラメータを $s=\phi(u)$ に取り直すと、曲線に沿う微分の積の法則から

$$
D_u\frac{d\gamma(\phi(u))}{du}
=\phi''(u)\,\dot\gamma(\phi(u))
+(\phi'(u))^2D_s\dot\gamma(\phi(u)).
$$

$\gamma$ が非定数測地線なら第二項は零です。$\phi'>0$ の $C^2$ 再パラメータ化について、新しい曲線も測地線となるのは $\phi''=0$ のとき、すなわち $\phi(u)=au+b$（$a>0$）の場合に限ります。[LORG3のLorentz長さの再パラメータ化不変性](../LORG3/index.md#thm-lorg3-reparam-invariance)はより広い取り直しを許します。**長さの不変性**と**アフィンな測地線条件**は別の主張です。

## 5. 平行移動でも光円錐は保たれる

[GEO13の平行移動の存在一意性](../../GEO/GEO13/index.md#thm-geo13-parallel-existence)は接続係数による線形常微分方程式から得られます。Lorentz計量でもその存在一意性は同じですが、保存するものは正定値のノルムではなく不定符号の内積です。

<a id="prop-lorg4-parallel-causal-cone"></a>

<!-- formal-statement-start -->
> **命題（Lorentz平行移動による内積・未来錐の保存）**  
> $(M,g)$ を時間向き付きLorentz多様体、$\sigma:[a,b]\to M$ を区分的 $C^1$ 曲線とする。Levi-Civita接続の平行移動 $P^\sigma_{a\to b}:T_{\sigma(a)}M\to T_{\sigma(b)}M$ は線形同型で、

$$
g_{\sigma(b)}(P^\sigma_{a\to b}v,P^\sigma_{a\to b}w)
=g_{\sigma(a)}(v,w)
$$

> を満たす。非零の未来向き因果ベクトルは非零の未来向き因果ベクトルに写される。
<!-- formal-statement-end -->

### 証明の見取り図

平行な場 $V,W$ の内積は定数です。初期値を任意に取れることと逆向きの平行移動を合わせて同型性を得ます。未来・過去の区別は曲線に沿った連続性で保たれます。

<!-- proof-start -->
### 証明

各滑らかな区分で $D_sV=D_sW=0$ だから

$$
\frac d{ds}g(V,W)=g(D_sV,W)+g(V,D_sW)=0.
$$

区分の端点では平行場が連続なので、各区分での定数値は全曲線を通じ一致します。線形ODEの解の一意性から $P^\sigma_{a\to b}$ は線形で、逆写像は曲線を逆にたどる平行移動です。よって線形同型です。

$V(a)=v$ が非零因果的なら内積保存と同型性から各点の $V(s)$ も零ではなく $g(V(s),V(s))\le0$ です。局所的な未来向き時間的場 $T$ を取り、非零因果 $V$ に対する $g(T,V)$ の符号で向きを判定します。[LORG2の未来判定](../LORG2/index.md#lem-lorg2-timelike-sign)よりその値は零になりません。$T,V$ は連続なので符号は近傍で変わらず、曲線全体で未来向きが保たれます。$\square$
<!-- proof-end -->

この命題が意味するのは、**接続に沿って錐の分類を運べる**ことです。平行移動が異なる経路で一致する、と主張しているわけではありません。曲率があると経路依存が起こります。

## 6. 指数写像：初速度から到達点を作る

測地線を定める二階方程式は、位置と速度を組にすると一階常微分方程式になります。[GEO14の測地線局所存在一意性](../../GEO/GEO14/index.md#thm-geo14-geodesic-existence)で用いたこの方法は、接続係数が滑らかなら正定値性と無関係です。

<a id="prop-lorg4-lorentz-exponential"></a>

<!-- formal-statement-start -->
> **命題（Lorentz測地線の局所存在と指数写像の局所可逆性）**  
> 滑らかなLorentz多様体 $(M,g)$、点 $p\in M$、初速度 $v\in T_pM$ に対し、$\gamma(0)=p,\ \dot\gamma(0)=v$ を満たす一意な最大測地線が局所的に存在し、初期値に滑らかに依存する。時刻 $1$ まで解が存在する初速度の開集合 $D_p\subset T_pM$ 上で

$$
\exp_p(v)=\gamma_v(1)
$$

> と定めると、$0\in D_p$、$\exp_p(0)=p$、$(d\exp_p)_0=\operatorname{id}_{T_pM}$ が成り立つ。従って $0$ の開近傍 $U\subset D_p$ があり、$\exp_p|_U$ は $p$ の開近傍への微分同相写像である。ここでは測地線の長さの極値性や大域的単射性を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

ODEの右辺は滑らかなので初期値問題が解け、解は初期値に滑らかに依存します。アフィンなスケーリングから $\gamma_v(s)=\exp_p(sv)$ を得ます。$s=0$ で微分すると $d\exp_p|_0$ は恒等写像となり、逆写像定理が適用できます。

<!-- proof-start -->
### 証明

座標で位置 $x^k$ と速度 $v^k$ を組に取り、

$$
\frac{dx^k}{ds}=v^k,\qquad
\frac{dv^k}{ds}=-\Gamma^k_{ij}(x)v^iv^j
$$

と書きます。右辺は $x,v$ に関して滑らかなので、局所ODEの存在一意性と初期値に関する滑らかな依存が成立します。最大存在区間は初期時刻の近傍を含みます。$v=0$ なら定数解 $\gamma_0(s)=p$ がすべての $s$ で存在します。解の連続依存と区間 $[0,1]$ のコンパクト性を使えば、零速度の近くでは時刻 $1$ まで解が存在します。一般に時刻 $1$ まで存在する初期値の集合 $D_p$ も開です。

$\gamma_v(s)$ が存在する範囲で $\widetilde\gamma(u)=\gamma_v(au)$ と置くと

$$
\widetilde\gamma(0)=p,\qquad
\widetilde\gamma'(0)=av,\qquad
D_u\widetilde\gamma'=a^2D_s\dot\gamma=0.
$$

一意性により $\gamma_{av}(u)=\gamma_v(au)$ です。とくに $s$ が十分小さければ $\exp_p(sv)=\gamma_v(s)$ です。座標表示の微分を $s=0$ で評価すると

$$
(d\exp_p)_0(v)
=\left.\frac d{ds}\right|_{s=0}\exp_p(sv)
=\dot\gamma_v(0)=v.
$$

接空間を局所座標で同一視すると微分は恒等行列です。よって逆写像定理から $0$ の近くで $\exp_p$ は微分同相です。$\square$
<!-- proof-end -->

### 6.1 定義に戻る例と、失敗する大域化

Minkowski時空では $\Gamma^k_{ij}=0$ なので、初期値 $(p,v)$ に対する測地線は $\gamma_v(s)=p+sv$ です。従って $\exp_p(v)=p+v$ がすべての $v$ で成立し、大域的に一対一です。

一方、$M=\mathbb R_t\times S^1_\theta$ と $g=-dt^2+d\theta^2$（$\theta$ は周期 $2\pi$）を考えます。局所座標で接続係数は零、測地線は

$$
\gamma_v(s)=(t_0+as,\ \theta_0+bs\pmod{2\pi})
$$

です。$v=(0,0)$ と $w=(0,2\pi)$ は異なる初速度ですが

$$
\exp_p(v)=p=\exp_p(w).
$$

**非退化・滑らかな計量と局所微分同相性だけでは指数写像の大域単射性は出ません**。この反例では局所逆写像を大域へ延長する際の単射性が破綻します。

さらに $M=\{(t,x):t>0\}$ にMinkowski計量を制限すると、$\gamma(s)=(1-s,0)$（$s<1$）は測地線ですが、$s=1$ に時空内の極限点がないので延長できません。滑らかな非退化計量でも測地完備性は保証されません。Riemann幾何の[Hopf--Rinowの定理](../../GEO/GEO15/index.md#thm-geo15-hopf-rinow)をLorentz計量へそのまま移すことはできないのです。

## 7. 演習：係数・因果型・パラメータを使い分ける

全問題で指定がなければ接続はLevi-Civita接続、測地線のパラメータはアフィンです。$1+1$ 次元で未来は $\partial_t$ 方向とします。

### Level A

<a id="ex-lorg4-a01"></a>
#### LORG4-A01 定数計量の接続
- Level: A

$\mathbb R^{1+1}$ に $g=-4dt^2+9dx^2$ を入れる。(1) Levi-Civita接続の全Christoffel係数を求めよ。(2) $(t,x)=(1+2s,3-s)$ が測地線か判定し、速度の因果型を答えよ。

<!-- solution-start -->
**詳細解答**。$g_{tt}=-4,\ g_{xx}=9,\ g_{tx}=0$ は定数なので、係数公式の三つの偏微分はすべて零です。従って $\Gamma^k_{ij}=0$ です。曲線の二階導関数は $(\ddot t,\ddot x)=(0,0)$ なので[測地線方程式](#prop-lorg4-geodesic-causal-type)を満たします。速度は $(2,-1)$、自己内積は

$$
g(\dot\gamma,\dot\gamma)=-4(2)^2+9(-1)^2=-7<0.
$$

$\dot t=2>0$ なので未来向き時間的です。座標上で $(2,-1)$ が長さ $\sqrt5$ であることは、Lorentzの因果型と無関係です。
<!-- solution-end -->

<a id="ex-lorg4-a02"></a>
#### LORG4-A02 静的計量の符号
- Level: A

$g=-e^{2x}dt^2+dx^2$ の非零Christoffel係数を求め、$\sigma(s)=(s,0)$ が時間的かつ測地線でないことを示せ。

<!-- solution-start -->
**詳細解答**。$g^{tt}=-e^{-2x}$、$\partial_xg_{tt}=-2e^{2x}$ なので

$$
\Gamma^t_{tx}=\Gamma^t_{xt}
=\tfrac12(-e^{-2x})(-2e^{2x})=1,\quad
\Gamma^x_{tt}=-\tfrac12(1)(-2e^{2x})=e^{2x}.
$$

他は零です。$\sigma'(s)=(1,0)$ は $g(\sigma',\sigma')=-e^0=-1$、$\dot t>0$ なので未来向き時間的です。しかし $\sigma''=0$ に対し $x$ 成分の測地線方程式は $0+e^0(1)^2=1\ne0$ です。因果曲線である条件と測地線である条件は別です。
<!-- solution-end -->

<a id="ex-lorg4-a03"></a>
#### LORG4-A03 膨張する空間の係数
- Level: A

$g=-dt^2+a(t)^2dx^2$（$a(t)>0$ は滑らか）について、非零Christoffel係数を $a,a'$ で示せ。また $\gamma(s)=(s,x_0)$ が測地線であることを検算せよ。

<!-- solution-start -->
**詳細解答**。$g^{tt}=-1,\ g^{xx}=a^{-2}$、非零の成分微分は $\partial_tg_{xx}=2aa'$ です。従って

$$
\Gamma^t_{xx}=-\tfrac12g^{tt}\partial_tg_{xx}=aa',
\qquad
\Gamma^x_{tx}=\Gamma^x_{xt}
=\tfrac12a^{-2}(2aa')=\frac{a'}a.
$$

$a'=0$ の点では表示した係数も零で、計量の他の係数は零です。$\gamma$ は $\dot t=1,\dot x=0,\ddot t=\ddot x=0$ であり、$t$ 式の接続項は $aa'(\dot x)^2=0$、$x$ 式は $2(a'/a)\dot t\dot x=0$ です。[測地線方程式](#prop-lorg4-geodesic-causal-type)が成立します。
<!-- solution-end -->

<a id="ex-lorg4-a04"></a>
#### LORG4-A04 時計の付け替えと測地線
- Level: A

Minkowski時空で $\gamma(s)=(s,0)$ は測地線である。$u>0$ 上で $\widetilde\gamma(u)=\gamma(u^2)$ は測地線か。また $0<u\le1$ でのLorentz長さは幾らか。

<!-- solution-start -->
**詳細解答**。$\widetilde\gamma'(u)=(2u,0)$、$\widetilde\gamma''(u)=(2,0)$ です。Minkowski接続係数は零なので測地線方程式の左辺は $(2,0)\ne0$、よってアフィン測地線ではありません。一方、[Lorentz長さの定義](../LORG3/index.md#def-lorg3-lorentz-length)により

$$
L_\eta(\widetilde\gamma|_{[\varepsilon,1]})
=\int_\varepsilon^1\sqrt{-\eta((2u,0),(2u,0))}\,du
=\int_\varepsilon^1 2u\,du=1-\varepsilon^2.
$$

$\varepsilon\downarrow0$ で長さは $1$ へ近づき、閉区間 $[0,1]$ でも長さは $1$ です。長さの不変性は測地線方程式の不変性を意味しません。
<!-- solution-end -->

<a id="ex-lorg4-a05"></a>
#### LORG4-A05 因果型保存の微分
- Level: A

Lorentz測地線 $\gamma$ について $g(\dot\gamma,\dot\gamma)$ が一定であることを式で証明し、初速度の自己内積が $0$ で非零のとき、途中で時間的速度に変化できるか答えよ。

<!-- solution-start -->
**詳細解答**。Levi-Civita接続は計量両立で、測地線は $D_s\dot\gamma=0$ です。従って積の微分則から

$$
\frac d{ds}g(\dot\gamma,\dot\gamma)
=g(D_s\dot\gamma,\dot\gamma)+g(\dot\gamma,D_s\dot\gamma)=0+0=0.
$$

よって初期値 $0$ が保たれます。さらにODE解の一意性により、非零初速度から出た測地線で速度が零になることはありません。[因果型保存](#prop-lorg4-geodesic-causal-type)の通り、非零光的速度のままで、自己内積が負の時間的速度へ移ることはできません。
<!-- solution-end -->

### Level B

<a id="ex-lorg4-b01"></a>
#### LORG4-B01 静的計量で初期加速度を求める
- Level: B

$g=-e^{2x}dt^2+dx^2$ で $\gamma(0)=(0,0)$、$\dot\gamma(0)=(1,0)$ を満たす測地線を考える。(1) $\ddot t(0),\ddot x(0)$ を求めよ。(2) $x(s)$ の二次Taylor展開を示し、因果型を答えよ。

<!-- solution-start -->
**詳細解答**。第3節のChristoffel係数を[測地線方程式](#prop-lorg4-geodesic-causal-type)へ代入すると

$$
\ddot t=-2\dot t\dot x,\qquad
\ddot x=-e^{2x}(\dot t)^2.
$$

初期値を代入して $\ddot t(0)=-2(1)(0)=0$、$\ddot x(0)=-e^0(1)^2=-1$ です。滑らかなODEの解なのでTaylor展開でき、

$$
x(s)=x(0)+s\dot x(0)+\frac{s^2}{2}\ddot x(0)+O(s^3)
=-\frac{s^2}{2}+O(s^3).
$$

初速度について $g(\dot\gamma(0),\dot\gamma(0))=-1$ です。[因果型保存](#prop-lorg4-geodesic-causal-type)により全存在区間で自己内積は $-1$ です。初期の $\dot t>0$ と時間向きの連続性から未来向き時間的のままです。$\dot x(0)=0$ でも、その後の $x$ が定数にはならないことを二次項が示します。
<!-- solution-end -->

<a id="ex-lorg4-b02"></a>
#### LORG4-B02 膨張模型で光的測地線を構成する
- Level: B

$g=-dt^2+e^{2t}dx^2$、初期値 $(t,x,\dot t,\dot x)=(0,0,1,1)$ とする。$\gamma(s)=(\log(1+s),\,s/(1+s))$（$s>-1$）がアフィン測地線で、未来向き光的であることを直接検証せよ。

<!-- solution-start -->
**詳細解答**。[第4節の係数公式](#thm-lorg4-lorentz-levi-civita)に $a(t)=e^t,\ a'=e^t$ を代入すると、$\Gamma^t_{xx}=e^{2t}$、$\Gamma^x_{tx}=\Gamma^x_{xt}=1$ です。曲線の速度と加速度は

$$
\dot t=\frac1{1+s},\quad
\ddot t=-\frac1{(1+s)^2},\quad
\dot x=\frac1{(1+s)^2},\quad
\ddot x=-\frac2{(1+s)^3}.
$$

$t=\log(1+s)$ なので $e^{2t}=(1+s)^2$ です。測地線の二式へ代入すると

$$
\ddot t+e^{2t}\dot x^2
=-\frac1{(1+s)^2}+\frac{(1+s)^2}{(1+s)^4}=0,
$$

$$
\ddot x+2\dot t\dot x
=-\frac2{(1+s)^3}+\frac2{(1+s)^3}=0.
$$

さらに $g(\dot\gamma,\dot\gamma)=-(1+s)^{-2}+(1+s)^2(1+s)^{-4}=0$、$\dot t>0$ です。従って未来向き光的です。$s=0$ で初期値も指定通りです。
<!-- solution-end -->

<a id="ex-lorg4-b03"></a>
#### LORG4-B03 平坦時空の曲線座標
- Level: B

領域 $r>0$ に $g=-dt^2+dr^2+r^2d\theta^2$ を入れる。(1) 非零Christoffel係数を示せ。(2) $t(s)=s,\ r(s)=r_0+s,\ \theta(s)=0$（$s>-r_0,\ r_0>0$）が未来向き光的測地線であることを確認せよ。

<!-- solution-start -->
**詳細解答**。計量逆行列の $\theta\theta$ 成分は $r^{-2}$、計量の非零偏微分は $\partial_rg_{\theta\theta}=2r$ です。従って

$$
\Gamma^r_{\theta\theta}=-\frac12(2r)=-r,\qquad
\Gamma^\theta_{r\theta}=\Gamma^\theta_{\theta r}=\frac12r^{-2}(2r)=\frac1r,
$$

他は零です。測地線の式は

$$
\ddot t=0,\quad
\ddot r-r\dot\theta^2=0,\quad
\ddot\theta+\frac2r\dot r\dot\theta=0.
$$

指定曲線では $\dot t=\dot r=1,\dot\theta=0$、二階導関数は全て零なので三式が成立します。自己内積は $-1^2+1^2+r^2\cdot0^2=0$、かつ $\dot t=1>0$ なので未来向き光的です。係数が非零でも、測地線を持つ時空が曲率零であり得ます。
<!-- solution-end -->

<a id="ex-lorg4-b04"></a>
#### LORG4-B04 平行移動はどの向きを守るか
- Level: B

時間向き付きLorentz多様体で区分的 $C^1$ 曲線 $\sigma$ に沿って平行なベクトル場 $V,W$ をとる。$V(a)$ は未来向き光的、$W(a)$ は未来向き時間的とする。終点で (1) $g(V,W)$、(2) 二つの因果型と未来向きがどうなるか証明せよ。

<!-- solution-start -->
**詳細解答**。各区分で $D_sV=D_sW=0$ なので、

$$
\frac d{ds}g(V,W)=g(D_sV,W)+g(V,D_sW)=0.
$$

区分の境界では両場が連続だから、全区間で $g(V(s),W(s))=g(V(a),W(a))$ です。特に $g(V,V)=0$、$g(W,W)<0$ が保存されます。[平行移動の存在一意性](../../GEO/GEO13/index.md#thm-geo13-parallel-existence)により非零初期値は零にはなりません。また[LORG2の未来判定](../LORG2/index.md#lem-lorg2-timelike-sign)で使う局所的な時間的場と非零因果ベクトルの内積は零にならないため、連続性から未来向きのままです。従って $V(b)$ は未来向き光的、$W(b)$ は未来向き時間的、混合内積も初期値と一致します。
<!-- solution-end -->

### Level C

<a id="ex-lorg4-c01"></a>
#### LORG4-C01 全平面で滑らかでも光的測地線は不完備になり得る
- Level: C

$\mathbb R^2$ 全体で $g=e^{2t}(-dt^2+dx^2)$ とし、$\partial_t$ を未来とする。

1. 非零Christoffel係数が $\Gamma^t_{tt}=\Gamma^t_{xx}=1$、$\Gamma^x_{tx}=\Gamma^x_{xt}=1$ だけであることを示せ。
2. 初期値 $\gamma(0)=(0,0)$、$\dot\gamma(0)=(1,1)$ のアフィン測地線を求めよ。
3. 未来向き光的であることを検算し、負の方向に有限のアフィンパラメータで延長不能になる理由を示せ。

<!-- solution-start -->
**詳細解答**。計量成分は $g_{tt}=-e^{2t},\ g_{xx}=e^{2t}$、逆成分は $g^{tt}=-e^{-2t},\ g^{xx}=e^{-2t}$ です。非零微分は $\partial_tg_{tt}=-2e^{2t}$、$\partial_tg_{xx}=2e^{2t}$ です。[Koszul表示](#thm-lorg4-lorentz-levi-civita)から

$$
\begin{aligned}
\Gamma^t_{tt}&=\tfrac12g^{tt}\partial_tg_{tt}=1,\\
\Gamma^t_{xx}&=-\tfrac12g^{tt}\partial_tg_{xx}=1,\\
\Gamma^x_{tx}=\Gamma^x_{xt}&=\tfrac12g^{xx}\partial_tg_{xx}=1,
\end{aligned}
$$

他は零です。従って測地線方程式は

$$
\ddot t+(\dot t)^2+(\dot x)^2=0,\qquad
\ddot x+2\dot t\dot x=0.
$$

初速度は光的なので[因果型保存](#prop-lorg4-geodesic-causal-type)から自己内積は零です。$g=e^{2t}\eta$ で正の係数を掛けただけだから、未来向きの非零光的速度は $\dot x=\dot t>0$ または $\dot x=-\dot t<0$ です。初期値では $\dot x=\dot t=1$ なので連続性から前者の枝に留まり、方程式は

$$
\ddot t+2(\dot t)^2=0,\qquad \dot x=\dot t
$$

となります。$u(s)=\dot t(s)>0$ とおくと $u'=-2u^2$ です。$u^{-2}u'=-2$ を積分して

$$
\frac d{ds}\frac1u=2,\qquad
\frac1{u(s)}=1+2s,\qquad u(s)=\frac1{1+2s}.
$$

$t(0)=0$、$x(0)=0$ と $\dot x=\dot t$ より

$$
\gamma(s)=\left(\frac12\log(1+2s),\ \frac12\log(1+2s)\right),
\qquad s>-\frac12.
$$

直接検算として $\dot t=\dot x=(1+2s)^{-1}$、$\ddot t=\ddot x=-2(1+2s)^{-2}$ を二式へ入れるとそれぞれ零です。自己内積は $e^{2t}(-\dot t^2+\dot x^2)=0$、$\dot t>0$ なので未来向き光的です。

$s\downarrow-1/2$ で $t(s)=x(s)\to-\infty$ となり、$\mathbb R^2$ 内に曲線の極限点は存在しません。連続な測地線として $s=-1/2$ を通過する延長は不可能であり、有限のアフィンパラメータで最大存在区間の端に達します。計量が**全平面で滑らかで非退化**でも、アフィン測地完備性は自動ではありません。ここでは一般の因果的最大化定理を使わず、ODEの解とその定義域だけから結論しました。
<!-- solution-end -->

## 8. ここから局所最大化へ

Lorentz計量の接続の存在一意性、測地線方程式、因果型保存、指数写像の局所可逆性は、**非退化性と滑らかなODE**だけで導けました。一方、指数写像の大域単射性、測地完備性、最短・最長性はまだ結論できません。Riemannの最短測地線という語をそのまま置き換えることもできません。

次章LORG5では、指数写像の局所逆を二点の間で使える凸正規近傍に進み、時間的測地線が適切な局所範囲でLorentz長さを**最大化**するという、Riemann幾何とは向きの異なる主張を証明します。
