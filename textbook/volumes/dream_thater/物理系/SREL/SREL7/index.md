# SREL7 保存則・相対論的連続体・完全流体

<!-- definition-example-audit: strict -->

[SREL6の電磁場の局所収支](../SREL6/index.md#thm-srel6-field-balance)から、電磁場のエネルギーや運動量の減少は、電荷と電流をもつ物質へ渡される量であると分かりました。しかし、物質を一個の質点ではなく、空間の各点に粒子が分布する流体として扱うには、粒子数、圧力、エネルギーの密度と流れをそろえて記述しなければなりません。

例えば静止した容器内で、流体は質量としてのエネルギーだけでなく内的エネルギーを持ち、容器の壁へ圧力を及ぼします。観測者が動くと、この圧力も運動量の流れに寄与します。**静止系で測定した密度・圧力から任意の慣性系の流束を作り、局所保存則から流体の運動を導けるか**が本章の問いです。

平坦な四次元Minkowski時空を用い、$x^\mu=(ct,x,y,z)$、$\eta_{\mu\nu}=\operatorname{diag}(1,-1,-1,-1)$、$\partial_\mu=(c^{-1}\partial_t,\partial_x,\partial_y,\partial_z)$、$c>0$ とします。ギリシャ添字は $0,1,2,3$、空間添字は $1,2,3$、反復添字は縮約します。場は議論する開領域で少なくとも $C^1$ 級、粒子の固有数密度 $n>0$、流体の三速度は $|\boldsymbol v|<c$ と仮定します。計量・四元速度は[SREL2のMinkowski計量](../SREL2/index.md#def-srel2-minkowski-metric)と[SREL3の四元速度](../SREL3/index.md#def-srel3-four-velocity)の規約です。

## 1. 粒子を数える保存則：流体が動くと密度はどう見えるか

まず圧力のない粒子群を想像します。流体と一緒に動く小体積で単位体積当たり $n$ 個の粒子があるなら、別の慣性系では体積のLorentz収縮によって同時刻の密度が $\gamma n$ になります。ただ密度だけを変換するより、密度と流れを**四元ベクトル**にまとめる方が自然です。

流体の四元速度を $u^\mu=\gamma(c,\boldsymbol v)$、$\gamma=(1-|\boldsymbol v|^2/c^2)^{-1/2}$ とし、[四元速度の規格化](../SREL3/index.md#thm-srel3-four-velocity)により $u_\mu u^\mu=c^2$ を満たします。

<a id="def-srel7-particle-current"></a>

<!-- formal-statement-start -->
> **定義（粒子数四元流束）**  
> Minkowski時空の開領域で、未来向き単位時間的四元速度 $u^\mu$（$u_\mu u^\mu=c^2$）と固有数密度 $n>0$ を持つ単一成分流体について、粒子数四元流束を次で定義する。

$$
N^\mu:=n u^\mu.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel7-particle-current -->
### 直接例：静止流体と等速で動く流体

**定義の確認**：静止系では $u^\mu=(c,0,0,0)$ で $u_\mu u^\mu=c^2$、$n=n_0>0$ とすると $N^\mu=(cn_0,0,0,0)$ です。$x$ 方向に速さ $v$ で流れる同じ流体では、$u^\mu=(\gamma c,\gamma v,0,0)$ で $u_\mu u^\mu=\gamma^2(c^2-v^2)=c^2$、$N^\mu=(\gamma cn_0,\gamma n_0v,0,0)$。したがって観測系で測る粒子数密度は $N^0/c=\gamma n_0$、粒子数流束は $N^1=\gamma n_0v$ です。
<!-- definition-example-end -->

<a id="thm-srel7-particle-continuity"></a>

<!-- formal-statement-start -->
> **定理（粒子数保存の四元表示）**  
> $C^1$ 級の $n>0$ と未来向き $u^\mu=\gamma(c,\boldsymbol v)$（$|\boldsymbol v|<c$）に対し、粒子数四元流束 $N^\mu=nu^\mu$ が局所粒子数保存 $\partial_\mu N^\mu=0$ を満たすことと、任意の慣性座標で次が成立することは同値である。

$$
\partial_t(\gamma n)+\nabla\cdot(\gamma n\boldsymbol v)=0.
$$

> さらに $D:=u^\mu\partial_\mu$、$\theta:=\partial_\mu u^\mu$ とおけば、同じ条件は $Dn+n\theta=0$ と同値である。
<!-- formal-statement-end -->

### 証明の見取り図

時間成分の微分で $c$ が相殺され、空間成分が三次元の発散になります。次に積の微分を使うと、流体に沿った微分と膨張率に分かれます。

<!-- proof-start -->
### 証明

定義より $N^0=\gamma nc$、$N^i=\gamma nv_i$ です。したがって

$$
\begin{aligned}
\partial_\mu N^\mu
&=\partial_0(\gamma nc)+\sum_{i=1}^3\partial_i(\gamma nv_i)\\
&=\frac1c\partial_t(\gamma nc)+\nabla\cdot(\gamma n\boldsymbol v)\\
&=\partial_t(\gamma n)+\nabla\cdot(\gamma n\boldsymbol v).
\end{aligned}
$$

また積の微分を各成分に適用すれば

$$
\partial_\mu(nu^\mu)=u^\mu\partial_\mu n+n\partial_\mu u^\mu=Dn+n\theta.
$$

両式は同じ $\partial_\mu N^\mu$ の展開なので同値です。
<!-- proof-end -->

例えば $n$ が一定でも $\nabla\cdot(\gamma\boldsymbol v)\ne0$ なら粒子数保存と両立するとは限りません。「固有密度が一定」と「流体が非圧縮である」は同一の条件ではないのです。

### 有限領域での粒子数収支

滑らかな有界領域 $\Omega\subset\mathbb R^3$ と外向き法線 $\boldsymbol\nu$ について、$\gamma n\boldsymbol v$ が境界まで $C^1$ なら三次元の発散定理により

$$
\frac{d}{dt}\int_\Omega \gamma n\,d^3x
=-\int_{\partial\Omega}\gamma n\boldsymbol v\cdot\boldsymbol\nu\,dA.
$$

これは粒子が勝手に生滅しないという**模型上の仮定**です。化学反応や生成消滅を許せば右辺に源が加わり、同じ保存式を無条件には使えません。

## 2. 圧力を含む四元のエネルギー・運動量

エネルギー密度だけでは、隣の小体積を押す圧力を表せません。[電磁場のエネルギー運動量テンソル](../SREL6/index.md#def-srel6-em-energy-momentum)にならい、物質にも二階テンソル $T^{\mu\nu}$ を用意します。完全流体とは、局所的な流体静止系で**熱流束と粘性による異方的応力がなく、応力が等方的な圧力だけになる**理想化です。固有エネルギー密度 $\varepsilon$ には静止質量エネルギーと内的エネルギーを含め、固有圧力を $p$ とします。

<a id="def-srel7-perfect-fluid"></a>

<!-- formal-statement-start -->
> **定義（完全流体のエネルギー運動量テンソル）**  
> Minkowski時空で $u_\mu u^\mu=c^2$ を満たす未来向き流体四元速度 $u^\mu$、固有エネルギー密度 $\varepsilon$、等方圧力 $p$ を持ち、流体静止系で熱流束・粘性応力がない連続体のエネルギー運動量テンソルを次で定義する。

$$
T^{\mu\nu}:=\frac{\varepsilon+p}{c^2}u^\mu u^\nu-p\eta^{\mu\nu}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel7-perfect-fluid -->
### 直接例：静止系で定義の各成分を検算する

**定義の確認**：$u_*^\mu=(c,0,0,0)$ は $u_{*\mu}u_*^\mu=c^2$ を満たします。$T_*^{00}=(\varepsilon+p)-p=\varepsilon$、$T_*^{0i}=0$、$T_*^{ij}=-p(-\delta_{ij})=p\delta_{ij}$ です。したがって

$$
(T_*^{\mu\nu})=\operatorname{diag}(\varepsilon,p,p,p)
$$

となり、要求したエネルギー密度、流束なし、等方圧力の三条件を**実際に**確認できます。特に $T_*^{ii}=p$ は正符号です。
<!-- definition-example-end -->

<a id="prop-srel7-perfect-fluid-form"></a>

<!-- formal-statement-start -->
> **命題（静止系の等方性から共変な形を導く）**  
> $u_\mu u^\mu=c^2$ の局所静止系で $T_*^{\mu\nu}=\operatorname{diag}(\varepsilon,p,p,p)$ と測定される対称二階テンソルで、流体に付随する追加の優先方向が存在しないとする。このときどの慣性系でも

$$
T^{\mu\nu}=\frac{\varepsilon+p}{c^2}u^\mu u^\nu-p\eta^{\mu\nu}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

静止系で回転対称な対称二階テンソルには、$u^\mu u^\nu$ と $\eta^{\mu\nu}$ に対応する二つの係数しかありません。静止系の時間成分と空間成分を突き合わせて係数を決めます。

<!-- proof-start -->
### 証明

局所静止系で空間回転のすべてに対して不変な対称テンソルを考えます。時間空間部分は回転によって向きが変わる三成分ベクトルなので零です。空間空間部分は直交基底の軸反転で非対角成分が零になり、軸を入れ替える回転で三つの対角成分が等しくなります。したがって独立な係数は二つです。

共変に使える二階の対称テンソル $u^\mu u^\nu$ と $\eta^{\mu\nu}$ で $T^{\mu\nu}=Au^\mu u^\nu+B\eta^{\mu\nu}$ とおき、静止系へ代入します。空間対角成分から

$$
T_*^{ii}=0+B(-1)=p,\qquad B=-p.
$$

時間成分から $T_*^{00}=Ac^2+B=\varepsilon$ なので $A=(\varepsilon+p)/c^2$。この二つを戻して主張を得ます。テンソルの等式なので静止系で確認した形はどの慣性座標でも成立します。
<!-- proof-end -->

この導出では**構成則としての等方性**を使いました。電磁場の応力のような異方的な成分をもつものや、熱が流れる粘性流体を同じ二つのスカラーだけで表すことはできません。

<a id="prop-srel7-lab-components"></a>

<!-- formal-statement-start -->
> **命題（観測系における完全流体の成分）**  
> $u^\mu=\gamma(c,\boldsymbol v)$、$|\boldsymbol v|<c$、$\gamma=(1-|\boldsymbol v|^2/c^2)^{-1/2}$ とし、完全流体テンソルを前定義のものとする。すると

$$
\begin{aligned}
T^{00}&=(\varepsilon+p)\gamma^2-p,\\
T^{0i}&=(\varepsilon+p)\gamma^2v_i/c,\\
T^{ij}&=(\varepsilon+p)\gamma^2v_iv_j/c^2+p\delta_{ij}.
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

$u^0=\gamma c$、$u^i=\gamma v_i$ を二つの添字へ代入し、$\eta^{00}=1$、$\eta^{0i}=0$、$\eta^{ij}=-\delta_{ij}$ をそれぞれ使います。

<!-- proof-start -->
### 証明

定義の二つの項を順に計算します。$\mu=\nu=0$ のとき

$$
T^{00}=\frac{\varepsilon+p}{c^2}(\gamma c)^2-p\eta^{00}
=(\varepsilon+p)\gamma^2-p.
$$

時間空間成分は

$$
T^{0i}=\frac{\varepsilon+p}{c^2}(\gamma c)(\gamma v_i)-p\eta^{0i}
=(\varepsilon+p)\gamma^2v_i/c.
$$

空間成分では $\eta^{ij}=-\delta_{ij}$ だから

$$
T^{ij}=\frac{\varepsilon+p}{c^2}(\gamma v_i)(\gamma v_j)+p\delta_{ij}.
$$

同じ定義から三式が得られ、対称性 $T^{0i}=T^{i0}$ も確認できます。
<!-- proof-end -->

$T^{00}$ は観測系のエネルギー密度、$cT^{i0}$ はエネルギー流束、$T^{0i}/c$ は運動量密度、$T^{ij}$ は $j$ 方向へ流れる $i$ 方向運動量の流束です。**圧力 $p$ は単なる静止系の付け足しではなく、動く観測者にはエネルギー流の係数 $\varepsilon+p$ として現れます。**

### 例：圧力のある一様流体を観測する

静止系で $\varepsilon=\varepsilon_0$、$p=p_0$（ともに一定）とし、$x$ 方向へ三速度 $v$ の流体を観測します。上式から

$$
\begin{aligned}
T^{00}&=\gamma^2(\varepsilon_0+p_0)-p_0,\\
T^{01}&=\gamma^2(\varepsilon_0+p_0)v/c,\\
T^{11}&=\gamma^2(\varepsilon_0+p_0)v^2/c^2+p_0,\\
T^{22}&=T^{33}=p_0.
\end{aligned}
$$

$T^{01}=T^{10}$ を用いるとエネルギー流は $cT^{10}=\gamma^2(\varepsilon_0+p_0)v$、運動量密度は $T^{01}/c=\gamma^2(\varepsilon_0+p_0)v/c^2$。両者を混同せず $c^2$ の違いで結べます。

## 3. 保存則を流体に沿う式と横方向の式へ分ける

粒子数の保存は一つのスカラー方程式でした。エネルギー運動量の保存は四本の方程式です。物質が電磁場から力を受けるなら、[SREL6のLorentz力密度](../SREL6/index.md#thm-srel6-field-balance)

$$
f^\nu:=F^{\nu\alpha}J_\alpha
$$

を右辺に置きます。電磁場のない自由な流体では $f^\nu=0$ です。一般に以下の導出は与えられた滑らかな四元力密度 $f^\nu$ に対して成立します。電荷の模型を含めるときは、その四元力が実際に上記の電磁力であることを別に確認します。

流体の四元速度 $u^\mu$ に沿った微分を $D=u^\mu\partial_\mu$、膨張率を $\theta=\partial_\mu u^\mu$、四元加速度を $a^\nu=Du^\nu$ とします。$D=\gamma(\partial_t+\boldsymbol v\cdot\nabla)$ は流体の粒子とともに進む観測の微分です。

加速度と空間的圧力勾配を分けるため、$u^\mu$ に直交する方向だけを取り出す演算子も必要になります。

<a id="def-srel7-orth-projector"></a>

<!-- formal-statement-start -->
> **定義（流体に直交する射影テンソル）**  
> Minkowski計量 $\eta_{\mu\nu}$ と $u_\mu u^\mu=c^2$ を満たす未来向き四元速度 $u^\mu$ に対し、$u$ に直交する部分への射影を次で定義する。

$$
\Delta^\mu{}_\nu:=\delta^\mu{}_\nu-\frac{u^\mu u_\nu}{c^2},
\qquad
\Delta^{\mu\nu}:=\eta^{\mu\nu}-\frac{u^\mu u^\nu}{c^2}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel7-orth-projector -->
### 直接例：流体静止系で時間方向が落ちる

**定義の確認**：$u_*^\mu=(c,0,0,0)$ なら $\Delta_*^\mu{}_\nu=\operatorname{diag}(0,1,1,1)$ です。実際、任意の $X^\mu=(X^0,\boldsymbol X)$ に対して $\Delta^\mu{}_\nu X^\nu=(0,\boldsymbol X)$ となり、$u_{*\mu}\Delta^\mu{}_\nu X^\nu=0$ を満たします。さらに

$$
\Delta^\mu{}_\alpha\Delta^\alpha{}_\nu
=\delta^\mu{}_\nu-2u^\mu u_\nu/c^2+u^\mu(u_\alpha u^\alpha)u_\nu/c^4
=\Delta^\mu{}_\nu
$$

なので二度射影しても変わりません。添字を上げた $\Delta_*^{ij}=-\delta_{ij}$ は負号を持つ点にも注意します。
<!-- definition-example-end -->

<a id="thm-srel7-fluid-balance"></a>

<!-- formal-statement-start -->
> **定理（完全流体の局所収支と相対論的Euler方程式）**  
> Minkowski時空の開領域で $C^1$ 級の $\varepsilon,p,u^\mu,f^\nu$ が与えられ、$u_\mu u^\mu=c^2$ とする。完全流体の

$$
T^{\mu\nu}=\frac{\varepsilon+p}{c^2}u^\mu u^\nu-p\eta^{\mu\nu}
$$

> が $\partial_\mu T^{\mu\nu}=f^\nu$ を満たすことは、次のエネルギー方程式と $u$ に直交するEuler方程式の組と同値である。

$$
\boxed{D\varepsilon+(\varepsilon+p)\theta=u_\nu f^\nu}
$$

$$
\boxed{\frac{\varepsilon+p}{c^2}a^\alpha-\Delta^{\alpha\nu}\partial_\nu p
=\Delta^\alpha{}_\nu f^\nu}
$$

> ここで $D=u^\mu\partial_\mu$、$\theta=\partial_\mu u^\mu$、$a^\alpha=Du^\alpha$、$\Delta^\alpha{}_\nu=\delta^\alpha{}_\nu-u^\alpha u_\nu/c^2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$T$ を積の微分で展開し、$u_\nu a^\nu=0$ を規格化条件から導きます。四本の収支式を、$u$ 方向への縮約一本と、それに直交する三本へ分割します。逆向きには、その二つの射影の和が恒等写像になることを使います。

<!-- proof-start -->
### 証明

$h:=\varepsilon+p$ とおきます。Minkowski計量は一定なので、積の微分は

$$
\begin{aligned}
\partial_\mu T^{\mu\nu}
&=\frac1{c^2}\partial_\mu(hu^\mu u^\nu)-\partial^\nu p\\
&=\frac{u^\nu}{c^2}\{Dh+h\theta\}
+\frac{h}{c^2}u^\mu\partial_\mu u^\nu-\partial^\nu p\\
&=\frac{u^\nu}{c^2}(D\varepsilon+Dp+h\theta)
+\frac{h}{c^2}a^\nu-\partial^\nu p.
\end{aligned}
$$

まず $u_\nu u^\nu=c^2$ を流体方向に微分します。

$$
D(u_\nu u^\nu)=2u_\nu Du^\nu=2u_\nu a^\nu=D(c^2)=0.
$$

ゆえに $u_\nu a^\nu=0$。先ほどの発散式に $u_\nu$ を掛けると、$u_\nu u^\nu=c^2$、$u_\nu\partial^\nu p=Dp$ から

$$
\begin{aligned}
u_\nu\partial_\mu T^{\mu\nu}
&=(D\varepsilon+Dp+h\theta)
+\frac h{c^2}(u_\nu a^\nu)-Dp\\
&=D\varepsilon+h\theta.
\end{aligned}
$$

$\partial_\mu T^{\mu\nu}=f^\nu$ なら第一式を得ます。次は射影 $\Delta^\alpha{}_\nu$ を掛けます。$\Delta^\alpha{}_\nu u^\nu=0$、$u_\nu a^\nu=0$ より $\Delta^\alpha{}_\nu a^\nu=a^\alpha$ です。また

$$
\Delta^\alpha{}_\nu\partial^\nu p
=\left(\delta^\alpha{}_\nu-\frac{u^\alpha u_\nu}{c^2}\right)\partial^\nu p
=\partial^\alpha p-\frac{u^\alpha}{c^2}Dp
=\Delta^{\alpha\nu}\partial_\nu p.
$$

したがって第二式が得られます。逆に任意の四元ベクトル $X^\nu:=\partial_\mu T^{\mu\nu}-f^\nu$ は

$$
X^\alpha=\frac{u^\alpha}{c^2}(u_\nu X^\nu)+\Delta^\alpha{}_\nu X^\nu
$$

と分解できます。第一式が成立すれば $u_\nu X^\nu=0$、第二式が成立すれば $\Delta^\alpha{}_\nu X^\nu=0$ なので、$X^\alpha=0$。これで必要十分性も証明されました。
<!-- proof-end -->

### 静止系で符号を確認する

局所的に $u^\mu=(c,0,0,0)$ となる点では、$\Delta^{ij}=-\delta_{ij}$、$\Delta^i{}_\nu f^\nu=f^i$（その点で）です。Euler方程式の空間成分は

$$
\frac{\varepsilon+p}{c^2}a^i+\partial_i p=f^i.
$$

$\partial_i p>0$ で外力がなければ、流体が負の $i$ 方向へ加速することを示します。**圧力勾配の前に正号が現れる**理由は、射影の空間成分が負符号の計量を持ち、式全体では $-\Delta^{ij}\partial_jp=+\partial_i p$ になるためです。

## 4. 粒子数保存と状態方程式は別の情報

未知量は $n$、$\varepsilon$、$p$、独立な速度三成分です。粒子保存一本とエネルギー運動量収支四本を合わせても、$p$、$\varepsilon$、$n$ の関係がなければ運動は決まりません。そこで物質の性質を追加する[状態方程式](../../TH/TH1/index.md#def-th1-equation-of-state)が必要になります。粒子生成なし、熱伝導なし、粘性なし、かつ粒子あたりのエントロピーが流れに沿って一定の場合、例えば $\varepsilon=\varepsilon(n)$ という断熱・バロトロープ模型を採用できます。

自由流体 $f^\nu=0$ で [粒子数保存](#thm-srel7-particle-continuity)と[エネルギー方程式](#thm-srel7-fluid-balance)を並べると

$$
Dn=-n\theta,\qquad D\varepsilon=-(\varepsilon+p)\theta.
$$

$\varepsilon=\varepsilon(n)$ が微分可能なら連鎖律で $D\varepsilon=(d\varepsilon/dn)Dn$ です。したがって $Dn=-n\theta$ を代入して

$$
-n\frac{d\varepsilon}{dn}\theta=-(\varepsilon+p)\theta.
$$

任意の膨張・圧縮に対して成り立つ構成則として選ぶなら

$$
\boxed{p(n)=n\frac{d\varepsilon}{dn}-\varepsilon(n)}
$$

です。$\theta=0$ の特定の流れ一本だけからこの状態方程式を導いたわけではありません。断熱な物質模型の指定と、その模型での収支式が整合する条件です。

### 例：冷たい粒子群と圧力のある模型

固定粒子質量 $m>0$ をもつ粒子群で $\varepsilon(n)=m c^2 n$ なら $d\varepsilon/dn=mc^2$、したがって $p=nmc^2-nmc^2=0$。一方、$K>0$、$q>1$ に対して

$$
\varepsilon(n)=mc^2n+Kn^q
$$

と置けば $d\varepsilon/dn=mc^2+qKn^{q-1}$、$p=(q-1)Kn^q>0$。後者は圧力がどこから現れるかを代数的に確認できる例です。熱と圧力の微視的な起源を、この計算だけで証明したわけではありません。

<a id="prop-srel7-dust"></a>

<!-- formal-statement-start -->
> **命題（圧力のない粒子群の測地的な運動）**  
> 質量 $m>0$、固有数密度 $n>0$、規格化条件 $u_\mu u^\mu=c^2$ を満たす $C^1$ 級の四元速度を考える。
> 圧力が零で、固有エネルギー密度が $\varepsilon=mc^2n$ の完全流体において、粒子数とエネルギー運動量の保存式

$$
\partial_\mu(nu^\mu)=0,\qquad \partial_\mu T^{\mu\nu}=0
$$

> が成立するなら、四元加速度は $a^\nu=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

粒子数流束の発散を先に零にすると、$T^{\mu\nu}=mn u^\mu u^\nu$ の発散には加速度項だけが残ります。正の粒子質量と密度によって係数を割れます。

<!-- proof-start -->
### 証明

$p=0$、$\varepsilon=mc^2n$ を[完全流体の定義](#def-srel7-perfect-fluid)へ代入すると $T^{\mu\nu}=mn u^\mu u^\nu$ です。積の微分を使い

$$
\begin{aligned}
\partial_\mu T^{\mu\nu}
&=m\partial_\mu(nu^\mu u^\nu)\\
&=m\{\partial_\mu(nu^\mu)\}u^\nu+mn\,u^\mu\partial_\mu u^\nu\\
&=mn a^\nu.
\end{aligned}
$$

粒子数保存で第一項は零です。$0=\partial_\mu T^{\mu\nu}=mn a^\nu$ で $m,n>0$ だから $a^\nu=0$。これは平坦時空で自由な粒子が等速直線運動することに対応します。
<!-- proof-end -->

$mn=0$ の真空点では係数を割る操作は許されません。また、粒子数が保存しない模型では同じ発散の第一項が残るので、この証明をそのまま使えません。

## 5. 電磁場との合算と非相対論的極限

[SREL6の電磁場収支](../SREL6/index.md#thm-srel6-field-balance)は $\partial_\mu T_{\mathrm{EM}}^{\mu\nu}=-f^\nu$ でした。物質が受け取る力密度を本章の右辺へ書けば

$$
\partial_\mu T_{\mathrm{fluid}}^{\mu\nu}=+f^\nu,\qquad
\partial_\mu(T_{\mathrm{EM}}^{\mu\nu}+T_{\mathrm{fluid}}^{\mu\nu})=0.
$$

この合算は**相互作用による交換だけがあり、系の外部に源がない場合**に成立します。両方へ同じ負号を置いたり、物質だけに保存を要求して場との交換を落としたりすると、全系保存が破綻します。

局所収支の $\nu=0$ は流体のエネルギー密度 $T^{00}$ と流束 $cT^{i0}$ を用いて

$$
\partial_tT_{\mathrm{fluid}}^{00}
+\sum_i\partial_i(cT_{\mathrm{fluid}}^{i0})=cf^0
$$

です。電磁力なら $cf^0=\boldsymbol j\cdot\boldsymbol E$ なので、SREL6で場が失う仕事率と流体が得る仕事率が等しくなります。空間成分 $\nu=i$ では運動量密度が $T^{0i}/c$、応力流束が $T^{ji}$ です。

<a id="prop-srel7-newton-limit"></a>

<!-- formal-statement-start -->
> **命題（Newton流体への形式的低速極限）**  
> 外力のない完全流体について $|\boldsymbol v|/c\ll1$、$\varepsilon=\rho_m c^2+e$、$\rho_m=mn>0$、$|e|+|p|\ll\rho_m c^2$ を仮定する。$m$ は一定、流れの微分が低速展開と整合する滑らかさを持つとする。主要次数では粒子保存は質量保存に、空間Euler方程式は以下に還元される。

$$
\partial_t\rho_m+\nabla\cdot(\rho_m\boldsymbol v)=0,\qquad
\rho_m(\partial_t+\boldsymbol v\cdot\nabla)\boldsymbol v=-\nabla p.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\gamma=1+O(|\boldsymbol v|^2/c^2)$ なので四元微分は通常の物質微分に近づきます。空間射影による圧力項の符号を保持し、$\varepsilon+p$ の主項 $\rho_m c^2$ と $c^2$ を打ち消します。

<!-- proof-start -->
### 証明

$\gamma=1+O(|\boldsymbol v|^2/c^2)$ を[粒子数保存式](#thm-srel7-particle-continuity)へ代入します。$m$ が一定なので主要次数で

$$
m\{\partial_t(\gamma n)+\nabla\cdot(\gamma n\boldsymbol v)\}
=\partial_t\rho_m+\nabla\cdot(\rho_m\boldsymbol v)
+O(|\boldsymbol v|^2/c^2)=0.
$$

$u^i=\gamma v_i$、$D=\gamma(\partial_t+\boldsymbol v\cdot\nabla)$ だから、$\gamma$ の微分による高次項を除くと

$$
a^i=D(\gamma v_i)
=(\partial_t+\boldsymbol v\cdot\nabla)v_i
+\text{低速展開の高次項}.
$$

空間射影は $\Delta^{ij}=-\delta_{ij}+O(|\boldsymbol v|^2/c^2)$、$\Delta^{i0}=O(|\boldsymbol v|/c)$ です。圧力の時間変化も低速の流体時間スケールに従うと仮定すれば、$\Delta^{i\nu}\partial_\nu p=-\partial_i p+\text{高次項}$。また $(\varepsilon+p)/c^2=\rho_m+(e+p)/c^2$。これらを[Euler方程式](#thm-srel7-fluid-balance)へ代入し、高次項を落とすと

$$
\rho_m(\partial_t+\boldsymbol v\cdot\nabla)v_i+\partial_i p=0
$$

となります。無次元速度が小さいだけでは時間微分の大きさまで確定しないため、低速流れに整合する時間・空間変化の仮定を明記しました。
<!-- proof-end -->

### 保存則が使えない場合を区別する

粒子数保存は生成消滅がないときの模型仮定です。完全流体の構成則は熱流束・粘性応力を無視したときの模型仮定です。$f^\nu=0$ は外力がないという動力学上の条件です。どれかを外せば、上で使った**対応する段階**が変わります。例えば圧力が空間的に変化する静止流体を、外力なしで無条件に置くことはできません。静止系のEuler方程式 $\nabla p=\boldsymbol f$ に反します。

---

## 演習

### Level A

### A1. 静止系と移動系の粒子数流束

$n=n_0>0$、$\boldsymbol v=(v,0,0)$、$|v|<c$ の一様流体で、$N^\mu$ と観測系の数密度を計算し、$u_\mu u^\mu=c^2$ を検算せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$u^\mu=\gamma(c,v,0,0)$、$\gamma=(1-v^2/c^2)^{-1/2}$ とすると

$$
u_\mu u^\mu=\gamma^2c^2-\gamma^2v^2=\gamma^2(c^2-v^2)=c^2.
$$

[粒子数四元流束](#def-srel7-particle-current)により $N^\mu=n_0\gamma(c,v,0,0)$。したがって $N^0/c=\gamma n_0$、$N^1=\gamma n_0v$。一様なので全成分の偏微分が零で $\partial_\mu N^\mu=0$ も成り立ちます。
<!-- solution-end -->

### A2. 発散する流れでは密度は変化する

流体に沿う微分 $D=u^\mu\partial_\mu$、膨張率 $\theta=\partial_\mu u^\mu$ とする。粒子数が保存される $C^1$ 級の $n>0,u^\mu$ で、ある点の $\theta$ が正なら同じ点で $Dn$ の符号を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[粒子数保存の積の微分表示](#thm-srel7-particle-continuity)を使います。

$$
0=\partial_\mu(nu^\mu)=u^\mu\partial_\mu n+n\partial_\mu u^\mu=Dn+n\theta.
$$

したがって $Dn=-n\theta$。$n>0$ かつ $\theta>0$ なので $Dn<0$ です。これは流体と一緒に進むと固有密度が減ることを意味し、観測系での単なる偏時間微分 $\partial_t n$ が負とは限りません。
<!-- solution-end -->

### A3. 圧力項の空間符号

$u^\mu=(c,0,0,0)$、$\varepsilon>0$、$p>0$ の一点において、完全流体の $T^{00},T^{01},T^{11},T^{22}$ と $\Delta^{11}$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[完全流体の定義](#def-srel7-perfect-fluid)に $u^0=c,u^i=0$ を代入します。$T^{00}=(\varepsilon+p)-p=\varepsilon$、$T^{01}=0$。$T^{11}=-p\eta^{11}=p$、$T^{22}=-p\eta^{22}=p$ です。[射影の定義](#def-srel7-orth-projector)では

$$
\Delta^{11}=\eta^{11}-u^1u^1/c^2=-1-0=-1.
$$

圧力は $T^{11}$ では正、上添字二つの $\Delta^{11}$ では負になります。
<!-- solution-end -->

### A4. 動く一様流体の運動量密度

$\varepsilon=\varepsilon_0>0$、$p=p_0\ge0$、$\boldsymbol v=(v,0,0)$、$0<|v|<c$ の一様完全流体について、$T^{01}$、エネルギー流束、運動量密度を区別して求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[観測系の成分式](#prop-srel7-lab-components)より $T^{01}=\gamma^2(\varepsilon_0+p_0)v/c$ です。対称性から $T^{10}=T^{01}$。したがってエネルギー流束は

$$
cT^{10}=\gamma^2(\varepsilon_0+p_0)v,
$$

運動量密度は

$$
T^{01}/c=\gamma^2(\varepsilon_0+p_0)v/c^2.
$$

両者の比は $c^2$ であり、$T^{01}$ そのものを運動量密度とはしません。
<!-- solution-end -->

### A5. 圧力が不均一な静止流体

$u^\mu=(c,0,0,0)$、$\varepsilon=\varepsilon_0>0$、$p=p(x)$ を持つ静止完全流体で、$\partial_\mu T^{\mu\nu}=0$ が成立するための $p$ の条件を求めよ。$p$ は $C^1$ 級とする。

- Level: A

<!-- solution-start -->
#### 詳細解答

静止系では $T^{00}=\varepsilon_0$、$T^{0i}=0$、$T^{ij}=p(x)\delta_{ij}$ です。時間成分は $\partial_\mu T^{\mu0}=\partial_t\varepsilon_0/c=0$、空間成分は

$$
\partial_\mu T^{\mu i}=\sum_j\partial_j[p(x)\delta_{ji}]=\partial_i p.
$$

$i=1$ では $\partial_xp=0$、$i=2,3$ はもともと零です。よって $p$ は各連結な $x$ 区間で一定である必要があります。不均一な圧力には外力などの追加の釣り合いが必要です。
<!-- solution-end -->

### Level B

### B1. 射影した運動方程式を出発式から再導出する

$C^1$ 級の $\varepsilon,p,u^\mu$、$u_\mu u^\mu=c^2$ を持つ完全流体で、$f^\mu=0$ とする。$\partial_\mu T^{\mu\nu}=0$ から $D\varepsilon+(\varepsilon+p)\theta=0$ と $(\varepsilon+p)a^\alpha/c^2-\Delta^{\alpha\nu}\partial_\nu p=0$ をそれぞれ導け。

- Level: B

<!-- solution-start -->
#### 詳細解答

[完全流体テンソル](#def-srel7-perfect-fluid)で $h=\varepsilon+p$ とし、積の微分を展開します。

$$
\partial_\mu T^{\mu\nu}
=\frac{u^\nu}{c^2}(Dh+h\theta)+\frac h{c^2}a^\nu-\partial^\nu p.
$$

規格化 $u_\nu u^\nu=c^2$ の $D$ 微分で $2u_\nu a^\nu=0$。$u_\nu$ を掛けると

$$
u_\nu\partial_\mu T^{\mu\nu}=Dh+h\theta-Dp=D\varepsilon+h\theta=0.
$$

一方 $\Delta^\alpha{}_\nu u^\nu=0$、$\Delta^\alpha{}_\nu a^\nu=a^\alpha$ を使い

$$
0=\Delta^\alpha{}_\nu\partial_\mu T^{\mu\nu}
=h a^\alpha/c^2-\Delta^\alpha{}_\nu\partial^\nu p
=h a^\alpha/c^2-\Delta^{\alpha\nu}\partial_\nu p.
$$

最後の式の空間成分は局所静止系で $ha^i/c^2+\partial_i p=0$ です。圧力勾配の符号を逆にしないことが要点です。
<!-- solution-end -->

### B2. エネルギー密度から状態方程式を作る

$n>0$、定数 $m,K>0$、$q>1$、$\varepsilon(n)=mc^2n+Kn^q$ を断熱な完全流体の構成則とする。$p=n\,d\varepsilon/dn-\varepsilon$ と粒子あたりのエンタルピー $h_p=(\varepsilon+p)/n$ を計算し、自由流体のエネルギー方程式が粒子数保存と整合することを直接示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$n$ で微分すると $d\varepsilon/dn=mc^2+qKn^{q-1}$ です。したがって

$$
\begin{aligned}
p&=n(mc^2+qKn^{q-1})-(mc^2n+Kn^q)=(q-1)Kn^q,\\
h_p&=\frac{mc^2n+Kn^q+(q-1)Kn^q}{n}=mc^2+qKn^{q-1}.
\end{aligned}
$$

[粒子数保存](#thm-srel7-particle-continuity)から $Dn=-n\theta$。連鎖律を適用すると

$$
D\varepsilon=(mc^2+qKn^{q-1})Dn
=-(mc^2n+qKn^q)\theta.
$$

他方 $\varepsilon+p=mc^2n+qKn^q$ だから

$$
D\varepsilon+(\varepsilon+p)\theta
=-(mc^2n+qKn^q)\theta+(mc^2n+qKn^q)\theta=0.
$$

すなわち [自由流体のエネルギー方程式](#thm-srel7-fluid-balance)と一致します。
<!-- solution-end -->

### B3. 電磁場と流体のエネルギー収支を足す

滑らかな電磁場 $T_{\mathrm{EM}}^{\mu\nu}$ と完全流体 $T_{\mathrm{fluid}}^{\mu\nu}$ が、同一の $f^\nu=F^{\nu\alpha}J_\alpha$ を用いて $\partial_\mu T_{\mathrm{EM}}^{\mu\nu}=-f^\nu$、$\partial_\mu T_{\mathrm{fluid}}^{\mu\nu}=f^\nu$ を満たすとする。全系の局所保存と、$\nu=0$ のエネルギー交換の符号を導け。$J^\mu=(c\rho,\boldsymbol j)$ とする。

- Level: B

<!-- solution-start -->
#### 詳細解答

二式を足すと、微分の線形性から

$$
\partial_\mu(T_{\mathrm{EM}}^{\mu\nu}+T_{\mathrm{fluid}}^{\mu\nu})
=-f^\nu+f^\nu=0
$$

です。[SREL5の電磁場テンソル](../SREL5/index.md#def-srel5-field-tensor)では $F^{0i}=-E_i/c$、$J_i=-j_i$。したがって

$$
f^0=\sum_iF^{0i}J_i
=\sum_i(-E_i/c)(-j_i)=\boldsymbol j\cdot\boldsymbol E/c.
$$

$\partial_0=\partial_t/c$ により、電磁場のエネルギー収支は

$$
\partial_tT_{\mathrm{EM}}^{00}
+\sum_i\partial_i(cT_{\mathrm{EM}}^{i0})
=-\boldsymbol j\cdot\boldsymbol E,
$$

流体の収支は同じ左辺を fluid に替えて $+\boldsymbol j\cdot\boldsymbol E$ です。足すと仕事率が相殺します。電流が電場から正の仕事を受けるなら、場から物質へエネルギーが移ります。
<!-- solution-end -->

### Level C

### C1. 圧力勾配を支える外力と観測者変換

$|\beta|<1$、$\gamma=(1-\beta^2)^{-1/2}$、$v=\beta c$ とする。元の慣性系のある開領域で、$u^\mu=(c,0,0,0)$、$n=n_0>0$、$\varepsilon=\varepsilon_0>0$、$p(x)=p_0+\kappa x>0$（$\kappa\ne0$）の完全流体を考える。局所的な外力密度 $f^\mu$ が $\partial_\mu T^{\mu\nu}=f^\nu$ を満たすとする。(1) $T^{\mu\nu}$ と $f^\mu$ を求める。(2) $\partial_\mu N^\mu=0$ とエネルギー・Euler方程式を検算する。(3) 受動的 $x$ boost $x'^0=\gamma(x^0-\beta x^1)$、$x'^1=\gamma(x^1-\beta x^0)$ の下で、$f'^\mu$ と $T'^{00},T'^{01},T'^{11}$ を計算する。(4) プライム座標で $\nu=0,1$ の局所収支を偏微分で直接確かめる。$\kappa$ を保つ外力の微視的な起源は指定しなくてよい。

- Level: C

<!-- solution-start -->
#### 詳細解答

(1) [完全流体の定義](#def-srel7-perfect-fluid)へ静止四元速度を入れると

$$
T^{\mu\nu}=\operatorname{diag}(\varepsilon_0,p(x),p(x),p(x)).
$$

$\partial_0T^{00}=0$、$T^{0i}=0$、$\partial_1T^{11}=\kappa$、その他の発散は零なので

$$
f^\mu=\partial_\nu T^{\nu\mu}=(0,\kappa,0,0).
$$

(2) $N^\mu=(cn_0,0,0,0)$ は一定なので $\partial_\mu N^\mu=0$ です。$D=c\partial_0=\partial_t$、$\theta=0$、$a^\mu=0$ だからエネルギー式の左辺は零、右辺も $u_\nu f^\nu=c f^0=0$ です。Euler式の $i=1$ は $\Delta^{11}=-1$ から

$$
\frac{\varepsilon_0+p}{c^2}a^1-\Delta^{11}\partial_1p
=0-(-1)\kappa=\kappa=f^1
$$

で、$i=2,3$ は両辺零です。外力が圧力勾配に釣り合っていることを確認できました。

(3) 受動boostの非零な $(0,1)$ 行列は $\Lambda^0{}_0=\Lambda^1{}_1=\gamma$、$\Lambda^0{}_1=\Lambda^1{}_0=-\beta\gamma$ です。四元ベクトルに掛けると

$$
f'^0=\gamma f^0-\beta\gamma f^1=-\beta\gamma\kappa,\qquad
f'^1=-\beta\gamma f^0+\gamma f^1=\gamma\kappa.
$$

二階テンソルについては $T^{01}=0$ なので

$$
\begin{aligned}
T'^{00}&=\gamma^2(T^{00}+\beta^2T^{11})
=\gamma^2(\varepsilon_0+\beta^2p),\\
T'^{01}&=-\beta\gamma^2(T^{00}+T^{11})
=-\beta\gamma^2(\varepsilon_0+p),\\
T'^{11}&=\gamma^2(\beta^2T^{00}+T^{11})
=\gamma^2(\beta^2\varepsilon_0+p).
\end{aligned}
$$

ここで $p$ は同じ事象のスカラー場で、逆変換 $x=\gamma(x'+\beta x'^0)$ により

$$
p=p_0+\kappa\gamma(x'+\beta x'^0).
$$

(4) プライム座標の偏微分は $\partial'_0p=\kappa\gamma\beta$、$\partial'_1p=\kappa\gamma$ です。時間成分の発散を具体的に計算すると

$$
\begin{aligned}
\partial'_\mu T'^{\mu0}
&=\partial'_0 T'^{00}+\partial'_1T'^{10}\\
&=\gamma^2\beta^2(\kappa\gamma\beta)
-\beta\gamma^2(\kappa\gamma)\\
&=\beta\gamma^3\kappa(\beta^2-1)
=-\beta\gamma\kappa=f'^0.
\end{aligned}
$$

空間成分も

$$
\begin{aligned}
\partial'_\mu T'^{\mu1}
&=\partial'_0 T'^{01}+\partial'_1T'^{11}\\
&=-\beta\gamma^2(\kappa\gamma\beta)
+\gamma^2(\kappa\gamma)\\
&=\gamma^3\kappa(1-\beta^2)
=\gamma\kappa=f'^1.
\end{aligned}
$$

$x'^2,x'^3$ に依存せず、$T'^{\mu2}$、$T'^{\mu3}$ は定数または零なので残りも $f'^2=f'^3=0$ と一致します。観測者変換で源の時間成分が現れることは、ある系で仕事をしない外力でも、別の系ではエネルギー授受を伴って見えることを表しています。
<!-- solution-end -->
