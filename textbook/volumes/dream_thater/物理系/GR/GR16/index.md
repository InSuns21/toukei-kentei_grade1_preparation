# GR16 Schwarzschild真空解の導出

<!-- definition-example-audit: strict -->

[GR15の静的球対称計量](../GR15/index.md#prop-gr15-static-diagonal)は、球面の面積で定めた半径 $r$ を使い、未知関数二つで書けました。その[独立Ricci成分](../GR15/index.md#prop-gr15-static-ricci)も既に求めています。では、物質のない球の外側で計量はどの形になるのでしょうか。座標を選んだだけでは重力場は決まらず、Einstein方程式を**微分方程式として解く**必要があります。

本章では、静的な球対称性を**初めから仮定した局所領域**で解を求めます。無限遠の時計の規格化と[GR13のNewton極限](../GR13/index.md#def-gr13-newton-potential)を別々に用い、積分定数が質量に対応することを示します。さらに、何が座標の破綻で何が物理的な曲率かを区別します。一般の球対称真空解が必ず静的になるという Birkhoff 定理は、ここで証明したことにはなりません。

以下、滑らかな4次元Lorentz時空を考え、計量の符号を $(-,+,+,+)$、時間座標を $x^0=ct$ とします。光速 $c$ と重力定数 $G$ はともに正です。

宇宙定数は $\Lambda=0$ とし、対象領域は真空、すなわち $T_{\mu\nu}=0$ とします。計量関数には必要な微分を行える $C^2$ 正則性を仮定します。

角度には $0<\theta<\pi$ の局所座標と周期 $2\pi$ の $\phi$ を使います。半径 $r>0$ は[面積半径](../GR15/index.md#def-gr15-areal-radius)です。

さらに、時間並進Killing場が時間的で、面積半径が正則な空間座標として使える連結領域に限ります。

## 1. 真空方程式から二つの未知関数を一つにする

面積半径・静的対角表示の意味は[GR15の座標選択命題](../GR15/index.md#prop-gr15-static-diagonal)にあります。ここではそこで得た計量

$$
ds^2=-e^{2\Phi(r)}(dx^0)^2+e^{2\Lambda_r(r)}dr^2
+r^2(d\theta^2+\sin^2\theta\,d\phi^2)
$$

を出発点にします。指数係数は正なので、現在の座標領域では時間方向が時間的、半径方向が空間的です。$\Lambda_r$ は半径方向の計量関数であって、零と仮定した宇宙定数 $\Lambda$ とは違います。

[GR12のEinstein方程式](../GR12/index.md#thm-gr12-einstein-equation)に $T_{\mu\nu}=0,\Lambda=0$ を入れ、四次元で跡を取れば $R_{\mu\nu}=0$ です。この帰着は[GR15のRicciの証明](../GR15/index.md#prop-gr15-static-ricci)でも確認しました。まず時間成分と半径成分の組合せから二階微分を消します。

$$
e^{2(\Lambda_r-\Phi)}R_{00}+R_{rr}
=\frac{2}{r}(\Phi'+\Lambda_r').
$$

$r>0$、かつ両Ricci成分が零なので $\Phi'+\Lambda_r'=0$。連結な半径区間で積分すると

$$
\Phi(r)+\Lambda_r(r)=C_t,\qquad
e^{2\Phi(r)}=e^{2C_t}e^{-2\Lambda_r(r)}.
$$

$C_t$ は実定数です。これはまだ時間の物理的な規格化を選んでいないために残ります。ここで

$$
f(r):=e^{-2\Lambda_r(r)}>0
$$

と置けば、$e^{2\Phi}=e^{2C_t}f$。正値の $f$ を導入したので $g_{rr}=1/f$ を正しく作れます。

[GR15の角度Ricci成分](../GR15/index.md#prop-gr15-static-ricci)は

$$
R_{\theta\theta}
=1-f\{1+r(\Phi'-\Lambda_r')\}.
$$

$\Phi'=-\Lambda_r'$ と $f'/f=-2\Lambda_r'$ を順に代入して

$$
\Phi'-\Lambda_r'=-2\Lambda_r'=\frac{f'}f,
\qquad
0=R_{\theta\theta}=1-f-rf'.
$$

微分の積の法則より $(rf)'=f+rf'=1$ です。これが積分できる一次方程式です。

<a id="thm-gr16-vacuum-family"></a>

<!-- formal-statement-start -->
> **定理（静的球対称真空の局所解）**  
> 4次元Lorentz時空で $T_{\mu\nu}=0,\Lambda=0$ とする。面積半径 $r>0$ を正則な空間座標とし、時間的Killing場に沿う対角・静的・球対称表示を持つ連結領域で、$C^2$ 計量がEinstein方程式を満たすなら、実定数 $C_t$ と長さの次元を持つ実定数 $a$ が存在して

$$
\boxed{
ds^2=-e^{2C_t}f(r)(dx^0)^2+\frac{dr^2}{f(r)}
+r^2d\Omega^2,\qquad f(r)=1-\frac{a}{r}>0.
}
$$

> 逆に、この表示が正則な任意の開区間 $r>0,\ f(r)>0$ で上の計量は真空方程式を満たす。$a$ の符号と $C_t$ は局所方程式だけでは決まらない。
<!-- formal-statement-end -->

### 証明の見取り図

Ricciの時間・半径成分を加えて $\Phi+\Lambda_r$ を定数にし、角度成分を $(rf)'=1$ に直します。最後に残りのRicci成分も零になることを直接確認して、必要条件を十分条件まで閉じます。

<!-- proof-start -->
### 証明

前段の計算により $\Phi+\Lambda_r=C_t$、$f=e^{-2\Lambda_r}$、$(rf)'=1$ です。したがって $rf=r-a$（積分定数を $-a$ と表記）、$f=1-a/r$。時間係数は $e^{2\Phi}=e^{2C_t}f$ となり、表示式を得ます。

逆を示すため、$f>0$ の区間で

$$
\Phi=C_t+\frac12\log f,\qquad
\Lambda_r=-\frac12\log f
$$

と定めます。直接微分すると

$$
\Phi'=\frac{f'}{2f},\quad
\Lambda_r'=-\frac{f'}{2f},\quad
\Phi''=\frac{f''}{2f}-\frac{(f')^2}{2f^2}.
$$

[静的球対称計量の独立Ricci成分](../GR15/index.md#prop-gr15-static-ricci)の $00$ 成分の括弧内は

$$
\begin{aligned}
\Phi''+(\Phi')^2-\Phi'\Lambda_r'+\frac{2\Phi'}r
&=\frac{f''}{2f}-\frac{(f')^2}{2f^2}
+\frac{(f')^2}{4f^2}+\frac{(f')^2}{4f^2}
+\frac{f'}{fr}\\
&=\frac1f\left(\frac{f''}{2}+\frac{f'}r\right).
\end{aligned}
$$

$rr$ 成分は同様の代入を各項に行うと

$$
\begin{aligned}
R_{rr}
&=-\left(\frac{f''}{2f}-\frac{(f')^2}{2f^2}\right)
-\frac{(f')^2}{4f^2}-\frac{(f')^2}{4f^2}
-\frac{f'}{fr}\\
&=-\frac1f\left(\frac{f''}{2}+\frac{f'}r\right).
\end{aligned}
$$

$f=1-a/r$ なら $f'=a/r^2$、$f''=-2a/r^3$ で、括弧は $-a/r^3+a/r^3=0$ です。よって $R_{00}=e^{2(\Phi-\Lambda_r)}\cdot0=0$、$R_{rr}=0$。角度成分も

$$
R_{\theta\theta}=1-f-rf'
=1-\left(1-\frac ar\right)-\frac ar=0,\qquad
R_{\phi\phi}=\sin^2\theta\,R_{\theta\theta}=0
$$

となります。他のRicci成分が零であることも[GR15の命題](../GR15/index.md#prop-gr15-static-ricci)に含まれ、したがって $R_{\mu\nu}=0$ が全成分で成立します。真空のEinstein方程式と同値です。$\square$
<!-- proof-end -->

ここで重要なのは、**角度方程式だけで解を候補として作った後、時間と半径の方程式に戻って検算した**点です。独立に見える式を一部しか使わず、残る条件を見落としてはいけません。

## 2. 無限遠の時計とNewton質量をどう同定するか

上の局所解では $C_t$ と $a$ が残っています。局所方程式に無限遠は現れないので、ここからは**同じ解の静的領域が任意に大きな $r$ まで伸び、漸近的にMinkowskiになる**という追加の条件を課します。時間座標 $x^0=ct$ は無限遠で標準的なMinkowski時間に一致するように規格化し、

$$
\lim_{r\to\infty}g_{00}=-1
$$

を要求します。$f(r)\to1$ だから $-e^{2C_t}=-1$、実定数 $C_t=0$ が決まります。時間を定数倍できるという[GR15の残余ゲージ自由度](../GR15/index.md#prop-gr15-static-diagonal)を、境界の時計で固定したわけです。

質量については別の入力が要ります。静的弱場の[Newtonポテンシャルの定義](../GR13/index.md#def-gr13-newton-potential)では、無限遠に規格化した座標で

$$
g_{00}=-\left(1+\frac{2\Phi_N}{c^2}\right)+O(c^{-4}\Phi_N^2)
$$

と比較します。ここで $\Phi_N$ はNewton重力ポテンシャルで、外部の点質量 $M$ に対して $\Phi_N=-GM/r$、無限遠を零点とします。$r\gg|a|$ では $g_{00}=-(1-a/r)$ なので

$$
1-\frac ar=1-\frac{2GM}{c^2r}
\quad\Longrightarrow\quad a=\frac{2GM}{c^2}.
$$

これはNewtonの質量 $M$ と積分定数の対応を**弱場で同定した**ものです。一般相対論の局所真空方程式そのものが質量 $M$ の符号を正に強制するわけではありません。

<a id="thm-gr16-schwarzschild"></a>

<!-- formal-statement-start -->
> **定理（漸近平坦な静的球対称真空解のSchwarzschild表示）**  
> 前定理の仮定の下、静的領域が空間的無限遠へ達し、$x^0=ct$ を無限遠のMinkowski時間に規格化する。さらに弱場極限でポテンシャルが $\Phi_N=-GM/r$（定数 $M$）と一致すると仮定する。その静的座標領域の計量は

$$
\boxed{
ds^2=-\left(1-\frac{2GM}{c^2r}\right)c^2dt^2
+\left(1-\frac{2GM}{c^2r}\right)^{-1}dr^2
+r^2d\Omega^2.
}
$$

> この座標表示をSchwarzschild真空解という。成立領域は $r>0$ かつ $1-2GM/(c^2r)>0$ の開区間である。$M>0$ ならここで扱う静的外部は $r>2GM/c^2$ に限られる。ここでは一般の時間依存球対称真空計量についての一意性は主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

定数 $C_t$ は無限遠の時計から、定数 $a$ は弱場のNewton質量から決定します。この二つは異なる条件です。

<!-- proof-start -->
### 証明

前定理の解で $f=1-a/r$、$g_{00}=-e^{2C_t}(1-a/r)$。無限遠で $g_{00}\to-1$ より $e^{2C_t}=1$、$C_t=0$。続いて $r\gg|a|$ での $g_{00}$ の $r^{-1}$ 係数と[GR13の弱場ポテンシャル](../GR13/index.md#def-gr13-newton-potential)を比較すると $a=2GM/c^2$。$x^0=ct$ を代入すれば表示式を得ます。逆方向の真空性は前定理の全Ricci成分の計算で既に確認済みです。$\square$
<!-- proof-end -->

ここまでで「真空」「静的」「球対称」「面積半径が座標として使える」「漸近条件」というそれぞれ異なる入力の役割が見えました。特に、真空とは領域内で $T_{\mu\nu}=0$ という意味であり、$M=0$ を要求しません。質量源は領域の外、例えば内側にあって構いません。

## 3. Schwarzschild半径を定義して具体的に確認する

正質量 $M>0$ のとき計量係数 $f(r)=1-2GM/(c^2r)$ が零となる長さを、外部静的座標の限界を示す指標として使います。まずこれは**係数の零点の名前**であり、そこが曲率の発散点かどうかは別の検査が必要です。

<a id="def-gr16-schwarzschild-radius"></a>

<!-- formal-statement-start -->
> **定義（Schwarzschild半径）**  
> $G,c>0$、$M>0$ とし、前節のSchwarzschild真空計量の質量を $M$ とする。このとき

$$
\boxed{r_s:=\frac{2GM}{c^2}>0}
$$

> をSchwarzschild半径と定める。$r$ は球面積 $\mathcal A=4\pi r^2$ で定まる面積半径であり、$r_s$ は長さの単位を持つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr16-schwarzschild-radius -->
**定義の確認**（正質量の静的外部）。 $G,c>0$、$M>0$ を固定し、$r=2r_s$ の球面を選びます。$r_s=2GM/c^2>0$ なので $2r_s>r_s>0$。球面誘導計量は $(2r_s)^2d\Omega^2$ であり、角度成分の行列式は $(2r_s)^4\sin^2\theta$。その面積積分は $4\pi(2r_s)^2$ となり、面積半径がまさに $2r_s$ であると確認できます。係数は

$$
f(2r_s)=1-\frac{r_s}{2r_s}=\frac12>0,\qquad
g_{00}=-\frac12,\qquad g_{rr}=2.
$$

したがってこの球面近傍では時間方向と半径方向の符号が正しく、$f$ の分母も零ではありません。また $[G]=L^3M^{-1}T^{-2}$、$[c^2]=L^2T^{-2}$ より $[GM/c^2]=L$。定義の正値・面積半径・次元・静的領域の条件をすべて確認できました。
<!-- definition-example-end -->

$M=0$ なら $f=1$ で、球座標のMinkowski計量

$$
ds^2=-c^2dt^2+dr^2+r^2d\Omega^2
$$

へ厳密に戻ります。これは質量の弱場近似ではなく正確な極限です。逆に $M>0$ のとき $r\downarrow r_s$ でこの座標の $g_{rr}=1/f$ が発散しますが、**この事実だけでは曲率特異性とは判定できません**。静的座標の外へ延長できるかは後のGR25以降で調べます。

<a id="prop-gr16-static-domain"></a>

<!-- formal-statement-start -->
> **命題（静的Schwarzschild座標の適用域）**  
> $M>0$ のSchwarzschild計量で、面積半径を空間座標とし $\partial_{x^0}$ を時間的Killing場とする本章の対角表示が成立するのは $r>r_s$ である。$r=r_s$ ではこの対角座標の係数が正則でなく、$0<r<r_s$ に同じ正値指数関数の静的表示を続けることはできない。これは全時空の延長不能性や曲率発散の証明ではない。
<!-- formal-statement-end -->

### 証明の見取り図

ここで判定しているのは計量の固有な曲率でなく、**座標方向の因果型と係数の正則性**です。

<!-- proof-start -->
### 証明

$f=1-r_s/r$ について、$r>r_s$ なら $f>0$ なので $g_{00}=-f<0$、$g_{rr}=1/f>0$ です。$r=r_s$ なら $f=0$ で $1/f$ が発散し、現在の表示は正則ではありません。$0<r<r_s$ なら $f<0$ で $\partial_{x^0}$ のノルムは $g_{00}=-f>0$（空間的）、$\partial_r$ のノルムは $g_{rr}=1/f<0$（時間的）です。従って本章の「時間的 $\partial_{x^0}$ と空間的 $r$」という仮定から外れ、正の指数係数を用いた元の表示では扱えません。$\square$
<!-- proof-end -->

## 4. 真空なのに曲率はなぜ残るのか

Einsteinの真空方程式は $R_{\mu\nu}=0$ ですが、[GR6で学んだRiemann曲率とRicciの縮約](../GR6/index.md#def-gr6-ricci-scalar)は情報を失います。したがって真空だから平坦、とは限りません。実際に非零の曲率成分を一つ作ります。

[GR15の接続係数](../GR15/index.md#prop-gr15-static-christoffels)で $e^{-2\Lambda_r}=f$ とし、球面方向について

$$
\Gamma^\theta_{r\theta}=\frac1r,\quad
\Gamma^r_{\phi\phi}=-rf\sin^2\theta,\quad
\Gamma^\theta_{\phi\phi}=-\sin\theta\cos\theta,\quad
\Gamma^\phi_{\theta\phi}=\cot\theta
$$

が使えます。[GR6の曲率の符号規約](../GR6/index.md#prop-gr6-coordinate-curvature)で $R^\theta{}_{\phi\theta\phi}$ を計算すると、$\partial_\phi\Gamma^\theta_{\theta\phi}=0$ であり、

$$
\begin{aligned}
R^\theta{}_{\phi\theta\phi}
&=\partial_\theta\Gamma^\theta_{\phi\phi}
+\Gamma^\theta_{\theta r}\Gamma^r_{\phi\phi}
-\Gamma^\theta_{\phi\phi}\Gamma^\phi_{\theta\phi}\\
&=(\sin^2\theta-\cos^2\theta)
-f\sin^2\theta+\cos^2\theta\\
&=(1-f)\sin^2\theta.
\end{aligned}
$$

<a id="prop-gr16-angular-curvature"></a>

<!-- formal-statement-start -->
> **命題（Schwarzschild真空の角度方向Riemann曲率）**  
> Schwarzschild真空解の正則な静的領域で、球面接方向の曲率成分は

$$
\boxed{
R_{\theta\phi\theta\phi}
=r^2(1-f)\sin^2\theta
=\frac{2GM}{c^2}\,r\sin^2\theta.
}
$$

> $M\ne0$ なら $r>0,\ 0<\theta<\pi$ でこの成分は非零であり、Ricciテンソルが零でも時空は平坦でない。
<!-- formal-statement-end -->

### 証明の見取り図

Riemann成分を座標接続から作り、$\theta$ 添字を $g_{\theta\theta}=r^2$ で下げます。座標値が非零であることから曲率テンソルの非零性が従います。

<!-- proof-start -->
### 証明

直前の接続計算から $R^\theta{}_{\phi\theta\phi}=(1-f)\sin^2\theta$ です。$g_{\theta\theta}=r^2$、対角計量なので

$$
R_{\theta\phi\theta\phi}
=g_{\theta\alpha}R^\alpha{}_{\phi\theta\phi}
=r^2 R^\theta{}_{\phi\theta\phi}
=r^2\frac{2GM}{c^2r}\sin^2\theta.
$$

$M\ne0$ なら $\sin\theta\ne0$ の局所座標域で非零です。曲率テンソルの全成分が零ならこの成分も零のはずなので、時空は平坦ではありません。一方、Ricciが零なのは第一定理で全成分について検算済みです。$\square$
<!-- proof-end -->

球面接方向を規格化した場合の曲率成分は $R_{\theta\phi\theta\phi}/(g_{\theta\theta}g_{\phi\phi})=2GM/(c^2r^3)$ です。これは質量が零でないと真空外部に潮汐が残ることを示す一つの量です。ただし一成分が有限というだけで、任意の座標に依存しない曲率不変量が有限とは結論できません。地平線での不変量と延長の検証はGR25で行います。

## 5. 導出が言っていないこと

本章の一意性は「**静的で、時間的Killing場があり、面積半径による対角座標を取れる**」という仮定を置いた後の微分方程式の解についてです。球対称真空計量の**時間依存性を最初から許した場合にも静的になるか**は別の問いで、Birkhoff定理に属します。この章の計算を、その定理の証明と取り違えないでください。

また $T_{\mu\nu}=0$ は解を求めた開領域での仮定です。実在する星の表面より内側を同じ真空計量で覆えるとは言えず、内部物質・接合条件には新しい計算が要ります。$M<0$ も局所方程式の形式的な積分定数としては排除されませんが、正質量の天体外部という物理的想定と混同しません。

## 6. 演習：局所方程式・境界条件・座標域を分ける

### Level A

<a id="ex-gr16-a01"></a>
#### GR16-A01 二階微分の消去
- Level: A

[静的球対称計量の独立Ricci成分](../GR15/index.md#prop-gr15-static-ricci)から、真空領域で $\Phi+\Lambda_r$ が定数になる過程を示せ。

<!-- solution-start -->
**詳細解答。** $R_{00}$ に $e^{2(\Lambda_r-\Phi)}$ を掛けると、括弧の指数因子が消え、

$$
\Phi''+(\Phi')^2-\Phi'\Lambda_r'+\frac{2\Phi'}r
$$

となります。$R_{rr}$ の $-\Phi''-(\Phi')^2+\Phi'\Lambda_r'+2\Lambda_r'/r$ と足すと、二階微分・二次項が打ち消され、$0=2(\Phi'+\Lambda_r')/r$。$r>0$ より $(\Phi+\Lambda_r)'=0$。連結区間で積分し $\Phi+\Lambda_r=C_t$ です。
<!-- solution-end -->

<a id="ex-gr16-a02"></a>
#### GR16-A02 角度方程式を積分する
- Level: A

$\Phi+\Lambda_r=C_t$ と $f=e^{-2\Lambda_r}$ を用い、$R_{\theta\theta}=0$ から $f$ を決定せよ。

<!-- solution-start -->
**詳細解答。** $\Phi'=-\Lambda_r'$ と $f'/f=-2\Lambda_r'$ なので $\Phi'-\Lambda_r'=f'/f$。[静的球対称計量の独立Ricci成分](../GR15/index.md#prop-gr15-static-ricci)へ代入すると $0=1-f(1+rf'/f)=1-f-rf'$。よって $(rf)'=1$ です。積分すれば $rf=r-a$（定数 $a$）、従って $f=1-a/r$。この段階では $a$ は未同定です。
<!-- solution-end -->

<a id="ex-gr16-a03"></a>
#### GR16-A03 無限遠の規格化
- Level: A

$f=1-a/r$、$g_{00}=-e^{2C_t}f$ とする。$g_{00}\to-1$ がどの定数を決め、どの定数を決めないか説明せよ。

<!-- solution-start -->
**詳細解答。** $r\to\infty$ で $f\to1$ ですから $-e^{2C_t}=-1$、$e^{2C_t}=1$ です。$C_t$ が実数なので $C_t=0$。一方、$a/r\to0$ は任意の有限な $a$ で成り立ち、無限遠の極限値だけでは $a$ を決められません。$r^{-1}$ 項の係数を質量と比較する追加条件が必要です。
<!-- solution-end -->

<a id="ex-gr16-a04"></a>
#### GR16-A04 物理単位とNewton係数
- Level: A

$g_{00}=-(1-a/r)$ の $a$ を、$\Phi_N=-GM/r$ のNewton極限から求め、長さの単位を検算せよ。

<!-- solution-start -->
**詳細解答。** [GR13の弱場定義](../GR13/index.md#def-gr13-newton-potential)の先頭項を使うと $g_{00}=-(1+2\Phi_N/c^2)$ です。$\Phi_N=-GM/r$ なので $g_{00}=-(1-2GM/(c^2r))$。$r^{-1}$ 係数の比較から $a=2GM/c^2$。単位は $[G]=L^3M^{-1}T^{-2}$、$[GM/c^2]=L$ で、$a/r$ は無次元です。
<!-- solution-end -->

<a id="ex-gr16-a05"></a>
#### GR16-A05 Minkowski極限の全成分
- Level: A

$M=0$ のとき計量とRicciの四つの独立成分を求め、曲線座標のChristoffel係数が零でなくてもよい理由を述べよ。

<!-- solution-start -->
**詳細解答。** $M=0$ なら $f=1$、$\Phi=0$、$\Lambda_r=0$ です。線素は $-c^2dt^2+dr^2+r^2d\Omega^2$。[静的球対称計量の独立Ricci成分](../GR15/index.md#prop-gr15-static-ricci)で $\Phi'=\Phi''=\Lambda_r'=0$ より $R_{00}=R_{rr}=0$、$R_{\theta\theta}=1-1=0$、$R_{\phi\phi}=\sin^2\theta\,R_{\theta\theta}=0$。一方 $\Gamma^\theta_{r\theta}=1/r$ などは球座標の変化を表すため非零であり、曲率テンソルの非零性を意味しません。
<!-- solution-end -->

### Level B

<a id="ex-gr16-b01"></a>
#### GR16-B01 真空解の全Ricci検算
- Level: B

$f=1-a/r$、$\Phi=C_t+\frac12\log f$、$\Lambda_r=-\frac12\log f$ について、$R_{00}=R_{rr}=R_{\theta\theta}=R_{\phi\phi}=0$ を直接検算せよ。

<!-- solution-start -->
**詳細解答。** 微分は $f'=a/r^2,\ f''=-2a/r^3$、$\Phi'=f'/(2f)$、$\Lambda_r'=-f'/(2f)$、$\Phi''=f''/(2f)-(f')^2/(2f^2)$。時間成分の括弧内は

$$
\Phi''+(\Phi')^2-\Phi'\Lambda_r'+2\Phi'/r
=\frac1f\left(\frac{f''}{2}+\frac{f'}r\right)=0.
$$

ここで $(f')^2$ の係数は $-1/2+1/4+1/4=0$ です。半径成分は

$$
R_{rr}=-\frac1f\left(\frac{f''}{2}+\frac{f'}r\right)=0
$$

であり、角度成分は $R_{\theta\theta}=1-f-rf'=1-(1-a/r)-a/r=0$、$R_{\phi\phi}=\sin^2\theta R_{\theta\theta}=0$。いずれも $f>0$ の区間での計算です。
<!-- solution-end -->

<a id="ex-gr16-b02"></a>
#### GR16-B02 Ricci零とRiemann曲率の違い
- Level: B

Schwarzschild計量の $R_{\theta\phi\theta\phi}$ を接続から作り、$M>0$ で非零となることと、$M\to0$ で零へ戻ることを示せ。

<!-- solution-start -->
**詳細解答。** [接続係数](../GR15/index.md#prop-gr15-static-christoffels)に $e^{-2\Lambda_r}=f$ を入れます。[曲率規約](../GR6/index.md#prop-gr6-coordinate-curvature)に従い

$$
\begin{aligned}
R^\theta{}_{\phi\theta\phi}
&=\partial_\theta(-\sin\theta\cos\theta)
+\frac1r(-rf\sin^2\theta)
-(-\sin\theta\cos\theta)\cot\theta\\
&=(\sin^2\theta-\cos^2\theta)-f\sin^2\theta+\cos^2\theta\\
&=(1-f)\sin^2\theta.
\end{aligned}
$$

下げる添字に $g_{\theta\theta}=r^2$ を掛けると $R_{\theta\phi\theta\phi}=r^2(1-f)\sin^2\theta=(2GM/c^2)r\sin^2\theta$。$M>0$、$r>r_s$、$0<\theta<\pi$ では正、$M\to0$ の固定 $r$ では零です。Ricciが零でもRiemannの全成分は零とは限りません。
<!-- solution-end -->

<a id="ex-gr16-b03"></a>
#### GR16-B03 静的表示が失敗する場所
- Level: B

$M>0$ とし、$r=2r_s$、$r=r_s$、$r=r_s/2$ で $f,g_{00},g_{rr}$ を形式的に計算せよ。どの場所が本章の静的座標域に属するか説明せよ。

<!-- solution-start -->
**詳細解答。** $r=2r_s$ では $f=1/2$、$g_{00}=-1/2$、$g_{rr}=2$ となり静的外部に属します。$r=r_s$ では $f=0$、$g_{00}=0$、$g_{rr}=1/0$ は定義できないのでこの表示は正則ではありません。$r=r_s/2$ では $f=-1$、$g_{00}=1$、$g_{rr}=-1$ で、$x^0$ が空間的、$r$ が時間的となります。後者の形式的な式を本章の $e^{2\Phi},e^{2\Lambda_r}>0$ の静的ゲージに当てはめるのは不適切です。いずれも曲率不変量の発散を確かめたことにはなりません。
<!-- solution-end -->

<a id="ex-gr16-b04"></a>
#### GR16-B04 真空なのに質量が残る理由
- Level: B

星の表面 $r=R_\star>r_s$ より外側 $r>R_\star$ に真空Schwarzschild計量があると仮定する。そこでの $T_{\mu\nu}$、Ricci、Riemannの角度成分を区別し、星の内部まで同じ真空計量と断定できない理由を述べよ。

<!-- solution-start -->
**詳細解答。** 外部領域に限定した仮定は $T_{\mu\nu}=0$、$\Lambda=0$ です。[真空方程式](../GR12/index.md#thm-gr12-einstein-equation)により $R_{\mu\nu}=0$。それでも[角度Riemann成分](#prop-gr16-angular-curvature)は $R_{\theta\phi\theta\phi}=(2GM/c^2)r\sin^2\theta\ne0$（$M>0$）です。外側の真空は質量が零という意味ではなく、曲率の自由度がRicci縮約で消えているだけです。$r\le R_\star$ では $T_{\mu\nu}=0$ という入力を与えておらず、物質のEinstein方程式と境界・接合条件を別に調べる必要があります。
<!-- solution-end -->

### Level C

<a id="ex-gr16-c01"></a>
#### GR16-C01 静的真空解を最初から再構成する
- Level: C

4次元・$\Lambda=0$ の静的球対称真空計量

$$
ds^2=-e^{2\Phi(r)}(dx^0)^2+e^{2\Lambda_r(r)}dr^2+r^2d\Omega^2
$$

が、$r>0$、$\partial_{x^0}$ が時間的、面積半径が正則な空間座標の連結領域で定義されているとする。(i) 独立なRicci方程式から二つの積分定数を持つ局所解を求めよ。(ii) 静的領域が無限遠まで伸びるとし、無限遠の時計と $\Phi_N=-GM/r$ でそれらを決めよ。(iii) 得た計量の全Ricci成分を検算せよ。(iv) $M>0$ での領域制限と、Birkhoff定理を証明したわけではない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** (i) [GR15のRicci成分](../GR15/index.md#prop-gr15-static-ricci)について真空なので $R_{00}=R_{rr}=R_{\theta\theta}=0$。前二式を $e^{2(\Lambda_r-\Phi)}R_{00}+R_{rr}$ と組み合わせると $2(\Phi'+\Lambda_r')/r=0$、ゆえに $\Phi+\Lambda_r=C_t$ です。$f=e^{-2\Lambda_r}>0$ とすれば $\Phi'-\Lambda_r'=f'/f$。角度式は $0=1-f-rf'$、したがって $(rf)'=1$、積分して $f=1-a/r$。従って局所解は

$$
ds^2=-e^{2C_t}(1-a/r)(dx^0)^2
+(1-a/r)^{-1}dr^2+r^2d\Omega^2.
$$

(ii) $r\to\infty$ で $g_{00}\to-1$ により $e^{2C_t}=1$、$C_t=0$。[Newton極限](../GR13/index.md#def-gr13-newton-potential)で $g_{00}=-(1+2\Phi_N/c^2)$、$\Phi_N=-GM/r$ と比較すれば $a=2GM/c^2$。

(iii) $f'=a/r^2$、$f''=-2a/r^3$、$\Phi'=f'/(2f)$、$\Lambda_r'=-f'/(2f)$。Ricciの時間・半径成分に共通する因子 $f''/2+f'/r=-a/r^3+a/r^3=0$、角度成分に共通する $1-f-rf'=0$。したがって $R_{00}=R_{rr}=R_{\theta\theta}=R_{\phi\phi}=0$。他成分は対称性から零です。

(iv) $M>0$ で $a=r_s>0$。本章の正値指数関数の静的ゲージは $1-r_s/r>0$、すなわち $r>r_s$ に限ります。ここでの計算は最初から時間的Killing場と静的対角表示を仮定しています。時間依存を許す一般の球対称真空からこの仮定が従うことは示しておらず、それはBirkhoff定理の論点です。
<!-- solution-end -->

---

真空方程式の微分関係を解くと局所的には二定数族が得られ、無限遠の時計が時間規格化を、Newton極限が質量を決めました。Schwarzschild計量はRicciが零でもRiemann曲率を持ち、$r=r_s$ で静的座標が止まることだけから幾何の終端とは言えません。次のGR17では[GR14のKilling保存量](../GR14/index.md#thm-gr14-killing-charge)を使い、この計量で静止時計や光の周波数を比較します。
