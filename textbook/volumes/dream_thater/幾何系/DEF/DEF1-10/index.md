# DEF1-10 Bogomolov–Tian–Todorov II――障害消滅と収束

## 1. 二次障害の消滅から、実際に動く複素構造へ

[Tian–Todorov核心恒等式](../DEF1-09/index.md#thm-def1-09-tian-todorov)によれば、正則体積形式 $\Omega$ に関して $\partial$-閉な二つのBeltrami微分の括弧は、$\Omega$ で収縮すると $\partial$-完全になる。[大域 $\partial\bar\partial$-補題](../../HOD/HOD1-08/index.md#thm-hod1-08-ddbar-lemma)と合わせて二次障害は消せた。

しかし三次には、一次係数 $\phi_1$ だけでなく、一般には $\bar\partial_T$-閉でない二次補正 $\phi_2$ も現れる。二次の議論を「同じように」繰り返すことはできない。さらに、各次数で解けたとしても、その係数を足した無限級数の収束は別問題である。

本章では、次の三段階をつなぐ。

1. **次数ごとの補正**：新しい係数を選ぶたび、収縮後の $\partial$-閉性を維持する。
2. **解析的な解**：Green作用素の一階分の正則性回復を使って、補正級数をSobolev空間で収束させる。
3. **滑らかな局所基底**：正則な変形族を構成し、[Kuranishiの半普遍性](../DEF1-08/index.md#thm-def1-08-semiuniversal)と結び付ける。

以下、$X$ は**コンパクト・境界なしのKähler多様体**、複素次元 $n\ge2$、$K_X\simeq\mathcal O_X$ とする。零にならない大域正則 $n$ 形式 $\Omega$ とKähler計量を一つ固定する。$T_X=T^{1,0}X$、$d=\bar\partial_T$ と書く。正則体積形式による[型別収縮同型](../../CYG/CYG1-12/index.md#thm-cyg1-12-cohomology-isomorphism)を

$$
\mathcal I_q:\mathcal A^{0,q}(X,T_X)\longrightarrow
\mathcal A^{n-1,q}(X),\qquad
\phi\longmapsto\phi\lrcorner\Omega
$$

と略記する。$\mathcal I_{q+1}(d\phi)=\bar\partial\mathcal I_q(\phi)$ であり、$\Omega$ がどこでも非零なので逆写像がある。$\mathcal I_q$ は微分作用素ではなく、点ごとの滑らかな線形同型である。

## 2. $\partial$-閉性を壊さない原始形式を選ぶ

既習の[接束値Green作用素](../DEF1-06/index.md#thm-def1-06-tangent-hodge)はどのコンパクト複素多様体でも作れるが、今回は**スカラー値** $(n-1,q)$ 形式のKähler–Hodge分解を使う。これによって $\partial$ と $\bar\partial^*$ の反交換性も利用できる。

$(n-1,q)$ 型形式の $\bar\partial$-Laplacianを $\Delta_{\bar\partial,q}$、その調和空間への直交射影を $H_q$、Green作用素を $G_q$ とする。[型別Green作用素](../../HOD/HOD1-06/index.md#def-hod1-06-dolbeault-green)の定義では

$$
\Delta_{\bar\partial,q}G_q=G_q\Delta_{\bar\partial,q}=I-H_q,
\qquad G_qH_q=0.
$$

完全形式の解を一つ選ぶため、ホモトピー作用素を導入する。

<a id="def-def1-10-kahler-homotopy"></a>

<!-- formal-statement-start -->
> **定義（体積形式によるKählerホモトピー）**
>
> 上記のコンパクトKähler多様体 $X$、Kähler計量、$\Omega$ を固定する。整数 $1\le q\le n$ に対し、スカラー値形式上の線形作用素

$$
h_q=\bar\partial^*G_q:
\mathcal A^{n-1,q}(X)\longrightarrow
\mathcal A^{n-1,q-1}(X)
$$

> を体積形式によるKählerホモトピーと呼ぶ。$q>n$ での作用素は零とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-10-kahler-homotopy -->
**定義の確認**（平坦複素トーラス）。$X=\mathbb C^2/(\mathbb Z+i\mathbb Z)^2$、$\Omega=dz^1\wedge dz^2$、標準平坦Kähler計量を取る。$(1,2)$ 型の定数係数形式

$$
u=dz^1\wedge d\bar z^1\wedge d\bar z^2
$$

は平坦計量の下で係数が定数である。局所的に $\bar\partial$ は係数の反正則微分、$\bar\partial^*$ は係数の正則微分と縮約の和で表されるため、どちらも $u$ を零へ送る。従って

$$
\bar\partial u=\bar\partial^*u=0,\qquad
\Delta_{\bar\partial,2}u=0,\qquad H_2u=u.
$$

調和空間上では $G_2u=0$ と定義されているので、$h_2u=\bar\partial^*G_2u=0$ である。この計算は入力 $(1,2)$ 型、出力 $(1,1)$ 型、および調和成分を消す作用を確認している。$h_q$ 自体はKähler計量から決まり、$\Omega$ はこれを収縮同型 $\mathcal I_q$ を通じて接束値形式の補正へ使う際に必要となる。
<!-- definition-example-end -->

Green作用素は $\bar\partial$ と可換なので、[Hodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-dolbeault-harmonic)から得る連鎖ホモトピー恒等式は

<a id="eq-def1-10-green-homotopy"></a>

$$
\bar\partial h_q+h_{q+1}\bar\partial=I-H_q.
$$

以後この等式を「Green分解式」と呼ぶ。特に $\bar\partial u=0$ かつ $H_qu=0$ なら $\bar\partial(h_qu)=u$ である。

必要なのは、原始形式 $h_qu$ がさらに $\partial$-閉になることだ。[混合随伴反交換子の消滅](../../HOD/HOD1-05/index.md#lem-hod1-05-mixed-adjoints)は全次数で $\partial\bar\partial^*=-\bar\partial^*\partial$ を与え、[三Laplacian一致](../../HOD/HOD1-05/index.md#thm-hod1-05-laplacian-equality)によって $\partial G_q=G'_q\partial$（$G'_q$ は $(n,q)$ 型のGreen作用素）が従う。従って

$$
\partial(h_qu)=-h'_q(\partial u).
$$

右辺の $h'_q$ は $(n,q)$ 型から $(n,q-1)$ 型へ作用する同じ構成であり、左辺の作用素と型を混同しない。

<a id="lem-def1-10-preserving-correction"></a>

<!-- formal-statement-start -->
> **補題（∂閉性を保つ補正）**
>
> $X$ を複素次元 $n\ge2$ のコンパクトKähler多様体、$\Omega$ を零にならない大域正則 $n$ 形式とする。$\phi,\psi\in\mathcal A^{0,1}(X,T_X)$ が

$$
\partial\mathcal I_1(\phi)=
\partial\mathcal I_1(\psi)=0
$$

> を満たすなら、$R=\mathcal I_2([\phi,\psi])$ は $\partial$-完全で、$\partial R=0$、$H_2R=0$、$\partial h_2R=0$ を満たす。さらに $\bar\partial R=0$ のとき、$\eta=\mathcal I_1^{-1}(h_2R)$ に対し

$$
d\eta=[\phi,\psi],
\qquad \partial\mathcal I_1(\eta)=0
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

Tian–Todorov恒等式で $R$ は $\partial$-完全となる。Kähler上の調和形式は $\partial^*$-閉なので調和射影が零になり、混合反交換子により $h_2R$ は $\partial$-閉になる。$\bar\partial R=0$ を追加するとGreen分解式が原始形式を与える。

<!-- proof-start -->
### 証明

[Tian–Todorov恒等式](../DEF1-09/index.md#thm-def1-09-tian-todorov)にこの $\phi,\psi$ を代入すると

$$
R=-\partial B_\Omega(\phi,\psi).
$$

したがって $\partial R=-\partial^2B_\Omega(\phi,\psi)=0$。任意の $\bar\partial$-調和 $(n-1,2)$ 型形式 $v$ は[三Laplacian一致](../../HOD/HOD1-05/index.md#thm-hod1-05-laplacian-equality)により $\partial^*v=0$。そこで $L^2$ 内積を使えば

$$
\langle R,v\rangle
=-\langle\partial B_\Omega(\phi,\psi),v\rangle
=-\langle B_\Omega(\phi,\psi),\partial^*v\rangle=0.
$$

調和空間に直交するので $H_2R=0$。さらに[混合随伴反交換子](../../HOD/HOD1-05/index.md#lem-hod1-05-mixed-adjoints)とGreen作用素の $\partial$ との可換性を順に使い

$$
\partial h_2R
=\partial\bar\partial^*G_2R
=-\bar\partial^*\partial G_2R
=-\bar\partial^*G'_2(\partial R)=0.
$$

追加条件 $\bar\partial R=0$ の下では[Green分解式](#eq-def1-10-green-homotopy)から

$$
\bar\partial(h_2R)
=R-H_2R-h_3\bar\partial R=R.
$$

最後に[収縮の複体同型](../../CYG/CYG1-12/index.md#thm-cyg1-12-cohomology-isomorphism)を適用し、$\mathcal I_2(d\eta)=R=\mathcal I_2([\phi,\psi])$、ゆえに $d\eta=[\phi,\psi]$。同時に $\partial\mathcal I_1(\eta)=\partial h_2R=0$。$\square$
<!-- proof-end -->

**例：二次補正の符号。** $\phi_1$ が $d\phi_1=0$、$\partial\mathcal I_1(\phi_1)=0$ を満たすなら、$R_2=\mathcal I_2([\phi_1,\phi_1])$ は $\bar\partial$-閉である。補題の $\eta$ を使って

$$
\phi_2=-\frac12\mathcal I_1^{-1}(h_2R_2)
$$

と取れば $d\phi_2=-[\phi_1,\phi_1]/2$、$\partial\mathcal I_1(\phi_2)=0$。係数 $1/2$ は[Maurer–Cartan方程式](../DEF1-03/index.md#thm-def1-03-maurer-cartan)の係数であり、原始形式の選択によるものではない。

## 3. 全次数の障害が消えることを帰納法で示す

$m=\dim_\mathbb C H^1(X,T_X)$ とする。[調和代表の選択](../DEF1-09/index.md#prop-def1-09-closed-representative)により、各一次類を $\partial$-閉なスカラー値調和形式へ移せる。$b_1,\ldots,b_m\in\mathcal H_{\bar\partial}^{n-1,1}$ を基底に取り、形式変数 $t_1,\ldots,t_m$ に対して

$$
a_1(t)=\sum_{\nu=1}^m t_\nu b_\nu,\qquad
\phi_1(t)=\mathcal I_1^{-1}(a_1(t))
$$

と置く。$a_1$ は $\partial$ と $\bar\partial$ の両方で閉である。

<a id="thm-def1-10-formal-unobstructed"></a>

<!-- formal-statement-start -->
> **定理（全次数のBTT障害消滅）**
>
> $X$ を複素次元 $n\ge2$ のコンパクトKähler多様体で $K_X\simeq\mathcal O_X$ とし、上記の非消滅正則体積形式 $\Omega$ と調和基底 $b_1,\ldots,b_m$ を固定する。このとき同次次数 $r\ge1$ の接束値 $(0,1)$ 形式 $\phi_r(t)$ を順次選び、

$$
\phi(t)=\sum_{r\ge1}\phi_r(t),\qquad
d\phi+\frac12[\phi,\phi]=0
$$

> を各単項式の次数ごとの恒等式として満たし、すべての $r$ で $\partial\mathcal I_1(\phi_r)=0$ とできる。$\phi_1=\mathcal I_1^{-1}(\sum_\nu t_\nu b_\nu)$ であり、$H^2(X,T_X)$ の消滅は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

低次数のMaurer–Cartan方程式が成立していれば、[高次障害の閉性と延長判定](../DEF1-05/index.md#thm-def1-05-higher-criterion)によって次数 $r$ の括弧の和は $\bar\partial$-閉になる。他方、各 $\phi_i$ に維持してきた $\partial$-閉性と[Tian–Todorov核心恒等式](../DEF1-09/index.md#thm-def1-09-tian-todorov)によって、同じ和は $\partial$-完全となる。前節の補題で次の係数を選ぶ。

<!-- proof-start -->
### 証明

$a_r=\mathcal I_1(\phi_r)$ と置く。$r\ge2$ について、すでに選んだ $i<r$ の係数から

$$
R_r=\sum_{\substack{i+j=r\\i,j\ge1}}
\mathcal I_2([\phi_i,\phi_j])
\in\mathcal A^{n-1,2}(X)\otimes\mathbb C[t_1,\ldots,t_m]_r
$$

を作る。添字は**順序付き**で数えており、たとえば $R_3=2\mathcal I_2([\phi_1,\phi_2])$ である。

まず $\partial a_i=0$ がすべての $i<r$ で成り立つと仮定する。[Tian–Todorov恒等式](../DEF1-09/index.md#thm-def1-09-tian-todorov)を各項へ使って

$$
R_r=-\partial\sum_{i+j=r}B_\Omega(\phi_i,\phi_j).
$$

従って $\partial R_r=0$、$H_2R_r=0$。次に、次数 $<r$ のMaurer–Cartan方程式を満たすという帰納法の仮定から、[高次障害の閉性](../DEF1-05/index.md#thm-def1-05-higher-criterion)により

$$
\bar\partial R_r=0.
$$

この閉性を確認せずにGreen分解式を適用してはいけない。実際、[接束値Dolbeault複体の括弧恒等式](../DEF1-05/index.md#lem-def1-05-graded-identities)の微分則と、次数 $1$ と次数 $2$ の括弧が反対称であることから、順序付きの組 $(i,j)$ を入れ替えて

$$
\begin{aligned}
d\!\sum_{i+j=r}[\phi_i,\phi_j]
&=2\sum_{i+j=r}[d\phi_i,\phi_j]\\
&=-\sum_{p+q+j=r}[[\phi_p,\phi_q],\phi_j]
\end{aligned}
$$

を得る。二行目では低次数の式 $d\phi_i=-\frac12\sum_{p+q=i}[\phi_p,\phi_q]$ を代入した。右辺は正整数の順序付き三つ組 $(p,q,j)$ すべての和であり、次数付きJacobi恒等式

$$
[[\phi_p,\phi_q],\phi_j]
+[[\phi_q,\phi_j],\phi_p]
+[[\phi_j,\phi_p],\phi_q]=0
$$

を巡回的に足すと零になる。収縮同型と $\bar\partial$ の可換性により $\bar\partial R_r=0$ が従う。これは[Maurer–Cartan曲率のBianchi恒等式](../DEF1-05/index.md#lem-def1-05-bianchi)を次数 $r$ で比較した計算でもある。

よって[補正補題](#lem-def1-10-preserving-correction)の仮定がそろい、

$$
a_r=-\frac12h_2R_r,\qquad
\phi_r=\mathcal I_1^{-1}(a_r)
$$

と定めれば

$$
\bar\partial a_r=-\frac12R_r,\qquad
\partial a_r=0.
$$

収縮の複体同型から

$$
d\phi_r=-\frac12\sum_{i+j=r}[\phi_i,\phi_j].
$$

$r=1$ は $da_1=\partial a_1=0$ から始まるので、帰納法がすべての次数で成立する。各 $R_r$ の調和成分は零だから、[障害類の延長判定](../DEF1-05/index.md#thm-def1-05-higher-criterion)の障害はすべて消える。$\square$
<!-- proof-end -->

**三次を手で見る。** 係数の対称性 $[\phi_1,\phi_2]=[\phi_2,\phi_1]$ を使うと

$$
d\phi_3=-[\phi_1,\phi_2],\qquad
a_3=-h_2\mathcal I_2([\phi_1,\phi_2]).
$$

$\bar\partial\mathcal I_2([\phi_1,\phi_2])$ は $d\phi_1=0$ と $d\phi_2=-[\phi_1,\phi_1]/2$ により三重括弧へ変わる。[接束値Dolbeault複体の括弧恒等式](../DEF1-05/index.md#lem-def1-05-graded-identities)の三重括弧の消滅によって零になる。$\phi_2$ が単独では $d$-閉でないことと矛盾しない。

## 4. 形式級数を収束する固定点へ変える

次数別の補正で作った $\sum\phi_r$ に、正の収束半径があることを示す。以下、実次元 $2n$ の[多様体Sobolev空間](../../GA/GA2/index.md#def-ga2-sobolev) $H^s$ を使い、整数 $s>n+2$ を固定する。[接束値Sobolev評価の局所座標での議論](../DEF1-07/index.md#lem-def1-07-sobolev-estimate)はスカラー値形式の各成分にも適用できる。実次元が $2n$ だから $s-2>n$ であり、$H^{s-2}$ と $H^{s-1}$ は積に閉じ、$H^s$ は $C^1$ に連続埋め込みされる。

$a\in H^s(X,\Lambda^{n-1,1}T^*X)$ に対し $\phi=\mathcal I_1^{-1}a$ と置き、二次写像を

$$
\mathcal R(a,b)=\mathcal I_2([\mathcal I_1^{-1}a,\mathcal I_1^{-1}b]),
\qquad \mathcal R(a)=\mathcal R(a,a)
$$

とする。局所座標で括弧は一階微分を一度含むので、[接束値括弧のSobolev評価](../DEF1-07/index.md#lem-def1-07-sobolev-estimate)と $\mathcal I_q^{\pm1}$ の滑らかな零階性から

$$
\|\mathcal R(a,b)\|_{H^{s-1}}
\le C_0\|a\|_{H^s}\|b\|_{H^s}.
$$

一方、[Greenの楕円型評価](../../GA/GA6/index.md#lem-ga6-elliptic)をスカラー値 $\bar\partial$-Laplacianへ使うと、$G_2:H^{s-1}\to H^{s+1}$、$\bar\partial^*:H^{s+1}\to H^s$ だから

$$
\|h_2\mathcal R(a,b)\|_{H^s}
\le C\|a\|_{H^s}\|b\|_{H^s}.
$$

この**一階損失を一階回復する**評価が収束の根拠である。

<a id="thm-def1-10-convergent"></a>

<!-- formal-statement-start -->
> **定理（収束するBTT固定点解）**
>
> $X$ を複素次元 $n\ge2$ のコンパクトKähler多様体で $K_X\simeq\mathcal O_X$ とし、$\Omega$、Kähler計量、整数 $s>n+2$ を固定する。調和パラメータ

$$
b(t)=\sum_{\nu=1}^m t_\nu b_\nu
\in\mathcal H_{\bar\partial}^{n-1,1}
$$

> が十分小さいとき、$H^s$ 値の収束する正則写像 $a(t)$ が一意に存在し、

$$
a(t)=b(t)-\frac12h_2\mathcal R(a(t))
$$

> を満たす（零の近くの小さいノルムの解として一意）。さらに

$$
H_1a(t)=b(t),\qquad
\bar\partial^*a(t)=0,\qquad
\partial a(t)=0.
$$

> そのTaylor級数は前節の形式解 $\sum_r\mathcal I_1(\phi_r)$ に一致する。
<!-- formal-statement-end -->

### 証明の見取り図

$h_2\mathcal R$ の双線形評価で小球への縮小性を得る。Picard反復は最初から $\partial$-閉な調和形式に始まり、補正補題のうち $\partial R=0$ と混合反交換性だけで $\partial$-閉性を維持する。反復の一様収束がパラメータの正則性を与える。

<!-- proof-start -->
### 証明

$T_b(a)=b-\frac12h_2\mathcal R(a,a)$ と置く。$\delta=\|b\|_{H^s}$、半径 $r=2\delta$ の閉球を取る。双線形評価により

$$
\|T_b(a)\|_{H^s}
\le\delta+\frac C2r^2
=\delta+2C\delta^2
\le2\delta=r
$$

が $2C\delta\le1$ で成り立つ。さらに二つの球内の点 $a,c$ に対し、次数1の括弧が対称であることから

$$
\begin{aligned}
\|T_b(a)-T_b(c)\|_{H^s}
&\le\frac C2\bigl(\|a\|_{H^s}+\|c\|_{H^s}\bigr)\|a-c\|_{H^s}\\
&\le2C\delta\|a-c\|_{H^s}.
\end{aligned}
$$

$2C\delta<1$ なら縮小写像原理により唯一の小解が存在する。反復を

$$
a^{(0)}=b,\qquad a^{(k+1)}=T_b(a^{(k)})
$$

とする。調和 $b$ は $\partial b=0$ である。$\partial a^{(k)}=0$ なら[Tian–Todorov核心恒等式](../DEF1-09/index.md#thm-def1-09-tian-todorov)によって $\mathcal R(a^{(k)})$ は $\partial$-完全である。[混合随伴反交換子](../../HOD/HOD1-05/index.md#lem-hod1-05-mixed-adjoints)を使うと

$$
\partial a^{(k+1)}
=-\frac12\partial h_2\mathcal R(a^{(k)})
=\frac12 h'_2\partial\mathcal R(a^{(k)})=0.
$$

従って全反復とその極限は $\partial$-閉である。$H_1h_2=0$ は $h_2$ の像が $\bar\partial^*$-完全で調和空間に直交することから分かる。また $(\bar\partial^*)^2=0$ より $\bar\partial^*h_2=0$。したがって $H_1a=b$、$\bar\partial^*a=0$。

有限次元の $t$ に関し、各反復は連続複素双線形写像の合成であるため多項式的かつ正則である。小さめのパラメータ閉球で縮小係数を一様に $q<1$ と取ると、反復差のノルムは初項の差の $q^k$ 倍以下となる。ゆえに一様極限は複素Banach空間値正則写像である（複素直線への制限とCauchy積分公式で確かめられる）。固定点式の同次次数 $r$ を比較すると

$$
a_1=b,\qquad
a_r=-\frac12h_2\sum_{i+j=r}\mathcal R(a_i,a_j),
$$

となり、前節の再帰式と一致する。$\square$
<!-- proof-end -->

**一方向の収束半径。** $b=\varepsilon b_0$、$M=\|b_0\|_{H^s}>0$ に対し、Taylor係数ノルムを支配する数列を

$$
A_1=M,\qquad A_r=\frac C2\sum_{i+j=r}A_iA_j
$$

と置く。その母関数 $A(w)=\sum_{r\ge1}A_rw^r$ は $A=Mw+\frac C2A^2$ を満たす。$A(0)=0$ の枝を選んで

$$
A(w)=\frac{1-\sqrt{1-2CMw}}{C},
\qquad |w|<(2CM)^{-1}
$$

となる。これは形式係数を絶対値で支配する独立の収束検算である。$M=0$ なら全係数が零になる。複数方向では $Mw$ の代わりに $\sum_\nu |t_\nu|\|b_\nu\|_{H^s}$ を用いる。

## 5. 収束解の曲率は本当に零か

固定点を解いたこととMaurer–Cartan方程式は同じではない。一般のKuranishi構成では、調和障害が残る可能性がある。本章では、固定点解の $\partial$-閉性からその調和障害を**自動的に零**にできる。

$a=a(t)$、$\phi=\mathcal I_1^{-1}a$ とし、接束値曲率 $F_T$ と収縮した曲率 $F$ を

$$
F_T=d\phi+\frac12[\phi,\phi],
\qquad
F=\mathcal I_2(F_T)
=\bar\partial a+\frac12\mathcal R(a)
$$

と置く。固定点方程式と[Green分解式](#eq-def1-10-green-homotopy)から

$$
\begin{aligned}
F
&=-\frac12\bar\partial h_2\mathcal R(a)
  +\frac12\mathcal R(a)\\
&=\frac12H_2\mathcal R(a)
  +\frac12h_3\bar\partial\mathcal R(a).
\end{aligned}
$$

$\partial a=0$ なので、Tian–Todorov恒等式で $\mathcal R(a)=-\partial B_\Omega(\phi,\phi)$。そのため $H_2\mathcal R(a)=0$ である。

[Maurer–Cartan曲率のBianchi恒等式](../DEF1-05/index.md#lem-def1-05-bianchi)と[接束値Dolbeault複体の括弧恒等式](../DEF1-05/index.md#lem-def1-05-graded-identities)を $F_T$ に適用する。$d[\phi,\phi]=2[d\phi,\phi]$、$[[\phi,\phi],\phi]=0$ なので

$$
\begin{aligned}
\bar\partial\mathcal R(a)
&=\mathcal I_3(d[\phi,\phi])
=2\mathcal I_3([d\phi,\phi])\\
&=2\mathcal I_3([F_T,\phi])
-\mathcal I_3([[\phi,\phi],\phi])
=2\mathcal I_3([F_T,\phi]).
\end{aligned}
$$

従って曲率自身の方程式

$$
F=h_3\mathcal I_3([\mathcal I_2^{-1}F,\phi])
$$

を得る。右辺の括弧は $F\in H^{s-1}$ に一階微分を掛けるので、[Sobolev積評価とGreenの回復](../DEF1-07/index.md#lem-def1-07-sobolev-estimate)を次数2・3に適用して

$$
\|F\|_{H^{s-1}}
\le C_1\|a\|_{H^s}\|F\|_{H^{s-1}}.
$$

ここで $s-2>n$ だから積の制御ができる。$t$ を小さくして $C_1\|a\|_{H^s}<1$ とすれば、上の不等式は $\|F\|_{H^{s-1}}=0$ を強制する。つまり

$$
\boxed{\ d\phi+\frac12[\phi,\phi]=0\ }.
$$

複素次元 $n=2$ では $(0,3)$ 形式が零だから $h_3=0$ となり、同じ結論はもっと直接に従う。これは**形式的障害消滅**を、収束する解の**実際の可積分性**へ引き上げた部分である。

## 6. 局所基底が滑らかになる理由

最後に、解が各パラメータで存在することから、Kuranishiの解析空間が滑らかで非被約成分も持たないことを導く。ここには前章の収縮恒等式だけでなく、[Kuranishi族の半普遍性](../DEF1-08/index.md#thm-def1-08-semiuniversal)が必要である。

<a id="thm-def1-10-btt-smooth"></a>

<!-- formal-statement-start -->
> **定理（Calabi–Yauの非障害性と滑らかなKuranishi基底）**
>
> $X$ を複素次元 $n\ge2$ のコンパクトKähler多様体とし、$K_X\simeq\mathcal O_X$ とする。$m=\dim_\mathbb C H^1(X,T_X)$ とすると、原点近傍の $\mathbb C^m$ 上に $X$ の基点付き正則変形族があり、そのKodaira–Spencer写像は

$$
T_0\mathbb C^m\xrightarrow{\ \simeq\ }H^1(X,T_X)
$$

> である。さらに[解析的Kuranishi障害写像](../DEF1-07/index.md#def-def1-07-analytic-kuranishi-map)は原点で零の正則写像の芽となり、[Kuranishi基底](../DEF1-07/index.md#def-def1-07-kuranishi-germ)は非被約構造も含めて滑らかな $m$ 次元複素空間の芽である。$H^2(X,T_X)=0$ は必要ない。
<!-- formal-statement-end -->

### 証明の見取り図

収束解を滑らかな可積分Beltrami微分へ高め、パラメータにも正則に依存する族を作る。接写像が恒等であるため、Kuranishi半普遍性が与える基底変更を標準座標へ埋め込むと原点で局所的に可逆になる。障害写像は開集合で零となり、**零点集合だけでなく正則方程式そのもの**が零だと分かる。

<!-- proof-start -->
### 証明

第4節の収束解 $\phi(t)=\mathcal I_1^{-1}a(t)$ は $H^s$ に属し、$H^s\hookrightarrow C^1$ である。第5節でMC曲率の消滅を示した。$\bar\partial^*a=0$ と合わせて、一次の楕円型作用素

$$
D=\bar\partial\oplus\bar\partial^*:
\mathcal A^{n-1,1}\longrightarrow
\mathcal A^{n-1,2}\oplus\mathcal A^{n-1,0}
$$

に対する方程式

$$
Da=\bigl(-\mathcal R(a)/2,\,0\bigr)
$$

を得る。$\mathcal R(a)$ は局所的に $a\,\partial a$ と滑らかな係数の零階項の和である。右辺の一階微分を左辺へ移すと、$D$ の主部に係数 $O(a)$ の摂動を加えた一階系となる。

ここで[小さい可積分解の楕円型正則性](../DEF1-07/index.md#lem-def1-07-elliptic-bootstrap)の**証明に使った差分商法**を、スカラー値形式 $a$ に適用する。既習補題の接束値ゲージ $\bar\partial_T^*\phi=0$ と本章のスカラー値ゲージ $\bar\partial^*a=0$ は同一ではない。一般のKähler計量では $\mathcal I_1$ は随伴と可換とは限らないので、後者から前者を推論しない。その代わり、上で定めたスカラー値の $D=\bar\partial\oplus\bar\partial^*$ の主記号は、非零の実共変ベクトル $\xi$ に対して外積と随伴縮約の組であり、

$$
\|\sigma_D(\xi)v\|^2=|\xi^{0,1}|^2\|v\|^2
$$

を満たす。従って $D$ は楕円型一階系であり、同じ差分商の議論をこの系に直接適用できる。

以下、局所実座標 $x=(x^1,\ldots,x^{2n})$ と多重指数 $\alpha\in\mathbb N_0^{2n}$ に対し、$D_x^\alpha=\partial_{x^1}^{\alpha_1}\cdots\partial_{x^{2n}}^{\alpha_{2n}}$ と書く。これは形式上の演算子 $\partial$ とは別の、**空間座標の成分微分**であり、変形パラメータ $t$ は固定する。$s>n+2$ と $\|a\|_{H^s}$ の小ささから $\|a\|_{C^1}$ も小さいため、局所化した高階評価では摂動主部

$$
O(a)\nabla(D_x^\alpha a)
$$

を左辺へ吸収できる。残る高階積の典型項は、$0<\beta\le\alpha$ と座標方向の単位多重指数 $e_j$ に対して

$$
(D_x^\beta a)(D_x^{\alpha-\beta+e_j}a)
$$

である。これらと滑らかな係数の微分を $H^{s-1}$ の積評価と一段前のノルムで制御し、$H^s\to H^{s+1}\to\cdots$ と反復すると、各 $a(t)$ は空間変数について滑らかになる。

パラメータの小閉球で同じ評価を一様に取れるので、$t$ に関する正則依存も各高階Sobolevノルムで維持できる。

$\phi(0)=0$ かつ $\|\phi(t)\|_{C^0}$ が小さいから、$\|\bar\phi\phi\|<1$ を満たす。このとき

$$
(I-\bar\phi\phi)^{-1}=\sum_{k=0}^{\infty}(\bar\phi\phi)^k
$$

は作用素ノルムで収束し、$\phi$ で定める $(0,1)$ 接空間のグラフと共役は直和になる。[Maurer–Cartan可積分性](../DEF1-03/index.md#thm-def1-03-maurer-cartan)と[Newlander–Nirenberg定理](../../CM/CM1-07/index.md#thm-cm1-07-newlander-nirenberg)により各点は複素構造になる。

パラメータに正則な相対座標を構成して貼り合わせる手順は[相対正則座標によるKuranishi族の構成](../DEF1-08/index.md#thm-def1-08-semiuniversal)の証明と同じである。上述の一様評価を使って基底方向にも収束させれば、$\mathbb C^m$ の小近傍 $U$ 上に正則変形族 $\mathcal X\to U$ を得る。

固定点方程式の二次項は $O(\|t\|^2)$ なので

$$
\phi(t)=\mathcal I_1^{-1}\!\left(\sum_\nu t_\nu b_\nu\right)+O(t^2).
$$

従って[Kodaira–Spencer写像の定義](../DEF1-01/index.md#def-def1-01-kodaira-spencer)による接写像は、選んだ調和基底に関して恒等写像となる。

[半普遍性](../DEF1-08/index.md#thm-def1-08-semiuniversal)から、Kuranishi基底 $K=\{\kappa=0\}\subset V\subset\mathbb C^m$ への正則基底変更 $f:(U,0)\to(K,0)$ が存在する。包含 $i:K\hookrightarrow V$ と合成した $g=i\circ f:U\to V$ の原点での微分は、[基底変更の接写像の一意性](../DEF1-08/index.md#prop-def1-08-tangent-unique)と両族のKodaira–Spencer同型から $Dg(0)=I_m$ となる。

よって[実多変数の逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)を $g$ の実部・虚部へ適用できる。$Dg(0)$ は複素線形な恒等写像だから実Jacobianも可逆であり、局所 $C^1$ 逆写像が存在する。逆写像の微分は $Dg$ の逆行列で複素線形なので、逆も正則である。従って十分小さい $U$ の像 $g(U)$ は $V$ 内の**開近傍**となる。

一方 $\kappa(g(t))=0$ は全 $t\in U$ で成り立つから、$\kappa$ の各正則成分はこの開近傍上で恒等的に零。したがって原点での正則関数の芽として $\kappa=0$ である。定義イデアルも零なので、解析空間の構造環は $\mathbb C\{t_1,\ldots,t_m\}$ そのものとなり、冪零元もない。$\square$
<!-- proof-end -->

**小さな模型。** 平坦複素トーラス $\mathbb C^n/\Lambda$ では調和Beltrami微分の係数を定数に取れる。よって $[\phi_1,\phi_1]=0$、全ての $\phi_r$（$r\ge2$）を零とでき、$\phi(t)=\phi_1(t)$ はすでに収束している。一方、$n\ge2$ のトーラスで $H^2(X,T_X)$ 自体は一般に非零である。BTTの結論は**障害を受ける空間が零**という意味ではなく、実際の障害写像が零という意味である。

**仮定の境界。** Kähler性がなければ、$H_2(\partial B)=0$ や $\partial h_2=-h'_2\partial$ を無条件に使えない。$\Omega$ が零になる場所があれば $\mathcal I_q^{-1}$ を構成できない。逆に複素次元 $1$ では $(0,2)$ 形式が零なので、$\Omega$ や本章の二重収縮なしでもMC方程式の二次項が零になり、変形の障害は生じない。さらに、滑らかな局所Kuranishi基底が得られても、異なる点のファイバーが必ず非同型とは限らず、自己同型による大域的な同一視は[普遍性の限界](../DEF1-08/index.md#prop-def1-08-universality)と区別する。

## 7. 演習――補正・収束・滑らかさを結ぶ

### Level A：各段階の具体計算

<a id="ex-def1-10-a01"></a>
#### DEF1-10-A01 ホモトピーの型を追う
- Level: A

複素次元 $n=3$ で $u\in\mathcal A^{2,2}(X)$ とする。$G_2u$、$h_2u$、$\partial h_2u$ の型を書け。

さらに $\partial u=0$ なら最後が零になる理由をKähler恒等式で示せ。

<!-- solution-start -->
**詳細解答。** $G_2$ は型を変えないので $G_2u$ は $(2,2)$。$\bar\partial^*$ は反正則次数を1下げるので $h_2u$ は $(2,1)$、$\partial h_2u$ は $(3,1)$ である。

[混合随伴反交換子](../../HOD/HOD1-05/index.md#lem-hod1-05-mixed-adjoints)と[Greenの可換性](../../HOD/HOD1-06/index.md#thm-hod1-06-dolbeault-harmonic)により

$$
\partial h_2u
=\partial\bar\partial^*G_2u
=-\bar\partial^*\partial G_2u
=-\bar\partial^*G'_2(\partial u)=0.
$$

この最後の零は $\bar\partial u=0$ からではなく、与えられた $\partial u=0$ から従う。
<!-- solution-end -->

<a id="ex-def1-10-a02"></a>
#### DEF1-10-A02 調和射影が消える理由
- Level: A

コンパクトKähler多様体上の $(n-1,2)$ 型形式 $R=-\partial B$（$B$ は滑らかな $(n-2,2)$ 型）について、$H_2R=0$ を内積で証明せよ。

<!-- solution-start -->
**詳細解答。** 任意の $\bar\partial$-調和 $(n-1,2)$ 型形式 $v$ を取る。[Laplacian一致](../../HOD/HOD1-05/index.md#thm-hod1-05-laplacian-equality)で $v$ は $\partial$-調和でもあり、$\|\partial^*v\|^2\le\langle\Delta_\partial v,v\rangle=0$ から $\partial^*v=0$。境界がないので随伴を使えて

$$
\langle R,v\rangle=-\langle\partial B,v\rangle
=-\langle B,\partial^*v\rangle=0.
$$

調和空間のすべての $v$ と直交することは、直交射影 $H_2R$ が零であることと同値である。
<!-- solution-end -->

<a id="ex-def1-10-a03"></a>
#### DEF1-10-A03 二次係数の符号
- Level: A

$a_1=b$ が $\partial$・$\bar\partial$ ともに閉であるとする。$\phi_1=\mathcal I_1^{-1}b$、$R_2=\mathcal I_2([\phi_1,\phi_1])$ と置く。二次補正 $a_2$ を書き、$\bar\partial a_2=-R_2/2$ を確認せよ。

<!-- solution-start -->
**詳細解答。** $d\phi_1=0$ である。[接束値Dolbeault複体の括弧恒等式](../DEF1-05/index.md#lem-def1-05-graded-identities)を使うと $\bar\partial R_2=0$。また[Tian–Todorov核心恒等式](../DEF1-09/index.md#thm-def1-09-tian-todorov)で $R_2$ は $\partial$-完全、よって $H_2R_2=0$。$a_2=-h_2R_2/2$ と置き、[Green分解式](#eq-def1-10-green-homotopy)を適用すると

$$
\bar\partial a_2
=-\frac12(R_2-H_2R_2-h_3\bar\partial R_2)
=-\frac12R_2.
$$

同時に[補正補題](#lem-def1-10-preserving-correction)で $\partial a_2=-\partial h_2R_2/2=0$。従って $d\phi_2=-[\phi_1,\phi_1]/2$ となる。
<!-- solution-end -->

<a id="ex-def1-10-a04"></a>
#### DEF1-10-A04 小球の縮小係数
- Level: A

連続対称双線形写像 $Q$ が $\|Q(u,v)\|\le C\|u\|\|v\|$ を満たすとき、$T_b(a)=b-Q(a,a)/2$ を半径 $2\delta$、$\delta=\|b\|$ の球で考える。縮小係数を計算せよ。

<!-- solution-start -->
**詳細解答。** 双線形性から $Q(a,a)-Q(c,c)=Q(a-c,a)+Q(c,a-c)$。従って

$$
\begin{aligned}
\|T_b(a)-T_b(c)\|
&\le\frac C2(\|a\|+\|c\|)\|a-c\|\\
&\le2C\delta\|a-c\|.
\end{aligned}
$$

自己写像性は $\|T_b(a)\|\le\delta+2C\delta^2\le2\delta$ から、$2C\delta\le1$ で従う。縮小には厳密不等式 $2C\delta<1$ が必要である。
<!-- solution-end -->

<a id="ex-def1-10-a05"></a>
#### DEF1-10-A05 複素曲線では何が不要か
- Level: A

複素次元1のコンパクト複素曲線 $X$ について、$\mathcal A^{0,2}(X,T_X)=0$ からMC方程式がどう簡約されるかを示し、本章の $B_\Omega$ を使う必要がない理由を述べよ。

<!-- solution-start -->
**詳細解答。** 局所の反正則1形式は $d\bar z$ の倍数なので、二本の外積は $d\bar z\wedge d\bar z=0$。従って $d\phi\in\mathcal A^{0,2}(T_X)$ も $[\phi,\phi]\in\mathcal A^{0,2}(T_X)$ も零であり、MC方程式は恒等的に満たされる。$B_\Omega$ の出力は $(n-2,2)=(-1,2)$ 型となって定義できないが、障害が型の理由だけで消えるため不要である。小さいグラフの直和条件は別途確認する。
<!-- solution-end -->

### Level B：二つ以上の主張を接続する

<a id="ex-def1-10-b01"></a>
#### DEF1-10-B01 三次補正とJacobi恒等式
- Level: B

$d\phi_1=0$、$d\phi_2=-[\phi_1,\phi_1]/2$、各 $\mathcal I_1(\phi_i)$ は $\partial$-閉とする。$R_3$ を計算し、その $\bar\partial$-閉性を導いて $\phi_3$ を構成せよ。

<!-- solution-start -->
**詳細解答。** 順序付き和には $(1,2),(2,1)$ があり、次数1括弧は対称なので

$$
R_3=2\mathcal I_2([\phi_1,\phi_2]).
$$

[接束値Dolbeault複体の括弧恒等式](../DEF1-05/index.md#lem-def1-05-graded-identities)を用い、$d\phi_1=0$ を代入すると

$$
d[\phi_1,\phi_2]
=[d\phi_1,\phi_2]-[\phi_1,d\phi_2]
=\frac12[\phi_1,[\phi_1,\phi_1]]=0.
$$

最後は[接束値Dolbeault複体の括弧恒等式](../DEF1-05/index.md#lem-def1-05-graded-identities)の次数付きJacobiの帰結である。収縮が $\bar\partial$ と可換だから $\bar\partial R_3=0$。また入力が $\partial$-閉なので、[Tian–Todorov核心恒等式](../DEF1-09/index.md#thm-def1-09-tian-todorov)により $R_3$ は $\partial$-完全となる。[補正補題](#lem-def1-10-preserving-correction)で

$$
\phi_3=-\frac12\mathcal I_1^{-1}(h_2R_3)
=-\mathcal I_1^{-1}h_2\mathcal I_2([\phi_1,\phi_2])
$$

と置けば $d\phi_3=-[\phi_1,\phi_2]$、収縮後の $\partial$-閉性も維持される。
<!-- solution-end -->

<a id="ex-def1-10-b02"></a>
#### DEF1-10-B02 混合反交換性が失われたら
- Level: B

滑らかな $(n-1,2)$ 型形式 $R$ が $\bar\partial R=0$、$R=-\partial B$ を満たす。コンパクトKähler性の下で $a=-h_2R/2$ の二つの微分を計算せよ。Kähler性を仮定しない場合、どの等式をそのまま使用できないか特定せよ。

<!-- solution-start -->
**詳細解答。** KählerのLaplacian一致から $\partial^*v=0$ が調和 $v$ に対して成り立つため、演習A02より $H_2R=0$。[Green分解式](#eq-def1-10-green-homotopy)で

$$
\bar\partial a
=-\tfrac12(R-H_2R-h_3\bar\partial R)
=-\tfrac12R.
$$

一方、$\partial R=-\partial^2B=0$ と[混合反交換子](../../HOD/HOD1-05/index.md#lem-hod1-05-mixed-adjoints)から $\partial a=\tfrac12h'_2\partial R=0$。一般Hermite計量では $\Delta_\partial=\Delta_{\bar\partial}$ が成立するとは限らず、$\partial G_2=G'_2\partial$ も $\partial\bar\partial^*=-\bar\partial^*\partial$ もそのまま転用できない。したがって $\partial h_2R=0$ と、$\partial$-完全形式の調和射影が零という段階が保証されない。
<!-- solution-end -->

<a id="ex-def1-10-b03"></a>
#### DEF1-10-B03 優級数を解く
- Level: B

$A_1=M>0$、$A_r=\frac C2\sum_{i+j=r}A_iA_j$（$r\ge2$、$C>0$）とする。$A_2,A_3$ を求め、母関数の収束半径を判定せよ。

<!-- solution-start -->
**詳細解答。** $A_2=(C/2)M^2$。三次は $(1,2),(2,1)$ の二項なので

$$
A_3=\frac C2(2MA_2)
=CM\cdot\frac C2M^2
=\frac{C^2M^3}{2}.
$$

$A(w)=\sum_{r\ge1}A_rw^r$ と置くと $A=Mw+\frac C2A^2$。二次方程式を解き、$A(0)=0$ を満たす枝を選べば

$$
A(w)=\frac{1-\sqrt{1-2CMw}}C.
$$

平方根の最近接分岐点は $w=(2CM)^{-1}$ なので、原点まわりのTaylor級数の収束半径は $(2CM)^{-1}$。非負係数の優級数で元の形式係数を支配すれば、少なくともこの半径内で収束する。
<!-- solution-end -->

<a id="ex-def1-10-b04"></a>
#### DEF1-10-B04 台集合の滑らかさだけでは足りない
- Level: B

$\kappa:V\subset\mathbb C^m\to\mathbb C^r$ を原点近くの正則写像とする。正則写像 $f:U\subset\mathbb C^m\to\{\kappa=0\}$ があり、$D(i\circ f)(0)=I_m$（$i$ は包含）と仮定する。なぜ定義イデアルが原点で零になるか示し、$\kappa(w)=w^2$ の一点台集合との違いを説明せよ。

<!-- solution-start -->
**詳細解答。** $g=i\circ f$ は $\mathbb C^m$ 間の正則写像で、Jacobian行列 $Dg(0)=I_m$ は可逆。[実多変数の逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)と複素線形微分の逆行列の複素線形性から正則な局所逆が存在し、$g(U')$ は $V$ 内の原点の開近傍になるよう $U'$ を縮小できる。

$g(U')\subset\{\kappa=0\}$ だから、$\kappa$ の各成分は開集合 $g(U')$ 上で零。従って正則関数の芽としてすべて零であり、生成イデアル $(\kappa_1,\ldots,\kappa_r)=(0)$。商環は $\mathbb C\{z_1,\ldots,z_m\}$ で冪零元を持たない。

対して $\kappa(w)=w^2$ は台集合が一点でも、局所環 $\mathbb C\{w\}/(w^2)$ に非零の冪零元 $[w]$ が残る。台集合だけの議論では前者の強い結論を得られない。
<!-- solution-end -->

### Level C：構成の全体を再現する

<a id="ex-def1-10-c01"></a>
#### DEF1-10-C01 二次・三次から解析的非障害性へ
- Level: C

$X$ を複素次元 $n\ge2$ のコンパクトKähler多様体で $K_X\simeq\mathcal O_X$ とする。零にならない正則体積形式 $\Omega$、スカラー値形式の調和射影 $H_q$、Green作用素 $G_q$ を固定する。$\partial b=\bar\partial b=0$ なる小さい調和形式 $b\in\mathcal A^{n-1,1}$ を取り、$\phi_1=\mathcal I_1^{-1}b$ とする。

1. 二次と三次の補正係数を $\mathcal I_q$ と $h_2=\bar\partial^*G_2$ で書き、$\partial$-閉性を確認せよ。
2. $\mathcal R(a)=\mathcal I_2([\mathcal I_1^{-1}a,\mathcal I_1^{-1}a])$ として固定点方程式を書き、Sobolev評価による縮小条件を示せ。
3. 固定点解の曲率 $F=\bar\partial a+\mathcal R(a)/2$ を零とする不等式を導け。
4. 収束する正則変形族がKodaira–Spencer同型を持つとき、Kuranishi障害写像が正則関数の芽として零になる論理を示せ。

<!-- solution-start -->
**詳細解答。**

**(1)** $R_2=\mathcal I_2([\phi_1,\phi_1])$ とする。$\partial b=0$ なので[Tian–Todorov核心恒等式](../DEF1-09/index.md#thm-def1-09-tian-todorov)で $R_2$ は $\partial$-完全。$d\phi_1=0$ により $\bar\partial R_2=0$。したがって

$$
a_2=-\tfrac12h_2R_2,\qquad \phi_2=\mathcal I_1^{-1}a_2
$$

と取ると、$\bar\partial a_2=-R_2/2$、$\partial a_2=0$。三次の順序付き括弧和は $R_3=2\mathcal I_2([\phi_1,\phi_2])$。[接束値Dolbeault複体の括弧恒等式](../DEF1-05/index.md#lem-def1-05-graded-identities)から $\bar\partial R_3=0$、再び[Tian–Todorov核心恒等式](../DEF1-09/index.md#thm-def1-09-tian-todorov)で $\partial$-完全なので

$$
a_3=-\tfrac12h_2R_3=-h_2\mathcal I_2([\phi_1,\phi_2]).
$$

[補正補題](#lem-def1-10-preserving-correction)により $\bar\partial a_3=-R_3/2$、$\partial a_3=0$。これで係数 $1/2$ と二つの順序の打消しも確認した。

**(2)** $a=b-\frac12h_2\mathcal R(a)$ とする。$s>n+2$ のSobolev指数に対して $h_2\mathcal R$ は $H^s\times H^s\to H^s$ の有界双線形写像で、$\|h_2\mathcal R(u,v)\|\le C\|u\|\|v\|$。[Green評価](../../GA/GA6/index.md#lem-ga6-elliptic)が括弧で失った一階を回復する。$\delta=\|b\|$、半径 $2\delta$ の閉球では

$$
\|T_b(a)\|\le\delta+2C\delta^2,\qquad
\|T_b(a)-T_b(c)\|\le2C\delta\|a-c\|.
$$

よって $2C\delta<1$ なら縮小写像で収束し、各反復が正則なので極限もパラメータに正則である。

**(3)** $\partial a=0$ は反復で維持されるから、$\mathcal R(a)=-\partial B_\Omega(\phi,\phi)$ となり $H_2\mathcal R(a)=0$。[Green分解式](#eq-def1-10-green-homotopy)から

$$
F=\tfrac12h_3\bar\partial\mathcal R(a).
$$

[Maurer–Cartan曲率のBianchi恒等式](../DEF1-05/index.md#lem-def1-05-bianchi)を用いると $\bar\partial\mathcal R(a)=2\mathcal I_3([\mathcal I_2^{-1}F,\phi])$ なので

$$
\|F\|_{H^{s-1}}\le C_1\|a\|_{H^s}\|F\|_{H^{s-1}}.
$$

$a$ を十分小さくして係数を1未満にすれば $F=0$。ここで最初から $F=0$ を仮定していない点が重要である。

**(4)** 小さいMC解は、スカラー値ゲージ $\bar\partial^*a=0$ と楕円型一階系 $D=\bar\partial\oplus\bar\partial^*$ の主記号評価によって滑らかになる。接束値ゲージ $\bar\partial_T^*\phi=0$ を仮定し直す必要はない。パラメータ $t$ に正則な相対座標の構成から $U\subset\mathbb C^m$ 上の正則族を得る。一次係数は $a=b+O(b^2)$ だから、Kodaira–Spencer写像は恒等である。

[Kuranishi半普遍性](../DEF1-08/index.md#thm-def1-08-semiuniversal)が基底変更 $f:U\to K$ を与える。$K\subset V\subset\mathbb C^m$ の包含を $i$ と書くと、合成 $g=i\circ f$ は

$$
Dg(0)=I_m
$$

を満たし、局所正則逆を持つ。$\kappa\circ g=0$ が原点の開近傍で成り立つので、$\kappa$ は正則関数の芽として零。従って $K$ の構造環は $\mathbb C\{t_1,\ldots,t_m\}$ となり、局所基底は非被約構造も含めて滑らかである。
<!-- solution-end -->
