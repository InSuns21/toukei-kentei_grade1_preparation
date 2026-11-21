# GBG6 接空間を水平と垂直に分けるには

[GBG5 のゲージ変換](../GBG5/index.md#def-gbg5-gauge-automorphism)は主束の点を同じファイバー内で動かす。しかし、主束上の接ベクトルには、**ファイバーに沿って動く方向**と、**基底の点を動かす方向**が同時に含まれている。後者を指定して前者を余分に動かさないようにするには、何を選べばよいだろうか。

まず射影の微分で消える方向を「垂直」とし、Lie 群の作用からその方向を全部作る。次に、基底の接ベクトルを一意に持ち上げるため、垂直方向を補う「水平」部分空間を各点で選ぶ。右主束では、同じファイバーの別の基準点で水平の意味が変わらないよう、右作用との整合性も課す。この選択が次講の接続1形式の出発点になる。

本講では $M$ を Hausdorff・第二可算な境界のない有限次元滑らかな多様体、$G$ を有限次元 Lie 群、$\pi:P\to M$ を[滑らかな右主 $G$ 束](../GBG2/index.md#def-gbg2-principal-bundle)とする。$\mathfrak g=T_eG$ と書く。接空間と写像の微分は [GEO2 の定義](../../GEO/GEO2/index.md#def-geo2-tangent-derivation)、[微分の定義](../../GEO/GEO2/index.md#def-geo2-differential)を用いる。[Lie 群の指数写像](../../../代数系/LIE/LIE2/index.md#def-lie2-exponential-map)は $\exp(t\xi)$ と書き、$R_g:P\to P$ を $R_g(p)=pg$、$r_g:G\to G$ を $r_g(k)=kg$ とする。

<!-- definition-example-audit: strict -->

---

## 1. 射影に映らない方向が垂直方向

積主束 $P=M\times G$ なら、[積多様体の接空間](../../GEO/GEO2/index.md#prop-geo2-product-tangent)は
$$
T_{(x,k)}P\simeq T_xM\oplus T_kG
$$
となり、射影 $\pi(x,k)=x$ の微分は $(v,w)\mapsto v$ である。したがって $(0,w)$ は、点を動かしても基底の $x$ を一次の速さでは動かさない。一般の主束でも、この性質は座標なしで表せる。

<a id="def-gbg6-vertical-space"></a>

<!-- formal-statement-start -->
> **定義（垂直接空間と垂直分布）**  
> 滑らかな右主 $G$ 束 $\pi:P\to M$ と $p\in P$ に対し、射影の微分で零へ送られる接ベクトルの集合
$$
V_pP:=\ker(d\pi_p:T_pP\to T_{\pi(p)}M)
$$
> を **垂直接空間** という。$V_pP$ を各 $p$ で集めた部分束 $VP\subseteq TP$ を **垂直分布** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg6-vertical-space -->
**定義の確認**。$P=\mathbb R\times GL(2,\mathbb R)$、$p=(x,K)$ を取る。$T_KG$ は行列空間 $M_2(\mathbb R)$ と同一視でき、$d\pi_{(x,K)}(v,W)=v$ だから
$$
V_{(x,K)}P=\{(0,W):W\in M_2(\mathbb R)\}.
$$
任意の $(0,W)$ は射影で $0$ へ移り、逆に射影で $0$ となる $(v,W)$ は $v=0$ なので、核の両方向を確かめた。$VP$ はここでは定数階数 $4$ の滑らかな部分束である。
<!-- definition-example-end -->

一般にも[主束の局所自明化](../GBG3/index.md#thm-gbg3-section-trivialization)では $\pi$ が $(x,k)\mapsto x$ になるため、$d\pi_p$ は全射であり、その核の次元は常に $\dim G$ である。よって $VP$ は滑らかな部分束になる。垂直方向は主束が与えられれば自動的に決まり、追加の選択は要らない。

## 2. Lie 環の元で垂直方向をすべて作る

Lie 環 $\mathfrak g$ の $\xi$ は、[指数写像](../../../代数系/LIE/LIE2/index.md#def-lie2-exponential-map)により群の曲線 $t\mapsto\exp(t\xi)$ を作る。これを $p$ の右側から作用させると、$\pi(p\exp(t\xi))=\pi(p)$ だからファイバーの中だけを走る。曲線の速度が $\xi$ に対応する垂直接ベクトルとなる。

<a id="def-gbg6-fundamental-field"></a>

<!-- formal-statement-start -->
> **定義（基本ベクトル場）**  
> 滑らかな右主 $G$ 束 $P\to M$ と $\xi\in\mathfrak g=T_eG$ に対して、各 $p\in P$ で
$$
\xi_P(p):=\left.\frac{d}{dt}\right|_{t=0}p\exp(t\xi)\in T_pP
$$
> と定める滑らかなベクトル場 $\xi_P$ を、$\xi$ の **基本ベクトル場** という。これは右作用から定める規約である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg6-fundamental-field -->
**定義の確認**。$G=GL(2,\mathbb R)$、$\xi=B=\left(\begin{smallmatrix}0&1\\0&0\end{smallmatrix}\right)$ とする。$B^2=0$ なので[行列指数との一致](../../../代数系/LIE/LIE2/index.md#thm-lie2-general-linear-exponential)から $\exp(tB)=I+tB$。$p=(x,K)$ では
$$
p\exp(tB)=(x,K+tKB),\qquad B_P(x,K)=(0,KB).
$$
$KB$ は $T_KG=M_2(\mathbb R)$ の元で、射影の微分が $(0,KB)$ を $0$ に送る。$K$ に滑らかに依存するから滑らかなベクトル場でもある。
<!-- definition-example-end -->

基本ベクトル場は、単なる垂直方向の一部ではない。すべての垂直方向を重複なく記述できる。

<a id="thm-gbg6-vertical-fundamental"></a>

<!-- formal-statement-start -->
> **定理（垂直接空間と Lie 環の同型）**  
> 有限次元 Lie 群 $G$ の滑らかな右主束 $\pi:P\to M$ について、任意の $p\in P$ における線形写像
$$
\iota_p:\mathfrak g\longrightarrow V_pP,\qquad
\xi\longmapsto\xi_P(p)
$$
> は同型である。さらに任意の $g\in G$ と $\xi\in\mathfrak g$ に対して
$$
(dR_g)_p(\xi_P(p))
=(\operatorname{Ad}_{g^{-1}}\xi)_P(pg)
$$
> が成立する。$\operatorname{Ad}$ は [LIE2 の随伴表現](../../../代数系/LIE/LIE2/index.md#def-lie2-adjoint-representation)である。
<!-- formal-statement-end -->

### 証明の見取り図

局所sectionで $p=s(x)k$ と書く。基本ベクトルは群座標では $\frac{d}{dt}k\exp(t\xi)$ だから、$T_eG\to T_kG$ の左平行移動の微分そのものになる。右作用で運ぶときは $g$ を指数曲線の右へ移すため、共役が現れる。

<!-- proof-start -->
### 証明

[局所sectionによる自明化](../GBG3/index.md#thm-gbg3-section-trivialization)を $x=\pi(p)$ の近くで取り、$p=s(x)k$ とする。この座標では
$$
(d\pi)_p(v,w)=v,\qquad V_pP\simeq\{0\}\oplus T_kG.
$$
$k\exp(t\xi)$ の $t=0$ での速度は $(d\ell_k)_e\xi$（$\ell_k(h)=kh$）だから
$$
\iota_p(\xi)=(0,(d\ell_k)_e\xi).
$$
左乗法 $\ell_k$ は逆写像 $\ell_{k^{-1}}$ を持つ微分同相であり、その微分は線形同型である。したがって $\iota_p$ は単射かつ $V_pP$ に全射である。これで次元の等式 $\dim V_pP=\dim\mathfrak g=\dim G$ も再確認できる。

次に右作用を曲線へ適用する。群の積と逆元を挿入して
$$
\begin{aligned}
R_g(p\exp(t\xi))
&=p\exp(t\xi)g\\
&=pg\bigl(g^{-1}\exp(t\xi)g\bigr)\\
&=pg\exp\bigl(t\operatorname{Ad}_{g^{-1}}\xi\bigr).
\end{aligned}
$$
最後の等号は[共役と指数写像の可換性](../../../代数系/LIE/LIE2/index.md#thm-lie2-conjugation-exponential)を $g^{-1}$ と $\xi$ に適用した。両辺を $t=0$ で微分する。左辺は[曲線の速度を送る微分](../../GEO/GEO2/index.md#prop-geo2-differential-curves)により $(dR_g)_p(\xi_P(p))$、右辺は定義により $(\operatorname{Ad}_{g^{-1}}\xi)_P(pg)$ であり、主張を得る。
<!-- proof-end -->

この式は **右移動に伴って Lie 環のラベルが随伴変換される**ことを表す。単に $(dR_g)\xi_P(p)=\xi_P(pg)$ とするのは、非可換群では一般に誤りである。

## 3. 基底の方向を戻す水平分布

任意の $v\in T_xM$ に対して $d\pi_p(u)=v$ となる $u\in T_pP$ は存在するが一意でない。実際、一つの $u$ に任意の $w\in V_pP$ を足しても $d\pi_p(u+w)=v$ である。そこで、各 $p$ で垂直接空間に交わらない補空間を選び、$u$ を一意にしたい。

同じファイバーの点 $p$ と $pg$ は群の右作用で対応する。両者で異なる規則を使うと、選んだ群座標によって持ち上げ方向が変わるので、右作用が水平空間を運ぶ条件も必要となる。

<a id="def-gbg6-horizontal-distribution"></a>

<!-- formal-statement-start -->
> **定義（右主束の水平分布）**  
> 滑らかな右主 $G$ 束 $\pi:P\to M$ における **水平分布**とは、各 $p\in P$ に滑らかに依存する部分空間 $H_pP\subset T_pP$ の族であって、次の二条件を満たすものをいう。
>
> **（H1）直和分解**：すべての $p\in P$ で
$$
T_pP=H_pP\oplus V_pP.
$$
>
> **（H2）右作用との同変性**：すべての $p\in P,\ g\in G$ で
$$
(dR_g)_p(H_pP)=H_{pg}P.
$$
> 「滑らか」とは $H=\bigcup_{p\in P}H_pP$ が $TP$ の滑らかな階数 $\dim M$ のベクトル部分束になることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg6-horizontal-distribution -->
**定義の確認**。積主束 $P=M\times G$ に対して
$$
H^0_{(x,k)}P:=\{(v,0):v\in T_xM\}
$$
を選ぶ。任意の $(v,w)\in T_xM\oplus T_kG$ は $(v,0)+(0,w)$ と一意に分かれ、水平と垂直の交わりは $0$ だけだから（H1）。$R_g(x,k)=(x,kg)$ の微分は
$$
(dR_g)_{(x,k)}(v,w)=(v,(dr_g)_kw)
$$
なので $(v,0)$ を $(v,0)$ へ送り、（H2）も満たす。積座標で $v$ 方向の一定階数部分束であるため滑らかさも成立する。
<!-- definition-example-end -->

<a id="prop-gbg6-horizontal-lift"></a>

<!-- formal-statement-start -->
> **命題（水平持ち上げと直和射影）**  
> $P\to M$ に水平分布 $H$ があるとき、任意の $p\in P$、$x=\pi(p)$ に対して
$$
d\pi_p|_{H_pP}:H_pP\longrightarrow T_xM
$$
> は線形同型である。したがって各 $v\in T_xM$ には一意な水平ベクトル $\operatorname{hor}_p(v)\in H_pP$ があり、$d\pi_p(\operatorname{hor}_p(v))=v$ となる。また
$$
T_pP=H_pP\oplus V_pP
$$
> に沿う線形射影 $\operatorname{pr}^{H}_p$、$\operatorname{pr}^{V}_p$ が存在し、右作用と可換である。
<!-- formal-statement-end -->

### 証明の見取り図

水平空間で $d\pi$ が零になるなら、そこは垂直との交わりなので零ベクトルに限る。全射性は接ベクトルを水平・垂直に分解して確認する。

<!-- proof-start -->
### 証明

$u\in H_pP$ とし $d\pi_p(u)=0$ とすると、[垂直接空間の定義](#def-gbg6-vertical-space)より $u\in V_pP$。したがって $u\in H_pP\cap V_pP=\{0\}$ であり、制限写像は単射である。

任意の $v\in T_xM$ を取る。主束の局所自明化によって $d\pi_p$ は全射だから、$d\pi_p(z)=v$ を満たす $z\in T_pP$ がある。（H1）からただ一通り $z=u+w$、$u\in H_pP,\ w\in V_pP$ と書ける。$d\pi_p(w)=0$ だから $d\pi_p(u)=v$。よって制限写像は全射でもあり、$\operatorname{hor}_p(v):=u$ は一意である。

各 $z=u+w$ に対して $\operatorname{pr}^H_p(z)=u$、$\operatorname{pr}^V_p(z)=w$ とすれば線形射影である。$\pi\circ R_g=\pi$ を微分すると $d\pi_{pg}(dR_g)_p=d\pi_p$ となり、$(dR_g)_p$ は $V_pP$ を $V_{pg}P$ へ送る。（H2）から $H_pP$ も $H_{pg}P$ へ送る。したがって分解の一意性により
$$
(dR_g)_p\operatorname{pr}^{H,V}_p
=\operatorname{pr}^{H,V}_{pg}(dR_g)_p
$$
が成り立つ。
<!-- proof-end -->

**点での水平持ち上げ**は接ベクトルを一つ選ぶ操作である。曲線全体を水平に持ち上げるには、時間ごとの水平ベクトルをつなぐ微分方程式を解く必要があり、存在一意性と輸送は GBG14 で扱う。

## 4. 積主束では水平分布を全部書き下せる

水平分布は積主束でも一意ではない。$M\times G$ の各 $(x,e)$ で、水平方向を $(v,0)$ から $(v,-b_x(v))$ に傾けてみよう。ここで $b_x:T_xM\to\mathfrak g$ は滑らかに変わる線形写像の族とする。ほかの $(x,k)$ で水平を定める際には、右作用との整合性が決め手となる。

<a id="thm-gbg6-product-horizontal"></a>

<!-- formal-statement-start -->
> **定理（積主束の水平分布の具体形）**  
> $P=M\times G$ を標準的な右主 $G$ 束とする。滑らかな線形写像族 $b_x:T_xM\to\mathfrak g$ に対して
$$
H^b_{(x,k)}P
:=\{(v,-(dr_k)_e b_x(v)):v\in T_xM\}
$$
> と定めると水平分布になる。逆に、$M\times G$ 上の任意の水平分布は、この形の $b$ から一意に得られる。$r_k(h)=hk$ は群の右乗法である。
<!-- formal-statement-end -->

### 証明の見取り図

各 $k$ でこれは $T_xM\to T_kG$ の線形写像のグラフだから垂直方向を補う。右乗法をもう一回適用しても $r_g\circ r_k=r_{kg}$ となるため、不変性が生じる。逆には単位元 $e$ でのグラフを調べればよい。

<!-- proof-start -->
### 証明

$dr_k$ は微分同相 $r_k$ の微分であるから可逆な線形写像であり、$(x,k)$ に滑らかに依存する。各 $(v,W)$ は
$$
(v,W)
=\bigl(v,-(dr_k)_e b_x(v)\bigr)
 +\bigl(0,W+(dr_k)_e b_x(v)\bigr)
$$
と分かれる。前者は $H^b$、後者は $V=\ker d\pi$ に属す。水平ベクトルが垂直なら第一成分 $v=0$ だから第二成分も $0$。これで（H1）と滑らかさを示した。

右から $g$ を作用させると
$$
\begin{aligned}
(dR_g)_{(x,k)}
\bigl(v,-(dr_k)_e b_x(v)\bigr)
&=\bigl(v,-(dr_g)_k(dr_k)_e b_x(v)\bigr)\\
&=\bigl(v,-(dr_{kg})_e b_x(v)\bigr),
\end{aligned}
$$
なので（H2）を満たす。

逆に任意の水平分布 $H$ を取る。[水平持ち上げの命題](#prop-gbg6-horizontal-lift)により、$(x,e)$ では各 $v$ に対する唯一の水平ベクトルが $(v,-b_x(v))$ と表せる。この第二成分は $T_eG=\mathfrak g$ にあり、持ち上げの線形性から $b_x$ は線形、部分束の滑らかさから $x$ に関しても滑らかである。（H2）を $(x,e)$ から $(x,k)$ への右作用に適用すると、そこでの水平空間は必ず上の $H^b$ となる。一意性も $(x,e)$ での値から従う。
<!-- proof-end -->

特に $G=GL(2,\mathbb R)$ では $T_KG=M_2(\mathbb R)$、$(dr_K)_I(B)=BK$ だから
$$
H^b_{(x,K)}P=\{(v,-b_x(v)K):v\in T_xM\}.
$$
これは **$K$ の左側に $b_x(v)$ が来る**式である。たとえば $M=\mathbb R$、$b_x(v)=vB$、$B=\left(\begin{smallmatrix}0&1\\0&0\end{smallmatrix}\right)$ なら
$$
H^b_{(x,K)}P=\{(v,-vBK):v\in\mathbb R\}.
$$
$K$ を $Kg$ に替えると、$-vBK$ は $-vBKg$ へ運ばれ、水平の規則が一致する。

対して $(v,-vKB)$ と定めたグラフは、$K=I$ では同じでも一般には（H2）を破る。実際 $g=\operatorname{diag}(2,1)$ に対して
$$
Bg=B,\qquad gB=2B,
$$
だから $I$ での $(1,-B)$ を右へ運んだ $(1,-Bg)$ は、$g$ での候補 $(1,-gB)$ と等しくない。**直和分解だけでは接続に必要な水平分布にはならない**ことが、この非可換例から分かる。

## 5. 局所sectionは水平分布を局所的に作る

[GBG3 の局所section](../GBG3/index.md#def-gbg3-local-section) $s:U\to P$ があれば、$ds_x(v)$ は $d\pi_{s(x)}ds_x(v)=v$ を満たす。そこで $s(x)$ での水平方向を $ds_x(T_xM)$ と決め、同じファイバーのほかの点へ右作用で運ぶ。これはひとつの局所的な水平分布を作る具体的方法である。

<a id="prop-gbg6-section-horizontal"></a>

<!-- formal-statement-start -->
> **命題（局所sectionから誘導される水平分布）**  
> $s:U\to P$ を滑らかな局所sectionとする。$p=s(x)k$ と一意に表したとき
$$
H^s_pP:=(dR_k)_{s(x)}\bigl(ds_x(T_xM)\bigr)
$$
> と定めると、$\pi^{-1}(U)$ 上で滑らかな水平分布となる。ただし二つの異なる局所sectionから作った分布が、重なりで必ず一致するとは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

$\pi\circ s=\operatorname{id}_U$ を微分して $d\pi\,ds=\operatorname{id}$ を得る。これで $ds$ の像は垂直と交わらず、次元も $\dim M$ になる。右作用への整合性は $R_g\circ R_k=R_{kg}$ で確認する。

<!-- proof-start -->
### 証明

[多様体上の連鎖律](../../GEO/GEO2/index.md#thm-geo2-chain-rule)を $\pi\circ s=\operatorname{id}_U$ に適用すると
$$
d\pi_{s(x)}\circ ds_x=\operatorname{id}_{T_xM}.
$$
したがって $ds_x$ は単射で、その像と $V_{s(x)}P=\ker d\pi_{s(x)}$ の交わりは $0$。局所自明化では $\dim T_{s(x)}P=\dim M+\dim G$、$\dim V_{s(x)}P=\dim G$ だから二つの空間は直和で $T_{s(x)}P$ を張る。

右作用は $\pi\circ R_k=\pi$ を満たす微分同相なので、$(dR_k)_{s(x)}$ はこの直和を $p=s(x)k$ に運び、垂直空間も垂直空間へ送る。さらに $R_g\circ R_k=R_{kg}$ を微分すれば
$$
(dR_g)_p(H^s_pP)=H^s_{pg}P.
$$
[sectionの局所自明化](../GBG3/index.md#thm-gbg3-section-trivialization)で $H^s$ は $(v,0)$ のグラフだから滑らかである。よって水平分布の全条件が成立する。
<!-- proof-end -->

例えば $P=\mathbb R\times GL(2,\mathbb R)$ とし、$s_0(x)=(x,I)$ なら $H^{s_0}_{(x,K)}=\{(v,0)\}$ である。他方 $B^2=0$ の行列 $B$ を取り、$s_1(x)=(x,I+xB)$ とすれば $I+xB$ はすべての $x$ で可逆で、$s_1$ は滑らかな大域sectionである。その微分から
$$
H^{s_1}_{(x,K)}
=\{(v,vB(I+xB)^{-1}K)\}
=\{(v,vBK)\}
$$
を得る（$B(I+xB)^{-1}=B$）。$B\ne0$ なら $H^{s_0}\ne H^{s_1}$ である。

同じ束に二つの水平分布が作れた。**座標の表示を替えること**と、**別の水平分布を選ぶこと**は違う。大域的な水平分布を局所的な式で表す場合は、パッチ間で同一の部分空間を記述しているかを確かめる必要がある。次講ではその分布を Lie 環値の接続1形式で符号化し、続く GBG8 で局所表示の変換を導く。

---

## 6. 演習と詳細解答

### Level A：定義と行列の向きを自分で確かめる

<a id="ex-gbg6-a01"></a>
#### GBG6-A01 射影の核を求める
- Level: A

$P=\mathbb R^2\times U(1)$、$\pi((x,y),z)=(x,y)$ とする。$T_zU(1)=iz\mathbb R$ を用いて、$d\pi$ と $V_{((x,y),z)}P$ を求め、その実次元を示せ。

<!-- solution-start -->
**詳細解答**。[積接空間](../../GEO/GEO2/index.md#prop-geo2-product-tangent)により接ベクトルは $(v_1,v_2,izt)$、$v_1,v_2,t\in\mathbb R$ と書ける。射影の座標表示は第一・第二成分の取り出しだから
$$
d\pi_{((x,y),z)}(v_1,v_2,izt)=(v_1,v_2).
$$
核に属する必要十分条件は $v_1=v_2=0$。従って
$$
V_{((x,y),z)}P=\{(0,0,izt):t\in\mathbb R\}
$$
であり、$z\ne0$ だから $t\mapsto izt$ は単射で、実次元は $1=\dim U(1)$ である。
<!-- solution-end -->

<a id="ex-gbg6-a02"></a>
#### GBG6-A02 基本ベクトルの右移動
- Level: A

$G=GL(2,\mathbb R)$、$B=\left(\begin{smallmatrix}0&1\\0&0\end{smallmatrix}\right)$、$g=\operatorname{diag}(2,1)$ とする。積主束の $(x,I)$ における $B_P$ と、その $R_g$ による像を求めよ。また $(\operatorname{Ad}_{g^{-1}}B)_P(x,g)$ と一致することを行列で示せ。

<!-- solution-start -->
**詳細解答**。[基本ベクトル場の定義](#def-gbg6-fundamental-field)から $B_P(x,I)=(0,B)$ である。$R_g(x,K)=(x,Kg)$ の微分は $(v,W)\mapsto(v,Wg)$ だから像は $(0,Bg)=(0,B)$。一方、
$$
g^{-1}Bg
=\begin{pmatrix}1/2&0\\0&1\end{pmatrix}
\begin{pmatrix}0&1\\0&0\end{pmatrix}
\begin{pmatrix}2&0\\0&1\end{pmatrix}
=\tfrac12B.
$$
点 $(x,g)$ における基本ベクトルは $(0,g(\tfrac12B))=(0,B)$。従って[右移動公式](#thm-gbg6-vertical-fundamental)の両辺は一致し、ラベル $B$ 自体をそのままにしてはいけないことも確認できる。
<!-- solution-end -->

<a id="ex-gbg6-a03"></a>
#### GBG6-A03 標準水平分布と持ち上げ
- Level: A

$P=\mathbb R^2\times U(1)$ の標準水平分布 $H^0_{(x,z)}=\{(v,0)\}$ に対し、基底の $v=(3,-2)$ の水平持ち上げと、接ベクトル $(3,-2,5iz)$ の水平・垂直成分を求めよ。

<!-- solution-start -->
**詳細解答**。[水平持ち上げの命題](#prop-gbg6-horizontal-lift)により、水平方向で第一成分が $(3,-2)$ となるのは $(3,-2,0)$ のみである。分解は
$$
(3,-2,5iz)=(3,-2,0)+(0,0,5iz).
$$
前者は水平、後者は[射影の核](#def-gbg6-vertical-space)に属する。交わりは $0$ だからこの分解は一意である。
<!-- solution-end -->

<a id="ex-gbg6-a04"></a>
#### GBG6-A04 傾いた水平空間の分解
- Level: A

$P=\mathbb R\times GL(2,\mathbb R)$、$B=\left(\begin{smallmatrix}0&1\\0&0\end{smallmatrix}\right)$ とし、$H_{(x,K)}=\{(v,-vBK)\}$ とする。$K=\operatorname{diag}(2,1)$ で $(2,W)$、$W=\left(\begin{smallmatrix}1&0\\0&1\end{smallmatrix}\right)$ を水平・垂直に分け、両者の射影を確認せよ。

<!-- solution-start -->
**詳細解答**。$BK=B$ だから水平持ち上げは $(2,-2B)$。元から引くと垂直成分 $(0,W+2B)$ を得る。すなわち
$$
(2,W)=(2,-2B)+(0,I+2B).
$$
前者を $d\pi$ に送ると $2$、後者を送ると $0$ で、合計は元の射影 $2$ と一致する。[積主束の水平分布定理](#thm-gbg6-product-horizontal)より、この分解は全点で一意である。
<!-- solution-end -->

### Level B：同変性と局所構成を証明する

<a id="ex-gbg6-b01"></a>
#### GBG6-B01 群軌道の接空間を証明する
- Level: B

任意の滑らかな右主 $G$ 束 $P\to M$ と $p=s(x)k$ について、$\xi\mapsto\xi_P(p)$ が $V_pP$ の線形同型であることを局所積表示から導け。また $\xi_P(p)$ を $pg$ へ運ぶと Lie 環のラベルがどう変わるか証明せよ。

<!-- solution-start -->
**詳細解答**。$p=s(x)k$ の局所座標で $p\exp(t\xi)=s(x)(k\exp(t\xi))$ だから
$$
\xi_P(p)=(0,(d\ell_k)_e\xi).
$$
$d\pi(v,w)=v$ なので $V_pP=\{0\}\oplus T_kG$。左乗法 $\ell_k:G\to G$ は滑らかな逆 $\ell_{k^{-1}}$ を持ち、$(d\ell_k)_e$ は全単射。よって任意の $(0,w)$ はただ一つの $\xi=(d\ell_{k^{-1}})_kw$ から得られる。さらに
$$
p\exp(t\xi)g=pg\exp(t\operatorname{Ad}_{g^{-1}}\xi)
$$
は[指数と共役の可換性](../../../代数系/LIE/LIE2/index.md#thm-lie2-conjugation-exponential)による。$t=0$ で微分して $(dR_g)_p\xi_P(p)=(\operatorname{Ad}_{g^{-1}}\xi)_P(pg)$ を得る。右作用の非可換性を取り落としていない。
<!-- solution-end -->

<a id="ex-gbg6-b02"></a>
#### GBG6-B02 直和だけでは不十分
- Level: B

$G=GL(2,\mathbb R)$、$B=E_{12}$、$P=\mathbb R\times G$ で、各 $(x,K)$ の部分空間 $\widetilde H_{(x,K)}=\{(v,-vKB)\}$ を考える。各点で直和分解を満たすことを示し、$K=I$、$g=\operatorname{diag}(2,1)$ で右作用の同変性が破れることを証明せよ。

<!-- solution-start -->
**詳細解答**。任意の $(v,W)$ は
$$
(v,W)=(v,-vKB)+(0,W+vKB)
$$
と分かれ、水平候補と垂直の交わりは第一成分 $v=0$ から $0$ のみ。よって（H1）は成立する。ところが $(1,-B)\in\widetilde H_{(x,I)}$ の右移動は
$$
(dR_g)_{(x,I)}(1,-B)=(1,-Bg)=(1,-B).
$$
一方 $(x,g)$ での水平候補の第一成分 $1$ を持つ唯一のベクトルは
$$
(1,-gB)=(1,-2B).
$$
$B\ne0$ だから両者は異なり、（H2）が破れる。水平分布の[二条件](#def-gbg6-horizontal-distribution)を区別する必要がある。
<!-- solution-end -->

<a id="ex-gbg6-b03"></a>
#### GBG6-B03 section が生む別の水平分布
- Level: B

$P=\mathbb R\times GL(2,\mathbb R)$、$B=E_{12}$、$s_0(x)=(x,I)$、$s_1(x)=(x,I+xB)$ とする。両 section が滑らかであることを確認し、各 section から[局所水平分布](#prop-gbg6-section-horizontal)を構成せよ。両分布は一致するか。

<!-- solution-start -->
**詳細解答**。$B^2=0$ だから $(I+xB)(I-xB)=I$、従って $I+xB$ はすべての実 $x$ で可逆、かつ両 section は滑らかで $\pi\circ s_i=\operatorname{id}$ を満たす。$s_0$ の微分は $(v,0)$ なので $H^{s_0}_{(x,K)}=\{(v,0)\}$。

$s_1$ の微分は $(v,vB)$ である。点 $(x,K)=s_1(x)k$ では $k=(I+xB)^{-1}K$。右作用の微分で
$$
(dR_k)_{s_1(x)}(v,vB)=(v,vBk)
=(v,vB(I-xB)K)=(v,vBK).
$$
よって $H^{s_1}_{(x,K)}=\{(v,vBK)\}$。例えば $K=I,v=1$ では水平ベクトルが $(1,0)$ と $(1,B)$ で異なり、$B\ne0$ より二つの分布は一致しない。一つの主束に複数の水平分布があることの具体例となる。
<!-- solution-end -->

### Level C：同じ大域分布を二つのsectionで読み解く

<a id="ex-gbg6-c01"></a>
#### GBG6-C01 水平分布を変えずに局所表示を変える
- Level: C

$P=\mathbb R\times GL(2,\mathbb R)$ とし、$B=E_{12}$、$D=\operatorname{diag}(1,0)$ と置く。**一つに固定した**水平分布を、標準群座標 $(x,K)$ で
$$
H_{(x,K)}=\{(v,-vBK):v\in\mathbb R\}
$$
と定める。$s_0(x)=(x,I)$ の代わりに $s_1(x)=(x,h(x))$、$h(x)=\operatorname{diag}(e^x,1)$ を使い、$p=s_1(x)L$ と表す。

1. 固定した $H$ が滑らかで（H1）（H2）を満たすことを確認せよ。
2. $s_1$ に基づく群座標 $(x,L)$ で、**同じ $H$** を $\{(v,-vC(x)L)\}$ の形に書き、$C(x)$ を求めよ。
3. $x=0,L=I,v=1$ において、二つの表示から計算した幾何学的接ベクトルが一致することを確かめよ。
4. $s_1$ そのものから新たに定める $H^{s_1}$ は、この固定した $H$ と一致するか説明せよ。

<!-- solution-start -->
**詳細解答**。

**第1問**。$H$ は[積主束の水平分布定理](#thm-gbg6-product-horizontal)で $b_x(v)=vB$ としたものであり、滑らかである。直接確認しても、任意の $(v,W)$ が $(v,-vBK)+(0,W+vBK)$ と一意に分かれるため（H1）、$(dR_g)(v,-vBK)=(v,-vBKg)$ が $H_{(x,Kg)}$ に属するため（H2）が成立する。

**第2問**。同じ点の旧座標は $K=h(x)L$。曲線 $(x(t),L(t))$ に沿って積を微分すると、$v=x'(0)$、$W_L=L'(0)$ として
$$
W_K=h'(x)vL+h(x)W_L.
$$
旧座標で水平である条件は $W_K=-vB hL$。両辺から $h'vL$ を引き、左から $h^{-1}$ を掛ければ
$$
W_L=-v\bigl(h^{-1}Bh+h^{-1}h'\bigr)L.
$$
ここで $h^{-1}Bh=e^{-x}B$、$h^{-1}h'=D$ なので
$$
C(x)=e^{-x}B+D.
$$
$C$ は滑らかで、正しい水平空間の局所表示になっている。

**第3問**。$x=0$ では $h=I$、$h'=D$。旧座標での水平ベクトルは $(1,-B)$。新座標では $C(0)=B+D$ なので $(1,-B-D)$ であるが、旧座標へ微分で戻すと
$$
W_K=h'(0)I+h(0)(-B-D)
=D-B-D=-B.
$$
したがって幾何学的な同じ接ベクトル $(1,-B)$ を表す。

**第4問**。[section からの構成](#prop-gbg6-section-horizontal)で $H^{s_1}$ を新たに作ると、$s_1$ に基づく座標で水平ベクトルは $(v,0)$。しかし固定した $H$ は同じ座標で $(v,-vC(x)L)$ であり、例えば $x=0,L=I,v=1$ では $C(0)=B+D\ne0$ だから一致しない。**分布を固定して表示を替える操作**と、**sectionから別の分布を構成する操作**を区別できた。
<!-- solution-end -->

---

## 7. この講義で得た道具

主束に元々備わる垂直方向は $\ker d\pi$ であり、各点では $\mathfrak g$ と基本ベクトル場によって同型になる。基底方向を一意に持ち上げるには、垂直と直和をなす滑らかな補空間を選び、さらに右 $G$ 作用でその補空間が運ばれることを要求する。積主束では任意の滑らかな線形写像族 $b_x:T_xM\to\mathfrak g$ から具体的な水平分布を作れる。

次の **GBG7** では、この水平分布を $\mathfrak g$ 値の接続1形式と相互に構成し、水平を「零になる方向」として記述する。