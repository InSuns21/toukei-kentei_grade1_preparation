# GBG24 Pontryagin・Euler型不変量をどう見分けるか

[前講の全Chern形式](../GBG23/index.md#def-gbg23-total-chern)は、複素ベクトル束の曲率を行列式に入れて作った。実ベクトル束にも同じ操作をそのまま適用するのだろうか。実束には複素化があり、一方で**向き**を指定した実束には、交代行列から向きの情報を取り出す別の道具がある。これらから生まれる二種類の形式は、次数も向きへの依存も異なる。

本講では、滑らかな多様体 $M$ 上の階数 $r$ の実ベクトル束 $E$ に正定値な滑らかな内積を入れ、その内積を保つ接続 $\nabla$ を固定する。向きが必要な場面ではそれを追加して宣言する。局所正規直交枠 $e_1,\ldots,e_r$ では、接続行列 $A$ と曲率行列 $R=dA+A\wedge A$ は実交代行列値である。実際、内積が一定の枠では

$$
0=d\langle e_a,e_b\rangle
=\langle\nabla e_a,e_b\rangle+\langle e_a,\nabla e_b\rangle
$$

だから $A_{ab}=-A_{ba}$、従って $R_{ab}=-R_{ba}$ となる。枠を直交行列 $g$ で替えると、[局所曲率の変換則](../GBG10/index.md#thm-gbg10-gauge-transform)により $R'=g^{-1}Rg$。以降の行列式・跡の積は、成分の**偶数次数の微分形式を外積**して計算する。

本講で到達する区別は次のとおりである。

| 代表形式 | 束への条件 | 形式の次数 | 向きの反転 |
| --- | --- | --- | --- |
| $p_k$（Pontryagin） | 計量を持つ実束と計量接続 | $4k$ | 不変 |
| $e$（Euler） | さらに向きを持つ偶数階実束 | 階数 $2m$ | 符号反転 |

ここで「特性類」とは代表形式の de Rham 類を指す場合と、整数係数の位相的類を指す場合がある。本講で直接証明するのは前者の閉性・接続非依存性である。

<!-- definition-example-audit: strict -->

## 1. 複素化から Pontryagin 形式を作る

実ベクトル空間の係数を複素数へ拡げて $E_{\mathbb C}=E\otimes_{\mathbb R}\mathbb C$ と書く。実正規直交枠は複素化後に Hermite 正規直交枠となる。したがって実交代曲率 $R$ を複素行列として見ると、$R^\dagger=R^T=-R$ を満たし、[前講の複素曲率の正規化](../GBG23/index.md#def-gbg23-total-chern)を適用できる。

ただし、実交代行列の特徴は $R^T=-R$ である。成分が可換な2形式であることを使うと

$$
\det\left(I_r+t\frac{iR}{2\pi}\right)
=\det\left(I_r-t\frac{iR}{2\pi}\right)
$$

となる。左辺を転置して行列式が不変なこと、および $R^T=-R$ を順に使った。**奇数次の $t$ の係数が零**になるので、複素化の Chern 形式の偶数番号だけが残る。

これらの偶数番号の係数に交互の符号を付け、新しい実束の不変量を定める。

<a id="def-gbg24-pontryagin"></a>

<!-- formal-statement-start -->
> **定義（Pontryagin 形式）**  
> 滑らかな多様体 $M$ 上の階数 $r$ の内積付き実ベクトル束 $E$ と計量接続 $\nabla$ の曲率を、正規直交枠で $R\in\Omega^2(U;\mathfrak{so}(r))$ と表す。複素化 $E_{\mathbb C}$ の Chern 形式に対し

$$
p_0(E,\nabla)=1,\qquad p_k(E,\nabla)=(-1)^k c_{2k}(E_{\mathbb C},\nabla_{\mathbb C})\quad(k\ge1)
$$

> と定める。$p_k$ は大域的な $4k$ 形式で、$2k>r$ のとき零である。形式的変数 $t$ を用いた同値な表式は

$$
\boxed{\det\left(I_r+t\frac{R}{2\pi}\right)
=\sum_{k\ge0}t^{2k}p_k(E,\nabla).}
$$

> 全 Pontryagin 形式を $p(E,\nabla)=\sum_k p_k(E,\nabla)$ と呼ぶ。向きの選択は必要としない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg24-pontryagin -->
**定義の確認**。$\mathbb R^4$ 上の自明な実階数4束を、二つの向き付き実平面の直和として表す。局所正規直交枠で、$\theta=x\,dy+z\,dw$ と置き、接続を

$$
A=2\pi\begin{pmatrix}
0&\theta&0&0\\-\theta&0&0&0\\
0&0&0&\theta\\0&0&-\theta&0
\end{pmatrix}
$$

と定める。各成分は実数値1形式、$A^T=-A$ なので計量接続であり、同じ1形式の積は $\theta\wedge\theta=0$ だから $A\wedge A=0$。$\alpha=d\theta=dx\wedge dy+dz\wedge dw$ とすると

$$
R=dA=2\pi\operatorname{diag}(J_+\,\alpha,J_+\,\alpha),
\qquad J_+=\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
$$

各 $2\times2$ ブロックは $I_2+tJ_+\alpha$ で行列式 $1+t^2\alpha^2$ を持つ。したがって全体の行列式は $(1+t^2\alpha^2)^2$、特に $p_1=2\alpha^2$ である。$\alpha^2=2\,dx\wedge dy\wedge dz\wedge dw$ は一般に零ではない。枠を直交変換すると $R$ は共役され、行列式は変わらない。次数は4で、向きも選んでいない。
<!-- definition-example-end -->

最初の係数には、前講の跡公式を直接使える。

<a id="prop-gbg24-first-pontryagin"></a>

<!-- formal-statement-start -->
> **命題（第一 Pontryagin 形式の跡公式）**  
> 階数 $r\ge2$ の内積付き実束の計量接続について、実交代曲率行列を $R=(R_{ab})$ とすると

$$
\boxed{p_1(E,\nabla)=-\frac{1}{8\pi^2}\operatorname{tr}(R\wedge R)
=\frac{1}{4\pi^2}\sum_{a<b}R_{ab}\wedge R_{ab}.}
$$

> この式は任意の局所正規直交枠で同じ大域的4形式を表す。
<!-- formal-statement-end -->

**証明の見取り図**。複素化では曲率の行列は $R$ のままであり、跡が零になるので第二 Chern 形式の跡公式に代入できる。最後に交代性を成分ごとに使う。

<!-- proof-start -->
### 証明

$R_{aa}=0$ より $\operatorname{tr}R=0$。[低次 Chern 形式の跡表示](../GBG23/index.md#prop-gbg23-low-chern)を複素化 $E_{\mathbb C}$ の曲率 $R$ に適用すると

$$
c_2(E_{\mathbb C})=\frac{1}{8\pi^2}
\left(\operatorname{tr}(R\wedge R)-(\operatorname{tr}R)^2\right)
=\frac{1}{8\pi^2}\operatorname{tr}(R\wedge R).
$$

定義で $p_1=-c_2$ だから第一の式を得る。一方、

$$
\begin{aligned}
\operatorname{tr}(R\wedge R)
&=\sum_{a,b}R_{ab}\wedge R_{ba}\\
&=-\sum_{a,b}R_{ab}\wedge R_{ab}
=-2\sum_{a<b}R_{ab}\wedge R_{ab}.
\end{aligned}
$$

二行目では $R_{ba}=-R_{ab}$、対角成分は零、$a<b$ と $b<a$ は同じ項を一度ずつ与えることを使った。これを第一の式へ代入すれば第二の式となる。直交枠の変更は $R'=g^{-1}Rg$ なので、跡と行列式の共役不変性によって大域的に貼り合わさる。
<!-- proof-end -->

この計算で **$p_1$ の係数は負の跡**であることが確定した。複素束の $c_2$ と符号を取り違えないようにしたい。

## 2. 交代行列から向きをどう取り出すか

Pontryagin 形式にはすべての直交変換で変わらない行列式を用いた。次は実交代行列に特有のもう一つの多項式を作る。

$2m$ 次の交代行列 $B=(B_{ab})$ の成分が可換な環の元であるとする。実束の曲率の場合は2形式同士が可換なので、この条件を満たす。$\mathfrak S_{2m}$ を $\{1,\ldots,2m\}$ の置換全体、$\operatorname{sgn}(\sigma)$ をその符号と書く。置換で番号を二つずつ組にして積を作り、同じ組合せの重複を割り戻す。次の定義式はその方法を正確に書いたものである。

<a id="def-gbg24-pfaffian"></a>

<!-- formal-statement-start -->
> **定義（Pfaffian）**  
> $2m$ 次の交代行列 $B$ の成分が互いに可換なとき

$$
\operatorname{Pf}(B)=
\frac{1}{2^m m!}\sum_{\sigma\in\mathfrak S_{2m}}
\operatorname{sgn}(\sigma)
B_{\sigma(1)\sigma(2)}\cdots B_{\sigma(2m-1)\sigma(2m)}
$$

> と定める。$m=1$ では $\operatorname{Pf}(B)=B_{12}$、$m=2$ では

$$
\operatorname{Pf}(B)=B_{12}B_{34}-B_{13}B_{24}+B_{14}B_{23}.
$$

> 積が微分形式の外積である場合も、偶数次数の成分に対して同じ式で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg24-pfaffian -->
**定義の確認**。$B=\operatorname{diag}(J_+a,J_+b)$（$a,b$ は可換な元）なら、$B_{12}=a$、$B_{34}=b$ 以外の $a<b$ 成分は零なので、直前の $m=2$ の展開式から $\operatorname{Pf}(B)=ab$ を得る。一方 $\det B=a^2b^2=\operatorname{Pf}(B)^2$。後の Euler 形式では $a,b$ に正規化した曲率2形式を代入する。
<!-- definition-example-end -->

Pfaffian の変換則が、向きの有無を分ける決定的な理由になる。

<a id="prop-gbg24-pfaffian-transform"></a>

<!-- formal-statement-start -->
> **命題（Pfaffian の直交枠変換と向き）**  
> 可換な係数を持つ $2m$ 次交代行列 $B$ と、実直交行列 $g\in O(2m)$ に対して

$$
\operatorname{Pf}(g^TBg)=\det(g)\operatorname{Pf}(B)
$$

> が成り立つ。したがって $g\in SO(2m)$ では不変であり、$\det(g)=-1$ の枠変更では符号が反転する。
<!-- formal-statement-end -->

**証明の見取り図**。形式的な基底記号を使って交代行列の成分を二重の外積へ移し、最高次の係数を比較する。最高次外積は行列 $g$ で変換すると $\det(g)$ 倍される。

<!-- proof-start -->
### 証明

自由な外積変数 $z_1,\ldots,z_{2m}$ を導入し、$B$ の成分はこれらの変数と可換とする。

$$
\Theta_B=\frac12\sum_{a,b=1}^{2m}B_{ab}\,z_a\wedge z_b
=\sum_{a<b}B_{ab}\,z_a\wedge z_b
$$

と置く。$\Theta_B^m$ を展開すると、すべての $z_1,\ldots,z_{2m}$ を一度ずつ含む項だけが生き残る。各項の符号は添字置換の符号であるから、定義の $2^m m!$ 個の重複を数え合わせると

$$
\frac{\Theta_B^m}{m!}
=\operatorname{Pf}(B)\,z_1\wedge\cdots\wedge z_{2m}.
$$

$z=(z_1,\ldots,z_{2m})^T$ に対し $w=gz$ と置けば、$\Theta_{g^TBg}(z)=\Theta_B(w)$ である。他方

$$
w_1\wedge\cdots\wedge w_{2m}
=\det(g)\,z_1\wedge\cdots\wedge z_{2m}.
$$

両式の最高次の係数を比較して結論を得る。ここで使った $g$ は零形式の実数行列なので、曲率の2形式との積の順序は符号を生まない。
<!-- proof-end -->

## 3. Euler 形式を曲率から作る

実階数 $2m$ の束に向きを指定すると、**向きと整合する正規直交枠**だけを使える。この枠同士の変換は $SO(2m)$ 値なので、直前の命題によって Pfaffian がパッチをまたいで貼り合わさる。向きを指定しない $O(2m)$ 束では、同じ局所式が重なりで符号を変えることがある。

<a id="def-gbg24-euler"></a>

<!-- formal-statement-start -->
> **定義（Pfaffian による Euler 形式）**  
> $M$ 上の向き付き階数 $2m$（$m\ge1$）の内積付き実ベクトル束 $E$ に計量接続を与え、向きと整合する正規直交枠で曲率を $R\in\Omega^2(U;\mathfrak{so}(2m))$ とする。このとき

$$
\boxed{e(E,\nabla)=\operatorname{Pf}\left(\frac{R}{2\pi}\right)\in\Omega^{2m}(M)}
$$

> を Euler 形式と呼ぶ。右辺は枠に依存せず大域的に定義される。ここでの Pfaffian の構成は偶数階に対するものである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg24-euler -->
**定義の確認**。先ほどの $\mathbb R^4$ 上の階数4の積束に、順序付き枠 $(e_1,e_2,e_3,e_4)$ の向きを入れる。$R/(2\pi)=\operatorname{diag}(J_+\alpha,J_+\alpha)$ であり、$R_{12}/(2\pi)=R_{34}/(2\pi)=\alpha$、それ以外の上三角成分は零。したがって

$$
e(E,\nabla)=\alpha\wedge\alpha=2\,dx\wedge dy\wedge dz\wedge dw.
$$

次数は階数と等しい4である。向きを保つ枠変更では前命題の $\det g=1$ により同じ形式になる。最初のベクトルだけ符号を反転させて逆向きの枠を採用すれば、同じ順序規約の Pfaffian は負号を得る。これが向きの条件の具体的な働きである。
<!-- definition-example-end -->

低次では次が直ちに計算できる。

$$
\begin{aligned}
\text{階数2:}\quad&e(E,\nabla)=\frac{R_{12}}{2\pi},\\
\text{階数4:}\quad&e(E,\nabla)=\frac{R_{12}\wedge R_{34}
-R_{13}\wedge R_{24}+R_{14}\wedge R_{23}}{(2\pi)^2}.
\end{aligned}
$$

**重要な注意**。向き付き奇数階実束にも位相的な Euler 類を論じることはできるが、本講で導入した偶数階の Pfaffian 代表式はそのまま使えない。「Pfaffian を書けない」ことを「Euler 類が存在しない」ことと混同しない。

## 4. 閉性と接続非依存性――なぜ特性量になるのか

局所で式を作れただけでは、接続を替えても同じ位相的情報を表すとはいえない。ここで前講までの Chern–Weil 理論が働く。

<a id="thm-gbg24-forms-independent"></a>

<!-- formal-statement-start -->
> **定理（Pontryagin・Euler 形式の閉性と接続非依存性）**  
> 滑らかな有限次元多様体 $M$ 上の内積付き実階数 $r$ 束 $E$ に対し、任意の二つの計量接続 $\nabla_0,\nabla_1$ で定まる各 Pontryagin 形式 $p_k(E,\nabla_j)$ は大域的な閉形式であり、その差は完全形式である。さらに $r=2m$ で $E$ に向きを指定した場合、Euler 形式 $e(E,\nabla_j)$ にも同じ結論が成り立つ。従ってそれぞれの de Rham 類は接続に依存しない。
<!-- formal-statement-end -->

**証明の見取り図**。Pontryagin には $O(r)$ 共役不変な行列式の係数、Euler には $SO(2m)$ 共役不変な Pfaffian を使う。どちらも曲率の同次不変多項式なので、閉性と二接続の差について既習の二定理を適用する。

<!-- proof-start -->
### 証明

(1) まず Pontryagin 形式。各 $p_k$ は $\det(I+tR/(2\pi))$ の $t^{2k}$ 係数であり、$R'=g^{-1}Rg$ に対して行列式が等しい。従って $O(r)$ の随伴作用で不変な次数 $2k$ の曲率多項式である。係数を偏極すれば、[Chern–Weil の閉性定理](../GBG21/index.md#thm-gbg21-chern-weil-closed)へ入力できるので $dp_k=0$。

(2) Euler 形式では、[Pfaffian の直交枠変換と向き](#prop-gbg24-pfaffian-transform)から $SO(2m)$ 共役不変である。$R$ の成分をちょうど $m$ 個掛けるので、次数 $m$ の曲率多項式である。同じ[閉性定理](../GBG21/index.md#thm-gbg21-chern-weil-closed)を使って $de=0$ となる。

(3) 二つの計量接続の差を $a=A_1-A_0$、補間を $A_t=A_0+ta$ とする。どちらの接続行列も実交代行列値なので、$A_t$ も $\mathfrak{so}(r)$ 値である。向き付きなら同じ向き付き枠で補間する。

[補間曲率の変化公式](../GBG22/index.md#lem-gbg22-curvature-variation)と[大域的な transgression 恒等式](../GBG22/index.md#thm-gbg22-transgression)を使う。$p_k$ を与える次数 $2k$ の不変多項式を $P$、Euler 形式を与える次数 $m$ の不変多項式を $Q$ とすると、前者には $P$ を代入して

$$
p_k(\nabla_1)-p_k(\nabla_0)
=d\left(2k\int_0^1 P(a,R_t,\ldots,R_t)\,dt\right),
$$

後者では

$$
e(\nabla_1)-e(\nabla_0)
=d\left(m\int_0^1 Q(a,R_t,\ldots,R_t)\,dt\right).
$$

$P,Q$ はそれぞれ元の同次多項式の対称多重線形な偏極であり、括弧内は共役不変だから全局所枠で一致する。よって両差は大域的な完全形式で、de Rham 類は接続によらない。
<!-- proof-end -->

これは **実数係数 de Rham 類の構成**である。一般の整数係数 Pontryagin 類・Euler 類の存在や特性数の整数性には、追加の位相的議論が要る。[前講の注意](../GBG23/index.md#prop-gbg23-chern-character-degrees)と同じく、閉形式であることだけでは積分の整数性は従わない。また接続が平坦なら正の次数のこれらの代表形式は消えるが、これだけで束のすべての位相的情報が消えたとはいえない。

## 5. 次数・向き・直和を具体的に見分ける

### 実平面束と複素線束の対応

複素線束 $L$ を、実部・虚部の順に向きを付けた実階数2束 $L_{\mathbb R}$ と見る。$L$ の $U(1)$ 接続の曲率を $F=-2\pi i\,\eta$（$\eta$ は実2形式）と書く。複素数への $-i$ 倍は、実基底 $(1,i)$ で $J_+$ という行列になるから、対応する実曲率は

$$
R=2\pi\begin{pmatrix}0&\eta\\-\eta&0\end{pmatrix}.
$$

この基底を使う理由は、複素数 $z=x+iy$ への $-i$ 倍が $(x,y)\mapsto(y,-x)$ と表されるからである。したがって、[低次 Chern 形式の跡表示](../GBG23/index.md#prop-gbg23-low-chern)を $L$ の $c_1$ に使い、[Euler 形式の定義](#def-gbg24-euler)と[第一 Pontryagin 形式の跡公式](#prop-gbg24-first-pontryagin)へ実曲率 $R$ を代入すると

$$
c_1(L)=\frac{iF}{2\pi}=\eta,\qquad
e(L_{\mathbb R})=\frac{R_{12}}{2\pi}=\eta,\qquad
p_1(L_{\mathbb R})=\frac{R_{12}\wedge R_{12}}{4\pi^2}=\eta^2.
$$

この比較は式だけの偶然ではない。複素線束の複素構造が実平面の向きを与えることと、曲率行列を変換したことが両者の等しさの根拠である。特に

<a id="prop-gbg24-plane-relations"></a>

<!-- formal-statement-start -->
> **命題（実平面束の Euler と Pontryagin）**  
> Hermite 複素線束 $L$ とその $U(1)$ 接続に対し、自然な向きを持つ実平面束 $L_{\mathbb R}$ の代表形式は

$$
e(L_{\mathbb R})=c_1(L),\qquad
p_1(L_{\mathbb R})=e(L_{\mathbb R})\wedge e(L_{\mathbb R}).
$$

> 特に基底の次元が2なら、右辺の4形式は零である。
<!-- formal-statement-end -->

**証明の見取り図**。複素数の掛け算を実 $2\times2$ 行列で表し、上の三つの式をそれぞれの定義へ代入すればよい。

<!-- proof-start -->
### 証明

$F=-2\pi i\eta$ に対し実曲率は $R_{12}=2\pi\eta$、$R_{21}=-2\pi\eta$。[第一 Pontryagin の跡公式](#prop-gbg24-first-pontryagin)ではこの二つの非零成分だけがあるため $p_1=R_{12}^2/(4\pi^2)=\eta^2$。一方[Pfaffian による Euler 定義](#def-gbg24-euler)では階数2なので $e=R_{12}/(2\pi)=\eta$。複素側も $iF/(2\pi)=\eta$ となる。これらの比較はどの局所ユニタリ枠でも成り立つため、大域的な代表形式の等式となる。
<!-- proof-end -->

### 直和での演算

<a id="prop-gbg24-sum"></a>

<!-- formal-statement-start -->
> **命題（実束の Pontryagin・Euler 直和公式）**  
> 内積付き実束 $E,H$ とその計量接続の直和に対して

$$
p(E\oplus H)=p(E)\wedge p(H)
$$

> が成り立つ。さらに $E,H$ がそれぞれ向き付き偶数階で、直和に順序付きの積の向きを入れたとき

$$
e(E\oplus H)=e(E)\wedge e(H)
$$

> が成り立つ。いずれも表示式は直和接続の代表形式の等式である。
<!-- formal-statement-end -->

**証明の見取り図**。直和接続の曲率はブロック対角になる。行列式は積、Pfaffian もブロック対角では積になることを、置換または最高次外積から示す。

<!-- proof-start -->
### 証明

曲率は $R_{E\oplus H}=\operatorname{diag}(R_E,R_H)$。従って行列式について

$$
\det(I+tR_{E\oplus H}/(2\pi))
=\det(I+tR_E/(2\pi))\det(I+tR_H/(2\pi)).
$$

各側で $t^{2k}$ の係数を照合すると $p_k(E\oplus H)=\sum_{j=0}^k p_j(E)\wedge p_{k-j}(H)$、全形式の積の主張を得る。

Euler については、ブロック間成分が零なので、[Pfaffian の定義](#def-gbg24-pfaffian)に現れる非零の組は $E$ 側の添字同士、$H$ 側の添字同士だけである。[Pfaffian 変換命題の証明](#prop-gbg24-pfaffian-transform)で用いた最高次外積においても

$$
\frac{\Theta_{\operatorname{diag}(R_E,R_H)}^{m+n}}{(m+n)!}
=\frac{\Theta_{R_E}^{m}}{m!}\wedge\frac{\Theta_{R_H}^{n}}{n!}
$$

が成り立つ。異なるブロックの基底変数を使い切るには、それぞれ $m,n$ 回選ぶ必要がある。展開には $(m+n)!/(m!n!)$ 通りの配置が現れ、$(m+n)!$ で割ると $m!n!$ が分母に残るからである。積の向きの順に並べた最高次係数が Pfaffian の積となる。
<!-- proof-end -->

直和の Euler 形式は「向き付き偶数階の各因子」を仮定する。片方が向き付けられていなければ、その因子の Euler 形式を大域的に貼り合わせる前提が欠ける。

### 4階束でのもう一つの対応

階数4の交代行列の行列式を、Pfaffian の二乗と直接比較しよう。成分を展開して確かめる。$B_{12}=a,\ B_{13}=b,\ B_{14}=c,\ B_{23}=d,\ B_{24}=f,\ B_{34}=h$ とし、下三角成分を交代性で決める。このとき定義から $\operatorname{Pf}(B)=ah-bf+cd$。行列式の置換和を、非零となる2個の互換の積と4個の巡回を含む項に分けると

$$
\begin{aligned}
\det B&=a^2h^2+b^2f^2+c^2d^2-2abfh+2acdh-2bcdf\\
&=(ah-bf+cd)^2=\operatorname{Pf}(B)^2.
\end{aligned}
$$

従って4次ではすべての成分に対して成立し、最初の二平面だけに限定した恒等式ではない。

階数4の実直交束では最高次 Chern 係数が

$$
c_4(E_{\mathbb C})
=\det\left(\frac{iR}{2\pi}\right)
=\det\left(\frac{R}{2\pi}\right)
=\operatorname{Pf}\left(\frac{R}{2\pi}\right)^2.
$$

$i^4=1$ と $p_2=(-1)^2c_4$ より

$$
\boxed{p_2(E,\nabla)=e(E,\nabla)^2}
$$

である。これは **8形式**の等式であり、4次元の基底上では両辺とも零である。4次元基底で一般に非零になり得るのは $p_1$ や階数4の $e$ であり、$p_2$ と混ぜない。

## 6. 演習と詳細解答

### Level A：定義と低次行列を確かめる

<a id="ex-gbg24-a01"></a>
#### GBG24-A01 実平面束の最初の係数
- Level: A

$\mathbb R^4$ 上の自明な向き付き実平面束に、実2形式 $\eta=dx\wedge dy+dz\wedge dw$ を使い $R=2\pi\begin{psmallmatrix}0&\eta\\-\eta&0\end{psmallmatrix}$ とする。Euler 形式と第一 Pontryagin 形式を求め、次数を述べよ。

<!-- solution-start -->
**詳細解答**。行列の $(1,2)$ 成分が $R_{12}=2\pi\eta$ なので、[Euler 形式の定義](#def-gbg24-euler)で $m=1$ とすると $e=R_{12}/(2\pi)=\eta$（2形式）。[第一 Pontryagin の跡公式](#prop-gbg24-first-pontryagin)では $a<b$ の組は $(1,2)$ だけなので

$$
p_1=\frac{R_{12}\wedge R_{12}}{4\pi^2}
=\eta^2
=2\,dx\wedge dy\wedge dz\wedge dw.
$$

同じ2形式同士の積は可換であり、$\eta^2$ の交差項が二回現れる。従って $p_1$ は4形式で、$p_1=e^2$ が確認できる。
<!-- solution-end -->

<a id="ex-gbg24-a02"></a>
#### GBG24-A02 分解可能な二つの曲率
- Level: A

向き付き階数4束の局所曲率を $R=2\pi\operatorname{diag}(J_+\eta,J_+\zeta)$、$\eta=dx\wedge dy$、$\zeta=dz\wedge dw$ とする。$p_1,e,p_2$ をそれぞれ計算せよ（基底は $\mathbb R^4$）。

<!-- solution-start -->
**詳細解答**。行列式は $(1+t^2\eta^2)(1+t^2\zeta^2)$ である。$\eta^2=dx\wedge dy\wedge dx\wedge dy=0$、$\zeta^2=0$ なので、$p_1=\eta^2+\zeta^2=0$。一方 Pfaffian は最初と最後の二平面の $(1,2)$、$(3,4)$ 成分の積だから

$$
e=\eta\wedge\zeta=dx\wedge dy\wedge dz\wedge dw\ne0.
$$

$p_2=\eta^2\zeta^2=e^2$ は8形式で、4次元基底では零である。$p_1$ と $e$ が同じ4形式でも一致するとは限らない。
<!-- solution-end -->

<a id="ex-gbg24-a03"></a>
#### GBG24-A03 向きを逆転する枠変更
- Level: A

$g=\operatorname{diag}(-1,1,1,1)\in O(4)$ とし、$R' = g^TRg$ とする。$\operatorname{Pf}(R'/(2\pi))$ と $p_1(R')$ は、元の $R$ からどう変化するか。理由も述べよ。

<!-- solution-start -->
**詳細解答**。$\det g=-1$ なので [Pfaffian の変換命題](#prop-gbg24-pfaffian-transform)を $B=R/(2\pi)$ に適用して $\operatorname{Pf}(R'/(2\pi))=-\operatorname{Pf}(R/(2\pi))$。一方、$p_1=-\operatorname{tr}(R^2)/(8\pi^2)$ について

$$
\operatorname{tr}(R'\wedge R')
=\operatorname{tr}(g^TRg\wedge g^TRg)
=\operatorname{tr}(g^T(R\wedge R)g)
=\operatorname{tr}(R\wedge R)
$$

である。$gg^T=I$ を中間で使った。向きを反転すると Euler 形式の符号だけが変わり、Pontryagin 形式は不変である。
<!-- solution-end -->

<a id="ex-gbg24-a04"></a>
#### GBG24-A04 奇数階では何が計算できるか
- Level: A

階数3の実直交束の局所曲率が $R_{12}=2\pi\eta,\ R_{21}=-2\pi\eta$、それ以外の成分は零である。$p_1$ を求め、Pfaffian の Euler 形式をこの定義のままで書けるか答えよ。

<!-- solution-start -->
**詳細解答**。$R$ は交代行列で、[跡公式](#prop-gbg24-first-pontryagin)の和のうち $(1,2)$ だけが残るから $p_1=\eta^2$。また $\det(I_3+tR/(2\pi))=(1+t^2\eta^2)\cdot1$ でも確認できる。階数3は $2m$ ではないので [偶数階で定義した Pfaffian Euler 形式](#def-gbg24-euler)はこの形では作れない。ただしこれは奇数階の位相的 Euler 類の不存在を意味しない。
<!-- solution-end -->

### Level B：公式の理由を組み立てる

<a id="ex-gbg24-b01"></a>
#### GBG24-B01 複素化で奇数 Chern 形式が消える理由
- Level: B

計量接続を持つ階数 $r$ の実束 $E$ を複素化する。局所曲率 $R$ の交代性から $c_{2j+1}(E_{\mathbb C})=0$ を**微分形式として**示し、$p_1=-c_2(E_{\mathbb C})$ の係数を求めよ。

<!-- solution-start -->
**詳細解答**。実正規直交枠では $R^T=-R$。複素化しても曲率行列は同じ $R$ なので、[全 Chern 形式](../GBG23/index.md#def-gbg23-total-chern)の生成多項式は $C(t)=\det(I_r+tiR/(2\pi))$ である。転置・交代性を順に使うと

$$
C(t)=\det\big((I_r+tiR/(2\pi))^T\big)
=\det(I_r-tiR/(2\pi))=C(-t).
$$

$t$ は形式変数だから偶関数の多項式は奇数係数がすべて零、すなわち $c_{2j+1}=0$。$\operatorname{tr}R=0$ を[前講の $c_2$ 公式](../GBG23/index.md#prop-gbg23-low-chern)へ代入すると $c_2=\operatorname{tr}(R^2)/(8\pi^2)$。従って $p_1=-c_2=-\operatorname{tr}(R^2)/(8\pi^2)$。ここでの消滅は de Rham 代表形式の主張で、整数係数の捩れまで否定していない。
<!-- solution-end -->

<a id="ex-gbg24-b02"></a>
#### GBG24-B02 局所の完全形式と接続非依存性
- Level: B

$\mathbb R^4$ 上の向き付き実平面束に $A=2\pi J_+(x\,dy+z\,dw)$ を置く。$\theta=x\,dy+z\,dw$ とし、$e,p_1$ を求めよ。また、それぞれを外微分で表す具体的な1形式と3形式を挙げよ。

<!-- solution-start -->
**詳細解答**。$J_+$ は一定の交代行列、$\theta\wedge\theta=0$ なので $R=dA=2\pi J_+d\theta$。$\eta=dx\wedge dy$、$\zeta=dz\wedge dw$ とすれば $d\theta=\eta+\zeta$。よって

$$
e=d\theta=\eta+\zeta=d(\theta),\qquad
p_1=(d\theta)^2=2\eta\wedge\zeta.
$$

外微分の積の公式で $d(\theta\wedge d\theta)=d\theta\wedge d\theta-\theta\wedge d^2\theta=(d\theta)^2$ だから

$$
p_1=d\bigl(\theta\wedge(\eta+\zeta)\bigr).
$$

局所で両方が完全形式と分かっても、非自明な大域束では、外微分する前の局所1形式・3形式がそのまま貼り合わさるとは限らない。接続の差が大域的に完全形式という[前節の定理](#thm-gbg24-forms-independent)とは主張を区別する。
<!-- solution-end -->

<a id="ex-gbg24-b03"></a>
#### GBG24-B03 4階束で $p_2=e^2$
- Level: B

向き付き階数4の実直交束の局所曲率行列を $R$ とする。交代 $4\times4$ 行列の $\det R=\operatorname{Pf}(R)^2$ を用いて $p_2=e^2$ を導け。4次元の基底でこの公式が何を意味するかも答えよ。

<!-- solution-start -->
**詳細解答**。[Pontryagin 形式の定義](#def-gbg24-pontryagin)から $p_2=(-1)^2c_4(E_{\mathbb C})=c_4(E_{\mathbb C})$。[全 Chern 形式](../GBG23/index.md#def-gbg23-total-chern)の $t^4$ 係数は $\det(iR/(2\pi))$ である。行列の階数が4なのでスカラー $i$ をくくると $i^4=1$、従って

$$
p_2=\det\left(\frac{iR}{2\pi}\right)
=\det\left(\frac{R}{2\pi}\right)
=\operatorname{Pf}\left(\frac{R}{2\pi}\right)^2=e^2.
$$

両辺は8形式である。基底の次元が4なら8形式は零なので、$p_2=e^2=0$ は非自明な4次特性数の一致を意味するものではない。比較すべき $p_1,e$ は4形式であり、一般に異なる。
<!-- solution-end -->

<a id="ex-gbg24-b04"></a>
#### GBG24-B04 一方が平坦な直和
- Level: B

向き付き実平面束 $H$ に曲率 $2\pi J_+\eta$ を持つ計量接続を与え、$T$ は階数2の自明な向き付き平面束と平坦接続とする。$E=H\oplus T$ に積の向きと直和接続を入れる。$e(E)$ と $p_1(E)$ を計算し、異なる理由で一方だけが消える仕組みを示せ。

<!-- solution-start -->
**詳細解答**。$H$ では [実平面束の命題](#prop-gbg24-plane-relations)により $e(H)=\eta$、$p_1(H)=\eta^2$。$T$ は曲率零なので $e(T)=0$、$p(T)=1$。[直和公式](#prop-gbg24-sum)を適用すると

$$
e(E)=e(H)\wedge e(T)=\eta\wedge0=0,\qquad
p(E)=p(H)p(T)=(1+\eta^2)\cdot1.
$$

ゆえに $p_1(E)=\eta^2$。$E$ の Euler 形式は最高次 Pfaffian が零曲率ブロックを一つ必要とするため消える。一方 $p_1$ は各ブロックの4次の寄与を足すので、$H$ の $\eta^2$ が残る。$\eta^2$ が非零になる基底（例：$\eta=dx\wedge dy+dz\wedge dw$ を取る $\mathbb R^4$）なら両者の差が見える。
<!-- solution-end -->

### Level C：同じ4次元基底で二つの不変量を比較する

<a id="ex-gbg24-c01"></a>
#### GBG24-C01 $S^2\times S^2$ 上の二種類の実階数4束
- Level: C

$M=S^2\times S^2$ に積の向きを入れ、各因子から引き戻した積分1の2形式を $x,y$ とする。$x^2=y^2=0$、$\int_M x\wedge y=1$ を用いてよい。[GBG19 の monopole 線束](../GBG19/index.md#thm-gbg19-curvature-flux)を各因子に引き戻し、その曲率が $-2\pi i\,x$ および $-2\pi i\,y$ となるように取る。

1. $E=(\pi_1^*L_1)_{\mathbb R}\oplus(\pi_2^*L_1)_{\mathbb R}$ を二つの複素線束からの自然な積の向きで定める。$e(E),p_1(E)$ とその $M$ 上の積分を求めよ。
2. 二つの複素線束のテンソル積 $L=\pi_1^*L_1\otimes\pi_2^*L_1$ に、局所接続1形式を足した接続を入れる。$E'=L_{\mathbb R}\oplus\underline{\mathbb R}^2$ に直和接続を入れたとき、$e(E'),p_1(E')$ と積分を求めよ。
3. $E$ の向きだけを逆にすると何が変わるか。また、これらの具体計算だけから一般の整数性定理が証明されたといえるか。

<!-- solution-start -->
**詳細解答**。

(1) 線束の曲率は $F_x=-2\pi i x$、$F_y=-2\pi i y$ であり、複素線束由来の自然な向きのもとで [実平面束の命題](#prop-gbg24-plane-relations)を各因子へ適用すると

$$
e((\pi_1^*L_1)_{\mathbb R})=x,\quad
p_1((\pi_1^*L_1)_{\mathbb R})=x^2=0,
$$

および第二因子について $e=y,\ p_1=y^2=0$ を得る。両因子は向き付き実階数2束で計量接続を持つ。そこで [実束の Pontryagin・Euler 直和公式](#prop-gbg24-sum)を適用すると

$$
e(E)=x\wedge y,\quad
p(E)=(1+x^2)(1+y^2)=1.
$$

従って $\int_M e(E)=1$、$\int_M p_1(E)=0$。Euler 形式は二つの独立な2形式の積を拾い、第一 Pontryagin はそれぞれの二乗を拾う。

(2) 局所接続が $A_x,A_y$ のとき、テンソル積では局所共変微分に積の Leibniz 則を用いるので $A_L=A_x+A_y$。$U(1)$ の接続なので $A\wedge A=0$ であり、曲率は

$$
F_L=d(A_x+A_y)=F_x+F_y=-2\pi i(x+y).
$$

接続のパッチ間変換も $g_{ij}^{-1}dg_{ij}$ が積に対して加法的なので整合する。ゆえに $e(L_{\mathbb R})=x+y$、$p_1(L_{\mathbb R})=(x+y)^2=2x\wedge y$。残る平面束 $\underline{\mathbb R}^2$ の曲率は零であるから、[直和公式](#prop-gbg24-sum)で

$$
e(E')=(x+y)\wedge0=0,\qquad
p_1(E')=(x+y)^2+0=2x\wedge y.
$$

積分は $\int_M e(E')=0$、$\int_M p_1(E')=2$。ここでは同じ次元4の基底上で、$E$ と $E'$ に別々の特徴が現れた。

(3) $E$ の向きを反転すると[Pfaffian の変換則](#prop-gbg24-pfaffian-transform)により $e(E)$ が $-x\wedge y$ に変わり、Euler 積分は $-1$ になる。$p_1(E)$ は直交群共役不変なので依然として零。これらの整数は、与えた線束の曲率と $x,y$ の積分を直接計算した結果である。任意の実束に対する整数係数特性類の存在や一般の特性数の整数性をここから論証したわけではない。
<!-- solution-end -->

## 7. まとめと次講への接続

- **Pontryagin 形式**は実束を複素化し、$p_k=(-1)^k c_{2k}(E_{\mathbb C})$ とする。次数は $4k$、計量と接続があれば構成でき、向きに依存しない。
- **Pfaffian Euler 形式**は向き付き偶数階実束に対する最高次形式 $e=\operatorname{Pf}(R/(2\pi))$。向きを逆にすると符号が変わる。
- いずれも不変多項式から作られるので、[閉性](../GBG21/index.md#thm-gbg21-chern-weil-closed)と[接続非依存性](../GBG22/index.md#thm-gbg22-transgression)が成り立つ。de Rham 類と一般の整数係数の類は区別する。

次の GBG25 では $S^4$ の二つの半球を $S^3\to SU(2)$ の遷移関数で貼り合わせる。ここで学んだ「局所曲率の式から大域的な代表形式を作る」という視点を、具体的な非可換主束へ移す。
