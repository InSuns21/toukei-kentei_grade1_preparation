# TH6 熱力学的安定性・応答・凸性

[TH5の熱力学ポテンシャル](../TH5/index.md#def-th5-potentials)を使えば、指定した温度・圧力に合う関数を作れます。しかし平衡条件を解いた結果が、実際に戻ろうとする**安定な平衡**であるかは別の問いです。山の頂上でも斜面の傾きはゼロだからです。本章では、微小な擾乱に対するエネルギーの曲率から安定性を調べ、その曲率を測定可能な熱容量・圧縮率・感受率へ変換します。

一成分・単相の単純圧縮系を考えます。物質量 $N>0$ は一定、$V>0$、$T>0$、平衡基本関係 $U(S,V,N)$ は考える領域で $C^3$ 級、必要な変数交換が可能とします。仕事は $pV$ 仕事に限り、界面・長距離相互作用を無視できる巨視的な均一相を対象とします。相共存の近くでは厳密な正の曲率・局所座標が失われ得るので、各結果の仮定を確認します。

## 1. 平衡条件と安定性は違う

全体のエントロピーと体積を固定したまま、同じ物質の二つの部分の間で微小なエントロピー・体積の再配分を考えます。平衡で両部分の温度・圧力が一致していれば、交換方向に沿うエネルギーの一次変化は消えます。それでも二次の変化が負なら、少し配分をずらすだけでエネルギーが下がり、平衡を安定な最小とは呼べません。

<a id="def-th6-local-stability"></a>

<!-- formal-statement-start -->
> **定義（固定エントロピー・体積での局所安定性）**  
> $N>0$ を固定した $C^2$ 級基本関係 $U(S,V,N)$ について、二つの同じ大きさの部分を平衡状態 $(S,V,N)$ に置く。総エントロピー $2S$、総体積 $2V$、各部分の物質量 $N$ を保ち、一方に $(s,v)$、他方に $(-s,-v)$ を与えるとき、全エネルギー
>
$$
E(s,v)=U(S+s,V+v,N)+U(S-s,V-v,N)
$$
>
> が $(s,v)=(0,0)$ で局所最小なら、その均一配分をこの交換に関して**局所安定**という。十分小さい非零の交換で常に厳密に大きければ**厳密局所安定**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-th6-local-stability -->
### 例：二次エネルギーの交換

**定義の確認**：$U(S,V,N)=aS^2/(2N)+bV^2/(2N)$（$a,b,N>0$）とします。$S\pm s,V\pm v$ が許容領域にあるなら、二つを足して

$$
\begin{aligned}
E(s,v)-E(0,0)
&=\frac{a}{2N}\bigl((S+s)^2+(S-s)^2-2S^2\bigr)\\
&\quad+\frac{b}{2N}\bigl((V+v)^2+(V-v)^2-2V^2\bigr)\\
&=\frac{a}{N}s^2+\frac{b}{N}v^2.
\end{aligned}
$$

これは非零の $(s,v)$ で正です。したがって定義の固定量を守るすべての微小交換に対して厳密局所安定です。この模型の圧力が常に正であるとは限らず、ここでは**安定性の数学的定義**だけを検証しています。
<!-- definition-example-end -->

<a id="prop-th6-hessian"></a>

<!-- formal-statement-start -->
> **命題（エネルギーHessianによる判定）**  
> $N$ 固定で $U(S,V,N)$ が $C^2$ 級なら、上の交換に対するエネルギー差は、$z=(s,v)^{\mathsf T}$ として
>
$$
E(s,v)-E(0,0)=z^{\mathsf T}H_Uz+o(s^2+v^2),
\qquad
H_U=\begin{pmatrix}U_{SS}&U_{SV}\\U_{SV}&U_{VV}\end{pmatrix}
$$
>
> となる。局所安定なら $H_U$ は半正定値であり、正定値なら厳密局所安定である。負の方向があれば局所安定ではない。半正定値だけでは厳密局所安定を結論できない。
<!-- formal-statement-end -->

### 証明の見取り図

正負二つのTaylor展開を足すと、一次項と奇数次数の項が消えます。判定に効くのは方向 $z$ に沿う二次形式です。

<!-- proof-start -->
### 証明

$N$ を固定し、$x=(S,V)$ と書きます。$C^2$ 級のTaylor展開を $z$ と $-z$ に適用すると

$$
\begin{aligned}
U(x+z,N)&=U(x,N)+\nabla U(x,N)\cdot z
+\frac12 z^{\mathsf T}H_Uz+o(\|z\|^2),\\
U(x-z,N)&=U(x,N)-\nabla U(x,N)\cdot z
+\frac12 z^{\mathsf T}H_Uz+o(\|z\|^2).
\end{aligned}
$$

両辺を加え、$2U(x,N)$ を引くと主張の展開になります。局所最小なら任意の固定した方向 $w$ に対し、$z=tw$ として差が非負です。$t^2>0$ で割り $t\to0$ とすると $w^{\mathsf T}H_Uw\ge0$、よって半正定値です。

逆に正定値の対称行列は単位円周上で二次形式が正の最小値 $m>0$ を取ります。従って $z^{\mathsf T}H_Uz\ge m\|z\|^2$ であり、剰余の絶対値を $(m/2)\|z\|^2$ 以下にできる十分小さな近傍では差が正です。ある方向 $w$ で二次形式が負なら同じ極限の議論で小さな $t\ne0$ に対し差は負です。
<!-- proof-end -->

<a id="prop-th6-global-convexity"></a>

<!-- formal-statement-start -->
> **命題（大域凸性と支持平面）**  
> $N>0$ を固定したとき、許容状態の $(S,V)$ 領域 $D$ は凸であり、任意の $x\in D$ の周囲に $D$ に含まれる小円板が存在するとする。$U(\cdot,\cdot,N)$ は $D$ 上 $C^2$ 級とする。各点で $H_U$ が半正定値であることと、$U$ が $D$ で凸、すなわち任意の $x,y\in D$、$0\le t\le1$ に対し
>
$$
U((1-t)x+ty,N)\le(1-t)U(x,N)+tU(y,N)
$$
>
> が成立することは同値である。さらにこのとき任意の $x,y\in D$ に対し
>
$$
U(y,N)\ge U(x,N)+\nabla U(x,N)\cdot(y-x)
$$
>
> が成り立つ。$H_U$ が全点で正定値なら $x\ne y$ の凸不等式は $0<t<1$ で厳密になる。
<!-- formal-statement-end -->

### 証明の見取り図

二点間の線分だけを動く一変数関数へ制限します。二階微分が非負なら導関数は単調増加し、割線と接線の間の不等式が得られます。

<!-- proof-start -->
### 証明

$x,y\in D$ を固定し $w=y-x$ とします。$D$ の凸性により $x+tw\in D$（$0\le t\le1$）です。$\varphi(t)=U(x+tw,N)$ と置き、連鎖律を二回使うと

$$
\varphi'(t)=\nabla U(x+tw,N)\cdot w,\qquad
\varphi''(t)=w^{\mathsf T}H_U(x+tw)w.
$$

$H_U$ が半正定値なら $\varphi''(t)\ge0$ です。ゆえに $\varphi'$ は単調非減少で、

$$
\varphi(1)-\varphi(0)=\int_0^1\varphi'(t)\,dt
\ge\int_0^1\varphi'(0)\,dt=\varphi'(0).
$$

ここへ $\varphi'(0)=\nabla U(x,N)\cdot(y-x)$ を代入すれば支持平面の不等式です。凸不等式も、$\varphi'$ の単調性から区間 $[0,t]$ の導関数の平均値が区間 $[0,1]$ の導関数の平均値以下であることを用いて

$$
\frac{\varphi(t)-\varphi(0)}t
\le \varphi(1)-\varphi(0),
\quad\text{すなわち}\quad
\varphi(t)\le(1-t)\varphi(0)+t\varphi(1)
$$

と従います（$0<t<1$、端点は等号）。

逆に $U$ が凸なら、各 $x\in D$、方向 $w$ で十分小さい $h>0$ に対して

$$
U(x+hw,N)+U(x-hw,N)-2U(x,N)\ge0
$$

です。二次のTaylor展開で左辺を $h^2$ で割り $h\to0$ とすると $w^{\mathsf T}H_U(x)w\ge0$。従って各点のHessianは半正定値です。すべての点で正定値なら、$w\ne0$ について $\varphi''(t)>0$ なので、内点での導関数の平均値に関する不等式は厳密です。
<!-- proof-end -->

局所の正定値だけでは、異なる領域にある二つの離れた極小のどちらが低いかは分かりません。上の結論は**凸な領域全体**で曲率条件が成立するときのもので、相共存のように一つの滑らかな単相領域で覆えない場合へは無条件に拡張しません。

**零曲率の注意**：一変数で $U(x)=x^4$ は $x=0$ で二階微分が零でも厳密局所最小を持ち、$U(x)=-x^4$ は同じ零曲率で局所最大です。半正定値という必要条件だけから四次項の符号は分かりません。以下では定量的な応答公式を安全に使うため、主として**正定値の内部点**を扱います。

## 2. 熱容量・圧縮率・熱膨張率を定義する

実験ではエネルギーの二階微分を直接測るより、温度を上げたときの熱吸収、圧力を上げたときの体積収縮を測ります。この量が曲率の逆数と結び付いています。

<a id="def-th6-response"></a>

<!-- formal-statement-start -->
> **定義（熱容量・圧縮率・熱膨張率）**  
> 一成分単相系で物質量 $N>0$ を固定し、$T>0,V>0$ の滑らかな局所平衡座標が存在するとする。定積熱容量 $C_V$、定圧熱容量 $C_p$、等温圧縮率 $\kappa_T$、断熱圧縮率 $\kappa_S$、定圧熱膨張率 $\alpha$ を
>
$$
\begin{aligned}
C_V&=T\left(\frac{\partial S}{\partial T}\right)_{V,N},
&C_p&=T\left(\frac{\partial S}{\partial T}\right)_{p,N},\\
\kappa_T&=-\frac1V\left(\frac{\partial V}{\partial p}\right)_{T,N},
&\kappa_S&=-\frac1V\left(\frac{\partial V}{\partial p}\right)_{S,N},\\
\alpha&=\frac1V\left(\frac{\partial V}{\partial T}\right)_{p,N}
\end{aligned}
$$
>
> と定義する。それぞれの偏微分は指定した固定条件で局所的に存在するとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-th6-response -->
### 例：理想気体の直接微分

**定義の確認**：$c_V,R>0$ を定数として、[TH4の理想気体のエントロピー](../TH4/index.md#prop-th4-ideal-gas-entropy)の温度・体積表示と状態方程式を用います。

$$
S=Nc_V\log(T/T_*)+NR\log(V/(Nv_*)),\qquad pV=NRT.
$$

$S_T|_V=Nc_V/T$ なので $C_V=Nc_V$。$V=NRT/p$ を固定 $p$ で微分すれば $V_T|_p=NR/p=V/T$、従って $\alpha=1/T$。固定 $T$ で $V_p=-NRT/p^2=-V/p$ なので $\kappa_T=1/p$。各定義の分母は $T,p,V>0$ で零になりません。
<!-- definition-example-end -->

<a id="thm-th6-stability-response"></a>

<!-- formal-statement-start -->
> **定理（厳密な局所安定性と応答の符号）**  
> 一成分単相系で $N>0$ 固定、$T=U_S>0$、$p=-U_V$、$U$ は $C^3$ 級とし、$H_U$ は正定値とする。局所的に $(T,V)$ および $(S,p)$ が独立座標になるとき、
>
$$
U_{SS}=\frac{T}{C_V}>0,\qquad
U_{VV}=\frac1{V\kappa_S}>0,\qquad
\det H_U=\frac{T}{C_VV\kappa_T}>0.
$$
>
> 特に $C_V>0$、$\kappa_S>0$、$\kappa_T>0$ である。逆に $T,V>0$、$C_V>0$、$\kappa_T>0$ と上記の滑らかな座標条件があれば $H_U$ は正定値である。
<!-- formal-statement-end -->

### 証明の見取り図

[基本関係](../TH4/index.md#prop-th4-fundamental-fixed-n)の $T=U_S$、$p=-U_V$ を微分し、[Legendre変換](../TH5/index.md#prop-th5-legendre-differential)で $S$ を $T$ に交換すると、HessianのSchur補が等温圧縮率の逆数になります。

<!-- proof-start -->
### 証明

$V,N$ 固定で $T=U_S$ を $S$ 微分すれば $T_S|_V=U_{SS}$ です。座標変換の恒等式 $U_S(S(T,V),V,N)=T$ を $T$ で微分すると、連鎖律で $U_{SS}S_T|_V=1$ です。正定値性より $U_{SS}>0$ なので $S_T|_V=1/U_{SS}$ と解けます。従って定義から

$$
C_V=T S_T|_V=\frac{T}{U_{SS}},
\qquad U_{SS}=\frac{T}{C_V}.
$$

次に $p=-U_V$ を $S,N$ 固定で $V$ 微分すると $p_V|_S=-U_{VV}$ です。恒等式 $-U_V(S,V(S,p),N)=p$ を $p$ で微分すると $-U_{VV}V_p|_S=1$。正定値性から $U_{VV}>0$ なので $V_p|_S=-1/U_{VV}$、従って $\kappa_S=-(1/V)V_p|_S=1/(VU_{VV})$ です。

次に $T$ 一定の微小変化では $dT=U_{SS}\,dS+U_{SV}\,dV=0$ です。正定値より $U_{SS}>0$ なので

$$
\left(\frac{\partial S}{\partial V}\right)_{T,N}
=-\frac{U_{SV}}{U_{SS}}.
$$

$p=-U_V$ の全微分 $dp=-U_{SV}\,dS-U_{VV}\,dV$ に代入すると

$$
\begin{aligned}
\left(\frac{\partial p}{\partial V}\right)_{T,N}
&=-U_{SV}\left(-\frac{U_{SV}}{U_{SS}}\right)-U_{VV}\\
&=-\left(U_{VV}-\frac{U_{SV}^2}{U_{SS}}\right)
=-\frac{\det H_U}{U_{SS}}.
\end{aligned}
$$

したがって $\kappa_T=-1/(Vp_V|_T)=U_{SS}/(V\det H_U)$。両辺を解き、先ほどの $U_{SS}=T/C_V$ を入れると

$$
\det H_U=\frac{U_{SS}}{V\kappa_T}
=\frac{T}{C_VV\kappa_T}.
$$

正定値対称 $2\times2$ 行列は $U_{SS}>0,\det H_U>0$ を満たし、逆にこの二条件で正定値になります。$T,V>0$ によって $C_V>0,\kappa_T>0$ との同値が得られます。
<!-- proof-end -->

**符号だけでは足りない例**：$U_{SS}=2,U_{VV}=1,U_{SV}=2$ という対称Hessianでは二つの対角成分が正でも $\det H_U=2-4=-2<0$ です。方向 $z=(1,-1)$ について二次形式は $2-4+1=-1$。エントロピーと体積を同時に再配分するとエネルギーが減り、安定ではありません。

## 3. Maxwell関係式が二つの熱容量を結ぶ

定積熱容量と定圧熱容量は独立な二つの材料定数とは限りません。体積が温度とともに変わる分、定圧で余分な応答が生じます。

<a id="thm-th6-heat-capacity-difference"></a>

<!-- formal-statement-start -->
> **定理（定圧・定積熱容量の差）**  
> $N>0$ 固定の一成分単相領域で $(T,V)$ と $(T,p)$ が滑らかな独立座標であり、$T,V>0$、$\kappa_T\ne0$ とする。[Maxwell関係式](../TH5/index.md#thm-th5-maxwell)が成り立つなら
>
$$
C_p-C_V=\frac{TV\alpha^2}{\kappa_T}.
$$
>
> 特に $\kappa_T>0$ の安定領域では $C_p\ge C_V$ であり、等号は $\alpha=0$ の場合に成立する。
<!-- formal-statement-end -->

### 証明の見取り図

まずエントロピーを $S(T,V)$ とみなした全微分を作り、固定圧力に沿った $V_T$ を代入します。圧力の全微分 $dp=0$ から残った混合応答を $\alpha,\kappa_T$ に変換します。

<!-- proof-start -->
### 証明

[応答量の定義](#def-th6-response)から $S_T|_V=C_V/T$、また[Helmholtz自由エネルギーのMaxwell関係式](../TH5/index.md#thm-th5-maxwell)から $S_V|_T=p_T|_V$ なので、

$$
dS=\frac{C_V}{T}\,dT
+\left(\frac{\partial p}{\partial T}\right)_{V,N}dV.
$$

$p$ 一定に沿って $dV/dT|_p=\alpha V$ を代入し、$T$ 倍すると

$$
C_p=T\frac{dS}{dT}\bigg|_{p,N}
=C_V+T\left(\frac{\partial p}{\partial T}\right)_{V,N}\alpha V.
$$

他方 $dp=p_T|_V\,dT+p_V|_T\,dV$ で、$p$ 一定なら

$$
0=p_T|_V+p_V|_T\alpha V,\qquad
p_V|_T=-\frac1{V\kappa_T}.
$$

したがって $p_T|_V=\alpha/\kappa_T$。これを上式に代入して結論を得ます。$\kappa_T>0$ のとき右辺は非負です。
<!-- proof-end -->

<a id="thm-th6-compressibility-ratio"></a>

<!-- formal-statement-start -->
> **定理（断熱・等温圧縮率の関係）**  
> 前定理の領域でさらに $C_V>0$、$\kappa_T>0$ とし、$S,p$ の局所座標が存在するとする。このとき
>
$$
\frac{\kappa_T}{\kappa_S}=\frac{C_p}{C_V},
\qquad 0<\kappa_S\le\kappa_T.
$$
<!-- formal-statement-end -->

### 証明の見取り図

エントロピー一定の体積変化は温度も動かします。$dS=0$ から $dT/dV|_S$ を解いて $dp$ に戻せば、二つの圧縮率を比較できます。

<!-- proof-start -->
### 証明

直前の証明で求めた $dS$ に $dS=0$ を代入します。$C_V>0$ なので

$$
\left(\frac{\partial T}{\partial V}\right)_{S,N}
=-\frac{T}{C_V}\left(\frac{\partial p}{\partial T}\right)_{V,N}.
$$

$p(T,V)$ の全微分をエントロピー一定に沿って評価すると

$$
\begin{aligned}
\left(\frac{\partial p}{\partial V}\right)_{S,N}
&=\left(\frac{\partial p}{\partial V}\right)_{T,N}
+\left(\frac{\partial p}{\partial T}\right)_{V,N}
\left(\frac{\partial T}{\partial V}\right)_{S,N}\\
&=-\frac1{V\kappa_T}
-\frac{T}{C_V}\left(\frac{\alpha}{\kappa_T}\right)^2.
\end{aligned}
$$

左辺は $-1/(V\kappa_S)$ なので、$-V$ を掛けて

$$
\frac1{\kappa_S}
=\frac1{\kappa_T}+\frac{TV\alpha^2}{C_V\kappa_T^2}
=\frac1{\kappa_T}\left(1+\frac{C_p-C_V}{C_V}\right)
=\frac{C_p}{C_V\kappa_T}.
$$

最後から二番目の等号は[熱容量差の定理](#thm-th6-heat-capacity-difference)です。正の量を掛けて比を取り、$C_p\ge C_V>0$ を使えば $\kappa_S\le\kappa_T$ です。
<!-- proof-end -->

### 例：一定熱容量の理想気体

$C_V=Nc_V$、$\alpha=1/T$、$\kappa_T=1/p$、$pV=NRT$ を代入すると

$$
C_p-C_V=\frac{TV(1/T^2)}{1/p}=\frac{pV}{T}=NR.
$$

よって $C_p=N(c_V+R)$ です。さらに

$$
\kappa_S=\kappa_T\frac{C_V}{C_p}
=\frac1p\frac{c_V}{c_V+R}.
$$

等温圧縮より断熱圧縮の方が体積を変えにくいことが、式の上でも確認できます。

## 4. ポテンシャルの曲率と符号を整理する

[TH5の自然変数](../TH5/index.md#prop-th5-natural-variables)を使い、$F(T,V,N)$ と $G(T,p,N)$ の二階微分を調べます。エネルギー $U(S,V)$ が凸だからといって、温度を独立変数にした $F$ まで全方向で凸になるわけではありません。Legendre変換した変数の曲率は反転します。

<a id="prop-th6-potential-curvature"></a>

<!-- formal-statement-start -->
> **命題（Helmholtz・Gibbsポテンシャルの曲率）**  
> 一成分・単相の安定領域で $N>0$ を固定し、$F(T,V)$ と $G(T,p)$ が $C^2$ 級、$T,V>0$、$C_V>0$、$\kappa_T>0$ とする。このとき
>
$$
\begin{aligned}
F_{TT}&=-\frac{C_V}{T}<0,& F_{VV}&=\frac1{V\kappa_T}>0,\\
G_{TT}&=-\frac{C_p}{T}<0,&G_{Tp}&=\alpha V,&G_{pp}&=-\kappa_TV<0.
\end{aligned}
$$
>
> さらに $G$ の $(T,p)$ Hessian は負定値で、
>
$$
\det H_G=\frac{C_VV\kappa_T}{T}>0.
$$
>
> したがって $F$ は温度方向に凹・体積方向に凸、$G$ は $(T,p)$ に関して厳密局所凹である。
<!-- formal-statement-end -->

### 証明の見取り図

自然変数に関する一階微分を再び微分し、応答係数の定義をそのまま使います。$G$ の二階微分行列について、対角積から交差項の二乗を引くと熱容量差の公式によって混合項が相殺されます。

<!-- proof-start -->
### 証明

[自然変数の命題](../TH5/index.md#prop-th5-natural-variables)から $F_T=-S$、$F_V=-p$、$G_T=-S$、$G_p=V$ です。よって

$$
\begin{aligned}
F_{TT}&=-S_T|_V=-C_V/T,\\
F_{VV}&=-p_V|_T=1/(V\kappa_T),\\
G_{TT}&=-S_T|_p=-C_p/T,\\
G_{Tp}&=(G_p)_T|_p=V_T|_p=\alpha V,\\
G_{pp}&=V_p|_T=-\kappa_TV.
\end{aligned}
$$

$G$ のHessianについて、二つの対角成分の積から交差項の二乗を引くと

$$
\begin{aligned}
\det H_G
&=(-C_p/T)(-\kappa_TV)-(\alpha V)^2\\
&=\frac{V\kappa_T}{T}
\left(C_p-\frac{TV\alpha^2}{\kappa_T}\right)
=\frac{C_VV\kappa_T}{T}>0.
\end{aligned}
$$

対称 $2\times2$ 行列で先頭の対角成分が負、対角積から交差項の二乗を引いた値が正なら負定値です。ここで $C_p-C_V$ に[前定理](#thm-th6-heat-capacity-difference)を使用しました。
<!-- proof-end -->

**重要な区別**：$G(T,p)$ の凹性は**制御パラメータ $T,p$ に関する曲率**です。「一定の $T,p$ のもとで平衡が $G$ を最小にする」という次節の原理と矛盾しません。最小になるように変えるのは、内部状態や試行配置を変える方向であり、$T,p$ そのものを変える方向ではありません。

## 5. 熱浴・圧力浴の下で何が最小になるか

孤立系では[エントロピー増大則](../TH4/index.md#prop-th4-entropy-balance)に従って全エントロピーが増えます。熱浴があれば系のエントロピー単独は減ることがあるため、環境まで含めた増大則を系の状態関数へ書き換える必要があります。

<a id="thm-th6-free-energy-minimum"></a>

<!-- formal-statement-start -->
> **定理（自由エネルギーの変分原理）**  
> 一成分閉鎖系が一定温度 $T_0>0$ の巨大な熱浴と熱交換し、全体は断熱的に孤立しており、系の体積 $V$ と物質量 $N$ が固定され、他の仕事・物質移動がないとする。浴の温度が変化せず、浴のエントロピー変化が $-\Delta U/T_0$ と表せるなら、許された自発過程に対し
>
$$
\Delta F_{T_0}\le0,\qquad F_{T_0}=U-T_0S.
$$
>
> また一定圧力 $p_0$ の力学的環境が体積仕事を受け持ち、浴と環境の合計エントロピー変化が $-(\Delta U+p_0\Delta V)/T_0$ と表せるなら
>
$$
\Delta G_{T_0,p_0}\le0,\qquad
G_{T_0,p_0}=U-T_0S+p_0V.
$$
>
> これらの条件下の安定平衡は、到達可能な試行状態に関して対応する関数の局所最小である。大域最小性は到達可能集合・相の比較を別途要する。
<!-- formal-statement-end -->

### 証明の見取り図

熱浴を含めた孤立全体のエントロピー変化を、系の $U,S,V$ の変化だけに直します。第二法則の非負条件へ $-T_0$ を掛けると自由エネルギーの減少条件になります。

<!-- proof-start -->
### 証明

第一の条件では全エントロピー変化は、浴の温度一定という仮定より

$$
\Delta S_{\mathrm{tot}}
=\Delta S+\Delta S_{\mathrm{bath}}
=\Delta S-\frac{\Delta U}{T_0}.
$$

[孤立全体のエントロピー増大則](../TH4/index.md#prop-th4-entropy-balance)により左辺は非負です。$T_0>0$ を掛けて移項すれば $\Delta U-T_0\Delta S\le0$。温度 $T_0$ は一定なので $\Delta(U-T_0S)\le0$ です。

第二の条件では、系の体積増加 $\Delta V$ に伴い力学的環境へ渡すエネルギーが $p_0\Delta V$ であり、仮定した環境のエントロピー収支から

$$
\Delta S_{\mathrm{tot}}
=\Delta S-\frac{\Delta U+p_0\Delta V}{T_0}\ge0.
$$

同じく $T_0>0$ を掛けて移項すると $\Delta U-T_0\Delta S+p_0\Delta V\le0$ です。$T_0,p_0$ は固定だから $\Delta(U-T_0S+p_0V)\le0$ となります。

安定平衡から任意の許された近傍状態へ移して自由エネルギーをさらに下げられるなら、元の状態は安定な最小ではありません。したがって安定平衡は到達可能な変分方向で局所最小です。上の不等式だけから任意の離れた相との大域比較は導けません。
<!-- proof-end -->

## 6. 外場に対する感受率

圧縮率は圧力への、熱容量は温度への応答でした。磁場など一般の外場でも、共役な量がどれだけ変わるかを感受率で表せます。磁性そのものは後続で扱いますが、ここでは最小限の一自由度模型で安定性との関係を作ります。

<a id="def-th6-susceptibility"></a>

<!-- formal-statement-start -->
> **定義（外場に対する局所感受率）**  
> 内部変数 $x$ に対する $C^2$ 級ポテンシャル $f_0(x)$ を外場 $h$ と結合して $f_h(x)=f_0(x)-hx$ とする。$f_0'(x(h))=h$ を満たす滑らかな平衡枝 $x(h)$ があるとき、その感受率を
>
$$
\chi=\frac{dx}{dh}
$$
>
> と定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-th6-susceptibility -->
### 例：二次の復元力

**定義の確認**：$f_0(x)=ax^2/2$、$a>0$ とすると $f_h'(x)=ax-h$。停留条件を解いて $x(h)=h/a$、二階微分は $a>0$ なので安定な最小です。実際に微分すると $\chi=dx/dh=1/a>0$ です。
<!-- definition-example-end -->

<a id="prop-th6-susceptibility-curvature"></a>

<!-- formal-statement-start -->
> **命題（感受率は安定曲率の逆数）**  
> $f_0$ を $C^2$ 級とし、$f_0'(x(h))=h$ の滑らかな枝上で $f_0''(x(h))>0$ とする。このとき
>
$$
\chi=\frac1{f_0''(x(h))}>0.
$$
>
> さらに $\Phi(h)=f_0(x(h))-hx(h)$ は $\Phi'(h)=-x(h)$、$\Phi''(h)=-\chi<0$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

停留条件を外場で微分すれば、曲率と応答の積が1になります。最小値の外場微分では、停留条件により $x'(h)$ の項が消えます。

<!-- proof-start -->
### 証明

$f_0'(x(h))=h$ の両辺を $h$ 微分し、連鎖律を使うと

$$
f_0''(x(h))x'(h)=1.
$$

仮定の $f_0''>0$ で割れるため $x'(h)=1/f_0''>0$ です。次に積・連鎖律で

$$
\begin{aligned}
\Phi'(h)
&=f_0'(x(h))x'(h)-x(h)-hx'(h)\\
&=(f_0'(x(h))-h)x'(h)-x(h)=-x(h).
\end{aligned}
$$

再び $h$ で微分すると $\Phi''(h)=-x'(h)=-\chi<0$ です。
<!-- proof-end -->

曲率が零へ近付けば逆数の応答は大きくなり得ます。ただし**零曲率点そのものでは**逆関数の条件が失われ、上式を有限な量の等式として適用できません。負の曲率を持つ停留解へ公式を機械的に代入して「負の感受率を持つ安定状態」とは解釈しません。

## 7. 演習：曲率を測れる応答へ変換する

### Level A：定義と符号を手で確かめる

#### A1. 二変数の安定判定

$N>0$ 固定、$U(S,V,N)=AS^2/N+BN^2/V$（$A,B>0$、$S,V>0$）について、$H_U$ の正定値性を示せ。

- Level: A
- ID: TH6-A1

<!-- solution-start -->
**詳細解答**　$U_S=2AS/N$、$U_V=-BN^2/V^2$ を微分します。

$$
U_{SS}=\frac{2A}{N},\quad U_{SV}=0,\quad U_{VV}=\frac{2BN^2}{V^3}.
$$

したがって $H_U$ の左上の成分は $2A/N>0$、二つの対角成分の積から交差項の二乗を引いた値は $4ABN/V^3>0$ です。[Hessian判定](#prop-th6-hessian)により厳密局所安定です。なお $T=2AS/N>0$、$p=BN^2/V^2>0$ も成立します。
<!-- solution-end -->

#### A2. 理想気体の圧縮率と膨張率

$N,R,T,p>0$ の理想気体が $V=NRT/p$ を満たす。$\kappa_T,\alpha$ を[定義](#def-th6-response)から求めよ。

- Level: A
- ID: TH6-A2

<!-- solution-start -->
**詳細解答**　$T,N$ 固定で $V_p=-NRT/p^2=-V/p$ だから

$$
\kappa_T=-\frac1V\left(-\frac Vp\right)=\frac1p.
$$

$p,N$ 固定で $V_T=NR/p=V/T$ より $\alpha=(1/V)(V/T)=1/T$ です。双方とも正です。
<!-- solution-end -->

#### A3. ポテンシャルの曲率

$F(T,V)=-aT^2/2+b/V$（$a,b,T,V>0$、$N$ 固定）について、$S=-F_T$、$p=-F_V$、$C_V$、$\kappa_T$ を求めよ。

- Level: A
- ID: TH6-A3

<!-- solution-start -->
**詳細解答**　[自然変数の関係](../TH5/index.md#prop-th5-natural-variables)から $S=aT$、$p=b/V^2$ です。従って $S_T|_V=a$ なので $C_V=aT$。また $p_V|_T=-2b/V^3$ であり、定義を逆微分で書けば

$$
\kappa_T=-\frac1{Vp_V|_T}
=-\frac1{V(-2b/V^3)}=\frac{V^2}{2b}.
$$

$C_V>0,\kappa_T>0$ で、$F_{TT}=-a<0$、$F_{VV}=2b/V^3>0$ と一致します。
<!-- solution-end -->

#### A4. 感受率の直接計算

$f_h(x)=3x^2/2-hx$（$h\in\mathbb R$）の安定な平衡 $x(h)$ と感受率を求めよ。

- Level: A
- ID: TH6-A4

<!-- solution-start -->
**詳細解答**　$f_h'(x)=3x-h=0$ より $x=h/3$。二階微分 $f_h''=3>0$ なので一意な厳密最小です。$x$ を $h$ 微分すれば $\chi=1/3$。これは[逆曲率の命題](#prop-th6-susceptibility-curvature)の $1/f_0''=1/3$ とも一致します。
<!-- solution-end -->

#### A5. 零曲率では結論を急がない

$f(x)=x^4$ と $g(x)=-x^4$ の $x=0$ における二階微分を求め、局所安定性を比較せよ。

- Level: A
- ID: TH6-A5

<!-- solution-start -->
**詳細解答**　$f''(x)=12x^2$、$g''(x)=-12x^2$ なので双方の $x=0$ における二階微分は零です。しかし $x\ne0$ では $f(x)-f(0)=x^4>0$、$g(x)-g(0)=-x^4<0$。前者は厳密局所最小、後者は局所最大です。従って半正定値という二次の必要条件だけで安定性は決まりません。
<!-- solution-end -->

### Level B：異なる応答をつなぐ

#### B1. 熱容量差の導出を別の数値で検算

$N$ 固定、$T=300\,\mathrm K$、$V=0.02\,\mathrm{m}^3$、$\kappa_T=2\times10^{-5}\,\mathrm{Pa}^{-1}$、$\alpha=10^{-3}\,\mathrm K^{-1}$、$C_V=80\,\mathrm{J/K}$ の単相状態を考える。$C_p$ と $\kappa_S$ を求めよ。必要な滑らかさと安定性を仮定する。

- Level: B
- ID: TH6-B1

<!-- solution-start -->
**詳細解答**　[熱容量差の定理](#thm-th6-heat-capacity-difference)に数値を代入すると

$$
C_p-C_V=\frac{300(0.02)(10^{-3})^2}{2\times10^{-5}}
=\frac{6\times10^{-6}}{2\times10^{-5}}
=0.3\,\mathrm{J/K}.
$$

したがって $C_p=80.3\,\mathrm{J/K}$。[圧縮率比](#thm-th6-compressibility-ratio)より

$$
\kappa_S=\kappa_T\frac{C_V}{C_p}
=(2\times10^{-5})\frac{80}{80.3}\,\mathrm{Pa}^{-1}.
$$

$80/80.3<1$ より $0<\kappa_S<\kappa_T$ です。$TV\alpha^2/\kappa_T$ の単位は $\mathrm{J/K}$（$1\,\mathrm{Pa\,m}^3=1\,\mathrm J$）と確認できます。
<!-- solution-end -->

#### B2. 対角の正だけでは不安定

点 $(S_0,V_0)$ のエネルギーHessianが $H=\begin{pmatrix}2&2\\2&1\end{pmatrix}$ だとする。各対角成分の符号を確認し、交換方向 $z=(1,-1)^{\mathsf T}$ が安定判定に与える意味を説明せよ。

- Level: B
- ID: TH6-B2

<!-- solution-start -->
**詳細解答**　$H_{11}=2>0$、$H_{22}=1>0$ です。しかし $\det H=2\cdot1-2\cdot2=-2<0$。また

$$
Hz=\begin{pmatrix}2-2\\2-1\end{pmatrix}
=\begin{pmatrix}0\\1\end{pmatrix},
\qquad z^{\mathsf T}Hz=(1,-1)\begin{pmatrix}0\\1\end{pmatrix}=-1.
$$

[交換エネルギーの展開](#prop-th6-hessian)で交換を $tz$ とすれば $E(tz)-E(0)=-t^2+o(t^2)<0$ （十分小さな非零 $t$）です。よって局所安定ではありません。個別の純粋な $S$・$V$ 方向の正曲率だけでは混合擾乱を排除できません。
<!-- solution-end -->

#### B3. 理想気体の断熱応答を微分から求める

$N,R,c_V>0$ 一定、$S=Nc_V\log(T/T_*)+NR\log(V/(Nv_*))$、$pV=NRT$ の理想気体について、$S$ 一定での $p_V|_S$ を直接求め、$\kappa_S$ と $C_p/C_V$ の関係を検算せよ。

- Level: B
- ID: TH6-B3

<!-- solution-start -->
**詳細解答**　$N$ 固定で $dS=(Nc_V/T)dT+(NR/V)dV$ なので、$dS=0$ と置くと

$$
\left(\frac{dT}{dV}\right)_{S,N}
=-\frac{R T}{c_V V}.
$$

$p=NRT/V$ をこの曲線に沿って微分し、積・商の微分を分けると

$$
\begin{aligned}
p_V|_S
&=\frac{NR}{V}T_V|_S-\frac{NRT}{V^2}\\
&=-\frac{NR^2T}{c_VV^2}-\frac{NRT}{V^2}
=-\frac pV\left(1+\frac R{c_V}\right).
\end{aligned}
$$

従って $\kappa_S=-1/(Vp_V|_S)=c_V/[p(c_V+R)]$。$\kappa_T=1/p$ と $C_p/C_V=(c_V+R)/c_V$ から、[圧縮率比の定理](#thm-th6-compressibility-ratio)の両辺はともに $(c_V+R)/c_V$ となります。
<!-- solution-end -->

#### B4. Gibbsポテンシャルの凹性

$G(T,p)=-aT^2/2+b\sqrt p$ （$a,b,T,p>0$、$N$ 固定）について、$S=-G_T$、$V=G_p$、$C_p$、$\kappa_T$ と $H_G$ の負定値性を確かめよ。

- Level: B
- ID: TH6-B4

<!-- solution-start -->
**詳細解答**　ここでは温度と圧力を独立変数として微分します。[自然変数の命題](../TH5/index.md#prop-th5-natural-variables)を用いると $S=-G_T=aT$、$V=G_p=b/(2\sqrt p)>0$。固定 $p$ で $S_T=a$ なので $C_p=aT$ です。さらに

$$
V_p=-\frac b{4p^{3/2}},\qquad
\kappa_T=-\frac{V_p}{V}
=\frac{b/(4p^{3/2})}{b/(2\sqrt p)}=\frac1{2p}.
$$

二階微分は $G_{TT}=-a$、$G_{Tp}=0$、$G_{pp}=-b/(4p^{3/2})$。先頭の対角成分は負、対角積から交差項の二乗を引いた値は $ab/(4p^{3/2})>0$ なのでHessianは負定値です。$V$ が $T$ に依存しないため $\alpha=0$ であり、[熱容量差](#thm-th6-heat-capacity-difference)から $C_V=C_p$ です。
<!-- solution-end -->

#### B5. 大域凸性を二次形式から証明する

$U(S,V)=aS^2+bV^2+cSV$（$a,b>0$、$c\in\mathbb R$）を凸領域 $\mathbb R^2$ 上の数学的模型とする。$4ab>c^2$ のときHessianが正定値であることを確認し、任意の二状態 $x,y$ に対する支持平面の不等式を具体的に証明せよ。

- Level: B
- ID: TH6-B5

<!-- solution-start -->
**詳細解答**　偏微分から $H_U=\begin{pmatrix}2a&c\\c&2b\end{pmatrix}$ です。$2a>0$、$\det H_U=4ab-c^2>0$ により正定値です。$x=(S,V)$、$y=(S+\Delta S,V+\Delta V)$ と置き、二次式を直接展開すると

$$
\begin{aligned}
U(y)-U(x)-\nabla U(x)\cdot(y-x)
&=a(\Delta S)^2+c\Delta S\Delta V+b(\Delta V)^2\\
&=a\left(\Delta S+\frac c{2a}\Delta V\right)^2
+\left(b-\frac{c^2}{4a}\right)(\Delta V)^2.
\end{aligned}
$$

$a>0$、$b-c^2/(4a)>0$ なので右辺は非負、$x\ne y$ なら正です。[大域凸性の命題](#prop-th6-global-convexity)の支持平面不等式をこの模型で直接確かめました。$T>0$ など熱力学上の許容領域を指定していないため、この問題は凸性という数学的構造の検算です。
<!-- solution-end -->

### Level C：基本関係・測定量・安定性の統合

#### C1. 体積依存を持つ滑らかな模型

$N,a,R,b,v_*>0$ を固定し、$T,V>0$ の平衡系について、Helmholtz自由エネルギーが

$$
F(T,V,N)=-\frac{aN}{2}T^2-NRT\log\frac{V}{Nv_*}+\frac{bN^2}{V}
$$

で与えられるとする。$S,p,C_V,\kappa_T,\alpha,C_p$ を求め、エネルギー $U(S,V,N)$ の固定 $N$ Hessianが正定値であることを、曲率の恒等式を用いて示せ。さらに $b\to0$ としたとき等温圧縮率の極限を求めよ。

- Level: C
- ID: TH6-C1

<!-- solution-start -->
**詳細解答**　まず[自然変数の関係](../TH5/index.md#prop-th5-natural-variables) $S=-F_T$、$p=-F_V$ に偏微分を代入します。

$$
S=aNT+NR\log\frac{V}{Nv_*},\qquad
p=\frac{NRT}{V}+\frac{bN^2}{V^2}.
$$

$S_T|_V=aN$ だから $C_V=aNT>0$。圧力の固定 $T$ 微分は

$$
p_V|_T=-\frac{NRT}{V^2}-\frac{2bN^2}{V^3}
=-\frac{NRTV+2bN^2}{V^3}<0.
$$

これより $\kappa_T=-1/(Vp_V|_T)$ を計算すると

$$
\kappa_T=\frac{V^2}{NRTV+2bN^2}>0.
$$

固定圧力で $0=dp=p_T|_V\,dT+p_V|_T\,dV$ とおき、$p_T|_V=NR/V$ を使います。

$$
\left(\frac{\partial V}{\partial T}\right)_{p,N}
=-\frac{NR/V}{-(NRTV+2bN^2)/V^3}
=\frac{NRV^2}{NRTV+2bN^2}.
$$

したがって $\alpha=(1/V)V_T|_p=NRV/(NRTV+2bN^2)$ です。[熱容量差の定理](#thm-th6-heat-capacity-difference)に代入すると

$$
\begin{aligned}
C_p-C_V
&=\frac{TV}{\kappa_T}\frac{N^2R^2V^2}{(NRTV+2bN^2)^2}\\
&=TV\frac{NRTV+2bN^2}{V^2}
\frac{N^2R^2V^2}{(NRTV+2bN^2)^2}\\
&=\frac{TN^2R^2V}{NRTV+2bN^2},
\end{aligned}
$$

ゆえに $C_p=aNT+TN^2R^2V/(NRTV+2bN^2)>0$ です。

$S_T|_V=aN>0$ により $S$ から $T$ への逆関数が局所的に存在します。また $p_V|_T<0$ なので $(T,p)$ も局所座標です。[Hessianと応答の定理](#thm-th6-stability-response)の逆向きを使い、

$$
U_{SS}=\frac{T}{C_V}=\frac1{aN}>0,\qquad
\det H_U=\frac{T}{C_VV\kappa_T}
=\frac{NRTV+2bN^2}{aNV^3}>0.
$$

二条件から $H_U$ は正定値です。最後に $b\to0$ を取ると $V^2/(NRTV)=V/(NRT)=1/p$（極限模型では $p=NRT/V$）で、理想気体型の等温圧縮率へ戻ります。
<!-- solution-end -->

## 8. 次に何を問うか

正定値Hessianは滑らかな単相の**局所**安定性を保証し、熱容量と圧縮率はその曲率を測る手段になります。一方、二つの離れた安定相が競合するときは、それぞれの局所曲率だけではどちらが選ばれるか分かりません。次章では化学ポテンシャルと多成分系を扱い、相を比較するための条件へ進みます。
