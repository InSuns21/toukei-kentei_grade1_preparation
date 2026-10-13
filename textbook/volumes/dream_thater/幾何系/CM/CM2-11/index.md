# CM2-11 Chern曲率の計算と正則束の総合演習

<!-- definition-example-audit: strict -->

## 1. 接続を二回使うと何が残るか

[前章のChern接続](../CM2-10/index.md#thm-cm2-10-chern-existence-uniqueness)は、正則局所枠で $A=H^{-1}\partial H$ と一意に書けた。しかし接続行列が零でないことと、束が「曲がっている」ことは同じではない。例えば $H=e^{z+\bar z}$ なら $A=dz$ だが、正則枠を $e'=e\,e^{-z}$ と変えると接続行列は $A'=0$ になる。枠に依存する $A$ の値だけでは、幾何学的な障害を捉えられない。

そこで、接続を二回作用させて得る **曲率**を考える。通常の外微分は $d^2=0$ であるのに対し、接続の二回作用は一般に零ではない。この差は、枠を変えても共役で移り変わる行列値2形式になる。本章では、局所計算から射影直線上の $\mathcal O(k)$ の積分までを一続きに扱う。

以下、$X$ は複素次元 $n\ge1$ の複素多様体、$(E,h)$ は階数 $r\ge1$ の正則Hermite束、$D$ はそのChern接続とする。計量は**第一変数で共役線形**であり、正則枠 $\mathcal E$ の係数は列ベクトルで書く。局所接続行列と型別微分は

$$
A=H^{-1}\partial H,\qquad D(\mathcal Ev)=\mathcal E(dv+Av),
\qquad d=\partial+\bar\partial
$$

である。$A$ は $(1,0)$ 型の行列値1形式である。行列値形式の積では、**行列積と外積を同時に行い、順序を保つ**。

## 2. 曲率は接続の二回作用である

切断 $s$ に接続を施すと $E$ 値1形式になるので、二回目の作用には拡張が必要である。局所的に $E$ 値 $k$ 形式を $\mathcal E\omega$（$\omega$ は列状の $k$ 形式）と書き、次の規則を使う。

<a id="def-cm2-11-curvature"></a>

<!-- formal-statement-start -->
> **定義（接続の曲率）**  
> 滑らかな複素ベクトル束 $E\to X$ と接続 $D$ に対し、$E$ 値 $k$ 形式上への拡張を、局所枠 $\mathcal E$ と行列値1形式 $A$ を用いて

$$
D(\mathcal E\omega)=\mathcal E(d\omega+A\wedge\omega)
$$

> と定める。ここで $\omega$ の各成分は次数 $k$ の形式である。接続の曲率 $F_D$ とは、切断 $s$ に対する二回作用

$$
F_Ds=D(Ds)
$$

> を表す $\operatorname{End}(E)$ 値2形式をいう。局所枠の曲率行列を $F$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-11-curvature -->
**定義の確認**。自明線束 $\mathbb C\times\mathbb C$ で $A=\bar z\,dz$ とすると、$s=fe$ について

$$
Ds=e(df+\bar zf\,dz).
$$

再び作用させ、$d^2f=0$、$dz\wedge dz=0$ を利用すると

$$
\begin{aligned}
D^2(fe)
&=e\{d(\bar zf\,dz)+\bar z\,dz\wedge df\}\\
&=e\{(f\,d\bar z+\bar z\,df)\wedge dz+\bar z\,dz\wedge df\}\\
&=e\,f\,d\bar z\wedge dz.
\end{aligned}
$$

最後の二つの項は $df\wedge dz=-dz\wedge df$ により打ち消し合う。結果は $f$ の導関数に依存せず、**繊維ごとの線形作用**になっている。
<!-- definition-example-end -->

<a id="prop-cm2-11-curvature-local"></a>

<!-- formal-statement-start -->
> **命題（曲率行列と枠変更則）**  
> $E\to X$ の接続が局所枠 $\mathcal E_i$ で $A_i$ と表示されるとき、その曲率は

$$
F_i=dA_i+A_i\wedge A_i
$$

> である。別の局所枠 $\mathcal E_j=\mathcal E_iG_{ij}$ においては

$$
F_j=G_{ij}^{-1}F_iG_{ij}.
$$

> 特に階数一では $F_j=F_i$ となり、曲率は枠によらない大域的な複素2形式である。
<!-- formal-statement-end -->

### 証明の見取り図

接続の二回作用から $dv$ を含む項を全て相殺する。その結果、曲率は $C^\infty$ 線形な作用として得られる。枠変更時は接続そのものが同じ演算子であることを利用して、共役変換を導く。

<!-- proof-start -->
### 証明

$\omega=dv+Av$ に拡張を適用する。$A$ は1形式なので[外微分の次数付き Leibniz 則](../../GEO/GEO7/index.md#thm-geo7-graded-leibniz)から

$$
\begin{aligned}
D^2(\mathcal Ev)
&=\mathcal E\{d(dv+Av)+A\wedge(dv+Av)\}\\
&=\mathcal E\{(dA)v-A\wedge dv+A\wedge dv
+(A\wedge A)v\}\\
&=\mathcal E(dA+A\wedge A)v.
\end{aligned}
$$

したがって主張の第一式が成立し、$D^2(f s)=fD^2s$ である。

重なり上で $v_i=G_{ij}v_j$ だから

$$
D^2s=\mathcal E_iF_iv_i
=\mathcal E_iF_iG_{ij}v_j
=\mathcal E_j(G_{ij}^{-1}F_iG_{ij})v_j.
$$

一方 $j$ 枠では $D^2s=\mathcal E_jF_jv_j$ である。任意の $v_j$ で一致するから共役変換則を得る。階数一なら関数 $g$ と2形式 $F_i$ は可換で、$g^{-1}F_ig=F_i$。$\square$
<!-- proof-end -->

これは[接続行列の枠変更則](../CM2-10/index.md#prop-cm2-10-connection-gauge)に現れる $G^{-1}dG$ とは対照的である。曲率には**微分を含む余計な項が残らない**。高階数では個々の行列要素は変わるが、$\operatorname{tr}F$ は不変である。

## 3. Chern曲率は $(1,1)$ 型だけになる

一般の接続には $(2,0)$、$(1,1)$、$(0,2)$ 成分がある。しかしChern接続には正則構造と計量という二つの条件があり、$(2,0)$ と $(0,2)$ の成分が消える。特に、単に $\partial A$ を計算して零でないという理由で「$(2,0)$ 曲率がある」と判断してはいけない。非可換な行列積 $A\wedge A$ が相殺する。

<a id="thm-cm2-11-chern-type"></a>

<!-- formal-statement-start -->
> **定理（Chern曲率の型と局所公式）**  
> $(E,h)$ を複素多様体 $X$ 上の正則Hermite束とし、$D$ をそのChern接続とする。正則局所枠で計量行列を $H$、接続行列を $A=H^{-1}\partial H$ と書けば、曲率は $(1,1)$ 型であり、

$$
F_D=\bar\partial(H^{-1}\partial H).
$$

> すなわち $(2,0)$ 成分 $F_D^{2,0}$ と $(0,2)$ 成分 $F_D^{0,2}$ は零である。この公式では $\bar\partial$ が先に形式の左側へ現れる外積の順序を採用する。
<!-- formal-statement-end -->

### 証明の見取り図

$A$ が $(1,0)$ 型なので $dA=\partial A+\bar\partial A$ となる。$(2,0)$ 型の部分について逆行列の微分と $\partial^2=0$ を使い、$\partial A=-A\wedge A$ を直接導く。

<!-- proof-start -->
### 証明

[型別外微分の三つの恒等式](../CM2-02/index.md#thm-cm2-02-double-complex-identities)により $\partial^2H=0$ である。また $HH^{-1}=I$ に $\partial$ を施すと

$$
(\partial H)H^{-1}+H\,\partial(H^{-1})=0.
$$

左から $H^{-1}$ を掛けると

$$
\partial(H^{-1})=-H^{-1}(\partial H)H^{-1}.
$$

$H^{-1}$ は0形式なので、行列値形式の積の法則で

$$
\begin{aligned}
\partial A
&=\partial(H^{-1}\partial H)\\
&=\partial(H^{-1})\wedge\partial H
+H^{-1}\partial^2H\\
&=-H^{-1}(\partial H)H^{-1}\wedge\partial H\\
&=-(H^{-1}\partial H)\wedge(H^{-1}\partial H)\\
&=-A\wedge A.
\end{aligned}
$$

従って[曲率行列と枠変更則](#prop-cm2-11-curvature-local)から

$$
\begin{aligned}
F_D
&=(\partial A+\bar\partial A)+A\wedge A\\
&=\bar\partial A
=\bar\partial(H^{-1}\partial H).
\end{aligned}
$$

右辺は $(0,1)$ 型の微分を $(1,0)$ 型の形式へ作用させるので $(1,1)$ 型である。$\square$
<!-- proof-end -->

**符号の確認**。$d\bar z\wedge dz=-dz\wedge d\bar z$ である。例えば正則線束なら $A=\partial\log h$ であるから

$$
F=\bar\partial\partial\log h
=-\partial\bar\partial\log h.
$$

文献によっては $-\bar\partial(H^{-1}\partial H)$ や $iF$ を曲率と呼ぶ約束もある。以下は一貫して **$F_D=D^2$** を採用する。外積の順序と後に導入する規格化係数をセットで固定すれば、符号の取り違えを防げる。

## 4. 行列計量、正則な枠、平坦性を比較する

まず線束の最小例として $h=e^{a|z|^2}$（$a\in\mathbb R$）を考えよう。計量は任意の実数 $a$ に対して正であり、

$$
A=\partial(a z\bar z)=a\bar z\,dz,\qquad
F=a\,d\bar z\wedge dz=-a\,dz\wedge d\bar z.
$$

$a=0$ のとき曲率は零になる。一方 $h=e^{z+\bar z}$ では $A=dz$ だが $\bar\partial dz=0$ なので $F=0$ である。**接続形式が非零でも曲率は零になり得る**。

階数二の正値Hermite行列

$$
H=\begin{pmatrix}e^{|z|^2}&0\\0&e^{2|z|^2}\end{pmatrix}
$$

に対しては

$$
A=\begin{pmatrix}\bar z&0\\0&2\bar z\end{pmatrix}dz,
\qquad
F=\begin{pmatrix}1&0\\0&2\end{pmatrix}d\bar z\wedge dz.
$$

この例では $A\wedge A=0$ だが、一般の非対角行列では各行列要素が非可換に積を作るため、$A\wedge A$ を初めから零としてはならない。

もう一つ重要な極端な例がある。$\mathbb C$ 上の正則可逆行列 $B(z)$ に対し $H=B^*B$ と置くと

$$
\begin{aligned}
A&=(B^*B)^{-1}\partial(B^*B)
=B^{-1}(B^*)^{-1}B^*\partial B\\
&=B^{-1}\partial B.
\end{aligned}
$$

ここで $\partial B^*=0$ を使った。$B^{-1}$ と $\partial B$ はどちらも正則な係数を持つので $\bar\partial A=0$、従って $F=0$。例えば $B=\begin{pmatrix}1&0\\z&1\end{pmatrix}$ なら $A=\begin{pmatrix}0&0\\dz&0\end{pmatrix}\ne0$ である。局所的な枠や計量の見かけではなく、**二回微分で残る量**を使う理由がここにある。

## 5. 束の演算で曲率はどう振る舞うか

[双対・テンソル積・行列式束の接続](../CM2-10/index.md#prop-cm2-10-induced-connections)を曲率へ適用すると、正則束の複数の操作を一度に計算できる。とくに行列式束で曲率がトレースになることが、後の大域的な曲率不変量へつながる。

<a id="prop-cm2-11-induced-curvature"></a>

<!-- formal-statement-start -->
> **命題（双対・テンソル積・行列式束の曲率）**  
> 正則Hermite束 $E,F$ のChern曲率を $F_E,F_F$ とする。各誘導計量を与えた正則双対束、テンソル積束、行列式束の曲率は、対応する正則局所枠で

$$
\begin{aligned}
F_{E^\vee}&=-F_E^{\mathsf T},\\
F_{E\otimes F}&=F_E\otimes I_{\operatorname{rank}F}
+I_{\operatorname{rank}E}\otimes F_F,\\
F_{\det E}&=\operatorname{tr}(F_E).
\end{aligned}
$$

> となる。$\mathsf T$ は共役を伴わない転置であり、外積の符号を含めて上記の式が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

接続形式は双対で負の転置、テンソル積でKronecker和、行列式でトレースになる。ただし曲率では $A\wedge A$ が加わるため、転置や交差項の符号を明示的に確かめる必要がある。

<!-- proof-start -->
### 証明

**双対**。元の束の局所接続形式を $A$ とすると双対では $B=-A^{\mathsf T}$。2形式を計算する前に、1形式の外積では転置の積順序に加えて反交換符号が入ることを確かめる。成分ごとに

$$
\begin{aligned}
(B\wedge B)_{ij}
&=\sum_k(-A_{ki})\wedge(-A_{jk})\\
&=\sum_k A_{ki}\wedge A_{jk}
=-\sum_k A_{jk}\wedge A_{ki}\\
&=-(A\wedge A)_{ji}.
\end{aligned}
$$

ゆえに $dB+B\wedge B=-(dA+A\wedge A)^{\mathsf T}$ となる。

**テンソル積**。$B=A_E\otimes I+I\otimes A_F$ と書く。微分では $dB=dA_E\otimes I+I\otimes dA_F$。外積の交差項は

$$
(A_E\otimes I)\wedge(I\otimes A_F)
+(I\otimes A_F)\wedge(A_E\otimes I)=0
$$

である。異なる因子に作用する行列は可換で、1形式だけが反交換するためである。残る二つの平方項がそれぞれ $A_E\wedge A_E$ と $A_F\wedge A_F$ になり、主張を得る。

**行列式**。接続形式は $a=\operatorname{tr}A_E$ というスカラー1形式なので $a\wedge a=0$。従って

$$
F_{\det E}=da=d(\operatorname{tr}A_E).
$$

一方

$$
\operatorname{tr}(A_E\wedge A_E)
=\sum_{i,j}(A_E)_{ij}\wedge(A_E)_{ji}=0.
$$

$i=j$ の項は同じ1形式の外積で零、$i\ne j$ の二項は入れ替えると符号が反転して相殺する。したがって $d\,\operatorname{tr}A_E=\operatorname{tr}(dA_E+A_E\wedge A_E)=\operatorname{tr}F_E$。$\square$
<!-- proof-end -->

## 6. 第一Chern形式はなぜ大域的か

高階数の曲率行列は枠で共役変換するが、そのトレースは変わらない。[曲率の枠変更則](#prop-cm2-11-curvature-local)から、巡回性を用いて

$$
\operatorname{tr}(G^{-1}FG)
=\operatorname{tr}(FGG^{-1})
=\operatorname{tr}F
$$

となる。これを規格化して得る2形式を考える。

<a id="def-cm2-11-first-chern-form"></a>

<!-- formal-statement-start -->
> **定義（第一Chern形式）**  
> 正則Hermite束 $(E,h)$ のChern曲率 $F_D$ に対し、第一Chern形式を次の大域的2形式として定める。

$$
c_1(E,h)=\frac{i}{2\pi}\operatorname{tr}(F_D).
$$

> ここで $i^2=-1$ である。この定義は曲率の符号規約 $F_D=D^2$ に対応する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-11-first-chern-form -->
**定義の確認**。自明正則線束で $h=e^{a|z|^2}$ なら、先ほどの計算から

$$
c_1(E,h)=\frac{i}{2\pi}(-a\,dz\wedge d\bar z)
=-\frac{a}{\pi}\,dx\wedge dy
$$

となる。$dz\wedge d\bar z=-2i\,dx\wedge dy$ を使用した。この形式は実係数の2形式である。計量により局所値は変わり得るが、どの枠を使っても同じ形式を得る。
<!-- definition-example-end -->

<a id="prop-cm2-11-chern-closed"></a>

<!-- formal-statement-start -->
> **命題（第一Chern形式の閉性と計量変更）**  
> 任意の正則Hermite束 $(E,h)$ に対し $dc_1(E,h)=0$ である。さらに同じ正則束上の二つの滑らかな正値Hermite計量の行列を同一の正則枠で $H_0,H_1$ と書けば

$$
c_1(E,h_1)-c_1(E,h_0)
=\frac{i}{2\pi}\bar\partial\partial
\log\frac{\det H_1}{\det H_0}.
$$

> 右辺は大域的に定義された実数値関数の二回微分であり、したがって差は完全2形式である。
<!-- formal-statement-end -->

### 証明の見取り図

局所公式のトレースを $\log\det H$ の微分に直せば、閉性と計量変更は $\partial^2=\bar\partial^2=\partial\bar\partial+\bar\partial\partial=0$ へ帰着する。比の行列式が枠の取り換えで不変であることも確かめる。

<!-- proof-start -->
### 証明

正値行列 $H$ の[双対・テンソル積・行列式束のChern接続](../CM2-10/index.md#prop-cm2-10-induced-connections)より、各正則枠で

$$
\operatorname{tr}A=\partial\log\det H.
$$

[双対・テンソル積・行列式束の曲率](#prop-cm2-11-induced-curvature)と組み合わせて

$$
\operatorname{tr}F
=\bar\partial\operatorname{tr}A
=\bar\partial\partial\log\det H.
$$

$d=\partial+\bar\partial$ を作用させると

$$
\begin{aligned}
d\,\operatorname{tr}F
&=(\partial+\bar\partial)\bar\partial\partial\log\det H\\
&=-\bar\partial\partial^2\log\det H
+\bar\partial^2\partial\log\det H=0.
\end{aligned}
$$

ここで両微分の二乗が零であることを使った。ゆえに $dc_1(E,h)=0$。

次に同じ正則枠で二つの行列式計量の式を差し引けば主張の等式を得る。枠を $\mathcal E'=\mathcal EG$ に変えたとき、[計量行列の枠変更則](../CM2-09/index.md#prop-cm2-09-frame-transform)より

$$
\det H_\nu'=|\det G|^2\det H_\nu\qquad(\nu=0,1).
$$

従って $\det H_1'/\det H_0'=\det H_1/\det H_0$。対数比 $u$ は大域的な実関数であり、

$$
\bar\partial\partial u=d(\partial u)
$$

は完全2形式である。$\square$
<!-- proof-end -->

ここで証明したのは**閉性と計量変更時の完全性**である。一般のコンパクト複素多様体上で、この積分が常に整数になることまでは本章の局所計算だけでは主張しない。次節では $\mathbb{CP}^1$ という具体的な空間に限定して直接積分する。

## 7. $\mathbb{CP}^1$ の $\mathcal O(k)$ を二チャートで測る

[標準線束 $\mathcal O(-1)$](../CM2-06/index.md#thm-cm2-06-tautological-nontrivial)と[双対束](../CM2-08/index.md#def-cm2-08-dual-bundle)と[テンソル積束](../CM2-08/index.md#def-cm2-08-tensor-bundle)から、整数 $k$ に対して $\mathcal O(k)$ を構成できる。$U_0$ 上の座標を $z$、$U_\infty$ 上の座標を $w=1/z$ とし、正則枠を $e_\infty=z^k e_0$ と取る。$\mathcal O(-1)$ で $e_\infty=z^{-1}e_0$ となる約束と一致する。

これらの局所枠に、正の計量関数

$$
h_0=(1+|z|^2)^{-k},\qquad
h_\infty=(1+|w|^2)^{-k}
$$

を与える。重なりで $|e_\infty|^2=|z|^{2k}|e_0|^2$ となるため、$h_\infty=|z|^{2k}h_0$ は実際に成立する。したがって一つの滑らかなHermite計量が定まる。

<a id="thm-cm2-11-projective-line"></a>

<!-- formal-statement-start -->
> **定理（射影直線上のO(k)の曲率積分）**  
> 任意の整数 $k$ について、上記の計量を与えた $\mathbb{CP}^1$ 上の正則線束 $\mathcal O(k)$ のChern曲率は、$U_0$ 上で

$$
F_k=\frac{k}{(1+|z|^2)^2}\,dz\wedge d\bar z
$$

> と表示される。複素向きで $\mathbb{CP}^1$ を積分すると、

$$
\int_{\mathbb{CP}^1}\frac{i}{2\pi}F_k=k.
$$

> 特に $\mathcal O(1)$ と $\mathcal O(-1)$ の積分値はそれぞれ $1$ と $-1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$\log h_0=-k\log(1+z\bar z)$ を二回微分し、曲率を得る。$z$ と $w$ の重なりでも同じ2形式になっていることを検算し、最後に $\mathbb C$ の極座標積分へ帰着する。無限遠点は滑らかな2形式の積分に影響しない。

<!-- proof-start -->
### 証明

まず

$$
A_0=\partial\log h_0
=-k\frac{\bar z}{1+z\bar z}\,dz.
$$

係数を $\bar z$ で微分すると

$$
\frac{\partial}{\partial\bar z}
\left(\frac{\bar z}{1+z\bar z}\right)
=\frac{(1+z\bar z)-\bar z z}{(1+z\bar z)^2}
=\frac{1}{(1+|z|^2)^2}.
$$

よって[Chern曲率の型と局所公式](#thm-cm2-11-chern-type)から

$$
\begin{aligned}
F_k
&=\bar\partial A_0
=-\frac{k}{(1+|z|^2)^2}\,d\bar z\wedge dz\\
&=\frac{k}{(1+|z|^2)^2}\,dz\wedge d\bar z.
\end{aligned}
$$

**重なりの確認**。$e_\infty=z^k e_0$ だから[線束の接続変換則](../CM2-10/index.md#prop-cm2-10-line-formula)で

$$
\begin{aligned}
A_\infty&=A_0+\frac{k}{z}\,dz\\
&=k\left(\frac1z-\frac{\bar z}{1+|z|^2}\right)dz
=\frac{k}{z(1+|z|^2)}\,dz.
\end{aligned}
$$

一方 $w=1/z$、$dw=-z^{-2}dz$ だから

$$
-k\frac{\bar w}{1+|w|^2}\,dw
=-k\frac{1/\bar z}{1+1/|z|^2}(-z^{-2}dz)
=\frac{k}{z(1+|z|^2)}\,dz.
$$

二つの枠から得た接続は一致しており、従って曲率も貼り合わさる。

**積分**。$z=x+iy$ では $dz\wedge d\bar z=-2i\,dx\wedge dy$。従って

$$
\frac{i}{2\pi}F_k
=\frac{k}{\pi(1+x^2+y^2)^2}\,dx\wedge dy.
$$

$\mathbb{CP}^1$ から無限遠の一点を除くと $\mathbb C$ に一致する。滑らかな2形式の積分で一点は測度零なので、極座標 $(r,\theta)$ を用い

$$
\begin{aligned}
\int_{\mathbb{CP}^1}\frac{i}{2\pi}F_k
&=\frac{k}{\pi}\int_0^{2\pi}\int_0^\infty
\frac{r}{(1+r^2)^2}\,dr\,d\theta\\
&=2k\int_0^\infty \frac{r}{(1+r^2)^2}\,dr\\
&=k\left[-\frac{1}{1+r^2}\right]_{0}^{\infty}=k.
\end{aligned}
$$

積分は絶対収束する。$\square$
<!-- proof-end -->

線束の大域的情報が局所曲率の積分値として現れた。例えば自明線束なら大域正則枠で計量を与えられ、閉曲面上の第一Chern形式は完全形式だから積分は零となる。したがって $\mathcal O(1)$ や $\mathcal O(-1)$ の積分値が非零であることは、これらが自明な正則線束でないことの別の証拠となる。

## 8. 総合演習：式の符号と大域の情報を結びつける

各問の曲率は $F_D=D^2$ という規約に従う。$\mathbb C$ 上では $z=x+iy$、正則枠でのChern接続を考える。大域計算に入る前に、局所枠が正則か、計量が正値か、外積をどの順番に置くかを確認しよう。

### Level A

<a id="ex-cm2-11-a01"></a>
#### CM2-11-A01 接続を二回作用させる
- Level: A

自明正則線束の標準枠 $e$ において $A=\bar z\,dz$ とし、$f=z^2$ に対して $D^2(fe)$ を定義から計算せよ。

<!-- solution-start -->
**詳細解答**。$df=2z\,dz$ であり、

$$
D(fe)=e(2z\,dz+z^2\bar z\,dz)
=e(2z+z^2\bar z)\,dz.
$$

これに再び接続を作用させると

$$
\begin{aligned}
D^2(fe)
&=e\{d((2z+z^2\bar z)dz)+\bar z\,dz\wedge(2z+z^2\bar z)dz\}\\
&=e\{(2+2z\bar z)dz+z^2d\bar z\}\wedge dz\\
&=e\,z^2d\bar z\wedge dz.
\end{aligned}
$$

最後の行では $dz\wedge dz=0$ を使った。よって $D^2(fe)=F(fe)$ で、$F=d\bar z\wedge dz$ と一致する。
<!-- solution-end -->

<a id="ex-cm2-11-a02"></a>
#### CM2-11-A02 線束の曲率と符号を確かめる
- Level: A

計量 $h(e,e)=e^{3|z|^2}$ の自明正則線束について $A$、$F$ と第一Chern形式を求め、実座標の符号まで示せ。

<!-- solution-start -->
**詳細解答**。$\log h=3z\bar z$ だから

$$
A=3\bar z\,dz,\qquad
F=\bar\partial A=3d\bar z\wedge dz
=-3dz\wedge d\bar z.
$$

$dz\wedge d\bar z=-2i\,dx\wedge dy$ を代入すると

$$
c_1=\frac{i}{2\pi}(-3)(-2i)\,dx\wedge dy
=-\frac3\pi\,dx\wedge dy.
$$

$i^2=-1$ の符号まで追うことが必要である。
<!-- solution-end -->

<a id="ex-cm2-11-a03"></a>
#### CM2-11-A03 接続形式が非零で曲率が零の例
- Level: A

自明正則線束に計量 $h=e^{z+\bar z}$ を与える。$A,F$ を求め、正則枠変更 $e'=ee^{-z}$ によって $A'=0$ になることを検算せよ。

<!-- solution-start -->
**詳細解答**。$\log h=z+\bar z$ から $A=dz$。$d(dz)=0$ かつ線束では $A\wedge A=0$ なので $F=0$。枠変更 $g=e^{-z}$ は非零正則であり、[枠変更則](../CM2-10/index.md#prop-cm2-10-line-formula)より

$$
A'=A+g^{-1}dg=dz-e^ze^{-z}dz=0.
$$

非零の接続形式と曲率の非零性は別の条件である。
<!-- solution-end -->

<a id="ex-cm2-11-a04"></a>
#### CM2-11-A04 対角行列計量の曲率
- Level: A

自明階数二の正則束で $H=\operatorname{diag}(e^{|z|^2},e^{4|z|^2})$ とする。$A,F,\operatorname{tr}F$ を求めよ。

<!-- solution-start -->
**詳細解答**。成分ごとに計算すると

$$
A=\operatorname{diag}(\bar z,4\bar z)\,dz.
$$

$A$ の全項が $dz$ の倍数なので $A\wedge A=0$。また

$$
F=dA=\operatorname{diag}(1,4)\,d\bar z\wedge dz,
\qquad
\operatorname{tr}F=5\,d\bar z\wedge dz.
$$

[双対・テンソル積・行列式束の曲率](#prop-cm2-11-induced-curvature)から、行列式束の曲率も同じトレースとなる。
<!-- solution-end -->

<a id="ex-cm2-11-a05"></a>
#### CM2-11-A05 重なりでの曲率不変性
- Level: A

$\mathbb C^\times$ 上の自明線束の計量 $h=e^{|z|^2}$ を標準枠 $e_0$ で与え、$e_1=z e_0$ とする。$A_0,A_1,F_0,F_1$ を求め、両枠で同じ曲率になることを示せ。

<!-- solution-start -->
**詳細解答**。$A_0=\bar z\,dz$、$F_0=d\bar z\wedge dz$ である。$g=z$ は $\mathbb C^\times$ で非零正則だから

$$
h_1=|z|^2e^{|z|^2},\qquad
A_1=\partial\log h_1
=\bar z\,dz+\frac{dz}{z}.
$$

ここで $\bar\partial(z^{-1})=0$ なので

$$
F_1=\bar\partial A_1
=d\bar z\wedge dz+\bar\partial(z^{-1})\wedge dz
=F_0.
$$

これは[曲率の枠変更則](#prop-cm2-11-curvature-local)の階数一の場合である。
<!-- solution-end -->

### Level B

<a id="ex-cm2-11-b01"></a>
#### CM2-11-B01 $\mathcal O(-1)$ とその双対の曲率
- Level: B

射影直線上の $\mathcal O(-1)$ で、$U_0$ の正則枠の計量を $h=1+|z|^2$ とする。曲率と第一Chern形式の積分値を求め、双対束 $\mathcal O(1)$ で符号が反転することを確かめよ。

<!-- solution-start -->
**詳細解答**。[正則線束のChern接続](../CM2-10/index.md#prop-cm2-10-line-formula)から

$$
A_{-1}=\frac{\bar z}{1+|z|^2}\,dz,\qquad
F_{-1}=\frac{1}{(1+|z|^2)^2}\,d\bar z\wedge dz
=-\frac{dz\wedge d\bar z}{(1+|z|^2)^2}.
$$

従って

$$
\frac{i}{2\pi}F_{-1}
=-\frac{dx\wedge dy}{\pi(1+|z|^2)^2}.
$$

極座標による積分は

$$
-\frac1\pi(2\pi)\int_0^\infty\frac{r}{(1+r^2)^2}\,dr
=-2\left[\frac{-1}{2(1+r^2)}\right]_0^\infty=-1.
$$

双対計量は $h^\vee=(1+|z|^2)^{-1}$。[双対曲率の公式](#prop-cm2-11-induced-curvature)より $F_1=-F_{-1}$、その積分は $1$ である。
<!-- solution-end -->

<a id="ex-cm2-11-b02"></a>
#### CM2-11-B02 双対・テンソル積・行列式を一度に求める
- Level: B

$\mathbb C$ 上で $L$ の計量を $e^{|z|^2}$、$M$ の計量を $e^{2|z|^2}$ とする。$L^\vee$、$L\otimes M$、$E=L\oplus M$ と $\det E$ のChern曲率を計算せよ。

<!-- solution-start -->
**詳細解答**。$F_L=d\bar z\wedge dz$、$F_M=2d\bar z\wedge dz$ である。双対計量は $e^{-|z|^2}$ なので

$$
F_{L^\vee}=-d\bar z\wedge dz.
$$

テンソル積計量は $e^{3|z|^2}$ であるため

$$
F_{L\otimes M}=3d\bar z\wedge dz=F_L+F_M.
$$

直和の標準枠で $H_E=\operatorname{diag}(e^{|z|^2},e^{2|z|^2})$ だから

$$
F_E=\operatorname{diag}(1,2)\,d\bar z\wedge dz.
$$

その行列式計量は $\det H_E=e^{3|z|^2}$。従って

$$
F_{\det E}=3d\bar z\wedge dz=\operatorname{tr}F_E.
$$

三つの公式とも[誘導束の曲率命題](#prop-cm2-11-induced-curvature)と一致する。
<!-- solution-end -->

<a id="ex-cm2-11-b03"></a>
#### CM2-11-B03 非対角枠でも曲率は共役で変わる
- Level: B

$\mathbb C$ 上の正則階数二束で $H_0=\operatorname{diag}(e^{|z|^2},e^{2|z|^2})$、正則枠変更 $G=\begin{pmatrix}1&z\\0&1\end{pmatrix}$ を与える。新しい枠の曲率行列 $F_1$ を求め、$\operatorname{tr}F_1$ の不変性を確認せよ。

<!-- solution-start -->
**詳細解答**。初めの枠では

$$
F_0=\begin{pmatrix}1&0\\0&2\end{pmatrix}d\bar z\wedge dz.
$$

$G^{-1}=\begin{pmatrix}1&-z\\0&1\end{pmatrix}$ だから、[曲率の枠変更則](#prop-cm2-11-curvature-local)を用いて

$$
\begin{aligned}
F_1
&=G^{-1}F_0G\\
&=\begin{pmatrix}1&-z\\0&1\end{pmatrix}
\begin{pmatrix}1&0\\0&2\end{pmatrix}
\begin{pmatrix}1&z\\0&1\end{pmatrix}d\bar z\wedge dz\\
&=\begin{pmatrix}1&-z\\0&2\end{pmatrix}d\bar z\wedge dz.
\end{aligned}
$$

$F_1$ は対角とは限らないが、$\operatorname{tr}F_1=(1+2)d\bar z\wedge dz=\operatorname{tr}F_0$。曲率の固有値・トレースはこの枠変更で変わらない。
<!-- solution-end -->

<a id="ex-cm2-11-b04"></a>
#### CM2-11-B04 計量を変えても閉曲面の積分が変わらない
- Level: B

コンパクトで境界のない複素曲線 $X$ 上の同じ正則線束 $L$ に、二つの滑らかなHermite計量 $h_0,h_1$ を与える。$\int_Xc_1(L,h_0)=\int_Xc_1(L,h_1)$ を証明せよ。ただし滑らかな2形式に対する[一般 Stokes の定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を用いてよい。

<!-- solution-start -->
**詳細解答**。正則枠の変更 $e'=eg$ では $h_\nu'=|g|^2h_\nu$ である。従って

$$
u=\log(h_1/h_0)
$$

は枠に依存しない大域的な実関数となる。[計量変更の命題](#prop-cm2-11-chern-closed)を階数一に適用すると

$$
c_1(L,h_1)-c_1(L,h_0)
=\frac{i}{2\pi}\bar\partial\partial u
=d\left(\frac{i}{2\pi}\partial u\right).
$$

$X$ はコンパクトで境界が空なので、[一般 Stokes の定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)により右辺の積分は零。ゆえに二つの計量の第一Chern形式の積分値は等しい。なおこの等式は値が整数であるという一般定理を仮定していない。
<!-- solution-end -->

### Level C

<a id="ex-cm2-11-c01"></a>
#### CM2-11-C01 射影直線の $\mathcal O(k)$ を総合する
- Level: C

整数 $k$ と $\mathbb{CP}^1=U_0\cup U_\infty$ を取り、座標 $z$、$w=1/z$、線束の正則枠 $e_\infty=z^ke_0$ を使う。$(1)$ 計量 $h_0=(1+|z|^2)^{-k}$ と $h_\infty=(1+|w|^2)^{-k}$ が貼り合うこと、$(2)$ $A_0,A_\infty$ とその枠変更則、$(3)$ $F_k$ および第一Chern形式の積分値を導け。$(4)$ $k\ne0$ でこの線束に大域的な非零正則枠が存在しないことを示せ。

<!-- solution-start -->
**詳細解答**。

**$(1)$ 計量**。$|z|^{2k}h_0=|z|^{2k}(1+|z|^2)^{-k}$ とし、分子分母を $|z|^{2k}$ でまとめると

$$
|z|^{2k}h_0
=(1+|z|^{-2})^{-k}
=(1+|w|^2)^{-k}=h_\infty.
$$

これは $e_\infty=z^ke_0$ に必要なHermite計量の変換則である。両方とも正で滑らかだから、大域計量を定める。

**$(2)$ 接続**。$\partial\log h_0=-k\,\partial\log(1+z\bar z)$ なので

$$
A_0=-k\frac{\bar z}{1+|z|^2}dz.
$$

$e_\infty=e_0g$、$g=z^k$ は重なりで正則非零であり、$g^{-1}dg=k\,dz/z$。従って

$$
\begin{aligned}
A_0+\frac{k\,dz}{z}
&=k\left(\frac1z-\frac{\bar z}{1+|z|^2}\right)dz\\
&=\frac{k}{z(1+|z|^2)}dz.
\end{aligned}
$$

一方、$w=z^{-1}$、$dw=-z^{-2}dz$ を $A_\infty=-k\bar w\,dw/(1+|w|^2)$ に代入すると同じ式となる。これで両チャートで一つのChern接続を表すことが分かる。

**$(3)$ 曲率と積分**。$\bar\partial(\bar z/(1+z\bar z))=d\bar z/(1+|z|^2)^2$ だから

$$
F_k=\bar\partial A_0
=\frac{k}{(1+|z|^2)^2}dz\wedge d\bar z.
$$

$dz\wedge d\bar z=-2i\,dx\wedge dy$ に注意すると

$$
\begin{aligned}
\int_{\mathbb{CP}^1}c_1
&=\frac{k}{\pi}
\int_0^{2\pi}\int_0^\infty
\frac{r}{(1+r^2)^2}dr\,d\theta\\
&=2k\left[-\frac{1}{2(1+r^2)}\right]_0^\infty=k.
\end{aligned}
$$

**$(4)$ 非自明性**。もし大域非零正則枠 $e$ があれば、全域で正値関数 $h(e,e)$ が定まる。[正則線束のChern接続](../CM2-10/index.md#prop-cm2-10-line-formula)をこの正則枠へ適用すると

$$
F=d(\partial\log h(e,e)).
$$

ゆえに第一Chern形式も大域的な完全2形式である。コンパクトで境界のない $\mathbb{CP}^1$ に[一般 Stokes の定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を適用すると

$$
\int_{\mathbb{CP}^1}c_1=0.
$$

ところが $(3)$ の積分値は $k\ne0$ で非零。矛盾するので大域非零正則枠は存在しない。
<!-- solution-end -->

## 9. まとめと、この先の問い

本章で確定したのは、$(i)$ 曲率は $D^2$ という繊維線形な2形式であること、$(ii)$ Chern曲率は $(1,1)$ 型で $\bar\partial(H^{-1}\partial H)$ と計算できること、$(iii)$ 枠変更による共役のもとでトレースは不変であり、第一Chern形式は閉で、計量変更による差は完全形式であること、$(iv)$ $\mathbb{CP}^1$ の $\mathcal O(k)$ の積分値は $k$ となること、である。

一方、一般の複素多様体の全Chern類の構成、曲率の高次不変式、一般の整数量子化は本章の局所計算から直ちに導かれない。これらには特性類とコホモロジーの理論が別途必要になる。局所行列から大域不変量を作る第一歩として、まず今回の符号・型・貼り合わせを自分の手で再現できることが重要である。
