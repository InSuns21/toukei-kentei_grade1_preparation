# GW1-01 なぜ曲線を数えるのか

<!-- definition-example-audit: strict -->

## 1. 二点を通る直線は一本――この「一本」を広げたい

複素射影平面で相異なる二点を通る射影直線は、ちょうど一本ある。この素朴な数え上げを、より高い次数の曲線や一般の空間へ拡張したい。しかし「同じ曲線」とは何を意味するのだろうか。

既習の[複素射影空間と同次座標](../../CM/CM1-10/index.md#def-cm1-10-projective-space)では、非零ベクトルの複素数倍を同じ射影点とみなした。[射影写像の定義](../../../代数系/AG/AG2-03/index.md#def-ag2-03-projective-polynomial-map)では、同次数の斉次多項式に共通射影零点がないとき、射影空間への写像を作れる。[複素多様体間の正則写像](../../CM/CM1-02/index.md#def-cm1-02-holomorphic-map)は局所座標で正則性を調べられる。

この道具で曲線を描くと、少なくとも三つの対象を区別しなければならない。

1. **パラメータ付き写像**：点ごとの対応を全て保持した正則写像 $f:\mathbb{CP}^1\to X$。
2. **パラメータを付け替えた写像**：定義域の双正則自己同型を合成した写像。関数としては違っても、同じ曲線の記述として扱いたい。
3. **像の集合**：$f(\mathbb{CP}^1)\subseteq X$。像が同じでも、何回覆うかが異なる場合がある。

ここで $X$ は複素多様体、$\mathbb{CP}^1$ は複素射影直線である。同次座標を $[s:t]$ とし、$t\ne0$ で $z=s/t$、$s\ne0$ で $w=t/s$ と書く。重なりでは $w=1/z$ となる。

## 2. 座標の付け替えを「別の曲線」と数えない

写像 $f$ に定義域の双正則自己同型 $\phi$ を先に作用させた $f\circ\phi$ は、定義域の名前を付け替えただけである。これらを同一視する。

<a id="def-gw1-01-reparam"></a>

<!-- formal-statement-start -->
> **定義（再パラメータ化による同値）**  
> $X$ を複素多様体、$f,g:\mathbb{CP}^1\to X$ を正則写像とする。$\mathbb{CP}^1$ の双正則自己同型 $\phi$ が存在して、次を満たすとき、$f$ と $g$ は再パラメータ化同値であるという。

$$
g=f\circ\phi.
$$

> ここでは定義域に標点を付けず、全ての双正則自己同型を許す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-01-reparam -->
**定義の確認**。$a\in\mathbb C$ を取り、次の三つの写像を考える。

$$
f_0([s:t])=[s:t],\qquad
\phi_a([s:t])=[s+at:t],\qquad
f_a([s:t])=[s+at:t].
$$

$\phi_a$ に対応する行列は $\begin{pmatrix}1&a\\0&1\end{pmatrix}$ で、行列式は $1$ である。[射影線形写像の双正則性](../../CM/CM1-10/index.md#thm-cm1-10-projective-automorphisms)をこの可逆行列に適用すると、$\phi_a$ は双正則自己同型であり、その逆は $\phi_{-a}$ である。また $f_a=f_0\circ\phi_a$ が各点で成立するため、全ての $f_a$ は $f_0$ と同値である。一方 $f_a([0:1])=[a:1]$ は $a$ に依存するので、異なる $a$ では関数としては異なる。
<!-- definition-example-end -->

この関係は本当に同値関係である。恒等写像が反射性を、$\phi^{-1}$ が対称性を、二つの自己同型の合成が推移性を与える。

<a id="prop-gw1-01-image"></a>

<!-- formal-statement-start -->
> **命題（再パラメータ化で像は変わらない）**  
> $X$ を複素多様体とし、正則写像 $f,g:\mathbb{CP}^1\to X$ が再パラメータ化同値なら、次が成立する。

$$
f(\mathbb{CP}^1)=g(\mathbb{CP}^1).
$$

> 逆に、像が等しいという条件だけでは再パラメータ化同値を保証しない。
<!-- formal-statement-end -->

### 証明の見取り図

同値なら定義域を双正則自己同型で全て動かすから像が変わらない。逆の失敗は、一回覆う写像と二回覆う写像で観察できる。

<!-- proof-start -->
### 証明

[再パラメータ化同値](#def-gw1-01-reparam)により、$g=f\circ\phi$ で $\phi$ は全射である。従って

$$
g(\mathbb{CP}^1)
=f(\phi(\mathbb{CP}^1))
=f(\mathbb{CP}^1).
$$

逆の反例として $f([s:t])=[s:t]$ と $h([s:t])=[s^2:t^2]$ を取る。どちらも全射なので像は $\mathbb{CP}^1$ である。しかし $h([1:1])=h([-1:1])=[1:1]$ だから $h$ は単射でない。もし $h=f\circ\phi$ なら $f$ は恒等写像なので $h=\phi$ となり単射のはずで、矛盾する。
<!-- proof-end -->

この反例から、**写像の像だけでは覆い方を忘れてしまう**ことが分かった。それを計算で検出できる量を考える。

## 3. 何回覆うかは面積に現れる

整数 $d\ge1$ に対して射影直線のべき写像を

$$
f_d([s:t])=[s^d:t^d]
$$

とする。同次数の斉次多項式で、共通零点は $(s,t)=(0,0)$ だけなので[斉次式による射影写像の定義](../../../代数系/AG/AG2-03/index.md#def-ag2-03-projective-polynomial-map)を満たす。有限座標では $w=z^d$ である。零でない一般の値 $c$ に対する方程式 $z^d=c$ は相異なる $d$ 個の解を持つ。

面積の規格化には[大域Fubini–Study形式](../../KAH/KAH1-07/index.md#thm-kah1-07-global-fs)を用いる。標的の有限座標を $w=u+iv$ と書くと

$$
\omega_{\mathrm{FS}}
=\frac{i\,dw\wedge d\bar w}{(1+|w|^2)^2}
=\frac{2\,du\wedge dv}{(1+u^2+v^2)^2}.
$$

[射影直線の面積公式](../../KAH/KAH1-07/index.md#thm-kah1-07-area)による全体の面積は $2\pi$ である。[微分形式の引き戻し](../../GEO/GEO7/index.md#def-geo7-pullback-form)は、写像の微分で標的上の2形式を定義域の2形式へ移す操作である。これを使えば、標的の面積を何度覆うかを測れる。

<a id="def-gw1-01-area"></a>

<!-- formal-statement-start -->
> **定義（射影直線への写像の正規化面積）**  
> $f:\mathbb{CP}^1\to\mathbb{CP}^1$ を滑らかな写像とし、標的のFubini–Study形式 $\omega_{\mathrm{FS}}$ は上記の規格化とする。定義域に複素向きを与え、

$$
A(f)=\frac1{2\pi}\int_{\mathbb{CP}^1} f^*\omega_{\mathrm{FS}}
$$

> を $f$ の正規化面積という。一般の滑らかな写像について、この実数が常に非負だとは定義だけでは主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-01-area -->
**定義の確認**。恒等写像 $f_1$ では $f_1^*\omega_{\mathrm{FS}}=\omega_{\mathrm{FS}}$ なので、[全体の面積](../../KAH/KAH1-07/index.md#thm-kah1-07-area)を代入して $A(f_1)=2\pi/(2\pi)=1$ となる。定数写像 $c$ は各点で微分 $dc=0$ なので、定義域上の2形式として $c^*\omega_{\mathrm{FS}}=0$、従って $A(c)=0$ である。いずれも定義域・標的は滑らかなコンパクト曲面で、積分が意味を持つ。
<!-- definition-example-end -->

<a id="thm-gw1-01-power-area"></a>

<!-- formal-statement-start -->
> **定理（べき写像の正規化面積と逆像数）**  
> 整数 $d\ge1$ とし、$f_d:\mathbb{CP}^1\to\mathbb{CP}^1$ を $[s:t]\mapsto[s^d:t^d]$ とする。この写像は正則かつ全射で、正規化面積は

$$
A(f_d)=d
$$

> となる。標的の有限座標で $c\ne0$ のとき、点 $[c:1]$ の逆像はちょうど $d$ 個の異なる点からなる。$d>1$ なら $f_d$ は双正則自己同型ではない。
<!-- formal-statement-end -->

### 証明の見取り図

正則性は同次数の斉次多項式から出る。面積の計算では $dw=d z^{d-1}dz$ による係数 $d^2$ が現れ、極座標での積分によって最終的に $d$ が残る。

<!-- proof-start -->
### 証明

写像は第3節冒頭の共通零点の検査により全射影直線で正則である。$c\in\mathbb C$ に対し $z^d=c$ は根を持ち、無限遠点の逆像は $[1:0]$ なので全射である。$c\ne0$ では $z^d-c$ と導関数 $d z^{d-1}$ は共通根を持たず、複素数体上で根はちょうど $d$ 個、しかも相異なる。

定義域の有限チャートを $z=re^{i\theta}$ とする。標的座標 $w=z^d$ について

$$
dw=d z^{d-1}dz,\qquad
d\bar w=d\bar z^{d-1}d\bar z,
$$

従って

$$
f_d^*\omega_{\mathrm{FS}}
=\frac{i\,d^2|z|^{2d-2}}{(1+|z|^{2d})^2}
dz\wedge d\bar z.
$$

ここで $d$ は整数を表し、$dw$ 等の先頭の $d$ は微分記号である。複素向きでは $i\,dz\wedge d\bar z=2r\,dr\wedge d\theta$ となり、

$$
\begin{aligned}
\int_{\mathbb{CP}^1}f_d^*\omega_{\mathrm{FS}}
&=\int_0^{2\pi}\int_0^\infty
\frac{2d^2r^{2d-1}}{(1+r^{2d})^2}\,dr\,d\theta\\
&=4\pi d^2\int_0^\infty
\frac{r^{2d-1}}{(1+r^{2d})^2}\,dr.
\end{aligned}
$$

$u=1+r^{2d}$ と置けば $du=2d\,r^{2d-1}\,dr$ である（右辺の最初の $d$ は整数の係数）。よって

$$
\begin{aligned}
4\pi d^2\int_0^\infty\frac{r^{2d-1}}{(1+r^{2d})^2}\,dr
&=2\pi d\int_1^\infty u^{-2}\,du\\
&=2\pi d[-u^{-1}]_1^\infty=2\pi d.
\end{aligned}
$$

$u^{-2}$ の積分は収束する。無限遠点で写像・引き戻し形式は滑らかなので、一点に追加の面積寄与はない。定義式の $2\pi$ で割れば $A(f_d)=d$ である。$d>1$ では逆像が複数の点を含むため、単射な双正則自己同型にはなれない。
<!-- proof-end -->

次数 $d$ を一般の正則写像に拡張するには位相・コホモロジーを整理する必要がある。今はこの具体的な $f_d$ で、**像は常に同じでも面積と被覆数は変わる**ことを確認した。

さらに[二次Veronese写像の例](../../../代数系/AG/AG2-03/index.md#prop-ag2-03-veronese-conic)では

$$
v([s:t])=[s^2:st:t^2]
$$

の像は射影平面の二次曲線になる。$v$ と $v\circ\phi$ は関数として違っても像が同じである。射影平面の曲線を数えるときにもパラメータ化の自由度がある。

## 4. 曲線が点を通るという条件

$\mathbb{CP}^2$ 上の射影直線は、非零係数ベクトル $(a,b,c)$ による一次斉次方程式

$$
L_{[a:b:c]}
=\{[X:Y:Z]:aX+bY+cZ=0\}
$$

で定まる。係数の同時非零倍は零点集合を変えないので、係数類 $[a:b:c]$ 自身は射影平面の点となる。固定された点 $p=[X_p:Y_p:Z_p]$ が直線上にあるかどうかは、係数 $(a,b,c)$ に対する一つの線形方程式で判定できる。

<a id="def-gw1-01-incidence"></a>

<!-- formal-statement-start -->
> **定義（点条件を満たす射影直線の集合）**  
> $p_1,\ldots,p_k\in\mathbb{CP}^2$ を固定する。全ての $p_i$ を通る射影直線の係数類の集合を、次で定める。

$$
\mathcal L(p_1,\ldots,p_k)
=\{[a:b:c]\in\mathbb{CP}^2:
p_i\in L_{[a:b:c]}\ (1\le i\le k)\}.
$$

> 点は異なるものと仮定せず、指定した各条件を同時に満たすことを要求する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-01-incidence -->
**定義の確認**。$p=[1:0:0]$ と $q=[0:1:0]$ なら、$p$ を通る条件は $a=0$、$q$ を通る条件は $b=0$。したがって許される係数は $[a:b:c]=[0:0:1]$ のみで、対応する直線は $Z=0$。係数は非零ベクトルであり、実際 $Z(p)=Z(q)=0$ なので定義の全条件が満たされる。
<!-- definition-example-end -->

<a id="thm-gw1-01-two-points"></a>

<!-- formal-statement-start -->
> **定理（相異なる二点を通る射影直線は一意）**  
> $\mathbb{CP}^2$ の相異なる点 $p,q$ に対し、集合 $\mathcal L(p,q)$ は一元集合である。一点 $p$ だけを固定した集合 $\mathcal L(p)$ は $\mathbb{CP}^1$ と一対一に対応するため無限集合である。
<!-- formal-statement-end -->

### 証明の見取り図

二点の代表ベクトルが一次独立であることを使う。係数の連立一次方程式の解空間の次元を数えてから、非零スカラー倍を同一視する。

<!-- proof-start -->
### 証明

$p=[v]$、$q=[w]$ となる非零ベクトル $v,w\in\mathbb C^3$ を選ぶ。$p\ne q$ なので二本は一次独立である。係数 $\ell=(a,b,c)^{\mathsf T}$ が二点を通る条件は

$$
\begin{pmatrix}v_0&v_1&v_2\\w_0&w_1&w_2\end{pmatrix}
\ell=\begin{pmatrix}0\\0\end{pmatrix}.
$$

左側の $2\times3$ 行列は階数 $2$。[階数・退化次数の定理](../../../基礎科目/F0/F0-00F/index.md#thm-f0-00f-01)を、この複素線形写像 $\mathbb C^3\to\mathbb C^2$ に適用すると、核は複素次元 $3-2=1$。その非零ベクトルは全てスカラー倍であり、射影化すると一元集合を与える。

一点 $p$ だけの条件では行列は非零の一行で、階数 $1$、核の複素次元は $2$。従って核の非零ベクトルのスカラー倍による同値類は $\mathbb{CP}^1$ となる。
<!-- proof-end -->

逆に三つの非共線点では、代表ベクトルが $\mathbb C^3$ の基底をなすため、三本の線形方程式の係数行列は階数 $3$ で核が零になる。零係数は直線を定めないので、三点を通る直線は存在しない。点条件を増やしても「必ず有限個の正の数になる」わけではない。

## 5. 滑らかな曲線の極限に特異な曲線が現れる

高次数の曲線を考える際には、係数を連続的に変えると曲線の見た目が変わる点も問題になる。具体例として複素数 $\varepsilon$ を動かした二次曲線

$$
C_\varepsilon
=\{[X:Y:Z]\in\mathbb{CP}^2:XY=\varepsilon Z^2\}
$$

を調べる。斉次方程式の次数は常に $2$ である。

<a id="prop-gw1-01-degeneration"></a>

<!-- formal-statement-start -->
> **命題（滑らかな二次曲線から二直線への退化）**  
> $\varepsilon\in\mathbb C^\times$ のとき $C_\varepsilon$ は滑らかな射影二次曲線である。$\varepsilon=0$ のとき

$$
C_0=\{X=0\}\cup\{Y=0\}
$$

> となり、二つの直線は $[0:0:1]$ で交わる。この点は $C_0$ の特異点である。
<!-- formal-statement-end -->

### 証明の見取り図

三つの偏導関数が同時に零になる射影点を求める。$\varepsilon\ne0$ と $\varepsilon=0$ では判定結果が異なる。

<!-- proof-start -->
### 証明

斉次多項式 $F_\varepsilon=XY-\varepsilon Z^2$ の偏導関数を計算すると

$$
\partial_XF_\varepsilon=Y,\qquad
\partial_YF_\varepsilon=X,\qquad
\partial_ZF_\varepsilon=-2\varepsilon Z.
$$

$\varepsilon\ne0$ なら同時に零となるには $X=Y=Z=0$ が必要だが、零ベクトルは射影点ではない。従って曲線上のどの点でも、局所アフィン座標で少なくとも一つの偏導関数が非零となり、陰関数定理により滑らかである。

$\varepsilon=0$ では方程式が $XY=0$ となり二直線の和集合である。共通点は $X=Y=0$ かつ $Z\ne0$、すなわち $[0:0:1]$ だけ。そこで偏導関数 $(Y,X,0)$ は全て零となり、$Z=1$ の局所座標では $xy=0$ という二本の枝が交わる形である。従ってその点は特異である。
<!-- proof-end -->

滑らかな曲線だけを数える空間を作れば、$\varepsilon\to0$ という退化で極限の曲線を失う。後続の講義では、定義域の成分や節点を記録した安定写像を用いてこの問題を扱う。今の例はその必要性を示すものであり、Gromovコンパクト性を証明したことにはならない。

## 6. 標点を付けて自己同型を制限する

定義域に**標点**という区別された点を記録し、その点を保存する再パラメータ化だけを許す方法がある。射影直線の自己同型は[射影線形写像](../../CM/CM1-10/index.md#thm-cm1-10-projective-automorphisms)から、有限座標で

$$
\phi(z)=\frac{az+b}{cz+d},\qquad ad-bc\ne0
$$

という分数線形変換で表せる。分母が零となる点も射影直線全体では無限遠点への写像として扱う。

<a id="prop-gw1-01-three-marks"></a>

<!-- formal-statement-start -->
> **命題（射影直線の三標点固定）**  
> $\phi:\mathbb{CP}^1\to\mathbb{CP}^1$ を双正則自己同型とする。$0,1,\infty$ をそれぞれ固定するなら $\phi$ は恒等写像である。
<!-- formal-statement-end -->

### 証明の見取り図

固定条件を $0$、$\infty$、$1$ の順に分数線形変換へ代入する。可逆行列の係数が最後には同じ非零スカラーになる。

<!-- proof-start -->
### 証明

$\phi(z)=(az+b)/(cz+d)$ とおく。$0$ を固定する条件は $d\ne0$ と $b=0$ を与える。$\infty$ を固定する条件は $c=0$ を与え、可逆性から $a\ne0$ である。従って

$$
\phi(1)=\frac ad=1
\quad\Longrightarrow\quad a=d.
$$

対応行列は $aI$ となり、$a\ne0$ のため射影空間上では恒等写像を誘導する。
<!-- proof-end -->

二標点 $0,\infty$ だけなら $z\mapsto\lambda z$（$\lambda\in\mathbb C^\times$）はどちらも固定し、$\lambda\ne1$ では恒等写像でない。したがって標点の数は、標点を保つ双正則自己同型の自由度を左右する。ただし安定写像では、定義域が節点で複数成分に分かれる場合や、ある成分上で写像が定数である場合も扱う。三標点の命題だけでは安定性の一般定義は得られない。

## 7. これから数えるべきもの

最初の計算だけでも、曲線を数えるには次の区別が必要だと分かった。

1. パラメータ付き写像と、その座標を付け替えた写像は同じとして数える。
2. 同じ像に何回巻き付くかは保持する。$f_1$ と $f_2$ は同じ像を持つが正規化面積が違う。
3. 点条件は必要な数を適切に選ぶ。直線を通る二点条件は一意性を与えるが、一点だけでは自由度が残る。
4. 滑らかな曲線の退化を受け入れる。二次曲線は極限で二直線に分裂しうる。
5. 自己同型の残り方を調べる。三標点は球面の自己同型を消すが、節点・定数成分も考慮する必要がある。

[シンプレクティック多様体](../../SYM/SYM2/index.md#def-sym2-symplectic-manifold)には曲線の面積を測る閉2形式 $\omega$ があり、[適合概複素構造](../../SYM/SYM8/index.md#def-sym8-almost-complex)により接空間の複素的回転 $J$ を選べる。次章ではこの二つと定義域の複素構造 $j$ を用いて、擬正則方程式とエネルギー恒等式を導く。GW不変量は、モジュライ空間と積分の準備が済んだ後に定義する。

## 8. 演習：写像・次数・点条件・退化

### Level A

<a id="ex-gw1-01-a01"></a>
#### GW1-01-A01 再パラメータ化の直接確認
- Level: A

$f([s:t])=[s:t]$、$g([s:t])=[s+2t:t]$ とする。再パラメータ化同値であることを自己同型と逆写像から示し、写像としては異なる点を一つ示せ。

<!-- solution-start -->
**詳細解答**。$\phi([s:t])=[s+2t:t]$ と取ると、係数行列は $\begin{pmatrix}1&2\\0&1\end{pmatrix}$ で行列式は $1$、逆行列は $\begin{pmatrix}1&-2\\0&1\end{pmatrix}$ である。[射影線形写像の双正則性とスカラー核](../../CM/CM1-10/index.md#thm-cm1-10-projective-automorphisms)を使うと $\phi$ は双正則自己同型で、逆は $\phi^{-1}([s:t])=[s-2t:t]$。$g=f\circ\phi$ なので[同値の定義](#def-gw1-01-reparam)を満たす。$[0:1]$ における像は $f([0:1])=[0:1]$ と $g([0:1])=[2:1]$ で異なる。
<!-- solution-end -->

<a id="ex-gw1-01-a02"></a>
#### GW1-01-A02 三乗写像と逆像
- Level: A

$f_3([s:t])=[s^3:t^3]$ が全射影直線で定義される正則写像であることを確認し、$[1:1]$ の逆像を列挙せよ。

<!-- solution-start -->
**詳細解答**。$s^3,t^3$ はともに次数3の斉次多項式で、両者が零なら $(s,t)=(0,0)$ しかなく射影点でない。従って[斉次式で与える射影写像](../../../代数系/AG/AG2-03/index.md#def-ag2-03-projective-polynomial-map)の条件を満たす。標的の $[1:1]$ に写る点は $t\ne0$ だから $z=s/t$ により $z^3=1$ と書ける。解は

$$
z=1,\qquad z=e^{2\pi i/3},\qquad z=e^{4\pi i/3}.
$$

従って逆像はこの三つの $[z:1]$ であり、互いに異なる。
<!-- solution-end -->

<a id="ex-gw1-01-a03"></a>
#### GW1-01-A03 一点を通る直線
- Level: A

$\mathbb{CP}^2$ の点 $p=[0:0:1]$ を通る全ての射影直線の方程式と、その係数パラメータ空間を示せ。

<!-- solution-start -->
**詳細解答**。[点条件の定義](#def-gw1-01-incidence)より直線 $aX+bY+cZ=0$ に $p$ を代入すると $c=0$ が必要十分である。係数ベクトルは非零なので $(a,b)\ne(0,0)$。従って方程式は

$$
aX+bY=0,\qquad [a:b]\in\mathbb{CP}^1
$$

であり、異なる $[a:b]$ は異なる直線を表す。よって全直線のパラメータ空間は $\mathbb{CP}^1$ である。
<!-- solution-end -->

<a id="ex-gw1-01-a04"></a>
#### GW1-01-A04 特異な極限
- Level: A

$XY=\varepsilon Z^2$ が $\varepsilon=0$ で持つ二つの成分と交点を求め、その交点で偏導関数が消えることを確認せよ。

<!-- solution-start -->
**詳細解答**。$\varepsilon=0$ なら $XY=0$ だから $X=0$ と $Y=0$ の二成分である。同時に $X=Y=0$ を満たす射影点は $Z\ne0$ のため $[0:0:1]$ に限る。$F=XY$ の偏導関数は

$$
(\partial_XF,\partial_YF,\partial_ZF)=(Y,X,0)
$$

だから交点で全て零である。$Z=1$ の局所方程式は $xy=0$ で二つの枝が交わり、滑らかな曲線ではない。
<!-- solution-end -->

### Level B

<a id="ex-gw1-01-b01"></a>
#### GW1-01-B01 二乗写像の面積を再導出する
- Level: B

$f_2([s:t])=[s^2:t^2]$ と $\omega_{\mathrm{FS}}=i(1+|w|^2)^{-2}dw\wedge d\bar w$ を使い、引き戻しから $A(f_2)$ を積分で求めよ。向き・係数を示すこと。

<!-- solution-start -->
**詳細解答**。$w=z^2$ なので $dw=2z\,dz$、$d\bar w=2\bar z\,d\bar z$。引き戻しは

$$
f_2^*\omega_{\mathrm{FS}}
=\frac{4i|z|^2}{(1+|z|^4)^2}\,dz\wedge d\bar z.
$$

$z=re^{i\theta}$、$i\,dz\wedge d\bar z=2r\,dr\wedge d\theta$ より

$$
\begin{aligned}
\int_{\mathbb{CP}^1}f_2^*\omega_{\mathrm{FS}}
&=\int_0^{2\pi}\int_0^\infty
\frac{8r^3}{(1+r^4)^2}\,dr\,d\theta\\
&=16\pi\int_0^\infty\frac{r^3}{(1+r^4)^2}\,dr.
\end{aligned}
$$

$u=1+r^4$ と置いて $du=4r^3dr$ を代入すると、積分は

$$
16\pi\cdot\frac14\int_1^\infty u^{-2}\,du=4\pi.
$$

無限遠点には別の積分寄与がなく、[正規化面積](#def-gw1-01-area)から $A(f_2)=4\pi/(2\pi)=2$ を得る。
<!-- solution-end -->

<a id="ex-gw1-01-b02"></a>
#### GW1-01-B02 二点条件と三点条件
- Level: B

$\mathbb{CP}^2$ の二点 $p=[1:1:0]$、$q=[0:1:1]$ を通る唯一の直線を求め、第三点 $r=[1:0:1]$ も通るか検査せよ。

<!-- solution-start -->
**詳細解答**。直線を $aX+bY+cZ=0$ とすると、$p$ から $a+b=0$、$q$ から $b+c=0$。従って $a=-b,c=-b$ で、係数が非零であるため $b\ne0$。$b=1$ と規格化すれば

$$
-X+Y-Z=0
$$

が唯一の直線である。$r$ を代入すると $-1+0-1=-2\ne0$ なので通らない。[二点を通る直線の一意性](#thm-gw1-01-two-points)から他の候補はなく、三点条件を満たす直線は存在しない。
<!-- solution-end -->

<a id="ex-gw1-01-b03"></a>
#### GW1-01-B03 二標点では消えない自由度
- Level: B

分数線形変換 $\phi(z)=(az+b)/(cz+d)$、$ad-bc\ne0$ が $0,\infty$ を固定する場合を全て求め、三標点 $0,1,\infty$ の場合と比較せよ。

<!-- solution-start -->
**詳細解答**。$0$ の固定には $d\ne0$ および $b=0$ が必要である。$\infty$ の固定には $c=0$ が必要であり、可逆性から $a\ne0$。従って

$$
\phi(z)=\frac ad z=\lambda z,\qquad \lambda\in\mathbb C^\times.
$$

$\lambda\ne1$ の写像は $0,\infty$ を固定するが恒等写像でない。さらに $1$ の固定を要求すれば $\phi(1)=\lambda=1$ となり、[三標点固定の命題](#prop-gw1-01-three-marks)と一致する。
<!-- solution-end -->

<a id="ex-gw1-01-b04"></a>
#### GW1-01-B04 退化しても次数は変わらない
- Level: B

射影曲線 $C_\varepsilon=\{XY=\varepsilon Z^2\}$ の方程式の次数、既約成分数、滑らかさについて $\varepsilon\ne0$ と $\varepsilon=0$ を比較し、「二次曲線だから滑らか」という推論の誤りを説明せよ。

<!-- solution-start -->
**詳細解答**。$F_\varepsilon=XY-\varepsilon Z^2$ はいずれも非零の次数2斉次式なので、**方程式の次数**は常に2である。$\varepsilon\ne0$ では偏導関数 $(Y,X,-2\varepsilon Z)$ が同時に零となる射影点はないので滑らかである。この曲線が二本の直線に分解すれば、その交点が特異点になるので分解できず、既約成分は一つである。

$\varepsilon=0$ では $XY=0$ で二本の異なる射影直線に分かれ、既約成分は二つ。交点 $[0:0:1]$ で偏導関数が全て零となり、滑らかではない。次数2とは方程式の次数であり、偏導関数の同時零点の不在まで意味しない。
<!-- solution-end -->

### Level C

<a id="ex-gw1-01-c01"></a>
#### GW1-01-C01 像・同値・面積の総合判定
- Level: C

$\mathbb{CP}^1\to\mathbb{CP}^1$ の三つの正則写像を考える。

$$
f([s:t])=[s:t],\qquad
g([s:t])=[s+t:t],\qquad
h([s:t])=[s^2:t^2].
$$

次を全て示せ。

1. 三つとも全射で、像は等しい。
2. $f,g$ は再パラメータ化同値だが、$f,h$ は同値でない。
3. $A(f),A(g),A(h)$ を求める。$A(g)=A(f)$ は引き戻しの合成と向きを保つ変数変換で説明する。
4. この三つを像だけで数えると失われる情報を説明する。

<!-- solution-start -->
**詳細解答**。

**（1）** $f$ は恒等写像、$g$ は行列 $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ が誘導する双正則自己同型なので全射である。$h$ は同次数2で共通射影零点を持たず、[斉次式表示](../../../代数系/AG/AG2-03/index.md#def-ag2-03-projective-polynomial-map)によって正則である。$w\in\mathbb C$ への逆像は $z^2=w$ の根で得られ、無限遠点は無限遠点から来るため $h$ も全射である。よって像は全て $\mathbb{CP}^1$。

**（2）** $\phi([s:t])=[s+t:t]$ は可逆行列が誘導する双正則自己同型で $g=f\circ\phi$、従って[再パラメータ化同値](#def-gw1-01-reparam)である。一方 $h([1:1])=h([-1:1])=[1:1]$ で $h$ は単射でない。$f\circ\psi=\psi$ は全ての双正則自己同型 $\psi$ について単射なので、$h=f\circ\psi$ は不可能である。

**（3）** [Fubini–Study面積定理](../../KAH/KAH1-07/index.md#thm-kah1-07-area)を恒等写像の引き戻しに適用して

$$
A(f)=\frac1{2\pi}\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}=1.
$$

$\phi$ は正則な微分同相であり複素向きを保存する。積分される2形式を $f^*\omega_{\mathrm{FS}}$ とする変数変換により、

$$
\begin{aligned}
A(g)
&=\frac1{2\pi}\int_{\mathbb{CP}^1}(f\circ\phi)^*\omega_{\mathrm{FS}}\\
&=\frac1{2\pi}\int_{\mathbb{CP}^1}\phi^*(f^*\omega_{\mathrm{FS}})\\
&=\frac1{2\pi}\int_{\mathbb{CP}^1}f^*\omega_{\mathrm{FS}}=1.
\end{aligned}
$$

最後の等号には全単射性だけでなく向き保存が必要である。$h=f_2$ なので、[べき写像の面積定理](#thm-gw1-01-power-area)に $d=2$ を代入して $A(h)=2$ となる。

**（4）** 像だけを見ると全て同じ集合だが、$h$ は一般の点を二回覆い、面積も $2$ である。再パラメータ化で除くべき重複は $f,g$ の間の差であり、異なる被覆次数を持つ $f,h$ まで同一視してはならない。
<!-- solution-end -->

## 9. 次章への導線

今回は正則な射影曲線を通じて、写像と像、再パラメータ化、被覆数、点条件、退化、標点の役割を検算した。次章では、定義域の複素構造 $j$ と標的の適合概複素構造 $J$ を使って

$$
\bar\partial_Ju=\tfrac12(du+J\circ du\circ j)=0
$$

という擬正則方程式を定義し、微分の型とエネルギーの規格化を導く。この式の各作用対象・符号・係数の意味も次章で定義する。
