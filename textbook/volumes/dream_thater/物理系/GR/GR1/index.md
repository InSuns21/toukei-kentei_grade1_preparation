# GR1 等価原理と局所自由落下

<!-- definition-example-audit: strict -->

[特殊相対論の固有時](../../SREL/SREL2/index.md#def-srel2-proper-time)は、慣性系だけでなく加速する時計についても積分で求められました。また[SREL8のRindler座標](../../SREL/SREL8/index.md#def-srel8-rindler-chart)は、平坦な時空の中に「重力があるように見える」加速系を作ります。それなら、地上で落ちる物体と宇宙船内で落ちる物体は、どこまで同じ法則で記述できるのでしょうか。

この章では、まず**実験に基づく等価原理**と**座標変換から証明できること**を切り分けます。重力を含む一般の計量と測地線方程式はGR2・GR3で導入します。ここでは既習のMinkowski時空と一様加速する観測者だけを使い、局所自由落下が意味すること、そして潮汐効果を消せない理由を調べます。

本章では $c>0$ を光速、$a>0$ を加速度の定数とします。時空座標を $(x^0,x^1,x^2,x^3)=(cT,X,y,z)$ とします。SREL2・SREL8の計量符号は $(+,-,-,-)$ でしたが、**GR系列は $(-,+,+,+)$** を採用します。そこでMinkowski線素を

$$
ds^2=-c^2dT^2+dX^2+dy^2+dz^2
$$

とし、時間的世界線では $ds^2=-c^2d\tau^2$ と定めます。ここで $T$ は慣性系の時刻、$\tau$ は時計の固有時です。計量全体の符号を反転しても、同じ物理的時計の読みは変わりません。

## 1. 全ての物体が同じように落ちる、とは何か

Newton力学の一様な下向き重力場を、上向きを正とする高さ $Z$ で考えます。慣性質量を $m_{\mathrm i}>0$、重力質量を $m_{\mathrm g}>0$ と区別すると、試験物体の運動方程式は

$$
m_{\mathrm i}\frac{d^2Z}{dt^2}=-m_{\mathrm g}g,\qquad g>0
$$

です。ここから観測できる落下加速度を計算すると $d^2Z/dt^2=-(m_{\mathrm g}/m_{\mathrm i})g$ となります。異なる組成の物体が同じように落ちるという実験的事実は、単に「質量が式から消える」という代数的偶然ではありません。質量の**比が物体に依存しない**という入力を必要とします。

<a id="principle-gr1-wep"></a>

<!-- formal-statement-start -->
> **原理（弱い等価原理）**  
> 同じ初期位置・初期速度から、重力以外の作用と自己重力を無視できる十分小さい試験物体を同じ外部重力場で自由落下させると、落下運動は物体の組成・内部構造に依存しない。これは実験に基づく物理原理であり、Newtonの運動方程式だけから導かれる数学的定理ではない。
<!-- formal-statement-end -->

### 直接例：質量比が一定であることを確かめる

二物体 $A,B$ の落下加速度がともに $-g$ なら、上のNewton模型では $(m_{\mathrm g}/m_{\mathrm i})_A=(m_{\mathrm g}/m_{\mathrm i})_B=1$ です。重力場の強さの基準を別に選べば共通比は1以外にも書けますが、**物体によらず同じ比**であることが原理の検証対象です。一方、$A$ の比が1、$B$ の比が $1+\varepsilon$ なら、$\varepsilon\ne0$ に対して加速度差は $-\varepsilon g$ となり、原理の想定と両立しません。

この原理は重力場が一様であることを主張しません。位置によって重力が変わる場所では、**異なる位置**の物体の加速度は一般に異なります。

## 2. 落下する小さな実験室

まず、上の模型で全ての試験物体に $Z''(t)=-g$ が成立すると仮定します。時刻 $t=0$ に実験室の原点を $Z=0$ から初速度0で落とすと、その原点は $Z_{\mathrm o}(t)=-gt^2/2$ を進みます。実験室とともに動く位置を

$$
\zeta=Z-Z_{\mathrm o}(t)=Z+\frac12gt^2
$$

と置けば、落ちる物体の実験室内での加速度は零になるはずです。

<a id="def-gr1-freefall-lab"></a>

<!-- formal-statement-start -->
> **定義（局所自由落下実験室）**  
> 重力以外の作用を無視できる試験物体の一つに原点を合わせ、原点とともに落下する小領域・短時間の実験室を局所自由落下実験室という。Newtonの一様重力模型では、原点 $Z_{\mathrm o}(t)=-gt^2/2$ と同じ初速度を持つ座標 $\zeta=Z-Z_{\mathrm o}(t)$ を用いる。一般の重力場では実験室の大きさと観測時間を十分小さくした極限での記述を意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr1-freefall-lab -->
### 直接例：自由落下実験室の定義を確認する

**定義の確認**：$Z_{\mathrm o}(0)=0$、$Z_{\mathrm o}'(0)=0$ で、$Z_{\mathrm o}''=-g$ なので原点自身が自由落下します。同じ初期速度を持つ物体 $Z(t)=Z_0-gt^2/2$ について

$$
\zeta(t)=Z(t)+\frac12gt^2=Z_0,\qquad \zeta''(t)=0
$$

です。原点を合わせる条件と、物体が実験室内で加速しない条件の双方を確かめました。別の初速度 $v_0$ で投げた物体でも $\zeta(t)=Z_0+v_0t$ となって、等速運動をします。
<!-- definition-example-end -->

ただし、重力加速度が位置で変わると、実験室の中心だけを基準としても周囲の全物体を同時に静止させることはできません。例として $Z$ の近傍で落下加速度が $-g-\kappa Z$（定数 $\kappa$）なら、二物体の高さ差 $\delta Z=Z_B-Z_A$ は

$$
\delta Z''=Z_B''-Z_A''=-\kappa(Z_B-Z_A)=-\kappa\delta Z
$$

を満たします。座標を両者とも $\zeta=Z+gt^2/2$ へ移しても、差 $\delta\zeta=\delta Z$ は不変であり、この相対加速度は消えません。これが潮汐効果の最も簡単な入口です。$\kappa$ を含む場の一般的な幾何学的説明はGR5で扱います。

## 3. 局所的に特殊相対論へ戻る、という物理原理

小さい自由落下実験室で非重力的な測定を行うとき、重力を感じない記述を選べると期待するのが一般相対論の出発点です。ただし「全宇宙にわたって重力を座標変換で消せる」と主張してはいません。

<a id="principle-gr1-eep"></a>

<!-- formal-statement-start -->
> **原理（Einstein等価原理）**  
> 十分小さく、観測時間も十分短い自由落下実験室では、局所的な**非重力実験**の結果が場所・時刻や実験室の一様な速度によらず、特殊相対論の法則に従うとする。これには自由落下の普遍性、局所Lorentz不変性、局所位置不変性が含まれる。有限領域に残る潮汐効果や、重力自体を調べる実験まで同一視する主張ではない。
<!-- formal-statement-end -->

### 直接例：何を測れば区別できるか

密閉した小実験室で、十分短い時間だけ落下する物体を観測すると、地上付近で自由落下する室内と遠方の慣性運動する室内では同じ等速運動が得られます。ただしこれは上述の物理原理の適用例であって、座標変換から原理そのものを証明したわけではありません。大きな実験室に二つの自由落下体を離して置き、距離の変化を精密に測れば、潮汐効果を調べることができます。

## 4. 加速系が作る「重力らしい」計量

重力のある系を議論する前に、**本当は曲がっていない時空を加速系で記述**して、何が見かけにすぎないかを確かめます。[SREL8の右Rindler座標](../../SREL/SREL8/index.md#def-srel8-rindler-chart)を利用し、定数 $s_0=c^2/a$、$s=s_0+\xi>0$、$A=a\eta/c$ に対して

$$
cT=s\sinh A,\qquad X=s\cosh A
$$

と置きます。$\eta$ は時間、$\xi$ は長さで、$y,z$ はそのままです。対象は $X>|cT|$ というMinkowski時空の右くさびだけです。$s>0$ と $\cosh A>|\sinh A|$ から、確かにこの領域に入ります。

SREL8では線素が $+c^2(1+a\xi/c^2)^2d\eta^2-d\xi^2-dy^2-dz^2$ でした。[SREL2のMinkowski計量](../../SREL/SREL2/index.md#def-srel2-minkowski-metric)を全体としてマイナス倍した本章の約束に揃えると、次の式になるはずです。

<a id="prop-gr1-rindler-metric"></a>

<!-- formal-statement-start -->
> **命題（GR符号規約でのRindler計量）**  
> $c,a>0$、$s_0=c^2/a$ とし、$\eta\in\mathbb R$、$\xi>-s_0$ で上のRindler変換を定める。Minkowski計量 $ds^2=-c^2dT^2+dX^2+dy^2+dz^2$ のこの座標での表示は

$$
ds^2=-c^2\left(1+\frac{a\xi}{c^2}\right)^2d\eta^2+d\xi^2+dy^2+dz^2
$$

> である。この表示は右くさび内で非退化であり、平坦なMinkowski時空を別の座標で記したものにすぎない。
<!-- formal-statement-end -->

### 証明の見取り図

座標の微分の二乗から交差項が消えることを計算します。曲率が零であることは、座標係数が一定という理由ではなく、元のMinkowski座標へ滑らかに戻れることから分かります。

<!-- proof-start -->
### 証明

$s=s_0+\xi$、$A=a\eta/c$ に対して $ds=d\xi$、$dA=(a/c)d\eta$ です。積の微分から

$$
\begin{aligned}
d(cT)&=\sinh A\,d\xi+\frac{as}{c}\cosh A\,d\eta,\\
dX&=\cosh A\,d\xi+\frac{as}{c}\sinh A\,d\eta.
\end{aligned}
$$

符号 $(-,+,+,+)$ のため、二乗の差は

$$
\begin{aligned}
-d(cT)^2+dX^2
&=(\cosh^2A-\sinh^2A)d\xi^2\\
&\quad+2\frac{as}{c}(\cosh A\sinh A-\sinh A\cosh A)d\xi\,d\eta\\
&\quad+\frac{a^2s^2}{c^2}(\sinh^2A-\cosh^2A)d\eta^2\\
&=d\xi^2-\frac{a^2s^2}{c^2}d\eta^2.
\end{aligned}
$$

$s=c^2(1+a\xi/c^2)/a$ を代入し、$dy^2+dz^2$ を足せば式を得ます。$\xi>-s_0$ なので $1+a\xi/c^2>0$、計量行列の行列式は $-c^2(1+a\xi/c^2)^2<0$ です。逆変換は

$$
s=\sqrt{X^2-c^2T^2},\quad
\xi=s-s_0,\quad
\eta=\frac{c}{2a}\log\frac{X+cT}{X-cT}
$$

で、右くさび内では分母・対数の引数が正です。元の平坦計量への可逆な座標変換である以上、幾何学的な曲率は発生しません。
<!-- proof-end -->

## 5. 加速しているのは誰の時計か

$h(\xi)=1+a\xi/c^2>0$ と置きましょう。Rindler座標で $\xi=\xi_*$、$y,z$ 一定の時計は、線素から $d\tau=h_*d\eta$、$h_*=h(\xi_*)$ だけ固有時を刻みます。しかし同じ時計は慣性系では双曲線 $X^2-c^2T^2=(s_0+\xi_*)^2$ を描く**加速する時計**です。

<a id="prop-gr1-static-accel"></a>

<!-- formal-statement-start -->
> **命題（静止Rindler時計の固有加速度）**  
> $c,a>0$、$\xi_*>-c^2/a$、$s_*=c^2/a+\xi_*$ とし、$y,z$ 一定、$\xi=\xi_*$ の未来向き世界線を考える。$\eta=0$ に固有時原点を選ぶと $\tau=h_*\eta$ であり、その固有加速度は

$$
\alpha=\sqrt{b_\mu b^\mu}=\frac{c^2}{s_*}
=\frac{a}{1+a\xi_*/c^2}
$$

> となる。ここで $b^\mu=d^2x^\mu/d\tau^2$ は慣性座標での四元加速度で、内積は $(-,+,+,+)$ による。
<!-- formal-statement-end -->

### 証明の見取り図

[SREL8の固有加速度の式](../../SREL/SREL8/index.md#prop-srel8-proper-accel)を、本章の計量符号で検算します。加速度ベクトルの成分は変えず、そのノルムの符号だけが変わります。

<!-- proof-start -->
### 証明

$d\xi=dy=dz=0$ を[本章の計量](#prop-gr1-rindler-metric)に代入すると $-c^2d\tau^2=-c^2h_*^2d\eta^2$ です。未来向き条件から $d\tau=h_*d\eta$ であり、$\tau=0$ を $\eta=0$ に合わせれば $\tau=h_*\eta$。さらに $h_*=as_*/c^2$ なので $A=a\eta/c=c\tau/s_*$ となります。

$$
x^\mu(\tau)=\left(s_*\sinh\frac{c\tau}{s_*},\,
s_*\cosh\frac{c\tau}{s_*},\,y_*,\,z_*\right).
$$

これを固有時で一度微分すると

$$
u^\mu=\left(c\cosh\frac{c\tau}{s_*},\,
c\sinh\frac{c\tau}{s_*},\,0,\,0\right),
$$

もう一度微分すると

$$
b^\mu=\left(\frac{c^2}{s_*}\sinh\frac{c\tau}{s_*},\,
\frac{c^2}{s_*}\cosh\frac{c\tau}{s_*},\,0,\,0\right).
$$

$(-,+,+,+)$ で内積を取ると、$u_\mu u^\mu=-c^2$、$u_\mu b^\mu=0$、さらに

$$
b_\mu b^\mu=\frac{c^4}{s_*^2}
\left(-\sinh^2\frac{c\tau}{s_*}+\cosh^2\frac{c\tau}{s_*}\right)
=\frac{c^4}{s_*^2}.
$$

$s_*>0$ より正の平方根は $c^2/s_*$ です。
<!-- proof-end -->

$\xi_*=0$ の時計なら $\alpha=a$、$\xi_*=s_0$ なら $\alpha=a/2$ です。別の位置で同じRindler座標を保つには、**別々の固有加速度**が必要です。これは一様な重力場を全領域で厳密に実現したこととは違います。

## 6. 自由な粒子には見かけの落下加速度が現れる

今度は慣性座標で $X=X_*>0$、$y=z=0$ に静止している粒子を考えます。外力がなければ慣性座標では直線世界線なので自由運動ですが、加速するRindler観測者からは落下して見えるはずです。

<a id="prop-gr1-freefall-coordinate-accel"></a>

<!-- formal-statement-start -->
> **命題（瞬間静止の自由粒子が示す座標加速度）**  
> $c,a>0$、$s_0=c^2/a$、$X_*=s_0+\xi_0>0$ とする。慣性座標で $X=X_*$、$y=z=0$ の自由粒子の世界線を、$\eta=0$ 付近で右Rindler座標に写すと

$$
\xi(\eta)=\frac{X_*}{\cosh(a\eta/c)}-s_0,\qquad
\left.\frac{d^2\xi}{d\eta^2}\right|_{\eta=0}
=-a\left(1+\frac{a\xi_0}{c^2}\right)
$$

> となる。$\xi=\xi_0$ に静止するRindler時計で校正した局所時間 $\theta=h_0\eta$、$h_0=1+a\xi_0/c^2$ を用いれば、その初期瞬間の座標加速度は $d^2\xi/d\theta^2=-a/h_0$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

慣性系では粒子の $X$ が一定なので、Rindlerの変換式を $\xi$ について解くだけです。自由粒子の固有時とRindler時計の固有時を混同しないため、最後の $\theta$ は**基準となる静止時計で校正した座標時間**と説明します。

<!-- proof-start -->
### 証明

$X=s\cosh(a\eta/c)=X_*$ より $s=X_*/\cosh(a\eta/c)$ です。$\xi=s-s_0$ に代入して第一式を得ます。$k=a/c$ と置いて微分すると

$$
\frac{d\xi}{d\eta}=-kX_*\frac{\sinh(k\eta)}{\cosh^2(k\eta)}.
$$

さらに積と商の微分で

$$
\frac{d^2\xi}{d\eta^2}
=-k^2X_*\left(\frac{1}{\cosh(k\eta)}
-\frac{2\sinh^2(k\eta)}{\cosh^3(k\eta)}\right).
$$

$\eta=0$ では $\sinh0=0$、$\cosh0=1$ なので $d\xi/d\eta=0$ と $d^2\xi/d\eta^2=-k^2X_*$ を得ます。$X_*=s_0+\xi_0$、$k^2s_0=a$ により

$$
-k^2X_*=-\frac{a^2}{c^2}(s_0+\xi_0)
=-a\left(1+\frac{a\xi_0}{c^2}\right)=-ah_0.
$$

$\theta=h_0\eta$ は定数倍の時刻なので、連鎖律を二回適用すると $d^2\xi/d\theta^2=h_0^{-2}d^2\xi/d\eta^2=-a/h_0$ です。
<!-- proof-end -->

ここで $a/h_0$ は[静止時計の固有加速度](#prop-gr1-static-accel) $\alpha$ と一致します。支持されている観測者は外力で $+\xi$ 方向へ加速し、慣性運動する粒子がその観測者には $-\xi$ 方向へ落ちるように見えます。$\xi_0=0$ ならこの初期加速度は $-a$ です。**加速系の見かけの重力**と、**外力を受けない粒子の固有加速度が零であること**は矛盾しません。

## 7. 潮汐がないことをどう判定するか

一つの粒子が「落ちる」という座標描像だけでは、時空の曲がりを見分けられません。離れた二つの自由粒子の相対運動を調べます。前節と同じ慣性座標で、二粒子を $X_1,X_2$ 一定、共通の慣性速度0として配置します。

<a id="prop-gr1-flat-tidal-test"></a>

<!-- formal-statement-start -->
> **命題（平坦Rindler領域の二粒子試験）**  
> $c,a>0$ とし、$X_1,X_2>0$ に静止する二つの自由粒子を、両者が右Rindler領域に属する共通の十分短い時間に観測する。慣性座標での分離 $\Delta X=X_2-X_1$ は一定で、慣性時刻に関する相対加速度は零である。一方、共通のRindler座標時間 $\eta$ における分離は

$$
\Delta\xi(\eta)=\frac{\Delta X}{\cosh(a\eta/c)}
$$

> であり、一般にはその二階微分は零でない。したがってRindler座標での相対座標加速度だけを潮汐曲率の判定とすることはできない。
<!-- formal-statement-end -->

### 証明の見取り図

物理的な慣性座標の分離と、加速している座標の同時刻切片で測った分離を区別します。分離座標の二階微分が変わっても、平坦さは変化しません。

<!-- proof-start -->
### 証明

$X_i(T)=X_i$ は定数なので $X_2(T)-X_1(T)=\Delta X$ であり、$d^2\Delta X/dT^2=0$ です。一方、[前節の座標変換](#prop-gr1-freefall-coordinate-accel)は両粒子に適用でき、$\xi_i(\eta)=X_i/\cosh(a\eta/c)-s_0$ です。二式を引くと

$$
\Delta\xi(\eta)=\frac{X_2-X_1}{\cosh(a\eta/c)}
=\Delta X\,\operatorname{sech}(a\eta/c).
$$

前節と同様に微分すると $\eta=0$ で $d^2\Delta\xi/d\eta^2=-(a^2/c^2)\Delta X$ となり、$\Delta X\ne0$ なら非零です。しかしRindler領域は[可逆な座標変換](#prop-gr1-rindler-metric)でMinkowski空間に戻るため、曲率は零です。これは物理的な潮汐を新たに生じさせるものではありません。
<!-- proof-end -->

Newton模型の $\delta Z''=-\kappa\delta Z$ は、同じ絶対時間・同じ長さの基準を持つ局所自由落下系でも残る相対加速度でした。これに対して平坦Rindler模型の $\Delta\xi''$ は、加速した座標の切片と時刻を選んだために現れます。GR5ではこの違いを、自由落下する近接世界線の測地線偏差と曲率で厳密に定式化します。

## 8. 等価原理だけではまだ分からないこと

等価原理は、局所自由落下実験室で何を期待するかという**物理的入力**です。Rindler変換は、平坦な時空に加速観測者がいると「重力らしい」記述が生じるという**数学的計算**です。両者は重要な手掛かりになりますが、次の二点までを自動的に導きません。

1. どの時空計量が物質やエネルギーから決まるか。これには後のEinstein場の方程式などの追加の力学的仮定が必要です。
2. 有限領域にわたって重力を全て取り去れるか。曲率による潮汐がある場合には一般に不可能です。

ここまでで、加速観測者が測る固有加速度、自由粒子の座標加速度、二粒子の相対運動を**三つの異なる量**として計算できました。GR2では一般のLorentz計量と時計・光円錐の関係を定義し、GR3では自由落下を測地線方程式として記述します。

---

## 演習

### Level A

### A1. 弱い等価原理の反証テスト

一様場で $m_{\mathrm g}/m_{\mathrm i}$ が物体Aでは1、Bでは $1+\varepsilon$ とする。両者の落下加速度を求め、弱い等価原理と両立する条件を答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

運動方程式 $m_{\mathrm i}Z''=-m_{\mathrm g}g$ を正の $m_{\mathrm i}$ で割ると $Z''=-(m_{\mathrm g}/m_{\mathrm i})g$。Aでは $Z_A''=-g$、Bでは $Z_B''=-(1+\varepsilon)g$ です。差は $Z_B''-Z_A''=-\varepsilon g$ で、$g>0$ のもと零である必要十分条件は $\varepsilon=0$ です。異なる初期位置や空気抵抗の影響を取り違えず、同じ初期条件で比較します。
<!-- solution-end -->

### A2. 自由落下系での投げ上げ

$Z(t)=Z_0+v_0t-gt^2/2$、$\zeta=Z+gt^2/2$ とする。$\zeta(t)$ と加速度を求め、どの初期値に依存するか述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

座標変換を代入すると $\zeta=Z_0+v_0t-gt^2/2+gt^2/2=Z_0+v_0t$。従って $\zeta'=v_0$、$\zeta''=0$ です。初期位置 $Z_0$ は定数項、初速度 $v_0$ は一次の係数として残ります。加速度 $-g$ だけが打ち消され、速度が零になるわけではありません。
<!-- solution-end -->

### A3. 計量符号と固有時

$dy=dz=d\xi=0$ のRindler静止時計に対して、本章の計量から $d\tau$ と $d\eta$ の関係を求めよ。$\xi=0$ と $\xi=c^2/a$ を比較せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[GR符号規約の計量](#prop-gr1-rindler-metric)で空間座標を固定すると $ds^2=-c^2h(\xi)^2d\eta^2$。時間的世界線の $ds^2=-c^2d\tau^2$ と比較して $d\tau^2=h^2d\eta^2$。未来向きなので $d\tau=h\,d\eta$ です。$\xi=0$ なら $h=1$、$\xi=c^2/a$ なら $h=2$ なので、同じ $\Delta\eta>0$ に対しそれぞれ $\Delta\tau=\Delta\eta$、$\Delta\tau=2\Delta\eta$ です。
<!-- solution-end -->

### A4. 右くさびの定義域

$s_0=c^2/a$ とする。事象 $(cT,X)=(0,2s_0)$ と $(2s_0,s_0)$ のうち、右Rindler座標を持つものを判定せよ。持つ事象の $(\eta,\xi)$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[右Rindler領域](../../SREL/SREL8/index.md#def-srel8-rindler-chart)は $X>|cT|$ です。$(0,2s_0)$ では $2s_0>0$ を満たし、逆変換から $s=\sqrt{(2s_0)^2}=2s_0$、$\xi=s_0$、$\eta=(c/2a)\log1=0$。$(2s_0,s_0)$ では $s_0>2s_0$ は成り立たないので座標を持ちません。逆変換の平方根に無理に値を入れず、領域を先に検査します。
<!-- solution-end -->

### A5. 加速時計の二つの位置

$s_0=c^2/a$ として $\xi=0,\xi=s_0$ の固有加速度と、同じ座標時間 $\Delta\eta$ で進む固有時の比を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\xi=0$ では $h=1$、$\xi=s_0$ では $h=2$ です。[静止Rindler時計の固有加速度](#prop-gr1-static-accel)から $\alpha_0=a$、$\alpha_{s_0}=a/2$。固有時は $\Delta\tau=h\Delta\eta$ なので $\Delta\tau_0=\Delta\eta$、$\Delta\tau_{s_0}=2\Delta\eta$。固有時の比は後者が前者の2倍、加速度の比は後者が前者の1/2倍です。
<!-- solution-end -->

### Level B

### B1. 自由な粒子の初期加速度

慣性座標で $X=2s_0$、$y=z=0$ に静止する粒子を考える。$\eta=0$ でのRindler位置、$d\xi/d\eta$、$d^2\xi/d\eta^2$、その位置の静止時計で校正した $\theta=2\eta$ に関する加速度を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$X_*=2s_0$ なので $\xi_0=X_*-s_0=s_0$、$h_0=1+a s_0/c^2=2$ です。[自由粒子の変換](#prop-gr1-freefall-coordinate-accel)による $\xi(\eta)=2s_0/\cosh(a\eta/c)-s_0$ を微分します。$\eta=0$ では $\sinh0=0$ なので $d\xi/d\eta=0$、二階微分は $-a h_0=-2a$ です。$\theta=2\eta$ だから $d/d\theta=(1/2)d/d\eta$、二階では $1/4$ 倍となり、$d^2\xi/d\theta^2=-a/2$。これは静止観測者の固有加速度 $a/2$ と大きさが一致し向きが逆です。
<!-- solution-end -->

### B2. 潮汐の一様成分を除く

近傍の二試験体に $Z_i''=-g-\kappa Z_i$（$i=1,2$）が成り立つとする。$\zeta_i=Z_i+gt^2/2$ に移した後の各加速度と、相対座標 $\delta\zeta=\zeta_2-\zeta_1$ の方程式を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

座標変換を二回微分して $\zeta_i''=Z_i''+g=(-g-\kappa Z_i)+g=-\kappa Z_i$。$Z_i=\zeta_i-gt^2/2$ を戻すと $\zeta_i''=-\kappa\zeta_i+\kappa gt^2/2$。二粒子で差を取れば共通項 $\kappa gt^2/2$ は消え、

$$
\delta\zeta''=-\kappa(\zeta_2-\zeta_1)=-\kappa\delta\zeta
$$

です。移動座標で各粒子の加速度が一般に零にならないのは、最初から重力の位置依存性を含めたためです。
<!-- solution-end -->

### B3. 曲線座標と物理的曲率の区別

慣性座標で静止する自由粒子を $X_1=s_0$、$X_2=3s_0$ に置く。$\eta=0$ のRindler分離とその二階微分、および慣性分離の二階微分を求めよ。曲率の有無を説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\Delta X=3s_0-s_0=2s_0$ は定数なので $d^2\Delta X/dT^2=0$。[二粒子試験](#prop-gr1-flat-tidal-test)より $\Delta\xi(\eta)=2s_0\operatorname{sech}(a\eta/c)$ です。従って $\Delta\xi(0)=2s_0$、二階微分は $\Delta\xi''(0)=-2s_0(a/c)^2=-2a$。Rindler座標で差の二階微分が非零でも、元の計量は平坦なMinkowski計量へ可逆に戻るため曲率は零です。座標時間に関する値を不変な潮汐力として読んではいけません。
<!-- solution-end -->

### B4. 非零の計量微分だけでは曲率を示せない

本章の $g_{\eta\eta}=-c^2h(\xi)^2$ から $\partial_\xi g_{\eta\eta}$ を計算せよ。$\xi=0$ で非零なのに時空が平坦である理由を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$h(\xi)=1+a\xi/c^2$ なので連鎖律から

$$
\partial_\xi g_{\eta\eta}
=-2c^2h(\xi)\,\partial_\xi h(\xi)
=-2c^2h(\xi)\frac{a}{c^2}
=-2a h(\xi).
$$

$\xi=0$ では $h=1$ なので $\partial_\xi g_{\eta\eta}=-2a\ne0$。しかし[座標変換と計量の証明](#prop-gr1-rindler-metric)によりRindler領域は平坦なMinkowski領域を滑らかに座標変換したものです。計量の座標偏微分は座標に依存し、不変な曲率と同じ量ではありません。
<!-- solution-end -->

### Level C

### C1. 加速ロケット・自由粒子・局所重力の統合

$c,a>0$、$s_0=c^2/a$、$h(\xi)=1+a\xi/c^2$ とする。右Rindler領域で $\xi=\xi_0>-s_0$ に静止するロケットAと、$\eta=0$ でAと同じ慣性位置 $X_*=s_0+\xi_0$ におり慣性系で静止する自由粒子Pを考える。

1. Aの $\eta$ と固有時 $\tau_A$ の関係、およびAの固有加速度を求めよ。
2. PのRindler座標 $\xi_P(\eta)$ を求め、$\eta=0$ での初期速度と初期加速度を求めよ。
3. $\theta=h(\xi_0)\eta$ で校正した時間でPの初期加速度を計算し、Aの固有加速度と比較せよ。
4. Aのほかに慣性静止粒子Qを $X_*+\delta X$ に置いたとき、同じ $\eta$ におけるP–Q間の分離を求める。相対座標加速度が非零でも曲率を意味しない理由を述べよ。
5. この模型の計算だけで「全ての重力場が平坦である」「Einstein方程式が従う」と結論してよいか、根拠とともに答えよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**(1)** $\xi=\xi_0$ の世界線では[線素](#prop-gr1-rindler-metric)から $-c^2d\tau_A^2=-c^2h_0^2d\eta^2$、$h_0=1+a\xi_0/c^2>0$。未来向きに $\tau_A=h_0\eta$（原点一致）です。[固有加速度](#prop-gr1-static-accel)は $\alpha_A=a/h_0$ です。

**(2)** 慣性系ではPの $X=X_*$ が一定です。Rindler変換 $X=(s_0+\xi)\cosh(a\eta/c)$ を解くと

$$
\xi_P(\eta)=\frac{X_*}{\cosh(a\eta/c)}-s_0.
$$

$\eta=0$ では $\xi_P(0)=X_*-s_0=\xi_0$ です。[変換の導関数](#prop-gr1-freefall-coordinate-accel)に $\sinh0=0$ を代入すると $\xi_P'(0)=0$、二階微分は $\xi_P''(0)=-(a^2/c^2)X_*=-ah_0$ です。

**(3)** $\theta=h_0\eta$ なので $d^2\xi_P/d\theta^2=h_0^{-2}\xi_P''$ であり、

$$
\left.\frac{d^2\xi_P}{d\theta^2}\right|_0
=\frac{-ah_0}{h_0^2}=-\frac{a}{h_0}=-\alpha_A.
$$

支持されたロケットAは $+\xi$ 方向へ固有加速度を受け、自由なPはAの校正時刻で $-\xi$ 方向へ同じ大きさの初期座標加速度を示します。Pの固有加速度が $-\alpha_A$ という意味ではありません。Pは慣性系で直線世界線を進み固有加速度零です。

**(4)** Qは $X_Q=X_*+\delta X>0$ とし、両粒子が右くさび内にいる短時間だけ考えます。変換を両者に適用すると

$$
\Delta\xi(\eta)
=\xi_Q-\xi_P
=\frac{(X_*+\delta X)-X_*}{\cosh(a\eta/c)}
=\delta X\,\operatorname{sech}(a\eta/c).
$$

従って $\Delta\xi''(0)=-(a^2/c^2)\delta X$ ですが、慣性座標分離は常に $\delta X$ であり、その二階微分は零。可逆変換の元のMinkowski時空は平坦です。

**(5)** どちらも結論できません。本問は平坦な時空に加速した座標を導入した**一つの模型**です。重力一般に存在しうる潮汐・曲率を否定する反例にはなりません。また[Einstein等価原理](#principle-gr1-eep)は局所実験の法則を述べる物理的入力であり、計量の運動方程式や物質の応力テンソルまで定めていません。その導入は後続講義の役割です。
<!-- solution-end -->
