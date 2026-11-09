# BHT4 Schwarzschild・Reissner–Nordströmの第一法則

<!-- definition-example-audit: strict -->

[BHT1のSchwarzschild変分恒等式](../BHT1/index.md#prop-bht1-variation-identity)は、質量だけが動く一パラメータの幾何学的な関係でした。帯電したブラックホールでは質量を変えずに電荷だけを変えても地平線の半径と面積が変わります。すると、面積の変分だけで質量の変分を説明することはできません。残る寄与を何が担うかが本講の問いです。

[GR31のReissner–Nordström（RN）解](../../GR/GR31/index.md#thm-gr31-rn-solution)と[GR45の静的表面重力公式](../../GR/GR45/index.md#thm-gr45-static)を出発点にして、**一つの非極限定常解族の中で**面積 $A$、表面重力 $\kappa$、電荷 $Q$、地平線電位 $\Phi_H$ を同じ規格化で計算します。その後、質量の全微分が二つの項へ分かれることを、異なるパラメータの取り方で検算します。

全体を通じて4次元、計量符号 $(-,+,+,+)$、宇宙項 $\Lambda=0$、$G=c=1$ とし、Einstein–Maxwellの電磁場規格化はGR31に従います。$M,Q,r$ は長さの次元を持ち、$M>0$、$Q$ は符号付きです。$\hbar,k_B$ を用いる温度・エントロピーの同定はまだ行いません。

## 1. 二つのパラメータを持つ定常解族

[GR31の外部解](../../GR/GR31/index.md#thm-gr31-rn-solution)では、静的領域 $r>r_+$ の計量関数と純電場は

$$
ds^2=-f(r)dt^2+\frac{dr^2}{f(r)}+r^2d\Omega^2,
\quad f(r)=1-\frac{2M}{r}+\frac{Q^2}{r^2},
\quad F=\frac{Q}{r^2}dt\wedge dr.
$$

ここで $d\Omega^2=d\vartheta^2+\sin^2\vartheta\,d\varphi^2$ です。$F$ はMaxwellの電磁場2形式で、電荷の符号は $F_{tr}=Q/r^2$ という既習の選択で固定されています。$f$ の根は[GR31の地平線半径の定義](../../GR/GR31/index.md#def-gr31-rn-horizon-radii)から

$$
r_\pm=M\pm\sqrt{M^2-Q^2},\qquad
r_++r_-=2M,\qquad r_+r_-=Q^2.
$$

$|Q|<M$ なら $r_+>r_-$ で、外側根は単純です。$Q=0$ の形式的な内側根 $r_-=0$ はブラックホールの内側地平線ではなく、外側根 $r_+=2M$ がSchwarzschild地平線になります。$|Q|=M$ の重根は極限解なので、主定理の微分領域とは分けて扱います。

また、$t$ は無限遠で $g(\partial_t,\partial_t)\to-1$ となる時計です。静的表示の $dr^2/f$ は地平線で発散しますが、[GR31の正則な入射座標](../../GR/GR31/index.md#prop-gr31-horizons)では $v=t+\int dr/f$ を使って

$$
ds^2=-f(r)dv^2+2\,dv\,dr+r^2d\Omega^2
$$

と滑らかに延長できます。外部の $\partial_t$ はこの座標では $\partial_v$ に一致します。地平線の断面は正則座標で $v$ と $r=r_+$ を固定した二球面として計算します。

<a id="def-bht4-rn-family"></a>

<!-- formal-statement-start -->
> **定義（非極限RNの定常解族）**
> 4次元、$G=c=1$、$\Lambda=0$、漸近平坦、磁荷なしのEinstein–Maxwell外部解を考える。無限遠で時間並進Killing場 $\chi=\partial_t$ を単位規格化し、電場を $F_{tr}=Q/r^2$ とする。開いたパラメータ領域

$$
\mathcal P=\{(M,Q)\in\mathbb R^2:M>0,\ |Q|<M\}
$$

> の各点に対応するRN時空の族を非極限RNの定常解族という。この族の接方向の変化を $\delta$ と記す。$\delta M,\delta Q$ は独立に選べる微小変化で、各変化の前後は別々の定常解である。物質が地平線を横切る時間発展を表す記号ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht4-rn-family -->
**定義の確認**：長さ $L>0$ を固定して $M=5L,Q=3L$ と取ります。$5L>|3L|$ なので $(M,Q)\in\mathcal P$ であり、根は

$$
\sqrt{M^2-Q^2}=4L,\qquad r_+=9L,\qquad r_-=L.
$$

$f(r)=(r-9L)(r-L)/r^2$ だから $r>9L$ で $f>0$、また $f(r)\to1$ なので無限遠で $\chi$ が規格化されています。[GR31の静的球対称Einstein–Maxwell外部解](../../GR/GR31/index.md#thm-gr31-rn-solution)により計量と $F$ は所定の無電流方程式を満たします。根が異なるので[正則延長の条件](../../GR/GR31/index.md#prop-gr31-horizons)にも合い、定義の非自明な条件を確認できました。
<!-- definition-example-end -->

## 2. 面積・表面重力・電位を同じ解から求める

地平線の面積は $r_+$ における二球面の誘導計量 $h=r_+^2d\Omega^2$ から求めます。角度基底 $(\partial_\vartheta,\partial_\varphi)$ に関して $\det h=r_+^4\sin^2\vartheta$ であり、

$$
A=\int_0^{2\pi}\!\int_0^\pi r_+^2\sin\vartheta\,d\vartheta\,d\varphi
=4\pi r_+^2.
$$

表面重力は[GR45の静的球対称地平線公式](../../GR/GR45/index.md#thm-gr45-static)を、非極限単純根 $r_+$ と無限遠で規格化した $\chi=\partial_v$ に適用します。根の因数分解を先に行うと

$$
f(r)=\frac{(r-r_+)(r-r_-)}{r^2},\quad
f'(r_+)=\frac{r_+-r_-}{r_+^2},\quad
\kappa=\frac{f'(r_+)}2=\frac{r_+-r_-}{2r_+^2}>0.
$$

次の電位は、重力の $\kappa$ と違ってMaxwell場のゲージの基準を指定する必要があります。電磁場の2形式そのものと、そのポテンシャル1形式 $\mathcal A$ を区別します。$F=d\mathcal A$ とし、GR31の $F_{tr}=Q/r^2$ の符号に合わせると、静的外部で

$$
\mathcal A=\frac Qr\,dt,\qquad
d\mathcal A=-\frac{Q}{r^2}\,dr\wedge dt
=\frac Q{r^2}\,dt\wedge dr=F.
$$

この規格化では、時間成分 $\chi^a\mathcal A_a=Q/r$ は無限遠で零、地平線へ近づくと $Q/r_+$ です。$dt$ を使ったこの表示は静的領域のゲージであり、地平線を横切る正則な1形式としては $\mathcal A_{\rm in}=(Q/r)dv$ を用いられます。両者は外部で $-(Q/rf)dr$ という完全微分だけ異なり、同じ $F$ を与えます。地平線の値を取る際は、まず無限遠の静的ゲージを基準にした電位差として定めます。

<a id="def-bht4-horizon-potential"></a>

<!-- formal-statement-start -->
> **定義（RNの地平線電位）**
> [非極限RNの定常解族](#def-bht4-rn-family)で、電荷 $Q$ を $F_{tr}=Q/r^2$ により規格化する。$\mathcal A=(Q/r)dt$ という静的ゲージで、無限遠で単位規格化した $\chi=\partial_t$ の成分差を

$$
\boxed{\Phi_H:=\lim_{r\downarrow r_+}\chi^a\mathcal A_a
-\lim_{r\to\infty}\chi^a\mathcal A_a
=\frac{Q}{r_+}}
$$

> と定め、RNの地平線電位という。この差は、両端で同じ定数だけ $\chi^a\mathcal A_a$ を変える定常ゲージ変換では不変である。$Q$ の規格化と電位差の向きを反転すれば、電荷項の記号も一緒に読み替える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht4-horizon-potential -->
**定義の確認**：$M=5L,Q=3L$ では $\chi\cdot\mathcal A=3L/r$ が $r\to\infty$ で $0$、$r\downarrow9L$ で $1/3$ に収束するので $\Phi_H=1/3$ です。$Q=-3L$ としても $f$ と $r_+$ は変わりませんが、Maxwell場 $F$ とポテンシャルがともに符号反転し、$\Phi_H=-1/3$ です。電位は面積のような非負量ではありません。
<!-- definition-example-end -->

以上を、後で直接参照できる一つの結果にまとめます。

<a id="prop-bht4-rn-data"></a>

<!-- formal-statement-start -->
> **命題（RN地平線の幾何学的状態データ）**
> 4次元の[非極限RN定常解族](#def-bht4-rn-family)の各 $(M,Q)\in\mathcal P$ で、外側の未来Killing地平線の正則な二球面断面と、無限遠で規格化した時間並進 $\chi$ を取る。[地平線電位](#def-bht4-horizon-potential)の規約の下で

$$
\boxed{\begin{gathered}
r_\pm=M\pm\sqrt{M^2-Q^2},\qquad
A=4\pi r_+^2,\\
\kappa=\frac{r_+-r_-}{2r_+^2}
=\frac{r_+^2-Q^2}{2r_+^3},\qquad
\Phi_H=\frac Q{r_+}.
\end{gathered}}
$$

> 特に $r_+>|Q|$、$A>0$、$\kappa>0$、$[A]=L^2$、$[\kappa]=L^{-1}$、$[\Phi_H]=1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

面積は正則な地平線断面の誘導計量から、$\kappa$ は計量関数の半径微分から、$\Phi_H$ は電荷の符号とゲージを固定したMaxwellポテンシャルの差から得ます。

<!-- proof-start -->
### 証明

[GR31の地平線半径](../../GR/GR31/index.md#def-gr31-rn-horizon-radii)より根の和と積は $2M,Q^2$ です。$|Q|<M$ から $r_+>r_-\ge0$、また $r_+r_-=Q^2$ なので $r_+^2>Q^2$ です。断面面積は誘導計量の積分により $A=4\pi r_+^2$。表面重力には[GR45の公式](../../GR/GR45/index.md#thm-gr45-static)を適用し、

$$
\kappa=\frac12f'(r_+)
=\frac{r_+-r_-}{2r_+^2}
=\frac{r_+-Q^2/r_+}{2r_+^2}
=\frac{r_+^2-Q^2}{2r_+^3}.
$$

電場の規格化が $F_{tr}=Q/r^2$ なので $\mathcal A=(Q/r)dt$ がそのポテンシャルであり、[電位の定義](#def-bht4-horizon-potential)へ両端の値を入れると $\Phi_H=Q/r_+$ です。次元は $[Q]=[r_+]=L$ と $\kappa$ の表示から直ちに確認できます。
<!-- proof-end -->

## 3. 第一法則：質量を半径と電荷の関数として微分する

このまま $r_+(M,Q)=M+\sqrt{M^2-Q^2}$ を微分してもよいのですが、まず根の方程式から $M$ を解くと計算の構造がはっきりします。外側根で $f(r_+)=0$ を使い、$r_+>0$ を掛けると

$$
r_+^2-2Mr_++Q^2=0
\quad\Longleftrightarrow\quad
\boxed{M(r_+,Q)=\frac{r_+}{2}+\frac{Q^2}{2r_+}}.
$$

ここで $r_+>|Q|$ という開領域を選べば、

$$
M-|Q|=\frac{r_+^2+Q^2-2r_+|Q|}{2r_+}
=\frac{(r_+-|Q|)^2}{2r_+}>0
$$

となり、この式から得る $M$ は $M>|Q|$ です。また他方の根は $r_-=Q^2/r_+<r_+$ なので、$r_+$ は確かに**外側**根です。したがって $(M,Q)$ の代わりに $(r_+,Q)$ を解族の局所座標として使えます。

この二変数関数の全微分では、$r_+$ を動かす寄与と $Q$ を動かす寄与を独立に計算します。

$$
\begin{aligned}
\delta M
&=\left(\frac{\partial M}{\partial r_+}\right)_Q\delta r_+
+\left(\frac{\partial M}{\partial Q}\right)_{r_+}\delta Q\\
&=\left(\frac12-\frac{Q^2}{2r_+^2}\right)\delta r_+
+\frac{Q}{r_+}\delta Q.
\end{aligned}
$$

一方、[状態データ](#prop-bht4-rn-data)の面積を微分すると $\delta A=8\pi r_+\delta r_+$、同じデータの表面重力を掛ければ

$$
\frac{\kappa}{8\pi}\delta A
=\frac{r_+^2-Q^2}{2r_+^3}\,r_+\delta r_+
=\left(\frac12-\frac{Q^2}{2r_+^2}\right)\delta r_+.
$$

残った偏導関数は $\Phi_H=Q/r_+$ です。これは偶然の係数合わせではなく、同じEinstein–Maxwell解の質量・面積・電磁場を用いて得た関係です。

<a id="thm-bht4-rn-first-law"></a>

<!-- formal-statement-start -->
> **定理（非極限RN定常解族の第一法則）**
> 4次元、$G=c=1$、$\Lambda=0$ の漸近平坦・磁荷なしのEinstein–Maxwell方程式の[非極限RN定常解族](#def-bht4-rn-family)を考える。パラメータは $M>0,\ |Q|<M$ とする。
>
> 無限遠のKilling時間規格化と $F_{tr}=Q/r^2$ の電荷規約を固定する。正則な外側未来地平線の面積 $A$、表面重力 $\kappa$、[地平線電位](#def-bht4-horizon-potential) $\Phi_H$ を用いる。
>
> この解族の任意の接方向 $\delta$ に対して

$$
\boxed{\delta M=\frac{\kappa}{8\pi}\,\delta A
+\Phi_H\,\delta Q}
$$

> が成立する。これは**非回転の定常解族上の変分恒等式**であって、任意の非定常流入時空や回転解についての一般的な第一法則を、この代数計算だけで証明したものではない。
<!-- formal-statement-end -->

### 証明の見取り図

根の方程式で $M$ を $r_+,Q$ の関数へ書き直します。$r_+$ による偏微分は $\kappa\delta A/(8\pi)$、$Q$ による偏微分は $\Phi_H\delta Q$ となり、全微分を二項へ分解できます。

<!-- proof-start -->
### 証明

[RN地平線半径](../../GR/GR31/index.md#def-gr31-rn-horizon-radii)の関係 $r_+r_-=Q^2$ と $r_++r_-=2M$ を用いると $2M=r_++Q^2/r_+$ です。非極限領域 $r_+>|Q|$ は開いており、$M(r_+,Q)$ はそこで滑らかです。従って任意の接方向について全微分が取れ、

$$
\delta M=\frac{r_+^2-Q^2}{2r_+^2}\delta r_+
+\frac Q{r_+}\delta Q.
$$

[本章の状態データ](#prop-bht4-rn-data)により $\kappa=(r_+^2-Q^2)/(2r_+^3)$、$A=4\pi r_+^2$、$\Phi_H=Q/r_+$ です。よって

$$
\frac{\kappa}{8\pi}\delta A
=\frac{r_+^2-Q^2}{2r_+^3}\cdot\frac{8\pi r_+}{8\pi}\delta r_+
=\frac{r_+^2-Q^2}{2r_+^2}\delta r_+,
\qquad \Phi_H\delta Q=\frac Q{r_+}\delta Q.
$$

これらの和が全微分に一致します。$r_+>|Q|$ なので途中の除算はすべて正当です。
<!-- proof-end -->

## 4. 質量と電荷を独立に動かして再検算する

前節の計算は $(r_+,Q)$ 座標でした。もともとの $(M,Q)$ 座標でも同じ関係になるかを確かめます。$s:=\sqrt{M^2-Q^2}>0$ とおくと、

$$
r_+=M+s,\quad r_-=M-s,\quad
\delta s=\frac{M\delta M-Q\delta Q}{s}.
$$

したがって $\delta r_+=\delta M+\delta s$ を代入して、

$$
\delta r_+=\frac{r_+}{s}\delta M-\frac Qs\delta Q,
\qquad
\delta A=8\pi r_+\left(\frac{r_+}{s}\delta M-\frac Qs\delta Q\right).
$$

ここで $\kappa=(r_+-r_-)/(2r_+^2)=s/r_+^2$ とした後、両項へ同じ係数を掛けます。

<a id="prop-bht4-mq-check"></a>

<!-- formal-statement-start -->
> **命題（質量・電荷座標での第一法則の検算）**
> [非極限RN定常解族](#def-bht4-rn-family)で $s=\sqrt{M^2-Q^2}>0$ とする。$M,Q$ を独立変数とした任意の微小変化に対し

$$
\boxed{\frac{\kappa}{8\pi}\,\delta A
=\delta M-\frac Q{r_+}\delta Q}
$$

> が成立する。$\Phi_H=Q/r_+$ を右辺から移項すると[RNの第一法則](#thm-bht4-rn-first-law)と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

$r_+$ の平方根を微分すると $1/s$ が現れます。$\kappa=s/r_+^2$ がこれをちょうど相殺します。相殺の前に $s=0$ を代入できない点にも注意します。

<!-- proof-start -->
### 証明

[GR31の外側根](../../GR/GR31/index.md#def-gr31-rn-horizon-radii)から、$s>0$ の開領域で連鎖律を適用し

$$
\begin{aligned}
\delta r_+
&=\delta M+\frac{2M\delta M-2Q\delta Q}{2s}\\
&=\frac{s+M}{s}\delta M-\frac Qs\delta Q
=\frac{r_+}{s}\delta M-\frac Qs\delta Q.
\end{aligned}
$$

[面積と表面重力の式](#prop-bht4-rn-data)へこれを代入すると

$$
\begin{aligned}
\frac{\kappa}{8\pi}\delta A
&=\frac{s}{r_+^2}\,r_+\left(\frac{r_+}{s}\delta M-\frac Qs\delta Q\right)\\
&=\delta M-\frac Q{r_+}\delta Q.
\end{aligned}
$$

$s>0$ なので途中の微分・約分に問題はありません。
<!-- proof-end -->

**数値による二重検算。** $M=5L,Q=3L$ では $s=4L,r_+=9L$、

$$
A=324\pi L^2,\quad
\kappa=\frac4{81L},\quad
\Phi_H=\frac13.
$$

微小変化を $\delta M=aL,\ \delta Q=bL$（$a,b$ は十分小さい実数）とすると

$$
\delta r_+=\left(\frac94a-\frac34b\right)L,
\quad \delta A=(162\pi a-54\pi b)L^2.
$$

よって

$$
\frac\kappa{8\pi}\delta A=(a-b/3)L,
\qquad \Phi_H\delta Q=(b/3)L,
$$

となり、和は $aL=\delta M$ に戻ります。面積の係数だけを合わせたのではなく、電荷の変化も独立に検査できています。

## 5. 固定条件を変えると何が言えるか

### Schwarzschild部分族

$Q=0$ の**部分族に沿う**変化は $\delta Q=0$ です。このとき $r_+=2M$、$A=16\pi M^2$、$\kappa=1/(4M)$、$\Phi_H=0$ となります。[BHT1の幾何学的変分恒等式](../BHT1/index.md#prop-bht1-variation-identity)をそのまま回復します。

$$
\delta A=32\pi M\delta M,
\quad \frac\kappa{8\pi}\delta A
=\frac1{4M}\frac{32\pi M}{8\pi}\delta M=\delta M.
$$

なお $Q=0$ の一点でRN族の**電荷方向**へ微分することも数学的にはできます。その場合は $\delta Q\ne0$ でも、電位がその点で零なので一次の電荷寄与は消えます。Schwarzschild部分族に沿うという条件と、RN族の接空間全体を考えるという条件は異なります。

### 固定面積・固定電荷

[第一法則](#thm-bht4-rn-first-law)の各項を消す条件は、それぞれ別です。

- $\delta A=0$（$r_+$ 固定）なら $\delta M=\Phi_H\delta Q$。たとえば $Q>0$ なら、電荷を増やす方向の質量変化は正です。
- $\delta Q=0$（電荷固定）なら $\delta M=\kappa\delta A/(8\pi)$。非極限では $\kappa>0$ なので、質量増加に対して面積も増えます。

逆に、定常解族で $M$ を固定したまま $Q>0$ を増やすと $\delta M=0$ なので $\delta A=-(8\pi\Phi_H/\kappa)\delta Q<0$ です。これは**二つの異なる定常時空の比較**です。[GR36の古典面積定理](../../GR/GR36/index.md#thm-gr36-smooth-area)が扱う「一つの時空の地平線上の二切断」とは違い、面積定理への反例ではありません。

### 極限境界での微分

$|Q|\uparrow M$ では $s=\sqrt{M^2-Q^2}\downarrow0$、$r_+\to M$、$\kappa=s/r_+^2\to0$ です。一方で、[質量・電荷座標の微分](#prop-bht4-mq-check)の途中に現れる

$$
\left(\frac{\partial r_+}{\partial Q}\right)_M
=-\frac Q{\sqrt{M^2-Q^2}}
$$

は、$Q\to M>0$ で発散します。**$\kappa\to0$ を先に代入して $0\cdot\infty$ を零とみなしてはいけません**。非極限の第一法則は各内点で成立し、極限族へ近づく値を比較することはできますが、境界点で独立の $(\delta M,\delta Q)$ を任意に選べるという本講の証明は成立しません。極限ブラックホールの第三法則や動的到達性はBHT11で改めて扱います。

本講の計算は「古典的な幾何学的第一法則」の検算です。非定常に物質・電磁場を落とす**物理過程版**には、地平線の流束と線形化Raychaudhuri方程式が別途必要です。その論証はBHT6で行います。また、$\kappa/(2\pi)$ を本当に温度と読んで $A/4$ をエントロピーと同定するためには量子場のHawking効果を接続する必要があり、それはBHT8〜BHT9の課題です。

## 6. 演習：定常解族の二方向を手計算する

### Level A：半径・電位・基本変分

<a id="ex-bht4-a01"></a>

#### BHT4-A01 RNの状態量を一つの解で計算

- Level: A

$M=5L,Q=3L$、$L>0$ とする。$r_\pm,A,\kappa,\Phi_H$ を求めよ。電荷の符号と表面重力の符号も述べよ。

<!-- solution-start -->
**詳細解答。** $s=\sqrt{25L^2-9L^2}=4L$ なので、[RN地平線のデータ](#prop-bht4-rn-data)より

$$
r_+=5L+4L=9L,\quad r_-=5L-4L=L,
\quad A=4\pi(9L)^2=324\pi L^2.
$$

同じ定理へ $r_+-r_-=8L$ を入れると

$$
\kappa=\frac{8L}{2(9L)^2}=\frac4{81L}>0,
\qquad \Phi_H=\frac{3L}{9L}=\frac13>0.
$$

$|Q|=3L<5L=M$ なので非極限で、表面重力の正符号は単純な外側根を使ったことと整合します。
<!-- solution-end -->

<a id="ex-bht4-a02"></a>

#### BHT4-A02 Maxwellポテンシャルの符号と基準

- Level: A

$F=(Q/r^2)dt\wedge dr$ とする。$\mathcal A=(Q/r+C)dt$ の外微分を求め、$C$ が定数のとき地平線電位が $C$ に依存しない理由を示せ。

<!-- solution-start -->
**詳細解答。** $Q,C$ を半径について一定として

$$
d\mathcal A=d(Q/r+C)\wedge dt
=-\frac Q{r^2}dr\wedge dt
=\frac Q{r^2}dt\wedge dr=F.
$$

時間成分は $Q/r+C$ で、地平線への極限が $Q/r_++C$、無限遠への極限が $C$ です。[電位の定義](#def-bht4-horizon-potential)で差を取れば

$$
\Phi_H=(Q/r_++C)-C=Q/r_+.
$$

したがって差には定数ゲージの自由度が残りません。ただし任意の非定常ゲージ変換について、両端の時間成分差が不変だと主張したわけではありません。
<!-- solution-end -->

<a id="ex-bht4-a03"></a>

#### BHT4-A03 Schwarzschild部分族を微分する

- Level: A

$Q=0$ かつ $\delta Q=0$ とする。$A(M),\kappa(M)$ を求めて $\delta M=\kappa\delta A/(8\pi)$ を示せ。

<!-- solution-start -->
**詳細解答。** [RN地平線半径](../../GR/GR31/index.md#def-gr31-rn-horizon-radii)で $Q=0$ を代入すると $r_+=2M$、$r_-=0$ です。従って[状態データ](#prop-bht4-rn-data)から

$$
A=4\pi(2M)^2=16\pi M^2,
\qquad \kappa=\frac{2M}{2(2M)^2}=\frac1{4M}.
$$

$\delta A=32\pi M\delta M$ より $\kappa\delta A/(8\pi)=\delta M$。$\Phi_H=0$ と $\delta Q=0$ で電荷項も消え、[BHT1の恒等式](../BHT1/index.md#prop-bht1-variation-identity)と一致します。
<!-- solution-end -->

<a id="ex-bht4-a04"></a>

#### BHT4-A04 負電荷の向き

- Level: A

$M=5L,Q=-3L$ とする。$r_+,\kappa,\Phi_H$ を求め、$\delta A=0$ のときの $\delta M$ と $\delta Q$ の関係を示せ。

<!-- solution-start -->
**詳細解答。** $Q^2=9L^2$ は正電荷の場合と同じなので $r_+=9L$、$r_-=L$、$\kappa=4/(81L)$ です。しかし[電位の定義](#def-bht4-horizon-potential)は $Q$ の符号を保ち

$$
\Phi_H=\frac{-3L}{9L}=-\frac13.
$$

[第一法則](#thm-bht4-rn-first-law)で $\delta A=0$ と置くと $\delta M=\Phi_H\delta Q=-\delta Q/3$ です。電荷を増やすとは、この点では負電荷の絶対値を減らす向きであり、質量変化の符号も正電荷の例と逆になります。
<!-- solution-end -->

<a id="ex-bht4-a05"></a>

#### BHT4-A05 半径と電荷から解を構成する

- Level: A

$r_+=4L,Q=2L$ を独立データとする。これが非極限RNの**外側**根を指定できることを確認し、$M,r_-,A,\kappa,\Phi_H$ を求めよ。

<!-- solution-start -->
**詳細解答。** $r_+=4L>|Q|=2L$ なので開領域の条件を満たします。根の方程式で

$$
M=\frac{4L}{2}+\frac{(2L)^2}{2(4L)}=\frac52L,
\qquad r_-=\frac{Q^2}{r_+}=L<4L.
$$

従って $M>|Q|$ であり、$r_+$ は内側根ではなく外側根です。[状態データ](#prop-bht4-rn-data)から

$$
A=4\pi(4L)^2=64\pi L^2,\quad
\kappa=\frac{4L-L}{2(4L)^2}=\frac3{32L},
\quad \Phi_H=\frac{2L}{4L}=\frac12.
$$

面積、正の表面重力、符号付き電位がすべて同じ解に対応しています。
<!-- solution-end -->

### Level B：二つの変分座標を接続する

<a id="ex-bht4-b01"></a>

#### BHT4-B01 質量の全微分から第一法則を組み立てる

- Level: B

$r_+>|Q|$ で $M(r_+,Q)=(r_+^2+Q^2)/(2r_+)$ とする。$\partial_{r_+}M$、$\partial_QM$ を取り、$A=4\pi r_+^2$ から[第一法則](#thm-bht4-rn-first-law)を再導出せよ。

<!-- solution-start -->
**詳細解答。** 分子を先に分ければ $M=r_+/2+Q^2/(2r_+)$ です。それぞれ他方の変数を固定して

$$
\left(\frac{\partial M}{\partial r_+}\right)_Q
=\frac12-\frac{Q^2}{2r_+^2}
=\frac{r_+^2-Q^2}{2r_+^2},\qquad
\left(\frac{\partial M}{\partial Q}\right)_{r_+}=\frac Q{r_+}.
$$

$\delta A=8\pi r_+\delta r_+$、[状態データ](#prop-bht4-rn-data)の $\kappa=(r_+^2-Q^2)/(2r_+^3)$ なので

$$
\frac\kappa{8\pi}\delta A
=\frac{r_+^2-Q^2}{2r_+^3}\,r_+\delta r_+
=\left(\frac{\partial M}{\partial r_+}\right)_Q\delta r_+.
$$

残りは[電位](#def-bht4-horizon-potential)を用いて $\partial_QM\,\delta Q=\Phi_H\delta Q$ と表せます。両者を合わせて $\delta M=\kappa\delta A/(8\pi)+\Phi_H\delta Q$ です。$r_+>|Q|$ が、外側根を滑らかな局所座標にする条件です。
<!-- solution-end -->

<a id="ex-bht4-b02"></a>

#### BHT4-B02 $(M,Q)$ による独立な検算

- Level: B

$M>|Q|$ とし、$s=\sqrt{M^2-Q^2}$、$r_+=M+s$ とする。$\delta r_+$ を $\delta M,\delta Q$ で表し、$\kappa=s/r_+^2$ と $A=4\pi r_+^2$ から面積項を計算せよ。

<!-- solution-start -->
**詳細解答。** $s>0$ なので平方根の微分が可能で

$$
\delta s=\frac{M\delta M-Q\delta Q}{s}.
$$

従って

$$
\delta r_+=\delta M+\delta s
=\frac{M+s}{s}\delta M-\frac Qs\delta Q
=\frac{r_+}{s}\delta M-\frac Qs\delta Q.
$$

これを面積の全微分へ代入し、$\kappa=s/r_+^2$ を掛けると

$$
\begin{aligned}
\frac\kappa{8\pi}\delta A
&=\frac s{r_+^2}\,r_+\left(\frac{r_+}{s}\delta M-\frac Qs\delta Q\right)\\
&=\delta M-\frac Q{r_+}\delta Q.
\end{aligned}
$$

最後の係数が[地平線電位](#def-bht4-horizon-potential)なので、移項すれば第一法則です。$s=0$ ではこの導出の途中式を使えません。
<!-- solution-end -->

<a id="ex-bht4-b03"></a>

#### BHT4-B03 電荷固定の面積感度

- Level: B

$M=5L,Q=3L$ の非極限RN解で $Q$ を固定して $M$ を変える。$\left(\partial A/\partial M\right)_Q$ を $r_+$ の直接微分と第一法則の二通りで求め、値を比較せよ。

<!-- solution-start -->
**詳細解答。** $s=4L,r_+=9L$ です。固定 $Q$ なら[根の微分式](#prop-bht4-mq-check)から $\left(\partial r_+/\partial M\right)_Q=r_+/s=9/4$。よって

$$
\left(\frac{\partial A}{\partial M}\right)_Q
=8\pi r_+\left(\frac{\partial r_+}{\partial M}\right)_Q
=8\pi(9L)\frac94=162\pi L.
$$

もう一方では $\delta Q=0$ として[第一法則](#thm-bht4-rn-first-law)を解くと、非極限で $\kappa>0$ だから

$$
\left(\frac{\partial A}{\partial M}\right)_Q
=\frac{8\pi}{\kappa}
=\frac{8\pi}{4/(81L)}=162\pi L.
$$

両者は一致します。面積の微分の次元は $L$ で、結果の単位も整合しています。
<!-- solution-end -->

<a id="ex-bht4-b04"></a>

#### BHT4-B04 極限へ近づくときの平方根

- Level: B

$M>0$ を固定し $Q=M-\varepsilon$、$0<\varepsilon<M$ とする。$\varepsilon\downarrow0$ で $s=\sqrt{M^2-Q^2}$、$\kappa$、$\left(\partial r_+/\partial Q\right)_M$ の主要な振る舞いを求め、極限点で非極限の全微分式をそのまま適用できるか検討せよ。

<!-- solution-start -->
**詳細解答。** まず

$$
s^2=M^2-(M-\varepsilon)^2=2M\varepsilon-\varepsilon^2,
\qquad
\frac{s}{\sqrt{2M\varepsilon}}=\sqrt{1-\frac\varepsilon{2M}}\to1.
$$

したがって $s\sim\sqrt{2M\varepsilon}$、$r_+=M+s\to M$ です。[状態データ](#prop-bht4-rn-data)から

$$
\kappa=\frac s{r_+^2}\sim\frac{\sqrt{2M\varepsilon}}{M^2}\to0.
$$

一方、[根の偏微分](#prop-bht4-mq-check)は

$$
\left(\frac{\partial r_+}{\partial Q}\right)_M
=-\frac Qs
=-\frac{M-\varepsilon}{\sqrt{2M\varepsilon-\varepsilon^2}}
\sim-\sqrt{\frac{M}{2\varepsilon}}\to-\infty.
$$

極限点 $|Q|=M$ は二変数の開領域 $M>|Q|$ の境界です。そこで $s$ を分母に持つ微分を代入することはできません。$\kappa\to0$ と $\partial_Qr_+\to-\infty$ の積は、内点で相殺してから極限を取らなければ意味を確定できません。
<!-- solution-end -->

### Level C：条件・符号・全微分をまとめて検算する

<a id="ex-bht4-c01"></a>

#### BHT4-C01 二方向の変化と面積定理の境界

- Level: C

$M=5L,Q=3L$ の非極限RN時空で、定常解族の接方向を $\delta M=aL,\ \delta Q=bL$（$a,b\in\mathbb R$）とする。

1. $\delta r_+,\delta A$ を $a,b$ で表せ。
2. 面積項と電荷項を別々に求め、その和が $\delta M$ に一致することを確認せよ。
3. $a=0,b>0$ および $\delta A=0,b>0$ の各方向で面積・質量の符号を比較せよ。
4. $a=0,b>0$ で面積が減ることが[GR36の古典面積定理](../../GR/GR36/index.md#thm-gr36-smooth-area)の反例ではない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $s=4L,r_+=9L$ なので、[質量・電荷座標での変分式](#prop-bht4-mq-check)に $\delta M=aL,\delta Q=bL$ を代入します。

**（1）** 半径の変化は

$$
\delta r_+=\frac{9L}{4L}aL-\frac{3L}{4L}bL
=\left(\frac94a-\frac34b\right)L.
$$

これに $\delta A=8\pi r_+\delta r_+$ を適用して

$$
\delta A=8\pi(9L)\left(\frac94a-\frac34b\right)L
=(162\pi a-54\pi b)L^2.
$$

**（2）** $\kappa=4/(81L)$、$\Phi_H=1/3$ であり、

$$
\begin{aligned}
\frac\kappa{8\pi}\delta A
&=\frac{4/(81L)}{8\pi}(162\pi a-54\pi b)L^2
=(a-b/3)L,\\
\Phi_H\delta Q&=\frac13 bL.
\end{aligned}
$$

和は $aL=\delta M$ です。

**（3）** $a=0,b>0$ なら $\delta A=-54\pi bL^2<0$、$\delta M=0$ です。固定面積なら $162a-54b=0$ から $a=b/3>0$ で、$\delta M=bL/3>0$、$\delta A=0$。固定質量と固定面積は別の方向です。

**（4）** この $\delta$ は、定常なRN解をパラメータ空間で取り替える接方向です。[GR36の古典的地平線面積の非減少](../../GR/GR36/index.md#thm-gr36-smooth-area)は、エネルギー・因果・未来完備性等の仮定を満たす**同じ非定常時空の地平線上の二切断**を比較する主張です。ここではそのような時空も物質流束も構成しておらず、面積定理の仮定を満たす過程を示していません。従って反例ではありません。
<!-- solution-end -->

## 7. 次の講義へ

非回転の定常解族では、面積を変える寄与と電荷を変える寄与を分けることで第一法則が閉じました。次のBHT5では回転するKerr解族を扱い、地平線の角速度と角運動量の項 $\Omega_H\delta J$ を追加します。その際は、定常時空の地平線生成Killing場が一般に無限遠の純粋な時間並進とは一致しないことが新しい論点になります。
