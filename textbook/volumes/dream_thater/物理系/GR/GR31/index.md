# GR31 Reissner–Nordström解

<!-- definition-example-audit: strict -->

[GR16のSchwarzschild解](../GR16/index.md#thm-gr16-schwarzschild)は、球対称な**真空**で質量が時空をどう曲げるかを示しました。しかし、帯電した物体の外側には物質粒子や電流がなくても電場が残ります。[GR9の電磁場の応力テンソル](../GR9/index.md#thm-gr9-em-stress)によれば、その電場にはエネルギーと方向によって異なる応力があります。したがって電場のある外部を単純に真空のSchwarzschild計量で置き換えることはできません。

ここでは電場をMaxwell方程式で求め、その応力をEinstein方程式へ代入して、質量と電荷の両方を持つ球対称計量を導きます。さらに、どの電荷なら地平線が二つ、ひとつ、または存在しないのかを、計量の根と因果構造で確かめます。地平線と中心の曲率特異性も別々に判定します。

時空は4次元、計量符号は $(-,+,+,+)$、宇宙項は $\Lambda=0$ とします。本文の導出は幾何単位系 $G=c=1$、電磁場も $4\pi$ を含む幾何単位に規格化します。$M>0$ と $Q\in\mathbb R$ はどちらも**長さ**の次元を持つパラメータであり、$Q$ の符号は電場の向きを表します。面積半径は $r>0$、球面の計量は $d\Omega^2=d\vartheta^2+\sin^2\vartheta\,d\varphi^2$ です。通常の単位への復元は後で行います。

## 1. 無電流でも電場の応力は消えない

物体の外部で電荷密度・電流が零であっても、閉じた球を貫く電場の流束は零とは限りません。電磁場の2形式を $F$ とすると、局所ポテンシャル $A$ に対する $F=dA$ は[GR9のMaxwell場の定義](../GR9/index.md#def-gr9-maxwell-action)に従います。電流のない場所のMaxwell方程式は

$$
\nabla_\mu F^{\mu\nu}=0,\qquad \nabla_{[\alpha}F_{\mu\nu]}=0
$$

です。重力側には[GR12のEinstein方程式](../GR12/index.md#thm-gr12-einstein-equation)、電磁場側には[GR9のHilbert応力テンソル](../GR9/index.md#thm-gr9-em-stress)を用います。両式を幾何単位で書くと次のとおりです。

<a id="def-gr31-electrovac"></a>

<!-- formal-statement-start -->
> **定義（Einstein–Maxwellの無電流外部領域）**  
> 4次元Lorentz時空の開領域 $U$ で、滑らかな計量 $g$ と滑らかな反対称テンソル $F_{\mu\nu}$ が

$$
\begin{gathered}
G_{\mu\nu}=8\pi T_{\mu\nu}^{\rm EM},\qquad
T_{\mu\nu}^{\rm EM}=\frac1{4\pi}
\left(F_{\mu\alpha}F_\nu{}^\alpha
-\frac14g_{\mu\nu}F_{\alpha\beta}F^{\alpha\beta}\right),\\
\nabla_\mu F^{\mu\nu}=0,\qquad
\nabla_{[\alpha}F_{\mu\nu]}=0
\end{gathered}
$$

> を満たすとき、$U$ をEinstein–Maxwellの無電流外部領域（electrovac領域）という。ほかの物質源、宇宙項および領域内の電流はないが、$F$ と $T^{\rm EM}$ は零とは限らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr31-electrovac -->
**定義の確認**。平坦なMinkowski時空で $F=0$ を選べば、$T^{\rm EM}=0$、$G=0$ で、二つのMaxwell方程式も満たします。これは電場が零の退化した例です。一方、$F\ne0$ の場合には単に電流が零というだけで $G=0$ を置けません。以降に構成する $Q\ne0$ の計量と電場は、非零電場を持つ直接例になります。
<!-- definition-example-end -->

球対称な静的領域では、面積半径 $r$ と時間座標 $t$ を選び、計量を

$$
ds^2=-e^{2\Phi(r)}dt^2+e^{2\Lambda(r)}dr^2+r^2d\Omega^2
$$

と表せます。$\Phi,\Lambda$ は少なくとも $C^2$ 級、ここで扱う静的座標域では $e^{2\Phi},e^{2\Lambda}>0$ とします。[GR16の静的球対称の座標設定](../GR16/index.md#thm-gr16-vacuum-family)と同じ形ですが、右辺の応力は零ではありません。

磁荷を含まない純電場に対象を絞り、対称性に従って $F=E_c(r)\,dt\wedge dr$ と置きます。$E_c=F_{tr}$ は座標成分で、静止観測者が測る電場の大きさとは一般に異なります。実際、正規直交な時間・動径ベクトル

$$
e_{\hat0}=e^{-\Phi}\partial_t,\qquad
e_{\hat r}=e^{-\Lambda}\partial_r
$$

を入れると $F(e_{\hat0},e_{\hat r})=e^{-\Phi-\Lambda}E_c$ です。この対応を使ってMaxwell方程式の積分定数を電荷として規格化します。

<a id="prop-gr31-maxwell-stress"></a>

<!-- formal-statement-start -->
> **命題（球対称静電場のMaxwell方程式と応力）**  
> $r>0$ の静的球対称領域で、計量と純動径電場が次の形を取るとする。磁荷はない。

$$
ds^2=-e^{2\Phi(r)}dt^2+e^{2\Lambda(r)}dr^2+r^2d\Omega^2,
\qquad F=E_c(r)\,dt\wedge dr.
$$

> 無電流Maxwell方程式から定数 $Q$ が存在して

$$
\boxed{F_{tr}=\frac{Qe^{\Phi+\Lambda}}{r^2},
\qquad F(e_{\hat0},e_{\hat r})=\frac Q{r^2}}
$$

> となり、電磁場の混合応力成分は

$$
\boxed{T^\mu{}_\nu
=\frac{Q^2}{8\pi r^4}\operatorname{diag}(-1,-1,1,1)}
$$

> となる（成分の順序は $t,r,\vartheta,\varphi$）。特に $Q\ne0$ ならこの外部領域はEinstein方程式の真空 $T_{\mu\nu}=0$ ではない。
<!-- formal-statement-end -->

### 証明の見取り図

Maxwell方程式を球面の面積要素込みで積分すると、正規直交枠での電場に $1/r^2$ が現れます。その場を応力テンソルへ代入し、電場に平行な方向と垂直な方向の符号を追います。

<!-- proof-start -->
### 証明

計量行列式から $\sqrt{-g}=e^{\Phi+\Lambda}r^2\sin\vartheta$ です。$F_{tr}=E_c$ と反対称性より $F_{rt}=-E_c$、逆計量で二つの添字を上げると

$$
F^{rt}=g^{rr}g^{tt}F_{rt}
=e^{-2\Lambda}(-e^{-2\Phi})(-E_c)
=e^{-2(\Phi+\Lambda)}E_c.
$$

反対称テンソルの発散式 $\nabla_\mu F^{\mu t}=(\sqrt{-g})^{-1}\partial_\mu(\sqrt{-g}F^{\mu t})$ を使い、角度依存のない場へ適用すると

$$
0=\partial_r\bigl(e^{\Phi+\Lambda}r^2F^{rt}\bigr)
=\partial_r\bigl(r^2e^{-\Phi-\Lambda}E_c\bigr).
$$

従って括弧内は半径によらない定数 $Q$ です。$\nu=r$ の発散式は時間微分が零なので成立し、他の $\nu$ 成分は零です。$F=E_c(r)\,dt\wedge dr$ の外微分は $E_c'(r)\,dr\wedge dt\wedge dr=0$ ですから、もう一方のMaxwell方程式も成立します。これで表示した $F_{tr}$ と、正規直交枠での電場 $Q/r^2$ が得られます。

$u:=Q/r^2$ と略記すると、正規直交枠の非零成分は $F_{\hat0\hat r}=u$ と $F_{\hat r\hat0}=-u$ だけです。従って

$$
F_{\alpha\beta}F^{\alpha\beta}
=2F_{\hat0\hat r}F^{\hat0\hat r}
=-2u^2.
$$

[電磁場の応力式](../GR9/index.md#thm-gr9-em-stress)をこの枠で計算すると、

$$
\begin{aligned}
T_{\hat0\hat0}&=\frac1{4\pi}\left(u^2-\frac14(-1)(-2u^2)\right)
=\frac{u^2}{8\pi},\\
T_{\hat r\hat r}&=\frac1{4\pi}\left(-u^2-\frac14(1)(-2u^2)\right)
=-\frac{u^2}{8\pi},\\
T_{\hat\vartheta\hat\vartheta}
&=T_{\hat\varphi\hat\varphi}
=\frac1{4\pi}\left(0-\frac14(1)(-2u^2)\right)
=\frac{u^2}{8\pi}.
\end{aligned}
$$

時間添字を一つ上げると符号が反転し、動径・角度の符号はそのままなので、主張の混合対角成分が得られます。
<!-- proof-end -->

この $Q$ は電場の流束の規格化でもあります。半径一定の球で

$$
\frac1{4\pi}\int_{S^2}
e^{\Phi+\Lambda}r^2F^{rt}\sin\vartheta\,d\vartheta\,d\varphi
=\frac1{4\pi}\int_{S^2}Q\sin\vartheta\,d\vartheta\,d\varphi=Q.
$$

球の外側で電流が零でも、流束が内部の電荷を表すことに矛盾はありません。**電流なし**と**電場なし**を取り違えないことが、次の計量導出の出発点です。

## 2. Einstein方程式から計量を求める

前節の応力には $T^t{}_t=T^r{}_r$ という特徴があります。この等式を使うと、もともと二つあった計量関数 $\Phi,\Lambda$ を一つへ減らせます。球対称な真空を解いた[GR16の導出](../GR16/index.md#thm-gr16-vacuum-family)と似ていますが、今回は電場の $r^{-4}$ が積分に残ります。

<a id="thm-gr31-rn-solution"></a>

<!-- formal-statement-start -->
> **定理（静的球対称Einstein–Maxwell外部解）**  
> 4次元の漸近平坦で連結な静的球対称無電流外部領域 $r>0$ を考える。$\Lambda_{\rm cosm}=0$、磁荷なし、純動径電場とし、面積半径 $r$、無限遠で規格化した時間座標 $t$ を用いる。静的な座標域でEinstein–Maxwell方程式を満たす計量と電磁場は、定数 $M,Q$ を用いて局所的に

$$
\boxed{\begin{gathered}
ds^2=-f(r)dt^2+\frac{dr^2}{f(r)}+r^2d\Omega^2,\\
f(r)=1-\frac{2M}{r}+\frac{Q^2}{r^2},
\qquad F=\frac Q{r^2}\,dt\wedge dr
\end{gathered}}
$$

> と書ける。この計量をReissner–Nordström（RN）計量という。$M>0$ は漸近質量、$Q$ は前節の電場流束に対応する幾何電荷である。$Q=0$ ならSchwarzschild解に一致する。表示はまず $f>0$ の静的領域で成立し、$f=0$ の近傍の延長は別の座標で扱う。
<!-- formal-statement-end -->

### 証明の見取り図

混合Einsteinテンソルの $tt$ と $rr$ の差から $\Phi+\Lambda$ が定数と分かります。無限遠の時計でその定数を零にします。残った $tt$ 方程式を一階積分し、積分定数を質量 $M$ と定め、最後に角度方程式も代入して確かめます。

<!-- proof-start -->
### 証明

計量 $ds^2=-e^{2\Phi}dt^2+e^{2\Lambda}dr^2+r^2d\Omega^2$ に対し $h=e^{-2\Lambda}$ と置きます。[GR16の球対称Ricci計算](../GR16/index.md#thm-gr16-vacuum-family)をEinsteinテンソルへ縮約すると

$$
G^t{}_t=\frac{h-1}{r^2}-\frac{2h\Lambda'}r
=\frac{rh'+h-1}{r^2},\qquad
G^r{}_r=\frac{h-1}{r^2}+\frac{2h\Phi'}r.
$$

同じ式の第一成分では $h'=-2h\Lambda'$ を使いました。[前節の電磁場応力](#prop-gr31-maxwell-stress)は $T^t{}_t=T^r{}_r$ なので、[Einstein方程式](../GR12/index.md#thm-gr12-einstein-equation)の二成分を引くと

$$
0=G^t{}_t-G^r{}_r
=-\frac{2h}{r}(\Phi'+\Lambda').
$$

静的領域では $h>0,r>0$ なので $\Phi'+\Lambda'=0$ です。連結区間上で $\Phi+\Lambda=C$ と積分でき、無限遠で $e^{2\Phi},e^{2\Lambda}\to1$ となる漸近規格化から $C=0$ を選べます。したがって $h=e^{2\Phi}=:f$、$e^{2\Lambda}=f^{-1}$ です。

$tt$ 成分の右辺は $8\pi T^t{}_t=-Q^2/r^4$ です。よって

$$
\frac{rf'+f-1}{r^2}=-\frac{Q^2}{r^4}
\quad\Longleftrightarrow\quad
(rf)'=1-\frac{Q^2}{r^2}.
$$

両辺を半径 $r$ で積分すると、定数 $C_1$ を用いて

$$
rf=r+\frac{Q^2}{r}+C_1,\qquad
f=1+\frac{C_1}{r}+\frac{Q^2}{r^2}.
$$

無限遠で $g_{tt}=-1-C_1/r+O(r^{-2})$ を[Schwarzschildの漸近質量同定](../GR16/index.md#thm-gr16-schwarzschild)と比較して $C_1=-2M$ とします。

残る成分も独立に検算します。$\Phi=-\Lambda$ の球対称計量では

$$
G^\vartheta{}_\vartheta=G^\varphi{}_\varphi
=\frac{f''}{2}+\frac{f'}r.
$$

得られた $f$ に対し

$$
f'=\frac{2M}{r^2}-\frac{2Q^2}{r^3},\qquad
f''=-\frac{4M}{r^3}+\frac{6Q^2}{r^4}
$$

なので

$$
\frac{f''}{2}+\frac{f'}r
=-\frac{2M}{r^3}+\frac{3Q^2}{r^4}
+\frac{2M}{r^3}-\frac{2Q^2}{r^4}
=\frac{Q^2}{r^4}
=8\pi T^\vartheta{}_\vartheta.
$$

$rr$ 成分は $tt$ と同じ値となり、Maxwell方程式は既に証明済みです。$e^{\Phi+\Lambda}=1$ を前節の $F_{tr}$ に代入すると $F_{tr}=Q/r^2$ です。このようにEinstein方程式とMaxwell方程式のすべての独立成分が一致し、局所解が得られます。
<!-- proof-end -->

**非零電場を持つ定義の確認**。[無電流外部領域の定義](#def-gr31-electrovac)に対し、$M=5,Q=4$ として $U=\{r>8\}$ を選びます。この領域では

$$
f(r)=\left(1-\frac8r\right)\left(1-\frac2r\right)>0,
\qquad F=\frac4{r^2}\,dt\wedge dr\ne0
$$

であり、計量は滑らかなLorentz計量、$F$ は滑らかな反対称テンソルです。$\sqrt{-g}=r^2\sin\vartheta$ と $F^{rt}=4/r^2$ を用いれば

$$
\partial_r(\sqrt{-g}F^{rt})
=\partial_r(4\sin\vartheta)=0,
\qquad dF=d\left(\frac4{r^2}\right)\wedge dt\wedge dr=0
$$

なので、無電流Maxwell方程式の両方を満たします。さらに上で導いたEinsteinテンソルの式へ代入すると

$$
G^t{}_t=G^r{}_r=-\frac{16}{r^4},
\qquad G^\vartheta{}_\vartheta=G^\varphi{}_\varphi=\frac{16}{r^4}
$$

で、$8\pi T^\mu{}_\nu$ の四成分に一致します。ほかの物質源・電流・宇宙項を零とする設定と合わせて、定義の非自明な条件を一つずつ満たす例になりました。

**係数を元の単位へ戻す**。SI質量 $M_{\rm SI}$、SI電荷 $q_{\rm SI}$ に対し、長さのパラメータを

$$
M=\frac{GM_{\rm SI}}{c^2},\qquad
Q^2=\frac{Gq_{\rm SI}^2}{4\pi\varepsilon_0c^4}
$$

と置くと、

$$
f(r)=1-\frac{2GM_{\rm SI}}{c^2r}
+\frac{Gq_{\rm SI}^2}{4\pi\varepsilon_0c^4r^2}.
$$

時間座標を $t_{\rm SI}$（秒）に戻す際は $dt=c\,dt_{\rm SI}$ とするため、時間項は $-f c^2dt_{\rm SI}^2$ です。電荷項の係数を単に $q_{\rm SI}^2/r^2$ と置くと次元も物理的な規格化も間違えます。

**零電荷の場合**。$Q=0$ なら応力は全成分零となり $f=1-2M/r$ です。これは[GR16のSchwarzschild解](../GR16/index.md#thm-gr16-schwarzschild)に厳密に一致します。一方 $Q\ne0$ で $R=0$ が出ても、電磁応力が零になるわけではありません。跡だけを見た判定の落とし穴を後で確認します。

## 3. 電荷で地平線はいくつできるか

Schwarzschild計量は $r=2M$ で静的な座標成分 $g_{rr}=f^{-1}$ が発散しました。[GR25の正則座標による判定](../GR25/index.md#prop-gr25-regular-horizon-chart)では、この発散自体は曲率特異性を意味しないことを確認しました。RNでも同じ区別が必要です。ただし電荷項 $Q^2/r^2$ が加わるため、$f$ の零点の個数が変わります。

地平線という用語には[GR29のKilling地平線の定義](../GR29/index.md#def-gr29-killing-horizon)を用います。まず、$f=0$ を解くには $r>0$ を掛けて分母を取り払い、

$$
f(r)=0\quad\Longleftrightarrow\quad
r^2-2Mr+Q^2=0
\quad(r>0)
$$

とします。右辺の判別式は $4(M^2-Q^2)$ です。地平線であることは単なる根の存在だけでなく、零面が実際に光的であることを検算して確認します。

<a id="def-gr31-rn-horizon-radii"></a>

<!-- formal-statement-start -->
> **定義（RN計量の内外のKilling地平線半径）**  
> $M>0$、$0<|Q|<M$ のReissner–Nordström計量に対し、

$$
\boxed{r_\pm=M\pm\sqrt{M^2-Q^2}}
$$

> をそれぞれ外側（$r_+$）・内側（$r_-$）のKilling地平線半径という。$r_\pm>0$ を満たす二つの零面 $r=r_\pm$ に対応する。$|Q|=M$ では二つの根が $r=M$ に合流して退化地平線となる。$Q=0$ の形式的な $r_-=0$ は曲率特異性の位置であり、内側地平線には数えない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr31-rn-horizon-radii -->
**定義の確認**。$M=5,Q=4$ とすると $M^2-Q^2=25-16=9>0$ なので $r_+=5+3=8$、$r_-=5-3=2$ です。ともに $r>0$ で、$r_+>r_-$ です。直接代入すると

$$
f(r)=1-\frac{10}r+\frac{16}{r^2}
=\left(1-\frac8r\right)\left(1-\frac2r\right)
$$

だから $f(8)=f(2)=0$ です。これらが単なる係数の零点でなく、[Killing地平線の定義](../GR29/index.md#def-gr29-killing-horizon)を満たすことも確認します。根を避けた $f\ne0$ の座標域で $dv=dt+dr/f$ と置き、得られた式を根へ延長すると

$$
ds^2=-f\,dv^2+2\,dv\,dr+r^2d\Omega^2
$$

です。交差項は $2g_{vr}\,dv\,dr=2\,dv\,dr$ なので、座標基底 $(\partial_v,\partial_r)$ での行列と逆行列は

$$
(g_{ab})=\begin{pmatrix}-f&1\\1&0\end{pmatrix},
\qquad (g^{ab})=\begin{pmatrix}0&1\\1&f\end{pmatrix}
$$

となります。この有限次元の座標基底では、計量の非退化性は係数行列の可逆性と同値です。$\det(g_{ab})=-1$ は時間・半径部分の可逆性を示し、$r>0$ の球面部分は正定値なので全計量は両根で非退化なLorentz計量です。$g^{-1}(dr,dr)=g^{rr}=f=0$ だから $r=2,8$ は零超曲面です。さらに $\xi=\partial_v$ は計量が $v$ に依存しないためKilling場で、その計量双対は $\xi^\flat=-f\,dv+dr=dr$（両根上）です。従って、零でない $\xi$ が面の法線方向になり、定義の非自明な条件を確認できました。次の命題では一般の $M,Q$ に対して同じ判定を証明します。
<!-- definition-example-end -->

<a id="prop-gr31-horizons"></a>

<!-- formal-statement-start -->
> **命題（RN計量の地平線の分類と正則座標）**  
> $M>0$、$Q\in\mathbb R$、$r>0$ とし、[RN計量](#thm-gr31-rn-solution)を考える。
>
> 1. $0<|Q|<M$ では二つの異なる正の根 $0<r_-<r_+$ があり、$r>r_+$ と $0<r<r_-$ で $f>0$、$r_-<r<r_+$ で $f<0$ となる。
> 2. $|Q|=M$ では $f=(1-M/r)^2$ となり、$r=M$ は重根である。$|Q|>M$ では $r>0$ に根がなく、RNの標準的な漸近平坦延長で地平線は現れない。
> 3. $Q=0$ では正の根は $r=2M$ だけである。$|Q|\le M$ の正の根の近傍では入射Eddington–Finkelstein座標 $v$ によって

$$
\boxed{ds^2=-f(r)\,dv^2+2\,dv\,dr+r^2d\Omega^2}
$$

> と書け、$r=r_\pm$（$0<|Q|<M$）、$r=M$（$|Q|=M$）、$r=2M$（$Q=0$）は有限な $r>0$ にある正則な零超曲面であり、$\partial_v$ がその零生成方向になる。この局所結果だけでは最大延長の全体の因果構造やCauchy地平線の性質までは証明しない。
<!-- formal-statement-end -->

### 証明の見取り図

まず判別式と因数分解で根と符号を判定します。次に座標を取り替えて $g_{rr}=f^{-1}$ を消し、逆計量で零面の法線の長さを確認します。重根の場合でもEF座標への変換後の計量は有限です。

<!-- proof-start -->
### 証明

まず $0<|Q|<M$ では $0<\sqrt{M^2-Q^2}<M$ なので $r_\pm>0$ です。[地平線半径の定義](#def-gr31-rn-horizon-radii)によって

$$
r_++r_-=2M,\qquad r_+r_-=Q^2,\qquad
f(r)=\frac{(r-r_+)(r-r_-)}{r^2}.
$$

分母は $r>0$ で正です。$r>r_+$ では二因子とも正、$r_-<r<r_+$ では片方だけ負、$0<r<r_-$ では二因子とも負ですから、主張の符号を得ます。

$|Q|=M$ の場合は分子が $(r-M)^2$ となり、

$$
f(r)=\frac{(r-M)^2}{r^2},\qquad
f(M)=0,\quad f'(M)=0.
$$

一方 $|Q|>M$ なら

$$
r^2f(r)=(r-M)^2+(Q^2-M^2)>0
$$

なので正の根はありません。$Q=0$ なら $r^2f=r(r-2M)$ で、形式的な根 $r=0$ は当初の定義域 $r>0$ から除かれます。

次に $f\ne0$ の開領域で $dv=dt+dr/f(r)$ と置きます。$dt=dv-dr/f$ を元の計量へ代入すると

$$
\begin{aligned}
-fdt^2+\frac{dr^2}{f}
&=-f\left(dv-\frac{dr}{f}\right)^2+\frac{dr^2}{f}\\
&=-f\,dv^2+2\,dv\,dr-\frac{dr^2}{f}+\frac{dr^2}{f}\\
&=-f\,dv^2+2\,dv\,dr.
\end{aligned}
$$

座標基底 $(\partial_v,\partial_r)$ で計量の $dv^2$ 係数が $g_{vv}=-f$、$dr^2$ 係数が $g_{rr}=0$ です。また交差項は $2g_{vr}\,dv\,dr=2\,dv\,dr$ なので $g_{vr}=g_{rv}=1$ です。このように定めた $(v,r)$ 部分の計量と逆計量は

$$
(g_{ab})=\begin{pmatrix}-f&1\\1&0\end{pmatrix},
\qquad
(g^{ab})=\begin{pmatrix}0&1\\1&f\end{pmatrix}.
$$

二つの行列の積は単位行列であり、$\det(g_{ab})=(-f)\cdot0-1\cdot1=-1$ です。実対称な二次元行列の行列式が負なので時間・半径部分の固有値は異符号で、角度方向の正定値部分と合わせてLorentz符号を保ちます。球座標の極を避ければ、4次元行列式は $-r^4\sin^2\vartheta$ で、$r>0$ の根で退化しません。$f$ はその根の近傍でも滑らかなので、この表示は座標域を根まで延長できます。

電磁場も $dt=dv-dr/f$ を使うと

$$
F=\frac Q{r^2}\left(dv-\frac{dr}{f}\right)\wedge dr
=\frac Q{r^2}\,dv\wedge dr
$$

となります。$dr\wedge dr=0$ により $1/f$ は消え、$F$ もすべての正の根で滑らかです。したがって静的領域で成り立つEinstein–Maxwell方程式は、この滑らかな延長でも連続性によって成立します。

$r=r_h$ を一定にする面の法線は $dr$ です。逆計量をこの法線に適用すると

$$
g^{-1}(dr,dr)=g^{rr}=f(r_h)=0
$$

なので、この面は零超曲面です。さらに、面に接する $\partial_v$ は

$$
g(\partial_v,\partial_v)=-f(r_h)=0,\qquad
\partial_v(r)=0
$$

を満たし、面上を走る零方向となります。さらにこの座標基底での計量双対は

$$
(\partial_v)^\flat=g_{vv}\,dv+g_{rv}\,dr=-f\,dv+dr,
\qquad (\partial_v)^\flat\big|_{r=r_h}=dr
$$

です。$dr$ は面 $r=r_h$ の法共ベクトルで、$\partial_v$ は零でないので、Killing場の**法線性**まで示されました。計量係数が $v$ に依存しないため $\partial_v$ はKilling場でもあり、[GR29のKilling地平線の定義](../GR29/index.md#def-gr29-killing-horizon)のすべての条件に対応します。この判定は重根でも成立し、$f'$ が零かどうかを仮定していません。
<!-- proof-end -->

ここで静的領域と地平線を混同しないため、$f<0$ では $g_{tt}=-f>0$、$g_{rr}=1/f<0$ となり、$t$ が時間的な座標ではなくなります。外側で静止していた観測者を、この区間でも同じ意味で静止させることはできません。

**劣極限・極限・超極限の比較**。$M=5$ を固定すれば、$Q=4$ では $r_+=8,r_-=2$、$|Q|=5$ では $r=5$ で二重根、$|Q|=6$ では $(r-5)^2+11>0$ なので根がありません。$|Q|>M$ の標準RN幾何では出射動径零光線が任意の $r>0$ から外向きに進め、$r=0$ の特異性を隠す地平線はありません。ただし、現実の帯電物体の形成過程がこの超極限解を必ず作るという主張ではありません。

**内側の零面の呼び方**。最大解析延長した劣極限RN解では内側の地平線がCauchy地平線として現れます。しかし、ある面で $f=0$ という局所計算だけからCauchy面の定義域や摂動安定性までは分かりません。地平線が二つあるという**代数的な事実**と、大域的な予測可能性の議論を分けます。

## 4. 地平線と曲率特異性を見分ける

[GR25のKretschmann不変量](../GR25/index.md#def-gr25-kretschmann)は曲率を座標に依存せず比べる方法でした。電磁場があるとRicci曲率だけでも中心の特異性を検出できます。まず、[GR9のMaxwell応力の跡なし性](../GR9/index.md#thm-gr9-em-stress)から $T^\mu{}_\mu=0$ であり、Einstein方程式の跡を取ると

$$
G^\mu{}_\mu=R-\frac12(4)R=-R
=8\pi T^\mu{}_\mu=0,\qquad R=0.
$$

このため、スカラー曲率 $R$ **だけ**を見て「曲率が零」と判定するのは誤りです。次にRicciテンソルを二回縮約した量を調べます。

<a id="prop-gr31-ricci-square"></a>

<!-- formal-statement-start -->
> **命題（RN電磁場のRicci不変量）**  
> $M>0$、$Q\ne0$ の[RN外部解](#thm-gr31-rn-solution)を $r>0$ で考える。Einstein–Maxwell方程式を満たす領域で

$$
\boxed{R=0,\qquad R_{\mu\nu}R^{\mu\nu}=\frac{4Q^4}{r^8}}
$$

> である。後者は $r\downarrow0$ で発散し、正の有限半径の地平線では有限である。
<!-- formal-statement-end -->

### 証明の見取り図

跡が零なのでEinsteinテンソルとRicciテンソルが一致します。応力の混合対角成分をそのまま使い、二乗の跡を取ると半径依存が計算できます。

<!-- proof-start -->
### 証明

上の跡計算で $R=0$ を得たので、[Einstein方程式](../GR12/index.md#thm-gr12-einstein-equation)から $R^\mu{}_\nu=8\pi T^\mu{}_\nu$ です。[電磁応力の成分](#prop-gr31-maxwell-stress)へ代入すると

$$
(R^\mu{}_\nu)
=\frac{Q^2}{r^4}\operatorname{diag}(-1,-1,1,1).
$$

縮約 $R_{\mu\nu}R^{\mu\nu}=R^\mu{}_\nu R^\nu{}_\mu$ はこの混合行列の二乗の跡であるため、

$$
R^\mu{}_\nu R^\nu{}_\mu
=\frac{Q^4}{r^8}\bigl[(-1)^2+(-1)^2+1^2+1^2\bigr]
=\frac{4Q^4}{r^8}.
$$

$Q\ne0$ なら分子は正の定数で、$r\downarrow0$ とすると発散します。一方、$r_h>0$ が任意の根なら代入値 $4Q^4/r_h^8$ は有限です。
<!-- proof-end -->

この発散は単なる座標変換で取り除けず、中心 $r=0$ に曲率特異性がある証拠です。$Q=0$ の場合はこのRicci不変量が恒等的に零でも、[GR25のSchwarzschildのKretschmann計算](../GR25/index.md#thm-gr25-kretschmann-schwarzschild)で $48M^2/r^6$ が発散するため、中心はやはり曲率特異点です。$r=r_\pm$ の正則性は不変量の有限性だけに頼らず、前節のEF表示で確認済みです。

RN解は帯電したコンパクト物体の**無電流・無物質の外部**を記述する厳密解です。物質表面の内側や帯電物体の形成過程は、この外部解だけでは定まりません。内側の地平線の安定性、宇宙検閲、量子的な蒸発についてもここで証明したことには含めません。次の回転解では、球対称性を外したときの計量の構造を調べます。

## 5. 演習

### Level A：流束・応力・根を一つずつ計算する

<a id="ex-gr31-a01"></a>
#### GR31-A01 球面流束と観測電場
- Level: A

$r>0$ で長さの定数 $L>0$ を固定して $e^\Phi=1+r/L$、$e^\Lambda=1$ とし、純電場 $F_{tr}=Qe^{\Phi+\Lambda}/r^2$ を考える。$F^{rt}$、正規直交枠での電場、半径一定の球の規格化流束を求めよ。Maxwell方程式だけを確認し、この計量がEinstein方程式も満たすとは仮定しない。

<!-- solution-start -->
**詳細解答。** $F_{tr}=Q(1+r/L)/r^2$、$g^{tt}=-(1+r/L)^{-2}$、$g^{rr}=1$ なので

$$
F^{rt}=g^{rr}g^{tt}F_{rt}
=1\cdot[-(1+r/L)^{-2}]\cdot[-Q(1+r/L)/r^2]
=\frac{Q}{r^2(1+r/L)}.
$$

時間枠と動径枠に代入すると $F(e_{\hat0},e_{\hat r})=(1+r/L)^{-1}F_{tr}=Q/r^2$ です。面積要素込みの流束は

$$
\frac1{4\pi}\int_0^{2\pi}\int_0^\pi
(1+r/L)r^2\frac{Q}{r^2(1+r/L)}
\sin\vartheta\,d\vartheta\,d\varphi
=\frac{Q}{4\pi}(2)(2\pi)=Q.
$$

この計算は[球対称Maxwell命題](#prop-gr31-maxwell-stress)の流束部分を検証しますが、与えた $\Phi,\Lambda$ が重力方程式を解くとまでは言っていません。
<!-- solution-end -->

<a id="ex-gr31-a02"></a>
#### GR31-A02 電場応力の符号と跡
- Level: A

幾何単位で $Q=2,r=2$ の純動径電場を考える。[球対称電磁応力](#prop-gr31-maxwell-stress)の $T^\mu{}_\nu$ の四つの対角成分とその跡を計算し、どの方向が電場方向の張力か述べよ。

<!-- solution-start -->
**詳細解答。** $\rho=Q^2/(8\pi r^4)=4/(8\pi\cdot16)=1/(32\pi)$ です。従って

$$
(T^\mu{}_\nu)=\frac1{32\pi}\operatorname{diag}(-1,-1,1,1),
\quad T^\mu{}_\mu=\frac{-1-1+1+1}{32\pi}=0.
$$

正規直交枠での動径応力は $T_{\hat r\hat r}=-\rho$ で負、すなわち電場方向には張力が働きます。角度方向は $+\rho$ の圧力です。混合の時間成分が負であることはエネルギー密度が負という意味ではありません。
<!-- solution-end -->

<a id="ex-gr31-a03"></a>
#### GR31-A03 二つの根と領域の符号
- Level: A

$M=5,Q=4$ のRN計量について $r_\pm$ を計算し、$r=1,4,10$ の $f$ の値と符号を求めよ。

<!-- solution-start -->
**詳細解答。** $M^2-Q^2=25-16=9$ なので[地平線半径](#def-gr31-rn-horizon-radii)は $r_-=2,r_+=8$ です。因数分解 $f=(1-8/r)(1-2/r)$ を各半径に代入すると

$$
f(1)=(-7)(-1)=7>0,\quad
f(4)=(-1)(1/2)=-1/2<0,\quad
f(10)=(1/5)(4/5)=4/25>0.
$$

根の内側も常に $f<0$ なのではなく、内側地平線よりさらに小さい $r$ では正へ戻ります。
<!-- solution-end -->

<a id="ex-gr31-a04"></a>
#### GR31-A04 零電荷の形式的な根
- Level: A

$M=3,Q=0$ とする。$r^2f(r)$ の因数分解から二つの代数的な根を求め、正の地平線として採用できるものを特定せよ。中心の性質も述べよ。

<!-- solution-start -->
**詳細解答。** $r^2f=r^2-6r=r(r-6)$ だから形式上の根は $r=0,6$ です。ただし計量は $r>0$ で議論しており、$r=0$ は因数分解前の $f=1-6/r$ が発散する点です。正の根は $r=6=2M$ だけです。[GR25のKretschmann不変量](../GR25/index.md#thm-gr25-kretschmann-schwarzschild)は $48M^2/r^6$ なので $r=0$ は曲率特異点であり、内側地平線ではありません。
<!-- solution-end -->

<a id="ex-gr31-a05"></a>
#### GR31-A05 幾何単位の電荷項
- Level: A

長さ単位で $M=2,Q=1$ のRN解を $r=5$ で評価し $f(5)$ を求めよ。またSI電荷 $q_{\rm SI}$ を使うとき、$Q^2$ に対応する式を $G,c,\varepsilon_0$ で書け。

<!-- solution-start -->
**詳細解答。** $f(5)=1-2(2)/5+1/25=1-20/25+1/25=6/25$ です。幾何単位の電荷は長さなので $Q^2=Gq_{\rm SI}^2/(4\pi\varepsilon_0c^4)$ です。$Gq_{\rm SI}^2/(4\pi\varepsilon_0)$ の次元は $\mathrm{m}^6/\mathrm{s}^4$、$c^4$ で割ると $\mathrm{m}^2$ になり、$Q^2/r^2$ は無次元です。
<!-- solution-end -->

### Level B：方程式・座標・不変量を結び付ける

<a id="ex-gr31-b01"></a>
#### GR31-B01 電場のEinstein方程式を積分する
- Level: B

静的球対称のEinstein–Maxwell領域で $e^{2\Phi}=e^{-2\Lambda}=f$ を満たすとする。$G^t{}_t=(rf'+f-1)/r^2$ と $T^t{}_t=-Q^2/(8\pi r^4)$ から漸近的に $f=1-2M/r+Q^2/r^2$ を導き、$G^\vartheta{}_\vartheta=8\pi T^\vartheta{}_\vartheta$ も直接検算せよ。

<!-- solution-start -->
**詳細解答。** [Einstein方程式](../GR12/index.md#thm-gr12-einstein-equation)の $tt$ 成分は

$$
\frac{rf'+f-1}{r^2}
=8\pi\left(-\frac{Q^2}{8\pi r^4}\right)
=-\frac{Q^2}{r^4}.
$$

従って $(rf)'=1-Q^2/r^2$ です。原始関数は $r+Q^2/r+C$ なので $f=1+C/r+Q^2/r^2$ となり、無限遠で質量 $M$ の $1/r$ 項は $-2M/r$ であることから $C=-2M$ です。微分を別々に行うと

$$
f'=\frac{2M}{r^2}-\frac{2Q^2}{r^3},\quad
f''=-\frac{4M}{r^3}+\frac{6Q^2}{r^4},
$$

$$
G^\vartheta{}_\vartheta
=\frac{f''}{2}+\frac{f'}r
=\left(-\frac{2M}{r^3}+\frac{3Q^2}{r^4}\right)
+\left(\frac{2M}{r^3}-\frac{2Q^2}{r^4}\right)
=\frac{Q^2}{r^4}
=8\pi T^\vartheta{}_\vartheta.
$$

質量項の相殺と電荷項の残りをそれぞれ確認できました。
<!-- solution-end -->

<a id="ex-gr31-b02"></a>
#### GR31-B02 重根でも座標を延長する
- Level: B

$M=|Q|>0$ のRN計量を考える。$f(M)$ と $f'(M)$ を計算し、$dv=dt+dr/f$ を $r\ne M$ で定めてから、変換後の $(v,r)$ 計量行列と逆行列式を求めよ。$r=M$ が零面であることを示せ。

<!-- solution-start -->
**詳細解答。** $f=(1-M/r)^2$ なので $f(M)=0$、$f'=2(1-M/r)M/r^2$ より $f'(M)=0$ です。座標変換を $r\ne M$ で行えば

$$
-f(dt)^2+f^{-1}dr^2
=-f(dv-dr/f)^2+f^{-1}dr^2
=-f\,dv^2+2\,dv\,dr.
$$

交差項が $2\,dv\,dr=2g_{vr}\,dv\,dr$ であることから $g_{vr}=g_{rv}=1$ と読み取れます。座標基底 $(\partial_v,\partial_r)$ で

$$
(g_{ab})=\begin{pmatrix}-f&1\\1&0\end{pmatrix},
\qquad (g^{ab})=\begin{pmatrix}0&1\\1&f\end{pmatrix},
\qquad \det(g_{ab})=-1
$$

となり、二行列の積は単位行列です。$r=M$ の法線 $dr$ は $g^{-1}(dr,dr)=g^{rr}=f(M)=0$ なので零です。さらに $(\partial_v)^\flat=-f\,dv+dr=dr$ がその面で成り立ち、$\partial_v$ は[Killing地平線の定義](../GR29/index.md#def-gr29-killing-horizon)の法線条件を満たします。元の $t$ と $v$ の関係が根で発散しても、新しい座標表示の計量は滑らかで非退化であり、電磁場 $F=Qr^{-2}dv\wedge dr$ も滑らかです。
<!-- solution-end -->

<a id="ex-gr31-b03"></a>
#### GR31-B03 跡が零でも曲率は残る
- Level: B

$Q\ne0$ のRN解で、$T^\mu{}_\nu=\rho\operatorname{diag}(-1,-1,1,1)$、$\rho=Q^2/(8\pi r^4)$ とする。$R$、$R_{\mu\nu}R^{\mu\nu}$ をEinstein方程式から求め、$r=0$ および正の有限半径 $r=r_h$ の挙動を比較せよ。

<!-- solution-start -->
**詳細解答。** 跡は $T^\mu{}_\mu=(-1-1+1+1)\rho=0$ です。[Einstein方程式の跡](../GR12/index.md#prop-gr12-trace-reverse)から $-R=8\pi T^\mu{}_\mu=0$、従って $R=0$ です。一方 $R^\mu{}_\nu=8\pi T^\mu{}_\nu=(Q^2/r^4)\operatorname{diag}(-1,-1,1,1)$ なので

$$
R_{\mu\nu}R^{\mu\nu}
=R^\mu{}_\nu R^\nu{}_\mu
=\frac{Q^4}{r^8}(1+1+1+1)
=\frac{4Q^4}{r^8}.
$$

$Q\ne0$ なら $r\downarrow0$ で発散し、$r_h>0$ では $4Q^4/r_h^8<\infty$ です。$R=0$ だけでは曲率が全成分零と判断できません。
<!-- solution-end -->

<a id="ex-gr31-b04"></a>
#### GR31-B04 出射零光線の向きと大域的な注意
- Level: B

$M=5,Q=4$ のRN入射EF計量で、$dv>0$ の動径出射零曲線の微分方程式を導き、$r=1,4,10$ で $dr/dv$ を求めよ。$r=1$ で $dr/dv>0$ だから未来零無限遠へ必ず脱出できる、という推論に問題があるか述べよ。

<!-- solution-start -->
**詳細解答。** $d\Omega=0$、$ds^2=0$ なので

$$
0=-f\,dv^2+2\,dv\,dr,\qquad
\frac{dr}{dv}=\frac{f(r)}2\quad(dv>0).
$$

[根による因数分解](#prop-gr31-horizons)から $f=(1-8/r)(1-2/r)$ です。従って

$$
\left.\frac{dr}{dv}\right|_{r=1}=\frac72,\quad
\left.\frac{dr}{dv}\right|_{r=4}=-\frac14,\quad
\left.\frac{dr}{dv}\right|_{r=10}=\frac2{25}.
$$

$r=1$ は内側の根より内側なので、この座標での出射零方向の局所勾配は正です。しかし、外部へ達するには $r=2$ と $r=8$ の零面を越える大域的な光線の振舞いを判断しなければなりません。局所勾配の符号だけで、同じ延長の未来零無限遠へ脱出できるとは断定できません。
<!-- solution-end -->

### Level C：Einstein–Maxwellの外部解を構成する

<a id="ex-gr31-c01"></a>
#### GR31-C01 帯電外部の方程式・地平線・中心
- Level: C

4次元の静的球対称・漸近平坦な領域で $ds^2=-e^{2\Phi(r)}dt^2+e^{2\Lambda(r)}dr^2+r^2d\Omega^2$、純動径電場 $F=E_c(r)\,dt\wedge dr$ を考える。磁荷と電流はなく、$\Lambda_{\rm cosm}=0$、幾何単位を使う。次を行え。

1. 無電流Maxwell方程式から電場と混合応力を求めよ。
2. $T^t{}_t=T^r{}_r$ と漸近規格化から $e^{2\Phi}=e^{-2\Lambda}$ を導き、Einstein方程式を積分して $f(r)$ を求めよ。
3. $M=10,Q=6$ としたときの内外の根、および $r=5$ での $f$ の符号を求めよ。
4. EF座標で根が零超曲面になることを示し、$R_{\mu\nu}R^{\mu\nu}$ の中心での挙動を述べよ。
5. $M=10$ のまま $|Q|=10$、$|Q|=11$ としたとき、正の根の個数を分類せよ。

<!-- solution-start -->
**詳細解答。**

**（1）** $\sqrt{-g}=e^{\Phi+\Lambda}r^2\sin\vartheta$、$F^{rt}=e^{-2(\Phi+\Lambda)}E_c$ だから

$$
0=\nabla_\mu F^{\mu t}
=\frac1{\sqrt{-g}}\partial_r(\sqrt{-g}F^{rt})
\quad\Longrightarrow\quad
\partial_r(r^2e^{-\Phi-\Lambda}E_c)=0.
$$

積分定数を $Q$ とすれば $E_c=Qe^{\Phi+\Lambda}/r^2$ です。正規直交枠で $u=Q/r^2$ なので、[球対称電場の応力計算](#prop-gr31-maxwell-stress)を適用すると

$$
T^\mu{}_\nu=\frac{Q^2}{8\pi r^4}\operatorname{diag}(-1,-1,1,1).
$$

**（2）** $h=e^{-2\Lambda}$ と書き、Einsteinテンソルの差を取ると

$$
0=G^t{}_t-G^r{}_r=-\frac{2h}{r}(\Phi'+\Lambda').
$$

静的域では $h>0$ なので $\Phi+\Lambda=C$ です。漸近平坦な時計・半径の規格化から $C=0$、よって $e^{2\Phi}=e^{-2\Lambda}=:f$ となります。次に

$$
\frac{(rf)'-1}{r^2}=8\pi T^t{}_t
=-\frac{Q^2}{r^4},\qquad
(rf)'=1-\frac{Q^2}{r^2}.
$$

積分すれば $rf=r+Q^2/r+C_1$、従って $f=1+C_1/r+Q^2/r^2$ です。[Schwarzschildの質量の同定](../GR16/index.md#thm-gr16-schwarzschild)により $C_1=-2M$ なので $f=1-2M/r+Q^2/r^2$ を得ます。角度成分も $f''/2+f'/r=Q^2/r^4$ で応力に一致します。

**（3）** 判別式は $M^2-Q^2=100-36=64$ です。よって

$$
r_+=10+\sqrt{64}=18,\qquad
r_-=10-\sqrt{64}=2.
$$

$r=5$ は二つの根の間です。直接計算しても

$$
f(5)=1-\frac{20}{5}+\frac{36}{25}
=1-4+\frac{36}{25}=-\frac{39}{25}<0.
$$

**（4）** 根以外で $dv=dt+dr/f$ としてから $dt=dv-dr/f$ を代入すると、$ds^2=-f\,dv^2+2\,dv\,dr+r^2d\Omega^2$ です。$(v,r)$ 行列式は $-1$、逆計量の $g^{rr}=f$ は両方の根で零です。したがって根の面は正則な零超曲面として延長できます。さらに[RN電磁場のRicci不変量](#prop-gr31-ricci-square)から

$$
R_{\mu\nu}R^{\mu\nu}=\frac{4Q^4}{r^8}
=\frac{4\cdot6^4}{r^8},
$$

なので $r=2,18$ では有限ですが $r\downarrow0$ で発散します。

**（5）** $|Q|=10$ では $M^2-Q^2=0$ で $r=10$ の重根一つ、$|Q|=11$ では $M^2-Q^2=100-121=-21<0$ で正の実根はありません。これは静的なRN外部のパラメータ分類であり、帯電崩壊がいずれの解を生成するかまでの予測ではありません。
<!-- solution-end -->

## 6. 次の回転解へ

ここでは静的・球対称・純電場という仮定から $f=1-2M/r+Q^2/r^2$ を導き、電荷が地平線の数を変えることを見ました。電荷項は応力の $r^{-4}$ を半径で積分した結果であり、重力の真空項とは出自が違います。次のKerr時空では回転が入るため、もはや時間と角度を分離した静的な対角計量を最初から置けません。

