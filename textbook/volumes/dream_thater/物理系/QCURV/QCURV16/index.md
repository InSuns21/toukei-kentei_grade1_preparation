# QCURV16 二次元共形模型・trace anomaly・Schwarzian流束

<!-- definition-example-audit: strict -->

[QCURV15の局所エネルギー流束](../QCURV15/index.md#def-qcurv15-observer-measurements)では、量子場の応力テンソルから観測者の測定量を作りました。しかし4次元Schwarzschild時空でその期待値を完全に求めるには、角運動量ごとの散乱と状態の選択が絡みます。まず**流束が生まれる機構だけを紙上で最後まで追える模型**が欲しくなります。

本章では空間1次元・時間1次元の質量零の自由実スカラー場を扱い、共形座標での応力テンソルを trace anomaly（トレース異常）と保存則から求め、null座標の付け替えを表す三階微分の組合せとHawking型の出射流束を結び付けます。[QCURV10の後期光線写像](../QCURV10/index.md#thm-qcurv10-late-exponential)と[QCURV11のHawking温度](../QCURV11/index.md#thm-qcurv11-thermal-ratio)を、**粒子数とは独立した観測量**で再検算するのが目標です。

舞台は滑らかな時間向き付き2次元Lorentz領域で、計量符号は $(-,+)$、単位は $\hbar=c=k_B=G=1$ とします。境界のない局所領域（または境界条件を明記した領域）を考え、中央電荷 $c_{\rm CFT}=1$ の質量零自由実スカラー場を基本例にします。一般の非カイラル共形場では以下の式の $1$ を $c_{\rm CFT}$ に置き換えます。これは**4次元場の角変数を落としただけの厳密な理論ではありません**。球対称4次元場の縮約には通常、面積半径（dilaton）との結合が残ります。

## 1. 光に沿う座標と応力テンソルの三成分

2次元Minkowski座標 $(t,x)$ で、未来へ向かう右向きの光線は $u=t-x$ を一定に保って右へ進み、左向きの光線は $v=t+x$ を一定に保って左へ進みます。右向き放射をラベルする遅延時刻は $u$、左向き放射をラベルする先進時刻は $v$ です。一般の局所共形座標では、正の滑らかな関数 $C(u,v)$ を用いて

$$
ds^2=-C(u,v)\,du\,dv=-e^{2\rho(u,v)}du\,dv,
\qquad \rho=\frac12\log C.
$$

この表示で $g_{uv}=g_{vu}=-e^{2\rho}/2$、$g^{uv}=g^{vu}=-2e^{-2\rho}$ です。したがって $T_{uu}$ は右向き、$T_{vv}$ は左向きのnull成分、$T_{uv}$ はトレースと結び付きます。$u$ と $v$ は時間・長さの次元を持ちます。

<a id="def-qcurv16-null-flux"></a>

<!-- formal-statement-start -->
> **定義（null成分と外向き正味流束）**
> 2次元の滑らかなLorentz計量 $ds^2=-e^{2\rho}du\,dv$ の上で対称応力テンソル $T_{ab}$ を考える。Minkowski領域で $u=t-x$、$v=t+x$ とし、$x$ の増加方向を外向きとする。このとき外向きのエネルギー流束を

$$
F:=T^{tx}=T_{uu}-T_{vv}
$$

> と定める。ここで $T^{tx}=-T_{tx}$（Minkowski計量 $\operatorname{diag}(-1,1)$）であり、$T_{tx}=T_{vv}-T_{uu}$ である。曲がった領域では外向き流束は観測者と正規直交枠を別途指定する。
<!-- formal-statement-end -->

共変成分 $T_{tx}$ と反変成分 $T^{tx}$ は符号が逆です。実際 $du=dt-dx$、$dv=dt+dx$ から

$$
T_{tx}=-T_{uu}+T_{vv},\qquad
T^{tx}=-T_{tx}=T_{uu}-T_{vv}.
$$

<!-- definition-example-start: def-qcurv16-null-flux -->
### 直接例：右へ進む波の符号

平坦な自由場の右向き解 $\phi=f(u)$ では $\partial_t\phi=f'(u)$、$\partial_x\phi=-f'(u)$ なので、古典的応力テンソルは $T_{uu}=f'(u)^2$、$T_{vv}=0$、$T_{tx}=-f'(u)^2$ です。一方 $T^{tx}=f'(u)^2\ge0$ です。右向き流束を正とする定義と一致します。

**定義の確認**：計量、外向きの $x$ 方向、二つのnull成分、反変成分 $T^{tx}$ の符号の全条件を直接検算しました。
<!-- definition-example-end -->

## 2. 古典的トレースが消えるのに量子では残る理由

2次元の作用は $S=-\frac12\int\sqrt{-g}\,g^{ab}\partial_a\phi\partial_b\phi\,d^2x$。その古典応力テンソルは

$$
T_{ab}^{\rm cl}=\partial_a\phi\partial_b\phi
-\frac12g_{ab}g^{cd}\partial_c\phi\partial_d\phi.
$$

計量で縮約すると $g^{ab}g_{ab}=2$ より $T^{a}{}_{a}=0$ です。しかし量子の $\langle\partial\phi\partial\phi\rangle$ は分布の同一点での積です。[MICA14のHadamard差引き](../../../解析系/MICA/MICA14/index.md#def-mica14-subtracted-remainder)と同じ「**引いてから対角値を取る**」考え方を、2次元の短距離特異性に適合させた局所共変くりこみで用います。4次元の係数や有限項をそのまま使うわけではありません。

自由スカラーの2次元二点分布には赤外の零モードによる加法定数の曖昧さがあります。以下の応力テンソルは二点分布を微分した量として構成し、適切なIR規約・局所Hadamard条件を固定します。平坦真空で $\langle T_{ab}\rangle=0$ とする規格化を採用します。

<a id="def-qcurv16-trace-anomaly"></a>

<!-- formal-statement-start -->
> **定義（この模型のトレース異常）**
> 2次元質量零自由実スカラー（中央電荷 $c_{\rm CFT}=1$）について、局所共変・保存的なくりこみで平坦真空の応力テンソルを零と定めたとき、量子応力テンソルのトレースに残る次の局所曲率項を**トレース異常**と呼ぶ。

$$
\langle T^a{}_a\rangle_{\rm ren}
=\frac{c_{\rm CFT}}{24\pi}R.
$$

> ここで $R$ は上記2次元計量のスカラー曲率であり、式は自由場の共形不変な短距離理論と指定したくりこみ規約の下で成立する。状態の変更は右辺を変えない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv16-trace-anomaly -->
### 直接例：平坦計量と曲がった共形計量

$\rho=0$ なら $R=0$ なのでトレースは零です。一方 $\rho(u,v)=\lambda uv$（$\lambda\ne0$）という局所領域では

$$
R=8e^{-2\lambda uv}\partial_u\partial_v(\lambda uv)
=8\lambda e^{-2\lambda uv},
$$

したがって $\langle T^a{}_a\rangle=c_{\rm CFT}\lambda e^{-2\lambda uv}/(3\pi)$ で、古典場のトレース零とは異なります。

**定義の確認**：共形計量は正の因子 $e^{2\lambda uv}$ を持つため滑らかなLorentz計量であり、量子のトレースを曲率から算出し、状態関数に依存しないことまで確認しました。
<!-- definition-example-end -->

### 異常の係数をどこで得るか

共形的な2次元Euclid領域で、IR零モードを除いて正のLaplacian $\Delta_E$ の熱核正則化を使うと、対角熱核は小さな $s>0$ に対し

$$
K(s;x,x)=\frac1{4\pi s}+\frac{R(x)}{24\pi}+O(s).
$$

計量の微小Weyl変化 $g_{ab}\mapsto e^{2\sigma}g_{ab}$ では、2次元のスカラーLaplacianは $\Delta_E\mapsto e^{-2\sigma}\Delta_E$。一ループ有効作用 $W=\frac12\log\det\Delta_E$ の局所変化は、熱核で正則化すると

$$
\delta_\sigma W=-\operatorname{Tr}(\sigma e^{-s\Delta_E})
=-\int\sqrt g\,\sigma
\left(\frac1{4\pi s}+\frac{R}{24\pi}+O(s)\right)d^2x.
$$

最初の項は体積型の発散として除き、有限な曲率項が残ります。$\delta_\sigma W=-\int\sqrt g\,\sigma\langle T^a{}_a\rangle$ という符号規約で読み戻すと係数は $1/(24\pi)$ です。これは局所短距離係数の計算であり、EuclidからLorentzへの延長、正則化の局所共変性、境界項・IR零モードの扱いを仮定しています。熱核の漸近展開自体の一般証明はここでは使用する標準入力であり、2次元自由場の全構成を導出したという主張ではありません。

## 3. 保存則と異常から二つの状態関数が残る

2次元計量について非零Christoffel記号は $\Gamma^u_{uu}=2\partial_u\rho$ と $\Gamma^v_{vv}=2\partial_v\rho$ だけです。Ricciの縮約を直接行うと

$$
R=8e^{-2\rho}\partial_u\partial_v\rho.
$$

トレースの式 $T^a{}_a=2g^{uv}T_{uv}=-4e^{-2\rho}T_{uv}$ に[異常の定義](#def-qcurv16-trace-anomaly)を代入すると、混合成分が固定されます。残りの $T_{uu}$ と $T_{vv}$ は保存条件 $\nabla^a T_{ab}=0$ で決まりますが、**状態に応じた一変数関数**が積分定数として残ります。

<a id="thm-qcurv16-stress-reconstruction"></a>

<!-- formal-statement-start -->
> **定理（2次元共形応力テンソルの復元）**
> $ds^2=-e^{2\rho(u,v)}du\,dv$ の滑らかな座標長方形上で、中央電荷 $c_{\rm CFT}>0$ の非カイラル共形場の保存的な対称期待値 $T_{ab}$ が $T^a{}_a=c_{\rm CFT}R/(24\pi)$ を満たすとする。すると滑らかな一変数関数 $t_u(u),t_v(v)$ が存在し、

$$
\begin{aligned}
T_{uu}&=\frac{c_{\rm CFT}}{12\pi}
\bigl(\partial_u^2\rho-(\partial_u\rho)^2\bigr)+t_u(u),\\
T_{vv}&=\frac{c_{\rm CFT}}{12\pi}
\bigl(\partial_v^2\rho-(\partial_v\rho)^2\bigr)+t_v(v),\\
T_{uv}&=-\frac{c_{\rm CFT}}{12\pi}\partial_u\partial_v\rho.
\end{aligned}
$$

> 逆に任意の滑らかな $t_u,t_v$ を代入した右辺は同じトレースと保存則を満たす。量子状態に実現可能な $t_u,t_v$ は、さらに二点分布の正値性・境界条件等に制約される。
<!-- formal-statement-end -->

### 証明の見取り図

異常で $T_{uv}$ を決め、$\nabla^aT_{au}=0$ を積分します。$v$ で微分すると消える項こそ $t_u(u)$ です。反対向きも同様ですが、両方の偏微分式を実際に書いて確かめます。

<!-- proof-start -->
### 証明

曲率式とトレースを比較して

$$
-4e^{-2\rho}T_{uv}
=\frac{c_{\rm CFT}}{24\pi}8e^{-2\rho}\rho_{uv},
\qquad T_{uv}=-\frac{c_{\rm CFT}}{12\pi}\rho_{uv}.
$$

$g^{uv}=-2e^{-2\rho}$ と $\Gamma^u_{uu}=2\rho_u$ を使うと、$b=u$ の保存則は

$$
0=\nabla^aT_{au}
=-2e^{-2\rho}\bigl(\partial_vT_{uu}
+\partial_uT_{uv}-2\rho_uT_{uv}\bigr).
$$

従って

$$
\begin{aligned}
\partial_vT_{uu}
&=\frac{c_{\rm CFT}}{12\pi}
\bigl(\rho_{uuv}-2\rho_u\rho_{uv}\bigr)\\
&=\partial_v\left[\frac{c_{\rm CFT}}{12\pi}
(\rho_{uu}-\rho_u^2)\right].
\end{aligned}
$$

長方形は $v$ 方向に連結なので差は $u$ だけの関数 $t_u(u)$。同じ計算を $b=v$ に対して行うと

$$
\partial_u T_{vv}=
\frac{c_{\rm CFT}}{12\pi}
(\rho_{vvu}-2\rho_v\rho_{uv}),
$$

だから差は $t_v(v)$ です。逆向きはこれらの等式を代入して保存則とトレースを再確認すればよいです。最後の状態の実現性は局所保存則だけからは従いません。
<!-- proof-end -->

### 直接計算：曲率がないのに流束がある

$\rho=0$ の平坦領域なら $T_{uv}=0$、$T_{uu}=t_u(u)$、$T_{vv}=t_v(v)$ です。$t_u$ と $t_v$ が定数でも互いに異なれば、曲率が零なのに正味流束が残ります。この例は異常が「状態関数を強制的に零へする法則」ではないことを示します。逆に $\rho=\lambda uv$ なら $\rho_u=\lambda v$、$\rho_{uu}=0$ なので幾何項は $-c_{\rm CFT}\lambda^2v^2/(12\pi)$ となり、$t_u$ の選択だけでは局所曲率を消せません。

## 4. 真空の選択は座標の三階微分でどう現れるか

単調で3回微分可能な光線座標の付け替え $U=p(u)$ を考えます。$p'(u)>0$ として向きを保ち、$p'$ が消えない区間で扱います。$U$ で正周波数を定めた真空と、$u$ で正周波数を定めた真空は一般に一致しません。その差は、単なる $p''$ でなく一次変換で消える三階微分の組合せで測れます。

<a id="def-qcurv16-schwarzian"></a>

<!-- formal-statement-start -->
> **定義（Schwarzian微分）**
> 区間 $I$ 上の $C^3$ 級関数 $p:I\to\mathbb R$ が $p'(u)>0$ を満たすとき、$p$ の $u$ に関するSchwarzian微分を

$$
\{p,u\}:=\frac{p'''(u)}{p'(u)}
-\frac32\left(\frac{p''(u)}{p'(u)}\right)^2
$$

> とする。単位は $[u]^{-2}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv16-schwarzian -->
### 直接例：線形写像と指数写像

$p(u)=au+b$、$a>0$ なら $p''=p'''=0$ より $\{p,u\}=0$。一方 $p(u)=v_H-Ae^{-\kappa u}$、$A,\kappa>0$ なら

$$
p'=A\kappa e^{-\kappa u},\quad
\frac{p''}{p'}=-\kappa,\quad
\frac{p'''}{p'}=\kappa^2,
\quad \{p,u\}=-\frac{\kappa^2}{2}.
$$

この違いが放射の有無を決める計算に現れます。

**定義の確認**：両写像は $C^3$ 級で導関数が正、分母 $p'$ は零にならず、定義式の二つの比をそれぞれ求めました。
<!-- definition-example-end -->

<a id="prop-qcurv16-schwarzian-chain"></a>

<!-- formal-statement-start -->
> **命題（Schwarzianの合成則）**
> 向きを保つ $C^3$ 級局所微分同相 $U=p(u)$、$V=q(U)$ について、

$$
\{q\circ p,u\}=(p')^2\{q,p\}+\{p,u\}.
$$

> 特に $q(U)=(aU+b)/(cU+d)$、$ad-bc>0$ で分母が零でない区間なら $\{q,U\}=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

合成関数の3階導関数を出し、$q''p''$ を含む交差項が分母付きの二乗項と相殺することを確かめます。

<!-- proof-start -->
### 証明

$h=q\circ p$ と置くと、連鎖律を3回使い

$$
\begin{aligned}
h'&=q'p',\\
h''&=q''(p')^2+q'p'',\\
h'''&=q'''(p')^3+3q''p'p''+q'p'''.
\end{aligned}
$$

したがって

$$
\frac{h'''}{h'}=\frac{q'''}{q'}(p')^2
+3\frac{q''}{q'}p''+\frac{p'''}{p'},
$$

$$
\left(\frac{h''}{h'}\right)^2
=\left(\frac{q''}{q'}p'+\frac{p''}{p'}\right)^2
=\left(\frac{q''}{q'}\right)^2(p')^2
+2\frac{q''}{q'}p''+\left(\frac{p''}{p'}\right)^2.
$$

両式の差を $3/2$ の係数で取ると $q''p''$ が相殺され、主張を得ます。分数線形写像では $q'=(ad-bc)/(cU+d)^2$、$q''/q'=-2c/(cU+d)$、$q'''/q'=6c^2/(cU+d)^2$ なのでSchwarzianは零です。
<!-- proof-end -->

<a id="thm-qcurv16-state-transformation"></a>

<!-- formal-statement-start -->
> **定理（状態関数の座標変換と真空流束）**
> 2次元質量零自由スカラーの局所共変くりこみで、$U=p(u)$ が向きを保つ $C^3$ 級局所微分同相とする。$U$ と $u$ による同じ物理的テンソル $T_{ab}$ の上記復元式の状態関数は

$$
t_u(u)=(p'(u))^2t_U(p(u))
-\frac{c_{\rm CFT}}{24\pi}\{p,u\}.
$$

> と変換する。特に平坦な $ds^2=-du\,dv$ 上で $U=p(u)$ の正周波数真空を取り、対応する基準で $t_U=0$ とすると、その右向き成分は

$$
\langle T_{uu}\rangle=-\frac{c_{\rm CFT}}{24\pi}\{p,u\}.
$$

> ここでは $v$ 方向の状態を別に指定する。$T_{uu}$ はテンソル成分であり、状態関数 $t_u$ だけが非テンソル的に変換する。
<!-- formal-statement-end -->

### 証明の見取り図

共形因子は新座標で $\widetilde\rho=\rho-\frac12\log p'$ に変わります。復元式の幾何部分をこの式へ代入し、テンソル成分 $T_{uu}=(p')^2T_{UU}$ と比較するとSchwarzianが残ります。平坦の場合には二点分布の短距離展開から同じ係数を検算できます。

<!-- proof-start -->
### 証明

$ds^2=-e^{2\rho}du\,dv=-e^{2\widetilde\rho}dU\,dv$ から $\widetilde\rho(U,v)=\rho(u,v)-\frac12\log p'(u)$。$\partial_U=(p')^{-1}\partial_u$ を用いて

$$
\begin{aligned}
(p')^2\bigl(\widetilde\rho_{UU}-\widetilde\rho_U^2\bigr)
&=\rho_{uu}-\rho_u^2-\frac12\frac{p'''}{p'}
+\frac34\left(\frac{p''}{p'}\right)^2\\
&=\rho_{uu}-\rho_u^2-\frac12\{p,u\}.
\end{aligned}
$$

実際、$q=p''/p'$ と書けば $\widetilde\rho_U=(\rho_u-q/2)/p'$、$\widetilde\rho_{UU}=\{\rho_{uu}-q'/2-q(\rho_u-q/2)\}/(p')^2$ であり、積を差し引くと $-q'/2+q^2/4=-(p'''/p')/2+3q^2/4$ となります。

両座標の[2次元共形応力テンソルの復元](#thm-qcurv16-stress-reconstruction)を $T_{uu}=(p')^2T_{UU}$ に代入して幾何部分を移項すると、表示の変換式を得ます。

さらに平坦な $u$ 座標では、質量零スカラーの正周波数二点分布の右向き部分を $W_U=-\frac1{4\pi}\log[p(u)-p(u')-i0]+\text{(IR定数)}$ と書けます。$u$ 真空との差を2回微分して対角に近づけると

$$
\partial_u\partial_{u'}(W_U-W_u)
=-\frac1{4\pi}\left[
\frac{p'(u)p'(u')}{(p(u)-p(u'))^2}
-\frac1{(u-u')^2}\right].
$$

$\varepsilon=u'-u$ としてTaylor展開すれば、角括弧は $\{p,u\}/6+O(\varepsilon)$ です。よって極限は $-\{p,u\}/(24\pi)$。中央電荷 $c_{\rm CFT}$ の場合は係数が $c_{\rm CFT}$ 倍になります。異なる真空の差だから局所幾何に共通の有限項は相殺され、同じ結果を得ました。
<!-- proof-end -->

### 反例：任意の座標の付け替えが粒子を作るわけではない

同じMinkowski真空を $u$ から $U=p(u)$ で**単に書き直しても** $T_{ab}$ はテンソルとして変換するだけです。[状態関数の座標変換と真空流束](#thm-qcurv16-state-transformation)の非零Schwarzianは「$U$ 正周波数を基準として**別の状態を選ぶ**」ときに現れます。分数線形変換では[Schwarzianの合成則](#prop-qcurv16-schwarzian-chain)の計算から $\{p,u\}=0$ で、少なくとも局所流束差は零です。ここで失われるのは「座標ラベルの変更」と「真空選択」を区別する仮定です。

## 5. 崩壊時空の指数写像と遠方流束

[QCURV10の光線追跡](../QCURV10/index.md#thm-qcurv10-late-exponential)で、後期の出射遅延時刻 $u$ と過去の入射ラベル $v=p(u)$ の関係は適切な滑らかさの下で

$$
p(u)=v_H-Ae^{-\kappa u}+O(e^{-2\kappa u}),
\qquad A,\kappa>0
$$

となります。以下は2次元の透過率1のモデルで、過去の入射側の真空を与え、未来の遠方で $ds^2\to-du\,dv$ と規格化します。$O$ の3階までの導関数も対応する次数で減衰すると仮定します（**関数値だけの漸近展開から導関数の漸近は自動では出ません**）。

<a id="thm-qcurv16-hawking-flux"></a>

<!-- formal-statement-start -->
> **定理（指数光線写像の後期Schwarzian流束）**
> 2次元質量零非カイラル共形場（中央電荷 $c_{\rm CFT}>0$）について、過去の入射null時刻で選んだ真空を、遠方の出射時刻 $u$ へ $p(u)=v_H-Ae^{-\kappa u}$、$A,\kappa>0$ で移す。遠方は平坦で、左向き入射流束を零とする。このとき

$$
F_\infty=T_{uu}-T_{vv}
=\frac{c_{\rm CFT}\kappa^2}{48\pi}
=\frac{\pi c_{\rm CFT}}{12}T_H^2,
\qquad T_H=\frac\kappa{2\pi}.
$$

> 漸近指数写像でその1〜3階微分が対応する次数で指数形へ近づく場合には、この値が後期極限となる。4次元Schwarzschildの全角モードの光度を与える主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

指数写像では $p''/p'=-\kappa$、$p'''/p'=\kappa^2$ なのでSchwarzianは負です。負符号を含む[真空流束の式](#thm-qcurv16-state-transformation)に代入すると**外向きが正**となり、熱的な1次元のBoseエネルギー積分とも一致します。

<!-- proof-start -->
### 証明

[Schwarzian微分の直接例](#def-qcurv16-schwarzian)から $\{p,u\}=-\kappa^2/2$。出射状態に[状態関数の座標変換と真空流束](#thm-qcurv16-state-transformation)を適用して

$$
T_{uu}=-\frac{c_{\rm CFT}}{24\pi}
\left(-\frac{\kappa^2}{2}\right)
=\frac{c_{\rm CFT}\kappa^2}{48\pi}.
$$

入射側は遠方で $T_{vv}=0$ としたため[外向き流束の定義](#def-qcurv16-null-flux)から $F_\infty=T_{uu}$。温度は[QCURV11の温度導出](../QCURV11/index.md#thm-qcurv11-thermal-ratio)による $T_H=\kappa/(2\pi)$ で、$\kappa^2/(48\pi)=\pi T_H^2/12$ と代入します。

独立な係数の検算として、右向き1次元質量零Bose場の熱エネルギー流は

$$
\begin{aligned}
F_T&=\frac{c_{\rm CFT}}{2\pi}
\int_0^\infty\frac{\omega}{e^{\omega/T}-1}\,d\omega\\
&=\frac{c_{\rm CFT}T^2}{2\pi}
\sum_{n=1}^\infty\int_0^\infty xe^{-nx}\,dx\\
&=\frac{c_{\rm CFT}T^2}{2\pi}
\sum_{n=1}^\infty\frac1{n^2}
=\frac{\pi c_{\rm CFT}T^2}{12}.
\end{aligned}
$$

非負の項なので積分と和の交換は単調収束で正当化できます。$T=T_H$ を入れると同じ値です。一般共形場の $c_{\rm CFT}$ については中心荷と熱流の同じ規格化を仮定しています。
<!-- proof-end -->

ここで求めた流束は**後期・遠方・選んだ状態**の値です。有限時間の波束や入射励起があれば $t_v$ などが変わり、角運動量障壁のある4次元遠方流束には[QCURV12の灰色体因子](../QCURV12/index.md#thm-qcurv12-greybody-flux)が掛かります。trace anomalyだけで全ブラックホール蒸発を解いたことにはなりません。

## 6. 静的な2次元Schwarzschild断面で地平線の正則性を点検する

2次元の**独立した**模型として

$$
ds^2=-f(r)dt^2+\frac{dr^2}{f(r)},\qquad
f(r)=1-\frac{2M}{r},\quad r>2M
$$

を考えます。$dr_*/dr=f^{-1}$、$u=t-r_*$、$v=t+r_*$ なら $ds^2=-f(r)du\,dv$、$\rho=\frac12\log f$ です。$M>0$、$\kappa=f'(2M)/2=1/(4M)$ とし、$f$ は地平線を越えて滑らかに延長するものとします。4次元の角方向・dilaton・散乱を持たないことに注意します。

<a id="prop-qcurv16-static-stress"></a>

<!-- formal-statement-start -->
> **命題（静的null応力の地平線での相殺）**
> $M>0$、$r>2M$、$f(r)=1-2M/r$、$ds^2=-f(r)dt^2+f(r)^{-1}dr^2$ の2次元静的模型で、$u=t-r_*$、$v=t+r_*$、$dr_*/dr=f^{-1}$ とする。[2次元共形応力テンソルの復元](#thm-qcurv16-stress-reconstruction)の状態関数を定数 $t_u,t_v$ としたとき、外部領域の応力テンソルは

$$
T_{uu}=\frac{c_{\rm CFT}}{192\pi}
\left(2ff''-(f')^2\right)+t_u,
\qquad
T_{vv}=\frac{c_{\rm CFT}}{192\pi}
\left(2ff''-(f')^2\right)+t_v.
$$

> ここでプライムは $r$ 微分である。将来地平線で出射Kruskal成分 $T_{UU}$ が有限となるための必要な定数項相殺は $t_u=c_{\rm CFT}\kappa^2/(48\pi)$ であり、この模型の滑らかな $f$ では同条件により実際に $T_{uu}=O((r-2M)^2)$ となる。遠方では $T_{uu}\to t_u$、$T_{vv}\to t_v$。
<!-- formal-statement-end -->

### 証明の見取り図

$r_*$ を $u$ で微分すると $\partial_ur=-f/2$。これを $\rho_r=f'/(2f)$ へ2回適用すれば、地平線での幾何的な負の定数が出ます。Kruskal成分へ変換するときの二乗発散を相殺できるか確かめます。

<!-- proof-start -->
### 証明

$r_*=(v-u)/2$ だから $\partial_ur=-f/2$ と $\partial_vr=f/2$。連鎖律で

$$
\rho_u=\frac{f'}{2f}\left(-\frac f2\right)=-\frac{f'}4,
\qquad \rho_{uu}=-\frac{f''}4\left(-\frac f2\right)
=\frac{ff''}{8}.
$$

従って[2次元共形応力テンソルの復元](#thm-qcurv16-stress-reconstruction)に代入して

$$
\frac{c_{\rm CFT}}{12\pi}
(\rho_{uu}-\rho_u^2)
=\frac{c_{\rm CFT}}{12\pi}
\left(\frac{ff''}{8}-\frac{(f')^2}{16}\right)
=\frac{c_{\rm CFT}}{192\pi}(2ff''-(f')^2).
$$

$v$ 方向も $\rho_v=f'/4$、$\rho_{vv}=ff''/8$ で同じ幾何項です。$r_h=2M$ で $f(r_h)=0$、$f'(r_h)=2\kappa$ より幾何項は $-c_{\rm CFT}\kappa^2/(48\pi)$。さらに $H(r)=2ff''-(f')^2$ と置くと $H'(r)=2ff'''$ なので $H'(r_h)=0$。$f\in C^3$ の滑らかさから $H(r)-H(r_h)=O((r-r_h)^2)$ です。

将来地平線を横切る座標 $U=-\kappa^{-1}e^{-\kappa u}$ で $du/dU=-1/(\kappa U)$ だから

$$
T_{UU}=\left(\frac{du}{dU}\right)^2T_{uu}
=\frac{T_{uu}}{\kappa^2U^2}.
$$

固定した有限の $v$ で地平線へ近づくと $r-r_h=O(|U|)$。指定の $t_u$ なら $T_{uu}=O(U^2)$ なので有限ですが、定数項が残れば $U^{-2}$ で発散します。$r\to\infty$ では $f'$, $f''$ が零へ減衰するため定数 $t_u,t_v$ が残ります。
<!-- proof-end -->

### 三つの状態をこの模型で比較する

定数状態関数の組は、平坦遠方を入出射真空とするBoulware型 $(t_u,t_v)=(0,0)$、将来地平線で正則・無限遠からの入射なしのUnruh型 $(q,0)$、両方向に熱流を持ち正味流束零のHartle–Hawking型 $(q,q)$ です。ただし $q=c_{\rm CFT}\kappa^2/(48\pi)$。これは[QCURV13の物理的な三状態](../QCURV13/index.md#def-qcurv13-three-states)の**2次元での比較模型**であって、4次元のそれぞれの応力テンソルをそのまま与えるものではありません。

| 2次元モデルの状態 | $t_u$ | $t_v$ | 遠方の正味流束 $F$ | 将来地平線 |
| --- | ---: | ---: | ---: | --- |
| Boulware型 | $0$ | $0$ | $0$ | 出射成分が非正則 |
| Unruh型 | $q$ | $0$ | $q$ | 出射成分が正則 |
| Hartle–Hawking型 | $q$ | $q$ | $0$ | 出射成分が正則 |

## 7. 演習――曲率・状態・流束を自力で切り分ける

### Level A：構造と符号

<a id="ex-qcurv16-a01"></a>
#### QCURV16-A01 null方向と外向き流束
- Level: A
- 問題: $ds^2=-dt^2+dx^2$ と $u=t-x$, $v=t+x$ を使う。右向き古典波 $\phi(u)=\sin(ku)$、$k>0$ の $T_{uu},T_{vv},T_{tx},T^{tx}$ を求め、外向き流束の符号を確認せよ。

<!-- solution-start -->
**詳細解答**：[null流束の定義](#def-qcurv16-null-flux)に従い $\partial_u\phi=k\cos(ku)$、$\partial_v\phi=0$。2次元質量零場では $T_{uu}=(\partial_u\phi)^2$、$T_{vv}=(\partial_v\phi)^2$ だから

$$
T_{uu}=k^2\cos^2(ku),\quad T_{vv}=0,
\quad T_{tx}=-k^2\cos^2(ku),\quad
T^{tx}=k^2\cos^2(ku)\ge0.
$$

$T^{tx}=-T_{tx}$ は時間方向の逆計量 $g^{tt}=-1$ によります。
<!-- solution-end -->

<a id="ex-qcurv16-a02"></a>
#### QCURV16-A02 異常とトレース
- Level: A
- 問題: $ds^2=-e^{2\lambda uv}du\,dv$、$\lambda\ne0$、$c_{\rm CFT}=1$ とする。曲率 $R$、$T_{uv}$、$T^a{}_a$ を計算し、$T_{uv}$ がどのように状態と無関係になるかを説明せよ。

<!-- solution-start -->
**詳細解答**：$\rho=\lambda uv$ から $\rho_{uv}=\lambda$。[この模型のトレース異常](#def-qcurv16-trace-anomaly)と[2次元共形応力テンソルの復元](#thm-qcurv16-stress-reconstruction)により

$$
R=8\lambda e^{-2\lambda uv},\quad
T_{uv}=-\frac\lambda{12\pi},\quad
T^a{}_a=-4e^{-2\lambda uv}T_{uv}
=\frac{\lambda e^{-2\lambda uv}}{3\pi}.
$$

$t_u,t_v$ は $T_{uu},T_{vv}$ だけに入るため、混合成分とトレースには入りません。
<!-- solution-end -->

<a id="ex-qcurv16-a03"></a>
#### QCURV16-A03 Schwarzianの係数
- Level: A
- 問題: $p(u)=a+bu$（$b>0$）および $p(u)=a-be^{-\kappa u}$（$b,\kappa>0$）について $\{p,u\}$ と $-\{p,u\}/(24\pi)$ を求めよ。

<!-- solution-start -->
**詳細解答**：[Schwarzian微分](#def-qcurv16-schwarzian)を使います。線形写像では $p''=p'''=0$ なので両値とも零。指数写像では $p'=b\kappa e^{-\kappa u}$、$p''/p'=-\kappa$、$p'''/p'=\kappa^2$ ですから

$$
\{p,u\}=\kappa^2-\frac32\kappa^2=-\frac{\kappa^2}{2},
\qquad -\frac1{24\pi}\{p,u\}=\frac{\kappa^2}{48\pi}.
$$

引数の次元から最終式は時間の逆数の2乗です。
<!-- solution-end -->

<a id="ex-qcurv16-a04"></a>
#### QCURV16-A04 状態関数の流束
- Level: A
- 問題: 平坦な2次元領域で $t_u=3q$、$t_v=q$（$q>0$、エネルギー流束の次元を持つ）とする。$T_{uv}$、$T^a{}_a$、$T^{tx}$ を求めよ。曲率が零なら流束も零か。

<!-- solution-start -->
**詳細解答**：$\rho=0$ であるため[2次元共形応力テンソルの復元](#thm-qcurv16-stress-reconstruction)から $T_{uv}=0$、$T_{uu}=3q$、$T_{vv}=q$。従って

$$
T^a{}_a=-4T_{uv}=0,
\qquad T^{tx}=T_{uu}-T_{vv}=2q>0.
$$

トレース零は二つのnull方向の放射が相殺するという意味ではありません。曲率零でも状態の選択で正味流束が存在します。
<!-- solution-end -->

### Level B：保存則と正則性

<a id="ex-qcurv16-b01"></a>
#### QCURV16-B01 保存則からの復元
- Level: B
- 問題: $ds^2=-e^{2\rho}du\,dv$ で $\rho(u,v)=\alpha u^2v$（$\alpha\ne0$）とし $c_{\rm CFT}=1$。保存則と異常を満たす $T_{uv}$、$T_{uu}$ の一般形を求め、$\partial_vT_{uu}+\partial_uT_{uv}-2\rho_uT_{uv}=0$ を直接検算せよ。

<!-- solution-start -->
**詳細解答**：$\rho_u=2\alpha uv$、$\rho_{uu}=2\alpha v$、$\rho_{uv}=2\alpha u$ だから[2次元共形応力テンソルの復元](#thm-qcurv16-stress-reconstruction)より

$$
T_{uv}=-\frac{\alpha u}{6\pi},\qquad
T_{uu}=\frac1{12\pi}(2\alpha v-4\alpha^2u^2v^2)+t_u(u).
$$

ここで微分を実行すると

$$
\begin{aligned}
\partial_vT_{uu}&=\frac1{12\pi}(2\alpha-8\alpha^2u^2v),\\
\partial_uT_{uv}&=-\frac{\alpha}{6\pi},\\
-2\rho_uT_{uv}&=-4\alpha uv\left(-\frac{\alpha u}{6\pi}\right)
=\frac{2\alpha^2u^2v}{3\pi}.
\end{aligned}
$$

右辺を通分すると $\alpha/(6\pi)-2\alpha^2u^2v/(3\pi)-\alpha/(6\pi)+2\alpha^2u^2v/(3\pi)=0$ です。$\partial_vt_u=0$ が必要な自由度の形も確認しました。
<!-- solution-end -->

<a id="ex-qcurv16-b02"></a>
#### QCURV16-B02 分数線形変換と合成
- Level: B
- 問題: $p(u)=e^u$、$q(U)=U/(1+U)$（$U>0$）とする。$\{p,u\}$、$\{q,U\}$、$\{q\circ p,u\}$ を別々に計算し、合成則が成り立つことを示せ。

<!-- solution-start -->
**詳細解答**：$p'=p''=p'''=e^u$ から $\{p,u\}=1-3/2=-1/2$。[分数線形写像](#prop-qcurv16-schwarzian-chain) $q$ について

$$
q'=(1+U)^{-2},\quad
q''=-2(1+U)^{-3},\quad
q'''=6(1+U)^{-4}
$$

だから $q'''/q'=6/(1+U)^2$、$(q''/q')^2=4/(1+U)^2$ で $\{q,U\}=0$。合成関数 $h=e^u/(1+e^u)$ には $h'=e^u/(1+e^u)^2$ なので

$$
\frac{h''}{h'}=\frac{1-e^u}{1+e^u},\qquad
\frac{h'''}{h'}=\frac{1-4e^u+e^{2u}}{(1+e^u)^2}.
$$

従って $\{h,u\}=[1-4e^u+e^{2u}-(3/2)(1-2e^u+e^{2u})]/(1+e^u)^2=-1/2$。合成則の右辺も $(p')^2\cdot0-1/2=-1/2$ です。
<!-- solution-end -->

<a id="ex-qcurv16-b03"></a>
#### QCURV16-B03 将来地平線の相殺
- Level: B
- 問題: $f(r)=1-2M/r$（$M>0$）の2次元模型で $t_u=q=c_{\rm CFT}/(768\pi M^2)$ を選ぶ。$r=2M$ で $T_{uu}$ の定数項が消えることと、$r$ 微分の一次項も消えることを計算せよ。また $t_u=0$ では何が壊れるか。

<!-- solution-start -->
**詳細解答**：$f'(r)=2M/r^2$、$f''(r)=-4M/r^3$。$r_h=2M$ では $f'(r_h)=1/(2M)$、$\kappa=f'(r_h)/2=1/(4M)$ です。[静的null応力の地平線での相殺](#prop-qcurv16-static-stress)により幾何項は

$$
\frac{c_{\rm CFT}}{192\pi}\left(-\frac1{4M^2}\right)
=-\frac{c_{\rm CFT}}{768\pi M^2}=-q.
$$

$H=2ff''-(f')^2$ と置けば $H'=2ff'''$。$f(r_h)=0$ なので $H'(r_h)=0$。よって $t_u=q$ の場合は $T_{uu}=O((r-r_h)^2)$、$U$ が $r-r_h$ に比例する接近では $T_{UU}$ は有限です。$t_u=0$ では $T_{uu}\to-q$ が残り、$T_{UU}=T_{uu}/(\kappa^2U^2)$ が発散します。
<!-- solution-end -->

<a id="ex-qcurv16-b04"></a>
#### QCURV16-B04 熱的流束と中央荷
- Level: B
- 問題: 2次元非カイラル共形場の右向き熱流を $F_T=\frac{c_{\rm CFT}}{2\pi}\int_0^\infty\omega(e^{\omega/T}-1)^{-1}d\omega$ とする（$T>0$、$c_{\rm CFT}>0$）。級数展開で $F_T$ を評価し、同じ温度で両方向から流入する場合の正味流束を求めよ。$\sum_{n\ge1}n^{-2}=\pi^2/6$ は用いてよい。

<!-- solution-start -->
**詳細解答**：$x=\omega/T$ と置き $1/(e^x-1)=\sum_{n\ge1}e^{-nx}$。非負の項だから単調収束で交換でき、部分積分から $\int_0^\infty xe^{-nx}dx=n^{-2}$。従って

$$
F_T=\frac{c_{\rm CFT}T^2}{2\pi}\sum_{n\ge1}\frac1{n^2}
=\frac{\pi c_{\rm CFT}T^2}{12}.
$$

右向きと左向きが同じ温度なら $T_{uu}=T_{vv}=F_T$ なので、[流束の定義](#def-qcurv16-null-flux)により正味 $F=0$ です。個々の方向のエネルギー密度が零になったわけではありません。
<!-- solution-end -->

### Level C：状態と幾何を統合する

<a id="ex-qcurv16-c01"></a>
#### QCURV16-C01 近地平線・遠方・入射浴の三点検算
- Level: C
- 問題: 2次元静的模型 $ds^2=-fdt^2+f^{-1}dr^2$、$f=1-2M/r$（$M>0$）と質量零共形場（$c_{\rm CFT}=1$）を考える。$\kappa=1/(4M)$、$q=\kappa^2/(48\pi)$ とする。（a）$t_u=q,t_v=0$ と $t_u=t_v=q$ の遠方流束を求めよ。（b）両者の将来地平線での出射成分 $T_{UU}$ の有限性を示せ。（c）後者の遠方正味流束零が、異常零や粒子数零を意味しない理由を述べよ。（d）同じ式を4次元の厳密な蒸発光度と認めてよいか。

<!-- solution-start -->
**詳細解答**：[静的null応力の地平線での相殺](#prop-qcurv16-static-stress)から両成分は $G(r)+t_u$、$G(r)+t_v$ となります。ここで $G(r)$ は次の幾何項です。

$$
G(r)=\frac{2f(r)f''(r)-(f'(r))^2}{192\pi}.
$$

（a）遠方では $G\to0$ なので、Unruh型は $F_\infty=q-0=q$、Hartle–Hawking型は $F_\infty=q-q=0$。$F=T_{uu}-T_{vv}$ という符号を用いました。

（b）$r_h=2M$ で $G(r_h)=-q$、かつ $G'(r_h)=(2ff''')/(192\pi)=0$。Taylor展開で $G+q=O((r-r_h)^2)$。固定した正則な $v$ で近づくと $r-r_h=O(U)$ ですから

$$
T_{UU}=\frac{G(r)+q}{\kappa^2U^2}=O(1).
$$

どちらの状態も同じ $t_u=q$ なので、この出射正則性は共通です。入射成分の将来地平線での有限性には別の正則座標 $v$ と初期境界条件を使います。

（c）遠方での正味流束零は二方向の流れの相殺です。[この模型のトレース異常](#def-qcurv16-trace-anomaly)は局所曲率 $R$ に依存し、曲がった領域で一般に非零です。また熱平衡の状態では二つの方向の占有数がどちらも正でも差は零にできます。

（d）不可。[QCURV12の散乱因子](../QCURV12/index.md#thm-qcurv12-greybody-flux)が4次元の角運動量モードに作用し、次元縮約でdilaton結合も残るためです。さらに半古典Einstein方程式を解いておらず、背景の時間発展を証明していません。
<!-- solution-end -->

## 8. この模型で分かること、分からないこと

1. trace anomalyは局所共変な量子応力テンソルのトレースに現れる曲率項です。保存則と組み合わせると**幾何部分**は定まりますが、状態を指定する関数 $t_u,t_v$ は残ります。
2. Schwarzian微分は真空の選択をnull座標の変換で比較する道具です。指数光線写像から2次元の正の後期外向き流束が出て、[Hawking温度](../QCURV11/index.md#thm-qcurv11-thermal-ratio)で計算した熱流と一致します。
3. 地平線での正則性と遠方の流束は別条件です。どの状態を選ぶかにより、同じ静的背景でもBoulware・Unruh・Hartle–Hawking型の振る舞いが変わります。
4. この2次元自由・共形模型には4次元の散乱・dilaton・量子重力の効果は含まれません。次に重力へ量子期待値を戻すには、保存則と状態選択に加え、半古典重力方程式の適用範囲を調べる必要があります。

参考：P. C. W. Davies, S. A. Fulling, W. G. Unruh, “Energy-momentum tensor near an evaporating black hole”, *Phys. Rev. D* **13** (1976), 2720–2723, https://doi.org/10.1103/PhysRevD.13.2720 。2次元の局所応力テンソル、保存則、境界条件と蒸発流束の関係を扱う原論文です。
