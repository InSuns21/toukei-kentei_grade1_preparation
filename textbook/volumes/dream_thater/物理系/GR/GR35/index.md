# GR35 各種エネルギー条件と集束

<!-- definition-example-audit: strict -->

[GR34のRaychaudhuri方程式](../GR34/index.md#thm-gr34-null-raychaudhuri)では、光線束の膨張率に $-R_{ab}k^ak^b$ が現れました。式の符号は分かっても、物質がどのようなときにこのRicci項が非負になるかは、幾何学だけでは決まりません。[GR12のEinstein場の方程式](../GR12/index.md#thm-gr12-einstein-equation)が結ぶのは曲率とエネルギー運動量であり、物質側の符号には追加の仮定が必要です。

たとえば通常の塵は近づく測地線束の集束を助けますが、正の宇宙項がある時空で時間的な束が必ず集束するとは限りません。この違いを「エネルギーは正」という一言で済ませると、地平線の面積や特異点について誤った主張につながります。ここでは、**誰が測ったエネルギーか、エネルギー流はどの向きか、重力にとってどの縮約が重要か**を一つずつ区別します。

以下、$(M,g)$ は4次元の時間向き付きLorentz時空で、計量符号は $(-,+,+,+)$、単位系は $G=c=1$ とします。$T_{ab}$ は滑らかな対称エネルギー運動量テンソルで、物質を[GR9の計量変分](../GR9/index.md#def-gr9-hilbert-stress)で定義したときの符号規約を使います。$v$ は未来向き単位時間的ベクトル $g(v,v)=-1$、$k\ne0$ は未来向き光的ベクトル $g(k,k)=0$、$T:=g^{ab}T_{ab}$ は跡です。光的ベクトルの正規化は固定しませんが、符号判定は $k\mapsto fk$（$f>0$）で変わりません。

## 1. 光が拾うエネルギー：零エネルギー条件

静止系の密度だけを調べていては、ある方向へ光速に近い速度で進む観測者にとっての収束の符号を判定できません。最初に必要なのは、光的方向へ $T$ を二回縮約した値の符号です。これは光的Raychaudhuri方程式の曲率項と直接結び付きます。

<a id="def-gr35-nec"></a>

<!-- formal-statement-start -->
> **定義（零エネルギー条件）**
> 4次元Lorentz時空の点 $x$ で対称テンソル $T_{ab}$ が、すべての非零光的ベクトル $k\in T_xM$ に対し

$$
T_{ab}k^ak^b\ge0
$$

> を満たすとき、零エネルギー条件（null energy condition, NEC）を満たすという。未来向きだけを調べても同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr35-nec -->
**定義の確認**：塵。[GR8の塵](../GR8/index.md#def-gr8-dust)は $T_{ab}=\rho u_au_b$、$g(u,u)=-1$ で、$\rho\ge0$ とします。任意の非零光的 $k$ について

$$
T_{ab}k^ak^b=\rho(u_ak^a)^2\ge0.
$$

未来向きなら $u\cdot k<0$ ですが、二乗されるため符号は非負です。これは特定の光線一本についての計算ではなく、**すべての光的方向**への確認です。$\rho<0$ なら非零の $k$ では負となり、どの仮定が失われるかも分かります。
<!-- definition-example-end -->

## 2. 観測者が測る密度とエネルギー流

時間的な観測者 $v$ が測る局所エネルギー密度は $T(v,v)$ です。観測者を変えるとこの数値は変わります。非負性を一人の静止観測者だけでなく、**全観測者**に要求するのが次の条件です。

<a id="def-gr35-wec"></a>

<!-- formal-statement-start -->
> **定義（弱エネルギー条件）**
> 4次元Lorentz時空の点 $x$ における対称テンソル $T_{ab}$ が、任意の未来向き単位時間的ベクトル $v\in T_xM$ について

$$
T_{ab}v^av^b\ge0
$$

> を満たすとき、弱エネルギー条件（weak energy condition, WEC）を満たすという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr35-wec -->
**定義の確認**：塵と任意の観測者。上と同じ $T_{ab}=\rho u_au_b$、$\rho\ge0$ に対して、任意の未来向き単位時間的 $v$ を取ります。$\gamma:=-g(u,v)\ge1$ は両観測者の相対Lorentz因子なので、

$$
T(v,v)=\rho(u\cdot v)^2=\rho\gamma^2\ge0.
$$

$v=u$ の一例だけを調べるのでなく、$\gamma\ge1$ の全範囲で確認しました。
<!-- definition-example-end -->

WECからNECが従うことも確かめられます。任意の非零未来向き光的 $k$ に対し、局所正規直交枠で $k=(k^0,\boldsymbol{k})$、$k^0=|\boldsymbol{k}|>0$ と書きます。$0\le s<1$ について $w_s=(k^0,s\boldsymbol{k})$ は未来向き時間的なので $T(w_s,w_s)\ge0$（正の倍率で単位化してWECを適用）。$s\uparrow1$ の連続性で $T(k,k)\ge0$ が得られます。逆にNECだけでは時間的方向の密度の符号は決まりません。

もう一つの要請は、観測者に対するエネルギー・運動量の流れが光より速くならないことです。[GR8の応力テンソル](../GR8/index.md#def-gr8-perfect-fluid-stress)の混合成分を使い、観測者 $v$ に付随するエネルギー流ベクトルを $J^a=-T^a{}_bv^b$ と置きます。局所正規直交枠で $v=(1,0,0,0)$ なら、$J^0=T_{00}$、$J^i=-T_{i0}$ です。従って $J$ が未来因果的という条件は、非負のエネルギーと、エネルギー流束の大きさがエネルギー密度を超えないことを同時に表します。「因果的」は時間的または光的（零ベクトルも許す）を意味します。

<a id="def-gr35-dec"></a>

<!-- formal-statement-start -->
> **定義（優越エネルギー条件）**
> 4次元Lorentz時空の点 $x$ で対称テンソル $T_{ab}$ を考える。任意の未来向き単位時間的ベクトル $v$ に対応するエネルギー流を

$$
J^a=-T^a{}_bv^b
$$

> とする。すべての $v$ に対して $J$ が未来向き因果的（零ベクトルも含む）であるとき、優越エネルギー条件（dominant energy condition, DEC）を満たすという。零でない $J$ には、未来向き正規直交枠で $J^0>0$ と $g(J,J)\le0$ を要求する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr35-dec -->
**定義の確認**：正密度の塵。混合テンソル $T^a{}_b=\rho u^au_b$ から

$$
J^a=-\rho u^a(u\cdot v)=\rho\gamma u^a,
\qquad g(J,J)=-\rho^2\gamma^2\le0.
$$

$\rho>0$ なら $u$ と同じ未来向き、$\rho=0$ なら零なので、任意の $v$ についてDECが成立します。さらに未来因果的 $J$ と未来時間的 $v$ の内積は非正だから、$T(v,v)=-g(J,v)\ge0$。従ってDECはWECを含みます。
<!-- definition-example-end -->

## 3. 重力で効く時間的な条件

時間的な測地線を集束させるのは $T(v,v)$ そのものではなく、Einstein方程式からRicci曲率へ移したときに現れる**跡を差し引いた組合せ**です。ここでは宇宙項の寄与を物質 $T$ の中へ吸収せず、左辺に保つ規約を用います。

<a id="def-gr35-sec"></a>

<!-- formal-statement-start -->
> **定義（強エネルギー条件）**
> 4次元Lorentz時空の点 $x$ で対称テンソル $T_{ab}$ が、すべての未来向き単位時間的 $v\in T_xM$ に対し、跡 $T=g^{ab}T_{ab}$ を用いて

$$
\left(T_{ab}-\frac12Tg_{ab}\right)v^av^b\ge0
$$

> を満たすとき、強エネルギー条件（strong energy condition, SEC）を満たすという。ここで $T$ は物質テンソルのみを指す。宇宙項を右辺へ移した場合は、その右辺全体に対して改めて判定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr35-sec -->
**定義の確認**：塵。$T_{ab}=\rho u_au_b$、$T=-\rho$ だから、任意の単位時間的 $v$ について

$$
\begin{aligned}
\left(T_{ab}-\frac12Tg_{ab}\right)v^av^b
&=\rho(u\cdot v)^2+\frac\rho2g(v,v)\\
&=\rho\left(\gamma^2-\frac12\right)\ge\frac\rho2\ge0.
\end{aligned}
$$

$\gamma\ge1$ を使い全観測者で確認しました。SECは名前の「強さ」に反して、WEC・DECの単純な上位条件ではありません。
<!-- definition-example-end -->

## 4. 完全流体では四条件をどう判定するか

異なる観測者をすべて走査するのは大変ですが、[GR8の完全流体テンソル](../GR8/index.md#def-gr8-perfect-fluid-stress)には特別な対称性があります。静止系でのエネルギー密度 $\rho$ と等方圧力 $p$ だけから

$$
T_{ab}=(\rho+p)u_au_b+pg_{ab},\qquad
T=-\rho+3p
$$

と表されます。ここで $\rho,p$ は同じ点での実数です。静止正規直交枠では $T_{\hat a\hat b}=\operatorname{diag}(\rho,p,p,p)$ です。一般の未来単位時間的 $v$ は $v=(\gamma,\gamma\boldsymbol\beta)$、$\gamma=(1-|\boldsymbol\beta|^2)^{-1/2}\ge1$、$|\boldsymbol\beta|<1$ と書けます。光的 $k$ は $k=(E,E\boldsymbol n)$、$E>0$、$|\boldsymbol n|=1$ と書けます。この座標表示は署名 $(-,+,+,+)$ と各ベクトルの規格化条件を解いたものです。

<a id="thm-gr35-fluid-criteria"></a>

<!-- formal-statement-start -->
> **定理（完全流体のエネルギー条件の必要十分判定）**
> 4次元Lorentz時空の一点で $g(u,u)=-1$ とし、実数 $\rho,p$ から $T_{ab}=(\rho+p)u_au_b+pg_{ab}$ を定める。このテンソルに対し、各条件はそれぞれ次と必要十分である。

$$
\begin{aligned}
\mathrm{NEC}&\iff\rho+p\ge0,\\
\mathrm{WEC}&\iff\rho\ge0\ \text{かつ}\ \rho+p\ge0,\\
\mathrm{SEC}&\iff\rho+p\ge0\ \text{かつ}\ \rho+3p\ge0,\\
\mathrm{DEC}&\iff\rho\ge|p|.
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

光的方向では圧力の計量項が消えます。時間的方向では相対Lorentz因子 $\gamma$ を $1$ から無限大まで動かし、切片と傾きを別々に調べます。DECだけは $J=-T(\cdot,v)^\sharp$ の因果性を直接確かめます。

<!-- proof-start -->
### 証明

まず静止正規直交枠で $k=(E,E\boldsymbol n)$ と置くと、$g(k,k)=0$ だから

$$
T(k,k)=(\rho+p)(u\cdot k)^2+pg(k,k)=(\rho+p)E^2.
$$

$E>0$ は任意なので、NECは $\rho+p\ge0$ と同値です。次に $v=(\gamma,\gamma\boldsymbol\beta)$ とすると、$u\cdot v=-\gamma$、$g(v,v)=-1$ なので

$$
T(v,v)=(\rho+p)\gamma^2-p
=\rho+(\rho+p)(\gamma^2-1).
$$

すべての $\gamma\ge1$ で非負なら $\gamma=1$ から $\rho\ge0$。もし $\rho+p<0$ なら $\gamma\to\infty$ で負になるので $\rho+p\ge0$ も必要です。逆向きは右辺二項の非負性から従い、WECの同値性が出ます。

SECの縮約は $g(v,v)=-1$、$T=-\rho+3p$ を代入して

$$
\begin{aligned}
S(v,v)&:=\left(T_{ab}-\frac12Tg_{ab}\right)v^av^b\\
&=(\rho+p)\gamma^2-p+\frac12(-\rho+3p)\\
&=\frac{\rho+3p}{2}+(\rho+p)(\gamma^2-1).
\end{aligned}
$$

$\gamma=1$ と $\gamma\to\infty$ の両端を調べれば、二つの条件は必要です。両方非負なら式の各項が非負なので十分でもあります。

最後に $T^a{}_b=\operatorname{diag}(-\rho,p,p,p)$ だから

$$
J=-T^a{}_bv^b=(\rho\gamma,-p\gamma\boldsymbol\beta),
\qquad g(J,J)=-\gamma^2(\rho^2-p^2|\boldsymbol\beta|^2).
$$

DECなら $v=u$ を取って $\rho\ge0$。さらに任意の $|\boldsymbol\beta|<1$ で $g(J,J)\le0$ を要求するので、$|\boldsymbol\beta|\uparrow1$ から $\rho^2\ge p^2$。従って $\rho\ge|p|$ が必要です。逆に $\rho\ge|p|$ なら $J^0=\rho\gamma\ge0$、$\rho^2-p^2|\boldsymbol\beta|^2\ge0$。$\rho>0$ なら $J$ は未来因果的、$\rho=0$ なら $p=0$ で $J=0$ です。これで十分性も示されました。$\square$
<!-- proof-end -->

この定理から、DECならWEC、WECならNECが従います。またSECもNECを含みますが、SECとWECは一般にはどちらからも他方を導けません。たとえば $\rho=-1,p=1$ はSECを満たしますがWECを満たさず、$\rho=2,p=-1$ はWECを満たしますがSECを満たしません。いずれも[完全流体の判定](#thm-gr35-fluid-criteria)へ直接代入して確かめられます。

### 4.1 物質を替えると何が起こるか

| 物質・状態 | $\rho,p$ または静止系の応力 | 成立する条件（$\rho>0$） |
|---|---|---|
| 塵 | $p=0$ | NEC、WEC、SEC、DEC |
| 等方放射流体 | $p=\rho/3$ | NEC、WEC、SEC、DEC |
| 負圧流体 | $p=-\rho/2$ | NEC、WEC、DEC、SECは不成立 |
| 真空型流体 | $p=-\rho$ | NECは等号、WEC・DEC成立、SECは不成立 |
| 極端な負圧 | $p=-2\rho$ | 四条件とも不成立 |

負圧でもNECが常に破れるわけではないことが重要です。$p=-\rho/2$ なら $\rho+p=\rho/2>0$ ですが、$\rho+3p=-\rho/2<0$ です。SECの失敗は「正の密度がない」ことではなく、**圧力が時間的Ricci縮約へ寄与する組合せ**の符号によって起こります。

完全流体以外も見てみましょう。[GR9の電磁場応力テンソル](../GR9/index.md#thm-gr9-em-stress)を、局所正規直交枠の $x$ 方向に純電場がある場合に評価すると、$\rho_E>0$ として $T_{\hat a\hat b}=\operatorname{diag}(\rho_E,-\rho_E,\rho_E,\rho_E)$、跡は零です。$k_\parallel=(1,1,0,0)$ と $k_\perp=(1,0,1,0)$ はどちらも未来光的で、

$$
T(k_\parallel,k_\parallel)=\rho_E-\rho_E=0,
\qquad T(k_\perp,k_\perp)=\rho_E+\rho_E=2\rho_E>0.
$$

電磁場は主軸に応じてNECが飽和します。方向依存性があるため、等方流体の $p$ 一つに押し込んで判定することはできません。

## 5. エネルギー条件とRicci集束をつなぐ

Einstein方程式は物質の不等式ではありません。物質の条件を仮定し、その上で場の方程式を使うときに初めて、幾何側の集束条件が得られます。[GR12の跡を用いたRicci表示](../GR12/index.md#prop-gr12-trace-reverse)は

$$
R_{ab}=8\pi\left(T_{ab}-\frac12Tg_{ab}\right)+\Lambda g_{ab}
$$

でした。ここで$\Lambda$は定数であり、$T$ は物質だけです。光的・時間的で $g(k,k)=0$ と $g(v,v)=-1$ が異なることに注目します。

<a id="prop-gr35-ricci-convergence"></a>

<!-- formal-statement-start -->
> **命題（Einstein方程式とRicci集束条件）**
> 4次元Lorentz時空で $G_{ab}+\Lambda g_{ab}=8\pi T_{ab}$ が成り立つとする。任意の光的 $k$ と単位時間的 $v$ について

$$
\begin{aligned}
R_{ab}k^ak^b&=8\pi T_{ab}k^ak^b,\\
R_{ab}v^av^b&=8\pi\left(T_{ab}-\frac12Tg_{ab}\right)v^av^b-\Lambda.
\end{aligned}
$$

> 従ってNECは $R(k,k)\ge0$（零Ricci集束条件）と同値である。一方、SECは $R(v,v)+\Lambda\ge0$ と同値であり、$R(v,v)\ge0$（時間的Ricci集束条件）を保証するには、例えば $\Lambda\le0$、またはすべての単位時間的 $v$ で跡反転縮約が $\Lambda/(8\pi)$ 以上という追加条件が要る。
<!-- formal-statement-end -->

### 証明の見取り図

同じRicci表示に光的ベクトルと単位時間的ベクトルをそれぞれ代入し、計量項が消えるか $-1$ になるかを調べます。宇宙項は光的縮約から消えても時間的縮約からは消えません。

<!-- proof-start -->
### 証明

[GR12の跡反転公式](../GR12/index.md#prop-gr12-trace-reverse)に $k^ak^b$ を掛け、$g_{ab}k^ak^b=0$ を使うと

$$
R_{ab}k^ak^b=8\pi T_{ab}k^ak^b
-4\pi T\underbrace{g_{ab}k^ak^b}_{0}
+\Lambda\underbrace{g_{ab}k^ak^b}_{0}=8\pi T(k,k).
$$

同じ式に $v^av^b$ を掛け、$g(v,v)=-1$ とすると

$$
R(v,v)=8\pi T(v,v)+4\pi T-\Lambda
=8\pi\left[T(v,v)+\frac T2\right]-\Lambda.
$$

角括弧内は定義したSECの縮約 $S(v,v)$ です。$8\pi>0$ なので、それぞれの非負性の同値関係と追加条件が直ちに得られます。$\square$
<!-- proof-end -->

**宇宙項の直接例。** 物質を $T=0$ とした正の定数 $\Lambda>0$ のEinstein解では $R_{ab}=\Lambda g_{ab}$。任意の光的 $k$ に $R(k,k)=0$、単位時間的 $v$ に $R(v,v)=-\Lambda<0$ です。物質のSECは零で成立していますが、時間的Ricci集束は成立しません。物質を再定義して宇宙項を右辺へ移せば $T^{(\Lambda)}_{ab}=-(\Lambda/8\pi)g_{ab}$ となり、$\rho_\Lambda=\Lambda/(8\pi)$、$p_\Lambda=-\rho_\Lambda$ です。この有効流体はNECを飽和し、WEC・DECを満たしますが、SECを破ります。左右どちらに置くかで「物質がSECを満たす」という文の意味が変わるので、規約を揃える必要があります。

## 6. 集束評価は何を証明し、何を証明しないか

[GR34の光的Raychaudhuri方程式](../GR34/index.md#thm-gr34-null-raychaudhuri)と[時間的Raychaudhuri方程式](../GR34/index.md#thm-gr34-timelike-raychaudhuri)を使います。光的合同はアフィンパラメータ $\lambda$、時間的合同は固有時 $\tau$ で測るものとし、回転が零で、比較する流線上で場の方程式とエネルギー条件が保たれると仮定します。集束とは膨張が負のまま減少し、偏差行列が正則な合同の記述を有限パラメータで維持できなくなることです。個々の測地線の延長不能性とは区別します。

<a id="prop-gr35-energy-focusing"></a>

<!-- formal-statement-start -->
> **命題（エネルギー条件から得る測地線合同の集束評価）**
> 4次元Lorentz時空にEinstein方程式が成り立つとする。滑らかな光的測地線合同がアフィンパラメータ $\lambda$ を持ち、ある流線に沿って回転零、NEC、負の初期膨張を満たすとする。この流線の滑らかな非焦点表示を維持できるアフィン長には、次の上限がある。

$$
\lambda\le\frac{2}{|\hat\theta_0|},\qquad \hat\theta_0<0.
$$

> また滑らかな単位時間的測地線合同が固有時 $\tau$ を持ち、ある流線に沿って回転零、$R(u,u)\ge0$、負の初期膨張を満たすとき、その上限は次である。

$$
\tau\le\frac{3}{|\theta_0|},\qquad \theta_0<0.
$$

> 後者のRicci条件は物質SECと $\Lambda\le0$ から従う。いずれの結論も個々の測地線の不完備性を意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

NECから光的Ricciの非負性を導き、時間的にはSECと宇宙項の符号を別々に点検します。残るせん断二乗は非負、回転は零なので、どちらも負の二乗で押さえられます。膨張率の逆数を積分すると、非焦点表示が続けられる長さの上限が出ます。

<!-- proof-start -->
### 証明

光的には[Ricci縮約の命題](#prop-gr35-ricci-convergence)とNECから $R(k,k)\ge0$。回転零を[GR34の光的方程式](../GR34/index.md#thm-gr34-null-raychaudhuri)へ代入し、せん断の非負平方を落とすと

$$
\frac{d\hat\theta}{d\lambda}
=-\frac{\hat\theta^2}{2}-\hat\sigma_{ab}\hat\sigma^{ab}-R(k,k)
\le-\frac{\hat\theta^2}{2}.
$$

初期値が負なので、滑らかな間 $\hat\theta<0$ を保ちます。従って

$$
\frac{d}{d\lambda}\left(\frac1{\hat\theta}\right)
=-\frac{\hat\theta'}{\hat\theta^2}\ge\frac12,
\qquad \frac1{\hat\theta(\lambda)}\ge
\frac1{\hat\theta_0}+\frac\lambda2.
$$

$\lambda=2/|\hat\theta_0|$ では右辺が零になり、負の左辺と矛盾するため、その時点まで滑らかな非焦点表示は続けられません。

時間的には[Ricci縮約の命題](#prop-gr35-ricci-convergence)より、SECと $\Lambda\le0$ なら $R(u,u)\ge-\Lambda\ge0$ です。[GR34の時間的方程式](../GR34/index.md#thm-gr34-timelike-raychaudhuri)から

$$
\theta'=-\frac{\theta^2}{3}-\sigma_{ab}\sigma^{ab}-R(u,u)
\le-\frac{\theta^2}{3},\qquad
\frac1{\theta(\tau)}\ge\frac1{\theta_0}+\frac\tau3.
$$

同様の符号の矛盾で上限 $3/|\theta_0|$ が得られます。この比較論法は[GR34の集束評価](../GR34/index.md#prop-gr34-focusing)と整合します。$\square$
<!-- proof-end -->

回転が零でないとRaychaudhuri式に正の回転平方が残り、同じ不等式が一般に成立しません。また最初の点だけでNECが成り立っても、流線に沿って保たれなければ積分できません。時間的合同ではSECだけでなく正の宇宙項の寄与も検査しなければなりません。集束によって合同の偏差行列式が零になることと、曲率不変量が発散すること、個々の測地線が不完備であることは別です。平坦時空の入射放射光線でも焦点ができる[GR34の例](../GR34/index.md#prop-gr34-focusing)が、その区別の具体例です。

## 7. 演習：四条件の判定から集束まで

### Level A：方向と符号を直接計算する

<a id="ex-gr35-a01"></a>
#### GR35-A01 光的方向への縮約
- Level: A

完全流体の静止系で $T_{ab}=\operatorname{diag}(4,1,1,1)$ とする。$k=(2,2n_1,2n_2,2n_3)$、$n_1^2+n_2^2+n_3^2=1$ について $g(k,k)$、$T(k,k)$ を求め、NECを検証せよ。

<!-- solution-start -->
**詳細解答。** $g(k,k)=-4+4(n_1^2+n_2^2+n_3^2)=0$、$k^0=2>0$ なので未来光的です。テンソルの縮約は

$$
T(k,k)=4\cdot2^2+1\cdot4(n_1^2+n_2^2+n_3^2)
=16+4=20>0.
$$

方向 $\boldsymbol n$ を任意にしても同じなのでNEC成立です。[完全流体の判定](#thm-gr35-fluid-criteria)では $\rho+p=5>0$、$E^2=4$ により $20$ と再確認できます。
<!-- solution-end -->

<a id="ex-gr35-a02"></a>
#### GR35-A02 動く観測者のエネルギー密度
- Level: A

静止系で $\rho=3,p=-1$ の完全流体を考え、$v=(5/4,3/4,0,0)$ の規格化を確かめて $T(v,v)$ を計算せよ。WECの判定に静止観測者の値だけで足りるか。

<!-- solution-start -->
**詳細解答。** $g(v,v)=-25/16+9/16=-1$、$v^0>0$ なので未来単位時間的です。$\gamma=5/4$ を用い

$$
T(v,v)=(3-1)\frac{25}{16}-(-1)
=\frac{50}{16}+\frac{16}{16}=\frac{33}{8}>0.
$$

一人分の値が正でもWECの全称条件は検証できません。この流体については[必要十分判定](#thm-gr35-fluid-criteria)を使い、$\rho=3\ge0$、$\rho+p=2\ge0$ の二条件を調べて初めて全観測者で成立すると結論できます。
<!-- solution-end -->

<a id="ex-gr35-a03"></a>
#### GR35-A03 負圧と四条件
- Level: A

$\rho=2,p=-1$ の完全流体についてNEC・WEC・SEC・DECの成立をそれぞれ判定せよ。SECが失敗する直接の縮約も求めよ。

<!-- solution-start -->
**詳細解答。** $\rho+p=1>0$ でNEC成立。$\rho=2>0$ と合わせWEC成立。$\rho+3p=2-3=-1<0$ でSEC不成立。$\rho=2\ge|p|=1$ でDEC成立です。流体と共動する $v=u$ では

$$
S(u,u)=\frac{\rho+3p}{2}=-\frac12<0.
$$

この具体的な時間的方向でSECの全称条件を破ります。
<!-- solution-end -->

<a id="ex-gr35-a04"></a>
#### GR35-A04 正の宇宙項のRicci縮約
- Level: A

$T_{ab}=0$、$\Lambda=L>0$ のEinstein解で、$R_{ab}k^ak^b$ と $R_{ab}v^av^b$ を求めよ。ただし $k$ は光的、$v$ は単位時間的とする。

<!-- solution-start -->
**詳細解答。** [Ricciの跡反転公式](../GR12/index.md#prop-gr12-trace-reverse)で $T=0$ を代入すると $R_{ab}=L g_{ab}$。従って

$$
R(k,k)=L\underbrace{g(k,k)}_{0}=0,
\qquad R(v,v)=L\underbrace{g(v,v)}_{-1}=-L<0.
$$

物質SECは $T=0$ なので成立しますが、時間的Ricci集束条件は破れます。光的集束条件は等号で成立します。
<!-- solution-end -->

<a id="ex-gr35-a05"></a>
#### GR35-A05 優越条件の流束
- Level: A

$\rho=3,p=2$ の完全流体の静止系で $v=(5/4,3/4,0,0)$ とし、$J=-T^a{}_bv^b$ の成分と $g(J,J)$ を求めよ。

<!-- solution-start -->
**詳細解答。** $T^a{}_b=\operatorname{diag}(-3,2,2,2)$ ですから

$$
J=(15/4,-3/2,0,0),\quad
g(J,J)=-\frac{225}{16}+\frac94=-\frac{189}{16}<0.
$$

$J^0=15/4>0$ より未来時間的であり、この観測者の流束は因果的です。全観測者については $\rho=3\ge|p|=2$ を[必要十分判定](#thm-gr35-fluid-criteria)で確認してDEC成立とします。
<!-- solution-end -->

### Level B：定義から必要十分条件へ

<a id="ex-gr35-b01"></a>
#### GR35-B01 一般のLorentz因子で弱・強条件を再導出
- Level: B

$T_{ab}=(\rho+p)u_au_b+pg_{ab}$ と $T=-\rho+3p$ だけを出発点として、任意の未来単位時間的 $v$ に $\gamma=-u\cdot v\ge1$ を置く。WEC・SECの条件がそれぞれ定理中の二つの不等式と必要十分になることを再導出せよ。

<!-- solution-start -->
**詳細解答。** $g(v,v)=-1$ から $T(v,v)=(\rho+p)\gamma^2-p=\rho+(\rho+p)(\gamma^2-1)$。$\gamma=1$ で $\rho\ge0$ が必要、$\gamma\to\infty$ で係数 $\rho+p\ge0$ が必要です。両者があれば右辺は全 $\gamma\ge1$ で非負です。続いて

$$
\begin{aligned}
S(v,v)&=T(v,v)-\tfrac12Tg(v,v)\\
&=\rho+(\rho+p)(\gamma^2-1)+\tfrac12(-\rho+3p)\\
&=\tfrac12(\rho+3p)+(\rho+p)(\gamma^2-1).
\end{aligned}
$$

$\gamma=1$ で $\rho+3p\ge0$、$\gamma\to\infty$ で $\rho+p\ge0$ が必要で、両者の非負性から十分性も従います。$\gamma$ は任意の相対速度 $0\le|\boldsymbol\beta|<1$ で全区間 $[1,\infty)$ を動けるので、極限での必要性が正当化されます。
<!-- solution-end -->

<a id="ex-gr35-b02"></a>
#### GR35-B02 異方性応力の零エネルギー条件
- Level: B

局所正規直交枠で $T_{ab}=\operatorname{diag}(\rho,p_1,p_2,p_3)$ とする。任意の未来光的 $k$ から、NECが $\rho+p_i\ge0$（$i=1,2,3$）と必要十分であることを導け。$\rho=2$、$(p_1,p_2,p_3)=(-3,0,1)$ を判定せよ。

<!-- solution-start -->
**詳細解答。** $k=(E,E n_1,E n_2,E n_3)$、$E>0$、$\sum_i n_i^2=1$ と置くと

$$
\frac{T(k,k)}{E^2}=\rho+\sum_{i=1}^3p_i n_i^2
=\sum_{i=1}^3(\rho+p_i)n_i^2.
$$

全 $\rho+p_i\ge0$ なら各項非負で十分です。逆に各座標軸方向 $n_i=1$、他を零とする光的方向を選べば $\rho+p_i\ge0$ が必要です。数値例は $\rho+p_1=-1<0$、$\rho+p_2=2$、$\rho+p_3=3$ なのでNEC不成立です。$k=(1,1,0,0)$ が具体的な反例です。
<!-- solution-end -->

<a id="ex-gr35-b03"></a>
#### GR35-B03 塵と宇宙項を別々に縮約
- Level: B

$T_{ab}=\rho u_au_b$、$\rho>0$、$\Lambda>0$ とする。場の方程式を仮定し、物質と共動する時間的 $u$ と任意の光的 $k$ についてRicci縮約を導け。時間的Ricci集束の成立条件を求めよ。

<!-- solution-start -->
**詳細解答。** 塵の跡は $T=-\rho$。[GR12のRicci表示](../GR12/index.md#prop-gr12-trace-reverse)に代入すると

$$
R_{ab}=8\pi\left(\rho u_au_b+\frac\rho2g_{ab}\right)+\Lambda g_{ab}.
$$

$g(u,u)=-1$ を二回縮約に使って

$$
R(u,u)=8\pi(\rho-\rho/2)-\Lambda=4\pi\rho-\Lambda.
$$

光的 $k$ については $g(k,k)=0$ で

$$
R(k,k)=8\pi\rho(u\cdot k)^2\ge0.
$$

従って共動する時間的方向のRicci集束は $\Lambda\le4\pi\rho$ と同値です。物質のSEC成立だけでは $\Lambda>4\pi\rho$ を排除できません。これは $u$ 方向の判定であり、任意の時間的 $v$ についての条件と混同しません。
<!-- solution-end -->

<a id="ex-gr35-b04"></a>
#### GR35-B04 二種類の有限集束上限
- Level: B

回転零の時間的測地線合同と光的測地線合同がある流線に沿って必要なRicci非負条件を満たすとする。初期膨張がそれぞれ $\theta_0=-4/L$、$\hat\theta_0=-3/L$（$L>0$）の場合、非焦点な表示を維持できる上限を求めよ。光的接ベクトルを非アフィンなものに取り直しても値をそのまま使えるか。

<!-- solution-start -->
**詳細解答。** [Raychaudhuri式からの集束評価](#prop-gr35-energy-focusing)では、時間的に $d(1/\theta)/d\tau\ge1/3$、光的に $d(1/\hat\theta)/d\lambda\ge1/2$ です。初期値を代入すると

$$
\frac1{\theta(\tau)}\ge-\frac L4+\frac\tau3,
\qquad
\frac1{\hat\theta(\lambda)}\ge-\frac L3+\frac\lambda2.
$$

右辺が零になる $\tau=3L/4$、$\lambda=2L/3$ がそれぞれの上限です。光的接ベクトル $k$ を非定数倍率 $f$ で $fk$ にすると一般にアフィン性を失い、[GR34の光的方程式](../GR34/index.md#thm-gr34-null-raychaudhuri)には非アフィン項が加わります。パラメータの目盛りも変わるため、$2L/3$ をそのまま転用できません。
<!-- solution-end -->

### Level C：宇宙項・負圧・集束を一つの模型で比較する

<a id="ex-gr35-c01"></a>
#### GR35-C01 負圧流体の光的集束と時間的反集束
- Level: C

4次元Lorentz時空の一点の物質が完全流体 $\rho=\rho_0>0$、$p=-\rho_0/2$ であり、正の宇宙項 $\Lambda>0$ を持つEinstein方程式が成り立つとする。

1. 物質のNEC・WEC・SEC・DECを判定し、宇宙項を右辺へ移したときの有効流体の $\rho_{\mathrm{eff}},p_{\mathrm{eff}}$ を求めよ。
2. 物質と共動する単位時間的 $u$ と未来光的 $k$ のRicci縮約を計算せよ。両者の符号が一致する必要はあるか。
3. 回転零のアフィン光的合同がこの物質条件を流線上で保ち、初期膨張 $\hat\theta_0=-2/L$（$L>0$）なら、非焦点表示が維持できる上限を求めよ。
4. 共動する時間的合同の一点で $\theta=0$、$\sigma=0$、$\omega=0$ なら、膨張の瞬間微分の符号を求めよ。これだけで大域的な測地不完備性が分かるか。

<!-- solution-start -->
**詳細解答。**

1. [完全流体の必要十分判定](#thm-gr35-fluid-criteria)では $\rho+p=\rho_0/2>0$ でNEC、$\rho>0$ なのでWEC、$\rho\ge|p|$ なのでDECが成立します。一方 $\rho+3p=-\rho_0/2<0$ でSEC不成立です。宇宙項を $T^{(\Lambda)}_{ab}=-(\Lambda/8\pi)g_{ab}$ として加えれば、$\rho_\Lambda=\Lambda/(8\pi)$、$p_\Lambda=-\Lambda/(8\pi)$。従って

$$
\rho_{\mathrm{eff}}=\rho_0+\frac\Lambda{8\pi},
\qquad p_{\mathrm{eff}}=-\frac{\rho_0}{2}-\frac\Lambda{8\pi}.
$$

2. 物質の跡は $T=-\rho_0+3(-\rho_0/2)=-5\rho_0/2$。共動 $u$ に対し $T(u,u)=\rho_0$、$g(u,u)=-1$ なので[Ricci縮約の命題](#prop-gr35-ricci-convergence)から

$$
\begin{aligned}
R(u,u)&=8\pi\left(T(u,u)+\frac T2\right)-\Lambda\\
&=8\pi\left(\rho_0-\frac{5\rho_0}{4}\right)-\Lambda
=-2\pi\rho_0-\Lambda<0.
\end{aligned}
$$

   光的には $g(k,k)=0$ なので

$$
R(k,k)=8\pi(\rho_0+p)(u\cdot k)^2
=4\pi\rho_0(u\cdot k)^2>0
$$

   です。光的と時間的の縮約は異なる条件を調べるため符号が一致する必要はありません。

3. NECが流線上で成り立ち回転零なので、[集束命題](#prop-gr35-energy-focusing)を使えます。逆数不等式は $1/\hat\theta(\lambda)\ge1/\hat\theta_0+\lambda/2=-L/2+\lambda/2$。従って $\lambda=L$ までに非焦点表示を失います。これはアフィン長の評価です。

4. [時間的Raychaudhuri方程式](../GR34/index.md#thm-gr34-timelike-raychaudhuri)でその点の膨張・せん断・回転が零なら、

$$
\left.\frac{d\theta}{d\tau}\right|_0=-R(u,u)
=2\pi\rho_0+\Lambda>0.
$$

   この点での流体は時間的な収束を強めるのでなく、局所的な膨張を強めます。逆に光的には集束上限があっても、どちらもその事実だけで測地線の延長不能性を導けません。大域的な因果条件や初期条件を追加して論じる必要があります。
<!-- solution-end -->

## 8. 次の問い

物質のNECは光的Ricci集束条件を与えます。しかし「光線束が有限アフィン長で焦点を持つ」と「事象地平線の生成線はその焦点を越えて地平線上に残るか」は、同じ問いではありません。GR36では、地平線の大域的な構造と生成線に必要な仮定を追加して、古典的な面積非減少の論法を調べます。GR37の特異点定理でも、局所集束と大域的な測地不完備性を区別します。
