# CELE1 二体問題を可積分系として読み直す

<!-- definition-example-audit: strict -->

> **既習の道具**：[MECH7 の二体問題の縮約](../../MECH/MECH7/index.md#thm-mech7-two-body-reduction)、[MECH6 の逆二乗力の円錐曲線軌道](../../MECH/MECH6/index.md#thm-mech6-conic-orbit)、[AMECH5 の Hamilton 方程式](../../AMECH/AMECH5/index.md#thm-amech5-hamilton-equations)、[AMECH6 の Poisson 括弧](../../AMECH/AMECH6/index.md#def-amech6-poisson-bracket)、[INT1 の Liouville 可積分性](../../../幾何系/INT/INT1/index.md#def-int1-liouville-integrability)、[INT3 の作用積分](../../../幾何系/INT/INT3/index.md#def-int3-action)を使用します。

## 1. なぜ二体問題をもう一度調べるのか

万有引力の二体問題では、楕円・放物線・双曲線という軌道を求められました。ところが三体問題に進むと「どの軌道が描けるか」を知るだけでは足りません。**なぜ二体では運動を二つの積分で整理でき、天体を増やすと同じ整理が困難になるのか**を比較する基準が必要です。

本章は軌道の幾何を最初から再証明する代わりに、二体問題を

$$
\text{重心と相対運動}
\ \longrightarrow\
\text{正準 Hamiltonian}
\ \longrightarrow\
\text{可換な保存量と独立性}
\ \longrightarrow\
\text{Runge--Lenz ベクトル}
\ \longrightarrow\
\text{作用と振動数}
$$

という順で読み直します。「保存量が多い」と「Liouville 可積分」は同じ主張ではないことも確かめます。相対位置が $0$ になる衝突点は Newton 引力が特異なので、以下では衝突しない時間区間を対象とします。

## 2. 二質点を一つの相対運動へ還元する

質量 $m_1,m_2>0$、位置 $x_1,x_2\in\mathbb R^3$、運動量 $p_i=m_i\dot x_i$、万有引力定数 $G>0$ を固定します。質点の重なる点は除き、重力ポテンシャルを $-Gm_1m_2/|x_1-x_2|$ とします。

[MECH7 の二体問題の縮約](../../MECH/MECH7/index.md#thm-mech7-two-body-reduction)で現れた全質量 $M=m_1+m_2$、換算質量 $\mu=m_1m_2/M$、重心 $R=(m_1x_1+m_2x_2)/M$、相対位置 $q=x_1-x_2$ を使います。総運動量 $P=p_1+p_2$ と相対正準運動量を

$$
p=\mu(\dot x_1-\dot x_2)
=\frac{m_2}{M}p_1-\frac{m_1}{M}p_2
$$

と取ると、運動量を単に $p_1-p_2$ とした場合とは違い、次の分解が正準的に成立します。

<a id="prop-cele1-canonical-reduction"></a>

<!-- formal-statement-start -->
> **命題（二体 Hamiltonian の重心分離）**  
> $x_1\ne x_2$、$m_1,m_2,G>0$ とする。上の $(R,q,P,p)$ は正準変換であり、二体 Hamiltonian は $\kappa=Gm_1m_2$ を用いて

$$
H_{\mathrm{two}}=
\frac{|P|^2}{2M}+
\underbrace{\left(\frac{|p|^2}{2\mu}-\frac{\kappa}{|q|}\right)}_{H_{\mathrm{rel}}(q,p)}
$$

> と分離する。したがって相対運動は $q\ne0$ 上の Hamiltonian $H_{\mathrm{rel}}$ に従う。
<!-- formal-statement-end -->

### 証明の見取り図

座標だけでなく正準一形式 $p_1\cdot dx_1+p_2\cdot dx_2$ を比較すると、二体の六自由度のうち三自由度が自由な重心運動として切り離されます。

<!-- proof-start -->
### 証明

$R,q$ から元の位置を解き直すと

$$
x_1=R+\frac{m_2}{M}q,\qquad
x_2=R-\frac{m_1}{M}q.
$$

よって微分を代入して

$$
p_1\cdot dx_1+p_2\cdot dx_2
=(p_1+p_2)\cdot dR+
\left(\frac{m_2}{M}p_1-\frac{m_1}{M}p_2\right)\cdot dq
=P\cdot dR+p\cdot dq.
$$

正準一形式が保たれるため、$(R,P)$、$(q,p)$ は正準座標対です。速度についても

$$
\dot x_1=\dot R+\frac{m_2}{M}\dot q,\qquad
\dot x_2=\dot R-\frac{m_1}{M}\dot q
$$

と書けます。運動エネルギーを展開すると $\dot R\cdot\dot q$ の係数は

$$
m_1\frac{m_2}{M}-m_2\frac{m_1}{M}=0
$$

で消え、$\dot R^2$ の係数は $M$、$\dot q^2$ の係数は

$$
m_1\frac{m_2^2}{M^2}+m_2\frac{m_1^2}{M^2}
=\frac{m_1m_2}{M}=\mu
$$

です。したがって $T=|P|^2/(2M)+|p|^2/(2\mu)$。ポテンシャルは $q$ のみの関数なので表示式を得ます。[Hamilton 方程式](../../AMECH/AMECH5/index.md#thm-amech5-hamilton-equations)から $\dot R=P/M,\ \dot P=0$ となり、相対運動は残りの $(q,p)$ だけで閉じます。
<!-- proof-end -->

**数値例。** $m_1=2,m_2=3$ なら $M=5,\mu=6/5$ です。静止重心系 $P=0$ で相対速度 $\dot q=(1,0,0)$ を取ると $p=(6/5,0,0)$、全運動エネルギーは $\mu|\dot q|^2/2=3/5$。個々の速度 $3\dot q/5,-2\dot q/5$ から求めても $2(3/5)^2/2+3(2/5)^2/2=3/5$ です。

以後 $H=H_{\mathrm{rel}}$、$r=|q|>0$ と書きます。

## 3. 可積分性は保存量の数でなく可換性と階数で判定する

相対 Hamilton 方程式は

$$
\dot q=\frac p\mu,\qquad
\dot p=-\frac{\kappa q}{r^3}.
$$

角運動量ベクトル $L=q\times p$ は、[中心力の角運動量保存](../../MECH/MECH6/index.md#prop-mech6-planar-reduction)により一定です。$L\ne0$ とし、運動面を $L$ に垂直な固定平面として座標を選びます。平面極座標 $(r,\varphi,p_r,\ell)$ では、$\ell=L_z$ は向き付き角運動量で

$$
p_r=\mu\dot r,\qquad
\ell=\mu r^2\dot\varphi,\qquad
H=\frac{p_r^2}{2\mu}+\frac{\ell^2}{2\mu r^2}-\frac{\kappa}{r}.
$$

固定平面の相対問題は二自由度、相空間は四次元です。$\ell$ がゼロでない軌道に対して上の極座標は正準座標で、$\{r,p_r\}=\{\varphi,\ell\}=1$ です。

<a id="thm-cele1-planar-integrability"></a>

<!-- formal-statement-start -->
> **定理（非衝突平面 Kepler 系の Liouville 可積分性）**  
> $\mu,\kappa>0$、$r>0$ の正準相空間 $(r,\varphi,p_r,\ell)$ で

$$
H=\frac{p_r^2}{2\mu}+\frac{\ell^2}{2\mu r^2}-\frac{\kappa}{r},
\qquad J=\ell
$$

> を考える。$H,J$ は保存され相互に Poisson 可換であり、開稠密集合上で $dH,dJ$ は一次独立である。ゆえにこの二自由度 Hamilton 系は Liouville 可積分である。ただし個々の円軌道の共通レベルは正則とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

保存量二つを挙げるだけで終わらず、Poisson 括弧が消えることと微分の階数が二であることを別々に確かめます。円運動ではその階数が落ちます。

<!-- proof-start -->
### 証明

[Poisson 括弧の正準座標表示](../../AMECH/AMECH6/index.md#def-amech6-poisson-bracket)から

$$
\{J,H\}=
J_r H_{p_r}-J_{p_r}H_r+
J_\varphi H_\ell-J_\ell H_\varphi
=-H_\varphi=0.
$$

$\{H,H\}=\{J,J\}=0$ なので二つは互いに可換です。[第一積分の保存判定](../../../幾何系/INT/INT1/index.md#prop-int1-conservation-criterion)により、時間に明示的に依存しない $H,J$ は軌道上で一定です。一方

$$
dH=\left(\frac{\kappa}{r^2}-\frac{\ell^2}{\mu r^3}\right)dr
+\frac{p_r}{\mu}dp_r+\frac{\ell}{\mu r^2}d\ell,
\qquad dJ=d\ell.
$$

$p_r\ne0$ では $dH$ に非零の $dp_r$ 成分がある一方 $dJ$ にはありません。よって両者は独立です。この集合は $r>0$ の相空間で開稠密です。[Liouville 可積分性の定義](../../../幾何系/INT/INT1/index.md#def-int1-liouville-integrability)の可換・独立の両条件を満たします。

逆に $dH,dJ$ が従属となるには $p_r=0$ と

$$
\frac{\kappa}{r^2}-\frac{\ell^2}{\mu r^3}=0
\quad\Longleftrightarrow\quad
r=\frac{\ell^2}{\mu\kappa}
$$

が同時に必要です。これは正の $\ell^2$ を持つ円軌道の条件です。ここでは $dH=(\ell/(\mu r^2))dJ$ となり、個々の正則共通レベルに対する定理をそのまま使えません。
<!-- proof-end -->

例えば $\mu=\kappa=\ell=1$ なら $r=1,p_r=0$ は円軌道です。そこから $p_r$ を小さく動かせば $dH$ と $dJ$ は再び独立になります。**可積分な系でも特異な運動は存在する**という区別が、この先で重要です。

## 4. Kepler 固有の追加保存量：Runge--Lenz ベクトル

同じ中心力でも、すべての軌道が閉じるわけではありません。$1/r$ ポテンシャルの Kepler 問題には、角運動量では決まらない近日点方向まで保存する特別なベクトルがあります。

<a id="def-cele1-runge-lenz"></a>

<!-- formal-statement-start -->
> **定義（Runge--Lenz ベクトル）**  
> $\mu,\kappa>0$ の Kepler Hamiltonian $H=|p|^2/(2\mu)-\kappa/|q|$、$q\ne0$ に対し、$L=q\times p$ を用いて

$$
A=p\times L-\mu\kappa\frac q{|q|}
$$

> と置く。この $A$ を Runge--Lenz ベクトルと呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele1-runge-lenz -->

### **定義の確認**：初期値からベクトルを組み立てる

$\mu=\kappa=1$、$q=(2,0,0)$、$p=(0,1,0)$ では $L=(0,0,2)$、$p\times L=(2,0,0)$、$q/r=(1,0,0)$ です。従って $A=(1,0,0)$。$A$ は軌道面にあり、$A\cdot L=0$ も直接確認できます。

<!-- definition-example-end -->

<a id="prop-cele1-runge-lenz-conservation"></a>

<!-- formal-statement-start -->
> **命題（Runge--Lenz ベクトルの保存と離心率）**  
> $q(t)\ne0$ を満たす Kepler 解で $A,L,H=E$ を上のように定めると、$\dot A=0$ かつ

$$
|A|^2=\mu^2\kappa^2+2\mu E|L|^2.
$$

> 特に $|L|=\ell_*>0$ なら、離心率 $e=|A|/(\mu\kappa)$ と軌道面内で $A$ から測る角 $\theta$ に対して

$$
r=\frac{\ell_*^2/(\mu\kappa)}{1+e\cos\theta}
$$

> が成立する。ただし $A=0$ の円軌道では $\theta$ の基準方向を任意に選べる。
<!-- formal-statement-end -->

### 証明の見取り図

$\dot p$ の重力項を微分すると、一見消えない $q$ と $p$ の項が現れます。$q\times(q\times p)$ の三重積公式を使うと、$q/r$ の微分と厳密に打ち消し合います。残った恒等式が軌道の離心率とエネルギーを結びます。

<!-- proof-start -->
### 証明

$r=|q|$ です。[Hamilton 方程式](../../AMECH/AMECH5/index.md#thm-amech5-hamilton-equations)から

$$
\dot q=\frac p\mu,\qquad
\dot p=-\frac{\kappa q}{r^3},\qquad
\dot L=\dot q\times p+q\times\dot p=0+0=0.
$$

また $r$ の微分は $\dot r=q\cdot p/(\mu r)$ なので、連鎖律から

$$
\frac{d}{dt}\frac q r
=\frac p{\mu r}-\frac{q(q\cdot p)}{\mu r^3}.
$$

三重積公式で $q\times L=q\times(q\times p)=q(q\cdot p)-r^2p$。従って

$$
\begin{aligned}
\dot A
&=\dot p\times L+p\times\dot L
 -\mu\kappa\frac{d}{dt}\frac q r\\
&=-\frac{\kappa}{r^3}\left[q(q\cdot p)-r^2p\right]
 -\kappa\left(\frac p r-\frac{q(q\cdot p)}{r^3}\right)=0.
\end{aligned}
$$

次に $p\cdot L=0$ から $|p\times L|^2=|p|^2|L|^2$。三重積をもう一度使うと

$$
(p\times L)\cdot q
=L\cdot(q\times p)=|L|^2.
$$

ゆえに

$$
\begin{aligned}
|A|^2
&=|p|^2|L|^2-2\mu\kappa\frac{|L|^2}{r}+\mu^2\kappa^2\\
&=2\mu\left(\frac{|p|^2}{2\mu}-\frac\kappa r\right)|L|^2+\mu^2\kappa^2\\
&=2\mu E|L|^2+\mu^2\kappa^2.
\end{aligned}
$$

さらに $A\cdot q=|L|^2-\mu\kappa r$。$A$ と $q$ のなす角を $\theta$ とすると $A\cdot q=|A|r\cos\theta$ なので

$$
|L|^2=r(\mu\kappa+|A|\cos\theta)
=\mu\kappa r(1+e\cos\theta).
$$

これを $r$ について解けば軌道式を得ます。
<!-- proof-end -->

$|L|>0$ のとき

$$
e^2=1+\frac{2E|L|^2}{\mu\kappa^2}
$$

となります。[MECH6 の軌道分類](../../MECH/MECH6/index.md#thm-mech6-conic-orbit)と照合すれば、$E<0$ は $0\le e<1$ の楕円（$e=0$ は円）、$E=0$ は $e=1$ の放物線、$E>0$ は $e>1$ の双曲線です。ここでも $\ell_*=0$ の衝突可能な放射運動を円錐曲線の通常の極座標式へ無断で含めません。

**注意：保存量が一つ増えたから三自由度になるわけではありません。** 平面相対運動は二自由度のままです。$A$ の成分には $A\cdot L=0$ や上のノルム関係などの恒等式があり、独立な可換積分を任意に追加できるわけではありません。余分な保存性は、束縛軌道の特別な閉軌道構造へ現れます。

## 5. 有効ポテンシャルと円運動の退化を読み直す

[有効ポテンシャル](../../MECH/MECH6/index.md#def-mech6-effective-potential)は、この章の記号では

$$
U_{\mathrm{eff}}(r)=\frac{\ell^2}{2\mu r^2}-\frac{\kappa}{r},
\qquad
H=\frac{p_r^2}{2\mu}+U_{\mathrm{eff}}(r).
$$

$\ell\ne0$ で微分すれば

$$
U_{\mathrm{eff}}'(r)=
-\frac{\ell^2}{\mu r^3}+\frac{\kappa}{r^2}.
$$

唯一の臨界半径 $r_0=\ell^2/(\mu\kappa)$ では

$$
U_{\mathrm{eff}}''(r_0)
=\frac{3\ell^2}{\mu r_0^4}-\frac{2\kappa}{r_0^3}
=\frac\kappa{r_0^3}>0,
\qquad
E_0=-\frac{\mu\kappa^2}{2\ell^2}.
$$

この極小で $p_r=0$ のまま動く円運動は、先ほどの定理で $dH,dJ$ の階数が落ちる箇所そのものです。$E>E_0$ で $E<0$ の近傍には近日点と遠日点の異なる楕円があります。$E=E_0$ へ近付けると二つの転回点が合流します。$\ell=0$ では反発的な $\ell^2/r^2$ 項が消え、$r=0$ での衝突を除外する機構も失われます。

## 6. 作用変数は「可積分」を運動の時計へ変える

束縛された非円軌道 $E<0,\ 0<e<1,\ \ell>0$ に限り、近日点から次の近日点までの動径往復を考えます。[INT3 の作用変数](../../../幾何系/INT/INT3/index.md#def-int3-action)に従って

$$
J_\varphi=\frac{1}{2\pi}\oint \ell\,d\varphi=\ell,
\qquad
J_r=\frac{1}{2\pi}\oint p_r\,dr
$$

とします。角方向には向きを $\ell>0$ に固定しました（逆向きなら $J_\varphi=|\ell|$ と扱います）。動径作用は単なる円周積分ではなく、往路と復路の符号を含む閉曲線積分です。

<a id="prop-cele1-kepler-actions"></a>

<!-- formal-statement-start -->
> **命題（束縛 Kepler 軌道の作用と振動数）**  
> $\mu,\kappa>0$、$E<0$、$\ell>0$、$0<e<1$ の非衝突・非円平面 Kepler 軌道について、$a=-\kappa/(2E)$ とすると

$$
J_r=\sqrt{\mu\kappa a}-\ell,\qquad
J_\varphi=\ell,\qquad
H=-\frac{\mu\kappa^2}{2(J_r+J_\varphi)^2}.
$$

> この作用座標に共役な二角度の振動数は等しく、

$$
\omega_r=\omega_\varphi=
\frac{\mu\kappa^2}{(J_r+J_\varphi)^3}.
$$

<!-- formal-statement-end -->

### 証明の見取り図

楕円の離心近点角 $u$ による $r=a(1-e\cos u)$ を用いると、動径の閉曲線積分を一変数の初等積分へ直せます。二つの作用の和にしか $H$ が依存しないことが、動径と角度の周期が一致する理由になります。

<!-- proof-start -->
### 証明

まず[Kepler 楕円の関係式](../../MECH/MECH6/index.md#thm-mech6-conic-orbit)を、長半径 $a$ と離心率 $e$ で書きます。

$$
E=-\frac{\kappa}{2a},\qquad
\ell^2=\mu\kappa a(1-e^2),\qquad
b=a\sqrt{1-e^2}.
$$

$b$ は短半径です。離心近点角 $u$ を用いて焦点を原点とした楕円を $x=a(\cos u-e),\ y=b\sin u$ と表すと、原点からの扇形面積 $S$ の微分は

$$
\frac{dS}{du}
=\frac12\left(x\frac{dy}{du}-y\frac{dx}{du}\right)
=\frac{ab}{2}(1-e\cos u).
$$

一方、[Kepler 第2法則](../../MECH/MECH6/index.md#thm-mech6-kepler-second)から面積速度は $dS/dt=\ell/(2\mu)$ です。両者を割り、上の $b$ と $\ell$ の関係を代入すると

$$
\begin{aligned}
\frac{dt}{du}
&=\frac{dS/du}{dS/dt}
=\frac{\mu ab}{\ell}(1-e\cos u)\\
&=\sqrt{\frac{\mu a^3}{\kappa}}(1-e\cos u)
=\frac{1-e\cos u}{n},
\end{aligned}
$$

ただし $n=\sqrt{\kappa/(\mu a^3)}$ は平均運動です。ここで楕円の面積から時間変数への変換を導き、公式としての無断使用を避けました。

従って $r=a(1-e\cos u)$ を微分して

$$
\frac{dr}{du}=ae\sin u,\qquad
p_r=\mu\frac{dr}{dt}
=\frac{\mu an e\sin u}{1-e\cos u}.
$$

$u$ を $0$ から $2\pi$ まで一周させると、往復の $p_r\,dr$ が正しく一回数えられるので

$$
\begin{aligned}
J_r
&=\frac1{2\pi}\int_0^{2\pi}
\frac{\mu a^2n e^2\sin^2u}{1-e\cos u}\,du\\
&=\sqrt{\mu\kappa a}\,
\frac1{2\pi}\int_0^{2\pi}
\frac{e^2\sin^2u}{1-e\cos u}\,du.
\end{aligned}
$$

ここで被積分関数は

$$
\frac{e^2\sin^2u}{1-e\cos u}
=1+e\cos u-\frac{1-e^2}{1-e\cos u}.
$$

$t=\tan(u/2)$ による半角置換を二つの半周で実行すると

$$
\int_0^{2\pi}\frac{du}{1-e\cos u}
=2\int_{-\infty}^{\infty}
\frac{dt}{(1-e)+(1+e)t^2}
=\frac{2\pi}{\sqrt{1-e^2}}.
$$

$\cos u$ の一周期積分は $0$ ですから、上の作用積分の平均は $1-\sqrt{1-e^2}$ になります。よって

$$
J_r=\sqrt{\mu\kappa a}(1-\sqrt{1-e^2})
=\sqrt{\mu\kappa a}-\ell.
$$

$J_r+J_\varphi=\sqrt{\mu\kappa a}$ と $E=-\kappa/(2a)$ を合わせて $H$ の表示を得ます。最後に [作用角座標での Hamilton 方程式](../../../幾何系/INT/INT3/index.md#thm-int3-local-action-angle)から $\dot\theta_i=\partial H/\partial J_i$ なので、両方の偏微分は

$$
\frac{\partial}{\partial J_i}
\left[-\frac{\mu\kappa^2}{2(J_r+J_\varphi)^2}\right]
=\frac{\mu\kappa^2}{(J_r+J_\varphi)^3}.
$$

これが一致する振動数です。
<!-- proof-end -->

例えば $\mu=\kappa=1,\ a=25/16,\ e=3/5$ では $\ell=\sqrt{a(1-e^2)}=1$、$J_r=1/4$、$J_\varphi=1$ となります。$E=-8/25$、共通振動数は $1/(5/4)^3=64/125$ です。

一般の可積分系では[Liouville--Arnold の定理](../../../幾何系/INT/INT2/index.md#thm-int2-liouville-arnold)から正則コンパクト共通レベルに角度が現れますが、その角度が同じ速さで回るとは限りません。Kepler 問題の振動数比が $1:1$ であるのは追加の特殊性です。上の議論は $\ell>0,\ 0<e<1$ の正則領域で行ったもので、円軌道の $J_r=0$ では動径角が退化し、放物線・双曲線では束縛軌道の閉じた動径サイクルを使えません。

## 7. 演習：可積分性を実際に検査する

### Level A

<a id="ex-cele1-a01"></a>
**A1. 換算質量と運動エネルギー。** $m_1=2,m_2=3$、$\dot x_1=(3/5,0,0)$、$\dot x_2=(-2/5,0,0)$ とする。$\dot R,\dot q,\mu,p$ と二体の運動エネルギーを求め、相対 Hamiltonian の運動項と一致させよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $M=5$、$\mu=2\cdot3/5=6/5$。$\dot R=(2\dot x_1+3\dot x_2)/5=0$、$\dot q=\dot x_1-\dot x_2=(1,0,0)$ です。よって $p=\mu\dot q=(6/5,0,0)$。元の座標からの運動エネルギーは

$$
T=\frac22\left(\frac35\right)^2+\frac32\left(\frac25\right)^2
=\frac9{25}+\frac6{25}=\frac35.
$$

重心分離後も $|P|^2/(2M)=0$ および $|p|^2/(2\mu)=(36/25)/(12/5)=3/5$ となり一致します。[重心分離の命題](#prop-cele1-canonical-reduction)の具体的検証です。
<!-- solution-end -->

<a id="ex-cele1-a02"></a>
**A2. 円運動条件。** $H=p_r^2/(2\mu)+\ell^2/(2\mu r^2)-\kappa/r$ から $\dot r,\dot p_r$ を求め、$\ell\ne0$ の円軌道の半径とエネルギーを導け。

- Level: A

<!-- solution-start -->
**詳細解答。** [Hamilton 方程式](../../AMECH/AMECH5/index.md#thm-amech5-hamilton-equations)を $(r,p_r)$ に適用すると

$$
\dot r=\frac{p_r}{\mu},\qquad
\dot p_r=-\partial_rH=\frac{\ell^2}{\mu r^3}-\frac{\kappa}{r^2}.
$$

円軌道なら $\dot r=\dot p_r=0$ です。前者から $p_r=0$、後者に $r>0$ を代入して $\ell^2=\mu\kappa r$、従って $r_0=\ell^2/(\mu\kappa)$。エネルギーは

$$
E_0=\frac{\ell^2}{2\mu r_0^2}-\frac{\kappa}{r_0}
=\frac\kappa{2r_0}-\frac\kappa{r_0}
=-\frac{\mu\kappa^2}{2\ell^2}.
$$

となります。
<!-- solution-end -->

<a id="ex-cele1-a03"></a>
**A3. 保存性と独立性。** 同じ Hamiltonian について $\{H,\ell\}$ を計算し、$p_r\ne0$ で $dH,d\ell$ が独立な理由を二つの微分の係数から示せ。

- Level: A

<!-- solution-start -->
**詳細解答。** $\ell$ の微分は $\ell_{p_r}=\ell_r=\ell_\varphi=0,\ell_\ell=1$ です。[Poisson 括弧](../../AMECH/AMECH6/index.md#def-amech6-poisson-bracket)から $\{\ell,H\}=-H_\varphi=0$、反対称性から $\{H,\ell\}=0$。微分は

$$
dH=\left(\frac{\kappa}{r^2}-\frac{\ell^2}{\mu r^3}\right)dr
+\frac{p_r}{\mu}dp_r+\frac{\ell}{\mu r^2}d\ell,
\qquad d\ell=d\ell.
$$

$a\,dH+b\,d\ell=0$ と置くと $dp_r$ 係数は $ap_r/\mu=0$。$p_r\ne0$ だから $a=0$、次に $d\ell$ 係数から $b=0$。従って二つは一次独立です。
<!-- solution-end -->

<a id="ex-cele1-a04"></a>
**A4. エネルギーと離心率。** $\mu=\kappa=|L|=1$ の Kepler 軌道で $E=-3/8,\ 0,\ 1/2$ の離心率を求め、各軌道を分類せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [離心率の命題](#prop-cele1-runge-lenz-conservation)から $e^2=1+2E$ です。$E=-3/8$ なら $e^2=1/4$ で $e=1/2$、楕円です。$E=0$ なら $e=1$ で放物線です。$E=1/2$ なら $e^2=2$ で $e=\sqrt2>1$、双曲線です。いずれも $|L|=1>0$ なので零角運動量の衝突軌道ではありません。
<!-- solution-end -->

### Level B

<a id="ex-cele1-b01"></a>
**B1. Runge--Lenz ベクトルを初期値から決める。** $\mu=\kappa=1$、$q(0)=(2,0,0)$、$p(0)=(0,1,0)$ の軌道について、$L,A,E,e$ を計算し、軌道式の近日点方向と軌道の種類を答えよ。

- Level: B

<!-- solution-start -->
**詳細解答。** 外積を成分ごとに取ると

$$
L=q\times p=(0,0,2),\qquad
p\times L=(2,0,0).
$$

$r=2$ なので $A=(2,0,0)-(1,0,0)=(1,0,0)$。エネルギーは $E=|p|^2/2-1/r=1/2-1/2=0$、離心率は $e=|A|=1$ です。軌道式に代入すると

$$
r=\frac{|L|^2}{1+e\cos\theta}=\frac4{1+\cos\theta}.
$$

$A$ の方向は正の $x$ 方向なので $\theta=0$ が近日点方向、$r_{\min}=4/2=2$ は初期位置と一致します。$E=0,e=1$ より放物線軌道です。方向と距離の両方が初期値と整合します。
<!-- solution-end -->

<a id="ex-cele1-b02"></a>
**B2. 円軌道の階数低下と安定性。** $\mu,\kappa>0$、$\ell\ne0$ で $p_r=0$ とし、$dH,d\ell$ が従属になる正の半径を求めよ。そこで $U_{\rm eff}''>0$ を確認し、なぜ「定理の独立性が失われた」ことと「円軌道が動径方向に不安定」が同義でないか述べよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $dH$ の $dr$ 成分は $\kappa/r^2-\ell^2/(\mu r^3)$ で、$dp_r$ 成分は $p_r/\mu=0$。$dH$ が $d\ell$ の倍数となるには

$$
\kappa/r^2-\ell^2/(\mu r^3)=0
\quad\Longleftrightarrow\quad
r_0=\ell^2/(\mu\kappa).
$$

この点で $dH=(\ell/(\mu r_0^2))d\ell$。一方 $U_{\rm eff}''=3\ell^2/(\mu r^4)-2\kappa/r^3$ なので $\ell^2=\mu\kappa r_0$ を代入すると

$$
U_{\rm eff}''(r_0)=3\kappa/r_0^3-2\kappa/r_0^3
=\kappa/r_0^3>0.
$$

従って固定角運動量で半径を小さく動かしたときの有効ポテンシャルは極小です。独立性の階数低下は正則共通レベルの座標記述に関する条件であり、動径方向の安定性はポテンシャルの二階微分に関する別の判定です。
<!-- solution-end -->

<a id="ex-cele1-b03"></a>
**B3. 作用から周期へ。** $\mu=\kappa=1,\ a=25/16,\ e=3/5,\ell>0$ の楕円について $E,\ell,J_r,J_\varphi,\omega_r$ と $T_r$ を求め、面積法則からの Kepler 周期 $T=2\pi\sqrt{a^3}$ と比較せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $E=-1/(2a)=-8/25$、$\ell^2=a(1-e^2)=(25/16)(16/25)=1$ なので $\ell=1$。[作用の公式](#prop-cele1-kepler-actions)で

$$
J_\varphi=1,\qquad
J_r=\sqrt a-\ell=\frac54-1=\frac14.
$$

和は $J_r+J_\varphi=5/4$。従って

$$
\omega_r=\frac1{(5/4)^3}=\frac{64}{125},
\qquad
T_r=\frac{2\pi}{\omega_r}=\frac{125\pi}{32}.
$$

[Kepler 第3法則](../../MECH/MECH6/index.md#thm-mech6-kepler-third)におけるこの規格化の周期は

$$
T=2\pi\sqrt{a^3}
=2\pi\sqrt{(25/16)^3}
=2\pi\frac{125}{64}=\frac{125\pi}{32}.
$$

一致します。作用の偏微分と、楕円の幾何から得た周期が同じ時計を記述しています。
<!-- solution-end -->

### Level C

<a id="ex-cele1-c01"></a>
**C1. 三次元で保存量を数え直す。** $q\in\mathbb R^3\setminus\{0\},p\in\mathbb R^3$ において $\mu=\kappa=1$ とする。$H=|p|^2/2-1/|q|,\ L=q\times p$ を用い、$F_1=H,F_2=|L|^2,F_3=L_z$ について (i) 相互 Poisson 可換性を示せ。(ii) $q=(1,0,0),p=(0,1,1)$ で $dF_1,dF_2,dF_3$ が一次独立であることを具体的な小行列式で確認せよ。(iii) 開稠密集合での Liouville 可積分性を述べ、$A$ の保存と「可換第一積分を無制限に追加できる」との違いを説明せよ。

- Level: C

<!-- solution-start -->
**詳細解答。** (i) $H$ は $q,p$ の同時回転で不変です。[角運動量と Poisson 括弧の関係](../../AMECH/AMECH6/index.md#prop-amech6-angular-momentum)により

$$
\{L_i,L_j\}=\sum_k\varepsilon_{ijk}L_k,\qquad
\{H,L_i\}=0.
$$

$F_2=L_x^2+L_y^2+L_z^2$ に Leibniz 則を適用すると

$$
\{F_2,L_z\}
=2L_x\{L_x,L_z\}+2L_y\{L_y,L_z\}
=2L_x(-L_y)+2L_y L_x=0.
$$

また $\{H,F_2\}=\sum_i2L_i\{H,L_i\}=0$、$\{H,L_z\}=0$、同一関数同士は反対称性で零です。

(ii) 指定点では $L=(0,-1,1)$。$r=1$ ですから

$$
dH=q\cdot dq+(p\cdot dp)
=dq_x+dp_y+dp_z.
$$

$L$ の変分は $dL=dq\times p+q\times dp$ なので、

$$
d|L|^2=2L\cdot dL
=2(p\times L)\cdot dq+2(L\times q)\cdot dp.
$$

$p\times L=(2,0,0)$、$L\times q=(0,1,1)$ だから

$$
d|L|^2=4dq_x+2dp_y+2dp_z.
$$

さらに $L_z=q_xp_y-q_yp_x$ より $dL_z=dq_x+dp_y$。従って $(dq_x,dp_y,dp_z)$ に関する係数小行列式は

$$
\det\begin{pmatrix}1&1&1\\4&2&2\\1&1&0\end{pmatrix}
=1(0-2)-1(0-2)+1(4-2)=2\ne0.
$$

よって三つの微分は独立です。

(iii) 上の行列式は $q\ne0$ の連結な相空間上の実解析関数です。指定点で非零なので恒等的に零ではなく、その非零集合は開稠密です。従って三自由度に三つの独立な Poisson 可換第一積分があり、[Liouville 可積分性](../../../幾何系/INT/INT1/index.md#def-int1-liouville-integrability)が成立します。

[Runge--Lenz ベクトル](#def-cele1-runge-lenz)はさらに保存されますが、その成分は $A\cdot L=0$ と $|A|^2=1+2H|L|^2$ などの関係を満たします。また全成分が相互に Poisson 可換になるわけでもありません。「保存量が三個より多い」という数だけから、互いに独立かつ可換な第一積分を三個より多く構成できたとは言えません。
<!-- solution-end -->

## 8. 次章：三体で何が壊れるのか

重心を除き、固定された運動面で $H,\ell$ を使えば二自由度の Kepler 系を積分できました。三次元でも $H,|L|^2,L_z$ という可換な三個の積分があります。さらに Runge--Lenz ベクトルは近日点方向を固定し、作用の振動数比を $1:1$ にしました。

三体問題では相対位置が二本必要になり、力も「一つの中心からだけ」には向かいません。**重心を除いたあとの自由度と、実際に可換・独立な積分を何個構成できるか**を改めて数える必要があります。それが CELE2 の課題です。
